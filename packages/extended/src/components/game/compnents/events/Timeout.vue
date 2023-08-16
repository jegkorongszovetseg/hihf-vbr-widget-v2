<script setup>
import { useI18n } from '@mjsz-vbr-elements/core/composables';
import TeamLogo from './TeamLogo.vue';

defineProps({
  event: {
    type: Object,
    required: true,
  },
});

const { t } = useI18n();
</script>

<template>
  <div>{{ event.eventTime }}</div>
  <div><TeamLogo :name="event.teamName" :logo="event.teamLogo" /></div>
  <div>{{ event.type }}</div>
  <div>{{ t('events.timeout') }}</div>
</template>
