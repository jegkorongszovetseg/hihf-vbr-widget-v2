<script setup>
// import { TopListLiga } from '@mjsz-vbr-elements/liga';
import { store } from '../store.js';

// import '../../../packages/shared/assets/css/common.scss';
// import '../../../packages/shared/assets/css/top-list.scss';

const playerResolver = `LigaPlayer?playerId={player.playerId}&championshipId={championshipId}`;
const teamResolver = `LigaTeam?teamId={team.id}&championshipId={championshipId}`;
const statisticResolver = `LigaStatistics?report={id}`;
</script>

<template>
  <div>
    <!-- <TopListLiga :locale="store.locale" championship-id="3783" :limit="5" /> -->
    <mjsz-vbr-top-list-liga :locale="store.locale" championship-id="3783" :external-team-resolver="teamResolver" :external-player-resolver="playerResolver" :external-statistic-resolver="statisticResolver" />
  </div>
</template>

<style>
mjsz-vbr-top-list-liga {
  --vbr-widget-link-color: var(--vbr-widget-primary-color-100);
  --vbr-widget-hover-color: var(--vbr-widget-primary-color-0);
}
</style>
