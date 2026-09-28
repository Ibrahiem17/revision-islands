// Tower rooftops: roof furniture, the two roof crowds (roofPeopleA/B) and TOWER_ROOFS.
import { tf, tg } from './tower-helpers.js';
import { ROOF_DIALOGUE_A } from '../dialogue/roof-a.js';
import { ROOF_DIALOGUE_B } from '../dialogue/roof-b.js';

// ---- TOWER A roof crowd (14 adults). ids rfA_*: dialogue state lives in save.dialogueBag / save.talked under these ids. ----
export var ROOF_PROP_BOX = { cocktailPink: [42, 45, 21, 24], cocktailBlue: [42, 45, 21, 24], cocktailGold: [42, 45, 21, 24], wineGlass: [42, 45, 21, 24], beerBottle: [45, 45, 15, 24], mug: [42, 48, 21, 21], shaker: [45, 45, 15, 24] };

export function roofProp(spr, flip) { var b = ROOF_PROP_BOX[spr]; return { spr: spr, x: b[0], y: b[1], w: b[2], h: b[3], flip: !!flip }; }

export function rf(spr, x, y, label, say, o) { o = o || {}; o.label = label; o.say = say; return tf(spr, x, y, o); }

export function roofPeopleA() {
  var D = ROOF_DIALOGUE_A;
  function P(key, o) { o.id = 'rfA_' + key; o.scale = 0.9; o.pose = o.pose || 'stand'; o.dialogue = D[key]; return o; }
  return [
    // bartender behind the bar
    P('dex', { name: 'Dex Romano', hair: 'slick', hairColor: '#1c1416', skinColor: '#c98d5f', bodyColor: '#efe8d6', trimColor: '#8a7a62', accessory: 'bowtie', accColor: '#c9483b',
      expr: { idle: 'confident', talk: 'laugh', happy: 'flirty', react: 'smug' }, x: 292, y: 140, act: 'mix', prop: roofProp('shaker'), wander: { x: 268, y: 139, w: 48, h: 3 }, hit: [258, 118, 68, 66] }),
    // kissing couple at the parapet
    P('mara', { name: 'Mara Lindqvist', hair: 'long', hairColor: '#8a3b1e', skinColor: '#f3d0b0', bodyColor: '#8a5fd0', trimColor: '#5f3f9a', accessory: 'necklace', accColor: '#f4ecd8',
      expr: { idle: 'kiss', talk: 'embarrassed', happy: 'love', react: 'surprised' }, x: 444, y: 166, act: 'kiss', lean: 5 }),
    P('jonas', { name: 'Jonas Weber', hair: 'byte', hairColor: '#2a1f18', skinColor: '#e8b98a', bodyColor: '#2f4a7a', trimColor: '#1c2f52', accessory: 'tie', accColor: '#e0b83a',
      expr: { idle: 'kiss', talk: 'embarrassed', happy: 'love', react: 'surprised' }, x: 476, y: 166, act: 'kiss', lean: -5, flip: true }),
    // flirting at the bar
    P('lena', { name: 'Lena Okoro', hair: 'bob', hairColor: '#1b1416', skinColor: '#8a5a3a', bodyColor: '#e0457a', trimColor: '#a02c58', accessory: 'flower', accColor: '#ffd166',
      expr: { idle: 'flirty', talk: 'laugh', happy: 'love', react: 'surprised' }, x: 340, y: 206, act: 'flirt drink', lean: 3, prop: roofProp('cocktailPink') }),
    P('theo', { name: 'Theo Marchetti', hair: 'curly', hairColor: '#3a2414', skinColor: '#f0c9a0', bodyColor: '#2fa4a0', trimColor: '#1f6f6c', accessory: 'shades', accColor: '#23262e',
      expr: { idle: 'flirty', talk: 'laugh', happy: 'excited', react: 'embarrassed' }, x: 388, y: 206, act: 'flirt drink', lean: -3, flip: true, prop: roofProp('cocktailBlue') }),
    // stargazers by the telescope
    P('astrid', { name: 'Astrid Holm', hair: 'bun', hairColor: '#d9a441', skinColor: '#f6dcc0', bodyColor: '#3a4a8a', trimColor: '#242f5f', accessory: 'scarf', accColor: '#e0703a',
      expr: { idle: 'stargaze', talk: 'happy', happy: 'excited', react: 'curious' }, x: 546, y: 346, act: 'stargaze', lean: -2 }),
    P('kofi', { name: 'Kofi Mensah', hair: 'buzzcut', hairColor: '#171215', skinColor: '#6f4426', bodyColor: '#d8a03a', trimColor: '#a0761f', accessory: 'none', accColor: '#d8a03a',
      expr: { idle: 'stargaze', talk: 'excited', happy: 'happy', react: 'surprised' }, x: 508, y: 352, act: 'point', flip: true }),
    // three friends on the sofa
    P('ravi', { name: 'Ravi Nair', hair: 'byte', hairColor: '#171215', skinColor: '#b97a4e', bodyColor: '#c8443a', trimColor: '#8f2a24', accessory: 'none', accColor: '#c8443a',
      expr: { idle: 'laugh', talk: 'happy', happy: 'excited', react: 'confident' }, x: 62, y: 285, act: 'laughchat', prop: roofProp('beerBottle'), hit: [36, 258, 52, 76] }),
    P('noor', { name: 'Noor Haddad', hair: 'nova', hairColor: '#2a1a12', skinColor: '#d7a074', bodyColor: '#2f8fd0', trimColor: '#1f5f96', accessory: 'headband', accColor: '#ffd166',
      expr: { idle: 'happy', talk: 'laugh', happy: 'flirty', react: 'curious' }, x: 110, y: 285, act: 'chat drink', prop: roofProp('cocktailGold'), hit: [84, 258, 52, 76] }),
    P('ben', { name: 'Ben Achterberg', hair: 'sage', hairColor: '#8a4a1e', skinColor: '#f3d3b8', bodyColor: '#5a6f3a', trimColor: '#3f4f28', accessory: 'cap', accColor: '#e8b04a',
      expr: { idle: 'happy', talk: 'laugh', happy: 'excited', react: 'worried' }, x: 158, y: 285, act: 'laughchat', prop: roofProp('mug'), hit: [132, 258, 52, 76] }),
    // tipsy soloist at the ledge
    P('oli', { name: 'Oli Fairweather', hair: 'curly', hairColor: '#9a4a24', skinColor: '#f0c9a0', bodyColor: '#d8c060', trimColor: '#a08a30', accessory: 'tie', accColor: '#c9483b',
      expr: { idle: 'tipsy', talk: 'laugh', happy: 'excited', react: 'confused' }, x: 172, y: 166, act: 'tipsy', lean: -2, prop: roofProp('beerBottle'), wander: { x: 162, y: 164, w: 20, h: 5 } }),
    // slow dancers
    P('sam', { name: 'Sam Ortega', hair: 'slick', hairColor: '#241a16', skinColor: '#c98d5f', bodyColor: '#8391e0', trimColor: '#4a58b0', accessory: 'bowtie', accColor: '#ff7ab0',
      expr: { idle: 'love', talk: 'embarrassed', happy: 'kiss', react: 'surprised' }, x: 326, y: 352, act: 'dance', lean: 4 }),
    P('ivy', { name: 'Ivy Chen', hair: 'pigtails', hairColor: '#3a2414', skinColor: '#f0d0a8', bodyColor: '#e8a03a', trimColor: '#b07a20', accessory: 'none', accColor: '#e8a03a',
      expr: { idle: 'love', talk: 'embarrassed', happy: 'kiss', react: 'surprised' }, x: 380, y: 352, act: 'dance', lean: -4, flip: true }),
    // stargazing on the daybed with a glass of wine
    P('yara', { name: 'Yara Petrova', hair: 'bun', hairColor: '#c9c9d4', skinColor: '#e0b088', bodyColor: '#3f8f5c', trimColor: '#2a6640', accessory: 'scarf', accColor: '#e8a3b5',
      expr: { idle: 'stargaze', talk: 'calm', happy: 'happy', react: 'curious' }, x: 526, y: 408, act: 'stargaze drink', lean: -6, prop: roofProp('wineGlass'), hit: [496, 380, 60, 66] })
  ];
}

// ---- TOWER B roof crowd "Starlight Terrace" (14 adults). ids rfB_*. ----
export function roofPeopleB() {
  var D = ROOF_DIALOGUE_B;
  function P(key, o) { o.id = 'rfB_' + key; o.scale = 0.9; o.pose = o.pose || 'stand'; o.dialogue = D[key]; return o; }
  return [
    // hugging at the parapet, looking at the city lights
    P('hugo', { name: 'Hugo Castellan', hair: 'curly', hairColor: '#8c8c96', skinColor: '#e0b088', bodyColor: '#2f7f78', trimColor: '#1f5550', accessory: 'scarf', accColor: '#d9a441',
      expr: { idle: 'love', talk: 'embarrassed', happy: 'happy', react: 'surprised' }, x: 233, y: 168, act: 'hug', lean: 7 }),
    P('wren', { name: 'Wren Castellan', hair: 'bob', hairColor: '#9a4a24', skinColor: '#f0c9a0', bodyColor: '#d9a63a', trimColor: '#a07a1f', accessory: 'headband', accColor: '#c9483b',
      expr: { idle: 'love', talk: 'laugh', happy: 'kiss', react: 'surprised' }, x: 262, y: 169, act: 'hug', lean: -7, flip: true }),
    // kissing under the string lights
    P('elio', { name: 'Elio Marchetti', hair: 'nova', hairColor: '#231810', skinColor: '#d9a878', bodyColor: '#8a2f45', trimColor: '#5f1f30', accessory: 'bowtie', accColor: '#f4ecd8',
      expr: { idle: 'kiss', talk: 'embarrassed', happy: 'love', react: 'surprised' }, x: 340, y: 170, act: 'kiss', lean: 5 }),
    P('sasha', { name: 'Sasha Reyes', hair: 'long', hairColor: '#1d2040', skinColor: '#c98d5f', bodyColor: '#efe4c8', trimColor: '#a89870', accessory: 'flower', accColor: '#e8709a',
      expr: { idle: 'kiss', talk: 'embarrassed', happy: 'love', react: 'surprised' }, x: 374, y: 170, act: 'kiss', lean: -5, flip: true }),
    // poet at the parapet with a glass of wine
    P('ines', { name: 'Odalys Vaughn', hair: 'long', hairColor: '#4a3a52', skinColor: '#a5683f', bodyColor: '#3b3f8a', trimColor: '#252a5f', accessory: 'scarf', accColor: '#b48ad8',
      expr: { idle: 'stargaze', talk: 'happy', happy: 'excited', react: 'curious' }, x: 424, y: 168, act: 'stargaze drink', lean: -3, prop: roofProp('wineGlass'), wander: { x: 414, y: 167, w: 22, h: 3 } }),
    // wine tasting at the long table (they stand behind it)
    P('boris', { name: 'Boris Wolkow', hair: 'slick', hairColor: '#a3a3ae', skinColor: '#e8b98a', bodyColor: '#7a2a3a', trimColor: '#4f1a26', accessory: 'bowtie', accColor: '#d9b14a',
      expr: { idle: 'confident', talk: 'smug', happy: 'flirty', react: 'confused' }, x: 340, y: 252, act: 'drink', prop: roofProp('wineGlass'), hit: [310, 226, 60, 60] }),
    P('mirela', { name: 'Mirela Costa', hair: 'bun', hairColor: '#2a1a22', skinColor: '#f0d0a8', bodyColor: '#2c2f45', trimColor: '#161828', accessory: 'necklace', accColor: '#f4ecd8',
      expr: { idle: 'flirty', talk: 'laugh', happy: 'love', react: 'embarrassed' }, x: 402, y: 252, act: 'flirt drink', lean: -3, flip: true, prop: roofProp('wineGlass'), hit: [372, 226, 60, 60] }),
    // fire pit: the wine-sharing flirts on the back log, the storyteller and his listener on stumps
    P('nadia', { name: 'Nadia Okoye', hair: 'bun', hairColor: '#171215', skinColor: '#6f4426', bodyColor: '#1f8a5f', trimColor: '#145a3d', accessory: 'necklace', accColor: '#e0b83a',
      expr: { idle: 'flirty', talk: 'laugh', happy: 'love', react: 'embarrassed' }, x: 196, y: 316, act: 'flirt drink', lean: 3, prop: roofProp('wineGlass') }),
    P('petra', { name: 'Petra Lindgren', hair: 'long', hairColor: '#e2cf8f', skinColor: '#f6dcc0', bodyColor: '#7a3f8f', trimColor: '#522a62', accessory: 'flower', accColor: '#ffd166',
      expr: { idle: 'flirty', talk: 'happy', happy: 'love', react: 'surprised' }, x: 248, y: 316, act: 'flirt drink', lean: -3, flip: true, prop: roofProp('wineGlass') }),
    P('gus', { name: 'Gus Fennimore', hair: 'buzzcut', hairColor: '#e6e6ee', skinColor: '#d8a884', bodyColor: '#7a5a3a', trimColor: '#4f3a24', accessory: 'bowtie', accColor: '#c9483b',
      expr: { idle: 'happy', talk: 'excited', happy: 'laugh', react: 'smug' }, x: 138, y: 338, act: 'chat' }),
    P('fenn', { name: 'Fenn Ashdown', hair: 'slick', hairColor: '#b8843a', skinColor: '#f0c9a0', bodyColor: '#3f6f4a', trimColor: '#28492f', accessory: 'none', accColor: '#3f6f4a',
      expr: { idle: 'laugh', talk: 'happy', happy: 'excited', react: 'confused' }, x: 330, y: 350, act: 'laughchat', flip: true, prop: roofProp('beerBottle') }),
    // stargazers on the picnic blanket
    P('tariq', { name: 'Tariq Rahimi', hair: 'sage', hairColor: '#1b1416', skinColor: '#b97a4e', bodyColor: '#d9702f', trimColor: '#9a4a1a', accessory: 'cap', accColor: '#2f3a5a',
      expr: { idle: 'stargaze', talk: 'excited', happy: 'happy', react: 'curious' }, x: 492, y: 398, act: 'stargaze drink', lean: -2, prop: roofProp('mug') }),
    P('lucia', { name: 'Marisol Ferrer', hair: 'curly', hairColor: '#2a1a12', skinColor: '#d7a074', bodyColor: '#e0708a', trimColor: '#a04058', accessory: 'flower', accColor: '#ffd166',
      expr: { idle: 'stargaze', talk: 'excited', happy: 'happy', react: 'curious' }, x: 546, y: 400, act: 'point', flip: true }),
    // solo lounger
    P('kit', { name: 'Kit Marlowe', hair: 'sage', hairColor: '#3f8f9a', skinColor: '#d0a078', bodyColor: '#7a808f', trimColor: '#4f5462', accessory: 'headphones', accColor: '#23262e',
      expr: { idle: 'tipsy', talk: 'calm', happy: 'happy', react: 'confused' }, x: 64, y: 396, act: 'tipsy', lean: -3, prop: roofProp('beerBottle') })
  ];
}

export var TOWER_ROOFS = [
  /* ---------------- TOWER A: SKYLINE BAR (neon cocktail rooftop, cool blue / magenta) ---------------- */
  {
    heading: 'TOWER A · ROOF — SKYLINE BAR', subtitle: 'Neon, cocktails and a very large sky. Lift on the left, stairs on the right.',
    hint: 'Arrow keys / WASD to walk. Enter talks to people and looks at things. Walk into the lift or the stair door to go down. Esc goes back down.',
    theme: { skyTop: '#0a1032', skyBot: '#33419a', skyGlow: 'rgba(255,110,200,0.28)', sidewall: '#7d8299', floor: 'floorDeck', floorFilter: 'brightness(0.62) saturate(0.75) hue-rotate(-12deg)' },
    tint: 'night', stairX: 584, lights: [0, 168, 336, 504],
    sky: { seed: 4242, stars: 70, moon: { x: 430, y: 12 }, skyline: 'skylineNight', clouds: [{ x: 30, y: 26, w: 110, dur: 150, delay: 40 }, { x: 240, y: 60, w: 90, dur: 190, delay: 120 }, { x: 420, y: 30, w: 100, dur: 170, delay: 15 }] },
    glows: [tg(196, 92, 232, 120, 'pool-pink'), tg(262, 296, 168, 110, 'pool-violet'), tg(474, 176, 100, 130, 'pool-cyan'), tg(150, 314, 36, 60, 'pool-amber'), tg(590, 340, 36, 60, 'pool-amber'), tg(230, 12, 152, 40, 'neon')],
    furniture: [
      // back bar
      tf('backBarShelf', 214, 58, { z: 6 }),
      tf('neonSignA', 230, 12, { wall: true, z: 7 }),
      rf('barCounter', 190, 104, 'bar counter', 'Menu: Sky-High Spritz, Kernel Panic Martini, and tap water for the brave.', { foot: 34 }),
      rf('barStool', 214, 184, 'bar stool', 'A tall stool with a very good view of the bartender.'),
      rf('barStool', 326, 184, 'bar stool', 'The cushion is still warm. Someone left in a hurry, or in love.'),
      // sofa corner
      tf('sofa', 22, 236, 176, 81, { z: 262, front: 38, zf: 300, solid: [26, 242, 168, 76], label: 'sofa', say: 'A velvet sofa the colour of a sunset. Not for sleeping. Mostly not.' }),
      rf('coffeetable', 50, 336, 'low table', 'Three empty glasses, a bowl of olives and a very optimistic coaster.'),
      // dance floor + speakers
      tf('danceFloor', 268, 300, { z: 1, glow: [tg(268, 300, 152, 88, 'disco')] }),
      rf('speaker', 210, 296, 'speaker', 'Bass you can feel in your fillings. Currently playing: slow jazz for fast hearts.'),
      rf('speaker', 424, 296, 'speaker', 'The other speaker. It has opinions about the first one.'),
      // telescope + sign
      rf('telescope', 474, 176, 'telescope', 'Aimed at the moon. The lens cap is in the bar, obviously.', { flip: true, foot: 26 }),
      // lounge bits
      rf('cocktailTable', 232, 392, 'cocktail table', 'A tall table with a candle. The candle is doing its best.'),
      rf('cocktailTable', 430, 396, 'cocktail table', 'Two straws in one glass. That is a message.'),
      tf('daybed', 488, 372, { z: 390, front: 26, zf: 410, solid: [492, 388, 88, 52], label: 'daybed', say: 'A magenta daybed. The best seat in the house for looking straight up.' }),
      rf('heaterLamp', 150, 330, 'patio heater', 'Warm orange, like a small friendly sun on a stick.', { foot: 14 }),
      rf('heaterLamp', 584, 340, 'patio heater', 'It hums a little tune. Somewhere between a fridge and a choir.', { foot: 14 }),
      rf('planterBox', 26, 396, 'planter', 'Lavender. It is supposed to calm people down. Mostly it just smells nice.', { foot: 16 })
    ],
    fx: [
      { kind: 'hearts', x: 472, y: 98, n: 4, z: 990 }, { kind: 'hearts', x: 352, y: 284, n: 3, z: 990 },
      { kind: 'sparkle', x: 366, y: 140, n: 4, z: 990 },
      { kind: 'speech', x: 66, y: 196, n: 1, z: 990 }, { kind: 'speech', x: 158, y: 198, n: 1, delay: 1.9, z: 990 },
      { kind: 'notes', x: 238, y: 282, n: 3, z: 990 }, { kind: 'notes', x: 452, y: 282, n: 3, z: 990 },
      { kind: 'shoot', x: 230, y: 6, z: 990 }
    ],
    people: function () { return roofPeopleA(); }
  },
  /* ---------------- TOWER B: STARLIGHT TERRACE (quiet romantic garden terrace: teal-indigo night, amber string lights, fire pit) ---------------- */
  {
    heading: 'TOWER B · ROOF — STARLIGHT TERRACE', subtitle: 'Fairy lights, a fire pit and a very good view. Lift on the left, stairs on the right.',
    hint: 'Arrow keys / WASD to walk. Enter talks to people and looks at things. Walk into the lift or the stair door to go down. Esc goes back down.',
    theme: { skyTop: '#06182a', skyBot: '#1d5566', skyGlow: 'rgba(255,170,90,0.24)', sidewall: '#8d8794', floor: 'floorDeck', floorFilter: 'brightness(0.74) sepia(0.42) saturate(1.1) hue-rotate(-16deg)' },
    tint: 'nightteal', stairX: 584, lights: [0, 168, 336, 504],
    sky: { seed: 1717, stars: 96, moon: { x: 462, y: 2, css: 'filter:sepia(0.5) saturate(1.5) brightness(1.02);' }, skyline: 'skylineWarm', clouds: [{ x: 60, y: 30, w: 96, dur: 210, delay: 90 }, { x: 420, y: 22, w: 84, dur: 170, delay: 30 }] },
    glows: [tg(126, 292, 214, 128, 'pool-fire'), tg(14, 262, 60, 56, 'pool-amber'), tg(268, 214, 200, 60, 'pool-amber'), tg(440, 396, 36, 30, 'pool-amber'), tg(570, 402, 36, 30, 'pool-amber'),
      tg(150, 44, 36, 54, 'pool-amber'), tg(298, 44, 36, 54, 'pool-amber'), tg(446, 44, 36, 54, 'pool-amber')],
    furniture: [
      // trellises with fairy lights and ivy + lantern posts along the parapet
      tf('trellisLights', 176, 46, { wall: true, z: 6, glow: [tg(190, 52, 5, 6, 'twy'), tg(214, 54, 5, 6, 'twp', '0.6'), tg(242, 52, 5, 6, 'twy', '1.1'), tg(266, 55, 5, 6, 'twb', '0.3'), tg(286, 52, 5, 6, 'twy', '1.6')] }),
      tf('trellisLights', 320, 46, { wall: true, z: 6, glow: [tg(334, 52, 5, 6, 'twp', '0.4'), tg(358, 54, 5, 6, 'twy', '0.9'), tg(386, 52, 5, 6, 'twb'), tg(410, 55, 5, 6, 'twy', '1.4'), tg(430, 52, 5, 6, 'twp', '0.7')] }),
      tf('lanternPost', 152, 58, { wall: true, z: 6 }), tf('lanternPost', 300, 58, { wall: true, z: 6 }), tf('lanternPost', 450, 58, { wall: true, z: 6 }),
      rf('plantFern', 476, 100, 'fern', 'A fern with ambitions. It has already climbed the ledge and is looking at the view.', { wall: true, z: 6 }),
      // fire pit circle
      tf('logBench', 164, 296, { foot: 12, z: 324, label: 'log bench', say: 'A sawn log worn smooth by a thousand cosy evenings. Splinter-free, mostly.' }),
      rf('firePit', 168, 318, 'fire pit', 'Crackling. Somebody keeps feeding it small logs and big stories.', { foot: 24, z: 383, glow: [tg(206, 318, 44, 36, 'flame'), tg(214, 336, 28, 22, 'flame', '0.35')] }),
      rf('stump', 110, 318, 'stump', 'A stump with a cushion-shaped dent. It has heard this story before.', { foot: 12, z: 300, front: 26, zf: 372 }),
      rf('stump', 302, 330, 'stump', 'A tree stump, retired from forestry and now in hospitality.', { foot: 12, z: 300, front: 26, zf: 384 }),
      tf('logBench', 172, 386, { foot: 12, z: 424, label: 'log bench', say: 'A front-row seat for the fire. Bring a jumper and an anecdote.' }),
      // wine tasting table
      rf('tastingTable', 276, 214, 'tasting table', 'Six wines, one candle and a cheese board with strong opinions. The label says: sip, do not gulp.', { foot: 36, z: 278, glow: [tg(300, 214, 30, 34, 'pool-amber'), tg(420, 224, 26, 28, 'pool-amber')] }),
      // picnic blanket for stargazers
      tf('blanket', 452, 374, { z: 2 }),
      tf('cushion', 458, 398, { z: 420 }), tf('cushion', 512, 402, { z: 424 }),
      rf('speaker', 392, 336, 'speaker', 'Soft guitar, turned low. Somebody chose the playlist very, very carefully.', { foot: 16 }),
      rf('telescope', 452, 172, 'telescope', 'Pointed at a smudge that Tariq swears is a galaxy. It might be a fingerprint.', { flip: true, foot: 26 }),
      // corners: lounger, heater, candles, planters
      rf('loungerB', 22, 364, 'double lounger', 'A double lounger with a plaid throw. Room for two, or one very thoughtful person.', { foot: 20, z: 380, front: 24, zf: 440 }),
      rf('heaterLamp', 20, 204, 'patio heater', 'A gentle amber hum. It has warmed more hands tonight than any handshake.', { foot: 14 }),
      rf('candle', 446, 408, 'candle', 'A little flame in a jar. The wind keeps trying to blow it out and losing.', { foot: 10, z: 430 }),
      rf('candle', 590, 414, 'candle', 'A candle on the deck. It is the smallest star on the terrace.', { foot: 10, z: 434 }),
      rf('plantFern', 572, 232, 'fern', 'A potted fern that has never been to a forest and behaves like it has.', { foot: 14 })
    ],
    fx: [
      { kind: 'hearts', x: 356, y: 98, n: 4, z: 990 }, { kind: 'hearts', x: 244, y: 96, n: 3, z: 990 },
      { kind: 'sparkle', x: 222, y: 252, n: 4, z: 990 },
      { kind: 'embers', x: 232, y: 318, n: 6, z: 990 },
      { kind: 'speech', x: 132, y: 262, n: 1, z: 990 }, { kind: 'speech', x: 324, y: 272, n: 1, delay: 1.9, z: 990 },
      { kind: 'notes', x: 424, y: 326, n: 3, z: 990 },
      { kind: 'shoot', x: 360, y: 10, z: 990 }
    ],
    people: function () { return roofPeopleB(); }
  }
];

