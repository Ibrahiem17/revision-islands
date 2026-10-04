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


// ---- Contains Duplicate: an interactive step-through (my-dup-1). The markup is the FINAL state of the default
// array, so it is a complete picture even without JS; src/topics/dsa-interactive.js resets it to step 0 and wires
// the buttons (Back / Play / Next / Reset / pick an array / random array).
const DUP_DEFAULT = [1, 2, 3, 1, 4];
const dupTmp = {};
def(dupTmp, "dupSvg", 360, 250, "Contains Duplicate with a Hash Set", "Five numbers in a row and a Hash Set called seen below them. A pointer visits each number, checks if it is already in seen, adds it if not, and returns true as soon as a number is already there.", () => {
  let s = tx(180, 15, "Contains Duplicate: the seen set", "s");
  s += tx(14, 52, "array", "s", "start");
  const X = (i) => 39 + i * 58;
  const cls = ["sg", "sg", "sg", "pk", "pe"];
  DUP_DEFAULT.forEach((v, i) => { s += `<g data-cell="${i}">${bx(X(i), 60, 50, 44, cls[i], String(v), { r: 6, t: "b" })}</g>`; });
  s += `<g data-ptr style="transform:translate(${X(3) + 25}px,0px)"><path class="k t" d="M-9 38 L9 38 L0 54 Z"/><text x="0" y="34" text-anchor="middle">now</text></g>`;
  s += tx(14, 134, "seen (Hash Set)", "s", "start");
  s += `<rect class="k dash" x="24" y="142" width="312" height="62" rx="10" fill="none"/>`;
  DUP_DEFAULT.forEach((v, i) => {
    s += `<g data-slot="${i}"><rect class="k dash" x="${X(i)}" y="152" width="50" height="42" rx="6" fill="none" opacity=".35"/>` +
      `<g data-slotfill style="opacity:${i < 3 ? 1 : 0}">${bx(X(i), 152, 50, 42, "m", (i < 3 ? String(v) : " "), { r: 6, t: "b" })}</g></g>`;
  });
  s += `<g data-res>${bx(120, 214, 120, 28, "pk", "return true", { r: 6, s: 1 })}</g>`;
  return s;
});
reg.dupDemo = () =>
  `<div class="dgx-int" data-kind="dup" data-default="${DUP_DEFAULT.join(",")}">${dupTmp.dupSvg()}` +
  `<p class="dgx-msg" data-msg aria-live="polite">1 is already in seen → return true (duplicate!)</p>` +
  `<div class="dgx-ctl">` +
  `<button type="button" data-act="back">◀ Back</button>` +
  `<button type="button" data-act="play">▶ Play</button>` +
  `<button type="button" data-act="next">Next ▶</button>` +
  `<button type="button" data-act="reset">↺ Reset</button>` +
  `<select data-act="preset" aria-label="Pick an array"><option value="1,2,3,1,4">[1, 2, 3, 1, 4] has a repeat</option><option value="4,7,9,2,5">[4, 7, 9, 2, 5] all unique</option><option value="6,2,8,6,9">[6, 2, 8, 6, 9] repeat early</option><option value="3,5,3,3,1">[3, 5, 3, 3, 1] many repeats</option></select>` +
  `<button type="button" data-act="random">🎲 Random</button>` +
  `</div></div>`;

// ---- Contains Duplicate: the user's own Excalidraw page, exactly as drawn (unaltered SVG)
reg.myContainsDuplicateImg = () =>
  `<a class="my-note-img" href="/dsa-notes/contains-duplicate.svg" target="_blank" rel="noopener" title="Open full size">` +
  `<img src="/dsa-notes/contains-duplicate.svg" loading="lazy" decoding="async" ` +
  `alt="Contains Duplicate full reference, hand-drawn notes. Return true if any number repeats. Have I seen this means use a Hash Set. Brute force compares every pair in O(n squared); a Hash Set remembers seen numbers with O(1) lookups. Includes a six step recipe, pseudocode, an annotated C++ version, a trace of 1 2 3 1, and time and space O(n)."></a>`;

// ---- shared controls for the interactive demos
const ctl = (opts) =>
  `<div class="dgx-ctl"><button type="button" data-act="back">◀ Back</button><button type="button" data-act="play">▶ Play</button>` +
  `<button type="button" data-act="next">Next ▶</button><button type="button" data-act="reset">↺ Reset</button>` +
  `<select data-act="preset" aria-label="Pick an example">${opts.map(([v, l]) => `<option value="${v}">${l}</option>`).join("")}</select>` +
  `<button type="button" data-act="random">🎲 Random</button></div>`;
const cellX = (i) => 39 + i * 58;
const pointer = (i) => `<g data-ptr style="transform:translate(${cellX(i) + 25}px,0px)"><path class="k t" d="M-9 38 L9 38 L0 54 Z"/><text x="0" y="34" text-anchor="middle">now</text></g>`;

// ---- Two Sum: interactive step-through (my-two-1). Markup = final state of nums [2,7,11,15,3], target 9.
const TWO_DEFAULT = "2,7,11,15,3|9";
const twoTmp = {};
def(twoTmp, "twoSvg", 360, 250, "Two Sum with a Hash Map", "Five numbers in a row and a Hash Map of value to index below them. For each number the pointer works out the complement, target minus the number, and checks whether it is already in the map. If it is, the two indices are the answer; if not, the number is stored.", () => {
  const nums = [2, 7, 11, 15, 3], cls = ["sg", "pk", "pe", "pe", "pe"];
  let s = tx(180, 15, "Two Sum: need = target − x", "s") + tx(14, 52, "nums", "s", "start");
  s += `<text data-target x="346" y="52" text-anchor="end" class="s">target = 9</text>`;
  nums.forEach((v, i) => { s += `<g data-cell="${i}">${bx(cellX(i), 60, 50, 44, cls[i], String(v), { r: 6, t: "b" })}</g>` + tx(cellX(i) + 25, 118, String(i), "s"); });
  s += pointer(1);
  s += `<text data-need x="180" y="138" text-anchor="middle" class="s">x = 7  →  need 9 − 7 = 2, found at index 0</text>`;
  s += tx(14, 156, "seen (Hash Map: value : index)", "s", "start") + `<rect class="k dash" x="24" y="162" width="312" height="48" rx="10" fill="none"/>`;
  nums.forEach((v, i) => {
    s += `<g data-slot="${i}"><rect class="k dash" x="${cellX(i)}" y="168" width="50" height="36" rx="6" fill="none" opacity=".35"/>` +
      `<g data-slotfill style="opacity:${i < 1 ? 1 : 0}">${bx(cellX(i), 168, 50, 36, "m", i < 1 ? "2:0" : " ", { r: 6, t: "b" })}</g></g>`;
  });
  s += `<g data-res>${bx(110, 214, 140, 24, "pk", "return [0, 1]", { r: 6, s: 1 })}</g>`;
  return s;
});
reg.twoDemo = () =>
  `<div class="dgx-int" data-kind="two" data-default="${TWO_DEFAULT}">${twoTmp.twoSvg()}` +
  `<p class="dgx-msg" data-msg aria-live="polite">7 + 2 = 9 → return [0, 1]</p>` +
  ctl([["2,7,11,15,3|9", "[2, 7, 11, 15, 3] target 9"], ["3,2,4,6,1|6", "[3, 2, 4, 6, 1] target 6"], ["4,4,9,1,6|8", "[4, 4, 9, 1, 6] target 8"], ["1,5,3,8,2|20", "[1, 5, 3, 8, 2] target 20 (no pair)"]]) + `</div>`;

reg.myTwoSumImg = () =>
  `<a class="my-note-img" href="/dsa-notes/two-sum.svg" target="_blank" rel="noopener" title="Open full size">` +
  `<img src="/dsa-notes/two-sum.svg" loading="lazy" decoding="async" ` +
  `alt="Two Sum full reference, hand-drawn notes. Find two indices whose values add up to the target. Use a Hash Map from value to index. For each number work out the complement, check if it is in the map before storing, and return the two indices. Includes brute force O(n squared), a recipe, pseudocode, annotated C++, a trace of 2 7 11 15 with target 9, and time and space O(n)."></a>`;

// ---- Group Anagrams: interactive step-through (my-grp-1). Markup = final state for the default word list.
const GRP_DEFAULT = "eat,tea,bat,tan,ate,nat";
const grpTmp = {};
def(grpTmp, "grpSvg", 360, 300, "Group Anagrams with a Hash Map", "A row of words. Each word has its letters sorted to make a key, and the word is dropped into the group for that key. Anagrams share a key, so they land in the same group.", () => {
  const words = ["eat", "tea", "bat", "tan", "ate", "nat"];
  let s = tx(180, 15, "Group Anagrams: sort the letters → key", "s") + tx(14, 40, "words", "s", "start");
  words.forEach((w, i) => { s += `<g data-word="${i}">${bx(27 + i * 52, 46, 46, 34, "sg", w, { r: 6 })}</g>`; });
  s += `<g data-key>${bx(70, 92, 220, 28, "cr", 'nat → key "ant"', { r: 6 })}</g>`;
  s += tx(14, 144, "groups (Hash Map: key → list)", "s", "start");
  const rows = [["aet", ["eat", "tea", "ate"]], ["abt", ["bat"]], ["ant", ["tan", "nat"]], ["", []]];
  rows.forEach(([key, ws], r) => {
    const y = 152 + r * 36;
    s += `<g data-row="${r}" style="opacity:${key ? 1 : 0}"><g data-rk>${bx(20, y, 56, 30, "bl", key || " ", { r: 6, t: "b" })}</g>`;
    for (let m = 0; m < 4; m++) s += `<g data-chip="${m}" style="opacity:${ws[m] ? 1 : 0}">${bx(86 + m * 58, y, 50, 30, "m", ws[m] || " ", { r: 6 })}</g>`;
    s += `</g>`;
  });
  return s;
});
reg.grpDemo = () =>
  `<div class="dgx-int" data-kind="grp" data-default="${GRP_DEFAULT}">${grpTmp.grpSvg()}` +
  `<p class="dgx-msg" data-msg aria-live="polite">All words placed. Return only the groups: [[eat, tea, ate], [bat], [tan, nat]]</p>` +
  ctl([["eat,tea,bat,tan,ate,nat", "eat tea bat tan ate nat"], ["cat,act,dog,god,rat,tar", "cat act dog god rat tar"], ["nap,pan,bat,tab,eat,tea", "nap pan bat tab eat tea"], ["abc,xyz,mno,pqr", "all different (4 groups)"]]) + `</div>`;

reg.myGroupAnagramsImg = () =>
  `<a class="my-note-img" href="/dsa-notes/group-anagrams.svg" target="_blank" rel="noopener" title="Open full size">` +
  `<img src="/dsa-notes/group-anagrams.svg" loading="lazy" decoding="async" ` +
  `alt="Problem 4, Group Anagrams, long hand-drawn notes. Group words that are anagrams of each other. Use a Hash Map where the key is the word with its letters sorted and the value is the list of original words. Includes the problem, brute force, the fix, the recipe, pseudocode explained line by line, a full walkthrough with eat tea bat, the C++ code explained line by line, complexity O(n k log k), common mistakes, a key takeaway, and a list of parts that were hard with their fixes."></a>`;

// ---- Valid Anagram: interactive step-through (my-anagram-1). Markup = final state for cat | tac.
const ANA_DEFAULT = "cat|tac";
const anaTmp = {};
def(anaTmp, "anaSvg", 360, 250, "Valid Anagram with a Hash Map of letter counts", "Two words, A and B. Every letter of A adds one to that letter's count and every letter of B takes one away. If all the counts end at zero, the words are anagrams.", () => {
  const A = ["c", "a", "t"], B = ["t", "a", "c"], L = ["c", "a", "t"];
  const X = (j) => 40 + j * 54;
  let s = tx(180, 15, "Valid Anagram: count up for A, down for B", "s") + tx(20, 70, "A", "b") + tx(20, 126, "B", "b");
  for (let j = 0; j < 4; j++) {
    s += `<g data-a="${j}" style="opacity:${A[j] ? 1 : 0}">${bx(X(j), 46, 46, 36, "sg", A[j] || " ", { r: 6, t: "b" })}</g>` +
      `<text data-plus="${j}" x="${X(j) + 23}" y="98" text-anchor="middle" class="s" style="opacity:${A[j] ? 1 : 0}">+1</text>`;
    s += `<g data-b="${j}" style="opacity:${B[j] ? 1 : 0}">${bx(X(j), 102, 46, 36, "sg", B[j] || " ", { r: 6, t: "b" })}</g>` +
      `<text data-minus="${j}" x="${X(j) + 23}" y="154" text-anchor="middle" class="s" style="opacity:${B[j] ? 1 : 0}">−1</text>`;
  }
  s += tx(14, 176, "counts (one per letter)", "s", "start");
  for (let k = 0; k < 6; k++) s += `<g data-cnt="${k}" style="opacity:${L[k] ? 1 : 0}">${bx(14 + k * 54, 182, 48, 28, L[k] ? "sg" : "cr", L[k] ? `${L[k]} : 0` : " ", { r: 6, t: "s" })}</g>`;
  s += `<g data-res>${bx(110, 216, 140, 24, "sg", "return true", { r: 6, s: 1 })}</g>`;
  return s;
});
reg.anaDemo = () =>
  `<div class="dgx-int" data-kind="ana" data-default="${ANA_DEFAULT}">${anaTmp.anaSvg()}` +
  `<p class="dgx-msg" data-msg aria-live="polite"><span class="dgx-step"></span>Every count is back to 0, the letters cancelled out perfectly.<br>Answer: true.</p>` +
  ctl([["cat|tac", "cat and tac (anagrams)"], ["rat|car", "rat and car (not anagrams)"], ["tea|eat", "tea and eat (anagrams)"], ["ab|abc", "ab and abc (different lengths)"]]) + `</div>`;

export default reg;
