<script setup>
import { store } from '../store.js';

import { GamesTimeline } from '@mjsz-vbr-elements/extended';
import '../../../packages/shared/dist/css/common.css';
import '../../../packages/shared/dist/css/games-timeline.css';
</script>

<template>
  <div style="height: 110px; outline: 1px solid #ccc">
    <!-- <GamesTimeline
      :locale="store.locale"
      service-path="/v2/public-calendar?seasonId=217"
      external-game-resolver="/GameCenterTimeline?gameid={gameId}"
      external-schedule-url="/ExtendedCalendar"
    /> -->
    <mjsz-vbr-games-timeline
      :locale="store.locale"
      service-path="/v2/championship-calendar?championshipId=3722"
      external-game-resolver="/GameCenterTimeline?gameid={gameId}"
      external-schedule-url="/ExtendedCalendar"
    />
  </div>
</template>
