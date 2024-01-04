<script setup>
import { reactive, computed, unref, toRef, toRefs } from 'vue';
import { useAsyncQueue, useTimeoutFn, useTimeoutPoll, useUrlSearchParams } from '@vueuse/core';
import {
  useLazyLoadingState,
  useVisibilityChange,
  useError,
  useServices,
  useScrollToGameDate,
} from '@mjsz-vbr-elements/core/composables';
import { convert, sortGames, scrollToTop } from '@mjsz-vbr-elements/core/utils';
import { REFRESH_DELAY } from '@mjsz-vbr-elements/core';
import { transformSeasons, transformSections, transformTeams } from '../internal';
import { useCollectMonths } from './schedule.internal.js';

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
  transform: (res) => transformSeasons(res, state),
  onError,
});

const { isLoading: sectionLoading, execute: fetchSection } = useServices({
  options: {
    path: '/v2/championship-sections',
    apiKey: props.apiKey,
    params: computed(() => ({ championshipId: state.championshipId })),
  },
  transform: (res) => transformSections(res, state),
  onError,
});

const { isLoading: teamsLoading, execute: fetchTeams } = useServices({
  options: {
    path: '/v2/championship-teams',
    apiKey: props.apiKey,
    params: computed(() => ({ championshipId: state.championshipId })),
  },
  transform: (res) => transformTeams(res, state),
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
  transform: (data) => sortGames(data),
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
    .gameDateFilter(unref(state.selectedMonth))
    .groupByDays()
    .value();
});

useAsyncQueue([fetchSeasons, fetchSection, fetchTeams, fetchSchedule], {
  onFinished: () => {
    if (props.autoRefresh) useTimeoutFn(resume, REFRESH_DELAY);
  },
});

const changeSeason = (value) => {
  state.championshipId = value;
  params.championshipId = value;
  // resets
  if (props.autoRefresh) resume();
  state.selectedTeam = null;
  params.selectedTeam = null;
  state.selectedMonth = null;
  params.selectedMonth = null;
  state.selectedTeamGameType = 'all';
  params.selectedTeamGameType = null;
  useAsyncQueue([fetchSection, fetchTeams, fetchSchedule]);
  if (props.autoRefresh) resume();
  scrollToTop();
};

const changeMonth = (value) => {
  state.selectedMonth = value;
  params.selectedMonth = value;
  scrollToTop();
};

const changeSection = (value) => {
  state.section = value;
  params.section = value;
  // resets
  state.selectedMonth = null;
  params.selectedMonth = null;
  fetchSchedule();
};

const changeTeam = (value) => {
  state.selectedTeam = value;
  params.selectedTeam = value;
  // resets
  if (!value) {
    state.selectedTeamGameType = 'all';
    params.selectedTeamGameType = null;
  }
};

const changeTeamType = (value) => {
  state.selectedTeamGameType = value;
  params.selectedTeamGameType = value;
};
</script>

<template>
  <slot
    v-bind="{
      ...state,
      games: convertedRows,
      months,
      isLoading,
      changeSeason,
      changeMonth,
      changeSection,
      changeTeam,
      changeTeamType,
    }"
  ></slot>
</template>
