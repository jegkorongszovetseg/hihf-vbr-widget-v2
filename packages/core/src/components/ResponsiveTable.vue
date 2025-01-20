<script setup>
import { ref } from 'vue';

const el = ref(null);
</script>

<template>
  <div ref="el" class="table-responsive">
    <slot :el="el" />
  </div>
</template>
