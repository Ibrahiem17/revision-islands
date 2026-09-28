// Runs right after the Q&A lesson HTML is inserted (loaded via the lesson manifest).
// These blocks used to be inline <script>s on DOMContentLoaded in devops.html; they append extra Q&As to #qaList.

(function() {
  const list = document.getElementById('qaList');
  if (!list) return;
  const newQAs = [
    {
      n: 'Q75',
      q: 'What is the difference between L4 and L7 load balancers? (NLB vs ALB)',
      a: `<strong>L4 — NLB (Network Load Balancer)</strong> — only sees IP address and TCP/UDP port. No idea what the user is asking for. Forwards packets as fast as possible. Blazing fast, millions of connections. Use for raw TCP traffic (gaming, database connections).<br><br><strong>L7 — ALB (Application Load Balancer)</strong> — opens the packet and reads the HTTP request. Makes smart routing decisions based on URL path, headers, or cookies.<br><br>Path-based routing: <code>/api</code> → API servers, <code>/images</code> → image servers, <code>/</code> → frontend.<br><br>Most web apps use ALB. NLB for raw speed or non-HTTP protocols.<br><br><span class="qa-pill">L4/NLB = fast, blind, port-only</span><span class="qa-pill">L7/ALB = smart, reads HTTP, path routing</span>`
    },
    {
      n: 'Q76',
      q: 'What is a CDN and why does it matter for DevOps?',
      a: `A CDN (Content Delivery Network) caches static assets at <strong>edge locations</strong> globally. Requests served from nearest edge — not your origin server.<br><br><strong>Benefits:</strong> Lower latency, reduces origin load, absorbs traffic spikes.<br><br><strong>DevOps gotcha:</strong> After a deploy, CDN may serve stale cached files. You must <strong>invalidate the cache</strong> or use cache-busting (hashed filenames like <code>app.a3f9d2.js</code>).<br><br><strong>Services:</strong> AWS CloudFront, Cloudflare, Fastly.<br><br><span class="qa-pill">edge caching = lower latency</span><span class="qa-pill">invalidate on deploy</span><span class="qa-pill">cache-busting via hashed filenames</span>`
    },
    {
      n: 'Q77',
      q: 'What is the difference between SLI, SLO, and SLA?',
      a: `<strong>SLI</strong> — raw measurable metric. Error rate, p99 latency, uptime %. "What we measure."<br><br><strong>SLO</strong> — internal target for an SLI. "99.9% of requests under 200ms." Error budget consumed if missed. "What we aim for."<br><br><strong>SLA</strong> — contractual commitment to customers with financial consequences if broken. "What we promise externally."<br><br>Rule: SLO should be tighter than SLA — gives buffer before breaching customer commitments.<br><br><span class="qa-pill">SLI = raw metric</span><span class="qa-pill">SLO = internal target</span><span class="qa-pill">SLA = customer contract</span><span class="qa-pill">SLO tighter than SLA</span>`
    },
    {
      n: 'Q78',
      q: 'What is the difference between a Security Group and a NACL in AWS?',
      a: `<strong>Security Group</strong> — instance-level firewall. Stateful: allow inbound and return traffic is auto-allowed. Allow-only rules. Primary security mechanism.<br><br><strong>NACL</strong> — subnet-level firewall. Stateless: must explicitly allow both inbound AND outbound. Supports explicit Deny rules (block specific IPs).<br><br>Use both for layered defense. Security Groups for instance access. NACLs as subnet backstop.<br><br><span class="qa-pill">SG = instance-level, stateful</span><span class="qa-pill">NACL = subnet-level, stateless</span><span class="qa-pill">use both = defense in depth</span>`
    },
    {
      n: 'Q79',
      q: 'What is the difference between AWS S3, EBS, and EFS?',
      a: `<strong>S3</strong> — object storage, infinitely scalable. Accessed via HTTP API. Not mountable. Backups, static assets, logs, Terraform state, build artifacts.<br><br><strong>EBS</strong> — block storage, virtual hard drive for one EC2 instance. Holds OS + databases. Fast but tied to one AZ.<br><br><strong>EFS</strong> — shared network filesystem. Multiple EC2 instances/K8s pods across AZs mount and read/write simultaneously. Like NFS in the cloud.<br><br><span class="qa-pill">S3 = files via API</span><span class="qa-pill">EBS = virtual hard drive, 1 instance</span><span class="qa-pill">EFS = shared mount, multiple instances</span>`
    },
    {
      n: 'Q80',
      q: 'Walk me through a complete VPC architecture for a production web app.',
      a: `<strong>1. VPC:</strong> CIDR <code>10.0.0.0/16</code>.<br><strong>2. Subnets in 2 AZs:</strong> Public (ALB + NAT GW) + Private (App servers + RDS).<br><strong>3. Internet Gateway:</strong> Attach to VPC. Public subnet routes 0.0.0.0/0 to IGW. Private subnet gets no IGW route.<br><strong>4. NAT Gateway:</strong> Public subnet. Private resources route outbound traffic through NAT without being reachable from internet.<br><strong>5. Security Groups (Interview Gold):</strong> ALB SG allows 443 from internet. App SG allows from ALB SG only. RDS SG allows port 5432 from App SG only. Reference SG IDs, not IPs.<br><strong>6. VPC Flow Logs:</strong> Enable for audit and troubleshooting.<br><br><span class="qa-pill">public = ALB + NAT GW</span><span class="qa-pill">private = app + DB</span><span class="qa-pill">SG references SG ID not IP</span>`
    },
    {
      n: 'Q81',
      q: 'What is AWS CloudFormation vs Terraform?',
      a: `<strong>CloudFormation</strong> — AWS-native IaC. JSON/YAML templates → Stacks. Updates as change sets. Deep AWS integration, free, built-in rollback. AWS-only.<br><br><strong>Terraform</strong> — multi-cloud IaC. HCL language. Works across AWS + Azure + GCP. Larger community and ecosystem.<br><br>Choose CloudFormation for AWS-only environments. Choose Terraform for multi-cloud or cloud-agnostic portability.<br><br><span class="qa-pill">CloudFormation = AWS-native free</span><span class="qa-pill">Terraform = multi-cloud HCL</span>`
    },
    {
      n: 'Q82',
      q: 'Describe the full DevOps lifecycle from a Jira ticket to production.',
      a: `<strong>1. Plan:</strong> Jira ticket → feature branch.<br><strong>2. CI:</strong> Code merged → GitHub Actions → tests pass → Docker image → ECR as v2.0.<br><strong>3. IaC:</strong> Terraform verifies/provisions infra.<br><strong>4. CD:</strong> K8s rolling update, zero downtime.<br><strong>5. Monitor:</strong> Prometheus + Grafana + CloudWatch watching.<br><strong>6. Scale/Incident:</strong> HPA scales on traffic. Alert fires on bug → rollback.<br><strong>7. Feedback:</strong> Incident → Jira ticket → loop repeats.<br><br><span class="qa-pill">Jira → Git → CI → Terraform → K8s → Monitor → Feedback</span>`
    }
  ];
  newQAs.forEach(item => {
    const div = document.createElement('div');
    div.className = 'qa-item';
    div.innerHTML = `<div class="qa-q" onclick="toggle(this)"><span class="qa-q-badge">${item.n}</span><span class="qa-q-text">${item.q}</span><span class="qa-chevron">▼</span></div><div class="qa-a"><div class="qa-a-badge">ANSWER</div><div class="qa-a-text">${item.a}</div></div>`;
    list.appendChild(div);
  });
})();

(function() {
  const list = document.querySelector('#tab-qa .qa-list');
  if (!list) return;

  // Section divider
  const divider = document.createElement('div');
  divider.style.cssText = 'margin:20px 0 14px;font-family:\'Syne\',sans-serif;font-size:13px;font-weight:700;color:#cbd5e1;display:flex;align-items:center;gap:8px;';
  divider.innerHTML = '🔥 2025 Interview Questions — Sourced From Real Interviews <span style="flex:1;height:1px;background:#1e293b;display:block;"></span>';
  list.appendChild(divider);

  const fresh = [
    {
      n: 'Q83',
      badge_color: '#38bdf8',
      q: 'Your production deployment just failed halfway through. Half the pods are on v2, half on v1. Users are seeing inconsistent behaviour. What do you do RIGHT NOW?',
      a: `<strong>This is an incident — speed matters. Immediate action:</strong><br><br>
<strong>1. Stop the bleeding first:</strong> Pause the rollout immediately. In Kubernetes: <code>kubectl rollout pause deployment/myapp</code>. This freezes the current state — no more v2 pods get created.<br><br>
<strong>2. Assess the damage:</strong> <code>kubectl get pods</code> to count v1 vs v2. <code>kubectl logs -l version=v2 --previous</code> to see what's crashing. <code>kubectl describe pod &lt;v2-pod&gt;</code> for events.<br><br>
<strong>3. Roll back:</strong> <code>kubectl rollout undo deployment/myapp</code> — Kubernetes immediately starts replacing v2 pods with v1. Takes ~30–60s depending on pod count.<br><br>
<strong>4. Verify:</strong> <code>kubectl rollout status deployment/myapp</code> until it shows "successfully rolled out". Hit the health endpoint. Check error rates in Grafana/CloudWatch.<br><br>
<strong>5. Post-incident:</strong> Write a blameless post-mortem. Root cause was likely a missing pre-deploy smoke test or missing readinessProbe — fix those before next deploy.<br><br>
<strong>What NOT to do:</strong> Don't manually delete pods. Don't scale to 0. Don't push a "hotfix" under pressure without testing — that causes a third incident.<br><br>
<span class="qa-pill">kubectl rollout pause/undo</span><span class="qa-pill">assess before acting</span><span class="qa-pill">verify after rollback</span><span class="qa-pill">blameless post-mortem</span>`
    },
    {
      n: 'Q84',
      badge_color: '#22c55e',
      q: 'Explain the difference between Continuous Delivery and Continuous Deployment. Which one would you recommend for a banking application and why?',
      a: `<strong>Continuous Delivery:</strong> Every code change is automatically tested and built into a deployable artifact. Deployment to production requires a <strong>manual approval</strong> — a human decides when to release.<br><br>
<strong>Continuous Deployment:</strong> Every code change that passes all automated tests is automatically deployed to production. <strong>Zero human intervention</strong> — if tests pass, it ships.<br><br>
<strong>For a banking application: Continuous Delivery, always.</strong><br><br>
Reasons: Banking apps handle financial transactions — a bug in production causes real monetary loss and regulatory violations. Regulatory compliance (PCI-DSS, SBP regulations in Pakistan) often requires documented change approvals before production changes. A manual approval gate gives compliance officers, QA leads, and product owners a chance to sign off. The risk-to-speed tradeoff strongly favors control over velocity.<br><br>
<strong>Contrast with a marketing landing page:</strong> That's a great candidate for Continuous Deployment — low risk, fast feedback, no regulatory constraints.<br><br>
<span class="qa-pill">CD = manual gate before prod</span><span class="qa-pill">Continuous Deployment = auto to prod</span><span class="qa-pill">banking = CD + approval gates</span><span class="qa-pill">risk determines which</span>`
    },
    {
      n: 'Q85',
      badge_color: '#f97316',
      q: 'What is Docker layer caching and how do you write a Dockerfile to maximize it?',
      a: `<strong>How layers work:</strong> Every Dockerfile instruction (FROM, RUN, COPY, etc.) creates an immutable layer. Docker caches each layer by its instruction + content hash. On rebuild, Docker reuses cached layers until it hits a layer whose content changed — then it rebuilds that layer and <strong>every subsequent layer</strong>.<br><br>
<strong>The key rule:</strong> Put things that change LEAST OFTEN at the top. Put things that change MOST OFTEN at the bottom.<br><br>
<strong>Bad (kills caching):</strong><br>
<code>COPY . .</code>  ← copies all source code first<br>
<code>RUN npm install</code>  ← every code change forces a full npm install<br><br>
<strong>Good (maximizes caching):</strong><br>
<code>COPY package*.json ./</code>  ← only package files<br>
<code>RUN npm install</code>  ← cached until package.json changes<br>
<code>COPY . .</code>  ← only invalidates this layer on code change<br><br>
<strong>Real impact:</strong> On a project with 200 dependencies, bad ordering = 3-minute npm install on every build. Good ordering = 3 seconds (cache hit). Over 50 daily builds, that's 2.5 hours saved per day.<br><br>
<strong>Other caching tricks:</strong> Use <code>--mount=type=cache</code> in BuildKit for package manager caches across builds. Use multi-stage builds to avoid copying build tools into final image.<br><br>
<span class="qa-pill">least-changing layers first</span><span class="qa-pill">COPY package.json before COPY .</span><span class="qa-pill">invalidation cascades down</span><span class="qa-pill">BuildKit cache mounts</span>`
    },
    {
      n: 'Q86',
      badge_color: '#818cf8',
      q: 'A Kubernetes pod is stuck in "Pending" state. Walk me through every possible reason and how you diagnose each one.',
      a: `<code>kubectl describe pod &lt;name&gt;</code> — the Events section at the bottom tells you exactly why. But here are all possible causes:<br><br>
<strong>1. Insufficient resources on all nodes:</strong> Event: <em>"0/3 nodes are available: 3 Insufficient cpu"</em>. Fix: reduce resource requests in deployment, add nodes, or remove idle workloads. Check: <code>kubectl top nodes</code>.<br><br>
<strong>2. Node selector / affinity mismatch:</strong> Pod requires a node label that no node has. Event: <em>"didn't match node selector"</em>. Fix: <code>kubectl get nodes --show-labels</code> to verify labels match your <code>nodeSelector</code>.<br><br>
<strong>3. Taints and tolerations:</strong> Nodes have taints the pod doesn't tolerate. Event: <em>"had taint ... that the pod didn't tolerate"</em>. Fix: add matching toleration to pod spec.<br><br>
<strong>4. PVC not bound:</strong> Pod uses a PersistentVolumeClaim that's Pending. Event: <em>"pod has unbound immediate PersistentVolumeClaims"</em>. Fix: <code>kubectl get pvc</code> — check if PV exists and StorageClass is configured.<br><br>
<strong>5. Image pull limit (not ImagePullBackOff yet):</strong> First pull attempt is slow. Wait or check registry credentials.<br><br>
<strong>6. Namespace resource quotas exceeded:</strong> The namespace has a ResourceQuota and you've hit the limit. Fix: <code>kubectl describe resourcequota -n &lt;namespace&gt;</code>.<br><br>
<span class="qa-pill">kubectl describe pod first</span><span class="qa-pill">6 root causes</span><span class="qa-pill">Events section = the answer</span><span class="qa-pill">kubectl top nodes for resources</span>`
    },
    {
      n: 'Q87',
      badge_color: '#f43f5e',
      q: 'What is "infrastructure drift" and how do you prevent and detect it with Terraform?',
      a: `<strong>Infrastructure drift</strong> is when the real state of your cloud resources diverges from what your Terraform code describes. Someone manually changed a security group rule in the AWS console. An auto-scaling event added an EC2 instance. A colleague ran AWS CLI to modify an RDS parameter. Now Terraform's state file no longer matches reality.<br><br>
<strong>Why it's dangerous:</strong> Your Terraform code becomes a lie. The next <code>terraform apply</code> might revert manual changes (causing an outage) or fail with confusing errors.<br><br>
<strong>Detection:</strong> <code>terraform plan</code> always shows drift — if the plan shows unexpected changes, that's drift. Also: <code>terraform refresh</code> syncs the state file with real infrastructure without making changes.<br><br>
<strong>Prevention strategies:</strong><br>
• <strong>Enforce IaC-only changes:</strong> Use AWS SCPs (Service Control Policies) to deny console/CLI changes in production — all changes must go through Terraform/CI pipeline.<br>
• <strong>Automated drift detection:</strong> Run <code>terraform plan</code> in CI on a schedule (e.g., nightly). If the plan is non-empty, open a GitHub issue or Slack alert.<br>
• <strong>State locking:</strong> DynamoDB table prevents two people running apply simultaneously — a common drift source.<br>
• <strong>Immutable infrastructure:</strong> Never modify existing resources — replace them. No SSHing in and tweaking configs.<br><br>
<span class="qa-pill">drift = state ≠ reality</span><span class="qa-pill">terraform plan detects it</span><span class="qa-pill">SCP to enforce IaC-only</span><span class="qa-pill">nightly drift CI job</span>`
    },
    {
      n: 'Q88',
      badge_color: '#fbbf24',
      q: 'What is GitOps and how is it different from traditional CI/CD?',
      a: `<strong>GitOps</strong> is an operational model where Git is the single source of truth for both application code AND infrastructure state. Instead of a pipeline pushing deployments, a controller inside the cluster continuously watches a Git repo and reconciles the cluster to match whatever is in that repo.<br><br>
<strong>Traditional CI/CD (push model):</strong><br>
Code push → CI builds → pipeline pushes deployment to cluster → done. The pipeline has credentials to reach into the cluster.<br><br>
<strong>GitOps (pull model):</strong><br>
Code push → CI builds image, updates image tag in Git manifest repo → ArgoCD/Flux (running inside cluster) detects the Git change → pulls new state → applies it → continuously ensures cluster matches Git.<br><br>
<strong>Key differences:</strong><br>
• <strong>Security:</strong> Cluster reaches out to Git — no external system has cluster credentials. Reduced attack surface.<br>
• <strong>Auditability:</strong> Every deployment is a Git commit — full history, who changed what, when, and why (commit message).<br>
• <strong>Recovery:</strong> Disaster recovery = <code>git clone + argocd sync</code>. The entire cluster state is in Git.<br>
• <strong>Drift detection:</strong> ArgoCD continuously compares desired state (Git) vs actual state (cluster) and alerts on divergence.<br><br>
<strong>Tools:</strong> ArgoCD (most popular), Flux v2. Both work with Kubernetes manifests, Helm charts, or Kustomize.<br><br>
<span class="qa-pill">Git = source of truth</span><span class="qa-pill">pull model vs push model</span><span class="qa-pill">ArgoCD / Flux</span><span class="qa-pill">every deploy = git commit</span>`
    },
    {
      n: 'Q89',
      badge_color: '#38bdf8',
      q: 'How do you handle secrets in a CI/CD pipeline? What are the worst mistakes people make?',
      a: `<strong>Correct approaches (in order of preference):</strong><br><br>
<strong>1. Cloud-native secrets managers:</strong> AWS Secrets Manager, AWS SSM Parameter Store, HashiCorp Vault. Secrets live outside your pipeline entirely. Pipeline fetches at runtime using IAM role — no secret ever touches the pipeline config.<br><br>
<strong>2. CI/CD platform secrets:</strong> GitHub Actions Secrets, Jenkins Credentials Store, GitLab CI Variables (masked). Injected as environment variables at runtime. Never appear in logs (masked as ****).<br><br>
<strong>3. OIDC (keyless auth):</strong> GitHub Actions can assume an AWS IAM role via OIDC — no static AWS keys stored anywhere at all. The gold standard.<br><br>
<strong>The WORST mistakes people actually make (all real):</strong><br>
• Committing a <code>.env</code> file to Git — it lives in history forever even after deletion<br>
• Hardcoding API keys in Dockerfiles or docker-compose.yml<br>
• Printing env vars in CI logs with <code>env</code> or <code>printenv</code><br>
• Using the same secret across all environments (dev password = prod password)<br>
• Not rotating secrets after an engineer leaves the company<br>
• Storing secrets in Terraform code (they end up in the state file in plain text)<br><br>
<strong>Secret rotation:</strong> AWS Secrets Manager auto-rotates RDS passwords. For other secrets, build a rotation pipeline. Assume breach: rotate secrets more often than you think you need to.<br><br>
<span class="qa-pill">IAM roles over keys</span><span class="qa-pill">OIDC = no stored keys</span><span class="qa-pill">never in Git or Dockerfile</span><span class="qa-pill">rotate regularly</span>`
    },
    {
      n: 'Q90',
      badge_color: '#22c55e',
      q: 'What is the difference between horizontal and vertical scaling? When would you choose each?',
      a: `<strong>Vertical scaling (scale up):</strong> Make the existing machine bigger. Upgrade from t2.micro to t2.2xlarge. Add more RAM, CPU cores to the same server. Simple — no application changes needed. But limited by the biggest available instance size. Has a single point of failure. Requires downtime in some cases.<br><br>
<strong>Horizontal scaling (scale out):</strong> Add more machines. Go from 1 EC2 to 10 EC2 instances behind a load balancer. Theoretically unlimited. No single point of failure. Requires your app to be stateless (or handle distributed state). More complex infrastructure.<br><br>
<strong>When to use vertical:</strong> Database servers that are hard to distribute (MySQL on a single node). Stateful applications that weren't built for distributed deployment. Quick fix for a performance problem when you don't have time to architect horizontal scaling. Legacy monoliths.<br><br>
<strong>When to use horizontal:</strong> Web servers, API servers, microservices — anything stateless. When you need high availability (multiple instances = no single point of failure). When load is variable — autoscaling adds/removes instances based on demand. Modern cloud-native applications.<br><br>
<strong>The modern answer:</strong> Design for horizontal from day one. Stateless apps + load balancer + Auto Scaling Group = true cloud-native. Use RDS Multi-AZ for databases (vertical + managed failover).<br><br>
<span class="qa-pill">vertical = bigger machine</span><span class="qa-pill">horizontal = more machines</span><span class="qa-pill">stateless apps → horizontal</span><span class="qa-pill">DBs often vertical</span>`
    },
    {
      n: 'Q91',
      badge_color: '#a78bfa',
      q: 'What is a service mesh and when would you actually need one? (Istio / Linkerd)',
      a: `<strong>A service mesh</strong> is an infrastructure layer that handles service-to-service communication inside a Kubernetes cluster. It injects a sidecar proxy (Envoy) into every pod. All traffic between services flows through these proxies instead of directly pod-to-pod.<br><br>
<strong>What it gives you:</strong><br>
• <strong>mTLS everywhere:</strong> All service-to-service traffic is automatically encrypted and mutually authenticated. No code changes.<br>
• <strong>Traffic management:</strong> Canary deployments by weight (5% to new version), circuit breakers, retries, timeouts — all configured centrally.<br>
• <strong>Observability:</strong> Automatic distributed traces, service-level metrics, and dependency graphs — again, zero code changes.<br>
• <strong>Policy enforcement:</strong> "Service A is not allowed to talk to Service B" — enforced at the proxy level, not in application code.<br><br>
<strong>When you actually NEED it:</strong><br>
• 20+ microservices with complex inter-service communication<br>
• Compliance requirements for encryption in transit between services<br>
• You need canary deployments at the traffic level, not pod level<br>
• Debugging distributed traces across many services<br><br>
<strong>When you DON'T need it:</strong><br>
• Small teams with &lt;10 services — the operational overhead of Istio is enormous<br>
• Monoliths or simple microservices<br>
The joke: "Istio solves problems you don't have yet, and creates problems you definitely didn't expect."<br><br>
<span class="qa-pill">sidecar proxy per pod</span><span class="qa-pill">mTLS, traffic control, observability</span><span class="qa-pill">Istio / Linkerd</span><span class="qa-pill">only for 20+ services</span>`
    },
    {
      n: 'Q92',
      badge_color: '#f97316',
      q: 'Explain blue-green deployment vs canary deployment. Which would you use and when?',
      a: `<strong>Blue-Green Deployment:</strong><br>
Run two identical production environments — blue (current live) and green (new version). Deploy the new version to green. Test it. When confident, flip the load balancer to send 100% of traffic to green instantly. Blue becomes the immediate rollback target if something goes wrong.<br>
<em>Rollback time: seconds (flip the LB back).</em><br>
<em>Cost: doubles your infrastructure during deployment.</em><br><br>
<strong>Canary Deployment:</strong><br>
Gradually shift a small percentage of real traffic to the new version. Start at 5% → if metrics look good → 25% → 50% → 100%. If errors appear at 5%, you've only impacted 5% of users.<br>
<em>Risk: lower — catches issues on a small audience first.</em><br>
<em>Rollback: more gradual, not instant.</em><br>
<em>Requires: traffic splitting (ALB weighted target groups, Istio, Argo Rollouts).</em><br><br>
<strong>When to use Blue-Green:</strong><br>
• Database migrations that aren't backward compatible<br>
• Predictable, scheduled releases<br>
• When instant rollback is the top priority<br>
• You have the infrastructure budget<br><br>
<strong>When to use Canary:</strong><br>
• High-traffic apps — you want to test on real users but limit blast radius<br>
• Feature releases where you want to validate business metrics (conversion rate, error rate) before full rollout<br>
• Microservices — canary one service at a time<br><br>
<span class="qa-pill">blue-green = instant cutover</span><span class="qa-pill">canary = gradual traffic shift</span><span class="qa-pill">blue-green = instant rollback</span><span class="qa-pill">canary = lower blast radius</span>`
    },
    {
      n: 'Q93',
      badge_color: '#ef4444',
      q: 'What is the difference between stateful and stateless applications? How does this affect how you deploy them in Kubernetes?',
      a: `<strong>Stateless:</strong> Each request is independent. The server doesn't remember previous interactions. Any instance can handle any request. State (session data, user data) is stored externally in a database or cache (Redis). Examples: REST APIs, web servers, Lambda functions.<br><br>
<strong>Stateful:</strong> The server maintains state between requests. Each instance has data specific to it that can't be freely replaced. Examples: databases, Kafka brokers, Zookeeper, legacy session-based apps.<br><br>
<strong>In Kubernetes:</strong><br>
<strong>Stateless → use Deployments:</strong><br>
• Pods are interchangeable — kill any, create any<br>
• Random names (myapp-7f9d3-xkl2p)<br>
• Load balance freely across all replicas<br>
• Scale up/down without data concerns<br><br>
<strong>Stateful → use StatefulSets:</strong><br>
• Pods have stable, predictable names (mysql-0, mysql-1, mysql-2)<br>
• Each pod gets its own PersistentVolumeClaim — data survives pod restart<br>
• Ordered startup/shutdown: mysql-0 starts first, mysql-1 second<br>
• DNS: <code>mysql-0.mysql-service.namespace.svc.cluster.local</code><br>
• Headless service (<code>clusterIP: None</code>) for direct pod addressing<br><br>
<strong>Best practice:</strong> Design apps to be stateless whenever possible. Offload state to managed services (RDS, ElastiCache). Use StatefulSets only when necessary — they're harder to operate.<br><br>
<span class="qa-pill">stateless → Deployment</span><span class="qa-pill">stateful → StatefulSet</span><span class="qa-pill">StatefulSet = stable names + PVCs</span><span class="qa-pill">design stateless by default</span>`
    },
    {
      n: 'Q94',
      badge_color: '#38bdf8',
      q: 'Your team wants to move from a monolith to microservices. What are the DevOps challenges and how do you address them?',
      a: `This is a trap question — interviewers want to see if you understand the operational complexity increase, not just the architecture benefits.<br><br>
<strong>Challenges and how to address them:</strong><br><br>
<strong>1. Deployment complexity explodes:</strong> 1 deployment becomes 15. Solution: each microservice gets its own CI/CD pipeline (Multibranch Jenkins / GitHub Actions per repo). Use a service template so every new service gets a working pipeline on day one.<br><br>
<strong>2. Distributed tracing becomes essential:</strong> A single user request now touches 6 services. Which one is slow? Solution: implement distributed tracing from day one (Jaeger, AWS X-Ray). Without it, debugging is impossible.<br><br>
<strong>3. Service discovery and networking:</strong> Services need to find each other. Solution: Kubernetes Services handle this. Use DNS: <code>http://user-service.prod.svc.cluster.local</code>.<br><br>
<strong>4. Configuration management:</strong> Each service has its own config and secrets. Solution: Kubernetes ConfigMaps + Secrets, or a central config server. SSM Parameter Store per service prefix (<code>/prod/user-service/</code>).<br><br>
<strong>5. Testing across service boundaries:</strong> Integration tests get complex. Solution: contract testing (Pact), consumer-driven contracts. Each service owns its interface contract.<br><br>
<strong>6. Data management:</strong> Microservices should own their data — no shared database. Solution: each service gets its own RDS instance or database. Use event sourcing/messaging (SQS, Kafka) for cross-service data sync.<br><br>
<strong>My honest recommendation:</strong> Start with a "modular monolith" — clean boundaries inside one deployment. Only break out microservices when you have genuine scale or team independence needs. Microservices solve an organizational problem as much as a technical one.<br><br>
<span class="qa-pill">CI/CD per service</span><span class="qa-pill">distributed tracing mandatory</span><span class="qa-pill">each service owns its data</span><span class="qa-pill">consider modular monolith first</span>`
    },
    {
      n: 'Q95',
      badge_color: '#22c55e',
      q: 'What is the Strangler Fig pattern and when would you use it in a DevOps context?',
      a: `Named after a fig tree that grows around an existing tree and gradually replaces it. In software, it's a migration strategy for replacing a legacy monolith with new services <strong>incrementally, without a big-bang rewrite</strong>.<br><br>
<strong>How it works:</strong><br>
1. Put a routing layer (reverse proxy / API gateway) in front of the monolith<br>
2. Implement a new feature or module as a separate microservice<br>
3. Route traffic for that specific endpoint to the new service<br>
4. Gradually "strangle" the monolith by migrating feature by feature<br>
5. Eventually the monolith is empty — decommission it<br><br>
<strong>DevOps implementation:</strong><br>
• Nginx/ALB path-based routing: <code>/users/*</code> → new user-service, rest → monolith<br>
• Feature flags to control which users hit new vs old service<br>
• Both systems run in parallel — rollback = change the routing rule<br>
• Database: strangler pattern often requires a data sync layer initially<br><br>
<strong>When to use it:</strong> Any legacy modernization. Large monolith that's too risky to rewrite at once. When the business can't stop shipping features during a migration. Works well with DevOps because you can ship improvements continuously instead of a 6-month freeze for a rewrite.<br><br>
<strong>Real example:</strong> Amazon migrated from its monolith to microservices over several years using this exact pattern — never stopping operations.<br><br>
<span class="qa-pill">incremental monolith replacement</span><span class="qa-pill">routing layer in front</span><span class="qa-pill">no big-bang rewrite</span><span class="qa-pill">rollback = route change</span>`
    },
    {
      n: 'Q96',
      badge_color: '#f43f5e',
      q: 'How do you implement zero-downtime database migrations in a CI/CD pipeline?',
      a: `Database migrations are the hardest part of zero-downtime deployments. The challenge: you deploy a new app version that requires a new schema, but old app pods are still running on the old schema. Both must work simultaneously during the rollout.<br><br>
<strong>The expand-contract pattern (the only safe way):</strong><br><br>
<strong>Deploy 1 — Expand:</strong> Add the new column/table WITHOUT removing old ones. Old app ignores the new column. New app writes to both old and new.<br>
Example: adding <code>email_verified</code> column — add it as nullable, old app ignores it, new app sets it.<br><br>
<strong>Deploy 2 — Migrate:</strong> Backfill existing data. Run migration scripts. All pods now on new version.<br><br>
<strong>Deploy 3 — Contract:</strong> Remove the old column/table now that no code references it.<br><br>
<strong>In CI/CD pipelines:</strong><br>
• Use migration tools: Flyway, Liquibase, Alembic (Python) — versioned, idempotent migrations<br>
• Run migrations as a Kubernetes Job or Helm pre-upgrade hook before app pods start<br>
• Never run migrations inside app startup — multiple replicas = race condition<br>
• Always test rollback: can you run the DOWN migration safely?<br>
• For large tables: use pt-online-schema-change (Percona) or gh-ost — zero-lock migrations<br><br>
<span class="qa-pill">expand-contract pattern</span><span class="qa-pill">migrations as K8s Job</span><span class="qa-pill">Flyway / Liquibase</span><span class="qa-pill">never in app startup</span>`
    },
    {
      n: 'Q97',
      badge_color: '#818cf8',
      q: 'What is "shift left" security (DevSecOps) and how do you implement it practically in a pipeline?',
      a: `<strong>Shift left</strong> means moving security checks earlier in the development lifecycle — to the left of the timeline. Instead of security scanning production after deployment, you catch vulnerabilities at code commit, in CI, before they ever reach prod. Cheaper to fix a vulnerability in a PR than in production.<br><br>
<strong>Practical implementation — security at every pipeline stage:</strong><br><br>
<strong>Stage 1 — Local / Pre-commit:</strong><br>
• <code>git-secrets</code> or <code>gitleaks</code> as a pre-commit hook — blocks commits containing hardcoded API keys/passwords<br>
• <code>detect-secrets</code> — scans staged files for secrets before commit<br><br>
<strong>Stage 2 — CI (on every PR):</strong><br>
• <strong>SAST (Static Application Security Testing):</strong> Scan source code for vulnerabilities. Tools: SonarQube, Semgrep, Snyk Code<br>
• <strong>Dependency scanning:</strong> <code>npm audit</code>, Snyk, OWASP Dependency-Check — find CVEs in your packages<br>
• <strong>Secret scanning:</strong> GitHub Advanced Security, truffleHog — catch secrets that slipped through pre-commit<br><br>
<strong>Stage 3 — Build:</strong><br>
• <strong>Container image scanning:</strong> Trivy, Snyk Container, AWS ECR scanning — scan Docker image layers for known CVEs before pushing<br>
• Run as non-root user in Dockerfile (<code>USER 1000</code>)<br><br>
<strong>Stage 4 — Deploy:</strong><br>
• <strong>IaC scanning:</strong> tfsec, checkov — scan Terraform for misconfigurations (public S3 bucket, open security groups)<br>
• OPA/Gatekeeper — Kubernetes admission controller that blocks non-compliant manifests<br><br>
<strong>Stage 5 — Runtime:</strong><br>
• DAST (Dynamic Application Security Testing): OWASP ZAP, Burp Suite — test the running app<br>
• WAF (AWS WAF) — runtime protection<br><br>
<span class="qa-pill">security in every pipeline stage</span><span class="qa-pill">gitleaks pre-commit</span><span class="qa-pill">Trivy image scanning</span><span class="qa-pill">tfsec for Terraform</span>`
    },
    {
      n: 'Q98',
      badge_color: '#fbbf24',
      q: 'What are DORA metrics and how do you measure them? Why do interviewers ask about this?',
      a: `<strong>DORA (DevOps Research and Assessment)</strong> metrics are the 4 industry-standard measures of DevOps team performance, backed by years of research. They are the evidence-based answer to "how good is your DevOps practice?"<br><br>
<strong>The 4 metrics:</strong><br><br>
<strong>1. Deployment Frequency</strong> — How often do you deploy to production?<br>
Elite: multiple times per day. High: weekly. Medium: monthly. Low: every 6 months.<br>
Measure: count production deployments from your CD tool (Jenkins, ArgoCD).<br><br>
<strong>2. Lead Time for Changes</strong> — Time from code commit to running in production.<br>
Elite: &lt;1 hour. High: &lt;1 day. Medium: &lt;1 week. Low: &gt;1 month.<br>
Measure: timestamp from git commit to successful deployment.<br><br>
<strong>3. Change Failure Rate</strong> — % of deployments that cause a production incident requiring rollback/hotfix.<br>
Elite: 0–15%. High: 16–30%.<br>
Measure: incidents caused by deployments / total deployments.<br><br>
<strong>4. Mean Time to Recovery (MTTR)</strong> — How long to restore service after a failure?<br>
Elite: &lt;1 hour. High: &lt;1 day.<br>
Measure: time from incident detection to resolution (PagerDuty, status page).<br><br>
<strong>Why interviewers ask:</strong> It shows you understand DevOps as a business outcome, not just a set of tools. Saying "we improved deployment frequency from weekly to daily and reduced MTTR from 4 hours to 30 minutes" is concrete proof you delivered value.<br><br>
<span class="qa-pill">deploy freq + lead time + CFR + MTTR</span><span class="qa-pill">elite = multiple deploys/day</span><span class="qa-pill">evidence of DevOps value</span><span class="qa-pill">measure in your pipeline</span>`
    },
    {
      n: 'Q99',
      badge_color: '#38bdf8',
      q: 'You need to run a batch job that processes 10,000 records every night at 2am. How do you architect this on AWS without a server running 24/7?',
      a: `This is a serverless / event-driven architecture question. Multiple valid approaches:<br><br>
<strong>Option 1 — Lambda + EventBridge (best for short jobs &lt;15min):</strong><br>
• AWS EventBridge (CloudWatch Events) cron rule: <code>cron(0 21 * * ? *)</code> = 2am PKT<br>
• Triggers a Lambda function<br>
• Lambda processes records (reads from RDS/S3, writes results)<br>
• Cost: ~$0.00 (Lambda free tier covers 1M invocations/month)<br>
• Limit: 15-minute max execution time. For 10k records it's fine.<br><br>
<strong>Option 2 — ECS Fargate Scheduled Task (for longer jobs or heavy processing):</strong><br>
• EventBridge rule → ECS RunTask API<br>
• Fargate spins up a container at 2am, processes all records, terminates<br>
• No server running 24/7 — you pay only for the ~10 minutes of execution<br>
• No 15-min limit<br><br>
<strong>Option 3 — Kubernetes CronJob:</strong><br>
<code>spec.schedule: "0 21 * * *"</code><br>
Kubernetes creates a Pod at 2am, runs the job, deletes the pod.<br><br>
<strong>Option 4 — AWS Batch:</strong> For extremely large datasets, parallel processing across multiple compute nodes. Overkill for 10k records.<br><br>
<strong>My recommendation:</strong> Lambda + EventBridge for simplicity. If processing time exceeds 15 min or needs more memory/CPU, use Fargate Scheduled Task.<br><br>
<span class="qa-pill">EventBridge cron trigger</span><span class="qa-pill">Lambda &lt;15min</span><span class="qa-pill">Fargate for longer jobs</span><span class="qa-pill">K8s CronJob</span>`
    },
    {
      n: 'Q100',
      badge_color: '#22c55e',
      q: 'What is Ansible and how does it compare to Terraform? Can you give a real example of using Ansible for server configuration?',
      a: `<strong>The one-line difference:</strong> Terraform provisions infrastructure (creates EC2 instances, VPCs, RDS). Ansible configures what's already running (installs software, manages services, deploys configs).<br><br>
<strong>Key difference — state management:</strong><br>
Terraform is <strong>stateful</strong> — it remembers what it created and diffs against it. Ansible is <strong>stateless</strong> — it runs tasks idempotently without remembering previous runs.<br><br>
<strong>When to use which:</strong><br>
• Terraform: creating and destroying cloud resources<br>
• Ansible: configuring servers, managing packages, deploying application configs<br>
• Together: Terraform creates the EC2, Ansible configures it<br><br>
<strong>Real Ansible playbook — set up Nginx on an EC2:</strong><br>
<pre style="background:rgba(0,0,0,0.3);border:1px solid #1e293b;border-radius:3px;padding:8px;margin:6px 0;font-size:10px;color:#fbbf24;">---
- name: Configure web servers
  hosts: web_servers
  become: yes          # run as sudo

  tasks:
    - name: Install Nginx
      apt:
        name: nginx
        state: present   # idempotent: only installs if not present
        update_cache: yes

    - name: Copy nginx config
      template:
        src: templates/nginx.conf.j2
        dest: /etc/nginx/nginx.conf
      notify: Restart Nginx     # trigger handler on change

    - name: Ensure nginx is running and enabled
      service:
        name: nginx
        state: started
        enabled: yes

  handlers:
    - name: Restart Nginx
      service:
        name: nginx
        state: restarted</pre>
Run with: <code>ansible-playbook -i inventory.ini setup.yml</code><br><br>
<span class="qa-pill">Terraform = provision</span><span class="qa-pill">Ansible = configure</span><span class="qa-pill">Ansible = agentless SSH</span><span class="qa-pill">idempotent by design</span>`
    },
    {
      n: 'Q101',
      badge_color: '#f97316',
      q: 'How do you debug a failing GitHub Actions workflow? Walk me through your exact process.',
      a: `<strong>Step 1 — Read the workflow summary:</strong> GitHub shows a visual summary with which job and step failed. The red ✕ tells you the exact step. Don't skip this — it saves 90% of debugging time.<br><br>
<strong>Step 2 — Expand the failed step logs:</strong> Click on the failed step → read the full output. Look for the actual error message, not the "Process completed with exit code 1" wrapper.<br><br>
<strong>Step 3 — Common issues and fixes:</strong><br>
• <em>"Credential/permission denied"</em> → check Secrets are set in repo Settings → Secrets. Check IAM role has correct permissions. Check <code>permissions:</code> block in workflow.<br>
• <em>"Command not found"</em> → the runner doesn't have the tool. Add a setup step: <code>actions/setup-node</code>, <code>actions/setup-python</code>, etc.<br>
• <em>"File not found"</em> → wrong path. Add <code>run: ls -la</code> to see what's actually there.<br>
• <em>"Tests failed"</em> → actual test failure, not a workflow issue. Fix the tests.<br><br>
<strong>Step 4 — Add debug output temporarily:</strong><br>
<code>- run: env  # print all env vars</code><br>
<code>- run: pwd && ls -la  # see current directory</code><br>
Enable debug logging: add secret <code>ACTIONS_RUNNER_DEBUG=true</code><br><br>
<strong>Step 5 — Re-run failed jobs:</strong> GitHub has "Re-run failed jobs" button — faster than pushing a new commit.<br><br>
<strong>Step 6 — Use <code>act</code> for local testing:</strong> <code>act</code> is a CLI tool that runs GitHub Actions locally. Saves push-wait-check cycles.<br><br>
<span class="qa-pill">read summary first</span><span class="qa-pill">expand failed step logs</span><span class="qa-pill">add debug run: steps</span><span class="qa-pill">act for local testing</span>`
    },
    {
      n: 'Q102',
      badge_color: '#818cf8',
      q: 'What would you do if you accidentally committed and pushed an AWS secret key to a public GitHub repo?',
      a: `<strong>This is a security incident — act immediately. Every second counts.</strong><br><br>
<strong>Step 1 — Rotate the key (do this FIRST, before anything else):</strong><br>
AWS Console → IAM → Users → your user → Security Credentials → Deactivate the leaked key → Create new access key. The old key is now useless even if someone already copied it.<br><br>
<strong>Step 2 — Check if it was already used:</strong><br>
AWS CloudTrail → Event history → filter by the access key ID. Look for any API calls you didn't make — especially <code>ec2:RunInstances</code>, <code>iam:CreateUser</code>, <code>s3:GetObject</code>. If you see unexpected calls, you may have an active breach — escalate.<br><br>
<strong>Step 3 — Remove from Git history:</strong><br>
Deleting the file or pushing a new commit does NOT remove the secret from git history. Use:<br>
<code>git-filter-repo --path secrets.env --invert-paths</code><br>
Or BFG Repo Cleaner: <code>bfg --delete-files secrets.env</code><br>
Force push to rewrite history. Note: anyone who cloned the repo may still have the old history.<br><br>
<strong>Step 4 — If it's a public repo — assume compromised:</strong><br>
GitHub's secret scanning automatically notifies AWS when it finds AWS keys in public repos. AWS may have already deactivated the key. Treat all resources managed by that key as potentially compromised — audit everything.<br><br>
<strong>Step 5 — Post-incident prevention:</strong><br>
Add <code>gitleaks</code> or <code>git-secrets</code> as a pre-commit hook. Add <code>.env</code> and <code>*.pem</code> to <code>.gitignore</code>. Enable GitHub secret scanning on all repos.<br><br>
<span class="qa-pill">rotate key FIRST</span><span class="qa-pill">check CloudTrail for misuse</span><span class="qa-pill">git-filter-repo to purge history</span><span class="qa-pill">gitleaks to prevent recurrence</span>`
    }
  ];

  fresh.forEach(function(item) {
    const div = document.createElement('div');
    div.className = 'qa-item';
    const badgeStyle = `color:${item.badge_color};background:rgba(0,0,0,0.3);border-color:rgba(255,255,255,0.1);`;
    div.innerHTML = `<div class="qa-q" onclick="toggle(this)"><span class="qa-q-badge" style="${badgeStyle}">${item.n}</span><span class="qa-q-text">${item.q}</span><span class="qa-chevron">▼</span></div><div class="qa-a"><div class="qa-a-badge">ANSWER</div><div class="qa-a-text">${item.a}</div></div>`;
    list.appendChild(div);
  });
})();

(function() {
  const list = document.getElementById('qaList');
  if (!list) return;
  const newQAs = [
    {
      n: 'Q75',
      q: 'What is the difference between L4 and L7 load balancers? (NLB vs ALB)',
      a: `<strong>L4 — NLB (Network Load Balancer)</strong> — only sees IP address and TCP/UDP port. No idea what the user is asking for. Forwards packets as fast as possible. Blazing fast, millions of connections. Use for raw TCP traffic (gaming, database connections).<br><br><strong>L7 — ALB (Application Load Balancer)</strong> — opens the packet and reads the HTTP request. Makes smart routing decisions based on URL path, headers, or cookies.<br><br>Path-based routing: <code>/api</code> → API servers, <code>/images</code> → image servers, <code>/</code> → frontend.<br><br>Most web apps use ALB. NLB for raw speed or non-HTTP protocols.<br><br><span class="qa-pill">L4/NLB = fast, blind, port-only</span><span class="qa-pill">L7/ALB = smart, reads HTTP, path routing</span>`
    },
    {
      n: 'Q76',
      q: 'What is a CDN and why does it matter for DevOps?',
      a: `A CDN (Content Delivery Network) caches static assets (images, JS, CSS) at <strong>edge locations</strong> globally. Requests are served from the nearest edge — not your origin server.<br><br><strong>Benefits:</strong> Drastically lower latency (user in Singapore gets content from Singapore edge, not a US server). Reduces origin load. Absorbs traffic spikes.<br><br><strong>DevOps gotcha:</strong> After a deployment, CDN may serve <em>stale</em> cached files. You need to <strong>invalidate the cache</strong> or use cache-busting (hashed filenames like <code>app.a3f9d2.js</code>).<br><br><strong>Services:</strong> AWS CloudFront, Cloudflare, Fastly.<br><br><span class="qa-pill">edge caching = lower latency</span><span class="qa-pill">invalidate on deploy</span><span class="qa-pill">cache-busting via hashed filenames</span>`
    },
    {
      n: 'Q77',
      q: 'What is the difference between SLI, SLO, and SLA?',
      a: `<strong>SLI (Service Level Indicator)</strong> — the raw measurable metric. Error rate, p99 latency, uptime %. "What we measure."<br><br><strong>SLO (Service Level Objective)</strong> — internal target for an SLI. "99.9% of requests complete under 200ms." If you miss SLOs, your error budget is consumed. "What we aim for internally."<br><br><strong>SLA (Service Level Agreement)</strong> — contractual commitment to customers. "We guarantee 99.9% uptime or you get a credit." SLOs are internal. SLAs are external promises with financial consequences. "What we promise customers."<br><br>Rule: SLO should be tighter than SLA — gives you a buffer before breaching customer commitments.<br><br><span class="qa-pill">SLI = raw metric</span><span class="qa-pill">SLO = internal target</span><span class="qa-pill">SLA = customer contract</span><span class="qa-pill">SLO tighter than SLA</span>`
    },
    {
      n: 'Q78',
      q: 'What is the difference between a Security Group and a NACL in AWS?',
      a: `<strong>Security Group</strong> — instance-level firewall attached directly to an EC2 or RDS. Stateful: allow inbound and outbound return traffic is auto-allowed. Only Allow rules — everything else is denied. Primary security mechanism.<br><br><strong>NACL (Network Access Control List)</strong> — subnet-level firewall applied to all traffic in/out of a subnet. Stateless: must explicitly allow both inbound AND outbound. Supports explicit Deny rules (useful for blocking specific IPs).<br><br><strong>Use both together:</strong> Layered defense. Security Groups for instance-level access. NACLs as subnet backstop for blocking known malicious IPs.<br><br><span class="qa-pill">SG = instance-level, stateful</span><span class="qa-pill">NACL = subnet-level, stateless</span><span class="qa-pill">use both = defense in depth</span>`
    },
    {
      n: 'Q79',
      q: 'What is the difference between AWS S3, EBS, and EFS?',
      a: `<strong>S3 (Object storage)</strong> — infinitely scalable bucket for files. Accessed via HTTP API, not a mountable filesystem. Perfect for backups, static assets, logs, Terraform state, build artifacts. Cheap and durable.<br><br><strong>EBS (Block storage)</strong> — virtual hard drive attached to one EC2 instance. Like a physical laptop hard drive — holds OS, databases, app data. Fast, but tied to one instance and one AZ.<br><br><strong>EFS (Elastic File System)</strong> — shared network filesystem (NFS in the cloud). Multiple EC2 instances or K8s pods across different AZs can mount and read/write simultaneously. More expensive, but needed for shared storage scenarios.<br><br><span class="qa-pill">S3 = files via API, infinite</span><span class="qa-pill">EBS = virtual hard drive, one instance</span><span class="qa-pill">EFS = shared mount, multiple instances</span>`
    },
    {
      n: 'Q80',
      q: 'Walk me through a complete VPC architecture for a production web app.',
      a: `<strong>Step 1 — VPC:</strong> CIDR <code>10.0.0.0/16</code>. Use /16 for enough IPs.<br><br><strong>Step 2 — Subnets in 2 AZs (for HA):</strong><br>• Public (10.0.1.0/24, 10.0.3.0/24) — ALB + NAT GW<br>• Private (10.0.2.0/24, 10.0.4.0/24) — App servers + RDS<br><br><strong>Step 3 — Internet Gateway:</strong> Attach to VPC. Public subnet route table → 0.0.0.0/0 to IGW. Private subnet gets no IGW route.<br><br><strong>Step 4 — NAT Gateway:</strong> In public subnet. Private resources route outbound traffic through NAT (for updates) without being reachable from internet.<br><br><strong>Step 5 — Security Groups (Interview Gold):</strong> ALB SG allows 443 from internet. App SG allows from ALB SG only. RDS SG allows port 5432 from App SG only — never from internet. Reference SG IDs, not IPs.<br><br><span class="qa-pill">public = ALB + NAT GW</span><span class="qa-pill">private = app + DB</span><span class="qa-pill">SG references SG ID (not IP)</span>`
    },
    {
      n: 'Q81',
      q: 'What is AWS CloudFormation and how does it compare to Terraform?',
      a: `<strong>CloudFormation</strong> is AWS's native IaC service. Define resources in JSON/YAML templates. Provisions them as a <strong>Stack</strong>. Updates handled as change sets (preview before apply). Deep AWS integration, free to use, built-in rollback.<br><br><strong>vs Terraform:</strong><br>• CloudFormation = AWS-only. Terraform = multi-cloud (AWS + Azure + GCP in one HCL language).<br>• Terraform has a larger community and ecosystem.<br>• CloudFormation sometimes supports new AWS services faster (it's AWS's own tool).<br><br><strong>When to choose CloudFormation:</strong> AWS-only environment, deep service integration. <strong>Terraform:</strong> Multi-cloud, cloud-agnostic portability, or existing Terraform expertise.<br><br><span class="qa-pill">CloudFormation = AWS-native, free, JSON/YAML</span><span class="qa-pill">Terraform = multi-cloud, HCL</span>`
    },
    {
      n: 'Q82',
      q: 'Describe the full DevOps lifecycle from a Jira ticket to production.',
      a: `<strong>Phase 1 — Plan:</strong> Jira ticket → developer picks it up → creates feature branch.<br><strong>Phase 2 — CI:</strong> Code written → PR merged → GitHub Actions triggers → tests pass → Docker image built → pushed to ECR as <code>v2.0</code>.<br><strong>Phase 3 — IaC:</strong> Terraform verifies infra. Provisions new resources if needed (RDS for new feature).<br><strong>Phase 4 — CD:</strong> Pipeline deploys new image to K8s. Rolling update: new pods come up, health checks pass, old pods go down. Zero downtime.<br><strong>Phase 5 — Monitor:</strong> Prometheus scrapes metrics, Grafana dashboards update, CloudWatch monitors EC2 nodes.<br><strong>Phase 6 — Incident/Scale:</strong> Traffic spike → HPA scales pods. Bug → alert fires → check logs → rollback to v1.0 in seconds.<br><strong>Phase 7 — Feedback:</strong> Incident data → new Jira ticket → loop repeats.<br><br><span class="qa-pill">Jira → Git → CI → Terraform → K8s → Monitor → Feedback</span>`
    }
  ];
  newQAs.forEach(item => {
    const div = document.createElement('div');
    div.className = 'qa-item';
    div.innerHTML = `<div class="qa-q" onclick="toggle(this)"><span class="qa-q-badge">${item.n}</span><span class="qa-q-text">${item.q}</span><span class="qa-chevron">▼</span></div><div class="qa-a"><div class="qa-a-badge">ANSWER</div><div class="qa-a-text">${item.a}</div></div>`;
    list.appendChild(div);
  });
})();
