<script setup>
import { useLigaCss } from '../composables/use-liga-css';
// import { TopListLiga } from '@mjsz-vbr-elements/liga';
import { store } from '../store.js';

import '../../../packages/shared/assets/css/common.scss';
import '../../../packages/shared/assets/css/top-list.scss';

useLigaCss();

const playerResolver = `LigaPlayer?playerId={player.playerId}&championshipId={championshipId}`;
const teamResolver = `LigaTeam?teamId={team.id}&championshipId={championshipId}`;
const statisticResolver = `LigaStatistics?report={id}`;
</script>

<template>
  <div>
    <!-- <TopListLiga :locale="store.locale" championship-id="3783" phase-base-id="2" :limit="5" /> -->
    <mjsz-vbr-top-list-liga :locale="store.locale" championship-id="3824" phase-base-id="2" :external-team-resolver="teamResolver" :external-player-resolver="playerResolver" :external-statistic-resolver="statisticResolver" />
  </div>
</template>
