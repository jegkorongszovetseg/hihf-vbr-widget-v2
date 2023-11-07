<script setup>
import { reactive, computed, watch } from 'vue';
import { head } from 'ramda';
import { useUrlSearchParams } from '@vueuse/core';
import { useError, useServices } from '@mjsz-vbr-elements/core/composables';
import { convert } from '@mjsz-vbr-elements/core/utils';
import { PAGE_INFO, PAGE_GAMES, PAGE_ROSTER, transformRosters } from './team.internal.js';

const props = defineProps({
  teamId: {
    type: String,
    default: '',
  },

  championshipId: {
    type: String,
    default: '',
  },

  locale: {
    type: String,
    default: 'hu',
  },
});
const timezone = 'Europe/Budapest';
const params = useUrlSearchParams('history');

const state = reactive({
  page: params.page || PAGE_INFO,
});

const { onError } = useError();

const { state: teamInfo } = useServices({
  options: {
    path: '/v2/team-info',
    apiKey: props.apiKey,
    params: computed(() => ({ championshipId: props.championshipId, teamId: props.teamId })),
    immediate: true,
  },
  transform: (res) => head(res),
  onError,
});

const { state: games, execute: fetchTeamGames } = useServices({
  options: {
    path: '/v2/team-games',
    apiKey: props.apiKey,
    params: computed(() => ({ championshipId: props.championshipId, teamId: props.teamId })),
  },
  transform: (res) => convert(res).schedule(timezone, props.locale).value(),
  onError,
});

const { state: roster, execute: fetchTeamRoster } = useServices({
  options: {
    path: '/v2/championship-players',
    apiKey: props.apiKey,
    params: computed(() => ({ championshipId: 3450 })),
  },
  transform: (res) => transformRosters(res, props.teamId),
  onError,
});

// const convertedRows = computed(() => {
//   return convert(rows.value).schedule(props.timezone, props.locale).value();
// });

watch(
  params,
  () => {
    fetchData(params.page);
  },
  {
    immediate: true,
  }
);

function onChangePage(page) {
  state.page = page;
  params.page = page;
  fetchData(page);
}

function fetchData(page) {
  switch (page) {
    case PAGE_GAMES:
      fetchTeamGames();
      break;
    case PAGE_ROSTER:
      fetchTeamRoster();
      break;

    default:
      break;
  }
}
</script>

<template>
  <slot v-bind="{ ...state, games, teamInfo, roster, onChangePage }" />
</template>
