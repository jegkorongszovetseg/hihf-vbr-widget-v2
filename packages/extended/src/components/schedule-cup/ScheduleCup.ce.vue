<script setup>
import { computed, ref } from 'vue';
import { ErrorNotice, ErrorProvider, I18NProvider } from '@mjsz-vbr-elements/core/components';
import { getLocalTimezone, offsetName } from '@mjsz-vbr-elements/core/utils';
import SeasonSelector from '../common-components/SeasonSelector.vue';
import DataProvider from './DataProvider.vue';
import ScheduleCupDataTable from './ScheduleCupDataTable.vue';
import { COLUMNS_SCHEDULE } from './schedule-cup.internal';
import en from '../../locales/en.json';
import hu from '../../locales/hu.json';

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

  // timezoneSelector: {
  //   type: Boolean,
  //   default: false,
  // },
});

const messages = { en, hu };

const timezone = ref(getLocalTimezone());
const currentOffsetName = computed(() => offsetName(new Date(), timezone.value, props.locale));
</script>
<template>
  <I18NProvider :locale="props.locale" :messages="messages">
    <ErrorProvider v-slot:default="{ error, hasError }">
      <ErrorNotice v-if="hasError" :error="error" />

      <DataProvider
        :championship-name="championshipName"
        :locale="locale"
        :timezone="timezone"
        v-slot="{ rows, isLoading, values, listeners }"
      >
        <SeasonSelector v-bind="values" v-on="listeners" />

        <ScheduleCupDataTable
          :columns="COLUMNS_SCHEDULE"
          :rows="rows.rows"
          :is-loading="isLoading"
          :offset-name="currentOffsetName"
        />
      </DataProvider>
    </ErrorProvider>
  </I18NProvider>
</template>

<style src="@mjsz-vbr-elements/shared/css/common.css"></style>
<style src="@mjsz-vbr-elements/shared/css/typography.css"></style>
<style src="@mjsz-vbr-elements/shared/css/forms.css"></style>
<style src="@mjsz-vbr-elements/shared/css/grid.css"></style>
<style src="@mjsz-vbr-elements/shared/css/responsive-table.css"></style>
<style src="@mjsz-vbr-elements/shared/css/table.css"></style>
<style src="@mjsz-vbr-elements/shared/css/dropdown.css"></style>
