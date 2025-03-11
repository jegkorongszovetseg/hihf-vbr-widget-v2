<script setup>
import { useLigaCss } from '../composables/use-liga-css';
import { store } from '../store.js';

useLigaCss();

// import '../../../packages/shared/dist/css/common.css';
// import '../../../packages/shared/dist/css/typography.css';
// import '../../../packages/shared/dist/css/cards.css';
// import '../../../packages/shared/dist/css/grid.css';
// import '../../../packages/shared/dist/css/forms.css';
// import '../../../packages/shared/dist/css/responsive-table.css';
// import '../../../packages/shared/dist/css/table.css';
// import '../../../packages/shared/dist/css/paginator.css';

const playerResolver = `LigaPlayer?playerId={player.playerId}&championshipId={championshipId}`;
const teamResolver = `LigaTeam?teamId={team.id}&championshipId={championshipId}`;
</script>

<template>
  <div class="p-5 max-w-[1170px] mx-auto">
    <!-- <PlayersLiga
      :locale="store.locale"
      championship-name="Erste Liga"
      :external-player-resolver="playerResolver"
      :external-team-resolver="teamResolver"
    ></PlayersLiga> -->
    <mjsz-vbr-players-liga
      :locale="store.locale"
      championship-name="Erste Liga"
      :external-player-resolver="playerResolver"
      :external-team-resolver="teamResolver"
    />
  </div>
</template>
