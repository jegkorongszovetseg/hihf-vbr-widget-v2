<script setup>
import { useLigaCss } from '../composables/use-liga-css';
import { store } from '../store.js';

useLigaCss();
</script>

<template>
  <div class="p-5">
    <mjsz-vbr-playoffs :locale="store.locale" championship-id="3824" />
  </div>
</template>
