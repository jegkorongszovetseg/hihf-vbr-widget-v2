<script setup>
import { computed } from 'vue';
import ScheduleTable from './ScheduleTable.vue';
import I18NProvider from '../I18NProvider.vue';

const props = defineProps({
  locale: {
    type: String,
    default: 'hu',
  },
});
const locale = computed(() => props.locale);
</script>
<template>
  <div>
    <I18NProvider :locale="locale">
      <ScheduleTable></ScheduleTable>
    </I18NProvider>
  </div>
</template>
