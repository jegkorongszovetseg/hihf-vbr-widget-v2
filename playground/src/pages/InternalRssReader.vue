<script setup>
// DEV:
import { store } from '../store.js';
</script>

<template>
  <div class="p-5">
    <div class="m-auto max-w-[460px] resize-x overflow-hidden">
      <mjsz-rss-reader :locale="store.locale" />
    </div>
  </div>
</template>
