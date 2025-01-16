<script setup>
import { store } from '../store.js';
// import '../../../packages/shared/dist/css/common.css';
// import '../../../packages/shared/dist/css/typography.css';
// import '../../../packages/shared/dist/css/cards.css';
// import '../../../packages/shared/dist/css/grid.css';
// import '../../../packages/shared/dist/css/forms.css';
// import '../../../packages/shared/dist/css/responsive-table.css';
// import '../../../packages/shared/dist/css/table.css';
// import '../../../packages/shared/dist/css/paginator.css';
// import '../../../packages/shared/dist/css/teams.css';

const gameResolver = 'https://www.ersteliga.hu/game/id/{gameId}';
</script>

<template>
  <div class="p-5 max-w-[1170px] mx-auto">
    <!-- <PlayerLiga
      :locale="store.locale"
      championship-id="3450"
      player-id="1111"
      :external-game-resolver="gameResolver"
    ></PlayerLiga> -->
    <mjsz-vbr-player-liga
      :locale="store.locale"
      championship-id="3450"
      player-id="1111"
      :external-game-resolver="gameResolver"
    />
  </div>
</template>
