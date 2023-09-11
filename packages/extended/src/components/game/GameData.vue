<script setup>
import { useI18n, useMainClass } from '@mjsz-vbr-elements/core/composables';
import { format, offsetName } from '@mjsz-vbr-elements/core/utils';
import { Image } from '@mjsz-vbr-elements/core/components';
import { convertPeriodName } from './internal';
import GamePeriodProgress from './components/GamePeriodProgress.vue';

defineProps({
  gameData: {
    type: Object,
    required: true,
  },

  locale: {
    type: String,
    default: 'hu',
  },
});

const { t } = useI18n();
</script>

<template>
  <div :class="useMainClass('gamecenter-game-data')">
    <div class="is-title">
      {{ gameData.championshipName }} - {{ gameData.divisionName }} - {{ gameData.gameName }} /
      {{ gameData.location }}
    </div>
    <div class="is-gamedate">
      {{ format(gameData.gameDate, 'L dddd - HH:mm z', null, locale) }} ({{ offsetName(new Date(), null, locale) }})
    </div>
    <div class="is-local-gamedate">{{ t('localTime') }} - {{ gameData.location }}: {{ format(gameData.gameDate, 'L dddd - HH:mm z', null, locale) }}</div>
    <div class="is-teams-and-results">
      <div class="is-team-name">
        <Image :src="gameData.homeTeamLogo" />
        {{ gameData.homeTeamName }}
      </div>
      <div>
        <p v-if="gameData.gameStatus > 1" class="is-game-status">{{ t(`gameStatus.status-${gameData.gameStatus}`) }}</p>
        <p v-if="gameData.gameStatus === 1" class="is-game-status">
          {{ t(`periods.${convertPeriodName(gameData.period)}`) }}
        </p>
        <p v-if="gameData.isOvertime">Overtime</p>
        <p v-if="gameData.isShootout">isShootout</p>
        <p v-if="gameData.gameStatus === 1" class="is-game-status">{{ gameData.actualTime }}</p>

        <GamePeriodProgress :game-data="gameData" />

        <div :class="['is-game-result', { 'is-game-result-live': gameData.gameStatus === 1 }]">
          <span v-if="gameData.gameStatus === 0">-</span>
          <span v-else>{{ gameData.homeTeamScore }}</span
          >:<span v-if="gameData.gameStatus === 0">-</span>
          <span v-else>{{ gameData.awayTeamScore }}</span>
        </div>
        <p class="is-period-results">{{ gameData.periodResults }}</p>
      </div>
      <div class="is-team-name">
        <Image :src="gameData.awayTeamLogo" />
        {{ gameData.awayTeamName }}
      </div>
    </div>
  </div>
</template>
