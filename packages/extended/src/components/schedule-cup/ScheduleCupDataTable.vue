<script setup>
import { DataTable, ResponsiveTable } from '@mjsz-vbr-elements/core/components';
import { useColumns, useI18n } from '@mjsz-vbr-elements/core/composables';
import { computed, ref } from 'vue';

const props = defineProps({
  columns: {
    type: Object,
    default: () => ({}),
  },

  rows: {
    type: Array,
    default: () => [],
  },

  offsetName: {
    type: String,
    default: '',
  },

  isLoading: {
    type: Boolean,
    default: false,
  },
});

const tooltipContainer = ref(null);

const { columns } = useColumns(
  props.columns,
  null,
  computed(() => ({
    offsetName: props.offsetName,
  })),
);
const { t } = useI18n();
</script>

<template>
  <div ref="tooltipContainer">
    <ResponsiveTable>
      <DataTable :columns="columns" :rows="rows" :is-loading="isLoading" :append-to="tooltipContainer">
        <template #cell-homeTeamName="{ row }">
          {{ row.homeTeam?.longName ?? '' }}
        </template>

        <template #cell-location="{ row }">
          {{ row.location?.locationName ?? '' }}
        </template>

        <template #cell-document="{ row }">
          <a v-if="row.schedule" :href="row.schedule" target="_blank">
            {{ t('schedule') }}
          </a>
          <a v-else-if="row.registration" :href="row.registration" target="_blank">
            {{ t('registration') }}
          </a>
        </template>
      </DataTable>
    </ResponsiveTable>
  </div>
</template>
