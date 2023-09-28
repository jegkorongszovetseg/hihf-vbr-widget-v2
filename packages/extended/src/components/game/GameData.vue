<script setup>
import { useI18n, useMainClass } from '@mjsz-vbr-elements/core/composables';
import { format, offsetName } from '@mjsz-vbr-elements/core/utils';
import { Image } from '@mjsz-vbr-elements/core/components';
import { convertPeriodName, DEAFULT_LOGO_TEAM_A, DEAFULT_LOGO_TEAM_B } from './internal';
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
      {{ gameData.location.locationName }}
    </div>
    <div class="is-gamedate">
      {{ format(gameData.gameDate, 'L dddd - HH:mm', null, locale) }} ({{
        offsetName(new Date(gameData.gameDate), null, locale)
      }})
    </div>
    <div class="is-local-gamedate">
      {{ t('localTime') }} ({{ gameData.location.locationCountryISO }}):
      {{ format(gameData.localGameDate.dateTime, 'L dddd - HH:mm', null, locale) }} ({{
        gameData.localGameDate.timezoneAbbr
      }})
    </div>
    <div class="is-teams-and-results">
      <div>
        <Image :src="gameData.homeTeam.logo" class="is-team-logo" :default-src="DEAFULT_LOGO_TEAM_A" />
        <h1 class="is-team-name">{{ gameData.homeTeam.longName }}</h1>
      </div>
      <div>
        <p v-if="gameData.gameStatus > 1" class="is-game-status">{{ t(`gameStatus.status-${gameData.gameStatus}`) }}</p>
        <p v-if="gameData.gameStatus === 1" class="is-game-status">
          {{ t(`periods.${convertPeriodName(gameData.period)}`) }}
        </p>
        <p v-if="gameData.isOvertime">
          <span class="is-badge is-invert">{{ t('afterOvertime') }}</span>
        </p>
        <p v-if="gameData.isShootout">
          <span class="is-badge is-invert">{{ t('afterShootout') }}</span>
        </p>
        <p v-if="gameData.gameStatus === 1" class="is-game-status">{{ gameData.actualTime }}</p>

        <GamePeriodProgress v-if="gameData.gameStatus === 1" :game-data="gameData" />

        <div :class="['is-game-result', { 'is-game-result-live': gameData.gameStatus === 1 }]">
          <span v-if="gameData.gameStatus === 0">-</span>
          <span v-else>{{ gameData.homeTeamScore }}</span
          >:<span v-if="gameData.gameStatus === 0">-</span>
          <span v-else>{{ gameData.awayTeamScore }}</span>
        </div>
        <p class="is-period-results">{{ gameData.periodResults }}</p>
      </div>
      <div>
        <Image :src="gameData.awayTeam.logo" :default-src="DEAFULT_LOGO_TEAM_B" class="is-team-logo" />
        <h1 class="is-team-name">{{ gameData.awayTeam.longName }}</h1>
      </div>
    </div>
  </div>
</template>
