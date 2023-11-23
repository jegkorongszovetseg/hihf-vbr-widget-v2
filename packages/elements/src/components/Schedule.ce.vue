<script setup>
import { computed, ref, unref, watch } from 'vue';
import { useAsyncState, useDocumentVisibility, useTimeoutPoll } from '@vueuse/core';
import { useErrorProvider, usePage, fetchVBRData } from '@mjsz-vbr-elements/core/composables';
import {
  convert,
  sortGames,
  getLocalTimezone,
  offsetName,
  externalGameLinkResolver,
} from '@mjsz-vbr-elements/core/utils';
import { REFRESH_DELAY } from '@mjsz-vbr-elements/core';
import {
  I18NProvider,
  Paginator,
  ErrorNotice,
  TimezoneSelector,
  ScheduleTable,
} from '@mjsz-vbr-elements/core/components';
import { baseProps } from '@mjsz-vbr-elements/core';

const props = defineProps({
  ...baseProps,

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

  isTargetExternal: {
    type: Boolean,
    default: false,
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
    fetchVBRData('/v2/games-list', props.apiKey, {
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
  initial: computed(() => props.initialPage),
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

const resolveExternalGameLink = (gameId) => externalGameLinkResolver(props.externalGameLink, { gameId });
const externalGameResolverTarget = computed(() => (props.isTargetExternal ? '_blank' : '_self'));
</script>

<template>
  <div>
    <I18NProvider :locale="props.locale">
      <ErrorNotice v-if="hasError" :error="error" />

      <TimezoneSelector
        v-if="props.timezoneSelector"
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
        :external-game-resolver-target="externalGameResolverTarget"
        :external-game-resolver="resolveExternalGameLink"
      />

      <Paginator
        v-if="props.limit > 0"
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
<style src="@mjsz-vbr-elements/shared/css/dropdown.css"></style>
