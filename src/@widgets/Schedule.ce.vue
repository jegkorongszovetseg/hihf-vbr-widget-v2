<script setup>
import { computed, ref, unref, watch } from 'vue';
import { useAsyncState, useDocumentVisibility, useTimeoutPoll } from '@vueuse/core';
import { useErrorProvider, usePage, fetchVBRData } from '@vbr-widget/composables';
import { convert, sortGames, getLocalTimezone, offsetName, externalGameLinkResolver } from '@vbr-widget/utils';
import { REFRESH_DELAY } from '@vbr-widget/core';
import { I18NProvider, Paginator, ErrorNotice, TimezoneSelector } from '@vbr-widget/components';
import { baseProps } from './internal.props';
import ScheduleTable from './ScheduleTable.vue';

const props = defineProps({
  ...baseProps,

  pagination: {
    type: Boolean,
    default: true,
  },

  limit: {
    type: Number,
    default: 20,
  },

  teamFilterByName: {
    type: String,
    default: '',
  },

  initialPage: {
    type: Number,
    default: 1,
    validator: (value) => value >= 1,
  },

  autoInitialPage: {
    type: Boolean,
    default: false,
  },

  externalGameLink: {
    type: [String, Function],
    default: '',
  },

  timezoneSelector: {
    type: Boolean,
    default: false,
  },

  autoRefresh: {
    type: Boolean,
    default: false,
  },
});

const { onError, error, hasError } = useErrorProvider();

const locale = computed(() => props.locale);

const {
  state: rawRows,
  isLoading,
  execute,
} = useAsyncState(
  () =>
    fetchVBRData('/v1/gamesList', props.apiKey, {
      championshipId: props.championshipId,
      division: props.division,
    }),
  [],
  {
    resetOnExecute: false,
    immediate: !props.autoRefresh,
    onError: (error) => {
      onError(error);
      pause?.();
    },
  }
);

const rows = computed(() => sortGames(rawRows.value));

const { pause, resume } = useTimeoutPoll(execute, REFRESH_DELAY, { immediate: false });

const { page, change: onPaginatorChange } = usePage({
  initial: props.initialPage,
  items: rows,
  limit: props.limit,
  auto: props.autoInitialPage,
});

const timezone = ref(getLocalTimezone());
const currentOffsetName = computed(() => offsetName(new Date(), unref(timezone), props.locale));

const convertedRows = computed(() => {
  return convert(unref(rows))
    .filter(props.teamFilterByName, ['homeTeamName', 'awayTeamName'])
    .schedule(unref(timezone), unref(locale))
    .pagination(unref(page), props.limit)
    .value();
});

if (props.autoRefresh) {
  resume();
  const visibility = useDocumentVisibility();
  watch(visibility, (visible) => {
    if (visible === 'visible') return resume();
    pause();
  });
}

const totalItems = computed(() => convertedRows.value?.totalItems);

const onTimezoneChange = (tz) => {
  timezone.value = tz;
};

const resolveExternalGameLink = (gameId) => externalGameLinkResolver(props.externalGameLink, gameId);
</script>

<template>
  <div>
    <I18NProvider :locale="props.locale">
      <ErrorNotice v-if="hasError" :error="error" />

      <TimezoneSelector
        v-if="timezoneSelector"
        :key="props.locale"
        :locale="props.locale"
        :current-zone="timezone"
        @change="onTimezoneChange"
      />

      <ScheduleTable
        :rows="convertedRows.rows"
        :is-loading="isLoading"
        :offset-name="currentOffsetName"
        :hide-columns="props.hideColumns"
        :external-game-resolver="resolveExternalGameLink"
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

<style src="../assets/common.css"></style>
<style src="../assets/table.css"></style>
<style src="../assets/responsive-table.css"></style>
<style src="../assets/paginator.css"></style>
<style src="../assets/dropdown.css"></style>
