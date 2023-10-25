<script setup>
import { reactive, computed, watch } from 'vue';
import { useUrlSearchParams } from '@vueuse/core';
import { useError, useServices } from '@mjsz-vbr-elements/core/composables';
import { convert } from '@mjsz-vbr-elements/core/utils';
import { PAGE_INFO, PAGE_GAMES, PAGE_ROSTER, transformRosters } from './team.internal.js';

const props = defineProps({
  teamId: {
    String,
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
    path: '/v2/championship-teams',
    apiKey: props.apiKey,
    params: computed(() => ({ championshipId: props.teamId })),
    immediate: true,
  },
  // transform: (res) => transformTeams(res, state),
  onError,
});

const { state: games, execute: fetchTeamGames } = useServices({
  options: {
    path: '/v2/games-list',
    apiKey: props.apiKey,
    params: computed(() => ({ championshipId: 3450, division: 'Alapszakasz' })),
  },
  transform: (res) => convert(res).schedule(timezone, props.locale).value(),
  onError,
});

const { state: roster, execute: fetchTeamRoster } = useServices({
  options: {
    path: '/v2/game-stats',
    apiKey: props.apiKey,
    params: computed(() => ({ gameId: 73020 })),
  },
  transform: (res) => transformRosters(res.players[21910]),
  onError,
});

const convertedRows = computed(() => {
  return convert(rows.value).schedule(props.timezone, props.locale).value();
});

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
