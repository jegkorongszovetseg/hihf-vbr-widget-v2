<script setup>
import { useI18n } from '../composables/useI18n';

const { t } = useI18n();
</script>

<template>
  <div class="loading-indicator">
    {{ t('common.loading') }}
  </div>
</template>
