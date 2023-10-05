<script setup>
import { ref, computed, unref } from 'vue';
import { externalGameLinkResolver, getLocalTimezone, offsetName } from '@mjsz-vbr-elements/core/utils';
import {
  ErrorNotice,
  ErrorProvider,
  I18NProvider,
  LoadingIndicator,
  TimezoneSelector,
  ScheduleTable,
} from '@mjsz-vbr-elements/core/components';
import { useMainClass } from '@mjsz-vbr-elements/core/composables';
import DataProvider from './DataProvider.vue';
import SeasonSelector from './SeasonSelector.vue';
import Selector from './Selector.vue';
import hu from '../../locales/hu.json';
import en from '../../locales/en.json';

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

  externalGameLink: {
    type: [String, Function],
    default: '',
  },
});
const timezone = ref(getLocalTimezone());
const currentOffsetName = computed(() => offsetName(new Date(), unref(timezone), props.locale));
const tabButtonClasses = useMainClass('tab-button');
const sectionSelectorMainClass = useMainClass('section-selector');

const messages = { en, hu };

const externalGameLink = (gameId) => externalGameLinkResolver(props.externalGameLink, gameId);

const onTimezoneChange = (tz) => {
  timezone.value = tz;
};
</script>

<template>
  <div>
    <I18NProvider :locale="props.locale" :messages="messages">
      <ErrorProvider v-slot:default="{ error, hasError }">
        <ErrorNotice v-if="hasError" :error="error" />

        <DataProvider
          :locale="locale"
          :timezone="timezone"
          :championship-name="championshipName"
          v-slot="{
            seasons,
            championshipId,
            championships,
            selectedChampionshipId,
            games,
            isLoading,
            phases,
            phaseId,
            changeSeason,
            changeChampionship,
            changePhase,
          }"
        >
          <SeasonSelector :seasons="seasons" :championship-id="championshipId" @update:championship-id="changeSeason" />

          <div :class="sectionSelectorMainClass">
            <button
              v-for="rawChampionships in championships"
              :key="rawChampionships.phaseId"
              @click="changeChampionship(rawChampionships.sectionId)"
              :class="[tabButtonClasses, { 'is-active': rawChampionships.sectionId === selectedChampionshipId }]"
            >
              {{ rawChampionships.sectionName }}
            </button>
          </div>

          <Selector :phases="phases" :phase-id="phaseId" @update:phase-id="changePhase" />

          <div :class="sectionSelectorMainClass">
            <button :class="[tabButtonClasses, { 'is-active': true }]" @click="changeSection(rawSection.sectionId)">
              Menetrend
            </button>
          </div>

          <TimezoneSelector
            v-if="props.timezoneSelector"
            class="is-mb-5"
            :key="props.locale"
            :locale="props.locale"
            :current-zone="timezone"
            @change="onTimezoneChange"
          />

          <LoadingIndicator v-if="isLoading" />

          <ScheduleTable
            :rows="games.rows"
            :offset-name="currentOffsetName"
            :is-loading="isLoading"
            :external-game-resolver="externalGameLink"
            hide-columns="broadcast"
          ></ScheduleTable>
        </DataProvider>
      </ErrorProvider>
    </I18NProvider>
  </div>
</template>

<style src="@mjsz-vbr-elements/shared/css/common.css"></style>
<style src="@mjsz-vbr-elements/shared/css/typography.css"></style>
<style src="@mjsz-vbr-elements/shared/css/forms.css"></style>
<style src="@mjsz-vbr-elements/shared/css/grid.css"></style>
<style src="@mjsz-vbr-elements/shared/css/responsive-table.css"></style>
<style src="@mjsz-vbr-elements/shared/css/table.css"></style>
<style src="@mjsz-vbr-elements/shared/css/dropdown.css"></style>
<style src="@mjsz-vbr-elements/shared/css/cards.css"></style>
