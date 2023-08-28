<script setup>
defineProps({
  title: {
    type: String,
    default: '',
  },

  data: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <dl>
    <dt>
      <slot>
        {{ title }}
      </slot>
    </dt>
    <dd v-html="data" />
  </dl>
</template>
