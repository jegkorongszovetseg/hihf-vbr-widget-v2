<script setup>
import { store } from '../store.js';
</script>

<template>
  <div class="p-5">
    <mjsz-vbr-players-toi :locale="store.locale" championship-id="3775" phase-id="45647" />
  </div>
</template>
