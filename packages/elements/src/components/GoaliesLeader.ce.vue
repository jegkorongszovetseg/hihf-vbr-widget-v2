<script setup>
import { computed, unref } from 'vue';
import { useAsyncState } from '@vueuse/core';
import { baseProps, playerStatsProps } from '@mjsz-vbr-elements/core';
import { fetchVBRData, useSort, usePage, useErrorProvider } from '@mjsz-vbr-elements/core/composables';
import {
  convert,
  convertTimes,
  playerName,
  rawConvert,
  externalPlayerLinkResolver,
  externalTeamLinkResolver,
} from '@mjsz-vbr-elements/core/utils';
import { COLUMNS_GOALIES, SORT_STATE_DESCEND, VBR_API_GOALIE_PATH, VBR_API_GOALIE_UNDER_PATH } from '@mjsz-vbr-elements/core';
import { I18NProvider, ErrorNotice, StatisticsTable, Paginator } from '@mjsz-vbr-elements/core/components';

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

const { state: rawRows, isLoading } = useAsyncState(
  () =>
    fetchVBRData(apiPath, props.apiKey, {
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

<style src="@mjsz-vbr-elements/shared/css/common.css"></style>
<style src="@mjsz-vbr-elements/shared/css/table.css"></style>
<style src="@mjsz-vbr-elements/shared/css/responsive-table.css"></style>
<style src="@mjsz-vbr-elements/shared/css/paginator.css"></style>
