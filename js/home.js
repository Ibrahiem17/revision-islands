/**
 * Homepage-only script: paints each island's "% mastered" badge by
 * reading progress that was saved (in localStorage) while visiting
 * that topic's own page. Purely read-only — no navigation logic here,
 * islands are plain <a href> links now.
 */
(function () {
  "use strict";

  // DevOps has its own full cheat-sheet page (34 tabs, not the
  // flashcard/progress schema) — give it a fixed label instead of a
  // misleading 0% mastered badge.
  const STATIC_LABELS = {
    devops: "📚 full cheat sheet"
  };

  document.querySelectorAll(".progress-badge").forEach(badge => {
    const topicKey = badge.getAttribute("data-topic");
    if (STATIC_LABELS[topicKey]) {
      badge.textContent = STATIC_LABELS[topicKey];
      return;
    }
    const { pct, total } = window.Revision.progressFor(topicKey);
    badge.textContent = total ? `${pct}% mastered` : "no data yet";
  });

})();
