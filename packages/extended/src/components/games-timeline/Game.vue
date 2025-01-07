<script setup>
import { useMainClass } from '@mjsz-vbr-elements/core/composables';

const props = defineProps({
  gameData: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <a href="#" :class="useMainClass('games-timeline-game')">
    <time>{{ gameData.gameDate }}</time>
    <div class="is-home-team-logo">l</div>
    <div class="is-home-team-name">{{ gameData.homeTeam.longName }}</div>
    <div class="is-home-team-score">
      <span>{{ gameData.homeTeamScore }}</span>
    </div>
    <div class="is-away-team-logo">l</div>
    <div class="is-away-team-name">{{ gameData.awayTeam.longName }}</div>
    <div class="is-away-team-score">
      <span>{{ gameData.awayTeamScore }}</span>
    </div>
    <div class="is-status">{{ gameData.gameStatus }}</div>
  </a>
</template>
