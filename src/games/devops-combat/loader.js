// Lazy loader for the DevOps Terminal Combat game. The game is NOT part of the page's
// initial load: its JS is a separate Vite chunk (dynamic import) and its CSS a hashed
// asset. Both are fetched the first time the Game tab is opened, and prefetched at idle
// so that first click is normally instant. The import only downloads/evaluates the
// module (data + function definitions); nothing runs until startDevopsGame() is called
// after the CSS is applied, so keyboard handlers etc. register only at init.
const CSS_URL = new URL('../../../css/devops-game.css', import.meta.url).href;
const loadGameModule = () => import('./main.js');

export function initDevopsGameLoader() {
  const panel = document.getElementById('tab-game');
  const msg = document.getElementById('dgcLoadingMsg');
  const retryBtn = document.getElementById('dgcLoadingRetry');
  const navBtn = document.querySelector('.tab[onclick*="showTab(\'game\'"]');
  if (!panel || !msg || !retryBtn) return;
  let state = 'idle'; // idle -> loading -> ready (or error -> loading again on retry)
  let cssEl = null;

  function fail(what) {
    state = 'error';
    if (cssEl && cssEl.parentNode) cssEl.parentNode.removeChild(cssEl);
    cssEl = null;
    msg.textContent = 'Could not load the game (' + what + '). Check your connection.';
    retryBtn.hidden = false;
  }

  function ready() {
    state = 'ready';
    panel.classList.add('dgc-ready');
    // The game attaches its own "crossing the threshold" listener to the Game tab
    // button while it initialises, i.e. AFTER this first click already happened.
    // If the tab is still open, replay the click so the entry sequence runs once.
    if (navBtn && panel.classList.contains('active')) {
      navBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }
  }

  function load() {
    if (state === 'loading' || state === 'ready') return; // idempotent
    state = 'loading';
    msg.textContent = 'Loading game…';
    retryBtn.hidden = true;
    cssEl = document.createElement('link');
    cssEl.rel = 'stylesheet';
    cssEl.href = CSS_URL;
    cssEl.onerror = () => fail('styles');
    cssEl.onload = () => {
      // styles first, so the game initialises with its CSS already applied
      loadGameModule().then(
        (m) => {
          try { m.startDevopsGame(); } catch (e) { console.error(e); fail('script'); return; }
          ready();
        },
        () => fail('script')
      );
    };
    document.head.appendChild(cssEl);
  }

  window.loadDevopsGame = load;
  if (navBtn) navBtn.addEventListener('click', load);
  retryBtn.addEventListener('click', load);
  // the Game tab may already have been clicked before this module ran
  if (panel.classList.contains('active')) load();

  // Warm the HTTP cache once the page has settled so the first Game click is usually instant.
  window.addEventListener('load', () => {
    const conn = navigator.connection;
    if (conn && conn.saveData) return;
    const prefetch = () => {
      const l = document.createElement('link');
      l.rel = 'prefetch';
      l.as = 'style';
      l.href = CSS_URL;
      document.head.appendChild(l);
      loadGameModule().catch(() => {}); // download + evaluate (no side effects) ahead of time
    };
    if (window.requestIdleCallback) requestIdleCallback(prefetch, { timeout: 3000 });
    else setTimeout(prefetch, 3000);
  });
}
