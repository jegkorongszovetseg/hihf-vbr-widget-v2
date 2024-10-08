<script setup>
import { computed } from 'vue';
import { sortWith, descend, prop } from 'ramda';
import { useMainClass, useColumns } from '@mjsz-vbr-elements/core/composables';
import GameDataTable from '../common/GameDataTable.vue';
import GameGolaiesStatsProvider from './components/GameGoaliesStatsProvider.vue';
import { GOALIES_STATS_COLUMNS } from './internal';

const transform = sortWith([descend(prop('startingFive'))]);

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

const homePlayers = computed(() => transform(props.data?.[props.homeTeamId] ?? []));
const awayPlayers = computed(() => transform(props.data?.[props.awayTeamId] ?? []));
</script>
<template>
  <div :class="useMainClass('gamecenter-data-columns')">
    <GameGolaiesStatsProvider :rows="homePlayers" #default="{ rows }">
      <GameDataTable
        :class="useMainClass('gamecenter-data-table')"
        :columns="columns"
        :rows="rows"
        :title="homeTeamName"
      />
    </GameGolaiesStatsProvider>
    <GameGolaiesStatsProvider :rows="awayPlayers" #default="{ rows }">
      <GameDataTable
        :class="useMainClass('gamecenter-data-table')"
        :columns="columns"
        :rows="rows"
        :title="awayTeamName"
      />
    </GameGolaiesStatsProvider>
  </div>
</template>
