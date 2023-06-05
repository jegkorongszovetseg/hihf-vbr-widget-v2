<script setup>
import { store } from '../store.js';
</script>

<template>
  <div class="p-5">
    <mjsz-vbr-goalies :locale="store.locale" championship-id="3314" division="Alapszakasz" />
  </div>
</template>
