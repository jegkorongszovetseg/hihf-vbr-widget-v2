<script setup>
import { computed } from 'vue';
import { useColumns } from '@mjsz-vbr-elements/core/composables';
import GameDataTable from './compnents/GameDataTable.vue';
import GamePlayerStatsProvider from './compnents/GamePlayerStatsProvider.vue';
import { PLAYER_STATS_COLUMNS } from './internal';

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

const { columns } = useColumns(PLAYER_STATS_COLUMNS);

const homePlayers = computed(() => props.data?.[props.homeTeamId]);
const awayPlayers = computed(() => props.data?.[props.awayTeamId]);
</script>
<template>
  <div class="g-row">
    <div class="g-col-6">
      <GamePlayerStatsProvider :rows="homePlayers" #default="{ rows, sort, onSort }">
        <GameDataTable :columns="columns" :rows="rows" :title="homeTeamName" :sort="sort" @sort="onSort" />
      </GamePlayerStatsProvider>
    </div>
    <div class="g-col-6">
      <GamePlayerStatsProvider :rows="awayPlayers" #default="{ rows, sort, onSort }">
        <GameDataTable :columns="columns" :rows="rows" :title="awayTeamName" :sort="sort" @sort="onSort" />
      </GamePlayerStatsProvider>
    </div>
  </div>
</template>
