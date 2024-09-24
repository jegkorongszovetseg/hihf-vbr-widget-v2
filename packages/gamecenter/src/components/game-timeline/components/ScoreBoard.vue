<script setup>
import { useMainClass, useI18n } from '@mjsz-vbr-elements/core/composables';
import { Image } from '@mjsz-vbr-elements/core/components';
import { convertPeriodName } from '../../game/internal';

const { t } = useI18n();

defineProps({
  gameData: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<template>
  <div :class="useMainClass('gamecenter-timeline-score-board')">
    <div class="is-team is-home-team">{{ gameData.homeTeam?.longName }}</div>
    <Image :src="gameData.homeTeam?.logo" :key="gameData.homeTeam?.logo" />
    <div class="is-score">{{ gameData.homeTeamScore }}</div>
    <div class="is-game-status">
      <template v-if="gameData.gameStatus > 0">
        {{ t(`periods.${convertPeriodName(gameData.period)}`) }}
      </template>
    </div>
    <div class="is-score">{{ gameData.awayTeamScore }}</div>
    <Image :src="gameData.awayTeam?.logo" :key="gameData.awayTeam?.logo" />
    <div class="is-team is-away-team">{{ gameData.awayTeam?.longName }}</div>
  </div>
</template>
