<script setup>
import { useColumns, useI18n } from '@mjsz-vbr-elements/core/composables';
import { computed } from 'vue';
import { convertTeamMembersToRows } from '../../utils/convert-official-persons';
import GameDataTable from '../common/GameDataTable.vue';
import { TEAM_OFFICIALS_COLUMNS } from './internal';

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

const { t } = useI18n();

const homeTeamMembers = computed(() => convertTeamMembersToRows(props.gameOfficials?.gameTeamMembers?.home ?? [], t));
const awayTeamMembers = computed(() => convertTeamMembersToRows(props.gameOfficials?.gameTeamMembers?.away ?? [], t));
</script>

<template>
  <div class="gamecenter-data-columns">
    <GameDataTable
      class="gamecenter-data-table"
      :columns="columns"
      :rows="homeTeamMembers"
      :title="homeTeamName"
    />
    <GameDataTable
      class="gamecenter-data-table"
      :columns="columns"
      :rows="awayTeamMembers"
      :title="awayTeamName"
    />
  </div>
</template>
