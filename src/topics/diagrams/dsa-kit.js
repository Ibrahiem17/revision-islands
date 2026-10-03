/**
 * Shared drawing + animation helpers for the DSA note diagrams (src/topics/dsa-diagrams.js).
 *
 * Look: Studio-Bruch riso — thick ink outlines (class k), flat palette fills, halftone dots, hard offset
 * shadow. Colours come from the page tokens (topics/dsa.css :root) through src/topics/dsa-diagrams.css.
 *
 * CONTRACT (same as OOP / System Design): every figure is a COMPLETE static picture with animation off.
 * Animation only ever dims / nudges / slides parts that are already drawn in their final place, and is bound
 * under `.note-diagram.is-playing` (render.js adds it on screen + tab visible + motion allowed). Opacity
 * keyframes dip below the real static opacity (1) and come back; they never reveal something that is hidden
 * in the static state, except elements whose static state is deliberately opacity:0 (documented where used).
 */

let cur = [];       // css collected for the figure being built
let uid = 0;
let pid = "";       // pattern-id prefix of the figure being built

const f = (n) => +n.toFixed(1);
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// ------------------------------------------------------------------ animation
/**
 * Wrap `inner` in an animated group. frames: [[pct, {x,y,s,r,o}], ...]; T seconds; opts {d delay, e ease, at:[x,y] origin}.
 * Missing x/y default 0, s 1, r 0, o 1 inside a frame.
 */
export function an(inner, frames, T, opts = {}) {
  const id = "dgx" + ++uid;
  const useT = frames.some(([, v]) => v.x !== undefined || v.y !== undefined || v.s !== undefined || v.r !== undefined);
  const useO = frames.some(([, v]) => v.o !== undefined);
  const kf = frames.map(([p, v]) => {
    const d = [];
    if (useT) d.push(`transform:translate(${v.x ?? 0}px,${v.y ?? 0}px) rotate(${v.r ?? 0}deg) scale(${v.s ?? 1})`);
    if (useO) d.push(`opacity:${v.o ?? 1}`);
    return `${f(p)}%{${d.join(";")}}`;
  }).join("");
  const org = opts.at ? `transform-origin:${opts.at[0]}px ${opts.at[1]}px;` : "";
  cur.push(`@keyframes ${id}{${kf}}.note-diagram.is-playing .${id}{animation:${id} ${T}s ${opts.e || "ease-in-out"} ${opts.d || 0}s infinite;${org}}`);
  return `<g class="${id}"${opts.base ? ` style="${opts.base}"` : ""}>${inner}</g>`;
}

/** hold-and-hop through a list of poses (each {x,y,o,...}); returns frames for an() */
export const stp = (pts, hold = 0.7) => {
  const n = pts.length, L = 100 / n, fr = [];
  pts.forEach((p, i) => { fr.push([i * L, p]); fr.push([i * L + L * hold, p]); });
  fr.push([100, pts[0]]);
  return fr;
};

/** "light up in order": item i of n. Static state is fully lit; animation dims it then lights it at its turn. */
export const seq = (inner, i, n, T, dim = 0.22) => {
  const p = (i / n) * 88 + 2;
  return an(inner, [[0, { o: dim }], [p, { o: dim }], [p + 4, { o: 1 }], [94, { o: 1 }], [100, { o: dim }]], T, { e: "ease-out" });
};

/** gentle breathing pulse (static = scale 1) */
export const pulse = (inner, at, T = 2.2, s = 1.08, d = 0) =>
  an(inner, [[0, { s: 1 }], [50, { s }], [100, { s: 1 }]], T, { at, d });

/** slide to (x,y) and back */
export const slide = (inner, x, y, T = 3, d = 0) =>
  an(inner, [[0, {}], [15, {}], [50, { x, y }], [65, { x, y }], [100, {}]], T, { d });

// ------------------------------------------------------------------ shapes
export const tx = (x, y, s, c = "", a = "middle") =>
  `<text class="${c}" x="${x}" y="${y}" text-anchor="${a}">${esc(s)}</text>`;

/** halftone patch (ink dots / fine dots / terracotta dots) */
export const ht = (x, y, w, h, kind = "i", extra = "") =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#${pid}${kind})" stroke="none" pointer-events="none" ${extra}/>`;

/** outlined box (+ optional centred label). o: {r, t: text class, s: shadow, h: halftone shade} */
export function bx(x, y, w, h, c = "cr", label = "", o = {}) {
  const r = o.r ?? 7;
  let s = "";
  if (o.s) s += `<rect x="${x + 4}" y="${y + 4}" width="${w}" height="${h}" rx="${r}" class="sh"/>`;
  s += `<rect class="k ${c}" x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}"/>`;
  if (o.h) s += ht(x + 2, y + h * 0.62, w - 4, h * 0.38 - 2, "f", `rx="${Math.max(0, r - 2)}"`);
  if (label !== "") s += tx(x + w / 2, y + h / 2 + 5, label, o.t || "");
  return s;
}

/** row of equal boxes. cls: string or (i)=>class. o.idx draws 0..n-1 below. */
export function row(x, y, vals, w, h, cls, o = {}) {
  let s = vals.map((v, i) => bx(x + i * w, y, w, h, typeof cls === "function" ? cls(i) : cls, v, { r: o.r ?? 4, t: o.t, h: o.h })).join("");
  if (o.idx !== undefined) s += vals.map((_, i) => tx(x + i * w + w / 2, y + h + 15, o.idx + i, "s")).join("");
  return s;
}

/** round node with label */
export const nd = (cx, cy, label = "", c = "cr", r = 15, t = "") =>
  `<circle class="k ${c}" cx="${cx}" cy="${cy}" r="${r}"/>${label !== "" ? tx(cx, cy + 5, label, t) : ""}`;

/** plain thick line */
export const ln = (x1, y1, x2, y2, c = "") => `<path class="ln ${c}" d="M${x1} ${y1}L${x2} ${y2}"/>`;

/** arrow x1,y1 -> x2,y2 (tip at x2,y2); b = curve bend (px, + = left of travel) */
export function ar(x1, y1, x2, y2, b = 0, c = "") {
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1;
  const cx = mx - (dy / L) * b, cy = my + (dx / L) * b;
  const tx_ = x2 - cx, ty = y2 - cy, tl = Math.hypot(tx_, ty) || 1, ux = tx_ / tl, uy = ty / tl;
  const hl = 10, hw = 6.5, bx_ = x2 - ux * hl, by_ = y2 - uy * hl;
  const p1 = `${f(bx_ - uy * hw)} ${f(by_ + ux * hw)}`, p2 = `${f(bx_ + uy * hw)} ${f(by_ - ux * hw)}`;
  return `<path class="ln ${c}" d="M${x1} ${y1}${b ? `Q${f(cx)} ${f(cy)} ` : "L"}${f(bx_)} ${f(by_)}"/><path class="hd" d="M${x2} ${y2}L${p1}L${p2}Z"/>`;
}

/** coloured fat curve/line (ink underlay + colour top) */
export const fat = (d, c = "cs-m", w = 5) =>
  `<path class="fl" stroke-width="${w + 4}" d="${d}"/><path class="fc ${c}" stroke-width="${w}" d="${d}"/>`;

/** downward pointer flag above a thing: label above, triangle tip at (x,y) */
export const pin = (x, y, label, c = "t") =>
  `<path class="k ${c}" d="M${x} ${y}l-7 -10h14z"/>${tx(x, y - 15, label, "s")}`;

/** upward pointer under a thing: tip at (x,y), label below */
export const pinUp = (x, y, label, c = "t") =>
  `<path class="k ${c}" d="M${x} ${y}l-7 10h14z"/>${tx(x, y + 25, label, "s")}`;

/** vertical bar growing up from baseline yb */
export const bar = (x, yb, w, h, c = "m") =>
  bx(x, yb - h, w, h, c, "", { r: 3, h: h > 14 });

/** red-ish "no" cross / sage tick (stamp style) */
export const cross = (x, y, s = 7, c = "tc") => `<path class="ln ${c}" d="M${x - s} ${y - s}L${x + s} ${y + s}M${x + s} ${y - s}L${x - s} ${y + s}"/>`;
export const tick = (x, y) => `<path class="ln ts" d="M${x - 7} ${y}l5 6l10 -12"/>`;

// ------------------------------------------------------------------ registry wrapper
/**
 * Register a diagram: builder() returns the inner svg markup (calls an()/seq() to attach animation).
 * Produces one <svg class="dg"> with its own pattern defs (unique ids) + <style> for its keyframes.
 */
export function def(reg, key, w, h, title, desc, build) {
  reg[key] = () => {
    cur = [];
    const n = ++uid;
    pid = `dgp${n}`;
    const inner = build();
    const css = cur.join("");
    const footer = ht(0, h - 9, w, 9, "t");
    return `<svg class="dg" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="dgt${n} dgd${n}" focusable="false" xmlns="http://www.w3.org/2000/svg">` +
      `<title id="dgt${n}">${esc(title)}</title><desc id="dgd${n}">${esc(desc)}</desc>` +
      `<defs><pattern id="${pid}i" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(28)"><circle class="hpi" cx="3" cy="3" r="1.3"/></pattern>` +
      `<pattern id="${pid}f" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(28)"><circle class="hpi" cx="2" cy="2" r=".85"/></pattern>` +
      `<pattern id="${pid}t" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(28)"><circle class="hpt" cx="2.5" cy="2.5" r="1.25"/></pattern></defs>` +
      `${inner}${footer}${css ? `<style>${css}</style>` : ""}</svg>`;
  };
}
