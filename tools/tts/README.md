# Recording the read-aloud voice

Every caption is read aloud from a recording made with **Kokoro**, a free, open-source
text-to-speech model that runs on your own computer. The site uses the voice `af_heart`.
Recordings live in `content/audio/` and are committed, so the site build and hosting don't
need any of this. You only need it when captions change.

## Set up (once)

Needs Python 3.10 to 3.12, ffmpeg and Node.

```bash
brew install python@3.12 ffmpeg
python3.12 -m venv tools/tts/.venv
tools/tts/.venv/bin/pip install kokoro-onnx==0.4.9 soundfile
mkdir -p tools/tts/models && cd tools/tts/models
curl -LO https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/kokoro-v1.0.onnx
curl -LO https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/voices-v1.0.bin
```

The model files (about 350 MB) and the virtual environment are ignored by git.

## Record

```bash
tools/tts/.venv/bin/python tools/tts/generate.py
```

This records only captions that are new or have changed, and deletes recordings nothing uses
any more. A full recording of every clip takes about 20 minutes on an Apple M1.

- `--only high.math` records just the matching topics.
- `--sample af_heart,am_michael --only high.math.manhattan-distance` writes one MP3 per voice
  to `tools/tts/samples/`, for comparing voices.
- `--voice` and `--speed` change the voice and pace. Changing either one re-records every
  caption, so the whole site keeps a single voice.

The words recorded are the captions after the pronunciation rules in `src/speakable.js`
("CO₂" becomes "C O 2"), or a step's `say` text if it has one. `npm test` warns about any
step that has no recording yet.
