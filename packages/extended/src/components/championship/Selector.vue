<script setup>
import { BaseSelect } from '@mjsz-vbr-elements/core/components';
import { useI18n, useMainClass } from '@mjsz-vbr-elements/core/composables';
import { useVModels } from '@vueuse/core';

const props = defineProps({
  phases: {
    type: Array,
    default: () => [],
  },

  phaseId: {
    type: Number,
    default: null,
  },

  reports: {
    type: Array,
    required: true,
  },

  report: {
    type: String,
    required: true,
  },

  isReportsVisible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:phaseId', 'update:report']);

const { t } = useI18n();

const { phaseId, report } = useVModels(props, emit);

const baseLabelClass = useMainClass('label');

// const currentReportList = computed(() =>
//   report.report === PANEL_PLAYERS ? PLAYERS_REPORTS_SELECT(t) : TEAMS_REPORTS_SELECT(t)
// );
</script>

<template>
  <div class="g-row" style="column-gap: 8px">
    <div>
      <label for="phases" class="label">{{ t('selection.phases') }}</label>
      <BaseSelect id="phases" v-model="phaseId" :disabled="phaseId === null">
        <option v-if="phaseId === null" :value="null">
          {{ t('selection.noPhases') }}
        </option>
        <option v-for="phase in phases" :key="phase.phaseId" :value="phase.phaseId">
          {{ phase.phaseName }}
        </option>
      </BaseSelect>
    </div>
    <div v-if="isReportsVisible">
      <label for="report" :class="baseLabelClass">{{ t('selection.report') }}</label>
      <BaseSelect id="report" v-model="report">
        <option v-for="{ value, name } in reports" :key="value" :value="value">
          {{ name }}
        </option>
      </BaseSelect>
    </div>
  </div>
</template>
