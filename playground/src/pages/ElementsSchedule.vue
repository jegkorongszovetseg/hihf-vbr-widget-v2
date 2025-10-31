<script setup>
import { store } from '../store.js';
</script>

<template>
  <div class="p-5">
    <mjsz-vbr-schedule
      :locale="store.locale"
      championship-id="3898"
      division="Alapszakasz"
      auto-initial-page
      is-target-external
      timezone-selector
    />
  </div>
</template>
