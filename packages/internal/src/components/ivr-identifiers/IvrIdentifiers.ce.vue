<script setup>
import { ErrorNotice, ErrorProvider, FormField, I18NProvider } from '@mjsz-vbr-elements/core/components';
import en from '../../locales/en.json';
import hu from '../../locales/hu.json';
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

const messages = { en, hu };
</script>

<template>
  <I18NProvider v-slot="{ t }" :locale="props.locale" :messages="messages">
    <ErrorProvider v-slot="{ error, hasError }">
      <ErrorNotice v-if="hasError" :error="error" />

      <DataProvider
        v-slot="{
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
            <FormField :label="t('selection.championships')" name="seasonId" class="mb-md">
              <span id="seasonId" v-text="seasonId" />
            </FormField>

            <FormField :label="t('selection.championshipName')" name="championshipName" class="mb-md">
              <span id="championshipName" v-text="championshipList.find((champ) => champ.championshipId === championshipId)?.championshipName" />
            </FormField>

            <FormField :label="t('selection.championshipId')" name="championshipId" class="mb-md">
              <span id="championshipId" v-text="championshipId" />
            </FormField>

            <FormField :label="t('selection.sections')" name="sections" class="mb-md">
              <nav id="sections" class="tabs filled">
                <div role="tablist" :aria-label="t('selection.sections')">
                  <button
                    v-for="section in sections"
                    :key="section.phaseId"
                    role="tab"
                    :aria-selected="section.sectionId === sectionId "
                    @click="onChangeSection(section.sectionId)"
                  >
                    {{ section.sectionName }}
                  </button>
                </div>
              </nav>
            </FormField>

            <FormField :label="t('selection.phasesDivision')" name="phases" class="mb-md">
              <pre id="phases" style="--_height: auto;" v-text="phaseData" />
            </FormField>
          </div>
        </div>
      </DataProvider>
    </ErrorProvider>
  </I18NProvider>
</template>

<style src="@mjsz-vbr-elements/shared/css/core.css" />

<style src="@mjsz-vbr-elements/shared/css/components/form-field.css" />

<style src="@mjsz-vbr-elements/shared/css/components/tabs.css" />

<style src="@mjsz-vbr-elements/shared/css/components/error-notice.css" />

<style scoped>
.main-layout {
  display: grid;
  gap: var(--size-16);

  @media (width > 60ch) {
    grid-template-columns: 25ch 1fr;
  }
}
</style>
