<script setup>
import { useI18n, useMainClass } from '@mjsz-vbr-elements/core/composables';
import IconWarning from '@mjsz-vbr-elements/shared/icons/IconWarning';

const emit = defineEmits(['tryAgain']);

const { t } = useI18n();

function onTryAgain() {
  emit('tryAgain');
}
</script>

<template>
  <div :class="useMainClass('games-timeline-error-indicator')">
    <IconWarning />
    <div>{{ t('gamesTimeline.errorText') }}</div>
    <button type="button" @click="onTryAgain">
      {{ t('gamesTimeline.errorCta') }}
    </button>
  </div>
</template>
