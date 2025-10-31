<script setup>
import { baseProps, COLUMNS_GOALIES, playerStatsProps, SORT_STATE_DESCEND, teamStatsProps } from '@mjsz-vbr-elements/core';
import { ErrorNotice, I18NProvider, Paginator, StatisticsTable } from '@mjsz-vbr-elements/core/components';
import { fetchVBRData, useErrorProvider, usePage, useSort } from '@mjsz-vbr-elements/core/composables';
import {
  convert,
  convertTimesMinToMinSec,
  externalPlayerLinkResolver,
  externalTeamLinkResolver,
  playerName,
  rawConvert,
} from '@mjsz-vbr-elements/core/utils';
import { useAsyncState } from '@vueuse/core';
import { computed, ref, unref } from 'vue';

const props = defineProps({
  ...baseProps,
  ...playerStatsProps,
  ...teamStatsProps,

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
      ...(props.division && { division: props.division }),
      ...(props.phaseId && { phaseId: props.phaseId }),
      ...(props.aboveLimit && { more: true }),
      ...(props.underLimit && { less: true }),
    }),
  [],
  {
    onError: error => onError(error),
  },
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

<style src="@mjsz-vbr-elements/shared/css/core.css" />

<style src="@mjsz-vbr-elements/shared/css/components/floating-content.css" />

<style src="@mjsz-vbr-elements/shared/css/components/paginator.css" />

<style src="@mjsz-vbr-elements/shared/css/components/responsive-table.css" />

<style src="@mjsz-vbr-elements/shared/css/components/table.css" />

<style src="@mjsz-vbr-elements/shared/css/components/avatar.css" />

<!-- <style src="@mjsz-vbr-elements/shared/css/common.scss" lang="scss"></style> -->

<!-- <style src="@mjsz-vbr-elements/shared/css/table.scss" lang="scss"></style> -->

<!-- <style src="@mjsz-vbr-elements/shared/css/responsive-table.scss" lang="scss"></style> -->

<!-- <style src="@mjsz-vbr-elements/shared/css/paginator.scss" lang="scss"></style> -->
