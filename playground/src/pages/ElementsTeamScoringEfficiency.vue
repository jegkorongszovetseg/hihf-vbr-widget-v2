<script setup>
import { store } from '../store.js';
</script>

<template>
  <div class="p-5">
    <mjsz-vbr-team-scoring :locale="store.locale" championship-id="3450" division="Alapszakasz" />
  </div>
</template>
