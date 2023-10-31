<script setup>
import { computed, ref, unref } from 'vue';
import { useAsyncState } from '@vueuse/core';
import { baseProps, playerStatsProps } from '@mjsz-vbr-elements/core';
import { fetchVBRData, useSort, usePage, useErrorProvider } from '@mjsz-vbr-elements/core/composables';
import {
  convert,
  playerName,
  rawConvert,
  convertTimesMinToMinSec,
  externalTeamLinkResolver,
  externalPlayerLinkResolver,
} from '@mjsz-vbr-elements/core/utils';
import { COLUMNS_GOALIES, SORT_STATE_DESCEND } from '@mjsz-vbr-elements/core';
import { I18NProvider, ErrorNotice, StatisticsTable, Paginator } from '@mjsz-vbr-elements/core/components';

const props = defineProps({
  ...baseProps,
  ...playerStatsProps,

  aboveLimit: {
    type: Boolean,
    default: false,
  },

  underLimit: {
    type: Boolean,
    default: false,
  },
});

const tooltipContainer = ref(null);

const { onError, error, hasError } = useErrorProvider();

const columns = COLUMNS_GOALIES;
const locale = computed(() => props.locale);

const { state: rawRows, isLoading } = useAsyncState(
  () =>
    fetchVBRData('/v2/players-goalie', props.apiKey, {
      championshipId: Number(props.championshipId),
      division: props.division,
      ...(props.aboveLimit && { more: true }),
      ...(props.underLimit && { less: true }),
    }),
  [],
  {
    onError: (error) => onError(error),
  }
);

const { page, change: onPaginatorChange } = usePage();

const { sort, change: onSort } = useSort({
  sortTarget: 'svsPercent',
  orders: [{ target: 'svsPercent', direction: SORT_STATE_DESCEND }],
});

const rows = computed(() => rawConvert(unref(rawRows), playerName, convertTimesMinToMinSec(['mip'])));

const convertedRows = computed(() => {
  return convert(unref(rows))
    .filter(props.teamFilterByName, [['team', 'longName']], true)
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
