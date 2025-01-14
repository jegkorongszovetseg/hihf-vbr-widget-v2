<script setup>
import { DataTable, Image, ResponsiveTable } from '@mjsz-vbr-elements/core/components';
import { useColumns, useI18n } from '@mjsz-vbr-elements/core/composables';
import { DEFAULT_PORTRAIT_IMAGE_URL } from '@mjsz-vbr-elements/core/constants';
import { omit } from 'ramda';
import { ref } from 'vue';
import { COLUMNS_PLAYER_SEASON_STATS } from '../../internal.js';

defineProps({
  fieldPlayers: {
    type: Array,
    default: () => [],
  },

  goalies: {
    type: Array,
    default: () => [],
  },

  championshipId: {
    type: [String, Number],
    default: '',
  },

  isLoading: {
    type: Boolean,
    default: false,
  },

  externalPlayerResolver: {
    type: Function,
    default: () => undefined,
  },
});

const playersColumns = omit(
  ['seasonId', 'teamName', 'gkd', 'gpi', 'pimPerGame', 'mipMin', 'mipPercent', 'ga', 'gaa', 'sog', 'svs', 'svsPercent'],
  COLUMNS_PLAYER_SEASON_STATS,
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
  COLUMNS_PLAYER_SEASON_STATS,
);

const tooltipContainer = ref(null);

const { t } = useI18n();
const { columns: columnsFieldPlayers } = useColumns(playersColumns);
const { columns: columnsGoalies } = useColumns(goalieColumns);
</script>

<template>
  <div>
    <h2 class="is-heading-2">
      {{ t('teams.fieldPlayers') }}
    </h2>
    <ResponsiveTable>
      <DataTable
        :columns="columnsFieldPlayers"
        :rows="fieldPlayers"
        :is-loading="isLoading"
        :append-to="tooltipContainer"
      >
        <template #cell-playerPortrait="{ row }">
          <div class="is-portrait-image">
            <Image :key="row.player.playerId" :src="row.player.picture" :default-src="DEFAULT_PORTRAIT_IMAGE_URL" />
          </div>
        </template>

        <template #cell-name="{ row }">
          <a :href="externalPlayerResolver({ ...row, championshipId })" v-text="row.name" />
        </template>
      </DataTable>
    </ResponsiveTable>

    <h2 class="is-heading-2">
      {{ t('teams.goalies') }}
    </h2>
    <ResponsiveTable>
      <DataTable :columns="columnsGoalies" :rows="goalies" :is-loading="isLoading" :append-to="tooltipContainer">
        <template #cell-playerPortrait="{ row }">
          <div class="is-portrait-image">
            <Image :key="row.player.playerId" :src="row.player.picture" :default-src="DEFAULT_PORTRAIT_IMAGE_URL" />
          </div>
        </template>

        <template #cell-name="{ row }">
          <a :href="externalPlayerResolver({ ...row, championshipId })" v-text="row.name" />
        </template>
      </DataTable>
    </ResponsiveTable>

    <div ref="tooltipContainer" />
  </div>
</template>
