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
    <label :for="name" class="label">{{ label }}</label>
    <slot />
  </div>
</template>
