<script setup>
import { store } from '../store.js';
</script>

<template>
  <div class="p-5">
    <mjsz-vbr-playoffs :locale="store.locale" championship-id="3824" />
  </div>
</template>
