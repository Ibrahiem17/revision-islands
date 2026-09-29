/**
 * OOP page: green/salmon/mustard "Object Studio" restyle + motion, matching the Dribbble
 * reference video's structure (sticky pill nav, green hero with headline/stats/badge, wavy
 * divider into a second section) while keeping the page's own honest OOP actions.
 *
 *   buildPage(topicData)  - synchronous: nav pills, computed stats, badge ring (needs the loaded
 *                           content so "151 CONCEPTS" can never drift out of sync with the data)
 *   startFx()             - after render.js has mounted the notes: wiring, entrance animation,
 *                           scroll reveals, badge rotation, sparkle twinkle, count-ups
 *
 * Everything works without GSAP (CDN blocked): the CSS keyframes (ring spin, sparkle wiggle/
 * twinkle, wave draw, section reveal) all run on plain CSS/IntersectionObserver, so only the
 * one-time load-in flourish (nav stagger, headline drop, CTA pop) and the stat count-ups
 * actually need GSAP — and both have a plain-JS fallback below. Reduced motion: `body.rm` kills
 * every loop via CSS; the one-time entrance simply skips straight to its end state.
 */

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const content = {
  nav: [
    { label: "Notes", action: "scroll", target: "#notes", active: true },
    { label: "Search", action: "search" },
    { label: "Progress", action: "scroll", target: "#oopStats" },
    { label: "Map", action: "map", href: "../index.html" },
  ],
  ringText: "REVIEW · REPEAT · RECALL · ",
};

const RM = () => typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
const FINE = () => typeof matchMedia === "function" && matchMedia("(hover: hover) and (pointer: fine)").matches;

/* ---------- buildPage: nav, computed stats, ring text, headline split, sparkle decor ---------- */
export function buildPage(topicData) {
  // nav pills
  $("#oopPills").innerHTML = content.nav
    .map((n) =>
      n.action === "map"
        ? `<a class="oop-pill" href="${n.href}" data-nav="map">${esc(n.label)}</a>`
        : `<button type="button" class="oop-pill${n.active ? " is-active" : ""}" data-nav="${n.action}" data-target="${n.target || ""}">${esc(n.label)}</button>`
    )
    .join("");

  // computed stats: never hard-coded, so they can't drift out of sync with content/oop/index.js
  const sections = (topicData && topicData.sections) || [];
  const qr = sections[0];
  const pillarCount = qr && /quick revision/i.test(qr.title) ? qr.items.length : 0;
  const conceptTotal = sections.reduce((n, s) => n + s.items.length, 0);
  const setStat = (id, val) => {
    const el = $(id);
    if (!el) return;
    el.dataset.target = String(val);
    el.textContent = "0";
  };
  setStat("#statPillars", pillarCount);
  setStat("#statConcepts", conceptTotal);

  // circular badge ring: text curving around the circumference (rotation is pure CSS, see oop.css)
  const R = 50;
  $("#oopBadgeRing").innerHTML = `
    <svg viewBox="0 0 120 120" role="img" aria-hidden="true">
      <defs><path id="oopRingPath" d="M60,${60 - R} A${R},${R} 0 1,1 59.9,${60 - R}" fill="none"/></defs>
      <text><textPath href="#oopRingPath" startOffset="0%">${esc(content.ringText.repeat(3))}</textPath></text>
    </svg>`;

  // headline: split into per-letter spans (per line, so <br> stays a real line break) for the
  // one-time drop-in stagger; aria-label keeps it announced as one sentence to screen readers
  const headline = $("#oopHeadline");
  if (headline) {
    const lines = headline.innerHTML.split(/<br\s*\/?>/i).map((s) => s.trim());
    headline.setAttribute("aria-label", lines.join(" ").replace(/<[^>]+>/g, ""));
    let i = 0;
    headline.innerHTML = lines
      .map(
        (line) =>
          `<span class="ln"><span class="ln-in">${[...line]
            .map((c) => `<span class="ch" style="--i:${i++}">${c === " " ? "&nbsp;" : esc(c)}</span>`)
            .join("")}</span></span>`
      )
      .join("");
  }

  // scattered sparkle decorations (twinkle handled purely in CSS; positions/timing randomized here)
  const star = `<svg viewBox="0 0 24 24"><path d="M12 1 L14.2 9.8 L23 12 L14.2 14.2 L12 23 L9.8 14.2 L1 12 L9.8 9.8 Z" fill="var(--oop-mustard)" stroke="var(--oop-ink)" stroke-width="1.6" stroke-linejoin="round"/></svg>`;
  const heroSpots = [[8, 78, 20], [88, 16, 16], [72, 88, 14]];
  const hero = $(".oop-hero-in");
  if (hero) {
    heroSpots.forEach(([x, y, s], i) => {
      const d = document.createElement("span");
      d.className = "oop-deco-sparkle";
      d.setAttribute("aria-hidden", "true");
      d.style.cssText = `left:${x}%;top:${y}%;width:${s}px;height:${s}px;--twinkle-delay:${(i * 0.6).toFixed(1)}s;--twinkle-dur:${(2.4 + i * 0.4).toFixed(1)}s`;
      d.innerHTML = star;
      hero.appendChild(d);
    });
  }
  const main = $(".oop-main");
  if (main) {
    [[2, 4, 16], [97, 60, 14]].forEach(([x, y, s], i) => {
      const d = document.createElement("span");
      d.className = "oop-deco-sparkle";
      d.setAttribute("aria-hidden", "true");
      d.style.cssText = `left:${x}%;top:${y}%;width:${s}px;height:${s}px;--twinkle-delay:${(i * 0.9).toFixed(1)}s;--twinkle-dur:3s`;
      d.innerHTML = star;
      main.appendChild(d);
    });
  }
}

/* ---------- small count-up helper (GSAP if present, else a plain rAF tween) ---------- */
function countUp(el, target, dur = 1100) {
  if (!el) return;
  const gs = window.gsap;
  if (gs) {
    const o = { v: 0 };
    gs.to(o, { v: target, duration: dur / 1000, ease: "power2.out", onUpdate: () => (el.textContent = String(Math.round(o.v))) });
    return;
  }
  const t0 = performance.now();
  function step(t) {
    const p = Math.min((t - t0) / dur, 1);
    el.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function scrollToEl(sel, focus) {
  const el = typeof sel === "string" ? $(sel) : sel;
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 84;
  window.scrollTo({ top: Math.max(y, 0), behavior: RM() ? "auto" : "smooth" });
  if (focus) setTimeout(() => el.focus({ preventScroll: true }), RM() ? 0 : 420);
}

/** opens whatever collapsed section/collapsible-note wraps `el` so scrolling to it reveals it */
function revealAncestorsOf(el) {
  const section = el.closest(".section");
  if (section && section.classList.contains("collapsed")) {
    section.classList.remove("collapsed");
    const t = section.querySelector(".section-title");
    if (t) t.setAttribute("aria-expanded", "true");
  }
  const note = el.closest(".note-block");
  if (note && note.classList.contains("note-collapsed")) {
    note.classList.remove("note-collapsed");
    const h = note.querySelector(".note-head");
    if (h) h.setAttribute("aria-expanded", "true");
  }
}

/* ==========================================================================
   startFx — call once render.js has mounted #content
   ========================================================================== */
export function startFx() {
  const rm = RM();
  if (rm) document.body.classList.add("rm");
  const gs = window.gsap;
  const ST = window.ScrollTrigger;
  const hasGsap = !!gs;
  if (hasGsap && ST) gs.registerPlugin(ST);

  /* ---- nav / CTA wiring (real actions, no dead buttons) ---- */
  $$(".oop-pill[data-nav]").forEach((btn) => {
    const kind = btn.dataset.nav;
    if (kind === "map") return; // plain link, default navigation is correct
    btn.addEventListener("click", () => {
      if (kind === "search") {
        scrollToEl("#notes");
        setTimeout(() => $("#search").focus({ preventScroll: true }), rm ? 0 : 380);
      } else {
        scrollToEl(btn.dataset.target);
      }
    });
  });

  const heroCta = $("#heroCta");
  heroCta && heroCta.addEventListener("click", (e) => { e.preventDefault(); scrollToEl("#notes"); });

  // "START": jump to Topic 1 (the flagship section), opening it if it's collapsed
  const startBtn = $("#oopStartBtn");
  startBtn && startBtn.addEventListener("click", () => {
    const sections = $$("#content .section");
    const target = sections[1] || sections[0];
    if (!target) return;
    target.classList.remove("collapsed");
    const t = target.querySelector(".section-title");
    if (t) t.setAttribute("aria-expanded", "true");
    scrollToEl(target);
  });

  // badge center arrow: jump to the first not-yet-reviewed note (a real "continue" action)
  const badgeBtn = $("#oopBadgeBtn");
  badgeBtn && badgeBtn.addEventListener("click", () => {
    const next = $("#content .note-block:not(.learned)");
    if (next) {
      revealAncestorsOf(next);
      requestAnimationFrame(() => scrollToEl(next));
    } else {
      scrollToEl("#notes"); // everything reviewed — just go back to the top of the notes
    }
  });

  /* ---- stat count-up, once, on first scroll into view ---- */
  const statsEl = $("#oopStats");
  if (statsEl && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      $$(".oop-stat-value[data-target]", statsEl).forEach((el) => countUp(el, parseInt(el.dataset.target, 10) || 0));
      const ptEl = $("#progress-text");
      if (ptEl) {
        const target = parseInt(ptEl.textContent || "0", 10) || 0;
        if (window.gsap) {
          const o = { v: 0 };
          window.gsap.to(o, { v: target, duration: 1.1, ease: "power2.out", onUpdate: () => (ptEl.textContent = Math.round(o.v) + "%") });
        } else {
          const t0 = performance.now();
          const step = (t) => { const p = Math.min((t - t0) / 1100, 1); ptEl.textContent = Math.round(target * p) + "%"; if (p < 1) requestAnimationFrame(step); };
          requestAnimationFrame(step);
        }
      }
    }, { threshold: 0.4 });
    io.observe(statsEl);
  }

  /* ---- wavy divider: draws in once, on scroll into view (pure CSS keyframe) ---- */
  const wave = $("#oopWave");
  if (wave && !rm && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { wave.classList.add("oop-wave-play"); io.disconnect(); }
    }, { threshold: 0.2 });
    io.observe(wave);
  }

  /* ---- section/card reveals: slide-up + fade + slight rotation, staggered, on scroll ---- */
  const sections = $$("#content .section");
  if (sections.length && !rm && "IntersectionObserver" in window) {
    sections.forEach((s) => s.classList.add("oop-reveal-pre"));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const s = e.target;
        const idx = sections.indexOf(s);
        setTimeout(() => s.classList.remove("oop-reveal-pre"), (idx % 3) * 90);
        io.unobserve(s);
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.05 });
    sections.forEach((s) => io.observe(s));
    // an accordion open/close, or a note folding open, changes page height — nothing here
    // depends on layout though, so no ResizeObserver/ST.refresh is needed for this piece
  } else {
    sections.forEach((s) => s.classList.remove("oop-reveal-pre"));
  }

  /* ---- mouse parallax drift on the sparkle decorations (cheap: a handful of elements) ---- */
  if (!rm && FINE() && window.innerWidth > 760) {
    const sparkles = $$(".oop-deco-sparkle").map((el, i) => ({ el, d: 0.5 + (i % 3) * 0.35, x: 0, y: 0 }));
    let mx = 0, my = 0, raf = null;
    window.addEventListener("pointermove", (e) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
      if (!raf) raf = requestAnimationFrame(apply);
    }, { passive: true });
    function apply() {
      raf = null;
      sparkles.forEach((s) => { s.el.style.transform = `translate3d(${(mx * 18 * s.d).toFixed(1)}px,${(my * 14 * s.d).toFixed(1)}px,0)`; });
    }
  }

  /* ---- everything below is a one-time load-in flourish; needs GSAP, has no permanent-hidden risk ---- */
  if (!hasGsap || rm) return;

  try {
    const pills = $$(".oop-pill");
    const letters = $$("#oopHeadline .ch");
    const cta = $("#heroCta");
    pills.forEach((p) => p.classList.add("oop-enter-pre"));
    letters.forEach((l) => l.classList.add("oop-enter-pre"));
    cta && cta.classList.add("oop-enter-pre");

    const wipe = document.createElement("div");
    wipe.setAttribute("aria-hidden", "true");
    wipe.style.cssText = "position:fixed;inset:0;z-index:9000;background:var(--oop-mustard);transform-origin:top;pointer-events:none";
    document.body.appendChild(wipe);

    const tl = gs.timeline({ onComplete: () => wipe.remove() });
    tl.to(wipe, { scaleY: 0, duration: 0.55, ease: "power3.inOut", transformOrigin: "bottom" })
      .fromTo(letters, { y: 36, rotation: 6, opacity: 0 }, { y: 0, rotation: 0, opacity: 1, duration: 0.6, ease: "back.out(1.7)", stagger: 0.02 }, "-=0.25")
      .fromTo(pills, { y: -14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out", stagger: 0.06 }, "-=0.4")
      .fromTo(cta, { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "elastic.out(1,0.55)" }, "-=0.25");
  } catch (err) {
    console.warn("[oop] entrance animation failed, showing static page", err);
    gs.set(["*"], { clearProps: "opacity,transform" });
  }
}
