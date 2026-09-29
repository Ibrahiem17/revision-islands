import { mountTopic } from "../shared/topic-page.js";
import { buildPage, startFx } from "./oop-fx.js";
import diagrams from "./oop-diagrams.js";

// Load the content once (mountTopic normally does its own dynamic import, but buildPage() needs
// the data first — to compute the "151 CONCEPTS" / "15 PILLARS" stats from the real content
// instead of hard-coding numbers that could drift out of sync). The module is cached by the
// browser/bundler, so handing mountTopic an already-resolved value costs nothing extra.
import("../../content/oop/index.js")
  .then((m) => {
    const data = m.default;
    buildPage(data);
    return mountTopic("oop", () => Promise.resolve({ default: data }), { collapsibleNotes: true, diagrams });
  })
  .catch((e) => console.error("[oop] failed to load content", e))
  .finally(() => {
    try { startFx(); } catch (e) { console.error("[oop] fx failed", e); }
  });
