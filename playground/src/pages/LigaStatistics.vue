<script setup>
import { store } from '../store.js';
// DEV:
// import { Statistics } from '@mjsz-vbr-elements/liga';
</script>

<template>
  <div class="p-5">
    <!-- <Statistics :locale="store.locale" championship-name="Erste Liga"></Statistics> -->
    <mjsz-vbr-statistics :locale="store.locale" championship-name="Erste Liga" />
  </div>
</template>
