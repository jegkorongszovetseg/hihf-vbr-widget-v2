<script setup>
import { store } from '../store.js';
// DEV:
import { GameTimeline } from '@mjsz-vbr-elements/gamecenter';
import '../../../packages/shared/dist/css/common.css';
import '../../../packages/shared/dist/css/game-center.css';
// import '../../../packages/shared/dist/css/responsive-table.css';
// import '../../../packages/shared/dist/css/table.css';
import '../../../packages/shared/dist/css/forms.css';
import '../../../packages/shared/dist/css/progress.css';
</script>

<template>
  <div class="p-5 max-w-[1080px] mx-auto">
    <GameTimeline :locale="store.locale" game-id="77914" />
    <!-- <mjsz-vbr-game-timeline :locale="store.locale" game-id="71861"  /> -->
  </div>
</template>
