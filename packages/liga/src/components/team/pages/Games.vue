<script setup>
import { ref } from 'vue';
import { DataTable, ResponsiveTable } from '@mjsz-vbr-elements/core/components';
import { COLUMNS_GAMES } from '../team.internal.js';

defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});

const tooltipContainer = ref(null);
</script>

<template>
  <h2>Lejátszott mérkőzések</h2>
  <ResponsiveTable>
    <DataTable :rows="data" :columns="COLUMNS_GAMES" :append-to="tooltipContainer"></DataTable>
  </ResponsiveTable>
  <div ref="tooltipContainer"></div>
</template>
