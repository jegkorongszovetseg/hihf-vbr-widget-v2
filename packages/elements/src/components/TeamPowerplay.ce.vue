<script setup>
import { computed, unref } from 'vue';
import { useAsyncState } from '@vueuse/core';
import { baseProps, teamStatsProps } from '@mjsz-vbr-elements/core';
import { fetchVBRData, useSort, useErrorProvider } from '@mjsz-vbr-elements/core/composables';
import { convert, convertTimes, rawConvert, externalTeamLinkResolver } from '@mjsz-vbr-elements/core/utils';
import { SORT_STATE_DESCEND, COLUMNS_TEAMS_POWERPLAY } from '@mjsz-vbr-elements/core';
import { I18NProvider, ErrorNotice, StatisticsTable } from '@mjsz-vbr-elements/core/components';

const props = defineProps({
  ...baseProps,
  ...teamStatsProps,
});

const { onError, error, hasError } = useErrorProvider();

const columns = COLUMNS_TEAMS_POWERPLAY;
const locale = computed(() => props.locale);

const { state: rawRows, isLoading } = useAsyncState(
  () =>
    fetchVBRData('/v1/teamPowerPlayPeriod', props.apiKey, {
      championshipId: Number(props.championshipId),
      division: props.division,
    }),
  [],
  {
    onError: (error) => onError(error),
  }
);

const { sort, change: onSort } = useSort({
  sortTarget: 'ppPercent',
  orders: [{ target: 'ppPercent', direction: SORT_STATE_DESCEND }],
});

const rows = computed(() => rawConvert(unref(rawRows), convertTimes(['advTime', 'advTimePP1', 'advTimePP2'])));

const convertedRows = computed(() => {
  return convert(unref(rows)).sorted(sort).addIndex(sort.sortTarget).value();
});
const resolveExternalTeamLink = (teamName) => externalTeamLinkResolver(props.externalTeamLink, teamName);
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
        @sort="onSort"
      />
    </I18NProvider>
  </div>
</template>

<style src="@mjsz-vbr-elements/shared/css/common.css"></style>
<style src="@mjsz-vbr-elements/shared/css/table.css"></style>
<style src="@mjsz-vbr-elements/shared/css/responsive-table.css"></style>
<style src="@mjsz-vbr-elements/shared/css/paginator.css"></style>