/**
 * OOP note-diagram registry (render.js opts.diagrams). Phase 1 ships diagrams for the "Quick
 * Revision" section (15 items) and Topic 1 · What is OOP? (7 items) as the flagship/proof section —
 * every other topic (2-15) is deferred to a follow-up phase (too large for one pass; see
 * scratchpad/oop_redesign_brief.md). Split by section the same way System Design splits by topic
 * (src/topics/system-design-diagrams.js + system-design-diagrams-data.js + diagrams/*-topic4.js),
 * merged here and passed into mountTopic as `{ diagrams }` from src/topics/oop.js.
 */
import qr from "./diagrams/oop-diagrams-qr.js";
import topic1 from "./diagrams/oop-diagrams-topic1.js";

export default { ...qr, ...topic1 };
