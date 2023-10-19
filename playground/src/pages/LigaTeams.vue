<script setup>
import { store } from '../store.js';
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
  <div class="p-5 max-w-[1170px] mx-auto bg-gray-100">
    <!-- <StandingsLiga :locale="store.locale" championship-name="Erste Liga"></StandingsLiga> -->
    <mjsz-vbr-teams-liga :locale="store.locale" championship-name="Erste Liga" />
  </div>
</template>
