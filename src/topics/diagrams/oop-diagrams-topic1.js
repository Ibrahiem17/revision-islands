/**
 * OOP note diagrams — Topic 1 · What is OOP? (intro-1..intro-7), the flagship topic section.
 * See src/topics/diagrams/oop-diagram-kit.js for the shared style contract.
 */
import { fig, keyframes, bind, sparkle, arrowDown, box, car, padlock, hood } from "./oop-diagram-kit.js";

// ---------- intro-1: a Car object bundles data + behavior ----------
function objectBundleCar() {
  const inner = `
    <text class="od-t" x="10" y="22">An object = data</text>
    <text class="od-t" x="10" y="40">+ behavior, together</text>
    ${car(76, 92, 1.15)}
    ${box(120, 56, 168, 90, "od-k od-greenfill", 12)}
    <text class="od-b od-onink" x="204" y="78" text-anchor="middle">Car object</text>
    <text class="od-s od-onink" x="204" y="98" text-anchor="middle">color, speed (data)</text>
    <text class="od-s od-onink" x="204" y="115" text-anchor="middle">drive() (behavior)</text>
    ${sparkle(292, 60, 8, "od-yfill od-t1-spark")}
    <text class="od-cap" x="10" y="172">one self-contained thing, not scattered variables + functions</text>`;
  const css = keyframes("odT1BundleSpark", 2.4, [[0, "transform:scale(1) rotate(0deg)"], [50, "transform:scale(1.3) rotate(-12deg)"], [100, "transform:scale(1) rotate(0deg)"]]) + bind(".od-t1-spark", "odT1BundleSpark", 2.4);
  return fig("t1bundle", 300, 182, "An object bundles data and behavior", "A small car illustration next to a green box labeled Car object, listing color and speed as data and drive() as behavior, all bundled inside one object.", inner) + `<style>${css}</style>`;
}

// ---------- intro-2: procedural mess vs OOP order ----------
function messyVsOrganized() {
  const inner = `
    <text class="od-t" x="10" y="20">Procedural mess -&gt; OOP order</text>
    <line class="od-k od-t od-dash" x1="150" y1="28" x2="150" y2="168"/>
    <g class="od-mess">
      <path class="od-k od-t" d="M24,60C50,44 34,90 62,78C40,110 70,96 50,130" fill="none"/>
      <circle class="od-k od-p" cx="24" cy="60" r="7"/><circle class="od-k od-p" cx="62" cy="78" r="7"/>
      <circle class="od-k od-p" cx="50" cy="130" r="7"/><circle class="od-k od-p" cx="100" cy="108" r="7"/>
      <path class="od-k od-t" d="M62,78L100,108" fill="none"/>
    </g>
    <text class="od-cap" x="14" y="150">data + functions scattered, tangled</text>
    ${box(176, 50, 108, 40, "od-k od-greenfill", 10)}<text class="od-s od-onink" x="230" y="74" text-anchor="middle">Object: data</text>
    ${box(176, 98, 108, 40, "od-k od-greenfill", 10)}<text class="od-s od-onink" x="230" y="122" text-anchor="middle">+ methods</text>
    <text class="od-cap" x="176" y="150">bundled together, self-contained</text>`;
  const css = keyframes("odMessWiggle", 3.6, [[0, "transform:rotate(0deg)"], [50, "transform:rotate(2deg)"], [100, "transform:rotate(0deg)"]]) + bind(".od-mess", "odMessWiggle", 3.6, "ease-in-out");
  return fig("proceduralMess", 300, 182, "Procedural mess versus OOP order", "Left: a tangled squiggly line connecting scattered dots, representing procedural code where data and functions live far apart. Right: two clean stacked green boxes, one for data and one for methods, bundled together as one object.", inner) + `<style>${css}</style>`;
}

// ---------- intro-3: the four pillars, as icon badges ----------
function fourPillars() {
  const cols = [40, 120, 200, 280];
  const labels = ["Encapsulation", "Abstraction", "Inheritance", "Polymorphism"];
  const icon = (i, cx) => {
    if (i === 0) return padlock(cx, 70, 1.15, "od-yfill");
    if (i === 1) return hood(cx, 74, 0.95);
    if (i === 2) return `<g transform="translate(${cx},70)">${box(-16, -22, 32, 16, "od-k od-p", 4)}<path class="od-k" d="M0,-6V6"/><path d="M-6,3L0,9L6,3" class="od-k"/>${box(-16, 10, 32, 16, "od-k od-greenfill", 4)}</g>`;
    return `<g transform="translate(${cx},70)"><circle class="od-k od-salmonfill" cx="-12" cy="6" r="11"/><rect class="od-k od-yfill" x="2" y="-6" width="18" height="18" rx="4"/></g>`;
  };
  const inner = `
    <text class="od-t" x="10" y="20">The four pillars</text>
    ${cols.map((cx, i) => `<g class="od-pillar od-pillar-${i}">${icon(i, cx)}</g><text class="od-s" x="${cx}" y="118" text-anchor="middle">${labels[i]}</text>`).join("")}
    <text class="od-cap" x="10" y="164">every OOP idea traces back to one of these four</text>`;
  const one = (i, d) => keyframes(`odPillar${i}`, 4.8, [[0, "transform:translateY(0)"], [d, "transform:translateY(0)"], [d + 6, "transform:translateY(-4px)"], [d + 12, "transform:translateY(0)"], [100, "transform:translateY(0)"]]) + bind(`.od-pillar-${i}`, `odPillar${i}`, 4.8);
  const css = labels.map((_, i) => one(i, i * 14)).join("");
  return fig("fourPillars", 300, 176, "The four pillars of OOP", "Four icon badges in a row: a padlock for encapsulation, a curtained hood for abstraction, a parent-and-child box pair for inheritance, and overlapping shapes for polymorphism.", inner) + `<style>${css}</style>`;
}

// ---------- intro-4: real-world car analogy ----------
function carAnalogy() {
  const inner = `
    <text class="od-t" x="10" y="20">The four pillars, in a car</text>
    ${car(150, 92, 1.7)}
    <text class="od-s" x="46" y="46">① wheel = abstraction</text>
    <path class="od-k od-t od-dash" d="M60,50C80,58 96,66 108,76" fill="none"/>
    <text class="od-s" x="254" y="46" text-anchor="end">② hood = encapsulation</text>
    <path class="od-k od-t od-dash" d="M240,50C220,58 204,66 192,76" fill="none"/>
    <text class="od-s" x="10" y="150">③ Truck / Sports Car both "are" Vehicles = inheritance</text>
    <text class="od-s" x="10" y="166">④ pressing the pedal does something different per car = polymorphism</text>`;
  const css = keyframes("odCarBob", 3.4, [[0, "transform:translateY(0)"], [50, "transform:translateY(-3px)"], [100, "transform:translateY(0)"]]) + bind(".od-panel svg > g", "odCarBob", 3.4);
  return fig("carAnalogy", 300, 182, "The four pillars mapped onto a real car", "A car illustration with two callouts: the wheel pointing to abstraction, the hood pointing to encapsulation, plus two caption lines explaining inheritance (Truck and Sports Car are both Vehicles) and polymorphism (the pedal behaves differently per vehicle).", inner) + `<style>${css}</style>`;
}

// ---------- intro-5 (qa): four pieces merge into one word, OOP ----------
function puzzleMerge() {
  const piece = (cx, cy, letter, cls) => `<g class="od-piece"><rect class="od-k ${cls}" x="${cx - 17}" y="${cy - 17}" width="34" height="34" rx="7"/><text class="od-b od-onink" x="${cx}" y="${cy + 6}" text-anchor="middle">${letter}</text></g>`;
  const inner = `
    <text class="od-t" x="10" y="22">Four ideas, one sentence</text>
    ${piece(46, 70, "E", "od-yfill")}${piece(96, 70, "A", "od-salmonfill")}${piece(146, 70, "I", "od-greenfill")}${piece(196, 70, "P", "od-yfill")}
    <path class="od-k od-t" d="M46,88C46,110 240,110 240,88" fill="none"/>${arrowDown(240, 92)}
    ${box(196, 96, 88, 42, "od-k od-inkfill", 10)}
    <text class="od-b od-onink" x="240" y="122" text-anchor="middle">OOP</text>
    <text class="od-cap" x="10" y="164">bundles of data + behavior, built on E·A·I·P</text>`;
  const css = keyframes("odPieceSettle", 3, [[0, "transform:translateY(0)"], [50, "transform:translateY(-3px)"], [100, "transform:translateY(0)"]]) + bind(".od-piece", "odPieceSettle", 3, "ease-in-out");
  return fig("puzzleMerge", 300, 174, "Four pillar pieces merging into one idea: OOP", "Four small colored squares labeled E, A, I and P sit in a row, joined by a curved arrow down into a black box labeled OOP — one sentence's worth of idea in one picture.", inner) + `<style>${css}</style>`;
}

// ---------- intro-6 (qa): procedural chain vs OOP object ----------
function proceduralVsOopChain() {
  const inner = `
    <text class="od-t" x="10" y="20">A step-list vs a self-contained object</text>
    <line class="od-k od-t od-dash" x1="150" y1="28" x2="150" y2="168"/>
    ${["startCar()", "driveCar()", "stopCar()"].map((t, i) => `${box(16, 46 + i * 38, 118, 28, "od-k od-p", 6)}<text class="od-s" x="75" y="${64 + i * 38}" text-anchor="middle">${t}</text>${i < 2 ? arrowDown(75, 82 + i * 38) : ""}`).join("")}
    <text class="od-cap" x="14" y="164">shared data lives far away, easy to break</text>
    ${box(176, 60, 108, 88, "od-k od-greenfill", 12)}
    <text class="od-b od-onink" x="230" y="86" text-anchor="middle">Car</text>
    <text class="od-s od-onink" x="230" y="106" text-anchor="middle">owns its data</text>
    <text class="od-s od-onink" x="230" y="122" text-anchor="middle">+ its own methods</text>
    <text class="od-cap" x="176" y="164">each object manages itself</text>`;
  const css = keyframes("odChainPulse", 3.4, [[0, "opacity:1"], [50, "opacity:.5"], [100, "opacity:1"]]) + bind(".od-k.od-dash", "odChainPulse", 3.4);
  return fig("proceduralVsOop", 300, 182, "Procedural steps versus one self-managing object", "Left: three stacked boxes startCar(), driveCar(), stopCar() connected top to bottom like a checklist, with shared data living far away. Right: one green Car box that owns both its data and its methods.", inner) + `<style>${css}</style>`;
}

// ---------- intro-7 (key takeaway): four pillars holding an object up ----------
function pillarsHoldObject() {
  const cols = [50, 110, 190, 250];
  const labels = ["E", "A", "I", "P"];
  const inner = `
    ${box(30, 40, 240, 40, "od-k od-greenfill", 10)}
    <text class="od-b od-onink" x="150" y="65" text-anchor="middle">OBJECT: data + behavior</text>
    ${cols.map((cx, i) => `<rect class="od-k od-t od-yfill od-col od-col-${i}" x="${cx - 12}" y="80" width="24" height="70" rx="6"/><text class="od-b" x="${cx}" y="122" text-anchor="middle">${labels[i]}</text>`).join("")}
    <rect class="od-k" x="20" y="150" width="260" height="10" rx="4"/>
    <text class="od-cap" x="10" y="176">encapsulation · abstraction · inheritance · polymorphism hold it up</text>`;
  const one = (i, d) => keyframes(`odCol${i}`, 4, [[0, "transform:translateY(0)"], [d, "transform:translateY(0)"], [d + 8, "transform:translateY(-3px)"], [d + 16, "transform:translateY(0)"], [100, "transform:translateY(0)"]]) + bind(`.od-col-${i}`, `odCol${i}`, 4);
  const css = labels.map((_, i) => one(i, i * 12)).join("");
  return fig("pillarsHoldObject", 300, 190, "The four pillars holding an object up", "A green box labeled OBJECT: data + behavior rests on four mustard columns labeled E, A, I and P, all standing on a common ground line — the four pillars supporting everything else in OOP.", inner) + `<style>${css}</style>`;
}

export default {
  objectBundleCar, proceduralMess: messyVsOrganized, fourPillars, carAnalogy,
  puzzleMerge, proceduralVsOop: proceduralVsOopChain, pillarsHoldObject,
};
