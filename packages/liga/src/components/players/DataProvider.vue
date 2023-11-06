<script setup>
import { reactive, computed } from 'vue';
import { useAsyncQueue, useUrlSearchParams } from '@vueuse/core';
import { useLazyLoadingState, useError, useServices, usePage, useSort } from '@mjsz-vbr-elements/core/composables';
import { convert, rawConvert, playerName, teamName } from '@mjsz-vbr-elements/core/utils';
import { transformSeasons } from '../internal';

const props = defineProps({
  championshipName: {
    type: String,
    default: '',
  },

  apiKey: {
    type: String,
    default: '',
  },

  locale: {
    type: String,
    default: 'hu',
  },

  limit: {
    type: Number,
    default: 40,
  },
});

const params = useUrlSearchParams('history');

const state = reactive({
  championshipName: props.championshipName,
  seasons: [],
  championshipId: Number(params.championshipId) || 0,
});

const { onError } = useError();

const { page, change: onPaginatorChange } = usePage();

const { sort, change: onSort } = useSort({
  sortTarget: '',
  orders: [],
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

const {
  isLoading: playersLoading,
  state: rows,
  execute: fetchPlayers,
} = useServices({
  options: {
    path: '/v2/championship-players',
    apiKey: props.apiKey,
    params: computed(() => ({
      championshipId: 3451, //state.championshipId
    })),
  },
  transform: (data) => rawConvert(data, playerName, teamName),
  onError,
});

const isLoading = useLazyLoadingState([seasonsLoading, playersLoading], { delay: 1000 });

useAsyncQueue([fetchSeasons, fetchPlayers]);

const convertedRows = computed(() =>
  convert(rows.value).sorted(sort).pagination(page.value, props.limit).value()
);

const changeSeason = (value) => {
  state.championshipId = value;
  params.championshipId = value;
  useAsyncQueue([fetchTeams]);
};
</script>

<template>
  <slot
    v-bind="{
      ...state,
      sort,
      page,
      players: convertedRows,
      isLoading,
      onSort,
      changeSeason,
      onPaginatorChange,
    }"
  ></slot>
</template>
