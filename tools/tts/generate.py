"""Records narration for every caption with Kokoro, a free open-source voice that runs locally.

Setup (once):  see tools/tts/README.md
Usage:
  tools/tts/.venv/bin/python tools/tts/generate.py                  record new or changed captions
  tools/tts/.venv/bin/python tools/tts/generate.py --only high.math   just some topics
  tools/tts/.venv/bin/python tools/tts/generate.py --sample af_heart,am_michael --only high.math.manhattan-distance
                                                                    compare voices: one MP3 per voice in tools/tts/samples/

Writes content/audio/<fingerprint>.mp3 and content/audio/manifest.json. A recording's file name is
a fingerprint of its voice, speed and words, so only new or changed captions are recorded again.
"""
import argparse
import hashlib
import json
import os
import subprocess
import sys
import tempfile

import numpy as np
import soundfile as sf
from kokoro_onnx import Kokoro

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
TTS = os.path.join(ROOT, "tools", "tts")
AUDIO = os.path.join(ROOT, "content", "audio")
MANIFEST = os.path.join(AUDIO, "manifest.json")


def to_mp3(samples, rate, out_path):
    """Encodes mono speech as a small MP3 (48 kbps is plenty for a voice)."""
    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp:
        sf.write(tmp.name, samples, rate)
    try:
        subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", tmp.name, "-ac", "1", "-b:a", "48k", out_path], check=True)
    finally:
        os.unlink(tmp.name)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--voice", default="af_heart")
    ap.add_argument("--speed", type=float, default=1.0)
    ap.add_argument("--only", default="", help="only topics whose key starts with this, e.g. high.math")
    ap.add_argument("--sample", default="", help="comma-separated voices to compare; writes tools/tts/samples/<voice>.mp3")
    args = ap.parse_args()

    captions_file = os.path.join(TTS, "captions.json")
    subprocess.run(["node", "scripts/captions.mjs", captions_file], cwd=ROOT, check=True)
    with open(captions_file) as f:
        captions = [c for c in json.load(f) if c["key"].startswith(args.only)]
    if not captions:
        sys.exit(f'No captions match "{args.only}".')

    kokoro = Kokoro(os.path.join(TTS, "models", "kokoro-v1.0.onnx"), os.path.join(TTS, "models", "voices-v1.0.bin"))

    if args.sample:
        os.makedirs(os.path.join(TTS, "samples"), exist_ok=True)
        for voice in args.sample.split(","):
            parts, rate = [], 24000
            for c in captions:
                samples, rate = kokoro.create(c["text"], voice=voice, speed=args.speed, lang="en-us")
                parts += [samples, np.zeros(int(rate * 0.8), dtype=samples.dtype)]
            out = os.path.join(TTS, "samples", f"{voice}.mp3")
            to_mp3(np.concatenate(parts), rate, out)
            print(f"wrote {os.path.relpath(out, ROOT)}")
        return

    os.makedirs(AUDIO, exist_ok=True)
    manifest = {"voice": args.voice, "speed": args.speed, "files": {}}
    if os.path.exists(MANIFEST):
        with open(MANIFEST) as f:
            old = json.load(f)
        # Keep other topics' recordings when only some are re-recorded with the same voice.
        if args.only and old.get("voice") == args.voice and old.get("speed") == args.speed:
            manifest["files"] = old["files"]

    made = 0
    for i, c in enumerate(captions, 1):
        name = hashlib.sha1(f'{args.voice}|{args.speed}|{c["text"]}'.encode()).hexdigest()[:12] + ".mp3"
        manifest["files"][c["key"]] = name
        path = os.path.join(AUDIO, name)
        if not os.path.exists(path):
            samples, rate = kokoro.create(c["text"], voice=args.voice, speed=args.speed, lang="en-us")
            to_mp3(samples, rate, path)
            made += 1
            print(f"[{i}/{len(captions)}] {c['key']}", flush=True)

    # Drop recordings that no caption uses any more (only on a full run, which sees every caption).
    removed = 0
    if not args.only:
        used = set(manifest["files"].values())
        for name in os.listdir(AUDIO):
            if name.endswith(".mp3") and name not in used:
                os.remove(os.path.join(AUDIO, name))
                removed += 1

    with open(MANIFEST, "w") as f:
        json.dump(manifest, f, indent=1, sort_keys=True)
    print(f"Recorded {made} new caption(s), kept {len(captions) - made}, removed {removed} unused file(s).")


if __name__ == "__main__":
    main()
