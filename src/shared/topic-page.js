import { renderPage } from "./render.js";
import { init as initMascot } from "./mascot.js";

/**
 * Standard data-driven topic page: load ONLY this topic's content (dynamic
 * import -> its own chunk), render it, and start the mascot.
 * Expects #content, #search, #progress-fill, #progress-text in the page.
 */
export async function mountTopic(topicKey, loadContent) {
  const data = (await loadContent()).default;
  renderPage(topicKey, data, {
    contentEl: document.getElementById("content"),
    searchEl: document.getElementById("search"),
    progressFillEl: document.getElementById("progress-fill"),
    progressTextEl: document.getElementById("progress-text")
  });
  initMascot(data);
  // optional cloud sync: constant-folded away by Vite unless VITE_CLOUD_SYNC=true
  if (import.meta.env.VITE_CLOUD_SYNC === "true") import("./cloud.js").then((m) => m.init());
}
