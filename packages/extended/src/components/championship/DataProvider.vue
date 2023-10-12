<script setup>
import { reactive, computed, unref, toRef } from 'vue';
import { useAsyncQueue, useUrlSearchParams } from '@vueuse/core';
import { useLazyLoadingState, useError, useServices, useSort } from '@mjsz-vbr-elements/core/composables';
import { convert, sortGames } from '@mjsz-vbr-elements/core/utils';
import { COLUMNS_SCHEDULE } from '@mjsz-vbr-elements/core/columns';
import { transformSeasons } from '../internal';
import { transformSections, convertPhaseName, PANEL_SCHEDULE, ALL_REPORTS_MAP } from './championship.internal.js';

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
  columns: COLUMNS_SCHEDULE,
  sort: null,
});
const timezone = toRef(props, 'timezone');
const { onError } = useError();

const { sort, change: onSort } = useSort({
  sortTarget: '',
  orders: [],
});

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
  execute: fetchSchedule,
} = useServices({
  options: {
    path: computed(() => state.api),
    apiKey: props.apiKey,
    params: computed(() => ({ championshipId: state.championshipId, phaseId: state.phaseId })),
  },
  transform: (data) => sortGames(data),
  onError,
});

const isLoading = useLazyLoadingState([sectionLoading, seasonsLoading, gamesLoading], { delay: 1000 });

useAsyncQueue([fetchSeasons, fetchSection, fetchSchedule]);

const phases = computed(() => {
  const championship = state.championships.find((item) => item.sectionId === state.selectedChampionshipId);
  return convertPhaseName(championship?.phases ?? []);
});

const convertedRows = computed(() => {
  return convert(unref(rows)).sorted(sort).addContinuousIndex().schedule(unref(timezone), unref(props.locale)).value();
});

const changeSeason = (value) => {
  state.championshipId = value;
  params.championshipId = value;
  useAsyncQueue([fetchSection, fetchSchedule]);
};

const changeChampionship = (value) => {
  state.selectedChampionshipId = value;
  state.phaseId = phases.value[0]?.phaseId ?? null;
  fetchSchedule();
};

const changePhase = (value) => {
  state.phaseId = value;
  fetchSchedule();
};

const changePanel = (value) => {
  const report = ALL_REPORTS_MAP.get(value);

  state.selectedPanel = value;
  state.api = report.api;
  state.columns = report.columns;
  fetchSchedule();
};
</script>

<template>
  <slot
    v-bind="{
      ...state,
      sort,
      phases,
      isLoading,
      games: convertedRows,
      onSort,
      changePanel,
      changePhase,
      changeSeason,
      changeChampionship,
    }"
  ></slot>
</template>
