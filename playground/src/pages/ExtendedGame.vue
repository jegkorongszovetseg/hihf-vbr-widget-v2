<script setup>
import { store } from '../store.js';
import { Game } from '@mjsz-vbr-elements/extended';
</script>

<template>
  <div class="p-5">
    <Game :locale="store.locale" game-id="71861"  />
  </div>
</template>
