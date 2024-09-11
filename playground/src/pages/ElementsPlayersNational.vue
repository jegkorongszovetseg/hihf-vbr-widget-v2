<script setup>
import { store } from '../store.js';
</script>

<template>
  <div class="p-5">
    <mjsz-vbr-players-national :locale="store.locale" />
  </div>
</template>
