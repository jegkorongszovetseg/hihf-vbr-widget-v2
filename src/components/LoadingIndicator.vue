<script setup>
import { useI18n } from '@/composables/useI18n';

const { t } = useI18n();
</script>

<template>
  <div style="text-align: center">{{ t('common.loading') }}</div>
</template>
