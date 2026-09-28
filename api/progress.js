// GET/PUT the signed-in user's progress: { learned:{topic:[ids]}, game:<dgc_save_v1>, updatedAt }
// Requires "Authorization: Bearer <Supabase JWT>". Returns 501 if Supabase env is not configured.
import { config, getUser, getProgress, putProgress } from './_lib/supabase.js';

const MAX_BYTES = 1024 * 1024; // 1 MB

const isObj = (v) => v && typeof v === 'object' && !Array.isArray(v);

function validate(b) {
  if (!isObj(b)) return 'body must be a JSON object';
  if (!isObj(b.learned)) return 'learned must be an object';
  for (const [k, v] of Object.entries(b.learned)) {
    if (!Array.isArray(v) || !v.every((x) => typeof x === 'string' || typeof x === 'number')) {
      return 'learned.' + k + ' must be an array of ids';
    }
  }
  if (b.game !== undefined && b.game !== null && !isObj(b.game)) return 'game must be an object';
  if (b.updatedAt !== undefined && Number.isNaN(Date.parse(b.updatedAt))) return 'updatedAt must be an ISO date';
  return null;
}

function readBody(req) {
  let body = req.body;
  if (body === undefined || body === null) return { error: 'empty body', status: 400 };
  if (Buffer.isBuffer(body)) body = body.toString('utf8');
  if (typeof body === 'string') {
    if (Buffer.byteLength(body) > MAX_BYTES) return { error: 'payload too large', status: 413 };
    try { body = JSON.parse(body); } catch (e) { return { error: 'invalid JSON', status: 400 }; }
  } else if (Buffer.byteLength(JSON.stringify(body)) > MAX_BYTES) {
    return { error: 'payload too large', status: 413 };
  }
  return { body };
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'GET' && req.method !== 'PUT') {
    res.setHeader('Allow', 'GET, PUT');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const cfg = config();
  if (!cfg) {
    return res.status(501).json({ error: 'Cloud sync is not configured: set SUPABASE_URL and SUPABASE_ANON_KEY.' });
  }
  const auth = String((req.headers && (req.headers.authorization || req.headers.Authorization)) || '');
  const m = /^Bearer\s+(\S+)$/i.exec(auth);
  if (!m) return res.status(401).json({ error: 'Missing bearer token' });
  const token = m[1];

  // reject oversize before touching the network
  const len = Number(req.headers && req.headers['content-length']);
  if (req.method === 'PUT' && len > MAX_BYTES) return res.status(413).json({ error: 'payload too large' });

  try {
    const user = await getUser(cfg, token);
    if (!user) return res.status(401).json({ error: 'Invalid or expired token' });

    if (req.method === 'GET') {
      const row = await getProgress(cfg, token, user.id);
      if (!row) return res.status(200).json({ learned: {}, game: null, updatedAt: null });
      const d = row.data || {};
      return res.status(200).json({ learned: d.learned || {}, game: d.game || null, updatedAt: row.updated_at });
    }

    const parsed = readBody(req);
    if (parsed.error) return res.status(parsed.status).json({ error: parsed.error });
    const bad = validate(parsed.body);
    if (bad) return res.status(400).json({ error: bad });
    const updatedAt = parsed.body.updatedAt ? new Date(parsed.body.updatedAt).toISOString() : new Date().toISOString();
    const data = { learned: parsed.body.learned, game: parsed.body.game || null };
    const row = await putProgress(cfg, token, user.id, data, updatedAt);
    return res.status(200).json({ ok: true, updatedAt: (row && row.updated_at) || updatedAt });
  } catch (e) {
    return res.status(502).json({ error: 'Upstream error' });
  }
}
