// Boss "titan": metadata plus its full question bank (data only).

/* ================================================================
   BOSS 7 — THE CLOUD TITAN (Cloud: AWS/Azure/GCP)
   ================================================================ */
export var titan = {
  id: 'titan',
  name: 'The Cloud Titan',
  topic: 'Cloud',
  icon: '☁️',
  chibiKind: 'titan',
  phaseHp: [125, 135, 155],
  phaseNames: ['Foundation — HA Design Basics', 'Ledger — Cost Judgment', 'Summit — Real Incident'],
  xpReward: 170,
  coinBaseReward: 100,
  phases: [
    /* -------- PHASE 1: HA Infra Design Basics -------- */
    [
      {
        mode: 'build_the_pipeline',
        prompt: 'The Titan plants a foot the size of a building: <strong>"Sequence a basic highly-available web app setup."</strong>',
        damageIfCorrect: 20, damageIfOptimal: 32,
        hintNudge: 'Spread instances first, then put something in front of them to distribute traffic.',
        hintPartial: 'Multiple AZs, a load balancer, health checks, then let it scale itself.',
        hintFull: 'Order: Launch instances across multiple AZs → Put them behind a load balancer → Configure health checks → Set up auto-scaling',
        steps: ['Launch instances across multiple AZs', 'Put them behind a load balancer', 'Configure health checks', 'Set up auto-scaling']
      },
      {
        mode: 'build_the_pipeline',
        prompt: 'A second foot lands: <strong>"Sequence setting up a highly-available database."</strong>',
        damageIfCorrect: 20, damageIfOptimal: 32,
        hintNudge: 'You need the primary running before anything can stand by for it.',
        hintPartial: 'Primary first, then a standby, then backups, then prove failover actually works.',
        hintFull: 'Order: Provision a primary DB instance → Enable Multi-AZ / a standby replica → Configure automated backups → Test failover',
        steps: ['Provision a primary DB instance', 'Enable Multi-AZ / a standby replica', 'Configure automated backups', 'Test failover']
      },
      {
        mode: 'build_the_pipeline',
        prompt: 'The ground shakes: <strong>"Sequence a basic disaster-recovery plan."</strong>',
        damageIfCorrect: 20, damageIfOptimal: 32,
        hintNudge: 'You need something backed up before you can recover it — and a plan is worthless untested.',
        hintPartial: 'Back up regularly, keep copies elsewhere, document it, then actually test recovering.',
        hintFull: 'Order: Take regular backups → Store backups in a separate region → Document the recovery runbook → Test the recovery process',
        steps: ['Take regular backups', 'Store backups in a separate region', 'Document the recovery runbook', 'Test the recovery process']
      },
      {
        mode: 'build_the_pipeline',
        prompt: 'The Titan surveys the horizon: <strong>"Sequence rolling out a CDN in front of a web app."</strong>',
        damageIfCorrect: 20, damageIfOptimal: 32,
        hintNudge: 'The CDN needs something real to fetch from before it can serve anything.',
        hintPartial: 'Origin first, then the CDN layer, then caching rules, then point traffic at it.',
        hintFull: 'Order: Configure the origin server → Set up the CDN distribution → Configure caching rules → Point DNS at the CDN',
        steps: ['Configure the origin server', 'Set up the CDN distribution', 'Configure caching rules', 'Point DNS at the CDN']
      },
      {
        mode: 'build_the_pipeline',
        prompt: 'One more test before the ledger: <strong>"Sequence a basic auto-scaling setup."</strong>',
        damageIfCorrect: 20, damageIfOptimal: 32,
        hintNudge: 'You need a template for what to launch before you can launch a group of them.',
        hintPartial: 'Template, then the scaling group itself, then hook up a load balancer, then define WHEN it scales.',
        hintFull: 'Order: Create a launch template/config → Create an auto-scaling group → Attach a load balancer → Define scaling policies',
        steps: ['Create a launch template/config', 'Create an auto-scaling group', 'Attach a load balancer', 'Define scaling policies']
      }
    ],
    /* -------- PHASE 2: Cost Management Judgment -------- */
    [
      {
        mode: 'triage_call',
        prompt: 'The Titan weighs a coin the size of a shield: <strong>"A workload runs 24/7, predictably, for the next year. How do you pay for it?"</strong>',
        damageIfCorrect: 24, damageIfOptimal: 38,
        hintNudge: 'You KNOW you\'ll need this capacity constantly — commit for the discount.',
        hintPartial: 'A reserved/committed pricing option, since usage is steady and predictable.',
        hintFull: 'Best: reserved instances / a savings plan — steady, predictable, year-long usage is exactly what a commitment discount is for.',
        options: [
          { id: 'a', label: 'Reserved instances / a savings plan', tier: 'best', why: 'Steady, predictable usage is exactly the case a commitment discount is built for.' },
          { id: 'b', label: 'On-demand pricing', tier: 'wrong', why: 'The most expensive option for usage you already know is steady and predictable.' },
          { id: 'c', label: 'Spot instances', tier: 'wrong', why: 'Can be interrupted at any time — risky for a workload that needs to run continuously.' }
        ],
        justificationPatterns: [/reserved|committed|savings|predictable/i]
      },
      {
        mode: 'triage_call',
        prompt: '<strong>"A batch job, flexible timing, fine with being interrupted. How do you pay for it?"</strong>',
        damageIfCorrect: 24, damageIfOptimal: 38,
        hintNudge: 'The workload can tolerate exactly the tradeoff this pricing option makes.',
        hintPartial: 'The cheapest option, which trades reliability for a steep discount.',
        hintFull: 'Best: spot instances — deeply discounted, and this job can tolerate the occasional interruption.',
        options: [
          { id: 'a', label: 'Spot instances', tier: 'best', why: 'The steepest discount, and this workload was specifically described as tolerant of interruption.' },
          { id: 'b', label: 'Reserved instances', tier: 'wrong', why: 'Pays for a year-long commitment that a flexible, interruptible batch job doesn\'t need.' },
          { id: 'c', label: 'On-demand', tier: 'defensible', why: 'Works, but costs more than necessary when the job could tolerate cheaper, interruptible capacity.' }
        ],
        justificationPatterns: [/spot|interrupt|cheap|discount/i]
      },
      {
        mode: 'triage_call',
        prompt: '<strong>"Traffic is spiky and unpredictable — short, sudden bursts. How do you pay for it?"</strong>',
        damageIfCorrect: 24, damageIfOptimal: 38,
        hintNudge: 'You don\'t know when the spikes will hit — commit to nothing, scale with reality.',
        hintPartial: 'Pay only for what you use, and let it grow/shrink with the traffic itself.',
        hintFull: 'Best: on-demand with auto-scaling — you pay for what you use and scale with the actual spikes.',
        options: [
          { id: 'a', label: 'On-demand with auto-scaling', tier: 'best', why: 'Matches spend to actual unpredictable demand instead of guessing a fixed commitment.' },
          { id: 'b', label: 'Reserved instances sized for peak', tier: 'wrong', why: 'Over-commits to (and overpays for) capacity that sits idle outside the unpredictable spikes.' },
          { id: 'c', label: 'Spot instances', tier: 'wrong', why: 'Risks getting interrupted during exactly the traffic spike you most need capacity for.' }
        ],
        justificationPatterns: [/on.?demand|auto.?scal|spiky|unpredictable/i]
      },
      {
        mode: 'triage_call',
        prompt: '<strong>"Old logs, rarely ever accessed, must be retained for compliance. Where do they live?"</strong>',
        damageIfCorrect: 24, damageIfOptimal: 38,
        hintNudge: 'You need to keep it, but access speed barely matters here.',
        hintPartial: 'A cheap, cold/archive storage tier built exactly for rarely-accessed data.',
        hintFull: 'Best: an archive/cold storage tier — same durability, much cheaper, appropriate for data you rarely touch.',
        options: [
          { id: 'a', label: 'Cold / archive storage tier', tier: 'best', why: 'Purpose-built for exactly this: retained, rarely accessed, at a much lower cost.' },
          { id: 'b', label: 'Standard/hot storage', tier: 'wrong', why: 'Pays a premium for fast access this data will essentially never need.' },
          { id: 'c', label: 'Delete them to save money', tier: 'wrong', why: 'Violates the stated compliance retention requirement.' }
        ],
        justificationPatterns: [/archive|cold|cheap|rarely/i]
      },
      {
        mode: 'triage_call',
        prompt: '<strong>"You spot a sudden, unexplained spike in the bill. What\'s the first move?"</strong>',
        damageIfCorrect: 24, damageIfOptimal: 38,
        hintNudge: 'Find out what\'s actually driving it before you touch anything running.',
        hintPartial: 'Look at billing/cost-explorer data to see exactly what\'s costing more.',
        hintFull: 'Best: check cost-explorer/billing dashboards to identify the actual driver before taking any action.',
        options: [
          { id: 'a', label: 'Check cost-explorer/billing dashboards for the driver', tier: 'best', why: 'Identifies the real cause first, so whatever action you take next is actually correct.' },
          { id: 'b', label: 'Immediately shut down all resources', tier: 'wrong', why: 'Could cause a real outage before you even know what\'s actually driving the cost.' },
          { id: 'c', label: 'Wait for next month\'s bill to see if it repeats', tier: 'wrong', why: 'Lets a possibly-ongoing cost problem (or a security issue) compound for another month.' }
        ],
        justificationPatterns: [/cost\s*explorer|billing|dashboard|identify|investigate/i]
      }
    ],
    /* -------- PHASE 3: Real Incident — Bad Infra Change -------- */
    [
      {
        mode: 'spot_the_bug',
        prompt: 'The Titan holds up a cracked tablet of infrastructure code. <strong>Click the buggy line, then type the fix.</strong>',
        damageIfCorrect: 26, damageIfOptimal: 40,
        hintNudge: 'This applies changes straight to production with nobody ever reviewing what they are first.',
        hintPartial: 'Drop the auto-approve — a plan should be reviewed before it\'s applied.',
        hintFull: 'Fix: terraform apply',
        codeBlock: [
          '# CI deploy step',
          'terraform init',
          'terraform apply -auto-approve'
        ],
        buggyLineId: 2,
        correctFixPatterns: [/^terraform\s+apply$/i, /^terraform\s+plan\s+-out=tfplan\s*&&\s*terraform\s+apply\s+tfplan$/i]
      },
      {
        mode: 'spot_the_bug',
        prompt: 'Another tablet, cracked down the middle. <strong>Click the buggy line, then type the fix.</strong>',
        damageIfCorrect: 26, damageIfOptimal: 40,
        hintNudge: 'This security group rule allows SSH from literally anywhere on the internet.',
        hintPartial: 'Restrict it to your own internal network range instead of the whole internet.',
        hintFull: 'Fix: cidr_blocks = ["10.0.0.0/16"]',
        codeBlock: [
          'resource "aws_security_group_rule" "ssh" {',
          '  type        = "ingress"',
          '  from_port   = 22',
          '  to_port     = 22',
          '  cidr_blocks = ["0.0.0.0/0"]',
          '}'
        ],
        buggyLineId: 4,
        correctFixPatterns: [/^cidr_blocks\s*=\s*\["10\.0\.0\.0\/16"\]$/i]
      },
      {
        mode: 'spot_the_bug',
        prompt: 'A third tablet, glowing wrong. <strong>Click the buggy line, then type the fix.</strong>',
        damageIfCorrect: 26, damageIfOptimal: 40,
        hintNudge: 'This storage bucket is set to be readable by literally anyone on the internet.',
        hintPartial: 'Switch its access control to private.',
        hintFull: 'Fix: acl = "private"',
        codeBlock: [
          'resource "aws_s3_bucket_acl" "data" {',
          '  bucket = aws_s3_bucket.data.id',
          '  acl    = "public-read"',
          '}'
        ],
        buggyLineId: 2,
        correctFixPatterns: [/^acl\s*=\s*"private"$/i]
      },
      {
        mode: 'spot_the_bug',
        prompt: 'The Titan\'s eyes narrow at a fourth tablet. <strong>Click the buggy line, then type the fix.</strong>',
        damageIfCorrect: 26, damageIfOptimal: 40,
        hintNudge: 'This production database has explicitly turned OFF the setting that would let it survive an AZ failure.',
        hintPartial: 'Flip it on.',
        hintFull: 'Fix: multi_az = true',
        codeBlock: [
          'resource "aws_db_instance" "prod" {',
          '  engine   = "postgres"',
          '  multi_az = false',
          '}'
        ],
        buggyLineId: 2,
        correctFixPatterns: [/^multi_az\s*=\s*true$/i]
      },
      {
        mode: 'spot_the_bug',
        prompt: 'One last tablet before the summit. <strong>Click the buggy line, then type the fix.</strong>',
        damageIfCorrect: 26, damageIfOptimal: 40,
        hintNudge: 'A real credential is sitting in plain text, committed straight into this file.',
        hintPartial: 'Reference it from a variable instead of writing the literal key.',
        hintFull: 'Fix: access_key = var.aws_access_key',
        codeBlock: [
          'provider "aws" {',
          '  region     = "us-east-1"',
          '  access_key = "AKIAABCDEFG123456"',
          '}'
        ],
        buggyLineId: 2,
        correctFixPatterns: [/^access_key\s*=\s*var\.aws_access_key$/i]
      }
    ]
  ],
  specialAttack: {
    mode: 'build_the_pipeline',
    prompt: 'The Titan raises both fists — the dashboard flares red with an anomaly! <strong>Sequence the correct response before it strikes.</strong>',
    steps: [
      'Identify the anomalous resource from the dashboard',
      'Confirm it isn\'t expected/legitimate usage',
      'Scale down or terminate the offending resource',
      'Set a budget alert to catch it earlier next time'
    ],
    damageIfCorrect: 40,
    damageToHeroIfWrong: 26
  },
  // ================================================================
  // Remediation doc, Section 1 — 5-level restructure, boss 7 (titan).
  // Research basis (checked BEFORE writing): the AWS CLI reference
  // (aws ec2/s3/iam/sts/elbv2/cloudwatch subcommands), the AWS
  // Well-Architected Framework's own pillars (reliability, cost
  // optimization, security, operational excellence), and standard
  // cloud-for-DevOps interview topics (HA design, auto-scaling,
  // reserved/spot/on-demand pricing, storage tiers, IAM least
  // privilege, encryption at rest/in transit, multi-region DR,
  // landing-zone/account-boundary design), plus real documented
  // incident patterns (public S3 buckets, overly-broad security
  // groups, hardcoded credentials, disabled Multi-AZ, quota/capacity
  // exhaustion, cross-account access misconfiguration, missing
  // CloudTrail coverage, runaway cost from a misconfigured resource).
  // All 125 questions trace to one of those. Cross-checked
  // programmatically against every other shipped boss's questions
  // (zero cross-boss duplicate prompts) and against each other level
  // in this set (zero internal duplicates) — verified via script.
  levels: [
    {
      name: 'Level 1 — Fundamentals',
      hp: 120,
      questions: [
        {
          mode: 'terminal',
          prompt: 'The Titan checks its own footing: <strong>"Confirm which AWS identity/account the current CLI credentials belong to."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26,
          hintNudge: 'The STS service has a dedicated call for exactly this — "who am I?"',
          hintPartial: 'aws sts get-caller-______',
          hintFull: 'aws sts get-caller-identity',
          acceptablePatterns: [],
          optimalPatterns: [/^aws\s+sts\s+get-caller-identity$/i],
          baseCmds: ['aws']
        },
        {
          mode: 'terminal',
          prompt: 'A census of every standing giant: <strong>"List all running EC2 instances."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26,
          hintNudge: 'ec2, with a describe action for instances, filtered by running state.',
          hintPartial: 'aws ec2 describe-instances --filters "Name=instance-state-name,Values=______"',
          hintFull: 'aws ec2 describe-instances --filters "Name=instance-state-name,Values=running"',
          acceptablePatterns: [/^aws\s+ec2\s+describe-instances$/i],
          optimalPatterns: [/^aws\s+ec2\s+describe-instances\s+--filters\s+"Name=instance-state-name,Values=running"$/i],
          baseCmds: ['aws']
        },
        {
          mode: 'terminal',
          prompt: 'A ledger of every vault: <strong>"List all S3 buckets in this account."</strong>',
          damageIfCorrect: 14, damageIfOptimal: 22,
          hintNudge: 's3 has a simple ls action at the top level for exactly this.',
          hintPartial: 'aws s3 __',
          hintFull: 'aws s3 ls',
          acceptablePatterns: [],
          optimalPatterns: [/^aws\s+s3\s+ls$/i],
          baseCmds: ['aws']
        },
        {
          mode: 'terminal',
          prompt: 'The Titan copies a scroll into storage: <strong>"Upload a local file <code>report.txt</code> to the S3 bucket <code>my-bucket</code>."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26,
          hintNudge: 's3 cp, source then destination, with an s3:// prefix on the target.',
          hintPartial: 'aws s3 cp report.txt s3://______/',
          hintFull: 'aws s3 cp report.txt s3://my-bucket/',
          acceptablePatterns: [],
          optimalPatterns: [/^aws\s+s3\s+cp\s+report\.txt\s+s3:\/\/my-bucket\/?$/i],
          baseCmds: ['aws']
        },
        {
          mode: 'terminal',
          prompt: 'A giant reads its own health chart: <strong>"Check the health of targets registered to a load balancer target group, given its ARN."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28,
          hintNudge: 'elbv2, with a describe action for target health, taking the target group ARN.',
          hintPartial: 'aws elbv2 describe-target-______ --target-group-arn <arn>',
          hintFull: 'aws elbv2 describe-target-health --target-group-arn <arn>',
          acceptablePatterns: [],
          optimalPatterns: [/^aws\s+elbv2\s+describe-target-health\s+--target-group-arn\s+<arn>$/i],
          baseCmds: ['aws']
        },
        {
          mode: 'terminal',
          prompt: 'It reads its own permission scroll: <strong>"List the IAM policies attached directly to the user <code>deploy-bot</code>."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28,
          hintNudge: 'iam, with a list action for attached user policies.',
          hintPartial: 'aws iam list-attached-user-________ --user-name deploy-bot',
          hintFull: 'aws iam list-attached-user-policies --user-name deploy-bot',
          acceptablePatterns: [],
          optimalPatterns: [/^aws\s+iam\s+list-attached-user-policies\s+--user-name\s+deploy-bot$/i],
          baseCmds: ['aws']
        },
        {
          mode: 'terminal',
          prompt: 'The Titan checks the size of its own boundary: <strong>"Show your current service quota for running On-Demand Standard EC2 instances."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32,
          hintNudge: 'The Service Quotas service, with a get action for a specific service code and quota code.',
          hintPartial: 'aws service-quotas get-service-quota --service-code ec2 --quota-code <code>',
          hintFull: 'aws service-quotas get-service-quota --service-code ec2 --quota-code L-1216C47A',
          acceptablePatterns: [/^aws\s+service-quotas\s+get-service-quota\s+--service-code\s+ec2\s+--quota-code\s+<code>$/i],
          optimalPatterns: [/^aws\s+service-quotas\s+get-service-quota\s+--service-code\s+ec2\s+--quota-code\s+L-1216C47A$/i],
          baseCmds: ['aws']
        },
        {
          mode: 'terminal',
          prompt: 'A giant checks a stack\'s foundation: <strong>"List all CloudFormation stacks and their current status."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28,
          hintNudge: 'cloudformation, with a list action for stacks.',
          hintPartial: 'aws cloudformation list-_______',
          hintFull: 'aws cloudformation list-stacks',
          acceptablePatterns: [],
          optimalPatterns: [/^aws\s+cloudformation\s+list-stacks$/i],
          baseCmds: ['aws']
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'The Titan plants a foot the size of a building: <strong>"Sequence a basic highly-available web app setup."</strong>',
          steps: ['Launch instances across multiple AZs', 'Put them behind a load balancer', 'Configure health checks', 'Set up auto-scaling'],
          damageIfCorrect: 20, damageIfOptimal: 32,
          damageToHeroIfWrong: 18
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'A second foot lands: <strong>"Sequence setting up a highly-available database."</strong>',
          steps: ['Provision a primary DB instance', 'Enable Multi-AZ / a standby replica', 'Configure automated backups', 'Test failover'],
          damageIfCorrect: 20, damageIfOptimal: 32,
          damageToHeroIfWrong: 18
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'The ground shakes: <strong>"Sequence a basic disaster-recovery plan."</strong>',
          steps: ['Take regular backups', 'Store backups in a separate region', 'Document the recovery runbook', 'Test the recovery process'],
          damageIfCorrect: 20, damageIfOptimal: 32,
          damageToHeroIfWrong: 18
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'The Titan surveys the horizon: <strong>"Sequence rolling out a CDN in front of a web app."</strong>',
          steps: ['Configure the origin server', 'Set up the CDN distribution', 'Configure caching rules', 'Point DNS at the CDN'],
          damageIfCorrect: 20, damageIfOptimal: 32,
          damageToHeroIfWrong: 18
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'One more test before the ledger: <strong>"Sequence a basic auto-scaling setup."</strong>',
          steps: ['Create a launch template/config', 'Create an auto-scaling group', 'Attach a load balancer', 'Define scaling policies'],
          damageIfCorrect: 20, damageIfOptimal: 32,
          damageToHeroIfWrong: 18
        },
        {
          mode: 'spot_the_bug',
          prompt: 'The Titan holds up a cracked tablet of infrastructure code. <strong>"This deploy step applies changes with no review at all. Find and fix the bug."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28,
          hintNudge: 'This applies changes straight to production with nobody ever reviewing what they are first.',
          hintPartial: 'Drop the auto-approve — a plan should be reviewed before it\'s applied.',
          hintFull: 'Fix: terraform apply',
          codeBlock: [
            '# CI deploy step',
            'terraform init',
            'terraform apply -auto-approve'
          ],
          buggyLineId: 2,
          correctFixPatterns: [/^terraform\s+apply$/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'Another tablet, cracked down the middle. <strong>"This security group rule allows SSH from literally anywhere. Find and fix the bug."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28,
          hintNudge: 'This security group rule allows SSH from literally anywhere on the internet.',
          hintPartial: 'Restrict it to your own internal network range instead of the whole internet.',
          hintFull: 'Fix: cidr_blocks = ["10.0.0.0/16"]',
          codeBlock: [
            'resource "aws_security_group_rule" "ssh" {',
            '  type        = "ingress"',
            '  from_port   = 22',
            '  to_port     = 22',
            '  cidr_blocks = ["0.0.0.0/0"]',
            '}'
          ],
          buggyLineId: 4,
          correctFixPatterns: [/^cidr_blocks\s*=\s*\["10\.0\.0\.0\/16"\]$/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A third tablet, glowing wrong. <strong>"This storage bucket is readable by literally anyone. Find and fix the bug."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28,
          hintNudge: 'This storage bucket is set to be readable by literally anyone on the internet.',
          hintPartial: 'Switch its access control to private.',
          hintFull: 'Fix: acl = "private"',
          codeBlock: [
            'resource "aws_s3_bucket_acl" "data" {',
            '  bucket = aws_s3_bucket.data.id',
            '  acl    = "public-read"',
            '}'
          ],
          buggyLineId: 2,
          correctFixPatterns: [/^acl\s*=\s*"private"$/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The Titan tilts its head: <strong>"Choosing between spreading a fleet across multiple Availability Zones vs. keeping it all in one AZ for simplicity. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28,
          hintNudge: 'A single AZ is a single point of failure for the ENTIRE fleet — an AZ can and does go down.',
          hintPartial: 'Spread across multiple AZs — a single AZ outage would otherwise take down the entire fleet at once.',
          hintFull: 'Best: multiple AZs — an AZ failure is a real, documented occurrence, and a single-AZ fleet has no protection against it at all.',
          options: [
            { id: 'a', label: 'Spread across multiple AZs', tier: 'best', why: 'Protects against a real, documented failure mode — a single AZ going down — that a single-AZ fleet has zero protection against.' },
            { id: 'b', label: 'Keep everything in one AZ for simplicity', tier: 'wrong', why: 'Makes the entire fleet dependent on one AZ never failing — a single point of failure for everything.' },
            { id: 'c', label: 'Spread across multiple totally separate cloud providers instead', tier: 'wrong', why: 'A much bigger, more complex commitment than what this specific resilience question calls for.' }
          ],
          justificationPatterns: [/multiple\s*az|single\s*point\s*of\s*failure|resilien/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"Deciding whether a newly-provisioned resource needs cost-allocation tags. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28,
          hintNudge: 'Without tags, an unexplained cost spike later has no easy way to be traced back to who/what owns it.',
          hintPartial: 'Tag it consistently (owner, project, environment) from the start — untagged resources are much harder to attribute cost or ownership to later.',
          hintFull: 'Best: tag every resource consistently from creation — this is what makes a later "who owns this cost" investigation actually tractable instead of a manual hunt.',
          options: [
            { id: 'a', label: 'Tag it consistently at creation time', tier: 'best', why: 'Makes cost attribution and ownership tracing tractable later, instead of requiring a manual investigation when a question eventually comes up.' },
            { id: 'b', label: 'Skip tagging — it can always be added later if needed', tier: 'wrong', why: 'Retroactively tagging resources at scale is a real, tedious cleanup project — much easier to do it consistently from the start.' },
            { id: 'c', label: 'Only tag resources that are expensive', tier: 'wrong', why: 'A resource\'s cost isn\'t known in advance, and untracked cheap resources can still accumulate into a real, hard-to-attribute cost over time.' }
          ],
          justificationPatterns: [/tag|attribut|ownership|cost\s*alloc/i]
        },
        {
          mode: 'read_the_room',
          prompt: 'A giant\'s hand finds an unlocked vault. <strong>A routine audit discovers an S3 bucket configured for public read access. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 20, damageIfOptimal: 34,
          hintNudge: 'A bucket ACL/policy set to public-read means literally anyone on the internet can read its contents — check exactly why it was set that way.',
          hintPartial: 'The bucket\'s ACL/policy is explicitly set to allow public read access — this needs to be corrected to private unless there\'s a genuine, deliberate reason for public access.',
          hintFull: 'Diagnosis: the bucket is misconfigured for public read access. Fix: change the ACL/policy to private (or apply the account-level Block Public Access setting) unless public access was a genuine, deliberate requirement.',
          outputBlock: [
            '$ aws s3api get-bucket-acl --bucket my-bucket',
            '(Grantee: AllUsers, Permission: READ)'
          ],
          acceptableDiagnosesPatterns: [/public\s*(read\s*)?access/i, /bucket.*(misconfigur|public)/i],
          followUpFix: {
            prompt: 'Fix it by making the bucket private:',
            acceptablePatterns: [],
            optimalPatterns: [/private|block\s*public\s*access/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A key left in plain sight. <strong>A code review finds a hardcoded AWS access key committed directly into a source file. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 20, damageIfOptimal: 34,
          hintNudge: 'A credential committed into source control has to be treated as compromised the moment it was pushed, regardless of whether the repo is private.',
          hintPartial: 'The literal access key is committed into the codebase — it must be treated as compromised immediately, and the fix is removing it from the code entirely, not just deleting the line going forward.',
          hintFull: 'Diagnosis: a hardcoded credential is committed into source control. Fix: immediately rotate/revoke the exposed key, remove the hardcoded value from the code (reference it via environment variable or a secrets manager instead), and purge it from git history.',
          outputBlock: [
            '$ (source file)',
            'access_key = "AKIAABCDEFG123456"'
          ],
          acceptableDiagnosesPatterns: [/hardcoded\s*(credential|key|access\s*key)/i, /committed.*(secret|key|credential)/i],
          followUpFix: {
            prompt: 'The first urgent action, given the key is now exposed:',
            acceptablePatterns: [],
            optimalPatterns: [/rotate|revoke/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A giant that no longer rises when called. <strong>A production database has Multi-AZ explicitly disabled. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 20, damageIfOptimal: 34,
          hintNudge: 'Without Multi-AZ, a single AZ failure takes the database down with no automatic standby to fail over to.',
          hintPartial: 'The database has no standby replica in another AZ — an AZ failure would take it down completely, with no automatic failover available.',
          hintFull: 'Diagnosis: Multi-AZ is disabled, leaving no standby for automatic failover. Fix: enable Multi-AZ so a standby replica exists in another AZ.',
          outputBlock: [
            '$ (infrastructure code, production database)',
            'multi_az = false'
          ],
          acceptableDiagnosesPatterns: [/multi-?az.*(disabled|off|false)/i, /no\s*standby/i],
          followUpFix: {
            prompt: 'Fix it by enabling Multi-AZ:',
            acceptablePatterns: [],
            optimalPatterns: [/multi_az\s*=\s*true|enable\s*multi-?az/i]
          }
        },
        {
          mode: 'terminal',
          prompt: 'The Titan checks a vault\'s recent visitors: <strong>"List the 5 most recent CloudTrail events for the current account."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32,
          hintNudge: 'cloudtrail has a lookup action for events, with a max-items flag.',
          hintPartial: 'aws cloudtrail lookup-______ --max-items 5',
          hintFull: 'aws cloudtrail lookup-events --max-items 5',
          acceptablePatterns: [],
          optimalPatterns: [/^aws\s+cloudtrail\s+lookup-events\s+--max-items\s+5$/i],
          baseCmds: ['aws']
        },
        {
          mode: 'terminal',
          prompt: 'It checks a metric\'s recent pulse: <strong>"Get the average CPU utilization for an EC2 instance over the last hour."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36,
          hintNudge: 'CloudWatch\'s get-metric-statistics call, with the namespace, metric name, dimensions, period, and statistic.',
          hintPartial: 'aws cloudwatch get-metric-statistics --namespace AWS/EC2 --metric-name CPUUtilization --dimensions Name=InstanceId,Value=<id> --start-time <t1> --end-time <t2> --period 3600 --statistics ________',
          hintFull: 'aws cloudwatch get-metric-statistics --namespace AWS/EC2 --metric-name CPUUtilization --dimensions Name=InstanceId,Value=<id> --start-time <t1> --end-time <t2> --period 3600 --statistics Average',
          acceptablePatterns: [],
          optimalPatterns: [/^aws\s+cloudwatch\s+get-metric-statistics\s+--namespace\s+AWS\/EC2\s+--metric-name\s+CPUUtilization\s+--dimensions\s+Name=InstanceId,Value=<id>\s+--start-time\s+<t1>\s+--end-time\s+<t2>\s+--period\s+3600\s+--statistics\s+Average$/i],
          baseCmds: ['aws']
        },
        {
          mode: 'terminal',
          prompt: 'The Titan checks the health of the whole herd: <strong>"Describe the current status of an auto-scaling group named <code>web-asg</code>."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28,
          hintNudge: 'autoscaling, with a describe action for auto-scaling groups, taking the group name.',
          hintPartial: 'aws autoscaling describe-auto-scaling-______ --auto-scaling-group-names web-asg',
          hintFull: 'aws autoscaling describe-auto-scaling-groups --auto-scaling-group-names web-asg',
          acceptablePatterns: [],
          optimalPatterns: [/^aws\s+autoscaling\s+describe-auto-scaling-groups\s+--auto-scaling-group-names\s+web-asg$/i],
          baseCmds: ['aws']
        },
        {
          mode: 'terminal',
          prompt: 'A giant checks whether a vault door was ever unlocked: <strong>"Check the public access block configuration for the S3 bucket <code>my-bucket</code>."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32,
          hintNudge: 's3api, with a get action for the bucket\'s public access block setting.',
          hintPartial: 'aws s3api get-public-access-_____ --bucket my-bucket',
          hintFull: 'aws s3api get-public-access-block --bucket my-bucket',
          acceptablePatterns: [],
          optimalPatterns: [/^aws\s+s3api\s+get-public-access-block\s+--bucket\s+my-bucket$/i],
          baseCmds: ['aws']
        }
      ]
    },
    {
      name: 'Level 2 — Intermediate',
      hp: 140,
      questions: [
        {
          mode: 'terminal',
          prompt: 'The Titan reads a cost ledger: <strong>"Get the total AWS cost for the last 7 days, grouped by service."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32,
          hintNudge: 'Cost Explorer\'s CLI equivalent, with a time period and a group-by service dimension.',
          hintPartial: 'aws ce get-cost-and-usage --time-period Start=...,End=... --granularity DAILY --metrics "BlendedCost" --group-by Type=DIMENSION,Key=______',
          hintFull: 'aws ce get-cost-and-usage --time-period Start=2024-01-01,End=2024-01-08 --granularity DAILY --metrics "BlendedCost" --group-by Type=DIMENSION,Key=SERVICE',
          acceptablePatterns: [],
          optimalPatterns: [/^aws\s+ce\s+get-cost-and-usage\s+--time-period\s+Start=2024-01-01,End=2024-01-08\s+--granularity\s+DAILY\s+--metrics\s+"BlendedCost"\s+--group-by\s+Type=DIMENSION,Key=SERVICE$/i],
          baseCmds: ['aws']
        },
        {
          mode: 'terminal',
          prompt: 'It counts the sleeping giants too: <strong>"List EC2 instances that are STOPPED (still may be incurring EBS cost)."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28,
          hintNudge: 'The same describe-instances call, filtered to the stopped state this time.',
          hintPartial: 'aws ec2 describe-instances --filters "Name=instance-state-name,Values=_______"',
          hintFull: 'aws ec2 describe-instances --filters "Name=instance-state-name,Values=stopped"',
          acceptablePatterns: [],
          optimalPatterns: [/^aws\s+ec2\s+describe-instances\s+--filters\s+"Name=instance-state-name,Values=stopped"$/i],
          baseCmds: ['aws']
        },
        {
          mode: 'terminal',
          prompt: 'A giant creates a new safeguard: <strong>"Create a budget alert that notifies when spend exceeds $1000."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36,
          hintNudge: 'The Budgets service, with a create action, taking an account ID and a budget definition.',
          hintPartial: 'aws budgets create-budget --account-id <id> --budget file://budget.json',
          hintFull: 'aws budgets create-budget --account-id <id> --budget file://budget.json',
          acceptablePatterns: [],
          optimalPatterns: [/^aws\s+budgets\s+create-budget\s+--account-id\s+<id>\s+--budget\s+file:\/\/budget\.json$/i],
          baseCmds: ['aws']
        },
        {
          mode: 'terminal',
          prompt: 'The Titan checks who can open which vault: <strong>"Simulate whether the IAM user <code>deploy-bot</code> is allowed to call <code>s3:DeleteObject</code>."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36,
          hintNudge: 'IAM has a dedicated policy-simulation call for exactly this kind of "would this be allowed" check.',
          hintPartial: 'aws iam simulate-principal-______ --policy-source-arn <arn> --action-names s3:DeleteObject',
          hintFull: 'aws iam simulate-principal-policy --policy-source-arn <arn> --action-names s3:DeleteObject',
          acceptablePatterns: [],
          optimalPatterns: [/^aws\s+iam\s+simulate-principal-policy\s+--policy-source-arn\s+<arn>\s+--action-names\s+s3:DeleteObject$/i],
          baseCmds: ['aws']
        },
        {
          mode: 'terminal',
          prompt: 'It tags a new subject: <strong>"Add a tag <code>Environment=production</code> to the EC2 instance <code>i-1234567890abcdef0</code>."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28,
          hintNudge: 'ec2, with a create-tags action, taking the resource ID(s) and tags.',
          hintPartial: 'aws ec2 create-tags --resources i-1234567890abcdef0 --tags Key=Environment,Value=______',
          hintFull: 'aws ec2 create-tags --resources i-1234567890abcdef0 --tags Key=Environment,Value=production',
          acceptablePatterns: [],
          optimalPatterns: [/^aws\s+ec2\s+create-tags\s+--resources\s+i-1234567890abcdef0\s+--tags\s+Key=Environment,Value=production$/i],
          baseCmds: ['aws']
        },
        {
          mode: 'spot_the_bug',
          prompt: 'The Titan\'s ledger shows a coin spent forever: <strong>"This EBS volume is provisioned far larger than the app configuration actually requires. Find and fix the bug."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32,
          hintNudge: 'A volume size far beyond documented actual usage is paying for capacity that\'s never going to be used.',
          hintPartial: 'Line 1 provisions 1000 GB, but the application only needs roughly 50 GB of storage — size it to match actual need, with reasonable headroom.',
          hintFull: 'Line 1 should read: size = 100',
          codeBlock: [
            'size = 1000  # app only needs ~50GB'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/size\s*=\s*100/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A crooked policy grants far too much: <strong>"This IAM policy grants a CI deploy role full admin access, when it only needs to deploy Lambda functions. Find and fix the bug."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36,
          hintNudge: 'A wildcard "*" action on "*" resources is the broadest possible grant — scope it down to only what the role actually needs to do.',
          hintPartial: 'Line 1 grants "*" on "*" — full admin access — when the role only needs Lambda-specific permissions like lambda:UpdateFunctionCode.',
          hintFull: 'Line 1 should read: "Action": "lambda:UpdateFunctionCode"',
          codeBlock: [
            '"Action": "*", "Resource": "*"'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/"Action":\s*"lambda:UpdateFunctionCode"/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The Titan weighs a coin the size of a shield: <strong>"A workload runs 24/7, predictably, for the next year. How do you pay for it?"</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36,
          hintNudge: 'You KNOW you\'ll need this capacity constantly — commit for the discount.',
          hintPartial: 'A reserved/committed pricing option, since usage is steady and predictable.',
          hintFull: 'Best: reserved instances / a savings plan — steady, predictable, year-long usage is exactly what a commitment discount is for.',
          options: [
            { id: 'a', label: 'Reserved instances / a savings plan', tier: 'best', why: 'Steady, predictable usage is exactly the case a commitment discount is built for.' },
            { id: 'b', label: 'On-demand pricing', tier: 'wrong', why: 'The most expensive option for usage you already know is steady and predictable.' },
            { id: 'c', label: 'Spot instances', tier: 'wrong', why: 'Can be interrupted at any time — risky for a workload that needs to run continuously.' }
          ],
          justificationPatterns: [/reserved|committed|savings|predictable/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"A batch job, flexible timing, fine with being interrupted. How do you pay for it?"</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36,
          hintNudge: 'The workload can tolerate exactly the tradeoff this pricing option makes.',
          hintPartial: 'The cheapest option, which trades reliability for a steep discount.',
          hintFull: 'Best: spot instances — deeply discounted, and this job can tolerate the occasional interruption.',
          options: [
            { id: 'a', label: 'Spot instances', tier: 'best', why: 'The steepest discount, and this workload was specifically described as tolerant of interruption.' },
            { id: 'b', label: 'Reserved instances', tier: 'wrong', why: 'Pays for a year-long commitment that a flexible, interruptible batch job doesn\'t need.' },
            { id: 'c', label: 'On-demand', tier: 'defensible', why: 'Works, but costs more than necessary when the job could tolerate cheaper, interruptible capacity.' }
          ],
          justificationPatterns: [/spot|interrupt|cheap|discount/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"Traffic is spiky and unpredictable — short, sudden bursts. How do you pay for it?"</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36,
          hintNudge: 'You don\'t know when the spikes will hit — commit to nothing, scale with reality.',
          hintPartial: 'Pay only for what you use, and let it grow/shrink with the traffic itself.',
          hintFull: 'Best: on-demand with auto-scaling — you pay for what you use and scale with the actual spikes.',
          options: [
            { id: 'a', label: 'On-demand with auto-scaling', tier: 'best', why: 'Matches spend to actual unpredictable demand instead of guessing a fixed commitment.' },
            { id: 'b', label: 'Reserved instances sized for peak', tier: 'wrong', why: 'Over-commits to (and overpays for) capacity that sits idle outside the unpredictable spikes.' },
            { id: 'c', label: 'Spot instances', tier: 'wrong', why: 'Risks getting interrupted during exactly the traffic spike you most need capacity for.' }
          ],
          justificationPatterns: [/on.?demand|auto.?scal|spiky|unpredictable/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"Old logs, rarely ever accessed, must be retained for compliance. Where do they live?"</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36,
          hintNudge: 'You need to keep it, but access speed barely matters here.',
          hintPartial: 'A cheap, cold/archive storage tier built exactly for rarely-accessed data.',
          hintFull: 'Best: an archive/cold storage tier — same durability, much cheaper, appropriate for data you rarely touch.',
          options: [
            { id: 'a', label: 'Cold / archive storage tier', tier: 'best', why: 'Purpose-built for exactly this: retained, rarely accessed, at a much lower cost.' },
            { id: 'b', label: 'Standard/hot storage', tier: 'wrong', why: 'Pays a premium for fast access this data will essentially never need.' },
            { id: 'c', label: 'Delete them to save money', tier: 'wrong', why: 'Violates the stated compliance retention requirement.' }
          ],
          justificationPatterns: [/archive|cold|cheap|rarely/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"You spot a sudden, unexplained spike in the bill. What\'s the first move?"</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36,
          hintNudge: 'Find out what\'s actually driving it before you touch anything running.',
          hintPartial: 'Look at billing/cost-explorer data to see exactly what\'s costing more.',
          hintFull: 'Best: check cost-explorer/billing dashboards to identify the actual driver before taking any action.',
          options: [
            { id: 'a', label: 'Check cost-explorer/billing dashboards for the driver', tier: 'best', why: 'Identifies the real cause first, so whatever action you take next is actually correct.' },
            { id: 'b', label: 'Immediately shut down all resources', tier: 'wrong', why: 'Could cause a real outage before you even know what\'s actually driving the cost.' },
            { id: 'c', label: 'Wait for next month\'s bill to see if it repeats', tier: 'wrong', why: 'Lets a possibly-ongoing cost problem (or a security issue) compound for another month.' }
          ],
          justificationPatterns: [/cost\s*explorer|billing|dashboard|identify|investigate/i]
        },
        {
          mode: 'read_the_room',
          prompt: 'A giant\'s ledger swells without explanation. <strong>The monthly bill for a specific service jumped 5x with no corresponding change in traffic. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36,
          hintNudge: 'A cost jump with no traffic change points at a configuration change (something now provisioned bigger, or a runaway resource), not organic growth.',
          hintPartial: 'Check cost-explorer/billing data broken down by resource for that service to find the SPECIFIC resource driving the spike — a config change or a runaway/forgotten resource is far more likely than organic growth when traffic itself hasn\'t moved.',
          hintFull: 'Diagnosis: a specific resource\'s configuration (or a runaway/forgotten resource) is driving the spike, not real traffic growth. Fix: use cost-explorer broken down by resource to identify the specific driver, then correct or terminate it.',
          outputBlock: [
            '$ (billing) Service X: $200 -> $1000 this month',
            '$ (traffic metrics) unchanged from last month'
          ],
          acceptableDiagnosesPatterns: [/config(uration)?\s*change/i, /runaway\s*resource/i, /specific\s*resource/i],
          followUpFix: {
            prompt: 'Fix it by identifying the specific resource via cost breakdown:',
            acceptablePatterns: [],
            optimalPatterns: [/cost\s*explorer|per-resource|broken\s*down/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A key that opens far more than it should. <strong>An IAM role meant for a single automated task turns out to have broad admin permissions. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36,
          hintNudge: 'A role\'s actual permissions should match exactly what its task needs — check whether it was ever actually scoped down from a broad starting template.',
          hintPartial: 'The role was likely created from a broad template/starting policy and never scoped down to just what the specific automated task actually needs — a least-privilege audit and rewrite is needed.',
          hintFull: 'Diagnosis: the role\'s permissions were never scoped down from a broad starting policy to match its actual task. Fix: audit exactly which API calls the task genuinely makes, and rewrite the policy to grant only those.',
          outputBlock: [
            '$ aws iam list-attached-role-policies --role-name automation-task',
            '(AdministratorAccess attached)',
            '(the task itself only ever calls s3:PutObject)'
          ],
          acceptableDiagnosesPatterns: [/never\s*scoped\s*down/i, /too\s*broad|overly\s*broad/i, /least.?privilege/i],
          followUpFix: {
            prompt: 'Fix it by rewriting the policy to least privilege:',
            acceptablePatterns: [],
            optimalPatterns: [/least.?privilege|scope.*down|only.*needs/i]
          }
        },
        {
          mode: 'terminal',
          prompt: 'The Titan checks a schedule carved into rock: <strong>"List all scheduled Reserved Instance purchases coming up for renewal."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32,
          hintNudge: 'ec2, with a describe action for reserved instances.',
          hintPartial: 'aws ec2 describe-reserved-________',
          hintFull: 'aws ec2 describe-reserved-instances',
          acceptablePatterns: [],
          optimalPatterns: [/^aws\s+ec2\s+describe-reserved-instances$/i],
          baseCmds: ['aws']
        },
        {
          mode: 'terminal',
          prompt: 'A giant checks which spot fleets still stand: <strong>"List all currently active Spot Instance requests."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32,
          hintNudge: 'ec2, with a describe action for spot instance requests.',
          hintPartial: 'aws ec2 describe-spot-instance-________',
          hintFull: 'aws ec2 describe-spot-instance-requests',
          acceptablePatterns: [],
          optimalPatterns: [/^aws\s+ec2\s+describe-spot-instance-requests$/i],
          baseCmds: ['aws']
        },
        {
          mode: 'terminal',
          prompt: 'It checks the cost of a single service in isolation: <strong>"Get this month\'s cost forecast for the next 30 days."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36,
          hintNudge: 'Cost Explorer\'s CLI has a dedicated forecast call, taking a time period, metric, and granularity.',
          hintPartial: 'aws ce get-cost-______ --time-period Start=...,End=... --metric BLENDED_COST --granularity MONTHLY',
          hintFull: 'aws ce get-cost-forecast --time-period Start=2024-01-01,End=2024-01-31 --metric BLENDED_COST --granularity MONTHLY',
          acceptablePatterns: [],
          optimalPatterns: [/^aws\s+ce\s+get-cost-forecast\s+--time-period\s+Start=2024-01-01,End=2024-01-31\s+--metric\s+BLENDED_COST\s+--granularity\s+MONTHLY$/i],
          baseCmds: ['aws']
        },
        {
          mode: 'spot_the_bug',
          prompt: 'The Titan\'s ledger shows a coin paid for nothing at all: <strong>"This EBS volume is left unattached to any running instance, still accruing cost. Find and fix the bug."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32,
          hintNudge: 'An unattached volume with no instance using it is pure waste — check whether it\'s actually still needed at all.',
          hintPartial: 'Line 1 shows the volume state as "available" (unattached) — if it\'s genuinely no longer needed, it should be deleted rather than left accruing cost indefinitely.',
          hintFull: 'Fix: delete the unattached volume (after confirming no snapshot/backup is needed first): aws ec2 delete-volume --volume-id <id>',
          codeBlock: [
            '(volume state): available, attached_instance: none, age: 8 months'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/delete-volume|delete\s*the\s*(unattached\s*)?volume/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A crooked policy trusts a stranger too much: <strong>"This S3 bucket policy grants access to any AWS account, not just the intended partner account. Find and fix the bug."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36,
          hintNudge: 'A Principal of "*" means literally any AWS account/identity, not just the specific partner account intended.',
          hintPartial: 'Line 1\'s Principal is "*" (anyone) — it should be scoped to the specific partner account\'s ARN instead.',
          hintFull: 'Line 1 should read: "Principal": {"AWS": "arn:aws:iam::111122223333:root"}',
          codeBlock: [
            '"Principal": "*"'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/"Principal":\s*\{"AWS":\s*"arn:aws:iam::111122223333:root"\}/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A crooked budget watches nothing at all: <strong>"This budget alert is configured with a threshold so high it will never actually fire before massive overspend. Find and fix the bug."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32,
          hintNudge: 'A threshold set far above any realistic expected spend defeats the entire purpose of an early-warning alert.',
          hintPartial: 'Line 1\'s threshold of $100,000 is far above the team\'s actual expected monthly spend (~$5,000) — set it to something that would genuinely catch a real anomaly early.',
          hintFull: 'Line 1 should read something like: "threshold": 6000',
          codeBlock: [
            '"threshold": 100000  # actual expected spend: ~$5000/month'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/"threshold":\s*6000/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The Titan weighs a familiar coin again, differently: <strong>"A workload has predictable BASELINE usage but occasional unpredictable bursts above that baseline. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36,
          hintNudge: 'This is a mixed pattern — the predictable part and the unpredictable part each have a genuinely different best pricing fit.',
          hintPartial: 'Cover the predictable baseline with reserved capacity (the discount is earned), and let on-demand/auto-scaling handle the unpredictable bursts above it — a purely single pricing model fits neither part of this workload well.',
          hintFull: 'Best: a blended approach — reserved instances/savings plans for the predictable baseline usage, with on-demand auto-scaling covering the unpredictable bursts above it. Neither pure reserved nor pure on-demand fits this mixed pattern as well as combining them.',
          options: [
            { id: 'a', label: 'Reserved instances sized for the peak burst level', tier: 'wrong', why: 'Commits to (and pays for) burst-level capacity that sits mostly idle outside the occasional bursts — overpays for the predictable-baseline portion.' },
            { id: 'b', label: 'A blended approach — reserved for the baseline, on-demand/auto-scaling for the bursts', tier: 'best', why: 'Matches each part of the actual usage pattern to the pricing model that fits it best, rather than forcing one model to cover a genuinely mixed pattern.' },
            { id: 'c', label: 'Pure on-demand for everything, to keep it simple', tier: 'defensible', why: 'Works, but leaves real, earnable discount value on the table for the predictable baseline portion of usage.' }
          ],
          justificationPatterns: [/blended|reserved.*baseline|mixed\s*pattern/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"Deciding whether to grant a new team broad IAM permissions upfront (so they\'re never blocked) or start narrow and expand as needed. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36,
          hintNudge: 'Starting broad "to avoid being blocked" means granting access that may never actually be used — the opposite of least privilege, and a real standing risk from day one.',
          hintPartial: 'Start narrow, scoped to the team\'s actual known initial needs, and expand deliberately as genuine new needs arise — starting broad "just in case" grants real standing access that may never be used, which is exactly what least privilege exists to avoid.',
          hintFull: 'Best: start narrow (least privilege from day one) and expand permissions deliberately as specific, real needs actually arise — starting broad to avoid ever being blocked trades a minor, addressable inconvenience (a permission request) for a real, standing security risk.',
          options: [
            { id: 'a', label: 'Grant broad permissions upfront so the team is never blocked', tier: 'wrong', why: 'Creates real, standing access that may never actually be used — exactly the risk least privilege is meant to prevent, for the sake of avoiding a minor, addressable inconvenience.' },
            { id: 'b', label: 'Start narrow, expand deliberately as real needs arise', tier: 'best', why: 'Keeps standing access matched to actual current need — a permission request when a genuine new need arises is a minor, addressable cost compared to unused standing access.' },
            { id: 'c', label: 'Grant admin access to everyone to avoid the topic entirely', tier: 'wrong', why: 'The most extreme version of unnecessary standing access — removes any meaningful access boundary at all.' }
          ],
          justificationPatterns: [/least\s*privilege|narrow|expand.*(need|deliberately)/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"Deciding whether a small startup needs a dedicated FinOps/cost-review process this early, or if it can wait. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36,
          hintNudge: 'A LIGHTWEIGHT recurring cost review (not necessarily a dedicated team) costs very little time and catches waste before it compounds — the question is really about lightweight-now vs. nothing-until-later, not full-FinOps-team vs. nothing.',
          hintPartial: 'Start with a lightweight, low-effort recurring cost review (not necessarily a dedicated FinOps team) — this catches waste early, before it compounds into a much larger cleanup project, without the overhead a small startup can\'t yet justify.',
          hintFull: 'Best: adopt a lightweight recurring cost review process now (even without a dedicated FinOps team) — this is a small ongoing cost that catches waste while it\'s still small, versus waiting until cost problems have compounded into a much larger, harder cleanup project.',
          options: [
            { id: 'a', label: 'Wait until the company is much larger to think about cost review at all', tier: 'wrong', why: 'Lets small, individually-unremarkable waste accumulate unnoticed and compound over time, into a much larger cleanup project than a lightweight review would have caught early.' },
            { id: 'b', label: 'Adopt a lightweight recurring cost review process now, without needing a dedicated team', tier: 'best', why: 'A small, proportionate ongoing investment that catches waste while it\'s still small, without the overhead a small startup genuinely can\'t justify yet.' },
            { id: 'c', label: 'Hire a dedicated FinOps team immediately', tier: 'wrong', why: 'A real, substantial investment that\'s disproportionate to a small startup\'s actual current scale and cost-management needs.' }
          ],
          justificationPatterns: [/lightweight|recurring\s*review|catch.*early/i]
        },
        {
          mode: 'read_the_room',
          prompt: 'A vault left unlocked between two houses. <strong>A partner integration meant to access only one specific S3 bucket turns out to have access to every bucket in the account. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36,
          hintNudge: 'Check the actual Resource field in the granted policy — a wildcard resource grants access far beyond the one intended bucket.',
          hintPartial: 'The policy granted to the partner uses a wildcard Resource ("*" or "arn:aws:s3:::*") instead of the specific bucket ARN — this grants access to every bucket, not just the intended one.',
          hintFull: 'Diagnosis: the granted policy uses a wildcard resource instead of the specific intended bucket ARN. Fix: scope the Resource down to just the specific bucket (and its objects) the partner actually needs.',
          outputBlock: [
            '$ (partner IAM policy) "Resource": "arn:aws:s3:::*"',
            '(intended to grant access to only: arn:aws:s3:::partner-shared-bucket)'
          ],
          acceptableDiagnosesPatterns: [/wildcard\s*resource/i, /too\s*broad|overly\s*broad/i],
          followUpFix: {
            prompt: 'Fix it by scoping the Resource to the specific bucket:',
            acceptablePatterns: [],
            optimalPatterns: [/specific\s*bucket|arn:aws:s3:::partner-shared-bucket/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A giant\'s coffer drained by a forgotten test. <strong>A load-testing environment that was supposed to be temporary has been running at full scale for three months. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36,
          hintNudge: 'A "temporary" environment with no actual expiration mechanism relies entirely on someone remembering to tear it down — which reliably fails at some rate.',
          hintPartial: 'The temporary environment was never given an actual expiration/teardown mechanism — it relied on someone remembering to manually delete it, which didn\'t happen.',
          hintFull: 'Diagnosis: the temporary environment had no automated expiration, relying purely on manual teardown that never happened. Fix: tear it down now, and for future temporary environments, use an automated expiration mechanism (e.g. a scheduled teardown, or a tagged TTL enforced by policy) instead of relying on memory.',
          outputBlock: [
            '$ (resource creation date) 3 months ago, tagged "temporary-load-test"',
            '$ (billing) ~$2,400/month, still running at full scale'
          ],
          acceptableDiagnosesPatterns: [/no\s*(automated\s*)?expiration/i, /relied\s*on\s*(manual|memory)/i],
          followUpFix: {
            prompt: 'Fix future temporary environments with an automated expiration mechanism:',
            acceptablePatterns: [],
            optimalPatterns: [/automated\s*expiration|scheduled\s*teardown|ttl/i]
          }
        }
      ]
    },
    {
      name: 'Level 3 — Advanced Basics',
      hp: 160,
      questions: [
        {
          mode: 'terminal',
          prompt: 'The Titan checks a vault\'s locking mechanism: <strong>"Confirm whether default encryption is enabled on the S3 bucket <code>my-bucket</code>."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36,
          hintNudge: 's3api, with a get action for the bucket\'s encryption configuration.',
          hintPartial: 'aws s3api get-bucket-________ --bucket my-bucket',
          hintFull: 'aws s3api get-bucket-encryption --bucket my-bucket',
          acceptablePatterns: [],
          optimalPatterns: [/^aws\s+s3api\s+get-bucket-encryption\s+--bucket\s+my-bucket$/i],
          baseCmds: ['aws']
        },
        {
          mode: 'terminal',
          prompt: 'A giant checks a secret\'s current form: <strong>"Retrieve the current value of the secret <code>db-password</code> from Secrets Manager."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32,
          hintNudge: 'secretsmanager, with a get action for the secret value.',
          hintPartial: 'aws secretsmanager get-secret-_____ --secret-id db-password',
          hintFull: 'aws secretsmanager get-secret-value --secret-id db-password',
          acceptablePatterns: [],
          optimalPatterns: [/^aws\s+secretsmanager\s+get-secret-value\s+--secret-id\s+db-password$/i],
          baseCmds: ['aws']
        },
        {
          mode: 'terminal',
          prompt: 'It checks whether a trail is actually being written: <strong>"Confirm CloudTrail logging status for the trail named <code>org-trail</code>."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32,
          hintNudge: 'cloudtrail, with a get action for trail status, taking the trail name.',
          hintPartial: 'aws cloudtrail get-trail-______ --name org-trail',
          hintFull: 'aws cloudtrail get-trail-status --name org-trail',
          acceptablePatterns: [],
          optimalPatterns: [/^aws\s+cloudtrail\s+get-trail-status\s+--name\s+org-trail$/i],
          baseCmds: ['aws']
        },
        {
          mode: 'terminal',
          prompt: 'The Titan checks how many hands are on the wheel: <strong>"List the scaling activities for an auto-scaling group named <code>web-asg</code>."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36,
          hintNudge: 'autoscaling, with a describe action for scaling activities, taking the group name.',
          hintPartial: 'aws autoscaling describe-scaling-_________ --auto-scaling-group-name web-asg',
          hintFull: 'aws autoscaling describe-scaling-activities --auto-scaling-group-name web-asg',
          acceptablePatterns: [],
          optimalPatterns: [/^aws\s+autoscaling\s+describe-scaling-activities\s+--auto-scaling-group-name\s+web-asg$/i],
          baseCmds: ['aws']
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A crooked provisioner leaves footprints forever. <strong>"This provisioner keeps appending the same line to a config file on every apply. Find and fix the bug."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36,
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
          prompt: 'A tablet forgets its own name each time. <strong>"This resource\'s name changes on every single apply, forcing an unwanted replacement. Find and fix the bug."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36,
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
          mode: 'triage_call',
          prompt: 'The Titan weighs region against region: <strong>"Designing multi-region disaster recovery for a critical service. Choosing between a cold standby and a hot standby in the DR region. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40,
          hintNudge: 'A cold standby needs to be spun up during the actual incident (slower recovery); a hot standby is already running and ready (faster, but costs more continuously).',
          hintPartial: 'For a genuinely critical service, a hot standby (already running, ready to take traffic) gives much faster recovery than a cold standby that must be provisioned during the incident itself — worth the ongoing cost for something this critical.',
          hintFull: 'Best (for a genuinely critical service): a hot standby — already running and ready, it recovers far faster than a cold standby that has to be stood up during the incident; a cold standby is a reasonable, cheaper choice only for less time-sensitive workloads.',
          options: [
            { id: 'a', label: 'A cold standby, provisioned only when disaster strikes', tier: 'defensible', why: 'Cheaper day-to-day, but recovery time includes the time to actually provision it — a real cost for a genuinely critical, time-sensitive service.' },
            { id: 'b', label: 'A hot standby, already running and ready to take traffic', tier: 'best', why: 'Minimizes recovery time for a critical service, since it\'s already running — the added ongoing cost is a reasonable tradeoff for something this important.' },
            { id: 'c', label: 'No DR region at all — rely on the primary region\'s own redundancy', tier: 'wrong', why: 'Doesn\'t protect against an entire REGION failing, only failures within it — a real, different risk that multi-AZ alone doesn\'t cover.' }
          ],
          justificationPatterns: [/hot\s*standby|already\s*running|recovery\s*time/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"Choosing an encryption approach for data at rest in a database holding sensitive customer data. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40,
          hintNudge: 'Sensitive customer data at rest genuinely warrants encryption as a baseline — the real question is customer-managed vs. provider-managed keys, not whether to encrypt at all.',
          hintPartial: 'Enable encryption at rest as a non-negotiable baseline for sensitive data — use customer-managed keys (via a KMS-style service) specifically when you need more control over key rotation/access than the provider\'s default managed keys give.',
          hintFull: 'Best: encryption at rest is a baseline requirement for sensitive data, full stop — reach for customer-managed keys over provider-managed defaults when you specifically need finer control over key rotation, access policy, or audit trail for compliance reasons.',
          options: [
            { id: 'a', label: 'Skip encryption at rest — it adds complexity for little benefit', tier: 'wrong', why: 'Encryption at rest is a baseline expectation for sensitive customer data, not an optional nice-to-have — skipping it is a real, avoidable risk.' },
            { id: 'b', label: 'Enable encryption at rest, choosing key management based on actual compliance/control needs', tier: 'best', why: 'Treats encryption as non-negotiable while matching the key-management approach (provider-managed vs. customer-managed) to the actual level of control genuinely required.' },
            { id: 'c', label: 'Encrypt only backups, not the live database', tier: 'wrong', why: 'Leaves the actual live sensitive data unencrypted at rest — backups are only one copy of the exposure.' }
          ],
          justificationPatterns: [/encryption\s*at\s*rest|baseline|kms|customer-managed/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"Deciding on an account/landing-zone structure for a growing organization: one shared AWS account for everything, vs. separate accounts per team/environment. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40,
          hintNudge: 'One shared account means a mistake or breach in ANY workload can potentially reach every other workload in that same account — blast radius is the key concept here.',
          hintPartial: 'Separate accounts per team/environment genuinely limit blast radius — a mistake or compromise in one account doesn\'t automatically reach resources living in a completely separate account, unlike a single shared account.',
          hintFull: 'Best (for a growing org): separate accounts per team/environment (a landing-zone/multi-account strategy) — this genuinely limits blast radius, since a mistake or security issue in one account is structurally contained rather than able to reach every workload sharing one account.',
          options: [
            { id: 'a', label: 'One shared account for everything, for simplicity', tier: 'wrong', why: 'A mistake or security incident anywhere can potentially reach every workload in the account — no structural containment at all as the org grows.' },
            { id: 'b', label: 'Separate accounts per team/environment (a landing-zone strategy)', tier: 'best', why: 'Genuinely limits blast radius — an incident in one account is structurally contained, rather than able to reach everything sharing a single account.' },
            { id: 'c', label: 'One account per individual engineer', tier: 'wrong', why: 'Over-fragments in the opposite direction — creates real, unnecessary management overhead without matching how teams/environments actually need to be isolated.' }
          ],
          justificationPatterns: [/blast\s*radius|separate\s*accounts?|landing\s*zone|contain/i]
        },
        {
          mode: 'read_the_room',
          prompt: 'A giant unable to stretch further. <strong>An auto-scaling group is stuck at its current size during a real traffic spike, never scaling up. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40,
          hintNudge: 'Check the group\'s configured maximum size — a scaling policy can\'t exceed a hard ceiling the group itself was configured with.',
          hintPartial: 'The auto-scaling group\'s max-size is already set equal to (or below) its current size — no scaling policy can push it past a hard ceiling the group itself was configured with.',
          hintFull: 'Diagnosis: the auto-scaling group\'s max-size limit is already at (or below) the current instance count. Fix: raise the group\'s max-size to allow genuine room to scale up.',
          outputBlock: [
            '$ aws autoscaling describe-auto-scaling-groups --auto-scaling-group-names web-asg',
            '(DesiredCapacity: 4, MaxSize: 4)',
            '(CPU utilization: 95%, well past the scale-up threshold)'
          ],
          acceptableDiagnosesPatterns: [/max.?size.*(limit|cap|ceiling)/i, /at\s*(its\s*)?maximum/i],
          followUpFix: {
            prompt: 'Fix it by raising the max-size:',
            acceptablePatterns: [],
            optimalPatterns: [/max-size|raise.*max/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A trail that records nothing. <strong>A security audit discovers that CloudTrail logging is enabled but not actually capturing any events for the last month. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40,
          hintNudge: 'Check the actual destination the trail delivers to — the trail can be "enabled" while its logs are silently failing to land anywhere usable.',
          hintPartial: 'The trail\'s target S3 bucket (or its bucket policy) was changed/misconfigured, so log delivery has been silently failing even though the trail itself shows as "enabled."',
          hintFull: 'Diagnosis: the trail\'s log destination (S3 bucket/policy) is misconfigured, so delivery is silently failing despite the trail being enabled. Fix: verify and correct the destination bucket\'s policy to accept CloudTrail log delivery.',
          outputBlock: [
            '$ aws cloudtrail get-trail-status --name org-trail',
            '(IsLogging: true)',
            '$ aws s3 ls s3://trail-bucket/',
            '(no new objects in the last 30 days)'
          ],
          acceptableDiagnosesPatterns: [/destination.*(misconfigur|wrong|policy)/i, /delivery.*(fail|broken)/i],
          followUpFix: {
            prompt: 'Fix it by correcting the destination bucket policy:',
            acceptablePatterns: [],
            optimalPatterns: [/bucket\s*policy|destination/i]
          }
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'The Titan assembles a checklist of readiness. <strong>Sequence the correct order for setting up encryption for sensitive data at rest.</strong>',
          steps: [
            'Classify which data actually needs encryption at rest',
            'Choose between provider-managed and customer-managed keys',
            'Enable encryption on the relevant storage resources',
            'Verify encryption is actually active, not just configured'
          ],
          damageIfCorrect: 26, damageIfOptimal: 42,
          damageToHeroIfWrong: 22
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'A second checklist forms. <strong>Sequence the correct order for designing a multi-account landing zone.</strong>',
          steps: [
            'Define which boundaries need blast-radius isolation (team, environment, workload)',
            'Create separate accounts along those boundaries',
            'Set up centralized logging/billing across accounts',
            'Apply consistent guardrail policies across all accounts'
          ],
          damageIfCorrect: 26, damageIfOptimal: 42,
          damageToHeroIfWrong: 22
        },
        {
          mode: 'terminal',
          prompt: 'The Titan checks a key\'s own rotation schedule: <strong>"Check whether automatic key rotation is enabled for a KMS key, given its key ID."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36,
          hintNudge: 'kms, with a get action for key rotation status, taking the key ID.',
          hintPartial: 'aws kms get-key-rotation-______ --key-id <id>',
          hintFull: 'aws kms get-key-rotation-status --key-id <id>',
          acceptablePatterns: [],
          optimalPatterns: [/^aws\s+kms\s+get-key-rotation-status\s+--key-id\s+<id>$/i],
          baseCmds: ['aws']
        },
        {
          mode: 'terminal',
          prompt: 'A giant checks how far a wall actually reaches: <strong>"List every VPC peering connection in this account."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32,
          hintNudge: 'ec2, with a describe action for VPC peering connections.',
          hintPartial: 'aws ec2 describe-vpc-peering-___________',
          hintFull: 'aws ec2 describe-vpc-peering-connections',
          acceptablePatterns: [],
          optimalPatterns: [/^aws\s+ec2\s+describe-vpc-peering-connections$/i],
          baseCmds: ['aws']
        },
        {
          mode: 'terminal',
          prompt: 'It checks whether a snapshot actually exists to fall back on: <strong>"List the automated backup snapshots for an RDS database named <code>prod-db</code>."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32,
          hintNudge: 'rds, with a describe action for snapshots, filtered to a specific DB instance.',
          hintPartial: 'aws rds describe-db-______ --db-instance-identifier prod-db',
          hintFull: 'aws rds describe-db-snapshots --db-instance-identifier prod-db',
          acceptablePatterns: [],
          optimalPatterns: [/^aws\s+rds\s+describe-db-snapshots\s+--db-instance-identifier\s+prod-db$/i],
          baseCmds: ['aws']
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A crooked backup plan skips the real vault. <strong>"This backup policy only backs up the primary region, with no copy anywhere else. Find and fix the bug."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36,
          hintNudge: 'A backup only stored in the SAME region as the primary data doesn\'t protect against that region itself failing.',
          hintPartial: 'Line 1 has no cross-region copy configured — a region-wide failure would take out both the primary data and its only backup together.',
          hintFull: 'Fix: add cross-region copy: copy_to_region = "us-west-2"',
          codeBlock: [
            '(backup plan): region = "us-east-1" only, no cross-region copy'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/copy_to_region|cross-region\s*copy/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A crooked key never actually turns. <strong>"This KMS key has automatic rotation explicitly disabled. Find and fix the bug."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36,
          hintNudge: 'Automatic rotation should be enabled unless there\'s a specific, deliberate reason not to.',
          hintPartial: 'Line 1 disables automatic key rotation — enable it so the key rotates on a regular schedule without manual intervention.',
          hintFull: 'Line 1 should read: enable_key_rotation = true',
          codeBlock: [
            'enable_key_rotation = false'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/enable_key_rotation\s*=\s*true/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A crooked network bridges two worlds too openly. <strong>"This VPC peering route allows the entire peer VPC\'s CIDR range, far more than the one subnet that actually needs to talk to it. Find and fix the bug."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36,
          hintNudge: 'Scope the route to the specific subnet that actually needs connectivity, not the peer\'s entire address range.',
          hintPartial: 'Line 1 routes the peer\'s entire /16 CIDR, but only one specific /24 subnet on that side actually needs to be reachable.',
          hintFull: 'Line 1 should read: destination_cidr_block = "10.1.5.0/24"',
          codeBlock: [
            'destination_cidr_block = "10.1.0.0/16"'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/destination_cidr_block\s*=\s*"10\.1\.5\.0\/24"/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The Titan weighs the value of a copy against its cost: <strong>"Deciding backup retention length for a production database — how long to keep automated daily backups. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40,
          hintNudge: 'Retention should match how far back you\'d realistically need to recover from — both "a problem noticed too late" and storage cost are real considerations, not just "as long as possible."',
          hintPartial: 'Set retention based on realistic recovery scenarios (e.g. "a data issue not noticed for 2 weeks" is a real, common pattern) balanced against the storage cost of keeping backups indefinitely — not simply "as long as possible" or an arbitrarily short default.',
          hintFull: 'Best: choose retention based on a realistic worst-case detection delay for a real incident (commonly 2-4 weeks for data-corruption-style issues not caught immediately), balanced against genuine storage cost — an arbitrarily short default retention risks not having a good-enough backup when a real, slowly-noticed problem surfaces.',
          options: [
            { id: 'a', label: 'Whatever the default retention period is, without further thought', tier: 'wrong', why: 'A default wasn\'t chosen with this specific database\'s actual recovery needs in mind — it may be too short for a realistic slowly-noticed incident.' },
            { id: 'b', label: 'A retention period matched to realistic recovery scenarios, balanced against storage cost', tier: 'best', why: 'Grounds the choice in an actual, common failure pattern (a problem not noticed immediately) rather than an arbitrary number, while still accounting for real storage cost.' },
            { id: 'c', label: 'Keep every backup forever, to be maximally safe', tier: 'defensible', why: 'Maximizes recovery safety, but accrues real, ongoing storage cost for backups far older than any realistic recovery scenario would need.' }
          ],
          justificationPatterns: [/realistic|recovery\s*scenario|balanc.*cost/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"Deciding whether to enable versioning on an S3 bucket holding critical production data. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40,
          hintNudge: 'Versioning protects against ACCIDENTAL overwrite/deletion by keeping prior versions — a real, common failure mode for critical data with no other safeguard against it.',
          hintPartial: 'Enable versioning — it directly protects against accidental overwrites or deletions (a real, common way critical data gets lost) by keeping recoverable prior versions, at a modest storage cost.',
          hintFull: 'Best: enable versioning for critical production data — it\'s a real, low-effort safeguard against accidental overwrite/deletion (a common way data is lost), and the storage cost of keeping prior versions is modest relative to what it protects against.',
          options: [
            { id: 'a', label: 'Enable versioning on the bucket', tier: 'best', why: 'A real, low-effort safeguard against a common failure mode (accidental overwrite/deletion) for data explicitly described as critical.' },
            { id: 'b', label: 'Skip versioning to avoid extra storage cost', tier: 'wrong', why: 'Trades away real protection against a common way critical data is actually lost, for a storage cost that\'s typically modest by comparison.' },
            { id: 'c', label: 'Rely on a separate backup process instead of versioning', tier: 'defensible', why: 'A backup process helps, but versioning specifically protects against accidental in-place overwrites within the bucket itself in a way a periodic backup may not fully cover.' }
          ],
          justificationPatterns: [/versioning|accidental\s*(overwrite|delet)/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"Deciding on network architecture: a single flat VPC for the whole platform, vs. separate VPCs per environment (dev/staging/prod). Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40,
          hintNudge: 'A single flat VPC means dev/staging resources share the same network boundary as production — a misconfiguration or compromise in a lower environment could potentially reach production.',
          hintPartial: 'Separate VPCs per environment give a real network-level boundary between dev/staging and production — a single flat VPC means a lower-environment mistake or compromise has a more direct path toward production resources.',
          hintFull: 'Best: separate VPCs per environment — this creates a genuine network-level isolation boundary, so issues in dev/staging (which are inherently lower-scrutiny, faster-moving environments) don\'t have a direct network path to production.',
          options: [
            { id: 'a', label: 'A single flat VPC for the whole platform', tier: 'wrong', why: 'Puts dev/staging (lower-scrutiny, faster-moving environments) on the same network boundary as production, with no real isolation between them.' },
            { id: 'b', label: 'Separate VPCs per environment', tier: 'best', why: 'Creates a genuine network-level isolation boundary, so a lower-environment issue doesn\'t have a direct path to production resources.' },
            { id: 'c', label: 'Separate VPCs per individual engineer', tier: 'wrong', why: 'Over-fragments in a way that doesn\'t match how environments actually need to be isolated, creating unnecessary management overhead.' }
          ],
          justificationPatterns: [/separate\s*vpc|isolation.*(environment|boundary)/i]
        },
        {
          mode: 'read_the_room',
          prompt: 'A giant\'s backup turns out to be an echo of nothing. <strong>A disaster-recovery test reveals the "backups" being restored are actually empty or corrupted. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40,
          hintNudge: 'A backup process that "runs successfully" without anyone ever actually testing a real restore can silently produce useless backups for a long time before anyone notices.',
          hintPartial: 'The backup job has been reporting success, but nobody had ever actually tested restoring FROM one of those backups until now — it was silently producing empty/corrupted backups the whole time.',
          hintFull: 'Diagnosis: backups were never actually test-restored, letting a silent failure go undetected. Fix: identify and fix the actual backup corruption/emptiness cause, then establish regular, actual restore testing (not just "the job reported success") going forward.',
          outputBlock: [
            '$ (backup job logs) Status: SUCCESS, for the last 6 months',
            '$ (restore test, first time ever attempted) restored files: 0 bytes'
          ],
          acceptableDiagnosesPatterns: [/never\s*(actually\s*)?tested/i, /silent(ly)?\s*fail/i],
          followUpFix: {
            prompt: 'Fix it by establishing regular actual restore testing:',
            acceptablePatterns: [],
            optimalPatterns: [/restore\s*test|test.*restor/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A wall meant to separate two worlds has a hidden gate. <strong>Traffic from a "dev" VPC is unexpectedly able to reach resources in the "prod" VPC. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40,
          hintNudge: 'Check the actual VPC peering routes and their CIDR scope — a peering connection meant for one narrow purpose can be routed far more broadly than intended.',
          hintPartial: 'A VPC peering connection between dev and prod (perhaps set up for a narrow, specific purpose) has routes scoped far more broadly than that original purpose, allowing traffic well beyond what was intended.',
          hintFull: 'Diagnosis: an overly broad VPC peering route between dev and prod allows more traffic than the original intended purpose. Fix: narrow the peering route\'s CIDR scope to exactly the specific resources that legitimately need to communicate, or remove the peering entirely if it\'s no longer needed.',
          outputBlock: [
            '$ aws ec2 describe-route-tables --filters "Name=vpc-id,Values=<dev-vpc-id>"',
            '(route to prod VPC\'s full /16 CIDR via peering connection)'
          ],
          acceptableDiagnosesPatterns: [/overly\s*broad\s*(peering|route)/i, /route.*(too\s*broad|wider\s*than\s*intended)/i],
          followUpFix: {
            prompt: 'Fix it by narrowing the peering route\'s scope:',
            acceptablePatterns: [],
            optimalPatterns: [/narrow.*route|scope.*specific/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A key that was meant to change, frozen in time. <strong>A security audit finds a KMS key encrypting sensitive data hasn\'t rotated in over 2 years. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40,
          hintNudge: 'Check whether automatic key rotation was ever actually enabled on this key — a key can sit unrotated indefinitely if it wasn\'t.',
          hintPartial: 'Automatic key rotation was never enabled on this key — without it, a key can go unrotated indefinitely with nothing prompting a change.',
          hintFull: 'Diagnosis: automatic key rotation was never enabled. Fix: enable automatic annual key rotation so this doesn\'t require anyone remembering to do it manually.',
          outputBlock: [
            '$ aws kms get-key-rotation-status --key-id <id>',
            '(KeyRotationEnabled: false)',
            '(key created 2 years, 3 months ago)'
          ],
          acceptableDiagnosesPatterns: [/rotation.*(never\s*enabled|disabled)/i],
          followUpFix: {
            prompt: 'Fix it by enabling automatic key rotation:',
            acceptablePatterns: [],
            optimalPatterns: [/enable.*(key\s*)?rotation/i]
          }
        }
      ]
    },
    {
      name: 'Level 4 — Real Incidents',
      hp: 180,
      questions: [
        {
          mode: 'terminal',
          prompt: 'The Titan checks the walls for cracks: <strong>"List all security groups that allow unrestricted inbound access from anywhere."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36, timeAllotted: 32,
          hintNudge: 'ec2 describe-security-groups with a filter matching the 0.0.0.0/0 CIDR range.',
          hintPartial: 'aws ec2 describe-security-groups --filters "Name=ip-permission.cidr,Values=_________"',
          hintFull: 'aws ec2 describe-security-groups --filters "Name=ip-permission.cidr,Values=0.0.0.0/0"',
          acceptablePatterns: [],
          optimalPatterns: [/^aws\s+ec2\s+describe-security-groups\s+--filters\s+"Name=ip-permission\.cidr,Values=0\.0\.0\.0\/0"$/i],
          baseCmds: ['aws']
        },
        {
          mode: 'terminal',
          prompt: 'A giant counts every stack that has strayed: <strong>"Show the drift status of a CloudFormation stack named <code>prod-stack</code>."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 38, timeAllotted: 32,
          hintNudge: 'cloudformation has a dedicated drift-detection workflow — start it, then check its status.',
          hintPartial: 'aws cloudformation detect-stack-_____ --stack-name prod-stack',
          hintFull: 'aws cloudformation detect-stack-drift --stack-name prod-stack',
          acceptablePatterns: [],
          optimalPatterns: [/^aws\s+cloudformation\s+detect-stack-drift\s+--stack-name\s+prod-stack$/i],
          baseCmds: ['aws']
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A giant\'s heart no longer beats when the ground shakes. <strong>"This production database has explicitly turned off the setting that survives an AZ failure. Find and fix the bug."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 38, timeAllotted: 32,
          hintNudge: 'This production database has explicitly turned OFF the setting that would let it survive an AZ failure.',
          hintPartial: 'Flip it on.',
          hintFull: 'Fix: multi_az = true',
          codeBlock: [
            'multi_az = false'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/^multi_az\s*=\s*true$/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'One last tablet before the storm. <strong>"A real credential is sitting in plain text, committed straight into this file. Find and fix the bug."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 38, timeAllotted: 32,
          hintNudge: 'A real credential is sitting in plain text, committed straight into this file.',
          hintPartial: 'Reference it from a variable instead of writing the literal key.',
          hintFull: 'Fix: access_key = var.aws_access_key',
          codeBlock: [
            'access_key = "AKIAABCDEFG123456"'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/^access_key\s*=\s*var\.aws_access_key$/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The Titan watches a service crumble under weight it never expected: <strong>"An auto-scaling group hits the account\'s EC2 instance quota during a real traffic spike and can\'t scale further. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 42, timeAllotted: 32,
          hintNudge: 'The immediate need is more headroom right now; the longer-term need is making sure this doesn\'t recur at the next spike.',
          hintPartial: 'Request an emergency quota increase immediately to restore headroom, then set up quota-utilization alerting so this is caught proactively before it becomes an outage next time.',
          hintFull: 'Best: request an urgent quota increase to restore capacity right away, and set up proactive quota-utilization monitoring/alerting afterward so approaching a limit is caught well before it becomes an active incident again.',
          options: [
            { id: 'a', label: 'Request an emergency quota increase, then add quota monitoring afterward', tier: 'best', why: 'Restores capacity for the active incident immediately, while the monitoring addition prevents the same surprise next time a spike approaches the limit.' },
            { id: 'b', label: 'Wait for traffic to naturally decrease', tier: 'wrong', why: 'Leaves the service under-capacity during an active incident when a quota increase request is available and often processed quickly.' },
            { id: 'c', label: 'Manually terminate other, unrelated instances to free up quota room', tier: 'wrong', why: 'Risks breaking unrelated, possibly critical workloads to free capacity, when requesting a genuine quota increase is the direct fix.' }
          ],
          justificationPatterns: [/quota\s*increase|monitor.*quota|proactive/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"A cross-account IAM role was found granting broader access than any legitimate cross-account use case requires. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 42, timeAllotted: 32,
          hintNudge: 'A cross-account trust relationship needs to be scoped to exactly what the legitimate use case requires — an overly broad grant is a real, standing risk even if nothing has gone wrong yet.',
          hintPartial: 'Audit exactly which cross-account operations are actually legitimate, then rewrite the trust policy and permissions to grant only that — a standing overly-broad cross-account grant is a real risk regardless of whether it\'s been exploited yet.',
          hintFull: 'Best: audit the actual legitimate cross-account use case, then scope both the trust policy (who can assume the role) and its permissions down to exactly that — an overly broad standing grant is a real risk on its own, independent of whether it has been actively misused.',
          options: [
            { id: 'a', label: 'Leave it as-is since nothing has gone wrong yet', tier: 'wrong', why: 'An overly broad standing grant is a real risk on its own — "nothing has happened yet" doesn\'t mean the exposure isn\'t real.' },
            { id: 'b', label: 'Audit the legitimate use case, then scope the trust policy and permissions to match', tier: 'best', why: 'Directly closes the gap between what\'s actually needed and what\'s currently granted, based on real, confirmed requirements rather than assumption.' },
            { id: 'c', label: 'Delete the cross-account role entirely without further investigation', tier: 'defensible', why: 'Removes the risk, but could break a genuine, legitimate cross-account workflow that was never actually investigated first.' }
          ],
          justificationPatterns: [/audit.*(use\s*case|legitimate)|scope.*(trust|permission)/i]
        },
        {
          mode: 'read_the_room',
          prompt: 'A giant\'s memory fades from a gap in its own record. <strong>An incident investigation discovers that a specific critical API\'s activity was never captured by CloudTrail. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 28, damageIfOptimal: 46, timeAllotted: 32,
          hintNudge: 'Not every API activity is covered by a standard "management events" trail by default — check whether this specific API needs data-events logging enabled separately.',
          hintPartial: 'This API\'s activity falls under data events (e.g. S3 object-level operations), which aren\'t captured by a standard trail\'s default management-events-only configuration — it needs to be explicitly enabled.',
          hintFull: 'Diagnosis: the trail only captures management events by default, and this API\'s activity falls under data events, which need separate, explicit configuration. Fix: enable data-event logging for the specific resource/API that needs coverage.',
          outputBlock: [
            '$ (CloudTrail trail config) EventSelectors: [ManagementEvents only]',
            '(the incident involves S3 object-level GetObject calls — a data event, not captured)'
          ],
          acceptableDiagnosesPatterns: [/data\s*event/i, /not\s*captured.*(default|management)/i],
          followUpFix: {
            prompt: 'Fix it by enabling data-event logging for the relevant resource:',
            acceptablePatterns: [],
            optimalPatterns: [/data\s*event/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A giant\'s wallet drains from a forgotten mouth. <strong>An idle load balancer that no longer routes to any real traffic has been silently accruing cost for months. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 28, damageIfOptimal: 46, timeAllotted: 32,
          hintNudge: 'Resources like load balancers keep costing money even with zero real traffic — the underlying app was likely decommissioned without cleaning up everything that pointed at it.',
          hintPartial: 'The application this load balancer served was decommissioned, but the load balancer itself (and likely its target group/DNS record) was never cleaned up — it just kept accruing cost with nothing real behind it.',
          hintFull: 'Diagnosis: an orphaned resource from a decommissioned application was never cleaned up. Fix: confirm it\'s genuinely unused (check access logs/metrics for zero real traffic), then delete it, and add a decommissioning checklist so this doesn\'t recur.',
          outputBlock: [
            '$ (load balancer access logs, last 90 days) 0 requests',
            '$ (billing) this load balancer: ~$18/month for 6 months'
          ],
          acceptableDiagnosesPatterns: [/orphaned|forgotten|decommission.*(never|not)\s*cleaned/i],
          followUpFix: {
            prompt: 'Fix it by confirming it\'s unused, then removing it:',
            acceptablePatterns: [],
            optimalPatterns: [/confirm.*(unused|zero\s*traffic)|delete/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A giant discovers its own reflection has drifted. <strong>A CloudFormation stack shows drift — real infrastructure no longer matches what the template declares. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 28, damageIfOptimal: 46, timeAllotted: 32,
          hintNudge: 'Drift means someone (or something) changed the real infrastructure OUTSIDE of the IaC tool — a manual console change is the most common cause.',
          hintPartial: 'Someone made a manual change directly in the console (or via CLI) outside of the CloudFormation-managed workflow, so the real infrastructure diverged from what the template declares.',
          hintFull: 'Diagnosis: a manual, out-of-band change caused real infrastructure to diverge from the template. Fix: decide deliberately whether to update the template to match reality, or revert the manual change back to match the template — then reinforce that all changes should go through IaC going forward.',
          outputBlock: [
            '$ aws cloudformation detect-stack-drift-status --stack-drift-detection-id <id>',
            '(StackDriftStatus: DRIFTED)',
            '(one security group has a rule not present in the template)'
          ],
          acceptableDiagnosesPatterns: [/manual\s*(change|out-of-band)/i, /outside\s*(of\s*)?(the\s*)?(iac|cloudformation|terraform)/i],
          followUpFix: {
            prompt: 'Fix it by deliberately reconciling the drift:',
            acceptablePatterns: [],
            optimalPatterns: [/update\s*template|revert|reconcile/i]
          }
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'The Titan draws its harvest sigil. <strong>Sequence the correct order for responding to a discovered public S3 bucket.</strong>',
          steps: [
            'Confirm exactly what data the bucket actually contains',
            'Change the bucket to private immediately',
            'Audit access logs for any actual unauthorized access',
            'Rotate any credentials/secrets that may have been exposed'
          ],
          damageIfCorrect: 30, damageIfOptimal: 48, timeAllotted: 32,
          damageToHeroIfWrong: 26
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'A second sigil, drawn under pressure. <strong>Sequence the correct order for handling a hit service quota during a traffic spike.</strong>',
          steps: [
            'Confirm which specific quota was actually hit',
            'Request an emergency quota increase',
            'Monitor whether the increase resolves the capacity issue',
            'Set up proactive quota-utilization alerting afterward'
          ],
          damageIfCorrect: 30, damageIfOptimal: 48, timeAllotted: 32,
          damageToHeroIfWrong: 26
        },
        {
          mode: 'terminal',
          prompt: 'The Titan checks whether a lock actually holds: <strong>"Check the current MFA device status for the IAM user <code>admin-user</code>."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 38, timeAllotted: 32,
          hintNudge: 'iam, with a list action for MFA devices, taking the user name.',
          hintPartial: 'aws iam list-mfa-______ --user-name admin-user',
          hintFull: 'aws iam list-mfa-devices --user-name admin-user',
          acceptablePatterns: [],
          optimalPatterns: [/^aws\s+iam\s+list-mfa-devices\s+--user-name\s+admin-user$/i],
          baseCmds: ['aws']
        },
        {
          mode: 'terminal',
          prompt: 'A giant checks its own access keys for age: <strong>"List all access keys for the IAM user <code>deploy-bot</code>, including their creation date."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36, timeAllotted: 32,
          hintNudge: 'iam, with a list action for access keys, taking the user name.',
          hintPartial: 'aws iam list-access-____ --user-name deploy-bot',
          hintFull: 'aws iam list-access-keys --user-name deploy-bot',
          acceptablePatterns: [],
          optimalPatterns: [/^aws\s+iam\s+list-access-keys\s+--user-name\s+deploy-bot$/i],
          baseCmds: ['aws']
        },
        {
          mode: 'terminal',
          prompt: 'It reads a finding from the sentries themselves: <strong>"List the current active findings from GuardDuty for a given detector ID."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 38, timeAllotted: 32,
          hintNudge: 'guardduty, with a list action for findings, taking the detector ID.',
          hintPartial: 'aws guardduty list-________ --detector-id <id>',
          hintFull: 'aws guardduty list-findings --detector-id <id>',
          acceptablePatterns: [],
          optimalPatterns: [/^aws\s+guardduty\s+list-findings\s+--detector-id\s+<id>$/i],
          baseCmds: ['aws']
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A crooked key never expires, and no one notices. <strong>"This IAM access key has been active for over 3 years with no rotation policy at all. Find and fix the bug."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 40, timeAllotted: 32,
          hintNudge: 'A long-lived, never-rotated access key is a standing risk — a stale credential is more valuable to an attacker the longer it\'s been valid and unmonitored.',
          hintPartial: 'Line 1 shows no rotation policy at all for a 3-year-old key — rotate it now, and put an actual rotation policy/schedule in place going forward.',
          hintFull: 'Fix: rotate the key immediately and enforce a regular rotation schedule (e.g. every 90 days) going forward.',
          codeBlock: [
            '(access key age): 3 years, 2 months, no rotation policy configured'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/rotate.*(key|immediately)/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A crooked sentry watches with its eyes closed. <strong>"GuardDuty is enabled, but its findings are never actually reviewed or acted upon. Find and fix the bug."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 40, timeAllotted: 32,
          hintNudge: 'A detection service producing findings that nobody ever looks at provides essentially zero real security value — the gap is in the response process, not the detection itself.',
          hintPartial: 'Line 1 shows GuardDuty enabled with findings accumulating, but no process routes them anywhere for review — add real alerting/routing so findings actually reach someone who can act on them.',
          hintFull: 'Fix: route findings to an actively-monitored alerting channel (e.g. via EventBridge to a notification system), not just a dashboard nobody checks.',
          codeBlock: [
            '(GuardDuty status): enabled, 47 unreviewed findings, no alert routing configured'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/route.*alert|alerting\s*channel|eventbridge/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A crooked root account still wears its crown daily. <strong>"The AWS account\'s root user is being used for routine daily operations, instead of individual IAM users/roles. Find and fix the bug."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 40, timeAllotted: 32,
          hintNudge: 'The root user has unrestricted access to everything and should essentially never be used for routine tasks — individual IAM identities with scoped permissions are what routine work should use.',
          hintPartial: 'Line 1 shows daily root-user activity — root should be reserved for the small handful of tasks that genuinely require it, with everything else done via individual IAM users/roles with scoped permissions.',
          hintFull: 'Fix: stop using root for routine work; create individual IAM users/roles with least-privilege permissions for daily operations, and secure root with MFA, reserved only for genuinely root-only tasks.',
          codeBlock: [
            '(CloudTrail) root user API calls: 40+ per day, ongoing'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/stop\s*using\s*root|individual\s*iam\s*(users|roles)/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The Titan watches its own guards fail to raise an alarm: <strong>"GuardDuty flags a genuinely suspicious API call pattern from an IAM user\'s credentials. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 28, damageIfOptimal: 44, timeAllotted: 32,
          hintNudge: 'Until you\'ve confirmed otherwise, a credential behind a genuinely suspicious pattern should be treated as potentially compromised — the same instinct as an exposed secret.',
          hintPartial: 'Treat the credential as potentially compromised immediately (disable/rotate it) while investigating, rather than waiting for certainty first — the cost of a false alarm (a brief access interruption) is far lower than the cost of a real, ongoing compromise.',
          hintFull: 'Best: immediately disable or rotate the credential while investigating further — treating a genuinely suspicious pattern as potentially compromised until proven otherwise is the safer default; the cost of a false alarm is minor compared to letting a real compromise continue.',
          options: [
            { id: 'a', label: 'Immediately disable/rotate the credential, then investigate', tier: 'best', why: 'Contains potential damage immediately, since the cost of being wrong (a brief, addressable access interruption) is far lower than letting a real compromise continue during investigation.' },
            { id: 'b', label: 'Wait for the investigation to fully confirm compromise before acting', tier: 'wrong', why: 'Leaves a possibly-compromised credential active for the entire investigation window — a real, avoidable risk if the finding turns out to be genuine.' },
            { id: 'c', label: 'Dismiss it as a likely false positive without any investigation', tier: 'wrong', why: 'GuardDuty findings are specifically flagged as suspicious for a reason — dismissing without any investigation risks ignoring a real, active compromise.' }
          ],
          justificationPatterns: [/immediately\s*(disable|rotate)|contain|potentially\s*compromised/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"An engineer accidentally deletes a production resource that has no recent backup. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 28, damageIfOptimal: 44, timeAllotted: 32,
          hintNudge: 'The immediate priority is understanding exactly what recovery options genuinely exist (versioning, point-in-time recovery, replicas) before assuming total, unrecoverable loss.',
          hintPartial: 'Immediately check every actual recovery avenue available for that specific resource type (versioning, point-in-time recovery, a read replica, a recent manual snapshot) before assuming the data is entirely and permanently lost.',
          hintFull: 'Best: immediately investigate every genuine recovery avenue specific to that resource type — many AWS services have some form of point-in-time recovery, versioning, or replica that isn\'t obvious as "a backup" but can still recover the data; don\'t assume total loss until those are actually ruled out.',
          options: [
            { id: 'a', label: 'Immediately investigate every actual recovery avenue for that specific resource type', tier: 'best', why: 'Many resource types have a non-obvious recovery mechanism (point-in-time recovery, replicas, versioning) that isn\'t "a backup" in the traditional sense — worth ruling out before assuming total loss.' },
            { id: 'b', label: 'Immediately announce the data is permanently lost', tier: 'wrong', why: 'Premature — several AWS services offer recovery mechanisms beyond traditional backups that should be checked first.' },
            { id: 'c', label: 'Focus only on disciplining the engineer who made the mistake', tier: 'wrong', why: 'Doesn\'t address the actual incident at all, and the real fix (better safeguards) is a process/tooling gap, not an individual failing.' }
          ],
          justificationPatterns: [/recovery\s*(avenue|mechanism|option)|point-in-time|before\s*assuming/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"A previously-terminated employee\'s IAM credentials are discovered still active a week after their last day. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 28, damageIfOptimal: 44, timeAllotted: 32,
          hintNudge: 'The immediate action addresses this specific standing risk; the real fix is making sure offboarding always includes credential deactivation, not relying on someone remembering.',
          hintPartial: 'Immediately deactivate the credentials, audit for any activity during that week-long gap, and fix the offboarding PROCESS so credential deactivation is a mandatory, automated step, not something that depends on someone remembering.',
          hintFull: 'Best: deactivate the credentials immediately, audit for any actual activity during the gap window, and fix the underlying offboarding process (ideally automating credential deactivation as part of HR offboarding) so this specific gap can\'t recur.',
          options: [
            { id: 'a', label: 'Deactivate the credentials immediately, audit for activity, then fix the offboarding process', tier: 'best', why: 'Addresses the immediate standing risk, checks for actual damage during the gap, and closes the process gap that let it happen in the first place.' },
            { id: 'b', label: 'Deactivate the credentials, and consider the incident closed', tier: 'defensible', why: 'Addresses the immediate risk, but leaves the underlying offboarding process gap unfixed — the same failure could recur with the next departure.' },
            { id: 'c', label: 'Leave it, since the employee probably isn\'t using it anymore', tier: 'wrong', why: 'A real, avoidable standing security risk left unaddressed on an unverified assumption about the former employee\'s behavior.' }
          ],
          justificationPatterns: [/deactivate\s*immediately|fix.*offboarding\s*process|automat.*offboarding/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"A production incident requires emergency infrastructure changes right now, but the on-call engineer\'s IAM permissions don\'t cover the needed action. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 28, damageIfOptimal: 44, timeAllotted: 32,
          hintNudge: 'A logged, temporary, break-glass elevation process preserves accountability while still moving fast — a permanent broad permission grant made in the moment tends to just... stay, unreviewed.',
          hintPartial: 'Use a defined break-glass process for temporary, logged permission elevation during genuine emergencies — this is meaningfully different from either doing nothing or permanently widening the engineer\'s standing permissions in the heat of the moment.',
          hintFull: 'Best: use (or, if none exists, treat this incident as the reason to build) a break-glass process — temporary, explicitly logged permission elevation for the duration of the emergency, which is automatically revoked afterward — rather than either blocking on the incident or permanently widening standing permissions that tend to just stay in place unreviewed.',
          options: [
            { id: 'a', label: 'Permanently grant the engineer the broader permissions right now, to move fast', tier: 'wrong', why: 'A permission grant made under incident pressure tends to just remain in place afterward, unreviewed — a real, quietly-accumulating scope-creep risk.' },
            { id: 'b', label: 'Use a break-glass process for temporary, logged elevation during the emergency', tier: 'best', why: 'Moves as fast as the incident needs while keeping the elevation temporary, logged, and automatically reverted — preserving accountability without a permanent standing grant.' },
            { id: 'c', label: 'Block on getting normal permission-change approval through the standard process', tier: 'wrong', why: 'The standard process\'s normal timeline doesn\'t match a genuine active production emergency — this is exactly the scenario a break-glass process exists for.' }
          ],
          justificationPatterns: [/break-glass|temporary.*(elevat|logged)|automatically\s*revoked/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"A vendor with third-party access to your AWS account (via a cross-account role) is reported to have had their OWN systems compromised. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 28, damageIfOptimal: 44, timeAllotted: 32,
          hintNudge: 'If the vendor themselves is compromised, any standing access they hold into your account is now a real, active risk — regardless of whether anything has happened in YOUR account yet.',
          hintPartial: 'Immediately revoke or restrict the vendor\'s cross-account access (their compromise makes any standing trust relationship a live risk to you), then audit CloudTrail for any activity from their role during the relevant window, before deciding whether/how to restore access.',
          hintFull: 'Best: immediately revoke or tightly restrict the vendor\'s cross-account role, since their compromise makes ANY standing trust into your account a real, active risk regardless of activity seen so far — then audit CloudTrail for actual activity from that role, and only restore access after confirming with the vendor that their compromise is fully resolved.',
          options: [
            { id: 'a', label: 'Immediately revoke/restrict the vendor\'s cross-account access, then audit and reassess', tier: 'best', why: 'Treats the vendor\'s compromise as an immediate, active risk to your own account\'s standing trust relationship, rather than waiting for evidence of actual misuse first.' },
            { id: 'b', label: 'Wait to see if any suspicious activity actually appears from their role', tier: 'wrong', why: 'Leaves a standing trust relationship active into a known-compromised third party for the entire waiting period — a real, avoidable window of risk.' },
            { id: 'c', label: 'Do nothing since the compromise was on the vendor\'s systems, not yours', tier: 'wrong', why: 'Ignores that the vendor\'s cross-account role IS a standing access path into your own account — their compromise is directly relevant to your own security posture.' }
          ],
          justificationPatterns: [/revoke|restrict.*(vendor|cross-account)|standing\s*trust/i]
        },
        {
          mode: 'read_the_room',
          prompt: 'A giant\'s crown sits unguarded on its own head. <strong>An audit discovers the AWS account\'s root user has no MFA configured at all. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 30, damageIfOptimal: 48, timeAllotted: 32,
          hintNudge: 'The root user has unrestricted access to literally everything in the account — leaving it protected by only a password is a real, high-severity standing risk.',
          hintPartial: 'The root user, which has unrestricted access to the entire account, is protected by password alone — a genuinely high-severity gap given what root access can do if that single credential is ever compromised.',
          hintFull: 'Diagnosis: the root user lacks MFA, a high-severity gap given its unrestricted account-wide access. Fix: enable MFA (ideally hardware or a dedicated authenticator app) on the root user immediately, and ensure root credentials are locked away and used only for genuinely root-only tasks going forward.',
          outputBlock: [
            '$ aws iam get-account-summary',
            '(AccountMFAEnabled: 0)'
          ],
          acceptableDiagnosesPatterns: [/root.*(no\s*mfa|missing\s*mfa)/i, /unprotected\s*root/i],
          followUpFix: {
            prompt: 'Fix it by enabling MFA on the root user immediately:',
            acceptablePatterns: [],
            optimalPatterns: [/enable\s*mfa|mfa.*root/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A giant\'s watchtower stands, but no one climbs it. <strong>An incident postmortem reveals that CloudWatch alarms existed for the failure that occurred, but nobody was actually subscribed to receive them. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 30, damageIfOptimal: 48, timeAllotted: 32,
          hintNudge: 'An alarm that fires into an SNS topic with no subscribers is functionally silent — the detection existed, but the notification path to a human was never actually completed.',
          hintPartial: 'The alarm was correctly configured and DID fire, but its notification target (e.g. an SNS topic) had no actual subscribers — the detection worked, but nothing ever reached a person who could act on it.',
          hintFull: 'Diagnosis: the alarm fired correctly, but its notification target had no subscribers, so nobody was ever actually notified. Fix: add real, verified subscribers (on-call rotation, paging system) to the alarm\'s notification target, and audit other alarms for the same gap.',
          outputBlock: [
            '$ aws cloudwatch describe-alarms --alarm-names disk-space-critical',
            '(StateValue: ALARM, fired 6 hours before the incident)',
            '$ aws sns list-subscriptions-by-topic --topic-arn <arn>',
            '(0 subscriptions)'
          ],
          acceptableDiagnosesPatterns: [/no\s*subscribers/i, /nobody\s*(notified|received)/i],
          followUpFix: {
            prompt: 'Fix it by adding real subscribers and auditing other alarms for the same gap:',
            acceptablePatterns: [],
            optimalPatterns: [/add\s*subscri|audit.*other\s*alarms/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A giant\'s trusted friend turns out to be a stranger in disguise. <strong>A cross-account role trusted by your account turns out to have a trust policy that doesn\'t actually restrict which external account can assume it. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 30, damageIfOptimal: 48, timeAllotted: 32,
          hintNudge: 'Check the trust policy\'s Principal field — an overly permissive or wildcarded principal means far more than the intended specific external account can assume this role.',
          hintPartial: 'The role\'s trust policy Principal is set too broadly (or wildcarded), meaning any AWS account (not just the intended specific partner account) could potentially assume this role.',
          hintFull: 'Diagnosis: the role\'s trust policy doesn\'t restrict the Principal to the specific intended external account. Fix: scope the trust policy\'s Principal to the exact intended account ID, and add an external ID condition for defense-in-depth against confused-deputy scenarios.',
          outputBlock: [
            '$ aws iam get-role --role-name partner-access-role',
            '(AssumeRolePolicyDocument Principal: {"AWS": "*"})'
          ],
          acceptableDiagnosesPatterns: [/trust\s*policy.*(too\s*broad|wildcard)/i, /principal.*not\s*restrict/i],
          followUpFix: {
            prompt: 'Fix it by scoping the trust policy to the specific intended account:',
            acceptablePatterns: [],
            optimalPatterns: [/specific\s*account|external\s*id/i]
          }
        }
      ]
    },
    {
      name: 'Level 5 — Interview-Caliber Judgment',
      hp: 200,
      questions: [
        {
          mode: 'terminal',
          prompt: 'The Titan audits its own network boundary in full: <strong>"Check whether an S3 bucket\'s account-level Block Public Access setting is actually enabled."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40,
          hintNudge: 's3control has a dedicated call for the account-level public access block configuration.',
          hintPartial: 'aws s3control get-public-access-____ --account-id <id>',
          hintFull: 'aws s3control get-public-access-block --account-id <id>',
          acceptablePatterns: [],
          optimalPatterns: [/^aws\s+s3control\s+get-public-access-block\s+--account-id\s+<id>$/i],
          baseCmds: ['aws']
        },
        {
          mode: 'terminal',
          prompt: 'It reads the org\'s own guardrails: <strong>"List every Service Control Policy (SCP) attached to an AWS Organizations account."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40,
          hintNudge: 'organizations, with a list action for policies attached to a specific target.',
          hintPartial: 'aws organizations list-policies-for-target --target-id <id> --filter ____',
          hintFull: 'aws organizations list-policies-for-target --target-id <id> --filter SERVICE_CONTROL_POLICY',
          acceptablePatterns: [],
          optimalPatterns: [/^aws\s+organizations\s+list-policies-for-target\s+--target-id\s+<id>\s+--filter\s+SERVICE_CONTROL_POLICY$/i],
          baseCmds: ['aws']
        },
        {
          mode: 'spot_the_bug',
          prompt: 'The Titan reveals a scaling knob frozen solid: <strong>"This resource count is frozen in the code — nobody can safely change it without editing the file itself. Find and fix the bug."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 42,
          hintNudge: 'This number is frozen in the code — nobody can safely change it without editing the file itself.',
          hintPartial: 'Reference a variable instead of a hardcoded number.',
          hintFull: 'Fix: count = var.instance_count',
          codeBlock: [
            'count = 3'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/^count\s*=\s*var\.instance_count$/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The Titan looms over a fork in the cloud: <strong>"Choosing between a single-cloud strategy and a genuine multi-cloud strategy for a growing platform. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 44,
          hintNudge: 'Genuine multi-cloud (workloads that can actually run on either provider) adds REAL, ongoing engineering complexity — the question is whether the specific benefit (avoiding vendor lock-in, provider-outage resilience) justifies that cost for THIS platform.',
          hintPartial: 'Default to single-cloud unless there\'s a specific, concrete driver (regulatory requirement, genuine provider-outage resilience need, or real negotiating leverage) — genuine multi-cloud portability is a substantial, ongoing engineering cost that most platforms don\'t actually need to pay.',
          hintFull: 'Best (as a default): single-cloud, going multi-cloud only when there\'s a specific, concrete reason (regulatory, contractual, or a genuine need to survive a whole-provider outage) — true multi-cloud portability is a real, ongoing engineering tax that most platforms don\'t get enough benefit from to justify paying.',
          options: [
            { id: 'a', label: 'Single-cloud by default, unless a specific concrete need justifies otherwise', tier: 'best', why: 'Avoids paying the real, ongoing engineering cost of genuine multi-cloud portability unless a specific, concrete driver actually requires it.' },
            { id: 'b', label: 'Always multi-cloud, to avoid vendor lock-in in general', tier: 'wrong', why: 'Pays a real, substantial, ongoing engineering cost for a benefit ("avoiding lock-in") that\'s often more theoretical than an active, current need.' },
            { id: 'c', label: 'It never matters which — treat the choice as purely cosmetic', tier: 'wrong', why: 'A real, meaningful architectural decision with genuine cost and benefit tradeoffs, not a cosmetic one.' }
          ],
          justificationPatterns: [/single-cloud|specific\s*(need|driver)|engineering\s*(cost|tax)/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"Deciding between serverless (e.g. Lambda), containers, and traditional VMs for a new, moderately-trafficked API service. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 44,
          hintNudge: 'Each has genuinely different tradeoffs (cold starts, operational overhead, cost model, control) — the right answer depends on the SPECIFIC service\'s traffic pattern and team\'s operational maturity, not a universal default.',
          hintPartial: 'Match the choice to actual traffic pattern and operational needs: serverless suits spiky/low-baseline traffic with minimal ops burden; containers suit moderate, steady traffic needing more control with manageable ops overhead; VMs suit workloads needing the most control or specific OS-level requirements.',
          hintFull: 'Best: there\'s no universal answer — match it to the service\'s actual traffic pattern and the team\'s operational capacity. Serverless minimizes ops burden and suits spiky/low-baseline traffic but has cold-start and execution-limit tradeoffs; containers offer a good balance of control and manageable operations for steady moderate traffic; VMs make sense when you need the most control or specific OS-level requirements neither of the others support well.',
          options: [
            { id: 'a', label: 'Always serverless, since it minimizes operational overhead universally', tier: 'wrong', why: 'Serverless has real tradeoffs (cold starts, execution time limits, cost at sustained high volume) that make it a poor universal default regardless of the specific service\'s traffic pattern.' },
            { id: 'b', label: 'Match the choice to the specific traffic pattern and team\'s operational capacity', tier: 'best', why: 'Each option has genuinely different tradeoffs — the right choice depends on this specific service\'s actual needs, not a one-size-fits-all rule.' },
            { id: 'c', label: 'Always traditional VMs, for maximum consistency and control', tier: 'wrong', why: 'Takes on the most operational overhead (patching, scaling, provisioning) by default, even when a service\'s actual needs don\'t require that level of control.' }
          ],
          justificationPatterns: [/match.*(traffic|need)|depends\s*on|no\s*universal/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"An entire AWS region the platform depends on is experiencing a major outage. Deciding how to respond. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 44,
          hintNudge: 'The right response depends heavily on whether a genuine multi-region failover capability was actually built and tested BEFORE this moment — that\'s not something you can build reliably mid-incident.',
          hintPartial: 'If a tested multi-region failover exists, execute it now; if it doesn\'t, attempting to build one live, mid-outage, is far riskier than communicating honest status and waiting for the provider\'s region to recover — this decision was really made (or not made) long before the incident.',
          hintFull: 'Best: if a genuinely tested failover to another region exists, execute it now; if it doesn\'t, don\'t attempt to build one live during the incident — the real decision point was whether to invest in tested multi-region failover BEFORE this happened. Mid-incident, communicate honest status and wait for the region to recover rather than risking an untested, improvised failover.',
          options: [
            { id: 'a', label: 'Execute a pre-built, tested failover to another region if one exists', tier: 'best', why: 'The only reliable option during an active outage — a genuinely tested failover, prepared before the incident, rather than anything improvised mid-crisis.' },
            { id: 'b', label: 'Attempt to build a failover to another region for the first time, live, during the outage', tier: 'wrong', why: 'Building and testing a genuine failover mechanism for the first time under live incident pressure is far riskier than it sounds — untested failover attempts can make things worse.' },
            { id: 'c', label: 'Wait for the region to recover, communicating honest status, if no tested failover exists', tier: 'defensible', why: 'A reasonable response given no pre-built failover exists, though it reflects a real gap in disaster-recovery preparation that should be addressed afterward.' }
          ],
          justificationPatterns: [/tested\s*failover|pre-built|prepared\s*before/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"Deciding how much of the AWS Well-Architected Framework\'s pillars to actively invest in for a small, early-stage startup\'s platform. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 44,
          hintNudge: 'Fully implementing every pillar (reliability, security, cost, performance, operational excellence, sustainability) to enterprise depth is a real investment that may not match an early-stage startup\'s actual priorities and resources yet.',
          hintPartial: 'Prioritize the pillars with the highest current real risk (typically security fundamentals and basic reliability) over deep investment in every pillar equally — an early-stage startup genuinely has different priorities than a mature enterprise platform.',
          hintFull: 'Best: prioritize based on actual current risk and stage — security fundamentals (no public S3 buckets, scoped IAM) and basic reliability (backups, some redundancy) usually matter most early on; deeper investment in cost optimization or operational excellence can reasonably follow as the platform and team mature, rather than trying to fully implement every pillar to enterprise depth immediately.',
          options: [
            { id: 'a', label: 'Fully implement every pillar to the same enterprise-grade depth immediately', tier: 'wrong', why: 'A real, substantial investment that may not match an early-stage startup\'s actual current risk profile or available resources — not every pillar carries equal urgency at every stage.' },
            { id: 'b', label: 'Prioritize the pillars with the highest current real risk for this stage', tier: 'best', why: 'Matches investment to actual current risk and resources — security fundamentals and basic reliability typically matter most early, with deeper investment elsewhere following as the platform matures.' },
            { id: 'c', label: 'Ignore the framework entirely until the company is much larger', tier: 'wrong', why: 'Leaves real, foundational risks (like security fundamentals) unaddressed for longer than necessary — some baseline investment is warranted even early on.' }
          ],
          justificationPatterns: [/prioritiz|current\s*(risk|stage)|security\s*fundamentals/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"Deciding on tagging/governance enforcement: purely voluntary tagging guidelines vs. automated policy enforcement that blocks non-compliant resource creation. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 44,
          hintNudge: 'Voluntary guidelines rely on every engineer remembering every time — automated enforcement (e.g. a policy that blocks creation without required tags) removes that dependence on memory entirely.',
          hintPartial: 'Automated enforcement (blocking non-compliant resource creation via policy) guarantees compliance structurally — voluntary guidelines depend on every single engineer remembering every single time, which reliably erodes at scale.',
          hintFull: 'Best: automated policy enforcement for anything that genuinely matters (like cost-allocation tags) — voluntary guidelines predictably erode as an organization scales and more people create resources, while structural enforcement doesn\'t depend on anyone remembering.',
          options: [
            { id: 'a', label: 'Voluntary tagging guidelines, trusting engineers to follow them', tier: 'wrong', why: 'Reliably erodes at scale — depending on every engineer remembering a guideline every single time is not a durable compliance strategy.' },
            { id: 'b', label: 'Automated policy enforcement that blocks non-compliant resource creation', tier: 'best', why: 'Guarantees compliance structurally rather than depending on individual memory, which is what actually holds up as an organization and its resource count grow.' },
            { id: 'c', label: 'No tagging policy of any kind — handle cost attribution manually later if needed', tier: 'wrong', why: 'Guarantees a much harder retroactive cleanup project later, when proactive enforcement would have prevented the gap entirely.' }
          ],
          justificationPatterns: [/automated\s*(policy\s*)?enforc|structural|blocks?\s*(non-compliant|creation)/i]
        },
        {
          mode: 'read_the_room',
          prompt: 'A giant\'s many hands lose track of each other. <strong>Two automated processes in different accounts both modify the same shared resource, causing intermittent, hard-to-reproduce configuration conflicts. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 28, damageIfOptimal: 48,
          hintNudge: 'Two independent automated processes both writing to the same shared target, with no coordination between them, is a structural conflict — not a bug in either process individually.',
          hintPartial: 'Two independent, uncoordinated automation processes are both modifying the same shared resource — the fix isn\'t in either process alone, but in establishing a single owner (or explicit coordination) for that shared resource.',
          hintFull: 'Diagnosis: two independent automated processes lack any coordination and both write to the same shared resource, causing intermittent conflicts. Fix: establish a single clear owner/source-of-truth for that resource (one process, or an explicit locking/coordination mechanism between them) rather than two independent writers.',
          outputBlock: [
            '$ (config history for the shared resource) alternating changes from two different automation pipelines',
            '(neither pipeline is aware the other one exists)'
          ],
          acceptableDiagnosesPatterns: [/two\s*(processes|pipelines).*(uncoordinated|conflict)/i, /shared\s*resource.*no\s*coordination/i],
          followUpFix: {
            prompt: 'Fix it by establishing a single owner for the shared resource:',
            acceptablePatterns: [],
            optimalPatterns: [/single\s*owner|source\s*of\s*truth|coordinat/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A giant\'s treasury bleeds from a wound no one is watching. <strong>A company-wide cost review reveals that dozens of small, forgotten resources across many teams collectively account for a large, unexplained chunk of the bill. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 28, damageIfOptimal: 48,
          hintNudge: 'No single resource is individually alarming, but many small, un-tracked, forgotten resources accumulating across an organization is a governance/visibility gap, not any one team\'s specific mistake.',
          hintPartial: 'This is a systemic cost-governance gap — without consistent tagging and centralized visibility, small forgotten resources across many teams accumulate invisibly, since no single one is large enough to trigger attention on its own.',
          hintFull: 'Diagnosis: a lack of consistent tagging and centralized cost visibility let many small, individually-unremarkable resources accumulate into a real, unaddressed cost across the organization. Fix: enforce consistent tagging (ideally via automated policy), set up centralized cost dashboards broken down by owner, and establish a recurring review process to catch this class of drift going forward.',
          outputBlock: [
            '$ (cost breakdown) 340 individually small resources, untagged, totaling $12,000/month',
            '(no single resource is more than $50/month; no one owns tracking them collectively)'
          ],
          acceptableDiagnosesPatterns: [/tagging.*(gap|missing|inconsistent)/i, /governance\s*gap/i, /no\s*centralized\s*(visibility|tracking)/i],
          followUpFix: {
            prompt: 'Fix it by enforcing consistent tagging and centralized visibility going forward:',
            acceptablePatterns: [],
            optimalPatterns: [/tagging\s*polic|centralized\s*(cost\s*)?dashboard|recurring\s*review/i]
          }
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'The Titan draws its final, patient sigil. <strong>Sequence the correct order for designing a multi-region disaster recovery strategy for a critical platform.</strong>',
          steps: [
            'Define the actual recovery time and recovery point objectives needed',
            'Choose a DR pattern (cold/warm/hot standby) matching those objectives',
            'Implement cross-region replication for data and infrastructure',
            'Test the actual failover process, not just its configuration',
            'Document the runbook and repeat testing on a regular cadence'
          ],
          damageIfCorrect: 30, damageIfOptimal: 50,
          damageToHeroIfWrong: 28
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'The last sigil closes the circle. <strong>Sequence the correct order for rolling out automated cost-governance policy across an organization.</strong>',
          steps: [
            'Establish a required tagging standard',
            'Enforce it via automated policy that blocks non-compliant resource creation',
            'Set up centralized cost dashboards broken down by owner/tag',
            'Establish a recurring cost review cadence',
            'Continuously refine policy based on what the reviews actually find'
          ],
          damageIfCorrect: 30, damageIfOptimal: 50,
          damageToHeroIfWrong: 28
        },
        {
          mode: 'terminal',
          prompt: 'The Titan audits its own organization\'s edges: <strong>"List every account belonging to this AWS Organization."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40,
          hintNudge: 'organizations, with a list action for accounts.',
          hintPartial: 'aws organizations list-________',
          hintFull: 'aws organizations list-accounts',
          acceptablePatterns: [],
          optimalPatterns: [/^aws\s+organizations\s+list-accounts$/i],
          baseCmds: ['aws']
        },
        {
          mode: 'terminal',
          prompt: 'It checks whether the config recorder itself is even watching: <strong>"Check whether AWS Config is actively recording resource changes in this region."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40,
          hintNudge: 'configservice, with a describe action for configuration-recorder status.',
          hintPartial: 'aws configservice describe-configuration-recorder-______',
          hintFull: 'aws configservice describe-configuration-recorder-status',
          acceptablePatterns: [],
          optimalPatterns: [/^aws\s+configservice\s+describe-configuration-recorder-status$/i],
          baseCmds: ['aws']
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A crooked guardrail was written, then quietly forgotten. <strong>"This Service Control Policy was meant to block a risky action org-wide, but it\'s only attached to one account, not the whole organization. Find and fix the bug."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 42,
          hintNudge: 'An SCP has to actually be attached at the right level (root, OU, or account) to apply where it was intended — check whether it\'s attached broadly enough for its stated goal.',
          hintPartial: 'Line 1 attaches the SCP to a single account, but the stated goal is an org-wide restriction — it needs to be attached at the Organization root (or the relevant OU covering every account) instead.',
          hintFull: 'Fix: attach the SCP at the Organization root level so it applies to every account.',
          codeBlock: [
            '(SCP attachment): attached to account 111122223333 only'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/attach.*(organization\s*root|root\s*level)/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A crooked recorder watches only half the room. <strong>"AWS Config is enabled, but it\'s only recording changes for EC2 instances, missing every other resource type. Find and fix the bug."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 42,
          hintNudge: 'A configuration recorder scoped to only specific resource types misses everything outside that scope — check whether "all resource types" is actually being recorded.',
          hintPartial: 'Line 1 scopes the recorder to only EC2 instances — for full coverage, it should record all supported resource types, not a narrow subset.',
          hintFull: 'Fix: set allSupported = true in the recording group configuration.',
          codeBlock: [
            'recordingGroup = { resourceTypes: ["AWS::EC2::Instance"] }'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/allSupported\s*=\s*true|all\s*supported\s*resource\s*types/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The Titan looms over the boundary of trust itself: <strong>"Deciding how to structure permission boundaries so a developer can create IAM roles for their own team\'s Lambda functions, without being able to grant themselves broader access. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 28, damageIfOptimal: 46,
          hintNudge: 'A permissions boundary caps the MAXIMUM permissions any role the developer creates can ever have, regardless of what policy they attach to it — this is structurally different from just trusting them not to over-grant.',
          hintPartial: 'Apply an IAM permissions boundary to any role the developer can create, capping its maximum possible permissions structurally — this lets them create roles for legitimate work while making privilege escalation via role creation actually impossible, not just against policy.',
          hintFull: 'Best: use IAM permissions boundaries on any role the developer is allowed to create — this structurally caps what that role could ever do, regardless of what policy gets attached to it, closing the specific privilege-escalation path of "create a role with broader permissions than I have."',
          options: [
            { id: 'a', label: 'Trust developers not to over-grant permissions when creating roles', tier: 'wrong', why: 'Relies on discipline rather than a structural control — a developer (or a mistake, or a compromised account) could create a role with far broader access than intended.' },
            { id: 'b', label: 'Apply IAM permissions boundaries capping what any role they create can ever have', tier: 'best', why: 'Structurally closes the privilege-escalation path regardless of what policy gets attached — genuinely different from relying on developers simply not over-granting.' },
            { id: 'c', label: 'Don\'t let developers create IAM roles at all — require a central team for every role', tier: 'defensible', why: 'Closes the risk, but creates real friction and a bottleneck for legitimate, routine work that a permissions boundary would have allowed safely.' }
          ],
          justificationPatterns: [/permissions?\s*boundary|structural(ly)?\s*cap/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"Deciding how to handle a compliance requirement to prove exactly which resources existed at a specific point in time, weeks after the fact. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 28, damageIfOptimal: 46,
          hintNudge: 'Answering "what did the account look like at time X" retroactively requires a HISTORICAL configuration record — CloudTrail alone shows API calls, not necessarily a clean point-in-time resource inventory.',
          hintPartial: 'Use AWS Config\'s configuration history/timeline feature, which specifically tracks resource configuration state over time — this is what actually answers "what existed and how was it configured at a specific past moment," which CloudTrail\'s event log alone doesn\'t directly reconstruct.',
          hintFull: 'Best: rely on AWS Config\'s configuration history — it\'s purpose-built to answer exactly this "what did the account look like at time X" question, unlike CloudTrail (which logs discrete API calls) or manual documentation (which is only as good as whether anyone remembered to keep it current).',
          options: [
            { id: 'a', label: 'Reconstruct it manually from documentation/tickets', tier: 'wrong', why: 'Only as reliable as whether documentation was actually kept perfectly current — a real, common gap for exactly this kind of retroactive question.' },
            { id: 'b', label: 'Use AWS Config\'s configuration history for that point in time', tier: 'best', why: 'Purpose-built to answer exactly this question — a historical, queryable record of resource configuration state, not something that needs manual reconstruction.' },
            { id: 'c', label: 'Rely solely on CloudTrail\'s event log', tier: 'defensible', why: 'CloudTrail shows discrete API calls, but reconstructing a clean full point-in-time resource inventory from raw events is far more work than Config\'s purpose-built history.' }
          ],
          justificationPatterns: [/aws\s*config|configuration\s*history|point-in-time/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"An organization is deciding how much control to centralize for security guardrails (SCPs) vs. leave to individual account owners. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 28, damageIfOptimal: 46,
          hintNudge: 'The same "centralize what creates real organizational risk, leave the rest flexible" principle applies here as it does to reusable CI/CD workflows or protection rules — not every decision needs the same level of centralization.',
          hintPartial: 'Centralize SCPs for things that create real organization-wide risk if inconsistent (disabling CloudTrail, leaving root without MFA, allowing regions outside compliance scope), while leaving account-specific operational decisions to individual owners.',
          hintFull: 'Best: centrally enforce guardrails for genuinely organization-wide risks (preventing CloudTrail from being disabled, requiring root MFA, restricting to approved regions) via SCPs at the OU/root level, while leaving account-specific operational choices (which services to use, resource sizing) to individual account owners — full centralization is too rigid, and full autonomy risks inconsistent security posture.',
          options: [
            { id: 'a', label: 'Centralize every possible decision via SCPs, leaving accounts no autonomy', tier: 'wrong', why: 'Overly rigid — account owners lose reasonable autonomy over decisions that don\'t actually create organization-wide risk.' },
            { id: 'b', label: 'Centralize guardrails for genuine org-wide risks, leave the rest to account owners', tier: 'best', why: 'Matches centralization to where inconsistency actually creates real organizational risk, while respecting that most operational decisions don\'t need to be centrally dictated.' },
            { id: 'c', label: 'Leave every security decision to individual account owners, with no SCPs at all', tier: 'wrong', why: 'Risks inconsistent security posture across the organization for exactly the kinds of things (disabling logging, no root MFA) that a genuine incident in ANY account can affect everyone\'s trust in the platform.' }
          ],
          justificationPatterns: [/centraliz.*(guardrail|risk)|org-wide\s*risk/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"Deciding how to respond to a critical CVE just announced in a base container image used across dozens of services\' deployments. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 28, damageIfOptimal: 46,
          hintNudge: 'Fixing this service-by-service, independently, duplicates the same investigation dozens of times with inconsistent timing — the same coordinated-response principle that applies to a compromised CI action or vulnerable library.',
          hintPartial: 'Centrally identify every service using the vulnerable base image, assess actual exploitability, then coordinate a single tracked remediation (rebuild and redeploy from a patched base image) across all of them — not dozens of independent, uncoordinated fixes.',
          hintFull: 'Best: centrally identify every service built from the vulnerable base image (via image registry scanning/inventory), assess actual exploitability, then coordinate a single, tracked remediation effort (patched base image, rebuild, redeploy) across all affected services — dozens of teams independently discovering and patching the same CVE is slower and harder to verify complete.',
          options: [
            { id: 'a', label: 'Notify all teams and let each rebuild independently at their own pace', tier: 'defensible', why: 'Gets the word out, but with no central tracking, there\'s no reliable way to confirm every affected service actually got rebuilt, or how quickly.' },
            { id: 'b', label: 'Centrally identify every affected service, then coordinate a single tracked remediation effort', tier: 'best', why: 'Ensures full, verifiable coverage and consistent timing, rather than relying on dozens of independent teams to each notice and rebuild from the same vulnerable base image.' },
            { id: 'c', label: 'Wait for each team\'s next regular deployment cycle to pick up the fix', tier: 'wrong', why: 'A CRITICAL CVE left unpatched across dozens of services at "normal pace" is a real, unnecessary window of exposure for something already known and actionable now.' }
          ],
          justificationPatterns: [/centrally|coordinated|tracked\s*remediation|inventory/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"Deciding whether to allow developers direct console access to production, or require all production changes to go exclusively through IaC/pipeline. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 28, damageIfOptimal: 46,
          hintNudge: 'Direct console changes to production create exactly the kind of drift and untracked change history that makes IaC\'s core value proposition (a single source of truth) fall apart.',
          hintPartial: 'Restrict production changes to go exclusively through IaC/pipeline — direct console access to production undermines IaC\'s core value (a single, version-controlled source of truth) by allowing untracked drift that the template no longer reflects.',
          hintFull: 'Best: require all production changes to go through IaC/pipeline, with console access to production restricted to read-only (or emergency break-glass with logging) — allowing routine direct console changes defeats the whole point of having infrastructure-as-code as the actual source of truth.',
          options: [
            { id: 'a', label: 'Allow direct console access to production for convenience', tier: 'wrong', why: 'Directly undermines IaC\'s core value proposition — a single source of truth — by allowing untracked changes the template no longer reflects (drift).' },
            { id: 'b', label: 'Require all production changes through IaC/pipeline, console restricted to read-only or break-glass', tier: 'best', why: 'Preserves IaC as the actual, trustworthy source of truth, while still allowing a logged emergency exception path when genuinely needed.' },
            { id: 'c', label: 'Ban console access to production entirely, with no exception mechanism', tier: 'defensible', why: 'Strongly enforces IaC-only changes, but a genuine emergency with zero break-glass option can itself become a real liability during a time-critical incident.' }
          ],
          justificationPatterns: [/iac.*(only|pipeline)|source\s*of\s*truth|drift/i]
        },
        {
          mode: 'read_the_room',
          prompt: 'A giant\'s ledger tells two different stories at once. <strong>An organization\'s Config service shows a resource as compliant, but a manual inspection reveals it clearly violates the policy. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 30, damageIfOptimal: 50,
          hintNudge: 'Check when the Config rule last actually evaluated this specific resource — a rule that only evaluates periodically (not on every change) can show a stale "compliant" result from before a later change.',
          hintPartial: 'The Config rule evaluates on a periodic schedule, not on every configuration change — the resource was compliant when last evaluated, but changed since then, and the stale "compliant" status hasn\'t been refreshed yet.',
          hintFull: 'Diagnosis: the Config rule\'s evaluation is periodic rather than change-triggered, so its compliance status is stale relative to a more recent change. Fix: switch the rule to a change-triggered evaluation (where supported) or manually trigger re-evaluation, and treat any periodic-only rule\'s status as potentially stale until confirmed.',
          outputBlock: [
            '$ aws configservice describe-compliance-by-resource --resource-type AWS::S3::Bucket',
            '(ComplianceType: COMPLIANT, LastEvaluated: 6 days ago)',
            '(the bucket policy was changed 2 days ago, introducing the violation)'
          ],
          acceptableDiagnosesPatterns: [/stale\s*(evaluation|compliance)/i, /periodic.*(evaluation|not\s*change-triggered)/i],
          followUpFix: {
            prompt: 'Fix it by triggering re-evaluation and switching to change-triggered where possible:',
            acceptablePatterns: [],
            optimalPatterns: [/re-?evaluat|change-triggered/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A giant\'s many faces no longer agree on the truth. <strong>Two teams\' independently-managed Terraform configurations both claim ownership of the same production resource, causing conflicting applies. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 30, damageIfOptimal: 50,
          hintNudge: 'A single real-world resource being represented in TWO separate state files (owned by two teams) is a structural conflict — Terraform has no way to know both configs are describing the same thing.',
          hintPartial: 'The same real resource was imported into (or independently created by) two separate Terraform configurations/state files — each team\'s apply "wins" temporarily until the other team\'s next apply reverts it, with neither state file aware of the other.',
          hintFull: 'Diagnosis: the same resource exists in two separate teams\' state files, with each apply unaware of the other. Fix: establish single, clear ownership for that resource, remove it from the non-owning team\'s state (terraform state rm), and reference it via a data source or shared module output instead of a second competing resource block.',
          outputBlock: [
            '$ (team A) terraform apply -> modifies security-group-x',
            '$ (team B) terraform apply, 10 minutes later -> reverts security-group-x back',
            '(both teams\' state files reference the same real security group)'
          ],
          acceptableDiagnosesPatterns: [/two\s*(state\s*files|teams).*same\s*resource/i, /competing\s*ownership/i],
          followUpFix: {
            prompt: 'Fix it by establishing single ownership and removing it from the other state:',
            acceptablePatterns: [],
            optimalPatterns: [/state\s*rm|single\s*owner|data\s*source/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A giant\'s trusted messenger carries a forged seal. <strong>An application using an OIDC-federated role to access AWS resources starts failing to authenticate, org-wide, after a routine identity-provider update. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 30, damageIfOptimal: 50,
          hintNudge: 'An org-wide, simultaneous failure points at the shared OIDC provider TRUST configuration itself changing (e.g. a thumbprint or audience mismatch), not any individual application\'s code.',
          hintPartial: 'The identity provider\'s update changed something the AWS IAM OIDC provider trust configuration depends on (like a certificate thumbprint), breaking the federated trust for every application relying on it simultaneously.',
          hintFull: 'Diagnosis: the identity provider update broke the AWS-side OIDC trust configuration (e.g. thumbprint mismatch), affecting every dependent application at once. Fix: update the IAM OIDC identity provider\'s trust configuration (thumbprint/audience) to match the identity provider\'s new values.',
          outputBlock: [
            '$ (application logs, org-wide, simultaneous) Error: Not authorized to perform sts:AssumeRoleWithWebIdentity',
            '(identity provider had a routine certificate update earlier the same day)'
          ],
          acceptableDiagnosesPatterns: [/oidc.*(trust|thumbprint)/i, /identity\s*provider.*(trust|config)/i],
          followUpFix: {
            prompt: 'Fix it by updating the IAM OIDC provider\'s trust configuration to match:',
            acceptablePatterns: [],
            optimalPatterns: [/thumbprint|oidc\s*provider.*update/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A giant\'s many limbs move without a single mind. <strong>After a merger, two previously-separate AWS organizations need to be consolidated, and duplicate/conflicting resource names are causing automation failures. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 30, damageIfOptimal: 50,
          hintNudge: 'Two independently-built environments almost always develop naming/tagging conventions that were never designed to coexist — this needs a deliberate reconciliation plan, not an ad hoc case-by-case fix.',
          hintPartial: 'Two organizations built independently, with naming/tagging conventions that were never designed to coexist, are now colliding — this needs a deliberate, planned reconciliation (a unified naming standard, a migration plan) rather than fixing collisions one at a time as automation happens to hit them.',
          hintFull: 'Diagnosis: two independently-built environments have colliding naming conventions never designed to coexist. Fix: establish a unified naming/tagging standard for the merged organization, then execute a planned, deliberate migration/renaming effort — rather than patching each collision reactively as automation happens to fail on it.',
          outputBlock: [
            '$ (automation failure) Error: resource "web-prod" already exists',
            '(both organizations independently used the same naming convention for unrelated resources)'
          ],
          acceptableDiagnosesPatterns: [/naming\s*convention.*collid/i, /never\s*designed\s*to\s*coexist/i],
          followUpFix: {
            prompt: 'Fix it with a deliberate, planned reconciliation rather than ad hoc fixes:',
            acceptablePatterns: [],
            optimalPatterns: [/unified\s*(naming|standard)|planned\s*migration/i]
          }
        }
      ]
    }
  ]
};
