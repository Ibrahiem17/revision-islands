/**
 * System Design page: hand-drawn inline SVG art (1930s rubber-hose style, OBJECTS only, no faces).
 * Every drawing is a string; parts carry ids/classes so system-design.css / -fx.js can animate them.
 * Class legend (styled in system-design.css under `.ill`):
 *   .k = thick ink outline   .p = paper fill   .y = mustard fill   .f = solid ink   .t = thin stroke
 * Ids inside repeated drawings are prefixed with the drawing's key so they stay unique per use.
 */

const wrap = (key, vb, inner, extra = "") =>
  `<svg class="ill boil ill-${key}" viewBox="${vb}" aria-hidden="true" focusable="false" ${extra}>${inner}</svg>`;

/** star polygon points (for starbursts) */
function star(cx, cy, ro, ri, n) {
  const pts = [];
  for (let i = 0; i < n * 2; i++) {
    const r = i % 2 ? ri : ro;
    const a = (Math.PI * i) / n - Math.PI / 2;
    pts.push((cx + r * Math.cos(a)).toFixed(1) + "," + (cy + r * Math.sin(a)).toFixed(1));
  }
  return pts.join(" ");
}

export const art = {
  /* ---------- header cells ---------- */
  rack: wrap("rack", "0 0 120 132", `
    <g id="rack-all">
      <ellipse class="f" cx="60" cy="126" rx="38" ry="4" opacity=".18"/>
      <g id="rack-body">
        <path class="k p" d="M26 12 Q60 6 94 12 L96 104 Q60 110 24 104 Z"/>
        <g id="rack-u1"><path class="k y" d="M34 22 Q60 19 86 22 L86 40 Q60 43 34 40Z"/><path class="k t" d="M42 31H66"/><circle class="k t p" id="rack-led1" cx="77" cy="31" r="3.6"/></g>
        <g id="rack-u2"><path class="k p" d="M34 47 Q60 44 86 47 L86 65 Q60 68 34 65Z"/><path class="k t" d="M42 55H66M42 60H58"/><circle class="k t y" id="rack-led2" cx="77" cy="56" r="3.6"/></g>
        <g id="rack-u3"><path class="k y" d="M34 72 Q60 69 86 72 L86 90 Q60 93 34 90Z"/><path class="k t" d="M42 81H66"/><circle class="k t p" id="rack-led3" cx="77" cy="81" r="3.6"/></g>
        <path class="k" d="M30 104 L25 118 M90 104 L95 118"/>
      </g>
      <path class="k" id="rack-cable" d="M60 108 Q58 128 84 124 Q108 120 104 98"/>
      <g id="rack-plug"><rect class="k y" x="97" y="84" width="14" height="16" rx="3"/><path class="k t" d="M101 84V78M107 84V78"/></g>
    </g>`),

  cloud: wrap("cloud", "0 0 130 116", `
    <g id="cloud-all">
      <g id="cloud-body"><path class="k p" d="M30 78 Q8 78 11 60 Q14 44 32 47 Q34 24 58 26 Q76 18 88 36 Q112 34 116 58 Q120 78 96 78 Z"/>
        <path class="k t" d="M40 60 Q46 52 56 56M84 52 Q92 50 98 58"/></g>
      <g id="cloud-up"><path class="k y" d="M38 100 V88 M32 94 L38 87 L44 94"/></g>
      <g id="cloud-down"><path class="k y" d="M62 88 V100 M56 94 L62 101 L68 94"/></g>
      <g id="cloud-drops"><path class="k t drop" d="M84 90 v8"/><path class="k t drop d2" d="M96 88 v10"/><path class="k t drop d3" d="M108 90 v7"/></g>
    </g>`),

  /* ---------- topic cards ---------- */
  balancer: wrap("balancer", "0 0 130 110", `
    <g id="lb-all">
      <g id="lb-hub"><circle class="k y" cx="30" cy="55" r="20"/><path class="k" d="M20 55H40M34 48L41 55L34 62"/></g>
      <g id="lb-arrows">
        <path class="k" d="M49 47 Q68 22 96 20"/><path class="k" d="M50 55 H96"/><path class="k" d="M49 63 Q68 88 96 90"/>
        <path class="k" d="M90 14L98 20L90 26M90 49L98 55L90 61M90 84L98 90L90 96"/>
      </g>
      <g id="lb-nodes">
        <rect class="k p lb-n1" x="100" y="8" width="24" height="24" rx="5"/><rect class="k p lb-n2" x="100" y="43" width="24" height="24" rx="5"/><rect class="k p lb-n3" x="100" y="78" width="24" height="24" rx="5"/>
        <path class="k t" d="M106 16H118M106 22H114M106 51H118M106 57H114M106 86H118M106 92H114"/>
      </g>
    </g>`),

  cache: wrap("cache", "0 0 130 110", `
    <g id="cache-all">
      <g id="cache-rays" class="rays"><path class="k t" d="M22 24L32 32M108 24L98 32M14 60H28M116 60H102M26 94L36 86M104 94L94 86"/></g>
      <path id="cache-bolt" class="k y" d="M74 6 L36 60 H58 L48 104 L96 42 H70 Z"/>
      <path class="k t" d="M62 30L56 40" opacity=".7"/>
    </g>`),

  database: wrap("database", "0 0 130 110", `
    <g id="db-all">
      <ellipse class="f" cx="65" cy="103" rx="42" ry="4" opacity=".16"/>
      <g id="db-body">
        <path class="k p" d="M24 26 V82 Q24 98 65 98 Q106 98 106 82 V26"/>
        <path class="k y" d="M24 50 Q24 66 65 66 Q106 66 106 50 V62 Q106 78 65 78 Q24 78 24 62Z" id="db-band"/>
        <path class="k" d="M24 82 Q24 98 65 98 Q106 98 106 82"/>
        <ellipse class="k p" id="db-top" cx="65" cy="26" rx="41" ry="14"/>
        <path class="k t" d="M46 26 Q65 32 84 26"/>
      </g>
    </g>`),

  queue: wrap("queue", "0 0 130 110", `
    <g id="q-all">
      <g id="q-mail">
        <g id="q-m1"><rect class="k p" x="8" y="40" width="30" height="22" rx="3"/><path class="k t" d="M8 42L23 54L38 42"/></g>
        <g id="q-m2"><rect class="k y" x="50" y="34" width="30" height="22" rx="3"/><path class="k t" d="M50 36L65 48L80 36"/></g>
        <g id="q-m3"><rect class="k p" x="92" y="28" width="30" height="22" rx="3"/><path class="k t" d="M92 30L107 42L122 30"/></g>
      </g>
      <g id="q-belt"><rect class="k p" x="6" y="68" width="118" height="20" rx="10"/>
        <g id="q-wheels"><circle class="k y q-w" cx="20" cy="78" r="6"/><circle class="k y q-w" cx="65" cy="78" r="6"/><circle class="k y q-w" cx="110" cy="78" r="6"/></g>
        <path class="k t" d="M12 96 V104M118 96 V104"/></g>
    </g>`),

  cdn: wrap("cdn", "0 0 130 110", `
    <g id="cdn-all">
      <g id="cdn-orbit"><ellipse class="k t" cx="65" cy="55" rx="58" ry="17" stroke-dasharray="3 7" transform="rotate(-24 65 55)"/><circle class="k y" cx="112" cy="36" r="6"/></g>
      <g id="cdn-globe"><circle class="k p" cx="65" cy="55" r="34"/>
        <path class="k t" d="M31 55H99M65 21C50 36 50 74 65 89M65 21C80 36 80 74 65 89M38 38Q65 46 92 38M38 72Q65 64 92 72"/>
        <circle class="k y" cx="52" cy="46" r="5"/><circle class="k y" cx="80" cy="62" r="5"/></g>
    </g>`),

  /* ---------- scaling ladder tiers ---------- */
  tier1: wrap("tier1", "0 0 80 70", `
    <g id="t1-all"><path class="k p" d="M18 8 H62 L64 58 H16 Z"/>
      <path class="k y" d="M24 16H56V26H24Z"/><path class="k t" d="M24 36H56M24 46H44"/><circle class="k t y" cx="52" cy="46" r="3"/>
      <path class="k" d="M20 58L17 66M60 58L63 66"/></g>`),
  tier2: wrap("tier2", "0 0 80 70", `
    <g id="t2-all"><rect class="k p" x="6" y="8" width="26" height="44" rx="4"/><rect class="k y" x="27" y="14" width="26" height="44" rx="4"/><rect class="k p" x="48" y="8" width="26" height="44" rx="4"/>
      <path class="k t" d="M12 18H26M12 26H22M33 24H47M33 32H43M54 18H68M54 26H64"/>
      <path class="k" d="M12 62H68M62 57L69 62L62 67"/></g>`),
  tier3: wrap("tier3", "0 0 80 70", `
    <g id="t3-all"><g id="t3-c1"><path class="k p" d="M6 18V44Q6 52 20 52Q34 52 34 44V18"/><ellipse class="k y" cx="20" cy="18" rx="14" ry="6"/></g>
      <g id="t3-c2"><path class="k p" d="M46 18V44Q46 52 60 52Q74 52 74 44V18"/><ellipse class="k y" cx="60" cy="18" rx="14" ry="6"/></g>
      <path class="k" d="M40 4V60M32 12L40 4L48 12" stroke-dasharray="1 0"/><path class="k t" d="M10 62H70"/></g>`),

  /* ---------- notes panel: tower crane lifting a server ---------- */
  crane: wrap("crane", "0 0 210 240", `
    <g id="crane-all">
      <path class="k" d="M60 226 H120 M70 226 V212 H110 V226"/>
      <g id="crane-mast"><path class="k p" d="M78 212 V44 H102 V212"/>
        <path class="k t" d="M78 212L102 188L78 164L102 140L78 116L102 92L78 68L102 44M102 212L78 188L102 164L78 140L102 116L78 92L102 68L78 44"/></g>
      <g id="crane-jib">
        <path class="k y" d="M74 44 L90 22 L106 44"/>
        <path class="k p" d="M30 44 H198 V30 H30Z"/>
        <path class="k t" d="M40 44 L52 30 L64 44 L76 30M112 30 L124 44 L136 30 L148 44 L160 30 L172 44 L184 30"/>
        <rect class="k y" x="22" y="34" width="26" height="24" rx="4" id="crane-weight"/>
        <path class="k t" d="M90 22L40 30M90 22L186 30"/>
      </g>
      <g id="crane-hook">
        <path class="k t" d="M170 44 V112"/><path class="k t" d="M170 112L146 132M170 112L194 132"/>
        <g id="crane-load"><rect class="k p" x="134" y="132" width="72" height="66" rx="5"/>
          <path class="k y" d="M142 140H198V156H142Z"/><path class="k t" d="M142 168H190M142 178H176"/><circle class="k t y" cx="190" cy="184" r="4"/></g>
      </g>
    </g>`),

  /* ---------- ornaments ---------- */
  hand: wrap("hand", "0 0 130 60", `
    <g id="hand-all">
      <rect class="k y" x="4" y="14" width="22" height="32" rx="4"/><path class="k t" d="M10 14V46M16 14V46" opacity=".6"/>
      <path class="k p" d="M26 20 Q40 14 54 18 L106 18 Q120 18 120 27 Q120 35 106 35 L82 35 Q88 38 88 43 Q88 50 78 50 L44 50 Q28 50 26 42Z"/>
      <path class="k t" d="M50 34 Q54 40 50 47M64 34 Q68 40 64 47"/>
    </g>`),
  gear: wrap("gear", "0 0 80 80", `
    <g id="gear-all"><circle class="k y" cx="40" cy="40" r="26" stroke-width="13" stroke-dasharray="10.2 10.2" style="stroke:var(--ink)"/>
      <circle class="k y" cx="40" cy="40" r="23"/><circle class="k p" cx="40" cy="40" r="9"/></g>`),
  starburst: wrap("starburst", "0 0 100 100", `<polygon class="k y" points="${star(50, 50, 46, 26, 12)}"/>`),
  sparkle: wrap("sparkle", "0 0 60 60", `<path class="k p" d="M30 4 Q33 27 56 30 Q33 33 30 56 Q27 33 4 30 Q27 27 30 4Z"/>`),
  ribbon: wrap("ribbon", "0 0 220 44", `
    <path class="k y" d="M14 8 H206 V36 H14Z"/><path class="k p" d="M2 12 H20 V40 H2 L10 26Z" transform="translate(0 -2)"/><path class="k p" d="M218 10 H200 V38 H218 L210 24Z"/>
    <text x="110" y="28" text-anchor="middle" class="ribbon-text">VOL. 01 · NOTES</text>`),
  stamp: wrap("stamp", "0 0 110 110", `
    <g id="stamp-all"><circle class="k" cx="55" cy="55" r="48" stroke-width="5"/><circle class="k t" cx="55" cy="55" r="40"/>
      <path id="stamp-arc" d="M15 55 A40 40 0 0 1 95 55" fill="none"/>
      <text class="stamp-text"><textPath href="#stamp-arc" startOffset="50%" text-anchor="middle">INTERVIEW ISLANDS</textPath></text>
      <text x="55" y="66" text-anchor="middle" class="stamp-big">OK</text><path class="k t" d="M24 74H86"/>
      <text x="55" y="90" text-anchor="middle" class="stamp-text">APPROVED</text></g>`),
  ticket: wrap("ticket", "0 0 200 84", `
    <g id="ticket-all"><path class="k y" d="M8 8 H192 V32 A10 10 0 0 0 192 52 V76 H8 V52 A10 10 0 0 0 8 32Z"/>
      <path class="k t" d="M138 10V74" stroke-dasharray="4 5"/>
      <text x="70" y="40" text-anchor="middle" class="ticket-big">ADMIT ONE</text><text x="70" y="60" text-anchor="middle" class="ticket-sm">SYSTEM DESIGN ISLAND</text>
      <text x="166" y="48" text-anchor="middle" class="ticket-big" style="font-size:20px">Nº1</text></g>`),

  /** art-deco corner flourish (used through <use>) */
  corner: `<svg class="ill deco" viewBox="0 0 60 60" aria-hidden="true" focusable="false"><path class="k" d="M4 56 V4 H56"/><path class="k t" d="M12 56 V12 H56"/><path class="k y" d="M4 4 Q30 4 30 30 Q4 30 4 4Z"/><path class="k t" d="M4 4L30 30M4 17L17 30M17 4L30 17"/></svg>`,

  /* ---------- "photographs" (halftone drawings, ink on paper) ---------- */
  photoAisle: `<svg class="photo-svg" viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" role="img" aria-label="A black and white halftone drawing of a data center aisle with racks receding into the distance">
    <defs>
      <pattern id="ht-a" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(30)"><circle cx="3" cy="3" r="1.7" fill="#141210"/></pattern>
      <pattern id="ht-b" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(30)"><circle cx="2" cy="2" r=".8" fill="#141210"/></pattern>
    </defs>
    <rect width="400" height="240" fill="#e9e3d2"/>
    <rect width="400" height="240" fill="url(#ht-b)" opacity=".5"/>
    <path d="M0 0H400L240 96H160Z" fill="#141210"/>
    <path d="M160 96H240V150H160Z" fill="url(#ht-a)"/>
    <path d="M0 240L160 150H240L400 240Z" fill="url(#ht-a)"/>
    <path d="M0 0L160 96V150L0 240Z" fill="#141210"/><path d="M400 0L240 96V150L400 240Z" fill="#141210"/>
    <g fill="#e9e3d2">
      <path d="M8 40L40 58V190L8 208Z"/><path d="M52 66L82 82V166L52 182Z"/><path d="M94 88L120 100V146L94 160Z"/><path d="M130 104L150 113V132L130 142Z"/>
      <path d="M392 40L360 58V190L392 208Z"/><path d="M348 66L318 82V166L348 182Z"/><path d="M306 88L280 100V146L306 160Z"/><path d="M270 104L250 113V132L270 142Z"/>
    </g>
    <g fill="#141210"><path d="M14 60L34 71M14 84L34 95M14 108L34 119M14 132L34 143M14 156L34 167" stroke="#141210" stroke-width="3"/><path d="M386 60L366 71M386 84L366 95M386 108L366 119M386 132L366 143M386 156L366 167" stroke="#141210" stroke-width="3"/></g>
    <g fill="#e9e3d2"><circle cx="24" cy="66" r="2.4"/><circle cx="24" cy="102" r="2.4"/><circle cx="376" cy="78" r="2.4"/><circle cx="376" cy="126" r="2.4"/><circle cx="66" cy="96" r="2"/><circle cx="334" cy="110" r="2"/></g>
    <path d="M196 8 H204 V96 H196Z" fill="#e9e3d2"/><rect x="150" y="6" width="100" height="5" fill="#e9e3d2"/>
    </svg>`,

  photoSkyline: `<svg class="photo-svg" viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" role="img" aria-label="A black and white halftone drawing of a city skyline with construction cranes">
    <defs>
      <pattern id="ht-c" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(30)"><circle cx="3" cy="3" r="1.5" fill="#141210"/></pattern>
      <linearGradient id="sky-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient>
      <mask id="sky-m"><rect width="400" height="240" fill="url(#sky-g)"/></mask>
    </defs>
    <rect width="400" height="240" fill="#e9e3d2"/>
    <rect width="400" height="240" fill="url(#ht-c)" mask="url(#sky-m)" transform="scale(1 -1) translate(0 -240)" opacity=".85"/>
    <circle cx="316" cy="64" r="26" fill="#e9e3d2" stroke="#141210" stroke-width="3"/>
    <g fill="#141210">
      <rect x="10" y="120" width="44" height="120"/><rect x="60" y="90" width="38" height="150"/><rect x="104" y="140" width="50" height="100"/>
      <rect x="160" y="70" width="46" height="170"/><rect x="212" y="110" width="40" height="130"/><rect x="258" y="130" width="56" height="110"/>
      <rect x="320" y="96" width="42" height="144"/><rect x="366" y="150" width="34" height="90"/><rect x="0" y="170" width="20" height="70"/>
      <rect x="176" y="50" width="14" height="22"/><rect x="180" y="34" width="6" height="18"/>
    </g>
    <g fill="#e9e3d2">
      ${Array.from({ length: 34 }, (_, i) => `<rect x="${[18, 70, 112, 168, 220, 268, 330][i % 7] + (i % 3) * 10}" y="${100 + ((i * 23) % 120)}" width="5" height="7"/>`).join("")}
    </g>
    <g stroke="#141210" stroke-width="3" fill="none" stroke-linecap="round">
      <path d="M120 140V52M104 52H176M120 52L104 60M108 52L96 52" /><path d="M176 52V84M170 84H182V96H170Z" fill="#141210"/>
      <path d="M296 130V60M282 60H352M296 60L286 68M340 60V90"/>
    </g></svg>`,
};

/** sprinkle of tiny decorative floaters used by the parallax layer */
export const floaterArt = [art.sparkle, art.starburst, art.gear, art.sparkle, art.starburst, art.sparkle];
