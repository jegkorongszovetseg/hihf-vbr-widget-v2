<script setup>
import { baseProps, COLUMNS_STANDINGS_P_2, COLUMNS_STANDINGS_P_3, teamStatsProps } from '@mjsz-vbr-elements/core';
import { AdditionalStandingsText, ErrorNotice, I18NProvider, StatisticsTable } from '@mjsz-vbr-elements/core/components';
import { fetchVBRData, useErrorProvider, useSort } from '@mjsz-vbr-elements/core/composables';
import { convert, externalTeamLinkResolver } from '@mjsz-vbr-elements/core/utils';
import { useAsyncState } from '@vueuse/core';
import { computed, ref, unref } from 'vue';

const props = defineProps({
  ...baseProps,
  ...teamStatsProps,

  type: {
    type: String,
    default: '3',
    validator: value => ['2', '3'].includes(value),
  },
});

const tooltipContainer = ref(null);

const { onError, error, hasError } = useErrorProvider();

const locale = computed(() => props.locale);

const { state: rows, isLoading } = useAsyncState(
  () =>
    fetchVBRData('/v2/standings', props.apiKey, {
      championshipId: Number(props.championshipId),
      ...(props.division && { division: props.division }),
      ...(props.phaseId && { phaseId: props.phaseId }),
    }),
  [],
  {
    onError: error => onError(error),
  },
);

const { sort, change } = useSort();

const convertedRows = computed(() => {
  return convert(unref(rows)).teamName().sorted(sort).addContinuousIndex().value();
});

const currentColumns = computed(() => (props.type === '3' ? COLUMNS_STANDINGS_P_3 : COLUMNS_STANDINGS_P_2));

const onSort = payload => change(payload);

function resolveExternalTeamLink(params) {
  return externalTeamLinkResolver(props.externalTeamResolver, { ...params, championshipId: props.championshipId });
}
</script>

<template>
  <div>
    <I18NProvider :locale="locale">
      <ErrorNotice v-if="hasError" :error="error" />

      <StatisticsTable
        :columns="currentColumns"
        :rows="convertedRows.rows"
        :is-loading="isLoading"
        :hide-columns="props.hideColumns"
        :sort="sort"
        :external-team-resolver="resolveExternalTeamLink"
        :is-team-linked="isTeamLinked"
        :append-to="tooltipContainer"
        @sort="onSort"
      >
        <template #caption>
          <AdditionalStandingsText :rows="convertedRows.rows" additional-key="inheritedPoints" />
          <AdditionalStandingsText :rows="convertedRows.rows" additional-key="penaltyPoints" />
        </template>
      </StatisticsTable>

      <div ref="tooltipContainer" />
    </I18NProvider>
  </div>
</template>

<style src="@mjsz-vbr-elements/shared/css/core.css" />

<style src="@mjsz-vbr-elements/shared/css/components/responsive-table.css" />

<style src="@mjsz-vbr-elements/shared/css/components/table.css" />

<style src="@mjsz-vbr-elements/shared/css/components/floating-content.css" />

<style src="@mjsz-vbr-elements/shared/css/components/error-notice.css" />
