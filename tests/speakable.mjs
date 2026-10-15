// Checks that captions are turned into the right words for read aloud.
//   node tests/speakable.mjs
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
globalThis.CC = {};
vm.runInThisContext(fs.readFileSync(path.join(root, "src/speakable.js"), "utf8"));
const say = CC.speakable;

const cases = [
  // numbers
  ["about 0.083", "about zero point zero eight three"],
  ["It costs $1,000.", "It costs one thousand dollars."],
  ["$1 or $0.50", "one dollar or zero dollars and fifty cents"],
  ["$17,449 and $1,887,", "seventeen thousand four hundred forty-nine dollars and one thousand eight hundred eighty-seven dollars,"],
  ["a rise of 24% or 0.2%", "a rise of twenty-four percent or zero point two percent"],
  ["In 1914 and 2016, not 1905 or 2000", "In nineteen fourteen and twenty sixteen, not nineteen oh five or two thousand"],
  ["the 1800s and the 1940s", "the eighteen hundreds and the nineteen forties"],
  ["the 23rd and 2nd", "the twenty-third and second"],
  ["13 in binary is 1101, and 5 is 0101.", "thirteen in binary is one one zero one, and five is zero one zero one."],
  ["rows of 0s and 1s", "rows of zeros and ones"],
  ["37 billion tonnes", "thirty-seven billion tonnes"],
  ["203.0.113.10", "two hundred three dot zero dot one hundred thirteen dot ten"],
  // symbols and units
  ["CO₂ and C₆H₁₂O₆", "C O two and C six H twelve O six"],
  ["the area is πr²", "the area is pi r squared"],
  ["3/4 and 1/2 and 6/100", "three fourths and one half and six hundredths"],
  ["|5 − 1| = 4", "the absolute value of five minus one equals four"],
  ["15 N on a 15 kg cart gives 1 m/s².", "fifteen newtons on a fifteen kilogram cart gives one meter per second squared."],
  ["about −18 °C", "about minus eighteen degrees Celsius"],
  ["Na⁺ and Cl⁻", "N A plus and C L minus"],
  ["You type https://www.example.com", "You type www dot example dot com"],
  ["a 3D shape", "a three D shape"]
];

let failed = 0;
for (const [input, want] of cases) {
  try { assert.equal(say(input), want); }
  catch { failed++; console.log(`FAIL ${JSON.stringify(input)}\n  got:  ${say(input)}\n  want: ${want}`); }
}
console.log(failed ? `${failed} of ${cases.length} pronunciation checks failed.` : `All ${cases.length} pronunciation checks passed.`);
process.exit(failed ? 1 : 0);
