/** Pictures for the user's own notes (content/dsa/my-notes.js). Registered via dsa-diagrams.js. */
import { def, an, seq, tx, bx, ar, tick } from "./dsa-kit.js";

const reg = {};

// ---- Valid Anagram: +1 for every letter in A, -1 for every letter in B, everything cancels to 0 (my-anagram-1)
def(reg, "anagramCount", 360, 236, "Valid anagram with a hash map", "Word A is c, a, t and word B is t, a, c. Each letter of A adds one to its count and each letter of B takes one away. The counts for c, a and t all end at zero, so the words are anagrams.", () => {
  const A = ["c", "a", "t"], B = ["t", "a", "c"], keys = ["c", "a", "t"];
  let s = tx(180, 24, "+1 for every letter in A, −1 for every letter in B", "s");
  s += tx(30, 66, "A", "b") + tx(30, 118, "B", "b");
  A.forEach((ch, i) => { s += seq(bx(60 + i * 62, 42, 50, 40, "pe", ch, { r: 6, h: 1, t: "b" }) + tx(85 + i * 62, 99, "+1", "s"), i, 6, 9); });
  B.forEach((ch, i) => { s += seq(bx(60 + i * 62, 108, 50, 40, "bl", ch, { r: 6, h: 1, t: "b" }) + tx(85 + i * 62, 165, "−1", "s"), i + 3, 6, 9); });
  // the counter map: static = final state (all zero); it breathes once everything has been counted
  keys.forEach((ch, i) => {
    const x = 266, y = 40 + i * 44;
    s += an(bx(x, y, 80, 34, "m", `${ch} : 0`, { r: 6, s: 1, t: "b" }), [[0, { s: 1 }], [70, { s: 1 }], [86, { s: 1.1 }], [100, { s: 1 }]], 9, { at: [x + 40, y + 17] });
  });
  s += ar(240, 62, 262, 62) + ar(240, 106, 262, 106) + ar(240, 150, 262, 150);
  s += tx(180, 206, "all counts are 0  →  anagram", "") + tick(300, 202);
  return s;
});

// ---- the user's own Excalidraw page, shown exactly as drawn (unaltered image file, click to open full size)
reg.myValidAnagramImg = () =>
  `<a class="my-note-img" href="/dsa-notes/valid-anagram.svg" target="_blank" rel="noopener" title="Open full size">` +
  `<img src="/dsa-notes/valid-anagram.svg" loading="lazy" decoding="async" ` +
  `alt="Valid Anagram full reference, hand-drawn notes. Same letters and same counts means true. Use a hash map to count: plus one for each letter in A, minus one for each letter in B, and if every count is zero they are anagrams. Includes the brute force approach, a six step recipe, pseudocode, an annotated C++ version, a trace of cat versus tac, and time and space O(n)."></a>`;

export default reg;
