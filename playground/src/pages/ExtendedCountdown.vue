<script setup>
// import { Championship } from '@mjsz-vbr-elements/extended';
import { store } from '../store.js';
// DEV:
import '../../../packages/shared/assets/css/common.scss';
import '../../../packages/shared/assets/css/countdown.scss';

// import '../../../packages/shared/assets/css/responsive-table.scss';
// import '../../../packages/shared/assets/css/table.scss';
// import '../../../packages/shared/assets/css/grid.scss';
// import '../../../packages/shared/assets/css/typography.scss';
// import '../../../packages/shared/assets/css/cards.scss';
// import '../../../packages/shared/assets/css/forms.scss';
// import '../../../packages/shared/assets/css/dropdown.scss';
// import '../../../packages/shared/assets/css/paginator.scss';
</script>

<template>
  <div class="p-5">
    <div class="resize-x m-auto max-w-[460px] overflow-hidden">
      <mjsz-vbr-countdown :locale="store.locale" :game-id="81776" />
    </div>
  </div>
</template>
