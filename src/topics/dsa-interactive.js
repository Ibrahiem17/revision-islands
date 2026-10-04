/**
 * Interactive step-through figures (markup in diagrams/dsa-d-mine.js, `.dgx-int[data-kind]`).
 * One small engine, three kinds:
 *   dup  - Contains Duplicate: is the number already in the Hash Set `seen`?
 *   two  - Two Sum: is `target - x` already in the Hash Map (value -> index)?
 *   grp  - Group Anagrams: sort the letters -> key, drop the word into that key's group.
 * Each plays once on its own, slowly, the first time it is on screen (1.5 s per step), then it is yours:
 * Back / Play / Next / Reset, pick an array, or roll a random one.
 * The markup is already the finished picture, so it is complete without JS or with motion off.
 */
import { motionAllowed } from "../shared/replay.js";

const STEP_MS = 1500;
const states = new WeakMap();
const X = (i) => 39 + i * 58 + 25; // centre of cell i (dup / two)
const rnd = (n) => Math.floor(Math.random() * n);
const sortLetters = (w) => w.split("").sort().join("");

// ------------------------------------------------------------------ kinds
const KINDS = {
  dup: {
    parse: (s) => ({ arr: s.split(",").map(Number) }),
    random: () => ({ arr: Array.from({ length: 5 }, () => 1 + rnd(7)) }),
    steps(d) {
      const st = [{ k: "start" }], seen = [];
      for (let i = 0; i < d.arr.length; i++) {
        const has = seen.includes(d.arr[i]);
        st.push({ k: "look", i, seen: seen.slice(), has });
        if (has) { st.push({ k: "found", i, seen: seen.slice() }); return st; }
        seen.push(d.arr[i]);
        st.push({ k: "add", i, seen: seen.slice() });
      }
      st.push({ k: "done", seen: seen.slice() });
      return st;
    },
    render(root, d, s) {
      cellsAndPtr(root, d.arr, s);
      slots(root, d.arr.length, (s.seen || []).map(String));
      const v = s.i !== undefined ? d.arr[s.i] : null;
      let text, res = null;
      if (s.k === "start") text = "Start with an empty Hash Set called seen. Press Next, or Play.";
      else if (s.k === "look") text = `Look at ${v}. Is it already in seen? ${s.has ? "Yes!" : "No."}`;
      else if (s.k === "add") text = `${v} is new, so add it to seen and move on.`;
      else if (s.k === "found") { text = `${v} is already in seen → return true (duplicate!)`; res = ["return true", "pk"]; }
      else { text = "Reached the end and nothing repeated → return false."; res = ["return false", "sg"]; }
      badge(root, res); say(root, text);
    },
  },

  two: {
    parse(s) { const [a, t] = s.split("|"); return { arr: a.split(",").map(Number), target: Number(t) }; },
    random() {
      const arr = Array.from({ length: 5 }, () => 1 + rnd(9));
      let target = 2 + rnd(16);
      if (Math.random() < 0.7) { const a = rnd(5); let b = rnd(5); if (b === a) b = (a + 1) % 5; target = arr[a] + arr[b]; }
      return { arr, target };
    },
    steps(d) {
      const st = [{ k: "start" }], seen = []; // seen: [{v, i}]
      for (let i = 0; i < d.arr.length; i++) {
        const x = d.arr[i], need = d.target - x, hit = seen.find((e) => e.v === need);
        st.push({ k: "look", i, seen: seen.slice(), need, hit });
        if (hit) { st.push({ k: "found", i, seen: seen.slice(), need, hit }); return st; }
        seen.push({ v: x, i });
        st.push({ k: "add", i, seen: seen.slice(), need });
      }
      st.push({ k: "done", seen: seen.slice() });
      return st;
    },
    render(root, d, s) {
      cellsAndPtr(root, d.arr, s);
      slots(root, d.arr.length, (s.seen || []).map((e) => `${e.v}:${e.i}`));
      const tg = root.querySelector("[data-target]"); if (tg) tg.textContent = `target = ${d.target}`;
      const x = s.i !== undefined ? d.arr[s.i] : null;
      let text, need = "", res = null;
      if (s.k === "start") text = `Find two numbers that add up to ${d.target}. Start with an empty map. Press Next, or Play.`;
      else if (s.k === "look") { need = `x = ${x}  →  need ${d.target} − ${x} = ${s.need}`; text = s.hit ? `Is ${s.need} in the map? Yes, at index ${s.hit.i}!` : `Is ${s.need} in the map? Not yet.`; }
      else if (s.k === "add") { need = `x = ${x}  →  need ${d.target} − ${x} = ${s.need}`; text = `Check first, store after: save ${x}:${s.i} (value : index) and move on.`; }
      else if (s.k === "found") { need = `x = ${x}  →  need ${s.need}, found at index ${s.hit.i}`; text = `${s.need} + ${x} = ${d.target} → return [${s.hit.i}, ${s.i}]`; res = [`return [${s.hit.i}, ${s.i}]`, "pk"]; }
      else { text = "No pair adds up to the target → return []."; res = ["return []", "sg"]; }
      const n = root.querySelector("[data-need]"); if (n) n.textContent = need;
      badge(root, res); say(root, text);
    },
  },

  grp: {
    parse: (s) => ({ words: s.split(",") }),
    random() {
      const fam = [["eat", "tea", "ate"], ["tan", "nat", "ant"], ["bat", "tab"], ["cat", "act"], ["dog", "god"], ["rat", "art", "tar"], ["nap", "pan"]];
      const picked = fam.slice().sort(() => Math.random() - 0.5).slice(0, 2 + rnd(3));
      const words = picked.flatMap((f) => f.slice(0, 1 + rnd(f.length))).slice(0, 6);
      return { words: words.sort(() => Math.random() - 0.5) };
    },
    steps(d) {
      const st = [{ k: "start" }], keys = [], groups = {};
      d.words.forEach((w, i) => {
        const key = sortLetters(w), isNew = !(key in groups);
        st.push({ k: "key", i, key, keys: keys.slice(), groups: JSON.parse(JSON.stringify(groups)), done: i });
        if (isNew) { keys.push(key); groups[key] = []; }
        groups[key].push(w);
        st.push({ k: "place", i, key, isNew, keys: keys.slice(), groups: JSON.parse(JSON.stringify(groups)), done: i + 1 });
      });
      st.push({ k: "done", keys: keys.slice(), groups: JSON.parse(JSON.stringify(groups)), done: d.words.length });
      return st;
    },
    render(root, d, s) {
      d.words.forEach((w, j) => {
        const g = root.querySelector(`[data-word="${j}"]`); if (!g) return;
        g.style.opacity = "1";
        let c = "pe";
        if (s.k === "done") c = "sg"; else if (s.k !== "start") { if (j < s.done) c = "sg"; if (j === s.i) c = s.k === "key" ? "m" : "sg"; }
        const r = g.querySelector("rect.k"); if (r) r.setAttribute("class", "k " + c);
        const t = g.querySelector("text"); if (t) t.textContent = w;
      });
      for (let j = d.words.length; j < 6; j++) { const g = root.querySelector(`[data-word="${j}"]`); if (g) g.style.opacity = "0"; }
      const kb = root.querySelector("[data-key]");
      if (kb) {
        const t = kb.querySelector("text");
        const on = s.k === "key" || s.k === "place";
        kb.style.opacity = on ? "1" : "0";
        if (t) t.textContent = on ? `${d.words[s.i]} → key "${s.key}"` : "";
      }
      const keys = s.keys || [], groups = s.groups || {};
      for (let r = 0; r < 4; r++) {
        const row = root.querySelector(`[data-row="${r}"]`); if (!row) continue;
        const key = keys[r];
        row.style.opacity = key ? "1" : "0";
        const kt = row.querySelector("[data-rk] text"); if (kt) kt.textContent = key || "";
        for (let m = 0; m < 4; m++) {
          const ch = row.querySelector(`[data-chip="${m}"]`); if (!ch) continue;
          const w = key && groups[key] ? groups[key][m] : null;
          ch.style.opacity = w ? "1" : "0";
          const ct = ch.querySelector("text"); if (ct) ct.textContent = w || "";
        }
      }
      let text, res = null;
      const w = s.i !== undefined ? d.words[s.i] : null;
      if (s.k === "start") text = "Put words that are anagrams of each other in the same group. Press Next, or Play.";
      else if (s.k === "key") text = `Sort the letters of "${w}" → the label (key) is "${s.key}".`;
      else if (s.k === "place") text = s.isNew ? `"${s.key}" is a new key, so start a new group with ${w}.` : `"${s.key}" already exists, so add ${w} to that group.`;
      else { const out = keys.map((k) => `[${groups[k].join(", ")}]`).join(", "); text = `All words placed. Return only the groups: [${out}]`; res = ["return the groups", "sg"]; }
      badge(root, res); say(root, text);
    },
  },
};

// ------------------------------------------------------------------ shared drawing helpers
function cellsAndPtr(root, arr, s) {
  arr.forEach((v, j) => {
    let c = "pe";
    if (s.k === "done") c = "sg";
    else if (s.k !== "start") { if (j < s.i) c = "sg"; else if (j === s.i) c = s.k === "look" ? "m" : s.k === "add" ? "sg" : "pk"; }
    const g = root.querySelector(`[data-cell="${j}"]`); if (!g) return;
    const r = g.querySelector("rect.k"); if (r) r.setAttribute("class", "k " + c);
    const t = g.querySelector("text"); if (t) t.textContent = String(v);
  });
  const ptr = root.querySelector("[data-ptr]");
  if (ptr) {
    const at = s.k === "start" || s.k === "done" ? null : s.i;
    ptr.style.opacity = at === null ? "0" : "1";
    ptr.style.transform = `translate(${X(at === null ? 0 : at)}px,0px)`;
  }
}
function slots(root, n, texts) {
  for (let j = 0; j < n; j++) {
    const fill = root.querySelector(`[data-slot="${j}"] [data-slotfill]`); if (!fill) continue;
    const on = j < texts.length;
    fill.style.opacity = on ? "1" : "0";
    const t = fill.querySelector("text"); if (t) t.textContent = on ? texts[j] : "";
  }
}
function badge(root, res) {
  const g = root.querySelector("[data-res]"); if (!g) return;
  g.style.opacity = res ? "1" : "0";
  if (!res) return;
  const r = g.querySelector("rect.k"), t = g.querySelector("text");
  if (t) t.textContent = res[0];
  if (r) r.setAttribute("class", "k " + res[1]);
}
const say = (root, text) => { const m = root.querySelector("[data-msg]"); if (m) m.textContent = text; };

// ------------------------------------------------------------------ engine
function draw(root, st) {
  const K = KINDS[st.kind];
  K.render(root, st.data, st.steps[st.i]);
  const back = root.querySelector('[data-act="back"]'), next = root.querySelector('[data-act="next"]');
  if (back) back.disabled = st.i === 0;
  if (next) next.disabled = st.i >= st.steps.length - 1;
  const play = root.querySelector('[data-act="play"]');
  if (play) play.textContent = st.timer ? "❚❚ Pause" : "▶ Play";
}
function stop(root, st) { if (st.timer) { clearInterval(st.timer); st.timer = 0; } draw(root, st); }
function play(root, st) {
  if (st.timer) { stop(root, st); return; }
  if (st.i >= st.steps.length - 1) st.i = 0;
  st.timer = setInterval(() => {
    if (st.i >= st.steps.length - 1) { stop(root, st); return; }
    st.i++;
    draw(root, st);
    if (st.i >= st.steps.length - 1) stop(root, st);
  }, STEP_MS);
  draw(root, st);
}
function setData(root, st, data) {
  stop(root, st);
  st.data = data; st.steps = KINDS[st.kind].steps(data); st.i = 0;
  draw(root, st);
}
function stateFor(root) {
  let st = states.get(root);
  if (!st) {
    const kind = root.dataset.kind, data = KINDS[kind].parse(root.dataset.default);
    st = { kind, data, steps: KINDS[kind].steps(data), i: 0, timer: 0 };
    states.set(root, st);
  }
  return st;
}

export function startInteractive() {
  const roots = [...document.querySelectorAll(".dgx-int[data-kind]")];
  if (!roots.length) return;
  roots.forEach((r) => draw(r, stateFor(r))); // every demo starts at step 0; it plays once by itself when first seen

  const handle = (e) => {
    const el = e.target.closest("[data-act]");
    const root = el && el.closest(".dgx-int");
    if (!root) return;
    const st = stateFor(root), act = el.dataset.act;
    if (act === "preset") { if (e.type === "change") setData(root, st, KINDS[st.kind].parse(el.value)); return; }
    if (e.type !== "click") return;
    if (act === "next") { stop(root, st); if (st.i < st.steps.length - 1) st.i++; draw(root, st); }
    else if (act === "back") { stop(root, st); if (st.i > 0) st.i--; draw(root, st); }
    else if (act === "reset") setData(root, st, st.data);
    else if (act === "play") play(root, st);
    else if (act === "random") {
      setData(root, st, KINDS[st.kind].random());
      const sel = root.querySelector('[data-act="preset"]'); if (sel) sel.selectedIndex = -1;
    }
  };
  document.addEventListener("click", handle);
  document.addEventListener("change", handle);

  if (typeof IntersectionObserver === "function" && motionAllowed()) {
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        const st = stateFor(e.target);
        if (st.i === 0 && !st.timer) play(e.target, st); // the one automatic run
      });
    }, { threshold: 0.5 });
    roots.forEach((r) => io.observe(r));
  }
}
