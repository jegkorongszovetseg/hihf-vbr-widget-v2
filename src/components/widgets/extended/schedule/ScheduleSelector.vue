<script setup>
import { computed } from 'vue';
import { useVModels } from '@vueuse/core';
import BaseSelect from '@/components/BaseSelect.vue';
import { useMainClass } from '@/composables/useMainClass';

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

const { championshipId, selectedMonth, selectedTeam, selectedTeamGameType } = useVModels(props, emit);

const isGameTypeDisabled = computed(() => selectedTeam.value === null);

const baseLabelClass = useMainClass('label');
</script>

<template>
  <div style="display: flex; column-gap: 8px">
    <div>
      <label for="season" :class="baseLabelClass">Szezon</label>
      <BaseSelect id="season" v-model="championshipId">
        <option v-for="season in seasons" :key="season.championshipId" :value="season.championshipId">
          {{ season.seasonName }}
        </option>
      </BaseSelect>
    </div>
    <div>
      <label for="months" :class="baseLabelClass">Month</label>
      <BaseSelect id="months" v-model="selectedMonth">
        <option value="">Mind</option>
        <option v-for="month in months" :key="month.value" :value="month.value">{{ month.name }}</option>
      </BaseSelect>
    </div>
    <div>
      <label for="teams" :class="baseLabelClass">Teams</label>
      <BaseSelect id="teams" v-model="selectedTeam">
        <option :value="null">Mind</option>
        <option v-for="team in teams" :key="team.teamId" :value="team.teamId">{{ team.teamName }}</option>
      </BaseSelect>
    </div>
    <div>
      <label for="type" :class="baseLabelClass">Home or Away</label>
      <BaseSelect id="type" v-model="selectedTeamGameType" :disabled="isGameTypeDisabled">
        <option value="all">Mind</option>
        <option value="home">Home</option>
        <option value="away">Away</option>
      </BaseSelect>
    </div>
  </div>
</template>
