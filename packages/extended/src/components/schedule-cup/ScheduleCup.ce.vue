<script setup>
import {
  ErrorNotice,
  ErrorProvider,
  I18NProvider,
  ResponsiveTable,
  DataTable,
} from '@mjsz-vbr-elements/core/components';
import SeasonSelector from '../common-components/SeasonSelector.vue';
import DataProvider from './DataProvider.vue';
import { COLUMNS_SCHEDULE } from './schedule-cup.internal';

const props = defineProps({
  locale: {
    type: String,
    default: 'hu',
  },

  apiKey: {
    type: String,
    default: '',
  },

  championshipName: {
    type: String,
    default: '',
  },

  timezoneSelector: {
    type: Boolean,
    default: false,
  },
});

const messages = {};
</script>
<template>
  <I18NProvider :locale="props.locale" :messages="messages">
    <ErrorProvider v-slot:default="{ error, hasError }">
      <ErrorNotice v-if="hasError" :error="error" />

      <DataProvider :championship-name="championshipName" v-slot="state">
        <SeasonSelector v-bind="state" />
      </DataProvider>

      CUP
      <ResponsiveTable>
        <DataTable :columns="COLUMNS_SCHEDULE"></DataTable>
      </ResponsiveTable>
    </ErrorProvider>
  </I18NProvider>
</template>
