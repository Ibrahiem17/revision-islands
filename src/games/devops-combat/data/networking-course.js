// Networking course terminal content (Tower A, Floor 1: Cafe Kitchen,
// Dining Hall, Network Lab). This is the user's own real, verbatim
// networking study notes (three overlapping note passes consolidated into
// one canonical 24-topic list, split 8/8/8 across the three rooms below),
// NOT the site's placeholder lessons. Every command, example IP, and
// troubleshooting scenario here traces back to those notes. Nginx-specific
// material is excluded per the user's own explicit instruction in their
// notes ("I am excluding Nginx completely, as requested"); the Reverse
// Proxy CONCEPT is included, also per their own explicit instruction.
//
// Room split (in the notes' own natural progression):
//   Cafe Kitchen  -> NET_FOUNDATIONS (topics 1-8:  TCP/IP Model .. Same Network vs Same Server)
//   Dining Hall   -> NET_ADDRESSING  (topics 9-16: Subnetting .. HTTP)
//   Network Lab   -> NET_PROTOCOLS   (topics 17-24: HTTPS .. Reverse Proxy)

function cmd(lines) {
  return '<pre class="dgc-course-cmd">' + lines + '</pre>';
}
var P = '<span class="dgc-course-prompt">$</span> ';

/* ============================================================
   CAFE KITCHEN — net-foundations (Topics 1-8)
   ============================================================ */
export var NET_FOUNDATIONS = [
  {
    id: 'tcp-ip-model',
    icon: '🧱',
    title: '1. TCP/IP Model',
    body:
      '<p>When your computer talks to another computer — say you type <code>https://google.com</code> — a lot has to happen: understand the application request, establish a transport connection, figure out where the destination is, and send the data through the network. The <strong>TCP/IP model</strong> divides these jobs into 4 layers.</p>' +
      cmd('Application\n     ↓\nTransport\n     ↓\nInternet\n     ↓\nNetwork Access') +
      '<p><strong>Layer 1 — Application.</strong> Where network applications and their protocols live: <code>HTTP</code>, <code>HTTPS</code>, <code>DNS</code>, <code>SSH</code>, <code>SMTP</code>. Browser → HTTP/HTTPS, SSH client → SSH, domain lookup → DNS, email → SMTP. Run ' + P.replace('$ ', '') + '<code>curl https://example.com</code> and the application-level protocol is HTTPS.</p>' +
      '<p><strong>Layer 2 — Transport.</strong> Controls how data is delivered between applications. Two protocols matter: <strong>TCP</strong> (reliable, connection-oriented) and <strong>UDP</strong> (connectionless, lower overhead). HTTP/HTTPS and SSH and database connections usually use TCP; DNS commonly uses UDP.</p>' +
      '<p><strong>Layer 3 — Internet.</strong> Deals with IP addressing and routing. Main protocol: <strong>IP</strong>. It answers "where should this packet go?" — e.g. client <code>192.168.1.10</code> reaching server <code>10.0.1.20</code>.</p>' +
      '<p><strong>Layer 4 — Network Access.</strong> Actually moving data across the local network — Ethernet or Wi-Fi.</p>' +
      '<p>One request through the layers, <code>curl https://google.com</code>:</p>' +
      cmd('HTTPS (Application)\n     ↓\nTCP (Transport)\n     ↓\nIP (Internet)\n     ↓\nWi-Fi/Ethernet (Network Access)') +
      '<p>Or <code>ssh ubuntu@192.168.1.10</code>:</p>' +
      cmd('SSH → TCP → IP → Wi-Fi/Ethernet → Server') +
      '<p><strong>OSI model.</strong> TCP/IP connects loosely to OSI\'s 7 layers. For DevOps, the important numbers are:</p>' +
      '<ul><li>Layer 7 — Application</li><li>Layer 4 — TCP/UDP</li><li>Layer 3 — IP/routing</li><li>Layer 2 — Ethernet</li><li>Layer 1 — Physical</li></ul>' +
      '<p>This is why you hear "Layer 4 load balancer", "Layer 7 load balancer", "Layer 3 routing".</p>' +
      '<p><strong>DevOps importance — "which layer is failing" framing.</strong> When "the website doesn\'t work", ask in order:</p>' +
      cmd('Is the application working?\n        ↓\nIs TCP working?\n        ↓\nIs IP routing working?\n        ↓\nIs the network interface working?') +
      '<p>This layered thinking becomes extremely useful with load balancers, Kubernetes, AWS, firewalls, containers, and network troubleshooting in general.</p>'
  },
  {
    id: 'ipv4',
    icon: '📍',
    title: '2. IPv4',
    body:
      '<p>Computers need addresses so they can identify network destinations. IPv4 addresses look like <code>192.168.1.10</code>, <code>10.0.1.20</code>, or <code>172.30.1.2</code>. An IPv4 address contains 32 bits, normally written as four numbers: <code>192.168.1.10</code>. Each section is called an <strong>octet</strong>, ranging from 0 to 255.</p>' +
      '<p><strong>Why can it only go to 255?</strong> Each octet contains 8 bits. 8 bits means 2⁸ = 256 possible values: 0 through 255. So IPv4 has 4 × 8 = 32 bits total.</p>' +
      '<p><strong>Different machines need different IPs.</strong> A web server at <code>10.0.1.20</code>, an application at <code>10.0.1.21</code>, and a database at <code>10.0.2.30</code> are three different machines, so they need three different IP addresses.</p>' +
      '<p><strong>Public vs private IP.</strong> Private addresses are used inside private networks and aren\'t directly routable across the public internet. The three private IPv4 ranges are:</p>' +
      cmd('10.0.0.0/8\n172.16.0.0/12\n192.168.0.0/16') +
      '<p>Examples: <code>10.0.1.20</code>, <code>172.30.1.2</code>, <code>192.168.1.50</code>. A <strong>public IP</strong> can be used for communication over the internet, e.g. <code>54.211.120.15</code> — a public-facing AWS server might have one.</p>' +
      '<p><strong>DevOps example.</strong> A common architecture:</p>' +
      cmd('Internet\n    ↓\nPublic web server\n    ↓\nPrivate application\n    ↓\nPrivate database') +
      '<p>E.g. Web → <code>10.0.1.20</code>, App → <code>10.0.1.30</code>, Database → <code>10.0.2.30</code>. The database doesn\'t need to be directly reachable from the internet.</p>' +
      '<p><strong>Important: one server can have multiple IPs.</strong> A common misconception is "one server = one IP" — that\'s not true. One server can have <code>127.0.0.1</code>, <code>172.30.1.2</code>, and <code>172.17.0.1</code> all at once, because it can have multiple network interfaces/networks.</p>'
  },
  {
    id: 'network-interfaces',
    icon: '🔌',
    title: '3. Network Interfaces',
    body:
      '<p>An IP address needs to be attached to a <strong>network interface</strong> — what allows the machine to communicate over a network. A Linux machine might have <code>lo</code>, <code>enp1s0</code>, <code>docker0</code>.</p>' +
      '<p><strong><code>lo</code></strong> — the loopback interface, typically <code>127.0.0.1</code>. It means "this machine communicating with itself." <code>curl localhost</code> means you\'re connecting to the local machine.</p>' +
      '<p><strong><code>enp1s0</code></strong> — a normal Ethernet interface, e.g. <code>172.30.1.2</code>. It connects the machine to the main network.</p>' +
      '<p><strong><code>docker0</code></strong> — Docker creates this network interface for its bridge network, e.g. <code>172.17.0.1</code>, providing connectivity between the host and Docker containers on that network.</p>' +
      '<p><strong>Important distinction:</strong> a network interface is <em>not</em> the same thing as an IP address.</p>' +
      cmd('enp1s0\n   ↓\n172.30.1.2/24') +
      '<p>The interface is <code>enp1s0</code>; the IP address assigned to it is <code>172.30.1.2</code>.</p>'
  },
  {
    id: 'ip-link',
    icon: '🔗',
    title: '4. ip link',
    body:
      '<p><strong>Purpose:</strong> shows network interfaces and their link state.</p>' +
      cmd(P + 'ip link\n\n1: lo: &lt;LOOPBACK,UP,LOWER_UP&gt;\n2: enp1s0: &lt;BROADCAST,MULTICAST,UP,LOWER_UP&gt;\n3: docker0: &lt;BROADCAST,MULTICAST,UP,LOWER_UP&gt;') +
      '<p>You can see <code>lo</code>, <code>enp1s0</code>, <code>docker0</code>, and <code>state UP</code> means the interface is active.</p>' +
      '<p><strong>What are you looking for?</strong> Primarily <code>UP</code>. If an interface is down, you\'ll see <code>DOWN</code> instead — that can prevent network communication through that interface.</p>' +
      '<p><strong>Troubleshooting — interface is down.</strong> Server can\'t communicate with the network. First run:</p>' +
      cmd(P + 'ip link\n\n2: enp1s0: &lt;BROADCAST,MULTICAST,DOWN&gt;') +
      '<p>Problem: the network interface is down. Investigation with <code>ip addr</code> may also show the interface isn\'t properly configured. <strong>Solution</strong> — bring the interface up:</p>' +
      cmd(P + 'sudo ip link set enp1s0 up') +
      '<p>Then verify:</p>' +
      cmd(P + 'ip link\n\n2: enp1s0: &lt;BROADCAST,MULTICAST,UP&gt;') +
      '<p>Expect <code>UP</code> this time.</p>'
  },
  {
    id: 'ip-addr',
    icon: '🏷️',
    title: '5. ip addr',
    body:
      '<p><code>ip link</code> tells you about interfaces. <strong><code>ip addr</code></strong> tells you the IP addresses assigned to those interfaces.</p>' +
      cmd(P + 'ip addr\n\nlo\n    inet 127.0.0.1/8\n\nenp1s0\n    inet 172.30.1.2/24\n\ndocker0\n    inet 172.17.0.1/16') +
      '<p>Reading one line: <code>2: enp1s0: inet 172.30.1.2/24</code> — Interface: <code>enp1s0</code>, IP: <code>172.30.1.2</code>, Network prefix: <code>/24</code>. Your machine has <code>127.0.0.1</code>, <code>172.30.1.2</code>, and <code>172.17.0.1</code> — one machine, multiple IP addresses.</p>' +
      '<p><strong><code>ip addr</code> vs <code>ip route</code>:</strong> <code>ip addr</code> answers "What IP addresses do I have?" <code>ip route</code> answers "Where should Linux send traffic for a destination?" — e.g. <code>172.17.0.0/16 dev docker0</code> means destination <code>172.17.x.x</code> → use <code>docker0</code>.</p>'
  },
  {
    id: 'hostname-i',
    icon: '🖥️',
    title: '6. hostname -I',
    body:
      '<p>Sometimes you don\'t want the complete <code>ip addr</code> output — you just want to see the machine\'s IP addresses.</p>' +
      cmd(P + 'hostname -I\n\n172.30.1.2 172.17.0.1') +
      '<p><strong>Difference:</strong> <code>ip addr</code> gives detailed interface/IP info; <code>hostname -I</code> gives you the IP addresses more simply — useful when you just want to know "what IP addresses does this machine have?"</p>'
  },
  {
    id: 'cidr',
    icon: '🧮',
    title: '7. CIDR Notation',
    body:
      '<p>An IP address alone doesn\'t tell us which part identifies the network and which part identifies the host. <code>172.30.1.2</code> doesn\'t tell us the network boundary by itself — we need <code>172.30.1.2/24</code>. The <code>/24</code> is <strong>CIDR notation</strong>.</p>' +
      '<p><strong>What does /24 mean?</strong> 24 bits = network portion, 8 bits = host portion (IPv4 has 32 bits total, <code>32 - 24 = 8</code>). 8 host bits gives <code>2^8 = 256</code> addresses.</p>' +
      '<p><strong>Example — /24:</strong> <code>172.30.1.2/24</code> — the network is <code>172.30.1.0/24</code>. The addresses in this subnet run <code>172.30.1.0</code> through <code>172.30.1.255</code>. Traditionally <code>172.30.1.0</code> is the network address and <code>172.30.1.255</code> is the broadcast address, so usable host addresses are <code>172.30.1.1</code> through <code>172.30.1.254</code>.</p>' +
      '<p><strong>Example — /16:</strong> <code>172.17.0.1/16</code> — the network is <code>172.17.0.0/16</code>. The last two octets are host range, so <code>172.17.1.10</code>, <code>172.17.2.20</code>, <code>172.17.100.50</code> can all belong to that /16 network.</p>' +
      '<p><strong>Example — /8:</strong> <code>10.0.0.1/8</code> — the network is <code>10.0.0.0/8</code>. The remaining three octets are host space.</p>' +
      '<p><strong>Important correction:</strong> "172" does <em>not</em> automatically identify the network. For <code>172.30.1.2/24</code>, the network is <code>172.30.1.0/24</code> — the <code>/24</code> is what determines where the network boundary is.</p>'
  },
  {
    id: 'same-network-vs-same-server',
    icon: '🧩',
    title: '8. Same Network vs Same Server',
    body:
      '<p>Suppose <code>172.30.1.5/24</code>, <code>172.30.1.20/24</code>, <code>172.30.1.100/24</code>. Are they the same IP? No. Are they the same server? No. Are they in the same network? <strong>Yes</strong> — because they all belong to <code>172.30.1.0/24</code>.</p>' +
      '<p><strong>Worked example.</strong> Machine A <code>172.30.1.5</code>, Machine B <code>172.30.1.100</code> have different IP addresses (<code>172.30.1.5 ≠ 172.30.1.100</code>) but they\'re both inside <code>172.30.1.0/24</code> — therefore, same network. Add <code>172.30.1.200</code> and it belongs there too.</p>' +
      '<p><strong>Different network:</strong> <code>172.30.1.5/24</code> and <code>172.30.2.5/24</code> are in different networks — <code>172.30.1.0/24</code> versus <code>172.30.2.0/24</code>. Likewise <code>172.30.1.5</code> and <code>172.31.1.5</code> belong to different /24 networks: <code>172.30.1.0/24</code>, <code>172.31.1.0/24</code>.</p>' +
      '<p>This distinction — different IPs and even different machines can still share one network, while a single-digit change in an octet can put you in a completely different one — becomes critical for routing.</p>'
  }
];

/* ============================================================
   DINING HALL — net-addressing (Topics 9-16)
   ============================================================ */
export var NET_ADDRESSING = [
  {
    id: 'subnetting',
    icon: '🗂️',
    title: '9. Subnetting',
    body:
      '<p>Suppose you have one large network, <code>10.0.0.0/16</code>. You don\'t necessarily want every server in one giant network — you can divide it into smaller networks: <code>10.0.1.0/24</code>, <code>10.0.2.0/24</code>, <code>10.0.3.0/24</code>. Each is a separate subnet.</p>' +
      '<p><strong>DevOps/AWS example.</strong> You might design a <code>VPC: 10.0.0.0/16</code>, then:</p>' +
      cmd('Public subnet              10.0.1.0/24\nPrivate application subnet  10.0.2.0/24\nDatabase subnet             10.0.3.0/24') +
      '<p>This gives network separation. <strong>Why separate them?</strong> Security and architecture:</p>' +
      cmd('Internet\n   ↓\nPublic subnet\n   ↓\nWeb server\n   ↓\nPrivate subnet\n   ↓\nDatabase') +
      '<p>The database doesn\'t need to be directly exposed to the internet.</p>' +
      '<p><strong>Subnetting is not "giving every server an IP."</strong> Subnetting means dividing one IP network into smaller IP networks — <code>10.0.0.0/16</code> becomes <code>10.0.1.0/24</code>, <code>10.0.2.0/24</code>, <code>10.0.3.0/24</code>. Then machines inside those subnets receive individual IP addresses.</p>' +
      '<p><strong>Docker example.</strong> Your machine\'s main network might be <code>172.30.1.0/24</code>, while Docker runs its own separate network, <code>172.17.0.0/16</code> — your host participates in multiple networks at once.</p>'
  },
  {
    id: 'routing',
    icon: '🛣️',
    title: '10. Routing',
    body:
      '<p>Once a machine knows "I want to reach X.X.X.X" it needs to determine "where should I send the packet?" That\'s <strong>routing</strong>.</p>' +
      '<p><strong><code>ip route</code></strong> — shows Linux\'s routing table.</p>' +
      cmd(P + 'ip route\n\ndefault via 172.30.1.1 dev enp1s0\n172.17.0.0/16 dev docker0\n172.30.1.0/24 dev enp1s0') +
      '<p>Reading each line: <code>172.17.0.0/16 dev docker0</code> means "to reach the 172.17.0.0/16 network, use docker0" — so a destination of <code>172.17.0.25</code> uses <code>docker0</code>. <code>172.30.1.0/24 dev enp1s0</code> means "to reach the 172.30.1.0/24 network, use enp1s0." <code>default via 172.30.1.1 dev enp1s0</code> means "if no more specific route matches the destination, send the packet to <code>172.30.1.1</code> through <code>enp1s0</code>" — that <code>172.30.1.1</code> is the default gateway.</p>' +
      '<p><strong>Troubleshooting — a route exists doesn\'t mean the destination is reachable.</strong> Application server <code>10.0.1.20</code> needs to reach database <code>10.0.2.30</code> but reports "Connection timeout." Check routing:</p>' +
      cmd(P + 'ip route get 10.0.2.30\n\n10.0.2.30 via 10.0.1.1 dev eth0') +
      '<p>This proves Linux knows which route it <em>would</em> use — it does <strong>not</strong> prove the database is reachable. The chain to investigate next is: Application → Routing → Gateway → Network → Firewall/security group → Database. From here, investigate firewall rules, security groups, the database\'s listening state, ports, and connectivity.</p>'
  },
  {
    id: 'default-gateway',
    icon: '🚪',
    title: '11. Default Gateway',
    body:
      '<p>Your machine can directly communicate with destinations on its local network. But what happens when the destination is outside that network? Machine <code>172.30.1.2/24</code> wants to reach <code>8.8.8.8</code>, which is not inside <code>172.30.1.0/24</code> — so Linux needs somewhere to send the packet. It sends it to <code>172.30.1.1</code>, the <strong>default gateway</strong>.</p>' +
      '<p>The gateway IP is normally the IP address of the router/interface your machine uses to reach other networks. Your routing table says <code>default via 172.30.1.1</code>:</p>' +
      cmd('Your machine\n172.30.1.2\n      ↓\nGateway\n172.30.1.1\n      ↓\nOther networks\n      ↓\nInternet') +
      '<p><strong>Does the gateway replace routing? No.</strong> The gateway is part of routing — Linux first looks at its routing table. Destination <code>172.17.0.25</code>: routing table says <code>172.17.0.0/16 → docker0</code>, so Linux doesn\'t use the default gateway. Destination <code>8.8.8.8</code>: there isn\'t a specific route, so Linux uses <code>default → 172.30.1.1</code>.</p>' +
      '<p>Therefore: <strong>Routing</strong> = deciding where to send traffic. <strong>Gateway</strong> = the next-hop router used for destinations outside the local network.</p>' +
      '<p><strong>Very important distinction:</strong> a gateway does not mean "every packet goes through the gateway." A local destination goes via direct route/interface; an external destination goes via the default route, then the gateway.</p>' +
      '<p><strong><code>ip route get</code></strong> — one of the most useful troubleshooting commands. It asks Linux "exactly how would you reach this destination?"</p>' +
      cmd(P + 'ip route get 10.0.1.20\n\n10.0.1.20 via 172.30.1.1 dev enp1s0 src 172.30.1.2 uid 0') +
      '<p>Reading it: Destination <code>10.0.1.20</code>, next hop <code>172.30.1.1</code>, interface <code>enp1s0</code>, source IP <code>172.30.1.2</code>.</p>' +
      '<p><strong>Troubleshooting — server has an IP but cannot reach the internet.</strong> <code>ip addr</code> shows <code>enp1s0 inet 172.30.1.2/24</code>. <code>ip route</code> shows <code>172.30.1.0/24 dev enp1s0</code> but <em>no</em> <code>default via 172.30.1.1</code> line. Problem: no default route — the machine knows how to reach <code>172.30.1.x</code> but doesn\'t know where to send traffic for other networks. Solution:</p>' +
      cmd(P + 'sudo ip route add default via 172.30.1.1 dev enp1s0') +
      '<p>Then <code>ip route</code> should contain <code>default via 172.30.1.1 dev enp1s0</code>.</p>'
  },
  {
    id: 'dns',
    icon: '🌍',
    title: '12. DNS',
    body:
      '<p>Humans like <code>google.com</code>. Computers communicate using IP addresses like <code>142.250.x.x</code>. <strong>DNS</strong> translates domain names into IP addresses: <code>google.com → DNS → IP address</code>.</p>' +
      '<p>A <strong>DNS server</strong> answers DNS queries — e.g. <code>8.8.8.8</code> is Google\'s public DNS resolver, <code>1.1.1.1</code> is Cloudflare\'s. Your machine can be configured to use these servers.</p>' +
      '<p><strong><code>resolvectl status</code></strong> — shows DNS configuration used by the system.</p>' +
      cmd(P + 'resolvectl status\n\nGlobal\n    DNS\n\nLink 2 (enp1s0)\n    Current Scopes: DNS\n    DNS Servers: 8.8.8.8 1.1.1.1\n\nLink 3 (docker0)\n    Current Scopes: none') +
      '<p>Reading it: <code>Link 2 (enp1s0)</code> means the DNS configuration applies to <code>enp1s0</code>; <code>DNS Servers: 8.8.8.8 1.1.1.1</code> means your machine can use those DNS servers.</p>' +
      '<p><strong><code>getent hosts</code></strong> — uses the system\'s configured name-resolution mechanisms to resolve a hostname.</p>' +
      cmd(P + 'getent hosts google.com\n\n142.250.190.14 google.com') +
      '<p>(or an IPv6 result such as <code>2607:f8b0:4006:818::200e google.com</code>).</p>' +
      '<p><strong><code>dig</code></strong> — directly queries DNS and inspects detailed DNS information.</p>' +
      cmd(P + 'dig google.com\n\n;; ANSWER SECTION:\ngoogle.com.    300    IN    A    142.250.190.14') +
      '<p>Meaning: <code>google.com → A record → 142.250.190.14</code>.</p>' +
      '<p><strong><code>nslookup</code></strong> — another DNS lookup tool.</p>' +
      cmd(P + 'nslookup google.com\n\nName:    google.com\nAddress: 142.250.190.14') +
      '<p><strong>Important distinction:</strong> <code>getent</code>, <code>dig</code>, and <code>nslookup</code> can all help resolve names, but they\'re not identical. <code>getent</code> uses the system\'s normal name-resolution configuration. <code>dig</code> is specifically a DNS diagnostic tool and gives much more DNS detail. <code>nslookup</code> is also a DNS query tool. For DevOps troubleshooting: <code>getent</code> → "Can the system resolve this hostname?" <code>dig</code> → "What\'s actually happening with DNS?"</p>' +
      '<p><strong>DNS troubleshooting flow.</strong> <code>curl https://api.example.com</code> fails. First ask: can my machine resolve the hostname?</p>' +
      cmd(P + 'getent hosts api.example.com') +
      '<p>If it returns an IP like <code>10.0.1.20 api.example.com</code>, DNS resolution worked. If it returns nothing or an error, DNS resolution failed — investigate DNS.</p>' +
      '<p><strong>DevOps Troubleshooting Problem — DNS.</strong> Application cannot connect to <code>api.example.com</code>. Test:</p>' +
      cmd(P + 'getent hosts api.example.com\n\n(no output)') +
      '<p><strong>Diagnosis:</strong> the hostname isn\'t resolving. Check:</p>' +
      cmd(P + 'resolvectl status') +
      '<p>Suppose you discover no usable DNS server is configured for the interface. <strong>Solution:</strong> correct the DNS configuration, then test again:</p>' +
      cmd(P + 'getent hosts api.example.com\n\n10.0.1.20 api.example.com') +
      '<p>DNS is working again.</p>'
  },
  {
    id: 'dns-resolution',
    icon: '🔄',
    title: '13. DNS Resolution',
    body:
      '<p>DNS isn\'t simply "domain → IP." There is a process behind it. You request <code>google.com</code>; your system asks a DNS resolver "what IP belongs to google.com?" The resolver finds the answer and returns it.</p>' +
      cmd('Application\n    ↓\nLocal DNS configuration\n    ↓\nDNS resolver\n    ↓\nDNS answer\n    ↓\nIP address') +
      '<p>Then networking can continue: <code>google.com → IP address → routing → server</code>.</p>' +
      '<p><strong>Very important distinction — DNS vs routing.</strong> They do different jobs. DNS finds the IP address; routing decides where/how to send packets:</p>' +
      cmd('google.com\n    ↓\nDNS\n    ↓\n142.250.x.x\n    ↓\nRouting\n    ↓\nNetwork\n    ↓\nGoogle server')
  },
  {
    id: 'tcp',
    icon: '🤝',
    title: '14. TCP',
    body:
      '<p>Applications often need reliable communication. <strong>TCP</strong> provides connection establishment, reliable delivery, ordering, retransmission when needed, and flow control. SSH, HTTP/HTTPS, and many database connections commonly use TCP.</p>' +
      cmd('Client\n   ↓\nTCP connection\n   ↓\nServer') +
      '<p>Before application data is exchanged, TCP establishes a connection with the classic <strong>three-way handshake</strong>:</p>' +
      cmd('Client                  Server\n  SYN  ------------------>\n       <------------------ SYN-ACK\n  ACK  ------------------>') +
      '<p>Step 1 — <strong>SYN:</strong> client says "I want to establish a TCP connection." Step 2 — <strong>SYN-ACK:</strong> server responds "I received your request and I\'m willing to establish the connection." Step 3 — <strong>ACK:</strong> client confirms "I received your response." Then data can be exchanged. E.g. <code>curl http://192.168.1.10</code> conceptually is Client → TCP connection to port 80 → <code>192.168.1.10:80</code>; TCP establishes the connection, then HTTP data can flow.</p>' +
      '<p><strong>TCP uses ports.</strong> An IP identifies a machine; a <strong>port</strong> identifies a network service/application endpoint on that machine. <code>192.168.1.10:22</code> → IP <code>192.168.1.10</code>, port 22 (commonly SSH). <code>192.168.1.10:80</code> → port 80, commonly HTTP. <code>192.168.1.10:443</code> → port 443, commonly HTTPS. So: IP → which machine? Port → which service?</p>' +
      '<p><strong><code>ss</code></strong> — shows network sockets and active connections.</p>' +
      cmd(P + 'ss -tuln\n\nNetid  State   Local Address:Port\ntcp    LISTEN  0.0.0.0:22\ntcp    LISTEN  0.0.0.0:80') +
      '<p>Read as: <code>:22</code> → SSH listening, <code>:80</code> → HTTP service listening. Flags: <code>-t</code> TCP, <code>-u</code> UDP, <code>-l</code> listening, <code>-n</code> numeric addresses/ports. <code>LISTEN</code> means a TCP service is waiting for incoming connections on that port — it does <strong>not</strong> automatically mean the application is healthy, only that something is listening.</p>' +
      '<p><strong>Why does DevOps care?</strong> <code>curl http://server:8080</code> fails — you need to determine: is the application listening? Is TCP port 8080 reachable? Is a firewall blocking it? Is routing correct?</p>' +
      '<p><strong>DevOps Troubleshooting Problem — application isn\'t listening.</strong> User says "the server is reachable but the API doesn\'t work." You check:</p>' +
      cmd(P + 'ss -tulnp\n\ntcp LISTEN 0 511 0.0.0.0:80') +
      '<p>But there\'s no <code>:3000</code> — your Node.js application is supposed to listen on 3000. Test:</p>' +
      cmd(P + 'curl localhost:3000\n\ncurl: (7) Failed to connect to localhost port 3000') +
      '<p><strong>Diagnosis:</strong> the network may be fine — the application isn\'t listening on port 3000. <strong>Solution:</strong> start/restart the application, then verify:</p>' +
      cmd(P + 'ss -tulnp\n\ntcp LISTEN 0 511 0.0.0.0:3000') +
      cmd(P + 'curl localhost:3000\n\nHello from Node.js') +
      '<p>Now the application is reachable locally.</p>'
  },
  {
    id: 'udp',
    icon: '📡',
    title: '15. UDP',
    body:
      '<p>Some applications don\'t need TCP\'s connection establishment and reliability mechanisms. <strong>UDP</strong> is connectionless and has lower protocol overhead — used for DNS queries, some streaming, gaming, and real-time applications.</p>' +
      '<ul>' +
      '<li><strong>TCP</strong> — connection-oriented, reliable delivery, ordered data, more overhead. HTTP/HTTPS commonly uses it.</li>' +
      '<li><strong>UDP</strong> — connectionless, no built-in delivery guarantee, no built-in ordering, lower overhead. DNS commonly uses it.</li>' +
      '</ul>' +
      '<p>The key is <em>not</em> "TCP = slow, UDP = fast" — that\'s too simplistic. The important difference is how the protocol handles communication.</p>' +
      '<p><strong>UDP ports.</strong> DNS uses UDP port 53 — so <code>8.8.8.8:53</code> means "8.8.8.8, UDP port 53."</p>' +
      cmd(P + 'ss -tuln\n\nudp  UNCONN  0.0.0.0:53\ntcp  LISTEN  0.0.0.0:22') +
      '<p><code>udp :53</code> means something is using UDP port 53.</p>' +
      '<p><strong>TCP vs UDP in DevOps — ask what protocol first.</strong> SSH → TCP 22. HTTPS → TCP 443. DNS → commonly UDP 53. Knowing the expected protocol immediately tells you what kind of connection you\'re investigating.</p>'
  },
  {
    id: 'http',
    icon: '🌐',
    title: '16. HTTP',
    body:
      '<p><strong>HTTP</strong> defines how clients and web servers communicate.</p>' +
      cmd('Browser\n   ↓\nHTTP request\n   ↓\nWeb server\n   ↓\nHTTP response') +
      '<p><strong>HTTP request</strong> contains a method, path, headers, and body:</p>' +
      cmd('GET /users HTTP/1.1\nHost: example.com') +
      '<p><strong>HTTP response</strong> returns a status code, headers, and body:</p>' +
      cmd('HTTP/1.1 200 OK\n\nHello') +
      '<p><strong>HTTP uses ports.</strong> Commonly HTTP → 80, HTTPS → 443 — this is why <code>443</code> is a port number.</p>' +
      '<p><strong>HTTP uses TCP.</strong> <code>HTTP → TCP → IP → Network</code>. Browser → HTTP → TCP port 80 → Server. Port 80 is the standard HTTP port.</p>' +
      '<p><strong><code>curl</code></strong> tests HTTP directly:</p>' +
      cmd(P + 'curl localhost\n\nWelcome to nginx!') +
      '<p>A response means something on <code>localhost</code> responded to an HTTP request.</p>' +
      '<p><strong><code>curl -I</code></strong> — request headers only. Extremely useful for DevOps troubleshooting.</p>' +
      cmd(P + 'curl -I http://localhost\n\nHTTP/1.1 200 OK\nServer: nginx\nContent-Type: text/html\nContent-Length: 615')
  }
];

/* ============================================================
   NETWORK LAB — net-protocols (Topics 17-24)
   ============================================================ */
export var NET_PROTOCOLS = [
  {
    id: 'https',
    icon: '🔒',
    title: '17. HTTPS',
    body:
      '<p><strong>HTTPS</strong> protects HTTP communication using TLS. Without encryption, data on an untrusted network can potentially be observed or modified by attackers:</p>' +
      cmd('Client\n   ↓\nHTTP\n   ↓\nServer') +
      '<p>With HTTPS:</p>' +
      cmd('Client\n   ↓\nTLS\n   ↓\nEncrypted HTTP\n   ↓\nServer') +
      '<p><strong>Port 443.</strong> HTTPS commonly uses port 443, so <code>https://example.com</code> normally means:</p>' +
      cmd('TCP connection\n      ↓\nport 443\n      ↓\nTLS\n      ↓\nHTTP') +
      '<p><strong><code>curl -I</code> on HTTPS:</strong></p>' +
      cmd(P + 'curl -I https://example.com\n\nHTTP/2 200\ncontent-type: text/html\nserver: nginx') +
      '<p>Tells you the HTTPS endpoint responded successfully.</p>' +
      '<p><strong>Check TLS details with <code>curl -v</code>:</strong></p>' +
      cmd(P + 'curl -v https://example.com\n\n* Connected to example.com\n* SSL connection using TLSv1.3\n* Server certificate:\n* SSL certificate verify ok') +
      '<p><code>-v</code> means verbose — gives much more connection information than <code>-I</code>.</p>'
  },
  {
    id: 'tls-ssl',
    icon: '🔐',
    title: '18. TLS/SSL',
    body:
      '<p><strong>TLS</strong> provides security for network communication with three goals: <strong>Encryption</strong> (protects the contents of communication from being read by unauthorized parties), <strong>Authentication</strong> (the server presents a certificate that lets the client verify the server\'s identity, e.g. <code>example.com</code> has a TLS certificate for its domain), and <strong>Integrity</strong> (TLS helps detect whether data was modified during transmission).</p>' +
      '<p><strong>Terminology.</strong> People still commonly say "SSL," but modern secure web connections use <strong>TLS</strong>. When someone says "SSL certificate," they usually mean a certificate used with TLS.</p>' +
      '<p><strong>HTTPS request flow.</strong> Visiting <code>https://example.com</code>, the conceptual process is:</p>' +
      cmd('DNS\n ↓\nIP address\n ↓\nRouting\n ↓\nTCP connection\n ↓\nTLS handshake\n ↓\nHTTP request\n ↓\nHTTP response') +
      '<p>This is one of the most important complete flows in networking.</p>' +
      '<p><strong>What can go wrong?</strong> Certificate expired, certificate doesn\'t match the hostname, or the certificate isn\'t trusted — the browser may show a security warning. If a website works on HTTP but HTTPS fails, investigate TCP 443 → TLS handshake → certificate → application.</p>' +
      '<p><strong>Useful command — <code>curl -v</code>:</strong></p>' +
      cmd(P + 'curl -v https://example.com\n\n* Connected to example.com\n* TLSv1.3\n* SSL certificate verify ok') +
      '<p>If certificate validation fails, you\'ll see an error instead.</p>' +
      '<p><strong>DevOps Troubleshooting Problem — HTTPS website is not working.</strong></p>' +
      cmd(P + 'curl -v https://example.com\n\n* Connected to example.com\n* TLS certificate verification failed') +
      '<p>DNS worked (reached the server), TCP worked (connected), and the failure is around TLS. Possible causes: expired cert, wrong hostname, untrusted cert, incorrect chain. <strong>Solution:</strong> inspect the certificate/TLS config on the server/load balancer, renew or replace the cert, verify the chain and hostname. Logic trail: DNS ✅ → Routing ✅ → TCP 443 ✅ → TLS ❌.</p>'
  },
  {
    id: 'http-methods',
    icon: '📮',
    title: '19. HTTP Methods',
    body:
      '<p>HTTP methods tell the server what operation the client wants to perform. The important methods: <code>GET</code>, <code>POST</code>, <code>PUT</code>, <code>PATCH</code>, <code>DELETE</code>.</p>' +
      '<p><strong>GET</strong> — retrieve data. <code>GET /users</code> means "give me the users."</p>' +
      cmd(P + 'curl http://localhost:3000/users\n\n[{"id":1,"name":"Ali"},{"id":2,"name":"Ahmed"}]') +
      '<p><strong>POST</strong> — submit/create data. <code>POST /users</code> with body <code>{"name": "Ali"}</code> means "create a user with this data."</p>' +
      cmd(P + 'curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d \'{"name":"Ali"}\'\n\n{"id": 3, "name": "Ali"}') +
      '<p><strong>PUT</strong> — usually used to replace/update a resource. <code>PUT /users/3</code> with body <code>{"name":"Ali","email":"ali@example.com"}</code> — think "replace the representation of user 3 with this new representation."</p>' +
      '<p><strong>PATCH</strong> — partially update a resource. <code>PATCH /users/3</code> with body <code>{"name":"Ahmed"}</code> — you don\'t necessarily need to send every field.</p>' +
      '<p><strong>DELETE</strong> — delete a resource. <code>DELETE /users/3</code> means "delete user 3."</p>' +
      '<p><strong>Important commands:</strong> <code>-X</code> specifies the HTTP method, e.g. <code>curl -X GET ...</code> / <code>curl -X POST ...</code>.</p>'
  },
  {
    id: 'http-status-codes',
    icon: '🚦',
    title: '20. HTTP Status Codes',
    body:
      '<p>Status codes tell the client what happened with the request.</p>' +
      '<p><strong>1xx — Informational</strong> (e.g. 100, not usually troubleshot at this level).</p>' +
      '<p><strong>2xx — Success:</strong> <code>200 OK</code> request succeeded; <code>201 Created</code> resource was created.</p>' +
      '<p><strong>3xx — Redirection:</strong> <code>301</code>/<code>302</code> the client is being redirected.</p>' +
      '<p><strong>4xx — Client/request problem:</strong> <code>400 Bad Request</code>, <code>401 Unauthorized</code>, <code>403 Forbidden</code>, <code>404 Not Found</code>. <code>404</code> means the requested resource wasn\'t found; <code>401</code> usually means authentication is required or failed; <code>403</code> means the server understood the request but refuses access.</p>' +
      '<p><strong>5xx — Server-side problem</strong> (particularly important in DevOps): <code>500 Internal Server Error</code>, <code>502 Bad Gateway</code>, <code>503 Service Unavailable</code>, <code>504 Gateway Timeout</code>. E.g. <code>502</code> can occur when a proxy/load balancer can\'t get a valid response from an upstream application.</p>' +
      '<p><strong>Status code troubleshooting mapping:</strong> see <code>500</code> → think "application problem." See <code>502</code> → think "proxy/load balancer → upstream problem." See <code>503</code> → think "service unavailable." See <code>504</code> → think "upstream didn\'t respond in time." (Not absolute rules, but excellent starting points.)</p>' +
      '<p><strong>Troubleshooting logic.</strong> If <code>curl https://example.com</code> returns <code>404</code>, the network connection may actually be working — you reached the HTTP server, and the problem is likely at the application/request-routing level. But if you get <code>connection timed out</code>, investigate connectivity, routing, firewall, and service availability instead. This is why status codes help locate failures.</p>' +
      '<p><strong>Important command:</strong> <code>curl -I http://localhost</code> → <code>HTTP/1.1 200 OK</code> — you can immediately see the HTTP status.</p>' +
      '<p><strong>DevOps Troubleshooting Problem — API returns 502.</strong></p>' +
      cmd(P + 'curl -I https://api.example.com/users\n\nHTTP/1.1 502 Bad Gateway') +
      '<p><code>502</code> often means an intermediary couldn\'t get a valid response from an upstream service. Architecture: Client → Proxy/load balancer → Application. Investigate:</p>' +
      cmd(P + 'ss -tuln\n\ntcp LISTEN 0.0.0.0:5000') +
      '<p>Expected <code>tcp LISTEN 0.0.0.0:3000</code> but see <code>0.0.0.0:5000</code> instead. <strong>Problem:</strong> the proxy expects port 3000 but the application listens on 5000. <strong>Solution:</strong> configure the proxy to use port 5000, or configure the application to use port 3000. Test the app directly:</p>' +
      cmd(P + 'curl http://localhost:5000/users\n\n[{"id":1,"name":"Ali"}]') +
      '<p>The application itself is responding — now configure the proxy to reach the correct port.</p>'
  },
  {
    id: 'http-headers',
    icon: '🧾',
    title: '21. HTTP Headers',
    body:
      '<p>Headers carry additional information about an HTTP request or response.</p>' +
      cmd('GET /users HTTP/1.1\nHost: example.com\nAuthorization: Bearer ...\nContent-Type: application/json') +
      '<p><strong>Host</strong> — tells the server which hostname is being requested (<code>Host: api.example.com</code>); especially important when one server handles multiple domains.</p>' +
      '<p><strong>Authorization</strong> — carries authentication credentials/token information (<code>Authorization: Bearer &lt;token&gt;</code>).</p>' +
      '<p><strong>Content-Type</strong> — describes the format of the request body (<code>Content-Type: application/json</code>).</p>' +
      '<p><strong>Accept</strong> — tells the server what response format the client prefers, e.g. <code>Accept: application/json</code> meaning "I prefer JSON in the response."</p>' +
      '<p><strong>Response headers</strong>, e.g.:</p>' +
      cmd('Content-Type: application/json\nContent-Length: 1234\nSet-Cookie: ...') +
      '<p>They provide metadata about the response. <strong>Location</strong> is often used with redirects: <code>HTTP/1.1 301 Moved Permanently</code> / <code>Location: https://example.com</code> — the client can then go to the new location.</p>' +
      '<p><strong>Important commands:</strong></p>' +
      cmd(P + 'curl -I https://example.com\n\nHTTP/2 200\ncontent-type: text/html\ncontent-length: 1256\nserver: nginx') +
      '<p>Sending a header: <code>-H</code> means "add an HTTP header."</p>' +
      cmd(P + 'curl -H "Accept: application/json" http://localhost:3000/users') +
      '<p>Sending JSON: <code>-H</code> adds the header, <code>Content-Type: application/json</code> tells the server the body is JSON, <code>-d</code> sends the request body.</p>' +
      cmd(P + 'curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d \'{"name":"Ali"}\'') +
      '<p><strong>DevOps importance:</strong> headers become extremely important when troubleshooting reverse proxies, load balancers, APIs, authentication, cookies, caching, CORS, and client IP forwarding.</p>' +
      '<p><strong>DevOps Troubleshooting Problem — API returns 400 Bad Request.</strong></p>' +
      cmd(P + 'curl -X POST http://localhost:3000/users -d \'{"name":"Ali"}\'\n\nHTTP/1.1 400 Bad Request') +
      '<p>We sent JSON-looking data but didn\'t tell the server the body is JSON — the <code>Content-Type</code> header is missing. <strong>Solution:</strong></p>' +
      cmd(P + 'curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d \'{"name":"Ali"}\'\n\nHTTP/1.1 201 Created\n{"id":3,"name":"Ali"}') +
      '<p>What we troubleshot: HTTP method = POST, HTTP header = Content-Type, Body = JSON, Status <code>400 → 201</code>.</p>'
  },
  {
    id: 'rest-apis',
    icon: '📦',
    title: '22. REST APIs',
    body:
      '<p>An API provides a way for applications to communicate. Instead of the frontend directly talking to the database, it talks to a backend API:</p>' +
      cmd('Frontend\n   ↓\nAPI\n   ↓\nDatabase') +
      '<p><strong>Example API — users resource:</strong></p>' +
      cmd('GET    /users\nPOST   /users\nGET    /users/10\nPUT    /users/10\nPATCH  /users/10\nDELETE /users/10') +
      '<p>The URL represents the resource (<code>/users</code>, <code>/users/5</code>, <code>/products</code>, <code>/orders/100</code>) and the HTTP method represents the operation.</p>' +
      '<p><strong>Example.</strong> Frontend requests <code>GET /users/10</code>. Backend: <code>API → Database → User #10</code>. Response:</p>' +
      cmd('{\n  "id": 10,\n  "name": "Ali"\n}') +
      '<p><strong>DevOps importance:</strong> you constantly work with APIs — AWS APIs, the Kubernetes API, GitHub APIs, CI/CD APIs, internal company APIs. Understanding HTTP and REST makes these systems much easier to troubleshoot.</p>' +
      '<p><strong>Troubleshooting — wrong endpoint.</strong></p>' +
      cmd(P + 'curl http://localhost:3000/api/users\n\n404 Not Found') +
      '<p>Possible issue: wrong endpoint — maybe the actual endpoint is <code>/api/user</code> instead of <code>/api/users</code>.</p>'
  },
  {
    id: 'json',
    icon: '🗃️',
    title: '23. JSON',
    body:
      '<p>Applications need a standard format for exchanging structured data. <strong>JSON</strong> is commonly used with REST APIs.</p>' +
      cmd('{\n  "id": 10,\n  "name": "Ali",\n  "age": 22\n}') +
      '<p><strong>JSON objects</strong> use <code>key: value</code> pairs:</p>' +
      cmd('{\n  "name": "Ali"\n}') +
      '<p><strong>JSON arrays:</strong></p>' +
      cmd('{\n  "users": [\n    { "id": 1, "name": "Ali" },\n    { "id": 2, "name": "Ahmed" }\n  ]\n}') +
      '<p><strong>JSON data types:</strong> String, Number, Boolean, Object, Array, null.</p>' +
      '<ul>' +
      '<li>String — <code>{"name":"Ali"}</code></li>' +
      '<li>Number — <code>{"age":22}</code></li>' +
      '<li>Boolean — <code>{"active":true}</code></li>' +
      '<li>null — <code>{"phone":null}</code></li>' +
      '<li>Array — <code>{"skills":["Linux","Docker","AWS"]}</code></li>' +
      '<li>Object inside object — <code>{"user":{"name":"Ali","age":22}}</code></li>' +
      '</ul>' +
      '<p><strong>HTTP vs JSON:</strong> HTTP defines communication (request/response, methods, headers, status codes). JSON defines how structured data is represented. HTTP transports/communicates the data; JSON represents the data.</p>' +
      '<p><strong>Complete API request walkthrough.</strong></p>' +
      cmd('POST /users\nContent-Type: application/json\n\n{\n  "name": "Ali",\n  "email": "ali@example.com"\n}') +
      '<p>Response:</p>' +
      cmd('HTTP/1.1 201 Created\nContent-Type: application/json\n\n{\n  "id": 10,\n  "name": "Ali",\n  "email": "ali@example.com"\n}') +
      '<p>Breaking down every part: <code>POST</code> = HTTP method, <code>/users</code> = API resource, <code>Content-Type</code> = HTTP header, <code>application/json</code> = body format, the JSON object = actual data, <code>201</code> = HTTP status code.</p>' +
      '<p><strong>Connecting it all together</strong> — <code>curl https://api.example.com/users</code> conceptually flows: DNS → IP → Routing → TCP (three-way handshake) → TLS (certificate presented/validated) → HTTP (<code>GET /users HTTP/1.1</code>, Host/Accept headers) → server responds (<code>200 OK</code>, <code>Content-Type: application/json</code>, JSON body) → REST API → JSON → Application → Database.</p>'
  },
  {
    id: 'reverse-proxy',
    icon: '🔁',
    title: '24. Reverse Proxy',
    body:
      '<p>This is the last networking concept before Nginx — the concept is included here, but the Nginx-specific configuration material is not, as excluded by request.</p>' +
      '<p>Suppose you have <code>Internet → Application</code> — you can expose the application directly. But in production you often want an intermediate server:</p>' +
      cmd('Internet\n   ↓\nReverse proxy\n   ↓\nApplication') +
      '<p>The reverse proxy receives the client\'s request and forwards it to the appropriate backend.</p>' +
      '<p><strong>Why use a reverse proxy in DevOps?</strong> It provides a central entry point for applications:</p>' +
      cmd('Internet\n   ↓\nReverse proxy\n   ↓\nFrontend\nBackend\nAPI') +
      '<p>It can also help with: HTTPS/TLS termination, routing requests, hiding internal application servers, centralized access control, forwarding headers, load balancing, and serving static content.</p>' +
      '<p><strong>Reverse proxy vs forward proxy.</strong> A <strong>forward proxy</strong> generally acts on behalf of clients:</p>' +
      cmd('Client\n   ↓\nForward proxy\n   ↓\nInternet\n   ↓\nServer') +
      '<p>A <strong>reverse proxy</strong> sits in front of servers:</p>' +
      cmd('Client\n   ↓\nReverse proxy\n   ↓\nBackend server') +
      '<p>The important DevOps pattern is <code>Client → Reverse proxy → Application</code>.</p>' +
      '<p><strong>Complete networking flow.</strong> Connecting everything learned across this course — a user visits <code>https://api.example.com/users</code>:</p>' +
      cmd('                 DNS\n                  ↓\n          api.example.com\n                  ↓\n              IP address\n                  ↓\n               Routing\n                  ↓\n             TCP :443\n                  ↓\n                 TLS\n                  ↓\n                HTTPS\n                  ↓\n             HTTP GET\n             /users\n                  ↓\n           Reverse proxy\n                  ↓\n           Backend API\n                  ↓\n              Database') +
      '<p>And the API might respond:</p>' +
      cmd('HTTP/1.1 200 OK\nContent-Type: application/json\n\n{\n  "users": [\n    { "id": 1, "name": "Ali" }\n  ]\n}') +
      '<p><strong>The most important mental model.</strong> When someone says "the website isn\'t working," don\'t immediately assume the application is broken — trace the request:</p>' +
      '<ol>' +
      '<li><strong>DNS</strong> — Can the hostname resolve?</li>' +
      '<li><strong>IP</strong> — What IP did DNS give us?</li>' +
      '<li><strong>Routing</strong> — How will my machine reach that IP?</li>' +
      '<li><strong>Gateway</strong> — Does traffic need to leave my local network?</li>' +
      '<li><strong>TCP</strong> — Can I establish the connection?</li>' +
      '<li><strong>Port</strong> — Is the service listening?</li>' +
      '<li><strong>TLS</strong> — Can the secure connection be established?</li>' +
      '<li><strong>HTTP</strong> — What response did the server return?</li>' +
      '<li><strong>Application/API</strong> — Is the application behaving correctly?</li>' +
      '</ol>' +
      '<p>This is the foundation for real DevOps troubleshooting.</p>' +
      '<p><strong>The Linux command toolbox built across this course:</strong></p>' +
      cmd('ip link                 What network interfaces exist and are they up?\nip addr                 What IP addresses are assigned?\nhostname -I             What IP addresses does this machine have?\nip route                What routes does Linux have?\nip route get &lt;IP&gt;      Exactly how will Linux reach this destination?\nping &lt;IP&gt;              Can I reach this host using ICMP?\ncurl &lt;URL&gt;             Does the HTTP application respond?\nresolvectl status       What DNS configuration is being used?\ngetent hosts &lt;domain&gt;  Can the system resolve this hostname?\ndig &lt;domain&gt;           What DNS information is returned?\nnslookup &lt;domain&gt;      Perform a DNS lookup\nss -tulnp               What TCP/UDP ports are listening?') +
      '<p><strong>The biggest distinctions to remember:</strong></p>' +
      '<ul>' +
      '<li><strong>IP vs port</strong> — <code>10.0.1.20:3000</code>: IP identifies the network destination, port identifies the service/application endpoint on that machine.</li>' +
      '<li><strong>IP address vs network</strong> — <code>172.30.1.20</code> is an IP address; <code>172.30.1.0/24</code> is a network.</li>' +
      '<li><strong>Same network vs same server</strong> — <code>172.30.1.5</code> and <code>172.30.1.20</code> can be different machines, same network.</li>' +
      '<li><strong>Interface vs IP</strong> — <code>enp1s0</code> is an interface; <code>172.30.1.2</code> is an IP assigned to that interface.</li>' +
      '<li><strong>DNS vs routing</strong> — DNS: "what IP belongs to google.com?" Routing: "how do I reach that IP?"</li>' +
      '<li><strong>Routing vs gateway</strong> — routing decides the path; the gateway is the next-hop router used when traffic needs to leave the local network. The gateway is used because of a routing decision.</li>' +
      '<li><strong>TCP vs UDP</strong> — TCP: reliable connection-oriented communication. UDP: connectionless communication with lower overhead.</li>' +
      '<li><strong>HTTP vs HTTPS</strong> — HTTP: web communication. HTTPS: HTTP protected by TLS.</li>' +
      '<li><strong>HTTPS vs TLS</strong> — they\'re not the same thing: HTTP + TLS = HTTPS.</li>' +
      '<li><strong>HTTP status vs network failure</strong> — a <code>404</code> means you successfully reached an HTTP server and it returned a response; a <code>connection timed out</code> means the problem is much earlier in the networking path. This distinction is extremely important in troubleshooting.</li>' +
      '</ul>'
  }
];
