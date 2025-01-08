<script setup>
import { store } from '../store.js';
</script>

<template>
  <div style="height: 110px; outline: 1px solid red;">
    <mjsz-vbr-games-timeline :locale="store.locale"></mjsz-vbr-games-timeline>
  </div>
</template>
