/** DSA note diagrams: Trees & Heaps, Graphs. Registered via dsa-diagrams.js. */
import { def, an, seq, stp, pulse, tx, bx, nd, ln, ar, fat, pin, cross, tick } from "./dsa-kit.js";

const reg = {};

// ---- helpers
/** 7-node perfect binary tree positions (heap indexing 0..6); u = half-gap unit */
const bt = (cx, top, u, dy) => Array.from({ length: 7 }, (_, i) => {
  const l = i === 0 ? 0 : i < 3 ? 1 : 2, k = i - (2 ** l - 1);
  return [cx + (k - (2 ** l - 1) / 2) * (8 * u / 2 ** l), top + l * dy];
});
const par = (i) => (i - 1) >> 1;
/** edge between points a,b shortened by r at both ends; arrow adds a head at b */
const edge = (a, b, r = 15, arrow = false, c = "", bend = 0) => {
  const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L;
  const x1 = a[0] + ux * r, y1 = a[1] + uy * r, x2 = b[0] - ux * (r + (arrow ? 1 : 0)), y2 = b[1] - uy * (r + (arrow ? 1 : 0));
  return arrow ? ar(x1, y1, x2, y2, bend, c) : ln(x1, y1, x2, y2, c);
};
const treeEdges = (P, r = 14) => P.map((p, i) => (i ? edge(P[par(i)], p, r) : "")).join("");

// ---- tree words (tr-1)
def(reg, "treeWords", 360, 206, "Tree words", "A binary tree with seven nodes. The top node is the root, a node with children is a parent, the bottom nodes are leaves, and height is the longest path from the root down to a leaf.", () => {
  const P = bt(150, 46, 22, 50), cls = (i) => (i === 0 ? "m" : i > 2 ? "sg" : "pe");
  let s = treeEdges(P);
  P.forEach((p, i) => { s += nd(p[0], p[1], "", cls(i), 14); });
  s += seq(ar(262, 46, 170, 46) + tx(268, 51, "root", "s", "start"), 0, 3, 5);
  s += seq(ar(262, 96, 212, 96) + tx(268, 101, "parent", "s", "start"), 1, 3, 5);
  s += seq(ar(262, 146, 236, 146) + tx(268, 151, "leaf", "s", "start"), 2, 3, 5);
  s += `<path class="ln" d="M34 46V150"/><path class="ln" d="M28 46h12M28 150h12"/><text class="s" transform="rotate(-90 22 98)" x="22" y="98" text-anchor="middle">height</text>`;
  s += tx(180, 184, "child = a node just below another", "s");
  return s;
});

// ---- BST rule (tr-2, qr-8)
def(reg, "bstRule", 360, 206, "A binary search tree", "A tree with 8 at the top: everything on the left (3, 1, 6) is smaller than 8 and everything on the right (10, 9, 14) is bigger.", () => {
  const P = bt(180, 44, 26, 52), v = [8, 3, 10, 1, 6, 9, 14];
  let s = treeEdges(P, 15);
  P.forEach((p, i) => { s += nd(p[0], p[1], v[i], i === 0 ? "m" : i === 1 || i === 3 || i === 4 ? "pe" : "pk", 15); });
  s += tx(160, 40, "smaller", "s", "end") + tx(200, 40, "bigger", "s", "start");
  s += pulse(tx(180, 190, "left < node < right, all the way down", "s"), [180, 186], 3, 1.03);
  return s;
});

// ---- BST search path (tr-3)
def(reg, "bstSearch", 360, 206, "Searching a binary search tree for 6", "Starting at 8, 6 is smaller so go left to 3; 6 is bigger so go right to 6 and it is found. Only three nodes are visited.", () => {
  const P = bt(180, 44, 26, 52), v = [8, 3, 10, 1, 6, 9, 14], path = [0, 1, 4];
  let s = treeEdges(P, 15);
  path.forEach((i, k) => { if (k) s += seq(edge(P[par(i)], P[i], 15, true, ""), k, 4, 4.6); });
  P.forEach((p, i) => { const k = path.indexOf(i); const n = nd(p[0], p[1], v[i], k >= 0 ? "m" : "cr", 15); s += k >= 0 ? seq(n, k, 4, 4.6) : n; });
  s += tx(180, 188, "6 < 8: go left,  6 > 3: go right,  found!", "s");
  return s;
});

// ---- balance matters (tr-4)
def(reg, "treeBalance", 360, 206, "Balanced tree versus a stick", "Left: a short bushy tree of three levels, so search is O(log n). Right: sorted inserts make a long stick of 5 nodes, so search is O(n).", () => {
  const P = bt(88, 52, 14, 40);
  let s = tx(88, 26, "balanced", "") + tx(268, 26, "sorted inserts", "") + treeEdges(P, 12);
  P.forEach((p) => { s += nd(p[0], p[1], "", "sg", 12); });
  const C = [[218, 52], [240, 76], [262, 100], [284, 124], [306, 148]];
  C.forEach((p, i) => { if (i) s += edge(C[i - 1], p, 12); });
  C.forEach((p, i) => { s += seq(nd(p[0], p[1], "", "t", 12), i, 5, 4); });
  s += tx(88, 174, "short: O(log n)", "s") + tx(250, 182, "a stick: O(n)", "s");
  return s;
});

// ---- four traversals (tr-5)
def(reg, "traversals", 360, 252, "Four ways to visit every node", "Four copies of the same seven-node tree, each numbered 1 to 7 in the order it is visited: pre-order, in-order, post-order and level-order.", () => {
  const ranks = {
    pre: [1, 2, 5, 3, 4, 6, 7], in: [4, 2, 6, 1, 3, 5, 7], post: [7, 3, 6, 1, 2, 4, 5], level: [1, 2, 3, 4, 5, 6, 7],
  };
  const T = [["pre", "pre: node · left · right", 90, 40], ["in", "in: left · node · right", 270, 40], ["post", "post: left · right · node", 90, 150], ["level", "level: row by row", 270, 150]];
  let s = "";
  T.forEach(([k, title, cx, top]) => {
    const P = bt(cx, top + 8, 14, 30);
    s += tx(cx, top - 14, title, "s") + treeEdges(P, 11);
    P.forEach((p, i) => { s += seq(nd(p[0], p[1], ranks[k][i], "pe", 11, "s"), ranks[k][i] - 1, 7, 6); });
  });
  return s;
});

// ---- heap sift up (tr-6)
def(reg, "heapSift", 360, 208, "A min-heap and sifting up", "A heap tree with 1 at the top. A new value 1 was added at the bottom and swapped upwards past bigger parents (3, then 2) until it reached the top.", () => {
  const P = bt(180, 38, 34, 52), v = [1, 4, 2, 9, 6, 7, 3], path = [6, 2, 0];
  let s = treeEdges(P, 16);
  P.forEach((p, i) => {
    const k = path.indexOf(i), n = nd(p[0], p[1], v[i], k >= 0 ? "m" : "pe", 16);
    s += k >= 0 ? seq(n, k, 3, 4.5) : n;
  });
  s += seq(ar(273, 128, 257, 104) + ar(235, 80, 194, 48), 1, 3, 4.5);
  s += tx(300, 30, "smallest on top", "s") + tx(180, 190, "insert at the bottom, swap up while smaller", "s");
  return s;
});

// ---- trie (tr-7)
def(reg, "trie", 360, 208, "A trie of three words", "Letters hang from a root: c, a, r and c, a, t share the start 'ca', while d, o, g takes its own branch. Gold nodes end a word.", () => {
  const N = { r: [180, 34, ""], c: [120, 80, "c"], d: [250, 80, "d"], a: [120, 126, "a"], o: [250, 126, "o"], R: [86, 172, "r"], t: [154, 172, "t"], g: [250, 172, "g"] };
  const E = [["r", "c"], ["r", "d"], ["c", "a"], ["d", "o"], ["a", "R"], ["a", "t"], ["o", "g"]];
  let s = E.map(([a, b]) => edge(N[a].slice(0, 2), N[b].slice(0, 2), 14)).join("");
  const order = ["r", "c", "a", "R", "t", "d", "o", "g"];
  order.forEach((k, i) => {
    const [x, y, l] = N[k];
    s += seq(nd(x, y, l, "RtG".includes(k) || k === "g" ? "m" : k === "c" || k === "a" ? "pk" : k === "r" ? "ik" : "pe", 14, k === "r" ? "w" : ""), i, 8, 6);
  });
  s += tx(14, 32, "car, cat, dog", "s", "start") + tx(14, 50, "(gold = word ends)", "s", "start");
  return s;
});

// ---- DFS vs BFS on a tree (tr-8)
def(reg, "dfsBfsTree", 360, 196, "DFS versus BFS on a tree", "Two copies of one tree. Depth-first search numbers the nodes down each branch first; breadth-first search numbers them row by row.", () => {
  const dfs = [1, 2, 5, 3, 4, 6, 7], bfs = [1, 2, 3, 4, 5, 6, 7];
  let s = "";
  [["DFS: deep first", 90, dfs, "sg"], ["BFS: row by row", 270, bfs, "bl"]].forEach(([title, cx, r, c]) => {
    const P = bt(cx, 54, 15, 40);
    s += tx(cx, 28, title, "") + treeEdges(P, 12);
    P.forEach((p, i) => { s += seq(nd(p[0], p[1], r[i], c, 12, "s"), r[i] - 1, 7, 6); });
  });
  s += tx(90, 172, "stack or recursion", "s") + tx(270, 172, "a queue", "s");
  return s;
});

// ---- nodes and edges (gr-1, qr-9)
def(reg, "graphBasics", 360, 206, "Nodes and edges", "Five dots (nodes) joined by lines (edges), like cities and roads. One node and one edge are labelled.", () => {
  const N = { A: [52, 66], B: [150, 40], C: [240, 82], D: [102, 134], E: [206, 140] };
  const E = ["AB", "BC", "AD", "BD", "DE", "CE"];
  let s = E.map(([a, b]) => edge(N[a], N[b], 15)).join("");
  Object.entries(N).forEach(([k, [x, y]]) => { s += nd(x, y, k, k === "B" ? "m" : "pe", 15); });
  s += seq(ar(262, 34, 168, 38) + tx(268, 39, "node (city)", "s", "start"), 0, 2, 4);
  s += seq(ar(154, 170, 154, 144) + tx(154, 188, "edge (road)", "s"), 1, 2, 4);
  return s;
});

// ---- kinds of graph (gr-2)
def(reg, "graphKinds", 360, 186, "Undirected, directed and weighted graphs", "Three triangles of nodes: plain lines (two-way roads), arrows (one-way streets) and lines with numbers (costs).", () => {
  let s = "";
  const mk = (cx, kind) => {
    const A = [cx - 40, 112], B = [cx + 40, 112], C = [cx, 56];
    const E = [[A, B], [B, C], [C, A]];
    let g = "";
    E.forEach(([a, b], i) => {
      g += kind === "dir" ? edge(a, b, 15, true) : edge(a, b, 15);
      if (kind === "w") g += bx((a[0] + b[0]) / 2 - 11, (a[1] + b[1]) / 2 - 10, 22, 20, "m", [4, 7, 2][i], { r: 4, t: "s" });
    });
    [A, B, C].forEach((p, i) => { g += nd(p[0], p[1], "ABC"[i], "pe", 14); });
    return g;
  };
  [["undirected", 62, "u", "two-way roads"], ["directed", 180, "dir", "one-way streets"], ["weighted", 298, "w", "edges have a cost"]].forEach(([t, cx, k, cap], i) => {
    s += tx(cx, 28, t, "") + seq(mk(cx, k), i, 3, 6) + tx(cx, 148, cap, "s");
  });
  return s;
});

// ---- adjacency list vs matrix (gr-3)
def(reg, "adjacency", 360, 212, "Adjacency list versus adjacency matrix", "A four-node graph, the same graph as a list of neighbours for each node, and as a 4 by 4 grid with a 1 wherever two nodes are joined.", () => {
  const N = { A: [34, 64], B: [92, 64], C: [92, 124], D: [34, 124] };
  let s = tx(64, 28, "graph", "") + ["AB", "AC", "BC", "CD"].map(([a, b]) => edge(N[a], N[b], 13)).join("");
  Object.entries(N).forEach(([k, [x, y]]) => { s += nd(x, y, k, "pe", 13); });
  s += tx(172, 28, "list", "");
  [["A", "B, C"], ["B", "A, C"], ["C", "A, B, D"], ["D", "C"]].forEach(([k, v], i) => { s += seq(bx(128, 44 + i * 32, 90, 26, "pk", `${k} → ${v}`, { r: 5, t: "s" }), i, 4, 5); });
  s += tx(298, 28, "matrix", "");
  const M = ["0110", "1010", "1101", "0010"];
  "ABCD".split("").forEach((l, i) => { s += tx(275 + i * 22, 56, l, "s") + tx(254, 78 + i * 22 + 5, l, "s"); });
  M.forEach((r, i) => r.split("").forEach((c, j) => { s += bx(264 + j * 22, 62 + i * 22, 22, 22, c === "1" ? "m" : "cr", c, { r: 2, t: "s" }); }));
  s += tx(172, 180, "list: O(V+E) space  ·  matrix: O(V²) space", "s");
  return s;
});

// ---- BFS wave (gr-4)
def(reg, "bfsWave", 360, 230, "BFS spreads like ripples", "A graph where the start node S lights first, then its neighbours, then theirs, then theirs. A queue strip shows A and B waiting in line.", () => {
  const N = { S: [42, 96, 0], A: [118, 54, 1], B: [118, 138, 1], C: [196, 30, 2], D: [196, 96, 2], E: [196, 160, 2], F: [276, 62, 3], G: [276, 130, 3] };
  const E = ["SA", "SB", "AC", "AD", "BD", "BE", "CF", "DF", "DG", "EG"], col = ["m", "pk", "pe", "bl"];
  let s = E.map(([a, b]) => edge(N[a], N[b], 14)).join("");
  for (let lv = 0; lv < 4; lv++) {
    let g = ""; Object.entries(N).forEach(([k, [x, y, l]]) => { if (l === lv) g += nd(x, y, k, col[lv], 14); });
    s += seq(g, lv, 4, 6);
  }
  s += tx(20, 206, "queue →", "s", "start") + bx(84, 190, 34, 26, "pk", "A", { r: 4 }) + bx(118, 190, 34, 26, "pk", "B", { r: 4 }) + tx(300, 206, "first in, first out", "s");
  return s;
});

// ---- BFS vs DFS on a graph (gr-5)
def(reg, "bfsVsDfs", 360, 200, "BFS versus DFS on a graph", "The same small graph twice. Breadth-first numbers the nodes level by level; depth-first dives down one branch before backing up.", () => {
  let s = "";
  [["BFS: ring by ring", 90, [1, 2, 3, 4, 5, 6], "bl"], ["DFS: dive deep", 270, [1, 2, 5, 3, 4, 6], "sg"]].forEach(([title, cx, r, c]) => {
    const N = [[cx, 52], [cx - 40, 102], [cx + 40, 102], [cx - 60, 152], [cx - 20, 152], [cx + 40, 152]], E = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5]];
    s += tx(cx, 26, title, "") + E.map(([a, b]) => edge(N[a], N[b], 13)).join("");
    N.forEach((p, i) => { s += seq(nd(p[0], p[1], r[i], c, 13, "s"), r[i] - 1, 6, 6); });
  });
  s += tx(90, 184, "a queue", "s") + tx(270, 184, "stack or recursion", "s");
  return s;
});

// ---- cycle detection (gr-6)
def(reg, "cycleDetect", 360, 206, "Detecting a cycle", "Four nodes A to D joined in a loop by arrows. Following the path A, B, C, D, the last arrow leads back to A, a node already on the path: a cycle.", () => {
  const N = { A: [96, 54], B: [250, 54], C: [250, 132], D: [96, 132] };
  let s = "";
  [["A", "B"], ["B", "C"], ["C", "D"]].forEach(([a, b], i) => { s += seq(edge(N[a], N[b], 16, true), i, 5, 5); });
  s += seq(edge(N.D, N.A, 16, true, "tc"), 3, 5, 5);
  Object.entries(N).forEach(([k, [x, y]], i) => { s += seq(nd(x, y, k, k === "D" ? "pk" : "pe", 16), i, 5, 5); });
  s += pulse(tx(60, 94, "back!", "") , [60, 94], 1.8, 1.12);
  s += tx(180, 100, "path: A → B → C → D", "s") + tx(180, 182, "an arrow back onto the path = a cycle", "s");
  return s;
});

// ---- topological sort (gr-7)
def(reg, "topoSort", 360, 208, "Topological sort: socks before shoes", "Five tasks with arrows for what depends on what. Numbers 1 to 5 give an order where every task comes after the ones it needs.", () => {
  const L = { socks: [18, 38], pants: [18, 90], shirt: [18, 142], shoes: [190, 56], belt: [190, 124] }, ord = { socks: 1, pants: 2, shirt: 3, shoes: 4, belt: 5 };
  let s = "";
  [["socks", "shoes"], ["pants", "shoes"], ["pants", "belt"], ["shirt", "belt"]].forEach(([a, b]) => {
    s += ar(L[a][0] + 74, L[a][1] + 17, L[b][0] - 4, L[b][1] + 17);
  });
  Object.keys(L).forEach((k) => {
    const [x, y] = L[k];
    s += seq(bx(x, y, 74, 34, k === "shoes" || k === "belt" ? "m" : "pe", k, { r: 6, t: "s", s: 1 }) + nd(x + 74, y, ord[k], "pk", 11, "s"), ord[k] - 1, 5, 5);
  });
  s += tx(180, 190, "each task comes after the ones it depends on", "s");
  return s;
});

// ---- Dijkstra (gr-8)
def(reg, "dijkstra", 360, 212, "Dijkstra finds the cheapest path", "A weighted graph from S to T. The numbers in circles are the cheapest cost from S: A 2, B 5, D 7, C 9, T 11. The cheapest path S, A, B, D, T is drawn thick.", () => {
  const N = { S: [36, 104], A: [120, 52], B: [120, 156], C: [240, 52], D: [240, 156], T: [324, 104] };
  const dist = { S: 0, A: 2, B: 5, C: 9, D: 7, T: 11 };
  const E = [["S", "A", 2, 1], ["S", "B", 6, 0], ["A", "B", 3, 1], ["A", "C", 7, 0], ["B", "D", 2, 1], ["C", "T", 3, 0], ["D", "T", 4, 1]];
  let s = "";
  E.forEach(([a, b, w, on]) => {
    s += on ? edge(N[a], N[b], 15, false, "tc") : edge(N[a], N[b], 15);
    s += bx((N[a][0] + N[b][0]) / 2 - 11, (N[a][1] + N[b][1]) / 2 - 10, 22, 20, on ? "m" : "cr", w, { r: 4, t: "s" });
  });
  const path = ["S", "A", "B", "D", "T"];
  Object.entries(N).forEach(([k, [x, y]]) => {
    const g = nd(x, y, k, path.includes(k) ? "m" : "pe", 15) + nd(x, k === "B" || k === "D" ? y + 28 : y - 28, dist[k], "pp", 10, "s");
    s += path.includes(k) ? seq(g, path.indexOf(k), 5, 6) : g;
  });
  s += tx(206, 108, "circle = cost from S", "s");
  return s;
});

// ---- BFS or Dijkstra (gr-9)
def(reg, "bfsOrDijkstra", 360, 204, "BFS versus Dijkstra for shortest path", "From S to T there is a direct road costing 10 (one hop) and a longer route of three hops costing 1 each. BFS picks the direct road; Dijkstra picks the cheaper three-hop route costing 3.", () => {
  const S = [40, 90], A = [130, 48], B = [230, 48], T = [320, 90];
  let s = edge(S, T, 15, false, "dash") + bx(168, 78, 26, 22, "pk", "10", { r: 4, t: "s" });
  s += edge(S, A, 15, false, "tc") + edge(A, B, 15, false, "tc") + edge(B, T, 15, false, "tc");
  [[S, A], [A, B], [B, T]].forEach(([a, b]) => { s += bx((a[0] + b[0]) / 2 - 9, (a[1] + b[1]) / 2 - 10, 18, 20, "m", 1, { r: 4, t: "s" }); });
  [[S, "S"], [A, "A"], [B, "B"], [T, "T"]].forEach(([p, l]) => { s += nd(p[0], p[1], l, l === "S" || l === "T" ? "m" : "pe", 15); });
  s += tx(180, 140, "BFS: fewest hops (1 hop), cost 10", "s") + pulse(tx(180, 162, "Dijkstra: cheapest (3 hops), cost 3", ""), [180, 158], 2.4, 1.04);
  return s;
});

export default reg;
