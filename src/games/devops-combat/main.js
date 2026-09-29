/*
 * ============================================================
 *  DevOps Terminal Combat - game module (lazy Vite chunk)
 * ============================================================
 *  Loaded on demand by src/games/devops-combat/loader.js (dynamic import,
 *  prefetched at idle) the first time the Game tab is opened. Importing this
 *  module only evaluates the static data modules and defines
 *  startDevopsGame(); nothing touches the DOM, registers keyboard handlers or
 *  reads dgc_save_v1 until the loader calls startDevopsGame() (after the game
 *  CSS has been applied). Everything mutable (save, state, timers, UI) lives
 *  inside startDevopsGame() in this file; the imports below are plain data.
 *
 *  MODULES (all under src/games/devops-combat/)
 *    loader.js                  lazy loader: CSS + dynamic import, loading box, retry, idle prefetch
 *    main.js                    game logic (this file): combat, city loop, interiors, dialogue engine, UI, sound, save
 *    data/bosses/<id>.js        one file per boss: metadata + full question bank (index.js = BOSSES table, order matters)
 *    data/rapid-recon.js        RAPID_RECON_POOL, FINAL_BOSS_STAR_QUESTION
 *    data/library-packs.js      LIBRARY_ADVANCED_PACKS
 *    data/npc-roster.js         NPC_ROSTER (the 15 NPC definitions)
 *    data/house-homes.js        HOUSE_HOMES
 *    data/tower-helpers.js      tf()/tg()/rackGlows() builders, TOWER_SPR_SIZE, TOWER_FOOT
 *    data/tower-themes.js       TOWER_THEMES (per-floor lobby/hall/room furniture)
 *    data/tower-roofs.js        roof props, roof crowds (roofPeopleA/B), TOWER_ROOFS
 *    dialogue/npc-lines.js      NPC_DIALOGUE_DATA (city NPC line pools)
 *    dialogue/roof-a.js|roof-b.js  roof dialogue for Tower A / Tower B
 *    sprites/*.js               base64 PNG data-URI tables (foliage+ground, forest+tower art, houses, house interior).
 *                               Kept as data URIs on purpose: the game decodes them into blob: URLs / CSS backgrounds
 *                               and needs the images synchronously (no pop-in when a house or tower interior renders).
 *
 *  SECTIONS OF main.js, in file order (search the marker text)
 *
 *    PROGRESSION: level/XP curve, hero tiers
 *            search: PHASE 2 — PROGRESSION LAYER
 *    SAVE / PERSIST: localStorage (dgc_save_v1), migrations
 *            search: PERSISTENCE — namespaced
 *    Starter coins, daily streak, XP / level-up
 *            search: STARTER COINS — a one-time
 *    HERO / CHARACTER ART: chibi rig + expressions
 *            search: CHIBI RIG + EXPRESSION SYSTEM
 *    HERO ART: weapon layer, tailor outfits, multi-slot customization
 *            search: WEAPON LAYER — a swappable
 *    BOSS ART: shared boss body archetypes
 *            search: PHASE 3 — SHARED BOSS BODY ARCHETYPES
 *    HERO ART: character selection, overworld sprite
 *            search: SECTION 3A — CHARACTER SELECTION
 *    NPCs: chibi NPC rig and the 15 NPC definitions
 *            search: LIVING CITY ADDENDUM — NPCs
 *    NPC DIALOGUE: content data + pickLine engine (shuffled bags, reactive lines)
 *            search: === DIALOGUE ENGINE ===
 *    BOSSES / QUESTIONS / LEVELS: question bank (data-driven)
 *            search: QUESTION BANK — fully data-driven
 *    RUNTIME STATE + UI screen switching
 *            search: RUNTIME STATE
 *    UI: library packs, boss-select grid, title screen, modals, settings
 *            search: PHASE 4 — LIBRARY. Advanced Packs
 *    CITY WORLD: navigation + exploration engine (movement, collision)
 *            search: PHASE 4 — DEVOPS CITY: navigation
 *    CITY WORLD: environment richness (houses, decor)
 *            search: LIVING CITY ADDENDUM, SECTION 3A — environment richness
 *    CITY WORLD: forest path + New City (east)
 *            search: FOREST PATH + NEW CITY
 *    CITY WORLD: NPC + animal runtime (wander/idle)
 *            search: LIVING CITY ADDENDUM — NPC runtime
 *    HOUSES & HOMES: house interiors
 *            search: HOUSE INTERIORS
 *    TOWERS / LIFT / STAIRS: New City towers
 *            search: TOWERS (New City)
 *    TOWERS: per-floor themes (hallways, rooms)
 *            search: TOWER THEMES (Plan D part 3)
 *    ROOFS: outdoor night roofs of both towers (sky, moon, skyline, lounge crowd, roof people/fx/expressions)
 *            search: ROOFS (Plan F stages 2-3). Tower A = Skyline Bar (neon cocktail lounge), Tower B = Starlight Terrace (fire pit, tasting table, picnic blanket).
 *    CITY: general store + town decorations
 *            search: GENERAL STORE + TOWN DECORATIONS
 *    SOUND: settings + SFX engine (Web Audio)
 *            search: SOUND SETTINGS
 *    COMBAT: start / render
 *            search: COMBAT: START / RENDER
 *    COMBAT: question picker, timer + enrage, render per mode
 *            search: SHARED UTILITY: no-repeat-until-exhausted
 *    COMBAT: validation, review, resolve answer, damage/combo/coins
 *            search: VALIDATION (per mode)
 *    BOSS PROGRESSION: phases, rapid recon, hints, visual FX
 *            search: PHASE / BOSS PROGRESSION
 *    COMBAT: victory / defeat + end-of-fight review screen
 *            search: VICTORY / DEFEAT
 *    COMBAT: level-up sequence, random outage events
 *            search: PHASE 2 — LEVEL-UP SEQUENCE PLAYBACK
 *    UI / MODALS: wire up static buttons
 *            search: WIRE UP STATIC BUTTONS
 *    SAVE: export / import
 *            search: Phase 5, Section 3A — Save Export/Import
 *    UI: character select screen, tier changes
 *            search: PHASE 2 — tier changes must apply everywhere
 *    UI: entry transition (boot overlay), fullscreen mode
 *            search: ENTRY TRANSITION — "crossing the threshold"
 *    INIT: runs at the end of this file (title / character select)
 *            search: INIT — the title screen is the true first thing
 * ============================================================
 */
import { BOSSES } from './data/bosses/index.js';
import { HOUSE_HOMES } from './data/house-homes.js';
import { LIBRARY_ADVANCED_PACKS } from './data/library-packs.js';
import { NPC_ROSTER } from './data/npc-roster.js';
import { RAPID_RECON_POOL, FINAL_BOSS_STAR_QUESTION } from './data/rapid-recon.js';
import { tf, tg } from './data/tower-helpers.js';
import { TOWER_ROOFS } from './data/tower-roofs.js';
import { TOWER_THEMES } from './data/tower-themes.js';
import { NPC_DIALOGUE_DATA } from './dialogue/npc-lines.js';
import { FOLIAGE_SPRITES, GROUND_TILES } from './sprites/foliage.js';
import { FOREST_ANIMAL_SPRITES, FOREST_PROP_SPRITES } from './sprites/forest.js';
import { HOUSE_INTERIOR_SPRITES } from './sprites/house-interior.js';
import { HOUSE_SPRITES } from './sprites/houses.js';

export function startDevopsGame(){
  'use strict';

  /* ============================================================
     PHASE 2 — PROGRESSION LAYER: level/XP curve, hero tiers, growing
     stats. Pure data/derivation helpers, defined before loadSave() so
     the save-migration below can call them for existing saves that
     predate this update.
     ============================================================ */
  var HERO_TIERS = [
    { level: 1, id: 'juniorDev', name: 'Junior Dev' },
    { level: 5, id: 'devopsEngineer', name: 'DevOps Engineer' },
    { level: 10, id: 'seniorEngineer', name: 'Senior Engineer' },
    { level: 18, id: 'sre', name: 'SRE' },
    { level: 28, id: 'devopsWizard', name: 'DevOps Wizard' }
  ];
  function tierForLevel(level) {
    var result = HERO_TIERS[0];
    for (var i = 0; i < HERO_TIERS.length; i++) {
      if (level >= HERO_TIERS[i].level) result = HERO_TIERS[i];
    }
    return result;
  }
  function tierById(id) {
    for (var i = 0; i < HERO_TIERS.length; i++) { if (HERO_TIERS[i].id === id) return HERO_TIERS[i]; }
    return HERO_TIERS[0];
  }
  // Achievable early (100 XP ~ a handful of correct answers), slows down
  // later so it doesn't trivialize Phase 3 bosses.
  function xpToNextLevelForLevel(level) { return 100 + (level - 1) * 50; }
  // Bonus amounts a level grants, relative to level 1's baseline (0s here
  // — the actual baseline stats like heroHpMax live where they're used).
  // hp: flat HP added. attack: fractional dmg-dealt multiplier bonus.
  // focus: extra seconds per question, capped. luck: fractional coin bonus.
  function statsForLevel(level) {
    return {
      hp: (level - 1) * 4,
      attack: +((level - 1) * 0.02).toFixed(4),
      focus: Math.min((level - 1) * 0.5, 15),
      luck: +((level - 1) * 0.01).toFixed(4)
    };
  }

  /* ============================================================
     PERSISTENCE — namespaced localStorage keys (dgc_*) so this
     never collides with anything else this page might store.
     ============================================================ */
  var STORE_KEY = 'dgc_save_v1';
  function loadSave() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (!raw) throw 0;
      var s = JSON.parse(raw);
      // Phase 2 fields are backfilled for saves written before this update —
      // `coins`/`xp`/`bossesDefeated`/`bestCombo`/`highScore` are untouched,
      // so no existing Phase 1 progress is lost or migrated destructively.
      var level = (typeof s.level === 'number' && s.level >= 1) ? s.level : 1;
      var bossesDefeated = Array.isArray(s.bossesDefeated) ? s.bossesDefeated : [];
      // A save that already had real progress before this field existed is
      // NOT a new player — backfill the flag as already-granted so it never
      // retroactively hands out a surprise starter-coin windfall to an existing save.
      var alreadyHadProgress = (s.coins || 0) > 0 || (s.xp || 0) > 0 || bossesDefeated.length > 0;
      return {
        coins: s.coins || 0,
        xp: s.xp || 0,
        bossesDefeated: bossesDefeated,
        bestCombo: s.bestCombo || 1,
        highScore: s.highScore || 0,
        level: level,
        currentXP: typeof s.currentXP === 'number' ? s.currentXP : 0,
        xpToNextLevel: typeof s.xpToNextLevel === 'number' ? s.xpToNextLevel : xpToNextLevelForLevel(level),
        heroTier: s.heroTier || tierForLevel(level).id,
        stats: (s.stats && typeof s.stats === 'object') ? s.stats : statsForLevel(level),
        starterCoinsGranted: !!s.starterCoinsGranted || alreadyHadProgress,
        // Phase 4 (City hub) fields below — non-destructive migration, same
        // pattern as every prior field: a save written before Phase 4 simply
        // gets the sane defaults a brand-new save would have (the starter
        // weapon owned+equipped, nothing else owned/invested/unlocked yet).
        equippedWeapon: s.equippedWeapon || 'keyboardBlaster',
        ownedWeapons: Array.isArray(s.ownedWeapons) ? s.ownedWeapons : ['keyboardBlaster'],
        equippedOutfit: s.equippedOutfit || 'default',
        ownedOutfits: Array.isArray(s.ownedOutfits) ? s.ownedOutfits : ['default'],
        bankInvestedAmount: typeof s.bankInvestedAmount === 'number' ? s.bankInvestedAmount : 0,
        lastBankVisitTimestamp: typeof s.lastBankVisitTimestamp === 'number' ? s.lastBankVisitTimestamp : Date.now(),
        unlockedLibraryPacks: Array.isArray(s.unlockedLibraryPacks) ? s.unlockedLibraryPacks : [],
        // Section 1B sub-step 2 — General Store decorations. `ownedDecorations`
        // counts how many of each decoration id have been bought (a placed
        // instance doesn't reduce this — see townDecorations below; "how many
        // are free to place right now" is always derived as owned minus
        // however many of that id currently appear in townDecorations).
        ownedDecorations: (s.ownedDecorations && typeof s.ownedDecorations === 'object') ? s.ownedDecorations : {},
        townDecorations: Array.isArray(s.townDecorations) ? s.townDecorations : [],
        // Section 1C — multi-slot hero customization. Weapon + outfit stay
        // exactly where they already were (equippedWeapon/equippedOutfit,
        // ownedWeapons/ownedOutfits — unchanged, already shipped and
        // tested); this adds the 3 genuinely NEW slots (hair color, shoes,
        // a head accessory) as their own small, independent fields rather
        // than folding everything into one payload — extends the schema
        // instead of migrating two already-working fields for no benefit.
        equippedHair: s.equippedHair || 'brown',
        ownedHair: Array.isArray(s.ownedHair) ? s.ownedHair : ['brown'],
        equippedShoes: s.equippedShoes || 'default',
        ownedShoes: Array.isArray(s.ownedShoes) ? s.ownedShoes : ['default'],
        equippedAccessory: s.equippedAccessory || 'none',
        ownedAccessories: Array.isArray(s.ownedAccessories) ? s.ownedAccessories : ['none'],
        // Section 3A — character selection. A save that already had real
        // progress before this field existed picked its look implicitly
        // (the only hero that ever existed) — backfill it as 'byte' (the
        // original look) rather than retroactively interrupting an
        // established save with a selection prompt. A genuinely fresh
        // save gets `null` here on purpose: that's exactly what the boot
        // flow checks to decide whether to show the character-select
        // screen before the title screen.
        selectedCharacterId: typeof s.selectedCharacterId === 'string' ? s.selectedCharacterId : (alreadyHadProgress ? 'byte' : null),
        // Living City addendum, Section 5 — lightweight: which line index
        // each NPC last showed, so a repeat conversation advances instead
        // of repeating (and eventually loops, which is explicitly fine).
        npcLastLineIndex: (s.npcLastLineIndex && typeof s.npcLastLineIndex === 'object') ? s.npcLastLineIndex : {},
        // Phase 5, Section 3A — Practice Mode: a persistent settings-style
        // toggle (same pattern as soundEnabled), not per-fight state.
        practiceMode: !!s.practiceMode,
        // Phase 5, Section 2 — daily streak tracker.
        lastPlayedDate: typeof s.lastPlayedDate === 'string' ? s.lastPlayedDate : null,
        currentDailyStreak: typeof s.currentDailyStreak === 'number' ? s.currentDailyStreak : 0,
        longestDailyStreak: typeof s.longestDailyStreak === 'number' ? s.longestDailyStreak : 0,
        // Phase 5, Section 1 — Personalized Debrief. Lightweight running
        // tallies only (per doc: "does not need full question-by-question
        // history forever") — byBoss drives the "which topic to revisit"
        // recommendation, byMode drives the "which skill is weakest" one.
        performanceHistory: normalizePerformanceHistory(s.performanceHistory),
        // Phase 5, Section 3 — Leaderboard: the Final Boss run is tracked
        // separately from the general `highScore` (best coins in ANY run)
        // since the doc calls it out as its own dedicated entry.
        bestFinalBossScore: typeof s.bestFinalBossScore === 'number' ? s.bestFinalBossScore : 0,
        // Remediation doc, Section 1 — per-boss highest cleared difficulty
        // level (1-5). Absent/0 means "not on the new leveled structure
        // yet" for a boss that hasn't been migrated off the old 3-phase
        // format, which is the correct default for every existing save.
        bossLevelProgress: (s.bossLevelProgress && typeof s.bossLevelProgress === 'object') ? s.bossLevelProgress : {},
        // Dialogue engine (see DIALOGUE ENGINE): per-character shuffled-bag state,
        // conversation counts and 'visited' place flags. Backfilled empty for old saves.
        dialogueBag: (s.dialogueBag && typeof s.dialogueBag === 'object' && !Array.isArray(s.dialogueBag)) ? s.dialogueBag : {},
        talked: (s.talked && typeof s.talked === 'object' && !Array.isArray(s.talked)) ? s.talked : {},
        visited: (s.visited && typeof s.visited === 'object' && !Array.isArray(s.visited)) ? s.visited : {}
      };
    } catch (e) {
      return {
        coins: 0, xp: 0, bossesDefeated: [], bestCombo: 1, highScore: 0,
        level: 1, currentXP: 0, xpToNextLevel: xpToNextLevelForLevel(1), heroTier: tierForLevel(1).id,
        stats: statsForLevel(1), starterCoinsGranted: false, equippedWeapon: 'keyboardBlaster',
        ownedWeapons: ['keyboardBlaster'], equippedOutfit: 'default', ownedOutfits: ['default'],
        bankInvestedAmount: 0, lastBankVisitTimestamp: Date.now(), unlockedLibraryPacks: [],
        ownedDecorations: {}, townDecorations: [],
        equippedHair: 'brown', ownedHair: ['brown'], equippedShoes: 'default', ownedShoes: ['default'],
        equippedAccessory: 'none', ownedAccessories: ['none'], selectedCharacterId: null,
        npcLastLineIndex: {}, practiceMode: false,
        lastPlayedDate: null, currentDailyStreak: 0, longestDailyStreak: 0,
        performanceHistory: normalizePerformanceHistory(null), bestFinalBossScore: 0, bossLevelProgress: {},
        dialogueBag: {}, talked: {}, visited: {}
      };
    }
  }
  // Phase 5, Section 1 — shared shape for the performance-tracking data,
  // used both for a genuinely fresh save and to backfill an older one
  // that predates this field (same non-destructive-migration pattern as
  // every other field above).
  function normalizePerformanceHistory(ph) {
    var clean = (ph && typeof ph === 'object') ? ph : {};
    return {
      byBoss: (clean.byBoss && typeof clean.byBoss === 'object') ? clean.byBoss : {},
      byMode: (clean.byMode && typeof clean.byMode === 'object') ? clean.byMode : {}
    };
  }
  var save = loadSave();
  function persist() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(save)); } catch (e) { /* storage unavailable — game still works, just won't persist */ }
  }

  /* ============================================================
     STARTER COINS — a one-time coin grant for a genuinely new save (or
     an explicit "New Game" reset, which is a real fresh start, not a
     punishment). The DATA is granted immediately here; the VISIBLE toast
     is deferred until the world-entry transition actually finishes (see
     runBootSequence()) so it's never wasted on a hidden tab panel.
     ============================================================ */
  var STARTER_COINS_AMOUNT = 10000;
  var pendingStarterCoinsToast = false;
  function grantStarterCoinsIfNeeded() {
    if (save.starterCoinsGranted) return;
    save.coins += STARTER_COINS_AMOUNT;
    save.starterCoinsGranted = true;
    persist();
    pendingStarterCoinsToast = true;
  }
  function showStarterCoinsToastIfPending() {
    if (!pendingStarterCoinsToast) return;
    pendingStarterCoinsToast = false;
    var toast = $('dgcStarterCoinsToast');
    if (!toast) return;
    toast.hidden = false;
    var textEl = toast.querySelector('.dgc-starter-coins-text');
    if (textEl) textEl.textContent = '🪙 +' + STARTER_COINS_AMOUNT.toLocaleString() + ' COINS';
    spawnCoinParticles($('dgcStarterCoinsBurst'), STARTER_COINS_AMOUNT);
    playSfx('starterCoins');
    setTimeout(function () { toast.hidden = true; }, 2600);
    refreshTitleScreen(); // the coins are already in `save` — reflect them right away
  }

  /* ============================================================
     PHASE 5, SECTION 2 — DAILY STREAK TRACKER. Separate from the
     in-fight combo streak (resets every fight) — this tracks consecutive
     CALENDAR DAYS the player has opened the game at all, independent of
     whether they actually fight anything. Checked once per page load
     (same "data now, toast deferred to world-entry" split as starter
     coins above) so it can never fire twice for the same visit.
     ============================================================ */
  var STREAK_MILESTONES = [3, 7, 14, 30];
  var pendingStreakInfo = null;
  function todayDateString() {
    var d = new Date();
    var mm = String(d.getMonth() + 1); if (mm.length < 2) mm = '0' + mm;
    var dd = String(d.getDate()); if (dd.length < 2) dd = '0' + dd;
    return d.getFullYear() + '-' + mm + '-' + dd;
  }
  function checkDailyStreak() {
    var today = todayDateString();
    if (save.lastPlayedDate === today) return; // already counted today — a page refresh isn't a second "day"
    var isConsecutiveDay = false;
    if (save.lastPlayedDate) {
      var prevMidnight = new Date(save.lastPlayedDate + 'T00:00:00');
      var todayMidnight = new Date(today + 'T00:00:00');
      var diffDays = Math.round((todayMidnight - prevMidnight) / 86400000);
      isConsecutiveDay = diffDays === 1;
    }
    // A missed day (or the very first visit ever) resets to 1, not 0 — the
    // day you're currently playing always counts as day 1 of a new streak.
    save.currentDailyStreak = isConsecutiveDay ? save.currentDailyStreak + 1 : 1;
    save.longestDailyStreak = Math.max(save.longestDailyStreak, save.currentDailyStreak);
    save.lastPlayedDate = today;
    // Flat 500-coin "nice to have you back" bonus every day, plus a
    // one-time bump right on a milestone day.
    var DAILY_COIN_BONUS = 500;
    var isMilestone = STREAK_MILESTONES.indexOf(save.currentDailyStreak) !== -1;
    var bonus = DAILY_COIN_BONUS + (isMilestone ? save.currentDailyStreak * 10 : 0);
    save.coins += bonus;
    persist();
    // Don't show a toast for a bare "1-day streak" — that's just the
    // first time anyone opens the game (or the first day back after a
    // long gap), nothing to celebrate yet; the badge itself waits for
    // the same threshold (see refreshStreakBadge()).
    if (save.currentDailyStreak > 1) {
      pendingStreakInfo = { streak: save.currentDailyStreak, bonus: bonus, milestone: isMilestone };
    }
  }
  function showStreakToastIfPending() {
    if (!pendingStreakInfo) return;
    var info = pendingStreakInfo;
    pendingStreakInfo = null;
    var toast = $('dgcStreakToast');
    if (!toast) return;
    toast.hidden = false;
    var textEl = $('dgcStreakText');
    var subEl = $('dgcStreakSub');
    if (textEl) textEl.textContent = '🔥 ' + info.streak + '-DAY STREAK' + (info.milestone ? '!' : '');
    if (subEl) subEl.textContent = '+' + info.bonus + ' coins for coming back';
    spawnCoinParticles($('dgcStreakBurst'), info.bonus);
    // A milestone day (3/7/14/30) gets the same celebratory beat as a
    // level-up/tier-up moment — reusing that pattern rather than a new
    // effect system, per the doc's own instruction.
    playSfx(info.milestone ? 'tierUp' : 'starterCoins');
    setTimeout(function () { toast.hidden = true; }, 2600);
    refreshTitleScreen();
    refreshStreakBadge();
  }
  // Small, non-intrusive display on the title screen (not a modal/badge
  // notification) — updated here and after any streak change.
  function refreshStreakBadge() {
    var el = $('dgcStreakBadge');
    if (!el) return;
    if (save.currentDailyStreak > 1) {
      el.hidden = false;
      el.textContent = '🔥 ' + save.currentDailyStreak + ' day' + (save.currentDailyStreak === 1 ? '' : 's');
    } else {
      el.hidden = true; // a bare "1 day" streak isn't worth showing yet — nothing to celebrate on day one
    }
  }

  /* ============================================================
     XP / LEVEL-UP — the single reused hook every XP-award already goes
     through (per-question XP + boss-clear XP), so leveling never needs
     its own separate XP source. Level-ups are queued (not shown
     instantly) so a big XP payout that crosses several levels at once
     plays its celebrations back-to-back instead of overlapping.
     ============================================================ */
  var pendingLevelUps = [];
  function awardXp(amount) {
    if (!amount) return;
    save.xp += amount; // lifetime total — unchanged Phase 1 field, still shown in Trophy Hall
    save.currentXP += amount;
    var leveledUp = false;
    while (save.currentXP >= save.xpToNextLevel) {
      save.currentXP -= save.xpToNextLevel;
      save.level++;
      var oldTierId = save.heroTier;
      var newTier = tierForLevel(save.level);
      var tierChanged = newTier.id !== oldTierId;
      var oldStats = save.stats;
      var newStats = statsForLevel(save.level);
      pendingLevelUps.push({
        level: save.level,
        tierChanged: tierChanged,
        tierName: newTier.name,
        statDeltas: {
          hp: +(newStats.hp - oldStats.hp).toFixed(2),
          attack: +(newStats.attack - oldStats.attack).toFixed(4),
          focus: +(newStats.focus - oldStats.focus).toFixed(2),
          luck: +(newStats.luck - oldStats.luck).toFixed(4)
        }
      });
      save.heroTier = newTier.id;
      save.stats = newStats;
      save.xpToNextLevel = xpToNextLevelForLevel(save.level);
      leveledUp = true;
    }
    if (leveledUp) persist();
  }

  /* ============================================================
     SMALL HELPERS
     ============================================================ */
  function $(id) { return document.getElementById(id); }
  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function normalize(str) {
    return String(str || '').trim().replace(/\s+/g, ' ');
  }
  function testPatterns(patterns, input) {
    var n = normalize(input);
    for (var i = 0; i < patterns.length; i++) {
      if (patterns[i].test(n)) return true;
    }
    return false;
  }
  // Guards a delayed callback against firing against a STALE fight session —
  // e.g. a player mashing Retreat/Fight fast enough that an old fight's
  // pending 700ms "advance to next question" callback would otherwise land
  // on the brand-new fight's state. Captures the current `state` object by
  // reference at schedule time and no-ops if `state` has since been replaced
  // (which only happens via startFight() creating a new run).
  function guardedTimeout(fn, delay) {
    var stateRef = state;
    setTimeout(function () {
      if (state !== stateRef) return;
      fn();
    }, delay);
  }
  function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
  function pick(arr) { return arr[rand(0, arr.length - 1)]; }
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = rand(0, i);
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /* ============================================================
     CHIBI RIG + EXPRESSION SYSTEM
     One shared face-part library (eyes/mouth/brow/accessory), reused
     unchanged across all three characters (hero, Sudo, boss) — only
     the surrounding body/head silhouette and color differ per
     character. This is what makes adding Phase 3 bosses fast: give
     the new boss a body shape + palette, get the full 18-expression
     face system for free.
     ============================================================ */

  // Every expression a character can wear, as a combination of shared
  // face-part variants. 15 required core expressions (idle through
  // powerup/phase-transition) + 3 Sudo-only extras = 18 named states.
  var EXPRESSIONS = {
    idle:        { eyes:'neutral',   mouth:'neutral',    brow:'neutral',   acc:'none' },
    determined:  { eyes:'determined',mouth:'neutral',    brow:'furrowed', acc:'none' },
    happy:       { eyes:'happy',     mouth:'smile',      brow:'neutral',  acc:'none' },
    excited:     { eyes:'sparkle',   mouth:'biggrin',    brow:'raised',   acc:'sparkles' },
    hurtLight:   { eyes:'wince',     mouth:'wince',      brow:'worried',  acc:'sweat' },
    hurtHeavy:   { eyes:'pained',    mouth:'painful',    brow:'furrowed', acc:'sweat' },
    worried:     { eyes:'worried',   mouth:'worried',    brow:'worried',  acc:'sweat' },
    defeated:    { eyes:'spiral',    mouth:'ko',         brow:'drooping', acc:'starsswirl' },
    victorious:  { eyes:'happy',     mouth:'triumphant', brow:'raised',   acc:'sparkles' },
    angry:       { eyes:'angry',     mouth:'enraged',    brow:'furrowed', acc:'vein' },
    surprised:   { eyes:'surprised', mouth:'surprised',  brow:'raised',   acc:'exclaim' },
    confident:   { eyes:'smirk',     mouth:'smirk',      brow:'oneraised',acc:'none' },
    confused:    { eyes:'confused',  mouth:'confused',   brow:'oneraised',acc:'none' },
    tired:       { eyes:'tired',     mouth:'tired',      brow:'drooping', acc:'sweat' },
    powerup:     { eyes:'sparkle',   mouth:'poweringup', brow:'raised',   acc:'glow' },
    // Sudo-only
    thinking:    { eyes:'worried',   mouth:'neutral',    brow:'oneraised',acc:'thought' },
    smug:        { eyes:'smirk',     mouth:'smirk',      brow:'neutral',  acc:'none' },
    sympathetic: { eyes:'worried',   mouth:'worried',    brow:'worried',  acc:'none' },
    // Character art v2 addendum, Section 2A — 5 more expressions raising
    // the hero/Sudo/boss floor from 15+ to 20+. Each is a genuinely new
    // eyes/mouth combination (2 brand-new eye shapes, 1 brand-new mouth
    // shape, the rest reused deliberately in combinations not used
    // elsewhere) — never a copy-paste of an existing expression.
    curious:     { eyes:'curious',   mouth:'neutral',    brow:'raised',   acc:'none' },
    playful:     { eyes:'wink',      mouth:'smirk',       brow:'oneraised',acc:'none' },
    embarrassed: { eyes:'sheepish',  mouth:'wince',       brow:'worried',  acc:'sweat' },
    calm:        { eyes:'content',   mouth:'smile',       brow:'neutral',  acc:'none' },
    determinedIntense: { eyes:'determined', mouth:'gritted', brow:'furrowed', acc:'vein' },
    // Roof expressions (Plan F stage 2)
    kiss:        { eyes:'closed',    mouth:'pucker',     brow:'soft',     acc:'blushmore' },
    love:        { eyes:'heart',     mouth:'smile',      brow:'soft',     acc:'hearts' },
    tipsy:       { eyes:'halflid',   mouth:'wobble',     brow:'neutral',  acc:'tipsy' },
    flirty:      { eyes:'flirtwink', mouth:'smirkflirt', brow:'oneraised',acc:'flirtheart' },
    stargaze:    { eyes:'up',        mouth:'awe',        brow:'raised',   acc:'none' },
    laugh:       { eyes:'laugh',     mouth:'laughopen',  brow:'raised',   acc:'blushmore' }
  };

  // ---- shared face-part shape library (authored once, in head-local
  // coordinates centered on (50,42)), reused verbatim by every character.
  // Roof expressions (Plan F stage 2): extra face parts, same head-local coordinates as the library below. Appended by facePartsSVG().
  var FACE_PARTS_ROOF = ''
    // eyes: closed (lashes), heart, half-lid, up (stargaze), laugh (> <), flirtwink (lash + wink)
    + '<g class="dgc-face-part dgc-eyes-closed" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M37 40 Q41 44 45 40"/><path d="M55 40 Q59 44 63 40"/><path d="M37 40 L34.6 38.6"/><path d="M63 40 L65.4 38.6"/></g>'
    + '<g class="dgc-face-part dgc-eyes-heart" fill="#e8406a"><path d="M41 44.6 C34.6 40.6 35.6 35.6 38.6 35.6 C40.2 35.6 41 36.8 41 37.8 C41 36.8 41.8 35.6 43.4 35.6 C46.4 35.6 47.4 40.6 41 44.6 Z"/><path d="M59 44.6 C52.6 40.6 53.6 35.6 56.6 35.6 C58.2 35.6 59 36.8 59 37.8 C59 36.8 59.8 35.6 61.4 35.6 C64.4 35.6 65.4 40.6 59 44.6 Z"/><circle cx="38.4" cy="38.4" r="0.9" fill="#fff"/><circle cx="56.4" cy="38.4" r="0.9" fill="#fff"/></g>'
    + '<g class="dgc-face-part dgc-eyes-halflid"><path d="M37.4 41 A3.6 3.6 0 0 0 44.6 41 Z"/><path d="M55.4 41 A3.6 3.6 0 0 0 62.6 41 Z"/><path d="M36.4 40.6 L45.6 40.6 M54.4 40.6 L63.6 40.6" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></g>'
    + '<g class="dgc-face-part dgc-eyes-up"><circle cx="41" cy="39" r="4.3"/><circle cx="59" cy="39" r="4.3"/><circle cx="42" cy="36.8" r="1.7" fill="#fff"/><circle cx="60" cy="36.8" r="1.7" fill="#fff"/><circle cx="40" cy="41.2" r="0.8" fill="#fff"/><circle cx="58" cy="41.2" r="0.8" fill="#fff"/></g>'
    + '<g class="dgc-face-part dgc-eyes-laugh" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M37 37.5 L44.5 40.6 L37 43.7"/><path d="M63 37.5 L55.5 40.6 L63 43.7"/></g>'
    + '<g class="dgc-face-part dgc-eyes-flirtwink" stroke="currentColor" stroke-linecap="round"><ellipse cx="41" cy="40.4" rx="3" ry="3.6" stroke="none"/><path d="M37.6 38 L35.4 36.6" fill="none" stroke-width="1.6"/><path d="M55 40.4 Q59 43.6 63 40.4" fill="none" stroke-width="2.3"/><path d="M63 40.4 L65.2 38.8" fill="none" stroke-width="1.6"/></g>'
    // mouth: pucker, wobble, awe, laughopen, smirkflirt
    + '<g class="dgc-face-part dgc-mouth-pucker"><ellipse cx="50" cy="54" rx="2.4" ry="2.8" fill="#d94868"/><ellipse cx="49.2" cy="53.2" rx="0.8" ry="0.8" fill="#ff9ab0"/></g>'
    + '<g class="dgc-face-part dgc-mouth-wobble" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M42.5 54 Q46 51 48.5 54 Q51 57 54 53.5 Q56.5 51.6 58 54.8"/></g>'
    + '<g class="dgc-face-part dgc-mouth-awe"><ellipse cx="50" cy="55" rx="2.8" ry="3.5"/></g>'
    + '<g class="dgc-face-part dgc-mouth-laughopen"><path d="M41 50.4 L59 50.4 Q58.4 62.6 50 62.6 Q41.6 62.6 41 50.4 Z"/><ellipse cx="50" cy="59.6" rx="4.2" ry="2.2" fill="#e8506a"/><path d="M43.5 51.2 L56.5 51.2" stroke="#fff" stroke-width="1.6" opacity="0.85"/></g>'
    + '<g class="dgc-face-part dgc-mouth-smirkflirt" fill="none" stroke="#c23a5a" stroke-width="2.6" stroke-linecap="round"><path d="M45.5 53.4 Q51.5 58.6 57.5 51.4"/><path d="M58.6 50.2 L59.8 49.4" stroke-width="1.4"/></g>'
    // brow: soft
    + '<g class="dgc-face-part dgc-brow-soft" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" fill="none"><path d="M37 32.6 Q41 30.4 45 32.2"/><path d="M55 32.2 Q59 30.4 63 32.6"/></g>'
    // accessory: blushmore, hearts, tipsy, flirtheart
    + '<g class="dgc-face-part dgc-acc-blushmore" fill="#ff7a9c" opacity="0.55"><ellipse cx="33" cy="49" rx="7" ry="4.4"/><ellipse cx="67" cy="49" rx="7" ry="4.4"/></g>'
    + '<g class="dgc-face-part dgc-acc-hearts" fill="#ff4f7d"><path d="M77 27 C72.6 24.2 73.2 20.6 75.3 20.6 C76.4 20.6 77 21.5 77 22.1 C77 21.5 77.6 20.6 78.7 20.6 C80.8 20.6 81.4 24.2 77 27 Z"/><path d="M22 20 C19.2 18.2 19.6 15.8 21 15.8 C21.7 15.8 22 16.4 22 16.8 C22 16.4 22.3 15.8 23 15.8 C24.4 15.8 24.8 18.2 22 20 Z"/></g>'
    + '<g class="dgc-face-part dgc-acc-tipsy"><g fill="#ff6a86" opacity="0.62"><ellipse cx="33" cy="49" rx="7.6" ry="4.8"/><ellipse cx="67" cy="49" rx="7.6" ry="4.8"/></g><g fill="#fff" opacity="0.8"><circle cx="74" cy="27" r="1.6"/><circle cx="79" cy="21" r="1.1"/><circle cx="77" cy="33" r="0.9"/></g></g>'
    + '<g class="dgc-face-part dgc-acc-flirtheart" fill="#ff4f7d"><path d="M77 30 C72.6 27.2 73.2 23.6 75.3 23.6 C76.4 23.6 77 24.5 77 25.1 C77 24.5 77.6 23.6 78.7 23.6 C80.8 23.6 81.4 27.2 77 30 Z"/><path d="M66 24 l1 2.2 2.2 1 -2.2 1 -1 2.2 -1 -2.2 -2.2 -1 2.2 -1 z" fill="#ffe27a"/></g>';

  function facePartsSVG() {
    return ''
      // EYES (13 variants)
      + '<g class="dgc-face-part dgc-eyes-neutral"><ellipse cx="41" cy="40" rx="3" ry="4"/><ellipse cx="59" cy="40" rx="3" ry="4"/></g>'
      + '<g class="dgc-face-part dgc-eyes-determined"><ellipse cx="41" cy="40" rx="2.4" ry="3"/><ellipse cx="59" cy="40" rx="2.4" ry="3"/></g>'
      + '<g class="dgc-face-part dgc-eyes-happy" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M37 41 Q41 36 45 41"/><path d="M55 41 Q59 36 63 41"/></g>'
      + '<g class="dgc-face-part dgc-eyes-sparkle"><circle cx="41" cy="40" r="4"/><circle cx="59" cy="40" r="4"/><circle cx="42.3" cy="38.3" r="1.3" fill="#fff"/><circle cx="60.3" cy="38.3" r="1.3" fill="#fff"/></g>'
      + '<g class="dgc-face-part dgc-eyes-wince" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M37 40 L45 40"/><path d="M55 40 L63 40"/></g>'
      + '<g class="dgc-face-part dgc-eyes-pained" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M37 37 L45 43"/><path d="M45 37 L37 43"/><path d="M55 37 L63 43"/><path d="M63 37 L55 43"/></g>'
      + '<g class="dgc-face-part dgc-eyes-worried"><ellipse cx="42" cy="41" rx="2.2" ry="3.2"/><ellipse cx="58" cy="41" rx="2.2" ry="3.2"/></g>'
      + '<g class="dgc-face-part dgc-eyes-spiral" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="41" cy="40" r="3.6"/><circle cx="41" cy="40" r="1.4"/><circle cx="59" cy="40" r="3.6"/><circle cx="59" cy="40" r="1.4"/></g>'
      + '<g class="dgc-face-part dgc-eyes-angry" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M37 37 L45 41"/><path d="M63 37 L55 41"/></g>'
      + '<g class="dgc-face-part dgc-eyes-surprised" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="41" cy="40" r="4.6"/><circle cx="59" cy="40" r="4.6"/><circle cx="41" cy="40" r="1.6" fill="currentColor"/><circle cx="59" cy="40" r="1.6" fill="currentColor"/></g>'
      + '<g class="dgc-face-part dgc-eyes-smirk"><ellipse cx="41" cy="41" rx="3" ry="3.6"/><path d="M55 41 Q59 38 63 41" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></g>'
      + '<g class="dgc-face-part dgc-eyes-confused"><circle cx="40" cy="40" r="4.4"/><circle cx="59" cy="41" r="2"/></g>'
      + '<g class="dgc-face-part dgc-eyes-tired" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M37 41 Q41 43 45 41"/><path d="M55 41 Q59 43 63 41"/></g>'
      // Character art v2 addendum — 4 new eye variants (curious/wink/
      // sheepish/content), each a genuinely distinct shape/curve, not a
      // resize of an existing one.
      + '<g class="dgc-face-part dgc-eyes-curious"><circle cx="41" cy="40" r="3.8"/><circle cx="59" cy="40" r="3.8"/><circle cx="42" cy="38.4" r="1" fill="#fff"/><circle cx="60" cy="38.4" r="1" fill="#fff"/></g>'
      + '<g class="dgc-face-part dgc-eyes-wink" stroke="currentColor" stroke-linecap="round"><path d="M37 40 Q41 43 45 40" fill="none" stroke-width="2.2"/><circle cx="59" cy="40" r="3"/></g>'
      + '<g class="dgc-face-part dgc-eyes-sheepish" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M37 41 Q41 39 45 41"/><path d="M55 41 Q59 39 63 41"/></g>'
      + '<g class="dgc-face-part dgc-eyes-content" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M38 40 Q41 38.5 44 40"/><path d="M56 40 Q59 38.5 62 40"/></g>'
      // MOUTH (14 variants)
      + '<g class="dgc-face-part dgc-mouth-neutral" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M46 53 Q50 55 54 53" fill="none"/></g>'
      + '<g class="dgc-face-part dgc-mouth-smile" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" fill="none"><path d="M44 52 Q50 58 56 52"/></g>'
      + '<g class="dgc-face-part dgc-mouth-biggrin"><path d="M41 51 Q50 62 59 51 Q50 57 41 51 Z"/></g>'
      + '<g class="dgc-face-part dgc-mouth-wince" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M45 54 L48 52 L51 54 L54 52" fill="none"/></g>'
      + '<g class="dgc-face-part dgc-mouth-painful"><ellipse cx="50" cy="54" rx="4.5" ry="3.2"/></g>'
      + '<g class="dgc-face-part dgc-mouth-worried" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M45 55 Q50 52 55 55" fill="none"/></g>'
      + '<g class="dgc-face-part dgc-mouth-ko" stroke="currentColor" stroke-width="2" ><ellipse cx="50" cy="54" rx="5" ry="2.4" fill="none"/></g>'
      + '<g class="dgc-face-part dgc-mouth-triumphant"><path d="M39 50 Q50 64 61 50 Q50 58 39 50 Z"/><path d="M42 51 L58 51 L56 54 L44 54 Z" fill="#fff" opacity="0.85"/></g>'
      + '<g class="dgc-face-part dgc-mouth-enraged"><path d="M40 51 L60 51 L57 58 L53 52 L50 58 L47 52 L43 58 Z"/></g>'
      + '<g class="dgc-face-part dgc-mouth-surprised"><circle cx="50" cy="54" r="3.4"/></g>'
      + '<g class="dgc-face-part dgc-mouth-smirk" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" fill="none"><path d="M46 53 Q52 58 57 51"/></g>'
      + '<g class="dgc-face-part dgc-mouth-confused" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"><path d="M44 53 Q47 50 50 53 Q53 56 56 53"/></g>'
      + '<g class="dgc-face-part dgc-mouth-tired" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"><path d="M45 54 L55 54"/></g>'
      + '<g class="dgc-face-part dgc-mouth-poweringup"><ellipse cx="50" cy="55" rx="6" ry="6"/></g>'
      // Character art v2 addendum — a tense, clenched mouth for the new
      // Determined-Intense expression (distinct from Tired's thin flat
      // line: this one is a filled block with a visible teeth-seam).
      + '<g class="dgc-face-part dgc-mouth-gritted"><rect x="43" y="52" width="14" height="4" rx="1"/><path d="M43 54 L57 54" stroke="rgba(0,0,0,0.35)" stroke-width="0.8" fill="none"/></g>'
      // BROW (6 variants)
      + '<g class="dgc-face-part dgc-brow-neutral" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M37 33 L45 32"/><path d="M55 32 L63 33"/></g>'
      + '<g class="dgc-face-part dgc-brow-furrowed" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M37 31 L45 34"/><path d="M55 34 L63 31"/></g>'
      + '<g class="dgc-face-part dgc-brow-raised" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M37 30 Q41 27 45 30"/><path d="M55 30 Q59 27 63 30"/></g>'
      + '<g class="dgc-face-part dgc-brow-worried" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M38 32 L45 35"/><path d="M55 35 L62 32"/></g>'
      + '<g class="dgc-face-part dgc-brow-oneraised" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M37 33 L45 32"/><path d="M55 30 Q59 27 63 30"/></g>'
      + '<g class="dgc-face-part dgc-brow-drooping" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M37 30 L45 33"/><path d="M55 33 L63 30"/></g>'
      // ACCESSORY (7 variants; "none" simply never rendered/looked up)
      + '<g class="dgc-face-part dgc-acc-sparkles" fill="var(--dgc-gold)"><path d="M24 24 l1.6 3.4 3.4 1.6 -3.4 1.6 -1.6 3.4 -1.6 -3.4 -3.4 -1.6 3.4 -1.6 z"/><path d="M76 30 l1.2 2.6 2.6 1.2 -2.6 1.2 -1.2 2.6 -1.2 -2.6 -2.6 -1.2 2.6 -1.2 z"/></g>'
      + '<g class="dgc-face-part dgc-acc-sweat" fill="var(--dgc-secondary)" opacity="0.85"><path d="M70 30 q3 4 0 7 q-3 -3 0 -7 z"/></g>'
      + '<g class="dgc-face-part dgc-acc-starsswirl" fill="var(--dgc-crit-bright)"><circle cx="22" cy="34" r="1.6"/><circle cx="26" cy="26" r="1.2"/><circle cx="78" cy="32" r="1.6"/><circle cx="74" cy="24" r="1.2"/></g>'
      + '<g class="dgc-face-part dgc-acc-vein" stroke="var(--dgc-danger)" stroke-width="1.8" stroke-linecap="round"><path d="M70 22 l3 3 m-3 0 l3 -3 m-1.5 -3 l0 9"/></g>'
      + '<g class="dgc-face-part dgc-acc-exclaim" fill="var(--dgc-gold)"><rect x="72" y="14" width="3" height="11" rx="1.5"/><circle cx="73.5" cy="29" r="1.8"/></g>'
      + '<g class="dgc-face-part dgc-acc-glow" fill="none" stroke="var(--dgc-gold)" stroke-width="1.4" opacity="0.8"><circle cx="50" cy="40" r="30"/></g>'
      + '<g class="dgc-face-part dgc-acc-thought" fill="currentColor" opacity="0.85"><circle cx="70" cy="26" r="1.6"/><circle cx="75" cy="21" r="1.2"/><circle cx="79" cy="17" r="0.9"/></g>'
      + FACE_PARTS_ROOF;
  }

  // Applies a named expression to one character's rig root element by
  // toggling which face-part groups are visible — no per-character
  // rebuilding, just show/hide, so transitions can be a quick fade.
  // rootEl = the OUTER container (e.g. the existing #dgcHeroSprite div);
  // the actual <svg class="dgc-chibi"> and its face group live inside it.
  function setExpression(rootEl, exprName) {
    if (!rootEl) return;
    var parts = EXPRESSIONS[exprName] || EXPRESSIONS.idle;
    var chibi = rootEl.querySelector('.dgc-chibi');
    var face = rootEl.querySelector('.dgc-chibi-face');
    if (!face) return;
    face.querySelectorAll('.dgc-face-part').forEach(function (el) { el.style.display = 'none'; });
    // CRITICAL FIX: this used to clear the inline style (style.display='')
    // to "reveal" a part, which does NOT work — .dgc-face-part{display:
    // none} is a stylesheet class rule, so clearing an inline override
    // just falls back to that same "none". Net effect: every character's
    // eyes/eyebrows/mouth/accessory were invisible this entire time (only
    // always-on elements like blush/hair/body ever rendered) — confirmed
    // live via computed style (display:none even after this ran) before
    // this fix. An explicit inline 'block' actually outranks the class
    // rule, which is what setting a real face is supposed to do.
    ['eyes', 'mouth', 'brow', 'acc'].forEach(function (cat) {
      var variant = parts[cat];
      if (!variant || variant === 'none') return;
      var el = face.querySelector('.dgc-' + cat + '-' + variant);
      if (el) el.style.display = 'block';
    });
    if (chibi) chibi.setAttribute('data-expr', exprName);
    face.classList.remove('dgc-face-pop');
    void face.getBBox && face.getBBox(); // force reflow on the SVG group (offsetWidth doesn't reflow SVG children reliably)
    face.classList.add('dgc-face-pop'); // quick bounce, not a hard cut
  }

  // Maps the 3 characters that exist in combat to their sprite-container
  // ids, so every expression call site can say "hero"/"boss"/"sudo" instead
  // of repeating $('dgcHeroSprite') everywhere (title/select-screen chibis
  // set their one-off expression directly via setExpression()).
  var CHIBI_SPRITE_IDS = { hero: 'dgcHeroSprite', boss: 'dgcBossSprite', sudo: 'dgcSudoSprite' };
  function chibiEl(who) { return $(CHIBI_SPRITE_IDS[who]); }

  // The persistent "resting" expression a character should be wearing right
  // now when nothing transient is playing — driven entirely by real, already
  // -tracked combat state (HP%, the existing enrage-timer flag, phase index
  // + elapsed fight time), never a separate parallel state machine. This is
  // what flashExpression() reverts TO instead of a hardcoded 'idle'.
  function personaBaseExpression(who) {
    if (!state) return 'idle';
    var lateFight = state.phaseIdx === state.boss.phases.length - 1 &&
                    (Date.now() - state.fightStartTime) > 60000;
    // Character art v2 addendum, Section 2A — Determined-Intense: a
    // "next level" escalation of plain Determined, reserved for genuinely
    // high-stakes moments (a boss's final phase, or the Final Boss at
    // any point) — HP/pacing concerns (worried/tired) still take
    // precedence, this only escalates the everyday "focused" baseline.
    var highStakes = state.isFinalBoss || state.phaseIdx === state.boss.phases.length - 1;
    if (who === 'hero') {
      if (state.heroHpMax && state.heroHp / state.heroHpMax <= 0.25) return 'worried';
      if (lateFight) return 'tired';
      return highStakes ? 'determinedIntense' : 'determined';
    }
    if (who === 'boss') {
      if (state.bossEnraged) return 'angry'; // existing enrage-timer mechanic (danger-zone tick in startTimer)
      if (state.bossHpMax && state.bossHp / state.bossHpMax <= 0.25) return 'worried';
      if (lateFight) return 'tired';
      return 'idle';
    }
    if (who === 'sudo') {
      // Sudo shares the party's tension: reacts to the same boss-enrage /
      // hero-HP conditions rather than tracking its own separate ones.
      if (state.bossEnraged) return 'angry';
      if (state.heroHpMax && state.heroHp / state.heroHpMax <= 0.25) return 'worried';
      if (lateFight) return 'tired';
      return 'idle';
    }
    return 'idle';
  }

  // Auto-revert timers + a "don't stomp a reaction mid-flight" guard, per
  // character. HP-based (worried) / enrage-based (angry) / pacing-based
  // (tired) states are persistent baselines, re-asserted by
  // applyPersistentExpressions() — flashExpression()'s revert target is
  // WHATEVER that baseline currently is, not a hardcoded 'idle'.
  var exprTimers = {};
  var transientUntil = {};
  var baseExprCache = {};
  function flashExpression(who, exprName, ms) {
    var el = chibiEl(who);
    if (!el) return;
    var duration = ms || 1400;
    setExpression(el, exprName);
    transientUntil[who] = Date.now() + duration;
    clearTimeout(exprTimers[who]);
    exprTimers[who] = setTimeout(function () {
      delete transientUntil[who];
      var target = personaBaseExpression(who);
      baseExprCache[who] = target;
      setExpression(el, target);
    }, duration);
  }

  // Permanently pins a character's face to exprName — clearing any PENDING
  // flash-revert timer from an earlier reaction first. Without this, a hit
  // that both kills the hero AND was itself a flashed reaction (e.g. the
  // killing blow's own hurtHeavy) would have its revert timer fire ~1s
  // later and silently overwrite the "defeated"/"victorious" end-of-fight
  // pose with whatever the ordinary baseline is. Use for fight-ending faces
  // only — everything mid-fight should keep using flashExpression().
  function lockExpression(who, exprName) {
    clearTimeout(exprTimers[who]);
    delete exprTimers[who];
    delete transientUntil[who];
    baseExprCache[who] = exprName;
    var el = chibiEl(who);
    if (el) setExpression(el, exprName);
  }

  // Re-asserts each character's persistent baseline wherever it may have
  // changed (HP crossed a threshold, enrage flag flipped, fight dragged on)
  // — called from updateHpBars() and the per-second combat timer tick, i.e.
  // reusing those two existing update points rather than polling on its own.
  function applyPersistentExpressions() {
    if (!state) return;
    ['hero', 'boss', 'sudo'].forEach(function (who) {
      if (transientUntil[who] && Date.now() < transientUntil[who]) return; // a reaction is mid-flight — don't stomp it
      var target = personaBaseExpression(who);
      if (baseExprCache[who] !== target) {
        baseExprCache[who] = target;
        setExpression(chibiEl(who), target);
      }
    });
  }

  /* ============================================================
     WEAPON LAYER — a swappable layer, not baked into one fixed
     animation: the attack-swing CSS (.dgc-chibi-attacking .dgc-chibi-
     weapon) targets the WRAPPER class, not any one weapon's shapes, so
     a future Phase-4 Armory purchase only needs to add a new entry here
     and set save.equippedWeapon — no animation work required.
     ============================================================ */
  var HERO_WEAPONS = {
    keyboardBlaster: function () {
      return '<rect x="-2" y="-5" width="20" height="10" rx="2" class="dgc-weapon-body"/>' +
        '<circle cx="2" cy="0" r="1" class="dgc-weapon-key"/><circle cx="6" cy="0" r="1" class="dgc-weapon-key"/><circle cx="10" cy="0" r="1" class="dgc-weapon-key"/>' +
        '<rect x="16" y="-2" width="4" height="4" rx="1" class="dgc-weapon-muzzle"/>';
    },
    // Phase 4 — Armory-purchasable weapons. See WEAPON_SHOP for cost/
    // stat-effect metadata; these are purely the shape functions, same
    // "shape fn on the swappable anchor" pattern as the starter weapon.
    debugWrench: function () {
      return '<rect x="-2" y="-3" width="24" height="6" rx="2" class="dgc-weapon-wrench-handle"/>' +
        '<path d="M18 -7 Q29 -7 29 0 Q29 7 18 7 Q23 0 18 -7 Z" class="dgc-weapon-wrench-head"/>';
    },
    compilerBlade: function () {
      return '<rect x="-6" y="-2.5" width="7" height="5" rx="1" class="dgc-weapon-blade-hilt"/>' +
        '<path d="M0 0 L24 -3.5 L32 0 L24 3.5 Z" class="dgc-weapon-blade-edge"/>';
    },
    kernelHammer: function () {
      return '<rect x="-2" y="-2" width="22" height="4" rx="1" class="dgc-weapon-hammer-handle"/>' +
        '<rect x="18" y="-9" width="15" height="18" rx="2" class="dgc-weapon-hammer-head"/>';
    },
    rootAccessGauntlet: function () {
      return '<circle cx="18" cy="0" r="11" class="dgc-weapon-gauntlet-fist"/>' +
        '<circle cx="18" cy="0" r="4.5" class="dgc-weapon-gauntlet-core"/>';
    }
  };
  // Phase 4 — ARMORY shop metadata. `atkBonus` is a fractional multiplier
  // added directly alongside save.stats.attack wherever damage is
  // computed (see weaponAttackBonus() + its one call site in
  // resolveAnswer()), so every purchase is a REAL combat effect, not
  // cosmetic-only — per the master doc's explicit ask.
  var WEAPON_SHOP = [
    { id: 'keyboardBlaster', name: 'Keyboard Blaster', cost: 0, atkBonus: 0, desc: 'The trusty starter rig. Every hero begins here.' },
    { id: 'debugWrench', name: 'Debug Wrench', cost: 150, atkBonus: 0.03, desc: 'A stout wrench for beating bugs into submission.', effectLabel: '+3% ATK' },
    { id: 'compilerBlade', name: 'Compiler Blade', cost: 400, atkBonus: 0.06, desc: 'Forged from optimized bytecode. Cuts clean.', effectLabel: '+6% ATK' },
    { id: 'kernelHammer', name: 'Kernel Hammer', cost: 800, atkBonus: 0.10, desc: 'Strikes straight through ring 0.', effectLabel: '+10% ATK' },
    { id: 'rootAccessGauntlet', name: 'The Root Access Gauntlet', cost: 2000, atkBonus: 0.18, desc: 'Total control, total damage. The long-term goal.', effectLabel: '+18% ATK' }
  ];
  function weaponAttackBonus() {
    var w = WEAPON_SHOP.filter(function (w) { return w.id === save.equippedWeapon; })[0];
    return w ? w.atkBonus : 0;
  }

  /* ============================================================
     PHASE 4 — TAILOR shop metadata. Outfits are cosmetic by design
     (see chibiRoot()'s outfit-CSS block for the actual recolor/
     accessory), with ONE deliberate exception per the master doc:
     "Faster Shell" grants +5s on every question timer — see
     outfitFocusBonus() and its one call site in startTimer().
     ============================================================ */
  var OUTFIT_SHOP = [
    { id: 'default', name: 'Starter Fit', cost: 0, minLevel: 1, focusBonus: 0, desc: 'Whatever the current hero tier wears by default.' },
    { id: 'flannelDev', name: 'Flannel Dev', cost: 200, minLevel: 1, focusBonus: 0, desc: 'A warm, well-worn flannel. Purely a look.' },
    { id: 'cloudCloak', name: 'Cloud Cloak', cost: 500, minLevel: 8, focusBonus: 0, desc: 'A sky-and-forest cloak. Purely a look — a milestone reward for reaching level 8.' },
    { id: 'fasterShell', name: 'Faster Shell', cost: 650, minLevel: 12, focusBonus: 5, desc: 'A sleek, aerodynamic fit.', effectLabel: '+5s per question' }
  ];
  function outfitFocusBonus() {
    var o = OUTFIT_SHOP.filter(function (o) { return o.id === save.equippedOutfit; })[0];
    return o ? o.focusBonus : 0;
  }

  /* ============================================================
     SECTION 1C — MULTI-SLOT HERO CUSTOMIZATION. Weapon (above) and
     Outfit (above — a "full look" slot, covering the doc's own offered
     "bottoms/pants OR full outfit" either/or) are joined by 3 more
     independent slots: hair color, shoes, and a head accessory. All are
     cosmetic (no stat effects — those stay concentrated in weapons, per
     the master doc's original design split) and all layer on top of the
     current hero tier + expression rig without touching either.
     ============================================================ */
  var HAIR_SHOP = [
    { id: 'brown', name: 'Brown (Default)', cost: 0, color: '#4a2f1c', desc: 'The starter look.' },
    { id: 'black', name: 'Jet Black', cost: 80, color: '#1c1c1c', desc: 'Purely a look.' },
    { id: 'blonde', name: 'Blonde', cost: 80, color: '#d4a843', desc: 'Purely a look.' },
    { id: 'crimson', name: 'Crimson', cost: 120, color: '#8f2f27', desc: 'Purely a look.' },
    { id: 'teal', name: 'Teal', cost: 120, color: '#2f8f8a', desc: 'Purely a look.' }
  ];
  var SHOES_SHOP = [
    { id: 'default', name: 'Work Boots', cost: 0, desc: 'The starter look.' },
    { id: 'sneakers', name: 'Sneakers', cost: 60, desc: 'Purely a look.' },
    { id: 'goldCleats', name: 'Gold Cleats', cost: 200, desc: 'Purely a look — a flex, not a stat.' }
  ];
  // Head accessories are deliberately all ABOVE the hairline (cap/
  // headband/wizard hat) rather than anything near the eyes/mouth —
  // chosen specifically so an accessory can never obscure the 15+
  // expression system this game's whole character-visibility fix was
  // built to protect.
  var ACCESSORY_SHOP = [
    { id: 'none', name: 'No Accessory', cost: 0, minLevel: 1, desc: 'Nothing extra.' },
    { id: 'headband', name: 'Headband', cost: 50, minLevel: 1, desc: 'Purely a look.' },
    { id: 'cap', name: 'Baseball Cap', cost: 70, minLevel: 1, desc: 'Purely a look.' },
    { id: 'wizardHat', name: 'Wizard Hat', cost: 250, minLevel: 10, desc: 'Purely a look — a milestone reward for reaching level 10.' }
  ];
  function heroWeaponSVG() {
    var id = save.equippedWeapon || 'keyboardBlaster';
    var shapesFn = HERO_WEAPONS[id] || HERO_WEAPONS.keyboardBlaster;
    // Two nested groups: the outer carries the static hand position/angle
    // (an SVG attribute), the inner is what the attack-swing CSS animates
    // — animating the inner only means the CSS `transform` never has to
    // fight with (and silently replace) the outer's positioning attribute.
    return '<g class="dgc-chibi-weapon-anchor" transform="translate(74,92) rotate(14)">' +
      '<g class="dgc-chibi-weapon dgc-weapon-' + id + '">' + shapesFn() + '</g>' +
    '</g>';
  }

  /* ============================================================
     PHASE 3 — SHARED BOSS BODY ARCHETYPES. Five reusable silhouettes
     (construct/tentacled/multihead/ghost/humanoid) drawn ONCE, in the
     same 100x130 head-local coordinate space as hero/Sudo/Golem, so
     every one of the 8 new bosses + the Final Boss is a palette + a
     couple of extra accent shapes on top of an existing shape — never
     new geometry authoring per boss. Each archetype reuses the exact
     dgc-chibi-body/dgc-chibi-head class names Golem already established,
     so the existing per-kind CSS palette pattern (.dgc-chibi-<kind> ...)
     just keeps working unchanged for every new kind.
     ============================================================ */
  var BOSS_BODY_ARCHETYPES = {
    // Golem, Statekeeper — blocky, geometric, "constructed" silhouette.
    construct: function () {
      return '<ellipse class="dgc-chibi-shadow" cx="50" cy="120" rx="28" ry="6"/>' +
        '<path class="dgc-chibi-body" d="M28 102 L28 82 Q28 74 50 74 Q72 74 72 82 L72 92 Q50 98 28 92 Z"/>' +
        '<path class="dgc-chibi-body dgc-chibi-leg" d="M32 94 L32 108 Q32 113 39 113 Q46 113 46 108 L46 94 Z"/>' +
        '<path class="dgc-chibi-body dgc-chibi-leg" d="M54 94 L54 108 Q54 113 61 113 Q68 113 68 108 L68 94 Z"/>' +
        '<path class="dgc-chibi-body dgc-chibi-arm" d="M28 82 Q14 86 12 100 Q11 106 17 107 Q22 108 23 101 Q25 90 32 84 Z"/>' +
        '<path class="dgc-chibi-body dgc-chibi-arm" d="M72 82 Q86 86 88 100 Q89 106 83 107 Q78 108 77 101 Q75 90 68 84 Z"/>' +
        '<path class="dgc-chibi-head" d="M18 44 Q18 10 50 10 Q82 10 82 44 Q82 70 50 70 Q18 70 18 44 Z"/>' +
        '<path class="dgc-chibi-cracks" d="M30 30 L36 38 M70 28 L64 36 M50 58 L50 66" stroke-width="1.6" fill="none"/>';
    },
    // Container Kraken — a wide blob body with 3 curling tentacles (the
    // tentacles already read as visible lower limbs) plus 2 short grasping
    // arm-tentacles near the shoulders so the upper body isn't limbless.
    tentacled: function () {
      return '<ellipse class="dgc-chibi-shadow" cx="50" cy="122" rx="30" ry="6"/>' +
        '<path class="dgc-chibi-tentacle" d="M24 98 Q8 106 12 124 Q20 112 30 106 Z"/>' +
        '<path class="dgc-chibi-tentacle" d="M76 98 Q92 106 88 124 Q80 112 70 106 Z"/>' +
        '<path class="dgc-chibi-tentacle" d="M50 108 Q45 122 52 132 Q57 120 55 108 Z"/>' +
        '<path class="dgc-chibi-body dgc-chibi-arm" d="M25 78 Q12 82 14 96 Q19 90 27 86 Z"/>' +
        '<path class="dgc-chibi-body dgc-chibi-arm" d="M75 78 Q88 82 86 96 Q81 90 73 86 Z"/>' +
        '<path class="dgc-chibi-body" d="M23 94 Q21 66 50 64 Q79 66 77 94 Q77 110 50 114 Q23 110 23 94 Z"/>' +
        '<path class="dgc-chibi-head" d="M19 42 Q19 8 50 8 Q81 8 81 42 Q81 68 50 68 Q19 68 19 42 Z"/>';
    },
    // Merge Conflict Hydra — a central head + 2 smaller side heads.
    multihead: function () {
      return '<ellipse class="dgc-chibi-shadow" cx="50" cy="120" rx="28" ry="6"/>' +
        '<path class="dgc-chibi-body" d="M30 102 L30 84 Q30 76 50 76 Q70 76 70 84 L70 94 Q50 100 30 94 Z"/>' +
        '<path class="dgc-chibi-body dgc-chibi-leg" d="M34 96 L34 109 Q34 113 40 113 Q46 113 46 109 L46 96 Z"/>' +
        '<path class="dgc-chibi-body dgc-chibi-leg" d="M54 96 L54 109 Q54 113 60 113 Q66 113 66 109 L66 96 Z"/>' +
        '<path class="dgc-chibi-body dgc-chibi-arm" d="M30 84 Q17 88 15 100 Q14 105 19 106 Q23 107 24 101 Q26 92 33 87 Z"/>' +
        '<path class="dgc-chibi-body dgc-chibi-arm" d="M70 84 Q83 88 85 100 Q86 105 81 106 Q77 107 76 101 Q74 92 67 87 Z"/>' +
        '<circle class="dgc-chibi-side-head" cx="20" cy="54" r="13"/>' +
        '<circle class="dgc-chibi-side-head dgc-chibi-side-head-b" cx="80" cy="54" r="13"/>' +
        '<circle class="dgc-chibi-head" cx="50" cy="42" r="26"/>';
    },
    // Pipeline Phantom, Script Wraith — a robed shape with a tattered hem;
    // arms shown emerging from the robe's sleeves, legs stay hidden under
    // the hem by design (a floating robe silhouette, not a limbless blob).
    ghost: function () {
      return '<ellipse class="dgc-chibi-shadow" cx="50" cy="120" rx="24" ry="5"/>' +
        '<path class="dgc-chibi-body" d="M28 112 Q25 100 29 90 L29 76 Q29 66 50 66 Q71 66 71 76 L71 90 Q75 100 72 112 Q64 105 58 113 Q54 105 50 113 Q46 105 42 113 Q36 105 28 112 Z"/>' +
        '<path class="dgc-chibi-body dgc-chibi-arm" d="M29 84 Q17 88 16 100 Q15 105 20 106 Q24 107 25 101 Q26 92 33 88 Z"/>' +
        '<path class="dgc-chibi-body dgc-chibi-arm" d="M71 84 Q83 88 84 100 Q85 105 80 106 Q76 107 75 101 Q74 92 67 88 Z"/>' +
        '<circle class="dgc-chibi-head" cx="50" cy="42" r="26"/>';
    },
    // The Orchestrator, Packet Reaper, The Cloud Titan, 3AM Pager —
    // a plain humanoid silhouette; each gets its own extras/weapon/scale.
    humanoid: function () {
      return '<ellipse class="dgc-chibi-shadow" cx="50" cy="120" rx="27" ry="6"/>' +
        '<path class="dgc-chibi-body" d="M29 102 L29 83 Q29 75 50 75 Q71 75 71 83 L71 93 Q50 99 29 93 Z"/>' +
        '<path class="dgc-chibi-body dgc-chibi-leg" d="M33 95 L33 109 Q33 113 40 113 Q47 113 47 109 L47 95 Z"/>' +
        '<path class="dgc-chibi-body dgc-chibi-leg" d="M53 95 L53 109 Q53 113 60 113 Q67 113 67 109 L67 95 Z"/>' +
        '<path class="dgc-chibi-body dgc-chibi-arm" d="M29 83 Q16 87 14 100 Q13 106 19 107 Q23 108 24 101 Q26 91 33 86 Z"/>' +
        '<path class="dgc-chibi-body dgc-chibi-arm" d="M71 83 Q84 87 86 100 Q87 106 81 107 Q77 108 76 101 Q74 91 67 86 Z"/>' +
        '<circle class="dgc-chibi-head" cx="50" cy="42" r="26"/>';
    }
  };
  var BOSS_ARCHETYPE_BY_KIND = {
    golem: 'construct',
    kraken: 'tentacled',
    hydra: 'multihead',
    orchestrator: 'humanoid',
    phantom: 'ghost',
    reaper: 'humanoid',
    titan: 'humanoid',
    statekeeper: 'construct',
    wraith: 'ghost',
    pager: 'humanoid'
  };
  // Small, optional per-boss extras (a signature weapon/prop, or a couple
  // of extra accent shapes) — same "reusable rig + swappable layer"
  // spirit as the hero's own weapon system.
  var BOSS_EXTRAS = {
    orchestrator: function () {
      // Puppet-master arms + strings — no separate hand-held weapon; the
      // strings ARE this boss's signature prop.
      return '<path class="dgc-chibi-arm-stub" d="M29 88 Q14 82 8 68" fill="none" stroke-width="6" stroke-linecap="round"/>' +
        '<path class="dgc-chibi-arm-stub" d="M71 88 Q86 82 92 68" fill="none" stroke-width="6" stroke-linecap="round"/>' +
        '<path class="dgc-chibi-string" d="M8 68 L2 6 M92 68 L98 6" stroke-width="1" fill="none"/>';
    },
    reaper: function () {
      // Scythe — held like the hero's weapon, on its own swappable anchor.
      return '<g class="dgc-chibi-weapon-anchor" transform="translate(74,80) rotate(-18)">' +
        '<g class="dgc-chibi-weapon dgc-weapon-scythe">' +
          '<rect x="-1.5" y="-4" width="3" height="46" class="dgc-weapon-shaft"/>' +
          '<path d="M-1 -4 Q18 -14 24 4 Q10 2 -1 8 Z" class="dgc-weapon-blade"/>' +
        '</g>' +
      '</g>';
    },
    titan: function () {
      // Armor plating accents — "towering, more elaborate" per its brief.
      return '<path class="dgc-chibi-armor-plate" d="M29 84 L38 78 L38 96 L29 100 Z"/>' +
        '<path class="dgc-chibi-armor-plate" d="M71 84 L62 78 L62 96 L71 100 Z"/>';
    },
    pager: function () {
      // Chain/cable motifs — the Final Boss's signature, most elaborate look.
      return '<path class="dgc-chibi-chain" d="M22 78 Q14 90 22 100 Q30 110 22 120" fill="none" stroke-width="2"/>' +
        '<path class="dgc-chibi-chain" d="M78 78 Q86 90 78 100 Q70 110 78 120" fill="none" stroke-width="2"/>' +
        '<circle class="dgc-chibi-pager-light" cx="50" cy="90" r="5"/>';
    },
    wraith: function () {
      // Glitch/text-fragment motifs — small floating code-shard rects.
      return '<g class="dgc-chibi-glitch-frag"><rect x="12" y="30" width="7" height="3"/><rect x="82" y="50" width="6" height="3"/><rect x="8" y="70" width="5" height="3"/></g>';
    }
  };

  /* ============================================================
     SECTION 3A — CHARACTER SELECTION. 3 distinct heroes sharing the
     exact same rig/proportions/tier/outfit/weapon/customization/combat
     systems — they differ through hair STYLE (a real silhouette, not
     just a color swap; hair COLOR stays the independent Section-1C
     customization slot and layers on top of whichever shape is picked
     here), one small signature detail kept well clear of the face and
     of the equippable accessory slot's headspace, and a default
     personality expression used on non-combat/menu screens only (combat
     logic itself is identical for all 3 — see personaBaseExpression()).
     ============================================================ */
  var HERO_CHARACTERS = {
    byte: { id: 'byte', name: 'Byte', tagline: 'Confident. A little smug about it.', menuExpr: 'confident' },
    nova: { id: 'nova', name: 'Nova', tagline: 'Earnest. Wide-eyed. All in.', menuExpr: 'happy' },
    // Section 2A — Sage's default now uses the new "calm" expression (a
    // softer, second positive resting state) instead of plain idle,
    // since Sage's whole personality read IS "calm" — a real use of the
    // new expression, not just an addition nobody ever triggers.
    sage: { id: 'sage', name: 'Sage', tagline: 'Calm, cool, unbothered.', menuExpr: 'calm' }
  };
  var HERO_CHARACTER_ORDER = ['byte', 'nova', 'sage'];
  function currentCharacterId() { return (save.selectedCharacterId && HERO_CHARACTERS[save.selectedCharacterId]) ? save.selectedCharacterId : 'byte'; }
  // Hair shapes + each character's one small signature detail, all drawn
  // in the SAME head-local coordinate space as the (now-corrected)
  // hero proportions above (head cx=50 cy=42 r=23).
  var HERO_HAIR_SHAPES = {
    // Byte — a spiky, confident silhouette + a small ear stud (kept low,
    // well clear of both the face and the equippable-accessory headspace).
    byte: function () {
      return '<path class="dgc-chibi-hair" d="M25 40 L21 20 L30 30 L34 14 L42 27 L50 12 L58 27 L66 14 L70 30 L79 20 L75 40 Q68 26 50 26 Q32 26 25 40 Z"/>' +
        '<circle class="dgc-chibi-signature" cx="26" cy="45" r="1.8"/>';
    },
    // Nova — rounded top + a side ponytail swept out and tied off (the
    // "tie" IS the signature detail, built right into the hair shape).
    nova: function () {
      return '<path class="dgc-chibi-hair" d="M25 38 Q25 16 50 16 Q75 16 75 38 Q68 26 50 26 Q32 26 25 38 Z"/>' +
        '<path class="dgc-chibi-hair" d="M71 28 Q89 32 87 52 Q82 57 79 46 Q76 34 67 29 Z"/>' +
        '<circle class="dgc-chibi-signature" cx="80" cy="40" r="2.2"/>';
    },
    // Sage — an asymmetric, swept-side, unbothered look + a small collar
    // clip (near the collar, nowhere near the face).
    sage: function () {
      return '<path class="dgc-chibi-hair" d="M25 40 Q22 17 50 15 Q73 16 76 34 Q60 19 44 22 Q29 25 25 40 Z"/>' +
        '<rect class="dgc-chibi-signature" x="47" y="76" width="6" height="3" rx="1"/>';
    }
  };

  /* ============================================================
     SECTION 3A — OVERWORLD SPRITE (Pokemon-Emerald-style small roaming
     figure for the explorable City — Phase 4 Section 1B). Deliberately a
     SEPARATE, much-simplified rig from the full portrait chibi above
     (small blob body/head, minimal detail) rather than just shrinking
     the portrait, per the doc's own "portrait for fights/menus, small
     overworld sprite specifically for roaming the town" split. Every
     character gets its own tiny hair silhouette in 3 direction groups
     (down/up/side); "left" vs "right" reuses the SAME side group,
     mirrored via the City movement code's existing scaleX(-1) facing
     wrapper — no need for a 4th drawn variant.
     ============================================================ */
  var HERO_OVERWORLD_HAIR = {
    byte: {
      down: '<path class="dgc-ow-hair" d="M9 15 L6 6 L12 10 L14 3 L18 9 L20 2 L22 9 L26 3 L28 10 L34 6 L31 15 Q26 11 20 11 Q14 11 9 15 Z"/>',
      up:   '<path class="dgc-ow-hair" d="M8 16 Q8 3 20 3 Q32 3 32 16 Q32 22 20 22 Q8 22 8 16 Z"/>',
      side: '<path class="dgc-ow-hair" d="M7 15 L4 6 L9 9 L11 2 L16 9 L20 2 L24 9 L27 4 L26 13 Q22 10 17 11 Q11 12 7 15 Z"/>'
    },
    nova: {
      down: '<path class="dgc-ow-hair" d="M9 15 Q9 4 20 4 Q31 4 31 15 Q27 11 20 11 Q13 11 9 15 Z"/><path class="dgc-ow-hair" d="M29 11 Q37 13 36 22 Q33 24 32 18 Q30 13 26 11 Z"/>',
      up:   '<path class="dgc-ow-hair" d="M8 16 Q8 3 20 3 Q32 3 32 16 Q32 22 20 22 Q8 22 8 16 Z"/><path class="dgc-ow-hair" d="M29 11 Q37 13 36 22 Q33 24 32 18 Q30 13 26 11 Z"/>',
      side: '<path class="dgc-ow-hair" d="M7 15 Q7 4 18 4 Q26 5 27 13 Q22 10 16 11 Q10 12 7 15 Z"/><path class="dgc-ow-hair" d="M25 10 Q33 12 32 21 Q29 23 28 17 Q26 12 22 10 Z"/>'
    },
    sage: {
      down: '<path class="dgc-ow-hair" d="M9 15 Q7 5 20 4 Q29 5 30 12 Q23 8 16 9 Q11 10 9 15 Z"/>',
      up:   '<path class="dgc-ow-hair" d="M8 16 Q8 3 20 3 Q32 3 32 16 Q32 22 20 22 Q8 22 8 16 Z"/>',
      side: '<path class="dgc-ow-hair" d="M7 15 Q5 5 17 4 Q25 5 26 11 Q20 7 14 9 Q9 10 7 15 Z"/>'
    }
  };
  function overworldSpriteSVG(kind) {
    var isHero = kind === 'hero';
    // Character-art fix: visible legs + arms on the small walk-around
    // sprite too, tagged with their own l/r classes so the walk-cycle
    // CSS (scoped to .dgc-city-*-token.dgc-city-walking) can swing them
    // in alternating stride/counter-rhythm while dgc-city-walking is set,
    // and snap back to this static idle pose the instant it's removed.
    var legs = '<ellipse class="dgc-ow-leg dgc-ow-leg-l" cx="15" cy="48" rx="3.4" ry="5.5"/>' +
      '<ellipse class="dgc-ow-leg dgc-ow-leg-r" cx="25" cy="48" rx="3.4" ry="5.5"/>';
    var arms = '<ellipse class="dgc-ow-arm dgc-ow-arm-l" cx="8" cy="36" rx="3.2" ry="6.5"/>' +
      '<ellipse class="dgc-ow-arm dgc-ow-arm-r" cx="32" cy="36" rx="3.2" ry="6.5"/>';
    var bodyBlob = legs + arms + '<ellipse class="dgc-ow-body" cx="20" cy="39" rx="11" ry="9"/>';
    var headCircle = '<circle class="dgc-ow-head" cx="20" cy="16" r="11"/>';
    var hair = isHero ? (HERO_OVERWORLD_HAIR[currentCharacterId()] || HERO_OVERWORLD_HAIR.byte) : null;
    var down, up, side;
    if (isHero) {
      down = bodyBlob + headCircle + '<circle class="dgc-ow-eye" cx="17" cy="16" r="1.4"/><circle class="dgc-ow-eye" cx="23" cy="16" r="1.4"/>' + hair.down;
      up = bodyBlob + headCircle + hair.up;
      side = bodyBlob + headCircle + '<circle class="dgc-ow-eye" cx="25" cy="16" r="1.4"/>' + hair.side;
    } else {
      // Sudo: no hair — a small glowing visor instead, same 3-group
      // pattern (visor visible from the front/side, hidden from behind).
      down = bodyBlob + headCircle + '<circle class="dgc-ow-visor" cx="20" cy="16" r="6"/>';
      up = bodyBlob + headCircle;
      side = bodyBlob + headCircle + '<circle class="dgc-ow-visor" cx="24" cy="16" r="5"/>';
    }
    var hairAttr = isHero ? ' data-hair="' + (save.equippedHair || 'brown') + '"' : '';
    return '<svg class="dgc-overworld-sprite dgc-overworld-' + kind + '"' + hairAttr + ' viewBox="0 0 40 56" data-facing="down">' +
      '<g class="dgc-ow-dir dgc-ow-down">' + down + '</g>' +
      '<g class="dgc-ow-dir dgc-ow-up">' + up + '</g>' +
      '<g class="dgc-ow-dir dgc-ow-side">' + side + '</g>' +
    '</svg>';
  }
  // cityHero.facing is 'up'/'down'/'left'/'right'; the overworld sprite
  // only draws 3 groups (left and right share "side", mirrored via the
  // existing scaleX facing wrapper) — this maps one to the other.
  function overworldFacingGroup(facing) { return (facing === 'left' || facing === 'right') ? 'side' : facing; }

  /* ============================================================
     LIVING CITY ADDENDUM — NPCs. Every NPC reuses the EXACT SAME shared
     pieces as the hero: the generic humanoid body/head silhouette, the
     shared facePartsSVG()/EXPRESSIONS/setExpression() system (so an NPC
     genuinely changes eyes/eyebrows/mouth/blush per expression, not a
     simplified face), and — for 6 of the 15 — the hero's own hair-shape
     generators. Only 3 new hair silhouettes and a small reusable
     accessory-shape library were authored new; everything else is reuse
     + recolor, which is what makes 15 distinct, fully-realized NPCs
     tractable at all.
     ============================================================ */
  var NPC_HAIR_SHAPES = {
    bun: function () {
      return '<path class="dgc-chibi-hair" d="M27 38 Q27 20 50 20 Q73 20 73 38 Q66 27 50 27 Q34 27 27 38 Z"/>' +
        '<circle class="dgc-chibi-hair" cx="50" cy="15" r="7"/>';
    },
    buzzcut: function () {
      return '<path class="dgc-chibi-hair" d="M28 30 Q28 19 50 19 Q72 19 72 30 Q72 24 50 24 Q28 24 28 30 Z"/>';
    },
    pigtails: function () {
      return '<path class="dgc-chibi-hair" d="M27 38 Q27 19 50 19 Q73 19 73 38 Q66 27 50 27 Q34 27 27 38 Z"/>' +
        '<ellipse class="dgc-chibi-hair" cx="20" cy="36" rx="6" ry="11"/>' +
        '<ellipse class="dgc-chibi-hair" cx="80" cy="36" rx="6" ry="11"/>' +
        '<path class="dgc-chibi-npc-sig" d="M16 27 l1.4 3 3 1.4 -3 1.4 -1.4 3 -1.4 -3 -3 -1.4 3 -1.4 z"/>';
    },
    // Roof cast hair (Plan F stage 2)
    long: function () {
      return '<path class="dgc-chibi-hair" d="M25 40 Q23 16 50 16 Q77 16 75 40 L78 66 Q72 69 70 60 L70 40 Q62 26 50 26 Q38 26 30 40 L30 60 Q28 69 22 66 Z"/>';
    },
    curly: function () {
      return '<circle class="dgc-chibi-hair" cx="33" cy="23" r="8.5"/><circle class="dgc-chibi-hair" cx="50" cy="18" r="10"/><circle class="dgc-chibi-hair" cx="67" cy="23" r="8.5"/><circle class="dgc-chibi-hair" cx="26" cy="36" r="6"/><circle class="dgc-chibi-hair" cx="74" cy="36" r="6"/>';
    },
    bob: function () {
      return '<path class="dgc-chibi-hair" d="M24 48 Q21 15 50 14 Q79 15 76 48 L71 50 Q70 31 50 26 Q30 31 29 50 Z"/>';
    },
    slick: function () {
      return '<path class="dgc-chibi-hair" d="M26 38 Q27 16 52 16 Q75 17 74 37 Q64 22 42 27 Q30 30 26 38 Z"/><path class="dgc-chibi-hair" d="M52 16 Q62 9 71 16 Q62 15 52 16 Z"/>';
    }
  };
  // Kept to the same discipline as the hero's own accessories: everything
  // sits above the hairline or on the body — never over the eyes/mouth.
  var NPC_ACCESSORY_SHAPES = {
    none: function () { return ''; },
    apron: function () { return '<path class="dgc-chibi-npc-acc" d="M40 88 L50 100 L60 88" fill="none" stroke-width="4" stroke-linecap="round"/>'; },
    headband: function () { return '<path class="dgc-chibi-npc-acc" d="M25 33 Q50 24 75 33 L75 38 Q50 30 25 38 Z"/>'; },
    cap: function () { return '<path class="dgc-chibi-npc-acc" d="M20 22 Q50 0 80 22 L80 29 Q50 15 20 29 Z"/>'; },
    lanyard: function () { return '<rect class="dgc-chibi-npc-acc" x="46" y="90" width="8" height="11" rx="1"/><line x1="50" y1="82" x2="50" y2="90" stroke-width="1.4"/>'; },
    headphones: function () { return '<path class="dgc-chibi-npc-acc" d="M24 30 Q24 7 50 7 Q76 7 76 30" fill="none" stroke-width="3"/><circle class="dgc-chibi-npc-acc" cx="24" cy="34" r="5"/><circle class="dgc-chibi-npc-acc" cx="76" cy="34" r="5"/>'; },
    scarf: function () { return '<path class="dgc-chibi-npc-acc" d="M36 82 Q50 90 64 82 L61 94 Q50 98 39 94 Z"/>'; },
    book: function () { return '<rect class="dgc-chibi-npc-acc" x="68" y="86" width="10" height="13" rx="1"/><line x1="73" y1="87" x2="73" y2="98" stroke-width="0.6"/>'; },
    chefhat: function () { return '<path class="dgc-chibi-npc-acc" d="M32 22 Q27 4 40 5 Q42 -3 50 -3 Q58 -3 60 5 Q73 4 68 22 Z"/>'; },
    earpiece: function () { return '<circle class="dgc-chibi-npc-acc" cx="76" cy="38" r="2"/><path d="M76 38 Q81 43 78 49" fill="none" stroke-width="1"/>'; },
    // Roof cast accessories (Plan F stage 2)
    bowtie: function () { return '<path class="dgc-chibi-npc-acc" d="M50 84 L43 80 L43 88 Z M50 84 L57 80 L57 88 Z"/><circle class="dgc-chibi-npc-acc" cx="50" cy="84" r="1.8"/>'; },
    tie: function () { return '<path class="dgc-chibi-npc-acc" d="M47.5 78 L52.5 78 L54 84 L52.5 98 L50 101 L47.5 98 L46 84 Z"/>'; },
    flower: function () { return '<circle class="dgc-chibi-npc-acc" cx="30" cy="27" r="3.2"/><circle class="dgc-chibi-npc-acc" cx="26.4" cy="24" r="2.4"/><circle class="dgc-chibi-npc-acc" cx="33.6" cy="23.6" r="2.4"/><circle cx="30" cy="26" r="1.2" fill="#fff8e4" stroke="none"/>'; },
    shades: function () { return '<rect class="dgc-chibi-npc-acc" x="30" y="19" width="16" height="7" rx="2.5"/><rect class="dgc-chibi-npc-acc" x="54" y="19" width="16" height="7" rx="2.5"/><path d="M46 22.5 L54 22.5" fill="none" stroke-width="1.6"/>'; },
    necklace: function () { return '<path class="dgc-chibi-npc-acc" d="M38 78 Q50 92 62 78" fill="none" stroke-width="2.6" stroke-dasharray="1.6 2.4" stroke-linecap="round"/>'; }
  };
  // Renders one NPC's full portrait rig (used both for the walk-around
  // City sprite at small size AND the dialogue-box portrait at a bigger
  // size — same rig, same expression system, just a different container
  // size, exactly like hero portrait vs. overworld sprite already do).
  function npcChibiRoot(npc) {
    var hairFn = (HERO_HAIR_SHAPES[npc.hair] || NPC_HAIR_SHAPES[npc.hair] || HERO_HAIR_SHAPES.byte);
    var accFn = NPC_ACCESSORY_SHAPES[npc.accessory] || NPC_ACCESSORY_SHAPES.none;
    var body =
      '<ellipse class="dgc-chibi-shadow" cx="50" cy="118" rx="26" ry="6"/>' +
      '<path class="dgc-chibi-body" d="M28 98 Q28 74 50 74 Q72 74 72 98 L72 100 Q50 105 28 100 Z" fill="' + npc.bodyColor + '" stroke="' + npc.trimColor + '" stroke-width="1.4"/>' +
      // Same visible-limbs fix as the hero rig: legs + arms + hands, drawn
      // with the NPC's own body/skin colors so they match this NPC's
      // palette, and tagged .dgc-ow-leg/.dgc-ow-arm-equivalent classes
      // (dgc-chibi-leg/dgc-chibi-arm) so the walk-cycle CSS below can
      // animate them while this exact rig doubles as the City wander sprite.
      '<path class="dgc-chibi-leg dgc-chibi-leg-left" d="M33 98 L33 111 Q33 115 39 115 Q45 115 45 111 L45 98 Z" fill="' + npc.bodyColor + '" stroke="' + npc.trimColor + '" stroke-width="1.4"/>' +
      '<path class="dgc-chibi-leg dgc-chibi-leg-right" d="M55 98 L55 111 Q55 115 61 115 Q67 115 67 111 L67 98 Z" fill="' + npc.bodyColor + '" stroke="' + npc.trimColor + '" stroke-width="1.4"/>' +
      '<path class="dgc-chibi-arm dgc-chibi-arm-left" d="M30 80 Q17 84 15 97 Q14 103 19 105 Q23 106 24 100 Q26 89 34 83 Z" fill="' + npc.bodyColor + '" stroke="' + npc.trimColor + '" stroke-width="1.4"/>' +
      '<circle class="dgc-chibi-hand" cx="18" cy="102" r="6" fill="' + npc.skinColor + '"/>' +
      '<path class="dgc-chibi-arm dgc-chibi-arm-right" d="M70 80 Q83 84 85 97 Q86 103 81 105 Q77 106 76 100 Q74 89 66 83 Z" fill="' + npc.bodyColor + '" stroke="' + npc.trimColor + '" stroke-width="1.4"/>' +
      '<circle class="dgc-chibi-hand" cx="82" cy="102" r="6" fill="' + npc.skinColor + '"/>' +
      '<circle class="dgc-chibi-head" cx="50" cy="42" r="23" fill="' + npc.skinColor + '"/>' +
      '<g fill="' + npc.hairColor + '">' + hairFn() + '</g>' +
      '<ellipse class="dgc-chibi-blush" cx="33" cy="49" rx="5" ry="3"/>' +
      '<ellipse class="dgc-chibi-blush" cx="67" cy="49" rx="5" ry="3"/>' +
      '<g fill="' + npc.accColor + '" stroke="' + npc.accColor + '">' + accFn() + '</g>';
    return '<svg class="dgc-chibi dgc-chibi-npc" data-npc="' + npc.id + '" viewBox="0 0 100 130" data-expr="idle">' +
      body +
      '<g class="dgc-chibi-face">' + facePartsSVG() + '</g>' +
    '</svg>';
  }

  /* ============================================================
     THE 15 NPCS. Each has a real identity/role, a loose topic lean
     (source content follows the master doc's own research constraints —
     real, practical, interview-relevant, no invented trivia), and 6-8
     genuinely distinct teaching points. Positions are laid out across
     the City's 3 zones (Town Square around the existing 5 buildings;
     Training Grounds around its existing marker; Residential District in
     the newly-widened east side of the map) rather than clustered.
     expr: { idle, talk, happy, react } — 4 of the shared EXPRESSIONS
     table's names, per NPC, satisfying the "3-4 expressions, same
     facial-completeness standard as the hero" requirement without a
     single new face shape.
     ============================================================ */

  /* ============================================================
     // === DIALOGUE ENGINE ===
     Generic, DOM-free "never the same line twice" picker. Used by the
     city NPCs now; house residents / roof people can call it later.
     A character record has  dialogue: { intro, lines }  (a plain array is
     still accepted and treated as `lines`). Each entry of `lines` is a
     string, or { t:"text {hero} {level} {coins} {bosses} {streak}",
     if:{ minLevel, maxLevel, bosses, streak, coins, night, hero, visited,
     firstMeet }, once:true }. Conditional lines (those with `if`) fire
     when their condition matches and they are unused (once is the default);
     plain lines come out of a shuffled bag that never repeats until every
     plain line has been heard.
     State (persisted in save): dialogueBag[charId] = { used:[plain idx],
     condUsed:[cond idx], seen:[every idx heard, -1 = intro], last:idx },
     talked[charId] = number of conversations, visited[key] = true.
     ============================================================ */
  function markVisited(key) {
    if (!save.visited || typeof save.visited !== 'object') save.visited = {};
    if (!save.visited[key]) { save.visited[key] = true; persist(); }
  }
  function dialogueStateFor(charId) {
    var bag = (save.dialogueBag && save.dialogueBag[charId]) || {};
    return {
      talked: (save.talked && save.talked[charId]) || 0,
      used: (bag.used || []).slice(),
      condUsed: (bag.condUsed || []).slice(),
      seen: (bag.seen || []).slice(),
      last: typeof bag.last === 'number' ? bag.last : null
    };
  }
  function dlgContext() {
    var h = new Date().getHours();
    var cid = save.selectedCharacterId;
    return {
      level: save.level || 1,
      coins: save.coins || 0,
      bosses: (save.bossesDefeated || []).length,
      streak: save.currentDailyStreak || 0,
      night: (h >= 19 || h < 5),
      hero: (typeof HERO_CHARACTERS !== 'undefined' && cid && HERO_CHARACTERS[cid]) ? cid : null,
      heroName: (typeof HERO_CHARACTERS !== 'undefined' && cid && HERO_CHARACTERS[cid]) ? HERO_CHARACTERS[cid].name : 'friend',
      visited: save.visited || {}
    };
  }
  // Declarative condition check — no eval. Every key present must hold.
  function dlgCondMatches(cond, ctx, talked) {
    for (var k in cond) {
      if (!Object.prototype.hasOwnProperty.call(cond, k)) continue;
      var v = cond[k];
      if (k === 'minLevel') { if (!(ctx.level >= v)) return false; }
      else if (k === 'maxLevel') { if (!(ctx.level <= v)) return false; }
      else if (k === 'bosses') { if (!(ctx.bosses >= v)) return false; }
      else if (k === 'streak') { if (!(ctx.streak >= v)) return false; }
      else if (k === 'coins') { if (!(ctx.coins >= v)) return false; }
      else if (k === 'night') { if (!!v !== ctx.night) return false; }
      else if (k === 'hero') { if (ctx.hero !== v) return false; }
      else if (k === 'visited') { if (!ctx.visited[v]) return false; }
      else if (k === 'firstMeet') { if (!!v !== !talked) return false; }
      else return false; // unknown key never matches
    }
    return true;
  }
  function dlgFill(text, ctx) {
    return String(text).replace(/\{(hero|level|coins|bosses|streak)\}/g, function (m, key) {
      return key === 'hero' ? ctx.heroName : String(ctx[key]);
    });
  }
  function dlgPool(def) {
    var d = def.dialogue;
    var lines = Array.isArray(d) ? d : ((d && d.lines) || []);
    var pool = { intro: (!Array.isArray(d) && d && d.intro) ? d.intro : null, plain: [], cond: [], lines: lines };
    lines.forEach(function (ln, i) {
      if (typeof ln === 'string') pool.plain.push(i);
      else if (ln && ln.if) pool.cond.push(i);
      else if (ln) pool.plain.push(i);
    });
    return pool;
  }
  function dlgText(pool, i) {
    var ln = pool.lines[i];
    return typeof ln === 'string' ? ln : ln.t;
  }
  // opts (optional, for tests): { rng:fn, ctx:obj }
  function pickLine(charId, def, opts) {
    opts = opts || {};
    var rng = opts.rng || Math.random;
    var ctx = opts.ctx || dlgContext();
    var pool = dlgPool(def);
    if (!save.dialogueBag || typeof save.dialogueBag !== 'object') save.dialogueBag = {};
    if (!save.talked || typeof save.talked !== 'object') save.talked = {};
    var bag = save.dialogueBag[charId];
    if (!bag || typeof bag !== 'object') bag = save.dialogueBag[charId] = {};
    if (!Array.isArray(bag.used)) bag.used = [];
    if (!Array.isArray(bag.condUsed)) bag.condUsed = [];
    if (!Array.isArray(bag.seen)) bag.seen = [];
    if (typeof bag.last !== 'number') bag.last = null;
    var talked = save.talked[charId] || 0;
    var idx = null, isIntro = false, reactive = false, i;

    if (!talked && pool.intro) {
      isIntro = true; idx = -1;
    } else {
      // (2) an unused conditional line whose condition matches right now
      var matches = pool.cond.filter(function (ci) {
        var ln = pool.lines[ci];
        var once = ln.once !== false;
        if (once && bag.condUsed.indexOf(ci) !== -1) return false;
        if (ci === bag.last) return false;
        return dlgCondMatches(ln.if, ctx, talked);
      });
      if (matches.length) {
        idx = matches[Math.floor(rng() * matches.length)];
        reactive = true;
        if (pool.lines[idx].once !== false) bag.condUsed.push(idx);
      } else if (pool.plain.length) {
        // (3) shuffled bag of plain lines
        var unused = pool.plain.filter(function (pi) { return bag.used.indexOf(pi) === -1; });
        if (!unused.length) {
          bag.used = [];
          unused = pool.plain.filter(function (pi) { return pi !== bag.last; });
          if (!unused.length) unused = pool.plain.slice();
        }
        idx = unused[Math.floor(rng() * unused.length)];
        bag.used.push(idx);
      }
    }
    if (idx === null) { idx = -1; isIntro = false; }
    if (bag.seen.indexOf(idx) === -1) bag.seen.push(idx);
    bag.last = idx;
    save.talked[charId] = talked + 1;
    if (!save.npcLastLineIndex || typeof save.npcLastLineIndex !== 'object') save.npcLastLineIndex = {};
    save.npcLastLineIndex[charId] = Math.max(0, idx);
    if (!opts.noPersist) persist();
    var text = isIntro ? pool.intro : (idx >= 0 ? dlgText(pool, idx) : '...');
    var total = pool.lines.length + (pool.intro ? 1 : 0);
    return { text: dlgFill(text, ctx), index: idx, total: total, heard: bag.seen.length, isIntro: isIntro, reactive: reactive };
  }
  // Merge NPC_DIALOGUE_DATA into NPC_ROSTER: existing 8 tip lines stay first.
  NPC_ROSTER.forEach(function (npc) {
    var extra = NPC_DIALOGUE_DATA[npc.id];
    if (!extra || !Array.isArray(npc.dialogue)) return;
    npc.dialogue = { intro: extra.intro, lines: npc.dialogue.concat(extra.more, extra.cond) };
  });
  // === END DIALOGUE ENGINE ===

  var chibiIdCounter = 0;
  function chibiRoot(kind) {
    // kind: 'hero' | 'sudo' | 'golem' — selects body/head silhouette + palette.
    // Auto-generates a unique gradient id per call since the same
    // character can appear more than once in the DOM at a time (e.g.
    // the hero on both the title screen and the boss-select screen).
    chibiIdCounter++;
    var idAttr = 'dgcChibi' + chibiIdCounter;
    var body = '';
    if (kind === 'hero') {
      body =
        '<ellipse class="dgc-chibi-shadow" cx="50" cy="118" rx="26" ry="6"/>' +
        // Tier 5 (DevOps Wizard) only — a real silhouette change, not just a
        // recolor, sitting BEHIND the body. Hidden by default via CSS.
        '<path class="dgc-chibi-cape" d="M28 84 Q20 105 25 118 L37 108 Q33 94 37 82 Z M72 84 Q80 105 75 118 L63 108 Q67 94 63 82 Z"/>' +
        // Art-direction update — proportions moved away from exaggerated
        // chibi scale toward the reference's more normal head-to-shoulders
        // ratio: head shrunk (r 27->23) and the body enlarged/widened to
        // compensate, rather than a big head on a tiny frame. Every other
        // coordinate-dependent shape below (collar/badge/aura/sparkle/
        // outfit accents/accessories) was re-derived to match this new
        // head/body geometry — see each shape's own adjusted coordinates.
        '<path class="dgc-chibi-body" d="M28 98 Q28 74 50 74 Q72 74 72 98 L72 100 Q50 105 28 100 Z"/>' +
        // Character-art-direction fix — visible arms/hands and legs, drawn
        // as extra shapes sharing the .dgc-chibi-body/.dgc-chibi-head
        // classes so they automatically pick up every existing per-kind/
        // per-outfit palette rule (body recolor, tier stroke, etc.) with
        // zero new CSS needed per hero tier/outfit. Arms are their own
        // class too (dgc-chibi-arm-left/-right) purely so the attack
        // animation can target the weapon-holding arm specifically.
        '<path class="dgc-chibi-body dgc-chibi-leg" d="M33 98 L33 111 Q33 115 39 115 Q45 115 45 111 L45 98 Z"/>' +
        '<path class="dgc-chibi-body dgc-chibi-leg" d="M55 98 L55 111 Q55 115 61 115 Q67 115 67 111 L67 98 Z"/>' +
        '<path class="dgc-chibi-body dgc-chibi-arm dgc-chibi-arm-left" d="M30 80 Q17 84 15 97 Q14 103 19 105 Q23 106 24 100 Q26 89 34 83 Z"/>' +
        '<circle class="dgc-chibi-head dgc-chibi-hand" cx="18" cy="102" r="6"/>' +
        '<path class="dgc-chibi-body dgc-chibi-arm dgc-chibi-arm-right" d="M70 80 Q80 83 80 92 Q80 96 75 96 Q72 96 71 91 Q70 86 66 83 Z"/>' +
        '<circle class="dgc-chibi-head dgc-chibi-hand" cx="76" cy="92" r="6"/>' +
        '<circle class="dgc-chibi-head" cx="50" cy="42" r="23"/>' +
        // Section 3A — hair shape (+ signature detail) now depends on the
        // selected character; color still comes from the independent
        // Section-1C hair-color customization slot via [data-hair=...].
        (HERO_HAIR_SHAPES[currentCharacterId()] || HERO_HAIR_SHAPES.byte)() +
        // Art-direction update — soft blush/cheek marks, drawn once and
        // always visible (not part of the expression-swap system: the
        // reference style keeps these present across nearly every
        // expression, so they live on the static head rather than being
        // duplicated into all 15+ face-part variants).
        '<ellipse class="dgc-chibi-blush" cx="33" cy="49" rx="5" ry="3"/>' +
        '<ellipse class="dgc-chibi-blush" cx="67" cy="49" rx="5" ry="3"/>' +
        // Tier accents (Phase 2) — each hidden by default, revealed
        // cumulatively per tier via CSS (see .dgc-chibi-hero[data-tier=...]),
        // so higher tiers visibly carry more detail than the last.
        '<path class="dgc-chibi-collar-glow" d="M36 78 Q50 86 64 78" fill="none" stroke-width="2.5" stroke-linecap="round"/>' +
        '<circle class="dgc-chibi-badge" cx="50" cy="90" r="4"/>' +
        '<circle class="dgc-chibi-shoulder-aura" cx="50" cy="84" r="23" fill="none" stroke-width="1.4"/>' +
        '<g class="dgc-chibi-tier-sparkle"><path d="M20 86 l1.4 3 3 1.4 -3 1.4 -1.4 3 -1.4 -3 -3 -1.4 3 -1.4 z"/><path d="M80 80 l1.1 2.4 2.4 1.1 -2.4 1.1 -1.1 2.4 -1.1 -2.4 -2.4 -1.1 2.4 -1.1 z"/></g>' +
        // Phase 4 — Tailor outfit accessories: drawn once, hidden by
        // default, revealed per-outfit via CSS (.dgc-chibi-hero[data-
        // outfit=...]) exactly like the tier-accent pattern above, so an
        // outfit works layered on top of ANY tier's look without needing
        // per-tier outfit art.
        '<path class="dgc-chibi-outfit-scarf" d="M36 80 Q50 88 64 80 L61 92 Q50 96 39 92 Z"/>' +
        '<path class="dgc-chibi-outfit-cloak" d="M28 86 Q20 106 25 118 L36 110 Q32 96 36 84 Z M72 86 Q80 106 75 118 L64 110 Q68 96 64 84 Z"/>' +
        '<path class="dgc-chibi-outfit-visor" d="M27 36 Q50 30 73 36 L73 42 Q50 37 27 42 Z"/>' +
        // Section 1C — shoes: always drawn (everyone wears SOME shoes),
        // recolored per save.equippedShoes via CSS.
        '<ellipse class="dgc-chibi-shoes" cx="38" cy="115" rx="7" ry="4"/>' +
        '<ellipse class="dgc-chibi-shoes" cx="62" cy="115" rx="7" ry="4"/>' +
        // Section 1C — head accessories: all drawn ABOVE the hairline,
        // hidden by default, revealed per data-accessory via CSS — kept
        // clear of the face group on purpose (see ACCESSORY_SHOP comment).
        '<path class="dgc-chibi-acc-headband" d="M25 33 Q50 24 75 33 L75 38 Q50 30 25 38 Z"/>' +
        '<path class="dgc-chibi-acc-cap" d="M21 20 Q50 -4 79 20 L79 27 Q50 12 21 27 Z"/>' +
        '<path class="dgc-chibi-acc-wizardhat" d="M50 -34 L36 20 Q50 13 64 20 Z"/>' +
        // Weapon: always visibly held, part of the silhouette — not an
        // abstract inventory concept. See heroWeaponSVG()/HERO_WEAPONS.
        heroWeaponSVG();
    } else if (kind === 'sudo') {
      body =
        '<ellipse class="dgc-chibi-shadow" cx="50" cy="116" rx="22" ry="5.5"/>' +
        '<rect class="dgc-chibi-body" x="34" y="80" width="32" height="30" rx="10"/>' +
        '<rect class="dgc-chibi-body dgc-chibi-leg" x="38" y="106" width="9" height="14" rx="3.5"/>' +
        '<rect class="dgc-chibi-body dgc-chibi-leg" x="53" y="106" width="9" height="14" rx="3.5"/>' +
        '<rect class="dgc-chibi-body dgc-chibi-arm" x="21" y="83" width="10" height="24" rx="4"/>' +
        '<rect class="dgc-chibi-body dgc-chibi-arm" x="69" y="83" width="10" height="24" rx="4"/>' +
        '<rect class="dgc-chibi-head" x="21" y="16" width="58" height="52" rx="18"/>' +
        '<rect class="dgc-chibi-visor" x="29" y="28" width="42" height="28" rx="10"/>' +
        '<line class="dgc-chibi-antenna" x1="50" y1="16" x2="50" y2="4" stroke-width="3" stroke-linecap="round"/>' +
        '<circle class="dgc-chibi-antenna-tip" cx="50" cy="4" r="4"/>';
    } else {
      // Every Phase-3 boss: a shared body-shape ARCHETYPE (so 8+ new
      // bosses need zero new shape-authoring) + that boss's own palette
      // (via .dgc-chibi-<kind> CSS) + a small set of optional extras
      // (weapon/prop, extra accent shapes) — "give the new boss a body
      // shape + palette, get the full 18-expression face system for
      // free" applied to Phase 3 exactly as designed in Phase 1.
      var archetypeName = BOSS_ARCHETYPE_BY_KIND[kind] || 'construct';
      var archetypeFn = BOSS_BODY_ARCHETYPES[archetypeName] || BOSS_BODY_ARCHETYPES.construct;
      var extrasFn = BOSS_EXTRAS[kind];
      body = archetypeFn() + (extrasFn ? extrasFn() : '');
    }
    // Tier only applies to the hero — reflects whatever save.heroTier IS
    // right now, so every call site (title/select/combat/level-up overlay)
    // automatically renders the current tier with no extra plumbing.
    var tierAttr = kind === 'hero' ? ' data-tier="' + save.heroTier + '"' : '';
    // Phase 4 — equipped outfit, same "reads live off save" pattern as
    // tier: every render site (City, Armory/Tailor preview, boss select,
    // combat) automatically shows whatever's currently equipped.
    var outfitAttr = kind === 'hero' ? ' data-outfit="' + (save.equippedOutfit || 'default') + '"' : '';
    // Section 1C — hair color + shoes + head accessory, same "reads live
    // off save" pattern as tier/outfit above.
    var hairAttr = kind === 'hero' ? ' data-hair="' + (save.equippedHair || 'brown') + '"' : '';
    var shoesAttr = kind === 'hero' ? ' data-shoes="' + (save.equippedShoes || 'default') + '"' : '';
    var accessoryAttr = kind === 'hero' ? ' data-accessory="' + (save.equippedAccessory || 'none') + '"' : '';
    var characterAttr = kind === 'hero' ? ' data-character="' + currentCharacterId() + '"' : '';
    // Art-direction update: the previous "3D chibi" gradient sheen (a
    // radialGradient-filled highlight ellipse washed over every head) is
    // REMOVED entirely here — flat, clean line-art per the new style
    // guide, no rim-light/shading baked into the character itself. The
    // per-character .dgc-chibi-grad-hi/-lo CSS color rules are left in
    // place but now unused (harmless dead weight, not worth touching ~11
    // scattered boss-palette declarations to delete for a cosmetic no-op).
    return '<svg class="dgc-chibi dgc-chibi-' + kind + '"' + tierAttr + outfitAttr + hairAttr + shoesAttr + accessoryAttr + characterAttr + ' viewBox="0 0 100 130" data-expr="idle">' +
      body +
      '<g class="dgc-chibi-face">' + facePartsSVG() + '</g>' +
    '</svg>';
  }

  /* ============================================================
     QUESTION BANK — fully data-driven, per the shared schema.
     mode: 'terminal' | 'spot_the_bug' | 'triage_call' | 'read_the_room' | 'build_the_pipeline' | 'rapid_recon'
     ============================================================ */



  /* ============================================================
     RUNTIME STATE
     ============================================================ */
  var state = null; // built fresh each fight in startFight()

  // Remediation doc, Section 1 — a "leveled" fight reuses the entire
  // existing phase engine unchanged: it just builds a throwaway boss
  // object that LOOKS like a normal single-phase boss (phases/phaseHp/
  // phaseNames arrays of length 1), so handlePhaseCleared()'s existing
  // "last phase cleared -> triggerVictory()" branch fires naturally.
  // The real BOSSES[bossId] entry (and its .phases used elsewhere, e.g.
  // the Final Boss's mixed-pool) is never mutated.
  function bossForLevel(bossId, levelIdx) {
    var base = BOSSES[bossId];
    var level = base.levels[levelIdx];
    return Object.assign({}, base, {
      phases: [level.questions],
      phaseHp: [level.hp],
      phaseNames: [level.name]
    });
  }

  function newRunState(bossId, levelIdx) {
    var leveled = typeof levelIdx === 'number';
    var boss = leveled ? bossForLevel(bossId, levelIdx) : BOSSES[bossId];
    return {
      bossId: bossId,
      boss: boss,
      levelIdx: leveled ? levelIdx : null,
      locked: false, // true while a submitted answer is resolving, to block double-submits
      phaseIdx: 0,
      // HP stat (Phase 2): baseline 100, + a flat bonus per level.
      heroHpMax: 100 + save.stats.hp,
      heroHp: 100 + save.stats.hp,
      bossHp: boss.phaseHp[0],
      bossHpMax: boss.phaseHp[0],
      combo: 1,
      comboCountThisTier: 0,
      questionPoolIdx: 0,
      // No-repeat pool state, lazily (re)shuffled by pickNextPoolIndex() —
      // null forces a fresh shuffle the first time this phase's pool is drawn from.
      questionOrder: null,
      orderPos: 0,
      currentQuestion: null,
      readTheRoomStep: 'diagnose', // for chained read_the_room questions
      selectedOption: null, // triage_call
      selectedLine: null, // spot_the_bug
      seqChosen: [], // build_the_pipeline
      timer: null,
      timeLeft: 50,
      timeAllotted: 50,
      // Final Boss "3AM Pager" has no phases/special-attack in the normal
      // sense — its own structure (rapid_recon opener, a mixed pool drawn
      // from every cleared boss, then a closing STAR question) is driven
      // by these flags rather than the standard phase machinery.
      isFinalBoss: bossId === 'pager',
      specialAttackDone: bossId === 'pager' ? true : false, // final boss skips the standard special-attack trigger entirely
      starAsked: false,
      reconDone: bossId === 'pager' ? true : false, // final boss's OWN rapid_recon already opens the fight — never re-trigger the normal random one
      runCoins: 0,
      runXp: 0,
      // --- expression-system tracking (reuses existing events, no parallel system) ---
      fightStartTime: Date.now(), // drives the pacing-based "tired" state
      bossEnraged: false, // set by startTimer()'s own danger-zone tick (existing enrage-timer mechanic)
      lastQuestionMode: null, // detects a real mode switch → "confused" reaction
      seenModesThisFight: {}, // Section 2A — first-time-this-fight mode -> hero's "curious" reaction (distinct from boss/Sudo's per-switch "confused")
      hintUsedThisQ: false, // any hint tier used this question → suppresses Sudo's "smug"
      heroLowHpAlertShown: false, // one-shot: first time hero HP crosses the 25% line this fight
      fightLog: [] // every question asked this fight, for the end-of-fight review screen
    };
  }

  /* ============================================================
     UI: SCREEN SWITCHING
     ============================================================ */
  function showScreen(name) {
    $('dgcCharacterSelectScreen').hidden = name !== 'characterSelect';
    $('dgcTitleScreen').hidden = name !== 'title';
    $('dgcStartScreen').hidden = name !== 'start';
    $('dgcCityScreen').hidden = name !== 'city';
    $('dgcHouseScreen').hidden = name !== 'house';
    $('dgcCombatScreen').hidden = name !== 'combat';
    $('dgcReviewScreen').hidden = name !== 'review';
    $('dgcVictoryScreen').hidden = name !== 'victory';
    $('dgcDefeatScreen').hidden = name !== 'defeat';
  }

  function hasExistingProgress() {
    return save.coins > 0 || save.xp > 0 || save.bossesDefeated.length > 0;
  }

  function refreshTitleScreen() {
    var hasProgress = hasExistingProgress();
    $('dgcMenuStartLabel').textContent = hasProgress ? 'CONTINUE' : 'START GAME';
    $('dgcMenuNewGame').hidden = !hasProgress;
    var bar = $('dgcTitleStatsBar');
    if (hasProgress) {
      bar.hidden = false;
      $('dgcTitleStatLevel').textContent = save.level;
      $('dgcTitleStatCoins').textContent = save.coins;
      $('dgcTitleStatXp').textContent = save.xp;
      $('dgcTitleStatCleared').textContent = save.bossesDefeated.length + ' / ' + Object.keys(BOSSES).length;
      $('dgcTitleStatCombo').textContent = 'x' + save.bestCombo;
    } else {
      bar.hidden = true;
    }
    refreshStreakBadge();
  }

  function refreshStartScreen() {
    $('dgcCoinsDisplay').textContent = save.coins;
    $('dgcXpDisplay').textContent = save.xp;
    $('dgcBestComboDisplay').textContent = save.bestCombo;
    $('dgcClearedCountDisplay').textContent = save.bossesDefeated.length;
    // Phase 2 — level/XP progress + the 4 growing stats, all real, wired
    // values (see statsForLevel()), not cosmetic-only numbers.
    $('dgcSelectLevelTag').textContent = 'LEVEL ' + save.level;
    $('dgcSelectXpText').textContent = save.currentXP + ' / ' + save.xpToNextLevel + ' XP';
    $('dgcSelectXpBarFill').style.width = Math.min(100, Math.round(save.currentXP / save.xpToNextLevel * 100)) + '%';
    $('dgcStatHp').textContent = '+' + save.stats.hp;
    $('dgcStatAttack').textContent = '+' + Math.round(save.stats.attack * 100) + '%';
    $('dgcStatFocus').textContent = '+' + save.stats.focus.toFixed(1) + 's';
    $('dgcStatLuck').textContent = '+' + Math.round(save.stats.luck * 100) + '%';
    renderBossSelectGrid();
  }

  /* ============================================================
     PHASE 4 — LIBRARY. Advanced Packs: real, extra questions per topic
     boss, purchasable once that boss is cleared, that fold into that
     boss's own no-repeat pool (see currentPhaseQuestions()) rather than
     needing any separate UI/engine path. Deliberately NOT offered for
     the Final Boss (pager) — its own pool is already every other boss's
     content mixed together. Same question schema as every other boss
     question (see BOSSES above) — nothing special about these entries
     except where they live.
     ============================================================ */

  /* ============================================================
     PHASE 3 — BOSS SELECT GRID. One card per boss in BOSS_ORDER, each
     showing its own chibi + cleared/not-cleared status; the Final Boss
     is rendered locked/silhouetted until every topic boss is cleared.
     Replaying an already-cleared boss stays fully available — nothing
     locks after a first clear except the Final Boss's own gate.
     ============================================================ */
  var BOSS_ORDER = ['terminalGolem', 'kraken', 'hydra', 'orchestrator', 'phantom', 'reaper', 'titan', 'statekeeper', 'wraith', 'pager'];
  // Bug fix (remediation doc, Section 4): the terminal-mode prompt used to
  // say "devops@golem" no matter which boss was actually being fought —
  // this maps each boss to its own hostname so the prompt is honest.
  var BOSS_HOSTNAME = {
    terminalGolem: 'golem', kraken: 'kraken', hydra: 'hydra', orchestrator: 'orchestrator',
    phantom: 'phantom', reaper: 'reaper', titan: 'titan', statekeeper: 'statekeeper',
    wraith: 'wraith', pager: 'pager'
  };
  function bossHostname() {
    return (state && state.bossId && BOSS_HOSTNAME[state.bossId]) || 'devops-box';
  }
  var FINAL_BOSS_ID = 'pager';
  var prevFinalBossLocked = null; // tracks the lock state across renders, to fire the reveal only on the actual unlock moment
  function isFinalBossUnlocked() {
    return BOSS_ORDER.filter(function (id) { return id !== FINAL_BOSS_ID; })
      .every(function (id) { return save.bossesDefeated.indexOf(id) !== -1; });
  }
  function renderBossSelectGrid() {
    var grid = $('dgcBossSelectGrid');
    if (!grid) return;
    var finalUnlocked = isFinalBossUnlocked();
    var justUnlocked = prevFinalBossLocked === true && finalUnlocked === true;
    prevFinalBossLocked = !finalUnlocked;

    grid.innerHTML = BOSS_ORDER.map(function (id) {
      var boss = BOSSES[id];
      if (!boss) return '';
      var isFinal = id === FINAL_BOSS_ID;
      var cleared = save.bossesDefeated.indexOf(id) !== -1;
      if (isFinal && !finalUnlocked) {
        return '<div class="dgc-boss-card dgc-boss-card-locked" data-boss-id="' + id + '">' +
          '<div class="dgc-boss-card-lock-icon">🔒</div>' +
          '<div class="dgc-boss-card-icon">' + boss.icon + '</div>' +
          '<div class="dgc-boss-card-name">???</div>' +
          '<div class="dgc-boss-card-topic">Locked</div>' +
          '<div class="dgc-boss-card-status-locked">Clear all 9 topic bosses to unlock</div>' +
          '<button class="dgc-btn dgc-btn-fight" disabled>🔒 Locked</button>' +
        '</div>';
      }
      // Remediation doc, Section 1 — a boss with a `.levels` array shows
      // its level progress (N/5) and opens the level-select screen
      // instead of jumping straight into a fight; every other boss keeps
      // the exact old one-click-to-fight behavior untouched.
      var leveled = Array.isArray(boss.levels);
      var levelProgress = leveled ? (save.bossLevelProgress[id] || 0) : null;
      var statusHtml = leveled
        ? '<div class="dgc-boss-card-status' + (cleared ? ' dgc-cleared' : '') + '">' + levelProgress + ' / 5 levels</div>'
        : '<div class="dgc-boss-card-status' + (cleared ? ' dgc-cleared' : '') + '">' + (cleared ? '✓ Cleared' : 'Not Cleared') + '</div>';
      var btnHtml = leveled
        ? '<button class="dgc-btn dgc-btn-fight" data-select-level-boss-id="' + id + '">⚔️ Choose Level</button>'
        : '<button class="dgc-btn dgc-btn-fight" data-fight-boss-id="' + id + '">⚔️ Fight</button>';
      return '<div class="dgc-boss-card' + (isFinal && justUnlocked ? ' dgc-boss-card-reveal' : '') + '" data-boss-id="' + id + '">' +
        '<div class="dgc-sprite dgc-boss-card-sprite" id="dgcBossCardSprite-' + id + '"></div>' +
        '<div class="dgc-boss-card-name">' + boss.name + '</div>' +
        '<div class="dgc-boss-card-topic">' + boss.topic + '</div>' +
        statusHtml +
        btnHtml +
      '</div>';
    }).join('');

    // Inject each visible card's chibi now that the markup exists.
    BOSS_ORDER.forEach(function (id) {
      var boss = BOSSES[id];
      if (!boss) return;
      if (id === FINAL_BOSS_ID && !finalUnlocked) return; // locked card has no live chibi, just the flat icon
      var sprite = $('dgcBossCardSprite-' + id);
      if (!sprite) return;
      sprite.innerHTML = chibiRoot(boss.chibiKind);
      setExpression(sprite, id === FINAL_BOSS_ID ? 'angry' : 'idle');
    });
  }

  // Remediation doc, Section 1 — per-boss level select. Linear unlock:
  // level N+1 opens once level N is cleared. A level with zero authored
  // questions renders as a real "not authored yet" tile — never a
  // fake-clickable fight with nothing in it.
  function renderLevelSelect(bossId) {
    var boss = BOSSES[bossId];
    $('dgcLevelSelectTitle').textContent = boss.name.toUpperCase() + ' — CHOOSE LEVEL';
    var highestCleared = save.bossLevelProgress[bossId] || 0;
    var body = $('dgcLevelSelectBody');
    body.innerHTML = '<div class="dgc-level-select-grid">' + boss.levels.map(function (level, i) {
      var levelNum = i + 1;
      var authored = level.questions.length > 0;
      var unlocked = levelNum === 1 || highestCleared >= levelNum - 1;
      var cleared = highestCleared >= levelNum;
      var stateClass = !authored ? 'dgc-level-tile-unauthored' : (!unlocked ? 'dgc-level-tile-locked' : (cleared ? 'dgc-level-tile-cleared' : ''));
      var statusText = !authored ? 'Not authored yet' : (!unlocked ? 'Locked — clear Level ' + (levelNum - 1) + ' first' : (cleared ? '✓ Cleared' : (level.questions.length + ' questions')));
      var clickable = authored && unlocked;
      return '<div class="dgc-level-tile ' + stateClass + '">' +
        '<div class="dgc-level-tile-num">LEVEL ' + levelNum + '</div>' +
        '<div class="dgc-level-tile-name">' + escapeHtml(level.name) + '</div>' +
        '<div class="dgc-level-tile-status">' + statusText + '</div>' +
        (clickable
          ? '<button class="dgc-btn dgc-btn-fight" data-fight-boss-id="' + bossId + '" data-fight-level-idx="' + i + '">⚔️ Fight</button>'
          : '<button class="dgc-btn dgc-btn-fight" disabled>' + (!authored ? '🚧 Coming Soon' : '🔒 Locked') + '</button>') +
      '</div>';
    }).join('') + '</div>';
  }

  /* ============================================================
     TITLE SCREEN: menu actions, modals, settings, trophy hall
     ============================================================ */
  function openModal(modalId) {
    $('dgcModalBackdrop').hidden = false;
    ['dgcHowToPlayModal', 'dgcSettingsModal', 'dgcTrophyModal', 'dgcDebriefModal', 'dgcLevelSelectModal', 'dgcConfirmModal',
     'dgcArmoryModal', 'dgcTailorModal', 'dgcBankModal', 'dgcLibraryModal', 'dgcGeneralStoreModal'].forEach(function (id) {
      $(id).hidden = id !== modalId;
    });
  }
  function closeModals() {
    $('dgcModalBackdrop').hidden = true;
    // A shop modal may have changed coins/level while the City's own
    // stats-row readout sat underneath, unrefreshed until now — keep it
    // honest the moment the player can see it again.
    if (!$('dgcCityScreen').hidden) refreshCityStatsBar();
  }

  function showConfirm(title, message, onConfirm) {
    $('dgcConfirmTitle').textContent = title;
    $('dgcConfirmMessage').textContent = message;
    openModal('dgcConfirmModal');
    var okBtn = $('dgcConfirmOk');
    var newOkBtn = okBtn.cloneNode(true); // strip any previously-bound handler
    okBtn.parentNode.replaceChild(newOkBtn, okBtn);
    newOkBtn.addEventListener('click', function () {
      closeModals();
      onConfirm();
    });
  }

  function renderTrophyHall() {
    var grid = $('dgcTrophyStatsGrid');
    grid.innerHTML =
      '<div class="dgc-trophy-stat-card"><div class="val">' + save.level + '</div><div class="lbl">LEVEL · ' + tierById(save.heroTier).name.toUpperCase() + '</div></div>' +
      '<div class="dgc-trophy-stat-card"><div class="val">' + save.coins + '</div><div class="lbl">COINS</div></div>' +
      '<div class="dgc-trophy-stat-card"><div class="val">' + save.xp + '</div><div class="lbl">TOTAL XP</div></div>' +
      '<div class="dgc-trophy-stat-card"><div class="val">x' + save.bestCombo + '</div><div class="lbl">BEST COMBO</div></div>' +
      '<div class="dgc-trophy-stat-card"><div class="val">' + save.highScore + '</div><div class="lbl">HIGH SCORE (coins/run)</div></div>' +
      '<div class="dgc-trophy-stat-card"><div class="val">' + save.bestFinalBossScore + '</div><div class="lbl">BEST 3AM PAGER RUN</div></div>' +
      '<div class="dgc-trophy-stat-card"><div class="val">' + save.bossesDefeated.length + ' / ' + Object.keys(BOSSES).length + '</div><div class="lbl">BOSSES CLEARED</div></div>';
    var list = $('dgcTrophyBossList');
    list.innerHTML = Object.keys(BOSSES).map(function (id) {
      var boss = BOSSES[id];
      var cleared = save.bossesDefeated.indexOf(id) !== -1;
      return '<div class="dgc-trophy-boss-row' + (cleared ? ' dgc-boss-cleared' : '') + '">' +
        '<span class="dgc-trophy-boss-icon">' + boss.icon + '</span>' +
        '<span class="dgc-trophy-boss-name">' + boss.name + '</span>' +
        '<span class="dgc-trophy-boss-tag ' + (cleared ? 'cleared">✓ Cleared' : 'locked">Not Cleared') + '</span>' +
        '</div>';
    }).join('');
  }

  // Phase 5, Section 1 — human-readable names for the 6 gameplay modes,
  // so the recommendation can name a SKILL ("debugging"), not a code string.
  var MODE_DISPLAY_NAME = {
    terminal: 'Terminal Recall',
    spot_the_bug: 'Spot-the-Bug (debugging)',
    triage_call: 'Triage Calls (judgment)',
    read_the_room: 'Read-the-Room (diagnosis)',
    build_the_pipeline: 'Sequencing',
    rapid_recon: 'Rapid Recon'
  };
  var MIN_ATTEMPTS_FOR_RECOMMENDATION = 3;

  function renderDebrief() {
    var body = $('dgcDebriefBody');
    var ph = save.performanceHistory;
    var bossEntries = Object.keys(ph.byBoss).filter(function (id) { return ph.byBoss[id].attempts > 0; });
    var totalAttempts = bossEntries.reduce(function (sum, id) { return sum + ph.byBoss[id].attempts; }, 0);

    if (!totalAttempts) {
      body.innerHTML = '<div class="dgc-trophy-note">No fights recorded yet — play a boss fight, then check back here. This looks across every fight you\'ve played to tell you exactly what to revisit.</div>';
      return;
    }

    // Weakest TOPIC: lowest correct-or-better rate, among bosses with
    // enough attempts to mean something (a single unlucky question
    // shouldn't brand a boss/topic as your worst).
    var qualifiedBosses = bossEntries.filter(function (id) { return ph.byBoss[id].attempts >= MIN_ATTEMPTS_FOR_RECOMMENDATION; });
    var rankedBosses = (qualifiedBosses.length ? qualifiedBosses : bossEntries).map(function (id) {
      var b = ph.byBoss[id];
      return { id: id, rate: b.correctOrBetter / b.attempts, attempts: b.attempts };
    }).sort(function (a, b) { return a.rate - b.rate; });
    var weakestBoss = rankedBosses[0];

    // Weakest SKILL: lowest optimal-answer rate across the 6 modes.
    var modeEntries = Object.keys(ph.byMode).filter(function (m) { return ph.byMode[m].attempts > 0; });
    var qualifiedModes = modeEntries.filter(function (m) { return ph.byMode[m].attempts >= MIN_ATTEMPTS_FOR_RECOMMENDATION; });
    var rankedModes = (qualifiedModes.length ? qualifiedModes : modeEntries).map(function (m) {
      var d = ph.byMode[m];
      return { mode: m, rate: d.optimal / d.attempts, attempts: d.attempts };
    }).sort(function (a, b) { return a.rate - b.rate; });
    var weakestMode = rankedModes[0];

    var statsHtml = '<div class="dgc-trophy-stats-grid">' +
      '<div class="dgc-trophy-stat-card"><div class="val">' + totalAttempts + '</div><div class="lbl">QUESTIONS ANSWERED</div></div>' +
      '<div class="dgc-trophy-stat-card"><div class="val">' + bossEntries.length + '</div><div class="lbl">BOSSES FACED</div></div>' +
      '</div>';

    var breakdownHtml = '<div class="dgc-trophy-label">BY TOPIC</div><div class="dgc-trophy-boss-list">' +
      rankedBosses.map(function (r) {
        var boss = BOSSES[r.id];
        if (!boss) return '';
        return '<div class="dgc-trophy-boss-row"><span class="dgc-trophy-boss-icon">' + boss.icon + '</span>' +
          '<span class="dgc-trophy-boss-name">' + boss.name + '</span>' +
          '<span class="dgc-trophy-boss-tag">' + Math.round(r.rate * 100) + '% accuracy · ' + r.attempts + ' asked</span></div>';
      }).join('') + '</div>';

    var modeHtml = '<div class="dgc-trophy-label">BY SKILL</div><div class="dgc-trophy-boss-list">' +
      rankedModes.map(function (r) {
        return '<div class="dgc-trophy-boss-row"><span class="dgc-trophy-boss-name">' + (MODE_DISPLAY_NAME[r.mode] || r.mode) + '</span>' +
          '<span class="dgc-trophy-boss-tag">' + Math.round(r.rate * 100) + '% optimal · ' + r.attempts + ' asked</span></div>';
      }).join('') + '</div>';

    var recoHtml = '';
    if (weakestBoss) {
      var wBoss = BOSSES[weakestBoss.id];
      var wModeName = weakestMode ? (MODE_DISPLAY_NAME[weakestMode.mode] || weakestMode.mode) : null;
      recoHtml = '<div class="dgc-trophy-note" style="margin-top:14px;">' +
        '<strong>Recommendation:</strong> your accuracy is lowest on <strong>' + (wBoss ? wBoss.name : weakestBoss.id) + '</strong> (' + Math.round(weakestBoss.rate * 100) + '%)' +
        (wModeName ? ', particularly on <strong>' + wModeName + '</strong> questions' : '') + '. Revisit that fight next.' +
        '</div>' +
        (wBoss ? '<button class="dgc-btn dgc-btn-primary" id="dgcDebriefGoBtn" style="margin-top:10px;width:100%;">⚔️ Fight ' + wBoss.name + ' Now</button>' : '');
    }

    body.innerHTML = statsHtml + breakdownHtml + modeHtml + recoHtml;

    var goBtn = $('dgcDebriefGoBtn');
    if (goBtn && weakestBoss) {
      goBtn.addEventListener('click', function () {
        closeModals();
        startFight(weakestBoss.id);
      });
    }
  }

  /* ============================================================
     PHASE 4 — DEVOPS CITY: navigation + the five (now six, once
     Section 1B's decoration sub-step lands) buildings.
     ============================================================ */
  function refreshCityStatsBar() {
    var coinsEl = $('dgcCityCoinsDisplay'); if (coinsEl) coinsEl.textContent = save.coins;
    var levelEl = $('dgcCityLevelDisplay'); if (levelEl) levelEl.textContent = save.level;
  }

  /* ============================================================
     PHASE 4 SECTION 1B — CITY EXPLORATION ENGINE. World-space
     coordinates; the hero token stays screen-fixed at the viewport
     center and #dgcCityWorld translates opposite the hero's world
     position (clamped to the world's edges) — the whole "camera" is
     just that one transform, recomputed every animation frame while
     the City screen is open.
     ============================================================ */
  // Widened from the original 900x560 as part of the movement-bug fix
  // below (a wide viewport could exceed 900px, permanently pinning the
  // camera at 0 and freezing ALL horizontal movement on screen) — also
  // gives this addendum's NPC/environment-richness work real room.
  var CITY_WORLD_W = 3000, CITY_WORLD_H = 760; // 1500 village + 1500 forest path / New City
  // Environment addendum (Section 3 spacing fix) — the 6 Town Square
  // buildings are laid out on a regular hexagon ring (radius 170) around
  // a shared plaza hub (400,280) instead of hand-placed coordinates that
  // used to leave library/trophy only ~2px apart (an actual overlap).
  // Ring math: adjacent ring points on a regular hexagon are exactly
  // `radius` apart center-to-center, which — after subtracting the
  // ~128x136 card footprint — reliably clears ~40px+ between every
  // building on this ring, at every position, by construction rather
  // than by hand-tuned per-pair adjustment.
  var CITY_BUILDINGS = [
    { id: 'armory', name: 'Armory', x: 166, y: 224 },
    { id: 'tailor', name: 'Tailor', x: 251, y: 77 },
    { id: 'bank', name: 'Bank', x: 421, y: 77 },
    { id: 'library', name: 'Library', x: 506, y: 224 },
    // Section 1B sub-step 2 — General Store: sells town decorations. A
    // 6th building rather than folding decorations into an existing one,
    // per the doc's explicitly offered option.
    { id: 'store', name: 'General Store', x: 251, y: 371 },
    { id: 'trophy', name: 'Trophy Hall', x: 421, y: 371 },
    // Section 3A — Training Grounds: a walk-up LOCATION rather than a
    // shop — entering it routes straight to Boss Select instead of
    // opening a modal (see enterCityBuilding()'s special case), tying
    // "go fight" into the walkable world instead of only the Back button.
    // Deliberately OUTSIDE the plaza ring — it's its own zone, not a
    // Town Square shop — with clear walking distance from the ring's
    // easternmost building (library, right edge x=634).
    { id: 'training', name: 'Training Grounds', x: 700, y: 300 }
  ];
  var CITY_BUILDING_W = 128, CITY_BUILDING_H = 136; // card footprint, for spacing/overlap/z-order math
  var CITY_SUDO_POS = { x: 170, y: 190 }; // a fixed idle "guide post" near the Armory — simpler and just as alive as full follow-AI
  var cityHero = { x: 450, y: 280, facing: 'down', moving: false };
  var cityKeys = { up: false, down: false, left: false, right: false, run: false };
  var cityRafHandle = null;
  var cityNearBuildingId = null;

  function renderCityBuildings() {
    var layer = $('dgcCityBuildingsLayer');
    if (!layer) return;
    layer.innerHTML = CITY_BUILDINGS.map(function (b) {
      return '<div class="dgc-city-building dgc-city-building-' + b.id + '" data-building="' + b.id + '" ' +
        'style="left:' + b.x + 'px; top:' + b.y + 'px; z-index:' + Math.round(b.y + CITY_BUILDING_H) + ';" tabindex="0" role="button">' +
        '<div class="dgc-city-building-roof"></div>' +
        '<div class="dgc-city-building-body"><div class="dgc-city-building-icon">' + CITY_BUILDING_ICONS[b.id] + '</div><div class="dgc-city-building-name">' + b.name + '</div></div>' +
      '</div>';
    }).join('');
  }
  var CITY_BUILDING_ICONS = { armory: '⚒️', tailor: '🧵', bank: '🏦', library: '📚', trophy: '🏆', store: '🌳', training: '⚔️' };
  function renderCityZoneLabels() {
    var layer = $('dgcCityZoneLabels');
    if (!layer || layer.children.length) return; // static — render once, never needs re-rendering
    layer.innerHTML = CITY_ZONES.map(function (z) {
      return '<div class="dgc-city-zone-label' + (z.cls ? ' ' + z.cls : '') + '" style="left:' + z.x + 'px; top:' + z.y + 'px;">' + z.name + '</div>';
    }).join('');
  }
  // Section 3A — City zoning: purely decorative signposts giving the
  // town real named geography instead of a flat lawn with building
  // clusters. Static (don't depend on save state), so rendered once as
  // plain HTML in #dgcCityWorld rather than through a render function.
  var CITY_ZONES = [
    // Environment addendum — re-centered on the new hexagon plaza hub.
    { name: 'TOWN SQUARE', x: 400, y: 250 },
    { name: 'TRAINING GROUNDS', x: 764, y: 270 },
    // Living City addendum — re-anchored into the new eastward expansion
    // of the widened world (was 620,460 in the smaller 900px-wide map).
    { name: 'RESIDENTIAL DISTRICT', x: 1220, y: 340 },
    // Forest path + empty New City (east of the village)
    { name: 'FOREST PATH', x: 1740, y: 372, cls: 'dgc-zone-label-chip' },
    { name: 'NEW CITY', x: 2726, y: 174, cls: 'dgc-zone-label-chip' }
  ];

  /* ============================================================
     LIVING CITY ADDENDUM, SECTION 3A — environment richness. Houses
     (Residential District) + generous tree/bush/flower coverage across
     all 3 zones (denser in Residential, per its "actual neighborhood"
     ask) so the town reads as a real settlement, not a sparse hub with a
     few icons. Purely decorative/non-interactive (pointer-events:none)
     and permanent (not tied to save data, unlike the player's own
     General Store decorations) — rendered once, same static pattern as
     the zone labels above.
     ============================================================ */
  // Section 3 — the Town Square plaza hub + the roads connecting it to
  // Training Grounds and on to the Residential District, so the 3 zones
  // read as one walkable settlement instead of disconnected patches.
  var TOWN_PLAZA = { x: 400, y: 280, radius: 150 };
  var ROAD_SEGMENTS = [
    { x1: 400, y1: 280, x2: 764, y2: 368, width: 42 },
    { x1: 764, y1: 368, x2: 1220, y2: 380, width: 42 }
  ];
  /* ============================================================
     FOREST PATH + NEW CITY (east of the Residential District).
     The world is widened to 3000px: the village keeps x<1490, a short
     forest path (x 1490-2440) leads to an EMPTY "New City" plaza. The
     trees along the path are SOLID: CITY_SOLIDS is a set of wall rects
     generated from the path centreline (feet-space, same maths as
     HOUSE_SOLID), so the hero can only follow the track. Forest trees
     are drawn as ordinary y-sorted fixtures (see WORLD_FIXTURES).
     ============================================================ */
  /* FOREST_WALLS_BEGIN */
  var FOREST_X0 = 1490, FOREST_WALL_X1 = 2440, FOREST_HALF = 36; // feet corridor = 72px inside the 80px visible road
  var FOREST_PATH = [[1490, 380], [1660, 380], [1860, 335], [2020, 335], [2260, 395], [2440, 395]]; // gently S-shaped centreline (feet y), ~960px
  function forestCentreY(x) {
    function ss(a, b, ya, yb) { var t = Math.max(0, Math.min(1, (x - a) / (b - a))); t = t * t * (3 - 2 * t); return ya + (yb - ya) * t; }
    if (x <= 1660) return 380;
    if (x <= 1860) return ss(1660, 1860, 380, 335);
    if (x <= 2020) return 335;
    if (x <= 2260) return ss(2020, 2260, 335, 395);
    return 395;
  }
  // Two towers on the New City plaza (bottom-centre anchored sprites, base line = base). Solid body = whole footprint so the hero can never vanish inside a facade.
  var TOWER_DEFS = [
    { name: 'Tower A', spr: 'towerA', cx: 2606, base: 500, w: 232, h: 292 },
    { name: 'Tower B', spr: 'towerB', cx: 2846, base: 500, w: 232, h: 292 }
  ];
  // true when a foliage anchor (x, base y) would sit on a tower facade
  function towerCovers(x, y) {
    for (var i = 0; i < TOWER_DEFS.length; i++) { var t = TOWER_DEFS[i]; if (x > t.cx - t.w / 2 + 10 && x < t.cx + t.w / 2 - 10 && y > t.base - t.h - 10 && y < t.base + 14) return true; }
    return false;
  }
  var CITY_SOLIDS = (function () {
    var out = [], step = 16;
    for (var x = FOREST_X0; x < FOREST_WALL_X1; x += step) {
      var xb = Math.min(x + step, FOREST_WALL_X1);
      var ca = forestCentreY(x), cb = forestCentreY(xb);
      var top = Math.min(ca, cb) - FOREST_HALF, bot = Math.max(ca, cb) + FOREST_HALF;
      out.push({ x: x, y: -400, w: xb - x, h: top + 400 });                       // north tree wall
      out.push({ x: x, y: bot, w: xb - x, h: CITY_WORLD_H + 400 - bot });         // south tree wall
    }
    // New City: only the outer top/bottom tree belt is solid, the plaza itself is open floor
    out.push({ x: FOREST_WALL_X1, y: -400, w: CITY_WORLD_W - FOREST_WALL_X1 + 400, h: 500 });
    out.push({ x: FOREST_WALL_X1, y: 740, w: CITY_WORLD_W - FOREST_WALL_X1 + 400, h: 400 });
    // tower bodies (feet space), each split around a walk-through door niche (60px wide, 44px deep, open to the south)
    TOWER_DEFS.forEach(function (t) {
      var y0 = t.base - t.h + 6, y1 = t.base + 2, x0 = t.cx - t.w / 2 + 4, x1 = t.cx + t.w / 2 - 4, nx0 = t.cx - 30, nx1 = t.cx + 30;
      out.push({ x: x0, y: y0, w: nx0 - x0, h: y1 - y0 });
      out.push({ x: nx1, y: y0, w: x1 - nx1, h: y1 - y0 });
      out.push({ x: nx0, y: y0, w: nx1 - nx0, h: (t.base - 42) - y0 });
    });
    return out;
  })();
  function solidsAt(fx, fy, halfW) {
    if (fx + halfW <= FOREST_X0) return false;
    for (var i = 0; i < CITY_SOLIDS.length; i++) {
      var b = CITY_SOLIDS[i];
      if (fx + halfW > b.x && fx - halfW < b.x + b.w && fy > b.y && fy < b.y + b.h) return true;
    }
    return false;
  }
  /* FOREST_WALLS_END */
  // Road segments: the village road continues to the forest mouth; the forest track itself is drawn as one SVG
  // (see forestRoadSVG) and only needs invisible segments so decor / scatter stay off it.
  ROAD_SEGMENTS.push({ x1: 1220, y1: 380, x2: 1470, y2: 380, width: 42 });
  (function () {
    for (var x = 1470; x < 2500; x += 60) ROAD_SEGMENTS.push({ x1: x, y1: forestCentreY(x), x2: x + 60, y2: forestCentreY(x + 60), width: 80, noRender: true });
  })();
  // Glades: small lighter-grass clearings just beyond the tree walls where the wild animals live.
  function forestGlade(cx, side) { return { cx: cx, cy: forestCentreY(cx) + side * (side < 0 ? 170 : 195), rx: 64, ry: 34 }; }
  var FOREST_GLADES = [forestGlade(1650, -1), forestGlade(1800, -1), forestGlade(1800, 1), forestGlade(1990, 1), forestGlade(2150, -1), forestGlade(2150, 1), forestGlade(2320, 1)];
  // Game trails joining a north glade to a south glade across the path (the crossers use these).
  var FOREST_TRAILS = [{ x: 1800, n: 1, s: 2 }, { x: 2150, n: 4, s: 5 }].map(function (t) { t.y0 = FOREST_GLADES[t.n].cy; t.y1 = FOREST_GLADES[t.s].cy; return t; });
  var FOREST_PLAZA = { x: 2470, y: 245, w: 470, h: 300 };
  // Shared Blob URLs: each PNG is decoded from its base64 once and every <img> / CSS background points at the same blob:
  // (instead of repeating a multi-KB data URI hundreds of times in the HTML string).
  var SPRITE_BLOB_CACHE = {};
  function spriteBlobUrl(key, dataUri) {
    if (SPRITE_BLOB_CACHE[key]) return SPRITE_BLOB_CACHE[key];
    var url = dataUri;
    try {
      var bin = atob(dataUri.slice(dataUri.indexOf(',') + 1)), u8 = new Uint8Array(bin.length);
      for (var i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
      url = URL.createObjectURL(new Blob([u8], { type: 'image/png' }));
    } catch (e) { url = dataUri; }
    SPRITE_BLOB_CACHE[key] = url;
    return url;
  }
  var FOREST_PROPS = [
    { spr: 'signArrow', x: 1535, y: 344, w: 120, h: 96, text: ['NEW CITY', '▸ forest path'], tx: [8, 8, 92, 48] },
    { spr: 'gate', x: 2410, y: 395 + 48, w: 72, h: 192 },
    { spr: 'signCity', x: 2545, y: 616, w: 152, h: 96, text: ['NEW CITY', 'welcome'], tx: [8, 8, 136, 56], big: true },
    { spr: 'towerA', x: 2606, y: 500, w: 232, h: 292 },
    { spr: 'towerB', x: 2846, y: 500, w: 232, h: 292 }
  ];
  function forestRoadSVG() {
    var x0 = 1440, x1 = 2476, top = [], bot = [];
    for (var x = x0; x <= x1; x += 16) {
      var c = forestCentreY(x);
      var hw = Math.min(40, 21 + Math.max(0, x - 1440) * 0.2375); // widen from the 42px village road into the 80px track
      top.push((x - x0) + ',' + (c - hw).toFixed(1));
      bot.unshift((x - x0) + ',' + (c + hw).toFixed(1));
    }
    var pts = top.concat(bot).join(' ');
    return '<svg class="dgc-forest-road" style="left:' + x0 + 'px;" width="' + (x1 - x0) + '" height="' + CITY_WORLD_H + '" viewBox="0 0 ' + (x1 - x0) + ' ' + CITY_WORLD_H + '" aria-hidden="true">' +
      '<defs><pattern id="dgcForestDirt" patternUnits="userSpaceOnUse" width="48" height="48"><image href="' + GROUND_TILES.dirt + '" width="48" height="48" style="image-rendering:pixelated"/></pattern>' +
      '<clipPath id="dgcForestRoadClip"><polygon points="' + pts + '"/></clipPath><filter id="dgcForestRoadBlur" x="-5%" y="-20%" width="110%" height="140%"><feGaussianBlur stdDeviation="6"/></filter></defs>' +
      '<polygon points="' + pts + '" fill="url(#dgcForestDirt)"/>' +
      '<g clip-path="url(#dgcForestRoadClip)"><polygon points="' + pts + '" fill="none" stroke="rgba(20,38,15,0.55)" stroke-width="20" filter="url(#dgcForestRoadBlur)"/></g>' +
      '<polygon points="' + pts + '" fill="none" stroke="rgba(20,38,15,0.5)" stroke-width="3" stroke-linejoin="round"/></svg>';
  }
  // Ground decoration rendered inside the roads layer (below every y-sorted object): deep-forest tint, glades, trails, the track, the New City plaza.
  function forestGroundHTML() {
    var h = '<div class="dgc-forest-tint" style="left:' + FOREST_X0 + 'px; width:960px;"></div>';
    FOREST_TRAILS.forEach(function (t) {
      h += '<div class="dgc-forest-trail" style="left:' + (t.x - 24) + 'px; top:' + t.y0 + 'px; width:48px; height:' + (t.y1 - t.y0) + 'px;"></div>';
    });
    FOREST_GLADES.forEach(function (g) {
      h += '<div class="dgc-forest-glade" style="left:' + (g.cx - g.rx - 14) + 'px; top:' + (g.cy - g.ry - 10) + 'px; width:' + ((g.rx + 14) * 2) + 'px; height:' + ((g.ry + 10) * 2) + 'px;"></div>';
    });
    h += '<div class="dgc-newcity-plaza" style="left:' + FOREST_PLAZA.x + 'px; top:' + FOREST_PLAZA.y + 'px; width:' + FOREST_PLAZA.w + 'px; height:' + FOREST_PLAZA.h + 'px; background-image:url(' + GROUND_TILES.stone + ');"></div>';
    h += forestRoadSVG();
    return h;
  }
  // Signposts + the stone gate (static y-sorted props) — appended once to the fixture layer.
  function renderForestProps() {
    var layer = $('dgcCityFixtureLayer');
    if (!layer || layer.querySelector('.dgc-city-prop')) return;
    var html = '';
    FOREST_PROPS.forEach(function (p) {
      html += '<img class="dgc-city-prop" style="left:' + p.x + 'px; top:' + p.y + 'px; width:' + p.w + 'px; height:' + p.h + 'px; z-index:' + Math.round(p.y) + ';" src="' + spriteBlobUrl('p:' + p.spr, FOREST_PROP_SPRITES[p.spr]) + '" alt="">';
      if (p.text) {
        html += '<div class="dgc-prop-text' + (p.big ? ' dgc-prop-text-big' : '') + '" style="left:' + (p.x - p.w / 2 + p.tx[0]) + 'px; top:' + (p.y - p.h + p.tx[1]) + 'px; width:' + p.tx[2] + 'px; height:' + p.tx[3] + 'px; z-index:' + (Math.round(p.y) + 1) + ';"><b>' + p.text[0] + '</b><span>' + p.text[1] + '</span></div>';
      }
    });
    layer.insertAdjacentHTML('beforeend', html);
  }
  // ---- Wild animals: purely visual, non-solid, ignore the hero. Ticked from cityMoveTick next to npcWanderTick (so they pause with modals/dialogue). ----
  var FOREST_ANIMAL_KINDS = {
    deer: { fw: 80, fh: 72, s: 0.85, cross: 1.0 },
    fox: { fw: 72, fh: 44, s: 0.9, cross: 1.0 },
    rabbit: { fw: 48, fh: 48, s: 0.85, cross: 1.4 },
    squirrel: { fw: 52, fh: 48, s: 0.85, cross: 1.2 },
    bird: { fw: 44, fh: 40, s: 0.75, cross: 1.0 }
  };
  var FOREST_ANIMAL_DEFS = [
    { kind: 'fox', glade: 0 }, { kind: 'squirrel', glade: 0 },
    { kind: 'rabbit', glade: 1, trail: 0 },                  // crosser: north glade <-> south glade over the path at x=1800
    { kind: 'deer', glade: 3 }, { kind: 'bird', glade: 3 },
    { kind: 'deer', glade: 4, trail: 1 },                    // crosser at x=2150
    { kind: 'fox', glade: 5 }, { kind: 'squirrel', glade: 6 }, { kind: 'bird', glade: 6 }
  ];
  var FOREST_ANIMALS = [], forestAnimalsRendered = false;
  function renderForestAnimals() {
    var layer = $('dgcCityAnimalLayer');
    if (!layer || forestAnimalsRendered) return;
    forestAnimalsRendered = true;
    var html = '';
    FOREST_ANIMAL_DEFS.forEach(function (d, i) {
      var k = FOREST_ANIMAL_KINDS[d.kind], g = FOREST_GLADES[d.glade];
      var a = {
        id: i, kind: d.kind, glade: d.glade, trail: d.trail == null ? -1 : d.trail,
        x: g.cx + (Math.random() * 2 - 1) * (g.rx - 20), y: g.cy + (Math.random() * 2 - 1) * (g.ry - 10),
        tx: 0, ty: 0, speed: 0.5, wait: Math.floor(Math.random() * 240), route: [],
        crossIn: 375 + Math.floor(Math.random() * 500), flip: false, moving: false, el: null
      };
      a.tx = a.x; a.ty = a.y;
      FOREST_ANIMALS.push(a);
      html += '<div class="dgc-animal dgc-animal-' + d.kind + '" id="dgcAnimal' + i + '" style="left:' + a.x.toFixed(1) + 'px; top:' + a.y.toFixed(1) + 'px; z-index:' + Math.round(a.y) + '; width:' + Math.round(k.fw * k.s) + 'px; height:' + Math.round(k.fh * k.s) + 'px;">' +
        '<div class="dgc-animal-flip"><div class="dgc-animal-bob"><div class="dgc-animal-sprite" style="background-image:url(' + spriteBlobUrl('a:' + d.kind, FOREST_ANIMAL_SPRITES[d.kind]) + ');"></div></div></div></div>';
    });
    layer.innerHTML = html;
    FOREST_ANIMALS.forEach(function (a) { a.el = $('dgcAnimal' + a.id); });
  }
  function animalPickTarget(a) {
    var g = FOREST_GLADES[a.glade];
    a.tx = g.cx + (Math.random() * 2 - 1) * (g.rx - 16);
    a.ty = g.cy + (Math.random() * 2 - 1) * (g.ry - 8);
    a.speed = 0.4 + Math.random() * 0.3;
  }
  function animalStartCross(a) {
    var tr = FOREST_TRAILS[a.trail], c = forestCentreY(tr.x), sp = FOREST_ANIMAL_KINDS[a.kind].cross;
    var fromN = a.glade === tr.n, g1 = FOREST_GLADES[fromN ? tr.n : tr.s], g2 = FOREST_GLADES[fromN ? tr.s : tr.n], dir = fromN ? 1 : -1;
    a.route = [
      [tr.x, c - dir * 62, sp],
      [tr.x, c + dir * 62, sp],
      [tr.x, g2.cy - dir * g2.ry * 0.5, sp],
      [g2.cx + (Math.random() * 2 - 1) * (g2.rx - 16), g2.cy + (Math.random() * 2 - 1) * (g2.ry - 8), 0.55, fromN ? tr.s : tr.n]
    ];
    a.tx = tr.x; a.ty = g1.cy + dir * g1.ry * 0.5; a.speed = sp;
    a.crossIn = 1e9; a.crossing = true;
  }
  function animalSetMoving(a, on) {
    if (a.moving === on) return;
    a.moving = on;
    a.el.classList.toggle('dgc-moving', on);
  }
  function animalTick() {
    for (var i = 0; i < FOREST_ANIMALS.length; i++) {
      var a = FOREST_ANIMALS[i];
      if (!a.el) continue;
      if (a.crossIn > 0 && a.crossIn < 1e8) a.crossIn--;
      if (a.wait > 0) {
        a.wait--;
        if (a.wait > 0) continue;
        if (a.trail >= 0 && a.crossIn <= 0) animalStartCross(a); else animalPickTarget(a);
      }
      var dx = a.tx - a.x, dy = a.ty - a.y, d = Math.sqrt(dx * dx + dy * dy);
      if (d <= a.speed) {
        a.x = a.tx; a.y = a.ty;
        if (a.route.length) {
          var w = a.route.shift(); a.tx = w[0]; a.ty = w[1]; a.speed = w[2];
          if (w[3] != null) a.glade = w[3];
        } else {
          if (a.crossing) { a.crossing = false; a.crossIn = 375 + Math.floor(Math.random() * 500); } // idle 6-14s, then cross back
          a.wait = 90 + Math.floor(Math.random() * 285); // 1.5-6s pause
          animalSetMoving(a, false);
        }
      } else {
        a.x += dx / d * a.speed; a.y += dy / d * a.speed;
        if (Math.abs(dx) > 0.25 && (dx < 0) !== a.flip) { a.flip = dx < 0; a.el.classList.toggle('dgc-flip', a.flip); }
        animalSetMoving(a, true);
      }
      a.el.style.left = a.x.toFixed(1) + 'px';
      a.el.style.top = a.y.toFixed(1) + 'px';
      a.el.style.zIndex = Math.round(a.y);
    }
  }
  function renderCityRoads() {
    var layer = $('dgcCityRoadsLayer');
    if (!layer || layer.children.length) return; // static — render once
    var html = '<div class="dgc-city-plaza" style="left:' + (TOWN_PLAZA.x - TOWN_PLAZA.radius) + 'px; top:' + (TOWN_PLAZA.y - TOWN_PLAZA.radius) + 'px; width:' + (TOWN_PLAZA.radius * 2) + 'px; height:' + (TOWN_PLAZA.radius * 2) + 'px; background-image:url(' + GROUND_TILES.stone + ');"></div>';
    html += ROAD_SEGMENTS.map(function (r) {
      if (r.noRender) return '';
      var dx = r.x2 - r.x1, dy = r.y2 - r.y1;
      var len = Math.hypot(dx, dy);
      var angle = Math.atan2(dy, dx) * 180 / Math.PI;
      return '<div class="dgc-city-road-segment" style="left:' + r.x1 + 'px; top:' + r.y1 + 'px; width:' + len + 'px; height:' + r.width + 'px; ' +
        'background-image:url(' + GROUND_TILES.dirt + '); transform:translateY(-50%) rotate(' + angle + 'deg);"></div>';
    }).join('');
    html += forestGroundHTML();
    layer.innerHTML = html;
  }
  // A point-vs-rectangle helper (with padding) used both to keep newly
  // scattered fixtures off building footprints/roads (below) and to
  // reject illegal player decoration placement (Section 2A).
  function rectContainsPoint(rx, ry, rw, rh, px, py, pad) {
    pad = pad || 0;
    return px >= rx - pad && px <= rx + rw + pad && py >= ry - pad && py <= ry + rh + pad;
  }
  function pointBlockedForEnvironment(x, y, pad) {
    for (var i = 0; i < CITY_BUILDINGS.length; i++) {
      var b = CITY_BUILDINGS[i];
      if (rectContainsPoint(b.x, b.y, CITY_BUILDING_W, CITY_BUILDING_H, x, y, pad)) return true;
    }
    var distToPlaza = Math.hypot(x - TOWN_PLAZA.x, y - TOWN_PLAZA.y);
    if (distToPlaza < TOWN_PLAZA.radius + (pad || 0)) return true;
    for (var j = 0; j < ROAD_SEGMENTS.length; j++) {
      var r = ROAD_SEGMENTS[j];
      // Distance from point to the segment's line, clamped to its length —
      // good enough for a straight road strip (no need for true OBB math).
      var vx = r.x2 - r.x1, vy = r.y2 - r.y1;
      var lenSq = vx * vx + vy * vy;
      var t = lenSq ? Math.max(0, Math.min(1, ((x - r.x1) * vx + (y - r.y1) * vy) / lenSq)) : 0;
      var px = r.x1 + t * vx, py = r.y1 + t * vy;
      if (Math.hypot(x - px, y - py) < r.width / 2 + (pad || 0)) return true;
    }
    return false;
  }
  // A narrower version for NPC wandering: standing on the plaza or a
  // road is completely normal for a person (that's what paths/squares
  // are for) — only a building wall is actually "inside an object".
  function pointBlockedForNpcWander(x, y, pad) {
    for (var i = 0; i < CITY_BUILDINGS.length; i++) {
      var b = CITY_BUILDINGS[i];
      if (rectContainsPoint(b.x, b.y, CITY_BUILDING_W, CITY_BUILDING_H, x, y, pad)) return true;
    }
    return false;
  }
  // Residential District house coordinates — hoisted to module scope
  // (out of the WORLD_FIXTURES IIFE below) so both the fixture-scatter
  // avoidance AND the player decoration-placement check (Section 2A)
  // can treat "on top of a house" as blocked, the same as a real
  // building — houses are drawn via WORLD_FIXTURES, not CITY_BUILDINGS,
  // so without this a placed decoration could land right on a roof.
  var HOUSE_LOCATIONS = [[1040, 160], [1210, 150], [1380, 165], [1030, 320], [1200, 325], [1375, 315], [1045, 610], [1215, 600], [1385, 615]];
  // Real illustrated house sprites (Kenney "Tiny Town" pack, CC0, kenney.nl) —
  // cropped from the pack's own composited Sample.png (four distinct houses,
  // one mirrored for a cheap 4th variant), with the flat grass background
  // chroma-keyed to transparent so they drop onto this game's own grass.
  // Sized well above the 68px-wide hero sprite (.dgc-city-hero-sprite) so
  // houses read as real structures, not single-tile icons.
  var HOUSE_BOX_SIZE = 130; // must track the `size` used for HOUSE sprites below
  var HOUSE_BOXES = HOUSE_LOCATIONS.map(function (p) { return { x: p[0] - HOUSE_BOX_SIZE / 2, y: p[1] - HOUSE_BOX_SIZE * 0.86, w: HOUSE_BOX_SIZE, h: HOUSE_BOX_SIZE * 0.78 }; }); // bottom-anchored at (x,y), scaled to the sprite's display size
  // SOLID footprint of each house = the wall/roof body (feet-point test). The strip in front of the door stays walkable.
  var HOUSE_SOLID_FULL = HOUSE_LOCATIONS.map(function (p) { return { x: p[0] - 59, y: p[1] - 80, w: 118, h: 86 }; }); // matches the house art's real opaque area: x±59, roof top y-82, wall base y+7 (used for NPC target picking: the door niche counts as solid there)
  // Walk-through doors: each house wall has a door NICHE (52px wide, 36px deep, open to the south) cut into its solid, so the hero can step INTO the doorway.
  var HOUSE_SPRITE_KEYS = ['houseA', 'houseB', 'houseC', 'houseD'];
  var HOUSE_DOOR_DX = { houseA: 15, houseB: -15, houseC: -15, houseD: 15 }; // door centre x offset from the house anchor (measured from the 148px sprite PNGs scaled to the 130px display size)
  var DOOR_NICHE_HW = 26, HOUSE_NICHE_DEPTH = 36;
  var HOUSE_SOLID = (function () {
    var out = [];
    HOUSE_LOCATIONS.forEach(function (p, i) {
      var cx = p[0] + HOUSE_DOOR_DX[HOUSE_SPRITE_KEYS[i % HOUSE_SPRITE_KEYS.length]];
      var x0 = p[0] - 59, x1 = p[0] + 59, y0 = p[1] - 80, y1 = p[1] + 6, nx0 = cx - DOOR_NICHE_HW, nx1 = cx + DOOR_NICHE_HW;
      out.push({ x: x0, y: y0, w: nx0 - x0, h: y1 - y0 });                               // wall left of the door
      out.push({ x: nx1, y: y0, w: x1 - nx1, h: y1 - y0 });                              // wall right of the door
      out.push({ x: nx0, y: y0, w: nx1 - nx0, h: y1 - HOUSE_NICHE_DEPTH - y0 });         // cap above the niche
    });
    return out;
  })();
  var HERO_FOOT_DY = 29; // hero token centre -> feet (measured: leg bottoms sit 29px below the token centre)
  function houseSolidAt(fx, fy, halfW, pad) {
    pad = pad || 0;
    var list = pad > 0 ? HOUSE_SOLID_FULL : HOUSE_SOLID;
    for (var i = 0; i < list.length; i++) {
      var b = list[i];
      if (fx + halfW > b.x - pad && fx - halfW < b.x + b.w + pad && fy > b.y - pad && fy < b.y + b.h + pad) return true;
    }
    return false;
  }
  function heroBlockedAt(x, y) { return houseSolidAt(x, y + HERO_FOOT_DY, 15, 0) || solidsAt(x, y + HERO_FOOT_DY, 15); } // 15 = measured half-width of the hero's legs
  function blockedByHouse(x, y, pad) {
    for (var i = 0; i < HOUSE_BOXES.length; i++) {
      if (rectContainsPoint(HOUSE_BOXES[i].x, HOUSE_BOXES[i].y, HOUSE_BOXES[i].w, HOUSE_BOXES[i].h, x, y, pad)) return true;
    }
    return false;
  }
  // Front-door centre, as an x offset from the house anchor. Measured from the 148px sprite PNGs (door centre x=91 for houseA/D, x=57 for houseB/C; anchor x=74) scaled x0.878 to the 130px display size. The door base sits ~y+6.
  // Walk-through doors (no Enter step): stepping to the deep end of the niche (|feet x - cx| <= hw, feet y <= ty) enters. hero token retY puts the feet
  // at the niche mouth, outside the trigger. top/bot = the niche's feet-y span; the trigger re-arms once the feet are clear of (trigger + 16px).
  var HOUSE_DOORS = HOUSE_LOCATIONS.map(function (p, i) {
    var cx = p[0] + HOUSE_DOOR_DX[HOUSE_SPRITE_KEYS[i % HOUSE_SPRITE_KEYS.length]];
    return { id: 'house:' + i, cx: cx, hw: 12, ty: p[1] - 22, top: p[1] - 80, retY: p[1] + 16 - HERO_FOOT_DY };
  });
  var TOWER_DOORS = TOWER_DEFS.map(function (t, i) { return { id: 'bldg:' + i, cx: t.cx, hw: 14, ty: t.base - 30, top: t.base - t.h, retY: t.base + 24 - HERO_FOOT_DY, name: t.name }; });
  var cityDoorArmed = false;
  // Auto-enter: called every city tick. The armed flag stops a return trip (or a spawn) from re-triggering.
  function checkCityDoors() {
    var fx = cityHero.x, fy = cityHero.y + HERO_FOOT_DY, inZone = false, hit = null, list = HOUSE_DOORS.concat(TOWER_DOORS), i, d;
    for (i = 0; i < list.length; i++) {
      d = list[i];
      if (fy >= d.top && fy <= d.ty + 16 && Math.abs(fx - d.cx) <= d.hw + 16) {
        inZone = true;
        if (fy <= d.ty && Math.abs(fx - d.cx) <= d.hw) hit = d;
      }
    }
    if (!inZone) { cityDoorArmed = true; return; }
    if (hit && cityDoorArmed && Date.now() >= houseLockUntil) { cityDoorArmed = false; enterCityBuilding(hit.id); }
  }
  var WORLD_FIXTURES = (function () {
    var list = [];
    // Residential District houses — a real little neighborhood, using real
    // downloaded illustrated sprites (see HOUSE_SPRITES above) instead of a
    // drawn SVG roof/wall placeholder.
    HOUSE_LOCATIONS.forEach(function (p, i) {
      var key = HOUSE_SPRITE_KEYS[i % HOUSE_SPRITE_KEYS.length];
      list.push({ sprite: key, x: p[0], y: p[1], size: HOUSE_BOX_SIZE });
    });
    var TREE_KEYS = ['treePine1', 'treePine2', 'treeRound', 'treeAutumnRound', 'treeAutumnPine'];
    var BUSH_KEYS = ['bushTall', 'bushWide'];
    var FLOWER_KEYS = ['flowerBlue', 'flowerTeal', 'flowerPurple'];
    var ROCK_KEYS = ['rock1', 'rock2'];
    var GRASS_KEYS = ['grassTuft'];
    // Section 2A — don't drop a fixture on top of a building, the plaza,
    // a road, or a house: reject the random point and try again (capped
    // so a saturated zone can't loop forever) rather than placing blind.
    // (blockedByHouse() now lives at module scope, above, so it's also
    // reusable by the player decoration-placement check further down.)
    // Real sprite art (see FOLIAGE_SPRITES above) instead of emoji glyphs —
    // each call scatters a random pick from the given key set so a zone
    // isn't just one tree copy-pasted everywhere.
      // Foliage footprint (bottom-center anchored, s wide/tall) vs each house's full visual rect, so trees/bushes never overlap a house sprite.
    function spriteHitsHouse(x, y, s, sh) {
      // Residential walking corridor (NPC row + hero path between house rows): keep trees/bushes/rocks out so nobody is hidden behind foliage.
      if (s >= 30 && x > 940 && y > 380 && y - sh < 455) return true;
      for (var i = 0; i < HOUSE_LOCATIONS.length; i++) {
        var hx = HOUSE_LOCATIONS[i][0], hy = HOUSE_LOCATIONS[i][1];
        if (x + s / 2 > hx - HOUSE_BOX_SIZE / 2 - 6 && x - s / 2 < hx + HOUSE_BOX_SIZE / 2 + 6 && y > hy - HOUSE_BOX_SIZE * 0.92 - 6 && y - sh < hy + 16) return true;
      }
      for (var k = 0; k < CITY_BUILDINGS.length; k++) {
        var cb = CITY_BUILDINGS[k];
        if (x + s / 2 > cb.x - 6 && x - s / 2 < cb.x + CITY_BUILDING_W + 6 && y > cb.y - 6 && y - sh < cb.y + CITY_BUILDING_H + 6) return true;
      }
      return false;
    }
  function scatterSprite(keys, count, xMin, xMax, yMin, yMax, size, sizeJitter) {
      for (var i = 0; i < count; i++) {
        var key = keys[Math.floor(Math.random() * keys.length)];
        var s = size + (sizeJitter ? Math.round((Math.random() - 0.5) * 2 * sizeJitter) : 0);
        var tall = (key === 'treePine1' || key === 'treeAutumnPine'); // two-tile-tall trees: canopy + trunk
        if (tall) s = Math.round(s * 0.72);
        var sh = tall ? s * 2 : s;
        var x, y, tries = 0;
        do {
          // keep the WHOLE sprite (bottom-center anchored, s wide/tall) inside the 1500x760 world so nothing is clipped at the map edge
          var lx = Math.max(xMin, s / 2 + 6), hx = Math.min(xMax, CITY_WORLD_W - 6 - s / 2), ly = Math.max(yMin, sh + 6), hy = Math.min(yMax, 754);
          x = lx + Math.random() * (hx - lx);
          y = ly + Math.random() * (hy - ly);
          tries++;
        } while (tries < 80 && (pointBlockedForEnvironment(x, y, 14) || spriteHitsHouse(x, y, s, sh)));
        if (pointBlockedForEnvironment(x, y, 14) || spriteHitsHouse(x, y, s, sh)) continue;
        list.push({ sprite: key, x: x, y: y, size: s });
      }
    }
    // Town Square + Training Grounds — moderate natural coverage around the buildings.
    scatterSprite(TREE_KEYS, 14, 20, 920, 20, 550, 56, 10);
    scatterSprite(BUSH_KEYS, 12, 20, 920, 20, 550, 34, 6);
    scatterSprite(FLOWER_KEYS, 14, 20, 920, 20, 550, 22, 4);
    scatterSprite(GRASS_KEYS, 20, 20, 920, 20, 550, 18, 4);
    // Residential District — the densest greenery, the "real neighborhood" bar.
    scatterSprite(TREE_KEYS, 16, 950, 1490, 20, 740, 52, 8);
    scatterSprite(BUSH_KEYS, 22, 950, 1490, 20, 740, 34, 6);
    scatterSprite(FLOWER_KEYS, 40, 950, 1490, 20, 740, 22, 4);
    scatterSprite(GRASS_KEYS, 34, 950, 1490, 20, 740, 18, 4);
    scatterSprite(ROCK_KEYS, 8, 20, 1490, 20, 740, 30, 6);
    // Perimeter tree belt: a denser forest edge along the top, bottom and left of the map. Same footprint rules as the random scatter
    // (never on a house, shop building, road or plaza, and always fully inside the map).
    function beltTree(x, y) {
      var key = TREE_KEYS[Math.floor(Math.random() * TREE_KEYS.length)];
      var s = 42 + Math.round(Math.random() * 8);
      var tall = (key === 'treePine1' || key === 'treeAutumnPine');
      if (tall) s = Math.round(s * 0.72);
      var sh = tall ? s * 2 : s;
      if (x - s / 2 < 6 || x + s / 2 > CITY_WORLD_W - 6 || y - sh < 6 || y > 754) return;
      if (pointBlockedForEnvironment(x, y, 14) || spriteHitsHouse(x, y, s, sh)) return;
      list.push({ sprite: key, x: x, y: y, size: s });
    }
    for (var bx = 30; bx < 1480; bx += 46) { beltTree(bx + Math.random() * 14, 80 + Math.random() * 14); beltTree(bx + 23 + Math.random() * 14, 750 - Math.random() * 6); }
    for (var by = 170; by < 720; by += 64) { beltTree(24 + Math.random() * 8, by + Math.random() * 12); }

    // Residential right-margin tree line (tall two-tile trees, 37px wide x 74px tall, fully inside the 1500px map).
    [[1474, 150, 'treePine1'], [1474, 300, 'treeAutumnPine'], [1472, 560, 'treePine1'], [1474, 700, 'treeAutumnPine']].forEach(function (t) {
      list.push({ sprite: t[2], x: t[0], y: t[1], size: 37 });
    });
    // ---- Forest path trees (seeded, so the forest is identical every load). Dense rows hug both sides of the track, sparser deep forest fills
    // up to the map edges, glades/trails stay clear. Rendered by renderCityFixtures() with shared Blob URLs and no drop-shadow filter (`forest:true`).
    (function () {
      var seed = 7301;
      function rnd() { seed = (seed + 0x6D2B79F5) | 0; var t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }
      var MIX = ['treePine1', 'treePine1', 'treePine2', 'treeRound', 'treeAutumnRound', 'treeAutumnPine', 'treePine2', 'treeRound', 'treePine1'];
      var XEND = 2360; // leave the gate frame (x 2382-2438) clear
      function isTall(k) { return k === 'treePine1' || k === 'treeAutumnPine'; }
      function pickKey() { return MIX[Math.floor(rnd() * MIX.length)]; }
      function widthOf(k) { return isTall(k) ? 40 + Math.round(rnd() * 8) : 50 + Math.round(rnd() * 10); }
      function clearOfGlades(x, base, w, sh) {
        var x0 = x - w / 2 - 4, x1 = x + w / 2 + 4, y0 = base - 0.92 * sh - 4, y1 = base + 0.08 * sh + 4, i;
        for (i = 0; i < FOREST_GLADES.length; i++) { var g = FOREST_GLADES[i]; if (x1 > g.cx - g.rx && x0 < g.cx + g.rx && y1 > g.cy - g.ry && y0 < g.cy + g.ry) return false; }
        for (i = 0; i < FOREST_TRAILS.length; i++) { var t = FOREST_TRAILS[i]; if (x1 > t.x - 26 && x0 < t.x + 26 && y1 > t.y0 && y0 < t.y1) return false; }
        return true;
      }
      function add(x, base, key, w) {
        var sh = isTall(key) ? w * 2 : w;
        if (x - w / 2 < FOREST_X0 + 6 || x + w / 2 > CITY_WORLD_W - 6) return;
        if (base - 0.92 * sh < 4 || base + 0.08 * sh > 758) return;
        if (!clearOfGlades(x, base, w, sh)) return;
        if (towerCovers(x, base)) return;
        list.push({ sprite: key, x: Math.round(x * 10) / 10, y: Math.round(base * 10) / 10, size: w, forest: true });
      }
      // dense rows next to the track (3 per side); trunks just outside the 72px walkable corridor
      var k, x, key, w, c, sh;
      for (k = 0; k < 3; k++) {
        for (x = 1620 + (k % 2) * 18 + rnd() * 10; x < XEND; x += 36 + rnd() * 8) { // north side (the signpost owns x<1620 there)
          key = pickKey(); w = widthOf(key); sh = isTall(key) ? w * 2 : w; c = forestCentreY(x);
          add(x, c - 42 - 0.08 * sh - k * 26 - rnd() * 5, key, w);
        }
        for (x = 1510 + (k % 2) * 18 + rnd() * 10; x < XEND; x += 36 + rnd() * 8) { // south side: canopy top starts at the road edge
          key = pickKey(); w = widthOf(key); sh = isTall(key) ? w * 2 : w; c = forestCentreY(x);
          add(x, c + 40 + 0.92 * sh + k * 26 + rnd() * 5, key, w);
        }
      }
      // deep forest: sparse columns out to the top / bottom map edges
      for (x = 1512; x < XEND; x += 50 + rnd() * 8) {
        c = forestCentreY(x);
        var b = c - 42 - 52 - 40;
        while (true) {
          key = pickKey(); w = widthOf(key); sh = isTall(key) ? w * 2 : w;
          var minB = 4 + 0.92 * sh + 1;
          if (b < minB) { add(x + rnd() * 8, minB, key, w); break; }
          add(x + rnd() * 8, b, key, w);
          b -= 50 + rnd() * 10;
        }
        b = c + 40 + 40 + 52 + 40;
        while (true) {
          key = pickKey(); w = widthOf(key); sh = isTall(key) ? w * 2 : w;
          var maxB = 757 - 0.08 * sh;
          if (b > maxB) { add(x + 22 + rnd() * 8, maxB, key, w); break; }
          add(x + 22 + rnd() * 8, b, key, w);
          b += 50 + rnd() * 10;
        }
      }
      // undergrowth bushes plugging the trail mouths (the tree wall stays visually unbroken; animals walk "through" them)
      FOREST_TRAILS.forEach(function (t) {
        var cc = forestCentreY(t.x);
        [-12, 12].forEach(function (dx) {
          list.push({ sprite: 'bushWide', x: t.x + dx, y: cc - 42, size: 30, forest: true });
          list.push({ sprite: 'bushTall', x: t.x + dx * 0.9, y: cc + 40 + 0.92 * 30, size: 30, forest: true });
        });
      });
      // New City tree belt (top / bottom / right edge) + flowers, tufts and rocks so the empty plaza field is not a bare lawn
      var i;
      for (x = 2462; x < 2985; x += 46) {
        key = pickKey(); w = widthOf(key); sh = isTall(key) ? w * 2 : w;
        add(x + rnd() * 12, 80 + rnd() * 14, key, w);
        key = pickKey(); w = widthOf(key);
        add(x + 23 + rnd() * 12, 750 - rnd() * 6, key, w);
      }
      for (i = 170; i < 730; i += 64) { key = pickKey(); w = widthOf(key); add(2958 + rnd() * 8, i + rnd() * 12, key, w); }
      var flora = [['flowerBlue', 22], ['flowerTeal', 22], ['flowerPurple', 22], ['grassTuft', 18], ['grassTuft', 18], ['rock1', 28], ['rock2', 28], ['bushTall', 32], ['bushWide', 32]];
      for (i = 0; i < 46; i++) {
        var f = flora[Math.floor(rnd() * flora.length)];
        var fx = 2460 + rnd() * 520, fy = 120 + rnd() * 620;
        var inPlaza = fx > FOREST_PLAZA.x - 16 && fx < FOREST_PLAZA.x + FOREST_PLAZA.w + 16 && fy > FOREST_PLAZA.y - 10 && fy < FOREST_PLAZA.y + FOREST_PLAZA.h + 34;
        var nearGate = fx < 2500 && fy > 300 && fy < 480;
        var nearLabel = fx > 2630 && fx < 2800 && fy > 170 && fy < 250;
        var nearTowers = fx > 2440 && fx < 2990 && fy > 190 && fy < 640; // tower facades, their approach and the welcome sign
        if (inPlaza || nearGate || nearLabel || nearTowers) continue;
        list.push({ sprite: f[0], x: Math.round(fx), y: Math.round(fy), size: f[1], forest: true });
      }
    })();
    return list;
  })();
  // Section 2A — depth/draw-order: every sortable world object (fixtures,
  // buildings, NPCs, hero, Sudo) gets a z-index equal to its own ground
  // anchor's Y coordinate, so something lower on screen always draws in
  // front of something higher — the standard top-down/3-quarter trick —
  // instead of a fixed per-layer stacking order that let a hero standing
  // above a tree render in front of it (or a building draw over an NPC
  // standing in front of its door). Fixtures/buildings are static, so
  // this is computed once at render time, not every tick.
  function renderCityFixtures() {
    var layer = $('dgcCityFixtureLayer');
    if (!layer || layer.children.length) return; // static — render once
    layer.innerHTML = WORLD_FIXTURES.map(function (f) {
      var z = Math.round(f.y);
      if (f.sprite) {
        if (f.forest) return '<img class="dgc-city-fixture dgc-city-fixture-sprite dgc-city-fixture-forest" style="left:' + f.x + 'px; top:' + f.y + 'px; width:' + f.size + 'px; z-index:' + z + ';" src="' + spriteBlobUrl('f:' + f.sprite, FOLIAGE_SPRITES[f.sprite]) + '" alt="">';
        var spriteSrc = HOUSE_SPRITES[f.sprite] || FOLIAGE_SPRITES[f.sprite];
        return '<img class="dgc-city-fixture dgc-city-fixture-sprite" style="left:' + f.x + 'px; top:' + f.y + 'px; width:' + f.size + 'px; z-index:' + z + ';" src="' + spriteSrc + '" alt="">';
      }
      if (f.svg) {
        return '<div class="dgc-city-fixture dgc-city-fixture-svg" style="left:' + f.x + 'px; top:' + f.y + 'px; width:' + f.size + 'px; height:' + f.size + 'px; z-index:' + z + ';">' + f.svg + '</div>';
      }
      return '<div class="dgc-city-fixture" style="left:' + f.x + 'px; top:' + f.y + 'px; font-size:' + f.size + 'px; z-index:' + z + ';">' + f.icon + '</div>';
    }).join('');
  }

  function cityBuildingCenter(b) { return { x: b.x + 64, y: b.y + 68 }; } // ~center of the roof+body card

  function updateCityCamera() {
    var vp = $('dgcCityViewport');
    if (!vp) return;
    var vw = vp.clientWidth, vh = vp.clientHeight;
    // Clamp(0, worldSize - viewportSize) can go negative if the viewport
    // is bigger than the world on that axis (a wide Browser pane, say) —
    // Math.max(0, ...) already guards THAT edge, but a second clamp on
    // the upper bound guards the case where worldSize < viewportSize
    // entirely, so camera math never produces a nonsensical negative pan.
    var camX = Math.max(0, Math.min(Math.max(0, CITY_WORLD_W - vw), cityHero.x - vw / 2));
    var camY = Math.max(0, Math.min(Math.max(0, CITY_WORLD_H - vh), cityHero.y - vh / 2));
    $('dgcCityWorld').style.transform = 'translate(' + (-camX) + 'px,' + (-camY) + 'px)';
    // CRITICAL FIX (Section 0), superseded by the environment addendum's
    // Section 2A depth pass: the hero token used to live OUTSIDE
    // #dgcCityWorld (a viewport sibling) with its screen position
    // computed by hand every tick (world position minus camera offset),
    // specifically so it wouldn't freeze once the camera saturated at a
    // map edge. That sibling placement, though, put the hero in a
    // separate stacking context from every tree/building/NPC, so it
    // ALWAYS rendered on top of them regardless of position — the
    // "hero pokes out in front of a tree it should be standing behind"
    // bug. The hero token is now a CHILD of #dgcCityWorld instead (see
    // the HTML), positioned with its raw WORLD coordinates like every
    // other sortable object — the world's own translate(-camX,-camY)
    // does the camera-follow math for it "for free", the exact same way
    // it already did for fixtures/buildings/NPCs, which never had the
    // freeze bug in the first place. z-index = its own Y keeps it
    // correctly sorted against everything else on the same ground plane.
    var heroToken = $('dgcCityHeroToken');
    if (heroToken) {
      heroToken.style.left = cityHero.x + 'px';
      heroToken.style.top = cityHero.y + 'px';
      heroToken.style.zIndex = Math.round(cityHero.y + HERO_FOOT_DY);
    }
  }

  function checkCityBuildingProximity() {
    // Shop cards only. House and tower doors are walk-through (see checkCityDoors) and never show a prompt.
    var nearest = null, nearestDist = 999999;
    CITY_BUILDINGS.forEach(function (b) {
      var c = cityBuildingCenter(b);
      var dist = Math.hypot(cityHero.x - c.x, cityHero.y - c.y);
      if (dist < 62 && dist < nearestDist) { nearest = b; nearestDist = dist; }
    });
    cityNearBuildingId = nearest ? nearest.id : null;
    var prompt = $('dgcCityEnterPrompt');
    if (nearest) {
      $('dgcCityEnterPromptName').textContent = nearest.name;
      prompt.hidden = false;
    } else if (prompt) {
      prompt.hidden = true;
    }
  }

  /* ============================================================
     LIVING CITY ADDENDUM — NPC runtime: wander/idle movement, the
     interaction proximity cue, and the dialogue box. NPCs deliberately
     have NO collision against the player (buildings don't either, in
     this engine) — the doc's "don't meaningfully block movement"
     requirement is satisfied by that absence rather than added
     avoidance logic, which would be new complexity for no real gain.
     ============================================================ */
  var NPC_STATE = {}; // id -> { x, y, facing, moving, wanderUntil, targetX, targetY }
  function initNpcState() {
    NPC_ROSTER.forEach(function (npc) {
      if (NPC_STATE[npc.id]) return; // already initialized this session
      NPC_STATE[npc.id] = { x: npc.x, y: npc.y, facing: 'down', moving: false, pauseUntil: Date.now() + rand(500, 3000), targetX: npc.x, targetY: npc.y };
    });
  }
  function renderCityNpcs() {
    var layer = $('dgcCityNpcLayer');
    if (!layer) return;
    layer.innerHTML = NPC_ROSTER.map(function (npc) {
      return '<div class="dgc-city-npc-token" id="dgcCityNpc-' + npc.id + '" data-npc-id="' + npc.id + '" tabindex="0" role="button">' +
        '<div class="dgc-sprite dgc-city-npc-sprite" id="dgcCityNpcSprite-' + npc.id + '"></div>' +
      '</div>';
    }).join('');
    NPC_ROSTER.forEach(function (npc) {
      var sprite = $('dgcCityNpcSprite-' + npc.id);
      if (sprite) { sprite.innerHTML = npcChibiRoot(npc); setExpression(sprite, npc.expr.idle); }
      // Set the token's initial screen position from NPC_STATE immediately —
      // don't wait for the next npcWanderTick(), since fixture NPCs
      // (wanderRadius 0) never move and would otherwise sit at (0,0) forever.
      var token = $('dgcCityNpc-' + npc.id);
      var st = NPC_STATE[npc.id];
      if (token && st) { token.style.left = st.x + 'px'; token.style.top = st.y + 'px'; token.style.zIndex = Math.round(st.y); }
    });
  }
  // Wander tick: each NPC with a wanderRadius > 0 occasionally picks a new
  // nearby point and ambles toward it; wanderRadius 0 means a fixture NPC
  // (on a bench, tending a garden, etc.) that never leaves its spot.
  function npcWanderTick() {
    NPC_ROSTER.forEach(function (npc) {
      var st = NPC_STATE[npc.id];
      if (!st || !npc.wanderRadius) return;
      var now = Date.now();
      if (st.moving) {
        var dx = st.targetX - st.x, dy = st.targetY - st.y;
        var dist = Math.hypot(dx, dy);
        if (dist < 3) {
          st.moving = false;
          st.pauseUntil = now + rand(1500, 4000);
        } else {
          var speed = 0.6;
          var nnx = st.x + (dx / dist) * speed, nny = st.y + (dy / dist) * speed;
          if (houseSolidAt(nnx, nny, 8, 0)) { st.moving = false; st.pauseUntil = now + rand(800, 1500); }
          else { st.x = nnx; st.y = nny; }
          st.facing = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up');
        }
      } else if (now >= st.pauseUntil) {
        // Section 2A — same overlap-avoidance idea as the ambient fixture
        // scatter: don't wander a target into a building/plaza/road (a
        // few tries, then just give up and stay put for this cycle — an
        // NPC skipping one wander leg is invisible, unlike one that
        // visibly clips through a wall).
        var angle, r, tx, ty, tries = 0;
        do {
          angle = Math.random() * Math.PI * 2;
          r = Math.random() * npc.wanderRadius;
          tx = npc.x + Math.cos(angle) * r;
          ty = npc.y + Math.sin(angle) * r;
          tries++;
        } while (tries < 10 && (pointBlockedForNpcWander(tx, ty, 4) || houseSolidAt(tx, ty, 12, 6)));
        if (!(pointBlockedForNpcWander(tx, ty, 4) || houseSolidAt(tx, ty, 12, 6))) {
          st.targetX = tx;
          st.targetY = ty;
          st.moving = true;
        } else {
          st.pauseUntil = now + rand(800, 1500); // couldn't find a clear spot — try again shortly
        }
      }
      var token = $('dgcCityNpc-' + npc.id);
      if (token) {
        token.style.left = st.x + 'px';
        token.style.top = st.y + 'px';
        token.style.zIndex = Math.round(st.y);
        token.classList.toggle('dgc-city-walking', st.moving);
      }
    });
  }
  function checkNpcProximity() {
    var nearest = null, nearestDist = 999999;
    NPC_ROSTER.forEach(function (npc) {
      var st = NPC_STATE[npc.id];
      if (!st) return;
      var dist = Math.hypot(cityHero.x - st.x, cityHero.y - (st.y - 20));
      if (dist < 55 && dist < nearestDist) { nearest = npc; nearestDist = dist; }
    });
    cityNearNpcId = nearest ? nearest.id : null;
    var prompt = $('dgcCityTalkPrompt');
    if (!prompt) return;
    if (nearest && !cityNearBuildingId) {
      $('dgcCityTalkPromptName').textContent = nearest.name;
      prompt.hidden = false;
    } else {
      prompt.hidden = true;
    }
  }
  var cityNearNpcId = null;

  /* ---- Dialogue box ---- */
  function openNpcDialogue(npcId) {
    var npc = NPC_ROSTER.filter(function (n) { return n.id === npcId; })[0];
    if (!npc) return;
    var picked = pickLine(npcId, npc);
    var portrait = $('dgcDialoguePortrait');
    portrait.innerHTML = npcChibiRoot(npc);
    setExpression(portrait, (picked.isIntro || picked.reactive) ? npc.expr.react : npc.expr.talk);
    $('dgcDialogueName').textContent = npc.name;
    $('dgcDialogueRole').textContent = npc.role + ' · ' + npc.topic;
    $('dgcDialogueText').textContent = picked.text;
    $('dgcDialogueProgress').textContent = picked.isIntro ? 'First chat!' : ('heard ' + picked.heard + ' / ' + picked.total);
    $('dgcDialogueBox').hidden = false;
    playSfx('click');
  }
  function closeNpcDialogue() {
    $('dgcDialogueBox').hidden = true;
  }

  function cityMoveTick() {
    // Self-stopping safety net: if the player switches to a different
    // site tab entirely (this page's own nav, not this game's), this
    // panel stops being rendered but nothing here would otherwise know
    // to stop — without this check the loop would run forever in the
    // background. Checked via actual rendered visibility (offsetParent),
    // not a specific class name, so it doesn't depend on assumptions
    // about the site's own tab-switch mechanism (never touch other tabs'
    // behavior/code — this only READS visibility).
    var panel = document.getElementById('tab-game');
    if (!panel || panel.offsetParent === null) { stopCityLoop(); return; }
    // Pause movement while any modal OR the NPC dialogue box is open on
    // top of the City (the player may have released a key mid-click, or
    // be reading a shop/conversation) — still keep the loop alive so
    // closing either resumes movement instantly.
    var dialogueBox = $('dgcDialogueBox');
    var modalOpen = !$('dgcModalBackdrop').hidden || (dialogueBox && !dialogueBox.hidden);
    if (!modalOpen) {
      npcWanderTick();
      animalTick();
      var speed = cityKeys.run ? 6.4 : 3.2;
      var dx = 0, dy = 0;
      if (cityKeys.up) dy -= 1;
      if (cityKeys.down) dy += 1;
      if (cityKeys.left) dx -= 1;
      if (cityKeys.right) dx += 1;
      var moving = dx !== 0 || dy !== 0;
      if (moving) {
        var len = Math.hypot(dx, dy);
        dx = dx / len * speed; dy = dy / len * speed;
        var nx = Math.max(20, Math.min(CITY_WORLD_W - 20, cityHero.x + dx));
        var ny = Math.max(20, Math.min(CITY_WORLD_H - 20, cityHero.y + dy));
        // Solid houses: resolve X and Y separately so the hero slides along a wall instead of sticking to it.
        if (!heroBlockedAt(nx, cityHero.y)) cityHero.x = nx;
        if (!heroBlockedAt(cityHero.x, ny)) cityHero.y = ny;
        if (dx > 0) cityHero.facing = 'right';
        else if (dx < 0) cityHero.facing = 'left';
        else if (dy > 0) cityHero.facing = 'down';
        else if (dy < 0) cityHero.facing = 'up';
      }
      if (moving !== cityHero.moving) {
        cityHero.moving = moving;
        $('dgcCityHeroToken').classList.toggle('dgc-city-walking', moving);
      }
      var facingEl = $('dgcCityHeroFacing');
      if (facingEl) facingEl.style.transform = cityHero.facing === 'left' ? 'scaleX(-1)' : 'scaleX(1)';
      if (moving) {
        var heroOwSprite = $('dgcCityHeroSprite').querySelector('.dgc-overworld-sprite');
        if (heroOwSprite) heroOwSprite.setAttribute('data-facing', overworldFacingGroup(cityHero.facing));
      }
      updateCityCamera();
      checkCityBuildingProximity();
      checkNpcProximity();
      checkCityDoors();
    }
  }
  function stopCityLoop() {
    if (cityRafHandle) { clearInterval(cityRafHandle); cityRafHandle = null; }
    cityKeys = { up: false, down: false, left: false, right: false, run: false };
  }
  function enterCityBuilding(id) {
    if (typeof id === 'string' && id.indexOf('house:') === 0) { enterHouse(parseInt(id.slice(6), 10)); return; }
    if (typeof id === 'string' && id.indexOf('bldg:') === 0) { enterTower(parseInt(id.slice(5), 10)); return; }
    if (id === 'armory') { renderArmory(); openModal('dgcArmoryModal'); }
    else if (id === 'tailor') { renderTailor(); openModal('dgcTailorModal'); }
    else if (id === 'bank') { renderBank(); openModal('dgcBankModal'); }
    else if (id === 'library') { renderLibrary(); openModal('dgcLibraryModal'); }
    else if (id === 'trophy') { renderTrophyHall(); openModal('dgcTrophyModal'); }
    else if (id === 'store') { renderGeneralStore(); openModal('dgcGeneralStoreModal'); }
    else if (id === 'training') { leaveCityToBossSelect(); return; } // a LOCATION, not a shop — no modal, routes straight to Boss Select
    playSfx('click');
  }
  function leaveCityToBossSelect() {
    stopCityLoop();
    refreshStartScreen();
    showScreen('start');
  }

  function goToCityScreen() {
    var sudoToken = $('dgcCitySudoToken');
    if (sudoToken) {
      sudoToken.style.left = CITY_SUDO_POS.x + 'px';
      sudoToken.style.top = CITY_SUDO_POS.y + 'px';
      // Section 2A — Sudo is a static fixture, so its sort key is set
      // once here rather than every tick (+84 approximates its feet,
      // matching its ~84px-tall sprite, since it isn't bottom-anchored).
      sudoToken.style.zIndex = Math.round(CITY_SUDO_POS.y + 84);
      // Section 3A — Sudo's overworld sprite (small, simplified —
      // distinct from the full portrait used in fights/menus).
      var sudoSprite = $('dgcCitySudoSprite');
      if (sudoSprite && !sudoSprite.querySelector('.dgc-overworld-sprite')) { sudoSprite.innerHTML = overworldSpriteSVG('sudo'); }
    }
    var cityWorldEl = $('dgcCityWorld');
    if (cityWorldEl) cityWorldEl.style.width = CITY_WORLD_W + 'px';
    renderCityZoneLabels();
    renderCityRoads();
    renderCityFixtures();
    renderForestProps();
    renderForestAnimals();
    renderCityBuildings();
    renderCityDecorations();
    initNpcState();
    renderCityNpcs();
    cancelPlacingDecoration(); // a fresh entry is never mid-placement
    closeNpcDialogue();
    refreshHeroTierVisuals(); // also (re)renders #dgcCityHeroSprite + name labels, live off `save`
    refreshCityStatsBar();
    showScreen('city');
    stopCityLoop();
    cityDoorArmed = false; // re-armed on the first tick once the hero stands clear of every door niche
    updateCityCamera();
    checkCityBuildingProximity();
    checkNpcProximity();
    // setInterval rather than requestAnimationFrame — matches the timer-
    // driven pattern already used elsewhere in this file (startTimer()),
    // and doesn't depend on this panel's compositor-visible paint timing.
    cityRafHandle = setInterval(cityMoveTick, 16);
  }

  /* ============================================================
     HOUSE INTERIORS — walk up to the front door of any Residential
     house, press Enter (or tap the prompt) and step into a single
     furnished room (its own screen, not a modal). Leave via the door
     mat + Enter, Escape, or the Leave button; you reappear outside the
     same door. Nothing here is saved.
     ============================================================ */
  var HOUSE_ROOM = { w: 640, h: 460, minX: 26, maxX: 614, minY: 158, maxY: 436, startX: 320, startY: 408 };
  var HOUSE_MAT_ZONE = { x: 276, y: 424, w: 88, h: 14 }; // walking down onto the bottom of the door mat = leave
  // Furniture: spr = HOUSE_INTERIOR_SPRITES key, x/y/w/h = drawn box (stage px), solid = [x,y,w,h] feet-blocking rect,
  // hit = interaction-only rect, say = flavour line shown on Enter.
  var HOUSE_FURN = [
    { spr: 'rug', x: 122, y: 214, w: 176, h: 104, z: 1 },
    { spr: 'mat', x: 272, y: 414, w: 96, h: 32, z: 1 },
    { spr: 'window', x: 304, y: 24, w: 104, h: 96, z: 2, hit: [304, 150, 104, 10], label: 'window', say: 'Lovely day out. No incidents in sight.' },
    { spr: 'plant', x: 20, y: 114, w: 64, h: 64, solid: [32, 152, 40, 26], label: 'plant', say: 'It is thriving. Unlike the legacy service.' },
    { spr: 'tv', x: 142, y: 74, w: 136, h: 116, solid: [146, 150, 128, 40], label: 'TV', say: 'Nothing good on. Just a status page.' },
    { spr: 'counterSink', x: 424, y: 114, w: 64, h: 64, solid: [424, 150, 64, 28], label: 'sink', say: 'The kettle is on. Stand-up is in five.' },
    { spr: 'counterCabinet2', x: 488, y: 114, w: 64, h: 64, solid: [488, 150, 64, 28], label: 'cupboard', say: 'Mugs. Every one has a ticket number on it.' },
    { spr: 'fridge', x: 552, y: 40, w: 72, h: 144, solid: [554, 150, 68, 34], label: 'fridge', say: 'Leftover pizza. Untouched since the last deploy.' },
    { spr: 'coffeetable', x: 154, y: 228, w: 112, h: 64, solid: [158, 236, 104, 56], label: 'coffee table', say: 'A mug of cold coffee. Classic.' },
    { spr: 'sofa', x: 110, y: 293, w: 200, h: 92, solid: [114, 298, 192, 86], label: 'sofa', say: 'Comfy. You could refactor here for hours.' },
    { spr: 'armchair', x: 18, y: 222, w: 88, h: 88, solid: [22, 230, 80, 80], label: 'armchair', say: 'Reserved for whoever is on call tonight.' },
    { spr: 'armchair', x: 314, y: 222, w: 88, h: 88, flip: true, solid: [318, 230, 80, 80], label: 'armchair', say: 'Still warm. Someone just merged to main.' }
  ];

  // ---- Data-driven homes. HOUSE_HOMES[i] belongs to house index i; null = the generic room (DEFAULT_HOME). ----
  // Home = { name, sign, heading, subtitle, theme:{wall,wall2,wainscot,wainscotBorder,sidewall,floorFilter}, furniture:[...], residents:[...], pets:[...] }
  // Furniture: as HOUSE_FURN, plus front:N (a second copy clipped from N px down, drawn ABOVE seated residents),
  //   glow:[x,y,w,h,'#rgb'] (flickering screen overlay), css:'extra style'.
  // Resident: { id,name,hair,hairColor,skinColor,bodyColor,trimColor,accessory,accColor,expr,x,y(feet),scale,pose,back,act,hit,lines }
  // Pet: { id,kind,name,spr,x,y,w,h,act,solid,hit,tail:{spr,x,y,w,h},z,lines }
  var DEFAULT_HOME = {
    name: 'House', sign: 'House', heading: 'HOME',
    subtitle: 'Make yourself comfortable. Walk to the door mat to head back out.',
    theme: {}, furniture: HOUSE_FURN, residents: [], pets: []
  };
  var houseIdx = -1, houseReturn = null, houseLoopHandle = null, houseLockUntil = 0;
  var houseHero = { x: HOUSE_ROOM.startX, y: HOUSE_ROOM.startY - HERO_FOOT_DY, facing: 'up', moving: false };
  var houseBubbleUntil = 0, houseActionText = '', houseActionMode = null;
  var houseHomeActive = DEFAULT_HOME, houseFurnActive = HOUSE_FURN, houseSolidRects = [], houseBubbleAnchor = null;
  var houseLineIdx = {}; // per-session (in-memory) line cursor per resident/pet id
  // Generic interior state (houses and tower scenes share the engine): active room bounds, active exit zones, Esc / Back action, input lock.
  var houseRoomActive = HOUSE_ROOM, houseExitsActive = [], houseBackFn = null, houseInputLock = false, houseExitArmed = false;

  function homeFor(i) { return (i >= 0 && HOUSE_HOMES[i]) || DEFAULT_HOME; }

  function houseFurnHTML(f) {
    var S = HOUSE_INTERIOR_SPRITES;
    var z = f.z !== undefined ? f.z : f.y + f.h;
    var st = 'left:' + f.x + 'px;top:' + f.y + 'px;width:' + f.w + 'px;height:' + f.h + 'px;' + (f.flip ? 'transform:scaleX(-1);' : '') + (f.css || '');
    var h = '<img class="dgc-house-furn' + (f.cls ? ' ' + f.cls : '') + '" alt="" draggable="false" src="' + S[f.spr] + '" style="' + st + 'z-index:' + z + ';">';
    if (f.front !== undefined) {
      var zf = f.zf !== undefined ? f.zf : f.y + f.h;
      h += '<img class="dgc-house-furn dgc-house-furn-front" alt="" draggable="false" src="' + S[f.spr] + '" style="' + st + 'clip-path:inset(' + f.front + 'px 0 0 0);z-index:' + zf + ';">';
    }
    if (f.glow) {
      var gl = typeof f.glow[0] === 'number' ? [f.glow] : f.glow;
      gl.forEach(function (g) {
        h += '<div class="dgc-house-tvglow' + (g[4] ? ' dgc-glow-' + g[4] : '') + '" style="left:' + g[0] + 'px;top:' + g[1] + 'px;width:' + g[2] + 'px;height:' + g[3] + 'px;' + (g[5] ? 'animation-delay:' + g[5] + 's;' : '') + 'z-index:' + ((f.z !== undefined ? f.z : f.y + f.h) + 1) + ';"></div>';
      });
    }
    return h;
  }

  function houseAddZs(el, n, x0, y0) {
    for (var k = 0; k < n; k++) {
      var z = document.createElement('span');
      z.className = 'dgc-house-z'; z.textContent = 'z';
      z.style.left = (x0 + k * 5) + 'px'; z.style.top = (y0 - k * 3) + 'px'; z.style.animationDelay = (k * 1.2) + 's';
      el.appendChild(z);
    }
  }

  // Simple in-room wander: pick a target inside the zone (feet coords), walk 0.5px/tick, pause 1.5-4s. Zones never touch solids (checked offline).
  var houseWanderers = [];
  function houseEntPos(e) { return { x: e._lx !== undefined ? e._lx : e.x, y: e._ly !== undefined ? e._ly : e.y }; }
  function houseWanderPick(w) {
    var z = w.zone;
    w.tx = z.x + Math.random() * z.w; w.ty = z.y + Math.random() * z.h;
  }
  function houseWanderTick() {
    for (var k = 0; k < houseWanderers.length; k++) {
      var w = houseWanderers[k];
      if (w.wait > 0) { w.wait--; continue; }
      var dx = w.tx - w.x, dy = w.ty - w.y, d = Math.hypot(dx, dy);
      if (d <= 0.6) { w.wait = 94 + Math.floor(Math.random() * 156); houseWanderPick(w); continue; }
      w.x += dx / d * 0.5; w.y += dy / d * 0.5;
      var e = w.ent;
      e._lx = w.x; e._ly = w.y;
      if (w.pet) { w.el.style.left = (w.x - e.w / 2) + 'px'; w.el.style.top = (w.y - e.h) + 'px'; w.el.style.zIndex = Math.round(w.y); }
      else { w.el.style.left = w.x + 'px'; w.el.style.top = w.y + 'px'; w.el.style.zIndex = Math.round(w.y); }
    }
  }
  function houseRegisterWander(e, el, isPet) {
    var w = { ent: e, el: el, pet: isPet, zone: e.wander, x: isPet ? e.x + e.w / 2 : e.x, y: isPet ? e.y + e.h : e.y, wait: 30 + Math.floor(Math.random() * 120) };
    houseWanderPick(w);
    houseWanderers.push(w);
  }
  // Ambient particle effects: { kind:'steam'|'notes'|'hearts'|'sparkle'|'speech'|'shoot', x, y, n, z, delay? } (stage coords)
  function houseBuildFx(home) {
    var stage = $('dgcHouseStage');
    if (!stage) return;
    (home.fx || []).forEach(function (f) {
      var box = document.createElement('div');
      box.className = 'dgc-house-fx';
      box.style.left = f.x + 'px'; box.style.top = f.y + 'px'; box.style.zIndex = f.z !== undefined ? f.z : 990;
      var n = f.n || 3, glyphs = ['♪', '♫', '♬', '♪'], cols = ['#fff3c4', '#ffb0d0', '#9bd6f5', '#b8f0a0'];
      if (f.kind === 'speech') {
        var sb = document.createElement('div');
        sb.className = 'dgc-fx-speech'; sb.innerHTML = '<i></i><i></i><i></i>';
        sb.style.animationDelay = (f.delay || 0) + 's';
        box.appendChild(sb);
      } else if (f.kind === 'shoot') {
        var st = document.createElement('div');
        st.className = 'dgc-fx-shoot'; st.style.animationDelay = (-(f.delay || 3)) + 's';
        box.appendChild(st);
      } else {
        for (var k = 0; k < n; k++) {
          var sp = document.createElement('span');
          if (f.kind === 'notes') {
            sp.className = 'dgc-fx-note'; sp.textContent = glyphs[k % 4]; sp.style.color = cols[k % 4];
            sp.style.left = ((k % 2 ? 10 : -12) + k * 3) + 'px'; sp.style.animationDelay = (-(k * 3.4 / n)) + 's';
          } else if (f.kind === 'hearts') {
            sp.className = 'dgc-fx-heart'; sp.textContent = '♥';
            sp.style.left = ((k % 2 ? 8 : -8) + (k % 3) * 3) + 'px'; sp.style.setProperty('--dx', ((k % 2 ? 6 : -6)) + 'px'); sp.style.animationDelay = (-(k * 3.6 / n)) + 's';
          } else if (f.kind === 'embers') {
            sp.className = 'dgc-fx-ember';
            sp.style.left = ((k % 3) * 12 - 12 + (k % 2) * 4) + 'px'; sp.style.animationDelay = (-(k * 3.1 / n)) + 's'; sp.style.animationDuration = (2.6 + (k % 3) * 0.7) + 's'; sp.style.setProperty('--dx', ((k % 2 ? 9 : -8) + k) + 'px');
          } else if (f.kind === 'sparkle') {
            sp.className = 'dgc-fx-spark'; sp.textContent = '✦'; if (k % 2) sp.style.color = '#8fe8ff';
            sp.style.left = ((k % 2 ? 14 : -14) + (k % 3) * 9 - 6) + 'px'; sp.style.top = (-(k * 9) % 26) + 'px'; sp.style.animationDelay = (-(k * 2.4 / n)) + 's';
          } else {
            sp.className = 'dgc-fx-puff';
            sp.style.left = ((k % 3) * 6 - 6) + 'px'; sp.style.animationDelay = (-(k * 2.6 / n)) + 's'; sp.style.setProperty('--dx', ((k % 2 ? 7 : -5)) + 'px');
          }
          box.appendChild(sp);
        }
      }
      stage.appendChild(box);
    });
  }

  // Roof activities (Plan F stage 2): r.act may be several space-separated names; residents using any new activity get .dgc-res-x (shoulder-pivot arms).
  var ROOF_NEW_ACTS = { stargaze: 1, point: 1, chat: 1, laughchat: 1, kiss: 1, hug: 1, flirt: 1, drink: 1, tipsy: 1, dance: 1, mix: 1 };
  function roofActClasses(act) {
    var names = String(act || 'still').split(' '), out = [], x = false;
    names.forEach(function (a) { if (a) { out.push('dgc-act-' + a); if (ROOF_NEW_ACTS[a]) x = true; } });
    return out.join(' ') + (x ? ' dgc-res-x' : '');
  }
  function buildHouseResidents(home) {
    var stage = $('dgcHouseStage');
    if (!stage) return;
    houseWanderers = [];
    (home.pets || []).forEach(function (p) {
      p._lx = undefined; p._ly = undefined;
      var w = document.createElement('div');
      w.className = 'dgc-house-pet dgc-act-' + (p.act || 'still');
      w.setAttribute('data-pet', p.id);
      w.style.cssText = 'left:' + p.x + 'px;top:' + p.y + 'px;width:' + p.w + 'px;height:' + p.h + 'px;z-index:' + (p.z !== undefined ? p.z : Math.round(p.y + p.h)) + ';';
      var img = '<img class="dgc-house-pet-body" alt="" draggable="false" src="' + HOUSE_INTERIOR_SPRITES[p.spr] + '">';
      if (p.tail) img += '<img class="dgc-house-pet-tail" alt="" draggable="false" src="' + HOUSE_INTERIOR_SPRITES[p.tail.spr] + '" style="left:' + p.tail.x + 'px;top:' + p.tail.y + 'px;width:' + p.tail.w + 'px;height:' + p.tail.h + 'px;">';
      w.innerHTML = img;
      if (p.act === 'sleep') houseAddZs(w, 3, p.w - 10, 4);
      stage.appendChild(w);
      if (p.wander) houseRegisterWander(p, w, true);
    });
    (home.residents || []).forEach(function (r) {
      r._lx = undefined; r._ly = undefined;
      var sc = r.scale || 0.9;
      var el = document.createElement('div');
      el.className = 'dgc-house-res ' + roofActClasses(r.act) + (r.pose === 'sit' ? ' dgc-res-sit' : '') + (r.back ? ' dgc-res-back' : '');
      el.setAttribute('data-res', r.id);
      el.style.left = r.x + 'px'; el.style.top = r.y + 'px';
      el.style.marginLeft = '-32px'; el.style.marginTop = '-82px';
      el.style.transform = (r.lean ? 'rotate(' + r.lean + 'deg) ' : '') + (r.flip ? 'scale(' + (-sc) + ',' + sc + ')' : 'scale(' + sc + ')');
      if (r.lean || r.flip || r.prop || r.dialogue) el.style.setProperty('--dl', (-((r.x * 7 + r.y * 3) % 60) / 10) + 's');
      el.style.zIndex = r.z !== undefined ? r.z : Math.round(r.y);
      var sp = document.createElement('div');
      sp.className = 'dgc-sprite dgc-house-res-sprite';
      sp.style.animationDelay = (-(r.x % 7) * 0.37) + 's';
      var svg = npcChibiRoot(r);
      if (r.back) svg = svg.replace('class="dgc-chibi-head" cx="50" cy="42" r="23" fill="' + r.skinColor + '"', 'class="dgc-chibi-head" cx="50" cy="42" r="23" fill="' + r.hairColor + '"');
      sp.innerHTML = svg;
      el.appendChild(sp);
      if (!r.back) setExpression(sp, r.expr.idle);
      if (r.prop) {
        var pr = document.createElement('span');
        pr.className = 'dgc-res-prop' + (r.prop.cls ? ' ' + r.prop.cls : '');
        pr.style.cssText = 'left:' + r.prop.x + 'px;top:' + r.prop.y + 'px;width:' + r.prop.w + 'px;height:' + r.prop.h + 'px;';
        pr.innerHTML = '<img alt="" draggable="false" src="' + HOUSE_INTERIOR_SPRITES[r.prop.spr] + '"' + (r.prop.flip ? ' style="transform:scaleX(-1)"' : '') + '>';
        sp.appendChild(pr);
      }
      if (r.act === 'sleep') houseAddZs(el, 3, 46, 8);
      stage.appendChild(el);
      if (r.wander) houseRegisterWander(r, el, false);
    });
    houseBuildFx(home);
  }

  function buildHouseRoom(i) {
    var stage = $('dgcHouseStage');
    if (!stage) return;
    var home = (i && typeof i === 'object') ? i : homeFor(i); // a home object (tower scenes) or a house index
    houseHomeActive = home; houseFurnActive = home.furniture;
    // wipe the previous room (never the hero token or the bubble)
    Array.prototype.forEach.call(stage.querySelectorAll('.dgc-house-wall,.dgc-house-floor,.dgc-house-sidewall,.dgc-house-frontwall,.dgc-house-door,.dgc-house-furn,.dgc-house-tvglow,.dgc-house-res,.dgc-house-pet,.dgc-house-fx,.dgc-house-tag'), function (n) { n.parentNode.removeChild(n); });
    var th = home.theme || {};
    [['--room-wall', th.wall], ['--room-wall2', th.wall2], ['--room-wainscot', th.wainscot], ['--room-wainscot-border', th.wainscotBorder], ['--room-sidewall', th.sidewall], ['--room-floor-filter', th.floorFilter], ['--sky-top', th.skyTop], ['--sky-bot', th.skyBot], ['--sky-glow', th.skyGlow]].forEach(function (kv) {
      if (kv[1]) stage.style.setProperty(kv[0], kv[1]); else stage.style.removeProperty(kv[0]);
    });
    var hd = $('dgcHouseHeading'), sb = $('dgcHouseSub');
    if (hd) hd.textContent = home.heading || 'HOME';
    if (sb) sb.textContent = home.subtitle || DEFAULT_HOME.subtitle;
    var S = HOUSE_INTERIOR_SPRITES;
    // home.outdoor (roofs): sky band instead of a wall, no wainscot / front wall / door, side walls are a low parapet
    var od = !!home.outdoor;
    var html = '<div class="dgc-house-wall' + (od ? ' dgc-sky' : '') + '">' + (od ? '' : '<div class="dgc-house-wainscot"></div>') + '</div>' +
      '<div class="dgc-house-floor' + (od ? ' dgc-deck' : '') + '" style="background-image:url(' + (S[th.floor] || S.floor) + ')"></div>' +
      '<div class="dgc-house-sidewall' + (od ? ' dgc-side-parapet' : '') + '" style="left:0"></div><div class="dgc-house-sidewall' + (od ? ' dgc-side-parapet' : '') + '" style="right:0"></div>' +
      (od ? '' : '<div class="dgc-house-frontwall"></div>') + (home.noDoor ? '' : '<div class="dgc-house-door"></div>');
    home.furniture.forEach(function (f) { html += houseFurnHTML(f); });
    (home.labels || []).forEach(function (t) { html += '<div class="dgc-house-tag' + (t.cls ? ' ' + t.cls : '') + '" style="left:' + t.x + 'px;top:' + t.y + 'px;width:' + t.w + 'px;height:' + t.h + 'px;z-index:' + (t.z || 3) + ';">' + t.text + '</div>'; });
    stage.insertAdjacentHTML('afterbegin', html);
    buildHouseResidents(home);
    houseSolidRects = [];
    home.furniture.forEach(function (f) { if (f.solid) houseSolidRects.push(f.solid); if (f.solids) f.solids.forEach(function (r) { houseSolidRects.push(r); }); });
    (home.pets || []).forEach(function (p) { if (p.solid) houseSolidRects.push(p.solid); });
  }

  function houseBlockedAt(cx, cy) {
    var fx = cx, fy = cy + HERO_FOOT_DY;
    if (fx < houseRoomActive.minX || fx > houseRoomActive.maxX || fy < houseRoomActive.minY || fy > houseRoomActive.maxY) return true;
    for (var i = 0; i < houseSolidRects.length; i++) {
      var r = houseSolidRects[i];
      if (fx + 10 > r[0] && fx - 10 < r[0] + r[2] && fy > r[1] && fy < r[1] + r[3]) return true;
    }
    return false;
  }
  // The exit zone (feet inside it) the hero is standing in, or null. Houses: the door mat; tower scenes: lift / stairs / doors.
  function houseExitAt() {
    var fx = houseHero.x, fy = houseHero.y + HERO_FOOT_DY;
    for (var i = 0; i < houseExitsActive.length; i++) {
      var m = houseExitsActive[i];
      if (fx >= m.x && fx <= m.x + m.w && fy >= m.y && fy <= m.y + m.h) return m;
    }
    return null;
  }
  function houseRectDist(r, fx, fy) {
    var dx = Math.max(r[0] - fx, 0, fx - (r[0] + r[2])), dy = Math.max(r[1] - fy, 0, fy - (r[1] + r[3]));
    return Math.hypot(dx, dy);
  }
  // Nearest interactable: furniture (within 30px) OR resident / pet (within 38px, preferred by a 10px bias).
  // Returns { kind:'furn'|'res'|'pet', label, say?, ent } or null.
  function houseNearFurn() {
    var fx = houseHero.x, fy = houseHero.y + HERO_FOOT_DY, best = null, bd = 1e9;
    houseFurnActive.forEach(function (f) {
      var r = f.hit || f.solid;
      if (!r || !f.say) return;
      var d = houseRectDist(r, fx, fy);
      if (d <= 30 && d < bd) { best = { kind: 'furn', label: f.label, say: f.say, ent: f }; bd = d; }
    });
    ['residents', 'pets'].forEach(function (key) {
      (houseHomeActive[key] || []).forEach(function (e) {
        var lp = houseEntPos(e), r;
        if (e.hit) r = [e.hit[0] + lp.x - e.x, e.hit[1] + lp.y - e.y, e.hit[2], e.hit[3]];
        else r = key === 'residents' ? [lp.x - 20, lp.y - 24, 40, 24] : (e.wander ? [lp.x - e.w / 2, lp.y - 24, e.w, 24] : [e.x, e.y + e.h - 24, e.w, 24]);
        var d = houseRectDist(r, fx, fy);
        if (d <= 38 && d - 10 < bd) { best = { kind: key === 'residents' ? 'res' : 'pet', label: e.name, ent: e }; bd = d - 10; }
      });
    });
    return best;
  }

  function renderHouseHero() {
    var tok = $('dgcHouseHeroToken');
    if (!tok) return;
    tok.style.left = houseHero.x + 'px';
    tok.style.top = houseHero.y + 'px';
    tok.style.zIndex = Math.round(houseHero.y + HERO_FOOT_DY);
    // stairs climb / descent: shrink the token about its feet (cleared as soon as houseHero.scale is unset)
    if (houseHero.scale && houseHero.scale !== 1) { tok.style.transformOrigin = '50% calc(50% + ' + HERO_FOOT_DY + 'px)'; tok.style.transform = 'translate(-50%,-50%) scale(' + houseHero.scale.toFixed(3) + ')'; }
    else if (tok.style.transform) { tok.style.transform = ''; tok.style.transformOrigin = ''; }
    var fe = $('dgcHouseHeroFacing');
    if (fe) fe.style.transform = houseHero.facing === 'left' ? 'scaleX(-1)' : 'scaleX(1)';
    var ow = $('dgcHouseHeroSprite') && $('dgcHouseHeroSprite').querySelector('.dgc-overworld-sprite');
    if (ow) ow.setAttribute('data-facing', overworldFacingGroup(houseHero.facing));
    tok.classList.toggle('dgc-city-walking', !!houseHero.moving);
    var b = $('dgcHouseBubble');
    if (b && !b.hidden) {
      var bax = houseBubbleAnchor ? houseBubbleAnchor.x : houseHero.x;
      var bay = houseBubbleAnchor ? houseBubbleAnchor.y : houseHero.y - 58;
      b.style.left = Math.max(110, Math.min(houseRoomActive.w - 110, bax)) + 'px';
      var bbelow = houseBubbleAnchor && houseBubbleAnchor.below;
      b.style.transform = bbelow ? 'translate(-50%,0)' : '';
      b.style.top = (bbelow ? bay : Math.max(60, bay)) + 'px';
    }
  }

  function fitHouseStage() {
    var scr = $('dgcHouseScreen'), frame = $('dgcHouseFrame'), stage = $('dgcHouseStage');
    if (!scr || !frame || !stage) return;
    var avail = scr.clientWidth - 24;
    if (avail <= 0) avail = HOUSE_ROOM.w;
    var s = Math.min(avail / HOUSE_ROOM.w, Math.max(0.3, (window.innerHeight - 230) / HOUSE_ROOM.h), 1.6);
    frame.style.width = Math.round(HOUSE_ROOM.w * s) + 'px';
    frame.style.height = Math.round(HOUSE_ROOM.h * s) + 'px';
    stage.style.transform = 'scale(' + s + ')';
  }

  function screenFadeIn(id) {
    var el = $(id);
    if (!el) return;
    el.classList.remove('dgc-screen-fadein');
    void el.offsetWidth; // restart the CSS animation
    el.classList.add('dgc-screen-fadein');
    setTimeout(function () { el.classList.remove('dgc-screen-fadein'); }, 400);
  }

  var HOUSE_HINT_DEFAULT = 'Arrow keys / WASD to walk. Walk onto the door mat to leave. Enter to look at things. Esc goes back.';
  // def = { home, room:{minX,maxX,minY,maxY,startX,startY}, exits:[{x,y,w,h,text,go}], spawn:{x,y,facing} (feet coords), hint, backLabel, back }
  function houseDef(i) {
    return {
      home: homeFor(i), room: HOUSE_ROOM,
      exits: [{ x: HOUSE_MAT_ZONE.x, y: HOUSE_MAT_ZONE.y, w: HOUSE_MAT_ZONE.w, h: HOUSE_MAT_ZONE.h, text: 'Leave house', go: function () { leaveHouse(); } }],
      spawn: { x: HOUSE_ROOM.startX, y: HOUSE_ROOM.startY, facing: 'up' },
      hint: HOUSE_HINT_DEFAULT, backLabel: '\u2190 Leave house', back: function () { leaveHouse(); }
    };
  }
  // Build the scene described by def into the (already shown or about-to-be-shown) house screen.
  function applyInterior(def) {
    var room = {}, k;
    for (k in HOUSE_ROOM) room[k] = HOUSE_ROOM[k];
    if (def.room) for (k in def.room) room[k] = def.room[k];
    houseRoomActive = room;
    houseExitsActive = def.exits || [];
    houseBackFn = def.back || null;
    towerFxReset();
    houseInputLock = false;
    houseExitArmed = false; // armed by houseTick once the hero stands outside every exit zone (spawns may sit inside one)
    houseBubbleAnchor = null;
    buildHouseRoom(def.home);
    var sp = def.spawn || { x: room.startX, y: room.startY, facing: 'up' };
    houseHero = { x: sp.x, y: sp.y - HERO_FOOT_DY, facing: sp.facing || 'up', moving: false };
    var ht = $('dgcHouseHint'); if (ht) ht.textContent = def.hint || HOUSE_HINT_DEFAULT;
    var bb = $('dgcHouseLeaveBtn'); if (bb) bb.textContent = def.backLabel || '\u2190 Leave house';
    var b = $('dgcHouseBubble'); if (b) b.hidden = true;
    var pr = $('dgcHouseAction'); if (pr) pr.hidden = true;
    houseActionText = ''; houseActionMode = null;
  }
  // Enter an interior from the city. ret = { x, y (hero token centre), i } = where the hero reappears outside.
  function enterInterior(def, ret) {
    if (!$('dgcHouseScreen').hidden || Date.now() < houseLockUntil) return;
    houseReturn = ret;
    houseIdx = ret && ret.i !== undefined ? ret.i : -1;
    cityDoorArmed = false;
    stopCityLoop();
    applyInterior(def);
    var hs = $('dgcHouseHeroSprite');
    if (hs) hs.innerHTML = overworldSpriteSVG('hero');
    refreshHeroNameLabels();
    showScreen('house');
    fitHouseStage();
    renderHouseHero();
    screenFadeIn('dgcHouseScreen');
    houseLockUntil = Date.now() + 450;
    stopHouseLoop();
    houseLoopHandle = setInterval(houseTick, 16);
    try { playSfx('click'); } catch (e) { /* sfx optional */ }
  }
  // Scene-to-scene move inside the interior screen (lobby <-> hallway <-> room). A short lock stops the same Enter press chaining into another exit.
  function switchInterior(def) {
    if ($('dgcHouseScreen').hidden) return;
    applyInterior(def);
    fitHouseStage();
    renderHouseHero();
    screenFadeIn('dgcHouseScreen');
    houseLockUntil = Date.now() + 350;
    try { playSfx('click'); } catch (e) { /* sfx optional */ }
  }
  function enterHouse(i) {
    if (!(i >= 0 && i < HOUSE_DOORS.length)) return;
    var d = HOUSE_DOORS[i];
    enterInterior(houseDef(i), { x: d.cx, y: d.retY, i: i });
  }

  function stopHouseLoop() {
    if (houseLoopHandle) { clearInterval(houseLoopHandle); houseLoopHandle = null; }
    cityKeys = { up: false, down: false, left: false, right: false, run: false };
  }

  function leaveHouse() {
    if ($('dgcHouseScreen').hidden || !houseReturn) return;
    stopHouseLoop();
    towerFxReset();
    houseInputLock = false;
    houseHero.moving = false;
    cityHero.x = houseReturn.x;
    cityHero.y = houseReturn.y;
    cityHero.facing = 'down';
    cityHero.moving = false;
    var ct = $('dgcCityHeroToken');
    if (ct) ct.classList.remove('dgc-city-walking');
    goToCityScreen();
    screenFadeIn('dgcCityScreen');
    houseLockUntil = Date.now() + 450;
    try { playSfx('click'); } catch (e) { /* sfx optional */ }
  }

  function houseShowBubble(text, anchor, ms) {
    var b = $('dgcHouseBubble');
    if (!b) return;
    houseBubbleAnchor = anchor || null;
    b.textContent = text;
    b.hidden = false;
    houseBubbleUntil = Date.now() + (ms || 2600);
    renderHouseHero();
  }

  // roof people: flash the talk (or react, for reactive lines) expression for a moment
  function houseResReact(e, reactive) {
    if (!e.expr || e.back) return;
    var el = document.querySelector('#dgcHouseStage .dgc-house-res[data-res="' + e.id + '"]');
    var sp = el && el.querySelector('.dgc-house-res-sprite');
    var nm = reactive ? (e.expr.react || e.expr.talk) : e.expr.talk;
    if (!sp || !nm) return;
    setExpression(sp, nm);
    clearTimeout(el._exprT);
    el._exprT = setTimeout(function () { setExpression(sp, e.expr.idle); }, 2600);
  }
  function houseInteract() {
    if (Date.now() < houseLockUntil) return;
    if (houseInputLock) return;
    var ex = houseExitAt();
    if (ex && ex.reuse) { ex.go(); return; }
    var n = houseNearFurn();
    if (!n) return;
    if (n.kind === 'furn') { houseShowBubble(n.say, null); }
    else {
      var e = n.ent, ls = e.lines || ['...'];
      var k = houseLineIdx[e.id] || 0;
      houseLineIdx[e.id] = (k + 1) % ls.length;
      if (n.kind === 'res') {
        var rp = houseEntPos(e);
        if (e.dialogue) {
          // roof people: the never-repeat dialogue engine (pickLine), talk / react expression flash
          var pl = pickLine(e.id, e);
          houseShowBubble(e.name + ': ' + pl.text, (rp.y - 82 * (e.scale || 0.9) - 4 < 84) ? { x: rp.x, y: rp.y + 6, below: true } : { x: rp.x, y: rp.y - 82 * (e.scale || 0.9) - 4 }, Math.min(6500, 2600 + 45 * pl.text.length));
          houseResReact(e, pl.reactive);
        } else houseShowBubble(e.name + ': ' + ls[k % ls.length], { x: rp.x, y: rp.y - 82 * (e.scale || 0.9) - 4 });
      } else {
        var pp = houseEntPos(e);
        houseShowBubble(ls[k % ls.length], { x: e.wander ? pp.x : e.x + e.w / 2, y: (e.wander ? pp.y - e.h : e.y) - 4 });
        var pw = document.querySelector('#dgcHouseStage .dgc-house-pet[data-pet="' + e.id + '"]');
        if (pw) {
          var old = pw.querySelector('.dgc-house-heart'); if (old) old.parentNode.removeChild(old);
          var hh = document.createElement('span'); hh.className = 'dgc-house-heart'; hh.textContent = '♥';
          pw.appendChild(hh);
          setTimeout(function () { if (hh.parentNode) hh.parentNode.removeChild(hh); }, 1400);
        }
      }
    }
    try { playSfx('click'); } catch (er) { /* sfx optional */ }
  }

  function houseTick() {
    var panel = document.getElementById('tab-game');
    if (!panel || panel.offsetParent === null || $('dgcHouseScreen').hidden) { stopHouseLoop(); towerFxReset(); houseInputLock = false; return; }
    if (stairsAnim) { stairsStep(); }
    else if ($('dgcModalBackdrop').hidden && !houseInputLock) {
      var speed = 3.2, dx = 0, dy = 0;
      if (cityKeys.up) dy -= 1;
      if (cityKeys.down) dy += 1;
      if (cityKeys.left) dx -= 1;
      if (cityKeys.right) dx += 1;
      var moving = dx !== 0 || dy !== 0;
      if (moving) {
        var len = Math.hypot(dx, dy);
        dx = dx / len * speed; dy = dy / len * speed;
        if (!houseBlockedAt(houseHero.x + dx, houseHero.y)) houseHero.x += dx;
        if (!houseBlockedAt(houseHero.x, houseHero.y + dy)) houseHero.y += dy;
        if (dx > 0) houseHero.facing = 'right';
        else if (dx < 0) houseHero.facing = 'left';
        else if (dy > 0) houseHero.facing = 'down';
        else if (dy < 0) houseHero.facing = 'up';
      }
      houseHero.moving = moving;
      renderHouseHero();
    } else if (houseInputLock && houseHero.moving) { houseHero.moving = false; renderHouseHero(); }
    // Walk-through exits: stepping onto an exit zone fires it once (armed flag; a scene spawn inside a zone never fires).
    if (!stairsAnim) {
      var wz = houseExitAt();
      if (!wz) houseExitArmed = true;
      else if (houseExitArmed && !houseInputLock && !liftPanelOpen && !liftRiding && Date.now() >= houseLockUntil && $('dgcModalBackdrop').hidden) {
        houseExitArmed = false;
        wz.go();
        return;
      }
    }
    houseWanderTick();
    var b = $('dgcHouseBubble');
    if (b && !b.hidden && Date.now() > houseBubbleUntil) b.hidden = true;
    // Action prompt (tappable): leave on the mat, else "look at" the nearest furniture.
    var text = '', mode = null;
    var exz = houseExitAt();
    if (houseInputLock) { text = ''; mode = null; }
    else if (exz && exz.reuse) { text = '⏎ ' + exz.text; mode = 'leave'; } // the lift zone offers a re-open after the panel was closed
    else {
      var f = houseNearFurn();
      if (f) {
        if (f.kind === 'res') text = '⏎ Talk to ' + f.label;
        else if (f.kind === 'pet') text = '⏎ Pet ' + f.label;
        else text = '⏎ Look at ' + f.label;
        mode = 'look';
      }
    }
    if (text !== houseActionText) {
      houseActionText = text; houseActionMode = mode;
      var pr = $('dgcHouseAction');
      if (pr) { pr.textContent = text; pr.hidden = !mode; }
    }
  }

  function houseScreenIsLive() {
    var s = $('dgcHouseScreen');
    return !!s && !s.hidden && $('dgcModalBackdrop').hidden;
  }
  document.addEventListener('keydown', function (e) {
    if (!houseScreenIsLive()) return;
    var k = e.key.toLowerCase();
    if (liftPanelOpen && !liftRiding && (k === 'g' || k === 'r' || (k.length === 1 && k >= '0' && k <= String(TOWER_ROOF)))) { e.preventDefault(); liftRide(k === 'g' ? 0 : (k === 'r' ? TOWER_ROOF : parseInt(k, 10))); return; }
    if (k === 'arrowup' || k === 'w') { cityKeys.up = true; e.preventDefault(); }
    else if (k === 'arrowdown' || k === 's') { cityKeys.down = true; e.preventDefault(); }
    else if (k === 'arrowleft' || k === 'a') { cityKeys.left = true; e.preventDefault(); }
    else if (k === 'arrowright' || k === 'd') { cityKeys.right = true; e.preventDefault(); }
    else if (k === 'enter' || k === ' ') { e.preventDefault(); e.stopImmediatePropagation(); if (!e.repeat) houseInteract(); }
    else if (k === 'escape') { e.stopImmediatePropagation(); if (towerFxEsc()) return; if (Date.now() >= houseLockUntil && !houseInputLock && houseBackFn) houseBackFn(); }
  });
  $('dgcHouseLeaveBtn').addEventListener('click', function () { if (towerFxEsc()) return; if (Date.now() >= houseLockUntil && !houseInputLock && houseBackFn) houseBackFn(); });
  $('dgcHouseAction').addEventListener('click', houseInteract);
  window.addEventListener('resize', function () { if (!$('dgcHouseScreen').hidden) fitHouseStage(); });
  Array.prototype.forEach.call(document.querySelectorAll('#dgcHouseDpad .dgc-city-dpad-btn'), function (btn) {
    var dir = btn.getAttribute('data-dir');
    var press = function (e) { e.preventDefault(); cityKeys[dir] = true; };
    var release = function () { cityKeys[dir] = false; };
    btn.addEventListener('pointerdown', press);
    btn.addEventListener('pointerup', release);
    btn.addEventListener('pointerleave', release);
    btn.addEventListener('pointercancel', release);
  });

  /* ============================================================
     TOWERS (New City): two tall buildings, each with a ground-floor lobby
     (reception, lift, stairs), 5 floors above it (hallway + 3 rooms per
     floor). Every scene is a generic interior (enterInterior / switchInterior).
     Scene hierarchy (Esc / Back = one level up): room -> hallway -> lobby -> outside.

     HOOKS FOR THE LIFT / STAIRS ANIMATIONS (stage 5):
       goFloor(towerIdx, floor, arrival)   floor 0 = lobby, 1..TOWER_FLOORS = hallways, TOWER_ROOF = the rooftop (arrivals 'lift' / 'stairsDown').
            arrival: 'lift' (in front of that floor's lift), 'stairsUp' (foot of the up stairs),
            'stairsDown' (top landing of the down stairs / foot of the lobby stairs), 'default',
            or { room: n } (hallway, in front of room door n).
       towerLiftUse()  /  towerStairsUse('up'|'down')   are called by the lift / stairs exit zones (lift panel + ride, stairs climb; see below).
       houseInputLock  while true the hero cannot move / use exits (prompts and bubbles still refresh).
       tower = { i, floor }  is the current tower + floor.
     ============================================================ */
  var TOWER_COUNT = 2, TOWER_FLOORS = 5, TOWER_ROOF = 6, ROOMS_PER_FLOOR = 3; // TOWER_ROOF = floor index of each tower's rooftop scene (see ROOFS)
  var tower = { i: 0, floor: 0 };
  var TOWER_LOOK = [
    { name: 'TOWER A', sign: 'lobbySignA', door: 'roomDoorA', wall: '#cdd6e4', wainscot: '#5f6b7f', wainscotBorder: '#3f4a5c', sidewall: '#3f4a5c', lobbyFloor: 'floorGrey', hallFloor: 'floorCarpet', roomFloor: 'floorGrey', runner: 'filter:hue-rotate(205deg) saturate(0.85);' },
    { name: 'TOWER B', sign: 'lobbySignB', door: 'roomDoorB', wall: '#efd9b8', wainscot: '#8f4a30', wainscotBorder: '#5a2c1c', sidewall: '#5a2c1c', lobbyFloor: 'floorChecker', hallFloor: 'floorCarpet', roomFloor: 'floorWood', runner: '' }
  ];
  // subtle per-floor wall tints (index = floor 1..5) and floor-tile filters
  var TOWER_FLOOR_WALLS = [
    ['', '#c6d8ec', '#c6e6d8', '#d8d0f0', '#eae4c4', '#f0cccc'],
    ['', '#f2dab4', '#f2cdbb', '#e8deae', '#e0d0bc', '#ecc0ac']
  ];
  var TOWER_FLOOR_FILTERS = ['none', 'none', 'hue-rotate(-40deg)', 'hue-rotate(30deg) brightness(1.08)', 'saturate(0.55) brightness(1.1)', 'hue-rotate(-95deg) brightness(0.95)'];
  function towerShade(hex, f) {
    var n = parseInt(hex.slice(1), 16), r = Math.round((n >> 16) * f), g = Math.round(((n >> 8) & 255) * f), b = Math.round((n & 255) * f);
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
  function towerTheme(t, floor, kind) {
    var L = TOWER_LOOK[t], wall = floor ? TOWER_FLOOR_WALLS[t][floor] : L.wall;
    return {
      wall: wall, wall2: towerShade(wall, 0.95), wainscot: L.wainscot, wainscotBorder: L.wainscotBorder, sidewall: L.sidewall,
      floor: kind === 'lobby' ? L.lobbyFloor : (kind === 'hall' ? L.hallFloor : L.roomFloor),
      floorFilter: kind === 'lobby' ? 'none' : TOWER_FLOOR_FILTERS[floor]
    };
  }
  var TOWER_HINT = 'Arrow keys / WASD to walk. Walk into the lift or onto the stairs, or through a door. Enter to look at things. Esc goes back one level.';

  /* ---- Lift (button panel + ride) and 2.5D stairs ----
     Lift: walking into the lift doorway (or tapping the doors / call button) opens #dgcLiftPanel (G 1-5, keys 0-5 / G, Esc or x closes).
       A ride locks input, closes the doors, counts the floors (300ms door close + max(900, 450 * |dFloor|) ms of counting), dings,
       opens the doors, then goFloor(t, target, 'lift') puts the hero in front of that floor's lift (doors open, then close again).
     Stairs (all walk-through, no Enter): the UP flight is a front-facing staircase against the back wall at the right end of the lobby and every hallway.
       Walking up between its newel posts onto the foot landing starts the climb: the hero walks straight up the treads (~1.8s, a small hop per step,
       shrinking to 0.82), the screen fades in the last 250ms and the hero arrives on the next floor just above that hallway's DOWN opening.
       The DOWN opening (hallways only) is a railed hole in the floor with treads descending toward the viewer: walking down into it starts the descent:
       the hero walks straight down (~1.2s), shrinks to 0.8 and sinks behind the front lip (the sprite's front half is drawn over the hero),
       then arrives at the foot of the lower floor's up flight. The animation is a tick-driven state machine (stairsAnim, advanced by houseTick, 16ms per tick). */
  var liftPanelOpen = false, liftRiding = false, liftTimers = [], stairsAnim = null, stairsMsgUntil = 0;
  var STAIRS_UP_SPR = { x: 462, y: 18, w: 120, h: 152 }, STAIRS_UP_CX = 522;            // sprite box + centre line of the treads
  var STAIRS_UP_ZONE = { x: 496, y: 158, w: 52, h: 8 };                                  // foot landing (feet space): walking onto it starts the climb
  var STAIRS_UP_SOLIDS = [[462, 158, 22, 22], [560, 158, 22, 22]];                       // newel posts / walls: the flight is entered at the foot only
  var STAIRS_UP_TOP_Y = 64, STAIRS_UP_DUR = 1800, STAIRS_UP_SCALE = 0.82;
  var STAIRS_DOWN_SPR = { x: 470, y: 338, w: 112, h: 88 }, STAIRS_DOWN_CX = 526;
  var STAIRS_DOWN_ZONE = { x: 490, y: 350, w: 72, h: 8 };                                // walking down from the back edge onto the treads starts the descent
  var STAIRS_DOWN_SOLIDS = [[470, 340, 16, 84], [566, 340, 16, 84], [470, 406, 112, 18]]; // side rails + front lip
  var STAIRS_DOWN_BOTTOM_Y = 416, STAIRS_DOWN_DUR = 1200, STAIRS_DOWN_SCALE = 0.8, STAIRS_FADE_MS = 250;
  var STAIRS_ARRIVE_FOOT = { x: 522, y: 200, facing: 'down' };  // came DOWN a flight: standing at the foot of this floor's up flight
  var STAIRS_ARRIVE_TOP = { x: 526, y: 322, facing: 'down' };   // came UP: standing just behind the back edge of this floor's down opening
  function liftLabel(f) { return f === 0 ? 'G' : (f === TOWER_ROOF ? 'R' : String(f)); }
  function liftLater(fn, ms) {
    var h = setTimeout(function () { try { fn(); } catch (e) { towerFxReset(); houseInputLock = false; } }, ms);
    liftTimers.push(h);
  }
  function liftDoorsEl() { return document.querySelector('#dgcHouseStage .dgc-lift-doors'); }
  function liftSetDoors(open, anim) {
    var el = liftDoorsEl();
    if (!el) return;
    el.src = HOUSE_INTERIOR_SPRITES[open ? 'liftDoorsOpen' : 'liftDoorsClosed'];
    if (anim) { el.classList.remove('dgc-lift-closing'); void el.offsetWidth; el.classList.add('dgc-lift-closing'); }
  }
  // Clear every pending lift / stairs effect (called on every scene switch, on leaving and when the tab stops the loop).
  function towerFxReset() {
    liftTimers.forEach(function (h) { clearTimeout(h); });
    liftTimers = [];
    liftPanelOpen = false; liftRiding = false; stairsAnim = null;
    if (houseHero) houseHero.scale = 1;
    var tk = $('dgcHouseHeroToken'); if (tk) { tk.style.transform = ''; tk.style.transformOrigin = ''; }
    var p = $('dgcLiftPanel'); if (p) p.hidden = true;
    var fd = $('dgcHouseFade');
    if (fd) { fd.style.transition = 'none'; fd.classList.remove('dgc-on'); void fd.offsetWidth; fd.style.transition = ''; }
  }
  // Esc / Back while a lift panel is up or an animation runs. Returns true when it consumed the key.
  function towerFxEsc() {
    if (stairsAnim || liftRiding) return true;
    if (liftPanelOpen) { closeLiftPanel(); return true; }
    return false;
  }
  function liftShowFloor(f, arrow, ding) {
    var fl = $('dgcLiftFloor'), ar = $('dgcLiftArrow'), d = $('dgcLiftDisplay');
    if (fl) fl.textContent = liftLabel(f);
    if (ar) ar.textContent = arrow || '';
    Array.prototype.forEach.call(document.querySelectorAll('#dgcLiftBtns .dgc-lift-btn'), function (b) { b.classList.toggle('dgc-lit', parseInt(b.getAttribute('data-floor'), 10) === f); });
    if (d) { d.classList.remove('dgc-lift-ding'); if (ding) { void d.offsetWidth; d.classList.add('dgc-lift-ding'); } }
  }
  function towerLiftUse() {
    if (houseInputLock || liftPanelOpen || liftRiding || stairsAnim || Date.now() < houseLockUntil) return;
    var box = $('dgcLiftBtns');
    if (!box) return;
    var cur = tower.floor, html = '';
    for (var f = TOWER_ROOF; f >= 0; f--) html += '<button type="button" tabindex="-1" class="dgc-lift-btn' + (f === cur ? ' dgc-lit' : '') + '" data-floor="' + f + '">' + liftLabel(f) + '</button>';
    box.innerHTML = html;
    liftShowFloor(cur, '', false);
    liftPanelOpen = true; houseInputLock = true;
    houseHero.moving = false; renderHouseHero();
    $('dgcLiftPanel').hidden = false;
    liftSetDoors(true, false);
    try { playSfx('click'); } catch (e) { /* sfx optional */ }
  }
  function closeLiftPanel() {
    if (liftRiding) return;
    var wasOpen = liftPanelOpen;
    liftPanelOpen = false; houseInputLock = false;
    var p = $('dgcLiftPanel'); if (p) p.hidden = true;
    if (wasOpen) liftSetDoors(false, true);
  }
  function liftRide(target) {
    if (!liftPanelOpen || liftRiding || !(target >= 0 && target <= TOWER_ROOF)) return;
    var from = tower.floor, t = tower.i;
    if (target === from) { closeLiftPanel(); houseShowBubble("You're already here.", null); return; }
    liftRiding = true; houseInputLock = true;
    var bb = $('dgcHouseBubble'); if (bb) bb.hidden = true;
    var steps = Math.abs(target - from), dur = Math.max(900, 450 * steps), up = target > from, arrow = up ? '▲' : '▼';
    Array.prototype.forEach.call(document.querySelectorAll('#dgcLiftBtns .dgc-lift-btn'), function (b) {
      b.disabled = true;
      if (parseInt(b.getAttribute('data-floor'), 10) === target) b.classList.add('dgc-lift-dest');
    });
    liftSetDoors(false, true);
    var DOOR_MS = 300;
    liftLater(function () { liftShowFloor(from, arrow, false); }, 0);
    for (var i = 1; i <= steps; i++) {
      (function (fl, at) { liftLater(function () { liftShowFloor(fl, arrow, false); }, at); })(from + (up ? i : -i), DOOR_MS + Math.round(dur * i / steps));
    }
    liftLater(function () { liftShowFloor(target, '', true); try { playSfx('ding'); } catch (e) { /* sfx optional */ } }, DOOR_MS + dur);
    liftLater(function () { liftSetDoors(true, false); }, DOOR_MS + dur + 150);
    liftLater(function () {
      goFloor(t, target, 'lift');
      if (liftRiding || liftPanelOpen) { towerFxReset(); houseInputLock = false; } // goFloor refused: never stay locked
      else {
        liftSetDoors(true, false);
        liftLater(function () { liftSetDoors(false, true); }, 1400);
      }
    }, DOOR_MS + dur + 650);
  }
  function towerStairsUse(dir) {
    if (houseInputLock || stairsAnim || liftPanelOpen || liftRiding) return;
    var f = tower.floor, t = tower.i;
    if (dir === 'up' && f >= TOWER_ROOF) return; // nothing above the roof
    if (dir === 'down' && f <= 0) return;
    var S = { x: houseHero.x, y: houseHero.y + HERO_FOOT_DY }, up = dir === 'up';
    var to = { x: up ? STAIRS_UP_CX : STAIRS_DOWN_CX, y: up ? STAIRS_UP_TOP_Y : STAIRS_DOWN_BOTTOM_Y };
    houseInputLock = true;
    var bb = $('dgcHouseBubble'); if (bb) bb.hidden = true;
    stairsAnim = {
      t: 0, dur: up ? STAIRS_UP_DUR : STAIRS_DOWN_DUR, from: S, to: to, dir: dir, sc: up ? STAIRS_UP_SCALE : STAIRS_DOWN_SCALE, fading: false,
      next: up ? function () { goFloor(t, f + 1, 'stairsDown'); } : function () { goFloor(t, f - 1, 'stairsUp'); }
    };
    houseHero.facing = up ? 'up' : 'down';
    houseHero.moving = true;
    renderHouseHero();
    try { playSfx('click'); } catch (e) { /* sfx optional */ }
  }
  // One 16ms step of the stairs state machine (called from houseTick): straight line along the treads (x eases onto the centre line in the first 12%).
  function stairsStep() {
    var a = stairsAnim;
    if (!a) return;
    a.t += 16;
    var p = Math.min(1, a.t / a.dur), ex = Math.min(1, p / 0.12);
    var fx = a.from.x + (a.to.x - a.from.x) * ex, fy = a.from.y + (a.to.y - a.from.y) * p;
    if (a.dir === 'up') fy -= Math.abs(Math.sin(p * Math.PI * 6)) * 3; // one small hop per tread (6 treads)
    houseHero.x = fx; houseHero.y = fy - HERO_FOOT_DY;
    houseHero.scale = 1 - (1 - a.sc) * p;
    houseHero.moving = true;
    renderHouseHero();
    if (!a.fading && a.t >= a.dur - STAIRS_FADE_MS) {
      a.fading = true;
      var fd = $('dgcHouseFade'); if (fd) fd.classList.add('dgc-on');
    }
    if (p >= 1) {
      var nx = a.next;
      stairsAnim = null;
      try { nx(); } catch (e) { towerFxReset(); }
      if (houseInputLock && !stairsAnim) { /* scene switch clears the lock; make sure even a refused switch does */ houseInputLock = false; houseHero.moving = false; towerFxReset(); renderHouseHero(); }
    }
  }
  $('dgcLiftBtns').addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('.dgc-lift-btn') : null;
    if (!b || b.disabled) return;
    b.blur();
    liftRide(parseInt(b.getAttribute('data-floor'), 10));
  });
  $('dgcLiftClose').addEventListener('click', function () { closeLiftPanel(); });
  $('dgcHouseStage').addEventListener('click', function (e) {
    var t = e.target;
    if (t && t.classList && (t.classList.contains('dgc-lift-doors') || t.classList.contains('dgc-lift-call'))) towerLiftUse();
  });

  /* ============================================================
     TOWER THEMES (Plan D part 3): every hallway (floors 1-5 of both towers) and every room has its own look.
     TOWER_THEMES[t] = { lobby: { extras: [furniture...], labels?: [...] },
                         floors: [ null, { name, hall: {...}, rooms: [ room1, room2, room3 ] }, ...x5 ] }
       hall = { sign:'3 · OPS', heading name comes from floor.name, subtitle?, wall, wall2?, wainscot?, wainscotBorder?, sidewall?, floor (HOUSE_INTERIOR_SPRITES tile key),
                floorFilter?, runner (css filter string for the carpet-runner strip), skip:['bench','waterCooler','plant','fireExt'] (generic props to leave out),
                decor:[furniture...], labels?:[...] }
       room = { name, subtitle, theme:{wall,wall2,wainscot,wainscotBorder,sidewall,floor,floorFilter}, furniture:[...], labels?:[...], fx?:[{kind:'steam'|'notes',x,y,n,z}], tint?:'cold'|'warm'|'dim', hint? }
                (towerRoomDef adds the door mat + exit itself; keep the walkway from the mat, x 276-364 up to y~300, clear.)
     A missing hall / room entry falls back to the plain tables (TOWER_LOOK / TOWER_FLOOR_WALLS) - Tower B rooms plug in by filling floors[f].rooms.
     Helpers:  tf(spr, x, y[, w, h][, opts])  builds a furniture entry; w/h default to the sprite's natural size (TOWER_SPR_SIZE).
         opts: say, label  -> makes it look-at-able and (floor items) auto-solid: solid = [x+4, y+h-foot, w-8, foot] (foot = opts.foot || TOWER_FOOT[spr] || 14); hit = a slightly larger rect around it.
               wall:true   -> wall-mounted (z 2, never solid, hit = [x,152,w,10]).   solid:false|true|[x,y,w,h] overrides.   z, flip, css, cls, front, zf, glow, hit as in HOUSE_HOMES.
         glow: tg(x,y,w,h,cls,delay) rects in stage px (classes: mon, alarm, game, pink, led-g, led-r, led-b, led-y, twy, twp, twb, soft, warm, cold, sun, scope).
       rackGlows(x, y, phase) = blinking LED glows for a serverRack placed at (x, y). ============================================================ */
  function towerHallSign(t, f) { var th = TOWER_THEMES[t]; return th && th.floors[f] && th.floors[f].hall && th.floors[f].hall.sign; }

  /* ---------------- TOWER B rooms (Plan D part 3 stage 4b) ---------------- */
  (function () {
    var B = TOWER_THEMES[1].floors;
    // look-at object: tf with label + say
    function L(spr, x, y, label, say, o) { o = o || {}; o.label = label; o.say = say; return tf(spr, x, y, o); }
    function seats(spr, xs, ys, lab, say) { var a = []; ys.forEach(function (y, i) { xs.forEach(function (x, j) { a.push(tf(spr, x, y, i === 0 && j === 0 ? { label: lab, say: say, foot: 24 } : { solid: [x + 4, y + 34, 192, 22] })); }); }); return a; }
    function monGlows(desks, ph) { var g = []; desks.forEach(function (d, k) { g.push(tg(d[0] + 28, d[1] + 8, 40, 24, 'mon', ((k * 0.7 + (ph || 0)) % 2.6).toFixed(1))); }); return g; }

    /* ===== FLOOR 1: LIBRARY ===== */
    B[1].rooms = [
      { name: 'READING HALL', subtitle: 'Tall shelves, deep armchairs and a silence you can hear.', theme: { wall: '#ead6b0', wall2: '#dcc79c', wainscot: '#6b3f28', wainscotBorder: '#3f2418', sidewall: '#3f2418', floor: 'floorWoodDark' },
        furniture: [
          L('tallShelf', 22, 40, 'bookshelf', 'Fiction, A to F. The librarian says the G section is "resting".', { hit: [30, 154, 56, 24] }),
          L('tallShelf', 94, 40, 'bookshelf', 'Every book here has been finished. By someone. Once.', { hit: [102, 154, 56, 24] }),
          L('tallShelf', 166, 40, 'bookshelf', 'Reference: the dictionary defines "recursion" as "see recursion".', { hit: [174, 154, 56, 24] }),
          L('ladder', 242, 42, 'rolling ladder', 'A rolling ladder. Ideal for reaching books and losing dignity.'),
          tf('window', 296, 32, { wall: true, label: 'window', say: 'Soft afternoon light. Even the dust is reading.', glow: [tg(306, 44, 84, 64, 'sun')] }),
          L('tallShelf', 414, 40, 'bookshelf', 'Cookery, Poetry and one book called "How To Read Faster". Unfinished.', { hit: [422, 154, 56, 24] }),
          L('tallShelf', 486, 40, 'bookshelf', 'History, sorted by century. Nobody has updated the last shelf.', { hit: [494, 154, 56, 24] }),
          L('tallShelf', 558, 40, 'bookshelf', 'A whole shelf of manuals. Nobody has read them, everybody has quoted them.', { hit: [566, 154, 56, 24] }),
          tf('rug', 232, 206, { z: 1 }),
          L('coffeetable', 264, 236, 'reading table', 'Three open books and a cold tea. A very intellectual still life.'),
          L('armchair', 96, 246, 'armchair', 'It has memorised the shape of a hundred readers.'),
          L('lamp', 34, 214, 'reading lamp', 'Just enough light to read the small print. And the terms and conditions.', { glow: [tg(40, 216, 28, 20, 'warm')] }),
          L('armchair', 456, 246, 'armchair', 'Deep, soft and very hard to leave.', { flip: true }),
          L('lamp', 552, 214, 'reading lamp', 'A lamp with a strong opinion about late fees.', { glow: [tg(558, 216, 28, 20, 'warm', 0.8)] }),
          L('bookCart', 150, 350, 'book cart', 'Returns. One book has been waiting on this cart since 1998.'),
          L('plant', 26, 372, 'plant', 'It only grows when nobody is looking.'),
          L('plantFern', 556, 372, 'fern', 'Shh. It is proofreading.')
        ] },
      { name: 'ARCHIVES', subtitle: 'Dense shelves, dim light and forty years of paperwork.', tint: 'dim', theme: { wall: '#4a3f36', wall2: '#41372f', wainscot: '#2a221c', wainscotBorder: '#181310', sidewall: '#181310', floor: 'floorConcrete', floorFilter: 'brightness(0.55) saturate(0.8)' },
        furniture: [
          L('shelfDense', 22, 40, 'archive shelf', 'Binders labelled "Misc", "Misc 2" and "Misc (final)".', { hit: [30, 154, 56, 24] }),
          L('shelfDense', 94, 40, 'archive shelf', 'Minutes of every meeting. Everyone regrets attending.', { hit: [102, 154, 56, 24] }),
          L('shelfDense', 166, 40, 'archive shelf', 'Contracts from 1987. The ink is fading, the obligations are not.', { hit: [174, 154, 56, 24] }),
          L('cardCatalogue', 250, 78, 'card catalogue', 'A drawer of index cards. Search is O(n), where n is patience.'),
          L('cardCatalogue', 326, 78, 'card catalogue', 'Card 4 040: "Not found". Filed under N.'),
          L('shelfDense', 414, 40, 'archive shelf', 'Old backups on paper. The restore procedure is a flight of stairs.', { hit: [422, 154, 56, 24] }),
          L('shelfDense', 486, 40, 'archive shelf', 'Annual reports. Volume 12 is missing. Volume 12 is always missing.', { hit: [494, 154, 56, 24] }),
          L('shelfDense', 558, 40, 'archive shelf', 'Every incident, neatly filed. Every lesson, neatly ignored.', { hit: [566, 154, 56, 24] }),
          tf('shelfDense', 30, 218, { solid: [34, 332, 64, 14] }), tf('shelfDense', 102, 218, { solid: [106, 332, 64, 14], label: 'archive shelf', say: 'A maze of aisles. The exit is in the index.', hit: [110, 332, 56, 22] }),
          tf('shelfDense', 466, 218, { solid: [470, 332, 64, 14], label: 'archive shelf', say: 'Row 9. Somebody put a sandwich in the 1999 box.', hit: [474, 332, 56, 22] }), tf('shelfDense', 538, 218, { solid: [542, 332, 64, 14] }),
          L('ladder', 186, 206, 'rolling ladder', 'The ladder squeaks, so nobody can sneak up on the archive.'),
          L('lamp', 238, 200, 'desk lamp', 'A dim bulb. Suits the mood, and the budget.', { glow: [tg(244, 202, 28, 20, 'warm'), tg(252, 206, 12, 8, 'twy', 0.3), tg(0, 0, 640, 150, 'soft', 1.2)] }),
          L('filecabinet', 116, 344, 'filing cabinet', 'Locked. The key is in another filing cabinet.'),
          L('boxStack', 34, 366, 'archive boxes', 'Boxes marked "Do not open until 2030". It is 2026. Patience.'),
          L('filecabinet', 462, 344, 'filing cabinet', 'Filed under F for "Forgot where I put it".'),
          L('boxStack', 556, 372, 'archive boxes', 'Boxes on boxes on boxes. A stack of stacks.'),
          tf('warningSign', 356, 190, { solid: false, z: 3, label: 'sign', say: 'No food, no drinks, no dramatic rediscoveries.', hit: [352, 190, 56, 40] })
        ] },
      { name: 'STUDY CARRELS', subtitle: 'Private desks, tiny lamps and a very serious sign.', theme: { wall: '#d8dde6', wall2: '#ccd2dc', wainscot: '#5a6f8f', wainscotBorder: '#3a4a66', sidewall: '#3a4a66', floor: 'floorCarpetPlum', floorFilter: 'saturate(0.5) brightness(0.95)' },
        furniture: (function () {
          var a = [tf('quietSign', 272, 6, { wall: true }), tf('plantHang', 200, 8, { wall: true }), tf('plantHang', 424, 8, { wall: true })];
          var says = ['Desk 1: 300 pages, 2 days, 1 mug.', 'Desk 2: the person here has been reading the same line since Monday.', 'Desk 3: highlighters in six colours. The paper is now mostly yellow.', 'Desk 4: a laptop with 47 tabs. All are "research".', 'Desk 5: a sticky note says "DO NOT DISTURB. Also please water me."', 'Desk 6: a lamp that has heard every sigh in the building.'];
          [22, 120, 218, 316, 414, 512].forEach(function (x, k) {
            a.push(tf('carrel', x, 84, { label: 'study carrel', say: says[k], foot: 22, glow: [tg(x + 48, 104, 16, 8, 'warm', (k * 0.4).toFixed(1)), tg(x + 52, 105, 8, 5, 'twy', (k * 0.55).toFixed(2))] }));
            a.push(tf('deskchair', x + 10, 176, { solid: [x + 16, 202, 40, 12] }));
          });
          [[26, 232], [124, 232], [428, 232], [526, 232]].forEach(function (p, k) {
            a.push(tf('carrel', p[0], p[1], { label: 'study carrel', say: ['Desk 7: a textbook used as a pillow.', 'Desk 8: everything is highlighted. That means nothing is.', 'Desk 9: somebody left a half-eaten biscuit. A brave move.', 'Desk 10: a to-do list with one item: "start".'][k], foot: 22, glow: [tg(p[0] + 48, p[1] + 20, 16, 8, 'warm', (k * 0.5).toFixed(1)), tg(p[0] + 52, p[1] + 21, 8, 5, 'twy', (k * 0.7).toFixed(2))] }));
            a.push(tf('deskchair', p[0] + 10, p[1] + 92, { solid: [p[0] + 16, p[1] + 118, 40, 12] }));
          });
          a.push(L('bookCart', 150, 370, 'book cart', 'A cart of returns. One of them is overdue and slightly haunted.'));
          a.push(L('plant', 22, 376, 'plant', 'A quiet plant. Very good at not interrupting.'));
          a.push(L('plantFern', 556, 376, 'fern', 'It pretends to study.'));
          return a;
        })() }
    ];

    /* ===== FLOOR 2: ACADEMY ===== */
    var studentSays = ['Somebody carved "git blame me" into the desk.', 'A perfectly sharpened pencil and an empty page. Ambitious.', 'The homework is on the desk. The dog did not eat it.', 'A doodle of a very small pipeline in the margin.'];
    B[2].rooms = [
      { name: 'CLASSROOM', subtitle: 'A chalkboard, rows of desks and the smell of pencil shavings.', theme: { wall: '#e8efd6', wall2: '#dde6c4', wainscot: '#3f7048', wainscotBorder: '#2a4a30', sidewall: '#2a4a30', floor: 'floorWood' },
        furniture: (function () {
          var a = [
            tf('chalkboard', 244, 20, { wall: true, label: 'chalkboard', say: 'E = mc squared, one plus three is four, and a triangle called Alan. A busy lesson.' }),
            tf('posterMountain', 60, 34, { wall: true, label: 'poster', say: 'Climb every mountain. Then write it up in the retrospective.' }),
            tf('posterNotes', 140, 34, { wall: true }),
            tf('window', 470, 30, { wall: true, label: 'window', say: 'It is sunny outside. The class is very aware.', glow: [tg(480, 42, 84, 60, 'sun')] }),
            tf('lightbeam', 458, 158, { z: 2 }),
            L('globe', 26, 150, 'globe', 'It spins. So does the timetable.'),
            L('teacherDesk', 262, 138, 'teacher desk', 'A shiny apple, a stack of marking and a bell nobody dares ring.', { foot: 28 }),
            L('bookshelf', 552, 40, 'bookshelf', 'Textbooks. Chapter 1 is always the longest.'),
            L('plantFern', 24, 380, 'fern', 'Teacher\'s pet.')
          ];
          [[60, 236], [132, 236], [60, 320], [132, 320], [452, 236], [524, 236], [452, 320], [524, 320]].forEach(function (p, k) {
            a.push(k % 2 === 0 && k < 6 ? L('studentDesk', p[0], p[1], 'student desk', studentSays[k / 2 | 0], { foot: 24 }) : tf('studentDesk', p[0], p[1], { solid: [p[0] + 4, p[1] + 40, 48, 24] }));
          });
          return a;
        })() },
      { name: 'COMPUTER LAB', subtitle: 'Rows of monitors, a humming printer and one very old mouse.', tint: 'cold', theme: { wall: '#cfd6de', wall2: '#c2cad4', wainscot: '#3f4a5c', wainscotBorder: '#262e3c', sidewall: '#262e3c', floor: 'floorCarpetGrey' },
        furniture: (function () {
          var a = [
            tf('whiteboard', 24, 8, { wall: true, label: 'whiteboard', say: 'Lab rules: 1. Save often. 2. Reboot second. 3. Blame the network.' }),
            tf('projectorScreen', 244, 6, { wall: true, label: 'projector screen', say: 'The projector says "No Signal". A new low in presentation.', glow: [tg(258, 22, 124, 54, 'mon')] }),
            L('printer', 562, 112, 'printer', 'PC LOAD LETTER. It says it every day. It has never explained.', { glow: [tg(583, 144, 4, 4, 'led-g')] }),
            L('waterCooler', 566, 250, 'water cooler', 'Hydration station. Also the only place in the lab with a quiet corner.'),
            L('plantFern', 26, 376, 'fern', 'A plant that photosynthesises in the glow of monitors.')
          ];
          var row1 = [24, 126, 228, 330, 432].map(function (x) { return [x, 112]; });
          var row2 = [[24, 232], [126, 232], [432, 232]];
          var lines = ['Terminal open. Cursor blinking. So is the student.', 'A screensaver of a bouncing logo. Nobody knows when it will hit the corner.', 'Someone typed sudo make me a sandwich. Nothing happened.', 'The mouse is old. The keyboard is older. The chair is oldest.', 'A tab called "definitely not a game". It is a game.', 'Login: guest. Password: guest. Security level: sleepy.', 'This PC has been "updating" since March.', 'A keyboard with three keys missing. The important ones.', 'One monitor is showing rain. It is a screensaver. It is also accurate.', 'A tiny sticky note: "Password is on this sticky note."'];
          var all = row1.concat(row2);
          all.forEach(function (d, k) {
            a.push(tf('computerDesk', d[0], d[1], { label: 'computer', say: lines[k], foot: 32 }));
            a.push(tf('deskchair', d[0] + 14, d[1] + 84, { solid: [d[0] + 20, d[1] + 110, 40, 12] }));
          });
          a.push({ spr: 'mat', x: -64, y: -64, w: 1, h: 1, z: 300, css: 'opacity:0;', glow: monGlows(all, 0) });
          return a;
        })() },
      { name: 'LECTURE HALL', subtitle: 'A raised stage, a big screen and rows of blue seats.', theme: { wall: '#d8e2f2', wall2: '#cbd7ea', wainscot: '#2a4368', wainscotBorder: '#182a44', sidewall: '#182a44', floor: 'floorCarpetBlue' },
        furniture: [].concat([
          tf('projectorScreen', 244, 4, { wall: true, glow: [tg(258, 20, 124, 54, 'mon')] }),
          tf('lectureStage', 204, 108, { solid: [208, 150, 224, 16] }),
          tf('micStand', 250, 60, { z: 200 }),
          tf('lectern', 296, 84, { z: 200, label: 'lectern', say: 'A lectern with a script and a sticky note: "Look up more". The microphone has heard every "Can everyone hear me?".', hit: [286, 166, 68, 24] }),
          tf('speaker', 150, 100, { label: 'speaker', say: 'Sound check: one, two, one, two. A very loud two.' }), tf('speaker', 446, 100, { label: 'speaker', say: 'It hums when the microphone gets too close. Rude.' }),
          tf('bigplant', 24, 82, { label: 'plant', say: 'Applauds by rustling.' }), tf('bigplant', 536, 82, { label: 'plant', say: 'The best seat in the house: the one behind the plant.' }),
          tf('lightbeam', 232, 156, { z: 2, css: 'opacity:0.7;' })
        ], seats('seatRowBlue', [34, 406], [222, 282, 342], 'seats', 'Tip-up seats. One of them has a tiny desk for a giant notebook.')) }
    ];

    /* ===== FLOOR 3: WELLNESS ===== */
    B[3].rooms = [
      { name: 'GYM', subtitle: 'Treadmills, weights and a mirror that is very honest.', theme: { wall: '#d7dde4', wall2: '#cbd2da', wainscot: '#2f3442', wainscotBorder: '#1c2028', sidewall: '#1c2028', floor: 'floorRubber' },
        furniture: [
          tf('mirrorWide', 20, 44, { wall: true, label: 'mirror', say: 'Looking good. A little sweaty, but a stable build.' }),
          tf('mirrorWide', 190, 44, { wall: true, label: 'mirror', say: 'It reflects on your form. Then on your posture. Then on your life choices.' }),
          tf('posterMountain', 366, 40, { wall: true, label: 'poster', say: 'No pain, no gain. No deploy, no Friday.' }),
          L('waterCooler', 436, 70, 'water cooler', 'The most-used machine in the gym.'),
          L('fan', 496, 70, 'fan', 'A fan at full speed. It is all hot air and momentum, like a standup.'),
          L('dumbbellRack', 524, 100, 'dumbbell rack', 'Five kilos. Ten kilos. "Definitely not heavy" kilos.', { foot: 22 }),
          L('treadmill', 24, 196, 'treadmill', 'Distance run: 0.0 km. It is going nowhere. Fast.', { foot: 24, glow: [tg(44, 204, 32, 10, 'scope')] }),
          L('treadmill', 110, 196, 'treadmill', 'The speed goes up to 20. Only the display believes it.', { foot: 24, glow: [tg(130, 204, 32, 10, 'scope', 0.4)] }),
          L('treadmill', 196, 196, 'treadmill', 'A treadmill with a sticky note: "Broken. Or is it?"', { foot: 24, glow: [tg(216, 204, 32, 10, 'scope', 0.8)] }),
          L('weightBench', 424, 208, 'weight bench', 'A barbell with two plates and one very optimistic warm-up.', { foot: 28 }),
          L('weightBench', 524, 254, 'weight bench', 'Spotter not included. Bring a friend.', { foot: 28 }),
          L('yogaBallB', 424, 340, 'exercise ball', 'Balance. Core. Sudden, unexpected floor.'), L('yogaBallP', 476, 362, 'exercise ball', 'Bouncy. Somehow more stable than the staging environment.'),
          L('towelStack', 40, 338, 'towels', 'Fresh towels. Use one. Not that one.'),
          L('bench', 96, 350, 'bench', 'A rest bench. It is where the "one more set" never happens.')
        ] },
      { name: 'YOGA STUDIO', subtitle: 'Soft light, warm floors and a deep sense of calm.', theme: { wall: '#efe8d4', wall2: '#e4ddc6', wainscot: '#8fb098', wainscotBorder: '#5f8068', sidewall: '#5f8068', floor: 'floorParquet', floorFilter: 'brightness(1.1) saturate(0.6)' },
        furniture: [
          tf('mirrorWide', 110, 46, { wall: true, label: 'mirror wall', say: 'Namaste. Now the other leg. Now the other other leg.' }),
          tf('mirrorWide', 370, 46, { wall: true, label: 'mirror wall', say: 'The pose looks better in your imagination.', glow: [tg(376, 52, 144, 4, 'soft')] }),
          L('bigplant', 22, 60, 'plant', 'A calm plant with excellent balance.'), L('bigplant', 538, 60, 'plant', 'Grows in silence. Unlike your inbox.'),
          tf('rug', 232, 226, { z: 1 }),
          tf('yogaMatT', 44, 218, { solid: false, label: 'yoga mat', say: 'Downward dog. Upward cat. Sideways pigeon.', hit: [40, 214, 80, 40] }), tf('yogaMatP', 44, 262, { solid: false }), tf('yogaMatC', 44, 306, { solid: false }),
          tf('yogaMatC', 524, 218, { solid: false, label: 'yoga mat', say: 'Warrior one. Warrior two. Warrior three: still loading.', hit: [520, 214, 80, 40] }), tf('yogaMatT', 524, 262, { solid: false }), tf('yogaMatP', 524, 306, { solid: false }),
          L('lantern', 196, 176, 'lantern', 'A paper lantern. The warm light counts as self-care.', { glow: [tg(202, 184, 28, 28, 'warm')] }),
          L('lantern', 404, 176, 'lantern', 'It flickers gently. Very soothing. Not a fire alarm.', { glow: [tg(410, 184, 28, 28, 'warm', 0.9)] }),
          tf('candle', 262, 244, { solid: false, label: 'candle', say: 'Smells of lavender and quiet productivity.', hit: [258, 240, 32, 30], glow: [tg(268, 244, 8, 10, 'twy')] }),
          tf('candle', 308, 236, { solid: false, glow: [tg(314, 236, 8, 10, 'twy', 0.6)] }), tf('candle', 354, 244, { solid: false, glow: [tg(360, 244, 8, 10, 'twy', 1.2)] }),
          L('zenStones', 300, 184, 'zen garden', 'Rake it left. Rake it right. Reset the build.'),
          L('cushion', 134, 366, 'cushion', 'A meditation cushion. It absorbs stress. Mostly.', { solid: false, hit: [130, 364, 80, 34] }),
          L('plantFlower', 556, 372, 'flowers', 'Fresh flowers. The room hums with quiet.')
        ] },
      { name: 'SPA & SAUNA', subtitle: 'Hot stones, steam and a very relaxed hot tub.', theme: { wall: '#5fb0b0', wall2: '#54a4a6', wainscot: '#2f7a80', wainscotBorder: '#1f5459', sidewall: '#1f5459', floor: 'floorSpa' },
        fx: [{ kind: 'steam', x: 512, y: 128, n: 4, z: 995 }, { kind: 'steam', x: 100, y: 62, n: 3, z: 995 }],
        furniture: [
          L('saunaCabin', 26, 46, 'sauna cabin', 'Temperature: 85 degrees. Mood: 100 percent well done.', { foot: 22, glow: [tg(50, 94, 20, 28, 'warm'), tg(70, 100, 36, 60, 'warm', 1.2)] }),
          tf('robeHook', 190, 50, { wall: true, label: 'bathrobes', say: 'One size fits nobody perfectly. All sizes fit comfortably.' }), tf('robeHook', 236, 50, { wall: true }),
          L('fountain', 300, 82, 'fountain', 'A tiny fountain. The trickle is very good at meetings.', { glow: [tg(320, 100, 6, 24, 'twb')] }),
          L('towelStack', 392, 128, 'towels', 'Warm towels. The greatest luxury ever folded.'),
          L('hotTub', 440, 112, 'hot tub', 'Bubbling gently. Somebody has left a rubber duck. It is on the rota.', { foot: 40, glow: [tg(452, 132, 128, 30, 'soft')] }),
          L('zenStones', 196, 298, 'hot stones', 'Smooth, warm stones. Very good at holding heat. And grudges.'),
          L('lantern', 150, 204, 'lantern', 'A paper lantern. It makes every towel look like a luxury.', { glow: [tg(156, 212, 28, 28, 'warm')] }),
          L('lantern', 452, 200, 'lantern', 'Steam and warm light. The spa is winning.', { glow: [tg(458, 208, 28, 28, 'warm', 0.7)] }),
          L('bench', 60, 300, 'bench', 'A wooden bench. Sit. Breathe. Do not check email.'),
          L('bigplant', 24, 320, 'plant', 'Loves the humidity. Hates the mist of Mondays.'),
          L('plantFlower', 500, 300, 'flowers', 'Orchids. They are very calm. They cost a lot.'),
          L('plantFern', 556, 376, 'fern', 'A fern in a spa. It has never been happier.'),
          L('mirror', 420, 250, 'mirror', 'A spa mirror. Slightly steamed. Very flattering.')
        ] }
    ];

    /* ===== FLOOR 4: ARTS & MUSIC ===== */
    B[4].rooms = [
      { name: 'MUSIC STUDIO', subtitle: 'Drums, amps, a piano and a mixing desk with too many faders.', theme: { wall: '#3a2a48', wall2: '#33243f', wainscot: '#241830', wainscotBorder: '#140c1c', sidewall: '#140c1c', floor: 'floorWoodDark', floorFilter: 'brightness(0.68)' },
        fx: [{ kind: 'notes', x: 486, y: 192, n: 4, z: 995 }, { kind: 'notes', x: 96, y: 170, n: 3, z: 995 }],
        furniture: [
          tf('posterVinyl', 24, 40, { wall: true, label: 'poster', say: 'Live at the Server Room. Sold out. Capacity: 4.' }), tf('posterRocket', 90, 40, { wall: true }), tf('posterInvader', 156, 40, { wall: true }),
          tf('onAirSign', 250, 20, { wall: true, glow: [tg(254, 24, 96, 32, 'alarm')] }),
          L('ampStack', 244, 92, 'amp', 'It goes to eleven. There is a sticky note that says "please do not".', { glow: [tg(288, 100, 4, 4, 'led-g')] }),
          L('ampStack', 312, 92, 'amp', 'The volume knob has never been below seven.', { glow: [tg(356, 100, 4, 4, 'led-r', 0.4)] }),
          L('speaker', 384, 88, 'speaker', 'Bass so deep the pipeline felt it.'),
          L('guitar', 438, 58, 'guitar', 'A guitar on a very loose leash.'),
          L('guitarRed', 492, 64, 'electric guitar', 'A red electric guitar. Sounds like a compile error, but with feeling.'),
          L('keyboardStand', 544, 112, 'synth', 'A synth with 900 presets. Two of them are usable.', { hit: [554, 156, 80, 34] }),
          tf('rug', 200, 196, { z: 1, css: 'filter:hue-rotate(200deg) brightness(0.7) saturate(0.9);' }),
          L('drumKit', 40, 190, 'drum kit', 'Every fill ends the same way. In a cymbal crash. And a bug.', { foot: 30 }),
          L('stool', 72, 268, 'drum stool', 'A stool with a very solid rhythm section.'),
          L('micStand', 176, 200, 'microphone', 'One, two. One, two. Still two.'),
          L('mixDesk', 262, 212, 'mixing desk', 'All faders at 7, except one that is exactly 6.9. The producer cares.', { foot: 30, glow: [tg(280, 226, 6, 4, 'led-r'), tg(316, 226, 6, 4, 'led-g', 0.5)] }),
          L('deskchair', 276, 266, 'chair', 'The producer\'s chair. It knows every take.', { solid: [282, 288, 50, 14] }),
          L('piano', 420, 200, 'piano', 'A grand piano. Grand isn\'t the same as in tune.', { foot: 26 }),
          L('stool', 466, 282, 'piano stool', 'It creaks in B flat.'),
          L('beanbag', 34, 340, 'bean bag', 'Where the drummer goes to think about tempo.'), L('beanbagG', 518, 344, 'bean bag', 'Reserved for the guitarist. And the bassist. And the sound guy.')
        ] },
      { name: 'ART GALLERY', subtitle: 'Bright walls, quiet floors and paintings that are not for touching.', theme: { wall: '#f4f0ea', wall2: '#ece6dc', wainscot: '#b8b0a4', wainscotBorder: '#7a7468', sidewall: '#7a7468', floor: 'floorMarble' },
        furniture: [
          tf('paintingD', 26, 46, { wall: true, label: 'painting', say: 'Sunset over Hills. The hills are code, the sunset is the deadline.' }),
          tf('paintingE', 130, 38, { wall: true, label: 'painting', say: 'Composition in Red, Blue and Yellow. The frame cost more.' }),
          tf('artFrameA', 208, 46, { wall: true, label: 'painting', say: 'Portrait of a Lake. Very still. Very sued.' }),
          tf('paintingF', 278, 46, { wall: true, label: 'painting', say: 'A Sailboat at Dawn. The wind is a legacy dependency.' }),
          tf('paintingG', 388, 46, { wall: true, label: 'painting', say: 'Still Life with Fruit. The fruit has been still for eleven years.' }),
          tf('artFrameB', 458, 46, { wall: true, label: 'painting', say: 'Untitled 7. Untitled 6 was more expensive.' }), tf('artFrameC', 528, 46, { wall: true, label: 'painting', say: 'Interpretation of a Tuesday. The colours are "meh" and "beige".' }),
          { spr: 'mat', x: -64, y: -64, w: 1, h: 1, z: 60, css: 'opacity:0;', glow: [tg(26, 24, 88, 14, 'sun'), tg(130, 24, 64, 14, 'sun', 0.7), tg(208, 24, 56, 14, 'sun', 1.4), tg(278, 24, 96, 14, 'sun', 2.1), tg(388, 24, 56, 14, 'sun', 0.4), tg(458, 24, 56, 14, 'sun', 1.1), tg(528, 24, 56, 14, 'sun', 1.8)] },
          L('sculpture', 292, 122, 'sculpture', 'Dynamic Equilibrium in bronze. It is either very deep or very tilted.', { foot: 20 }),
          L('sculpture', 56, 160, 'sculpture', 'Study in Rings. A very expensive bracelet.', { foot: 20 }), L('ropeBarrier', 34, 252, 'rope barrier', 'Do not cross. It is the only art rule everyone follows.'),
          L('sculpture', 528, 160, 'sculpture', 'Sculpture 3: "Merge Conflict". Notice the tension.', { foot: 20 }), tf('ropeBarrier', 510, 252, {}),
          L('galleryBench', 256, 250, 'gallery bench', 'A bench for staring at things while looking thoughtful.', { solid: [260, 282, 104, 14] }),
          L('galleryBench', 84, 330, 'gallery bench', 'Nobody has ever sat on this bench. It is a bench-mark.'), L('galleryBench', 458, 344, 'gallery bench', 'A perfectly leather-clad rest for tired feet and critics.'),
          L('plant', 24, 376, 'plant', 'The only living work in the gallery.'), L('plant', 562, 372, 'plant', 'A plant. Not a sculpture. Please do not caption it.')
        ] },
      { name: 'THEATRE', subtitle: 'Red velvet, a starry backdrop and footlights on standby.', tint: 'dim', theme: { wall: '#3a1a22', wall2: '#33161d', wainscot: '#241016', wainscotBorder: '#140a0c', sidewall: '#140a0c', floor: 'floorCarpetBurgundy', floorFilter: 'brightness(0.78)' },
        furniture: [].concat([
          tf('posterVinyl', 62, 36, { wall: true, label: 'poster', say: 'HAMLET, the Sequel: "To Deploy or Not To Deploy". Two shows. Six critics.' }), tf('posterNotes', 526, 36, { wall: true }),
          tf('stageCurtain', 164, 18, { wall: true, label: 'curtains', say: 'Red velvet and a starry backdrop. Break a leg. Not the production database.', hit: [164, 152, 312, 10] }),
          tf('stageBoards', 196, 124, { z: 170, solid: [200, 152, 240, 20] }),
          { spr: 'mat', x: -64, y: -64, w: 1, h: 1, z: 300, css: 'opacity:0;', glow: [tg(230, 100, 70, 70, 'sun'), tg(342, 100, 70, 70, 'sun', 1.6), tg(216, 156, 8, 6, 'twy'), tg(266, 156, 8, 6, 'twy', 0.5), tg(316, 156, 8, 6, 'twy', 1.0), tg(366, 156, 8, 6, 'twy', 0.3), tg(416, 156, 8, 6, 'twy', 0.8)] },
          L('lamp', 434, 66, 'ghost light', 'The ghost light. Always on. In case the ghosts want a rehearsal.', { z: 200, glow: [tg(440, 68, 28, 20, 'warm')] }),
          L('prompterDesk', 96, 156, 'prompter desk', 'The prompter\'s desk. Line 42 is a lot funnier than the actor.', { glow: [tg(140, 158, 16, 6, 'twb')] }),
          L('propChest', 502, 158, 'prop chest', 'A gold crown, a rubber sword and a comedy mask. Very legal.')
        ], seats('seatRowRed', [20, 420], [232, 292, 352], 'red seats', 'Velvet seats. They fold up, like a critic after act one.')) }
    ];

    /* ===== FLOOR 5: SKY LOUNGE ===== */
    var tableSays = ['A table for two. The candle is a permanent fixture.', 'Reserved for a party of 12 who never came.', 'The napkins are folded into swans. The swans are exhausted.', 'A tiny vase and a tinier menu.', 'The wine list is a novel. The dessert list is a haiku.'];
    B[5].rooms = [
      { name: 'RESTAURANT', subtitle: 'White tablecloths, a candle on every table and a kitchen pass.', theme: { wall: '#f0e0c4', wall2: '#e4d3b2', wainscot: '#6a2a2a', wainscotBorder: '#3f1818', sidewall: '#3f1818', floor: 'floorParquet', floorFilter: 'brightness(0.82) saturate(1.2)' },
        furniture: (function () {
          var a = [
            tf('windowBig', 24, 24, { wall: true, label: 'window', say: 'The whole city is tonight\'s free garnish.', glow: [tg(38, 38, 132, 78, 'sun')] }),
            tf('windowBig', 212, 24, { wall: true, label: 'window', say: 'Sky-high. So are the prices.', glow: [tg(226, 38, 132, 78, 'sun', 1.5)] }),
            tf('stringLights', 0, 2, { wall: true, z: 4, glow: [tg(16, 24, 4, 8, 'twy'), tg(50, 32, 4, 8, 'twp', 0.4), tg(100, 36, 4, 8, 'twb', 0.8), tg(150, 32, 4, 8, 'twy', 1.2)] }),
            tf('stringLights', 168, 2, { wall: true, z: 4, glow: [tg(184, 24, 4, 8, 'twp', 0.2), tg(218, 32, 4, 8, 'twb', 0.6), tg(268, 36, 4, 8, 'twy', 1.0), tg(318, 32, 4, 8, 'twp', 1.4)] }),
            tf('stringLights', 336, 2, { wall: true, z: 4, glow: [tg(352, 24, 4, 8, 'twb', 0.5), tg(386, 32, 4, 8, 'twy', 0.9), tg(436, 36, 4, 8, 'twp', 0.1), tg(486, 32, 4, 8, 'twb', 0.7)] }),
            L('kitchenPass', 440, 72, 'kitchen pass', 'Order up! The dish is fine, the ticket says "ASAP 3 hours ago".', { foot: 40, glow: [tg(464, 92, 12, 8, 'twy'), tg(500, 92, 12, 8, 'twy', 0.4), tg(536, 92, 12, 8, 'twy', 0.9), tg(572, 92, 12, 8, 'twy', 0.2), tg(608, 92, 12, 8, 'twy', 0.6)] }),
            L('bigplant', 24, 300, 'plant', 'A restaurant plant. It has never been served.'),
            L('plantFern', 560, 376, 'fern', 'Enjoys the ambience. Judges the soup.')
          ];
          [[100, 196], [284, 196], [468, 196], [100, 320], [468, 320]].forEach(function (p, k) {
            a.push(tf('roundTable', p[0], p[1], { label: 'table', say: tableSays[k], foot: 26 }));
            a.push(tf('chair', p[0] - 46, p[1] - 6, { solid: [p[0] - 38, p[1] + 52, 32, 12] })); a.push(tf('chair', p[0] + 70, p[1] - 6, { flip: true, solid: [p[0] + 78, p[1] + 52, 32, 12] }));
          });
          return a;
        })() },
      { name: 'LOUNGE BAR', subtitle: 'Low lights, a long bar and a very deep sofa.', tint: 'dim', theme: { wall: '#2a2438', wall2: '#241f31', wainscot: '#1c1826', wainscotBorder: '#0e0c14', sidewall: '#0e0c14', floor: 'floorCarpetCharcoal' },
        furniture: [
          tf('neonBar', 60, 28, { wall: true, label: 'neon sign', say: 'BAR. The buzz is neon. The bartender buzzes at 5 pm.', glow: [tg(68, 32, 28, 28, 'pink'), tg(104, 32, 40, 24, 'soft')] }),
          tf('backBarShelf', 228, 40, { wall: true, label: 'back bar', say: 'Two hundred bottles. The label on the third one is a warning.', glow: [tg(236, 48, 168, 60, 'soft')] }),
          tf('stringLights', 0, 2, { wall: true, z: 4, glow: [tg(16, 24, 4, 8, 'twp'), tg(66, 34, 4, 8, 'twy', 0.7), tg(116, 36, 4, 8, 'twb', 1.1), tg(150, 30, 4, 8, 'twp', 0.4)] }),
          tf('stringLights', 168, 2, { wall: true, z: 4, glow: [tg(184, 24, 4, 8, 'twy', 0.3), tg(234, 34, 4, 8, 'twb', 0.9), tg(284, 36, 4, 8, 'twp', 0.1), tg(318, 30, 4, 8, 'twy', 1.3)] }),
          tf('stringLights', 336, 2, { wall: true, z: 4, glow: [tg(352, 24, 4, 8, 'twb', 0.6), tg(402, 34, 4, 8, 'twp', 1.0), tg(452, 36, 4, 8, 'twy', 0.2), tg(486, 30, 4, 8, 'twb', 0.8)] }),
          tf('stringLights', 504, 2, { wall: true, z: 4, glow: [tg(520, 24, 4, 8, 'twp', 0.5), tg(570, 34, 4, 8, 'twy', 0.9), tg(600, 36, 4, 8, 'twb', 0.1)] }),
          L('barCounter', 204, 116, 'bar counter', 'Menu: coffee, cola and something called "Kernel Panic".', { foot: 34 }),
          L('barStool', 220, 190, 'bar stool', 'It spins. It has seen things.'), L('barStool', 274, 190, 'bar stool', 'Reserved for somebody who said "just one".'),
          L('barStool', 328, 190, 'bar stool', 'The wobble is intentional. Ask the barman. He will not confirm.'), L('barStool', 382, 190, 'bar stool', 'A very comfortable stool for the world\'s longest complaints.'),
          L('sofa', 20, 214, 'sofa', 'A velvet sofa. You sink in. The meeting agenda sinks with you.'), L('sofa', 420, 214, 'sofa', 'Feels like a very expensive cloud.', { flip: true }),
          L('coffeetable', 64, 312, 'low table', 'A coffee ring in the shape of a smiley.'), L('coffeetable', 464, 312, 'low table', 'A bowl of nuts. Half of them are shells.'),
          L('lamp', 232, 268, 'floor lamp', 'A mellow glow. Mood lighting for mood swings.', { glow: [tg(238, 270, 28, 20, 'warm')] }),
          L('plantFern', 556, 376, 'plant', 'A fern with a very good jazz playlist.'), L('plant', 24, 376, 'plant', 'A plant that has really been "networking".')
        ] },
      { name: 'OBSERVATORY', subtitle: 'Big telescope, a star map and windows full of night.', theme: { wall: '#141c3c', wall2: '#101832', wainscot: '#0c1230', wainscotBorder: '#060a1c', sidewall: '#060a1c', floor: 'floorSlate', floorFilter: 'hue-rotate(20deg) saturate(1.8) brightness(0.95)' },
        furniture: [
          tf('starryWindow', 16, 24, { wall: true, label: 'window', say: 'Somewhere out there: a planet that also has bugs.', glow: [tg(36, 40, 4, 4, 'twy'), tg(76, 56, 4, 4, 'twb', 0.6), tg(116, 44, 4, 4, 'twy', 1.2), tg(56, 84, 4, 4, 'twb', 0.3), tg(140, 72, 4, 4, 'twy', 0.9)] }),
          tf('starMap', 180, 44, { wall: true, label: 'star map', say: 'A star map. The one with the pipeline constellation is clearly out of date.', glow: [tg(190, 54, 4, 4, 'twy', 0.4), tg(230, 70, 4, 4, 'twb', 1.0)] }),
          L('telescope', 296, 18, 'telescope', 'The big telescope. It sees galaxies. It cannot see the bug in line 40.', { foot: 26 }),
          L('orrery', 404, 90, 'orrery', 'A brass orrery. The planets are the only things on time here.', { foot: 18, glow: [tg(432, 102, 4, 4, 'twy')] }),
          tf('starryWindow', 488, 24, { wall: true, label: 'window', say: 'Night sky in HD. Nobody has filed a complaint.', glow: [tg(508, 40, 4, 4, 'twy', 0.5), tg(548, 60, 4, 4, 'twb', 1.1), tg(588, 44, 4, 4, 'twy', 0.2), tg(528, 84, 4, 4, 'twb', 0.9), tg(608, 76, 4, 4, 'twy', 1.4)] }),
          L('globe', 30, 176, 'globe', 'A globe with a very confusing time zone map. The sun sets on standup.'),
          tf('rug', 232, 226, { z: 1, css: 'filter:hue-rotate(200deg) brightness(0.62) saturate(0.9);' }),
          L('armchair', 84, 250, 'armchair', 'Tilt it back and count the stars. Fall asleep at seven.'),
          L('armchair', 468, 250, 'armchair', 'A comfortable seat for a very long look at nothing.', { flip: true }),
          L('teatable', 330, 220, 'tea table', 'Cocoa with marshmallows. The marshmallows are constellations.', { hit: [326, 250, 76, 34] }),
          L('beanbag', 40, 344, 'bean bag', 'Stargazing position number one: horizontal.'), L('beanbagG', 512, 348, 'bean bag', 'Stargazing position number two: also horizontal.'),
          L('plantFern', 560, 376, 'plant', 'Night-blooming. Ideal for the observatory shift.'), L('plant', 24, 376, 'plant', 'It photosynthesises by moonlight. In theory.')
        ] }
    ];
  })();
  var TOWER_TINT = { cold: 'cold', warm: 'warm', dim: 'dim' };
  // theme of a hall (falls back to the plain per-floor tables)
  function towerHallLook(t, f) {
    var th = TOWER_THEMES[t], fl = th && th.floors[f], h = fl && fl.hall;
    var base = towerTheme(t, f, 'hall');
    if (!h) return { theme: base, decor: [], skip: [], sign: 'FLOOR ' + f, name: '', runner: TOWER_LOOK[t].runner };
    return {
      theme: { wall: h.wall || base.wall, wall2: h.wall2 || towerShade(h.wall || base.wall, 0.95), wainscot: h.wainscot || base.wainscot, wainscotBorder: h.wainscotBorder || base.wainscotBorder, sidewall: h.sidewall || base.sidewall, floor: h.floor || base.floor, floorFilter: h.floorFilter || base.floorFilter },
      decor: h.decor || [], skip: h.skip || [], sign: h.sign || ('FLOOR ' + f), name: fl.name || '', runner: h.runner !== undefined ? h.runner : TOWER_LOOK[t].runner, labels: h.labels || [], subtitle: h.subtitle
    };
  }

  /* ============================================================
     ROOFS (Plan F stage 2): one open-air night scene above floor 5 of each tower (floor index TOWER_ROOF = 6).
     Reached by the floor-5 stairs (walk-through, arrival 'stairsDown' at the stair door) or the lift's R button (arrival 'lift' in front of the rooftop lift doors).
     Esc / Back / walking into the stair door goes down to floor 5 (arrival 'stairsUp').
     A roof is DATA: TOWER_ROOFS[t] = {
         heading, subtitle, hint,
         theme:{ skyTop, skyBot, skyGlow, sidewall, floor:'floorDeck', floorFilter },     (outdoor palette: sky gradient behind the parapet)
         tint:'night'|'nightwarm',                                                          (multiply overlay over the whole scene)
         sky:{ seed, stars:n, moon:{x,y,css?}, skyline:'skylineNight'|'skylineWarm', clouds:[{x,y,w,dur,delay}] },
         lights:[x,...]  (string-light segments across the top),   stairX (centre x of the stair door, arrival x),
         furniture:[tf(...) ...], glows:[tg(...) ...] (lit pools drawn above the tint), fx:[{kind,x,y,n,z}...],
         people: function () -> [resident, ...]   (fresh objects each visit; see "ROOF PEOPLE" below) }
     The scene is built by towerRoofDef(t, arrival) + roofFrame(R) (stars, moon, skyline, clouds, parapet, lift house, stair door, string lights, night tint).
     Home flag outdoor:true (buildHouseRoom) = sky wall band, no front wall / door / wainscot, side walls become a low parapet.
     ROOF PEOPLE (buildHouseResidents extras; houses never use them): resident fields
         flip:true (mirror), lean:deg (rotate about the feet), prop:{spr,x,y,w,h,flip?} (hand-held sprite inside the sprite, default rest pos x:42,y:45 for a 21x24 glass at the right hand),
         act: one or more space-separated names: stargaze point chat laughchat kiss hug flirt tipsy dance mix drink (+ the old ones),
         expr:{idle,talk,happy,react} may use the new expressions kiss love tipsy flirty stargaze laugh,
         dialogue:{intro,lines} -> talking uses pickLine (never repeats; talk / react expression flashes).
       fx kinds (houseBuildFx): steam notes hearts sparkle speech shoot embers.
     ============================================================ */
  // ==== ROOFS BEGIN ====
  function roofRng(seed) { var a = seed >>> 0; return function () { a = (a + 0x6D2B79F5) | 0; var t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  // invisible 1x1 furniture piece that only carries glow rects (glow z = z + 1)
  function roofGlowLayer(list, z) { return { spr: 'mat', x: -64, y: -64, w: 1, h: 1, z: z, css: 'opacity:0;', glow: list }; }
  function roofStars(sk) {
    var rn = roofRng(sk.seed), out = [], k;
    var moon = sk.moon || { x: -99, y: -99 };
    for (k = 0; k < sk.stars; k++) {
      var x = 14 + Math.floor(rn() * 610), y = 4 + Math.floor(rn() * 92), r = rn(), size = r < 0.2 ? 4 : (r < 0.6 ? 3 : 2), c = rn();
      if (x > moon.x - 6 && x < moon.x + 70 && y > moon.y - 6 && y < moon.y + 70) continue;
      var cls = c < 0.28 ? 'twy' : (c < 0.5 ? 'twb' : (c < 0.58 ? 'twp' : (c < 0.7 ? 'twy2' : (c < 0.8 ? 'twb2' : 'star'))));
      out.push(tg(x, y, size, size, cls, (rn() * 3).toFixed(2)));
    }
    return out;
  }
  function roofFrame(R) {
    var sk = R.sky, out = [], k;
    out.push(roofGlowLayer(roofStars(sk), 0));
    out.push({ spr: 'moon', x: sk.moon.x, y: sk.moon.y, w: 64, h: 64, z: 1, css: sk.moon.css || '', glow: [tg(sk.moon.x - 40, sk.moon.y - 40, 144, 144, 'moonhalo')] });
    (sk.clouds || []).forEach(function (c) { out.push({ spr: 'cloud', x: c.x, y: c.y, w: c.w, h: Math.round(c.w * 32 / 88), z: 1, cls: 'dgc-roof-cloud', css: 'animation-duration:' + c.dur + 's;animation-delay:-' + c.delay + 's;' }); });
    out.push({ spr: sk.skyline, x: 0, y: 46, w: 640, h: 96, z: 2 });
    for (k = 0; k < 4; k++) out.push({ spr: 'parapet', x: k * 160, y: 106, w: 160, h: 44, z: 3 });
    // rooftop lift house (left) and stair door house (right)
    out.push({ spr: 'rooftopLiftHouse', x: 12, y: 0, w: 144, h: 152, z: 4 });
    out.push({ spr: 'liftDoorsClosed', x: 40, y: 32, w: 88, h: 120, z: 5, cls: 'dgc-lift-doors', label: 'lift', say: 'The rooftop lift. Walk into the doorway, or tap it, to pick a floor.' });
    out.push({ spr: 'stairDoor', x: R.stairX - 56, y: 0, w: 112, h: 152, z: 4 });
    // string lights across the sky, bulbs glow above the night tint
    var bulbs = [];
    (R.lights || []).forEach(function (lx, i) {
      out.push(tf('stringLights', lx, 2, { wall: true, z: 4 }));
      [[16, 22, 'twy'], [66, 32, 'twb'], [116, 34, 'twp'], [150, 28, 'twy']].forEach(function (b, j) { bulbs.push(tg(lx + b[0], 2 + b[1], 5, 7, b[2], ((i * 0.37 + j * 0.53) % 1.9).toFixed(2))); });
    });
    out.push(roofGlowLayer(bulbs.concat([tg(24, 46, 28, 32, 'pool-amber'), tg(120, 46, 28, 32, 'pool-amber'), tg(R.stairX - 16, 50, 34, 28, 'pool-amber')]).concat(R.glows || []), 850));
    out.push(roofGlowLayer([[0, 0, 640, 460, R.tint || 'night']], 800));
    return out;
  }




  function towerRoofDef(t, arrival) {
    var R = TOWER_ROOFS[t], L = TOWER_LOOK[t];
    var furn = roofFrame(R).concat(R.furniture);
    var sp = { x: 320, y: 408, facing: 'up' };
    if (arrival === 'lift') sp = { x: 84, y: 214, facing: 'down' };
    else if (arrival === 'stairsDown' || arrival === 'stairsUp') sp = { x: R.stairX, y: 196, facing: 'down' };
    return {
      home: { name: 'Roof', sign: L.name + ' roof', heading: R.heading, subtitle: R.subtitle, theme: R.theme, furniture: furn, residents: R.people(), pets: [], noDoor: true, outdoor: true, labels: [], fx: R.fx || [] },
      exits: [
        { x: 52, y: 158, w: 64, h: 14, text: 'Use the lift', reuse: true, go: function () { towerLiftUse(); } },
        { x: R.stairX - 22, y: 158, w: 44, h: 14, text: 'Stairs ▼ to floor 5', go: function () { towerRoofStairsDown(); } }
      ],
      spawn: sp, hint: R.hint, backLabel: '← Back to floor 5', back: function () { goFloor(t, TOWER_FLOORS, 'stairsUp'); }
    };
  }
  // walking into the stair door: a short walk into the doorway, fade, arrive at the foot of the floor-5 stairs
  function towerRoofStairsDown() {
    if (houseInputLock || stairsAnim || liftPanelOpen || liftRiding) return;
    var t = tower.i, R = TOWER_ROOFS[t];
    houseInputLock = true;
    var bb = $('dgcHouseBubble'); if (bb) bb.hidden = true;
    stairsAnim = {
      t: 0, dur: 700, from: { x: houseHero.x, y: houseHero.y + HERO_FOOT_DY }, to: { x: R.stairX, y: 150 }, dir: 'roofDoor', sc: 0.86, fading: false,
      next: function () { goFloor(t, TOWER_FLOORS, 'stairsUp'); }
    };
    houseHero.facing = 'up'; houseHero.moving = true; renderHouseHero();
    try { playSfx('click'); } catch (e) { /* sfx optional */ }
  }
  // ==== ROOFS END ====

  function towerLobbyDef(t, arrival) {
    var L = TOWER_LOOK[t];
    var furn = [
      { spr: 'rug', x: 232, y: 318, w: 176, h: 104, z: 1 },
      { spr: 'mat', x: 272, y: 414, w: 96, h: 32, z: 1 },
      { spr: 'glassDoor', x: 256, y: 436, w: 128, h: 24, z: 901 },
      { spr: L.sign, x: 212, y: 30, w: 216, h: 56, z: 2, hit: [212, 152, 216, 10], label: 'building sign', say: 'Welcome to ' + L.name + '. Five floors, three rooms each, zero tenants.' },
      { spr: 'liftDoorsClosed', x: 40, y: 32, w: 88, h: 120, z: 2, cls: 'dgc-lift-doors', label: 'lift', say: 'The lift. Walk into the doorway, or tap it, to pick a floor.' },
      { spr: 'liftButton', x: 134, y: 76, w: 28, h: 44, z: 2, cls: 'dgc-lift-call' },
      { spr: 'stairs25Up', x: STAIRS_UP_SPR.x, y: STAIRS_UP_SPR.y, w: STAIRS_UP_SPR.w, h: STAIRS_UP_SPR.h, z: 2, solids: STAIRS_UP_SOLIDS },
      { spr: 'reception', x: 200, y: 168, w: 240, h: 76, solid: [206, 208, 228, 36], label: 'reception desk', say: 'Nobody is at the desk. The bell is very tempting.' },
      { spr: 'lamp', x: 156, y: 176, w: 40, h: 112, solid: [160, 268, 32, 18], label: 'floor lamp', say: 'Mood lighting for people who are not waiting.' },
      { spr: 'bigplant', x: 536, y: 168, w: 80, h: 128, solid: [552, 278, 48, 16], label: 'plant', say: 'Watered by the facilities team. Allegedly.' },
      { spr: 'coffeetable', x: 44, y: 246, w: 96, h: 55, solid: [48, 254, 88, 44], label: 'coffee table', say: 'No magazines. Just a dusty QR code.' },
      { spr: 'sofa', x: 26, y: 300, w: 176, h: 81, solid: [30, 306, 168, 72], label: 'sofa', say: 'Waiting area. Nobody has ever waited here.' },
      { spr: 'armchair', x: 446, y: 296, w: 80, h: 80, solid: [450, 304, 72, 72], label: 'armchair', say: 'Very comfortable. Very empty.' },
      { spr: 'armchair', x: 530, y: 296, w: 80, h: 80, flip: true, solid: [534, 304, 72, 72], label: 'armchair', say: 'Very comfortable. Also very empty.' },
      { spr: 'plant', x: 196, y: 376, w: 64, h: 64, solid: [208, 414, 40, 18], label: 'plant', say: 'A lobby plant. Somebody has to hold the fort.' },
      { spr: 'plant', x: 380, y: 376, w: 64, h: 64, solid: [392, 414, 40, 18], label: 'plant', say: 'Another lobby plant. Very professional.' }
    ].concat((TOWER_THEMES[t] && TOWER_THEMES[t].lobby && TOWER_THEMES[t].lobby.extras) || []);
    var sp = { x: 320, y: 410, facing: 'up' };
    if (arrival === 'lift') sp = { x: 84, y: 214, facing: 'down' };
    else if (arrival === 'stairsUp' || arrival === 'stairsDown') sp = STAIRS_ARRIVE_FOOT;
    return {
      home: { name: 'Lobby', sign: L.name + ' lobby', heading: L.name + ' · LOBBY', subtitle: 'Reception, lift and stairs. Everything else is still empty.', theme: towerTheme(t, 0, 'lobby'), furniture: furn, residents: [], pets: [], noDoor: true, labels: [{ x: 40, y: 2, w: 88, h: 26, text: 'GROUND', cls: 'dgc-house-tag-floor', z: 3 }] },
      exits: [
        { x: 250, y: 424, w: 140, h: 14, text: 'Leave building', go: function () { leaveHouse(); } },
        { x: 52, y: 158, w: 64, h: 14, text: 'Use the lift', reuse: true, go: function () { towerLiftUse(); } },
        { x: STAIRS_UP_ZONE.x, y: STAIRS_UP_ZONE.y, w: STAIRS_UP_ZONE.w, h: STAIRS_UP_ZONE.h, text: 'Climb stairs ▲', go: function () { towerStairsUse('up'); } }
      ],
      spawn: sp, hint: TOWER_HINT, backLabel: '← Leave building', back: function () { leaveHouse(); }
    };
  }

  var TOWER_DOOR_CX = [240, 324, 408];
  function towerHallDef(t, f, arrival) {
    var L = TOWER_LOOK[t], look = towerHallLook(t, f);
    var furn = [], labels = [], exits = [], k;
    for (k = 0; k < 5; k++) furn.push({ spr: 'carpetRunner', x: k * 128, y: 250, w: 128, h: 48, z: 1, css: look.runner });
    furn.push({ spr: 'liftDoorsClosed', x: 40, y: 32, w: 88, h: 120, z: 2, cls: 'dgc-lift-doors', label: 'lift', say: 'Floor ' + f + '. Walk into the lift doorway, or tap it, to pick a floor.' });
    furn.push({ spr: 'liftButton', x: 134, y: 76, w: 28, h: 44, z: 2, cls: 'dgc-lift-call' });
    if (look.skip.indexOf('fireExt') < 0) furn.push({ spr: 'fireExt', x: 168, y: 104, w: 28, h: 48, z: 2, hit: [160, 152, 44, 10], label: 'fire extinguisher', say: 'Inspected last month. Probably.' });
    furn.push({ spr: 'stairs25Up', x: STAIRS_UP_SPR.x, y: STAIRS_UP_SPR.y, w: STAIRS_UP_SPR.w, h: STAIRS_UP_SPR.h, z: 2, solids: STAIRS_UP_SOLIDS });
    for (k = 0; k < 3; k++) {
      var n = k + 1, cx = TOWER_DOOR_CX[k], num = f * 100 + n;
      furn.push({ spr: L.door, x: cx - 32, y: 56, w: 64, h: 96, z: 2 });
      labels.push({ x: cx - 16, y: 72, w: 32, h: 16, text: String(num), z: 3 });
      exits.push({ x: cx - 16, y: 158, w: 32, h: 10, text: 'Enter room ' + num, go: (function (nn) { return function () { goRoom(t, f, nn); }; })(n) });
      if (k < 2) furn.push({ spr: 'wallLight', x: cx - 20, y: 6, w: 40, h: 48, z: 2 });
    }
    furn.push({ spr: 'exitSign', x: 356, y: 8, w: 104, h: 44, z: 2 });
    if (look.skip.indexOf('bench') < 0) furn.push({ spr: 'bench', x: 104, y: 356, w: 112, h: 48, solid: [108, 388, 104, 16], label: 'bench', say: 'A bench. Nobody is waiting.' });
    if (look.skip.indexOf('waterCooler') < 0) furn.push({ spr: 'waterCooler', x: 234, y: 316, w: 48, h: 88, solid: [238, 388, 40, 16], label: 'water cooler', say: 'Cold water. The paper cups ran out ages ago.' });
    if (look.skip.indexOf('plant') < 0) furn.push({ spr: 'plant', x: 24, y: 368, w: 64, h: 64, solid: [36, 414, 40, 18], label: 'plant', say: 'A hallway plant. It has seen things.' });
    look.decor.forEach(function (d) { furn.push(d); });
    // down opening: the back copy sits under the hero, the front copy (from 14px below the top) is drawn over it so the hero sinks behind the lip
    furn.push({ spr: 'stairs25Down', x: STAIRS_DOWN_SPR.x, y: STAIRS_DOWN_SPR.y, w: STAIRS_DOWN_SPR.w, h: STAIRS_DOWN_SPR.h, z: 2, front: 14, zf: 500, solids: STAIRS_DOWN_SOLIDS });
    labels.push({ x: 36, y: 2, w: 96, h: 26, text: look.sign, cls: 'dgc-house-tag-floor' + (look.sign.length > 8 ? ' dgc-tag-sm' : ''), z: 3 });
    (look.labels || []).forEach(function (lb) { labels.push(lb); });
    exits.push({ x: 52, y: 158, w: 64, h: 14, text: 'Use the lift', reuse: true, go: function () { towerLiftUse(); } });
    exits.push({ x: STAIRS_UP_ZONE.x, y: STAIRS_UP_ZONE.y, w: STAIRS_UP_ZONE.w, h: STAIRS_UP_ZONE.h, text: f >= TOWER_FLOORS ? 'Stairs ▲ to the roof' : 'Climb stairs ▲', go: function () { towerStairsUse('up'); } });
    exits.push({ x: STAIRS_DOWN_ZONE.x, y: STAIRS_DOWN_ZONE.y, w: STAIRS_DOWN_ZONE.w, h: STAIRS_DOWN_ZONE.h, text: 'Go down stairs ▼', go: function () { towerStairsUse('down'); } });
    var sp = { x: 84, y: 214, facing: 'down' };
    if (arrival === 'stairsUp') sp = STAIRS_ARRIVE_FOOT;
    else if (arrival === 'stairsDown') sp = STAIRS_ARRIVE_TOP;
    else if (arrival && typeof arrival === 'object' && arrival.room) sp = { x: TOWER_DOOR_CX[arrival.room - 1], y: 214, facing: 'down' };
    return {
      home: { name: 'Hallway', sign: L.name + ' floor ' + f, heading: L.name + ' · FLOOR ' + f + (look.name ? ' — ' + look.name : ''), subtitle: look.subtitle || ('Rooms ' + (f * 100 + 1) + ' to ' + (f * 100 + ROOMS_PER_FLOOR) + '. Lift on the left, stairs on the right.'), theme: look.theme, furniture: furn, residents: [], pets: [], noDoor: true, labels: labels },
      exits: exits, spawn: sp, hint: TOWER_HINT, backLabel: '← Lobby', back: function () { goFloor(t, 0, 'stairsDown'); }
    };
  }

  function towerRoomDef(t, f, n) {
    var L = TOWER_LOOK[t], num = f * 100 + n;
    var th = TOWER_THEMES[t], fl = th && th.floors[f], rm = fl && fl.rooms && fl.rooms[n - 1];
    var furn = [{ spr: 'mat', x: 272, y: 414, w: 96, h: 32, z: 1 }];
    var theme = towerTheme(t, f, 'room');
    if (rm) {
      rm.furniture.forEach(function (e) { furn.push(e); });
      var rt = rm.theme || {}, base = theme;
      theme = { wall: rt.wall || base.wall, wall2: rt.wall2 || (rt.wall ? towerShade(rt.wall, 0.95) : base.wall2), wainscot: rt.wainscot || base.wainscot, wainscotBorder: rt.wainscotBorder || base.wainscotBorder, sidewall: rt.sidewall || base.sidewall, floor: rt.floor || base.floor, floorFilter: rt.floorFilter || 'none' };
      // ambient tint: an invisible furniture piece carrying one full-room glow above the hero
      if (rm.tint && TOWER_TINT[rm.tint]) furn.push({ spr: 'mat', x: -64, y: -64, w: 1, h: 1, z: 800, css: 'opacity:0;', glow: [[0, 0, 640, 448, TOWER_TINT[rm.tint]]] });
    } else furn.push({ spr: 'windowBig', x: 240, y: 18, w: 160, h: 120, z: 2, hit: [240, 152, 160, 10], label: 'window', say: 'Empty for now.' });
    return {
      home: { name: 'Room ' + num, sign: L.name + ' room ' + num, heading: L.name + ' · ROOM ' + num + (rm ? ' — ' + rm.name : ''), subtitle: rm ? rm.subtitle : 'Nothing here yet.', theme: theme, furniture: furn, residents: [], pets: [], labels: (rm && rm.labels) || [], fx: (rm && rm.fx) || [] },
      exits: [{ x: 276, y: 424, w: 88, h: 14, text: 'Leave room', go: function () { goFloor(t, f, { room: n }); } }],
      spawn: { x: 320, y: 408, facing: 'up' }, hint: (rm && rm.hint) || 'Arrow keys / WASD to walk. Walk onto the door mat to go back to the hallway. Enter to look at things. Esc goes back.',
      backLabel: '← Back to hallway', back: function () { goFloor(t, f, { room: n }); }
    };
  }

  function goFloor(t, f, arrival) {
    if (!(t >= 0 && t < TOWER_COUNT && f >= 0 && f <= TOWER_ROOF)) return;
    tower.i = t; tower.floor = f;
    if (f === TOWER_ROOF) { markVisited(t === 0 ? 'roofA' : 'roofB'); switchInterior(towerRoofDef(t, arrival)); return; }
    switchInterior(f === 0 ? towerLobbyDef(t, arrival) : towerHallDef(t, f, arrival));
  }
  function goRoom(t, f, n) { tower.i = t; tower.floor = f; switchInterior(towerRoomDef(t, f, n)); }
  function enterTower(i) {
    if (!(i >= 0 && i < TOWER_COUNT)) return;
    var d = TOWER_DOORS[i];
    tower.i = i; tower.floor = 0;
    enterInterior(towerLobbyDef(i, 'default'), { x: d.cx, y: d.retY, i: -1 });
  }

  /* ---- 2.1 ARMORY ---- */
  function renderArmory() {
    var preview = $('dgcArmoryPreviewSprite');
    if (preview) { preview.innerHTML = chibiRoot('hero'); setExpression(preview, 'confident'); }
    $('dgcArmoryList').innerHTML = WEAPON_SHOP.map(function (w) {
      var owned = save.ownedWeapons.indexOf(w.id) !== -1;
      var equipped = save.equippedWeapon === w.id;
      var action = equipped
        ? '<span class="dgc-shop-card-cost" style="color:var(--dgc-success);">✓ Equipped</span>'
        : owned
          ? '<button class="dgc-btn dgc-btn-primary" data-weapon-action="equip" data-weapon-id="' + w.id + '">Equip</button>'
          : '<button class="dgc-btn" data-weapon-action="buy" data-weapon-id="' + w.id + '">Buy — ' + w.cost + '🪙</button>';
      return '<div class="dgc-shop-card' + (equipped ? ' dgc-shop-card-equipped' : '') + '">' +
        '<div class="dgc-shop-card-icon">⚔️</div>' +
        '<div class="dgc-shop-card-info">' +
          '<div class="dgc-shop-card-name">' + w.name + '</div>' +
          '<div class="dgc-shop-card-desc">' + w.desc + '</div>' +
          (w.effectLabel ? '<div class="dgc-shop-card-effect">' + w.effectLabel + '</div>' : '') +
        '</div>' +
        '<div class="dgc-shop-card-action">' + action + '</div>' +
      '</div>';
    }).join('');
  }
  function buyWeapon(id) {
    var w = WEAPON_SHOP.filter(function (w) { return w.id === id; })[0];
    if (!w || save.ownedWeapons.indexOf(id) !== -1) return;
    if (save.coins < w.cost) { playSfx('insufficientFunds'); return; }
    save.coins -= w.cost;
    save.ownedWeapons.push(id);
    save.equippedWeapon = id; // buying a weapon equips it immediately — you see it right away
    persist();
    playSfx('purchase');
    refreshHeroTierVisuals();
    renderArmory();
  }
  function equipWeapon(id) {
    if (save.ownedWeapons.indexOf(id) === -1 || save.equippedWeapon === id) return;
    save.equippedWeapon = id;
    persist();
    playSfx('equip');
    refreshHeroTierVisuals();
    renderArmory();
  }

  /* ---- 2.2 TAILOR ---- */
  // Section 1C — the 3 new customization slots (hair/shoes/accessory)
  // all share one shape (a catalog + an ownedKey array + an equippedKey
  // string on `save`), so they share ONE generic renderer/buy/equip
  // implementation rather than 3 near-identical copies. Outfit (above)
  // keeps its own hand-written version since it also carries a
  // stat-bearing exception (Faster Shell) the generic path doesn't need
  // to know about.
  var CUSTOM_SLOTS = {
    equippedHair: { catalog: HAIR_SHOP, ownedKey: 'ownedHair', containerId: 'dgcHairList', icon: '💇' },
    equippedShoes: { catalog: SHOES_SHOP, ownedKey: 'ownedShoes', containerId: 'dgcShoesList', icon: '👟' },
    equippedAccessory: { catalog: ACCESSORY_SHOP, ownedKey: 'ownedAccessories', containerId: 'dgcAccessoryList', icon: '🎩' }
  };
  function renderCustomSlot(equippedKey) {
    var slot = CUSTOM_SLOTS[equippedKey];
    var el = $(slot.containerId);
    if (!el) return;
    el.innerHTML = slot.catalog.map(function (item) {
      var owned = save[slot.ownedKey].indexOf(item.id) !== -1;
      var equipped = save[equippedKey] === item.id;
      var levelLocked = !owned && item.minLevel && save.level < item.minLevel;
      var action = equipped
        ? '<span class="dgc-shop-card-cost" style="color:var(--dgc-success);">✓ Equipped</span>'
        : owned
          ? '<button class="dgc-btn dgc-btn-primary" data-slot-action="equip" data-slot-key="' + equippedKey + '" data-slot-id="' + item.id + '">Equip</button>'
          : levelLocked
            ? '<span class="dgc-shop-card-lock">🔒 Lv ' + item.minLevel + '</span>'
            : '<button class="dgc-btn" data-slot-action="buy" data-slot-key="' + equippedKey + '" data-slot-id="' + item.id + '">Buy — ' + item.cost + '🪙</button>';
      return '<div class="dgc-shop-card' + (equipped ? ' dgc-shop-card-equipped' : '') + '">' +
        '<div class="dgc-shop-card-icon">' + slot.icon + '</div>' +
        '<div class="dgc-shop-card-info">' +
          '<div class="dgc-shop-card-name">' + item.name + '</div>' +
          '<div class="dgc-shop-card-desc">' + item.desc + '</div>' +
          (levelLocked ? '<div class="dgc-shop-card-lock">Unlocks at level ' + item.minLevel + '</div>' : '') +
        '</div>' +
        '<div class="dgc-shop-card-action">' + action + '</div>' +
      '</div>';
    }).join('');
  }
  function buyCustomSlotItem(equippedKey, id) {
    var slot = CUSTOM_SLOTS[equippedKey];
    var item = slot.catalog.filter(function (i) { return i.id === id; })[0];
    if (!item || save[slot.ownedKey].indexOf(id) !== -1) return;
    if (item.minLevel && save.level < item.minLevel) return;
    if (save.coins < item.cost) { playSfx('insufficientFunds'); return; }
    save.coins -= item.cost;
    save[slot.ownedKey].push(id);
    save[equippedKey] = id;
    persist();
    playSfx('purchase');
    refreshHeroTierVisuals();
    // Full renderTailor() (not just this one slot) — the shop's own live
    // preview chibi is owned by renderTailor(), so a narrower refresh
    // would leave it showing the pre-purchase look until the modal was
    // closed and reopened.
    renderTailor();
  }
  function equipCustomSlotItem(equippedKey, id) {
    var slot = CUSTOM_SLOTS[equippedKey];
    if (save[slot.ownedKey].indexOf(id) === -1 || save[equippedKey] === id) return;
    save[equippedKey] = id;
    persist();
    playSfx('equip');
    refreshHeroTierVisuals();
    renderTailor();
  }

  function renderTailor() {
    var preview = $('dgcTailorPreviewSprite');
    if (preview) { preview.innerHTML = chibiRoot('hero'); setExpression(preview, 'happy'); }
    renderCustomSlot('equippedHair');
    renderCustomSlot('equippedShoes');
    renderCustomSlot('equippedAccessory');
    $('dgcTailorList').innerHTML = OUTFIT_SHOP.map(function (o) {
      var owned = save.ownedOutfits.indexOf(o.id) !== -1;
      var equipped = save.equippedOutfit === o.id;
      var levelLocked = !owned && save.level < o.minLevel;
      var action = equipped
        ? '<span class="dgc-shop-card-cost" style="color:var(--dgc-success);">✓ Equipped</span>'
        : owned
          ? '<button class="dgc-btn dgc-btn-primary" data-outfit-action="equip" data-outfit-id="' + o.id + '">Equip</button>'
          : levelLocked
            ? '<span class="dgc-shop-card-lock">🔒 Lv ' + o.minLevel + '</span>'
            : '<button class="dgc-btn" data-outfit-action="buy" data-outfit-id="' + o.id + '">Buy — ' + o.cost + '🪙</button>';
      return '<div class="dgc-shop-card' + (equipped ? ' dgc-shop-card-equipped' : '') + '">' +
        '<div class="dgc-shop-card-icon">🧥</div>' +
        '<div class="dgc-shop-card-info">' +
          '<div class="dgc-shop-card-name">' + o.name + '</div>' +
          '<div class="dgc-shop-card-desc">' + o.desc + '</div>' +
          (o.effectLabel ? '<div class="dgc-shop-card-effect">' + o.effectLabel + '</div>' : '') +
          (levelLocked ? '<div class="dgc-shop-card-lock">Unlocks at level ' + o.minLevel + '</div>' : '') +
        '</div>' +
        '<div class="dgc-shop-card-action">' + action + '</div>' +
      '</div>';
    }).join('');
  }
  function buyOutfit(id) {
    var o = OUTFIT_SHOP.filter(function (o) { return o.id === id; })[0];
    if (!o || save.ownedOutfits.indexOf(id) !== -1 || save.level < o.minLevel) return;
    if (save.coins < o.cost) { playSfx('insufficientFunds'); return; }
    save.coins -= o.cost;
    save.ownedOutfits.push(id);
    save.equippedOutfit = id;
    persist();
    playSfx('purchase');
    refreshHeroTierVisuals();
    renderTailor();
  }
  function equipOutfit(id) {
    if (save.ownedOutfits.indexOf(id) === -1 || save.equippedOutfit === id) return;
    save.equippedOutfit = id;
    persist();
    playSfx('equip');
    refreshHeroTierVisuals();
    renderTailor();
  }

  /* ---- 2.3 BANK ---- */
  // Deliberately conservative: even fully invested (well beyond what's
  // realistic early-game), the trickle caps out modest per hour, and the
  // total waiting amount is capped outright — a nice bonus for returning,
  // never a replacement for actually fighting.
  var BANK_TRICKLE_CAP = 150;
  var BANK_COINS_PER_HOUR_PER_100_INVESTED = 4;
  function computeBankTrickle() {
    if (save.bankInvestedAmount <= 0) return 0;
    var hoursElapsed = (Date.now() - save.lastBankVisitTimestamp) / 3600000;
    var rate = (save.bankInvestedAmount / 100) * BANK_COINS_PER_HOUR_PER_100_INVESTED;
    return Math.min(BANK_TRICKLE_CAP, Math.floor(hoursElapsed * rate));
  }
  function renderBank() {
    $('dgcBankBalance').textContent = save.coins;
    $('dgcBankInvested').textContent = save.bankInvestedAmount;
    var pending = computeBankTrickle();
    var note = $('dgcBankTrickleNote');
    var collectBtn = $('dgcBankCollectBtn');
    if (pending > 0) { note.textContent = '+' + pending + ' coins waiting'; collectBtn.hidden = false; }
    else { note.textContent = save.bankInvestedAmount > 0 ? 'building up…' : ''; collectBtn.hidden = true; }
  }
  function investInBank() {
    var input = $('dgcBankInvestInput');
    var amount = parseInt(input.value, 10);
    if (!amount || amount <= 0) return;
    if (amount > save.coins) { playSfx('insufficientFunds'); return; }
    collectBankTrickle(true); // never silently lose pending trickle when the invested amount changes
    save.coins -= amount;
    save.bankInvestedAmount += amount;
    persist();
    playSfx('purchase');
    input.value = '';
    renderBank();
  }
  function collectBankTrickle(silent) {
    var pending = computeBankTrickle();
    if (pending > 0) {
      save.coins += pending;
      if (!silent) playSfx('coin');
    }
    save.lastBankVisitTimestamp = Date.now();
    persist();
    renderBank();
  }

  /* ---- 2.4 LIBRARY ---- */
  var LIBRARY_PACK_COST = 220;
  function renderLibrary() {
    var list = $('dgcLibraryList');
    var clearedWithPacks = BOSS_ORDER.filter(function (id) {
      return id !== FINAL_BOSS_ID && save.bossesDefeated.indexOf(id) !== -1 && LIBRARY_ADVANCED_PACKS[id];
    });
    if (!clearedWithPacks.length) {
      list.innerHTML = '<div class="dgc-library-note">Clear a topic boss to unlock its Advanced Pack here.</div>';
      return;
    }
    list.innerHTML = clearedWithPacks.map(function (id) {
      var boss = BOSSES[id];
      var pack = LIBRARY_ADVANCED_PACKS[id];
      var unlocked = save.unlockedLibraryPacks.indexOf(id) !== -1;
      var action = unlocked
        ? '<span class="dgc-shop-card-cost" style="color:var(--dgc-success);">✓ Unlocked</span>'
        : '<button class="dgc-btn" data-library-action="buy" data-library-boss-id="' + id + '">Buy — ' + LIBRARY_PACK_COST + '🪙</button>';
      return '<div class="dgc-shop-card' + (unlocked ? ' dgc-shop-card-equipped' : '') + '">' +
        '<div class="dgc-shop-card-icon">' + boss.icon + '</div>' +
        '<div class="dgc-shop-card-info">' +
          '<div class="dgc-shop-card-name">' + boss.name + ' — Advanced Pack</div>' +
          '<div class="dgc-shop-card-desc">' + pack.length + ' extra real ' + boss.topic + ' questions, folded into this boss\'s final-phase pool for future fights.</div>' +
        '</div>' +
        '<div class="dgc-shop-card-action">' + action + '</div>' +
      '</div>';
    }).join('');
  }
  function buyLibraryPack(bossId) {
    if (!bossId || save.unlockedLibraryPacks.indexOf(bossId) !== -1) return;
    if (save.coins < LIBRARY_PACK_COST) { playSfx('insufficientFunds'); return; }
    save.coins -= LIBRARY_PACK_COST;
    save.unlockedLibraryPacks.push(bossId);
    persist();
    playSfx('purchase');
    renderLibrary();
  }

  /* ============================================================
     SECTION 1B SUB-STEP 2 — GENERAL STORE + TOWN DECORATIONS. A modest
     starter catalog (per the doc's own scope-management note), coin-
     purchasable; owned units get placed/moved/picked-up directly in the
     town rather than through a separate inventory screen.
     ============================================================ */
  // Environment addendum — the 3 nature items reuse the same real
  // FOLIAGE_SPRITES art as the ambient world fixtures (a `sprite` key
  // instead of an `icon` glyph) so a player-placed tree/flower/grass
  // isn't a downgrade back to emoji next to the ones scattered by the
  // engine itself. Lamppost/bench are hand-illustrated SVG (same fallback
  // reasoning as HOUSE_PALETTES/houseSVG above — no single ready-made
  // tile for either in the packs on hand, and both are small/simple
  // enough that a clean shape reads better than composited tile mud at
  // this size). Dog/cat stay emoji — animals, not environment art, and
  // never part of this addendum's grass/flower/tree/path scope.
  // Palette re-sampled directly from the Tiny Town Sample.png crops used
  // for HOUSE_SPRITES/FOLIAGE_SPRITES/GROUND_TILES above, so these two
  // hand-drawn shapes read as the same world even though no ready-made
  // lamppost/bench tile exists in the pack to crop: #36212F is the pack's
  // own dark purple-brown outline (sampled from its fence + castle-wall
  // linework), #753A35 its door/wood-shadow brown, #BD855D its fence tan,
  // #A2B0C5 its roof/wall blue-grey, #F28462 its roof orange.
  function lamppostSVG() {
    return '<svg viewBox="0 0 24 50" xmlns="http://www.w3.org/2000/svg">' +
      '<ellipse cx="12" cy="47" rx="7" ry="2.5" fill="rgba(0,0,0,0.3)"/>' +
      '<rect x="10" y="14" width="4" height="33" fill="#753A35" stroke="#36212F" stroke-width="1"/>' +
      '<polygon points="5,14 19,14 15,4 9,4" fill="#A2B0C5" stroke="#36212F" stroke-width="1"/>' +
      '<circle cx="12" cy="9" r="8" fill="#F28462" opacity="0.3"/>' +
      '<circle cx="12" cy="9" r="4.5" fill="#ffe6a3" stroke="#36212F" stroke-width="0.75"/>' +
      '</svg>';
  }
  function benchSVG() {
    return '<svg viewBox="0 0 50 32" xmlns="http://www.w3.org/2000/svg">' +
      '<rect x="5" y="20" width="4" height="10" fill="#753A35" stroke="#36212F" stroke-width="1"/>' +
      '<rect x="41" y="20" width="4" height="10" fill="#753A35" stroke="#36212F" stroke-width="1"/>' +
      '<rect x="3" y="14" width="44" height="7" rx="2" fill="#BD855D" stroke="#36212F" stroke-width="1"/>' +
      '<rect x="3" y="3" width="44" height="7" rx="2" fill="#CDA173" stroke="#36212F" stroke-width="1"/>' +
      '</svg>';
  }
  var DECORATION_CATALOG = [
    { id: 'grass', name: 'Grass Tuft', cost: 15, sprite: 'grassTuft', kind: 'static', desc: 'A small patch of green.' },
    { id: 'flowers', name: 'Flower Bed', cost: 30, sprite: 'flowerBlue', kind: 'static', desc: 'Adds a little color.' },
    { id: 'tree', name: 'Tree', cost: 60, sprite: 'treeRound', kind: 'static', desc: 'A proper shade tree.' },
    { id: 'lamppost', name: 'Lamppost', cost: 45, svg: lamppostSVG(), svgW: 22, svgH: 46, kind: 'static', desc: 'Lights up the path.' },
    { id: 'bench', name: 'Bench', cost: 40, svg: benchSVG(), svgW: 44, svgH: 28, kind: 'static', desc: 'Somewhere to sit between fights.' },
    { id: 'dog', name: 'Town Dog', cost: 90, icon: '🐕', kind: 'animal', desc: 'Wanders a little on its own.' },
    { id: 'cat', name: 'Town Cat', cost: 90, icon: '🐈', kind: 'animal', desc: 'Wanders a little on its own.' }
  ];
  var decorInstanceCounter = 0;
  function decorOwnedCount(id) { return save.ownedDecorations[id] || 0; }
  function decorPlacedCount(id) { return save.townDecorations.filter(function (d) { return d.decorId === id; }).length; }
  function decorAvailableCount(id) { return decorOwnedCount(id) - decorPlacedCount(id); }

  function renderGeneralStore() {
    $('dgcGeneralStoreList').innerHTML = DECORATION_CATALOG.map(function (d) {
      var available = decorAvailableCount(d.id);
      var placeBtn = available > 0
        ? '<button class="dgc-btn dgc-btn-primary" data-decor-action="place" data-decor-id="' + d.id + '">Place (' + available + ')</button>'
        : '';
      var iconHtml = d.sprite ? '<img src="' + FOLIAGE_SPRITES[d.sprite] + '" alt="" style="width:26px; height:26px; object-fit:contain;">'
        : d.svg ? '<span class="dgc-decor-icon-svg" style="display:inline-block; width:22px; height:22px; vertical-align:middle;">' + d.svg + '</span>'
        : d.icon;
      return '<div class="dgc-shop-card">' +
        '<div class="dgc-shop-card-icon">' + iconHtml + '</div>' +
        '<div class="dgc-shop-card-info">' +
          '<div class="dgc-shop-card-name">' + d.name + '</div>' +
          '<div class="dgc-shop-card-desc">' + d.desc + (decorOwnedCount(d.id) ? ' — owned ' + decorOwnedCount(d.id) : '') + '</div>' +
        '</div>' +
        '<div class="dgc-shop-card-action" style="display:flex; flex-direction:column; gap:6px; align-items:flex-end;">' +
          '<button class="dgc-btn" data-decor-action="buy" data-decor-id="' + d.id + '">Buy — ' + d.cost + '🪙</button>' +
          placeBtn +
        '</div>' +
      '</div>';
    }).join('');
  }
  function buyDecoration(id) {
    var d = DECORATION_CATALOG.filter(function (d) { return d.id === id; })[0];
    if (!d) return;
    if (save.coins < d.cost) { playSfx('insufficientFunds'); return; }
    save.coins -= d.cost;
    save.ownedDecorations[id] = decorOwnedCount(id) + 1;
    persist();
    playSfx('purchase');
    renderGeneralStore();
  }
  var cityPlacingDecorId = null;
  function startPlacingDecoration(id) {
    if (decorAvailableCount(id) <= 0) return;
    cityPlacingDecorId = id;
    closeModals();
    var banner = $('dgcCityPlacingBanner');
    if (banner) { banner.hidden = false; banner.textContent = '📍 Tap the ground to place — Esc to cancel'; }
    var vp = $('dgcCityViewport'); if (vp) vp.classList.add('dgc-city-placing-mode');
  }
  function cancelPlacingDecoration() {
    cityPlacingDecorId = null;
    var banner = $('dgcCityPlacingBanner');
    if (banner) banner.hidden = true;
    var vp = $('dgcCityViewport'); if (vp) vp.classList.remove('dgc-city-placing-mode');
  }
  // Section 2A — reject a placement that would land a new decoration on
  // a building, the plaza, a road, or right on top of another placed
  // decoration, instead of only fixing draw-order after the fact.
  function decorationSpotBlocked(worldX, worldY) {
    if (worldX > FOREST_X0 - 10 || solidsAt(worldX, worldY, 0)) return true; // forest path + New City stay decoration-free
    if (pointBlockedForEnvironment(worldX, worldY, 6)) return true;
    if (blockedByHouse(worldX, worldY, 6)) return true;
    return save.townDecorations.some(function (d) { return Math.hypot(d.x - worldX, d.y - worldY) < 22; });
  }
  function placeDecorationAt(worldX, worldY) {
    if (!cityPlacingDecorId) return;
    if (decorationSpotBlocked(worldX, worldY)) {
      playSfx('insufficientFunds'); // reused as the generic "can't do that" cue
      var banner = $('dgcCityPlacingBanner');
      if (banner) {
        var prevText = banner.textContent;
        banner.textContent = "🚫 Can't place on top of that — try another spot";
        setTimeout(function () { if (!banner.hidden) banner.textContent = prevText; }, 1200);
      }
      return;
    }
    decorInstanceCounter++;
    save.townDecorations.push({ decorId: cityPlacingDecorId, x: worldX, y: worldY, instanceId: 'd' + Date.now() + '_' + decorInstanceCounter });
    persist();
    playSfx('equip');
    renderCityDecorations();
    // Stay in placement mode if more of the same item are still available
    // (placing several trees shouldn't require re-opening the store each
    // time) — otherwise exit placement mode automatically.
    if (decorAvailableCount(cityPlacingDecorId) <= 0) cancelPlacingDecoration();
  }
  function pickUpDecoration(instanceId) {
    var idx = save.townDecorations.findIndex(function (d) { return d.instanceId === instanceId; });
    if (idx === -1) return;
    save.townDecorations.splice(idx, 1);
    persist();
    playSfx('click');
    renderCityDecorations();
  }
  function renderCityDecorations() {
    var layer = $('dgcCityDecorLayer');
    if (!layer) return;
    layer.innerHTML = save.townDecorations.map(function (inst) {
      var d = DECORATION_CATALOG.filter(function (d) { return d.id === inst.decorId; })[0];
      if (!d) return '';
      var z = Math.round(inst.y); // Section 2A — same y-sort as every other ground object
      if (d.sprite) {
        return '<img class="dgc-city-decor dgc-city-decor-' + d.kind + ' dgc-city-decor-sprite" data-decor-instance="' + inst.instanceId + '" ' +
          'style="left:' + inst.x + 'px; top:' + inst.y + 'px; z-index:' + z + ';" src="' + FOLIAGE_SPRITES[d.sprite] + '" alt="">';
      }
      if (d.svg) {
        return '<div class="dgc-city-decor dgc-city-decor-' + d.kind + ' dgc-city-decor-svg" data-decor-instance="' + inst.instanceId + '" ' +
          'style="left:' + inst.x + 'px; top:' + inst.y + 'px; width:' + d.svgW + 'px; height:' + d.svgH + 'px; z-index:' + z + ';">' + d.svg + '</div>';
      }
      return '<div class="dgc-city-decor dgc-city-decor-' + d.kind + '" data-decor-instance="' + inst.instanceId + '" ' +
        'style="left:' + inst.x + 'px; top:' + inst.y + 'px; z-index:' + z + ';">' + d.icon + '</div>';
    }).join('');
  }

  function resetAllProgress() {
    // Practice Mode and the daily streak are settings/return-visit data,
    // not "progress" in the sense this button describes (coins, XP,
    // cleared bosses) — carried forward through the wipe, same spirit as
    // sound settings already being stored outside this reset's blast radius.
    var keepPracticeMode = save.practiceMode;
    var keepStreak = { lastPlayedDate: save.lastPlayedDate, currentDailyStreak: save.currentDailyStreak, longestDailyStreak: save.longestDailyStreak };
    save = {
      coins: 0, xp: 0, bossesDefeated: [], bestCombo: 1, highScore: 0,
      level: 1, currentXP: 0, xpToNextLevel: xpToNextLevelForLevel(1), heroTier: tierForLevel(1).id,
      stats: statsForLevel(1), starterCoinsGranted: false, equippedWeapon: 'keyboardBlaster',
      ownedWeapons: ['keyboardBlaster'], equippedOutfit: 'default', ownedOutfits: ['default'],
      bankInvestedAmount: 0, lastBankVisitTimestamp: Date.now(), unlockedLibraryPacks: [],
      ownedDecorations: {}, townDecorations: [],
      equippedHair: 'brown', ownedHair: ['brown'], equippedShoes: 'default', ownedShoes: ['default'],
      equippedAccessory: 'none', ownedAccessories: ['none'], selectedCharacterId: null,
      npcLastLineIndex: {},
      performanceHistory: normalizePerformanceHistory(null), bestFinalBossScore: 0, bossLevelProgress: {},
      dialogueBag: {}, talked: {}, visited: {},
      practiceMode: keepPracticeMode,
      lastPlayedDate: keepStreak.lastPlayedDate, currentDailyStreak: keepStreak.currentDailyStreak, longestDailyStreak: keepStreak.longestDailyStreak
    };
    persist();
    refreshHeroTierVisuals();
    // A "New Game" reset is a genuine fresh start, not a punishment —
    // the starter-coin moment plays again exactly like a real new player,
    // and so does the character choice (selectedCharacterId is null
    // again above) — showCharacterSelectScreen() picks this screen back
    // up before the normal title screen.
    grantStarterCoinsIfNeeded();
    refreshStartScreen();
    showCharacterSelectScreen(false);
  }

  /* ============================================================
     SOUND SETTINGS — mute + master volume, both functional and
     persisted (dgc_sound_v1), independent of the dgc_save_v1 game-
     progress key so muting never touches coins/XP/level state.
     ============================================================ */
  var soundEnabled = false; // derived: !muted — kept as its own var since playSfx() already reads it directly
  var masterVolume = 0.7;
  (function loadSoundSetting() {
    try {
      var raw = localStorage.getItem('dgc_sound_v1');
      if (raw == null) throw 0;
      var parsed = JSON.parse(raw);
      if (typeof parsed === 'boolean') {
        // legacy format from before the volume slider existed: a bare "true"/"false" meant "sound on"
        soundEnabled = parsed;
        masterVolume = 0.7;
      } else if (parsed && typeof parsed === 'object') {
        soundEnabled = !parsed.muted;
        masterVolume = (typeof parsed.volume === 'number') ? parsed.volume : 0.7;
      }
    } catch (e) { soundEnabled = false; masterVolume = 0.7; }
  })();
  function persistSoundSetting() {
    try { localStorage.setItem('dgc_sound_v1', JSON.stringify({ muted: !soundEnabled, volume: masterVolume })); } catch (e) { /* storage unavailable */ }
  }
  function applySoundToggleUI() {
    $('dgcSoundToggle').setAttribute('data-on', soundEnabled ? 'true' : 'false');
    var slider = $('dgcVolumeSlider');
    if (slider) {
      slider.value = Math.round(masterVolume * 100);
      slider.style.setProperty('--dgc-vol-pct', Math.round(masterVolume * 100) + '%');
    }
  }

  /* ============================================================
     SFX ENGINE — every cue is synthesized live via the Web Audio API
     (oscillator + gain envelope), not a loaded asset file: zero extra
     bytes, nothing to fetch, so it can never slow down load or the
     world-entry transition. The AudioContext is created lazily, only
     inside a real playSfx() call — which itself only ever fires from a
     genuine click/game-event handler — so this never attempts to
     autoplay on page load, respecting browser autoplay policy.
     ============================================================ */
  var audioCtx = null;
  function getAudioCtx() {
    if (audioCtx) return audioCtx;
    try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { audioCtx = null; }
    return audioCtx;
  }
  function tone(freq, duration, opts) {
    opts = opts || {};
    var ctx = getAudioCtx();
    if (!ctx) return;
    if (ctx.state === 'suspended') { ctx.resume().catch(function () {}); }
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.type = opts.type || 'sine';
    var t0 = ctx.currentTime;
    osc.frequency.setValueAtTime(Math.max(1, freq), t0);
    if (opts.freqEnd) osc.frequency.exponentialRampToValueAtTime(Math.max(1, opts.freqEnd), t0 + duration);
    var vol = Math.max(0.0001, (opts.volume != null ? opts.volume : 0.2) * masterVolume);
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(vol, t0 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + duration + 0.03);
  }
  // Each cue: a short, cheap sequence of tone() calls tuned to the doc's
  // own description (bigger/distinct for crit, descending for
  // break/defeat, rising for combo-up/level-up, a tense low pulse for
  // enrage, etc.) — reused unchanged everywhere that moment happens.
  var SFX = {
    hit: function () { tone(220, 0.11, { type: 'square', volume: 0.16 }); },
    crit: function () { tone(520, 0.08, { type: 'square', volume: 0.2 }); setTimeout(function () { tone(780, 0.14, { type: 'square', volume: 0.2, freqEnd: 1000 }); }, 55); },
    wrong: function () { tone(170, 0.18, { type: 'sawtooth', volume: 0.14, freqEnd: 90 }); },
    comboUp: function () { tone(520, 0.09, { type: 'sine', volume: 0.14, freqEnd: 820 }); },
    comboBreak: function () { tone(420, 0.16, { type: 'sine', volume: 0.14, freqEnd: 180 }); },
    coin: function () { tone(880, 0.06, { type: 'square', volume: 0.14 }); setTimeout(function () { tone(1318, 0.08, { type: 'square', volume: 0.14 }); }, 55); },
    victory: function () { [523, 659, 784, 1046].forEach(function (f, i) { setTimeout(function () { tone(f, 0.22, { type: 'triangle', volume: 0.2 }); }, i * 110); }); },
    defeat: function () { tone(220, 0.32, { type: 'sine', volume: 0.15, freqEnd: 100 }); },
    levelup: function () { tone(440, 0.14, { type: 'sine', volume: 0.18, freqEnd: 700 }); setTimeout(function () { tone(660, 0.22, { type: 'triangle', volume: 0.2, freqEnd: 1100 }); }, 120); },
    tierUp: function () { [660, 880, 1100, 1400].forEach(function (f, i) { setTimeout(function () { tone(f, 0.16, { type: 'triangle', volume: 0.18 }); }, i * 85); }); },
    hint: function () { tone(950, 0.07, { type: 'sine', volume: 0.12 }); },
    enrage: function () { tone(140, 0.32, { type: 'sawtooth', volume: 0.12, freqEnd: 95 }); },
    keypress: function () { tone(1200, 0.02, { type: 'square', volume: 0.045 }); },
    click: function () { tone(700, 0.035, { type: 'square', volume: 0.09 }); },
    ding: function () { tone(1320, 0.28, { type: 'sine', volume: 0.16 }); setTimeout(function () { tone(990, 0.4, { type: 'sine', volume: 0.14 }); }, 150); },
    hover: function () { tone(1000, 0.02, { type: 'sine', volume: 0.045 }); },
    cast: function () { tone(500, 0.08, { type: 'square', volume: 0.14, freqEnd: 900 }); },
    worldEntry: function () { tone(120, 0.6, { type: 'sawtooth', volume: 0.13, freqEnd: 380 }); },
    fullscreen: function () { tone(600, 0.09, { type: 'sine', volume: 0.13, freqEnd: 900 }); },
    starterCoins: function () { [660, 880, 1046, 1318].forEach(function (f, i) { setTimeout(function () { tone(f, 0.1, { type: 'square', volume: 0.15 }); }, i * 70); }); },
    // Phase 4 — Armory/Tailor/Bank/Library interaction cues.
    purchase: function () { [523, 784, 1046].forEach(function (f, i) { setTimeout(function () { tone(f, 0.12, { type: 'triangle', volume: 0.17 }); }, i * 65); }); },
    equip: function () { tone(300, 0.06, { type: 'square', volume: 0.15 }); setTimeout(function () { tone(420, 0.08, { type: 'square', volume: 0.15 }); }, 50); },
    insufficientFunds: function () { tone(180, 0.14, { type: 'square', volume: 0.13, freqEnd: 120 }); }
  };

  /* ============================================================
     COMBAT: START / RENDER
     ============================================================ */
  function startFight(bossId, levelIdx) {
    if (state && state.timer) clearInterval(state.timer); // defensive: kill any timer from a fight the player abandoned
    state = newRunState(bossId, levelIdx);
    // Fresh fight = fresh expression bookkeeping, so a stale cached baseline
    // or a still-ticking revert timer from the PREVIOUS fight can never
    // leak into this one (same defensive spirit as the state.timer guard above).
    Object.keys(exprTimers).forEach(function (k) { clearTimeout(exprTimers[k]); });
    exprTimers = {}; transientUntil = {}; baseExprCache = {};
    $('dgcBossName').textContent = state.boss.name;
    $('dgcHeroSprite').innerHTML = chibiRoot('hero');
    $('dgcHeroSprite').className = 'dgc-sprite';
    $('dgcBossSprite').innerHTML = chibiRoot(state.boss.chibiKind || 'golem');
    $('dgcBossSprite').className = 'dgc-sprite';
    $('dgcSudoSprite').innerHTML = chibiRoot('sudo');
    $('dgcSudo').className = 'dgc-sudo';
    setExpression($('dgcHeroSprite'), 'determined');
    setExpression($('dgcBossSprite'), 'idle');
    setExpression($('dgcSudoSprite'), 'idle');
    baseExprCache = { hero: 'determined', boss: 'idle', sudo: 'idle' };
    // Opening-bell beat: hero readies up, Sudo's confident in the hero — a
    // real "fight begins" event, not a standalone idle animation.
    flashExpression('sudo', 'confident', 1600);
    $('dgcFxLayer').innerHTML = '';
    updateTopbar();
    updateHpBars(true);
    updatePhaseTag();
    showScreen('combat');
    if (state.isFinalBoss) {
      // "Opens with a rapid_recon burst round" — reuses the exact existing
      // Rapid Recon mechanic unchanged; its own finish() calls nextQuestion()
      // for us, which is where the mixed-pool special-case takes over.
      startRapidRecon();
    } else {
      nextQuestion();
    }
  }

  function updateTopbar() {
    $('dgcCoinsCombat').textContent = save.coins;
    $('dgcXpCombat').textContent = save.xp;
    $('dgcCombo').textContent = 'Combo x' + state.combo;
  }

  function updateHpBars(instant) {
    var heroPct = Math.max(0, state.heroHp / state.heroHpMax * 100);
    var bossPct = Math.max(0, state.bossHp / state.bossHpMax * 100);
    var heroFill = $('dgcHeroHpFill');
    var bossFill = $('dgcBossHpFill');
    heroFill.style.width = heroPct + '%';
    bossFill.style.width = bossPct + '%';
    heroFill.classList.toggle('dgc-hp-low', heroPct <= 25);
    bossFill.classList.toggle('dgc-hp-low', bossPct <= 25);
    $('dgcHeroHpText').textContent = Math.max(0, Math.round(state.heroHp)) + '/' + state.heroHpMax;
    $('dgcBossHpText').textContent = Math.max(0, Math.round(state.bossHp)) + '/' + state.bossHpMax;
    applyPersistentExpressions(); // HP just changed — re-check worried/tired/angry baselines
  }

  function updatePhaseTag() {
    if (state.isFinalBoss) {
      $('dgcPhaseTag').textContent = '⏰ FINAL EXAM — Everything At Once';
      return;
    }
    if (state.levelIdx !== null && state.levelIdx !== undefined) {
      $('dgcPhaseTag').textContent = 'LEVEL ' + (state.levelIdx + 1) + ' — ' + state.boss.phaseNames[0];
      return;
    }
    $('dgcPhaseTag').textContent = 'Phase ' + (state.phaseIdx + 1) + '/3 — ' + state.boss.phaseNames[state.phaseIdx];
  }

  var finalBossMixedPoolCache = null;
  // "Moves through a mixed sequence... randomly drawn from the cleared
  // bosses' question pools (reuse existing content, don't author an
  // entirely separate bank)" — flattens every OTHER boss's 3 phases into
  // one big pool, built once and reused for the rest of the session.
  // Rides the exact same pickNextPoolIndex()/no-repeat machinery as every
  // normal boss phase — nothing new needed there.
  function getFinalBossMixedPool() {
    if (finalBossMixedPoolCache) return finalBossMixedPoolCache;
    var pool = [];
    Object.keys(BOSSES).forEach(function (id) {
      if (id === 'pager') return;
      BOSSES[id].phases.forEach(function (phase) { pool = pool.concat(phase); });
    });
    finalBossMixedPoolCache = pool;
    return pool;
  }

  function currentPhaseQuestions() {
    if (state.isFinalBoss) return getFinalBossMixedPool();
    var basePool = state.boss.phases[state.phaseIdx];
    // Phase 4 — Library Advanced Packs fold into the FINAL phase's pool
    // only, once purchased (see LIBRARY_ADVANCED_PACKS + the Library
    // building) — same shared no-repeat picker, no separate UI/engine
    // path, per the master doc's explicit integration requirement.
    var isLastPhase = state.phaseIdx === state.boss.phases.length - 1;
    var pack = LIBRARY_ADVANCED_PACKS[state.boss.id];
    if (isLastPhase && pack && save.unlockedLibraryPacks.indexOf(state.boss.id) !== -1) {
      return basePool.concat(pack);
    }
    return basePool;
  }

  /* ============================================================
     SHARED UTILITY: no-repeat-until-exhausted question picker.
     Every phase of every boss — current and every Phase-3 boss to come —
     must draw its next question through THIS one function, not a bespoke
     shuffle of its own. Hands out a phase's question pool in random order
     with zero repeats, reshuffles ONLY once the pool is exhausted, and
     guards the one edge a naive reshuffle misses: the reshuffle's first
     pick is never allowed to be the exact question that was just asked.
     Call resetPoolOrder() whenever a fight moves to a genuinely new pool
     (a phase transition) so the new phase starts its own fresh shuffle.
     ============================================================ */
  function pickNextPoolIndex(pool) {
    if (!state.questionOrder || state.orderPos >= state.questionOrder.length) {
      var lastIdx = (state.questionOrder && state.orderPos > 0) ? state.questionOrder[state.orderPos - 1] : null;
      var order = shuffle(pool.map(function (_, i) { return i; }));
      if (order.length > 1 && lastIdx !== null && order[0] === lastIdx) {
        var swapWith = 1 + Math.floor(Math.random() * (order.length - 1));
        var tmp = order[0]; order[0] = order[swapWith]; order[swapWith] = tmp;
      }
      state.questionOrder = order;
      state.orderPos = 0;
    }
    var idx = state.questionOrder[state.orderPos];
    state.orderPos++;
    return idx;
  }
  function resetPoolOrder() { state.questionOrder = null; state.orderPos = 0; }

  function nextQuestion() {
    clearInterval(state.timer);
    $('dgcHintDisplay').hidden = true;
    $('dgcHintDisplay').textContent = '';
    $('dgcCloseNote').hidden = true;
    $('dgcHintNudge').disabled = false;
    $('dgcHintPartial').disabled = false;
    $('dgcHintFull').disabled = false;
    state.readTheRoomStep = 'diagnose';
    state.selectedOption = null;
    state.selectedLine = null;
    state.seqChosen = [];

    // "Closes with one full read_the_room-style incident NARRATIVE
    // question" — triggered once, based on remaining HP (per the doc's own
    // suggestion), overriding the normal pool pick for exactly one question.
    if (state.isFinalBoss && !state.starAsked && state.bossHpMax && (state.bossHp / state.bossHpMax) <= 0.15) {
      state.starAsked = true;
      state.currentQuestion = FINAL_BOSS_STAR_QUESTION;
      renderQuestion(FINAL_BOSS_STAR_QUESTION);
      startTimer(FINAL_BOSS_STAR_QUESTION.timeAllotted || 90);
      return;
    }

    var pool = currentPhaseQuestions();
    var q = pool[pickNextPoolIndex(pool)];
    state.currentQuestion = q;
    renderQuestion(q);
    startTimer(q.timeAllotted || 50);
  }

  /* ============================================================
     TIMER + ENRAGE
     ============================================================ */
  function startTimer(seconds, onTimeout) {
    onTimeout = onTimeout || function () { resolveAnswer('wrong', true); };
    // Focus stat (Phase 2): a small, level-scaled, already-capped bonus
    // applied here so every timed moment that goes through startTimer
    // (every question mode + the boss special attack) benefits uniformly,
    // without touching each call site individually.
    seconds = seconds + save.stats.focus + outfitFocusBonus();
    // Practice Mode (Phase 5, Section 3A): no timer pressure at all — a
    // huge allotment instead of a separate "untimed" code path, so every
    // existing timer-driven behavior (the fill bar, the enrage flip at
    // 20%, a genuine on-timeout callback) keeps working unchanged, it
    // just never realistically reaches the danger zone.
    if (save.practiceMode) seconds = 999999;
    state.timeAllotted = seconds;
    state.timeLeft = seconds;
    var fill = $('dgcTimerFill');
    fill.style.transition = 'none';
    fill.style.width = '100%';
    fill.classList.remove('dgc-timer-warn', 'dgc-timer-danger');
    void fill.offsetWidth; // force reflow so the transition re-applies cleanly
    fill.style.transition = 'width 1s linear, background-color .3s';

    // Capture the current state object + a fresh interval id so this tick
    // self-clears if a NEW fight (a new `state` object) has since started —
    // this is what prevents a leftover timer from a previous/quit fight
    // from continuing to drain time on whatever fight is currently active.
    var stateRefForTimer = state;
    var intervalId = setInterval(function () {
      if (state !== stateRefForTimer) { clearInterval(intervalId); return; }
      state.timeLeft--;
      var pct = Math.max(0, state.timeLeft / state.timeAllotted * 100);
      fill.style.width = pct + '%';
      if (pct <= 50 && pct > 20) fill.classList.add('dgc-timer-warn');
      if (pct <= 20) { fill.classList.remove('dgc-timer-warn'); fill.classList.add('dgc-timer-danger'); }
      // The clock hitting the danger zone doubles as this boss's "enrage
      // timer" — the exact mechanic the Angry/Enraged expression is
      // supposed to reuse, not a separate system.
      var wasEnraged = state.bossEnraged;
      state.bossEnraged = pct <= 20;
      if (state.bossEnraged && !wasEnraged) playSfx('enrage'); // fire once on the flip, not every tick
      applyPersistentExpressions();
      if (state.timeLeft <= 0) {
        clearInterval(intervalId);
        onTimeout();
      }
    }, 1000);
    state.timer = intervalId;
  }

  function enrageFactor() {
    var elapsedFrac = 1 - (state.timeLeft / state.timeAllotted);
    if (elapsedFrac > 0.7) return 1.5;
    if (elapsedFrac > 0.4) return 1.2;
    return 1;
  }

  /* ============================================================
     RENDER QUESTION BY MODE
     ============================================================ */
  function renderQuestion(q) {
    state.locked = false; // a fresh question is interactable again
    state.hintUsedThisQ = false; // fresh question → Sudo's "smug" is back in play
    // A genuine mode switch mid-fight (e.g. terminal → spot_the_bug) catches
    // the boss and Sudo off guard — reuses this exact dispatch point, no
    // separate tracking system.
    if (state.lastQuestionMode && state.lastQuestionMode !== q.mode) {
      flashExpression('boss', 'confused', 1300);
      flashExpression('sudo', 'confused', 1300);
    }
    // Section 2A — the hero gets a distinct reaction the first time THIS
    // fight sees a given mode at all (genuine novelty, not just "it
    // changed") — curious, not confused, and it's the hero's own read on
    // the moment rather than the boss/Sudo's.
    if (!state.seenModesThisFight[q.mode]) {
      state.seenModesThisFight[q.mode] = true;
      flashExpression('hero', 'curious', 1300);
    }
    state.lastQuestionMode = q.mode;
    $('dgcPrompt').innerHTML = q.prompt;
    var area = $('dgcModeArea');
    area.innerHTML = '';

    if (q.mode === 'terminal') {
      area.innerHTML =
        '<div class="dgc-terminal">' +
          '<span class="dgc-terminal-prompt">devops@' + bossHostname() + ':~$</span>' +
          '<input type="text" class="dgc-terminal-input" id="dgcModeInput" autocomplete="off" spellcheck="false" placeholder="type your command...">' +
          '<button class="dgc-btn dgc-terminal-submit" id="dgcModeSubmit">Enter ⏎</button>' +
        '</div>';
      wireEnterAndSubmit(function () {
        var val = $('dgcModeInput').value;
        var tier = validateTerminal(q, val);
        resolveAnswer(tier);
      });
      $('dgcModeInput').focus();

    } else if (q.mode === 'spot_the_bug') {
      var linesHtml = q.codeBlock.map(function (line, i) {
        return '<span class="dgc-code-line" data-line="' + i + '" tabindex="0" role="button">' + escapeHtml(line) + '</span>';
      }).join('\n');
      area.innerHTML =
        '<div class="dgc-codeblock">' + linesHtml + '</div>' +
        '<div class="dgc-terminal">' +
          '<span class="dgc-terminal-prompt">fix:</span>' +
          '<input type="text" class="dgc-terminal-input" id="dgcModeInput" autocomplete="off" spellcheck="false" placeholder="click the buggy line above, then type the fix...">' +
          '<button class="dgc-btn dgc-terminal-submit" id="dgcModeSubmit">Enter ⏎</button>' +
        '</div>';
      // Accessibility (Phase 5, Section 3A): same click-only gap as the
      // triage/sequence modes above — fixed the same way.
      function selectCodeLine(el) {
        area.querySelectorAll('.dgc-code-line').forEach(function (e2) { e2.classList.remove('dgc-line-selected'); });
        el.classList.add('dgc-line-selected');
        state.selectedLine = parseInt(el.getAttribute('data-line'), 10);
      }
      area.querySelectorAll('.dgc-code-line').forEach(function (el) {
        el.addEventListener('click', function () { selectCodeLine(el); });
        el.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectCodeLine(el); }
        });
      });
      wireEnterAndSubmit(function () {
        var val = $('dgcModeInput').value;
        var tier = validateSpotTheBug(q, val);
        resolveAnswer(tier);
      });

    } else if (q.mode === 'triage_call') {
      var cardsHtml = q.options.map(function (opt) {
        return '<div class="dgc-option-card" data-id="' + opt.id + '" tabindex="0" role="button">' + escapeHtml(opt.label) + '</div>';
      }).join('');
      area.innerHTML =
        '<div class="dgc-option-cards">' + cardsHtml + '</div>' +
        '<div class="dgc-terminal">' +
          '<span class="dgc-terminal-prompt">why:</span>' +
          '<input type="text" class="dgc-terminal-input" id="dgcModeInput" autocomplete="off" spellcheck="false" placeholder="pick an option above, then justify it in one line...">' +
          '<button class="dgc-btn dgc-terminal-submit" id="dgcModeSubmit">Enter ⏎</button>' +
        '</div>';
      // Accessibility (Phase 5, Section 3A): these were plain divs with only
      // a click handler — completely unreachable via keyboard. tabindex+role
      // above makes them focusable/announced; Enter/Space here fires the
      // exact same selection the click handler does, not a parallel path.
      function selectOptionCard(el) {
        area.querySelectorAll('.dgc-option-card').forEach(function (e2) { e2.classList.remove('dgc-option-selected'); });
        el.classList.add('dgc-option-selected');
        state.selectedOption = el.getAttribute('data-id');
      }
      area.querySelectorAll('.dgc-option-card').forEach(function (el) {
        el.addEventListener('click', function () { selectOptionCard(el); });
        el.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectOptionCard(el); }
        });
      });
      wireEnterAndSubmit(function () {
        var val = $('dgcModeInput').value;
        var tier = validateTriageCall(q, val);
        resolveAnswer(tier);
      });

    } else if (q.mode === 'read_the_room') {
      renderReadTheRoomStep(q);

    } else if (q.mode === 'build_the_pipeline') {
      renderPipelineSequencer(q);

    } else if (q.mode === 'star_narrative') {
      area.innerHTML =
        '<div class="dgc-star-panel">' +
          '<div class="dgc-star-legend"><b>S</b>ituation · <b>T</b>ask · <b>A</b>ction · <b>R</b>esult</div>' +
          '<textarea class="dgc-star-textarea" id="dgcModeInput" placeholder="Walk through it in your own words — a few sentences is plenty..." rows="5"></textarea>' +
          '<button class="dgc-btn dgc-btn-primary dgc-star-submit" id="dgcModeSubmit">Submit Answer ⏎</button>' +
        '</div>';
      $('dgcModeSubmit').addEventListener('click', function () {
        spawnCastProjectile(); playSfx('cast');
        var tier = validateStarNarrative(q, $('dgcModeInput').value);
        resolveAnswer(tier);
      });
      $('dgcModeInput').focus();
    }
  }

  function wireEnterAndSubmit(handler) {
    var input = $('dgcModeInput');
    var btn = $('dgcModeSubmit');
    // Submitting is an ACTION, not a form post: the typed command visually
    // launches from the console toward the boss every time, across every
    // mode that funnels through here (terminal / spot_the_bug / triage_call
    // / read_the_room) — ties typing directly into the existing hit FX.
    function fireAndSubmit() { spawnCastProjectile(); playSfx('cast'); handler(); }
    if (btn) btn.addEventListener('click', fireAndSubmit);
    if (input) input.addEventListener('keydown', function (e) { if (e.key === 'Enter') fireAndSubmit(); });
  }

  // Phase-5 sound hook: no audio assets exist yet, so this is a deliberate
  // no-op stub — every place a sound SHOULD play already calls it, so wiring
  // in real audio later touches only this one function.
  // The one function every event hook already calls — real audio now,
  // reusing the exact same call sites (no parallel sound-event system).
  function playSfx(name) {
    if (!soundEnabled) return;
    var fn = SFX[name];
    if (fn) { try { fn(); } catch (e) { /* audio unsupported/blocked — game still works silently */ } }
  }

  function spawnCastProjectile() {
    var layer = $('dgcFxLayer');
    if (!layer) return;
    var el = document.createElement('div');
    el.className = 'dgc-cast-bolt';
    layer.appendChild(el);
    setTimeout(function () { el.remove(); }, 550);
  }

  // Keystroke micro-feedback: a quick glow pulse on the console housing
  // itself, delegated on the stable #dgcModeArea container since the actual
  // .dgc-terminal-input element is re-created fresh per question.
  function wireTerminalKeyFeedback() {
    var area = $('dgcModeArea');
    if (!area) return;
    area.addEventListener('keydown', function (e) {
      if (!e.target || !e.target.classList || !e.target.classList.contains('dgc-terminal-input')) return;
      var box = e.target.closest('.dgc-terminal');
      if (!box) return;
      box.classList.remove('dgc-terminal-keypulse');
      void box.offsetWidth;
      box.classList.add('dgc-terminal-keypulse');
      playSfx('keypress');
    });
  }

  // Generic delegated click/hover feedback for every interactive surface —
  // menus, buttons, the reskinned option/seq/code-line objects — one
  // listener instead of wiring a sound call into every individual handler.
  // The terminal submit button is excluded since it already gets the
  // richer "cast" sound at the moment it fires.
  var DGC_UI_SOUND_SELECTOR = '.dgc-btn, .dgc-menu-item, .dgc-option-card, .dgc-seq-chip, .dgc-code-line, .dgc-hint-btn, .dgc-toggle, .dgc-boss-card, .dgc-fullscreen-toggle, button';
  function wireUiSounds() {
    var root = document.querySelector('#tab-game .dgc-root');
    if (!root) return;
    root.addEventListener('click', function (e) {
      var el = e.target.closest(DGC_UI_SOUND_SELECTOR);
      if (!el || el.classList.contains('dgc-terminal-submit') || el.classList.contains('dgc-fullscreen-toggle')) return;
      playSfx('click');
    }, true);
    var lastHoverEl = null;
    root.addEventListener('mouseover', function (e) {
      var el = e.target.closest(DGC_UI_SOUND_SELECTOR);
      if (!el || el === lastHoverEl) return;
      lastHoverEl = el;
      playSfx('hover');
    });
    root.addEventListener('mouseleave', function () { lastHoverEl = null; });
  }

  function renderReadTheRoomStep(q) {
    var area = $('dgcModeArea');
    var outHtml = q.outputBlock.map(function (l) { return escapeHtml(l); }).join('\n');
    if (state.readTheRoomStep === 'diagnose') {
      area.innerHTML =
        '<div class="dgc-outputblock"><pre>' + outHtml + '</pre></div>' +
        '<div class="dgc-terminal">' +
          '<span class="dgc-terminal-prompt">diagnosis:</span>' +
          '<input type="text" class="dgc-terminal-input" id="dgcModeInput" autocomplete="off" spellcheck="false" placeholder="what\'s wrong here?">' +
          '<button class="dgc-btn dgc-terminal-submit" id="dgcModeSubmit">Enter ⏎</button>' +
        '</div>';
      wireEnterAndSubmit(function () {
        var val = $('dgcModeInput').value;
        if (testPatterns(q.acceptableDiagnosesPatterns, val)) {
          state.readTheRoomStep = 'fix';
          renderReadTheRoomStep(q);
          startTimer(q.followUpFix.timeAllotted || 45);
        } else {
          resolveAnswer('wrong');
        }
      });
    } else {
      area.innerHTML =
        '<div class="dgc-outputblock"><pre>' + outHtml + '</pre></div>' +
        '<div class="found-p" style="color:var(--dgc-success);font-size:11px;margin-bottom:8px;">✓ Diagnosis confirmed. ' + escapeHtml(q.followUpFix.prompt) + '</div>' +
        '<div class="dgc-terminal">' +
          '<span class="dgc-terminal-prompt">fix:</span>' +
          '<input type="text" class="dgc-terminal-input" id="dgcModeInput" autocomplete="off" spellcheck="false" placeholder="type the fix command...">' +
          '<button class="dgc-btn dgc-terminal-submit" id="dgcModeSubmit">Enter ⏎</button>' +
        '</div>';
      wireEnterAndSubmit(function () {
        var val = $('dgcModeInput').value;
        var tier = 'wrong';
        if (testPatterns(q.followUpFix.optimalPatterns, val)) tier = 'optimal';
        else if (testPatterns(q.followUpFix.acceptablePatterns, val)) tier = 'correct';
        resolveAnswer(tier);
      });
      $('dgcModeInput') && $('dgcModeInput').focus();
    }
  }

  function renderPipelineSequencer(q) {
    var area = $('dgcModeArea');
    if (!state.seqPool) state.seqPool = shuffle(q.steps.map(function (s, i) { return { label: s, origIdx: i }; }));
    renderSeq();
    function renderSeq() {
      var poolHtml = state.seqPool.map(function (item, i) {
        return '<div class="dgc-seq-chip" data-pool-idx="' + i + '" tabindex="0" role="button">' + escapeHtml(item.label) + '</div>';
      }).join('');
      var chosenHtml = state.seqChosen.map(function (item, i) {
        return '<div class="dgc-seq-chip"><span class="dgc-seq-num">' + (i + 1) + '.</span>' + escapeHtml(item.label) + '</div>';
      }).join('');
      area.innerHTML =
        '<div style="font-size:10.5px;color:var(--dgc-text-dimmer);margin-bottom:6px;">Click (or Tab + Enter) the steps below in the correct order:</div>' +
        '<div class="dgc-seq-pool" id="dgcSeqPool">' + (poolHtml || '<span style="color:var(--dgc-text-dimmer);font-size:10.5px;">(all steps placed)</span>') + '</div>' +
        '<div style="font-size:10.5px;color:var(--dgc-text-dimmer);margin-bottom:6px;">Your sequence:</div>' +
        '<div class="dgc-seq-chosen" id="dgcSeqChosen">' + (chosenHtml || '<span style="color:var(--dgc-text-dimmer);font-size:10.5px;">(nothing chosen yet)</span>') + '</div>' +
        '<button class="dgc-btn dgc-btn-primary" id="dgcSeqSubmit" ' + (state.seqPool.length ? 'disabled' : '') + '>Submit Sequence</button>';
      // Accessibility (Phase 5, Section 3A): tabindex+role above + this
      // keydown handler make these keyboard-operable — previously mouse-only.
      function pickPoolChip(el) {
        var idx = parseInt(el.getAttribute('data-pool-idx'), 10);
        state.seqChosen.push(state.seqPool[idx]);
        state.seqPool.splice(idx, 1);
        renderSeq();
      }
      area.querySelectorAll('#dgcSeqPool .dgc-seq-chip').forEach(function (el) {
        el.addEventListener('click', function () { pickPoolChip(el); });
        el.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pickPoolChip(el); }
        });
      });
      var submitBtn = $('dgcSeqSubmit');
      if (submitBtn) submitBtn.addEventListener('click', function () {
        spawnCastProjectile(); playSfx('cast');
        var tier = validatePipeline(q, state.seqChosen);
        state.seqPool = null;
        resolveAnswer(tier);
      });
    }
  }

  /* ============================================================
     VALIDATION (per mode) — shared engine, data-driven
     ============================================================ */
  function validateTerminal(q, input) {
    if (!normalize(input)) return 'wrong';
    if (testPatterns(q.optimalPatterns, input)) return 'optimal';
    if (testPatterns(q.acceptablePatterns, input) || testPatterns(q.optimalPatterns, input)) return 'correct';
    // optimalPatterns already implies acceptable; also fold acceptable-but-not-optimal:
    return 'wrong';
  }

  function validateSpotTheBug(q, fixInput) {
    if (state.selectedLine !== q.buggyLineId) return 'wrong';
    if (!normalize(fixInput)) return 'correct'; // found the line, no fix typed — small credit as "correct" not "wrong"
    if (testPatterns(q.correctFixPatterns, fixInput)) return 'optimal';
    return 'correct';
  }

  function validateTriageCall(q, justification) {
    if (!state.selectedOption) return 'wrong';
    var opt = q.options.filter(function (o) { return o.id === state.selectedOption; })[0];
    if (!opt || opt.tier === 'wrong') return 'wrong';
    var justOk = testPatterns(q.justificationPatterns, justification);
    if (opt.tier === 'best' && justOk) return 'optimal';
    if (opt.tier === 'best' || opt.tier === 'defensible') return 'correct';
    return 'wrong';
  }

  function validatePipeline(q, chosen) {
    var labels = chosen.map(function (c) { return c.label; });
    var exact = q.steps.every(function (s, i) { return labels[i] === s; });
    if (exact) return 'optimal';
    var correctPositions = q.steps.filter(function (s, i) { return labels[i] === s; }).length;
    if (correctPositions >= Math.ceil(q.steps.length / 2)) return 'correct';
    return 'wrong';
  }

  // The Final Boss's closing STAR question — graded leniently for the real
  // INCIDENT-RESPONSE SHAPE (stabilize first, communicate, then root-cause),
  // per the master doc's own research, not for exact wording or syntax.
  function validateStarNarrative(q, text) {
    var t = normalize(text).toLowerCase();
    if (!t || t.length < 15) return 'wrong';
    var stabilize = /(roll\s*back|rollback|revert|stabiliz|mitigat|stop\s*the\s*bleeding|restore\s*service)/i.test(t);
    var communicate = /(notify|communicat|alert|inform|stakeholder|status\s*update|let\s*(the\s*)?team\s*know)/i.test(t);
    var rootCause = /(root\s*cause|investigat|post.?mortem|diagnos|debug|figure\s*out\s*why)/i.test(t);
    var hits = [stabilize, communicate, rootCause].filter(Boolean).length;
    if (hits >= 3) return 'optimal';
    if (hits >= 1) return 'correct';
    return 'wrong';
  }

  /* ============================================================
     "HOW CLOSE WAS I?" + END-OF-FIGHT REVIEW — driven by the EXISTING
     validation schema (patterns / option tiers / step order / the new
     baseCmds+why fields) rather than free-floating generated text. Reads
     directly from `state` + the still-live #dgcModeInput at the moment a
     tier is decided, exactly like validateTerminal()/validateSpotTheBug()
     etc. already do — no extra params threaded through resolveAnswer.
     ============================================================ */
  function closenessNote(q, tier, isTimeout) {
    if (tier === 'optimal') return pick(['Optimal — nothing faster than this.', 'That\'s the ideal move.', 'Textbook — nothing to add.']);
    if (tier === 'correct') return pick(['Correct, but there\'s a tighter way to do this.', 'It works — a sharper answer existed.']);

    // tier === 'wrong'
    if (isTimeout) return 'Too slow — the clock ran out before you answered.';

    if (q.mode === 'terminal') {
      var input = $('dgcModeInput');
      var v = normalize(input ? input.value : '');
      if (!v) return 'Empty — you didn\'t enter a command at all.';
      var firstWord = v.toLowerCase().split(/\s+/)[0];
      if (q.baseCmds && q.baseCmds.indexOf(firstWord) !== -1) return 'Close — right command, wrong flag or target.';
      return 'Not related to this task — wrong command entirely.';
    }
    if (q.mode === 'spot_the_bug') {
      if (state.selectedLine === null || state.selectedLine === undefined) return 'You never selected a line — click the buggy one first.';
      if (state.selectedLine !== q.buggyLineId) return 'Way off — that\'s not even the buggy line.';
      return 'Close — right line, but that fix doesn\'t actually resolve it.';
    }
    if (q.mode === 'triage_call') {
      if (!state.selectedOption) return 'You never picked an option.';
      var opt = (q.options || []).filter(function (o) { return o.id === state.selectedOption; })[0];
      if (!opt) return 'Not a valid pick.';
      return opt.why || 'Wrong tradeoff for this situation.';
    }
    if (q.mode === 'read_the_room') {
      if (state.readTheRoomStep === 'diagnose') return 'Right area, wrong conclusion — look again at what the output is telling you.';
      return 'Diagnosis was right, but that fix doesn\'t actually resolve it.';
    }
    if (q.mode === 'build_the_pipeline') {
      var labels = (state.seqChosen || []).map(function (c) { return c.label; });
      var steps = q.steps;
      for (var i = 0; i < steps.length - 1; i++) {
        if (labels[i] === steps[i + 1] && labels[i + 1] === steps[i]) return 'So close — you just swapped two adjacent steps (' + (i + 1) + ' & ' + (i + 2) + ').';
      }
      var wrongPositions = steps.filter(function (s, i2) { return labels[i2] !== s; }).length;
      return wrongPositions + ' step' + (wrongPositions === 1 ? '' : 's') + ' out of place.';
    }
    if (q.mode === 'star_narrative') {
      var input2 = $('dgcModeInput');
      var v2 = normalize(input2 ? input2.value : '');
      if (!v2 || v2.length < 15) return 'Too short — walk through what you\'d actually DO, step by step.';
      return 'Right idea forming, but missing the real shape interviewers listen for: stabilize first, communicate, then dig into root cause.';
    }
    return 'Not quite — check the prompt again.';
  }

  function summarizeUserAnswer(q) {
    var input = $('dgcModeInput');
    var raw = input ? input.value : '';
    if (q.mode === 'terminal' || q.mode === 'read_the_room') return raw || '(empty)';
    if (q.mode === 'spot_the_bug') {
      var lineTxt = (state.selectedLine !== null && state.selectedLine !== undefined) ? ('line ' + (state.selectedLine + 1) + ': ') : '';
      return lineTxt + (raw || '(no fix typed)');
    }
    if (q.mode === 'triage_call') {
      var opt = (q.options || []).filter(function (o) { return o.id === state.selectedOption; })[0];
      return (opt ? opt.label : '(no option picked)') + (raw ? ' — "' + raw + '"' : '');
    }
    if (q.mode === 'build_the_pipeline') return (state.seqChosen || []).map(function (c) { return c.label; }).join(' → ') || '(nothing sequenced)';
    return raw;
  }

  function idealAnswerText(q) {
    if (q.mode === 'build_the_pipeline') return q.steps.join('  →  ');
    return q.hintFull || '(see hint)';
  }

  // Shows the "how close" readout alongside the existing hit/damage FX —
  // one line, tier-colored, auto-clearing when the next question renders.
  // Phase 5, Section 3A — accessibility: a shape/icon prefix alongside
  // the tier color, so the result reads correctly without relying on
  // red/gold/teal alone (the text itself already differs per tier too —
  // this is a faster-to-scan cue on top of that, not the only signal).
  var CLOSE_NOTE_TIER_ICON = { wrong: '✗', correct: '✓', optimal: '★' };
  function showCloseNote(q, tier, isTimeout) {
    var el = $('dgcCloseNote');
    if (!el) return;
    el.className = 'dgc-close-note dgc-close-note-' + tier;
    el.textContent = (CLOSE_NOTE_TIER_ICON[tier] || '') + ' ' + closenessNote(q, tier, isTimeout);
    el.hidden = false;
  }

  // Records this question in the fight log for the end-of-fight review
  // screen — called once per resolved question, right after the tier is
  // known, while state.selectedLine/selectedOption/seqChosen/readTheRoomStep
  // and #dgcModeInput are all still exactly as they were at submission time.
  function logFightQuestion(q, tier, isTimeout) {
    state.fightLog.push({
      prompt: q.prompt,
      mode: q.mode,
      userAnswer: summarizeUserAnswer(q),
      tier: tier,
      note: closenessNote(q, tier, isTimeout),
      ideal: idealAnswerText(q)
    });
    // Phase 5, Section 1 — feed the Personalized Debrief's running tallies.
    // Practice Mode still records here on purpose (doc: "practice mode
    // should still feed useful data, just without the pressure layer").
    recordPerformance(state.bossId, q.mode, tier);
  }

  function recordPerformance(bossId, mode, tier) {
    var ph = save.performanceHistory;
    if (!ph.byBoss[bossId]) ph.byBoss[bossId] = { attempts: 0, correctOrBetter: 0, optimal: 0 };
    if (!ph.byMode[mode]) ph.byMode[mode] = { attempts: 0, correctOrBetter: 0, optimal: 0 };
    var b = ph.byBoss[bossId], m = ph.byMode[mode];
    b.attempts++; m.attempts++;
    if (tier === 'optimal' || tier === 'correct') { b.correctOrBetter++; m.correctOrBetter++; }
    if (tier === 'optimal') { b.optimal++; m.optimal++; }
    persist();
  }

  /* ============================================================
     RESOLVE ANSWER → APPLY DAMAGE, COMBO, COINS, FX
     ============================================================ */
  function resolveAnswer(tier, isTimeout) {
    // Guards against a double-submit during the ~1-2s window between a
    // question resolving and the next question/victory/defeat screen
    // actually appearing — without this, a fast click (or a timeout firing
    // right as the player also clicks submit) could award coins/XP twice
    // for the same question, or double-fire the victory sequence.
    if (state.locked) return;
    state.locked = true;
    clearInterval(state.timer);
    var q = state.currentQuestion;
    var hintFullUsed = state.hintFullUsedThisQ;
    state.hintFullUsedThisQ = false;

    // "How close was I?" readout + the fight-log entry for the end-of-fight
    // review screen — computed once here (before anything below mutates
    // state) since it's identical for every tier/branch.
    logFightQuestion(q, tier, isTimeout);
    showCloseNote(q, tier, isTimeout);

    if (tier === 'wrong') {
      var wasLow = state.heroHpMax && state.heroHp / state.heroHpMax <= 0.25;
      // Practice Mode: the "wrong answer" reaction (close-note, sound,
      // face, combo reset) all still fire — the only thing switched off
      // is the actual HP cost, per the doc's "no HP loss on wrong
      // answers" requirement.
      var dmg = save.practiceMode ? 0 : Math.round((q.damageIfCorrect || 15) * 0.6 * enrageFactor());
      var comboBeforeReset = state.combo;
      state.heroHp = Math.max(0, state.heroHp - dmg);
      state.combo = 1;
      updateTopbar();
      spawnDamageNumber('hero', dmg, false);
      shakeArena(dmg > 20 ? 'lg' : 'md');
      flashSprite('dgcHeroSprite');
      flashHeroDefendPose();
      sudoReact('wince');
      playSfx('wrong');
      if (comboBeforeReset > 1) playSfx('comboBreak');

      // Hero's face: a timeout reads as "didn't get there in time" (confused),
      // not pain — a real, distinct wrong-answer path from a heavy/light hit.
      // Section 2A — a light miss occasionally reads as a lighthearted
      // "oops" (embarrassed) rather than always the same hurtLight wince,
      // so a run of small misses doesn't feel like talking to a frozen
      // statue; heavy hits stay serious every time (never "cute").
      var lightMissVariant = (!isTimeout && dmg <= 20 && Math.random() < 0.35) ? 'embarrassed' : 'hurtLight';
      flashExpression('hero', isTimeout ? 'confused' : (dmg > 20 ? 'hurtHeavy' : lightMissVariant), 1300);
      // Boss is pleased it landed a hit — bigger tell on a bigger hit.
      flashExpression('boss', dmg > 20 ? 'excited' : 'happy', 1200);
      // Sudo: a heavy hit gets sympathy (distinct from Sudo's own hurt faces,
      // since Sudo isn't the one being damaged); a light hit gets Sudo's own
      // light wince. The FIRST time the hero's HP crosses into the danger
      // zone this fight, that one-shot moment overrides with a sharper face.
      var nowLow = state.heroHpMax && state.heroHp / state.heroHpMax <= 0.25;
      if (nowLow && !wasLow && !state.heroLowHpAlertShown) {
        state.heroLowHpAlertShown = true;
        flashExpression('sudo', 'hurtHeavy', 1500);
      } else {
        flashExpression('sudo', dmg > 20 ? 'sympathetic' : 'hurtLight', 1300);
      }
      // Near-miss survival: hero barely lives through this hit — a defiant
      // angry beat before settling into the (already-triggered) worried baseline.
      if (state.heroHp > 0 && nowLow && state.heroHp / state.heroHpMax <= 0.12) {
        guardedTimeout(function () { flashExpression('hero', 'angry', 1400); }, 1350);
      }

      updateHpBars();
      if (state.heroHp <= 0) { guardedTimeout(triggerDefeat, 550); return; }
      guardedTimeout(advanceAfterAnswer, 700);
      return;
    }

    var isOptimal = tier === 'optimal' && !hintFullUsed;
    var dmgToBoss = isOptimal ? q.damageIfOptimal : Math.round((hintFullUsed ? q.damageIfCorrect * 0.5 : q.damageIfCorrect));
    // Attack Power stat (Phase 2): scales damage dealt on every landed hit.
    dmgToBoss = Math.round(dmgToBoss * (1 + save.stats.attack + weaponAttackBonus()));
    var preCombo = state.combo;
    var wasOnStreak = state.combo >= 2; // boss was already being hit repeatedly before THIS hit lands
    state.bossHp = Math.max(0, state.bossHp - dmgToBoss);

    if (isOptimal) {
      state.combo = Math.min(3, state.combo === 1 ? 1.5 : state.combo === 1.5 ? 2 : 3);
      spawnCritStamp();
      sudoReact('cheer');
    } else {
      sudoReact('cheer');
      if (hintFullUsed) { state.combo = 1; }
    }
    playSfx(isOptimal ? 'crit' : 'hit');
    if (state.combo > preCombo) playSfx('comboUp');
    else if (state.combo < preCombo) playSfx('comboBreak'); // the hintFullUsed reset-to-1 case
    var coinsEarned = Math.round((isOptimal ? 14 : 8) * state.combo * (hintFullUsed ? 0.4 : 1));
    // Luck stat (Phase 2): a gradually growing coin bonus on every landed hit.
    coinsEarned = Math.round(coinsEarned * (1 + save.stats.luck));
    // Practice Mode: no coin/XP rewards — it's a learning tool, not a way
    // to bypass the normal risk/reward loop (still deals full damage to
    // the boss and still logs the question for the review screen).
    if (save.practiceMode) coinsEarned = 0;
    save.coins += coinsEarned;
    if (!save.practiceMode) awardXp(isOptimal ? 6 : 3);
    state.runCoins += coinsEarned;
    if (state.combo > save.bestCombo) save.bestCombo = state.combo;
    persist();

    spawnDamageNumber('boss', dmgToBoss, isOptimal);
    spawnCoinBurst(coinsEarned);
    shakeArena(isOptimal ? 'lg' : 'sm');
    flashSprite('dgcBossSprite');
    flashHeroAttackPose();
    pulseCombo(true);
    updateTopbar();

    // Hero's face: tier-based happy/excited, UNLESS this hit just crossed the
    // hero into a high-combo streak (x2/x3) — that milestone gets its own
    // required Confident/Smirk beat instead of the usual Excited.
    var comboMilestone = preCombo < 2 && state.combo >= 2;
    flashExpression('hero', comboMilestone ? 'confident' : (isOptimal ? 'excited' : 'happy'), 1200);

    // Boss's face: hurt reaction scaled to tier, with a "surprised" beat
    // inserted first if the player is already mid-streak landing ANOTHER
    // crit — the boss didn't expect back-to-back optimal hits.
    if (isOptimal && wasOnStreak) {
      flashExpression('boss', 'surprised', 500);
      guardedTimeout(function () { flashExpression('boss', 'hurtHeavy', 1100); }, 550);
    } else {
      flashExpression('boss', isOptimal ? 'hurtHeavy' : 'hurtLight', 1200);
    }

    // Sudo: proud-but-smug if the player solved this without touching a
    // hint at all; otherwise the usual happy/excited cheer.
    flashExpression('sudo', !state.hintUsedThisQ ? 'smug' : (isOptimal ? 'excited' : 'happy'), 1300);

    updateHpBars();

    if (state.bossHp <= 0) { guardedTimeout(handlePhaseCleared, 650); return; }
    guardedTimeout(advanceAfterAnswer, 700);
  }

  function advanceAfterAnswer() {
    // Occasionally, once per fight, trigger the boss special attack after phase 1 clears (handled in handlePhaseCleared).
    // Rapid Recon can trigger randomly between questions within phase 2, low probability, once per fight.
    if (!state.reconDone && state.phaseIdx === 1 && Math.random() < 0.18) {
      state.reconDone = true;
      startRapidRecon();
      return;
    }
    nextQuestion();
  }

  /* ============================================================
     PHASE / BOSS PROGRESSION
     ============================================================ */
  function handlePhaseCleared() {
    if (!state.specialAttackDone && state.phaseIdx === 0) {
      state.specialAttackDone = true;
      startSpecialAttack();
      return;
    }
    if (state.phaseIdx < state.boss.phases.length - 1) {
      state.phaseIdx++;
      state.bossHpMax = state.boss.phaseHp[state.phaseIdx];
      state.bossHp = state.bossHpMax;
      resetPoolOrder(); // new phase = a fresh pool = its own fresh shuffle
      updatePhaseTag();
      updateHpBars();
      // Phase-transition face (expression #15 repurposed per the doc's own
      // instruction — e.g. Terminal Golem's Arms→Chest→Core). A powerup
      // flash, then a follow-up beat: "confident" if this transition just
      // opened the FINAL phase (the doc's explicit trigger for Confident),
      // otherwise a plain "determined" readiness beat.
      var enteringFinalPhase = state.phaseIdx === state.boss.phases.length - 1;
      flashExpression('boss', 'powerup', 1400);
      guardedTimeout(function () {
        flashExpression('boss', enteringFinalPhase ? 'confident' : 'determined', 1300);
      }, 1450);
      nextQuestion();
    } else {
      triggerVictory();
    }
  }

  function startSpecialAttack() {
    state.locked = false; // fresh interactable moment, same as renderQuestion()
    // The boss ambushing with a special attack is a genuine shock beat.
    flashExpression('hero', 'surprised', 1400);
    flashExpression('sudo', 'surprised', 1400);
    var sa = state.boss.specialAttack;
    $('dgcPrompt').innerHTML = sa.prompt;
    var fakeQ = { mode: 'build_the_pipeline', steps: sa.steps, prompt: sa.prompt };
    state.currentQuestion = fakeQ;
    var area = $('dgcModeArea');
    area.innerHTML = '';
    state.seqPool = shuffle(sa.steps.map(function (s, i) { return { label: s, origIdx: i }; }));
    state.seqChosen = [];
    renderSpecialSeq();
    $('dgcHintNudge').disabled = true;
    $('dgcHintPartial').disabled = true;
    $('dgcHintFull').disabled = true;
    // Custom timeout handler: a special attack that runs out the clock must
    // resolve through resolveSpecialAttack (using whatever sequence the
    // player had chosen so far), never through the generic resolveAnswer —
    // the generic path expects damageIfCorrect/damageIfOptimal fields that
    // this ad-hoc pipeline question doesn't carry.
    startTimer(40, function () { resolveSpecialAttack(); });

    function renderSpecialSeq() {
      var poolHtml = state.seqPool.map(function (item, i) {
        return '<div class="dgc-seq-chip" data-pool-idx="' + i + '" tabindex="0" role="button">' + escapeHtml(item.label) + '</div>';
      }).join('');
      var chosenHtml = state.seqChosen.map(function (item, i) {
        return '<div class="dgc-seq-chip"><span class="dgc-seq-num">' + (i + 1) + '.</span>' + escapeHtml(item.label) + '</div>';
      }).join('');
      area.innerHTML =
        '<div style="font-size:10.5px;color:var(--dgc-crit-bright);margin-bottom:6px;">⚡ BOSS SPECIAL ATTACK — sequence it correctly to counter!</div>' +
        '<div class="dgc-seq-pool" id="dgcSeqPool">' + (poolHtml || '') + '</div>' +
        '<div class="dgc-seq-chosen" id="dgcSeqChosen">' + (chosenHtml || '<span style="color:var(--dgc-text-dimmer);font-size:10.5px;">(nothing chosen yet)</span>') + '</div>' +
        '<button class="dgc-btn dgc-btn-primary" id="dgcSeqSubmit" ' + (state.seqPool.length ? 'disabled' : '') + '>Submit Sequence</button>';
      // Accessibility (Phase 5, Section 3A) — same keyboard fix as the
      // regular pipeline sequencer above; this ad-hoc special-attack
      // version had its own separate copy of the same mouse-only bug.
      function pickSpecialChip(el) {
        var idx = parseInt(el.getAttribute('data-pool-idx'), 10);
        state.seqChosen.push(state.seqPool[idx]);
        state.seqPool.splice(idx, 1);
        renderSpecialSeq();
      }
      area.querySelectorAll('#dgcSeqPool .dgc-seq-chip').forEach(function (el) {
        el.addEventListener('click', function () { pickSpecialChip(el); });
        el.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pickSpecialChip(el); }
        });
      });
      var submitBtn = $('dgcSeqSubmit');
      if (submitBtn) submitBtn.addEventListener('click', function () { spawnCastProjectile(); playSfx('cast'); resolveSpecialAttack(); });
    }

    function resolveSpecialAttack() {
      if (state.locked) return; // same double-submit guard as resolveAnswer()
      state.locked = true;
      clearInterval(state.timer);
      var tier = validatePipeline(sa, state.seqChosen);
      $('dgcHintNudge').disabled = false;
      $('dgcHintPartial').disabled = false;
      $('dgcHintFull').disabled = false;
      logFightQuestion(fakeQ, tier, false);
      showCloseNote(fakeQ, tier, false);
      if (tier === 'wrong') {
        var saDmg = save.practiceMode ? 0 : sa.damageToHeroIfWrong; // Practice Mode: no HP stakes on the special attack either
        state.heroHp = Math.max(0, state.heroHp - saDmg);
        state.combo = 1;
        spawnDamageNumber('hero', saDmg, false);
        shakeArena('lg'); flashSprite('dgcHeroSprite'); flashHeroDefendPose(); sudoReact('wince');
        playSfx('wrong');
        flashExpression('hero', 'hurtHeavy', 1400);
        flashExpression('boss', 'excited', 1300);
        flashExpression('sudo', 'sympathetic', 1400);
        updateHpBars(); updateTopbar();
        if (state.heroHp <= 0) { guardedTimeout(triggerDefeat, 550); return; }
      } else {
        state.bossHp = Math.max(0, state.bossHp - sa.damageIfCorrect);
        var bonusCoins = 25;
        save.coins += bonusCoins; state.runCoins += bonusCoins; persist();
        spawnDamageNumber('boss', sa.damageIfCorrect, true);
        spawnCritStamp();
        spawnCoinBurst(bonusCoins);
        shakeArena('lg'); flashSprite('dgcBossSprite'); flashHeroAttackPose(); sudoReact('cheer');
        playSfx('crit');
        // Countering the special attack is the hero's biggest power-surge
        // moment so far — stands in for the real Phase-2 level-up trigger
        // until hero tiers/leveling exist.
        flashExpression('hero', 'powerup', 1500);
        flashExpression('boss', 'hurtHeavy', 1300);
        flashExpression('sudo', !state.hintUsedThisQ ? 'smug' : 'excited', 1400);
        updateHpBars(); updateTopbar();
      }
      guardedTimeout(function () {
        if (state.bossHp <= 0) { handlePhaseCleared(); return; }
        state.phaseIdx = 1;
        state.bossHpMax = state.boss.phaseHp[1];
        if (state.bossHp > state.bossHpMax) state.bossHp = state.bossHpMax;
        resetPoolOrder(); // new phase = a fresh pool = its own fresh shuffle
        updatePhaseTag();
        nextQuestion();
      }, 700);
    }
  }

  /* ============================================================
     RAPID RECON — burst sub-event
     ============================================================ */
  function startRapidRecon() {
    clearInterval(state.timer);
    // Doc's own named example trigger for Surprised/Shocked.
    flashExpression('hero', 'surprised', 1400);
    flashExpression('sudo', 'surprised', 1400);
    var overlay = $('dgcReconOverlay');
    overlay.hidden = false;
    var burst = shuffle(RAPID_RECON_POOL).slice(0, 5);
    var idx = 0, correctCount = 0;
    runOne();

    function runOne() {
      if (idx >= burst.length) { finish(); return; }
      var sq = burst[idx];
      overlay.innerHTML =
        '<div class="dgc-recon-title">⚡ RAPID RECON ⚡</div>' +
        '<div class="dgc-recon-sub">Fast one-liners — no hints. Go!</div>' +
        '<div class="dgc-recon-progress">Question ' + (idx + 1) + '/' + burst.length + '</div>' +
        '<div class="dgc-prompt" style="max-width:420px;">' + escapeHtml(sq.prompt) + '</div>' +
        '<div class="dgc-terminal" style="max-width:360px;">' +
          '<span class="dgc-terminal-prompt">$</span>' +
          '<input type="text" class="dgc-terminal-input" id="dgcReconInput" autocomplete="off" spellcheck="false">' +
          '<button class="dgc-btn dgc-terminal-submit" id="dgcReconSubmit">⏎</button>' +
        '</div>';
      var input = $('dgcReconInput');
      var btn = $('dgcReconSubmit');
      var t = setTimeout(function () { submit(); }, 8000);
      function submit() {
        clearTimeout(t);
        var ok = testPatterns(sq.patterns, input.value);
        if (ok) correctCount++;
        idx++;
        runOne();
      }
      btn.addEventListener('click', submit);
      input.addEventListener('keydown', function (e) { if (e.key === 'Enter') submit(); });
      input.focus();
    }

    function finish() {
      var perfect = correctCount === burst.length;
      var bonus = correctCount * 5 + (perfect ? 30 : 0);
      save.coins += bonus; state.runCoins += bonus; persist();
      overlay.innerHTML =
        '<div class="dgc-recon-title">' + (perfect ? '🌟 PERFECT RECON!' : 'Recon complete') + '</div>' +
        '<div class="dgc-recon-sub">' + correctCount + '/' + burst.length + ' correct — +' + bonus + ' bonus coins</div>';
      updateTopbar();
      guardedTimeout(function () { overlay.hidden = true; nextQuestion(); }, 1400);
    }
  }

  /* ============================================================
     HINT SYSTEM
     ============================================================ */
  function useHint(tier) {
    var q = state.currentQuestion;
    if (!q) return;
    var cost = tier === 'nudge' ? 5 : tier === 'partial' ? 15 : 30;
    if (save.coins < cost) {
      flashHintDisplay('Not enough coins for that hint.');
      return;
    }
    save.coins -= cost;
    persist();
    updateTopbar();
    playSfx('hint');
    state.hintUsedThisQ = true; // any hint tier disqualifies Sudo's "smug" for this question
    var text = tier === 'nudge' ? q.hintNudge : tier === 'partial' ? q.hintPartial : q.hintFull;
    // Sudo's own two-beat reaction: briefly "thinking" it over (the doc's
    // "hint menu opened, before tier chosen" moment), then settling into
    // "sympathetic" once the actual suggestion lands.
    flashExpression('sudo', 'thinking', 650);
    guardedTimeout(function () { flashExpression('sudo', 'sympathetic', 1300); }, 700);
    flashHintDisplay(text);
    if (tier === 'full') {
      state.hintFullUsedThisQ = true;
      $('dgcHintNudge').disabled = true;
      $('dgcHintPartial').disabled = true;
      $('dgcHintFull').disabled = true;
      // Full-hint-reveal frustration — the hero's own Angry/Enraged trigger.
      flashExpression('hero', 'angry', 1600);
    }
  }
  function flashHintDisplay(text) {
    var el = $('dgcHintDisplay');
    el.hidden = false;
    el.textContent = text;
  }

  /* ============================================================
     VISUAL FX
     ============================================================ */
  function spawnDamageNumber(who, amount, crit) {
    var layer = $('dgcFxLayer');
    var el = document.createElement('div');
    el.className = 'dgc-dmg-num ' + (who === 'hero' ? 'dgc-dmg-hero' : 'dgc-dmg-boss') + (crit ? ' dgc-dmg-crit' : '');
    el.textContent = '-' + amount;
    el.style.left = who === 'hero' ? (18 + rand(-4, 4)) + '%' : '';
    el.style.right = who === 'boss' ? (18 + rand(-4, 4)) + '%' : '';
    layer.appendChild(el);
    setTimeout(function () { el.remove(); }, 1050);
  }

  function spawnCritStamp() {
    var layer = $('dgcFxLayer');
    var el = document.createElement('div');
    el.className = 'dgc-crit-stamp';
    el.textContent = 'CRITICAL!';
    layer.appendChild(el);
    setTimeout(function () { el.remove(); }, 750);
  }

  // Shared by every coin reward moment (in-fight bursts AND the starter-
  // coins toast) so "the same coin-burst treatment" is literal code reuse,
  // not just a visually-similar copy.
  function spawnCoinParticles(container, amount) {
    if (!container) return;
    var count = Math.min(10, Math.max(2, Math.round(amount / 8)));
    for (var i = 0; i < count; i++) {
      (function (i) {
        var el = document.createElement('div');
        el.className = 'dgc-coin';
        el.textContent = '🪙';
        el.style.left = (46 + rand(-8, 8)) + '%';
        el.style.top = '46%';
        el.style.setProperty('--dgc-cx', rand(-30, 120) + 'px');
        el.style.setProperty('--dgc-cy', rand(-140, -90) + 'px');
        el.style.animationDelay = (i * 0.05) + 's';
        container.appendChild(el);
        setTimeout(function () { el.remove(); }, 1000 + i * 50);
      })(i);
    }
  }
  function spawnCoinBurst(amount) {
    playSfx('coin');
    spawnCoinParticles($('dgcFxLayer'), amount);
  }

  function shakeArena(size) {
    var arena = $('dgcArena');
    arena.classList.remove('dgc-shake-sm', 'dgc-shake-md', 'dgc-shake-lg');
    void arena.offsetWidth;
    arena.classList.add('dgc-shake-' + size);
  }

  function flashSprite(id) {
    var el = $(id);
    el.classList.remove('dgc-hit-flash');
    void el.offsetWidth;
    el.classList.add('dgc-hit-flash');
  }

  // Hero action poses — fired at the exact same moment as the existing
  // hit-flash/damage-number FX, so the hero visibly IS the one performing
  // the action rather than standing still while numbers appear.
  function flashHeroAttackPose() {
    var el = $('dgcHeroSprite');
    if (!el) return;
    el.classList.remove('dgc-chibi-attacking');
    void el.offsetWidth;
    el.classList.add('dgc-chibi-attacking');
    setTimeout(function () { el.classList.remove('dgc-chibi-attacking'); }, 420);
  }
  function flashHeroDefendPose() {
    var el = $('dgcHeroSprite');
    if (!el) return;
    el.classList.remove('dgc-chibi-defending');
    void el.offsetWidth;
    el.classList.add('dgc-chibi-defending');
    setTimeout(function () { el.classList.remove('dgc-chibi-defending'); }, 470);
  }

  function pulseCombo(good) {
    var el = $('dgcCombo');
    el.classList.remove('dgc-combo-pulse', 'dgc-combo-break');
    void el.offsetWidth;
    el.classList.add(good ? 'dgc-combo-pulse' : 'dgc-combo-break');
  }

  function sudoReact(kind) {
    var el = $('dgcSudo');
    el.classList.remove('dgc-sudo-cheer', 'dgc-sudo-wince', 'dgc-sudo-hide');
    var bubble = $('dgcSudoBubble');
    var lines = { cheer: ['nice!', 'clean hit!', 'that\'s it!'], wince: ['ouch...', 'ooh, rough.', 'shake it off.'] };
    if (kind === 'cheer' || kind === 'wince') {
      el.classList.add(kind === 'cheer' ? 'dgc-sudo-cheer' : 'dgc-sudo-wince');
      bubble.textContent = pick(lines[kind]);
      bubble.classList.add('dgc-show');
      setTimeout(function () { bubble.classList.remove('dgc-show'); }, 1200);
    }
  }

  /* ============================================================
     VICTORY / DEFEAT
     ============================================================ */
  /* ============================================================
     END-OF-FIGHT REVIEW SCREEN — "mission debrief". Shown by default
     right when a fight ends (win or lose), before the victory/defeat
     screen; a plain honest record of the fight, quickly dismissable via
     Continue. Distinct from (simpler than) the full Phase-5 debrief.
     ============================================================ */
  function renderReviewScreen(outcome) {
    $('dgcReviewTitle').textContent = outcome === 'victory' ? '📋 MISSION DEBRIEF — VICTORY' : '📋 MISSION DEBRIEF — DEFEAT';
    var list = $('dgcReviewList');
    var log = state.fightLog;
    if (!log || !log.length) {
      list.innerHTML = '<div class="dgc-review-empty">No questions recorded this fight.</div>';
      return;
    }
    var tagText = { wrong: '✗ WRONG', correct: '✓ CORRECT', optimal: '★ OPTIMAL' };
    list.innerHTML = log.map(function (entry, i) {
      return '<div class="dgc-review-row">' +
        '<div class="dgc-review-row-top">' +
          '<span class="dgc-review-num">Q' + (i + 1) + '</span>' +
          '<span class="dgc-review-tag dgc-review-tag-' + entry.tier + '">' + tagText[entry.tier] + '</span>' +
        '</div>' +
        '<div class="dgc-review-prompt">' + entry.prompt + '</div>' +
        '<div class="dgc-review-answer"><strong>You:</strong> ' + escapeHtml(entry.userAnswer) + '</div>' +
        '<div class="dgc-review-ideal"><strong>Ideal:</strong> ' + escapeHtml(entry.ideal) + '</div>' +
        '<div class="dgc-review-note">' + escapeHtml(entry.note) + '</div>' +
      '</div>';
    }).join('');
  }

  var pendingPostReviewScreen = null;
  function showReviewThenScreen(nextScreenName) {
    pendingPostReviewScreen = nextScreenName;
    renderReviewScreen(nextScreenName);
    showScreen('review');
  }

  function triggerVictory() {
    flashSprite('dgcBossSprite');
    playSfx('victory');
    // Fight-end payoff faces — bigger/distinct from the in-combat happy/excited.
    // Locked (not flashed): the killing blow itself may have just scheduled
    // its own reaction's revert timer, which must not overwrite this pose.
    lockExpression('hero', 'victorious');
    lockExpression('boss', 'defeated');
    lockExpression('sudo', 'victorious');
    var sprite = $('dgcBossSprite');
    guardedTimeout(function () {
      sprite.classList.add('dgc-dissolve');
      shakeArena('lg');
    }, 200);
    guardedTimeout(function () {
      if (state.levelIdx !== null && state.levelIdx !== undefined) {
        // Remediation doc, Section 1 — track per-level progress. Until every
        // level of a boss is authored, "boss cleared" (which gates the
        // Final Boss unlock) means "cleared the highest level that
        // currently HAS real content", not literally level 5 — this keeps
        // progression sane while levels 2-5 are authored in later batches,
        // and the bar raises itself automatically as each batch lands.
        if (!save.bossLevelProgress) save.bossLevelProgress = {};
        var prevBest = save.bossLevelProgress[state.bossId] || 0;
        if (state.levelIdx + 1 > prevBest) save.bossLevelProgress[state.bossId] = state.levelIdx + 1;
        var authoredLevels = BOSSES[state.bossId].levels.filter(function (lv) { return lv.questions.length > 0; }).length;
        if (state.levelIdx + 1 >= authoredLevels && save.bossesDefeated.indexOf(state.bossId) === -1) {
          save.bossesDefeated.push(state.bossId);
        }
      } else if (save.bossesDefeated.indexOf(state.bossId) === -1) {
        save.bossesDefeated.push(state.bossId);
      }
      if (!save.practiceMode) awardXp(state.boss.xpReward); // Practice Mode: no victory XP bonus either
      if (state.runCoins > save.highScore) save.highScore = state.runCoins;
      // Phase 5, Section 3 — Leaderboard's dedicated Final Boss entry,
      // tracked separately from the general cross-boss highScore above.
      if (state.isFinalBoss && state.runCoins > save.bestFinalBossScore) save.bestFinalBossScore = state.runCoins;
      persist();

      $('dgcVictoryBossName').textContent = state.boss.name + ' — Cleared!';
      $('dgcVictoryCoins').textContent = state.runCoins;
      $('dgcVictoryXp').textContent = state.boss.xpReward;
      $('dgcVictoryCombo').textContent = save.bestCombo;
      showReviewThenScreen('victory');
    }, 1100);
  }

  function triggerDefeat() {
    var sprite = $('dgcHeroSprite');
    sprite.classList.add('dgc-knockdown');
    playSfx('defeat');
    lockExpression('hero', 'defeated');
    lockExpression('boss', 'victorious');
    lockExpression('sudo', 'defeated');
    guardedTimeout(function () {
      showReviewThenScreen('defeat');
    }, 500);
  }

  function retryPhase() {
    state.heroHp = state.heroHpMax;
    state.bossHp = state.bossHpMax;
    state.heroLowHpAlertShown = false;
    state.fightStartTime = Date.now(); // resets the pacing-based "tired" clock for the retry
    state.bossEnraged = false;
    $('dgcHeroSprite').className = 'dgc-sprite';
    $('dgcBossSprite').className = 'dgc-sprite';
    Object.keys(exprTimers).forEach(function (k) { clearTimeout(exprTimers[k]); });
    exprTimers = {}; transientUntil = {}; baseExprCache = {};
    setExpression($('dgcHeroSprite'), 'determined');
    setExpression($('dgcBossSprite'), 'idle');
    setExpression($('dgcSudoSprite'), 'idle');
    baseExprCache = { hero: 'determined', boss: 'idle', sudo: 'idle' };
    updateHpBars();
    updateTopbar();
    showScreen('combat');
    nextQuestion();
  }

  /* ============================================================
     PHASE 2 — LEVEL-UP SEQUENCE PLAYBACK. Triggered right before
     returning to the start/menu screen after a fight ends (retreat,
     victory-continue, or defeat-quit) — "typically right after a victory
     screen" per the doc, but checked on every exit from a fight since
     per-question XP can in principle cross a threshold even in a loss.
     Queued entries play back-to-back so a big XP payout never overlaps.
     ============================================================ */
  function goToStartScreen() {
    if (pendingLevelUps.length > 0) {
      playPendingLevelUps(function () { refreshStartScreen(); showScreen('start'); maybeTriggerOutageEvent(); });
    } else {
      refreshStartScreen();
      showScreen('start');
      maybeTriggerOutageEvent();
    }
  }

  /* ============================================================
     RANDOM OUTAGE EVENTS — a standalone flow (not the combat state
     machine, since there's no boss/hero HP at stake) that occasionally
     pops up right when returning to the menu after a fight. Pulls a
     real read_the_room incident from any ALREADY-CLEARED boss's pool —
     no new content authored, per the doc's own instruction.
     ============================================================ */
  var outageState = null;
  function eligibleOutageQuestions() {
    var pool = [];
    save.bossesDefeated.forEach(function (id) {
      var boss = BOSSES[id];
      if (!boss) return;
      boss.phases.forEach(function (phase) {
        phase.forEach(function (q) { if (q.mode === 'read_the_room') pool.push(q); });
      });
    });
    return pool;
  }
  function maybeTriggerOutageEvent() {
    if (outageState) return; // one at a time
    if (Math.random() > 0.15) return; // a modest, occasional chance — never a nag
    var pool = eligibleOutageQuestions();
    if (!pool.length) return; // need at least one cleared boss's incident content to draw from
    showOutageEvent(pool[Math.floor(Math.random() * pool.length)]);
  }
  function showOutageEvent(q) {
    outageState = { q: q, step: 'diagnose', timeLeft: 25 };
    var overlay = $('dgcOutageOverlay');
    overlay.hidden = false;
    playSfx('enrage'); // reuses the existing tense/urgent cue — no new sound needed
    $('dgcOutageResultText').hidden = true;
    $('dgcOutageSkipBtn').onclick = function () { clearInterval(outageState.timer); closeOutageEvent(); };
    renderOutageStep();
    startOutageTimer();
  }
  function renderOutageStep() {
    var q = outageState.q;
    var outHtml = q.outputBlock.map(function (l) { return escapeHtml(l); }).join('\n');
    var area = $('dgcOutageArea');
    if (outageState.step === 'diagnose') {
      area.innerHTML =
        '<div class="dgc-outputblock"><pre>' + outHtml + '</pre></div>' +
        '<div class="dgc-terminal"><span class="dgc-terminal-prompt">diagnosis:</span>' +
        '<input type="text" class="dgc-terminal-input" id="dgcOutageInput" autocomplete="off" spellcheck="false" placeholder="what\'s wrong here?">' +
        '<button class="dgc-btn dgc-terminal-submit" id="dgcOutageSubmit">Enter ⏎</button></div>';
    } else {
      area.innerHTML =
        '<div class="dgc-outputblock"><pre>' + outHtml + '</pre></div>' +
        '<div style="color:var(--dgc-success);font-size:11px;margin-bottom:8px;">✓ Diagnosis confirmed. ' + escapeHtml(q.followUpFix.prompt) + '</div>' +
        '<div class="dgc-terminal"><span class="dgc-terminal-prompt">fix:</span>' +
        '<input type="text" class="dgc-terminal-input" id="dgcOutageInput" autocomplete="off" spellcheck="false">' +
        '<button class="dgc-btn dgc-terminal-submit" id="dgcOutageSubmit">Enter ⏎</button></div>';
    }
    var input = $('dgcOutageInput');
    var btn = $('dgcOutageSubmit');
    function submit() {
      var val = input.value;
      if (outageState.step === 'diagnose') {
        if (testPatterns(q.acceptableDiagnosesPatterns, val)) {
          outageState.step = 'fix';
          renderOutageStep();
        } else {
          resolveOutageEvent(false, false, false);
        }
      } else {
        var optimal = testPatterns(q.followUpFix.optimalPatterns, val);
        var correct = optimal || testPatterns(q.followUpFix.acceptablePatterns, val);
        resolveOutageEvent(true, correct, optimal);
      }
    }
    btn.addEventListener('click', submit);
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') submit(); });
    input.focus();
  }
  function startOutageTimer() {
    var fill = $('dgcOutageTimerFill');
    fill.style.transition = 'none';
    fill.style.width = '100%';
    void fill.offsetWidth;
    fill.style.transition = 'width 1s linear';
    outageState.timer = setInterval(function () {
      outageState.timeLeft--;
      fill.style.width = Math.max(0, outageState.timeLeft / 25 * 100) + '%';
      if (outageState.timeLeft <= 0) {
        clearInterval(outageState.timer);
        resolveOutageEvent(false, false, false);
      }
    }, 1000);
  }
  function resolveOutageEvent(diagnosedRight, fixedRight, optimal) {
    clearInterval(outageState.timer);
    var bonus = 0, msg = '';
    if (diagnosedRight && fixedRight) {
      bonus = optimal ? 90 : 65;
      msg = optimal ? 'Nailed it — full bonus!' : 'Handled it — solid bonus.';
    } else if (diagnosedRight) {
      bonus = 25;
      msg = 'Diagnosed it right, but the fix didn\'t land. Partial bonus.';
    } else {
      msg = 'Missed it this time — no bonus, better luck next outage.';
    }
    if (bonus > 0) {
      save.coins += bonus;
      persist();
      playSfx('coin');
      spawnCoinParticles($('dgcOutageBurst'), bonus);
    }
    $('dgcOutageResultText').textContent = msg + (bonus ? ' +' + bonus + ' coins' : '');
    $('dgcOutageResultText').hidden = false;
    setTimeout(closeOutageEvent, 1800);
  }
  function closeOutageEvent() {
    $('dgcOutageOverlay').hidden = true;
    $('dgcOutageResultText').hidden = true;
    outageState = null;
    refreshStartScreen(); // reflect the updated coin total
  }

  function playPendingLevelUps(onDone) {
    var overlay = $('dgcLevelUpOverlay');
    if (!overlay) { pendingLevelUps.length = 0; onDone(); return; }
    overlay.hidden = false;
    playSfx('levelup');

    function playNext() {
      if (!pendingLevelUps.length) {
        overlay.hidden = true;
        onDone();
        return;
      }
      var entry = pendingLevelUps.shift();
      renderOneLevelUp(entry);
      if (entry.tierChanged) {
        refreshHeroTierVisuals(); // title/select sprites pick up the new tier immediately
        playSfx('tierUp');
      }
      setTimeout(playNext, entry.tierChanged ? 2600 : 1900);
    }
    playNext();
  }

  function renderOneLevelUp(entry) {
    var sprite = $('dgcLevelUpHeroSprite');
    sprite.innerHTML = chibiRoot('hero'); // fresh render — reflects the new tier if this entry changed it
    setExpression(sprite, 'powerup');
    $('dgcLevelUpLevelText').textContent = 'LEVEL ' + entry.level;
    var parts = [];
    if (entry.statDeltas.hp > 0) parts.push('+' + entry.statDeltas.hp + ' HP');
    if (entry.statDeltas.attack > 0) parts.push('+' + Math.round(entry.statDeltas.attack * 100) + '% ATK');
    if (entry.statDeltas.focus > 0) parts.push('+' + entry.statDeltas.focus.toFixed(1) + 's Focus');
    if (entry.statDeltas.luck > 0) parts.push('+' + Math.round(entry.statDeltas.luck * 100) + '% Luck');
    $('dgcLevelUpStatsText').textContent = parts.join('   ');
    var tierEl = $('dgcLevelUpTierText');
    if (entry.tierChanged) {
      tierEl.hidden = false;
      tierEl.textContent = '✦ NEW TIER: ' + entry.tierName + ' ✦';
    } else {
      tierEl.hidden = true;
    }
    var banner = $('dgcLevelUpBanner');
    banner.classList.remove('dgc-levelup-pop');
    void banner.offsetWidth;
    banner.classList.add('dgc-levelup-pop');
  }

  /* ============================================================
     WIRE UP STATIC BUTTONS
     ============================================================ */
  $('dgcBossSelectGrid').addEventListener('click', function (e) {
    var levelBtn = e.target.closest('[data-select-level-boss-id]');
    if (levelBtn && !levelBtn.disabled) {
      renderLevelSelect(levelBtn.getAttribute('data-select-level-boss-id'));
      openModal('dgcLevelSelectModal');
      return;
    }
    var btn = e.target.closest('[data-fight-boss-id]');
    if (!btn || btn.disabled) return;
    startFight(btn.getAttribute('data-fight-boss-id'));
  });
  // Level-select tiles live inside a modal, so they need their own
  // delegated handler (the boss-select grid's own listener above never
  // sees clicks inside the modal — separate subtree).
  $('dgcLevelSelectBody').addEventListener('click', function (e) {
    var btn = e.target.closest('[data-fight-boss-id]');
    if (!btn || btn.disabled) return;
    closeModals();
    startFight(btn.getAttribute('data-fight-boss-id'), parseInt(btn.getAttribute('data-fight-level-idx'), 10));
  });
  $('dgcQuitBtn').addEventListener('click', function () {
    clearInterval(state && state.timer);
    goToStartScreen();
  });
  // Phase 4: victory's primary Continue now routes to the City (the
  // natural moment to spend what was just earned) instead of straight
  // back to Boss Select; a secondary link skips that for players who
  // just want to keep fighting. Defeat's flow is intentionally untouched
  // — no added friction after a loss.
  $('dgcVictoryContinueBtn').addEventListener('click', goToCityScreen);
  $('dgcVictorySkipCityBtn').addEventListener('click', goToStartScreen);
  $('dgcReviewContinueBtn').addEventListener('click', function () {
    showScreen(pendingPostReviewScreen || 'start');
  });
  $('dgcRetryBtn').addEventListener('click', retryPhase);
  $('dgcDefeatQuitBtn').addEventListener('click', goToStartScreen);
  $('dgcHintNudge').addEventListener('click', function () { useHint('nudge'); });
  $('dgcHintPartial').addEventListener('click', function () { useHint('partial'); });
  $('dgcHintFull').addEventListener('click', function () { useHint('full'); });

  /* ---- Title screen menu ---- */
  $('dgcMenuStart').addEventListener('click', function () {
    refreshStartScreen();
    showScreen('start');
  });
  $('dgcMenuNewGame').addEventListener('click', function () {
    showConfirm(
      '⚠ START A NEW GAME?',
      'This wipes your coins, XP, cleared bosses, and best combo — permanently. This cannot be undone.',
      function () { resetAllProgress(); }
    );
  });
  $('dgcMenuHowToPlay').addEventListener('click', function () { openModal('dgcHowToPlayModal'); });
  $('dgcMenuSettings').addEventListener('click', function () { applySoundToggleUI(); openModal('dgcSettingsModal'); });
  $('dgcMenuTrophy').addEventListener('click', function () { renderTrophyHall(); openModal('dgcTrophyModal'); });
  $('dgcMenuDebrief').addEventListener('click', function () { renderDebrief(); openModal('dgcDebriefModal'); });
  $('dgcMenuCity').addEventListener('click', goToCityScreen);
  $('dgcBackToTitleBtn').addEventListener('click', function () {
    refreshTitleScreen();
    showScreen('title');
  });

  /* ---- Phase 4 Section 1B — DevOps City: exploration + buildings ---- */
  $('dgcVisitCityFromSelectBtn').addEventListener('click', goToCityScreen);
  $('dgcCityBackBtn').addEventListener('click', leaveCityToBossSelect);
  // Walking up to a building (the primary interaction) shows the Enter
  // prompt via checkCityBuildingProximity(); clicking/tapping a building
  // directly is kept as an always-available fallback (accessibility,
  // and just faster for anyone who'd rather not walk over).
  $('dgcCityBuildingsLayer').addEventListener('click', function (e) {
    var card = e.target.closest ? e.target.closest('[data-building]') : null;
    if (!card) return;
    enterCityBuilding(card.getAttribute('data-building'));
  });
  $('dgcCityBuildingsLayer').addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var card = e.target.closest ? e.target.closest('[data-building]') : null;
    if (!card) return;
    e.preventDefault();
    enterCityBuilding(card.getAttribute('data-building'));
  });
  $('dgcCityEnterPrompt').addEventListener('click', function () {
    if (cityNearBuildingId) enterCityBuilding(cityNearBuildingId);
  });
  // Living City addendum — same walk-up-or-click pattern as buildings.
  $('dgcCityNpcLayer').addEventListener('click', function (e) {
    var token = e.target.closest ? e.target.closest('[data-npc-id]') : null;
    if (!token) return;
    openNpcDialogue(token.getAttribute('data-npc-id'));
  });
  $('dgcCityTalkPrompt').addEventListener('click', function () {
    if (cityNearNpcId) openNpcDialogue(cityNearNpcId);
  });
  $('dgcDialogueCloseBtn').addEventListener('click', closeNpcDialogue);
  // Movement: arrow keys / WASD, only while the City screen is actually
  // showing and no modal is layered on top of it (avoids scrolling the
  // page on arrow-key presses, and avoids hijacking input elsewhere).
  function cityScreenIsLive() {
    var dialogueBox = $('dgcDialogueBox');
    return !$('dgcCityScreen').hidden && $('dgcModalBackdrop').hidden && (!dialogueBox || dialogueBox.hidden);
  }
  document.addEventListener('keydown', function (e) {
    if (!cityScreenIsLive()) return;
    var k = e.key.toLowerCase();
    if (k === 'arrowup' || k === 'w') { cityKeys.up = true; e.preventDefault(); }
    else if (k === 'arrowdown' || k === 's') { cityKeys.down = true; e.preventDefault(); }
    else if (k === 'arrowleft' || k === 'a') { cityKeys.left = true; e.preventDefault(); }
    else if (k === 'arrowright' || k === 'd') { cityKeys.right = true; e.preventDefault(); }
    else if (e.key === 'Shift') { cityKeys.run = true; }
    else if (k === 'enter' || k === ' ') {
      // Swallow the event so the dialogue-close handler registered later on
      // `document` cannot see this same keydown and close the box it opens.
      if (cityNearBuildingId || cityNearNpcId) {
        e.preventDefault();
        e.stopImmediatePropagation();
        if (e.repeat) return;
        if (cityNearBuildingId) enterCityBuilding(cityNearBuildingId);
        else openNpcDialogue(cityNearNpcId);
      }
    }
  });
  document.addEventListener('keyup', function (e) {
    var k = e.key.toLowerCase();
    if (k === 'arrowup' || k === 'w') cityKeys.up = false;
    else if (k === 'arrowdown' || k === 's') cityKeys.down = false;
    else if (k === 'arrowleft' || k === 'a') cityKeys.left = false;
    else if (k === 'arrowright' || k === 'd') cityKeys.right = false;
    else if (e.key === 'Shift') cityKeys.run = false;
  });
  // On-screen d-pad (shown on coarse/touch pointers via CSS) drives the
  // exact same cityKeys state the keyboard path uses — one movement
  // implementation, two input methods.
  ['up', 'down', 'left', 'right'].forEach(function (dir) {
    var btn = document.querySelector('.dgc-city-dpad-btn[data-dir="' + dir + '"]');
    if (!btn) return;
    var press = function (e) { e.preventDefault(); cityKeys[dir] = true; };
    var release = function () { cityKeys[dir] = false; };
    btn.addEventListener('pointerdown', press);
    btn.addEventListener('pointerup', release);
    btn.addEventListener('pointerleave', release);
    btn.addEventListener('pointercancel', release);
  });
  $('dgcArmoryList').addEventListener('click', function (e) {
    var btn = e.target.closest ? e.target.closest('[data-weapon-action]') : null;
    if (!btn) return;
    var id = btn.getAttribute('data-weapon-id');
    if (btn.getAttribute('data-weapon-action') === 'buy') buyWeapon(id); else equipWeapon(id);
  });
  $('dgcTailorList').addEventListener('click', function (e) {
    var btn = e.target.closest ? e.target.closest('[data-outfit-action]') : null;
    if (!btn) return;
    var id = btn.getAttribute('data-outfit-id');
    if (btn.getAttribute('data-outfit-action') === 'buy') buyOutfit(id); else equipOutfit(id);
  });
  // Section 1C — one delegated handler covers all 3 generic customization
  // slots (hair/shoes/accessory), keyed by data-slot-key.
  ['dgcHairList', 'dgcShoesList', 'dgcAccessoryList'].forEach(function (containerId) {
    $(containerId).addEventListener('click', function (e) {
      var btn = e.target.closest ? e.target.closest('[data-slot-action]') : null;
      if (!btn) return;
      var key = btn.getAttribute('data-slot-key');
      var id = btn.getAttribute('data-slot-id');
      if (btn.getAttribute('data-slot-action') === 'buy') buyCustomSlotItem(key, id); else equipCustomSlotItem(key, id);
    });
  });
  $('dgcLibraryList').addEventListener('click', function (e) {
    var btn = e.target.closest ? e.target.closest('[data-library-action]') : null;
    if (!btn) return;
    buyLibraryPack(btn.getAttribute('data-library-boss-id'));
  });
  $('dgcBankInvestBtn').addEventListener('click', investInBank);
  $('dgcBankCollectBtn').addEventListener('click', function () { collectBankTrickle(false); });
  $('dgcGeneralStoreList').addEventListener('click', function (e) {
    var btn = e.target.closest ? e.target.closest('[data-decor-action]') : null;
    if (!btn) return;
    var id = btn.getAttribute('data-decor-id');
    if (btn.getAttribute('data-decor-action') === 'buy') buyDecoration(id); else startPlacingDecoration(id);
  });
  // Placement mode: clicking the viewport while an item is selected drops
  // it at that world-space point; clicking an already-placed decoration
  // OUTSIDE placement mode picks it up (the "move" mechanic — pick up,
  // then place again elsewhere).
  $('dgcCityViewport').addEventListener('click', function (e) {
    // Don't let a building/enter-prompt click (handled by their own
    // listeners) also register as a world-tile placement/pickup click.
    if (e.target.closest && (e.target.closest('[data-building]') || e.target.closest('#dgcCityEnterPrompt'))) return;
    if (cityPlacingDecorId) {
      var vpRect = $('dgcCityViewport').getBoundingClientRect();
      var worldStyle = getComputedStyle($('dgcCityWorld')).transform; // matrix(1,0,0,1,-camX,-camY)
      var camX = 0, camY = 0;
      var m = worldStyle.match(/matrix\(([^)]+)\)/);
      if (m) { var parts = m[1].split(',').map(parseFloat); camX = -parts[4]; camY = -parts[5]; }
      var worldX = Math.round(e.clientX - vpRect.left + camX);
      var worldY = Math.round(e.clientY - vpRect.top + camY);
      placeDecorationAt(worldX, worldY);
      return;
    }
    var decorEl = e.target.closest ? e.target.closest('[data-decor-instance]') : null;
    if (decorEl) pickUpDecoration(decorEl.getAttribute('data-decor-instance'));
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && cityPlacingDecorId) cancelPlacingDecoration();
  });
  // Living City addendum — Escape or Enter both close an open dialogue,
  // matching the classic RPG-dialogue-box convention.
  document.addEventListener('keydown', function (e) {
    var dialogueBox = $('dgcDialogueBox');
    if (!dialogueBox || dialogueBox.hidden) return;
    if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') { e.preventDefault(); closeNpcDialogue(); }
  });

  /* ---- Modals ---- */
  document.querySelectorAll('[data-close-modal]').forEach(function (el) {
    el.addEventListener('click', closeModals);
  });
  $('dgcModalBackdrop').addEventListener('click', function (e) {
    if (e.target === $('dgcModalBackdrop')) closeModals(); // click outside the modal card itself
  });
  $('dgcConfirmCancel').addEventListener('click', closeModals);
  $('dgcSoundToggle').addEventListener('click', function () {
    soundEnabled = !soundEnabled;
    persistSoundSetting();
    applySoundToggleUI();
    if (soundEnabled) playSfx('click'); // immediate confirmation that sound just turned on
  });
  $('dgcVolumeSlider').addEventListener('input', function (e) {
    masterVolume = Math.max(0, Math.min(100, +e.target.value)) / 100;
    e.target.style.setProperty('--dgc-vol-pct', e.target.value + '%');
    persistSoundSetting();
  });
  $('dgcVolumeSlider').addEventListener('change', function () { playSfx('click'); }); // preview the new level once released
  $('dgcSettingsResetBtn').addEventListener('click', function () {
    showConfirm(
      '⚠ RESET ALL PROGRESS?',
      'This wipes your coins, XP, cleared bosses, and best combo — permanently. This cannot be undone.',
      function () { closeModals(); resetAllProgress(); }
    );
  });
  $('dgcSettingsChangeCharBtn').addEventListener('click', function () {
    closeModals();
    showCharacterSelectScreen(true);
  });
  /* ---- Phase 5, Section 3A — Practice Mode toggle (same UI pattern as the sound toggle) ---- */
  function applyPracticeModeToggleUI() {
    var t = $('dgcPracticeModeToggle');
    if (t) t.setAttribute('data-on', save.practiceMode ? 'true' : 'false');
  }
  $('dgcPracticeModeToggle').addEventListener('click', function () {
    save.practiceMode = !save.practiceMode;
    persist();
    applyPracticeModeToggleUI();
    playSfx('click');
  });
  applyPracticeModeToggleUI();

  /* ============================================================
     Phase 5, Section 3A — Save Export/Import. Everything lives only in
     localStorage; this is a manual, no-backend way for a player to back
     up real progress before clearing browser data or switching devices,
     and to restore it afterward. Plain file download/upload — no server.
     ============================================================ */
  $('dgcSettingsExportBtn').addEventListener('click', function () {
    var blob = new Blob([JSON.stringify(save, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    var stamp = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = 'devops-terminal-combat-save-' + stamp + '.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    playSfx('click');
  });
  $('dgcSettingsImportBtn').addEventListener('click', function () {
    $('dgcSettingsImportFile').click();
  });
  $('dgcSettingsImportFile').addEventListener('change', function (e) {
    var file = e.target.files && e.target.files[0];
    e.target.value = ''; // always reset so re-selecting the SAME file still fires 'change' next time
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      var parsed;
      try { parsed = JSON.parse(reader.result); } catch (err) {
        showConfirm('⚠ INVALID SAVE FILE', 'That file isn\'t a valid save export (couldn\'t be parsed as JSON). Nothing was changed.', function () {});
        return;
      }
      // Light sanity check — a real export always has these; a random/
      // corrupt JSON file almost certainly won't, and importing it blind
      // would silently break the game rather than just failing to load.
      var looksLikeSave = parsed && typeof parsed === 'object'
        && typeof parsed.coins === 'number' && typeof parsed.level === 'number' && Array.isArray(parsed.bossesDefeated);
      if (!looksLikeSave) {
        showConfirm('⚠ INVALID SAVE FILE', 'That file doesn\'t look like a DevOps Terminal Combat save (missing expected fields). Nothing was changed.', function () {});
        return;
      }
      showConfirm(
        '⚠ IMPORT SAVE?',
        'This replaces your CURRENT progress (Level ' + save.level + ', ' + save.coins + ' coins) with the imported save (Level ' + parsed.level + ', ' + parsed.coins + ' coins). This cannot be undone — export your current save first if you want to keep it. Continue?',
        function () {
          try { localStorage.setItem(STORE_KEY, JSON.stringify(parsed)); } catch (err) { /* storage unavailable */ }
          location.reload(); // simplest correct way to re-init every system from the newly-imported save
        }
      );
    };
    reader.readAsText(file);
  });
  $('dgcCharSelectGrid').addEventListener('click', function (e) {
    var btn = e.target.closest ? e.target.closest('[data-choose-character]') : null;
    if (!btn) return;
    chooseCharacter(btn.getAttribute('data-choose-character'));
  });
  $('dgcCharSelectBackBtn').addEventListener('click', function () {
    refreshTitleScreen();
    showScreen('title');
  });

  /* ---- Ambient title-screen particles (cheap DOM-based float effect) ---- */
  function spawnTitleParticles() {
    var layer = $('dgcBgParticles');
    if (!layer) return;
    layer.innerHTML = '';
    var count = 22;
    for (var i = 0; i < count; i++) {
      var p = document.createElement('div');
      p.className = 'dgc-bg-particle';
      var size = rand(2, 4);
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = rand(0, 100) + '%';
      p.style.bottom = '-10px';
      p.style.animationDuration = rand(7, 16) + 's';
      p.style.animationDelay = '-' + rand(0, 16) + 's';
      if (i % 3 === 1) p.style.background = 'var(--dgc-primary)', p.style.boxShadow = '0 0 8px 1px var(--dgc-primary)';
      if (i % 3 === 2) p.style.background = 'var(--dgc-crit)', p.style.boxShadow = '0 0 8px 1px var(--dgc-crit)';
      layer.appendChild(p);
    }
  }

  /* ---- inject the static (non-combat) chibi instances once ---- */
  function initChibis() {
    $('dgcTitleHeroSprite').innerHTML = chibiRoot('hero');
    $('dgcTitleSudoSprite').innerHTML = chibiRoot('sudo');
    $('dgcSelectHeroSprite').innerHTML = chibiRoot('hero');
    setExpression($('dgcTitleHeroSprite'), 'happy');
    setExpression($('dgcTitleSudoSprite'), 'idle');
    setExpression($('dgcSelectHeroSprite'), 'confident');
    // Boss-select's OWN sprites (one per boss card) are injected by
    // renderBossSelectGrid() instead, since there are now many of them.
    refreshHeroNameLabels();
  }

  /* ============================================================
     PHASE 2 — tier changes must apply everywhere the hero is shown, not
     just in-fight. Re-renders every currently-existing hero sprite (title
     + boss-select) with chibiRoot()'s current save.heroTier, restoring
     each location's own baseline expression. Combat's own sprite doesn't
     need this since the level-up sequence only plays after a fight ends.
     ============================================================ */
  function refreshHeroTierVisuals() {
    var titleSprite = $('dgcTitleHeroSprite');
    // Section 3A — the title screen is the one spot that shows each
    // character's own default "personality" expression (Byte confident,
    // Nova happy, Sage neutral) rather than one fixed expression for
    // every hero, per the doc's "personality-through-expression-default"
    // ask. Select/City screens keep their existing fixed defaults.
    if (titleSprite) { titleSprite.innerHTML = chibiRoot('hero'); setExpression(titleSprite, (HERO_CHARACTERS[currentCharacterId()] || HERO_CHARACTERS.byte).menuExpr); }
    var selectSprite = $('dgcSelectHeroSprite');
    if (selectSprite) { selectSprite.innerHTML = chibiRoot('hero'); setExpression(selectSprite, 'confident'); }
    // Phase 4 — the City hub is the one screen designed specifically to
    // show off owned gear, so it goes through this exact same refresh
    // hook (called after every level-up AND every Armory/Tailor equip).
    // Section 3A — the City specifically uses the small overworld sprite,
    // not the full portrait; preserve whatever direction the hero was
    // already facing (cityHero.facing) across the re-render instead of
    // resetting to "down" every time gear changes mid-walk.
    var citySprite = $('dgcCityHeroSprite');
    if (citySprite) {
      citySprite.innerHTML = overworldSpriteSVG('hero');
      var owSprite = citySprite.querySelector('.dgc-overworld-sprite');
      if (owSprite) owSprite.setAttribute('data-facing', overworldFacingGroup((typeof cityHero !== 'undefined' && cityHero.facing) || 'down'));
    }
    var houseSprite = $('dgcHouseHeroSprite');
    if (houseSprite) houseSprite.innerHTML = overworldSpriteSVG('hero');
    refreshHeroNameLabels();
  }

  // The hero's displayed name/tag must say the CURRENT tier's name, not a
  // hardcoded "Junior Dev", everywhere that label appears.
  function refreshHeroNameLabels() {
    var tierName = tierById(save.heroTier).name;
    [ 'dgcTitleHeroTag', 'dgcSelectHeroName', 'dgcCombatHeroName', 'dgcCityHeroName', 'dgcHouseHeroName' ].forEach(function (id) {
      var el = $(id);
      if (el) el.textContent = tierName;
    });
  }

  /* ============================================================
     SECTION 3A — CHARACTER SELECT SCREEN.
     ============================================================ */
  function renderCharacterSelectGrid() {
    var grid = $('dgcCharSelectGrid');
    if (!grid) return;
    grid.innerHTML = HERO_CHARACTER_ORDER.map(function (id) {
      var c = HERO_CHARACTERS[id];
      return '<div class="dgc-charselect-card">' +
        '<div class="dgc-sprite dgc-charselect-sprite" id="dgcCharPreview-' + id + '"></div>' +
        '<div class="dgc-charselect-name">' + c.name + '</div>' +
        '<div class="dgc-charselect-tagline">' + c.tagline + '</div>' +
        '<button class="dgc-btn dgc-btn-primary" data-choose-character="' + id + '">Choose</button>' +
      '</div>';
    }).join('');
    // Render each preview AS that character specifically — temporarily
    // swap save.selectedCharacterId so chibiRoot('hero') (which reads it
    // internally via currentCharacterId()) renders THIS card's character,
    // then restore it. Synchronous, so there's no risk of another read
    // landing mid-swap.
    var actualSelected = save.selectedCharacterId;
    HERO_CHARACTER_ORDER.forEach(function (id) {
      var sprite = $('dgcCharPreview-' + id);
      if (!sprite) return;
      save.selectedCharacterId = id;
      sprite.innerHTML = chibiRoot('hero');
      setExpression(sprite, HERO_CHARACTERS[id].menuExpr);
    });
    save.selectedCharacterId = actualSelected;
  }
  function chooseCharacter(id) {
    if (!HERO_CHARACTERS[id]) return;
    save.selectedCharacterId = id;
    persist();
    playSfx('equip');
    refreshHeroTierVisuals();
    refreshTitleScreen();
    showScreen('title');
  }
  // allowBack: true when reached via Settings -> Change Character (a
  // real choice already exists to return to); false/omitted for the
  // first-time/new-game flow, where there's nothing to go "back" to yet.
  function showCharacterSelectScreen(allowBack) {
    renderCharacterSelectGrid();
    var backBtn = $('dgcCharSelectBackBtn');
    if (backBtn) backBtn.hidden = !allowBack;
    showScreen('characterSelect');
  }

  /* ============================================================
     ENTRY TRANSITION — "crossing the threshold" (Section 5). Clicking the
     Game tab's own nav button must never be an instant swap into the title
     screen. We deliberately do NOT touch that button's existing inline
     onclick="showTab('game',this)" (every other tab must stay untouched) —
     instead we attach an ADDITIONAL listener to the same element, which
     fires right after the site's own tab-switch already made this panel
     visible, and covers it with a boot/portal overlay before letting the
     title screen actually be seen.
     ============================================================ */
  var DGC_BOOT_LINES = [
    '> booting terminal_combat.sys ...',
    '> loading world: DEVOPS ARCHIPELAGO ...',
    '> calibrating golem containment wards ... OK',
    '> sudo daemon: awake, caffeinated, judgmental',
    '> mounting /dev/hero ...',
    '> WARNING: boss signature detected nearby',
    '> entering arena_'
  ];

  function runBootSequence(fast) {
    var overlay = $('dgcBootOverlay');
    var log = $('dgcBootLog');
    var fsPrompt = $('dgcBootFsPrompt');
    if (!overlay || !log) return;
    overlay.hidden = false;
    overlay.classList.remove('dgc-boot-exit');
    playSfx('worldEntry'); // this click (into the Game tab) is the genuine user gesture that unlocks audio
    log.innerHTML = '';
    fsPrompt.hidden = true;
    var lines = fast ? DGC_BOOT_LINES.slice(-2) : DGC_BOOT_LINES;
    var lineDelayMs = fast ? 90 : 220;
    var finished = false;
    function finish() {
      if (finished) return;
      finished = true;
      overlay.classList.add('dgc-boot-exit');
      setTimeout(function () {
        overlay.hidden = true;
        overlay.classList.remove('dgc-boot-exit');
        showStarterCoinsToastIfPending(); // the "crossing the threshold" moment — exactly where a new player should see it
        showStreakToastIfPending(); // never both at once in practice — see checkDailyStreak()'s own comment
      }, 480);
    }
    lines.forEach(function (text, i) {
      var el = document.createElement('div');
      el.className = 'dgc-boot-log-line';
      el.textContent = text;
      el.style.animationDelay = (i * lineDelayMs / 1000) + 's';
      log.appendChild(el);
    });
    $('dgcBootSkip').onclick = finish;
    var totalMs = lines.length * lineDelayMs + (fast ? 250 : 550);
    setTimeout(function () {
      // Offer the fullscreen prompt right at this threshold moment — but
      // only once per session, only on the full (first-visit) sequence, and
      // only if fullscreen is actually available and not already engaged.
      var alreadyAsked = false;
      try { alreadyAsked = !!sessionStorage.getItem('dgc_fs_asked_session'); } catch (e) { alreadyAsked = true; }
      if (!fast && !alreadyAsked && document.fullscreenEnabled && !document.fullscreenElement) {
        try { sessionStorage.setItem('dgc_fs_asked_session', '1'); } catch (e) {}
        fsPrompt.hidden = false;
        $('dgcBootFsYes').onclick = function () { requestGameFullscreen(); finish(); };
        $('dgcBootFsNo').onclick = finish;
      } else {
        finish();
      }
    }, totalMs);
  }

  function wireGameTabEntry() {
    var navBtn = document.querySelector('.tab[onclick*="showTab(\'game\'"]');
    if (!navBtn) return;
    navBtn.addEventListener('click', function () {
      var firstThisSession = true;
      try { firstThisSession = !sessionStorage.getItem('dgc_boot_seen_session'); sessionStorage.setItem('dgc_boot_seen_session', '1'); } catch (e) {}
      runBootSequence(!firstThisSession);
    });
  }

  /* ============================================================
     FULLSCREEN MODE — the real Fullscreen API (requestFullscreen /
     exitFullscreen), not a CSS-only oversized-div fake. Fullscreens the
     game's own root element so browser chrome genuinely disappears.
     ============================================================ */
  function requestGameFullscreen() {
    var root = document.querySelector('#tab-game .dgc-root');
    if (!root) return;
    var req = root.requestFullscreen || root.webkitRequestFullscreen || root.msRequestFullscreen;
    if (!req) return;
    // requestFullscreen() returns a promise that rejects whenever the
    // browser refuses (no genuine user gesture, an embedding permissions
    // policy, the user dismissing a permission prompt, etc.) — swallow
    // that rejection so it never surfaces as an uncaught console error;
    // updateFullscreenUI() (via the fullscreenchange listener) is what
    // actually reflects success/failure in the UI either way.
    try {
      var result = req.call(root);
      if (result && typeof result.catch === 'function') result.catch(function () {});
    } catch (e) { /* some browsers throw synchronously instead of rejecting */ }
  }
  function exitGameFullscreen() {
    var exit = document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen;
    if (exit) exit.call(document);
  }
  function toggleGameFullscreen() {
    playSfx('fullscreen');
    var isFs = !!(document.fullscreenElement || document.webkitFullscreenElement);
    if (isFs) exitGameFullscreen(); else requestGameFullscreen();
  }
  function updateFullscreenUI() {
    var isFs = !!(document.fullscreenElement || document.webkitFullscreenElement);
    var btn = $('dgcFullscreenToggle');
    var icon = $('dgcFullscreenIcon');
    if (btn) { btn.classList.toggle('dgc-fs-active', isFs); btn.title = isFs ? 'Exit fullscreen' : 'Enter fullscreen'; }
    if (icon) icon.textContent = isFs ? '⤫' : '⛶';
    var settingsBtn = $('dgcSettingsFsBtn');
    if (settingsBtn) settingsBtn.textContent = isFs ? '⤫ Exit Fullscreen' : '⛶ Enter Fullscreen';
  }
  function wireFullscreenControls() {
    var toggleBtn = $('dgcFullscreenToggle');
    if (toggleBtn) toggleBtn.addEventListener('click', toggleGameFullscreen);
    var settingsBtn = $('dgcSettingsFsBtn');
    if (settingsBtn) settingsBtn.addEventListener('click', toggleGameFullscreen);
    ['fullscreenchange', 'webkitfullscreenchange', 'MSFullscreenChange'].forEach(function (evt) {
      document.addEventListener(evt, updateFullscreenUI);
    });
    updateFullscreenUI();
  }

  /* ============================================================
     INIT — the title screen is the true first thing a player sees,
     never the fight screen or even the boss-select screen directly.
     ============================================================ */
  grantStarterCoinsIfNeeded(); // data grant happens immediately; the visible toast waits for world-entry
  checkDailyStreak(); // same split: streak/coins update now, toast (if any) waits for world-entry too
  initChibis();
  refreshTitleScreen();
  refreshStartScreen();
  spawnTitleParticles();
  wireGameTabEntry();
  wireFullscreenControls();
  wireTerminalKeyFeedback();
  wireUiSounds();
  applySoundToggleUI();
  // Section 3A — a genuinely fresh save (selectedCharacterId still null)
  // sees the character-select screen first; everyone else goes straight
  // to the title screen exactly as before.
  if (!save.selectedCharacterId) { showCharacterSelectScreen(false); } else { showScreen('title'); }

}
