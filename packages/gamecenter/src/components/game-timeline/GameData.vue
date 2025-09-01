<script setup>
import { Image } from '@mjsz-vbr-elements/core/components';
import { useI18n } from '@mjsz-vbr-elements/core/composables';
import { format, offsetName } from '@mjsz-vbr-elements/core/utils';
import IconSheet from '@mjsz-vbr-elements/shared/icons/IconSheet';
import IconYoutube from '@mjsz-vbr-elements/shared/icons/IconYoutube';
import { computed, toRefs } from 'vue';
import { useAttendanceSocket } from '../../composables/use-attendance-socket';
import GamePeriodProgress from '../game/components/GamePeriodProgress.vue';
import { convertPeriodName, DEAFULT_LOGO_TEAM_A, DEAFULT_LOGO_TEAM_B } from '../game/internal';
import PeriodResults from './components/PeriodResults.vue';
import { buildPeriodResultsByTeam, filterGoalScorers } from './internal';

const props = defineProps({
  gameData: {
    type: Object,
    required: true,
  },

  gameEvents: {
    type: Array,
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

const { gameData } = toRefs(props);

const { t } = useI18n();

const convertedPeriodResults = computed(() => buildPeriodResultsByTeam(props.gameData.periodResults));
const homeGoalScorer = computed(() => filterGoalScorers(props.gameEvents, props.gameData.homeTeam.id));
const awayGoalScorer = computed(() => filterGoalScorers(props.gameEvents, props.gameData.awayTeam.id));

const { visitorsLabel, isVisible: isVisitorsLabelVisible } = useAttendanceSocket(props.websocketUrl, gameData);

const attendanceLabel = computed(() => {
  if (gameData.value.gameStatus <= 1)
    return visitorsLabel.value;
  return t('gameData.attendance', [gameData.value?.attendance ?? 0]);
});
</script>

<template>
  <div class="gamecenter-timeline-game-data">
    <div class="is-title-container">
      <div v-once class="is-title">
        {{ gameData.championshipName }} - {{ gameData.divisionName }} - {{ gameData.gameName }} /
        {{ gameData.location.locationName }}
      </div>
      <div class="is-gamedate">
        {{ format(gameData.gameDate, 'L dddd - HH:mm', null, locale) }} ({{
          offsetName(new Date(gameData.gameDate), null, locale)
        }})
      </div>
      <div class="is-local-gamedate">
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
    </div>

    <div class="is-teams-and-results">
      <div>
        <Image v-once :src="gameData.homeTeam.logo" class="is-team-logo" :default-src="DEAFULT_LOGO_TEAM_A" />
        <h1 class="is-team-name">
          {{ gameData.homeTeam.longName }}
        </h1>
        <ul class="is-goal-scorers">
          <li v-for="person in homeGoalScorer" :key="person.id">
            {{ person.name }} <span>{{ person.eventTime }}</span>
          </li>
        </ul>
      </div>
      <div>
        <p v-if="gameData.gameStatus > 1" class="is-game-status">
          {{ t(`gameStatus.status-${gameData.gameStatus}`) }}
        </p>
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
        <p v-if="gameData.gameStatus === 1" class="is-game-status">
          {{ gameData.actualTime }}
        </p>

        <GamePeriodProgress v-if="gameData.gameStatus === 1" :game-data="gameData" />

        <div class="is-game-result" :class="[{ 'is-game-status-live': gameData.gameStatus === 1 }]">
          <span v-if="gameData.gameStatus === 0">-</span>
          <span v-else>{{ gameData.homeTeamScore }}</span>:<span v-if="gameData.gameStatus === 0">-</span>
          <span v-else>{{ gameData.awayTeamScore }}</span>
        </div>

        <p v-if="isVisitorsLabelVisible || gameData?.attendance" class="is-attendance">
          {{ attendanceLabel }}
        </p>

        <PeriodResults
          v-if="gameData.gameStatus > 0"
          :results="convertedPeriodResults"
          :home-team-name="gameData.homeTeam.shortName"
          :away-team-name="gameData.awayTeam.shortName"
        />
      </div>
      <div>
        <Image v-once :src="gameData.awayTeam.logo" :default-src="DEAFULT_LOGO_TEAM_B" class="is-team-logo" />
        <h1 class="is-team-name">
          {{ gameData.awayTeam.longName }}
        </h1>
        <ul class="is-goal-scorers">
          <li v-for="person in awayGoalScorer" :key="person.id">
            {{ person.name }} <span>{{ person.eventTime }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
