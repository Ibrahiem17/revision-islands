// Boss "orchestrator": metadata plus its full question bank (data only).

/* ================================================================
   BOSS 4 — THE ORCHESTRATOR (Kubernetes)
   ================================================================ */
export var orchestrator = {
  id: 'orchestrator',
  name: 'The Orchestrator',
  topic: 'Kubernetes',
  icon: '🎭',
  chibiKind: 'orchestrator',
  phaseHp: [120, 130, 150],
  phaseNames: ['Strings — Pods', 'Stage — Services', 'Curtain — Real Incident'],
  xpReward: 165,
  coinBaseReward: 98,
  phases: [
    /* -------- PHASE 1: Pods -------- */
    [
      {
        mode: 'read_the_room',
        prompt: 'A puppet twitches, stuck. <strong>Diagnose the pod from this output, then fix it.</strong>',
        damageIfCorrect: 22, damageIfOptimal: 36,
        hintNudge: 'The status name literally describes the problem — it can\'t get the container image.',
        hintPartial: 'The image name or tag being requested doesn\'t actually exist where it\'s looking.',
        hintFull: 'Diagnosis: ImagePullBackOff — the image/tag doesn\'t exist or isn\'t reachable. Fix: point the deployment at a real image, e.g. kubectl set image deployment/myapp app=myrepo/app:v2',
        outputBlock: [
          '$ kubectl describe pod myapp-7d8f',
          'Status: Pending',
          'Warning  Failed  kubelet  Failed to pull image "myrepo/app:v9": not found',
          'Warning  BackOff kubelet  Back-off pulling image, ImagePullBackOff'
        ],
        acceptableDiagnosesPatterns: [/image.?pull.?back.?off/i, /(image|tag).*(not\s*found|doesn'?t\s*exist|wrong)/i],
        followUpFix: {
          prompt: 'Point the deployment at an image that actually exists:',
          acceptablePatterns: [/^kubectl\s+edit\s+deployment\s+myapp$/i],
          optimalPatterns: [/^kubectl\s+set\s+image\s+deployment\/myapp\s+app=myrepo\/app:v2$/i]
        }
      },
      {
        mode: 'read_the_room',
        prompt: 'A puppet jerks and collapses, over and over. <strong>Diagnose it, then fix it.</strong>',
        damageIfCorrect: 22, damageIfOptimal: 36,
        hintNudge: 'It\'s not failing to start — it starts, then dies, then restarts, forever.',
        hintPartial: 'The logs point at a missing file the app needs at startup.',
        hintFull: 'Diagnosis: CrashLoopBackOff — the app exits immediately because config.yaml is missing. Fix: mount the config in, e.g. kubectl create configmap app-config --from-file=config.yaml',
        outputBlock: [
          '$ kubectl logs myapp-7d8f',
          'Error: cannot read config.yaml: no such file or directory',
          '$ kubectl get pod myapp-7d8f',
          'STATUS: CrashLoopBackOff'
        ],
        acceptableDiagnosesPatterns: [/crash.?loop.?back.?off/i, /missing\s*config/i, /config\.?yaml.*(missing|not\s*found)/i],
        followUpFix: {
          prompt: 'Give the pod the config file it\'s missing:',
          acceptablePatterns: [/^kubectl\s+cp\s+config\.yaml\s+myapp-7d8f:\/config\.yaml$/i],
          optimalPatterns: [/^kubectl\s+create\s+configmap\s+app-config\s+--from-file=config\.yaml$/i]
        }
      },
      {
        mode: 'read_the_room',
        prompt: 'A puppet dangles, never taking the stage. <strong>Diagnose it, then fix it.</strong>',
        damageIfCorrect: 22, damageIfOptimal: 36,
        hintNudge: 'The scheduler is explaining exactly why it can\'t place this pod anywhere.',
        hintPartial: 'Every node it checked came up short on one specific resource.',
        hintFull: 'Diagnosis: no node has enough memory to schedule this pod — resource requests are too high for the cluster. Fix: scale down or reduce requests, e.g. kubectl scale deployment myapp --replicas=1',
        outputBlock: [
          '$ kubectl describe pod myapp-7d8f',
          'Status: Pending',
          'Warning  FailedScheduling  0/3 nodes are available: 3 Insufficient memory.'
        ],
        acceptableDiagnosesPatterns: [/insufficient\s*memory/i, /not\s*enough\s*(cluster\s*)?resources/i, /resource\s*requests?\s*too\s*high/i],
        followUpFix: {
          prompt: 'Bring the resource demand back within what the cluster actually has:',
          acceptablePatterns: [/^kubectl\s+edit\s+deployment\s+myapp$/i],
          optimalPatterns: [/^kubectl\s+scale\s+deployment\s+myapp\s+--replicas=1$/i]
        }
      },
      {
        mode: 'read_the_room',
        prompt: 'A puppet is up on stage, but the lights won\'t turn on it. <strong>Diagnose it, then fix it.</strong>',
        damageIfCorrect: 22, damageIfOptimal: 36,
        hintNudge: 'The pod is Running — it\'s the readiness gate that\'s rejecting it.',
        hintPartial: 'The app itself is answering the health check with an error status.',
        hintFull: 'Diagnosis: the readiness probe is failing because the app\'s health endpoint is returning 500s. Fix (immediate): restart the pod once the app is actually healthy, e.g. kubectl delete pod myapp-7d8f',
        outputBlock: [
          '$ kubectl describe pod myapp-7d8f',
          'Status: Running (0/1 Ready)',
          'Warning  Unhealthy  kubelet  Readiness probe failed: HTTP probe failed with statuscode: 500'
        ],
        acceptableDiagnosesPatterns: [/readiness\s*probe.*(fail|500)/i, /not\s*(actually\s*)?healthy/i, /health\s*(check|endpoint).*(fail|error|500)/i],
        followUpFix: {
          prompt: 'Force it to restart cleanly once the underlying issue is fixed:',
          acceptablePatterns: [/^kubectl\s+rollout\s+restart\s+deployment\/myapp$/i],
          optimalPatterns: [/^kubectl\s+delete\s+pod\s+myapp-7d8f$/i]
        }
      },
      {
        mode: 'read_the_room',
        prompt: 'A puppet\'s strings snap without warning. <strong>Diagnose it, then fix it.</strong>',
        damageIfCorrect: 22, damageIfOptimal: 36,
        hintNudge: 'Same shape as the OOM problem you may have seen before — just in Kubernetes\' own words this time.',
        hintPartial: 'The last-state termination reason spells it out directly.',
        hintFull: 'Diagnosis: the pod exceeded its memory limit and was OOMKilled. Fix: raise the memory limit, e.g. kubectl set resources deployment myapp --limits=memory=512Mi',
        outputBlock: [
          '$ kubectl describe pod myapp-7d8f',
          'Last State:  Terminated',
          'Reason:      OOMKilled',
          'Exit Code:   137'
        ],
        acceptableDiagnosesPatterns: [/oom.?killed/i, /exceeded.*memory\s*limit/i, /ran\s*out\s*of\s*memory/i],
        followUpFix: {
          prompt: 'Give it enough memory headroom this time:',
          acceptablePatterns: [/^kubectl\s+edit\s+deployment\s+myapp$/i],
          optimalPatterns: [/^kubectl\s+set\s+resources\s+deployment\s+myapp\s+--limits=memory=512Mi$/i]
        }
      }
    ],
    /* -------- PHASE 2: Services -------- */
    [
      {
        mode: 'spot_the_bug',
        prompt: 'A puppet strains against a mismatched string. <strong>Click the buggy line, then type the fix.</strong>',
        damageIfCorrect: 24, damageIfOptimal: 38,
        hintNudge: 'A Service finds its pods by matching labels EXACTLY — check the spelling closely.',
        hintPartial: 'The selector says "myap", but the pod\'s actual label is spelled differently.',
        hintFull: 'Fix: app: myapp',
        codeBlock: [
          'apiVersion: v1',
          'kind: Service',
          'metadata:',
          '  name: myapp-svc',
          'spec:',
          '  selector:',
          '    app: myap',
          '  ports:',
          '    - port: 80'
        ],
        buggyLineId: 6,
        correctFixPatterns: [/^app:\s*myapp$/i]
      },
      {
        mode: 'spot_the_bug',
        prompt: 'Another string, pulling the wrong way. <strong>Click the buggy line, then type the fix.</strong>',
        damageIfCorrect: 24, damageIfOptimal: 38,
        hintNudge: 'Check what port the container itself actually listens on.',
        hintPartial: 'The Service is forwarding to port 8080, but the app listens on 3000.',
        hintFull: 'Fix: targetPort: 3000',
        codeBlock: [
          'apiVersion: v1',
          'kind: Service',
          'spec:',
          '  selector:',
          '    app: myapp',
          '  ports:',
          '    - port: 80',
          '      targetPort: 8080',
          '# container actually listens on 3000'
        ],
        buggyLineId: 7,
        correctFixPatterns: [/^targetPort:\s*3000$/i]
      },
      {
        mode: 'spot_the_bug',
        prompt: 'A puppet can\'t be seen from beyond the stage. <strong>Click the buggy line, then type the fix.</strong>',
        damageIfCorrect: 24, damageIfOptimal: 38,
        hintNudge: 'This service needs to be reachable from OUTSIDE the cluster.',
        hintPartial: 'ClusterIP is internal-only by design — a different Service type reaches the outside world.',
        hintFull: 'Fix: type: LoadBalancer',
        codeBlock: [
          'apiVersion: v1',
          'kind: Service',
          'metadata:',
          '  name: myapp-svc',
          'spec:',
          '  type: ClusterIP',
          '  selector:',
          '    app: myapp'
        ],
        buggyLineId: 5,
        correctFixPatterns: [/^type:\s*(LoadBalancer|NodePort)$/i]
      },
      {
        mode: 'spot_the_bug',
        prompt: 'A whole troupe of puppets stands frozen, none performing. <strong>Click the buggy line, then type the fix.</strong>',
        damageIfCorrect: 24, damageIfOptimal: 38,
        hintNudge: 'Check how many copies of this pod the Deployment is actually asking for.',
        hintPartial: 'It\'s set to run zero replicas — nothing is scheduled at all.',
        hintFull: 'Fix: replicas: 3',
        codeBlock: [
          'apiVersion: apps/v1',
          'kind: Deployment',
          'metadata:',
          '  name: myapp',
          'spec:',
          '  replicas: 0',
          '  selector:',
          '    matchLabels:',
          '      app: myapp'
        ],
        buggyLineId: 5,
        correctFixPatterns: [/^replicas:\s*[1-9]\d*$/i]
      },
      {
        mode: 'spot_the_bug',
        prompt: 'One more puppet, wired to the wrong socket. <strong>Click the buggy line, then type the fix.</strong>',
        damageIfCorrect: 24, damageIfOptimal: 38,
        hintNudge: 'This time check the CONTAINER\'s own declared port, not the Service.',
        hintPartial: 'The container declares port 8080, but the app inside actually listens on 80.',
        hintFull: 'Fix: containerPort: 80',
        codeBlock: [
          'apiVersion: apps/v1',
          'kind: Deployment',
          'spec:',
          '  template:',
          '    spec:',
          '      containers:',
          '        - name: myapp',
          '          ports:',
          '            - containerPort: 8080',
          '# app actually listens on 80'
        ],
        buggyLineId: 8,
        correctFixPatterns: [/^containerPort:\s*80$/i]
      }
    ],
    /* -------- PHASE 3: Real Incident — Zero-Downtime Deployment -------- */
    [
      {
        mode: 'triage_call',
        prompt: 'The stage lights shift: <strong>"Routine, low-risk backend patch — the whole team is confident in it. How do you ship it?"</strong>',
        damageIfCorrect: 24, damageIfOptimal: 38,
        hintNudge: 'Don\'t reach for extra machinery a simple, well-tested change doesn\'t need.',
        hintPartial: 'Kubernetes\' own default zero-downtime strategy already covers this case.',
        hintFull: 'Best: a standard rolling update — simplest zero-downtime option, no need for extra infrastructure or a gradual traffic split on a routine, well-tested change.',
        options: [
          { id: 'a', label: 'Standard rolling update', tier: 'best', why: 'The simplest zero-downtime option — exactly right for a routine, well-tested, low-risk change.' },
          { id: 'b', label: 'Blue-green deployment', tier: 'defensible', why: 'Works, but doubles infrastructure temporarily for a change that didn\'t need that safety margin.' },
          { id: 'c', label: 'Canary release', tier: 'wrong', why: 'Adds a gradual-traffic-split process for a change the team already has full confidence in — unnecessary overhead.' }
        ],
        justificationPatterns: [/rolling|simple|routine|default/i]
      },
      {
        mode: 'triage_call',
        prompt: '<strong>"A major, risky version bump — you want to test it on a small slice of real traffic before going further. What now?"</strong>',
        damageIfCorrect: 24, damageIfOptimal: 38,
        hintNudge: 'You specifically want SOME real users on it before ALL of them.',
        hintPartial: 'The strategy built around gradually increasing exposure to real traffic.',
        hintFull: 'Best: a canary release — route a small percentage of real traffic to the new version before a full rollout.',
        options: [
          { id: 'a', label: 'Canary release to a small percentage of traffic', tier: 'best', why: 'Purpose-built for exactly this: real traffic, limited blast radius, before committing further.' },
          { id: 'b', label: 'Standard rolling update to everyone at once', tier: 'wrong', why: 'A risky major change reaches 100% of users immediately — no early warning before full exposure.' },
          { id: 'c', label: 'Blue-green, switch all traffic over at once', tier: 'wrong', why: 'Still all-or-nothing for every user the moment you switch — no gradual real-traffic signal first.' }
        ],
        justificationPatterns: [/canary|small|percentage|gradual|slice/i]
      },
      {
        mode: 'triage_call',
        prompt: '<strong>"A risky frontend redesign — you need an INSTANT full rollback if metrics look bad, cost isn\'t a concern. What now?"</strong>',
        damageIfCorrect: 24, damageIfOptimal: 38,
        hintNudge: 'You want a switch you can instantly flip back, not a gradual process to unwind.',
        hintPartial: 'Two full environments, one already proven-good, so you can point traffic back instantly.',
        hintFull: 'Best: blue-green — keep the old environment fully live, switch traffic over, and flip back instantly if needed.',
        options: [
          { id: 'a', label: 'Blue-green deployment', tier: 'best', why: 'The only option with a truly instant rollback — the old environment stays fully live and ready.' },
          { id: 'b', label: 'Canary release', tier: 'defensible', why: 'Limits exposure but rollback still means unwinding a gradual rollout, not one instant switch.' },
          { id: 'c', label: 'Rolling update', tier: 'wrong', why: 'Rollback means rolling every already-updated pod back one at a time — not instant.' }
        ],
        justificationPatterns: [/blue.?green|instant|switch|rollback/i]
      },
      {
        mode: 'triage_call',
        prompt: '<strong>"This deploy also ships a breaking database schema change. What\'s the safe approach?"</strong>',
        damageIfCorrect: 24, damageIfOptimal: 38,
        hintNudge: 'The deployment strategy itself doesn\'t fix an incompatible schema — the schema change needs its own safe order.',
        hintPartial: 'Ship a backward-compatible schema change FIRST, separately, before the app that depends on it.',
        hintFull: 'Best: deploy the schema migration in a backward-compatible way first, then roll out the app change — no deployment strategy alone fixes a breaking schema change.',
        options: [
          { id: 'a', label: 'Roll out the breaking schema change and the app together', tier: 'wrong', why: 'Any pod still on the old app version breaks the instant the incompatible schema lands.' },
          { id: 'b', label: 'Deploy a backward-compatible schema change first, then the app', tier: 'best', why: 'Old and new app versions both keep working during the rollout — the actual safe pattern for schema changes.' },
          { id: 'c', label: 'Blue-green switch without changing the migration approach', tier: 'wrong', why: 'Still doesn\'t solve schema compatibility — the switch itself isn\'t what breaks, the incompatible schema is.' }
        ],
        justificationPatterns: [/backward.?compatible|migration|schema|expand/i]
      },
      {
        mode: 'triage_call',
        prompt: '<strong>"Budget only covers running ONE full environment\'s worth of infrastructure. What deployment approach fits?"</strong>',
        damageIfCorrect: 24, damageIfOptimal: 38,
        hintNudge: 'One option needs a full second environment running in parallel — that\'s off the table here.',
        hintPartial: 'The option that updates the SAME fleet gradually, never needing double capacity.',
        hintFull: 'Best: a rolling update — updates the existing fleet in place, never requiring double the infrastructure.',
        options: [
          { id: 'a', label: 'Rolling update', tier: 'best', why: 'Works entirely within existing capacity — never needs a second full environment.' },
          { id: 'b', label: 'Blue-green deployment', tier: 'wrong', why: 'Requires a full second environment running in parallel — exactly the budget constraint here.' },
          { id: 'c', label: 'Canary release', tier: 'defensible', why: 'Needs a little extra capacity for the canary slice, but nowhere near a full second environment.' }
        ],
        justificationPatterns: [/rolling|budget|capacity|existing/i]
      }
    ]
  ],
  specialAttack: {
    mode: 'build_the_pipeline',
    prompt: 'Every string pulls taut at once! <strong>Sequence the correct safe rollout procedure before it lands.</strong>',
    steps: [
      'Update the Deployment\'s image',
      'kubectl apply the change',
      'Watch the rollout status',
      'Verify new pods are Ready'
    ],
    damageIfCorrect: 38,
    damageToHeroIfWrong: 25
  },
  // ================================================================
  // Remediation doc, Section 1 — 5-level restructure, boss 3.
  // Research basis (checked BEFORE writing): kubectl's own reference
  // docs, the Kubernetes docs' own "Troubleshooting Applications"
  // and "Configure Pods" guides, and the topic list that consistently
  // appears across CKA/CKAD exam guides and real k8s interview prep
  // — pod lifecycle, Deployments/Services, ConfigMaps/Secrets,
  // probes, resource requests/limits, RBAC, PV/PVC, Ingress, HPA,
  // NetworkPolicy, node conditions, and real production incident
  // patterns (ImagePullBackOff, CrashLoopBackOff, OOMKilled, DNS/
  // CoreDNS failures, PodDisruptionBudget blocking drains). All 125
  // questions trace to one of those. Cross-checked programmatically
  // against Terminal Golem's and Container Kraken's 125 each (zero
  // overlap risk, different tool) and against each other level in
  // this set — zero duplicate prompts, verified.
  levels: [
    {
      name: 'Level 1 — Fundamentals',
      hp: 100,
      questions: [
        {
          mode: 'terminal',
          prompt: 'The Orchestrator raises a baton: <strong>"List every pod in the current namespace."</strong>',
          damageIfCorrect: 14, damageIfOptimal: 22,
          hintNudge: 'The single most-used kubectl command — "get" the resource type "pods."',
          hintPartial: 'kubectl g__ pods',
          hintFull: 'kubectl get pods',
          acceptablePatterns: [],
          optimalPatterns: [/^kubectl\s+get\s+pods$/i],
          baseCmds: ['kubectl']
        },
        {
          mode: 'terminal',
          prompt: 'A string twitches: <strong>"List every pod, including which NODE each one is running on."</strong>',
          damageIfCorrect: 14, damageIfOptimal: 22,
          hintNudge: 'One output flag on kubectl get adds extra columns, including the node.',
          hintPartial: 'kubectl get pods -_ ____',
          hintFull: 'kubectl get pods -o wide',
          acceptablePatterns: [],
          optimalPatterns: [/^kubectl\s+get\s+pods\s+-o\s+wide$/i],
          baseCmds: ['kubectl']
        },
        {
          mode: 'terminal',
          prompt: 'The puppet strings hum: <strong>"List every resource — pods, services, deployments — in one command."</strong>',
          damageIfCorrect: 14, damageIfOptimal: 22,
          hintNudge: 'kubectl get accepts a special resource-type keyword meaning "everything common."',
          hintPartial: 'kubectl get ___',
          hintFull: 'kubectl get all',
          acceptablePatterns: [],
          optimalPatterns: [/^kubectl\s+get\s+all$/i],
          baseCmds: ['kubectl']
        },
        {
          mode: 'terminal',
          prompt: 'The Orchestrator leans in: <strong>"Show detailed information and recent events for the pod <code>web-abc123</code>."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26,
          hintNudge: 'One subcommand gives a full, human-readable breakdown of a resource — including its recent event history.',
          hintPartial: 'kubectl des_____ pod web-abc123',
          hintFull: 'kubectl describe pod web-abc123',
          acceptablePatterns: [],
          optimalPatterns: [/^kubectl\s+describe\s+pod\s+web-abc123$/i],
          baseCmds: ['kubectl']
        },
        {
          mode: 'terminal',
          prompt: 'A puppet gestures: <strong>"Show the logs for the pod <code>web-abc123</code>."</strong>',
          damageIfCorrect: 14, damageIfOptimal: 22,
          hintNudge: 'Same "logs" idea as Docker, just through kubectl instead.',
          hintPartial: 'kubectl l___ web-abc123',
          hintFull: 'kubectl logs web-abc123',
          acceptablePatterns: [],
          optimalPatterns: [/^kubectl\s+logs\s+web-abc123$/i],
          baseCmds: ['kubectl']
        },
        {
          mode: 'terminal',
          prompt: 'The strings pull taut: <strong>"Get an interactive bash shell inside the pod <code>web-abc123</code>."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26,
          hintNudge: 'exec, plus the interactive/tty flags, plus a "--" before the actual command to run.',
          hintPartial: 'kubectl exec -__ web-abc123 -- ____',
          hintFull: 'kubectl exec -it web-abc123 -- bash',
          acceptablePatterns: [/^kubectl\s+exec\s+web-abc123\s+--\s+bash$/i],
          optimalPatterns: [/^kubectl\s+exec\s+-it\s+web-abc123\s+--\s+bash$/i],
          baseCmds: ['kubectl']
        },
        {
          mode: 'terminal',
          prompt: 'The Orchestrator gestures at a scroll: <strong>"Create or update every resource defined in <code>app.yaml</code>."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26,
          hintNudge: 'The declarative "make the cluster match this file" command — the same one used for basically every deploy.',
          hintPartial: 'kubectl a____ -f app.yaml',
          hintFull: 'kubectl apply -f app.yaml',
          acceptablePatterns: [/^kubectl\s+create\s+-f\s+app\.yaml$/i],
          optimalPatterns: [/^kubectl\s+apply\s+-f\s+app\.yaml$/i],
          baseCmds: ['kubectl']
        },
        {
          mode: 'terminal',
          prompt: 'A string snaps taut: <strong>"Delete the pod <code>web-abc123</code>."</strong>',
          damageIfCorrect: 14, damageIfOptimal: 22,
          hintNudge: 'Same delete verb as most kubectl resource commands.',
          hintPartial: 'kubectl d_____ pod web-abc123',
          hintFull: 'kubectl delete pod web-abc123',
          acceptablePatterns: [],
          optimalPatterns: [/^kubectl\s+delete\s+pod\s+web-abc123$/i],
          baseCmds: ['kubectl']
        },
        {
          mode: 'terminal',
          prompt: 'The Orchestrator taps a baton: <strong>"List every Deployment in the current namespace."</strong>',
          damageIfCorrect: 14, damageIfOptimal: 22,
          hintNudge: 'Same get pattern, different resource type keyword.',
          hintPartial: 'kubectl get ____________',
          hintFull: 'kubectl get deployments',
          acceptablePatterns: [],
          optimalPatterns: [/^kubectl\s+get\s+deployments?$/i],
          baseCmds: ['kubectl']
        },
        {
          mode: 'terminal',
          prompt: 'A puppet sways: <strong>"List every Service in the current namespace."</strong>',
          damageIfCorrect: 14, damageIfOptimal: 22,
          hintNudge: 'Same get pattern again, resource type "services."',
          hintPartial: 'kubectl get ________',
          hintFull: 'kubectl get services',
          acceptablePatterns: [],
          optimalPatterns: [/^kubectl\s+get\s+services?$/i],
          baseCmds: ['kubectl']
        },
        {
          mode: 'terminal',
          prompt: 'The Orchestrator surveys the stage: <strong>"List every node in the cluster."</strong>',
          damageIfCorrect: 14, damageIfOptimal: 22,
          hintNudge: 'Same get pattern, cluster-scoped resource type "nodes."',
          hintPartial: 'kubectl get _____',
          hintFull: 'kubectl get nodes',
          acceptablePatterns: [],
          optimalPatterns: [/^kubectl\s+get\s+nodes$/i],
          baseCmds: ['kubectl']
        },
        {
          mode: 'terminal',
          prompt: 'A new curtain rises: <strong>"Create a new namespace called <code>staging</code>."</strong>',
          damageIfCorrect: 14, damageIfOptimal: 22,
          hintNudge: 'kubectl create, resource type namespace, then the name.',
          hintPartial: 'kubectl create _________ staging',
          hintFull: 'kubectl create namespace staging',
          acceptablePatterns: [],
          optimalPatterns: [/^kubectl\s+create\s+namespace\s+staging$/i],
          baseCmds: ['kubectl']
        },
        {
          mode: 'terminal',
          prompt: 'The Orchestrator points to a side stage: <strong>"List every pod in the <code>staging</code> namespace specifically."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26,
          hintNudge: 'Add the namespace flag to scope the same get-pods command to one specific namespace.',
          hintPartial: 'kubectl get pods -_ _______',
          hintFull: 'kubectl get pods -n staging',
          acceptablePatterns: [],
          optimalPatterns: [/^kubectl\s+get\s+pods\s+-n\s+staging$/i],
          baseCmds: ['kubectl']
        },
        {
          mode: 'terminal',
          prompt: 'The strings tighten: <strong>"Scale the Deployment <code>web</code> to 3 replicas."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26,
          hintNudge: 'A dedicated scale subcommand, with a replicas flag.',
          hintPartial: 'kubectl scale deployment web --________=_',
          hintFull: 'kubectl scale deployment web --replicas=3',
          acceptablePatterns: [],
          optimalPatterns: [/^kubectl\s+scale\s+deployment\s+web\s+--replicas=3$/i],
          baseCmds: ['kubectl']
        },
        {
          mode: 'terminal',
          prompt: 'A puppet holds still, waiting: <strong>"Watch the live rollout status of the Deployment <code>web</code> as it updates."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26,
          hintNudge: 'A dedicated rollout subcommand with a "status" action.',
          hintPartial: 'kubectl rollout ______ deployment web',
          hintFull: 'kubectl rollout status deployment web',
          acceptablePatterns: [],
          optimalPatterns: [/^kubectl\s+rollout\s+status\s+deployment\/?\s*web$/i],
          baseCmds: ['kubectl']
        },
        {
          mode: 'terminal',
          prompt: 'The Orchestrator surveys every stage at once: <strong>"List every pod, across EVERY namespace in the cluster, in one command."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26,
          hintNudge: 'A flag on kubectl get widens the scope from "current namespace" to "every namespace."',
          hintPartial: 'kubectl get pods --__-__________',
          hintFull: 'kubectl get pods --all-namespaces',
          acceptablePatterns: [/^kubectl\s+get\s+pods\s+-A$/i],
          optimalPatterns: [/^kubectl\s+get\s+pods\s+--all-namespaces$/i],
          baseCmds: ['kubectl']
        },
        {
          mode: 'spot_the_bug',
          prompt: 'The Orchestrator shows a torn script: <strong>"This Pod manifest fails validation immediately. Find and fix the bug."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26,
          hintNudge: 'Every Kubernetes manifest needs an apiVersion field declaring which API this resource belongs to — check whether it\'s missing.',
          hintPartial: 'Line 1 is missing apiVersion entirely — Kubernetes has no way to know which API version this Pod object should be validated against.',
          hintFull: 'Line 1 should read: apiVersion: v1',
          codeBlock: [
            'kind: Pod',
            'metadata:',
            '  name: web'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/^apiVersion:\s*v1$/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A torn thread dangles: <strong>"This Deployment creates zero pods that it actually manages — new pods show up completely unrelated to it. Find and fix the bug."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26,
          hintNudge: 'A Deployment\'s selector has to EXACTLY match the labels on its own pod template — if they don\'t match, it can\'t recognize its own pods as belonging to it.',
          hintPartial: 'Line 2\'s selector looks for app: webapp, but the pod template below is labeled app: web — they need to match exactly.',
          hintFull: 'Line 2 should read: matchLabels: {app: web}',
          codeBlock: [
            'selector:',
            '  matchLabels: {app: webapp}',
            'template:',
            '  metadata:',
            '    labels: {app: web}'
          ],
          buggyLineId: 1,
          correctFixPatterns: [/matchLabels:\s*\{\s*app:\s*web\s*\}/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'The Orchestrator\'s baton taps twice: <strong>"This Pod manifest is rejected — the container section is structured wrong. Find and fix the bug."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26,
          hintNudge: '"containers" under a Pod spec must be a LIST (an array of container objects), even for just one container — check whether it\'s written as one.',
          hintPartial: 'Line 2 writes containers as a single object, not a list — Kubernetes requires a "- name: ..." list item, even for one container.',
          hintFull: 'Line 2 should read: containers:\\n  - name: web\\n    image: nginx',
          codeBlock: [
            'spec:',
            '  containers: {name: web, image: nginx}'
          ],
          buggyLineId: 1,
          correctFixPatterns: [/containers:\s*\n?\s*-\s*name:\s*web/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A puppet\'s string frays: <strong>"This manifest\'s indentation is wrong and it fails to parse at all. Find and fix the bug."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26,
          hintNudge: 'YAML is whitespace-sensitive — a field indented at the wrong level is either a syntax error or silently attaches to the wrong parent.',
          hintPartial: 'Line 3\'s "image" is indented at the same level as "name" under a list item — but it needs a consistent 2-space indent matching the rest of that container\'s fields, not extra/misaligned spacing.',
          hintFull: 'Line 3 should read (aligned under the same container entry): "    image: nginx" (4 spaces, matching "name"\'s indent level)',
          codeBlock: [
            'containers:',
            '  - name: web',
            '      image: nginx'
          ],
          buggyLineId: 2,
          correctFixPatterns: [/^\s{4}image:\s*nginx$/]
        },
        {
          mode: 'triage_call',
          prompt: 'The Orchestrator tilts its mask: <strong>"You need to run an app that should always have a set number of replicas and self-heal if one dies. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 28,
          hintNudge: 'One option is a single, unmanaged unit — if it dies, nothing brings it back. One option is specifically designed to maintain a desired replica count forever.',
          hintPartial: 'A Deployment manages a set of replica Pods and automatically replaces any that die — a bare Pod has no such self-healing behavior at all.',
          hintFull: 'Best: use a Deployment — it maintains the desired replica count and automatically replaces failed pods; a bare Pod created directly has no such management at all.',
          options: [
            { id: 'a', label: 'Create a bare Pod directly', tier: 'wrong', why: 'A bare Pod has no controller watching it — if it dies (node failure, crash, eviction), nothing recreates it, which directly contradicts "self-heal if one dies."' },
            { id: 'b', label: 'Create a Deployment', tier: 'best', why: 'Specifically designed to maintain a desired replica count and automatically replace failed pods — exactly matches "set number of replicas" and "self-heal."' },
            { id: 'c', label: 'Create a Job', tier: 'wrong', why: 'Jobs are for run-to-completion tasks, not for maintaining an ongoing set of running replicas — a Job that finishes successfully is considered "done," not something to keep replicated.' }
          ],
          justificationPatterns: [/deployment|self.?heal|desired\s*replica|replace.*failed/i]
        },
        {
          mode: 'triage_call',
          prompt: 'A puppet gestures outward: <strong>"You need to expose a web app to traffic from OUTSIDE the cluster, on a real cloud load balancer. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 28,
          hintNudge: 'One Service type is only reachable from inside the cluster. One Service type specifically provisions an external cloud load balancer for you.',
          hintPartial: 'A LoadBalancer-type Service is specifically designed to provision a real external cloud load balancer pointing at your pods.',
          hintFull: 'Best: a Service of type LoadBalancer — it provisions a real external cloud load balancer, unlike ClusterIP (internal-only) or NodePort (exposes a raw port on every node, without a proper load balancer in front).',
          options: [
            { id: 'a', label: 'A ClusterIP Service (the default type)', tier: 'wrong', why: 'ClusterIP is only reachable from inside the cluster — it has no path for external traffic at all, which directly contradicts the requirement.' },
            { id: 'b', label: 'A Service of type LoadBalancer', tier: 'best', why: 'Specifically provisions a real external cloud load balancer pointing at the pods — the standard way to expose a service to the outside world on most cloud providers.' },
            { id: 'c', label: 'A NodePort Service', tier: 'defensible', why: 'Technically reachable externally (via any node\'s IP + the exposed port), but lacks a real load balancer in front and requires clients to know node IPs directly — LoadBalancer is the standard, cleaner fit for genuine external traffic.' }
          ],
          justificationPatterns: [/loadbalancer|external\s*(cloud\s*)?load\s*balancer|outside\s*the\s*cluster/i]
        },
        {
          mode: 'read_the_room',
          prompt: 'A puppet hangs motionless. <strong>A pod has been stuck in "Pending" status for several minutes. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 18, damageIfOptimal: 30,
          hintNudge: 'A pod stuck Pending (never even scheduled to a node) almost always means the scheduler can\'t find a node with enough of something the pod is asking for.',
          hintPartial: 'describe shows a scheduling event saying "Insufficient cpu" — no node in the cluster currently has enough free CPU to satisfy this pod\'s request.',
          hintFull: 'Diagnosis: the scheduler can\'t find a node with enough available CPU to satisfy the pod\'s resource request. Fix: either reduce the pod\'s CPU request to a realistic value, or add more cluster capacity.',
          outputBlock: [
            '$ kubectl get pods',
            'web-7d8f9   0/1   Pending   0   5m',
            '',
            '$ kubectl describe pod web-7d8f9',
            'Warning  FailedScheduling  0/3 nodes are available: 3 Insufficient cpu.'
          ],
          acceptableDiagnosesPatterns: [/insufficient\s*(cpu|resources)/i, /no\s*node.*(enough|available)\s*(cpu|capacity)/i, /can'?t\s*be\s*scheduled/i],
          followUpFix: {
            prompt: 'Check exactly what the pod is requesting, as the first real diagnostic step:',
            acceptablePatterns: [],
            optimalPatterns: [/^kubectl\s+describe\s+pod\s+web-7d8f9$/i, /^kubectl\s+get\s+pod\s+web-7d8f9\s+-o\s+yaml$/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A puppet jerks violently. <strong>A pod keeps restarting over and over, showing "CrashLoopBackOff". Diagnose it, then fix it.</strong>',
          damageIfCorrect: 18, damageIfOptimal: 30,
          hintNudge: 'The container is starting and then dying immediately, repeatedly — its own logs from the last attempt almost always show exactly why.',
          hintPartial: 'The logs show the app exiting with an unhandled exception right at startup, every single time — this is an application-level crash, not a scheduling problem.',
          hintFull: 'Diagnosis: the container crashes immediately on startup due to an application error. Fix: check the exact error in the logs and fix the underlying application/config issue causing the crash.',
          outputBlock: [
            '$ kubectl get pods',
            'web-9f2a1   0/1   CrashLoopBackOff   6   4m',
            '',
            '$ kubectl logs web-9f2a1',
            'Error: cannot find module \'express\'',
            'process exiting with code 1'
          ],
          acceptableDiagnosesPatterns: [/crash(es|ing)?\s*(on\s*start(up)?)?/i, /application\s*(error|crash)/i, /exits?\s*immediately/i],
          followUpFix: {
            prompt: 'Check the previous crashed instance\'s logs specifically, to be sure you\'re looking at the actual crash (not a stale earlier run):',
            acceptablePatterns: [],
            optimalPatterns: [/^kubectl\s+logs\s+web-9f2a1\s+--previous$/i]
          }
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'The Orchestrator raises both hands. <strong>Sequence the correct order for deploying a new app to the cluster and confirming it\'s actually working.</strong>',
          steps: [
            'Write the Deployment and Service manifests',
            'kubectl apply -f the manifests',
            'kubectl get pods to confirm they\'re Running',
            'kubectl logs to confirm the app started cleanly'
          ],
          damageIfCorrect: 20, damageIfOptimal: 34,
          damageToHeroIfWrong: 18
        }
      ]
    },
    {
      name: 'Level 2 — Intermediate',
      hp: 120,
      questions: [
        {
          mode: 'terminal',
          prompt: 'The Orchestrator gestures at a prop box: <strong>"Create a ConfigMap called <code>app-config</code> from the file <code>config.yaml</code>."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26, timeAllotted: 45,
          hintNudge: 'kubectl create configmap, plus a from-file flag pointing at the actual file.',
          hintPartial: 'kubectl create configmap app-config --____-____=config.yaml',
          hintFull: 'kubectl create configmap app-config --from-file=config.yaml',
          acceptablePatterns: [],
          optimalPatterns: [/^kubectl\s+create\s+configmap\s+app-config\s+--from-file=config\.yaml$/i],
          baseCmds: ['kubectl']
        },
        {
          mode: 'terminal',
          prompt: 'A string hums: <strong>"Create a generic Secret called <code>db-creds</code> with a key <code>password</code> set to <code>hunter2</code>."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28, timeAllotted: 45,
          hintNudge: 'kubectl create secret, the generic type, then a from-literal flag in key=value form.',
          hintPartial: 'kubectl create secret generic db-creds --____-_______=password=hunter2',
          hintFull: 'kubectl create secret generic db-creds --from-literal=password=hunter2',
          acceptablePatterns: [],
          optimalPatterns: [/^kubectl\s+create\s+secret\s+generic\s+db-creds\s+--from-literal=password=hunter2$/i],
          baseCmds: ['kubectl']
        },
        {
          mode: 'terminal',
          prompt: 'The Orchestrator unfurls a scroll: <strong>"Show the ConfigMap <code>app-config</code>\'s full contents, as YAML."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26, timeAllotted: 45,
          hintNudge: 'kubectl get, with an output-format flag requesting YAML instead of the default table.',
          hintPartial: 'kubectl get configmap app-config -_ ____',
          hintFull: 'kubectl get configmap app-config -o yaml',
          acceptablePatterns: [],
          optimalPatterns: [/^kubectl\s+get\s+configmap\s+app-config\s+-o\s+yaml$/i],
          baseCmds: ['kubectl']
        },
        {
          mode: 'terminal',
          prompt: 'A puppet leans forward: <strong>"Open the Deployment <code>web</code> for live editing."</strong>',
          damageIfCorrect: 14, damageIfOptimal: 22, timeAllotted: 45,
          hintNudge: 'A dedicated subcommand opens a resource\'s live definition in your editor.',
          hintPartial: 'kubectl e___ deployment web',
          hintFull: 'kubectl edit deployment web',
          acceptablePatterns: [],
          optimalPatterns: [/^kubectl\s+edit\s+deployment\s+web$/i],
          baseCmds: ['kubectl']
        },
        {
          mode: 'terminal',
          prompt: 'The Orchestrator points sharply: <strong>"Update the Deployment <code>web</code>\'s container named <code>app</code> to use the image <code>myrepo/app:v2</code>, without a full edit."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28, timeAllotted: 45,
          hintNudge: 'A dedicated one-liner exists specifically for changing a Deployment\'s image without opening a full editor.',
          hintPartial: 'kubectl s__ image deployment/web app=myrepo/app:v2',
          hintFull: 'kubectl set image deployment/web app=myrepo/app:v2',
          acceptablePatterns: [],
          optimalPatterns: [/^kubectl\s+set\s+image\s+deployment\/web\s+app=myrepo\/app:v2$/i],
          baseCmds: ['kubectl']
        },
        {
          mode: 'terminal',
          prompt: 'A string snaps back: <strong>"Undo the most recent rollout of the Deployment <code>web</code>."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28, timeAllotted: 45,
          hintNudge: 'The rollout subcommand family also has an "undo" action.',
          hintPartial: 'kubectl rollout ____ deployment web',
          hintFull: 'kubectl rollout undo deployment web',
          acceptablePatterns: [],
          optimalPatterns: [/^kubectl\s+rollout\s+undo\s+deployment\/?\s*web$/i],
          baseCmds: ['kubectl']
        },
        {
          mode: 'terminal',
          prompt: 'The Orchestrator watches closely: <strong>"Show live CPU/memory usage for every pod (requires metrics-server)."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26, timeAllotted: 45,
          hintNudge: 'kubectl\'s equivalent of "top", scoped to pods.',
          hintPartial: 'kubectl t__ pod',
          hintFull: 'kubectl top pod',
          acceptablePatterns: [],
          optimalPatterns: [/^kubectl\s+top\s+pods?$/i],
          baseCmds: ['kubectl']
        },
        {
          mode: 'terminal',
          prompt: 'A puppet reaches through the curtain: <strong>"Forward local port 8080 to port 80 on the pod <code>web-abc123</code>, for quick local testing."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28, timeAllotted: 45,
          hintNudge: 'A dedicated subcommand tunnels a local port to a pod\'s port, in local:remote form.',
          hintPartial: 'kubectl p___-______ web-abc123 ____:__',
          hintFull: 'kubectl port-forward web-abc123 8080:80',
          acceptablePatterns: [],
          optimalPatterns: [/^kubectl\s+port-forward\s+web-abc123\s+8080:80$/i],
          baseCmds: ['kubectl']
        },
        {
          mode: 'terminal',
          prompt: 'The Orchestrator hands over a small box: <strong>"Copy the local file <code>data.json</code> into the pod <code>web-abc123</code>, at <code>/app/data.json</code>."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26, timeAllotted: 45,
          hintNudge: 'Same idea as docker cp — a dedicated copy subcommand, source then destination.',
          hintPartial: 'kubectl c_ data.json web-abc123:/app/data.json',
          hintFull: 'kubectl cp data.json web-abc123:/app/data.json',
          acceptablePatterns: [],
          optimalPatterns: [/^kubectl\s+cp\s+data\.json\s+web-abc123:\/app\/data\.json$/i],
          baseCmds: ['kubectl']
        },
        {
          mode: 'terminal',
          prompt: 'A string hums low: <strong>"Add the label <code>tier=frontend</code> to the pod <code>web-abc123</code>."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26, timeAllotted: 45,
          hintNudge: 'A dedicated subcommand attaches a label to a resource, in key=value form.',
          hintPartial: 'kubectl l____ pod web-abc123 ____=________',
          hintFull: 'kubectl label pod web-abc123 tier=frontend',
          acceptablePatterns: [],
          optimalPatterns: [/^kubectl\s+label\s+pod\s+web-abc123\s+tier=frontend$/i],
          baseCmds: ['kubectl']
        },
        {
          mode: 'terminal',
          prompt: 'The Orchestrator makes a note: <strong>"Add the annotation <code>owner=platform-team</code> to the pod <code>web-abc123</code>."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26, timeAllotted: 45,
          hintNudge: 'Same idea as labels, but the dedicated subcommand for non-identifying metadata instead.',
          hintPartial: 'kubectl a________ pod web-abc123 _____=_____________',
          hintFull: 'kubectl annotate pod web-abc123 owner=platform-team',
          acceptablePatterns: [],
          optimalPatterns: [/^kubectl\s+annotate\s+pod\s+web-abc123\s+owner=platform-team$/i],
          baseCmds: ['kubectl']
        },
        {
          mode: 'terminal',
          prompt: 'A puppet gestures at the wings: <strong>"Show recent cluster events, most recent last."</strong>',
          damageIfCorrect: 14, damageIfOptimal: 22, timeAllotted: 45,
          hintNudge: 'A resource-type keyword directly meaning "events" works with the usual get command.',
          hintPartial: 'kubectl get ______',
          hintFull: 'kubectl get events',
          acceptablePatterns: [],
          optimalPatterns: [/^kubectl\s+get\s+events$/i],
          baseCmds: ['kubectl']
        },
        {
          mode: 'spot_the_bug',
          prompt: 'The Orchestrator shows a torn script: <strong>"This Deployment\'s pods never get marked unhealthy, even when the app is clearly hung. Find and fix the bug."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 45,
          hintNudge: 'Without a livenessProbe defined at all, Kubernetes has no way to detect a hung (but still "running") process — check whether one exists.',
          hintPartial: 'There\'s no livenessProbe block anywhere in this container spec — add one so Kubernetes can actually detect and restart a hung container.',
          hintFull: 'Add this under the container spec: livenessProbe:\\n  httpGet:\\n    path: /healthz\\n    port: 8080',
          codeBlock: [
            'containers:',
            '  - name: web',
            '    image: myapp:1.0',
            '    ports:',
            '      - containerPort: 8080'
          ],
          buggyLineId: 4,
          correctFixPatterns: [/livenessProbe/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A torn thread dangles: <strong>"This Pod is rejected — the resource requests are formatted wrong. Find and fix the bug."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 45,
          hintNudge: 'CPU/memory values under resources.requests need to be QUOTED strings (like "250m" or "64Mi"), not bare unquoted values with units attached.',
          hintPartial: 'Line 2\'s cpu value is missing quotes around "250m" — Kubernetes expects a quantity string here.',
          hintFull: 'Line 2 should read: cpu: "250m"',
          codeBlock: [
            'resources:',
            '  requests:',
            '    cpu: 250m'
          ],
          buggyLineId: 2,
          correctFixPatterns: [/cpu:\s*"250m"/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'The Orchestrator\'s baton taps: <strong>"This pod fails to start — it can\'t find an environment variable it expects from a ConfigMap. Find and fix the bug."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 45,
          hintNudge: 'A configMapKeyRef needs the EXACT key name that actually exists in the ConfigMap — check whether it matches.',
          hintPartial: 'Line 3 references key "PORT_NUMBER", but the ConfigMap actually defines the key as "PORT" — configMapKeyRef needs an exact match.',
          hintFull: 'Line 3 should read: key: PORT',
          codeBlock: [
            'env:',
            '  - name: PORT',
            '    valueFrom:',
            '      configMapKeyRef:',
            '        name: app-config',
            '        key: PORT_NUMBER'
          ],
          buggyLineId: 5,
          correctFixPatterns: [/key:\s*PORT\s*$/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A puppet\'s string frays: <strong>"This Service exists but never routes any traffic to the pods. Find and fix the bug."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 45,
          hintNudge: 'A Service\'s selector has to match the pods\' actual labels EXACTLY — check for a typo or mismatch.',
          hintPartial: 'The Service selects app: web-app, but the actual pods are labeled app: web — no pod matches, so the Service has zero endpoints.',
          hintFull: 'Line 2 should read: selector: {app: web}',
          codeBlock: [
            'spec:',
            '  selector: {app: web-app}',
            '  ports:',
            '    - port: 80'
          ],
          buggyLineId: 1,
          correctFixPatterns: [/selector:\s*\{\s*app:\s*web\s*\}/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A stray thread twitches: <strong>"This Deployment sends traffic to pods before they\'re actually ready to serve it. Find and fix the bug."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 45,
          hintNudge: 'Without a readinessProbe, Kubernetes considers a pod "ready" the instant its container starts — even if the app itself is still warming up.',
          hintPartial: 'There\'s no readinessProbe defined — add one so the Service only sends traffic once the app actually reports itself ready.',
          hintFull: 'Add this under the container spec: readinessProbe:\\n  httpGet:\\n    path: /ready\\n    port: 8080',
          codeBlock: [
            'containers:',
            '  - name: web',
            '    image: myapp:1.0'
          ],
          buggyLineId: 1,
          correctFixPatterns: [/readinessProbe/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The Orchestrator tilts its mask: <strong>"You need to store a database connection string that includes a real password. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 30, timeAllotted: 45,
          hintNudge: 'One object type is meant for plain, non-sensitive configuration. One is specifically meant for sensitive values, with different handling (base64-encoded at rest, RBAC-restrictable separately).',
          hintPartial: 'A Secret is the object type specifically meant for sensitive data — a ConfigMap is meant for plain, non-sensitive configuration and shouldn\'t hold real credentials.',
          hintFull: 'Best: a Secret — it\'s specifically designed for sensitive values (encoded, separately RBAC-restrictable), unlike a ConfigMap which is meant for plain configuration and offers no such handling.',
          options: [
            { id: 'a', label: 'Store it in a ConfigMap, since it\'s just a string', tier: 'wrong', why: 'ConfigMaps are meant for non-sensitive configuration and are visible in plain text to anyone who can read ConfigMaps — real credentials don\'t belong there.' },
            { id: 'b', label: 'Store it in a Secret', tier: 'best', why: 'The object type specifically designed for sensitive data — separate RBAC permissions can be applied to Secrets distinctly from ConfigMaps, and it\'s the standard, expected place for credentials.' },
            { id: 'c', label: 'Hardcode it directly in the Deployment manifest', tier: 'wrong', why: 'Bakes the real credential into version control and every copy of the manifest — one of the most common, well-known real-world credential leaks.' }
          ],
          justificationPatterns: [/secret|sensitive|credential|rbac/i]
        },
        {
          mode: 'triage_call',
          prompt: 'A puppet gestures outward: <strong>"Deciding what a liveness probe vs. a readiness probe is each actually FOR. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 30, timeAllotted: 45,
          hintNudge: 'One probe answers "should traffic be sent here right now?" The other answers "is this container so broken it needs to be restarted?" — very different questions with very different consequences.',
          hintPartial: 'Readiness controls whether traffic gets sent to the pod at all; liveness controls whether the container gets killed and restarted — mixing them up can cause needless restarts or traffic sent to a pod that isn\'t ready.',
          hintFull: 'Best: use readinessProbe to gate whether traffic is sent to the pod (temporary "not ready yet" states shouldn\'t restart it), and livenessProbe only for genuinely hung/broken states that need a restart — conflating the two causes either premature traffic or needless restart loops.',
          options: [
            { id: 'a', label: 'Use only a livenessProbe for everything, including "should traffic be routed here"', tier: 'wrong', why: 'A liveness failure triggers a container RESTART — using it to also gate traffic routing means a temporarily-busy (not broken) pod gets needlessly killed instead of just being skipped for traffic.' },
            { id: 'b', label: 'Use readinessProbe for traffic-routing decisions and livenessProbe only for genuinely hung/broken states', tier: 'best', why: 'Matches each probe to what it actually controls — readiness gates traffic without restarting anything, liveness handles the more serious "this container is truly stuck" case.' },
            { id: 'c', label: 'Skip both probes and rely on the app crashing outright if something\'s wrong', tier: 'wrong', why: 'Misses the entire class of problems where a container is still technically running but hung or not ready — exactly what probes exist to catch that a bare crash-detection can\'t.' }
          ],
          justificationPatterns: [/readiness.*traffic|liveness.*restart|hung|gate\s*traffic/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The Orchestrator\'s voice echoes: <strong>"Deciding whether to set resource REQUESTS, LIMITS, or both on a production container. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 30, timeAllotted: 45,
          hintNudge: 'Requests affect scheduling (guaranteed minimum + where the pod can fit). Limits affect what happens if usage spikes (throttled or OOMKilled). A production workload usually benefits from both, for different reasons.',
          hintPartial: 'Set both — requests ensure the scheduler reserves real capacity for the pod, and limits prevent one runaway pod from starving every other pod on the same node.',
          hintFull: 'Best: set both requests and limits — requests give the scheduler an accurate picture for placement and guarantee a baseline, while limits protect the rest of the node from one pod consuming everything if something goes wrong.',
          options: [
            { id: 'a', label: 'Set neither — let the pod use whatever it needs', tier: 'wrong', why: 'A single runaway pod with no limits can consume all of a node\'s CPU/memory, starving every other pod scheduled on it — a well-known real production incident pattern.' },
            { id: 'b', label: 'Set both requests and limits', tier: 'best', why: 'Requests give the scheduler an accurate picture for placement and a guaranteed baseline; limits protect the rest of the node if this pod misbehaves — each serves a distinct, real purpose.' },
            { id: 'c', label: 'Set only limits, skip requests', tier: 'defensible', why: 'Still protects the node from a runaway pod, but the scheduler then has no real information for placement decisions and may over-pack a node — requests genuinely add value beyond just limits.' }
          ],
          justificationPatterns: [/both|requests.*schedul|limits.*(protect|runaway|starv)/i]
        },
        {
          mode: 'read_the_room',
          prompt: 'A puppet hangs motionless. <strong>A Service exists and looks correctly configured, but no traffic ever reaches the pods. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 20, damageIfOptimal: 34, timeAllotted: 45,
          hintNudge: 'Check whether the Service actually has any real endpoints — a Service with zero matching pods silently just drops everything sent to it.',
          hintPartial: 'kubectl get endpoints shows "none" — the Service\'s selector doesn\'t actually match any pod\'s labels, so it has nothing to route traffic to.',
          hintFull: 'Diagnosis: the Service\'s selector doesn\'t match the pods\' actual labels, so it has zero endpoints. Fix: correct the selector (or the pod labels) so they match exactly.',
          outputBlock: [
            '$ kubectl get endpoints web-svc',
            'NAME      ENDPOINTS',
            'web-svc   <none>',
            '',
            '$ kubectl get pods --show-labels',
            'web-7d8f9   app=web'
          ],
          acceptableDiagnosesPatterns: [/selector.*(mismatch|doesn'?t\s*match)/i, /no\s*endpoints/i, /zero\s*endpoints/i],
          followUpFix: {
            prompt: 'Confirm the Service\'s current selector, as the first diagnostic step:',
            acceptablePatterns: [],
            optimalPatterns: [/^kubectl\s+get\s+(service|svc)\s+web-svc\s+-o\s+yaml$/i, /^kubectl\s+describe\s+(service|svc)\s+web-svc$/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A puppet freezes mid-motion. <strong>A pod is stuck in "ImagePullBackOff", but the image name and tag look correct. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 20, damageIfOptimal: 34, timeAllotted: 45,
          hintNudge: 'If the name/tag genuinely look right, check whether the REGISTRY itself requires authentication that this pod isn\'t providing.',
          hintPartial: 'describe shows "unauthorized" — the image lives in a private registry, and the pod has no imagePullSecrets configured to authenticate to it.',
          hintFull: 'Diagnosis: the image is in a private registry and the pod has no credentials to pull it. Fix: create an imagePullSecret and reference it in the pod/deployment spec.',
          outputBlock: [
            '$ kubectl describe pod web-7d8f9',
            'Warning  Failed  kubelet  Failed to pull image: unauthorized: authentication required'
          ],
          acceptableDiagnosesPatterns: [/private\s*registry/i, /no\s*(pull\s*)?credentials/i, /imagePullSecret/i, /unauthorized/i],
          followUpFix: {
            prompt: 'Create the missing registry credential as an imagePullSecret:',
            acceptablePatterns: [],
            optimalPatterns: [/kubectl\s+create\s+secret\s+docker-registry/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A string catches, refusing to move. <strong>A Deployment\'s rollout is stuck — new pods start but never become "Ready". Diagnose it, then fix it.</strong>',
          damageIfCorrect: 20, damageIfOptimal: 34, timeAllotted: 45,
          hintNudge: 'A rollout waits for new pods to pass their readiness probe before considering itself progressed — check whether that probe is actually succeeding.',
          hintPartial: 'describe shows the readiness probe repeatedly failing (connection refused) — the app isn\'t actually listening on the port/path the probe expects.',
          hintFull: 'Diagnosis: the readiness probe is failing (wrong port or path), so new pods never register as Ready and the rollout stalls. Fix: correct the readinessProbe\'s port/path to match what the app actually serves.',
          outputBlock: [
            '$ kubectl rollout status deployment/web',
            'Waiting for deployment "web" rollout to finish: 1 old replicas are pending termination...',
            '',
            '$ kubectl describe pod web-9f2a1',
            'Warning  Unhealthy  Readiness probe failed: connection refused'
          ],
          acceptableDiagnosesPatterns: [/readiness\s*probe.*fail/i, /wrong\s*(port|path)/i, /probe.*connection\s*refused/i],
          followUpFix: {
            prompt: 'Fix the readinessProbe config to match what the app actually serves:',
            acceptablePatterns: [],
            optimalPatterns: [/readinessProbe/i]
          }
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'The Orchestrator raises both hands. <strong>Sequence the correct order for rolling out an update to a Deployment safely.</strong>',
          steps: [
            'kubectl set image (or apply the updated manifest)',
            'kubectl rollout status to watch progress',
            'Confirm new pods are Ready',
            'kubectl rollout undo immediately if anything looks wrong'
          ],
          damageIfCorrect: 22, damageIfOptimal: 36,
          damageToHeroIfWrong: 20
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'A string pulls taut. <strong>Sequence the correct order for setting up an app that needs both a ConfigMap and a Secret.</strong>',
          steps: [
            'Create the ConfigMap for non-sensitive config',
            'Create the Secret for sensitive values',
            'Reference both in the Deployment\'s pod spec',
            'kubectl apply and confirm the pod starts with both mounted/injected correctly'
          ],
          damageIfCorrect: 22, damageIfOptimal: 36,
          damageToHeroIfWrong: 20
        }
      ]
    },
    {
      name: 'Level 3 — Advanced Basics',
      hp: 140,
      questions: [
        {
          mode: 'terminal',
          prompt: 'The Orchestrator gestures at storage crates: <strong>"List every PersistentVolumeClaim in the current namespace."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28, timeAllotted: 40,
          hintNudge: 'Same get pattern, resource type "pvc" (the short name for PersistentVolumeClaim).',
          hintPartial: 'kubectl get ___',
          hintFull: 'kubectl get pvc',
          acceptablePatterns: [/^kubectl\s+get\s+persistentvolumeclaims?$/i],
          optimalPatterns: [/^kubectl\s+get\s+pvc$/i],
          baseCmds: ['kubectl']
        },
        {
          mode: 'terminal',
          prompt: 'A string hums with weight: <strong>"Create the PersistentVolumeClaim defined in <code>pvc.yaml</code>."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26, timeAllotted: 40,
          hintNudge: 'The same apply-from-file pattern used for every other manifest.',
          hintPartial: 'kubectl _____ -f pvc.yaml',
          hintFull: 'kubectl apply -f pvc.yaml',
          acceptablePatterns: [/^kubectl\s+create\s+-f\s+pvc\.yaml$/i],
          optimalPatterns: [/^kubectl\s+apply\s+-f\s+pvc\.yaml$/i],
          baseCmds: ['kubectl']
        },
        {
          mode: 'terminal',
          prompt: 'The Orchestrator points to the entrance: <strong>"List every Ingress resource in the current namespace."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26, timeAllotted: 40,
          hintNudge: 'Same get pattern, resource type "ingress."',
          hintPartial: 'kubectl get _______',
          hintFull: 'kubectl get ingress',
          acceptablePatterns: [],
          optimalPatterns: [/^kubectl\s+get\s+ingress$/i],
          baseCmds: ['kubectl']
        },
        {
          mode: 'terminal',
          prompt: 'A puppet stretches taller: <strong>"Set up autoscaling for the Deployment <code>web</code>, between 2 and 10 replicas, targeting 70% CPU."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 40,
          hintNudge: 'A dedicated autoscale subcommand, with min/max replica flags and a CPU-percent flag.',
          hintPartial: 'kubectl autoscale deployment web --___=2 --___=10 --cpu-percent=__',
          hintFull: 'kubectl autoscale deployment web --min=2 --max=10 --cpu-percent=70',
          acceptablePatterns: [],
          optimalPatterns: [/^kubectl\s+autoscale\s+deployment\s+web\s+--min=2\s+--max=10\s+--cpu-percent=70$/i],
          baseCmds: ['kubectl']
        },
        {
          mode: 'terminal',
          prompt: 'The Orchestrator watches the scaling: <strong>"List every HorizontalPodAutoscaler in the current namespace."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26, timeAllotted: 40,
          hintNudge: 'Same get pattern, resource type "hpa" (the short name).',
          hintPartial: 'kubectl get ___',
          hintFull: 'kubectl get hpa',
          acceptablePatterns: [],
          optimalPatterns: [/^kubectl\s+get\s+hpa$/i],
          baseCmds: ['kubectl']
        },
        {
          mode: 'terminal',
          prompt: 'A string tightens with authority: <strong>"List every Role and RoleBinding in the current namespace."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28, timeAllotted: 40,
          hintNudge: 'Two resource types, comma-separated, in the same get command.',
          hintPartial: 'kubectl get ____,___________',
          hintFull: 'kubectl get roles,rolebindings',
          acceptablePatterns: [],
          optimalPatterns: [/^kubectl\s+get\s+roles,\s*rolebindings$/i],
          baseCmds: ['kubectl']
        },
        {
          mode: 'terminal',
          prompt: 'The Orchestrator raises a questioning hand: <strong>"Check whether YOU are allowed to delete pods in the current namespace, without actually trying it."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 40,
          hintNudge: 'A dedicated auth-checking subcommand answers exactly this "am I allowed to..." question, safely, without performing the action.',
          hintPartial: 'kubectl auth c__-i delete pods',
          hintFull: 'kubectl auth can-i delete pods',
          acceptablePatterns: [],
          optimalPatterns: [/^kubectl\s+auth\s+can-i\s+delete\s+pods$/i],
          baseCmds: ['kubectl']
        },
        {
          mode: 'terminal',
          prompt: 'A puppet stands rigid in a row: <strong>"List every StatefulSet in the current namespace."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28, timeAllotted: 40,
          hintNudge: 'Same get pattern, resource type "statefulset."',
          hintPartial: 'kubectl get ____________',
          hintFull: 'kubectl get statefulset',
          acceptablePatterns: [],
          optimalPatterns: [/^kubectl\s+get\s+statefulsets?$/i],
          baseCmds: ['kubectl']
        },
        {
          mode: 'terminal',
          prompt: 'The Orchestrator narrows in on one voice: <strong>"Get a shell inside just ONE specific container, <code>sidecar</code>, in the multi-container pod <code>web-abc123</code>."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 40,
          hintNudge: 'exec has a container-targeting flag for exactly this, when a pod has more than one container.',
          hintPartial: 'kubectl exec -it web-abc123 -_ ________ -- bash',
          hintFull: 'kubectl exec -it web-abc123 -c sidecar -- bash',
          acceptablePatterns: [],
          optimalPatterns: [/^kubectl\s+exec\s+-it\s+web-abc123\s+-c\s+sidecar\s+--\s+bash$/i],
          baseCmds: ['kubectl']
        },
        {
          mode: 'spot_the_bug',
          prompt: 'The Orchestrator shows a torn script: <strong>"This PVC is rejected — a required field is missing. Find and fix the bug."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36, timeAllotted: 40,
          hintNudge: 'A PVC needs to declare accessModes — without it, Kubernetes has no idea how the volume is meant to be mounted (read-write by one node, many nodes, etc).',
          hintPartial: 'Line 2 has no accessModes field at all — add one declaring how this volume should be mountable.',
          hintFull: 'Line 2 should read: accessModes: [ReadWriteOnce]',
          codeBlock: [
            'spec:',
            '  resources:',
            '    requests: {storage: 10Gi}'
          ],
          buggyLineId: 1,
          correctFixPatterns: [/accessModes:\s*\[\s*ReadWriteOnce\s*\]/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A torn thread dangles: <strong>"This Role grants access, but a user still gets \'forbidden\' trying to read pod logs. Find and fix the bug."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36, timeAllotted: 40,
          hintNudge: 'A Role\'s rules need the right resource named explicitly — "pods" and "pods/log" are actually two DIFFERENT sub-resources in RBAC.',
          hintPartial: 'Line 3 only grants access to "pods", not "pods/log" — reading logs is a separate sub-resource that needs its own explicit grant.',
          hintFull: 'Line 3 should read: resources: ["pods", "pods/log"]',
          codeBlock: [
            'rules:',
            '  - apiGroups: [""]',
            '    resources: ["pods"]',
            '    verbs: ["get", "list"]'
          ],
          buggyLineId: 2,
          correctFixPatterns: [/resources:\s*\[\s*"pods"\s*,\s*"pods\/log"\s*\]/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'The Orchestrator\'s baton taps twice: <strong>"This Ingress is created but every request returns 404. Find and fix the bug."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36, timeAllotted: 40,
          hintNudge: 'The pathType field controls exactly how the path is matched — "Exact" only matches that EXACT path, not anything beneath it.',
          hintPartial: 'Line 2\'s pathType is "Exact", meaning only the literal "/" path matches — nothing else on the site resolves. "Prefix" matches everything starting with that path.',
          hintFull: 'Line 2 should read: pathType: Prefix',
          codeBlock: [
            'paths:',
            '  - path: /',
            '    pathType: Exact',
            '    backend: {service: {name: web-svc, port: {number: 80}}}'
          ],
          buggyLineId: 1,
          correctFixPatterns: [/pathType:\s*Prefix/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A puppet\'s string frays: <strong>"This HorizontalPodAutoscaler never actually scales anything. Find and fix the bug."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36, timeAllotted: 40,
          hintNudge: 'An HPA needs an actual target metric threshold defined — without one, it has no trigger condition to scale on at all.',
          hintPartial: 'There\'s no metrics/target block at all — add a target CPU utilization percentage so the HPA has something to actually scale against.',
          hintFull: 'Add under spec: metrics:\\n  - type: Resource\\n    resource: {name: cpu, target: {type: Utilization, averageUtilization: 70}}',
          codeBlock: [
            'spec:',
            '  scaleTargetRef: {kind: Deployment, name: web}',
            '  minReplicas: 2',
            '  maxReplicas: 10'
          ],
          buggyLineId: 3,
          correctFixPatterns: [/metrics:/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A stray thread twitches: <strong>"This StatefulSet\'s pods never get stable network identities. Find and fix the bug."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36, timeAllotted: 40,
          hintNudge: 'A StatefulSet requires a serviceName field pointing at a headless Service — without it, there\'s no stable DNS identity mechanism at all.',
          hintPartial: 'There\'s no serviceName field in this spec — a StatefulSet needs one pointing at a headless Service to give each pod a stable DNS name.',
          hintFull: 'Add under spec: serviceName: web-headless',
          codeBlock: [
            'spec:',
            '  replicas: 3',
            '  selector: {matchLabels: {app: web}}'
          ],
          buggyLineId: 1,
          correctFixPatterns: [/serviceName:/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The Orchestrator tilts its mask: <strong>"Choosing between a Deployment and a StatefulSet for a clustered database with 3 replicas that each need their own persistent identity. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 34, timeAllotted: 40,
          hintNudge: 'One controller\'s pods are interchangeable clones with random names. One controller gives each pod a stable, predictable identity and its own dedicated storage.',
          hintPartial: 'A StatefulSet gives each replica a stable name and its own PersistentVolumeClaim — exactly what a clustered database (where each node has its own distinct data) needs.',
          hintFull: 'Best: a StatefulSet — it provides stable, predictable pod identities and per-pod persistent storage, which a Deployment (interchangeable, identity-less replicas) doesn\'t provide at all.',
          options: [
            { id: 'a', label: 'A Deployment with 3 replicas', tier: 'wrong', why: 'Deployment replicas are interchangeable and identity-less — a clustered database where each node has its own distinct data and identity needs exactly what Deployments don\'t provide.' },
            { id: 'b', label: 'A StatefulSet with 3 replicas', tier: 'best', why: 'Gives each pod a stable, predictable name and its own dedicated PersistentVolumeClaim — exactly matching a clustered database\'s need for per-node identity and storage.' },
            { id: 'c', label: 'Three separate, individually-managed Deployments, one per database node', tier: 'defensible', why: 'Would technically give each its own identity, but reinvents (with much more manual management) what StatefulSet already does natively and more reliably.' }
          ],
          justificationPatterns: [/statefulset|stable\s*identity|per.?pod\s*storage|persistent\s*identity/i]
        },
        {
          mode: 'triage_call',
          prompt: 'A puppet gestures outward: <strong>"Choosing an HPA scaling metric for a CPU-bound web service vs. a queue-processing worker. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 34, timeAllotted: 40,
          hintNudge: 'The right metric should reflect what ACTUALLY indicates load for each workload — CPU usage genuinely tracks web request load, but a queue worker\'s real bottleneck might be queue depth, not CPU.',
          hintPartial: 'CPU utilization is a reasonable, standard metric for a CPU-bound web service; for a queue worker, a custom metric like queue length often reflects real load more directly than CPU.',
          hintFull: 'Best: CPU utilization for the CPU-bound web service (it genuinely tracks its load); for the queue worker, prefer a custom metric like queue depth if available, since CPU may stay low even while a large backlog builds up.',
          options: [
            { id: 'a', label: 'Use CPU utilization for both workloads', tier: 'defensible', why: 'Reasonable for the web service, but for a queue worker, CPU can look low even while a real backlog is building — a custom queue-depth metric would trigger scaling more accurately.' },
            { id: 'b', label: 'CPU utilization for the web service, a custom queue-depth metric for the worker', tier: 'best', why: 'Matches each metric to what actually reflects real load for that specific workload — CPU for a CPU-bound service, backlog size for a queue-driven one.' },
            { id: 'c', label: 'Scale both manually based on a fixed weekly schedule instead of any live metric', tier: 'wrong', why: 'Ignores actual real-time load entirely — a schedule can\'t react to an unexpected traffic spike or backlog the way a live metric-driven HPA can.' }
          ],
          justificationPatterns: [/cpu.*(web|http)|queue\s*depth|custom\s*metric|actual\s*load/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The Orchestrator\'s voice deepens: <strong>"Choosing the reclaim policy for a PersistentVolume backing a production database. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 34, timeAllotted: 40,
          hintNudge: 'One reclaim policy automatically wipes the underlying storage the moment its claim is deleted. One preserves the data, requiring a deliberate, separate step to actually delete it.',
          hintPartial: 'A "Retain" policy keeps the underlying data even if the PVC is deleted, requiring a deliberate manual step to actually erase it — much safer for production data than automatic deletion.',
          hintFull: 'Best: Retain — for production database data, an accidental PVC deletion (typo, bad automation, mistaken cleanup) should never silently and immediately destroy the underlying data; Retain requires a deliberate, separate action to actually delete it.',
          options: [
            { id: 'a', label: 'Delete — automatically wipe the underlying storage when the PVC is deleted', tier: 'wrong', why: 'An accidental PVC deletion (a typo, bad automation, mistaken cleanup script) immediately and irreversibly destroys real production data with this policy — far too risky for a database.' },
            { id: 'b', label: 'Retain — keep the underlying storage even after the PVC is deleted', tier: 'best', why: 'Requires a deliberate, separate action to actually erase the data — protects against exactly the kind of accidental deletion that would otherwise be catastrophic for production data.' },
            { id: 'c', label: 'Recycle — basic scrub and make the volume available for reuse', tier: 'wrong', why: 'Recycle is deprecated and, like Delete, removes the existing data automatically — not appropriate for data you specifically want protected against accidental loss.' }
          ],
          justificationPatterns: [/retain|deliberate|accidental\s*deletion|protect.*data/i]
        },
        {
          mode: 'triage_call',
          prompt: 'A slab grinds within the stage: <strong>"Choosing whether to expose a service via a plain LoadBalancer Service or via an Ingress. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 34, timeAllotted: 40,
          hintNudge: 'One approach provisions a separate, real cloud load balancer PER service — expensive and repetitive at scale. One approach can route many services through ONE entry point based on path/host rules.',
          hintPartial: 'An Ingress lets many services share ONE load balancer/entry point, routed by hostname or path — far more efficient than a dedicated LoadBalancer Service per service when you have several to expose.',
          hintFull: 'Best: for multiple HTTP(S) services, an Ingress is usually the better fit — it consolidates routing (by host/path) through one entry point and one load balancer, instead of provisioning (and paying for) a separate cloud load balancer per service.',
          options: [
            { id: 'a', label: 'Give every service its own LoadBalancer-type Service', tier: 'defensible', why: 'Works, but provisions (and typically pays for) a separate real cloud load balancer per service — expensive and unnecessary when several services could share one entry point.' },
            { id: 'b', label: 'Use one Ingress routing to multiple services by host/path', tier: 'best', why: 'Consolidates routing for multiple HTTP(S) services behind a single load balancer/entry point — the standard, more efficient pattern once you have more than one or two services to expose.' },
            { id: 'c', label: 'Use NodePort Services and put a hand-rolled reverse proxy in front', tier: 'wrong', why: 'Reinvents, with far more manual setup and maintenance, exactly what Ingress already does as a native, well-supported Kubernetes primitive.' }
          ],
          justificationPatterns: [/ingress|consolidat|one\s*(entry\s*point|load\s*balancer)|multiple\s*services/i]
        },
        {
          mode: 'read_the_room',
          prompt: 'A puppet hangs motionless. <strong>A PersistentVolumeClaim has been stuck "Pending" for a long time. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36, timeAllotted: 40,
          hintNudge: 'A PVC stuck Pending usually means no PersistentVolume (or dynamic provisioner/StorageClass) exists that actually matches what it\'s asking for.',
          hintPartial: 'describe shows "no persistent volumes available for this claim" — nothing in the cluster satisfies the requested storage class and size.',
          hintFull: 'Diagnosis: no matching PersistentVolume or StorageClass exists to satisfy this claim. Fix: either create a matching PV, or confirm the StorageClass name is correct and its provisioner is actually working.',
          outputBlock: [
            '$ kubectl get pvc',
            'data-pvc   Pending',
            '',
            '$ kubectl describe pvc data-pvc',
            'Warning  FailedBinding  no persistent volumes available for this claim and no storage class is set'
          ],
          acceptableDiagnosesPatterns: [/no\s*(matching\s*)?(pv|persistent\s*volume|storage\s*class)/i, /nothing\s*(satisfies|matches)/i],
          followUpFix: {
            prompt: 'Check what storage classes actually exist in the cluster, as the first diagnostic step:',
            acceptablePatterns: [],
            optimalPatterns: [/^kubectl\s+get\s+(storageclass|sc)$/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A puppet freezes mid-motion. <strong>An Ingress is configured, but requests to the expected URL return a 404 from the Ingress controller itself. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36, timeAllotted: 40,
          hintNudge: 'A 404 from the Ingress CONTROLLER (not the app) usually means the Ingress\'s own routing rule (host or path) doesn\'t actually match the request being sent.',
          hintPartial: 'The Ingress rule is configured for host "app.example.com", but requests are being sent to "www.example.com" — the hostname doesn\'t match the rule at all.',
          hintFull: 'Diagnosis: the request\'s hostname doesn\'t match any rule in the Ingress. Fix: correct the Ingress rule\'s host field (or the DNS/request) so they actually match.',
          outputBlock: [
            '$ curl -H "Host: www.example.com" http://ingress-ip/',
            '404 Not Found (from nginx ingress controller, not the app)',
            '',
            '$ kubectl get ingress web-ingress -o yaml',
            'rules: [{host: app.example.com, ...}]'
          ],
          acceptableDiagnosesPatterns: [/host(name)?\s*(doesn'?t\s*match|mismatch)/i, /wrong\s*host/i],
          followUpFix: {
            prompt: 'Fix the Ingress rule\'s host to match the actual hostname being used:',
            acceptablePatterns: [],
            optimalPatterns: [/host:\s*www\.example\.com/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A string catches, refusing to move. <strong>An HorizontalPodAutoscaler shows "unknown" for current CPU usage and never scales. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36, timeAllotted: 40,
          hintNudge: 'An HPA needs a live source of resource metrics to make any scaling decision at all — check whether that source is actually running in the cluster.',
          hintPartial: 'describe shows the HPA can\'t get any metrics at all — the metrics-server component (which HPA relies on for CPU/memory data) isn\'t installed or isn\'t running.',
          hintFull: 'Diagnosis: metrics-server isn\'t installed/running, so the HPA has no CPU data to scale on. Fix: install (or restart) metrics-server in the cluster.',
          outputBlock: [
            '$ kubectl get hpa',
            'web-hpa   <unknown>/70%   2   10   2',
            '',
            '$ kubectl top pods',
            'error: Metrics API not available'
          ],
          acceptableDiagnosesPatterns: [/metrics.?server/i, /no\s*metrics/i, /metrics\s*api\s*(not\s*available|missing)/i],
          followUpFix: {
            prompt: 'Confirm whether metrics-server is even running in the cluster:',
            acceptablePatterns: [],
            optimalPatterns: [/^kubectl\s+get\s+(pods|deployment)\s+-n\s+kube-system\s*\|\s*grep\s+metrics-server$/i, /^kubectl\s+get\s+deployment\s+metrics-server\s+-n\s+kube-system$/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A puppet\'s hand freezes mid-gesture. <strong>A user is denied with "forbidden" trying to run a normal kubectl command, despite having a RoleBinding assigned. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36, timeAllotted: 40,
          hintNudge: 'Check exactly what the bound Role actually GRANTS — having any RoleBinding at all doesn\'t mean it grants the specific verb/resource being attempted.',
          hintPartial: 'The bound Role only grants "get" and "list" on pods — the user is attempting "delete", which was never included in the Role\'s rules at all.',
          hintFull: 'Diagnosis: the Role bound to the user doesn\'t include the specific verb (delete) being attempted. Fix: add the missing verb to the Role\'s rules (or bind a different Role that already includes it).',
          outputBlock: [
            '$ kubectl delete pod web-7d8f9',
            'Error from server (Forbidden): pods "web-7d8f9" is forbidden: User cannot delete resource "pods"',
            '',
            '$ kubectl get role viewer-role -o yaml',
            'rules: [{resources: ["pods"], verbs: ["get", "list"]}]'
          ],
          acceptableDiagnosesPatterns: [/role.*(doesn'?t\s*(include|grant)|missing)\s*(the\s*)?verb/i, /rbac.*missing/i],
          followUpFix: {
            prompt: 'Fix it by adding the missing verb to the Role\'s rules:',
            acceptablePatterns: [],
            optimalPatterns: [/verbs:.*delete/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A final string trembles. <strong>A StatefulSet\'s pods are stuck, unable to resolve each other\'s hostnames. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36, timeAllotted: 40,
          hintNudge: 'A StatefulSet\'s stable DNS names depend entirely on a HEADLESS Service (clusterIP: None) existing with the matching serviceName — check whether that Service actually exists.',
          hintPartial: 'The StatefulSet references serviceName: web-headless, but no such Service actually exists in the cluster — without it, there\'s no DNS record mechanism for the pods at all.',
          hintFull: 'Diagnosis: the headless Service the StatefulSet depends on for stable DNS doesn\'t exist. Fix: create a headless Service (clusterIP: None) named to match the StatefulSet\'s serviceName field.',
          outputBlock: [
            '$ kubectl exec web-0 -- nslookup web-1.web-headless',
            'nslookup: can\'t resolve \'web-1.web-headless\'',
            '',
            '$ kubectl get service web-headless',
            'Error from server (NotFound): services "web-headless" not found'
          ],
          acceptableDiagnosesPatterns: [/headless\s*service.*(missing|doesn'?t\s*exist|not\s*found)/i, /no\s*headless\s*service/i],
          followUpFix: {
            prompt: 'Create the missing headless Service (clusterIP: None) that the StatefulSet needs:',
            acceptablePatterns: [],
            optimalPatterns: [/clusterIP:\s*None/i]
          }
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'The Orchestrator raises both hands. <strong>Sequence the correct order for setting up an Ingress with TLS for a service.</strong>',
          steps: [
            'Obtain/create a TLS certificate and key',
            'Create a Secret of type kubernetes.io/tls from it',
            'Reference that Secret in the Ingress\'s tls section',
            'Apply the Ingress and confirm HTTPS works'
          ],
          damageIfCorrect: 24, damageIfOptimal: 40,
          damageToHeroIfWrong: 22
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'A string pulls taut. <strong>Sequence the correct order for setting up autoscaling for a Deployment.</strong>',
          steps: [
            'Confirm metrics-server is installed and working',
            'Set resource requests on the Deployment\'s containers (HPA needs these to calculate utilization)',
            'Create the HorizontalPodAutoscaler with min/max replicas and a target metric',
            'Generate load and confirm it actually scales up'
          ],
          damageIfCorrect: 24, damageIfOptimal: 40,
          damageToHeroIfWrong: 22
        }
      ]
    },
    {
      name: 'Level 4 — Real Incidents',
      hp: 160,
      questions: [
        {
          mode: 'terminal',
          prompt: 'The Orchestrator surveys the stage floor: <strong>"Show full details and recent conditions for the node <code>node-3</code>."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28, timeAllotted: 32,
          hintNudge: 'The same describe pattern used for pods, just targeting a node instead.',
          hintPartial: 'kubectl des_____ node node-3',
          hintFull: 'kubectl describe node node-3',
          acceptablePatterns: [],
          optimalPatterns: [/^kubectl\s+describe\s+node\s+node-3$/i],
          baseCmds: ['kubectl']
        },
        {
          mode: 'terminal',
          prompt: 'A string pulls a puppet aside: <strong>"Mark node <code>node-3</code> as unschedulable, without evicting anything already running on it."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28, timeAllotted: 32,
          hintNudge: 'A dedicated subcommand blocks NEW pods from scheduling there, while leaving existing pods untouched.',
          hintPartial: 'kubectl c_____ node-3',
          hintFull: 'kubectl cordon node-3',
          acceptablePatterns: [],
          optimalPatterns: [/^kubectl\s+cordon\s+node-3$/i],
          baseCmds: ['kubectl']
        },
        {
          mode: 'terminal',
          prompt: 'The Orchestrator waves the puppet fully off-stage: <strong>"Safely evict every pod off node <code>node-3</code>, so it can be taken down for maintenance."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 32,
          hintNudge: 'A dedicated subcommand does the full "cordon + gracefully evict everything" sequence in one command.',
          hintPartial: 'kubectl d____ node-3 --_______-______',
          hintFull: 'kubectl drain node-3 --ignore-daemonsets',
          acceptablePatterns: [/^kubectl\s+drain\s+node-3$/i],
          optimalPatterns: [/^kubectl\s+drain\s+node-3\s+--ignore-daemonsets$/i],
          baseCmds: ['kubectl']
        },
        {
          mode: 'terminal',
          prompt: 'A puppet strains under weight: <strong>"Show live CPU/memory usage for every node."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26, timeAllotted: 32,
          hintNudge: 'Same top pattern as pods, scoped to nodes instead.',
          hintPartial: 'kubectl t__ nodes',
          hintFull: 'kubectl top nodes',
          acceptablePatterns: [],
          optimalPatterns: [/^kubectl\s+top\s+nodes$/i],
          baseCmds: ['kubectl']
        },
        {
          mode: 'terminal',
          prompt: 'The Orchestrator raises a warding hand: <strong>"List every NetworkPolicy in the current namespace."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28, timeAllotted: 32,
          hintNudge: 'Same get pattern, resource type "networkpolicy."',
          hintPartial: 'kubectl get ______________',
          hintFull: 'kubectl get networkpolicy',
          acceptablePatterns: [],
          optimalPatterns: [/^kubectl\s+get\s+networkpolic(y|ies)$/i],
          baseCmds: ['kubectl']
        },
        {
          mode: 'terminal',
          prompt: 'A string retraces its own steps: <strong>"Show the full rollout history for the Deployment <code>web</code>."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28, timeAllotted: 32,
          hintNudge: 'The rollout subcommand family also has a "history" action.',
          hintPartial: 'kubectl rollout _______ deployment web',
          hintFull: 'kubectl rollout history deployment web',
          acceptablePatterns: [],
          optimalPatterns: [/^kubectl\s+rollout\s+history\s+deployment\/?\s*web$/i],
          baseCmds: ['kubectl']
        },
        {
          mode: 'terminal',
          prompt: 'The Orchestrator points at a stack of scrolls: <strong>"List only pods that are NOT in the Running phase, across the whole namespace."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 32,
          hintNudge: 'A field-selector flag can filter kubectl get by a field like status.phase, using a "not-equal" comparison.',
          hintPartial: 'kubectl get pods --_____-________=status.phase!=_______',
          hintFull: 'kubectl get pods --field-selector=status.phase!=Running',
          acceptablePatterns: [],
          optimalPatterns: [/^kubectl\s+get\s+pods\s+--field-selector=status\.phase!=Running$/i],
          baseCmds: ['kubectl']
        },
        {
          mode: 'terminal',
          prompt: 'A puppet collapses, unresponsive: <strong>"Force-delete a stuck pod <code>web-abc123</code> that won\'t terminate normally."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 32,
          hintNudge: 'Combine the usual delete with a zero grace-period and a force flag.',
          hintPartial: 'kubectl delete pod web-abc123 --grace-period=_ --_____',
          hintFull: 'kubectl delete pod web-abc123 --grace-period=0 --force',
          acceptablePatterns: [],
          optimalPatterns: [/^kubectl\s+delete\s+pod\s+web-abc123\s+--grace-period=0\s+--force$/i],
          baseCmds: ['kubectl']
        },
        {
          mode: 'spot_the_bug',
          prompt: 'The Orchestrator shows a torn script: <strong>"This NetworkPolicy meant to isolate a namespace ALSO accidentally blocks pods from talking to each other WITHIN that same namespace. Find and fix the bug."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 32,
          hintNudge: 'An ingress rule with an empty podSelector under "from" only allows traffic from pods matching nothing — check whether same-namespace traffic is actually permitted anywhere in the rule.',
          hintPartial: 'Line 2\'s ingress block only allows a specific external CIDR — nothing in this policy permits traffic from other pods in the SAME namespace, which is why internal pod-to-pod calls now fail too.',
          hintFull: 'Add a second "from" entry allowing same-namespace traffic: - from: [{podSelector: {}}]',
          codeBlock: [
            'spec:',
            '  ingress:',
            '    - from: [{ipBlock: {cidr: 10.0.0.0/24}}]'
          ],
          buggyLineId: 1,
          correctFixPatterns: [/podSelector:\s*\{\s*\}/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A torn thread dangles: <strong>"This pod is killed mid-shutdown, losing in-flight requests every time it\'s replaced. Find and fix the bug."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 32,
          hintNudge: 'The default grace period for a pod to shut down cleanly is short — if the app genuinely needs longer to drain in-flight requests, that window needs to be explicitly extended.',
          hintPartial: 'There\'s no terminationGracePeriodSeconds set, so the app only gets the short default window to shut down before being force-killed — not enough time to drain in-flight requests.',
          hintFull: 'Add under spec: terminationGracePeriodSeconds: 60',
          codeBlock: [
            'spec:',
            '  containers:',
            '    - name: web'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/terminationGracePeriodSeconds/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'The Orchestrator\'s baton taps: <strong>"This pod is never scheduled — it stays Pending forever, on a cluster with plenty of free capacity. Find and fix the bug."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 32,
          hintNudge: 'A nodeSelector requires a node with an EXACT matching label — check whether the label being requested actually exists on any real node.',
          hintPartial: 'Line 2\'s nodeSelector asks for disktype: ssdd (a typo) — no real node has that exact label, only "ssd", so the scheduler can never place it.',
          hintFull: 'Line 2 should read: disktype: ssd',
          codeBlock: [
            'spec:',
            '  nodeSelector: {disktype: ssdd}'
          ],
          buggyLineId: 1,
          correctFixPatterns: [/nodeSelector:\s*\{\s*disktype:\s*ssd\s*\}/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A puppet\'s string frays: <strong>"A PodDisruptionBudget meant to protect a service during voluntary maintenance is instead blocking EVERY node drain in the cluster. Find and fix the bug."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 32,
          hintNudge: 'A minAvailable set equal to (or higher than) the total replica count leaves the PDB zero room to ever allow even one voluntary disruption.',
          hintPartial: 'Line 2 sets minAvailable to 3, but the Deployment also only has 3 replicas total — the PDB permits ZERO of them to ever be disrupted, blocking every drain that touches this app.',
          hintFull: 'Line 2 should read: minAvailable: 2 (leaving at least one pod\'s worth of room for a voluntary disruption)',
          codeBlock: [
            'spec:',
            '  minAvailable: 3',
            '  selector: {matchLabels: {app: web}}'
          ],
          buggyLineId: 1,
          correctFixPatterns: [/minAvailable:\s*2$/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The Orchestrator tilts its mask: <strong>"A pod is repeatedly OOMKilled under real production load. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 38, timeAllotted: 32,
          hintNudge: 'The right fix depends entirely on WHY it\'s using that much memory — is the limit just genuinely too low for legitimate usage, or is something actually leaking?',
          hintPartial: 'Check the app\'s actual memory usage pattern over time first — a steadily climbing trend suggests a real leak (raising the limit just delays the same crash), while a consistently-near-limit steady usage suggests the limit is just set too low.',
          hintFull: 'Best: check the actual usage PATTERN first (kubectl top / metrics over time) — a real leak needs an application fix (raising the limit only delays the same crash later), while genuinely-too-low legitimate usage just needs the limit raised to match real need.',
          options: [
            { id: 'a', label: 'Immediately raise the memory limit as high as needed to stop the OOMKills', tier: 'wrong', why: 'If the real cause is a memory leak, this just delays the same crash to a later, possibly worse moment — it doesn\'t fix anything, it just buys time before it happens again.' },
            { id: 'b', label: 'Check the actual usage pattern over time first, then decide between raising the limit or fixing a leak', tier: 'best', why: 'A genuinely climbing-forever pattern points at a real leak needing an app fix; a consistently-near-limit-but-stable pattern points at a limit that\'s simply set too low — the pattern tells you which fix is actually correct.' },
            { id: 'c', label: 'Restart the pod on a schedule to keep memory usage bounded, and move on', tier: 'defensible', why: 'A real, sometimes-necessary mitigation for a genuine leak while it gets properly fixed, but treating it as the permanent solution (rather than a stopgap) leaves the actual root cause unaddressed indefinitely.' }
          ],
          justificationPatterns: [/usage\s*pattern|leak|climbing|check\s*first|over\s*time/i]
        },
        {
          mode: 'triage_call',
          prompt: 'A puppet gestures outward: <strong>"A node just transitioned to \'NotReady\'. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 38, timeAllotted: 32,
          hintNudge: 'Kubernetes itself already has a built-in mechanism for eventually rescheduling pods off a truly-dead node — the more useful immediate action is understanding WHY it went NotReady, not rushing to force pods off it.',
          hintPartial: 'Check the node\'s actual condition/events first (kubelet down? network partition? resource pressure?) — Kubernetes will already reschedule pods off it automatically after its own toleration period if it\'s genuinely unreachable.',
          hintFull: 'Best: investigate the node\'s actual condition first (describe node, check kubelet/network status) — Kubernetes already handles eventually rescheduling pods off a truly-dead node on its own; understanding the real cause first avoids either under-reacting to something serious or over-reacting to a brief blip.',
          options: [
            { id: 'a', label: 'Immediately force-delete every pod on that node', tier: 'wrong', why: 'Kubernetes already handles rescheduling automatically after its own toleration period — forcing it immediately, before understanding whether this is a brief blip or a real failure, can cause unnecessary churn or even data issues for stateful pods.' },
            { id: 'b', label: 'Investigate the node\'s actual condition and events first, before taking action', tier: 'best', why: 'A NotReady node can mean many different things (kubelet crash, network partition, disk pressure) — understanding which one it actually is determines whether any manual action is even needed, since Kubernetes already handles the common case on its own.' },
            { id: 'c', label: 'Immediately reboot the node without checking anything first', tier: 'wrong', why: 'Acts before understanding the cause — if it\'s a network partition rather than a node problem, rebooting does nothing and may not even be possible to trigger remotely.' }
          ],
          justificationPatterns: [/investigate|check\s*(the\s*)?(node.s\s*)?condition|kubernetes\s*already|before\s*acting/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The Orchestrator\'s voice deepens: <strong>"A sudden, large traffic spike just hit, and autoscaling hasn\'t caught up yet. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 38, timeAllotted: 32,
          hintNudge: 'Waiting for HPA to gradually react has real lag (metric collection interval + scale-up time) — a manual intervention can close that immediate gap while HPA catches up on its own.',
          hintPartial: 'Manually scale up replicas right now to close the immediate gap — HPA will continue managing it afterward once its own metrics catch up, this isn\'t a conflict, just a faster stopgap for the current spike.',
          hintFull: 'Best: manually scale up replicas immediately to relieve current pressure — HPA has real lag (metric collection + scale-up time) that a manual bump can bypass for the urgent moment, and HPA will simply take back over once its own metrics reflect the new load.',
          options: [
            { id: 'a', label: 'Wait for the HPA to react on its own, since it\'s already configured', tier: 'wrong', why: 'HPA has real lag from metric collection intervals and gradual scale-up steps — passively waiting during an active traffic spike leaves users hitting a genuinely under-capacity service longer than necessary.' },
            { id: 'b', label: 'Manually scale up replicas immediately, then let HPA continue managing it afterward', tier: 'best', why: 'Closes the immediate capacity gap faster than HPA\'s own reaction time — HPA isn\'t disabled by this, it simply resumes normal management once its metrics catch up to the new reality.' },
            { id: 'c', label: 'Disable the HPA entirely and switch to permanent manual scaling', tier: 'wrong', why: 'An overcorrection — throws away legitimate future automatic scaling to solve what\'s actually a temporary, one-time lag issue for this specific spike.' }
          ],
          justificationPatterns: [/manually\s*scale|immediate|close\s*the\s*gap|hpa.*(lag|catch\s*up)/i]
        },
        {
          mode: 'triage_call',
          prompt: 'A slab grinds within the stage: <strong>"A new deployment is causing errors for a portion of users, discovered 15 minutes after rollout. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 38, timeAllotted: 32,
          hintNudge: 'Kubernetes rollout history keeps the previous ReplicaSet around specifically for this — reverting is typically fast and low-risk compared to debugging live in production.',
          hintPartial: 'kubectl rollout undo reverts to the last known-good ReplicaSet quickly, stopping user impact — investigate the actual root cause afterward, once things are stable.',
          hintFull: 'Best: kubectl rollout undo to revert to the previous known-good version immediately, stopping user impact fast — then investigate the actual root cause once things are stable, the same stabilize-first shape as any other production incident.',
          options: [
            { id: 'a', label: 'Debug the new version live in production to find the exact cause first', tier: 'wrong', why: 'Leaves affected users hitting errors the entire time you investigate, when a fast, low-risk rollback to the previous known-good version is sitting right there and readily available.' },
            { id: 'b', label: 'kubectl rollout undo immediately, then investigate the root cause afterward', tier: 'best', why: 'Stops user impact fast using the previous known-good ReplicaSet Kubernetes already kept around for exactly this — the standard stabilize-first incident shape, investigation comes after.' },
            { id: 'c', label: 'Wait and monitor to see if the error rate improves on its own', tier: 'wrong', why: 'Passive in a situation with an extremely likely, easily-reversible cause (the recent deploy) sitting right there — there\'s no real reason to just wait and hope.' }
          ],
          justificationPatterns: [/rollout\s*undo|rollback|revert|stabilize|previous\s*(known-good|version)/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The stage lights flicker unevenly. <strong>Right after a scale-up, a Deployment\'s pods land unevenly — 4 on one node, 0 on another. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 38, timeAllotted: 32,
          hintNudge: 'The scheduler places pods based on current fit, not guaranteed even spread — a dedicated constraint exists specifically to require balanced distribution across nodes/zones.',
          hintPartial: 'Add a topologySpreadConstraint to the Deployment so future scheduling decisions actively balance replicas across nodes, rather than manually rebalancing this one time.',
          hintFull: 'Best: add a topologySpreadConstraint to the Deployment spec — manually rebalancing right now only fixes this one moment, while the constraint prevents the same uneven landing from recurring on every future scale event.',
          options: [
            { id: 'a', label: 'Manually delete pods from the crowded node so they reschedule elsewhere', tier: 'defensible', why: 'Fixes the immediate imbalance, but does nothing to prevent the exact same uneven landing on the next scale-up or rollout — a one-time patch, not a real fix.' },
            { id: 'b', label: 'Add a topologySpreadConstraint to the Deployment', tier: 'best', why: 'Makes the scheduler actively maintain balanced distribution across nodes/zones on every future scheduling decision — fixes the actual recurring cause, not just today\'s symptom.' },
            { id: 'c', label: 'Ignore it — as long as all pods are Running, node distribution doesn\'t matter', tier: 'wrong', why: 'Uneven distribution is a real risk — losing that one crowded node takes out a disproportionate share of the service\'s capacity at once, which is exactly the kind of risk spread constraints exist to prevent.' }
          ],
          justificationPatterns: [/topologySpreadConstraint|balanced\s*distribution|recur|future\s*scheduling/i]
        },
        {
          mode: 'read_the_room',
          prompt: 'A puppet hangs motionless. <strong>A pod was just killed, and its last state shows "OOMKilled". Diagnose it, then fix it.</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40, timeAllotted: 32,
          hintNudge: 'Check the pod\'s configured memory limit against what it was actually using right before it died — that comparison tells you whether this was expected or a genuine problem.',
          hintPartial: 'describe shows the container hit its 256Mi memory limit exactly before being killed — the app\'s real memory need exceeds what was configured.',
          hintFull: 'Diagnosis: the container exceeded its configured memory limit and was killed by the kernel. Fix: either raise the memory limit to match real, legitimate usage, or investigate/fix excessive memory consumption in the app.',
          outputBlock: [
            '$ kubectl describe pod web-7d8f9',
            'Last State: Terminated, Reason: OOMKilled, Exit Code: 137',
            'Limits: memory: 256Mi'
          ],
          acceptableDiagnosesPatterns: [/oom.?kill/i, /exceed(ed)?\s*(the\s*)?memory\s*limit/i, /out\s*of\s*memory/i],
          followUpFix: {
            prompt: 'Check the actual usage pattern before deciding whether to raise the limit or investigate a leak:',
            acceptablePatterns: [],
            optimalPatterns: [/^kubectl\s+top\s+pod\s+web-7d8f9$/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A puppet freezes mid-motion. <strong>Pods across a node are being evicted, one after another. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40, timeAllotted: 32,
          hintNudge: 'Check the node\'s conditions directly — a specific named "pressure" condition triggers exactly this kind of proactive, mass pod eviction.',
          hintPartial: 'describe node shows DiskPressure: True — the kubelet is proactively evicting pods to reclaim disk space before the node runs out entirely.',
          hintFull: 'Diagnosis: the node is under disk pressure, and the kubelet is evicting pods to free up space. Fix: identify and clean up what\'s consuming disk on that node (old images, logs, or a runaway container), then confirm the pressure condition clears.',
          outputBlock: [
            '$ kubectl get events --field-selector reason=Evicted',
            'web-9f2a1   Evicted   The node was low on resource: ephemeral-storage',
            '',
            '$ kubectl describe node node-3',
            'Conditions: DiskPressure: True'
          ],
          acceptableDiagnosesPatterns: [/disk\s*pressure/i, /low\s*on\s*(disk|ephemeral.?storage)/i],
          followUpFix: {
            prompt: 'Investigate what\'s actually consuming disk on that node, as the first step:',
            acceptablePatterns: [],
            optimalPatterns: [/^kubectl\s+describe\s+node\s+node-3$/i, /df\s+-h/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A string catches, refusing to move. <strong>Pods across the cluster suddenly can\'t resolve any DNS names at all — external or internal. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40, timeAllotted: 32,
          hintNudge: 'Every DNS lookup inside the cluster goes through the same central component — check whether IT is actually healthy.',
          hintPartial: 'The CoreDNS pods are crash-looping — since every in-cluster DNS lookup depends on CoreDNS, its failure breaks name resolution cluster-wide, not just for one app.',
          hintFull: 'Diagnosis: CoreDNS itself is down/crash-looping, breaking DNS resolution cluster-wide. Fix: check CoreDNS pod logs for the crash cause and restart/fix it — everything else depends on this one component being healthy.',
          outputBlock: [
            '$ kubectl exec web-7d8f9 -- nslookup kubernetes.default',
            ';; connection timed out; no servers could be reached',
            '',
            '$ kubectl get pods -n kube-system -l k8s-app=kube-dns',
            'coredns-abc123   0/1   CrashLoopBackOff'
          ],
          acceptableDiagnosesPatterns: [/coredns/i, /dns.*(down|crash|broken)\s*cluster.?wide/i],
          followUpFix: {
            prompt: 'Check the CoreDNS pods\' logs to find the actual crash cause:',
            acceptablePatterns: [],
            optimalPatterns: [/^kubectl\s+logs\s+-n\s+kube-system\s+coredns-abc123$/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'The Orchestrator\'s frame flickers. <strong>Two pods that should be able to talk to each other now can\'t, right after a NetworkPolicy was added. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40, timeAllotted: 32,
          hintNudge: 'The NEW NetworkPolicy is almost certainly the cause, given the timing — check whether it actually allows the specific traffic that just broke.',
          hintPartial: 'The new NetworkPolicy\'s ingress rules only allow traffic from pods labeled role: frontend, but the calling pod is labeled role: worker — it was never included in the allowed traffic.',
          hintFull: 'Diagnosis: the recently-added NetworkPolicy doesn\'t include the calling pod\'s labels in its allowed ingress sources. Fix: add a rule permitting traffic from the worker pods specifically.',
          outputBlock: [
            '$ kubectl exec worker-pod -- curl -s api-svc:8080',
            '(hangs, then times out)',
            '',
            '$ kubectl get networkpolicy api-policy -o yaml',
            'ingress: [{from: [{podSelector: {matchLabels: {role: frontend}}}]}]'
          ],
          acceptableDiagnosesPatterns: [/network\s*policy.*(blocking|doesn'?t\s*allow)/i, /not\s*included\s*in\s*(the\s*)?(allowed|policy)/i],
          followUpFix: {
            prompt: 'Fix the NetworkPolicy to also allow traffic from the worker pods:',
            acceptablePatterns: [],
            optimalPatterns: [/role:\s*worker/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A puppet\'s hand freezes mid-gesture. <strong>A node needs urgent maintenance, but "kubectl drain" refuses to proceed. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40, timeAllotted: 32,
          hintNudge: 'A PodDisruptionBudget guarding one of the pods on that node can explicitly block drain if evicting it would violate the budget — check the exact error.',
          hintPartial: 'The drain error names a PodDisruptionBudget that would be violated by evicting this pod — that PDB is currently configured to allow zero voluntary disruptions for this app.',
          hintFull: 'Diagnosis: a PodDisruptionBudget is blocking the eviction because it would violate the minimum-available constraint. Fix: temporarily adjust the PDB (or wait until more replicas are healthy elsewhere) so the eviction doesn\'t violate it, or use --disable-eviction only as a deliberate, understood override.',
          outputBlock: [
            '$ kubectl drain node-3 --ignore-daemonsets',
            'error: cannot evict pod as it would violate the pod\'s disruption budget: web-pdb'
          ],
          acceptableDiagnosesPatterns: [/poddisruptionbudget|pdb.*(blocking|violat)/i],
          followUpFix: {
            prompt: 'Check the PDB\'s current configuration before deciding how to proceed:',
            acceptablePatterns: [],
            optimalPatterns: [/^kubectl\s+get\s+pdb\s+web-pdb$/i, /^kubectl\s+describe\s+pdb\s+web-pdb$/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A final string trembles. <strong>A rollout is stuck for a long time, showing 1 old pod still "Terminating" and never actually gone. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40, timeAllotted: 32,
          hintNudge: 'A pod genuinely stuck in Terminating (past its grace period) usually means something inside it is blocking a clean shutdown — check what it\'s actually still doing.',
          hintPartial: 'The pod\'s process isn\'t responding to the termination signal at all (perhaps ignoring SIGTERM, or stuck in an uninterruptible operation) — it\'s well past its grace period and still hasn\'t exited.',
          hintFull: 'Diagnosis: the pod\'s process isn\'t shutting down cleanly on SIGTERM within its grace period. Fix: investigate why (check logs for what it\'s doing at shutdown), and if truly stuck, force-delete it to unblock the rollout while fixing the underlying shutdown handling.',
          outputBlock: [
            '$ kubectl get pods',
            'web-old-7d8f9   1/1   Terminating   0   12m',
            '(grace period was only 30s)'
          ],
          acceptableDiagnosesPatterns: [/not\s*(shutting\s*down|responding\s*to\s*sigterm)/i, /stuck.*terminating/i, /past.*grace\s*period/i],
          followUpFix: {
            prompt: 'If it\'s confirmed genuinely stuck past its grace period, unblock the rollout:',
            acceptablePatterns: [],
            optimalPatterns: [/--grace-period=0.*--force|--force.*--grace-period=0/i]
          }
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'The Orchestrator raises both hands. <strong>Sequence the correct order for safely draining a node for maintenance.</strong>',
          steps: [
            'Cordon the node so no new pods schedule there',
            'Confirm remaining capacity elsewhere is sufficient for the pods that will move',
            'Drain the node to gracefully evict its pods',
            'Perform the maintenance',
            'Uncordon the node so it can schedule pods again'
          ],
          damageIfCorrect: 26, damageIfOptimal: 42,
          damageToHeroIfWrong: 24
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'A string pulls taut. <strong>Sequence the correct order for responding to a crash-looping Deployment in production.</strong>',
          steps: [
            'Check kubectl logs (and --previous) for the crash reason',
            'Check kubectl describe pod for events and exit code',
            'Identify the root cause (config, image, or resource limit)',
            'Apply the fix or roll back to the last known-good version',
            'Monitor that the rollout stabilizes'
          ],
          damageIfCorrect: 26, damageIfOptimal: 42,
          damageToHeroIfWrong: 24
        }
      ]
    },
    {
      name: 'Level 5 — Interview-Caliber Judgment',
      hp: 180,
      questions: [
        {
          mode: 'terminal',
          prompt: 'The Orchestrator\'s form hardens: <strong>"List every pod across the entire cluster, with the node each one runs on, in one command."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 30,
          hintNudge: 'Combine the all-namespaces flag with the wide-output flag.',
          hintPartial: 'kubectl get pods -_ -_ ____',
          hintFull: 'kubectl get pods -A -o wide',
          acceptablePatterns: [],
          optimalPatterns: [/^kubectl\s+get\s+pods\s+-A\s+-o\s+wide$/i],
          baseCmds: ['kubectl']
        },
        {
          mode: 'terminal',
          prompt: 'A deep hum resonates: <strong>"Attach a temporary debug container to the already-running pod <code>web-abc123</code>, without modifying the pod itself."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36,
          hintNudge: 'A dedicated subcommand attaches a short-lived debug container to a live pod, taking an image flag for the debug tooling to use.',
          hintPartial: 'kubectl d____ web-abc123 --_____=busybox',
          hintFull: 'kubectl debug web-abc123 --image=busybox',
          acceptablePatterns: [],
          optimalPatterns: [/^kubectl\s+debug\s+web-abc123\s+--image=busybox$/i],
          baseCmds: ['kubectl']
        },
        {
          mode: 'terminal',
          prompt: 'The Orchestrator narrows its gaze: <strong>"List every pod with the label <code>tier=frontend</code>, across all namespaces."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 30,
          hintNudge: 'A label-selector flag combined with the all-namespaces flag.',
          hintPartial: 'kubectl get pods -_ -_ ______________',
          hintFull: 'kubectl get pods -A -l tier=frontend',
          acceptablePatterns: [],
          optimalPatterns: [/^kubectl\s+get\s+pods\s+-A\s+-l\s+tier=frontend$/i],
          baseCmds: ['kubectl']
        },
        {
          mode: 'terminal',
          prompt: 'A tentacle-thin string reaches for a hidden compartment: <strong>"Retrieve and decode the value of key <code>password</code> from the Secret <code>db-creds</code>."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36,
          hintNudge: 'Secrets are stored base64-encoded — pull the field with jsonpath, then decode it with base64.',
          hintPartial: 'kubectl get secret db-creds -o jsonpath=\'{.data.password}\' | base__ -_',
          hintFull: 'kubectl get secret db-creds -o jsonpath=\'{.data.password}\' | base64 -d',
          acceptablePatterns: [],
          optimalPatterns: [/kubectl\s+get\s+secret\s+db-creds\s+-o\s+jsonpath='\{\.data\.password\}'\s*\|\s*base64\s+-d/i],
          baseCmds: ['kubectl']
        },
        {
          mode: 'terminal',
          prompt: 'The Orchestrator surveys its own domain: <strong>"List every resource TYPE the API server actually supports."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 30,
          hintNudge: 'A dedicated subcommand lists the full API surface — every kind, group, and whether it\'s namespaced.',
          hintPartial: 'kubectl api-________',
          hintFull: 'kubectl api-resources',
          acceptablePatterns: [],
          optimalPatterns: [/^kubectl\s+api-resources$/i],
          baseCmds: ['kubectl']
        },
        {
          mode: 'spot_the_bug',
          prompt: 'The Orchestrator shows a torn script: <strong>"A security review finds this Pod has no security hardening applied at all — it runs fully as root with no restrictions. Find and fix the bug."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40,
          hintNudge: 'A securityContext block is missing entirely — without one, a container defaults to running as root with no meaningful restriction.',
          hintPartial: 'Add a securityContext to the pod/container spec forcing a non-root user, at minimum.',
          hintFull: 'Add under the container spec: securityContext: {runAsNonRoot: true, runAsUser: 1000}',
          codeBlock: [
            'containers:',
            '  - name: web',
            '    image: myapp:1.0'
          ],
          buggyLineId: 1,
          correctFixPatterns: [/securityContext/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A torn thread dangles: <strong>"A database password is passed to a container as a plain environment variable, and now shows up in <code>kubectl describe pod</code> output for anyone with basic view access. Find and fix the bug."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40,
          hintNudge: 'A plain "value:" field for an env var is visible to anyone who can read/describe the pod — a secretKeyRef keeps the actual value out of the pod spec itself.',
          hintPartial: 'Line 2 sets the password as a plain literal value — replace it with a valueFrom.secretKeyRef pulling from an actual Secret, instead of a value anyone can read directly off the pod spec.',
          hintFull: 'Line 2 should read: valueFrom: {secretKeyRef: {name: db-creds, key: password}}',
          codeBlock: [
            'env:',
            '  - name: DB_PASSWORD',
            '    value: "hunter2"'
          ],
          buggyLineId: 1,
          correctFixPatterns: [/secretKeyRef/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'The Orchestrator\'s eye flares: <strong>"A critical, always-on production Pod has no resource limits set at all. Find and fix the bug."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40,
          hintNudge: 'With no resources.limits set, this pod can consume unbounded CPU/memory on its node, potentially starving every other pod scheduled there.',
          hintPartial: 'Add a resources.limits block so this pod has a real ceiling, protecting every other workload sharing that node.',
          hintFull: 'Add under the container spec: resources: {limits: {cpu: "1", memory: "512Mi"}}',
          codeBlock: [
            'containers:',
            '  - name: web',
            '    image: myapp:1.0'
          ],
          buggyLineId: 1,
          correctFixPatterns: [/resources:.*limits/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The Orchestrator looms with menace: <strong>"Designing pod security standards for a multi-tenant cluster shared by several teams. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 44,
          hintNudge: 'One approach relies on every individual team remembering and consistently applying security settings themselves. One approach enforces a baseline centrally, regardless of what any one team does.',
          hintPartial: 'A centrally-enforced Pod Security Standard (or admission controller) guarantees a real security baseline across every namespace, rather than hoping every team remembers to configure it themselves.',
          hintFull: 'Best: enforce Pod Security Standards (or an equivalent admission controller policy) centrally at the namespace/cluster level — relying on each team to individually configure security settings correctly, every time, doesn\'t scale and inevitably has gaps.',
          options: [
            { id: 'a', label: 'Document the recommended security settings and trust each team to apply them', tier: 'wrong', why: 'Documentation with no enforcement mechanism inevitably has gaps — some team eventually ships a pod without the recommended settings, and there\'s no guardrail catching it.' },
            { id: 'b', label: 'Enforce Pod Security Standards centrally via an admission controller', tier: 'best', why: 'Guarantees a real security baseline is actually applied across every namespace, regardless of whether any individual team remembers or prioritizes it — the standard scalable approach for multi-tenant security.' },
            { id: 'c', label: 'Give each team their own separate cluster instead of sharing one', tier: 'defensible', why: 'Solves the multi-tenancy isolation concern more thoroughly, but at a real infrastructure/operational cost that a shared cluster with proper admission control usually doesn\'t require.' }
          ],
          justificationPatterns: [/admission\s*controller|centrally\s*enforc|pod\s*security\s*standard|baseline/i]
        },
        {
          mode: 'triage_call',
          prompt: 'A tentacle-thin string curls: <strong>"Deciding between a service mesh\'s mTLS and NetworkPolicy for securing pod-to-pod traffic. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 44,
          hintNudge: 'One tool controls WHICH pods can talk to which (network-layer access control). One tool encrypts and authenticates the actual traffic between them, regardless of network path. These solve different problems and are often used together.',
          hintPartial: 'NetworkPolicy controls WHICH pods can reach which (access control); mTLS encrypts and authenticates the traffic itself — they address different concerns and are commonly layered together, not chosen as an either/or.',
          hintFull: 'Best: use both, since they solve different problems — NetworkPolicy for access control (who can even attempt a connection), mTLS for encryption and identity verification of the actual traffic — treating this as an either/or misses that they\'re complementary, not competing.',
          options: [
            { id: 'a', label: 'NetworkPolicy alone is enough — it already restricts traffic', tier: 'defensible', why: 'Genuinely restricts WHICH pods can connect, but does nothing to encrypt or authenticate the traffic itself once a connection is allowed — an attacker already on the allowed path can still intercept or spoof it.' },
            { id: 'b', label: 'Use both NetworkPolicy and mTLS together', tier: 'best', why: 'They solve genuinely different problems — NetworkPolicy for access control, mTLS for encryption/identity — layering both gives real defense-in-depth rather than picking one and leaving the other gap open.' },
            { id: 'c', label: 'mTLS alone is enough — it already encrypts everything', tier: 'wrong', why: 'Encrypts and authenticates traffic, but by itself doesn\'t restrict WHICH pods are even allowed to attempt a connection in the first place — a compromised pod with valid mTLS certs could still reach anything.' }
          ],
          justificationPatterns: [/both|complementary|different\s*(problems|concerns)|defense.?in.?depth|layer/i]
        },
        {
          mode: 'triage_call',
          prompt: 'A slab grinds within the stage: <strong>"Planning a strategy for rotating a cluster-wide credential (e.g. a Secret used by dozens of deployments) with zero downtime. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 44,
          hintNudge: 'Updating the Secret alone doesn\'t automatically make already-running pods pick up the new value — most pods only read env-var secrets once, at container start.',
          hintPartial: 'After updating the Secret\'s value, a rolling restart of every dependent Deployment is what actually gets the new credential into running pods — the Secret update alone isn\'t enough for env-var-mounted secrets.',
          hintFull: 'Best: update the Secret\'s value, then trigger a rolling restart of every Deployment that consumes it (kubectl rollout restart) — for a genuinely zero-downtime rotation with dozens of consumers, coordinate the restarts and verify each one picks up the new credential successfully before considering it done.',
          options: [
            { id: 'a', label: 'Just update the Secret\'s value and consider it done', tier: 'wrong', why: 'Most pods read an env-var-sourced secret only once, at container start — already-running pods keep using the OLD value until they\'re restarted, silently leaving stale credentials in use.' },
            { id: 'b', label: 'Update the Secret, then trigger a rolling restart of every dependent Deployment', tier: 'best', why: 'Actually gets the new credential into every running pod, via the same rolling-update mechanism that\'s already designed for zero-downtime changes — the Secret update alone is only half the job.' },
            { id: 'c', label: 'Take the whole service down, update everything, then bring it back up', tier: 'wrong', why: 'Achieves the rotation but directly contradicts the "zero downtime" requirement — a rolling restart accomplishes the same result without any outage.' }
          ],
          justificationPatterns: [/rolling\s*restart|rollout\s*restart|already.?running\s*pods|pick\s*up\s*(the\s*)?new/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The Orchestrator\'s presence darkens: <strong>"An RBAC audit finds several ServiceAccounts with cluster-admin permissions that no longer seem necessary. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 44,
          hintNudge: 'Revoking broad permissions blindly, without confirming what actually depends on them, risks breaking something currently relying on that access — but leaving unnecessary cluster-admin grants sitting around is a real, ongoing security risk too.',
          hintPartial: 'Audit what each ServiceAccount actually uses its permissions for first, then scope each one down to the specific, narrower permissions it genuinely needs — rather than revoking blindly or leaving broad access in place indefinitely.',
          hintFull: 'Best: audit actual usage per ServiceAccount first (what does it really call/do), then replace each broad cluster-admin binding with a narrower Role/RoleBinding matching real need — blindly revoking risks breaking something still using it; leaving it as-is is a real, ongoing security exposure.',
          options: [
            { id: 'a', label: 'Immediately revoke cluster-admin from all of them', tier: 'wrong', why: 'Risks breaking something currently relying on that access without warning — a real production incident waiting to happen if any of those ServiceAccounts are actually still in active use for something.' },
            { id: 'b', label: 'Audit actual usage per ServiceAccount, then scope each down to a narrower Role matching real need', tier: 'best', why: 'Fixes the real security exposure (unnecessary broad access) while confirming nothing currently-needed breaks — the standard least-privilege remediation approach for exactly this finding.' },
            { id: 'c', label: 'Leave them as-is, since removing them risks breaking something', tier: 'wrong', why: 'Leaves a confirmed, real security exposure (unnecessary cluster-admin grants) in place indefinitely out of caution — the risk of unaudited broad access is itself a genuine ongoing problem, not a neutral default.' }
          ],
          justificationPatterns: [/audit\s*(actual\s*)?usage|scope\s*down|least\s*privilege|narrower\s*role/i]
        },
        {
          mode: 'triage_call',
          prompt: 'A final tentacle rises: <strong>"Planning a major Kubernetes cluster version upgrade for a production cluster. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 44,
          hintNudge: 'A version upgrade can break workloads relying on deprecated/removed APIs, and rolling it out to the ENTIRE production cluster in one shot leaves no safety net if something goes wrong.',
          hintPartial: 'Check for deprecated API usage first (many upgrades remove old API versions), then test the upgrade on a non-production cluster before touching production, and roll it out to production gradually rather than all at once.',
          hintFull: 'Best: check for deprecated/removed API usage across the cluster\'s workloads first, test the full upgrade on a staging/non-production cluster, then roll out to production gradually (e.g. control plane first, then worker nodes in batches) — jumping straight to a full production upgrade risks a wide, hard-to-diagnose outage if any workload breaks.',
          options: [
            { id: 'a', label: 'Upgrade the entire production cluster directly, since the new version is stable', tier: 'wrong', why: '"Stable" doesn\'t mean "compatible with every workload currently running" — deprecated API removals are a common real cause of upgrade breakage, and a direct full-cluster jump has no safety net if something does break.' },
            { id: 'b', label: 'Check for deprecated API usage, test on staging first, then roll out to production gradually', tier: 'best', why: 'Catches likely breakage before it happens (API check), validates the upgrade in a lower-risk environment first (staging), and limits blast radius if something unexpected still surfaces (gradual rollout) — the standard safe upgrade shape.' },
            { id: 'c', label: 'Never upgrade at all, to avoid any risk of breakage', tier: 'wrong', why: 'Trades a manageable, plannable risk for a much worse one — an unsupported, unpatched cluster version accumulates real security vulnerabilities and eventually loses vendor/community support entirely.' }
          ],
          justificationPatterns: [/deprecated\s*api|staging\s*first|gradual|test\s*(the\s*)?upgrade/i]
        },
        {
          mode: 'triage_call',
          prompt: 'A shadow puppet twists strangely. <strong>Planning how to validate a cluster\'s actual resilience to a node failure, before one happens for real. Pick your move, then justify it in one line.</strong>',
          damageIfCorrect: 26, damageIfOptimal: 44,
          hintNudge: 'Reading the architecture diagram tells you what SHOULD happen in theory — only an actual, deliberate failure test tells you what really happens when it does.',
          hintPartial: 'Deliberately and safely simulate a node failure (e.g. cordon and drain, or a chaos-engineering tool) in a controlled way, and observe whether the cluster actually behaves as expected — theory and real behavior often differ.',
          hintFull: 'Best: run a deliberate, controlled failure test (chaos engineering practice, or a manual cordon/drain simulation) and observe real behavior — assuming resilience based on architecture alone misses real gaps (an untested PDB, a missing topology spread, an assumption that turns out wrong) that only show up under an actual failure.',
          options: [
            { id: 'a', label: 'Review the architecture diagram and confirm redundancy is documented', tier: 'wrong', why: 'Confirms the INTENDED design, not actual behavior — a documented "3 replicas across 3 zones" plan can still fail in practice due to a misconfigured constraint that was never actually tested.' },
            { id: 'b', label: 'Run a deliberate, controlled failure simulation and observe real behavior', tier: 'best', why: 'Directly answers the actual question ("what really happens") instead of the theoretical one — real chaos/failure testing catches gaps that architecture review alone reliably misses.' },
            { id: 'c', label: 'Wait for a real node failure to happen naturally and see what occurs', tier: 'wrong', why: 'Turns an unplanned production incident into your resilience test — any gaps found this way are discovered at the worst possible time, with real user impact, instead of in a controlled window.' }
          ],
          justificationPatterns: [/chaos|controlled\s*(failure\s*)?test|deliberate|real\s*behavior|simulate/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The final shadow lengthens. <strong>Deciding on a rollout strategy for a change that includes a database schema migration alongside the app update. Pick your move, then justify it in one line.</strong>',
          damageIfCorrect: 26, damageIfOptimal: 44,
          hintNudge: 'During any rolling update, OLD and NEW versions of the app run simultaneously for a while — a schema change has to be compatible with BOTH versions during that overlap window, not just the new one.',
          hintPartial: 'Design the migration to be backward-compatible (e.g. additive changes first, cleanup later) so both the old and new app versions can run against the same schema during the rollout\'s overlap window.',
          hintFull: 'Best: use an expand-and-contract approach — make the schema change backward-compatible first (e.g. add a new column without removing the old one yet), roll out the app change, THEN do a separate follow-up migration to clean up the old schema once every instance is on the new version.',
          options: [
            { id: 'a', label: 'Apply the full schema migration (including removing old columns) right before rolling out the new app version', tier: 'wrong', why: 'During the rollout, OLD app instances are still running and expecting the OLD schema — removing what they depend on breaks them before they\'re even replaced, causing errors during the overlap window.' },
            { id: 'b', label: 'Use an expand-and-contract migration: additive/backward-compatible changes first, cleanup afterward', tier: 'best', why: 'Keeps both old and new app versions working against the same schema during the rollout\'s overlap window — the standard safe pattern for schema changes alongside rolling deploys.' },
            { id: 'c', label: 'Take the app fully offline during the migration to avoid any compatibility concerns', tier: 'defensible', why: 'Sidesteps the compatibility problem entirely, but introduces real downtime that an expand-and-contract approach avoids without sacrificing safety.' }
          ],
          justificationPatterns: [/expand.?and.?contract|backward.?compatible|both\s*versions|overlap\s*window/i]
        },
        {
          mode: 'read_the_room',
          prompt: 'A final flicker crosses the stage. <strong>Automation scripts calling kubectl/the API server intermittently fail with rate-limit-style errors. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 28, damageIfOptimal: 48,
          hintNudge: 'kubectl itself (and client libraries) has its own CLIENT-SIDE request-rate settings, separate from the API server\'s own limits — check whether the caller is simply configured too conservatively for how many requests the automation is actually making.',
          hintPartial: 'The error is client-side throttling ("client rate limiter") — the automation\'s kubectl/client-go QPS and burst settings are configured too low for how many requests it\'s actually trying to make.',
          hintFull: 'Diagnosis: client-side request throttling (QPS/burst limits configured too low for this automation\'s actual request volume). Fix: raise the client\'s QPS/burst settings to a value that matches real usage, or reduce/batch the automation\'s request volume.',
          outputBlock: [
            '$ ./automation-script.sh',
            'Error: client rate limiter Wait returned an error: context deadline exceeded',
            '(happens consistently when the script does many kubectl calls in a tight loop)'
          ],
          acceptableDiagnosesPatterns: [/client.?side\s*(rate\s*limit|throttl)/i, /qps|burst/i, /rate\s*limiter/i],
          followUpFix: {
            prompt: 'Fix it by raising the client\'s QPS/burst configuration to match real usage:',
            acceptablePatterns: [],
            optimalPatterns: [/qps|burst/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'The Orchestrator\'s core roars. <strong>Pods are being evicted across multiple nodes in a cascading pattern, each eviction seeming to trigger more. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 28, damageIfOptimal: 48,
          hintNudge: 'Each eviction moves pods elsewhere, potentially pushing THOSE nodes into the same resource pressure that caused the first eviction — check whether capacity across the whole cluster is actually sufficient for the total load.',
          hintPartial: 'The cluster is genuinely undersized for total demand — evicting pods from one pressured node just relocates the same load onto other nodes, which then also hit pressure and evict, cascading outward.',
          hintFull: 'Diagnosis: overall cluster capacity is insufficient for the total workload, so evictions just relocate (not resolve) resource pressure, cascading to more nodes. Fix: add real cluster capacity (more/bigger nodes), not just react to individual evictions.',
          outputBlock: [
            '$ kubectl get events --field-selector reason=Evicted | wc -l',
            '47 (and climbing, across 5 different nodes)',
            '',
            '$ kubectl top nodes',
            '(every node shows >90% memory usage)'
          ],
          acceptableDiagnosesPatterns: [/insufficient\s*(cluster\s*)?capacity/i, /cluster.*undersized/i, /not\s*enough\s*(total\s*)?capacity/i],
          followUpFix: {
            prompt: 'Confirm total cluster capacity vs. total demand, as the real root-cause check:',
            acceptablePatterns: [],
            optimalPatterns: [/^kubectl\s+top\s+nodes$/i, /^kubectl\s+describe\s+nodes$/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'Cracks split the stage floor. <strong>The cluster autoscaler isn\'t adding new nodes, even though many pods are stuck Pending for lack of capacity. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 28, damageIfOptimal: 48,
          hintNudge: 'Check whether the pending pods actually have something (like a specific nodeSelector, taint toleration, or resource request) that no node GROUP the autoscaler manages could ever satisfy — the autoscaler won\'t add nodes it knows won\'t help.',
          hintPartial: 'The pending pods request a nodeSelector for a GPU node type, but the autoscaler\'s configured node groups don\'t include any GPU-capable group — it correctly recognizes that adding a normal node wouldn\'t help, so it does nothing.',
          hintFull: 'Diagnosis: the pending pods need a node type/label the autoscaler has no matching node group for, so it can\'t help even though it\'s working correctly. Fix: add or configure a node group matching the pods\' actual requirements (e.g. the needed GPU type).',
          outputBlock: [
            '$ kubectl get pods --field-selector status.phase=Pending',
            '(15 pods pending, requesting nodeSelector: gpu=true)',
            '',
            '$ cluster-autoscaler logs',
            'no node group can satisfy pod\'s nodeSelector requirements, skipping'
          ],
          acceptableDiagnosesPatterns: [/no\s*(matching\s*)?node\s*group/i, /nodeSelector.*not\s*(satisfied|matched)/i, /gpu.*(no\s*group|missing)/i],
          followUpFix: {
            prompt: 'Confirm what node groups the autoscaler actually has available:',
            acceptablePatterns: [],
            optimalPatterns: [/node\s*group|autoscaler.*config/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'The Orchestrator\'s mask cracks with heat. <strong>HTTPS to a service via Ingress suddenly starts failing with a certificate error, though nothing was deployed recently. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 28, damageIfOptimal: 48,
          hintNudge: 'Certificates have a real expiration date — check whether the TLS Secret\'s certificate is simply past its validity window, and whether the tool that\'s supposed to auto-renew it is actually working.',
          hintPartial: 'The certificate expired, and cert-manager (which should have auto-renewed it before that happened) shows a failed renewal attempt — the automatic renewal pipeline itself broke silently.',
          hintFull: 'Diagnosis: the TLS certificate expired because cert-manager\'s automatic renewal failed silently. Fix: check cert-manager\'s logs/Certificate resource for the renewal failure reason, fix it, and manually trigger a renewal to restore HTTPS immediately.',
          outputBlock: [
            '$ curl https://app.example.com',
            'curl: (60) SSL certificate problem: certificate has expired',
            '',
            '$ kubectl get certificate app-tls',
            'READY: False   REASON: Renewal failed'
          ],
          acceptableDiagnosesPatterns: [/cert.?manager.*(failed|renewal)/i, /certificate\s*(auto.?)?renewal\s*failed/i, /expired/i],
          followUpFix: {
            prompt: 'Check the Certificate resource\'s events for why renewal actually failed:',
            acceptablePatterns: [],
            optimalPatterns: [/^kubectl\s+describe\s+certificate\s+app-tls$/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'The stage groans under strain. <strong>The control plane itself is responding sluggishly — kubectl commands are slow across the board. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 28, damageIfOptimal: 48,
          hintNudge: 'kubectl\'s slowness reflects the API server\'s own health, which depends heavily on its backing datastore — check that component\'s performance directly, not just the API server.',
          hintPartial: 'etcd (the API server\'s backing datastore) is showing high latency on its own disk I/O — since every kubectl command ultimately reads/writes through etcd, its slowness cascades into all cluster-wide sluggishness.',
          hintFull: 'Diagnosis: etcd is experiencing high latency (often disk I/O related), which slows down every API server request since etcd backs the entire cluster state. Fix: investigate etcd\'s disk performance directly (often needs faster/dedicated storage) and check for excessive request load or a growing database size needing compaction.',
          outputBlock: [
            '$ kubectl get pods',
            '(takes 8+ seconds instead of the usual <1s)',
            '',
            '$ etcdctl endpoint status --write-out=table',
            '(shows high "raft term" churn and elevated disk sync duration)'
          ],
          acceptableDiagnosesPatterns: [/etcd/i, /control\s*plane.*(datastore|backing)/i],
          followUpFix: {
            prompt: 'Check etcd\'s own health/latency metrics directly, as the real root-cause check:',
            acceptablePatterns: [],
            optimalPatterns: [/etcdctl/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'The Orchestrator\'s ribbons tangle. <strong>One pod on a node is running fine, but every OTHER pod sharing that node is running noticeably slower than usual. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 28, damageIfOptimal: 48,
          hintNudge: 'Check whether that one pod is a "noisy neighbor" — consuming far more of a shared resource (CPU, disk I/O) than its own requests would suggest, starving everything else on the same node.',
          hintPartial: 'That one pod has no CPU limit set and is consuming far more CPU than its small request suggested — because it has no real ceiling, it\'s starving every other pod scheduled on the same node.',
          hintFull: 'Diagnosis: an unbounded "noisy neighbor" pod (no resource limit) is consuming a disproportionate share of the node\'s shared resources. Fix: add an appropriate resource limit to that pod so it can\'t starve its neighbors, and consider whether it needs a dedicated node/taint if this is a recurring pattern.',
          outputBlock: [
            '$ kubectl top pods --sort-by=cpu',
            'heavy-batch-job   1850m   (no limit set, request was only 100m)',
            'web-1             45m',
            'web-2             48m'
          ],
          acceptableDiagnosesPatterns: [/noisy\s*neighbor/i, /no\s*(cpu\s*)?limit/i, /consuming.*disproportionate/i],
          followUpFix: {
            prompt: 'Fix it by giving the noisy pod an actual resource limit:',
            acceptablePatterns: [],
            optimalPatterns: [/resources:.*limits.*cpu/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A cracked mirror of ink reflects the stage. <strong>A security scan finds a real secret value accidentally sitting inside a ConfigMap, not a Secret. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 28, damageIfOptimal: 48,
          hintNudge: 'ConfigMap data is stored in plain text (not even base64-hidden the way Secrets are) and is typically readable by anyone with broader view permissions — this must be treated as a real, likely-already-exposed leak.',
          hintPartial: 'The real database password was accidentally placed in a ConfigMap instead of a Secret — ConfigMaps have no confidentiality protection at all, so this credential must be treated as already exposed to anyone with ConfigMap read access.',
          hintFull: 'Diagnosis: a real secret is sitting in a ConfigMap, which offers no confidentiality — the credential must be treated as compromised. Fix: rotate the leaked credential immediately, then move the corrected value into an actual Secret and update the ConfigMap to remove it.',
          outputBlock: [
            '$ kubectl get configmap app-config -o yaml',
            'data:',
            '  DB_PASSWORD: "hunter2"',
            '  LOG_LEVEL: "info"'
          ],
          acceptableDiagnosesPatterns: [/secret.*in\s*(a\s*)?configmap/i, /configmap.*no\s*confidentiality/i, /must\s*be\s*treated\s*as\s*(compromised|exposed)/i],
          followUpFix: {
            prompt: 'The credential must be treated as compromised — what\'s the first real action?',
            acceptablePatterns: [],
            optimalPatterns: [/rotate|change.*password|revoke/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'The final curtain trembles. <strong>An entire availability zone just went down, and pods scheduled there are all gone at once. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 28, damageIfOptimal: 48,
          hintNudge: 'Check whether the surviving zones actually have enough capacity to absorb ALL of the lost zone\'s workload at once — and whether pods were ever spread across zones deliberately in the first place.',
          hintPartial: 'All 3 replicas of a critical Deployment happened to be scheduled in the SAME zone that went down (no topology spread constraint was ever configured), so the AZ failure took down the entire service at once instead of just a third of it.',
          hintFull: 'Diagnosis: pods weren\'t spread across availability zones, so losing one zone took out the whole service instead of a fraction of it. Fix: for the immediate incident, confirm surviving-zone capacity absorbs rescheduled pods; going forward, add topology spread constraints (or podAntiAffinity across zones) so this can\'t happen again.',
          outputBlock: [
            '$ kubectl get pods -o wide -l app=web',
            '(all 3 replicas show the SAME zone label, all in "Unknown" state)',
            '',
            '$ kubectl get nodes -L topology.kubernetes.io/zone',
            '(no topologySpreadConstraint was ever set on the Deployment)'
          ],
          acceptableDiagnosesPatterns: [/all\s*(replicas\s*)?in\s*(the\s*)?same\s*zone/i, /no\s*topology\s*spread/i, /not\s*spread\s*across\s*zones/i],
          followUpFix: {
            prompt: 'Going forward, fix the Deployment so this can\'t happen again:',
            acceptablePatterns: [],
            optimalPatterns: [/topologySpreadConstraint/i]
          }
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'The Orchestrator draws every string taut at once. <strong>Sequence the correct order for responding to a suspected security-compromised pod in production.</strong>',
          steps: [
            'Isolate the pod (NetworkPolicy or delete from load balancer rotation) to contain damage',
            'Preserve evidence (logs, kubectl describe output) before it\'s lost',
            'Rotate any secrets/credentials that pod had access to',
            'Investigate the actual root cause',
            'Redeploy a hardened, patched version'
          ],
          damageIfCorrect: 30, damageIfOptimal: 50,
          damageToHeroIfWrong: 28
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'The last curtain falls in silence. <strong>Sequence the correct order for hardening a production workload\'s security posture.</strong>',
          steps: [
            'Move any secrets out of ConfigMaps/env-var literals into real Secrets',
            'Add a securityContext enforcing non-root and least privilege',
            'Set real resource requests and limits',
            'Add NetworkPolicies scoping allowed traffic',
            'Confirm via kubectl auth can-i that RBAC grants are appropriately scoped'
          ],
          damageIfCorrect: 30, damageIfOptimal: 50,
          damageToHeroIfWrong: 28
        }
      ]
    }
  ]
};
