/** DSA note diagrams: Linked Lists, Stacks & Queues, Hash Tables. Registered via dsa-diagrams.js. */
import { def, an, seq, stp, pulse, tx, bx, row, nd, ln, ar, pin, pinUp, cross, tick, ht } from "./dsa-kit.js";

const reg = {};

/** linked-list node: value cell + pointer cell with a dot; returns markup, pointer dot at (x+45, y+17) */
const lnode = (x, y, v, c = "pe") =>
  bx(x, y, 34, 34, c, v, { r: 4 }) + bx(x + 34, y, 22, 34, "cr", "", { r: 4 }) + `<circle class="hd" cx="${x + 45}" cy="${y + 17}" r="3.2"/>`;

// ---- node + pointer (ll-1, qr-4)
def(reg, "llNodes", 360, 200, "A chain of nodes", "Four nodes in a row, each holding a value and an arrow to the next one. A head label marks the first node and the last arrow ends in null.", () => {
  const v = [7, 3, 9, 5], X = [20, 98, 176, 254], y = 96;
  let s = "";
  X.forEach((x, i) => { s += lnode(x, y, v[i], i === 0 ? "m" : "pe"); if (i < 3) s += ar(x + 45, y + 17, X[i + 1] - 3, y + 17); });
  s += tx(316, y + 22, "null", "s", "start");
  s += pin(37, y - 6, "head");
  s += an(pinUp(37, y + 42, "now"), stp([0, 78, 156, 234].map((x) => ({ x }))), 5);
  s += tx(180, 28, "follow the pointers, one clue at a time", "s");
  return s;
});

// ---- singly vs doubly (ll-2)
def(reg, "llDoubly", 360, 206, "Singly versus doubly linked", "Top row: three nodes joined by one-way arrows. Bottom row: three nodes joined by arrows both ways.", () => {
  let s = tx(180, 28, "singly: next only", "");
  [40, 140, 240].forEach((x, i) => { s += bx(x, 40, 56, 36, "pe", ["A", "B", "C"][i], { s: 1 }); if (i < 2) s += ar(x + 60, 58, x + 98, 58); });
  s += tx(180, 118, "doubly: next and previous", "");
  [40, 140, 240].forEach((x, i) => {
    s += bx(x, 130, 56, 36, "sg", ["A", "B", "C"][i], { s: 1 });
    if (i < 2) { s += ar(x + 60, 140, x + 98, 140) + seq(ar(x + 98, 158, x + 60, 158), i, 2, 3.6); }
  });
  return s;
});

// ---- array vs list in memory (ll-3)
def(reg, "llMemory", 360, 214, "Array versus linked list in memory", "An array is one solid block of boxes; a linked list is separate nodes scattered around memory, joined by pointers.", () => {
  let s = tx(20, 26, "array: one block", "s", "start") + row(20, 34, ["", "", "", "", ""], 44, 34, "pe", { h: 1 });
  s += tx(20, 110, "linked list: scattered nodes + pointers", "s", "start");
  const P = [[22, 128], [112, 154], [202, 124], [286, 156]];
  P.forEach(([x, y], i) => {
    s += seq(bx(x, y, 48, 30, i === 0 ? "m" : "pk", "", { r: 4, h: 1 }) + `<circle class="hd" cx="${x + 36}" cy="${y + 15}" r="3.2"/>`, i, 4, 4);
    if (i < 3) s += ar(x + 36, y + 15, P[i + 1][0] - 2, P[i + 1][1] + 15, i % 2 ? 14 : -14);
  });
  return s;
});

// ---- reverse (ll-4): static picture = the finished reversed list; animation flips arrows one by one
def(reg, "llReverse", 360, 204, "Reversing a linked list", "Four nodes 1 to 4. Every arrow ends up flipped to point backwards, so node 4 becomes the new head.", () => {
  const X = [24, 108, 192, 276], y = 86;
  let s = "";
  X.forEach((x, i) => { s += bx(x, y, 48, 40, i === 3 ? "m" : "pe", i + 1, { s: 1 }); });
  for (let i = 0; i < 3; i++) {
    const p = i * 25 + 6;
    s += an(ar(X[i] + 50, y + 12, X[i + 1] - 2, y + 12), [[0, { o: 1 }], [p, { o: 1 }], [p + 6, { o: 0 }], [97, { o: 0 }], [100, { o: 1 }]], 6, { base: "opacity:0" });
    s += an(ar(X[i + 1] - 2, y + 30, X[i] + 50, y + 30), [[0, { o: 0 }], [p, { o: 0 }], [p + 6, { o: 1 }], [100, { o: 1 }]], 6);
  }
  s += pin(300, y - 6, "new head") + tx(180, 28, "flip every arrow, one node at a time", "s") + tx(180, 172, "one pass: O(n) time, O(1) space", "s");
  return s;
});

// ---- slow and fast pointers (ll-5)
def(reg, "llCycle", 360, 206, "Slow and fast pointers on a cycle", "Six nodes in a ring. A slow runner moves one node per step and a fast runner two; on a loop the fast one eventually catches the slow one.", () => {
  const cx = 110, cy = 102, R = 58;
  let s = `<circle class="ln" cx="${cx}" cy="${cy}" r="${R}"/>`;
  for (let i = 0; i < 6; i++) { const a = ((i * 60 - 90) * Math.PI) / 180; s += nd(cx + R * Math.cos(a), cy + R * Math.sin(a), "", "pe", 11); }
  const runner = (deg, c, T) => an(nd(cx + R * Math.cos(((deg - 90) * Math.PI) / 180), cy + R * Math.sin(((deg - 90) * Math.PI) / 180), "", c, 9), [[0, { r: 0 }], [100, { r: 360 }]], T, { at: [cx, cy], e: "linear" });
  s += runner(0, "sg", 9) + runner(150, "t", 4.5);
  s += nd(228, 54, "", "sg", 9) + tx(246, 59, "slow: 1 step", "s", "start") + nd(228, 88, "", "t", 9) + tx(246, 93, "fast: 2 steps", "s", "start");
  s += tx(292, 134, "fast catches slow", "s") + tx(292, 154, "= there is a cycle", "s");
  return s;
});

// ---- cannot binary search a list (ll-6)
def(reg, "llNoMiddle", 360, 214, "A list has no shortcut to the middle", "An array can jump straight to the middle box in one step. A linked list has to be walked node by node to reach the middle.", () => {
  let s = row(40, 40, [1, 2, 3, 4, 5, 6, 7], 40, 34, (i) => (i === 3 ? "m" : "pe"), { h: 1 }) + pin(180, 34, "jump!") ;
  s += tx(180, 100, "linked list: walk node by node", "s");
  for (let i = 0; i < 7; i++) {
    s += bx(26 + i * 46, 142, 34, 28, i === 3 ? "m" : "pk", "", { r: 4 });
    if (i < 6) s += ar(62 + i * 46, 156, 70 + i * 46 + 4, 156);
  }
  s += an(pin(43, 136, "walk"), stp([0, 46, 92, 138].map((x) => ({ x }))), 4.2);
  return s;
});

// ---- insert at the front (ll-7)
def(reg, "llInsertFront", 360, 200, "Insert at the front of a linked list", "A new node is linked in front of the old first node by changing one pointer; nothing else moves.", () => {
  let s = tx(180, 30, "nothing else has to move", "s");
  [130, 200, 270].forEach((x, i) => { s += bx(x, 96, 50, 40, "pe", [4, 7, 1][i], { s: 1 }); if (i < 2) s += ar(x + 52, 116, x + 68, 116); });
  s += an(bx(30, 96, 50, 40, "m", "new", { s: 1 }) + ar(84, 116, 126, 116) + pin(55, 90, "head"), [[0, { x: -22, o: 0.25 }], [25, { x: 0, o: 1 }], [92, { x: 0, o: 1 }], [100, { x: -22, o: 0.25 }]], 4.5);
  s += tx(180, 172, "1 new node + 1 pointer change: O(1)", "s");
  return s;
});

// ---- stack of plates (sq-1, qr-5)
def(reg, "stackPlates", 360, 200, "A stack of plates", "Three plates piled up. You can only add (push) or remove (pop) the top plate, so the last one in is the first one out.", () => {
  let s = bx(88, 150, 144, 10, "ik", "", { r: 3 }) + bx(100, 122, 120, 26, "pe", "1", { h: 1 }) + bx(100, 96, 120, 26, "pk", "2", { h: 1 });
  s += an(bx(100, 70, 120, 26, "m", "3", { h: 1 }), [[0, {}], [20, {}], [45, { y: -42, o: 0.2 }], [60, { y: -42, o: 0.2 }], [85, {}], [100, {}]], 4.5);
  s += tx(52, 88, "top", "s") + ar(70, 84, 96, 84);
  s += ar(272, 40, 272, 80) + tx(272, 32, "push", "s") + ar(318, 80, 318, 40) + tx(318, 32, "pop", "s");
  s += tx(180, 184, "last in, first out (LIFO)", "s");
  return s;
});

// ---- queue (sq-2, qr-6)
def(reg, "queueLine", 360, 200, "A queue is a line", "Four boxes in a line. New items join at the back and the first one in line leaves from the front: first in, first out.", () => {
  const L = ["A", "B", "C", "D"];
  let s = an(bx(70, 82, 50, 44, "m", "A", { s: 1 }), [[0, {}], [25, {}], [50, { x: -26, o: 0.2 }], [70, { x: -26, o: 0.2 }], [90, {}], [100, {}]], 4.5);
  L.slice(1).forEach((l, i) => { s += bx(120 + i * 50, 82, 50, 44, "pe", l, { s: 1 }); });
  s += ar(70, 104, 26, 104) + tx(40, 142, "dequeue", "s") + an(ar(344, 104, 276, 104), [[0, {}], [50, { x: -8 }], [100, {}]], 2.4);
  s += tx(310, 142, "enqueue", "s") + pinUp(95, 134, "front") + pinUp(245, 134, "back");
  s += tx(180, 38, "first in, first out (FIFO)", "s");
  return s;
});

// ---- stack and queue moves side by side (sq-3)
def(reg, "stackQueueBoth", 360, 206, "Stack and queue moves", "Items 1, 2, 3 go in. A stack hands back 3 first (the last one in); a queue hands back 1 first (the first one in).", () => {
  let s = tx(88, 28, "stack", "") + tx(268, 28, "queue", "");
  s += ln(180, 36, 180, 176, "dash");
  s += bx(40, 146, 96, 8, "ik", "", { r: 2 }) + bx(46, 120, 84, 26, "pe", "1") + bx(46, 94, 84, 26, "pk", "2") + pulse(bx(46, 68, 84, 26, "m", "3"), [88, 81], 2.2, 1.06);
  s += tx(88, 178, "pop gives 3", "s");
  s += pulse(bx(204, 88, 44, 40, "m", "1", { s: 1 }), [226, 108], 2.2, 1.06) + bx(248, 88, 44, 40, "pk", "2", { s: 1 }) + bx(292, 88, 44, 40, "pe", "3", { s: 1 });
  s += tx(270, 178, "dequeue gives 1", "s");
  return s;
});

// ---- valid brackets (sq-5): static = state after reading "( [" (both plates on the pile)
def(reg, "brackets", 360, 212, "Matching brackets with a pile", "The text ( [ ] ) is read left to right. Opening brackets go on a pile, and each closing bracket must match the top of the pile.", () => {
  const ch = ["(", "[", "]", ")"];
  let s = row(30, 46, ch, 44, 40, (i) => (i < 2 ? "pk" : "bl"), { r: 6, t: "b" });
  s += an(pin(52 + 44, 40, "now"), stp([0, 44, 88, -44].map((x) => ({ x }))), 6, {});
  s += bx(236, 154, 100, 10, "ik", "", { r: 2 });
  s += an(bx(246, 128, 80, 26, "pe", "(", { t: "b" }), [[0, { o: 1 }], [52, { o: 1 }], [58, { o: 0 }], [80, { o: 0 }], [86, { o: 1 }], [100, { o: 1 }]], 6);
  s += an(bx(246, 102, 80, 26, "pk", "[", { t: "b" }), [[0, { o: 1 }], [26, { o: 1 }], [32, { o: 0 }], [96, { o: 0 }], [100, { o: 1 }]], 6);
  s += tx(286, 182, "the pile", "s") + tx(110, 112, "opener → put on pile", "s") + tx(110, 134, "closer → take off & match", "s");
  return s;
});

// ---- deque and priority queue (sq-6)
def(reg, "dequePQ", 360, 206, "Deque and priority queue", "A deque has doors at both ends. A priority queue serves the most important item first, not the oldest.", () => {
  let s = tx(100, 30, "deque", "") + tx(272, 30, "priority queue", "");
  s += ln(194, 38, 194, 180, "dash");
  s += row(40, 70, ["a", "b", "c"], 40, 40, "pe", { h: 1 });
  s += ar(8, 84, 36, 84) + ar(36, 100, 8, 100) + ar(184, 84, 164, 84) + ar(164, 100, 184, 100);
  s += tx(100, 140, "add / remove at both ends", "s");
  s += pulse(bx(212, 70, 48, 40, "m", "alarm", { t: "s", s: 1 }), [236, 90], 2.2, 1.07) + bx(260, 70, 44, 40, "pe", "chat", { t: "s", s: 1 }) + bx(304, 70, 44, 40, "cr", "mail", { t: "s", s: 1 });
  s += tx(272, 140, "most important", "s") + tx(272, 158, "goes out first", "s");
  return s;
});

// ---- queue from two stacks (sq-7)
def(reg, "twoStacks", 360, 208, "A queue built from two stacks", "Stack A holds 3, 2, 1 from the top. Pouring A into stack B reverses the order, so 1 is now on top of B and comes out first.", () => {
  let s = tx(86, 30, "stack A (in)", "s") + tx(274, 30, "stack B (out)", "s");
  s += bx(46, 150, 80, 8, "ik", "", { r: 2 }) + bx(52, 124, 68, 26, "pe", "1") + bx(52, 98, 68, 26, "pk", "2") + bx(52, 72, 68, 26, "m", "3");
  s += bx(234, 150, 80, 8, "ik", "", { r: 2 });
  s += seq(bx(240, 124, 68, 26, "m", "3"), 0, 3, 4.5) + seq(bx(240, 98, 68, 26, "pk", "2"), 1, 3, 4.5) + seq(bx(240, 72, 68, 26, "pe", "1"), 2, 3, 4.5);
  s += ar(134, 104, 226, 104, -26) + tx(180, 72, "pour", "") + tx(180, 184, "order flips: 1 is now on top", "s");
  return s;
});

// ---- key -> hash -> bucket (ht-1, qr-7)
def(reg, "hashBuckets", 360, 214, "Key to hash function to bucket", "The key ann goes into a hash function that outputs 3, which says exactly which bucket (hook) holds it. There are six buckets numbered 0 to 5.", () => {
  let s = seq(bx(12, 80, 64, 36, "pk", "ann", { s: 1 }), 0, 3, 4) + seq(bx(100, 70, 84, 56, "m", "hash()", { s: 1, h: 1 }), 1, 3, 4);
  s += ar(80, 98, 98, 98);
  for (let i = 0; i < 6; i++) {
    const c = i === 3 ? "m" : "cr", lab = i === 1 ? "bob" : i === 3 ? "ann" : i === 5 ? "cat" : "";
    const b = bx(264, 30 + i * 28, 80, 26, c, lab, { r: 4, t: "s" }) + tx(250, 49 + i * 28, i, "s");
    s += i === 3 ? seq(b, 2, 3, 4) : b;
  }
  s += ar(186, 100, 238, 30 + 3 * 28 + 13, 0) + tx(206, 80, "3", "b");
  return s;
});

// ---- spread out vs piled up (ht-2)
def(reg, "hashWorst", 360, 206, "Spread out versus piled up", "Top: six buckets each hold one item so lookup is one step. Bottom: all items pile into one bucket as a long chain, so lookup walks the whole chain.", () => {
  let s = tx(180, 26, "spread out: 1 step", "s") + row(30, 36, ["", "", "", "", "", ""], 50, 34, "cr", { r: 4 });
  for (let i = 0; i < 6; i++) s += nd(55 + i * 50, 53, "", "m", 8);
  s += tx(180, 108, "all in one spot: walk the chain", "s");
  s += bx(20, 118, 50, 34, "pk", "", { r: 4 });
  for (let i = 0; i < 5; i++) { s += seq(bx(92 + i * 50, 118, 38, 34, "t", "", { r: 4, h: 1 }), i, 5, 4); s += ar(i ? 92 + (i - 1) * 50 + 40 : 72, 135, 90 + i * 50, 135); }
  s += tx(180, 184, "a good hash function spreads keys out", "s");
  return s;
});

// ---- collisions (ht-3)
def(reg, "hashCollide", 360, 208, "Two ways to handle a collision", "Chaining: items that land in the same bucket hang off it as a little list. Open addressing: if the spot is taken, probe forward for the next free one.", () => {
  let s = tx(92, 26, "chaining", "") + tx(270, 26, "open addressing", "");
  s += ln(184, 34, 184, 168, "dash");
  [0, 1, 2].forEach((i) => { s += bx(18, 44 + i * 36, 36, 30, i === 1 ? "m" : "cr", i, { r: 4, t: "s" }); });
  s += ar(56, 95, 76, 95) + bx(78, 80, 40, 30, "pe", "ann", { r: 4, t: "s" }) + ar(120, 95, 136, 95) + seq(bx(138, 80, 40, 30, "pk", "cat", { r: 4, t: "s" }), 0, 1, 3);
  s += row(192, 80, ["", "A", "B", "", ""], 32, 34, (i) => (i === 2 ? "t" : i === 1 ? "pe" : "cr"), { r: 4, t: "s" });
  s += an(bx(192 + 3 * 32, 80, 32, 34, "pk", "C", { r: 4, t: "s" }), [[0, {}], [50, { o: 0.3 }], [100, {}]], 3);
  s += ar(192 + 2 * 32 + 16, 72, 192 + 3 * 32 + 16, 72, -22);
  s += tx(92, 172, "taken → add to the list", "s") + tx(270, 172, "taken → try the next slot", "s");
  return s;
});

// ---- dict vs set (ht-4)
def(reg, "dictSet", 360, 208, "A dictionary versus a set", "A dictionary stores key and value pairs. A set stores just the keys and answers 'have I seen this?'. Both are hash tables.", () => {
  let s = tx(100, 26, "dict: key → value", "") + tx(280, 26, "set: keys only", "");
  s += ln(194, 34, 194, 170, "dash");
  [["ann", "555"], ["bob", "777"], ["cat", "123"]].forEach(([k, v], i) => {
    s += bx(20, 44 + i * 40, 62, 32, "pk", k, { r: 5, t: "s" }) + ar(84, 60 + i * 40, 112, 60 + i * 40) + bx(116, 44 + i * 40, 62, 32, "pe", v, { r: 5, t: "s" });
  });
  ["ann", "bob", "cat"].forEach((k, i) => { s += bx(214, 44 + i * 40, 64, 32, "m", k, { r: 5, t: "s", s: 1 }); });
  s += tx(318, 96, "seen bob?", "s") + tick(318, 118) + tx(318, 144, "yes, fast", "s");
  return s;
});

// ---- two sum with a notebook (ht-5)
def(reg, "twoSum", 360, 208, "Two sum with a notebook", "Numbers 2, 7, 11, 15 and a target of 9. When the pointer reaches 7 the partner 2 is already in the notebook, so the answer is found in one pass.", () => {
  let s = tx(283, 26, "target = 9", "");
  s += row(18, 48, [2, 7, 11, 15], 44, 40, (i) => (i < 2 ? "pe" : "cr"), { idx: 0 });
  s += an(pin(84, 42, "now"), [[0, {}], [30, {}], [45, { x: -44 }], [75, { x: -44 }], [90, {}], [100, {}]], 5);
  s += bx(222, 38, 122, 92, "pp", "", { s: 1 }) + tx(283, 60, "notebook", "s");
  s += an(bx(232, 70, 102, 30, "m", "2 → spot 0", { r: 5, t: "s" }), [[0, { o: 1 }], [44, { o: 1 }], [46, { o: 0 }], [60, { o: 0 }], [66, { o: 1 }], [100, { o: 1 }]], 5);
  s += tx(100, 134, "9 − 7 = 2", "") + tick(176, 130) + tx(120, 158, "2 is in the notebook!", "s");
  s += tx(180, 188, "one pass: O(n) time, O(n) space", "s");
  return s;
});

// ---- changed key loses its item (ht-7)
def(reg, "keyChange", 360, 206, "A changed key loses its item", "The key cat hashes to slot 3 where its item is stored. If the key changed to bat it would hash to slot 6, where nothing is stored, so the item is lost.", () => {
  let s = bx(14, 36, 58, 34, "pk", "cat", { s: 1 }) + ar(78, 53, 104, 53) + bx(108, 36, 68, 34, "m", "hash", { s: 1 }) + ar(182, 53, 212, 53) + bx(216, 36, 66, 34, "sg", "slot 3", { s: 1, t: "s" }) + tick(310, 52);
  s += bx(14, 110, 58, 34, "pk", "bat", { s: 1 }) + ar(78, 127, 104, 127) + bx(108, 110, 68, 34, "m", "hash", { s: 1 }) + ar(182, 127, 212, 127);
  s += pulse(bx(216, 110, 66, 34, "cr", "slot 6", { s: 1, t: "s" }) + cross(310, 127, 9), [300, 127], 2, 1.1);
  s += tx(180, 24, "the key as stored", "s") + tx(180, 98, "the key was changed", "s") + tx(180, 180, "new key → new hash → item lost", "s");
  return s;
});

export default reg;
