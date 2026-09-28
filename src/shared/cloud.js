/**
 * Optional cloud sync (Supabase via /api/progress). OFF by default: unless
 * VITE_CLOUD_SYNC === 'true' and VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY are
 * set at build time, every export is a no-op that returns immediately and makes
 * no network request. Nothing here runs until init() is called
 * (topic-page.js calls it only when the flag is on).
 *
 * Model: last-write-wins by updatedAt. Local progress stays the source of truth
 * offline; learned ids are merged (union) on pull, the game save is replaced
 * only when the remote copy is newer than the last local sync.
 * No login UI yet: call setSession({ access_token }) after signing in.
 */
import { onProgressChange, applyRemote, getItem, setItem } from './progress.js';

const env = (typeof import.meta !== 'undefined' && import.meta.env) || {};
export const enabled =
  env.VITE_CLOUD_SYNC === 'true' && !!env.VITE_SUPABASE_URL && !!env.VITE_SUPABASE_ANON_KEY;

const SESSION_KEY = 'cloud_session_v1';
const SYNCED_KEY = 'cloud_synced_at_v1';
const GAME_KEY = 'dgc_save_v1';
const DEBOUNCE_MS = 2000;

let timer = null;
let started = false;
let unsub = null;

function token() {
  try { const s = JSON.parse(getItem(SESSION_KEY) || 'null'); return (s && s.access_token) || null; } catch (e) { return null; }
}

function collect() {
  const learned = {};
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.indexOf('learned_') === 0) {
        const v = JSON.parse(localStorage.getItem(k));
        if (Array.isArray(v)) learned[k.slice(8)] = v;
      }
    }
  } catch (e) { /* ignore */ }
  let game = null;
  try { game = JSON.parse(getItem(GAME_KEY) || 'null'); } catch (e) { /* ignore */ }
  return { learned, game };
}

async function api(method, body) {
  const t = token();
  if (!t) return null;
  const r = await fetch('/api/progress', {
    method,
    headers: { Authorization: 'Bearer ' + t, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined
  });
  if (!r.ok) return null;
  return r.json();
}

/** Store the Supabase session after the (future) login UI signs the user in. */
export function setSession(session) {
  if (!enabled) return false;
  return setItem(SESSION_KEY, JSON.stringify(session || null));
}
export function signOut() {
  if (!enabled) return;
  setItem(SESSION_KEY, 'null');
}
/** Stub: the login UI is a documented next step. */
export async function signIn() {
  if (!enabled) return null;
  return null;
}

export async function pushProgress() {
  if (!enabled || !token()) return false;
  const now = new Date().toISOString();
  const res = await api('PUT', { ...collect(), updatedAt: now });
  if (res && res.ok) { setItem(SYNCED_KEY, res.updatedAt || now); return true; }
  return false;
}

export async function pullProgress() {
  if (!enabled || !token()) return false;
  const remote = await api('GET');
  if (!remote || !remote.updatedAt) return false;
  const local = getItem(SYNCED_KEY);
  Object.entries(remote.learned || {}).forEach(([k, ids]) => { if (Array.isArray(ids)) applyRemote(k, ids); });
  if (remote.game && (!local || Date.parse(remote.updatedAt) > Date.parse(local))) {
    // takes effect the next time the game starts
    setItem(GAME_KEY, JSON.stringify(remote.game));
  }
  setItem(SYNCED_KEY, remote.updatedAt);
  return true;
}

function schedule() {
  clearTimeout(timer);
  timer = setTimeout(() => { pushProgress().catch(() => {}); }, DEBOUNCE_MS);
}

export function init() {
  if (!enabled || started) return false;
  started = true;
  unsub = onProgressChange(schedule);
  pullProgress().catch(() => {});
  return true;
}
export function stop() {
  clearTimeout(timer);
  if (unsub) unsub();
  started = false;
}
