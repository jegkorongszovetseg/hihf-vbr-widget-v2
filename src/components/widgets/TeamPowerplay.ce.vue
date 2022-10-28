<script setup>
import { computed, unref } from 'vue';
import { useAsyncState } from '@vueuse/core';
import { fetchVBRData } from '../../composables/useFetchVBRApi';
import useSort from '../../composables/useSort';
import convert, { convertTimes, rawConvert } from '../../utils/convert';
import { COLUMNS_TEAMS_POWERPLAY } from './internal';
import { SORT_STATE_DESCEND } from '../../constants';
import { baseProps, teamStatsProps } from './internal.props';
import { externalTeamLinkResolver } from '../../utils/resolvers';
import I18NProvider from '../I18NProvider.vue';
import ErrorNotice from '../ErrorNotice.vue';
import StatisticsTable from './StatisticsTable.vue';

const props = defineProps({
  ...baseProps,
  ...teamStatsProps,
});

const columns = COLUMNS_TEAMS_POWERPLAY;
const locale = computed(() => props.locale);

const {
  state: rawRows,
  error,
  isLoading,
} = useAsyncState(
  fetchVBRData('/v1/teamPowerPlayPeriod', props.apiKey, {
    championshipId: Number(props.championshipId),
    division: props.division,
  }),
  []
);

const { sort, change: onSort } = useSort({
  sortTarget: 'ppPercent',
  orders: [{ target: 'ppPercent', direction: SORT_STATE_DESCEND }],
});

const rows = computed(() => rawConvert(unref(rawRows), convertTimes(['advTime', 'advTimePP1', 'advTimePP2'])));

const convertedRows = computed(() => {
  return convert(unref(rows))
    .sorted(sort)
    .addIndex(sort.sortTarget)
    .value();
});
const resolveExternalTeamLink = (teamName) => externalTeamLinkResolver(props.externalTeamLink, teamName);
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
        :external-team-resolver="resolveExternalTeamLink"
        :is-team-linked="isTeamLinked"
        @sort="onSort"
      />
    </I18NProvider>
  </div>
</template>

<style src="../../assets/common.css"></style>
<style lang="scss" src="../../assets/table.css"></style>
<style lang="scss" src="../../assets/responsive-table.css"></style>
<style lang="scss" src="../../assets/paginator.css"></style>
