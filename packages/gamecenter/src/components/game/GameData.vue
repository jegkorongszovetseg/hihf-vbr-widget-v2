<script setup>
import { useI18n, useMainClass } from '@mjsz-vbr-elements/core/composables';
import { format, offsetName } from '@mjsz-vbr-elements/core/utils';
import { Image } from '@mjsz-vbr-elements/core/components';
import IconYoutube from '@mjsz-vbr-elements/shared/icons/IconYoutube';
import IconSheet from '@mjsz-vbr-elements/shared/icons/IconSheet';
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
    <div class="is-title-container">
      <div class="is-title" v-once>
        {{ gameData.championshipName }} - {{ gameData.divisionName }} - {{ gameData.gameName }} /
        {{ gameData.location.locationName }}
      </div>
      <div class="is-gamedate" v-once>
        {{ format(gameData.gameDate, 'L dddd - HH:mm', null, locale) }} ({{
          offsetName(new Date(gameData.gameDate), null, locale)
        }})
      </div>
      <div class="is-local-gamedate" v-once>
        {{ t('localTime') }} ({{ gameData.location.locationName }}):
        {{ format(gameData.localGameDate.dateTime, 'L dddd - HH:mm', gameData.localGameDate.timezone, locale) }} ({{
          gameData.localGameDate.timezoneAbbr
        }})
      </div>

      <div class="is-external-contents">
        <a v-if="gameData.electronicReportUrl" :href="gameData.electronicReportUrl" target="_blank">
          <IconSheet class="is-icon" />
          {{ t('sheet') }}
        </a>
        <a v-if="gameData.video" :href="gameData.electronicReportUrl" target="_blank">
          <IconYoutube class="is-icon" />
          {{ t('video') }}
        </a>
      </div>
    </div>

    <div class="is-teams-and-results">
      <div v-once>
        <Image :src="gameData.homeTeam.logo" class="is-team-logo" :default-src="DEAFULT_LOGO_TEAM_A" />
        <h1 class="is-team-name">{{ gameData.homeTeam.longName }}</h1>
      </div>
      <div>
        <p v-if="gameData.gameStatus > 1" class="is-game-status">{{ t(`gameStatus.status-${gameData.gameStatus}`) }}</p>
        <p v-if="gameData.gameStatus === 1" class="is-game-status">
          {{ t(`periods.${convertPeriodName(gameData.period)}`) }}
        </p>
        <template v-if="gameData.gameStatus > 1">
          <p v-if="gameData.isOvertime">
            <span class="is-badge is-invert is-large">{{ t('afterOvertime') }}</span>
          </p>
          <p v-if="gameData.isShootout">
            <span class="is-badge is-invert is-large">{{ t('afterShootout') }}</span>
          </p>
        </template>
        <p v-if="gameData.gameStatus === 1" class="is-game-status">{{ gameData.actualTime }}</p>

        <GamePeriodProgress v-if="gameData.gameStatus === 1" :game-data="gameData" />

        <div :class="['is-game-result', { 'is-game-status-live': gameData.gameStatus === 1 }]">
          <span v-if="gameData.gameStatus === 0">-</span>
          <span v-else>{{ gameData.homeTeamScore }}</span
          >:<span v-if="gameData.gameStatus === 0">-</span>
          <span v-else>{{ gameData.awayTeamScore }}</span>
        </div>
        <p class="is-period-results">{{ gameData.periodResults }}</p>
      </div>
      <div v-once>
        <Image :src="gameData.awayTeam.logo" :default-src="DEAFULT_LOGO_TEAM_B" class="is-team-logo" />
        <h1 class="is-team-name">{{ gameData.awayTeam.longName }}</h1>
      </div>
    </div>
  </div>
</template>
