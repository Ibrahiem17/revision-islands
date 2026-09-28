// Minimal Supabase client using plain fetch (no dependencies).
// Env (server-side only): SUPABASE_URL, SUPABASE_ANON_KEY. Nothing is committed.

export function config() {
  const url = (process.env.SUPABASE_URL || '').replace(/\/+$/, '');
  const anonKey = process.env.SUPABASE_ANON_KEY || '';
  return url && anonKey ? { url, anonKey } : null;
}

const headers = (cfg, token, extra) => ({
  apikey: cfg.anonKey,
  Authorization: 'Bearer ' + token,
  'Content-Type': 'application/json',
  ...extra
});

/** Validate a user JWT with Supabase Auth. Returns { id } or null. */
export async function getUser(cfg, token) {
  const r = await fetch(cfg.url + '/auth/v1/user', { headers: headers(cfg, token) });
  if (!r.ok) return null;
  const u = await r.json();
  return u && u.id ? { id: u.id } : null;
}

/** Read the user's progress row (RLS applies because we use the user's JWT). */
export async function getProgress(cfg, token, userId) {
  const q = '?user_id=eq.' + encodeURIComponent(userId) + '&select=data,updated_at&limit=1';
  const r = await fetch(cfg.url + '/rest/v1/progress' + q, { headers: headers(cfg, token) });
  if (!r.ok) throw new Error('supabase read failed: ' + r.status);
  const rows = await r.json();
  return Array.isArray(rows) && rows[0] ? rows[0] : null;
}

/** Upsert the user's single progress row. */
export async function putProgress(cfg, token, userId, data, updatedAt) {
  const r = await fetch(cfg.url + '/rest/v1/progress?on_conflict=user_id', {
    method: 'POST',
    headers: headers(cfg, token, { Prefer: 'resolution=merge-duplicates,return=representation' }),
    body: JSON.stringify({ user_id: userId, data, updated_at: updatedAt })
  });
  if (!r.ok) throw new Error('supabase write failed: ' + r.status);
  const rows = await r.json();
  return Array.isArray(rows) ? rows[0] : rows;
}
