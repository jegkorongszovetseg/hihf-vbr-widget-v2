<script setup>
import { ref } from 'vue';
import { DataTable, ResponsiveTable } from '@mjsz-vbr-elements/core/components';
import { COLUMNS_ROSTER } from '../team.internal.js';

defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },

  columns: {
    type: Object,
    default: () => ({}),
  },
});

const tooltipContainer = ref(null);
</script>
<template>
  <template v-for="(players, key) in data" :key="key">
    <h2>{{ key }}</h2>
    <ResponsiveTable>
      <DataTable :rows="players" :columns="COLUMNS_ROSTER" :append-to="tooltipContainer"></DataTable>
    </ResponsiveTable>
  </template>
  <div ref="tooltipContainer"></div>
</template>
