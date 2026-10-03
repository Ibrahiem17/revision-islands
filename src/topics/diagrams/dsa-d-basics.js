/** DSA note diagrams: Quick-Revision shared pictures, Big-O, Arrays & Strings. Registered via dsa-diagrams.js. */
import { def, an, seq, stp, pulse, tx, bx, row, nd, ln, ar, fat, pin, pinUp, bar, cross, tick, ht } from "./dsa-kit.js";

const reg = {};

// ---- Big-O growth curves (bigo-1, qr-1)
def(reg, "bigoGrowth", 360, 212, "Big-O growth curves", "Five curves on one chart: O(1) is flat, O(log n) rises slowly, O(n) is a straight line, O(n squared) bends up and O(2 to the n) shoots up.", () => {
  const curve = (fn) => { let d = ""; for (let i = 0; i <= 24; i++) { const t = i / 24; d += `${i ? "L" : "M"}${(40 + 250 * t).toFixed(1)} ${(170 - fn(t)).toFixed(1)}`; } return d; };
  const L = [
    ["O(1)", "cs-sg", () => 14, 156],
    ["O(log n)", "cs-bl", (t) => 44 * Math.log10(1 + 9 * t), 126],
    ["O(n)", "cs-m", (t) => 78 * t, 92],
    ["O(n²)", "cs-pk", (t) => 100 * t * t, 70],
    ["O(2ⁿ)", "cs-t", (t) => (135 * (Math.pow(2, 4 * t) - 1)) / 15, 35],
  ];
  let s = ln(40, 172, 40, 24) + ln(40, 172, 300, 172) + tx(48, 20, "work", "s", "start") + tx(292, 192, "input size n", "s", "end");
  L.forEach(([name, c, fn, ey], i) => {
    s += seq(fat(curve(fn), c, 4) + tx(298, ey + 5, name, "", "start"), i, L.length, 7);
  });
  return s;
});

// ---- the common speeds as bars (bigo-2)
def(reg, "bigoBars", 360, 214, "Steps needed when n = 8", "Horizontal bars for steps at n equals 8: O(1) 1, O(log n) 3, O(n) 8, O(n log n) 24, O(n squared) 64, O(2 to the n) 256.", () => {
  const R = [["O(1)", 1, "sg"], ["O(log n)", 3, "bl"], ["O(n)", 8, "m"], ["O(n log n)", 24, "pe"], ["O(n²)", 64, "pk"], ["O(2ⁿ)", 256, "t"]];
  let s = tx(14, 20, "steps when n = 8", "s", "start");
  R.forEach(([n, v, c], i) => {
    const y = 32 + i * 29, w = Math.max(10, v * 0.86);
    s += seq(tx(14, y + 19, n, "s", "start") + bx(96, y, w, 24, c, "", { r: 4, h: w > 30 }) + tx(96 + w + 8, y + 18, String(v), "", "start"), i, 6, 6);
  });
  return s;
});

// ---- spotting complexity in code (bigo-3)
def(reg, "loopTypes", 360, 206, "One loop versus a loop inside a loop", "On the left, a pointer visits 6 boxes in turn: n steps. On the right, a grid of 5 by 5 cells lights row by row: n times n steps.", () => {
  let s = tx(84, 26, "one loop", "") + tx(270, 26, "loop in a loop", "");
  s += row(12, 56, ["", "", "", "", "", ""], 24, 24, "pe") + tx(84, 112, "n steps → O(n)", "s");
  s += an(pin(24, 52, "i"), stp([0, 24, 48, 72, 96, 120].map((x) => ({ x }))), 4.2);
  for (let r = 0; r < 5; r++) {
    let rw = ""; for (let c = 0; c < 5; c++) rw += bx(214 + c * 22, 42 + r * 22, 22, 22, "pk", "", { r: 3 });
    s += seq(rw, r, 5, 4.2);
  }
  s += tx(270, 170, "n × n steps → O(n²)", "s");
  return s;
});

// ---- drop the small stuff (bigo-4)
def(reg, "bigoDrop", 360, 190, "Drop constants and small terms", "The expression 2n plus 10 is simplified step by step to just n, so the result is O(n).", () => {
  let s = bx(18, 38, 128, 50, "pe", "2n + 10", { s: 1, t: "b", h: 1 }) + ar(152, 63, 206, 63) + pulse(bx(214, 38, 128, 50, "m", "O(n)", { s: 1, t: "b", h: 1 }), [278, 63]);
  s += bx(18, 112, 150, 32, "cr", "drop the + 10", { t: "s" }) + cross(156, 128, 6);
  s += bx(206, 112, 136, 32, "cr", "drop the 2", { t: "s" }) + cross(326, 128, 6);
  s += tx(180, 172, "only the biggest part matters", "s");
  return s;
});

// ---- time vs space seesaw (bigo-5)
def(reg, "timeSpace", 360, 200, "Trading time for space", "A balance beam with time on one side and memory on the other: spending more of one buys you less of the other.", () => {
  const beam = ln(50, 120, 310, 120, "ln-w") + bx(54, 66, 100, 46, "m", "time", { s: 1 }) + bx(206, 66, 100, 46, "bl", "memory", { s: 1 });
  let s = an(beam, [[0, { r: 0 }], [25, { r: -6 }], [50, { r: 0 }], [75, { r: 6 }], [100, { r: 0 }]], 5, { at: [180, 122] });
  s += `<path class="k t" d="M180 124l-30 46h60z"/>` + ht(166, 156, 28, 11, "f") + nd(180, 122, "", "ik", 6);
  s += tx(180, 28, "spend memory → save time", "s") + tx(180, 188, "a hash table spends memory for speed", "s");
  return s;
});

// ---- best / worst case (bigo-6)
def(reg, "bestWorst", 360, 206, "Best and worst case of a search", "A row of 8 boxes. If the item is the first one it takes 1 step (best case). If it is the last one it takes n steps (worst case).", () => {
  const v = [5, 3, 8, 1, 9, 4, 7, 2];
  let s = row(28, 76, v, 38, 38, (i) => (i === 0 ? "sg" : i === 7 ? "t" : "cr"), { idx: 0 });
  s += an(nd(47, 58, "?", "m", 11), stp([0, 1, 2, 3, 4, 5, 6, 7].map((i) => ({ x: i * 38 }))), 5);
  s += tx(16, 34, "best: first one, 1 step", "s", "start") + tx(344, 150, "worst: last one, n steps", "s", "end");
  s += tx(180, 186, "interviewers usually mean the worst case", "s");
  return s;
});

// ---- nested loop grid (bigo-7)
def(reg, "loopGrid", 360, 218, "A loop inside a loop is n times n", "A 4 by 4 grid lights up one row at a time. Each of the 4 outer steps runs the inner loop 4 times, so 16 steps in total.", () => {
  let s = tx(60, 30, "j →", "s") + tx(24, 52, "i ↓", "s");
  for (let c = 0; c < 4; c++) s += tx(102 + c * 36 + 17, 36, c, "s");
  for (let r = 0; r < 4; r++) {
    let g = tx(86, 62 + r * 36 + 22, r, "s", "end");
    for (let c = 0; c < 4; c++) g += bx(102 + c * 36, 44 + r * 36, 36, 36, "pk", "", { r: 3, h: 1 });
    s += seq(g, r, 4, 5);
  }
  s += tx(300, 90, "n rows", "") + tx(300, 114, "× n steps", "") + bx(250, 128, 100, 36, "m", "= n²", { s: 1, t: "b" });
  return s;
});

// ---- 1,000 vs 1,000,000 (bigo-8)
def(reg, "n1000", 360, 206, "1,000 steps versus 1,000,000 steps", "Two bars for 1,000 items: O(n) is a tiny bar of about 1,000 steps while O(n squared) is a huge bar of about 1,000,000 steps.", () => {
  let s = ln(40, 170, 330, 170);
  s += bar(90, 170, 60, 7, "m") + tx(120, 156, "1,000", "") + tx(120, 192, "O(n)", "");
  s += pulse(bar(220, 170, 60, 120, "t") + tx(250, 40, "1,000,000", ""), [250, 170], 2.4, 1.04) + tx(250, 192, "O(n²)", "");
  s += tx(346, 96, "×1000", "s", "end");
  return s;
});

// ---- array lockers (arr-1, qr-2)
def(reg, "arrayJump", 360, 196, "An array is a row of numbered lockers", "Seven boxes side by side numbered 0 to 6. A pointer can jump straight to any index in one step.", () => {
  const v = [12, 7, 9, 4, 15, 8, 3];
  let s = tx(180, 28, "side by side in memory", "s");
  s += row(26, 84, v, 44, 52, (i) => (i === 3 ? "m" : "pe"), { idx: 0, h: 1 });
  s += an(pin(26 + 3 * 44 + 22, 78, "arr[i]"), stp([0, -132, 88, 44, -88].map((x) => ({ x }))), 5);
  s += tx(180, 176, "jump to any index in one step: O(1)", "s");
  return s;
});

// ---- insert shifts everything (arr-8, arr-2)
def(reg, "arrShift", 360, 204, "Inserting at the front shifts every item", "Five items in a row. A new item wants the first slot, so every existing item has to move one place to the right.", () => {
  const v = [4, 7, 1, 9, 2];
  let s = bx(40, 38, 48, 36, "m", "new", { s: 1 }) + ar(64, 78, 64, 104);
  s += `<rect class="k dash" x="280" y="108" width="48" height="44" rx="4" fill="none"/>`;
  s += an(row(40, 108, v, 48, 44, "pe", { h: 1 }), [[0, {}], [20, {}], [45, { x: 48 }], [70, { x: 48 }], [100, {}]], 4);
  for (let i = 0; i < 5; i++) s += ar(64 + i * 48 + 6, 102, 64 + i * 48 + 42, 102, -16);
  s += tx(180, 186, "every item moves over → O(n)", "s");
  return s;
});

// ---- dynamic array doubling (arr-3)
def(reg, "dynArray", 360, 208, "A dynamic array doubles when full", "A full array of 4 items is copied into a new array with room for 8; the new array has 4 empty slots.", () => {
  let s = tx(20, 24, "full: no room left", "s", "start") + row(20, 34, [3, 8, 5, 1], 40, 36, "pe");
  s += ar(40, 74, 40, 110) + tx(110, 98, "copy into a bigger one", "s", "start");
  let top = "";
  [3, 8, 5, 1].forEach((v, i) => { top += seq(bx(20 + i * 40, 118, 40, 36, "pe", v, { r: 4 }), i, 4, 4); });
  s += top;
  let em = ""; for (let i = 4; i < 8; i++) em += `<rect class="k dash" x="${20 + i * 40}" y="118" width="40" height="36" rx="4" fill="none"/>`;
  s += an(em, [[0, { o: 1 }], [50, { o: 0.3 }], [100, { o: 1 }]], 2.4);
  s += tx(180, 184, "double the room: rare copy → O(1) amortised", "s");
  return s;
});

// ---- strings are arrays of characters (arr-4)
def(reg, "strChars", 360, 208, "A string is a row of characters", "The word HELLO as five numbered character boxes, with a padlock showing it cannot be edited in place.", () => {
  let s = row(64, 70, ["H", "E", "L", "L", "O"], 46, 46, "pe", { idx: 0, h: 1 });
  s += pulse(`<rect class="k m" x="166" y="26" width="28" height="22" rx="4"/><path class="ln" d="M171 26v-7a9 9 0 0 1 18 0v7"/>` + nd(180, 37, "", "ik", 3), [180, 38], 2.4, 1.1);
  s += bx(64, 138, 150, 34, "pk", "s[0] = 'J'", { t: "" }) + cross(250, 155, 9) + tx(300, 160, "not allowed", "s");
  s += tx(180, 192, "immutable: build pieces, join once", "s");
  return s;
});

// ---- two pointers (arr-5)
def(reg, "twoPtr", 360, 200, "Two pointers walk inwards", "A word RACECAR in boxes. A left marker starts at the first letter and a right marker at the last; both move inwards comparing letters.", () => {
  const w = ["R", "A", "C", "E", "C", "A", "R"];
  let s = tx(180, 28, "same letters? move both inwards", "s");
  s += row(40, 82, w, 40, 40, (i) => (i === 0 || i === 6 ? "sg" : "cr"), { idx: 0 });
  s += an(pin(60, 76, "L"), stp([0, 40, 80, 120].map((x) => ({ x }))), 4.4);
  s += an(pinUp(300, 128, "R"), stp([0, -40, -80, -120].map((x) => ({ x }))), 4.4);
  s += tx(180, 186, "one pass: O(n) time, O(1) space", "s");
  return s;
});

// ---- sliding window (arr-6)
def(reg, "window", 360, 212, "A sliding window", "Six numbers in a row with a frame around three neighbours that slides one step at a time, adding the new number and dropping the old one. The sums 8, 7, 9, 6 appear below.", () => {
  const v = [2, 1, 5, 1, 3, 2], sums = [8, 7, 9, 6];
  let s = row(48, 62, v, 44, 44, "pe", { h: 1 });
  s += an(`<rect class="k wf" x="46" y="56" width="136" height="56" rx="8"/>`, stp([0, 44, 88, 132].map((x) => ({ x }))), 5);
  sums.forEach((m, i) => { s += seq(bx(48 + i * 44 + 44 - 18 + 0, 134, 36, 30, i === 2 ? "m" : "cr", m, { r: 4 }), i, 4, 5); });
  s += tx(180, 38, "add the new one, drop the old one", "s") + tx(180, 188, "O(n): each number enters and leaves once", "s");
  return s;
});

// ---- common pitfall: off-by-one (arr-7)
def(reg, "offByOne", 360, 196, "Off-by-one: the last index is length minus one", "Five boxes numbered 0 to 4, then a dashed sixth slot numbered 5 with a cross: it does not exist.", () => {
  let s = row(32, 78, ["a", "b", "c", "d", "e"], 52, 46, "pe", { idx: 0, h: 1 });
  s += pulse(`<rect class="k dash" x="292" y="78" width="40" height="46" rx="4" fill="none"/>` + tx(312, 140, "5", "s") + cross(312, 101, 8), [312, 101], 2, 1.12);
  s += pin(266, 72, "last");
  s += tx(180, 38, "length = 5", "s") + tx(180, 180, "valid indexes: 0 … length − 1", "s");
  return s;
});

export default reg;
