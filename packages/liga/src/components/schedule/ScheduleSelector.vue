<script setup>
import { BaseSelect, FormField } from '@mjsz-vbr-elements/core/components';
import { useI18n } from '@mjsz-vbr-elements/core/composables';
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
</script>

<template>
  <div class="flex-container py-md">
    <FormField name="season" :label="t('selection.season')">
      <BaseSelect id="season" v-model="championshipId">
        <option v-for="season in seasons" :key="season.championshipId" :value="season.championshipId">
          {{ season.seasonName }}
        </option>
      </BaseSelect>
    </FormField>
    <FormField name="months" :label="t('selection.month')">
      <BaseSelect id="months" v-model="selectedMonth">
        <option :value="null">
          {{ t('common.all') }}
        </option>
        <option v-for="month in months" :key="month.value" :value="month.value">
          {{ month.name }}
        </option>
      </BaseSelect>
    </FormField>
    <FormField name="teams" :label="t('selection.teams')">
      <BaseSelect id="teams" v-model="selectedTeam">
        <option :value="null">
          {{ t('common.all') }}
        </option>
        <option v-for="team in teams" :key="team.teamId" :value="team.teamId">
          {{ team.teamName }}
        </option>
      </BaseSelect>
    </FormField>
    <FormField name="type" :label="t('selection.homeOrAway')">
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
    </FormField>
  </div>
</template>
