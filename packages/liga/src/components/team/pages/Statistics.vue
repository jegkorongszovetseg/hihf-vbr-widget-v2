<script setup>
import { ref, computed } from 'vue';
import { omit } from 'ramda';
import { DataTable, ResponsiveTable } from '@mjsz-vbr-elements/core/components';
import { useI18n, useColumns } from '@mjsz-vbr-elements/core/composables';
import { COLUMNS_PLAYER_SEASON_STATS } from '../../internal.js';

const playersColumns = omit(
  ['seasonId', 'teamName', 'gkd', 'gpi', 'pimPerGame', 'mipMin', 'mipPercent', 'ga', 'gaa', 'sog', 'svs', 'svsPercent'],
  COLUMNS_PLAYER_SEASON_STATS
);

const goalieColumns = omit(
  [
    'seasonId',
    'teamName',
    'gp',
    'goals',
    'points',
    'assists',
    'plusMinus',
    'mipMin',
    'mipPercent',
    'shoots',
    'shootPercent',
    'pimPerGame',
  ],
  COLUMNS_PLAYER_SEASON_STATS
);

const props = defineProps({
  fieldPlayers: {
    type: Array,
    default: () => [],
  },

  goalies: {
    type: Array,
    default: () => [],
  },
});

const tooltipContainer = ref(null);

const { t } = useI18n();
const { columns: columnsFieldPlayers } = useColumns(playersColumns);
const { columns: columnsGoalies } = useColumns(goalieColumns);
</script>

<template>
  <div>
    <h2 class="is-heading-2">{{ t('teams.fieldPlayers') }}</h2>
    <ResponsiveTable>
      <DataTable :columns="columnsFieldPlayers" :rows="fieldPlayers" :append-to="tooltipContainer"></DataTable>
    </ResponsiveTable>

    <h2 class="is-heading-2">{{ t('teams.goalies') }}</h2>
    <ResponsiveTable>
      <DataTable :columns="columnsGoalies" :rows="goalies" :append-to="tooltipContainer"></DataTable>
    </ResponsiveTable>

    <div ref="tooltipContainer"></div>
  </div>
</template>
