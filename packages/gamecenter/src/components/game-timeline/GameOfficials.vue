<script setup>
import { computed } from 'vue';
import { useColumns, useI18n, useMainClass } from '@mjsz-vbr-elements/core/composables';
import GameDataTable from '../game/components/GameDataTable.vue';
import { TEAM_OFFICIALS_COLUMNS, convertTeamMembersToRows } from '../game/internal';
import { convertGameOfficials, GAME_OFFICIALS_COLUMNS } from './internal';

const props = defineProps({
  gameOfficials: {
    type: Object,
    required: true,
  },

  homeTeamName: {
    type: String,
    default: '',
  },

  awayTeamName: {
    type: String,
    default: '',
  },
});

const { columns } = useColumns(TEAM_OFFICIALS_COLUMNS);
const { columns: gameOffiacialsColumns } = useColumns(GAME_OFFICIALS_COLUMNS);

const { t } = useI18n();

const homeTeamMembers = computed(() => convertTeamMembersToRows(props.gameOfficials?.gameTeamMembers?.home ?? [], t));
const awayTeamMembers = computed(() => convertTeamMembersToRows(props.gameOfficials?.gameTeamMembers?.away ?? [], t));

const convertedGameOfficials = computed(() => convertGameOfficials(props.gameOfficials.gameOfficials, t));
</script>

<template>
  <div :class="useMainClass('gamecenter-timeline-game-officials')">
    <h1 class="is-heading-1">Team OFFICALS</h1>
    <div class="is-game-officials-container">
      <GameDataTable :columns="columns" :rows="homeTeamMembers" :title="homeTeamName" />
      <GameDataTable :columns="columns" :rows="awayTeamMembers" :title="awayTeamName" />
    </div>

    <h1 class="is-heading-1">Game OFFICALS</h1>

    <div class="is-game-officials-container">
      <div v-for="(group, key) in convertedGameOfficials">
        <GameDataTable :columns="gameOffiacialsColumns" :rows="group" :title="key" />
      </div>
    </div>
  </div>
</template>
