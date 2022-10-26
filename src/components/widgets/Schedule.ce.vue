<script setup>
import { computed, ref, unref } from 'vue';
import { useAsyncState } from '@vueuse/core';
import dayjs from 'dayjs';
import { fetchVBRData } from '../../composables/useFetchVBRApi';
import { usePage } from '../../composables/usePage';
import { offsetName } from '../../utils/datetime';
import convert from '../../utils/convert';
import { baseProps } from './internal.props';
import ScheduleTable from './ScheduleTable.vue';
import I18NProvider from '../I18NProvider.vue';
import Paginator from '../Paginator.vue';
import ErrorNotice from '../ErrorNotice.vue';
import TimezoneSelector from '../TimezoneSelector.vue';
import { externalGameLinkResolver } from '../../utils/resolvers';

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
});

const locale = computed(() => props.locale);

const {
  state: rows,
  error,
  isLoading,
} = useAsyncState(
  fetchVBRData('/v1/gamesList', props.apiKey, {
    championshipId: props.championshipId,
    division: props.division,
  }),
  []
);

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

const totalItems = computed(() => convertedRows.value?.totalItems);

const onTimezoneChange = (tz) => {
  timezone.value = tz;
};

const resolveExternalGameLink = (gameId) => externalGameLinkResolver(props.externalGameLink, gameId);
</script>

<template>
  <div>
    <I18NProvider :locale="props.locale">
      <ErrorNotice v-if="error?.error" :error="error.message" />

      <TimezoneSelector :locale="props.locale" :current-zone="timezone" @change="onTimezoneChange" />

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

<style src="../../assets/common.css"></style>
<style lang="scss" src="../../assets/table.css"></style>
<style lang="scss" src="../../assets/responsive-table.css"></style>
<style lang="scss" src="../../assets/paginator.css"></style>
<style lang="scss" src="../../assets/dropdown.css"></style>
