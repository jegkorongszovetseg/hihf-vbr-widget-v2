<script setup>
import { store } from '../store.js';
// import '../../../packages/shared/assets/css/playoffs.scss';
// 3898
</script>

<template>
  <div class="p-5">
    <mjsz-vbr-playoffs-tree :locale="store.locale" championship-id="4122" external-game-resolver="/GameCenter?gameid={gameId}" />
  </div>
</template>
