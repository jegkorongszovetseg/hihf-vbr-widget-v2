<script setup>
import { ErrorNotice, ErrorProvider, I18NProvider } from '@mjsz-vbr-elements/core/components';
import { getLocalTimezone, offsetName } from '@mjsz-vbr-elements/core/utils';
import { computed, ref } from 'vue';
import en from '../../locales/en.json';
import hu from '../../locales/hu.json';
import SeasonSelector from '../common-components/SeasonSelector.vue';
import DataProvider from './DataProvider.vue';
import { COLUMNS_SCHEDULE } from './schedule-cup.internal';
import ScheduleCupDataTable from './ScheduleCupDataTable.vue';

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
    <ErrorProvider v-slot="{ error, hasError }">
      <ErrorNotice v-if="hasError" :error="error" />

      <DataProvider
        v-slot="{ rows, isLoading, values, listeners }"
        :championship-name="championshipName"
        :locale="locale"
        :timezone="timezone"
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

<style src="@mjsz-vbr-elements/shared/css/core.css" />

<style src="@mjsz-vbr-elements/shared/css/components/responsive-table.css" />

<style src="@mjsz-vbr-elements/shared/css/components/table.css" />

<style src="@mjsz-vbr-elements/shared/css/components/floating-content.css" />

<style src="@mjsz-vbr-elements/shared/css/components/paginator.css" />

<style src="@mjsz-vbr-elements/shared/css/components/form-field.css" />

<style src="@mjsz-vbr-elements/shared/css/components/tabs.css" />

<style src="@mjsz-vbr-elements/shared/css/components/error-notice.css" />
