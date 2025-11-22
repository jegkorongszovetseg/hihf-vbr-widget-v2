<script setup>
// import { ScheduleLiga } from '@mjsz-vbr-elements/liga';
// import { useLigaCss } from '../composables/use-liga-css';
import { store } from '../store.js';

// import '../../../packages/shared/assets/css/common.scss';
// import '../../../packages/shared/assets/css/typography.scss';
// import '../../../packages/shared/assets/css/cards.scss';
// import '../../../packages/shared/assets/css/grid.scss';
// import '../../../packages/shared/assets/css/forms.scss';

// useLigaCss();

const gameLinkResolver = '/GameCenter?gameId={gameId}';
</script>

<template>
  <div class="p-5">
    <!-- <ScheduleLiga :locale="store.locale" championship-name="Erste Liga" /> -->
    <mjsz-vbr-schedule-liga
      :locale="store.locale"
      championship-name="Erste Liga"
      timezone-selector
      :external-game-resolver="gameLinkResolver"
      scroll-to-game-date="true"
    />
  </div>
</template>
