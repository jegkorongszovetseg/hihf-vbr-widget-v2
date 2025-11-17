<script setup>
import { useColumns } from '@mjsz-vbr-elements/core/composables';
import { computed } from 'vue';
import GameDataTable from '../common/GameDataTable.vue';
import GamePlayerStatsProvider from './components/GamePlayerStatsProvider.vue';
import { convertPlayersTOI, PLAYER_STATS_COLUMNS } from './internal';

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
  <div class="grid-container" style="--min-width: 500px; align-items: start;">
    <GamePlayerStatsProvider v-slot="{ rows, sort, onSort }" :rows="homePlayers">
      <GameDataTable
        class="gamecenter-data-table"
        :columns="columns"
        :rows="rows"
        :title="homeTeamName"
        :sort="sort"
        @sort="onSort"
      />
    </GamePlayerStatsProvider>
    <GamePlayerStatsProvider v-slot="{ rows, sort, onSort }" :rows="awayPlayers">
      <GameDataTable
        class="gamecenter-data-table"
        :columns="columns"
        :rows="rows"
        :title="awayTeamName"
        :sort="sort"
        @sort="onSort"
      />
    </GamePlayerStatsProvider>
  </div>
</template>
