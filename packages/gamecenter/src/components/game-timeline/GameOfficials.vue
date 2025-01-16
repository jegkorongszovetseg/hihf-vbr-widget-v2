<script setup>
import { useColumns, useI18n, useMainClass } from '@mjsz-vbr-elements/core/composables';
import { computed } from 'vue';
import { convertTeamMembersToRows } from '../../utils/convert-official-persons';
import GameDataTable from '../common/GameDataTable.vue';
import { TEAM_OFFICIALS_COLUMNS } from '../game/internal';
import { GAME_OFFICIALS_COLUMNS } from './constants';
import { convertGameOfficials } from './internal';

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
    <h2 class="is-heading-2">
      {{ t('title.teamOfficials') }}
    </h2>
    <div class="is-game-officials-container">
      <GameDataTable
        class="is-home-team" :class="[useMainClass('gamecenter-timeline-data-table')]"
        :columns="columns"
        :rows="homeTeamMembers"
        :title="homeTeamName"
      />
      <GameDataTable
        class="is-away-team" :class="[useMainClass('gamecenter-timeline-data-table')]"
        :columns="columns"
        :rows="awayTeamMembers"
        :title="awayTeamName"
      />
    </div>

    <h2 class="is-heading-2">
      {{ t('title.gameOfficials') }}
    </h2>

    <div class="is-game-officials-container">
      <template v-for="(group, key) in convertedGameOfficials" :key="key">
        <GameDataTable
          :class="useMainClass('gamecenter-timeline-data-table')"
          :columns="gameOffiacialsColumns"
          :rows="group"
          :title="t(`roleType.${key}`)"
        />
      </template>
    </div>
  </div>
</template>
