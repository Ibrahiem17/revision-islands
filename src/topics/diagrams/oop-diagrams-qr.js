/**
 * OOP note diagrams — Quick Revision section (qr-1..qr-15), one figure per pillar/concept.
 * Registered in src/topics/oop-diagrams.js and wired via `diagram: "<key>"` on each item in
 * content/oop/index.js. See src/topics/diagrams/oop-diagram-kit.js for the shared style contract.
 */
import { fig, keyframes, bind, sparkle, arrowDown, arrowRight, padlock, hood, gear, box } from "./oop-diagram-kit.js";

// ---------- 1. What is OOP — bundling data + behavior ----------
function bundle() {
  const inner = `
    <text class="od-t" x="10" y="24">A Car OBJECT bundles</text>
    <text class="od-t" x="10" y="42">its data + behavior</text>
    ${box(14, 56, 272, 96, "od-k od-greenfill", 14)}
    <text class="od-b od-onink" x="150" y="80" text-anchor="middle">Car</text>
    ${box(28, 90, 118, 50, "od-k od-p", 8)}
    <text class="od-s" x="87" y="108" text-anchor="middle">data</text>
    <text class="od-s" x="87" y="123" text-anchor="middle">color, speed</text>
    ${box(154, 90, 118, 50, "od-k od-p", 8)}
    <text class="od-s" x="213" y="108" text-anchor="middle">behavior</text>
    <text class="od-s" x="213" y="123" text-anchor="middle">drive()</text>
    ${sparkle(268, 62, 9, "od-yfill od-spark")}
    <text class="od-cap" x="10" y="172">one object, not loose variables + loose functions</text>`;
  const css = keyframes("odBundleSpark", 2.6, [[0, "transform:scale(1) rotate(0deg);opacity:1"], [50, "transform:scale(1.25) rotate(14deg);opacity:.7"], [100, "transform:scale(1) rotate(0deg);opacity:1"]]) +
    bind(".od-spark", "odBundleSpark", 2.6);
  return fig("bundle", 300, 182, "A Car object bundles data and behavior", "A rounded green box labeled Car contains two compartments: data (color, speed) and behavior (drive()), bundled together as one object.", inner) + `<style>${css}</style>`;
}

// ---------- 2. Classes & Objects — blueprint stamps out objects ----------
function blueprint() {
  const stamp = (cx, i) => `
    <g class="od-stamp od-stamp-${i}">
      ${box(cx - 34, 108, 68, 46, "od-k od-greenfill", 8)}
      <text class="od-b od-onink" x="${cx}" y="136" text-anchor="middle">Car ${i + 1}</text>
    </g>`;
  const inner = `
    <text class="od-t" x="10" y="24">One blueprint,</text>
    <text class="od-t" x="10" y="42">many real objects</text>
    ${box(96, 54, 108, 40, "od-k od-p od-dash", 8)}
    <text class="od-b" x="150" y="78" text-anchor="middle">class Car</text>
    ${arrowDown(78, 108)}${arrowDown(150, 108)}${arrowDown(222, 108)}
    <path class="od-k" d="M104,94C90,98 82,102 78,100"/>
    <path class="od-k" d="M150,94V100"/>
    <path class="od-k" d="M196,94C210,98 218,102 222,100"/>
    ${stamp(78, 0)}${stamp(150, 1)}${stamp(222, 2)}
    <text class="od-cap" x="10" y="172">new Car() each time -&gt; independent objects</text>`;
  const one = (i, d) => keyframes(`odBpStamp${i}`, 3.6, [[0, "transform:scale(1)"], [d, "transform:scale(1)"], [d + 6, "transform:scale(1.12)"], [d + 14, "transform:scale(1)"], [100, "transform:scale(1)"]]) + bind(`.od-stamp-${i}`, `odBpStamp${i}`, 3.6);
  const css = [one(0, 8), one(1, 40), one(2, 72)].join("");
  return fig("blueprint", 300, 182, "One blueprint stamps out many independent objects", "A dashed box labeled class Car sits above three arrows pointing down to three solid green boxes labeled Car 1, Car 2 and Car 3 — one blueprint producing several independent real objects.", inner) + `<style>${css}</style>`;
}

// ---------- 3. Constructors — assembling initial values ----------
function construct() {
  const inner = `
    <text class="od-t" x="10" y="24">The constructor sets</text>
    <text class="od-t" x="10" y="42">starting values on new()</text>
    ${box(20, 56, 140, 96, "od-k od-p od-dash", 10)}
    <text class="od-s" x="90" y="76" text-anchor="middle">new Car("red")</text>
    <g transform="translate(90,108)">${gear(0, 0, 22, 8, "od-yfill")}</g>
    <text class="od-s" x="90" y="146" text-anchor="middle">Car(color)</text>
    ${arrowRight(178, 104)}
    ${box(190, 56, 100, 96, "od-k od-greenfill", 10)}
    <text class="od-b od-onink" x="240" y="90" text-anchor="middle">Car</text>
    <text class="od-s od-onink" x="240" y="112" text-anchor="middle">color = "red"</text>
    <text class="od-s od-onink" x="240" y="128" text-anchor="middle">speed = 0</text>
    <text class="od-cap" x="10" y="172">runs once, automatically, right when the object is born</text>`;
  const css2 = keyframes("odCtorSpin", 3.2, [[0, "transform:translate(90px,108px) rotate(0deg)"], [100, "transform:translate(90px,108px) rotate(360deg)"]]);
  const bindGear = `.note-diagram.is-playing .od-gear-ctor{animation:odCtorSpin 3.2s linear infinite;transform-origin:90px 108px}`;
  return fig("construct", 300, 182, "The constructor sets starting values when an object is created", "A dashed box shows new Car(\"red\") with a gear icon labeled Car(color) turning inside it, feeding an arrow into a solid green Car box whose fields color and speed are already filled in.", inner.replace('<g transform="translate(90,108)">', '<g class="od-gear-ctor" transform="translate(90,108)">')) + `<style>${css2}${bindGear}</style>`;
}

// ---------- 4. Encapsulation — padlock over data ----------
function encapsulate() {
  const inner = `
    <text class="od-t" x="10" y="24">Private data, public</text>
    <text class="od-t" x="10" y="42">door in and out</text>
    ${box(70, 60, 160, 84, "od-k od-p", 10)}
    ${padlock(150, 96, 1.55, "od-yfill", "od-lock-glow")}
    <text class="od-s" x="150" y="130" text-anchor="middle">balance (private)</text>
    <text class="od-b" x="16" y="108" text-anchor="start">deposit()</text>
    ${arrowRight(64, 104)}
    <text class="od-b" x="284" y="108" text-anchor="end">getBalance()</text>
    <path class="od-k" d="M234,100H262"/>${arrowRight(268, 100, "od-k od-t")}
    <text class="od-cap" x="10" y="172">outside code can never touch balance directly</text>`;
  const css = keyframes("odLockGlow", 2.8, [[0, "filter:drop-shadow(0 0 0 rgba(0,0,0,0))"], [50, "filter:drop-shadow(0 0 5px var(--od-mustard))"], [100, "filter:drop-shadow(0 0 0 rgba(0,0,0,0))"]]) +
    bind(".od-lock-glow", "odLockGlow", 2.8);
  return fig("encapsulate", 300, 182, "Encapsulation: a padlock over private data", "A rounded box holds a padlock icon over the label balance (private). An arrow labeled deposit() enters from the left and an arrow labeled getBalance() exits to the right — the only two doors in and out.", inner) + `<style>${css}</style>`;
}

// ---------- 5. Abstraction — hood hides the machinery ----------
function abstractFig() {
  const inner = `
    <text class="od-t" x="10" y="24">One simple button,</text>
    <text class="od-t" x="10" y="42">complexity hidden inside</text>
    ${hood(90, 108, 1.7)}
    <text class="od-s" x="90" y="150" text-anchor="middle">start()</text>
    ${gear(216, 96, 16, 7, "od-p od-t")}
    ${gear(246, 112, 11, 6, "od-p od-t")}
    <text class="od-s" x="230" y="146" text-anchor="middle">fuel + ignition</text>
    <path class="od-k od-dash" d="M130,100C160,100 180,100 194,98" fill="none"/>
    <text class="od-cap" x="10" y="172">myCar.start() — the caller never sees the gears turn</text>`;
  const css = keyframes("odGear1", 6, [[0, "transform:rotate(0deg)"], [100, "transform:rotate(360deg)"]]) +
    keyframes("odGear2", 6, [[0, "transform:rotate(0deg)"], [100, "transform:rotate(-360deg)"]]) +
    `.note-diagram.is-playing .od-abs-g1{animation:odGear1 6s linear infinite;transform-origin:216px 96px}
     .note-diagram.is-playing .od-abs-g2{animation:odGear2 4.4s linear infinite;transform-origin:246px 112px}`;
  return fig("abstract", 300, 182, "Abstraction: one simple button, complexity hidden behind it", "A hooded, curtained shape with one visible knob labeled start() sits at left. At right, two gears labeled fuel and ignition are shown outside the curtain for clarity, connected by a dashed line, illustrating the hidden machinery the caller never has to see.", inner.replace('<g transform="translate(216,96)">', '<g class="od-abs-g1" transform="translate(216,96)">').replace('<g transform="translate(246,112)">', '<g class="od-abs-g2" transform="translate(246,112)">')) + `<style>${css}</style>`;
}

// ---------- 6. Inheritance — parent to child ----------
function inherit() {
  const inner = `
    <text class="od-t" x="10" y="24">A child class reuses</text>
    <text class="od-t" x="10" y="42">a parent's fields + methods</text>
    ${box(90, 54, 120, 44, "od-k od-p", 10)}
    <text class="od-b" x="150" y="80" text-anchor="middle">Animal</text>
    ${arrowDown(150, 112, "od-k od-inherit")}
    ${box(60, 112, 180, 52, "od-k od-greenfill", 10)}
    <text class="od-b od-onink" x="150" y="134" text-anchor="middle">Dog extends Animal</text>
    <text class="od-s od-onink" x="150" y="152" text-anchor="middle">gets eat() free + adds bark()</text>
    <text class="od-cap" x="10" y="172">a Dog IS AN Animal — genuine "is-a"</text>`;
  const css = `.note-diagram.is-playing .od-k.od-inherit{animation:odInhArrowNudge 2.4s ease-in-out infinite}
     @keyframes odInhArrowNudge{0%,100%{transform:translateY(0)}50%{transform:translateY(3px)}}`;
  return fig("inherit", 300, 182, "Inheritance: a child class extends a parent", "A box labeled Animal sits above a downward arrow into a larger green box labeled Dog extends Animal, which gets eat() for free and adds its own bark().", inner) + `<style>${css}</style>`;
}

// ---------- 7. Polymorphism — one call, many shapes ----------
function polymorph() {
  const shape = (cx, kind, i) => {
    const s = kind === "circle" ? `<circle class="od-k od-salmonfill" cx="${cx}" cy="140" r="20"/>` :
      kind === "square" ? `<rect class="od-k od-yfill" x="${cx-18}" y="122" width="36" height="36" rx="6"/>` :
      `<path class="od-k od-greenfill" d="M${cx},120L${cx+20},152H${cx-20}Z"/>`;
    return `<g class="od-poly-s od-poly-${i}">${s}</g>`;
  };
  const inner = `
    <text class="od-t" x="10" y="24">One call, different</text>
    <text class="od-t" x="10" y="42">behavior per object</text>
    ${box(112, 56, 76, 36, "od-k od-p", 8)}
    <text class="od-s" x="150" y="78" text-anchor="middle">.makeSound()</text>
    ${arrowDown(80, 108)}${arrowDown(150, 108)}${arrowDown(220, 108)}
    <path class="od-k" d="M136,92C120,98 100,102 82,100"/>
    <path class="od-k" d="M150,92V100"/>
    <path class="od-k" d="M164,92C182,98 202,102 218,100"/>
    ${shape(80, "circle", 0)}${shape(150, "square", 1)}${shape(220, "triangle", 2)}
    <text class="od-cap" x="10" y="172">same method name, three different results</text>`;
  const one = (i, d) => keyframes(`odPolyS${i}`, 3.6, [[0, "transform:scale(1)"], [d, "transform:scale(1)"], [d + 6, "transform:scale(1.18)"], [d + 14, "transform:scale(1)"], [100, "transform:scale(1)"]]) + bind(`.od-poly-${i}`, `odPolyS${i}`, 3.6);
  const css = [one(0, 5), one(1, 35), one(2, 65)].join("");
  return fig("polymorph", 300, 182, "Polymorphism: one method call, different behavior per object", "A box labeled .makeSound() has three arrows fanning down to a circle, a square and a triangle — the same call producing a different, correct shape each time.", inner) + `<style>${css}</style>`;
}

// ---------- 8. Overloading vs Overriding ----------
function overloadOverride() {
  const inner = `
    <text class="od-t" x="10" y="20">Overload vs Override</text>
    <line class="od-k od-t od-dash" x1="150" y1="28" x2="150" y2="168"/>
    <text class="od-b" x="76" y="42" text-anchor="middle">OVERLOAD</text>
    ${box(16, 52, 120, 26, "od-k od-p", 6)}<text class="od-s" x="76" y="69" text-anchor="middle">add(int,int)</text>
    ${box(16, 84, 120, 26, "od-k od-p", 6)}<text class="od-s" x="76" y="101" text-anchor="middle">add(double,double)</text>
    <text class="od-cap" x="16" y="122">same class, same name,</text><text class="od-cap" x="16" y="135">different params — compile time</text>
    <text class="od-b" x="224" y="42" text-anchor="middle">OVERRIDE</text>
    ${box(166, 52, 66, 40, "od-k od-p", 6)}<text class="od-s" x="199" y="76" text-anchor="middle">Animal</text>
    ${arrowDown(199, 100)}
    ${box(166, 100, 132, 40, "od-k od-greenfill", 6)}<text class="od-s od-onink" x="232" y="124" text-anchor="middle">Dog.makeSound()</text>
    <text class="od-cap" x="166" y="150">parent -&gt; child,</text><text class="od-cap" x="166" y="163">same signature —</text><text class="od-cap" x="166" y="176">replaced at runtime</text>`;
  const css = keyframes("odOoPulse", 3, [[0, "opacity:1"], [50, "opacity:.55"], [100, "opacity:1"]]) + bind(".od-k.od-dash", "odOoPulse", 3);
  return fig("overloadOverride", 300, 182, "Overloading versus overriding, side by side", "Left half: two add() methods with different parameter lists in the same class, labeled overload, decided at compile time. Right half: an Animal box with an arrow down to a green Dog box whose makeSound() replaces the parent's version, labeled override, decided at runtime.", inner) + `<style>${css}</style>`;
}

// ---------- 9. Abstract class vs Interface ----------
function abstractVsInterface() {
  const inner = `
    <text class="od-t" x="10" y="20">Abstract class vs Interface</text>
    <line class="od-k od-t od-dash" x1="150" y1="28" x2="150" y2="168"/>
    ${box(24, 42, 100, 56, "od-k od-p od-dash", 10)}
    <text class="od-b" x="74" y="64" text-anchor="middle">Shape</text>
    <text class="od-s" x="74" y="82" text-anchor="middle">(abstract)</text>
    ${arrowDown(74, 116)}
    ${box(30, 116, 88, 34, "od-k od-greenfill", 8)}<text class="od-s od-onink" x="74" y="137" text-anchor="middle">Circle</text>
    <text class="od-cap" x="14" y="166">extends ONE — shares real code</text>
    ${box(190, 42, 96, 40, "od-k od-p", 22)}
    <text class="od-s" x="238" y="66" text-anchor="middle">Payable</text>
    <path class="od-k" d="M215,82C205,96 200,108 202,118"/>${arrowDown(202, 122)}
    <path class="od-k" d="M238,82V118"/>${arrowDown(238, 122)}
    <path class="od-k" d="M261,82C271,96 276,108 274,118"/>${arrowDown(274, 122)}
    <text class="od-s" x="238" y="140" text-anchor="middle">Employee, Invoice…</text>
    <text class="od-cap" x="182" y="156">implement MANY —</text><text class="od-cap" x="182" y="169">pure contract</text>`;
  const css = keyframes("odAiFan", 3.4, [[0, "transform:translateY(0)"], [50, "transform:translateY(3px)"], [100, "transform:translateY(0)"]]);
  return fig("abstractVsInterface", 300, 182, "Abstract class versus interface", "Left: a dashed abstract Shape box with one arrow down to a green Circle box — single inheritance, shares real code. Right: a rounded Payable interface with three arrows fanning down to Employee, Invoice and more — many classes can implement it as a pure contract.", inner) + `<style>${css}</style>`;
}

// ---------- 10. Access modifiers — rings ----------
function accessRings() {
  const rings = [
    { r: 76, cls: "od-p", label: "public", ty: -60 },
    { r: 56, cls: "od-greenfill", label: "protected", ty: -40 },
    { r: 36, cls: "od-salmonfill", label: "default", ty: -20 },
    { r: 16, cls: "od-yfill", label: "private", ty: 0 },
  ];
  const inner = `
    <text class="od-t" x="10" y="22">Most to least restrictive</text>
    <g transform="translate(90,110)">
      ${rings.map(r => `<circle class="od-k ${r.cls}" r="${r.r}"/>`).join("")}
    </g>
    ${rings.map((r, i) => `<text class="od-s" x="210" y="${62 + i * 20}">${r.label}</text><line class="od-k od-t" x1="196" y1="${58 + i * 20}" x2="${90 + (76 - i * 20 - 8)}" y2="110" stroke-dasharray="2 3"/>`).join("")}
    <text class="od-cap" x="10" y="172">private &lt; default &lt; protected &lt; public</text>`;
  const css = keyframes("odRingPulse", 3.2, [[0, "transform:scale(1)"], [50, "transform:scale(1.05)"], [100, "transform:scale(1)"]]) + bind("g > .od-k.od-yfill", "odRingPulse", 3.2);
  return fig("accessRings", 300, 182, "Access modifiers as nested rings", "Four concentric rings from outer to inner: public, protected, default and private, each ring more restrictive than the one outside it, with labels pointing to each ring.", inner) + `<style>${css}</style>`;
}

// ---------- 11. static — one shared box ----------
function staticShared() {
  const car2 = (cx, i) => `<g class="od-static-c od-static-${i}">${box(cx - 26, 118, 52, 34, "od-k od-p", 6)}<text class="od-s" x="${cx}" y="139" text-anchor="middle">Car ${i + 1}</text></g>`;
  const inner = `
    <text class="od-t" x="10" y="24">One shared copy,</text>
    <text class="od-t" x="10" y="42">not one per object</text>
    ${box(96, 54, 108, 36, "od-k od-yfill", 8)}
    <text class="od-b" x="150" y="77" text-anchor="middle">static totalCars</text>
    <path class="od-k" d="M78,118C78,96 100,90 130,90"/>
    <path class="od-k" d="M150,118V90"/>
    <path class="od-k" d="M222,118C222,96 200,90 170,90"/>
    ${car2(78, 0)}${car2(150, 1)}${car2(222, 2)}
    <text class="od-cap" x="10" y="172">every Car object points to the SAME counter</text>`;
  const css = keyframes("odStaticPulse", 2.6, [[0, "filter:drop-shadow(0 0 0 rgba(0,0,0,0))"], [50, "filter:drop-shadow(0 0 5px var(--od-mustard))"], [100, "filter:drop-shadow(0 0 0 rgba(0,0,0,0))"]]) +
    `.note-diagram.is-playing .od-static-box{animation:odStaticPulse 2.6s ease-in-out infinite}`;
  return fig("staticShared", 300, 182, "static: one shared copy for every object", "A mustard box labeled static totalCars sits above three lines connecting down to three separate Car boxes — all three objects share that exact same single counter.", inner.replace('od-k od-yfill" x="96"', 'od-static-box od-k od-yfill" x="96"')) + `<style>${css}</style>`;
}

// ---------- 12. this & super ----------
function thisSuper() {
  const inner = `
    <text class="od-t" x="10" y="24">this = me, super = parent</text>
    ${box(90, 40, 120, 40, "od-k od-p", 10)}<text class="od-b" x="150" y="64" text-anchor="middle">Animal</text>
    ${arrowDown(150, 96, "od-k od-super")}
    <text class="od-s" x="176" y="88">super(...)</text>
    ${box(70, 96, 160, 50, "od-k od-greenfill", 10)}
    <text class="od-b od-onink" x="150" y="118" text-anchor="middle">Dog</text>
    <path class="od-k od-this" d="M96,132C86,144 96,152 108,146" fill="none"/>${arrowRight(112, 144, "od-k od-this")}
    <text class="od-s od-onink" x="150" y="136" text-anchor="middle">this.name = name</text>
    <text class="od-cap" x="10" y="172">super() runs first, then this object's own setup</text>`;
  const css = keyframes("odSuperUp", 2.8, [[0, "transform:translateY(0)"], [50, "transform:translateY(-3px)"], [100, "transform:translateY(0)"]]) + bind(".od-k.od-super", "odSuperUp", 2.8) +
    keyframes("odThisSpin", 2.8, [[0, "opacity:.5"], [50, "opacity:1"], [100, "opacity:.5"]]) + bind(".od-k.od-this", "odThisSpin", 2.8);
  return fig("thisSuper", 300, 182, "this refers to the current object, super to the parent", "An Animal box sits above a green Dog box, joined by an upward-pointing arrow labeled super(...). Inside the Dog box a small looping arrow labeled this.name = name points back at itself.", inner) + `<style>${css}</style>`;
}

// ---------- 13. Object class methods — root of everything ----------
function objectRoot() {
  const leaf = (cx, label) => `${box(cx - 40, 118, 80, 34, "od-k od-p", 6)}<text class="od-s" x="${cx}" y="139" text-anchor="middle">${label}</text>`;
  const inner = `
    <text class="od-t" x="10" y="22">Every class secretly</text>
    <text class="od-t" x="10" y="40">extends Object</text>
    ${box(110, 50, 80, 36, "od-k od-inkfill", 8)}
    <text class="od-b od-onink" x="150" y="73" text-anchor="middle">Object</text>
    <path class="od-k" d="M92,86C92,100 100,110 110,116"/>${arrowDown(112,120)}
    <path class="od-k" d="M150,86V116"/>${arrowDown(150,120)}
    <path class="od-k" d="M208,86C208,100 200,110 190,116"/>${arrowDown(188,120)}
    ${leaf(72, "Car")}${leaf(150, "toString()")}${leaf(228, "equals()")}
    <text class="od-cap" x="10" y="172">override them for meaningful, content-based behavior</text>`;
  const css = keyframes("odRootGlow", 3, [[0, "filter:none"], [50, "filter:drop-shadow(0 0 5px var(--od-mustard))"], [100, "filter:none"]]) + bind(".od-k.od-inkfill", "odRootGlow", 3);
  return fig("objectRoot", 300, 182, "Every class secretly extends the built-in Object class", "A black Object box at the top with three arrows fanning down to Car, toString() and equals() — every class inherits these methods for free, though they usually need overriding.", inner) + `<style>${css}</style>`;
}

// ---------- 14. Composition vs Inheritance ----------
function compositionVsInheritance() {
  const inner = `
    <text class="od-t" x="10" y="20">Inheritance (is-a) vs Composition (has-a)</text>
    <line class="od-k od-t od-dash" x1="150" y1="28" x2="150" y2="168"/>
    ${box(38, 44, 76, 34, "od-k od-p", 8)}<text class="od-s" x="76" y="65" text-anchor="middle">Vehicle</text>
    ${arrowDown(76, 96, "od-k od-isline")}
    ${box(22, 96, 108, 34, "od-k od-greenfill", 8)}<text class="od-s od-onink" x="76" y="117" text-anchor="middle">Car extends</text>
    <text class="od-cap" x="16" y="150">Car IS A Vehicle</text>
    ${box(184, 60, 96, 70, "od-k od-p", 10)}
    <text class="od-s" x="232" y="80" text-anchor="middle">Car</text>
    ${box(198, 90, 68, 30, "od-k od-salmonfill", 6)}<text class="od-s od-onink" x="232" y="109" text-anchor="middle">Engine</text>
    <text class="od-cap" x="184" y="150">Car HAS AN Engine</text>`;
  const css = keyframes("odCiPulse", 3.2, [[0, "opacity:1"], [50, "opacity:.5"], [100, "opacity:1"]]) + bind(".od-k.od-isline", "odCiPulse", 3.2);
  return fig("compositionVsInheritance", 300, 182, "Composition versus inheritance", "Left: a Vehicle box with an arrow down to a green Car extends box, labeled Car is a Vehicle. Right: a Car box containing a smaller salmon Engine box inside it, labeled Car has an Engine.", inner) + `<style>${css}</style>`;
}

// ---------- 15. SOLID — five badges ----------
function solid() {
  const letters = ["S", "O", "L", "I", "D"];
  const words = ["Single Resp.", "Open/Closed", "Liskov Sub.", "Interface Seg.", "Dep. Inv."];
  const cols = [30, 90, 150, 210, 270];
  const inner = `
    <text class="od-t" x="10" y="22">Five principles for</text>
    <text class="od-t" x="10" y="40">maintainable OOP</text>
    ${cols.map((cx, i) => `
      <g class="od-solid-b od-solid-${i}" transform="translate(${cx},96)">
        <circle class="od-k ${i % 2 ? "od-salmonfill" : "od-greenfill"}" r="22"/>
        <text class="od-b od-onink" x="0" y="7" text-anchor="middle">${letters[i]}</text>
      </g>
      <text class="od-cap" x="${cx}" y="150" text-anchor="middle">${words[i]}</text>`).join("")}`;
  const one = (i, d) => keyframes(`odSolid${i}`, 5, [[0, "transform:translateY(0)"], [d, "transform:translateY(0)"], [d + 6, "transform:translateY(-5px)"], [d + 12, "transform:translateY(0)"], [100, "transform:translateY(0)"]]) + bind(`.od-solid-${i}`, `odSolid${i}`, 5, "ease-in-out");
  const css = letters.map((_, i) => one(i, i * 16)).join("");
  return fig("solid", 300, 174, "The five SOLID principles as five badges", "Five circular badges labeled S, O, L, I, D in a row, each with a short caption underneath: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.", inner) + `<style>${css}</style>`;
}

export default {
  bundle, blueprint, construct, encapsulate, abstract: abstractFig, inherit, polymorph,
  overloadOverride, abstractVsInterface, accessRings, staticShared, thisSuper, objectRoot,
  compositionVsInheritance, solid,
};
