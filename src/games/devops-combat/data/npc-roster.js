// The 15 city NPC definitions.

export var NPC_ROSTER = [
    // ---- Town Square ----
    { id:'priya', name:'Priya', role:'the barista', topic:'Git & Version Control',
      hair:'nova', hairColor:'#3a2414', skinColor:'#e8ad7a', bodyColor:'#f8f1e2', trimColor:'#9c7a52',
      accessory:'apron', accColor:'#3f8f5c', x:320, y:250, wanderRadius:70, // environment addendum: nudged off the relocated Tailor building's footprint
      expr:{ idle:'idle', talk:'happy', happy:'excited', react:'curious' },
      dialogue:[
        "Commit early, commit often — small commits are easier to review, and way easier to revert.",
        "A good commit message answers 'why', not just 'what' — the diff already shows what changed.",
        "`git rebase` rewrites history; `git merge` preserves it. Rebase your own branch, merge into shared ones.",
        "Branch names like `feature/login-fix` tell the whole team what's in progress without opening a file.",
        "`.gitignore` exists so your `node_modules` folder never becomes someone else's problem.",
        "A pull request is a conversation, not a formality — leave real context for your reviewer.",
        "Squash your commits before merging if your history is twelve 'fix typo' commits in a row.",
        "Tags mark release points — `git tag v1.2.0` — so you can always find exactly what shipped."
      ] },
    { id:'zoe', name:'Zoe', role:'the office worker on break', topic:'CI/CD Pipelines',
      hair:'sage', hairColor:'#7a3c2a', skinColor:'#f0c9a0', bodyColor:'#f8f1e2', trimColor:'#9c7a52',
      accessory:'lanyard', accColor:'#e0722c', x:560, y:230, wanderRadius:70,
      expr:{ idle:'idle', talk:'confident', happy:'happy', react:'tired' },
      dialogue:[
        "A pipeline should fail fast — put the cheap, quick checks like lint and unit tests before the slow ones.",
        "If your build isn't reproducible, it isn't really tested. Pin your dependency versions.",
        "Feature flags let you ship code to production dark, then turn it on for real without a redeploy.",
        "A green pipeline on a broken app usually means your tests aren't testing the right thing.",
        "Cache your dependencies between pipeline runs — most CI minutes get wasted re-downloading the same packages.",
        "Deploy small and often. A tiny daily release is much easier to debug than a giant monthly one.",
        "Your staging environment should look like production, or 'it worked in staging' means nothing.",
        "Automate the boring parts of a release so a human only has to make the judgment calls."
      ] },
    { id:'kenji', name:'Kenji', role:'the student with headphones', topic:'Docker & Containers',
      hair:'byte', hairColor:'#1f7a6e', skinColor:'#e8ad7a', bodyColor:'#f8f1e2', trimColor:'#9c7a52',
      accessory:'headphones', accColor:'#2f4a5a', x:140, y:300, wanderRadius:60, // environment addendum: nudged off the relocated Armory's footprint
      expr:{ idle:'idle', talk:'playful', happy:'excited', react:'curious' },
      dialogue:[
        "A container isn't a lightweight VM — it shares the host's kernel, which is exactly why it starts so fast.",
        "Multi-stage builds keep your final image small — build with all the tools, ship with none of them.",
        "`.dockerignore` matters as much as `.gitignore` — don't COPY your whole repo into the image by accident.",
        "Containers should be stateless. If it needs to persist data, that's what volumes are for.",
        "One process per container is the guideline, not a hard law — but it makes scaling and debugging way easier.",
        "`docker logs` and `docker exec -it` are 90% of container debugging — get comfortable with both.",
        "Tag your images with something real, not just `latest` — you'll thank yourself during a rollback.",
        "Image layers are cached — order your Dockerfile so things that change often go near the bottom."
      ] },
    { id:'yuki', name:'Yuki', role:'the librarian', topic:'Security Basics',
      hair:'bun', hairColor:'#1c1c1c', skinColor:'#f0c9a0', bodyColor:'#f8f1e2', trimColor:'#9c7a52',
      accessory:'book', accColor:'#6b4a28', x:660, y:220, wanderRadius:0, // environment addendum: nudged off Bank, now just east of the Library (fitting, for "the librarian")
      expr:{ idle:'idle', talk:'confident', happy:'calm', react:'worried' },
      dialogue:[
        "The principle of least privilege: give an account exactly the access it needs, never more 'just in case.'",
        "Secrets don't belong in code, ever — not even in a private repo. Use a secrets manager.",
        "A dependency you didn't write is still your responsibility once it's in production — keep it patched.",
        "HTTPS everywhere isn't optional anymore — it's the default expectation, not an upgrade.",
        "Rotate credentials on a schedule, not just after you suspect something happened.",
        "Multi-factor authentication stops the vast majority of account takeovers cold — the cheapest security win there is.",
        "Logs are useless for security if nobody's watching them — alerting matters as much as logging.",
        "Every input from a user is untrusted until proven otherwise. Validate at the boundary."
      ] },
    { id:'sofia', name:'Sofia', role:'the pastry chef', topic:'YAML & Config Basics',
      hair:'nova', hairColor:'#d4a843', skinColor:'#f0c9a0', bodyColor:'#f8f1e2', trimColor:'#9c7a52',
      accessory:'chefhat', accColor:'#f8f1e2', x:400, y:340, wanderRadius:50,
      expr:{ idle:'idle', talk:'happy', happy:'excited', react:'confused' },
      dialogue:[
        "YAML is picky about indentation — two spaces, consistently, saves you a surprising number of headaches.",
        "Tabs and YAML don't mix. Most editors will silently convert them for you, some won't.",
        "A YAML anchor (`&name` / `*name`) lets you reuse a block instead of repeating it five times in one file.",
        "Quote your strings when they could be misread as another type — `yes`/`no` can parse as booleans by accident.",
        "Environment-specific config should live in separate files, not scattered `if` statements.",
        "Validate your YAML before you deploy it — a broken config file fails fast and cheap, or slow and expensive.",
        "Comments in config files are for the next person — including future you at 2 AM.",
        "A giant, deeply nested config file is a sign it's time to split it into smaller, composable pieces."
      ] },
    // ---- Training Grounds ----
    { id:'marcus', name:'Marcus', role:'the jogger', topic:'Linux & Terminal Basics',
      hair:'byte', hairColor:'#1c1c1c', skinColor:'#8a5a3a', bodyColor:'#f8f1e2', trimColor:'#9c7a52',
      accessory:'headband', accColor:'#c94f3d', x:720, y:260, wanderRadius:80, // environment addendum: nudged off the relocated Training Grounds building's footprint
      expr:{ idle:'idle', talk:'confident', happy:'happy', react:'playful' },
      dialogue:[
        "`grep -r` searches recursively through directories — way faster than opening every file by hand.",
        "Pipe commands together with `|` — `ps aux | grep node` finds exactly the process you're hunting.",
        "`chmod +x` makes a script executable. Forget it, and 'Permission denied' will haunt your afternoon.",
        "`tail -f` follows a log file live — perfect for watching an app boot up in real time.",
        "Everything in Linux is a file, even devices and processes — that's why `/proc` and `/dev` exist.",
        "Ctrl+R searches your shell history — no need to scroll up forever looking for that one command.",
        "`df -h` and `du -sh` tell two different stories: disk space available vs. what's actually using it.",
        "Aliases save your fingers — `alias gs='git status'` pays for itself in a week."
      ] },
    { id:'bigsam', name:'Big Sam', role:'the site engineer', topic:'Cloud & Networking',
      hair:'buzzcut', hairColor:'#5c4a2e', skinColor:'#e8ad7a', bodyColor:'#f8f1e2', trimColor:'#9c7a52',
      accessory:'cap', accColor:'#f2c14e', x:800, y:460, wanderRadius:60, // environment addendum: nudged off the relocated Training Grounds building's footprint
      expr:{ idle:'idle', talk:'confident', happy:'happy', react:'tired' },
      dialogue:[
        "A load balancer isn't just for scale — it's also how you survive one server dying at 3 AM.",
        "DNS changes take time to propagate. If it 'isn't working yet,' it might just be cache.",
        "Auto-scaling groups are great until they scale up because of a bug, not real traffic — watch your metrics.",
        "A security group that's wide open 'just for now' has a way of staying open forever.",
        "Cloud costs creep. An idle resource nobody remembers spinning up is still billing somebody.",
        "Multi-AZ isn't the same as multi-region — one protects against a data center problem, the other a whole region.",
        "A CDN caches content closer to users — often the cheapest performance win you can make.",
        "Infrastructure as code means your infra has a diff, a history, and a rollback — treat it like real code."
      ] },
    { id:'chidi', name:'Chidi', role:'the delivery cyclist', topic:'Monitoring & Observability',
      hair:'buzzcut', hairColor:'#1c1c1c', skinColor:'#7a4a2a', bodyColor:'#f8f1e2', trimColor:'#9c7a52',
      accessory:'cap', accColor:'#3f8f5c', x:850, y:250, wanderRadius:90,
      expr:{ idle:'idle', talk:'playful', happy:'excited', react:'curious' },
      dialogue:[
        "Metrics, logs, and traces are the 'three pillars' — each answers a different kind of question about your system.",
        "Alert on symptoms users would actually notice, not every internal metric that wiggles.",
        "A dashboard nobody looks at during a normal week won't help you during an incident either.",
        "P99 latency tells a very different story than average latency — the tail is where the pain lives.",
        "If every alert is 'urgent,' none of them are — alert fatigue is a real, dangerous failure mode.",
        "Structured logs (JSON, not plain text) are what make searching a million log lines actually possible.",
        "A good SLO turns 'is the system healthy' from a feeling into an actual number you can track.",
        "Distributed tracing shows you one request's whole journey across a dozen services — priceless during a slow-request mystery."
      ] },
    { id:'ernie', name:'Big Ernie', role:'the bouncer', topic:'Networking & Firewalls',
      hair:'buzzcut', hairColor:'#1c1c1c', skinColor:'#5a3a24', bodyColor:'#f8f1e2', trimColor:'#9c7a52',
      accessory:'earpiece', accColor:'#1c1c1c', x:650, y:420, wanderRadius:40, // environment addendum: nudged off the relocated Training Grounds building's footprint
      expr:{ idle:'idle', talk:'confident', happy:'confident', react:'angry' },
      dialogue:[
        "A firewall rule should say exactly what's allowed and default to denying everything else.",
        "TCP handshakes, DNS lookups, TLS negotiation — a 'slow' request is often three separate delays stacked up.",
        "Port 443 is HTTPS, 80 is HTTP, 22 is SSH — knowing the common ones saves a lot of Googling under pressure.",
        "A VPN doesn't make traffic invisible, it makes it private between two trusted points.",
        "Rate limiting protects your service from both attackers and your own retry logic gone wrong.",
        "Not all latency is your server's fault — sometimes it's just physical distance and the speed of light.",
        "NAT lets many internal machines share one public IP — most home networks run on this exact idea.",
        "A load balancer health check failing silently can quietly take your whole fleet out of rotation."
      ] },
    // ---- Residential District ----
    { id:'nanailse', name:'Nana Ilse', role:'the gardener', topic:'Career & Interview Advice',
      hair:'bun', hairColor:'#c9c9c9', skinColor:'#e8ad7a', bodyColor:'#f8f1e2', trimColor:'#9c7a52',
      accessory:'cap', accColor:'#e8d078', x:1000, y:425, wanderRadius:0,
      expr:{ idle:'calm', talk:'happy', happy:'excited', react:'confident' },
      dialogue:[
        "In interviews, walk through your reasoning out loud — they're grading how you think, not just the answer.",
        "'I don't know, but here's how I'd find out' is a completely acceptable interview answer.",
        "Ask about their on-call rotation before you accept an offer — it tells you a lot about the culture.",
        "A portfolio of real projects beats a list of certifications every time.",
        "When they ask about a time you failed, they want to hear what you learned, not a confession.",
        "Negotiate. The worst they say is no, and most companies expect you to ask.",
        "Read the job posting for what they're actually worried about, not just the tech stack listed.",
        "Silence during a technical question is fine — thinking out loud beats guessing fast."
      ] },
    { id:'walt', name:'Walt', role:'the retired engineer on the bench', topic:'Incident Response War Stories',
      hair:'buzzcut', hairColor:'#c9c9c9', skinColor:'#e8ad7a', bodyColor:'#f8f1e2', trimColor:'#9c7a52',
      accessory:'cap', accColor:'#5c4a2e', x:1090, y:430, wanderRadius:0,
      expr:{ idle:'tired', talk:'confident', happy:'happy', react:'worried' },
      dialogue:[
        "The first rule of an incident: stop the bleeding before you find the cause. Rollback first, investigate after.",
        "Whoever's paged should NOT also be the one writing the status page update — that's two jobs.",
        "Every real outage I've seen had a warning sign in the logs a week earlier nobody looked at twice.",
        "A blameless postmortem gets you the truth. A blame-y one gets you a story people tell carefully.",
        "Communicate over-often during an incident. Silence from the team is scarier than bad news.",
        "The most dangerous phrase in an incident is 'that shouldn't be possible.' Believe your monitors.",
        "Runbooks go stale. If nobody's touched yours in six months, it's probably already wrong somewhere.",
        "The 3 AM pages you remember are never the ones you expected."
      ] },
    { id:'oldtom', name:'Old Tom', role:'the regular on the other bench', topic:'Bash & Scripting',
      hair:'buzzcut', hairColor:'#e8e8e8', skinColor:'#f0c9a0', bodyColor:'#f8f1e2', trimColor:'#9c7a52',
      accessory:'cap', accColor:'#3f6b8f', x:1180, y:435, wanderRadius:0,
      expr:{ idle:'idle', talk:'confident', happy:'happy', react:'tired' },
      dialogue:[
        "`set -e` stops your script the moment something fails, instead of plowing ahead with bad data.",
        "Quote your variables — `\"$var\"` — or a filename with a space in it will break your script in a fun way.",
        "A script only you can read isn't automation, it's a trap for future-you.",
        "`$?` holds the exit code of the last command — 0 means success, anything else means something went sideways.",
        "Functions in a bash script are still just bash — keep them small, same as any real language.",
        "Trap signals (`trap ... EXIT`) to clean up temp files even if your script dies halfway through.",
        "Heredocs (`<<EOF`) are the cleanest way to write multi-line text without a wall of escaped quotes.",
        "If a one-liner is getting hard to read, it's begging to become a real script with a name."
      ] },
    { id:'ana', name:'Ana', role:'the dog walker', topic:'Terraform & Infrastructure as Code',
      hair:'nova', hairColor:'#8f2f27', skinColor:'#f0c9a0', bodyColor:'#f8f1e2', trimColor:'#9c7a52',
      accessory:'scarf', accColor:'#3f8f5c', x:1270, y:425, wanderRadius:20,
      expr:{ idle:'idle', talk:'happy', happy:'excited', react:'curious' },
      dialogue:[
        "`terraform plan` before `terraform apply` — always. It's your one chance to catch a surprise first.",
        "State files are precious — losing one means Terraform forgets what it already built.",
        "Modules let you reuse the same infrastructure pattern instead of copy-pasting it into every project.",
        "Locking your Terraform state prevents two people applying changes at the same time and colliding.",
        "Terraform describes desired state — change something by hand, and the next plan will want to 'fix' it.",
        "Variables and outputs are how modules talk to each other without hardcoding values everywhere.",
        "Destroying infrastructure is one command — that's a feature, and a very good reason to be careful.",
        "Version your provider and module versions, or 'it worked yesterday' becomes a real mystery."
      ] },
    { id:'ravi', name:'Ravi', role:'the food-cart vendor', topic:'Kubernetes & Orchestration',
      hair:'sage', hairColor:'#1c1c1c', skinColor:'#8a5a3a', bodyColor:'#f8f1e2', trimColor:'#9c7a52',
      accessory:'headband', accColor:'#e0722c', x:1360, y:430, wanderRadius:20,
      expr:{ idle:'idle', talk:'confident', happy:'happy', react:'confused' },
      dialogue:[
        "A pod is the smallest deployable unit — but you almost never manage pods directly, you manage Deployments.",
        "Readiness and liveness probes answer two different questions: 'can it take traffic' and 'is it still alive.'",
        "A Service gives your pods a stable network identity, since the pods themselves come and go.",
        "Resource requests and limits stop one noisy pod from starving its neighbors on the same node.",
        "ConfigMaps and Secrets keep configuration out of your container image, where it belongs.",
        "A rolling update replaces pods gradually — if the new version is broken, only part of your traffic feels it.",
        "Namespaces are how one cluster stays organized between teams, environments, or projects.",
        "`kubectl describe` tells you WHY something's stuck, not just THAT it's stuck — always check it first."
      ] },
    { id:'lily', name:'Lily', role:'the kid with a dog', topic:'General Encouragement',
      hair:'pigtails', hairColor:'#d4a843', skinColor:'#f0c9a0', bodyColor:'#f8f1e2', trimColor:'#9c7a52',
      accessory:'none', accColor:'#c94f3d', x:1440, y:425, wanderRadius:20, // environment addendum: nudged off a Residential District house's footprint
      expr:{ idle:'playful', talk:'happy', happy:'excited', react:'playful' },
      dialogue:[
        "You know what's cool? Every single expert started out not knowing this stuff either.",
        "My dog doesn't understand Kubernetes, but he's a really good listener while I practice explaining it out loud.",
        "Fun fact: DevOps isn't one job, it's a way two teams learned to stop blaming each other.",
        "The best way to remember a command is to break something with it once. Ask me how I know.",
        "It's OK to look up the same command for the hundredth time. Even the bosses in this town would.",
        "Some days you fix one bug and cause two more. That's not failure, that's Tuesday.",
        "The terminal looks scary until it doesn't — then it just looks like typing.",
        "Every real engineer I've met still says 'I have no idea why that worked' at least once a week."
      ] }
  ];

