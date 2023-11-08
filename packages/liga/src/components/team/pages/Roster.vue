<script setup>
import { ref } from 'vue';
import { omit } from 'ramda';
import { DataTable, ResponsiveTable } from '@mjsz-vbr-elements/core/components';
import { useI18n, useColumns } from '@mjsz-vbr-elements/core/composables';
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

const { t } = useI18n();
const { columns } = useColumns(omit(['teamName'], COLUMNS_ROSTER));
</script>

<template>
  <template v-for="(players, key) in data" :key="key">
    <h2 class="is-heading-2">{{ t(`teams.${key}`) }}</h2>
    <ResponsiveTable>
      <DataTable :rows="players" :columns="columns" :append-to="tooltipContainer"></DataTable>
    </ResponsiveTable>
  </template>

  <div ref="tooltipContainer"></div>
</template>
