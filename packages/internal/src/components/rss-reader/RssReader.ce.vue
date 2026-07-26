<script setup>
import { ErrorNotice, I18NProvider, Image } from '@mjsz-vbr-elements/core/components';
import { useErrorProvider } from '@mjsz-vbr-elements/core/composables';
import { onMounted, shallowRef } from 'vue';
import en from '../../locales/en.json';
import hu from '../../locales/hu.json';

const props = defineProps({
  locale: {
    type: String,
    default: 'hu',
  },

  feedUrl: {
    type: String,
    default: '',
  },

  limit: {
    type: [String, Number],
    default: 10,
  },
});

const items = shallowRef([]);
const isLoading = shallowRef(false);
const mainTitle = shallowRef('');
const mainLogo = shallowRef('');

const feedUrl = import.meta.env.DEV
  ? '/rss-feed/'
  : props.feedUrl || 'https://sportolonemzet.hu/feed/';

const { onError, error, hasError } = useErrorProvider();

async function getFeed() {
  isLoading.value = true;
  try {
    const response = await fetch(feedUrl);

    if (!response.ok) {
      return onError({ message: `Feed request failed with status ${response.status}` });
    }

    const xmlText = await response.text();
    const doc = new DOMParser().parseFromString(xmlText, 'application/xml');
    const parserError = doc.querySelector('parsererror');

    if (parserError) {
      return onError({ message: 'Invalid RSS XML response' });
    }

    const docItems = doc.querySelectorAll('item');
    items.value = Array.from(docItems, item => ({
      title: item.querySelector('title')?.textContent ?? '',
      link: item.querySelector('link')?.textContent ?? '',
    })).splice(0, Number(props.limit));
    mainTitle.value = doc.querySelector('channel title')?.textContent || '';
    mainLogo.value = doc.querySelector('image url')?.textContent || '';
  }
  catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    onError({ message: `Feed load error: ${message}` });
  }
  finally {
    isLoading.value = false;
  }
}
onMounted(() => getFeed());
</script>

<template>
  <div>
    <I18NProvider v-slot="{ t }" :locale="locale" :messages="{ en, hu }">
      <ErrorNotice v-if="hasError" :error="error" />

      <div v-if="!isLoading" class="grid" style="grid-template-columns: 50px 1fr auto; align-items: center;">
        <Image v-if="mainLogo" :src="mainLogo" aria-hidden="true" />
        <h2 class="text-highlighted uppercase">
          {{ mainTitle }}
        </h2>
        <a href="https://sportolonemzet.hu/regisztracio/" target="_blank" data-default-link>{{ t('rssReader.registration') }}</a>
      </div>
      <ul class="text-list">
        <li v-for="(item, index) in items" :key="index">
          <a :href="item.link" target="_blank" data-default-link>{{ item.title }}</a>
        </li>
      </ul>
    </I18NProvider>
  </div>
</template>

<style src="@mjsz-vbr-elements/shared/css/core.css" />

<style src="@mjsz-vbr-elements/shared/css/components/list.css" />

<style src="@mjsz-vbr-elements/shared/css/components/error-notice.css" />
