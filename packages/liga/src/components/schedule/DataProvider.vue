<script setup>
import { REFRESH_DELAY } from '@mjsz-vbr-elements/core';
import {
  useError,
  useLazyLoadingState,
  useScrollToGameDate,
  useServices,
  useVisibilityChange,
} from '@mjsz-vbr-elements/core/composables';
import { convert, scrollToTop, sortGames } from '@mjsz-vbr-elements/core/utils';
import { useAsyncQueue, useTimeoutFn, useTimeoutPoll, useUrlSearchParams } from '@vueuse/core';
import { computed, reactive, toRef, toRefs, unref } from 'vue';
import { transformPhases, transformSeasons, transformTeams } from '../internal';
import { sortSubPhases, useCollectMonths } from './schedule.internal.js';

const props = defineProps({
  championshipName: {
    type: String,
    default: '',
  },

  championshipId: {
    type: Number,
    default: 0,
  },

  limit: {
    type: Number,
    default: 20,
  },

  apiKey: {
    type: String,
    default: '',
  },

  locale: {
    type: String,
    default: 'hu',
  },

  timezone: {
    type: String,
    default: '',
  },

  autoRefresh: {
    type: Boolean,
    default: false,
  },

  mainElement: {
    type: Object,
    default: null,
  },

  scrollOffset: {
    type: Number,
    default: 0,
  },

  scrollToGameDate: {
    type: Boolean,
    default: true,
  },
});

const params = useUrlSearchParams('history');

const state = reactive({
  championshipName: props.championshipName,
  loading: false,
  seasons: [],
  championshipId: Number(params.championshipId) || 0,
  sections: [],
  section: params.section || null,
  subPhase: '',
  teams: [],
  selectedMonth: Number(params.selectedMonth) ?? null,
  selectedTeam: Number(params.selectedTeam) || null,
  selectedTeamGameType: params.selectedTeamGameType || 'all',
});
const { timezone, mainElement, scrollOffset, scrollToGameDate } = toRefs(props);

const { onError } = useError();

const teamFilterTypes = computed(() => {
  switch (state.selectedTeamGameType) {
    case 'all':
      return [
        ['homeTeam', 'id'],
        ['awayTeam', 'id'],
      ];
    case 'home':
      return [['homeTeam', 'id']];
    default:
      return [['awayTeam', 'id']];
  }
});

const { isLoading: seasonsLoading, execute: fetchSeasons } = useServices({
  options: {
    path: '/v2/championship-seasons',
    apiKey: props.apiKey,
    params: { championshipName: state.championshipName },
  },
  transform: res => transformSeasons(res, state),
  onError,
});

const { isLoading: sectionLoading, execute: fetchSection } = useServices({
  options: {
    path: '/v2/championship-phases',
    apiKey: props.apiKey,
    params: computed(() => ({ championshipId: state.championshipId })),
  },
  transform: res => transformPhases(res, state),
  onError,
});

const { isLoading: teamsLoading, execute: fetchTeams } = useServices({
  options: {
    path: '/v2/championship-teams',
    apiKey: props.apiKey,
    params: computed(() => ({ championshipId: state.championshipId })),
  },
  transform: res => transformTeams(res, state),
  onError,
});

const {
  isLoading: gamesLoading,
  state: rows,
  execute: fetchSchedule,
} = useServices({
  options: {
    path: '/v2/games-list',
    apiKey: props.apiKey,
    params: computed(() => ({ championshipId: state.championshipId, division: state.section })),
  },
  transform: data => sortGames(data),
  onError,
});

const isLoading = useLazyLoadingState([sectionLoading, seasonsLoading, teamsLoading, gamesLoading], { delay: 1000 });

const { months } = useCollectMonths(rows, toRef(props, 'locale'), (month) => {
  state.selectedMonth = Number(params.selectedMonth) || month;
});

useScrollToGameDate({ items: rows, element: mainElement, offset: scrollOffset, enabled: scrollToGameDate });

const { pause, resume } = useTimeoutPoll(fetchSchedule, REFRESH_DELAY, { immediate: false });
useVisibilityChange(props.autoRefresh, resume, pause);

const convertedRows = computed(() => {
  return convert(unref(rows))
    .filter(state.selectedTeam, teamFilterTypes.value, true)
    .schedule(unref(timezone), unref(props.locale))
    .filter(state.subPhase, [['divisionStage2Name']], true)
    .gameDateFilter(unref(state.selectedMonth))
    .groupByDays()
    .value();
});

const subPhases = computed(() => {
  const mainPhase = state.sections.find(item => item.name === state.section);
  return sortSubPhases(mainPhase?.phases ?? []);
});

useAsyncQueue([fetchSeasons, fetchSection, fetchTeams, fetchSchedule], {
  onFinished: () => {
    if (props.autoRefresh)
      useTimeoutFn(resume, REFRESH_DELAY);
  },
});

function changeSeason(value) {
  state.championshipId = value;
  params.championshipId = value;
  // resets
  if (props.autoRefresh)
    resume();
  state.selectedTeam = null;
  params.selectedTeam = null;
  state.selectedMonth = null;
  params.selectedMonth = null;
  state.selectedTeamGameType = 'all';
  params.selectedTeamGameType = null;
  state.subPhase = '';
  useAsyncQueue([fetchSection, fetchTeams, fetchSchedule]);
  if (props.autoRefresh)
    resume();
  scrollToTop();
}

function changeMonth(value) {
  state.selectedMonth = value;
  params.selectedMonth = value;
  scrollToTop();
}

function changeSection(value) {
  state.section = value;
  params.section = value;
  // resets
  state.selectedMonth = null;
  params.selectedMonth = null;
  state.subPhase = '';
  fetchSchedule();
}

function changeSubSection(value) {
  state.subPhase = value;
}

function changeTeam(value) {
  state.selectedTeam = value;
  params.selectedTeam = value;
  // resets
  if (!value) {
    state.selectedTeamGameType = 'all';
    params.selectedTeamGameType = null;
  }
}

function changeTeamType(value) {
  state.selectedTeamGameType = value;
  params.selectedTeamGameType = value;
}
</script>

<template>
  <slot
    v-bind="{
      ...state,
      months,
      isLoading,
      subPhases,
      games: convertedRows,
      changeSeason,
      changeMonth,
      changeSection,
      changeTeam,
      changeTeamType,
      changeSubSection,
    }"
  />
</template>
