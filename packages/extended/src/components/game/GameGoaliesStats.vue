<script setup>
import { computed } from 'vue';
import { useMainClass, useColumns } from '@mjsz-vbr-elements/core/composables';
import GameDataTable from './components/GameDataTable.vue';
import GameGolaiesStatsProvider from './components/GameGoaliesStatsProvider.vue';
import { GOALIES_STATS_COLUMNS } from './internal';

const props = defineProps({
  data: {
    type: Object,
    daefault: () => ({}),
  },

  homeTeamId: {
    type: Number,
  },

  homeTeamName: {
    type: String,
    default: '',
  },

  awayTeamId: {
    type: Number,
  },

  awayTeamName: {
    type: String,
    default: '',
  },
});

const { columns } = useColumns(GOALIES_STATS_COLUMNS);

const homePlayers = computed(() => props.data?.[props.homeTeamId]);
const awayPlayers = computed(() => props.data?.[props.awayTeamId]);
</script>
<template>
  <div :class="useMainClass('gamecenter-data-columns')">
    <GameGolaiesStatsProvider :rows="homePlayers" #default="{ rows }">
      <GameDataTable :columns="columns" :rows="rows" :title="homeTeamName" />
    </GameGolaiesStatsProvider>
    <GameGolaiesStatsProvider :rows="awayPlayers" #default="{ rows }">
      <GameDataTable :columns="columns" :rows="rows" :title="awayTeamName" />
    </GameGolaiesStatsProvider>
  </div>
</template>
