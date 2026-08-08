/**
 * Database-page-only motion & interaction layer. Purely decorative —
 * runs after js/render.js has built the .note-block elements. Nothing
 * here touches content, search, progress or the learned-checkbox
 * logic in js/render.js.
 */
window.DatabaseFX = (function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- 3D tilt on hover, following the cursor ----------
  function attachTilt(el) {
    function onMove(e) {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.setProperty("--ry", (px * 5).toFixed(2) + "deg");
      el.style.setProperty("--rx", (py * -5).toFixed(2) + "deg");
    }
    function onLeave() {
      el.style.removeProperty("--rx");
      el.style.removeProperty("--ry");
    }
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
  }

  // ---------- fade/rise into view as you scroll ----------
  function attachScrollReveal(items) {
    if (!("IntersectionObserver" in window)) {
      items.forEach(el => el.classList.add("fx-in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fx-in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    items.forEach(el => io.observe(el));
  }

  // ---------- a small hand-drawn icon per topic ----------
  // Simple 24x24 line-icon shapes, matched by keyword against the
  // section title. Colored via currentColor, so they pick up
  // whatever --accent the page is themed with automatically.
  const ICON_SHELF   = '<rect x="4" y="4" width="16" height="4" rx="1"/><rect x="4" y="10" width="16" height="4" rx="1"/><rect x="4" y="16" width="16" height="4" rx="1"/>';
  const ICON_SEARCH   = '<circle cx="10" cy="10" r="6"/><line x1="15" y1="15" x2="21" y2="21"/>';
  const ICON_FUNNEL    = '<path d="M4 4h16l-6 8v6l-4 2v-8z"/>';
  const ICON_SORT      = '<line x1="7" y1="4" x2="7" y2="20"/><polyline points="4,7 7,4 10,7"/><line x1="17" y1="4" x2="17" y2="20"/><polyline points="14,17 17,20 20,17"/>';
  const ICON_SIGMA     = '<text x="12" y="17" font-size="15" text-anchor="middle" fill="currentColor" stroke="none" font-family="Georgia,serif">Σ</text>';
  const ICON_BARS      = '<line x1="5" y1="20" x2="5" y2="14"/><line x1="12" y1="20" x2="12" y2="9" /><line x1="19" y1="20" x2="19" y2="5"/>';
  const ICON_VENN_FILL = '<circle cx="9" cy="12" r="6.5" fill="currentColor" fill-opacity="0.35" stroke="none"/><circle cx="15" cy="12" r="6.5" fill="currentColor" fill-opacity="0.35" stroke="none"/>';
  const ICON_VENN_LINE = '<circle cx="9" cy="12" r="5.5"/><circle cx="15" cy="12" r="5.5"/>';
  const ICON_KEY       = '<circle cx="8" cy="8" r="4"/><line x1="11" y1="11" x2="20" y2="20"/><line x1="15.5" y1="15.5" x2="18.5" y2="12.5"/><line x1="18" y1="18" x2="21" y2="15"/>';
  const ICON_GRID      = '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>';
  const ICON_ONECELL   = '<rect x="5" y="5" width="14" height="14" rx="2"/><circle cx="12" cy="12" r="2" fill="currentColor" stroke="none"/>';
  const ICON_TWOBOX     = '<rect x="1" y="8" width="8" height="8" rx="1"/><rect x="15" y="8" width="8" height="8" rx="1"/><line x1="9" y1="12" x2="15" y2="12"/>';
  const ICON_THREEBOX  = '<rect x="1" y="9" width="6" height="6" rx="1"/><rect x="9" y="9" width="6" height="6" rx="1"/><rect x="17" y="9" width="6" height="6" rx="1"/><line x1="7" y1="12" x2="9" y2="12"/><line x1="15" y1="12" x2="17" y2="12"/>';
  const ICON_SHIELD    = '<path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6z"/><polyline points="9,12 11,14 15,10"/>';
  const ICON_SERVERS   = '<rect x="2" y="4" width="6" height="16" rx="1"/><rect x="9" y="4" width="6" height="16" rx="1"/><rect x="16" y="4" width="6" height="16" rx="1"/><line x1="4" y1="8" x2="6" y2="8"/><line x1="11" y1="8" x2="13" y2="8"/><line x1="18" y1="8" x2="20" y2="8"/>';
  const ICON_DIVIDED   = '<rect x="3" y="4" width="18" height="16" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="3" y1="16" x2="21" y2="16"/>';
  const ICON_BOOKMARK  = '<path d="M6 3h9a2 2 0 0 1 2 2v16l-6.5-4L4 21V5a2 2 0 0 1 2-2z"/>';
  const ICON_PARENS    = '<path d="M9 4C6 4 4 8 4 12s2 8 5 8"/><path d="M15 4c3 0 5 4 5 8s-2 8-5 8"/>';
  const ICON_WINDOW    = '<rect x="4" y="4" width="16" height="16" rx="1"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="12" y1="4" x2="12" y2="20"/>';
  const ICON_STACK     = '<circle cx="12" cy="6" r="3"/><circle cx="12" cy="18" r="3"/><line x1="12" y1="9" x2="12" y2="15"/>';
  const ICON_SYNC      = '<path d="M4 12a8 8 0 0 1 14-5"/><polyline points="18,3 18,7 14,7"/><path d="M20 12a8 8 0 0 1-14 5"/><polyline points="6,21 6,17 10,17"/>';
  const ICON_SCALE     = '<line x1="12" y1="3" x2="12" y2="21"/><line x1="4" y1="7" x2="20" y2="7"/><path d="M4 7l-3 7a3 3 0 0 0 6 0z"/><path d="M20 7l-3 7a3 3 0 0 0 6 0z"/>';
  const ICON_BOLT      = '<path d="M13 2 4 14h6l-1 8 9-12h-6z" fill="currentColor" stroke="none"/>';
  const ICON_DEFAULT   = '<circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2" fill="currentColor" stroke="none"/>';

  // Keyed strictly off the "Topic N" number prefix, NOT fuzzy keyword
  // matching against the full title — several topic titles reference
  // other topics in passing (e.g. Topic 18's title contains the word
  // "aggregates"), which would false-match a loose /aggregate/ rule.
  // The two non-numbered sections are checked explicitly by name.
  const TOPIC_NUMBER_ICON = {
    1: ICON_SHELF,      // Foundations
    2: ICON_SEARCH,     // SELECT & FROM
    3: ICON_FUNNEL,      // WHERE
    4: ICON_SORT,        // ORDER BY & LIMIT
    5: ICON_SIGMA,       // Aggregate Functions
    6: ICON_BARS,        // GROUP BY
    7: ICON_VENN_LINE,   // JOIN
    8: ICON_KEY,         // Primary Key & Foreign Key
    9: ICON_GRID,        // Normalization
    10: ICON_ONECELL,    // 1NF
    11: ICON_TWOBOX,     // 2NF
    12: ICON_SHIELD,     // ACID
    13: ICON_SERVERS,    // Sharding
    14: ICON_DIVIDED,    // Partitioning vs Sharding
    15: ICON_THREEBOX,   // 3NF
    16: ICON_BOOKMARK,   // Indexes
    17: ICON_PARENS,     // Subqueries
    18: ICON_WINDOW,     // Window Functions
    19: ICON_STACK,      // UNION, UNION ALL & CTEs
    20: ICON_SYNC,       // Transactions & Isolation Levels
    21: ICON_SCALE       // SQL vs NoSQL
  };

  function iconFor(title) {
    if (/quick revision/i.test(title)) return ICON_BOLT;
    if (/join types/i.test(title)) return ICON_VENN_FILL;
    const m = title.match(/^Topic\s*(\d+)/i);
    if (m && TOPIC_NUMBER_ICON[+m[1]]) return TOPIC_NUMBER_ICON[+m[1]];
    return ICON_DEFAULT;
  }

  function svgWrap(inner) {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
  }

  // shorten "Topic 7 · JOIN — combining two tables" -> "JOIN"
  function shortLabel(title) {
    let t = title.replace(/^Topic\s*\d+\s*·\s*/i, "").replace(/^⚡\s*/, "");
    const dash = t.indexOf("—");
    if (dash > -1) t = t.slice(0, dash);
    return t.trim();
  }

  // ---------- icons in every section header + a jump-to-topic map ----------
  function addIconsAndTopicMap() {
    const sections = document.querySelectorAll(".section");
    const chips = [];

    sections.forEach((section, i) => {
      const titleEl = section.querySelector(".section-title");
      if (!titleEl) return;
      // strip the "▾" chevron span's text before reading the title
      const clone = titleEl.cloneNode(true);
      const chevronClone = clone.querySelector(".chevron");
      if (chevronClone) chevronClone.remove();
      const fullTitle = clone.textContent.trim();
      const svg = svgWrap(iconFor(fullTitle));

      section.id = "db-topic-" + i;

      // icon inside the section's own header, right after the chevron
      if (!titleEl.querySelector(".section-icon")) {
        const iconSpan = document.createElement("span");
        iconSpan.className = "section-icon";
        iconSpan.setAttribute("aria-hidden", "true");
        iconSpan.innerHTML = svg;
        const chevron = titleEl.querySelector(".chevron");
        (chevron || titleEl.firstChild).insertAdjacentElement("afterend", iconSpan);
      }

      chips.push(`
        <button type="button" class="topic-chip" data-target="db-topic-${i}" title="${fullTitle.replace(/"/g, "&quot;")}">
          <span class="topic-chip-icon">${svg}</span>
          <span class="topic-chip-label">${shortLabel(fullTitle)}</span>
        </button>`);
    });

    const content = document.getElementById("content");
    if (!content || chips.length === 0) return;

    const map = document.createElement("nav");
    map.className = "topic-map";
    map.setAttribute("aria-label", "Jump to a topic");
    map.innerHTML = `<div class="topic-map-title">🗺️ Jump to a topic</div><div class="topic-map-grid">${chips.join("")}</div>`;
    content.parentNode.insertBefore(map, content);

    map.addEventListener("click", (e) => {
      const btn = e.target.closest(".topic-chip");
      if (!btn) return;
      const target = document.getElementById(btn.dataset.target);
      if (!target) return;
      // sections start collapsed — jumping to one should actually show it
      target.classList.remove("collapsed");
      const titleBtn = target.querySelector(".section-title");
      if (titleBtn) titleBtn.setAttribute("aria-expanded", "true");
      target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
    });
  }

  function init() {
    const blocks = document.querySelectorAll(".note-block");

    if (!prefersReducedMotion) {
      blocks.forEach(attachTilt);
    }
    blocks.forEach(el => el.classList.add("fx-ready"));
    attachScrollReveal(blocks);

    addIconsAndTopicMap();
  }

  return { init };
})();
