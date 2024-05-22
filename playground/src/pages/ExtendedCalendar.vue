<script setup>
import { store } from '../store.js';
// DEV:
import { Calendar } from '@mjsz-vbr-elements/extended';
import '../../../packages/shared/dist/css/common.css';
// import '../../../packages/shared/dist/css/responsive-table.css';
// import '../../../packages/shared/dist/css/table.css';
// import '../../../packages/shared/dist/css/grid.css';
import '../../../packages/shared/dist/css/typography.css';
import '../../../packages/shared/dist/css/cards.css';
import '../../../packages/shared/dist/css/forms.css';
// import '../../../packages/shared/dist/css/dropdown.css';
// import '../../../packages/shared/dist/css/paginator.css';
</script>

<template>
  <div class="p-5">
    <Calendar :locale="store.locale" season-id="216" />
    <!-- <mjsz-vbr-calendar :locale="store.locale" season-id="216" /> -->
  </div>
</template>
