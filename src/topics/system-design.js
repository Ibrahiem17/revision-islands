import { mountTopic } from "../shared/topic-page.js";
import { buildPage, startFx } from "./system-design-fx.js";
import baseDiagrams from "./system-design-diagrams.js";
import dataDiagrams from "./system-design-diagrams-data.js";
import topic4Diagrams from "./diagrams/system-design-diagrams-topic4.js";

const diagrams = { ...baseDiagrams, ...dataDiagrams, ...topic4Diagrams };

// 1) skeleton -> full markup (text/art come from the `content` object in system-design-fx.js)
buildPage();

// 2) notes, search, progress, mascot (shared engine; needs #content #search #progress-fill #progress-text)
mountTopic("systemDesign", () => import("../../content/system-design/index.js"), { collapsibleNotes: true, diagrams })
  .catch((e) => console.error(e))
  .finally(() => {
    // 3) motion + live counts (must never block the notes)
    try { startFx(); } catch (e) { console.error("[system-design] fx failed", e); document.documentElement.classList.remove("intro-on"); }
  });
