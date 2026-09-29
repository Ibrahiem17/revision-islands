/**
 * OOP note diagrams — Phase 2D: Topic 11 · The static keyword (stat-1..stat-8), Topic 12 · this &
 * super (thsup-1..thsup-10), Topic 13 · Object class basics — toString, equals, hashCode
 * (objcls-1..objcls-10). See src/topics/diagrams/oop-diagram-kit.js for the shared style contract,
 * and oop-diagrams-qr.js / oop-diagrams-topic1.js / oop-diagrams-topic2-4.js /
 * oop-diagrams-topic5-7.js / oop-diagrams-topic8-10.js for the established visual language this
 * file matches (thick ink outlines, flat od-* fills, no faces).
 *
 * Topics 11-13 each overlap conceptually with an existing Quick Revision diagram (qr's
 * staticShared, thisSuper and objectRoot) — every figure below is a fresh, complementary take
 * built from THIS topic's own code examples (Car.totalCars, MathHelper.square, Car's two
 * constructors, Animal/Dog, Car's toString/equals/hashCode) rather than a re-skin of those summary
 * diagrams. objcls-1 in particular deliberately uses a plain "no extends written" framing instead
 * of qr's objectRoot fan-out, per the phase brief.
 *
 * Some qa items are intentionally skipped where they would just restate another item's diagram in
 * the same topic (same precedent as prior phases): stat-6/stat-7 restate stat-1/stat-4, thsup-7/
 * thsup-8 restate thsup-1/thsup-3, objcls-7/objcls-8/objcls-9 restate objcls-2/objcls-4/objcls-6.
 */
import {
  fig, arrowDown, arrowUp, arrowRight,
  box, badge, TICK, CROSS,
} from "./oop-diagram-kit.js";

// =====================================================================
// Topic 11 · The static keyword
// =====================================================================

// ---------- stat-1: every Car keeps its own data, but shares ONE static box ----------
function staticSharedCounterOwnData() {
  const carBox = (cx, label) => `
    ${box(cx - 43, 44, 86, 40, "od-k od-p", 8)}
    <text class="od-s" x="${cx}" y="60" text-anchor="middle">new Car</text>
    <text class="od-cap" x="${cx}" y="76" text-anchor="middle">${label}</text>`;
  const inner = `
    <text class="od-t" x="10" y="18">Each object's OWN data...</text>
    <text class="od-t" x="10" y="36">...one shared static box</text>
    ${carBox(52, "color: red")}${carBox(150, "color: blue")}${carBox(248, "color: green")}
    <path class="od-k" d="M52,84C52,100 90,108 118,112"/>${arrowDown(122, 116)}
    <path class="od-k" d="M150,84V112"/>${arrowDown(150, 116)}
    <path class="od-k" d="M248,84C248,100 210,108 182,112"/>${arrowDown(178, 116)}
    ${box(70, 116, 160, 40, "od-k od-yfill", 10)}
    <text class="od-b" x="150" y="140" text-anchor="middle">static totalCars</text>
    <text class="od-cap" x="10" y="172">instance data differs — the static field never does</text>`;
  return fig("staticSharedCounterOwnData", 300, 182,
    "Every Car object keeps its own color, but all three point to one shared static counter",
    "Three Car boxes labeled color red, color blue and color green each have an arrow down converging into a single mustard box labeled static totalCars — instance data differs per object, but the static field is the same shared box for all of them.",
    inner);
}

// ---------- stat-2: three new Car() calls incrementing the SAME shared totalCars ----------
function staticFieldIncrementSequence() {
  const step = (y, call, val) => `
    <text class="od-s" x="14" y="${y}">${call}</text>
    ${arrowRight(210, y - 5)}
    <text class="od-b" x="234" y="${y}" text-anchor="middle">${val}</text>`;
  const inner = `
    <text class="od-t" x="10" y="18">Car.totalCars — same box, every time</text>
    ${step(46, 'new Car("red");', "0→1")}
    ${step(78, 'new Car("blue");', "1→2")}
    ${step(110, 'new Car("green");', "2→3")}
    <line class="od-k od-t od-dash" x1="10" y1="126" x2="290" y2="126"/>
    <text class="od-s" x="14" y="150">println(Car.totalCars);</text>
    <text class="od-b" x="234" y="150" text-anchor="middle">3</text>
    <text class="od-cap" x="10" y="174">accessed via the CLASS name, not an object</text>`;
  return fig("staticFieldIncrementSequence", 300, 182,
    "Three new Car calls all increment the same shared Car.totalCars, read through the class name",
    "Three rows, new Car red, new Car blue and new Car green, each with an arrow pointing to the running value of Car.totalCars going 0 to 1, 1 to 2, then 2 to 3. Below, println(Car.totalCars) reads 3, accessed through the class name rather than any one object.",
    inner);
}

// ---------- stat-3: MathHelper.square(5) called directly on the class, no object ----------
function staticMethodDirectClassCall() {
  const inner = `
    <text class="od-t" x="10" y="18">Call it directly on the CLASS</text>
    ${box(90, 30, 120, 34, "od-k od-p", 10)}
    <text class="od-b" x="150" y="52" text-anchor="middle">MathHelper</text>
    <text class="od-s" x="150" y="80" text-anchor="middle">MathHelper.square(5)</text>
    ${arrowDown(150, 92)}
    ${box(90, 92, 120, 34, "od-k od-greenfill", 10)}
    <text class="od-b od-onink" x="150" y="114" text-anchor="middle">25</text>
    <line class="od-k od-t od-dash" x1="10" y1="138" x2="290" y2="138"/>
    <text class="od-s" x="14" y="160">new MathHelper()</text>
    ${badge(250, 155, 14, "od-salmonfill", `<path class="od-k" d="${CROSS}" transform="scale(0.85)"/>`)}
    <text class="od-cap" x="10" y="178">no object ever created — static runs on the class itself</text>`;
  return fig("staticMethodDirectClassCall", 300, 182,
    "MathHelper.square(5) is called directly on the class, with no object ever created",
    "MathHelper.square(5) has an arrow down into a green box reading 25, called directly on the MathHelper class. Below a dashed divider, new MathHelper() is marked with a red cross — no object was ever created to get that result.",
    inner);
}

// ---------- stat-4: static code can't reach into instance data ----------
function staticCannotReachInstance() {
  const inner = `
    <text class="od-t" x="10" y="18">static code can't reach</text>
    <text class="od-t" x="10" y="36">into instance data</text>
    ${box(90, 48, 120, 34, "od-k od-p od-dash", 10)}
    <text class="od-b" x="150" y="70" text-anchor="middle">static square(n)</text>
    <path class="od-k" d="M150,82V102" fill="none"/>
    <text class="od-s" x="150" y="120" text-anchor="middle">this.color</text>
    <circle class="od-k od-salmonfill" cx="150" cy="144" r="18"/>
    <text class="od-b od-onink" x="150" y="150" text-anchor="middle">?</text>
    <text class="od-cap" x="10" y="168">no specific object exists yet — whose color?</text>
    <text class="od-cap" x="10" y="178">compile error: can't reach non-static data</text>`;
  return fig("staticCannotReachInstance", 300, 182,
    "A static method cannot reach into instance data because no specific object necessarily exists",
    "A dashed box labeled static square(n) has a line down toward this.color, blocked by a salmon circle with a question mark — a static method has no specific object to ask, so touching instance data from it is a compile error.",
    inner);
}

// ---------- stat-5 (table): instance vs static, compact two-column compare ----------
function staticInstanceCompactCompare() {
  const inner = `
    <text class="od-t" x="10" y="18">Instance vs static, at a glance</text>
    <line class="od-k od-t od-dash" x1="150" y1="26" x2="150" y2="140"/>
    <text class="od-b" x="76" y="44" text-anchor="middle">INSTANCE</text>
    <text class="od-s" x="16" y="64">belongs to one object</text>
    <text class="od-s" x="16" y="84">one copy per object</text>
    <text class="od-s" x="16" y="104">objectName.field</text>
    <text class="od-s" x="16" y="124">can reach static too</text>
    <text class="od-b" x="224" y="44" text-anchor="middle">STATIC</text>
    <text class="od-s" x="164" y="64">belongs to the class</text>
    <text class="od-s" x="164" y="84">one shared copy</text>
    <text class="od-s" x="164" y="104">ClassName.field</text>
    <text class="od-s" x="164" y="124">can't reach instance data</text>
    <text class="od-cap" x="10" y="160">four rows, condensed to the shape of the difference</text>`;
  return fig("staticInstanceCompactCompare", 300, 182,
    "Instance and static members compared in a compact two-column summary",
    "Left column, INSTANCE: belongs to one object, one copy per object, accessed via objectName.field, can also reach static members. Right column, STATIC: belongs to the class, one shared copy, accessed via ClassName.field, cannot reach instance data.",
    inner);
}

// ---------- stat-8 (key takeaway) ----------
function statTakeaway() {
  const inner = `
    ${box(30, 24, 110, 56, "od-k od-p", 10)}
    <text class="od-b" x="85" y="48" text-anchor="middle">instance</text>
    <text class="od-cap" x="85" y="66" text-anchor="middle">per-object copy</text>
    ${box(160, 24, 110, 56, "od-k od-yfill", 10)}
    <text class="od-b" x="215" y="48" text-anchor="middle">static</text>
    <text class="od-cap" x="215" y="66" text-anchor="middle">one shared copy</text>
    <rect class="od-k" x="20" y="100" width="260" height="10" rx="4"/>
    <text class="od-cap" x="150" y="126" text-anchor="middle">belongs to the class, not any one object —</text>
    <text class="od-cap" x="150" y="142" text-anchor="middle">and can't reach instance data directly</text>`;
  return fig("statTakeaway", 300, 156,
    "static belongs to the class itself, not to any one object",
    "An instance box (per-object copy) beside a mustard static box (one shared copy), resting on a ground line — static belongs to the class, not any one object, and can't reach instance data directly.",
    inner);
}

// =====================================================================
// Topic 12 · this & super
// =====================================================================

// ---------- thsup-1: this.color (the field) vs color (the parameter) ----------
function thisDisambiguateFieldParam() {
  const inner = `
    <text class="od-t" x="10" y="18">Two different "color"s</text>
    ${box(20, 36, 110, 40, "od-k od-yfill", 10)}
    <text class="od-b" x="75" y="58" text-anchor="middle">this.color</text>
    <text class="od-cap" x="75" y="72" text-anchor="middle">the object's field</text>
    ${box(170, 36, 110, 40, "od-k od-p", 10)}
    <text class="od-b" x="225" y="58" text-anchor="middle">color</text>
    <text class="od-cap" x="225" y="72" text-anchor="middle">the parameter</text>
    <path class="od-k" d="M130,56H170"/>${arrowRight(166, 56)}
    <text class="od-s" x="150" y="102" text-anchor="middle">color = color;</text>
    <text class="od-cap" x="150" y="118" text-anchor="middle">without this. — which one wins?</text>
    <line class="od-k od-t od-dash" x1="10" y1="130" x2="290" y2="130"/>
    <text class="od-s" x="150" y="152" text-anchor="middle">this.color = color;</text>
    <text class="od-cap" x="10" y="174">this. reaches past the parameter, to the object's own field</text>`;
  return fig("thisDisambiguateFieldParam", 300, 182,
    "this.color disambiguates the object's own field from an incoming parameter named color",
    "A mustard box, this.color (the object's field), beside a paper box, color (the parameter). Below, the unclear line color = color is contrasted with this.color = color, which reaches past the parameter to the object's own field.",
    inner);
}

// ---------- thsup-2: this(color, 0) jumps into another constructor of the SAME class ----------
function thisCallsOtherConstructor() {
  const inner = `
    <text class="od-t" x="10" y="18">this(...) calls another</text>
    <text class="od-t" x="10" y="36">constructor, same class</text>
    ${box(160, 46, 130, 34, "od-k od-p", 10)}
    <text class="od-s" x="225" y="68" text-anchor="middle">Car(color, speed)</text>
    ${box(10, 96, 130, 34, "od-k od-greenfill", 10)}
    <text class="od-s od-onink" x="75" y="118" text-anchor="middle">Car(color)</text>
    <path class="od-k" d="M140,113C155,100 165,90 178,82"/>${arrowUp(184, 78)}
    <text class="od-cap" x="10" y="140">this(color, 0); — must be the FIRST line</text>
    <text class="od-cap" x="10" y="158">jumps straight into the 2-arg constructor</text>
    <text class="od-cap" x="10" y="176">reuses setup logic instead of repeating it</text>`;
  return fig("thisCallsOtherConstructor", 300, 182,
    "The one-argument Car constructor calls this(color, 0) to jump into the two-argument constructor",
    "A green Car(color) box has an arrow up into a Car(color, speed) box, with a caption explaining this(color, 0) must be the very first line, reusing setup logic instead of repeating it across overloaded constructors.",
    inner);
}

// ---------- thsup-3: super reaches UP from a child class into its parent ----------
function superPointsToParent() {
  const inner = `
    <text class="od-t" x="10" y="18">super — reaching up to</text>
    <text class="od-t" x="10" y="36">the parent class</text>
    ${box(90, 46, 120, 34, "od-k od-p", 10)}
    <text class="od-b" x="150" y="68" text-anchor="middle">Parent</text>
    ${arrowUp(150, 88)}
    <text class="od-s" x="164" y="84">super</text>
    ${box(70, 96, 160, 34, "od-k od-greenfill", 10)}
    <text class="od-b od-onink" x="150" y="118" text-anchor="middle">Child</text>
    <text class="od-cap" x="10" y="142">super(...) — call the parent's constructor</text>
    <text class="od-cap" x="10" y="160">super.method() — call the parent's version of a method</text>
    <text class="od-cap" x="10" y="178">always reaching UP, never sideways or down</text>`;
  return fig("superPointsToParent", 300, 182,
    "super reaches up from a child class into its parent, for two main uses",
    "A green Child box has an arrow labeled super pointing up into a Parent box, with two captions listing super's two uses: super(...) to call the parent's constructor, and super.method() to call the parent's version of an overridden method.",
    inner);
}

// ---------- thsup-4: super() runs the parent's constructor FIRST, top to bottom ----------
function superConstructorSequence() {
  const inner = `
    <text class="od-t" x="10" y="18">new Dog("Rex") — top to bottom</text>
    ${box(70, 30, 160, 28, "od-k od-p", 8)}
    <text class="od-s" x="150" y="49" text-anchor="middle">new Dog("Rex")</text>
    ${arrowDown(150, 66)}
    ${box(40, 68, 220, 30, "od-k od-p", 8)}
    <text class="od-s" x="150" y="88" text-anchor="middle">super(name) → Animal's ctor runs</text>
    ${arrowDown(150, 106)}
    ${box(40, 108, 220, 30, "od-k od-greenfill", 8)}
    <text class="od-s od-onink" x="150" y="128" text-anchor="middle">"Animal constructor ran"</text>
    ${arrowDown(150, 146)}
    ${box(40, 148, 220, 26, "od-k od-yfill", 8)}
    <text class="od-s" x="150" y="166" text-anchor="middle">"Dog constructor ran"</text>
    <text class="od-cap" x="10" y="178">the parent's part is always finished first</text>`;
  return fig("superConstructorSequence", 300, 182,
    "new Dog triggers super(name), running Animal's constructor first, then Dog's own constructor",
    "A top-to-bottom sequence: new Dog(Rex), then super(name) running Animal's constructor, printing Animal constructor ran, then finally Dog constructor ran — the parent's part is always finished first.",
    inner);
}

// ---------- thsup-5: super.makeSound() stacks on top of the parent's output ----------
function superMethodStacking() {
  const inner = `
    <text class="od-t" x="10" y="18">Stacking, not replacing</text>
    ${box(60, 32, 180, 34, "od-k od-greenfill", 10)}
    <text class="od-b od-onink" x="150" y="54" text-anchor="middle">Dog.makeSound()</text>
    ${arrowDown(150, 80)}
    ${box(40, 82, 220, 30, "od-k od-p", 8)}
    <text class="od-s" x="150" y="102" text-anchor="middle">super.makeSound() → generic sound</text>
    ${arrowDown(150, 120)}
    ${box(40, 122, 220, 30, "od-k od-yfill", 8)}
    <text class="od-s" x="150" y="142" text-anchor="middle">"...and also Woof!"</text>
    <line class="od-k od-t od-dash" x1="10" y1="156" x2="290" y2="156"/>
    <text class="od-cap" x="10" y="176">both lines print — super's output isn't thrown away</text>`;
  return fig("superMethodStacking", 300, 182,
    "Dog's overridden makeSound calls super.makeSound first, stacking its own output on top",
    "Dog.makeSound() has an arrow down into super.makeSound(), which prints the generic parent sound, followed by an arrow down into Dog's own and also Woof! line — both outputs print, stacking rather than replacing.",
    inner);
}

// ---------- thsup-6 (table): this vs super, compact two-column compare ----------
function thisVsSuperCompactCompare() {
  const inner = `
    <text class="od-t" x="10" y="18">this vs super, at a glance</text>
    <line class="od-k od-t od-dash" x1="150" y1="26" x2="150" y2="140"/>
    <text class="od-b" x="76" y="44" text-anchor="middle">THIS</text>
    <text class="od-s" x="16" y="68">current object</text>
    <text class="od-s" x="16" y="94">this() → same class</text>
    <text class="od-s" x="16" y="120">disambiguates field</text>
    <text class="od-b" x="224" y="44" text-anchor="middle">SUPER</text>
    <text class="od-s" x="164" y="68">parent class</text>
    <text class="od-s" x="164" y="94">super() → parent class</text>
    <text class="od-s" x="164" y="120">calls parent's method</text>
    <text class="od-cap" x="10" y="160">three rows, opposite direction each time</text>`;
  return fig("thisVsSuperCompactCompare", 300, 182,
    "this and super compared in a compact two-column summary",
    "Left column, THIS: current object, this() calls a constructor in the same class, disambiguates a field from a parameter. Right column, SUPER: parent class, super() calls a constructor in the parent class, calls the parent's overridden method.",
    inner);
}

// ---------- thsup-9: forget super(...) and Java secretly inserts it ----------
function implicitSuperInsertion() {
  const inner = `
    <text class="od-t" x="10" y="18">Forget super(...)? Java</text>
    <text class="od-t" x="10" y="36">writes it in for you</text>
    ${box(50, 50, 200, 30, "od-k od-p od-dash", 8)}
    <text class="od-s" x="150" y="70" text-anchor="middle">Dog(String name) { ... }</text>
    ${arrowDown(150, 90)}
    ${box(30, 92, 240, 32, "od-k od-yfill", 8)}
    <text class="od-s" x="150" y="112" text-anchor="middle">secretly inserts: super();</text>
    <text class="od-cap" x="10" y="140">only works if the parent HAS a no-arg constructor</text>
    <text class="od-cap" x="10" y="158">otherwise: compile error, must call super(...) yourself</text>
    <text class="od-cap" x="10" y="178">every constructor's first move is some parent constructor</text>`;
  return fig("implicitSuperInsertion", 300, 182,
    "If you don't write super(...), Java secretly inserts a call to the parent's no-argument constructor",
    "A dashed Dog(String name) constructor box has an arrow down into a mustard box reading secretly inserts colon super(), with captions noting this only works if the parent has a no-argument constructor, otherwise it's a compile error.",
    inner);
}

// ---------- thsup-10 (key takeaway) ----------
function thisSuperTakeaway() {
  const inner = `
    ${box(30, 24, 110, 56, "od-k od-greenfill", 10)}
    <text class="od-b od-onink" x="85" y="48" text-anchor="middle">this</text>
    <text class="od-cap od-onink" x="85" y="66" text-anchor="middle">the current object</text>
    ${box(160, 24, 110, 56, "od-k od-p", 10)}
    <text class="od-b" x="215" y="48" text-anchor="middle">super</text>
    <text class="od-cap" x="215" y="66" text-anchor="middle">the parent class</text>
    <rect class="od-k" x="20" y="100" width="260" height="10" rx="4"/>
    <text class="od-cap" x="150" y="126" text-anchor="middle">parent constructors always run first —</text>
    <text class="od-cap" x="150" y="142" text-anchor="middle">this reaches inward, super reaches upward</text>`;
  return fig("thisSuperTakeaway", 300, 156,
    "this refers to the current object, super to the parent class",
    "A green this box (the current object) beside a paper super box (the parent class), resting on a ground line — parent constructors always run first; this reaches inward, super reaches upward.",
    inner);
}

// =====================================================================
// Topic 13 · Object class basics — toString, equals, hashCode
// =====================================================================

// ---------- objcls-1: no "extends" written, still implicitly extends Object ----------
function objectImplicitRootCar() {
  const inner = `
    <text class="od-t" x="10" y="18">No "extends" written...</text>
    <text class="od-t" x="10" y="36">...still extends Object</text>
    ${box(110, 44, 80, 30, "od-k od-inkfill", 8)}
    <text class="od-b od-onink" x="150" y="64" text-anchor="middle">Object</text>
    <path class="od-k od-t od-dash" d="M150,74V104" fill="none"/>
    <text class="od-cap" x="164" y="94">implicit — never written</text>
    ${box(80, 106, 140, 40, "od-k od-greenfill", 10)}
    <text class="od-b od-onink" x="150" y="126" text-anchor="middle">class Car</text>
    <text class="od-cap od-onink" x="150" y="140" text-anchor="middle">(no extends at all)</text>
    <text class="od-cap" x="10" y="164">toString(), equals(), hashCode() — all inherited free</text>
    <text class="od-cap" x="10" y="178">even a class with no "extends" keyword gets these</text>`;
  return fig("objectImplicitRootCar", 300, 182,
    "A plain Car class with no extends keyword still implicitly extends Object",
    "A black Object box connects down via a dotted, never-written implicit link to a green class Car box that has no extends keyword at all — it still gets toString, equals and hashCode inherited for free.",
    inner);
}

// ---------- objcls-2: the default toString() prints an ugly memory-based address ----------
function toStringDefaultUgly() {
  const inner = `
    <text class="od-t" x="10" y="18">The default toString()</text>
    ${box(40, 34, 220, 30, "od-k od-p", 8)}
    <text class="od-s" x="150" y="54" text-anchor="middle">System.out.println(myCar);</text>
    ${arrowDown(150, 72)}
    ${box(40, 74, 220, 36, "od-k od-salmonfill", 10)}
    <text class="od-b od-onink" x="150" y="97" text-anchor="middle">Car@1b6d3586</text>
    <text class="od-cap" x="10" y="128">class name + a memory-based hash — not useful</text>
    <line class="od-k od-t od-dash" x1="10" y1="140" x2="290" y2="140"/>
    <text class="od-cap" x="10" y="162">inherited from Object's default toString()</text>
    <text class="od-cap" x="10" y="178">nobody overrode it — so this is what prints</text>`;
  return fig("toStringDefaultUgly", 300, 182,
    "Printing an object with the default, inherited toString() shows an ugly memory-based address",
    "System.out.println(myCar) has an arrow down into a salmon box reading Car@1b6d3586 — the class name plus a memory-based hash, inherited from Object's default toString() because nobody overrode it.",
    inner);
}

// ---------- objcls-3: same print call, before vs after overriding toString() ----------
function toStringOverrideBeforeAfter() {
  const inner = `
    <text class="od-t" x="10" y="18">Same call, before vs after override</text>
    <text class="od-s" x="14" y="46">println(myCar);</text>
    ${box(160, 32, 130, 30, "od-k od-p od-dash", 8)}
    <text class="od-cap" x="225" y="52" text-anchor="middle">Car@1b6d3586</text>
    <text class="od-cap" x="10" y="70">before — default toString(), no override</text>
    <line class="od-k od-t od-dash" x1="10" y1="88" x2="290" y2="88"/>
    <text class="od-s" x="14" y="112">println(myCar);</text>
    ${box(160, 98, 130, 30, "od-k od-greenfill", 8)}
    <text class="od-b od-onink" x="225" y="118" text-anchor="middle">Car(color=red)</text>
    <text class="od-cap" x="10" y="138">after — @Override toString() returns this string</text>
    <text class="od-cap" x="10" y="178">one method, and every print becomes meaningful</text>`;
  return fig("toStringOverrideBeforeAfter", 300, 182,
    "The same println call before and after overriding toString, contrasted",
    "Before: println(myCar) points to a dashed box reading Car@1b6d3586, the default toString with no override. After: the same println(myCar) call points to a green box reading Car(color=red), from an overridden toString().",
    inner);
}

// ---------- objcls-4: two red Car objects, equals() false by default — identity, not content ----------
function equalsIdentityFalse() {
  const inner = `
    <text class="od-t" x="10" y="18">Same color, different objects</text>
    ${box(20, 36, 110, 44, "od-k od-p", 10)}
    <text class="od-s" x="75" y="56" text-anchor="middle">a: Car</text>
    <text class="od-cap" x="75" y="72" text-anchor="middle">color = red</text>
    ${box(170, 36, 110, 44, "od-k od-p", 10)}
    <text class="od-s" x="225" y="56" text-anchor="middle">b: Car</text>
    <text class="od-cap" x="225" y="72" text-anchor="middle">color = red</text>
    <path class="od-k" d="M130,58H170"/>
    <text class="od-s" x="150" y="102" text-anchor="middle">a.equals(b)</text>
    ${arrowDown(150, 112)}
    ${box(100, 112, 100, 32, "od-k od-salmonfill", 8)}
    <text class="od-b od-onink" x="150" y="133" text-anchor="middle">false</text>
    <text class="od-cap" x="10" y="160">different memory locations — identity, not content</text>
    <text class="od-cap" x="10" y="178">default equals() only checks "is it the same box?"</text>`;
  return fig("equalsIdentityFalse", 300, 182,
    "Two Car objects with identical color still return false from the default equals(), because it checks identity",
    "Two separate boxes, a: Car and b: Car, both color = red. a.equals(b) has an arrow down into a salmon box reading false — different memory locations means the default equals() only checks identity, not content.",
    inner);
}

// ---------- objcls-5: same two red Cars, equals() overridden to compare content — now true ----------
function equalsContentTrue() {
  const inner = `
    <text class="od-t" x="10" y="18">Now comparing content</text>
    ${box(20, 36, 110, 44, "od-k od-greenfill", 10)}
    <text class="od-s od-onink" x="75" y="56" text-anchor="middle">a: Car</text>
    <text class="od-cap od-onink" x="75" y="72" text-anchor="middle">color = red</text>
    ${box(170, 36, 110, 44, "od-k od-greenfill", 10)}
    <text class="od-s od-onink" x="225" y="56" text-anchor="middle">b: Car</text>
    <text class="od-cap od-onink" x="225" y="72" text-anchor="middle">color = red</text>
    <path class="od-k" d="M130,58H170"/>
    <text class="od-s" x="150" y="102" text-anchor="middle">a.equals(b)</text>
    ${arrowDown(150, 112)}
    ${box(100, 112, 100, 32, "od-k od-yfill", 8)}
    <text class="od-b" x="150" y="133" text-anchor="middle">true</text>
    <text class="od-cap" x="10" y="160">overridden equals() compares color, not identity</text>
    <text class="od-cap" x="10" y="178">same idea used to compare two Strings by content</text>`;
  return fig("equalsContentTrue", 300, 182,
    "After overriding equals() to compare color, the same two red Cars now return true",
    "The same a: Car and b: Car boxes, both color = red, now shown in green. a.equals(b) has an arrow down into a mustard box reading true, because the overridden equals() compares color instead of memory identity.",
    inner);
}

// ---------- objcls-6: equals()/hashCode() contract — matching vs mismatched bucket placement ----------
function hashCodeBucketContract() {
  const inner = `
    <text class="od-t" x="10" y="18">The equals()/hashCode() rule</text>
    <text class="od-s" x="14" y="42">matching hashCode():</text>
    ${box(170, 28, 110, 34, "od-k od-greenfill", 8)}
    <text class="od-cap od-onink" x="225" y="42" text-anchor="middle">a, b → bucket #3</text>
    <text class="od-cap od-onink" x="225" y="56" text-anchor="middle">both land together</text>
    ${badge(150, 45, 14, "od-greenfill", `<path class="od-k" d="${TICK}" transform="scale(0.85)"/>`)}
    <line class="od-k od-t od-dash" x1="10" y1="72" x2="290" y2="72"/>
    <text class="od-s" x="14" y="96">mismatched hashCode():</text>
    ${box(170, 82, 110, 34, "od-k od-salmonfill", 8)}
    <text class="od-cap od-onink" x="225" y="96" text-anchor="middle">a → #1, b → #7</text>
    <text class="od-cap od-onink" x="225" y="110" text-anchor="middle">split apart — a bug</text>
    ${badge(150, 99, 14, "od-salmonfill", `<path class="od-k" d="${CROSS}" transform="scale(0.85)"/>`)}
    <text class="od-cap" x="10" y="140">HashSet/HashMap use hashCode() to pick a bucket first,</text>
    <text class="od-cap" x="10" y="156">then equals() to confirm — mismatch breaks lookups</text>
    <text class="od-cap" x="10" y="178">rule: equal objects MUST return the same hashCode()</text>`;
  return fig("hashCodeBucketContract", 300, 182,
    "Equal objects must return the same hashCode, or hash-based collections break",
    "Top row: matching hashCode sends both a and b into bucket 3 together, marked with a green checkmark. Bottom row: mismatched hashCode sends a to bucket 1 and b to bucket 7, splitting them apart and marked with a red cross as a bug.",
    inner);
}

// ---------- objcls-10 (key takeaway) ----------
function objClsTakeaway() {
  const inner = `
    ${box(20, 24, 120, 56, "od-k od-inkfill", 10)}
    <text class="od-s od-onink" x="80" y="46" text-anchor="middle">Object gives you</text>
    <text class="od-s od-onink" x="80" y="64" text-anchor="middle">3 free methods</text>
    ${box(160, 24, 120, 56, "od-k od-yfill", 10)}
    <text class="od-b" x="220" y="48" text-anchor="middle">override them</text>
    <text class="od-cap" x="220" y="66" text-anchor="middle">to make them useful</text>
    <rect class="od-k" x="20" y="98" width="260" height="10" rx="4"/>
    <text class="od-cap" x="150" y="124" text-anchor="middle">toString() for meaning, equals()+hashCode() together</text>
    <text class="od-cap" x="150" y="140" text-anchor="middle">for content-based comparison</text>`;
  return fig("objClsTakeaway", 300, 156,
    "Every class inherits toString, equals and hashCode from Object, but should override them",
    "A black box reading Object gives you 3 free methods beside a mustard box reading override them to make them useful, resting on a ground line — override toString for meaning, and equals with hashCode together for content-based comparison.",
    inner);
}

export default {
  staticSharedCounterOwnData, staticFieldIncrementSequence, staticMethodDirectClassCall,
  staticCannotReachInstance, staticInstanceCompactCompare, statTakeaway,
  thisDisambiguateFieldParam, thisCallsOtherConstructor, superPointsToParent,
  superConstructorSequence, superMethodStacking, thisVsSuperCompactCompare,
  implicitSuperInsertion, thisSuperTakeaway,
  objectImplicitRootCar, toStringDefaultUgly, toStringOverrideBeforeAfter,
  equalsIdentityFalse, equalsContentTrue, hashCodeBucketContract, objClsTakeaway,
};
