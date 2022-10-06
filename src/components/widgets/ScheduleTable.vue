<script setup>
import { useI18n } from '../../composables/useI18n';
import DataTable from '../DataTable.vue';
import { COLUMNS_SCHEDULE } from './internal';

const { t, locale, setLocale } = useI18n();
const msg = t('hello');
</script>

<template>
  {{ msg }}
  {{ locale }}
  <button @click="setLocale(locale === 'en' ? 'hu' : 'en')">EN</button>
  <DataTable :columns="COLUMNS_SCHEDULE"> </DataTable>
</template>
