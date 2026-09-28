/**
 * System Design page: retro newspaper / 1930s rubber-hose restyle + motion.
 *
 *   buildPage()  - synchronous: fills the skeleton in topics/system-design.html from `content` below and injects the SVG art
 *   startFx()    - after the notes were rendered by render.js: counts, wiring, film/boil/cursor/marquee loops, GSAP scenes
 *
 * Everything works without GSAP (CDN blocked): CSS keyframes + a small rAF loop keep the page alive,
 * and all content stays visible. With prefers-reduced-motion nothing loops, nothing moves.
 */
import { art, floaterArt } from "./system-design-art.js";

/* ==========================================================================
   EDIT ME: every visible text of the page lives here
   ========================================================================== */
export const content = {
  tagline: "INTERVIEW ISLANDS · REVISION NOTES",
  wordmark: "SYSTEM DESIGN",
  notesTitle: "THE NOTES",
  lede:
    "System design is the art of scaling one floor at a time: start with a single server, notice where it hurts, and add exactly the piece that fixes it. A load balancer spreads the traffic, a cache remembers the hot answers, a queue smooths the bursts, and the database learns to replicate and shard.",
  lede2:
    "Open a floor below, tick a note once you can explain it out loud, and watch the mastered bar fill up. Interviewers care less about the perfect diagram than about the trade-offs you can name.",
  searchLabel: "SEARCH THE ISLAND",
  progressLabel: "MASTERED",
  footNote: "MORE EDITIONS COMING SOON",
  nav: [
    { label: "MAP", action: "map", href: "../index.html" },
    { label: "NOTES", action: "scroll", target: "#notes" },
    { label: "SEARCH", action: "search" },
    { label: "PROGRESS", action: "scroll", target: "#progress" },
    { label: "TOP", action: "scroll", target: "#top" },
  ],
  /* right column: `term` = what the yellow arrow types into the search box; the number = notes matching it, computed live */
  cards: [
    { title: "LOAD BALANCER", sub: "SPREADS THE TRAFFIC", term: "load balanc", art: "balancer" },
    { title: "CACHE", sub: "REMEMBERS HOT ANSWERS", term: "cache", art: "cache" },
    { title: "DATABASE", sub: "SOURCE OF TRUTH", term: "database", art: "database" },
    { title: "MESSAGE QUEUE", sub: "SMOOTHS THE BURSTS", term: "queue", art: "queue" },
    { title: "CDN", sub: "CLOSER TO THE USER", term: "cdn", art: "cdn" },
  ],
  cardUnit: "NOTES",
  /* scaling ladder */
  tiers: [
    { title: "ONE SERVER", sub: "Everything on one box. Simple, cheap, one big point of failure.", value: "1 NODE", term: "vertical", art: "tier1" },
    { title: "REPLICATED", sub: "Copies for reads and failover. More nines, more consistency questions.", value: "N + 1", term: "replic", art: "tier2" },
    { title: "SHARDED", sub: "Data split across nodes. Scales writes, complicates every query.", value: "N × M", term: "shard", art: "tier3" },
  ],
  tickerA: ["CACHE", "SHARD", "REPLICATE", "QUEUE", "SCALE", "BALANCE", "PARTITION", "INDEX"],
  tickerB: ["LATENCY", "THROUGHPUT", "AVAILABILITY", "CONSISTENCY", "TRADE-OFFS", "BOTTLENECKS"],
  photos: {
    aisle: "THE AISLE",
    skyline: "THE SKYLINE",
    board: ["CACHE", "SHARD", "REPLICATE", "QUEUE", "SCALE"],
    boardTitle: "TODAY'S MENU",
    stamp: "stamp",
  },
  endSmall: "SEE YOU AT THE NEXT ISLAND",
  endBig: "THE END",
  endTop: "BACK TO TOP ↑",
  legal: "Interview Islands · revision notes",
  pow: ["POW!", "ZAP!", "BAM!", "WHAM!", "BOOM!"],
};

const RM = typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
const FINE = typeof matchMedia === "function" && matchMedia("(hover: hover) and (pointer: fine)").matches;
const SMALL = () => window.innerWidth <= 760;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/* ---------- DOM building ---------- */

/** "AB CD" -> <span class=w><span class=ch><span class=chi>A</span></span>...</span> (gsap animates .ch, css wobbles .chi) */
function splitLetters(el, text) {
  el.setAttribute("aria-label", text);
  let i = 0;
  el.innerHTML = text
    .split(" ")
    .map(
      (word) =>
        `<span class="w" aria-hidden="true">${[...word].map((c) => `<span class="ch"><span class="chi" style="--i:${i++}">${esc(c)}</span></span>`).join("")}</span>`
    )
    .join(" ");
}

const arrowBtn = (label) =>
  `<span class="arrow-btn" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M7 17L17 7M8 7H17V16" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span class="sr-only">${esc(label)}</span>`;

export function buildPage() {
  // plain text slots
  $$("[data-c]").forEach((el) => {
    const key = el.dataset.c;
    if (typeof content[key] !== "string") return;
    if (el.hasAttribute("data-split") || key === "wordmark") return;
    el.textContent = content[key];
  });
  splitLetters($("#wordmark"), content.wordmark);
  $$("[data-split]").forEach((el) => splitLetters(el, content[el.dataset.c]));

  // art slots
  $$("[data-art]").forEach((el) => {
    el.innerHTML = art[el.dataset.art] || "";
  });

  // nav cells
  $("#navcells").innerHTML = content.nav
    .map((n, i) =>
      n.action === "map"
        ? `<a class="navcell" data-nav="map" href="${n.href}"><span>${esc(n.label)}</span></a>`
        : `<a class="navcell" data-nav="${n.action}" data-target="${n.target || ""}" href="${n.target || "#search"}"><span>${esc(n.label)}</span></a>`
    )
    .join("");

  // stacked topic cards, behind a collapsible toggle (collapsed by default —
  // more room for the notes; the open/closed state is remembered per visitor)
  const cardsOpen = (() => {
    try { return localStorage.getItem("sd_cards_open") === "1"; } catch { return false; }
  })();
  $("#cards").classList.toggle("cards-open", cardsOpen);
  $("#cards").innerHTML = `
    <button type="button" class="cards-toggle" id="cardsToggle" aria-expanded="${cardsOpen}" aria-controls="cardsList">
      <span class="cards-toggle-text"><span class="cards-toggle-label">TOPIC SHORTCUTS</span><span class="cards-toggle-sub">${cardsOpen ? "tap to hide" : "tap to show the cards"}</span></span>
      <span class="cards-toggle-arrow" aria-hidden="true">▸</span>
    </button>
    <div class="cards-list" id="cardsList">${
      content.cards
        .map(
          (c, i) => `
      <article class="card" data-term="${esc(c.term)}" style="--n:${i}">
        <h3 class="card-title">${esc(c.title)}</h3>
        <p class="card-sub">${esc(c.sub)}</p>
        <div class="card-art" data-react>${art[c.art]}</div>
        <div class="card-bar">
          <span class="card-val"><b class="cnt" data-count="0">00</b><small>${esc(content.cardUnit)}</small></span>
          <button type="button" class="go" data-term="${esc(c.term)}" aria-label="Filter notes for ${esc(c.title)}">${arrowBtn("")}</button>
        </div>
      </article>`
        )
        .join("") + `<div class="col-filler"><span class="ticket-slot">${art.ticket}</span><i class="checker"></i></div>`
    }</div>`;

  $("#cardsToggle").addEventListener("click", () => {
    const open = !$("#cards").classList.contains("cards-open");
    $("#cards").classList.toggle("cards-open", open);
    $("#cardsToggle").setAttribute("aria-expanded", String(open));
    $(".cards-toggle-sub").textContent = open ? "tap to hide" : "tap to show the cards";
    try { localStorage.setItem("sd_cards_open", open ? "1" : "0"); } catch {}
  });

  // three tier boxes
  $("#tiers").innerHTML = content.tiers
    .map(
      (t, i) => `
    <article class="tier" style="--n:${i}">
      <div class="tier-top"><div class="tier-text"><h3 class="tier-title">${esc(t.title)}</h3><p>${esc(t.sub)}</p></div><div class="tier-art" data-react>${art[t.art]}</div></div>
      <div class="tier-bar"><span class="tier-val">${esc(t.value)}</span>
        <button type="button" class="go" data-term="${esc(t.term)}" aria-label="Filter notes for ${esc(t.title)}">${arrowBtn("")}</button></div>
    </article>`
    )
    .join("");

  // photo strip
  const p = content.photos;
  $("#photo-row").innerHTML = `
    <figure class="photo ph-aisle"><div class="ph-img">${art.photoAisle}</div><i class="ph-reveal" aria-hidden="true"></i><figcaption>${esc(p.aisle)}</figcaption></figure>
    <figure class="photo ph-sky"><div class="ph-img">${art.photoSkyline}</div><i class="ph-reveal" aria-hidden="true"></i><figcaption>${esc(p.skyline)}</figcaption>
      <span class="stamp-slot" data-react>${art.stamp}</span></figure>
    <div class="photo ph-board" aria-hidden="true"><p class="board-title">${esc(p.boardTitle)}</p>${p.board.map((l) => `<p class="board-line">${esc(l)}</p>`).join("")}</div>`;

  // marquees: text repeated so that one half is always wider than any screen
  const strip = (words, cls) => {
    const unit = words.map((w) => `<span>${esc(w)}</span><i class="tk-star"></i>`).join("");
    return `<div class="ticker ${cls}"><div class="tk-track"><div class="tk-half">${unit.repeat(2)}</div><div class="tk-half">${unit.repeat(2)}</div></div></div>`;
  };
  $("#tickers").innerHTML = strip(content.tickerA, "tk-a") + strip(content.tickerB, "tk-b");

  // floating decorations (parallax layer, sits in the gutters behind the frame)
  const spots = [
    [2, 6, 44, 0.9], [92, 10, 34, 1.3], [1, 30, 28, 1.6], [95, 34, 46, 0.7], [3, 55, 52, 1.1],
    [93, 58, 30, 1.8], [2, 78, 36, 0.8], [94, 84, 42, 1.4], [6, 92, 26, 1.2], [90, 96, 32, 0.6],
  ];
  $("#floaters").innerHTML = spots
    .map(
      ([x, y, s, d], i) =>
        `<span class="floater" data-depth="${d}" style="left:${x}%;top:${y}%;width:${s}px;height:${s}px"><span class="floater-in fl-${i % 3}">${floaterArt[i % floaterArt.length]}</span></span>`
    )
    .join("");
}

/* ---------- helpers ---------- */

function setSearch(term) {
  const input = $("#search");
  if (!input) return;
  input.value = input.value.trim().toLowerCase() === term ? "" : term; // second click clears
  input.dispatchEvent(new Event("input", { bubbles: true }));
}

function scrollToEl(sel, focus) {
  const el = $(sel);
  if (!el) return;
  const y = sel === "#top" ? 0 : el.getBoundingClientRect().top + window.scrollY - 12;
  window.scrollTo({ top: y, behavior: RM ? "auto" : "smooth" });
  if (focus) setTimeout(() => el.focus({ preventScroll: true }), RM ? 0 : 500);
}

/** curtain wipe, then navigate */
function curtainTo(href) {
  if (RM) {
    location.href = href;
    return;
  }
  const c = document.createElement("div");
  c.className = "curtain";
  c.setAttribute("aria-hidden", "true");
  c.innerHTML = `<i class="cu cu-1"></i><i class="cu cu-2"></i><i class="cu cu-3"></i>`;
  document.body.appendChild(c);
  requestAnimationFrame(() => c.classList.add("in"));
  setTimeout(() => (location.href = href), 620);
  window.addEventListener("pageshow", (e) => e.persisted && c.remove(), { once: true });
}

/* ==========================================================================
   startFx
   ========================================================================== */
export function startFx() {
  const gs = window.gsap;
  const ST = window.ScrollTrigger;
  const hasGsap = !!gs;
  if (hasGsap && ST) gs.registerPlugin(ST);
  const body = document.body;
  const root = document.documentElement;
  if (RM) body.classList.add("rm");

  /* ---- live counts: notes whose searchable text contains the card's term ---- */
  const blocks = $$(".note-block");
  const countFor = (term) => blocks.filter((b) => (b.getAttribute("data-searchable") || "").includes(term.toLowerCase())).length;
  $$(".card").forEach((card) => {
    const n = countFor(card.dataset.term);
    const el = $(".cnt", card);
    el.dataset.count = String(n);
    el.textContent = String(n).padStart(2, "0");
  });

  /* ---- interactions that never need GSAP ---- */
  $$(".go").forEach((b) => b.addEventListener("click", () => {
    setSearch(b.dataset.term);
    scrollToEl("#notes");
  }));
  // the whole tier box / card also reacts on hover
  $$(".navcell").forEach((a) => {
    a.addEventListener("click", (e) => {
      const kind = a.dataset.nav;
      if (kind === "map") {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
        e.preventDefault();
        curtainTo(a.getAttribute("href"));
      } else if (kind === "search") {
        e.preventDefault();
        scrollToEl("#notes");
        setTimeout(() => $("#search").focus({ preventScroll: true }), RM ? 0 : 450);
      } else {
        e.preventDefault();
        scrollToEl(a.dataset.target, a.dataset.target === "#progress");
      }
    });
    a.addEventListener("pointerenter", () => {
      if (RM) return;
      a.classList.remove("thunk");
      void a.offsetWidth;
      a.classList.add("thunk");
    });
  });
  const endTop = $(".end-top");
  endTop && endTop.addEventListener("click", (e) => { e.preventDefault(); scrollToEl("#top"); });

  // hover reactions on illustrations: restart a css "jump" class
  $$("[data-react]").forEach((el) => {
    el.addEventListener("pointerenter", () => {
      if (RM) return;
      el.classList.remove("react");
      void el.offsetWidth;
      el.classList.add("react");
      burst(el);
    });
  });

  /** tiny burst of stars/lines around an element (WAAPI, works without GSAP) */
  let lastBurst = 0;
  function burst(el) {
    const now = performance.now();
    if (RM || SMALL() || now - lastBurst < 500 || !el.animate) return;
    lastBurst = now;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2 + window.scrollX, cy = r.top + r.height / 2 + window.scrollY;
    for (let i = 0; i < 7; i++) {
      const b = document.createElement("i");
      b.className = "spark";
      b.style.left = cx + "px";
      b.style.top = cy + "px";
      const a = (Math.PI * 2 * i) / 7 + Math.random() * 0.5;
      const d = Math.min(r.width, 110) * 0.6 + Math.random() * 26;
      document.body.appendChild(b);
      const an = b.animate(
        [
          { transform: `translate(-50%,-50%) rotate(${(a * 180) / Math.PI}deg) translateX(${d * 0.4}px) scale(.4)`, opacity: 1 },
          { transform: `translate(-50%,-50%) rotate(${(a * 180) / Math.PI}deg) translateX(${d}px) scale(1)`, opacity: 0 },
        ],
        { duration: 520, easing: "cubic-bezier(.2,.8,.3,1)" }
      );
      an.onfinish = () => b.remove();
    }
  }

  /* ---- tab visibility / offscreen bookkeeping for the boil ---- */
  const boilEls = $$(".boil, .wordmark, .fb");
  let visibleBoil = 0;
  const wordmark = $("#wordmark");
  wordmark.classList.add("boil-w");
  $$(".fb").forEach((f) => f.classList.add("boil-b"));

  if (!RM) {
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((es) => {
        es.forEach((e) => {
          e.target.classList.toggle("off", !e.isIntersecting);
          visibleBoil += e.isIntersecting ? 1 : -1;
        });
      }, { rootMargin: "80px" });
      boilEls.forEach((e) => { e.classList.add("off"); io.observe(e); });
    } else visibleBoil = 1;

    // boiling lines: re-seed the displacement noise at ~10 fps (seed cycles through a few frames)
    const t1 = $("#boil-turb"), t2 = $("#boil-turb2");
    let seed = 0;
    setInterval(() => {
      if (document.hidden || visibleBoil <= 0) return;
      seed = (seed % 4) + 1;
      t1.setAttribute("seed", String(seed));
      t2.setAttribute("seed", String(seed + 3));
    }, 100);
  } else {
    boilEls.forEach((e) => e.classList.add("still"));
  }

  let cursorStep = null;
  /* ---- custom cursor (fine pointers only, never over text inputs) ---- */
  if (FINE && !RM) initCursor();
  function initCursor() {
    body.classList.add("has-cursor");
    const dot = document.createElement("div");
    dot.className = "cursor-dot";
    dot.setAttribute("aria-hidden", "true");
    const trail = Array.from({ length: 6 }, (_, i) => {
      const t = document.createElement("i");
      t.className = "cursor-trail";
      t.style.setProperty("--k", String(1 - i / 7));
      body.appendChild(t);
      return { el: t, x: -50, y: -50 };
    });
    body.appendChild(dot);
    let tx = -100, ty = -100, x = -100, y = -100, moving = false, hot = false, shown = false;
    window.addEventListener("pointermove", (e) => {
      if (e.pointerType && e.pointerType !== "mouse") return;
      tx = e.clientX; ty = e.clientY; moving = true;
      if (!shown) { shown = true; x = tx; y = ty; dot.classList.add("on"); }
      const t = e.target;
      const overInput = t.closest && t.closest("input, textarea, select");
      dot.classList.toggle("hide", !!overInput);
      trail.forEach((tr) => tr.el.classList.toggle("hide", !!overInput));
      hot = !!(t.closest && t.closest("a, button, summary, label, .qa-toggle, .section-title"));
      dot.classList.toggle("hot", hot);
    }, { passive: true });
    document.addEventListener("mouseleave", () => { dot.classList.remove("on"); shown = false; });
    window.addEventListener("pointerdown", (e) => {
      if (e.pointerType && e.pointerType !== "mouse") return;
      dot.classList.add("down");
      if (e.target.closest && e.target.closest("input, textarea")) return;
      comicBurst(e.clientX, e.clientY);
    });
    window.addEventListener("pointerup", () => dot.classList.remove("down"));

    cursorStep = () => {
      if (!moving) return;
      const dx = tx - x, dy = ty - y;
      x += dx * 0.38; y += dy * 0.38;
      const sp = Math.hypot(dx, dy);
      const ang = (Math.atan2(dy, dx) * 180) / Math.PI;
      const sx = 1 + Math.min(sp / 55, 0.7), sy = 1 - Math.min(sp / 130, 0.32);
      dot.style.transform = `translate3d(${x}px,${y}px,0) translate(-50%,-50%) rotate(${ang}deg) scale(${sx},${sy})`;
      let px = x, py = y;
      trail.forEach((tr) => {
        tr.x += (px - tr.x) * 0.42; tr.y += (py - tr.y) * 0.42;
        tr.el.style.transform = `translate3d(${tr.x}px,${tr.y}px,0) translate(-50%,-50%)`;
        px = tr.x; py = tr.y;
      });
      if (sp < 0.15) moving = false;
    };
  }

  /** comic "POW!" burst: pure shapes + a word */
  function comicBurst(cx, cy) {
    const el = document.createElement("div");
    el.className = "pow";
    el.setAttribute("aria-hidden", "true");
    const pts = [];
    for (let i = 0; i < 20; i++) {
      const a = (Math.PI * i) / 10, r = i % 2 ? 26 : 50;
      pts.push((50 + r * Math.cos(a)).toFixed(1) + "," + (50 + r * Math.sin(a)).toFixed(1));
    }
    const word = content.pow[Math.floor(Math.random() * content.pow.length)];
    el.innerHTML = `<svg viewBox="0 0 100 100"><polygon points="${pts.join(" ")}" fill="#F2B01E" stroke="#141210" stroke-width="4" stroke-linejoin="round"/><text x="50" y="58" text-anchor="middle">${word}</text></svg>`;
    el.style.left = cx + "px";
    el.style.top = cy + "px";
    document.body.appendChild(el);
    const rot = (Math.random() - 0.5) * 30;
    const an = el.animate(
      [
        { transform: `translate(-50%,-50%) rotate(${rot - 20}deg) scale(.2)`, opacity: 1 },
        { transform: `translate(-50%,-50%) rotate(${rot}deg) scale(1.15)`, opacity: 1, offset: 0.35 },
        { transform: `translate(-50%,-56%) rotate(${rot + 6}deg) scale(1)`, opacity: 0 },
      ],
      { duration: 620, easing: "ease-out" }
    );
    an.onfinish = () => el.remove();
  }

  /* ---- main rAF loop: cursor, marquee (scroll-velocity aware), parallax ---- */
  const tks = $$(".ticker").map((t, i) => ({ el: $(".tk-track", t), dir: i % 2 ? 1 : -1, x: 0, w: 0, base: 60 + i * 20 }));
  const measureTk = () => tks.forEach((t) => { t.w = t.el.firstElementChild ? t.el.firstElementChild.getBoundingClientRect().width : 0; });
  measureTk();
  window.addEventListener("resize", measureTk);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measureTk);

  const floaters = $$(".floater").map((el) => ({ el, d: parseFloat(el.dataset.depth) || 1, x: 0, y: 0, tx: 0, ty: 0 }));
  let mx = 0, my = 0, lastY = window.scrollY, vel = 0, lastT = performance.now();
  const wide = () => window.innerWidth > 980;
  window.addEventListener("pointermove", (e) => {
    mx = e.clientX / window.innerWidth - 0.5;
    my = e.clientY / window.innerHeight - 0.5;
  }, { passive: true });

  // performance sampling (?perf=1 -> window.__sdPerf)
  const perf = /[?&]perf=1/.test(location.search) ? { frames: 0, long: 0, max: 0, sum: 0 } : null;
  if (perf) window.__sdPerf = perf;

  let tkVisible = true;
  if ("IntersectionObserver" in window) {
    const tio = new IntersectionObserver((es) => { tkVisible = es.some((e) => e.isIntersecting) || tkVisible; }, { rootMargin: "300px" });
    const tickers = $("#tickers");
    tio.observe(tickers);
    new IntersectionObserver((es) => { tkVisible = es[0].isIntersecting; }, { rootMargin: "300px" }).observe(tickers);
  }

  function loop(now) {
    const dt = Math.min((now - lastT) / 1000, 0.1);
    if (perf) { const ms = now - lastT; perf.frames++; perf.sum += ms; if (ms > 34) perf.long++; if (ms > perf.max) perf.max = ms; }
    lastT = now;
    const sy = window.scrollY;
    vel += ((sy - lastY) / Math.max(dt, 0.001) - vel) * 0.12;   // smoothed px/s
    lastY = sy;
    cursorStep && cursorStep();

    if (tkVisible) {
      const boost = Math.min(Math.abs(vel) / 900, 4.5);
      tks.forEach((t) => {
        if (!t.w) return;
        // scrolling down speeds strips up, scrolling up reverses momentarily
        const sgn = vel < -250 ? -1 : 1;
        t.x += t.dir * (t.base + t.base * boost * 3 * sgn) * dt;
        if (t.x <= -t.w) t.x += t.w;
        if (t.x >= 0) t.x -= t.w;
        t.el.style.transform = `translate3d(${t.x.toFixed(1)}px,0,0)`;
      });
    }
    if (wide()) {
      floaters.forEach((f) => {
        f.tx = mx * 46 * f.d; f.ty = my * 30 * f.d - sy * 0.05 * f.d;
        f.x += (f.tx - f.x) * 0.06; f.y += (f.ty - f.y) * 0.06;
        f.el.style.transform = `translate3d(${f.x.toFixed(1)}px,${f.y.toFixed(1)}px,0)`;
      });
    }
    requestAnimationFrame(loop);
  }
  if (!RM) requestAnimationFrame(loop);
  else tks.forEach((t) => { t.el.style.transform = "translate3d(0,0,0)"; });

  /* ---- everything below needs GSAP; without it the page is already complete ---- */
  const finishIntro = () => {
    root.classList.remove("intro-on");
    const intro = $("#intro");
    intro && intro.remove();
    root.classList.add("intro-done");
  };
  if (!hasGsap || RM) {
    finishIntro();
    return;
  }

  try {
    setupScenes(gs, ST);
  } catch (err) {
    console.warn("[system-design] scene setup failed, showing static page", err);
    gs.set("*", { clearProps: "opacity,visibility" });
  }
  runIntro(gs);

  /* ------------------------------------------------------------------
     GSAP scenes
     ------------------------------------------------------------------ */
  function setupScenes(gs, ST) {
    const small = SMALL();

    // section heading letters: elastic stagger-in when the panel enters
    const titleLetters = $$("#notes-h .ch");
    gs.set(titleLetters, { opacity: 0 });
    ST.create({
      trigger: "#notes-h",
      start: "top 88%",
      once: true,
      onEnter: () =>
        gs.fromTo(
          titleLetters,
          { y: 50, rotation: () => gs.utils.random(-28, 28), opacity: 0, scale: 0.6 },
          { y: 0, rotation: 0, opacity: 1, scale: 1, duration: 1.1, ease: "elastic.out(1,0.45)", stagger: 0.045 }
        ),
    });

    // cards + tiers: printing-press stamp with an ink-splat ring, then the number counts up
    const stamps = $$(".card, .tier");
    stamps.forEach((el) => gs.set(el, { opacity: 0 }));
    ST.batch(stamps, {
      start: "top 92%",
      once: true,
      onEnter: (batch) => {
        batch.forEach((el, i) => {
          const rot = gs.utils.random(-3, 3);
          gs.fromTo(el, { scale: 1.2, rotation: rot, opacity: 0 }, { scale: 1, rotation: 0, opacity: 1, duration: 0.5, delay: i * 0.12, ease: "back.out(2.2)",
            onStart: () => splat(el) });
          const cnt = $(".cnt", el);
          if (cnt) {
            const target = parseInt(cnt.dataset.count, 10) || 0;
            const o = { v: 0 };
            gs.to(o, { v: target, duration: 1.1, delay: i * 0.12 + 0.2, ease: "power2.out", onUpdate: () => (cnt.textContent = String(Math.round(o.v)).padStart(2, "0")) });
          }
        });
      },
    });
    function splat(el) {
      const s = document.createElement("i");
      s.className = "splat";
      el.appendChild(s);
      gs.fromTo(s, { scale: 0.2, opacity: 0.85 }, { scale: 2.4, opacity: 0, duration: 0.75, ease: "power2.out", onComplete: () => s.remove() });
    }
    // fallback: any stamped element still hidden after 2.5 s (trigger never fired) becomes visible
    setTimeout(() => stamps.forEach((el) => { if (parseFloat(getComputedStyle(el).opacity) === 0 && !el.dataset.done) gs.to(el, { opacity: 1, duration: 0.3 }); }), 6500);

    // layered sheets slide out from behind the frame as you scroll
    if (!small) {
      gs.to(".sheet-a", { x: 30, rotation: 2.4, ease: "none", scrollTrigger: { trigger: "#stage", start: "top top", end: "bottom bottom", scrub: 0.6 } });
      gs.to(".sheet-b", { x: -30, rotation: -2.8, ease: "none", scrollTrigger: { trigger: "#stage", start: "top top", end: "bottom bottom", scrub: 0.6 } });
    }

    // photo panel: halftone dots shrink to reveal the picture
    $$(".ph-reveal").forEach((r) => {
      r.style.setProperty("--r", "6.4px");
      const o = { v: 6.4 };
      ST.create({
        trigger: r.parentElement,
        start: "top 86%",
        once: true,
        onEnter: () => gs.to(o, { v: 0, duration: 1.6, ease: "power2.inOut", onUpdate: () => r.style.setProperty("--r", o.v.toFixed(2) + "px"), onComplete: () => r.style.setProperty("--r", "0px") }),
      });
    });

    // ending: circular iris closes in on THE END
    const iris = $("#iris");
    const setIris = (p) => iris.style.setProperty("--ir", (78 - 50 * p).toFixed(1) + "%");
    setIris(0);
    ST.create({ trigger: "#the-end", start: "top 90%", end: "bottom bottom", scrub: 0.5, onUpdate: (s) => setIris(s.progress) });
    ST.create({
      trigger: ".end-big", start: "top 85%", once: true,
      onEnter: () => gs.fromTo(".end-big", { scale: 0.6, rotation: -6, opacity: 0 }, { scale: 1, rotation: 0, opacity: 1, duration: 0.9, ease: "elastic.out(1,0.5)" }),
    });
    gs.set(".end-big", { opacity: 0 });
    ST.refresh();
    // accordion open/close changes page height
    const content_ = $("#content");
    if (content_ && "ResizeObserver" in window) {
      let t;
      new ResizeObserver(() => { clearTimeout(t); t = setTimeout(() => ST.refresh(), 250); }).observe(content_);
    }
  }

  /* ------------------------------------------------------------------
     Intro (<= 3 s): black -> iris-in -> film countdown -> frame draws itself -> letters drop
     Skippable by click / key. Shown once per session (flag set in the page head + here).
     ------------------------------------------------------------------ */
  function runIntro(gs) {
    const intro = $("#intro");
    const active = root.classList.contains("intro-on") && intro;
    const letters = $$("#wordmark .ch");
    const bars = $$(".fb");
    const parts = $$(".masthead .cell-art, .tagline, .navcell, .hatch, .panel, .col-cards, .tiers, .photos, .tickers");

    if (!active) {
      finishIntro();
      dropLetters(0.0, true);
      return;
    }
    try { sessionStorage.setItem("sd-intro-seen", "1"); } catch (e) {}

    // hidden start states (page is under the black overlay)
    gs.set(bars.filter((b) => b.classList.contains("fb-t") || b.classList.contains("fb-b")), { scaleX: 0 });
    gs.set(bars.filter((b) => b.classList.contains("fb-l") || b.classList.contains("fb-r")), { scaleY: 0 });
    gs.set(letters, { opacity: 0 });
    gs.set(parts, { opacity: 0 });
    gs.set(".frame", { backgroundColor: "rgba(239,233,218,0)" });

    const leader = $("#intro-leader");
    const num = $("#intro-num");
    const proxy = { r: 0, hole: 0 };
    const applyLeader = () => (leader.style.clipPath = `circle(${proxy.r}% at 50% 50%)`);
    const applyHole = () => {
      const m = `radial-gradient(circle at 50% 50%, transparent ${proxy.hole}vmax, #000 ${proxy.hole + 0.4}vmax)`;
      intro.style.webkitMaskImage = m; intro.style.maskImage = m;
    };
    applyLeader();
    intro.style.opacity = "1";

    const tl = gs.timeline({ onComplete: end });
    tl.to({}, { duration: 0.12 })                                                        // black
      .to(proxy, { r: 72, duration: 0.42, ease: "power2.out", onUpdate: applyLeader })    // iris in
      .add(() => (num.textContent = "3"))
      .to(num, { keyframes: [{ opacity: 0.4, duration: 0.03 }, { opacity: 1, duration: 0.03 }, { opacity: 0.6, duration: 0.03 }, { opacity: 1, duration: 0.03 }], scale: 1, duration: 0.24 }, "<")
      .add(() => (num.textContent = "2"), "+=0.06")
      .to(num, { keyframes: [{ opacity: 0.5, duration: 0.03 }, { opacity: 1, duration: 0.03 }], duration: 0.2 }, "<")
      .add(() => (num.textContent = "1"), "+=0.06")
      .to(num, { keyframes: [{ opacity: 0.5, duration: 0.03 }, { opacity: 1, duration: 0.03 }], duration: 0.2 }, "<")
      .to(proxy, { hole: 150, duration: 0.5, ease: "power2.in", onUpdate: applyHole, onStart: () => { proxy.hole = 0.0001; applyHole(); } }, "+=0.04")
      .add(() => gs.set(".frame", { backgroundColor: "rgba(239,233,218,1)" }), "<")
      .to(bars.filter((b) => b.classList.contains("fb-t")), { scaleX: 1, transformOrigin: "left center", duration: 0.35, ease: "power2.out" }, "<0.1")
      .to(bars.filter((b) => b.classList.contains("fb-r")), { scaleY: 1, transformOrigin: "center top", duration: 0.35, ease: "power2.out" }, ">-0.1")
      .to(bars.filter((b) => b.classList.contains("fb-b")), { scaleX: 1, transformOrigin: "right center", duration: 0.3, ease: "power2.out" }, ">-0.1")
      .to(bars.filter((b) => b.classList.contains("fb-l")), { scaleY: 1, transformOrigin: "center bottom", duration: 0.3, ease: "power2.out" }, ">-0.1")
      .add(() => dropLetters(0, false), "-=0.15")
      .to(parts, { opacity: 1, duration: 0.4, stagger: 0.03, ease: "power1.out" }, "<0.25");

    let ended = false;
    function end() {
      if (ended) return;
      ended = true;
      window.removeEventListener("keydown", skip, true);
      intro.removeEventListener("pointerdown", skip, true);
      clearTimeout(fail);
      gs.set(bars, { clearProps: "transform" });
      gs.set(parts, { clearProps: "opacity" });
      gs.set(".frame", { clearProps: "backgroundColor" });
      gs.set(letters, { opacity: 1 });
      finishIntro();
    }
    function skip() {
      if (ended) return;
      tl.progress(1);
      gs.killTweensOf(letters);
      gs.set(letters, { opacity: 1, clearProps: "transform" });
      end();
    }
    window.addEventListener("keydown", skip, true);
    intro.addEventListener("pointerdown", skip, true);
    intro.style.pointerEvents = "auto";
    const fail = setTimeout(skip, 5000);
  }

  /** wordmark letters: drop in with bounce + squash & stretch (extrusion is part of each letter's text-shadow) */
  function dropLetters(delay, quick) {
    const letters = $$("#wordmark .ch");
    gs.set(letters, { transformOrigin: "50% 100%" });
    if (quick) {
      gs.fromTo(letters, { y: -80, opacity: 0, scaleY: 1.3, scaleX: 0.85 }, { y: 0, opacity: 1, scaleY: 1, scaleX: 1, duration: 0.7, ease: "bounce.out", stagger: 0.04, delay });
      return;
    }
    letters.forEach((l, i) => {
      const t = gs.timeline({ delay: delay + i * 0.05 });
      t.fromTo(l, { y: -320, opacity: 0, scaleY: 1.6, scaleX: 0.75, rotation: gs.utils.random(-14, 14) }, { y: 0, opacity: 1, scaleY: 1.1, scaleX: 0.95, rotation: 0, duration: 0.42, ease: "power2.in" })
        .to(l, { scaleY: 0.72, scaleX: 1.22, duration: 0.07, ease: "power1.out" })
        .to(l, { scaleY: 1, scaleX: 1, duration: 0.5, ease: "elastic.out(1.1,0.35)" });
    });
  }
}
