<script setup>
import { computed, ref, unref } from 'vue';
import { useAsyncState } from '@vueuse/core';
import { useSort, fetchVBRData, usePage, useErrorProvider } from '@mjsz-vbr-elements/core/composables';
import {
  convert,
  teamName,
  playerName,
  rawConvert,
  convertTimesSecToMin,
  externalTeamLinkResolver,
  externalPlayerLinkResolver,
} from '@mjsz-vbr-elements/core/utils';
import { SORT_STATE_DESCEND } from '@mjsz-vbr-elements/core';
import { COLUMNS_FIELD_PLAYERS_TOI } from '@mjsz-vbr-elements/core/columns';
import { baseProps, playerStatsProps, teamStatsProps } from '@mjsz-vbr-elements/core';
import { I18NProvider, ErrorNotice, StatisticsTable, Paginator } from '@mjsz-vbr-elements/core/components';

const columns = COLUMNS_FIELD_PLAYERS_TOI;

const props = defineProps({
  ...baseProps,
  ...playerStatsProps,
  ...teamStatsProps,
});

const tooltipContainer = ref(null);

const locale = computed(() => props.locale);

const { onError, error, hasError } = useErrorProvider();

const { state: rawRows, isLoading } = useAsyncState(
  () =>
    fetchVBRData('/v2/players-toi', props.apiKey, {
      championshipId: Number(props.championshipId),
      ...(props.division && { division: props.division }),
      ...(props.phaseId && { phaseId: props.phaseId }),
    }),
  [],
  {
    onError: (error) => onError(error),
  }
);

const { page, change: onPaginatorChange } = usePage();

const { sort, change: onSort } = useSort({
  sortTarget: 'toi',
  orders: [{ target: 'toi', direction: SORT_STATE_DESCEND }],
});

const rows = computed(() =>
  rawConvert(
    unref(rawRows),
    playerName,
    teamName,
    convertTimesSecToMin([
      'toi',
      'atoi',
      'eqToi',
      'pp1Toi',
      'pp2Toi',
      'sh1Toi',
      'sh2Toi',
      'eqAToi',
      'pp1AToi',
      'pp2AToi',
      'sh1AToi',
      'sh2AToi',
    ])
  )
);

const convertedRows = computed(() => {
  return convert(unref(rows))
    .filter(props.teamFilterByName, ['teamName'])
    .sorted(sort)
    .addIndex(sort.sortTarget)
    .pagination(unref(page), props.limit)
    .value();
});

const totalItems = computed(() => convertedRows.value?.totalItems);

const resolveExternalTeamLink = (params) =>
  externalTeamLinkResolver(props.externalTeamResolver, { ...params, championshipId: props.championshipId });
const resolveExternalPlayerLink = (params) =>
  externalPlayerLinkResolver(props.externalPlayerResolver, { ...params, championshipId: props.championshipId });
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

<style src="@mjsz-vbr-elements/shared/css/common.css"></style>
<style src="@mjsz-vbr-elements/shared/css/table.css"></style>
<style src="@mjsz-vbr-elements/shared/css/responsive-table.css"></style>
<style src="@mjsz-vbr-elements/shared/css/paginator.css"></style>
