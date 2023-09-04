<script setup>
import { useI18n } from '@mjsz-vbr-elements/core/composables';
import IconTimer from '@mjsz-vbr-elements/shared/icons/IconTimer';
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
  <div class="is-time-cell">{{ event.eventTime }}</div>
  <div class="is-team-logo-cell"><TeamLogo :name="event.teamName" :logo="event.teamLogo" :key="event.teamId" /></div>
  <div class="is-icon-cell"><IconTimer /></div>
  <div>{{ t('events.timeout') }}</div>
</template>
