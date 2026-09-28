// Boss "pager": metadata plus its full question bank (data only).

    /* ================================================================
       FINAL BOSS — "3AM PAGER"
       Not the standard 3-phase format — see isFinalBoss handling in
       newRunState()/startFight()/currentPhaseQuestions()/nextQuestion().
       `phases: [[]]` is a deliberate 1-element placeholder: its LENGTH is
       what handlePhaseCleared() checks to decide "no more phases ->
       victory", while its actual (empty) content is never read — real
       questions come from getFinalBossMixedPool() instead. Gated behind
       all 9 topic bosses via isFinalBossUnlocked()/BOSS_ORDER.
       ================================================================ */
    export var pager = {
      id: 'pager',
      name: '3AM Pager',
      topic: 'Final Exam',
      icon: '📟',
      chibiKind: 'pager',
      phaseHp: [220],
      phaseNames: ['3AM — Everything At Once'],
      xpReward: 320,
      coinBaseReward: 220,
      phases: [[]]
    };
