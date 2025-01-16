<script setup>
import { ref } from 'vue';
import { useMainClass } from '../composables/useMainClass';

const el = ref(null);
const mainClassName = useMainClass('table-responsive');
</script>

<template>
  <div ref="el" :class="mainClassName">
    <slot :el="el" />
  </div>
</template>
