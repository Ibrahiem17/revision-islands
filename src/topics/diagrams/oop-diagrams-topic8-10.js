/**
 * OOP note diagrams — Phase 2C: Topic 8 · Method Overloading vs Overriding (ovld-1..ovld-10),
 * Topic 9 · Abstract Classes vs Interfaces (absint-1..absint-11), Topic 10 · Access Modifiers
 * (acc-1..acc-7). See src/topics/diagrams/oop-diagram-kit.js for the shared style contract, and
 * oop-diagrams-qr.js / oop-diagrams-topic1.js / oop-diagrams-topic2-4.js / oop-diagrams-topic5-7.js
 * for the established visual language this file matches (thick ink outlines, flat od-* fills, no
 * faces).
 *
 * Topic 8 and Topic 9 each overlap conceptually with an existing Quick Revision diagram
 * (qr's overloadOverride and abstractVsInterface) — every figure below is a fresh, complementary
 * take built from THIS topic's own code examples (Calculator.add, Animal/Dog, Shape/Circle,
 * Payable/Employee, Duck) rather than a re-skin of those summary diagrams. Topic 10's acc-2 also
 * deliberately uses NESTED BOXES rather than qr's accessRings (concentric circles), for the same
 * reason.
 *
 * Some qa items are intentionally skipped where they would just restate another item's diagram in
 * the same topic (same precedent as prior phases) — see the export list at the bottom and the
 * phase report for the full accounting.
 */
import {
  fig, keyframes, bind, arrowDown, arrowRight, arrowLeft,
  box, badge, padlock, TICK, CROSS,
} from "./oop-diagram-kit.js";

// =====================================================================
// Topic 8 · Method Overloading vs Overriding
// =====================================================================

// ---------- ovld-1: same method name forks into two different mechanisms ----------
function sameNameForkOverloadOverride() {
  const inner = `
    <text class="od-t" x="10" y="18">Same name —</text>
    <text class="od-t" x="10" y="36">two very different stories</text>
    ${box(125, 44, 50, 28, "od-k od-p", 8)}
    <text class="od-s" x="150" y="63" text-anchor="middle">name()</text>
    <path class="od-k" d="M132,72C112,80 96,86 86,90"/>${arrowDown(84, 96)}
    <path class="od-k" d="M168,72C188,80 204,86 214,90"/>${arrowDown(216, 96)}
    ${box(24, 96, 120, 66, "od-k od-yfill", 10)}
    <text class="od-b" x="84" y="116" text-anchor="middle">OVERLOAD</text>
    <text class="od-cap" x="84" y="134" text-anchor="middle">diff params,</text>
    <text class="od-cap" x="84" y="148" text-anchor="middle">same class — compile-time</text>
    ${box(156, 96, 120, 66, "od-k od-salmonfill", 10)}
    <text class="od-b od-onink" x="216" y="116" text-anchor="middle">OVERRIDE</text>
    <text class="od-cap od-onink" x="216" y="134" text-anchor="middle">same params,</text>
    <text class="od-cap od-onink" x="216" y="148" text-anchor="middle">parent to child — runtime</text>
    <text class="od-cap" x="10" y="172">forget this line and everything else gets confusing</text>`;
  return fig("sameNameForkOverloadOverride", 300, 182, "The same method name forks into overloading or overriding", "A small name() box has two arrows fanning down: left into a mustard OVERLOAD box (different params, same class, compile-time), right into a salmon OVERRIDE box (same params, parent to child, runtime).", inner);
}

// ---------- ovld-2: Calculator's three add() doors, routed by argument shape ----------
function calculatorThreeDoors() {
  const inner = `
    <text class="od-t" x="10" y="18">Calculator: three add() doors</text>
    <text class="od-s" x="60" y="40" text-anchor="middle">add(2,3)</text>
    <text class="od-s" x="150" y="40" text-anchor="middle">add(2.5,3.5)</text>
    <text class="od-s" x="240" y="40" text-anchor="middle">add(1,2,3)</text>
    ${arrowDown(60, 56)}${arrowDown(150, 56)}${arrowDown(240, 56)}
    ${box(10, 60, 280, 62, "od-k od-p od-dash", 10)}
    <text class="od-cap" x="150" y="74" text-anchor="middle">class Calculator</text>
    ${box(20, 82, 80, 32, "od-k od-yfill", 8)}<text class="od-cap" x="60" y="102" text-anchor="middle">(int,int)</text>
    ${box(110, 82, 80, 32, "od-k od-yfill", 8)}<text class="od-cap" x="150" y="102" text-anchor="middle">(dbl,dbl)</text>
    ${box(200, 82, 80, 32, "od-k od-yfill", 8)}<text class="od-cap" x="240" y="102" text-anchor="middle">(int,int,int)</text>
    ${arrowDown(60, 128)}${arrowDown(150, 128)}${arrowDown(240, 128)}
    <text class="od-b" x="60" y="152" text-anchor="middle">5</text>
    <text class="od-b" x="150" y="152" text-anchor="middle">6.0</text>
    <text class="od-b" x="240" y="152" text-anchor="middle">6</text>
    <text class="od-cap" x="10" y="174">same name, three signatures — matched before it runs</text>`;
  return fig("calculatorThreeDoors", 300, 182, "Calculator's three overloaded add() methods, each routed by argument shape", "Three calls, add(2,3), add(2.5,3.5) and add(1,2,3), each arrow down into one of three doors inside class Calculator — (int,int), (double,double) and (int,int,int) — producing 5, 6.0 and 6 respectively.", inner);
}

// ---------- ovld-3: which makeSound() runs is decided at runtime, from the real object ----------
function runtimeDispatchDogSound() {
  const inner = `
    <text class="od-t" x="10" y="18">Decided while the</text>
    <text class="od-t" x="10" y="36">program is running</text>
    ${box(90, 46, 120, 30, "od-k od-p od-dash", 8)}
    <text class="od-s" x="150" y="66" text-anchor="middle">Animal ref</text>
    ${arrowDown(150, 90)}
    <text class="od-cap" x="150" y="104" text-anchor="middle">checks the real object, at runtime</text>
    ${box(20, 112, 120, 50, "od-k od-greenfill", 10)}
    <text class="od-b od-onink" x="80" y="132" text-anchor="middle">actual: Dog</text>
    <text class="od-s od-onink" x="80" y="150" text-anchor="middle">"Woof!"</text>
    ${box(160, 112, 120, 50, "od-k od-p od-t od-dash", 10)}
    <text class="od-b" x="220" y="132" text-anchor="middle">actual: Animal</text>
    <text class="od-cap" x="220" y="150" text-anchor="middle">(not this time)</text>
    <text class="od-cap" x="10" y="176">same call — the real object decides which body runs</text>`;
  return fig("runtimeDispatchDogSound", 300, 182, "The real object decides at runtime which makeSound() body runs", "An Animal ref box has an arrow down through a runtime check into two possible outcomes: a solid green actual: Dog box producing Woof! (what actually happens), and a dashed, unused actual: Animal box.", inner);
}

// ---------- ovld-4 (table): overload vs override, compact two-column badge summary ----------
function overloadOverrideCompactCompare() {
  const inner = `
    <text class="od-t" x="10" y="18">Overload vs Override, at a glance</text>
    <line class="od-k od-t od-dash" x1="150" y1="26" x2="150" y2="140"/>
    <text class="od-b" x="76" y="44" text-anchor="middle">OVERLOAD</text>
    <text class="od-s" x="16" y="64">diff params, same class</text>
    <text class="od-s" x="16" y="84">compile-time</text>
    <text class="od-s" x="16" y="104">return type: can differ</text>
    <text class="od-s" x="16" y="124">no inheritance needed</text>
    <text class="od-b" x="224" y="44" text-anchor="middle">OVERRIDE</text>
    <text class="od-s" x="164" y="64">same params exactly</text>
    <text class="od-s" x="164" y="84">runtime</text>
    <text class="od-s" x="164" y="104">return: same or subtype</text>
    <text class="od-s" x="164" y="124">requires inheritance</text>
    <text class="od-cap" x="10" y="160">six rows, one shared shape, opposite answers</text>`;
  return fig("overloadOverrideCompactCompare", 300, 182, "Overloading and overriding compared in a compact two-column summary", "Left column, OVERLOAD: different params, same class, compile-time, return type can differ, no inheritance needed. Right column, OVERRIDE: same params exactly, runtime, return type must be the same or a subtype, requires inheritance.", inner);
}

// ---------- ovld-5: overriding can only widen access, never narrow it ----------
function overrideAccessWidening() {
  const inner = `
    <text class="od-t" x="10" y="18">Access can only widen,</text>
    <text class="od-t" x="10" y="36">never shrink</text>
    ${box(14, 54, 70, 30, "od-k od-p", 8)}<text class="od-s" x="49" y="73" text-anchor="middle">private</text>
    ${arrowRight(100, 69)}
    ${box(112, 54, 86, 30, "od-k od-p", 8)}<text class="od-s" x="155" y="73" text-anchor="middle">protected</text>
    ${arrowRight(210, 69)}
    ${box(222, 54, 64, 30, "od-k od-p", 8)}<text class="od-s" x="254" y="73" text-anchor="middle">public</text>
    ${badge(150, 100, 13, "od-greenfill", `<path class="od-k" d="${TICK}" transform="scale(0.9)"/>`)}
    <text class="od-cap" x="150" y="124" text-anchor="middle">allowed: same, or wider</text>
    ${box(222, 132, 64, 30, "od-k od-p od-dash", 8)}<text class="od-s" x="254" y="151" text-anchor="middle">public</text>
    ${arrowLeft(196, 147)}
    ${badge(150, 147, 13, "od-salmonfill", `<path class="od-k" d="${CROSS}" transform="scale(0.9)"/>`)}
    ${arrowLeft(124, 147)}
    ${box(14, 132, 70, 30, "od-k od-p od-dash", 8)}<text class="od-s" x="49" y="151" text-anchor="middle">private</text>
    <text class="od-cap" x="10" y="176">a public method can't be overridden as private</text>`;
  return fig("overrideAccessWidening", 300, 182, "Overriding can only widen access, never narrow it", "Top row: private, protected and public boxes connected left to right by arrows, with a green checkmark above — same or wider access is allowed. Bottom row: the same three boxes with arrows going right to left, marked with a red cross — narrowing access on override is not allowed.", inner);
}

// ---------- ovld-8 (qa): return type alone can't overload a method ----------
function overloadReturnTypeAlone() {
  const inner = `
    <text class="od-t" x="10" y="18">Return type alone isn't enough</text>
    <text class="od-s" x="16" y="46">int add(int a, int b)</text>
    <text class="od-s" x="16" y="66">double add(int a, int b)</text>
    ${badge(262, 56, 16, "od-salmonfill", `<path class="od-k" d="${CROSS}"/>`)}
    <text class="od-cap" x="16" y="86">same params, only return type differs — compile error</text>
    <line class="od-k od-t od-dash" x1="10" y1="100" x2="290" y2="100"/>
    <text class="od-s" x="16" y="122">int add(int a, int b)</text>
    <text class="od-s" x="16" y="142">int add(int a, double b)</text>
    ${badge(262, 132, 16, "od-greenfill", `<path class="od-k" d="${TICK}"/>`)}
    <text class="od-cap" x="16" y="162">different params too — a valid overload</text>
    <text class="od-cap" x="10" y="176">the parameter list is what must actually differ</text>`;
  return fig("overloadReturnTypeAlone", 300, 182, "Return type alone cannot make two methods overloads of each other", "Top: int add(int,int) and double add(int,int) — identical parameters, only the return type differs, marked with a red cross as a compile error. Bottom: int add(int,int) and int add(int,double) — parameters actually differ, marked with a green checkmark as a valid overload.", inner);
}

// ---------- ovld-9 (qa): covariant return types on override ----------
function covariantReturnOverride() {
  const inner = `
    <text class="od-t" x="10" y="18">Covariant return types</text>
    <text class="od-s" x="16" y="44">Animal reproduce() { ... }</text>
    <text class="od-cap" x="16" y="60">parent returns Animal</text>
    <line class="od-k od-t od-dash" x1="10" y1="72" x2="290" y2="72"/>
    <text class="od-s" x="16" y="94">Dog reproduce() { ... }</text>
    <text class="od-cap" x="16" y="110">returns Dog — a subtype of Animal</text>
    ${badge(262, 94, 16, "od-greenfill", `<path class="od-k" d="${TICK}"/>`)}
    <text class="od-s" x="16" y="136">String reproduce() { ... }</text>
    <text class="od-cap" x="16" y="152">unrelated type — compile error</text>
    ${badge(262, 136, 16, "od-salmonfill", `<path class="od-k" d="${CROSS}"/>`)}
    <text class="od-cap" x="10" y="174">same, or a subtype — never something unrelated</text>`;
  return fig("covariantReturnOverride", 300, 182, "An overriding method's return type can narrow to a subtype, never to an unrelated type", "Animal's reproduce() returns Animal. Dog's override returning Dog (a subtype of Animal) is marked valid with a green checkmark. A version returning an unrelated String is marked invalid with a red cross.", inner);
}

// ---------- ovld-10 (key takeaway) ----------
function ovldTakeaway() {
  const inner = `
    ${box(30, 24, 110, 56, "od-k od-yfill", 10)}
    <text class="od-b" x="85" y="48" text-anchor="middle">OVERLOAD</text>
    <text class="od-cap" x="85" y="66" text-anchor="middle">same class, compile-time</text>
    ${box(160, 24, 110, 56, "od-k od-salmonfill", 10)}
    <text class="od-b od-onink" x="215" y="48" text-anchor="middle">OVERRIDE</text>
    <text class="od-cap od-onink" x="215" y="66" text-anchor="middle">parent-child, runtime</text>
    <rect class="od-k" x="20" y="100" width="260" height="10" rx="4"/>
    <text class="od-cap" x="150" y="126" text-anchor="middle">same name means two different things —</text>
    <text class="od-cap" x="150" y="142" text-anchor="middle">know which one you're looking at</text>`;
  return fig("ovldTakeaway", 300, 156, "One shared name, two completely different mechanisms", "A mustard OVERLOAD box (same class, compile-time) beside a salmon OVERRIDE box (parent-child, runtime), resting on a ground line — the same name means two different things.", inner);
}

// =====================================================================
// Topic 9 · Abstract Classes vs Interfaces
// =====================================================================

// ---------- absint-1: an abstract Shape can't be instantiated directly ----------
function abstractClassCannotInstantiate() {
  const inner = `
    <text class="od-t" x="10" y="18">Abstract: can't create</text>
    <text class="od-t" x="10" y="36">one directly</text>
    ${box(70, 48, 160, 40, "od-k od-p od-dash", 10)}
    <text class="od-b" x="150" y="73" text-anchor="middle">abstract class Shape</text>
    ${badge(150, 108, 16, "od-salmonfill", `<path class="od-k" d="${CROSS}"/>`)}
    <text class="od-cap" x="150" y="132" text-anchor="middle">new Shape() — compile error</text>
    ${box(20, 142, 120, 32, "od-k od-p", 8)}
    <text class="od-cap" x="80" y="156" text-anchor="middle">abstract area()</text>
    <text class="od-cap" x="80" y="169" text-anchor="middle">(no body)</text>
    ${box(160, 142, 120, 32, "od-k od-yfill", 8)}
    <text class="od-cap" x="220" y="156" text-anchor="middle">describe() { ... }</text>
    <text class="od-cap" x="220" y="169" text-anchor="middle">(shared body)</text>`;
  return fig("abstractClassCannotInstantiate", 300, 182, "An abstract Shape class cannot be instantiated directly", "A dashed abstract class Shape box has an arrow down into a crossed-out circle over new Shape() — a compile error. Below, two boxes show its contents: abstract area() with no body, and describe() with a shared, full body.", inner);
}

// ---------- absint-2: Circle extends Shape, forced to implement area(), gets describe() free ----------
function shapeCircleForcedImplement() {
  const inner = `
    <text class="od-t" x="10" y="18">Circle extends Shape</text>
    ${box(70, 30, 160, 50, "od-k od-p od-dash", 10)}
    <text class="od-b" x="150" y="50" text-anchor="middle">Shape (abstract)</text>
    <text class="od-cap" x="150" y="68" text-anchor="middle">area(): none · describe(): body</text>
    ${arrowDown(150, 92)}
    ${box(40, 92, 220, 68, "od-k od-greenfill", 10)}
    <text class="od-b od-onink" x="150" y="114" text-anchor="middle">Circle extends Shape</text>
    <text class="od-s od-onink" x="150" y="132" text-anchor="middle">must write its own area()</text>
    <text class="od-s od-onink" x="150" y="150" text-anchor="middle">describe() — inherited free</text>
    <text class="od-cap" x="10" y="174">forced to implement one, inherits the other for free</text>`;
  return fig("shapeCircleForcedImplement", 300, 182, "Circle extends the abstract Shape, forced to implement area() but inheriting describe() for free", "A dashed abstract Shape box (area: none, describe: body) has an arrow down into a green Circle extends Shape box, which must write its own area() but inherits describe() for free.", inner);
}

// ---------- absint-3: an interface is a checklist of promised signatures, no bodies ----------
function interfaceChecklistContract() {
  const inner = `
    <text class="od-t" x="10" y="18">An interface — a checklist</text>
    <text class="od-t" x="10" y="36">of promises, no bodies</text>
    ${box(90, 50, 120, 112, "od-k od-p", 12)}
    <line class="od-k" x1="90" y1="76" x2="210" y2="76"/>
    <text class="od-b" x="150" y="70" text-anchor="middle">interface</text>
    <rect class="od-k" x="102" y="86" width="14" height="14" rx="3"/>
    <text class="od-cap" x="124" y="97">signOne();</text>
    <rect class="od-k" x="102" y="112" width="14" height="14" rx="3"/>
    <text class="od-cap" x="124" y="123">signTwo();</text>
    <rect class="od-k" x="102" y="138" width="14" height="14" rx="3"/>
    <text class="od-cap" x="124" y="149">signThree();</text>
    <text class="od-cap" x="10" y="176">empty boxes = promised, not written here</text>`;
  return fig("interfaceChecklistContract", 300, 182, "An interface as a checklist of promised method signatures, with no bodies", "A box labeled interface contains three checklist rows, each an empty checkbox beside a method signature (signOne, signTwo, signThree) — signatures only, nothing implemented.", inner);
}

// ---------- absint-4: Employee implements Payable, promises and delivers calculatePay() ----------
function payableEmployeeImplements() {
  const inner = `
    <text class="od-t" x="10" y="18">Employee implements Payable</text>
    ${box(70, 32, 160, 34, "od-k od-p od-dash", 10)}
    <text class="od-b" x="150" y="54" text-anchor="middle">interface Payable</text>
    <text class="od-cap" x="150" y="80" text-anchor="middle">implements</text>
    ${arrowDown(150, 86)}
    ${box(30, 88, 240, 66, "od-k od-greenfill", 10)}
    <text class="od-b od-onink" x="150" y="110" text-anchor="middle">Employee implements Payable</text>
    <text class="od-s od-onink" x="150" y="130" text-anchor="middle">promises + delivers</text>
    <text class="od-s od-onink" x="150" y="148" text-anchor="middle">calculatePay()</text>
    <text class="od-cap" x="10" y="174">any Payable is guaranteed a working calculatePay()</text>`;
  return fig("payableEmployeeImplements", 300, 182, "Employee implements Payable, promising and delivering calculatePay()", "A dashed interface Payable box has an arrow labeled implements down into a green Employee implements Payable box, which promises and delivers calculatePay().", inner);
}

// ---------- absint-5: Duck implements Flyable AND Swimmable, arrows fanning in ----------
function duckMultipleInterfacesFanIn() {
  const inner = `
    <text class="od-t" x="10" y="18">One class, many interfaces</text>
    ${box(20, 34, 110, 30, "od-k od-p", 8)}
    <text class="od-s" x="75" y="54" text-anchor="middle">Flyable</text>
    ${box(170, 34, 110, 30, "od-k od-p", 8)}
    <text class="od-s" x="225" y="54" text-anchor="middle">Swimmable</text>
    <path class="od-k" d="M75,64C90,78 108,88 122,96"/>${arrowDown(124, 102)}
    <path class="od-k" d="M225,64C210,78 192,88 178,96"/>${arrowDown(176, 102)}
    ${box(70, 102, 160, 50, "od-k od-greenfill", 10)}
    <text class="od-b od-onink" x="150" y="122" text-anchor="middle">Duck</text>
    <text class="od-s od-onink" x="150" y="140" text-anchor="middle">implements both</text>
    <text class="od-cap" x="10" y="164">contrast: extends allows only ONE class (Topic 6)</text>
    <text class="od-cap" x="10" y="178">interfaces: implement as MANY as you want</text>`;
  return fig("duckMultipleInterfacesFanIn", 300, 182, "A Duck class implementing both Flyable and Swimmable, arrows fanning in", "Flyable and Swimmable boxes each have an arrow curving down into a single green Duck box labeled implements both — unlike extends, a class can implement as many interfaces as it wants.", inner);
}

// ---------- absint-6 (table): abstract class vs interface, compact two-column summary ----------
function abstractInterfaceCompactCompare() {
  const inner = `
    <text class="od-t" x="10" y="18">Abstract class vs Interface</text>
    <line class="od-k od-t od-dash" x1="150" y1="26" x2="150" y2="140"/>
    <text class="od-b" x="76" y="44" text-anchor="middle">ABSTRACT CLASS</text>
    <text class="od-s" x="16" y="64">extends — one only</text>
    <text class="od-s" x="16" y="84">mixed method bodies</text>
    <text class="od-s" x="16" y="104">any fields, with state</text>
    <text class="od-s" x="16" y="124">shared code, "is-a"</text>
    <text class="od-b" x="224" y="44" text-anchor="middle">INTERFACE</text>
    <text class="od-s" x="164" y="64">implements — many</text>
    <text class="od-s" x="164" y="84">signatures only</text>
    <text class="od-s" x="164" y="104">constants only</text>
    <text class="od-s" x="164" y="124">a guaranteed "can-do"</text>
    <text class="od-cap" x="10" y="160">five rows, condensed to the shape of the choice</text>`;
  return fig("abstractInterfaceCompactCompare", 300, 182, "Abstract class and interface compared in a compact two-column summary", "Left column, ABSTRACT CLASS: extends one only, mixed method bodies, any fields with state, shared code for an is-a relationship. Right column, INTERFACE: implements many, signatures only, constants only, a guaranteed can-do capability.", inner);
}

// ---------- absint-7: decision flow — share code vs need a capability ----------
function decisionFlowChooseTool() {
  const inner = `
    <text class="od-t" x="10" y="18">How to choose</text>
    ${box(70, 30, 160, 34, "od-k od-p od-dash", 10)}
    <text class="od-s" x="150" y="52" text-anchor="middle">share code + same kind?</text>
    <text class="od-cap" x="90" y="76" text-anchor="middle">yes</text>${arrowDown(90, 82)}
    <text class="od-cap" x="210" y="76" text-anchor="middle">no</text>${arrowDown(210, 82)}
    ${box(20, 84, 140, 50, "od-k od-greenfill", 10)}
    <text class="od-b od-onink" x="90" y="104" text-anchor="middle">abstract class</text>
    <text class="od-cap od-onink" x="90" y="122" text-anchor="middle">Shape family</text>
    ${box(170, 84, 110, 50, "od-k od-yfill", 10)}
    <text class="od-b" x="225" y="104" text-anchor="middle">interface</text>
    <text class="od-cap" x="225" y="122" text-anchor="middle">Bird, Airplane fly</text>
    <text class="od-cap" x="10" y="156">unrelated types needing one capability? interface.</text>
    <text class="od-cap" x="10" y="172">related, sharing real code? abstract class.</text>`;
  return fig("decisionFlowChooseTool", 300, 182, "A decision flow for choosing between an abstract class and an interface", "A dashed box asks share code and same kind? A yes arrow leads to a green abstract class box (the Shape family). A no arrow leads to a mustard interface box (Bird and Airplane, both able to fly).", inner);
}

// ---------- absint-10 (qa): why classes conflict but interfaces don't ----------
function whyManyInterfacesOneClassConflict() {
  const inner = `
    <text class="od-t" x="10" y="18">Why classes conflict,</text>
    <text class="od-t" x="10" y="36">interfaces don't</text>
    ${box(16, 50, 120, 50, "od-k od-p", 10)}
    <text class="od-s" x="76" y="70" text-anchor="middle">P1.greet()</text>
    <text class="od-cap" x="76" y="88" text-anchor="middle">says "Hi"</text>
    ${box(164, 50, 120, 50, "od-k od-p", 10)}
    <text class="od-s" x="224" y="70" text-anchor="middle">P2.greet()</text>
    <text class="od-cap" x="224" y="88" text-anchor="middle">says "Yo"</text>
    <path class="od-k" d="M76,100C100,112 126,118 150,122"/>
    <path class="od-k" d="M224,100C200,112 174,118 150,122"/>
    ${badge(150, 128, 16, "od-salmonfill", `<path class="od-k" d="${CROSS}"/>`)}
    <text class="od-cap" x="150" y="152" text-anchor="middle">two classes, conflicting bodies — ambiguous</text>
    <line class="od-k od-t od-dash" x1="10" y1="160" x2="290" y2="160"/>
    <text class="od-cap" x="10" y="176">interfaces (no bodies) never conflict this way</text>`;
  return fig("whyManyInterfacesOneClassConflict", 300, 182, "Two parent classes with conflicting method bodies are ambiguous; interfaces never conflict this way", "P1.greet() says Hi and P2.greet() says Yo — both feeding into a crossed-out circle, showing extending both would be an ambiguous conflict. A caption below notes interfaces, having no bodies, never conflict this way.", inner);
}

// ---------- absint-11 (key takeaway) ----------
function absIntTakeaway() {
  const inner = `
    ${box(30, 24, 110, 56, "od-k od-p od-dash", 10)}
    <text class="od-b" x="85" y="48" text-anchor="middle">abstract class</text>
    <text class="od-cap" x="85" y="66" text-anchor="middle">single, shares code</text>
    ${box(160, 24, 110, 56, "od-k od-yfill", 10)}
    <text class="od-b" x="215" y="48" text-anchor="middle">interface</text>
    <text class="od-cap" x="215" y="66" text-anchor="middle">many, pure contract</text>
    ${arrowDown(150, 96)}
    ${box(60, 98, 180, 32, "od-k od-greenfill", 10)}
    <text class="od-b od-onink" x="150" y="119" text-anchor="middle">both = ABSTRACTION</text>
    <rect class="od-k" x="20" y="140" width="260" height="10" rx="4"/>
    <text class="od-cap" x="150" y="164" text-anchor="middle">two tools, one shared underlying goal</text>`;
  return fig("absIntTakeaway", 300, 182, "Abstract classes and interfaces are two tools for the same underlying goal", "An abstract class box (single, shares code) and an interface box (many, pure contract) both funnel down into a green box reading both equals ABSTRACTION, resting on a ground line.", inner);
}

// =====================================================================
// Topic 10 · Access Modifiers
// =====================================================================

// ---------- acc-1: a gatekeeper decides who can see a field or method ----------
function gatekeeperIntro() {
  const inner = `
    <text class="od-t" x="10" y="18">A gatekeeper for your class</text>
    ${box(20, 70, 70, 34, "od-k od-p", 8)}<text class="od-s" x="55" y="91" text-anchor="middle">Class A?</text>
    ${padlock(150, 92, 1.35, "od-yfill")}
    ${box(210, 70, 70, 34, "od-k od-p", 8)}<text class="od-s" x="245" y="91" text-anchor="middle">Class B?</text>
    <text class="od-s" x="150" y="142" text-anchor="middle">who's allowed to see this?</text>
    <text class="od-cap" x="10" y="172">access modifiers decide, field by field, method by method</text>`;
  return fig("gatekeeperIntro", 300, 182, "Access modifiers act as a gatekeeper deciding who can see a class member", "A padlock in the center with a box labeled Class A on the left and Class B on the right, both asking whether they're allowed access — access modifiers decide, field by field and method by method.", inner);
}

// ---------- acc-2 (table): four access levels as nested boxes, private innermost ----------
function fourLevelsNestedBoxes() {
  const inner = `
    <text class="od-t" x="10" y="18">Most to least restrictive</text>
    ${box(20, 30, 260, 134, "od-k od-p", 14)}
    <text class="od-cap" x="30" y="46">public</text>
    ${box(40, 48, 220, 104, "od-k od-salmonfill", 12)}
    <text class="od-cap od-onink" x="50" y="62">protected</text>
    ${box(60, 64, 180, 78, "od-k od-greenfill", 10)}
    <text class="od-cap od-onink" x="70" y="78">default</text>
    ${box(80, 80, 140, 52, "od-k od-yfill", 8)}
    <text class="od-b" x="150" y="110" text-anchor="middle">private</text>
    <text class="od-cap" x="10" y="176">private is innermost, public wraps around everything</text>`;
  return fig("fourLevelsNestedBoxes", 300, 182, "The four access levels as nested boxes, private innermost and public outermost", "Four nested boxes: public outermost, then protected, then default, then private innermost — from least restrictive at the edge to most restrictive at the center.", inner);
}

// ---------- acc-3: BankAccount's three fields at three different openness levels ----------
function bankAccountThreeOpenness() {
  const inner = `
    <text class="od-t" x="10" y="18">BankAccount fields,</text>
    <text class="od-t" x="10" y="36">three openness levels</text>
    ${padlock(66, 84, 1.05, "od-yfill")}
    <text class="od-s" x="66" y="124" text-anchor="middle">private</text>
    <text class="od-cap" x="66" y="138" text-anchor="middle">balance — locked</text>
    ${box(118, 64, 84, 44, "od-k od-greenfill", 8)}
    <text class="od-s od-onink" x="160" y="84" text-anchor="middle">protected</text>
    <text class="od-s od-onink" x="160" y="100" text-anchor="middle">accountType</text>
    <text class="od-cap" x="160" y="124" text-anchor="middle">half-open</text>
    ${box(212, 58, 74, 56, "od-k od-p", 8)}
    <text class="od-s" x="249" y="78" text-anchor="middle">public</text>
    <text class="od-s" x="249" y="94" text-anchor="middle">ownerName</text>
    <text class="od-cap" x="249" y="124" text-anchor="middle">wide open</text>
    <text class="od-cap" x="10" y="168">same class, three different doors on its own fields</text>`;
  return fig("bankAccountThreeOpenness", 300, 182, "BankAccount's three fields shown at three different openness levels", "A padlock labeled private balance (locked), a green box labeled protected accountType (half-open), and a paper box labeled public ownerName (wide open) — the same class, three different levels of access.", inner);
}

// ---------- acc-4: default to private, widen only what genuinely needs it ----------
function leastPrivilegeDefaultLocked() {
  const inner = `
    <text class="od-t" x="10" y="18">Default to private,</text>
    <text class="od-t" x="10" y="36">widen only when needed</text>
    ${box(20, 48, 260, 74, "od-k od-inkfill", 12)}
    <text class="od-s od-onink" x="150" y="66" text-anchor="middle">everything starts PRIVATE</text>
    ${padlock(66, 100, 0.72, "od-yfill")}
    ${padlock(122, 100, 0.72, "od-yfill")}
    ${padlock(178, 100, 0.72, "od-yfill")}
    ${box(216, 84, 46, 32, "od-k od-p", 16)}
    <text class="od-cap" x="239" y="104" text-anchor="middle">open</text>
    <text class="od-cap" x="150" y="138" text-anchor="middle">only widen the one field that truly needs it</text>
    <line class="od-k od-t od-dash" x1="10" y1="148" x2="290" y2="148"/>
    <text class="od-cap" x="10" y="168">the opposite — all public — removes every safeguard</text>
    ${badge(272, 158, 13, "od-salmonfill", `<path class="od-k" d="${CROSS}" transform="scale(0.85)"/>`)}`;
  return fig("leastPrivilegeDefaultLocked", 300, 182, "The principle of least privilege: default every field to private, widen only when needed", "A black panel reading everything starts PRIVATE contains three small padlocks and one open, unlocked slot — only the one field that genuinely needs wider access gets it. A caption notes making everything public instead removes every safeguard.", inner);
}

// ---------- acc-7 (key takeaway) ----------
function accessTakeaway() {
  const inner = `
    ${box(20, 24, 260, 40, "od-k od-inkfill", 10)}
    <text class="od-s od-onink" x="150" y="49" text-anchor="middle">private &lt; default &lt; protected &lt; public</text>
    ${arrowDown(150, 82)}
    ${box(60, 84, 180, 34, "od-k od-yfill", 10)}
    <text class="od-b" x="150" y="106" text-anchor="middle">enforced encapsulation</text>
    <rect class="od-k" x="20" y="126" width="260" height="10" rx="4"/>
    <text class="od-cap" x="150" y="150" text-anchor="middle">default to private, widen only when needed</text>`;
  return fig("accessTakeaway", 300, 168, "Access modifiers are the mechanism that makes encapsulation enforceable", "A black bar reads private less than default less than protected less than public, with an arrow down into a mustard box reading enforced encapsulation, resting on a ground line.", inner);
}

export default {
  sameNameForkOverloadOverride, calculatorThreeDoors, runtimeDispatchDogSound,
  overloadOverrideCompactCompare, overrideAccessWidening, overloadReturnTypeAlone,
  covariantReturnOverride, ovldTakeaway,
  abstractClassCannotInstantiate, shapeCircleForcedImplement, interfaceChecklistContract,
  payableEmployeeImplements, duckMultipleInterfacesFanIn, abstractInterfaceCompactCompare,
  decisionFlowChooseTool, whyManyInterfacesOneClassConflict, absIntTakeaway,
  gatekeeperIntro, fourLevelsNestedBoxes, bankAccountThreeOpenness,
  leastPrivilegeDefaultLocked, accessTakeaway,
};
