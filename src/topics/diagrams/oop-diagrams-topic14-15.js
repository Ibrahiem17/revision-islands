/**
 * OOP note diagrams — Phase 2E (FINAL): Topic 14 · Composition vs Inheritance (comp-1..comp-8),
 * Topic 15 · SOLID Principles (solid-1..solid-11). See src/topics/diagrams/oop-diagram-kit.js for
 * the shared style contract, and oop-diagrams-qr.js / oop-diagrams-topic1.js / -topic2-4.js /
 * -topic5-7.js / -topic8-10.js / -topic11-13.js for the established visual language this file
 * matches (thick ink outlines, flat od-* fills, no faces).
 *
 * Quick Revision already ships a compositionVsInheritance diagram (Vehicle/Car-extends vs
 * Car/Engine, side-by-side) and a solid diagram (five circular badges S-O-L-I-D in a row, name
 * captioned underneath each). Every figure below is a deliberately different take built from THIS
 * topic's own deeper content/code (Engine/Car/ElectricEngine, the is-a/has-a test, the SOLID code
 * examples) rather than a re-skin of those two summary diagrams:
 *  - comp-1 uses labelled extends/contains boxes framed as two named relationships, not QR's
 *    Vehicle/Car/Engine trio.
 *  - solid-1 fuses S-O-L-I-D into one touching word-strip collapsing into a single "5 separate
 *    principles" statement (no per-letter names shown) — an intro framing, not a listing.
 *  - solid-7 is a vertical ladder of five rows (square chip + full name + one-line idea), not a
 *    horizontal row of circular badges.
 *  - solid-11 (final note on the whole page) uses the two-box + ground-line takeaway family shared
 *    by every other topic's recap diagram, not another badge row.
 *
 * qa items skipped as genuine same-topic restatements (same precedent as prior phases): comp-6
 * restates comp-1's is-a/has-a framing, comp-7 restates comp-4's coupling-vs-flexibility framing,
 * solid-8 restates solid-1/solid-7, solid-9 restates solid-2. solid-10 gets its own figure since it
 * asks a genuinely different question (what LSP *protects against*, i.e. compiles-but-breaks) from
 * solid-4's concrete Square/Rectangle bug.
 */
import {
  fig, box, badge, arrowDown, arrowUp, arrowRight,
  TICK, CROSS, gear,
} from "./oop-diagram-kit.js";

// =====================================================================
// Topic 14 · Composition vs Inheritance
// =====================================================================

// ---------- comp-1: two ways to connect classes, side by side ----------
function compRelationshipIntro() {
  const inner = `
    <text class="od-t" x="10" y="16">Two ways to connect classes</text>
    <text class="od-s" x="75" y="34" text-anchor="middle">INHERITANCE</text>
    <text class="od-s" x="225" y="34" text-anchor="middle">COMPOSITION</text>
    <line class="od-k od-t od-dash" x1="150" y1="34" x2="150" y2="150"/>
    ${box(25, 44, 100, 32, "od-k od-p", 8)}
    <text class="od-s" x="75" y="64" text-anchor="middle">Animal</text>
    ${arrowUp(75, 84)}
    ${box(25, 92, 100, 32, "od-k od-greenfill", 8)}
    <text class="od-s od-onink" x="75" y="112" text-anchor="middle">Dog</text>
    <text class="od-cap" x="14" y="140">extends → IS-A</text>
    ${box(165, 28, 115, 96, "od-k od-p", 10)}
    <text class="od-s" x="222" y="46" text-anchor="middle">Car</text>
    ${box(182, 74, 80, 34, "od-k od-yfill", 8)}
    <text class="od-s" x="222" y="96" text-anchor="middle">Engine</text>
    <text class="od-cap" x="160" y="140">contains → HAS-A</text>
    <text class="od-cap" x="150" y="170" text-anchor="middle">both reuse code, in very different ways</text>`;
  return fig("compRelationshipIntro", 300, 182,
    "Inheritance connects classes by extending; composition connects them by containing",
    "Left: an Animal box with an arrow up from a green Dog box, labeled extends, IS-A. Right: a Car box containing a smaller mustard Engine box inside it, labeled contains, HAS-A. Caption: both reuse code, in very different ways.",
    inner);
}

// ---------- comp-2: Car contains an Engine field, and delegates to it ----------
function compHasAEngineDelegate() {
  const inner = `
    <text class="od-t" x="10" y="18">Car contains an Engine field</text>
    ${box(40, 28, 220, 96, "od-k od-p", 12)}
    <text class="od-b" x="150" y="50" text-anchor="middle">class Car</text>
    ${box(70, 62, 160, 34, "od-k od-yfill", 8)}
    <text class="od-s" x="150" y="84" text-anchor="middle">engine: Engine</text>
    <text class="od-s" x="150" y="114" text-anchor="middle">start() { engine.start(); }</text>
    ${arrowDown(150, 140)}
    ${box(60, 142, 180, 30, "od-k od-greenfill", 8)}
    <text class="od-s od-onink" x="150" y="161" text-anchor="middle">Engine's start() runs</text>
    <text class="od-cap" x="150" y="176" text-anchor="middle">Car holds an Engine, and delegates to it</text>`;
  return fig("compHasAEngineDelegate", 300, 182,
    "Car contains an Engine field and delegates start() to it, instead of extending Engine",
    "A Car box contains a mustard engine field labeled engine colon Engine, with its start method reading engine.start(). An arrow leads down to a green box showing Engine's start actually running — Car holds an Engine and delegates to it.",
    inner);
}

// ---------- comp-3 (table): the is-a / has-a test, three rows ----------
function compIsAHasATest() {
  const row = (y, q, ok, ans) => `
    <text class="od-s" x="14" y="${y}">${q}</text>
    ${badge(262, y - 4, 13, ok ? "od-greenfill" : "od-salmonfill", `<path class="od-k" d="${ok ? TICK : CROSS}" transform="scale(0.85)"/>`)}
    <text class="od-cap" x="14" y="${y + 16}">${ans}</text>`;
  const inner = `
    <text class="od-t" x="10" y="18">The is-a / has-a test</text>
    ${row(38, "Is a Dog an Animal?", true, "yes → inheritance (extends)")}
    <line class="od-k od-t od-dash" x1="10" y1="62" x2="290" y2="62"/>
    ${row(84, "Does a Car have an Engine?", true, "yes → composition (a field)")}
    <line class="od-k od-t od-dash" x1="10" y1="108" x2="290" y2="108"/>
    ${row(130, "Is a Car an Engine?", false, "no → inheritance would be WRONG")}
    <text class="od-cap" x="150" y="170" text-anchor="middle">the test that decides which tool to use</text>`;
  return fig("compIsAHasATest", 300, 182,
    "Three questions decide whether to reach for inheritance or composition",
    "Row one: is a Dog an Animal, yes, marked with a green tick, inheritance. Row two: does a Car have an Engine, yes, marked with a green tick, composition. Row three: is a Car an Engine, no, marked with a red cross, inheritance would be wrong here.",
    inner);
}

// ---------- comp-4: rigid coupling (inheritance) vs swappable parts (composition) ----------
function compTightVsFlexible() {
  const inner = `
    <text class="od-t" x="10" y="16">Rigid coupling vs flexible parts</text>
    <text class="od-s" x="75" y="34" text-anchor="middle">RIGID</text>
    <text class="od-s" x="225" y="34" text-anchor="middle">SWAPPABLE</text>
    <line class="od-k od-t od-dash" x1="150" y1="34" x2="150" y2="150"/>
    ${box(25, 42, 100, 30, "od-k od-p", 8)}
    <text class="od-s" x="75" y="61" text-anchor="middle">Parent</text>
    <line class="od-k" x1="75" y1="72" x2="75" y2="104"/>
    ${badge(75, 88, 9, "od-salmonfill", `<path class="od-k" d="${CROSS}" transform="scale(0.6)"/>`)}
    ${box(25, 104, 100, 30, "od-k od-salmonfill", 8)}
    <text class="od-s od-onink" x="75" y="123" text-anchor="middle">Child</text>
    <text class="od-cap" x="14" y="146">tight bond — parent</text>
    <text class="od-cap" x="14" y="158">changes break the child</text>
    ${box(165, 42, 115, 92, "od-k od-p", 10)}
    <text class="od-s" x="222" y="60" text-anchor="middle">Car</text>
    ${gear(198, 96, 13, 8, "od-yfill")}
    ${gear(248, 96, 13, 8, "od-greenfill")}
    <text class="od-cap" x="160" y="146">plug in either engine —</text>
    <text class="od-cap" x="160" y="158">Car's code stays the same</text>`;
  return fig("compTightVsFlexible", 300, 182,
    "Inheritance creates rigid coupling; composition allows swappable parts",
    "Left: a Parent box tightly connected by a solid line to a salmon Child box, with a small cross marking that a parent change breaks the child. Right: a Car box holding two small interchangeable gear icons representing swappable Engine implementations — Car's code stays the same either way.",
    inner);
}

// ---------- comp-5: same Car constructor, two kinds of Engine plugged in ----------
function compSwapEngineConstructor() {
  const inner = `
    <text class="od-t" x="10" y="18">One constructor, two kinds of Engine</text>
    <text class="od-s" x="85" y="40" text-anchor="middle">new Engine()</text>
    <text class="od-s" x="215" y="40" text-anchor="middle">new ElectricEngine()</text>
    <path class="od-k" d="M85,46C85,54 100,58 112,64" fill="none"/>${arrowDown(112, 66)}
    <path class="od-k" d="M215,46C215,54 200,58 188,64" fill="none"/>${arrowDown(188, 66)}
    ${box(70, 66, 160, 38, "od-k od-p", 10)}
    <text class="od-b" x="150" y="90" text-anchor="middle">Car(Engine e)</text>
    ${arrowDown(150, 116)}
    ${box(50, 118, 200, 34, "od-k od-greenfill", 8)}
    <text class="od-s od-onink" x="150" y="139" text-anchor="middle">Car's code never changes</text>
    <text class="od-cap" x="150" y="168" text-anchor="middle">same Car(), different Engine plugged in</text>`;
  return fig("compSwapEngineConstructor", 300, 182,
    "The same Car constructor accepts either a regular Engine or an ElectricEngine",
    "Two labels, new Engine() and new ElectricEngine(), both feed down into the same Car(Engine e) constructor box, which leads to a green box reading Car's code never changes — same Car, different Engine plugged in.",
    inner);
}

// ---------- comp-8 (key takeaway) ----------
function compTakeaway() {
  const inner = `
    ${box(30, 24, 110, 56, "od-k od-p", 10)}
    <text class="od-b" x="85" y="48" text-anchor="middle">inheritance</text>
    <text class="od-cap" x="85" y="66" text-anchor="middle">is-a — extends</text>
    ${box(160, 24, 110, 56, "od-k od-greenfill", 10)}
    <text class="od-b od-onink" x="215" y="48" text-anchor="middle">composition</text>
    <text class="od-cap od-onink" x="215" y="66" text-anchor="middle">has-a — contains</text>
    <rect class="od-k" x="20" y="100" width="260" height="10" rx="4"/>
    <text class="od-cap" x="150" y="126" text-anchor="middle">favor composition when unsure —</text>
    <text class="od-cap" x="150" y="142" text-anchor="middle">reserve inheritance for genuine is-a relationships</text>`;
  return fig("compTakeaway", 300, 156,
    "Inheritance models is-a by extending; composition models has-a by containing — favor composition when unsure",
    "A paper inheritance box (is-a, extends) beside a green composition box (has-a, contains), resting on a ground line — favor composition when unsure, reserve inheritance for genuine is-a relationships.",
    inner);
}

// =====================================================================
// Topic 15 · SOLID Principles
// =====================================================================

// ---------- solid-1: SOLID as one word, unpacking into five separate ideas ----------
function solidAcronymUnpack() {
  const letters = ["S", "O", "L", "I", "D"];
  const tiles = letters.map((l, i) => `
    ${box(25 + i * 50, 30, 50, 40, "od-k od-p", 6)}
    <text class="od-b" x="${50 + i * 50}" y="56" text-anchor="middle">${l}</text>`).join("");
  const inner = `
    <text class="od-t" x="10" y="18">One acronym, five separate ideas</text>
    ${tiles}
    ${arrowDown(150, 92)}
    ${box(40, 94, 220, 50, "od-k od-yfill", 10)}
    <text class="od-b" x="150" y="114" text-anchor="middle">5 separate design principles</text>
    <text class="od-cap" x="150" y="132" text-anchor="middle">each solving a different problem</text>
    <text class="od-cap" x="150" y="164" text-anchor="middle">each letter unpacks below, one at a time</text>`;
  return fig("solidAcronymUnpack", 300, 182,
    "SOLID is one acronym that unpacks into five separate design principles",
    "Five square tiles spelling S O L I D sit fused together like one word, with an arrow down into a mustard box reading 5 separate design principles, each solving a different problem — they unpack one at a time below.",
    inner);
}

// ---------- solid-2 (S — Single Responsibility) ----------
function solidSRP() {
  const inner = `
    <text class="od-t" x="10" y="16">S — one class, one job</text>
    ${box(50, 28, 200, 62, "od-k od-salmonfill", 10)}
    <text class="od-b od-onink" x="150" y="50" text-anchor="middle">Employee</text>
    <text class="od-cap od-onink" x="150" y="68" text-anchor="middle">pay + save + print — tangled</text>
    ${badge(255, 46, 12, "od-p", `<path class="od-k" d="${CROSS}" transform="scale(0.7)"/>`)}
    <text class="od-cap" x="150" y="100" text-anchor="middle">bad — 3 unrelated responsibilities in one class</text>
    ${arrowDown(150, 112)}
    ${box(30, 118, 76, 40, "od-k od-greenfill", 8)}
    <text class="od-s od-onink" x="68" y="136" text-anchor="middle">Employee</text>
    <text class="od-cap od-onink" x="68" y="150" text-anchor="middle">data</text>
    ${box(112, 118, 76, 40, "od-k od-greenfill", 8)}
    <text class="od-s od-onink" x="150" y="136" text-anchor="middle">PayCalc</text>
    <text class="od-cap od-onink" x="150" y="150" text-anchor="middle">pay</text>
    ${box(194, 118, 76, 40, "od-k od-greenfill", 8)}
    <text class="od-s od-onink" x="232" y="136" text-anchor="middle">EmpRepo</text>
    <text class="od-cap od-onink" x="232" y="150" text-anchor="middle">save</text>
    <text class="od-cap" x="150" y="174" text-anchor="middle">good — each class has exactly one job</text>`;
  return fig("solidSRP", 300, 182,
    "Single Responsibility: split one tangled class into several, each with one job",
    "A salmon Employee box tangling pay, save and print together, marked with a cross, splits via an arrow into three green boxes: Employee for data, PayCalc for pay, and EmpRepo for saving — each with exactly one job.",
    inner);
}

// ---------- solid-3 (O — Open/Closed) ----------
function solidOCP() {
  const inner = `
    <text class="od-t" x="10" y="16">O — extend without editing</text>
    ${box(40, 26, 220, 46, "od-k od-salmonfill", 10)}
    <text class="od-b od-onink" x="150" y="46" text-anchor="middle">if/else per shape type</text>
    <text class="od-cap od-onink" x="150" y="64" text-anchor="middle">new shape → must edit this code</text>
    <text class="od-cap" x="150" y="88" text-anchor="middle">bad — editing tested code every time</text>
    ${arrowDown(150, 98)}
    ${box(90, 100, 120, 26, "od-k od-p od-dash", 8)}
    <text class="od-s" x="150" y="117" text-anchor="middle">abstract Shape</text>
    <path class="od-k od-t" d="M150,126C150,132 60,132 60,140" fill="none"/>${arrowDown(60, 140)}
    <path class="od-k od-t" d="M150,126V140" fill="none"/>${arrowDown(150, 140)}
    <path class="od-k od-t" d="M150,126C150,132 240,132 240,140" fill="none"/>${arrowDown(240, 140)}
    ${box(20, 140, 80, 28, "od-k od-greenfill", 8)}
    <text class="od-s od-onink" x="60" y="158" text-anchor="middle">Circle</text>
    ${box(110, 140, 80, 28, "od-k od-greenfill", 8)}
    <text class="od-s od-onink" x="150" y="158" text-anchor="middle">Square</text>
    ${box(200, 140, 80, 28, "od-k od-yfill", 8)}
    <text class="od-s" x="240" y="158" text-anchor="middle">+Triangle</text>
    <text class="od-cap" x="150" y="178" text-anchor="middle">good — add a class, zero edits to old code</text>`;
  return fig("solidOCP", 300, 182,
    "Open/Closed: replace a giant if/else with an abstract Shape that new classes can extend",
    "A salmon box with a giant if/else per shape type, marked bad, gives way to an abstract Shape box branching into Circle, Square, and a newly added Triangle class — adding a shape needs zero edits to the existing code.",
    inner);
}

// ---------- solid-4 (L — Liskov Substitution) ----------
function solidLSP() {
  const inner = `
    <text class="od-t" x="10" y="16">L — Square breaks Rectangle's promise</text>
    ${box(90, 28, 120, 30, "od-k od-p", 8)}
    <text class="od-s" x="150" y="47" text-anchor="middle">Rectangle</text>
    ${arrowUp(150, 82)}
    ${box(90, 90, 120, 30, "od-k od-salmonfill", 8)}
    <text class="od-s od-onink" x="150" y="109" text-anchor="middle">Square extends</text>
    <text class="od-s" x="14" y="140">rect.setWidth(5);</text>
    ${badge(255, 136, 12, "od-p", `<path class="od-k" d="${CROSS}" transform="scale(0.7)"/>`)}
    <text class="od-cap" x="14" y="158">expected: only width changes</text>
    <text class="od-cap" x="14" y="176">actual: height changes too — contract broken</text>`;
  return fig("solidLSP", 300, 182,
    "The classic Liskov violation: Square extends Rectangle but setWidth secretly changes height too",
    "A Rectangle box with an arrow up from a salmon Square extends box. Below, rect.setWidth(5) is marked with a cross: expected only width to change, but the actual behavior secretly changes height too — the contract is broken.",
    inner);
}

// ---------- solid-5 (I — Interface Segregation) ----------
function solidISP() {
  const inner = `
    <text class="od-t" x="10" y="16">I — don't force unneeded methods</text>
    ${box(70, 26, 160, 44, "od-k od-salmonfill", 10)}
    <text class="od-b od-onink" x="150" y="46" text-anchor="middle">interface Worker</text>
    <text class="od-cap od-onink" x="150" y="62" text-anchor="middle">work() + eat()</text>
    ${arrowDown(150, 78)}
    ${box(90, 80, 120, 30, "od-k od-p", 8)}
    <text class="od-s" x="150" y="99" text-anchor="middle">Robot</text>
    ${badge(222, 95, 11, "od-salmonfill", `<path class="od-k" d="${CROSS}" transform="scale(0.7)"/>`)}
    <text class="od-cap" x="150" y="122" text-anchor="middle">bad — Robot forced to implement eat()</text>
    <line class="od-k od-t od-dash" x1="10" y1="132" x2="290" y2="132"/>
    ${box(30, 138, 110, 32, "od-k od-greenfill", 8)}
    <text class="od-s od-onink" x="85" y="158" text-anchor="middle">Workable</text>
    ${box(160, 138, 110, 32, "od-k od-p", 8)}
    <text class="od-s" x="215" y="158" text-anchor="middle">Eatable</text>
    <text class="od-cap" x="150" y="176" text-anchor="middle">good — Robot implements only Workable</text>`;
  return fig("solidISP", 300, 182,
    "Interface Segregation: split one bloated interface into small, focused ones",
    "A salmon interface Worker box with work and eat sits above a Robot box marked with a cross, since Robot is forced to implement eat. Below, split into a green Workable box and a plain Eatable box — Robot implements only Workable.",
    inner);
}

// ---------- solid-6 (D — Dependency Inversion) ----------
function solidDIP() {
  const inner = `
    <text class="od-t" x="10" y="16">D — depend on the interface, not the class</text>
    ${box(20, 28, 80, 30, "od-k od-p", 8)}
    <text class="od-s" x="60" y="47" text-anchor="middle">Car</text>
    ${arrowRight(112, 43)}
    ${box(118, 28, 110, 30, "od-k od-salmonfill", 8)}
    <text class="od-s od-onink" x="173" y="47" text-anchor="middle">GasEngine</text>
    <text class="od-cap" x="10" y="70">bad — Car locked directly to GasEngine</text>
    <line class="od-k od-t od-dash" x1="10" y1="82" x2="290" y2="82"/>
    ${box(20, 90, 80, 30, "od-k od-p", 8)}
    <text class="od-s" x="60" y="109" text-anchor="middle">Car</text>
    ${arrowRight(112, 105)}
    ${box(118, 90, 100, 36, "od-k od-p od-dash", 8)}
    <text class="od-s" x="168" y="106" text-anchor="middle">Engine</text>
    <text class="od-cap" x="168" y="121" text-anchor="middle">(interface)</text>
    <path class="od-k od-t" d="M168,126C168,132 115,132 115,140" fill="none"/>${arrowDown(115, 140)}
    <path class="od-k od-t" d="M168,126C168,132 225,132 225,140" fill="none"/>${arrowDown(225, 140)}
    ${box(70, 150, 90, 28, "od-k od-greenfill", 8)}
    <text class="od-s od-onink" x="115" y="168" text-anchor="middle">GasEngine</text>
    ${box(170, 150, 110, 28, "od-k od-greenfill", 8)}
    <text class="od-s od-onink" x="225" y="168" text-anchor="middle">ElectricEngine</text>`;
  return fig("solidDIP", 300, 182,
    "Dependency Inversion: Car should depend on an Engine interface, not one specific concrete class",
    "Top: Car pointing directly at a salmon GasEngine class, marked bad — locked to one concrete class. Bottom: Car pointing at a dashed Engine interface instead, which branches down to both GasEngine and ElectricEngine — either implementation plugs in freely.",
    inner);
}

// ---------- solid-7 (table): SOLID at a glance, as a vertical ladder ----------
function solidGlanceLadder() {
  const rows = [
    ["S", "Single Responsibility", "one class, one job"],
    ["O", "Open/Closed", "extend without editing"],
    ["L", "Liskov Substitution", "subclass must behave safely"],
    ["I", "Interface Segregation", "many small interfaces"],
    ["D", "Dependency Inversion", "depend on interfaces, not classes"],
  ];
  const rowY = (i) => 28 + i * 33;
  const inner = `
    <text class="od-t" x="10" y="18">SOLID at a glance</text>
    ${rows.map(([letter, name, idea], i) => {
      const y = rowY(i);
      return `
      ${box(14, y, 22, 22, "od-k od-yfill", 5)}
      <text class="od-b" x="25" y="${y + 16}" text-anchor="middle">${letter}</text>
      <text class="od-s" x="44" y="${y + 16}">${name}</text>
      <text class="od-cap" x="44" y="${y + 29}">${idea}</text>`;
    }).join("")}`;
  return fig("solidGlanceLadder", 300, 200,
    "SOLID at a glance, as a vertical ladder of five rows",
    "A vertical ladder of five rows, each a small square chip with a letter (S, O, L, I, D) beside its full name and a one-line idea: Single Responsibility — one class one job; Open/Closed — extend without editing; Liskov Substitution — subclass must behave safely; Interface Segregation — many small interfaces; Dependency Inversion — depend on interfaces, not classes.",
    inner);
}

// ---------- solid-10: what LSP protects against — compiles fine, breaks silently ----------
function solidLSPContractBreak() {
  const inner = `
    <text class="od-t" x="10" y="16">What LSP protects against</text>
    ${box(30, 30, 110, 50, "od-k od-p", 10)}
    <text class="od-s" x="85" y="52" text-anchor="middle">compiles fine</text>
    ${badge(85, 68, 10, "od-greenfill", `<path class="od-k" d="${TICK}" transform="scale(0.7)"/>`)}
    ${box(170, 30, 110, 50, "od-k od-salmonfill", 10)}
    <text class="od-s od-onink" x="225" y="52" text-anchor="middle">breaks silently</text>
    ${badge(225, 68, 10, "od-p", `<path class="od-k" d="${CROSS}" transform="scale(0.7)"/>`)}
    <text class="od-s" x="14" y="104">Parent p = new Child();</text>
    <text class="od-cap" x="14" y="122">same code — but Child breaks the contract</text>
    <text class="od-cap" x="14" y="140">LSP: substituting the subclass must be SAFE</text>
    <text class="od-cap" x="14" y="176">a subclass must honor its parent's contract</text>`;
  return fig("solidLSPContractBreak", 300, 182,
    "Liskov Substitution protects against code that compiles fine but silently misbehaves when a subclass is substituted",
    "A paper box reading compiles fine with a green tick, beside a salmon box reading breaks silently with a cross. Below, Parent p = new Child(); — the same code compiles but the subclass secretly breaks the contract the parent promised.",
    inner);
}

// ---------- solid-11 (key takeaway — last note on the entire page) ----------
function solidTakeaway() {
  const inner = `
    ${box(20, 24, 120, 56, "od-k od-p", 10)}
    <text class="od-b" x="80" y="48" text-anchor="middle">S O L I D</text>
    <text class="od-cap" x="80" y="66" text-anchor="middle">five principles</text>
    ${box(160, 24, 120, 56, "od-k od-greenfill", 10)}
    <text class="od-b od-onink" x="220" y="48" text-anchor="middle">maintainable</text>
    <text class="od-cap od-onink" x="220" y="66" text-anchor="middle">flexible code</text>
    <rect class="od-k" x="20" y="100" width="260" height="10" rx="4"/>
    <text class="od-cap" x="150" y="126" text-anchor="middle">the same idea as Topic 14's composition —</text>
    <text class="od-cap" x="150" y="142" text-anchor="middle">depend on abstractions, not concrete classes</text>`;
  return fig("solidTakeaway", 300, 156,
    "SOLID's five principles all aim at the same goal: maintainable, flexible code",
    "A paper box reading S O L I D, five principles, beside a green box reading maintainable, flexible code, resting on a ground line — the same idea as Topic 14's composition: depend on abstractions, not concrete classes.",
    inner);
}

export default {
  compRelationshipIntro, compHasAEngineDelegate, compIsAHasATest, compTightVsFlexible,
  compSwapEngineConstructor, compTakeaway,
  solidAcronymUnpack, solidSRP, solidOCP, solidLSP, solidISP, solidDIP, solidGlanceLadder,
  solidLSPContractBreak, solidTakeaway,
};
