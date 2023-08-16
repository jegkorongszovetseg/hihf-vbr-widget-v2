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
  <div>{{ event.penaltyCause }}</div>
  <div>
    <template v-if="event.penaltyLength !== 0">{{ t('events.penaltyLength', event.penaltyLength) }}</template>
    <template v-if="event.perc === 0">PS</template>
  </div>
  <div>{{ event.penaltyEnd }}</div>
  <div>Name</div>
</template>
