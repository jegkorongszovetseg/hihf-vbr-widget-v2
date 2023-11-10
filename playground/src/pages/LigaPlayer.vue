<script setup>
import { store } from '../store.js';
import { PlayerLiga } from '@mjsz-vbr-elements/liga';
import '../../../packages/shared/dist/css/common.css';
import '../../../packages/shared/dist/css/typography.css';
import '../../../packages/shared/dist/css/cards.css';
import '../../../packages/shared/dist/css/grid.css';
import '../../../packages/shared/dist/css/forms.css';
import '../../../packages/shared/dist/css/responsive-table.css';
import '../../../packages/shared/dist/css/table.css';
import '../../../packages/shared/dist/css/paginator.css';
import '../../../packages/shared/dist/css/teams.css';
</script>

<template>
  <div class="p-5 max-w-[1170px] mx-auto">
    <PlayerLiga :locale="store.locale" championship-name="Erste Liga" player-id="1111"></PlayerLiga>
    <!-- <mjsz-vbr-player-liga :locale="store.locale" championship-name="Erste Liga" /> -->
  </div>
</template>
