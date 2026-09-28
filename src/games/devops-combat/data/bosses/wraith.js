// Boss "wraith": metadata plus its full question bank (data only).

    /* ================================================================
       BOSS 9 — THE SCRIPT WRAITH (Bash / Python)
       ================================================================ */
    export var wraith = {
      id: 'wraith',
      name: 'The Script Wraith',
      topic: 'Scripting',
      icon: '📜',
      chibiKind: 'wraith',
      phaseHp: [115, 125, 145],
      phaseNames: ['Whisper — Scripting Fundamentals', 'Fray — Broken Automation', 'Echo — Real Incident'],
      xpReward: 158,
      coinBaseReward: 94,
      phases: [
        /* -------- PHASE 1: Scripting Fundamentals -------- */
        [
          {
            mode: 'terminal',
            prompt: 'The Wraith flickers between lines of code: <strong>"Loop through every .txt file in this directory and print each name."</strong>',
            damageIfCorrect: 16, damageIfOptimal: 26,
            hintNudge: 'A classic bash for-loop over a glob pattern.',
            hintPartial: 'for f in *.txt; do e___ $f; done',
            hintFull: 'for f in *.txt; do echo $f; done',
            acceptablePatterns: [/^for\s+f\s+in\s+\*\.txt;\s*do\s+echo\s+"?\$f"?;\s*done$/i],
            optimalPatterns: [/^for\s+f\s+in\s+\*\.txt;\s*do\s+echo\s+\$f;\s*done$/i],
            baseCmds: ['for']
          },
          {
            mode: 'terminal',
            prompt: 'Text scrambles and reforms: <strong>"Store the output of <code>whoami</code> in a variable called <code>USER_NAME</code>."</strong>',
            damageIfCorrect: 14, damageIfOptimal: 22,
            hintNudge: 'Command substitution — capture a command\'s output into a variable.',
            hintPartial: 'USER_NAME=$(w_____)',
            hintFull: 'USER_NAME=$(whoami)',
            acceptablePatterns: [/^USER_NAME=`whoami`$/i],
            optimalPatterns: [/^USER_NAME=\$\(whoami\)$/i],
            baseCmds: ['USER_NAME']
          },
          {
            mode: 'terminal',
            prompt: 'A glyph flickers: <strong>"In one line, check if <code>deploy.lock</code> exists and print \'exists\' if it does."</strong>',
            damageIfCorrect: 16, damageIfOptimal: 26,
            hintNudge: 'A bash test for file existence, then && to chain the echo.',
            hintPartial: '[ -f deploy.lock ] && e___ exists',
            hintFull: '[ -f deploy.lock ] && echo exists',
            acceptablePatterns: [/^if\s*\[\s*-f\s+deploy\.lock\s*\];\s*then\s+echo\s+exists;\s*fi$/i],
            optimalPatterns: [/^\[\s*-f\s+deploy\.lock\s*\]\s*&&\s*echo\s+exists$/i],
            baseCmds: ['[']
          },
          {
            mode: 'terminal',
            prompt: 'The air hums: <strong>"Run <code>df -h</code> repeatedly, every 5 seconds."</strong>',
            damageIfCorrect: 14, damageIfOptimal: 22,
            hintNudge: 'A tool built exactly for "run this repeatedly."',
            hintPartial: 'watch -n _ df -h',
            hintFull: 'watch -n 5 df -h',
            acceptablePatterns: [/^while\s+true;\s*do\s+df\s+-h;\s*sleep\s+5;\s*done$/i],
            optimalPatterns: [/^watch\s+-n\s+5\s+df\s+-h$/i],
            baseCmds: ['watch', 'while']
          },
          {
            mode: 'terminal',
            prompt: 'A whisper curls through the dark: <strong>"Write a crontab line to run <code>/path/to/script.sh</code> every day at 2 AM."</strong>',
            damageIfCorrect: 16, damageIfOptimal: 26,
            hintNudge: 'Five time fields, then the command — minute, hour, day, month, weekday.',
            hintPartial: '0 2 * * * /path/to/___',
            hintFull: '0 2 * * * /path/to/script.sh',
            acceptablePatterns: [/^0\s+2\s+\*\s+\*\s+\*\s+bash\s+\/path\/to\/script\.sh$/i],
            optimalPatterns: [/^0\s+2\s+\*\s+\*\s+\*\s+\/path\/to\/script\.sh$/i],
            baseCmds: ['0']
          }
        ],
        /* -------- PHASE 2: Broken Automation -------- */
        [
          {
            mode: 'spot_the_bug',
            prompt: 'A whisper reveals a broken script. <strong>Click the buggy line, then type the fix.</strong>',
            damageIfCorrect: 24, damageIfOptimal: 38,
            hintNudge: 'If NAME is ever empty or contains a space, this comparison breaks unpredictably.',
            hintPartial: 'Quote the variable so it\'s always treated as one safe value.',
            hintFull: 'Fix: if [ "$NAME" == "test" ]',
            codeBlock: [
              '#!/bin/bash',
              'NAME=$1',
              'if [ $NAME == "test" ]',
              '  then echo "matched"',
              'fi'
            ],
            buggyLineId: 2,
            correctFixPatterns: [/^if\s*\[\s*"\$NAME"\s*==\s*"test"\s*\]$/i]
          },
          {
            mode: 'spot_the_bug',
            prompt: 'Another whisper, another script. <strong>Click the buggy line, then type the fix.</strong>',
            damageIfCorrect: 24, damageIfOptimal: 38,
            hintNudge: 'Without this special first line, the system doesn\'t know which interpreter should run the script.',
            hintPartial: 'The very first line should declare the shell to use, not just be a comment.',
            hintFull: 'Fix: #!/bin/bash',
            codeBlock: [
              '# my deploy script',
              'echo "Deploying..."',
              'cp app.tar.gz /srv/app/'
            ],
            buggyLineId: 0,
            correctFixPatterns: [/^#!\/bin\/bash$/i, /^#!\/usr\/bin\/env\s+bash$/i]
          },
          {
            mode: 'spot_the_bug',
            prompt: 'A fraying thread of code. <strong>Click the buggy line, then type the fix.</strong>',
            damageIfCorrect: 24, damageIfOptimal: 38,
            hintNudge: 'If this copy silently fails, the script just carries on as if everything were fine.',
            hintPartial: 'Make a failed copy stop the script instead of continuing silently.',
            hintFull: 'Fix: cp important.txt backup/ || exit 1',
            codeBlock: [
              '#!/bin/bash',
              'cp important.txt backup/',
              'echo "Backup complete"'
            ],
            buggyLineId: 1,
            correctFixPatterns: [/^cp\s+important\.txt\s+backup\/\s*\|\|\s*exit\s+1$/i]
          },
          {
            mode: 'spot_the_bug',
            prompt: 'A twisting, looping fragment. <strong>Click the buggy line, then type the fix.</strong>',
            damageIfCorrect: 24, damageIfOptimal: 38,
            hintNudge: 'The < here compares as text, not as a number — this loop never actually ends the way you\'d expect.',
            hintPartial: 'Use the proper numeric-comparison test operator.',
            hintFull: 'Fix: while [ $count -lt 10 ]',
            codeBlock: [
              '#!/bin/bash',
              'count=0',
              'while [ $count < 10 ]',
              'do',
              '  count=$((count+1))',
              'done'
            ],
            buggyLineId: 2,
            correctFixPatterns: [/^while\s*\[\s*\$count\s+-lt\s+10\s*\]$/i]
          },
          {
            mode: 'spot_the_bug',
            prompt: 'The last whisper before the echo. <strong>Click the buggy line, then type the fix.</strong>',
            damageIfCorrect: 24, damageIfOptimal: 38,
            hintNudge: 'This only works if the script happens to be run from one specific directory.',
            hintPartial: 'Use the absolute path so it works no matter where it\'s run from.',
            hintFull: 'Fix: cd /var/app/logs && rm *.log',
            codeBlock: [
              '#!/bin/bash',
              '# cron job — cleans old logs',
              'cd logs && rm *.log'
            ],
            buggyLineId: 2,
            correctFixPatterns: [/^cd\s+\/var\/app\/logs\s*&&\s*rm\s+\*\.log$/i]
          }
        ],
        /* -------- PHASE 3: Real Incident — Failure Loop -------- */
        [
          {
            mode: 'read_the_room',
            prompt: 'The Echo chamber replays a failure, again and again. <strong>Diagnose it, then fix it.</strong>',
            damageIfCorrect: 22, damageIfOptimal: 36,
            hintNudge: 'Read the command name very literally, letter by letter.',
            hintPartial: 'It\'s misspelled — that\'s the whole problem.',
            hintFull: 'Diagnosis: a typo in the command name. Fix: run the correctly-spelled command, e.g. python3 script.py',
            outputBlock: [
              '$ pyhton script.py',
              'bash: pyhton: command not found'
            ],
            acceptableDiagnosesPatterns: [/typo/i, /misspell/i, /command\s*not\s*found/i],
            followUpFix: {
              prompt: 'Run it correctly this time:',
              acceptablePatterns: [/^python\s+script\.py$/i],
              optimalPatterns: [/^python3\s+script\.py$/i]
            }
          },
          {
            mode: 'read_the_room',
            prompt: 'The echo sharpens. <strong>Diagnose it, then fix it.</strong>',
            damageIfCorrect: 22, damageIfOptimal: 36,
            hintNudge: 'The OS is refusing to run this file at all — that\'s a permissions issue, not a code bug.',
            hintPartial: 'The script simply isn\'t marked as executable yet.',
            hintFull: 'Diagnosis: the script isn\'t executable. Fix: chmod +x deploy.sh',
            outputBlock: [
              '$ ./deploy.sh',
              'bash: ./deploy.sh: Permission denied'
            ],
            acceptableDiagnosesPatterns: [/not\s*executable/i, /permission/i, /missing\s*execute/i],
            followUpFix: {
              prompt: 'Give it execute permission:',
              acceptablePatterns: [/^chmod\s+755\s+deploy\.sh$/i],
              optimalPatterns: [/^chmod\s+\+x\s+deploy\.sh$/i]
            }
          },
          {
            mode: 'read_the_room',
            prompt: 'The chamber crackles with static. <strong>Diagnose it, then fix it.</strong>',
            damageIfCorrect: 22, damageIfOptimal: 36,
            hintNudge: 'Bash is telling you it hit something it didn\'t expect while parsing the file.',
            hintPartial: 'Somewhere in the script a bracket or quote isn\'t properly closed.',
            hintFull: 'Diagnosis: a bash syntax error — an unmatched bracket or quote somewhere in the script. Fix (first step): syntax-check without running it, e.g. bash -n script.sh',
            outputBlock: [
              '$ ./script.sh',
              './script.sh: line 12: syntax error near unexpected token `fi\''
            ],
            acceptableDiagnosesPatterns: [/syntax\s*error/i, /unmatched\s*(bracket|quote|token)/i],
            followUpFix: {
              prompt: 'Check the script\'s syntax without actually running it:',
              acceptablePatterns: [/^sh\s+-n\s+script\.sh$/i],
              optimalPatterns: [/^bash\s+-n\s+script\.sh$/i]
            }
          },
          {
            mode: 'read_the_room',
            prompt: 'A hollow echo — it worked by hand, but never on schedule. <strong>Diagnose it, then fix it.</strong>',
            damageIfCorrect: 22, damageIfOptimal: 36,
            hintNudge: 'Cron runs with a much smaller environment than your interactive shell has.',
            hintPartial: 'A command the script relies on isn\'t on cron\'s minimal PATH.',
            hintFull: 'Diagnosis: cron\'s environment lacks the PATH/env vars your interactive shell has. Fix: set it explicitly in the script, e.g. export PATH=/usr/local/bin:$PATH',
            outputBlock: [
              '$ crontab -l',
              '0 2 * * * /home/dev/backup.sh',
              '(runs fine manually, but cron\'s log shows: "aws: command not found")'
            ],
            acceptableDiagnosesPatterns: [/(cron\s*)?(environment|path).*(missing|different|minimal)/i, /not\s*(in|on)\s*(cron'?s\s*)?path/i],
            followUpFix: {
              prompt: 'Set the PATH explicitly so cron can find the same tools:',
              acceptablePatterns: [/^PATH=\/usr\/local\/bin:\$PATH$/i],
              optimalPatterns: [/^export\s+PATH=\/usr\/local\/bin:\$PATH$/i]
            }
          },
          {
            mode: 'read_the_room',
            prompt: 'The final echo fades into silence. <strong>Diagnose it, then fix it.</strong>',
            damageIfCorrect: 22, damageIfOptimal: 36,
            hintNudge: 'Python is telling you exactly which package it can\'t find.',
            hintPartial: 'The "requests" library was never installed in this environment.',
            hintFull: 'Diagnosis: a required Python package isn\'t installed. Fix: pip install requests',
            outputBlock: [
              '$ python3 script.py',
              'ModuleNotFoundError: No module named \'requests\''
            ],
            acceptableDiagnosesPatterns: [/(module|package).*(not\s*installed|missing)/i, /modulenotfounderror/i],
            followUpFix: {
              prompt: 'Install the missing package:',
              acceptablePatterns: [/^pip3\s+install\s+requests$/i],
              optimalPatterns: [/^pip\s+install\s+requests$/i]
            }
          }
        ]
      ],
      specialAttack: {
        mode: 'build_the_pipeline',
        prompt: 'The Wraith unravels into pure code! <strong>Sequence the correct automation workflow before it re-forms.</strong>',
        steps: [
          'Write the script',
          'chmod +x it',
          'Test it manually',
          'Add it to crontab'
        ],
        damageIfCorrect: 38,
        damageToHeroIfWrong: 25
      },
      // ================================================================
      // Remediation doc, Section 1 — 5-level restructure, boss 9
      // (wraith). Research basis (checked BEFORE writing): the Bash
      // manual and Advanced Bash-Scripting Guide (set -euo pipefail,
      // trap, getopts, arrays, parameter expansion), the Python
      // standard library docs (argparse, subprocess, logging, venv),
      // and standard scripting-for-DevOps interview topics (safe/
      // idempotent automation scripts, cron environment differences,
      // signal handling, background jobs, retry/backoff, structured
      // logging), plus real documented incident patterns (a cron job
      // overlapping itself, an unquoted variable breaking on spaces,
      // a script silently continuing past a failed step, a runaway
      // background process, an unhandled exception crashing a batch
      // job partway through, secrets leaking via process listing or
      // shell history). All 125 questions trace to one of those.
      // Cross-checked programmatically against every other shipped
      // boss's questions (zero cross-boss duplicate prompts) and
      // against each other level in this set (zero internal
      // duplicates) — verified via script.
      levels: [
        {
          name: 'Level 1 — Fundamentals',
          hp: 115,
          questions: [
            {
              mode: 'terminal',
              prompt: 'The Wraith flickers between lines of code: <strong>"Loop through every .txt file in this directory and print each name."</strong>',
              damageIfCorrect: 14, damageIfOptimal: 22,
              hintNudge: 'A classic bash for-loop over a glob pattern.',
              hintPartial: 'for f in *.txt; do e___ $f; done',
              hintFull: 'for f in *.txt; do echo $f; done',
              acceptablePatterns: [/^for\s+f\s+in\s+\*\.txt;\s*do\s+echo\s+"?\$f"?;\s*done$/i],
              optimalPatterns: [/^for\s+f\s+in\s+\*\.txt;\s*do\s+echo\s+\$f;\s*done$/i],
              baseCmds: ['for']
            },
            {
              mode: 'terminal',
              prompt: 'Text scrambles and reforms: <strong>"Store the output of <code>whoami</code> in a variable called <code>USER_NAME</code>."</strong>',
              damageIfCorrect: 12, damageIfOptimal: 20,
              hintNudge: 'Command substitution — capture a command\'s output into a variable.',
              hintPartial: 'USER_NAME=$(w_____)',
              hintFull: 'USER_NAME=$(whoami)',
              acceptablePatterns: [/^USER_NAME=`whoami`$/i],
              optimalPatterns: [/^USER_NAME=\$\(whoami\)$/i],
              baseCmds: ['USER_NAME']
            },
            {
              mode: 'terminal',
              prompt: 'A glyph flickers: <strong>"In one line, check if <code>deploy.lock</code> exists and print \'exists\' if it does."</strong>',
              damageIfCorrect: 14, damageIfOptimal: 22,
              hintNudge: 'A bash test for file existence, then && to chain the echo.',
              hintPartial: '[ -f deploy.lock ] && e___ exists',
              hintFull: '[ -f deploy.lock ] && echo exists',
              acceptablePatterns: [/^if\s*\[\s*-f\s+deploy\.lock\s*\];\s*then\s+echo\s+exists;\s*fi$/i],
              optimalPatterns: [/^\[\s*-f\s+deploy\.lock\s*\]\s*&&\s*echo\s+exists$/i],
              baseCmds: ['[']
            },
            {
              mode: 'terminal',
              prompt: 'The air hums: <strong>"Run <code>df -h</code> repeatedly, every 5 seconds."</strong>',
              damageIfCorrect: 12, damageIfOptimal: 20,
              hintNudge: 'A tool built exactly for "run this repeatedly."',
              hintPartial: 'watch -n _ df -h',
              hintFull: 'watch -n 5 df -h',
              acceptablePatterns: [/^while\s+true;\s*do\s+df\s+-h;\s*sleep\s+5;\s*done$/i],
              optimalPatterns: [/^watch\s+-n\s+5\s+df\s+-h$/i],
              baseCmds: ['watch', 'while']
            },
            {
              mode: 'terminal',
              prompt: 'A whisper curls through the dark: <strong>"Write a crontab line to run <code>/path/to/script.sh</code> every day at 2 AM."</strong>',
              damageIfCorrect: 14, damageIfOptimal: 22,
              hintNudge: 'Five time fields, then the command — minute, hour, day, month, weekday.',
              hintPartial: '0 2 * * * /path/to/___',
              hintFull: '0 2 * * * /path/to/script.sh',
              acceptablePatterns: [/^0\s+2\s+\*\s+\*\s+\*\s+bash\s+\/path\/to\/script\.sh$/i],
              optimalPatterns: [/^0\s+2\s+\*\s+\*\s+\*\s+\/path\/to\/script\.sh$/i],
              baseCmds: ['0']
            },
            {
              mode: 'terminal',
              prompt: 'The Wraith counts its own inheritance: <strong>"Print the first command-line argument passed to this script."</strong>',
              damageIfCorrect: 12, damageIfOptimal: 20,
              hintNudge: 'Bash\'s positional parameters start at 1, not 0.',
              hintPartial: 'echo $_',
              hintFull: 'echo $1',
              acceptablePatterns: [],
              optimalPatterns: [/^echo\s+\$1$/i],
              baseCmds: ['echo']
            },
            {
              mode: 'terminal',
              prompt: 'A whisper checks its own outcome: <strong>"Print the exit code of the last command that ran."</strong>',
              damageIfCorrect: 14, damageIfOptimal: 22,
              hintNudge: 'A special bash variable always holds the previous command\'s exit status.',
              hintPartial: 'echo $_',
              hintFull: 'echo $?',
              acceptablePatterns: [],
              optimalPatterns: [/^echo\s+\$\?$/i],
              baseCmds: ['echo']
            },
            {
              mode: 'terminal',
              prompt: 'The Wraith reads every scroll in a chest: <strong>"Loop through the array <code>files=(a.txt b.txt c.txt)</code> and print each element."</strong>',
              damageIfCorrect: 16, damageIfOptimal: 26,
              hintNudge: 'A for-loop over "${array[@]}" iterates every element.',
              hintPartial: 'for f in "${files[__]}"; do echo $f; done',
              hintFull: 'for f in "${files[@]}"; do echo $f; done',
              acceptablePatterns: [/^for\s+f\s+in\s+\$\{files\[\*\]\};\s*do\s+echo\s+\$f;\s*done$/i],
              optimalPatterns: [/^for\s+f\s+in\s+"\$\{files\[@\]\}";\s*do\s+echo\s+\$f;\s*done$/i],
              baseCmds: ['for']
            },
            {
              mode: 'spot_the_bug',
              prompt: 'A whisper reveals a broken script. <strong>"This comparison breaks unpredictably whenever the input is empty or contains a space. Find and fix the bug."</strong>',
              damageIfCorrect: 14, damageIfOptimal: 22,
              hintNudge: 'If NAME is ever empty or contains a space, this comparison breaks unpredictably.',
              hintPartial: 'Quote the variable so it\'s always treated as one safe value.',
              hintFull: 'Fix: if [ "$NAME" == "test" ]',
              codeBlock: [
                'NAME=$1',
                'if [ $NAME == "test" ]',
                '  then echo "matched"',
                'fi'
              ],
              buggyLineId: 1,
              correctFixPatterns: [/^if\s*\[\s*"\$NAME"\s*==\s*"test"\s*\]$/i]
            },
            {
              mode: 'spot_the_bug',
              prompt: 'Another whisper, another script. <strong>"The system doesn\'t know which interpreter should run this file. Find and fix the bug."</strong>',
              damageIfCorrect: 14, damageIfOptimal: 22,
              hintNudge: 'Without this special first line, the system doesn\'t know which interpreter should run the script.',
              hintPartial: 'The very first line should declare the shell to use, not just be a comment.',
              hintFull: 'Fix: #!/bin/bash',
              codeBlock: [
                '# my deploy script',
                'echo "Deploying..."',
                'cp app.tar.gz /srv/app/'
              ],
              buggyLineId: 0,
              correctFixPatterns: [/^#!\/bin\/bash$/i, /^#!\/usr\/bin\/env\s+bash$/i]
            },
            {
              mode: 'spot_the_bug',
              prompt: 'A fraying thread of code. <strong>"A failed copy here just gets silently ignored, and the script carries on. Find and fix the bug."</strong>',
              damageIfCorrect: 16, damageIfOptimal: 26,
              hintNudge: 'If this copy silently fails, the script just carries on as if everything were fine.',
              hintPartial: 'Make a failed copy stop the script instead of continuing silently.',
              hintFull: 'Fix: cp important.txt backup/ || exit 1',
              codeBlock: [
                'cp important.txt backup/',
                'echo "Backup complete"'
              ],
              buggyLineId: 0,
              correctFixPatterns: [/^cp\s+important\.txt\s+backup\/\s*\|\|\s*exit\s+1$/i]
            },
            {
              mode: 'spot_the_bug',
              prompt: 'A twisting, looping fragment. <strong>"This loop never actually ends the way you\'d expect. Find and fix the bug."</strong>',
              damageIfCorrect: 16, damageIfOptimal: 26,
              hintNudge: 'The < here compares as text, not as a number — this loop never actually ends the way you\'d expect.',
              hintPartial: 'Use the proper numeric-comparison test operator.',
              hintFull: 'Fix: while [ $count -lt 10 ]',
              codeBlock: [
                'count=0',
                'while [ $count < 10 ]',
                'do',
                '  count=$((count+1))',
                'done'
              ],
              buggyLineId: 1,
              correctFixPatterns: [/^while\s*\[\s*\$count\s+-lt\s+10\s*\]$/i]
            },
            {
              mode: 'spot_the_bug',
              prompt: 'The last whisper before the echo. <strong>"This only works if the script happens to be run from one specific directory. Find and fix the bug."</strong>',
              damageIfCorrect: 16, damageIfOptimal: 26,
              hintNudge: 'This only works if the script happens to be run from one specific directory.',
              hintPartial: 'Use the absolute path so it works no matter where it\'s run from.',
              hintFull: 'Fix: cd /var/app/logs && rm *.log',
              codeBlock: [
                '# cron job — cleans old logs',
                'cd logs && rm *.log'
              ],
              buggyLineId: 1,
              correctFixPatterns: [/^cd\s+\/var\/app\/logs\s*&&\s*rm\s+\*\.log$/i]
            },
            {
              mode: 'triage_call',
              prompt: 'The Wraith tilts its hollow head: <strong>"Deciding whether a small automation task should be written in Bash or Python. Pick your move, then justify it in one line."</strong>',
              damageIfCorrect: 16, damageIfOptimal: 26,
              hintNudge: 'Bash shines at gluing shell commands together simply; Python shines once real logic, data structures, or error handling get involved.',
              hintPartial: 'If it\'s mostly chaining a few shell commands, Bash is simpler; once real logic, data parsing, or robust error handling is needed, Python becomes the better fit.',
              hintFull: 'Best: match the tool to the actual complexity — Bash for straightforward command-chaining, Python once the task needs real logic, structured data, or robust error handling that Bash handles awkwardly.',
              options: [
                { id: 'a', label: 'Always Bash, since it\'s already everywhere', tier: 'wrong', why: 'Bash becomes genuinely awkward once real logic, data structures, or robust error handling are needed — availability alone doesn\'t make it the right tool for everything.' },
                { id: 'b', label: 'Match the choice to actual task complexity', tier: 'best', why: 'Bash for simple command-chaining, Python once real logic/data/error-handling needs grow — neither is a universal default.' },
                { id: 'c', label: 'Always Python, for consistency across all scripts', tier: 'wrong', why: 'Adds unnecessary overhead (interpreter startup, imports) for a task that\'s genuinely just a couple of chained shell commands.' }
              ],
              justificationPatterns: [/match.*complexity|simple.*bash|real\s*logic/i]
            },
            {
              mode: 'triage_call',
              prompt: '<strong>"A script needs to run on a schedule, unattended. Deciding whether to use cron or a manual reminder to run it. Pick your move, then justify it in one line."</strong>',
              damageIfCorrect: 16, damageIfOptimal: 26,
              hintNudge: 'A manual reminder depends entirely on a human remembering — cron runs regardless of anyone remembering anything.',
              hintPartial: 'Use cron — it runs reliably on schedule with no dependence on a human remembering, which is the whole point of automating something that needs to happen unattended.',
              hintFull: 'Best: cron (or an equivalent scheduler) — a manual reminder depends entirely on someone remembering, defeating the actual purpose of automating an unattended, scheduled task.',
              options: [
                { id: 'a', label: 'cron (or an equivalent scheduler)', tier: 'best', why: 'Runs reliably on schedule with zero dependence on a human remembering — exactly what "unattended" requires.' },
                { id: 'b', label: 'A calendar reminder for someone to run it manually', tier: 'wrong', why: 'Depends entirely on a human remembering every time — defeats the actual purpose of automating something unattended.' },
                { id: 'c', label: 'Neither — just run it whenever it happens to come up', tier: 'wrong', why: 'Provides no actual scheduling guarantee at all for something explicitly described as needing to run unattended, on a schedule.' }
              ],
              justificationPatterns: [/cron|scheduler|unattended|reliab/i]
            },
            {
              mode: 'read_the_room',
              prompt: 'The Echo chamber replays a failure, again and again. <strong>A command fails with "command not found." Diagnose it, then fix it.</strong>',
              damageIfCorrect: 18, damageIfOptimal: 30,
              hintNudge: 'Read the command name very literally, letter by letter.',
              hintPartial: 'It\'s misspelled — that\'s the whole problem.',
              hintFull: 'Diagnosis: a typo in the command name. Fix: run the correctly-spelled command, e.g. python3 script.py',
              outputBlock: [
                '$ pyhton script.py',
                'bash: pyhton: command not found'
              ],
              acceptableDiagnosesPatterns: [/typo/i, /misspell/i, /command\s*not\s*found/i],
              followUpFix: {
                prompt: 'Run it correctly this time:',
                acceptablePatterns: [/^python\s+script\.py$/i],
                optimalPatterns: [/^python3\s+script\.py$/i]
              }
            },
            {
              mode: 'read_the_room',
              prompt: 'The echo sharpens. <strong>Running a script fails with "Permission denied." Diagnose it, then fix it.</strong>',
              damageIfCorrect: 18, damageIfOptimal: 30,
              hintNudge: 'The OS is refusing to run this file at all — that\'s a permissions issue, not a code bug.',
              hintPartial: 'The script simply isn\'t marked as executable yet.',
              hintFull: 'Diagnosis: the script isn\'t executable. Fix: chmod +x deploy.sh',
              outputBlock: [
                '$ ./deploy.sh',
                'bash: ./deploy.sh: Permission denied'
              ],
              acceptableDiagnosesPatterns: [/not\s*executable/i, /permission/i, /missing\s*execute/i],
              followUpFix: {
                prompt: 'Give it execute permission:',
                acceptablePatterns: [/^chmod\s+755\s+deploy\.sh$/i],
                optimalPatterns: [/^chmod\s+\+x\s+deploy\.sh$/i]
              }
            },
            {
              mode: 'read_the_room',
              prompt: 'The chamber crackles with static. <strong>Running a script fails with a bash syntax error. Diagnose it, then fix it.</strong>',
              damageIfCorrect: 18, damageIfOptimal: 30,
              hintNudge: 'Bash is telling you it hit something it didn\'t expect while parsing the file.',
              hintPartial: 'Somewhere in the script a bracket or quote isn\'t properly closed.',
              hintFull: 'Diagnosis: a bash syntax error — an unmatched bracket or quote somewhere in the script. Fix (first step): syntax-check without running it, e.g. bash -n script.sh',
              outputBlock: [
                '$ ./script.sh',
                './script.sh: line 12: syntax error near unexpected token `fi\''
              ],
              acceptableDiagnosesPatterns: [/syntax\s*error/i, /unmatched\s*(bracket|quote|token)/i],
              followUpFix: {
                prompt: 'Check the script\'s syntax without actually running it:',
                acceptablePatterns: [/^sh\s+-n\s+script\.sh$/i],
                optimalPatterns: [/^bash\s+-n\s+script\.sh$/i]
              }
            },
            {
              mode: 'read_the_room',
              prompt: 'A hollow echo — it worked by hand, but never on schedule. <strong>Diagnose it, then fix it.</strong>',
              damageIfCorrect: 18, damageIfOptimal: 30,
              hintNudge: 'Cron runs with a much smaller environment than your interactive shell has.',
              hintPartial: 'A command the script relies on isn\'t on cron\'s minimal PATH.',
              hintFull: 'Diagnosis: cron\'s environment lacks the PATH/env vars your interactive shell has. Fix: set it explicitly in the script, e.g. export PATH=/usr/local/bin:$PATH',
              outputBlock: [
                '$ crontab -l',
                '0 2 * * * /home/dev/backup.sh',
                '(runs fine manually, but cron\'s log shows: "aws: command not found")'
              ],
              acceptableDiagnosesPatterns: [/(cron\s*)?(environment|path).*(missing|different|minimal)/i, /not\s*(in|on)\s*(cron'?s\s*)?path/i],
              followUpFix: {
                prompt: 'Set the PATH explicitly so cron can find the same tools:',
                acceptablePatterns: [/^PATH=\/usr\/local\/bin:\$PATH$/i],
                optimalPatterns: [/^export\s+PATH=\/usr\/local\/bin:\$PATH$/i]
              }
            },
            {
              mode: 'read_the_room',
              prompt: 'The final echo fades into silence. <strong>A Python script fails with a ModuleNotFoundError. Diagnose it, then fix it.</strong>',
              damageIfCorrect: 18, damageIfOptimal: 30,
              hintNudge: 'Python is telling you exactly which package it can\'t find.',
              hintPartial: 'The "requests" library was never installed in this environment.',
              hintFull: 'Diagnosis: a required Python package isn\'t installed. Fix: pip install requests',
              outputBlock: [
                '$ python3 script.py',
                'ModuleNotFoundError: No module named \'requests\''
              ],
              acceptableDiagnosesPatterns: [/(module|package).*(not\s*installed|missing)/i, /modulenotfounderror/i],
              followUpFix: {
                prompt: 'Install the missing package:',
                acceptablePatterns: [/^pip3\s+install\s+requests$/i],
                optimalPatterns: [/^pip\s+install\s+requests$/i]
              }
            },
            {
              mode: 'build_the_pipeline',
              prompt: 'The Wraith unravels into pure code. <strong>Sequence the correct order for writing and deploying a new automation script.</strong>',
              steps: ['Write the script', 'chmod +x it', 'Test it manually', 'Add it to crontab'],
              damageIfCorrect: 20, damageIfOptimal: 32,
              damageToHeroIfWrong: 18
            },
            {
              mode: 'build_the_pipeline',
              prompt: 'A second thread unravels. <strong>Sequence the correct order for safely testing a new script before relying on it.</strong>',
              steps: [
                'Read through the script logic once fully',
                'Run it manually in a safe/test environment first',
                'Check its actual exit code and output',
                'Only then schedule it to run unattended'
              ],
              damageIfCorrect: 20, damageIfOptimal: 32,
              damageToHeroIfWrong: 18
            },
            {
              mode: 'terminal',
              prompt: 'The Wraith checks the shape of a shadow before naming it: <strong>"Check if a directory called <code>/data</code> exists."</strong>',
              damageIfCorrect: 12, damageIfOptimal: 20,
              hintNudge: 'A bash test flag specifically for directories, not just any file.',
              hintPartial: '[ -_ /data ] && echo exists',
              hintFull: '[ -d /data ] && echo exists',
              acceptablePatterns: [],
              optimalPatterns: [/^\[\s*-d\s+\/data\s*\]\s*&&\s*echo\s+exists$/i],
              baseCmds: ['[']
            },
            {
              mode: 'terminal',
              prompt: 'It defines a small, reusable ritual: <strong>"Define a bash function called <code>greet</code> that prints \'hello\'."</strong>',
              damageIfCorrect: 14, damageIfOptimal: 22,
              hintNudge: 'A function name followed by parentheses and braces around the body.',
              hintPartial: 'greet() { echo _____; }',
              hintFull: 'greet() { echo hello; }',
              acceptablePatterns: [/^function\s+greet\s*\{\s*echo\s+hello;\s*\}$/i],
              optimalPatterns: [/^greet\(\)\s*\{\s*echo\s+hello;\s*\}$/i],
              baseCmds: ['greet']
            },
            {
              mode: 'spot_the_bug',
              prompt: 'A crooked ritual counts every guest as one. <strong>"This loop is supposed to iterate over each word in a filename list, but filenames containing spaces get split incorrectly. Find and fix the bug."</strong>',
              damageIfCorrect: 16, damageIfOptimal: 26,
              hintNudge: 'Unquoted command substitution in a for-loop splits on any whitespace, breaking filenames that contain spaces.',
              hintPartial: 'Line 1\'s unquoted $(ls) splits on every space, breaking any filename that contains one — use a method that handles filenames safely, like find with -print0.',
              hintFull: 'Fix: find . -maxdepth 1 -print0 | xargs -0 -I{} echo {}',
              codeBlock: [
                'for f in $(ls); do echo $f; done  # breaks on filenames containing spaces'
              ],
              buggyLineId: 0,
              correctFixPatterns: [/find.*-print0|xargs\s+-0/i]
            }
          ]
        },
        {
          name: 'Level 2 — Intermediate',
          hp: 135,
          questions: [
            {
              mode: 'terminal',
              prompt: 'The Wraith demands the script stop at the first crack: <strong>"Add the line that makes a bash script exit immediately if any command fails."</strong>',
              damageIfCorrect: 16, damageIfOptimal: 26,
              hintNudge: 'A single set command with a flag for exiting on error.',
              hintPartial: 'set -_',
              hintFull: 'set -e',
              acceptablePatterns: [],
              optimalPatterns: [/^set\s+-e$/i],
              baseCmds: ['set']
            },
            {
              mode: 'terminal',
              prompt: 'It refuses to let a ghost variable pass unseen: <strong>"Add the line that makes a bash script error out if it references an undefined variable."</strong>',
              damageIfCorrect: 16, damageIfOptimal: 26,
              hintNudge: 'The same set command, a different flag for undefined variables.',
              hintPartial: 'set -_',
              hintFull: 'set -u',
              acceptablePatterns: [],
              optimalPatterns: [/^set\s+-u$/i],
              baseCmds: ['set']
            },
            {
              mode: 'terminal',
              prompt: 'A pipeline\'s hidden failure is exposed: <strong>"Add the line that makes a bash script fail if ANY command in a pipeline fails, not just the last one."</strong>',
              damageIfCorrect: 18, damageIfOptimal: 28,
              hintNudge: 'A specific set -o option exists just for pipeline failure propagation.',
              hintPartial: 'set -o _______',
              hintFull: 'set -o pipefail',
              acceptablePatterns: [],
              optimalPatterns: [/^set\s+-o\s+pipefail$/i],
              baseCmds: ['set']
            },
            {
              mode: 'terminal',
              prompt: 'The Wraith leaves a final message before it fades: <strong>"Set a trap that prints \'cleaning up\' when the script exits, for any reason."</strong>',
              damageIfCorrect: 20, damageIfOptimal: 32,
              hintNudge: 'trap takes a command and a signal name — EXIT fires no matter how the script ends.',
              hintPartial: 'trap "echo cleaning up" ____',
              hintFull: 'trap "echo cleaning up" EXIT',
              acceptablePatterns: [],
              optimalPatterns: [/^trap\s+"echo\s+cleaning\s+up"\s+EXIT$/i],
              baseCmds: ['trap']
            },
            {
              mode: 'terminal',
              prompt: 'A whisper runs on, unbothered by the door closing: <strong>"Run <code>backup.sh</code> in the background so it keeps running even after you log out."</strong>',
              damageIfCorrect: 18, damageIfOptimal: 28,
              hintNudge: 'A classic combination: nohup to survive logout, & to background it.',
              hintPartial: 'nohup ./backup.sh __',
              hintFull: 'nohup ./backup.sh &',
              acceptablePatterns: [/^\.\/backup\.sh\s*&$/i],
              optimalPatterns: [/^nohup\s+\.\/backup\.sh\s*&$/i],
              baseCmds: ['nohup']
            },
            {
              mode: 'terminal',
              prompt: 'The Wraith reads a scroll shaped like a record: <strong>"Parse the value of the key \'name\' from a JSON file <code>data.json</code>, using jq."</strong>',
              damageIfCorrect: 18, damageIfOptimal: 28,
              hintNudge: 'jq, given a filter expression for the key, and the file.',
              hintPartial: 'jq \'.____\' data.json',
              hintFull: "jq '.name' data.json",
              acceptablePatterns: [],
              optimalPatterns: [/^jq\s+'\.name'\s+data\.json$/i],
              baseCmds: ['jq']
            },
            {
              mode: 'terminal',
              prompt: 'It names its own well of thought: <strong>"Create and activate a Python virtual environment named <code>venv</code>."</strong>',
              damageIfCorrect: 20, damageIfOptimal: 32,
              hintNudge: 'python -m venv creates it; a source command on its activate script turns it on.',
              hintPartial: 'python3 -m venv venv && source venv/bin/______',
              hintFull: 'python3 -m venv venv && source venv/bin/activate',
              acceptablePatterns: [],
              optimalPatterns: [/^python3\s+-m\s+venv\s+venv\s*&&\s*source\s+venv\/bin\/activate$/i],
              baseCmds: ['python3']
            },
            {
              mode: 'terminal',
              prompt: 'The Wraith records every ingredient in its ritual: <strong>"Write the currently installed Python packages to a <code>requirements.txt</code> file."</strong>',
              damageIfCorrect: 16, damageIfOptimal: 26,
              hintNudge: 'pip has a freeze action that lists exact installed versions, redirected to a file.',
              hintPartial: 'pip freeze > ________.txt',
              hintFull: 'pip freeze > requirements.txt',
              acceptablePatterns: [],
              optimalPatterns: [/^pip\s+freeze\s*>\s*requirements\.txt$/i],
              baseCmds: ['pip']
            },
            {
              mode: 'spot_the_bug',
              prompt: 'A crooked script trusts a value it never validated. <strong>"This script uses a command-line argument without checking whether it was actually provided. Find and fix the bug."</strong>',
              damageIfCorrect: 18, damageIfOptimal: 28,
              hintNudge: 'Referencing $1 when no argument was passed at all can silently behave in unexpected ways — check for it explicitly.',
              hintPartial: 'Line 1 uses $1 directly with no check — add a guard that exits with a clear error if no argument was provided.',
              hintFull: 'Fix: if [ -z "$1" ]; then echo "Usage: $0 <arg>"; exit 1; fi',
              codeBlock: [
                'TARGET=$1',
                'rm -rf "$TARGET"/*'
              ],
              buggyLineId: 0,
              correctFixPatterns: [/if\s*\[\s*-z\s*"\$1"\s*\]/i]
            },
            {
              mode: 'spot_the_bug',
              prompt: 'A crooked pipeline hides its own failure. <strong>"This script checks the wrong command\'s exit code after a pipeline. Find and fix the bug."</strong>',
              damageIfCorrect: 20, damageIfOptimal: 32,
              hintNudge: 'Without pipefail, $? after a pipeline reflects only the LAST command\'s exit code, not any earlier failure in the pipe.',
              hintPartial: 'Add set -o pipefail before this so a failure anywhere in the pipeline is actually detected, not masked by the final command succeeding.',
              hintFull: 'Fix: add set -o pipefail near the top of the script.',
              codeBlock: [
                'cat missing_file.txt | grep pattern',
                'echo "exit code: $?"  # always reflects grep, not cat'
              ],
              buggyLineId: 0,
              correctFixPatterns: [/set\s+-o\s+pipefail/i]
            },
            {
              mode: 'spot_the_bug',
              prompt: 'A crooked script forgets what it was told. <strong>"This script ignores the actual command-line flags passed to it. Find and fix the bug."</strong>',
              damageIfCorrect: 20, damageIfOptimal: 32,
              hintNudge: 'A script accepting flags needs to actually parse them (e.g. via getopts), not just reference hardcoded values.',
              hintPartial: 'Line 1 hardcodes the environment instead of reading it from an actual passed flag — use getopts to parse -e properly.',
              hintFull: 'Fix: while getopts "e:" opt; do case $opt in e) ENV=$OPTARG;; esac; done',
              codeBlock: [
                'ENV="production"  # ignores any -e flag actually passed'
              ],
              buggyLineId: 0,
              correctFixPatterns: [/getopts/i]
            },
            {
              mode: 'triage_call',
              prompt: 'The Wraith weighs silence against alarm: <strong>"Deciding whether a script that fails partway through should continue processing remaining items or stop immediately. Pick your move, then justify it in one line."</strong>',
              damageIfCorrect: 20, damageIfOptimal: 32,
              hintNudge: 'The right answer depends on whether remaining items are truly independent — continuing past a real failure silently can mask a serious problem, but stopping on an unrelated item\'s failure can be needlessly disruptive.',
              hintPartial: 'If items are genuinely independent, log the failure and continue processing the rest, but make sure the OVERALL script still exits non-zero and the failure is visible — silently continuing without any signal of what failed is the actual anti-pattern, not continuing itself.',
              hintFull: 'Best: for independent items, continue processing but track and clearly report every failure, exiting non-zero overall if any occurred — the danger isn\'t continuing, it\'s continuing SILENTLY with no visibility into what failed.',
              options: [
                { id: 'a', label: 'Stop immediately on the very first failure, always', tier: 'defensible', why: 'Safe, but can be needlessly disruptive when the failed item is unrelated to the rest — a genuinely independent batch shouldn\'t stall entirely over one bad item.' },
                { id: 'b', label: 'Continue processing remaining independent items, but track and report every failure clearly', tier: 'best', why: 'Avoids stalling on unrelated failures while still surfacing every problem — the real risk is failing silently, not continuing itself.' },
                { id: 'c', label: 'Continue processing and swallow all failures silently', tier: 'wrong', why: 'Hides real failures entirely — this is the actual anti-pattern, regardless of whether continuing itself was the right call.' }
              ],
              justificationPatterns: [/independent|track.*fail|report.*fail|visib/i]
            },
            {
              mode: 'triage_call',
              prompt: '<strong>"Deciding how a script should get sensitive credentials it needs (like an API key). Pick your move, then justify it in one line."</strong>',
              damageIfCorrect: 20, damageIfOptimal: 32,
              hintNudge: 'A hardcoded credential in the script itself is exposed to anyone with read access to the file (and to version control history) — an environment variable or secrets manager keeps it out of the script\'s own text.',
              hintPartial: 'Read it from an environment variable (ideally sourced from a secrets manager), never hardcoded in the script itself — a hardcoded credential is exposed to anyone with file/repo read access, indefinitely.',
              hintFull: 'Best: read credentials from an environment variable populated by a secrets manager at runtime — never hardcode them directly in the script, where they\'d be exposed to anyone with file or repo access.',
              options: [
                { id: 'a', label: 'Hardcode it directly in the script for simplicity', tier: 'wrong', why: 'Exposes the credential to anyone with read access to the file (and to version control history if committed) — a real, persistent exposure.' },
                { id: 'b', label: 'Read it from an environment variable, sourced from a secrets manager', tier: 'best', why: 'Keeps the actual credential out of the script\'s own text entirely, while still being usable at runtime.' },
                { id: 'c', label: 'Prompt for it interactively every single time the script runs', tier: 'wrong', why: 'Breaks the entire point of an unattended, automated script — it can no longer run without a human present to type it in.' }
              ],
              justificationPatterns: [/environment\s*variable|secrets?\s*manager|never\s*hardcod/i]
            },
            {
              mode: 'read_the_room',
              prompt: 'A ghost repeats a name it has already claimed. <strong>Running the same script twice at once causes both runs to corrupt a shared file. Diagnose it, then fix it.</strong>',
              damageIfCorrect: 20, damageIfOptimal: 34,
              hintNudge: 'Nothing prevents two instances of the same script from running at the same time — a lock file is a common way to prevent exactly this.',
              hintPartial: 'The script has no mechanism preventing two instances from running simultaneously — both write to the same shared file at once, corrupting it.',
              hintFull: 'Diagnosis: the script has no locking mechanism to prevent concurrent runs. Fix: use a lock file (checked and created atomically, e.g. via flock) so a second run exits early if one is already in progress.',
              outputBlock: [
                '$ (cron log) two overlapping runs of the same job started 30 seconds apart',
                '(shared output file is now corrupted)'
              ],
              acceptableDiagnosesPatterns: [/no\s*lock(ing)?/i, /concurrent\s*run/i, /overlapping\s*run/i],
              followUpFix: {
                prompt: 'Fix it by adding a lock file mechanism:',
                acceptablePatterns: [],
                optimalPatterns: [/flock|lock\s*file/i]
              }
            },
            {
              mode: 'read_the_room',
              prompt: 'A dry well answers every call the same way. <strong>A Python script that used to work now fails on every run with a "Errno 13: Permission denied" writing to a log file. Diagnose it, then fix it.</strong>',
              damageIfCorrect: 20, damageIfOptimal: 34,
              hintNudge: 'Check the ownership and permissions of the specific log file/directory the script is trying to write to.',
              hintPartial: 'The log file (or its directory) is owned by a different user or has restrictive permissions, and the account this script now runs as doesn\'t have write access.',
              hintFull: 'Diagnosis: the log file/directory permissions don\'t allow the current running user to write. Fix: correct ownership/permissions on the log path (or run the script as the correct user).',
              outputBlock: [
                '$ python3 script.py',
                'PermissionError: [Errno 13] Permission denied: \'/var/log/app.log\''
              ],
              acceptableDiagnosesPatterns: [/permission.*(log|file|directory)/i, /ownership/i],
              followUpFix: {
                prompt: 'Fix it by correcting ownership/permissions on the log path:',
                acceptablePatterns: [],
                optimalPatterns: [/chown|chmod|ownership/i]
              }
            },
            {
              mode: 'terminal',
              prompt: 'The Wraith parses its own count of a scroll\'s many entries: <strong>"Count how many entries are in a JSON array stored in <code>data.json</code>, using jq."</strong>',
              damageIfCorrect: 18, damageIfOptimal: 28,
              hintNudge: 'jq has a length function applicable to the top-level array.',
              hintPartial: 'jq \'_______\' data.json',
              hintFull: "jq 'length' data.json",
              acceptablePatterns: [],
              optimalPatterns: [/^jq\s+'length'\s+data\.json$/i],
              baseCmds: ['jq']
            },
            {
              mode: 'terminal',
              prompt: 'It writes to a well that many hands will draw from: <strong>"In Python, write the dictionary <code>data</code> to a file <code>out.json</code> as JSON."</strong>',
              damageIfCorrect: 20, damageIfOptimal: 32,
              hintNudge: 'The json module\'s dump function, taking the object and an open file handle.',
              hintPartial: 'json.____(data, open("out.json", "w"))',
              hintFull: 'json.dump(data, open("out.json", "w"))',
              acceptablePatterns: [],
              optimalPatterns: [/json\.dump\(data,\s*open\("out\.json",\s*"w"\)\)/i],
              baseCmds: []
            },
            {
              mode: 'terminal',
              prompt: 'The Wraith accepts a title with grace, not force: <strong>"In Python, use argparse to define a required command-line argument named <code>--env</code>."</strong>',
              damageIfCorrect: 22, damageIfOptimal: 36,
              hintNudge: 'add_argument, with the flag name and a required flag set to True.',
              hintPartial: 'parser.add_argument("--env", required=____)',
              hintFull: 'parser.add_argument("--env", required=True)',
              acceptablePatterns: [],
              optimalPatterns: [/parser\.add_argument\("--env",\s*required=True\)/i],
              baseCmds: []
            },
            {
              mode: 'spot_the_bug',
              prompt: 'A crooked script leaves the door swinging after it. <strong>"This script creates a temp file but never cleans it up, even on failure. Find and fix the bug."</strong>',
              damageIfCorrect: 18, damageIfOptimal: 28,
              hintNudge: 'A temp file should be cleaned up regardless of how the script exits — a trap on EXIT guarantees that.',
              hintPartial: 'Add a trap that removes the temp file on EXIT, so it\'s cleaned up whether the script succeeds, fails, or is interrupted.',
              hintFull: 'Fix: trap \'rm -f "$TMPFILE"\' EXIT',
              codeBlock: [
                'TMPFILE=$(mktemp)  # never removed anywhere in the script, even on failure'
              ],
              buggyLineId: 0,
              correctFixPatterns: [/trap.*rm.*EXIT/i]
            },
            {
              mode: 'spot_the_bug',
              prompt: 'A crooked script assumes today looks like yesterday. <strong>"This script hardcodes today\'s date instead of computing it dynamically. Find and fix the bug."</strong>',
              damageIfCorrect: 18, damageIfOptimal: 28,
              hintNudge: 'A hardcoded date works today but breaks silently every day after — compute it dynamically instead.',
              hintPartial: 'Line 1 hardcodes a literal date string — compute today\'s date dynamically using the date command instead.',
              hintFull: 'Fix: TODAY=$(date +%Y-%m-%d)',
              codeBlock: [
                'TODAY="2024-01-15"  # hardcoded, silently wrong every day after'
              ],
              buggyLineId: 0,
              correctFixPatterns: [/TODAY=\$\(date/i]
            },
            {
              mode: 'triage_call',
              prompt: 'The Wraith weighs a quiet failure against a loud one: <strong>"Deciding whether a script should log warnings to stderr or stdout. Pick your move, then justify it in one line."</strong>',
              damageIfCorrect: 20, damageIfOptimal: 32,
              hintNudge: 'stdout is meant for a program\'s actual output/results; stderr is meant for diagnostic messages — mixing them makes piping the real output somewhere else unreliable.',
              hintPartial: 'Log warnings/diagnostics to stderr, keeping stdout reserved for the script\'s actual output — this lets stdout be safely piped/redirected without diagnostic noise mixed in.',
              hintFull: 'Best: stderr for warnings/diagnostics, stdout for actual output — this is the standard convention that keeps stdout safely pipeable to other tools without diagnostic clutter mixed in.',
              options: [
                { id: 'a', label: 'stderr for warnings/diagnostics, stdout for actual output', tier: 'best', why: 'The standard convention — keeps stdout clean and safely pipeable, with diagnostic noise routed separately.' },
                { id: 'b', label: 'Everything to stdout, for simplicity', tier: 'wrong', why: 'Mixes diagnostic noise into the actual output stream, breaking anything that pipes or parses stdout expecting clean results.' },
                { id: 'c', label: 'Everything to stderr, to keep stdout completely empty', tier: 'wrong', why: 'Loses stdout\'s actual purpose — a script\'s real output should be there for anything downstream that wants to consume it.' }
              ],
              justificationPatterns: [/stderr.*(warning|diagnostic)|stdout.*(actual|clean)/i]
            },
            {
              mode: 'triage_call',
              prompt: '<strong>"Deciding whether a Python script\'s dependencies should be pinned to exact versions or left unpinned. Pick your move, then justify it in one line."</strong>',
              damageIfCorrect: 20, damageIfOptimal: 32,
              hintNudge: 'Unpinned dependencies can silently pull in a new, possibly-breaking version on a future install — the same reasoning that applies to Terraform provider pinning.',
              hintPartial: 'Pin to exact versions (via requirements.txt with exact versions, or a lockfile) — an unpinned dependency can silently install a different, possibly-breaking version on a future run, right when reproducibility matters most.',
              hintFull: 'Best: pin exact versions — this is the same principle as pinning Terraform providers: an unpinned dependency risks silently picking up a breaking change on a future install, undermining reproducibility.',
              options: [
                { id: 'a', label: 'Pin dependencies to exact versions', tier: 'best', why: 'Guarantees reproducible installs — an unpinned dependency can silently change behavior on a future install with no warning.' },
                { id: 'b', label: 'Leave dependencies unpinned, always installing latest', tier: 'wrong', why: 'Risks silently picking up a breaking change in a dependency at the worst possible time — a future install with no warning.' },
                { id: 'c', label: 'It doesn\'t matter for a script that\'s only ever run once', tier: 'defensible', why: 'True for a genuine one-off, throwaway script, but most scripts end up being re-run more times than originally expected.' }
              ],
              justificationPatterns: [/pin.*version|reproducib|lockfile/i]
            },
            {
              mode: 'triage_call',
              prompt: '<strong>"Deciding whether a script processing external/untrusted input should validate that input before using it. Pick your move, then justify it in one line."</strong>',
              damageIfCorrect: 20, damageIfOptimal: 32,
              hintNudge: 'Trusting external input without validation is how a huge class of real bugs and security issues happen — the input source being "usually fine" doesn\'t mean it always will be.',
              hintPartial: 'Always validate external/untrusted input before using it — assuming it\'s "usually fine" is exactly how a whole class of real bugs and security issues (like command injection or crashes on unexpected format) happen.',
              hintFull: 'Best: validate external input explicitly, regardless of how reliable the source usually seems — the entire point of validation is handling the cases where input ISN\'T what you expect, which "usually fine" input eventually will be.',
              options: [
                { id: 'a', label: 'Validate external input explicitly before using it', tier: 'best', why: 'Directly protects against the real, common failure mode of untrusted input eventually not matching what the script expects.' },
                { id: 'b', label: 'Skip validation since the input source is usually reliable', tier: 'wrong', why: '"Usually reliable" isn\'t "always reliable" — validation exists precisely for the cases where it isn\'t, which eventually happen.' },
                { id: 'c', label: 'Only validate input that comes from outside the company entirely', tier: 'wrong', why: 'Internal sources can also produce malformed or unexpected data — trust boundaries should be based on actual reliability, not just internal/external labeling.' }
              ],
              justificationPatterns: [/validate|untrusted|eventually/i]
            },
            {
              mode: 'read_the_room',
              prompt: 'A ritual leaves behind more ash each time it\'s cast. <strong>A script that creates temp files during processing has slowly filled /tmp over many runs. Diagnose it, then fix it.</strong>',
              damageIfCorrect: 20, damageIfOptimal: 34,
              hintNudge: 'Check whether the script actually cleans up its temp files when it finishes — or if it just leaves them behind every single run.',
              hintPartial: 'The script creates a temp file every run but never removes it afterward, even on success — thousands of runs later, /tmp is full of accumulated leftovers.',
              hintFull: 'Diagnosis: the script never cleans up its temp files after use. Fix: add a trap to remove the temp file on exit (success or failure), and clean up the existing accumulated files now.',
              outputBlock: [
                '$ ls /tmp | wc -l',
                '48213',
                '(all matching the pattern this script uses for temp files)'
              ],
              acceptableDiagnosesPatterns: [/never\s*clean(s|ed)?\s*up/i, /accumulat.*temp/i],
              followUpFix: {
                prompt: 'Fix it by adding cleanup on exit:',
                acceptablePatterns: [],
                optimalPatterns: [/trap.*(rm|EXIT)/i]
              }
            },
            {
              mode: 'read_the_room',
              prompt: 'A script that once obeyed now argues back. <strong>A Python script that used to run fine with older library versions now throws a TypeError after a routine dependency update. Diagnose it, then fix it.</strong>',
              damageIfCorrect: 20, damageIfOptimal: 34,
              hintNudge: 'A dependency update can change a function\'s signature or default behavior — check the library\'s changelog for what actually changed.',
              hintPartial: 'The updated library version changed a function\'s expected arguments or default behavior, and the script was never updated to match — this is exactly why unpinned dependencies are risky.',
              hintFull: 'Diagnosis: a dependency update changed a function\'s interface, and the script wasn\'t updated to match. Fix: check the library\'s changelog for the specific breaking change, update the script accordingly, and pin the dependency version going forward.',
              outputBlock: [
                '$ python3 script.py',
                'TypeError: process() got an unexpected keyword argument \'mode\'',
                '(worked fine before a routine "pip install --upgrade" was run)'
              ],
              acceptableDiagnosesPatterns: [/dependency\s*(update|upgrade).*(breaking|changed)/i],
              followUpFix: {
                prompt: 'Fix it by updating the script to match, then pinning the version:',
                acceptablePatterns: [],
                optimalPatterns: [/pin.*version|changelog/i]
              }
            }
          ]
        },
        {
          name: 'Level 3 — Advanced Basics',
          hp: 155,
          questions: [
            {
              mode: 'terminal',
              prompt: 'The Wraith listens for a whisper of dismissal: <strong>"Trap the SIGTERM signal in a bash script and run a cleanup function before exiting."</strong>',
              damageIfCorrect: 22, damageIfOptimal: 36,
              hintNudge: 'trap, a function name, then the specific signal.',
              hintPartial: 'trap cleanup _______',
              hintFull: 'trap cleanup SIGTERM',
              acceptablePatterns: [],
              optimalPatterns: [/^trap\s+cleanup\s+SIGTERM$/i],
              baseCmds: ['trap']
            },
            {
              mode: 'terminal',
              prompt: 'It severs a whisper from its own terminal, letting it wander free: <strong>"Disown a background job so it survives even if the shell itself closes."</strong>',
              damageIfCorrect: 20, damageIfOptimal: 32,
              hintNudge: 'A builtin specifically for detaching a job from the current shell.',
              hintPartial: 'dis___',
              hintFull: 'disown',
              acceptablePatterns: [],
              optimalPatterns: [/^disown$/i],
              baseCmds: ['disown']
            },
            {
              mode: 'terminal',
              prompt: 'The Wraith checks its own private ledger: <strong>"List every cron job scheduled for the current user."</strong>',
              damageIfCorrect: 16, damageIfOptimal: 26,
              hintNudge: 'crontab with a list flag.',
              hintPartial: 'crontab -_',
              hintFull: 'crontab -l',
              acceptablePatterns: [],
              optimalPatterns: [/^crontab\s+-l$/i],
              baseCmds: ['crontab']
            },
            {
              mode: 'terminal',
              prompt: 'It measures how long a ritual truly takes: <strong>"Time how long a script <code>backup.sh</code> takes to run."</strong>',
              damageIfCorrect: 16, damageIfOptimal: 26,
              hintNudge: 'A small utility that wraps any command and reports timing.',
              hintPartial: 't___ ./backup.sh',
              hintFull: 'time ./backup.sh',
              acceptablePatterns: [],
              optimalPatterns: [/^time\s+\.\/backup\.sh$/i],
              baseCmds: ['time']
            },
            {
              mode: 'terminal',
              prompt: 'The Wraith writes with a clearer, structured hand: <strong>"In Python, log an info-level message \'started\' using the standard logging module."</strong>',
              damageIfCorrect: 20, damageIfOptimal: 32,
              hintNudge: 'The logging module\'s info-level call, taking a message string.',
              hintPartial: 'logging.____("started")',
              hintFull: 'logging.info("started")',
              acceptablePatterns: [],
              optimalPatterns: [/^logging\.info\("started"\)$/i],
              baseCmds: ['logging']
            },
            {
              mode: 'terminal',
              prompt: 'It runs another spirit\'s errand and waits for the reply: <strong>"In Python, run the shell command <code>ls -la</code> and capture its output as text."</strong>',
              damageIfCorrect: 22, damageIfOptimal: 36,
              hintNudge: 'subprocess.run, with a capture flag and text mode.',
              hintPartial: 'subprocess.run(["ls", "-la"], capture_output=____, text=True)',
              hintFull: 'subprocess.run(["ls", "-la"], capture_output=True, text=True)',
              acceptablePatterns: [],
              optimalPatterns: [/subprocess\.run\(\["ls",\s*"-la"\],\s*capture_output=True,\s*text=True\)/i],
              baseCmds: []
            },
            {
              mode: 'spot_the_bug',
              prompt: 'A crooked script trusts luck, not verification. <strong>"This deploy script retries a flaky network call, but with no delay between attempts at all. Find and fix the bug."</strong>',
              damageIfCorrect: 22, damageIfOptimal: 36,
              hintNudge: 'Retrying instantly, with zero backoff, can hammer a struggling service even harder — a delay (ideally increasing) between attempts is standard practice.',
              hintPartial: 'Line 1 retries with no delay at all — add a sleep (ideally increasing each attempt) between retries so a struggling service isn\'t hammered even harder.',
              hintFull: 'Fix: add sleep $((attempt * 2)) between retry attempts.',
              codeBlock: [
                'for i in 1 2 3; do curl -f https://api.example.com && break; done  # no delay between attempts'
              ],
              buggyLineId: 0,
              correctFixPatterns: [/sleep/i]
            },
            {
              mode: 'spot_the_bug',
              prompt: 'A crooked signal handler never actually listens. <strong>"This script traps SIGTERM but the cleanup function referenced doesn\'t actually exist. Find and fix the bug."</strong>',
              damageIfCorrect: 22, damageIfOptimal: 36,
              hintNudge: 'A trap referencing an undefined function silently does nothing useful when the signal actually arrives.',
              hintPartial: 'Line 1 traps SIGTERM calling "cleanup", but no such function is ever defined — define it with the actual cleanup logic.',
              hintFull: 'Fix: define the cleanup function before the trap line, e.g. cleanup() { rm -f /tmp/lockfile; }',
              codeBlock: [
                'trap cleanup SIGTERM  # cleanup() is never actually defined anywhere in this script'
              ],
              buggyLineId: 0,
              correctFixPatterns: [/cleanup\(\)\s*\{/i]
            },
            {
              mode: 'spot_the_bug',
              prompt: 'A crooked python script assumes the ground beneath it. <strong>"This Python script assumes a config file always exists, with no handling for it being missing. Find and fix the bug."</strong>',
              damageIfCorrect: 22, damageIfOptimal: 36,
              hintNudge: 'Opening a file that might not exist without any error handling crashes the whole script with an unhandled exception.',
              hintPartial: 'Line 1 opens the config file with no try/except — wrap it so a missing file produces a clear error instead of an unhandled crash.',
              hintFull: 'Fix: wrap it in a try/except FileNotFoundError block with a clear error message.',
              codeBlock: [
                'config = open("config.yaml").read()  # crashes with an unhandled traceback if missing'
              ],
              buggyLineId: 0,
              correctFixPatterns: [/try:|except\s*FileNotFoundError/i]
            },
            {
              mode: 'triage_call',
              prompt: 'The Wraith weighs a script\'s power against its own risk: <strong>"A script needs elevated (root) privileges for one specific step, but not the rest. Pick your move, then justify it in one line."</strong>',
              damageIfCorrect: 24, damageIfOptimal: 40,
              hintNudge: 'Running the ENTIRE script as root means every line, including ones that don\'t need elevated access, runs with unnecessary privilege — a real, avoidable risk if anything in the script is ever compromised or buggy.',
              hintPartial: 'Run the script normally, and elevate privileges (e.g. via sudo) only for the specific step that genuinely needs it — running the entire script as root gives every line unnecessary privilege for no real benefit.',
              hintFull: 'Best: elevate privileges only for the specific step that needs it (e.g. a targeted sudo call), not the whole script — least privilege applies to scripts just as much as to IAM roles or service accounts.',
              options: [
                { id: 'a', label: 'Run the entire script as root, for simplicity', tier: 'wrong', why: 'Gives every line in the script unnecessary elevated privilege, even the parts that don\'t need it — a real, avoidable risk if anything is buggy or compromised.' },
                { id: 'b', label: 'Elevate privileges only for the specific step that needs it', tier: 'best', why: 'Applies least privilege at the script level — only the genuinely privileged operation runs with elevated access, nothing else.' },
                { id: 'c', label: 'Avoid the privileged step entirely, even if it means the script can\'t complete its job', tier: 'wrong', why: 'Sacrifices the script\'s actual purpose over a solvable privilege-scoping problem.' }
              ],
              justificationPatterns: [/least\s*privilege|specific\s*step|scoped\s*(sudo|elevat)/i]
            },
            {
              mode: 'triage_call',
              prompt: '<strong>"Deciding whether to log a script\'s output to stdout only, or also to a persistent log file. Pick your move, then justify it in one line."</strong>',
              damageIfCorrect: 24, damageIfOptimal: 40,
              hintNudge: 'stdout-only output is lost the moment the terminal session (or the process launching it, like cron) ends — a persistent log file survives for later investigation.',
              hintPartial: 'Write to a persistent log file (in addition to or instead of stdout) — stdout-only output vanishes the moment the session ends, which is a real problem for anything running unattended (like via cron) that might need investigating later.',
              hintFull: 'Best: log to a persistent file — this is essential for anything running unattended (cron, background jobs), since stdout-only output is lost the instant the launching process ends, right when you\'d most want to investigate afterward.',
              options: [
                { id: 'a', label: 'stdout only, since it\'s simpler', tier: 'wrong', why: 'Output vanishes the moment the launching process (like cron) ends — exactly when you\'d most want to investigate what happened.' },
                { id: 'b', label: 'A persistent log file, at minimum', tier: 'best', why: 'Survives past the process ending, making later investigation of an unattended script\'s behavior actually possible.' },
                { id: 'c', label: 'Neither — rely on the script\'s exit code alone', tier: 'wrong', why: 'An exit code tells you pass/fail but nothing about WHY — real investigation needs actual log detail.' }
              ],
              justificationPatterns: [/persistent\s*log|survives|investigat/i]
            },
            {
              mode: 'read_the_room',
              prompt: 'A shadow lingers long after its summoner has left. <strong>A background process spawned by a script keeps running long after the script itself exited. Diagnose it, then fix it.</strong>',
              damageIfCorrect: 24, damageIfOptimal: 40,
              hintNudge: 'A backgrounded child process (with &) isn\'t automatically tied to the parent script\'s lifetime unless something explicitly manages that relationship.',
              hintPartial: 'The background process was launched with & but nothing tracks or terminates it when the parent script exits — it keeps running independently, orphaned.',
              hintFull: 'Diagnosis: the background process isn\'t tied to the parent script\'s lifecycle. Fix: capture its PID ($!) and explicitly kill it in a trap on the parent script\'s exit, or use a process supervisor that manages this relationship.',
              outputBlock: [
                '$ ps aux | grep background_task',
                '(the process is still running, 2 hours after the launching script exited)'
              ],
              acceptableDiagnosesPatterns: [/not\s*tied.*(lifecycle|lifetime)/i, /orphan(ed)?/i],
              followUpFix: {
                prompt: 'Fix it by capturing the PID and killing it on script exit:',
                acceptablePatterns: [],
                optimalPatterns: [/\$!|trap.*kill/i]
              }
            },
            {
              mode: 'read_the_room',
              prompt: 'A well grows shallow with every visit, unnoticed. <strong>A log file that a script appends to has grown to fill the entire disk over several months. Diagnose it, then fix it.</strong>',
              damageIfCorrect: 24, damageIfOptimal: 40,
              hintNudge: 'A script that appends to a log forever with no rotation or size limit will eventually consume all available disk space.',
              hintPartial: 'The script has been appending to the same log file indefinitely with no rotation or size cap — nothing was ever in place to bound its growth.',
              hintFull: 'Diagnosis: unbounded log growth with no rotation. Fix: set up log rotation (e.g. logrotate) so the file is periodically truncated/archived, and free up the current disk space.',
              outputBlock: [
                '$ df -h',
                '/ 100% full',
                '$ ls -lh /var/log/app.log',
                '48G'
              ],
              acceptableDiagnosesPatterns: [/no\s*(log\s*)?rotation/i, /unbounded\s*(growth|log)/i],
              followUpFix: {
                prompt: 'Fix it by setting up log rotation:',
                acceptablePatterns: [],
                optimalPatterns: [/logrotate|log\s*rotation/i]
              }
            },
            {
              mode: 'build_the_pipeline',
              prompt: 'The Wraith weaves a checklist from broken threads. <strong>Sequence the correct order for making a script safely retry a flaky operation.</strong>',
              steps: [
                'Identify the specific operation that\'s genuinely flaky',
                'Wrap it in a retry loop with a maximum attempt count',
                'Add an increasing delay (backoff) between attempts',
                'Log each failed attempt before retrying',
                'Fail loudly with a clear error if all attempts are exhausted'
              ],
              damageIfCorrect: 26, damageIfOptimal: 42,
              damageToHeroIfWrong: 22
            },
            {
              mode: 'build_the_pipeline',
              prompt: 'A second checklist forms from the fray. <strong>Sequence the correct order for adding graceful shutdown handling to a long-running script.</strong>',
              steps: [
                'Identify what state needs to be safely saved/closed on shutdown',
                'Write a cleanup function that handles that state',
                'Trap SIGTERM (and SIGINT) to call the cleanup function',
                'Test that sending the signal actually triggers clean shutdown'
              ],
              damageIfCorrect: 26, damageIfOptimal: 42,
              damageToHeroIfWrong: 22
            },
            {
              mode: 'terminal',
              prompt: 'The Wraith checks whether a ritual actually finished, or merely paused: <strong>"Run a command in the background and immediately print its process ID."</strong>',
              damageIfCorrect: 20, damageIfOptimal: 32,
              hintNudge: 'A special variable holds the PID of the most recently backgrounded job.',
              hintPartial: './script.sh & echo $_',
              hintFull: './script.sh & echo $!',
              acceptablePatterns: [],
              optimalPatterns: [/^\.\/script\.sh\s*&\s*echo\s+\$!$/i],
              baseCmds: ['./script.sh']
            },
            {
              mode: 'terminal',
              prompt: 'It writes a message that arrives whichever way the wind blows: <strong>"In Python, use a context manager (with statement) to safely open and read a file <code>config.yaml</code>."</strong>',
              damageIfCorrect: 20, damageIfOptimal: 32,
              hintNudge: 'A with-block around open(), reading the file inside it.',
              hintPartial: 'with open("config.yaml") as f: data = f.____()',
              hintFull: 'with open("config.yaml") as f: data = f.read()',
              acceptablePatterns: [],
              optimalPatterns: [/with\s+open\("config\.yaml"\)\s+as\s+f:\s*data\s*=\s*f\.read\(\)/i],
              baseCmds: []
            },
            {
              mode: 'spot_the_bug',
              prompt: 'A crooked ritual assumes the world never changes shape. <strong>"This script parses command output assuming a fixed column layout, which breaks when the tool\'s output format changes. Find and fix the bug."</strong>',
              damageIfCorrect: 22, damageIfOptimal: 36,
              hintNudge: 'Parsing by fixed column position is fragile — a structured output format (like JSON, if the tool supports it) is far more robust to change.',
              hintPartial: 'Line 1 assumes a fixed column position that broke when the tool\'s output format changed — use the tool\'s structured (e.g. JSON) output mode instead, if it has one.',
              hintFull: 'Fix: use the tool\'s --json flag and parse with jq instead of relying on fixed column positions.',
              codeBlock: [
                'docker ps | awk \'{print $1}\'  # column position, breaks if docker changes its default output format'
              ],
              buggyLineId: 0,
              correctFixPatterns: [/--format|--json|jq/i]
            },
            {
              mode: 'spot_the_bug',
              prompt: 'A crooked script waits on a promise that was never truly kept. <strong>"This script assumes a service is ready immediately after starting it, with no actual readiness check. Find and fix the bug."</strong>',
              damageIfCorrect: 22, damageIfOptimal: 36,
              hintNudge: 'A service process starting doesn\'t mean it\'s actually ready to accept connections — check for a real readiness signal instead of just assuming it after a fixed delay.',
              hintPartial: 'Line 1 starts the service then immediately assumes it\'s ready — poll an actual health/readiness endpoint (with a timeout) instead of assuming readiness right away.',
              hintFull: 'Fix: poll the service\'s health endpoint in a retry loop until it responds, instead of assuming instant readiness.',
              codeBlock: [
                'systemctl start myapp; curl localhost:8080/api  # assumes instant readiness, no actual check'
              ],
              buggyLineId: 0,
              correctFixPatterns: [/poll|retry.*health|wait.*ready/i]
            },
            {
              mode: 'triage_call',
              prompt: 'The Wraith weighs a whisper of trust against a shout of proof: <strong>"Deciding whether a deploy script should assume a downstream step succeeded, or explicitly verify it. Pick your move, then justify it in one line."</strong>',
              damageIfCorrect: 24, damageIfOptimal: 40,
              hintNudge: 'A command "running without erroring" and "actually achieving its intended effect" are genuinely different things — explicit verification catches the gap between them.',
              hintPartial: 'Explicitly verify the actual intended outcome (e.g. the new version is actually serving traffic), not just that the deploy command itself didn\'t error — a command can exit successfully while still not achieving what was actually intended.',
              hintFull: 'Best: explicitly verify the real outcome after each critical step — a command exiting without error isn\'t the same guarantee as the step actually having its intended effect, and a deploy script should catch that gap rather than assume it away.',
              options: [
                { id: 'a', label: 'Assume success if the command doesn\'t return an error', tier: 'wrong', why: 'A command not erroring and a step actually achieving its intended effect are genuinely different things — this gap is exactly where silent deploy failures happen.' },
                { id: 'b', label: 'Explicitly verify the actual intended outcome after each critical step', tier: 'best', why: 'Catches the real gap between "the command ran" and "the step actually worked" — the thing that actually matters for a deploy script.' },
                { id: 'c', label: 'Only verify the very final step, trust everything before it', tier: 'defensible', why: 'Better than nothing, but an earlier silent failure could still cascade into a confusing final-step failure that\'s harder to diagnose than catching it at its actual source.' }
              ],
              justificationPatterns: [/verify.*(outcome|actual)|gap.*(ran|worked)/i]
            },
            {
              mode: 'triage_call',
              prompt: '<strong>"Deciding how a script should behave when a required environment variable is missing: use a silent default, or fail loudly. Pick your move, then justify it in one line."</strong>',
              damageIfCorrect: 24, damageIfOptimal: 40,
              hintNudge: 'A silent default for something genuinely required can mask a real configuration mistake, letting the script run against the wrong target (e.g. the wrong environment) without anyone noticing.',
              hintPartial: 'Fail loudly with a clear error for a genuinely required variable — a silent default can mask a real configuration mistake, letting the script quietly run against an unintended target instead of surfacing the problem immediately.',
              hintFull: 'Best: fail loudly and immediately for a genuinely required variable — a silent default trades a clear, immediate error for a confusing, potentially dangerous silent misconfiguration (like accidentally deploying to the wrong environment).',
              options: [
                { id: 'a', label: 'Use a silent, reasonable-sounding default', tier: 'wrong', why: 'Can mask a real configuration mistake — the script silently runs against an unintended target instead of surfacing the problem immediately.' },
                { id: 'b', label: 'Fail loudly and immediately with a clear error message', tier: 'best', why: 'Surfaces a genuine configuration mistake right away, rather than letting the script silently proceed against a possibly-wrong target.' },
                { id: 'c', label: 'Log a warning but continue with an empty value', tier: 'wrong', why: 'A warning that\'s easy to miss in scrollback still lets the script proceed with a genuinely broken configuration.' }
              ],
              justificationPatterns: [/fail\s*loud|clear\s*error|mask.*mistake/i]
            },
            {
              mode: 'triage_call',
              prompt: '<strong>"Deciding whether a script that modifies production data should have a dry-run mode. Pick your move, then justify it in one line."</strong>',
              damageIfCorrect: 24, damageIfOptimal: 40,
              hintNudge: 'A dry-run mode lets you see exactly what a script WOULD do before it actually does it — the same value proposition as terraform plan before apply.',
              hintPartial: 'Add a dry-run mode that shows exactly what changes would be made without actually making them — the same principle as terraform plan, letting you catch a mistake before it touches real production data.',
              hintFull: 'Best: add a dry-run mode — it lets you (or a reviewer) see exactly what the script would do to production data before committing to it, catching mistakes before they happen rather than after.',
              options: [
                { id: 'a', label: 'Add a dry-run mode that shows intended changes without applying them', tier: 'best', why: 'Lets a mistake be caught by reviewing intended changes beforehand, the same value a plan step provides before any real apply.' },
                { id: 'b', label: 'Skip dry-run — just run it carefully and review the code first', tier: 'defensible', why: 'A code review helps, but doesn\'t show the ACTUAL data-specific changes a run would make — a dry-run against real (or realistic) data catches things a code review alone can miss.' },
                { id: 'c', label: 'Test it against a copy of production data instead of adding dry-run', tier: 'defensible', why: 'A reasonable additional safeguard, but doesn\'t replace the value of a built-in dry-run mode for every future run, not just the initial test.' }
              ],
              justificationPatterns: [/dry-?run|preview.*change|plan\s*step/i]
            },
            {
              mode: 'read_the_room',
              prompt: 'A ritual insists the sun still shines when it has already set. <strong>A script that checks a remote service\'s health always reports "healthy," even during a real outage. Diagnose it, then fix it.</strong>',
              damageIfCorrect: 24, damageIfOptimal: 40,
              hintNudge: 'Check exactly what the health check is actually verifying — a check that only confirms a TCP connection succeeded says nothing about whether the application behind it is actually working correctly.',
              hintPartial: 'The health check only confirms the port accepts a TCP connection, not that the application behind it is actually functioning — during the outage, the port was still open even though the app itself was broken.',
              hintFull: 'Diagnosis: the health check verifies TCP connectivity only, not actual application health. Fix: check a real application-level health endpoint that reflects genuine functional status, not just "something is listening on the port."',
              outputBlock: [
                '$ (health check script) nc -zv service 443 && echo "healthy"',
                '(reports healthy throughout a real outage where the app itself was returning 500s)'
              ],
              acceptableDiagnosesPatterns: [/tcp\s*(connectivity\s*)?only/i, /not\s*(actual|real)\s*(application\s*)?health/i],
              followUpFix: {
                prompt: 'Fix it by checking a real application-level health endpoint:',
                acceptablePatterns: [],
                optimalPatterns: [/health\s*endpoint|application-level/i]
              }
            },
            {
              mode: 'read_the_room',
              prompt: 'A ritual that once flowed smoothly now stumbles on its own count. <strong>A Python script that processes a list occasionally raises an IndexError partway through, but only on certain inputs. Diagnose it, then fix it.</strong>',
              damageIfCorrect: 24, damageIfOptimal: 40,
              hintNudge: 'Check whether the script assumes a list always has a certain minimum length, without actually checking before accessing an index.',
              hintPartial: 'The script accesses a specific list index assuming it always exists, but some inputs produce a shorter list than expected — nothing checks the length before accessing that index.',
              hintFull: 'Diagnosis: the script accesses a list index without checking the list is long enough first. Fix: add a length check (or use .get()-style safe access) before accessing the index, and handle the short-list case explicitly.',
              outputBlock: [
                '$ python3 process.py',
                'IndexError: list index out of range',
                '(happens only for inputs producing fewer than expected items)'
              ],
              acceptableDiagnosesPatterns: [/no\s*length\s*check/i, /assum.*(length|index\s*exists)/i],
              followUpFix: {
                prompt: 'Fix it by adding a length check before accessing the index:',
                acceptablePatterns: [],
                optimalPatterns: [/len\(.*\)|length\s*check/i]
              }
            },
            {
              mode: 'read_the_room',
              prompt: 'A tool the ritual depends on has quietly changed its shape. <strong>A script that\'s worked for months suddenly breaks after a routine OS package update, with no code changes at all. Diagnose it, then fix it.</strong>',
              damageIfCorrect: 24, damageIfOptimal: 40,
              hintNudge: 'A system tool the script depends on may have changed its default behavior or output format in the update — check the tool\'s own changelog for what changed.',
              hintPartial: 'A system utility the script depends on (and parses the output of) changed its default output format or behavior in the OS update, and the script was never written to be resilient to that.',
              hintFull: 'Diagnosis: an OS package update changed a dependency\'s behavior/output format the script relied on. Fix: check that tool\'s changelog for the specific change, update the script\'s parsing/usage accordingly, and prefer structured output modes where available to be more resilient to future changes.',
              outputBlock: [
                '$ ./script.sh',
                '(parsing error — expected output format from a system tool no longer matches)',
                '(only change: a routine "apt upgrade" ran overnight)'
              ],
              acceptableDiagnosesPatterns: [/os\s*(package\s*)?update.*(changed|broke)/i, /dependency.*behavior\s*changed/i],
              followUpFix: {
                prompt: 'Fix it by updating the parsing and preferring structured output going forward:',
                acceptablePatterns: [],
                optimalPatterns: [/structured\s*output|--json|changelog/i]
              }
            }
          ]
        },
        {
          name: 'Level 4 — Real Incidents',
          hp: 175,
          questions: [
            {
              mode: 'terminal',
              prompt: 'The Wraith checks who else lingers in the ritual space: <strong>"Find every running process matching the name \'backup\'."</strong>',
              damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 32,
              hintNudge: 'pgrep matches process names directly, no piping needed.',
              hintPartial: 'pgrep _______',
              hintFull: 'pgrep backup',
              acceptablePatterns: [/^ps\s+aux\s*\|\s*grep\s+backup$/i],
              optimalPatterns: [/^pgrep\s+backup$/i],
              baseCmds: ['pgrep', 'ps']
            },
            {
              mode: 'terminal',
              prompt: 'It silences a runaway echo before it consumes everything: <strong>"Forcefully kill the process with PID 4821."</strong>',
              damageIfCorrect: 18, damageIfOptimal: 28, timeAllotted: 32,
              hintNudge: 'kill with the strongest signal, then the PID.',
              hintPartial: 'kill -_ 4821',
              hintFull: 'kill -9 4821',
              acceptablePatterns: [/^kill\s+4821$/i],
              optimalPatterns: [/^kill\s+-9\s+4821$/i],
              baseCmds: ['kill']
            },
            {
              mode: 'terminal',
              prompt: 'The Wraith checks exactly how a script actually died: <strong>"Run <code>backup.sh</code> and print its exit code immediately after."</strong>',
              damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 32,
              hintNudge: 'Run the script, then reference the exit-code variable right after.',
              hintPartial: './backup.sh; echo $_',
              hintFull: './backup.sh; echo $?',
              acceptablePatterns: [],
              optimalPatterns: [/^\.\/backup\.sh;\s*echo\s+\$\?$/i],
              baseCmds: ['./backup.sh']
            },
            {
              mode: 'spot_the_bug',
              prompt: 'A crooked ritual runs twice, tangling itself. <strong>"This cron job has no protection against a slow run overlapping with the next scheduled trigger. Find and fix the bug."</strong>',
              damageIfCorrect: 22, damageIfOptimal: 36, timeAllotted: 32,
              hintNudge: 'A long-running job scheduled frequently can still be executing when the next trigger fires — a lock prevents a second overlapping instance.',
              hintPartial: 'Line 1 has no locking at all — wrap the actual work in a flock-guarded block so a second trigger exits immediately if the first is still running.',
              hintFull: 'Fix: flock -n /tmp/backup.lock ./backup.sh',
              codeBlock: [
                '*/5 * * * * /home/dev/backup.sh  # sometimes takes 10+ minutes, scheduled every 5'
              ],
              buggyLineId: 0,
              correctFixPatterns: [/flock/i]
            },
            {
              mode: 'spot_the_bug',
              prompt: 'A crooked script assumes the vault is always unlocked. <strong>"This script assumes an API call always succeeds, with no error handling for a failed request. Find and fix the bug."</strong>',
              damageIfCorrect: 22, damageIfOptimal: 36, timeAllotted: 32,
              hintNudge: 'A network call with no status-code check will silently treat a failed request as if it succeeded.',
              hintPartial: 'Line 1 never checks curl\'s success — add a failure check (like curl -f, or explicit status-code handling) so a failed request is actually noticed.',
              hintFull: 'Fix: curl -f https://api.example.com/deploy || { echo "deploy failed"; exit 1; }',
              codeBlock: [
                'curl https://api.example.com/deploy  # response never checked at all'
              ],
              buggyLineId: 0,
              correctFixPatterns: [/curl\s+-f|status\s*code|exit\s*1/i]
            },
            {
              mode: 'spot_the_bug',
              prompt: 'A crooked script eats the very ground it stands on. <strong>"This cleanup script deletes files matching a pattern, but the pattern is dangerously broad. Find and fix the bug."</strong>',
              damageIfCorrect: 24, damageIfOptimal: 38, timeAllotted: 32,
              hintNudge: 'An overly broad glob or unquoted variable in an rm command is a classic, genuinely destructive mistake — check exactly what this pattern would actually match.',
              hintPartial: 'Line 1\'s pattern (or unquoted variable) could match far more than intended — scope it down to exactly the specific files meant to be deleted, and test with an echo first before ever running the real rm.',
              hintFull: 'Fix: scope the pattern precisely (e.g. rm -f /var/app/cache/*.tmp, not a bare wildcard) and always dry-run destructive patterns with echo first.',
              codeBlock: [
                'rm -rf $BASE_DIR/*  # $BASE_DIR unquoted and never validated for emptiness'
              ],
              buggyLineId: 0,
              correctFixPatterns: [/"\$BASE_DIR"|validat.*(empty|not\s*empty)/i]
            },
            {
              mode: 'triage_call',
              prompt: 'The Wraith watches a batch of souls vanish partway through: <strong>"A Python batch job crashes with an unhandled exception on item 500 of 1000, losing all progress. Pick your move, then justify it in one line."</strong>',
              damageIfCorrect: 26, damageIfOptimal: 42, timeAllotted: 32,
              hintNudge: 'The immediate fix is adding error handling so one bad item doesn\'t crash the whole batch — the deeper, related need is making progress resumable so a real crash doesn\'t lose everything already done.',
              hintPartial: 'Add per-item error handling (so one bad item is logged and skipped, not fatal to the whole run), and make progress trackable/resumable (e.g. checkpointing which items succeeded) so a genuine crash doesn\'t require redoing everything from scratch.',
              hintFull: 'Best: wrap per-item processing in error handling so one bad item doesn\'t crash the whole batch, and add checkpointing so progress is resumable — losing all 500 already-processed items to one bad item is a design gap, not just bad luck.',
              options: [
                { id: 'a', label: 'Add error handling around the specific line that crashed and re-run from the start', tier: 'defensible', why: 'Fixes the immediate crash, but still means re-processing all 1000 items from scratch on any future failure — a real, avoidable cost for a long batch job.' },
                { id: 'b', label: 'Add per-item error handling AND checkpointing for resumable progress', tier: 'best', why: 'Prevents one bad item from crashing the whole batch, and prevents a genuine crash from losing already-completed work — addresses both the immediate and the systemic gap.' },
                { id: 'c', label: 'Just add a global try/except around the entire batch loop', tier: 'wrong', why: 'A single try/except around everything can swallow the FIRST failure and then stop processing entirely, without any real handling or visibility into what specifically failed.' }
              ],
              justificationPatterns: [/per-item|checkpoint|resumable/i]
            },
            {
              mode: 'triage_call',
              prompt: '<strong>"A script that processes user-supplied filenames is discovered to be vulnerable to command injection. Pick your move, then justify it in one line."</strong>',
              damageIfCorrect: 26, damageIfOptimal: 42, timeAllotted: 32,
              hintNudge: 'Building shell commands via string concatenation with untrusted input is the actual root cause — the fix has to address that pattern, not just the one exploited case.',
              hintPartial: 'Fix the root cause — stop building shell command strings via concatenation with untrusted input, and use a safe API (e.g. Python\'s subprocess with an argument list, not shell=True with a concatenated string) that doesn\'t interpret the input as shell syntax at all.',
              hintFull: 'Best: eliminate string-concatenated shell commands with untrusted input entirely — use subprocess with an argument list (not shell=True), which passes arguments directly without shell interpretation, closing off command injection structurally rather than trying to sanitize every possible malicious input.',
              options: [
                { id: 'a', label: 'Add input validation to block obviously malicious-looking characters', tier: 'wrong', why: 'A blocklist approach is notoriously incomplete — trying to enumerate every dangerous character/pattern is a losing game compared to structurally avoiding shell interpretation.' },
                { id: 'b', label: 'Switch to a safe API (argument list, not shell string concatenation)', tier: 'best', why: 'Structurally eliminates the injection vector — arguments passed as a list are never interpreted as shell syntax, regardless of their content.' },
                { id: 'c', label: 'Leave it, since exploiting it requires knowing the exact script internals', tier: 'wrong', why: 'Relies on obscurity as a security measure — a real, known vulnerability class shouldn\'t be left in place based on an assumption about attacker knowledge.' }
              ],
              justificationPatterns: [/argument\s*list|shell=False|structurally|subprocess/i]
            },
            {
              mode: 'read_the_room',
              prompt: 'A ritual meant for one voice hears itself echoed by two. <strong>Two cron-triggered runs of the same backup script overlapped, and the resulting backup file is corrupted. Diagnose it, then fix it.</strong>',
              damageIfCorrect: 26, damageIfOptimal: 44, timeAllotted: 32,
              hintNudge: 'Check whether the job\'s actual runtime can occasionally exceed its scheduled interval, and whether anything prevents two instances from running concurrently.',
              hintPartial: 'The job occasionally runs longer than its scheduling interval, and with no lock preventing concurrent runs, two instances wrote to the same output file simultaneously.',
              hintFull: 'Diagnosis: no locking mechanism allowed two overlapping runs to write to the same file concurrently. Fix: add a lock (flock) so a run exits immediately if a previous instance is still active, and investigate why runtime occasionally exceeds the interval.',
              outputBlock: [
                '$ (cron logs) two runs started 5 minutes apart, first one still active when second started',
                '(backup file has interleaved, corrupted content from both runs)'
              ],
              acceptableDiagnosesPatterns: [/overlapping\s*run/i, /no\s*lock/i, /concurrent.*write/i],
              followUpFix: {
                prompt: 'Fix it by adding a lock mechanism to prevent overlap:',
                acceptablePatterns: [],
                optimalPatterns: [/flock|lock/i]
              }
            },
            {
              mode: 'read_the_room',
              prompt: 'A secret whispered too loudly, in a room full of listeners. <strong>A security review discovers a script\'s API key was visible in the process list while it ran. Diagnose it, then fix it.</strong>',
              damageIfCorrect: 26, damageIfOptimal: 44, timeAllotted: 32,
              hintNudge: 'A secret passed directly as a command-line argument is visible to anyone on the system who can view the process list — a real, common way credentials leak.',
              hintPartial: 'The API key was passed as a plain command-line argument to the script/command, which is visible to any user on the system running "ps" — a well-known way secrets leak even without direct file access.',
              hintFull: 'Diagnosis: the secret was passed as a visible command-line argument, exposed via the process list to any local user. Fix: pass it via an environment variable or stdin instead, neither of which shows up in a process listing.',
              outputBlock: [
                '$ ps aux | grep deploy',
                'deploy.sh --api-key=sk-abc123secret  (visible to any user on the system)'
              ],
              acceptableDiagnosesPatterns: [/process\s*list|visible.*(ps|command-line\s*argument)/i],
              followUpFix: {
                prompt: 'Fix it by passing the secret via environment variable instead:',
                acceptablePatterns: [],
                optimalPatterns: [/environment\s*variable|stdin/i]
              }
            },
            {
              mode: 'read_the_room',
              prompt: 'A ritual that once worked now stumbles over a foreign tongue. <strong>A script that processes text files starts crashing on files containing non-ASCII characters. Diagnose it, then fix it.</strong>',
              damageIfCorrect: 26, damageIfOptimal: 44, timeAllotted: 32,
              hintNudge: 'Check what encoding the script assumes when reading files — a script assuming plain ASCII (or the wrong encoding) will choke on genuinely non-ASCII content.',
              hintPartial: 'The script assumes ASCII (or an incorrect default encoding) when reading files, and genuinely non-ASCII content (like UTF-8 characters) causes a decode error.',
              hintFull: 'Diagnosis: the script assumes the wrong text encoding when reading files. Fix: explicitly open files with the correct encoding (e.g. encoding=\'utf-8\' in Python) rather than relying on a platform-dependent default.',
              outputBlock: [
                '$ python3 script.py',
                'UnicodeDecodeError: \'ascii\' codec can\'t decode byte 0xc3'
              ],
              acceptableDiagnosesPatterns: [/encoding.*(wrong|assum|ascii)/i, /unicodedecodeerror/i],
              followUpFix: {
                prompt: 'Fix it by explicitly specifying the correct encoding:',
                acceptablePatterns: [],
                optimalPatterns: [/encoding\s*=\s*['"]utf-8['"]/i]
              }
            },
            {
              mode: 'build_the_pipeline',
              prompt: 'The Wraith draws its final tangled thread. <strong>Sequence the correct order for diagnosing a cron job that silently stopped running.</strong>',
              steps: [
                'Confirm the crontab entry itself still exists and is correctly scheduled',
                'Check the system\'s cron logs for whether it actually triggered',
                'Check the job\'s own output/log for what happened after it triggered',
                'Reproduce by running the exact same command manually as the cron user'
              ],
              damageIfCorrect: 28, damageIfOptimal: 46, timeAllotted: 32,
              damageToHeroIfWrong: 24
            },
            {
              mode: 'build_the_pipeline',
              prompt: 'A second thread, drawn under real pressure. <strong>Sequence the correct order for responding to a script found to be vulnerable to command injection.</strong>',
              steps: [
                'Confirm the actual scope — where the vulnerable pattern is used',
                'Assess whether it has ever actually been exploited',
                'Rewrite the vulnerable code using a safe argument-list API',
                'Test that the fix doesn\'t break legitimate use cases',
                'Audit other scripts for the same vulnerable pattern'
              ],
              damageIfCorrect: 28, damageIfOptimal: 46, timeAllotted: 32,
              damageToHeroIfWrong: 24
            },
            {
              mode: 'terminal',
              prompt: 'The Wraith checks the true weight a ritual leaves behind: <strong>"Check how much memory the process with PID 4821 is currently using."</strong>',
              damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 32,
              hintNudge: 'ps with fields for PID and memory usage, filtered to that specific PID.',
              hintPartial: 'ps -p 4821 -o ___',
              hintFull: 'ps -p 4821 -o rss',
              acceptablePatterns: [/^ps\s+aux\s*\|\s*grep\s+4821$/i],
              optimalPatterns: [/^ps\s+-p\s+4821\s+-o\s+rss$/i],
              baseCmds: ['ps']
            },
            {
              mode: 'terminal',
              prompt: 'It reads a ghost\'s final words before it faded: <strong>"Show the last 50 lines of the system journal for a service called <code>myapp</code>."</strong>',
              damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 32,
              hintNudge: 'journalctl, filtered by unit, with a line-count flag.',
              hintPartial: 'journalctl -u myapp -n __',
              hintFull: 'journalctl -u myapp -n 50',
              acceptablePatterns: [],
              optimalPatterns: [/^journalctl\s+-u\s+myapp\s+-n\s+50$/i],
              baseCmds: ['journalctl']
            },
            {
              mode: 'spot_the_bug',
              prompt: 'A crooked ritual devours its own house from within. <strong>"This script has an infinite loop with no exit condition that\'s ever actually reachable. Find and fix the bug."</strong>',
              damageIfCorrect: 22, damageIfOptimal: 36, timeAllotted: 32,
              hintNudge: 'Check whether the loop\'s condition variable is ever actually updated inside the loop body — if not, it can never become false.',
              hintPartial: 'Line 1\'s loop checks a flag that\'s never actually modified anywhere inside the loop body — it can genuinely never exit on its own.',
              hintFull: 'Fix: actually update the condition variable inside the loop, e.g. based on real completion criteria.',
              codeBlock: [
                'DONE=false; while [ "$DONE" = false ]; do echo "working..."; done  # DONE is never set to true anywhere'
              ],
              buggyLineId: 0,
              correctFixPatterns: [/DONE=true/i]
            },
            {
              mode: 'spot_the_bug',
              prompt: 'A crooked script spawns a thousand copies of itself. <strong>"This script recursively calls itself with no base case, risking a runaway process explosion. Find and fix the bug."</strong>',
              damageIfCorrect: 22, damageIfOptimal: 36, timeAllotted: 32,
              hintNudge: 'A recursive call with no actual terminating condition will keep calling itself indefinitely, spawning processes until the system runs out of resources.',
              hintPartial: 'Line 1 calls itself unconditionally with no base case — add a real terminating condition (like a maximum depth or a genuine completion check).',
              hintFull: 'Fix: add a base case, e.g. if [ "$1" -ge "$MAX_DEPTH" ]; then exit 0; fi before the recursive call.',
              codeBlock: [
                './retry.sh  # calls itself unconditionally at the end, with no base case at all'
              ],
              buggyLineId: 0,
              correctFixPatterns: [/base\s*case|max_depth|exit\s*0/i]
            },
            {
              mode: 'spot_the_bug',
              prompt: 'A crooked script forgets it was ever given a warning. <strong>"This script catches an exception but does nothing with it, silently swallowing real errors. Find and fix the bug."</strong>',
              damageIfCorrect: 22, damageIfOptimal: 36, timeAllotted: 32,
              hintNudge: 'An empty except block silently discards the actual error, making failures invisible instead of handled.',
              hintPartial: 'Line 1\'s except block does nothing at all — at minimum, log the actual exception so the failure is visible instead of silently discarded.',
              hintFull: 'Fix: except Exception as e: logging.error(f"Failed: {e}")',
              codeBlock: [
                'try:\n    process_item(item)\nexcept Exception:\n    pass  # silently discards every error'
              ],
              buggyLineId: 2,
              correctFixPatterns: [/logging\.error|log.*exception/i]
            },
            {
              mode: 'triage_call',
              prompt: 'The Wraith watches a whisper turn into a scream unheard: <strong>"A script silently fails for weeks before anyone notices, because its only failure signal was an exit code nobody checked. Pick your move, then justify it in one line."</strong>',
              damageIfCorrect: 24, damageIfOptimal: 40, timeAllotted: 32,
              hintNudge: 'A script\'s exit code alone is only useful if SOMETHING actually watches it — the real gap here is the absence of active monitoring/alerting, not the exit code being wrong.',
              hintPartial: 'Add active monitoring/alerting on the script\'s outcome (e.g. a monitoring check that pages if it fails or doesn\'t run), rather than relying on an exit code that nothing was actually watching — an unwatched signal provides zero real value.',
              hintFull: 'Best: add active monitoring that alerts on failure (or on the job simply not running when expected) — an exit code is only useful if something actually watches it; this incident shows nothing was.',
              options: [
                { id: 'a', label: 'Add active monitoring/alerting on the script\'s actual outcome', tier: 'best', why: 'Directly closes the real gap — an exit code nobody watches provides zero actual value; active alerting ensures a failure is actually noticed.' },
                { id: 'b', label: 'Just make the exit code more descriptive', tier: 'wrong', why: 'Doesn\'t address the real problem — a more descriptive exit code still provides zero value if nothing is watching it.' },
                { id: 'c', label: 'Have someone manually check the script\'s logs every day', tier: 'defensible', why: 'Works, but depends on a human remembering every single day — exactly the kind of dependency automated alerting exists to remove.' }
              ],
              justificationPatterns: [/active\s*monitoring|alert(ing)?|nothing\s*watch/i]
            },
            {
              mode: 'triage_call',
              prompt: '<strong>"A script that ran fine for a year suddenly starts producing subtly wrong output, with no code or dependency changes. Pick your move, then justify it in one line."</strong>',
              damageIfCorrect: 24, damageIfOptimal: 40, timeAllotted: 32,
              hintNudge: 'If neither the code nor its dependencies changed, the most likely culprit is a change in the INPUT DATA itself — check whether the actual data being processed has shifted in some way.',
              hintPartial: 'Investigate whether the actual input data has changed in some way (a new edge case, a format shift upstream, a new data range) — with no code or dependency changes, the data itself is the most likely remaining variable.',
              hintFull: 'Best: investigate the input data first — with code and dependencies ruled out, a genuine shift in the data being processed (new edge cases, a format change further upstream) is the most likely remaining explanation for subtly wrong output.',
              options: [
                { id: 'a', label: 'Investigate whether the input data itself has changed in some way', tier: 'best', why: 'With code and dependencies both ruled out, the data itself is the most likely remaining variable that could explain a real behavior shift.' },
                { id: 'b', label: 'Assume it\'s a rare, unreproducible fluke and move on', tier: 'wrong', why: 'Dismisses a real, ongoing wrong-output issue without investigating an actual likely explanation.' },
                { id: 'c', label: 'Rewrite the entire script from scratch, assuming the old code was always subtly wrong', tier: 'wrong', why: 'A drastic, unjustified action given the script worked correctly for a full year with no reported issues before this.' }
              ],
              justificationPatterns: [/input\s*data|data\s*(itself\s*)?changed|upstream/i]
            },
            {
              mode: 'triage_call',
              prompt: '<strong>"A shared cron server running dozens of scripts from different teams is discovered to have wildly inconsistent security practices across those scripts. Pick your move, then justify it in one line."</strong>',
              damageIfCorrect: 24, damageIfOptimal: 40, timeAllotted: 32,
              hintNudge: 'A shared server means one team\'s poorly-secured script is a real risk to every other team\'s scripts running on the same machine — a baseline standard for anything on shared infrastructure closes that gap.',
              hintPartial: 'Establish and enforce a minimum security baseline (secret handling, least-privilege execution, logging) for anything running on shared infrastructure — one team\'s poorly-secured script is a real risk to every other team sharing that same machine.',
              hintFull: 'Best: establish a mandatory minimum security baseline for anything on shared infrastructure — a single poorly-secured script (leaking secrets, running as root unnecessarily) creates real risk for every OTHER team\'s scripts sharing that same machine, not just its own team.',
              options: [
                { id: 'a', label: 'Let each team maintain their own security practices independently', tier: 'wrong', why: 'On SHARED infrastructure, one team\'s poor practices create real risk for every other team\'s scripts on the same machine — this isn\'t a purely per-team concern.' },
                { id: 'b', label: 'Establish and enforce a minimum security baseline for shared infrastructure', tier: 'best', why: 'Directly addresses the actual risk — shared infrastructure means one team\'s weak practices are everyone\'s exposure, warranting a mandatory baseline.' },
                { id: 'c', label: 'Move every team to fully separate, isolated servers immediately', tier: 'defensible', why: 'Solves the sharing problem, but a full infrastructure migration is a large undertaking when a baseline standard addresses the actual risk directly.' }
              ],
              justificationPatterns: [/shared\s*infrastructure|minimum\s*baseline|everyone'?s\s*exposure/i]
            },
            {
              mode: 'triage_call',
              prompt: '<strong>"A critical automation script\'s sole author leaves the company with no documentation of how it works. Pick your move, then justify it in one line."</strong>',
              damageIfCorrect: 24, damageIfOptimal: 40, timeAllotted: 32,
              hintNudge: 'The immediate priority is understanding the script well enough to safely maintain it; the systemic fix is making sure no single script\'s sole knowledge lives in one person\'s head going forward.',
              hintPartial: 'Prioritize reverse-engineering and documenting the script\'s actual behavior now (before any change is needed under pressure), and treat this as the reason to establish a "no single point of knowledge failure" policy for critical scripts going forward.',
              hintFull: 'Best: invest in understanding and documenting the script now, while there\'s no active pressure, rather than waiting until an urgent change is needed and nobody understands it — and use this incident to justify a broader policy against critical scripts having only one person who understands them.',
              options: [
                { id: 'a', label: 'Leave it alone and only investigate if it ever actually breaks', tier: 'wrong', why: 'Means the first time anyone investigates is under real production pressure, with zero existing understanding — the worst possible time to start.' },
                { id: 'b', label: 'Proactively document and understand it now, while there\'s no pressure', tier: 'best', why: 'Builds real understanding before it\'s urgently needed, and the incident itself justifies preventing this single-point-of-knowledge risk for other critical scripts too.' },
                { id: 'c', label: 'Rewrite it from scratch immediately, since nobody understands the original', tier: 'wrong', why: 'A risky action for a script that\'s apparently been working — understanding it first is safer than blindly replacing something that currently functions.' }
              ],
              justificationPatterns: [/document.*now|proactive(ly)?|single\s*point\s*of\s*knowledge/i]
            },
            {
              mode: 'read_the_room',
              prompt: 'A vault meant for one key now answers to any that\'s offered. <strong>An audit discovers a deploy script accepts an API token via an insecure, unauthenticated HTTP endpoint. Diagnose it, then fix it.</strong>',
              damageIfCorrect: 26, damageIfOptimal: 44, timeAllotted: 32,
              hintNudge: 'A token accepted over plain HTTP (not HTTPS) is visible to anyone who can observe network traffic — and with no authentication, anyone reaching the endpoint at all can potentially trigger the deploy.',
              hintPartial: 'The endpoint accepts the token over plain, unencrypted HTTP (exposing it to network eavesdropping) and has no authentication of its own — anyone who can reach it at all can potentially trigger a deploy or intercept the token.',
              hintFull: 'Diagnosis: the endpoint uses unencrypted HTTP with no authentication, exposing both the token and the deploy trigger itself. Fix: move to HTTPS, and add real authentication (e.g. a signed request or a separate, properly-secured credential) on the endpoint itself.',
              outputBlock: [
                '$ curl http://deploy-internal:8080/trigger?token=abc123',
                '(works with no authentication check, over plain HTTP)'
              ],
              acceptableDiagnosesPatterns: [/plain\s*http|unencrypted|no\s*authentication/i],
              followUpFix: {
                prompt: 'Fix it by moving to HTTPS with real authentication:',
                acceptablePatterns: [],
                optimalPatterns: [/https|authentication/i]
              }
            },
            {
              mode: 'read_the_room',
              prompt: 'A well that once ran clear now runs dry without warning. <strong>A long-running Python script\'s memory usage grows continuously until it\'s killed by the OS. Diagnose it, then fix it.</strong>',
              damageIfCorrect: 26, damageIfOptimal: 44, timeAllotted: 32,
              hintNudge: 'Continuously growing memory in a long-running process is the classic signature of a memory leak — commonly from something (like a list or cache) that keeps accumulating without ever being cleared.',
              hintPartial: 'Something in the script accumulates in memory over time without ever being released (e.g. appending to a list that\'s never cleared, or an unbounded cache) — a classic memory leak pattern in a long-running process.',
              hintFull: 'Diagnosis: an unbounded accumulating data structure is causing a memory leak. Fix: identify the specific accumulating structure (via a memory profiler), and bound it (e.g. clear periodically, use a size-limited cache) or eliminate the unnecessary retention.',
              outputBlock: [
                '$ (memory usage over 6 hours) 200MB -> 1.2GB -> 4.8GB -> OOM killed',
                '(same script, same workload pattern the whole time)'
              ],
              acceptableDiagnosesPatterns: [/memory\s*leak/i, /accumulat.*(memory|unbounded)/i],
              followUpFix: {
                prompt: 'Fix it by identifying and bounding the accumulating structure:',
                acceptablePatterns: [],
                optimalPatterns: [/profiler|bound.*(cache|structure)|clear\s*periodically/i]
              }
            },
            {
              mode: 'read_the_room',
              prompt: 'A ritual meant to run once quietly repeats itself into chaos. <strong>A retry-with-backoff script ends up making the outage it was retrying against worse, by hammering the struggling service with a synchronized wave of retries. Diagnose it, then fix it.</strong>',
              damageIfCorrect: 26, damageIfOptimal: 44, timeAllotted: 32,
              hintNudge: 'If every failing instance retries with the EXACT same backoff schedule, they all hit the struggling service again at the exact same moments — a classic "thundering herd" pattern that backoff alone doesn\'t fix.',
              hintPartial: 'Every failing instance uses the identical, deterministic backoff schedule, so they all retry in synchronized waves that hit the already-struggling service at the same moments — plain backoff without randomization doesn\'t prevent this "thundering herd" effect.',
              hintFull: 'Diagnosis: synchronized retries from many instances using identical backoff timing created a thundering-herd effect on the already-struggling service. Fix: add jitter (randomization) to the backoff delay so retries from different instances spread out over time instead of arriving in synchronized waves.',
              outputBlock: [
                '$ (service load during the retry storm) request rate spikes far above pre-outage levels',
                '(every client uses the exact same fixed backoff schedule: 1s, 2s, 4s, 8s)'
              ],
              acceptableDiagnosesPatterns: [/thundering\s*herd/i, /synchronized\s*retr(y|ies)/i],
              followUpFix: {
                prompt: 'Fix it by adding jitter to the backoff delay:',
                acceptablePatterns: [],
                optimalPatterns: [/jitter|randomiz/i]
              }
            }
          ]
        },
        {
          name: 'Level 5 — Interview-Caliber Judgment',
          hp: 195,
          questions: [
            {
              mode: 'terminal',
              prompt: 'The Wraith audits every ghost still lingering: <strong>"List all background jobs currently running in this shell session."</strong>',
              damageIfCorrect: 20, damageIfOptimal: 34,
              hintNudge: 'A shell builtin that lists jobs started in the current session.',
              hintPartial: 'j___',
              hintFull: 'jobs',
              acceptablePatterns: [],
              optimalPatterns: [/^jobs$/i],
              baseCmds: ['jobs']
            },
            {
              mode: 'terminal',
              prompt: 'It checks a script for danger before it ever runs: <strong>"Statically check a Python script <code>deploy.py</code> for common bugs, without executing it."</strong>',
              damageIfCorrect: 22, damageIfOptimal: 36,
              hintNudge: 'A well-known Python static-analysis linter.',
              hintPartial: 'p_____ deploy.py',
              hintFull: 'pylint deploy.py',
              acceptablePatterns: [/^flake8\s+deploy\.py$/i],
              optimalPatterns: [/^pylint\s+deploy\.py$/i],
              baseCmds: ['pylint', 'flake8']
            },
            {
              mode: 'spot_the_bug',
              prompt: 'A crooked design gives every ghost the same true name. <strong>"This script hardcodes environment-specific values instead of accepting them as configuration. Find and fix the bug."</strong>',
              damageIfCorrect: 24, damageIfOptimal: 40,
              hintNudge: 'A script meant to run across multiple environments shouldn\'t hardcode one environment\'s specific values.',
              hintPartial: 'Line 1 hardcodes the production database host directly — accept it as an environment variable or CLI argument instead, so the same script works across environments.',
              hintFull: 'Fix: DB_HOST="${DB_HOST:?DB_HOST must be set}"',
              codeBlock: [
                'DB_HOST="prod-db.internal.example.com"  # same script also needs to run against staging/dev'
              ],
              buggyLineId: 0,
              correctFixPatterns: [/DB_HOST=.*\$\{?DB_HOST/i]
            },
            {
              mode: 'triage_call',
              prompt: 'The Wraith weighs a simple whisper against a true architecture: <strong>"Deciding between cron and a dedicated workflow orchestrator (like Airflow) for a growing set of interdependent scheduled jobs. Pick your move, then justify it in one line."</strong>',
              damageIfCorrect: 26, damageIfOptimal: 44,
              hintNudge: 'Cron has no native concept of job DEPENDENCIES, retries with backoff, or a unified view of failures across many jobs — once jobs start depending on each other, that absence becomes a real, growing operational cost.',
              hintPartial: 'Once jobs genuinely depend on each other (job B needs job A\'s output) with real need for retry/backoff and failure visibility across many jobs, a dedicated orchestrator earns its complexity — cron has no native concept of any of that and managing it manually becomes a real, growing burden.',
              hintFull: 'Best: cron remains fine for simple, independent scheduled tasks; move to a dedicated orchestrator once jobs have genuine interdependencies, need retry/backoff logic, or the number of jobs makes failure visibility across all of them a real operational problem cron was never built to solve.',
              options: [
                { id: 'a', label: 'Stick with cron regardless of how interdependent jobs become', tier: 'wrong', why: 'Cron has no native concept of job dependencies or unified failure visibility — managing genuine interdependencies manually becomes a real, growing operational burden.' },
                { id: 'b', label: 'Move to a dedicated orchestrator once genuine interdependencies and scale justify it', tier: 'best', why: 'Matches the tool to the actual complexity — an orchestrator\'s added setup cost is worth it once cron\'s real limitations (no dependencies, no unified retry/visibility) start actually biting.' },
                { id: 'c', label: 'Always use a full orchestrator from day one, regardless of scale', tier: 'wrong', why: 'Adds real setup and operational overhead for a small number of simple, independent jobs that cron handles perfectly well.' }
              ],
              justificationPatterns: [/interdepend|orchestrator|dependencies|match.*(scale|complexity)/i]
            },
            {
              mode: 'triage_call',
              prompt: '<strong>"An organization has hundreds of ad hoc scripts written by many different engineers over the years, with no shared conventions. Pick your move, then justify it in one line."</strong>',
              damageIfCorrect: 26, damageIfOptimal: 44,
              hintNudge: 'Rewriting everything to a new standard at once is a massive, risky undertaking — establishing standards for new work and migrating opportunistically is the same principle applied here as to a sprawling set of Terraform configurations.',
              hintPartial: 'Establish clear conventions (error handling, logging, argument parsing) for new scripts immediately, and migrate high-value/high-risk existing scripts opportunistically, rather than attempting one massive rewrite of hundreds of scripts.',
              hintFull: 'Best: establish conventions going forward and enforce them on new scripts, prioritizing migration of the highest-risk existing scripts (ones touching production or run frequently) rather than a single massive, risky rewrite effort across everything at once.',
              options: [
                { id: 'a', label: 'Rewrite every existing script to the new standard in one large effort', tier: 'wrong', why: 'A massive, high-risk undertaking with a long payoff horizon before any value is realized — the same problem as trying to rewrite an entire Terraform estate at once.' },
                { id: 'b', label: 'Establish standards for new scripts, migrate high-risk existing ones opportunistically', tier: 'best', why: 'Gets immediate value on new work while prioritizing the genuinely highest-risk legacy scripts, rather than treating all hundreds of scripts as equally urgent.' },
                { id: 'c', label: 'Leave all existing scripts exactly as-is indefinitely', tier: 'wrong', why: 'Never actually addresses real risk sitting in high-impact legacy scripts, some of which may have serious, undiscovered issues.' }
              ],
              justificationPatterns: [/incremental|opportunistic|high-risk|new\s*(script|work)/i]
            },
            {
              mode: 'triage_call',
              prompt: '<strong>"Deciding how much test coverage a critical production automation script (e.g. a deploy script) actually needs. Pick your move, then justify it in one line."</strong>',
              damageIfCorrect: 26, damageIfOptimal: 44,
              hintNudge: 'A script\'s test coverage should scale with its actual blast radius and how often it changes — a critical, frequently-modified deploy script warrants real testing investment; a one-off personal utility script doesn\'t need the same rigor.',
              hintPartial: 'Invest in real automated testing (unit tests for logic, integration tests against a safe environment) proportionate to the script\'s actual blast radius — a critical production deploy script genuinely warrants this; a one-off personal utility script doesn\'t need the same investment.',
              hintFull: 'Best: match testing investment to actual consequence and change frequency — a critical, frequently-modified production script (like a deploy script) genuinely warrants real automated tests, since a regression there has real, wide impact; a low-stakes one-off script doesn\'t need the same rigor.',
              options: [
                { id: 'a', label: 'No formal tests — carefully review the code by eye before each change', tier: 'wrong', why: 'For a genuinely critical, frequently-changed script, manual review alone doesn\'t catch regressions as reliably as automated tests run on every change.' },
                { id: 'b', label: 'Invest in real automated tests, proportionate to the script\'s actual blast radius', tier: 'best', why: 'Matches testing rigor to actual consequence — a critical deploy script warrants real coverage; the investment should scale with what a regression would actually cost.' },
                { id: 'c', label: 'Require the exact same full test suite rigor for every script, regardless of purpose', tier: 'wrong', why: 'Applies unnecessary overhead uniformly, even to low-stakes, rarely-changed scripts where that investment doesn\'t pay off.' }
              ],
              justificationPatterns: [/blast\s*radius|proportionate|match.*(consequence|risk)/i]
            },
            {
              mode: 'read_the_room',
              prompt: 'A whisper meant for one ear reaches every corner of the hall. <strong>A script\'s debug logging accidentally includes full request bodies, which sometimes contain customer PII. Diagnose it, then fix it.</strong>',
              damageIfCorrect: 28, damageIfOptimal: 48,
              hintNudge: 'Logging entire request bodies indiscriminately, without considering what sensitive data might be inside them, is a real, common way PII ends up somewhere it shouldn\'t (log files, log aggregation systems, log retention).',
              hintPartial: 'The debug logging was added to help troubleshoot without considering that request bodies can contain genuine customer PII — it\'s now sitting in log files (and possibly a log aggregation system) with different retention/access controls than the actual production data.',
              hintFull: 'Diagnosis: debug logging captures full request bodies indiscriminately, exposing PII in logs. Fix: redact or omit sensitive fields before logging (allowlist safe fields rather than logging everything), and purge/rotate any logs that already captured PII, with a review of log retention policies.',
              outputBlock: [
                '$ (log excerpt) DEBUG: request body: {"email": "user@example.com", "ssn": "123-45-6789", ...}'
              ],
              acceptableDiagnosesPatterns: [/pii.*log|logging.*(indiscriminate|full\s*body)/i],
              followUpFix: {
                prompt: 'Fix it by redacting sensitive fields before logging:',
                acceptablePatterns: [],
                optimalPatterns: [/redact|allowlist|omit\s*sensitive/i]
              }
            },
            {
              mode: 'read_the_room',
              prompt: 'A single flawed thread runs through every tapestry in the hall. <strong>A subtle bug in a shared utility script (sourced by dozens of other scripts) causes silent, inconsistent failures across many unrelated automations. Diagnose it, then fix it.</strong>',
              damageIfCorrect: 28, damageIfOptimal: 48,
              hintNudge: 'A widely-shared script with no version control or testing discipline is a single point of failure whose impact is invisible until something downstream breaks in a seemingly unrelated way.',
              hintPartial: 'The shared utility script was modified without any real testing or versioning discipline, and its wide reach (sourced by dozens of other scripts) means the bug\'s impact appears scattered and unrelated across many different automations.',
              hintFull: 'Diagnosis: an untested, unversioned change to a widely-shared utility script propagated silently to every script that sources it. Fix: add real tests for the shared utility, adopt versioning/change review discipline for it specifically (given its wide blast radius), and audit all downstream scripts for the actual impact.',
              outputBlock: [
                '$ (multiple unrelated scripts) started failing intermittently the same week',
                '(all of them source the same lib/common.sh, which was quietly modified)'
              ],
              acceptableDiagnosesPatterns: [/shared\s*(utility|script).*(untested|unversioned|no\s*testing)/i, /wide\s*(reach|blast\s*radius)/i],
              followUpFix: {
                prompt: 'Fix it by adding real tests and versioning discipline for the shared script:',
                acceptablePatterns: [],
                optimalPatterns: [/test.*shared|version.*discipline|change\s*review/i]
              }
            },
            {
              mode: 'build_the_pipeline',
              prompt: 'The Wraith draws its final, patient thread. <strong>Sequence the correct order for hardening a critical production automation script.</strong>',
              steps: [
                'Add set -euo pipefail and proper error handling throughout',
                'Move any hardcoded secrets to environment variables/a secrets manager',
                'Add structured logging to a persistent location',
                'Add automated tests proportionate to its actual blast radius',
                'Document its purpose, inputs, and failure modes for the next person'
              ],
              damageIfCorrect: 30, damageIfOptimal: 50,
              damageToHeroIfWrong: 28
            },
            {
              mode: 'build_the_pipeline',
              prompt: 'The last thread closes the tapestry. <strong>Sequence the correct order for migrating a sprawling set of ad hoc scripts toward shared conventions.</strong>',
              steps: [
                'Establish clear conventions for new scripts (error handling, logging, structure)',
                'Enforce those conventions via review for anything new',
                'Identify the highest-risk existing scripts by actual usage/impact',
                'Migrate those high-risk scripts to the new conventions first',
                'Continue migrating the rest opportunistically as they\'re touched'
              ],
              damageIfCorrect: 30, damageIfOptimal: 50,
              damageToHeroIfWrong: 28
            },
            {
              mode: 'terminal',
              prompt: 'The Wraith checks whether a ritual\'s words are even sound before it dares speak them: <strong>"Check a Python script <code>deploy.py</code> for type errors using static type checking, without running it."</strong>',
              damageIfCorrect: 24, damageIfOptimal: 40,
              hintNudge: 'A well-known Python static type checker, run directly against the file.',
              hintPartial: 'm____ deploy.py',
              hintFull: 'mypy deploy.py',
              acceptablePatterns: [],
              optimalPatterns: [/^mypy\s+deploy\.py$/i],
              baseCmds: ['mypy']
            },
            {
              mode: 'terminal',
              prompt: 'It measures how heavily a ritual leans on the machine beneath it: <strong>"Show real-time CPU and memory usage for all processes, sorted by CPU."</strong>',
              damageIfCorrect: 20, damageIfOptimal: 34,
              hintNudge: 'The classic interactive process monitor, sorted by CPU by default.',
              hintPartial: 't__',
              hintFull: 'top',
              acceptablePatterns: [],
              optimalPatterns: [/^top$/i],
              baseCmds: ['top', 'htop']
            },
            {
              mode: 'spot_the_bug',
              prompt: 'A crooked ritual assumes it always speaks first. <strong>"This deployment script assumes it\'s the only one ever running, with no coordination for concurrent deploys from different pipelines. Find and fix the bug."</strong>',
              damageIfCorrect: 26, damageIfOptimal: 42,
              hintNudge: 'Multiple pipelines (or people) could trigger this deploy script concurrently — nothing here prevents two deploys from racing each other.',
              hintPartial: 'Line 1 has no coordination mechanism at all — add a distributed lock (e.g. via a lock file on shared storage, or a lock service) so concurrent deploy attempts are serialized rather than racing.',
              hintFull: 'Fix: acquire a distributed lock (e.g. via a shared lock file with flock, or a proper lock service) before proceeding, releasing it when done.',
              codeBlock: [
                './deploy.sh  # no locking at all; two CI pipelines could trigger this simultaneously'
              ],
              buggyLineId: 0,
              correctFixPatterns: [/distributed\s*lock|flock|lock\s*service/i]
            },
            {
              mode: 'spot_the_bug',
              prompt: 'A crooked ritual leaves its own weapon lying in the open. <strong>"This script writes a temporary file containing a decrypted secret to a world-readable location. Find and fix the bug."</strong>',
              damageIfCorrect: 26, damageIfOptimal: 42,
              hintNudge: 'A temp file with default permissions is often world-readable — a decrypted secret written there is exposed to any local user until it\'s cleaned up.',
              hintPartial: 'Line 1 writes the secret to a temp file with default (world-readable) permissions — set restrictive permissions (or avoid writing it to disk at all, using a pipe or in-memory handling instead) before it\'s ever written.',
              hintFull: 'Fix: create the file with restrictive permissions first (umask 077, or chmod 600 immediately), or avoid writing the secret to disk entirely.',
              codeBlock: [
                'echo "$DECRYPTED_SECRET" > /tmp/secret.txt  # default permissions, world-readable'
              ],
              buggyLineId: 0,
              correctFixPatterns: [/umask\s*077|chmod\s*600|avoid.*writ.*disk/i]
            },
            {
              mode: 'spot_the_bug',
              prompt: 'A crooked ritual assumes every summoner speaks the same tongue. <strong>"This script assumes GNU-specific command flags that don\'t exist on macOS/BSD systems, breaking cross-platform. Find and fix the bug."</strong>',
              damageIfCorrect: 26, damageIfOptimal: 42,
              hintNudge: 'GNU and BSD versions of common utilities (like sed, date) sometimes have genuinely different flag syntax — a script meant to be portable needs to account for that.',
              hintPartial: 'Line 1 uses a GNU-specific sed flag syntax that BSD/macOS sed doesn\'t support — either detect the platform and branch, or use a syntax that works consistently across both.',
              hintFull: 'Fix: detect the platform (or use a portable syntax/tool) rather than assuming GNU-specific flags everywhere.',
              codeBlock: [
                "sed -i 's/foo/bar/' file.txt  # GNU sed syntax; BSD/macOS sed requires sed -i '' 's/foo/bar/' file.txt"
              ],
              buggyLineId: 0,
              correctFixPatterns: [/detect.*platform|portable/i]
            },
            {
              mode: 'triage_call',
              prompt: 'The Wraith weighs the weight of every ritual against the machine that hosts them all: <strong>"An organization\'s automation scripts are scattered across dozens of individual engineers\' laptops, with no central execution environment. Pick your move, then justify it in one line."</strong>',
              damageIfCorrect: 28, damageIfOptimal: 46,
              hintNudge: 'Scripts living only on individual laptops means a script\'s availability depends on one specific person\'s machine being on and available — a real, avoidable single point of failure for anything actually important.',
              hintPartial: 'Migrate genuinely important, recurring automation to a shared, centrally-managed execution environment (a dedicated server, CI runner, or scheduler) — depending on one engineer\'s laptop being available is a real, avoidable single point of failure.',
              hintFull: 'Best: migrate important recurring automation off individual laptops to a shared, centrally-managed environment — a laptop-dependent script has a real availability risk (that one person\'s machine) that has nothing to do with the automation\'s actual logic.',
              options: [
                { id: 'a', label: 'Leave important automation on individual laptops as-is', tier: 'wrong', why: 'Makes the automation\'s availability depend on one specific person\'s machine being on and reachable — a real, avoidable single point of failure.' },
                { id: 'b', label: 'Migrate genuinely important automation to a shared, centrally-managed environment', tier: 'best', why: 'Removes the dependency on any one individual\'s machine, making critical automation actually reliable and available.' },
                { id: 'c', label: 'Require every engineer to leave their laptop on at all times', tier: 'wrong', why: 'A fragile workaround that still depends on individual hardware/availability, rather than actually solving the underlying reliability problem.' }
              ],
              justificationPatterns: [/centraliz|shared\s*environment|single\s*point\s*of\s*failure/i]
            },
            {
              mode: 'triage_call',
              prompt: '<strong>"Deciding how much automated testing to require for a one-off migration script that will only ever run once. Pick your move, then justify it in one line."</strong>',
              damageIfCorrect: 28, damageIfOptimal: 46,
              hintNudge: 'The same "match testing investment to actual consequence" principle applies here — a genuinely one-off script still deserves real care if it touches production data irreversibly, even without a full formal test suite built around it.',
              hintPartial: 'Skip a full formal test suite (which wouldn\'t be reused anyway), but still verify it carefully — dry-run against production data, test against a realistic copy first — proportionate to the actual, often irreversible, impact of a migration script even if it only runs once.',
              hintFull: 'Best: match the RIGOR to consequence, not to reuse — a one-off migration script touching production data deserves careful dry-run/staging verification (given the often irreversible impact), even though a full traditional automated test suite genuinely isn\'t worth building for something that runs exactly once.',
              options: [
                { id: 'a', label: 'Build a full formal automated test suite, same as any reusable production code', tier: 'wrong', why: 'A genuine one-off script won\'t be reused — a full test suite investment doesn\'t pay off the way it would for code that runs repeatedly.' },
                { id: 'b', label: 'Skip formal tests, but verify carefully via dry-run against realistic/staging data', tier: 'best', why: 'Matches rigor to actual consequence (often irreversible production impact) rather than to reuse — the right verification approach for something run once but high-stakes.' },
                { id: 'c', label: 'Skip all verification since it only runs once anyway', tier: 'wrong', why: 'Ignores that "runs once" and "low consequence" are different things — a one-off migration touching production can still cause serious, often-irreversible damage if wrong.' }
              ],
              justificationPatterns: [/dry-?run|match.*(rigor|consequence)|irreversible/i]
            },
            {
              mode: 'triage_call',
              prompt: '<strong>"Deciding whether a critical automation script should be owned by an individual or a team. Pick your move, then justify it in one line."</strong>',
              damageIfCorrect: 28, damageIfOptimal: 46,
              hintNudge: 'A script owned by a single individual has exactly the single-point-of-knowledge risk seen when that person leaves — team ownership (with real shared understanding, not just nominal) spreads that knowledge.',
              hintPartial: 'Assign genuine team ownership (with real shared understanding via documentation and cross-training, not just a name on a wiki page) — individual ownership of something critical creates exactly the single-point-of-knowledge risk that becomes a real problem the moment that person is unavailable.',
              hintFull: 'Best: team ownership with genuine shared understanding — individual ownership of critical automation is a real, foreseeable risk (illness, departure, vacation) that team ownership with actual cross-training (not just nominal group ownership) directly addresses.',
              options: [
                { id: 'a', label: 'Individual ownership, by whoever originally wrote it', tier: 'wrong', why: 'Creates a real single-point-of-knowledge risk for something explicitly described as critical — a foreseeable problem the moment that person is unavailable.' },
                { id: 'b', label: 'Team ownership with genuine shared understanding (documentation, cross-training)', tier: 'best', why: 'Directly addresses the single-point-of-knowledge risk for something critical, as long as the shared ownership is real and not just nominal.' },
                { id: 'c', label: 'No formal ownership — whoever notices a problem fixes it', tier: 'wrong', why: 'Provides no accountability at all for something explicitly critical, risking a problem going unnoticed or unfixed simply because nobody felt responsible.' }
              ],
              justificationPatterns: [/team\s*ownership|shared\s*understanding|single\s*point\s*of\s*knowledge/i]
            },
            {
              mode: 'triage_call',
              prompt: '<strong>"An automation script that handles sensitive financial reconciliation is found to have no audit trail of what it changed. Pick your move, then justify it in one line."</strong>',
              damageIfCorrect: 28, damageIfOptimal: 46,
              hintNudge: 'For anything touching financial data, being able to answer "what exactly changed, when, and why" after the fact is often a genuine compliance requirement, not just a nice-to-have.',
              hintPartial: 'Add explicit, structured audit logging of every change the script makes (what, when, and the context/reason) — for financial reconciliation specifically, this is often a genuine compliance requirement, not an optional nicety.',
              hintFull: 'Best: add structured audit logging capturing exactly what changed, when, and why, for every run — financial systems commonly have real compliance requirements around exactly this kind of traceability, making it a genuine requirement here, not just good practice.',
              options: [
                { id: 'a', label: 'Add structured audit logging of every change the script makes', tier: 'best', why: 'Directly addresses a genuine compliance need for financial systems — being able to answer "what changed and why" after the fact.' },
                { id: 'b', label: 'Rely on the script\'s general application logs, which already exist', tier: 'defensible', why: 'General logs may capture some detail, but likely lack the structured, change-specific traceability that financial audit requirements typically demand.' },
                { id: 'c', label: 'Skip audit logging since the script has run correctly so far', tier: 'wrong', why: 'Ignores that audit trails exist for exactly the case where something DOES go wrong (or is questioned) later — past correctness doesn\'t address that need.' }
              ],
              justificationPatterns: [/audit\s*(log|trail)|compliance|structured\s*log/i]
            },
            {
              mode: 'triage_call',
              prompt: '<strong>"A critical zero-day vulnerability is announced in a widely-used shell utility (e.g. bash itself). Pick your move, then justify it in one line."</strong>',
              damageIfCorrect: 28, damageIfOptimal: 46,
              hintNudge: 'Assess the actual exploitability and exposure for how the tool is used in your environment first (not every announced vulnerability applies equally everywhere), then patch with real urgency given how foundational the tool is.',
              hintPartial: 'Assess the vulnerability\'s specific relevance to your actual usage first, then urgently patch across all affected systems — a vulnerability in something as foundational as the shell itself deserves genuine priority given how much depends on it.',
              hintFull: 'Best: assess actual relevance to your specific exposure (not every vulnerability is equally exploitable in every context), then patch with real urgency across all systems — the same principle as a core-tool CVE in Terraform, scaled to something even more foundational.',
              options: [
                { id: 'a', label: 'Assess actual relevance to your exposure, then urgently patch across all systems', tier: 'best', why: 'Matches urgency to actual exploitability for your specific context while still treating a vulnerability in something this foundational with real priority.' },
                { id: 'b', label: 'Wait for the next regular OS patching cycle', tier: 'wrong', why: 'A critical vulnerability in something as foundational as the shell deserves faster-than-routine attention given how much depends on it.' },
                { id: 'c', label: 'Immediately patch every system with zero assessment of actual exposure', tier: 'defensible', why: 'Errs safe, but skipping any relevance assessment could mean scrambling to patch systems where the specific vulnerability doesn\'t even apply.' }
              ],
              justificationPatterns: [/assess.*relevance|urgent(ly)?\s*patch|actual\s*exposure/i]
            },
            {
              mode: 'read_the_room',
              prompt: 'A whisper meant for a friend is overheard by a stranger. <strong>An automation script\'s error notifications accidentally get posted to a public channel instead of a private ops channel, exposing internal system details. Diagnose it, then fix it.</strong>",',
              damageIfCorrect: 30, damageIfOptimal: 50,
              hintNudge: 'Check exactly how the notification destination was configured — a hardcoded or misconfigured channel/webhook ID pointing at the wrong (public) destination is a common, simple root cause.',
              hintPartial: 'The notification\'s destination (a webhook or channel ID) was misconfigured to point at a public channel instead of the intended private ops channel — a straightforward configuration mistake with a real exposure consequence.',
              hintFull: 'Diagnosis: the notification destination is misconfigured to a public channel. Fix: correct the destination to the private ops channel immediately, delete/redact the exposed messages, and review what internal details were actually exposed for any further action needed.',
              outputBlock: [
                '$ (public channel) "ERROR: deploy failed, db connection string: postgres://admin:***@internal-db:5432"',
                '(intended destination: #ops-private)'
              ],
              acceptableDiagnosesPatterns: [/misconfigur.*(destination|channel|webhook)/i, /wrong\s*channel/i],
              followUpFix: {
                prompt: 'Fix it by correcting the destination and cleaning up the exposure:',
                acceptablePatterns: [],
                optimalPatterns: [/correct.*destination|delete.*(message|redact)/i]
              }
            },
            {
              mode: 'read_the_room',
              prompt: 'A ritual meant to heal instead deepens the wound. <strong>An automated remediation script (meant to restart a failing service) ends up making an outage worse by repeatedly restarting a service that\'s actually failing due to a genuine, unresolved bug. Diagnose it, then fix it.</strong>',
              damageIfCorrect: 30, damageIfOptimal: 50,
              hintNudge: 'Automated remediation with no limit on how many times it can retry can turn a real, underlying bug into a restart-loop that never lets the service stabilize or gives anyone a chance to actually diagnose it.',
              hintPartial: 'The auto-remediation has no limit on restart attempts, so it keeps restarting a service with a genuine underlying bug indefinitely — this masks the real problem and prevents the service from ever getting a stable window for anyone to actually diagnose it.',
              hintFull: 'Diagnosis: unlimited automated restarts are looping against a genuine underlying bug, worsening the outage. Fix: add a limit (e.g. circuit-breaker style — stop after N restarts within a window) that pages a human instead of restarting indefinitely, so the real bug gets investigated rather than masked.',
              outputBlock: [
                '$ (remediation script logs) restarted myapp 47 times in the last hour',
                '(service crashes again within seconds every time, same underlying error each time)'
              ],
              acceptableDiagnosesPatterns: [/unlimited\s*restart|no\s*(restart\s*)?limit/i, /masking.*(bug|problem)/i],
              followUpFix: {
                prompt: 'Fix it by adding a circuit-breaker-style limit that pages a human:',
                acceptablePatterns: [],
                optimalPatterns: [/circuit.?breaker|limit.*restart|page.*human/i]
              }
            },
            {
              mode: 'read_the_room',
              prompt: 'A ritual\'s clock runs true in one land, and false in another. <strong>A scheduled script that runs correctly in one region starts firing at the wrong time after infrastructure expanded to a new region. Diagnose it, then fix it.</strong>',
              damageIfCorrect: 30, damageIfOptimal: 50,
              hintNudge: 'Check whether the scheduling was ever explicitly tied to a specific timezone, or implicitly relied on the server\'s local time matching what was originally intended.',
              hintPartial: 'The schedule was defined without an explicit timezone, implicitly relying on the original server\'s local time — a server in the new region has a different local time, so the same schedule now fires at the wrong actual moment.',
              hintFull: 'Diagnosis: the schedule has no explicit timezone, implicitly depending on server-local time that differs by region. Fix: define the schedule with an explicit, timezone-aware time (e.g. always compute/schedule in UTC) rather than relying on local server time.',
              outputBlock: [
                '$ (region A) cron fires at intended 2am local time',
                '$ (newly added region B) same cron expression fires at 2am region B time — a different actual moment than intended'
              ],
              acceptableDiagnosesPatterns: [/no\s*explicit\s*timezone/i, /relies?\s*on\s*(server-)?local\s*time/i],
              followUpFix: {
                prompt: 'Fix it by scheduling with an explicit, timezone-aware time:',
                acceptablePatterns: [],
                optimalPatterns: [/utc|explicit\s*timezone/i]
              }
            },
            {
              mode: 'read_the_room',
              prompt: 'A ledger of many hands shows no single signature. <strong>A post-incident review can\'t determine which of several automation scripts actually caused a change to a production resource, since none of them log who/what triggered them. Diagnose it, then fix it.</strong>',
              damageIfCorrect: 30, damageIfOptimal: 50,
              hintNudge: 'Without any run-time context logged (which script, triggered by what, at what time, by which pipeline/user), a post-incident investigation has no way to attribute a change to its actual source.',
              hintPartial: 'None of the scripts log identifying context about their own execution (which script, what triggered it, which pipeline run, timestamp) — without that, a post-incident investigation genuinely cannot attribute a change to its actual source.',
              hintFull: 'Diagnosis: scripts lack any execution-context logging, making attribution after the fact impossible. Fix: add structured logging of execution context (script identity, trigger source, timestamp, invoking pipeline/user) to every automation script touching production, going forward.',
              outputBlock: [
                '$ (investigation) "something changed security-group-x at 3:14am" — 4 different scripts could plausibly have done it, none logged which one actually ran',
              ],
              acceptableDiagnosesPatterns: [/no\s*execution\s*context/i, /lack.*(logging|attribution)/i],
              followUpFix: {
                prompt: 'Fix it by adding structured execution-context logging to every script:',
                acceptablePatterns: [],
                optimalPatterns: [/execution\s*context|structured\s*log/i]
              }
            },
            {
              mode: 'build_the_pipeline',
              prompt: 'The Wraith draws its final, most patient thread of all. <strong>Sequence the correct order for responding to an automated remediation script that\'s making an outage worse.</strong>',
              steps: [
                'Disable or pause the automated remediation immediately',
                'Assess the actual current state of the affected service',
                'Manually stabilize the service without the runaway automation fighting it',
                'Investigate the genuine underlying bug the remediation was reacting to',
                'Add a limit to the remediation before re-enabling it'
              ],
              damageIfCorrect: 32, damageIfOptimal: 52,
              damageToHeroIfWrong: 30
            }
          ]
        }
      ]
    };
