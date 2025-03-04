<script setup>
import { useLigaCss } from '../composables/use-liga-css';
import { store } from '../store.js';

useLigaCss();

// import '../../../packages/shared/dist/css/common.css';
// import '../../../packages/shared/dist/css/typography.css';
// import '../../../packages/shared/dist/css/cards.css';
// import '../../../packages/shared/dist/css/grid.css';
// import '../../../packages/shared/dist/css/forms.css';
// import '../../../packages/shared/dist/css/teams.css';
// import '../../../packages/shared/dist/css/responsive-table.css';
// import '../../../packages/shared/dist/css/table.css';

const playerResolver = `LigaPlayer?playerId={player.playerId}&championshipId={championshipId}`;
</script>

<template>
  <div class="p-5 max-w-[1170px] mx-auto">
    <!-- <TeamLiga
      :locale="store.locale"
      championship-id="3450"
      team-id="21910"
      :external-player-resolver="playerResolver"
    ></TeamLiga> -->
    <mjsz-vbr-team-liga
      :locale="store.locale"
      championship-id="3450"
      team-id="21910"
      :external-player-resolver="playerResolver"
    />
  </div>
</template>
