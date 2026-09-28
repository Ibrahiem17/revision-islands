/**
 * Shared rendering engine used by every topic page.
 *
 *   renderPage(topicKey, topicData, { contentEl, searchEl, progressFillEl, progressTextEl })
 *
 * topicData is the default export of content/<topic>/index.js (see content/README.md).
 * Renders content as a linear "notes" flow (one item after another, top to bottom)
 * rather than a card grid. Nothing here is topic-specific — every page's look comes
 * from its own CSS file. Progress storage lives in ./progress.js.
 */
import { escapeHtml, richText } from "./text.js";
import { getLearnedSet, saveLearnedSet, progressFor } from "./progress.js";

// ---------- note-block renderers ----------

// "body" / "note" fields may be a single string or an array of
// paragraphs — keeps longer explanations readable instead of one
// wall of text. Each paragraph also gets **glow** support.
function bodyToHtml(body) {
  const paras = Array.isArray(body) ? body : [body];
  return paras.map(p => `<p>${richText(p)}</p>`).join("");
}
function bodyToSearchText(body) {
  return (Array.isArray(body) ? body.join(" ") : body).toLowerCase();
}

function renderItem(item, learnedSet) {
  const isLearned = learnedSet.has(item.id);
  const learnedClass = isLearned ? " learned" : "";
  // optional "important: true" on any item type -> gets the glow treatment
  const importantClass = item.important ? " note-important" : "";
  const stateClasses = learnedClass + importantClass;
  const checkbox = `<input type="checkbox" class="note-check" data-id="${item.id}" ${isLearned ? "checked" : ""} title="Mark as reviewed">`;

  switch (item.type) {
    case "qa":
      return `
        <div class="note-block qa-block${stateClasses}" data-searchable="${escapeHtml((item.question + " " + item.answer).toLowerCase())}">
          <div class="note-head">
            ${checkbox}
            <button type="button" class="qa-toggle">❓ ${richText(item.question)}</button>
          </div>
          <div class="qa-answer"><strong>Answer:</strong> ${richText(item.answer)}</div>
        </div>`;

    case "concept":
      return `
        <div class="note-block${stateClasses}" data-searchable="${escapeHtml(item.title.toLowerCase() + " " + bodyToSearchText(item.body))}">
          <div class="note-head">${checkbox}<h4><span class="type-icon">📌</span>${escapeHtml(item.title)}</h4></div>
          ${bodyToHtml(item.body)}
        </div>`;

    case "list":
      return `
        <div class="note-block${stateClasses}" data-searchable="${escapeHtml((item.title + " " + item.points.join(" ")).toLowerCase())}">
          <div class="note-head">${checkbox}<h4><span class="type-icon">📋</span>${escapeHtml(item.title)}</h4></div>
          <ul>${item.points.map(p => `<li>${richText(p)}</li>`).join("")}</ul>
        </div>`;

    case "code":
      return `
        <div class="note-block${stateClasses}" data-searchable="${escapeHtml((item.title + " " + item.code + " " + (item.note || "")).toLowerCase())}">
          <div class="note-head">${checkbox}<h4><span class="type-icon">💻</span>${escapeHtml(item.title)}</h4></div>
          <pre><code>${escapeHtml(item.code)}</code></pre>
          ${item.note ? bodyToHtml(item.note) : ""}
        </div>`;

    case "table": {
      const searchBits = [item.title, ...item.headers, ...item.rows.flat(), item.note || ""].join(" ").toLowerCase();
      return `
        <div class="note-block${stateClasses}" data-searchable="${escapeHtml(searchBits)}">
          <div class="note-head">${checkbox}<h4><span class="type-icon">🗂️</span>${escapeHtml(item.title)}</h4></div>
          <div class="table-scroll">
            <table>
              <thead><tr>${item.headers.map(h => `<th>${escapeHtml(h)}</th>`).join("")}</tr></thead>
              <tbody>
                ${item.rows.map(row => `<tr>${row.map(cell => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`).join("")}
              </tbody>
            </table>
          </div>
          ${item.note ? bodyToHtml(item.note) : ""}
        </div>`;
    }

    default:
      return "";
  }
}

function updateProgressUI(topicKey, topicData, opts) {
  const ids = topicData.sections.flatMap(s => s.items.map(i => i.id));
  const { pct } = progressFor(topicKey, ids);
  if (opts.progressFillEl) opts.progressFillEl.style.width = pct + "%";
  if (opts.progressTextEl) opts.progressTextEl.textContent = pct + "%";
}

function filterContent(contentEl, query) {
  const q = query.trim().toLowerCase();
  contentEl.querySelectorAll(".note-block").forEach(block => {
    const hay = block.getAttribute("data-searchable") || "";
    block.classList.toggle("hidden-search", q.length > 0 && !hay.includes(q));
  });
  contentEl.querySelectorAll(".section").forEach(section => {
    const visible = [...section.querySelectorAll(".note-block")].some(b => !b.classList.contains("hidden-search"));
    section.style.display = visible ? "" : "none";
    // sections start collapsed by default, so while actively
    // searching, auto-open the ones with a match — otherwise typing
    // a search term would find results but keep them hidden behind
    // a still-collapsed heading. Only touch collapse state while a
    // query is active; clearing the box leaves things as you left them.
    if (q.length > 0) {
      section.classList.toggle("collapsed", !visible);
      const titleBtn = section.querySelector(".section-title");
      if (titleBtn) titleBtn.setAttribute("aria-expanded", String(visible));
    }
  });
}

// ---------- main entry point ----------

export function renderPage(topicKey, topicData, opts) {
  if (!topicData || !topicData.sections || topicData.sections.length === 0) {
    opts.contentEl.innerHTML = `
      <div class="empty-state">
        <span class="big">📭</span>
        No notes yet for this island.<br>
        Send your notes for this topic and they'll be arranged here.
      </div>`;
    if (opts.progressFillEl) opts.progressFillEl.style.width = "0%";
    if (opts.progressTextEl) opts.progressTextEl.textContent = "0%";
    return;
  }

  const learnedSet = getLearnedSet(topicKey);

  opts.contentEl.innerHTML = topicData.sections.map((section, idx) => `
    <section class="section collapsed" data-index="${idx}">
      <button type="button" class="section-title" aria-expanded="false">
        <span class="chevron">▾</span> ${escapeHtml(section.title)}
      </button>
      <div class="notes-flow">
        ${section.items.map(item => renderItem(item, learnedSet)).join("")}
      </div>
    </section>
  `).join("");

  updateProgressUI(topicKey, topicData, opts);

  // accordion toggle (whole topic sections — collapse what you've
  // already reviewed so the page never feels like too much at once)
  opts.contentEl.querySelectorAll(".section-title").forEach(btn => {
    btn.addEventListener("click", () => {
      const section = btn.closest(".section");
      const collapsed = section.classList.toggle("collapsed");
      btn.setAttribute("aria-expanded", String(!collapsed));
    });
  });

  // interview-question reveal (click question, answer folds open below)
  opts.contentEl.querySelectorAll(".qa-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.closest(".qa-block").classList.toggle("open");
    });
  });

  // "reviewed" checkboxes
  opts.contentEl.querySelectorAll(".note-check").forEach(box => {
    box.addEventListener("click", (e) => e.stopPropagation());
    box.addEventListener("change", () => {
      const set = getLearnedSet(topicKey);
      if (box.checked) set.add(box.dataset.id);
      else set.delete(box.dataset.id);
      saveLearnedSet(topicKey, set);
      box.closest(".note-block").classList.toggle("learned", box.checked);
      updateProgressUI(topicKey, topicData, opts);
    });
  });

  if (opts.searchEl) {
    opts.searchEl.addEventListener("input", (e) => filterContent(opts.contentEl, e.target.value));
  }
}
