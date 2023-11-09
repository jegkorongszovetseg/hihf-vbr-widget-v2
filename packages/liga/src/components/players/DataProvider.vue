<script setup>
import { reactive, computed } from 'vue';
import { useAsyncQueue, useUrlSearchParams } from '@vueuse/core';
import { useLazyLoadingState, useError, useServices, usePage, useSort } from '@mjsz-vbr-elements/core/composables';
import { convert } from '@mjsz-vbr-elements/core/utils';
import { transformSeasons } from '../internal';
import { transformPlayers } from './internal';

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

const params = useUrlSearchParams('hash');

const state = reactive({
  championshipName: props.championshipName,
  seasons: [],
  championshipId: Number(params.championshipId) || 0,
  query: '',
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
      championshipId: state.championshipId,
    })),
  },
  transform: (data) => transformPlayers(data),
  onError,
});

const isLoading = useLazyLoadingState([seasonsLoading, playersLoading], { delay: 1000 });

useAsyncQueue([fetchSeasons, fetchPlayers]);

const convertedRows = computed(() =>
  convert(rows.value).sorted(sort).filter(state.query, [['name']]).pagination(page.value, props.limit).value()
);

const changeSeason = (value) => {
  onPaginatorChange(1);
  state.championshipId = value;
  params.championshipId = value;
  state.query = '';
  params.query = null;
  useAsyncQueue([fetchPlayers]);
};

const onInput = (event) => {
  const { value } = event.target;
  onPaginatorChange(1);
  state.query = value;
  params.query = value;
}
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
      onInput,
      changeSeason,
      onPaginatorChange,
    }"
  ></slot>
</template>
