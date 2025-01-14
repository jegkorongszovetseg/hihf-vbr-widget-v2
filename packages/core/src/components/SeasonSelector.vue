<script setup>
import { computed } from 'vue';
import { useI18n, useMainClass } from '../composables';
import BaseSelect from './BaseSelect.vue';

const props = defineProps({
  seasons: {
    type: Array,
    default: () => [],
  },

  championshipId: {
    type: Number,
    default: 0,
  },

  sections: {
    type: Array,
    default: () => [],
  },

  sectionId: {
    type: Number,
    default: 0,
  },

  isSectionSelectionDisabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['onChangeSeason', 'onChangeSection']);

const { t } = useI18n();

const championshipId = computed({
  get() {
    return props.championshipId;
  },
  set(value) {
    emit('onChangeSeason', value);
  },
});

function changeSection(id) {
  emit('onChangeSection', id);
}
</script>

<template>
  <div class="g-row g-gap-normal is-mb-5">
    <div>
      <label for="season" :class="useMainClass('label')">{{ t('selection.season') }}</label>
      <BaseSelect id="season" v-model="championshipId">
        <option v-for="season in seasons" :key="season.championshipId" :value="season.championshipId">
          {{ season.seasonName }}
        </option>
      </BaseSelect>
    </div>
    <slot />
  </div>
  <div v-if="!isSectionSelectionDisabled">
    <button
      v-for="section in sections"
      :key="section.phaseId"
      :class="[useMainClass('tab-button'), { 'is-active': section.sectionId === sectionId }]"
      @click="changeSection(section)"
    >
      {{ section.sectionName }}
    </button>
  </div>
</template>
