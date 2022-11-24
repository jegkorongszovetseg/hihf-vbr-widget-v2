<script setup>
import { computed, unref } from 'vue';
import { useAsyncState } from '@vueuse/core';
import { baseProps, teamStatsProps } from '@vbr-widget/core';
import { fetchVBRData, useSort, useErrorProvider } from '@vbr-widget/composables';
import { convert, externalTeamLinkResolver } from '@vbr-widget/utils';
import { SORT_STATE_DESCEND, COLUMNS_TEAM_ATTENDANCE } from '@vbr-widget/core';
import { I18NProvider, ErrorNotice, StatisticsTable } from '@vbr-widget/components';

const props = defineProps({
  ...baseProps,
  ...teamStatsProps,
});

const { onError, error, hasError } = useErrorProvider();

const columns = COLUMNS_TEAM_ATTENDANCE;
const locale = computed(() => props.locale);

const { state: rows, isLoading } = useAsyncState(
  () =>
    fetchVBRData('/v1/teamAttendancePeriod', props.apiKey, {
      championshipId: Number(props.championshipId),
      division: props.division,
    }),
  [],
  {
    onError: (error) => onError(error),
  }
);

const { sort, change: onSort } = useSort({
  sortTarget: 'totalAttendanceAvg',
  orders: [{ target: 'totalAttendanceAvg', direction: SORT_STATE_DESCEND }],
});

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

<style lang="postcss" src="../assets/common.css"></style>
<style lang="postcss" src="../assets/table.css"></style>
<style lang="postcss" src="../assets/responsive-table.css"></style>
<style lang="postcss" src="../assets/paginator.css"></style>
