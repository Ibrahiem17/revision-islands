/**
 * System Design figures for Topic 2 (Caching) and Topic 3 (SQL vs NoSQL).
 * Same ink language and conventions as system-design-diagrams.js (read its header first):
 * thick black round-join strokes (nd-k), flat fills, mustard as the only accent, no faces,
 * CSS-keyframe animation bound to `.note-diagram.is-playing` only, and a complete static
 * picture when the class is absent (tickets/coins hidden, stamps and ticks visible).
 *
 * Every panel gets a unique prefix `p` (used for its <svg> ids, its class names and its keyframe
 * names) so many figures can sit on one page without clashing. Panels are 300 units wide.
 */
import { keyframes, bind, move, arrowDown, arrowRight, TICK, CROSS, panel } from "./system-design-diagrams.js";

// ---------- small drawing helpers ----------
const arrowLeft = (x, y) => `<path class="nd-k" d="M${x + 9},${y - 6}L${x},${y}L${x + 9},${y + 6}"/>`;
const tx = (x, y, s, cls = "nd-s", anchor = "") =>
  `<text class="${cls}" x="${x}" y="${y}"${anchor ? ` text-anchor="${anchor}"` : ""}>${s}</text>`;
const tl = (x, y, arr, cls = "nd-s", dy = 13.5) => arr.map((s, i) => tx(x, y + i * dy, s, cls)).join("");
/** panel title (one or two lines) + the mustard underline bar */
const head = (l1, l2) =>
  tx(8, 18, l1, "nd-t") + (l2 ? tx(8, 35, l2, "nd-t") : "") +
  `<rect class="nd-k nd-t2 nd-yfill" x="8" y="${l2 ? 41 : 24}" width="46" height="6"/>`;
const rc = (x, y, w, h, cls = "nd-p", r = 5, extra = "") =>
  `<rect class="nd-k ${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}"${extra ? " " + extra : ""}/>`;
const DASH = `style="stroke-dasharray:7 5"`;
const hatchDefs = (id) =>
  `<defs><pattern id="${id}" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="6" height="6" class="nd-hp"/><path d="M0,0V6" class="nd-hl"/></pattern></defs>`;
const hatch = (id) => `style="fill:url(#${id})"`;
const ticket = (cls, label = "55") =>
  `<g class="nd-pk ${cls}"><rect class="nd-k nd-t2 nd-yfill" x="-16" y="-10" width="32" height="20" rx="3"/><path class="nd-k nd-t2" d="M-16,-10L0,2L16,-10"/><text class="nd-pkt" x="0" y="8" text-anchor="middle">${label}</text></g>`;
const coin = (cls, label = "500") =>
  `<g class="nd-pk ${cls}"><circle class="nd-k nd-t2 nd-yfill" r="15"/><text class="nd-pkt" x="0" y="4" text-anchor="middle">${label}</text></g>`;
/** ink stamp centred on (cx,cy); `cls` is the animated class (scale-in) */
const stamp = (cx, cy, rot, cls, w, h, text) =>
  `<g transform="translate(${cx},${cy}) rotate(${rot})"><g class="nd-fb ${cls}"><rect class="nd-k nd-t2 nd-inkfill" x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="3"/>${tx(0, 4, text, "nd-st nd-onink", "middle")}</g></g>`;
const one = (inner) => `<div class="nd-panels nd-one">${inner}</div>`;
const two = (a, b) => `<div class="nd-panels">${a}${b}</div>`;

/** per-panel animation collector: add(name, T, frames) -> class name to put on the element */
function anim(p) {
  const css = [];
  return {
    add(name, T, frames) { css.push(keyframes(p + name, T, frames) + bind(`.${p}${name}`, p + name, T)); return p + name; },
    style: () => `<style>${css.join("")}</style>`,
  };
}
/** waypoints [t,x,y,opacity]; adds a hidden frame at 0% and 100% so the loop restarts cleanly */
function trk(T, pts) {
  const f = pts.map(([t, x, y, o]) => [t, move(x, y, o)]);
  const a = pts[0], z = pts[pts.length - 1];
  return [...(a[0] > 0 ? [[0, move(a[1], a[2], 0)]] : []), ...f, [T, move(z[1], z[2], 0)]];
}
const HIDE = "opacity:0;transform:scale(1.9) rotate(-8deg)";
/** stamp that pops in at t0 and stays until the loop ends */
const pop = (T, t0) => [
  [0, HIDE], [t0 - 0.05, HIDE], [t0 + 0.12, "opacity:1;transform:scale(.92)"], [t0 + 0.3, "opacity:1;transform:scale(1)"],
  [T - 0.5, "opacity:1;transform:scale(1)"], [T, "opacity:0;transform:scale(1)"],
];
/** element that is visible in the static picture, fades in at t0, out at the end of the loop */
const fadeIn = (T, t0, d = 0.3) => [[0, "opacity:0"], [t0, "opacity:0"], [t0 + d, "opacity:1"], [T - 0.5, "opacity:1"], [T, "opacity:0"]];
/** stroke that draws itself (path must carry pathLength="1") */
const draw = (T, t0, t1) => [
  [0, "stroke-dasharray:1;stroke-dashoffset:1"], [t0, "stroke-dasharray:1;stroke-dashoffset:1"],
  [t1, "stroke-dasharray:1;stroke-dashoffset:0"], [T - 0.5, "stroke-dasharray:1;stroke-dashoffset:0"],
  [T, "stroke-dasharray:1;stroke-dashoffset:1"],
];

/* ============================================================
   Topic 2 - note 1: the problem (same query 100,000 times)
   ============================================================ */
function repeatPanelA() {
  const p = "ndCrA", m = anim(p), T = 3.6;
  const pulse = [[0, "transform:scale(1)"]];
  let tickets = "";
  [0, 0.9, 1.8].forEach((d, i) => {
    const c = m.add(`T${i}`, T, trk(T, [[d + 0.05, 56, 135, 0], [d + 0.2, 56, 135, 1], [d + 1.2, 190, 135, 1], [d + 1.4, 190, 135, 0]]));
    tickets += ticket(c);
    pulse.push([d + 1.15, "transform:scale(1)"], [d + 1.3, "transform:scale(1.07)"], [d + 1.55, "transform:scale(1)"]);
  });
  pulse.push([T, "transform:scale(1)"]);
  const db = m.add("Db", T, pulse);
  const inner = `${head("NO CACHE: the database", "repeats itself")}
    ${tl(8, 63, ["100,000 people open the same", "celebrity profile in one hour."])}
    ${rc(6, 108, 88, 54)}${tx(50, 131, "Visitors", "nd-b", "middle")}${tx(50, 148, "100,000 / hour", "nd-s", "middle")}
    <path class="nd-k" d="M96,135H198"/>${arrowRight(200, 135)}
    <g class="nd-fb ${db}">${rc(206, 108, 88, 54, "nd-yfill")}${tx(250, 131, "Database", "nd-b", "middle")}${tx(250, 148, "same answer", "nd-s", "middle")}</g>
    ${stamp(150, 208, -2, "nd-static", 236, 28, "SAME QUESTION × 100,000")}
    ${tx(8, 262, "The profile hasn't changed in three weeks,", "nd-s nd-cap")}${tx(8, 277, "yet the database repeats identical work.", "nd-s nd-cap")}
    ${tickets}`;
  return panel("cr-a", 290, "No cache: the database repeats itself",
    "100,000 visitors an hour open the same celebrity profile. Every request goes to the database, which gives the exact same answer every time.", inner) + m.style();
}
function repeatPanelB() {
  const p = "ndCrB", m = anim(p), T = 7.6, Y = 135;
  const a = m.add("A", T, trk(T, [[0.2, 38, Y, 0], [0.4, 38, Y, 1], [1.1, 140, Y, 1], [1.3, 140, Y, 1], [2.1, 256, Y, 1], [2.5, 256, Y, 1], [3.0, 256, Y, 0]]));
  const b = m.add("B", T, trk(T, [[3.3, 38, Y, 0], [3.5, 38, Y, 1], [4.2, 140, Y, 1], [4.4, 140, Y, 1], [4.9, 38, Y, 1], [5.1, 38, Y, 0]]));
  const c = m.add("C", T, trk(T, [[5.4, 38, Y, 0], [5.6, 38, Y, 1], [6.2, 140, Y, 1], [6.4, 140, Y, 1], [6.9, 38, Y, 1], [7.1, 38, Y, 0]]));
  const inner = `${head("WITH A CACHE: asked", "once, then remembered")}
    ${tl(8, 63, ["The first visitor fills the cache.", "The rest never reach the database."])}
    ${rc(6, 108, 66, 54)}${tx(39, 131, "Visitors", "nd-b", "middle")}${tx(39, 148, "100,000", "nd-s", "middle")}
    <path class="nd-k" d="M74,135H92"/>${arrowRight(94, 135)}
    ${rc(98, 108, 84, 54, "nd-yfill")}${tx(140, 131, "Cache", "nd-b", "middle")}${tx(140, 148, "answers most", "nd-s", "middle")}
    <path class="nd-k" d="M184,135H206"/>${arrowRight(208, 135)}
    ${rc(212, 108, 82, 54)}${tx(253, 131, "Database", "nd-b", "middle")}${tx(253, 148, "asked once", "nd-s", "middle")}
    ${stamp(150, 208, 2, "nd-static", 236, 28, "1 QUERY, NOT 100,000")}
    ${tx(8, 262, "Same data, served from memory:", "nd-s nd-cap")}${tx(8, 277, "the database is left alone.", "nd-s nd-cap")}
    ${ticket(a)}${ticket(b)}${ticket(c)}`;
  return panel("cr-b", 290, "With a cache: asked once, then remembered",
    "The first visitor's request goes through the cache to the database and the answer is kept in the cache. Every later visitor is answered by the cache and the database is not asked again.", inner) + m.style();
}

/* ============================================================
   Topic 2 - note 2: where the data is (RAM vs SSD vs datacenter)
   ============================================================ */
function speedPanel() {
  const p = "ndCs", m = anim(p), T = 6.4;
  const rows = [
    ["Memory (RAM)", "very fast", 16, "nd-yfill"],
    ["Disk (SSD)", "about 100× slower", 150, "nd-p"],
    ["Another datacenter", "about 100× slower again", 284, "nd-inkfill"],
  ];
  const bars = rows.map(([name, note, w, fill], i) => {
    const y = 78 + i * 70;
    const c = m.add(`B${i}`, T, [
      [0, "transform:scale(0,1)"], [0.3 + i * 0.7, "transform:scale(0,1)"], [1.1 + i * 0.7, "transform:scale(1,1)"],
      [T - 0.6, "transform:scale(1,1)"], [T, "transform:scale(0,1)"],
    ]);
    return `${tx(8, y, name, "nd-b")}<g class="nd-fbl ${c}">${rc(8, y + 7, w, 20, fill, 3)}</g>${tx(8, y + 46, note, "nd-s")}`;
  }).join("");
  const stampC = m.add("St", T, pop(T, 3.9));
  const inner = `${head("WHERE THE DATA IS", "decides how fast it comes")}${bars}
    ${rc(8, 290, 134, 42)}${tx(75, 308, "DATABASE", "nd-b", "middle")}${tx(75, 324, "keeps data on disk", "nd-s", "middle")}
    ${rc(158, 290, 134, 42, "nd-yfill")}${tx(225, 308, "CACHE", "nd-b", "middle")}${tx(225, 324, "keeps data in memory", "nd-s", "middle")}
    ${stamp(150, 366, -1.5, stampC, 250, 28, "SAME DATA, ~100× FASTER")}`;
  return panel("cs", 392, "Where the data is decides how fast you get it",
    "Memory (RAM) is very fast. Disk (SSD) is about 100 times slower. Another datacenter is about 100 times slower again. A database keeps data on disk and a cache keeps it in memory: same data, about 100 times faster.", inner) + m.style();
}

/* ============================================================
   Topic 2 - note 3: cache miss (slow path) vs cache hit (fast path)
   ============================================================ */
function missHitPanel(miss) {
  const p = miss ? "ndMhM" : "ndMhH", m = anim(p), hid = p + "h";
  const T = miss ? 7.6 : 4.8;
  const cacheTop = 208, dbTop = 282, cx = 80;
  const steps = miss
    ? `<path class="nd-k" d="M140,307H270V233H150"/>${arrowLeft(142, 233)}${tl(150, 266, ["4. app saves a", "copy into", "the cache"], "nd-s", 14)}`
    : `<path class="nd-k" d="M140,233H270V167H150"/>${arrowLeft(142, 167)}${tl(150, 190, ["3. answer comes", "back in about", "1 millisecond"], "nd-s", 14)}`;
  let motion, cacheFill = "";
  if (miss) {
    const t = m.add("T", T, trk(T, [[0.3, cx, 109, 0], [0.5, cx, 109, 1], [1.2, cx, 167, 1], [1.9, cx, 233, 1], [2.2, cx, 233, 1], [3.0, cx, 307, 1], [3.5, cx, 307, 1], [3.7, cx, 307, 0]]));
    const ck = m.add("K", T, trk(T, [[3.6, 150, 307, 0], [3.75, 150, 307, 1], [4.4, 270, 307, 1], [5.0, 270, 233, 1], [5.6, 110, 233, 1], [5.8, 110, 233, 0]]));
    const cf = m.add("F", T, [[0, "opacity:0"], [5.4, "opacity:0"], [5.7, "opacity:1"], [T - 0.9, "opacity:1"], [T - 0.4, "opacity:0"], [T, "opacity:0"]]);
    cacheFill = `<rect class="nd-k nd-yfill ${cf}" style="opacity:0" x="20" y="${cacheTop}" width="120" height="50" rx="5"/>`;
    motion = ticket(t) + ticket(ck, "55");
  } else {
    const t = m.add("T", T, trk(T, [[0.2, cx, 109, 0], [0.35, cx, 109, 1], [0.8, cx, 167, 1], [1.2, cx, 233, 1], [1.5, cx, 233, 0]]));
    const ck = m.add("K", T, trk(T, [[1.4, 150, 233, 0], [1.5, 150, 233, 1], [2.0, 270, 233, 1], [2.4, 270, 167, 1], [2.9, 100, 167, 1], [3.3, 100, 167, 0]]));
    motion = ticket(t) + ticket(ck, "55");
  }
  const cache = miss
    ? `${rc(20, cacheTop, 120, 50, "nd-p", 5, DASH)}${cacheFill}${tx(cx, 230, "Cache (Redis)", "nd-b", "middle")}${tx(cx, 246, "EMPTY - miss", "nd-s", "middle")}`
    : `${rc(20, cacheTop, 120, 50, "nd-yfill")}${tx(cx, 230, "Cache (Redis)", "nd-b", "middle")}${tx(cx, 246, "HAS IT - hit", "nd-s", "middle")}`;
  const db = miss
    ? `<path class="nd-k" d="M80,258V273"/>${arrowDown(80, 282)}${tx(90, 274, "3", "nd-st")}
       ${rc(20, dbTop, 120, 50)}${tx(cx, 304, "Database", "nd-b", "middle")}${tx(cx, 320, "slow, has the data", "nd-s", "middle")}`
    : `${rc(20, dbTop, 120, 50, "nd-hatchfill", 5, hatch(hid))}${rc(26, dbTop + 6, 108, 38, "nd-t2 nd-p", 3)}
       ${tx(cx, 304, "Database", "nd-b", "middle")}${tx(cx, 320, "never touched", "nd-s", "middle")}`;
  const inner = `
    ${miss ? head("FIRST request:", "CACHE MISS (the slow path)") : head("EVERY request after:", "CACHE HIT (the fast path)")}
    ${miss ? tl(8, 63, ["Nobody has asked for user 55's profile", "yet, so the cache is empty."]) : tl(8, 63, ["Someone else opens the same profile.", "The cache already has it."])}
    ${rc(20, 92, 120, 34)}${tx(cx, 114, "User", "nd-b", "middle")}
    <path class="nd-k" d="M80,126V141"/>${arrowDown(80, 150)}${tx(90, 142, "1", "nd-st")}
    ${rc(20, 150, 120, 34)}${tx(cx, 172, "App server", "nd-b", "middle")}
    <path class="nd-k" d="M80,184V199"/>${arrowDown(80, 208)}${tx(90, 200, "2", "nd-st")}
    ${cache}${db}${steps}
    ${miss ? tl(8, 356, ["This one request was slow. But the data", "is now sitting in the cache."], "nd-s nd-cap") : tl(8, 356, ["Now 99 out of 100 reads never reach", "the database at all."], "nd-s nd-cap")}
    ${motion}`;
  return panel(miss ? "mh-miss" : "mh-hit", 384,
    miss ? "First request: cache miss, the slow path" : "Every request after: cache hit, the fast path",
    miss
      ? "Nobody has asked for user 55's profile yet, so the cache is empty. Step 1 the user asks the app server, step 2 the app asks the cache, which misses, step 3 the app asks the slow database, and step 4 the app saves a copy into the cache. This one request was slow, but the data is now in the cache."
      : "Someone else opens the same profile. Step 1 the user asks the app server, step 2 the app asks the cache, which has it, and step 3 the answer comes back in about 1 millisecond. The database is never touched. Now 99 out of 100 reads never reach the database.",
    inner, miss ? "" : hatchDefs(hid)) + m.style();
}

/* ============================================================
   Topic 2 - note 4: Redis (and Memcached)
   ============================================================ */
function redisPanel() {
  const p = "ndCx", m = anim(p), T = 3.8, Y = 125;
  const t = m.add("T", T, trk(T, [[0.2, 54, Y, 0], [0.4, 54, Y, 1], [1.1, 150, Y, 1], [1.6, 150, Y, 1], [2.3, 54, Y, 1], [2.5, 54, Y, 0]]));
  const r = m.add("R", T, [[0, "transform:scale(1)"], [1.0, "transform:scale(1)"], [1.3, "transform:scale(1.04,1.08)"], [1.7, "transform:scale(1)"], [T, "transform:scale(1)"]]);
  const stampC = m.add("St", T, pop(T, 1.9));
  const inner = `${head("WHICH CACHE?", "Redis is the answer")}
    ${tl(8, 63, ["90% of the time. It holds data in", "memory on a separate server."])}
    ${rc(8, 96, 92, 58)}${tx(54, 121, "App server", "nd-b", "middle")}${tx(54, 138, "asks first", "nd-s", "middle")}
    <path class="nd-k" d="M102,125H134"/>${arrowRight(136, Y)}
    <g class="nd-fb ${r}">${rc(140, 90, 152, 70, "nd-yfill")}${tx(216, 116, "Redis", "nd-t", "middle")}${tx(216, 134, "a separate server that", "nd-s", "middle")}${tx(216, 148, "holds data in memory", "nd-s", "middle")}
      <rect class="nd-k nd-t2 nd-inkfill" x="146" y="96" width="30" height="14" rx="2"/>${tx(161, 107, "RAM", "nd-st nd-onink", "middle")}</g>
    ${rc(8, 186, 284, 52, "nd-p", 5, DASH)}${tx(150, 208, "Memcached", "nd-b", "middle")}${tx(150, 225, "the older alternative: simpler, less capable", "nd-s", "middle")}
    ${stamp(150, 272, -1.5, stampC, 254, 28, "ASKED WHICH CACHE? SAY REDIS")}
    ${tx(8, 312, "Say Redis and you're safe.", "nd-s nd-cap")}
    ${ticket(t)}`;
  return panel("cx", 324, "Which cache: Redis, or the older Memcached",
    "Redis is a separate server that holds data in memory and is the answer 90 percent of the time. Memcached is the older alternative, simpler and less capable. If an interviewer asks which cache, say Redis.", inner) + m.style();
}

/* ============================================================
   Topic 2 - note 5: caching happens in more places (layers)
   ============================================================ */
function layersPanel() {
  const p = "ndCl", m = anim(p), P = 2.7, T = 11.6;
  const layers = [
    ["Browser cache", "keeps images and CSS locally"],
    ["CDN", "a cache for files, near users"],
    ["Application cache", "Redis: the one interviews mean"],
    ["Database's own cache", "recent pages kept in memory"],
  ];
  const Y0 = 96, PITCH = 70, RX = 56;
  const pts = [];
  layers.forEach((_, k) => {
    const b = k * P, y = Y0 + k * PITCH + 26;
    pts.push([b + 0.05, 30, 66, 0], [b + 0.25, 30, 66, 1], [b + 1.3, 30, y, 1], [b + 1.8, 76, y, 1], [b + 2.4, 76, y, 1], [b + 2.55, 76, y, 0]);
  });
  const t = m.add("T", T, trk(T, pts));
  const rows = layers.map(([name, desc], k) => {
    const y = Y0 + k * PITCH, yc = y + 26;
    const st = m.add(`S${k}`, T, [
      [0, HIDE], [k * P + 1.75, HIDE], [k * P + 1.95, "opacity:1;transform:scale(.92)"], [k * P + 2.1, "opacity:1;transform:scale(1)"], [k * P + 2.5, "opacity:1;transform:scale(1)"], [k * P + 2.65, HIDE], [T, HIDE],
    ]);
    return `${rc(RX, y, 236, 52, k === 2 ? "nd-yfill" : "nd-p")}${tx(RX + 14, y + 22, name, "nd-b")}${tx(RX + 14, y + 40, desc, "nd-s")}
      <g transform="translate(266,${yc}) rotate(${k % 2 ? 3 : -3})"><g class="nd-fb ${st}" style="opacity:0"><rect class="nd-k nd-t2 nd-inkfill" x="-22" y="-11" width="44" height="22" rx="3"/>${tx(0, 4, "HIT", "nd-st nd-onink", "middle")}</g></g>`;
  }).join("");
  const circles = layers.map((_, k) => {
    const yc = Y0 + k * PITCH + 26;
    return `<g transform="translate(30,${yc})"><circle class="nd-k nd-t2 nd-inkfill" r="11"/>${tx(0, 4.5, String(k + 1), "nd-st nd-onink", "middle")}</g>`;
  }).join("");
  const inner = `${head("CACHING IN MORE PLACES", "THAN YOU'D THINK")}
    ${rc(6, 54, 50, 22, "nd-t2 nd-p", 3)}${tx(31, 69, "User", "nd-st", "middle")}
    <path class="nd-k" d="M30,78V332"/>
    ${rows}${circles}
    ${tl(8, 392, ["The request stops at the first layer", "that already has the answer."], "nd-s nd-cap")}
    ${ticket(t)}`;
  return panel("cl", 414, "Caching happens in more places than most beginners realise",
    "A request travels through four caches in order: the browser cache, the CDN, the application cache which is Redis and the one interviews mean, and the database's own cache. It stops at the first layer that already has the answer.", inner) + m.style();
}

/* ============================================================
   Topic 3 - SQL tables (image 5) + legend
   ============================================================ */
function tbl(x, y, w, name, cols, rows) {
  const g = [];
  g.push(rc(x, y, w, 24 + 22 + rows.length * 22, "nd-p"));
  g.push(`<rect class="nd-inkfill" x="${x + 1.6}" y="${y + 24}" width="${w - 3.2}" height="22"/>`);
  g.push(tx(x + 12, y + 17, name, "nd-b"));
  cols.forEach(([cxp, label]) => g.push(tx(cxp, y + 39, label, "nd-st nd-onink")));
  return g.join("");
}
function sqlTablesPanel() {
  const p = "ndSqA", m = anim(p), T = 6.4;
  const uRow = m.add("U", T, fadeIn(T, 0.3));
  const link = m.add("L", T, draw(T, 0.9, 2.3));
  const arr = m.add("H", T, fadeIn(T, 2.2, 0.2));
  const oCell = m.add("O", T, fadeIn(T, 2.5));
  const usersRows = [["55", "Ali", "Lahore"], ["56", "Sara", "Karachi"]];
  const ordersRows = [["901", "55", "Laptop"], ["902", "55", "Mouse"]];
  const uc = [[38, "id"], [110, "name"], [200, "city"]];
  const oc = [[38, "order_id"], [128, "user_id"], [214, "item"]];
  const rowTxt = (rowsArr, cxs, y0) => rowsArr.map((r, i) => r.map((c, j) => tx(cxs[j], y0 + i * 22 + 15, c, "nd-s")).join("")).join("");
  const inner = `${head("SQL DATABASE", "(also called relational)")}
    ${tl(8, 63, ["Example: an online shop. Users go in one", "table, their orders in another table."])}
    ${tx(26, 98, "TABLE 1", "nd-st")}
    ${tbl(26, 104, 266, "users", uc, usersRows)}
    <rect class="nd-yfill ${uRow}" x="27.6" y="150" width="262.8" height="22"/>
    ${rowTxt(usersRows, [38, 110, 200], 150)}
    ${tx(26, 226, "TABLE 2", "nd-st")}
    ${tbl(26, 232, 266, "orders", oc, ordersRows)}
    <rect class="nd-yfill ${oCell}" x="116" y="278" width="66" height="22"/><rect class="nd-yfill ${oCell}" x="116" y="300" width="66" height="22"/>
    ${rowTxt(ordersRows, [38, 128, 214], 278)}
    <path class="nd-k ${link}" pathLength="1" d="M26,161H13V311H22"/>
    <path class="nd-k ${link}" pathLength="1" d="M13,289H22"/>
    <g class="${arr}">${arrowRight(24, 289)}${arrowRight(24, 311)}</g>
    ${tl(8, 348, ["Ali's id is 55, so his orders carry", "user_id 55. This is the link."], "nd-s nd-cap")}`;
  return panel("sq-a", 372, "SQL database, also called relational: users and orders tables",
    "Example: an online shop. The users table has columns id, name and city with rows 55 Ali Lahore and 56 Sara Karachi. The orders table has columns order_id, user_id and item with rows 901, 55, Laptop and 902, 55, Mouse. Ali's id is 55, so his orders carry user_id 55. This is the link.", inner) + m.style();
}
function sqlLegendPanel() {
  const p = "ndSqB", m = anim(p), T = 9.6;
  const defs = [
    ["TABLE", ["= one grid of data, like one", "sheet in Excel. Here: users and orders"]],
    ["ROW", ["= one single record, one line.", "Here: Ali is one row"]],
    ["COLUMN", ["= one field that every row", "must have. Here: id, name, city"]],
    ["PRIMARY KEY", ["= the unique id of a row.", "No two rows share it. Here: users.id"]],
    ["FOREIGN KEY", ["= a column holding another", "table's id. Here: orders.user_id"]],
    ["JOIN", ["= asking the DB to stitch two", "tables together using that link"]],
    ["SCHEMA", ["= the fixed shape. EVERY row", "must have exactly these columns"]],
  ];
  const Y0 = 66, PT = 38;
  const band = [[0, "transform:translateY(0);opacity:0"]];
  defs.forEach((_, i) => {
    const t = 0.4 + i * 1.2;
    band.push([t, `transform:translateY(${i * PT}px);opacity:${i ? 1 : 0}`], [t + 0.15, `transform:translateY(${i * PT}px);opacity:1`], [t + 1.0, `transform:translateY(${i * PT}px);opacity:1`]);
  });
  band.push([T - 0.4, `transform:translateY(${6 * PT}px);opacity:0`], [T, "transform:translateY(0);opacity:0"]);
  const bandC = m.add("B", T, band);
  const items = defs.map(([term, ls], i) => {
    const y = Y0 + i * PT;
    return `<text class="nd-s" x="18" y="${y}"><tspan class="nd-b">${term}</tspan> ${ls[0]}</text>${tx(18, y + 14, ls[1], "nd-s")}`;
  }).join("");
  const inner = `${head("WHAT EACH WORD MEANS")}
    ${rc(8, 44, 284, 26 + 6 * PT + 26, "nd-yfill")}
    <rect class="nd-pk ${bandC}" style="fill:var(--paper2);stroke:none" x="13" y="${Y0 - 14}" width="274" height="34" rx="3"/>
    ${items}`;
  return panel("sq-b", 44 + 26 + 6 * PT + 26 + 12, "What each word means: table, row, column, primary key, foreign key, join, schema",
    "Table: one grid of data, like one sheet in Excel, here users and orders. Row: one single record, one line, here Ali is one row. Column: one field that every row must have, here id, name, city. Primary key: the unique id of a row, no two rows share it, here users.id. Foreign key: a column holding another table's id, here orders.user_id. Join: asking the database to stitch two tables together using that link. Schema: the fixed shape, every row must have exactly these columns.",
    inner) + m.style();
}

/* ============================================================
   Topic 3 - transactions: bank transfer, without / with
   ============================================================ */
const bolt = (cls) => `<g transform="translate(150,149)"><g class="nd-fb ${cls}"><path class="nd-k nd-yfill" d="M4,-24L-14,4H-2L-6,24L14,-6H2Z"/></g></g>`;
function transferPanel(rollback) {
  const p = rollback ? "ndTxB" : "ndTxA", m = anim(p), T = 6.4, Y = 149;
  const boltC = m.add("Bo", T, [[0, "transform:scale(1)"], [1.5, "transform:scale(1)"], [1.65, "transform:scale(1.45)"], [1.95, "transform:scale(1)"], [T, "transform:scale(1)"]]);
  const stampC = m.add("St", T, pop(T, rollback ? 2.8 : 2.2));
  let coinC, extra;
  if (rollback) {
    coinC = m.add("C", T, trk(T, [[0.3, 60, Y, 0], [0.5, 60, Y, 1], [1.4, 136, Y, 1], [1.7, 136, Y, 1], [2.0, 136, Y, 1], [2.6, 62, Y, 1], [3.6, 62, Y, 1], [3.8, 62, Y, 0]]));
    const arcC = m.add("R", T, draw(T, 1.9, 2.6));
    const lbl = m.add("RL", T, fadeIn(T, 2.2));
    extra = `<path class="nd-k ${arcC}" pathLength="1" d="M142,124C132,98 84,98 70,118"/><g class="${lbl}">${arrowDown(70, 119)}</g>
      ${tx(106, 94, "ROLLBACK", "nd-st", "middle")}`;
  } else {
    coinC = m.add("C", T, trk(T, [[0.3, 60, Y, 0], [0.5, 60, Y, 1], [1.4, 136, Y, 1], [1.7, 150, Y, 1], [2.0, 150, Y, 0]]));
    extra = `<path class="nd-k" d="M164,${Y}H176" ${DASH}/><path class="nd-mk" transform="translate(186,${Y}) scale(.8)" d="${CROSS}"/>`;
  }
  const inner = `${rollback ? head("WITH A", "TRANSACTION") : head("WITHOUT A", "TRANSACTION")}
    ${rollback ? tl(8, 63, ["Same power cut, but both steps are", "one group: all happen or none."]) : tl(8, 63, ["Moving 500 rupees from Ali to Sara", "is two steps. The power dies between."])}
    ${rc(8, 122, 104, 54)}${tx(60, 146, "Ali", "nd-b", "middle")}${tx(60, 163, rollback ? "500 comes back" : "loses 500", "nd-s", "middle")}
    ${rc(188, 122, 104, 54)}${tx(240, 146, "Sara", "nd-b", "middle")}${tx(240, 163, rollback ? "unchanged" : "never gets it", "nd-s", "middle")}
    <path class="nd-k" d="M114,${Y}H128"/>${arrowRight(130, Y)}${rollback ? `<path class="nd-k" d="M164,${Y}H176" ${DASH}/>` : ""}
    ${bolt(boltC)}${extra}
    <text class="nd-s" x="8" y="206"><tspan class="nd-b">STEP 1</tspan> subtract 500 from Ali</text>
    <text class="nd-s" x="8" y="222"><tspan class="nd-b">STEP 2</tspan> add 500 to Sara</text>
    ${tx(8, 237, rollback ? "(power cut: step 2 fails)" : "(power cut: it never runs)", "nd-s")}
    ${rollback ? stamp(150, 268, -2, stampC, 200, 28, "STEP 1 IS UNDONE") : stamp(150, 268, 2, stampC, 220, 28, "500 RUPEES VANISHED")}
    ${rollback ? tl(8, 310, ["If step two fails, step one is", "undone automatically."], "nd-s nd-cap") : tl(8, 310, ["500 rupees vanish from the world."], "nd-s nd-cap")}
    ${coin(coinC)}`;
  return panel(rollback ? "tx-with" : "tx-without", 336,
    rollback ? "With a transaction: the power cut undoes step one" : "Without a transaction: 500 rupees vanish",
    rollback
      ? "Moving 500 rupees from Ali to Sara is two steps. The power dies after step one, so step two fails. Because both steps are one transaction, step one is undone automatically: the 500 rupees go back to Ali (a rollback) and Sara is unchanged."
      : "Moving 500 rupees from Ali to Sara is two steps: subtract 500 from Ali, add 500 to Sara. The power dies between step one and step two, so the 500 rupees are gone from Ali and never reach Sara: they vanish from the world.",
    inner) + m.style();
}

/* ============================================================
   Topic 3 - ACID
   ============================================================ */
function acidPanel() {
  const p = "ndAc", m = anim(p), T = 6.4;
  const tiles = [
    ["A", "Atomic", ["all steps happen", "or none do (the", "transfer above)"]],
    ["C", "Consistent", ["the data never", "ends up in an", "illegal state"]],
    ["I", "Isolated", ["two people acting at", "the same time don't", "corrupt each other"]],
    ["D", "Durable", ["once the database", "says &quot;saved&quot;, it", "survives a power cut"]],
  ];
  const html = tiles.map(([l, w, ls], i) => {
    const x = 8 + (i % 2) * 146, y = 56 + Math.floor(i / 2) * 124;
    const c = m.add(`P${i}`, T, [[0, "fill:var(--paper2)"], [0.2 + i * 1.3, "fill:var(--paper2)"], [0.5 + i * 1.3, "fill:var(--yellow)"], [1.4 + i * 1.3, "fill:var(--yellow)"], [1.7 + i * 1.3, "fill:var(--paper2)"], [T, "fill:var(--paper2)"]]);
    return `<rect class="nd-k nd-p ${c}" x="${x}" y="${y}" width="138" height="112" rx="5"/>
      <rect class="nd-k nd-t2 nd-yfill" x="${x + 8}" y="${y + 8}" width="34" height="34" rx="3"/>${tx(x + 25, y + 32, l, "nd-t", "middle")}
      ${tx(x + 50, y + 31, w, "nd-b")}${tl(x + 8, y + 64, ls, "nd-s", 15)}`;
  }).join("");
  const inner = `${head("ACID: WHAT SQL", "PROMISES YOU")}${html}
    ${rc(8, 310, 284, 28, "nd-inkfill")}${tx(150, 329, "SQL GIVES YOU THESE", "nd-st nd-onink", "middle")}
    ${rc(8, 346, 284, 28, "nd-p", 5, DASH)}${tx(150, 365, "NoSQL usually gives you less", "nd-st", "middle")}`;
  return panel("ac", 384, "ACID: Atomic, Consistent, Isolated, Durable",
    "Atomic: all steps happen or none do. Consistent: the data never ends up in an illegal state. Isolated: two people acting at the same time don't corrupt each other. Durable: once the database says saved, it survives a power cut. SQL gives you these and NoSQL usually gives you less.", inner) + m.style();
}

/* ============================================================
   Topic 3 - NoSQL document (image 6, top)
   ============================================================ */
function docPanel() {
  const p = "ndNdA", m = anim(p), T = 6.8;
  const slide = (name, t0, dx) => m.add(name, T, [
    [0, move(dx, 0, 0)], [t0, move(dx, 0, 0)], [t0 + 0.7, move(0, 0, 1)], [T - 0.7, move(0, 0, 1)], [T - 0.2, move(0, 0, 0)], [T, move(dx, 0, 0)],
  ]);
  const a = slide("A", 0.3, -90), b = slide("B", 0.6, 90), c = slide("C", 0.9, -90), d = slide("D", 1.7, 90);
  const hl = m.add("H", T, fadeIn(T, 2.2));
  const inner = `${head("NoSQL DATABASE", "(document style)")}
    ${tl(8, 63, ["Same shop, same user Ali. But everything", "about him sits together in ONE place."])}
    ${tx(8, 100, "ONE DOCUMENT", "nd-st")}
    ${rc(8, 108, 284, 210, "nd-p", 9)}
    ${tx(22, 132, "key:  user_55", "nd-b")}
    <g class="${a}">${tx(32, 160, "name:  Ali")}</g>
    <g class="${b}">${tx(32, 180, "city:  Lahore")}</g>
    <g class="${c}">${tx(32, 200, "orders:")}${tx(52, 220, "901  -  Laptop")}${tx(52, 238, "902  -  Mouse")}</g>
    <rect class="nd-yfill ${hl}" x="24" y="250" width="252" height="20"/>
    <g class="${d}">${tx(32, 265, "loyalty_points:  340", "nd-b")}${tl(32, 288, ["only Ali has this field -", "that is allowed here"], "nd-s", 14)}</g>`;
  return panel("nd-doc", 334, "NoSQL database, document style: one document for Ali",
    "Same shop, same user Ali, but everything about him sits together in one place. One document with key user_55: name Ali, city Lahore, orders 901 Laptop and 902 Mouse, and loyalty_points 340. Only Ali has the loyalty_points field, and that is allowed here.", inner) + m.style();
}
function docChangedPanel() {
  const p = "ndNdB", m = anim(p), T = 4.8;
  const blink = m.add("L", T, [[0, "fill:var(--yellow)"], [1.2, "fill:var(--yellow)"], [1.6, "fill:var(--paper2)"], [2.2, "fill:var(--paper2)"], [2.6, "fill:var(--yellow)"], [T, "fill:var(--yellow)"]]);
  const stampC = m.add("St", T, pop(T, 1.0));
  const mini = (x, key, fields, ghost) => `${rc(x, 176, 136, 116, "nd-p", 6)}${tx(x + 10, 196, `key:  ${key}`, "nd-st")}
    ${fields.map((f, i) => tx(x + 14, 218 + i * 16, f, "nd-s")).join("")}${ghost}`;
  const inner = `${head("WHAT CHANGED", "vs SQL")}
    ${rc(8, 52, 284, 104, "nd-yfill")}
    ${tl(20, 76, ["No JOIN needed. The orders", "are already inside. One read."])}
    ${tl(20, 118, ["No fixed SCHEMA. Each document", "can have different fields."])}
    ${mini(8, "user_55", ["name", "city", "orders"], "")}
    <rect class="nd-k nd-t2 nd-yfill ${blink}" x="17" y="260" width="118" height="20" rx="2"/>${tx(22, 274, "loyalty_points", "nd-st")}
    ${mini(156, "user_56", ["name", "city", "orders"], `<rect class="nd-k nd-t2" ${DASH} x="165" y="260" width="118" height="20" rx="2"/>${tx(224, 274, "no loyalty_points", "nd-s", "middle")}`)}
    ${stamp(150, 326, -2, stampC, 220, 28, "ONE READ, NO JOIN")}`;
  return panel("nd-chg", 350, "What changed compared with SQL",
    "No join is needed because the orders are already inside the document, so it is one read. There is no fixed schema, so each document can have different fields: user_55 has a loyalty_points field and user_56 does not.", inner) + m.style();
}

/* ============================================================
   Topic 3 - why NoSQL exists: one trip vs many, and sharding
   ============================================================ */
function whyTripPanel() {
  const p = "ndNwA", m = anim(p), T = 8;
  const t1 = m.add("T", T, trk(T, [[0.3, 50, 116, 0], [0.5, 50, 116, 1], [1.2, 50, 116, 1], [2.0, 150, 116, 1], [2.8, 150, 116, 1], [3.6, 250, 116, 1], [4.1, 250, 116, 0]]));
  const t2 = m.add("U", T, trk(T, [[4.5, 30, 214, 0], [4.7, 30, 214, 1], [5.4, 150, 214, 1], [6.0, 150, 214, 1], [6.3, 150, 214, 0]]));
  const pulse = m.add("D", T, [[0, "transform:scale(1)"], [5.3, "transform:scale(1)"], [5.6, "transform:scale(1.03,1.12)"], [6.0, "transform:scale(1)"], [T, "transform:scale(1)"]]);
  const chip = (x, w, a, b, cls = "nd-p") => `${rc(x, 96, w, 40, cls)}${tx(x + w / 2, 114, a, "nd-b", "middle")}${tx(x + w / 2, 128, b, "nd-s", "middle")}`;
  const docs = [0, 1, 2, 3].map((i) => `${rc(8 + i * 62, 304, 54, 30, "nd-t2 nd-p", 3)}${tx(35 + i * 62, 324, "Ali", "nd-st", "middle")}`).join("");
  const inner = `${head("1. ONE TRIP,", "NOT MANY")}
    ${tl(8, 63, ["Showing Ali's order history:"])}
    <rect class="nd-k nd-t2 nd-inkfill" x="8" y="76" width="44" height="16" rx="2"/>${tx(30, 88, "SQL", "nd-st nd-onink", "middle")}
    ${chip(8, 84, "users", "read table")}<path class="nd-k" d="M94,116H104"/>${arrowRight(106, 116)}
    ${chip(108, 84, "orders", "read table")}<path class="nd-k" d="M194,116H204"/>${arrowRight(206, 116)}
    ${chip(208, 84, "JOIN", "stitch them")}
    ${tx(8, 158, "three steps to build one answer", "nd-s")}
    <rect class="nd-k nd-t2 nd-yfill" x="8" y="174" width="60" height="16" rx="2"/>${tx(38, 186, "NoSQL", "nd-st", "middle")}
    <g class="nd-fb ${pulse}">${rc(8, 194, 284, 40, "nd-yfill")}${tx(150, 212, "ONE DOCUMENT", "nd-b", "middle")}${tx(150, 227, "orders already inside", "nd-s", "middle")}</g>
    ${tx(8, 256, "read one document and you're done", "nd-s")}
    <rect class="nd-k nd-t2 nd-inkfill" x="8" y="278" width="92" height="16" rx="2"/>${tx(54, 290, "THE COST", "nd-st nd-onink", "middle")}
    ${docs}${tx(266, 324, "×100", "nd-b", "middle")}
    ${tl(8, 356, ["Ali's name might be copied into a hundred", "documents. Change it and you must update", "all hundred."], "nd-s nd-cap")}
    ${ticket(t1)}${ticket(t2)}`;
  return panel("nw-trip", 396, "Reason 1: reading is one trip instead of many",
    "In SQL, showing Ali's order history means reading the users table, then the orders table, then stitching them together with a join: three steps. In NoSQL you read one document with the orders already inside and you are done. The cost is duplicated data: Ali's name might be copied into a hundred documents, and changing it means updating all hundred.", inner) + m.style();
}
function whyShardPanel() {
  const p = "ndNwB", m = anim(p), T = 3.2;
  const wob = m.add("W", T, [[0, "transform:rotate(0)"], [0.4, "transform:rotate(-9deg)"], [0.8, "transform:rotate(8deg)"], [1.2, "transform:rotate(-8deg)"], [1.6, "transform:rotate(7deg)"], [2.0, "transform:rotate(-5deg)"], [2.4, "transform:rotate(0)"], [T, "transform:rotate(0)"]]);
  const xk = m.add("X", T, [[0, "transform:scale(1)"], [0.6, "transform:scale(1.35)"], [1.2, "transform:scale(1)"], [1.8, "transform:scale(1.35)"], [2.4, "transform:scale(1)"], [T, "transform:scale(1)"]]);
  const t = m.add("T", T, trk(T, [[0.2, 22, 316, 0], [0.4, 22, 316, 1], [1.1, 58, 316, 1], [1.6, 58, 316, 1], [2.3, 22, 316, 1], [2.5, 22, 316, 0]]));
  const machine = (x, y, label, range, a, b, cls) => `${rc(x, y, 112, 92)}${tx(x + 56, y + 20, label, "nd-b", "middle")}${tx(x + 56, y + 35, range, "nd-s", "middle")}
    ${rc(x + 10, y + 46, 92, 18, cls, 3)}${tx(x + 56, y + 59, a, "nd-st", "middle")}${rc(x + 10, y + 68, 92, 18, cls, 3)}${tx(x + 56, y + 81, b, "nd-st", "middle")}`;
  const inner = `${head("2. SPLITS ACROSS", "MACHINES")}
    ${tl(8, 63, ["Sharding: user IDs 1–1000 on machine A,", "1001–2000 on machine B."])}
    <rect class="nd-k nd-t2 nd-inkfill" x="8" y="88" width="44" height="16" rx="2"/>${tx(30, 100, "SQL", "nd-st nd-onink", "middle")}
    ${machine(8, 110, "Machine A", "users 1–1000", "users", "orders", "nd-t2 nd-p")}${machine(180, 110, "Machine B", "users 1001–2000", "users", "orders", "nd-t2 nd-p")}
    <g transform="translate(150,156)"><g class="nd-fb ${wob}"><path class="nd-k" d="M-28,0C-20,-10 -14,10 -6,0S8,-10 16,0 22,4 26,0"/>${arrowRight(30, 0)}</g></g>
    <g transform="translate(150,174)"><g class="nd-fb ${xk}"><circle class="nd-k nd-t2 nd-yfill" r="10"/><path class="nd-mk" transform="scale(.9)" d="${CROSS}"/></g></g>
    ${tx(150, 222, "a join reaches across the network", "nd-s", "middle")}
    <rect class="nd-k nd-t2 nd-yfill" x="8" y="242" width="60" height="16" rx="2"/>${tx(38, 254, "NoSQL", "nd-st", "middle")}
    ${machine(8, 264, "Machine A", "users 1–1000", "document", "document", "nd-t2 nd-p")}${machine(180, 264, "Machine B", "users 1001–2000", "document", "document", "nd-t2 nd-p")}
    ${tl(8, 380, ["Documents are self-contained, so they", "split cleanly. SQL hates this."], "nd-s nd-cap")}
    ${ticket(t)}`;
  return panel("nw-shard", 404, "Reason 2: it splits across machines more easily",
    "Sharding splits a database across machines: user IDs 1 to 1000 on machine A, 1001 to 2000 on machine B. With SQL a join now has to reach across two machines over the network. NoSQL documents are self-contained, so a read stays on one machine and they split cleanly.", inner) + m.style();
}

/* ============================================================
   Topic 3 - which one do I pick (image 6, bottom)
   ============================================================ */
function pickPanel(sql) {
  const p = sql ? "ndPkA" : "ndPkB", m = anim(p), T = 8;
  const rows = sql
    ? [[50, 28, ["Money, orders, bookings, stock"]], [80, 28, ["Data connects to other data"]], [110, 40, ["You need transactions", "(all-or-nothing changes)"]]]
    : [[50, 28, ["Huge piles of simple records"]], [80, 28, ["Chat messages, logs, feeds"]], [110, 28, ["Shape of data keeps changing"]], [140, 28, ["Too big for one machine"]]];
  const html = rows.map(([y, h, ls], i) => {
    const c = m.add(`R${i}`, T, [[0, "opacity:0"], [0.3 + i * 1.6, "opacity:0"], [0.6 + i * 1.6, "opacity:1"], [1.6 + i * 1.6, "opacity:1"], [1.9 + i * 1.6, "opacity:0"], [T, "opacity:0"]]);
    return `<rect class="nd-yfill nd-pk ${c}" x="8" y="${y}" width="284" height="${h}" rx="3"/>
      <g transform="translate(24,${y + 14})"><circle class="nd-k nd-t2 nd-p" r="9"/><path class="nd-mk" style="stroke-width:2.4" transform="scale(.7)" d="${TICK}"/></g>${tl(42, y + 18, ls, "nd-s", 15)}`;
  }).join("");
  const inner = `${head(sql ? "Pick SQL when..." : "Pick NoSQL when...")}${html}
    ${rc(8, 188, 284, 56, sql ? "nd-inkfill" : "nd-yfill")}
    ${sql ? tx(150, 212, "Being WRONG is unacceptable.", "nd-b nd-onink", "middle") + tx(150, 230, "This is the default choice", "nd-s nd-onink", "middle")
          : tx(150, 212, "Being SLOW is unacceptable,", "nd-b", "middle") + tx(150, 230, "slightly-old data is okay", "nd-s", "middle")}`;
  return panel(sql ? "pk-sql" : "pk-nosql", 262, sql ? "Pick SQL when..." : "Pick NoSQL when...",
    sql
      ? "Pick SQL when: money, orders, bookings, stock; data connects to other data; you need transactions, all-or-nothing changes. Being wrong is unacceptable. This is the default choice."
      : "Pick NoSQL when: huge piles of simple records; chat messages, logs, feeds; the shape of data keeps changing; too big for one machine. Being slow is unacceptable and slightly-old data is okay.",
    inner) + m.style();
}

/** Map key -> function returning the figure's inner markup (merged into the registry in system-design.js). */
export default {
  cacheRepeat: () => two(repeatPanelA(), repeatPanelB()),
  cacheSpeed: () => one(speedPanel()),
  cacheMissHit: () => two(missHitPanel(true), missHitPanel(false)),
  cacheRedis: () => one(redisPanel()),
  cacheLayers: () => one(layersPanel()),
  sqlTables: () => two(sqlTablesPanel(), sqlLegendPanel()),
  sqlTransfer: () => two(transferPanel(false), transferPanel(true)),
  sqlAcid: () => one(acidPanel()),
  nosqlDoc: () => two(docPanel(), docChangedPanel()),
  nosqlWhy: () => two(whyTripPanel(), whyShardPanel()),
  pickDb: () => two(pickPanel(true), pickPanel(false)),
};
