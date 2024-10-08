<script setup>
import { computed } from 'vue';
import { useMainClass, useColumns, useI18n } from '@mjsz-vbr-elements/core/composables';
import GameDataTable from '../common/GameDataTable.vue';
import { convertTeamMembersToRows } from '../../utils/convert-official-persons';
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
  <div :class="useMainClass('gamecenter-data-columns')">
    <GameDataTable
      :class="useMainClass('gamecenter-data-table')"
      :columns="columns"
      :rows="homeTeamMembers"
      :title="homeTeamName"
    />
    <GameDataTable
      :class="useMainClass('gamecenter-data-table')"
      :columns="columns"
      :rows="awayTeamMembers"
      :title="awayTeamName"
    />
  </div>
</template>
