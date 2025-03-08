<script setup>
import { I18NProvider, LoadingIndicator, Paginator } from '@mjsz-vbr-elements/core/components';
import { usePage, useServices } from '@mjsz-vbr-elements/core/composables';
import { convert } from '@mjsz-vbr-elements/core/utils';
import { computed, ref } from 'vue';
import en from '../../locales/en.json';
import hu from '../../locales/hu.json';
import { transformData } from './internal';

const props = defineProps({
  locale: {
    type: String,
    default: 'hu',
  },

  apiKey: {
    type: String,
    default: '',
  },

  limit: {
    type: Number,
    default: 30,
  },
});

const messages = { en, hu };

const {
  state,
  isLoading,
} = useServices({
  options: {
    path: '/v2/club-info',
    apiKey: props.apiKey,
    params: {},
    immediate: true,
  },
  transform: transformData,
  // onError,
});

const query = ref('');

const { page, change: onPaginatorChange } = usePage();

// filter ['organizationAddresses', 'headquarter', 'city']
const convertedRows = computed(() =>
  convert(state.value)
    .filter(query.value, ['organizationName', 'city'])
    .pagination(page.value, props.limit)
    .value(),
);
</script>

<template>
  <I18NProvider v-slot="{ t }" :locale="locale" :messages="messages">
    <div class="club-info-filter">
      <label for="organization" class="label">{{ t('selection.filter') }}</label>
      <input id="organization" v-model="query" :placeholder="t('clubInfo.filterByNameAndLocation')" type="text" class="base-input">
    </div>

    <LoadingIndicator v-if="isLoading" />

    <div v-if="state.length > 0 && convertedRows.rows.length === 0" class="no-result">
      {{ t('clubInfo.noResult') }}
    </div>

    <details v-for="item in convertedRows.rows" :key="item?.organizationName" class="club-info-card">
      <summary><strong>{{ item?.organizationName }} ({{ item?.recruitment?.recruitmentTeamName }})</strong></summary>
      <ul>
        <li v-for="(recruitment, key) in item.recruitment" :key="key">
          <span>{{ key }}:</span> <div v-html="recruitment" />
        </li>
      </ul>
    </details>
    <Paginator
      :page="page"
      :items-per-page="props.limit"
      :total-items="convertedRows.totalItems"
      :range-length="5"
      @change="onPaginatorChange"
    />
  </I18NProvider>
</template>

<style src="@mjsz-vbr-elements/shared/css/common.scss" lang="scss"></style>

<style src="@mjsz-vbr-elements/shared/css/clubinfo.scss" lang="scss"></style>

<style src="@mjsz-vbr-elements/shared/css/forms.scss" lang="scss"></style>

<style src="@mjsz-vbr-elements/shared/css/paginator.scss" lang="scss"></style>

<style src="@mjsz-vbr-elements/shared/css/cards.scss" lang="scss"></style>
