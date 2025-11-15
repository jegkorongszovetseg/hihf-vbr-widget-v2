<script setup>
import { ref } from 'vue';
// import { Countdown } from '@mjsz-vbr-elements/extended';
import { store } from '../store.js';
// DEV:
// import '../../../packages/shared/assets/css/common.scss';
// import '../../../packages/shared/assets/css/countdown.scss';
// import '../../../packages/shared/assets/css/animation.scss';
// finished: 78093
// lesz: 81776

const isResizeable = ref(true);
</script>

<template>
  <div class="p-5">
    <fieldset class="flex gap-1">
      <input id="resize" v-model="isResizeable" type="checkbox">
      <label for="resize">Méretezhető</label>
    </fieldset>

    <div class="m-auto max-w-[460px]" :class="{ 'resize-x overflow-hidden': isResizeable }">
      <mjsz-vbr-countdown :locale="store.locale" :game-id="82797" />
    </div>
  </div>
</template>
