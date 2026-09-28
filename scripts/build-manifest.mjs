// Generates content/manifest.json from content/<dir>/index.js so the home page
// can show progress badges without loading any topic content.
import { readdirSync, writeFileSync, existsSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
// dir -> localStorage/topic key (kept from the old REVISION_DATA keys so saved progress still matches).
// Dirs not listed use the dir name as key.
const KEYS = { 'system-design': 'systemDesign' };

const topics = [];
for (const dir of readdirSync(resolve(root, 'content'), { withFileTypes: true })) {
  if (!dir.isDirectory() || dir.name.startsWith('_')) continue;
  const file = resolve(root, 'content', dir.name, 'index.js');
  if (!existsSync(file)) continue;
  const data = (await import(pathToFileURL(file).href)).default;
  const ids = (data.sections || []).flatMap((s) => s.items.map((i) => i.id));
  topics.push({ key: KEYS[dir.name] || dir.name, dir: dir.name, title: data.title, icon: data.icon, total: ids.length, ids });
}
topics.sort((a, b) => a.key.localeCompare(b.key));
writeFileSync(resolve(root, 'content', 'manifest.json'), JSON.stringify(topics, null, 1) + '\n');
console.log('manifest:', topics.map((t) => `${t.key}=${t.total}`).join(', '));
