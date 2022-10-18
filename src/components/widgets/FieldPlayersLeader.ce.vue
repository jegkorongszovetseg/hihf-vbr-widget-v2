<script setup>
import { computed, unref } from 'vue';
import { useAsyncState } from '@vueuse/core';
import { fetchVBRData } from '../../composables/useFetchVBRApi';
import useSort from '../../composables/useSort';
import { usePage } from '../../composables/usePage';
import convert from '../../utils/convert';
import { COLUMNS_FIELD_PLAYERS } from './internal';
import { commonProps } from './statistics.internal';
import I18NProvider from '../I18NProvider.vue';
import ErrorNotice from '../ErrorNotice.vue';
import StatisticsTable from './StatisticsTable.vue';
import Paginator from '../Paginator.vue';
import { SORT_STATE_DESCEND } from '../../constants';

const props = defineProps(commonProps);

const columns = COLUMNS_FIELD_PLAYERS;
const locale = computed(() => props.locale);

const {
  state: rows,
  error,
  isLoading,
} = useAsyncState(
  fetchVBRData('/v1/playersStatsPeriod', props.apiKey, {
    championshipId: Number(props.championshipId),
    division: props.division,
  }),
  []
);

const { page, change: onPaginatorChange } = usePage({});

const { sort, update: onSort } = useSort({
  sortTarget: 'point',
  orders: [{ target: 'point', direction: SORT_STATE_DESCEND }],
});

const convertedRows = computed(() => {
  return convert(unref(rows))
    .teamFilter(props.teamFilterByName, ['teamName'])
    .playerName()
    .sorted(sort)
    .addIndex(sort.sortTarget)
    .pagination(unref(page), props.limit)
    .value();
});

const totalItems = computed(() => convertedRows.value?.totalItems);
</script>

<template>
  <div>
    <I18NProvider :locale="locale">
      <ErrorNotice v-if="error?.error" :error="error.message" />

      <StatisticsTable
        :columns="columns"
        :type="props.type"
        :rows="convertedRows.rows"
        :is-loading="isLoading"
        :hide-columns="props.hideColumns"
        :sort="sort"
        @sort="onSort"
      />

      <Paginator
        :page="page"
        :items-per-page="props.limit"
        :total-items="totalItems"
        :range-length="5"
        @change="onPaginatorChange"
      />
    </I18NProvider>
  </div>
</template>

<style src="../../assets/common.css"></style>
<style lang="scss" src="../../assets/table.css"></style>
<style lang="scss" src="../../assets/responsive-table.css"></style>
<style lang="scss" src="../../assets/paginator.css"></style>
