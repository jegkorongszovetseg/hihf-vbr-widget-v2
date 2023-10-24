<script setup>
import { ref } from 'vue';
import { DataTable, ResponsiveTable } from '@mjsz-vbr-elements/core/components';
import { useI18n, useColumns } from '@mjsz-vbr-elements/core/composables';
import { COLUMNS_GAMES } from '../team.internal.js';

defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});

const tooltipContainer = ref(null);

const { t } = useI18n();
const { columns } = useColumns(COLUMNS_GAMES);
</script>

<template>
  <h2 class="is-heading-2">{{ t('teams.games') }}</h2>
  <ResponsiveTable>
    <DataTable :rows="data" :columns="columns" :append-to="tooltipContainer"></DataTable>
  </ResponsiveTable>
  <div ref="tooltipContainer"></div>
</template>
