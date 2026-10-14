/**
 * Small inline pictures that sit INSIDE a note body (token "@@inline:<key>" in content/system-design/index.js).
 * They are absolutely positioned over empty space (see body.sd .lb-mini in topics/system-design.css), so they
 * never push the text around. Static: nothing moves.
 */
const INK = "#141210", YEL = "#f2b01e", PAPER = "#f4efe3";

const lbMini = () => `
<span class="lb-mini-anchor"><span class="lb-mini" role="img" aria-label="Small diagram: users send requests to a load balancer, which spreads them across three servers.">
<svg viewBox="0 0 380 76" width="380" height="76" xmlns="http://www.w3.org/2000/svg" focusable="false">
  <g fill="none" stroke="${INK}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
    <!-- users -->
    <circle cx="22" cy="28" r="7" fill="${PAPER}"/>
    <path d="M9 52c0-8 6-12 13-12s13 4 13 12z" fill="${PAPER}"/>
    <!-- user -> load balancer -->
    <path d="M42 40h30"/><path d="M66 35l6 5-6 5"/>
    <!-- load balancer -->
    <rect x="76" y="14" width="104" height="52" rx="6" fill="${YEL}"/>
    <path d="M86 28h84M86 40h84M86 52h84" stroke-width="1.4" opacity=".45"/>
    <!-- fan out -->
    <path d="M180 28L234 14"/><path d="M180 40h54"/><path d="M180 52l54 14"/>
    <path d="M228 10l6 4-7 3"/><path d="M228 35l6 5-6 5"/><path d="M227 63l7 3-6 5"/>
    <!-- servers -->
    <rect x="238" y="4" width="92" height="20" rx="4" fill="${PAPER}"/>
    <rect x="238" y="30" width="92" height="20" rx="4" fill="${PAPER}"/>
    <rect x="238" y="56" width="92" height="20" rx="4" fill="${PAPER}"/>
    <circle cx="250" cy="14" r="3" fill="${YEL}"/><circle cx="250" cy="40" r="3" fill="${YEL}"/><circle cx="250" cy="66" r="3" fill="${YEL}"/>
  </g>
  <g font-family="Oswald, Impact, sans-serif" font-weight="700" fill="${INK}" text-anchor="middle">
    <text x="128" y="45" font-size="11" letter-spacing=".6">LOAD BALANCER</text>
    <text x="298" y="18" font-size="10">server 1</text>
    <text x="298" y="44" font-size="10">server 2</text>
    <text x="298" y="70" font-size="10">server 3</text>
    <text x="22" y="72" font-size="9">users</text>
  </g>
</svg></span></span>`;

export default { lbMini };
