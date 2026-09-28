// Rapid-recon question pool and the Final Boss closing STAR question.

export var RAPID_RECON_POOL = [
  { prompt: 'Print the current working directory.', patterns: [/^pwd$/i] },
  { prompt: 'List running processes for the current user.', patterns: [/^ps$/i, /^ps\s+ux$/i] },
  { prompt: 'Show the current logged-in user.', patterns: [/^whoami$/i] },
  { prompt: 'Show system uptime.', patterns: [/^uptime$/i] },
  { prompt: 'Clear the terminal screen.', patterns: [/^clear$/i] },
  { prompt: 'Show the current git branch (quick check).', patterns: [/^git\s+branch$/i, /^git\s+status$/i] }
];

// Final Boss's one-time closing question — free-text STAR format,
// graded leniently for the real shape (stabilize -> communicate ->
// root-cause) rather than exact wording. See validateStarNarrative().
export var FINAL_BOSS_STAR_QUESTION = {
  mode: 'star_narrative',
  prompt: 'The Pager shrieks one last time, 3AM sharp: <strong>"Production just started returning 500 errors for 10% of users, 20 minutes after a deploy. Walk through how you\'d actually handle it — Situation, Task, Action, Result."</strong>',
  damageIfCorrect: 60, damageIfOptimal: 90,
  timeAllotted: 90,
  hintNudge: 'Interviewers are grading the SHAPE of your answer, not perfect prose.',
  hintPartial: 'Keep Situation/Task brief; spend real detail on Action (what you\'d actually do, in order) and Result (how you\'d confirm it\'s fixed).',
  hintFull: 'A strong shape: Situation (500s for 10% of users right after a deploy) → Task (restore service fast, minimize impact) → Action (roll back the deploy immediately, confirm errors stop, notify stakeholders, THEN investigate root cause) → Result (error rate back to normal, postmortem scheduled).'
};

