<script setup>
import { ref } from 'vue';
import { DataTable, ResponsiveTable } from '@mjsz-vbr-elements/core/components';
import { COLUMNS_TEAM_INFO, COLUMNS_TEAM_INFO_ICERINK } from '../team.internal.js';

defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});

const tooltipContainer = ref(null);
</script>

<template>
  <div>
    <h2 class="is-heading-2">Klub Információk</h2>
    <ResponsiveTable>
      <DataTable :columns="COLUMNS_TEAM_INFO" :append-to="tooltipContainer"></DataTable>
    </ResponsiveTable>
    <ResponsiveTable>
      <DataTable :columns="COLUMNS_TEAM_INFO_ICERINK" :append-to="tooltipContainer"></DataTable>
    </ResponsiveTable>
    <div ref="tooltipContainer"></div>
  </div>
</template>
