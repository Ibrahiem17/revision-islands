import { defineConfig } from 'vite';
import { resolve, dirname, basename, extname, posix, sep, relative } from 'node:path';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));

/**
 * The site's JS relies on classic (non-module) scripts and globals, which Vite
 * does not bundle. This plugin keeps them classic but gives them content-hashed
 * URLs in the build:
 *   1. <script src="../js/x.js"> (no type=module) -> emitted as /assets/x-<hash>.js
 *   2. local <link rel="stylesheet" href="x.css"> -> same, verbatim (keeps the exact
 *      cascade order; Vite's own CSS bundling would reorder/merge sheets).
 * In `vite dev` the files are served as-is and tokens become plain paths.
 */
function classicAssets() {
  const SCRIPT = /(<script\b(?![^>]*\btype\s*=\s*["']module["'])[^>]*?\bsrc\s*=\s*["'])([^"':]+?\.js)(\?[^"']*)?(["'][^>]*>)/g;
  const LINK = /<link\b(?=[^>]*\brel\s*=\s*["']stylesheet["'])[^>]*?\bhref\s*=\s*["']([^"':]+?\.css)["'][^>]*>/g;
  // inline <style> blocks are stashed so Vite does not re-print/minify them
  const STYLE = /<style\b[^>]*>[\s\S]*?<\/style>/g;
  const STASH = /<!--inline-style:([A-Za-z0-9+/=]+)-->/g;
  const unstash = (html) => html.replace(STASH, (_, b) => Buffer.from(b, 'base64').toString('utf8'));
  const MARK = /<!--classic-css:([^>]+?)-->/g;
  // __lessons(<dir>)__ -> JSON { name: { html, js: [] } } for the lazily-loaded lesson panels
  const LESSONS = /__lessons\(([^)]+)\)__/g;
  // convention: NAME.html is the panel content; NAME.js and NAME.post.js (optional) are classic scripts run right after it
  const lessonList = (absDir) =>
    readdirSync(absDir)
      .filter((f) => f.endsWith('.html'))
      .sort()
      .map((f) => {
        const name = f.slice(0, -5);
        const js = [name + '.js', name + '.post.js'].filter((j) => existsSync(resolve(absDir, j)));
        return { name, file: resolve(absDir, f), js: js.map((j) => resolve(absDir, j)) };
      });
  const slash = (p) => p.split(sep).join('/');
  const hideLinks = {
    // hide local stylesheet links from Vite's CSS bundler
    name: 'classic-assets-hide-css',
    transformIndexHtml: {
      order: 'pre',
      handler: (html) =>
        html
          .replace(STYLE, (m) => '<!--inline-style:' + Buffer.from(m, 'utf8').toString('base64') + '-->')
          .replace(LINK, (_, href) => '<!--classic-css:' + href + '-->'),
    },
  };
  const main = {
    name: 'classic-assets',
    enforce: 'post',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        if (!ctx.server) return html;
        const dir = posix.dirname(ctx.path);
        return unstash(html)
          .replace(MARK, (_, p) => '<link rel="stylesheet" href="' + p + '">')
          .replace(LESSONS, (_, p) => {
            const abs = resolve(root, '.' + posix.join(dir, p));
            const url = (f) => '/' + slash(relative(root, f));
            return JSON.stringify(Object.fromEntries(lessonList(abs).map((l) => [l.name, { html: url(l.file), js: l.js.map(url) }])));
          });
      },
    },
    // dev only: Vite's HTML middleware would treat lesson fragments as pages, so serve them raw
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const path = (req.url || '').split('?')[0];
        if (/^\/content\/[^/]+\/lessons\/[^/]+\.html$/.test(path)) {
          const file = resolve(root, '.' + decodeURIComponent(path));
          if (existsSync(file)) {
            res.setHeader('Content-Type', 'text/plain; charset=utf-8');
            res.setHeader('Cache-Control', 'no-store');
            res.end(readFileSync(file));
            return;
          }
        }
        next();
      });
    },
    generateBundle(_, bundle) {
      const cache = new Map();
      const emitFileAt = (file, asName) => {
        if (!cache.has(file)) {
          const ref = this.emitFile({
            type: 'asset',
            name: asName || basename(file),
            source: readFileSync(file),
          });
          cache.set(file, '/' + this.getFileName(ref));
        }
        return cache.get(file);
      };
      const emit = (htmlName, rel) => emitFileAt(resolve(root, dirname(htmlName), rel));
      for (const item of Object.values(bundle)) {
        if (item.type !== 'asset' || extname(item.fileName) !== '.html' || item.fileName.startsWith('assets/')) continue;
        let html = unstash(String(item.source));
        html = html.replace(SCRIPT, (_, a, src, _q, z) => a + emit(item.fileName, src) + z);
        html = html.replace(MARK, (_, p) => '<link rel="stylesheet" href="' + emit(item.fileName, p) + '">');
        html = html.replace(LESSONS, (_, p) => {
          const abs = resolve(root, dirname(item.fileName), p);
          // fragments are emitted as .txt (text/plain, compressed by the CDN) so the /assets immutable rule applies
          // and the *.html revalidate rule does not; the content hash is in the name.
          const map = Object.fromEntries(
            lessonList(abs).map((l) => [l.name, { html: emitFileAt(l.file, 'lesson-' + l.name + '.txt'), js: l.js.map((j) => emitFileAt(j)) }])
          );
          return JSON.stringify(map);
        });
        item.source = html;
      }
    },
  };
  return [hideLinks, main];
}

export default defineConfig({
  appType: 'mpa',
  plugins: [classicAssets()],
  build: {
    rollupOptions: {
      output: {
        // the lazily imported game gets a readable name instead of "main-<hash>.js"
        chunkFileNames: (c) => (c.facadeModuleId && c.facadeModuleId.includes("/games/devops-combat/main.js") ? "assets/devops-game-[hash].js" : "assets/[name]-[hash].js"),
      },
      input: {
        index: resolve(root, 'index.html'),
        dsa: resolve(root, 'topics/dsa.html'),
        oop: resolve(root, 'topics/oop.html'),
        'system-design': resolve(root, 'topics/system-design.html'),
        database: resolve(root, 'topics/database.html'),
        devops: resolve(root, 'topics/devops.html'),
      },
    },
  },
});
