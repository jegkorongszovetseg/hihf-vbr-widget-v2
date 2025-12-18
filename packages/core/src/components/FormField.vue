<script setup>
defineProps({
  label: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="form-field">
    <label :for="name">{{ label }}</label>
    <slot />
  </div>
</template>
