/**
 * System Design figures for Topic 3's extra note (sd-13) and Topic 4 (Replication and Sharding).
 * Split out of system-design-diagrams-data.js purely to keep files readable — same ink language,
 * same conventions (thick black round-join strokes `nd-k`, flat fills, mustard as the only accent,
 * no faces, CSS-keyframe animation bound to `.note-diagram.is-playing` only, complete static
 * picture otherwise). See system-design-diagrams.js's header for the full style contract.
 *
 * Every panel gets a unique prefix `p` (used for its keyframe/class names) so many figures can sit
 * on one page without clashing. Panels are 300 units wide.
 */
import { keyframes, bind, move, arrowDown, arrowRight, TICK, CROSS, panel } from "../system-design-diagrams.js";

// ---------- small drawing helpers (mirrors system-design-diagrams-data.js) ----------
const tx = (x, y, s, cls = "nd-s", anchor = "") =>
  `<text class="${cls}" x="${x}" y="${y}"${anchor ? ` text-anchor="${anchor}"` : ""}>${s}</text>`;
const tl = (x, y, arr, cls = "nd-s", dy = 13.5) => arr.map((s, i) => tx(x, y + i * dy, s, cls)).join("");
const head = (l1, l2) =>
  tx(8, 18, l1, "nd-t") + (l2 ? tx(8, 35, l2, "nd-t") : "") +
  `<rect class="nd-k nd-t2 nd-yfill" x="8" y="${l2 ? 41 : 24}" width="46" height="6"/>`;
const rc = (x, y, w, h, cls = "nd-p", r = 5, extra = "") =>
  `<rect class="nd-k ${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}"${extra ? " " + extra : ""}/>`;
const DASH = `style="stroke-dasharray:7 5"`;
const ticket = (cls, label = "55") =>
  `<g class="nd-pk ${cls}"><rect class="nd-k nd-t2 nd-yfill" x="-16" y="-10" width="32" height="20" rx="3"/><path class="nd-k nd-t2" d="M-16,-10L0,2L16,-10"/><text class="nd-pkt" x="0" y="8" text-anchor="middle">${label}</text></g>`;
const stamp = (cx, cy, rot, cls, w, h, text) =>
  `<g transform="translate(${cx},${cy}) rotate(${rot})"><g class="nd-fb ${cls}"><rect class="nd-k nd-t2 nd-inkfill" x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="3"/>${tx(0, 4, text, "nd-st nd-onink", "middle")}</g></g>`;
const one = (inner) => `<div class="nd-panels nd-one">${inner}</div>`;
const two = (a, b) => `<div class="nd-panels">${a}${b}</div>`;

function anim(p) {
  const css = [];
  return {
    add(name, T, frames) { css.push(keyframes(p + name, T, frames) + bind(`.${p}${name}`, p + name, T)); return p + name; },
    style: () => `<style>${css.join("")}</style>`,
  };
}
function trk(T, pts) {
  const f = pts.map(([t, x, y, o]) => [t, move(x, y, o)]);
  const a = pts[0], z = pts[pts.length - 1];
  return [...(a[0] > 0 ? [[0, move(a[1], a[2], 0)]] : []), ...f, [T, move(z[1], z[2], 0)]];
}
const HIDE = "opacity:0;transform:scale(1.9) rotate(-8deg)";
const pop = (T, t0) => [
  [0, HIDE], [t0 - 0.05, HIDE], [t0 + 0.12, "opacity:1;transform:scale(.92)"], [t0 + 0.3, "opacity:1;transform:scale(1)"],
  [T - 0.5, "opacity:1;transform:scale(1)"], [T, "opacity:0;transform:scale(1)"],
];
const fadeIn = (T, t0, d = 0.3) => [[0, "opacity:0"], [t0, "opacity:0"], [t0 + d, "opacity:1"], [T - 0.5, "opacity:1"], [T, "opacity:0"]];
const draw = (T, t0, t1) => [
  [0, "stroke-dasharray:1;stroke-dashoffset:1"], [t0, "stroke-dasharray:1;stroke-dashoffset:1"],
  [t1, "stroke-dasharray:1;stroke-dashoffset:0"], [T - 0.5, "stroke-dasharray:1;stroke-dashoffset:0"],
  [T, "stroke-dasharray:1;stroke-dashoffset:1"],
];
/** tiny table, header + rows drawn directly (no per-row animation — used by the JOIN figure) */
function tbl(x, y, w, name, cols, rows) {
  const g = [rc(x, y, w, 24 + 22 + rows.length * 22, "nd-p")];
  g.push(`<rect class="nd-inkfill" x="${x + 1.6}" y="${y + 24}" width="${w - 3.2}" height="22"/>`);
  g.push(tx(x + 12, y + 17, name, "nd-b"));
  cols.forEach(([cxp, label]) => g.push(tx(cxp, y + 39, label, "nd-st nd-onink")));
  rows.forEach((r, i) => cols.forEach(([cxp], j) => g.push(tx(cxp, y + 24 + 22 + i * 22 + 15, r[j], "nd-s"))));
  return g.join("");
}

/* ============================================================
   Topic 3 - sd-13: the trade in one line
   ============================================================ */
function tradeoffPanel() {
  const p = "ndTrade", m = anim(p), T = 6;
  const flip = m.add("F", T, [[0, "transform:scale(1)"], [2.6, "transform:scale(1)"], [2.9, "transform:scale(1.08)"], [3.2, "transform:scale(1)"], [T, "transform:scale(1)"]]);
  const inner = `${head("THE TRADE, IN ONE LINE")}
    ${rc(8, 50, 284, 70, "nd-inkfill")}${tx(150, 76, "SQL trades SCALE", "nd-b nd-onink", "middle")}${tx(150, 96, "for CORRECTNESS", "nd-b nd-onink", "middle")}
    <g class="nd-fb ${flip}">${rc(8, 132, 284, 70, "nd-yfill")}${tx(150, 158, "NoSQL trades CORRECTNESS", "nd-b", "middle")}${tx(150, 178, "for SCALE", "nd-b", "middle")}</g>
    ${tl(8, 222, ["Pick the one whose trade you can", "actually afford."], "nd-s nd-cap")}`;
  return panel("trade", 246, "The trade in one line",
    "SQL trades scale for correctness. NoSQL trades correctness for scale.", inner) + m.style();
}

/* ============================================================
   Topic 4 - intro: write vs read, the 100:1 ratio
   ============================================================ */
function ratioPanel() {
  const p = "ndR14", m = anim(p), T = 7.2;
  const wt = m.add("W", T, trk(T, [[0.3, 20, 118, 0], [0.5, 20, 118, 1], [1.3, 80, 118, 1], [1.5, 80, 118, 0]]));
  const reads = [0, 1, 2, 3].map((i) => {
    const b = 2.0 + i * 1.2;
    return m.add(`R${i}`, T, trk(T, [[b, 20, 190, 0], [b + 0.15, 20, 190, 1], [b + 0.9, 280, 190, 1], [b + 1.05, 280, 190, 0]]));
  });
  const inner = `${head("WRITE vs READ", "a typical app's ratio")}
    ${tl(8, 63, ["Write — saving or changing something.", "Read — just looking at something."])}
    ${rc(8, 96, 284, 44, "nd-inkfill")}${tx(150, 113, "WRITE", "nd-b nd-onink", "middle")}${tx(150, 130, "1 out of every 101 requests", "nd-s nd-onink", "middle")}
    ${rc(8, 150, 284, 80, "nd-yfill")}${tx(150, 172, "READ", "nd-b", "middle")}${tx(150, 189, "100 out of every 101 requests", "nd-s", "middle")}
    ${stamp(150, 254, -1.5, "nd-static", 236, 28, "100 READS FOR EVERY 1 WRITE")}
    ${tl(8, 300, ["That imbalance is what makes", "replication so useful."], "nd-s nd-cap")}
    ${ticket(wt)}${reads.map((r) => ticket(r)).join("")}`;
  return panel("r14", 324, "Write versus read: a typical app's ratio",
    "Write means saving or changing something, like placing an order or editing a profile. Read means just looking at something, like opening a page. A typical app does 100 reads for every 1 write, and that imbalance is what makes replication so useful.",
    inner) + m.style();
}

/* ============================================================
   Topic 4 - Part 1: replication (single point of failure -> leader/followers + failover)
   ============================================================ */
function crashPanel() {
  const p = "ndRepA", m = anim(p), T = 6;
  const dbFill = m.add("D", T, [[0, "opacity:0"], [1.6, "opacity:0"], [2.0, "opacity:1"], [T - 0.5, "opacity:1"], [T, "opacity:0"]]);
  const stampC = m.add("St", T, pop(T, 2.3));
  const t = m.add("T", T, trk(T, [[0.2, 54, 100, 0], [0.4, 54, 100, 1], [1.2, 150, 100, 1], [1.5, 150, 140, 1], [1.7, 150, 140, 0]]));
  const inner = `${head("WITHOUT REPLICATION", "one machine, one point of failure")}
    ${tl(8, 63, ["Every read and every write hits one", "database machine."])}
    ${rc(60, 96, 180, 90, "nd-p")}${tx(150, 130, "DATABASE", "nd-b", "middle")}${tx(150, 148, "data: Ali, Sara, Bilal", "nd-s", "middle")}
    <rect class="nd-k nd-inkfill ${dbFill}" style="opacity:0" x="60" y="96" width="180" height="90" rx="5"/>
    <path class="nd-mk nd-mk-paper ${dbFill}" style="opacity:0" transform="translate(150,141) scale(1.7)" d="${CROSS}"/>
    ${stamp(150, 220, -2, stampC, 220, 30, "IT DIES — SITE IS DOWN")}
    ${tl(8, 268, ["A single point of failure: one thing", "whose death kills everything."], "nd-s nd-cap")}
    ${ticket(t)}`;
  return panel("rep-crash", 290, "Without replication: one machine is a single point of failure",
    "Every read and every write hits one database machine. If it dies, the entire product goes down. This is called a single point of failure — one thing whose death kills everything.", inner) + m.style();
}
function replicationCorePanel() {
  const p = "ndRepB", m = anim(p), T = 10;
  const wt = m.add("W", T, trk(T, [[0.3, 52, 116, 0], [0.5, 52, 116, 1], [1.1, 128, 116, 1], [1.3, 128, 116, 0]]));
  const c1 = m.add("C1", T, trk(T, [[1.4, 211, 152, 0], [1.5, 211, 152, 1], [2.2, 77, 196, 1], [2.4, 77, 196, 0]]));
  const c2 = m.add("C2", T, trk(T, [[1.4, 211, 152, 0], [1.5, 211, 152, 1], [2.2, 229, 196, 1], [2.4, 229, 196, 0]]));
  const r1 = m.add("R1", T, trk(T, [[2.8, 52, 146, 0], [3.0, 52, 146, 1], [3.6, 77, 196, 1], [3.8, 77, 196, 0]]));
  const r2 = m.add("R2", T, trk(T, [[4.0, 52, 146, 0], [4.2, 52, 146, 1], [4.8, 229, 196, 1], [5.0, 229, 196, 0]]));
  const crown = m.add("Cr", T, pop(T, 6.3));
  const stampUp = m.add("St", T, pop(T, 7.0));
  const flip = m.add("Fl", T, [[0, "fill:var(--yellow)"], [5.8, "fill:var(--yellow)"], [6.1, "fill:var(--ink)"], [9.2, "fill:var(--ink)"], [9.5, "fill:var(--yellow)"], [T, "fill:var(--yellow)"]]);
  const inner = `${head("REPLICATION", "several machines, same data")}
    ${tl(8, 63, ["Fixes two things: too many reads,", "and the database machine dying."])}
    ${rc(8, 96, 88, 40, "nd-p")}${tx(52, 113, "App servers", "nd-b", "middle")}${tx(52, 128, "your code", "nd-s", "middle")}
    <path class="nd-k" d="M96,112H124"/>${arrowRight(126, 116)}${tx(110, 106, "WRITES", "nd-st")}
    <rect class="nd-k nd-t2 nd-yfill ${flip}" x="130" y="96" width="162" height="56" rx="5"/>
    ${tx(211, 116, "LEADER", "nd-b nd-onink", "middle")}${tx(211, 132, "only copy that accepts writes", "nd-s nd-onink", "middle")}
    <path class="nd-k" d="M180,152C160,170 90,178 77,188"/>${arrowDown(77, 196)}${tx(120, 178, "copies", "nd-s")}
    <path class="nd-k" d="M242,152C260,170 240,178 229,188"/>${arrowDown(229, 196)}
    ${rc(8, 196, 138, 72, "nd-p")}${tx(77, 214, "FOLLOWER 1", "nd-b", "middle")}${tx(77, 229, "read-only copy", "nd-s", "middle")}${tx(77, 244, "data: Ali, Sara, Bilal", "nd-s", "middle")}
    ${rc(154, 196, 138, 72, "nd-p")}${tx(223, 214, "FOLLOWER 2", "nd-b", "middle")}${tx(223, 229, "read-only copy", "nd-s", "middle")}${tx(223, 244, "data: Ali, Sara, Bilal", "nd-s", "middle")}
    <path class="nd-k" d="M52,136V270H77"/>${arrowRight(80, 270)}
    <path class="nd-k" d="M52,270H223"/>${arrowRight(226, 270)}
    ${tx(8, 288, "ALL READS go to the followers", "nd-s")}
    ${tl(8, 306, ["Writes: create account · place order ·", "add a comment · delete a message", "Reads: open profile · view products ·", "read comments · view messages"], "nd-s", 13)}
    <g transform="translate(77,196)"><g class="nd-fb ${crown}"><path class="nd-k nd-t2 nd-yfill" d="M-14,-4L-8,-16L0,-6L8,-16L14,-4Z"/></g></g>
    ${stamp(150, 388, -1.5, stampUp, 260, 28, "LEADER DIES — FOLLOWER 1 TAKES OVER")}
    ${tl(8, 428, ["This is FAILOVER. A follower is promoted,", "so the site stays up."], "nd-s nd-cap")}
    ${ticket(wt)}${ticket(c1, "copy")}${ticket(c2, "copy")}${ticket(r1, "read")}${ticket(r2, "read")}`;
  return panel("rep-core", 452, "Replication: leader takes writes, followers take reads, and failover",
    "App servers send writes to the leader, the only copy that accepts writes. The leader copies the data to Follower 1 and Follower 2, read-only copies. All reads go to the followers, which spreads the work out. Writes are things like creating an account, placing an order, adding a comment or deleting a message. Reads are things like opening a profile, viewing products, reading comments or viewing messages. If the leader dies, a follower is promoted and becomes the new leader — this is called failover, and it's why the site stays up.",
    inner) + m.style();
}

/* ============================================================
   Topic 4 - the replication-lag catch (Ali's comment bug + fix)
   ============================================================ */
function lagBugPanel() {
  const p = "ndLagA", m = anim(p), T = 8;
  const t1 = m.add("T1", T, trk(T, [[0.3, 40, 94, 0], [0.5, 40, 94, 1], [1.2, 150, 94, 1], [1.4, 150, 94, 0]]));
  const t2 = m.add("T2", T, trk(T, [[1.6, 150, 94, 0], [1.8, 150, 94, 1], [2.6, 150, 154, 1], [2.8, 150, 154, 0]]));
  const t3 = m.add("T3", T, trk(T, [[3.0, 40, 194, 0], [3.2, 40, 194, 1], [3.9, 150, 194, 1], [4.1, 150, 194, 0]]));
  const stampGone = m.add("St1", T, pop(T, 4.3));
  const t4 = m.add("T4", T, trk(T, [[5.4, 40, 94, 0], [5.6, 40, 94, 1], [6.3, 150, 94, 1], [6.5, 150, 94, 0]]));
  const stampTwo = m.add("St2", T, pop(T, 6.8));
  const inner = `${head("THE BUG: replication lag")}
    ${tl(8, 63, ["Copying isn't instant. Ali writes a", "comment; the follower hasn't got it yet."])}
    ${rc(8, 84, 284, 28, "nd-inkfill")}${tx(150, 103, "1. Ali writes a comment → LEADER", "nd-st nd-onink", "middle")}
    ${rc(8, 144, 284, 28, "nd-p", 5, DASH)}${tx(150, 163, "2. copy is still on its way…", "nd-st", "middle")}
    ${rc(8, 184, 284, 28, "nd-yfill")}${tx(150, 203, "3. page reloads, READ → FOLLOWER", "nd-st", "middle")}
    ${stamp(150, 240, -2, stampGone, 240, 28, "ALI'S OWN COMMENT VANISHES")}
    ${tl(8, 276, ["He writes it again…"])}
    ${stamp(150, 322, 2, stampTwo, 190, 28, "NOW THERE ARE TWO")}
    ${ticket(t1)}${ticket(t2, "copy")}${ticket(t3, "read")}${ticket(t4)}`;
  return panel("lag-bug", 348, "The replication-lag bug: Ali's vanishing comment",
    "Copying isn't instant. Ali writes a comment, which goes to the leader. The page reloads and the read goes to a follower, which hasn't received the comment yet, so Ali's own comment vanishes. He writes it again — now there are two.", inner) + m.style();
}
function lagFixPanel() {
  const p = "ndLagB", m = anim(p), T = 7;
  const t1 = m.add("T1", T, trk(T, [[0.3, 40, 100, 0], [0.5, 40, 100, 1], [1.2, 150, 100, 1], [1.4, 150, 100, 0]]));
  const t2 = m.add("T2", T, trk(T, [[1.8, 40, 180, 0], [2.0, 40, 180, 1], [2.7, 150, 100, 1], [2.9, 150, 100, 0]]));
  const stampFix = m.add("St", T, pop(T, 3.1));
  const eventualFade = m.add("Ev", T, fadeIn(T, 4.2));
  const inner = `${head("THE FIX: read-your-own-writes")}
    ${tl(8, 63, ["For a short window after writing, send", "that person's reads to the LEADER too."])}
    ${rc(8, 80, 284, 32, "nd-inkfill")}${tx(150, 100, "Ali just wrote → his reads go to LEADER", "nd-st nd-onink", "middle")}
    ${rc(8, 120, 284, 32, "nd-p")}${tx(150, 140, "Everyone else keeps reading FOLLOWERS", "nd-st", "middle")}
    ${stamp(150, 180, -1.5, stampFix, 240, 28, "ALI SEES HIS OWN COMMENT")}
    <g class="${eventualFade}">${rc(8, 224, 284, 70, "nd-yfill")}${tx(150, 246, "EVENTUAL CONSISTENCY", "nd-b", "middle")}${tl(24, 264, ["the copies briefly disagree,", "but they catch up."], "nd-s")}</g>
    ${tl(8, 312, ["Mention this in an interview and you'll", "sound like you've shipped something."], "nd-s nd-cap")}
    ${ticket(t1)}${ticket(t2, "read")}`;
  return panel("lag-fix", 336, "The fix: read-your-own-writes, and eventual consistency",
    "The fix is a rule called read-your-own-writes: for a short window after someone writes something, send that person's reads to the leader instead of a follower. Everyone else keeps reading from followers. The general name for the copies briefly disagreeing but catching up is eventual consistency.", inner) + m.style();
}

/* ============================================================
   Topic 4 - Part 2: sharding (what replication can't do + the split)
   ============================================================ */
function shardLimitsPanel() {
  const p = "ndShA", m = anim(p), T = 6;
  const squeeze = m.add("Sq", T, [[0, "transform:scale(1)"], [1.0, "transform:scale(1)"], [1.3, "transform:scale(1.06,.9)"], [1.7, "transform:scale(1)"], [T, "transform:scale(1)"]]);
  const capPulse = m.add("Cp", T, [[0, "fill:var(--ink)"], [3.0, "fill:var(--ink)"], [3.3, "fill:var(--yellow)"], [3.8, "fill:var(--ink)"], [T, "fill:var(--ink)"]]);
  const inner = `${head("WHAT REPLICATION", "CAN'T DO")}
    ${tl(8, 63, ["500 GB of users. One machine holds", "200 GB. Copies don't help."])}
    ${rc(8, 90, 284, 60, "nd-p")}<g class="nd-fb ${squeeze}">${rc(20, 100, 260, 40, "nd-inkfill")}</g>${tx(150, 124, "500 GB doesn't fit on a 200 GB machine", "nd-st nd-onink", "middle")}
    ${tl(8, 166, ["Adding followers doesn't help — none", "of them can hold it either."])}
    <rect class="nd-k nd-t2 nd-inkfill ${capPulse}" x="8" y="204" width="284" height="40" rx="5"/>${tx(150, 227, "EVERY WRITE STILL GOES THROUGH ONE LEADER", "nd-st nd-onink", "middle")}
    ${tl(8, 262, ["Followers don't take writes, so write", "capacity is capped forever."])}
    ${tl(8, 306, ["Hit either wall, and you shard."], "nd-s nd-cap")}`;
  return panel("sh-limits", 330, "What replication can't do",
    "Every machine still holds all the data, so if you have 500 GB of users and a machine holds 200 GB, adding followers doesn't help. Every write still goes through one leader, so write capacity is capped forever. When you hit either wall, you shard.", inner) + m.style();
}
function shardLookupPanel() {
  const p = "ndShB", m = anim(p), T = 6;
  const t = m.add("T", T, trk(T, [[0.3, 150, 100, 0], [0.5, 150, 100, 1], [1.5, 150, 100, 1], [2.2, 172, 168, 1], [2.4, 172, 168, 0]]));
  const inner = `${head("SHARDING", "each machine holds a slice")}
    ${tl(8, 63, ["App server wants user 1500.", "Which machine has him?"])}
    ${rc(90, 80, 120, 40, "nd-p")}${tx(150, 105, "App server", "nd-b", "middle")}
    <path class="nd-k" d="M120,120C100,140 60,148 60,158"/>${arrowDown(60, 166)}
    <path class="nd-k" d="M150,120V158"/>${arrowDown(150, 166)}
    <path class="nd-k" d="M180,120C200,140 240,148 240,158"/>${arrowDown(240, 166)}
    ${rc(8, 168, 104, 64, "nd-p")}${tx(60, 186, "SHARD 1", "nd-b", "middle")}${tx(60, 201, "ids 1–1000", "nd-s", "middle")}${tx(60, 216, "Ali, Sara", "nd-s", "middle")}${tx(60, 228, "not needed", "nd-s", "middle")}
    ${rc(120, 168, 104, 64, "nd-yfill")}${tx(172, 186, "SHARD 2", "nd-b", "middle")}${tx(172, 201, "ids 1001–2000", "nd-s", "middle")}${tx(172, 216, "Bilal, Zara, 1500", "nd-s", "middle")}${tx(172, 229, "FOUND HIM", "nd-b", "middle")}
    ${rc(232, 168, 60, 64, "nd-p")}${tx(262, 186, "SHARD 3", "nd-b", "middle")}${tx(262, 199, "2001–", "nd-s", "middle")}${tx(262, 211, "3000", "nd-s", "middle")}${tx(262, 224, "Omar,", "nd-s", "middle")}${tx(262, 236, "Hina", "nd-s", "middle")}
    ${tl(8, 254, ["SHARD = one machine, one slice.", "SHARD KEY (here: user id) picks it."], "nd-s")}
    ${rc(8, 282, 284, 56, "nd-inkfill")}${tx(150, 300, "THE DANGER: HOT SHARD", "nd-b nd-onink", "middle")}${tl(20, 316, ["split by first letter of name: 'A' gets", "thousands, 'X' gets four — spread evenly"], "nd-s nd-onink")}
    ${tl(8, 358, ["COST = joining data across two", "machines becomes slow and painful."], "nd-s nd-cap")}
    ${ticket(t)}`;
  return panel("sh-lookup", 380, "Sharding: each shard holds a different slice of the data",
    "The app server wants user 1500 and needs to know which machine has him. Shard 1 holds ids 1 to 1000, Ali and Sara, not needed. Shard 2 holds ids 1001 to 2000, Bilal, Zara and user 1500: found him, one lookup. Shard 3 holds ids 2001 to 3000, Omar and Hina, not needed. Shard key, here user id, decides which machine. The danger is a hot shard: an uneven split loads one machine while others sit idle. The cost is that joining data across two machines becomes slow and painful.", inner) + m.style();
}

/* ============================================================
   Topic 4 - why sharding is a last resort (three costs)
   ============================================================ */
function shardCostsPanel() {
  const p = "ndShC", m = anim(p), T = 6.6;
  const x1 = m.add("X1", T, pop(T, 0.6));
  const mv = m.add("Mv", T, [[0, "transform:translate(0,0)"], [2.2, "transform:translate(0,0)"], [2.6, "transform:translate(28px,0)"], [3.2, "transform:translate(0,0)"], [T, "transform:translate(0,0)"]]);
  const x3 = m.add("X3", T, pop(T, 4.2));
  const inner = `${head("WHY SHARDING IS A", "LAST RESORT")}
    ${rc(8, 50, 284, 66, "nd-p")}${tx(20, 70, "1. JOINS BREAK", "nd-b")}${tl(20, 86, ["Ali on shard 2, orders on shard 1 —", "stitching now crosses the network."], "nd-s")}
    <g transform="translate(262,64)"><g class="nd-fb ${x1}"><circle class="nd-k nd-t2 nd-yfill" r="13"/><path class="nd-mk" transform="scale(.9)" d="${CROSS}"/></g></g>
    ${rc(8, 124, 284, 66, "nd-p")}${tx(20, 144, "2. RESHARDING IS BRUTAL", "nd-b")}${tl(20, 160, ["3 shards to 4 means moving huge", "amounts of data while it's live."], "nd-s")}
    <g class="nd-fbl ${mv}" transform="translate(222,150)"><rect class="nd-k nd-t2 nd-yfill" x="0" y="0" width="28" height="20" rx="3"/></g>
    ${rc(8, 198, 284, 66, "nd-p")}${tx(20, 218, "3. EVERYTHING GETS HARDER", "nd-b")}${tl(20, 234, ["Backups, monitoring, debugging —", "every problem has three places to hide."], "nd-s")}
    <g transform="translate(262,212)"><g class="nd-fb ${x3}"><rect class="nd-k nd-t2 nd-inkfill" x="-17" y="-11" width="34" height="22" rx="3"/>${tx(0, 4, "×3", "nd-st nd-onink", "middle")}</g></g>
    ${tl(8, 290, ["This is why the correct order of fixes", "matters — see the next note."], "nd-s nd-cap")}`;
  return panel("sh-cost", 316, "Why sharding is a last resort: three real costs",
    "Joins break, because data now sits on different machines and stitching it means talking over the network. Changing the split is brutal: going from 3 shards to 4 means physically moving a huge amount of data while the system is live. And everything gets harder: backups, monitoring and debugging all now have several places to hide.", inner) + m.style();
}

/* ============================================================
   Topic 4 - the correct order of fixes (ladder)
   ============================================================ */
function fixLadderPanel() {
  const p = "ndLad", m = anim(p), T = 8;
  const steps = [["1", "Add an index", "minutes"], ["2", "Add a cache", "hours"], ["3", "Add read replicas", "a day"], ["4", "Shard", "weeks, permanent"]];
  const bars = steps.map(([n, label, eff], i) => {
    const x = 20 + i * 66, h = 30 + i * 26, y = 270 - h;
    const c = m.add(`B${i}`, T, [[0, "fill:var(--paper2)"], [0.3 + i * 1.6, "fill:var(--paper2)"], [0.6 + i * 1.6, "fill:var(--yellow)"], [1.5 + i * 1.6, "fill:var(--yellow)"], [1.8 + i * 1.6, "fill:var(--paper2)"], [T, "fill:var(--paper2)"]]);
    return `<rect class="nd-k nd-t2 nd-p ${c}" x="${x}" y="${y}" width="52" height="${h}"/>${tx(x + 26, y - 8, n, "nd-b", "middle")}${tx(x + 26, 292, label, "nd-s", "middle")}${tx(x + 26, 308, eff, "nd-s", "middle")}`;
  }).join("");
  const inner = `${head("ORDER OF FIXES", "effort grows down the list")}
    ${tl(8, 63, ["Walk this ladder in an interview and", "you'll sound like you've done it."])}
    <path class="nd-k" d="M8,270H292"/>
    ${bars}
    ${tl(8, 336, ["Jumping straight to “I'd shard it” is", "the beginner tell."], "nd-s nd-cap")}`;
  return panel("ladder", 358, "The correct order of fixes: index, cache, replicas, shard",
    "Order 1, add an index — a lookup shortcut — minutes of effort. Order 2, add a cache, hours. Order 3, add read replicas, a day. Order 4, shard, weeks and permanent complexity. Walk down that ladder in an interview, in that order, and you'll sound like someone who's actually done it. Jumping straight to 'I'd shard it' is the beginner tell.", inner) + m.style();
}

/* ============================================================
   Topic 4 - interview: DB at 100% CPU (decision flow)
   ============================================================ */
function interviewFlowPanel() {
  const p = "ndIntv", m = anim(p), T = 9;
  const t = m.add("T", T, trk(T, [[0.3, 150, 45, 0], [0.5, 150, 45, 1], [1.2, 150, 90, 1], [1.9, 150, 140, 1], [2.6, 150, 190, 1], [3.3, 150, 240, 1], [4.0, 150, 290, 1], [4.3, 150, 290, 0]]));
  const rows = [
    ["100% CPU, users say it's slow", 50, "nd-yfill"],
    ["check load shape: reads or writes?", 100, "nd-p"],
    ["a few slow queries? → ADD AN INDEX", 150, "nd-p"],
    ["a flood of reads? → ADD A CACHE", 200, "nd-p"],
    ["still heavy? → READ REPLICAS", 250, "nd-p"],
    ["data too big or writes outgrew leader? → SHARD (last)", 300, "nd-inkfill"],
  ];
  const html = rows.map(([label, y, cls], i) => {
    const c = m.add(`R${i}`, T, [[0, "fill:var(--paper2)"], [0.6 + i * 0.6, "fill:var(--paper2)"], [0.9 + i * 0.6, "fill:var(--yellow)"], [T - 1, "fill:var(--yellow)"], [T - 0.6, "fill:var(--paper2)"], [T, "fill:var(--paper2)"]]);
    const fill = i === 0 ? "nd-yfill" : i === 5 ? "nd-inkfill" : `${cls} ${c}`;
    const txtCls = i === 5 ? "nd-st nd-onink" : "nd-st";
    return `<rect class="nd-k nd-t2 ${fill}" x="8" y="${y}" width="284" height="40" rx="5"/>${tx(150, y + 25, label, txtCls, "middle")}${i < 5 ? `<path class="nd-k" d="M150,${y + 40}V${y + 48}"/>${arrowDown(150, y + 56)}` : ""}`;
  }).join("");
  const inner = `${head("INTERVIEW: DB AT 100% CPU")}
    ${html}
    ${tl(8, 360, ["Sharding is last, and only when data", "doesn't fit or writes outgrew one leader."], "nd-s nd-cap")}
    ${ticket(t)}`;
  return panel("interview-flow", 384, "Interview: database at 100% CPU, what do you do?",
    "First check what's actually consuming the CPU, because the fix depends on the shape of the load. A handful of slow queries: add a missing index. A flood of reads for the same data: add a cache, cache-aside with Redis. Still too heavy: read replicas, handling replication lag with read-your-own-writes. Sharding is last, and only for one of two reasons: the data no longer fits on one machine, or write volume has outgrown a single leader.", inner) + m.style();
}

/* ============================================================
   Topic 4 - key takeaway recap
   ============================================================ */
function takeawayPanel() {
  const p = "ndTk4", m = anim(p), T = 8;
  const rows = [
    [50, ["Leader takes writes, followers take reads;", "a dead leader → a follower is promoted"]],
    [104, ["Replication lag can hide your own write —", "fix with read-your-own-writes"]],
    [158, ["Sharding splits different data onto", "different machines"]],
    [212, ["Order: index, cache, replicas, shard last —", "undoing sharding is hard"]],
  ];
  const html = rows.map(([y, lines], i) => {
    const c = m.add(`R${i}`, T, [[0, "opacity:0"], [0.3 + i * 1.7, "opacity:0"], [0.6 + i * 1.7, "opacity:1"], [1.7 + i * 1.7, "opacity:1"], [2.0 + i * 1.7, "opacity:0"], [T, "opacity:0"]]);
    return `<rect class="nd-yfill nd-pk ${c}" x="8" y="${y}" width="284" height="48" rx="3"/>
      <g transform="translate(26,${y + 24})"><circle class="nd-k nd-t2 nd-inkfill" r="12"/>${tx(0, 5, String(i + 1), "nd-st nd-onink", "middle")}</g>
      ${tl(46, y + 17, lines, "nd-s", 14)}`;
  }).join("");
  const inner = `${head("REPLICATION & SHARDING", "key takeaway")}${html}`;
  return panel("tk4", 276, "Replication and sharding: key takeaway",
    "Replication means several copies of the same data: the leader takes writes, followers take reads, and a dead leader gets a follower promoted to replace it. Replication lag can hide your own write, fixed with read-your-own-writes. Sharding means different data on different machines. Order to fix a slow database: index, cache, read replicas, and shard last, because undoing sharding is hard.",
    inner) + m.style();
}

/* ============================================================
   Topic 4 - What is a JOIN? (Ali/Ahmed worked example)
   ============================================================ */
function joinPanel() {
  const p = "ndJoin", m = anim(p), T = 7;
  const link1 = m.add("L1", T, draw(T, 0.8, 2.0));
  const link2 = m.add("L2", T, draw(T, 1.0, 2.2));
  const resFade = m.add("R", T, fadeIn(T, 2.4));
  const usersRows = [["1", "Ali"], ["2", "Ahmed"]];
  const ordersRows = [["101", "1", "Laptop"], ["102", "2", "Phone"]];
  const resultRows = [["Ali", "Laptop"], ["Ahmed", "Phone"]];
  const inner = `${head("WHAT IS A JOIN?", "Users + Orders → Result")}
    ${tx(20, 66, "USERS", "nd-st")}${tbl(20, 72, 120, "users", [[30, "id"], [76, "name"]], usersRows)}
    ${tx(160, 66, "ORDERS", "nd-st")}${tbl(160, 72, 120, "orders", [[170, "order_id"], [236, "user_id"]], [["101", "1"], ["102", "2"]])}
    <path class="nd-k ${link1}" pathLength="1" d="M60,150C60,170 190,170 190,150"/>
    <path class="nd-k ${link2}" pathLength="1" d="M60,172C60,190 190,190 190,172"/>
    ${tx(150, 206, "JOIN ON users.id = orders.user_id", "nd-st", "middle")}
    <g class="${resFade}">${tx(20, 236, "RESULT", "nd-st")}${tbl(20, 242, 260, "result", [[36, "name"], [180, "product"]], resultRows)}</g>
    ${tl(8, 350, ["SELECT * FROM users JOIN orders", "ON users.id = orders.user_id;"], "nd-s nd-cap")}`;
  return panel("join", 376, "What is a JOIN: Ali and Ahmed's orders combined",
    "Users table: 1 Ali, 2 Ahmed. Orders table: order_id 101 user_id 1 product Laptop, order_id 102 user_id 2 product Phone. The database matches id to user_id and combines them: SELECT * FROM users JOIN orders ON users.id = orders.user_id, giving the result Ali Laptop and Ahmed Phone.", inner) + m.style();
}

/* ============================================================
   Topic 4 - What is an index? (full scan vs jump, book analogy)
   ============================================================ */
function scanPanel() {
  const p = "ndIdxA", m = anim(p), T = 7;
  const rowsN = 7;
  const checks = Array.from({ length: rowsN }).map((_, i) => {
    const y = 90 + i * 26;
    const found = i === rowsN - 1;
    const c = m.add(`C${i}`, T, pop(T, 0.4 + i * 0.8));
    return `${rc(20, y, 240, 20, "nd-p", 3)}${tx(30, y + 14, found ? "User 1,000,000: Ibrahim" : `User ${i + 1}`, "nd-s")}
      <g transform="translate(246,${y + 10})"><g class="nd-fb ${c}">${found ? `<path class="nd-mk" transform="scale(.7)" d="${TICK}"/>` : `<path class="nd-mk" transform="scale(.7)" d="${CROSS}"/>`}</g></g>`;
  }).join("");
  const stampC = m.add("St", T, pop(T, 6.4));
  const inner = `${head("WITHOUT AN INDEX", "full table scan")}
    ${tl(8, 63, ["1 million users. Find Ibrahim.", "The DB checks every row, in order."])}
    ${checks}
    ${stamp(150, 300, -1.5, stampC, 250, 28, "CHECKED EVERY ROW — VERY SLOW")}`;
  return panel("idx-scan", 324, "Without an index: a full table scan",
    "With 1 million users, finding Ibrahim means the database checks every row in order — User 1, User 2, ... User 999,999, User 1,000,000 — found. This is called a full table scan and it is very slow.", inner) + m.style();
}
function jumpPanel() {
  const p = "ndIdxB", m = anim(p), T = 4;
  const t = m.add("T", T, trk(T, [[0.3, 150, 60, 0], [0.5, 150, 60, 1], [1.6, 150, 220, 1], [1.8, 150, 220, 0]]));
  const stampC = m.add("St", T, pop(T, 2.0));
  const inner = `${head("WITH AN INDEX", "jump straight there")}
    ${tl(8, 63, ["Ibrahim → Row 1,000,000. The database", "jumps directly to the correct row."])}
    ${rc(90, 86, 120, 34, "nd-yfill")}${tx(150, 108, "index: Ibrahim", "nd-b", "middle")}
    <path class="nd-k" ${DASH} d="M150,120V210"/>
    ${rc(90, 224, 120, 34, "nd-p")}${tx(150, 246, "Row 1,000,000", "nd-b", "middle")}
    ${stamp(150, 292, 1.5, stampC, 220, 28, "ONE JUMP — VERY FAST")}
    ${tl(8, 332, ["Like a book: no index, read it all.", "With one, Docker → page 247."], "nd-s nd-cap")}
    ${ticket(t)}`;
  return panel("idx-jump", 358, "With an index: jump directly to the row",
    "With an index, Ibrahim maps straight to row 1,000,000 and the database jumps directly there: very fast. Think of a book: without an index you read the whole book to find Docker; with an index, Docker points to page 247 and you jump directly there.", inner) + m.style();
}

/** Map key -> function returning the figure's inner markup (merged into the registry in system-design.js). */
export default {
  sqlNosqlTrade: () => one(tradeoffPanel()),
  sd14Ratio: () => one(ratioPanel()),
  sd15Replication: () => two(crashPanel(), replicationCorePanel()),
  sd16Lag: () => two(lagBugPanel(), lagFixPanel()),
  sd17Sharding: () => two(shardLimitsPanel(), shardLookupPanel()),
  sd18ShardCosts: () => one(shardCostsPanel()),
  sd19Ladder: () => one(fixLadderPanel()),
  sd20Interview: () => one(interviewFlowPanel()),
  sd21Takeaway: () => one(takeawayPanel()),
  sd22Join: () => one(joinPanel()),
  sd23Index: () => two(scanPanel(), jumpPanel()),
};
