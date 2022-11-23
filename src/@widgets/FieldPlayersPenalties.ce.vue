<script setup>
import { computed, unref } from 'vue';
import { useAsyncState } from '@vueuse/core';
import { baseProps, playerStatsProps } from './internal.props';
import { SORT_STATE_DESCEND, COLUMNS_FIELD_PLAYERS_PENALTY } from '@VbrWidget/core';
import { convert, playerName, rawConvert, externalPlayerLinkResolver, externalTeamLinkResolver } from '@VbrWidget/utils';
import { useErrorProvider, usePage, useSort, fetchVBRData } from '@VbrWidget/composables';
import { I18NProvider, ErrorNotice, StatisticsTable, Paginator}  from '@VbrWidget/components';

const props = defineProps({
  ...baseProps,
  ...playerStatsProps,
});

const columns = COLUMNS_FIELD_PLAYERS_PENALTY;
const locale = computed(() => props.locale);

const { onError, error, hasError } = useErrorProvider();

const { state: rawRows, isLoading } = useAsyncState(
  () =>
    fetchVBRData('/v1/playersPenaltyPeriod', props.apiKey, {
      championshipId: Number(props.championshipId),
      division: props.division,
    }),
  [],
  {
    onError: (error) => onError(error),
  }
);

const { page, change: onPaginatorChange } = usePage();

const { sort, change: onSort } = useSort({
  sortTarget: 'pim',
  orders: [{ target: 'pim', direction: SORT_STATE_DESCEND }],
});

const rows = computed(() => rawConvert(unref(rawRows), playerName));

const convertedRows = computed(() => {
  return convert(unref(rows))
    .filter(props.teamFilterByName, ['teamName'])
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

<style lang="postcss" src="../assets/common.css"></style>
<style lang="postcss" src="../assets/table.css"></style>
<style lang="postcss" src="../assets/responsive-table.css"></style>
<style lang="postcss" src="../assets/paginator.css"></style>
