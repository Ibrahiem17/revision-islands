// Boss "terminalGolem": metadata plus its full question bank (data only).

    export var terminalGolem = {
      id: 'terminalGolem',
      name: 'The Terminal Golem',
      topic: 'Linux',
      icon: '🗿',
      chibiKind: 'golem', // which chibi rig body/palette to render for this boss
      phaseHp: [100, 110, 130],
      phaseNames: ['Arms — File & Permissions', 'Chest — Process & System', 'Core — Real Incident'],
      xpReward: 120,
      coinBaseReward: 80,
      phases: [
        /* -------- PHASE 1: Arms — File & Permissions -------- */
        [
          {
            mode: 'terminal',
            prompt: 'The Golem flexes a stony arm: <strong>"Give execute permission to <code>script.sh</code> for the OWNER ONLY — nobody else."</strong>',
            damageIfCorrect: 16, damageIfOptimal: 26,
            hintNudge: 'Think about which permission *class* you\'re targeting — not "everyone", just one specific class.',
            hintPartial: 'chmod u___ script.sh',
            hintFull: 'chmod u+x script.sh',
            acceptablePatterns: [/^chmod\s+7[45]4\s+script\.sh$/i, /^chmod\s+u\+x,?\s*script\.sh$/i],
            optimalPatterns: [/^chmod\s+u\+x\s+script\.sh$/i],
            baseCmds: ['chmod'] // real backing data for the "how close was I?" readout
          },
          {
            mode: 'terminal',
            prompt: 'A crack of stone: <strong>"Find every file modified in the last 24 hours, right here in the current directory."</strong>',
            damageIfCorrect: 16, damageIfOptimal: 26,
            hintNudge: 'One classic command searches a directory tree by all kinds of criteria — including modification time.',
            hintPartial: 'find . -mtime ___',
            hintFull: 'find . -mtime -1',
            acceptablePatterns: [/^find\s+\.\s+-newermt\s+["']?24\s*hours?\s*ago["']?$/i, /^find\s+\.\s+-mtime\s+-1\s+-type\s+f$/i],
            optimalPatterns: [/^find\s+\.\s+-mtime\s+-1$/i],
            baseCmds: ['find']
          },
          {
            mode: 'terminal',
            prompt: 'The Golem rumbles: <strong>"Show human-readable disk usage of the current folder, one level deep — I don\'t want a wall of text."</strong>',
            damageIfCorrect: 16, damageIfOptimal: 26,
            hintNudge: 'This is a "disk usage" command, not a "disk free" command — and it needs a depth limit flag.',
            hintPartial: 'du -h --max-depth=___',
            hintFull: 'du -h --max-depth=1',
            acceptablePatterns: [/^du\s+-h$/i, /^du\s+-sh\s+\*$/i],
            optimalPatterns: [/^du\s+-h\s+(--max-depth=1|-d\s*1)$/i, /^du\s+-sh\s+--max-depth=1$/i],
            baseCmds: ['du']
          },
          {
            mode: 'spot_the_bug',
            prompt: 'The Golem shows you a cracked stone tablet — a broken shell script. <strong>Click the buggy line, then type the fix.</strong>',
            damageIfCorrect: 18, damageIfOptimal: 28,
            hintNudge: 'Read the if-statement carefully — something bash always expects right after the condition is missing.',
            hintPartial: 'Line 2 is missing a keyword bash requires after "if [ ... ]".',
            hintFull: 'Line 2 needs "then" at the end: if [ "$STATUS" = "active" ]; then',
            codeBlock: [
              '#!/bin/bash',
              'if [ "$STATUS" = "active" ]',
              '    echo "Service is running"',
              'fi'
            ],
            buggyLineId: 1,
            correctFixPatterns: [/^if\s*\[\s*"?\$STATUS"?\s*=\s*"active"\s*\]\s*;?\s*then$/i]
          },
          {
            mode: 'terminal',
            prompt: 'The Golem grinds its knuckles: <strong>"List every file in this directory, including hidden ones, in long format."</strong>',
            damageIfCorrect: 14, damageIfOptimal: 22,
            hintNudge: 'One command, two flags: "all files" and "long listing."',
            hintPartial: 'ls -l_',
            hintFull: 'ls -la',
            acceptablePatterns: [/^ls\s+-a\s+-l$/i, /^ls\s+-al$/i],
            optimalPatterns: [/^ls\s+-la$/i, /^ls\s+-lah?$/i],
            baseCmds: ['ls']
          }
        ],
        /* -------- PHASE 2: Chest — Process & System -------- */
        [
          {
            mode: 'terminal',
            prompt: 'The chest plating hisses steam: <strong>"Show me the top memory-consuming processes on this box."</strong>',
            damageIfCorrect: 16, damageIfOptimal: 26,
            hintNudge: 'ps has a sort flag — sort by memory percentage, descending.',
            hintPartial: 'ps aux --sort=___',
            hintFull: 'ps aux --sort=-%mem | head',
            acceptablePatterns: [/^top$/i, /^htop$/i, /^ps\s+aux$/i],
            optimalPatterns: [/^ps\s+aux\s+--sort=-%mem(\s*\|\s*head)?$/i],
            baseCmds: ['ps', 'top', 'htop']
          },
          {
            mode: 'terminal',
            prompt: 'A vent hisses open: <strong>"Something is bound to port 8080. Find out what."</strong>',
            damageIfCorrect: 16, damageIfOptimal: 26,
            hintNudge: 'One tool literally means "list open files" — sockets count as files in Linux.',
            hintPartial: 'lsof -i :___',
            hintFull: 'lsof -i :8080',
            acceptablePatterns: [/^(sudo\s+)?netstat\s+-tulpn\s*\|\s*grep\s+8080$/i, /^(sudo\s+)?ss\s+-tulpn\s*\|\s*grep\s+8080$/i],
            optimalPatterns: [/^(sudo\s+)?lsof\s+-i\s*:8080$/i],
            baseCmds: ['lsof', 'netstat', 'ss']
          },
          {
            mode: 'triage_call',
            prompt: 'The Golem groans: <strong>"A process is unresponsive and needs to stop. Pick your move, then justify it in one line."</strong>',
            damageIfCorrect: 18, damageIfOptimal: 30,
            hintNudge: 'One of these options gives the process a chance to clean up first. The other doesn\'t ask — it just ends it.',
            hintPartial: 'The best option sends a polite signal first, and only escalates if that fails.',
            hintFull: 'Best: kill PID (SIGTERM) first, then escalate to kill -9 only if it doesn\'t respond within a few seconds.',
            options: [
              { id: 'a', label: 'kill -9 PID immediately', tier: 'wrong', why: 'SIGKILL gives the process zero chance to flush data or clean up — you skipped straight past the graceful option.' },
              { id: 'b', label: 'kill PID first, escalate to kill -9 only if it ignores it', tier: 'best', why: 'Tries a clean shutdown (SIGTERM) first, only forces it if that fails — the standard, safest order.' },
              { id: 'c', label: 'Reboot the whole server', tier: 'defensible', why: 'It technically ends the process, but takes down every other service on the box to do it — massive overkill for one stuck process.' }
            ],
            justificationPatterns: [/graceful|sigterm|clean\s*up|chance|finish|cleanly|escalate/i]
          },
          {
            mode: 'terminal',
            prompt: 'The Golem pulses with heat: <strong>"Show live, updating CPU and memory usage per process."</strong>',
            damageIfCorrect: 14, damageIfOptimal: 22,
            hintNudge: 'The classic, always-available live process monitor.',
            hintPartial: 't__',
            hintFull: 'top',
            acceptablePatterns: [/^ps\s+aux$/i],
            optimalPatterns: [/^top$/i, /^htop$/i],
            baseCmds: ['top', 'htop', 'ps']
          },
          {
            mode: 'terminal',
            prompt: 'One last hiss: <strong>"Gracefully stop a process by NAME — not by PID."</strong>',
            damageIfCorrect: 16, damageIfOptimal: 26,
            hintNudge: 'There\'s a "kill" command that takes a process name directly, no PID lookup needed.',
            hintPartial: 'pk__ processname',
            hintFull: 'pkill processname',
            acceptablePatterns: [/^kill\s+\$\(pgrep\s+\w+\)$/i],
            optimalPatterns: [/^pkill\s+(-15\s+)?\w+$/i, /^killall\s+\w+$/i],
            baseCmds: ['pkill', 'killall', 'kill', 'pgrep']
          }
        ],
        /* -------- PHASE 3: Core — Real Incident (read_the_room, diagnose -> fix) --------
           6 distinct incident scenarios, randomly picked each time a player reaches this
           phase (reuses the same shuffle/reshuffle logic every other phase already uses —
           no engine changes needed, this is pure content). */
        [
          {
            mode: 'read_the_room',
            prompt: 'The Golem\'s core cracks open, venting alarm klaxons. <strong>Diagnose the incident from this output, then fix it.</strong>',
            damageIfCorrect: 22, damageIfOptimal: 36,
            hintNudge: 'Look closely at the "Use%" column — one line stands out.',
            hintPartial: 'One filesystem shows 100% used. What does that mean for anything trying to write to it?',
            hintFull: 'Diagnosis: the disk (/) is full. Fix: find and clear the largest offenders, e.g. du -sh /var/log/* | sort -rh | head.',
            outputBlock: [
              'Filesystem      Size  Used Avail Use% Mounted on',
              '/dev/sda1        40G   40G     0 100% /',
              '/dev/sdb1       200G   62G   138G  32% /data'
            ],
            acceptableDiagnosesPatterns: [/disk\s*(is\s*)?full/i, /out\s*of\s*(disk\s*)?space/i, /root\s*(filesystem\s*)?(is\s*)?full/i, /100%\s*usage/i, /no\s*(free\s*)?space\s*left/i],
            followUpFix: {
              prompt: 'Now find what\'s eating the space (or clear it):',
              acceptablePatterns: [/^du\s+-sh\s+\/\*\s*\|\s*sort\s+-rh(\s*\|\s*head)?$/i, /^find\s+\/\s+-size\s+\+\d+M$/i, /^journalctl\s+--vacuum-size=\d+M$/i],
              optimalPatterns: [/^du\s+-sh\s+\/var\/log\/\*\s*\|\s*sort\s+-rh(\s*\|\s*head)?$/i]
            }
          },
          {
            mode: 'read_the_room',
            prompt: 'The Golem\'s core flickers red-hot. <strong>Something is devouring memory. Diagnose it, then stop it — cleanly.</strong>',
            damageIfCorrect: 22, damageIfOptimal: 36,
            hintNudge: 'Check "available" memory, not just "used" — and see which process is named right below it.',
            hintPartial: 'One process is using 78% of RAM by itself. That\'s your target.',
            hintFull: 'Diagnosis: out of memory / a runaway process. Fix: kill 5233 (SIGTERM) — graceful, not kill -9.',
            outputBlock: [
              '$ free -h',
              '              total   used   free  shared  buff/cache  available',
              'Mem:           7.8G   7.2G   120M    45M       480M        180M',
              'Swap:          2.0G   1.8G   200M',
              '',
              '$ ps aux --sort=-%mem | head -3',
              'USER    PID  %CPU %MEM  COMMAND',
              'devops  5233  0.4  78.2  node leaky-worker.js',
              'devops  1102  0.1   2.1  nginx'
            ],
            acceptableDiagnosesPatterns: [/out\s*of\s*memory/i, /memory\s*(is\s*)?(almost\s*)?full/i, /low\s*(on\s*)?memory/i, /ram\s*(is\s*)?full/i, /5233.*(memory|mem|hogging|eating|leak)/i, /(memory\s*)?leak/i],
            followUpFix: {
              prompt: 'Now gracefully stop the runaway process (PID 5233):',
              acceptablePatterns: [/^kill\s+-9\s+5233$/i, /^pkill\s+(-9\s+)?(-f\s+)?(node|leaky-worker)$/i],
              optimalPatterns: [/^kill\s+(-15\s+)?5233$/i]
            }
          },
          {
            mode: 'read_the_room',
            prompt: 'The Golem slams a fist down. <strong>A service refuses to start. Diagnose it, then find the real blocker.</strong>',
            damageIfCorrect: 22, damageIfOptimal: 36,
            hintNudge: 'Read the journalctl line carefully — it names the exact problem, in the exact language a Node/Express app would use.',
            hintPartial: '"EADDRINUSE" means an address (host+port) is already claimed by something else.',
            hintFull: 'Diagnosis: port 3000 is already in use. Fix: lsof -i :3000 to find exactly what\'s squatting on it.',
            outputBlock: [
              '$ sudo systemctl start myapp',
              'Job for myapp.service failed because the control process exited with error code.',
              '',
              '$ journalctl -u myapp -n 5 --no-pager',
              'myapp[8821]: Error: listen EADDRINUSE: address already in use :::3000'
            ],
            acceptableDiagnosesPatterns: [/port\s*(is\s*)?(already\s*)?(in\s*use|bound|taken|occupied)/i, /address\s*(is\s*)?already\s*in\s*use/i, /eaddrinuse/i, /something\s*else.*(port|3000)/i],
            followUpFix: {
              prompt: 'Find exactly what\'s already using port 3000:',
              acceptablePatterns: [/^(sudo\s+)?netstat\s+-tulpn\s*\|\s*grep\s+3000$/i, /^(sudo\s+)?ss\s+-tulpn\s*\|\s*grep\s+3000$/i],
              optimalPatterns: [/^(sudo\s+)?lsof\s+-i\s*:3000$/i]
            }
          },
          {
            mode: 'read_the_room',
            prompt: 'Steam vents from a crack in the Golem\'s core. <strong>Something on disk has grown out of control. Diagnose it, then deal with it.</strong>',
            damageIfCorrect: 22, damageIfOptimal: 36,
            hintNudge: 'The df output narrows it to one mount point — the du output right below it narrows it further, to one file.',
            hintPartial: 'One single log file is 14GB. That\'s the entire problem.',
            hintFull: 'Diagnosis: debug.log has grown huge and filled /var. Fix: truncate -s 0 the file — never rm it while something may still be writing to it.',
            outputBlock: [
              '$ df -h /var',
              'Filesystem      Size  Used Avail Use% Mounted on',
              '/dev/sda2        20G   19G  512M  98% /var',
              '',
              '$ du -sh /var/log/* | sort -rh | head -3',
              '14G    /var/log/app/debug.log',
              '200M   /var/log/nginx',
              '50M    /var/log/syslog'
            ],
            acceptableDiagnosesPatterns: [/debug\.log.*(huge|large|big|out\s*of\s*control)/i, /log\s*file\s*(is\s*)?(too\s*)?(large|big|huge)/i, /\/var\s*(is\s*)?(almost\s*)?full/i, /disk\s*(is\s*)?(almost\s*)?full/i],
            followUpFix: {
              prompt: 'Safely empty the huge log file, without breaking the process still writing to it:',
              acceptablePatterns: [/^>\s*\/var\/log\/app\/debug\.log$/i, /^cat\s+\/dev\/null\s*>\s*\/var\/log\/app\/debug\.log$/i],
              optimalPatterns: [/^truncate\s+-s\s*0\s+\/var\/log\/app\/debug\.log$/i]
            }
          },
          {
            mode: 'read_the_room',
            prompt: 'Cracks spread across the Golem\'s chest, but nothing seems to actually respond. <strong>Diagnose the stuck processes, then clean them up properly.</strong>',
            damageIfCorrect: 22, damageIfOptimal: 36,
            hintNudge: 'That tag next to STAT — Z — is a specific, well-known process state, not a typo.',
            hintPartial: '"<defunct>" processes are zombies. You cannot kill a zombie directly — something else needs fixing.',
            hintFull: 'Diagnosis: zombie/defunct processes. Fix: you can\'t kill a zombie — restart the parent (PID 4821) so it reaps them properly.',
            outputBlock: [
              '$ ps aux | grep defunct',
              'devops   9001  0.0  0.0  0  0  ?  Z  10:02  0:00  [worker] <defunct>',
              'devops   9002  0.0  0.0  0  0  ?  Z  10:02  0:00  [worker] <defunct>',
              '',
              '$ ps -o ppid= -p 9001',
              '  4821'
            ],
            acceptableDiagnosesPatterns: [/zombie/i, /defunct/i, /orphaned?\s*process/i],
            followUpFix: {
              prompt: 'You can\'t kill a zombie directly — restart the parent (PID 4821) so it reaps them:',
              acceptablePatterns: [/^kill\s+-9\s+4821$/i],
              optimalPatterns: [/^kill\s+(-15\s+)?4821$/i, /^kill\s+-hup\s+4821$/i]
            }
          },
          {
            mode: 'read_the_room',
            prompt: 'The Golem points a stony finger at a script that refuses to run. <strong>Diagnose why, then fix it.</strong>',
            damageIfCorrect: 22, damageIfOptimal: 36,
            hintNudge: 'The error isn\'t about the script\'s logic at all — check what ls -l says right below it.',
            hintPartial: 'Compare the permission bits to any other executable script you\'ve seen — one bit that should be set, isn\'t.',
            hintFull: 'Diagnosis: deploy.sh isn\'t executable. Fix: chmod +x deploy.sh.',
            outputBlock: [
              '$ ./deploy.sh',
              'bash: ./deploy.sh: Permission denied',
              '',
              '$ ls -l deploy.sh',
              '-rw-r--r-- 1 devops devops 812 Aug 27 deploy.sh'
            ],
            acceptableDiagnosesPatterns: [/(not|no|missing)\s*(an?\s*)?execut(able|e\s*permission)/i, /permission\s*denied/i, /not\s*chmod(ded)?/i],
            followUpFix: {
              prompt: 'Give it execute permission and it\'ll run:',
              acceptablePatterns: [/^chmod\s+7[45]4\s+deploy\.sh$/i],
              optimalPatterns: [/^chmod\s+(\+x|u\+x)\s+deploy\.sh$/i]
            }
          }
        ]
      ],
      specialAttack: {
        mode: 'build_the_pipeline',
        prompt: 'The Golem raises BOTH arms — a special move incoming! <strong>Sequence the correct incident-response checklist before it lands.</strong>',
        steps: [
          'Check disk usage (df -h)',
          'Identify largest space users (du -sh)',
          'Clear or rotate old logs',
          'Confirm space freed (df -h again)'
        ],
        damageIfCorrect: 34,
        damageToHeroIfWrong: 22
      },
      // ================================================================
      // Remediation doc, Section 1 — 5-level restructure. Level 1 only,
      // authored this batch: 25 genuinely foundational, real-interview/
      // real-usage Linux questions (self-checked against "would a working
      // engineer actually encounter this or be asked this?" before
      // inclusion — none invented to hit the count). Levels 2-5 are left
      // as empty pools on purpose (see `levels-remaining.md`-equivalent
      // note below) rather than padded with filler, per the doc's own
      // explicit rule against that.
      levels: [
        {
          name: 'Level 1 — Fundamentals',
          hp: 90,
          questions: [
            {
              mode: 'terminal',
              prompt: 'The Golem flexes a stony arm: <strong>"Give execute permission to <code>script.sh</code> for the OWNER ONLY — nobody else."</strong>',
              damageIfCorrect: 14, damageIfOptimal: 22,
              hintNudge: 'Think about which permission *class* you\'re targeting — not "everyone", just one specific class.',
              hintPartial: 'chmod u___ script.sh',
              hintFull: 'chmod u+x script.sh',
              acceptablePatterns: [/^chmod\s+7[45]4\s+script\.sh$/i, /^chmod\s+u\+x,?\s*script\.sh$/i],
              optimalPatterns: [/^chmod\s+u\+x\s+script\.sh$/i],
              baseCmds: ['chmod']
            },
            {
              mode: 'terminal',
              prompt: 'A crack of stone: <strong>"Print the full path of the directory you\'re currently in."</strong>',
              damageIfCorrect: 12, damageIfOptimal: 18,
              hintNudge: 'Two letters, "print working directory."',
              hintPartial: 'p__',
              hintFull: 'pwd',
              acceptablePatterns: [],
              optimalPatterns: [/^pwd$/i],
              baseCmds: ['pwd']
            },
            {
              mode: 'terminal',
              prompt: 'The Golem rumbles: <strong>"Create a directory called <code>build</code>, along with any missing parent directories, in one command."</strong>',
              damageIfCorrect: 14, damageIfOptimal: 22,
              hintNudge: 'mkdir has a flag that creates parent directories along the way instead of erroring if they don\'t exist.',
              hintPartial: 'mkdir -_ ./project/build',
              hintFull: 'mkdir -p ./project/build',
              acceptablePatterns: [/^mkdir\s+build$/i],
              optimalPatterns: [/^mkdir\s+-p\s+.*build$/i],
              baseCmds: ['mkdir']
            },
            {
              mode: 'terminal',
              prompt: 'A slab shifts: <strong>"Copy the entire <code>configs</code> directory (and everything inside it) to <code>configs-backup</code>."</strong>',
              damageIfCorrect: 14, damageIfOptimal: 22,
              hintNudge: 'cp needs a flag to recurse into a directory — without it, cp refuses to copy a folder at all.',
              hintPartial: 'cp -_ configs configs-backup',
              hintFull: 'cp -r configs configs-backup',
              acceptablePatterns: [],
              optimalPatterns: [/^cp\s+-r\s+configs\s+configs-backup$/i],
              baseCmds: ['cp']
            },
            {
              mode: 'terminal',
              prompt: 'The Golem grinds its knuckles: <strong>"Rename <code>notes.txt</code> to <code>notes-old.txt</code>."</strong>',
              damageIfCorrect: 12, damageIfOptimal: 18,
              hintNudge: 'There\'s no dedicated "rename" command in Linux — one existing command does both moving AND renaming.',
              hintPartial: 'm_ notes.txt notes-old.txt',
              hintFull: 'mv notes.txt notes-old.txt',
              acceptablePatterns: [],
              optimalPatterns: [/^mv\s+notes\.txt\s+notes-old\.txt$/i],
              baseCmds: ['mv']
            },
            {
              mode: 'terminal',
              prompt: 'A crack of stone: <strong>"Print the contents of <code>readme.txt</code> straight to the terminal."</strong>',
              damageIfCorrect: 10, damageIfOptimal: 16,
              hintNudge: 'The single most common command for "just show me what\'s in this file."',
              hintPartial: 'c__ readme.txt',
              hintFull: 'cat readme.txt',
              acceptablePatterns: [/^less\s+readme\.txt$/i, /^more\s+readme\.txt$/i],
              optimalPatterns: [/^cat\s+readme\.txt$/i],
              baseCmds: ['cat', 'less', 'more']
            },
            {
              mode: 'terminal',
              prompt: 'The Golem hisses: <strong>"Show only the LAST 20 lines of <code>app.log</code>."</strong>',
              damageIfCorrect: 12, damageIfOptimal: 18,
              hintNudge: 'One command shows the end of a file, with a flag for exactly how many lines.',
              hintPartial: 'tail -n __ app.log',
              hintFull: 'tail -n 20 app.log',
              acceptablePatterns: [/^tail\s+app\.log$/i],
              optimalPatterns: [/^tail\s+-n\s*20\s+app\.log$/i],
              baseCmds: ['tail']
            },
            {
              mode: 'terminal',
              prompt: 'A vent hisses: <strong>"Watch <code>app.log</code> live, so new lines appear as they\'re written."</strong>',
              damageIfCorrect: 14, damageIfOptimal: 22,
              hintNudge: 'tail has a "follow" flag for exactly this — one of the most-used commands when debugging a live service.',
              hintPartial: 'tail -_ app.log',
              hintFull: 'tail -f app.log',
              acceptablePatterns: [],
              optimalPatterns: [/^tail\s+-f\s+app\.log$/i],
              baseCmds: ['tail']
            },
            {
              mode: 'terminal',
              prompt: 'The Golem grinds: <strong>"Search every file under the current directory, recursively, for the string \'ERROR\'."</strong>',
              damageIfCorrect: 16, damageIfOptimal: 26,
              hintNudge: 'grep has a recursive flag — without it, grep only checks files you name explicitly, not subdirectories.',
              hintPartial: 'grep -_ "ERROR" .',
              hintFull: 'grep -r "ERROR" .',
              acceptablePatterns: [/^grep\s+"?ERROR"?\s+\*$/i],
              optimalPatterns: [/^grep\s+-r\s+"?ERROR"?\s+\.$/i, /^grep\s+-rn\s+"?ERROR"?\s+\.$/i],
              baseCmds: ['grep']
            },
            {
              mode: 'terminal',
              prompt: 'A rumble: <strong>"Count how many lines are in <code>data.csv</code>."</strong>',
              damageIfCorrect: 12, damageIfOptimal: 18,
              hintNudge: '"Word count" is the command\'s name, but a flag switches it to counting lines instead.',
              hintPartial: 'wc -_ data.csv',
              hintFull: 'wc -l data.csv',
              acceptablePatterns: [],
              optimalPatterns: [/^wc\s+-l\s+data\.csv$/i],
              baseCmds: ['wc']
            },
            {
              mode: 'terminal',
              prompt: 'The Golem\'s eyes narrow: <strong>"Find out exactly which binary runs when you type <code>python3</code>."</strong>',
              damageIfCorrect: 12, damageIfOptimal: 20,
              hintNudge: 'One command tells you exactly where in $PATH a command actually lives.',
              hintPartial: 'w____ python3',
              hintFull: 'which python3',
              acceptablePatterns: [/^whereis\s+python3$/i],
              optimalPatterns: [/^which\s+python3$/i],
              baseCmds: ['which', 'whereis']
            },
            {
              mode: 'terminal',
              prompt: 'A crack of light: <strong>"Create an empty file called <code>.gitkeep</code>."</strong>',
              damageIfCorrect: 10, damageIfOptimal: 16,
              hintNudge: 'This command\'s real job is updating a file\'s timestamp — but it also creates the file if it doesn\'t exist yet.',
              hintPartial: 't____ .gitkeep',
              hintFull: 'touch .gitkeep',
              acceptablePatterns: [],
              optimalPatterns: [/^touch\s+\.gitkeep$/i],
              baseCmds: ['touch']
            },
            {
              mode: 'terminal',
              prompt: 'The Golem points: <strong>"Show how much disk space is free on every mounted filesystem, in human-readable units."</strong>',
              damageIfCorrect: 14, damageIfOptimal: 20,
              hintNudge: '"Disk free" — and a flag for human-readable sizes (GB/MB instead of raw byte counts).',
              hintPartial: 'df -_',
              hintFull: 'df -h',
              acceptablePatterns: [/^df$/i],
              optimalPatterns: [/^df\s+-h$/i],
              baseCmds: ['df']
            },
            {
              mode: 'terminal',
              prompt: 'A hiss of steam: <strong>"Show current memory (RAM) usage, in human-readable units."</strong>',
              damageIfCorrect: 14, damageIfOptimal: 20,
              hintNudge: 'A short, classic command for memory stats — pair it with the same human-readable flag as df.',
              hintPartial: 'free -_',
              hintFull: 'free -h',
              acceptablePatterns: [/^free$/i],
              optimalPatterns: [/^free\s+-h$/i],
              baseCmds: ['free']
            },
            {
              mode: 'terminal',
              prompt: 'The Golem asks flatly: <strong>"Which user are you currently logged in as?"</strong>',
              damageIfCorrect: 10, damageIfOptimal: 16,
              hintNudge: 'Two words, literally asking the question you\'re being asked.',
              hintPartial: 'who____',
              hintFull: 'whoami',
              acceptablePatterns: [/^id\s+-un$/i],
              optimalPatterns: [/^whoami$/i],
              baseCmds: ['whoami', 'id']
            },
            {
              mode: 'terminal',
              prompt: 'A rumble of stone: <strong>"Make <code>deploy.sh</code> readable and writable by its owner, and read-only for everyone else, in one command."</strong>',
              damageIfCorrect: 16, damageIfOptimal: 26,
              hintNudge: 'Owner needs read+write (6), group and others need read-only (4) — that\'s a 3-digit chmod.',
              hintPartial: 'chmod 6__ deploy.sh',
              hintFull: 'chmod 644 deploy.sh',
              acceptablePatterns: [],
              optimalPatterns: [/^chmod\s+644\s+deploy\.sh$/i],
              baseCmds: ['chmod']
            },
            {
              mode: 'spot_the_bug',
              prompt: 'The Golem shows you a cracked stone tablet — a broken shell script. <strong>Click the buggy line, then type the fix.</strong>',
              damageIfCorrect: 16, damageIfOptimal: 26,
              hintNudge: 'Read the if-statement carefully — something bash always expects right after the condition is missing.',
              hintPartial: 'Line 2 is missing a keyword bash requires after "if [ ... ]".',
              hintFull: 'Line 2 needs "then" at the end: if [ "$STATUS" = "active" ]; then',
              codeBlock: [
                '#!/bin/bash',
                'if [ "$STATUS" = "active" ]',
                '    echo "Service is running"',
                'fi'
              ],
              buggyLineId: 1,
              correctFixPatterns: [/^if\s*\[\s*"?\$STATUS"?\s*=\s*"active"\s*\]\s*;?\s*then$/i]
            },
            {
              mode: 'spot_the_bug',
              prompt: 'A tablet cracks open: <strong>"This script is supposed to loop over files, but it errors immediately. Find and fix the bug."</strong>',
              damageIfCorrect: 16, damageIfOptimal: 26,
              hintNudge: 'A for-loop over a list needs a keyword right before the body starts — same family of mistake as an if-statement missing "then".',
              hintPartial: 'Line 2 is missing the keyword bash needs right after "for f in *.txt".',
              hintFull: 'Line 2 needs "do" at the end: for f in *.txt; do',
              codeBlock: [
                '#!/bin/bash',
                'for f in *.txt',
                '    echo "$f"',
                'done'
              ],
              buggyLineId: 1,
              correctFixPatterns: [/^for\s+f\s+in\s+\*\.txt\s*;?\s*do$/i]
            },
            {
              mode: 'spot_the_bug',
              prompt: 'The Golem grinds a fragment into place: <strong>"This variable comparison never works the way it should. Find and fix the bug."</strong>',
              damageIfCorrect: 16, damageIfOptimal: 26,
              hintNudge: 'Inside a bash [ ] test, there needs to be a space on both sides of every operator and bracket.',
              hintPartial: 'Line 2 is missing spaces around the brackets/operator: [ "$COUNT" -gt 0 ]',
              hintFull: 'Line 2 should read: if [ "$COUNT" -gt 0 ]; then',
              codeBlock: [
                '#!/bin/bash',
                'if ["$COUNT" -gt 0]; then',
                '    echo "Non-zero"',
                'fi'
              ],
              buggyLineId: 1,
              correctFixPatterns: [/^if\s*\[\s*"?\$COUNT"?\s*-gt\s*0\s*\]\s*;?\s*then$/i]
            },
            {
              mode: 'spot_the_bug',
              prompt: 'A stone panel slides open: <strong>"This script tries to make itself executable, but the deploy still fails with \'Permission denied\'. Find and fix the bug."</strong>',
              damageIfCorrect: 16, damageIfOptimal: 26,
              hintNudge: 'Read the chmod line carefully — it\'s targeting the wrong file entirely.',
              hintPartial: 'Line 2 runs chmod on "deploy.sh.bak", not the actual file being executed on line 3.',
              hintFull: 'Line 2 should read: chmod +x deploy.sh',
              codeBlock: [
                '#!/bin/bash',
                'chmod +x deploy.sh.bak',
                './deploy.sh'
              ],
              buggyLineId: 1,
              correctFixPatterns: [/^chmod\s+\+x\s+deploy\.sh$/i]
            },
            {
              mode: 'triage_call',
              prompt: 'The Golem groans: <strong>"You need to permanently delete a directory and everything inside it. Pick your move, then justify it in one line."</strong>',
              damageIfCorrect: 16, damageIfOptimal: 28,
              hintNudge: 'One of these options double-checks with you before deleting anything nested. The other one just does it, silently and instantly.',
              hintPartial: 'The safer habit for anything destructive is to confirm what you\'re about to delete first.',
              hintFull: 'Best: list the directory contents first (or use rm -ri), THEN rm -rf once you\'re sure — never blind rm -rf.',
              options: [
                { id: 'a', label: 'Immediately run rm -rf on it, no other checks', tier: 'wrong', why: 'rm -rf gives zero confirmation and zero recovery — a typo\'d path here can delete the wrong thing permanently, with no warning.' },
                { id: 'b', label: 'List its contents first (or use rm -ri for per-file confirmation), then rm -rf once certain', tier: 'best', why: 'Confirms exactly what you\'re about to permanently destroy before doing it — the standard safe habit for any irreversible command.' },
                { id: 'c', label: 'Move it to a "trash" folder instead of deleting it', tier: 'defensible', why: 'Genuinely safer (recoverable), but doesn\'t actually answer what was asked ("permanently delete") — a real fix eventually still needs an actual delete step.' }
              ],
              justificationPatterns: [/confirm|check\s*first|list\s*(the\s*)?contents|ls\s*first|sure|verify|typo/i]
            },
            {
              mode: 'triage_call',
              prompt: 'A slab grinds open: <strong>"A teammate says \'just chmod 777 it, that always fixes permission errors.\' Pick your move, then justify it in one line."</strong>',
              damageIfCorrect: 16, damageIfOptimal: 28,
              hintNudge: 'One option actually diagnoses WHY the permission error is happening. The other one just throws maximum permissions at it and hopes.',
              hintPartial: 'chmod 777 makes a file world-writable — that\'s a real security problem, not a real fix.',
              hintFull: 'Best: check the actual owner/group/permissions with ls -l first, then grant only the specific permission that\'s actually missing.',
              options: [
                { id: 'a', label: 'chmod 777 it, like they suggested', tier: 'wrong', why: 'Makes the file world-writable — anyone on the box can now modify it. It "fixes" the symptom by removing all access control, which is its own problem.' },
                { id: 'b', label: 'Run ls -l to see the actual current permissions/owner, then grant only what\'s actually missing', tier: 'best', why: 'Diagnoses the real cause first — usually the fix is a much narrower chmod (or a chown), not throwing open every permission bit.' },
                { id: 'c', label: 'Just re-run the command as sudo instead of touching permissions', tier: 'defensible', why: 'Works in the moment, but sidesteps the actual permissions problem rather than fixing it — it\'ll bite the next person who runs it without sudo.' }
              ],
              justificationPatterns: [/ls\s*-l|actual\s*permission|diagnose|check\s*first|owner|narrow|specific/i]
            },
            {
              mode: 'read_the_room',
              prompt: 'The Golem\'s core flickers. <strong>A command you just typed isn\'t recognized. Diagnose it, then fix it.</strong>',
              damageIfCorrect: 18, damageIfOptimal: 30,
              hintNudge: 'Read the exact wording of the shell\'s error carefully — it\'s telling you precisely what\'s wrong.',
              hintPartial: '"command not found" means the shell searched every directory in $PATH and found nothing by that name.',
              hintFull: 'Diagnosis: the tool isn\'t installed (or isn\'t on $PATH). Fix: install it via the system package manager, e.g. sudo apt install htop.',
              outputBlock: [
                '$ htop',
                'bash: htop: command not found'
              ],
              acceptableDiagnosesPatterns: [/not\s*installed/i, /not\s*(on|in)\s*(the\s*)?path/i, /(command|tool)\s*(doesn'?t|does\s*not)\s*exist/i, /missing\s*(package|tool|binary)/i],
              followUpFix: {
                prompt: 'Now install it with the system package manager:',
                acceptablePatterns: [/^sudo\s+yum\s+install\s+(-y\s+)?htop$/i, /^sudo\s+dnf\s+install\s+(-y\s+)?htop$/i],
                optimalPatterns: [/^sudo\s+apt\s+(install|update\s*&&\s*apt\s+install)\s+(-y\s+)?htop$/i, /^sudo\s+apt-get\s+install\s+(-y\s+)?htop$/i]
              }
            },
            {
              mode: 'read_the_room',
              prompt: 'Steam vents from a crack. <strong>You try to run a script you just wrote, and get denied. Diagnose it, then fix it.</strong>',
              damageIfCorrect: 18, damageIfOptimal: 30,
              hintNudge: 'Look at the permission bits in the ls -l output — specifically whether the execute bit is set for you.',
              hintPartial: '-rw-r--r-- has no "x" anywhere — the file isn\'t executable by anyone yet.',
              hintFull: 'Diagnosis: the script isn\'t marked executable. Fix: chmod +x setup.sh, then run it again.',
              outputBlock: [
                '$ ./setup.sh',
                'bash: ./setup.sh: Permission denied',
                '',
                '$ ls -l setup.sh',
                '-rw-r--r-- 1 devops devops 340 Sep 10 setup.sh'
              ],
              acceptableDiagnosesPatterns: [/not\s*executable/i, /missing\s*(the\s*)?execute\s*(bit|permission)/i, /no\s*x\s*permission/i, /permission/i],
              followUpFix: {
                prompt: 'Make it executable, then it\'ll run:',
                acceptablePatterns: [/^chmod\s+755\s+setup\.sh$/i],
                optimalPatterns: [/^chmod\s+\+x\s+setup\.sh$/i]
              }
            },
            {
              mode: 'build_the_pipeline',
              prompt: 'The Golem\'s eyes glow. <strong>Sequence the correct order for safely deploying a new version of a script to a server.</strong>',
              steps: [
                'Back up the current version',
                'Copy the new version over',
                'Make it executable (chmod +x)',
                'Test it runs correctly',
                'Restart the service that uses it'
              ],
              damageIfCorrect: 20, damageIfOptimal: 34,
              damageToHeroIfWrong: 18
            }
          ]
        },
        {
          name: 'Level 2 — Intermediate',
          hp: 110,
          questions: [
            {
              mode: 'terminal',
              prompt: 'The Golem\'s chest plating shifts: <strong>"Create a symbolic link called <code>current</code> pointing at <code>release-2.3</code>."</strong>',
              damageIfCorrect: 14, damageIfOptimal: 22, timeAllotted: 45,
              hintNudge: 'The "link" command has a flag specifically for symbolic (soft) links, as opposed to the default hard link.',
              hintPartial: 'ln -_ release-2.3 current',
              hintFull: 'ln -s release-2.3 current',
              acceptablePatterns: [],
              optimalPatterns: [/^ln\s+-s\s+release-2\.3\s+current$/i],
              baseCmds: ['ln']
            },
            {
              mode: 'terminal',
              prompt: 'A stony hand gestures: <strong>"Change the owner of <code>app.log</code> to user \'deploy\' and group \'deploy\', in one command."</strong>',
              damageIfCorrect: 14, damageIfOptimal: 22, timeAllotted: 45,
              hintNudge: 'One command sets both owner and group at once, separated by a colon.',
              hintPartial: 'chown deploy:_____ app.log',
              hintFull: 'chown deploy:deploy app.log',
              acceptablePatterns: [/^sudo\s+chown\s+deploy\s+app\.log$/i],
              optimalPatterns: [/^(sudo\s+)?chown\s+deploy:deploy\s+app\.log$/i],
              baseCmds: ['chown']
            },
            {
              mode: 'terminal',
              prompt: 'The Golem rumbles: <strong>"Show the total size of the <code>logs</code> directory as one human-readable number — not a per-file breakdown."</strong>',
              damageIfCorrect: 14, damageIfOptimal: 22, timeAllotted: 45,
              hintNudge: 'du\'s "summarize" flag collapses everything into one total instead of listing every file inside.',
              hintPartial: 'du -__ logs',
              hintFull: 'du -sh logs',
              acceptablePatterns: [/^du\s+-h\s+logs$/i],
              optimalPatterns: [/^du\s+-sh\s+logs$/i],
              baseCmds: ['du']
            },
            {
              mode: 'terminal',
              prompt: 'A crack of stone: <strong>"Set an environment variable <code>API_KEY</code> to <code>abc123</code> for the rest of this shell session."</strong>',
              damageIfCorrect: 14, damageIfOptimal: 22, timeAllotted: 45,
              hintNudge: 'A plain variable assignment only lives in the current shell — one keyword makes it visible to child processes too.',
              hintPartial: 'ex____ API_KEY=abc123',
              hintFull: 'export API_KEY=abc123',
              acceptablePatterns: [/^API_KEY=abc123$/],
              optimalPatterns: [/^export\s+API_KEY=abc123$/],
              baseCmds: ['export']
            },
            {
              mode: 'terminal',
              prompt: 'The Golem tilts its head: <strong>"Sort the contents of <code>scores.txt</code> numerically, largest first."</strong>',
              damageIfCorrect: 14, damageIfOptimal: 22, timeAllotted: 45,
              hintNudge: 'sort needs two flags here: one for numeric (not alphabetic) order, one to reverse it to descending.',
              hintPartial: 'sort -__ scores.txt',
              hintFull: 'sort -nr scores.txt',
              acceptablePatterns: [/^sort\s+scores\.txt$/i, /^sort\s+-n\s+scores\.txt$/i],
              optimalPatterns: [/^sort\s+-nr\s+scores\.txt$/i, /^sort\s+-rn\s+scores\.txt$/i],
              baseCmds: ['sort']
            },
            {
              mode: 'terminal',
              prompt: 'A vent hisses: <strong>"Count how many times each unique IP address appears in <code>access.log</code>, without listing duplicates."</strong>',
              damageIfCorrect: 16, damageIfOptimal: 26, timeAllotted: 45,
              hintNudge: 'uniq needs the input pre-sorted, and a count flag — the classic combo is sort piped into uniq.',
              hintPartial: 'sort access.log | uniq -_',
              hintFull: 'sort access.log | uniq -c',
              acceptablePatterns: [/^uniq\s+access\.log$/i],
              optimalPatterns: [/^sort\s+access\.log\s*\|\s*uniq\s+-c$/i],
              baseCmds: ['uniq', 'sort']
            },
            {
              mode: 'terminal',
              prompt: 'The Golem grinds: <strong>"Extract just the 3rd column from <code>users.csv</code> (comma-separated)."</strong>',
              damageIfCorrect: 16, damageIfOptimal: 26, timeAllotted: 45,
              hintNudge: 'cut can pull specific fields from delimited text — you need to tell it the delimiter AND the field number.',
              hintPartial: 'cut -d, -f_ users.csv',
              hintFull: 'cut -d, -f3 users.csv',
              acceptablePatterns: [],
              optimalPatterns: [/^cut\s+-d\s*,\s*-f\s*3\s+users\.csv$/i],
              baseCmds: ['cut']
            },
            {
              mode: 'terminal',
              prompt: 'A stony fist clenches: <strong>"Show only the FIRST 10 lines of <code>data.json</code>."</strong>',
              damageIfCorrect: 12, damageIfOptimal: 18, timeAllotted: 45,
              hintNudge: 'The counterpart to tail — same flag style, opposite end of the file.',
              hintPartial: 'head -n __ data.json',
              hintFull: 'head -n 10 data.json',
              acceptablePatterns: [/^head\s+data\.json$/i],
              optimalPatterns: [/^head\s+-n\s*10\s+data\.json$/i],
              baseCmds: ['head']
            },
            {
              mode: 'terminal',
              prompt: 'The Golem points at two slabs: <strong>"Show the line-by-line differences between <code>config.old</code> and <code>config.new</code>."</strong>',
              damageIfCorrect: 14, damageIfOptimal: 22, timeAllotted: 45,
              hintNudge: 'One classic command compares two files and shows exactly what changed between them.',
              hintPartial: 'd___ config.old config.new',
              hintFull: 'diff config.old config.new',
              acceptablePatterns: [],
              optimalPatterns: [/^diff\s+config\.old\s+config\.new$/i],
              baseCmds: ['diff']
            },
            {
              mode: 'terminal',
              prompt: 'A rumble echoes: <strong>"Compress the <code>build</code> directory into a single gzipped tar archive called <code>build.tar.gz</code>."</strong>',
              damageIfCorrect: 16, damageIfOptimal: 26, timeAllotted: 45,
              hintNudge: 'tar\'s classic "create, gzip, verbose, file" flag combo — in that order, it spells a memorable word.',
              hintPartial: 'tar -c___ build.tar.gz build',
              hintFull: 'tar -czvf build.tar.gz build',
              acceptablePatterns: [/^tar\s+-czf\s+build\.tar\.gz\s+build$/i],
              optimalPatterns: [/^tar\s+-czvf\s+build\.tar\.gz\s+build$/i],
              baseCmds: ['tar']
            },
            {
              mode: 'terminal',
              prompt: 'The Golem\'s eyes flicker: <strong>"Extract <code>build.tar.gz</code> back into files, right here."</strong>',
              damageIfCorrect: 16, damageIfOptimal: 26, timeAllotted: 45,
              hintNudge: 'Same flag family as creating a tar archive, but swap the "create" flag for "extract."',
              hintPartial: 'tar -x___ build.tar.gz',
              hintFull: 'tar -xzvf build.tar.gz',
              acceptablePatterns: [/^tar\s+-xzf\s+build\.tar\.gz$/i],
              optimalPatterns: [/^tar\s+-xzvf\s+build\.tar\.gz$/i],
              baseCmds: ['tar']
            },
            {
              mode: 'terminal',
              prompt: 'A crack of light: <strong>"Delete every <code>.tmp</code> file under the current directory, recursively, in one command — without deleting anything else."</strong>',
              damageIfCorrect: 18, damageIfOptimal: 28, timeAllotted: 45,
              hintNudge: 'find can locate files by name pattern across a whole tree, then hand each match to another command to act on.',
              hintPartial: 'find . -name "*.tmp" -_____ rm {} \\;',
              hintFull: 'find . -name "*.tmp" -exec rm {} \\;',
              acceptablePatterns: [/^find\s+\.\s+-name\s+"?\*\.tmp"?\s+-delete$/i],
              optimalPatterns: [/^find\s+\.\s+-name\s+"?\*\.tmp"?\s+-exec\s+rm\s+\{\}\s*\\;$/i],
              baseCmds: ['find']
            },
            {
              mode: 'spot_the_bug',
              prompt: 'The Golem shows a warped tablet: <strong>"This script is supposed to print each filename, but it splits names with spaces into separate words. Find and fix the bug."</strong>',
              damageIfCorrect: 18, damageIfOptimal: 28, timeAllotted: 45,
              hintNudge: 'An unquoted variable gets word-split by bash on whitespace — the fix is almost always to quote it.',
              hintPartial: 'Line 3 needs quotes around the variable: echo "$file"',
              hintFull: 'Line 3 should read: echo "$file"',
              codeBlock: [
                '#!/bin/bash',
                'for file in *; do',
                '    echo $file',
                'done'
              ],
              buggyLineId: 2,
              correctFixPatterns: [/^echo\s+"\$file"$/i]
            },
            {
              mode: 'spot_the_bug',
              prompt: 'A tablet grinds open: <strong>"This script is supposed to check if a count is exactly 10, but the comparison always misbehaves for numbers. Find and fix the bug."</strong>',
              damageIfCorrect: 18, damageIfOptimal: 28, timeAllotted: 45,
              hintNudge: 'Inside a [ ] test, "=" is a STRING comparison — numeric comparison needs its own operator.',
              hintPartial: 'Line 2 should use the numeric-equals operator instead of =: if [ "$COUNT" -eq 10 ]',
              hintFull: 'Line 2 should read: if [ "$COUNT" -eq 10 ]; then',
              codeBlock: [
                '#!/bin/bash',
                'if [ "$COUNT" = 10 ]; then',
                '    echo "Exactly ten"',
                'fi'
              ],
              buggyLineId: 1,
              correctFixPatterns: [/^if\s*\[\s*"?\$COUNT"?\s*-eq\s*10\s*\]\s*;?\s*then$/i]
            },
            {
              mode: 'spot_the_bug',
              prompt: 'The Golem grinds a fragment: <strong>"This script never expands the variable — it just prints the literal text. Find and fix the bug."</strong>',
              damageIfCorrect: 18, damageIfOptimal: 28, timeAllotted: 45,
              hintNudge: 'Referencing a bash variable requires a specific symbol in front of its name — it\'s missing entirely here.',
              hintPartial: 'Line 2 is missing a "$" before NAME.',
              hintFull: 'Line 2 should read: echo "Hello, $NAME"',
              codeBlock: [
                '#!/bin/bash',
                'NAME="World"',
                'echo "Hello, NAME"'
              ],
              buggyLineId: 2,
              correctFixPatterns: [/^echo\s+"Hello,\s*\$NAME"$/i]
            },
            {
              mode: 'spot_the_bug',
              prompt: 'A stone panel slides: <strong>"This script is run directly (<code>./backup.sh</code>) but fails immediately with a confusing interpreter error. Find and fix the bug."</strong>',
              damageIfCorrect: 18, damageIfOptimal: 28, timeAllotted: 45,
              hintNudge: 'Check the very first line — the shebang path has to point at a real, existing interpreter binary.',
              hintPartial: 'Line 1 points at "/bin/bashh" — that binary doesn\'t exist, it\'s a typo.',
              hintFull: 'Line 1 should read: #!/bin/bash',
              codeBlock: [
                '#!/bin/bashh',
                'tar -czf backup.tar.gz /data'
              ],
              buggyLineId: 0,
              correctFixPatterns: [/^#!\/bin\/bash$/i]
            },
            {
              mode: 'spot_the_bug',
              prompt: 'The Golem\'s knuckles crack: <strong>"This loop is supposed to run 5 times (1 through 5), but it runs one time too many. Find and fix the bug."</strong>',
              damageIfCorrect: 18, damageIfOptimal: 28, timeAllotted: 45,
              hintNudge: 'seq\'s range is inclusive on both ends — check whether the upper bound actually matches "5 times."',
              hintPartial: 'Line 2 says "seq 1 6", which produces 1 through 6 — six numbers, not five.',
              hintFull: 'Line 2 should read: for i in $(seq 1 5); do',
              codeBlock: [
                '#!/bin/bash',
                'for i in $(seq 1 6); do',
                '    echo "Attempt $i"',
                'done'
              ],
              buggyLineId: 1,
              correctFixPatterns: [/^for\s+i\s+in\s+\$\(seq\s+1\s+5\)\s*;?\s*do$/i]
            },
            {
              mode: 'triage_call',
              prompt: 'The Golem groans: <strong>"Three separate copies of the same script are stuck running at once and need to stop. Pick your move, then justify it in one line."</strong>',
              damageIfCorrect: 18, damageIfOptimal: 30, timeAllotted: 45,
              hintNudge: 'One option needs the PID for every single copy, one by one. The other targets all of them by process NAME, in one shot.',
              hintPartial: 'A command exists specifically for "stop every process matching this name" — no need to look up PIDs individually.',
              hintFull: 'Best: killall scriptname (or pkill -f scriptname) — stops every matching instance in one command.',
              options: [
                { id: 'a', label: 'Look up each PID individually with ps, then kill each one by hand', tier: 'defensible', why: 'Works, but slow and error-prone with multiple instances — easy to miss one or kill the wrong PID under pressure.' },
                { id: 'b', label: 'killall scriptname (or pkill -f scriptname)', tier: 'best', why: 'Targets every process matching that name in one command — the right tool when you need to stop multiple instances of the same thing at once.' },
                { id: 'c', label: 'Reboot the server to clear all of them at once', tier: 'wrong', why: 'Massive overkill for stopping 3 processes — takes down every other service on the box along with it.' }
              ],
              justificationPatterns: [/killall|pkill|by\s*name|all\s*instances|one\s*command|one\s*shot/i]
            },
            {
              mode: 'triage_call',
              prompt: 'A slab grinds: <strong>"A config file needs an urgent one-line fix directly on the production server. Pick your move, then justify it in one line."</strong>',
              damageIfCorrect: 18, damageIfOptimal: 30, timeAllotted: 45,
              hintNudge: 'One option skips having any record of what changed or why. The other leaves a trail AND a way back if it\'s wrong.',
              hintPartial: 'Back up the original file before touching it, so there\'s an immediate rollback path if the edit is wrong.',
              hintFull: 'Best: copy the file first (cp config.yml config.yml.bak), THEN edit it — gives you an instant, exact rollback if anything goes wrong.',
              options: [
                { id: 'a', label: 'Open it directly in an editor and save over it', tier: 'wrong', why: 'No backup, no diff, no way back if the edit is wrong or someone\'s watching a fast-moving incident and needs to revert instantly.' },
                { id: 'b', label: 'Copy the file to a .bak first, then edit the original', tier: 'best', why: 'One extra command, zero downside — gives an instant, exact rollback path if the "urgent one-line fix" turns out to be wrong.' },
                { id: 'c', label: 'Skip the fix and wait for the next full deployment', tier: 'defensible', why: 'Safer in one sense, but doesn\'t match the word "urgent" — if this is genuinely time-sensitive, waiting isn\'t actually the right call.' }
              ],
              justificationPatterns: [/backup|\.bak|rollback|copy\s*first|revert/i]
            },
            {
              mode: 'triage_call',
              prompt: 'The Golem grinds slowly: <strong>"Two scripts on the same box both need to read the exact same, single shared config file. Pick your move, then justify it in one line."</strong>',
              damageIfCorrect: 18, damageIfOptimal: 30, timeAllotted: 45,
              hintNudge: 'One of these creates a real, independent copy of the data. The other creates a pointer to the ONE original file.',
              hintPartial: 'A symlink means both scripts always see the exact same underlying file — one update, both see it instantly.',
              hintFull: 'Best: a symlink (or just have both scripts point at the same real path) — a hard-copied duplicate would drift out of sync the moment one side changes.',
              options: [
                { id: 'a', label: 'Copy the config file so each script has its own independent copy', tier: 'wrong', why: 'The moment one copy is updated and the other isn\'t, the two scripts are silently reading different configs — a classic source of "works on one, not the other" bugs.' },
                { id: 'b', label: 'Point both scripts at the same single file (directly, or via a symlink)', tier: 'best', why: 'One source of truth — an update to the config is instantly visible to both scripts, with zero risk of drift.' },
                { id: 'c', label: 'Have each script fetch the config from a shared database instead', tier: 'defensible', why: 'Would work, but is a much bigger architectural change than the situation calls for — over-engineering a one-file sharing problem.' }
              ],
              justificationPatterns: [/single\s*source|same\s*file|symlink|one\s*copy|stay\s*in\s*sync|drift/i]
            },
            {
              mode: 'read_the_room',
              prompt: 'The Golem\'s core sputters. <strong>Writes to disk are suddenly failing, even though there\'s plenty of free space shown. Diagnose it, then fix it.</strong>',
              damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 45,
              hintNudge: 'Disk space (df -h) and the NUMBER of files a filesystem can hold (inodes) are two separate limits — check the second one.',
              hintPartial: 'df -i shows 100% inode usage — the filesystem physically cannot create one more file, regardless of byte space left.',
              hintFull: 'Diagnosis: the filesystem ran out of inodes (too many small files), not disk space. Fix: find and remove a large number of small unneeded files, e.g. old cache/session files.',
              outputBlock: [
                '$ df -h /data',
                'Filesystem      Size  Used Avail Use% Mounted on',
                '/dev/sdb1       100G   40G   60G  40% /data',
                '',
                '$ df -i /data',
                'Filesystem      Inodes  IUsed   IFree IUse% Mounted on',
                '/dev/sdb1      6553600 6553600      0  100% /data'
              ],
              acceptableDiagnosesPatterns: [/inode/i, /out\s*of\s*inodes/i, /too\s*many\s*(small\s*)?files/i],
              followUpFix: {
                prompt: 'Now find and remove a large number of small unneeded files (e.g. old session cache):',
                acceptablePatterns: [/^rm\s+-rf\s+\/data\/(cache|sessions|tmp)\/?\*?$/i],
                optimalPatterns: [/^find\s+\/data\/(cache|sessions|tmp)\s+-type\s+f\s+-mtime\s+\+\d+\s+-delete$/i]
              }
            },
            {
              mode: 'read_the_room',
              prompt: 'Steam vents sharply. <strong>A background job keeps dying the instant you close your terminal session. Diagnose it, then fix it.</strong>',
              damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 45,
              hintNudge: 'By default, closing a terminal sends a hangup signal to everything running under it — one command is specifically designed to ignore that signal.',
              hintPartial: 'The job is tied to the terminal session and dies on SIGHUP when the session ends — it needs to be detached from that.',
              hintFull: 'Diagnosis: the job is receiving SIGHUP when the terminal closes. Fix: re-run it with nohup so it ignores hangup signals, e.g. nohup ./longjob.sh &.',
              outputBlock: [
                '$ ./longjob.sh &',
                '[1] 8842',
                '$ exit',
                'logout',
                'Connection to server closed.',
                '',
                '(reconnecting)',
                '$ ps aux | grep longjob',
                '(nothing found)'
              ],
              acceptableDiagnosesPatterns: [/sighup/i, /hangup/i, /tied\s*to\s*(the\s*)?(terminal|session)/i, /dies\s*when\s*(the\s*)?(terminal|session)\s*closes/i],
              followUpFix: {
                prompt: 'Re-run it so it survives the terminal closing:',
                acceptablePatterns: [/^\(nohup\s+\.\/longjob\.sh\s*>\s*\/dev\/null\s*2>&1\s*&\)$/i, /^screen\s+.*longjob\.sh$/i, /^tmux\s+.*longjob\.sh$/i],
                optimalPatterns: [/^nohup\s+\.\/longjob\.sh\s*&$/i]
              }
            },
            {
              mode: 'read_the_room',
              prompt: 'The Golem\'s eyes narrow. <strong>A cron job that works perfectly when you run it by hand silently fails to run on schedule. Diagnose it, then fix it.</strong>',
              damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 45,
              hintNudge: 'Your interactive shell has a much richer $PATH than cron\'s minimal environment — a command that "just works" for you may not exist in cron\'s PATH at all.',
              hintPartial: 'cron runs with a bare-bones environment — a script that calls a tool by short name (not its full path) can silently fail to find it.',
              hintFull: 'Diagnosis: cron\'s stripped-down environment doesn\'t have the same $PATH as your interactive shell. Fix: use the tool\'s absolute path (or source the right environment) inside the script/crontab entry.',
              outputBlock: [
                '$ crontab -l',
                '0 2 * * * /home/devops/backup.sh',
                '',
                '$ cat /home/devops/backup.sh',
                '#!/bin/bash',
                'aws s3 cp /data s3://backups/ --recursive',
                '',
                '(cron mail): backup.sh: line 2: aws: command not found'
              ],
              acceptableDiagnosesPatterns: [/path/i, /cron.*environment/i, /environment.*cron/i, /minimal\s*environment/i],
              followUpFix: {
                prompt: 'Fix the script to use the tool\'s absolute path instead of relying on cron\'s PATH:',
                acceptablePatterns: [/^export\s+PATH=.*aws.*$/i],
                optimalPatterns: [/^\/usr\/local\/bin\/aws\s+s3\s+cp\s+\/data\s+s3:\/\/backups\/\s+--recursive$/i]
              }
            },
            {
              mode: 'build_the_pipeline',
              prompt: 'The Golem\'s eyes glow. <strong>Sequence the correct order for safely rotating an application\'s log files.</strong>',
              steps: [
                'Confirm the current log file\'s size (du -sh)',
                'Copy the current log to a timestamped archive name',
                'Truncate the live log file (never delete it while the app still holds it open)',
                'Confirm the app is still writing to the log without error'
              ],
              damageIfCorrect: 22, damageIfOptimal: 36,
              damageToHeroIfWrong: 20
            },
            {
              mode: 'build_the_pipeline',
              prompt: 'A slab grinds into place. <strong>Sequence the correct order for adding a new user and granting them sudo access.</strong>',
              steps: [
                'Create the user account (useradd -m)',
                'Set an initial password (passwd)',
                'Add the user to the sudo/wheel group',
                'Verify with su - and a sudo test command'
              ],
              damageIfCorrect: 22, damageIfOptimal: 36,
              damageToHeroIfWrong: 20
            }
          ]
        },
        {
          name: 'Level 3 — Advanced Basics',
          hp: 130,
          questions: [
            {
              mode: 'terminal',
              prompt: 'The Golem\'s core hums: <strong>"Find the process ID of the process named <code>nginx</code>, without opening a full process list."</strong>',
              damageIfCorrect: 16, damageIfOptimal: 26, timeAllotted: 40,
              hintNudge: 'One dedicated command exists purely to look up a PID by process name — no need to grep through ps output.',
              hintPartial: 'p_____ nginx',
              hintFull: 'pgrep nginx',
              acceptablePatterns: [/^ps\s+aux\s*\|\s*grep\s+nginx$/i],
              optimalPatterns: [/^pgrep\s+nginx$/i],
              baseCmds: ['pgrep', 'ps']
            },
            {
              mode: 'terminal',
              prompt: 'A rumble builds: <strong>"Stop process 4821 gracefully — give it a chance to clean up, don\'t force-kill it."</strong>',
              damageIfCorrect: 14, damageIfOptimal: 22, timeAllotted: 40,
              hintNudge: 'The default kill signal (no flag needed) already IS the graceful one — the mistake most people make is reaching for -9 immediately.',
              hintPartial: 'kill __ 4821 (no flag, or explicitly -15)',
              hintFull: 'kill 4821',
              acceptablePatterns: [/^kill\s+-15\s+4821$/i, /^kill\s+-SIGTERM\s+4821$/i],
              optimalPatterns: [/^kill\s+4821$/i],
              baseCmds: ['kill']
            },
            {
              mode: 'terminal',
              prompt: 'The Golem tilts forward: <strong>"Run <code>migrate.sh</code> in the background so it keeps going even after you log out."</strong>',
              damageIfCorrect: 16, damageIfOptimal: 26, timeAllotted: 40,
              hintNudge: 'One command makes a process immune to the hangup signal your session sends on logout — combine it with backgrounding via &.',
              hintPartial: 'no____ ./migrate.sh &',
              hintFull: 'nohup ./migrate.sh &',
              acceptablePatterns: [/^\.\/migrate\.sh\s*&$/i],
              optimalPatterns: [/^nohup\s+\.\/migrate\.sh\s*&$/i],
              baseCmds: ['nohup']
            },
            {
              mode: 'terminal',
              prompt: 'A crack of stone: <strong>"Open your crontab for editing."</strong>',
              damageIfCorrect: 12, damageIfOptimal: 18, timeAllotted: 40,
              hintNudge: 'One short command, one flag — opens your personal scheduled-jobs file in an editor.',
              hintPartial: 'crontab -_',
              hintFull: 'crontab -e',
              acceptablePatterns: [],
              optimalPatterns: [/^crontab\s+-e$/i],
              baseCmds: ['crontab']
            },
            {
              mode: 'terminal',
              prompt: 'The Golem grinds: <strong>"List every TCP port this machine is currently listening on, along with the process using it."</strong>',
              damageIfCorrect: 18, damageIfOptimal: 28, timeAllotted: 40,
              hintNudge: 'The modern socket-statistics tool has flags for TCP, listening-only, numeric ports, and showing the owning process.',
              hintPartial: 'ss -tl__',
              hintFull: 'ss -tlnp',
              acceptablePatterns: [/^(sudo\s+)?netstat\s+-tulpn$/i],
              optimalPatterns: [/^(sudo\s+)?ss\s+-tlnp$/i],
              baseCmds: ['ss', 'netstat']
            },
            {
              mode: 'terminal',
              prompt: 'A stony hand traces symbols: <strong>"Grant the group write permission on <code>shared.txt</code>, without touching owner or other permissions at all."</strong>',
              damageIfCorrect: 16, damageIfOptimal: 26, timeAllotted: 40,
              hintNudge: 'Symbolic chmod notation can target just ONE class (u/g/o) and ADD a permission, leaving the rest completely untouched — numeric mode can\'t do that without knowing the existing bits.',
              hintPartial: 'chmod g+_ shared.txt',
              hintFull: 'chmod g+w shared.txt',
              acceptablePatterns: [],
              optimalPatterns: [/^chmod\s+g\+w\s+shared\.txt$/i],
              baseCmds: ['chmod']
            },
            {
              mode: 'terminal',
              prompt: 'The Golem\'s eyes glow: <strong>"Delete every file older than 30 days inside <code>/tmp/cache</code>, recursively."</strong>',
              damageIfCorrect: 18, damageIfOptimal: 28, timeAllotted: 40,
              hintNudge: 'find\'s modification-time flag with a "+" means "older than," combined with a delete action.',
              hintPartial: 'find /tmp/cache -mtime +__ -delete',
              hintFull: 'find /tmp/cache -mtime +30 -delete',
              acceptablePatterns: [/^find\s+\/tmp\/cache\s+-mtime\s+\+30\s+-exec\s+rm\s+\{\}\s*\\;$/i],
              optimalPatterns: [/^find\s+\/tmp\/cache\s+-mtime\s+\+30\s+-delete$/i],
              baseCmds: ['find']
            },
            {
              mode: 'terminal',
              prompt: 'A vent hisses steam: <strong>"Print just the 2nd column of every line in <code>stats.txt</code> (whitespace-separated)."</strong>',
              damageIfCorrect: 16, damageIfOptimal: 26, timeAllotted: 40,
              hintNudge: 'This is the classic text-processing tool for column-based data — you reference a field with a dollar sign and its number.',
              hintPartial: 'awk \'{print $_}\' stats.txt',
              hintFull: 'awk \'{print $2}\' stats.txt',
              acceptablePatterns: [/^cut\s+-d\s*' '\s*-f\s*2\s+stats\.txt$/i],
              optimalPatterns: [/^awk\s+'\{\s*print\s+\$2\s*\}'\s+stats\.txt$/i],
              baseCmds: ['awk']
            },
            {
              mode: 'terminal',
              prompt: 'The Golem rumbles low: <strong>"Replace every occurrence of \'staging\' with \'production\' in <code>config.yml</code>, editing the file in place."</strong>',
              damageIfCorrect: 18, damageIfOptimal: 28, timeAllotted: 40,
              hintNudge: 'The classic stream editor for find-and-replace — it needs an in-place flag or it just prints the result without saving.',
              hintPartial: 'sed -_ \'s/staging/production/g\' config.yml',
              hintFull: 'sed -i \'s/staging/production/g\' config.yml',
              acceptablePatterns: [/^sed\s+'s\/staging\/production\/g'\s+config\.yml$/i],
              optimalPatterns: [/^sed\s+-i\s+'s\/staging\/production\/g'\s+config\.yml$/i],
              baseCmds: ['sed']
            },
            {
              mode: 'spot_the_bug',
              prompt: 'The Golem shows a fractured tablet: <strong>"This script captures a value inside a pipeline, but the variable is always empty afterward. Find and fix the bug."</strong>',
              damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 40,
              hintNudge: 'The right side of a pipe runs in its own subshell — any variable it sets disappears the instant that subshell exits.',
              hintPartial: 'Line 2 sets COUNT inside a subshell (after the pipe), so it\'s gone by line 3 — restructure to avoid the pipe-into-subshell.',
              hintFull: 'Line 2 should read: COUNT=$(cat data.txt | wc -l) — capturing the WHOLE pipeline\'s output in the parent shell, not assigning inside it.',
              codeBlock: [
                '#!/bin/bash',
                'cat data.txt | while read line; do COUNT=$((COUNT+1)); done',
                'echo "Lines: $COUNT"'
              ],
              buggyLineId: 1,
              correctFixPatterns: [/^COUNT=\$\(cat\s+data\.txt\s*\|\s*wc\s+-l\)$/i]
            },
            {
              mode: 'spot_the_bug',
              prompt: 'A tablet splits open: <strong>"This script is meant to match any .log file, but it fails when there are no matches at all. Find and fix the bug."</strong>',
              damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 40,
              hintNudge: 'Quoting a glob pattern stops bash from expanding it at all — so it gets passed to the command as a literal, un-expanded string.',
              hintPartial: 'Line 2\'s glob is inside quotes, so bash never expands *.log — it\'s passed to ls as one literal filename.',
              hintFull: 'Line 2 should read: ls *.log',
              codeBlock: [
                '#!/bin/bash',
                'ls "*.log"'
              ],
              buggyLineId: 1,
              correctFixPatterns: [/^ls\s+\*\.log$/i]
            },
            {
              mode: 'spot_the_bug',
              prompt: 'The Golem\'s eyes flare: <strong>"This script is supposed to detect a failed command, but it never notices a failure. Find and fix the bug."</strong>',
              damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 40,
              hintNudge: '$? holds the exit code of the LAST command run — but a command sitting between the real command and the check overwrites it first.',
              hintPartial: 'Line 3\'s echo runs BEFORE the check, so by line 4, $? reflects the echo\'s own exit code, not deploy.sh\'s.',
              hintFull: 'Line 4 should check $? immediately after line 2, before any other command runs — move the check right after deploy.sh.',
              codeBlock: [
                './deploy.sh',
                'echo "Deploy step finished"',
                'if [ $? -ne 0 ]; then',
                '    echo "Deploy failed"',
                'fi'
              ],
              buggyLineId: 1,
              correctFixPatterns: [/^if\s*\[\s*\$\?\s*-ne\s*0\s*\]\s*;?\s*then$/i]
            },
            {
              mode: 'spot_the_bug',
              prompt: 'A stone panel cracks: <strong>"This here-doc is supposed to write a config block to a file, but the script errors out instead. Find and fix the bug."</strong>',
              damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 40,
              hintNudge: 'A here-doc\'s closing delimiter has to match the opening one EXACTLY, on its own line, with no extra characters.',
              hintPartial: 'Line 4 closes with "EOF " (trailing space) instead of exactly "EOF" — bash never recognizes it as the terminator.',
              hintFull: 'Line 4 should read exactly: EOF (no trailing space, nothing else on the line)',
              codeBlock: [
                'cat <<EOF > config.txt',
                'host=localhost',
                'port=8080',
                'EOF '
              ],
              buggyLineId: 3,
              correctFixPatterns: [/^EOF$/]
            },
            {
              mode: 'spot_the_bug',
              prompt: 'The Golem grinds a warning: <strong>"This script is supposed to print the second server in the list, but it prints the wrong one. Find and fix the bug."</strong>',
              damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 40,
              hintNudge: 'Bash array indexing starts at 0, not 1 — "the second element" and "index 2" are not the same thing.',
              hintPartial: 'Line 2 uses index 2, which is actually the THIRD element (0, 1, 2) — the second element is index 1.',
              hintFull: 'Line 2 should read: echo "${SERVERS[1]}"',
              codeBlock: [
                'SERVERS=("web1" "web2" "web3")',
                'echo "${SERVERS[2]}"'
              ],
              buggyLineId: 1,
              correctFixPatterns: [/^echo\s+"\$\{SERVERS\[1\]\}"$/i]
            },
            {
              mode: 'triage_call',
              prompt: 'The Golem groans: <strong>"A server\'s disk is at 95% and climbing. Pick your move, then justify it in one line."</strong>',
              damageIfCorrect: 20, damageIfOptimal: 34, timeAllotted: 40,
              hintNudge: 'One option acts before understanding anything. One option finds out what\'s actually consuming the space first.',
              hintPartial: 'You need to know WHAT is filling the disk before deciding what\'s safe to remove.',
              hintFull: 'Best: use du to find what\'s actually consuming the space first, THEN decide what\'s safe to clear — never delete blind under pressure.',
              options: [
                { id: 'a', label: 'Immediately delete the largest files you can find, whatever they are', tier: 'wrong', why: 'The largest file might be an active database or a file a running process still needs — deleting blind can cause a worse outage than the disk warning itself.' },
                { id: 'b', label: 'Run du -sh on top-level directories first to find what\'s actually consuming space, then act', tier: 'best', why: 'Identifies the REAL cause before touching anything — old logs, a runaway core dump, or a genuine data-growth problem all need different responses.' },
                { id: 'c', label: 'Immediately provision more disk space without investigating', tier: 'defensible', why: 'Buys time safely, but doesn\'t answer why disk usage is climbing — if it\'s a leak or runaway process, the new space fills up too, just later.' }
              ],
              justificationPatterns: [/du\s|find\s*out|investigate|diagnose|what.?s\s*consuming|understand\s*first/i]
            },
            {
              mode: 'triage_call',
              prompt: 'A slab grinds open: <strong>"A one-off script needs to run for hours, unattended, tonight. Pick your move, then justify it in one line."</strong>',
              damageIfCorrect: 20, damageIfOptimal: 34, timeAllotted: 40,
              hintNudge: 'One approach only survives you being logged in. The other survives a reboot, restarts on failure, and gives you real logs.',
              hintPartial: 'For anything long-running and important, a real service definition is more robust than a background shell job.',
              hintFull: 'Best: for a genuinely important unattended run, wrap it as a systemd service (or at minimum use nohup/tmux) — a bare background job dies with the session and leaves no real log trail.',
              options: [
                { id: 'a', label: 'Just run it with & and close the terminal', tier: 'wrong', why: 'Without nohup or a proper service, this can still die on logout depending on the shell\'s settings — a real risk for something that needs to survive hours unattended.' },
                { id: 'b', label: 'Set it up as a proper systemd service (or at least nohup/tmux) with real logging', tier: 'best', why: 'Survives disconnects, gives you real logs to check in the morning, and is the standard, robust way to run anything unattended and important.' },
                { id: 'c', label: 'Stay logged in all night to babysit the terminal', tier: 'defensible', why: 'Would technically work, but is a poor use of anyone\'s night and doesn\'t scale — the whole point of automation is not babysitting it.' }
              ],
              justificationPatterns: [/systemd|service|survive|nohup|tmux|screen|reliable|restart/i]
            },
            {
              mode: 'triage_call',
              prompt: 'The Golem rumbles: <strong>"A process is hitting the default max-open-files limit and erroring. Pick your move, then justify it in one line."</strong>',
              damageIfCorrect: 20, damageIfOptimal: 34, timeAllotted: 40,
              hintNudge: 'One option treats the symptom by cranking a number way up with no thought. One option checks what\'s reasonable for this specific workload first.',
              hintPartial: 'Check the current limit and how close normal operation actually gets to it before picking a new number.',
              hintFull: 'Best: check the current ulimit and actual usage pattern first, then raise it to a value that comfortably covers real need — not an arbitrarily huge number "just in case."',
              options: [
                { id: 'a', label: 'Set the limit to "unlimited" so this never happens again', tier: 'wrong', why: 'Removes a real safety net — a genuine file-descriptor leak can now exhaust the WHOLE system instead of hitting a contained limit for just this process.' },
                { id: 'b', label: 'Check current usage/limit with ulimit -n and ps, then raise it to a sensible value based on real need', tier: 'best', why: 'Fixes the actual problem with an informed number, while keeping a real ceiling in place in case something is actually leaking file descriptors.' },
                { id: 'c', label: 'Restart the process and hope it doesn\'t happen again', tier: 'wrong', why: 'Doesn\'t address the limit at all — if the workload genuinely needs more open files, this fails again shortly after restart.' }
              ],
              justificationPatterns: [/ulimit|current\s*(usage|limit)|sensible|reasonable|based\s*on|check\s*first/i]
            },
            {
              mode: 'triage_call',
              prompt: 'A slab shudders: <strong>"A process seems hung — no new log lines in 10 minutes. Pick your move, then justify it in one line."</strong>',
              damageIfCorrect: 20, damageIfOptimal: 34, timeAllotted: 40,
              hintNudge: 'One option destroys the process (and any evidence of what it was doing) instantly. One option looks at what it\'s actually doing first.',
              hintPartial: 'Before killing anything, check what the process is actually doing right now — it might be blocked on I/O, not truly hung.',
              hintFull: 'Best: check its state first (ps, /proc/<pid>/status, or strace -p) to see if it\'s genuinely stuck vs. just slow/blocked on I/O, THEN decide whether to kill it.',
              options: [
                { id: 'a', label: 'kill -9 it immediately since it\'s clearly stuck', tier: 'wrong', why: 'Destroys any chance to diagnose WHY it hung — if this happens again in an hour, you\'ve learned nothing and lost the evidence.' },
                { id: 'b', label: 'Check its current state first (ps, /proc status, strace -p), then decide', tier: 'best', why: 'A process can look "stuck" while actually being blocked on slow I/O or a lock — checking first avoids killing something that would have finished, and preserves evidence if it truly is broken.' },
                { id: 'c', label: 'Wait another 30 minutes to see if it recovers on its own', tier: 'defensible', why: 'Reasonable in low-stakes situations, but passive if this is actually impacting users — worth at least a quick state check while waiting.' }
              ],
              justificationPatterns: [/check\s*(its\s*)?state|strace|diagnose\s*first|blocked|why\s*it|before\s*killing/i]
            },
            {
              mode: 'read_the_room',
              prompt: 'The Golem\'s core cracks. <strong>The load average on a server is high, but CPU usage in top looks almost idle. Diagnose it, then fix it.</strong>',
              damageIfCorrect: 22, damageIfOptimal: 36, timeAllotted: 40,
              hintNudge: 'Load average counts processes waiting for ANY resource, not just CPU — check the "wa" (I/O wait) column.',
              hintPartial: 'A high %wa in top means processes are stuck waiting on disk I/O, not CPU — that inflates load average without CPU usage rising.',
              hintFull: 'Diagnosis: the system is I/O-bound, not CPU-bound — processes are piling up waiting on disk. Fix: use iostat to find which disk/process is the bottleneck.',
              outputBlock: [
                '$ uptime',
                ' 14:02:11 up 3 days,  load average: 8.20, 7.95, 6.10',
                '',
                '$ top',
                '%Cpu(s):  2.1 us,  1.0 sy,  0.0 ni, 12.4 id,  84.5 wa,  0.0 hi'
              ],
              acceptableDiagnosesPatterns: [/i\/?o\s*wait/i, /i\/?o.?bound/i, /disk\s*(is\s*)?(the\s*)?bottleneck/i, /waiting\s*on\s*disk/i],
              followUpFix: {
                prompt: 'Now find which disk is the bottleneck:',
                acceptablePatterns: [/^iotop$/i],
                optimalPatterns: [/^iostat\s+-x\s+\d+$/i, /^iostat\s+-x$/i]
              }
            },
            {
              mode: 'read_the_room',
              prompt: 'Steam vents from the core. <strong>A scheduled backup runs fine manually but never appears to run on its schedule. Diagnose it, then fix it.</strong>',
              damageIfCorrect: 22, damageIfOptimal: 36, timeAllotted: 40,
              hintNudge: 'If the schedule line itself is wrong, the job never even attempts to run — check the cron time syntax before anything else.',
              hintPartial: 'Reading "0 25 * * *" as a cron schedule — the hour field only accepts 0-23. That\'s an invalid, silently-ignored entry.',
              hintFull: 'Diagnosis: the cron schedule syntax is invalid (hour 25 doesn\'t exist), so the job never fires. Fix: correct it to a valid time, e.g. 0 2 * * * for 2am daily.',
              outputBlock: [
                '$ crontab -l',
                '0 25 * * * /home/devops/backup.sh',
                '',
                '$ grep CRON /var/log/syslog | tail -3',
                '(nothing — no entries for this job, ever)'
              ],
              acceptableDiagnosesPatterns: [/invalid\s*(cron\s*)?(schedule|syntax|time)/i, /hour\s*25/i, /bad\s*cron\s*syntax/i],
              followUpFix: {
                prompt: 'Fix the crontab entry to a valid schedule (2am daily):',
                acceptablePatterns: [],
                optimalPatterns: [/^0\s+2\s+\*\s+\*\s+\*\s+\/home\/devops\/backup\.sh$/]
              }
            },
            {
              mode: 'read_the_room',
              prompt: 'The Golem\'s core flares red. <strong>An application log file is growing at an alarming rate and threatening to fill the disk. Diagnose it, then fix it.</strong>',
              damageIfCorrect: 22, damageIfOptimal: 36, timeAllotted: 40,
              hintNudge: 'Read the repeated log lines carefully — the same warning printing thousands of times per second is the actual root cause, not just "logs are big."',
              hintPartial: 'The app is stuck in a retry loop logging the same connection error every few milliseconds — the log growth is a SYMPTOM of that loop.',
              hintFull: 'Diagnosis: a runaway retry loop is spamming the log (not normal traffic volume). Fix: rotate/truncate the log immediately to reclaim space, then fix the underlying retry loop so it stops flooding.',
              outputBlock: [
                '$ ls -lh app.log',
                '-rw-r--r-- 1 app app 8.2G Sep 15 14:00 app.log',
                '',
                '$ tail -5 app.log',
                '[14:00:00.001] WARN retrying DB connection...',
                '[14:00:00.003] WARN retrying DB connection...',
                '[14:00:00.005] WARN retrying DB connection...',
                '[14:00:00.007] WARN retrying DB connection...',
                '[14:00:00.009] WARN retrying DB connection...'
              ],
              acceptableDiagnosesPatterns: [/retry\s*loop/i, /spamming/i, /flooding/i, /stuck\s*(in\s*a\s*)?loop/i],
              followUpFix: {
                prompt: 'Immediately reclaim the disk space (safely, without breaking the still-open file handle):',
                acceptablePatterns: [/^cat\s+\/dev\/null\s*>\s*app\.log$/i],
                optimalPatterns: [/^truncate\s+-s\s*0\s+app\.log$/i]
              }
            },
            {
              mode: 'read_the_room',
              prompt: 'A crack splits the Golem\'s chest. <strong>A web service is only reachable from the server itself, not from any other machine on the network. Diagnose it, then fix it.</strong>',
              damageIfCorrect: 22, damageIfOptimal: 36, timeAllotted: 40,
              hintNudge: 'Check exactly WHICH address the service is bound to — one specific address means "only reachable from inside this same machine."',
              hintPartial: '127.0.0.1 is the loopback address — a service bound only there can never be reached from outside the box, no matter the firewall.',
              hintFull: 'Diagnosis: the service is bound to 127.0.0.1 (localhost only) instead of a real network interface. Fix: change the bind address in its config to 0.0.0.0 (or the specific external interface IP), then restart it.',
              outputBlock: [
                '$ ss -tlnp',
                'State   Local Address:Port    Process',
                'LISTEN  127.0.0.1:8080        node',
                '',
                '$ curl http://<server-external-ip>:8080',
                'curl: (7) Failed to connect: Connection refused'
              ],
              acceptableDiagnosesPatterns: [/bound\s*to\s*(127\.0\.0\.1|localhost)/i, /localhost\s*only/i, /loopback/i, /wrong\s*(bind\s*)?(address|interface)/i],
              followUpFix: {
                prompt: 'Fix the bind address in the config so it\'s reachable externally, then restart:',
                acceptablePatterns: [/^sudo\s+systemctl\s+restart\s+\w+$/i],
                optimalPatterns: [/bind.*0\.0\.0\.0/i]
              }
            },
            {
              mode: 'read_the_room',
              prompt: 'The Golem\'s knuckles crack. <strong>A shell script fails with "Argument list too long" when processing a directory. Diagnose it, then fix it.</strong>',
              damageIfCorrect: 22, damageIfOptimal: 36, timeAllotted: 40,
              hintNudge: 'A glob that expands to tens of thousands of filenames gets passed as one gigantic argument list — there\'s a real OS-level limit on how long that can be.',
              hintPartial: 'rm *.log expands the glob into one enormous command line before rm even runs — with 200,000 files, that line exceeds the shell\'s argument-length limit.',
              hintFull: 'Diagnosis: the glob expanded into more arguments than the OS allows on one command line. Fix: use find piped to xargs (or find -delete), which processes files in manageable batches instead of one giant expansion.',
              outputBlock: [
                '$ rm *.log',
                'bash: /bin/rm: Argument list too long',
                '',
                '$ ls *.log | wc -l',
                '212489'
              ],
              acceptableDiagnosesPatterns: [/too\s*many\s*(files|arguments)/i, /argument\s*list/i, /glob\s*expand/i],
              followUpFix: {
                prompt: 'Fix it using a command that processes files in batches instead of one giant expansion:',
                acceptablePatterns: [/^find\s+\.\s+-name\s+"?\*\.log"?\s+-delete$/i],
                optimalPatterns: [/^find\s+\.\s+-name\s+"?\*\.log"?\s+-print0\s*\|\s*xargs\s+-0\s+rm$/i, /^find\s+\.\s+-name\s+"?\*\.log"?\s*\|\s*xargs\s+rm$/i]
              }
            },
            {
              mode: 'build_the_pipeline',
              prompt: 'The Golem\'s eyes glow bright. <strong>Sequence the correct order for diagnosing and clearing a full disk, safely.</strong>',
              steps: [
                'Confirm free space and inode usage (df -h and df -i)',
                'Find the largest directories (du -sh /*)',
                'Narrow down to the largest individual files inside the worst directory',
                'Confirm each candidate file is safe to remove before deleting it',
                'Re-check df -h to confirm space was actually reclaimed'
              ],
              damageIfCorrect: 24, damageIfOptimal: 40,
              damageToHeroIfWrong: 22
            },
            {
              mode: 'build_the_pipeline',
              prompt: 'A slab grinds heavily. <strong>Sequence the correct order for setting up SSH key-based login to a new server.</strong>',
              steps: [
                'Generate a key pair locally (ssh-keygen)',
                'Copy the public key to the server (ssh-copy-id)',
                'Test logging in with the key',
                'Disable password authentication in sshd_config',
                'Restart the SSH service'
              ],
              damageIfCorrect: 24, damageIfOptimal: 40,
              damageToHeroIfWrong: 22
            }
          ]
        },
        {
          name: 'Level 4 — Real Incidents',
          hp: 150,
          questions: [
            {
              mode: 'terminal',
              prompt: 'The Golem\'s core pulses ominously: <strong>"Find every file under <code>/var</code> larger than 500MB."</strong>',
              damageIfCorrect: 18, damageIfOptimal: 28, timeAllotted: 32,
              hintNudge: 'find\'s size flag with a "+" means "larger than" — combine it with the right unit suffix.',
              hintPartial: 'find /var -size +____',
              hintFull: 'find /var -size +500M',
              acceptablePatterns: [],
              optimalPatterns: [/^find\s+\/var\s+-size\s+\+500M$/i],
              baseCmds: ['find']
            },
            {
              mode: 'terminal',
              prompt: 'A rumble shakes the arena: <strong>"List every file process 4821 currently has open."</strong>',
              damageIfCorrect: 18, damageIfOptimal: 28, timeAllotted: 32,
              hintNudge: '"List open files" — the command\'s name is literally an acronym of that phrase, with a flag to target one specific PID.',
              hintPartial: 'l___ -p 4821',
              hintFull: 'lsof -p 4821',
              acceptablePatterns: [],
              optimalPatterns: [/^lsof\s+-p\s*4821$/i],
              baseCmds: ['lsof']
            },
            {
              mode: 'terminal',
              prompt: 'The Golem leans in: <strong>"Show every log entry for the <code>nginx</code> service from the last hour."</strong>',
              damageIfCorrect: 18, damageIfOptimal: 28, timeAllotted: 32,
              hintNudge: 'On a systemd-based system, one command reads the structured journal, filterable by unit name and a relative time window.',
              hintPartial: 'journalctl -u nginx --since "__ ___ ___"',
              hintFull: 'journalctl -u nginx --since "1 hour ago"',
              acceptablePatterns: [/^journalctl\s+-u\s+nginx$/i],
              optimalPatterns: [/^journalctl\s+-u\s+nginx\s+--since\s+"1\s*hour\s*ago"$/i],
              baseCmds: ['journalctl']
            },
            {
              mode: 'terminal',
              prompt: 'A crack of stone: <strong>"Restart the <code>nginx</code> service."</strong>',
              damageIfCorrect: 14, damageIfOptimal: 22, timeAllotted: 32,
              hintNudge: 'The standard service-manager command, targeting the exact action and unit name.',
              hintPartial: 'systemctl _______ nginx',
              hintFull: 'systemctl restart nginx',
              acceptablePatterns: [/^service\s+nginx\s+restart$/i],
              optimalPatterns: [/^(sudo\s+)?systemctl\s+restart\s+nginx$/i],
              baseCmds: ['systemctl', 'service']
            },
            {
              mode: 'terminal',
              prompt: 'The Golem grinds heavily: <strong>"Copy <code>/etc/nginx</code> to a remote server at <code>10.0.0.5</code>, preserving all file permissions and timestamps."</strong>',
              damageIfCorrect: 18, damageIfOptimal: 30, timeAllotted: 32,
              hintNudge: 'One tool is purpose-built for efficient, permission-preserving file transfer/sync over SSH — its "archive" flag bundles the right options together.',
              hintPartial: 'r___ -a /etc/nginx 10.0.0.5:/etc/',
              hintFull: 'rsync -a /etc/nginx 10.0.0.5:/etc/',
              acceptablePatterns: [/^scp\s+-p\s+-r\s+\/etc\/nginx\s+10\.0\.0\.5:\/etc\/$/i],
              optimalPatterns: [/^rsync\s+-a\s+\/etc\/nginx\s+10\.0\.0\.5:\/etc\/$/i],
              baseCmds: ['rsync', 'scp']
            },
            {
              mode: 'terminal',
              prompt: 'A stony fist clenches tight: <strong>"See which system calls process 9310 is currently making, live."</strong>',
              damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 32,
              hintNudge: 'One low-level diagnostic tool attaches to a running process and traces every syscall it makes, in real time.',
              hintPartial: 'st____ -p 9310',
              hintFull: 'strace -p 9310',
              acceptablePatterns: [],
              optimalPatterns: [/^strace\s+-p\s*9310$/i],
              baseCmds: ['strace']
            },
            {
              mode: 'terminal',
              prompt: 'The Golem\'s voice drops low: <strong>"Check whether port 5432 is open and reachable on <code>db.internal</code>, without opening a full database client."</strong>',
              damageIfCorrect: 18, damageIfOptimal: 28, timeAllotted: 32,
              hintNudge: 'A lightweight networking utility can just probe whether a TCP port accepts a connection, with a "zero-I/O, verbose" flag combo for exactly this check.',
              hintPartial: 'nc -__ db.internal 5432',
              hintFull: 'nc -zv db.internal 5432',
              acceptablePatterns: [/^telnet\s+db\.internal\s+5432$/i],
              optimalPatterns: [/^nc\s+-zv\s+db\.internal\s+5432$/i],
              baseCmds: ['nc', 'telnet']
            },
            {
              mode: 'terminal',
              prompt: 'A hiss escapes the Golem\'s core: <strong>"Show live memory and CPU stats, refreshing automatically every 2 seconds."</strong>',
              damageIfCorrect: 18, damageIfOptimal: 28, timeAllotted: 32,
              hintNudge: 'A classic lightweight system-activity monitor takes a refresh interval (in seconds) as its argument.',
              hintPartial: 'vm___ 2',
              hintFull: 'vmstat 2',
              acceptablePatterns: [/^top$/i],
              optimalPatterns: [/^vmstat\s+2$/i],
              baseCmds: ['vmstat', 'top']
            },
            {
              mode: 'spot_the_bug',
              prompt: 'The Golem shows a cracked slab: <strong>"Two copies of this script running at once corrupt the same output file. Find and fix the bug."</strong>',
              damageIfCorrect: 22, damageIfOptimal: 36, timeAllotted: 32,
              hintNudge: 'Nothing here stops a second instance from starting while the first is still running — a lock file (or flock) is the standard fix.',
              hintPartial: 'Line 1 needs a lock check before doing any work — e.g. wrapping the script body in flock.',
              hintFull: 'Line 1 should read: flock -n /tmp/job.lock -c \'/path/to/rest-of-script.sh\' (or wrap the body with flock so a second instance exits immediately instead of running concurrently)',
              codeBlock: [
                'echo "Starting job" >> output.log',
                'process_data >> output.log',
                'echo "Done" >> output.log'
              ],
              buggyLineId: 0,
              correctFixPatterns: [/flock/i]
            },
            {
              mode: 'spot_the_bug',
              prompt: 'A tablet shudders: <strong>"This script is supposed to clean up a temp file on exit, even if it fails partway through — but the temp file is left behind on failure. Find and fix the bug."</strong>',
              damageIfCorrect: 22, damageIfOptimal: 36, timeAllotted: 32,
              hintNudge: 'bash has a builtin specifically for "run this cleanup command no matter how the script exits" — it\'s missing entirely here.',
              hintPartial: 'Line 2 needs a trap registered right after creating the temp file, so cleanup runs on ANY exit path.',
              hintFull: 'Line 2 should read: trap \'rm -f "$TMPFILE"\' EXIT',
              codeBlock: [
                'TMPFILE=$(mktemp)',
                'process_data > "$TMPFILE"',
                'rm -f "$TMPFILE"'
              ],
              buggyLineId: 0,
              correctFixPatterns: [/trap\s+.*EXIT/i]
            },
            {
              mode: 'spot_the_bug',
              prompt: 'The Golem\'s eyes flash: <strong>"This script builds a command from user input and runs it — and it just let someone run an arbitrary extra command. Find and fix the bug."</strong>',
              damageIfCorrect: 22, damageIfOptimal: 36, timeAllotted: 32,
              hintNudge: 'eval re-parses its argument as a brand-new shell command — feeding it raw, unsanitized user input is a direct command-injection hole.',
              hintPartial: 'Line 2\'s eval on raw $INPUT lets someone smuggle in extra shell syntax (like a semicolon and a second command) — don\'t eval untrusted input at all.',
              hintFull: 'Line 2 should read: process "$INPUT" (call the intended command/function directly with the input as a quoted argument — never eval raw user input)',
              codeBlock: [
                'INPUT="$1"',
                'eval "process $INPUT"'
              ],
              buggyLineId: 1,
              correctFixPatterns: [/^process\s+"\$INPUT"$/i]
            },
            {
              mode: 'spot_the_bug',
              prompt: 'A stone panel grinds: <strong>"This script loses arguments with spaces in them when it re-passes them to another script. Find and fix the bug."</strong>',
              damageIfCorrect: 22, damageIfOptimal: 36, timeAllotted: 32,
              hintNudge: 'Unquoted $* mashes all arguments into one word-split string — the quoted "$@" form is the one that preserves each argument exactly as it was passed.',
              hintPartial: 'Line 1 uses $* which flattens and word-splits every argument — swap it for "$@" (quoted) to preserve each one intact.',
              hintFull: 'Line 1 should read: ./process.sh "$@"',
              codeBlock: [
                './process.sh $*'
              ],
              buggyLineId: 0,
              correctFixPatterns: [/^\.\/process\.sh\s+"\$@"$/i]
            },
            {
              mode: 'triage_call',
              prompt: 'The Golem groans: <strong>"A deploy 20 minutes ago is causing 500 errors for a small slice of users. Pick your move, then justify it in one line."</strong>',
              damageIfCorrect: 22, damageIfOptimal: 38, timeAllotted: 32,
              hintNudge: 'One option keeps digging into WHY while users keep hitting errors. The other stops the bleeding first, and investigates once things are stable.',
              hintPartial: 'A recent deploy is the most likely cause and the safest immediate move is to undo it, restoring service, THEN dig into the root cause calmly.',
              hintFull: 'Best: roll back the deploy immediately to stop user impact, THEN investigate the root cause once things are stable — stabilize first, understand second.',
              options: [
                { id: 'a', label: 'Start debugging the new code in production to find the exact cause first', tier: 'wrong', why: 'Leaves users hitting errors the entire time you\'re investigating — the fastest, safest fix (undo the likely cause) is sitting right there and unused.' },
                { id: 'b', label: 'Roll back the deploy immediately, then investigate root cause once stable', tier: 'best', why: 'Stops user impact fast using the most likely cause (the recent deploy), then allows a calm, low-pressure investigation afterward — the standard incident-response shape.' },
                { id: 'c', label: 'Wait and monitor to see if the error rate resolves on its own', tier: 'wrong', why: 'Passive in a situation with a clear, very recent, highly-likely cause sitting right there to undo — there\'s no reason to just wait.' }
              ],
              justificationPatterns: [/rollback|roll\s*back|revert|stabilize|stop\s*the\s*bleeding|undo/i]
            },
            {
              mode: 'triage_call',
              prompt: 'A slab grinds violently: <strong>"A service is unresponsive and health checks are failing. Pick your move, then justify it in one line."</strong>',
              damageIfCorrect: 22, damageIfOptimal: 38, timeAllotted: 32,
              hintNudge: 'One option is the smallest, fastest, most targeted action. The other takes down everything else running on that box too.',
              hintPartial: 'Restarting just the one unresponsive service is far less disruptive than rebooting the whole server, and is almost always the right first move.',
              hintFull: 'Best: restart just the specific service first (systemctl restart) — a full server reboot is a much bigger, slower, more disruptive action reserved for when a service restart alone doesn\'t fix it.',
              options: [
                { id: 'a', label: 'Reboot the entire server immediately', tier: 'wrong', why: 'Takes down every OTHER service on that box too, and is much slower than the smaller fix that likely would have worked — reserve full reboots for when a targeted restart genuinely doesn\'t help.' },
                { id: 'b', label: 'Restart just the specific unresponsive service first', tier: 'best', why: 'The smallest, fastest, least disruptive action that\'s likely to fix a hung service — escalate to a full reboot only if this doesn\'t resolve it.' },
                { id: 'c', label: 'Check its logs and current state for a minute before doing anything', tier: 'defensible', why: 'Reasonable if health checks are only marginally failing, but if it\'s genuinely unresponsive and user-impacting, a quick restart usually beats a diagnostic pause.' }
              ],
              justificationPatterns: [/restart\s*(the\s*)?service|targeted|smallest|least\s*disruptive|specific\s*service/i]
            },
            {
              mode: 'triage_call',
              prompt: 'The Golem\'s core cracks wide: <strong>"You suspect a database process is corrupting data, but killing it mid-write could corrupt data worse. Pick your move, then justify it in one line."</strong>',
              damageIfCorrect: 22, damageIfOptimal: 38, timeAllotted: 32,
              hintNudge: 'One option forces immediate termination with zero regard for what it\'s doing right now. One option asks it to stop cleanly first, escalating only if that fails.',
              hintPartial: 'Attempt a graceful shutdown through the database\'s own stop mechanism first — it\'s specifically designed to close out writes safely.',
              hintFull: 'Best: use the database\'s own graceful shutdown command (or SIGTERM) first, giving it a chance to flush and close cleanly — only escalate to kill -9 if it doesn\'t respond, accepting the corruption risk as a last resort.',
              options: [
                { id: 'a', label: 'kill -9 it immediately since data may already be corrupting', tier: 'wrong', why: 'This is exactly the scenario kill -9 is most dangerous in — it guarantees an unclean shutdown mid-write, which is the corruption risk you\'re trying to avoid, not fix.' },
                { id: 'b', label: 'Use the database\'s own graceful stop command (or SIGTERM) first, escalate only if it hangs', tier: 'best', why: 'Gives the database a real chance to flush buffers and close files cleanly, which is exactly the mechanism designed to prevent write corruption during shutdown.' },
                { id: 'c', label: 'Leave it running and just monitor closely for now', tier: 'defensible', why: 'Avoids the shutdown risk entirely, but if you already suspect active corruption, doing nothing lets it keep happening — worth a very short monitoring window at most, not indefinite.' }
              ],
              justificationPatterns: [/graceful|sigterm|clean\s*shutdown|flush|escalate|own\s*stop/i]
            },
            {
              mode: 'triage_call',
              prompt: 'A slab shudders: <strong>"CPU usage is pinned at 100% under normal traffic, and it\'s a single-threaded bottleneck. Pick your move, then justify it in one line."</strong>',
              damageIfCorrect: 22, damageIfOptimal: 38, timeAllotted: 32,
              hintNudge: 'One scaling approach adds more of the SAME machine size to spread load across processes. The other makes ONE machine bigger, which does nothing for a single-threaded ceiling.',
              hintPartial: 'A single-threaded bottleneck can\'t use extra CPU cores on one bigger machine — spreading load across multiple instances is the fix that actually helps.',
              hintFull: 'Best: scale horizontally (more instances behind a load balancer) — a single-threaded process can\'t benefit from a bigger single machine (vertical scaling), since it can only ever use one core at a time.',
              options: [
                { id: 'a', label: 'Scale vertically — move to a machine with more CPU cores', tier: 'wrong', why: 'A single-threaded process can only ever use ONE core, no matter how many the machine has — extra cores sitting idle don\'t help a single-threaded bottleneck at all.' },
                { id: 'b', label: 'Scale horizontally — run more instances behind a load balancer', tier: 'best', why: 'Spreads traffic across multiple single-threaded processes, each on its own core/machine — this is the scaling dimension that actually relieves a single-threaded bottleneck.' },
                { id: 'c', label: 'Profile the code to see if the single-threaded work can be optimized', tier: 'defensible', why: 'A genuinely good long-term move, but doesn\'t solve today\'s "pinned at 100% right now" problem the way scaling out immediately does.' }
              ],
              justificationPatterns: [/horizontal|more\s*instances|load\s*balancer|single.?threaded|one\s*core/i]
            },
            {
              mode: 'triage_call',
              prompt: 'The Golem\'s voice booms: <strong>"You just discovered an API key was accidentally committed to a public repo an hour ago. Pick your move, then justify it in one line."</strong>',
              damageIfCorrect: 24, damageIfOptimal: 40, timeAllotted: 32,
              hintNudge: 'Removing the file from the repo does nothing about the key itself — it\'s already been publicly visible for an hour and must be treated as compromised.',
              hintPartial: 'The key has to be revoked/rotated immediately, regardless of what happens to the git history — an exposed secret is exposed forever once anyone could have seen it.',
              hintFull: 'Best: revoke/rotate the exposed key immediately (treat it as fully compromised), THEN clean up the git history — rotating comes first because history-cleanup alone does nothing about copies already made in that hour.',
              options: [
                { id: 'a', label: 'Just delete the file and force-push to remove it from history', tier: 'wrong', why: 'Doesn\'t invalidate the key at all — anyone who saw the public repo in that hour (or has it cached/cloned) still has a fully working credential. History cleanup without rotation leaves the door wide open.' },
                { id: 'b', label: 'Revoke/rotate the exposed key immediately, then clean up the git history', tier: 'best', why: 'The key must be treated as fully compromised the instant it was public — rotating it first neutralizes the actual risk; history cleanup is real but secondary.' },
                { id: 'c', label: 'Monitor for suspicious usage of the key before deciding whether to rotate it', tier: 'wrong', why: 'Leaves a known-exposed credential active while "watching for abuse" — by the time abuse is detected, damage may already be done. Rotate first, always.' }
              ],
              justificationPatterns: [/revoke|rotate|compromised|treat\s*it\s*as|immediately/i]
            },
            {
              mode: 'read_the_room',
              prompt: 'The Golem\'s core sparks violently. <strong>A process was just killed by the kernel with no error from the app itself. Diagnose it, then fix it.</strong>',
              damageIfCorrect: 24, damageIfOptimal: 40, timeAllotted: 32,
              hintNudge: 'When the kernel itself kills a process (not the app crashing on its own), the system log almost always has an explicit record of why.',
              hintPartial: 'dmesg shows an "Out of memory: Killed process" line — the kernel\'s OOM killer stepped in when the system ran out of memory.',
              hintFull: 'Diagnosis: the OOM (out-of-memory) killer terminated the process because the system ran out of available memory. Fix: identify what\'s consuming memory (likely a leak) and address it, or set a proper memory limit so it\'s constrained before it can take down the whole system.',
              outputBlock: [
                '$ dmesg | tail -5',
                '[892341.223] Out of memory: Killed process 4821 (worker) total-vm:8123456kB',
                '[892341.225] oom_reaper: reaped process 4821 (worker)',
                '',
                '$ free -h',
                '              total   used   free',
                'Mem:           7.8G   7.6G   80M'
              ],
              acceptableDiagnosesPatterns: [/oom/i, /out\s*of\s*memory/i, /kernel\s*killed/i],
              followUpFix: {
                prompt: 'Find what\'s actually consuming the memory before restarting anything:',
                acceptablePatterns: [/^free\s+-h$/i],
                optimalPatterns: [/^ps\s+aux\s+--sort=-%mem\s*\|\s*head$/i]
              }
            },
            {
              mode: 'read_the_room',
              prompt: 'Alarm klaxons blare. <strong>A service keeps restarting every few seconds in a crash loop. Diagnose it, then fix it.</strong>',
              damageIfCorrect: 24, damageIfOptimal: 40, timeAllotted: 32,
              hintNudge: 'The service\'s own journal will show the exact error it hits every time, right before it dies — that\'s the actual root cause, not just "it keeps crashing."',
              hintPartial: 'The journal shows a config parse error on every start attempt — the service can\'t even finish booting, so it exits immediately and systemd restarts it, forever.',
              hintFull: 'Diagnosis: a config file syntax error is crashing the service on every startup attempt. Fix: correct the malformed config line, then restart the service once to break the loop.',
              outputBlock: [
                '$ journalctl -u myapp -n 10 --no-pager',
                'myapp[9021]: FATAL: config.yml line 14: invalid syntax, expected \':\' after key',
                'systemd[1]: myapp.service: Main process exited, code=exited, status=1',
                'systemd[1]: myapp.service: Scheduled restart job, restart counter is at 47.'
              ],
              acceptableDiagnosesPatterns: [/config\s*(syntax\s*)?error/i, /malformed\s*config/i, /bad\s*config/i, /parse\s*error/i],
              followUpFix: {
                prompt: 'Fix the config, then restart the service to break the crash loop:',
                acceptablePatterns: [],
                optimalPatterns: [/^(sudo\s+)?systemctl\s+restart\s+myapp$/i]
              }
            },
            {
              mode: 'read_the_room',
              prompt: 'The Golem\'s core dims. <strong>HTTPS requests to a service suddenly all fail with a certificate error. Diagnose it, then fix it.</strong>',
              damageIfCorrect: 24, damageIfOptimal: 40, timeAllotted: 32,
              hintNudge: 'Check the certificate\'s actual validity window — an old cert that was fine yesterday can simply run out of time.',
              hintPartial: 'openssl shows "notAfter" is in the past — the TLS certificate has expired, which is why every connection is now rejected.',
              hintFull: 'Diagnosis: the TLS certificate has expired. Fix: renew/reissue the certificate (e.g. via certbot renew) and reload the web server to pick up the new one.',
              outputBlock: [
                '$ curl https://api.example.com',
                'curl: (60) SSL certificate problem: certificate has expired',
                '',
                '$ openssl x509 -enddate -noout -in /etc/ssl/certs/api.crt',
                'notAfter=Sep 14 03:00:00 2026 GMT'
              ],
              acceptableDiagnosesPatterns: [/expired/i, /certificate.*expir/i, /cert.*expir/i],
              followUpFix: {
                prompt: 'Renew the certificate, then reload the web server to apply it:',
                acceptablePatterns: [/^certbot\s+renew$/i],
                optimalPatterns: [/^certbot\s+renew\s*&&\s*(sudo\s+)?systemctl\s+reload\s+nginx$/i]
              }
            },
            {
              mode: 'read_the_room',
              prompt: 'Cracks web across the Golem\'s chest. <strong>DNS lookups for one specific internal hostname intermittently fail, though the network itself is fine. Diagnose it, then fix it.</strong>',
              damageIfCorrect: 24, damageIfOptimal: 40, timeAllotted: 32,
              hintNudge: 'Query the DNS server directly for that hostname — if it times out or errors intermittently, the resolver/nameserver itself is the suspect, not the network path.',
              hintPartial: 'dig shows the query timing out against the configured nameserver some of the time — that specific nameserver entry is unreliable.',
              hintFull: 'Diagnosis: the configured DNS nameserver is intermittently failing to resolve. Fix: check /etc/resolv.conf and add/switch to a reliable secondary nameserver.',
              outputBlock: [
                '$ dig internal-db.corp.local',
                ';; connection timed out; no servers could be reached',
                '',
                '$ cat /etc/resolv.conf',
                'nameserver 10.0.0.2'
              ],
              acceptableDiagnosesPatterns: [/dns\s*(server|resolver)/i, /nameserver/i, /resolv\.conf/i],
              followUpFix: {
                prompt: 'Add a reliable secondary nameserver to resolv.conf:',
                acceptablePatterns: [],
                optimalPatterns: [/nameserver\s+(8\.8\.8\.8|1\.1\.1\.1)/i]
              }
            },
            {
              mode: 'read_the_room',
              prompt: 'The Golem groans low. <strong>A server suddenly has far more running processes than expected, and things are slowing down. Diagnose it, then fix it.</strong>',
              damageIfCorrect: 24, damageIfOptimal: 40, timeAllotted: 32,
              hintNudge: 'Count how many processes actually exist right now, and compare that number against what\'s normal for this box — a runaway spawn loop looks exactly like this.',
              hintPartial: 'ps shows thousands of near-identical worker processes, each spawning more — a script with a recursive/looping spawn bug, not real load.',
              hintFull: 'Diagnosis: a script bug is spawning processes in an unbounded loop (a fork-bomb-like pattern), not genuine traffic. Fix: kill the runaway processes by name (pkill), then fix the script\'s spawn logic before running it again.',
              outputBlock: [
                '$ ps aux | wc -l',
                '4821',
                '',
                '$ ps aux | grep worker.sh | head -3',
                'devops  91023  0.0  0.0  worker.sh',
                'devops  91024  0.0  0.0  worker.sh',
                'devops  91025  0.0  0.0  worker.sh'
              ],
              acceptableDiagnosesPatterns: [/fork\s*bomb/i, /runaway\s*(process|spawn)/i, /spawning\s*(too\s*many|unbounded)/i, /too\s*many\s*processes/i],
              followUpFix: {
                prompt: 'Stop every runaway instance by name before touching the script:',
                acceptablePatterns: [],
                optimalPatterns: [/^pkill\s+(-f\s+)?worker\.sh$/i]
              }
            },
            {
              mode: 'read_the_room',
              prompt: 'The Golem\'s eyes go dark. <strong>A service that references a config file via a symlink suddenly fails to start. Diagnose it, then fix it.</strong>',
              damageIfCorrect: 24, damageIfOptimal: 40, timeAllotted: 32,
              hintNudge: 'A symlink is just a pointer — check whether the file it POINTS TO still actually exists.',
              hintPartial: 'ls -la shows the symlink in red/broken state, pointing at a path that no longer exists — the real target file was moved or deleted.',
              hintFull: 'Diagnosis: the symlink points at a target file that no longer exists (broken symlink). Fix: recreate the symlink pointing at the correct current location of the config file.',
              outputBlock: [
                '$ systemctl status myapp',
                'Failed to read config: /etc/myapp/config.yml: No such file or directory',
                '',
                '$ ls -la /etc/myapp/config.yml',
                'lrwxrwxrwx 1 root root 24 Sep 10 config.yml -> /opt/configs/app-v1.yml'
              ],
              acceptableDiagnosesPatterns: [/broken\s*symlink/i, /symlink.*(missing|broken|dangling)/i, /target.*(missing|doesn'?t\s*exist)/i],
              followUpFix: {
                prompt: 'Recreate the symlink pointing at the config\'s real, current location (/opt/configs/app-v2.yml):',
                acceptablePatterns: [],
                optimalPatterns: [/^ln\s+-sf\s+\/opt\/configs\/app-v2\.yml\s+\/etc\/myapp\/config\.yml$/i]
              }
            },
            {
              mode: 'build_the_pipeline',
              prompt: 'The Golem\'s eyes ignite. <strong>Sequence the correct order for a safe production rollback.</strong>',
              steps: [
                'Confirm the previous known-good version/tag',
                'Roll back the deploy to that version',
                'Verify the error rate/health checks recover',
                'Notify the team the rollback happened',
                'Investigate the root cause of the bad deploy afterward'
              ],
              damageIfCorrect: 26, damageIfOptimal: 42,
              damageToHeroIfWrong: 24
            },
            {
              mode: 'build_the_pipeline',
              prompt: 'A slab slams down. <strong>Sequence the correct order for responding to a newly discovered security vulnerability in a running service.</strong>',
              steps: [
                'Assess the actual exposure/severity',
                'Apply or schedule the patch',
                'Restart the affected service to load the patched version',
                'Verify the vulnerability is actually closed',
                'Document what happened for the record'
              ],
              damageIfCorrect: 26, damageIfOptimal: 42,
              damageToHeroIfWrong: 24
            }
          ]
        },
        {
          name: 'Level 5 — Interview-Caliber Judgment',
          hp: 170,
          questions: [
            {
              mode: 'terminal',
              prompt: 'The Golem\'s voice is a low growl: <strong>"Find the 5 largest files anywhere under <code>/var</code>, sorted biggest first, in one pipeline."</strong>',
              damageIfCorrect: 20, damageIfOptimal: 34, timeAllotted: 25,
              hintNudge: 'Chain find (to list files with sizes) into sort (numeric, reverse) into head — three tools, one pipeline.',
              hintPartial: 'find /var -type f -printf "%s %p\\n" | sort -__ | head -5',
              hintFull: 'find /var -type f -printf "%s %p\\n" | sort -rn | head -5',
              acceptablePatterns: [/^du\s+-ah\s+\/var\s*\|\s*sort\s+-rh\s*\|\s*head\s*-5$/i],
              optimalPatterns: [/^find\s+\/var\s+-type\s+f\s+-printf\s+"%s\s+%p\\n"\s*\|\s*sort\s+-rn\s*\|\s*head\s*-5$/i],
              baseCmds: ['find', 'du']
            },
            {
              mode: 'terminal',
              prompt: 'A deep rumble: <strong>"Kill every process matching the name \'worker\', EXCEPT process 4821."</strong>',
              damageIfCorrect: 22, damageIfOptimal: 36, timeAllotted: 25,
              hintNudge: 'pkill can exclude a PID from its own match set with a dedicated flag — no need to hand-build a filtered list yourself.',
              hintPartial: 'pkill -_ 4821 worker',
              hintFull: 'pkill -v -f 4821 worker (or: kill $(pgrep worker | grep -v 4821))',
              acceptablePatterns: [/^kill\s+\$\(pgrep\s+worker\s*\|\s*grep\s+-v\s+4821\)$/i],
              optimalPatterns: [/^pkill\s+worker\s+--?exclude\s*4821$/i, /^kill\s+\$\(pgrep\s+worker\s*\|\s*grep\s+-v\s+4821\)$/i],
              baseCmds: ['pkill', 'pgrep', 'kill']
            },
            {
              mode: 'terminal',
              prompt: 'The Golem\'s core flares: <strong>"Find which process is still holding a deleted file open, keeping its disk space from being freed."</strong>',
              damageIfCorrect: 22, damageIfOptimal: 36, timeAllotted: 25,
              hintNudge: 'lsof lists every open file handle — a deleted-but-still-open file shows up in its output tagged as "(deleted)".',
              hintPartial: 'lsof | grep ______',
              hintFull: 'lsof | grep deleted',
              acceptablePatterns: [],
              optimalPatterns: [/^lsof\s*\|\s*grep\s+deleted$/i],
              baseCmds: ['lsof']
            },
            {
              mode: 'terminal',
              prompt: 'The Golem\'s stone shell hums: <strong>"List every systemd service unit that failed to start on this machine."</strong>',
              damageIfCorrect: 20, damageIfOptimal: 34, timeAllotted: 25,
              hintNudge: 'systemctl has a filter flag that shows only units in a failed state, across the whole system, in one line.',
              hintPartial: 'systemctl --_____',
              hintFull: 'systemctl --failed',
              acceptablePatterns: [],
              optimalPatterns: [/^systemctl\s+--failed$/i],
              baseCmds: ['systemctl']
            },
            {
              mode: 'terminal',
              prompt: 'A final tremor runs through the Golem: <strong>"Show exactly when this machine last booted."</strong>',
              damageIfCorrect: 20, damageIfOptimal: 34, timeAllotted: 25,
              hintNudge: 'uptime has a flag that reports the exact boot timestamp instead of the elapsed-time summary.',
              hintPartial: 'uptime -_',
              hintFull: 'uptime -s',
              acceptablePatterns: [/^who\s+-b$/i, /^last\s+reboot$/i],
              optimalPatterns: [/^uptime\s+-s$/i],
              baseCmds: ['uptime', 'who', 'last']
            },
            {
              mode: 'spot_the_bug',
              prompt: 'The Golem\'s eyes burn: <strong>"This script\'s numeric check works for small numbers but silently misbehaves for large ones. Find and fix the bug."</strong>',
              damageIfCorrect: 24, damageIfOptimal: 40, timeAllotted: 25,
              hintNudge: 'The [ ] test\'s -gt operator does INTEGER arithmetic and can misbehave or error on very large values — bash\'s own arithmetic context handles big numbers correctly.',
              hintPartial: 'Line 1 should use bash\'s (( )) arithmetic evaluation instead of [ -gt ] for large numeric comparisons.',
              hintFull: 'Line 1 should read: if (( DISK_BYTES > 5000000000 )); then',
              codeBlock: [
                'if [ "$DISK_BYTES" -gt 5000000000 ]; then',
                '    echo "Over 5GB"',
                'fi'
              ],
              buggyLineId: 0,
              correctFixPatterns: [/^if\s*\(\(\s*DISK_BYTES\s*>\s*5000000000\s*\)\)\s*;?\s*then$/i]
            },
            {
              mode: 'spot_the_bug',
              prompt: 'A tablet cracks in half: <strong>"This deploy script creates a temp directory but never cleans it up if a later step fails partway through. Find and fix the bug."</strong>',
              damageIfCorrect: 24, damageIfOptimal: 40, timeAllotted: 25,
              hintNudge: 'Without a trap, an early exit (from `set -e`, or any failing command) skips straight past a cleanup line placed at the bottom of the script.',
              hintPartial: 'A trap registered right after mktemp — bound to EXIT — runs the cleanup no matter how or where the script actually exits.',
              hintFull: 'Line 2 should read: trap \'rm -rf "$WORKDIR"\' EXIT',
              codeBlock: [
                'set -e',
                'WORKDIR=$(mktemp -d)',
                'cp -r ./src "$WORKDIR"',
                'run_tests "$WORKDIR"',
                'rm -rf "$WORKDIR"'
              ],
              buggyLineId: 1,
              correctFixPatterns: [/trap\s+.*EXIT/i]
            },
            {
              mode: 'spot_the_bug',
              prompt: 'The Golem\'s voice cracks like stone: <strong>"This cleanup script is meant to wipe a temp directory, but if the variable is ever accidentally unset, it becomes catastrophically dangerous. Find and fix the bug."</strong>',
              damageIfCorrect: 24, damageIfOptimal: 40, timeAllotted: 25,
              hintNudge: 'If $TMPDIR is ever empty, "rm -rf $TMPDIR/*" silently becomes "rm -rf /*" — always guard destructive commands against an empty/unset variable.',
              hintPartial: 'Add a check that $TMPDIR is actually set and non-empty before ever running rm -rf on it — e.g. set -u, or an explicit guard.',
              hintFull: 'Line 1 should read something like: [ -n "$TMPDIR" ] && rm -rf "${TMPDIR:?}"/*  (guards against an empty/unset TMPDIR before the destructive rm ever runs)',
              codeBlock: [
                'rm -rf $TMPDIR/*'
              ],
              buggyLineId: 0,
              correctFixPatterns: [/\$\{TMPDIR:\?\}|-n\s*"\$TMPDIR"|set\s+-u/i]
            },
            {
              mode: 'triage_call',
              prompt: 'The Golem\'s voice shakes the arena: <strong>"Two regions are both reporting errors during a partial outage, and you\'re not sure yet if it\'s one root cause or two. Pick your move, then justify it in one line."</strong>',
              damageIfCorrect: 26, damageIfOptimal: 44, timeAllotted: 25,
              hintNudge: 'One option assumes an answer before checking anything. One option looks for what the two regions actually have in common before deciding.',
              hintPartial: 'Check for a shared dependency (a common upstream service, a shared config push, a shared DNS provider) before deciding whether this is one incident or two.',
              hintFull: 'Best: check for a shared root cause first (common upstream dependency, recent global config/deploy, shared infra) before splitting into two separate investigations — treating it as two unrelated incidents too early can waste time chasing the same bug twice.',
              options: [
                { id: 'a', label: 'Assume they\'re unrelated and assign two separate people to investigate independently', tier: 'wrong', why: 'If it\'s actually one shared root cause (a common upstream dependency, a global config push), this doubles the investigation effort and risks two different, contradictory fixes being applied.' },
                { id: 'b', label: 'Check for a shared root cause (common dependency, recent global change) before splitting the investigation', tier: 'best', why: 'A genuinely efficient incident response checks for the simplest unifying explanation first — most "two region" outages that start at the same time DO share one cause.' },
                { id: 'c', label: 'Failover both regions immediately without investigating first', tier: 'wrong', why: 'A blunt, expensive action taken before understanding the actual cause — if the cause is shared (e.g. a bad global deploy), failing over doesn\'t fix anything and adds complexity mid-incident.' }
              ],
              justificationPatterns: [/shared|common\s*(cause|dependency)|same\s*root\s*cause|before\s*splitting|unify/i]
            },
            {
              mode: 'triage_call',
              prompt: 'A slab shudders violently: <strong>"A deploy is causing errors for exactly 5% of users — the same 5% every time, not random. Pick your move, then justify it in one line."</strong>',
              damageIfCorrect: 26, damageIfOptimal: 44, timeAllotted: 25,
              hintNudge: 'A consistent, non-random 5% strongly suggests a SEGMENT of users (one region, one feature flag cohort, one canary group) is affected — not the whole deploy being broken.',
              hintPartial: 'Figure out what those specific 5% of users have in common (region, canary cohort, browser, account age) — a consistent subset points at a segment-specific bug, which changes the fix.',
              hintFull: 'Best: identify what the affected 5% have in common first — if it maps to a canary/feature-flag group, the fix might just be disabling that flag rather than a full rollback; if it\'s truly random noise unrelated to any segment, that changes the story entirely.',
              options: [
                { id: 'a', label: 'Immediately roll back the entire deploy for all 100% of users', tier: 'defensible', why: 'Safe and fixes the 5% for sure, but if this was a canary/feature-flagged rollout, a full rollback throws away the 95% of the deploy that\'s working fine when a much smaller, targeted fix might exist.' },
                { id: 'b', label: 'Identify what the affected 5% have in common (region, cohort, flag) before deciding the fix', tier: 'best', why: 'A CONSISTENT 5% (not random) is a strong signal this is segment-specific, not deploy-wide — understanding the segment often reveals a much smaller, faster fix than a full rollback.' },
                { id: 'c', label: 'Ignore it since 95% of users are unaffected', tier: 'wrong', why: '5% of real users hitting errors is still a real incident — "most people are fine" is never a reason to ignore a consistent, reproducible failure for a subset.' }
              ],
              justificationPatterns: [/segment|cohort|canary|common|consistent|what.*have\s*in\s*common|feature\s*flag/i]
            },
            {
              mode: 'triage_call',
              prompt: 'The Golem grinds with menace: <strong>"A critical security patch requires a reboot, and it\'s the middle of business hours. Pick your move, then justify it in one line."</strong>',
              damageIfCorrect: 26, damageIfOptimal: 44, timeAllotted: 25,
              hintNudge: 'The right call depends entirely on HOW critical/actively-exploited the vulnerability actually is — that\'s the one fact you need before deciding, not a fixed rule either way.',
              hintPartial: 'Check the actual severity/exploitability of the vulnerability first — an actively-exploited critical flaw changes the calculus completely versus a theoretical, low-severity one.',
              hintFull: 'Best: assess actual severity/exploitability first — if it\'s actively being exploited in the wild, patch now despite business hours (with a heads-up to stakeholders); if it\'s a lower-urgency issue, schedule the reboot for a maintenance window instead.',
              options: [
                { id: 'a', label: 'Always wait for the scheduled maintenance window, no matter the severity', tier: 'wrong', why: 'Treats every patch identically regardless of real risk — an actively-exploited critical vulnerability left open for hours or days because of a fixed schedule is a real, avoidable exposure.' },
                { id: 'b', label: 'Check the actual severity/exploitability first, then decide: patch now (with a heads-up) if it\'s actively exploited, schedule it if not', tier: 'best', why: 'The right call genuinely depends on real risk, not a blanket rule — this is exactly the judgment real incident response requires: match the urgency of the action to the urgency of the actual threat.' },
                { id: 'c', label: 'Always patch immediately regardless of severity, since it\'s labeled "critical"', tier: 'defensible', why: 'Erring toward safety is reasonable, but "critical" as a label alone doesn\'t always mean "actively exploited right now" — a middle-of-the-day outage for a patch that could safely wait 4 hours has its own real cost.' }
              ],
              justificationPatterns: [/severity|exploitability|actively\s*exploited|assess|risk\s*first|depends/i]
            },
            {
              mode: 'triage_call',
              prompt: 'A slab cracks under pressure: <strong>"You\'re mid-incident and a teammate asks for emergency production access to help. Pick your move, then justify it in one line."</strong>',
              damageIfCorrect: 26, damageIfOptimal: 44, timeAllotted: 25,
              hintNudge: 'Neither a flat "no" (loses real help during an active incident) nor a completely unchecked "yes" (real access-control risk) is the actual right answer here.',
              hintPartial: 'Grant scoped, time-limited, logged access appropriate to what they\'re actually helping with — not broad standing access, and not a blanket refusal either.',
              hintFull: 'Best: grant scoped, temporary, logged access matched to what they\'re actually helping with (e.g. read-only on the affected service, or a time-boxed elevated role) — real incident response needs real help fast, but "emergency" isn\'t a reason to skip access control entirely.',
              options: [
                { id: 'a', label: 'Refuse — production access always requires the normal multi-day approval process', tier: 'wrong', why: 'During an active incident, rigidly enforcing the normal slow process over getting genuinely useful help fast can make the incident worse, not safer.' },
                { id: 'b', label: 'Grant scoped, temporary, logged access matched to what they\'re actually helping with', tier: 'best', why: 'Balances real urgency against real risk — gets a capable teammate helping immediately, without handing out broad, unaudited standing access "just for now" that tends to never get revoked.' },
                { id: 'c', label: 'Just share your own login credentials with them temporarily', tier: 'wrong', why: 'Destroys any audit trail of who did what during the incident, and is a real security anti-pattern regardless of how urgent things feel in the moment.' }
              ],
              justificationPatterns: [/scoped|temporary|time.?boxed|logged|limited\s*access|matched\s*to/i]
            },
            {
              mode: 'triage_call',
              prompt: 'The Golem roars: <strong>"You have a real workaround available now, and a proper fix that\'s 2 days out, with an SLA breach in 3 hours. Pick your move, then justify it in one line."</strong>',
              damageIfCorrect: 26, damageIfOptimal: 44, timeAllotted: 25,
              hintNudge: 'The workaround meets the actual deadline. The question is whether ship-now-fix-later is being done honestly, with the follow-up actually tracked, or quietly forgotten.',
              hintPartial: 'Ship the workaround to meet the SLA, but explicitly track/ticket the proper fix so "temporary" doesn\'t silently become permanent.',
              hintFull: 'Best: deploy the workaround now to meet the real deadline, while explicitly creating and tracking a ticket for the proper 2-day fix — the risk with workarounds isn\'t using them, it\'s using them silently and never following up.',
              options: [
                { id: 'a', label: 'Skip the workaround and wait for the proper fix, accepting the SLA breach', tier: 'wrong', why: 'Accepts a real, avoidable consequence (the SLA breach) when a working alternative exists right now — the proper fix being "better" doesn\'t matter if the deadline is real and unmovable.' },
                { id: 'b', label: 'Deploy the workaround now to meet the SLA, and explicitly track the proper fix so it doesn\'t get forgotten', tier: 'best', why: 'Meets the real, immediate deadline while being honest that the fix is temporary — the explicit tracking is what separates a real solution from "temporary" quietly becoming permanent.' },
                { id: 'c', label: 'Deploy the workaround and consider the issue closed', tier: 'defensible', why: 'Meets today\'s deadline, but without tracking the real fix, "temporary" workarounds have a well-known habit of becoming permanent, unmonitored technical debt.' }
              ],
              justificationPatterns: [/track|ticket|follow.?up|explicitly|meet\s*(the\s*)?sla|temporary/i]
            },
            {
              mode: 'triage_call',
              prompt: 'The Golem\'s presence darkens: <strong>"An alert fires but the dashboards look completely normal. Pick your move, then justify it in one line."</strong>',
              damageIfCorrect: 26, damageIfOptimal: 44, timeAllotted: 25,
              hintNudge: 'Neither blindly trusting the alert (and paging everyone for possible noise) nor blindly dismissing it (and possibly missing a real, dashboard-invisible issue) is the right instinct alone.',
              hintPartial: 'Do a quick, targeted check specifically for whatever the alert claims is wrong before deciding it\'s noise OR escalating it — a few minutes of verification either confirms real impact or reveals it\'s a false positive.',
              hintFull: 'Best: spend a few minutes doing a targeted check of the SPECIFIC thing the alert claims (not just "eyeball the dashboards") before deciding — some real issues genuinely don\'t show up on general dashboards (a specific edge case, a rare error path), so "dashboards look fine" alone isn\'t proof of nothing wrong.',
              options: [
                { id: 'a', label: 'Immediately page the whole on-call team since an alert fired', tier: 'wrong', why: 'Pages the team before any verification at all — if this turns out to be alert noise (a known false-positive pattern), it burns trust and costs real time for no reason.' },
                { id: 'b', label: 'Do a quick, targeted check of exactly what the alert claims before deciding to escalate or dismiss it', tier: 'best', why: 'A few minutes of specific verification is the right middle ground — it catches real issues dashboards might miss, while avoiding paging the whole team over pure noise.' },
                { id: 'c', label: 'Dismiss it as noise since the dashboards look fine', tier: 'wrong', why: 'General dashboards don\'t catch every real problem — a specific edge case or rare error path can be genuinely broken while overall metrics look normal.' }
              ],
              justificationPatterns: [/quick\s*check|verify|targeted|specific|before\s*(escalating|dismissing)/i]
            },
            {
              mode: 'triage_call',
              prompt: 'A final crack splits the arena: <strong>"You need to choose between a blue-green rollback and a canary rollback, under real time pressure. Pick your move, then justify it in one line."</strong>',
              damageIfCorrect: 26, damageIfOptimal: 44, timeAllotted: 25,
              hintNudge: 'One strategy flips traffic back to a full known-good environment in one shot. The other only pulls back a small, gradually-increasing slice — much slower to fully resolve widespread impact.',
              hintPartial: 'Blue-green gives an instant, complete flip back to the last known-good environment — exactly what widespread, urgent impact calls for.',
              hintFull: 'Best: if it\'s available and impact is widespread/urgent, blue-green\'s instant full-environment flip resolves it fastest — canary rollback is better suited to gradually validating a fix, not for stopping a fire that\'s already spreading everywhere right now.',
              options: [
                { id: 'a', label: 'Canary rollback — gradually reduce traffic to the bad version', tier: 'wrong', why: 'Designed for gradually validating a change, not for urgently stopping WIDESPREAD impact — it resolves the problem slowly, exactly when speed matters most.' },
                { id: 'b', label: 'Blue-green rollback — flip all traffic back to the last known-good environment immediately', tier: 'best', why: 'An instant, complete flip back to a fully known-good state is the fastest way to stop widespread impact under real time pressure — that\'s exactly the scenario blue-green is built for.' },
                { id: 'c', label: 'Do neither — patch forward with a hotfix instead', tier: 'defensible', why: 'Can be right if the fix is truly trivial and fast, but under genuine time pressure with unknown fix complexity, a proven rollback path is the safer, faster default.' }
              ],
              justificationPatterns: [/blue.?green|instant|full\s*flip|known.?good|fastest|widespread/i]
            },
            {
              mode: 'read_the_room',
              prompt: 'The Golem\'s core roars with fire. <strong>An app is throwing intermittent 500s, and the database looks fine, but connections to it are failing under load. Diagnose it, then fix it.</strong>',
              damageIfCorrect: 28, damageIfOptimal: 48, timeAllotted: 25,
              hintNudge: 'Check the app\'s own connection pool stats, not just the database itself — a pool that\'s fully checked out has nothing left to hand new requests, even if the DB is healthy.',
              hintPartial: 'The connection pool is maxed out (all connections in use, requests queueing) — new requests time out waiting for a free connection even though the database itself is fine.',
              hintFull: 'Diagnosis: the application\'s DB connection pool is exhausted under load (likely leaking connections or sized too small), not a database problem. Fix: identify and close leaked/idle connections, and/or increase the pool size to match real concurrency.',
              outputBlock: [
                '$ curl -w "%{http_code}" https://api.internal/health',
                '500',
                '',
                '$ app-metrics --pool-stats',
                'db_pool: active=50/50 idle=0 waiting=214',
                '',
                '$ pg_isready -h dbhost',
                'dbhost:5432 - accepting connections'
              ],
              acceptableDiagnosesPatterns: [/pool\s*(exhaust|full|maxed)/i, /connection\s*pool/i, /no\s*(free|available)\s*connections/i],
              followUpFix: {
                prompt: 'Find and identify leaked/idle connections holding the pool at capacity:',
                acceptablePatterns: [],
                optimalPatterns: [/select.*pg_stat_activity/i, /^app-metrics\s+--pool-stats\s+--idle$/i]
              }
            },
            {
              mode: 'read_the_room',
              prompt: 'Cracks race across the Golem\'s entire body. <strong>A service occasionally fails to start with "address already in use," but only sometimes, on the same port it always uses. Diagnose it, then fix it.</strong>',
              damageIfCorrect: 28, damageIfOptimal: 48, timeAllotted: 25,
              hintNudge: 'Check whether the PREVIOUS instance of this exact service is still lingering (perhaps still shutting down, or stuck) when the new one tries to start on the same port.',
              hintPartial: 'ss shows the old process still bound to the port in a lingering state right as the new one tries to start — a race between shutdown and restart, not a genuinely different process stealing the port.',
              hintFull: 'Diagnosis: a race between the old instance shutting down and the new instance starting — the port is still briefly held by the outgoing process. Fix: add a short wait/retry-with-backoff in the restart logic (or SO_REUSEADDR if appropriate) so the new instance doesn\'t race the old one\'s shutdown.',
              outputBlock: [
                '$ systemctl restart myapp',
                'Job for myapp.service failed: bind: address already in use',
                '',
                '$ ss -tlnp | grep 8080',
                'LISTEN  0  128  *:8080  users:(("myapp",pid=9012,fd=6))',
                '',
                '$ ps -p 9012 -o stat,etimes',
                'STAT  ELAPSED',
                'S    2'
              ],
              acceptableDiagnosesPatterns: [/race\s*condition/i, /old\s*(instance|process).*(shutting\s*down|still\s*(bound|running))/i, /restart\s*race/i],
              followUpFix: {
                prompt: 'Fix the restart logic to avoid racing the old instance\'s shutdown:',
                acceptablePatterns: [],
                optimalPatterns: [/sleep|retry|backoff|wait/i]
              }
            },
            {
              mode: 'read_the_room',
              prompt: 'The Golem\'s roar shakes stone dust loose. <strong>A service that ran fine for weeks suddenly starts OOM-killing every few days, slowly getting worse. Diagnose it, then fix it.</strong>',
              damageIfCorrect: 28, damageIfOptimal: 48, timeAllotted: 25,
              hintNudge: 'A slow, steady climb in memory usage over days (not a sudden spike) that never comes back down on its own is the classic signature of a leak, not a traffic spike.',
              hintPartial: 'The memory graph shows a steady sawtooth climb — rising for days, dropping only when the process is OOM-killed and restarts — that pattern is a memory leak, not organic load growth.',
              hintFull: 'Diagnosis: a slow memory leak in the application, not real traffic growth (the climb is steady and independent of load). Fix: as an immediate mitigation, schedule periodic restarts to keep memory bounded, while the actual leak gets identified and patched in the code.',
              outputBlock: [
                '$ free -h (checked daily over a week)',
                'Day 1: used 1.2G   Day 4: used 4.8G   Day 6: used 7.4G  -> OOM killed, restarted, used 1.1G',
                '',
                '$ traffic graph shows flat, steady request volume the entire week'
              ],
              acceptableDiagnosesPatterns: [/memory\s*leak/i, /leak/i, /gradual(ly)?\s*(climb|increas|grow)/i],
              followUpFix: {
                prompt: 'Apply an immediate mitigation while the real leak gets fixed in code:',
                acceptablePatterns: [],
                optimalPatterns: [/scheduled?\s*restart|periodic\s*restart|cron.*restart/i]
              }
            },
            {
              mode: 'read_the_room',
              prompt: 'The Golem\'s stone groans under its own weight. <strong>Auth tokens across the fleet started failing validation all at once, with no deploy and no code change. Diagnose it, then fix it.</strong>',
              damageIfCorrect: 28, damageIfOptimal: 48, timeAllotted: 25,
              hintNudge: 'Token validation is often time-sensitive (expiry windows, signed timestamps) — check whether the SERVER\'s own clock has actually drifted from real time.',
              hintPartial: 'timedatectl shows the system clock several minutes off from real time — time-based token validation (checking expiry/issued-at) starts rejecting otherwise-valid tokens once the clock drifts enough.',
              hintFull: 'Diagnosis: system clock drift (NTP sync stopped working) is breaking time-sensitive token validation. Fix: force an immediate time sync and confirm NTP is actively running so it doesn\'t drift again.',
              outputBlock: [
                '$ timedatectl',
                '               Local time: Mon 2026-09-14 14:32:07',
                '           NTP service: inactive',
                'System clock synchronized: no',
                '',
                '(real time is actually 14:38:52 — over 6 minutes ahead)'
              ],
              acceptableDiagnosesPatterns: [/clock\s*drift/i, /ntp/i, /time\s*(sync|synchroniz)/i, /system\s*clock/i],
              followUpFix: {
                prompt: 'Force an immediate sync and make sure it stays synced:',
                acceptablePatterns: [/^sudo\s+ntpdate\s+/i],
                optimalPatterns: [/^sudo\s+timedatectl\s+set-ntp\s+true$/i, /^sudo\s+systemctl\s+(start|enable)\s+(chrony|ntpd|systemd-timesyncd)$/i]
              }
            },
            {
              mode: 'read_the_room',
              prompt: 'The Golem\'s final crack splits wide, glowing white-hot. <strong>Disk usage climbed to 100% overnight with no obvious new files or growing logs anywhere. Diagnose it, then fix it.</strong>',
              damageIfCorrect: 28, damageIfOptimal: 48, timeAllotted: 25,
              hintNudge: 'A file that\'s been DELETED can still hold its disk space if some process still has it open — `du` won\'t see it, but the filesystem\'s actual free-space count won\'t recover either.',
              hintPartial: 'lsof shows a huge "(deleted)" file still held open by a running process — the space was never actually freed even though no directory listing shows the file anymore.',
              hintFull: 'Diagnosis: a large file was deleted while a process still had it open, so the disk space was never actually reclaimed (invisible to du/ls, but still consuming real space). Fix: restart the process holding it open (releasing the space), or use its file descriptor to truncate it directly if a restart isn\'t immediately possible.',
              outputBlock: [
                '$ df -h /',
                'Filesystem  Size  Used Avail Use% Mounted on',
                '/dev/sda1    50G   50G     0 100% /',
                '',
                '$ du -sh /* | sort -rh | head -5',
                '(nothing adds up anywhere close to 50G)',
                '',
                '$ lsof | grep deleted',
                'app      4821  app   12w   REG   8,1  38G  /var/log/app.log (deleted)'
              ],
              acceptableDiagnosesPatterns: [/deleted.*(still\s*open|held\s*open)/i, /space\s*never\s*(freed|reclaimed)/i, /open\s*file\s*handle/i],
              followUpFix: {
                prompt: 'Reclaim the space (restart the process, or truncate via its file descriptor):',
                acceptablePatterns: [/^(sudo\s+)?systemctl\s+restart\s+app$/i],
                optimalPatterns: [/^:\s*>\s*\/proc\/4821\/fd\/12$/i, /truncate.*\/proc\/4821\/fd\/12/i]
              }
            },
            {
              mode: 'read_the_room',
              prompt: 'The Golem\'s cracked shell trembles. <strong>A load balancer is marking every backend as unhealthy, but each backend is fine when checked directly. Diagnose it, then fix it.</strong>',
              damageIfCorrect: 28, damageIfOptimal: 48, timeAllotted: 25,
              hintNudge: 'The backends being genuinely healthy but failing the load balancer\'s OWN check points at the health-check configuration itself, not the backends.',
              hintPartial: 'The health check hits a path that no longer exists (a 404), while the app\'s real endpoints work fine — the check is misconfigured, not the service.',
              hintFull: 'Diagnosis: the load balancer\'s health-check path/timeout is misconfigured (checking a stale or wrong endpoint), not an actual backend problem. Fix: correct the health-check path/timeout in the load balancer config to match a real, fast-responding endpoint.',
              outputBlock: [
                '$ curl https://backend1:8080/api/status',
                '{"status":"ok"}',
                '',
                '$ curl https://backend1:8080/health',
                '404 Not Found',
                '',
                '(load balancer config): health_check_path: /health'
              ],
              acceptableDiagnosesPatterns: [/health\s*check.*(misconfigur|wrong|broken|bad)/i, /wrong\s*(health.?check\s*)?(path|endpoint)/i],
              followUpFix: {
                prompt: 'Fix the load balancer\'s health-check path to point at a real, working endpoint:',
                acceptablePatterns: [],
                optimalPatterns: [/health_check_path.*\/api\/status/i, /\/api\/status/i]
              }
            },
            {
              mode: 'read_the_room',
              prompt: 'The Golem\'s crumbling form flickers. <strong>Every server in a cluster suddenly loses access to a shared network filesystem mount, all at the same moment. Diagnose it, then fix it.</strong>',
              damageIfCorrect: 28, damageIfOptimal: 48, timeAllotted: 25,
              hintNudge: 'Every client failing identically, at the same instant, points at the shared server side of the mount, not any individual client.',
              hintPartial: 'The NFS server itself isn\'t responding to any client — this rules out a per-machine problem and points squarely at the shared server or the network path to it.',
              hintFull: 'Diagnosis: the shared NFS server itself is down or unreachable (not a per-client issue, since every client failed at once). Fix: check the NFS server\'s status/network path directly and restart the NFS service (or resolve the network issue) on the server side.',
              outputBlock: [
                '$ df -h /mnt/shared',
                'df: /mnt/shared: Stale file handle',
                '',
                '(same error on every single client, at the same timestamp)',
                '',
                '$ ping nfs-server.internal',
                'Request timeout'
              ],
              acceptableDiagnosesPatterns: [/nfs\s*server.*(down|unreachable)/i, /server.?side/i, /shared\s*server/i],
              followUpFix: {
                prompt: 'Check and fix it on the NFS server side (its service, not any client):',
                acceptablePatterns: [],
                optimalPatterns: [/systemctl\s+(restart|status)\s+nfs/i]
              }
            },
            {
              mode: 'read_the_room',
              prompt: 'The Golem\'s final ember flickers out. <strong>A script that has run daily for months suddenly fails right after an OS package update, with a locale-related error. Diagnose it, then fix it.</strong>',
              damageIfCorrect: 28, damageIfOptimal: 48, timeAllotted: 25,
              hintNudge: 'The OS update likely changed which locales are actually installed/available — check whether the specific locale the script expects still exists on this system.',
              hintPartial: 'locale -a no longer lists en_US.UTF-8 — the update removed or changed the available locales, and the script hardcodes a dependency on that exact one.',
              hintFull: 'Diagnosis: the required locale (en_US.UTF-8) is no longer installed/generated after the OS update. Fix: regenerate/install that locale so the script\'s expected environment is restored.',
              outputBlock: [
                '$ ./process.sh',
                'perl: warning: Setting locale failed.',
                'locale: Cannot set LC_ALL to default locale: No such file or directory',
                '',
                '$ locale -a',
                'C',
                'C.UTF-8',
                'POSIX'
              ],
              acceptableDiagnosesPatterns: [/locale.*(missing|not\s*installed|removed)/i, /locale/i],
              followUpFix: {
                prompt: 'Regenerate the missing locale so the script\'s expected environment is restored:',
                acceptablePatterns: [],
                optimalPatterns: [/locale-gen\s+en_US\.UTF-8/i, /update-locale/i]
              }
            },
            {
              mode: 'build_the_pipeline',
              prompt: 'The Golem draws every fragment of itself together. <strong>Sequence the correct order for handling a production incident, start to finish.</strong>',
              steps: [
                'Acknowledge the alert and assess severity',
                'Stabilize/mitigate to stop user impact (rollback, failover, or workaround)',
                'Communicate status to stakeholders',
                'Investigate and confirm the root cause',
                'Write the postmortem and follow-up action items'
              ],
              damageIfCorrect: 28, damageIfOptimal: 46,
              damageToHeroIfWrong: 26
            },
            {
              mode: 'build_the_pipeline',
              prompt: 'The core cracks a final time before the Golem falls still. <strong>Sequence the correct order for rolling out a security patch across an entire server fleet safely.</strong>',
              steps: [
                'Test the patch on a single non-production server',
                'Roll it out to a small canary batch of production servers',
                'Monitor the canary batch for issues',
                'Roll out to the remaining fleet in waves',
                'Confirm the vulnerability is closed fleet-wide'
              ],
              damageIfCorrect: 28, damageIfOptimal: 46,
              damageToHeroIfWrong: 26
            }
          ]
        }
      ]
    };
