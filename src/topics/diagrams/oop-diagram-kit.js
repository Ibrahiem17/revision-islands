/**
 * Shared drawing + animation helpers for OOP note diagrams (src/topics/oop-diagrams.js and friends).
 *
 * Visual language: thick black ink outlines (class od-k), flat fills using the page's own palette
 * (white/paper, hero green, salmon, mustard — via CSS vars in topics/oop.css, never hard-coded hex
 * here), fully rounded corners, no faces. This mirrors the contract System Design uses
 * (src/topics/system-design-diagrams.js) but in OOP's own visual language and class prefix (od-)
 * so the two pages never collide.
 *
 * Animation rule (the exact bug class fixed in System Design Topic 4): every figure must already be
 * a COMPLETE, CORRECT, fully legible static picture with .is-playing absent. Animation here is only
 * ever a supplementary pulse/nudge/twinkle layered on top of an already-fully-drawn base — never the
 * thing that reveals or completes the picture. Bound only under `.note-diagram.is-playing`, which
 * render.js toggles (on screen + tab visible + motion allowed); `body.rm` / prefers-reduced-motion
 * additionally kills all keyframes via a blanket CSS rule.
 */

const num = (n) => +n.toFixed(2);

/** frames: [[seconds, "css declarations"], ...] sorted by time; T = loop length in seconds */
export function keyframes(name, T, frames) {
  const body = frames.map(([t, css]) => `${num((t / T) * 100)}%{${css}}`).join("");
  return `@keyframes ${name}{${body}}`;
}
export const bind = (sel, name, T, extra = "ease-in-out") =>
  `.note-diagram.is-playing ${sel}{animation:${name} ${T}s ${extra} infinite}`;

export const move = (x, y, s = 1, o = 1) => `transform:translate(${x}px,${y}px) scale(${s});opacity:${o}`;

/** wraps one inner SVG body into the standard <div class="od-panel"><svg>...</svg></div> figure markup */
export function fig(key, w, h, title, desc, inner, extraDefs = "") {
  return `<div class="od-panel"><svg viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="od-${key}-t od-${key}-d" focusable="false" xmlns="http://www.w3.org/2000/svg">
    <title id="od-${key}-t">${title}</title><desc id="od-${key}-d">${desc}</desc>
    ${extraDefs}${inner}</svg></div>`;
}

// ---------- reusable shapes ----------

/** four-point sparkle/star, centered at cx,cy, "radius" r */
export function sparkle(cx, cy, r, cls = "od-yfill") {
  const R = r, r2 = r * 0.34;
  return `<path class="od-k od-t ${cls}" d="M${cx},${cy - R}C${cx + r2},${cy - r2} ${cx + r2},${cy - r2} ${cx + R},${cy}C${cx + r2},${cy + r2} ${cx + r2},${cy + r2} ${cx},${cy + R}C${cx - r2},${cy + r2} ${cx - r2},${cy + r2} ${cx - R},${cy}C${cx - r2},${cy - r2} ${cx - r2},${cy - r2} ${cx},${cy - R}Z"/>`;
}

export const arrowDown = (x, y, cls = "od-k") => `<path class="${cls}" d="M${x - 6},${y - 9}L${x},${y}L${x + 6},${y - 9}"/>`;
export const arrowUp = (x, y, cls = "od-k") => `<path class="${cls}" d="M${x - 6},${y + 9}L${x},${y}L${x + 6},${y + 9}"/>`;
export const arrowRight = (x, y, cls = "od-k") => `<path class="${cls}" d="M${x - 9},${y - 6}L${x},${y}L${x - 9},${y + 6}"/>`;
export const arrowLeft = (x, y, cls = "od-k") => `<path class="${cls}" d="M${x + 9},${y - 6}L${x},${y}L${x + 9},${y + 6}"/>`;

export const TICK = "M-6,0L-2,5L7,-6";
export const CROSS = "M-5,-5L5,5M5,-5L-5,5";

/** rounded box with a label centered inside; returns markup, does not add extra text lines */
export function box(x, y, w, h, cls, r = 8) {
  return `<rect class="od-k ${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}"/>`;
}

/** small round badge with a glyph path inside (used for pillar icons etc.) */
export function badge(cx, cy, r, cls, glyph) {
  return `<g transform="translate(${cx},${cy})"><circle class="od-k ${cls}" r="${r}"/>${glyph}</g>`;
}

/** padlock icon (body + shackle), origin at its own center, ~24 units wide unscaled */
export function padlock(cx, cy, scale = 1, cls = "od-yfill", groupClass = "") {
  return `<g class="${groupClass}" transform="translate(${cx},${cy}) scale(${scale})">
    <path class="od-k" d="M-8,-4V-9C-8,-15 -3,-19 0,-19C3,-19 8,-15 8,-9V-4" fill="none"/>
    <rect class="od-k ${cls}" x="-11" y="-4" width="22" height="19" rx="4"/>
    <circle class="od-ink" cx="0" cy="4" r="2.2"/>
  </g>`;
}

/** open curtain / hood icon: a rounded arch with a dashed "hidden" interior and one visible knob */
export function hood(cx, cy, scale = 1) {
  return `<g transform="translate(${cx},${cy}) scale(${scale})">
    <path class="od-k od-p" d="M-20,10V-4C-20,-16 -11,-24 0,-24C11,-24 20,-16 20,-4V10Z"/>
    <path class="od-k od-t od-dash" d="M-14,7V-4C-14,-13 -7,-19 0,-19C7,-19 14,-13 14,-4V7" fill="none"/>
    <circle class="od-k od-t od-yfill" cx="0" cy="10" r="4.4"/>
  </g>`;
}

/** simple rounded car silhouette, ~90 wide unscaled, origin at its own baseline center */
export function car(cx, cy, scale = 1, cls = "od-greenfill") {
  return `<g transform="translate(${cx},${cy}) scale(${scale})">
    <path class="od-k ${cls}" d="M-45,4C-45,-6 -38,-9 -30,-13L-20,-20C-15,-23 -6,-24 4,-24C14,-24 22,-21 28,-15L38,-9C44,-6 45,-2 45,4V10C45,13 43,15 40,15H-40C-43,15 -45,13 -45,10Z"/>
    <path class="od-k od-t" d="M-24,-13L-18,-19C-15,-21 -8,-22 0,-22C8,-22 15,-20 20,-16L26,-13Z" fill="none"/>
    <circle class="od-k od-inkfill" cx="-24" cy="15" r="8"/>
    <circle class="od-k od-inkfill" cx="24" cy="15" r="8"/>
  </g>`;
}

/** gear/cog, r = outer radius, n = teeth */
export function gear(cx, cy, r, n = 8, cls = "od-p") {
  const inner = r * 0.66, tooth = r * 0.22;
  let d = "";
  for (let i = 0; i < n; i++) {
    const a0 = (i / n) * Math.PI * 2, a1 = a0 + (Math.PI * 2) / n / 2;
    const p = (a, rad) => [cx + rad * Math.cos(a), cy + rad * Math.sin(a)];
    const [x0, y0] = p(a0, r), [x1, y1] = p(a0 + 0.12, r + tooth), [x2, y2] = p(a1 - 0.12, r + tooth), [x3, y3] = p(a1, r);
    d += `M${num(x0)},${num(y0)}L${num(x1)},${num(y1)}L${num(x2)},${num(y2)}L${num(x3)},${num(y3)}`;
  }
  return `<g><circle class="od-k ${cls}" cx="${cx}" cy="${cy}" r="${r + tooth}"/><path class="od-k ${cls}" d="${d}Z"/><circle class="od-k od-p" cx="${cx}" cy="${cy}" r="${inner * 0.5}"/></g>`;
}

export { num };
