<script setup>
import { useErrorProvider } from '../composables/useErrors';

const { message, errorObj } = useErrorProvider();
</script>

<template>
  <slot :message="message" :error-obj="errorObj"></slot>
</template>
