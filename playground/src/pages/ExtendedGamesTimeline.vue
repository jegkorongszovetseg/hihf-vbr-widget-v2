<script setup>
import { store } from '../store.js';

import '../../../packages/shared/dist/css/games-timeline.css';
</script>

<template>
  <div style="height: 110px; outline: 1px solid #ccc;">
    <mjsz-vbr-games-timeline :locale="store.locale"></mjsz-vbr-games-timeline>
  </div>
</template>
