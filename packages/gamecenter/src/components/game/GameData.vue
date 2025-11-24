<script setup>
import { Image } from '@mjsz-vbr-elements/core/components';
import { useI18n } from '@mjsz-vbr-elements/core/composables';
import { format, offsetName } from '@mjsz-vbr-elements/core/utils';
import { IconSheet, IconYoutube } from '@mjsz-vbr-elements/shared/icons';
import { toRefs } from 'vue';
import { useAttendanceSocket } from '../../composables/use-attendance-socket';
import GamePeriodProgress from './components/GamePeriodProgress.vue';
import { convertPeriodName, DEAFULT_LOGO_TEAM_A, DEAFULT_LOGO_TEAM_B } from './internal';

const props = defineProps({
  gameData: {
    type: Object,
    required: true,
  },

  locale: {
    type: String,
    default: 'hu',
  },

  websocketUrl: {
    type: String,
    default: '',
  },
});

const { gameData, websocketUrl } = toRefs(props);

const { t } = useI18n();

const { visitorsLabel, isVisible: isVisitorsLabelVisible } = useAttendanceSocket(websocketUrl, gameData);
</script>

<template>
  <div class="gamecenter-game-data">
    <div class="mb-md">
      <div v-once class="text-highlighted uppercase font-bold">
        {{ gameData.championshipName }} - {{ gameData.divisionName }} - {{ gameData.gameName }} /
        {{ gameData.location.locationName }}
      </div>
      <div v-once class="text-muted">
        {{ format(gameData.gameDate, 'L dddd - HH:mm', null, locale) }} ({{
          offsetName(new Date(gameData.gameDate), null, locale)
        }})
      </div>
      <div v-once class="text-muted text-sm">
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
        <a v-if="gameData.toiReportUrl" :href="gameData.toiReportUrl" target="_blank">
          <IconSheet class="is-icon" />
          {{ t('toiSheet') }}
        </a>
        <a v-if="gameData.video" :href="gameData.video" target="_blank">
          <IconYoutube class="is-icon" />
          {{ t('video') }}
        </a>
      </div>
      <p v-if="gameData.gameStatus <= 1 && isVisitorsLabelVisible" class="text-xs text-muted">
        {{ visitorsLabel }}
      </p>
    </div>

    <div class="is-teams-and-results">
      <div v-once>
        <Image :src="gameData.homeTeam?.logo" :width="128" :default-src="DEAFULT_LOGO_TEAM_A" />
        <h1 class="is-team-name">
          {{ gameData.homeTeam?.longName }}
        </h1>
      </div>
      <div>
        <div v-if="gameData.gameStatus > 1" class="is-game-status">
          {{ t(`gameStatus.status-${gameData.gameStatus}`) }}
        </div>
        <div v-if="gameData.gameStatus === 1" class="is-game-status">
          {{ t(`periods.${convertPeriodName(gameData.period)}`) }}
        </div>
        <template v-if="gameData.gameStatus > 1">
          <div v-if="gameData.isOvertime">
            <span class="badge lg inverted">{{ t('afterOvertime') }}</span>
          </div>
          <div v-if="gameData.isShootout">
            <span class="badge lg inverted">{{ t('afterShootout') }}</span>
          </div>
        </template>
        <div v-if="gameData.gameStatus === 1" class="is-game-status">
          {{ gameData.actualTime }}
        </div>

        <GamePeriodProgress v-if="gameData.gameStatus === 1" :game-data="gameData" />

        <div class="game-result" :class="[{ live: gameData.gameStatus === 1 }]">
          <span v-if="gameData.gameStatus === 0">-</span>
          <span v-else>{{ gameData.homeTeamScore }}</span>:<span v-if="gameData.gameStatus === 0">-</span>
          <span v-else>{{ gameData.awayTeamScore }}</span>
        </div>
        <div class="is-period-results">
          {{ gameData.periodResults }}
        </div>
      </div>
      <div v-once>
        <Image :src="gameData.awayTeam?.logo" :default-src="DEAFULT_LOGO_TEAM_B" :width="128" />
        <h1 class="is-team-name">
          {{ gameData.awayTeam?.longName }}
        </h1>
      </div>
    </div>
  </div>
</template>
