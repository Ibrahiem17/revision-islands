// Boss "reaper": metadata plus its full question bank (data only).

/* ================================================================
   BOSS 6 — PACKET REAPER (Networking)
   ================================================================ */
export var reaper = {
  id: 'reaper',
  name: 'Packet Reaper',
  topic: 'Networking',
  icon: '💀',
  chibiKind: 'reaper',
  phaseHp: [118, 128, 148],
  phaseNames: ['Scythe — Connectivity Basics', 'Toll — Subnetting Judgment', 'Harvest — Real Incident'],
  xpReward: 158,
  coinBaseReward: 94,
  phases: [
    /* -------- PHASE 1: Connectivity Basics -------- */
    [
      {
        mode: 'terminal',
        prompt: 'The Reaper\'s scythe traces a path: <strong>"Check whether <code>example.com</code> is reachable, 4 packets only."</strong>',
        damageIfCorrect: 16, damageIfOptimal: 26,
        hintNudge: 'The classic reachability tool has a count flag so it doesn\'t run forever.',
        hintPartial: 'ping -c _ example.com',
        hintFull: 'ping -c 4 example.com',
        acceptablePatterns: [/^ping\s+example\.com$/i],
        optimalPatterns: [/^ping\s+-c\s+4\s+example\.com$/i],
        baseCmds: ['ping']
      },
      {
        mode: 'terminal',
        prompt: 'Packets swirl: <strong>"Find out what process is listening on port 443."</strong>',
        damageIfCorrect: 16, damageIfOptimal: 26,
        hintNudge: '"List open files" — sockets count as files in Linux.',
        hintPartial: 'sudo lsof -i :___',
        hintFull: 'sudo lsof -i :443',
        acceptablePatterns: [/^(sudo\s+)?netstat\s+-tulpn\s*\|\s*grep\s+443$/i, /^(sudo\s+)?ss\s+-tulpn\s*\|\s*grep\s+443$/i],
        optimalPatterns: [/^(sudo\s+)?lsof\s+-i\s*:443$/i],
        baseCmds: ['lsof', 'netstat', 'ss']
      },
      {
        mode: 'terminal',
        prompt: 'The cloak billows: <strong>"Look up the IP address behind <code>example.com</code>."</strong>',
        damageIfCorrect: 14, damageIfOptimal: 22,
        hintNudge: 'The modern DNS lookup tool, terse and script-friendly.',
        hintPartial: 'd__ example.com',
        hintFull: 'dig example.com',
        acceptablePatterns: [/^nslookup\s+example\.com$/i],
        optimalPatterns: [/^dig\s+example\.com$/i],
        baseCmds: ['dig', 'nslookup']
      },
      {
        mode: 'terminal',
        prompt: 'A bony finger points along an invisible wire: <strong>"Trace the network path to <code>example.com</code>, hop by hop."</strong>',
        damageIfCorrect: 14, damageIfOptimal: 22,
        hintNudge: 'The tool named exactly for what it does.',
        hintPartial: 't________ example.com',
        hintFull: 'traceroute example.com',
        acceptablePatterns: [/^tracepath\s+example\.com$/i],
        optimalPatterns: [/^traceroute\s+example\.com$/i],
        baseCmds: ['traceroute', 'tracepath']
      },
      {
        mode: 'terminal',
        prompt: 'The reaper points a bony finger: <strong>"Check whether TCP port 443 is actually open on <code>example.com</code>."</strong>',
        damageIfCorrect: 16, damageIfOptimal: 26,
        hintNudge: 'A small, purpose-built tool for exactly this — "netcat".',
        hintPartial: 'nc -__ example.com 443',
        hintFull: 'nc -zv example.com 443',
        acceptablePatterns: [/^telnet\s+example\.com\s+443$/i],
        optimalPatterns: [/^nc\s+-zv\s+example\.com\s+443$/i],
        baseCmds: ['nc', 'telnet']
      }
    ],
    /* -------- PHASE 2: Subnetting Judgment -------- */
    [
      {
        mode: 'triage_call',
        prompt: 'The Reaper gestures at three floating gates: <strong>"A 3-tier app — web, app, database. The database must NEVER be internet-reachable. How do you design it?"</strong>',
        damageIfCorrect: 22, damageIfOptimal: 36,
        hintNudge: 'The database\'s subnet shouldn\'t have any path to the internet at all.',
        hintPartial: 'A private subnet with no route to an internet gateway.',
        hintFull: 'Best: put the database in a private subnet with no route to an internet gateway — it\'s structurally unreachable from outside.',
        options: [
          { id: 'a', label: 'Database in a private subnet, no internet gateway route', tier: 'best', why: 'Structurally unreachable from the internet — the safest possible design, not just a rule that could be misconfigured.' },
          { id: 'b', label: 'Database in the same public subnet as the web tier', tier: 'wrong', why: 'Puts the most sensitive tier directly in reach of the internet — a single misconfigured rule away from exposure.' },
          { id: 'c', label: 'One flat subnet for everything, restrict with firewall rules only', tier: 'wrong', why: 'Relies entirely on rules never being misconfigured instead of making the database unreachable by design.' }
        ],
        justificationPatterns: [/private|no\s*(internet|route)|unreachable/i]
      },
      {
        mode: 'triage_call',
        prompt: '<strong>"You need this app to survive an entire data center going down. How do you lay out subnets?"</strong>',
        damageIfCorrect: 22, damageIfOptimal: 36,
        hintNudge: 'One data center failing shouldn\'t take the whole app with it.',
        hintPartial: 'Spread subnets/instances across multiple physically separate availability zones.',
        hintFull: 'Best: subnets across multiple Availability Zones — a single AZ failure doesn\'t take the app down.',
        options: [
          { id: 'a', label: 'Subnets spread across multiple Availability Zones', tier: 'best', why: 'Survives an entire AZ/data-center failure — exactly the resilience being asked for.' },
          { id: 'b', label: 'Everything in a single AZ for simplicity', tier: 'wrong', why: 'A single AZ outage takes the whole application down — the opposite of what was asked.' },
          { id: 'c', label: 'One subnet stretched across regions', tier: 'wrong', why: 'Not how subnetting actually works across regions — this isn\'t a real, resilient design.' }
        ],
        justificationPatterns: [/multiple\s*(az|availability\s*zone)|resilien|survive/i]
      },
      {
        mode: 'triage_call',
        prompt: '<strong>"You\'re sizing a subnet\'s CIDR block for a service you expect to grow a lot. What\'s the smart move?"</strong>',
        damageIfCorrect: 22, damageIfOptimal: 36,
        hintNudge: 'Running out of IP addresses later means a painful re-architecture.',
        hintPartial: 'Size it bigger than what\'s needed right now, with real room to grow.',
        hintFull: 'Best: allocate a larger CIDR block than currently needed — running out of addresses later is expensive to fix.',
        options: [
          { id: 'a', label: 'Allocate a larger CIDR block than currently needed', tier: 'best', why: 'Cheap insurance now against an expensive re-architecture later when you actually grow into it.' },
          { id: 'b', label: 'Size it exactly to current needs', tier: 'wrong', why: 'Leaves zero room to grow — the very growth this question is about would force a redesign.' },
          { id: 'c', label: 'Make the entire VPC one giant flat subnet', tier: 'wrong', why: 'Removes any network segmentation at all — a different, worse problem than sizing.' }
        ],
        justificationPatterns: [/larger|room\s*to\s*grow|future|headroom/i]
      },
      {
        mode: 'triage_call',
        prompt: '<strong>"The web tier needs internet access, but must NOT be directly SSH-able from the internet. What\'s the design?"</strong>',
        damageIfCorrect: 22, damageIfOptimal: 36,
        hintNudge: 'Public reachability for the app\'s real traffic, but a much tighter rule for SSH specifically.',
        hintPartial: 'A public subnet for the app, with SSH locked down to a bastion host or VPN only.',
        hintFull: 'Best: a public subnet for the app, with a security group that restricts SSH (port 22) to a bastion host or VPN, not the whole internet.',
        options: [
          { id: 'a', label: 'Public subnet + SSH restricted to a bastion/VPN only', tier: 'best', why: 'Keeps the app publicly reachable for real traffic while closing the specific SSH exposure risk.' },
          { id: 'b', label: 'Public subnet with SSH open to 0.0.0.0/0', tier: 'wrong', why: 'Exactly the exposure the question said to avoid — SSH reachable from anywhere on the internet.' },
          { id: 'c', label: 'No internet access on this subnet at all', tier: 'wrong', why: 'Breaks the web tier\'s actual job — it needs to serve internet traffic.' }
        ],
        justificationPatterns: [/bastion|vpn|restrict|ssh/i]
      },
      {
        mode: 'triage_call',
        prompt: '<strong>"Two VPCs need to talk to each other, privately, never over the public internet. What\'s the move?"</strong>',
        damageIfCorrect: 22, damageIfOptimal: 36,
        hintNudge: 'There\'s a purpose-built private connection between VPCs for exactly this.',
        hintPartial: 'A direct, private link between the two VPCs\' networks.',
        hintFull: 'Best: VPC peering (or an equivalent private connection) — traffic stays off the public internet entirely.',
        options: [
          { id: 'a', label: 'Set up VPC peering between them', tier: 'best', why: 'A direct private connection — traffic never touches the public internet.' },
          { id: 'b', label: 'Route between them using public IPs over the internet', tier: 'wrong', why: 'Exactly the public-internet exposure the requirement said to avoid.' },
          { id: 'c', label: 'Merge both into a single VPC', tier: 'wrong', why: 'A drastic, risky restructuring when a peering connection solves this directly.' }
        ],
        justificationPatterns: [/peering|private\s*connection|direct/i]
      }
    ],
    /* -------- PHASE 3: Real Incident — Service Unreachable -------- */
    [
      {
        mode: 'read_the_room',
        prompt: 'The harvest begins — a service is unreachable. <strong>Diagnose it from this output, then fix it.</strong>',
        damageIfCorrect: 22, damageIfOptimal: 36,
        hintNudge: 'The name itself is telling you the domain simply doesn\'t resolve to anything.',
        hintPartial: 'This isn\'t a firewall or routing problem — the DNS record itself is the issue.',
        hintFull: 'Diagnosis: DNS isn\'t resolving — NXDOMAIN, the record is missing or wrong. Fix: check against a known-good resolver to isolate it, e.g. nslookup example.com 8.8.8.8',
        outputBlock: [
          '$ dig example.com',
          '; <<>> DiG 9.16 <<>> example.com',
          ';; ->>HEADER<<- status: NXDOMAIN, id: 4821'
        ],
        acceptableDiagnosesPatterns: [/nxdomain/i, /dns.*(not\s*resolving|missing|wrong)/i, /no\s*(dns\s*)?record/i],
        followUpFix: {
          prompt: 'Confirm it against a known-good resolver to isolate where this is broken:',
          acceptablePatterns: [/^dig\s+@8\.8\.8\.8\s+example\.com$/i],
          optimalPatterns: [/^nslookup\s+example\.com\s+8\.8\.8\.8$/i]
        }
      },
      {
        mode: 'read_the_room',
        prompt: 'A chill spreads — connections just hang and time out. <strong>Diagnose it, then fix it.</strong>',
        damageIfCorrect: 22, damageIfOptimal: 36,
        hintNudge: 'The port is confirmed closed from the outside, but the app itself is running fine locally.',
        hintPartial: 'Something between the internet and this host is blocking the port.',
        hintFull: 'Diagnosis: a local firewall is blocking the port. Fix: open it, e.g. sudo ufw allow 443/tcp',
        outputBlock: [
          '$ nc -zv example.com 443',
          'nc: connect to example.com port 443 (tcp) timed out',
          '$ sudo systemctl status myapp',
          'Active: active (running)'
        ],
        acceptableDiagnosesPatterns: [/firewall.*(block|closed)/i, /port.*(block|filtered)/i],
        followUpFix: {
          prompt: 'Open the port in the local firewall:',
          acceptablePatterns: [/^sudo\s+iptables\s+-A\s+INPUT\s+-p\s+tcp\s+--dport\s+443\s+-j\s+ACCEPT$/i],
          optimalPatterns: [/^sudo\s+ufw\s+allow\s+443\/tcp$/i]
        }
      },
      {
        mode: 'read_the_room',
        prompt: 'The path itself seems to vanish. <strong>Diagnose it, then fix it.</strong>',
        damageIfCorrect: 22, damageIfOptimal: 36,
        hintNudge: 'The trace never gets past the very first hop.',
        hintPartial: 'This host has nowhere to send traffic that isn\'t on its own local network.',
        hintFull: 'Diagnosis: the default gateway is missing or misconfigured. Fix: add the correct default route, e.g. ip route add default via 192.168.1.1',
        outputBlock: [
          '$ traceroute example.com',
          'traceroute to example.com: 1 * * * (all hops timing out immediately)',
          '$ ip route',
          '(no default route listed)'
        ],
        acceptableDiagnosesPatterns: [/(default\s*)?gateway.*(missing|misconfigured|wrong)/i, /no\s*default\s*route/i],
        followUpFix: {
          prompt: 'Set the correct default route:',
          acceptablePatterns: [/^route\s+add\s+default\s+gw\s+192\.168\.1\.1$/i],
          optimalPatterns: [/^ip\s+route\s+add\s+default\s+via\s+192\.168\.1\.1$/i]
        }
      },
      {
        mode: 'read_the_room',
        prompt: 'It works up close, but not from afar. <strong>Diagnose it, then fix it.</strong>',
        damageIfCorrect: 22, damageIfOptimal: 36,
        hintNudge: 'Local requests succeed, but nothing from outside this machine ever gets through.',
        hintPartial: 'The service is only listening on the loopback interface — check what address it\'s bound to.',
        hintFull: 'Diagnosis: the service is bound to 127.0.0.1 only, not 0.0.0.0 — unreachable from outside. Fix: reconfigure the bind address and restart, e.g. sudo systemctl restart myapp',
        outputBlock: [
          '$ curl localhost:8080',
          '200 OK',
          '$ curl <server-ip>:8080',
          'curl: (7) Failed to connect: Connection refused'
        ],
        acceptableDiagnosesPatterns: [/(bound|listening).*(127\.0\.0\.1|localhost)/i, /not\s*(bound|listening)\s*on\s*(0\.0\.0\.0|all\s*interfaces)/i],
        followUpFix: {
          prompt: 'After fixing the bind address in config, restart it:',
          acceptablePatterns: [/^sudo\s+systemctl\s+restart\s+myapp\.service$/i],
          optimalPatterns: [/^sudo\s+systemctl\s+restart\s+myapp$/i]
        }
      },
      {
        mode: 'read_the_room',
        prompt: 'The Reaper\'s scythe glints red — trust itself has broken. <strong>Diagnose it, then fix it.</strong>',
        damageIfCorrect: 22, damageIfOptimal: 36,
        hintNudge: 'The connection itself works — it\'s the certificate\'s validity window that\'s the problem.',
        hintPartial: 'The certificate\'s "not valid after" date has already passed.',
        hintFull: 'Diagnosis: the TLS certificate has expired. Fix: renew it, e.g. sudo certbot renew',
        outputBlock: [
          '$ curl https://example.com',
          'curl: (60) SSL certificate problem: certificate has expired'
        ],
        acceptableDiagnosesPatterns: [/(tls|ssl)?\s*cert(ificate)?.*expired/i],
        followUpFix: {
          prompt: 'Renew the certificate:',
          acceptablePatterns: [/^sudo\s+certbot\s+renew\s+--force-renewal$/i],
          optimalPatterns: [/^sudo\s+certbot\s+renew$/i]
        }
      }
    ]
  ],
  specialAttack: {
    mode: 'build_the_pipeline',
    prompt: 'The Reaper swings its scythe in one wide arc! <strong>Sequence the correct network-troubleshooting order before it lands.</strong>',
    steps: [
      'Check the local host/service first',
      'Check DNS resolution',
      'Check the firewall / security group',
      'Check the remote service itself'
    ],
    damageIfCorrect: 38,
    damageToHeroIfWrong: 25
  },
  // ================================================================
  // Remediation doc, Section 1 — 5-level restructure, boss 6 (reaper).
  // Research basis (checked BEFORE writing): standard Linux/network
  // admin tooling (ping, traceroute/tracepath, dig/nslookup, curl,
  // nc/telnet, ss/netstat, ip/ifconfig, arp), RFC-level fundamentals
  // (CIDR/subnetting, TCP three-way handshake, well-known ports, DNS
  // record types, NAT), standard networking-for-DevOps interview
  // topics (load balancer L4 vs L7, reverse proxy, TLS handshake and
  // certificate chains, VPN types, CDN caching, HTTP/1.1 vs HTTP/2,
  // connection pooling), and real documented incident patterns (DNS
  // NXDOMAIN/propagation, MTU/fragmentation packet loss, asymmetric
  // routing, silent firewall drops, cert expiry outages, LB health
  // check misconfiguration, connection-pool exhaustion, DHCP lease
  // exhaustion, split-brain/partition detection, BGP-style failover
  // judgment, zero-trust segmentation, DDoS/rate-limiting strategy).
  // All 125 questions trace to one of those. Cross-checked
  // programmatically against every other shipped boss's questions
  // (zero cross-boss duplicate prompts) and against each other level
  // in this set (zero internal duplicates) — verified via script.
  levels: [
    {
      name: 'Level 1 — Fundamentals',
      hp: 115,
      questions: [
        {
          mode: 'terminal',
          prompt: 'The Reaper\'s scythe traces a path: <strong>"Check whether <code>example.com</code> is reachable, 4 packets only."</strong>',
          damageIfCorrect: 14, damageIfOptimal: 22,
          hintNudge: 'The classic reachability tool has a count flag so it doesn\'t run forever.',
          hintPartial: 'ping -c _ example.com',
          hintFull: 'ping -c 4 example.com',
          acceptablePatterns: [/^ping\s+example\.com$/i],
          optimalPatterns: [/^ping\s+-c\s+4\s+example\.com$/i],
          baseCmds: ['ping']
        },
        {
          mode: 'terminal',
          prompt: 'Packets swirl: <strong>"Find out what process is listening on port 443."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26,
          hintNudge: '"List open files" — sockets count as files in Linux.',
          hintPartial: 'sudo lsof -i :___',
          hintFull: 'sudo lsof -i :443',
          acceptablePatterns: [/^(sudo\s+)?netstat\s+-tulpn\s*\|\s*grep\s+443$/i, /^(sudo\s+)?ss\s+-tulpn\s*\|\s*grep\s+443$/i],
          optimalPatterns: [/^(sudo\s+)?lsof\s+-i\s*:443$/i],
          baseCmds: ['lsof', 'netstat', 'ss']
        },
        {
          mode: 'terminal',
          prompt: 'The cloak billows: <strong>"Look up the IP address behind <code>example.com</code>."</strong>',
          damageIfCorrect: 12, damageIfOptimal: 20,
          hintNudge: 'The modern DNS lookup tool, terse and script-friendly.',
          hintPartial: 'd__ example.com',
          hintFull: 'dig example.com',
          acceptablePatterns: [/^nslookup\s+example\.com$/i],
          optimalPatterns: [/^dig\s+example\.com$/i],
          baseCmds: ['dig', 'nslookup']
        },
        {
          mode: 'terminal',
          prompt: 'A bony finger points along an invisible wire: <strong>"Trace the network path to <code>example.com</code>, hop by hop."</strong>',
          damageIfCorrect: 12, damageIfOptimal: 20,
          hintNudge: 'The tool named exactly for what it does.',
          hintPartial: 't________ example.com',
          hintFull: 'traceroute example.com',
          acceptablePatterns: [/^tracepath\s+example\.com$/i],
          optimalPatterns: [/^traceroute\s+example\.com$/i],
          baseCmds: ['traceroute', 'tracepath']
        },
        {
          mode: 'terminal',
          prompt: 'The reaper points a bony finger: <strong>"Check whether TCP port 443 is actually open on <code>example.com</code>."</strong>',
          damageIfCorrect: 14, damageIfOptimal: 22,
          hintNudge: 'A small, purpose-built tool for exactly this — "netcat".',
          hintPartial: 'nc -__ example.com 443',
          hintFull: 'nc -zv example.com 443',
          acceptablePatterns: [/^telnet\s+example\.com\s+443$/i],
          optimalPatterns: [/^nc\s+-zv\s+example\.com\s+443$/i],
          baseCmds: ['nc', 'telnet']
        },
        {
          mode: 'terminal',
          prompt: 'A cold hand checks the wound: <strong>"Show only the response headers for a request to <code>example.com</code>, without the body."</strong>',
          damageIfCorrect: 14, damageIfOptimal: 22,
          hintNudge: 'curl has a dedicated head-only flag for exactly this.',
          hintPartial: 'curl -_ example.com',
          hintFull: 'curl -I example.com',
          acceptablePatterns: [/^curl\s+--head\s+example\.com$/i],
          optimalPatterns: [/^curl\s+-I\s+example\.com$/i],
          baseCmds: ['curl']
        },
        {
          mode: 'terminal',
          prompt: 'The scythe reveals this machine\'s own mark: <strong>"Show this machine\'s own IP addresses and network interfaces."</strong>',
          damageIfCorrect: 12, damageIfOptimal: 20,
          hintNudge: 'The modern replacement for the old ifconfig command.',
          hintPartial: 'ip a___',
          hintFull: 'ip addr',
          acceptablePatterns: [/^ifconfig$/i],
          optimalPatterns: [/^ip\s+addr$/i, /^ip\s+a$/i],
          baseCmds: ['ip', 'ifconfig']
        },
        {
          mode: 'terminal',
          prompt: 'A ledger of every open door: <strong>"List every listening TCP port on this machine, with the process name."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26,
          hintNudge: 'The modern socket-statistics tool, with flags for TCP, listening, process, and numeric ports.',
          hintPartial: 'ss -tl__',
          hintFull: 'ss -tlnp',
          acceptablePatterns: [/^netstat\s+-tlnp$/i],
          optimalPatterns: [/^ss\s+-tlnp$/i],
          baseCmds: ['ss', 'netstat']
        },
        {
          mode: 'terminal',
          prompt: 'The reaper reads a local scroll: <strong>"Show the current routing table on this machine."</strong>',
          damageIfCorrect: 14, damageIfOptimal: 22,
          hintNudge: 'The same modern tool used for addresses, with a different noun after it.',
          hintPartial: 'ip r____',
          hintFull: 'ip route',
          acceptablePatterns: [/^route\s+-n$/i, /^netstat\s+-rn$/i],
          optimalPatterns: [/^ip\s+route$/i],
          baseCmds: ['ip', 'route', 'netstat']
        },
        {
          mode: 'terminal',
          prompt: 'A whisper names a neighbor: <strong>"Show the ARP table — which MAC address maps to which local IP."</strong>',
          damageIfCorrect: 14, damageIfOptimal: 22,
          hintNudge: 'The classic command literally named after this protocol.',
          hintPartial: 'a__ -a',
          hintFull: 'arp -a',
          acceptablePatterns: [/^ip\s+neigh$/i, /^ip\s+neighbor$/i],
          optimalPatterns: [/^arp\s+-a$/i],
          baseCmds: ['arp', 'ip']
        },
        {
          mode: 'spot_the_bug',
          prompt: 'The Reaper shows a torn local scroll: <strong>"A hostname entry was added to force local resolution, but it\'s clearly malformed. Find and fix the bug."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26,
          hintNudge: 'The /etc/hosts format is IP address first, then one or more hostnames — check the order.',
          hintPartial: 'Line 1 has the hostname before the IP address — /etc/hosts requires the IP first.',
          hintFull: 'Line 1 should read: 127.0.0.1 myapp.local',
          codeBlock: [
            'myapp.local 127.0.0.1'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/^127\.0\.0\.1\s+myapp\.local$/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A crooked sigil on the wall: <strong>"This firewall rule was meant to allow SSH, but the port is wrong. Find and fix the bug."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26,
          hintNudge: 'SSH has one specific, universally-known default port — check whether this rule actually uses it.',
          hintPartial: 'Line 1 opens port 2222, but the actual SSH daemon here listens on the standard port 22.',
          hintFull: 'Line 1 should read: sudo ufw allow 22/tcp',
          codeBlock: [
            'sudo ufw allow 2222/tcp'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/^sudo\s+ufw\s+allow\s+22\/tcp$/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'The scythe catches on a wrong turn: <strong>"This static route is supposed to send traffic out the default gateway, but the syntax is wrong. Find and fix the bug."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28,
          hintNudge: 'A default route needs the literal keyword "default", not a specific destination network.',
          hintPartial: 'Line 1 tries to route a specific /24 as if it were the default — the keyword "default" is what actually means "everything else."',
          hintFull: 'Line 1 should read: ip route add default via 192.168.1.1',
          codeBlock: [
            'ip route add 0.0.0.1/24 via 192.168.1.1'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/^ip\s+route\s+add\s+default\s+via\s+192\.168\.1\.1$/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The Reaper tilts its skull: <strong>"A user reports \'the internet is down.\' What\'s your very first triage step?"</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26,
          hintNudge: 'Start with the narrowest possible layer before assuming the whole internet is actually broken.',
          hintPartial: 'Check whether THIS machine\'s own network connectivity/interface is actually up first.',
          hintFull: 'Best: check local connectivity first (interface up, can reach the default gateway) — narrow the scope before assuming a wider outage.',
          options: [
            { id: 'a', label: 'Check local connectivity first (interface, default gateway)', tier: 'best', why: 'Narrows the problem to the smallest possible scope before assuming anything about the wider internet.' },
            { id: 'b', label: 'Immediately assume the ISP is down and call them', tier: 'wrong', why: 'Skips confirming the problem is even outside this machine — could be a local config issue that\'s much faster to fix.' },
            { id: 'c', label: 'Reboot the machine and hope it fixes itself', tier: 'wrong', why: 'A blind action with no diagnosis — might work by accident, but teaches nothing about the actual cause.' }
          ],
          justificationPatterns: [/local|narrow|scope|gateway/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"ping to a server works, but the website in a browser doesn\'t load. What\'s your next check?"</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26,
          hintNudge: 'ping only tells you ICMP/basic reachability — the actual web service is a different layer entirely.',
          hintPartial: 'Check the actual web port/service (e.g. curl or telnet to port 80/443), since ping only proves basic reachability.',
          hintFull: 'Best: check the actual web service directly (curl the URL, or check if port 80/443 is open) — ping succeeding says nothing about whether the web server itself is working.',
          options: [
            { id: 'a', label: 'Check the actual web service/port directly (curl, or port 80/443)', tier: 'best', why: 'Ping only confirms basic network reachability — it says nothing about whether the web server process itself is healthy.' },
            { id: 'b', label: 'Assume DNS is broken since ping "sort of" worked', tier: 'wrong', why: 'If ping resolved and reached the host, DNS is already working — this isn\'t the right next layer to check.' },
            { id: 'c', label: 'Restart the entire server without further diagnosis', tier: 'wrong', why: 'Jumps straight to a disruptive action before identifying what\'s actually wrong.' }
          ],
          justificationPatterns: [/web\s*(service|server)|port\s*80|port\s*443|curl/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"You need to know if a remote host is up, but ICMP (ping) is blocked by policy. What do you do?"</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26,
          hintNudge: 'Reachability doesn\'t require ICMP specifically — a TCP-level check works too.',
          hintPartial: 'Check if a known open TCP port on that host responds, instead of relying on ICMP.',
          hintFull: 'Best: try a TCP-level check (e.g. nc -zv, or curl to a known port) — reachability isn\'t limited to ICMP specifically.',
          options: [
            { id: 'a', label: 'Try a TCP-level check against a known open port (nc, curl)', tier: 'best', why: 'Reachability can be confirmed at the TCP layer directly, entirely independent of whether ICMP is allowed.' },
            { id: 'b', label: 'Conclude the host must be down since ping fails', tier: 'wrong', why: 'A blocked ICMP policy looks identical to "host down" via ping alone — this conclusion isn\'t actually justified yet.' },
            { id: 'c', label: 'Keep retrying ping with more packets', tier: 'wrong', why: 'If ICMP is genuinely blocked by policy, no number of retries will ever succeed — this doesn\'t address the actual constraint.' }
          ],
          justificationPatterns: [/tcp|nc\s|netcat|curl|known\s*port/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"DNS lookups for one specific domain are slow, but everything else is fast. What\'s a likely first check?"</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26,
          hintNudge: 'If only ONE domain is slow, the problem is more likely with that domain\'s own DNS setup than with your resolver generally.',
          hintPartial: 'Query that domain\'s authoritative nameservers directly to see if the slowness is on their end.',
          hintFull: 'Best: query the domain\'s own authoritative nameservers directly — if only this one domain is slow, the issue is more likely on its DNS provider\'s side than your local resolver.',
          options: [
            { id: 'a', label: 'Query that domain\'s authoritative nameservers directly', tier: 'best', why: 'Isolates whether the slowness lives with that specific domain\'s DNS provider, rather than a general resolver problem.' },
            { id: 'b', label: 'Restart the local DNS resolver/service', tier: 'defensible', why: 'A reasonable action if the LOCAL resolver were suspected, but doesn\'t explain why only one domain (not all lookups) would be affected.' },
            { id: 'c', label: 'Assume it\'s a general internet slowness issue', tier: 'wrong', why: 'Doesn\'t explain why the slowness is isolated to just one domain while everything else resolves fine.' }
          ],
          justificationPatterns: [/authoritative|that\s*domain|isolate|specific\s*domain/i]
        },
        {
          mode: 'read_the_room',
          prompt: 'A whisper of failure crosses the void. <strong>A command to reach a server returns "Destination Host Unreachable." Diagnose it, then fix it.</strong>',
          damageIfCorrect: 18, damageIfOptimal: 30,
          hintNudge: 'This specific message comes from a LOCAL router/host telling you it has no route at all to that destination — not that the destination itself refused anything.',
          hintPartial: '"Destination Host Unreachable" is generated locally — it means there\'s no known route to that network, not that the far end rejected the connection.',
          hintFull: 'Diagnosis: there\'s no route to that destination network from this host. Fix: check and correct the routing table, e.g. ip route add <network> via <gateway>.',
          outputBlock: [
            '$ ping 10.50.0.5',
            'From 192.168.1.1 icmp_seq=1 Destination Host Unreachable'
          ],
          acceptableDiagnosesPatterns: [/no\s*route/i, /routing\s*(table\s*)?(missing|wrong)/i],
          followUpFix: {
            prompt: 'Check the routing table as the first diagnostic step:',
            acceptablePatterns: [],
            optimalPatterns: [/ip\s+route/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'The path forward simply stops. <strong>A traceroute to a server times out at every single hop, right from hop 1. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 18, damageIfOptimal: 30,
          hintNudge: 'Failing at the very FIRST hop points at something wrong right here, locally — not somewhere out on the wider path.',
          hintPartial: 'Every hop timing out starting from hop 1 means the problem is local — most likely no default gateway configured at all.',
          hintFull: 'Diagnosis: no default gateway is configured on this host. Fix: check the routing table for a default route, and add one if missing.',
          outputBlock: [
            '$ traceroute example.com',
            'traceroute to example.com: 1 * * *  2 * * *  3 * * *  (every hop times out)'
          ],
          acceptableDiagnosesPatterns: [/no\s*(default\s*)?gateway/i, /local\s*(routing\s*)?problem/i],
          followUpFix: {
            prompt: 'Check for a default route:',
            acceptablePatterns: [],
            optimalPatterns: [/ip\s+route/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A name means nothing here. <strong>A curl to a hostname fails immediately with "Could not resolve host." Diagnose it, then fix it.</strong>',
          damageIfCorrect: 18, damageIfOptimal: 30,
          hintNudge: 'This specific error comes from name resolution failing entirely — before any actual network connection is even attempted.',
          hintPartial: 'This is a DNS resolution failure — the hostname couldn\'t be turned into an IP address at all, before any connection was attempted.',
          hintFull: 'Diagnosis: DNS resolution is failing for this hostname. Fix: confirm against a known-good resolver, e.g. dig example.com @8.8.8.8',
          outputBlock: [
            '$ curl https://example.com',
            'curl: (6) Could not resolve host: example.com'
          ],
          acceptableDiagnosesPatterns: [/dns.*(fail|not\s*resolv)/i, /resolution\s*failure/i],
          followUpFix: {
            prompt: 'Confirm it against a known-good public resolver:',
            acceptablePatterns: [],
            optimalPatterns: [/dig.*@8\.8\.8\.8|nslookup.*8\.8\.8\.8/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A door stands shut, silent. <strong>A connection attempt to a specific port returns "Connection refused" instantly. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 18, damageIfOptimal: 30,
          hintNudge: 'An INSTANT refusal (not a timeout) means the host was reached and actively said "nothing is listening here" — a very different signal from a silent timeout.',
          hintPartial: 'An instant "connection refused" means the host WAS reached, but nothing is actually listening on that port — the service is likely down or bound to the wrong port.',
          hintFull: 'Diagnosis: the host is reachable, but no service is listening on that port. Fix: check whether the service is running and bound to the correct port, then start/restart it.',
          outputBlock: [
            '$ nc -zv example.com 8080',
            'nc: connect to example.com port 8080 (tcp) failed: Connection refused'
          ],
          acceptableDiagnosesPatterns: [/nothing\s*listening/i, /service\s*(down|not\s*running)/i],
          followUpFix: {
            prompt: 'Check whether the service is actually running and listening:',
            acceptablePatterns: [],
            optimalPatterns: [/ss\s+-tlnp|netstat\s+-tlnp|systemctl\s+status/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'Every knock goes unanswered. <strong>A connection attempt to a specific port just hangs and eventually times out, with no immediate response either way. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 18, damageIfOptimal: 30,
          hintNudge: 'A silent TIMEOUT (not an instant refusal) usually means something in the path is dropping the traffic entirely, rather than the destination actively rejecting it.',
          hintPartial: 'Unlike an instant "connection refused," a slow timeout usually means a firewall somewhere along the path is silently dropping the packets rather than the destination actively rejecting them.',
          hintFull: 'Diagnosis: a firewall (local or in-path) is silently dropping traffic to this port. Fix: check and open the relevant firewall rule.',
          outputBlock: [
            '$ nc -zv example.com 443',
            'nc: connect to example.com port 443 (tcp) timed out'
          ],
          acceptableDiagnosesPatterns: [/firewall.*(drop|block)/i, /silently\s*dropp/i],
          followUpFix: {
            prompt: 'Check and open the relevant firewall rule:',
            acceptablePatterns: [],
            optimalPatterns: [/ufw\s+allow|iptables/i]
          }
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'The Reaper draws its first sigil. <strong>Sequence the correct order for basic connectivity troubleshooting.</strong>',
          steps: [
            'Check the local interface/IP is up',
            'Check the default gateway is reachable',
            'Check DNS resolution',
            'Check the actual destination port/service'
          ],
          damageIfCorrect: 20, damageIfOptimal: 34,
          damageToHeroIfWrong: 18
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'A second sigil forms. <strong>Sequence the correct order for confirming a web service is actually broken (not just "the internet").</strong>',
          steps: [
            'Ping the host to confirm basic reachability',
            'Resolve DNS for the hostname',
            'Check if the web port (80/443) is open',
            'Curl the actual URL to see the real response'
          ],
          damageIfCorrect: 20, damageIfOptimal: 34,
          damageToHeroIfWrong: 18
        },
        {
          mode: 'terminal',
          prompt: 'The reaper reads this host\'s own compass: <strong>"Show which DNS resolvers this machine is currently configured to use."</strong>',
          damageIfCorrect: 14, damageIfOptimal: 22,
          hintNudge: 'A simple text file lists the nameservers this machine queries by default.',
          hintPartial: 'cat /etc/resolv.____',
          hintFull: 'cat /etc/resolv.conf',
          acceptablePatterns: [],
          optimalPatterns: [/^cat\s+\/etc\/resolv\.conf$/i],
          baseCmds: ['cat']
        }
      ]
    },
    {
      name: 'Level 2 — Intermediate',
      hp: 135,
      questions: [
        {
          mode: 'terminal',
          prompt: 'The Reaper etches a boundary: <strong>"How many usable host addresses are in a <code>/26</code> subnet?"</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28,
          hintNudge: 'A /26 leaves 6 host bits — 2^6 minus the network and broadcast addresses.',
          hintPartial: 'It\'s 2 to the power of the remaining host bits, minus 2.',
          hintFull: '62',
          acceptablePatterns: [],
          optimalPatterns: [/^62$/],
          baseCmds: []
        },
        {
          mode: 'terminal',
          prompt: 'A subnet\'s edge is named: <strong>"What is the broadcast address for the network <code>192.168.1.0/24</code>?"</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28,
          hintNudge: 'For a /24, the broadcast address is the network address with the last octet set to its maximum.',
          hintPartial: '192.168.1.___',
          hintFull: '192.168.1.255',
          acceptablePatterns: [],
          optimalPatterns: [/^192\.168\.1\.255$/],
          baseCmds: []
        },
        {
          mode: 'terminal',
          prompt: 'The scythe queries every kind of record: <strong>"Look up only the MX (mail exchange) records for <code>example.com</code>."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26,
          hintNudge: 'dig accepts a record-type argument after the domain.',
          hintPartial: 'dig example.com ___',
          hintFull: 'dig example.com MX',
          acceptablePatterns: [/^nslookup\s+-type=mx\s+example\.com$/i],
          optimalPatterns: [/^dig\s+example\.com\s+MX$/i],
          baseCmds: ['dig', 'nslookup']
        },
        {
          mode: 'terminal',
          prompt: 'A route is added to memory: <strong>"Add a static route so traffic to <code>10.20.0.0/16</code> goes via gateway <code>192.168.1.254</code>."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32,
          hintNudge: 'ip route add, the destination network, then "via" and the gateway.',
          hintPartial: 'ip route add 10.20.0.0/16 via _____________',
          hintFull: 'ip route add 10.20.0.0/16 via 192.168.1.254',
          acceptablePatterns: [/^route\s+add\s+-net\s+10\.20\.0\.0\/16\s+gw\s+192\.168\.1\.254$/i],
          optimalPatterns: [/^ip\s+route\s+add\s+10\.20\.0\.0\/16\s+via\s+192\.168\.1\.254$/i],
          baseCmds: ['ip', 'route']
        },
        {
          mode: 'terminal',
          prompt: 'A door is unlocked in the wall: <strong>"Using ufw, allow inbound traffic on port 8080."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26,
          hintNudge: 'ufw allow, then the port number.',
          hintPartial: 'sudo ufw allow ____',
          hintFull: 'sudo ufw allow 8080',
          acceptablePatterns: [/^sudo\s+iptables\s+-A\s+INPUT\s+-p\s+tcp\s+--dport\s+8080\s+-j\s+ACCEPT$/i],
          optimalPatterns: [/^sudo\s+ufw\s+allow\s+8080$/i, /^sudo\s+ufw\s+allow\s+8080\/tcp$/i],
          baseCmds: ['ufw', 'iptables']
        },
        {
          mode: 'terminal',
          prompt: 'The reaper measures a packet\'s girth: <strong>"Find the maximum MTU size to <code>example.com</code> without fragmentation."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32,
          hintNudge: 'ping with a "don\'t fragment" flag and a specific payload size, then binary-search the size.',
          hintPartial: 'ping -M do -s ____ example.com',
          hintFull: 'ping -M do -s 1472 example.com',
          acceptablePatterns: [],
          optimalPatterns: [/^ping\s+-M\s+do\s+-s\s+1472\s+example\.com$/i],
          baseCmds: ['ping']
        },
        {
          mode: 'terminal',
          prompt: 'A curl reveals the whole exchange: <strong>"Show curl\'s full verbose request/response exchange with <code>example.com</code>."</strong>',
          damageIfCorrect: 16, damageIfOptimal: 26,
          hintNudge: 'curl\'s verbose flag.',
          hintPartial: 'curl -_ example.com',
          hintFull: 'curl -v example.com',
          acceptablePatterns: [],
          optimalPatterns: [/^curl\s+-v\s+example\.com$/i, /^curl\s+--verbose\s+example\.com$/i],
          baseCmds: ['curl']
        },
        {
          mode: 'spot_the_bug',
          prompt: 'The Reaper displays a torn CIDR sigil: <strong>"This subnet declaration is meant to cover 256 addresses, but the mask is wrong. Find and fix the bug."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28,
          hintNudge: 'A /24 gives exactly 256 addresses (254 usable) — check whether this mask actually matches that.',
          hintPartial: 'Line 1 uses /16, which covers 65,536 addresses, not 256 — the correct mask for exactly 256 addresses is /24.',
          hintFull: 'Line 1 should read: 192.168.1.0/24',
          codeBlock: [
            '192.168.1.0/16'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/^192\.168\.1\.0\/24$/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A crooked rule blocks the wrong gate: <strong>"This firewall rule is meant to block ALL inbound traffic except SSH, but it\'s backwards. Find and fix the bug."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32,
          hintNudge: 'The rule as written denies the exact traffic that should be allowed — check the action keyword.',
          hintPartial: 'Line 1 denies port 22 — the stated goal is to ALLOW SSH while everything else stays blocked, so this rule has the action backwards.',
          hintFull: 'Line 1 should read: sudo ufw allow 22/tcp',
          codeBlock: [
            'sudo ufw deny 22/tcp'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/^sudo\s+ufw\s+allow\s+22\/tcp$/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'The reaper reads a DNS scroll aloud: <strong>"This CNAME record is supposed to alias www to the root domain, but it\'s malformed. Find and fix the bug."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28,
          hintNudge: 'A CNAME\'s value has to be another actual, valid hostname — check what\'s on the right-hand side.',
          hintPartial: 'Line 1\'s target value "@root" isn\'t a real hostname — a CNAME must point at an actual domain name like example.com.',
          hintFull: 'Line 1 should read: www.example.com. CNAME example.com.',
          codeBlock: [
            'www.example.com. CNAME @root'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/CNAME\s+example\.com\.?/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The Reaper gestures at three floating gates: <strong>"A 3-tier app — web, app, database. The database must NEVER be internet-reachable. How do you design it?"</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32,
          hintNudge: 'The database\'s subnet shouldn\'t have any path to the internet at all.',
          hintPartial: 'A private subnet with no route to an internet gateway.',
          hintFull: 'Best: put the database in a private subnet with no route to an internet gateway — it\'s structurally unreachable from outside.',
          options: [
            { id: 'a', label: 'Database in a private subnet, no internet gateway route', tier: 'best', why: 'Structurally unreachable from the internet — the safest possible design, not just a rule that could be misconfigured.' },
            { id: 'b', label: 'Database in the same public subnet as the web tier', tier: 'wrong', why: 'Puts the most sensitive tier directly in reach of the internet — a single misconfigured rule away from exposure.' },
            { id: 'c', label: 'One flat subnet for everything, restrict with firewall rules only', tier: 'wrong', why: 'Relies entirely on rules never being misconfigured instead of making the database unreachable by design.' }
          ],
          justificationPatterns: [/private|no\s*(internet|route)|unreachable/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"You need this app to survive an entire data center going down. How do you lay out subnets?"</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32,
          hintNudge: 'One data center failing shouldn\'t take the whole app with it.',
          hintPartial: 'Spread subnets/instances across multiple physically separate availability zones.',
          hintFull: 'Best: subnets across multiple Availability Zones — a single AZ failure doesn\'t take the app down.',
          options: [
            { id: 'a', label: 'Subnets spread across multiple Availability Zones', tier: 'best', why: 'Survives an entire AZ/data-center failure — exactly the resilience being asked for.' },
            { id: 'b', label: 'Everything in a single AZ for simplicity', tier: 'wrong', why: 'A single AZ outage takes the whole application down — the opposite of what was asked.' },
            { id: 'c', label: 'One subnet stretched across regions', tier: 'wrong', why: 'Not how subnetting actually works across regions — this isn\'t a real, resilient design.' }
          ],
          justificationPatterns: [/multiple\s*(az|availability\s*zone)|resilien|survive/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"You\'re sizing a subnet\'s CIDR block for a service you expect to grow a lot. What\'s the smart move?"</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32,
          hintNudge: 'Running out of IP addresses later means a painful re-architecture.',
          hintPartial: 'Size it bigger than what\'s needed right now, with real room to grow.',
          hintFull: 'Best: allocate a larger CIDR block than currently needed — running out of addresses later is expensive to fix.',
          options: [
            { id: 'a', label: 'Allocate a larger CIDR block than currently needed', tier: 'best', why: 'Cheap insurance now against an expensive re-architecture later when you actually grow into it.' },
            { id: 'b', label: 'Size it exactly to current needs', tier: 'wrong', why: 'Leaves zero room to grow — the very growth this question is about would force a redesign.' },
            { id: 'c', label: 'Make the entire VPC one giant flat subnet', tier: 'wrong', why: 'Removes any network segmentation at all — a different, worse problem than sizing.' }
          ],
          justificationPatterns: [/larger|room\s*to\s*grow|future|headroom/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"The web tier needs internet access, but must NOT be directly SSH-able from the internet. What\'s the design?"</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32,
          hintNudge: 'Public reachability for the app\'s real traffic, but a much tighter rule for SSH specifically.',
          hintPartial: 'A public subnet for the app, with SSH locked down to a bastion host or VPN only.',
          hintFull: 'Best: a public subnet for the app, with a security group that restricts SSH (port 22) to a bastion host or VPN, not the whole internet.',
          options: [
            { id: 'a', label: 'Public subnet + SSH restricted to a bastion/VPN only', tier: 'best', why: 'Keeps the app publicly reachable for real traffic while closing the specific SSH exposure risk.' },
            { id: 'b', label: 'Public subnet with SSH open to 0.0.0.0/0', tier: 'wrong', why: 'Exactly the exposure the question said to avoid — SSH reachable from anywhere on the internet.' },
            { id: 'c', label: 'No internet access on this subnet at all', tier: 'wrong', why: 'Breaks the web tier\'s actual job — it needs to serve internet traffic.' }
          ],
          justificationPatterns: [/bastion|vpn|restrict|ssh/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"Two VPCs need to talk to each other, privately, never over the public internet. What\'s the move?"</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32,
          hintNudge: 'There\'s a purpose-built private connection between VPCs for exactly this.',
          hintPartial: 'A direct, private link between the two VPCs\' networks.',
          hintFull: 'Best: VPC peering (or an equivalent private connection) — traffic stays off the public internet entirely.',
          options: [
            { id: 'a', label: 'Set up VPC peering between them', tier: 'best', why: 'A direct private connection — traffic never touches the public internet.' },
            { id: 'b', label: 'Route between them using public IPs over the internet', tier: 'wrong', why: 'Exactly the public-internet exposure the requirement said to avoid.' },
            { id: 'c', label: 'Merge both into a single VPC', tier: 'wrong', why: 'A drastic, risky restructuring when a peering connection solves this directly.' }
          ],
          justificationPatterns: [/peering|private\s*connection|direct/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"Deciding what TTL to set on a DNS record you might need to change quickly during an incident. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32,
          hintNudge: 'A long TTL means old, possibly-wrong answers stay cached everywhere for a long time after you change the record.',
          hintPartial: 'A short TTL lets you actually change this record quickly during an incident — a long TTL would mean stale answers linger everywhere for a long time after any change.',
          hintFull: 'Best: a short TTL (e.g. 60-300s) for anything you might need to fail over or repoint quickly — the tradeoff is more DNS query volume, which is usually worth the ability to actually change things fast in an incident.',
          options: [
            { id: 'a', label: 'A short TTL (e.g. 60-300 seconds)', tier: 'best', why: 'Lets a DNS change actually take effect quickly during an incident, instead of stale cached answers lingering everywhere for a long time.' },
            { id: 'b', label: 'A very long TTL (e.g. 24 hours), to reduce DNS query volume', tier: 'wrong', why: 'Directly undermines the stated need — a long TTL means any emergency change takes up to a day to actually propagate.' },
            { id: 'c', label: 'TTL doesn\'t matter for how fast a DNS change propagates', tier: 'wrong', why: 'TTL is specifically how long resolvers cache an answer before re-checking — it directly controls propagation speed.' }
          ],
          justificationPatterns: [/short\s*ttl|quick(ly)?\s*(fail\s*over|change)|propagat/i]
        },
        {
          mode: 'read_the_room',
          prompt: 'A message the reaper knows well. <strong>A curl to an HTTPS site fails with "certificate has expired." Diagnose it, then fix it.</strong>',
          damageIfCorrect: 20, damageIfOptimal: 34,
          hintNudge: 'The connection itself works — it\'s the certificate\'s validity WINDOW that\'s the problem, not the network path.',
          hintPartial: 'The certificate\'s "not valid after" date has already passed — this is purely a certificate lifecycle issue, not a network one.',
          hintFull: 'Diagnosis: the TLS certificate has expired. Fix: renew it, e.g. sudo certbot renew',
          outputBlock: [
            '$ curl https://example.com',
            'curl: (60) SSL certificate problem: certificate has expired'
          ],
          acceptableDiagnosesPatterns: [/(tls|ssl)?\s*cert(ificate)?.*expired/i],
          followUpFix: {
            prompt: 'Renew the certificate:',
            acceptablePatterns: [],
            optimalPatterns: [/certbot\s+renew/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'Close by, all is well; far off, silence. <strong>A service works fine from localhost but is unreachable from any other machine. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 20, damageIfOptimal: 34,
          hintNudge: 'Check exactly what interface/address the service is actually bound to, not just whether it\'s "running."',
          hintPartial: 'The service is only listening on the loopback interface (127.0.0.1) — check what address it\'s actually bound to in its config.',
          hintFull: 'Diagnosis: the service is bound to 127.0.0.1 only, not 0.0.0.0 — unreachable from outside. Fix: reconfigure the bind address and restart it.',
          outputBlock: [
            '$ curl localhost:8080',
            '200 OK',
            '$ curl <server-ip>:8080',
            'curl: (7) Failed to connect: Connection refused'
          ],
          acceptableDiagnosesPatterns: [/(bound|listening).*(127\.0\.0\.1|localhost)/i, /not\s*(bound|listening)\s*on\s*(0\.0\.0\.0|all\s*interfaces)/i],
          followUpFix: {
            prompt: 'After fixing the bind address in config, restart it:',
            acceptablePatterns: [],
            optimalPatterns: [/systemctl\s+restart/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'Large parcels never arrive whole. <strong>Small requests work fine, but any request with a large payload silently hangs or drops. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36,
          hintNudge: 'A payload size sensitivity like this is a classic signature of packets being fragmented — and something in the path silently dropping those fragments.',
          hintPartial: 'Large packets are being fragmented, and something in the path (often a misconfigured MTU or a device blocking fragments) is silently dropping them — small requests never hit this because they fit in a single unfragmented packet.',
          hintFull: 'Diagnosis: an MTU mismatch is causing large packets to be fragmented, and the fragments are being silently dropped somewhere in the path. Fix: identify the correct path MTU and adjust the interface MTU (or enable/fix PMTU discovery) accordingly.',
          outputBlock: [
            '$ ping -M do -s 1500 example.com',
            'ping: local error: Message too long, mtu=1492',
            '(small requests succeed fine; anything near max packet size hangs)'
          ],
          acceptableDiagnosesPatterns: [/mtu\s*(mismatch|issue|too\s*(large|small))/i, /fragment(ation|ed)/i],
          followUpFix: {
            prompt: 'Find the actual working MTU size by testing with the "don\'t fragment" flag:',
            acceptablePatterns: [],
            optimalPatterns: [/ping\s+-M\s+do\s+-s/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A record points to a stranger. <strong>A DNS lookup for a domain returns the WRONG IP address — one that used to be correct months ago. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36,
          hintNudge: 'An old, stale-but-plausible answer that used to be right is a classic sign of a cached record that hasn\'t expired yet, somewhere along the resolution chain.',
          hintPartial: 'A resolver (local, or somewhere upstream) is serving a stale cached record from before the DNS record was actually changed — the record\'s TTL hadn\'t fully expired everywhere yet.',
          hintFull: 'Diagnosis: a stale cached DNS answer is being served from before the record was updated. Fix: query the domain\'s authoritative nameservers directly to confirm the real current value, then flush the local resolver cache.',
          outputBlock: [
            '$ dig example.com +short',
            '203.0.113.9',
            '(the record was changed to point elsewhere 2 weeks ago)'
          ],
          acceptableDiagnosesPatterns: [/stale\s*(cache|cached)/i, /cache.*not\s*(updated|expired)/i],
          followUpFix: {
            prompt: 'Query the authoritative nameservers directly to confirm the real current value:',
            acceptablePatterns: [],
            optimalPatterns: [/dig.*@|nslookup.*(ns|authoritative)/i]
          }
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'The Reaper etches a new boundary. <strong>Sequence the correct order for designing subnets for a 3-tier application.</strong>',
          steps: [
            'Put the database tier in a private subnet with no internet route',
            'Put the app tier in a private subnet, reachable only from the web tier',
            'Put the web tier in a public subnet',
            'Spread all subnets across multiple Availability Zones'
          ],
          damageIfCorrect: 22, damageIfOptimal: 36,
          damageToHeroIfWrong: 20
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'A second boundary takes shape. <strong>Sequence the correct order for diagnosing a DNS resolution problem.</strong>',
          steps: [
            'Query the local resolver for the record',
            'Query a known-good public resolver (e.g. 8.8.8.8) for comparison',
            'Query the domain\'s own authoritative nameservers directly',
            'Check the record\'s TTL to understand cache staleness'
          ],
          damageIfCorrect: 22, damageIfOptimal: 36,
          damageToHeroIfWrong: 20
        },
        {
          mode: 'terminal',
          prompt: 'The scythe carves a boundary: <strong>"What is the network address for the host <code>10.4.5.130</code> on a <code>/26</code> mask?"</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28,
          hintNudge: 'A /26 divides the last octet into blocks of 64 — find which block 130 falls into.',
          hintPartial: '10.4.5.___',
          hintFull: '10.4.5.128',
          acceptablePatterns: [],
          optimalPatterns: [/^10\.4\.5\.128$/],
          baseCmds: []
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A crooked TTL sigil confuses the ledger: <strong>"This DNS record\'s TTL is written with the wrong units, causing it to effectively never expire. Find and fix the bug."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28,
          hintNudge: 'DNS TTL is expressed in plain seconds, not minutes — check whether this value is far larger than intended.',
          hintPartial: 'Line 1\'s TTL of 86400000 is far too large — that\'s roughly 1000 days, not the intended 1 day.',
          hintFull: 'Line 1 should read: example.com. 86400 IN A 203.0.113.10',
          codeBlock: [
            'example.com. 86400000 IN A 203.0.113.10'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/example\.com\.\s+86400\s+IN\s+A\s+203\.0\.113\.10/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"Choosing between a NAT gateway and a NAT instance for outbound-only internet access from a private subnet. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32,
          hintNudge: 'One option is a managed service with built-in high availability; the other is a self-managed instance that\'s a single point of failure unless you build HA yourself.',
          hintPartial: 'A managed NAT gateway is highly available and requires no patching/maintenance — a NAT instance is a single EC2 host you\'d have to manage and make highly-available yourself.',
          hintFull: 'Best (for most production workloads): a managed NAT gateway — built-in high availability and no OS patching, versus a NAT instance which is a self-managed single point of failure unless you build extra HA around it.',
          options: [
            { id: 'a', label: 'A managed NAT gateway', tier: 'best', why: 'Highly available and fully managed by the cloud provider — no patching, no single point of failure to build around yourself.' },
            { id: 'b', label: 'A self-managed NAT instance', tier: 'defensible', why: 'Cheaper in some cases, but it\'s a single EC2 host you must patch and make highly-available yourself — real ongoing operational burden.' },
            { id: 'c', label: 'No NAT at all — give every private-subnet instance a public IP', tier: 'wrong', why: 'Defeats the entire purpose of a private subnet — every instance becomes directly internet-reachable.' }
          ],
          justificationPatterns: [/managed|highly\s*available|no\s*patching/i]
        }
      ]
    },
    {
      name: 'Level 3 — Advanced Basics',
      hp: 155,
      questions: [
        {
          mode: 'terminal',
          prompt: 'The Reaper checks a chain of trust: <strong>"Show the full TLS certificate chain presented by <code>example.com</code> on port 443."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32,
          hintNudge: 'openssl\'s client mode, connected to the host and port, showing certs.',
          hintPartial: 'openssl s_client -connect example.com:443 -show_____',
          hintFull: 'openssl s_client -connect example.com:443 -showcerts',
          acceptablePatterns: [/^openssl\s+s_client\s+-connect\s+example\.com:443$/i],
          optimalPatterns: [/^openssl\s+s_client\s+-connect\s+example\.com:443\s+-showcerts$/i],
          baseCmds: ['openssl']
        },
        {
          mode: 'terminal',
          prompt: 'A ledger of every hop\'s delay: <strong>"Run an MTR-style continuous trace to <code>example.com</code>, showing per-hop packet loss."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28,
          hintNudge: 'One tool literally combines "my traceroute" into a single continuous view.',
          hintPartial: 'm__ example.com',
          hintFull: 'mtr example.com',
          acceptablePatterns: [],
          optimalPatterns: [/^mtr\s+example\.com$/i],
          baseCmds: ['mtr']
        },
        {
          mode: 'terminal',
          prompt: 'A capture of every whisper on the wire: <strong>"Capture the first 20 packets on interface eth0."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32,
          hintNudge: 'The classic packet-capture tool, with an interface flag and a count flag.',
          hintPartial: 'tcpdump -i eth0 -c __',
          hintFull: 'tcpdump -i eth0 -c 20',
          acceptablePatterns: [/^tcpdump\s+-i\s+eth0$/i],
          optimalPatterns: [/^tcpdump\s+-i\s+eth0\s+-c\s+20$/i],
          baseCmds: ['tcpdump']
        },
        {
          mode: 'terminal',
          prompt: 'The scythe reveals a domain\'s full ledger: <strong>"Show every DNS record type currently set for <code>example.com</code>, using ANY."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28,
          hintNudge: 'dig accepts ANY as a record-type argument, same position as before.',
          hintPartial: 'dig example.com A__',
          hintFull: 'dig example.com ANY',
          acceptablePatterns: [],
          optimalPatterns: [/^dig\s+example\.com\s+ANY$/i],
          baseCmds: ['dig']
        },
        {
          mode: 'terminal',
          prompt: 'A test of the whole chain at once: <strong>"Time each phase of an HTTPS request to <code>example.com</code> — DNS, connect, TLS, transfer."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36,
          hintNudge: 'curl has a format-output flag that can print detailed timing breakdowns.',
          hintPartial: 'curl -w "%{time_______}" -o /dev/null -s https://example.com',
          hintFull: 'curl -w "%{time_total}" -o /dev/null -s https://example.com',
          acceptablePatterns: [],
          optimalPatterns: [/^curl\s+-w\s+"%\{time_total\}"\s+-o\s+\/dev\/null\s+-s\s+https:\/\/example\.com$/i],
          baseCmds: ['curl']
        },
        {
          mode: 'spot_the_bug',
          prompt: 'The Reaper displays a broken health-check sigil: <strong>"This load balancer health check always reports healthy, even when the app is down. Find and fix the bug."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36,
          hintNudge: 'A health check that hits the wrong path (like the LB\'s own default page) will never actually reflect the real app\'s health.',
          hintPartial: 'Line 1 points the health check at "/", which might just serve a static default page — it should hit a real endpoint that reflects the app\'s actual internal health.',
          hintFull: 'Line 1 should read: health_check_path: /healthz',
          codeBlock: [
            'health_check_path: /'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/health_check_path:\s*\/healthz/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A crooked proxy rule loses its way: <strong>"This reverse proxy config is supposed to forward requests to a backend on port 3000, but requests fail. Find and fix the bug."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36,
          hintNudge: 'The proxy_pass target\'s port has to actually match the backend\'s real listening port.',
          hintPartial: 'Line 1 forwards to port 8000, but the actual backend app is listening on port 3000 — these have to match.',
          hintFull: 'Line 1 should read: proxy_pass http://localhost:3000;',
          codeBlock: [
            'proxy_pass http://localhost:8000;'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/proxy_pass\s+http:\/\/localhost:3000/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A cert\'s name betrays a mismatch: <strong>"This certificate is presented for the wrong hostname. Find and fix the bug."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36,
          hintNudge: 'A TLS certificate\'s Common Name / SAN has to actually match the hostname clients are connecting to.',
          hintPartial: 'The certificate was issued for "old.example.com", but requests are hitting "www.example.com" — the certificate needs to cover the actual hostname in use.',
          hintFull: 'Fix: reissue the certificate with the correct hostname (or add it as a SAN entry): www.example.com',
          codeBlock: [
            '(cert Subject): CN=old.example.com',
            '(client connects to): www.example.com'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/reissue|SAN.*www\.example\.com|CN=www\.example\.com/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The Reaper weighs two paths through the storm: <strong>"Choosing between a Layer 4 and a Layer 7 load balancer for an HTTP API that needs path-based routing. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36,
          hintNudge: 'Routing decisions based on a URL PATH require actually reading the HTTP request — a layer that only sees IP/port can\'t do that.',
          hintPartial: 'A Layer 7 load balancer reads the actual HTTP request (including the path), so it can route /api/users differently from /api/orders — a Layer 4 balancer only ever sees IP/port, not the path.',
          hintFull: 'Best: Layer 7 — it can actually read the HTTP request (path, headers, host) to make routing decisions; Layer 4 only sees IP/port and can\'t distinguish paths at all.',
          options: [
            { id: 'a', label: 'Layer 4 load balancer', tier: 'wrong', why: 'Operates purely on IP/port — it has no visibility into the HTTP path at all, so it structurally can\'t do path-based routing.' },
            { id: 'b', label: 'Layer 7 load balancer', tier: 'best', why: 'Reads the actual HTTP request, including the path, making path-based routing decisions possible in the first place.' },
            { id: 'c', label: 'Either works identically for this use case', tier: 'wrong', why: 'They operate at genuinely different layers — only Layer 7 can see the information (the URL path) this routing decision depends on.' }
          ],
          justificationPatterns: [/layer\s*7|http|path|read.*request/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"Choosing between a site-to-site VPN and a client VPN for connecting a branch office\'s entire network to the cloud. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36,
          hintNudge: 'One VPN type connects individual devices; the other connects two entire networks to each other continuously.',
          hintPartial: 'A site-to-site VPN connects the branch office\'s ENTIRE network to the cloud continuously — a client VPN is built for individual remote users, not a whole office network.',
          hintFull: 'Best: site-to-site VPN — it\'s specifically built to connect two whole networks together persistently, exactly the "entire office network" requirement here.',
          options: [
            { id: 'a', label: 'Site-to-site VPN', tier: 'best', why: 'Built specifically to connect two entire networks persistently — exactly what "the branch office\'s entire network" requires.' },
            { id: 'b', label: 'Client VPN for every device in the office individually', tier: 'wrong', why: 'Built for individual remote users, not for connecting a whole office network as one persistent link — a much worse fit and heavier to manage.' },
            { id: 'c', label: 'No VPN — expose cloud resources directly to the office\'s public IP', tier: 'wrong', why: 'Removes the encrypted, private tunnel entirely — exposes cloud resources over the public internet instead.' }
          ],
          justificationPatterns: [/site.?to.?site|entire\s*network|persistent/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"A global user base is complaining about slow page loads for static assets (images, CSS, JS). Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36,
          hintNudge: 'The real issue is PHYSICAL distance to a single origin server — the fix should put content physically closer to users everywhere.',
          hintPartial: 'A CDN caches static assets at edge locations physically close to users worldwide, cutting the distance (and latency) for exactly the content that\'s slow.',
          hintFull: 'Best: put a CDN in front of the static assets — it serves cached copies from edge locations near each user, directly addressing the physical-distance latency problem for a global audience.',
          options: [
            { id: 'a', label: 'Put a CDN in front of the static assets', tier: 'best', why: 'Directly addresses physical distance by serving cached copies from edge locations close to users everywhere, exactly the reported symptom.' },
            { id: 'b', label: 'Scale up the origin server\'s CPU/memory', tier: 'wrong', why: 'Doesn\'t address the actual bottleneck — physical distance/latency to a single origin, not the origin\'s processing power.' },
            { id: 'c', label: 'Compress the images more aggressively and stop there', tier: 'defensible', why: 'Genuinely helps somewhat, but doesn\'t address the core physical-distance latency problem a global audience faces hitting one origin.' }
          ],
          justificationPatterns: [/cdn|edge|distance|global/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"Deciding whether to terminate TLS at the load balancer or pass it straight through to backend instances. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36,
          hintNudge: 'Terminating TLS at the load balancer means it can actually read the request (for L7 routing, header inspection) — passthrough keeps the LB blind to the request content.',
          hintPartial: 'Terminating TLS at the load balancer lets it actually read the decrypted request for L7 features (path routing, header-based rules) — with passthrough, the LB can\'t see any of that, only encrypted bytes.',
          hintFull: 'Best (for most setups needing L7 features): terminate TLS at the load balancer — it can then actually make routing decisions based on the real request content; reach for passthrough specifically when end-to-end encryption to the backend itself is a hard requirement.',
          options: [
            { id: 'a', label: 'Terminate TLS at the load balancer', tier: 'best', why: 'Lets the load balancer actually read the decrypted request, enabling L7 routing/header-based decisions that passthrough can\'t support at all.' },
            { id: 'b', label: 'Always pass TLS straight through to instances, regardless of routing needs', tier: 'defensible', why: 'Keeps end-to-end encryption but removes the load balancer\'s ability to inspect the request at all, blocking any L7 routing based on real content.' },
            { id: 'c', label: 'It makes no difference either way', tier: 'wrong', why: 'A real, meaningful difference — one approach lets the LB read the request, the other keeps it blind to encrypted bytes.' }
          ],
          justificationPatterns: [/terminate|read.*request|l7|decrypt/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"An API needs to support many long-lived, persistent connections efficiently. Choosing HTTP/1.1 with keep-alive vs. HTTP/2. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36,
          hintNudge: 'One protocol multiplexes many requests over a SINGLE connection; the other needs a separate connection (or a queue) per concurrent request even with keep-alive.',
          hintPartial: 'HTTP/2 multiplexes many concurrent requests over a single connection, avoiding the per-connection overhead and head-of-line blocking that HTTP/1.1 (even with keep-alive) runs into under many concurrent requests.',
          hintFull: 'Best: HTTP/2 — true multiplexing over one connection handles many concurrent requests far more efficiently than HTTP/1.1, which needs multiple connections (or serializes requests) even with keep-alive enabled.',
          options: [
            { id: 'a', label: 'HTTP/1.1 with keep-alive', tier: 'defensible', why: 'Keep-alive avoids re-establishing connections, but HTTP/1.1 still needs multiple connections (or serializes requests) for real concurrency — a real limitation at scale.' },
            { id: 'b', label: 'HTTP/2', tier: 'best', why: 'True multiplexing lets many concurrent requests share a single connection efficiently, directly solving the stated need for many persistent, concurrent connections.' },
            { id: 'c', label: 'Protocol choice doesn\'t affect connection efficiency at all', tier: 'wrong', why: 'A genuinely significant difference — HTTP/2\'s multiplexing model is specifically built for exactly this efficiency problem.' }
          ],
          justificationPatterns: [/http\/2|multiplex|concurrent/i]
        },
        {
          mode: 'read_the_room',
          prompt: 'A crowd overwhelms one gate. <strong>A load balancer keeps sending traffic to a backend instance that\'s actually already crashed. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40,
          hintNudge: 'The load balancer only stops routing to an instance once its health check actually fails — check whether that check reflects real health.',
          hintPartial: 'The health check is pointed at a path that returns 200 regardless of the app\'s actual internal state (or isn\'t configured at all) — the LB has no real signal that the instance crashed.',
          hintFull: 'Diagnosis: the health check doesn\'t reflect the app\'s actual internal health, so the LB never detects the crash. Fix: point the health check at a real endpoint that reflects genuine application health, not a static/default page.',
          outputBlock: [
            '$ curl http://backend-1/health',
            '200 OK',
            '(but the actual application process on backend-1 crashed 10 minutes ago)'
          ],
          acceptableDiagnosesPatterns: [/health\s*check.*(wrong|not\s*real|misconfigur)/i, /doesn'?t\s*reflect.*health/i],
          followUpFix: {
            prompt: 'Fix it by pointing the health check at a real health endpoint:',
            acceptablePatterns: [],
            optimalPatterns: [/real\s*(health\s*)?endpoint|\/healthz|actual\s*health/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'Two roads lead the same traveler astray. <strong>Outbound and inbound traffic for the same connection are taking different network paths, and something is dropping it. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40,
          hintNudge: 'A stateful firewall (or similar device) expects to see BOTH directions of a connection — if the return path differs, it may not recognize the reply traffic as part of a valid connection.',
          hintPartial: 'This is asymmetric routing — the reply traffic takes a different path back than the request took out, and a stateful firewall along one path doesn\'t recognize the returning traffic as part of a connection it saw start.',
          hintFull: 'Diagnosis: asymmetric routing is causing a stateful firewall to drop return traffic it doesn\'t recognize. Fix: correct the routing so both directions of a connection consistently use the same path (or path-symmetric routing policy).',
          outputBlock: [
            '$ traceroute example.com',
            '(outbound path: through firewall-A)',
            '$ traceroute --reverse (from remote side)',
            '(return path: through firewall-B — a completely different device)'
          ],
          acceptableDiagnosesPatterns: [/asymmetric\s*routing/i, /different\s*(path|route).*(each\s*way|direction)/i],
          followUpFix: {
            prompt: 'Fix it by ensuring both directions use a consistent path:',
            acceptablePatterns: [],
            optimalPatterns: [/symmetric\s*routing|same\s*path/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'Too many hands reach for too few doors. <strong>Under moderate load, an app starts throwing "too many connections" errors to its database. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40,
          hintNudge: 'This is a classic symptom of a connection pool that\'s either too small for the actual concurrent load, or leaking connections that are never released.',
          hintPartial: 'The application\'s database connection pool is exhausted — either it\'s sized too small for real concurrent load, or connections are being leaked (opened but never properly returned/closed).',
          hintFull: 'Diagnosis: the database connection pool is exhausted, from either undersizing or a connection leak. Fix: audit the code for unreturned connections first (a leak makes any pool size eventually fail), then size the pool appropriately for real concurrent load.',
          outputBlock: [
            '$ (app log)',
            'Error: remaining connection slots are reserved for non-replication superuser connections',
            '(happens consistently once traffic crosses a certain concurrency threshold)'
          ],
          acceptableDiagnosesPatterns: [/connection\s*pool.*(exhaust|too\s*small|leak)/i, /too\s*many\s*connections/i],
          followUpFix: {
            prompt: 'Audit for a connection leak as the first diagnostic step:',
            acceptablePatterns: [],
            optimalPatterns: [/leak|unreturned\s*connection|pool\s*size/i]
          }
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'The Reaper assembles a checklist of certainty. <strong>Sequence the correct order for diagnosing a suspected TLS/certificate problem.</strong>',
          steps: [
            'Confirm the connection itself works at the TCP level',
            'Inspect the certificate chain presented by the server',
            'Check the certificate\'s validity dates and hostname match',
            'Check the certificate\'s issuing CA is trusted'
          ],
          damageIfCorrect: 24, damageIfOptimal: 40,
          damageToHeroIfWrong: 22
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'A second checklist unfurls. <strong>Sequence the correct order for setting up a load balancer with proper health checks.</strong>',
          steps: [
            'Define a real health endpoint reflecting genuine app health',
            'Configure the load balancer to poll that endpoint',
            'Set a reasonable check interval and failure threshold',
            'Confirm the load balancer actually stops routing to a failed instance'
          ],
          damageIfCorrect: 24, damageIfOptimal: 40,
          damageToHeroIfWrong: 22
        },
        {
          mode: 'terminal',
          prompt: 'The reaper measures the exact reply: <strong>"Print only the numeric HTTP status code returned by <code>example.com</code>, nothing else."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28,
          hintNudge: 'curl\'s write-out flag can print just the status code, with output/body silenced.',
          hintPartial: 'curl -o /dev/null -s -w "%{http_____}" example.com',
          hintFull: 'curl -o /dev/null -s -w "%{http_code}" example.com',
          acceptablePatterns: [],
          optimalPatterns: [/^curl\s+-o\s+\/dev\/null\s+-s\s+-w\s+"%\{http_code\}"\s+example\.com$/i],
          baseCmds: ['curl']
        },
        {
          mode: 'terminal',
          prompt: 'A test of the newer tongue: <strong>"Confirm whether <code>example.com</code> actually supports HTTP/2."</strong>',
          damageIfCorrect: 18, damageIfOptimal: 28,
          hintNudge: 'curl has a flag to force/prefer HTTP/2 and report the negotiated protocol verbosely.',
          hintPartial: 'curl --http_ -I example.com',
          hintFull: 'curl --http2 -I example.com',
          acceptablePatterns: [],
          optimalPatterns: [/^curl\s+--http2\s+-I\s+example\.com$/i],
          baseCmds: ['curl']
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A crooked proxy forgets to pass the name: <strong>"This reverse proxy forwards requests, but the backend app always sees the wrong Host header. Find and fix the bug."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36,
          hintNudge: 'A reverse proxy has to explicitly forward the original Host header — it isn\'t passed through automatically by default in most configs.',
          hintPartial: 'Line 1 is missing a proxy_set_header directive for Host entirely — without it, the backend sees the proxy\'s own hostname instead of the real one.',
          hintFull: 'Add: proxy_set_header Host $host;',
          codeBlock: [
            'proxy_pass http://localhost:3000;'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/proxy_set_header\s+Host\s+\$host/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The Reaper weighs stickiness against simplicity: <strong>"Choosing between sticky sessions and a fully stateless backend for a load-balanced web app. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36,
          hintNudge: 'Sticky sessions tie a client to one specific instance, which fights against even load distribution and complicates scaling/failover — a stateless design avoids that entirely.',
          hintPartial: 'A stateless backend (session data in a shared store, not on one instance) lets the load balancer distribute freely and scale/fail over cleanly — sticky sessions tie clients to specific instances, undermining both.',
          hintFull: 'Best (when practical): a fully stateless backend with session state in a shared store (e.g. Redis) — this lets the load balancer distribute and fail over freely; sticky sessions are a reasonable fallback only when statelessness genuinely isn\'t achievable yet.',
          options: [
            { id: 'a', label: 'Sticky sessions, tying each client to one instance', tier: 'defensible', why: 'Simple to add, but ties clients to specific instances — undermines even load distribution and complicates scaling and failover.' },
            { id: 'b', label: 'A fully stateless backend with session state in a shared store', tier: 'best', why: 'Lets the load balancer distribute traffic freely and fail over cleanly, since no instance holds session state the client depends on.' },
            { id: 'c', label: 'Store session state only in browser cookies, unencrypted', tier: 'wrong', why: 'A real security risk (client-readable/tamperable session data) that doesn\'t actually solve the load-balancing tradeoff being asked about.' }
          ],
          justificationPatterns: [/stateless|shared\s*store|session.*store/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"Setting a CDN cache TTL for content that updates a few times per day but must never be stale for more than a few minutes. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36,
          hintNudge: 'The cache duration has to match the actual staleness tolerance — a TTL longer than the tolerance window directly violates the requirement.',
          hintPartial: 'Set a short TTL (a few minutes) matching the actual staleness tolerance, or use cache invalidation/purging on update instead of relying on a long TTL alone.',
          hintFull: 'Best: a short TTL matching the stated staleness tolerance (a few minutes), or actively purge/invalidate the CDN cache on each update — a long TTL directly violates the "never stale more than a few minutes" requirement.',
          options: [
            { id: 'a', label: 'A short TTL (a few minutes) matching the staleness tolerance', tier: 'best', why: 'Directly satisfies the stated requirement — content can never be stale longer than the TTL allows.' },
            { id: 'b', label: 'A long TTL (24 hours) to maximize cache hit rate', tier: 'wrong', why: 'Directly violates the stated requirement — stale content could be served for up to a full day.' },
            { id: 'c', label: 'Disable caching entirely for this content', tier: 'defensible', why: 'Guarantees freshness, but gives up all CDN caching benefit when a short TTL or invalidation would have satisfied the actual requirement.' }
          ],
          justificationPatterns: [/short\s*ttl|invalidat|purge|staleness/i]
        },
        {
          mode: 'read_the_room',
          prompt: 'Every word arrives, but slowly, one at a time. <strong>An API\'s responses are individually fast, but a page making many sequential API calls feels sluggish overall. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40,
          hintNudge: 'If each individual call is fast but many of them together feel slow, check whether connections are being re-established for each one instead of reused.',
          hintPartial: 'Keep-alive isn\'t enabled (or isn\'t being reused), so each sequential request pays the full TCP+TLS handshake cost again — individually fast, but the overhead adds up across many calls.',
          hintFull: 'Diagnosis: connections aren\'t being kept alive/reused, so each request re-pays handshake overhead. Fix: enable and verify HTTP keep-alive (or connection pooling/HTTP2 multiplexing) so sequential requests reuse an existing connection.',
          outputBlock: [
            '$ (per-request timing) each call: ~180ms (mostly TCP+TLS handshake)',
            '$ (actual response processing time per call) ~15ms',
            '(10 sequential calls per page load)'
          ],
          acceptableDiagnosesPatterns: [/keep-alive.*(not|disabled|missing)/i, /re-?establish.*connection/i, /handshake.*overhead/i],
          followUpFix: {
            prompt: 'Fix it by enabling connection reuse:',
            acceptablePatterns: [],
            optimalPatterns: [/keep-alive|connection\s*pool|http\/?2/i]
          }
        },
        {
          mode: 'terminal',
          prompt: 'The reaper measures the veil itself: <strong>"Show only the TLS handshake time for a request to <code>example.com</code>, separate from the rest."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36,
          hintNudge: 'curl\'s write-out format string has a specific timing field just for the TLS handshake phase.',
          hintPartial: 'curl -o /dev/null -s -w "%{time_appconnect}" https://example.com',
          hintFull: 'curl -o /dev/null -s -w "%{time_appconnect}" https://example.com',
          acceptablePatterns: [],
          optimalPatterns: [/^curl\s+-o\s+\/dev\/null\s+-s\s+-w\s+"%\{time_appconnect\}"\s+https:\/\/example\.com$/i],
          baseCmds: ['curl']
        }
      ]
    },
    {
      name: 'Level 4 — Real Incidents',
      hp: 175,
      questions: [
        {
          mode: 'terminal',
          prompt: 'The Reaper counts the fallen packets: <strong>"Show per-hop packet loss statistics to <code>example.com</code>, in report mode, 50 cycles."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 34, timeAllotted: 32,
          hintNudge: 'mtr\'s report mode, with a cycle-count flag.',
          hintPartial: 'mtr -r -c __ example.com',
          hintFull: 'mtr -r -c 50 example.com',
          acceptablePatterns: [/^mtr\s+example\.com$/i],
          optimalPatterns: [/^mtr\s+-r\s+-c\s+50\s+example\.com$/i],
          baseCmds: ['mtr']
        },
        {
          mode: 'terminal',
          prompt: 'A count of every wasted lease: <strong>"Show the current DHCP lease information on this machine."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 32,
          hintNudge: 'A small utility client for exactly this, or checking the lease file directly.',
          hintPartial: 'cat /var/lib/dhcp/dhclient.________',
          hintFull: 'cat /var/lib/dhcp/dhclient.leases',
          acceptablePatterns: [],
          optimalPatterns: [/^cat\s+\/var\/lib\/dhcp\/dhclient\.leases$/i],
          baseCmds: ['cat']
        },
        {
          mode: 'terminal',
          prompt: 'The scythe filters the noise: <strong>"Capture only TCP SYN packets on eth0."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 34, timeAllotted: 32,
          hintNudge: 'tcpdump accepts a BPF filter expression matching the TCP SYN flag.',
          hintPartial: 'tcpdump -i eth0 \'tcp[tcpflags] & tcp-___ != 0\'',
          hintFull: "tcpdump -i eth0 'tcp[tcpflags] & tcp-syn != 0'",
          acceptablePatterns: [/^tcpdump\s+-i\s+eth0\s+(port\s+)?syn$/i],
          optimalPatterns: [/^tcpdump\s+-i\s+eth0\s+'tcp\[tcpflags\]\s*&\s*tcp-syn\s*!=\s*0'$/i],
          baseCmds: ['tcpdump']
        },
        {
          mode: 'spot_the_bug',
          prompt: 'The Reaper points at a leaking gate: <strong>"A security group rule meant to allow a specific partner IP is far too broad. Find and fix the bug."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 38, timeAllotted: 32,
          hintNudge: 'A /0 CIDR mask means "every address on the internet" — check whether the intended single IP is actually scoped that tightly.',
          hintPartial: 'Line 1 uses 0.0.0.0/0, which is every address on the internet — a single partner IP should be scoped to a /32.',
          hintFull: 'Line 1 should read: allow 203.0.113.5/32',
          codeBlock: [
            'allow 0.0.0.0/0'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/allow\s+203\.0\.113\.5\/32/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A crooked NAT rule strands a whole tier: <strong>"Instances in a private subnet can\'t reach the internet at all. Find and fix the bug."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 38, timeAllotted: 32,
          hintNudge: 'A private subnet needing OUTBOUND-only internet access needs its default route pointed at a NAT gateway, not an internet gateway directly.',
          hintPartial: 'Line 1 routes the private subnet\'s default traffic directly to an internet gateway — a private subnet should route outbound traffic through a NAT gateway instead.',
          hintFull: 'Line 1 should read: route default via nat-gateway-id',
          codeBlock: [
            'route default via internet-gateway-id'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/route\s+default\s+via\s+nat-gateway/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The Reaper watches a queue overflow: <strong>"Users report the app is completely down, but your monitoring shows normal CPU/memory on every server. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 42, timeAllotted: 32,
          hintNudge: 'Normal CPU/memory rules out a resource-exhaustion cause — the problem is more likely to be at the network layer (DNS, load balancer, firewall) sitting in front of otherwise-healthy servers.',
          hintPartial: 'Check the network path in front of the servers (DNS, load balancer, firewall rules) — normal CPU/memory on the servers themselves points away from a resource problem and toward something blocking traffic before it even arrives.',
          hintFull: 'Best: check the network layer in front of the servers (DNS resolution, load balancer status, firewall/security group rules) — healthy server resource metrics rule out the servers themselves as the bottleneck.',
          options: [
            { id: 'a', label: 'Check the network path in front of the servers (DNS, LB, firewall)', tier: 'best', why: 'Normal server resource metrics point away from the servers themselves and toward something blocking or misdirecting traffic before it even arrives.' },
            { id: 'b', label: 'Restart every server anyway, just in case', tier: 'wrong', why: 'A blind action that doesn\'t match the evidence — resource metrics being normal doesn\'t suggest the servers themselves are the problem.' },
            { id: 'c', label: 'Assume the monitoring system itself must be broken', tier: 'wrong', why: 'A convenient way to avoid investigating, but nothing so far actually points at the monitoring system being wrong.' }
          ],
          justificationPatterns: [/network|dns|load\s*balancer|firewall|in\s*front/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"A newly-provisioned instance can\'t get an IP address via DHCP. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 42, timeAllotted: 32,
          hintNudge: 'A DHCP server can only hand out as many leases as its configured pool actually has — check whether the pool itself is simply full.',
          hintPartial: 'Check whether the DHCP pool is exhausted (all addresses already leased) — a genuinely common, simple cause before assuming something more exotic.',
          hintFull: 'Best: check whether the DHCP address pool is exhausted — a full pool is a common, simple cause that should be ruled out before more exotic explanations.',
          options: [
            { id: 'a', label: 'Check whether the DHCP address pool is exhausted', tier: 'best', why: 'A common, simple, and easily-checked cause — worth ruling out before assuming something more complex.' },
            { id: 'b', label: 'Assume the instance\'s network card is defective', tier: 'wrong', why: 'A hardware-level assumption with no evidence yet — jumps past much simpler, more common explanations.' },
            { id: 'c', label: 'Manually assign a random static IP and move on', tier: 'wrong', why: 'Works around the symptom without understanding it — could collide with another device or mask a real, recurring capacity problem.' }
          ],
          justificationPatterns: [/pool.*(exhaust|full)|dhcp.*(exhaust|full)/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"A network partition is suspected between two data centers. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 42, timeAllotted: 32,
          hintNudge: 'Confirming a partition (vs. some other cause) needs evidence from BOTH sides — a check from just one side can look identical to several other problems.',
          hintPartial: 'Check connectivity from BOTH data centers\' perspectives, not just one — a one-sided check can\'t distinguish a real partition from a problem local to just one side.',
          hintFull: 'Best: check connectivity from both sides independently (each DC pinging/tracing the other) — this is the only way to actually confirm a real partition versus a problem local to just one side.',
          options: [
            { id: 'a', label: 'Check connectivity from both data centers\' perspectives', tier: 'best', why: 'Only a two-sided check can actually distinguish a real network partition from a problem that\'s local to just one side.' },
            { id: 'b', label: 'Check connectivity from just one data center and conclude from that', tier: 'wrong', why: 'A one-sided check looks identical whether the problem is a real partition or something local to just that one side — not enough to actually confirm anything.' },
            { id: 'c', label: 'Assume it\'s a partition and immediately fail over everything', tier: 'wrong', why: 'A drastic, disruptive action taken before actually confirming what\'s wrong — could make things worse if the real cause is something else entirely.' }
          ],
          justificationPatterns: [/both\s*(sides|data\s*centers)|two.?sided/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"A recently-added firewall rule silently broke an unrelated service. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 42, timeAllotted: 32,
          hintNudge: 'Firewall rules are evaluated in order, and a broad rule can unintentionally match traffic it was never meant to affect.',
          hintPartial: 'Review the new rule\'s actual scope and order relative to existing rules — a rule broader than intended can silently catch traffic for a completely different, unrelated service.',
          hintFull: 'Best: review the new rule\'s scope and its position in the rule order — a rule broader (or ordered earlier) than intended can silently match and block traffic for services it was never meant to affect.',
          options: [
            { id: 'a', label: 'Review the new rule\'s actual scope and rule-order position', tier: 'best', why: 'Firewall rules are evaluated in order and can be broader than intended — this directly investigates the most likely mechanism for an unrelated service breaking.' },
            { id: 'b', label: 'Immediately revert ALL recent firewall changes, not just the suspect one', tier: 'defensible', why: 'Restores service quickly, but also undoes any other legitimate recent changes without knowing if they were actually the cause.' },
            { id: 'c', label: 'Ignore it since the rule was "meant" for something else', tier: 'wrong', why: 'Intent doesn\'t determine actual behavior — a rule can affect traffic well beyond what it was written for, and it\'s currently breaking something real.' }
          ],
          justificationPatterns: [/rule\s*(scope|order)|broader\s*than\s*intended|evaluated\s*in\s*order/i]
        },
        {
          mode: 'read_the_room',
          prompt: 'Only some travelers are turned away. <strong>A service is intermittently unreachable — works fine most of the time, but fails roughly 1 in 10 requests. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 26, damageIfOptimal: 44, timeAllotted: 32,
          hintNudge: 'An intermittent failure at a roughly consistent RATE (not "sometimes entirely down") often points at one specific unhealthy instance behind a load balancer, being hit some fraction of the time.',
          hintPartial: 'One of several backend instances behind the load balancer is unhealthy (or has a specific problem) — since the LB spreads requests across instances, only requests that happen to land on the bad one fail.',
          hintFull: 'Diagnosis: one backend instance behind the load balancer is unhealthy, and only requests routed to it fail. Fix: identify the specific unhealthy instance (check per-instance health/logs) and remove or repair it.',
          outputBlock: [
            '$ (load test results)',
            '9 of 10 requests: 200 OK',
            '1 of 10 requests: 502 Bad Gateway',
            '(3 backend instances behind the load balancer)'
          ],
          acceptableDiagnosesPatterns: [/one\s*(backend\s*)?instance.*unhealthy/i, /bad\s*instance/i],
          followUpFix: {
            prompt: 'Identify the specific unhealthy instance:',
            acceptablePatterns: [],
            optimalPatterns: [/per-instance|individual\s*instance|check\s*each\s*instance/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'The floor splits, and each half believes it stands alone. <strong>A clustered database suddenly has two nodes each believing they are the primary. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 26, damageIfOptimal: 44, timeAllotted: 32,
          hintNudge: 'Two nodes both acting as primary at once is the classic signature of a network partition breaking cluster communication, without any external mechanism to definitively arbitrate which side should actually lead.',
          hintPartial: 'This is split-brain — a network partition separated the cluster, and without a reliable external arbiter (quorum/fencing), each side assumed leadership independently.',
          hintFull: 'Diagnosis: a network partition caused split-brain — both sides assumed primary role with no external arbiter to prevent it. Fix: restore network connectivity, then use the cluster\'s fencing/quorum mechanism to force a single agreed-upon primary, and reconcile any diverged writes.',
          outputBlock: [
            '$ (node A) SELECT pg_is_in_recovery(); -- false (thinks it\'s primary)',
            '$ (node B) SELECT pg_is_in_recovery(); -- false (also thinks it\'s primary)',
            '(both nodes lost contact with each other 20 minutes ago)'
          ],
          acceptableDiagnosesPatterns: [/split.?brain/i, /partition.*(both|each)\s*(side|node)/i],
          followUpFix: {
            prompt: 'Fix it using the cluster\'s quorum/fencing mechanism to force a single primary:',
            acceptablePatterns: [],
            optimalPatterns: [/quorum|fenc(e|ing)|force.*(single|one)\s*primary/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A crowd storms one gate, and it buckles. <strong>A service suddenly becomes unreachable during a traffic spike, though the servers behind it show plenty of spare capacity. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 26, damageIfOptimal: 44, timeAllotted: 32,
          hintNudge: 'If the SERVERS have spare capacity but the service is still unreachable, the actual bottleneck is more likely something in front of them — a connection limit, a rate limit, or an exhausted ephemeral port range.',
          hintPartial: 'Something in front of the servers (a load balancer\'s connection limit, an OS-level ephemeral port exhaustion, or a rate limit) is the actual bottleneck — the servers themselves have room, so the constraint sits somewhere else in the path.',
          hintFull: 'Diagnosis: a front-of-path limit (connection cap, rate limit, or ephemeral port exhaustion) is bottlenecking the service despite spare server capacity. Fix: identify the specific limiting layer (check LB connection metrics, OS port range) and raise the limit or add capacity there.',
          outputBlock: [
            '$ (server metrics during the spike) CPU: 20%, Memory: 35%',
            '$ (load balancer metrics) Active connections: at configured max',
            '(the servers have plenty of room; the load balancer does not)'
          ],
          acceptableDiagnosesPatterns: [/(load\s*balancer|connection)\s*limit/i, /bottleneck.*(front|balancer|before)/i],
          followUpFix: {
            prompt: 'Fix it by identifying and raising the actual limiting layer:',
            acceptablePatterns: [],
            optimalPatterns: [/connection\s*limit|raise.*(limit|capacity)/i]
          }
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'The Reaper draws its harvest sigil. <strong>Sequence the correct order for diagnosing an intermittent connectivity issue.</strong>',
          steps: [
            'Reproduce the failure rate consistently (e.g. repeated requests/load test)',
            'Determine if failures correlate with a specific backend instance',
            'Check that instance\'s individual health and logs',
            'Remove or repair the specific unhealthy instance'
          ],
          damageIfCorrect: 28, damageIfOptimal: 46, timeAllotted: 32,
          damageToHeroIfWrong: 24
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'A second sigil, drawn in urgency. <strong>Sequence the correct order for responding to a suspected split-brain cluster.</strong>',
          steps: [
            'Confirm both nodes actually believe they are primary',
            'Restore network connectivity between the nodes',
            'Use the cluster\'s quorum/fencing mechanism to force a single primary',
            'Reconcile any writes that diverged during the split'
          ],
          damageIfCorrect: 28, damageIfOptimal: 46, timeAllotted: 32,
          damageToHeroIfWrong: 24
        },
        {
          mode: 'terminal',
          prompt: 'The Reaper takes a full census of the wire: <strong>"Show a summary of all current socket statistics on this machine."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 32,
          hintNudge: 'ss has a dedicated summary flag for exactly this.',
          hintPartial: 'ss -_',
          hintFull: 'ss -s',
          acceptablePatterns: [],
          optimalPatterns: [/^ss\s+-s$/i],
          baseCmds: ['ss']
        },
        {
          mode: 'terminal',
          prompt: 'A hundred pulses sent to measure the loss: <strong>"Send 100 pings to <code>example.com</code> and show just the final packet-loss summary."</strong>',
          damageIfCorrect: 20, damageIfOptimal: 32, timeAllotted: 32,
          hintNudge: 'ping with a count flag, piped to just the summary lines at the end.',
          hintPartial: 'ping -c ___ example.com | tail -3',
          hintFull: 'ping -c 100 example.com | tail -3',
          acceptablePatterns: [/^ping\s+-c\s+100\s+example\.com$/i],
          optimalPatterns: [/^ping\s+-c\s+100\s+example\.com\s*\|\s*tail\s+-3$/i],
          baseCmds: ['ping']
        },
        {
          mode: 'spot_the_bug',
          prompt: 'The Reaper reveals a target aimed wrong: <strong>"A load balancer\'s target group is marking every instance unhealthy, though the app itself is fine. Find and fix the bug."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 38, timeAllotted: 32,
          hintNudge: 'The health check\'s target PORT has to actually match the port the app is really listening on.',
          hintPartial: 'Line 1 checks port 80, but the app actually listens on port 8080 — the health check will always fail against the wrong port.',
          hintFull: 'Line 1 should read: health_check_port: 8080',
          codeBlock: [
            'health_check_port: 80'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/health_check_port:\s*8080/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A crooked egress rule blocks the reply: <strong>"A private subnet\'s instances can send DNS queries out, but never get a response back. Find and fix the bug."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 38, timeAllotted: 32,
          hintNudge: 'A stateless NACL needs an explicit inbound rule for the DNS response traffic — outbound-only rules don\'t cover the reply for a stateless filter.',
          hintPartial: 'Line 1 only allows outbound UDP 53 — for a stateless NACL, the return DNS response also needs an explicit inbound rule (typically on the high ephemeral port range).',
          hintFull: 'Add: allow inbound udp 1024-65535 from DNS server',
          codeBlock: [
            'allow outbound udp 53 to DNS server'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/allow\s+inbound\s+udp\s+1024-65535/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The Reaper watches an intermittent flicker: <strong>"DNS lookups fail roughly 1 in 20 times, always with a timeout, never NXDOMAIN. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40, timeAllotted: 32,
          hintNudge: 'A pure timeout (never an actual "not found" answer) suggests the resolver itself is occasionally failing to respond in time, not that the record is genuinely missing.',
          hintPartial: 'Investigate the DNS resolver\'s own health/capacity — a consistent timeout pattern (versus a real NXDOMAIN) suggests the resolver is intermittently failing to answer in time, not that the record is actually missing.',
          hintFull: 'Best: investigate the resolver\'s health and capacity (is it overloaded, or one of several resolvers unhealthy) — a pure timeout pattern (not NXDOMAIN) points at the resolver failing to respond in time, not the record being wrong.',
          options: [
            { id: 'a', label: 'Investigate the DNS resolver\'s health and capacity', tier: 'best', why: 'A consistent timeout (never NXDOMAIN) points at the resolver itself failing to respond in time, not the record being genuinely missing or wrong.' },
            { id: 'b', label: 'Assume the DNS record itself is intermittently wrong', tier: 'wrong', why: 'A timeout is a different signal than NXDOMAIN — the record not resolving in time doesn\'t mean the record\'s actual value is wrong.' },
            { id: 'c', label: 'Ignore it since it only happens occasionally', tier: 'wrong', why: 'A consistent 1-in-20 failure rate is a real, recurring problem worth investigating, not noise to dismiss.' }
          ],
          justificationPatterns: [/resolver.*(health|capacity|overload)/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"After updating the origin server\'s content, a CDN keeps serving the old version well past the configured TTL. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40, timeAllotted: 32,
          hintNudge: 'If it\'s serving stale content PAST the configured TTL, something is preventing the cache from actually re-checking with the origin — not just normal caching behavior.',
          hintPartial: 'Actively purge/invalidate the CDN\'s cached copy rather than waiting — serving stale content past the configured TTL suggests the cache isn\'t re-validating as expected, and a manual purge forces it to fetch fresh content now.',
          hintFull: 'Best: actively purge/invalidate the specific cached object at the CDN — serving content past its own configured TTL means something (a caching header, a CDN-side issue) is preventing normal revalidation, and a manual purge is the direct fix.',
          options: [
            { id: 'a', label: 'Actively purge/invalidate the cached object at the CDN', tier: 'best', why: 'Directly forces a fresh fetch from origin now, rather than waiting on a revalidation mechanism that\'s apparently not working as configured.' },
            { id: 'b', label: 'Just wait longer — it will expire eventually', tier: 'wrong', why: 'It\'s already serving stale content PAST the configured TTL — waiting longer doesn\'t address why revalidation isn\'t happening as expected.' },
            { id: 'c', label: 'Disable the CDN entirely to guarantee freshness', tier: 'wrong', why: 'A drastic overcorrection that gives up all CDN benefit, when a targeted cache purge solves the immediate problem directly.' }
          ],
          justificationPatterns: [/purge|invalidat|force.*fresh/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"A site-to-site VPN tunnel keeps dropping and reconnecting every few minutes. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40, timeAllotted: 32,
          hintNudge: 'A tunnel that repeatedly drops and reconnects (rather than staying fully down) often points at a mismatch in the negotiated security/keepalive parameters between the two ends.',
          hintPartial: 'Check both ends\' IKE/IPsec parameters (encryption, lifetime, keepalive settings) for a mismatch — a repeatedly flapping (not fully-down) tunnel is a classic sign of negotiation or keepalive settings not agreeing between the two sides.',
          hintFull: 'Best: compare the IKE/IPsec configuration (encryption algorithms, security association lifetime, keepalive/dead-peer-detection settings) on both ends for a mismatch — repeated drop-and-reconnect cycles, rather than a fully dead tunnel, point at a negotiation or keepalive disagreement.',
          options: [
            { id: 'a', label: 'Compare IKE/IPsec parameters on both ends for a mismatch', tier: 'best', why: 'A repeatedly flapping (not fully-down) tunnel is a classic signature of a negotiation or keepalive parameter mismatch between the two endpoints.' },
            { id: 'b', label: 'Assume the internet connection is simply unreliable', tier: 'wrong', why: 'Doesn\'t explain the specific repeating drop-and-reconnect pattern, which points at a configuration issue rather than generic instability.' },
            { id: 'c', label: 'Rebuild the tunnel from scratch immediately without checking current config', tier: 'defensible', why: 'Might resolve it by accident, but skips understanding the actual mismatch — the same issue could easily recur after rebuilding.' }
          ],
          justificationPatterns: [/ike|ipsec|keepalive|mismatch|negotiat/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"Two servers on the same subnet suddenly can\'t reach each other, though both can reach the internet fine. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40, timeAllotted: 32,
          hintNudge: 'Both reaching the internet fine but NOT each other, despite being on the same subnet, points at something local to that segment — like a duplicate IP or a stale/incorrect ARP entry — not a routing problem.',
          hintPartial: 'Check for a duplicate IP address or a stale/incorrect ARP cache entry on that local segment — internet access working fine rules out a routing/gateway problem, pointing instead at something local to same-subnet communication specifically.',
          hintFull: 'Best: check for a duplicate IP address conflict or a stale ARP cache entry on the local segment — since internet access (which goes through the gateway) works fine, the problem is specific to local same-subnet resolution, not routing.',
          options: [
            { id: 'a', label: 'Check for a duplicate IP or stale ARP entry on the local segment', tier: 'best', why: 'Internet access working fine rules out a routing/gateway issue, pointing specifically at local same-subnet address resolution instead.' },
            { id: 'b', label: 'Check the default gateway configuration on both servers', tier: 'wrong', why: 'Both servers reaching the internet fine already confirms their gateway configuration is working correctly.' },
            { id: 'c', label: 'Assume it\'s a DNS problem', tier: 'wrong', why: 'Same-subnet communication for known IPs doesn\'t depend on DNS resolution at all — this doesn\'t match the symptom.' }
          ],
          justificationPatterns: [/duplicate\s*ip|arp|local\s*segment/i]
        },
        {
          mode: 'read_the_room',
          prompt: 'Two voices claim the same name at once. <strong>Two devices on the same network intermittently lose connectivity, and system logs mention an IP conflict. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 26, damageIfOptimal: 42, timeAllotted: 32,
          hintNudge: 'An explicit IP-conflict log message is a direct, literal signal — two devices are both claiming the same address, likely from a static IP overlapping the DHCP pool.',
          hintPartial: 'A statically-assigned IP on one device overlaps with the DHCP pool\'s range, and the DHCP server handed that same address to another device — both devices intermittently claim the same IP.',
          hintFull: 'Diagnosis: a statically-assigned IP overlaps the DHCP pool range, causing two devices to claim the same address. Fix: move the static assignment outside the DHCP pool\'s range (or add a DHCP reservation/exclusion for it).',
          outputBlock: [
            '$ (system log) IPv4 address conflict detected: 192.168.1.50 in use by 3 devices',
            '(one device has a static IP; DHCP pool range includes that same address)'
          ],
          acceptableDiagnosesPatterns: [/ip\s*conflict/i, /static.*overlap.*dhcp/i, /duplicate\s*ip/i],
          followUpFix: {
            prompt: 'Fix it by removing the overlap between the static IP and the DHCP pool:',
            acceptablePatterns: [],
            optimalPatterns: [/exclude|reservation|outside.*(dhcp\s*)?pool/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A gate meant for a trickle chokes on a flood. <strong>Outbound traffic from a private subnet through a NAT gateway starts getting throttled during a traffic spike. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 26, damageIfOptimal: 42, timeAllotted: 32,
          hintNudge: 'A managed NAT gateway has real bandwidth/connection limits — a genuine traffic spike can exceed them, which looks like throttling rather than an outright failure.',
          hintPartial: 'The NAT gateway\'s bandwidth or concurrent-connection limit is being hit during the spike — it\'s a real capacity ceiling, not a misconfiguration.',
          hintFull: 'Diagnosis: the NAT gateway\'s bandwidth/connection capacity is being exceeded during the spike. Fix: distribute outbound traffic across multiple NAT gateways (one per AZ, or additional capacity), rather than relying on a single one for all outbound traffic.',
          outputBlock: [
            '$ (NAT gateway metrics during the spike)',
            'BytesOutToDestination: at configured/observed maximum',
            '(coincides exactly with a traffic spike)'
          ],
          acceptableDiagnosesPatterns: [/nat\s*gateway.*(limit|capacity|bandwidth)/i],
          followUpFix: {
            prompt: 'Fix it by distributing load across multiple NAT gateways:',
            acceptablePatterns: [],
            optimalPatterns: [/multiple\s*nat\s*gateway|additional\s*(nat\s*)?capacity/i]
          }
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'A third sigil, quicker than the last. <strong>Sequence the correct order for diagnosing intermittent same-subnet connectivity loss.</strong>',
          steps: [
            'Confirm both devices can reach the internet/gateway normally',
            'Check the ARP table on both devices for the other\'s entry',
            'Check for a duplicate/conflicting IP address on the segment',
            'Clear stale ARP entries or resolve the IP conflict'
          ],
          damageIfCorrect: 28, damageIfOptimal: 46, timeAllotted: 32,
          damageToHeroIfWrong: 24
        }
      ]
    },
    {
      name: 'Level 5 — Interview-Caliber Judgment',
      hp: 195,
      questions: [
        {
          mode: 'terminal',
          prompt: 'The Reaper audits the whole ward: <strong>"Show every open port on this machine along with the exact process holding it, including UDP."</strong>',
          damageIfCorrect: 22, damageIfOptimal: 36,
          hintNudge: 'ss with flags for TCP, UDP, listening, process, and numeric ports all combined.',
          hintPartial: 'ss -tulnp',
          hintFull: 'ss -tulnp',
          acceptablePatterns: [],
          optimalPatterns: [/^ss\s+-tulnp$/i],
          baseCmds: ['ss']
        },
        {
          mode: 'terminal',
          prompt: 'A ward-sigil is checked against the ledger: <strong>"Verify a TLS certificate\'s chain of trust against the system CA bundle for <code>example.com</code>."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40,
          hintNudge: 'openssl s_client with a CA path flag pointed at the system trust store.',
          hintPartial: 'openssl s_client -connect example.com:443 -CA____ /etc/ssl/certs',
          hintFull: 'openssl s_client -connect example.com:443 -CApath /etc/ssl/certs',
          acceptablePatterns: [/^openssl\s+s_client\s+-connect\s+example\.com:443$/i],
          optimalPatterns: [/^openssl\s+s_client\s+-connect\s+example\.com:443\s+-CApath\s+\/etc\/ssl\/certs$/i],
          baseCmds: ['openssl']
        },
        {
          mode: 'spot_the_bug',
          prompt: 'The Reaper reveals an overbroad decree: <strong>"This network ACL rule is meant to restrict access to one management IP, but it\'s far too permissive. Find and fix the bug."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 42,
          hintNudge: 'A single specific IP should be scoped to a /32, not left as an entire, much larger range.',
          hintPartial: 'Line 1 allows the entire 10.0.0.0/8 range — that\'s 16 million addresses, not the single management IP intended.',
          hintFull: 'Line 1 should read: allow 10.0.0.5/32',
          codeBlock: [
            'allow 10.0.0.0/8'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/allow\s+10\.0\.0\.5\/32/i]
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A crooked mTLS rule leaves the gate half-open: <strong>"This service mesh config is meant to require mutual TLS between services, but it only enforces one-way TLS. Find and fix the bug."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 42,
          hintNudge: 'Mutual TLS requires the SERVER to also verify the CLIENT\'s certificate — check whether client certificate verification is actually turned on.',
          hintPartial: 'Line 1 sets mode to PERMISSIVE, which allows both mTLS and plaintext — enforcing genuine mutual TLS requires STRICT mode.',
          hintFull: 'Line 1 should read: tls_mode: STRICT',
          codeBlock: [
            'tls_mode: PERMISSIVE'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/tls_mode:\s*STRICT/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The Reaper looms over a fork in the road: <strong>"Choosing between a VPN and a dedicated private connection (e.g. Direct Connect/ExpressRoute-style link) for a data center with heavy, steady traffic to the cloud. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 44,
          hintNudge: 'A VPN rides over the shared public internet with variable performance; a dedicated private connection gives consistent bandwidth/latency, at a real cost — which matters more for HEAVY, STEADY traffic?',
          hintPartial: 'A dedicated private connection gives consistent, predictable bandwidth and latency for heavy, steady traffic — a VPN over the public internet has variable performance that a real, sustained heavy workload will feel.',
          hintFull: 'Best: a dedicated private connection — for heavy, steady, business-critical traffic, its consistent bandwidth/latency (versus a VPN\'s variable public-internet performance) is usually worth the added cost and setup complexity.',
          options: [
            { id: 'a', label: 'A VPN over the public internet', tier: 'defensible', why: 'Cheaper and faster to set up, but rides shared public internet paths with variable performance — a real concern for heavy, steady, business-critical traffic.' },
            { id: 'b', label: 'A dedicated private connection', tier: 'best', why: 'Provides consistent, predictable bandwidth and latency — exactly what heavy, steady traffic benefits from, worth the added cost for this use case.' },
            { id: 'c', label: 'No connection at all — route everything over the public internet with public IPs', tier: 'wrong', why: 'Removes any encryption or private routing at all, a real security regression regardless of the traffic pattern.' }
          ],
          justificationPatterns: [/dedicated|private\s*connection|consistent|predictable/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"Designing network segmentation for a zero-trust architecture. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 44,
          hintNudge: 'Zero trust means NOT assuming anything inside the network perimeter is automatically trusted — every connection should be explicitly verified, regardless of where it originates.',
          hintPartial: 'Segment finely and require explicit verification for every connection (service-to-service, not just perimeter), rather than assuming anything "inside" the network is automatically trusted.',
          hintFull: 'Best: fine-grained segmentation with explicit per-connection verification (e.g. mTLS between services) — zero trust specifically rejects the old model of "trusted inside, untrusted outside" in favor of verifying every connection regardless of origin.',
          options: [
            { id: 'a', label: 'One large trusted internal network, with a strong perimeter firewall', tier: 'wrong', why: 'Exactly the traditional "trusted inside" model zero trust is designed to replace — a single breach inside the perimeter has broad, unchecked access.' },
            { id: 'b', label: 'Fine-grained segmentation with explicit verification for every connection', tier: 'best', why: 'Matches zero trust\'s core principle — no connection is trusted just because of where it originates, including from inside the network.' },
            { id: 'c', label: 'No segmentation at all, rely entirely on application-level authentication', tier: 'wrong', why: 'Removes a real layer of defense — network segmentation and app-level auth are complementary, not substitutes for each other.' }
          ],
          justificationPatterns: [/zero\s*trust|explicit\s*verif|fine.?grained|every\s*connection/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"Choosing between DNS-based failover and BGP-based failover for a multi-region service that needs to survive a regional outage. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 44,
          hintNudge: 'DNS failover\'s speed is fundamentally limited by TTL/caching everywhere on the internet; BGP failover can withdraw a route almost immediately, independent of any client-side caching.',
          hintPartial: 'BGP failover withdraws the route to the failed region almost immediately, independent of DNS caching anywhere — DNS failover is fundamentally limited by TTL and caching behavior across resolvers you don\'t control.',
          hintFull: 'Best (for the fastest, most reliable failover): BGP-based failover — it isn\'t subject to DNS TTL/caching delays across resolvers you don\'t control; DNS failover is simpler to set up but its speed is capped by how quickly caches everywhere actually honor the TTL.',
          options: [
            { id: 'a', label: 'DNS-based failover', tier: 'defensible', why: 'Simpler to set up, but its failover speed is capped by DNS TTL and caching behavior across resolvers you don\'t fully control — a real limitation during an actual regional outage.' },
            { id: 'b', label: 'BGP-based failover', tier: 'best', why: 'Withdraws the route almost immediately, independent of DNS caching anywhere — the more robust choice when surviving a regional outage quickly is the priority.' },
            { id: 'c', label: 'Neither — rely on users manually retrying until it works', tier: 'wrong', why: 'Offloads the entire failover problem onto users with no actual mechanism — not a real design.' }
          ],
          justificationPatterns: [/bgp|withdraw.*route|dns.*(ttl|cach)/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"A public API is under a suspected DDoS attack. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 44,
          hintNudge: 'Absorbing and filtering malicious traffic at the EDGE (before it ever reaches your origin) scales far better than trying to handle it at the origin server itself.',
          hintPartial: 'Route traffic through a DDoS-mitigation/CDN layer that absorbs and filters malicious traffic at the edge — trying to handle volumetric attack traffic at the origin server itself doesn\'t scale.',
          hintFull: 'Best: route through a dedicated DDoS-mitigation/CDN layer that filters malicious traffic at the edge, well before it reaches the origin — combined with rate limiting for legitimate-but-excessive traffic; trying to absorb a real volumetric attack directly at the origin doesn\'t scale.',
          options: [
            { id: 'a', label: 'Scale up the origin servers to absorb more traffic', tier: 'wrong', why: 'A volumetric attack can usually scale faster than you can add origin capacity — this doesn\'t address the actual attack, just delays the inevitable.' },
            { id: 'b', label: 'Route through a dedicated DDoS-mitigation/CDN layer at the edge', tier: 'best', why: 'Filters malicious traffic before it ever reaches the origin, at a scale the origin itself could never absorb directly.' },
            { id: 'c', label: 'Take the API offline until the attack naturally stops', tier: 'wrong', why: 'Achieves the attacker\'s goal directly (denial of service) instead of mitigating the actual attack.' }
          ],
          justificationPatterns: [/edge|ddos\s*mitigation|cdn|filter.*(before|at\s*edge)/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"Deciding between security groups and network ACLs (stateful vs. stateless filtering) for a subnet\'s access control. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 44,
          hintNudge: 'A stateful mechanism automatically allows return traffic for a connection it already permitted outbound; a stateless one requires explicit rules for BOTH directions independently.',
          hintPartial: 'Use both, layered — security groups (stateful, instance-level) as the primary, fine-grained control, and NACLs (stateless, subnet-level) as a coarser secondary layer, since they operate at genuinely different levels with different tradeoffs.',
          hintFull: 'Best: use both together as layered defense — security groups (stateful, per-instance) for fine-grained, connection-aware rules, and NACLs (stateless, per-subnet) as a broader secondary layer that doesn\'t depend on connection state; treating them as an either/or choice gives up real defense-in-depth.',
          options: [
            { id: 'a', label: 'Security groups only, skip NACLs entirely', tier: 'defensible', why: 'Security groups alone provide solid stateful, per-instance control, but skipping NACLs gives up an additional, independent layer of subnet-level defense.' },
            { id: 'b', label: 'Use both, layered — security groups for instances, NACLs for subnets', tier: 'best', why: 'Combines fine-grained, stateful, per-instance control with a broader, stateless, subnet-level layer — genuine defense-in-depth rather than relying on just one mechanism.' },
            { id: 'c', label: 'NACLs only, skip security groups entirely', tier: 'wrong', why: 'NACLs are stateless and coarser (subnet-level) — using them alone loses fine-grained, connection-aware, per-instance control that security groups provide.' }
          ],
          justificationPatterns: [/both|layered|defense.?in.?depth|stateful.*stateless/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"Deciding how aggressively to rate-limit a public API to protect it, without breaking legitimate high-volume clients. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 44,
          hintNudge: 'A single uniform limit for everyone either allows too much abuse or blocks legitimate heavy users — the fix usually involves tiering limits by client identity/plan.',
          hintPartial: 'Apply per-client rate limits (via API keys/auth), with different tiers for different legitimate usage levels, rather than one uniform limit that either lets abuse through or blocks legitimate heavy users.',
          hintFull: 'Best: implement per-client rate limiting keyed on authentication (API key/token), with tiered limits matching legitimate usage patterns — a single uniform limit for every anonymous caller either lets abuse through or unfairly blocks legitimate high-volume clients.',
          options: [
            { id: 'a', label: 'One uniform rate limit for every caller, regardless of identity', tier: 'wrong', why: 'Forces an impossible tradeoff — set low enough to stop abuse and it blocks legitimate heavy clients too; set high enough for them and it barely limits abuse.' },
            { id: 'b', label: 'Per-client rate limits keyed on authentication, with tiers matching legitimate usage', tier: 'best', why: 'Lets legitimate high-volume clients operate at their actual needed rate while still constraining anonymous or abusive traffic distinctly.' },
            { id: 'c', label: 'No rate limiting at all, rely on infrastructure scaling to absorb any load', tier: 'wrong', why: 'Leaves the API with no defense against abuse or accidental traffic spikes at all — infrastructure scaling has real limits and cost.' }
          ],
          justificationPatterns: [/per-client|api\s*key|tier(ed)?|authenticat/i]
        },
        {
          mode: 'read_the_room',
          prompt: 'A single broken link severs the whole chain. <strong>After a routine network change, one specific region\'s traffic silently stops reaching a multi-region service, with no alerts firing. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 28, damageIfOptimal: 48,
          hintNudge: 'No alerts firing despite a real outage is itself a clue — check whether the monitoring/health checks are actually being run FROM that affected region, or only from elsewhere.',
          hintPartial: 'Health checks and monitoring are only run from outside the affected region, so from the monitoring system\'s perspective everything looks fine — the actual problem is regional connectivity that the monitoring setup doesn\'t observe from within.',
          hintFull: 'Diagnosis: monitoring only checks from outside the affected region, missing a real region-specific connectivity break. Fix: restore the specific routing/connectivity change that broke that region\'s path, and add region-local health checks so this class of failure actually triggers an alert next time.',
          outputBlock: [
            '$ (global monitoring dashboard)',
            'All health checks: GREEN',
            '',
            '$ (users physically in the affected region)',
            'Cannot reach the service at all'
          ],
          acceptableDiagnosesPatterns: [/monitoring.*(outside|doesn'?t\s*cover|blind\s*spot)/i, /region.?specific.*(not\s*monitored|missed)/i],
          followUpFix: {
            prompt: 'Fix the monitoring gap by adding checks that would actually catch this:',
            acceptablePatterns: [],
            optimalPatterns: [/region.?local|region.?specific\s*health\s*check/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A quiet leak drains the well unseen. <strong>Over several weeks, a service\'s p99 latency has been slowly climbing, with no single obvious change to blame. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 28, damageIfOptimal: 48,
          hintNudge: 'A slow, gradual climb (not a sudden jump) often points at something accumulating over time — like connection or resource leaks, or organic traffic growth outpacing capacity, rather than one single bad deploy.',
          hintPartial: 'Something is accumulating gradually — check for a slow resource/connection leak, growing dataset sizes affecting query performance, or organic traffic growth quietly outpacing current capacity, rather than looking for one single recent change.',
          hintFull: 'Diagnosis: a gradual, accumulating cause (resource leak, growing data volume, or organic traffic growth) is degrading performance over time, rather than any single recent change. Fix: correlate the latency trend against traffic volume, data size growth, and resource usage trends over the same weeks to identify which one actually matches the pattern.',
          outputBlock: [
            '$ (p99 latency, weekly)',
            'Week 1: 120ms  Week 2: 145ms  Week 3: 180ms  Week 4: 240ms',
            '(no single deploy correlates with the trend; it climbs steadily)'
          ],
          acceptableDiagnosesPatterns: [/gradual|accumulat|leak|organic\s*(growth|traffic)/i],
          followUpFix: {
            prompt: 'Correlate the latency trend against other metrics over the same period:',
            acceptablePatterns: [],
            optimalPatterns: [/correlat|traffic\s*(volume|growth)|data\s*(size|volume)/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A trusted path becomes a hidden weakness. <strong>A security audit discovers a "temporary" firewall rule from over a year ago that\'s far broader than anything currently needed. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 28, damageIfOptimal: 48,
          hintNudge: 'This is a classic security drift pattern — a rule meant to be temporary was never actually reviewed or removed, and no one currently knows if anything still depends on it.',
          hintPartial: 'A temporary rule became permanent by default because nothing ever forced a review — this is a common security-drift pattern, and now no one is certain what (if anything) actually still relies on it.',
          hintFull: 'Diagnosis: an undocumented, unreviewed "temporary" rule became permanent by drift, with unclear current dependencies. Fix: audit actual traffic hitting that rule to determine real current usage, then narrow or remove it, and put a process in place (e.g. expiring temporary rules by default) so this doesn\'t recur.',
          outputBlock: [
            '$ (firewall rule comment) "TEMP - remove after migration - 14 months ago"',
            '(rule still allows 0.0.0.0/0 on an internal admin port)'
          ],
          acceptableDiagnosesPatterns: [/(security\s*)?drift/i, /temporary.*(never\s*removed|became\s*permanent)/i],
          followUpFix: {
            prompt: 'Fix it by first auditing real current traffic through that rule:',
            acceptablePatterns: [],
            optimalPatterns: [/audit.*traffic|current\s*usage/i]
          }
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'The Reaper draws its final, patient sigil. <strong>Sequence the correct order for responding to a suspected DDoS attack on a public API.</strong>',
          steps: [
            'Confirm it\'s genuinely malicious traffic, not a legitimate spike',
            'Route traffic through an edge DDoS-mitigation/CDN layer',
            'Apply per-client rate limiting for legitimate traffic',
            'Monitor origin health while mitigation is active',
            'Document the incident and adjust mitigation thresholds afterward'
          ],
          damageIfCorrect: 30, damageIfOptimal: 50,
          damageToHeroIfWrong: 28
        },
        {
          mode: 'build_the_pipeline',
          prompt: 'The last sigil closes the circle. <strong>Sequence the correct order for designing zero-trust network segmentation for a new platform.</strong>',
          steps: [
            'Map out actual service-to-service communication needs',
            'Segment the network finely, not by broad trust zones',
            'Require mutual TLS/explicit verification between services',
            'Apply least-privilege rules per segment',
            'Continuously audit and tighten rules as the platform evolves'
          ],
          damageIfCorrect: 30, damageIfOptimal: 50,
          damageToHeroIfWrong: 28
        },
        {
          mode: 'terminal',
          prompt: 'The reaper confirms trust without a full handshake: <strong>"Verify whether <code>example.com</code> supports OCSP stapling for certificate revocation checking."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40,
          hintNudge: 'openssl s_client has a status flag that requests the stapled OCSP response during the handshake.',
          hintPartial: 'openssl s_client -connect example.com:443 -stat__',
          hintFull: 'openssl s_client -connect example.com:443 -status',
          acceptablePatterns: [/^openssl\s+s_client\s+-connect\s+example\.com:443$/i],
          optimalPatterns: [/^openssl\s+s_client\s+-connect\s+example\.com:443\s+-status$/i],
          baseCmds: ['openssl']
        },
        {
          mode: 'spot_the_bug',
          prompt: 'A crooked NACL leaves the back door wide: <strong>"This network ACL\'s egress rule is far broader than any legitimate outbound traffic needs. Find and fix the bug."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 42,
          hintNudge: 'Unrestricted outbound access to absolutely anything is rarely actually required — check whether this rule is scoped to only what\'s genuinely needed.',
          hintPartial: 'Line 1 allows all outbound traffic to any destination on any port — scope it down to only the specific destinations/ports this workload genuinely needs to reach.',
          hintFull: 'Line 1 should read (example): allow outbound tcp 443 to api.example.com',
          codeBlock: [
            'allow outbound all to 0.0.0.0/0'
          ],
          buggyLineId: 0,
          correctFixPatterns: [/allow\s+outbound\s+tcp\s+443\s+to\s+api\.example\.com/i]
        },
        {
          mode: 'triage_call',
          prompt: 'The Reaper weighs the private path against the public one: <strong>"Choosing between a NAT gateway and a VPC/PrivateLink endpoint for private subnet instances that only need to reach one specific cloud storage service. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 44,
          hintNudge: 'A NAT gateway routes ALL outbound traffic through the public internet path (even to the cloud provider\'s own services); a private endpoint keeps traffic to that ONE specific service entirely within the cloud provider\'s network.',
          hintPartial: 'A VPC/PrivateLink endpoint for that specific storage service keeps the traffic entirely within the cloud provider\'s private network, rather than routing it out through a NAT gateway over what is still effectively an internet-facing path.',
          hintFull: 'Best: a VPC/PrivateLink endpoint for the specific service needed — traffic never leaves the cloud provider\'s private network, which is both more secure and often cheaper than routing that same traffic through a NAT gateway.',
          options: [
            { id: 'a', label: 'A NAT gateway for all outbound access, including to this service', tier: 'defensible', why: 'Works, but routes even this cloud-native traffic out through a NAT gateway unnecessarily, when a private endpoint would keep it entirely off that path.' },
            { id: 'b', label: 'A VPC/PrivateLink endpoint for the specific service', tier: 'best', why: 'Keeps traffic to that one needed service entirely within the cloud provider\'s private network — more secure and often cheaper than NAT gateway data processing charges.' },
            { id: 'c', label: 'Give the instances public IPs to reach the service directly', tier: 'wrong', why: 'Makes private-subnet instances directly internet-reachable — exactly what putting them in a private subnet was meant to avoid.' }
          ],
          justificationPatterns: [/privatelink|private\s*endpoint|vpc\s*endpoint|private\s*network/i]
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"Designing network architecture for an active-active multi-region service vs. active-passive. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 44,
          hintNudge: 'Active-passive has a standby region that mostly sits idle until failover; active-active serves real traffic from every region simultaneously — the real question is whether that added complexity is worth the payoff for THIS service.',
          hintPartial: 'Choose based on actual requirements: active-active gives lower latency (serving users from their nearest region) and no idle standby capacity, at the cost of real added complexity (data consistency across regions); active-passive is simpler but leaves a region\'s capacity idle until failover.',
          hintFull: 'Best: match the choice to actual requirements — active-active is worth its added complexity (cross-region data consistency, conflict handling) when low latency for a global user base and full utilization of every region\'s capacity genuinely matter; active-passive is simpler and reasonable when those aren\'t priorities and a standby region for disaster recovery is enough.',
          options: [
            { id: 'a', label: 'Always active-active, since more availability is always better', tier: 'wrong', why: 'Takes on real, genuine complexity (cross-region data consistency, conflict resolution) uniformly, even for services where a simpler active-passive setup would have been entirely sufficient.' },
            { id: 'b', label: 'Match the choice to actual latency/utilization needs vs. complexity tolerance', tier: 'best', why: 'Active-active\'s real benefits (lower latency, full capacity utilization) come with real complexity costs — the right choice depends on whether this specific service\'s needs justify that tradeoff.' },
            { id: 'c', label: 'Always active-passive, since it\'s simpler to reason about', tier: 'defensible', why: 'Simpler, but for a genuinely global, latency-sensitive service, leaves real user-experience and idle-capacity costs on the table that active-active would address.' }
          ],
          justificationPatterns: [/match.*(need|requirement)|depends\s*on|latency.*complexity/i]
        },
        {
          mode: 'read_the_room',
          prompt: 'A trusted seal is swapped, and the old guard doesn\'t recognize it. <strong>After a routine certificate renewal, a mobile app that uses certificate pinning suddenly can\'t connect at all. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 28, damageIfOptimal: 48,
          hintNudge: 'Certificate pinning hardcodes trust to a SPECIFIC certificate (or its public key) — a routine renewal that changes the certificate breaks that hardcoded trust unless the pin was planned around it.',
          hintPartial: 'The mobile app has the old certificate (or its exact public key) hardcoded via pinning, and the routine renewal issued a genuinely different certificate — the app now rejects the new, otherwise perfectly valid certificate because it doesn\'t match the old pin.',
          hintFull: 'Diagnosis: certificate pinning in the app is hardcoded to the old certificate/key, which the renewal changed. Fix: for the current incident, roll back to the previous certificate if still valid, or push an app update with the new pin; going forward, pin to a more stable value (like a CA or an intermediate) or rotate pins proactively before each renewal.',
          outputBlock: [
            '$ (mobile app logs) SSL Pinning failure: certificate does not match pinned public key',
            '(certificate was renewed via automatic process 2 hours ago; app was never updated with a new pin)'
          ],
          acceptableDiagnosesPatterns: [/pinning.*(mismatch|old|outdated)/i, /pin.*(hardcoded|not\s*updated)/i],
          followUpFix: {
            prompt: 'What\'s the more resilient long-term fix for certificate pinning around renewals?',
            acceptablePatterns: [],
            optimalPatterns: [/pin.*(ca|intermediate)|rotate.*pin|proactive/i]
          }
        },
        {
          mode: 'read_the_room',
          prompt: 'A whisper now travels the long way around. <strong>After a recent architecture change, an internal service call\'s latency tripled, though nothing about the call itself changed. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 28, damageIfOptimal: 48,
          hintNudge: 'If the call itself is unchanged but latency tripled after an architecture change, check whether that change accidentally moved one side of the call into a different (farther) network location — like a different region or AZ.',
          hintPartial: 'The recent architecture change accidentally placed the calling service and the service it depends on in different regions/AZs, adding real cross-region network latency to every call that wasn\'t there before.',
          hintFull: 'Diagnosis: a recent change introduced an accidental cross-region (or cross-AZ) hop for this call, adding real network latency. Fix: identify where the two services are now actually located relative to each other, and either co-locate them or add a regional replica so the call stays local.',
          outputBlock: [
            '$ (latency, before change) p50: 8ms',
            '$ (latency, after change) p50: 28ms',
            '(the call itself, request/response shape, is unchanged)'
          ],
          acceptableDiagnosesPatterns: [/cross-region|cross-az|different\s*region/i, /accidental.*(hop|latency)/i],
          followUpFix: {
            prompt: 'Fix it by identifying and correcting the accidental cross-region placement:',
            acceptablePatterns: [],
            optimalPatterns: [/co-?locate|regional\s*replica|same\s*region/i]
          }
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"Deciding how to handle a critical CVE just announced in a widely-used TLS library across dozens of the organization\'s services. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 44,
          hintNudge: 'Fixing this service-by-service, independently, duplicates the same investigation dozens of times with inconsistent timing — a shared root cause deserves a coordinated, centralized response, same principle as a compromised CI action.',
          hintPartial: 'Centrally identify every service using the vulnerable library version, assess real exploitability/exposure, then coordinate a single tracked patching effort — not dozens of independent, uncoordinated fixes at different speeds.',
          hintFull: 'Best: centrally identify every affected service (inventory/scan for the library version), assess actual exploitability, then coordinate a single, tracked remediation effort across all of them — dozens of teams independently discovering and patching the same CVE is slower and harder to verify complete.',
          options: [
            { id: 'a', label: 'Notify all teams and let each patch independently at their own pace', tier: 'defensible', why: 'Gets the word out, but with no central tracking, there\'s no reliable way to confirm every affected service actually got patched, or how quickly.' },
            { id: 'b', label: 'Centrally identify every affected service, then coordinate a single tracked remediation effort', tier: 'best', why: 'Ensures full, verifiable coverage and consistent timing, rather than relying on dozens of independent teams to each notice and patch the same shared vulnerability.' },
            { id: 'c', label: 'Wait for each team\'s next regular deployment cycle to pick up the fix', tier: 'wrong', why: 'A CRITICAL CVE left unpatched across dozens of services at "normal pace" is a real, unnecessary window of exposure for something already known and actionable now.' }
          ],
          justificationPatterns: [/centrally|coordinated|tracked\s*remediation|inventory/i]
        },
        {
          mode: 'terminal',
          prompt: 'The reaper checks a border\'s true width: <strong>"Show the actual negotiated cipher suite for a TLS connection to <code>example.com</code>."</strong>',
          damageIfCorrect: 24, damageIfOptimal: 40,
          hintNudge: 'openssl s_client connects and prints the full handshake, including the negotiated cipher — grep for it.',
          hintPartial: 'openssl s_client -connect example.com:443 </dev/null 2>/dev/null | grep ______',
          hintFull: 'openssl s_client -connect example.com:443 </dev/null 2>/dev/null | grep Cipher',
          acceptablePatterns: [/^openssl\s+s_client\s+-connect\s+example\.com:443$/i],
          optimalPatterns: [/^openssl\s+s_client\s+-connect\s+example\.com:443\s+<\/dev\/null\s+2>\/dev\/null\s+\|\s+grep\s+Cipher$/i],
          baseCmds: ['openssl']
        },
        {
          mode: 'read_the_room',
          prompt: 'A well everyone drinks from turns bitter at once. <strong>A shared internal DNS resolver used by every service in the cluster starts intermittently failing lookups for ALL domains, not just one. Diagnose it, then fix it.</strong>',
          damageIfCorrect: 28, damageIfOptimal: 48,
          hintNudge: 'Failures across EVERY domain (not just one) point at the shared resolver infrastructure itself being overloaded or unhealthy, rather than any single domain\'s DNS records.',
          hintPartial: 'The shared internal resolver itself is overloaded or unhealthy — since every domain is affected, not just one, the problem can\'t be with any single domain\'s actual DNS records.',
          hintFull: 'Diagnosis: the shared internal DNS resolver is overloaded or unhealthy, affecting every lookup regardless of domain. Fix: check the resolver\'s own resource usage and query volume, and add redundant resolver capacity so no single resolver instance is a shared point of failure for the whole cluster.',
          outputBlock: [
            '$ (multiple services, same time window) dig <various different domains>',
            ';; connection timed out; no servers could be reached',
            '(affects every domain queried, not one specific one)'
          ],
          acceptableDiagnosesPatterns: [/resolver.*(overload|unhealthy|itself)/i, /shared\s*resolver/i],
          followUpFix: {
            prompt: 'Fix it by adding redundant resolver capacity:',
            acceptablePatterns: [],
            optimalPatterns: [/redundant|additional\s*resolver|multiple\s*resolver/i]
          }
        },
        {
          mode: 'triage_call',
          prompt: '<strong>"Deciding whether to enable HSTS (HTTP Strict Transport Security) with a long max-age on a production domain. Pick your move, then justify it in one line."</strong>',
          damageIfCorrect: 26, damageIfOptimal: 44,
          hintNudge: 'HSTS with a long max-age tells browsers to REFUSE plain HTTP for that domain for a long time — a real commitment that\'s hard to reverse quickly if something about the domain\'s HTTPS setup ever needs to change.',
          hintPartial: 'Enable it, but only once HTTPS is fully, reliably working across the whole domain (and any subdomains it covers) — a long max-age is a real commitment that browsers will enforce strictly, making a rollback to HTTP painful for the specified duration.',
          hintFull: 'Best: enable HSTS with a long max-age once HTTPS is confirmed fully reliable across the domain — it meaningfully protects against protocol-downgrade attacks, but because browsers will enforce it strictly, only commit once you\'re confident you won\'t need to fall back to plain HTTP during that window.',
          options: [
            { id: 'a', label: 'Enable it immediately with a long max-age, without further verification', tier: 'wrong', why: 'A long max-age is a strict, hard-to-reverse browser-enforced commitment — enabling it before confirming HTTPS is fully reliable risks locking out legitimate access if something\'s still wrong.' },
            { id: 'b', label: 'Enable it once HTTPS is confirmed fully reliable across the domain', tier: 'best', why: 'Gets HSTS\'s real protection against downgrade attacks, timed to when the commitment it enforces is actually safe to make.' },
            { id: 'c', label: 'Never enable it — plain HTTP fallback is safer to keep available', tier: 'wrong', why: 'Gives up real, meaningful protection against protocol-downgrade attacks for a production domain that should be running HTTPS anyway.' }
          ],
          justificationPatterns: [/hsts|confirmed.*reliable|downgrade/i]
        }
      ]
    }
  ]
};
