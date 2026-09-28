/**
 * System Design note diagrams (retro ink style). Registry: key -> function returning markup.
 * A note opts in with `diagram: "<key>"` in content/system-design/index.js (see content/README.md).
 *
 * Style rules: thick black round-join strokes (class nd-k), flat fills, paper background,
 * mustard (--yellow) as the ONLY accent, no faces. Colours come from the page tokens via CSS
 * (topics/system-design.css `.note-diagram`), so nothing here hard-codes a colour.
 *
 * Animation: pure CSS keyframes, generated below from a tiny timeline. They only run while the
 * figure has `.is-playing` (set by src/shared/render.js when it is on screen, the tab is visible
 * and reduced motion is off). Without that class the diagram is a complete static picture
 * (stamps / ticks / hatching all visible, travelling tickets hidden).
 */

// ---------- keyframe helpers ----------
const num = (n) => +n.toFixed(2);
/** frames: [[seconds, "css declarations"], ...] sorted by time; T = loop length in seconds */
function keyframes(name, T, frames) {
  const body = frames.map(([t, css]) => `${num((t / T) * 100)}%{${css}}`).join("");
  return `@keyframes ${name}{${body}}`;
}
const bind = (sel, name, T) =>
  `.note-diagram.is-playing ${sel}{animation:${name} ${T}s ease-in-out infinite}`;
const move = (x, y, o) => `transform:translate(${x}px,${y}px);opacity:${o}`;

// ---------- shared geometry (both panels are 300 units wide; text is >= 11.5 units) ----------
const CX = [52, 150, 248]; // server column centres
const USER = [48, 100];
const LB = [175, 100];

const arrowDown = (x, y) => `<path class="nd-k" d="M${x - 6},${y - 9}L${x},${y}L${x + 6},${y - 9}"/>`;
const arrowRight = (x, y) => `<path class="nd-k" d="M${x - 9},${y - 6}L${x},${y}L${x - 9},${y + 6}"/>`;
const CROSS = "M-5,-5L5,5M5,-5L-5,5";
const TICK = "M-6,0L-2,5L6,-5";

/** user -> load balancer row + fan-out to three servers (shared by both panels) */
function topRows() {
  return `
    <rect class="nd-k nd-p" x="8" y="84" width="80" height="32" rx="5"/>
    <text class="nd-b" x="48" y="105" text-anchor="middle">User 55</text>
    <path class="nd-k" d="M90,100H116"/>${arrowRight(117, 100)}
    <rect class="nd-k nd-inkfill" x="118" y="84" width="114" height="32" rx="5"/>
    <text class="nd-b nd-onink" x="175" y="105" text-anchor="middle">Load balancer</text>
    ${CX.map((cx) => `<path class="nd-k" d="M175,118C175,134 ${cx},132 ${cx},148"/>${arrowDown(cx, 149)}`).join("")}`;
}

function panel(cls, h, title, desc, inner, extraDefs = "") {
  return `<div class="nd-panel nd-${cls}"><svg viewBox="0 0 300 ${h}" role="img" aria-labelledby="nd-${cls}-t nd-${cls}-d" focusable="false" xmlns="http://www.w3.org/2000/svg">
    <title id="nd-${cls}-t">${title}</title><desc id="nd-${cls}-d">${desc}</desc>
    ${extraDefs}${inner}</svg></div>`;
}

// ---------- panel 1: BROKEN ----------
function brokenPanel() {
  const P = 3, T = 11.4; // 3 passes of 3s + a 2.4s hold so the last stamp is readable
  const arrive = (i) => i * P + 2.2;

  const servers = CX.map((cx, i) => {
    const ok = i === 1;
    return `
    <rect class="nd-k ${ok ? "nd-yfill" : "nd-hatchfill"}" x="${cx - 44}" y="150" width="88" height="62" rx="5"/>
    <rect class="nd-k nd-t2 nd-p" x="${cx - 38}" y="156" width="76" height="50" rx="3"/>
    <text class="nd-b" x="${cx}" y="172" text-anchor="middle">Server ${i + 1}</text>
    <text class="nd-s" x="${cx}" y="186" text-anchor="middle">${ok ? "has session" : "no session"}</text>
    <text class="nd-s" x="${cx}" y="199" text-anchor="middle">for user 55</text>
    <g transform="translate(${cx},234) rotate(${ok ? 2 : -3})"><g class="nd-stamp nd-stamp-${i}">
      <rect class="nd-k nd-t2 ${ok ? "nd-yfill" : "nd-inkfill"}" x="-44" y="-11" width="88" height="22" rx="3"/>
      <path class="nd-mk ${ok ? "" : "nd-mk-paper"}" transform="translate(-33,0) scale(.9)" d="${ok ? TICK : CROSS}"/>
      <text class="nd-st ${ok ? "" : "nd-onink"}" x="10" y="4" text-anchor="middle">${ok ? "WORKS" : "LOGGED OUT"}</text>
    </g></g>`;
  }).join("");

  const inner = `
    <text class="nd-t" x="8" y="18">BROKEN: each server remembers</text>
    <text class="nd-t" x="8" y="35">things on its own</text>
    <rect class="nd-k nd-t2 nd-yfill" x="8" y="41" width="46" height="6"/>
    <text class="nd-s" x="8" y="63">User 55 logged in a minute ago.</text>
    <text class="nd-s" x="8" y="76">Now they load another page.</text>
    ${topRows()}${servers}
    <text class="nd-s nd-cap" x="8" y="272">The load balancer picks a server at random,</text>
    <text class="nd-s nd-cap" x="8" y="287">so 2 out of 3 times the user is thrown out.</text>
    <g class="nd-pk nd-pk-b"><rect class="nd-k nd-t2 nd-yfill" x="-16" y="-10" width="32" height="20" rx="3"/><path class="nd-k nd-t2" d="M-16,-10L0,2L16,-10"/><text class="nd-pkt" x="0" y="8" text-anchor="middle">55</text></g>`;

  const defs = `<defs><pattern id="nd-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="6" height="6" class="nd-hp"/><path d="M0,0V6" class="nd-hl"/></pattern></defs>`;

  // one ticket, three passes: user -> balancer -> server k
  const pk = [[0, move(...USER, 0)]];
  CX.forEach((cx, i) => {
    const b = i * P;
    pk.push(
      [b + 0.05, move(...USER, 0)], [b + 0.3, move(...USER, 1)], [b + 0.7, move(...USER, 1)],
      [b + 1.5, move(...LB, 1)], [b + 1.65, move(...LB, 1)],
      [arrive(i), move(cx, 176, 1)], [b + 2.75, move(cx, 176, 1)], [b + 2.9, move(cx, 176, 0)]
    );
  });
  pk.push([T, move(...USER, 0)]);

  const stampFrames = (i) => [
    [0, "opacity:0;transform:scale(1.9) rotate(-8deg)"],
    [arrive(i) - 0.05, "opacity:0;transform:scale(1.9) rotate(-8deg)"],
    [arrive(i) + 0.12, "opacity:1;transform:scale(.92)"],
    [arrive(i) + 0.3, "opacity:1;transform:scale(1)"],
    [T - 0.5, "opacity:1;transform:scale(1)"],
    [T, "opacity:0;transform:scale(1)"],
  ];

  const css = keyframes("ndBpk", T, pk) + bind(".nd-pk-b", "ndBpk", T) +
    CX.map((_, i) => keyframes(`ndBs${i}`, T, stampFrames(i)) + bind(`.nd-stamp-${i}`, `ndBs${i}`, T)).join("");

  return panel(
    "broken", 300,
    "Broken: each server remembers things on its own",
    "User 55 logged in a minute ago and now loads another page. The load balancer sends the request to a random server. Server 1 has no session for user 55 and logs them out. Server 2 has the session and works. Server 3 has no session and logs them out. Two out of three times the user is thrown out.",
    inner, defs
  ) + `<style>${css}</style>`;
}

// ---------- panel 2: FIXED ----------
function fixedPanel() {
  const P = 4.4, T = 14.8; // 3 passes + 1.6s hold
  const servers = CX.map((cx, i) => `
    <rect class="nd-k nd-p nd-plate nd-plate-${i}" x="${cx - 44}" y="150" width="88" height="62" rx="5"/>
    <text class="nd-b" x="${cx}" y="172" text-anchor="middle">Server ${i + 1}</text>
    <text class="nd-s" x="${cx}" y="186" text-anchor="middle">keeps</text>
    <text class="nd-s" x="${cx}" y="199" text-anchor="middle">nothing</text>
    <g transform="translate(${cx + 38},152)"><circle class="nd-k nd-t2 nd-yfill" r="10"/><path class="nd-mk" transform="scale(.8)" d="${TICK}"/></g>
    <path class="nd-k" d="M${cx},214V253"/>${arrowDown(cx, 262)}`).join("");

  const inner = `
    <text class="nd-t" x="8" y="18">FIXED: servers keep nothing,</text>
    <text class="nd-t" x="8" y="35">one shared store holds it</text>
    <rect class="nd-k nd-t2 nd-yfill" x="8" y="41" width="46" height="6"/>
    <text class="nd-s" x="8" y="63">Sessions move out of server memory into</text>
    <text class="nd-s" x="8" y="76">Redis, which every server can read.</text>
    ${topRows()}${servers}
    <g class="nd-redis"><rect class="nd-k nd-yfill" x="8" y="264" width="284" height="50" rx="5"/>
      <text class="nd-b" x="150" y="285" text-anchor="middle">Redis</text>
      <text class="nd-s" x="150" y="302" text-anchor="middle">session store shared by all</text></g>
    <g transform="translate(150,338)"><g class="nd-found"><rect class="nd-k nd-t2 nd-p" x="-58" y="-12" width="116" height="24" rx="12"/>
      <path class="nd-mk" transform="translate(-47,0) scale(.8)" d="${TICK}"/>
      <text class="nd-st" x="8" y="4" text-anchor="middle">session found</text></g></g>
    <text class="nd-s nd-cap" x="8" y="375">Any server can now serve any request.</text>
    <text class="nd-s nd-cap" x="8" y="390">A server dying costs nothing.</text>
    <g class="nd-pk nd-pk-f"><rect class="nd-k nd-t2 nd-yfill" x="-16" y="-10" width="32" height="20" rx="3"/><path class="nd-k nd-t2" d="M-16,-10L0,2L16,-10"/><text class="nd-pkt" x="0" y="8" text-anchor="middle">55</text></g>
    <g class="nd-rp"><circle class="nd-k nd-t2 nd-inkfill" r="7"/><path class="nd-mk nd-mk-paper" transform="scale(.55)" d="${TICK}"/></g>`;

  const pk = [[0, move(...USER, 0)]];
  const rp = [[0, move(150, 268, 0)]];
  const flash = [[], [], []];
  const redis = [[0, "transform:scale(1)"]];
  const found = [[0, "transform:scale(1)"]];
  CX.forEach((cx, i) => {
    const b = i * P;
    pk.push(
      [b + 0.05, move(...USER, 0)], [b + 0.3, move(...USER, 1)], [b + 0.7, move(...USER, 1)],
      [b + 1.5, move(...LB, 1)], [b + 1.65, move(...LB, 1)],
      [b + 2.4, move(cx, 176, 1)], [b + 2.7, move(cx, 176, 1)],
      [b + 3.4, move(cx, 272, 1)], [b + 3.6, move(cx, 272, 0)]
    );
    rp.push(
      [b + 3.5, move(cx, 272, 0)], [b + 3.65, move(cx, 272, 1)],
      [b + 4.2, move(cx, 224, 1)], [b + 4.35, move(cx, 224, 0)]
    );
    const y = (t, c) => flash[i].push([t, `fill:${c}`]);
    y(b + 2.3, "var(--paper2)"); y(b + 2.5, "var(--yellow)"); y(b + 4.3, "var(--yellow)"); y(b + 4.4, "var(--paper2)");
    redis.push([b + 3.3, "transform:scale(1)"], [b + 3.5, "transform:scale(1.04,1.1)"], [b + 3.8, "transform:scale(1)"]);
    found.push([b + 3.5, "transform:scale(1)"], [b + 3.75, "transform:scale(1.18)"], [b + 4.05, "transform:scale(1)"]);
  });
  pk.push([T, move(...USER, 0)]);
  rp.push([T, move(150, 268, 0)]);
  redis.push([T, "transform:scale(1)"]); found.push([T, "transform:scale(1)"]);

  const css =
    keyframes("ndFpk", T, pk) + bind(".nd-pk-f", "ndFpk", T) +
    keyframes("ndFrp", T, rp) + bind(".nd-rp", "ndFrp", T) +
    keyframes("ndFre", T, redis) + bind(".nd-redis", "ndFre", T) +
    keyframes("ndFfo", T, found) + bind(".nd-found", "ndFfo", T) +
    CX.map((_, i) => {
      const fr = [[0, "fill:var(--paper2)"], ...flash[i], [T, "fill:var(--paper2)"]];
      return keyframes(`ndFpl${i}`, T, fr) + bind(`.nd-plate-${i}`, `ndFpl${i}`, T);
    }).join("");

  return panel(
    "fixed", 396,
    "Fixed: servers keep nothing, one shared store holds it",
    "Sessions move out of server memory into Redis, a session store shared by all servers. Server 1, 2 and 3 each keep nothing and all read from Redis, so any server can serve any request. A server dying costs nothing.",
    inner
  ) + `<style>${css}</style>`;
}

// helpers shared with system-design-diagrams-data.js (Topics 2-3, merged in system-design.js)
export { keyframes, bind, move, arrowDown, arrowRight, TICK, CROSS, panel };

/** Map key -> function returning the figure's inner markup (render.js wraps it in <figure>). */
export default {
  scalingSessions: () => `<div class="nd-panels">${brokenPanel()}${fixedPanel()}</div>`,
};
