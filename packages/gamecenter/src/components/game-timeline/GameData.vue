<script setup>
import { computed } from 'vue';
import { useI18n, useMainClass } from '@mjsz-vbr-elements/core/composables';
import { format, offsetName } from '@mjsz-vbr-elements/core/utils';
import { Image } from '@mjsz-vbr-elements/core/components';
import IconYoutube from '@mjsz-vbr-elements/shared/icons/IconYoutube';
import IconSheet from '@mjsz-vbr-elements/shared/icons/IconSheet';
import { convertPeriodName, DEAFULT_LOGO_TEAM_A, DEAFULT_LOGO_TEAM_B } from '../game/internal';
import GamePeriodProgress from '../game/components/GamePeriodProgress.vue';
import PeriodResults from './components/PeriodResults.vue';
import { buildPeriodResultsByTeam } from './internal';

const props = defineProps({
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

const convertedPeriodResults = computed(() => buildPeriodResultsByTeam(props.gameData.periodResults));
</script>

<template>
  <div :class="useMainClass('gamecenter-timeline-game-data')">
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
        {{ t('localTime') }} ({{ gameData.location.locationCountryISO || gameData.location.locationName }}):
        {{ format(gameData.gameDate, 'L dddd - HH:mm', gameData.location.timezone, locale) }} ({{
          offsetName(new Date(gameData.gameDate), gameData.location.timezone, locale)
        }})
      </div>

      <div class="is-external-contents">
        <a v-if="gameData.electronicReportUrl" :href="gameData.electronicReportUrl" target="_blank">
          <IconSheet class="is-icon" />
          {{ t('sheet') }}
        </a>
        <a v-if="gameData.video" :href="gameData.video" target="_blank">
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

        <p v-if="gameData.attendance" class="is-attendance">{{ t('gameData.attendance', [gameData.attendance]) }}</p>

        <PeriodResults
          :results="convertedPeriodResults"
          :home-team-name="gameData.homeTeam.shortName"
          :away-team-name="gameData.awayTeam.shortName"
        />
      </div>
      <div v-once>
        <Image :src="gameData.awayTeam.logo" :default-src="DEAFULT_LOGO_TEAM_B" class="is-team-logo" />
        <h1 class="is-team-name">{{ gameData.awayTeam.longName }}</h1>
      </div>
    </div>
  </div>
</template>
