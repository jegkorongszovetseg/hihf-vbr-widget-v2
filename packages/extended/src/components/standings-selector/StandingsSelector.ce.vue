<script setup>
import { COLUMNS_STANDINGS_SHORT } from '@mjsz-vbr-elements/core';
import { AdditionalStandingsText, ErrorNotice, ErrorProvider, I18NProvider, StatisticsTable } from '@mjsz-vbr-elements/core/components';
import IconRight from '@mjsz-vbr-elements/shared/icons/IconRight';
import { computed, ref } from 'vue';
import en from '../../locales/en.json';
import hu from '../../locales/hu.json';
import ChampionshipSelector from './ChampionshipSelector.vue';
import DataProvider from './DataProvider.vue';
import PlayoffsList from './PlayoffsList.vue';

const props = defineProps({
  locale: {
    type: String,
    default: 'hu',
  },

  apiKey: {
    type: String,
    default: '',
  },

  data: {
    type: [Array, String],
    default: () => [],
  },

});

const messages = { en, hu };

const tooltipContainer = ref(null);

const normalizedData = computed(() => typeof props.data === 'string' ? JSON.parse(props.data) : props.data);
</script>

<template>
  <I18NProvider :locale="props.locale" :messages="messages">
    <ErrorProvider v-slot="{ error, hasError }">
      <DataProvider v-slot="{ convertedRows, isLoading, path, phaseName, componentProps, championshipName, phaseId, isPlayoffs, onChange }" :data="normalizedData">
        <div class="standings-selector">
          <div class="standings-selector-title">
            <component :is="componentProps.tag" v-bind="componentProps.props" class="is-title-text">
              <b>{{ championshipName }}</b>&nbsp;-&nbsp;{{ phaseName }}&nbsp;<IconRight v-if="Boolean(path)" />
            </component>
            <ChampionshipSelector v-if="normalizedData.length > 1" :data="normalizedData" :selected="phaseId" :target="tooltipContainer" @change="onChange" />
          </div>

          <PlayoffsList v-if="isPlayoffs" :playoffs="convertedRows.rows" :is-loading="isLoading" />

          <StatisticsTable
            v-else
            :is-loading="isLoading"
            :columns="COLUMNS_STANDINGS_SHORT"
            :rows="convertedRows.rows"
            :append-to="tooltipContainer"
            :external-team-resolver="() => {}"
          />

          <AdditionalStandingsText :rows="convertedRows.rows" additional-key="inheritedPoints" />
          <AdditionalStandingsText :rows="convertedRows.rows" additional-key="penaltyPoints" />
        </div>
        <div ref="tooltipContainer" />
      </DataProvider>
      <ErrorNotice v-if="hasError" :error="error" />
    </ErrorProvider>
  </I18NProvider>
</template>

<style src="@mjsz-vbr-elements/shared/css/core.css" />

<style src="@mjsz-vbr-elements/shared/css/components/standings-selector.css" />

<style src="@mjsz-vbr-elements/shared/css/components/responsive-table.css" />

<style src="@mjsz-vbr-elements/shared/css/components/table.css" />

<style src="@mjsz-vbr-elements/shared/css/components/floating-content.css" />

<style src="@mjsz-vbr-elements/shared/css/components/list.css" />

<style src="@mjsz-vbr-elements/shared/css/components/playoffs.css" />

<!-- <style src="@mjsz-vbr-elements/shared/css/common.scss" lang="scss"></style> -->

<!-- <style src="@mjsz-vbr-elements/shared/css/standings-selector.scss" lang="scss"></style> -->

<!-- <style src="@mjsz-vbr-elements/shared/css/table.scss" lang="scss"></style> -->

<!-- <style src="@mjsz-vbr-elements/shared/css/responsive-table.scss" lang="scss"></style> -->

<!-- <style src="@mjsz-vbr-elements/shared/css/dropdown.scss" lang="scss"></style> -->

<!-- <style src="@mjsz-vbr-elements/shared/css/typography.scss" lang="scss"></style> -->

<!-- <style src="@mjsz-vbr-elements/shared/css/playoffs.scss" lang="scss"></style> -->
