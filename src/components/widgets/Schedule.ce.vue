<script setup>
import { computed, ref, unref, watch } from 'vue';
import { useAsyncState, useDocumentVisibility, useTimeoutPoll } from '@vueuse/core';
import dayjs from 'dayjs';
import { fetchVBRData } from '../../composables/useFetchVBRApi';
import { usePage } from '../../composables/usePage';
import { useErrorProvider } from '../../composables/useErrors';
import { offsetName } from '../../utils/datetime';
import convert, { sortGames } from '../../utils/convert';
import { baseProps } from './internal.props';
import { externalGameLinkResolver } from '../../utils/resolvers';
import { REFRESH_DELAY } from '../../@shared/constantsonstants';
import ScheduleTable from './ScheduleTable.vue';
import I18NProvider from '../I18NProvider.vue';
import Paginator from '../Paginator.vue';
import ErrorNotice from '../ErrorNotice.vue';
import TimezoneSelector from '../TimezoneSelector.vue';

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
const timezone = ref(dayjs.tz.guess());
const currentOffsetName = offsetName(new Date(), unref(timezone), props.locale);

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
        :is-loading="isLoading && convertedRows.rows.length > 0"
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

<style src="@/assets/common.css"></style>
<style src="@/assets/table.css"></style>
<style src="@/assets/responsive-table.css"></style>
<style src="@/assets/paginator.css"></style>
<style src="@/assets/dropdown.css"></style>
