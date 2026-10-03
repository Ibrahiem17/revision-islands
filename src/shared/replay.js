// Play-once helper for illustrated diagrams and banners.
// Every illustration's animation is plain CSS keyframes that are bound to a "playing" class
// (`.note-diagram.is-playing`, `.vg-live`) and loop forever. Instead of editing every diagram, we
// use the Web Animations API on whatever CSS animations are running: run each ONE time, a little
// slower, then stop (a stopped diagram is its complete static picture). A small button re-runs it.

export const PLAY_RATE = 0.75; // 1 = original speed; lower = slower

const STYLE_ID = "replay-btn-style";
const CSS = `
.note-diagram,.vg-slot{position:relative}
.diagram-replay{position:absolute;top:10px;right:12px;z-index:4;display:inline-flex;align-items:center;gap:5px;
  padding:4px 10px 4px 8px;font:600 12px/1.2 "Work Sans",system-ui,sans-serif;letter-spacing:.02em;
  color:var(--replay-ink,#17120f);background:var(--replay-bg,#f8f1e3);border:2px solid var(--replay-ink,#17120f);
  border-radius:999px;box-shadow:2px 2px 0 var(--replay-ink,#17120f);cursor:pointer;opacity:.92;
  transition:transform .12s,opacity .12s}
.diagram-replay[hidden]{display:none}
.diagram-replay:hover{opacity:1;transform:translate(-1px,-1px)}
.diagram-replay:active{transform:translate(1px,1px);box-shadow:1px 1px 0 var(--replay-ink,#17120f)}
.diagram-replay:disabled{opacity:.45;cursor:default;transform:none}
.diagram-replay:focus-visible{outline:3px solid var(--replay-focus,#c46a2c);outline-offset:2px}
body.rm .diagram-replay{display:none}
@media (prefers-reduced-motion:reduce){.diagram-replay{display:none}}
`;

function ensureStyle() {
  if (document.getElementById(STYLE_ID)) return;
  const s = document.createElement("style");
  s.id = STYLE_ID;
  s.textContent = CSS;
  document.head.appendChild(s);
}

export function motionAllowed() {
  return !document.body.classList.contains("rm") &&
    !(typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches);
}

/** Runs every CSS animation under `root` exactly once, at PLAY_RATE. Resolves when all have ended. */
export function runOnce(root) {
  let anims = [];
  try { anims = root.getAnimations({ subtree: true }); } catch (e) { return Promise.resolve(); }
  anims.forEach((a) => {
    try {
      a.effect.updateTiming({ iterations: 1 });
      a.playbackRate = PLAY_RATE;
      a.currentTime = 0;
      a.play();
    } catch (e) { /* not a timed effect */ }
  });
  return Promise.allSettled(anims.map((a) => a.finished)).then(() => anims.length);
}

/** Adds a small "Replay" button to `host`; `onClick` re-runs the animation and returns a promise. */
export function addReplayButton(host, onClick) {
  ensureStyle();
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "diagram-replay";
  btn.setAttribute("aria-label", "Replay animation");
  btn.innerHTML = '<span aria-hidden="true">↻</span> Replay';
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (btn.disabled) return;
    btn.disabled = true;
    Promise.resolve(onClick()).finally(() => { btn.disabled = false; });
  });
  host.appendChild(btn);
  return btn;
}

/** Note diagrams: play once when first seen on screen, then only on the Replay button. */
export function setupFigures(figs) {
  if (!figs.length || typeof IntersectionObserver !== "function") return;
  ensureStyle();
  const play = (fig) => {
    fig.classList.remove("is-playing");
    void fig.getBoundingClientRect(); // restart cleanly
    fig.classList.add("is-playing");
    return runOnce(fig).then((n) => {
      fig.classList.remove("is-playing");
      if (!n) fig.querySelectorAll(".diagram-replay").forEach((b) => { b.hidden = true; }); // nothing animates here
    });
  };
  const queue = new Set();
  const start = (fig) => {
    if (!motionAllowed()) return;
    if (document.hidden) { queue.add(fig); return; }
    play(fig);
  };
  figs.forEach((fig) => { if (motionAllowed()) addReplayButton(fig, () => play(fig)); });
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target); // automatic run happens only once
      start(e.target);
    });
  }, { threshold: 0.35 });
  figs.forEach((f) => io.observe(f));
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) return;
    queue.forEach((f) => play(f));
    queue.clear();
  });
}
