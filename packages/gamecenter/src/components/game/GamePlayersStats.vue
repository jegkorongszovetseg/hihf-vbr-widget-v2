<script setup>
import { computed } from 'vue';
import { useMainClass, useColumns } from '@mjsz-vbr-elements/core/composables';
import GameDataTable from './components/GameDataTable.vue';
import GamePlayerStatsProvider from './components/GamePlayerStatsProvider.vue';
import { PLAYER_STATS_COLUMNS, convertPlayersTOI } from './internal';

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

const homePlayers = computed(() => convertPlayersTOI(props.data?.[props.homeTeamId] ?? []));
const awayPlayers = computed(() => convertPlayersTOI(props.data?.[props.awayTeamId] ?? []));
</script>
<template>
  <div :class="useMainClass('gamecenter-data-columns')">
    <GamePlayerStatsProvider :rows="homePlayers" #default="{ rows, sort, onSort }">
      <GameDataTable :columns="columns" :rows="rows" :title="homeTeamName" :sort="sort" @sort="onSort" />
    </GamePlayerStatsProvider>
    <GamePlayerStatsProvider :rows="awayPlayers" #default="{ rows, sort, onSort }">
      <GameDataTable :columns="columns" :rows="rows" :title="awayTeamName" :sort="sort" @sort="onSort" />
    </GamePlayerStatsProvider>
  </div>
</template>
