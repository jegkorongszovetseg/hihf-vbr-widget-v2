<script setup>
import { useMainClass } from '../composables/useMainClass';

  const mainClassName = useMainClass('table-responsive');
</script>

<template>
  <div :class="mainClassName"><slot /></div>
</template>
