<script setup>
import { computed } from 'vue';
import {useI18n,  useMainClass, useColumns } from '@mjsz-vbr-elements/core/composables';
import GameDataTable from '../common/GameDataTable.vue';
import GamePlayerStatsProvider from '../game/components/GamePlayerStatsProvider.vue';
import GameGolaiesStatsProvider from '../game/components/GameGoaliesStatsProvider.vue';
import { PLAYER_STATS_COLUMNS, GOALIES_STATS_COLUMNS, convertPlayersTOI } from '../game/internal';
import { transformGoalieStats } from './internal';

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

const homeGoalies = computed(() => transformGoalieStats(props.data?.goalies?.[props.homeTeamId] ?? []));
const awayGoalies = computed(() => transformGoalieStats(props.data?.goalies?.[props.awayTeamId] ?? []));
</script>

<template>
  <h2 class="is-heading-2">{{ t('title.fieldPlayers') }}</h2>
  <div :class="useMainClass('gamecenter-data-column')">
    <GamePlayerStatsProvider :rows="homePlayers" #default="{ rows, sort, onSort }">
      <GameDataTable
        :class="[useMainClass('gamecenter-timeline-data-table'), 'is-home-team']"
        :columns="columns"
        :rows="rows"
        :title="homeTeamName"
        :sort="sort"
        @sort="onSort"
      />
    </GamePlayerStatsProvider>
    <GamePlayerStatsProvider :rows="awayPlayers" #default="{ rows, sort, onSort }">
      <GameDataTable
        :class="[useMainClass('gamecenter-timeline-data-table'), 'is-away-team']"
        :columns="columns"
        :rows="rows"
        :title="awayTeamName"
        :sort="sort"
        @sort="onSort"
      />
    </GamePlayerStatsProvider>
  </div>

  <h2 class="is-heading-2">{{ t('title.goalies') }}</h2>
  <div :class="useMainClass('gamecenter-data-columns')">
    <GameGolaiesStatsProvider :rows="homeGoalies" #default="{ rows }">
      <GameDataTable
        :class="[useMainClass('gamecenter-timeline-data-table'), 'is-home-team']"
        :columns="goliesColumns"
        :rows="rows"
        :title="homeTeamName"
      />
    </GameGolaiesStatsProvider>
    <GameGolaiesStatsProvider :rows="awayGoalies" #default="{ rows }">
      <GameDataTable
        :class="[useMainClass('gamecenter-timeline-data-table'), 'is-away-team']"
        :columns="goliesColumns"
        :rows="rows"
        :title="awayTeamName"
      />
    </GameGolaiesStatsProvider>
  </div>
</template>
