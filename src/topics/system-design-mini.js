/**
 * Places the small inline pictures (system-design-inline.js) without ever touching the layout.
 * A picture is position:absolute (the anchor has no height), so text cannot move. It is shown only while it fits:
 * inside its note, and overlapping no text, image or figure. Re-checked on resize, when a note opens or closes,
 * and once fonts have loaded.
 */
const GAP = 10;

function fitOne(m) {
  const note = m.closest(".note-block");
  if (!note || note.classList.contains("note-collapsed") || !note.offsetParent) { m.classList.remove("on"); return; }
  const w = +m.dataset.w, h = +m.dataset.h, dy = +(m.dataset.dy || 0);
  m.style.width = w + "px"; m.style.height = h + "px";
  const anchor = m.parentElement, target = anchor.nextElementSibling;
  const aTop = anchor.getBoundingClientRect().top;
  m.style.top = ((target ? target.getBoundingClientRect().top : aTop) - aTop + dy) + "px";
  m.classList.add("on");
  const r = m.getBoundingClientRect(), nr = note.getBoundingClientRect();
  let ok = r.left > nr.left + 16 && r.right < nr.right + 1 && r.width > 0;
  if (ok) {
    const walker = document.createTreeWalker(note, NodeFilter.SHOW_TEXT);
    const range = document.createRange();
    while (ok && walker.nextNode()) {
      const t = walker.currentNode;
      if (!t.textContent.trim() || m.contains(t)) continue;
      range.selectNodeContents(t);
      for (const q of range.getClientRects()) {
        if (q.width < 1) continue;
        if (q.right > r.left - GAP && q.left < r.right + GAP && q.bottom > r.top - 2 && q.top < r.bottom + 2) { ok = false; break; }
      }
    }
    if (ok) {
      for (const f of note.querySelectorAll("figure, img, table, pre")) {
        if (m.contains(f)) continue;
        const q = f.getBoundingClientRect();
        if (q.width && q.right > r.left && q.left < r.right && q.bottom > r.top && q.top < r.bottom) { ok = false; break; }
      }
    }
  }
  m.classList.toggle("on", ok);
}

export function startMinis(root = document) {
  const minis = () => [...root.querySelectorAll(".sd-mini")];
  const fit = () => minis().forEach(fitOne);
  let t = 0;
  const later = (ms = 60) => { clearTimeout(t); t = setTimeout(fit, ms); };
  fit();
  addEventListener("resize", () => later(80));
  root.addEventListener("click", () => later(80)); // a note opened or closed
  root.addEventListener("keydown", () => later(80));
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => later(0));
  addEventListener("load", () => later(0));
}
