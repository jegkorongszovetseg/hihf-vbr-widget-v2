<script setup>
import { computed, unref } from 'vue';
import { useAsyncState } from '@vueuse/core';
import { useSort, useErrorProvider, fetchVBRData } from '@vbr-widget/composables';
import { externalTeamLinkResolver, convert } from '@vbr-widget/utils';
import { COLUMNS_STANDINGS_P_2, COLUMNS_STANDINGS_P_3 } from '@vbr-widget/core';
import { I18NProvider, ErrorNotice, StatisticsTable } from '@vbr-widget/components';
import { baseProps, teamStatsProps } from './internal.props';

const props = defineProps({
  ...baseProps,
  ...teamStatsProps,

  type: {
    type: String,
    default: '3',
    validator: (value) => ['2', '3'].includes(value),
  },
});

const { onError, error, hasError } = useErrorProvider();

const locale = computed(() => props.locale);

const { state: rows, isLoading } = useAsyncState(
  () =>
    fetchVBRData('/v1/standings', props.apiKey, {
      championshipId: Number(props.championshipId),
      division: props.division,
    }),
  [],
  {
    onError: (error) => onError(error),
  }
);

const { sort, change } = useSort();

const convertedRows = computed(() => {
  return convert(unref(rows)).sorted(sort).addContinuousIndex().value();
});

const currentColumns = computed(() => (props.type === '3' ? COLUMNS_STANDINGS_P_3 : COLUMNS_STANDINGS_P_2));

const onSort = (payload) => change(payload);

const resolveExternalTeamLink = (teamName) => externalTeamLinkResolver(props.externalTeamLink, teamName);
</script>

<template>
  <div>
    <I18NProvider :locale="locale">
      <ErrorNotice v-if="hasError" :error="error" />

      <StatisticsTable
        :columns="currentColumns"
        :rows="convertedRows.rows"
        :is-loading="isLoading"
        :hide-columns="hideColumns"
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
