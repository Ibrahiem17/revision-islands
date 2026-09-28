  /* ============ LESSON LOADER ============
     Only the Lifecycle lesson (default tab) and the Game shell are in devops.html.
     Every other lesson panel (<div class="panel" id="tab-NAME">) starts as an empty
     "Loading…" shell and its content is fetched the first time its tab is opened:
       content/devops/lessons/NAME.html        the panel's inner HTML, verbatim
       content/devops/lessons/NAME.js (+ NAME.post.js)  optional classic scripts for that lesson
     window.DEVOPS_LESSONS (injected at build time, see vite.config.js) maps
     NAME -> { html: <hashed url>, js: [<hashed urls>] }. */
  const LESSON_STATE = {};   // name -> 'loading' | 'ready'
  const LESSON_LOADS = {};   // name -> in-flight promise (repeated clicks share it)
  const LESSON_TEXT = {};    // url -> in-flight/finished fetch of text (cache)
  const LESSON_RAN = {};     // script url -> already executed

  function lessonFetch(url) {
    if (!LESSON_TEXT[url]) {
      LESSON_TEXT[url] = fetch(url).then(r => {
        if (!r.ok) throw new Error(url + ' -> HTTP ' + r.status);
        return r.text();
      });
      LESSON_TEXT[url].catch(() => { delete LESSON_TEXT[url]; }); // failed fetches are retried, not cached
    }
    return LESSON_TEXT[url];
  }

  // Classic-script execution: inline <script> nodes run synchronously, in order,
  // in the global scope (same as the old `<script src>` tags did).
  function lessonRunScript(text, label) {
    const s = document.createElement('script');
    s.text = text + '\n//# sourceURL=' + label;
    document.head.appendChild(s);
    s.remove();
  }

  function lessonShowStatus(panel, name, failed) {
    panel.innerHTML = '';
    const box = document.createElement('div');
    box.className = 'lesson-status' + (failed ? ' lesson-error' : '');
    box.setAttribute('role', failed ? 'alert' : 'status');
    if (!failed) { box.textContent = 'Loading…'; panel.appendChild(box); return; }
    box.appendChild(document.createTextNode('Could not load this lesson. Check your connection. '));
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'lesson-retry';
    btn.textContent = 'Retry';
    btn.addEventListener('click', () => { lessonShowStatus(panel, name, false); ensureLesson(name); });
    box.appendChild(btn);
    panel.appendChild(box);
  }

  function ensureLesson(name) {
    const panel = document.getElementById('tab-' + name);
    const info = (window.DEVOPS_LESSONS || {})[name];
    if (!panel || !info || LESSON_STATE[name] === 'ready') return Promise.resolve();
    if (LESSON_LOADS[name]) return LESSON_LOADS[name];
    LESSON_STATE[name] = 'loading';
    const p = Promise.all([lessonFetch(info.html), Promise.all((info.js || []).map(lessonFetch))])
      .then(([html, codes]) => {
        panel.innerHTML = html;
        // scripts written inside the lesson HTML are inert after innerHTML: re-create them so they run
        panel.querySelectorAll('script').forEach((old, i) => {
          const s = document.createElement('script');
          s.text = old.textContent + '\n//# sourceURL=lesson-' + name + '-inline-' + i + '.js';
          old.replaceWith(s);
        });
        (info.js || []).forEach((url, i) => {
          if (LESSON_RAN[url]) return;
          LESSON_RAN[url] = true;
          lessonRunScript(codes[i], url.split('/').pop());
        });
        // "expand all" was clicked before this lesson existed: apply it to its Q&As too
        if (typeof allOpen !== 'undefined' && allOpen) panel.querySelectorAll('.qa-item').forEach(i => i.classList.add('open'));
        LESSON_STATE[name] = 'ready';
      })
      .catch(err => {
        console.error('Lesson "' + name + '" failed to load:', err);
        delete LESSON_STATE[name];
        lessonShowStatus(panel, name, true);
      })
      .then(() => { delete LESSON_LOADS[name]; });
    LESSON_LOADS[name] = p;
    return p;
  }

  // warm the cache when the pointer is over a tab (fetches only, nothing is inserted)
  document.addEventListener('pointerover', e => {
    const t = e.target.closest && e.target.closest('.tab');
    const m = t && /showTab\('([^']+)'/.exec(t.getAttribute('onclick') || '');
    const info = m && (window.DEVOPS_LESSONS || {})[m[1]];
    if (info && LESSON_STATE[m[1]] !== 'ready') {
      lessonFetch(info.html).catch(() => {});
      (info.js || []).forEach(u => lessonFetch(u).catch(() => {}));
    }
  });

  function showTab(name, el) {
    const panel = document.getElementById('tab-' + name);
    if (!panel) { console.warn('Panel not found: tab-' + name); return; }
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    panel.classList.add('active');
    el.classList.add('active');
    ensureLesson(name);
  }

  function showHU(name, el) {
    document.querySelectorAll('.hu-panel').forEach(p => p.classList.remove('hu-active'));
    document.querySelectorAll('.hu-tab').forEach(t => t.classList.remove('hu-active'));
    const panel = document.getElementById('hu-' + name);
    if (panel) panel.classList.add('hu-active');
    if (el) el.classList.add('hu-active');
  }

  function showPU(name, el) {
    document.querySelectorAll('.pu-panel').forEach(p => p.classList.remove('pu-active'));
    document.querySelectorAll('.pu-tab').forEach(t => t.classList.remove('pu-active'));
    const panel = document.getElementById('pu-' + name);
    if (panel) panel.classList.add('pu-active');
    if (el) el.classList.add('pu-active');
  }
  function toggle(qEl) {
    qEl.closest('.qa-item').classList.toggle('open');
  }
  let allOpen = false;
  function toggleAll() {
    allOpen = !allOpen;
    document.querySelectorAll('.qa-item').forEach(i => i.classList.toggle('open', allOpen));
    document.querySelector('#tab-qa .expand-btn').textContent = allOpen ? '▾ collapse all' : '▸ expand all';
  }
  // Scoped version for the Docker tab's own Q&A list — the global toggleAll()
  // above touches every .qa-item on the whole page and only updates the FIRST
  // .expand-btn it finds, so a second independent list needs its own toggle
  // that's scoped to just its own container and its own button.
  let dockerQaAllOpen = false;
  function toggleAllDocker() {
    dockerQaAllOpen = !dockerQaAllOpen;
    const list = document.getElementById('dockerQaList');
    if (!list) return;
    list.querySelectorAll('.qa-item').forEach(i => i.classList.toggle('open', dockerQaAllOpen));
    const btn = list.previousElementSibling;
    if (btn && btn.classList.contains('expand-btn')) {
      btn.textContent = dockerQaAllOpen ? '▾ collapse all' : '▸ expand all';
    }
  }
  /* Renders one or more "runs" of a command, each as its own separate
     black terminal box, with a short "how to read it" callout under
     each one. Shared by every command-simulator tab that adopts the
     runs:[] shape — Linux for DevOps, Networking for DevOps, Shell/SSH,
     and Docker for DevOps. */
  function renderCmdRuns(runs, containerEl) {
    containerEl.innerHTML = runs.map((run, i) => {
      const lines = run.cmd.split('\n');
      const extra = lines.length > 1
        ? lines.slice(1).map(l => '<span class="ld-prompt">devops@server:~$</span> ' + l).join('\n') + '\n'
        : '';
      const readingHtml = run.reading
        ? `<div style="background:rgba(56,189,248,0.05);border:1px solid rgba(56,189,248,0.2);border-left:3px solid #38bdf8;border-radius:4px;padding:10px 14px;margin-bottom:16px;font-size:11.5px;color:#94a3b8;line-height:1.7;"><strong style="color:#38bdf8;">How to read it:</strong> ${run.reading}</div>`
        : '';
      return `<div class="ld-term" style="margin-bottom:8px;">
        <div class="ld-term-bar">
          <span class="ld-dot" style="background:#ff5f56"></span>
          <span class="ld-dot" style="background:#ffbd2e"></span>
          <span class="ld-dot" style="background:#27c93f"></span>
          <span class="ld-term-title">Run ${i + 1} of ${runs.length} — devops@server: ~</span>
        </div>
        <div class="ld-term-body">
          <div class="ld-term-line"><span class="ld-prompt">devops@server:~$</span> ${lines[0]}</div>
          <div class="pu-output">${extra}${run.output}</div>
        </div>
      </div>${readingHtml}`;
    }).join('');
  }

  let QUIZ_STATE = null;      // { rootId, questions, index, score, total }
  let QUIZ_JOKE_TIMEOUT = null;

  function quizStart(rootId, jokes, questions) {
    const root = document.getElementById(rootId);
    if (!root) return;
    clearTimeout(QUIZ_JOKE_TIMEOUT);

    const joke = jokes[Math.floor(Math.random() * jokes.length)];
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    QUIZ_STATE = { rootId, questions: shuffled, index: 0, score: 0, answered: 0, total: shuffled.length };

    root.querySelectorAll('.quiz-screen').forEach(s => s.style.display = 'none');
    root.querySelector('.quiz-joke-screen').style.display = 'flex';
    root.querySelector('.quiz-joke-text').textContent = joke;
    root.querySelector('.quiz-close-btn').style.display = 'block';

    QUIZ_JOKE_TIMEOUT = setTimeout(() => {
      if (!QUIZ_STATE || QUIZ_STATE.rootId !== rootId) return; // user quit during the joke
      quizRenderQuestion();
    }, 5000);
  }

  function quizRenderQuestion() {
    if (!QUIZ_STATE) return;
    const root = document.getElementById(QUIZ_STATE.rootId);
    const q = QUIZ_STATE.questions[QUIZ_STATE.index];

    // Shuffle the 4 options into a fresh random order every time a question
    // is shown — the correct answer's on-screen position must never be
    // predictable (this is what fixes "the answer is always #2").
    const order = [0, 1, 2, 3];
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    const displayedOptions = order.map(i => q.options[i]);
    const displayedCorrect = order.indexOf(q.correct);
    QUIZ_STATE.displayedOptions = displayedOptions;
    QUIZ_STATE.displayedCorrect = displayedCorrect;

    root.querySelectorAll('.quiz-screen').forEach(s => s.style.display = 'none');
    root.querySelector('.quiz-question-screen').style.display = 'flex';
    root.querySelector('.quiz-progress').textContent = `Question ${QUIZ_STATE.index + 1} of ${QUIZ_STATE.total}`;
    root.querySelector('.quiz-score').textContent = `Score: ${QUIZ_STATE.score}`;
    root.querySelector('.quiz-q-text').textContent = q.q;

    const optWrap = root.querySelector('.quiz-options');
    optWrap.innerHTML = '';
    displayedOptions.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option';
      btn.textContent = opt;
      btn.onclick = () => quizAnswer(i);
      optWrap.appendChild(btn);
    });

    root.querySelector('.quiz-feedback').style.display = 'none';
    root.querySelector('.quiz-next-btn').style.display = 'none';
  }

  function quizAnswer(choiceIndex) {
    if (!QUIZ_STATE) return;
    const root = document.getElementById(QUIZ_STATE.rootId);
    const q = QUIZ_STATE.questions[QUIZ_STATE.index];
    const correctIdx = QUIZ_STATE.displayedCorrect;
    const options = QUIZ_STATE.displayedOptions;
    const buttons = root.querySelectorAll('.quiz-option');
    buttons.forEach(b => b.onclick = null);

    const correct = choiceIndex === correctIdx;
    QUIZ_STATE.answered++;
    if (correct) QUIZ_STATE.score++;
    buttons[correctIdx].classList.add('quiz-correct');
    if (!correct) buttons[choiceIndex].classList.add('quiz-wrong');

    const fb = root.querySelector('.quiz-feedback');
    fb.style.display = 'block';
    fb.innerHTML = correct
      ? `<span class="quiz-fb-correct">✅ Correct!</span> ${q.why}`
      : `<span class="quiz-fb-wrong">❌ Not quite.</span> The right answer is <strong>${options[correctIdx]}</strong> — ${q.why}`;

    root.querySelector('.quiz-score').textContent = `Score: ${QUIZ_STATE.score}`;
    const nextBtn = root.querySelector('.quiz-next-btn');
    nextBtn.style.display = 'inline-block';
    nextBtn.textContent = (QUIZ_STATE.index + 1 < QUIZ_STATE.total) ? 'Next Question →' : 'See Results →';
  }

  function quizNext() {
    if (!QUIZ_STATE) return;
    QUIZ_STATE.index++;
    if (QUIZ_STATE.index >= QUIZ_STATE.total) {
      quizEnd();
    } else {
      quizRenderQuestion();
    }
  }

  function quizEnd() {
    if (!QUIZ_STATE) return;
    const root = document.getElementById(QUIZ_STATE.rootId);
    const attempted = QUIZ_STATE.answered;
    root.querySelectorAll('.quiz-screen').forEach(s => s.style.display = 'none');
    root.querySelector('.quiz-end-screen').style.display = 'flex';
    root.querySelector('.quiz-close-btn').style.display = 'none';
    root.querySelector('.quiz-end-score').textContent = `${QUIZ_STATE.score} / ${attempted}`;
    root.querySelector('.quiz-end-pct').textContent = attempted > 0 ? Math.round((QUIZ_STATE.score / attempted) * 100) + '%' : '—';
    QUIZ_STATE = null;
  }

  function quizQuit() {
    clearTimeout(QUIZ_JOKE_TIMEOUT);
    if (!QUIZ_STATE) return;
    quizEnd();
  }

  function quizReset(rootId) {
    clearTimeout(QUIZ_JOKE_TIMEOUT);
    QUIZ_STATE = null;
    const root = document.getElementById(rootId);
    if (!root) return;
    root.querySelectorAll('.quiz-screen').forEach(s => s.style.display = 'none');
    root.querySelector('.quiz-start-screen').style.display = 'flex';
    root.querySelector('.quiz-close-btn').style.display = 'none';
  }
