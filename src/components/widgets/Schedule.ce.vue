<script setup>
import { computed, ref, unref } from 'vue';
import { useAsyncState } from '@vueuse/core';
import dayjs from 'dayjs';
import { fetchVBRData } from '../../composables/useFetchVBRApi';
// import { useI18n } from '../../composables/useI18n';
import convert from '../../utils/convert';
import ScheduleTable from './ScheduleTable.vue';
import I18NProvider from '../I18NProvider.vue';
import Paginator from '../Paginator.vue';
import FloatingPanel from '../FloatingPanel.vue';

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
  }),
  []
);

const page = ref(1);
const timezone = dayjs.tz.guess();

const convertedRows = computed(() => {
  return convert(unref(rows)).schedule(timezone, unref(locale)).pagination(unref(page), props.limit).value();
});

const localLocale = ref('en');

const onPaginatorChange = (value) => {
  page.value = value;
};
</script>

<template>
  <div id="widget-schedule">
    <I18NProvider :locale="localLocale">
      <!-- <button @click="localLocale = localLocale === 'en' ? 'hu' : 'en'">
        {{ localLocale === 'en' ? 'hu' : 'en' }}
      </button> -->
      <div v-if="error?.error">{{ error.message }}</div>

      <FloatingPanel placement="top">
        <template v-slot:default="{ setRef, show, hide }">
          <button :ref="(el) => setRef(el)" @mouseenter="show" @mouseleave="hide" @focus="show" @blur="hide">
            Reference
          </button>
        </template>
        <template v-slot:content>
          <div>asdasdasdasd</div>
        </template>
      </FloatingPanel>

      <ScheduleTable :rows="convertedRows.rows" :is-loading="isLoading"></ScheduleTable>

      <Paginator
        :page="page"
        :items-per-page="props.limit"
        :total-items="rows.length"
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
