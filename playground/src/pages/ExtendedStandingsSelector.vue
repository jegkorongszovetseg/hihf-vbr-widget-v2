<script setup>
import { store } from '../store.js';
</script>

<template>
  <div>
    <mjsz-vbr-standings-selector :locale="store.locale" />
  </div>
</template>
