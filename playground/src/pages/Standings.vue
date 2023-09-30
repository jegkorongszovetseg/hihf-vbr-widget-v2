<script setup>
import { store } from '../store.js';
</script>

<template>
  <div class="p-5">
    <mjsz-vbr-standings :locale="store.locale" championship-id="3451" division="Alapszakasz" type="3" />
  </div>
</template>
