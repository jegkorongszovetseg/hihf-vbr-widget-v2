<script setup>
import { store } from '../store.js';
// DEV:
import { Game } from '@mjsz-vbr-elements/extended';
import '../../../packages/shared/dist/css/common.css';
import '../../../packages/shared/dist/css/game-center.css';
import '../../../packages/shared/dist/css/responsive-table.css';
import '../../../packages/shared/dist/css/table.css';
import '../../../packages/shared/dist/css/grid.css';
</script>

<template>
  <div class="p-5">
    <!-- <Game :locale="store.locale" game-id="71861" /> -->
    <mjsz-vbr-game :locale="store.locale" game-id="71861"  />
  </div>
</template>
