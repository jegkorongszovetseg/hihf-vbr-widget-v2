<script setup>
import { store } from '../store.js';
</script>

<template>
  <div class="p-5">
    <mjsz-vbr-team-fairplay :locale="store.locale" championship-id="3314" division="Alapszakasz" />
  </div>
</template>
