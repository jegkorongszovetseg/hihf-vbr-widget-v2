<script setup>
import { computed, unref, watch } from 'vue';
import { useAsyncState } from '@vueuse/core';
import { fetchVBRData } from '../../composables/useFetchVBRApi';
import { useErrorProvider } from '../../composables/useErrors';
import useSort from '../../composables/useSort';
import convert from '../../utils/convert';
import { COLUMNS_SCORING_EFFICIENCY } from './internal';
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

const { onError, error, hasError } = useErrorProvider();

const columns = COLUMNS_SCORING_EFFICIENCY;
const locale = computed(() => props.locale);

const {
  state: rows,
  error: apiError,
  isLoading,
} = useAsyncState(
  fetchVBRData('/v1/standings', props.apiKey, {
    championshipId: Number(props.championshipId),
    division: props.division,
  }),
  []
);
watch(apiError, (error) => onError(error));

const { sort, change: onSort } = useSort({
  sortTarget: 'GFShots',
  orders: [{ target: 'GFShots', direction: SORT_STATE_DESCEND }],
});

const convertedRows = computed(() => {
  return convert(unref(rows)).sorted(sort).addIndex(sort.sortTarget).value();
});
const resolveExternalTeamLink = (teamName) => externalTeamLinkResolver(props.externalTeamLink, teamName);
</script>

<template>
  <div>
    <I18NProvider :locale="locale">
      <ErrorNotice v-if="hasError" :error="error" />

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
