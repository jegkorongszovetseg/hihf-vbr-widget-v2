<script setup>
import { useVModels } from '@vueuse/core';
import { useI18n, useMainClass } from '@mjsz-vbr-elements/core/composables';
import { BaseSelect } from '@mjsz-vbr-elements/core/components';

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
});

const emit = defineEmits(['update:championshipId', 'update:sectionId']);

const { t } = useI18n();

const { championshipId } = useVModels(props, emit);

function changeSection(id) {
  emit('update:sectionId', id);
}
</script>
<template>
  <div class="g-row">
    <div>
      <label for="season" :class="useMainClass('label')">{{ t('selection.season') }}</label>
      <BaseSelect id="season" v-model="championshipId">
        <option v-for="season in seasons" :key="season.championshipId" :value="season.championshipId">
          {{ season.seasonName }}
        </option>
      </BaseSelect>
    </div>
  </div>
  <div>
    <button
      v-for="section in sections"
      :key="section.phaseId"
      @click="changeSection(section.sectionId)"
      :class="[useMainClass('tab-button'), { 'is-active': section.sectionId === sectionId }]"
    >
      {{ section.sectionName }}
    </button>
  </div>
</template>
