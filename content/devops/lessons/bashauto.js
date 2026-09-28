  const BASH_AUTOMATION = {
    fileOrganizer: {
      filename:`sort-downloads.sh`,
      intro:`The problem: your Downloads folder has 40+ files dumped in one pile — screenshots, PDFs, zips, all mixed together. This script sorts them into folders by type, automatically.`,
      code:`<span class="c">#!/bin/bash</span>\n<span class="c"># sort-downloads.sh — organizes a messy folder by file extension</span>\n\n<span class="v">TARGET_DIR</span>=<span class="s">"$HOME/Downloads"</span>\n\n<span class="k">cd</span> <span class="s">"$TARGET_DIR"</span> || <span class="k">exit</span> 1\n\n<span class="k">for</span> file <span class="k">in</span> *; <span class="k">do</span>\n  <span class="k">if</span> [ -f <span class="s">"$file"</span> ]; <span class="k">then</span>\n    <span class="v">ext</span>=<span class="s">"\${file##*.}"</span>\n    <span class="fn">mkdir</span> -p <span class="s">"$ext"</span>\n    <span class="fn">mv</span> <span class="s">"$file"</span> <span class="s">"$ext"</span>/\n  <span class="k">fi</span>\n<span class="k">done</span>\n\n<span class="fn">echo</span> <span class="s">"Done! Files sorted into folders by extension."</span>`,
      breakdown:[
        {line:`#!/bin/bash`, desc:`The shebang — tells the computer to run this file using bash. Always the very first line, no exceptions.`},
        {line:`# sort-downloads.sh — ...`, desc:`A comment, purely for humans — bash ignores everything after #. Saying what the script does right at the top means you (or anyone else) can tell what it's for without reading the rest.`},
        {line:`TARGET_DIR="$HOME/Downloads"`, desc:`Stores the folder to organize in a variable. Why: if you ever want to point this at a different folder, you change this one line instead of hunting through the whole script.`},
        {line:`cd "$TARGET_DIR" || exit 1`, desc:`Moves into that folder — and if it doesn't exist, cd fails and "|| exit 1" stops the script immediately. Why: without this, every command below would silently run in the wrong folder instead of failing loudly and obviously.`},
        {line:`for file in *; do`, desc:`Loops over every item in the current folder, one at a time, calling each one $file as it goes. Why: this is exactly what makes the script work whether there are 5 files or 5,000, without changing a single line.`},
        {line:`if [ -f "$file" ]; then`, desc:`Only continues if $file is an actual file, not a folder. Why: without this check, the script would try to "organize" folders into themselves, which makes no sense.`},
        {line:`ext="\${file##*.}"`, desc:`Strips everything up to and including the last dot, leaving just the extension. Why: that extension is literally the name of the folder we're about to sort this file into.`},
        {line:`mkdir -p "$ext"`, desc:`Creates a folder named after the extension. Why -p: it does nothing instead of throwing an error if that folder already exists — which after the very first file with that extension, it will.`},
        {line:`mv "$file" "$ext"/`, desc:`Moves the file into that folder. This is the actual "organizing" — every line above was just getting ready for this one.`},
        {line:`fi` , desc:`Closes the if block — every if needs a matching fi to tell bash where it ends.`},
        {line:`done`, desc:`Closes the for loop — everything between "do" and "done" ran once per file.`},
        {line:`echo "Done! ..."`, desc:`Prints a friendly confirmation. Why: a script that finishes silently leaves you wondering if it actually worked — one line removes all the doubt.`}
      ],
      output:`<span class="ld-prompt">$</span> ./sort-downloads.sh\nDone! Files sorted into folders by extension.\n\n<span class="ld-prompt">$</span> ls Downloads\n<span class="hi">jpg/</span>  <span class="hi">pdf/</span>  <span class="hi">png/</span>  <span class="hi">txt/</span>  <span class="hi">zip/</span>\n\n<span class="ld-prompt">$</span> ls Downloads/pdf\nresume.pdf  invoice.pdf  manual.pdf`,
      effect:`<div class="found-p"><strong style="color:#e2e8f0;">Before:</strong> Downloads had 40+ files loose and mixed together — screenshots, PDFs, zips, all in one messy pile.</div><div class="found-p"><strong style="color:#e2e8f0;">After:</strong> the exact same files, now sorted into folders by type (jpg/, pdf/, png/, txt/, zip/) — nothing deleted, nothing lost, just organized. Run it again next week and it just files away whatever's new since then.</div>`
    },

    cleanup: {
      filename:`cleanup-old-files.sh`,
      intro:`The problem: a log folder has been quietly filling up with files for months, and disk space is disappearing. This script deletes anything older than a week, automatically.`,
      code:`<span class="c">#!/bin/bash</span>\n<span class="c"># cleanup-old-files.sh — deletes files older than N days from a folder</span>\n\n<span class="v">TARGET_DIR</span>=<span class="s">"/var/log/myapp"</span>\n<span class="v">DAYS_OLD</span>=<span class="num">7</span>\n\n<span class="fn">find</span> <span class="s">"$TARGET_DIR"</span> -type f -mtime +$DAYS_OLD -print -delete\n\n<span class="fn">echo</span> <span class="s">"Cleanup complete. Removed files older than $DAYS_OLD days."</span>`,
      breakdown:[
        {line:`#!/bin/bash`, desc:`The shebang — same as every script, tells the OS to run this with bash.`},
        {line:`# cleanup-old-files.sh — ...`, desc:`A comment describing the script's purpose, so nobody has to guess (including future you).`},
        {line:`TARGET_DIR="/var/log/myapp"`, desc:`The folder to clean up. Why a variable: it's the one thing you'd actually want to change to reuse this script somewhere else — keeping it at the top makes that obvious and safe.`},
        {line:`DAYS_OLD=7`, desc:`How old is "too old," as a plain number. Why: tuning this later (say, to 30 days) means changing one number, not re-reading the whole find command.`},
        {line:`find "$TARGET_DIR" -type f -mtime +$DAYS_OLD -print -delete`, desc:`The actual work, in one line: -type f means "only files, not folders," -mtime +7 means "modified more than 7 days ago," -print lists each match before deleting it (so you have a record of what's gone), and -delete removes it. Why one line: find is built exactly for "search, then act" — no loop needed.`},
        {line:`echo "Cleanup complete. ..."`, desc:`Confirms the script actually ran and reminds you what the cutoff was — helpful if you're reading old logs from a cron job later.`}
      ],
      output:`<span class="ld-prompt">$</span> ./cleanup-old-files.sh\n/var/log/myapp/app-2026-07-20.log\n/var/log/myapp/app-2026-07-22.log\n/var/log/myapp/app-2026-07-25.log\nCleanup complete. Removed files older than 7 days.`,
      effect:`<div class="found-p"><strong style="color:#e2e8f0;">Before:</strong> the log folder had 50+ files going back three months, and disk space was steadily disappearing.</div><div class="found-p"><strong style="color:#e2e8f0;">After:</strong> only the last 7 days of logs remain — disk space is reclaimed, and the printed list of deleted files is a paper trail of exactly what was removed and when, in case anyone asks later.</div>`
    },

    backup: {
      filename:`backup-folder.sh`,
      intro:`The problem: there's only one live copy of an important project folder — one accidental "rm" and it's gone for good. This script makes a safe, timestamped copy.`,
      code:`<span class="c">#!/bin/bash</span>\n<span class="c"># backup-folder.sh — makes a dated copy of an important folder</span>\n\n<span class="v">SOURCE_DIR</span>=<span class="s">"$HOME/projects/my-app"</span>\n<span class="v">BACKUP_DIR</span>=<span class="s">"$HOME/backups"</span>\n<span class="v">TIMESTAMP</span>=<span class="fn">$(date +%Y-%m-%d_%H-%M-%S)</span>\n\n<span class="fn">mkdir</span> -p <span class="s">"$BACKUP_DIR"</span>\n<span class="fn">cp</span> -r <span class="s">"$SOURCE_DIR"</span> <span class="s">"$BACKUP_DIR/my-app_$TIMESTAMP"</span>\n\n<span class="fn">echo</span> <span class="s">"Backup saved to $BACKUP_DIR/my-app_$TIMESTAMP"</span>`,
      breakdown:[
        {line:`#!/bin/bash`, desc:`The shebang, as always — the first line of every script on this page.`},
        {line:`# backup-folder.sh — ...`, desc:`A comment stating the purpose, so this reads clearly months from now.`},
        {line:`SOURCE_DIR="$HOME/projects/my-app"`, desc:`What to back up. One variable, one place to change it if you ever back up a different project.`},
        {line:`BACKUP_DIR="$HOME/backups"`, desc:`Where backups live. Kept separate from SOURCE_DIR on purpose — a backup living next to the thing it's backing up defeats half the point.`},
        {line:`TIMESTAMP=$(date +%Y-%m-%d_%H-%M-%S)`, desc:`Command substitution — runs the date command and captures its text output into a variable. Why: this is what gives every backup a unique name, so running the script twice in one day creates two backups instead of overwriting the first.`},
        {line:`mkdir -p "$BACKUP_DIR"`, desc:`Makes sure the backups folder actually exists before trying to copy into it — without this, the very next line would fail the first time you ever run the script.`},
        {line:`cp -r "$SOURCE_DIR" "$BACKUP_DIR/my-app_$TIMESTAMP"`, desc:`The actual backup. -r means "recursive" — copy the folder AND everything inside it, including subfolders, not just the top level. The destination name bakes in the timestamp from above.`},
        {line:`echo "Backup saved to ..."`, desc:`Tells you exactly where the backup landed. Why: "it probably worked" isn't good enough for something meant to save you in an emergency — you want the exact path, printed right there.`}
      ],
      output:`<span class="ld-prompt">$</span> ./backup-folder.sh\nBackup saved to /home/devops/backups/my-app_2026-08-12_14-30-05\n\n<span class="ld-prompt">$</span> ls backups\nmy-app_2026-08-12_14-30-05/`,
      effect:`<div class="found-p"><strong style="color:#e2e8f0;">Before:</strong> only one live copy of my-app exists — a bad "rm -rf" or a botched git operation could wipe it out permanently.</div><div class="found-p"><strong style="color:#e2e8f0;">After:</strong> a complete, timestamped snapshot sits safely in backups/, completely untouched by anything that happens to the original afterward. Run it again tomorrow and there are now two independent snapshots, not one overwritten.</div>`
    },

    diskWatchdog: {
      filename:`check-disk-space.sh`,
      intro:`The problem: a server quietly runs out of disk space and something crashes — with zero warning beforehand. This script checks usage and speaks up before that happens.`,
      code:`<span class="c">#!/bin/bash</span>\n<span class="c"># check-disk-space.sh — warns you if the disk is getting too full</span>\n\n<span class="v">THRESHOLD</span>=<span class="num">80</span>\n<span class="v">USAGE</span>=<span class="fn">$(df / | tail -1 | awk '{print $5}' | tr -d '%')</span>\n\n<span class="k">if</span> [ <span class="s">"$USAGE"</span> -ge <span class="s">"$THRESHOLD"</span> ]; <span class="k">then</span>\n  <span class="fn">echo</span> <span class="s">"⚠️  WARNING: Disk is $USAGE% full (limit: $THRESHOLD%)"</span>\n<span class="k">else</span>\n  <span class="fn">echo</span> <span class="s">"✅ Disk usage OK: $USAGE% full"</span>\n<span class="k">fi</span>`,
      breakdown:[
        {line:`#!/bin/bash`, desc:`The shebang — same rule, every time, first line.`},
        {line:`# check-disk-space.sh — ...`, desc:`A comment explaining the purpose at a glance.`},
        {line:`THRESHOLD=80`, desc:`The "too full" cutoff, as a plain percentage. Why a variable: tune sensitivity later by changing one number instead of rewriting the logic.`},
        {line:`USAGE=$(df / | tail -1 | awk '{print $5}' | tr -d '%')`, desc:`A small pipeline, one step feeding the next: df / prints disk info for the root filesystem, tail -1 grabs just that one line of actual data, awk '{print $5}' pulls out the 5th column (the percentage), and tr -d '%' strips the % sign so we're left with a plain number bash can compare.`},
        {line:`if [ "$USAGE" -ge "$THRESHOLD" ]; then`, desc:`A numeric comparison: is usage greater than or equal to the threshold? -ge is the "greater-or-equal" test for numbers specifically (not = / == which compares text).`},
        {line:`echo "⚠️  WARNING: ..."`, desc:`Only runs if the disk actually is too full — a clear, impossible-to-miss warning message.`},
        {line:`else / echo "✅ Disk usage OK: ..."`, desc:`Runs instead, whenever usage is still comfortably under the limit — confirms the check ran and everything's fine.`},
        {line:`fi`, desc:`Closes the if block.`}
      ],
      output:`<span class="ld-prompt">$</span> ./check-disk-space.sh\n<span class="ok">✅ Disk usage OK: 62% full</span>\n\n<span class="dim">... a few weeks later ...</span>\n\n<span class="ld-prompt">$</span> ./check-disk-space.sh\n<span class="warn">⚠️  WARNING: Disk is 87% full (limit: 80%)</span>`,
      effect:`<div class="found-p"><strong style="color:#e2e8f0;">Before:</strong> nobody notices disk usage creeping up — the first sign of trouble is usually something else breaking because it ran out of room.</div><div class="found-p"><strong style="color:#e2e8f0;">After:</strong> nothing on disk actually changes — this script only reports. Its effect is entirely informational: you find out about a filling disk from a clear message on your terms, instead of discovering it later when something crashes because of it.</div>`
    },

    dailyReport: {
      filename:`daily-report.sh`,
      intro:`The problem: checking on a server's health every single morning by hand gets old fast, and it's the first thing that gets forgotten. This script writes its own report — and can be told to run itself.`,
      code:`<span class="c">#!/bin/bash</span>\n<span class="c"># daily-report.sh — writes a short daily system report to a file</span>\n<span class="c"># meant to run automatically every morning via cron</span>\n\n<span class="v">REPORT_FILE</span>=<span class="s">"$HOME/reports/daily-report-$(date +%Y-%m-%d).txt"</span>\n\n<span class="fn">mkdir</span> -p <span class="s">"$HOME/reports"</span>\n\n{\n  <span class="fn">echo</span> <span class="s">"=== Daily Report: $(date) ==="</span>\n  <span class="fn">echo</span> <span class="s">"Uptime: $(uptime -p)"</span>\n  <span class="fn">echo</span> <span class="s">"Disk usage:"</span>\n  <span class="fn">df</span> -h /\n  <span class="fn">echo</span> <span class="s">"Logged in users:"</span>\n  <span class="fn">who</span>\n} > <span class="s">"$REPORT_FILE"</span>\n\n<span class="fn">echo</span> <span class="s">"Report written to $REPORT_FILE"</span>`,
      breakdown:[
        {line:`#!/bin/bash`, desc:`The shebang, first line, no different from any other script here.`},
        {line:`# daily-report.sh — ... / # meant to run automatically via cron`, desc:`Two comments — what it does, and how it's meant to be used. Worth being explicit that this one isn't meant to be run by hand every time.`},
        {line:`REPORT_FILE="$HOME/reports/daily-report-$(date +%Y-%m-%d).txt"`, desc:`Builds today's report filename using command substitution for the date. Why: this means every day gets its own file instead of yesterday's report being silently overwritten.`},
        {line:`mkdir -p "$HOME/reports"`, desc:`Makes sure the reports folder exists first — same safety habit as the backup script.`},
        {line:`{ ... } > "$REPORT_FILE"`, desc:`Groups every command inside the curly braces together, then redirects their COMBINED output into one file in a single step. Why: without the braces, you'd need to repeat "> $REPORT_FILE" after every single line, and each one would overwrite the last instead of adding to it.`},
        {line:`echo "=== Daily Report: $(date) ==="`, desc:`A header line stamped with the exact date and time the report was generated.`},
        {line:`echo "Uptime: $(uptime -p)"`, desc:`How long the server has been running without a reboot — a quick, human-readable health signal.`},
        {line:`df -h /`, desc:`Disk usage for the root filesystem, in human-readable sizes (-h) instead of raw byte counts.`},
        {line:`who`, desc:`Lists everyone currently logged into the server — useful context if something unexpected happened overnight.`},
        {line:`echo "Report written to ..."`, desc:`This one prints to the terminal, not into the file — it's outside the { } block on purpose, so you get instant confirmation when running it by hand.`}
      ],
      output:`<span class="ld-prompt">$</span> ./daily-report.sh\nReport written to /home/devops/reports/daily-report-2026-08-12.txt\n\n<span class="ld-prompt">$</span> cat /home/devops/reports/daily-report-2026-08-12.txt\n=== Daily Report: Wed Aug 12 07:00:01 UTC 2026 ===\nUptime: up 14 days, 3 hours, 22 minutes\nDisk usage:\nFilesystem  Size  Used Avail Use% Mounted on\n/dev/sda1    50G   32G   18G  64% /\nLogged in users:\ndevops   pts/0   2026-08-12 06:55`,
      effect:`<div class="found-p"><strong style="color:#e2e8f0;">Before:</strong> nobody proactively checks server health each morning — it only gets looked at once something's already wrong.</div><div class="found-p"><strong style="color:#e2e8f0;">After (once scheduled with cron, below):</strong> this runs itself at 7 AM every single day, with nobody touching anything. A fresh, dated report appears in reports/ each morning, and a full history quietly builds up — genuinely useful the one day something actually breaks and you need to know when it started.</div>`,
      cron:`0 7 * * * /home/devops/scripts/daily-report.sh`,
      cronDesc:`Add this one line by running <span class="found-code">crontab -e</span> and pasting it in. Read left to right: minute 0, hour 7, every day of the month, every month, every day of the week — so, "7:00 AM, every single day." The last part is the full, exact path to the script — cron doesn't know your normal PATH or current folder, so a full path is the one habit that saves you the most confused debugging later.`
    }
  };

  function loadBashLesson(key, btn) {
    const d = BASH_AUTOMATION[key];
    if (!d) return;
    document.getElementById('baFilename').textContent = d.filename;
    document.getElementById('baIntro').innerHTML = d.intro;
    document.getElementById('baCode').innerHTML = d.code;
    document.getElementById('baOutput').innerHTML = '<span class="dim">↳ click "▶ Run script" above to see what this actually does</span>';
    document.getElementById('baOutput').dataset.key = key;
    document.getElementById('baEffect').innerHTML = d.effect;

    const list = document.getElementById('baBreakdownList');
    list.innerHTML = d.breakdown.map(item =>
      `<div class="sl-breakdown-item"><span class="sl-breakdown-term">${item.line}</span><span class="sl-breakdown-desc">${item.desc}</span></div>`
    ).join('');

    const cronBox = document.getElementById('baCronBox');
    if (d.cron) {
      cronBox.style.display = '';
      document.getElementById('baCronLine').textContent = d.cron;
      document.getElementById('baCronDesc').innerHTML = d.cronDesc;
    } else {
      cronBox.style.display = 'none';
    }

    document.querySelectorAll('#tab-bashauto .sl-pill').forEach(p => p.classList.remove('active'));
    if (btn) btn.classList.add('active');
  }
  function runBashScript() {
    const key = document.getElementById('baOutput').dataset.key;
    const d = BASH_AUTOMATION[key];
    if (!d) { document.getElementById('baOutput').innerHTML = '<span class="warn">↳ pick a script below first</span>'; return; }
    document.getElementById('baOutput').innerHTML = d.output;
  }
