<script setup>
import { BaseSelect } from '@mjsz-vbr-elements/core/components';
import { useI18n, useMainClass } from '@mjsz-vbr-elements/core/composables';
import { useVModels } from '@vueuse/core';

const props = defineProps({
  seasons: {
    type: Array,
    default: () => [],
  },

  championshipId: {
    type: Number,
    default: 0,
  },

  months: {
    type: Array,
    default: () => [],
  },

  selectedMonth: {
    type: Number,
    default: null,
  },

  teams: {
    type: Array,
    default: () => [],
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

const { championshipId } = useVModels(props, emit);

const baseLabelClass = useMainClass('label');
</script>

<template>
  <div class="g-row" style="column-gap: 8px; padding-block-start: 15px;">
    <div>
      <label for="season" :class="baseLabelClass">{{ t('selection.season') }}</label>
      <BaseSelect id="season" v-model="championshipId">
        <option v-for="season in seasons" :key="season.championshipId" :value="season.championshipId">
          {{ season.seasonName }}
        </option>
      </BaseSelect>
    </div>
  </div>
</template>
