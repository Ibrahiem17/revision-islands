/**
 * DSA page motion + hero wiring.
 *
 *  - injects the cutaway illustration (dsa-art.js) into #hero-art-slot
 *  - load "assembly": the `.asm` groups slide + fade into place in order, like a pop-up book
 *      GSAP timeline when window.gsap exists, otherwise a CSS-only version (class `asm-css`)
 *  - idle loops are plain CSS keyframes; they only RUN while the hero is on screen and the tab is
 *    visible (class `is-live` on #hero -> --aps: running), so off-screen they cost nothing
 *  - mouse parallax between 3 depth layers (fine pointers only, rAF + lerp, transform only)
 *  - the CTA smooth-scrolls to #content
 *  - reduced motion (`prefers-reduced-motion` or body.rm): picture stays a complete static image —
 *    no assembly, no loops, no parallax
 *
 * Safety: every animated element has a real static base state, so if anything here fails the
 * picture is still fully visible.
 */
import { heroArtMarkup } from "./dsa-art.js";
import { vignetteFor, vignetteKeyForTitle } from "./dsa-vignettes.js";
import { runOnce, addReplayButton } from "../shared/replay.js";

const mq = (q) => typeof matchMedia === "function" && matchMedia(q).matches;
const REDUCED = () => mq("(prefers-reduced-motion: reduce)") || document.body.classList.contains("rm");

export function startHero() {
  const body = document.body;
  if (mq("(prefers-reduced-motion: reduce)")) body.classList.add("rm");

  const slot = document.getElementById("hero-art-slot");
  const hero = document.getElementById("hero");
  if (!slot || !hero) return;
  slot.innerHTML = heroArtMarkup();
  const art = document.getElementById("hero-art");

  // ---- CTA: smooth scroll to the notes (instant when motion is reduced)
  const cta = document.getElementById("cta");
  const content = document.getElementById("content");
  if (cta && content) {
    cta.addEventListener("click", (e) => {
      e.preventDefault();
      content.scrollIntoView({ behavior: REDUCED() ? "auto" : "smooth", block: "start" });
      history.replaceState(null, "", "#content");
    });
  }

  if (REDUCED()) return;

  // ---- idle loops: only while the hero is visible and the tab is shown
  let inView = true;
  const sync = () => hero.classList.toggle("is-live", inView && !document.hidden);
  if (typeof IntersectionObserver === "function") {
    new IntersectionObserver((entries) => {
      inView = entries.some((e) => e.isIntersecting);
      sync();
      if (!inView) stopParallax(); // nothing to move off-screen
    }, { rootMargin: "40px" }).observe(hero);
  }
  document.addEventListener("visibilitychange", sync);
  sync();

  assemble(art);
  setupParallax(hero, art);
}

/* ---------------------------------------------------------------- assembly */
function assemble(art) {
  const els = [...art.querySelectorAll(".asm")];
  if (!els.length) return;
  const order = (el) => Number(el.getAttribute("data-a") || 1);
  const gs = window.gsap;

  if (!gs) {
    // CSS fallback: class drives a keyframe with `animation-fill-mode: both`; removed afterwards
    art.classList.add("asm-css");
    setTimeout(() => art.classList.remove("asm-css"), 4200);
    return;
  }

  const tl = gs.timeline({
    defaults: { ease: "back.out(1.35)" },
    onComplete: clean,
  });
  els
    .slice()
    .sort((a, b) => order(a) - order(b))
    .forEach((el, i) => {
      const t = (order(el) - 1) * 0.26 + (i % 4) * 0.035;
      tl.from(el, { y: 44, opacity: 0, duration: 0.7 }, t);
    });

  function clean() {
    gs.set(els, { clearProps: "transform,opacity" });
  }
  // failsafe: if the tab was throttled / something stalled, the finished picture must still appear
  setTimeout(() => { if (tl.progress() < 1) { tl.progress(1); } clean(); }, 6500);
}

/* ---------------------------------------------------------------- parallax */
let rafId = 0;

function stopParallax() {
  if (rafId) cancelAnimationFrame(rafId);
  rafId = 0;
}

function setupParallax(hero, art) {
  if (!mq("(hover: hover) and (pointer: fine)")) return;
  const layers = [...art.querySelectorAll(".art-depth")];
  if (layers.length < 3) return;
  // depth strengths in px (back moves least, front most), opposite to the pointer
  const depth = [5, 11, 22];
  const cur = layers.map(() => ({ x: 0, y: 0 }));
  let tx = 0, ty = 0;

  const tick = () => {
    let moving = false;
    layers.forEach((el, i) => {
      const c = cur[i];
      const gx = -tx * depth[i], gy = -ty * depth[i] * 0.6;
      c.x += (gx - c.x) * 0.08;
      c.y += (gy - c.y) * 0.08;
      if (Math.abs(gx - c.x) > 0.05 || Math.abs(gy - c.y) > 0.05) moving = true;
      el.style.transform = `translate3d(${c.x.toFixed(2)}px,${c.y.toFixed(2)}px,0)`;
    });
    rafId = moving ? requestAnimationFrame(tick) : 0;
  };
  const kick = () => { if (!rafId) rafId = requestAnimationFrame(tick); };

  hero.addEventListener("pointermove", (e) => {
    if (e.pointerType && e.pointerType !== "mouse" && e.pointerType !== "pen") return;
    if (!hero.classList.contains("is-live")) return;
    const r = art.getBoundingClientRect();
    tx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2));
    ty = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height - 0.5) * 2));
    kick();
  }, { passive: true });
  hero.addEventListener("pointerleave", () => { tx = 0; ty = 0; kick(); });
}

/* ================================================================ section banners
 * One wide illustrated banner per section (dsa-vignettes.js) injected into each section's
 * `.dsa-section-art` slot (created before .notes-flow if render.js did not give us one).
 *  - GSAP present: outlines draw on (.draw), fills/halftone/details fade up, characters slide in from the
 *    sides, once, when the banner scrolls into view; ScrollTrigger scrub gives 3-layer parallax.
 *  - GSAP missing: the same reveal through CSS classes (.vg-pre -> .vg-in) driven by IntersectionObserver.
 *  - idle loops are CSS keyframes that only run while the banner is on screen and the tab is visible.
 *  - reduced motion / body.rm: static, complete picture (nothing is hidden, no loops, no parallax).
 * Every hidden "from" state is cleaned up afterwards and has a timeout failsafe, so a failed animation
 * can never leave a banner (or a section) invisible.
 */
export function startVignettes() {
  const content = document.getElementById("content");
  if (!content) return;
  const slots = [];
  content.querySelectorAll(".section").forEach((sec) => {
    const key = vignetteKeyForTitle(sec.querySelector(".section-title")?.textContent);
    if (!key) return;
    let slot = sec.querySelector(":scope > .dsa-section-art");
    if (!slot) {
      slot = document.createElement("div");
      slot.className = "dsa-section-art";
      sec.insertBefore(slot, sec.querySelector(".notes-flow"));
    }
    slot.classList.add("vg-slot");
    try { slot.innerHTML = vignetteFor(key); } catch (e) { console.error("[dsa] banner", key, e); slot.remove(); return; }
    slots.push(slot);
  });
  if (!slots.length || REDUCED() || typeof IntersectionObserver !== "function") return;

  const gs = window.gsap;
  const small = mq("(max-width: 760px)");

  // ---- idle loops: play ONCE (slower) after the reveal, then only via the Replay button
  const playIdle = (slot) => {
    // finished CSS animations drop out of getAnimations(), so cancel + recreate them for a clean replay
    slot.classList.remove("vg-live");
    slot.classList.add("vg-restart");
    void slot.getBoundingClientRect();
    slot.classList.remove("vg-restart");
    slot.classList.add("vg-live");
    return runOnce(slot);
  };
  slots.forEach((s) => addReplayButton(s, () => playIdle(s)));

  // ---- reveal on first view
  const prepared = new Map();
  slots.forEach((slot) => {
    const svg = slot.querySelector("svg.vg");
    try {
      prepared.set(slot, prepare(svg, gs));
    } catch (e) {
      console.error("[dsa] banner prepare failed", e);
      svg.classList.remove("vg-pre");
    }
  });
  // reveal every banner whose top is above the bottom of the viewport (including ones scrolled PAST
  // by a jump scroll / End key, which an IntersectionObserver never reports)
  const pending = new Set(slots.filter((s) => prepared.has(s)));
  const reveal = (slot) => {
    if (!pending.delete(slot)) return;
    const p = prepared.get(slot);
    try { p && p(); } catch (err) { console.error("[dsa] banner reveal failed", err); }
    setTimeout(() => playIdle(slot), 900); // after the draw-on starts, run the idle motion once
  };
  const check = () => {
    const lim = innerHeight * 0.95;
    pending.forEach((s) => { if (s.getBoundingClientRect().top < lim) reveal(s); });
    if (!pending.size) { removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll); }
  };
  let raf = 0;
  const onScroll = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; check(); }); };
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);
  const ioIn = new IntersectionObserver((es) => {
    es.forEach((e) => { if (e.isIntersecting) { ioIn.unobserve(e.target); reveal(e.target); } });
  }, { rootMargin: "0px 0px -5% 0px" });
  pending.forEach((s) => ioIn.observe(s));
  check();
  requestAnimationFrame(check);
  addEventListener("load", check);
  setTimeout(check, 600);
  setTimeout(check, 2000);

  // ---- parallax between the three layers (needs ScrollTrigger)
  const ST = window.ScrollTrigger;
  if (gs && ST) {
    try {
      gs.registerPlugin(ST);
      const amp = small ? 0.5 : 1;
      slots.forEach((slot) => {
        const sc = { trigger: slot, start: "top bottom", end: "bottom top", scrub: 0.6 };
        const L = (c) => slot.querySelector(".vl-" + c);
        gs.fromTo(L("b"), { x: -34 * amp }, { x: 34 * amp, ease: "none", scrollTrigger: sc });
        gs.fromTo(L("m"), { x: -10 * amp }, { x: 10 * amp, ease: "none", scrollTrigger: sc });
        gs.fromTo(L("f"), { x: 16 * amp }, { x: -16 * amp, ease: "none", scrollTrigger: sc });
      });
      // opening / closing a section moves everything below it
      let t = 0;
      content.addEventListener("click", (e) => {
        if (!e.target.closest(".section-title")) return;
        clearTimeout(t);
        t = setTimeout(() => ST.refresh(), 120);
      });
    } catch (e) { console.error("[dsa] parallax failed", e); }
  }

  // ---- gentle fade-up of the section blocks as they arrive
  const secs = [...content.querySelectorAll(".section")];
  secs.forEach((s) => s.classList.add("fx-pre"));
  const ioSec = new IntersectionObserver((es) => {
    es.forEach((e) => {
      if (!e.isIntersecting) return;
      ioSec.unobserve(e.target);
      e.target.classList.add("fx-in");
      setTimeout(() => e.target.classList.remove("fx-pre", "fx-in"), 900);
    });
  }, { rootMargin: "0px 0px -6% 0px" });
  secs.forEach((s) => ioSec.observe(s));
  setTimeout(() => secs.forEach((s) => s.classList.remove("fx-pre", "fx-in")), 12000); // failsafe
}

/** hides a banner's "from" state and returns the function that plays it */
function prepare(svg, gs) {
  const q = (sel) => [...svg.querySelectorAll(sel)];
  if (!gs) {
    svg.classList.add("vg-pre");
    return () => {
      svg.classList.add("vg-in");
      setTimeout(() => svg.classList.remove("vg-pre", "vg-in"), 4200);
    };
  }
  const draws = q(".draw"), fos = q(".fo"), fades = q(".ht, .dt"), chs = q(".ch");
  gs.set(draws, { strokeDasharray: 1, strokeDashoffset: 1 });
  gs.set(fos, { opacity: 0 });
  gs.set(fades, { opacity: 0 });
  chs.forEach((c) => {
    const d = c.getAttribute("data-d");
    gs.set(c, d === "r" ? { x: 150, opacity: 0 } : d === "u" ? { y: -60, opacity: 0 } : { x: -150, opacity: 0 });
  });
  const clean = () => {
    gs.set(draws, { clearProps: "strokeDasharray,strokeDashoffset" });
    gs.set([...fos, ...fades], { clearProps: "opacity" });
    gs.set(chs, { clearProps: "transform,opacity" });
  };
  return () => {
    const tl = gs.timeline({ onComplete: clean });
    tl.to(draws, { strokeDashoffset: 0, duration: 1.1, ease: "power1.inOut", stagger: { amount: 0.9 } }, 0)
      .to(fos, { opacity: 1, duration: 0.5, stagger: { amount: 0.6 } }, 0.3)
      .to(fades, { opacity: 1, duration: 0.6, stagger: { amount: 0.5 } }, 0.8)
      .to(chs, { x: 0, y: 0, opacity: 1, duration: 0.85, ease: "back.out(1.3)", stagger: 0.11 }, 0.7);
    setTimeout(() => { if (tl.progress() < 1) tl.progress(1); clean(); }, 7000);
  };
}
