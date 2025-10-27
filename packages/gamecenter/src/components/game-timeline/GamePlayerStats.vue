<script setup>
import { useColumns, useI18n } from '@mjsz-vbr-elements/core/composables';
import { sortByStartingFive } from '@mjsz-vbr-elements/core/utils';
import { computed } from 'vue';
import GameDataTable from '../common/GameDataTable.vue';
import GameGolaiesStatsProvider from '../game/components/GameGoaliesStatsProvider.vue';
import GamePlayerStatsProvider from '../game/components/GamePlayerStatsProvider.vue';
import { convertPlayersTOI, GOALIES_STATS_COLUMNS, PLAYER_STATS_COLUMNS } from '../game/internal';

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

const { t } = useI18n();

const { columns } = useColumns(PLAYER_STATS_COLUMNS);
const { columns: goliesColumns } = useColumns(GOALIES_STATS_COLUMNS);

const homePlayers = computed(() => convertPlayersTOI(props.data?.players?.[props.homeTeamId] ?? []));
const awayPlayers = computed(() => convertPlayersTOI(props.data?.players?.[props.awayTeamId] ?? []));

const homeGoalies = computed(() => sortByStartingFive(props.data?.goalies?.[props.homeTeamId] ?? []));
const awayGoalies = computed(() => sortByStartingFive(props.data?.goalies?.[props.awayTeamId] ?? []));
</script>

<template>
  <h2 class="is-heading-2">
    {{ t('title.fieldPlayers') }}
  </h2>
  <div class="gamecenter-data-column">
    <GamePlayerStatsProvider v-slot="{ rows, sort, onSort }" :rows="homePlayers">
      <GameDataTable
        class="is-home-team 'gamecenter-timeline-data-table"
        :columns="columns"
        :rows="rows"
        :title="homeTeamName"
        :sort="sort"
        @sort="onSort"
      />
    </GamePlayerStatsProvider>
    <GamePlayerStatsProvider v-slot="{ rows, sort, onSort }" :rows="awayPlayers">
      <GameDataTable
        class="is-away-team gamecenter-timeline-data-table"
        :columns="columns"
        :rows="rows"
        :title="awayTeamName"
        :sort="sort"
        @sort="onSort"
      />
    </GamePlayerStatsProvider>
  </div>

  <h2 class="is-heading-2">
    {{ t('title.goalies') }}
  </h2>
  <div class="gamecenter-data-columns">
    <GameGolaiesStatsProvider v-slot="{ rows }" :rows="homeGoalies">
      <GameDataTable
        class="is-home-team gamecenter-timeline-data-table"
        :columns="goliesColumns"
        :rows="rows"
        :title="homeTeamName"
      />
    </GameGolaiesStatsProvider>
    <GameGolaiesStatsProvider v-slot="{ rows }" :rows="awayGoalies">
      <GameDataTable
        class="is-away-team gamecenter-timeline-data-table"
        :columns="goliesColumns"
        :rows="rows"
        :title="awayTeamName"
      />
    </GameGolaiesStatsProvider>
  </div>
</template>
