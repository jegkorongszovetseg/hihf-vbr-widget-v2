<script setup>
import { reactive, computed, unref, ref, toRef } from 'vue';
import { useAsyncQueue } from '@vueuse/core';
import dayjs from 'dayjs';
import { useServices } from '@/composables/useServices';
import { useError } from '@/composables/useErrors';
import { transformSeasons, transformSections, transformTeams } from '@/components/widgets/extended/internal';
import convert from '@/utils/convert';
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
});

const state = reactive({
  championshipName: props.championshipName,
  loading: false,
  seasons: [],
  championshipId: 0,
  sections: [],
  section: null,
  teams: [],
  selectedMonth: null,
});
const timezone = ref(dayjs.tz.guess());
const { onError } = useError();

const { execute: fetchSeasons } = useServices({
  options: {
    path: '/v1/championshipSeasons',
    apiKey: props.apiKey,
    params: { championshipName: state.championshipName },
  },
  transform: (res) => transformSeasons(res, state),
  onError,
});

const { execute: fetchSection } = useServices({
  options: {
    path: '/v1/championshipSections',
    apiKey: props.apiKey,
    params: computed(() => ({ championshipId: state.championshipId })),
  },
  transform: (res) => transformSections(res, state),
  onError,
});

const { execute: fetchTeams } = useServices({
  options: {
    path: '/v1/championshipTeams',
    apiKey: props.apiKey,
    params: computed(() => ({ championshipId: state.championshipId })),
  },
  transform: (res) => transformTeams(res, state),
  onError,
});

const { state: rows, execute: fetchSchedule } = useServices({
  options: {
    path: '/v1/gamesList',
    apiKey: props.apiKey,
    params: computed(() => ({ championshipId: state.championshipId, division: state.section })),
  },
  // transform: (res) => res,
  onError,
});

const { months, selectedMonth } = useCollectMonths(rows, toRef(props, 'locale'));

// Filter: Month, Teams, Home and Away
// Group: gameDate
const convertedRows = computed(() => {
  return (
    convert(unref(rows))
      // .filter(props.teamFilterByName, ['homeTeamName', 'awayTeamName'])
      .schedule(unref(timezone), unref(props.locale))
      .groupByDays()
      .value()
  );
});

useAsyncQueue([fetchSeasons, fetchSection, fetchTeams, fetchSchedule]);

const changeSeason = (value) => {
  state.championshipId = value.target.value;
  useAsyncQueue([fetchSection, fetchTeams, fetchSchedule]);
};
</script>

<template>
  <slot v-bind="{ ...state, games: convertedRows, months, selectedMonth, changeSeason }"></slot>
</template>
