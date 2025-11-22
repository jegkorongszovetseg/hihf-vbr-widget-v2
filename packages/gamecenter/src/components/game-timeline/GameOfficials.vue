<script setup>
import { useColumns, useI18n } from '@mjsz-vbr-elements/core/composables';
import { convertGameOfficials } from '@mjsz-vbr-elements/core/utils';
import { computed } from 'vue';
import { convertTeamMembersToRows } from '../../utils/convert-official-persons';
import GameDataTable from '../common/GameDataTable.vue';
import { TEAM_OFFICIALS_COLUMNS } from '../game/internal';
import { GAME_OFFICIALS_COLUMNS } from './constants';

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
  <div class="gamecenter-timeline-game-officials">
    <h2 class="text-center">
      {{ t('title.teamOfficials') }}
    </h2>
    <div class="grid-container" style="--min-width: 320px; --align-items: start;">
      <GameDataTable
        class="is-home-team gamecenter-timeline-data-table"
        :columns="columns"
        :rows="homeTeamMembers"
        :title="homeTeamName"
      />
      <GameDataTable
        class="is-away-team gamecenter-timeline-data-table"
        :columns="columns"
        :rows="awayTeamMembers"
        :title="awayTeamName"
      />
    </div>

    <h2 class="text-center">
      {{ t('title.gameOfficials') }}
    </h2>

    <div class="grid-container" style="--align-items: start;">
      <template v-for="(group, key) in convertedGameOfficials" :key="key">
        <GameDataTable
          class="gamecenter-timeline-data-table"
          :columns="gameOffiacialsColumns"
          :rows="group"
          :title="t(`roleType.${key}`)"
        />
      </template>
    </div>
  </div>
</template>
