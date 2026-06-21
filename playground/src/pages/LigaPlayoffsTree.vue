<script setup>
import { store } from '../store.js';
// import '../../../packages/shared/assets/css/playoffs.scss';
// 3898 / 4122 / 3783 / 3824
</script>

<template>
  <div class="p-5">
    <mjsz-vbr-playoffs-tree :locale="store.locale" championship-id="3783" external-game-resolver="/GameCenter?gameid={gameId}" />
  </div>
</template>
