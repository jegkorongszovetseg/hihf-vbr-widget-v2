<script setup>
import { computed, unref, ref } from 'vue';
import { useAsyncState } from '@vueuse/core';
import { baseProps, teamStatsProps } from '@mjsz-vbr-elements/core';
import { fetchVBRData, useSort, useErrorProvider } from '@mjsz-vbr-elements/core/composables';
import { SORT_STATE_DESCEND, COLUMNS_SCORING_EFFICIENCY } from '@mjsz-vbr-elements/core';
import { convert, externalTeamLinkResolver } from '@mjsz-vbr-elements/core/utils';
import { StatisticsTable, ErrorNotice, I18NProvider } from '@mjsz-vbr-elements/core/components';

const columns = COLUMNS_SCORING_EFFICIENCY;

const props = defineProps({
  ...baseProps,
  ...teamStatsProps,
});

const tooltipContainer = ref(null);

const { onError, error, hasError } = useErrorProvider();

const locale = computed(() => props.locale);

const { state: rows, isLoading } = useAsyncState(
  () =>
    fetchVBRData('/v2/team-scoring-efficiency', props.apiKey, {
      championshipId: Number(props.championshipId),
      ...(props.division && { division: props.division }),
      ...(props.phaseId && { phaseId: props.phaseId }),
    }),
  [],
  {
    onError: (error) => onError(error),
  }
);

const { sort, change: onSort } = useSort({
  sortTarget: 'sp',
  orders: [{ target: 'sp', direction: SORT_STATE_DESCEND }],
});

const convertedRows = computed(() => {
  return convert(unref(rows)).teamName().sorted(sort).addIndex(sort.sortTarget).value();
});
const resolveExternalTeamLink = (params) =>
  externalTeamLinkResolver(props.externalTeamResolver, { ...params, championshipId: props.championshipId });
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

<style src="@mjsz-vbr-elements/shared/css/common.css"></style>
<style src="@mjsz-vbr-elements/shared/css/table.css"></style>
<style src="@mjsz-vbr-elements/shared/css/responsive-table.css"></style>
<style src="@mjsz-vbr-elements/shared/css/paginator.css"></style>
