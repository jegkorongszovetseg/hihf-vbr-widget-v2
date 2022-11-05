<script setup>
import { computed, unref, watch } from 'vue';
import { useAsyncState } from '@vueuse/core';
import { fetchVBRData } from '../../composables/useFetchVBRApi';
import useSort from '../../composables/useSort';
import { usePage } from '../../composables/usePage';
import convert, { convertTimes, playerName, rawConvert } from '../../utils/convert';
import { COLUMNS_GOALIES } from './internal';
import { SORT_STATE_DESCEND, VBR_API_GOALIE_PATH, VBR_API_GOALIE_UNDER_PATH } from '../../constants';
import { baseProps, playerStatsProps } from './internal.props';
import { externalPlayerLinkResolver, externalTeamLinkResolver } from '../../utils/resolvers';
import I18NProvider from '../I18NProvider.vue';
import ErrorNotice from '../ErrorNotice.vue';
import StatisticsTable from './StatisticsTable.vue';
import Paginator from '../Paginator.vue';
import { useErrorProvider } from '../../composables/useErrors';

const props = defineProps({
  ...baseProps,
  ...playerStatsProps,

  underLimit: {
    type: Boolean,
    default: false,
  },
});

const { onError, error, hasError } = useErrorProvider();

const columns = COLUMNS_GOALIES;
const locale = computed(() => props.locale);
const apiPath = computed(() => (props.underLimit ? VBR_API_GOALIE_UNDER_PATH : VBR_API_GOALIE_PATH));

const {
  state: rawRows,
  error: apiError,
  isLoading,
} = useAsyncState(
  fetchVBRData(apiPath, props.apiKey, {
    championshipId: Number(props.championshipId),
    division: props.division,
  }),
  []
);
watch(apiError, (error) => onError(error));

const { page, change: onPaginatorChange } = usePage();

const { sort, change: onSort } = useSort({
  sortTarget: 'svsPercent',
  orders: [{ target: 'svsPercent', direction: SORT_STATE_DESCEND }],
});

const rows = computed(() => rawConvert(unref(rawRows), playerName, convertTimes(['mip'])));

const convertedRows = computed(() => {
  return convert(unref(rows))
    .filter(props.teamFilterByName, ['teamName'])
    .playerName()
    .sorted(sort)
    .addIndex(sort.sortTarget)
    .pagination(unref(page), props.limit)
    .value();
});

const totalItems = computed(() => convertedRows.value?.totalItems);

const resolveExternalTeamLink = (teamName) => externalTeamLinkResolver(props.externalTeamLink, teamName);
const resolveExternalPlayerLink = (playerId) => externalPlayerLinkResolver(props.externalPlayerLink, playerId);
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
        :external-player-resolver="resolveExternalPlayerLink"
        :is-team-linked="isTeamLinked"
        :is-player-linked="isPlayerLinked"
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
<style lang="css" src="../../assets/paginator.css"></style>
