<script setup>
import { I18NProvider, ErrorProvider, ErrorNotice } from '@mjsz-vbr-elements/core/components';
import DataProvider from './DataProvider.vue';
import Selector from './Selector.vue';

const props = defineProps({
  locale: {
    type: String,
    default: 'hu',
  },

  apiKey: {
    type: String,
    default: '',
  },
});
</script>
<template>
  <I18NProvider :locale="props.locale">
    <ErrorProvider v-slot:default="{ error, hasError }">
      <ErrorNotice v-if="hasError" :error="error" />

      <DataProvider
        v-slot:default="{
          seasonsList,
          seasonId,
          championshipList,
          championshipId,
          sectionData,
          onChangeSeason,
          onChangeChampionship,
        }"
      >
        <div style="display: flex; gap: 20px">
          <div>
            <Selector
              :seasons-list="seasonsList"
              :season-id="seasonId"
              :championship-list="championshipList"
              :championship-id="championshipId"
              @update:season-id="onChangeSeason"
              @update:championship-id="onChangeChampionship"
            />
          </div>
          <div>
            <pre v-text="sectionData"></pre>
          </div>
        </div>
      </DataProvider>
    </ErrorProvider>
  </I18NProvider>
</template>
