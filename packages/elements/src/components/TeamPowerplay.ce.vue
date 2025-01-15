<script setup>
import { baseProps, COLUMNS_TEAMS_POWERPLAY, SORT_STATE_DESCEND, teamStatsProps } from '@mjsz-vbr-elements/core';
import { ErrorNotice, I18NProvider, StatisticsTable } from '@mjsz-vbr-elements/core/components';
import { fetchVBRData, useErrorProvider, useSort } from '@mjsz-vbr-elements/core/composables';
import { convert, convertTimesSecToMin, externalTeamLinkResolver, rawConvert } from '@mjsz-vbr-elements/core/utils';
import { useAsyncState } from '@vueuse/core';
import { computed, ref, unref } from 'vue';

const props = defineProps({
  ...baseProps,
  ...teamStatsProps,
});

const tooltipContainer = ref(null);

const { onError, error, hasError } = useErrorProvider();

const columns = COLUMNS_TEAMS_POWERPLAY;
const locale = computed(() => props.locale);

const { state: rawRows, isLoading } = useAsyncState(
  () =>
    fetchVBRData('/v2/team-powerplay', props.apiKey, {
      championshipId: Number(props.championshipId),
      ...(props.division && { division: props.division }),
      ...(props.phaseId && { phaseId: props.phaseId }),
    }),
  [],
  {
    onError: error => onError(error),
  },
);

const { sort, change: onSort } = useSort({
  sortTarget: 'ppPercent',
  orders: [{ target: 'ppPercent', direction: SORT_STATE_DESCEND }],
});

const rows = computed(() => rawConvert(unref(rawRows), convertTimesSecToMin(['advTime', 'advTimePP1', 'advTimePP2'])));

const convertedRows = computed(() => {
  return convert(unref(rows)).teamName().sorted(sort).addIndex(sort.sortTarget).value();
});
function resolveExternalTeamLink(params) {
  return externalTeamLinkResolver(props.externalTeamResolver, { ...params, championshipId: props.championshipId });
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
        :is-team-linked="isTeamLinked"
        :append-to="tooltipContainer"
        @sort="onSort"
      />

      <div ref="tooltipContainer" />
    </I18NProvider>
  </div>
</template>

<style src="@mjsz-vbr-elements/shared/css/common.scss"></style>

<style src="@mjsz-vbr-elements/shared/css/table.css"></style>

<style src="@mjsz-vbr-elements/shared/css/responsive-table.css"></style>

<style src="@mjsz-vbr-elements/shared/css/paginator.css"></style>
