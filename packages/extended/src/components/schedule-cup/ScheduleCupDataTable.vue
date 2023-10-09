<script setup>
import { computed, ref } from 'vue';
import { useColumns, useI18n } from '@mjsz-vbr-elements/core/composables';
import { ResponsiveTable, DataTable } from '@mjsz-vbr-elements/core/components';

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
});

const tooltipContainer = ref(null);

const { columns } = useColumns(
  props.columns,
  null,
  computed(() => ({
    offsetName: props.offsetName,
  }))
);
const { t } = useI18n();
</script>
<template>
  <div ref="tooltipContainer">
    <ResponsiveTable>
      <DataTable :columns="columns" :rows="rows" :append-to="tooltipContainer">
        <template v-slot:cell-homeTeamName="{ row }">
          {{ row.homeTeam?.longName ?? '' }}
        </template>

        <template v-slot:cell-location="{ row }">
          {{ row.location?.locationName ?? '' }}
        </template>

        <template v-slot:cell-document="{ row }">
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
