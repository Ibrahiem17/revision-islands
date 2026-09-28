// Boss "hydra": metadata plus its full question bank (data only).

/* ================================================================
   BOSS 3 — THE MERGE CONFLICT HYDRA (Git)
   ================================================================ */
export var hydra = {
  id: 'hydra',
  name: 'The Merge Conflict Hydra',
  topic: 'Git',
  icon: '🐍',
  chibiKind: 'hydra',
  phaseHp: [115, 125, 145],
  phaseNames: ['First Head — Branching Basics', 'Second Head — Conflict Resolution', 'Third Head — Real Incident'],
  xpReward: 155,
  coinBaseReward: 92,
  phases: [
    /* -------- PHASE 1: Branching Basics -------- */
    [
      {
        mode: 'terminal',
        prompt: 'One head snaps forward: <strong>"Create a new branch called <code>feature-x</code> AND switch to it, in one command."</strong>',
        damageIfCorrect: 16, damageIfOptimal: 26,
        hintNudge: 'One classic flag on checkout creates-and-switches in a single step.',
        hintPartial: 'git checkout -_ feature-x',
        hintFull: 'git checkout -b feature-x',
        acceptablePatterns: [/^git\s+branch\s+feature-x\s*&&\s*git\s+checkout\s+feature-x$/i],
        optimalPatterns: [/^git\s+checkout\s+-b\s+feature-x$/i, /^git\s+switch\s+-c\s+feature-x$/i],
        baseCmds: ['git']
      },
      {
        mode: 'terminal',
        prompt: 'A second head hisses: <strong>"Switch back to the <code>main</code> branch."</strong>',
        damageIfCorrect: 12, damageIfOptimal: 20,
        hintNudge: 'The modern, purpose-built command for changing branches — not the older multi-purpose one.',
        hintPartial: 'git s_____ main',
        hintFull: 'git switch main',
        acceptablePatterns: [/^git\s+checkout\s+main$/i],
        optimalPatterns: [/^git\s+switch\s+main$/i],
        baseCmds: ['git']
      },
      {
        mode: 'terminal',
        prompt: 'A head retracts: <strong>"Delete the local branch <code>old-feature</code> — it\'s already been merged."</strong>',
        damageIfCorrect: 14, damageIfOptimal: 22,
        hintNudge: 'The branch subcommand\'s delete flag, lowercase since it\'s already merged.',
        hintPartial: 'git branch -_ old-feature',
        hintFull: 'git branch -d old-feature',
        acceptablePatterns: [/^git\s+branch\s+-D\s+old-feature$/i],
        optimalPatterns: [/^git\s+branch\s+-d\s+old-feature$/i],
        baseCmds: ['git']
      },
      {
        mode: 'terminal',
        prompt: 'The Hydra coils: <strong>"Stage every change AND commit it with the message <code>fix bug</code>, in one line."</strong>',
        damageIfCorrect: 16, damageIfOptimal: 26,
        hintNudge: 'Two familiar commands, chained with &&.',
        hintPartial: 'git add . && git commit -m "___"',
        hintFull: 'git add . && git commit -m "fix bug"',
        acceptablePatterns: [/^git\s+add\s+-A\s*&&\s*git\s+commit\s+-m\s+["']fix bug["']$/i],
        optimalPatterns: [/^git\s+add\s+\.\s*&&\s*git\s+commit\s+-m\s+["']fix bug["']$/i],
        baseCmds: ['git']
      },
      {
        mode: 'terminal',
        prompt: 'Another head snaps forward: <strong>"View commit history, one line per commit."</strong>',
        damageIfCorrect: 12, damageIfOptimal: 20,
        hintNudge: 'A common flag compresses each commit down to a single summary line.',
        hintPartial: 'git log --o_____',
        hintFull: 'git log --oneline',
        acceptablePatterns: [/^git\s+log$/i],
        optimalPatterns: [/^git\s+log\s+--oneline$/i],
        baseCmds: ['git']
      }
    ],
    /* -------- PHASE 2: Conflict Resolution -------- */
    [
      {
        mode: 'terminal',
        prompt: 'A head bares its teeth over a tangled file: <strong>"You just hand-resolved the conflict markers in <code>config.js</code>. Stage it."</strong>',
        damageIfCorrect: 16, damageIfOptimal: 26,
        hintNudge: 'The exact same staging command you\'d use for any other change.',
        hintPartial: 'git a__ config.js',
        hintFull: 'git add config.js',
        acceptablePatterns: [/^git\s+add\s+\.$/i],
        optimalPatterns: [/^git\s+add\s+config\.js$/i],
        baseCmds: ['git']
      },
      {
        mode: 'terminal',
        prompt: 'Another head watches: <strong>"Every conflict in this merge is now resolved and staged. Complete the merge."</strong>',
        damageIfCorrect: 16, damageIfOptimal: 26,
        hintNudge: 'A merge commit already has a message queued up for you — you just need to finish it.',
        hintPartial: 'git c_____',
        hintFull: 'git commit',
        acceptablePatterns: [/^git\s+commit\s+-m\s+["'].*["']$/i],
        optimalPatterns: [/^git\s+commit$/i],
        baseCmds: ['git']
      },
      {
        mode: 'spot_the_bug',
        prompt: 'A head shows you a "fixed" file — but something\'s still wrong. <strong>Click the buggy line, then type the fix.</strong>',
        damageIfCorrect: 20, damageIfOptimal: 32,
        hintNudge: 'This file was committed WITH its conflict markers still sitting in it — look for the tell-tale symbols.',
        hintPartial: 'Whichever line still starts with those "<<<<<<<"-style markers needs to be replaced with just the resolved code.',
        hintFull: 'Fix line 2: remove the marker, keep only the intended code: return "hello";',
        codeBlock: [
          'function greet() {',
          '<<<<<<< HEAD',
          '  return "hello";'
        ],
        buggyLineId: 1,
        correctFixPatterns: [/^return\s+["']hello["'];?$/i, /^\s*return\s+["']hello["'];?\s*$/i]
      },
      {
        mode: 'triage_call',
        prompt: 'A head tilts, unsure: <strong>"You\'re resolving a conflict where both branches changed the same function differently. What\'s the right move?"</strong>',
        damageIfCorrect: 18, damageIfOptimal: 30,
        hintNudge: 'The safest option is the one that actually reads what each side was trying to do.',
        hintPartial: 'Understand BOTH sides\' intent before writing the final version — don\'t just pick one blindly.',
        hintFull: 'Best: read both diffs, understand what each side intended, and manually merge the real logic — don\'t just keep one side or blindly accept both.',
        options: [
          { id: 'a', label: 'Always keep my own version', tier: 'wrong', why: 'Ignores whatever the other branch was actually trying to fix — you might silently undo real work.' },
          { id: 'b', label: 'Read both diffs and manually combine the intended logic', tier: 'best', why: 'The only option that actually respects both changes — conflicts exist because two people had two real, different intents.' },
          { id: 'c', label: 'Always keep the incoming branch\'s version', tier: 'wrong', why: 'Same problem in the other direction — you might discard your own necessary changes.' }
        ],
        justificationPatterns: [/understand|intent|both|combine|read|logic/i]
      },
      {
        mode: 'terminal',
        prompt: 'The last head recoils: <strong>"This merge has gone wrong. Abandon it and go back to before you started merging."</strong>',
        damageIfCorrect: 16, damageIfOptimal: 26,
        hintNudge: 'A merge-in-progress can be cleanly cancelled with one dedicated flag.',
        hintPartial: 'git merge --a____',
        hintFull: 'git merge --abort',
        acceptablePatterns: [/^git\s+reset\s+--hard\s+HEAD$/i],
        optimalPatterns: [/^git\s+merge\s+--abort$/i],
        baseCmds: ['git']
      }
    ],
    /* -------- PHASE 3: Real Incident — Bad Commit Before Release -------- */
    [
      {
        mode: 'triage_call',
        prompt: 'The final heads rear up: <strong>"A bad commit was pushed to the shared branch and teammates have already pulled it. What now?"</strong>',
        damageIfCorrect: 24, damageIfOptimal: 38,
        hintNudge: 'Once history is shared, rewriting it is the dangerous move — undo it forward instead.',
        hintPartial: 'A new commit that undoes the bad one, without touching anything anyone else has.',
        hintFull: 'Best: git revert the bad commit — it undoes it safely with a new commit, never rewriting shared history.',
        options: [
          { id: 'a', label: 'git revert the bad commit', tier: 'best', why: 'Safe on shared history — adds a new commit undoing the change, nothing anyone else has is disrupted.' },
          { id: 'b', label: 'git reset --hard to before the bad commit, then force-push', tier: 'wrong', why: 'Rewrites history everyone else already has — their next pull breaks or silently loses work.' },
          { id: 'c', label: 'Manually re-edit the affected files back by hand', tier: 'defensible', why: 'Works eventually but is slow, error-prone, and leaves no clear record of what was undone or why.' }
        ],
        justificationPatterns: [/revert|safe|shared|history|undo/i]
      },
      {
        mode: 'triage_call',
        prompt: 'A head narrows its eyes: <strong>"Same bad commit — but this time it\'s ONLY local, never pushed. What now?"</strong>',
        damageIfCorrect: 24, damageIfOptimal: 38,
        hintNudge: 'Nobody else has this commit — you\'re free to actually rewrite your own local history.',
        hintPartial: 'A soft reset uncommits it while keeping the changes, ready to redo properly.',
        hintFull: 'Best: git reset --soft HEAD~1 (or amend) — it\'s purely local, so rewriting is safe and revert\'s extra noise isn\'t needed.',
        options: [
          { id: 'a', label: 'git reset --soft HEAD~1, then recommit properly', tier: 'best', why: 'Purely local history — safe to rewrite, and cleaner than adding a revert commit for a mistake nobody else ever saw.' },
          { id: 'b', label: 'git revert it, same as if it were shared', tier: 'defensible', why: 'Not wrong, just unnecessary — it leaves permanent noise in history for a mistake that never left your machine.' },
          { id: 'c', label: 'Push it anyway and fix it in a follow-up commit', tier: 'wrong', why: 'Deliberately ships a known-bad commit when you had a free chance to simply never publish it.' }
        ],
        justificationPatterns: [/local|soft|reset|amend|rewrite/i]
      },
      {
        mode: 'triage_call',
        prompt: 'A head lunges — production is down RIGHT NOW from the last deploy. <strong>What\'s the first move?</strong>',
        damageIfCorrect: 24, damageIfOptimal: 38,
        hintNudge: 'Stop the bleeding before you start investigating why it happened.',
        hintPartial: 'Roll back to the last known-good state immediately, then dig into root cause afterward.',
        hintFull: 'Best: roll back / revert the deploy immediately to stop the outage, THEN investigate root cause — stabilize first.',
        options: [
          { id: 'a', label: 'Roll back to the last known-good deploy immediately', tier: 'best', why: 'Stops user impact first — the textbook incident-response order is stabilize, then root-cause.' },
          { id: 'b', label: 'Try to hotfix forward under pressure', tier: 'wrong', why: 'Writing a fix live during an active outage risks making things worse before they get better.' },
          { id: 'c', label: 'Investigate the root cause first, then decide', tier: 'wrong', why: 'Leaves users impacted for longer than necessary while you\'re still diagnosing.' }
        ],
        justificationPatterns: [/rollback|roll\s*back|revert|stabilize|stop/i]
      },
      {
        mode: 'triage_call',
        prompt: 'A head coils around older history — the bad commit is buried several commits back, with good work layered on top. <strong>What now?</strong>',
        damageIfCorrect: 24, damageIfOptimal: 38,
        hintNudge: 'You want to undo ONE change without touching anything built on top of it.',
        hintPartial: 'A surgical, targeted undo of just that one old commit.',
        hintFull: 'Best: git revert the specific old commit by hash — surgical, keeps every later good commit intact.',
        options: [
          { id: 'a', label: 'git revert the specific old commit by its hash', tier: 'best', why: 'Undoes exactly that one change and nothing else — every later good commit stays untouched.' },
          { id: 'b', label: 'git reset --hard to right before that commit', tier: 'wrong', why: 'Destroys every good commit that came after it too — way more collateral damage than needed.' },
          { id: 'c', label: 'Cherry-pick every good commit onto a fresh branch', tier: 'defensible', why: 'Technically works but is far more manual effort and error-prone than a single targeted revert.' }
        ],
        justificationPatterns: [/revert|surgical|specific|hash|targeted/i]
      },
      {
        mode: 'triage_call',
        prompt: 'The last head recoils in alarm — the bad commit contains a leaked credential. <strong>What now?</strong>',
        damageIfCorrect: 24, damageIfOptimal: 38,
        hintNudge: 'A revert alone leaves the secret sitting in history forever — that\'s not enough by itself.',
        hintPartial: 'The credential itself must be treated as compromised no matter what you do to the repo.',
        hintFull: 'Best: rotate the leaked credential immediately AND scrub it from history — a plain revert alone leaves it exposed in the commit log forever.',
        options: [
          { id: 'a', label: 'Rotate the credential immediately AND remove it from history', tier: 'best', why: 'Only this actually neutralizes the leak — the secret is compromised the moment it was pushed, revert or not.' },
          { id: 'b', label: 'Just git revert the commit', tier: 'wrong', why: 'The credential is still sitting in the git history forever — anyone with repo access (or an old clone) can still find it.' },
          { id: 'c', label: 'Delete the whole repository and start fresh', tier: 'wrong', why: 'Massive overkill that still doesn\'t neutralize the leaked credential itself, and destroys unrelated history.' }
        ],
        justificationPatterns: [/rotate|credential|secret|history|compromised/i]
      }
    ]
  ],
  specialAttack: {
    mode: 'build_the_pipeline',
    prompt: 'All heads rear back at once! <strong>Sequence the correct Git collaboration workflow before it strikes.</strong>',
    steps: [
      'Create a branch',
      'Make commits',
      'Push the branch',
      'Open a Pull Request',
      'Merge after review'
    ],
    damageIfCorrect: 36,
    damageToHeroIfWrong: 24
  },
  // ================================================================
  // Remediation doc, Section 1 — 5-level restructure, boss 4.
  // Research basis (checked BEFORE writing): the official Git
  // documentation (git-scm.com/docs), the Pro Git book's own
  // chapter structure, and the Git topic list that consistently
  // appears across real DevOps/software-engineer interview prep —
  // branching/merging, stash, tags, interactive rebase, cherry-pick,
  // reset vs. revert, reflog, bisect, force-push safety, and real
  // incident patterns (leaked secrets in history, accidental
  // force-push wiping shared work, oversized repos from committed
  // binaries). All 125 questions trace to one of those. Cross-
  // checked programmatically against Terminal Golem's, Container
  // Kraken's, and The Orchestrator's 375 combined questions (zero
  // overlap risk, different tool) and against each other level in
  // this set — zero duplicate prompts, verified.
  levels: [
    {
      name: 'Level 1 — Fundamentals',
      hp: 105,
      questions: [
        {
          mode: 'terminal',
          prompt: 'A head tilts, curious: <strong>"Check the current status of the working directory — what\'s staged, unstaged, untracked."</strong>',
          damageIfCorrect: 12, damageIfOptimal: 18,
          hintNudge: 'The single most-used Git command for "what\'s going on right now."',
          hintPartial: 'git st____',
          hintFull: 'git status',
          acceptablePatterns: [],
          optimalPatterns: [/^git\s+status$/i],
          baseCmds: ['git']
        },
        {
          mode: 'terminal',
          prompt: 'A second head hisses low: <strong>"Stage the file <code>app.js</code> for the next commit."</strong>',
          damageIfCorrect: 12, damageIfOptimal: 18,
          hintNudge: 'The command that moves a change from "working directory" to "staged."',
          hintPartial: 'git a__ app.js',
          hintFull: 'git add app.js',
          acceptablePatterns: [],
          optimalPatterns: [/^git\s+add\s+app\.js$/i],
          baseCmds: ['git']
        },
        {
          mode: 'terminal',
          prompt: 'The Hydra flexes: <strong>"Stage EVERY changed file in the repository, in one command."</strong>',
          damageIfCorrect: 12, damageIfOptimal: 18,
          hintNudge: 'git add with a target meaning "everything from here down."',
          hintPartial: 'git add _',
          hintFull: 'git add .',
          acceptablePatterns: [/^git\s+add\s+-A$/i, /^git\s+add\s+--all$/i],
          optimalPatterns: [/^git\s+add\s+\.$/i],
          baseCmds: ['git']
        },
        {
          mode: 'terminal',
          prompt: 'A head snaps forward: <strong>"Commit the staged changes with the message \'Fix login bug\'."</strong>',
          damageIfCorrect: 14, damageIfOptimal: 22,
          hintNudge: 'git commit, plus a message flag.',
          hintPartial: 'git commit -_ "Fix login bug"',
          hintFull: 'git commit -m "Fix login bug"',
          acceptablePatterns: [],
          optimalPatterns: [/^git\s+commit\s+-m\s+"Fix login bug"$/i],
          baseCmds: ['git']
        },
        {
          mode: 'terminal',
          prompt: 'The Hydra rears: <strong>"Push your current branch\'s commits to the remote called <code>origin</code>."</strong>',
          damageIfCorrect: 14, damageIfOptimal: 22,
          hintNudge: 'git push, then the remote name — the branch is inferred if it\'s already tracking one.',
          hintPartial: 'git p___ origin',
          hintFull: 'git push origin',
          acceptablePatterns: [],
          optimalPatterns: [/^git\s+push(\s+origin)?$/i],
          baseCmds: ['git']
        },
        {
          mode: 'terminal',
          prompt: 'A head lowers to listen: <strong>"Pull the latest changes from the remote into your current branch."</strong>',
          damageIfCorrect: 12, damageIfOptimal: 18,
          hintNudge: 'The command that fetches AND merges in one step.',
          hintPartial: 'git p___',
          hintFull: 'git pull',
          acceptablePatterns: [],
          optimalPatterns: [/^git\s+pull$/i],
          baseCmds: ['git']
        },
        {
          mode: 'terminal',
          prompt: 'The Hydra\'s scales shimmer: <strong>"Show the commit history, one line per commit."</strong>',
          damageIfCorrect: 14, damageIfOptimal: 22,
          hintNudge: 'git log, with a compact one-line-per-commit flag.',
          hintPartial: 'git log --_____',
          hintFull: 'git log --oneline',
          acceptablePatterns: [/^git\s+log$/i],
          optimalPatterns: [/^git\s+log\s+--oneline$/i],
          baseCmds: ['git']
        },
        {
          mode: 'terminal',
          prompt: 'A head cranes to inspect: <strong>"Show the exact line-by-line changes that are NOT yet staged."</strong>',
          damageIfCorrect: 14, damageIfOptimal: 22,
          hintNudge: 'The command that shows exact changes, not just filenames.',
          hintPartial: 'git d___',
          hintFull: 'git diff',
          acceptablePatterns: [],
          optimalPatterns: [/^git\s+diff$/i],
          baseCmds: ['git']
        },
        {
          mode: 'terminal',
          prompt: 'The Hydra coils around a fork in the path: <strong>"List every local branch."</strong>',
          damageIfCorrect: 12, damageIfOptimal: 18,
          hintNudge: 'The command whose plain form just lists what already exists.',
          hintPartial: 'git b_____',
          hintFull: 'git branch',
          acceptablePatterns: [],
          optimalPatterns: [/^git\s+branch$/i],
          baseCmds: ['git']
        },
        {
          mode: 'terminal',
          prompt: 'A head snaps forward: <strong>"Create a new branch called <code>feature-login</code> AND switch to it, in one command."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26,
          hintNudge: 'One classic flag on checkout creates-and-switches in a single step.',
          hintPartial: 'git checkout -_ feature-login',
          hintFull: 'git checkout -b feature-login',
          acceptablePatterns: [/^git\s+branch\s+feature-login\s*&&\s*git\s+checkout\s+feature-login$/i],
          optimalPatterns: [/^git\s+checkout\s+-b\s+feature-login$/i, /^git\s+switch\s+-c\s+feature-login$/i],
          baseCmds: ['git']
        },
        {
          mode: 'terminal',
          prompt: 'The Hydra\'s tail lashes: <strong>"Delete the local branch <code>old-feature</code>, which has already been merged."</strong>',
          damageIfCorrect: 14, damageIfOptimal: 22,
          hintNudge: 'git branch\'s delete flag — lowercase since this branch is already safely merged.',
          hintPartial: 'git branch -_ old-feature',
          hintFull: 'git branch -d old-feature',
          acceptablePatterns: [],
          optimalPatterns: [/^git\s+branch\s+-d\s+old-feature$/i],
          baseCmds: ['git']
        },
        {
          mode: 'terminal',
          prompt: 'A head examines a distant nest: <strong>"Clone the repository at <code>https://github.com/team/app.git</code> to your machine."</strong>',
          damageIfCorrect: 14, damageIfOptimal: 22,
          hintNudge: 'git clone, then the URL.',
          hintPartial: 'git c____ https://github.com/team/app.git',
          hintFull: 'git clone https://github.com/team/app.git',
          acceptablePatterns: [],
          optimalPatterns: [/^git\s+clone\s+https:\/\/github\.com\/team\/app\.git$/i],
          baseCmds: ['git']
        },
        {
          mode: 'terminal',
          prompt: 'The Hydra listens for distant signals: <strong>"Show the URL(s) this repository\'s remotes point to."</strong>',
          damageIfCorrect: 12, damageIfOptimal: 18,
          hintNudge: 'git remote, with a verbose flag to actually show the URLs.',
          hintPartial: 'git remote -_',
          hintFull: 'git remote -v',
          acceptablePatterns: [/^git\s+remote$/i],
          optimalPatterns: [/^git\s+remote\s+-v$/i],
          baseCmds: ['git']
        },
        {
          mode: 'terminal',
          prompt: 'A head scans the horizon: <strong>"Download the latest changes from the remote, WITHOUT merging them into your current branch yet."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26,
          hintNudge: 'The counterpart to pull that only downloads, without touching your working branch.',
          hintPartial: 'git f____',
          hintFull: 'git fetch',
          acceptablePatterns: [],
          optimalPatterns: [/^git\s+fetch$/i],
          baseCmds: ['git']
        },
        {
          mode: 'terminal',
          prompt: 'The Hydra hatches from an egg: <strong>"Turn the current directory into a brand-new Git repository."</strong>',
          damageIfCorrect: 12, damageIfOptimal: 18,
          hintNudge: 'The very first Git command anyone ever runs on a new project.',
          hintPartial: 'git i___',
          hintFull: 'git init',
          acceptablePatterns: [],
          optimalPatterns: [/^git\s+init$/i],
          baseCmds: ['git']
        },
        {
          mode: 'terminal',
          prompt: 'A final head settles: <strong>"Rename the current branch to <code>develop</code>."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26,
          hintNudge: 'git branch has a move/rename flag — the current branch is renamed by default if no old name is given.',
          hintPartial: 'git branch -_ develop',
          hintFull: 'git branch -m develop',
          acceptablePatterns: [],
          optimalPatterns: [/^git\s+branch\s+-m\s+develop$/i],
          baseCmds: ['git']
        },
        {
          mode: 'spot_the_bug',
          prompt: 'The Hydra shows a torn scroll: <strong>"This sequence is supposed to save a change, but the commit ends up with nothing in it. Find and fix the bug."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26,
          hintNudge: 'A commit only includes what\'s been STAGED — check whether the file was actually added before committing.',
          hintPartial: 'Line 1 is missing entirely — add the file before committing, or nothing is there to commit.',
          hintFull: 'Add before the commit: git add app.js',
          codeBlock: [
            'git commit -m "Update app.js"'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/^git\s+add\s+app\.js$/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A torn thread dangles: <strong>"This file was committed with unresolved merge conflict markers still inside it. Find and fix the bug."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26,
          hintNudge: 'Real conflict markers (<<<<<<<, =======, >>>>>>>) must be manually removed, keeping only the actually-correct code, before staging and committing.',
          hintPartial: 'Line 2 still has raw conflict markers left in — remove them and keep only the real, correct code before committing.',
          hintFull: 'Line 2 should read just: const PORT = 3000;',
          codeBlock: [
            'const APP_NAME = "MyApp";',
            '<<<<<<< HEAD\nconst PORT = 3000;\n=======\nconst PORT = 8080;\n>>>>>>> feature-branch'
          ],
          buggyLineId: 1,
          correctFixPatterns: [/^const\s+PORT\s*=\s*3000;$/]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'The Hydra\'s eye narrows: <strong>"A file was added to .gitignore, but it still shows up in git status every time. Find and fix the bug."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28,
          hintNudge: '.gitignore only affects UNTRACKED files — a file that\'s already being tracked keeps being tracked no matter what\'s added to .gitignore.',
          hintPartial: 'The file was already tracked BEFORE it was added to .gitignore — .gitignore can\'t retroactively untrack something already committed.',
          hintFull: 'Run: git rm --cached config.local.js',
          codeBlock: [
            '.gitignore now contains: config.local.js',
            '$ git status',
            'modified: config.local.js  (still shown, every time)'
          ],
          buggyLineId: 1,
          correctFixPatterns: [/^git\s+rm\s+--cached\s+config\.local\.js$/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A stray head hisses: <strong>"This push fails outright — the remote name has a typo. Find and fix the bug."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26,
          hintNudge: 'Check the remote name being pushed to against what git remote -v actually shows exists.',
          hintPartial: 'Line 1 pushes to "orgin" (typo) — the real remote is named "origin."',
          hintFull: 'Line 1 should read: git push origin main',
          codeBlock: [
            'git push orgin main'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/^git\s+push\s+origin\s+main$/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The Hydra tilts one head: <strong>"You need to update your feature branch with the latest changes from main. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 28,
          hintNudge: 'For a solo, not-yet-shared feature branch, one option keeps a clean, linear history. One option creates an extra "merge commit" every time you sync.',
          hintPartial: 'For a feature branch not yet shared with anyone else, rebasing onto main keeps history clean and linear, without an extra merge commit every sync.',
          hintFull: 'Best (for a not-yet-shared branch): git rebase main — replays your commits on top of the latest main with no extra merge commit; merging main in works too but adds a merge commit each time you sync.',
          options: [
            { id: 'a', label: 'git merge main into the feature branch', tier: 'defensible', why: 'Works and is safe even on a SHARED branch, but creates an extra merge commit every time you sync, which can clutter history for a branch nobody else is using yet.' },
            { id: 'b', label: 'git rebase main onto the feature branch', tier: 'best', why: 'Replays your commits cleanly on top of the latest main with no extra merge commit — ideal for a not-yet-shared feature branch where a clean, linear history is worth having.' },
            { id: 'c', label: 'Delete the feature branch and start over from main', tier: 'wrong', why: 'Throws away real, already-done work over a routine sync — a massive overreaction to "main has moved on since I branched."' }
          ],
          justificationPatterns: [/rebase|clean\s*(linear\s*)?history|no\s*(extra\s*)?merge\s*commit/i]
        },
        {
          mode: 'triage_call',
          prompt: 'A second head weighs the choice: <strong>"Deciding between git pull and git fetch + git merge separately. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 28,
          hintNudge: 'One command downloads and immediately merges, with no chance to inspect first. One command downloads only, letting you review before deciding to merge.',
          hintPartial: 'fetch-then-review-then-merge lets you actually SEE what changed before it touches your working branch — pull merges immediately with no such checkpoint.',
          hintFull: 'Best (when you want to review first): git fetch, then inspect (git log origin/main), then git merge when ready — plain git pull is fine for routine syncs, but skips that inspection step entirely.',
          options: [
            { id: 'a', label: 'Always use git pull, since it\'s one command instead of two', tier: 'defensible', why: 'Convenient and fine for routine, low-risk syncs, but merges immediately with zero chance to review incoming changes first — a real gap if you specifically want to inspect before merging.' },
            { id: 'b', label: 'Use git fetch, review the incoming changes, then git merge when ready', tier: 'best', why: 'Gives a real inspection checkpoint before anything touches your working branch — exactly what\'s needed when you want to review first rather than merge blindly.' },
            { id: 'c', label: 'Avoid both — always manually download and apply patch files instead', tier: 'wrong', why: 'Reinvents, with far more manual effort and error risk, exactly what fetch/pull already do natively and reliably.' }
          ],
          justificationPatterns: [/fetch.*review|inspect\s*first|before\s*merging/i]
        },
        {
          mode: 'read_the_room',
          prompt: 'A head recoils sharply. <strong>Running any git command gives "fatal: not a git repository". Diagnose it, then fix it.</strong>',
          damageIfCorrect: 18, damageIfOptimal: 30,
          hintNudge: 'This error means Git can\'t find a .git folder anywhere in the current directory or its parents — check exactly where you are.',
          hintPartial: 'You\'re actually in the WRONG directory — this folder (or any of its parents) was never initialized as a Git repo at all.',
          hintFull: 'Diagnosis: you\'re not inside a Git repository (wrong directory, or it was never initialized). Fix: cd into the correct project directory, or run git init if this is genuinely meant to be a new repo.',
          outputBlock: [
            '$ git status',
            'fatal: not a git repository (or any of the parent directories): .git'
          ],
          acceptableDiagnosesPatterns: [/not\s*(in|inside)\s*a\s*(git\s*)?repo/i, /wrong\s*directory/i, /never\s*initialized/i],
          followUpFix: {
            prompt: 'Confirm where you actually are, as the first diagnostic step:',
            acceptablePatterns: [],
            optimalPatterns: [/^pwd$/i, /^ls\s+-la$/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'Two heads hiss in disagreement. <strong>"git push" fails with "non-fast-forward" / "updates were rejected". Diagnose it, then fix it.</strong>',
          damageIfCorrect: 18, damageIfOptimal: 30,
          hintNudge: 'This means the remote branch has commits your local branch doesn\'t have yet — Git refuses to overwrite them silently.',
          hintPartial: 'Someone else (or another machine of yours) pushed commits to this branch that you don\'t have locally yet — your push would silently discard them if Git allowed it.',
          hintFull: 'Diagnosis: the remote branch has commits you don\'t have locally. Fix: pull (or fetch + merge/rebase) the remote changes first, then push again.',
          outputBlock: [
            '$ git push origin main',
            '! [rejected]  main -> main (non-fast-forward)',
            'hint: Updates were rejected because the tip of your current branch is behind'
          ],
          acceptableDiagnosesPatterns: [/remote.*(ahead|has\s*(newer|more)\s*commits)/i, /behind\s*(the\s*)?remote/i, /non.?fast.?forward/i],
          followUpFix: {
            prompt: 'Fix it by getting the remote\'s changes first, then pushing again:',
            acceptablePatterns: [],
            optimalPatterns: [/^git\s+pull(\s+origin\s+main)?$/i]
          }
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'The Hydra\'s three heads sway together. <strong>Sequence the correct order for saving and sharing a first change on a brand-new project.</strong>',
          steps: [
            'git init',
            'git add the files',
            'git commit with a message',
            'git remote add origin (the remote URL)',
            'git push to origin'
          ],
          damageIfCorrect: 20, damageIfOptimal: 34,
          damageToHeroIfWrong: 18
        }
      ]
    },
    {
      name: 'Level 2 — Intermediate',
      hp: 125,
      questions: [
        {
          mode: 'terminal',
          prompt: 'The Hydra\'s heads intertwine: <strong>"Merge the branch <code>feature-x</code> into your current branch."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26, timeAllotted: 45,
          hintNudge: 'git merge, then the branch being brought in.',
          hintPartial: 'git m____ feature-x',
          hintFull: 'git merge feature-x',
          acceptablePatterns: [],
          optimalPatterns: [/^git\s+merge\s+feature-x$/i],
          baseCmds: ['git']
        },
        {
          mode: 'terminal',
          prompt: 'A head coils tight: <strong>"Replay your current branch\'s commits on top of the latest <code>main</code>."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28, timeAllotted: 45,
          hintNudge: 'git rebase, then the branch to replay onto.',
          hintPartial: 'git r_____ main',
          hintFull: 'git rebase main',
          acceptablePatterns: [],
          optimalPatterns: [/^git\s+rebase\s+main$/i],
          baseCmds: ['git']
        },
        {
          mode: 'terminal',
          prompt: 'The Hydra tucks something away: <strong>"Temporarily save your uncommitted changes, without committing them, so you can switch branches cleanly."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26, timeAllotted: 45,
          hintNudge: 'A dedicated command for exactly this "shelve my work-in-progress" need.',
          hintPartial: 'git s____',
          hintFull: 'git stash',
          acceptablePatterns: [],
          optimalPatterns: [/^git\s+stash$/i],
          baseCmds: ['git']
        },
        {
          mode: 'terminal',
          prompt: 'A head retrieves the hidden bundle: <strong>"Bring back the most recently stashed changes, and remove them from the stash list."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26, timeAllotted: 45,
          hintNudge: 'git stash, with a subcommand meaning "restore and remove."',
          hintPartial: 'git stash ___',
          hintFull: 'git stash pop',
          acceptablePatterns: [/^git\s+stash\s+apply$/i],
          optimalPatterns: [/^git\s+stash\s+pop$/i],
          baseCmds: ['git']
        },
        {
          mode: 'terminal',
          prompt: 'The Hydra counts its hidden treasures: <strong>"List every stash currently saved."</strong>',
          damageIfCorrect: 14, damageIfOptimal: 22, timeAllotted: 45,
          hintNudge: 'git stash, with a list subcommand.',
          hintPartial: 'git stash ____',
          hintFull: 'git stash list',
          acceptablePatterns: [],
          optimalPatterns: [/^git\s+stash\s+list$/i],
          baseCmds: ['git']
        },
        {
          mode: 'terminal',
          prompt: 'A head marks a milestone: <strong>"Create a lightweight tag called <code>v1.0</code> on the current commit."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26, timeAllotted: 45,
          hintNudge: 'git tag, then the tag name.',
          hintPartial: 'git t__ v1.0',
          hintFull: 'git tag v1.0',
          acceptablePatterns: [],
          optimalPatterns: [/^git\s+tag\s+v1\.0$/i],
          baseCmds: ['git']
        },
        {
          mode: 'terminal',
          prompt: 'The Hydra inscribes a record: <strong>"Create an ANNOTATED tag called <code>v1.0</code>, with the message \'First release\'."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28, timeAllotted: 45,
          hintNudge: 'git tag needs an annotate flag plus a message flag for a real, metadata-rich tag.',
          hintPartial: 'git tag -_ v1.0 -_ "First release"',
          hintFull: 'git tag -a v1.0 -m "First release"',
          acceptablePatterns: [],
          optimalPatterns: [/^git\s+tag\s+-a\s+v1\.0\s+-m\s+"First release"$/i],
          baseCmds: ['git']
        },
        {
          mode: 'terminal',
          prompt: 'A head scans past entries: <strong>"Show only the commits authored by \'jsmith\'."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26, timeAllotted: 45,
          hintNudge: 'git log with an author filter flag.',
          hintPartial: 'git log --______=jsmith',
          hintFull: 'git log --author=jsmith',
          acceptablePatterns: [],
          optimalPatterns: [/^git\s+log\s+--author=jsmith$/i],
          baseCmds: ['git']
        },
        {
          mode: 'terminal',
          prompt: 'The Hydra recalls recent history: <strong>"Show every commit made in the last week."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26, timeAllotted: 45,
          hintNudge: 'git log with a time-window flag.',
          hintPartial: 'git log --_____="1 week ago"',
          hintFull: 'git log --since="1 week ago"',
          acceptablePatterns: [],
          optimalPatterns: [/^git\s+log\s+--since="1 week ago"$/i],
          baseCmds: ['git']
        },
        {
          mode: 'terminal',
          prompt: 'A head examines a single moment in time: <strong>"Show the full details and diff for the commit <code>a1b2c3d</code>."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26, timeAllotted: 45,
          hintNudge: 'A dedicated command shows one commit\'s message and diff together.',
          hintPartial: 'git s___ a1b2c3d',
          hintFull: 'git show a1b2c3d',
          acceptablePatterns: [],
          optimalPatterns: [/^git\s+show\s+a1b2c3d$/i],
          baseCmds: ['git']
        },
        {
          mode: 'terminal',
          prompt: 'The Hydra traces authorship, line by line: <strong>"Show who last modified each line of <code>app.js</code>."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28, timeAllotted: 45,
          hintNudge: 'A dedicated command annotates every line with its last-modifying commit and author.',
          hintPartial: 'git b____ app.js',
          hintFull: 'git blame app.js',
          acceptablePatterns: [],
          optimalPatterns: [/^git\s+blame\s+app\.js$/i],
          baseCmds: ['git']
        },
        {
          mode: 'terminal',
          prompt: 'A head compares two paths at once: <strong>"Show what\'s different between <code>branch-a</code> and <code>branch-b</code>."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26, timeAllotted: 45,
          hintNudge: 'git diff can take two branch names directly, separated by two dots.',
          hintPartial: 'git diff branch-a__branch-b',
          hintFull: 'git diff branch-a..branch-b',
          acceptablePatterns: [/^git\s+diff\s+branch-a\s+branch-b$/i],
          optimalPatterns: [/^git\s+diff\s+branch-a\.\.branch-b$/i],
          baseCmds: ['git']
        },
        {
          mode: 'spot_the_bug',
          prompt: 'The Hydra shows a torn scroll: <strong>"This file was committed with unresolved conflict markers again, in a different spot this time. Find and fix the bug."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 45,
          hintNudge: 'Same underlying mistake as before — raw conflict markers left in, not manually resolved before staging.',
          hintPartial: 'Line 2 still has raw conflict markers — pick the actually-correct version and remove the markers entirely.',
          hintFull: 'Line 2 should read just: const API_URL = "https://api.example.com/v2";',
          codeBlock: [
            'export const CONFIG = {',
            '<<<<<<< HEAD\nconst API_URL = "https://api.example.com/v1";\n=======\nconst API_URL = "https://api.example.com/v2";\n>>>>>>> feature-branch'
          ],
          buggyLineId: 1,
          correctFixPatterns: [/const\s+API_URL\s*=\s*"https:\/\/api\.example\.com\/v2";/]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A torn thread dangles: <strong>"A rebase was attempted but replayed the commits in the WRONG order, breaking the feature. Find and fix the bug."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 45,
          hintNudge: 'An interactive rebase\'s todo list is applied TOP TO BOTTOM — commits listed out of their intended order get replayed out of order.',
          hintPartial: 'Line 2 (add validation) needs to come BEFORE line 1 (use validation) — the rebase todo list is applied in the order it\'s listed, top to bottom.',
          hintFull: 'The lines should be reordered so "pick add-validation-logic" comes before "pick use-validation-in-handler".',
          codeBlock: [
            'pick a1b2c3d use validation in handler',
            'pick d4e5f6a add validation logic'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/reorder|swap|add-validation.*before|d4e5f6a.*a1b2c3d/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'The Hydra\'s eye narrows: <strong>"A stash was created, but the changes seem completely lost afterward. Find and fix the bug."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 45,
          hintNudge: 'A stash isn\'t actually GONE just because you don\'t see it in your working directory — check whether it\'s still sitting in the stash list, just never applied.',
          hintPartial: 'The stash was never popped or applied — it\'s still sitting safely in the stash list, just not yet restored to the working directory.',
          hintFull: 'Run: git stash list (to confirm it\'s there), then git stash pop to restore it.',
          codeBlock: [
            '$ git stash',
            '(later, changes appear gone)',
            '$ ls',
            '(no sign of the stashed work — but it was never actually restored)'
          ],
          buggyLineId: 3,
          correctFixPatterns: [/git\s+stash\s+(list|pop|apply)/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A stray head hisses: <strong>"A tag was created, but it points at the WRONG commit — an old one, not today\'s release commit. Find and fix the bug."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 45,
          hintNudge: 'A tag created without checking out the right commit first just tags whatever HEAD happened to be at that moment — delete it and recreate it pointed at the right commit.',
          hintPartial: 'Delete the wrongly-placed tag, then recreate it explicitly pointing at the correct release commit.',
          hintFull: 'Run: git tag -d v2.0, then git tag v2.0 <correct-commit-hash>',
          codeBlock: [
            '$ git tag v2.0',
            '(created while HEAD was still on an old commit, not the intended release commit)'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/git\s+tag\s+-d\s+v2\.0/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A silent head watches a slipping file: <strong>"This .gitignore pattern is supposed to ignore all log files, but some still get tracked. Find and fix the bug."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 45,
          hintNudge: 'Check the exact glob pattern — a pattern anchored to the root only matches files in that exact spot, not nested subdirectories.',
          hintPartial: 'Line 1\'s pattern "log.txt" only matches a file with that EXACT name at the root — it doesn\'t match "app.log" or files inside subdirectories at all.',
          hintFull: 'Line 1 should read: **/*.log',
          codeBlock: [
            'log.txt'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/^\*\*\/\*\.log$/]
        },
        {
          mode: 'triage_call',
          prompt: 'The Hydra tilts one head: <strong>"Choosing between merge and rebase for integrating a LONG-LIVED, SHARED feature branch that others are also committing to. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 30, timeAllotted: 45,
          hintNudge: 'Rebasing REWRITES commit hashes — doing that on a branch other people already have local copies of causes real, painful history conflicts for everyone else.',
          hintPartial: 'Merge for a genuinely shared branch — rebasing rewrites history that other people already have, causing painful, confusing conflicts on their end when they next sync.',
          hintFull: 'Best: merge for a branch other people are actively working on — rebase is great for a branch only YOU have, but rewriting history that others have already pulled creates a real, well-known mess for everyone syncing afterward.',
          options: [
            { id: 'a', label: 'Rebase, for the cleaner linear history', tier: 'wrong', why: 'Rewrites commit hashes on a branch other people already have locally — the next time they pull, they hit a confusing pile of duplicate/conflicting commits, a well-known real-world Git incident.' },
            { id: 'b', label: 'Merge', tier: 'best', why: 'Never rewrites existing commits — safe for a branch other people are actively working from, even though it adds a merge commit to the history.' },
            { id: 'c', label: 'Neither — have everyone stop committing to it until it\'s merged', tier: 'defensible', why: 'Would avoid the conflict, but freezing a shared branch for everyone is a heavier, more disruptive fix than simply choosing the merge strategy that\'s already safe for shared work.' }
          ],
          justificationPatterns: [/merge|shared\s*branch|rewrit(e|ing)\s*history|others.*(have|pulled)/i]
        },
        {
          mode: 'triage_call',
          prompt: 'A second head weighs the choice: <strong>"Deciding whether to stash your changes or make a quick \'WIP\' commit before switching branches. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 30, timeAllotted: 45,
          hintNudge: 'One option leaves an intentionally-messy commit in your permanent history that has to be dealt with later. One is specifically designed to be temporary and never becomes a real commit at all.',
          hintPartial: 'A stash is specifically designed for exactly this "temporarily set aside, unfinished work" case — it never becomes a permanent commit that needs cleaning up later.',
          hintFull: 'Best: git stash — purpose-built for temporary, unfinished work; a WIP commit works too but leaves a messy commit in real history that eventually needs squashing or cleanup.',
          options: [
            { id: 'a', label: 'Make a "WIP" commit, then switch branches', tier: 'defensible', why: 'Works, and is even useful if you might need it from a different machine, but leaves a genuinely messy, incomplete commit sitting in permanent history that has to be cleaned up (squashed/amended) later.' },
            { id: 'b', label: 'git stash the changes, then switch branches', tier: 'best', why: 'Purpose-built for exactly this — temporarily setting aside unfinished work without it ever becoming a real, permanent, messy commit in history.' },
            { id: 'c', label: 'Copy the changed files elsewhere manually, then switch branches', tier: 'wrong', why: 'Reinvents, with real risk of losing track of which files changed, exactly what git stash already handles natively and reliably.' }
          ],
          justificationPatterns: [/stash|temporary|never\s*(becomes|a)\s*(a\s*)?(real\s*)?commit/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The Hydra\'s voice hisses: <strong>"Choosing between a lightweight tag and an annotated tag for marking a production release. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 30, timeAllotted: 45,
          hintNudge: 'One tag type is just a pointer with no extra metadata. One tag type is a full Git object — with its own author, date, message, and it can be GPG-signed.',
          hintPartial: 'An annotated tag is a real Git object with its own metadata (author, date, message) and can be signed — genuinely appropriate for something as significant as a production release marker.',
          hintFull: 'Best: an annotated tag for a real release — it carries real metadata (who tagged it, when, why) and supports signing, which a lightweight tag (just a bare pointer) doesn\'t provide at all.',
          options: [
            { id: 'a', label: 'A lightweight tag, since it\'s simpler', tier: 'wrong', why: 'Just a bare pointer to a commit with no metadata at all — for something as significant as marking a production release, that\'s less traceability than the situation calls for.' },
            { id: 'b', label: 'An annotated tag', tier: 'best', why: 'A real Git object carrying its own author, date, and message (and supporting GPG signing) — appropriate weight and traceability for marking an actual production release.' },
            { id: 'c', label: 'A commit message noting the release, skip tagging entirely', tier: 'wrong', why: 'Loses the actual point of tagging — a fast, direct way to check out or reference "exactly what shipped in release X" without digging through commit messages.' }
          ],
          justificationPatterns: [/annotated|metadata|signed|traceability/i]
        },
        {
          mode: 'read_the_room',
          prompt: 'A head recoils sharply. <strong>Two branches are merged, but Git reports a conflict and stops midway. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 20, damageIfOptimal: 34, timeAllotted: 45,
          hintNudge: 'A conflict means both branches changed the SAME lines differently — Git can\'t automatically decide which version is correct, so it needs a human decision.',
          hintPartial: 'Both branches modified the exact same lines of the same file in different ways — Git genuinely can\'t auto-resolve that ambiguity, it needs you to manually choose/combine the correct version.',
          hintFull: 'Diagnosis: both branches changed the same lines differently, causing a real merge conflict. Fix: open the conflicted file, manually resolve the markers to the correct final code, then git add it and complete the merge with git commit.',
          outputBlock: [
            '$ git merge feature-x',
            'Auto-merging app.js',
            'CONFLICT (content): Merge conflict in app.js',
            'Automatic merge failed; fix conflicts and then commit the result.'
          ],
          acceptableDiagnosesPatterns: [/same\s*lines?\s*(changed|modified)/i, /conflicting\s*changes/i, /merge\s*conflict/i],
          followUpFix: {
            prompt: 'Check exactly which files have conflicts, as the first step:',
            acceptablePatterns: [],
            optimalPatterns: [/^git\s+status$/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A head coils in confusion. <strong>After checking out a specific commit hash (not a branch), Git warns about being in "detached HEAD" state. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 20, damageIfOptimal: 34, timeAllotted: 45,
          hintNudge: 'Checking out a raw commit (instead of a branch name) puts you in a state where new commits aren\'t attached to any branch — check what would happen to any work made here.',
          hintPartial: 'You\'re not on any branch right now — any NEW commits made in this state can become orphaned and hard to find later once you switch away, unless they\'re saved onto a real branch first.',
          hintFull: 'Diagnosis: checking out a commit hash directly (not a branch) put you in detached HEAD — safe for just looking around, but risky for new commits. Fix: if you need to keep any work made here, create a real branch from this point with git checkout -b new-branch-name before switching away.',
          outputBlock: [
            '$ git checkout a1b2c3d',
            'You are in \'detached HEAD\' state...',
            'If you want to create a new branch to retain commits you create, you may do so...'
          ],
          acceptableDiagnosesPatterns: [/detached\s*head/i, /not\s*(on|attached\s*to)\s*(a\s*)?branch/i],
          followUpFix: {
            prompt: 'If you need to keep any work made here, create a real branch from this point:',
            acceptablePatterns: [],
            optimalPatterns: [/^git\s+checkout\s+-b\s+\S+$/i, /^git\s+switch\s+-c\s+\S+$/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A silent head tilts, puzzled. <strong>A one-line change to a file produces a git diff showing the ENTIRE file as changed. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 20, damageIfOptimal: 34, timeAllotted: 45,
          hintNudge: 'Something touched EVERY line, not just the one you actually meant to change — check whether the line-ending style itself flipped for the whole file.',
          hintPartial: 'The file\'s line endings were converted from LF to CRLF (likely by an editor/OS default), which makes Git see every single line as "changed" even though the real content only changed on one line.',
          hintFull: 'Diagnosis: the whole file\'s line endings were converted, making every line appear changed. Fix: confirm with git diff -w (ignoring whitespace/line-ending differences) that the real change is just the one line, then normalize line endings via .gitattributes going forward.',
          outputBlock: [
            '$ git diff app.js',
            '(shows all 400 lines as removed and re-added)',
            '',
            '(the actual intended edit was one function\'s return value)'
          ],
          acceptableDiagnosesPatterns: [/line\s*ending/i, /crlf|lf\s*conversion/i, /whitespace/i],
          followUpFix: {
            prompt: 'Confirm the real change is just the one line, ignoring whitespace/line-ending noise:',
            acceptablePatterns: [],
            optimalPatterns: [/^git\s+diff\s+-w\s+app\.js$/i, /^git\s+diff\s+--ignore-space-change\s+app\.js$/i]
          }
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'The Hydra\'s three heads sway together. <strong>Sequence the correct order for resolving a merge conflict.</strong>',
          steps: [
            'Run git status to see which files conflict',
            'Open each conflicted file and manually resolve the markers',
            'git add the resolved files',
            'git commit to complete the merge'
          ],
          damageIfCorrect: 22, damageIfOptimal: 36,
          damageToHeroIfWrong: 20
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'A head hisses a countdown. <strong>Sequence the correct order for tagging and publishing a new release.</strong>',
          steps: [
            'Confirm the release commit is the correct, final one',
            'Create an annotated tag on that commit',
            'Push the tag to the remote',
            'Confirm the tag shows up correctly on the remote'
          ],
          damageIfCorrect: 22, damageIfOptimal: 36,
          damageToHeroIfWrong: 20
        }
      ]
    },
    {
      name: 'Level 3 — Advanced Basics',
      hp: 145,
      questions: [
        {
          mode: 'terminal',
          prompt: 'The Hydra opens an old scroll: <strong>"Interactively rebase the last 3 commits, so you can reorder/squash/edit them."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 40,
          hintNudge: 'git rebase, an interactive flag, then a reference to "3 commits back."',
          hintPartial: 'git rebase -_ HEAD~_',
          hintFull: 'git rebase -i HEAD~3',
          acceptablePatterns: [],
          optimalPatterns: [/^git\s+rebase\s+-i\s+HEAD~3$/i],
          baseCmds: ['git']
        },
        {
          mode: 'terminal',
          prompt: 'A head plucks a single fruit from another tree: <strong>"Apply just the commit <code>a1b2c3d</code> from another branch onto your current branch."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 40,
          hintNudge: 'A dedicated command grabs one specific commit and replays it here.',
          hintPartial: 'git c______-____ a1b2c3d',
          hintFull: 'git cherry-pick a1b2c3d',
          acceptablePatterns: [],
          optimalPatterns: [/^git\s+cherry-pick\s+a1b2c3d$/i],
          baseCmds: ['git']
        },
        {
          mode: 'terminal',
          prompt: 'The Hydra rewinds cautiously: <strong>"Undo the last commit, but keep its changes staged (not lost)."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28, timeAllotted: 40,
          hintNudge: 'git reset, with a flag that keeps changes staged rather than discarding them.',
          hintPartial: 'git reset --____ HEAD~1',
          hintFull: 'git reset --soft HEAD~1',
          acceptablePatterns: [],
          optimalPatterns: [/^git\s+reset\s+--soft\s+HEAD~1$/i],
          baseCmds: ['git']
        },
        {
          mode: 'terminal',
          prompt: 'A head strikes without mercy: <strong>"Completely discard the last commit AND its changes, no trace left in the working directory."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 40,
          hintNudge: 'git reset, with the flag that wipes everything, not just un-commits it.',
          hintPartial: 'git reset --____ HEAD~1',
          hintFull: 'git reset --hard HEAD~1',
          acceptablePatterns: [],
          optimalPatterns: [/^git\s+reset\s+--hard\s+HEAD~1$/i],
          baseCmds: ['git']
        },
        {
          mode: 'terminal',
          prompt: 'The Hydra offers an antidote rather than erasing the wound: <strong>"Undo the changes from commit <code>a1b2c3d</code> by creating a NEW commit that reverses it, WITHOUT rewriting history."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 40,
          hintNudge: 'A dedicated command creates a brand-new, opposite commit instead of erasing the original.',
          hintPartial: 'git r_____ a1b2c3d',
          hintFull: 'git revert a1b2c3d',
          acceptablePatterns: [],
          optimalPatterns: [/^git\s+revert\s+a1b2c3d$/i],
          baseCmds: ['git']
        },
        {
          mode: 'terminal',
          prompt: 'A head remembers everything, even what was erased: <strong>"Show a log of every place HEAD has pointed to recently, including commits no longer on any branch."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 40,
          hintNudge: 'A dedicated command tracks HEAD\'s own movement history, separate from the normal commit log.',
          hintPartial: 'git ref___',
          hintFull: 'git reflog',
          acceptablePatterns: [],
          optimalPatterns: [/^git\s+reflog$/i],
          baseCmds: ['git']
        },
        {
          mode: 'terminal',
          prompt: 'The Hydra maps every branching path: <strong>"Show the commit history as a visual graph, with branches and merges drawn out."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28, timeAllotted: 40,
          hintNudge: 'git log with a graph flag, usually combined with --oneline for readability.',
          hintPartial: 'git log --_____ --_______',
          hintFull: 'git log --graph --oneline',
          acceptablePatterns: [/^git\s+log\s+--graph$/i],
          optimalPatterns: [/^git\s+log\s+--graph\s+--oneline$/i],
          baseCmds: ['git']
        },
        {
          mode: 'terminal',
          prompt: 'A head adopts a smaller creature: <strong>"Add the repository at <code>https://github.com/lib/utils.git</code> as a submodule."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 40,
          hintNudge: 'git submodule, with an add subcommand and the URL.',
          hintPartial: 'git submodule a__ https://github.com/lib/utils.git',
          hintFull: 'git submodule add https://github.com/lib/utils.git',
          acceptablePatterns: [],
          optimalPatterns: [/^git\s+submodule\s+add\s+https:\/\/github\.com\/lib\/utils\.git$/i],
          baseCmds: ['git']
        },
        {
          mode: 'terminal',
          prompt: 'The Hydra begins the hunt: <strong>"Start a binary search through commit history to find which commit introduced a bug."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 40,
          hintNudge: 'A dedicated command family for exactly this — narrowing down a regression by testing commits in a smart binary-search pattern.',
          hintPartial: 'git b_____ s____',
          hintFull: 'git bisect start',
          acceptablePatterns: [],
          optimalPatterns: [/^git\s+bisect\s+start$/i],
          baseCmds: ['git']
        },
        {
          mode: 'spot_the_bug',
          prompt: 'The Hydra shows a torn scroll: <strong>"An interactive rebase\'s squash line is written wrong and the rebase aborts. Find and fix the bug."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36, timeAllotted: 40,
          hintNudge: 'The interactive rebase todo keyword for squashing into the PREVIOUS commit is "squash" (or "s") — check the exact keyword used.',
          hintPartial: 'Line 2 uses "squish", which isn\'t a real rebase todo keyword — Git doesn\'t recognize it and aborts.',
          hintFull: 'Line 2 should read: squash d4e5f6a add missing validation',
          codeBlock: [
            'pick a1b2c3d initial implementation',
            'squish d4e5f6a add missing validation'
          ],
          buggyLineId: 1,
          correctFixPatterns: [/^squash\s+d4e5f6a\s+add\s+missing\s+validation$/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A torn thread dangles: <strong>"A cherry-pick left conflict markers committed straight into the file, unresolved. Find and fix the bug."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36, timeAllotted: 40,
          hintNudge: 'A cherry-pick that hits a conflict needs the SAME manual resolution as any merge conflict — markers left in and committed as-is is the same underlying mistake.',
          hintPartial: 'Line 2 still has raw conflict markers — resolve them to the correct final code before completing the cherry-pick.',
          hintFull: 'Line 2 should read just: return calculateTotal(items, tax);',
          codeBlock: [
            'function checkout(items, tax) {',
            '<<<<<<< HEAD\nreturn calculateTotal(items);\n=======\nreturn calculateTotal(items, tax);\n>>>>>>> a1b2c3d'
          ],
          buggyLineId: 1,
          correctFixPatterns: [/return\s+calculateTotal\(items,\s*tax\);/]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'The Hydra\'s eye narrows: <strong>"A submodule shows as modified right after a fresh clone, before anyone touched anything. Find and fix the bug."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36, timeAllotted: 40,
          hintNudge: 'A fresh clone doesn\'t automatically download submodule content — an uninitialized submodule can show as "modified" simply because it\'s empty, not because it was changed.',
          hintPartial: 'The submodule was never actually initialized/fetched after cloning — run the dedicated command to pull down its real content.',
          hintFull: 'Run: git submodule update --init --recursive',
          codeBlock: [
            '$ git clone --recurse-submodules-forgotten https://github.com/team/app.git',
            '$ git status',
            'modified: lib/utils (new commits)'
          ],
          buggyLineId: 1,
          correctFixPatterns: [/git\s+submodule\s+update\s+--init/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A stray head hisses: <strong>"A bisect session is marking the wrong commits, never converging on the actual bug. Find and fix the bug."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36, timeAllotted: 40,
          hintNudge: 'bisect only works correctly if "good" and "bad" are marked accurately for each commit it checks out — check whether they were swapped.',
          hintPartial: 'Line 2 marks the CURRENT (buggy) commit as "good" — that\'s backwards, and confuses bisect\'s binary search into narrowing in the wrong direction entirely.',
          hintFull: 'Line 2 should read: git bisect bad',
          codeBlock: [
            'git bisect start',
            'git bisect good'
          ],
          buggyLineId: 1,
          correctFixPatterns: [/^git\s+bisect\s+bad$/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A silent head watches a vanished record: <strong>"A commit was lost after an accidental reset --hard, and now no one can find it. Find and fix the bug."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36, timeAllotted: 40,
          hintNudge: 'A "lost" commit from reset --hard usually isn\'t actually gone yet — Git keeps a record of where HEAD used to point, even after a hard reset, for a while.',
          hintPartial: 'Check the reflog — the commit is almost certainly still there, just no longer pointed to by any branch, and reflog remembers HEAD\'s recent history.',
          hintFull: 'Run: git reflog (to find the lost commit\'s hash), then git reset --hard <that-hash> (or git branch recovered-work <that-hash>) to get it back.',
          codeBlock: [
            '$ git reset --hard HEAD~1',
            '(the previous commit now seems to have vanished)'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/git\s+reflog/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The Hydra tilts one head: <strong>"A commit was already pushed and shared with the team, and it turns out to be wrong. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 38, timeAllotted: 40,
          hintNudge: 'One option rewrites history that others already have local copies of. One creates a new commit undoing the change, leaving history intact for everyone.',
          hintPartial: 'Once a commit is shared, revert is the safe choice — it creates a new commit undoing the change without rewriting anything anyone else already has.',
          hintFull: 'Best: git revert — for an ALREADY-SHARED commit, this is the safe option since it doesn\'t rewrite history anyone else has; git reset would rewrite history and cause the exact same painful sync issues as rebasing a shared branch.',
          options: [
            { id: 'a', label: 'git reset --hard to the commit before it, then force-push', tier: 'wrong', why: 'Rewrites history everyone else already has locally — the next person to pull hits a confusing, painful mismatch, the same well-known problem as rebasing an already-shared branch.' },
            { id: 'b', label: 'git revert the bad commit', tier: 'best', why: 'Creates a new commit that undoes the change, without touching or rewriting anything anyone else already has — the safe option once a commit has been shared.' },
            { id: 'c', label: 'Leave it as-is and just fix it forward in a completely unrelated future commit', tier: 'defensible', why: 'Technically works eventually, but leaves the specific mistake undocumented as a mistake in history — a revert makes the correction and its reason explicit and traceable.' }
          ],
          justificationPatterns: [/revert|already\s*shared|doesn'?t\s*rewrite|safe/i]
        },
        {
          mode: 'triage_call',
          prompt: 'A second head weighs the choice: <strong>"Cleaning up a messy feature branch\'s commit history (typo fixes, \'oops\' commits) before opening a PR. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 38, timeAllotted: 40,
          hintNudge: 'This branch is NOT yet shared (no PR opened yet, presumably not pushed to a shared remote branch) — rewriting its own not-yet-shared history is exactly what interactive rebase is safe and designed for.',
          hintPartial: 'Since this branch isn\'t shared yet, interactive rebase to squash the messy "oops"/typo commits into clean, meaningful ones is exactly the safe, intended use case.',
          hintFull: 'Best: git rebase -i to squash/reword the messy commits into a clean history before opening the PR — safe because the branch isn\'t shared yet, and reviewers get a much more readable, meaningful commit history to review.',
          options: [
            { id: 'a', label: 'Leave the messy history as-is — reviewers can just look at the final diff', tier: 'defensible', why: 'Works functionally, but a string of "oops," "typo," "fix fix fix" commits makes the actual review and future git blame/log history genuinely harder to follow for no real benefit.' },
            { id: 'b', label: 'Interactive rebase to squash/reword into a clean history before opening the PR', tier: 'best', why: 'Exactly the safe, intended use of interactive rebase — the branch isn\'t shared yet, so rewriting its own history has no downside, and it gives reviewers (and future git blame) a much cleaner story.' },
            { id: 'c', label: 'Delete the branch and redo the work from scratch, more carefully this time', tier: 'wrong', why: 'Throws away real, working code to solve a purely cosmetic history problem that a five-minute interactive rebase already solves without redoing anything.' }
          ],
          justificationPatterns: [/interactive\s*rebase|squash|not\s*(yet\s*)?shared|clean\s*history/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The Hydra\'s voice hisses: <strong>"A specific bug fix on main also needs to go onto an older, still-maintained release branch. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 38, timeAllotted: 40,
          hintNudge: 'You need exactly ONE specific commit on the other branch, not the whole history of main since they diverged — one command exists for grabbing just one commit.',
          hintPartial: 'cherry-pick grabs just that one specific commit and replays it onto the release branch, without pulling in everything else that\'s happened on main since they diverged.',
          hintFull: 'Best: git cherry-pick the specific fix commit onto the release branch — merging all of main in would drag in every other unrelated change since the branches diverged, which a release branch usually shouldn\'t receive.',
          options: [
            { id: 'a', label: 'Merge main into the release branch', tier: 'wrong', why: 'Pulls in EVERY change on main since the branches diverged, not just the one needed fix — exactly the kind of unrelated scope creep a stable release branch should avoid.' },
            { id: 'b', label: 'git cherry-pick the specific fix commit onto the release branch', tier: 'best', why: 'Applies exactly the one needed change, and nothing else — the standard, precise tool for "backport this one fix" without dragging in unrelated history.' },
            { id: 'c', label: 'Manually re-type the same code change directly on the release branch', tier: 'defensible', why: 'Works, but loses the direct commit-history link back to the original fix, and risks a subtle typo/difference between the two copies of "the same" change.' }
          ],
          justificationPatterns: [/cherry.?pick|specific\s*commit|backport/i]
        },
        {
          mode: 'triage_call',
          prompt: 'A final head coils back: <strong>"You need to undo the last 2 commits on a branch that is entirely local and has never been pushed anywhere. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 38, timeAllotted: 40,
          hintNudge: 'Nobody else has ever seen these commits — there\'s zero shared-history risk here, which is exactly the condition under which the simpler, more direct undo tool is the right choice.',
          hintPartial: 'Since nothing has ever been pushed or shared, git reset is simpler and more direct than revert — there\'s no shared-history risk to worry about at all.',
          hintFull: 'Best: git reset (soft or hard, depending on whether you want to keep the changes) — since the branch is entirely local and unshared, there\'s no downside to directly removing the commits, unlike revert\'s "create an undo commit" approach which is really for already-shared history.',
          options: [
            { id: 'a', label: 'git revert each of the 2 commits', tier: 'defensible', why: 'Works, but adds two extra "undo" commits to a branch that could just have the mistaken commits cleanly removed instead — revert\'s real value is for ALREADY-SHARED history, which this isn\'t.' },
            { id: 'b', label: 'git reset (soft or hard) to before the 2 commits', tier: 'best', why: 'Directly and cleanly removes commits nobody else has ever seen — the simpler, more direct tool, appropriate exactly because there\'s no shared-history risk here at all.' },
            { id: 'c', label: 'Delete the branch and recreate it from main', tier: 'wrong', why: 'Throws away any other real work on the branch beyond just those 2 commits — reset targets precisely what needs undoing without touching anything else.' }
          ],
          justificationPatterns: [/reset|local|never\s*(been\s*)?(pushed|shared)|no\s*shared.?history\s*risk/i]
        },
        {
          mode: 'read_the_room',
          prompt: 'A head recoils sharply. <strong>A cherry-pick stops midway with a conflict. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40, timeAllotted: 40,
          hintNudge: 'Same underlying cause as any merge conflict — the commit being cherry-picked changes lines that have also changed differently on the current branch.',
          hintPartial: 'The commit being cherry-picked touches the same lines that have diverged on the current branch — Git needs a manual decision on how to combine them.',
          hintFull: 'Diagnosis: the cherry-picked commit conflicts with changes already on the current branch. Fix: resolve the conflict markers manually, git add the resolved file, then git cherry-pick --continue.',
          outputBlock: [
            '$ git cherry-pick a1b2c3d',
            'CONFLICT (content): Merge conflict in checkout.js',
            'error: could not apply a1b2c3d... Fix checkout bug'
          ],
          acceptableDiagnosesPatterns: [/conflict/i, /diverged\s*lines?/i, /same\s*lines?\s*changed/i],
          followUpFix: {
            prompt: 'After manually resolving and staging the file, continue the cherry-pick:',
            acceptablePatterns: [],
            optimalPatterns: [/^git\s+cherry-pick\s+--continue$/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A head coils in confusion. <strong>An interactive rebase stopped partway through, with the terminal showing an unfamiliar detached-HEAD-like state. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40, timeAllotted: 40,
          hintNudge: 'An interactive rebase applies commits ONE AT A TIME — if one of them conflicts with the base, the whole rebase pauses right there until that specific conflict is resolved.',
          hintPartial: 'One of the commits being replayed conflicted with the new base — the rebase paused exactly there, waiting for the conflict to be resolved before it can continue applying the rest.',
          hintFull: 'Diagnosis: the rebase hit a conflict on one of the commits being replayed and paused. Fix: resolve the conflict markers, git add the file, then git rebase --continue (or git rebase --abort to cancel entirely and go back to how things were).',
          outputBlock: [
            '$ git rebase -i HEAD~3',
            'CONFLICT (content): Merge conflict in app.js',
            'error: could not apply d4e5f6a... Add validation'
          ],
          acceptableDiagnosesPatterns: [/rebase.*conflict/i, /paused|stopped.*mid/i],
          followUpFix: {
            prompt: 'After resolving and staging, continue the rebase:',
            acceptablePatterns: [],
            optimalPatterns: [/^git\s+rebase\s+--continue$/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A silent head watches an unreachable branch. <strong>A commit that definitely existed no longer shows up in "git log". Diagnose it, then fix it.</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40, timeAllotted: 40,
          hintNudge: 'git log only shows commits reachable from your CURRENT branch/HEAD — a commit can genuinely still exist while being unreachable from where you\'re currently looking.',
          hintPartial: 'The commit still exists in Git\'s object database — it\'s just no longer reachable from any branch you\'re currently on, likely after a rebase or reset moved things around.',
          hintFull: 'Diagnosis: the commit exists but isn\'t reachable from the current branch (e.g. after a rebase/reset). Fix: check the reflog, which tracks HEAD\'s movement even for now-unreachable commits, to find and recover it.',
          outputBlock: [
            '$ git log --oneline',
            '(the commit that was made yesterday is nowhere in this list)',
            '',
            '$ git log --all --oneline',
            '(still not there — it\'s not reachable from ANY branch)'
          ],
          acceptableDiagnosesPatterns: [/unreachable/i, /not\s*reachable\s*from\s*(any\s*)?branch/i, /reflog/i],
          followUpFix: {
            prompt: 'Check the reflog to find and recover it:',
            acceptablePatterns: [],
            optimalPatterns: [/^git\s+reflog$/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'Two heads hiss in disagreement. <strong>A bisect session ends, but the commit it names as the culprit doesn\'t actually look related to the bug at all. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40, timeAllotted: 40,
          hintNudge: 'bisect\'s result is only as accurate as the "good"/"bad" markings given to it during the session — a mistaken marking anywhere along the way skews the whole binary search.',
          hintPartial: 'One of the commits was almost certainly marked "good" or "bad" incorrectly partway through the session — a single wrong marking sends the binary search toward the wrong final commit entirely.',
          hintFull: 'Diagnosis: an incorrect good/bad marking during the bisect session led it to the wrong commit. Fix: run git bisect reset to cancel, then restart the session, testing each commit more carefully before marking it.',
          outputBlock: [
            '$ git bisect good',
            '(after testing several commits)',
            'a1b2c3d is the first bad commit',
            '(but this commit only touches an unrelated README file)'
          ],
          acceptableDiagnosesPatterns: [/mismark|incorrect(ly)?\s*mark/i, /wrong\s*(good|bad)\s*marking/i],
          followUpFix: {
            prompt: 'Cancel the bisect session so you can restart it more carefully:',
            acceptablePatterns: [],
            optimalPatterns: [/^git\s+bisect\s+reset$/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A silent head watches the same wound reopen. <strong>"git rebase --continue" keeps hitting the same conflict, over and over, no matter how many times it\'s run. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40, timeAllotted: 40,
          hintNudge: 'Resolving a conflict\'s markers in the file isn\'t enough by itself — Git needs the resolved file explicitly STAGED before --continue will actually move past it.',
          hintPartial: 'The conflict markers were edited and removed in the file, but the file was never git add-ed afterward — Git still sees it as unresolved and keeps re-presenting the same conflict.',
          hintFull: 'Diagnosis: the resolved file was never staged before running --continue. Fix: git add the resolved file, THEN run git rebase --continue.',
          outputBlock: [
            '$ git rebase --continue',
            'error: you have not resolved that merge (app.js)',
            '(repeats every single time, despite editing the file each time)'
          ],
          acceptableDiagnosesPatterns: [/never\s*staged/i, /not\s*(git\s*)?add(ed)?/i, /forgot\s*to\s*add/i],
          followUpFix: {
            prompt: 'Fix it by staging the resolved file before continuing:',
            acceptablePatterns: [],
            optimalPatterns: [/^git\s+add\s+app\.js$/i]
          }
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'The Hydra\'s three heads sway together. <strong>Sequence the correct order for cleaning up a messy branch with interactive rebase before opening a PR.</strong>',
          steps: [
            'git rebase -i against the base branch',
            'Mark commits to squash/reword/reorder in the todo list',
            'Resolve any conflicts that come up during replay',
            'Force-push the cleaned-up branch (with --force-with-lease)'
          ],
          damageIfCorrect: 24, damageIfOptimal: 40,
          damageToHeroIfWrong: 22
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'A head hisses a countdown. <strong>Sequence the correct order for using bisect to find a regression.</strong>',
          steps: [
            'git bisect start',
            'Mark the current commit as bad',
            'Mark a known-good older commit as good',
            'Test each commit bisect checks out, marking good or bad',
            'git bisect reset once the culprit commit is found'
          ],
          damageIfCorrect: 24, damageIfOptimal: 40,
          damageToHeroIfWrong: 22
        }
      ]
    },
    {
      name: 'Level 4 — Real Incidents',
      hp: 165,
      questions: [
        {
          mode: 'terminal',
          prompt: 'The Hydra strikes with restraint: <strong>"Force-push your branch, but SAFELY — refuse if the remote has commits you don\'t have locally."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 32,
          hintNudge: 'A safer variant of force-push checks the remote hasn\'t moved since you last saw it, refusing if it has.',
          hintPartial: 'git push --_____-____-_____',
          hintFull: 'git push --force-with-lease',
          acceptablePatterns: [/^git\s+push\s+--force$/i],
          optimalPatterns: [/^git\s+push\s+--force-with-lease$/i],
          baseCmds: ['git']
        },
        {
          mode: 'terminal',
          prompt: 'A head traces one file\'s whole story: <strong>"Show the full commit history AND diffs, but only for changes to <code>app.js</code>."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28, timeAllotted: 32,
          hintNudge: 'git log with the patch flag, then the specific file path.',
          hintPartial: 'git log -_ app.js',
          hintFull: 'git log -p app.js',
          acceptablePatterns: [],
          optimalPatterns: [/^git\s+log\s+-p\s+app\.js$/i],
          baseCmds: ['git']
        },
        {
          mode: 'terminal',
          prompt: 'The Hydra weighs the damage: <strong>"Show a summary of how many lines changed in each file since the last commit — not the full diff text."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26, timeAllotted: 32,
          hintNudge: 'git diff with a summary-stats flag.',
          hintPartial: 'git diff --____',
          hintFull: 'git diff --stat',
          acceptablePatterns: [],
          optimalPatterns: [/^git\s+diff\s+--stat$/i],
          baseCmds: ['git']
        },
        {
          mode: 'terminal',
          prompt: 'A head sweeps the ground clean: <strong>"Remove every untracked file AND untracked directory from the working directory."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28, timeAllotted: 32,
          hintNudge: 'git clean, with a force flag and a directories flag.',
          hintPartial: 'git clean -__',
          hintFull: 'git clean -fd',
          acceptablePatterns: [],
          optimalPatterns: [/^git\s+clean\s+-fd$/i],
          baseCmds: ['git']
        },
        {
          mode: 'terminal',
          prompt: 'The Hydra opens a second den: <strong>"Check out the branch <code>hotfix</code> into a SEPARATE working directory, without disturbing your current one."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 32,
          hintNudge: 'A dedicated command lets multiple branches be checked out simultaneously, each in its own directory.',
          hintPartial: 'git w_______ add ../hotfix-dir hotfix',
          hintFull: 'git worktree add ../hotfix-dir hotfix',
          acceptablePatterns: [],
          optimalPatterns: [/^git\s+worktree\s+add\s+\.\.\/hotfix-dir\s+hotfix$/i],
          baseCmds: ['git']
        },
        {
          mode: 'terminal',
          prompt: 'A head searches old records by scent: <strong>"Find every commit whose message mentions \'payment\'."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28, timeAllotted: 32,
          hintNudge: 'git log with a message-search flag.',
          hintPartial: 'git log --____=payment',
          hintFull: 'git log --grep=payment',
          acceptablePatterns: [],
          optimalPatterns: [/^git\s+log\s+--grep=payment$/i],
          baseCmds: ['git']
        },
        {
          mode: 'terminal',
          prompt: 'The Hydra tallies contributions: <strong>"Show a summary of commit counts, grouped by author."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28, timeAllotted: 32,
          hintNudge: 'A dedicated command summarizes commit counts per author.',
          hintPartial: 'git sh________',
          hintFull: 'git shortlog',
          acceptablePatterns: [],
          optimalPatterns: [/^git\s+shortlog(\s+-sn)?$/i],
          baseCmds: ['git']
        },
        {
          mode: 'terminal',
          prompt: 'A head confirms its exact position: <strong>"Print the full commit hash of the current HEAD."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26, timeAllotted: 32,
          hintNudge: 'A dedicated low-level command resolves a reference name to its actual hash.',
          hintPartial: 'git r__-p____ HEAD',
          hintFull: 'git rev-parse HEAD',
          acceptablePatterns: [],
          optimalPatterns: [/^git\s+rev-parse\s+HEAD$/i],
          baseCmds: ['git']
        },
        {
          mode: 'spot_the_bug',
          prompt: 'The Hydra shows a torn scroll: <strong>"A teammate\'s force-push just silently overwrote another teammate\'s pushed commits. Find and fix the bug."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 32,
          hintNudge: 'A plain --force push overwrites the remote no matter what\'s there — a safer variant refuses if the remote has moved since you last fetched it.',
          hintPartial: 'Line 1 uses a bare --force, which overwrites blindly — --force-with-lease would have refused since the remote had moved since it was last seen.',
          hintFull: 'Line 1 should read: git push --force-with-lease',
          codeBlock: [
            'git push --force origin feature-x'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/^git\s+push\s+--force-with-lease\s+origin\s+feature-x$/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A torn thread dangles: <strong>"A pre-commit hook is supposed to run linting, but it never actually runs. Find and fix the bug."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 32,
          hintNudge: 'Git hook scripts have to actually be marked EXECUTABLE, or Git silently skips them without any error.',
          hintPartial: 'The hook file exists with the right content, but it\'s missing execute permission — Git silently skips a hook it can\'t execute, with no warning at all.',
          hintFull: 'Run: chmod +x .git/hooks/pre-commit',
          codeBlock: [
            '$ ls -l .git/hooks/pre-commit',
            '-rw-r--r-- 1 dev dev 340 pre-commit',
            '(committing never triggers the lint check inside it)'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/^chmod\s+\+x\s+\.git\/hooks\/pre-commit$/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'The Hydra\'s eye narrows: <strong>"A real API key was just committed directly into a config file, in the most recent commit only. Find and fix the bug."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36, timeAllotted: 32,
          hintNudge: 'If the secret is ONLY in the single most recent commit (not pushed elsewhere, not buried deep in history), amending that one commit to remove it is enough — no need for a full history rewrite.',
          hintPartial: 'Remove the secret from the file, then amend the last commit to replace it, rather than creating a whole new commit that still leaves the secret sitting in the previous commit\'s history.',
          hintFull: 'Run: (after removing the key from the file and git add-ing it) git commit --amend --no-edit — then rotate the key regardless, since it may have already been seen.',
          codeBlock: [
            '$ git log -p -1 config.js',
            '+ API_KEY = "sk_live_51H8x9K2eZv"',
            '(this is the very latest commit, not yet pushed anywhere)'
          ],
          buggyLineId: 1,
          correctFixPatterns: [/git\s+commit\s+--amend/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A stray head hisses: <strong>"Everyone on the team gets different line-ending diffs (CRLF vs LF) on the exact same files. Find and fix the bug."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 32,
          hintNudge: 'A .gitattributes file (missing or misconfigured here) is meant to normalize line endings consistently across every contributor\'s OS.',
          hintPartial: 'There\'s no .gitattributes file at all — add one declaring a consistent line-ending policy so Git normalizes it the same way for everyone, regardless of OS.',
          hintFull: 'Create a .gitattributes file containing: * text=auto',
          codeBlock: [
            '(no .gitattributes file exists in this repo)'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/\.gitattributes|text=auto/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The Hydra tilts one head: <strong>"You need to force-push after an interactive rebase on a branch ONLY you work on. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 38, timeAllotted: 32,
          hintNudge: 'Even on a branch only you work on, a safer force-push variant costs nothing and protects against a rare-but-real accident (e.g. you pushed from a second machine and forgot).',
          hintPartial: 'force-with-lease costs nothing extra here and protects against the rare accident of forgetting you pushed from somewhere else — there\'s no real downside to defaulting to the safer option.',
          hintFull: 'Best: git push --force-with-lease, as the default habit — even on a "just me" branch, it costs nothing and protects against the rare real accident (a second machine, a teammate temporarily added to help) that plain --force would silently steamroll.',
          options: [
            { id: 'a', label: 'Plain git push --force, since it\'s only your own branch anyway', tier: 'defensible', why: 'Usually fine in practice, but has zero protection against the rare real accident (pushing from a second machine, briefly sharing the branch) — force-with-lease costs nothing extra and covers that case.' },
            { id: 'b', label: 'git push --force-with-lease', tier: 'best', why: 'Same result in the normal case, but refuses if the remote unexpectedly moved since you last saw it — a free safety net worth making the default habit, even on solo branches.' },
            { id: 'c', label: 'Avoid rebasing/force-pushing entirely, always merge instead', tier: 'defensible', why: 'Sidesteps the need for force-push altogether, but gives up the cleaner linear history rebase provides for a solo branch where that history rewriting is actually completely safe.' }
          ],
          justificationPatterns: [/force-with-lease|safety\s*net|costs\s*nothing|protect/i]
        },
        {
          mode: 'triage_call',
          prompt: 'A second head weighs the choice: <strong>"A secret was committed 15 commits ago and has since been pushed and pulled by the whole team. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 38, timeAllotted: 32,
          hintNudge: 'Rewriting history 15 commits deep, on a branch everyone already has, causes the same real disruption as any shared-history rewrite — and doesn\'t even solve the actual urgent problem by itself.',
          hintPartial: 'Rotate the credential FIRST, immediately, regardless of what happens to history — the secret has already been seen by everyone who pulled, so it must be treated as compromised no matter what git surgery follows.',
          hintFull: 'Best: rotate/revoke the credential immediately (it\'s already been exposed to everyone who pulled) — THEN, as a separate, coordinated effort (with the team, since it rewrites shared history), consider tools like git filter-repo or BFG to scrub it from history, understanding that\'s a disruptive team-wide operation, not the urgent fix.',
          options: [
            { id: 'a', label: 'Immediately rewrite history 15 commits back to remove it, then force-push', tier: 'wrong', why: 'A disruptive, shared-history rewrite that everyone has to deal with (re-cloning or carefully re-basing their own work) — and it doesn\'t even solve the real urgent problem, since the secret has already been seen by everyone who already pulled.' },
            { id: 'b', label: 'Rotate the credential immediately, then coordinate a separate history-cleanup effort with the team', tier: 'best', why: 'Fixes the actual urgent risk (an exposed, still-valid credential) right away — the history rewrite is a real but secondary cleanup step that needs team coordination, not a five-minute solo fix.' },
            { id: 'c', label: 'Leave history alone and just remove the secret in a new commit going forward', tier: 'wrong', why: 'Doesn\'t rotate the actual compromised credential — leaves a valid, exposed secret usable by anyone who saw it, which is the real risk that needs addressing first.' }
          ],
          justificationPatterns: [/rotate|revoke|compromised|immediately/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The Hydra\'s voice hisses: <strong>"A large binary file (200MB) was accidentally committed, then removed in a later commit — but the repo\'s clone size stays huge. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 38, timeAllotted: 32,
          hintNudge: 'Deleting a file in a NEW commit doesn\'t remove it from EARLIER commits — the 200MB blob is still sitting permanently in history, which is exactly what every clone has to download.',
          hintPartial: 'The file still exists in the earlier commit\'s history even though a later commit removed it — a history-rewriting tool is needed to actually purge it from every commit, not just add a new one removing it going forward.',
          hintFull: 'Best: use a tool built for this (git filter-repo, or the BFG Repo-Cleaner) to actually purge the file from every commit in history — simply deleting it in a new commit leaves it permanently sitting in the old commits everyone still has to clone.',
          options: [
            { id: 'a', label: 'It\'s already fixed — the file was deleted in a later commit', tier: 'wrong', why: 'Only removes it from the CURRENT working tree going forward — the 200MB blob is still permanently embedded in the earlier commit that every clone has to download regardless.' },
            { id: 'b', label: 'Use git filter-repo (or BFG Repo-Cleaner) to purge the file from all of history', tier: 'best', why: 'The correct tool for actually removing a file from every historical commit, genuinely shrinking clone size — a plain later-commit delete never touches the earlier commits still carrying it.' },
            { id: 'c', label: 'Tell everyone to just accept the large clone size going forward', tier: 'defensible', why: 'Avoids a disruptive history rewrite, but permanently taxes every future clone/fetch for a fixable problem — reasonable only if the team has already weighed that tradeoff deliberately.' }
          ],
          justificationPatterns: [/filter-repo|bfg|purge.*history|every\s*commit/i]
        },
        {
          mode: 'triage_call',
          prompt: 'A final head coils back: <strong>"You need to quickly fix a production hotfix while your working directory is deep in messy, uncommitted feature work. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 38, timeAllotted: 32,
          hintNudge: 'One option risks losing track of exactly where your feature work stood, buried under a stash. One option gives you a completely separate directory, leaving the feature work exactly as it was.',
          hintPartial: 'A worktree checks out the hotfix branch into an entirely separate directory, leaving your messy in-progress feature work completely untouched in its own directory — no stashing or context-juggling needed.',
          hintFull: 'Best: git worktree add for the hotfix — keeps the messy feature work exactly as it is in its own directory, avoiding the real risk of a deeply nested/forgotten stash, or the mental overhead of juggling stash pop timing correctly under pressure.',
          options: [
            { id: 'a', label: 'git stash the feature work, fix the hotfix, then stash pop afterward', tier: 'defensible', why: 'Works, but under real production pressure, correctly timing the stash pop (and not forgetting it, or popping onto the wrong branch) is a real, avoidable risk.' },
            { id: 'b', label: 'git worktree add a separate directory for the hotfix branch', tier: 'best', why: 'Leaves the messy feature work completely untouched in its own directory — no stashing, no risk of losing track of where things stood, clean separation under time pressure.' },
            { id: 'c', label: 'Commit the messy feature work as-is just to clear the way, fix now, clean up the commit later', tier: 'wrong', why: 'Leaves a genuinely broken/messy commit in history "for now" — under real pressure, "clean up later" reliably becomes "never," and it risks confusing anyone else looking at the branch meanwhile.' }
          ],
          justificationPatterns: [/worktree|separate\s*directory|untouched|clean\s*separation/i]
        },
        {
          mode: 'triage_call',
          prompt: 'A shadow-cast head weighs trust: <strong>"An external contractor needs to contribute code to a production repository. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 38, timeAllotted: 32,
          hintNudge: 'One option grants standing write access to the real repository from day one. One option lets them contribute through a mechanism that requires review before anything actually lands.',
          hintPartial: 'Have them work from a fork and submit PRs back — this requires review before anything they write actually merges, without granting standing write access to an unproven, external contributor.',
          hintFull: 'Best: fork + PR workflow — lets the contractor contribute fully while every change goes through review before merging, without handing an external, less-vetted contributor standing direct-push access to production code from day one.',
          options: [
            { id: 'a', label: 'Grant them direct push access to the main repository', tier: 'wrong', why: 'Hands an external, less-vetted contributor standing write access to production code with no required review step — real risk regardless of how much you trust them personally.' },
            { id: 'b', label: 'Have them work from a fork and submit changes via Pull Request', tier: 'best', why: 'Lets them contribute fully while every change goes through review before it can merge — appropriate caution for someone outside the core team, without blocking real collaboration.' },
            { id: 'c', label: 'Have them email you diffs to apply manually', tier: 'wrong', why: 'Loses all the real benefits of the actual review/PR tooling (inline comments, CI checks, a real audit trail) for no real security benefit over a proper fork+PR workflow.' }
          ],
          justificationPatterns: [/fork|pull\s*request|review\s*before|least\s*privilege/i]
        },
        {
          mode: 'read_the_room',
          prompt: 'A head recoils sharply. <strong>A teammate reports their pushed commits from yesterday are simply gone from the branch. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40, timeAllotted: 32,
          hintNudge: 'Commits don\'t just vanish on their own — check the branch\'s recent push history for a force-push that could have overwritten them.',
          hintPartial: 'Someone force-pushed to the branch after your teammate\'s commits landed, silently overwriting them on the remote — this is exactly the scenario --force-with-lease exists to prevent.',
          hintFull: 'Diagnosis: a force-push from someone else overwrote the branch, discarding your teammate\'s commits. Fix: the commits likely still exist in that person\'s local reflog or the old commit hash — recover them and re-push, then agree as a team to use --force-with-lease going forward.',
          outputBlock: [
            '$ git log origin/feature-x --oneline',
            '(yesterday\'s 3 commits are nowhere in the history)',
            '',
            '$ git reflog show origin/feature-x',
            '(shows a force-update event overwriting the previous tip)'
          ],
          acceptableDiagnosesPatterns: [/force.?push(ed)?/i, /overwrit(e|ten)/i],
          followUpFix: {
            prompt: 'Check whether the lost commits can still be recovered from someone\'s local reflog:',
            acceptablePatterns: [],
            optimalPatterns: [/^git\s+reflog$/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A head coils in confusion. <strong>A merge just introduced changes from a completely unrelated branch, by mistake. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40, timeAllotted: 32,
          hintNudge: 'Check the exact merge command that was actually run — a typo\'d or wrong branch name merges the wrong thing entirely, silently.',
          hintPartial: 'The wrong branch name was given to git merge — "feature-y" instead of the intended "feature-x" — pulling in an entirely unrelated set of changes.',
          hintFull: 'Diagnosis: the wrong branch was merged by mistake. Fix: if not yet pushed, git reset --hard to before the merge; if already pushed and shared, git revert -m 1 the merge commit instead.',
          outputBlock: [
            '$ git log --oneline -3',
            'a1b2c3d Merge branch \'feature-y\'',
            '(but feature-x was the one that was supposed to be merged)'
          ],
          acceptableDiagnosesPatterns: [/wrong\s*branch/i, /merged.*mistake/i, /typo.*branch/i],
          followUpFix: {
            prompt: 'If this hasn\'t been pushed yet, undo the mistaken merge:',
            acceptablePatterns: [/^git\s+revert\s+-m\s+1\s+a1b2c3d$/i],
            optimalPatterns: [/^git\s+reset\s+--hard\s+HEAD~1$/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A silent head watches two paths split apart. <strong>Local and remote branches have "diverged" — neither is simply ahead of the other. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40, timeAllotted: 32,
          hintNudge: '"Diverged" means BOTH sides have commits the other doesn\'t — commonly from an amended or rebased commit that changed a hash after it was already pushed once.',
          hintPartial: 'A commit was amended (or rebased) locally after it had already been pushed once — the local and remote copies of that commit now have different hashes, and Git sees them as two separate diverging histories.',
          hintFull: 'Diagnosis: local history was rewritten (amend/rebase) after already being pushed, causing local and remote to diverge. Fix: if the rewritten history is intentional and not yet widely pulled by others, force-push with --force-with-lease to make the remote match; otherwise merge to reconcile.',
          outputBlock: [
            '$ git status',
            'Your branch and \'origin/feature-x\' have diverged,',
            'and have 1 and 1 different commit each, respectively.'
          ],
          acceptableDiagnosesPatterns: [/rewritten\s*history/i, /amend(ed)?.*push/i, /rebase(d)?.*(after|already)\s*push/i],
          followUpFix: {
            prompt: 'If the rewrite was intentional and safe to share, update the remote to match:',
            acceptablePatterns: [],
            optimalPatterns: [/^git\s+push\s+--force-with-lease$/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A head freezes mid-hiss. <strong>"git commit" appears to hang forever, with no error and no output. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40, timeAllotted: 32,
          hintNudge: 'Without a -m flag, git commit opens an editor for the message — check whether the configured editor is something that\'s actually available/working in this environment.',
          hintPartial: 'git commit (no -m) is waiting on a text editor to open for the commit message, but the configured editor is misconfigured or unavailable in this environment — it looks "hung" but is really just waiting.',
          hintFull: 'Diagnosis: git is waiting on an editor for the commit message, and the configured editor never actually opened. Fix: either set a working editor (git config --global core.editor) or just pass a message directly with -m to skip the editor entirely.',
          outputBlock: [
            '$ git commit',
            '(no output, no prompt, terminal appears frozen)'
          ],
          acceptableDiagnosesPatterns: [/waiting\s*(on|for)\s*(an\s*)?editor/i, /editor.*(misconfigured|not\s*(set|working))/i],
          followUpFix: {
            prompt: 'Skip the editor entirely by passing a message directly:',
            acceptablePatterns: [],
            optimalPatterns: [/^git\s+commit\s+-m\s+".+"$/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A wary head narrows its gaze. <strong>A file was added to .gitignore, but teammates keep accidentally committing it anyway. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40, timeAllotted: 32,
          hintNudge: 'A force-add flag on git add explicitly BYPASSES .gitignore entirely — check whether that\'s what\'s actually happening.',
          hintPartial: 'A teammate is running git add -f (or their editor/IDE is force-adding it), which explicitly bypasses .gitignore — the ignore rule itself is fine, something is overriding it.',
          hintFull: 'Diagnosis: something (a teammate\'s habit, an IDE setting) is force-adding the file with -f, bypassing .gitignore entirely. Fix: check with the team for the source of the force-add, and consider a pre-commit hook that rejects commits containing that specific file as a backstop.',
          outputBlock: [
            '$ cat .gitignore',
            'config.local.js',
            '',
            '$ git log -p -- config.local.js',
            '(shows it being committed multiple times, weeks apart, by different people)'
          ],
          acceptableDiagnosesPatterns: [/force.?add(ed)?/i, /-f.*bypass/i, /bypass(es|ing)?\s*\.?gitignore/i],
          followUpFix: {
            prompt: 'Add a backstop to catch this going forward:',
            acceptablePatterns: [],
            optimalPatterns: [/pre-commit\s*hook|hooksPath/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A young head watches a slow crawl. <strong>Cloning the repository for a new team member\'s onboarding takes over 20 minutes and downloads several gigabytes, despite a small current codebase. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40, timeAllotted: 32,
          hintNudge: 'A full clone downloads the ENTIRE history by default — if that history has years of accumulated large files, even a tiny current codebase clones slowly.',
          hintPartial: 'The full commit history (years of it) is what\'s actually being downloaded, not the current small codebase — for a quick onboarding clone, you don\'t necessarily need every historical commit right away.',
          hintFull: 'Diagnosis: the full history (bloated over years) is what\'s slow to download, not the current codebase size. Fix: for a fast onboarding clone, use a shallow clone (--depth) to skip full history for now; separately, consider a real history cleanup (filter-repo/BFG) if this keeps being a recurring pain for everyone.',
          outputBlock: [
            '$ time git clone https://github.com/team/app.git',
            '(21 minutes, 4.1 GiB downloaded)',
            '',
            '$ du -sh app/ (after clone, excluding .git)',
            '45M'
          ],
          acceptableDiagnosesPatterns: [/full\s*history/i, /years.*(of\s*)?history/i, /historical\s*(data|commits)/i],
          followUpFix: {
            prompt: 'Give the new team member a fast onboarding clone for now:',
            acceptablePatterns: [],
            optimalPatterns: [/git\s+clone\s+--depth/i]
          }
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'The Hydra\'s three heads sway together. <strong>Sequence the correct order for safely recovering from an accidental force-push that overwrote teammates\' commits.</strong>',
          steps: [
            'Check reflog on any machine that had the old commits locally',
            'Identify the last-good commit hash before the overwrite',
            'Create/restore the branch at that commit',
            'Push it back (with --force-with-lease, coordinating with the team first)'
          ],
          damageIfCorrect: 26, damageIfOptimal: 42,
          damageToHeroIfWrong: 24
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'A head hisses a countdown. <strong>Sequence the correct order for handling a secret accidentally committed to a shared, already-pushed branch.</strong>',
          steps: [
            'Rotate/revoke the exposed credential immediately',
            'Coordinate with the team before rewriting any shared history',
            'Use a history-rewriting tool (filter-repo/BFG) to purge it from history',
            'Force-push the cleaned history and have everyone re-clone or carefully re-sync'
          ],
          damageIfCorrect: 26, damageIfOptimal: 42,
          damageToHeroIfWrong: 24
        }
      ]
    },
    {
      name: 'Level 5 — Interview-Caliber Judgment',
      hp: 185,
      questions: [
        {
          mode: 'terminal',
          prompt: 'The Hydra\'s form hardens: <strong>"Show the FULL history graph across every branch and ref, condensed to one line each."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 34,
          hintNudge: 'Combine the "every ref" flag with graph and oneline.',
          hintPartial: 'git log --___ --_____ --_______',
          hintFull: 'git log --all --graph --oneline',
          acceptablePatterns: [],
          optimalPatterns: [/^git\s+log\s+--all\s+--graph\s+--oneline$/i],
          baseCmds: ['git']
        },
        {
          mode: 'terminal',
          prompt: 'A deep hum resonates: <strong>"Check the repository\'s internal object database for corruption or dangling objects."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36,
          hintNudge: 'A dedicated low-level integrity-check command, literally named after this exact purpose.',
          hintPartial: 'git f___',
          hintFull: 'git fsck',
          acceptablePatterns: [],
          optimalPatterns: [/^git\s+fsck$/i],
          baseCmds: ['git']
        },
        {
          mode: 'terminal',
          prompt: 'The Hydra tidies its own den: <strong>"Clean up and optimize the local repository\'s storage — compress loose objects, prune unreachable ones."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 34,
          hintNudge: 'A short, dedicated maintenance command — "garbage collect."',
          hintPartial: 'git g_',
          hintFull: 'git gc',
          acceptablePatterns: [],
          optimalPatterns: [/^git\s+gc$/i],
          baseCmds: ['git']
        },
        {
          mode: 'terminal',
          prompt: 'A wary head checks a seal: <strong>"Verify that the commit <code>a1b2c3d</code> has a valid GPG signature."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36,
          hintNudge: 'A dedicated command verifies a specific commit\'s cryptographic signature.',
          hintPartial: 'git v_____-______ a1b2c3d',
          hintFull: 'git verify-commit a1b2c3d',
          acceptablePatterns: [],
          optimalPatterns: [/^git\s+verify-commit\s+a1b2c3d$/i],
          baseCmds: ['git']
        },
        {
          mode: 'terminal',
          prompt: 'The Hydra peers into its own raw anatomy: <strong>"Print the raw, decompressed content of the Git object with hash <code>a1b2c3d</code>."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36,
          hintNudge: 'A very low-level plumbing command prints the raw content of any object, given a pretty-print flag.',
          hintPartial: 'git c__-____ -_ a1b2c3d',
          hintFull: 'git cat-file -p a1b2c3d',
          acceptablePatterns: [],
          optimalPatterns: [/^git\s+cat-file\s+-p\s+a1b2c3d$/i],
          baseCmds: ['git']
        },
        {
          mode: 'spot_the_bug',
          prompt: 'The Hydra shows a torn scroll: <strong>"Signed commits are supposed to be verified in CI, but verification always fails, even for genuinely signed commits. Find and fix the bug."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40,
          hintNudge: 'Verifying a GPG signature requires the SIGNER\'S public key to actually be available/imported wherever verification runs — check whether CI even has it.',
          hintPartial: 'CI has no imported public keys for any of the team\'s signing keys at all — it can\'t verify a signature it has no key to check against, regardless of whether the commit is genuinely signed.',
          hintFull: 'Import the team\'s public signing keys into the CI environment\'s GPG keyring before running verification.',
          codeBlock: [
            '(CI job): git verify-commit HEAD',
            'gpg: Can\'t check signature: No public key'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/import.*(public\s*)?key|gpg.*import/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A torn thread dangles: <strong>"A .gitattributes merge strategy is set up to reduce conflicts, but it\'s silently discarding real changes during merges instead. Find and fix the bug."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40,
          hintNudge: 'A "union" merge strategy on a file that ISN\'T just an append-only log (like a changelog) can silently combine both sides in a way that loses real, meaningful structure/changes.',
          hintPartial: 'merge=union is applied to a structured config file where blindly concatenating both sides\' lines produces broken, meaningless output — union merging is only safe for genuinely append-only content like changelogs.',
          hintFull: 'Line 1 should be removed (or scoped only to genuinely append-only files, e.g. CHANGELOG.md merge=union) — a structured config file needs real conflict markers and manual resolution, not blind concatenation.',
          codeBlock: [
            'config/settings.yml merge=union'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/remove|CHANGELOG|append.?only/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'The Hydra\'s eye narrows: <strong>"Every developer\'s pre-commit hook behaves slightly differently, causing inconsistent results across the team. Find and fix the bug."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40,
          hintNudge: 'Anything inside .git/hooks/ is a purely LOCAL file, never tracked or shared by Git itself — each developer\'s copy can drift independently unless it\'s managed some other way.',
          hintPartial: 'Hooks live in .git/hooks/, which is never version-controlled or shared automatically — a tool like Husky (or a shared hooks-path config) is needed to keep them consistent across the whole team.',
          hintFull: 'Adopt a shared-hooks tool (e.g. Husky) or run: git config core.hooksPath .githooks (with .githooks/ committed to the repo) so every developer uses the same, tracked hook scripts.',
          codeBlock: [
            '(each developer manually created their own .git/hooks/pre-commit, by hand, at different times)'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/hooksPath|husky|shared\s*hooks/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The Hydra looms with menace: <strong>"Choosing a branching strategy (trunk-based vs. Git-flow) for a team that deploys multiple times per day. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 44,
          hintNudge: 'One strategy is built around long-lived branches (develop, release, hotfix) with real merge overhead. One is built around small, short-lived branches merged to main constantly, matching a fast deploy cadence.',
          hintPartial: 'Trunk-based development\'s small, short-lived branches and constant integration into main match a multiple-deploys-per-day cadence far better than Git-flow\'s heavier, longer-lived branch structure.',
          hintFull: 'Best: trunk-based development — its small, frequent merges to main align naturally with a team that ships multiple times a day; Git-flow\'s longer-lived develop/release branches add real process overhead that fights against that fast cadence.',
          options: [
            { id: 'a', label: 'Git-flow, for its structured release/hotfix branches', tier: 'wrong', why: 'Designed around longer release cycles with dedicated release/hotfix branches — that structure adds real process overhead that actively fights against a team shipping multiple times per day.' },
            { id: 'b', label: 'Trunk-based development', tier: 'best', why: 'Built around small, short-lived branches merged to main constantly — a natural fit for a team that\'s already deploying multiple times a day and needs minimal integration overhead.' },
            { id: 'c', label: 'No formal branching strategy — everyone commits directly to main', tier: 'wrong', why: 'Loses even basic isolation for in-progress work and code review — some form of short-lived branch + PR review is still valuable even at a fast deploy cadence.' }
          ],
          justificationPatterns: [/trunk.?based|short.?lived|frequent|match.*cadence/i]
        },
        {
          mode: 'triage_call',
          prompt: 'A tentacle-thin string curls: <strong>"Deciding branch protection rules for the main branch of a production repository. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 44,
          hintNudge: 'One approach relies purely on trust and good intentions. One approach makes the safe behavior (reviewed PRs, passing checks) the ONLY possible path, regardless of who\'s pushing.',
          hintPartial: 'Require PR review and passing CI checks before merge, and disable direct pushes to main entirely — trusting everyone to "just be careful" doesn\'t scale and doesn\'t prevent an honest mistake.',
          hintFull: 'Best: enforce required PR reviews and passing CI checks, and disable direct pushes to main — this makes the safe path the ONLY path, which protects against honest mistakes just as much as bad actors, without relying on anyone remembering to "be careful."',
          options: [
            { id: 'a', label: 'Trust the team to follow the process without enforcing it technically', tier: 'wrong', why: 'An honest mistake (an accidental direct push, a rushed unreviewed merge under deadline pressure) will eventually happen regardless of good intentions — enforcement exists specifically to prevent mistakes, not just bad actors.' },
            { id: 'b', label: 'Require PR review and passing CI, and technically disable direct pushes to main', tier: 'best', why: 'Makes the safe path the only path — protects against honest mistakes as reliably as deliberate bypass attempts, which relying on trust alone can never guarantee.' },
            { id: 'c', label: 'Require PR review only, without any CI check requirement', tier: 'defensible', why: 'A real improvement over nothing, but skips an automated, objective safety net (tests actually passing) that a human reviewer can miss under time pressure or a large diff.' }
          ],
          justificationPatterns: [/require.*(review|ci|check)|disable\s*direct\s*push|technically\s*enforce/i]
        },
        {
          mode: 'triage_call',
          prompt: 'A slab grinds within the stage: <strong>"A growing company is deciding between a monorepo and separate polyrepos for its ~15 services. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 44,
          hintNudge: 'The right answer depends heavily on how much the services actually share (code, dependencies, coordinated releases) and the team\'s real tooling maturity for handling a large single repo — there\'s no universal right answer.',
          hintPartial: 'Check how much the services actually share and whether they\'re usually released/changed together — heavy cross-service sharing and coordinated changes favor a monorepo; largely independent services favor polyrepos, and the "right" choice depends on this, not a blanket rule.',
          hintFull: 'Best: base the decision on actual coupling — a monorepo shines when services share a lot of code/dependencies and are often changed together, simplifying cross-service atomic changes; polyrepos fit better when services are genuinely independent, avoiding one repo\'s tooling/CI complexity growing unbounded.',
          options: [
            { id: 'a', label: 'Always choose monorepo — it\'s what large tech companies use', tier: 'wrong', why: 'Those companies also invested heavily in custom tooling to make a monorepo scale (custom build systems, CI sharding) — copying the structure without that same tooling investment can create real, painful CI/build-time problems.' },
            { id: 'b', label: 'Base the decision on how much the services actually share and how often they\'re changed together', tier: 'best', why: 'The actual factor that determines whether a monorepo\'s cross-service atomic changes are worth its complexity, or whether truly independent services are better served by separate repos — there\'s no universally correct answer independent of this.' },
            { id: 'c', label: 'Always choose polyrepos — one repo per service is simpler', tier: 'wrong', why: 'Simpler per-repo, but if the services are heavily coupled and frequently changed together, this creates real pain coordinating changes and versions across many separate repos.' }
          ],
          justificationPatterns: [/coupling|share.*code|changed\s*together|depends\s*on/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The Hydra\'s presence darkens: <strong>"Choosing a PR merge strategy — squash-merge, merge-commit, or rebase-merge — for a team\'s main branch. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 44,
          hintNudge: 'Consider what main\'s history should actually look like afterward — one PR\'s many small "wip"/"fix typo" commits collapsed into one meaningful commit, vs. preserving every individual commit, vs. never having merge commits at all.',
          hintPartial: 'Squash-merge is a strong default for most teams — it collapses each PR\'s often-messy internal commits (wip, fix typo, address review) into one clean, meaningful commit on main, keeping history readable.',
          hintFull: 'Best (as a strong general default): squash-merge — each PR becomes one clean, meaningful commit on main regardless of how messy its internal history was, which keeps main\'s history easy to read and bisect; merge-commit or rebase-merge can be better fits when a team specifically wants to preserve every individual commit\'s granularity.',
          options: [
            { id: 'a', label: 'Merge-commit, always, to preserve full history', tier: 'defensible', why: 'Preserves everything, but also means every PR\'s "wip"/"fix typo"/"address review comment" commits stay permanently in main\'s history, making it noisier and harder to read/bisect over time.' },
            { id: 'b', label: 'Squash-merge as the default', tier: 'best', why: 'Collapses each PR into one clean, meaningful commit regardless of how messy the internal work-in-progress history was — keeps main highly readable and easy to bisect, a strong default for most teams.' },
            { id: 'c', label: 'Rebase-merge, always, to keep a fully linear history with every individual commit preserved', tier: 'defensible', why: 'Gives a clean linear history AND preserves individual commits, but only works smoothly if contributors already keep their own commits clean — otherwise main still inherits the same messy "wip" commits squash-merge would have collapsed.' }
          ],
          justificationPatterns: [/squash|clean\s*(meaningful\s*)?commit|readable\s*history|bisect/i]
        },
        {
          mode: 'triage_call',
          prompt: 'A final tentacle rises: <strong>"A secret is discovered leaked in a git TAG that was created and pushed months ago, even though it was later removed from all branches. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 44,
          hintNudge: 'Removing something from BRANCHES doesn\'t remove it from a TAG still pointing at the old commit that contains it — the tag keeps that commit (and the secret inside it) permanently reachable and clonable.',
          hintPartial: 'The tag still points directly at the old commit containing the secret — removing it from branches did nothing to that tag, which keeps the exposed commit reachable and downloadable by anyone.',
          hintFull: 'Best: rotate the credential immediately (it must be treated as compromised, having been reachable via the tag this whole time), then also delete/recreate the tag pointing at a clean commit (both locally and on the remote) as part of the full cleanup.',
          options: [
            { id: 'a', label: 'Nothing to do — it was already removed from branches months ago', tier: 'wrong', why: 'Completely misses that the TAG still points directly at the old commit, keeping the secret reachable and clonable this entire time — removal from branches did nothing to the tag.' },
            { id: 'b', label: 'Rotate the credential immediately, then delete/recreate the tag on a clean commit', tier: 'best', why: 'Treats the credential as compromised (it\'s been reachable via the tag the whole time) and addresses the actual remaining exposure — the tag itself needs cleanup too, not just the branches.' },
            { id: 'c', label: 'Just delete the tag and consider it resolved', tier: 'wrong', why: 'Removes the pointer, but doesn\'t rotate the actual credential — anyone who already fetched that tag while it existed still has a fully valid, still-usable secret.' }
          ],
          justificationPatterns: [/rotate|tag.*(still|points)|delete.*tag|compromised/i]
        },
        {
          mode: 'triage_call',
          prompt: 'A shadow puppet twists strangely. <strong>Deciding on a commit message convention for a team that wants automated changelog generation and semantic versioning. Pick your move, then justify it in one line.</strong>',
          damageIfCorrect: 26, damageIfOptimal: 44,
          hintNudge: 'Automated tooling needs commit messages to follow a real, parseable, consistent structure — freeform messages give tooling nothing reliable to parse.',
          hintPartial: 'Adopt Conventional Commits (feat:, fix:, BREAKING CHANGE:, etc.) — a structured, machine-parseable format that automated changelog/semver tooling can reliably read, which freeform messages can\'t provide.',
          hintFull: 'Best: adopt a structured convention like Conventional Commits — its consistent, parseable prefixes (feat/fix/breaking) are exactly what automated changelog generation and semantic-version bumping tools need to work reliably; freeform commit messages give that tooling nothing consistent to parse.',
          options: [
            { id: 'a', label: 'Keep commit messages freeform, and write the changelog by hand each release', tier: 'defensible', why: 'Works, but directly contradicts the stated goal of AUTOMATED changelog generation — freeform messages give no consistent structure for a tool to parse.' },
            { id: 'b', label: 'Adopt a structured convention like Conventional Commits', tier: 'best', why: 'Provides the consistent, machine-parseable structure that automated changelog generation and semantic-version bumping actually need to function reliably.' },
            { id: 'c', label: 'Require a specific character length for every commit message', tier: 'wrong', why: 'Controls length, not structure or meaning — does nothing to give changelog/semver tooling the categorized information (is this a fix? a breaking change?) it actually needs.' }
          ],
          justificationPatterns: [/conventional\s*commits|structured|parseable|automated\s*tooling/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The final shadow lengthens. <strong>Deciding whether to ever allow force-push to a shared release branch. Pick your move, then justify it in one line.</strong>',
          damageIfCorrect: 26, damageIfOptimal: 44,
          hintNudge: 'A shared release branch is exactly the kind of history other automation/people depend on being stable — the real question is whether "never" is absolute, or whether a narrow, coordinated exception ever makes sense.',
          hintPartial: 'Disallow it by default (branch protection), but allow a narrow, explicitly-coordinated exception (with --force-with-lease, announced to the team, for a genuine emergency) rather than an absolute, no-exceptions-ever rule that has no escape hatch when a real emergency needs it.',
          hintFull: 'Best: disallow force-push to the release branch by default via branch protection, but keep a narrow, explicitly-coordinated emergency exception available (using --force-with-lease, with the team informed) — an absolute never-under-any-circumstances rule with zero escape hatch can itself become a problem during a genuine, rare emergency.',
          options: [
            { id: 'a', label: 'Allow it freely whenever someone thinks it\'s needed', tier: 'wrong', why: 'A shared release branch is exactly the kind of history other people and automation depend on being stable — unrestricted force-push access here is a real, avoidable risk for routine work.' },
            { id: 'b', label: 'Disallow it by default via branch protection, with a narrow coordinated emergency exception', tier: 'best', why: 'Protects the branch\'s stability for routine work while still leaving a real, deliberate escape hatch for the rare genuine emergency — an absolute rule with zero exception can itself cause problems when one is truly needed.' },
            { id: 'c', label: 'Make it technically impossible for anyone, ever, with no exception mechanism at all', tier: 'defensible', why: 'Maximizes safety, but removes any path forward if a genuine, rare emergency situation ever legitimately needs it — a coordinated exception process is usually a better balance than an absolute technical wall.' }
          ],
          justificationPatterns: [/branch\s*protection|coordinated\s*exception|default.*disallow|force-with-lease/i]
        },
        {
          mode: 'read_the_room',
          prompt: 'The Hydra\'s core roars. <strong>A bisect session gets stuck on a merge commit, unable to cleanly determine good/bad. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 28, damageIfOptimal: 48,
          hintNudge: 'A merge commit has TWO parents — bisect\'s normal linear-history assumption gets ambiguous there, since the bug could have come from either side of the merge.',
          hintPartial: 'A merge commit combines two different histories, and the bug could logically belong to either parent — bisect needs extra guidance (or a first-parent-only mode) to handle this ambiguity cleanly.',
          hintFull: 'Diagnosis: bisect hit a merge commit where the regression could logically belong to either parent branch, creating ambiguity in its normal linear-history assumption. Fix: use git bisect with --first-parent (to only trace the mainline history) or bisect each parent branch separately if the merge itself needs deeper investigation.',
          outputBlock: [
            '$ git bisect good',
            'Bisecting: this is a merge commit; the bug could be from either parent',
            '(unclear which branch of history actually introduced it)'
          ],
          acceptableDiagnosesPatterns: [/merge\s*commit.*(two\s*parents|ambiguous)/i, /either\s*parent/i],
          followUpFix: {
            prompt: 'Restart bisect using a mode that only traces mainline history through merges:',
            acceptablePatterns: [],
            optimalPatterns: [/--first-parent/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'Cracks split the stage floor. <strong>A rebase performed on a long-lived branch caused a massive pile of duplicate/conflicting commits. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 28, damageIfOptimal: 48,
          hintNudge: 'Rebasing a branch that other people ALSO branched from (or already have local copies of) causes exactly this — every commit gets a new hash, and everyone else\'s history now conflicts with the rewritten one.',
          hintPartial: 'The branch was already shared/pulled by others before it got rebased — rewriting it created new commit hashes for everything, so every other copy of that branch now sees a completely different, conflicting history.',
          hintFull: 'Diagnosis: a shared branch was rebased after others already had local copies of it, causing massive duplicate-commit conflicts when they tried to sync. Fix: agree as a team on ONE canonical version of the branch (usually the rebased one, if that was the intended cleanup), have everyone else reset their local copy to match it exactly, rather than trying to merge the two diverged histories together.',
          outputBlock: [
            '$ git log --oneline feature-x',
            '(shows the SAME logical commits appearing twice, with different hashes)',
            '',
            '(3 team members report merge conflicts every time they try to sync this branch)'
          ],
          acceptableDiagnosesPatterns: [/rebased.*shared/i, /shared\s*branch.*rebase/i, /different\s*hashes.*same/i],
          followUpFix: {
            prompt: 'The team\'s recovery plan — what should everyone else do with their local copy?',
            acceptablePatterns: [],
            optimalPatterns: [/reset.*match|reset\s*--hard.*origin/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'The stage groans under strain. <strong>"git fsck" reports dangling commits and possible corruption in the repository. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 28, damageIfOptimal: 48,
          hintNudge: 'Not every "dangling" object fsck reports is real corruption — some are perfectly normal leftovers from everyday Git operations (like an old rebase or reset). Distinguish routine noise from a genuine problem before panicking.',
          hintPartial: 'Most of the dangling commits are harmless leftovers from routine rebases/resets — check specifically for actual corruption markers (broken objects, missing blobs) rather than treating every dangling object as an emergency.',
          hintFull: 'Diagnosis: dangling commits are usually normal leftovers from rebases/resets, not corruption — but check fsck\'s output carefully for genuinely broken/missing objects, which IS a real problem. Fix: if genuine corruption is confirmed, restore from a known-good clone/backup rather than trying to hand-repair a corrupted object database.',
          outputBlock: [
            '$ git fsck',
            'dangling commit a1b2c3d',
            'dangling commit d4e5f6a',
            '(no "missing" or "broken" object errors reported)'
          ],
          acceptableDiagnosesPatterns: [/normal\s*leftover|routine|not\s*(real\s*)?corruption/i, /dangling.*not\s*(a\s*)?problem/i],
          followUpFix: {
            prompt: 'Confirm there\'s no genuine corruption (missing/broken objects) before doing anything drastic:',
            acceptablePatterns: [],
            optimalPatterns: [/git\s+fsck\s+--full/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'The Hydra\'s ribbons tangle. <strong>A submodule reference points to a commit that no longer exists anywhere — it was force-pushed away in the submodule\'s own repo. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 28, damageIfOptimal: 48,
          hintNudge: 'The parent repo only stores a pointer (a commit hash) to the submodule — if that exact commit is ever deleted/rewritten in the submodule\'s own repository, the pointer becomes permanently dangling.',
          hintPartial: 'The submodule\'s own repository had that specific commit removed (likely a force-push/history rewrite there), so the parent repo\'s stored pointer now references a commit that simply doesn\'t exist anymore.',
          hintFull: 'Diagnosis: the submodule\'s upstream repository rewrote/removed the exact commit the parent repo was pointing at. Fix: update the parent repo\'s submodule reference to a commit that still exists (ideally after confirming with whoever maintains the submodule what happened and what\'s safe to pin to now).',
          outputBlock: [
            '$ git submodule update',
            'fatal: reference is not a tree: a1b2c3d',
            'Unable to checkout \'a1b2c3d\' in submodule path \'lib/utils\''
          ],
          acceptableDiagnosesPatterns: [/commit.*(no\s*longer\s*exists|removed|rewritten)/i, /dangling\s*(submodule\s*)?reference/i],
          followUpFix: {
            prompt: 'Fix it by pointing the submodule at a commit that still actually exists:',
            acceptablePatterns: [],
            optimalPatterns: [/git\s+submodule.*(update|set-branch)|cd.*lib\/utils.*git\s+checkout/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A cracked mirror of ink reflects the stage. <strong>A repository\'s .git directory has grown to several gigabytes, though the actual codebase is small. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 28, damageIfOptimal: 48,
          hintNudge: 'A small CURRENT codebase says nothing about what\'s permanently sitting in HISTORY — look for large blobs buried in old commits, even ones long since deleted from the working tree.',
          hintPartial: 'A count-objects/verify-pack check reveals several large binary blobs sitting in old commits — files that were committed once, deleted later, but never actually purged from history.',
          hintFull: 'Diagnosis: large files committed in the past (and later deleted from the working tree) remain permanently in history, bloating the repository. Fix: use git filter-repo (or BFG Repo-Cleaner) to purge the large historical blobs, then have the team re-clone or carefully re-sync.',
          outputBlock: [
            '$ git count-objects -vH',
            'size-pack: 3.2 GiB',
            '',
            '$ git rev-list --objects --all | git cat-file --batch-check | sort -k3 -rn | head -3',
            '(top entries are multi-hundred-MB blobs from commits years old)'
          ],
          acceptableDiagnosesPatterns: [/large\s*(file|blob).*history/i, /old\s*commits?.*(large|bloat)/i, /never\s*purged/i],
          followUpFix: {
            prompt: 'Purge the large historical blobs to shrink the repository:',
            acceptablePatterns: [],
            optimalPatterns: [/filter-repo|bfg/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A final flicker crosses the stage. <strong>CI consistently fails only on merge commits, passing fine on every regular commit. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 28, damageIfOptimal: 48,
          hintNudge: 'A merge commit has TWO parents — a CI script that assumes exactly one parent (e.g. diffing against "the previous commit" naively) breaks specifically and only on merge commits.',
          hintPartial: 'The CI script computes a diff assuming a single previous commit, which is ambiguous/wrong for a merge commit\'s two parents — that\'s why it only ever fails there, never on regular linear commits.',
          hintFull: 'Diagnosis: the CI script\'s diff logic assumes a single-parent commit, which breaks on a merge commit\'s two parents. Fix: update the script to handle merge commits explicitly (e.g. diff against the first parent specifically with HEAD^1, or skip merge commits from that particular check if appropriate).',
          outputBlock: [
            '$ git log --oneline -1',
            'a1b2c3d Merge branch \'feature-x\'',
            '',
            '(CI script): git diff HEAD^ HEAD',
            'fatal: ambiguous argument \'HEAD^\': unknown revision (for a commit with 2 parents, ^ alone is ambiguous)'
          ],
          acceptableDiagnosesPatterns: [/merge\s*commit.*(two\s*parents|ambiguous)/i, /single.?parent\s*assum/i],
          followUpFix: {
            prompt: 'Fix the CI script to handle a merge commit\'s two parents explicitly:',
            acceptablePatterns: [],
            optimalPatterns: [/HEAD\^1|first.?parent/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'The last ember of the stage dims. <strong>An intern\'s accidental force-push wiped the shared <code>main</code> branch, and no local machine still has the old commits in its reflog. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 28, damageIfOptimal: 48,
          hintNudge: 'reflog is LOCAL to each machine and eventually expires — if nobody\'s local reflog still has it, the recovery path has to come from somewhere OUTSIDE any single developer\'s machine entirely.',
          hintPartial: 'With no local reflog holding the old commits anymore, recovery has to come from an external source — a CI system\'s last successful checkout, a mirror/backup of the remote, or anyone\'s IDE-local history — not from git\'s own local recovery tools alone.',
          hintFull: 'Diagnosis: the commits are gone from every local reflog, so git\'s own built-in recovery tools can\'t help directly. Fix: check external sources that might still hold a copy — a CI system\'s last successful build/checkout, a scheduled remote mirror/backup, or even an IDE\'s local history — and restore main from whichever is most complete and recent.',
          outputBlock: [
            '$ git reflog show origin/main',
            '(only shows the force-push event itself — nothing before it)',
            '',
            '(every developer\'s local reflog has already rotated past the old commits)'
          ],
          acceptableDiagnosesPatterns: [/external\s*(source|backup|mirror)/i, /ci.*(checkout|build)/i, /outside\s*(of\s*)?(any\s*)?local/i],
          followUpFix: {
            prompt: 'Where should the recovery attempt look first?',
            acceptablePatterns: [],
            optimalPatterns: [/ci|backup|mirror/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A final shard of glass reflects the truth. <strong>A file behaves completely differently depending on whether it\'s checked out on macOS/Windows versus the Linux CI runner. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 28, damageIfOptimal: 48,
          hintNudge: 'macOS and Windows filesystems are commonly case-INsensitive by default; Linux is case-sensitive — a filename differing only by case can create two DIFFERENT files on Linux that looked like just one on a developer\'s machine.',
          hintPartial: 'Two files exist in the repo differing only by case (Config.js and config.js) — a case-insensitive filesystem (macOS/Windows) silently treats them as the same file, while Linux CI sees them as genuinely two separate, conflicting files.',
          hintFull: 'Diagnosis: two files differing only by letter case are being treated as one file on case-insensitive filesystems (macOS/Windows) but as two separate files on case-sensitive Linux. Fix: rename to a single consistent filename/case across the whole codebase, and remove the duplicate.',
          outputBlock: [
            '$ git ls-tree -r HEAD --name-only | grep -i config.js',
            'src/Config.js',
            'src/config.js',
            '(both exist in the repo — invisible as a conflict on macOS/Windows, but Linux CI sees two real, different files)'
          ],
          acceptableDiagnosesPatterns: [/case.?sensitiv/i, /case.?insensitiv/i, /duplicate.*(case|filename)/i],
          followUpFix: {
            prompt: 'Fix it by consolidating to one consistent filename:',
            acceptablePatterns: [],
            optimalPatterns: [/git\s+(mv|rm)/i]
          }
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'The Hydra draws every head taut at once. <strong>Sequence the correct order for responding to a corrupted or compromised repository history.</strong>',
          steps: [
            'Confirm the actual scope with git fsck --full',
            'Identify a known-good backup or clone to restore from',
            'Preserve the corrupted state for investigation before overwriting anything',
            'Restore/recreate the repository from the known-good source',
            'Have the team re-clone or carefully re-sync'
          ],
          damageIfCorrect: 30, damageIfOptimal: 50,
          damageToHeroIfWrong: 28
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'The last head falls still. <strong>Sequence the correct order for permanently removing a large accidentally-committed file from a shared repository\'s history.</strong>',
          steps: [
            'Confirm exactly which commits/blobs contain the large file',
            'Coordinate with the team before rewriting shared history',
            'Run git filter-repo (or BFG) to purge it from every commit',
            'Force-push the cleaned history',
            'Have everyone re-clone or carefully reset their local copies'
          ],
          damageIfCorrect: 30, damageIfOptimal: 50,
          damageToHeroIfWrong: 28
        }
      ]
    }
  ]
};
