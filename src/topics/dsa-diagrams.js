/**
 * DSA note-diagram registry (render.js opts.diagrams, keyed by item.diagram in content/dsa/index.js).
 * Split by section like the OOP / System Design registries; shared helpers live in diagrams/dsa-kit.js
 * and the figure styles in dsa-diagrams.css (imported from dsa.js).
 */
import basics from "./diagrams/dsa-d-basics.js";
import lists from "./diagrams/dsa-d-lists.js";
import graphs from "./diagrams/dsa-d-graphs.js";
import algos from "./diagrams/dsa-d-algos.js";
import mine from "./diagrams/dsa-d-mine.js";

export default { ...basics, ...lists, ...graphs, ...algos, ...mine };
