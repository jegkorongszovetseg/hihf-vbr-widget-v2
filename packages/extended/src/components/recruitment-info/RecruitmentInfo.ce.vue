<script setup>
import { ErrorNotice, I18NProvider, Image, LoadingIndicator, Paginator } from '@mjsz-vbr-elements/core/components';
import { useErrorProvider, usePage, useServices } from '@mjsz-vbr-elements/core/composables';
import { convert } from '@mjsz-vbr-elements/core/utils';
import { computed, ref, watch } from 'vue';
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

const { onError, error, hasError, reset } = useErrorProvider();

const {
  state,
  isLoading,
  execute,
} = useServices({
  options: {
    path: '/v2/club-info',
    apiKey: props.apiKey,
    params: {},
    immediate: true,
  },
  transform: transformData,
  onError,
});

const query = ref('');

const { page, change: onPaginatorChange } = usePage();

const convertedRows = computed(() =>
  convert(state.value)
    .filter(query.value, ['organizationName', 'city', 'recruitmentTeamName'])
    .pagination(page.value, props.limit)
    .value(),
);

const range = computed(() => {
  return [(page.value - 1) * props.limit + 1, Math.min(page.value * props.limit, convertedRows.value.totalItems)];
});

watch(query, () => {
  if (page.value !== 1)
    page.value = 1;
});

function onReTry() {
  reset();
  execute();
}
</script>

<template>
  <I18NProvider v-slot="{ t }" :locale="locale" :messages="messages">
    <div class="recruitment-info-filter">
      <label for="organization" class="label">{{ t('selection.filter') }}</label>
      <input id="organization" v-model="query" :placeholder="t('recruitmentInfo.filterByNameAndLocation')" type="text" autocomplete="off" class="base-input">
    </div>

    <ErrorNotice v-if="hasError" :error="error" use-retry @retry="onReTry" />

    <LoadingIndicator v-if="isLoading" />

    <div v-if="state.length > 0 && convertedRows.rows.length === 0" class="no-result">
      {{ t('recruitmentInfo.noResult') }}
    </div>

    <details v-for="item in convertedRows.rows" :key="item.organizationName" class="recruitment-info-card">
      <summary>
        <Image :src="`https://ivr-api.icehockey.hu${item.organizationLogo}`" default-src="data:image/svg+xml,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg' fill='%23cfd8dc'%3E%3Ccircle cx='15' cy='15' r='15' /%3E%3C/svg%3E" />
        <strong>{{ item.organizationName }} <span v-if="item.recruitment?.recruitmentTeamName">({{ item.recruitment?.recruitmentTeamName }})</span></strong>
      </summary>
      <ul>
        <li v-for="(recruitment, key) in item.recruitment" :key="key">
          <span>{{ t(`recruitmentInfo.${key}`) }}:</span> <div v-html="recruitment" />
        </li>
      </ul>
    </details>
    <div class="recruitment-paginator-container">
      <Paginator
        :page="page"
        :items-per-page="props.limit"
        :total-items="convertedRows.totalItems"
        :range-length="5"
        @change="onPaginatorChange"
      />
      <div v-if="convertedRows.totalItems > 0" style="text-align: right">
        {{ range.join('-') }} / {{ convertedRows.totalItems }} db
      </div>
    </div>
  </I18NProvider>
</template>

<style src="@mjsz-vbr-elements/shared/css/common.scss" lang="scss"></style>

<style src="@mjsz-vbr-elements/shared/css/recruitment-info.scss" lang="scss"></style>

<style src="@mjsz-vbr-elements/shared/css/forms.scss" lang="scss"></style>

<style src="@mjsz-vbr-elements/shared/css/paginator.scss" lang="scss"></style>
