<script setup>
import { ErrorNotice, FormField, I18NProvider, Image, LoadingIndicator, Paginator } from '@mjsz-vbr-elements/core/components';
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
    path: '/v2/recruitment-info',
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
    .filter(query.value, ['organizationName', 'recruitmentCity', 'recruitmentTeamName'])
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
    <FormField :label="t('selection.filter')" name="filter" class="mb-md">
      <input id="filter" v-model="query" :placeholder="t('recruitmentInfo.filterByNameAndLocation')" type="text" autocomplete="off">
    </FormField>

    <ErrorNotice v-if="hasError" :error="error" use-retry @retry="onReTry" />

    <LoadingIndicator v-if="isLoading" />

    <div
      v-if="state.length > 0 && convertedRows.rows.length === 0"
      class="text-muted is-text-center is-text-bold"
    >
      {{ t('recruitmentInfo.noResult') }}
    </div>

    <details v-for="(item, index) in convertedRows.rows" :key="item.organizationName" class="tonal elevated mb-md">
      <summary :id="`summary-${index}`" :aria-controls="`content-${index}`">
        <Image
          :src="`https://ivr-api.icehockey.hu${item.organizationLogo}`"
          default-src="data:image/svg+xml,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg' fill='%23cfd8dc'%3E%3Ccircle cx='15' cy='15' r='15' /%3E%3C/svg%3E"
          width="30"
          height="30"
          style="object-fit: contain;"
        />
        <strong>{{ item.organizationName }} <span v-if="item.recruitmentTeamName">({{ item.recruitmentTeamName }})</span></strong>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M4.293 8.293a1 1 0 0 1 1.414 0L12 14.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414"
          />
        </svg>
      </summary>
      <div :id="`content-${index}`" class="content" role="region" :aria-labelledby="`summary-${index}`">
        <ul class="definition-list dotted">
          <li v-for="(recruitment, key) in item.recruitment" :key="key">
            <span class="term">{{ t(`recruitmentInfo.${key}`) }}</span>
            <hr>
            <span class="description" v-html="recruitment" />
          </li>
        </ul>
      </div>
    </details>
    <div class="grid-container text-muted">
      <Paginator
        :page="page"
        :items-per-page="props.limit"
        :total-items="convertedRows.totalItems"
        :range-length="5"
        @change="onPaginatorChange"
      />
      <div v-if="convertedRows.totalItems > 0" style="text-align: right">
        {{ t('table.info', { min: range[0], max: range[1], total: convertedRows.totalItems }) }}
      </div>
    </div>
  </I18NProvider>
</template>

<style src="@mjsz-vbr-elements/shared/css/core.css" />

<style src="@mjsz-vbr-elements/shared/css/components/form-field.css" />

<!-- <style src="@mjsz-vbr-elements/shared/css/components/card.css" /> -->

<style src="@mjsz-vbr-elements/shared/css/components/accordion.css" />

<style src="@mjsz-vbr-elements/shared/css/components/paginator.css" />

<style src="@mjsz-vbr-elements/shared/css/components/definition-list.css" />

<style src="@mjsz-vbr-elements/shared/css/components/error-notice.css" />

<!-- <style src="@mjsz-vbr-elements/shared/css/common.scss" lang="scss"></style> -->

<!-- <style src="@mjsz-vbr-elements/shared/css/recruitment-info.scss" lang="scss"></style> -->

<!-- <style src="@mjsz-vbr-elements/shared/css/forms.scss" lang="scss"></style> -->

<!-- <style src="@mjsz-vbr-elements/shared/css/paginator.scss" lang="scss"></style> -->
