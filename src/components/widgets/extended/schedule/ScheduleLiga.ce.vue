<script setup>
import ErrorProvider from '@/components/ErrorProvider.vue';
import I18NProvider from '@/components/I18NProvider.vue';
import DataProvider from './DataProvider.vue';

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
  <div>
    <I18NProvider :locale="props.locale">
      <ErrorProvider v-slot:default="{ message, hasError }">
        Provider: {{ message }} hasError: {{ hasError }}
        <DataProvider championship-name="Erste Liga" v-slot="{ seasons, sections, teams }">
          <pre>{{ teams }}</pre>
          <pre>{{ seasons }}</pre>
          <pre>{{ sections }}</pre>
  
          <div>
            <div></div>
          </div>
        </DataProvider>

      </ErrorProvider>
    </I18NProvider>
  </div>
</template>
