<script setup>
import { ErrorNotice, I18NProvider } from '@mjsz-vbr-elements/core/components';
import { useErrorProvider } from '@mjsz-vbr-elements/core/composables';
import { onMounted, shallowRef } from 'vue';

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
    default: 100,
  },
});

const items = shallowRef([]);

const feedUrl = import.meta.env.DEV
  ? '/rss-feed/'
  : props.feedUrl || 'https://sportolonemzet.hu/feed/';

const { onError, error, hasError } = useErrorProvider();

async function getFeed() {
  try {
    const response = await fetch(feedUrl);

    if (!response.ok) {
      return onError(`Feed request failed with status ${response.status}`);
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
      // description: item.querySelector('description')?.textContent ?? '',
    })).splice(0, Number(props.limit));
  }
  catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    onError({ message: `Feed load error: ${message}` });
  }
}
onMounted(() => getFeed());
</script>

<template>
  <div>
    <I18NProvider :locale="locale">
      <ErrorNotice v-if="hasError" :error="error" />
      <!-- <pre>{{ items }}</pre> -->
      <ul>
        <li v-for="(item, index) in items" :key="index">
          <a :href="item.link" target="_blank">{{ item.title }}</a>
        </li>
      </ul>
    </I18NProvider>
  </div>
</template>

<style src="@mjsz-vbr-elements/shared/css/core.css" />

<style src="@mjsz-vbr-elements/shared/css/components/error-notice.css" />
