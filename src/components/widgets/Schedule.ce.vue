<script setup>
import { computed, ref, unref } from 'vue';
import { useAsyncState } from '@vueuse/core';
import dayjs from 'dayjs';
import { fetchVBRData } from '../../composables/useFetchVBRApi';
// import { useI18n } from '../../composables/useI18n';
import convert from '../../utils/convert';
import ScheduleTable from './ScheduleTable.vue';
import I18NProvider from '../I18NProvider.vue';

const props = defineProps({
  locale: {
    type: String,
    default: 'hu',
  },

  championshipId: {
    type: String,
    default: '3314',
  },

  division: {
    type: String,
    default: 'Alapszakasz',
  },

  apiKey: {
    type: String,
    default: '7b4f4d1b466b5a3572990ae24452abf2a086e7ee',
  },

  pagination: {
    type: Boolean,
    default: true,
  },

  limit: {
    type: Number,
    default: 20,
  },
});

const locale = computed(() => props.locale);

const {
  state: rows,
  error,
  isLoading,
} = useAsyncState(
  fetchVBRData('/v1/gamesList', props.apiKey, {
    championshipId: Number(props.championshipId),
    division: props.division,
  })
);

const page = ref(1);
const timezone = dayjs.tz.guess();

const convertedRows = computed(() => {
  return convert(unref(rows)).schedule(timezone, unref(locale)).pagination(unref(page), props.limit).value();
});

// const { t, locale: i18nlocale } = useI18n({ useGlobal: true});
// const msg = t('table.gameDateTime.short', { offsetName: 'CET' });
</script>
<template>
  <div>
    <I18NProvider :locale="locale">
      <!-- {{ msg }}
      {{ locale }}
      <button @click="i18nlocale = locale === 'en' ? 'hu' : 'en'">{{ locale === 'en' ? 'hu' : 'en' }}</button> -->
      <div v-if="error?.error">{{ error.message }}</div>
      <ScheduleTable v-else :rows="convertedRows.rows" :is-loading="isLoading"></ScheduleTable>
    </I18NProvider>
  </div>
</template>
