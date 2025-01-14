<script setup>
import { useColumns, useMainClass } from '@mjsz-vbr-elements/core/composables';
import { descend, prop, sortWith } from 'ramda';
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

const transform = sortWith([descend(prop('startingFive'))]);

const { columns } = useColumns(GOALIES_STATS_COLUMNS);

const homePlayers = computed(() => transform(props.data?.[props.homeTeamId] ?? []));
const awayPlayers = computed(() => transform(props.data?.[props.awayTeamId] ?? []));
</script>

<template>
  <div :class="useMainClass('gamecenter-data-columns')">
    <GameGolaiesStatsProvider v-slot="{ rows }" :rows="homePlayers">
      <GameDataTable
        :class="useMainClass('gamecenter-data-table')"
        :columns="columns"
        :rows="rows"
        :title="homeTeamName"
      />
    </GameGolaiesStatsProvider>
    <GameGolaiesStatsProvider v-slot="{ rows }" :rows="awayPlayers">
      <GameDataTable
        :class="useMainClass('gamecenter-data-table')"
        :columns="columns"
        :rows="rows"
        :title="awayTeamName"
      />
    </GameGolaiesStatsProvider>
  </div>
</template>
