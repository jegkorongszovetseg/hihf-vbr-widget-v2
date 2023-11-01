<script setup>
import { store } from '../store.js';
// DEV:
import { Championship } from '@mjsz-vbr-elements/extended';
import '../../../packages/shared/dist/css/common.css';
import '../../../packages/shared/dist/css/responsive-table.css';
import '../../../packages/shared/dist/css/table.css';
import '../../../packages/shared/dist/css/grid.css';
import '../../../packages/shared/dist/css/typography.css';
import '../../../packages/shared/dist/css/cards.css';
import '../../../packages/shared/dist/css/forms.css';
import '../../../packages/shared/dist/css/dropdown.css';
</script>

<template>
  <div class="p-5">
    <!-- <Championship :locale="store.locale" championship-name="U-14 Bajnokság" /> -->
    <mjsz-vbr-championship :locale="store.locale" championship-name="Magyar Kupa"  />
  </div>
</template>
