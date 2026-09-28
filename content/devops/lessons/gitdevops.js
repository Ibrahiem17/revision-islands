  /* ============================================================
     GIT FOR DEVOPS — a real, minimal git engine + animated SVG
     commit-graph renderer + a typed command "compiler". Everything
     below is genuinely simulating git's actual model (commits with
     parent pointers, branches as movable pointers, HEAD, merges,
     rebase-as-replay, reset vs revert, etc.) — not scripted footage.
     ============================================================ */
  const GIT_LANE_COLORS = ['#38bdf8','#22c55e','#a78bfa','#f97316','#f43f5e','#eab308','#2dd4bf','#ec4899'];
  let GIT = null;
  let gitDom = { commits:{}, edges:{}, tags:{} };

  function gitFreshRepo() {
    return {
      commits: {}, branches: {}, laneOf: {}, usedLanes: new Set(),
      head: { type:'branch', name:'main' },
      staged: false, dirty: false, remoteAdded: false,
      remoteBranches: {}, tags: {}, stash: [],
      commitCounter: 0, orderCounter: 0, log: []
    };
  }
  function gitInit() {
    GIT = gitFreshRepo();
    GIT.laneOf['main'] = 0; GIT.usedLanes.add(0);
    return `Initialized empty Git repository in /project/.git/`;
  }
  function gitCurrentCommit() { return GIT.head.type === 'branch' ? (GIT.branches[GIT.head.name] || null) : GIT.head.id; }
  function gitCurrentBranchName() { return GIT.head.type === 'branch' ? GIT.head.name : null; }
  function gitIsAncestor(ancId, descId) {
    if (!ancId || !descId) return false;
    if (ancId === descId) return true;
    const seen = new Set(); const stack = [descId];
    while (stack.length) {
      const id = stack.pop();
      if (id === ancId) return true;
      if (seen.has(id)) continue; seen.add(id);
      const c = GIT.commits[id];
      if (c) c.parents.forEach(p => stack.push(p));
    }
    return false;
  }
  function gitResolveRef(ref) {
    if (!ref) return null;
    ref = ref.trim();
    if (ref === 'HEAD') return gitCurrentCommit();
    const m = ref.match(/^HEAD~(\d+)$/);
    if (m) {
      let id = gitCurrentCommit(); let n = parseInt(m[1], 10);
      while (n-- > 0 && id) { const c = GIT.commits[id]; id = (c && c.parents.length) ? c.parents[0] : null; }
      return id;
    }
    if (GIT.branches[ref] !== undefined) return GIT.branches[ref];
    if (GIT.remoteBranches[ref] !== undefined) return GIT.remoteBranches[ref];
    if (GIT.tags[ref] !== undefined) return GIT.tags[ref];
    if (GIT.commits[ref]) return ref;
    return null;
  }
  function gitNewLaneForBranch(name) {
    let n = 0; while (GIT.usedLanes.has(n)) n++;
    GIT.laneOf[name] = n; GIT.usedLanes.add(n); return n;
  }
  function gitCreateCommit(message, parents) {
    const id = 'c' + GIT.commitCounter++;
    const lane = GIT.head.type === 'branch' ? (GIT.laneOf[GIT.head.name] ?? gitNewLaneForBranch(GIT.head.name)) : 0;
    GIT.commits[id] = { id, parents: parents.slice(), message, lane, order: GIT.orderCounter++ };
    return id;
  }
  function gitLog(type, text) { GIT.log.push({ type, text }); }

  /* ---------- individual commands ---------- */
  function gitCmdStatus() {
    const branch = gitCurrentBranchName();
    const lines = [`On branch ${branch || '(HEAD detached)'}`];
    if (GIT.staged) lines.push(`Changes to be committed:`, `        modified:   app.js`);
    else if (GIT.dirty) lines.push(`Changes not staged for commit:`, `        modified:   app.js`);
    else lines.push(`nothing to commit, working tree clean`);
    return { ok: true, out: lines };
  }
  function gitCmdAdd() { GIT.staged = true; GIT.dirty = false; return { ok: true, out: [] }; }
  function gitCmdCommitCore(message) {
    if (!message) return { err: true, out: [`error: switch \`m' requires a value`, `fatal: no commit message provided`] };
    if (!GIT.staged) return { err: true, out: [`On branch ${gitCurrentBranchName() || '(detached HEAD)'}`, `nothing to commit, working tree clean`] };
    const parent = gitCurrentCommit();
    const id = gitCreateCommit(message, parent ? [parent] : []);
    if (GIT.head.type === 'branch') GIT.branches[GIT.head.name] = id; else GIT.head.id = id;
    GIT.staged = false; GIT.dirty = false;
    const branchLbl = gitCurrentBranchName() || '(detached HEAD)';
    return { ok: true, out: [`[${branchLbl} ${id}] ${message}`, ` 1 file changed, 1 insertion(+)`] };
  }
  function gitCmdCommit(rest) {
    let message = null, auto = false;
    for (let i = 0; i < rest.length; i++) {
      if (rest[i] === '-m') { message = rest[i + 1]; i++; }
      else if (rest[i] === '-am' || rest[i] === '-ma') { auto = true; message = rest[i + 1]; i++; }
      else if (rest[i] === '-a') auto = true;
      else if (!message && !rest[i].startsWith('-')) message = rest[i];
    }
    if (auto) GIT.staged = true;
    return gitCmdCommitCore(message);
  }
  function gitCmdBranch(rest) {
    if (rest.length === 0) {
      const names = Object.keys(GIT.branches); const cur = gitCurrentBranchName();
      return { ok: true, out: names.length ? names.map(n => (n === cur ? '* ' : '  ') + n) : [`(no branches yet — try git init first)`] };
    }
    if (rest[0] === '-d' || rest[0] === '-D') {
      const name = rest[1];
      if (!GIT.branches[name]) return { err: true, out: [`error: branch '${name}' not found.`] };
      if (name === gitCurrentBranchName()) return { err: true, out: [`error: cannot delete branch '${name}' checked out`] };
      const wasAt = GIT.branches[name];
      if (rest[0] === '-d' && !gitIsAncestor(wasAt, gitCurrentCommit())) {
        return { err: true, out: [`error: the branch '${name}' is not fully merged.`, `hint: use 'git branch -D ${name}' to force deletion`] };
      }
      delete GIT.branches[name];
      const lane = GIT.laneOf[name]; if (lane !== undefined) { GIT.usedLanes.delete(lane); delete GIT.laneOf[name]; }
      return { ok: true, out: [`Deleted branch ${name} (was ${wasAt}).`] };
    }
    const name = rest[0];
    if (GIT.branches[name]) return { err: true, out: [`fatal: a branch named '${name}' already exists`] };
    const cur = gitCurrentCommit();
    GIT.branches[name] = cur; gitNewLaneForBranch(name);
    return { ok: true, out: [] };
  }
  function gitCmdCheckout(rest) {
    if (rest[0] === '-b') {
      const name = rest[1];
      if (!name) return { err: true, out: [`error: switch \`b' requires a value`] };
      if (GIT.branches[name]) return { err: true, out: [`fatal: a branch named '${name}' already exists`] };
      GIT.branches[name] = gitCurrentCommit(); gitNewLaneForBranch(name);
      GIT.head = { type: 'branch', name };
      return { ok: true, out: [`Switched to a new branch '${name}'`] };
    }
    const name = rest[0];
    if (name === gitCurrentBranchName()) return { ok: true, out: [`Already on '${name}'`] };
    if (GIT.branches[name] === undefined && name !== 'main') return { err: true, out: [`error: pathspec '${name}' did not match any file(s) known to git`] };
    GIT.head = { type: 'branch', name };
    if (GIT.laneOf[name] === undefined) gitNewLaneForBranch(name);
    return { ok: true, out: [`Switched to branch '${name}'`] };
  }
  function gitCmdSwitch(rest) { return rest[0] === '-c' ? gitCmdCheckout(['-b', rest[1]]) : gitCmdCheckout(rest); }
  function gitCmdMerge(rest) {
    const name = rest[0];
    const src = (GIT.branches[name] !== undefined) ? GIT.branches[name] : (GIT.remoteBranches[name] !== undefined ? GIT.remoteBranches[name] : (GIT.commits[name] ? name : undefined));
    if (src === undefined) return { err: true, out: [`merge: ${name} - not something we can merge`] };
    const curBranch = gitCurrentBranchName();
    if (!curBranch) return { err: true, out: [`fatal: You are not currently on a branch.`] };
    const tgt = gitCurrentCommit();
    if (!src) return { ok: true, out: [`Already up to date.`] };
    if (gitIsAncestor(src, tgt)) return { ok: true, out: [`Already up to date.`] };
    if (!tgt || gitIsAncestor(tgt, src)) {
      GIT.branches[curBranch] = src;
      return { ok: true, out: [`Updating ${tgt || '0000000'}..${src}`, `Fast-forward`] };
    }
    const id = gitCreateCommit(`Merge branch '${name}' into ${curBranch}`, [tgt, src]);
    GIT.branches[curBranch] = id;
    return { ok: true, out: [`Merge made by the 'recursive' strategy.`, ` 1 file changed, 1 insertion(+)`] };
  }
  function gitCmdRebase(rest) {
    const name = rest[0];
    const targetId = GIT.branches[name];
    if (targetId === undefined) return { err: true, out: [`fatal: invalid upstream '${name}'`] };
    const curBranch = gitCurrentBranchName();
    if (!curBranch) return { err: true, out: [`fatal: You are not currently on a branch.`] };
    const curId = gitCurrentCommit();
    if (!curId || gitIsAncestor(curId, targetId)) { GIT.branches[curBranch] = targetId; return { ok: true, out: [`Current branch ${curBranch} is up to date.`] }; }
    let chain = []; let id = curId;
    while (id && !gitIsAncestor(id, targetId)) { chain.push(GIT.commits[id]); id = GIT.commits[id].parents[0] || null; }
    chain.reverse();
    let base = targetId; const outLines = [];
    chain.forEach(c => { const newId = gitCreateCommit(c.message, base ? [base] : []); outLines.push(`Applying: ${c.message}`); base = newId; });
    GIT.branches[curBranch] = base;
    outLines.push(`Successfully rebased and updated refs/heads/${curBranch}.`);
    return { ok: true, out: outLines };
  }
  function gitCmdReset(rest) {
    let mode = 'mixed', ref;
    rest.forEach(t => { if (t === '--soft') mode = 'soft'; else if (t === '--mixed') mode = 'mixed'; else if (t === '--hard') mode = 'hard'; else ref = t; });
    const target = gitResolveRef(ref || 'HEAD');
    if (!target) return { err: true, out: [`fatal: ambiguous argument '${ref}': unknown revision`] };
    const branch = gitCurrentBranchName();
    if (!branch) return { err: true, out: [`fatal: You are not currently on a branch.`] };
    GIT.branches[branch] = target;
    if (mode === 'soft') GIT.staged = true;
    else if (mode === 'mixed') { GIT.staged = false; GIT.dirty = true; }
    else { GIT.staged = false; GIT.dirty = false; }
    const msg = GIT.commits[target] ? GIT.commits[target].message : '';
    return { ok: true, out: [`HEAD is now at ${target} ${msg}`] };
  }
  function gitCmdRevert(rest) {
    const target = gitResolveRef(rest[0]);
    if (!target || !GIT.commits[target]) return { err: true, out: [`fatal: bad revision '${rest[0]}'`] };
    const cur = gitCurrentCommit(); const orig = GIT.commits[target];
    const id = gitCreateCommit(`Revert "${orig.message}"`, cur ? [cur] : []);
    const branch = gitCurrentBranchName(); if (branch) GIT.branches[branch] = id;
    return { ok: true, out: [`[${branch} ${id}] Revert "${orig.message}"`, ` 1 file changed, 1 deletion(-)`] };
  }
  function gitCmdCherryPick(rest) {
    const target = gitResolveRef(rest[0]);
    if (!target || !GIT.commits[target]) return { err: true, out: [`fatal: bad revision '${rest[0]}'`] };
    const cur = gitCurrentCommit(); const orig = GIT.commits[target];
    const id = gitCreateCommit(orig.message, cur ? [cur] : []);
    const branch = gitCurrentBranchName(); if (branch) GIT.branches[branch] = id;
    return { ok: true, out: [`[${branch} ${id}] ${orig.message}`, ` 1 file changed, 1 insertion(+)`] };
  }
  function gitCmdTag(rest) {
    if (rest.length === 0) { const names = Object.keys(GIT.tags); return { ok: true, out: names.length ? names : [`(no tags yet)`] }; }
    const name = rest[0]; const target = gitCurrentCommit();
    if (!target) return { err: true, out: [`fatal: Failed to resolve 'HEAD' as a valid ref.`] };
    GIT.tags[name] = target; return { ok: true, out: [] };
  }
  function gitCmdStash(rest) {
    const branch = gitCurrentBranchName() || 'detached';
    if (rest[0] === 'pop') {
      if (!GIT.stash.length) return { err: true, out: [`No stash entries found.`] };
      GIT.stash.pop(); GIT.dirty = true;
      return { ok: true, out: [`Dropped stash@{0}`] };
    }
    if (!GIT.dirty && !GIT.staged) return { ok: true, out: [`No local changes to save`] };
    GIT.stash.push({ branch }); GIT.dirty = false; GIT.staged = false;
    return { ok: true, out: [`Saved working directory and index state WIP on ${branch}`] };
  }
  function gitCmdRemote(rest) {
    if (rest[0] === 'add') { GIT.remoteAdded = true; return { ok: true, out: [] }; }
    return { ok: true, out: GIT.remoteAdded ? ['origin'] : [`(no remotes — try git remote add origin <url>)`] };
  }
  function gitCmdPush(rest) {
    if (!GIT.remoteAdded) return { err: true, out: [`fatal: No configured push destination.`, `fatal: add a remote first: git remote add origin <url>`] };
    const branch = gitCurrentBranchName();
    if (!branch) return { err: true, out: [`fatal: You are not currently on a branch.`] };
    const cur = GIT.branches[branch];
    if (!cur) return { err: true, out: [`error: src refspec ${branch} does not match any commits`] };
    const isNew = GIT.remoteBranches['origin/' + branch] === undefined;
    GIT.remoteBranches['origin/' + branch] = cur;
    return { ok: true, out: [`To origin`, isNew ? ` * [new branch]      ${branch} -> ${branch}` : ` ${cur.slice(0,4)}..${cur} ${branch} -> ${branch}`] };
  }
  function gitCmdFetch() {
    if (!GIT.remoteAdded) return { err: true, out: [`fatal: No remote repository specified.`] };
    return { ok: true, out: [`From origin`, ` (up to date)`] };
  }
  function gitCmdPull() {
    if (!GIT.remoteAdded) return { err: true, out: [`fatal: No remote repository specified.`] };
    const branch = gitCurrentBranchName();
    const remoteRef = 'origin/' + branch;
    if (GIT.remoteBranches[remoteRef] === undefined) return { ok: true, out: [`Already up to date.`] };
    return gitCmdMerge([remoteRef]);
  }
  function gitCmdLogHistory() {
    let id = gitCurrentCommit(); const lines = []; const seen = new Set();
    while (id && !seen.has(id)) { seen.add(id); const c = GIT.commits[id]; lines.push(`* ${id} ${c.message}`); id = c.parents[0] || null; }
    if (!lines.length) return { err: true, out: [`fatal: your current branch does not have any commits yet`] };
    return { ok: true, out: lines };
  }
  function gitCmdDiff() {
    if (!GIT.dirty && !GIT.staged) return { ok: true, out: [`(no changes to show)`] };
    return { ok: true, out: [`diff --git a/app.js b/app.js`, `--- a/app.js`, `+++ b/app.js`, `@@ -12,6 +12,7 @@`, `+  console.log("ready");`] };
  }

  function gitTokenize(str) {
    const re = /"([^"]*)"|'([^']*)'|(\S+)/g; const out = []; let m;
    while ((m = re.exec(str))) out.push(m[1] ?? m[2] ?? m[3]);
    return out;
  }
  function gitEsc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  const GIT_CMD_INFO = {
    init:{syntax:`git init`, does:`Creates a brand-new, empty Git repository in the current folder.`, where:`The very first command in any new project — everything else needs a repo to exist first.`},
    status:{syntax:`git status`, does:`Shows the current branch, and whether there are staged or unstaged changes.`, where:`The command you run before almost every other git command, to see where things stand.`},
    add:{syntax:`git add &lt;file&gt;`, does:`Stages changes, marking them ready to be included in the next commit.`, where:`Every commit is preceded by staging exactly the changes you want in it.`},
    commit:{syntax:`git commit -m "&lt;message&gt;"`, does:`Creates a new permanent snapshot from whatever is currently staged.`, where:`The core unit of Git history — every meaningful change becomes one of these.`},
    branch:{syntax:`git branch &lt;name&gt;`, does:`Creates a new branch pointer at the current commit, without switching to it.`, where:`Starting new work in isolation — one new branch per feature or fix.`},
    checkout:{syntax:`git checkout &lt;branch&gt;   /   git checkout -b &lt;branch&gt;`, does:`Moves HEAD to point at a different branch — -b also creates that branch first.`, where:`Switching which branch you're actively working on.`},
    merge:{syntax:`git merge &lt;branch&gt;`, does:`Combines another branch's commits into the current one — fast-forwards if possible, otherwise creates a merge commit.`, where:`Bringing a finished feature branch's work back into main.`},
    rebase:{syntax:`git rebase &lt;branch&gt;`, does:`Replays the current branch's commits on top of another branch's tip, giving them new commit IDs.`, where:`Keeping a feature branch's history linear and current with main before merging.`},
    reset:{syntax:`git reset --soft|--mixed|--hard &lt;ref&gt;`, does:`Moves the current branch pointer to a different commit — soft keeps changes staged, mixed unstages, hard discards them.`, where:`Undoing local commits that haven't been shared with anyone else yet.`},
    revert:{syntax:`git revert &lt;commit&gt;`, does:`Creates a brand-new commit that undoes a previous one, without rewriting any history.`, where:`Undoing a commit that's already been pushed or shared — safe, since nothing is rewritten.`},
    cherryPick:{syntax:`git cherry-pick &lt;commit&gt;`, does:`Copies one specific commit from anywhere in the repo onto the current branch as a new commit.`, where:`Grabbing a single fix from one branch without merging its entire history.`},
    tag:{syntax:`git tag &lt;name&gt;`, does:`Marks the current commit permanently with a fixed name — unlike a branch, a tag never moves.`, where:`Marking release points, like v1.0.0, that need to stay pinned to one exact commit forever.`},
    stash:{syntax:`git stash   /   git stash pop`, does:`Temporarily shelves uncommitted changes so the working directory is clean, and restores them later.`, where:`Needing to switch branches quickly without committing half-finished work.`},
    remote:{syntax:`git remote add origin &lt;url&gt;`, does:`Registers a remote repository's address under a short name, usually "origin".`, where:`Connecting a local repo to GitHub/GitLab so push and pull have somewhere to talk to.`},
    push:{syntax:`git push origin &lt;branch&gt;`, does:`Uploads the current branch's new commits to the remote repository.`, where:`Sharing your local commits with everyone else on the team.`},
    fetch:{syntax:`git fetch`, does:`Downloads the remote's latest commits and branches, without touching your local branches at all.`, where:`Checking what's changed remotely before deciding whether to merge it in.`},
    pull:{syntax:`git pull`, does:`Runs fetch, then immediately merges the remote's version of the current branch into yours.`, where:`Getting the latest teammate changes into your local branch in one step.`},
    log:{syntax:`git log --oneline`, does:`Lists the commit history reachable from the current HEAD, newest first.`, where:`Reviewing what's actually been committed on this branch so far.`},
    diff:{syntax:`git diff`, does:`Shows the exact line-by-line changes that haven't been staged yet.`, where:`Double-checking exactly what you're about to stage, before running git add.`}
  };

  function gitUpdateInfoPanel(info) {
    if (!info) return;
    document.getElementById('gitSyntax').innerHTML = info.syntax;
    document.getElementById('gitDoes').innerHTML = info.does;
    document.getElementById('gitWhere').innerHTML = info.where;
  }

  function gitExecute(raw) {
    const cmdText = (raw || '').trim();
    if (!cmdText) return;
    const tokens = gitTokenize(cmdText);
    let result, info = null;
    if (tokens[0] !== 'git') {
      result = { err: true, out: [`${tokens[0] || ''}: command not found`] };
    } else {
      const sub = tokens[1]; const rest = tokens.slice(2);
      switch (sub) {
        case 'init': result = { ok: true, out: [gitInit()] }; info = 'init'; break;
        case 'status': result = gitCmdStatus(); info = 'status'; break;
        case 'add': result = gitCmdAdd(); info = 'add'; break;
        case 'commit': result = gitCmdCommit(rest); info = 'commit'; break;
        case 'branch': result = gitCmdBranch(rest); info = 'branch'; break;
        case 'checkout': result = gitCmdCheckout(rest); info = 'checkout'; break;
        case 'switch': result = gitCmdSwitch(rest); info = 'checkout'; break;
        case 'merge': result = gitCmdMerge(rest); info = 'merge'; break;
        case 'rebase': result = gitCmdRebase(rest); info = 'rebase'; break;
        case 'reset': result = gitCmdReset(rest); info = 'reset'; break;
        case 'revert': result = gitCmdRevert(rest); info = 'revert'; break;
        case 'cherry-pick': result = gitCmdCherryPick(rest); info = 'cherryPick'; break;
        case 'tag': result = gitCmdTag(rest); info = 'tag'; break;
        case 'stash': result = gitCmdStash(rest); info = 'stash'; break;
        case 'remote': result = gitCmdRemote(rest); info = 'remote'; break;
        case 'push': result = gitCmdPush(rest); info = 'push'; break;
        case 'fetch': result = gitCmdFetch(); info = 'fetch'; break;
        case 'pull': result = gitCmdPull(); info = 'pull'; break;
        case 'log': result = gitCmdLogHistory(); info = 'log'; break;
        case 'diff': result = gitCmdDiff(); info = 'diff'; break;
        default: result = { err: true, out: [`git: '${sub}' is not a command this simulator supports. Try one of the buttons below.`] };
      }
    }
    gitLog('cmd', cmdText);
    (result.out || []).forEach(line => gitLog(result.err ? 'err' : 'out', line));
    if (info) gitUpdateInfoPanel(GIT_CMD_INFO[info]);
    gitRenderAll();
  }

  function gitBuildCommandText(kind) {
    const branches = Object.keys(GIT.branches);
    const cur = gitCurrentBranchName();
    const other = branches.find(b => b !== cur);
    switch (kind) {
      case 'init': return 'git init';
      case 'status': return 'git status';
      case 'add': return 'git add .';
      case 'commit': return `git commit -m "Update ${GIT.commitCounter}"`;
      case 'branch': { let n = 1; while (GIT.branches['feature-' + n]) n++; return `git branch feature-${n}`; }
      case 'branchList': return 'git branch';
      case 'branchDelete': return other ? `git branch -d ${other}` : 'git branch -d feature-1';
      case 'checkout': return other ? `git checkout ${other}` : 'git checkout main';
      case 'checkoutB': { let n = 1; while (GIT.branches['feature-' + n]) n++; return `git checkout -b feature-${n}`; }
      case 'switch': return other ? `git switch ${other}` : 'git switch main';
      case 'merge': return other ? `git merge ${other}` : 'git merge feature-1';
      case 'rebase': return other ? `git rebase ${other}` : 'git rebase main';
      case 'resetSoft': return 'git reset --soft HEAD~1';
      case 'resetMixed': return 'git reset --mixed HEAD~1';
      case 'resetHard': return 'git reset --hard HEAD~1';
      case 'revert': return `git revert ${gitCurrentCommit() || 'c0'}`;
      case 'cherryPick': return other && GIT.branches[other] ? `git cherry-pick ${GIT.branches[other]}` : 'git cherry-pick c1';
      case 'tag': return 'git tag v1.0.0';
      case 'stash': return 'git stash';
      case 'stashPop': return 'git stash pop';
      case 'remoteAdd': return 'git remote add origin https://github.com/you/repo.git';
      case 'push': return 'git push origin ' + (cur || 'main');
      case 'fetch': return 'git fetch';
      case 'pull': return 'git pull';
      case 'log': return 'git log --oneline';
      case 'diff': return 'git diff';
      default: return '';
    }
  }
  const GIT_INSTANT_KINDS = new Set(['status', 'branchList', 'log', 'diff', 'fetch']);
  function gitPillClick(kind) {
    const text = gitBuildCommandText(kind);
    const input = document.getElementById('gitCmdInput');
    if (GIT_INSTANT_KINDS.has(kind)) { gitExecute(text); }
    else {
      input.value = text; input.focus();
      if (kind === 'commit') { const s = text.indexOf('"') + 1, e = text.lastIndexOf('"'); input.setSelectionRange(s, e); }
      else input.setSelectionRange(text.length, text.length);
    }
  }

  function gitRunScenario(steps, btn) {
    if (btn) { btn.disabled = true; btn.dataset.origText = btn.textContent; btn.textContent = '⏳ Running...'; }
    let i = 0;
    function step() {
      if (i >= steps.length) { if (btn) { btn.disabled = false; btn.textContent = '↻ Run Again'; } return; }
      gitExecute(steps[i]); i++;
      setTimeout(step, 850);
    }
    step();
  }

  function gitResetRepo() {
    gitDom = { commits: {}, edges: {}, tags: {} };
    const el = document.getElementById('gitEdgesLayer'); if (el) el.innerHTML = '';
    const cl = document.getElementById('gitCommitsLayer'); if (cl) cl.innerHTML = '';
    const tl = document.getElementById('gitTagsLayer'); if (tl) tl.innerHTML = '';
    gitInit();
    GIT.log = [{ type: 'out', text: 'Repository reset. Click any command below, or type your own.' }];
    gitRenderAll();
  }

  /* ---------- rendering ---------- */
  function gitLaneColor(lane) { return GIT_LANE_COLORS[lane % GIT_LANE_COLORS.length]; }
  function gitReachableSet() {
    const roots = [...Object.values(GIT.branches), ...Object.values(GIT.remoteBranches), ...Object.values(GIT.tags)].filter(Boolean);
    if (GIT.head.type === 'detached' && GIT.head.id) roots.push(GIT.head.id);
    const seen = new Set(); const stack = roots.slice();
    while (stack.length) {
      const id = stack.pop(); if (seen.has(id)) continue; seen.add(id);
      const c = GIT.commits[id]; if (c) c.parents.forEach(p => stack.push(p));
    }
    return seen;
  }
  function gitLayout() {
    const commits = Object.values(GIT.commits).sort((a, b) => a.order - b.order);
    const colW = 150, rowH = 96, marginL = 60, marginT = 56;
    const laneMax = Math.max(0, ...commits.map(c => c.lane), ...Object.values(GIT.laneOf));
    commits.forEach((c, i) => { c.x = marginL + i * colW; c.y = marginT + c.lane * rowH; });
    // reserve extra width on the right for the widest stack of tags on the very last commit
    let maxTagStackWidth = 0;
    commits.forEach(c => {
      const list = gitTagListForCommit(c.id);
      list.forEach(t => {
        const label = t.kind === 'branch' ? (t.name + (t.current ? ' *' : '')) : (t.kind === 'tag' ? ('🏷 ' + t.name) : t.name);
        const w = Math.max(56, label.length * 7.4 + 26);
        if (w > maxTagStackWidth) maxTagStackWidth = w;
      });
    });
    const width = Math.max(600, marginL * 2 + Math.max(0, commits.length - 1) * colW + 60 + maxTagStackWidth);
    const height = Math.max(190, marginT * 2 + laneMax * rowH + 60);
    return { commits, width, height };
  }
  function gitTagListForCommit(commitId) {
    const list = [];
    Object.entries(GIT.branches).forEach(([name, id]) => { if (id === commitId) list.push({ key: 'b:' + name, kind: 'branch', name, current: name === gitCurrentBranchName() }); });
    Object.entries(GIT.remoteBranches).forEach(([name, id]) => { if (id === commitId) list.push({ key: 'r:' + name, kind: 'remote', name }); });
    Object.entries(GIT.tags).forEach(([name, id]) => { if (id === commitId) list.push({ key: 't:' + name, kind: 'tag', name }); });
    return list;
  }
  function gitRenderGraph() {
    const svg = document.getElementById('gitGraphSvg');
    if (!svg) return;
    const { commits, width, height } = gitLayout();
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.setAttribute('width', width); svg.setAttribute('height', height);
    const hint = document.getElementById('gitEmptyHint');
    if (hint) { hint.style.display = commits.length ? 'none' : ''; hint.setAttribute('x', width / 2); hint.setAttribute('y', height / 2); }
    const reachable = gitReachableSet();
    const edgesLayer = document.getElementById('gitEdgesLayer');
    const commitsLayer = document.getElementById('gitCommitsLayer');
    const tagsLayer = document.getElementById('gitTagsLayer');

    const liveEdgeKeys = new Set();
    commits.forEach(c => {
      c.parents.forEach(p => {
        const pc = GIT.commits[p]; if (!pc) return;
        const key = c.id + '>' + p; liveEdgeKeys.add(key);
        let el = gitDom.edges[key];
        if (!el) { el = document.createElementNS('http://www.w3.org/2000/svg', 'path'); el.setAttribute('class', 'git-edge'); edgesLayer.appendChild(el); gitDom.edges[key] = el; }
        const x1 = pc.x, y1 = pc.y, x2 = c.x, y2 = c.y;
        const d = (y1 === y2) ? `M ${x1} ${y1} L ${x2} ${y2}` : (() => { const mx = (x1 + x2) / 2; return `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`; })();
        el.setAttribute('d', d); el.setAttribute('stroke', gitLaneColor(c.lane));
        el.classList.toggle('dim', !reachable.has(c.id) || !reachable.has(p));
      });
    });
    Object.keys(gitDom.edges).forEach(key => { if (!liveEdgeKeys.has(key)) { gitDom.edges[key].remove(); delete gitDom.edges[key]; } });

    const liveCommitIds = new Set();
    commits.forEach(c => {
      liveCommitIds.add(c.id);
      let g = gitDom.commits[c.id];
      if (!g) {
        g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('class', 'git-commit git-enter');
        g.innerHTML = `<circle r="17"></circle><text class="git-commit-id" text-anchor="middle" dy="4"></text><title></title>`;
        commitsLayer.appendChild(g); gitDom.commits[c.id] = g;
        requestAnimationFrame(() => g.classList.remove('git-enter'));
      }
      g.setAttribute('transform', `translate(${c.x},${c.y})`);
      g.querySelector('circle').setAttribute('fill', gitLaneColor(c.lane));
      g.querySelector('.git-commit-id').textContent = c.id;
      g.querySelector('title').textContent = c.message;
      g.classList.toggle('unreachable', !reachable.has(c.id));
    });
    Object.keys(gitDom.commits).forEach(id => { if (!liveCommitIds.has(id)) { gitDom.commits[id].remove(); delete gitDom.commits[id]; } });

    const liveTagKeys = new Set();
    commits.forEach(c => {
      const list = gitTagListForCommit(c.id);
      list.forEach((t, idx) => {
        liveTagKeys.add(t.key);
        let g = gitDom.tags[t.key];
        if (!g) {
          g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
          g.setAttribute('class', 'git-branch-tag git-enter');
          g.innerHTML = `<line class="git-tag-line"></line><rect rx="10" ry="10"></rect><text text-anchor="middle" dy="4"></text>`;
          tagsLayer.appendChild(g); gitDom.tags[t.key] = g;
          requestAnimationFrame(() => g.classList.remove('git-enter'));
        }
        const offsetY = (idx - (list.length - 1) / 2) * 36;
        const boxLeft = c.x + 30, tagY = c.y + offsetY;
        const label = t.kind === 'branch' ? (t.name + (t.current ? ' *' : '')) : (t.kind === 'tag' ? ('🏷 ' + t.name) : t.name);
        const textEl = g.querySelector('text'); textEl.textContent = label;
        const w = Math.max(56, label.length * 7.4 + 26);
        const tagX = boxLeft + w / 2;
        const rect = g.querySelector('rect');
        rect.setAttribute('x', boxLeft); rect.setAttribute('y', tagY - 14);
        rect.setAttribute('width', w); rect.setAttribute('height', 28);
        textEl.setAttribute('x', tagX); textEl.setAttribute('y', tagY);
        const line = g.querySelector('.git-tag-line');
        line.setAttribute('x1', boxLeft); line.setAttribute('y1', tagY);
        line.setAttribute('x2', c.x + 19); line.setAttribute('y2', c.y);
        const color = t.kind === 'remote' ? '#64748b' : gitLaneColor(c.lane);
        rect.setAttribute('stroke', color); line.setAttribute('stroke', color); textEl.setAttribute('fill', color);
        g.classList.toggle('current', !!t.current);
        g.classList.toggle('remote', t.kind === 'remote');
        g.classList.toggle('tagbadge', t.kind === 'tag');
      });
    });
    Object.keys(gitDom.tags).forEach(key => { if (!liveTagKeys.has(key)) { gitDom.tags[key].remove(); delete gitDom.tags[key]; } });

    const wrap = document.getElementById('gitGraphScroll');
    if (wrap) wrap.scrollTo({ left: width, behavior: 'smooth' });
  }
  function gitRenderHeadLine() {
    const el = document.getElementById('gitHeadLine'); if (!el) return;
    if (GIT.head.type === 'branch') el.innerHTML = `HEAD → <strong style="color:${gitLaneColor(GIT.laneOf[GIT.head.name] ?? 0)}">${GIT.head.name}</strong>`;
    else el.innerHTML = `HEAD → <strong style="color:#f43f5e">${GIT.head.id} (detached)</strong>`;
  }
  function gitRenderTerminal() {
    const el = document.getElementById('gitTermScrollback'); if (!el) return;
    el.innerHTML = GIT.log.slice(-140).map(l => {
      if (l.type === 'cmd') return `<div class="git-term-line-cmd">$ ${gitEsc(l.text)}</div>`;
      if (l.type === 'err') return `<div class="git-term-line-err">${gitEsc(l.text)}</div>`;
      return `<div class="git-term-line-out">${gitEsc(l.text)}</div>`;
    }).join('');
    el.scrollTop = el.scrollHeight;
  }
  function gitRenderAll() { gitRenderGraph(); gitRenderHeadLine(); gitRenderTerminal(); }

  function gitSetup() {
    gitInit();
    GIT.log = [{ type: 'out', text: 'Welcome! Click any command below, or type your own git command and press ▶ Run.' }];
    gitRenderAll();
  }
  gitSetup();

  /* ============ GIT FOR DEVOPS QUIZ ============ */
  const GITDEVOPS_QUIZ_JOKES = [
    `A commit's favorite pickup line: "Hey, what's your parent hash?"`,
    `git rebase: because sometimes history needs a rewrite, and only sometimes should you actually do that.`,
    `Two branches meet at a merge commit. It's basically Git's version of a family reunion.`,
    `"It's not lost, it's just unreachable" is either about a commit or about your motivation on a Friday.`,
    `HEAD, detached from a branch, wanders the commit graph alone — until someone runs git checkout main.`
  ];

  const GITDEVOPS_QUIZ_QUESTIONS = [
    { q:`What is a Git commit, fundamentally?`, options:[`A permanent snapshot of the project at that point, with a pointer back to its parent`,`A temporary marker that disappears the moment you switch to another branch`,`A list of every file that has ever existed anywhere in the project`,`A live copy of whatever the remote repository currently contains`], correct:0, why:`Every commit stores a snapshot plus a link to whatever commit came before it — that chain of links IS the project's history.` },
    { q:`What does a Git branch actually point to?`, options:[`A single specific commit — the current tip of that line of work`,`A separate, fully independent copy of the entire repository`,`A folder on disk that only that branch's files live inside`,`Nothing by itself — it's purely a label used in log output`], correct:0, why:`A branch is just a movable pointer to one commit — that's the entire mechanism, nothing more.` },
    { q:`What does HEAD normally point to?`, options:[`The branch you currently have checked out, which itself points to a commit`,`The very first commit that was ever made in the repository`,`Whichever branch was most recently created, active or not`,`The remote repository's own default branch`], correct:0, why:`HEAD usually points at a branch name, and that branch points at a commit — one extra layer of indirection.` },
    { q:`What does "detached HEAD" mean?`, options:[`HEAD points directly at a specific commit instead of at a branch`,`HEAD has been deleted and now needs to be manually recreated`,`The repository has lost its connection to the remote entirely`,`No branches currently exist anywhere in the repository`], correct:0, why:`Without a branch in between, any new commit you make there has nothing tracking it once you move away.` },
    { q:`What's the purpose of the staging area (what "git add" affects)?`, options:[`Lets you pick exactly which changes go into the next commit`,`Immediately uploads those changes to the remote repository`,`Permanently saves those changes into the project's history`,`Deletes the old version of the file from the working directory`], correct:0, why:`Staging exists so a commit can contain exactly the changes you intend, not just everything you've touched.` },
    { q:`What's the actual difference between "staged" and "committed"?`, options:[`Staged is marked ready but not yet permanent; committed is a real, saved snapshot`,`They mean exactly the same thing, just at two different points in time`,`Staged changes are already visible to teammates; committed changes are not`,`Committed changes can be edited freely; staged changes can never change`], correct:0, why:`git add stages; git commit is what actually turns staged changes into permanent history.` },
    { q:`Under what condition does "git merge" perform a fast-forward instead of creating a merge commit?`, options:[`When the current branch hasn't moved since the other branch diverged from it`,`When both branches have made completely unrelated, conflicting changes`,`Fast-forward only ever happens the very first time a repository is merged`,`When the branch being merged in has fewer total commits than the current one`],correct:0, why:`If the current branch is a direct ancestor of the other, git can just slide the pointer forward — no combining needed.` },
    { q:`When does "git merge" create an actual merge commit?`, options:[`When both branches have new commits the other doesn't have`,`Every single time git merge is run, with no exceptions at all`,`Only when the branch being merged in has a shorter name`,`Only when both branches were created at the exact same time`], correct:0, why:`With real divergence, there's no single straight line to fast-forward along — a merge commit is needed to join them.` },
    { q:`How many parent commits does a merge commit have?`, options:[`Two — one from each branch being combined`,`Always exactly one, same as every other kind of commit`,`Zero — merge commits don't record any parent at all`,`As many as there are total commits in the whole repository`], correct:0, why:`That second parent pointer is literally what makes a commit a merge commit rather than a regular one.` },
    { q:`What's the key structural difference between merge and rebase?`, options:[`Merge preserves both histories with a joining commit; rebase replays one onto the other in a straight line`,`They produce identical results — the choice is purely a matter of typing preference`,`Rebase always creates a merge commit; merge never does`,`Merge can only be used once per branch; rebase can be used repeatedly`], correct:0, why:`Merge keeps the branching visible in history; rebase erases the branching and makes it look linear.` },
    { q:`Why do rebased commits end up with brand-new commit IDs?`, options:[`Rebase doesn't move the original commits — it creates fresh copies on top of the new base`,`Git assigns a random ID to every commit regardless of what operation touched it`,`The IDs only change if the commit message itself was also edited`,`New IDs are only assigned when a rebase specifically fails partway through`], correct:0, why:`A commit's ID is derived from its content and parent — change the parent, and you necessarily get a new commit.` },
    { q:`Why is rebasing a branch that others have already pulled generally considered dangerous?`, options:[`It rewrites commit history, so everyone else's copy suddenly no longer matches`,`Rebase permanently deletes the remote repository once it's run`,`It's not actually dangerous at all — this is a common misconception`,`Rebase only works on branches that have never been pushed anywhere`], correct:0, why:`Once history is shared, rewriting it locally creates a mismatch everyone else now has to untangle.` },
    { q:`What does "git reset --soft <ref>" do?`, options:[`Moves the branch pointer back, but keeps everything staged and ready to recommit`,`Moves the branch pointer back and permanently deletes all the undone work`,`Moves the branch pointer back and unstages everything, leaving it as unstaged edits`,`Doesn't move anything — it only previews what a reset would do`], correct:0, why:`Soft is the gentlest option — the changes from the undone commits sit staged, ready to be recommitted differently.` },
    { q:`What does "git reset --mixed <ref>" do (the default mode)?`, options:[`Moves the branch pointer back and unstages the changes, leaving them as unstaged edits`,`Moves the branch pointer back but keeps everything fully staged`,`Moves the branch pointer back and permanently discards every change`,`Refuses to run unless --soft or --hard is explicitly specified instead`], correct:0, why:`Mixed sits in the middle — the work isn't lost, but it's no longer staged for commit.` },
    { q:`What does "git reset --hard <ref>" do?`, options:[`Moves the branch pointer back and completely discards the undone changes`,`Moves the branch pointer back but keeps every change safely staged`,`Moves the branch pointer back and leaves the changes as unstaged edits`,`Only works on branches that have already been pushed to a remote`], correct:0, why:`Hard is the dangerous one — the working directory is forced to match the target commit exactly, discarding anything since.` },
    { q:`Why should "git reset" generally only be used on commits that haven't been shared yet?`, options:[`It moves the branch pointer backward, which orphans commits others may already have`,`Reset physically deletes files from every collaborator's machine remotely`,`Reset is actually perfectly safe to use on shared history at any time`,`Reset only works locally and has no way to affect a shared branch at all`], correct:0, why:`Once someone else has pulled those commits, resetting past them locally creates the same shared-history mismatch as rebasing.` },
    { q:`What's the key safety difference between "git revert" and "git reset"?`, options:[`Revert adds a new commit undoing changes; reset rewrites history by moving the pointer back`,`They're functionally identical, just with two different command names`,`Reset is always safer than revert on any branch, shared or not`,`Revert can only undo the single most recent commit, nothing further back`], correct:0, why:`Revert's "add, don't rewrite" approach is exactly why it's safe on branches other people already have.` },
    { q:`After "git revert HEAD", what happens to the original bad commit?`, options:[`It stays right there in history — a new commit cancels its changes instead`,`It's permanently deleted from the repository's history`,`It gets automatically rewritten to no longer contain the bad change`,`It's moved to a separate, hidden branch outside the normal history`], correct:0, why:`Revert never touches the past — it only adds a new commit that reverses the effect going forward.` },
    { q:`What does "git cherry-pick <commit>" do?`, options:[`Copies one specific commit from elsewhere onto the current branch as a new commit`,`Merges an entire branch's full history into the current branch at once`,`Deletes a specific commit from wherever it currently exists`,`Renames a specific commit's message without changing anything else about it`], correct:0, why:`Cherry-pick is deliberately narrow — just that one commit's changes, not everything else on its branch.` },
    { q:`How does cherry-pick differ from merge in what it brings over?`, options:[`Cherry-pick brings exactly one commit; merge brings a branch's entire unique history`,`They bring over exactly the same commits in every situation`,`Cherry-pick brings an entire branch; merge only brings a single commit`,`Merge only works on tags, while cherry-pick only works on branches`], correct:0, why:`This is the whole reason cherry-pick exists — for when you want one thing, not the whole branch.` },
    { q:`What's the key structural difference between a tag and a branch?`, options:[`A tag is a fixed pointer that never moves; a branch's pointer moves with every new commit`,`A tag can hold code while a branch can only hold a name, nothing else`,`Branches are permanent and tags are automatically deleted after a week`,`There's no real difference — tag is simply an older name for the same feature`], correct:0, why:`Once created, a tag stays pinned to that one commit forever — exactly why it's used for marking releases.` },
    { q:`What does "git stash" do to uncommitted changes?`, options:[`Shelves them aside temporarily, leaving the working directory clean`,`Permanently commits them under a special, hidden branch name`,`Immediately discards them with no way to get them back`,`Uploads them to the remote repository as a draft commit`], correct:0, why:`Stash is meant to be temporary — the changes are saved aside, not committed and not lost.` },
    { q:`What does "git stash pop" do?`, options:[`Restores the most recently stashed changes back into the working directory`,`Permanently deletes the most recent stash without restoring anything`,`Creates a brand-new branch out of the most recent stash`,`Pushes the most recent stash directly to the remote repository`], correct:0, why:`Pop reapplies the stashed changes and removes that entry from the stash list.` },
    { q:`Does stashing changes create a new entry in the branch's commit history?`, options:[`No — stashed changes exist separately and don't show up in the commit graph at all`,`Yes — every stash automatically becomes a new commit on the current branch`,`Yes, but only if the stash is later popped back out`,`Only if the "--commit" flag is explicitly passed to git stash`], correct:0, why:`Stash intentionally sits outside normal history — that separation is exactly what makes it "temporary."` },
    { q:`What does "git status" show you?`, options:[`The current branch, plus whether there are staged or unstaged changes`,`The full commit history of the current branch, from newest to oldest`,`A line-by-line diff of every uncommitted change in the project`,`A list of every branch that currently exists in the repository`], correct:0, why:`Status is a snapshot of where things stand right now — not history, not line-level detail.` },
    { q:`By default, what does "git diff" show?`, options:[`Line-by-line changes that exist but haven't been staged yet`,`Every commit that's ever been made across the whole project`,`A list of which branches differ from the current one`,`Changes that have already been staged, ready for the next commit`], correct:0, why:`Plain "git diff" is specifically about the gap between your working files and what's staged — use --staged for the other view.` },
    { q:`What does "git log --oneline" show?`, options:[`The commit history reachable from the current HEAD, newest first, one line per commit`,`Only the single most recent commit, and nothing before it`,`A live, continuously updating stream of new commits as they happen`,`Every commit across every branch in the repository, merged into one list`], correct:0, why:`It walks backward from HEAD through parent links, condensing each commit to a single line.` },
    { q:`Why does "git branch -d <name>" sometimes refuse to delete a branch?`, options:[`It won't delete a branch whose commits aren't fully merged elsewhere yet, to prevent losing work`,`The -d flag only works on branches that have never had any commits at all`,`It always refuses, and -D must be used for every single branch deletion`,`It refuses because branch names shorter than five characters aren't deletable`], correct:0, why:`-d is the safe delete — it checks first so you don't accidentally lose commits that exist nowhere else.` },
    { q:`Why can't you delete the branch you currently have checked out?`, options:[`HEAD needs to point somewhere, and deleting the branch it's on would leave it pointing nowhere`,`Git technically has no way to detect which branch is currently checked out`,`This restriction was removed entirely in newer versions of Git`,`It's only blocked when the branch has zero commits on it so far`], correct:0, why:`You have to switch to a different branch first, so HEAD always has somewhere valid to point.` },
    { q:`What does a remote-tracking branch like "origin/main" actually represent?`, options:[`Where the remote's main branch was, as of your last fetch or push`,`Your own local main branch, just displayed under a different name`,`A branch that only exists on the remote server, never referenced locally`,`A permanent snapshot taken automatically once a day`], correct:0, why:`It's a local bookmark for "here's what I last saw on the remote" — it only updates on fetch or push, not automatically.` },
    { q:`What does "git push" actually do?`, options:[`Uploads the current branch's new local commits to the remote repository`,`Downloads the remote's latest commits down onto your local machine`,`Permanently deletes the remote's copy of the current branch`,`Only updates the remote's branch label, without any commits included`], correct:0, why:`Push is the one-directional "send my new commits up" operation.` },
    { q:`What does "git fetch" do that "git pull" does not do by itself?`, options:[`Fetch only downloads the remote's data — it never merges it into your local branches`,`Fetch merges automatically; pull only downloads without merging`,`Fetch deletes local commits that don't exist on the remote`,`There's no real difference between fetch and pull at all`], correct:0, why:`Fetch is the safer, look-before-you-merge half of what pull does in one combined step.` },
    { q:`What is "git pull" actually equivalent to?`, options:[`git fetch, immediately followed by a merge of the remote's branch into yours`,`git push, immediately followed by a fetch from the remote`,`Only a fetch — pull never merges anything on its own`,`A complete re-clone of the entire remote repository`], correct:0, why:`Pull is a convenience wrapper — it does both steps automatically instead of you doing them separately.` },
    { q:`Why might a DevOps engineer prefer "git fetch" over "git pull" before merging in changes?`, options:[`It lets you review what changed remotely before deciding to merge it in`,`Fetch is measurably faster at actually applying changes than pull is`,`Pull is deprecated and no longer works in current versions of Git`,`Fetch automatically resolves any merge conflicts on your behalf`], correct:0, why:`Fetch-then-review-then-merge gives you a checkpoint that a blind pull skips entirely.` },
    { q:`What does "git checkout -b <name>" do in one step?`, options:[`Creates a new branch at the current commit and switches to it immediately`,`Deletes an existing branch and creates a brand-new one with the same name`,`Switches to an existing branch without creating anything new`,`Only creates the branch — it never actually switches HEAD to it`], correct:0, why:`-b is a shortcut combining "git branch <name>" and "git checkout <name>" into a single command.` },
    { q:`How does "git switch" relate to "git checkout"?`, options:[`It's a newer command covering the same branch-switching job, with clearer intent than checkout's many uses`,`They do completely unrelated things, and were never really meant to overlap at all`,`Switch can only ever move HEAD to a commit, never to a branch by its name`,`Checkout was fully and permanently removed from Git in favor of switch entirely`], correct:0, why:`checkout historically did too many different jobs at once — switch (and restore) split that into clearer, separate commands.` },
    { q:`After "git reset --hard" moves a branch backward, what actually happens to the commits left behind?`, options:[`They still exist in the repository, just unreachable from any branch, tag, or HEAD`,`They're immediately and permanently deleted from the repository`,`They automatically get merged into whichever branch is currently checked out`,`They're moved into a special "trash" branch that gets created automatically`], correct:0, why:`Git doesn't delete on reset — the data just isn't reachable from anywhere anymore until something garbage-collects it.` },
    { q:`What does it mean for a commit to be "unreachable" in a Git repository?`, options:[`No branch, tag, or HEAD currently points to it, directly or through any parent chain`,`The commit's data has been physically corrupted and can no longer be read`,`The commit was made on a computer that's no longer connected to the network`,`The commit's message field was left completely empty when it was created`], correct:0, why:`Reachability is purely about whether you can walk to that commit starting from some ref — nothing about the data itself.` },
    { q:`Scenario: main hasn't had any new commits since a feature branch was created from it. What kind of merge happens?`, options:[`A fast-forward — main's pointer simply slides forward to the feature branch's tip`,`A three-way merge, creating a brand-new merge commit with two parents`,`The merge fails outright, since main technically has no new work to combine`,`Git asks you to manually choose between fast-forward and merge commit`], correct:0, why:`With no divergence on main's side, there's a single straight line to just slide the pointer along.` },
    { q:`Scenario: both main and a feature branch gained new commits before merging. What does git do?`, options:[`Creates a merge commit with two parents, joining both lines of history`,`Automatically fast-forwards, silently dropping whichever branch has fewer commits`,`Refuses to merge until one of the two branches is manually deleted first`,`Picks whichever branch has the more recent commit and discards the other entirely`], correct:0, why:`Genuine divergence on both sides means there's no straight line — a real merge commit is required to reconcile them.` },
    { q:`Scenario: you need one specific fix from a teammate's branch, without pulling in their other unfinished work. What's the move?`, options:[`git cherry-pick that one commit onto your own branch`,`git merge their entire branch, then manually delete the unwanted parts`,`git rebase your branch onto theirs, taking on all of their history`,`git reset your branch to match theirs exactly`], correct:0, why:`Cherry-pick is built exactly for taking one commit without dragging along everything else on that branch.` },
    { q:`Scenario: a commit already pushed and shared with the team turns out to be broken. What's the safe way to undo it?`, options:[`git revert it — a new commit cancels the change without rewriting shared history`,`git reset --hard past it locally, then force-push to overwrite the remote`,`Delete the branch entirely and recreate it from scratch`,`Manually edit the bad commit's contents and force-push the change`], correct:0, why:`Revert avoids the history-rewrite problem entirely, which is exactly what makes it safe once something's been shared.` },
    { q:`Scenario: a commit exists only on your own machine and was never pushed anywhere. You want it completely gone. What's appropriate here?`, options:[`git reset --hard past it — since nobody else has it, rewriting local history is safe`,`git revert it, since reset is never appropriate under any circumstances`,`Nothing can be done — once committed, a commit can never be removed`,`Push it first, then immediately reset, so the remote also reflects the change`], correct:0, why:`Nothing shared means nothing to conflict with — a hard reset locally causes no problems for anyone else.` },
    { q:`Scenario: you're mid-edit with nothing committed, and need to switch branches immediately for something urgent. What's the move?`, options:[`git stash the changes, switch branches, then stash pop when you're back`,`Commit the half-finished work with a placeholder message, then switch`,`Delete the uncommitted changes, switch, then redo the work from memory`,`Switching branches is impossible while any uncommitted changes exist`], correct:0, why:`Stash exists precisely for this — shelve the work, switch freely, then bring it back exactly as it was.` },
    { q:`Scenario: a build is finally ready to be marked as an official release that must never move. What's the right tool?`, options:[`git tag it — tags stay pinned to one exact commit permanently`,`git branch it — branches are the standard way to mark a fixed release point`,`git stash it, so it's preserved outside the normal commit history`,`git cherry-pick it onto itself to lock it in place`], correct:0, why:`A branch would keep moving with new commits — a tag is specifically the thing that doesn't.` },
    { q:`Scenario: a feature branch has fallen behind main and you want its history to look like it was built directly on top of main's latest work. What's the move?`, options:[`git rebase the feature branch onto main`,`git merge main into the feature branch instead`,`git cherry-pick every single commit from main one at a time`,`git tag the feature branch at its current tip`], correct:0, why:`Rebase is exactly what replays a branch's commits on top of a new base, producing that clean, linear look.` },
    { q:`Scenario: after "git push", how would a teammate confirm your new commits actually made it to the remote?`, options:[`They'd run git fetch, and see origin/main's pointer has moved to include your commits`,`They'd have no way to check unless you personally message them about it`,`Push automatically opens a notification on every teammate's machine`,`They'd need to clone the entire repository again from scratch every time`], correct:0, why:`A fetch updates their remote-tracking branch, which is exactly the mechanism for seeing what's newly on the remote.` },
    { q:`Scenario: you're about to stage some changes and want to see exactly what you're about to add first. What do you run?`, options:[`git diff, to review the exact line-by-line changes before staging anything`,`git log, since commit history shows exactly what's about to be staged`,`git branch, since it lists what's changed on the current branch`,`git tag, since tags show a summary of the most recent edits`], correct:0, why:`diff is the tool for exact line-level detail — log, branch, and tag all operate at a different level entirely.` },
    { q:`Scenario: "git branch -d old-feature" fails with "not fully merged." What does that error actually mean?`, options:[`Some commits on that branch don't exist on any other branch yet, and would be lost`,`The branch name itself contains characters Git doesn't allow`,`The branch was already deleted once, so it can't be deleted again`,`Some other branch currently depends on old-feature to function`], correct:0, why:`This safety check exists exactly to stop you from silently losing commits that exist nowhere else.` },
    { q:`Scenario: you deliberately want to force-delete a branch even though it isn't fully merged. What do you run?`, options:[`git branch -D <name> — the capital D skips the safety check`,`git branch -d <name> twice in a row to override the first refusal`,`git reset --hard on that branch first, then the normal -d will work`,`There's no way to delete an unmerged branch under any circumstance`], correct:0, why:`-D is the deliberate "I know what I'm doing" version of delete, bypassing the merged-check entirely.` }
  ];
