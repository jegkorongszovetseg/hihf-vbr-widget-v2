<script setup>
import { ErrorProvider, ErrorNotice, I18NProvider } from '@mjsz-vbr-elements/core/components';

const messages = {};

const props = defineProps({
  locale: {
    type: String,
    default: 'hu',
  },

  apiKey: {
    type: String,
    default: '',
  },

  teamId: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <div>
    <I18NProvider :locale="props.locale" :messages="messages">
      <ErrorProvider v-slot:default="{ hasError, error }">
        <ErrorNotice v-if="hasError" :error="error" />

        <h1>Team</h1>
        <div>
          <div>Team image</div>
          <div>Team Logo</div>
        </div>

        <div>Info</div>

        <div>Tables</div>
      </ErrorProvider>
    </I18NProvider>
  </div>
</template>
