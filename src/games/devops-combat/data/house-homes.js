// House homes: residents, rooms and furniture layouts.

export var HOUSE_HOMES = [
  // ---------- Home 1: Patel — Movie Night ----------
  {
    name: 'Patel', sign: 'Patel home', heading: 'PATEL HOME — MOVIE NIGHT',
    subtitle: 'Popcorn is out and the film has started. Walk to the door mat to head back out.',
    theme: { wall: '#f0c59a', wall2: '#e8b98a', wainscot: '#a8562f', wainscotBorder: '#7a3a1c', sidewall: '#6b3a1f' },
    furniture: [
      { spr: 'rug', x: 122, y: 214, w: 176, h: 104, z: 1 },
      { spr: 'mat', x: 272, y: 414, w: 96, h: 32, z: 1 },
      { spr: 'window', x: 304, y: 24, w: 104, h: 96, z: 2, hit: [304, 150, 104, 10], label: 'window', say: 'Dusk out there. The perfect uptime for a film.' },
      { spr: 'posterMountain', x: 46, y: 28, w: 56, h: 72, z: 2, hit: [40, 150, 70, 10], label: 'poster', say: 'A mountain. Nobody has ever rolled back from the summit.' },
      { spr: 'posterRocket', x: 446, y: 26, w: 56, h: 72, z: 2, hit: [440, 150, 70, 10], label: 'poster', say: 'A rocket. Launched with zero downtime, allegedly.' },
      { spr: 'plant', x: 20, y: 114, w: 64, h: 64, solid: [32, 152, 40, 26], label: 'plant', say: 'It is thriving. Unlike the legacy service.' },
      { spr: 'tv', x: 142, y: 74, w: 136, h: 116, solid: [146, 150, 128, 40], label: 'TV', say: 'Streaming in glorious 4K. Buffering only during the plot twist.', glow: [166, 82, 88, 48] },
      { spr: 'counterSink', x: 424, y: 114, w: 64, h: 64, solid: [424, 150, 64, 28], label: 'sink', say: 'The kettle is on. The film is on pause. Never both.' },
      { spr: 'counterCabinet2', x: 488, y: 114, w: 64, h: 64, solid: [488, 150, 64, 28], label: 'cupboard', say: 'Mugs. Every one has a ticket number on it.' },
      { spr: 'fridge', x: 552, y: 40, w: 72, h: 144, solid: [554, 150, 68, 34], label: 'fridge', say: 'Leftover pizza. Untouched since the last deploy.' },
      { spr: 'coffeetable', x: 154, y: 228, w: 112, h: 64, solid: [158, 236, 104, 56], label: 'coffee table', say: 'Popcorn. Half eaten. The other half is in the sofa.' },
      { spr: 'popcorn', x: 182, y: 224, w: 56, h: 44, z: 293 },
      { spr: 'sofa', x: 110, y: 293, w: 200, h: 92, z: 300, front: 44, solid: [114, 298, 192, 86], label: 'sofa', say: 'Prime seats. Row 1 of 1.' },
      { spr: 'armchair', x: 18, y: 222, w: 88, h: 88, solid: [22, 230, 80, 80], label: 'armchair', say: 'Reserved for whoever is on call tonight.' },
      { spr: 'armchair', x: 314, y: 222, w: 88, h: 88, flip: true, solid: [318, 230, 80, 80] },
      { spr: 'lamp', x: 452, y: 196, w: 40, h: 112, solid: [454, 288, 36, 20], label: 'floor lamp', say: 'Mood lighting. Also a single point of failure.' },
      { spr: 'plant', x: 552, y: 292, w: 64, h: 64, solid: [564, 330, 40, 26], label: 'plant', say: 'Watered on a cron job. Which is sometimes skipped.' }
    ],
    residents: [
      { id: 'asha', name: 'Asha', hair: 'bun', hairColor: '#1b1416', skinColor: '#c98d5f', bodyColor: '#2fa4a0', trimColor: '#1f6f6c', accessory: 'none', accColor: '#2fa4a0',
        expr: { idle: 'happy', talk: 'happy', happy: 'excited', react: 'curious' }, x: 176, y: 349, scale: 0.9, pose: 'sit', back: true, act: 'tv', hit: [146, 298, 60, 86],
        lines: ["Shh, this is the bit where the server room catches fire.", "Never deploy on a Friday. Ever. I learned that the hard way.", "Vikram picked the film again. Cue the loading spinner of doom."] },
      { id: 'vikram', name: 'Vikram', hair: 'byte', hairColor: '#171215', skinColor: '#b97a4e', bodyColor: '#c8443a', trimColor: '#8f2a24', accessory: 'none', accColor: '#c8443a',
        expr: { idle: 'happy', talk: 'happy', happy: 'excited', react: 'curious' }, x: 244, y: 349, scale: 0.9, pose: 'sit', back: true, act: 'tv', hit: [214, 298, 60, 86],
        lines: ["It's not a bug, it's a plot twist.", "Pass the popcorn. It is stored in an unmonitored bowl.", "This is my third rewatch. Consider it regression testing."] }
    ],
    pets: [
      { id: 'marmalade', kind: 'cat', name: 'Marmalade', spr: 'catSleep', x: 330, y: 243, w: 56, h: 40, z: 312, act: 'sleep', hit: [318, 230, 80, 80],
        lines: ["Purr... (She is running in low-power mode.)", "Zzz. (Do not disturb: build in progress.)", "Mrrp. (She approves your merge request.)"] }
    ]
  },
  // ---------- Home 2: Okafor — Study House ----------
  {
    name: 'Okafor', sign: 'Okafor home', heading: 'OKAFOR HOME — STUDY HOUSE',
    subtitle: 'Shh, exams are coming. Walk to the door mat to head back out.',
    theme: { wall: '#cfe0f2', wall2: '#c2d6ec', wainscot: '#3f5f8a', wainscotBorder: '#2c4468', sidewall: '#3b4a63', floorFilter: 'saturate(0.7) brightness(0.93) hue-rotate(-12deg)' },
    furniture: [
      { spr: 'rug', x: 40, y: 246, w: 176, h: 104, z: 1, css: 'filter:hue-rotate(185deg);' },
      { spr: 'mat', x: 272, y: 414, w: 96, h: 32, z: 1 },
      { spr: 'bookshelf', x: 24, y: 58, w: 80, h: 128, solid: [26, 154, 76, 30], label: 'bookshelf', say: 'Every book here has a README. Nobody has read any of them.' },
      { spr: 'bookshelf', x: 108, y: 58, w: 80, h: 128, solid: [110, 154, 76, 30], label: 'bookshelf', say: 'Alphabetised by the day it was due back at the library.' },
      { spr: 'posterMountain', x: 208, y: 32, w: 56, h: 72, z: 2, hit: [200, 150, 72, 10], label: 'poster', say: 'A mountain. Studying is just climbing with more highlighters.' },
      { spr: 'window', x: 304, y: 24, w: 104, h: 96, z: 2, hit: [304, 150, 104, 10], label: 'window', say: 'Sunny. Outside is out of scope until after the exam.' },
      { spr: 'posterRocket', x: 428, y: 30, w: 56, h: 72, z: 2, hit: [420, 150, 72, 10], label: 'poster', say: 'Launch day! Cue frantic last-minute revision.' },
      { spr: 'plant', x: 488, y: 114, w: 64, h: 64, solid: [500, 152, 40, 26], label: 'plant', say: 'It survives on coffee fumes and good intentions.' },
      { spr: 'bookshelf', x: 546, y: 58, w: 80, h: 128, solid: [548, 154, 74, 30], label: 'bookshelf', say: 'The bottom shelf is all cookery. Nobody knows why.' },
      { spr: 'lamp', x: 20, y: 206, w: 40, h: 112, solid: [24, 296, 32, 22], label: 'floor lamp', say: 'Reading light. Brighter than the average status page.' },
      { spr: 'armchairF', x: 66, y: 250, w: 88, h: 96, z: 300, front: 56, solid: [68, 290, 84, 54], label: 'armchair', say: 'A very well-read armchair.' },
      { spr: 'dogbed', x: 288, y: 306, w: 72, h: 40, z: 1 },
      { spr: 'deskchair', x: 424, y: 274, w: 68, h: 40, z: 317 },
      { spr: 'desk', x: 372, y: 236, w: 144, h: 104, solid: [374, 268, 140, 70], label: 'desk', say: 'Notes, a lamp, and one laptop on 3% battery.' },
      { spr: 'plant', x: 550, y: 296, w: 64, h: 64, solid: [562, 334, 40, 26], label: 'plant', say: 'Photosynthesis: the original build pipeline.' }
    ],
    residents: [
      { id: 'chidi', name: 'Chidi', hair: 'buzzcut', hairColor: '#171215', skinColor: '#8a5a3a', bodyColor: '#3f6fb0', trimColor: '#2c4f86', accessory: 'headphones', accColor: '#3a3a44',
        expr: { idle: 'determined', talk: 'happy', happy: 'excited', react: 'tired' }, x: 458, y: 318, scale: 0.9, pose: 'sit', act: 'study', hit: [374, 268, 140, 70],
        lines: ["Shh, I'm in the flow. Git blame says it is mine.", "Revision tip: test your fixes before you say 'it works on my machine'.", "Ten minutes' break after every pomodoro. Yes, I have a cron job for it."] },
      { id: 'mrsokafor', name: 'Mrs. Okafor', hair: 'nova', hairColor: '#2a1a12', skinColor: '#7a4a30', bodyColor: '#8a5fb0', trimColor: '#5f3f80', accessory: 'scarf', accColor: '#e0b83a',
        expr: { idle: 'happy', talk: 'happy', happy: 'excited', react: 'curious' }, x: 110, y: 330, scale: 0.9, pose: 'sit', act: 'read', hit: [68, 290, 84, 54],
        lines: ["Good habits compound, like interest. Or like tech debt.", "Chidi has been on that laptop for hours. I hope he committed his work.", "Do sit down, dear. Yes, the sofa is also documented."] }
    ],
    pets: [
      { id: 'biscuit', kind: 'dog', name: 'Biscuit', spr: 'dogLie', x: 284, y: 288, w: 80, h: 40, act: 'wag', solid: [288, 308, 72, 22], hit: [288, 296, 76, 40],
        tail: { spr: 'dogTail', x: 76, y: 8, w: 24, h: 28 },
        lines: ["Woof! (He wants you to check his logs.)", "Woof woof. (Translation: walkies are overdue.)", "Bork! (He has found a memory leak in the biscuit tin.)"] }
    ]
  },
  // ==== PHASE2 HOMES BEGIN ====
  // ---------- Home 3: Tanaka — Kids Zone ----------
  {
    name: 'Tanaka', sign: 'Tanaka home', heading: 'TANAKA HOME — KIDS ZONE',
    subtitle: 'Mind the blocks! Walk to the door mat to head back out.',
    theme: { wall: '#f6e3a0', wall2: '#eed58c', wainscot: '#b07a48', wainscotBorder: '#7a4e26', sidewall: '#7a4e26', floor: 'floorKids' },
    furniture: [
      { spr: 'rugPlay', x: 110, y: 240, w: 176, h: 104, z: 1 },
      { spr: 'mat', x: 272, y: 414, w: 96, h: 32, z: 1 },
      { spr: 'bunting', x: 24, y: 4, w: 184, h: 44, z: 2 },
      { spr: 'bunting', x: 430, y: 4, w: 184, h: 44, z: 2 },
      { spr: 'window', x: 304, y: 24, w: 104, h: 96, z: 2, hit: [304, 150, 104, 10], label: 'window', say: 'Bright and sunny. Perfect weather for a block-tower deployment.' },
      { spr: 'posterRocket', x: 132, y: 52, w: 56, h: 72, z: 2, hit: [126, 150, 70, 10], label: 'poster', say: 'A rocket! Drawn by Mika. Mission status: crayon.' },
      { spr: 'toychest', x: 28, y: 124, w: 80, h: 56, solid: [28, 150, 80, 30], label: 'toy chest', say: 'Blocks, cars and one suspiciously sticky robot.' },
      { spr: 'bookshelf', x: 200, y: 58, w: 80, h: 128, solid: [202, 154, 76, 30], label: 'bookshelf', say: 'Picture books. Mostly pictures of things that crashed.' },
      { spr: 'sofa', x: 412, y: 100, w: 200, h: 92, z: 100, front: 44, solid: [414, 152, 192, 42], label: 'sofa', say: 'Somewhere under these cushions is a missing sock. And a build artifact.' },
      { spr: 'blocks', x: 146, y: 262, w: 68, h: 56, label: 'block tower', hit: [140, 300, 80, 30], say: 'A tower of blocks. Zero tests, zero regrets.' },
      { spr: 'blocksScatter', x: 206, y: 300, w: 120, h: 48, z: 3 },
      { spr: 'bigplant', x: 542, y: 238, w: 80, h: 128, solid: [554, 332, 56, 28], label: 'big plant', say: 'It has been watered four times today. By four different children.' },
      { spr: 'plantFern', x: 24, y: 214, w: 64, h: 64, solid: [36, 250, 40, 26], label: 'plant', say: 'A fern. Lightly chewed by the cat.' }
    ],
    residents: [
      { id: 'kai', name: 'Kai', hair: 'buzzcut', hairColor: '#171215', skinColor: '#e8b98a', bodyColor: '#e0503a', trimColor: '#a3302a', accessory: 'none', accColor: '#e0503a',
        expr: { idle: 'excited', talk: 'happy', happy: 'excited', react: 'curious' }, x: 160, y: 314, scale: 0.62, pose: 'stand', act: 'play', wander: { x: 130, y: 296, w: 70, h: 38 },
        lines: ["I'm deploying this block tower to production!", "It's not falling over. It's a rolling release.", "Mika says my tower has no tests. I say it has ... gravity."] },
      { id: 'mika', name: 'Mika', hair: 'pigtails', hairColor: '#2a1a12', skinColor: '#f0c9a0', bodyColor: '#e8709a', trimColor: '#b04a70', accessory: 'none', accColor: '#e8709a',
        expr: { idle: 'happy', talk: 'happy', happy: 'excited', react: 'curious' }, x: 236, y: 316, scale: 0.62, pose: 'stand', act: 'play', wander: { x: 200, y: 296, w: 70, h: 38 },
        lines: ["Kai knocked the tower over. That's a hotfix, right?", "The rainbow rug is my staging environment.", "Want to play? You can be the load balancer."] },
      { id: 'hiro', name: 'Hiro', hair: 'byte', hairColor: '#171215', skinColor: '#e8b98a', bodyColor: '#3f8f5c', trimColor: '#2a6640', accessory: 'book', accColor: '#f0d060',
        expr: { idle: 'happy', talk: 'happy', happy: 'excited', react: 'tired' }, x: 512, y: 156, scale: 0.9, pose: 'sit', act: 'read', hit: [480, 152, 64, 42],
        lines: ["Shh, I'm reading. Well. Pretending to, while I watch the kids.", "Rule one of parenting: keep a backup of everything. Especially bedtimes.", "Those two run like a pair of parallel jobs. Never on time."] }
    ],
    pets: [
      { id: 'pebble', kind: 'cat', name: 'Pebble', spr: 'catGreySit', x: 366, y: 204, w: 40, h: 56, z: 262, act: 'breathe', solid: [370, 244, 32, 14], hit: [362, 236, 48, 26],
        lines: ["Mrrp. (She is monitoring the couch. Nothing gets past her.)", "Purr. (Uptime: nine lives.)", "Meow. (She wants a treat. Priority: critical.)"] }
    ]
  },
  // ---------- Home 4: Nana Rosa's Cottage ----------
  {
    name: 'Nana Rosa', sign: 'Nana Rosa home', heading: "NANA ROSA'S COTTAGE",
    subtitle: 'The kettle is on. Walk to the door mat to head back out.',
    theme: { wall: '#cfe6c0', wall2: '#c2ddb2', wainscot: '#6f9a5a', wainscotBorder: '#4a6e3a', sidewall: '#4a6e3a', floor: 'floorWood' },
    furniture: [
      { spr: 'rug', x: 200, y: 232, w: 176, h: 104, z: 1, css: 'filter:hue-rotate(300deg) saturate(0.8);' },
      { spr: 'mat', x: 272, y: 414, w: 96, h: 32, z: 1 },
      { spr: 'plantFlower', x: 20, y: 114, w: 64, h: 64, solid: [32, 152, 40, 26], label: 'flowers', say: 'Geraniums. Nana talks to them. They never talk back. Unlike Slack.' },
      { spr: 'bigplant', x: 96, y: 50, w: 80, h: 128, solid: [108, 154, 56, 26], label: 'big plant', say: 'Older than the codebase. And better documented.' },
      { spr: 'photoshelf', x: 194, y: 66, w: 104, h: 64, z: 2, hit: [190, 150, 100, 10], label: 'photo shelf', say: 'Photos of the whole family. Nobody is wearing the same shirt twice. Unlike CI logs.' },
      { spr: 'window', x: 304, y: 24, w: 104, h: 96, z: 2, hit: [304, 150, 104, 10], label: 'window', say: 'A garden full of tomatoes. All running in production.' },
      { spr: 'plantSill', x: 332, y: 76, w: 48, h: 48, z: 3 },
      { spr: 'plantFern', x: 420, y: 114, w: 64, h: 64, solid: [432, 152, 40, 26], label: 'fern', say: 'A fern. Low maintenance. Nothing like a legacy service.' },
      { spr: 'plantHang', x: 490, y: 30, w: 56, h: 96, z: 2, hit: [486, 150, 64, 10], label: 'hanging plant', say: 'Hung with love and a bit of string. Not unlike our old deploy scripts.' },
      { spr: 'bookshelf', x: 546, y: 58, w: 80, h: 128, solid: [548, 154, 74, 30], label: 'bookshelf', say: 'Knitting patterns, recipes and a very thick book on gardening.' },
      { spr: 'plantFern', x: 22, y: 232, w: 64, h: 64, solid: [34, 268, 40, 26], label: 'fern', say: 'Nana repots this every spring. Scheduled maintenance.' },
      { spr: 'cushion', x: 150, y: 322, w: 72, h: 32, z: 3 },
      { spr: 'rockingchair', x: 250, y: 248, w: 96, h: 104, z: 300, front: 60, solid: [256, 300, 84, 50], label: 'rocking chair', say: 'It rocks at a steady 0.5 Hz. A very stable service.' },
      { spr: 'teatable', x: 358, y: 292, w: 64, h: 64, solid: [362, 322, 56, 30], label: 'tea table', say: 'A steaming mug of tea. Cold for the past hour. Nana forgot again.' },
      { spr: 'yarn', x: 226, y: 358, w: 36, h: 32, z: 4 },
      { spr: 'bigplant', x: 542, y: 238, w: 80, h: 128, solid: [554, 332, 56, 28], label: 'big plant', say: 'Jungle corner. Do not enter without a machete or a merge request.' },
      { spr: 'plantFlower', x: 44, y: 336, w: 64, h: 64, solid: [56, 372, 40, 26], label: 'flowers', say: 'Cheerful. Somebody is definitely getting a hug.' }
    ],
    residents: [
      { id: 'nanarosa', name: 'Nana Rosa', hair: 'bun', hairColor: '#d6d6dc', skinColor: '#e8b98a', bodyColor: '#8a5fb0', trimColor: '#5f3f80', accessory: 'scarf', accColor: '#e8a3b5',
        expr: { idle: 'happy', talk: 'happy', happy: 'excited', react: 'curious' }, x: 298, y: 320, scale: 0.9, pose: 'sit', act: 'knit', hit: [276, 310, 44, 40],
        lines: ["Back in my day we deployed by carrier pigeon.", "Knit one, purl one, and always keep a backup of the pattern.", "Sit down, dear. Slow and steady wins the release."] }
    ],
    pets: [
      { id: 'ginger', kind: 'cat', name: 'Ginger', spr: 'catSleep', x: 158, y: 302, w: 56, h: 40, z: 346, act: 'sleep', solid: [156, 322, 60, 26], hit: [150, 310, 76, 44],
        lines: ["Purr... (Ginger is asleep. Do not restart her.)", "Zzz. (She has been idle for 18 hours. Very efficient.)", "Mrrp. (She loves Nana's lap. And yours, apparently.)"] }
    ]
  },
  // ---------- Home 5: Lindqvist — Gamers ----------
  {
    name: 'Lindqvist', sign: 'Lindqvist home', heading: 'LINDQVIST HOME — GAMERS',
    subtitle: 'Player two has joined the lobby. Walk to the door mat to head back out.',
    theme: { wall: '#4a3f78', wall2: '#41376b', wainscot: '#2c2450', wainscotBorder: '#1c1738', sidewall: '#1c1738', floor: 'floorCarpet', floorFilter: 'brightness(0.95)' },
    furniture: [
      { spr: 'rug', x: 176, y: 254, w: 176, h: 104, z: 1, css: 'filter:hue-rotate(250deg) saturate(1.1) brightness(0.75);' },
      { spr: 'mat', x: 272, y: 414, w: 96, h: 32, z: 1 },
      { spr: 'bookshelf', x: 24, y: 58, w: 80, h: 128, solid: [26, 154, 76, 30], label: 'game shelf', say: 'Every game is 100% completed. Every backlog is 0% completed.' },
      { spr: 'posterInvader', x: 124, y: 42, w: 56, h: 72, z: 2, hit: [118, 150, 70, 10], label: 'poster', say: 'Space invaders. The original stress test for a load balancer.' },
      { spr: 'neonGame', x: 240, y: 26, w: 160, h: 44, z: 2 },
      { spr: 'speaker', x: 192, y: 104, w: 56, h: 80, solid: [194, 154, 52, 30], label: 'speaker', say: 'Bass so heavy it triggers the smoke detector every Friday.' },
      { spr: 'tv', x: 252, y: 74, w: 136, h: 116, solid: [256, 150, 128, 40], label: 'TV', say: 'GAME ON, says the neon sign. Level 7: the boss has 99 problems and every one is a merge conflict.', glow: [276, 82, 88, 48, 'game'] },
      { spr: 'speaker', x: 392, y: 104, w: 56, h: 80, solid: [394, 154, 52, 30], label: 'speaker', say: 'The left speaker was jealous, so this one is louder.' },
      { spr: 'posterRocket', x: 470, y: 40, w: 56, h: 72, z: 2, hit: [464, 150, 70, 10], label: 'poster', say: 'A rocket. Every speedrun starts with a clean build.' },
      { spr: 'plantFern', x: 548, y: 114, w: 64, h: 64, solid: [560, 152, 40, 26], label: 'plant', say: 'The only member of the household that never lags.' },
      { spr: 'controller', x: 294, y: 312, w: 40, h: 28, z: 3 },
      { spr: 'controller', x: 306, y: 346, w: 40, h: 28, z: 3 },
      { spr: 'beanbag', x: 186, y: 262, w: 96, h: 64, z: 250, front: 22, solid: [190, 300, 88, 26], label: 'bean bag', say: 'A very well-tested bean bag. Zero memory leaks. Some filling leaks.' },
      { spr: 'sofa', x: 340, y: 262, w: 200, h: 92, z: 300, front: 44, css: 'filter:hue-rotate(250deg) saturate(0.8);', solid: [344, 300, 192, 54], label: 'sofa', say: 'Player-two seat. Pizza-stained, battle-tested.' },
      { spr: 'dogbed', x: 54, y: 314, w: 72, h: 40, z: 1 },
      { spr: 'beanbagG', x: 520, y: 336, w: 96, h: 64, solid: [524, 366, 88, 34], label: 'spare bean bag', say: 'Reserved for a friend who has promised to come over since 2019.' }
    ],
    residents: [
      { id: 'elias', name: 'Elias', hair: 'byte', hairColor: '#d9b040', skinColor: '#f0c9a0', bodyColor: '#3fa08a', trimColor: '#26705f', accessory: 'headphones', accColor: '#ff7ae0',
        expr: { idle: 'excited', talk: 'happy', happy: 'excited', react: 'curious' }, x: 234, y: 304, scale: 0.9, pose: 'sit', back: true, act: 'game', hit: [214, 296, 40, 34],
        lines: ["Do not pause. I am in a rolling release. Of loot.", "One more level, then I'll do my homework. Definitely.", "The boss has 99 problems and lag is all of them."] },
      { id: 'freja', name: 'Freja', hair: 'pigtails', hairColor: '#7a3c2a', skinColor: '#f0c9a0', bodyColor: '#e8709a', trimColor: '#b04a70', accessory: 'none', accColor: '#e8709a',
        expr: { idle: 'curious', talk: 'happy', happy: 'excited', react: 'curious' }, x: 440, y: 318, scale: 0.9, pose: 'sit', back: true, act: 'tv', hit: [420, 300, 40, 54],
        lines: ["Elias, you are not the main character. I am the reviewer.", "My job is to shout suggestions. Like a code review, but louder.", "Player two is still waiting on the controller. Merge request pending."] }
    ],
    pets: [
      { id: 'pixel', kind: 'dog', name: 'Pixel', spr: 'dogSpottedLie', x: 50, y: 296, w: 80, h: 40, act: 'wag', solid: [54, 316, 72, 22], hit: [54, 304, 76, 40],
        tail: { spr: 'dogSpottedTail', x: 76, y: 8, w: 24, h: 28 },
        lines: ["Woof. (He is sleeping through the boss fight. Respect.)", "Snore. (Zero packet loss. Full rest.)", "Bork! (He wants the last controller for himself.)"] }
    ]
  },
  // ---------- Home 6: Marco's Kitchen ----------
  {
    name: 'Marco', sign: 'Marco home', heading: "MARCO'S KITCHEN",
    subtitle: 'Something smells delicious. Walk to the door mat to head back out.',
    theme: { wall: '#f2e6d4', wall2: '#e8dac4', wainscot: '#b03a2e', wainscotBorder: '#7a2018', sidewall: '#7a2018', floor: 'floorChecker' },
    furniture: [
      { spr: 'mat', x: 272, y: 414, w: 96, h: 32, z: 1 },
      { spr: 'fridge', x: 24, y: 40, w: 72, h: 144, solid: [26, 150, 68, 34], label: 'fridge', say: 'Twelve cheeses. Zero vegetables. Definitely a balanced pipeline.' },
      { spr: 'counterCabinet2', x: 96, y: 114, w: 64, h: 64, solid: [96, 150, 64, 28], label: 'cupboard', say: 'Pasta in every shape. Sorted by deployment stage.' },
      { spr: 'counterSink', x: 160, y: 114, w: 64, h: 64, solid: [160, 150, 64, 28], label: 'sink', say: 'Only two dishes left. The dishwasher is on retry.' },
      { spr: 'rangehood', x: 220, y: 20, w: 72, h: 64, z: 2 },
      { spr: 'stove', x: 224, y: 90, w: 64, h: 88, z: 178, solid: [224, 150, 64, 28], label: 'stove', say: 'A pot of sauce. Simmering at a steady 200 OK.' },
      { spr: 'counterCabinet2', x: 288, y: 114, w: 64, h: 64, solid: [288, 150, 64, 28], label: 'cupboard', say: 'Herbs, spices and one jar labelled "secret". It is oregano.' },
      { spr: 'counterCabinet2', x: 352, y: 114, w: 64, h: 64, solid: [352, 150, 64, 28], label: 'cupboard', say: 'Never serve to prod before tasting in staging.' },
      { spr: 'window', x: 436, y: 24, w: 104, h: 96, z: 2, hit: [436, 150, 104, 10], label: 'window', say: 'A sunny street outside. Deliveries all arrived on time.' },
      { spr: 'plantSill', x: 464, y: 76, w: 48, h: 48, z: 3 },
      { spr: 'bookshelf', x: 546, y: 58, w: 80, h: 128, solid: [548, 154, 74, 30], label: 'cookbooks', say: 'Two hundred cookbooks. Marco only follows the one from his mother.' },
      { spr: 'stool', x: 300, y: 196, w: 48, h: 56, z: 200, solid: [304, 226, 40, 24], label: 'stool', say: 'A step for small chefs. Lucia has taken it over.' },
      { spr: 'diningtable', x: 380, y: 250, w: 136, h: 80, solid: [384, 290, 128, 40], label: 'dining table', say: 'The table is set for four. Somebody always eats standing up.' },
      { spr: 'chair', x: 332, y: 270, w: 48, h: 72, solid: [338, 308, 36, 34], label: 'chair', say: 'A very sturdy chair. Approved by the on-call kitchen inspector.' },
      { spr: 'chair', x: 516, y: 270, w: 48, h: 72, flip: true, solid: [522, 308, 36, 34], label: 'chair', say: 'This chair has heard every story about the pasta of 2014.' },
      { spr: 'plant', x: 24, y: 250, w: 64, h: 64, solid: [36, 288, 40, 26], label: 'plant', say: 'Basil. Dying of love, mostly.' }
    ],
    residents: [
      { id: 'marco', name: 'Marco', hair: 'buzzcut', hairColor: '#171215', skinColor: '#c98d5f', bodyColor: '#f8f1e2', trimColor: '#9c7a52', accessory: 'chefhat', accColor: '#ffffff',
        expr: { idle: 'happy', talk: 'happy', happy: 'excited', react: 'curious' }, x: 200, y: 236, scale: 0.9, pose: 'stand', act: 'cook',
        lines: ["Never serve to prod before tasting in staging.", "A good sauce, like a good pipeline, is never rushed.", "Two rules: stir constantly, and always keep a rollback dish."] },
      { id: 'lucia', name: 'Lucia', hair: 'pigtails', hairColor: '#3a2414', skinColor: '#c98d5f', bodyColor: '#f0c440', trimColor: '#b08a20', accessory: 'apron', accColor: '#c0392b',
        expr: { idle: 'excited', talk: 'happy', happy: 'excited', react: 'curious' }, x: 324, y: 214, scale: 0.62, pose: 'stand', act: 'cook', hit: [304, 204, 40, 12],
        lines: ["I'm the sous-chef! I taste-test in production.", "Papa says stir left. I stir right. It's called A/B testing.", "I can see the whole kitchen from up here!"] }
    ],
    pets: [
      { id: 'brutus', kind: 'dog', name: 'Brutus', spr: 'dogSit', x: 440, y: 344, w: 70, h: 80, act: 'wag', solid: [446, 396, 58, 24], hit: [440, 380, 70, 44],
        tail: { spr: 'dogTail', x: 52, y: 44, w: 30, h: 35 },
        lines: ["Woof! (He has been begging for pasta since 1 PM.)", "Whine. (Translation: one small meatball, please.)", "Bork! (He would trade his bed for a sausage.)"] }
    ],
    fx: [{ kind: 'steam', x: 256, y: 96, n: 4, z: 990 }, { kind: 'steam', x: 448, y: 262, n: 2, z: 990 }]
  },
  // ---------- Home 7: Alvarez — Music Room ----------
  {
    name: 'Alvarez', sign: 'Alvarez home', heading: 'ALVAREZ HOME — MUSIC ROOM',
    subtitle: 'The band is warming up. Walk to the door mat to head back out.',
    theme: { wall: '#7fcfc6', wall2: '#6fbfb6', wainscot: '#2f7f7a', wainscotBorder: '#1f5754', sidewall: '#1f5754', floor: 'floorWoodDark' },
    furniture: [
      { spr: 'rug', x: 190, y: 290, w: 176, h: 104, z: 1, css: 'filter:hue-rotate(300deg);' },
      { spr: 'mat', x: 272, y: 414, w: 96, h: 32, z: 1 },
      { spr: 'guitar', x: 28, y: 74, w: 48, h: 112, solid: [28, 154, 44, 30], label: 'guitar', say: 'Three chords and the truth. Also a broken string.' },
      { spr: 'speaker', x: 96, y: 102, w: 56, h: 80, solid: [98, 154, 52, 30], label: 'speaker', say: 'Turned up to eleven. Load tested by the neighbours.' },
      { spr: 'posterNotes', x: 176, y: 40, w: 56, h: 72, z: 2, hit: [170, 150, 70, 10], label: 'poster', say: 'Sheet music. In 4/4, the same rhythm as a nightly build.' },
      { spr: 'window', x: 304, y: 24, w: 104, h: 96, z: 2, hit: [304, 150, 104, 10], label: 'window', say: 'The choir next door is in tune. A rare merge.' },
      { spr: 'posterVinyl', x: 434, y: 40, w: 56, h: 72, z: 2, hit: [428, 150, 70, 10], label: 'poster', say: 'A vinyl record. The original persistent storage.' },
      { spr: 'speaker', x: 494, y: 102, w: 56, h: 80, solid: [496, 154, 52, 30], label: 'speaker', say: 'The bass drives the whole pipeline. Literally the beat.' },
      { spr: 'bookshelf', x: 546, y: 58, w: 80, h: 128, solid: [548, 154, 74, 30], label: 'bookshelf', say: 'Songbooks alphabetised by key. Not by title. Chaos.' },
      { spr: 'piano', x: 176, y: 236, w: 144, h: 80, z: 150, front: 20, solid: [180, 262, 136, 54], label: 'keyboard', say: 'A keyboard with 61 keys and one loose C sharp.' },
      { spr: 'cushion', x: 350, y: 330, w: 72, h: 32, z: 3 },
      { spr: 'armchairF', x: 440, y: 236, w: 88, h: 96, z: 300, front: 56, solid: [442, 276, 84, 54], label: 'armchair', say: 'The front-row seat. Reserved for the loudest supporter.' },
      { spr: 'plant', x: 30, y: 214, w: 64, h: 64, solid: [42, 252, 40, 26], label: 'plant', say: 'It grows faster when there is music. Science, allegedly.' },
      { spr: 'plantFern', x: 552, y: 300, w: 64, h: 64, solid: [564, 338, 40, 26], label: 'fern', say: 'This fern has perfect pitch.' }
    ],
    residents: [
      { id: 'sofia', name: 'Sofia', hair: 'pigtails', hairColor: '#2a1a12', skinColor: '#d7a074', bodyColor: '#f0c440', trimColor: '#b08a20', accessory: 'headband', accColor: '#e8506a',
        expr: { idle: 'happy', talk: 'happy', happy: 'excited', react: 'curious' }, x: 248, y: 286, scale: 0.9, pose: 'sit', act: 'music', hit: [230, 262, 40, 54],
        lines: ["Keep the rhythm! A good pipeline is like a good beat: steady.", "This one is in the key of Deploy major.", "I practise every day. That's continuous integration, for musicians."] },
      { id: 'miguel', name: 'Miguel', hair: 'byte', hairColor: '#2a1a12', skinColor: '#c98d5f', bodyColor: '#6a7fa3', trimColor: '#4d6088', accessory: 'headphones', accColor: '#e8506a',
        expr: { idle: 'happy', talk: 'happy', happy: 'excited', react: 'curious' }, x: 484, y: 316, scale: 0.9, pose: 'sit', act: 'tv', hit: [466, 290, 36, 40],
        lines: ["Beautiful! That solo had zero downtime.", "My favourite gig: watching Sofia rehearse. Free tickets, of course.", "Turn it up a little. Then a little more. Then deploy."] }
    ],
    pets: [
      { id: 'luna', kind: 'cat', name: 'Luna', spr: 'catGreySleep', x: 358, y: 310, w: 56, h: 40, z: 348, act: 'sleep', solid: [356, 330, 60, 26], hit: [350, 318, 76, 44],
        lines: ["Purr... (Luna is asleep. She has heard this song 400 times.)", "Zzz. (Not even the drum solo bothers her.)", "Mrrp. (She votes for a quiet lullaby.)"] }
    ],
    fx: [{ kind: 'notes', x: 250, y: 238, n: 4, z: 995 }]
  },
  // ---------- Home 8: Dan's Home Office ----------
  {
    name: 'Dan', sign: 'Dan home', heading: "DAN'S HOME OFFICE",
    subtitle: 'On call, as always. Walk to the door mat to head back out.',
    theme: { wall: '#c9ced6', wall2: '#bcc2cc', wainscot: '#5b6473', wainscotBorder: '#3c4350', sidewall: '#3c4350', floor: 'floorGrey' },
    furniture: [
      { spr: 'rug', x: 240, y: 236, w: 176, h: 104, z: 1, css: 'filter:grayscale(1) brightness(1.05);' },
      { spr: 'mat', x: 272, y: 414, w: 96, h: 32, z: 1 },
      { spr: 'filecabinet', x: 24, y: 90, w: 64, h: 88, solid: [24, 154, 64, 26], label: 'filing cabinet', say: 'Incident reports. Sorted by pager volume.' },
      { spr: 'whiteboard', x: 100, y: 40, w: 128, h: 96, z: 2, hit: [96, 150, 140, 10], label: 'whiteboard', say: 'Commit, build, test, deploy. And a loop back when it fails. Which is always.' },
      { spr: 'pagerSign', x: 262, y: 20, w: 160, h: 44, z: 2, glow: [266, 24, 152, 36, 'alarm'] },
      { spr: 'deskDual', x: 244, y: 74, w: 192, h: 112, solid: [246, 152, 188, 34], label: 'desk', say: 'The ON CALL sign is lit. The coffee is on. Dan is not. Two monitors, seven open terminals.', glow: [[260, 82, 60, 36, 'mon'], [336, 82, 60, 36, 'mon', 1.1]] },
      { spr: 'window', x: 456, y: 24, w: 104, h: 96, z: 2, hit: [456, 150, 104, 10], label: 'window', say: 'The outside world. Rumoured to exist. Dan has not verified it.' },
      { spr: 'plantFern', x: 564, y: 114, w: 64, h: 64, solid: [574, 152, 40, 26], label: 'plant', say: 'Dan waters it during incidents. It has never been so hydrated.' },
      { spr: 'deskchair', x: 306, y: 230, w: 68, h: 40, solid: [312, 240, 56, 26] },
      { spr: 'bigplant', x: 24, y: 232, w: 80, h: 128, solid: [36, 326, 56, 26], label: 'big plant', say: 'The only thing in the office with a stable release cycle.' },
      { spr: 'lamp', x: 566, y: 200, w: 40, h: 112, solid: [568, 290, 36, 20], label: 'floor lamp', say: 'Bright enough for a 3 AM production incident.' },
      { spr: 'plantFlower', x: 500, y: 330, w: 64, h: 64, solid: [512, 366, 40, 26], label: 'flowers', say: 'A gift from the team. Because they never see him outside Zoom.' }
    ],
    residents: [
      { id: 'dan', name: 'Dan', hair: 'byte', hairColor: '#3a2414', skinColor: '#e8b98a', bodyColor: '#4a5a70', trimColor: '#2c3f6b', accessory: 'headphones', accColor: '#3a3a44',
        expr: { idle: 'determined', talk: 'happy', happy: 'excited', react: 'tired' }, x: 340, y: 252, scale: 0.9, pose: 'sit', back: true, act: 'study', hit: [300, 230, 80, 40],
        lines: ["If the pager goes off, I'm not here.", "It works on my machine. Which is also the office. And the kitchen.", "Two monitors: one for code, one for the incident. Guess which is busier."] }
    ],
    pets: [
      { id: 'cron', kind: 'dog', name: 'Cron', spr: 'dogBlackLie', x: 292, y: 262, w: 80, h: 40, z: 304, act: 'sleep', solid: [296, 282, 72, 22], hit: [292, 268, 80, 40],
        tail: { spr: 'dogBlackTail', x: 76, y: 8, w: 24, h: 28 },
        lines: ["Snore. (Cron runs at midnight. So does he, in his dreams.)", "Woof. (He sleeps through every alert. Not a good on-call dog.)", "Zzz. (Uptime: 99.9% asleep.)"] }
    ]
  },
  // ---------- Home 9: Ines' Painter's Studio ----------
  {
    name: 'Ines', sign: 'Ines home', heading: "INES' PAINTER'S STUDIO",
    subtitle: 'Mind the wet paint. Walk to the door mat to head back out.',
    theme: { wall: '#f4ead2', wall2: '#eadfc4', wainscot: '#d9c9a4', wainscotBorder: '#a8956a', sidewall: '#a8956a', floor: 'floorWhite' },
    furniture: [
      { spr: 'paintrug', x: 150, y: 290, w: 176, h: 104, z: 1 },
      { spr: 'mat', x: 272, y: 414, w: 96, h: 32, z: 1 },
      { spr: 'canvasstack', x: 32, y: 74, w: 96, h: 104, solid: [34, 154, 92, 26], label: 'canvases', say: 'Finished paintings waiting to be hung. Like a backlog, but prettier.' },
      { spr: 'photoshelf', x: 132, y: 60, w: 104, h: 64, z: 2, hit: [130, 150, 108, 10], label: 'shelf', say: 'Inspiration: photos, postcards and one fossilised brush.' },
      { spr: 'windowBig', x: 240, y: 20, w: 160, h: 120, z: 2, hit: [240, 150, 160, 10], label: 'big window', say: 'North light. The best release environment for a painting.' },
      { spr: 'plantSill', x: 262, y: 76, w: 48, h: 48, z: 3 },
      { spr: 'lightbeam', x: 254, y: 156, w: 144, h: 104, z: 2 },
      { spr: 'lightbeam', x: 330, y: 156, w: 144, h: 104, z: 2 },
      { spr: 'bookshelf', x: 546, y: 58, w: 80, h: 128, solid: [548, 154, 74, 30], label: 'art books', say: 'Monet, Klee and a very thick manual for a printer.' },
      { spr: 'easel', x: 430, y: 100, w: 112, h: 144, solid: [436, 226, 100, 20], label: 'easel', say: 'A colourful abstract. Reviewers say: "Interesting. Needs unit tests."' },
      { spr: 'paintpots', x: 300, y: 264, w: 104, h: 44, solid: [304, 282, 96, 24], label: 'paint pots', say: 'Red, blue and yellow. Every colour is a merge of three.' },
      { spr: 'stool', x: 352, y: 320, w: 48, h: 56, solid: [356, 350, 40, 24], label: 'stool', say: 'Splattered with every colour ever made.' },
      { spr: 'plantFern', x: 24, y: 214, w: 64, h: 64, solid: [36, 252, 40, 26], label: 'plant', say: 'A muse. Drinks a lot of water and turpentine. No, wait: only water.' },
      { spr: 'plantFlower', x: 552, y: 300, w: 64, h: 64, solid: [564, 338, 40, 26], label: 'flowers', say: 'Fresh sunflowers. Ines paints them. Then sniffs them. Then paints again.' }
    ],
    residents: [
      { id: 'ines', name: 'Ines', hair: 'bun', hairColor: '#8f2a24', skinColor: '#f0c9a0', bodyColor: '#f4ecd8', trimColor: '#b8ad98', accessory: 'headband', accColor: '#e8506a',
        expr: { idle: 'happy', talk: 'happy', happy: 'excited', react: 'curious' }, x: 424, y: 270, scale: 0.9, pose: 'stand', act: 'paint',
        lines: ["Every deploy is just a painting until someone hangs it in prod.", "Mix the colours slowly. Same as merging branches.", "A blank canvas is a fresh repo. Scary and exciting."] }
    ],
    pets: [
      { id: 'dot', kind: 'dog', name: 'Dot', spr: 'dogCreamSit', x: 250, y: 344, w: 42, h: 48, act: 'wag', solid: [252, 372, 36, 18], hit: [246, 358, 50, 36],
        tail: { spr: 'dogCreamTail', x: 36, y: 30, w: 18, h: 21 },
        lines: ["Woof. (She is watching the brush. Very focused.)", "Yip! (She has paint on her nose again.)", "Woof woof. (Translation: it needs more blue.)"] }
    ]
  }
  // ==== PHASE2 HOMES END ====
];

