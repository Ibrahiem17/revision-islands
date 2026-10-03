/** DSA note diagrams: Sorting & Searching, Recursion & Dynamic Programming. Registered via dsa-diagrams.js. */
import { def, an, seq, stp, pulse, tx, bx, row, nd, ln, ar, pin, pinUp, bar, cross, tick } from "./dsa-kit.js";

const reg = {};

// ---- linear search (ss-1)
def(reg, "linearSearch", 360, 198, "Linear search checks one by one", "Seven boxes in a row. A pointer starts at the first box and checks each one in turn until it finds the target 8.", () => {
  const v = [4, 9, 2, 7, 1, 8, 3];
  let s = tx(180, 30, "looking for 8", "") + row(26, 78, v, 44, 44, (i) => (i === 5 ? "m" : "pe"), { idx: 0, h: 1 });
  s += an(pin(48, 72, "check"), stp([0, 1, 2, 3, 4, 5].map((i) => ({ x: i * 44 }))), 6);
  s += tick(298, 62) + tx(180, 176, "worst case: look at every item, O(n)", "s");
  return s;
});

// ---- binary search (ss-2, qr-10)
def(reg, "binarySearch", 360, 206, "Binary search halves the list", "Nine sorted numbers, looking for 13. The middle is 9, which is too small, so the left half is thrown away; the next guess is the middle of what remains.", () => {
  const v = [1, 3, 5, 7, 9, 11, 13, 15, 17];
  let s = tx(180, 28, "sorted list, looking for 13", "");
  s += row(18, 72, v, 36, 40, (i) => (i < 4 ? "bl" : i === 4 ? "m" : "pe"), { idx: 0, h: 1 });
  s += an(pin(18 + 4 * 36 + 18, 66, "mid"), [[0, {}], [30, {}], [45, { x: 72 }], [85, { x: 72 }], [100, {}]], 5);
  s += tx(110, 150, "9 is too small", "s") + tx(110, 168, "drop the left half", "s");
  s += tx(262, 160, "next guess in here", "s");
  return s;
});

// ---- bubble sort: compare two neighbours and swap (ss-3)
def(reg, "bubble", 360, 208, "Bubble sort swaps neighbours", "Five bars of different heights. The first two bars are compared and, because the left one is taller, they swap places.", () => {
  const h = [5, 3, 4, 1, 2], X = (i) => 40 + i * 56;
  let s = ln(26, 164, 334, 164);
  h.forEach((v, i) => {
    const b = bar(X(i), 164, 44, v * 24, i < 2 ? "m" : "pe") + tx(X(i) + 22, 164 - v * 24 - 6, v, "");
    s += i === 0 ? an(b, [[0, {}], [20, {}], [45, { x: 56 }], [65, { x: 56 }], [90, {}], [100, {}]], 4) : i === 1 ? an(b, [[0, {}], [20, {}], [45, { x: -56 }], [65, { x: -56 }], [90, {}], [100, {}]], 4) : b;
  });
  s += tx(180, 26, "bigger than its neighbour? swap!", "s") + tx(180, 190, "repeat until nothing swaps: O(n²)", "s");
  return s;
});

// ---- sorting a hand of cards: insertion (qr-11)
def(reg, "cardsInsertion", 360, 204, "Sorting a hand of cards", "Cards 3, 5 and 7 are already in order in your hand. The next card, 4, slides into its place between 3 and 5.", () => {
  const v = [3, 4, 5, 7];
  let s = tx(180, 32, "take the next card, slide it into place", "s");
  v.forEach((n, i) => {
    const c = bx(46 + i * 66, 66, 56, 78, i === 1 ? "m" : "cr", n, { r: 8, t: "b", s: 1 });
    s += i === 1 ? an(c, [[0, {}], [10, { y: -38, o: 0.2 }], [40, {}], [100, {}]], 4.5) : i > 1 ? an(c, [[0, {}], [10, { x: 14 }], [40, {}], [100, {}]], 4.5) : c;
  });
  s += tx(180, 180, "good for small or nearly sorted lists", "s");
  return s;
});

// ---- merge sort (ss-4)
def(reg, "mergeSort", 360, 232, "Merge sort splits then merges", "The list 5, 2, 8, 1 is split into halves and then single numbers, then merged back together in sorted order: 2 5 and 1 8, then 1 2 5 8.", () => {
  const grp = (cy, vals, gap, y, c) => { // groups: array of arrays, laid out centred
    const w = 30, sizes = vals.map((g) => g.length * w), total = sizes.reduce((a, b) => a + b, 0) + gap * (vals.length - 1);
    let x = 180 - total / 2, s = "";
    vals.forEach((g) => { s += row(x, y, g, w, 28, c, { r: 4 }); x += g.length * w + gap; });
    return s;
  };
  const rows = [
    [[[5, 2, 8, 1]], 0, 34, "pe"], [[[5, 2], [8, 1]], 24, 72, "pe"], [[[5], [2], [8], [1]], 24, 110, "pk"],
    [[[2, 5], [1, 8]], 24, 148, "sg"], [[[1, 2, 5, 8]], 0, 186, "m"],
  ];
  let s = "";
  rows.forEach(([g, gap, y, c], i) => { s += seq(grp(0, g, gap, y, c), i, 5, 6); });
  s += tx(36, 98, "split", "s") + tx(330, 168, "merge", "s");
  return s;
});

// ---- quick sort (ss-5)
def(reg, "quickSort", 360, 206, "Quick sort around a pivot", "The list 6 2 9 4 1 7 5 uses 5 as the pivot. Smaller numbers 2 4 1 go to its left and bigger numbers 6 9 7 go to its right.", () => {
  let s = row(47, 44, [6, 2, 9, 4, 1, 7, 5], 38, 34, (i) => (i === 6 ? "m" : "cr"), { r: 4 }) + pin(47 + 6 * 38 + 19, 38, "pivot");
  s += ar(180, 84, 180, 112);
  s += seq(row(40, 122, [2, 4, 1], 38, 34, "pe", { r: 4, h: 1 }), 0, 3, 4.5) + seq(bx(168, 122, 38, 34, "m", 5, { r: 4 }), 1, 3, 4.5) + seq(row(220, 122, [6, 9, 7], 38, 34, "pk", { r: 4, h: 1 }), 2, 3, 4.5);
  s += tx(97, 178, "smaller", "s") + tx(187, 178, "pivot", "s") + tx(277, 178, "bigger", "s");
  return s;
});

// ---- stable sort (ss-6)
def(reg, "stableSort", 360, 204, "Stable versus unstable sorting", "Two equal 3s, one gold and one pink, start with gold first. A stable sort keeps gold before pink; an unstable sort may swap them.", () => {
  const R = (y, label, order, mark) => {
    let s = tx(112, y + 22, label, "s", "end");
    order.forEach((o, i) => { s += bx(124 + i * 44, y, 44, 34, o[1], o[0], { r: 5 }); });
    return s + (mark ? tick(290, y + 17) : cross(290, y + 17, 9));
  };
  let s = tx(180, 28, "equal items: which comes first?", "s");
  const b = [["3", "m"], ["1", "cr"], ["3", "pk"]];
  s += tx(112, 64 + 22, "before", "s", "end") + b.map((o, i) => bx(124 + i * 44, 64, 44, 34, o[1], o[0], { r: 5 })).join("");
  s += R(108, "stable", [["1", "cr"], ["3", "m"], ["3", "pk"]], true);
  s += R(152, "unstable", [["1", "cr"], ["3", "pk"], ["3", "m"]], false);
  return s;
});

// ---- cannot binary search an unsorted list (ss-8)
def(reg, "unsortedSearch", 360, 208, "Binary search needs sorted data", "An unsorted row 9 2 7 1 8 4 6, looking for 7. The middle is 1, 7 is bigger, so binary search goes right, but 7 is actually on the left: it misses it.", () => {
  const v = [9, 2, 7, 1, 8, 4, 6];
  let s = tx(180, 28, "looking for 7 in an unsorted list", "s");
  s += row(26, 76, v, 44, 44, (i) => (i === 3 ? "m" : i === 2 ? "t" : "pe"), { idx: 0 }) + pin(26 + 3 * 44 + 22, 70, "mid");
  s += ar(222, 164, 300, 164) + tx(262, 156, "7 > 1: go right", "s") + pulse(cross(320, 164, 9), [320, 164], 1.8, 1.15);
  s += pinUp(26 + 2 * 44 + 22, 148, "7 is here!");
  s += tx(180, 192, "no order, no halving: sort first or use a hash table", "s");
  return s;
});

// ---- nesting dolls (rd-1)
def(reg, "dolls", 360, 208, "Recursion is like nesting dolls", "Four rounded boxes nested inside each other: solve(4) contains solve(3), which contains solve(2), which contains the smallest one that is answered directly.", () => {
  const D = [[24, 28, 312, 156, "pe", "solve(4)"], [66, 54, 228, 114, "pk", "solve(3)"], [108, 80, 144, 68, "sg", "solve(2)"], [144, 116, 72, 26, "m", "answer"]];
  let s = "";
  D.forEach(([x, y, w, h, c, l], i) => {
    s += seq(bx(x, y, w, h, c, "", { r: 14 }) + tx(x + (i === 3 ? w / 2 : 10), y + (i === 3 ? 18 : 22), l, "s", i === 3 ? "middle" : "start"), i, 4, 5);
  });
  return s;
});

// ---- base case + recursive case (rd-2)
def(reg, "baseCase", 360, 208, "Base case and recursive case", "Three calls f(3), f(2), f(1) step down like stairs. Each call shrinks the problem until f(1) hits the base case and stops.", () => {
  let s = seq(bx(18, 34, 104, 34, "pe", "f(3)", { s: 1 }), 0, 3, 4) + seq(bx(128, 84, 104, 34, "pk", "f(2)", { s: 1 }), 1, 3, 4) + seq(bx(238, 134, 104, 34, "sg", "f(1) stop", { s: 1 }), 2, 3, 4);
  s += ar(110, 70, 170, 82) + ar(220, 120, 280, 132);
  s += tx(100, 146, "recursive case:", "s") + tx(100, 164, "same job, smaller", "s") + tx(290, 190, "base case: stop", "s");
  s += tick(326, 124);
  return s;
});

// ---- call stack for factorial (rd-3)
def(reg, "callStack", 360, 206, "The call stack for factorial(3)", "Three stacked calls: fact(3) waits on fact(2) which waits on fact(1). fact(1) returns 1, then fact(2) returns 2 and fact(3) returns 6.", () => {
  let s = tx(100, 30, "call stack grows", "s") + tx(268, 30, "answers come back", "s");
  s += bx(34, 164, 132, 8, "ik", "", { r: 2 });
  [["fact(3)", 134, "pe"], ["fact(2)", 102, "pk"], ["fact(1)", 70, "m"]].forEach(([l, y, c], i) => { s += seq(bx(40, y, 120, 28, c, l, { t: "s" }), i, 6, 6); });
  [["3 × 2 = 6", 134, 5], ["2 × 1 = 2", 102, 4], ["returns 1", 70, 3]].forEach(([l, y, k]) => { s += seq(ar(176, y + 14, 196, y + 14) + tx(204, y + 19, l, "s", "start"), k, 6, 6); });
  return s;
});

// ---- naive Fibonacci tree (rd-4)
def(reg, "fibTree", 360, 226, "Naive Fibonacci repeats work", "The call tree for fib(4). The value fib(2) appears twice, highlighted, and fib(1) several times: the same work is done again and again.", () => {
  const N = [[180, 34, "f4"], [110, 80, "f3"], [250, 80, "f2"], [70, 126, "f2"], [150, 126, "f1"], [220, 126, "f1"], [280, 126, "f0"], [45, 172, "f1"], [95, 172, "f0"]];
  const P = [-1, 0, 0, 1, 1, 2, 2, 3, 3];
  let s = N.map((n, i) => (P[i] >= 0 ? ln(N[P[i]][0], N[P[i]][1] + 0, n[0], n[1]) : "")).join("");
  N.forEach(([x, y, l], i) => { const dup = i === 2 || i === 3; const g = nd(x, y, l, dup ? "t" : "pe", 15, "s"); s += dup ? pulse(g, [x, y], 2, 1.14) : g; });
  s += tx(300, 60, "f2 twice!", "s") + tx(180, 208, "same work again and again: O(2ⁿ)", "s");
  return s;
});

// ---- memoized Fibonacci (rd-5, qr-12)
def(reg, "fibMemo", 360, 226, "Memoization remembers answers", "The same fib(4) tree, but the second fib(2) is not recomputed: a dashed arrow reads its answer from a notebook instead. Each value is worked out once.", () => {
  const N = [[170, 34, "f4"], [100, 80, "f3"], [240, 80, "f2"], [60, 126, "f2"], [140, 126, "f1"], [35, 172, "f1"], [85, 172, "f0"]];
  const P = [-1, 0, 0, 1, 1, 3, 3];
  let s = N.map((n, i) => (P[i] >= 0 && i !== 2 ? ln(N[P[i]][0], N[P[i]][1], n[0], n[1]) : "")).join("") + ln(170, 34, 240, 80, "dash");
  N.forEach(([x, y, l], i) => { s += nd(x, y, l, i === 2 ? "sg" : "pe", 15, "s"); });
  s += bx(262, 120, 86, 70, "pp", "", { s: 1 }) + tx(305, 140, "notebook", "s") + tx(305, 160, "f1 = 1", "s") + tx(305, 177, "f2 = 1", "s");
  s += ar(244, 96, 292, 116, 0, "dash") + tx(300, 70, "look it up!", "s");
  s += tx(180, 210, "each value computed once: O(n)", "s");
  return s;
});

// ---- tabulation: fill a table (rd-6)
def(reg, "dpTable", 360, 198, "Tabulation fills a table from the start", "A row of 8 cells holding 0, 1, 1, 2, 3, 5, 8, 13. Each cell is the sum of the two before it, so the table is built from left to right.", () => {
  const v = [0, 1, 1, 2, 3, 5, 8, 13];
  let s = tx(180, 28, "each cell = the two cells before it", "s");
  v.forEach((n, i) => { s += seq(bx(28 + i * 38, 84, 38, 44, i === 7 ? "m" : "pe", n, { r: 4, h: 1 }), i, 8, 6) + tx(28 + i * 38 + 19, 146, i, "s"); });
  s += ar(235, 78, 296, 78, -22) + ar(273, 78, 310, 78, -14) + tx(290, 52, "5 + 8 = 13", "s");
  s += tx(180, 176, "start small, build up: O(n)", "s");
  return s;
});

// ---- coin change table (rd-7)
def(reg, "coinTable", 360, 206, "Coin change as a table", "Coins of 1, 3 and 4. A row of amounts 0 to 6 shows the fewest coins needed: 0, 1, 2, 1, 1, 2, 2. Six is made from two 3s.", () => {
  const v = [0, 1, 2, 1, 1, 2, 2];
  let s = tx(180, 28, "fewest coins to make each amount", "s") + tx(92, 62, "coins:", "s");
  [["1", 130], ["3", 168], ["4", 206]].forEach(([c, x]) => { s += nd(x, 57, c, "m", 12, "s"); });
  v.forEach((n, i) => { s += seq(bx(26 + i * 44, 90, 44, 44, i === 6 ? "m" : "pe", n, { r: 4, h: 1 }), i, 7, 6) + tx(26 + i * 44 + 22, 152, i, "s"); });
  s += tx(180, 176, "6 = 3 + 3  →  2 coins", "s");
  return s;
});

// ---- backtracking (rd-8)
def(reg, "backtrack", 360, 210, "Backtracking steps back from dead ends", "A decision tree: from the start, the left branch leads to two dead ends, so the search steps back and tries the right branch, which reaches the goal.", () => {
  const N = { r: [180, 32], a: [100, 78], b: [260, 78], a1: [60, 124], a2: [140, 124], b1: [220, 124], b2: [300, 124], g: [220, 170] };
  const E = [["r", "a"], ["r", "b"], ["a", "a1"], ["a", "a2"], ["b", "b1"], ["b", "b2"], ["b1", "g"]];
  let s = E.map(([p, c]) => ln(N[p][0], N[p][1], N[c][0], N[c][1])).join("");
  const dead = ["a1", "a2", "b2"], path = ["r", "b", "b1", "g"], order = ["r", "a", "a1", "a2", "b", "b1", "g", "b2"];
  order.forEach((k, i) => {
    const [x, y] = N[k], d = dead.includes(k), on = path.includes(k);
    s += seq(nd(x, y, "", d ? "t" : on ? "m" : "pe", 14) + (d ? cross(x, y, 6, "") : ""), i, order.length, 7);
  });
  s += tx(100, 160, "dead end → undo", "s") + tx(250, 176, "goal!", "s", "start");
  return s;
});

// ---- memoization vs tabulation (rd-9)
def(reg, "topBottom", 360, 210, "Top-down versus bottom-up", "Left: memoization starts from the big problem fib(5) and recurses down to smaller ones with a cache. Right: tabulation starts at the smallest fib(1) and loops upwards.", () => {
  let s = tx(90, 26, "top-down", "") + tx(270, 26, "bottom-up", "") + ln(180, 34, 180, 170, "dash");
  ["fib(5)", "fib(4)", "fib(3)"].forEach((l, i) => { s += seq(bx(36, 42 + i * 46, 108, 28, "pk", l, { t: "s" }) + (i < 2 ? ar(90, 72 + i * 46, 90, 86 + i * 46) : ""), i, 3, 4.5); });
  ["fib(3)", "fib(2)", "fib(1)"].forEach((l, i) => { s += seq(bx(216, 42 + i * 46, 108, 28, "sg", l, { t: "s" }) + (i > 0 ? ar(270, 86 + (i - 1) * 46 - 0, 270, 72 + (i - 1) * 46) : ""), 2 - i, 3, 4.5); });
  s += tx(90, 184, "recursion + cache", "s") + tx(270, 184, "a loop + a table", "s");
  return s;
});

export default reg;
