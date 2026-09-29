/**
 * OOP note diagrams — Phase 2A: Topic 2 · Classes & Objects (obj-1..obj-9),
 * Topic 3 · Constructors (ctor-1..ctor-8), Topic 4 · Encapsulation (enc-1..enc-9).
 * See src/topics/diagrams/oop-diagram-kit.js for the shared style contract, and
 * oop-diagrams-qr.js / oop-diagrams-topic1.js for the established visual language
 * this file matches (thick ink outlines, flat od-* fills, no faces).
 */
import {
  fig, keyframes, bind, sparkle, arrowDown, arrowRight, arrowLeft,
  box, padlock, gear, TICK, CROSS,
} from "./oop-diagram-kit.js";

/** simple house silhouette (rect body + triangle roof as one outline), ~44 wide x 36 tall
 * unscaled, origin at its own center; used only in this file (Topic 2's house/blueprint analogy). */
function house(cx, cy, scale, cls) {
  return `<g transform="translate(${cx},${cy}) scale(${scale})">
    <path class="od-k ${cls}" d="M-22,18H22V0L0,-18L-22,0Z"/>
    <rect class="od-k od-inkfill" x="-6" y="3" width="12" height="15" rx="2"/>
  </g>`;
}

// =====================================================================
// Topic 2 · Classes & Objects
// =====================================================================

// ---------- obj-1: one blueprint, many houses ----------
function houseBlueprint() {
  const objHouses = [
    { cx: 78, cls: "od-greenfill" },
    { cx: 150, cls: "od-salmonfill" },
    { cx: 222, cls: "od-yfill" },
  ];
  const inner = `
    <text class="od-t" x="10" y="22">One blueprint, many houses</text>
    ${house(150, 58, 1, "od-p od-t od-dash")}
    <text class="od-s" x="150" y="90" text-anchor="middle">class House (blueprint)</text>
    <path class="od-k" d="M118,98C102,102 90,105 80,108"/>${arrowDown(78, 112)}
    <path class="od-k" d="M150,98V108"/>${arrowDown(150, 112)}
    <path class="od-k" d="M182,98C198,102 210,105 220,108"/>${arrowDown(222, 112)}
    ${objHouses.map((h, i) => `<g class="od-objhouse-${i}">${house(h.cx, 132, 0.62, h.cls)}</g>`).join("")}
    <text class="od-s" x="78" y="154" text-anchor="middle">House 1</text>
    <text class="od-s" x="150" y="154" text-anchor="middle">House 2</text>
    <text class="od-s" x="222" y="154" text-anchor="middle">House 3</text>
    <text class="od-cap" x="10" y="174">same blueprint -&gt; three independent, real houses</text>`;
  const one = (i, d) => keyframes(`odObjHouse${i}`, 3.6, [[0, "transform:translateY(0)"], [d, "transform:translateY(0)"], [d + 6, "transform:translateY(-3px)"], [d + 14, "transform:translateY(0)"], [100, "transform:translateY(0)"]]) + bind(`.od-objhouse-${i}`, `odObjHouse${i}`, 3.6);
  const css = objHouses.map((_, i) => one(i, i * 24 + 6)).join("");
  return fig("houseBlueprint", 300, 182, "One blueprint stamps out many independent houses", "A dashed house outline labeled class House (blueprint) sits above three arrows pointing down to three solid houses labeled House 1, House 2 and House 3 — one blueprint producing several independent real objects.", inner) + `<style>${css}</style>`;
}

// ---------- obj-2: UML-style class box, three compartments ----------
function carClassUml() {
  const inner = `
    <text class="od-t" x="10" y="20">A class box —</text>
    <text class="od-t" x="10" y="38">three compartments</text>
    ${box(70, 48, 160, 112, "od-k od-uml-glow od-p", 10)}
    <line class="od-k" x1="70" y1="86" x2="230" y2="86"/>
    <line class="od-k" x1="70" y1="124" x2="230" y2="124"/>
    <text class="od-b" x="150" y="72" text-anchor="middle">Car</text>
    <text class="od-s" x="150" y="102" text-anchor="middle">color, speed</text>
    <text class="od-cap" x="150" y="114" text-anchor="middle">(fields)</text>
    <text class="od-s" x="150" y="146" text-anchor="middle">drive()</text>
    <text class="od-cap" x="150" y="158" text-anchor="middle">(method)</text>
    <text class="od-cap" x="10" y="176">name on top, fields in the middle, methods below</text>`;
  const css = keyframes("odUmlGlow", 3.2, [[0, "filter:drop-shadow(0 0 0 rgba(0,0,0,0))"], [50, "filter:drop-shadow(0 0 5px var(--od-mustard))"], [100, "filter:drop-shadow(0 0 0 rgba(0,0,0,0))"]]) + bind(".od-uml-glow", "odUmlGlow", 3.2);
  return fig("carClassUml", 300, 182, "A UML-style class box with three compartments", "A rounded rectangle divided into three horizontal sections: the class name Car on top, the fields color and speed in the middle, and the method drive() at the bottom.", inner) + `<style>${css}</style>`;
}

// ---------- obj-3: new Car() twice -> two separate instances ----------
function twoInstances() {
  const inner = `
    <text class="od-t" x="10" y="20">Two new Car() calls,</text>
    <text class="od-t" x="10" y="38">two separate objects</text>
    ${box(110, 46, 80, 32, "od-k od-p od-dash", 8)}
    <text class="od-b" x="150" y="67" text-anchor="middle">new Car()</text>
    <path class="od-k" d="M132,78C112,86 92,92 78,98"/>${arrowDown(78, 104)}
    <path class="od-k" d="M168,78C188,86 208,92 222,98"/>${arrowDown(222, 104)}
    ${box(30, 104, 96, 56, "od-k od-salmonfill", 10)}
    <text class="od-b od-onink" x="78" y="126" text-anchor="middle">myCar</text>
    <text class="od-s od-onink" x="78" y="144" text-anchor="middle">red, 100</text>
    ${box(174, 104, 96, 56, "od-k od-greenfill", 10)}
    <text class="od-b od-onink" x="222" y="126" text-anchor="middle">anotherCar</text>
    <text class="od-s od-onink" x="222" y="144" text-anchor="middle">blue, 60</text>
    <path class="od-k od-t od-dash od-obj3-ncon" d="M126,132H174" fill="none"/>
    <g class="od-obj3-ncon" transform="translate(150,132) scale(.55)"><path class="od-k" d="${CROSS}"/></g>
    <text class="od-cap" x="10" y="174">two independent objects — no shared data between them</text>`;
  const css = keyframes("odObj3Pulse", 3, [[0, "opacity:1"], [50, "opacity:.45"], [100, "opacity:1"]]) + bind(".od-obj3-ncon", "odObj3Pulse", 3);
  return fig("twoInstances", 300, 182, "Two new Car() calls make two separate, independent objects", "A dashed new Car() box has two arrows fanning down to two solid boxes: myCar (red, 100) and anotherCar (blue, 60). A crossed-out dashed line between them shows they share no data.", inner) + `<style>${css}</style>`;
}

// ---------- obj-4: fields compartment + methods compartment ----------
function fieldsMethodsSplit() {
  const inner = `
    <text class="od-t" x="10" y="20">Fields = data it has,</text>
    <text class="od-t" x="10" y="38">methods = things it can do</text>
    ${box(40, 50, 220, 112, "od-k od-greenfill", 14)}
    <text class="od-b od-onink" x="150" y="70" text-anchor="middle">Car</text>
    ${box(56, 80, 92, 72, "od-k od-p", 10)}
    <text class="od-s" x="102" y="100" text-anchor="middle">FIELDS</text>
    <text class="od-cap" x="102" y="118" text-anchor="middle">color</text>
    <text class="od-cap" x="102" y="132" text-anchor="middle">speed</text>
    ${box(154, 80, 92, 72, "od-k od-yfill", 10)}
    <text class="od-s" x="200" y="100" text-anchor="middle">METHODS</text>
    <text class="od-cap" x="200" y="118" text-anchor="middle">drive()</text>
    <g class="od-fm-gear">${gear(200, 134, 11, 6, "od-p")}</g>
    <text class="od-cap" x="10" y="176">every class has both — data, and actions on that data</text>`;
  const css = keyframes("odFmGear", 5, [[0, "transform:rotate(0deg)"], [100, "transform:rotate(360deg)"]]) + `.note-diagram.is-playing .od-fm-gear{animation:odFmGear 5s linear infinite;transform-origin:200px 134px}`;
  return fig("fieldsMethodsSplit", 300, 182, "A class splits into a fields compartment and a methods compartment", "A green Car box contains two nested compartments: a paper-colored FIELDS box listing color and speed, and a mustard METHODS box listing drive() with a small gear icon.", inner) + `<style>${css}</style>`;
}

// ---------- obj-5: messy loose variables vs one clean class ----------
function messyVarsVsClass() {
  const inner = `
    <text class="od-t" x="10" y="20">Loose variables vs one class</text>
    <line class="od-k od-t od-dash" x1="150" y1="28" x2="150" y2="168"/>
    <text class="od-s" x="16" y="52">car1Color</text>
    <text class="od-s" x="58" y="74">car1Speed</text>
    <text class="od-s" x="12" y="96">car2Color</text>
    <text class="od-s" x="56" y="118">car2Speed</text>
    <path class="od-k od-t od-obj5-mess" d="M40,58C68,68 32,86 64,98C36,110 60,120 50,130" fill="none"/>
    <text class="od-cap" x="12" y="150">scattered, easy to mix up or forget</text>
    ${box(176, 50, 108, 32, "od-k od-greenfill", 8)}
    <text class="od-s od-onink" x="230" y="70" text-anchor="middle">class Car</text>
    ${arrowDown(230, 96)}
    ${box(178, 96, 104, 32, "od-k od-p", 6)}
    <text class="od-cap" x="230" y="116" text-anchor="middle">car1, car2, car3</text>
    <text class="od-cap" x="176" y="146">each keeps its own</text>
    <text class="od-cap" x="176" y="159">data automatically</text>`;
  const css = keyframes("odObj5Wiggle", 3.6, [[0, "transform:rotate(0deg)"], [50, "transform:rotate(2deg)"], [100, "transform:rotate(0deg)"]]) + bind(".od-obj5-mess", "odObj5Wiggle", 3.6);
  return fig("messyVarsVsClass", 300, 182, "Scattered loose variables versus one clean class", "Left: a tangled squiggly line connecting scattered labels car1Color, car1Speed, car2Color, car2Speed. Right: one green class Car box with an arrow down to a paper box listing car1, car2, car3 — each built from the same class but keeping its own data.", inner) + `<style>${css}</style>`;
}

// ---------- obj-6: class icon vs object icon ----------
function classVsObjectIcons() {
  const inner = `
    <text class="od-t" x="10" y="20">Class icon vs object icon</text>
    ${box(30, 52, 100, 72, "od-k od-p od-dash", 10)}
    <text class="od-b" x="80" y="94" text-anchor="middle">class</text>
    ${arrowRight(164, 88)}
    ${box(190, 52, 100, 72, "od-k od-greenfill", 10)}
    <text class="od-b od-onink" x="240" y="94" text-anchor="middle">object</text>
    <text class="od-cap" x="10" y="150">dashed = just a description; solid = a real thing in memory</text>`;
  const css = keyframes("odCvoPulse", 3, [[0, "opacity:1"], [50, "opacity:.5"], [100, "opacity:1"]]) + bind(".od-k.od-dash", "odCvoPulse", 3);
  return fig("classVsObjectIcons", 300, 182, "A class icon versus an object icon", "Left: a dashed box labeled class. An arrow points right to a solid green box labeled object — dashed means just a description, solid means a real thing in memory.", inner) + `<style>${css}</style>`;
}

// ---------- obj-8 (qa): new Car() — the four steps ----------
function newCarSequence() {
  const steps = ["① allocate memory", "② fields get defaults", "③ constructor runs", "④ return the reference"];
  const rows = steps.map((t, i) => {
    const y = 34 + i * 36;
    const arrow = i < 3 ? arrowDown(150, y + 34) : "";
    return `${box(20, y, 260, 26, "od-k od-p", 6)}<text class="od-s" x="150" y="${y + 18}" text-anchor="middle">${t}</text>${arrow}`;
  }).join("");
  const inner = `
    <text class="od-t" x="10" y="22">new Car() — under the hood</text>
    ${rows}
    <text class="od-cap" x="10" y="176">four steps, every single time you call new</text>`;
  return fig("newCarSequence", 300, 182, "The four steps Java runs behind new Car()", "Four stacked boxes connected top to bottom: allocate memory, fields get defaults, constructor runs, return the reference — the exact sequence behind every new Car() call.", inner);
}

// ---------- obj-9 (key takeaway): objects standing on the same blueprint ----------
function houseBlueprintTakeaway() {
  const cols = [78, 150, 222];
  const inner = `
    ${box(30, 34, 240, 36, "od-k od-p od-t od-dash", 10)}
    <text class="od-b" x="150" y="58" text-anchor="middle">CLASS: the blueprint</text>
    ${cols.map((cx, i) => `<rect class="od-k od-t od-greenfill od-objtcol od-objtcol-${i}" x="${cx - 24}" y="80" width="48" height="62" rx="8"/><text class="od-s od-onink" x="${cx}" y="115" text-anchor="middle">Object ${i + 1}</text>`).join("")}
    <rect class="od-k" x="20" y="142" width="260" height="10" rx="4"/>
    <text class="od-cap" x="10" y="168">every object stands on the same blueprint, with its own data</text>`;
  const one = (i, d) => keyframes(`odObjTcol${i}`, 4, [[0, "transform:translateY(0)"], [d, "transform:translateY(0)"], [d + 8, "transform:translateY(-3px)"], [d + 16, "transform:translateY(0)"], [100, "transform:translateY(0)"]]) + bind(`.od-objtcol-${i}`, `odObjTcol${i}`, 4);
  const css = cols.map((_, i) => one(i, i * 14)).join("");
  return fig("houseBlueprintTakeaway", 300, 182, "Every object stands on the same blueprint", "A dashed box labeled CLASS: the blueprint rests on three green columns labeled Object 1, Object 2 and Object 3, all standing on a common ground line — every object built the same way, each with its own data.", inner) + `<style>${css}</style>`;
}

// =====================================================================
// Topic 3 · Constructors
// =====================================================================

// ---------- ctor-1: an object's one moment of birth ----------
function objectBorn() {
  const inner = `
    <text class="od-t" x="10" y="20">Born once, constructor runs</text>
    <text class="od-t" x="10" y="38">right at that moment</text>
    ${sparkle(150, 64, 12, "od-yfill od-ctor1-spark")}
    <text class="od-s" x="150" y="92" text-anchor="middle">new Car()</text>
    ${arrowDown(150, 110)}
    <g class="od-ctor1-gear">${gear(150, 128, 16, 7, "od-p od-t")}</g>
    <text class="od-cap" x="150" y="154" text-anchor="middle">constructor — runs exactly once, automatically</text>
    ${box(74, 160, 152, 18, "od-k od-greenfill", 6)}
    <text class="od-s od-onink" x="150" y="173" text-anchor="middle">fields set immediately</text>`;
  const css = keyframes("odCtor1Spark", 2.6, [[0, "transform:scale(1) rotate(0deg)"], [50, "transform:scale(1.3) rotate(18deg)"], [100, "transform:scale(1) rotate(0deg)"]]) + bind(".od-ctor1-spark", "odCtor1Spark", 2.6) +
    keyframes("odCtor1GearSpin", 3.4, [[0, "transform:rotate(0deg)"], [100, "transform:rotate(360deg)"]]) +
    `.note-diagram.is-playing .od-ctor1-gear{animation:odCtor1GearSpin 3.4s linear infinite;transform-origin:150px 128px}`;
  return fig("objectBorn", 300, 182, "An object is born once, and the constructor runs immediately", "A sparkle above the text new Car(), with an arrow down into a gear icon labeled constructor that runs exactly once automatically, followed by a green bar reading fields set immediately.", inner) + `<style>${css}</style>`;
}

// ---------- ctor-2: new Car("red", 100) flows into the constructor ----------
function ctorSetsFields() {
  const inner = `
    <text class="od-t" x="10" y="20">new Car("red", 100)</text>
    <text class="od-t" x="10" y="38">flows straight into the fields</text>
    ${box(16, 50, 132, 68, "od-k od-p od-dash", 8)}
    <text class="od-s" x="82" y="76" text-anchor="middle">Car("red", 100)</text>
    <text class="od-cap" x="82" y="96" text-anchor="middle">constructor(c, s)</text>
    ${arrowRight(170, 84, "od-k od-ctor2-flow")}
    ${box(182, 50, 102, 98, "od-k od-greenfill", 10)}
    <text class="od-b od-onink" x="233" y="74" text-anchor="middle">Car</text>
    <text class="od-s od-onink" x="233" y="98" text-anchor="middle">color = "red"</text>
    <text class="od-s od-onink" x="233" y="118" text-anchor="middle">speed = 100</text>
    <text class="od-cap" x="10" y="166">two arguments in, two fields set — immediately</text>`;
  const css = keyframes("odCtor2Flow", 2.4, [[0, "opacity:.4"], [50, "opacity:1"], [100, "opacity:.4"]]) + bind(".od-ctor2-flow", "odCtor2Flow", 2.4);
  return fig("ctorSetsFields", 300, 182, "new Car with two arguments flows into the constructor and sets both fields", "A dashed box shows Car(\"red\", 100) feeding constructor(c, s), with an arrow into a solid green Car box whose fields color and speed are already filled in as \"red\" and 100.", inner) + `<style>${css}</style>`;
}

// ---------- ctor-3: the default constructor, two panels ----------
function defaultCtorTwoPanel() {
  const inner = `
    <text class="od-t" x="10" y="20">The free constructor</text>
    <line class="od-k od-t od-dash" x1="150" y1="28" x2="150" y2="168"/>
    <text class="od-b" x="76" y="46" text-anchor="middle">no ctor written</text>
    ${box(20, 56, 112, 30, "od-k od-p", 6)}
    <text class="od-s" x="76" y="75" text-anchor="middle">class Car { }</text>
    ${arrowDown(76, 100)}
    ${box(20, 100, 112, 30, "od-k od-greenfill", 6)}
    <text class="od-s od-onink" x="76" y="119" text-anchor="middle">Car() — free!</text>
    <text class="od-cap" x="14" y="148">Java quietly gives you one</text>
    <text class="od-b" x="224" y="46" text-anchor="middle">you write one</text>
    ${box(168, 56, 112, 30, "od-k od-p", 6)}
    <text class="od-s" x="224" y="75" text-anchor="middle">Car(String c) {…}</text>
    ${arrowDown(224, 100)}
    <g transform="translate(224,116)"><circle class="od-k od-p" r="15"/><path class="od-k" d="${CROSS}"/></g>
    <text class="od-s" x="224" y="142" text-anchor="middle">no free Car() now</text>
    <text class="od-cap" x="168" y="158">the free one</text>
    <text class="od-cap" x="168" y="171">disappears for good</text>`;
  return fig("defaultCtorTwoPanel", 300, 182, "Writing no constructor versus writing one, side by side", "Left: an empty class Car with no constructor written, with an arrow down to a green box saying Car() — free, showing Java quietly provides one. Right: a class with one constructor written, with an arrow down to a crossed-out circle labeled no free Car() now.", inner);
}

// ---------- ctor-4: two constructor doors ----------
function ctorOverloadDoors() {
  const inner = `
    <text class="od-t" x="10" y="20">Same class, two doors in</text>
    ${box(20, 44, 110, 34, "od-k od-p od-dash", 8)}
    <text class="od-s" x="75" y="65" text-anchor="middle">Car()</text>
    ${box(170, 44, 110, 34, "od-k od-p od-dash", 8)}
    <text class="od-s" x="225" y="65" text-anchor="middle">Car(c, s)</text>
    ${arrowDown(75, 96)}${arrowDown(225, 96)}
    ${box(22, 96, 106, 52, "od-k od-yfill", 8)}
    <text class="od-s" x="75" y="116" text-anchor="middle">white, 0</text>
    <text class="od-cap" x="75" y="134" text-anchor="middle">basic</text>
    ${box(172, 96, 106, 52, "od-k od-salmonfill", 8)}
    <text class="od-s" x="225" y="116" text-anchor="middle">red, 100</text>
    <text class="od-cap" x="225" y="134" text-anchor="middle">custom</text>
    <text class="od-cap" x="10" y="166">Java picks the matching constructor from the arguments</text>`;
  return fig("ctorOverloadDoors", 300, 182, "One class, two constructor doors, two differently-configured objects", "Two dashed boxes, Car() and Car(c, s), each with an arrow down to a differently-filled Car: one basic (white, 0) and one custom (red, 100) — the same class built two different ways.", inner);
}

// ---------- ctor-5: this.color vs the parameter color ----------
function thisDisambiguation() {
  const inner = `
    <text class="od-t" x="10" y="20">this.color = color;</text>
    ${box(20, 42, 110, 40, "od-k od-p", 8)}
    <text class="od-s" x="75" y="66" text-anchor="middle">param: color</text>
    ${arrowRight(150, 62)}
    ${box(170, 42, 110, 40, "od-k od-greenfill", 8)}
    <text class="od-s od-onink" x="225" y="66" text-anchor="middle">this.color (field)</text>
    <text class="od-cap" x="10" y="98">the parameter flows INTO the object's own field</text>
    <line class="od-k od-t od-dash" x1="10" y1="110" x2="290" y2="110"/>
    <text class="od-b" x="150" y="130" text-anchor="middle">color = color;  (no this)</text>
    <g transform="translate(150,148)"><circle class="od-k od-p" r="14"/><path class="od-k" d="${CROSS}"/></g>
    <text class="od-cap" x="150" y="172" text-anchor="middle">just assigns the parameter to itself — field never set</text>`;
  return fig("thisDisambiguation", 300, 182, "this.color versus the plain parameter color", "Top: an arrow from a box labeled param: color into a green box labeled this.color (field), showing the parameter flowing into the object's own field. Bottom: a crossed-out circle under the line color = color without this, showing the field never actually gets set.", inner);
}

// ---------- ctor-6 (qa): constructor vs regular method ----------
function ctorVsMethod() {
  const inner = `
    <text class="od-t" x="10" y="20">Constructor vs regular method</text>
    <line class="od-k od-t od-dash" x1="150" y1="28" x2="150" y2="168"/>
    <text class="od-b" x="76" y="46" text-anchor="middle">CONSTRUCTOR</text>
    <text class="od-s" x="16" y="68">• same name as class</text>
    <text class="od-s" x="16" y="90">• no return type at all</text>
    <text class="od-s" x="16" y="112">• runs once, at creation</text>
    <text class="od-b" x="224" y="46" text-anchor="middle">REGULAR METHOD</text>
    <text class="od-s" x="164" y="68">• any name you choose</text>
    <text class="od-s" x="164" y="90">• has a return type</text>
    <text class="od-s" x="164" y="112">• callable many times</text>
    <text class="od-cap" x="10" y="150">different jobs, different rules</text>`;
  return fig("ctorVsMethod", 300, 182, "A constructor and a regular method compared side by side", "Left, CONSTRUCTOR: same name as the class, no return type at all, runs once at creation. Right, REGULAR METHOD: any name, has a return type or void, callable anytime, many times.", inner);
}

// ---------- ctor-8 (key takeaway): new Car(...) -> ready object ----------
function ctorTakeaway() {
  const inner = `
    ${box(90, 30, 120, 32, "od-k od-p od-dash", 8)}
    <text class="od-s" x="150" y="51" text-anchor="middle">new Car(...)</text>
    ${arrowDown(150, 78)}
    <g class="od-ctor8-gear">${gear(150, 96, 17, 7, "od-yfill")}</g>
    ${arrowDown(150, 130)}
    ${box(70, 130, 160, 32, "od-k od-greenfill", 10)}
    <text class="od-b od-onink" x="150" y="151" text-anchor="middle">ready-to-use Car object</text>
    <rect class="od-k" x="20" y="166" width="260" height="10" rx="4"/>
    <text class="od-cap" x="10" y="184">runs once — the object's very first setup</text>`;
  const css = keyframes("odCtor8GearSpin", 3.2, [[0, "transform:rotate(0deg)"], [100, "transform:rotate(360deg)"]]) + `.note-diagram.is-playing .od-ctor8-gear{animation:odCtor8GearSpin 3.2s linear infinite;transform-origin:150px 96px}`;
  return fig("ctorTakeaway", 300, 190, "new Car(...) runs the constructor once, producing a ready object", "A dashed new Car(...) box has an arrow down into a mustard gear icon (the constructor), then another arrow down into a solid green box reading ready-to-use Car object, all resting on a ground line.", inner) + `<style>${css}</style>`;
}

// =====================================================================
// Topic 4 · Encapsulation
// =====================================================================

// ---------- enc-1: capsule bundling data + methods, data hidden ----------
function capsuleBundle() {
  const inner = `
    <text class="od-t" x="10" y="20">Bundled together,</text>
    <text class="od-t" x="10" y="38">data hidden inside</text>
    <rect class="od-k od-greenfill" x="50" y="56" width="200" height="80" rx="40"/>
    ${padlock(112, 96, 1.05, "od-yfill")}
    <text class="od-s od-onink" x="112" y="128" text-anchor="middle">data</text>
    ${box(158, 74, 76, 44, "od-k od-p", 8)}
    <text class="od-s" x="196" y="93" text-anchor="middle">deposit()</text>
    <text class="od-cap" x="196" y="108" text-anchor="middle">methods</text>
    <text class="od-cap" x="10" y="164">one capsule: private data + the methods allowed to touch it</text>`;
  const css = keyframes("odCapsuleGlow", 3, [[0, "filter:drop-shadow(0 0 0 rgba(0,0,0,0))"], [50, "filter:drop-shadow(0 0 5px var(--od-mustard))"], [100, "filter:drop-shadow(0 0 0 rgba(0,0,0,0))"]]) + bind(".od-k.od-yfill", "odCapsuleGlow", 3);
  return fig("capsuleBundle", 300, 182, "Encapsulation: data and methods bundled in one capsule, data hidden inside", "A large green capsule (pill shape) contains a padlock icon labeled data on the left and a paper box labeled deposit() (methods) on the right — one self-contained bundle.", inner) + `<style>${css}</style>`;
}

// ---------- enc-2: no gatekeeper, invalid value gets straight in ----------
function noGatekeeper() {
  const inner = `
    <text class="od-t" x="10" y="20">No gatekeeper —</text>
    <text class="od-t" x="10" y="38">anything gets in</text>
    <text class="od-s" x="20" y="62">acc.balance = -5000;</text>
    ${arrowDown(140, 76)}
    ${box(70, 76, 140, 54, "od-k od-salmonfill", 10)}
    <text class="od-b od-onink" x="140" y="100" text-anchor="middle">balance</text>
    <text class="od-s od-onink" x="140" y="118" text-anchor="middle">-5000 (invalid!)</text>
    <g transform="translate(250,103)"><circle class="od-k od-p" r="18"/><path class="od-k" d="${CROSS}"/></g>
    <text class="od-cap" x="10" y="156">public field — nothing checks or stops this</text>`;
  return fig("noGatekeeper", 300, 182, "A public field lets an invalid value straight in", "An arrow labeled acc.balance = -5000 points straight down into a salmon box labeled balance: -5000 (invalid), with a crossed-out circle beside it showing nothing catches the mistake.", inner);
}

// ---------- enc-3: deposit()/withdraw() gatekeepers around private balance ----------
function gatekeeperMethods() {
  const inner = `
    <text class="od-t" x="10" y="20">Gatekeepers check the</text>
    <text class="od-t" x="10" y="38">rules before touching data</text>
    <text class="od-b" x="16" y="66">deposit()</text>
    ${arrowRight(108, 66)}
    <g transform="translate(80,66) scale(.6)"><path class="od-k" d="${TICK}"/></g>
    <text class="od-b" x="284" y="66" text-anchor="end">withdraw()</text>
    ${arrowLeft(192, 66)}
    <g transform="translate(220,66) scale(.6)"><path class="od-k" d="${TICK}"/></g>
    ${padlock(150, 108, 1.3, "od-yfill")}
    <text class="od-s" x="150" y="142" text-anchor="middle">private balance</text>
    <text class="od-cap" x="10" y="168">both methods validate amount before balance ever changes</text>`;
  return fig("gatekeeperMethods", 300, 182, "deposit() and withdraw() guard private balance on both sides", "A padlock labeled private balance sits in the middle. deposit() enters from the left and withdraw() enters from the right, each arrow marked with a checkmark showing it validates the amount first.", inner);
}

// ---------- enc-4: getter reads out, setter checks then writes in ----------
function getterSetterFlow() {
  const inner = `
    <text class="od-t" x="10" y="20">Getter out, setter in</text>
    <text class="od-t" x="10" y="38">(with a check)</text>
    ${box(90, 58, 120, 66, "od-k od-p", 10)}
    ${padlock(150, 84, 1.05, "od-yfill")}
    <text class="od-s" x="150" y="112" text-anchor="middle">private color</text>
    <text class="od-b" x="16" y="88">setColor(c)</text>
    ${arrowRight(84, 84)}
    <g transform="translate(60,84) scale(.6)"><path class="od-k" d="${TICK}"/></g>
    <text class="od-b" x="284" y="88" text-anchor="end">getColor()</text>
    <path class="od-k" d="M214,84H256"/>${arrowRight(262, 84, "od-k od-t")}
    <text class="od-cap" x="10" y="154">setter validates before writing; getter just reads</text>`;
  return fig("getterSetterFlow", 300, 182, "A getter reads a private field out, a setter checks then writes it in", "A padlock labeled private color sits in the middle. setColor(c) enters from the left with a checkmark (it validates first). getColor() exits to the right, simply returning the value.", inner);
}

// ---------- enc-5: two benefits side by side ----------
function twoBenefits() {
  const inner = `
    <text class="od-t" x="10" y="20">Two big payoffs</text>
    <line class="od-k od-t od-dash" x1="150" y1="28" x2="150" y2="168"/>
    <text class="od-b" x="76" y="46" text-anchor="middle">STAYS VALID</text>
    ${box(20, 56, 112, 50, "od-k od-greenfill", 8)}
    <text class="od-s od-onink" x="76" y="80" text-anchor="middle">balance ≥ 0</text>
    <g transform="translate(76,96) scale(.6)"><path class="od-k" d="${TICK}"/></g>
    <text class="od-cap" x="14" y="126">rules enforced from inside, always</text>
    <text class="od-b" x="224" y="46" text-anchor="middle">SWAP INTERNALS</text>
    ${box(168, 56, 112, 26, "od-k od-p", 6)}
    <text class="od-s" x="224" y="74" text-anchor="middle">getBalance()</text>
    <path class="od-k od-t od-dash" d="M224,82V96" fill="none"/>
    ${box(168, 96, 112, 26, "od-k od-salmonfill", 6)}
    <text class="od-s od-onink" x="224" y="114" text-anchor="middle">internals changed</text>
    <text class="od-cap" x="164" y="132">public method unchanged,</text>
    <text class="od-cap" x="164" y="145">callers never notice</text>`;
  return fig("twoBenefits", 300, 182, "The two big benefits of encapsulation", "Left, STAYS VALID: a green box balance greater than or equal to 0 with a checkmark, enforced from inside. Right, SWAP INTERNALS: getBalance() stays the same on top while the box beneath it, labeled internals changed, is swapped out underneath — callers never notice.", inner);
}

// ---------- enc-6: one private field, two doors ----------
function encVocabIcons() {
  const inner = `
    <text class="od-t" x="10" y="20">Data hiding, in one picture</text>
    ${padlock(150, 82, 1.6, "od-yfill")}
    <text class="od-s" x="150" y="126" text-anchor="middle">private field</text>
    ${arrowLeft(80, 76)}
    <text class="od-cap" x="60" y="60" text-anchor="middle">getter</text>
    ${arrowRight(220, 76)}
    <text class="od-cap" x="240" y="60" text-anchor="middle">setter</text>
    <text class="od-cap" x="10" y="160">the vocabulary all traces back to this one picture</text>`;
  return fig("encVocabIcons", 300, 182, "One private field, two public doors", "A large padlock labeled private field in the middle, with a left-pointing arrow labeled getter on one side and a right-pointing arrow labeled setter on the other.", inner);
}

// ---------- enc-9 (key takeaway): private data held up by getters/setters ----------
function encapsulationTakeaway() {
  const cols = [110, 190];
  const labels = ["get", "set"];
  const inner = `
    ${box(70, 30, 160, 36, "od-k od-inkfill", 10)}
    <text class="od-b od-onink" x="150" y="54" text-anchor="middle">PRIVATE DATA</text>
    ${cols.map((cx, i) => `<rect class="od-k od-t od-yfill od-etcol od-etcol-${i}" x="${cx - 16}" y="66" width="32" height="70" rx="8"/><text class="od-b" x="${cx}" y="106" text-anchor="middle">${labels[i]}</text>`).join("")}
    <rect class="od-k" x="20" y="136" width="260" height="10" rx="4"/>
    <text class="od-cap" x="10" y="160">getters and setters are the only two doors in and out</text>`;
  const one = (i, d) => keyframes(`odEncTcol${i}`, 4, [[0, "transform:translateY(0)"], [d, "transform:translateY(0)"], [d + 8, "transform:translateY(-3px)"], [d + 16, "transform:translateY(0)"], [100, "transform:translateY(0)"]]) + bind(`.od-etcol-${i}`, `odEncTcol${i}`, 4);
  const css = cols.map((_, i) => one(i, i * 14)).join("");
  return fig("encapsulationTakeaway", 300, 182, "Getters and setters are the only two doors to private data", "A black box labeled PRIVATE DATA rests on two mustard columns labeled get and set, both standing on a common ground line — the only two ways in or out.", inner) + `<style>${css}</style>`;
}

export default {
  houseBlueprint, carClassUml, twoInstances, fieldsMethodsSplit, messyVarsVsClass,
  classVsObjectIcons, newCarSequence, houseBlueprintTakeaway,
  objectBorn, ctorSetsFields, defaultCtorTwoPanel, ctorOverloadDoors,
  thisDisambiguation, ctorVsMethod, ctorTakeaway,
  capsuleBundle, noGatekeeper, gatekeeperMethods, getterSetterFlow,
  twoBenefits, encVocabIcons, encapsulationTakeaway,
};
