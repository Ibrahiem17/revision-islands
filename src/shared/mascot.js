/**
 * The little guide character in the bottom-right corner of every topic page.
 * Click it and it collects every item flagged `takeaway: true` in that topic's
 * content (content/<topic>/index.js), grouped by section, and shows them in a
 * speech bubble. Moods: happy at rest when there are takeaways, sad when there
 * are none, excited while hovered / open.
 *
 * Self-contained: takes the topic's data object, so it also works on
 * topics/devops.html, which doesn't use the shared notes engine.
 *
 *   import { init } from "../shared/mascot.js";
 *   init(topicData);     // topicData may be undefined -> sad mascot
 */
import { escapeHtml, richText } from "./text.js";


// groups stay in the same order the topics appear in the data
function collectTakeaways(data) {
  if (!data || !data.sections) return [];
  const found = [];
  data.sections.forEach(section => {
    (section.items || []).forEach(item => {
      if (item.takeaway) found.push({ section: section.title, body: item.body });
    });
  });
  return found;
}

const CHAR_SVG = `
  <svg class="mascot-svg" viewBox="0 0 60 62" aria-hidden="true">
    <ellipse class="mascot-shadow" cx="30" cy="58" rx="15" ry="3.5"/>
    <circle class="mascot-glow" cx="30" cy="29" r="25"/>
    <line class="mascot-antenna" x1="30" y1="9" x2="30" y2="2"/>
    <circle class="mascot-antenna-tip" cx="30" cy="2" r="2.6"/>
    <path class="mascot-body" d="M30 9c11 0 18.5 8.2 18.5 19S41 48 30 48 11.5 39.8 11.5 28 19 9 30 9Z"/>
    <line class="eyebrow eyebrow-left" x1="19" y1="21.5" x2="26.5" y2="23.5"/>
    <line class="eyebrow eyebrow-right" x1="41" y1="21.5" x2="33.5" y2="23.5"/>
    <circle class="mascot-eye" cx="23.3" cy="27.5" r="3"/>
    <circle class="mascot-eye" cx="36.7" cy="27.5" r="3"/>
    <path class="mascot-mouth mouth-happy"   d="M24 35q6 5 12 0" fill="none"/>
    <path class="mascot-mouth mouth-excited" d="M21.5 33.5q8.5 9 17 0" fill="none"/>
    <path class="mascot-mouth mouth-sad"     d="M24 39q6 -5 12 0" fill="none"/>
  </svg>`;

function build(data) {
  const takeaways = collectTakeaways(data);
  const hasTakeaways = takeaways.length > 0;
  const restingMood = hasTakeaways ? "happy" : "sad";

  const wrap = document.createElement("div");
  wrap.className = "mascot-wrap";
  wrap.innerHTML = `
    <div class="mascot-bubble" role="dialog" aria-label="Key takeaways by topic" aria-hidden="true">
      <button type="button" class="mascot-close" aria-label="Close">✕</button>
      <div class="mascot-bubble-title">✨ Key takeaways, by topic</div>
      <div class="mascot-bubble-body"></div>
    </div>
    <button type="button" class="mascot-char mood-${restingMood}" aria-label="Show key takeaways for this topic" aria-expanded="false">
      ${CHAR_SVG}
    </button>
  `;
  document.body.appendChild(wrap);

  const bodyEl = wrap.querySelector(".mascot-bubble-body");
  if (hasTakeaways) {
    bodyEl.innerHTML = takeaways.map((t, i) => {
      const paras = Array.isArray(t.body) ? t.body : [t.body];
      return `
        <div class="mascot-group">
          <button type="button" class="mascot-group-title" data-idx="${i}" aria-expanded="false">
            <span class="mascot-chevron">▸</span> ${escapeHtml(t.section)}
          </button>
          <div class="mascot-takeaway">${paras.map(p => `<p>${richText(p)}</p>`).join("")}</div>
        </div>`;
    }).join("");
  } else {
    bodyEl.innerHTML = `<p class="mascot-empty">No key takeaways saved for this topic yet — they'll show up here as soon as some are added.</p>`;
  }

  return { wrap, restingMood };
}

export function init(data) {
  const { wrap, restingMood } = build(data);
  const charBtn = wrap.querySelector(".mascot-char");
  const bubble = wrap.querySelector(".mascot-bubble");
  const closeBtn = wrap.querySelector(".mascot-close");

  function setMood(mood) {
    charBtn.classList.remove("mood-happy", "mood-excited", "mood-sad");
    charBtn.classList.add("mood-" + mood);
  }

  function open() {
    bubble.classList.add("open");
    bubble.setAttribute("aria-hidden", "false");
    charBtn.setAttribute("aria-expanded", "true");
    setMood("excited");
  }
  function close() {
    bubble.classList.remove("open");
    bubble.setAttribute("aria-hidden", "true");
    charBtn.setAttribute("aria-expanded", "false");
    setMood(restingMood);
  }

  charBtn.addEventListener("click", () => {
    bubble.classList.contains("open") ? close() : open();
  });
  charBtn.addEventListener("mouseenter", () => setMood("excited"));
  charBtn.addEventListener("mouseleave", () => {
    if (!bubble.classList.contains("open")) setMood(restingMood);
  });
  closeBtn.addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
  document.addEventListener("click", (e) => {
    if (bubble.classList.contains("open") && !wrap.contains(e.target)) close();
  });

  // each topic group folds open/closed independently, so the list
  // of 20+ topics stays scannable instead of one long wall of text
  wrap.querySelectorAll(".mascot-group-title").forEach(btn => {
    btn.addEventListener("click", () => {
      const group = btn.closest(".mascot-group");
      const isOpen = group.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(isOpen));
    });
  });
}

