<script setup>
import { baseProps, playerStatsProps, SORT_STATE_DESCEND, teamStatsProps } from '@mjsz-vbr-elements/core';
import { COLUMNS_FIELD_PLAYERS } from '@mjsz-vbr-elements/core/columns';
import { ErrorNotice, I18NProvider, Paginator, StatisticsTable } from '@mjsz-vbr-elements/core/components';
import { fetchVBRData, useErrorProvider, usePage, useSort } from '@mjsz-vbr-elements/core/composables';
import {
  convert,
  externalPlayerLinkResolver,
  externalTeamLinkResolver,
  playerName,
  rawConvert,
  teamName,
} from '@mjsz-vbr-elements/core/utils';
import { useAsyncState } from '@vueuse/core';
import { computed, ref, unref } from 'vue';

const props = defineProps({
  ...baseProps,
  ...playerStatsProps,
  ...teamStatsProps,
});

const tooltipContainer = ref(null);

const columns = COLUMNS_FIELD_PLAYERS;
const locale = computed(() => props.locale);

const { onError, error, hasError } = useErrorProvider();

const { state: rawRows, isLoading } = useAsyncState(
  () =>
    fetchVBRData('/v2/players-stats', props.apiKey, {
      championshipId: Number(props.championshipId),
      ...(props.division && { division: props.division }),
      ...(props.phaseId && { phaseId: props.phaseId }),
    }),
  [],
  {
    onError: error => onError(error),
  },
);

const { page, change: onPaginatorChange } = usePage();

const { sort, change: onSort } = useSort({
  sortTarget: 'points',
  orders: [{ target: 'points', direction: SORT_STATE_DESCEND }],
});

const rows = computed(() => rawConvert(unref(rawRows), playerName, teamName));

const convertedRows = computed(() => {
  return convert(unref(rows))
    .filter(props.teamFilterByName, ['teamName'])
    .sorted(sort)
    .addIndex(sort.sortTarget)
    .pagination(unref(page), props.limit)
    .value();
});

const totalItems = computed(() => convertedRows.value?.totalItems);

function resolveExternalTeamLink(params) {
  return externalTeamLinkResolver(props.externalTeamResolver, { ...params, championshipId: props.championshipId });
}
function resolveExternalPlayerLink(params) {
  return externalPlayerLinkResolver(props.externalPlayerResolver, { ...params, championshipId: props.championshipId });
}
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
        :append-to="tooltipContainer"
        @sort="onSort"
      />

      <Paginator
        :page="page"
        :items-per-page="props.limit"
        :total-items="totalItems"
        :range-length="5"
        @change="onPaginatorChange"
      />
      <div ref="tooltipContainer" />
    </I18NProvider>
  </div>
</template>

<style src="@mjsz-vbr-elements/shared/css/common.scss" lang="scss"></style>

<style src="@mjsz-vbr-elements/shared/css/table.scss" lang="scss"></style>

<style src="@mjsz-vbr-elements/shared/css/responsive-table.scss" lang="scss"></style>

<style src="@mjsz-vbr-elements/shared/css/paginator.scss" lang="scss"></style>
