<script setup>
import { computed, unref } from 'vue';
import { useAsyncState } from '@vueuse/core';
import { fetchVBRData } from '../../composables/useFetchVBRApi';
import useSort from '../../composables/useSort';
import convert from '../../utils/convert';
import StandingsTable from './StandingsTable.vue';
import I18NProvider from '../I18NProvider.vue';
import ErrorNotice from '../ErrorNotice.vue';

const props = defineProps({
  locale: {
    type: String,
    default: 'hu',
  },

  championshipId: {
    type: String,
    default: '',
  },

  division: {
    type: String,
    default: '',
  },

  apiKey: {
    type: String,
    default: '',
  },

  type: {
    type: String,
    default: '3',
    validator: (value) => ['2', '3'].includes(value),
  },

  hideColumns: {
    type: String,
    default: '',
  },
});

const locale = computed(() => props.locale);

const {
  state: rows,
  error,
  isLoading,
} = useAsyncState(
  fetchVBRData('/v1/standings', props.apiKey, {
    championshipId: Number(props.championshipId),
    division: props.division,
  }),
  []
);

const { sort, update } = useSort({});

const convertedRows = computed(() => {
  return convert(unref(rows)).sorted(sort).addContinuousIndex().value();
});

const onSort = (payload) => {
  update(payload);
};
</script>

<template>
  <div>
    <I18NProvider :locale="locale">
      <ErrorNotice v-if="error?.error" :error="error.message" />

      <StandingsTable
        :type="props.type"
        :rows="convertedRows.rows"
        :is-loading="isLoading"
        :hide-columns="hideColumns"
        :sort="sort"
        @sort="onSort"
      />
    </I18NProvider>
  </div>
</template>

<style src="../../assets/common.css"></style>
<style lang="scss" src="../../assets/table.css"></style>
<style lang="scss" src="../../assets/responsive-table.css"></style>
