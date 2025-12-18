<script setup>
import { BaseSelect, FormField } from '@mjsz-vbr-elements/core/components';
import { useI18n } from '@mjsz-vbr-elements/core/composables';
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

  query: {
    type: String,
    required: true,
  },

  isReportsVisible: {
    type: Boolean,
    default: false,
  },

  isNameFilterVisible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:phaseId', 'update:report', 'update:query']);

const { t } = useI18n();

const { phaseId, report, query } = useVModels(props, emit);
</script>

<template>
  <div class="flex-container">
    <FormField :label="t('selection.phases')" name="phases" class="mb-md">
      <BaseSelect id="phases" v-model="phaseId" :disabled="phaseId === null">
        <option v-if="phaseId === null" :value="null">
          {{ t('selection.noPhases') }}
        </option>
        <option v-for="phase in phases" :key="phase.phaseId" :value="phase.phaseId">
          {{ phase.phaseName }}
        </option>
      </BaseSelect>
    </FormField>

    <FormField v-if="isReportsVisible" :label="t('selection.report')" name="report">
      <BaseSelect id="report" v-model="report">
        <option v-for="{ value, name } in reports" :key="value" :value="value">
          {{ name }}
        </option>
      </BaseSelect>
    </FormField>

    <FormField v-if="isNameFilterVisible" :label="t('selection.filter')" name="filter">
      <input id="filter" v-model="query" :placeholder="t('selection.filterName')" type="search" autocomplete="off">
    </FormField>
  </div>
</template>
