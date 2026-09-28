/**
 * Homepage script: paints each island's "% mastered" badge from progress saved
 * (in localStorage) on that topic's page. Reads only content/manifest.json
 * (counts + item ids) — no topic content is loaded here.
 */
import manifest from "../../content/manifest.json";
import { progressFor } from "../shared/progress.js";

// DevOps has its own full cheat-sheet page (not the flashcard/progress schema).
const STATIC_LABELS = {
  devops: "📚 full cheat sheet"
};

const byKey = new Map(manifest.map((t) => [t.key, t]));

document.querySelectorAll(".progress-badge").forEach(badge => {
  const topicKey = badge.getAttribute("data-topic");
  if (STATIC_LABELS[topicKey]) {
    badge.textContent = STATIC_LABELS[topicKey];
    return;
  }
  const t = byKey.get(topicKey);
  const { pct, total } = progressFor(topicKey, t ? t.ids : []);
  badge.textContent = total ? `${pct}% mastered` : "no data yet";
});
