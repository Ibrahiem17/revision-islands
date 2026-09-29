/**
 * OOP note-diagram registry (render.js opts.diagrams). Phase 1 shipped diagrams for the "Quick
 * Revision" section (15 items) and Topic 1 · What is OOP? (7 items) as the flagship/proof section.
 * Phase 2A adds Topic 2 · Classes & Objects, Topic 3 · Constructors, Topic 4 · Encapsulation.
 * Phase 2B adds Topic 5 · Abstraction, Topic 6 · Inheritance, Topic 7 · Polymorphism.
 * Phase 2C adds Topic 8 · Method Overloading vs Overriding, Topic 9 · Abstract Classes vs
 * Interfaces, Topic 10 · Access Modifiers.
 * Topics 11-15 are deferred to a follow-up phase (too large for one pass; see
 * scratchpad/oop_redesign_brief.md). Split by section the same way System Design splits by topic
 * (src/topics/system-design-diagrams.js + system-design-diagrams-data.js + diagrams/*-topic4.js),
 * merged here and passed into mountTopic as `{ diagrams }` from src/topics/oop.js.
 */
import qr from "./diagrams/oop-diagrams-qr.js";
import topic1 from "./diagrams/oop-diagrams-topic1.js";
import topic24 from "./diagrams/oop-diagrams-topic2-4.js";
import topic57 from "./diagrams/oop-diagrams-topic5-7.js";
import topic810 from "./diagrams/oop-diagrams-topic8-10.js";

export default { ...qr, ...topic1, ...topic24, ...topic57, ...topic810 };
