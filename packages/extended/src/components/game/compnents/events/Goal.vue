<script setup>
defineProps({
  event: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div style="display: flex; gap: 16px">
    <div>{{ event.eventTime }}</div>
    <div>{{ event.teamName }}</div>
    <div>{{ event.type }}</div>
    <div>c</div>
    <div>d</div>
    <div>Name</div>
  </div>
</template>
