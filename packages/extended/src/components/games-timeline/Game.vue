<script setup>
import { useMainClass } from '@mjsz-vbr-elements/core/composables';
import { Image } from '@mjsz-vbr-elements/core/components';

const props = defineProps({
  gameData: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['navigate-to']);

function navigateTo() {
  // console.log(props.gameData);
  emit('navigate-to', 'testURL');
}
</script>

<template>
  <div :class="useMainClass('games-timeline-game')" @click="navigateTo">
    <time>{{ gameData.gameDateTime }}</time>
    <div class="is-home-team-logo">
      <Image :src="gameData.homeTeam.logo" class="is-team-logo" />
    </div>
    <div class="is-home-team-name">{{ gameData.homeTeam.longName }}</div>
    <div class="is-home-team-score">
      <span
        v-if="gameData.homeTeamScore != null"
        :class="['is-badge is-extra-large', gameData.gameStatus === 1 ? 'is-green' : 'is-invert']"
        >{{ gameData.homeTeamScore }}</span
      >
    </div>
    <div class="is-away-team-logo">
      <Image :src="gameData.awayTeam.logo" class="is-team-logo" />
    </div>
    <div class="is-away-team-name">{{ gameData.awayTeam.longName }}</div>
    <div class="is-away-team-score">
      <span
        v-if="gameData.awayTeamScore != null"
        :class="['is-badge is-extra-large', gameData.gameStatus === 1 ? 'is-green' : 'is-invert']"
        >{{ gameData.awayTeamScore }}</span
      >
    </div>
    <div class="is-status">
      {{ gameData.gameStatus !== 1 ? `${gameData.championshipName} - ${gameData.divisionName}` : gameData.gameStatus }}
    </div>
  </div>
</template>
