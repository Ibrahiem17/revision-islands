/**
 * Shared rendering engine used by every topic page (topics/*.html).
 * Reads content from REVISION_DATA (js/data.js) and exposes a small
 * `Revision` API on window:
 *
 *   Revision.renderPage(topicKey, { contentEl, searchEl, progressFillEl, progressTextEl })
 *   Revision.progressFor(topicKey)  -> { pct, total, learned }
 *
 * Renders content as a linear "notes" flow (one item after another,
 * top to bottom) rather than a card grid — the goal is that reopening
 * a topic reads like re-reading your notes, not scanning a dashboard.
 * Nothing here is topic-specific — every page's unique look comes from
 * its own CSS file, not from this script.
 */
(function (global) {
  "use strict";

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function learnedKey(topicKey) {
    return "learned_" + topicKey;
  }

  function getLearnedSet(topicKey) {
    try {
      const raw = localStorage.getItem(learnedKey(topicKey));
      return new Set(raw ? JSON.parse(raw) : []);
    } catch (e) {
      return new Set();
    }
  }

  function saveLearnedSet(topicKey, set) {
    localStorage.setItem(learnedKey(topicKey), JSON.stringify([...set]));
  }

  function countItems(topicData) {
    let total = 0;
    topicData.sections.forEach(s => { total += s.items.length; });
    return total;
  }

  function progressFor(topicKey) {
    const data = global.REVISION_DATA && global.REVISION_DATA[topicKey];
    if (!data || !data.sections || !data.sections.length) return { pct: 0, total: 0, learned: 0 };
    const total = countItems(data);
    const learnedSet = getLearnedSet(topicKey);
    const learned = [...learnedSet].filter(id =>
      data.sections.some(s => s.items.some(i => i.id === id))
    ).length;
    return { pct: total ? Math.round((learned / total) * 100) : 0, total, learned };
  }

  // ---------- note-block renderers ----------

  // wrap **phrase** in prose with a glowing highlight — lets specific
  // sentences/gotchas stand out without flagging the whole block as
  // important. Runs on already-escaped text, so this is safe from HTML
  // injection (the escaping happened first).
  function glowInline(escapedText) {
    return escapedText.replace(/\*\*(.+?)\*\*/g, '<strong class="glow-word">$1</strong>');
  }
  // for any single field of prose a human wrote (question, answer,
  // a list point, a table note) — escape, then allow **glow** markers.
  function richText(str) {
    return glowInline(escapeHtml(str));
  }
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
    const { pct } = progressFor(topicKey);
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

  function renderPage(topicKey, opts) {
    const topicData = global.REVISION_DATA && global.REVISION_DATA[topicKey];

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

  global.Revision = { renderPage, progressFor, escapeHtml };

})(window);
