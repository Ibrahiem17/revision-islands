// Boss table. Key order matters (boss select / progression iterate it), so keep it as listed.
import { terminalGolem } from './terminalGolem.js';
import { kraken } from './kraken.js';
import { hydra } from './hydra.js';
import { orchestrator } from './orchestrator.js';
import { phantom } from './phantom.js';
import { reaper } from './reaper.js';
import { titan } from './titan.js';
import { statekeeper } from './statekeeper.js';
import { wraith } from './wraith.js';
import { pager } from './pager.js';

export var BOSSES = {
  terminalGolem: terminalGolem,
  kraken: kraken,
  hydra: hydra,
  orchestrator: orchestrator,
  phantom: phantom,
  reaper: reaper,
  titan: titan,
  statekeeper: statekeeper,
  wraith: wraith,
  pager: pager
};
