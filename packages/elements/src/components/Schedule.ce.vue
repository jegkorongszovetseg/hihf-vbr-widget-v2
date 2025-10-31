<script setup>
import { baseProps, gameProps, playerStatsProps, REFRESH_DELAY, teamStatsProps } from '@mjsz-vbr-elements/core';
import {
  ErrorNotice,
  I18NProvider,
  Paginator,
  ScheduleTable,
  TimezoneSelector,
} from '@mjsz-vbr-elements/core/components';
import { fetchVBRData, useErrorProvider, usePage } from '@mjsz-vbr-elements/core/composables';
import {
  convert,
  externalGameLinkResolver,
  getLocalTimezone,
  offsetName,
  pick,
  sortGames,
} from '@mjsz-vbr-elements/core/utils';
import { useAsyncState, useDocumentVisibility, useTimeoutPoll } from '@vueuse/core';
import { computed, ref, unref, watch } from 'vue';

const props = defineProps({
  ...baseProps,

  ...pick(['limit'], playerStatsProps),

  ...teamStatsProps,

  ...gameProps,

  initialPage: {
    type: Number,
    default: 1,
    validator: value => value >= 1,
  },

  autoInitialPage: {
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
      ...(props.division && { division: props.division }),
      ...(props.phaseId && { phaseId: props.phaseId }),
    }),
  [],
  {
    resetOnExecute: false,
    immediate: !props.autoRefresh,
    onError: (error) => {
      onError(error);
      // eslint-disable-next-line ts/no-use-before-define
      pause?.();
    },
  },
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
    if (visible === 'visible')
      return resume();
    pause();
  });
}

const totalItems = computed(() => convertedRows.value?.totalItems);

function onTimezoneChange(tz) {
  timezone.value = tz;
}

const resolveExternalGameLink = gameId => externalGameLinkResolver(props.externalGameResolver, { gameId });
const externalGameResolverTarget = computed(() => (props.isGameTargetExternal ? '_blank' : '_self'));
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

<style src="@mjsz-vbr-elements/shared/css/core.css" />

<style src="@mjsz-vbr-elements/shared/css/components/floating-content.css" />

<style src="@mjsz-vbr-elements/shared/css/components/paginator.css" />

<style src="@mjsz-vbr-elements/shared/css/components/responsive-table.css" />

<style src="@mjsz-vbr-elements/shared/css/components/table.css" />

<style src="@mjsz-vbr-elements/shared/css/components/timezone-selector.css" />

<style src="@mjsz-vbr-elements/shared/css/components/icon-button.css" />

<!-- <style src="@mjsz-vbr-elements/shared/css/common.scss" lang="scss"></style> -->

<!-- <style src="@mjsz-vbr-elements/shared/css/table.scss" lang="scss"></style> -->

<!-- <style src="@mjsz-vbr-elements/shared/css/responsive-table.scss" lang="scss"></style> -->

<!-- <style src="@mjsz-vbr-elements/shared/css/paginator.scss" lang="scss"></style> -->

<!-- <style src="@mjsz-vbr-elements/shared/css/dropdown.scss" lang="scss"></style> -->
