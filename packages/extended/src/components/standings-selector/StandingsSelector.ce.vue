<script setup>
const props = defineProps({
  locale: {
    type: String,
    default: 'hu',
  },

  apiKey: {
    type: String,
    default: '',
  },

  data: {
    type: Object,
    default: () => ({}),
  },
});

const test = {
  2323: {
    name: '',
    section: '',
    service: '',
  },
};
</script>

<template>
  <div>Standings Selector</div>
</template>

<style lang="scss" scoped></style>
