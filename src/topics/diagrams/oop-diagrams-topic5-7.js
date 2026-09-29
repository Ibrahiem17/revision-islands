/**
 * OOP note diagrams — Phase 2B: Topic 5 · Abstraction (abs-1..abs-8),
 * Topic 6 · Inheritance (inh-1..inh-11), Topic 7 · Polymorphism (poly-1..poly-9).
 * See src/topics/diagrams/oop-diagram-kit.js for the shared style contract, and
 * oop-diagrams-qr.js / oop-diagrams-topic1.js / oop-diagrams-topic2-4.js for the established
 * visual language this file matches (thick ink outlines, flat od-* fills, no faces).
 *
 * Some qa items are intentionally skipped where they would just restate another item's diagram
 * in the same topic (same precedent as Phase 2A skipping obj-7/ctor-7/enc-7/enc-8) — see the
 * export list at the bottom and the phase report for the full accounting.
 */
import {
  fig, keyframes, bind, sparkle, arrowDown, arrowRight, arrowLeft,
  box, badge, padlock, hood, gear, TICK, CROSS,
} from "./oop-diagram-kit.js";

/** simple remote-control silhouette (rounded body + three buttons), ~32 wide x 76 tall unscaled,
 * origin at its own center; used only in this file (Abstraction's "simple interface" analogy —
 * deliberately NOT the car/steering-wheel already used in Topic 1, per the phase brief). */
function remote(cx, cy, scale, cls = "od-p") {
  return `<g transform="translate(${cx},${cy}) scale(${scale})">
    <rect class="od-k ${cls}" x="-16" y="-38" width="32" height="76" rx="14"/>
    <circle class="od-k od-yfill" cx="0" cy="-20" r="7"/>
    <circle class="od-k od-inkfill" cx="-8" cy="2" r="5"/>
    <circle class="od-k od-inkfill" cx="8" cy="2" r="5"/>
    <rect class="od-k od-inkfill" x="-10" y="16" width="20" height="8" rx="4"/>
  </g>`;
}

// =====================================================================
// Topic 5 · Abstraction
// =====================================================================

// ---------- abs-1: a simple interface (remote) hides complexity behind a boundary ----------
function simpleInterfaceHidesComplexity() {
  const inner = `
    <text class="od-t" x="10" y="20">A simple interface hides</text>
    <text class="od-t" x="10" y="38">the complexity behind it</text>
    ${remote(68, 104, 1)}
    <text class="od-s" x="68" y="156" text-anchor="middle">one button</text>
    <line class="od-k od-t od-dash" x1="146" y1="54" x2="146" y2="150"/>
    <g class="od-abs1-g1">${gear(214, 82, 15, 7, "od-p od-t")}</g>
    <g class="od-abs1-g2">${gear(244, 110, 10, 6, "od-p od-t")}</g>
    <path class="od-k od-t" d="M198,124C216,116 208,138 228,132" fill="none"/>
    <text class="od-s" x="228" y="156" text-anchor="middle">hidden wiring</text>
    <text class="od-cap" x="10" y="176">press the button — the wiring underneath stays out of sight</text>`;
  const css = keyframes("odAbs1G1", 6, [[0, "transform:rotate(0deg)"], [100, "transform:rotate(360deg)"]]) +
    keyframes("odAbs1G2", 4.4, [[0, "transform:rotate(0deg)"], [100, "transform:rotate(-360deg)"]]) +
    `.note-diagram.is-playing .od-abs1-g1{animation:odAbs1G1 6s linear infinite;transform-origin:214px 82px}
     .note-diagram.is-playing .od-abs1-g2{animation:odAbs1G2 4.4s linear infinite;transform-origin:244px 110px}`;
  return fig("simpleInterfaceHidesComplexity", 300, 182, "A simple interface hides complexity behind it", "A remote control with one visible button sits left of a dashed boundary line. Behind the line, two small gears and a squiggle labeled hidden wiring represent the complexity the user never sees.", inner) + `<style>${css}</style>`;
}

// ---------- abs-2: encapsulation (hide data) vs abstraction (hide complexity) ----------
function encapsulationVsAbstractionHides() {
  const inner = `
    <text class="od-t" x="10" y="20">Hides DATA vs hides COMPLEXITY</text>
    <line class="od-k od-t od-dash" x1="150" y1="30" x2="150" y2="160"/>
    <text class="od-b" x="76" y="48" text-anchor="middle">ENCAPSULATION</text>
    ${padlock(76, 92, 1.15, "od-yfill")}
    <text class="od-s" x="76" y="138" text-anchor="middle">hides data</text>
    <text class="od-b" x="224" y="48" text-anchor="middle">ABSTRACTION</text>
    ${hood(224, 96, 0.92)}
    <text class="od-s" x="224" y="138" text-anchor="middle">hides complexity</text>
    <text class="od-cap" x="10" y="174">different problems: storage vs complexity</text>`;
  return fig("encapsulationVsAbstractionHides", 300, 182, "Encapsulation hides data, abstraction hides complexity", "Left: a padlock labeled ENCAPSULATION, hides data. Right: a curtained hood shape labeled ABSTRACTION, hides complexity — two related but different ideas, split by a dashed divider.", inner);
}

// ---------- abs-3: start() public, checkFuel()/igniteEngine() hidden as private methods ----------
function startHidesPrivateMethods() {
  const inner = `
    <text class="od-t" x="10" y="20">start() is simple —</text>
    <text class="od-t" x="10" y="38">the real work stays hidden</text>
    ${box(110, 48, 80, 30, "od-k od-greenfill", 8)}
    <text class="od-s od-onink" x="150" y="68" text-anchor="middle">start()</text>
    ${arrowDown(150, 90)}
    ${box(40, 92, 220, 68, "od-k od-inkfill", 12)}
    <text class="od-b od-onink" x="150" y="108" text-anchor="middle">private</text>
    ${box(50, 114, 100, 34, "od-k od-p", 6)}
    <text class="od-s" x="100" y="135" text-anchor="middle">checkFuel()</text>
    ${box(152, 114, 100, 34, "od-k od-p", 6)}
    <text class="od-s" x="202" y="135" text-anchor="middle">igniteEngine()</text>
    <text class="od-cap" x="10" y="174">the caller never sees either private method run</text>`;
  return fig("startHidesPrivateMethods", 300, 182, "start() is the simple interface; checkFuel() and igniteEngine() are hidden private methods", "A green start() box has an arrow down into a black private panel containing two boxes, checkFuel() and igniteEngine() — the real complexity, hidden behind one simple public method.", inner);
}

// ---------- abs-4: two roads to abstraction (abstract classes + interfaces), lightweight preview ----------
function twoRoadsToAbstraction() {
  const inner = `
    <text class="od-t" x="10" y="20">Two roads to abstraction</text>
    ${box(20, 40, 120, 34, "od-k od-p", 8)}
    <text class="od-s" x="80" y="61" text-anchor="middle">abstract class</text>
    ${box(160, 40, 120, 34, "od-k od-p", 8)}
    <text class="od-s" x="220" y="61" text-anchor="middle">interface</text>
    <path class="od-k" d="M80,74C110,92 130,100 142,108"/>
    <path class="od-k" d="M220,74C190,92 170,100 158,108"/>
    ${arrowDown(150, 114)}
    ${box(90, 116, 120, 34, "od-k od-inkfill", 10)}
    <text class="od-b od-onink" x="150" y="137" text-anchor="middle">ABSTRACTION</text>
    <text class="od-cap" x="10" y="168">both covered fully in Topic 9 — just know they both exist</text>`;
  return fig("twoRoadsToAbstraction", 300, 182, "Two roads to abstraction: abstract classes and interfaces", "Two boxes, abstract class and interface, each with an arrow converging down into one box labeled ABSTRACTION — two different language tools for the same design goal.", inner);
}

// ---------- abs-8 (key takeaway): one call in, complexity stays hidden ----------
function abstractionTakeaway() {
  const inner = `
    ${box(90, 26, 120, 32, "od-k od-p od-dash", 8)}
    <text class="od-s" x="150" y="47" text-anchor="middle">myCar.start()</text>
    ${arrowDown(150, 74)}
    <g class="od-abs8-gear">${gear(150, 92, 16, 7, "od-p od-t")}</g>
    ${arrowDown(150, 120)}
    ${box(70, 120, 160, 32, "od-k od-greenfill", 10)}
    <text class="od-b od-onink" x="150" y="141" text-anchor="middle">Car started!</text>
    <rect class="od-k" x="20" y="156" width="260" height="10" rx="4"/>
    <text class="od-cap" x="150" y="180" text-anchor="middle">one call in, complexity stays hidden</text>`;
  const css = keyframes("odAbs8GearSpin", 3.4, [[0, "transform:rotate(0deg)"], [100, "transform:rotate(360deg)"]]) + `.note-diagram.is-playing .od-abs8-gear{animation:odAbs8GearSpin 3.4s linear infinite;transform-origin:150px 92px}`;
  return fig("abstractionTakeaway", 300, 190, "One simple call in, the complexity stays hidden", "A dashed myCar.start() box has an arrow down into a gear icon (the hidden implementation), then another arrow down into a green box reading Car started! — resting on a ground line.", inner) + `<style>${css}</style>`;
}

// =====================================================================
// Topic 6 · Inheritance
// =====================================================================

// ---------- inh-1: parent class -> child class, extends arrow, free fields+methods ----------
function parentChildExtends() {
  const inner = `
    <text class="od-t" x="10" y="20">A child class extends a parent</text>
    ${box(80, 30, 140, 40, "od-k od-p", 10)}
    <text class="od-b" x="150" y="55" text-anchor="middle">Parent class</text>
    ${arrowDown(150, 88)}
    <text class="od-cap" x="150" y="80" text-anchor="middle">extends</text>
    ${box(50, 90, 200, 60, "od-k od-greenfill", 10)}
    <text class="od-b od-onink" x="150" y="112" text-anchor="middle">Child extends Parent</text>
    <text class="od-s od-onink" x="150" y="132" text-anchor="middle">fields + methods, for free</text>
    <text class="od-cap" x="10" y="172">extends means: inherit everything above, for free</text>`;
  return fig("parentChildExtends", 300, 182, "A parent class box with an extends arrow into a child class box", "A box labeled Parent class sits above a downward arrow labeled extends, into a larger green box labeled Child extends Parent, which gets the parent's fields and methods for free.", inner);
}

// ---------- inh-2: Animal(name, eat()) -> Dog extends Animal(adds bark()) ----------
function animalDogExtends() {
  const inner = `
    <text class="od-t" x="10" y="16">Dog extends Animal</text>
    ${box(70, 22, 160, 48, "od-k od-p", 10)}
    <line class="od-k" x1="70" y1="46" x2="230" y2="46"/>
    <text class="od-b" x="150" y="38" text-anchor="middle">Animal</text>
    <text class="od-s" x="150" y="62" text-anchor="middle">name, eat()</text>
    ${arrowDown(150, 88)}
    ${box(40, 90, 220, 72, "od-k od-greenfill", 10)}
    <text class="od-b od-onink" x="150" y="112" text-anchor="middle">Dog extends Animal</text>
    <text class="od-s od-onink" x="150" y="132" text-anchor="middle">name + eat() — free</text>
    <text class="od-s od-onink" x="150" y="150" text-anchor="middle">+ its own bark()</text>
    <text class="od-cap" x="10" y="174">Dog gets Animal's stuff for free, adds its own</text>`;
  return fig("animalDogExtends", 300, 182, "Animal with name and eat(), Dog extends Animal and adds bark()", "A box labeled Animal (fields: name, method: eat()) sits above an arrow into a green box labeled Dog extends Animal, which gets name and eat() for free and adds its own bark().", inner);
}

// ---------- inh-3: a Dog object calling an inherited method and its own method ----------
function dogCallsBothMethods() {
  const inner = `
    <text class="od-t" x="10" y="20">myDog can call both</text>
    ${box(110, 30, 80, 34, "od-k od-greenfill", 10)}
    <text class="od-b od-onink" x="150" y="52" text-anchor="middle">myDog</text>
    <path class="od-k" d="M128,64C108,76 90,84 78,90"/>${arrowDown(76, 96)}
    <path class="od-k" d="M172,64C192,76 210,84 222,90"/>${arrowDown(224, 96)}
    ${box(20, 96, 112, 52, "od-k od-p", 8)}
    <text class="od-s" x="76" y="118" text-anchor="middle">eat()</text>
    <text class="od-cap" x="76" y="136" text-anchor="middle">inherited from Animal</text>
    ${box(168, 96, 112, 52, "od-k od-p", 8)}
    <text class="od-s" x="224" y="118" text-anchor="middle">bark()</text>
    <text class="od-cap" x="224" y="136" text-anchor="middle">Dog's own method</text>
    <text class="od-cap" x="10" y="172">one object, methods from itself and its parent</text>`;
  return fig("dogCallsBothMethods", 300, 182, "A Dog object calling both an inherited method and its own method", "A green myDog box has two arrows fanning down: one to a box labeled eat(), inherited from Animal, and one to a box labeled bark(), Dog's own method.", inner);
}

// ---------- inh-4: the is-a test, Dog/Animal vs Engine/Car ----------
function isARelationshipTest() {
  const inner = `
    <text class="od-t" x="10" y="18">The "is-a" test</text>
    <text class="od-b" x="16" y="44">Dog IS AN Animal</text>
    ${badge(262, 40, 15, "od-greenfill", `<path class="od-k" d="${TICK}"/>`)}
    <text class="od-cap" x="16" y="62">a genuine is-a relationship — inherit</text>
    <line class="od-k od-t od-dash" x1="10" y1="76" x2="290" y2="76"/>
    <text class="od-b" x="16" y="102">Engine IS A Car</text>
    ${badge(262, 98, 15, "od-salmonfill", `<path class="od-k" d="${CROSS}"/>`)}
    <text class="od-cap" x="16" y="120">that's has-a, not is-a — don't inherit</text>
    <text class="od-cap" x="10" y="164">only use inheritance for a genuine "is-a"</text>`;
  return fig("isARelationshipTest", 300, 182, "The is-a test: Dog is an Animal passes, Engine is a Car fails", "Dog IS AN Animal, marked with a green checkmark — a genuine is-a relationship worth inheriting. Below, Engine IS A Car is marked with a red cross — that's a has-a relationship, not is-a, so it shouldn't inherit.", inner);
}

// ---------- inh-5: single inheritance only, one parent allowed vs two parents crossed out ----------
function singleInheritanceOnly() {
  const inner = `
    <text class="od-t" x="10" y="18">Java: single inheritance only</text>
    <line class="od-k od-t od-dash" x1="150" y1="26" x2="150" y2="162"/>
    ${box(24, 32, 90, 26, "od-k od-p", 6)}
    <text class="od-s" x="69" y="49" text-anchor="middle">Parent</text>
    ${arrowDown(69, 78)}
    ${box(24, 80, 90, 28, "od-k od-greenfill", 6)}
    <text class="od-s od-onink" x="69" y="98" text-anchor="middle">Child</text>
    ${badge(69, 128, 13, "od-greenfill", `<path class="od-k" d="${TICK}" transform="scale(0.9)"/>`)}
    <text class="od-cap" x="69" y="152" text-anchor="middle">allowed</text>
    ${box(166, 26, 58, 26, "od-k od-p", 6)}
    <text class="od-s" x="195" y="43" text-anchor="middle">P1</text>
    ${box(230, 26, 58, 26, "od-k od-p", 6)}
    <text class="od-s" x="259" y="43" text-anchor="middle">P2</text>
    <path class="od-k" d="M195,52C205,64 215,70 222,76"/>
    <path class="od-k" d="M259,52C245,64 235,70 228,76"/>
    ${box(190, 78, 60, 28, "od-k od-salmonfill", 6)}
    <text class="od-s od-onink" x="220" y="96" text-anchor="middle">Child</text>
    ${badge(220, 126, 13, "od-salmonfill", `<path class="od-k" d="${CROSS}" transform="scale(0.9)"/>`)}
    <text class="od-cap" x="220" y="150" text-anchor="middle">not allowed</text>
    <text class="od-cap" x="10" y="176">use interfaces instead, for more than one</text>`;
  return fig("singleInheritanceOnly", 300, 182, "A Java class can extend only one parent, not two", "Left: one Child class with one arrow up to one Parent, marked allowed. Right: a Child class with two arrows up to two parents P1 and P2, marked not allowed with a cross — Java only supports single inheritance for classes.", inner);
}

// ---------- inh-6: overriding makeSound(), Dog's version replaces Animal's ----------
function overrideMakeSound() {
  const inner = `
    <text class="od-t" x="10" y="18">Same signature, new behavior</text>
    ${box(16, 28, 120, 50, "od-k od-p", 8)}
    <text class="od-b" x="76" y="48" text-anchor="middle">Animal</text>
    <text class="od-s" x="76" y="68" text-anchor="middle">makeSound()</text>
    ${arrowRight(150, 52)}
    <text class="od-cap" x="150" y="42" text-anchor="middle">@Override</text>
    ${box(164, 28, 120, 50, "od-k od-greenfill", 8)}
    <text class="od-b od-onink" x="224" y="48" text-anchor="middle">Dog</text>
    <text class="od-s od-onink" x="224" y="68" text-anchor="middle">makeSound()</text>
    ${arrowDown(224, 100)}
    ${box(180, 102, 88, 32, "od-k od-yfill", 16)}
    <text class="od-b" x="224" y="123" text-anchor="middle">"Woof!"</text>
    <text class="od-cap" x="10" y="160">Dog's version replaces Animal's, for Dog objects</text>`;
  return fig("overrideMakeSound", 300, 182, "Dog overrides Animal's makeSound(), producing Woof!", "Animal's makeSound() box on the left, an @Override arrow into Dog's own makeSound() box on the right, with an arrow down into a speech-bubble-style box reading \"Woof!\" — Dog's version replaces Animal's.", inner);
}

// ---------- inh-7 (table): inheritance vocabulary, in one picture ----------
function inheritanceVocabIcons() {
  const inner = `
    <text class="od-t" x="10" y="20">Vocabulary, in one picture</text>
    ${box(20, 44, 110, 32, "od-k od-p od-dash", 8)}
    <text class="od-s" x="75" y="65" text-anchor="middle">Superclass</text>
    <text class="od-cap" x="150" y="60" text-anchor="middle">extends</text>
    ${arrowRight(150, 60)}
    ${box(170, 44, 110, 32, "od-k od-greenfill", 8)}
    <text class="od-s od-onink" x="225" y="65" text-anchor="middle">Subclass</text>
    <text class="od-cap" x="10" y="102">aka Parent/Base class -&gt; Child/Derived class</text>
    <text class="od-cap" x="10" y="122">Overriding = the child replacing a parent's method</text>`;
  return fig("inheritanceVocabIcons", 300, 150, "Superclass and Subclass, connected by extends", "A dashed box labeled Superclass has an arrow labeled extends into a green box labeled Subclass, with two caption lines listing the alternate names (Parent/Base, Child/Derived) and defining overriding.", inner);
}

// ---------- inh-11 (key takeaway): parent's foundation, child stands on it for free ----------
function inheritanceTakeaway() {
  const inner = `
    ${box(70, 26, 160, 36, "od-k od-p od-t od-dash", 10)}
    <text class="od-b" x="150" y="49" text-anchor="middle">PARENT class</text>
    ${arrowDown(150, 80)}
    ${box(90, 84, 120, 68, "od-k od-greenfill", 10)}
    <text class="od-b od-onink" x="150" y="105" text-anchor="middle">CHILD</text>
    <text class="od-s od-onink" x="150" y="123" text-anchor="middle">extends Parent</text>
    <text class="od-s od-onink" x="150" y="140" text-anchor="middle">+ own extras</text>
    <rect class="od-k" x="20" y="160" width="260" height="10" rx="4"/>
    <text class="od-cap" x="150" y="182" text-anchor="middle">free inheritance, plus its own extras</text>`;
  return fig("inheritanceTakeaway", 300, 190, "A child class stands on its parent's foundation, for free", "A dashed PARENT class box has an arrow down into a green CHILD box (extends Parent, plus own extras), resting on a ground line — the child gets everything above for free.", inner);
}

// =====================================================================
// Topic 7 · Polymorphism
// =====================================================================

// ---------- poly-1: one call, different result depending on the object ----------
function oneCallDifferentResult() {
  const inner = `
    <text class="od-t" x="10" y="20">Same call, different object,</text>
    <text class="od-t" x="10" y="38">different result</text>
    ${box(112, 46, 76, 34, "od-k od-p", 8)}
    <text class="od-s" x="150" y="67" text-anchor="middle">.makeSound()</text>
    <path class="od-k" d="M126,80C108,88 96,94 86,100"/>${arrowDown(84, 106)}
    <path class="od-k" d="M174,80C192,88 204,94 214,100"/>${arrowDown(216, 106)}
    ${box(28, 106, 112, 52, "od-k od-salmonfill", 8)}
    <text class="od-b od-onink" x="84" y="128" text-anchor="middle">Dog</text>
    <text class="od-s od-onink" x="84" y="146" text-anchor="middle">"Woof!"</text>
    ${box(160, 106, 112, 52, "od-k od-yfill", 8)}
    <text class="od-b" x="216" y="128" text-anchor="middle">Cat</text>
    <text class="od-s" x="216" y="146" text-anchor="middle">"Meow!"</text>
    <text class="od-cap" x="10" y="174">same call, different sound per object</text>`;
  return fig("oneCallDifferentResult", 300, 182, "One method call, pointing to either a Dog or a Cat, each producing different output", "A box labeled .makeSound() has two arrows fanning down: one to a Dog box producing Woof!, one to a Cat box producing Meow! — the same call, different results.", inner);
}

// ---------- poly-2: myPet reassigned from Dog to Cat, same call site, different output ----------
function samePetLineDifferentOutput() {
  const inner = `
    <text class="od-t" x="10" y="18">Same line, different result</text>
    <text class="od-s" x="16" y="42">myPet = new Dog();</text>
    <text class="od-s" x="16" y="60">myPet.makeSound();</text>
    ${arrowRight(184, 52)}
    ${box(200, 36, 82, 32, "od-k od-salmonfill", 8)}
    <text class="od-b od-onink" x="241" y="57" text-anchor="middle">Woof!</text>
    <line class="od-k od-t od-dash" x1="10" y1="78" x2="290" y2="78"/>
    <text class="od-cap" x="150" y="92" text-anchor="middle">reassigned later...</text>
    <text class="od-s" x="16" y="114">myPet = new Cat();</text>
    <text class="od-s" x="16" y="132">myPet.makeSound();</text>
    ${arrowRight(184, 124)}
    ${box(200, 108, 82, 32, "od-k od-yfill", 8)}
    <text class="od-b" x="241" y="129" text-anchor="middle">Meow!</text>
    <text class="od-cap" x="10" y="166">same call site, different object each time</text>`;
  return fig("samePetLineDifferentOutput", 300, 182, "myPet reassigned from Dog to Cat, the exact same makeSound() call line producing different output", "myPet = new Dog(); myPet.makeSound(); produces Woof!. After myPet is reassigned to new Cat(), the exact same myPet.makeSound() line produces Meow! instead — the declared type stays Animal, the actual object decides the result.", inner);
}

// ---------- poly-3: one loop, each animal handles its own sound, no manual type-checking ----------
function oneLoopHandlesEveryType() {
  const inner = `
    <text class="od-t" x="10" y="18">One loop handles every type</text>
    ${box(100, 26, 100, 28, "od-k od-p", 8)}
    <text class="od-s" x="150" y="45" text-anchor="middle">for each animal</text>
    <path class="od-k" d="M120,54C96,66 74,76 62,86"/>${arrowDown(60, 92)}
    <path class="od-k" d="M150,54V86"/>${arrowDown(150, 92)}
    <path class="od-k" d="M180,54C204,66 226,76 238,86"/>${arrowDown(240, 92)}
    ${box(24, 92, 72, 46, "od-k od-salmonfill", 8)}
    <text class="od-b od-onink" x="60" y="110" text-anchor="middle">Dog</text>
    <text class="od-s od-onink" x="60" y="128" text-anchor="middle">Woof!</text>
    ${box(114, 92, 72, 46, "od-k od-yfill", 8)}
    <text class="od-b" x="150" y="110" text-anchor="middle">Cat</text>
    <text class="od-s" x="150" y="128" text-anchor="middle">Meow!</text>
    ${box(204, 92, 72, 46, "od-k od-greenfill", 8)}
    <text class="od-b od-onink" x="240" y="110" text-anchor="middle">Bird</text>
    <text class="od-s od-onink" x="240" y="128" text-anchor="middle">Tweet!</text>
    <text class="od-cap" x="10" y="164">no manual type-checking — each object just knows</text>`;
  return fig("oneLoopHandlesEveryType", 300, 182, "One loop fans out to Dog, Cat and Bird, each handling its own sound", "A box labeled for each animal has three arrows fanning down to Dog (Woof!), Cat (Meow!) and Bird (Tweet!) — one loop, zero manual type-checking, each object correctly handling itself.", inner);
}

// ---------- poly-4: two kinds of polymorphism, lightweight (pairs with Topic 8) ----------
function twoKindsOfPolymorphism() {
  const inner = `
    <text class="od-t" x="10" y="20">Two kinds of polymorphism</text>
    <line class="od-k od-t od-dash" x1="150" y1="30" x2="150" y2="150"/>
    <text class="od-b" x="76" y="50" text-anchor="middle">RUNTIME</text>
    <text class="od-s" x="76" y="68" text-anchor="middle">(overriding)</text>
    <g class="od-poly4-gear">${gear(76, 102, 17, 8, "od-yfill od-t")}</g>
    <text class="od-s" x="76" y="134" text-anchor="middle">decided while running</text>
    <text class="od-b" x="224" y="50" text-anchor="middle">COMPILE-TIME</text>
    <text class="od-s" x="224" y="68" text-anchor="middle">(overloading)</text>
    ${box(204, 84, 40, 34, "od-k od-p", 8)}
    <text class="od-s" x="224" y="106" text-anchor="middle">{ }</text>
    <text class="od-s" x="224" y="134" text-anchor="middle">decided before running</text>
    <text class="od-cap" x="150" y="166" text-anchor="middle">the same idea covered fully in Topic 8</text>`;
  const css = keyframes("odPoly4GearSpin", 4.4, [[0, "transform:rotate(0deg)"], [100, "transform:rotate(360deg)"]]) + `.note-diagram.is-playing .od-poly4-gear{animation:odPoly4GearSpin 4.4s linear infinite;transform-origin:76px 102px}`;
  return fig("twoKindsOfPolymorphism", 300, 182, "Runtime polymorphism (overriding) versus compile-time polymorphism (overloading)", "Left: RUNTIME (overriding), decided while the program runs. Right: COMPILE-TIME (overloading), decided before it ever runs — a lightweight preview, covered fully in Topic 8.", inner) + `<style>${css}</style>`;
}

// ---------- poly-5: Shape[] holding Circle + Rectangle, each computing its own area() ----------
function shapeArrayEachOwnArea() {
  const inner = `
    <text class="od-t" x="10" y="20">Shape[] — each computes</text>
    <text class="od-t" x="10" y="38">its own area()</text>
    ${box(60, 48, 180, 30, "od-k od-p od-dash", 8)}
    <text class="od-s" x="150" y="68" text-anchor="middle">Shape[] shapes</text>
    <path class="od-k" d="M120,78C104,88 92,94 85,100"/>${arrowDown(84, 106)}
    <path class="od-k" d="M180,78C196,88 208,94 215,100"/>${arrowDown(216, 106)}
    ${box(28, 106, 112, 52, "od-k od-salmonfill", 8)}
    <text class="od-b od-onink" x="84" y="128" text-anchor="middle">Circle</text>
    <text class="od-s od-onink" x="84" y="146" text-anchor="middle">area() = pi*r*r</text>
    ${box(160, 106, 112, 52, "od-k od-yfill", 8)}
    <text class="od-b" x="216" y="128" text-anchor="middle">Rectangle</text>
    <text class="od-s" x="216" y="146" text-anchor="middle">area() = w*h</text>
    <text class="od-cap" x="10" y="174">same .area() call, correct formula every time</text>`;
  return fig("shapeArrayEachOwnArea", 300, 182, "A Shape array holding a Circle and a Rectangle, each computing its own area()", "A dashed Shape[] shapes box has two arrows fanning down to a Circle box (area = pi times r squared) and a Rectangle box (area = width times height) — the same .area() call, a different correct formula each time.", inner);
}

// ---------- poly-9 (key takeaway): one call, three columns each handling itself correctly ----------
function polymorphismTakeaway() {
  const cols = [
    { cx: 80, label: "Dog", cls: "od-salmonfill" },
    { cx: 150, label: "Cat", cls: "od-yfill" },
    { cx: 220, label: "Bird", cls: "od-greenfill" },
  ];
  const inner = `
    ${box(90, 22, 120, 30, "od-k od-p od-dash", 8)}
    <text class="od-s" x="150" y="42" text-anchor="middle">.makeSound()</text>
    <path class="od-k" d="M118,52C102,60 92,66 84,72"/>${arrowDown(80, 78)}
    <path class="od-k" d="M150,52V72"/>${arrowDown(150, 78)}
    <path class="od-k" d="M182,52C198,60 208,66 216,72"/>${arrowDown(220, 78)}
    ${cols.map((c, i) => `<rect class="od-k od-t ${c.cls} od-polyt-${i}" x="${c.cx - 24}" y="80" width="48" height="62" rx="8"/><text class="od-s od-onink" x="${c.cx}" y="116" text-anchor="middle">${c.label}</text>`).join("")}
    <rect class="od-k" x="20" y="142" width="260" height="10" rx="4"/>
    <text class="od-cap" x="150" y="166" text-anchor="middle">one call, correct behavior per object</text>`;
  const one = (i, d) => keyframes(`odPolyT${i}`, 4, [[0, "transform:translateY(0)"], [d, "transform:translateY(0)"], [d + 8, "transform:translateY(-3px)"], [d + 16, "transform:translateY(0)"], [100, "transform:translateY(0)"]]) + bind(`.od-polyt-${i}`, `odPolyT${i}`, 4);
  const css = cols.map((_, i) => one(i, i * 14)).join("");
  return fig("polymorphismTakeaway", 300, 182, "One call, three objects, each correctly handling itself", "A dashed .makeSound() box has three arrows fanning down to three standing columns, Dog, Cat and Bird, all resting on a common ground line — one call, correct behavior per object, automatically.", inner) + `<style>${css}</style>`;
}

export default {
  simpleInterfaceHidesComplexity, encapsulationVsAbstractionHides, startHidesPrivateMethods,
  twoRoadsToAbstraction, abstractionTakeaway,
  parentChildExtends, animalDogExtends, dogCallsBothMethods, isARelationshipTest,
  singleInheritanceOnly, overrideMakeSound, inheritanceVocabIcons, inheritanceTakeaway,
  oneCallDifferentResult, samePetLineDifferentOutput, oneLoopHandlesEveryType,
  twoKindsOfPolymorphism, shapeArrayEachOwnArea, polymorphismTakeaway,
};
