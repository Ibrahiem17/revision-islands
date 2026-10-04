import { mountTopic } from "../shared/topic-page.js";
import { startHero, startVignettes } from "./dsa-fx.js";
import "./dsa-vignettes.css";
import diagrams from "./dsa-diagrams.js";
import "./dsa-diagrams.css";
import { startInteractive } from "./dsa-interactive.js";

// 1) hero first: pure DOM, no dependencies, and it must never block the notes
try { startHero(); } catch (e) { console.error("[dsa] hero failed", e); }

// 2) notes, search, progress, mascot (shared engine; needs #content #search #progress-fill #progress-text)
mountTopic("dsa", () => import("../../content/dsa/index.js"), { collapsibleNotes: true, diagrams })
  .then(() => {
    // 3) per-section banners (after the sections exist); failure must never touch the notes
    try { startVignettes(); } catch (e) { console.error("[dsa] banners failed", e); }
    // 4) interactive step-through figures
    try { startInteractive(); } catch (e) { console.error("[dsa] interactive failed", e); }
  })
  .catch((e) => console.error(e));
