/**
 * DSA section banners — ten wide, hand-inked scenes (one per section) in the same riso /
 * screen-print style as the hero (dsa-art.js): thick ink outline, halftone dots, palette tokens.
 *
 *   vignetteFor(key) -> `<svg class="art-layer vg" viewBox="0 0 1600 300" …>` markup
 *   vignetteKeyForTitle(title) -> key | null
 *
 * Structure of every banner (so dsa-fx.js can animate it and it is still a COMPLETE picture
 * with every animation off):
 *   .vl-b / .vl-m / .vl-f   three parallax layers (back sky + hills, middle scene, front people)
 *   .draw                   outline paths with pathLength=1  (stroke-dash "draw on" reveal)
 *   .fo / .ht / .dt         fills / halftone / detail groups that fade up after the outlines
 *   .ch[data-d=l|r|u]       characters that slide in
 *   .vi-*                   idle loops (CSS keyframes, only RUN while the banner is on screen)
 * Rules: no element that carries a transform ATTRIBUTE is ever animated (CSS/GSAP transforms would
 * replace it) — animated groups are always an extra wrapper with no transform attribute.
 * Every character / object is its own <g id="vg-…">.
 */
import { defs, k, kt, dots, g, T, limb, shoe, head, steam } from "./dsa-art.js";

const FY = 262; // feet on the pavement

// ---------------------------------------------------------------- kit
/** fill (fades in) + outline (draws on) */
const S = (d, c = "") => `<path class="${c} fo" d="${d}"/><path class="k nf draw" pathLength="1" d="${d}"/>`;
const SR = (x, y, w, h, c = "", r = 0) =>
  `<rect class="${c} fo" x="${x}" y="${y}" width="${w}" height="${h}"${r ? ` rx="${r}"` : ""}/>` +
  `<rect class="k nf draw" pathLength="1" x="${x}" y="${y}" width="${w}" height="${h}"${r ? ` rx="${r}"` : ""}/>`;
const SC = (cx, cy, r, c = "") =>
  `<circle class="${c} fo" cx="${cx}" cy="${cy}" r="${r}"/><circle class="k nf draw" pathLength="1" cx="${cx}" cy="${cy}" r="${r}"/>`;
/** an outline-only line that draws on */
const DL = (d, w = "") => `<path class="k nf draw" pathLength="1" d="${d}"${w ? ` style="stroke-width:${w}"` : ""}/>`;
const HT = (d, c = "h-i") => `<path class="${c} ht" d="${d}"/>`;
const dt = (inner) => `<g class="dt">${inner}</g>`;
const txt = (x, y, s, size = 22, c = "ink", extra = "") =>
  `<text class="vg-t ${c}" x="${x}" y="${y}" font-size="${size}" text-anchor="middle" ${extra}>${s}</text>`;
/** idle-loop wrapper with an explicit pivot (local coordinates) */
const pv = (cls, x, y, inner, delay = 0) =>
  `<g class="${cls}" style="transform-box:view-box;transform-origin:${x}px ${y}px;animation-delay:${delay}s">${inner}</g>`;
const wob = (cls, inner, delay = 0) => `<g class="${cls}" style="animation-delay:${delay}s">${inner}</g>`;

let uid = 0;

// ---------------------------------------------------------------- people
/**
 * Simple friendly person (dot eyes). Local origin = between the feet. al / ar = hand end points
 * of the left / right arm (relative), `walk` spreads the legs, `held` is drawn in front of the body.
 */
function person(o) {
  const { id, x, y = FY, s = 1, flip = false, skin = "s1", hair = "ink", style = "short", top = "m",
    pants = "bl", al = [-16, -42], ar = [16, -42], walk = 0, held = "", behind = "", a = "l", anim = "vi-step" } = o;
  const arm = (sx, [ex, ey]) => {
    const mx = (sx + ex) / 2 + (sx < 0 ? -4 : 4), my = (-66 + ey) / 2 + 3;
    return limb(`M${sx} -66Q${mx} ${my} ${ex} ${ey}`, top, 5) + `<circle class="k ${skin}" cx="${ex}" cy="${ey}" r="3.6"/>`;
  };
  const body =
    limb(`M-5 -38L${-8 - walk} -5`, pants, 6) + limb(`M5 -38L${8 + walk} -5`, pants, 6) +
    shoe(-8 - walk, -2) + shoe(8 + walk, -2) +
    behind +
    k("M-12 -36q-3 -26 3 -34h18q6 8 3 34z", top) + dots("M-12 -36q-1 -9 0 -16h24q1 7 0 16z", "h-f") +
    arm(-10, al) + arm(10, ar) + head(0, -82, skin, hair, style) + held;
  const dly = (uid++ % 7) * 0.31;
  return g(id, "ch", `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})"><g class="${anim}" style="animation-delay:${dly}s">${body}</g></g>`, `data-d="${a}"`);
}

// ---------------------------------------------------------------- scenery bits
const cloud = (x, y, s = 1, id = "") =>
  T(x, y, `<g transform="scale(${s})"><g${id ? ` id="${id}"` : ""} class="vi-drift">` +
    k("M10 44a17 17 0 0 1 4 -33a24 24 0 0 1 44 -7a20 20 0 0 1 34 12a16 16 0 0 1 6 28z", "cr") +
    dots("M10 44a17 17 0 0 1 -2 -10c20 12 70 12 96 4a16 16 0 0 1 -6 6z", "h-i") + `</g></g>`);

const hills = (c = "sg", y = 214) =>
  `<path class="${c}" d="M-100 ${y + 40}Q60 ${y - 60} 260 ${y - 16}T620 ${y - 24}T980 ${y - 44}T1340 ${y - 14}T1700 ${y - 30}V300H-100z" style="stroke:var(--ink);stroke-width:3.4;stroke-linejoin:round"/>` +
  `<path class="h-f" d="M-100 ${y + 40}Q60 ${y - 60} 260 ${y - 16}T620 ${y - 24}T980 ${y - 44}T1340 ${y - 14}T1700 ${y - 30}V300H-100z"/>`;

const sky = (c) =>
  `<rect class="${c}" x="-120" y="-30" width="1840" height="360"/>` +
  `<path class="h-f" d="M-120 -30H1720V60H-120z"/><path class="h-w" d="M-120 60H1720V110H-120z" style="opacity:.55"/>`;

const ground = () =>
  `<rect class="pe fo" x="-120" y="252" width="1840" height="70"/>` + HT("M-120 252H1720V268H-120z", "h-f") +
  `<rect class="t fo" x="-120" y="272" width="1840" height="50"/>` + HT("M-120 272H1720V320H-120z", "h-i") +
  DL("M-120 252H1720") + DL("M-120 272H1720") +
  `<path class="nf" style="stroke:var(--paper);stroke-width:3;stroke-dasharray:28 24;stroke-linecap:round" d="M-120 288H1720"/>`;

const bush = (cx, cy, r) =>
  `<circle class="k gn" cx="${cx}" cy="${cy}" r="${r}"/><circle class="k gn" cx="${cx + r * 1.3}" cy="${cy + 4}" r="${r * 0.8}"/>` +
  `<circle class="gn" cx="${cx}" cy="${cy}" r="${r - 1.4}"/><circle class="gn" cx="${cx + r * 1.3}" cy="${cy + 4}" r="${r * 0.8 - 1.4}"/>` +
  `<path class="h-i" d="M${cx - r} ${cy + 4}a${r} ${r} 0 0 0 ${r * 2.2} ${r * 0.9}l-${r * 2.2} 0z"/>`;

function tree(id, x, y = 254, s = 1) {
  const cs = [[0, -96, 36], [-28, -72, 28], [28, -74, 29], [-6, -62, 30]];
  return g(id, "", T(x, y, `<g transform="scale(${s})">` +
    S("M-9 0C-8 -26 -10 -40 -12 -66L12 -66C10 -40 8 -26 9 0z", "br") + HT("M0 -66L12 -66C10 -40 8 -26 9 0L0 0z") +
    dt(cs.map(([a, b, r]) => `<circle class="k gn" cx="${a}" cy="${b}" r="${r}"/>`).join("") +
      cs.map(([a, b, r]) => `<circle class="gn" cx="${a}" cy="${b}" r="${r - 1.4}"/>`).join("") +
      `<path class="h-i" d="M-34 -78a30 30 0 0 0 38 26a36 36 0 0 0 36 -22a44 44 0 0 1 -44 0a30 30 0 0 1 -30 -4z"/>` +
      kt("M-14 -108q6 -8 14 -2M16 -84q6 -7 13 0M-30 -70q5 -7 12 -1")) + `</g>`));
}

function house(id, x, w, h, { wall = "pe", roof = "t", door = "m", wins = 2, flat = false } = {}) {
  const top = 252 - h;
  const rf = flat ? SR(x - 6, top - 14, w + 12, 14, roof)
    : S(`M${x - 8} ${top}L${x + w / 2} ${top - w * 0.36}L${x + w + 8} ${top}z`, roof);
  let det = HT(`M${x + w * 0.68} ${top}h${w * 0.32}V252h-${w * 0.32}z`, "h-f");
  for (let i = 0; i < wins; i++) {
    const wx = x + ((i + 1) * w) / (wins + 1) - 14;
    det += `<rect class="k bl" x="${wx}" y="${top + h * 0.2}" width="28" height="32" rx="3"/>` +
      kt(`M${wx + 14} ${top + h * 0.2}v32M${wx} ${top + h * 0.2 + 16}h28`);
  }
  det += `<rect class="k ${door}" x="${x + w / 2 - 13}" y="206" width="26" height="46" rx="3"/><circle class="ink" cx="${x + w / 2 + 7}" cy="230" r="2"/>`;
  return g(id, "", SR(x, top, w, h, wall) + rf + dt(det));
}

/** hanging sign: board + post (post draws on, board fades in) */
const sign = (x, y, w, label, size = 26, post = 252, c = "cr") =>
  `<g class="dt">${DL(`M${x} ${y + 44}V${post}`, 3)}</g>` +
  `<g class="dt"><rect class="k ${c}" x="${x - w / 2}" y="${y}" width="${w}" height="44" rx="9"/>` +
  `<path class="h-f" d="M${x - w / 2 + 4} ${y + 30}h${w - 8}v10q0 2 -2 2h-${w - 12}q-2 0 -2 -2z"/>` + txt(x, y + 31, label, size) + `</g>`;

const wheel = (cx, cy, r, c = "pe", sp = "vi-spin") =>
  `<circle class="k ink" cx="${cx}" cy="${cy}" r="${r}"/>` +
  pv(sp, cx, cy, `<circle class="k ${c}" cx="${cx}" cy="${cy}" r="${r * 0.58}"/>` +
    kt(`M${cx - r * 0.58} ${cy}h${r * 1.16}M${cx} ${cy - r * 0.58}v${r * 1.16}`)) +
  `<circle class="ink" cx="${cx}" cy="${cy}" r="${r * 0.14}"/>`;

const puff = (x, y, delay = 0, r = 9) =>
  `<g class="vi-smoke" style="animation-delay:${delay}s"><circle class="k cr" cx="${x}" cy="${y}" r="${r}"/></g>`;

const bird = (id, x, y, s = 1, body = "pk") =>
  g(id, "ch", T(x, y, `<g transform="scale(${s})">` + wob("vi-hop",
    `<path class="k ${body}" d="M-18 -10q-14 -2 -24 -12q2 14 22 20z"/>` +
    `<ellipse class="k ${body}" cx="0" cy="-12" rx="17" ry="11"/><circle class="k ${body}" cx="14" cy="-24" r="8"/>` +
    `<path class="k m" d="M21 -26l9 3l-9 3z"/><circle class="ink" cx="16" cy="-25" r="1.6"/>` +
    `<path class="k pkl" d="M-6 -14q4 -12 16 -10q-2 10 -14 14z"/>` +
    kt("M-4 -2l-2 6M4 -2l2 6")), `data-d="u"`));

// ---------------------------------------------------------------- scenes
// each returns { sky, back, mid, front, label }

function sceneQuick() {
  const flags = [];
  const P0 = [-40, 26], P1 = [800, 104], P2 = [1640, 26];
  const cols = ["m", "pk", "sg", "cr", "bl", "t"];
  for (let i = 1; i < 24; i++) {
    const t = i / 24, u = 1 - t;
    const x = u * u * P0[0] + 2 * t * u * P1[0] + t * t * P2[0];
    const y = u * u * P0[1] + 2 * t * u * P1[1] + t * t * P2[1];
    flags.push(`<path class="k ${cols[i % 6]}" d="M${x.toFixed(0)} ${y.toFixed(0)}l-13 3l13 30l13 -30z" transform="translate(0 2)"/>`);
  }
  const shop = g("vg-quick-shop", "",
    SR(60, 108, 250, 144, "pk") + HT("M222 108h88v144h-88z", "h-f") +
    S("M52 108H318l-14 -26H66z", "m") +
    dt([0, 1, 2, 3, 4, 5].map((i) => `<path class="k ${i % 2 ? "cr" : "t"}" d="M${60 + i * 42} 108v10q21 12 42 0v-10z"/>`).join("") +
      `<rect class="k cr" x="110" y="60" width="150" height="26" rx="6"/>` + txt(185, 80, "12 IDEAS", 19) +
      `<rect class="k bl" x="84" y="146" width="96" height="62" rx="5"/>` + kt("M132 146v62M84 177h96") +
      `<rect class="k m" x="214" y="170" width="62" height="82" rx="4"/><circle class="ink" cx="266" cy="214" r="2.4"/>` +
      // a stack of cups and a tiny cat on the sill
      `<ellipse class="k mh" cx="100" cy="206" rx="15" ry="9"/><circle class="k mh" cx="116" cy="196" r="8"/>` +
      `<path class="k mh" d="M110 191l-2 -8l7 4zM121 190l4 -7l2 9z"/><circle class="ink" cx="113" cy="196" r="1.3"/><circle class="ink" cx="120" cy="196" r="1.3"/>` +
      wob("vi-tail", `<path class="kt" d="M86 204q-14 -2 -12 -14"/>`)));
  const stop = g("vg-quick-busstop", "",
    SR(620, 112, 190, 10, "br") + DL("M630 122V252M800 122V252") + `<g class="dt"><rect class="k bl" x="632" y="124" width="164" height="76" rx="3" style="opacity:.7"/>` +
    `<path class="h-w" d="M634 126h160v14h-160z"/><rect class="k cr" x="676" y="70" width="70" height="38" rx="8"/>` + txt(711, 96, "BUS", 22) +
    `<rect class="k m" x="640" y="206" width="148" height="10" rx="3"/><path class="kt" d="M650 216v36M778 216v36"/></g>`);
  const post = g("vg-quick-signpost", "",
    DL("M940 252V70", 5) + `<g class="dt">` +
    [["BIG-O", 80, 1], ["ARRAYS", 112, -1], ["TREES", 144, 1], ["GRAPHS", 176, -1]].map(([t, y, d]) =>
      `<path class="k ${d > 0 ? "m" : "pk"}" d="M${d > 0 ? 944 : 936} ${y - 14}h${d * 96}l${d * 14} 14l${-d * 14} 14h${-d * 96}z"/>` +
      txt(940 + d * 52, y + 5, t, 15)).join("") + `</g>`);
  const hanging = g("vg-quick-laundry", "",
    house("vg-quick-house", 1180, 220, 130, { wall: "sg", roof: "pk", wins: 3 }) +
    dt(`<path class="kt" d="M1130 120Q1160 140 1180 126"/>` +
      `<path class="k cr" d="M1136 128h16v22h-16z"/><path class="k m" d="M1156 132h16v22h-16z"/><path class="k pk" d="M1112 112h14v18h-14z"/>`));
  return {
    label: "A cosy street of little everyday scenes: a café with a cat, a bus stop, a signpost to each topic, a tree with a bird and a house with washing, under bunting.",
    sky: "bl",
    back: cloud(380, 36, 0.8, "vg-quick-cloud1") + cloud(1020, 52, 0.7, "vg-quick-cloud2") + hills("sg", 226),
    mid: ground() + `<g class="dt">${DL("M-40 26Q800 160 1640 26", 3)}${flags.join("")}</g>` + shop + stop + post + hanging +
      tree("vg-quick-tree", 520) + tree("vg-quick-tree2", 1470, 254, 0.9) +
      g("vg-quick-lamp", "", DL("M1110 252V96q0 -16 14 -16h12", 5) + dt(`<circle class="k yl" cx="1142" cy="86" r="10"/>`)),
    front: bird("vg-quick-bird", 540, 140, 0.9) +
      person({ id: "vg-quick-queue1", x: 690, s: 1, top: "bl", pants: "t", hair: "br", style: "bun", skin: "s2", ar: [20, -52], a: "l" }) +
      person({ id: "vg-quick-queue2", x: 745, s: 0.95, top: "pk", pants: "ink", hair: "ink", style: "curly", skin: "s3", flip: true, a: "l" }) +
      person({ id: "vg-quick-kid", x: 1040, s: 0.78, top: "sg", pants: "br", hair: "t", style: "cap", ar: [22, -92], a: "r",
        held: `<path class="kt" d="M22 -92Q30 -118 40 -128"/><ellipse class="k pk" cx="42" cy="-142" rx="15" ry="18"/>` + txt(42, -136, "12", 15) }) +
      person({ id: "vg-quick-checker", x: 430, s: 1, top: "m", pants: "sg", hair: "ink", style: "short", ar: [24, -60], a: "r",
        held: `<rect class="k cr" x="18" y="-80" width="26" height="34" rx="3" transform="rotate(8 30 -64)"/><path class="kt" d="M25 -68l4 4l8 -9" transform="rotate(8 30 -64)"/>` }),
  };
}

function sceneBigO() {
  const bd = (id, label, x, size) => sign(x, 36, 150, label, size, 252);
  const snail = g("vg-bigo-snail", "ch", T(200, 262,
    wob("vi-bob", `<path class="kt" d="M-130 -2h40M-150 -2h6" style="stroke-dasharray:4 8"/>` +
      `<rect class="k pe" x="-56" y="-14" width="124" height="14" rx="7"/><rect class="k pe" x="52" y="-34" width="22" height="26" rx="9"/><circle class="k pe" cx="64" cy="-36" r="12"/>` +
      kt("M60 -46l-4 -16M70 -46l4 -16") + `<circle class="ink" cx="55" cy="-64" r="3"/><circle class="ink" cx="75" cy="-64" r="3"/>` +
      `<circle class="ink" cx="67" cy="-38" r="1.7"/>` + kt("M63 -31q4 3 8 0") +
      `<circle class="k m" cx="-12" cy="-40" r="30"/><path class="kt" d="M-12 -40m0 -4a6 6 0 1 1 -5 6a14 14 0 1 1 14 14a22 22 0 0 1 -22 -22"/>` +
      `<path class="h-i" d="M-30 -22a30 30 0 0 0 40 10a30 30 0 0 0 26 -40a40 40 0 0 1 -66 30z"/>`)), `data-d="l"`);
  const walker = person({ id: "vg-bigo-walker", x: 520, s: 1.05, top: "pk", pants: "bl", hair: "br", style: "cap", skin: "s2", walk: 11, a: "l",
    behind: `<rect class="k br" x="-23" y="-68" width="14" height="28" rx="4"/>`, ar: [14, -46], al: [-14, -40] });
  const bike = g("vg-bigo-bike", "ch", T(820, 294, wob("vi-bob",
    wheel(-36, -22, 22, "bl") + wheel(36, -22, 22, "bl") +
    `<path class="lb" stroke-width="9" d="M-36 -22L-8 -22L8 -52L32 -52M-8 -22L-14 -50M36 -22L28 -52"/><path class="lc t" stroke-width="3" d="M-36 -22L-8 -22L8 -52L32 -52M-8 -22L-14 -50M36 -22L28 -52"/>` +
    `<path class="k ink" d="M-24 -54h20l2 6h-24z"/><path class="kt" d="M26 -54l10 -4"/>` +
    limb("M-6 -52L6 -86", "m", 11) + limb("M6 -82L28 -66L30 -56", "m", 5) + limb("M-6 -52L10 -40L4 -16", "bl", 6) +
    head(8, -100, "s3", "ink", "curly"))), `data-d="l"`);
  const car = g("vg-bigo-car", "ch", T(1120, 286, wob("vi-bob",
    S("M-80 -8V-32q0 -6 6 -8L-50 -38L-30 -66H28L50 -38L74 -34q6 2 6 8V-8z", "pk") +
    `<path class="k bl" d="M-42 -42L-26 -62H-3V-42zM3 -42V-62H24L40 -42z"/>` +
    HT("M-80 -22H80V-8H-80z") + `<circle class="k yl" cx="72" cy="-24" r="5"/><circle class="k m" cx="-76" cy="-24" r="4"/>` +
    wheel(-46, -6, 16, "pe") + wheel(46, -6, 16, "pe") +
    puff(-92, -10, 0, 6) + puff(-104, -14, 0.8, 5) +
    `<g transform="translate(-6 -64)">${head(0, -10, "s1", "br", "long")}</g>` +
    `<path class="kt" d="M-120 -24h22M-134 -36h30M-116 -12h18" style="opacity:.8"/>`), `data-d="r"`));
  const rocket = g("vg-bigo-rocket", "ch", T(1450, 190,
    pv("vi-flame", 0, 0, `<path class="k m" d="M-14 0Q0 70 14 0z"/><path class="pk" d="M-7 0Q0 34 7 0z"/>`) +
    puff(-30, 66, 0, 11) + puff(32, 70, 0.9, 10) +
    `<path class="k pk" d="M-22 -34L-48 6L-22 -8z"/><path class="k pk" d="M22 -34L48 6L22 -8z"/>` +
    `<path class="k cr" d="M0 -150C32 -120 32 -50 22 0H-22C-32 -50 -32 -120 0 -150z"/>` +
    `<path class="k pk" d="M0 -150C14 -138 20 -126 22 -112H-22C-20 -126 -14 -138 0 -150z"/>` +
    HT("M10 -150C32 -120 32 -50 22 0H8C18 -50 14 -120 10 -150z") +
    `<circle class="k bl" cx="0" cy="-78" r="13"/><path class="k m" d="M-24 -30h48v10h-48z"/>`, ), `data-d="r"`);
  const trackLines = `<g class="dt"><path class="kt" d="M300 180h60M330 200h50M290 220h40" style="opacity:.55"/><path class="kt" d="M1280 150h50M1260 170h40M1290 190h50" style="opacity:.55"/></g>`;
  return {
    label: "A street of travellers racing to the finish: a snail for O(n squared), a walker for O(n), a cyclist for O(n log n), a car for O(log n) and a rocket for O(1).",
    sky: "yl",
    back: cloud(260, 70, 0.9, "vg-bigo-cloud1") + cloud(900, 40, 0.8, "vg-bigo-cloud2") + cloud(1340, 84, 0.7, "vg-bigo-cloud3") + hills("sg", 230),
    mid: ground() + bd("a", "O(n²)", 200, 28) + bd("b", "O(n)", 520, 28) + bd("c", "O(n log n)", 820, 24) + bd("d", "O(log n)", 1120, 26) + bd("e", "O(1)", 1330, 28) + trackLines +
      g("vg-bigo-flag", "", DL("M1560 252V96", 4) + dt(`<path class="k cr" d="M1560 96h-40l10 14l-10 14h40z"/><path class="h-i" d="M1560 96h-20l5 14l-5 14h20z"/>`)),
    front: snail + walker + bike + car + rocket,
  };
}

function sceneArrays() {
  const ws = [];
  const curt = ["pk", "m", "sg", "pkl", "t", "bl", "pk", "m", "sg"];
  for (let i = 0; i < 9; i++) {
    const x = 255 + i * 120;
    ws.push(`<rect class="k ${i % 4 === 1 ? "yl" : "bl"}" x="${x}" y="70" width="84" height="100" rx="8"/>` +
      kt(`M${x + 42} 70v100M${x} 120h84`) + `<path class="k ${curt[i]}" d="M${x + 2} 72h24q-6 30 0 54h-24z"/><path class="k ${curt[i]}" d="M${x + 82} 72h-24q6 30 0 54h24z"/>` +
      `<rect class="k br" x="${x - 6}" y="170" width="96" height="10" rx="3"/>` +
      (i % 3 === 0 ? `<path class="k gn" d="M${x + 30} 168q-6 -16 6 -24q6 14 -2 24zM${x + 44} 168q4 -18 16 -20q0 14 -10 20z"/>` : "") +
      `<rect class="k cr" x="${x + 17}" y="186" width="50" height="26" rx="8"/>` + txt(x + 42, 206, i === 8 ? "n-1" : String(i), 20));
  }
  const hand = `<path class="lb" stroke-width="11" d="M0 0"/>`;
  const frame = `<rect class="wh" x="478" y="54" width="352" height="164" rx="12" style="opacity:.28"/>` +
    `<rect class="k nf" x="478" y="54" width="352" height="164" rx="12" style="stroke-width:10"/>` +
    `<rect class="nf" x="478" y="54" width="352" height="164" rx="12" style="stroke:var(--mustard);stroke-width:4.6"/>` +
    `<path class="k m" d="M830 150h12q6 0 6 6v26q0 6 -6 6h-12z"/>`;
  const slider = g("vg-arr-slider", "ch", wob("vi-slide", frame +
    `<path class="lb" stroke-width="9" d="M652 214L652 238"/><path class="lc br" stroke-width="3" d="M652 214L652 238"/>` +
    txt(654, 40, "window of k", 22, "ink", `style="paint-order:stroke;stroke:var(--paper);stroke-width:5"`) +
    person({ id: "vg-arr-person", x: 652, y: FY, s: 1, top: "bl", pants: "t", hair: "br", style: "bun", skin: "s2", al: [-18, -40], ar: [14, -52], a: "l", anim: "vi-none" })), `data-d="l"`);
  return {
    label: "A long facade of numbered windows, 0 to n-1, with a person sliding a framed window of three over them: the sliding-window technique on an array.",
    sky: "pkl",
    back: cloud(300, 36, 0.8, "vg-arr-cloud1") + cloud(1120, 50, 0.9, "vg-arr-cloud2") + hills("sg", 232),
    mid: ground() +
      g("vg-arr-facade", "", SR(200, 40, 1200, 212, "pe") + HT("M1200 40h200v212h-200z", "h-f") + SR(190, 28, 1220, 16, "t") +
        dt(ws.join("") + `<rect class="k m" x="190" y="214" width="1220" height="8" rx="3"/>` +
          `<rect class="k t" x="1330" y="196" width="44" height="56" rx="4"/><circle class="ink" cx="1362" cy="226" r="2.4"/>`)) +
      tree("vg-arr-tree", 90) + g("vg-arr-bench", "", `<g class="dt"><rect class="k br" x="1470" y="234" width="100" height="10" rx="3"/><path class="kt" d="M1480 244v10M1560 244v10M1470 214h100"/></g>`),
    front: slider + bird("vg-arr-pigeon", 1520, 232, 0.7, "bl"),
  };
}

function sceneLinked() {
  const cars = [];
  const vals = ["3", "7", "1", "9"], cc = ["pe", "pk", "sg", "bl"];
  for (let i = 0; i < 4; i++) {
    const x = 460 + i * 250;
    cars.push(g(`vg-ll-car${i}`, "",
      SR(x, 142, 190, 96, cc[i], 8) + HT(`M${x + 130} 142h60v96h-60z`, "h-f") + SR(x - 4, 130, 198, 14, "cr", 5) +
      dt(`<rect class="k yl" x="${x + 12}" y="158" width="38" height="36" rx="5"/><rect class="k yl" x="${x + 140}" y="158" width="38" height="36" rx="5"/>` +
        `<circle class="k cr" cx="${x + 95}" cy="184" r="27"/>` + txt(x + 95, 193, vals[i], 28) + txt(x + 95, 138, "node", 12, "ink") +
        wheel(x + 38, 252, 16, "pe") + wheel(x + 152, 252, 16, "pe")) +
      (i < 3 ? g(`vg-ll-link${i}`, "", DL(`M${x + 190} 214H${x + 250}`, 6) + dt(`<path class="k m" d="M${x + 226} 202l22 12l-22 12z"/>` + txt(x + 220, 196, "next", 13))) : "")));
  }
  const engine = g("vg-ll-engine", "",
    SR(130, 150, 190, 88, "m", 14) + HT("M230 150h90v88h-90z", "h-f") + SR(250, 108, 90, 130, "pk", 8) + SR(150, 112, 34, 38, "ink", 3) + SR(142, 100, 50, 14, "t", 4) +
    dt(`<rect class="k bl" x="268" y="126" width="54" height="42" rx="5"/><circle class="k t" cx="146" cy="196" r="8"/>` +
      `<path class="k t" d="M340 238h18l-8 -12h-10z"/>` + wheel(180, 248, 22) + wheel(290, 248, 22) + wheel(352, 252, 16) +
      txt(250, 80, "head", 24, "ink", `style="paint-order:stroke;stroke:var(--paper);stroke-width:5"`) + DL("M250 90v14", 3)) +
    puff(166, 90, 0, 11) + puff(166, 90, 0.9, 9) + puff(166, 90, 1.7, 10));
  const rails = DL("M-120 268H1720", 4) + `<g class="dt">${Array.from({ length: 34 }, (_, i) => `<rect class="k br" x="${-100 + i * 54}" y="268" width="22" height="9" rx="2"/>`).join("")}</g>`;
  const stopper = g("vg-ll-null", "", `<g class="dt"><rect class="k cr" x="1478" y="170" width="86" height="40" rx="9"/>` + txt(1521, 198, "null", 26) +
    `<path class="kt" d="M1521 210v58"/><rect class="k t" x="1510" y="236" width="22" height="32" rx="3"/></g>`);
  const waver = person({ id: "vg-ll-waver", x: 1392, y: 238, s: 0.95, top: "t", pants: "ink", hair: "ink", style: "short", skin: "s1", al: [-14, -40], ar: [26, -100], a: "r",
    held: "", anim: "vi-none" });
  return {
    label: "A little train: each carriage is a node holding a value and a coupler arrow pointing to the next one; the last carriage points to null while a passenger waves.",
    sky: "bl",
    back: cloud(520, 40, 0.8, "vg-ll-cloud1") + cloud(1180, 60, 0.7, "vg-ll-cloud2") + hills("sg", 232),
    mid: `<rect class="pe fo" x="-120" y="252" width="1840" height="70"/>` + HT("M-120 252H1720V320H-120z", "h-f") + DL("M-120 252H1720") + rails + engine + cars.join("") + stopper +
      tree("vg-ll-tree", 60, 252, 0.9),
    front: waver,
  };
}

function sceneStacks() {
  const cols = ["cr", "bl", "pe", "pk", "cr", "yl", "bl", "pe"];
  let plates = "";
  for (let i = 0; i < 8; i++) {
    const y = 244 - i * 15;
    plates += `<path class="k ${cols[i]}" d="M-56 ${y}v7a56 9 0 0 0 112 0v-7z"/><ellipse class="k ${cols[i]}" cx="0" cy="${y}" rx="56" ry="9"/><ellipse class="nf" cx="0" cy="${y}" rx="40" ry="5" style="stroke:var(--ink);stroke-width:1.4;opacity:.5"/>`;
  }
  const top = 244 - 7 * 15;
  const stack = g("vg-st-plates", "", T(310, 0, SR(-70, 244, 140, 8, "br") + dt(plates.split("</ellipse>").join("")) + HT(`M20 ${top} h36v${244 - top}h-36z`, "h-f") ));
  // wobbling top plate lives in its own group
  const topPlate = g("vg-st-top", "", T(310, 0, pv("vi-wob", 0, top + 8, `<path class="k pk" d="M-56 ${top - 15}v7a56 9 0 0 0 112 0v-7z"/><ellipse class="k pk" cx="0" cy="${top - 15}" rx="56" ry="9"/>`)));
  const held = `<g transform="translate(0 0)"><path class="k cr" d="M26 -118v4a30 5 0 0 0 60 0v-4z" transform="rotate(-8 56 -116)"/><ellipse class="k cr" cx="56" cy="-118" rx="30" ry="5" transform="rotate(-8 56 -116)"/></g>`;
  const cafe = g("vg-st-cafe", "",
    SR(1140, 98, 330, 154, "pk") + HT("M1370 98h100v154h-100z", "h-f") + S("M1130 98H1480l-14 -30H1144z", "m") +
    dt([0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<path class="k ${i % 2 ? "cr" : "t"}" d="M${1140 + i * 41.25} 98v12q20.6 12 41.25 0v-12z"/>`).join("") +
      `<rect class="k cr" x="1230" y="30" width="150" height="30" rx="8"/>` + txt(1305, 52, "CAFÉ", 24) +
      `<rect class="k bl" x="1170" y="132" width="150" height="70" rx="5"/>` + kt("M1245 132v70") +
      `<rect class="k br" x="1160" y="200" width="170" height="14" rx="4"/>` + `<rect class="k cr" x="1186" y="186" width="16" height="14" rx="3"/>` +
      steam(1194, 180, 0) + `<rect class="k t" x="1366" y="150" width="62" height="102" rx="5"/><circle class="ink" cx="1416" cy="204" r="2.5"/>`));
  const queue = [
    ["vg-st-q1", 1050, "pk", "t", "br", "bun", "s2", false],
    ["vg-st-q2", 960, "bl", "ink", "ink", "short", "s3", false],
    ["vg-st-q3", 870, "sg", "br", "t", "curly", "s1", false],
    ["vg-st-q4", 780, "m", "bl", "ink", "long", "s2", false],
  ].map(([id, x, top, pants, hair, style, skin], i) =>
    person({ id, x, s: 1, top, pants, hair, style, skin, a: "r", ar: [18, -46] }));
  return {
    label: "Left, a tall stack of plates with a person adding one to the top (last in, first out). Right, a queue of people outside a café (first in, first out).",
    sky: "pe",
    back: cloud(200, 40, 0.8, "vg-st-cloud1") + cloud(740, 36, 0.7, "vg-st-cloud2") + hills("sg", 232),
    mid: ground() + stack + topPlate +
      g("vg-st-labels", "", dt(`<rect class="k m" x="236" y="26" width="148" height="40" rx="9"/>` + txt(310, 54, "LIFO · TOP", 22) +
        `<path class="k m" d="M310 66l-8 -3h16z"/>` +
        `<rect class="k m" x="810" y="70" width="190" height="40" rx="9"/>` + txt(905, 98, "FIFO queue", 22) +
        `<rect class="k cr" x="741" y="132" width="76" height="26" rx="8"/>` + txt(779, 151, "back", 17) +
        `<rect class="k cr" x="1013" y="132" width="76" height="26" rx="8"/>` + txt(1051, 151, "front", 17))) +
      cafe + g("vg-st-lamp", "", DL("M640 252V86q0 -14 14 -14h14", 5) + dt(`<circle class="k yl" cx="676" cy="76" r="10"/>`)),
    front: person({ id: "vg-st-stacker", x: 214, s: 1.3, top: "bl", pants: "t", hair: "br", style: "bun", skin: "s2", al: [-16, -42], ar: [30, -102], held, a: "l", anim: "vi-none" }) + queue.join(""),
  };
}

function sceneHash() {
  const cells = [];
  const mail = [[0, 1], [1, 3], [2, 0], [2, 6], [3, 2], [3, 5], [0, 7], [1, 6]];
  for (let r = 0; r < 4; r++) for (let c = 0; c < 8; c++) {
    const x = 902 + c * 72, y = 48 + r * 50;
    cells.push(`<rect class="k br" x="${x}" y="${y}" width="68" height="46" rx="3"/><path class="ink" d="M${x + 3} ${y + 3}h62v8h-62z" style="opacity:.35"/>`);
  }
  const letters = mail.map(([r, c], i) => {
    const x = 902 + c * 72 + 12, y = 48 + r * 50 + 18;
    return `<rect class="k cr" x="${x}" y="${y}" width="44" height="26" rx="2"/><path class="kt" d="M${x} ${y}l22 14l22 -14"/><rect class="k ${i % 2 ? "pk" : "m"}" x="${x + 32}" y="${y + 3}" width="8" height="8" rx="1"/>`;
  }).join("");
  const heads = Array.from({ length: 8 }, (_, c) => `<rect class="k cr" x="${916 + c * 72}" y="14" width="40" height="26" rx="7"/>` + txt(936 + c * 72, 34, String(c), 19)).join("");
  const gear = (cx, cy, r, d) => pv(d, cx, cy,
    `<circle class="k ink" cx="${cx}" cy="${cy}" r="${r}" style="stroke-width:${r * 0.5};stroke-dasharray:${r * 0.52} ${r * 0.52};stroke-linecap:butt"/><circle class="k pe" cx="${cx}" cy="${cy}" r="${r * 0.72}"/>` +
    kt(`M${cx - r * 0.6} ${cy}h${r * 1.2}M${cx} ${cy - r * 0.6}v${r * 1.2}`) + `<circle class="ink" cx="${cx}" cy="${cy}" r="3"/>`);
  const machine = g("vg-hash-machine", "",
    SR(470, 150, 220, 100, "m", 10) + HT("M600 150h90v100h-90z", "h-f") + S("M480 150L498 108H562L580 150z", "bl") +
    dt(`<rect class="k cr" x="490" y="170" width="110" height="34" rx="6"/>` + txt(545, 195, "hash()", 21) +
      gear(630, 196, 22, "vi-spin") + gear(656, 228, 13, "vi-spinr") + `<path class="k t" d="M690 214h26v22h-26z"/>` +
      `<path class="k ink" d="M520 100h40v8h-40z"/>`));
  const pipe = g("vg-hash-pipe", "", `<path class="lb" stroke-width="22" d="M714 226H1120"/><path class="lc bl" stroke-width="16" d="M714 226H1120"/>` +
    dt(kt("M760 220h20M840 220h20M920 220h20") + `<path class="k m" d="M1090 212l22 14l-22 14z"/>`));
  const flying = `<g class="vi-letter"><rect class="k cr" x="760" y="214" width="42" height="24" rx="2"/><path class="kt" d="M760 214l21 13l21 -13"/></g>`;
  const wall = g("vg-hash-wall", "", SR(890, 44, 600, 208, "t", 4) + dt(cells.join("") + letters) + dt(heads) + HT("M890 44h600v10h-600z", "h-f"));
  const postman = person({ id: "vg-hash-postman", x: 392, s: 1.18, top: "bl", pants: "ink", hair: "cr", style: "cap", skin: "s1", al: [-18, -40], ar: [34, -98], a: "l", anim: "vi-none",
    behind: `<path class="lb" stroke-width="10" d="M-12 -68L12 -42"/><path class="lc br" stroke-width="5" d="M-12 -68L12 -42"/><rect class="k br" x="-30" y="-58" width="22" height="26" rx="4"/>`,
    held: `<g transform="rotate(-14 38 -104)"><rect class="k cr" x="30" y="-116" width="40" height="26" rx="2"/><path class="kt" d="M30 -116l20 13l20 -13"/></g>` });
  return {
    label: "A postman feeds letters into a hash machine; a pipe delivers each one to its numbered pigeonhole in a big wall of cubbies.",
    sky: "yl",
    back: cloud(260, 44, 0.8, "vg-hash-cloud1") + cloud(780, 24, 0.6, "vg-hash-cloud2") + hills("sg", 236),
    mid: ground() + wall + pipe + machine + flying +
      g("vg-hash-postbox", "", SR(70, 160, 56, 92, "pk", 6) + dt(`<rect class="k ink" x="82" y="176" width="32" height="8" rx="2"/>` + txt(98, 220, "MAIL", 13, "cr")) + SR(60, 148, 76, 18, "pk", 9)),
    front: postman + bird("vg-hash-pigeon", 98, 150, 0.8, "bl"),
  };
}

function sceneTrees() {
  const nodes = [[470, 62, "8"], [398, 118, "5"], [542, 118, "12"], [358, 176, "3"], [438, 176, "6"], [502, 176, "10"], [582, 176, "15"]];
  const edges = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6]];
  const canopy = [[470, 100, 96], [376, 138, 66], [566, 138, 66], [470, 52, 52]];
  const crates = [];
  const vals = [["1"], ["3", "2"], ["8", "5", "4"], ["9", "6", "7", "10"]];
  vals.forEach((row, r) => row.forEach((v, c) => {
    const x = 1200 - (r + 1) * 25 + c * 50, y = 52 + r * 50;
    crates.push(`<rect class="k pe" x="${x}" y="${y}" width="50" height="50" rx="3"/>` + kt(`M${x} ${y}l50 50M${x + 50} ${y}l-50 50`) + `<path class="h-f" d="M${x + 25} ${y}h25v50h-25z"/>` +
      `<circle class="k ${r === 0 ? "m" : "cr"}" cx="${x + 25}" cy="${y + 25}" r="14"/>` + txt(x + 25, y + 31, v, 17));
  }));
  const tr = g("vg-tree-big", "", S("M436 254C446 224 448 204 446 176L494 176C492 204 494 224 504 254z", "br") + HT("M470 176L494 176C492 204 494 224 504 254L470 254z") +
    dt(canopy.map(([a, b, r]) => `<circle class="k gn" cx="${a}" cy="${b}" r="${r}"/>`).join("") + canopy.map(([a, b, r]) => `<circle class="gn" cx="${a}" cy="${b}" r="${r - 1.4}"/>`).join("") +
      `<path class="h-i" d="M376 150a66 66 0 0 0 120 40a90 90 0 0 0 130 -50a90 90 0 0 1 -120 6a70 70 0 0 1 -130 4z"/>` +
      edges.map(([a, b]) => `<path class="lb" stroke-width="12" d="M${nodes[a][0]} ${nodes[a][1]}L${nodes[b][0]} ${nodes[b][1]}"/><path class="lc br" stroke-width="6" d="M${nodes[a][0]} ${nodes[a][1]}L${nodes[b][0]} ${nodes[b][1]}"/>`).join("") +
      nodes.map(([x, y, v]) => `<circle class="k m" cx="${x}" cy="${y}" r="20"/>` + txt(x, y + 7, v, 20)).join("")));
  const heap = g("vg-tree-heap", "", dt(crates.join("")) + SR(1090, 252 - 2, 220, 4, "br") + dt(txt(1200, 34, "min ▾", 20) ));
  const worker = person({ id: "vg-tree-worker", x: 1370, s: 1, top: "m", pants: "bl", hair: "br", style: "cap", skin: "s2", flip: true, al: [-24, -64], ar: [14, -44], a: "r" });
  const picnic = person({ id: "vg-tree-picnic", x: 640, s: 1, top: "pk", pants: "sg", hair: "ink", style: "bun", skin: "s3", ar: [24, -46], a: "l",
    held: `<path class="k br" d="M20 -44h26l-4 20h-18z"/><path class="lb" stroke-width="3" d="M22 -44Q33 -62 44 -44"/>` });
  return {
    label: "A big tree whose branches are the nodes of a binary search tree, with a bird perched on one, beside a pyramid of numbered crates that make a heap with the smallest on top.",
    sky: "sg",
    back: cloud(200, 30, 0.8, "vg-tree-cloud1") + cloud(820, 70, 0.8, "vg-tree-cloud2") + cloud(1450, 40, 0.7, "vg-tree-cloud3") + hills("pkl", 238),
    mid: ground() + tr + heap +
      g("vg-tree-signs", "", sign(760, 150, 80, "BST", 22, 252, "cr") + sign(940, 150, 90, "HEAP", 22, 252, "cr")),
    front: bird("vg-tree-bird", 542, 96, 1, "pk") + picnic + worker,
  };
}

function sceneGraphs() {
  const N = { A: [150, 148, "pe"], B: [400, 84, "pk"], C: [440, 206, "bl"], D: [740, 134, "m"], E: [1010, 70, "sg"], F: [1040, 212, "pk"], G: [1330, 140, "pe"], H: [1500, 224, "bl"] };
  const E = [["A", "B"], ["A", "C"], ["B", "D"], ["C", "D"], ["B", "C"], ["D", "E"], ["D", "F"], ["E", "G"], ["F", "G"], ["G", "H"]];
  const seg = (a, b) => {
    const [x1, y1] = N[a], [x2, y2] = N[b];
    const mx = (x1 + x2) / 2 + (y2 - y1) * 0.08, my = (y1 + y2) / 2 - (x2 - x1) * 0.06;
    return `M${x1} ${y1}Q${mx.toFixed(0)} ${my.toFixed(0)} ${x2} ${y2}`;
  };
  const edges = E.map(([a, b]) => `<path class="ep-o draw" pathLength="1" d="${seg(a, b)}"/>`).join("") +
    E.map(([a, b]) => `<path class="ep-i draw" pathLength="1" d="${seg(a, b)}"/>`).join("");
  const route = ["A", "B", "D", "F", "G"];
  const trail = `<path class="trail vi-dash" d="${route.map((n, i) => (i ? "L" : "M") + N[n][0] + " " + N[n][1]).join("")}" style="opacity:.0"/>`;
  const trailPath = `<path class="trail vi-dash" d="M150 148Q287 71 400 84M400 84Q606 120 740 134M740 134Q886 190 1040 212M1040 212Q1170 190 1330 140"/>`;
  const houses = Object.entries(N).map(([n, [x, y, c]]) =>
    g(`vg-gr-house-${n}`, "", dt(
      `<ellipse class="fp" cx="${x}" cy="${y + 26}" rx="34" ry="6"/>` +
      `<rect class="k ${c}" x="${x - 26}" y="${y - 14}" width="52" height="38" rx="3"/><path class="k t" d="M${x - 32} ${y - 14}L${x} ${y - 42}L${x + 32} ${y - 14}z"/>` +
      HT(`M${x + 10} ${y - 14}h16v38h-16z`, "h-f") + `<rect class="k bl" x="${x - 18}" y="${y - 4}" width="14" height="14" rx="2"/><rect class="k m" x="${x + 2}" y="${y + 4}" width="12" height="20" rx="2"/>` +
      `<circle class="k cr" cx="${x}" cy="${y - 54}" r="14"/>` + txt(x, y - 48, n, 19))));
  const trees = [[270, 230], [640, 60], [880, 230], [1200, 60], [1230, 238], [60, 236], [560, 228]].map(([x, y], i) => tree(`vg-gr-tree${i}`, x, y, 0.55)).join("");
  const walker = person({ id: "vg-gr-walker", x: 892, y: 196, s: 0.85, top: "t", pants: "bl", hair: "ink", style: "cap", skin: "s2", walk: 8, ar: [16, -50], a: "l",
    behind: `<rect class="k br" x="-23" y="-68" width="14" height="26" rx="4"/>` });
  return {
    label: "A little town map: houses are the nodes, footpaths are the edges, and a walker follows a route from house to house along a dotted trail.",
    sky: "sg",
    back: `<path class="h-f" d="M-120 30H1720V320H-120z" style="opacity:.5"/><ellipse class="k bl" cx="760" cy="266" rx="130" ry="26"/><path class="h-w" d="M690 262q70 -12 140 4" style="opacity:.8"/>`,
    mid: edges + `<g class="dt">${trees}</g>` + trailPath + houses.join("") +
      g("vg-gr-flags", "", dt(DL("M96 150V104", 3) + `<path class="k pk" d="M96 104l30 8l-30 8z"/>` + txt(80, 96, "start", 16, "ink") +
        DL("M1388 142V96", 3) + `<path class="k m" d="M1388 96l30 8l-30 8z"/>` + txt(1388, 86, "goal", 16, "ink"))),
    front: walker,
  };
}

function sceneSorting() {
  const sc = [0.64, 0.74, 0.92, 0.82, 1.02, 1.12];
  const tops = ["pk", "bl", "sg", "m", "t", "cr"], pants = ["ink", "br", "bl", "ink", "sg", "br"], hairs = ["br", "ink", "t", "ink", "br", "ink"], styles = ["short", "bun", "cap", "curly", "short", "long"], skins = ["s2", "s1", "s3", "s1", "s2", "s3"];
  const kids = sc.map((s, i) => person({ id: `vg-sort-kid${i}`, x: 214 + i * 80, s, top: tops[i], pants: pants[i], hair: hairs[i], style: styles[i], skin: skins[i], a: "l",
    ar: i === 2 || i === 3 ? [i === 2 ? 20 : -20, -78] : [14, -42], al: i === 2 || i === 3 ? [i === 2 ? 18 : -18, -78] : [-14, -42] })).join("");
  const teacher = person({ id: "vg-sort-teacher", x: 86, s: 1.2, top: "t", pants: "ink", hair: "cr", style: "bun", skin: "s1", al: [-16, -40], ar: [30, -58], a: "l",
    held: `<rect class="k cr" x="-34" y="-62" width="24" height="32" rx="3"/><path class="kt" d="M-30 -52h16M-30 -44h16M-30 -36h10"/>` });
  const swap = `<g class="dt"><path class="k nf" d="M${214 + 2 * 80 - 6} 138Q${214 + 2.5 * 80} 94 ${214 + 3 * 80 + 6} 138" style="stroke-width:4"/>` +
    `<path class="k ink" d="M${214 + 2 * 80 + 8} 132l-12 8l-4 -12zM${214 + 3 * 80 - 8} 132l12 8l4 -12z"/>` + txt(214 + 2.5 * 80, 92, "swap!", 20) + `</g>`;
  const boxes = [];
  const nums = [1, 3, 5, 7, 9, 11, 13, 15];
  nums.forEach((n, i) => {
    const x = 836 + i * 82, hit = i === 5;
    boxes.push(`<rect class="k ${hit ? "m" : "cr"}" x="${x}" y="164" width="72" height="72" rx="8"/>` + txt(x + 36, 211, String(n), 28));
    if (i < 4) boxes.push(`<rect class="h-i" x="${x + 2}" y="166" width="68" height="68" rx="7" style="opacity:.55"/><path class="kt" d="M${x + 12} ${176}l48 48M${x + 60} 176l-48 48" style="opacity:.55"/>`);
  });
  const br = (x1, x2, y, label) => `<path class="k nf" d="M${x1} ${y + 10}V${y}H${x2}V${y + 10}" style="stroke-width:3.4"/>` + txt(x1 - 22, y + 8, label, 19);
  const search = g("vg-sort-search", "", dt(boxes.join("")) +
    dt(br(836, 836 + 8 * 82 - 10, 140, "n") + br(836 + 4 * 82, 836 + 8 * 82 - 10, 112, "n/2") + br(836 + 4 * 82, 836 + 6 * 82 - 10, 84, "n/4") + txt(836 + 5 * 82 - 5, 66, "11 found!", 20)));
  const finder = person({ id: "vg-sort-finder", x: 762, s: 1.1, top: "bl", pants: "t", hair: "br", style: "beret", skin: "s2", al: [-18, -40], ar: [32, -64], a: "r",
    held: `<circle class="k wh" cx="46" cy="-72" r="13" style="opacity:.7"/><path class="lb" stroke-width="6" d="M36 -62L28 -54"/><path class="lc br" stroke-width="3" d="M36 -62L28 -54"/>` });
  return {
    label: "Left, children lined up by height with a teacher watching two neighbours swap places (bubble sort). Right, a row of sorted numbered boxes where each look throws half away and a person finds 11 (binary search).",
    sky: "pe",
    back: cloud(300, 30, 0.8, "vg-sort-cloud1") + cloud(1500, 30, 0.6, "vg-sort-cloud2") + hills("sg", 234),
    mid: ground() + search + swap + g("vg-sort-bench", "", `<g class="dt"><rect class="k br" x="640" y="236" width="80" height="9" rx="3"/><path class="kt" d="M648 245v9M712 245v9"/></g>`) + sign(700, 44, 130, "O(log n)", 24, 236, "m"),
    front: kids + teacher + finder,
  };
}

function sceneRecursion() {
  const W_ = [520, 380, 270, 190, 130], H_ = [216, 170, 130, 98, 66], wc = ["pe", "pk", "sg", "bl", "yl"];
  const labels = ["f(4)", "f(3)", "f(2)", "f(1)", "base"], ls = [22, 20, 18, 15, 14];
  let rooms = "";
  W_.forEach((w, i) => {
    const x = 700 - w / 2, y = 252 - H_[i];
    rooms += SR(x, y, w, H_[i], wc[i], 4) + HT(`M${x} ${y}h${w}v10h-${w}z`, "h-f") + dt(`<rect class="br" x="${x + 2}" y="244" width="${w - 4}" height="8"/>` + txt(700, i === 4 ? y + 22 : y + [46, 40, 32, 32][i] - 8, labels[i], ls[i]));
  });
  const ppl = [[475, 1, "bl", "t", "br", "bun", "s2", 1], [862, 0.78, "pk", "ink", "ink", "short", "s3", 0], [585, 0.6, "m", "bl", "t", "curly", "s1", 1],
    [780, 0.46, "sg", "br", "ink", "cap", "s2", 0], [700, 0.34, "t", "ink", "br", "short", "s1", 1]]
    .map(([x, s, top, pn, hr, st, sk, f], i) => person({ id: `vg-rec-p${i}`, x, y: 250, s, top, pants: pn, hair: hr, style: st, skin: sk, flip: !f, a: i % 2 ? "r" : "l", ar: [18, -52], anim: "vi-none" })).join("");
  const board = g("vg-rec-board", "", SR(70, 56, 300, 84, "br", 6) + dt(`<rect class="ink" x="80" y="66" width="280" height="64" rx="3"/>` + txt(220, 94, "f(n) = f(n-1)", 22, "cr") + txt(220, 120, "+ f(n-2)", 22, "cr") + DL("M120 140L100 252M320 140L340 252", 5)));
  const teacher = person({ id: "vg-rec-teacher", x: 420, s: 1.05, top: "t", pants: "bl", hair: "cr", style: "bun", skin: "s1", flip: true, al: [-26, -78], ar: [14, -42], a: "l",
    held: `<path class="lb" stroke-width="5" d="M-26 -78L-50 -92"/><path class="lc cr" stroke-width="2" d="M-26 -78L-50 -92"/>` });
  const book = g("vg-rec-memo", "",
    SR(1110, 208, 360, 14, "br", 4) + DL("M1130 222V252M1450 222V252", 5) +
    S("M1130 96Q1210 82 1290 102Q1370 82 1450 96V204Q1370 188 1290 208Q1210 188 1130 204z", "cr") +
    dt(`<path class="k nf" d="M1290 102V208"/>` + HT("M1290 104Q1370 84 1450 98V130Q1370 116 1290 134z", "h-f") +
      txt(1210, 128, "memo", 24, "ink", `font-style="italic"`) + txt(1210, 158, "f(2)=1", 20) + txt(1210, 184, "f(3)=2", 20) + txt(1370, 150, "f(4)=3", 20) +
      `<path class="k m" d="M1396 80l40 40l-8 8l-40 -40z"/><path class="k pk" d="M1436 120l8 -8l-4 -10l-10 6z"/>` + kt("M1180 134h60M1180 164h60M1180 190h60M1340 156h60M1340 182h60")));
  const bookie = person({ id: "vg-rec-bookie", x: 1530, s: 1, top: "sg", pants: "br", hair: "ink", style: "curly", skin: "s3", flip: true, al: [-26, -62], ar: [14, -44], a: "r" });
  return {
    label: "Rooms within rooms, each smaller than the last with a person inside, calling f(4), f(3), f(2), f(1) down to the base case; beside it a notebook labelled memo remembering each answer, and a blackboard with the Fibonacci rule.",
    sky: "bl",
    back: cloud(110, 28, 0.7, "vg-rec-cloud1") + cloud(1240, 28, 0.7, "vg-rec-cloud2") + hills("sg", 238),
    mid: ground() + board + rooms + book,
    front: teacher + ppl + bookie,
  };
}

const SCENES = {
  quick: sceneQuick, bigo: sceneBigO, arrays: sceneArrays, linked: sceneLinked, stacks: sceneStacks,
  hash: sceneHash, trees: sceneTrees, graphs: sceneGraphs, sorting: sceneSorting, recursion: sceneRecursion,
};

export const VIGNETTE_KEYS = Object.keys(SCENES);

/** section title -> banner key (matches by words, not position, so reordering notes is safe) */
export function vignetteKeyForTitle(title) {
  const t = String(title || "").toLowerCase();
  const rules = [["quick", /quick/], ["bigo", /big-?o|complexity/], ["arrays", /array/], ["linked", /linked/], ["stacks", /stack|queue/],
    ["hash", /hash/], ["trees", /tree|heap/], ["graphs", /graph/], ["sorting", /sort|search/], ["recursion", /recurs|dynamic/]];
  const hit = rules.find(([, re]) => re.test(t));
  return hit ? hit[0] : null;
}

export function vignetteFor(key) {
  const f = SCENES[key];
  if (!f) return "";
  uid = 0;
  const s = f();
  return `<svg class="art-layer vg" data-scene="${key}" viewBox="0 0 1600 300" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${s.label.replace(/"/g, "&quot;")}" focusable="false" xmlns="http://www.w3.org/2000/svg">` +
    defs() + `<g class="vg-sky">${sky(s.sky)}</g>` +
    `<g class="vl vl-b">${s.back}</g><g class="vl vl-m">${s.mid}</g><g class="vl vl-f">${s.front}</g></svg>`;
}
