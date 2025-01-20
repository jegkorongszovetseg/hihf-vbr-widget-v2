<script setup>
import { Image } from '@mjsz-vbr-elements/core/components';
import { useI18n } from '@mjsz-vbr-elements/core/composables';
import { convertPeriodName } from '../../game/internal';

defineProps({
  gameData: {
    type: Object,
    default: () => ({}),
  },
});

const { t } = useI18n();
</script>

<template>
  <div class="gamecenter-timeline-score-board">
    <div class="is-team is-home-team">
      {{ gameData.homeTeam?.longName }}
    </div>
    <Image :key="gameData.homeTeam?.logo" :src="gameData.homeTeam?.logo" />
    <div class="is-score">
      {{ gameData.homeTeamScore }}
    </div>
    <div class="is-game-status">
      <template v-if="gameData.gameStatus > 0">
        {{ t(`periods.${convertPeriodName(gameData.period)}`) }}
      </template>
    </div>
    <div class="is-score">
      {{ gameData.awayTeamScore }}
    </div>
    <Image :key="gameData.awayTeam?.logo" :src="gameData.awayTeam?.logo" />
    <div class="is-team is-away-team">
      {{ gameData.awayTeam?.longName }}
    </div>
  </div>
</template>
