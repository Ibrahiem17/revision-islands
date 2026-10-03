/**
 * DSA hero illustration — a semi-isometric "cutaway building" in a riso / screen-print style.
 *
 * `heroArtMarkup()` returns four stacked, identically-sized inline SVGs (same viewBox):
 *   back   sky, sun, clouds, hills, big tree + bird          (parallax depth 1)
 *   shell  ground, walls, roofs — STATIC, inked-wobble filter (parallax depth 2)
 *   rooms  every room / vignette that animates               (parallax depth 2)
 *   front  café people, walker, scooter kid, cyclist, plants (parallax depth 3)
 * Splitting into layers keeps parallax compositor-only (each <svg> is an HTML box that gets
 * translated) and keeps the filtered shell from being re-rasterised by the idle loops.
 *
 * Conventions
 *  - Colours come from CSS classes (palette tokens live at the top of topics/dsa.css), never
 *    from attributes, so one palette drives page + picture. `k` = the ONE ink outline weight.
 *  - Every character / object is its own <g id="...">. Groups that GSAP slides in on load carry
 *    class `asm` (+ data-a order); the idle motion lives on an INNER group (class `i-*`) so the
 *    two never fight over `transform`.
 *  - With every animation off the markup is a complete, correct static picture.
 *  - Halftone shading = the reusable <pattern>s in `defs()` (`h-i` ink dots, `h-f` fine dots,
 *    `h-t` terracotta dots, `h-w` cream dots, `h-l` big sparse dots).
 */

const W = 1000;
const H = 700;

// ---------------------------------------------------------------- tiny drawing helpers
const k = (d, c = "", x = "") => `<path class="k ${c}" d="${d}" ${x}/>`;
const kt = (d, c = "nf", x = "") => `<path class="kt ${c}" d="${d}" ${x}/>`;
const rect = (x, y, w, h, c = "", r = 0, extra = "") =>
  `<rect class="k ${c}" x="${x}" y="${y}" width="${w}" height="${h}"${r ? ` rx="${r}"` : ""} ${extra}/>`;
const dots = (d, c = "h-i") => `<path class="${c}" d="${d}"/>`;
const circ = (cx, cy, r, c = "", x = "") => `<circle class="k ${c}" cx="${cx}" cy="${cy}" r="${r}" ${x}/>`;
const ell = (cx, cy, rx, ry, c = "", x = "") => `<ellipse class="k ${c}" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" ${x}/>`;
const g = (id, cls, inner, attrs = "") => `<g${id ? ` id="${id}"` : ""}${cls ? ` class="${cls}"` : ""} ${attrs}>${inner}</g>`;
const T = (x, y, inner) => `<g transform="translate(${x} ${y})">${inner}</g>`;
const flipX = (cx, inner) => `<g transform="translate(${cx} 0) scale(-1 1) translate(${-cx} 0)">${inner}</g>`;
/** an outlined "tube" limb: ink stroke underneath, colour stroke on top */
const limb = (d, c, w = 5) =>
  `<path class="lb" stroke-width="${w + 6.4}" d="${d}"/><path class="lc ${c}" stroke-width="${w}" d="${d}"/>`;
const shoe = (x, y, rx = 8) => `<ellipse class="k ink" cx="${x}" cy="${y}" rx="${rx}" ry="4"/>`;
const steam = (x, y, delay = 0) =>
  `<path class="kt nf steam i-steam" style="animation-delay:${delay}s" d="M${x} ${y} q-4 -6 0 -11 q4 -5 0 -11"/>`;
const note = (x, y, delay = 0) =>
  `<g class="i-note" style="animation-delay:${delay}s"><ellipse class="ink" cx="${x}" cy="${y}" rx="5.4" ry="3.8" transform="rotate(-20 ${x} ${y})"/><path class="kt nf" d="M${x + 4.6} ${y - 1.5}v-17q6 2 7 9"/></g>`;

/** minimal friendly face: dot eyes + short-line smile. style = short|bun|long|curly|cap|beret|bald */
function head(cx, cy, skin, hair, style = "short", face = true) {
  const hr = `M${cx - 11} ${cy - 1}a11 11 0 0 1 22 0q-5 -5 -11 -3q-6 -2 -11 3z`;
  let h = "";
  switch (style) {
    case "short": h = k(hr, hair); break;
    case "bun": h = k(hr, hair) + circ(cx - 3, cy - 14, 5.5, hair); break;
    case "long":
      h = k(`M${cx - 12} ${cy + 12}v-14a12 12 0 0 1 24 0v14q-4 3 -6 -1v-10q-6 -4 -12 -3v13q-2 3 -6 1z`, hair); break;
    case "curly":
      h = [[-9, -6], [-3, -11], [4, -10], [10, -5], [-11, 1]].map(([a, b]) => circ(cx + a, cy + b, 5.4, hair)).join(""); break;
    case "cap":
      h = k(`M${cx - 11.5} ${cy - 2}a11.5 11 0 0 1 23 0z`, hair) + k(`M${cx + 8} ${cy - 3}h10q2 0 1 3h-12z`, hair); break;
    case "beret": h = k(`M${cx - 12} ${cy - 4}q2 -13 14 -12q10 1 11 11q-12 -5 -25 1z`, hair); break;
    default: break;
  }
  const eyes = face
    ? `<circle class="ink" cx="${cx + 1.5}" cy="${cy + 1.5}" r="1.7"/><circle class="ink" cx="${cx + 8}" cy="${cy + 1.5}" r="1.7"/>` +
      kt(`M${cx + 3} ${cy + 6.5}q3 2.6 6 0`)
    : "";
  return `<circle class="k ${skin}" cx="${cx}" cy="${cy}" r="11"/>${h}${eyes}`;
}

/** a cutaway room: back wall + halftone shade + floor, clipped content, thick frame on top */
function room(id, x, y, w, h, inner, { wall = "bl", floor = "t", fh = 14, a = 1, cls = "" } = {}) {
  const cid = `dsa-clip-${id}`;
  return g(id, `asm room ${cls}`.trim(),
    T(x, y,
      `<clipPath id="${cid}"><rect width="${w}" height="${h}"/></clipPath>` +
      `<g clip-path="url(#${cid})">` +
        `<rect class="${wall}" width="${w}" height="${h}"/>` +
        dots(`M0 0h${w}v${Math.round(h * 0.22)}h-${w}z`, "h-f") +
        `<rect class="${floor}" y="${h - fh}" width="${w}" height="${fh}"/>` +
        dots(`M0 ${h - fh}h${w}v${fh}h-${w}z`, "h-i") +
        inner +
      `</g>` +
      `<rect class="k nf" width="${w}" height="${h}"/>` +
      `<path class="k nf" d="M0 ${h - fh}H${w}"/>`
    ),
    `data-a="${a}"`);
}

// ---------------------------------------------------------------- shared <defs>
export function defs() {
  return `<defs>
    <pattern id="dsa-ht-ink" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(28)">
      <circle class="hp-ink" cx="3" cy="3" r="1.35"/></pattern>
    <pattern id="dsa-ht-fine" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(28)">
      <circle class="hp-ink" cx="2" cy="2" r=".85"/></pattern>
    <pattern id="dsa-ht-terra" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(28)">
      <circle class="hp-terra" cx="2.5" cy="2.5" r="1.25"/></pattern>
    <pattern id="dsa-ht-cream" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(28)">
      <circle class="hp-cream" cx="2.5" cy="2.5" r="1.2"/></pattern>
    <pattern id="dsa-ht-big" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(28)">
      <circle class="hp-ink" cx="5" cy="5" r="2.3"/></pattern>
    <pattern id="dsa-siding" width="22" height="20" patternUnits="userSpaceOnUse">
      <path class="siding-line" d="M2 0V20"/></pattern>
    <filter id="dsa-wob" x="-2%" y="-2%" width="104%" height="104%">
      <feTurbulence type="fractalNoise" baseFrequency="0.028" numOctaves="2" seed="7" result="n"/>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="3.2" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
  </defs>`;
}

const svgOpen = (cls, label = "") =>
  `<svg class="art-layer ${cls}" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMax meet" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">`;

// ---------------------------------------------------------------- BACK layer
function backLayer() {
  const canopy = [[815, 262, 58], [878, 214, 66], [942, 258, 54], [868, 300, 60], [925, 308, 46], [832, 322, 42]];
  const tree =
    k("M846 612C852 520 846 430 838 350L884 350C878 430 888 520 896 612z", "t") +
    dots("M838 350L858 350C856 430 862 520 868 612L846 612C852 520 846 430 838 350z", "h-i") +
    canopy.map(([x, y, r]) => `<circle class="k gn" cx="${x}" cy="${y}" r="${r}"/>`).join("") +
    canopy.map(([x, y, r]) => `<circle class="gn" cx="${x}" cy="${y}" r="${r - 1.2}"/>`).join("") +
    `<path class="h-i" d="M800 300a52 52 0 0 0 52 52a50 50 0 0 0 54 -30a60 60 0 0 1 -60 -10a56 56 0 0 1 -46 -12z"/>` +
    `<path class="h-f" d="M905 330a46 46 0 0 0 44 -30a40 40 0 0 1 -44 30z"/>` +
    kt("M826 236q8 -10 17 -2M880 175q8 -9 17 -1M935 218q8 -8 16 -1M858 285q8 -9 18 -1M910 270q7 -8 15 0") +
    // the bird: body + two flapping wings + tail, with music notes drifting up
    g("bird", "asm", T(0, 0,
      `<g class="i-wing-b">` + k("M879 248q-8 -26 -30 -28q2 24 20 36z", "pkl") + `</g>` +
      k("M868 254q-18 4 -28 -4q8 12 28 14z", "pk") +
      `<ellipse class="k pk" cx="880" cy="252" rx="17" ry="9.5" transform="rotate(-18 880 252)"/>` +
      circ(894, 243, 7.5, "pk") + `<path class="k m" d="M901 241l9 3l-9 3z"/>` +
      `<circle class="ink" cx="896" cy="242" r="1.5"/>` +
      `<g class="i-wing-f">` + k("M881 250q2 -28 24 -36q4 24 -14 40z", "pkl") + `</g>` +
      note(838, 205, 0) + note(852, 190, 0.9)
    ), `data-a="3"`);
  const cloud = (x, y, s, id, a) =>
    g(id, "asm", T(x, y, `<g transform="scale(${s})"><g class="i-cloud">` +
      k("M10 44a17 17 0 0 1 4 -33a24 24 0 0 1 44 -7a20 20 0 0 1 34 12a16 16 0 0 1 6 28z", "cr") +
      dots("M10 44a17 17 0 0 1 -2 -10c20 12 70 12 96 4a16 16 0 0 1 -6 6z", "h-i") + `</g></g>`), `data-a="1"`);
  return svgOpen("l-back") + defs() +
    g("sun", "asm", circ(868, 92, 46, "yl") + `<circle class="h-t" cx="868" cy="92" r="45"/>` +
      kt("M868 24v-14M868 160v14M800 92h-14M936 92h14M820 44l-10 -10M916 140l10 10M916 44l10 -10M820 140l-10 10"), `data-a="1"`) +
    cloud(110, 84, 1.15, "cloud-1", 1) + cloud(430, 38, 0.8, "cloud-2", 1) +
    g("far-birds", "asm", kt("M560 120q8 -9 16 0q8 -9 16 0") + kt("M600 150q6 -7 12 0q6 -7 12 0") + kt("M70 220q6 -7 12 0q6 -7 12 0"), `data-a="1"`) +
    g("hills", "asm", k("M-10 520Q110 432 250 498T520 484T770 470T1010 506V620H-10z", "bl") +
      dots("M-10 560Q110 480 250 540T520 530T770 518T1010 548V620H-10z", "h-f") +
      k("M-10 560Q140 500 300 548T640 540T1010 556V620H-10z", "sg") +
      dots("M-10 585Q140 530 300 575T640 568T1010 584V620H-10z", "h-i"), `data-a="1"`) +
    g("tree", "asm", tree, `data-a="2"`) +
    `</svg>`;
}

// ---------------------------------------------------------------- SHELL layer (static, wobble filter)
function shellLayer() {
  const ground =
    k("M-10 592H1010V710H-10z", "sg") +
    // grass texture on the lawn side
    dots("M560 600H1010V710H640z", "h-i") +
    `<path class="grass" d="M690 640l4 -9l4 9M740 690l4 -9l4 9M900 640l4 -9l4 9M950 690l4 -9l4 9M810 700l4 -9l4 9M620 668l4 -8l4 8"/>` +
    // pale path
    k("M-10 600H585L690 710H-10z", "cr") +
    dots("M-10 600H585L596 612H-10z", "h-i") +
    dots("M-10 690H660L690 710H-10z", "h-f") +
    // footprints from the front door
    [["446 604", "-14"], ["462 618", "-24"], ["478 632", "-30"], ["440 622", "-18"], ["456 640", "-28"], ["474 656", "-38"]]
      .map(([p]) => { const [x, y] = p.split(" "); return `<ellipse class="fp" cx="${x}" cy="${y}" rx="4.2" ry="6.4" transform="rotate(-28 ${x} ${y})"/>`; }).join("");

  const walls =
    // side wing (oblique)
    k("M760 175L852 150V562L760 592z", "m") +
    `<path class="siding" d="M760 175L852 150V562L760 592z"/>` +
    dots("M810 160L852 150V562L810 577z", "h-i") +
    // main facade
    k("M190 175H760V592H190z", "pe") +
    `<rect class="siding" x="190" y="175" width="570" height="417"/>` +
    // floor slab between storeys
    k("M190 355H760V397H190z", "m") + dots("M190 383H760V397H190z", "h-t") +
    k("M190 575H760V592H190z", "t");

  const roof =
    k("M740 110L828 90L874 152L782 177z", "t") + dots("M770 114L828 90L874 152L836 162z", "h-i") +
    k("M168 178L214 110H740L784 178z", "t") +
    dots("M180 160L192 140q160 14 330 4t255 14l7 20z", "h-t") +
    dots("M168 178L184 152H770L784 178z", "h-i") +
    // chimney
    k("M652 112V62h30v52z", "t") + dots("M652 62h30v14h-30z", "h-w") +
    `<path class="k t" d="M646 62h42v10h-42z"/>`;

  return svgOpen("l-shell") +
    `<g filter="url(#dsa-wob)" class="wobble">` +
    g("ground", "asm", ground, `data-a="1"`) +
    g("walls", "asm", walls, `data-a="2"`) +
    g("roof", "asm", roof, `data-a="6"`) +
    `</g></svg>`;
}

// ---------------------------------------------------------------- ROOMS layer
function paintingRoom() {
  const easel =
    kt("M96 100L84 140M144 100L156 140M120 104V140") +
    rect(94, 36, 52, 66, "cr") + `<rect class="k nf" x="94" y="36" width="52" height="66"/>` +
    `<circle class="m" cx="122" cy="56" r="8"/><path class="gn" d="M95 100V82q14 -12 26 -2t24 -6V100z"/><path class="k nf" d="M94 100V82q14 -12 26 -2t26 -6"/>` +
    dots("M95 100V90q12 -4 24 2t26 -4V100z", "h-i");
  const painter =
    g("painter", "", limb("M46 96L44 130", "gd", 6) + limb("M57 96L62 130", "gd", 6) + shoe(44, 133) + shoe(64, 133) +
      rect(36, 56, 28, 44, "wh", 9) + dots("M52 56h12v44H52z", "h-f") +
      g("painter-arm", "i-brush", limb("M58 66L80 62L99 50", "wh", 5) + `<path class="k t" d="M98 49l8 -6"/><circle class="m" cx="108" cy="42" r="2.6"/>`) +
      limb("M42 68L34 86L46 90", "wh", 5) + ell(40, 92, 12, 7, "m") + `<circle class="t" cx="36" cy="91" r="2"/><circle class="gn" cx="42" cy="93" r="2"/><circle class="pk" cx="46" cy="90" r="2"/>` +
      head(48, 40, "s2", "t", "beret"));
  const clock = `<circle class="k cr" cx="134" cy="22" r="12"/><path class="kt nf" d="M134 22v-7M134 22l5 3"/>`;
  return room("room-paint", 215, 200, 170, 150, easel + painter + clock);
}

function laptopRoom() {
  const desk =
    rect(66, 96, 108, 8, "m") + rect(150, 104, 7, 36, "t") + rect(78, 104, 7, 36, "t") +
    // laptop
    rect(98, 90, 40, 6, "ink") + `<rect class="k ink" x="102" y="60" width="32" height="30" rx="3"/>` +
    kt("M107 68h20M107 74h14M107 80h18", "nf cr") + `<path class="pk" d="M123 80h8v6h-8z"/>` +
    // mug + steam
    rect(80, 82, 12, 14, "cr", 2) + `<path class="kt nf" d="M92 85q6 0 6 5t-6 4"/>` + steam(86, 78, 0) + steam(90, 76, 0.7);
  const lamp = g("lamp", "", ell(154, 95, 10, 3.5, "pk") + limb("M154 94L146 66L160 48", "pk", 4) + k("M150 40l22 6l-6 14z", "pk") + dots("M160 44l12 2l-3 8z", "h-w") + `<path class="yl" d="M160 60h8l1 3h-10z"/>`);
  const person =
    g("coder", "", limb("M50 104L76 108L78 138", "ink", 6) + shoe(80, 141) +
      rect(24, 72, 8, 54, "t", 2) + rect(22, 106, 46, 7, "t", 2) +
      rect(34, 68, 30, 42, "pk", 9) + dots("M52 68h12v42H52z", "h-f") +
      limb("M58 80L78 90L100 88", "pk", 5) + head(50, 50, "s1", "ink", "short"));
  const frame = rect(116, 16, 34, 26, "cr") + `<path class="m" d="M120 38l10 -12l8 8l6 -6l6 10z"/><rect class="k nf" x="116" y="16" width="34" height="26"/>`;
  return room("room-laptop", 405, 200, 180, 150, desk + lamp + frame + person);
}

function laundryRoom() {
  const railing =
    `<path class="kt nf" d="M12 104V142M30 104V142M48 104V142M66 104V142M84 104V142M102 104V142M120 104V142"/>` +
    rect(-4, 96, 143, 8, "m");
  const person =
    g("laundry-woman", "", limb("M44 112L44 140", "sg", 6) + limb("M54 112L58 140", "sg", 6) +
      rect(30, 66, 28, 48, "sg", 9) + dots("M44 66h14v48H44z", "h-f") +
      limb("M34 74L24 54L32 36", "sg", 5) + limb("M54 74L64 56L72 36", "sg", 5) +
      head(44, 50, "s2", "ink", "bun"));
  const sheet = g("sheet", "i-sheet",
    `<path class="k wh" d="M74 31L128 33Q131 52 124 62Q131 76 126 92L78 88Q72 74 78 62Q70 48 74 31z"/>` +
    dots("M102 32L128 33Q131 52 124 62Q131 76 126 92L102 90z", "h-f") + kt("M86 50q10 4 18 0"));
  const line = `<path class="kt nf" d="M2 28Q60 38 132 30"/>` +
    `<g class="i-sheet2"><path class="k pk" d="M6 29l18 1l-2 12l-5 -3l-4 4l-3 -4l-5 3z"/></g>`;
  return room("room-laundry", 603, 200, 137, 150, line + person.replace("</g>", "</g>") + sheet + railing, { wall: "pe" });
}

function cafeRoom() {
  const shelf =
    rect(14, 28, 70, 6, "t") + rect(22, 16, 10, 12, "cr", 2) + rect(40, 14, 10, 14, "yl", 2) + rect(58, 17, 10, 11, "pk", 2);
  const counter =
    rect(104, 104, 70, 76, "t") + `<path class="siding" d="M104 104h70v76h-70z"/>` + dots("M104 104h70v8h-70z", "h-i") +
    rect(98, 94, 82, 11, "m");
  const plates = g("plates", "",
    [0, 1, 2, 3, 4].map((i) => `<ellipse class="k cr" cx="150" cy="${90 - i * 6}" rx="${16 - i * 0.6}" ry="3.6"/>`).join("") +
    kt("M138 90l2 0M160 66l1 0"));
  const machine = rect(110, 62, 28, 32, "ink", 3) + `<circle class="m" cx="124" cy="74" r="5"/>` + steam(118, 58, 0.3);
  const person = (x, hh, top, skin, hair, style, cup) =>
    limb(`M${x - 5} ${96}L${x - 5} ${146}`, "gd", 6) + limb(`M${x + 6} 96L${x + 6} 146`, "gd", 6) +
    shoe(x - 4, 150, 8) + shoe(x + 7, 150, 8) +
    rect(x - 14, 60 + hh, 28, 42 - hh, top, 9) + dots(`M${x + 2} ${60 + hh}h12v${42 - hh}H${x + 2}z`, "h-f") +
    head(x, 42 + hh, skin, hair, style) +
    (cup ? limb(`M${x + 10} ${72 + hh}L${x + 22} ${82 + hh}`, top, 5) + rect(x + 20, 76 + hh, 9, 9, "cr", 2) + steam(x + 24, 72 + hh, 0.2) : limb(`M${x + 10} ${72 + hh}L${x + 12} ${94}`, top, 5));
  const queue = g("queue", "",
    person(70, 2, "yl", "s1", "br", "short", true) +
    person(44, 8, "gn", "s3", "ink", "curly", false) +
    person(20, 14, "pk", "s2", "t", "bun", false));
  return room("room-cafe", 215, 405, 170, 180, shelf + counter + machine + plates + queue, { wall: "bl" });
}

function catRoom() {
  const window_ =
    // curtain + plant behind the window
    `<path class="k pk" d="M6 10q14 20 8 54l-12 0V10z"/><path class="k pk" d="M130 10q-14 20 -8 54l12 0V10z"/>` +
    dots("M6 10q14 20 8 54l-12 0V10z", "h-w") +
    `<path class="k gn" d="M100 168q-12 -50 6 -86q14 34 -6 86z"/><path class="k gn" d="M112 168q4 -50 28 -70q-2 46 -28 70z"/><rect class="k t" x="94" y="150" width="28" height="30" rx="3"/>` +
    dots("M94 150h14v30H94z", "h-i");
  return room("room-cat", 605, 405, 137, 180, window_, { wall: "bl" });
}

function ledgeCat() {
  // sits on a ledge in front of the cat room
  return g("cat", "asm", `
    ${rect(596, 520, 156, 12, "m")} ${rect(606, 532, 10, 22, "t")} ${rect(730, 532, 10, 22, "t")}
    ${g("cat-tail", "i-tail", k("M696 516q22 0 24 -22q2 -16 -10 -18", "cr", 'fill="none" stroke-width="9"').replace('class="k cr"', 'class="lb"') +
      `<path class="lc cr" stroke-width="3" fill="none" d="M696 516q22 0 24 -22q2 -16 -10 -18"/>`)}
    <ellipse class="k cr" cx="664" cy="508" rx="34" ry="14"/>
    <path class="h-i" d="M650 496q20 -6 40 4q4 12 -10 18q-20 -2 -30 -10z"/>
    <path class="k cr" d="M628 506q-6 -14 6 -22q14 -6 22 4q6 14 -6 22q-14 4 -22 -4z"/>
    <path class="k ink" d="M634 488l-2 -12l10 8z"/><path class="k ink" d="M650 486l6 -10l2 14z"/>
    <path class="kt nf" d="M636 497q3 3 6 0M648 495q3 3 6 0"/><circle class="pk" cx="643" cy="503" r="1.8"/>
    <g class="i-zzz"><path class="kt nf" d="M612 480h8l-8 8h8M626 466h6l-6 6h6"/></g>
  `, 'data-a="9"');
}

function doorDog() {
  const dog = g("dog", "", `
    <g id="dog-body">${ell(440, 553, 22, 32, "wh")}<circle class="ink" cx="430" cy="566" r="3.4"/><circle class="ink" cx="448" cy="574" r="3"/><circle class="ink" cx="436" cy="544" r="3.2"/></g>
    <g id="dog-head" class="dog-head">
      <path class="k pk" d="M438 524q14 6 28 0l0 7q-14 6 -28 0z"/>
      <circle class="k wh" cx="456" cy="510" r="16"/>
      <ellipse class="k wh" cx="472" cy="518" rx="12" ry="8"/><ellipse class="ink" cx="482" cy="514" rx="4.4" ry="3.2"/>
      <path class="k ink" d="M446 497q-18 0 -17 24q2 10 14 2q4 -12 3 -26z"/>
      <circle class="ink" cx="461" cy="506" r="2.1"/>
      <path class="kt nf" d="M468 526q5 3 10 -2"/><path class="k pk" d="M472 527q0 7 4 7q3 0 2 -8z"/>
      <circle class="ink" cx="452" cy="513" r="2.6"/>
    </g>
    ${ell(432, 582, 11, 6, "wh")}${ell(454, 582, 11, 6, "wh")}
  `);
  return g("door", "asm room", `
    ${rect(407, 418, 86, 174, "t")}
    ${rect(416, 428, 68, 164, "ink")}
    <path class="h-w" d="M416 428h68v36h-68z"/>
    ${dog}
    ${rect(399, 584, 102, 12, "m")}
    <circle class="k yl" cx="450" cy="408" r="8"/>
  `, 'data-a="8"');
}

function mailboxes() {
  const boxes = [0, 1, 2, 3, 4].map((i) => {
    const x = 512 + i * 16.4;
    return rect(x, 468, 14, 24, i % 2 ? "m" : "pk") + `<path class="kt nf" d="M${x + 3} 474h8"/>` +
      `<text class="mb-num" x="${x + 7}" y="505" text-anchor="middle">${i}</text>`;
  }).join("");
  return g("mailboxes", "asm", rect(504, 458, 92, 56, "t") + boxes, 'data-a="8"');
}

function awning() {
  const stripes = [];
  const n = 8, x0 = 207, w = 22;
  for (let i = 0; i < n; i++) {
    const x = x0 + i * w;
    stripes.push(`<path class="k ${i % 2 ? "cr" : "m"}" d="M${x} 396h${w}v22a${w / 2} 8 0 0 1 ${-w} 0z"/>`);
  }
  return g("awning", "asm", stripes.join("") + dots("M207 396h176v8H207z", "h-i"), 'data-a="8"');
}

function sideWindow() {
  return g("side-window", "asm", `
    <path class="k bl" d="M772 226L836 212V288L772 302z"/>
    <path class="h-f" d="M772 226L836 212V240L772 254z"/>
    <path class="kt nf" d="M804 219V295"/>
    <path class="k t" d="M768 300L840 286v14l-72 14z"/>
    ${g("side-plant", "i-leaf", `<path class="k gn" d="M792 286q-10 -26 4 -40q10 20 -4 40z"/><path class="k gl" d="M804 286q4 -26 24 -38q0 24 -24 38z"/>`)}
  `, 'data-a="7"');
}

function swing() {
  return g("swing-set", "asm", `
    ${rect(36, 318, 160, 14, "m")} ${rect(38, 332, 14, 262, "m")} ${rect(38, 590, 40, 8, "t")}
    <path class="siding" d="M38 332h14v262H38z"/>
    ${g("swing", "i-swing", `
      <path class="kt nf" d="M84 332V500M156 332V500" stroke-width="2.4"/>
      ${rect(72, 498, 98, 12, "m")}
      <g id="football"><circle class="k wh" cx="120" cy="480" r="19"/>
        <path class="ink" d="M120 470l9 6l-3 11h-12l-3 -11z"/><path class="kt nf" d="M120 470v-8M129 476l8 -4M126 487l6 8M114 487l-6 8M111 476l-8 -4"/>
        <path class="k nf" d="M139 480a19 19 0 0 1 -19 19" opacity=".0"/></g>`)}
    ${rect(166, 292, 56, 26, "t")} <path class="h-i" d="M166 292h28v26h-28z"/>
    ${g("seedlings", "i-leaf", `<path class="k gl" d="M184 292q-6 -16 -22 -16q2 16 22 16z"/><path class="k gn" d="M200 292q6 -16 22 -18q-2 18 -22 18z"/>`)}
  `, 'data-a="4"');
}

function roofItems() {
  const flag =
    g("flagpole", "", rect(296, 24, 7, 88, "m", 3)) +
    g("flag", "i-flag", k("M303 28L392 42L303 62z", "m") + dots("M330 32L392 42L346 54z", "h-t") + `<path class="siding-line" d="M303 44h42"/>`);
  const planter = g("roof-planter", "i-leaf",
    rect(540, 94, 100, 18, "t") + dots("M540 94h50v18h-50z", "h-i") +
    `<path class="k gn" d="M556 94q-8 -22 6 -32q8 16 -6 32z"/><path class="k gl" d="M572 94q2 -26 20 -34q2 20 -20 34z"/><path class="k gn" d="M596 94q8 -22 24 -22q-4 18 -24 22z"/><path class="k gl" d="M612 94q-4 -22 4 -34q10 14 -4 34z"/>`);
  const smoke = [0, 1].map((i) => `<circle class="k cr i-smoke" style="animation-delay:${i * 1.1}s" cx="${670 + i * 4}" cy="52" r="${6 + i}"/>`).join("");
  return g("flag-group", "asm", flag, 'data-a="12"') + g("roof-planter-g", "asm", planter, 'data-a="12"') + g("chimney-smoke", "", smoke);
}

function roomsLayer() {
  return svgOpen("l-rooms") +
    paintingRoom() + laptopRoom() + laundryRoom() + cafeRoom() + catRoom() +
    doorDog() + mailboxes() + sideWindow() + awning() + ledgeCat() + swing() + roofItems() +
    `</svg>`;
}

// ---------------------------------------------------------------- FRONT layer
function table(cx, cy, clsTop = "cr") {
  return g("", "", `${rect(cx - 2.5, cy + 6, 5, 40, "ink")}${ell(cx, cy + 48, 16, 4.5, "ink")}${ell(cx, cy, 34, 9.5, clsTop)}<ellipse class="h-f" cx="${cx}" cy="${cy}" rx="33" ry="8.6"/>`);
}
function chair(x, y, d) {
  return `<path class="k nf" d="M${x} ${y}V${y - 38}M${x} ${y}h${22 * d}M${x} ${y + 2}v34M${x + 22 * d} ${y + 2}v34" stroke-width="3.4"/>`;
}

function sitter(top, skin, hair, style, legc) {
  return chair(204, 638, 1) +
    limb("M222 638L242 640L242 676", legc, 6) + shoe(246, 679) +
    rect(210, 598, 26, 42, top, 9) + dots("M224 598h12v42h-12z", "h-f") +
    limb("M232 612L246 626L252 624", top, 5) + head(222, 580, skin, hair, style);
}
function cafeTable() {
  const cups = rect(250, 626, 9, 9, "cr", 2) + rect(270, 626, 9, 9, "cr", 2) + steam(254, 622, 0.1) + steam(274, 622, 0.9);
  return g("cafe-table", "asm", T(-56, 0,
    sitter("pk", "s1", "t", "long", "bl") + table(264, 636) +
    flipX(264, sitter("t", "s3", "ink", "curly", "gd")) + cups), 'data-a="10"');
}

function reader() {
  return g("reader", "asm", `
    ${chair(352, 664, 1)}
    ${limb("M366 664L388 666L392 690", "gd", 6)}${shoe(396, 693)}
    ${rect(354, 620, 26, 46, "gn", 9)}${dots("M368 620h12v46h-12z", "h-f")}
    ${limb("M372 634L390 628", "gn", 5)}
    ${circle_hair()}
    ${table(420, 664)}
    ${rect(412, 654, 9, 9, "cr", 2)}${steam(416, 650, 0.4)}
    <path class="k wh" d="M376 574L426 570V632L376 636z"/>
    <path class="kt nf" d="M382 586h18M382 594h18M382 602h18M382 610h14M408 584h12M408 592h12" stroke-width="2"/>
    <rect class="h-i" x="406" y="600" width="14" height="22"/>
    <path class="kt nf" d="M401 572V634" stroke-width="2.4"/>
  `, 'data-a="10"');
  function circle_hair() { return head(368, 602, "s2", "ink", "short", false); }
}

function walker() {
  return g("walker", "asm", `
    <g class="i-walk">
    ${limb("M500 628L486 652L476 672", "gn", 6)}${shoe(472, 675, 9)}
    ${limb("M510 628L524 648L538 664", "gn", 6)}${shoe(543, 667, 9)}
    ${limb("M498 598L488 616L486 634", "wh", 5)}
    ${rect(488, 590, 28, 42, "ink", 9)}${dots("M502 590h14v42h-14z", "h-w")}
    ${limb("M516 600L530 614L534 598", "wh", 5)}
    ${head(504, 572, "s1", "mh", "bun")}
    </g>
  `, 'data-a="10"');
}

function scooterKid() {
  const wheel = (x, y, id) =>
    g(id, "", `<g class="i-spin" style="transform-origin:${x}px ${y}px"><circle class="k cr" cx="${x}" cy="${y}" r="9"/><path class="kt nf" d="M${x - 8} ${y}h16M${x} ${y - 8}v16" stroke-width="1.8"/></g>`);
  return g("scooter-kid", "asm", `
    ${wheel(610, 688, "sc-w1")}${wheel(660, 688, "sc-w2")}
    ${rect(608, 676, 54, 7, "pk", 3)}
    <path class="k nf" d="M656 678L666 624" stroke-width="4"/><path class="k ink" d="M660 624h14" stroke-width="5"/>
    ${limb("M634 664L630 678", "bl", 5)}${limb("M640 664L650 676", "bl", 5)}${shoe(628, 681, 6)}${shoe(652, 679, 6)}
    ${rect(624, 636, 20, 30, "t", 7)}
    ${limb("M642 644L656 640L668 628", "t", 4)}
    ${head(636, 622, "s2", "m", "cap")}
  `, 'data-a="10"');
}

function cyclist() {
  const wheel = (x, y, id) =>
    g(id, "", `<g class="i-spin" style="transform-origin:${x}px ${y}px"><circle class="k nf" cx="${x}" cy="${y}" r="27" stroke-width="3.4"/>
      <path class="kt nf" d="M${x - 27} ${y}h54M${x} ${y - 27}v54M${x - 19} ${y - 19}l38 38M${x + 19} ${y - 19}l-38 38" stroke-width="1.6"/><circle class="k t" cx="${x}" cy="${y}" r="4"/></g>`);
  return g("cyclist", "asm", `
    ${wheel(760, 668, "bike-w1")}${wheel(848, 668, "bike-w2")}
    <path class="k nf" d="M760 668L796 636L838 636L848 668M796 636L808 668M838 636L828 622" stroke-width="4"/>
    <path class="k ink" d="M786 628h22" stroke-width="5"/><path class="k ink" d="M826 620h16" stroke-width="5"/>
    ${limb("M806 626L816 650L806 668", "ink", 6)}${shoe(804, 671)}
    ${limb("M800 624L824 600", "bl", 14)}
    ${limb("M822 606L838 622L842 636", "bl", 5)}
    ${head(836, 584, "s3", "m", "cap")}
  `, 'data-a="11"');
}

function plants() {
  const leaf = (rot, c, len = 96) =>
    `<g transform="rotate(${rot})"><path class="k ${c}" d="M0 0C10 ${-len * 0.4} 26 ${-len * 0.8} 52 ${-len}C52 ${-len * 0.55} 36 ${-len * 0.2} 0 0z"/><path class="kt nf" d="M2 -4Q22 ${-len * 0.5} 48 ${-len + 6}" stroke-width="1.6"/></g>`;
  const cluster = (x, y, s, flip, id) =>
    g(id, "asm", `<g transform="translate(${x} ${y}) scale(${flip * s} ${s})"><g class="i-leaf" style="transform-origin:${x}px ${y}px">` +
      leaf(-62, "gd", 84) + leaf(-30, "gn", 108) + leaf(-4, "gl", 116) + leaf(24, "gn", 100) + leaf(52, "gd", 82) + `</g></g>`, 'data-a="11"');
  const can = g("watering-can", "asm", `
    <path class="k yl" d="M904 690h40l4 -34h-48z"/><path class="h-t" d="M926 690h18l4 -34h-22z"/>
    <path class="k yl" d="M904 664L882 640l-6 4l24 30z"/><ellipse class="k yl" cx="924" cy="656" rx="24" ry="4"/>
    <path class="k nf" d="M948 664q18 -2 14 -20q-4 -12 -20 -12" stroke-width="3.4"/>
  `, 'data-a="11"');
  return cluster(26, 696, 1, 1, "plant-left") + cluster(986, 700, 0.95, -1, "plant-right") + can;
}

function frontLayer() {
  return svgOpen("l-front") + walker() + scooterKid() + reader() + cafeTable() + cyclist() + plants() + `</svg>`;
}

// ---------------------------------------------------------------- public API
export function heroArtMarkup() {
  return (
    `<div class="hero-art" id="hero-art" role="img" aria-label="A cozy cutaway building full of everyday scenes: a painter, a person at a laptop, laundry on a balcony, a café queue, a dog in the doorway, a napping cat, a swing, a bird in a tree, a cyclist and a kid on a scooter.">` +
    `<div class="art-stage">` +
    `<div class="art-depth d1">${backLayer()}</div>` +
    `<div class="art-depth d2">${shellLayer()}${roomsLayer()}</div>` +
    `<div class="art-depth d3">${frontLayer()}</div>` +
    `</div></div>`
  );
}

export const ART_VIEWBOX = { w: W, h: H };

// drawing helpers shared with the section banners (dsa-vignettes.js)
export { k, kt, rect, dots, circ, ell, g, T, flipX, limb, shoe, steam, note, head };
