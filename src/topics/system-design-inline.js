/**
 * Small inline pictures that sit INSIDE a note body (token "@@inline:<key>" in content/system-design/index.js).
 * Each one floats over empty space to the right of short lines (absolute position, no height of its own), so it can
 * never push text down or make the page taller. system-design-mini.js shows a picture only while it overlaps no text.
 * Static: nothing moves.
 */
const INK = "#141210", YEL = "#f2b01e", PAPER = "#f4efe3", GREY = "#cfc8b8", RED = "#c0392b", GRN = "#2f7d4f";

const T = (x, y, s, size = 10, a = "middle", fill = INK) =>
  `<text x="${x}" y="${y}" font-size="${size}" text-anchor="${a}" fill="${fill}" stroke="none">${s}</text>`;
const R = (x, y, w, h, fill = PAPER, r = 4, sw = 2) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${INK}" stroke-width="${sw}"/>`;
const A = (x1, y1, x2, y2) => {
  const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L, hx = -uy, hy = ux;
  return `<path d="M${x1} ${y1}L${x2} ${y2}M${x2 - ux * 6 + hx * 4} ${y2 - uy * 6 + hy * 4}L${x2} ${y2}L${x2 - ux * 6 - hx * 4} ${y2 - uy * 6 - hy * 4}" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
};
const dot = (x, y, r = 2.6, fill = YEL) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${INK}" stroke-width="1.4"/>`;
const server = (x, y, w = 40, h = 18) => R(x, y, w, h, PAPER, 3, 1.8) + dot(x + 7, y + h / 2, 2.4);

/** wrap an svg body as a floating mini picture. w/h = size on the page, dy = extra offset from the anchor line. */
const mini = (w, h, label, body, dy = 0, vb = [w, h]) => () =>
  `<span class="sd-mini-anchor"><span class="sd-mini" data-w="${w}" data-h="${h}" data-dy="${dy}" role="img" aria-label="${label}">` +
  `<svg viewBox="0 0 ${vb[0]} ${vb[1]}" xmlns="http://www.w3.org/2000/svg" focusable="false" font-family="Oswald, Impact, sans-serif" font-weight="700" stroke-linecap="round" stroke-linejoin="round">${body}</svg></span></span>`;

// ---- Topic 1 -----------------------------------------------------------------------------------------------
const lbMini = mini(330, 66, "Users send requests to a load balancer, which spreads them across three servers.", `
  <g fill="none" stroke="${INK}" stroke-width="2.4">
    <circle cx="22" cy="28" r="7" fill="${PAPER}"/><path d="M9 52c0-8 6-12 13-12s13 4 13 12z" fill="${PAPER}"/>
    <path d="M42 40h30"/><path d="M66 35l6 5-6 5"/>
    <rect x="76" y="14" width="104" height="52" rx="6" fill="${YEL}"/>
    <path d="M86 28h84M86 40h84M86 52h84" stroke-width="1.4" opacity=".45"/>
    <path d="M180 28L234 14"/><path d="M180 40h54"/><path d="M180 52l54 14"/>
    <path d="M228 10l6 4-7 3"/><path d="M228 35l6 5-6 5"/><path d="M227 63l7 3-6 5"/>
    <rect x="238" y="4" width="92" height="20" rx="4" fill="${PAPER}"/><rect x="238" y="30" width="92" height="20" rx="4" fill="${PAPER}"/><rect x="238" y="56" width="92" height="20" rx="4" fill="${PAPER}"/>
    <circle cx="250" cy="14" r="3" fill="${YEL}"/><circle cx="250" cy="40" r="3" fill="${YEL}"/><circle cx="250" cy="66" r="3" fill="${YEL}"/>
  </g>
  ${T(128, 45, "LOAD BALANCER", 11)}${T(298, 18, "server 1")}${T(298, 44, "server 2")}${T(298, 70, "server 3")}${T(22, 72, "users", 9)}`,
  0, [380, 76]);

const t1Five = mini(270, 26, "Five normal machines all running the same code.",
  [0, 1, 2, 3, 4].map((i) => server(2 + i * 54, 3, 46, 20)).join("") + [0, 1, 2, 3, 4].map((i) => T(30 + i * 54, 17, "app", 9)).join(""));

const t1Hosting = mini(320, 58, "Nginx or HAProxy you run yourself, versus a managed load balancer you click on.", `
  ${R(2, 4, 150, 50, PAPER, 6)}${server(10, 14, 34, 16)}${T(100, 22, "Nginx / HAProxy", 11)}${T(100, 44, "you run it yourself", 9.5)}
  ${R(168, 4, 150, 50, YEL, 6)}
  <path d="M184 32c-6 0-9-5-6-9 2-4 7-5 10-2 2-5 10-5 12 0 5-1 8 4 5 8-1 3-4 3-6 3z" fill="${PAPER}" stroke="${INK}" stroke-width="1.8"/>
  ${T(266, 22, "AWS ALB", 11)}${T(266, 44, "managed, click a button", 9.5)}`);

// ---- Topic 2 -----------------------------------------------------------------------------------------------
const t2Speed = mini(300, 92, "Speed ladder: memory is very fast, disk is about a hundred times slower, another datacenter is about a hundred times slower again.", `
  ${T(2, 22, "memory", 10, "start")}${R(64, 8, 22, 20, YEL, 3)}${T(94, 23, "very fast", 10, "start")}
  ${T(2, 52, "disk", 10, "start")}${R(64, 38, 120, 20, PAPER, 3)}${T(190, 53, "~100× slower", 10, "start")}
  ${T(2, 82, "far away", 10, "start")}${R(64, 68, 226, 20, GREY, 3)}${T(177, 83, "~100× slower again", 10)}`);

const t2HitMiss = mini(320, 58, "A cache hit is fast: the cache has it. A cache miss is slow: it goes on to the database.", `
  ${R(2, 3, 48, 22, PAPER, 4)}${T(26, 18, "app", 10)}${A(52, 14, 92, 14)}${R(94, 3, 76, 22, YEL, 4)}${T(132, 18, "cache ✓ hit", 10)}${T(182, 18, "fast", 10, "start", GRN)}
  ${R(2, 33, 48, 22, PAPER, 4)}${T(26, 48, "app", 10)}${A(52, 44, 92, 44)}${R(94, 33, 76, 22, PAPER, 4)}${T(132, 48, "cache ✗ miss", 10)}${A(172, 44, 212, 44)}${R(214, 33, 66, 22, GREY, 4)}${T(247, 48, "database", 10)}${T(288, 48, "slow", 10, "start", RED)}`);

// ---- Topic 3 -----------------------------------------------------------------------------------------------
const acidBox = (x, y, letter, a, b) =>
  R(x, y, 142, 52, PAPER, 6) + `<circle cx="${x + 24}" cy="${y + 26}" r="16" fill="${YEL}" stroke="${INK}" stroke-width="2"/>` + T(x + 24, y + 33, letter, 20) + T(x + 84, y + 23, a, 11) + T(x + 84, y + 40, b, 9.5);
const t3Acid = mini(300, 118, "ACID: atomic means all or nothing, consistent means legal data, isolated means no clashes, durable means it survives a power cut.",
  acidBox(2, 2, "A", "Atomic", "all or nothing") + acidBox(156, 2, "C", "Consistent", "only legal data") +
  acidBox(2, 62, "I", "Isolated", "no clashing") + acidBox(156, 62, "D", "Durable", "survives power cut"));

// ---- Topic 4 -----------------------------------------------------------------------------------------------
const t4WriteRead = mini(320, 58, "Writes go to the leader, reads go to a follower.", `
  ${R(2, 15, 56, 28, PAPER, 5)}${T(30, 33, "app", 11)}
  ${A(60, 24, 140, 14)}${R(142, 2, 118, 24, YEL, 5)}${T(201, 18, "LEADER", 11)}${T(268, 18, "writes", 10, "start", RED)}
  ${A(60, 34, 140, 46)}${R(142, 32, 118, 24, PAPER, 5)}${T(201, 48, "FOLLOWER", 11)}${T(268, 48, "reads", 10, "start", GRN)}`);

const t4CopiesSplits = mini(320, 58, "Replication makes identical copies of the data, sharding gives each machine a different slice.", `
  ${T(2, 19, "copies", 10, "start")}${[0, 1, 2].map((i) => R(66 + i * 62, 4, 56, 22, PAPER, 4) + T(94 + i * 62, 19, "A B C", 10)).join("")}
  ${T(2, 49, "slices", 10, "start")}${["A", "B", "C"].map((l, i) => R(66 + i * 62, 34, 56, 22, YEL, 4) + T(94 + i * 62, 49, l, 11)).join("")}`);

const t4Ladder = mini(300, 92, "The order of fixes as a staircase: index, then cache, then read replicas, and shard last.",
  [["1 index", 22, PAPER], ["2 cache", 38, PAPER], ["3 replicas", 54, PAPER], ["4 shard", 70, YEL]]
    .map(([s, h, f], i) => R(4 + i * 72, 90 - h, 70, h, f, 3) + T(39 + i * 72, 90 - h + 14, s, 10)).join("") + T(262, 12, "last", 10, "middle", RED), 34);

// ---- Topic 5 -----------------------------------------------------------------------------------------------
const t5Pipeline = mini(320, 90, "The app server puts jobs on a queue and separate workers take them off one by one.", `
  ${R(2, 28, 64, 34, PAPER, 5)}${T(34, 49, "app", 11)}${T(34, 78, "producer", 9)}
  ${A(68, 45, 98, 45)}
  ${R(100, 22, 108, 46, YEL, 5)}${T(154, 16, "QUEUE", 10)}${[0, 1, 2].map((i) => R(110 + i * 32, 32, 26, 26, PAPER, 3, 1.8) + T(123 + i * 32, 49, "job", 9)).join("")}
  ${A(210, 36, 242, 22)}${A(210, 54, 242, 68)}
  ${R(244, 6, 74, 28, PAPER, 5)}${T(281, 24, "worker 1", 10)}${R(244, 56, 74, 28, PAPER, 5)}${T(281, 74, "worker 2", 10)}`);

export default { lbMini, t1Five, t1Hosting, t2Speed, t2HitMiss, t3Acid, t4WriteRead, t4CopiesSplits, t4Ladder, t5Pipeline };
