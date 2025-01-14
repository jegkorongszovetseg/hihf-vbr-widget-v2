<script setup>
import { BaseSelect } from '@mjsz-vbr-elements/core/components';
import { useI18n, useMainClass } from '@mjsz-vbr-elements/core/composables';
import { useVModels } from '@vueuse/core';
import { computed } from 'vue';

const props = defineProps({
  seasons: {
    type: Array,
    defauét: () => [],
  },

  championshipId: {
    type: Number,
    default: 0,
  },

  months: {
    type: Array,
    defauét: () => [],
  },

  selectedMonth: {
    type: Number,
    default: null,
  },

  teams: {
    type: Array,
    defauét: () => [],
  },

  selectedTeam: {
    type: Number,
    default: null,
  },

  selectedTeamGameType: {
    type: String,
    default: 'all',
  },
});

const emit = defineEmits([
  'update:championshipId',
  'update:selectedMonth',
  'update:selectedTeam',
  'update:selectedTeamGameType',
]);

const { t } = useI18n();

const { championshipId, selectedMonth, selectedTeam, selectedTeamGameType } = useVModels(props, emit);

const isGameTypeDisabled = computed(() => selectedTeam.value === null);

const baseLabelClass = useMainClass('label');
</script>

<template>
  <div class="g-grid" style="column-gap: 8px; padding-block: 15px; --columns-tablet: repeat(4, max-content);">
    <div>
      <label for="season" :class="baseLabelClass">{{ t('selection.season') }}</label>
      <BaseSelect id="season" v-model="championshipId">
        <option v-for="season in seasons" :key="season.championshipId" :value="season.championshipId">
          {{ season.seasonName }}
        </option>
      </BaseSelect>
    </div>
    <div>
      <label for="months" :class="baseLabelClass">{{ t('selection.month') }}</label>
      <BaseSelect id="months" v-model="selectedMonth">
        <option :value="null">
          {{ t('common.all') }}
        </option>
        <option v-for="month in months" :key="month.value" :value="month.value">
          {{ month.name }}
        </option>
      </BaseSelect>
    </div>
    <div>
      <label for="teams" :class="baseLabelClass">{{ t('selection.teams') }}</label>
      <BaseSelect id="teams" v-model="selectedTeam">
        <option :value="null">
          {{ t('common.all') }}
        </option>
        <option v-for="team in teams" :key="team.teamId" :value="team.teamId">
          {{ team.teamName }}
        </option>
      </BaseSelect>
    </div>
    <div>
      <label for="type" :class="baseLabelClass">{{ t('selection.homeOrAway') }}</label>
      <BaseSelect id="type" v-model="selectedTeamGameType" :disabled="isGameTypeDisabled">
        <option value="all">
          {{ t('common.all') }}
        </option>
        <option value="home">
          {{ t('selection.home') }}
        </option>
        <option value="away">
          {{ t('selection.away') }}
        </option>
      </BaseSelect>
    </div>
  </div>
</template>
