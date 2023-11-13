<script setup>
import { reactive, computed, unref, toRef } from 'vue';
import { useAsyncQueue, useUrlSearchParams, noop } from '@vueuse/core';
import { head } from 'ramda';
import {
  useLazyLoadingState,
  useError,
  useServices,
  useSort,
  usePage,
  useI18n,
} from '@mjsz-vbr-elements/core/composables';
import {
  convert,
  sortGames,
  rawConvert,
  playerName,
  teamName,
  convertTimesMinToMinSec,
  convertTimesSecToMin,
} from '@mjsz-vbr-elements/core/utils';
import { COLUMNS_SCHEDULE } from '@mjsz-vbr-elements/core/columns';
import { transformSeasons } from '../internal';
import {
  transformSections,
  convertPhaseName,
  PANEL_SCHEDULE,
  PANEL_PLAYERS,
  PANEL_TEAMS,
  ALL_REPORTS_MAP,
  TEAMS_REPORTS_SELECT,
  PLAYERS_REPORTS_SELECT,
} from './championship.internal.js';

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

  limit: {
    type: Number,
    default: 20,
  },
});

const params = useUrlSearchParams('history');

const state = reactive({
  loading: false,
  seasons: [],
  championshipId: Number(params.championshipId) || 0,
  championships: [],
  phaseId: null,
  selectedChampionshipId: null,
  sections: [],
  section: params.section || null,
  selectedPanel: PANEL_SCHEDULE,
  api: '/v2/games-list',
  apiParams: {},
  columns: COLUMNS_SCHEDULE,
  sort: null,
  report: 'points',
});
const timezone = toRef(props, 'timezone');
const { onError } = useError();

const { sort, change: onSort } = useSort({
  sortTarget: '',
  orders: [],
});

const { page, change: onPaginatorChange } = usePage();

const { t } = useI18n();

const { isLoading: seasonsLoading, execute: fetchSeasons } = useServices({
  options: {
    path: '/v2/championship-seasons',
    apiKey: props.apiKey,
    params: { championshipName: props.championshipName },
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

const {
  isLoading: gamesLoading,
  state: rows,
  execute: fetchData,
} = useServices({
  options: {
    path: computed(() => state.api),
    apiKey: props.apiKey,
    resetOnExecute: true,
    params: computed(() => ({ championshipId: state.championshipId, phaseId: state.phaseId, ...state.apiParams })),
  },
  transform: (data) => sortGames(data),
  onError,
});

const isLoading = useLazyLoadingState([sectionLoading, seasonsLoading, gamesLoading], { delay: 1000 });

useAsyncQueue([fetchSeasons, fetchSection, fetchData]);

const currentReportList = computed(() =>
  state.selectedPanel === PANEL_PLAYERS ? PLAYERS_REPORTS_SELECT(t) : TEAMS_REPORTS_SELECT(t)
);

const phases = computed(() => {
  const championship = state.championships.find((item) => item.sectionId === state.selectedChampionshipId);
  return convertPhaseName(championship?.phases ?? []);
});

const currentLimit = computed(() => (state.selectedPanel === PANEL_SCHEDULE ? 0 : props.limit));

const rawConvertedRows = computed(() =>
  rawConvert(
    rows.value,
    playerName,
    teamName,
    convertTimesMinToMinSec(['mip']),
    convertTimesSecToMin(['dvgTime', 'dvgTimePP1', 'dvgTimePP2', 'advTime', 'advTimePP1', 'advTimePP2'])
  )
);

const convertedRows = computed(() => {
  return convert(unref(rawConvertedRows))
    .sorted(sort)
    .addContinuousIndex()
    .schedule(unref(timezone), unref(props.locale))
    .pagination(unref(page), currentLimit.value)
    .value();
});

const changeSeason = (value) => {
  state.championshipId = value;
  params.championshipId = value;
  useAsyncQueue([fetchSection, fetchData]);
};

const changeChampionship = (value) => {
  state.selectedChampionshipId = value;
  state.phaseId = phases.value[0]?.phaseId ?? null;
  fetchData();
};

const changePhase = (value) => {
  state.phaseId = value;
  fetchData();
};

const changePanel = (value) => {
  state.selectedPanel = value;
  let report = value;

  if (value === PANEL_PLAYERS) {
    report = head(PLAYERS_REPORTS_SELECT(noop))?.value;
  }
  if (value === PANEL_TEAMS) {
    report = head(TEAMS_REPORTS_SELECT(noop))?.value;
  }

  state.report = report;
  setFetchData(report);
};

function onChangeReport(value) {
  setFetchData(value);
}

function setFetchData(value) {
  const report = ALL_REPORTS_MAP.get(value);

  state.api = report.api;
  state.apiParams = report.params;
  state.columns = report.columns;
  sort.sortTarget = report.sort?.sortTarget ?? '';
  sort.orders = report.sort?.orders ?? [];
  fetchData();
}
</script>

<template>
  <slot
    v-bind="{
      ...state,
      sort,
      page,
      phases,
      isLoading,
      games: convertedRows,
      reports: currentReportList,
      onSort,
      changePanel,
      changePhase,
      changeSeason,
      onChangeReport,
      onPaginatorChange,
      changeChampionship,
    }"
  ></slot>
</template>
