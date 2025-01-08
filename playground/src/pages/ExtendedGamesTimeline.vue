<script setup>
import { store } from '../store.js';

import '../../../packages/shared/dist/css/games-timeline.css';
</script>

<template>
  <div style="height: 110px; outline: 1px solid #ccc">
    <mjsz-vbr-games-timeline
      :locale="store.locale"
      external-game-resolver="/GameCenterTimeline?gameid={gameId}"
      external-schedule-url="/ExtendedCalendar"
    />
  </div>
</template>
