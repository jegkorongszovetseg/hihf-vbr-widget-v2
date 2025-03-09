<script setup>
import { useLigaCss } from '../composables/use-liga-css';
// DEV:
import { store } from '../store.js';
// import '../../../packages/shared/dist/css/common.css';
// import '../../../packages/shared/dist/css/game-center-timeline.css';
// import '../../../packages/shared/dist/css/responsive-table.css';
// import '../../../packages/shared/dist/css/table.css';
// import '../../../packages/shared/dist/css/forms.css';
// import '../../../packages/shared/dist/css/progress.css';

useLigaCss();
</script>

<template>
  <div class="p-5 max-w-[1080px] mx-auto">
    <!-- <GameTimeline :locale="store.locale" game-id="77914" /> -->
    <mjsz-vbr-game-timeline :locale="store.locale" game-id="77928" />
  </div>
</template>
