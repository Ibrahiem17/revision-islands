// Per-floor themes of both New City towers (lobby, hallways, rooms, furniture).
import { tf, tg, rackGlows } from './tower-helpers.js';

export var TOWER_THEMES = [
  /* ---------------- TOWER A: DevOps HQ (blue steel) ---------------- */
  {
    lobby: {
      extras: [
        tf('statusBoard', 128, 0, { wall: true, z: 1, label: 'status board', say: 'All services: green. Nobody has dared to refresh the page.' }),
        tf('plantFern', 24, 386, { label: 'plant', say: 'A lobby fern on a maintenance contract.' })
      ]
    },
    floors: [null,
      { name: 'CAFE & COMMONS',
        hall: { sign: '1 · CAFE', wall: '#f2e2c0', wainscot: '#b5573a', wainscotBorder: '#7a3a26', sidewall: '#7a3a26', floor: 'floorTile', floorFilter: 'none', runner: 'filter:hue-rotate(-12deg) saturate(1.15);', skip: ['bench'],
          decor: [
            tf('menuBoard', 128, 2, { wall: true, label: 'menu board', say: 'Soup of the day. Sandwich of the sprint. Cache coffee, served warm.' }),
            tf('coffeeCart', 110, 316, { label: 'coffee cart', say: 'Self-serve espresso. The queue is empty, the caffeine is not.' }),
            tf('teatable', 352, 334, { label: 'cafe table', say: 'Reserved for whoever brings the biscuits.' }),
            tf('stool', 300, 352, { label: 'stool', say: 'A wobbly stool. It is fine, it is only eventually consistent.' }),
            tf('stool', 416, 352, { flip: true, label: 'stool', say: 'Another stool. Same wobble, different node.' })
          ] },
        rooms: [
          { name: 'CAFE KITCHEN', subtitle: 'The kitchen behind the cafe. It smells of toast and possibility.', theme: { wall: '#f2e2c0', wall2: '#e8d5ac', wainscot: '#b5573a', wainscotBorder: '#7a3a26', sidewall: '#7a3a26', floor: 'floorChecker' },
            fx: [{ kind: 'steam', x: 256, y: 96, n: 4, z: 990 }, { kind: 'steam', x: 454, y: 78, n: 2, z: 990 }],
            furniture: [
              tf('fridge', 24, 40, { solid: [26, 150, 68, 34], label: 'fridge', say: 'Lunches labelled LUNCH_FINAL_v2_REAL. Everything is contested.' }),
              tf('counterCabinet2', 96, 114, { solid: [96, 150, 64, 28], label: 'cupboard', say: 'Mugs, sorted by ticket number.' }),
              tf('counterSink', 160, 114, { solid: [160, 150, 64, 28], label: 'sink', say: 'The dishwasher is on retry. The sink is on call.' }),
              tf('plantHang', 172, 14, { wall: true, z: 2 }),
              tf('rangehood', 220, 20, { wall: true }),
              tf('stove', 224, 90, { z: 178, solid: [224, 150, 64, 28], label: 'stove', say: 'A pot of soup at a steady 200 OK.' }),
              tf('counterCabinet2', 288, 114, { solid: [288, 150, 64, 28], label: 'cupboard', say: 'Spices and one jar labelled "secret". It is oregano.' }),
              tf('counterCabinet2', 352, 114, { solid: [352, 150, 64, 28], label: 'cupboard', say: 'Never serve to prod before tasting in staging.' }),
              tf('counterCabinet2', 416, 114, { solid: [416, 150, 64, 28], label: 'counter' }),
              tf('coffeeMachine', 424, 78, { z: 179, wall: true, label: 'coffee machine', say: 'The only build system that never fails. It just needs beans.', glow: [tg(462, 91, 8, 6, 'led-r', 0.4)] }),
              tf('counterCabinet2', 480, 114, { solid: [480, 150, 64, 28], label: 'counter' }),
              tf('counterCabinet2', 544, 114, { solid: [544, 150, 64, 28], label: 'cupboard', say: 'Pasta in every shape. Sorted by deployment stage.' }),
              tf('menuBoard', 488, 20, { wall: true, label: 'order board', say: 'Orders in the queue: 3. Orders in the dead-letter queue: 1.' }),
              tf('prepTable', 388, 252, { label: 'prep table', say: 'A very clean prep table. The health inspector is a linter.' }),
              tf('stool', 400, 326, { label: 'stool', say: 'Somebody has to taste the soup.' }),
              tf('stool', 462, 326, { flip: true, label: 'stool', say: 'A second taster. Quality assurance.' }),
              tf('teatable', 56, 250, { label: 'staff table', say: 'Staff table. A rota, a biscuit tin and a lot of crumbs.' }),
              tf('stool', 126, 274, { label: 'stool', say: 'Sticky. Do not ask.' }),
              tf('plant', 26, 376, { label: 'plant', say: 'Basil, or something like it. Cooks swear by it.' }),
              tf('consoleDesk', 210, 210, { label: 'break terminal', course: 'net-foundations', say: 'Wedged between the spice rack and a cookbook. Someone bookmarked networking notes instead of a recipe.', glow: [tg(222, 218, 34, 22, 'mon'), tg(262, 218, 34, 22, 'mon', 0.9)] })
            ] },
          { name: 'DINING HALL', subtitle: 'Long tables, a chalk menu and plenty of elbow room.', theme: { wall: '#f6ecd4', wall2: '#ecdfc0', wainscot: '#6a8a5a', wainscotBorder: '#3f5a35', sidewall: '#3f5a35', floor: 'floorWood' },
            fx: [{ kind: 'steam', x: 168, y: 240, n: 3, z: 990 }, { kind: 'steam', x: 476, y: 240, n: 3, z: 990 }],
            furniture: [
              tf('windowBig', 44, 20, { wall: true, label: 'window', say: 'A view of the car park. It is very nicely parked.' }),
              tf('menuBoard', 280, 26, { wall: true, label: 'menu board', say: 'Menu: Monday pasta, Tuesday pasta, Wednesday something suspiciously pasta-shaped.' }),
              tf('windowBig', 436, 20, { wall: true, label: 'window', say: 'Sunny. The kind of weather that makes deploys feel safer.' }),
              tf('plantHang', 212, 20, { wall: true }), tf('plantHang', 372, 20, { wall: true }),
              tf('plantFern', 26, 160, { label: 'fern', say: 'It eats only leftovers of light.' }), tf('plantFern', 550, 160, { label: 'fern', say: 'This fern has better uptime than most servers.' }),
              tf('longTable', 88, 222, { label: 'long table', say: 'Set for a whole stand-up. Somebody has already eaten the bread.' }),
              tf('longTable', 400, 222, { label: 'long table', say: 'The check cloth is on. Lunch is a merge of many opinions.' }),
              tf('longTable', 88, 310, { label: 'long table', say: 'A table long enough for two whole teams and a bug.' }),
              tf('longTable', 400, 310, { label: 'long table', say: 'Soup, bread and a small pile of napkins. Very stable.' }),
              tf('chair', 40, 234, { solid: [46, 272, 36, 34] }), tf('chair', 240, 234, { flip: true, solid: [246, 272, 36, 34] }),
              tf('chair', 352, 234, { solid: [358, 272, 36, 34] }), tf('chair', 552, 234, { flip: true, solid: [558, 272, 36, 34] }),
              tf('chair', 40, 322, { solid: [46, 360, 36, 34] }), tf('chair', 240, 322, { flip: true, solid: [246, 360, 36, 34], label: 'chair', say: 'Its legs squeak in B flat.' }),
              tf('chair', 352, 322, { solid: [358, 360, 36, 34] }), tf('chair', 552, 322, { flip: true, solid: [558, 360, 36, 34] }),
              tf('consoleDesk', 420, 150, { label: 'dining terminal', course: 'net-addressing', say: 'A kiosk by the window. The Wi-Fi password is taped underneath: "subnetting123".', glow: [tg(432, 158, 34, 22, 'mon', 0.4), tg(472, 158, 34, 22, 'mon', 1.3)] })
            ] },
          { name: 'NETWORK LAB', subtitle: 'Racks, cable trays and a wall of monitors nobody quite trusts. Ping it and see.', theme: { wall: '#dfe6ea', wall2: '#cfd9df', wainscot: '#2c4a5e', wainscotBorder: '#1c313f', sidewall: '#1c313f', floor: 'floorCarpetBlue' },
            furniture: [
              tf('cableTray', 12, 4, { wall: true }), tf('cableTray', 200, 4, { wall: true }),
              tf('serverRack', 30, 50, { label: 'server rack', say: 'Every port is exactly where the diagram says it is. Suspicious.', glow: rackGlows(30, 50, 0) }),
              tf('serverRack', 90, 50, { label: 'server rack', say: 'Packets in, packets out. Nobody actually watches this happen.', glow: rackGlows(90, 50, 0.6) }),
              tf('monitorWall', 200, 44, { wall: true, label: 'network lab terminal', course: 'net-protocols', say: 'A wall of monitors. Looks like it wants your attention.', glow: [tg(208, 52, 52, 28, 'mon'), tg(264, 52, 28, 28, 'alarm', 0.8), tg(208, 84, 52, 28, 'mon', 1.1), tg(264, 84, 28, 28, 'mon', 0.4)] }),
              tf('foosball', 150, 226, { label: 'foosball table', say: 'Left over from the Break Room. Nobody had the heart to move it.' }),
              tf('beanbagG', 30, 286, { label: 'bean bag', say: 'For thinking through subnet masks, apparently.' }),
              tf('plantFern', 480, 196, { label: 'plant', say: 'Thrives on ambient router heat.' })
            ] }
        ] },
      { name: 'ENGINEERING',
        hall: { sign: '2 · ENG', wall: '#c6d8ec', wainscot: '#4a6a94', wainscotBorder: '#2f4a6f', sidewall: '#2f4a6f', floor: 'floorCarpetBlue', floorFilter: 'none', runner: 'filter:hue-rotate(205deg) saturate(0.9);', skip: ['bench'],
          decor: [
            tf('statusBoard', 128, 0, { wall: true, label: 'build status', say: 'Build: passing. Tests: passing. Vibes: suspiciously passing.' }),
            tf('whiteboard', 100, 300, { label: 'rolling whiteboard', say: 'A box, an arrow and a box. Architecture, apparently.' }),
            tf('consoleDesk', 330, 330, { label: 'hot desk', say: 'A hot desk. Temperature: unspecified.' }),
            tf('deskchair', 348, 386, { solid: [354, 410, 56, 14] })
          ] },
        rooms: [
          { name: 'DEV BULLPEN', subtitle: 'Rows of dual monitors, a whiteboard and the hum of keyboards.', theme: { wall: '#d3dae6', wall2: '#c6cedb', wainscot: '#5f6b7f', wainscotBorder: '#3f4a5c', sidewall: '#3f4a5c', floor: 'floorCarpetGrey' },
            furniture: [
              tf('whiteboard', 240, 20, { wall: true, label: 'whiteboard', say: 'A sprint board with 47 items marked "in progress".' }),
              tf('filecabinet', 232, 92, { solid: [232, 152, 64, 26], label: 'filing cabinet', say: 'Post-mortems, alphabetically. There are a lot of Ms.' }),
              tf('deskDual', 30, 66, { label: 'desk', say: 'Two monitors, eleven tabs, one very brave rubber duck.', glow: [tg(46, 74, 60, 36, 'mon'), tg(122, 74, 60, 36, 'mon', 1.1)] }),
              tf('deskDual', 418, 66, { label: 'desk', say: 'The build is red. It has been red since Tuesday.', glow: [tg(434, 74, 60, 36, 'mon', 0.6), tg(510, 74, 60, 36, 'mon', 1.6)] }),
              tf('deskchair', 92, 190, { z: 232 }), tf('deskchair', 480, 190, { z: 232 }),
              tf('deskDual', 30, 250, { label: 'desk', say: 'Sticky notes say: DO NOT TOUCH. Someone touched.', glow: [tg(46, 258, 60, 36, 'mon', 0.3), tg(122, 258, 60, 36, 'mon', 1.4)] }),
              tf('deskDual', 418, 250, { label: 'desk', say: 'A mechanical keyboard. It is louder than the standup.', glow: [tg(434, 258, 60, 36, 'mon', 0.9), tg(510, 258, 60, 36, 'mon', 0.2)] }),
              tf('deskchair', 92, 374, { z: 414 }), tf('deskchair', 480, 374, { z: 414 }),
              tf('plantFern', 346, 118, { label: 'plant', say: 'A desk plant with a very strong opinion about tabs.' })
            ] },
          { name: 'MEETING ROOM', subtitle: 'A big table, a projector and a whiteboard that never gets wiped.', theme: { wall: '#d8e2f0', wall2: '#cbd7e8', wainscot: '#3f5f8f', wainscotBorder: '#2a4368', sidewall: '#2a4368', floor: 'floorCarpetBlue' },
            furniture: [
              tf('whiteboard', 56, 34, { wall: true, label: 'whiteboard', say: 'Last week\'s architecture. Nobody dares erase it.' }),
              tf('projectorScreen', 244, 12, { wall: true, label: 'projector screen', say: 'Slide 1 of 87: "Agenda". Slide 87: "Questions?".', glow: [tg(258, 30, 124, 62, 'mon')] }),
              tf('waterCooler', 510, 64, { label: 'water cooler', say: 'The meeting could have been an email. The water is very cold.' }),
              tf('rug', 232, 210, { z: 1 }),
              tf('deskchair', 236, 184, { z: 240 }), tf('deskchair', 292, 184, { z: 240 }), tf('deskchair', 346, 184, { z: 240 }),
              tf('conferenceTable', 228, 212, { label: 'conference table', say: 'Somebody left a marker cap and the meeting notes.', glow: [tg(312, 236, 16, 4, 'led-g', 0.2)] }),
              tf('deskchair', 222, 292, { z: 340 }), tf('deskchair', 358, 292, { z: 340 }),
              tf('plantFern', 26, 176, { label: 'plant', say: 'It attends every meeting. It has never said a word.' }),
              tf('bigplant', 540, 176, { label: 'plant', say: 'A big plant for big decisions.' })
            ] },
          { name: 'FOCUS PODS', subtitle: 'Quiet booths. Please whisper, even in your thoughts.', theme: { wall: '#4a5568', wall2: '#414b5e', wainscot: '#2a3140', wainscotBorder: '#1a202c', sidewall: '#1a202c', floor: 'floorCarpetCharcoal' },
            furniture: [
              tf('podBooth', 32, 52, { label: 'pod 1', say: 'Do not disturb. Currently compiling.', glow: [tg(68, 96, 12, 4, 'mon')] }),
              tf('podBooth', 148, 52, { label: 'pod 2', say: 'A sticky note: "Deep work. Back in 2 hours or 2 days."', glow: [tg(184, 96, 12, 4, 'mon', 0.7)] }),
              tf('plantHang', 262, 22, { wall: true }), tf('plantHang', 322, 34, { wall: true }),
              tf('podBooth', 396, 52, { label: 'pod 3', say: 'Noise-cancelling headphones are hanging on the hook.', glow: [tg(432, 96, 12, 4, 'mon', 1.2)] }),
              tf('podBooth', 512, 52, { label: 'pod 4', say: 'Someone has been here since the sprint planning.', glow: [tg(548, 96, 12, 4, 'mon', 0.4)] }),
              tf('beanbag', 36, 268, { label: 'bean bag', say: 'The official position of the thinking department.' }),
              tf('beanbagG', 130, 330, { label: 'bean bag', say: 'Nobody has ever got up from this one on time.' }),
              tf('lamp', 556, 236, { label: 'floor lamp', say: 'A very warm light. Suitable for whispered debugging.', glow: [tg(562, 238, 28, 20, 'warm')] }),
              tf('plantFern', 26, 190, { label: 'plant', say: 'A plant that also prefers quiet.' })
            ] }
        ] },
      { name: 'OPERATIONS',
        hall: { sign: '3 · OPS', wall: '#c8e4dc', wainscot: '#2f6a66', wainscotBorder: '#1f4a47', sidewall: '#1f4a47', floor: 'floorCarpetTeal', floorFilter: 'none', runner: 'filter:hue-rotate(140deg) saturate(0.85);', skip: ['bench'],
          decor: [
            tf('cableTray', 128, 4, { wall: true }),
            tf('warningSign', 150, 26, { wall: true, label: 'warning sign', say: 'CAUTION: contents may be in production.' }),
            tf('serverRack', 112, 292, { label: 'server rack', say: 'Do not unplug. Especially the one nobody remembers.', glow: rackGlows(112, 292, 0) }),
            tf('serverRack', 172, 292, { label: 'server rack', say: 'Fans at 60 percent. Vibes at 100.', glow: rackGlows(172, 292, 0.6) }),
            tf('partsShelf', 340, 300, { label: 'spares shelf', say: 'Cables, cables and the one cable that fits.' })
          ] },
        rooms: [
          { name: 'SERVER ROOM', subtitle: 'Cold air, blinking lights and the steady hum of production.', tint: 'cold', theme: { wall: '#3c4a5c', wall2: '#354253', wainscot: '#2a3546', wainscotBorder: '#1c2430', sidewall: '#1c2430', floor: 'floorServer' },
            furniture: [
              tf('cableTray', 12, 4, { wall: true }), tf('cableTray', 124, 4, { wall: true }), tf('cableTray', 236, 4, { wall: true }), tf('cableTray', 348, 4, { wall: true }), tf('cableTray', 460, 4, { wall: true }), tf('cableTray', 524, 4, { wall: true }),
              tf('serverRack', 36, 58, { label: 'server rack', say: 'Every blinking LED is a small anxiety.', glow: rackGlows(36, 58, 0) }),
              tf('serverRack', 96, 58, { label: 'server rack', say: 'Rack 2. It hums in C sharp.', glow: rackGlows(96, 58, 0.3) }),
              tf('serverRack', 156, 58, { label: 'server rack', say: 'Uptime: 412 days. Please do not jinx it.', glow: rackGlows(156, 58, 0.9) }),
              tf('statusBoard', 236, 40, { wall: true, label: 'status board', say: 'Everything is green except the one thing that matters.' }),
              tf('warningSign', 346, 46, { wall: true, label: 'warning sign', say: 'DANGER: high availability. Handle with care.' }),
              tf('fireExt', 396, 90, { wall: true, label: 'fire extinguisher', say: 'For fires, not for hot takes.' }),
              tf('serverRack', 424, 58, { label: 'server rack', say: 'Backup, backup of the backup, and backup-backup.', glow: rackGlows(424, 58, 1.2) }),
              tf('serverRack', 484, 58, { label: 'server rack', say: 'It has a sticker: "DO NOT REBOOT (ask Dan)".', glow: rackGlows(484, 58, 0.5) }),
              tf('serverRack', 544, 58, { label: 'server rack', say: 'The cables are colour-coded. The colours are a secret.', glow: rackGlows(544, 58, 1.5) }),
              tf('consoleDesk', 66, 262, { label: 'console', say: 'A crash cart. It has seen things at 3 AM.' }),
              tf('deskchair', 84, 322, { solid: [90, 348, 56, 14] }),
              tf('consoleDesk', 470, 262, { label: 'console', say: 'The logs scroll by. Green. Green. One yellow. Green.' }),
              tf('deskchair', 488, 322, { solid: [494, 348, 56, 14] }),
              tf('serverRack', 186, 262, { label: 'server rack', say: 'A rack on wheels. It is very proud of that.', glow: rackGlows(186, 262, 0.2) }),
              tf('serverRack', 398, 262, { label: 'server rack', say: 'Cold-aisle side. Please dress warmly.', glow: rackGlows(398, 262, 1.0) })
            ] },
          { name: 'NOC', subtitle: 'The network operations centre. Every screen is watching something.', theme: { wall: '#26304a', wall2: '#202940', wainscot: '#1a2238', wainscotBorder: '#0e1424', sidewall: '#0e1424', floor: 'floorCarpetNavy', floorFilter: 'brightness(0.9)' },
            fx: [{ kind: 'steam', x: 132, y: 256, n: 2, z: 990 }, { kind: 'steam', x: 492, y: 256, n: 2, z: 990 }],
            furniture: [
              tf('pagerSign', 240, 4, { wall: true, z: 2, glow: [tg(244, 8, 152, 36, 'alarm')] }),
              tf('monitorWall', 30, 44, { wall: true, label: 'monitor wall', say: 'Three green graphs and one nervous red one.', glow: [tg(38, 52, 52, 28, 'mon'), tg(94, 52, 52, 28, 'alarm'), tg(150, 52, 52, 28, 'mon', 1.3), tg(38, 84, 52, 28, 'mon', 0.5), tg(94, 84, 52, 28, 'mon', 2), tg(150, 84, 52, 28, 'mon', 0.9)] }),
              tf('monitorWall', 228, 44, { wall: true, label: 'monitor wall', say: 'ON CALL: you. It has always been you. Also, latency is going up and to the right.', glow: [tg(236, 52, 52, 28, 'mon', 0.7), tg(292, 52, 52, 28, 'mon', 1.9), tg(348, 52, 52, 28, 'mon', 0.2), tg(236, 84, 52, 28, 'mon', 1.1), tg(292, 84, 52, 28, 'mon', 0.4), tg(348, 84, 52, 28, 'mon', 2.2)] }),
              tf('monitorWall', 426, 44, { wall: true, label: 'monitor wall', say: 'Metrics, traces and logs. Also a cat video, for morale.', glow: [tg(434, 52, 52, 28, 'mon', 1.5), tg(490, 52, 52, 28, 'mon', 0.1), tg(546, 52, 52, 28, 'mon', 1.0), tg(434, 84, 52, 28, 'mon', 2.4), tg(490, 84, 52, 28, 'mon', 0.8), tg(546, 84, 52, 28, 'alarm', 0.8)] }),
              tf('controlDesk', 40, 226, { label: 'control desk', say: 'Two mugs of cold coffee, and an alert with the word "critical" in it.' }),
              tf('deskchair', 68, 290), tf('deskchair', 154, 290),
              tf('controlDesk', 400, 226, { label: 'control desk', say: 'The pager buzzes. The engineer sighs. The circle of life.' }),
              tf('deskchair', 428, 290), tf('deskchair', 514, 290),
              tf('plantFern', 26, 376, { label: 'plant', say: 'The only thing in here that is never paged.' }),
              tf('plantSill', 566, 384, { label: 'plant', say: 'A tiny plant, watching the graphs.' })
            ] },
          { name: 'HARDWARE LAB', subtitle: 'Benches, soldering irons and the smell of hot solder.', theme: { wall: '#bdb9a8', wall2: '#b1ad9c', wainscot: '#6a6f78', wainscotBorder: '#464a52', sidewall: '#464a52', floor: 'floorConcrete' },
            furniture: [
              tf('toolBoard', 30, 50, { wall: true, label: 'tool board', say: 'Every tool has an outline. Every outline has a gap. Who took the pliers?' }),
              tf('partsShelf', 150, 46, { label: 'parts shelf', say: 'Resistors, capacitors and one mystery bag labelled "misc".' }),
              tf('partsShelf', 246, 46, { label: 'parts shelf', say: 'Sorted by colour. And by whatever fell in the wrong bin.' }),
              tf('workbench', 390, 84, { label: 'workbench', say: 'A board mid-repair. The smoke test passed. The smoke did not.' }),
              tf('scope', 492, 62, { wall: true, z: 150, label: 'oscilloscope', say: 'A sine wave. Perfectly tuned, perfectly boring.', glow: [tg(500, 70, 28, 20, 'scope')] }),
              tf('workbench', 50, 254, { label: 'workbench', say: 'Solder, flux and a very steady hand.' }),
              tf('robot', 180, 340, { label: 'little robot', say: 'Beep boop. It is learning to make tea.', glow: [tg(200, 380, 8, 4, 'led-g', 0.5)] }),
              tf('scope', 100, 226, { z: 306 }),
              tf('stool', 100, 326, { label: 'stool', say: 'Anti-static. Also anti-comfort.' }),
              tf('partsShelf', 500, 250, { label: 'spares shelf', say: 'Boards from three different generations of hardware.' }),
              tf('fireExt', 350, 96, { wall: true, label: 'fire extinguisher', say: 'Rated for electrical fires and hot takes.' }),
              tf('lamp', 566, 176, { label: 'work lamp', say: 'A bright lamp. Perfect for reading tiny print, and existential dread.' })
            ] }
        ] },
      { name: 'CREATIVE',
        hall: { sign: '4 · STUDIO', wall: '#e4d0ee', wainscot: '#7a4a8c', wainscotBorder: '#523266', sidewall: '#523266', floor: 'floorCarpetPlum', floorFilter: 'none', runner: 'filter:hue-rotate(285deg) saturate(1.1);', skip: ['bench'],
          decor: [
            tf('artFrameB', 148, 8, { wall: true, label: 'painting', say: 'Modern art. Titled: "Untitled (Ticket #4021)".' }),
            tf('easel', 96, 262, { label: 'easel', say: 'A work in progress. Like most things here.' }),
            tf('canvasstack', 346, 300, { label: 'canvas stack', say: 'Finished paintings waiting for a gallery. Or a bigger wall.' }),
            tf('plantFlower', 410, 350, { label: 'flowers', say: 'Fresh flowers. Currently the most creative part of Monday.' })
          ] },
        rooms: [
          { name: 'DESIGN STUDIO', subtitle: 'Easels, sketches and swatches. Everything is a draft.', theme: { wall: '#f7e6e2', wall2: '#eed6d2', wainscot: '#d8a0b0', wainscotBorder: '#a86a7c', sidewall: '#a86a7c', floor: 'floorWood' },
            furniture: [
              tf('moodBoard', 28, 44, { wall: true, label: 'mood board', say: 'Forty shades of "nearly blue" and a photograph of a croissant.' }),
              tf('windowBig', 176, 20, { wall: true, label: 'big window', say: 'North light. The best release environment for a painting.', glow: [tg(190, 34, 132, 78, 'sun')] }),
              tf('plantSill', 198, 76, { z: 3 }),
              tf('lightbeam', 190, 158, { z: 2 }), tf('lightbeam', 266, 158, { z: 2 }),
              tf('canvasstack', 352, 74, { solid: [354, 154, 92, 26], label: 'canvases', say: 'Finished canvases waiting for a hanging committee.' }),
              tf('photoshelf', 480, 50, { wall: true, label: 'shelf', say: 'Inspiration: postcards, a fossilised brush and a rubber duck in a beret.' }),
              tf('easel', 56, 196, { label: 'easel', say: 'A colourful abstract. Reviewers say: "Needs unit tests."' }),
              tf('easel', 176, 234, { flip: true, label: 'easel', say: 'A landscape. The sky is a bit too hexadecimal.' }),
              tf('draftTable', 416, 232, { label: 'drafting desk', say: 'A blueprint for a button. It took three iterations.' }),
              tf('stool', 456, 306, { label: 'stool', say: 'Splattered with every colour ever made.' }),
              tf('paintpots', 44, 372, { label: 'paint pots', say: 'Red, blue and yellow. Every colour is a merge of three.' }),
              tf('plantFlower', 552, 300, { label: 'flowers', say: 'Sunflowers. They keep their heads up. Which is more than we can say for the sprint board.' })
            ] },
          { name: 'MEDIA STUDIO', subtitle: 'Lights, camera, a green screen and a very patient microphone.', theme: { wall: '#262a36', wall2: '#20242e', wainscot: '#171a24', wainscotBorder: '#0e1018', sidewall: '#0e1018', floor: 'floorSlate' },
            furniture: [
              tf('speaker', 40, 70, { label: 'speaker', say: 'It goes up to eleven. The neighbours are not amused.' }),
              tf('greenScreen', 236, 22, { wall: true, label: 'green screen', say: 'Anyone can be on a beach. Just not on this budget.' }),
              tf('onAirSign', 500, 20, { wall: true, label: 'on-air sign', say: 'ON AIR. Please whisper the deployment pipeline.', glow: [tg(504, 24, 96, 32, 'alarm')] }),
              tf('speaker', 548, 96, { label: 'speaker', say: 'Sound check: one, two, one, two. Still two.' }),
              tf('studioLight', 196, 204, { label: 'studio light', say: 'A softbox. Flattering, unlike the code review.', glow: [tg(204, 212, 32, 28, 'warm')] }),
              tf('studioLight', 396, 204, { flip: true, label: 'studio light', say: 'The key light. It makes everyone look like a hero.', glow: [tg(404, 212, 32, 28, 'warm', 0.7)] }),
              tf('cameraTripod', 300, 188, { label: 'camera', say: 'Recording. Try to look busy, or at least intentional.', glow: [tg(336, 196, 8, 4, 'led-r')] }),
              tf('micStand', 470, 244, { label: 'microphone', say: 'Testing, one two. This mic has heard every stand-up.' }),
              tf('mixDesk', 500, 314, { label: 'mixing desk', say: 'All the faders are at 7. All. Of. Them.' }),
              tf('deskchair', 516, 356, { solid: [522, 380, 56, 14] }),
              tf('beanbag', 44, 326, { label: 'bean bag', say: 'For the talent between takes.' }),
              tf('lamp', 100, 176, { label: 'floor lamp', say: 'A practical light. Practically useless.' })
            ] },
          { name: 'GAME LOUNGE', subtitle: 'Arcade cabinets, neon and a controller with one dead button.', theme: { wall: '#2a1f45', wall2: '#241a3c', wainscot: '#3f2f66', wainscotBorder: '#261a44', sidewall: '#261a44', floor: 'floorCarpetPlum', floorFilter: 'brightness(0.72)' },
            furniture: [
              tf('arcadeCabinet', 30, 48, { label: 'arcade cabinet', say: 'INSERT COIN. The coin slot has been jammed since 2019.', glow: [tg(46, 80, 32, 24, 'game')] }),
              tf('arcadeCabinet', 98, 48, { label: 'arcade cabinet', say: 'High score: AAA. Only one player is called AAA.', glow: [tg(114, 80, 32, 24, 'game', 0.8)] }),
              tf('arcadeCabinet', 166, 48, { label: 'arcade cabinet', say: 'Level 99: a boss that is only a very long log file.', glow: [tg(182, 80, 32, 24, 'game', 1.5)] }),
              tf('neonGame', 246, 26, { wall: true, glow: [tg(250, 30, 152, 36, 'pink')] }),
              tf('tv', 430, 70, { solid: [434, 150, 128, 40], label: 'TV', say: 'Level 7: the boss has 99 problems and every one is a merge conflict.', glow: [tg(454, 78, 88, 48, 'game')] }),
              tf('beanbag', 420, 236, { label: 'bean bag', say: 'A very well-tested bean bag. Zero memory leaks. Some filling leaks.' }),
              tf('beanbagG', 510, 262, { label: 'bean bag', say: 'Player two ready. Player two is always ready.' }),
              tf('controller', 468, 212, { solid: false, label: 'controller', say: 'The left trigger works only on Tuesdays.', hit: [464, 210, 44, 32] }),
              tf('teatable', 548, 176, { label: 'snack table', say: 'Crisps, a suspicious dip and the last slice of pizza.' }),
              tf('popcorn', 552, 160, { z: 250 }),
              tf('speaker', 262, 72, { label: 'speaker', say: 'The bass drops. The build does not. GAME ON, says the neon sign.' }),
              tf('speaker', 340, 72, { label: 'speaker', say: 'Loud enough to hear the CI pipeline weep.' }),
              tf('sofa', 30, 246, { solid: [34, 322, 192, 16], label: 'sofa', say: 'The co-op sofa. Two players. One controller. Chaos.' }),
              tf('coffeetable', 66, 350, { label: 'coffee table', say: 'Energy drinks, arranged by expiry date.' }),
              tf('plantFern', 26, 176, { label: 'plant', say: 'A neon-friendly plant. It glows in the dark. Slightly.' })
            ] }
        ] },
      { name: 'EXECUTIVE',
        hall: { sign: '5 · EXEC', wall: '#6a4a38', wall2: '#5e4232', wainscot: '#3a2416', wainscotBorder: '#241408', sidewall: '#241408', floor: 'floorCarpetBurgundy', floorFilter: 'none', runner: 'filter:hue-rotate(-25deg) saturate(1.1) brightness(0.85);', skip: ['bench', 'waterCooler'],
          decor: [
            tf('artFrameC', 148, 8, { wall: true, label: 'painting', say: 'Oil on canvas. The oil is expensive. So is the canvas.' }),
            tf('trophyCase', 100, 300, { label: 'trophy case', say: 'Best Uptime 2023. Best Uptime 2024. Best Snacks 2022.' }),
            tf('lamp', 236, 296, { label: 'floor lamp', say: 'A very expensive lamp. It is on a subscription.' }),
            tf('armchair', 290, 330, { label: 'armchair', say: 'Leather. The leather is worth more than the sofa. Which is worth more than you.' }),
            tf('teatable', 382, 350, { label: 'side table', say: 'A silver tray. A single, unused biscuit.' })
          ] },
        rooms: [
          { name: 'CEO OFFICE', subtitle: 'The corner office with the big window and the bigger desk.', theme: { wall: '#e6d8b8', wall2: '#dccca8', wainscot: '#7a4a30', wainscotBorder: '#4f2f1e', sidewall: '#4f2f1e', floor: 'floorMarble' },
            furniture: [
              tf('bookshelf', 26, 56, { label: 'bookshelf', say: '"Leading Without Meetings". It is one very long meeting.' }),
              tf('bookshelf', 106, 56, { label: 'bookshelf', say: 'Every book is signed by an author who never met the CEO.' }),
              tf('trophyCase', 190, 44, { label: 'trophy case', say: 'The Golden Rollback Trophy. Only awarded once.' }),
              tf('windowBig', 268, 18, { wall: true, label: 'big window', say: 'The whole city, in a very tasteful frame.', glow: [tg(282, 32, 132, 78, 'sun')] }),
              tf('lightbeam', 280, 158, { z: 2 }), tf('lightbeam', 356, 158, { z: 2 }),
              tf('globe', 448, 92, { label: 'globe', say: 'A globe of a world with only one time zone: sprint time.' }),
              tf('bookshelf', 546, 56, { label: 'bookshelf', say: 'A shelf of awards. And an empty slot for the next one.' }),
              tf('rug', 232, 196, { z: 1 }),
              tf('deskchair', 288, 176, { z: 250 }),
              tf('executiveDesk', 244, 204, { label: 'executive desk', say: 'A single sheet of paper: "Approve everything." It is very good advice.' }),
              tf('armchair', 112, 292, { label: 'armchair', say: 'For guests. Guests never stay for long.' }),
              tf('armchair', 452, 292, { flip: true, label: 'armchair', say: 'For guests who have been called in about a budget.' }),
              tf('bigplant', 26, 250, { label: 'plant', say: 'The tallest employee. Never sits in meetings.' }),
              tf('lamp', 566, 226, { label: 'floor lamp', say: 'A lamp that cost more than the whole engineering budget.' })
            ] },
          { name: 'BOARDROOM', subtitle: 'A long polished table and a very big screen.', theme: { wall: '#5a3f30', wall2: '#503728', wainscot: '#3a2a1e', wainscotBorder: '#241810', sidewall: '#241810', floor: 'floorWoodDark' },
            furniture: [
              tf('barCabinet', 40, 74, { label: 'bar cabinet', say: 'Sparkling water only. The good stuff is for celebrating.' }),
              tf('wallScreen', 236, 22, { wall: true, label: 'big screen', say: 'Q4 Results: a chart that only goes up and to the right.', glow: [tg(244, 30, 152, 56, 'mon')] }),
              tf('waterCooler', 540, 64, { label: 'water station', say: 'Chilled, filtered and completely silent. Unlike the board.' }),
              tf('rug', 216, 200, { z: 1 }),
              tf('deskchair', 200, 176, { z: 240 }), tf('deskchair', 262, 176, { z: 240 }), tf('deskchair', 324, 176, { z: 240 }), tf('deskchair', 386, 176, { z: 240 }),
              tf('boardroomTable', 204, 212, { label: 'boardroom table', say: 'Every seat is the head of the table. Somehow.' }),
              tf('deskchair', 214, 292, { z: 340 }), tf('deskchair', 380, 292, { z: 340 }),
              tf('trophyCase', 26, 250, { label: 'trophy case', say: 'The Golden Pipeline award, awarded to itself.' }),
              tf('plantFern', 546, 176, { label: 'plant', say: 'A very calm plant. It does not vote.' }),
              tf('bigplant', 538, 250, { label: 'plant', say: 'A large plant on the board. Chairman of the leaves.' })
            ] },
          { name: 'ROOFTOP TERRACE', subtitle: 'An open-air deck above the city. Fresh air and string lights.', theme: { wall: '#8fd0f0', wall2: '#86c8ec', wainscot: 'transparent', wainscotBorder: 'transparent', sidewall: '#6a7a90', floor: 'floorDeck' },
            furniture: [
              tf('cloud', 60, 14, { wall: true, z: 1 }), tf('cloud', 300, 30, { wall: true, z: 1 }), tf('cloud', 500, 8, { wall: true, z: 1 }),
              tf('skyline', 0, 42, { wall: true, z: 1 }), tf('skyline', 168, 42, { wall: true, z: 1 }), tf('skyline', 336, 42, { wall: true, z: 1 }), tf('skyline', 504, 42, { wall: true, z: 1 }),
              tf('railing', 0, 100, { wall: true, z: 3 }), tf('railing', 128, 100, { wall: true, z: 3 }), tf('railing', 256, 100, { wall: true, z: 3 }), tf('railing', 384, 100, { wall: true, z: 3 }), tf('railing', 512, 100, { wall: true, z: 3 }),
              tf('stringLights', 8, 36, { wall: true, z: 4, glow: [tg(24, 60, 4, 8, 'twy'), tg(44, 68, 4, 8, 'twp', 0.4), tg(64, 72, 4, 8, 'twb', 0.8), tg(84, 72, 4, 8, 'twy', 1.2), tg(104, 72, 4, 8, 'twp', 0.2), tg(124, 72, 4, 8, 'twb', 0.6), tg(144, 68, 4, 8, 'twy', 1.0), tg(164, 60, 4, 8, 'twp', 1.4)] }),
              tf('stringLights', 172, 36, { wall: true, z: 4, glow: [tg(188, 60, 4, 8, 'twb', 0.5), tg(208, 68, 4, 8, 'twy', 0.9), tg(228, 72, 4, 8, 'twp', 0.1), tg(248, 72, 4, 8, 'twb', 0.7), tg(268, 72, 4, 8, 'twy', 1.3), tg(288, 72, 4, 8, 'twp', 0.3), tg(308, 68, 4, 8, 'twb', 1.1), tg(328, 60, 4, 8, 'twy', 0.6)] }),
              tf('stringLights', 336, 36, { wall: true, z: 4, glow: [tg(352, 60, 4, 8, 'twp', 0.2), tg(372, 68, 4, 8, 'twb', 0.6), tg(392, 72, 4, 8, 'twy', 1.0), tg(412, 72, 4, 8, 'twp', 1.4), tg(432, 72, 4, 8, 'twb', 0.3), tg(452, 72, 4, 8, 'twy', 0.7), tg(472, 68, 4, 8, 'twp', 1.2), tg(492, 60, 4, 8, 'twb', 0.9)] }),
              tf('stringLights', 500, 36, { wall: true, z: 4, glow: [tg(516, 60, 4, 8, 'twy', 0.8), tg(536, 68, 4, 8, 'twp', 0.0), tg(556, 72, 4, 8, 'twb', 0.5), tg(576, 72, 4, 8, 'twy', 1.3), tg(596, 72, 4, 8, 'twp', 0.9), tg(616, 72, 4, 8, 'twb', 0.2)] }),
              tf('planterBox', 30, 168, { label: 'planter box', say: 'Herbs for the cafe downstairs. Rosemary, sage and a strong sense of duty.' }),
              tf('planterBox', 506, 168, { label: 'planter box', say: 'Flowers on the roof. The bees are still filing a ticket.' }),
              tf('loungeChair', 96, 236, { label: 'lounge chair', say: 'Ideal for reviewing pull requests in the sun.' }),
              tf('loungeChair', 452, 236, { flip: true, label: 'lounge chair', say: 'Sunbathing. Sunscreen is part of the release process.' }),
              tf('teatable', 288, 226, { label: 'drinks table', say: 'Lemonade and a single leftover cookie. Both suspiciously fresh.' }),
              tf('bigplant', 26, 296, { label: 'plant', say: 'A tall palm. Enjoys the view even more than you.' }),
              tf('plantFlower', 552, 330, { label: 'flowers', say: 'Roses in a roof garden. Very cinematic.' })
            ] }
        ] }
    ]
  },
  /* ---------------- TOWER B: The Academy (warm brick) - halls done, rooms still to fill ---------------- */
  {
    lobby: {
      extras: [
        tf('noticeBoard', 128, 0, { wall: true, z: 1, label: 'notice board', say: 'Lost: one umbrella. Found: three umbrellas. Please sort it out.' }),
        tf('plantFlower', 556, 382, { label: 'plant', say: 'Fresh flowers, changed weekly. It is a rule.' }),
        tf('plantFern', 24, 386, { label: 'plant', say: 'A fern that prefers the reading room.' })
      ]
    },
    floors: [null,
      { name: 'LIBRARY',
        hall: { sign: '1 · BOOKS', wall: '#efdcc0', wainscot: '#7a4a30', wainscotBorder: '#4f2f1e', sidewall: '#4f2f1e', floor: 'floorParquet', floorFilter: 'none', runner: 'filter:hue-rotate(110deg) saturate(0.7) brightness(0.9);', skip: ['bench', 'waterCooler'],
          decor: [
            tf('artFrameA', 148, 8, { wall: true, label: 'painting', say: 'A landscape. The librarian says: quiet, please.' }),
            tf('bookshelf', 104, 276, { label: 'bookshelf', say: 'Reference books. The most-borrowed one is the index.' }),
            tf('bookCart', 196, 340, { label: 'book cart', say: 'Returns cart. One book has been waiting since 1998.' }),
            tf('armchair', 296, 330, { label: 'reading chair', say: 'A perfect chair. It has swallowed many afternoons.' }),
            tf('lamp', 388, 300, { label: 'reading lamp', say: 'Just enough light to read the small print.' }),
            tf('plantFern', 420, 346, { label: 'fern', say: 'Shh. It is reading too.' })
          ] }
      },
      { name: 'ACADEMY',
        hall: { sign: '2 · ACAD', wall: '#e6ecc4', wainscot: '#3f7048', wainscotBorder: '#2a4a30', sidewall: '#2a4a30', floor: 'floorCarpetGreen', floorFilter: 'none', runner: 'filter:hue-rotate(75deg) saturate(0.9);', skip: ['bench'],
          decor: [
            tf('noticeBoard', 128, 0, { wall: true, label: 'notice board', say: 'Exam timetable. Nobody wants to look at it.' }),
            tf('lockers', 100, 292, { label: 'lockers', say: 'Locker 13. It never opens on the first try.' }),
            tf('trophyCase', 340, 300, { label: 'trophy shelf', say: 'The Golden Semicolon. Awarded yearly.' }),
            tf('plantFern', 430, 346, { label: 'fern', say: 'Top of the class. It sits by the window.' })
          ] }
      },
      { name: 'WELLNESS',
        hall: { sign: '3 · ZEN', wall: '#d4ecdc', wainscot: '#6a9a7a', wainscotBorder: '#3f6a50', sidewall: '#3f6a50', floor: 'floorWhite', floorFilter: 'hue-rotate(60deg) saturate(0.8)', runner: 'filter:hue-rotate(60deg) saturate(0.6) brightness(1.1);', skip: ['bench', 'plant'],
          decor: [
            tf('artFrameA', 148, 8, { wall: true, label: 'painting', say: 'Calm waves. Breathe in. Breathe out. Rebase.' }),
            tf('bigplant', 26, 296, { label: 'plant', say: 'A very relaxed plant. It has good posture.' }),
            tf('mirror', 186, 316, { label: 'mirror', say: 'Looking good. Looking well-rested. Looking suspicious.' }),
            tf('rug', 290, 330, { z: 1 }),
            tf('cushion', 306, 352, { solid: false, label: 'cushion', say: 'A yoga cushion. Inhale. Exhale. Merge.', hit: [302, 350, 76, 34] }),
            tf('cushion', 388, 366, { solid: false, label: 'cushion', say: 'Downward dog. Upward cat.', hit: [384, 364, 76, 34] })
          ] }
      },
      { name: 'ARTS',
        hall: { sign: '4 · ARTS', wall: '#f0d4d4', wainscot: '#8a3a4a', wainscotBorder: '#5a2030', sidewall: '#5a2030', floor: 'floorWoodDark', floorFilter: 'none', runner: 'filter:hue-rotate(320deg) saturate(1.1) brightness(0.9);', skip: ['bench', 'waterCooler'],
          decor: [
            tf('posterVinyl', 150, 2, { wall: true, label: 'poster', say: 'Winter Recital. Tickets: free. Applause: mandatory.' }),
            tf('piano', 96, 324, { label: 'piano', say: 'Middle C is a little flat. So is the rest.' }),
            tf('guitar', 296, 292, { label: 'guitar', say: 'Only three strings. It plays a mean "Blues in E-minus-one".' }),
            tf('easel', 352, 262, { label: 'easel', say: 'A sketch of a sketch. Very meta.' })
          ] }
      },
      { name: 'SKY LOUNGE',
        hall: { sign: '5 · SKY', wall: '#2a3a6a', wall2: '#243360', wainscot: '#1a2448', wainscotBorder: '#0e1430', sidewall: '#0e1430', floor: 'floorCarpetNavy', floorFilter: 'none', runner: 'filter:hue-rotate(200deg) saturate(0.8) brightness(0.85);', skip: ['bench', 'waterCooler'],
          decor: [
            tf('artFrameC', 148, 8, { wall: true, label: 'painting', say: 'A night sky. The stars are neatly aligned.' }),
            tf('loungeChair', 104, 336, { label: 'lounge chair', say: 'Recline. The view is on the next floor.' }),
            tf('loungeChair', 196, 336, { label: 'lounge chair', say: 'A very sleepy chair. Not a stand-up chair.' }),
            tf('lamp', 296, 300, { label: 'floor lamp', say: 'A warm glow for a cool night.', glow: [tg(302, 302, 28, 20, 'warm')] }),
            tf('planterBox', 330, 352, { label: 'planter box', say: 'Night-blooming jasmine. Very dramatic.' })
          ] }
      }
    ]
  }
];
