<script setup>
import { store } from '../store.js';
import { TeamLiga } from '@mjsz-vbr-elements/liga';
import '../../../packages/shared/dist/css/common.css';
// import '../../../packages/shared/dist/css/typography.css';
// import '../../../packages/shared/dist/css/cards.css';
// import '../../../packages/shared/dist/css/grid.css';
import '../../../packages/shared/dist/css/forms.css';
import '../../../packages/shared/dist/css/teams.css';
import '../../../packages/shared/dist/css/responsive-table.css';
import '../../../packages/shared/dist/css/table.css';
</script>

<template>
  <div class="p-5 max-w-[1170px] mx-auto">
    <TeamLiga :locale="store.locale" team-id="70000"></TeamLiga>
    <!-- <mjsz-vbr-team-liga :locale="store.locale" team-id="2000" /> -->
  </div>
</template>
