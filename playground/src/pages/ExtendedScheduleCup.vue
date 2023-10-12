<script setup>
import { store } from '../store.js';
// DEV:
// import { ScheduleCup } from '@mjsz-vbr-elements/extended';
// import '../../../packages/shared/dist/css/common.css';
// import '../../../packages/shared/dist/css/responsive-table.css';
// import '../../../packages/shared/dist/css/table.css';
// import '../../../packages/shared/dist/css/grid.css';
// import '../../../packages/shared/dist/css/typography.css';
// import '../../../packages/shared/dist/css/forms.css';
// import '../../../packages/shared/dist/css/dropdown.css';
</script>

<template>
  <div class="p-5">
    <!-- <ScheduleCup :locale="store.locale" championship-name="Mini Bajnokság" /> -->
    <mjsz-vbr-schedule-cup :locale="store.locale" championship-name="Mini Bajnokság" />
  </div>
</template>
