<script setup>
import { useColumns } from '@mjsz-vbr-elements/core/composables';
import { sortByStartingFive } from '@mjsz-vbr-elements/core/utils';
import { computed } from 'vue';
import GameDataTable from '../common/GameDataTable.vue';
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

const homePlayers = computed(() => sortByStartingFive(props.data?.[props.homeTeamId] ?? []));
const awayPlayers = computed(() => sortByStartingFive(props.data?.[props.awayTeamId] ?? []));
</script>

<template>
  <div class="gamecenter-data-columns">
    <GameGolaiesStatsProvider v-slot="{ rows }" :rows="homePlayers">
      <GameDataTable
        class="gamecenter-data-table"
        :columns="columns"
        :rows="rows"
        :title="homeTeamName"
      />
    </GameGolaiesStatsProvider>
    <GameGolaiesStatsProvider v-slot="{ rows }" :rows="awayPlayers">
      <GameDataTable
        class="gamecenter-data-table"
        :columns="columns"
        :rows="rows"
        :title="awayTeamName"
      />
    </GameGolaiesStatsProvider>
  </div>
</template>
