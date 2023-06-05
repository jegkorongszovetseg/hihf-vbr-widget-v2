<script setup>
import { store } from '../store.js';
</script>

<template>
  <div class="p-5">
    <mjsz-vbr-schedule-liga :locale="store.locale" championship-name="Erste Liga" />
  </div>
</template>
