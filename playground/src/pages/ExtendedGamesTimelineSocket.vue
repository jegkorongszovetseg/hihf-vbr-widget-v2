<script setup>
// import { GamesTimeline } from '@mjsz-vbr-elements/extended';
import { store } from '../store.js';
// import '../../../packages/shared/assets/css/common.scss';
// import '../../../packages/shared/assets/css/games-timeline.scss';
</script>

<template>
  <div style="height: 110px; outline: 1px solid #ccc">
    <!-- <GamesTimeline
      :locale="store.locale"
      service-path="/v2/championship-calendar?championshipId=3898"
      external-game-resolver="/GameCenterTimeline?gameid={gameId}"
      external-schedule-url="/ExtendedCalendar"
    /> -->
    <mjsz-vbr-games-timeline-socket
      :locale="store.locale"
      service-path="/v2/championship-calendar?championshipId=4049"
      external-game-resolver="/GameCenterTimeline?gameid={gameId}"
      external-schedule-url="/ExtendedCalendar"
    />
  </div>
</template>
