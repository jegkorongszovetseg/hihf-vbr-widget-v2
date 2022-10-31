<script setup>
import { useErrorProvider } from '../composables/useErrors';

const { message, hasError, error } = useErrorProvider();
</script>

<template>
  <slot :message="message" :error="error" :has-error="hasError"></slot>
</template>
