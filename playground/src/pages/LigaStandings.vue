<script setup>
import { useLigaCss } from '../composables/use-liga-css';
import { store } from '../store.js';

useLigaCss();

// import { StandingsLiga } from '@mjsz-vbr-elements/liga';
// import '../../../packages/shared/dist/css/common.css';
// import '../../../packages/shared/dist/css/typography.css';
// import '../../../packages/shared/dist/css/cards.css';
// import '../../../packages/shared/dist/css/grid.css';
// import '../../../packages/shared/dist/css/forms.css';
// import '../../../packages/shared/dist/css/responsive-table.css';
// import '../../../packages/shared/dist/css/table.css';
</script>

<template>
  <div class="p-5">
    <!-- <StandingsLiga :locale="store.locale" championship-name="Erste Liga"></StandingsLiga> -->
    <mjsz-vbr-standings-liga :locale="store.locale" championship-name="Erste Liga" />
  </div>
</template>
