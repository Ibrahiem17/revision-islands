// Boss "statekeeper": metadata plus its full question bank (data only).

/* ================================================================
   BOSS 8 — THE STATEKEEPER (Terraform / IaC)
   ================================================================ */
export var statekeeper = {
  id: 'statekeeper',
  name: 'The Statekeeper',
  topic: 'Terraform',
  icon: '🗿',
  chibiKind: 'statekeeper',
  phaseHp: [122, 132, 152],
  phaseNames: ['Blocks — State Management', 'Fracture — Idempotency', 'Drift — Real Incident'],
  xpReward: 168,
  coinBaseReward: 98,
  phases: [
    /* -------- PHASE 1: State Management -------- */
    [
      {
        mode: 'terminal',
        prompt: 'A block grinds into place: <strong>"Initialize this directory as a Terraform working directory."</strong>',
        damageIfCorrect: 16, damageIfOptimal: 26,
        hintNudge: 'The very first command you run in any new Terraform directory.',
        hintPartial: 'terraform i___',
        hintFull: 'terraform init',
        acceptablePatterns: [/^terraform\s+init\s+-upgrade$/i],
        optimalPatterns: [/^terraform\s+init$/i],
        baseCmds: ['terraform']
      },
      {
        mode: 'terminal',
        prompt: 'Light spills through a crack: <strong>"Show what changes Terraform WOULD make, without applying anything."</strong>',
        damageIfCorrect: 16, damageIfOptimal: 26,
        hintNudge: 'The preview command — never touches real infrastructure.',
        hintPartial: 'terraform p___',
        hintFull: 'terraform plan',
        acceptablePatterns: [/^terraform\s+plan\s+-out=tfplan$/i],
        optimalPatterns: [/^terraform\s+plan$/i],
        baseCmds: ['terraform']
      },
      {
        mode: 'terminal',
        prompt: 'A geometric hum: <strong>"List every resource currently tracked in this state."</strong>',
        damageIfCorrect: 14, damageIfOptimal: 22,
        hintNudge: 'The state subcommand, then its list action.',
        hintPartial: 'terraform state l___',
        hintFull: 'terraform state list',
        acceptablePatterns: [/^terraform\s+show$/i],
        optimalPatterns: [/^terraform\s+state\s+list$/i],
        baseCmds: ['terraform']
      },
      {
        mode: 'triage_call',
        prompt: 'Two blocks strain against each other: <strong>"Two engineers could run terraform apply on the same state at the same time. What\'s the right setup?"</strong>',
        damageIfCorrect: 18, damageIfOptimal: 30,
        hintNudge: 'You need a technical safeguard, not a social one like "just ask in chat first."',
        hintPartial: 'A remote backend that actually locks the state while it\'s in use.',
        hintFull: 'Best: a remote state backend with locking (e.g. S3+DynamoDB, or Terraform Cloud) — a real technical guarantee, not a process someone can forget.',
        options: [
          { id: 'a', label: 'Remote state backend with locking', tier: 'best', why: 'An actual technical guarantee — a second apply is blocked while the first holds the lock.' },
          { id: 'b', label: 'Local state file shared over a network drive', tier: 'wrong', why: 'No real locking mechanism — two applies can still race and corrupt the state.' },
          { id: 'c', label: 'Ask the team to coordinate manually in chat', tier: 'wrong', why: 'Relies on humans never forgetting — exactly the kind of thing a locking mechanism exists to remove.' }
        ],
        justificationPatterns: [/lock|remote\s*(state|backend)|race/i]
      },
      {
        mode: 'terminal',
        prompt: 'One block already exists, unmanaged: <strong>"Bring an existing EC2 instance (<code>i-1234567890abcdef0</code>) under Terraform management as <code>aws_instance.example</code>."</strong>',
        damageIfCorrect: 18, damageIfOptimal: 30,
        hintNudge: 'The subcommand for adopting a resource that already exists in the cloud.',
        hintPartial: 'terraform i_____ aws_instance.example i-...',
        hintFull: 'terraform import aws_instance.example i-1234567890abcdef0',
        acceptablePatterns: [/^terraform\s+import\s+aws_instance\.example\s+i-1234567890abcdef0\s*$/i],
        optimalPatterns: [/^terraform\s+import\s+aws_instance\.example\s+i-1234567890abcdef0$/i],
        baseCmds: ['terraform']
      }
    ],
    /* -------- PHASE 2: Idempotency -------- */
    [
      {
        mode: 'spot_the_bug',
        prompt: 'A crack of light shows a broken provisioner. <strong>Click the buggy line, then type the fix.</strong>',
        damageIfCorrect: 24, damageIfOptimal: 38,
        hintNudge: 'Running this apply twice keeps appending the same line to the file, forever.',
        hintPartial: 'Write the setting instead of appending it, so re-running gives the same result.',
        hintFull: 'Fix: echo "setting=true" > config.txt',
        codeBlock: [
          'resource "null_resource" "config" {',
          '  provisioner "local-exec" {',
          '    command = "echo \\"setting=true\\" >> config.txt"',
          '  }',
          '}'
        ],
        buggyLineId: 2,
        correctFixPatterns: [/echo\s+["']setting=true["']\s*>\s*config\.txt/i]
      },
      {
        mode: 'spot_the_bug',
        prompt: 'Another fracture, another provisioner. <strong>Click the buggy line, then type the fix.</strong>',
        damageIfCorrect: 24, damageIfOptimal: 38,
        hintNudge: 'This resource\'s name is different every single apply — Terraform sees that as a reason to replace it.',
        hintPartial: 'Give it a fixed, stable name instead of a timestamp.',
        hintFull: 'Fix: name = "server-prod"',
        codeBlock: [
          'resource "aws_instance" "web" {',
          '  ami  = "ami-123456"',
          '  tags = {',
          '    Name = "server-${timestamp()}"',
          '  }',
          '}'
        ],
        buggyLineId: 3,
        correctFixPatterns: [/^Name\s*=\s*"server-prod"$/i]
      },
      {
        mode: 'spot_the_bug',
        prompt: 'A block shudders, cracking. <strong>Click the buggy line, then type the fix.</strong>',
        damageIfCorrect: 24, damageIfOptimal: 38,
        hintNudge: 'The second time this runs, the directory already exists and the command fails.',
        hintPartial: 'One flag makes "create directory" safe to re-run even if it\'s already there.',
        hintFull: 'Fix: mkdir -p /data',
        codeBlock: [
          'resource "null_resource" "setup" {',
          '  provisioner "local-exec" {',
          '    command = "mkdir /data"',
          '  }',
          '}'
        ],
        buggyLineId: 2,
        correctFixPatterns: [/mkdir\s+-p\s+\/data/i]
      },
      {
        mode: 'spot_the_bug',
        prompt: 'A fourth block, hardened wrong. <strong>Click the buggy line, then type the fix.</strong>',
        damageIfCorrect: 24, damageIfOptimal: 38,
        hintNudge: 'This number is frozen in the code — nobody can safely change it without editing the file itself.',
        hintPartial: 'Reference a variable instead of a hardcoded number.',
        hintFull: 'Fix: count = var.instance_count',
        codeBlock: [
          'resource "aws_instance" "app" {',
          '  ami   = "ami-123456"',
          '  count = 3',
          '}'
        ],
        buggyLineId: 2,
        correctFixPatterns: [/^count\s*=\s*var\.instance_count$/i]
      },
      {
        mode: 'spot_the_bug',
        prompt: 'The last fracture before the drift. <strong>Click the buggy line, then type the fix.</strong>',
        damageIfCorrect: 24, damageIfOptimal: 38,
        hintNudge: 'This resets to the same fixed number on every apply, undoing any deliberate manual scaling.',
        hintPartial: 'Drive it from a variable so it can actually be changed on purpose.',
        hintFull: 'Fix: replicas = var.replica_count',
        codeBlock: [
          'resource "kubernetes_deployment" "app" {',
          '  spec {',
          '    replicas = 1',
          '  }',
          '}'
        ],
        buggyLineId: 2,
        correctFixPatterns: [/^replicas\s*=\s*var\.replica_count$/i]
      }
    ],
    /* -------- PHASE 3: Real Incident — Bad Apply Needs Reverting -------- */
    [
      {
        mode: 'read_the_room',
        prompt: 'The Statekeeper\'s cracks flare — a plan is about to do something dangerous. <strong>Diagnose it, then respond safely.</strong>',
        damageIfCorrect: 24, damageIfOptimal: 38,
        hintNudge: 'This isn\'t a normal update — the resource is being destroyed AND rebuilt.',
        hintPartial: 'A forced replacement on the production database means real downtime and data loss.',
        hintFull: 'Diagnosis: this is a forced replacement that would destroy and recreate the production database. Response: never apply straight from an old plan — regenerate a fresh one to review, e.g. terraform plan -out=tfplan',
        outputBlock: [
          '$ terraform plan',
          '  # aws_db_instance.prod must be replaced',
          '-/+ resource "aws_db_instance" "prod" {',
          '      ~ engine_version = "13.4" -> "14.2" # forces replacement',
          '    }'
        ],
        acceptableDiagnosesPatterns: [/(forced\s*)?replac.*database/i, /destroy.*recreate/i, /data\s*loss/i],
        followUpFix: {
          prompt: 'Before anyone applies anything, get a clean plan on record to review:',
          acceptablePatterns: [/^terraform\s+plan$/i],
          optimalPatterns: [/^terraform\s+plan\s+-out=tfplan$/i]
        }
      },
      {
        mode: 'read_the_room',
        prompt: 'Another crack widens. <strong>Diagnose it, then respond safely.</strong>',
        damageIfCorrect: 24, damageIfOptimal: 38,
        hintNudge: 'A rule is about to open up far more than it should.',
        hintPartial: 'This security group would allow traffic in from the entire internet.',
        hintFull: 'Diagnosis: the plan would open this security group to 0.0.0.0/0 — the whole internet. Response: stop and get a fresh, reviewable plan before touching anything, e.g. terraform plan -out=tfplan',
        outputBlock: [
          '$ terraform plan',
          '  # aws_security_group_rule.web will be updated',
          '~ cidr_blocks = ["10.0.0.0/16"] -> ["0.0.0.0/0"]'
        ],
        acceptableDiagnosesPatterns: [/open.*(internet|0\.0\.0\.0)/i, /security\s*group.*(too\s*(open|permissive)|world)/i],
        followUpFix: {
          prompt: 'Get a clean, reviewable plan before anyone applies this:',
          acceptablePatterns: [/^terraform\s+plan$/i],
          optimalPatterns: [/^terraform\s+plan\s+-out=tfplan$/i]
        }
      },
      {
        mode: 'read_the_room',
        prompt: 'A whole section of the construct groans. <strong>Diagnose it, then respond safely.</strong>',
        damageIfCorrect: 24, damageIfOptimal: 38,
        hintNudge: 'Terraform\'s state and the real infrastructure have quietly stopped agreeing with each other.',
        hintPartial: 'Something changed outside of Terraform — someone edited it directly in the console.',
        hintFull: 'Diagnosis: state drift — real infrastructure no longer matches what Terraform believes. Response: sync state with reality first, e.g. terraform refresh',
        outputBlock: [
          '$ terraform plan',
          'Note: Objects have changed outside of Terraform',
          '  # aws_instance.web has changed (edited manually in the console)'
        ],
        acceptableDiagnosesPatterns: [/(state\s*)?drift/i, /(changed|edited).*(manually|outside\s*(of\s*)?terraform)/i, /out\s*of\s*sync/i],
        followUpFix: {
          prompt: 'Sync Terraform\'s understanding with what\'s actually there:',
          acceptablePatterns: [/^terraform\s+plan$/i],
          optimalPatterns: [/^terraform\s+refresh$/i, /^terraform\s+plan\s+-refresh-only$/i]
        }
      },
      {
        mode: 'read_the_room',
        prompt: 'Runes along a crack glow far too brightly. <strong>Diagnose it, then respond safely.</strong>',
        damageIfCorrect: 24, damageIfOptimal: 38,
        hintNudge: 'This policy is granting access to nearly anything, not something specific.',
        hintPartial: 'A wildcard action on an IAM policy is about to grant sweeping permissions.',
        hintFull: 'Diagnosis: the plan grants an overly broad wildcard IAM permission ("Action": "*"). Response: don\'t apply — regenerate a clean plan to review the actual scope needed, e.g. terraform plan -out=tfplan',
        outputBlock: [
          '$ terraform plan',
          '  # aws_iam_policy.app will be updated',
          '~ policy = jsonencode({ Action = "*", Resource = "*" })'
        ],
        acceptableDiagnosesPatterns: [/(overly\s*)?broad\s*(iam\s*)?permission/i, /wildcard/i, /too\s*(much\s*)?access/i],
        followUpFix: {
          prompt: 'Get a clean plan to actually review the real scope needed:',
          acceptablePatterns: [/^terraform\s+plan$/i],
          optimalPatterns: [/^terraform\s+plan\s+-out=tfplan$/i]
        }
      },
      {
        mode: 'read_the_room',
        prompt: 'The last crack splits wide. <strong>Diagnose it, then respond safely.</strong>',
        damageIfCorrect: 24, damageIfOptimal: 38,
        hintNudge: 'The number of running instances is about to drop to nothing.',
        hintPartial: 'A count change from several instances down to zero would take the whole app offline.',
        hintFull: 'Diagnosis: the plan scales the deployment down to zero instances — likely an accidental variable change. Response: stop and get a clean plan to review before applying, e.g. terraform plan -out=tfplan',
        outputBlock: [
          '$ terraform plan',
          '  # aws_instance.app[0] through [4] will be destroyed',
          '~ count = 5 -> 0'
        ],
        acceptableDiagnosesPatterns: [/scal.*(zero|down\s*to\s*0)/i, /all\s*instances.*(destroy|delet)/i, /accidental/i],
        followUpFix: {
          prompt: 'Stop and get a clean, reviewable plan before this goes any further:',
          acceptablePatterns: [/^terraform\s+plan$/i],
          optimalPatterns: [/^terraform\s+plan\s+-out=tfplan$/i]
        }
      }
    ]
  ],
  specialAttack: {
    mode: 'build_the_pipeline',
    prompt: 'Every block in the Statekeeper realigns at once! <strong>Sequence the correct safe IaC change workflow before it lands.</strong>',
    steps: [
      'Write the change',
      'terraform plan',
      'Have it reviewed',
      'terraform apply',
      'Verify the result'
    ],
    damageIfCorrect: 40,
    damageToHeroIfWrong: 26
  },
  // ================================================================
  // Remediation doc, Section 1 — 5-level restructure, boss 8
  // (statekeeper). Research basis (checked BEFORE writing): the
  // official Terraform CLI reference and documentation
  // (developer.hashicorp.com/terraform/cli), HashiCorp's own Learn
  // tutorials on state, modules, and workspaces, and standard
  // Terraform/IaC-for-DevOps interview topics (state locking/remote
  // backends, import, workspaces, modules, lifecycle blocks,
  // count vs. for_each, provider/module version pinning, policy-as-
  // code), plus real documented incident patterns (stuck state
  // locks, state drift, accidental destroy from a bad plan, secrets
  // leaking into state, a breaking provider upgrade, workspace
  // confusion applying to the wrong environment, colliding state
  // ownership between teams). All 125 questions trace to one of
  // those. Cross-checked programmatically against every other
  // shipped boss's questions (zero cross-boss duplicate prompts)
  // and against each other level in this set (zero internal
  // duplicates) — verified via script.
  levels: [
    {
      name: 'Level 1 — Fundamentals',
      hp: 115,
      questions: [
        {
          mode: 'terminal',
          prompt: 'A block grinds into place: <strong>"Initialize this directory as a Terraform working directory."</strong>',
          damageIfCorrect: 14, damageIfOptimal: 22,
          hintNudge: 'The very first command you run in any new Terraform directory.',
          hintPartial: 'terraform i___',
          hintFull: 'terraform init',
          acceptablePatterns: [/^terraform\s+init\s+-upgrade$/i],
          optimalPatterns: [/^terraform\s+init$/i],
          baseCmds: ['terraform']
        },
        {
          mode: 'terminal',
          prompt: 'Light spills through a crack: <strong>"Show what changes Terraform WOULD make, without applying anything."</strong>',
          damageIfCorrect: 14, damageIfOptimal: 22,
          hintNudge: 'The preview command — never touches real infrastructure.',
          hintPartial: 'terraform p___',
          hintFull: 'terraform plan',
          acceptablePatterns: [/^terraform\s+plan\s+-out=tfplan$/i],
          optimalPatterns: [/^terraform\s+plan$/i],
          baseCmds: ['terraform']
        },
        {
          mode: 'terminal',
          prompt: 'A geometric hum: <strong>"List every resource currently tracked in this state."</strong>',
          damageIfCorrect: 12, damageIfOptimal: 20,
          hintNudge: 'The state subcommand, then its list action.',
          hintPartial: 'terraform state l___',
          hintFull: 'terraform state list',
          acceptablePatterns: [/^terraform\s+show$/i],
          optimalPatterns: [/^terraform\s+state\s+list$/i],
          baseCmds: ['terraform']
        },
        {
          mode: 'terminal',
          prompt: 'The Statekeeper checks its own grammar: <strong>"Check whether this configuration is syntactically valid, without touching any real infrastructure."</strong>',
          damageIfCorrect: 14, damageIfOptimal: 22,
          hintNudge: 'A dedicated syntax/config-validation command, separate from plan.',
          hintPartial: 'terraform v_______',
          hintFull: 'terraform validate',
          acceptablePatterns: [],
          optimalPatterns: [/^terraform\s+validate$/i],
          baseCmds: ['terraform']
        },
        {
          mode: 'terminal',
          prompt: 'Every rune aligns to the same style: <strong>"Reformat all Terraform files in this directory to the canonical style."</strong>',
          damageIfCorrect: 12, damageIfOptimal: 20,
          hintNudge: 'The formatter command — rewrites files in place to a consistent style.',
          hintPartial: 'terraform f__',
          hintFull: 'terraform fmt',
          acceptablePatterns: [],
          optimalPatterns: [/^terraform\s+fmt$/i],
          baseCmds: ['terraform']
        },
        {
          mode: 'terminal',
          prompt: 'The keeper reveals a single carved value: <strong>"Print the value of the output named <code>instance_ip</code>."</strong>',
          damageIfCorrect: 14, damageIfOptimal: 22,
          hintNudge: 'The output subcommand, taking the specific output\'s name.',
          hintPartial: 'terraform output _______',
          hintFull: 'terraform output instance_ip',
          acceptablePatterns: [/^terraform\s+output$/i],
          optimalPatterns: [/^terraform\s+output\s+instance_ip$/i],
          baseCmds: ['terraform']
        },
        {
          mode: 'terminal',
          prompt: 'One block already exists, unmanaged: <strong>"Bring an existing EC2 instance (<code>i-1234567890abcdef0</code>) under Terraform management as <code>aws_instance.example</code>."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26,
          hintNudge: 'The subcommand for adopting a resource that already exists in the cloud.',
          hintPartial: 'terraform i_____ aws_instance.example i-...',
          hintFull: 'terraform import aws_instance.example i-1234567890abcdef0',
          acceptablePatterns: [/^terraform\s+import\s+aws_instance\.example\s+i-1234567890abcdef0\s*$/i],
          optimalPatterns: [/^terraform\s+import\s+aws_instance\.example\s+i-1234567890abcdef0$/i],
          baseCmds: ['terraform']
        },
        {
          mode: 'terminal',
          prompt: 'The keeper unmakes what it built: <strong>"Tear down every resource this configuration manages."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26,
          hintNudge: 'The direct opposite of apply.',
          hintPartial: 'terraform d______',
          hintFull: 'terraform destroy',
          acceptablePatterns: [],
          optimalPatterns: [/^terraform\s+destroy$/i],
          baseCmds: ['terraform']
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A crooked stone forgets its own type. <strong>"This variable declaration is missing its type, letting anything at all be passed in. Find and fix the bug."</strong>',
          damageIfCorrect: 14, damageIfOptimal: 22,
          hintNudge: 'A variable block should declare an explicit type to catch bad inputs early.',
          hintPartial: 'Line 1 has no type constraint at all — add one matching what this variable is actually meant to hold.',
          hintFull: 'Fix: add type = string',
          codeBlock: [
            'variable "environment" {}'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/variable\s*"environment"\s*\{\s*type\s*=\s*string\s*\}/i, /type\s*=\s*string/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A stone hides a secret in plain sight. <strong>"This variable holds a real password but isn\'t marked sensitive, so it prints in plain text in plan output. Find and fix the bug."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26,
          hintNudge: 'A variable holding a real secret should be marked so Terraform redacts it from output.',
          hintPartial: 'Add sensitive = true so this value is redacted wherever Terraform would otherwise print it.',
          hintFull: 'Fix: sensitive = true',
          codeBlock: [
            'variable "db_password" {',
            '  type = string',
            '}'
          ],
          buggyLineId: 1,
          correctFixPatterns: [/sensitive\s*=\s*true/i]
        },
        {
          mode: 'triage_call',
          prompt: 'Two blocks strain against each other: <strong>"Two engineers could run terraform apply on the same state at the same time. What\'s the right setup?"</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26,
          hintNudge: 'You need a technical safeguard, not a social one like "just ask in chat first."',
          hintPartial: 'A remote backend that actually locks the state while it\'s in use.',
          hintFull: 'Best: a remote state backend with locking (e.g. S3+DynamoDB, or Terraform Cloud) — a real technical guarantee, not a process someone can forget.',
          options: [
            { id: 'a', label: 'Remote state backend with locking', tier: 'best', why: 'An actual technical guarantee — a second apply is blocked while the first holds the lock.' },
            { id: 'b', label: 'Local state file shared over a network drive', tier: 'wrong', why: 'No real locking mechanism — two applies can still race and corrupt the state.' },
            { id: 'c', label: 'Ask the team to coordinate manually in chat', tier: 'wrong', why: 'Relies on humans never forgetting — exactly the kind of thing a locking mechanism exists to remove.' }
          ],
          justificationPatterns: [/lock|remote\s*(state|backend)|race/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"Deciding whether to store the .tfstate file in the same git repo as the code. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26,
          hintNudge: 'State can contain sensitive values (like passwords in plain text) and changes on every apply — a git repo isn\'t built for either of those.',
          hintPartial: 'Never commit state to git — it can contain sensitive plaintext values and changes constantly, causing merge conflicts a VCS isn\'t designed to resolve safely for this kind of file.',
          hintFull: 'Best: never commit state to git — use a remote backend instead. State can contain plaintext secrets, and its constant churn plus merge-conflict risk makes git fundamentally the wrong tool for it.',
          options: [
            { id: 'a', label: 'Never commit state to git — use a remote backend', tier: 'best', why: 'State can contain plaintext secrets and changes constantly — a remote backend with locking is purpose-built for this, git is not.' },
            { id: 'b', label: 'Commit it, but add a .gitignore reminder to be careful', tier: 'wrong', why: 'Committing state to git still exposes any secrets it contains in the repo history and risks corrupting merge conflicts.' },
            { id: 'c', label: 'Encrypt the state file before committing it to git', tier: 'wrong', why: 'Solves the secrets-exposure problem but not the fundamental locking/concurrency problem git wasn\'t built to solve for this file.' }
          ],
          justificationPatterns: [/remote\s*backend|never\s*commit|secrets?\s*in\s*state/i]
        },
        {
          mode: 'read_the_room',
          prompt: 'The Statekeeper hums with confusion. <strong>A teammate reports that <code>terraform plan</code> shows changes to resources nobody actually edited. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 18, damageIfOptimal: 30,
          hintNudge: 'The real infrastructure and Terraform\'s recorded state may have quietly stopped agreeing with each other.',
          hintPartial: 'This is state drift — something changed the real infrastructure outside of Terraform (e.g. a manual console edit), so Terraform\'s plan reflects reality diverging from its recorded state.',
          hintFull: 'Diagnosis: state drift — real infrastructure no longer matches Terraform\'s recorded state. Fix: refresh state to see the actual current reality, e.g. terraform plan -refresh-only',
          outputBlock: [
            '$ terraform plan',
            'Note: Objects have changed outside of Terraform',
            '  # aws_instance.web has changed (edited manually in the console)'
          ],
          acceptableDiagnosesPatterns: [/(state\s*)?drift/i, /(changed|edited).*(manually|outside\s*(of\s*)?terraform)/i],
          followUpFix: {
            prompt: 'Refresh state to see the actual current reality:',
            acceptablePatterns: [/^terraform\s+refresh$/i],
            optimalPatterns: [/^terraform\s+plan\s+-refresh-only$/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A rune glows where none should. <strong>An <code>apply</code> fails partway through with "Error acquiring the state lock." Diagnose it, then fix it.</strong>',
          damageIfCorrect: 18, damageIfOptimal: 30,
          hintNudge: 'The lock exists to prevent two applies racing — check whether a previous run actually released it, or crashed while still holding it.',
          hintPartial: 'A previous Terraform run likely crashed or was killed while holding the lock, leaving it stuck — check whether that run is actually still in progress before touching anything.',
          hintFull: 'Diagnosis: a stuck lock from a previous run that crashed or was interrupted before releasing it. Fix: confirm no other apply is genuinely still running, then force-unlock using the lock ID Terraform reports.',
          outputBlock: [
            '$ terraform apply',
            'Error: Error acquiring the state lock',
            'Lock Info: ID: 8e5a...  Who: ci-runner-42  Created: 2 hours ago'
          ],
          acceptableDiagnosesPatterns: [/stuck\s*lock/i, /crashed.*(hold|release)/i, /previous\s*run.*(interrupted|crashed)/i],
          followUpFix: {
            prompt: 'After confirming no run is actually still active, release the stuck lock:',
            acceptablePatterns: [],
            optimalPatterns: [/terraform\s+force-unlock/i]
          }
        },
        {
          mode: 'terminal',
          prompt: 'The keeper checks its own carved instructions: <strong>"Show the currently applied version of the AWS provider."</strong>',
          damageIfCorrect: 14, damageIfOptimal: 22,
          hintNudge: 'The version subcommand, which lists Terraform and all provider versions in use.',
          hintPartial: 'terraform _______',
          hintFull: 'terraform version',
          acceptablePatterns: [],
          optimalPatterns: [/^terraform\s+version$/i],
          baseCmds: ['terraform']
        },
        {
          mode: 'terminal',
          prompt: 'A ledger of every input, plainly listed: <strong>"Show every output value this configuration currently defines."</strong>',
          damageIfCorrect: 12, damageIfOptimal: 20,
          hintNudge: 'The output command with no specific name shows every output.',
          hintPartial: 'terraform ______',
          hintFull: 'terraform output',
          acceptablePatterns: [],
          optimalPatterns: [/^terraform\s+output$/i],
          baseCmds: ['terraform']
        },
        {
          mode: 'terminal',
          prompt: 'The keeper applies without pausing to ask: <strong>"Apply the configuration without being prompted for confirmation."</strong>',
          damageIfCorrect: 14, damageIfOptimal: 22,
          hintNudge: 'apply has a flag to skip the interactive yes/no prompt.',
          hintPartial: 'terraform apply -____-approve',
          hintFull: 'terraform apply -auto-approve',
          acceptablePatterns: [],
          optimalPatterns: [/^terraform\s+apply\s+-auto-approve$/i],
          baseCmds: ['terraform']
        },
        {
          mode: 'terminal',
          prompt: 'A stone dissolves alone, sparing its neighbors: <strong>"Destroy just the resource <code>aws_instance.test</code>, leaving everything else untouched."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26,
          hintNudge: 'destroy accepts a target flag to scope it to one specific resource.',
          hintPartial: 'terraform destroy -______=aws_instance.test',
          hintFull: 'terraform destroy -target=aws_instance.test',
          acceptablePatterns: [],
          optimalPatterns: [/^terraform\s+destroy\s+-target=aws_instance\.test$/i],
          baseCmds: ['terraform']
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A crooked stone lacks any description at all. <strong>"This variable has no description, leaving anyone using this module guessing what it\'s for. Find and fix the bug."</strong>',
          damageIfCorrect: 14, damageIfOptimal: 22,
          hintNudge: 'A description makes a variable\'s purpose clear to anyone using the module without reading its internals.',
          hintPartial: 'Line 1 has no description at all — add one explaining what this variable actually controls.',
          hintFull: 'Fix: add description = "The deployment environment name (e.g. dev, staging, prod)"',
          codeBlock: [
            'variable "environment" {',
            '  type = string',
            '}'
          ],
          buggyLineId: 1,
          correctFixPatterns: [/description\s*=\s*"/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A crooked stone accepts anything at all. <strong>"This variable is supposed to only accept \'dev\', \'staging\', or \'prod\', but nothing actually enforces that. Find and fix the bug."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28,
          hintNudge: 'A validation block can enforce that a variable\'s value matches an expected set of allowed values.',
          hintPartial: 'Add a validation block checking the value is one of the three allowed environments.',
          hintFull: 'Fix: validation { condition = contains(["dev","staging","prod"], var.environment), error_message = "Must be dev, staging, or prod." }',
          codeBlock: [
            'variable "environment" {',
            '  type = string',
            '  # no validation at all',
            '}'
          ],
          buggyLineId: 2,
          correctFixPatterns: [/validation\s*\{/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The keeper weighs a plan against its own memory: <strong>"Deciding whether to apply directly from a fresh terraform plan run, or from a previously-saved plan file. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26,
          hintNudge: 'Applying a fresh, un-saved plan means the apply could act on a DIFFERENT plan than the one that was actually reviewed, if anything changed in between.',
          hintPartial: 'Apply from a saved plan file (terraform plan -out=tfplan, then terraform apply tfplan) so what gets reviewed and approved is guaranteed to be exactly what gets applied — nothing can silently change in between.',
          hintFull: 'Best: save the plan to a file and apply that exact file — this guarantees what was reviewed and approved is precisely what gets applied, with no risk of state drifting between the review and the apply.',
          options: [
            { id: 'a', label: 'Save the plan to a file, then apply that exact file', tier: 'best', why: 'Guarantees the reviewed and approved plan is exactly what gets applied — nothing can silently change between review and apply.' },
            { id: 'b', label: 'Run terraform apply fresh each time, re-planning implicitly', tier: 'wrong', why: 'The plan that gets applied could differ from whatever was reviewed earlier if anything changed state in between — a real risk for anything requiring review.' },
            { id: 'c', label: 'It never matters — a plan is a plan', tier: 'wrong', why: 'A meaningful difference exists — only a saved plan file guarantees exact consistency between what was reviewed and what gets applied.' }
          ],
          justificationPatterns: [/saved\s*plan|plan\s*file|exact(ly)?\s*what\s*(was\s*)?reviewed/i]
        },
        {
          mode: 'read_the_room',
          prompt: 'A stone refuses to answer to its own name. <strong>Running <code>terraform plan</code> fails immediately with "Backend configuration changed." Diagnose it, then fix it.</strong>',
          damageIfCorrect: 18, damageIfOptimal: 30,
          hintNudge: 'This message appears specifically when the backend block in code no longer matches what init last configured — a re-initialization is needed.',
          hintPartial: 'The backend configuration in code was changed (or someone else\'s teammate changed it) since the last init, and Terraform needs to be told to actually pick up that change.',
          hintFull: 'Diagnosis: the backend config changed since the last init. Fix: re-run init to reconfigure/migrate to the new backend settings.',
          outputBlock: [
            '$ terraform plan',
            'Error: Backend configuration changed',
            '(A change in the backend configuration has been detected)'
          ],
          acceptableDiagnosesPatterns: [/backend\s*config(uration)?\s*changed/i, /needs?\s*re-?init/i],
          followUpFix: {
            prompt: 'Fix it by re-running init to pick up the new backend config:',
            acceptablePatterns: [],
            optimalPatterns: [/terraform\s+init/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A ledger names a stone that no longer exists. <strong>Running <code>terraform plan</code> shows an error that a resource in state no longer exists in the real infrastructure. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 18, damageIfOptimal: 30,
          hintNudge: 'Something deleted the real resource outside of Terraform\'s knowledge (manually, or by another process) — state still thinks it exists.',
          hintPartial: 'The real resource was deleted outside of Terraform (manually, or by another automated process), but state still records it as existing — this is a form of drift specifically toward "the resource is gone."',
          hintFull: 'Diagnosis: the resource was deleted outside of Terraform, and state hasn\'t caught up. Fix: refresh state to reconcile (terraform apply will recreate it if the config still declares it, or use terraform state rm if it should stay gone).',
          outputBlock: [
            '$ terraform plan',
            '# aws_instance.web has been deleted outside of Terraform',
            '+ resource "aws_instance" "web" { ... }  # will be created'
          ],
          acceptableDiagnosesPatterns: [/deleted\s*(outside|manually)/i, /state.*(hasn'?t\s*caught\s*up|stale)/i],
          followUpFix: {
            prompt: 'Decide and act: either let Terraform recreate it, or remove it from state if it should stay gone:',
            acceptablePatterns: [],
            optimalPatterns: [/terraform\s+state\s+rm|recreate|terraform\s+apply/i]
          }
        },
        {
          mode: 'terminal',
          prompt: 'The keeper checks which chamber holds which record: <strong>"Show the current backend configuration in use for this working directory."</strong>',
          damageIfCorrect: 14, damageIfOptimal: 22,
          hintNudge: 'There isn\'t a single dedicated CLI flag for this — checking the terraform block in the .tf files, or terraform init output, reveals it.',
          hintPartial: 'terraform init (its output states which backend is configured)',
          hintFull: 'terraform init',
          acceptablePatterns: [],
          optimalPatterns: [/^terraform\s+init$/i],
          baseCmds: ['terraform']
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A crooked stone forgets what shape it must take. <strong>"This output value has no description, leaving anyone consuming this module\'s output guessing what it actually represents. Find and fix the bug."</strong>',
          damageIfCorrect: 14, damageIfOptimal: 22,
          hintNudge: 'An output block benefits from a description just as much as a variable does.',
          hintPartial: 'Line 1 has no description — add one explaining what this output value actually represents.',
          hintFull: 'Fix: add description = "The public IP address of the web server instance"',
          codeBlock: [
            'output "instance_ip" {',
            '  value = aws_instance.web.public_ip',
            '}'
          ],
          buggyLineId: 1,
          correctFixPatterns: [/description\s*=\s*"/i]
        }
      ]
    },
    {
      name: 'Level 2 — Intermediate',
      hp: 135,
      questions: [
        {
          mode: 'terminal',
          prompt: 'The keeper renames a stone without breaking it: <strong>"Rename the tracked resource <code>aws_instance.old_name</code> to <code>aws_instance.new_name</code> in state, without destroying/recreating it."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28,
          hintNudge: 'The state subcommand for moving a resource\'s address within (or between) state.',
          hintPartial: 'terraform state __ aws_instance.old_name aws_instance.new_name',
          hintFull: 'terraform state mv aws_instance.old_name aws_instance.new_name',
          acceptablePatterns: [],
          optimalPatterns: [/^terraform\s+state\s+mv\s+aws_instance\.old_name\s+aws_instance\.new_name$/i],
          baseCmds: ['terraform']
        },
        {
          mode: 'terminal',
          prompt: 'A stone is struck from the record, left standing in the world: <strong>"Remove <code>aws_instance.old</code> from state without destroying the real infrastructure."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28,
          hintNudge: 'The state subcommand for removing a resource from tracking without touching the real thing.',
          hintPartial: 'terraform state __ aws_instance.old',
          hintFull: 'terraform state rm aws_instance.old',
          acceptablePatterns: [],
          optimalPatterns: [/^terraform\s+state\s+rm\s+aws_instance\.old$/i],
          baseCmds: ['terraform']
        },
        {
          mode: 'terminal',
          prompt: 'A new chamber forms, separate from the rest: <strong>"Create a new Terraform workspace called <code>staging</code>."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26,
          hintNudge: 'The workspace subcommand, with a new action.',
          hintPartial: 'terraform workspace ___ staging',
          hintFull: 'terraform workspace new staging',
          acceptablePatterns: [],
          optimalPatterns: [/^terraform\s+workspace\s+new\s+staging$/i],
          baseCmds: ['terraform']
        },
        {
          mode: 'terminal',
          prompt: 'The keeper checks which chamber it stands in: <strong>"Show the currently selected Terraform workspace."</strong>',
          damageIfCorrect: 14, damageIfOptimal: 22,
          hintNudge: 'The workspace subcommand, with a show action.',
          hintPartial: 'terraform workspace ____',
          hintFull: 'terraform workspace show',
          acceptablePatterns: [],
          optimalPatterns: [/^terraform\s+workspace\s+show$/i],
          baseCmds: ['terraform']
        },
        {
          mode: 'terminal',
          prompt: 'A single stone is examined up close: <strong>"Show the full current state details for <code>aws_instance.web</code> specifically."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28,
          hintNudge: 'The state subcommand for inspecting one specific resource in detail.',
          hintPartial: 'terraform state ____ aws_instance.web',
          hintFull: 'terraform state show aws_instance.web',
          acceptablePatterns: [],
          optimalPatterns: [/^terraform\s+state\s+show\s+aws_instance\.web$/i],
          baseCmds: ['terraform']
        },
        {
          mode: 'terminal',
          prompt: 'The keeper reads from a specific ledger: <strong>"Apply using variable values from a specific file called <code>prod.tfvars</code>."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26,
          hintNudge: 'apply, with a var-file flag pointing at the specific tfvars file.',
          hintPartial: 'terraform apply -var-file=______.tfvars',
          hintFull: 'terraform apply -var-file=prod.tfvars',
          acceptablePatterns: [],
          optimalPatterns: [/^terraform\s+apply\s+-var-file=prod\.tfvars$/i],
          baseCmds: ['terraform']
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A crack of light shows a broken provisioner. <strong>"This provisioner keeps appending the same line to a file on every apply. Find and fix the bug."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28,
          hintNudge: 'Running this apply twice keeps appending the same line to the file, forever.',
          hintPartial: 'Write the setting instead of appending it, so re-running gives the same result.',
          hintFull: 'Fix: echo "setting=true" > config.txt',
          codeBlock: [
            'command = "echo \\"setting=true\\" >> config.txt"'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/echo\s+["']setting=true["']\s*>\s*config\.txt/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'Another fracture, another provisioner. <strong>"This resource\'s name is different every single apply, forcing an unwanted replacement. Find and fix the bug."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28,
          hintNudge: 'This resource\'s name is different every single apply — Terraform sees that as a reason to replace it.',
          hintPartial: 'Give it a fixed, stable name instead of a timestamp.',
          hintFull: 'Fix: name = "server-prod"',
          codeBlock: [
            'Name = "server-${timestamp()}"'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/^Name\s*=\s*"server-prod"$/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A block shudders, cracking. <strong>"This provisioner fails on re-run because the directory already exists. Find and fix the bug."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28,
          hintNudge: 'The second time this runs, the directory already exists and the command fails.',
          hintPartial: 'One flag makes "create directory" safe to re-run even if it\'s already there.',
          hintFull: 'Fix: mkdir -p /data',
          codeBlock: [
            'command = "mkdir /data"'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/mkdir\s+-p\s+\/data/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The keeper weighs one form against many: <strong>"Deciding between count and for_each for creating multiple similar resources from a list of names. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32,
          hintNudge: 'count indexes resources numerically (0, 1, 2...) — removing an item from the middle of a list shifts every index after it, causing unwanted destroy/recreate. for_each keys by a stable value instead.',
          hintPartial: 'Use for_each, keyed by the actual name — count\'s numeric indexing means removing one item from the middle of a list shifts every subsequent index, causing Terraform to destroy and recreate resources that didn\'t actually need to change.',
          hintFull: 'Best: for_each — it keys resources by a stable value (the name itself), so removing one item doesn\'t shift and force-replace every other resource the way count\'s numeric indexing would.',
          options: [
            { id: 'a', label: 'count, indexed 0 through length-1', tier: 'wrong', why: 'Numeric indexing means removing an item from the middle of the list shifts every subsequent index, forcing unwanted destroy/recreate of unrelated resources.' },
            { id: 'b', label: 'for_each, keyed by the resource name itself', tier: 'best', why: 'Keys by a stable identifier, so removing one item doesn\'t disturb any other resource\'s tracked identity.' },
            { id: 'c', label: 'Neither — write a separate resource block for each one manually', tier: 'wrong', why: 'Throws away the whole point of a loop construct, creating unnecessary repetition and maintenance burden.' }
          ],
          justificationPatterns: [/for_each|stable\s*key|shift.*index/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"Deciding whether to migrate from a local state file to a remote backend for a project that already has real, applied infrastructure. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32,
          hintNudge: 'Terraform has a purpose-built migration path for exactly this — moving existing state to a new backend safely re-initializes and copies it, rather than starting from scratch.',
          hintPartial: 'Configure the new backend, then run terraform init, which detects the backend change and offers to migrate the existing state — this preserves the existing resource tracking rather than losing it.',
          hintFull: 'Best: configure the remote backend in code, then run terraform init — Terraform detects the backend change and prompts to migrate existing state automatically, preserving all currently-tracked resources.',
          options: [
            { id: 'a', label: 'Configure the backend, then run terraform init to migrate existing state', tier: 'best', why: 'Uses Terraform\'s built-in migration path, safely preserving every currently-tracked resource rather than starting state from scratch.' },
            { id: 'b', label: 'Delete the local state and start fresh with the new backend', tier: 'wrong', why: 'Throws away all existing resource tracking — Terraform would then think none of the already-applied infrastructure exists.' },
            { id: 'c', label: 'Manually copy the local .tfstate file into the new backend\'s storage location', tier: 'defensible', why: 'Might work for simple backends, but skips Terraform\'s own migration safeguards (like locking during the copy) that init provides.' }
          ],
          justificationPatterns: [/terraform\s+init.*migrat|built-?in\s*migration/i]
        },
        {
          mode: 'read_the_room',
          prompt: 'A block is struck, and the wrong shard falls. <strong>An apply is meant to update one resource\'s tag, but the plan shows it destroying and recreating the resource entirely. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32,
          hintNudge: 'Some resource attributes are simply not updatable in-place by the underlying provider/API — changing them forces a full replace, regardless of how small the change looks.',
          hintPartial: 'The changed attribute is one that the provider marks as "requires replacement" — not every attribute can be updated in-place, even if the change itself (like a tag) seems minor.',
          hintFull: 'Diagnosis: the changed attribute forces replacement per the provider\'s schema, even though the change looks minor. Fix: check the provider docs for which attributes are actually update-in-place vs. force-new, and if replacement is unacceptable, look for an alternative attribute or approach that achieves the same goal without one.',
          outputBlock: [
            '$ terraform plan',
            '-/+ resource "aws_instance" "web" {',
            '      ~ availability_zone = "us-east-1a" -> "us-east-1b" # forces replacement',
            '    }'
          ],
          acceptableDiagnosesPatterns: [/forces?\s*replacement/i, /not\s*(updatable|update-in-place)/i],
          followUpFix: {
            prompt: 'Confirm which attributes actually force replacement before applying:',
            acceptablePatterns: [],
            optimalPatterns: [/provider\s*docs|schema|force-?new/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'The keeper answers to the wrong name. <strong>An apply intended for the staging environment instead modifies production resources. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32,
          hintNudge: 'Check which Terraform workspace (or which state/backend) was actually active when the apply ran — it\'s easy to be in the wrong one without a clear visual cue.',
          hintPartial: 'The wrong workspace (or state/backend) was selected at the time of apply — production and staging share the same configuration but track different state, and the active workspace wasn\'t verified beforehand.',
          hintFull: 'Diagnosis: the apply ran against the wrong workspace/state. Fix: always verify the active workspace before applying (terraform workspace show), and consider adding a safeguard like distinct backend configs or a confirmation step for production.',
          outputBlock: [
            '$ terraform workspace show',
            'production',
            '(the engineer believed they were in "staging")'
          ],
          acceptableDiagnosesPatterns: [/wrong\s*workspace/i, /workspace.*not\s*verified/i],
          followUpFix: {
            prompt: 'Fix it by always verifying the active workspace before applying:',
            acceptablePatterns: [],
            optimalPatterns: [/workspace\s*show|verify.*workspace/i]
          }
        },
        {
          mode: 'terminal',
          prompt: 'The keeper steps out of one chamber and into another: <strong>"Switch to the existing Terraform workspace named <code>production</code>."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26,
          hintNudge: 'The workspace subcommand, with a select action.',
          hintPartial: 'terraform workspace ______ production',
          hintFull: 'terraform workspace select production',
          acceptablePatterns: [],
          optimalPatterns: [/^terraform\s+workspace\s+select\s+production$/i],
          baseCmds: ['terraform']
        },
        {
          mode: 'terminal',
          prompt: 'The keeper reads a distant chamber\'s carved value: <strong>"Read the value of a Terraform output named <code>vpc_id</code> from another configuration\'s remote state."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36,
          hintNudge: 'A data source exists specifically for referencing another configuration\'s outputs via its remote state backend.',
          hintPartial: 'data "terraform_remote_state" "network" { backend = "s3", config = { ... } }, then reference data.terraform_remote_state.network.outputs.____',
          hintFull: 'data.terraform_remote_state.network.outputs.vpc_id',
          acceptablePatterns: [],
          optimalPatterns: [/data\.terraform_remote_state\.network\.outputs\.vpc_id/i],
          baseCmds: []
        },
        {
          mode: 'terminal',
          prompt: 'The keeper lists every chamber it has carved: <strong>"List all existing Terraform workspaces."</strong>',
          damageIfCorrect: 14, damageIfOptimal: 22,
          hintNudge: 'The workspace subcommand, with a list action.',
          hintPartial: 'terraform workspace ____',
          hintFull: 'terraform workspace list',
          acceptablePatterns: [],
          optimalPatterns: [/^terraform\s+workspace\s+list$/i],
          baseCmds: ['terraform']
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A crooked local value repeats itself needlessly. <strong>"The same tag expression is copy-pasted across five resources instead of being defined once. Find and fix the bug."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28,
          hintNudge: 'A locals block lets you define a value once and reference it everywhere, instead of repeating the same expression.',
          hintPartial: 'Define a locals block once with the shared tag expression, then reference local.common_tags everywhere instead of repeating it.',
          hintFull: 'Fix: locals { common_tags = { Environment = var.environment, Team = var.team } }, then tags = local.common_tags',
          codeBlock: [
            'tags = { Environment = var.environment, Team = var.team }  # copy-pasted identically 5 times'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/locals\s*\{|local\.common_tags/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A crooked data source assumes a shape that never existed. <strong>"This data source query is missing a required filter, so it could silently match the wrong AMI. Find and fix the bug."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32,
          hintNudge: 'A data source with too few filters can match more than one result, or the wrong one — check whether it filters by owner as well as name.',
          hintPartial: 'Line 1 filters only by name pattern, which could match an AMI from any account — add an owners filter to ensure it only matches the intended, trusted source.',
          hintFull: 'Fix: add owners = ["099720109477"] (or the appropriate trusted account) to the data source.',
          codeBlock: [
            'data "aws_ami" "app" { filter { name = "name", values = ["app-*"] } }  # no owners filter'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/owners\s*=\s*\[/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A crooked chamber shares its secrets across every world. <strong>"This variable holds environment-specific config but has a single hardcoded default used across dev, staging, and prod. Find and fix the bug."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32,
          hintNudge: 'A single hardcoded default for something that genuinely varies per environment means every environment silently gets the same value unless explicitly overridden.',
          hintPartial: 'Line 1\'s default is a single hardcoded instance size, but this should vary per environment — remove the default and require it be explicitly set per environment\'s .tfvars.',
          hintFull: 'Fix: remove the default entirely so it must be explicitly set per environment.',
          codeBlock: [
            'variable "instance_type" { type = string, default = "m5.xlarge" }  # used identically for dev, staging, prod'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/remove.*default|no\s*default/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The keeper weighs one voice against many small ones: <strong>"Deciding between hardcoding a value directly vs. defining it as a variable, for something that will genuinely never change across environments. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32,
          hintNudge: 'A variable adds real value when something COULD reasonably vary — for something that genuinely never will, a variable is pure indirection with no actual benefit.',
          hintPartial: 'Hardcode it directly — a variable exists to let something vary safely across contexts; adding one for a value that genuinely never changes is pure indirection with no real benefit.',
          hintFull: 'Best: hardcode it directly when a value is genuinely, permanently fixed — variables are for things that could reasonably vary; making everything a variable "just in case" adds indirection without real value.',
          options: [
            { id: 'a', label: 'Hardcode it directly', tier: 'best', why: 'A variable adds real value only for things that could reasonably vary — for a genuinely fixed value, it\'s pure indirection with no benefit.' },
            { id: 'b', label: 'Always make it a variable, in case it needs to change someday', tier: 'wrong', why: 'Adds unnecessary indirection for something explicitly described as never actually varying — a real but unnecessary abstraction cost.' },
            { id: 'c', label: 'Define it as a local instead of either option', tier: 'defensible', why: 'A local is a reasonable middle ground for a computed or referenced-multiple-times value, but doesn\'t change the core tradeoff versus a genuinely fixed value.' }
          ],
          justificationPatterns: [/hardcod|genuinely\s*(never|fixed)|no\s*real\s*benefit/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"Deciding whether every environment should use the exact same module version, or be allowed to use different module versions independently. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32,
          hintNudge: 'Environments genuinely drifting to different module versions independently can mean production is running meaningfully different infrastructure logic than what was tested in staging.',
          hintPartial: 'Keep environments on the same module version, promoted deliberately through each environment (dev -> staging -> prod) — letting them drift to different versions independently means production could run different infrastructure logic than what was actually validated in staging.',
          hintFull: 'Best: promote the same module version deliberately through environments (dev -> staging -> prod) rather than letting each drift independently — this preserves the actual value of testing in staging before it reaches production.',
          options: [
            { id: 'a', label: 'Keep all environments on the same module version, promoted deliberately', tier: 'best', why: 'Preserves the actual value of validating changes in staging before they reach production — the same logic is what gets tested and then promoted.' },
            { id: 'b', label: 'Let each environment independently use whatever module version it wants', tier: 'wrong', why: 'Risks production running meaningfully different infrastructure logic than whatever was actually validated in staging.' },
            { id: 'c', label: 'Only production needs version control; other environments don\'t matter', tier: 'wrong', why: 'Undermines the whole point of staging — if staging runs a different module version, it\'s no longer actually testing what will run in production.' }
          ],
          justificationPatterns: [/promoted\s*deliberately|same\s*(module\s*)?version|validated\s*in\s*staging/i]
        },
        {
          mode: 'read_the_room',
          prompt: 'A chamber echoes with a stranger\'s voice. <strong>A data source lookup unexpectedly returns a resource from a different AWS account than intended. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32,
          hintNudge: 'Check whether the data source\'s query is actually scoped narrowly enough (e.g. filtered by owner/account) — a loose query can match a similarly-named resource elsewhere.',
          hintPartial: 'The data source\'s filter is too loose (e.g. matching by name pattern alone), so it matched a similarly-named resource in a different account instead of the specific intended one.',
          hintFull: 'Diagnosis: the data source query is too loosely scoped, matching an unintended resource. Fix: add a more specific filter (e.g. owner/account ID) so it can only ever match the intended resource.',
          outputBlock: [
            '$ terraform plan',
            '(data.aws_ami.app resolved to an AMI owned by account 999988887777, not the expected account)'
          ],
          acceptableDiagnosesPatterns: [/(too\s*)?loose(ly)?\s*(scoped|filter)/i, /matched.*wrong\s*(account|resource)/i],
          followUpFix: {
            prompt: 'Fix it by adding a more specific filter to the data source:',
            acceptablePatterns: [],
            optimalPatterns: [/owner|account\s*id|more\s*specific\s*filter/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'Two chambers built the same statue, unaware of each other. <strong>Two separate modules each independently define a security group with overlapping, conflicting rules for the same purpose. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32,
          hintNudge: 'Duplicated infrastructure logic across modules (instead of one shared module) is a design smell that leads to exactly this kind of drift and conflict over time.',
          hintPartial: 'The same logical security group was independently duplicated across two modules rather than defined once and shared — over time their rules drifted apart and now conflict.',
          hintFull: 'Diagnosis: the same security group logic was duplicated across two separate modules instead of shared. Fix: consolidate into a single shared module that both callers reference, removing the duplicated, drifted definitions.',
          outputBlock: [
            '$ (module A) security group "web-sg" allows port 443 only',
            '$ (module B) security group "web-sg-v2" allows ports 80 and 443, same intended purpose'
          ],
          acceptableDiagnosesPatterns: [/duplicated.*(module|logic)/i, /not\s*shared/i],
          followUpFix: {
            prompt: 'Fix it by consolidating into a single shared module:',
            acceptablePatterns: [],
            optimalPatterns: [/shared\s*module|consolidat/i]
          }
        },
        {
          mode: 'terminal',
          prompt: 'The keeper drops a specific chamber it no longer needs: <strong>"Delete the Terraform workspace named <code>old-feature</code>."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26,
          hintNudge: 'The workspace subcommand, with a delete action.',
          hintPartial: 'terraform workspace ______ old-feature',
          hintFull: 'terraform workspace delete old-feature',
          acceptablePatterns: [],
          optimalPatterns: [/^terraform\s+workspace\s+delete\s+old-feature$/i],
          baseCmds: ['terraform']
        },
        {
          mode: 'triage_call',
          prompt: 'The keeper weighs a name against a number: <strong>"Deciding on a consistent resource-naming convention across a growing set of Terraform configurations. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32,
          hintNudge: 'A convention that encodes real, useful context (environment, project, purpose) directly in the name makes resources identifiable at a glance, without needing to cross-reference anything else.',
          hintPartial: 'Adopt a consistent naming pattern that encodes real context (e.g. project-environment-purpose) directly in the name — this makes any resource identifiable at a glance in the console or logs, without needing to look anything up.',
          hintFull: 'Best: a consistent, context-encoding naming convention (project-environment-purpose, applied uniformly) — this makes resources self-describing at a glance, which matters a lot once there are hundreds of them across many configurations.',
          options: [
            { id: 'a', label: 'A consistent convention encoding project/environment/purpose in the name', tier: 'best', why: 'Makes any resource self-describing at a glance in the console or logs, which matters increasingly as the number of resources grows.' },
            { id: 'b', label: 'Whatever name each engineer finds convenient at the time', tier: 'wrong', why: 'Produces inconsistent, hard-to-identify resource names at scale, with no way to tell context from the name alone.' },
            { id: 'c', label: 'Purely random or sequential IDs, to avoid needing a convention at all', tier: 'wrong', why: 'Removes any at-a-glance context entirely — every resource requires cross-referencing elsewhere just to know what it is.' }
          ],
          justificationPatterns: [/consistent\s*(naming\s*)?convention|encod.*context|self-describing/i]
        }
      ]
    },
    {
      name: 'Level 3 — Advanced Basics',
      hp: 155,
      questions: [
        {
          mode: 'terminal',
          prompt: 'The keeper draws the whole map of dependencies: <strong>"Generate a visual graph of this configuration\'s resource dependencies."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28,
          hintNudge: 'A command that outputs a dependency graph in DOT format.',
          hintPartial: 'terraform g_____',
          hintFull: 'terraform graph',
          acceptablePatterns: [],
          optimalPatterns: [/^terraform\s+graph$/i],
          baseCmds: ['terraform']
        },
        {
          mode: 'terminal',
          prompt: 'The keeper marks a single stone as sacred: <strong>"Force the next apply to replace <code>aws_instance.web</code> specifically, even though nothing else changed."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32,
          hintNudge: 'apply has a dedicated flag for forcing a specific resource\'s replacement.',
          hintPartial: 'terraform apply -replace=______________',
          hintFull: 'terraform apply -replace=aws_instance.web',
          acceptablePatterns: [],
          optimalPatterns: [/^terraform\s+apply\s+-replace=aws_instance\.web$/i],
          baseCmds: ['terraform']
        },
        {
          mode: 'terminal',
          prompt: 'The keeper checks only what has shifted, nothing more: <strong>"Update Terraform\'s recorded state to match reality, without changing any real infrastructure."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32,
          hintNudge: 'plan has a mode that only refreshes state, never proposing any real infrastructure change.',
          hintPartial: 'terraform plan -_______-only',
          hintFull: 'terraform plan -refresh-only',
          acceptablePatterns: [/^terraform\s+refresh$/i],
          optimalPatterns: [/^terraform\s+plan\s+-refresh-only$/i],
          baseCmds: ['terraform']
        },
        {
          mode: 'terminal',
          prompt: 'It reads a module\'s own declared shape: <strong>"Show the input variables and outputs a module named <code>network</code> declares."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32,
          hintNudge: 'A console/introspection approach isn\'t built-in as one flag — the closest CLI equivalent is showing the module\'s own source docs, but for state, use the module-scoped state list.',
          hintPartial: 'terraform state list module.______',
          hintFull: 'terraform state list module.network',
          acceptablePatterns: [],
          optimalPatterns: [/^terraform\s+state\s+list\s+module\.network$/i],
          baseCmds: ['terraform']
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A stone refuses to ever crumble, even when it should. <strong>"A resource meant to be genuinely disposable has been marked so it can never be destroyed at all. Find and fix the bug."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36,
          hintNudge: 'prevent_destroy is meant for genuinely critical, irreplaceable resources — check whether it\'s appropriate here.',
          hintPartial: 'Line 1 sets prevent_destroy = true on a resource that\'s explicitly meant to be disposable — remove it, since it now blocks even a legitimate, intended teardown.',
          hintFull: 'Fix: remove prevent_destroy = true (or set it to false) from the lifecycle block.',
          codeBlock: [
            'lifecycle { prevent_destroy = true }  # resource is meant to be disposable'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/prevent_destroy\s*=\s*false|remove.*prevent_destroy/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A stone shatters before its replacement is ready. <strong>"This resource is destroyed BEFORE its replacement is created, causing real downtime. Find and fix the bug."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36,
          hintNudge: 'A lifecycle setting exists specifically to build the replacement first, before tearing down the old one.',
          hintPartial: 'Line 1 has no create_before_destroy setting — add it so the new resource exists before the old one is removed, avoiding a gap in availability.',
          hintFull: 'Fix: add lifecycle { create_before_destroy = true }',
          codeBlock: [
            'resource "aws_launch_template" "web" {',
            '  # no lifecycle block at all, replacement causes real downtime',
            '}'
          ],
          buggyLineId: 1,
          correctFixPatterns: [/create_before_destroy\s*=\s*true/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A stone thrashes every time it\'s touched, for no real reason. <strong>"This resource shows spurious changes on every plan because of an attribute that\'s managed outside Terraform. Find and fix the bug."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36,
          hintNudge: 'An attribute that\'s legitimately managed by something else outside Terraform (like an autoscaler) needs to be explicitly excluded from Terraform\'s change detection.',
          hintPartial: 'Line 1 has no ignore_changes for the desired_capacity attribute, which an autoscaler legitimately adjusts outside Terraform — add it so Terraform stops proposing to "fix" it back every plan.',
          hintFull: 'Fix: add lifecycle { ignore_changes = [desired_capacity] }',
          codeBlock: [
            'resource "aws_autoscaling_group" "web" {',
            '  desired_capacity = 3  # an external autoscaler legitimately changes this',
            '}'
          ],
          buggyLineId: 1,
          correctFixPatterns: [/ignore_changes\s*=\s*\[desired_capacity\]/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The keeper weighs one great structure against many small ones: <strong>"Choosing between one giant Terraform configuration for the whole platform, vs. splitting it into smaller, separately-applied configurations. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40,
          hintNudge: 'A single giant configuration means every apply touches (and risks) everything at once — the blast radius of any single mistake is the entire platform.',
          hintPartial: 'Split into smaller, independently-applied configurations along real boundaries (e.g. per service, per environment) — this limits blast radius, since a mistake in one apply doesn\'t risk every other part of the platform simultaneously.',
          hintFull: 'Best: split into smaller, independently-applied configurations along genuine ownership/blast-radius boundaries — a single giant configuration means every apply carries the risk of affecting the entire platform at once, which doesn\'t scale safely.',
          options: [
            { id: 'a', label: 'One giant configuration for the whole platform', tier: 'wrong', why: 'Every apply, even a small one, carries the risk of touching (or breaking) the entire platform at once — a large, avoidable blast radius.' },
            { id: 'b', label: 'Split into smaller configurations along real ownership/blast-radius boundaries', tier: 'best', why: 'Limits the blast radius of any single apply to just the relevant part of the platform, rather than risking everything every time.' },
            { id: 'c', label: 'Split into one configuration per individual resource', tier: 'wrong', why: 'Over-fragments in the opposite direction, creating excessive cross-configuration dependencies and management overhead.' }
          ],
          justificationPatterns: [/blast\s*radius|split.*boundar|smaller\s*configuration/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"Deciding whether to pin provider versions exactly, or allow automatic upgrades to the latest version. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40,
          hintNudge: 'An unpinned provider can pull in a breaking change without warning, at the worst possible time — during an unrelated, routine apply.',
          hintPartial: 'Pin provider versions (or use a conservative version constraint) so upgrades happen deliberately, on your own schedule, rather than silently during a routine apply that could otherwise pull in a breaking change unexpectedly.',
          hintFull: 'Best: pin provider versions with a conservative constraint (e.g. allowing patch updates but not major/minor) — this prevents an unrelated routine apply from silently pulling in a breaking provider change, while still getting bug fixes.',
          options: [
            { id: 'a', label: 'Allow automatic upgrades to the latest provider version always', tier: 'wrong', why: 'Risks a routine, unrelated apply silently pulling in a breaking provider change with no warning or deliberate review.' },
            { id: 'b', label: 'Pin to a conservative version constraint, upgrading deliberately', tier: 'best', why: 'Prevents surprise breaking changes during routine applies, while still allowing controlled, deliberate upgrades on your own schedule.' },
            { id: 'c', label: 'Never upgrade providers at all, indefinitely', tier: 'wrong', why: 'Eventually misses real bug fixes and security patches — the goal is deliberate control, not permanent freezing.' }
          ],
          justificationPatterns: [/pin.*version|conservative\s*constraint|deliberate(ly)?\s*upgrad/i]
        },
        {
          mode: 'read_the_room',
          prompt: 'A stone is struck, and the whole wall shudders with it. <strong>A small, routine variable change unexpectedly triggers a plan to destroy and recreate a dozen unrelated resources. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40,
          hintNudge: 'Check whether those dozen resources actually depend on the changed value (directly or via a module input) — a shared variable feeding many resources can cascade further than expected.',
          hintPartial: 'The changed variable feeds into an attribute that forces replacement, and many resources reference it (directly or through a module) — the change cascades much further than the "small, routine" framing suggested.',
          hintFull: 'Diagnosis: the changed variable feeds a force-replacement attribute shared by many resources, cascading the impact. Fix: review the actual dependency graph (terraform graph, or plan output) before applying, and consider whether that variable\'s value truly needed to be shared that broadly.',
          outputBlock: [
            '$ terraform plan',
            '(after changing var.instance_type)',
            '-/+ 12 resources will be replaced'
          ],
          acceptableDiagnosesPatterns: [/shared\s*variable.*cascad/i, /forces?\s*replacement.*many/i],
          followUpFix: {
            prompt: 'Review the actual dependency graph before applying such a change:',
            acceptablePatterns: [],
            optimalPatterns: [/terraform\s+graph|dependency\s*graph/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A module\'s inner stones no longer match its outer shape. <strong>After upgrading a shared module to a new version, several unrelated configurations that use it start failing to plan. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40,
          hintNudge: 'Check whether the module\'s new version made a breaking change to its input variables or outputs that every caller assumed would stay stable.',
          hintPartial: 'The module\'s new version changed its input/output interface in a breaking way, and every configuration using it (without pinning to the old version) picked up the change simultaneously.',
          hintFull: 'Diagnosis: an unpinned shared module upgraded to a version with a breaking interface change, affecting every caller at once. Fix: pin callers to the last known-good module version while updating each one deliberately, and adopt semantic versioning discipline for the module going forward.',
          outputBlock: [
            '$ terraform plan',
            'Error: Unsupported argument "instance_count" (module\'s new version renamed it to "count")'
          ],
          acceptableDiagnosesPatterns: [/module.*(breaking|interface)\s*change/i, /unpinned\s*module/i],
          followUpFix: {
            prompt: 'Fix it by pinning callers to the last known-good module version:',
            acceptablePatterns: [],
            optimalPatterns: [/pin.*module\s*version|version\s*constraint/i]
          }
        },
        {
          mode: 'terminal',
          prompt: 'The keeper checks the exact shapes it is allowed to take: <strong>"Pin the required Terraform CLI version for this configuration to at least <code>1.5.0</code>."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32,
          hintNudge: 'A terraform block\'s required_version setting, taking a version constraint.',
          hintPartial: 'terraform { required_version = ">= _.5.0" }',
          hintFull: 'terraform { required_version = ">= 1.5.0" }',
          acceptablePatterns: [],
          optimalPatterns: [/required_version\s*=\s*">=\s*1\.5\.0"/i],
          baseCmds: []
        },
        {
          mode: 'terminal',
          prompt: 'The keeper reads a plan\'s exact intent aloud: <strong>"Show a saved plan file <code>tfplan</code>\'s contents in human-readable form."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28,
          hintNudge: 'The show command also works on a saved plan file, not just current state.',
          hintPartial: 'terraform show ______',
          hintFull: 'terraform show tfplan',
          acceptablePatterns: [],
          optimalPatterns: [/^terraform\s+show\s+tfplan$/i],
          baseCmds: ['terraform']
        },
        {
          mode: 'terminal',
          prompt: 'The keeper conjures a module from a specific well: <strong>"Reference a module from a specific Git tag <code>v1.2.0</code> at <code>git::https://example.com/modules.git</code>."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36,
          hintNudge: 'A git-sourced module reference appends a ref query parameter for the tag.',
          hintPartial: 'source = "git::https://example.com/modules.git?ref=____.__.__"',
          hintFull: 'source = "git::https://example.com/modules.git?ref=v1.2.0"',
          acceptablePatterns: [],
          optimalPatterns: [/source\s*=\s*"git::https:\/\/example\.com\/modules\.git\?ref=v1\.2\.0"/i],
          baseCmds: []
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A crooked module reference drifts with the tide. <strong>"This module source references a mutable branch, meaning it could change under everyone at any time. Find and fix the bug."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36,
          hintNudge: 'Referencing a branch (like main) means every apply could silently pick up whatever\'s newest there — pin to a specific tag or commit instead.',
          hintPartial: 'Line 1 references ?ref=main, a mutable branch — pin it to a specific version tag instead so it can\'t silently change underneath every caller.',
          hintFull: 'Fix: change ?ref=main to ?ref=v1.2.0 (or the appropriate pinned tag).',
          codeBlock: [
            'source = "git::https://example.com/modules.git?ref=main"'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/\?ref=v1\.2\.0|\?ref=v\d/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A crooked constraint lets in far too much. <strong>"This provider version constraint allows any major version at all, risking a future breaking change slipping in unnoticed. Find and fix the bug."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36,
          hintNudge: 'A completely unconstrained version (or a bare ">=") allows major version bumps that can include breaking changes.',
          hintPartial: 'Line 1\'s constraint ">= 4.0" allows any future major version too — use the pessimistic constraint operator to allow only compatible minor/patch updates.',
          hintFull: 'Fix: version = "~> 4.0"',
          codeBlock: [
            'version = ">= 4.0"'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/version\s*=\s*"~>\s*4\.0"/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A crooked module hides its true requirements. <strong>"This module uses a resource type from a provider it never actually declares as a requirement. Find and fix the bug."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36,
          hintNudge: 'A module using a specific provider should declare it in required_providers, so callers know exactly what they need to configure.',
          hintPartial: 'Line 1 uses an aws_ resource but the module has no required_providers block declaring aws at all — add one so callers know it\'s actually required.',
          hintFull: 'Fix: add required_providers { aws = { source = "hashicorp/aws" } } to the terraform block.',
          codeBlock: [
            'resource "aws_instance" "web" { ... }  # no required_providers block for aws anywhere in this module'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/required_providers\s*\{/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The keeper weighs a witness against a builder: <strong>"Deciding whether to use a provisioner (like local-exec) vs. baking configuration into a machine image ahead of time. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40,
          hintNudge: 'Provisioners run imperative scripts at create-time, outside Terraform\'s own dependency-tracked, declarative model — HashiCorp\'s own docs describe them as a last resort.',
          hintPartial: 'Prefer baking configuration into the image ahead of time (e.g. via Packer) — provisioners run outside Terraform\'s declarative, dependency-tracked model and are explicitly documented as a last resort for cases nothing else handles.',
          hintFull: 'Best: bake configuration into the machine image ahead of time where possible — provisioners are explicitly a last-resort escape hatch in Terraform\'s own documentation, since they run imperative scripts outside its declarative, dependency-aware model.',
          options: [
            { id: 'a', label: 'Bake configuration into the image ahead of time', tier: 'best', why: 'Stays within Terraform\'s declarative model and avoids the fragility of imperative provisioner scripts running outside its dependency tracking.' },
            { id: 'b', label: 'Use a local-exec provisioner for all configuration', tier: 'wrong', why: 'Runs outside Terraform\'s declarative model as an imperative script — explicitly documented as a last resort, not a default approach.' },
            { id: 'c', label: 'It never matters which approach is used', tier: 'wrong', why: 'A real, meaningful difference in reliability and how well the approach fits Terraform\'s own model.' }
          ],
          justificationPatterns: [/bake.*image|last\s*resort|declarative/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"Deciding whether a module should have sensible internal defaults for everything, or require every value to be explicitly passed in by the caller. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40,
          hintNudge: 'The right balance depends on WHICH values: safe, rarely-varying settings benefit from good defaults; genuinely consequential settings (like production sizing) are safer to force explicit.',
          hintPartial: 'Give sensible defaults for safe, rarely-varying settings (reducing boilerplate for callers), but require explicit values for genuinely consequential ones (like environment or instance sizing) where an unnoticed default could cause a real, costly mistake.',
          hintFull: 'Best: match the choice to the actual consequence of getting it wrong — sensible defaults for safe, low-consequence settings reduce caller boilerplate; requiring explicit values for consequential settings (environment, sizing, security-relevant flags) prevents an unnoticed wrong default from causing a real incident.',
          options: [
            { id: 'a', label: 'Sensible defaults for everything, to minimize required caller input', tier: 'wrong', why: 'For genuinely consequential settings, an unnoticed default (like accidentally defaulting to a small instance size or wrong environment) can cause a real, costly mistake.' },
            { id: 'b', label: 'Match the choice to each value\'s actual consequence if defaulted wrong', tier: 'best', why: 'Balances caller convenience for safe settings against safety for genuinely consequential ones — not a uniform rule either way.' },
            { id: 'c', label: 'Require every single value to be explicitly passed in, with no defaults ever', tier: 'wrong', why: 'Adds unnecessary boilerplate for genuinely safe, rarely-varying settings where a sensible default would cause no harm.' }
          ],
          justificationPatterns: [/match.*consequence|consequential|sensible\s*default/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"Deciding how to handle a module that needs different behavior for AWS vs. Azure, since a platform runs in both. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40,
          hintNudge: 'Trying to make ONE module handle both providers with heavy internal conditionals tends to become a genuinely hard-to-maintain tangle — provider-specific modules with a shared, provider-agnostic interface are usually cleaner.',
          hintPartial: 'Write separate, provider-specific modules (one for AWS, one for Azure) behind a shared, consistent interface (similar input/output names) — a single module with heavy internal per-provider conditionals tends to become genuinely hard to read and maintain.',
          hintFull: 'Best: separate provider-specific modules sharing a consistent interface — this keeps each module\'s internals genuinely clean and provider-idiomatic, rather than fighting to cram two providers\' very different resource models into one conditional-heavy module.',
          options: [
            { id: 'a', label: 'One module with heavy internal conditionals for each provider', tier: 'wrong', why: 'Tends to become genuinely hard to read and maintain as both providers\' resource models grow more different over time.' },
            { id: 'b', label: 'Separate provider-specific modules sharing a consistent interface', tier: 'best', why: 'Keeps each module\'s internals clean and idiomatic for its own provider, while still being interchangeable from the caller\'s perspective.' },
            { id: 'c', label: 'Only support one provider, and manually manage the other outside Terraform', tier: 'wrong', why: 'Gives up IaC\'s benefits entirely for the provider handled manually, when a genuinely maintainable dual-module approach exists.' }
          ],
          justificationPatterns: [/separate\s*(provider|module)|shared\s*interface|per-provider/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"Deciding how to test Terraform module changes before merging, beyond just terraform plan looking reasonable. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40,
          hintNudge: 'A plan looking reasonable doesn\'t prove the module actually WORKS when applied — real automated tests that apply against a real (disposable) environment catch things a plan-review alone can\'t.',
          hintPartial: 'Use an actual testing framework (like Terraform\'s own test framework, or Terratest) that applies the module against a real, disposable test environment and asserts on the outcome — a plan looking reasonable doesn\'t prove it actually works end-to-end.',
          hintFull: 'Best: adopt real automated testing (Terraform\'s built-in test framework, or a tool like Terratest) that actually applies the module to a disposable environment and validates real outcomes — reviewing plan output alone can miss issues that only surface once something is actually created.',
          options: [
            { id: 'a', label: 'Just review the plan output carefully before merging', tier: 'defensible', why: 'Catches some issues, but a plan looking correct doesn\'t guarantee the actual apply behaves correctly — some problems only surface once resources are genuinely created.' },
            { id: 'b', label: 'Use an automated testing framework that applies against a real disposable environment', tier: 'best', why: 'Validates actual outcomes, not just planned intent — catches real issues a plan review alone structurally can\'t see.' },
            { id: 'c', label: 'Skip testing entirely and rely on catching issues in production', tier: 'wrong', why: 'Trades a real, addressable pre-merge cost for a much more expensive and disruptive production incident when something goes wrong.' }
          ],
          justificationPatterns: [/automated\s*test|terratest|apply.*disposable/i]
        },
        {
          mode: 'read_the_room',
          prompt: 'A carving assumed permanent begins to crack. <strong>A module that used to work fine now fails to plan after the team upgraded to a new major Terraform CLI version. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40,
          hintNudge: 'A major Terraform version bump can include genuine breaking changes to syntax or behavior — check the release\'s upgrade guide for exactly what changed.',
          hintPartial: 'The new major Terraform version introduced a genuine breaking change (in syntax or provider behavior) that this configuration relied on the old behavior for — check the specific version\'s upgrade guide.',
          hintFull: 'Diagnosis: a genuine breaking change in the new major Terraform version affects this configuration. Fix: consult the specific version\'s upgrade guide for the exact breaking change, update the configuration accordingly, and pin required_version deliberately going forward to control future upgrades.',
          outputBlock: [
            '$ terraform plan',
            'Error: Reserved argument name in module block',
            '(this exact pattern worked fine before the CLI upgrade)'
          ],
          acceptableDiagnosesPatterns: [/breaking\s*change.*(version|upgrade)/i, /major\s*version.*(bump|upgrade)/i],
          followUpFix: {
            prompt: 'Fix it by consulting the version\'s upgrade guide and updating accordingly:',
            acceptablePatterns: [],
            optimalPatterns: [/upgrade\s*guide|required_version/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A borrowed carving no longer fits the wall it came from. <strong>A module maintained by another team is used in dozens of places, and a recent change to it broke several callers in subtle, hard-to-spot ways. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40,
          hintNudge: 'A module used across many teams needs a real contract (semantic versioning, changelog, tested compatibility) — subtle breaks suggest that contract wasn\'t being honored or communicated.',
          hintPartial: 'The module\'s maintainers made a subtle, undocumented behavior change without treating it as a breaking change (no major version bump, no changelog callout) — callers had no signal that anything meaningful had shifted.',
          hintFull: 'Diagnosis: a subtle behavior change was released without proper semantic versioning or changelog communication, so callers had no warning. Fix: adopt (or enforce) semantic versioning discipline for the module, with a clear changelog, and add automated compatibility tests that would catch this class of subtle regression before release.',
          outputBlock: [
            '$ (module changelog) "v2.3.1: minor internal cleanup" (actually changed default behavior of a key attribute)'
          ],
          acceptableDiagnosesPatterns: [/undocumented.*(breaking|behavior)\s*change/i, /no\s*(semantic\s*)?versioning\s*discipline/i],
          followUpFix: {
            prompt: 'Fix it by enforcing semantic versioning discipline and compatibility tests:',
            acceptablePatterns: [],
            optimalPatterns: [/semantic\s*versioning|compatibility\s*test|changelog/i]
          }
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'A checklist forms from carved stone. <strong>Sequence the correct order for safely upgrading a Terraform provider to a new major version.</strong>',
          steps: [
            'Read the provider\'s upgrade guide for breaking changes',
            'Update the version constraint in a non-production environment first',
            'Run terraform plan and review every proposed change carefully',
            'Apply in non-production and verify real behavior',
            'Promote the upgrade to production once validated'
          ],
          damageIfCorrect: 26, damageIfOptimal: 42,
          damageToHeroIfWrong: 22
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'A second checklist follows. <strong>Sequence the correct order for introducing automated testing to an existing, previously-untested Terraform module.</strong>',
          steps: [
            'Identify the module\'s core, most important behaviors to validate',
            'Set up a disposable test environment/account',
            'Write tests that apply the module and assert on real outcomes',
            'Run the tests in CI on every change before merge'
          ],
          damageIfCorrect: 26, damageIfOptimal: 42,
          damageToHeroIfWrong: 22
        }
      ]
    },
    {
      name: 'Level 4 — Real Incidents',
      hp: 175,
      questions: [
        {
          mode: 'terminal',
          prompt: 'The keeper breaks a lock left standing too long: <strong>"Force-release a stuck state lock, given its lock ID <code>8e5a1234</code>."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 32,
          hintNudge: 'A dedicated command exists for exactly this, taking the lock ID as its argument.',
          hintPartial: 'terraform force-______ 8e5a1234',
          hintFull: 'terraform force-unlock 8e5a1234',
          acceptablePatterns: [],
          optimalPatterns: [/^terraform\s+force-unlock\s+8e5a1234$/i],
          baseCmds: ['terraform']
        },
        {
          mode: 'terminal',
          prompt: 'The keeper checks a stone\'s exact recorded shape: <strong>"Show the raw state data in JSON format."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28, timeAllotted: 32,
          hintNudge: 'The show command has a JSON output flag.',
          hintPartial: 'terraform show -____',
          hintFull: 'terraform show -json',
          acceptablePatterns: [/^terraform\s+show$/i],
          optimalPatterns: [/^terraform\s+show\s+-json$/i],
          baseCmds: ['terraform']
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A crooked secret is carved directly into the ledger. <strong>"A real database password is hardcoded directly into the .tf file. Find and fix the bug."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36, timeAllotted: 32,
          hintNudge: 'A literal secret in source code is exposed to anyone with repo access and ends up in state too — reference it from somewhere that isn\'t committed.',
          hintPartial: 'Line 1 hardcodes the real password directly — reference it via a variable (populated from a secrets manager or environment variable) instead.',
          hintFull: 'Fix: password = var.db_password',
          codeBlock: [
            'password = "Sup3rSecr3t!"'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/password\s*=\s*var\.db_password/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A crooked backend leaves no lock at all. <strong>"This remote backend configuration has no locking mechanism configured, risking concurrent-apply corruption. Find and fix the bug."</strong>",',
          damageIfCorrect: 22, damageIfOptimal: 36, timeAllotted: 32,
          hintNudge: 'An S3 backend needs a paired DynamoDB table for locking — an S3-only backend has no locking at all.',
          hintPartial: 'Line 1 configures only an S3 bucket with no dynamodb_table for locking — add one so concurrent applies are actually prevented.',
          hintFull: 'Fix: add dynamodb_table = "terraform-locks" to the backend block.',
          codeBlock: [
            'backend "s3" { bucket = "tf-state", key = "prod/terraform.tfstate", region = "us-east-1" }'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/dynamodb_table\s*=\s*"terraform-locks"/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The keeper watches a plan promise annihilation: <strong>"A terraform plan for a routine change unexpectedly shows the production database being destroyed and recreated. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40, timeAllotted: 32,
          hintNudge: 'Never apply a plan you don\'t fully understand — the plan is the safeguard specifically catching this before anything real happens.',
          hintPartial: 'Stop and investigate exactly WHY the plan shows a forced replacement before doing anything else — never apply a plan whose scope doesn\'t match your intent, no matter how routine the intended change seemed.',
          hintFull: 'Best: stop, don\'t apply, and investigate exactly which attribute is forcing the replacement and why — this is precisely the scenario the plan step exists to catch before it becomes a real, destructive action.',
          options: [
            { id: 'a', label: 'Stop and investigate why the plan shows a forced replacement before doing anything', tier: 'best', why: 'The plan step exists specifically to catch a mismatch like this before it becomes a real, destructive action — investigating first is exactly the safeguard working as intended.' },
            { id: 'b', label: 'Apply it anyway since the variable change itself seemed routine', tier: 'wrong', why: 'Ignores the plan\'s explicit warning about a forced replacement — exactly the kind of surprise the plan step is meant to catch before real damage happens.' },
            { id: 'c', label: 'Cancel the change entirely and never touch this resource again', tier: 'wrong', why: 'Overcorrects — the actual routine change might still be achievable safely once the specific cause of the forced replacement is understood.' }
          ],
          justificationPatterns: [/stop.*investigat|never\s*apply.*don'?t\s*understand/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"A secret was discovered stored in plain text inside the Terraform state file. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40, timeAllotted: 32,
          hintNudge: 'State containing a secret means anyone with read access to that state (or its backend storage/backups) has effectively seen the secret — the same instinct as any other exposed credential.',
          hintPartial: 'Rotate/revoke the exposed secret immediately (state access counts as exposure, just like a log or a committed file), then move to a pattern that avoids storing secrets in state going forward (e.g. having Terraform reference a secrets manager rather than holding the raw value itself).',
          hintFull: 'Best: rotate/revoke the credential immediately, treating state access as real exposure — then adopt a pattern where Terraform references a secret from a secrets manager at apply time rather than the raw value ever being written into state.',
          options: [
            { id: 'a', label: 'Rotate the secret immediately, then adopt a pattern avoiding secrets in state', tier: 'best', why: 'Treats state access as real exposure (same as any other leak) and fixes the recurring cause, not just this one instance.' },
            { id: 'b', label: 'Restrict access to the state file going forward, without rotating the secret', tier: 'wrong', why: 'Doesn\'t address that the secret has already potentially been seen by anyone with prior access — restricting future access alone doesn\'t un-expose it.' },
            { id: 'c', label: 'Leave it, since state files are usually stored securely anyway', tier: 'wrong', why: 'Assumes a security property ("usually stored securely") that isn\'t actually guaranteed, and doesn\'t address that the secret is already in plain text there.' }
          ],
          justificationPatterns: [/rotate|revoke|state\s*access.*exposure/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"After a bad apply, the state file itself appears to be corrupted or in an inconsistent state. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40, timeAllotted: 32,
          hintNudge: 'Before attempting any repair, confirm whether a backup/prior version of the state actually exists — most remote backends keep some form of state history or versioning.',
          hintPartial: 'Check whether the remote backend has versioning/backup enabled (many do, like S3 versioning) — restoring from a known-good prior version is far safer than attempting to manually hand-edit a corrupted state file.',
          hintFull: 'Best: first check for a backend-level backup or version history (e.g. S3 bucket versioning) to restore from a known-good prior state — manually hand-editing a corrupted state file is risky and should be a last resort, not the first move.',
          options: [
            { id: 'a', label: 'Check for a backend-level backup/version history to restore from', tier: 'best', why: 'A known-good prior state is far safer to restore from than attempting to manually repair a corrupted file, and most remote backends support some form of this.' },
            { id: 'b', label: 'Manually hand-edit the state file to fix the inconsistency', tier: 'wrong', why: 'Risky and error-prone as a first move — a small mistake while hand-editing state can make the situation meaningfully worse.' },
            { id: 'c', label: 'Delete the state file and let Terraform recreate everything', tier: 'wrong', why: 'Would cause Terraform to think none of the existing infrastructure exists, likely triggering destructive recreation of real, running resources.' }
          ],
          justificationPatterns: [/backup|version\s*history|restore.*prior/i]
        },
        {
          mode: 'read_the_room',
          prompt: 'The keeper builds a mirror image of itself by mistake. <strong>A CI pipeline runs terraform apply against the wrong workspace, applying staging\'s configuration to production\'s state. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 26, damageIfOptimal: 42, timeAllotted: 32,
          hintNudge: 'Check the pipeline\'s actual workspace-selection logic — a missing or incorrect environment variable/parameter can silently select the wrong workspace.',
          hintPartial: 'The CI pipeline\'s workspace-selection step didn\'t correctly set the target workspace for this run (e.g. a missing environment variable), so it defaulted to (or reused) the wrong one.',
          hintFull: 'Diagnosis: the pipeline\'s workspace selection was misconfigured or defaulted incorrectly. Fix: audit and correct the pipeline\'s workspace-selection logic, add an explicit confirmation/guard for production applies, and review what damage (if any) was done to production.',
          outputBlock: [
            '$ (CI logs) terraform workspace show',
            'default',
            '(pipeline intended to select "staging" but the selection step silently failed)'
          ],
          acceptableDiagnosesPatterns: [/workspace\s*selection.*(misconfigur|fail)/i, /pipeline.*wrong\s*workspace/i],
          followUpFix: {
            prompt: 'Fix it by adding an explicit guard for production applies:',
            acceptablePatterns: [],
            optimalPatterns: [/guard|confirmation|audit.*pipeline/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'Two hands reach for the same stone at once. <strong>Two team members\' CI pipelines both attempt to apply to the same state simultaneously, and one fails with a lock error mid-deploy window. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 26, damageIfOptimal: 42, timeAllotted: 32,
          hintNudge: 'This is the locking mechanism working correctly — the actual problem is a process gap that let two applies to the same state get triggered concurrently in the first place.',
          hintPartial: 'The lock itself is doing its job correctly by preventing a real race condition — the actual gap is that the CI/deployment process allows two applies against the same state to be triggered concurrently at all.',
          hintFull: 'Diagnosis: the lock is working as intended, but the underlying process allows concurrent applies to the same state to be triggered in the first place. Fix: serialize deploys to the same state (e.g. a pipeline concurrency limit/queue for that specific state/environment) so this doesn\'t rely on the lock alone to prevent wasted, failed runs.',
          outputBlock: [
            '$ (CI run B, mid-deploy window) Error: Error acquiring the state lock',
            '(CI run A is actively applying to the same state at the same time)'
          ],
          acceptableDiagnosesPatterns: [/lock.*working\s*(correctly|as\s*intended)/i, /concurrent\s*applies?.*allowed/i],
          followUpFix: {
            prompt: 'Fix the underlying process by serializing deploys to the same state:',
            acceptablePatterns: [],
            optimalPatterns: [/serialize|concurrency\s*limit|queue/i]
          }
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'Every stone in the Statekeeper realigns at once. <strong>Sequence the correct response to discovering a stuck state lock.</strong>',
          steps: [
            'Confirm no legitimate apply is actually still in progress',
            'Identify the exact lock ID from the error message',
            'Force-unlock using that specific lock ID',
            'Investigate why the previous run was interrupted'
          ],
          damageIfCorrect: 28, damageIfOptimal: 46, timeAllotted: 32,
          damageToHeroIfWrong: 24
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'A second alignment, more urgent than the first. <strong>Sequence the correct response to discovering a secret stored in plain text in state.</strong>',
          steps: [
            'Rotate/revoke the exposed secret immediately',
            'Restrict access to the state backend to only those who need it',
            'Adopt a pattern that avoids writing secrets into state going forward',
            'Audit who had access to the state during the exposure window'
          ],
          damageIfCorrect: 28, damageIfOptimal: 46, timeAllotted: 32,
          damageToHeroIfWrong: 24
        },
        {
          mode: 'terminal',
          prompt: 'The keeper checks exactly what a plan intends before it acts: <strong>"Save a machine-readable JSON version of a saved plan file <code>tfplan</code> for automated review."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36, timeAllotted: 32,
          hintNudge: 'The show command\'s JSON flag also works on a saved plan file, not just live state.',
          hintPartial: 'terraform show -____ tfplan',
          hintFull: 'terraform show -json tfplan',
          acceptablePatterns: [],
          optimalPatterns: [/^terraform\s+show\s+-json\s+tfplan$/i],
          baseCmds: ['terraform']
        },
        {
          mode: 'terminal',
          prompt: 'The keeper checks a resource it fears has vanished for good: <strong>"Confirm whether <code>aws_instance.web</code> still exists in state after a suspected accidental removal."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 32,
          hintNudge: 'The same state list command, but grep for the specific resource to confirm presence or absence.',
          hintPartial: 'terraform state list | ____ aws_instance.web',
          hintFull: 'terraform state list | grep aws_instance.web',
          acceptablePatterns: [/^terraform\s+state\s+list$/i],
          optimalPatterns: [/^terraform\s+state\s+list\s*\|\s*grep\s+aws_instance\.web$/i],
          baseCmds: ['terraform']
        },
        {
          mode: 'terminal',
          prompt: 'The keeper restores a stone it never meant to lose: <strong>"Re-add a resource that was accidentally removed from state, given it still exists in the real infrastructure with ID <code>i-0abc123</code>."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36, timeAllotted: 32,
          hintNudge: 'The same import command used for adopting any existing unmanaged resource applies here too.',
          hintPartial: 'terraform ______ aws_instance.web i-0abc123',
          hintFull: 'terraform import aws_instance.web i-0abc123',
          acceptablePatterns: [],
          optimalPatterns: [/^terraform\s+import\s+aws_instance\.web\s+i-0abc123$/i],
          baseCmds: ['terraform']
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A crooked apply skips the one check that mattered. <strong>"This CI pipeline applies directly from a fresh plan without ever saving or reviewing it first. Find and fix the bug."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 38, timeAllotted: 32,
          hintNudge: 'Applying an implicit, un-reviewed plan means nobody actually confirmed what was about to happen before it happened.',
          hintPartial: 'Line 1 runs apply directly with auto-approve and no saved plan at all — save the plan first, require review, then apply that exact reviewed file.',
          hintFull: 'Fix: terraform plan -out=tfplan (reviewed) then terraform apply tfplan',
          codeBlock: [
            'terraform apply -auto-approve  # no plan ever saved or reviewed first'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/terraform\s+plan\s+-out=tfplan.*terraform\s+apply\s+tfplan|apply\s+tfplan/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A crooked destroy sweeps far wider than intended. <strong>"This CI job runs a full terraform destroy on every pull request close, with no scoping at all. Find and fix the bug."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 38, timeAllotted: 32,
          hintNudge: 'An unscoped destroy on every PR close is far broader than what a genuine "clean up this PR\'s ephemeral environment" need requires.',
          hintPartial: 'Line 1 runs an unscoped destroy — target it specifically to the PR\'s own ephemeral workspace/state, not the shared or default one.',
          hintFull: 'Fix: terraform destroy -auto-approve (scoped to the PR-specific workspace, selected first)',
          codeBlock: [
            'terraform destroy -auto-approve  # runs against whatever workspace happens to be selected, no scoping'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/workspace\s*select|scoped.*workspace/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A crooked import leaves the config blind. <strong>"A resource was imported into state, but the matching configuration block was never actually written. Find and fix the bug."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 38, timeAllotted: 32,
          hintNudge: 'terraform import only adds a resource to STATE — it does not generate the matching configuration block for you (in older Terraform versions); without that, the next plan will try to destroy it.',
          hintPartial: 'The resource exists in state but has no corresponding resource block in the .tf files — Terraform will see it as "not in config" and plan to destroy it. Write the matching configuration block now.',
          hintFull: 'Fix: write a resource block matching the imported resource\'s actual real-world configuration.',
          codeBlock: [
            '(state) aws_instance.web exists',
            '(config files) no resource "aws_instance" "web" block anywhere'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/write.*(resource\s*block|matching\s*config)/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The keeper watches an apply promise more damage than it should: <strong>"A terraform apply is already mid-progress when someone notices the plan it\'s executing was stale (state changed since the plan was generated). Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 42, timeAllotted: 32,
          hintNudge: 'Terraform itself detects a stale plan and will refuse to apply it if state has changed — the real question is what to do given that safeguard already exists, versus panicking mid-apply.',
          hintPartial: 'Let Terraform\'s own built-in staleness check do its job — it will refuse to apply a plan against state that has changed since the plan was generated; the actual action is confirming this safeguard is in place, not manually interrupting a running apply.',
          hintFull: 'Best: trust (and verify) Terraform\'s own built-in protection — it detects when state has changed since a plan was generated and refuses to apply it, exactly to prevent this scenario; interrupting a running apply manually is generally riskier than the safeguard already in place.',
          options: [
            { id: 'a', label: 'Manually kill the running apply immediately', tier: 'wrong', why: 'Interrupting a mid-progress apply can itself leave infrastructure in a genuinely inconsistent, harder-to-diagnose state — often riskier than the situation it\'s meant to prevent.' },
            { id: 'b', label: 'Trust that Terraform\'s own staleness check will refuse the stale plan', tier: 'best', why: 'Terraform is specifically built to detect this exact scenario and refuse to apply a plan against state that has since changed — this safeguard already exists for this case.' },
            { id: 'c', label: 'Let it apply anyway since the plan was generated correctly at the time', tier: 'wrong', why: 'Ignores that state has since changed — applying a genuinely stale plan risks acting on assumptions that are no longer true.' }
          ],
          justificationPatterns: [/staleness\s*check|built-?in\s*protection|refuse.*stale/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"A junior engineer accidentally ran terraform destroy against the wrong workspace and it partially completed before being stopped. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 42, timeAllotted: 32,
          hintNudge: 'The immediate priority is understanding exactly what was destroyed and restoring it — the process-fix (preventing recurrence) is real but secondary to stopping ongoing impact.',
          hintPartial: 'Immediately assess exactly what was destroyed (via state and provider logs), restore/recreate the missing resources (import if they can be recovered, or reapply config to recreate them), then separately address the process gap that allowed the wrong-workspace destroy in the first place.',
          hintFull: 'Best: first assess the actual scope of damage (what was destroyed, via state history/logs) and restore it as the immediate priority, then separately address the process gap (e.g. requiring explicit workspace confirmation before any destroy) — blaming the individual doesn\'t fix the process gap that let this happen.',
          options: [
            { id: 'a', label: 'Immediately assess damage and restore, then fix the process gap separately', tier: 'best', why: 'Prioritizes stopping and reversing actual impact first, then addresses the systemic gap that allowed a wrong-workspace destroy to happen at all.' },
            { id: 'b', label: 'Focus primarily on retraining the individual engineer', tier: 'wrong', why: 'Doesn\'t address the actual current damage, and a process/tooling gap (not knowing which workspace was active) is a systemic issue, not just an individual mistake.' },
            { id: 'c', label: 'Wait to see if anything actually breaks before taking action', tier: 'wrong', why: 'Passive in a situation with known, partial resource destruction — the damage should be actively assessed and addressed, not waited out.' }
          ],
          justificationPatterns: [/assess.*damage|restore|process\s*gap/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"A shared remote state backend (e.g. an S3 bucket) itself becomes unavailable during a critical deploy window. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 42, timeAllotted: 32,
          hintNudge: 'Without the state backend, Terraform genuinely cannot safely plan or apply at all — attempting to work around this (like reconstructing state from memory) is far riskier than simply waiting for the backend to recover.',
          hintPartial: 'Wait for the backend to recover rather than attempting risky workarounds like manually reconstructing state — Terraform structurally cannot safely operate without access to its state, and guessing at a reconstruction risks real, hard-to-reverse corruption.',
          hintFull: 'Best: wait for the backend to recover, and communicate the delay — Terraform cannot safely plan or apply without access to its state, and attempting to reconstruct or bypass this creates a real, serious risk of corrupting the actual source of truth about what infrastructure exists.',
          options: [
            { id: 'a', label: 'Wait for the state backend to recover before attempting anything', tier: 'best', why: 'Terraform structurally requires safe access to state — waiting avoids the real risk of corrupting the source of truth by attempting a workaround.' },
            { id: 'b', label: 'Manually reconstruct a best-guess state file to proceed anyway', tier: 'wrong', why: 'A genuinely risky workaround — an inaccurate reconstructed state can cause Terraform to make seriously wrong decisions about what to create, modify, or destroy.' },
            { id: 'c', label: 'Apply changes directly via the cloud console instead, bypassing Terraform entirely', tier: 'wrong', why: 'Creates drift the moment the backend recovers, and abandons Terraform\'s safety guarantees for this deploy entirely.' }
          ],
          justificationPatterns: [/wait.*(recover|backend)|cannot\s*safely|risk.*corrupt/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"A third-party module used in production is discovered to have a critical, actively-exploited vulnerability. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 42, timeAllotted: 32,
          hintNudge: 'An ACTIVELY EXPLOITED vulnerability changes the urgency calculus significantly compared to a merely-announced one — the response needs to move faster and treat current exposure as potentially already compromised.',
          hintPartial: 'Given it\'s actively exploited (not just announced), treat any resources built from the vulnerable module as potentially already compromised — investigate for signs of actual compromise immediately, while urgently patching/replacing the module, rather than treating this as a normal-priority remediation.',
          hintFull: 'Best: treat this with active-incident urgency, not routine remediation — investigate immediately for signs of actual compromise (given it\'s ACTIVELY exploited, not just announced), while urgently patching or replacing the vulnerable module across all affected infrastructure.',
          options: [
            { id: 'a', label: 'Schedule the module update for the next regular maintenance window', tier: 'wrong', why: '"Actively exploited" means real attacks may already be happening — a normal-priority maintenance-window response doesn\'t match that urgency.' },
            { id: 'b', label: 'Treat it as an active incident — investigate for compromise while urgently patching', tier: 'best', why: 'Matches the response urgency to the actual severity signal ("actively exploited") rather than treating it like a routine future-dated fix.' },
            { id: 'c', label: 'Only patch it, without investigating for any signs of existing compromise', tier: 'defensible', why: 'Addresses the vulnerability going forward, but skips checking whether the active exploitation has already affected current infrastructure.' }
          ],
          justificationPatterns: [/active(ly)?\s*(exploited|incident)|investigate.*compromise|urgent/i]
        },
        {
          mode: 'read_the_room',
          prompt: 'A carving is undone by a hand that never should have touched it. <strong>An engineer runs terraform destroy locally against production state by mistake, and it\'s stopped partway through. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 28, damageIfOptimal: 46, timeAllotted: 32,
          hintNudge: 'Check exactly what was actually destroyed (via state history/provider logs) before deciding what to restore — don\'t assume the scope without confirming it.',
          hintPartial: 'A local run against production (likely due to a misconfigured or unverified backend/workspace locally) partially destroyed real resources — the root cause is that local runs against production state were possible at all without a stronger safeguard.',
          hintFull: 'Diagnosis: a local terraform run was able to target production state without sufficient safeguards. Fix: restore the destroyed resources (import or recreate), then remove the ability to run applies/destroys against production from unverified local environments — route all production changes through a controlled CI pipeline with explicit environment confirmation.',
          outputBlock: [
            '$ (local terminal) terraform destroy',
            '(backend pointed at production state, engineer believed it was a personal sandbox)'
          ],
          acceptableDiagnosesPatterns: [/local\s*run.*production/i, /no\s*safeguard.*production/i],
          followUpFix: {
            prompt: 'Fix the underlying gap by routing production changes exclusively through a controlled pipeline:',
            acceptablePatterns: [],
            optimalPatterns: [/ci\s*pipeline|controlled\s*pipeline|remove.*local.*production/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'The keeper\'s carvings drift apart in secret, unnoticed for a season. <strong>A quarterly infrastructure audit discovers dozens of resources that were manually modified outside Terraform months ago, with plans silently failing to catch it. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 28, damageIfOptimal: 46, timeAllotted: 32,
          hintNudge: 'A drift check has to actually RUN regularly for anyone to notice — if terraform plan is only ever run right before an intentional change, drift from unrelated manual edits can sit unnoticed for a long time.',
          hintPartial: 'There was no regular, scheduled drift-detection process — plan was only ever run right before an intentional change to that specific resource, so unrelated manual edits elsewhere went completely unnoticed for months.',
          hintFull: 'Diagnosis: no regular drift-detection process existed, so manual out-of-band changes accumulated unnoticed. Fix: set up a scheduled, regular drift-detection job (e.g. a periodic terraform plan -refresh-only across all configurations) that alerts on any detected drift, rather than relying on drift happening to surface during an unrelated intentional change.',
          outputBlock: [
            '$ (audit findings) 40+ resources manually modified, oldest dating back 5 months',
            '(no scheduled drift detection ever ran; plan only run ad hoc before intentional changes)'
          ],
          acceptableDiagnosesPatterns: [/no\s*(regular|scheduled)\s*drift\s*detection/i, /never\s*ran\s*(regularly|scheduled)/i],
          followUpFix: {
            prompt: 'Fix it by setting up a scheduled, regular drift-detection job:',
            acceptablePatterns: [],
            optimalPatterns: [/scheduled.*drift|periodic.*(plan|refresh)/i]
          }
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'A checklist of restoration, carved in haste. <strong>Sequence the correct order for responding to an accidental production destroy that was stopped partway through.</strong>',
          steps: [
            'Confirm exactly what was actually destroyed via state/provider logs',
            'Assess real user/business impact of the missing resources',
            'Restore the destroyed resources (import or recreate as appropriate)',
            'Fix the process gap that allowed the accidental destroy',
            'Document the incident and share the process fix with the team'
          ],
          damageIfCorrect: 30, damageIfOptimal: 50, timeAllotted: 32,
          damageToHeroIfWrong: 26
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'A second checklist, drawn against a quiet drift. <strong>Sequence the correct order for setting up ongoing drift detection across an organization\'s Terraform configurations.</strong>',
          steps: [
            'Inventory every configuration and its backend',
            'Set up a scheduled job running plan -refresh-only against each',
            'Alert automatically when drift is detected',
            'Establish a process for triaging and resolving detected drift',
            'Review drift-detection coverage as new configurations are added'
          ],
          damageIfCorrect: 30, damageIfOptimal: 50, timeAllotted: 32,
          damageToHeroIfWrong: 26
        }
      ]
    },
    {
      name: 'Level 5 — Interview-Caliber Judgment',
      hp: 195,
      questions: [
        {
          mode: 'terminal',
          prompt: 'The keeper writes to a scroll no one else can read: <strong>"Set an output value as sensitive so it doesn\'t print by default."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 34,
          hintNudge: 'The output block has the same sensitive flag a variable has.',
          hintPartial: 'output "db_password" { value = aws_db_instance.prod.password, sensitive = ____ }',
          hintFull: 'output "db_password" { value = aws_db_instance.prod.password, sensitive = true }',
          acceptablePatterns: [],
          optimalPatterns: [/sensitive\s*=\s*true/i],
          baseCmds: []
        },
        {
          mode: 'terminal',
          prompt: 'The keeper checks a module\'s own pinned age: <strong>"Pin a module source to an exact version, <code>2.1.0</code>, of the module <code>terraform-aws-modules/vpc/aws</code>."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36,
          hintNudge: 'A module block\'s version argument, taking an exact version constraint.',
          hintPartial: 'module "vpc" { source = "terraform-aws-modules/vpc/aws", version = "__.__.__" }',
          hintFull: 'module "vpc" { source = "terraform-aws-modules/vpc/aws", version = "2.1.0" }',
          acceptablePatterns: [],
          optimalPatterns: [/version\s*=\s*"2\.1\.0"/i],
          baseCmds: []
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A crooked backend key collides with another realm. <strong>"Two separate environments\' backend configs point at the exact same state key, risking one overwriting the other. Find and fix the bug."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 42,
          hintNudge: 'Each environment needs its own distinct state key/path — sharing one means they\'re actually the same state.',
          hintPartial: 'Line 1\'s key is identical to another environment\'s — give each environment its own distinct key path (e.g. including the environment name).',
          hintFull: 'Fix: key = "prod/terraform.tfstate" (distinct per environment)',
          codeBlock: [
            'key = "app/terraform.tfstate"  # staging backend uses the exact same key'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/key\s*=\s*"prod\/terraform\.tfstate"/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The keeper weighs monorepo against many small realms: <strong>"Deciding between a single monorepo containing all Terraform configurations vs. a separate repo per team/service. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 44,
          hintNudge: 'The right answer depends on how tightly coupled the teams\' actual infrastructure changes are — there\'s no universal right answer, only real tradeoffs each way.',
          hintPartial: 'Choose based on how coupled teams\' changes actually are: a monorepo gives easier cross-cutting visibility and shared module reuse, but requires real access-control discipline (CODEOWNERS, path-based CI) since everyone technically has repo access; separate repos give natural access boundaries but can make genuinely cross-team changes more coordination-heavy.',
          hintFull: 'Best: there\'s no universal answer — a monorepo suits teams with frequent cross-cutting changes and shared modules (with real CI/access discipline like path-based triggers and CODEOWNERS to keep it safe), while separate repos suit teams that are genuinely independent and benefit from natural access boundaries. Match the choice to how coupled the actual work is, not a general best practice.',
          options: [
            { id: 'a', label: 'Always a monorepo, since it centralizes everything', tier: 'wrong', why: 'Requires real CI/access-control discipline to stay safe at scale — treating it as a universal default ignores that discipline cost for teams that don\'t need the coupling.' },
            { id: 'b', label: 'Match the choice to how coupled teams\' actual infrastructure changes are', tier: 'best', why: 'Recognizes both options have genuine, different tradeoffs — the right choice depends on the actual coupling and access-control needs of the specific teams involved.' },
            { id: 'c', label: 'Always separate repos, since it\'s simpler to reason about', tier: 'wrong', why: 'Can make genuinely cross-team, coordinated changes more coordination-heavy than they need to be for teams that actually work closely together.' }
          ],
          justificationPatterns: [/coupled|match.*(need|team)|depends\s*on/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"Deciding how to enforce organization-wide policy (e.g. \'no public S3 buckets\') across many independent Terraform configurations. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 44,
          hintNudge: 'Relying on every engineer remembering a written guideline doesn\'t scale reliably — a policy-as-code tool that actually blocks non-compliant plans removes that dependence on memory.',
          hintPartial: 'Adopt a policy-as-code tool (like Sentinel or OPA) that automatically evaluates every plan against the policy and blocks non-compliant applies — a written guideline relies on every engineer remembering it every time, which reliably fails at scale.',
          hintFull: 'Best: enforce via policy-as-code (Sentinel, OPA, or similar) integrated into the apply pipeline, so non-compliant plans are automatically blocked — this scales reliably in a way that depending on individual engineers remembering a written guideline does not.',
          options: [
            { id: 'a', label: 'Document the policy and trust engineers to follow it', tier: 'wrong', why: 'Reliably erodes at scale — depending on every engineer remembering a guideline every time is not a durable enforcement strategy.' },
            { id: 'b', label: 'Enforce it via policy-as-code integrated into the apply pipeline', tier: 'best', why: 'Automatically blocks non-compliant plans structurally, rather than depending on individual memory across every configuration.' },
            { id: 'c', label: 'Manually review every plan\'s output before every apply', tier: 'defensible', why: 'Catches violations, but doesn\'t scale as the number of configurations and applies grows — a real, ongoing manual burden.' }
          ],
          justificationPatterns: [/policy.?as.?code|sentinel|opa|automatically\s*block/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"Deciding whether to use Terraform workspaces or entirely separate state files (and directories) to isolate environments (dev/staging/prod). Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 44,
          hintNudge: 'Workspaces share the SAME configuration code across environments, which is convenient but means a mistake in the shared config affects every environment — separate state/directories give a stronger isolation boundary at the cost of some duplication.',
          hintPartial: 'For environments with meaningfully different risk profiles (especially production), prefer entirely separate state/directories — workspaces share the same underlying configuration, so a mistake there risks every environment; separate state gives a stronger real isolation boundary, at the cost of some code duplication.',
          hintFull: 'Best (especially where production is involved): separate state files/directories per environment — workspaces are convenient for genuinely similar, low-risk variations (like short-lived feature environments), but sharing one configuration across dev/staging/PRODUCTION means a mistake in that shared code risks every environment at once.',
          options: [
            { id: 'a', label: 'Terraform workspaces for dev/staging/production', tier: 'defensible', why: 'Convenient and reduces duplication, but shares the same underlying configuration across environments — a mistake there risks production along with everything else.' },
            { id: 'b', label: 'Separate state files/directories per environment, especially for production', tier: 'best', why: 'Gives a genuinely stronger isolation boundary — a mistake in one environment\'s configuration doesn\'t automatically risk production, unlike shared-workspace configuration.' },
            { id: 'c', label: 'One single environment for everything, to avoid the decision entirely', tier: 'wrong', why: 'Removes environment isolation entirely, which defeats the actual purpose of having dev/staging/production in the first place.' }
          ],
          justificationPatterns: [/separate\s*state|isolation\s*boundary|shared\s*configuration/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"A critical CVE is announced in a Terraform provider used across dozens of configurations organization-wide. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 44,
          hintNudge: 'Fixing this configuration-by-configuration, independently, duplicates the same investigation dozens of times with inconsistent timing — the same coordinated-response principle that applies to a vulnerable library or compromised CI action.',
          hintPartial: 'Centrally identify every configuration using the vulnerable provider version, assess actual exploitability, then coordinate a single tracked remediation (bump the provider version constraint, re-plan, re-apply) across all of them — not dozens of independent, uncoordinated fixes.',
          hintFull: 'Best: centrally identify every configuration referencing the vulnerable provider version (via a registry/inventory scan), assess actual exploitability, then coordinate a single, tracked remediation effort across all affected configurations — dozens of teams independently discovering and patching the same CVE is slower and harder to verify complete.',
          options: [
            { id: 'a', label: 'Notify all teams and let each update their provider version independently', tier: 'defensible', why: 'Gets the word out, but with no central tracking, there\'s no reliable way to confirm every affected configuration actually got updated.' },
            { id: 'b', label: 'Centrally identify every affected configuration, then coordinate a single tracked remediation effort', tier: 'best', why: 'Ensures full, verifiable coverage and consistent timing, rather than relying on dozens of independent teams to each notice and patch the same vulnerable provider.' },
            { id: 'c', label: 'Wait for each team\'s next regular maintenance window to update', tier: 'wrong', why: 'A CRITICAL CVE left unpatched across dozens of configurations at "normal pace" is a real, unnecessary window of exposure for something already known and actionable now.' }
          ],
          justificationPatterns: [/centrally|coordinated|tracked\s*remediation|inventory/i]
        },
        {
          mode: 'read_the_room',
          prompt: 'The keeper\'s many hands build the same wall twice. <strong>Two teams\' independently-managed Terraform configurations both claim ownership of the same real cloud resource, causing conflicting applies. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 28, damageIfOptimal: 48,
          hintNudge: 'A single real-world resource represented in TWO separate state files (owned by two teams) is a structural conflict — Terraform has no way to know both configurations are describing the same thing.',
          hintPartial: 'The same real resource was imported into (or independently created by) two separate teams\' state files — each team\'s apply "wins" temporarily until the other team\'s next apply reverts it, with neither state aware of the other.',
          hintFull: 'Diagnosis: the same resource exists in two separate teams\' state files, with each apply unaware of the other. Fix: establish single, clear ownership for that resource, remove it from the non-owning team\'s state (terraform state rm), and reference it via a data source or shared module output instead of a second competing resource block.',
          outputBlock: [
            '$ (team A) terraform apply -> modifies security-group-x',
            '$ (team B) terraform apply, 10 minutes later -> reverts security-group-x back',
            '(both teams\' state files reference the same real security group)'
          ],
          acceptableDiagnosesPatterns: [/two\s*(state\s*files|teams).*same\s*resource/i, /competing\s*ownership/i],
          followUpFix: {
            prompt: 'Fix it by establishing single ownership for the resource and removing the duplicate tracking:',
            acceptablePatterns: [],
            optimalPatterns: [/state\s*rm|single\s*owner|data\s*source/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A vast wall was built by hand, and the keeper has never seen it. <strong>A large amount of existing production infrastructure was built manually over years and now needs to come under Terraform management. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 28, damageIfOptimal: 48,
          hintNudge: 'Attempting to write the configuration from scratch and importing everything in one giant batch is far riskier than a deliberate, incremental approach.',
          hintPartial: 'Import incrementally, resource by resource (or using an import-generation tool where available), verifying after each that terraform plan shows zero unexpected changes — a giant one-shot import-and-hope-it-matches approach risks Terraform "fixing" real, working infrastructure back to a wrong assumed state.',
          hintFull: 'Diagnosis: bringing a large amount of existing manual infrastructure under Terraform is inherently risky if done all at once. Fix: import incrementally, resource by resource, writing matching configuration and verifying terraform plan shows zero unexpected diff after each import, before moving to the next — never batch-import everything and assume the generated config matches reality.',
          outputBlock: [
            '$ (proposed approach) "import all 200 resources at once, then write config to match afterward"'
          ],
          acceptableDiagnosesPatterns: [/incremental(ly)?|one\s*at\s*a\s*time|resource\s*by\s*resource/i],
          followUpFix: {
            prompt: 'Fix the approach by importing incrementally and verifying zero-diff plans:',
            acceptablePatterns: [],
            optimalPatterns: [/incremental|zero.?diff|verify.*plan/i]
          }
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'The keeper draws its final, patient sigil. <strong>Sequence the correct order for safely importing a large amount of existing manually-created infrastructure into Terraform.</strong>',
          steps: [
            'Inventory exactly what exists and its current configuration',
            'Write matching Terraform configuration for one resource at a time',
            'Import that resource and verify the plan shows zero unexpected diff',
            'Repeat incrementally for each remaining resource',
            'Only then treat the configuration as the source of truth going forward'
          ],
          damageIfCorrect: 30, damageIfOptimal: 50,
          damageToHeroIfWrong: 28
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'The last sigil closes the circle. <strong>Sequence the correct order for rolling out policy-as-code enforcement across an organization\'s Terraform configurations.</strong>',
          steps: [
            'Define the specific policies that matter most (e.g. no public S3 buckets)',
            'Write and test the policy rules against real existing plans',
            'Roll out in advisory/warn-only mode first',
            'Fix existing violations surfaced during the warn-only period',
            'Switch to hard enforcement once violations are cleared'
          ],
          damageIfCorrect: 30, damageIfOptimal: 50,
          damageToHeroIfWrong: 28
        },
        {
          mode: 'terminal',
          prompt: 'The keeper checks a chamber\'s own private ledger: <strong>"Configure a workspace-specific variable file to be loaded automatically without specifying -var-file."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36,
          hintNudge: 'Terraform automatically loads a specifically-named file matching a pattern — no flag needed.',
          hintPartial: 'Name the file terraform.______ or *.auto.tfvars',
          hintFull: 'terraform.tfvars (or *.auto.tfvars)',
          acceptablePatterns: [],
          optimalPatterns: [/terraform\.tfvars|\.auto\.tfvars/i],
          baseCmds: []
        },
        {
          mode: 'terminal',
          prompt: 'The keeper checks how deeply a change would ripple: <strong>"Show only the resources that would actually change in a plan, in a concise summary."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32,
          hintNudge: 'plan already summarizes add/change/destroy counts at the end of its output by default.',
          hintPartial: 'terraform p___ (the summary is already part of default output)',
          hintFull: 'terraform plan',
          acceptablePatterns: [],
          optimalPatterns: [/^terraform\s+plan$/i],
          baseCmds: ['terraform']
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A crooked account boundary lets one realm touch all others. <strong>"This backend configuration uses a single shared state file for every environment, with no per-environment separation at all. Find and fix the bug."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 42,
          hintNudge: 'One shared state file for every environment means a mistake in any environment\'s apply risks every other environment sharing that same state.',
          hintPartial: 'Line 1 uses the same key for every environment — give each environment (dev/staging/prod) its own distinct state key or entirely separate backend.',
          hintFull: 'Fix: key = "prod/terraform.tfstate" (with dev and staging each getting their own distinct key)',
          codeBlock: [
            'key = "shared/terraform.tfstate"  # used identically by dev, staging, and prod'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/key\s*=\s*"prod\/terraform\.tfstate"|distinct\s*key\s*per\s*environment/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A crooked role grants the keeper\'s own hands too much reach. <strong>"The CI role that runs terraform apply has been granted account-wide admin access, far more than any of its actual applies need. Find and fix the bug."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 42,
          hintNudge: 'A CI role\'s actual permissions should match exactly the specific resource types its configurations manage — not a blanket admin grant.',
          hintPartial: 'Line 1 grants full administrator access to the CI role — scope it down to only the specific services/actions the managed configurations actually create or modify.',
          hintFull: 'Fix: replace the admin policy with a scoped policy covering only the specific resource types this pipeline actually manages.',
          codeBlock: [
            '(CI role policy): AdministratorAccess attached, though this pipeline only ever manages S3 and Lambda resources'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/scoped\s*polic|least.?privilege|only.*(s3|lambda)/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A crooked pipeline never actually checks its own work. <strong>"This CI pipeline applies changes but never actually verifies the apply succeeded before marking the deploy complete. Find and fix the bug."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 42,
          hintNudge: 'A pipeline that doesn\'t check terraform apply\'s actual exit code (or verify the real outcome) can report success even when the apply genuinely failed.',
          hintPartial: 'Line 1 doesn\'t check the apply\'s actual exit code or verify the real resulting infrastructure — add a check so a failed apply actually fails the pipeline instead of silently reporting success.',
          hintFull: 'Fix: check the exit code of terraform apply and fail the pipeline step if it\'s non-zero, rather than proceeding unconditionally.',
          codeBlock: [
            'terraform apply -auto-approve; echo "Deploy complete"  # always prints this regardless of apply outcome'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/exit\s*code|fail.*(pipeline|step).*(non-zero|error)/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The keeper weighs the many hands of a growing order: <strong>"Deciding how to structure IAM permissions for the CI role that runs Terraform across dozens of configurations with different sensitivity levels. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 28, damageIfOptimal: 46,
          hintNudge: 'A single CI identity with broad permissions across every configuration means a mistake or compromise anywhere has the broadest possible reach — matching identity/permission scope to configuration sensitivity limits that.',
          hintPartial: 'Use separate, scoped CI identities/roles per configuration group (matched to actual sensitivity — e.g. production gets a more restricted, more carefully-audited role than a low-risk dev sandbox), rather than one broad identity used everywhere.',
          hintFull: 'Best: separate, appropriately-scoped CI roles per configuration group, matched to actual sensitivity — a single broad CI identity used for everything means a mistake or compromise in the pipeline has the maximum possible reach across every configuration, regardless of how sensitive each one actually is.',
          options: [
            { id: 'a', label: 'One shared, broadly-permissioned CI role for all configurations', tier: 'wrong', why: 'A mistake or compromise in the pipeline has the maximum possible reach across every configuration, regardless of how sensitive each one actually is.' },
            { id: 'b', label: 'Separate, scoped CI roles per configuration group, matched to sensitivity', tier: 'best', why: 'Limits blast radius so a mistake or compromise in one pipeline role doesn\'t automatically reach every configuration, especially the most sensitive ones.' },
            { id: 'c', label: 'Give every individual engineer their own personal CI credentials', tier: 'wrong', why: 'Conflates CI automation identity with individual human identity, complicating both audit trails and the actual access-scoping goal.' }
          ],
          justificationPatterns: [/scoped.*role|match.*sensitivity|blast\s*radius/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"An organization has hundreds of Terraform configurations built up over years with wildly inconsistent conventions. Deciding how to bring order. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 28, damageIfOptimal: 46,
          hintNudge: 'Attempting to rewrite everything at once is a massive, risky undertaking — a gradual, standards-first approach applied to new/touched work is usually more realistic and lower-risk.',
          hintPartial: 'Establish clear standards going forward (module structure, naming, testing) and apply them to new work and anything already being touched for other reasons, rather than attempting one massive, risky rewrite of hundreds of existing configurations all at once.',
          hintFull: 'Best: establish clear conventions and apply them incrementally — enforce standards on new configurations immediately, and migrate existing ones opportunistically whenever they\'re already being touched for other work — a single massive rewrite of hundreds of configurations is a large, risky undertaking with a long payoff horizon.',
          options: [
            { id: 'a', label: 'Do one large, coordinated rewrite of every configuration to the new standard', tier: 'wrong', why: 'A massive, high-risk undertaking with a long timeline before any value is realized, and a large surface area for something to go wrong along the way.' },
            { id: 'b', label: 'Establish standards for new work, migrate existing configs opportunistically', tier: 'best', why: 'Gets immediate value on new work while spreading the migration risk and cost over time, rather than one large risky effort.' },
            { id: 'c', label: 'Leave existing configurations exactly as-is indefinitely, with no plan to improve them', tier: 'wrong', why: 'Never actually addresses the inconsistency, and the gap between old and new conventions only grows over time.' }
          ],
          justificationPatterns: [/incremental(ly)?|opportunistic|new\s*work.*standard/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"Deciding whether Terraform state for a highly sensitive system (e.g. handling financial data) should be encrypted with a customer-managed key vs. the backend\'s default encryption. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 28, damageIfOptimal: 46,
          hintNudge: 'State can contain sensitive attribute values — for a genuinely high-sensitivity system, the same logic that applies to encrypting sensitive data at rest generally applies to the state that describes it.',
          hintPartial: 'Use a customer-managed key for state encryption on a genuinely high-sensitivity system — this gives finer control over key rotation, access policy, and audit trail than the backend\'s default encryption, proportionate to the system\'s actual sensitivity.',
          hintFull: 'Best: customer-managed key encryption for state on a genuinely high-sensitivity system — proportionate to what\'s at stake, giving finer control over rotation, access, and audit than a default managed key; the backend\'s default encryption is a reasonable choice for lower-sensitivity systems where that extra control isn\'t worth the added key-management overhead.',
          options: [
            { id: 'a', label: 'The backend\'s default encryption is sufficient for any system', tier: 'defensible', why: 'Reasonable for most systems, but a genuinely high-sensitivity system (financial data) often warrants the finer control a customer-managed key provides.' },
            { id: 'b', label: 'A customer-managed key, proportionate to the system\'s actual sensitivity', tier: 'best', why: 'Matches the level of key-management control to what\'s actually at stake — a proportionate response for a genuinely high-sensitivity system, not a blanket rule.' },
            { id: 'c', label: 'Skip state encryption entirely to reduce operational complexity', tier: 'wrong', why: 'State can contain sensitive attribute values — leaving it unencrypted for a system handling financial data is a real, avoidable exposure.' }
          ],
          justificationPatterns: [/customer-managed\s*key|proportionate|sensitivity/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"Deciding whether to allow engineers to run terraform apply from their own laptops for production, or require it to go exclusively through CI. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 28, damageIfOptimal: 46,
          hintNudge: 'A laptop-run apply lacks the consistency, audit trail, and access controls a CI pipeline provides by design — this is the same principle as requiring IaC-only production changes over direct console access.',
          hintPartial: 'Require production applies to go exclusively through CI — a controlled pipeline provides a consistent environment, a clear audit trail of who ran what and when, and centrally-managed access controls that an individual laptop run structurally can\'t guarantee.',
          hintFull: 'Best: require production applies through CI exclusively — this gives a consistent execution environment, a reliable audit trail, and centralized access control, none of which a laptop-run apply can structurally guarantee in the same way.',
          options: [
            { id: 'a', label: 'Allow laptop applies to production for flexibility', tier: 'wrong', why: 'Lacks the consistent environment, audit trail, and centralized access control a CI pipeline provides by design — a real, avoidable gap for production changes.' },
            { id: 'b', label: 'Require all production applies to go exclusively through CI', tier: 'best', why: 'Provides a consistent, audited, access-controlled path for production changes that individual laptop runs structurally cannot guarantee.' },
            { id: 'c', label: 'Allow laptop applies only for very small, "safe-looking" changes', tier: 'wrong', why: 'A "looks safe" judgment made outside any audited process is exactly the kind of inconsistent gate that erodes over time as what counts as "small" quietly expands.' }
          ],
          justificationPatterns: [/ci\s*(pipeline\s*)?exclusively|audit\s*trail|consistent\s*environment/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"A critical zero-day vulnerability is announced in Terraform itself (the core binary). Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 28, damageIfOptimal: 46,
          hintNudge: 'Assess the actual exploitability and attack surface for your specific use case first — not every announced core-tool vulnerability is equally exploitable in every deployment context, but a genuine core-tool CVE still deserves urgent, prioritized attention.',
          hintPartial: 'Assess the specific vulnerability\'s actual relevance to how Terraform is used in your environment (e.g. is it about local execution, a specific backend, remote state handling), then urgently upgrade the CLI version across all pipelines/environments once a patched release is available — treating a core-tool CVE with real priority given how central Terraform is to infrastructure changes.',
          hintFull: 'Best: assess the vulnerability\'s actual relevance to your specific usage pattern first (not every core-tool CVE is equally exploitable in every context), then urgently roll out the patched version across every pipeline and environment — a vulnerability in the tool itself deserves genuine priority given how central it is to every infrastructure change made through it.',
          options: [
            { id: 'a', label: 'Assess actual relevance to your usage, then urgently patch across all environments', tier: 'best', why: 'Matches urgency to actual exploitability for your specific context while still treating a core-tool vulnerability with the priority its central role in infrastructure changes warrants.' },
            { id: 'b', label: 'Wait for the next regular Terraform version upgrade cycle', tier: 'wrong', why: 'A critical vulnerability in the tool that manages ALL infrastructure changes deserves faster-than-routine attention, not the normal upgrade cadence.' },
            { id: 'c', label: 'Immediately halt all Terraform usage organization-wide until further notice', tier: 'defensible', why: 'Safe, but potentially disproportionate if the specific vulnerability doesn\'t actually apply to how Terraform is used in this environment — worth assessing relevance first.' }
          ],
          justificationPatterns: [/assess.*relevance|urgent(ly)?\s*(patch|upgrade)|actual\s*exploitability/i]
        },
        {
          mode: 'read_the_room',
          prompt: 'A carved seal grants passage it was never meant to grant. <strong>An audit discovers the CI role that runs Terraform has permissions far exceeding what any of its actual managed configurations require. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 30, damageIfOptimal: 50,
          hintNudge: 'CI role permissions tend to accrete over time as new configurations are added without anyone ever re-scoping the role down afterward — check whether this is a case of never-cleaned-up broad grants.',
          hintPartial: 'The CI role\'s permissions accumulated broadly over time (likely granted generously to unblock early work) and were never re-scoped down as the set of actual managed configurations became clear — a real, common drift pattern for automation identities.',
          hintFull: 'Diagnosis: the CI role\'s permissions were never re-scoped down from an initially broad grant as actual usage became clear. Fix: audit exactly what the role\'s managed configurations actually create/modify, rewrite its policy to match precisely, and establish a recurring review so this doesn\'t silently re-accumulate.',
          outputBlock: [
            '$ (CI role policy) grants access to 40+ AWS services',
            '$ (actual usage across all managed configs) only 6 services are ever touched'
          ],
          acceptableDiagnosesPatterns: [/accumulated.*(broad|never\s*(re-)?scoped)/i, /never\s*re-?scoped/i],
          followUpFix: {
            prompt: 'Fix it by rewriting the policy to match actual usage and establishing recurring review:',
            acceptablePatterns: [],
            optimalPatterns: [/rewrite.*polic|recurring\s*review|scope.*(down|match)/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'The keeper\'s many chambers each speak a different tongue. <strong>After acquiring another company, its Terraform configurations use entirely different module conventions and can\'t easily be integrated with the existing setup. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 30, damageIfOptimal: 50,
          hintNudge: 'Two independently-evolved sets of conventions were never designed to interoperate — this needs a deliberate reconciliation plan, not an attempt to force immediate, wholesale unification.',
          hintPartial: 'Two organizations\' Terraform conventions evolved completely independently, with no shared design — rather than forcing immediate unification, establish clear integration boundaries and migrate deliberately over time as each area is naturally touched.',
          hintFull: 'Diagnosis: two independently-evolved sets of Terraform conventions were never designed to interoperate. Fix: don\'t force immediate wholesale unification — establish clear boundaries for now (e.g. via remote state data sources bridging the two), and migrate the acquired configurations toward shared conventions deliberately, prioritizing genuinely critical shared infrastructure first.',
          outputBlock: [
            '$ (acquired company\'s Terraform) uses entirely different module registry, naming, and state structure',
            '(no shared conventions with the existing organization\'s setup)'
          ],
          acceptableDiagnosesPatterns: [/independently\s*evolved|never\s*designed\s*to\s*(interoperate|coexist)/i],
          followUpFix: {
            prompt: 'Fix it with a deliberate migration plan rather than forcing immediate unification:',
            acceptablePatterns: [],
            optimalPatterns: [/deliberate(ly)?\s*migrat|clear\s*boundaries|prioritiz/i]
          }
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'A distant sigil, drawn for a future rarely seen. <strong>Sequence the correct order for safely restructuring an overly broad CI role\'s permissions without breaking existing pipelines.</strong>',
          steps: [
            'Audit exactly which API calls the role\'s pipelines actually make',
            'Draft a scoped policy matching only that actual usage',
            'Test the scoped policy in a non-production pipeline run first',
            'Roll out the scoped policy to production pipelines',
            'Monitor for any denied calls and adjust the policy as needed'
          ],
          damageIfCorrect: 32, damageIfOptimal: 52,
          damageToHeroIfWrong: 28
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"Deciding whether to standardize the entire organization on Terraform, or allow individual teams to choose their own IaC tool (Pulumi, CloudFormation, etc). Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 28, damageIfOptimal: 46,
          hintNudge: 'Multiple IaC tools across an organization means duplicated tooling investment (CI patterns, policy enforcement, training) and no shared expertise — the real question is whether any team\'s specific need justifies that real, ongoing cost.',
          hintPartial: 'Standardize on one tool organization-wide by default, allowing an exception only when a team has a genuine, specific need the standard tool can\'t meet — running multiple IaC tools means duplicating CI patterns, policy enforcement, and expertise across the organization, a real ongoing cost most teams don\'t need to pay.',
          hintFull: 'Best: standardize by default, with exceptions requiring genuine justification — multiple IaC tools across an org means duplicated investment in CI integration, policy-as-code enforcement, and specialized expertise for each one, a real ongoing cost that should be paid deliberately, not by default.',
          options: [
            { id: 'a', label: 'Standardize organization-wide by default, exceptions requiring genuine justification', tier: 'best', why: 'Avoids duplicating CI integration, policy enforcement, and expertise investment across multiple tools, while still allowing a genuine, well-justified exception when one is truly needed.' },
            { id: 'b', label: 'Let every team choose whatever IaC tool they personally prefer', tier: 'wrong', why: 'Multiplies the organization\'s tooling investment (CI patterns, policy enforcement, training) across as many tools as teams happen to pick, with no shared expertise built up anywhere.' },
            { id: 'c', label: 'Mandate one tool with zero exceptions ever, regardless of circumstances', tier: 'defensible', why: 'Maximizes consistency, but a genuinely rigid zero-exception rule can become a real liability if a team has a legitimate, well-justified need the standard tool truly can\'t meet.' }
          ],
          justificationPatterns: [/standardize|duplicat.*(investment|tooling)|genuine\s*justification/i]
        }
      ]
    }
  ]
};
