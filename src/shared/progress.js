/**
 * Progress storage: the only place that touches localStorage for user
 * progress. Every access is try/catch-guarded (private mode, blocked storage).
 * Keys are unchanged from the pre-module site: `learned_<topicKey>`.
 *
 * Sync hook points: `onProgressChange(fn)` is called after every local write
 * with (kind, key, value). A future cloud-sync module can subscribe there and
 * can call `applyRemote(topicKey, idsArray)` to merge server state. No network
 * code lives here.
 */
const listeners = new Set();

export function onProgressChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
function emit(kind, key, value) {
  listeners.forEach((fn) => { try { fn(kind, key, value); } catch (e) { /* ignore */ } });
}

export function getItem(key) {
  try { return localStorage.getItem(key); } catch (e) { return null; }
}
export function setItem(key, value) {
  try { localStorage.setItem(key, value); return true; } catch (e) { return false; }
}

export const learnedKey = (topicKey) => 'learned_' + topicKey;

export function getLearnedSet(topicKey) {
  try {
    const raw = getItem(learnedKey(topicKey));
    const arr = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(arr) ? arr : []);
  } catch (e) {
    return new Set();
  }
}

export function saveLearnedSet(topicKey, set) {
  const arr = [...set];
  setItem(learnedKey(topicKey), JSON.stringify(arr));
  emit('learned', topicKey, arr);
}

/** Merge ids coming from elsewhere (future sync) into local progress. */
export function applyRemote(topicKey, ids) {
  const set = getLearnedSet(topicKey);
  ids.forEach((id) => set.add(id));
  saveLearnedSet(topicKey, set);
  return set;
}

/** validIds: array of item ids that currently exist for the topic (stale ids are ignored). */
export function progressFor(topicKey, validIds) {
  const total = validIds ? validIds.length : 0;
  if (!total) return { pct: 0, total: 0, learned: 0 };
  const valid = new Set(validIds);
  const learned = [...getLearnedSet(topicKey)].filter((id) => valid.has(id)).length;
  return { pct: Math.round((learned / total) * 100), total, learned };
}

// ---- small UI preferences (same keys as before) ----
export const getPref = (key) => getItem(key);
export const setPref = (key, value) => setItem(key, value);
