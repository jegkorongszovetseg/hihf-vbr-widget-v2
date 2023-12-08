<script setup>
import { I18NProvider, ErrorProvider, ErrorNotice } from '@mjsz-vbr-elements/core/components';
import { useMainClass } from '@mjsz-vbr-elements/core/composables';
import DataProvider from './DataProvider.vue';
import Selector from './Selector.vue';
import hu from '../../locales/hu.json';
import en from '../../locales/en.json';

const messages = { en, hu };

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
  <I18NProvider :locale="props.locale" :messages="messages" #default="{ t }">
    <ErrorProvider v-slot:default="{ error, hasError }">
      <ErrorNotice v-if="hasError" :error="error" />

      <DataProvider
        v-slot:default="{
          seasonsList,
          seasonId,
          championshipList,
          championshipId,
          sections,
          sectionId,
          phaseData,
          onChangeSeason,
          onChangeSection,
          onChangeChampionship,
        }"
      >
        <div class="main-layout">
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
            <section class="is-mb-5">
              <label for="seasonId">{{ t('selection.seasonId') }}</label>
              <p id="seasonId" v-text="seasonId" />
            </section>

            <section class="is-mb-5">
              <label for="championshipName">{{ t('selection.championshipName') }}</label>
              <p
                id="championshipName"
                v-text="championshipList.find((champ) => champ.championshipId === championshipId)?.championshipName"
              />
            </section>

            <section class="is-mb-5">
              <label for="championshipId">{{ t('selection.championshipId') }}</label>
              <p id="championshipId" v-text="championshipId" />
            </section>

            <section class="is-mb-5">
              <label for="sections">{{ t('selection.sections') }}:</label>

              <div id="sections" :class="[useMainClass('toggle-group')]">
                <template v-for="section in sections" :key="section.sectionId">
                  <button
                    :class="{ 'is-active': section.sectionId === sectionId }"
                    @click="onChangeSection(section.sectionId)"
                  >
                    {{ section.sectionName }}
                  </button>
                </template>
              </div>
            </section>

            <section class="is-mb-5">
              <label for="phases">{{ t('selection.phasesDivision') }}:</label>
              <pre id="phases" v-text="phaseData" />
            </section>
          </div>
        </div>
      </DataProvider>
    </ErrorProvider>
  </I18NProvider>
</template>

<style src="@mjsz-vbr-elements/shared/css/common.css"></style>
<style src="@mjsz-vbr-elements/shared/css/typography.css"></style>
<style src="@mjsz-vbr-elements/shared/css/forms.css"></style>

<style scoped>
.main-layout {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.main-layout > div:nth-child(2) {
  flex: 1;
}

pre {
  padding: 10px;
  white-space: pre-wrap;
  overflow-x: auto;
  background-color: var(--vbr-widget-primary-color-50);
  border-radius: 5px;
}
/* pre:hover,
pre:focus {
  width: min-content;
} */
</style>
