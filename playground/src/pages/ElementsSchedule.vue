<script setup>
import { store } from '../store.js';
</script>

<template>
  <div class="p-5">
    <mjsz-vbr-schedule
      :locale="store.locale"
      championship-id="3783"
      phase-id="45658"
      auto-initial-page
      auto-refresh
      is-target-external
      timezone-selector
    />
  </div>
</template>
