// Tower furniture helpers: sprite sizes, footprints, tf()/tg()/rackGlows() builders.

export var TOWER_SPR_SIZE = {
  sofa: [200, 92], tv: [136, 116], armchair: [88, 88], fridge: [72, 144], windowBig: [160, 120], coffeetable: [112, 64], rug: [176, 104], mat: [96, 32], plant: [64, 64],
  counterSink: [64, 64], counterCabinet2: [64, 64], bookshelf: [80, 128], desk: [144, 104], deskchair: [68, 40], armchairF: [88, 96], popcorn: [56, 44],
  posterRocket: [56, 72], posterMountain: [56, 72], posterInvader: [56, 72], posterNotes: [56, 72], posterVinyl: [56, 72], lamp: [40, 112], bunting: [184, 44],
  teatable: [64, 64], photoshelf: [104, 64], bigplant: [80, 128], plantFern: [64, 64], plantFlower: [64, 64], plantSill: [48, 48], plantHang: [56, 96], cushion: [72, 32],
  beanbag: [96, 64], beanbagG: [96, 64], controller: [40, 28], neonGame: [160, 44], stove: [64, 88], rangehood: [72, 64], diningtable: [136, 80], chair: [48, 72], stool: [48, 56],
  piano: [144, 80], guitar: [48, 112], speaker: [56, 80], deskDual: [192, 112], whiteboard: [128, 96], pagerSign: [160, 44], filecabinet: [64, 88], easel: [112, 144],
  canvasstack: [96, 104], paintpots: [104, 44], lightbeam: [144, 104], waterCooler: [48, 88], bench: [112, 48], fireExt: [28, 48], wallLight: [40, 48], paintrug: [176, 104]
  ,
  coffeeCart: [88, 88], menuBoard: [80, 72], noticeBoard: [88, 56],
   lockers: [104, 112], bookCart: [72, 64], artFrameA: [56, 64],
   artFrameB: [56, 64], artFrameC: [56, 64], warningSign: [48, 48],
   mirror: [48, 88], statusBoard: [88, 56], trophyCase: [80, 104],
   cableTray: [112, 24], loungeChair: [80, 64], planterBox: [104, 48],
   railing: [128, 48], stringLights: [168, 32], onAirSign: [104, 40],
   cloud: [88, 32], skyline: [168, 64], serverRack: [56, 112],
   consoleDesk: [104, 64], monitorWall: [184, 80], controlDesk: [200, 64],
   conferenceTable: [184, 72], boardroomTable: [232, 72], longTable: [152, 64],
   prepTable: [104, 56], vendingMachine: [72, 112], coffeeMachine: [64, 64],
   foosball: [120, 56], podBooth: [104, 104], arcadeCabinet: [64, 112],
   projectorScreen: [152, 96], wallScreen: [168, 88], workbench: [168, 64],
   scope: [56, 56], partsShelf: [88, 104], toolBoard: [104, 80],
   robot: [48, 56], draftTable: [128, 64], moodBoard: [120, 80],
   cameraTripod: [56, 112], studioLight: [48, 112], greenScreen: [168, 104],
   micStand: [32, 96], mixDesk: [96, 48], executiveDesk: [152, 64],
   globe: [56, 72], barCabinet: [104, 80],
  tallShelf: [72, 128], shelfDense: [72, 128], ladder: [40, 128],
   cardCatalogue: [72, 88], carrel: [88, 88], quietSign: [96, 56],
   boxStack: [64, 56], studentDesk: [56, 64], chalkboard: [152, 88],
   teacherDesk: [120, 72], computerDesk: [96, 80], printer: [56, 56],
   lectureStage: [232, 56], lectern: [48, 72], seatRowBlue: [200, 56],
   seatRowRed: [200, 56], treadmill: [80, 104], dumbbellRack: [104, 72],
   weightBench: [104, 64], yogaBallB: [40, 40], yogaBallP: [40, 40],
   fan: [48, 88], yogaMatT: [72, 32], yogaMatP: [72, 32],
   yogaMatC: [72, 32], candle: [24, 32], lantern: [40, 64],
   saunaCabin: [144, 120], hotTub: [152, 72], towelStack: [40, 40],
   robeHook: [40, 80], fountain: [64, 80], zenStones: [56, 40],
   mirrorWide: [160, 80], drumKit: [112, 80], ampStack: [56, 80],
   guitarRed: [48, 104], keyboardStand: [96, 56], paintingD: [88, 64],
   paintingE: [64, 80], paintingF: [96, 56], paintingG: [56, 56],
   sculpture: [56, 96], ropeBarrier: [96, 48], galleryBench: [112, 48],
   stageCurtain: [312, 120], stageBoards: [248, 48], prompterDesk: [64, 56],
   propChest: [72, 56], roundTable: [72, 64], kitchenPass: [192, 104],
   barCounter: [232, 80], barStool: [40, 64], backBarShelf: [184, 80],
   neonBar: [88, 40], telescope: [96, 152], starMap: [104, 72],
   orrery: [72, 80], starryWindow: [152, 112],
  moon: [64, 64], skylineNight: [640, 96], skylineWarm: [640, 96],
   parapet: [160, 44], rooftopLiftHouse: [144, 152], stairDoor: [112, 152],
   neonSignA: [152, 40], neonSignB: [128, 64], heaterLamp: [48, 112],
   cocktailTable: [48, 88], daybed: [96, 72], danceFloor: [152, 88],
   cocktailPink: [28, 32], cocktailBlue: [28, 32], cocktailGold: [28, 32],
   wineGlass: [28, 32], beerBottle: [20, 32], mug: [28, 28],
   shaker: [20, 32],
   firePit: [128, 64], logBench: [104, 36],
    stump: [56, 48], tastingTable: [184, 64],
    blanket: [144, 44], loungerB: [104, 68],
    trellisLights: [128, 104], lanternPost: [32, 96]
};

// footprint depth (px above the sprite's bottom edge) that blocks the hero, for deep pieces such as tables and desks (default 14)
export var TOWER_FOOT = { conferenceTable: 60, boardroomTable: 60, longTable: 44, prepTable: 40, workbench: 48, draftTable: 44, executiveDesk: 48, foosball: 40, controlDesk: 48, consoleDesk: 48, mixDesk: 30, deskDual: 60, coffeeCart: 34, podBooth: 30,
  carrel: 22, teacherDesk: 28, computerDesk: 32, cardCatalogue: 20, saunaCabin: 22, hotTub: 40, kitchenPass: 40, barCounter: 34, treadmill: 24, weightBench: 28, drumKit: 30, roundTable: 26, telescope: 26, seatRowBlue: 22, seatRowRed: 22, studentDesk: 24, dumbbellRack: 22, sculpture: 20, orrery: 18, galleryBench: 14, prompterDesk: 24, propChest: 24, keyboardStand: 24 };

export function tf(spr, x, y, a, b, c) {
  var o, w, h, s = TOWER_SPR_SIZE[spr] || [64, 64];
  if (typeof a === 'number') { w = a; h = b; o = c || {}; } else { o = a || {}; w = o.w || s[0]; h = o.h || s[1]; }
  var e = { spr: spr, x: x, y: y, w: w, h: h };
  if (o.z !== undefined) e.z = o.z; else if (o.wall) e.z = 2;
  ['flip', 'css', 'cls', 'front', 'zf', 'glow', 'label', 'say', 'solids', 'course'].forEach(function (k) { if (o[k] !== undefined) e[k] = o[k]; });
  if (o.wall) { if (o.say) e.hit = o.hit || [x, 152, w, 10]; return e; }
  if (o.solid instanceof Array) e.solid = o.solid;
  else if (o.solid === true || (o.solid === undefined && o.say)) { var ft = o.foot || TOWER_FOOT[spr] || 14; e.solid = [x + 4, y + h - ft, w - 8, ft]; }
  if (o.hit) e.hit = o.hit;
  else if (e.solid && o.say) e.hit = [e.solid[0] - 6, e.solid[1] - 6, e.solid[2] + 12, e.solid[3] + 12];
  return e;
}

export function tg(x, y, w, h, cls, delay) { var g = [x, y, w, h]; if (cls || delay) g.push(cls || ''); if (delay) g.push(delay); return g; }

export function rackGlows(X, Y, ph) {
  var g = [], ys = [2, 7, 13, 18];
  ys.forEach(function (ay, u) {
    var d = function (k) { return ((u * 0.37 + k * 0.53 + (ph || 0)) % 1.7).toFixed(2); };
    g.push(tg(X + 11, Y + (ay + 2) * 4 - 1, 6, 6, 'led-g', d(0)));
    g.push(tg(X + 11, Y + (ay + 3) * 4 - 1, 6, 6, 'led-r', d(1)));
    g.push(tg(X + 19, Y + (ay + 2) * 4 - 1, 6, 6, 'led-b', d(2)));
  });
  return g;
}

