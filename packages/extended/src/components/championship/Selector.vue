<script setup>
import { useVModels } from '@vueuse/core';
import { useI18n, useMainClass } from '@mjsz-vbr-elements/core/composables';
import { BaseSelect } from '@mjsz-vbr-elements/core/components';

const props = defineProps({
  phases: {
    type: Array,
    default: () => [],
  },

  phaseId: {
    type: Number,
    default: null,
  },
});

const emit = defineEmits(['update:phaseId']);

const { t } = useI18n();

const { phaseId } = useVModels(props, emit);

const baseLabelClass = useMainClass('label');
</script>

<template>
  <div class="g-row" style="column-gap: 8px">
    <div>
      <label for="phases" :class="baseLabelClass">{{ t('selection.phases') }}</label>
      <BaseSelect id="phases" v-model="phaseId" :disabled="phaseId === null">
        <option v-if="phaseId === null" :value="null">{{ t('selection.noPhases') }}</option>
        <option v-for="phase in phases" :key="phase.phaseId" :value="phase.phaseId">{{ phase.phaseName }}</option>
      </BaseSelect>
    </div>
  </div>
</template>
