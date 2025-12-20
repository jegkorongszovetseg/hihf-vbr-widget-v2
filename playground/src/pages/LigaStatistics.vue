<script setup>
import { store } from '../store.js';

// DEV:
// import { Statistics } from '@mjsz-vbr-elements/liga';
// import '../../../packages/shared/dist/css/common.css';
// import '../../../packages/shared/dist/css/typography.css';
// import '../../../packages/shared/dist/css/cards.css';
// import '../../../packages/shared/dist/css/grid.css';
// import '../../../packages/shared/dist/css/forms.css';
// import '../../../packages/shared/dist/css/responsive-table.css';
// import '../../../packages/shared/dist/css/table.css';
// import '../../../packages/shared/dist/css/paginator.css';
</script>

<template>
  <div class="p-5">
    <!-- <Statistics :locale="store.locale" championship-name="Erste Liga" /> -->
    <mjsz-vbr-statistics :locale="store.locale" championship-name="Erste Liga" />
  </div>
</template>
