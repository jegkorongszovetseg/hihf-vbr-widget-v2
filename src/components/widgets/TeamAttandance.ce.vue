<script setup>
import { computed, unref } from 'vue';
import { useAsyncState } from '@vueuse/core';
import { fetchVBRData } from '../../composables/useFetchVBRApi';
import useSort from '../../composables/useSort';
import convert from '../../utils/convert';
import { COLUMNS_TEAM_ATTENDANCE } from './internal';
import { commonProps } from './statistics.internal';
import I18NProvider from '../I18NProvider.vue';
import ErrorNotice from '../ErrorNotice.vue';
import StatisticsTable from './StatisticsTable.vue';
import { SORT_STATE_DESCEND } from '../../constants';

const props = defineProps(commonProps);

const columns = COLUMNS_TEAM_ATTENDANCE;
const locale = computed(() => props.locale);

const {
  state: rows,
  error,
  isLoading,
} = useAsyncState(
  fetchVBRData('/v1/teamAttendancePeriod', props.apiKey, {
    championshipId: Number(props.championshipId),
    division: props.division,
  }),
  []
);

const { sort, change: onSort } = useSort({
  sortTarget: 'totalAttendanceAvg',
  orders: [{ target: 'totalAttendanceAvg', direction: SORT_STATE_DESCEND }],
});

const convertedRows = computed(() => {
  return convert(unref(rows)).sorted(sort).addContinuousIndex(sort.sortTarget).value();
});
</script>

<template>
  <div>
    <I18NProvider :locale="locale">
      <ErrorNotice v-if="error?.error" :error="error.message" />

      <StatisticsTable
        :columns="columns"
        :rows="convertedRows.rows"
        :is-loading="isLoading"
        :hide-columns="props.hideColumns"
        :sort="sort"
        @sort="onSort"
      />
    </I18NProvider>
  </div>
</template>

<style src="../../assets/common.css"></style>
<style lang="scss" src="../../assets/table.css"></style>
<style lang="scss" src="../../assets/responsive-table.css"></style>
<style lang="scss" src="../../assets/paginator.css"></style>
