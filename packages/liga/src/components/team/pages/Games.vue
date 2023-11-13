<script setup>
import { ref, computed } from 'vue';
import { pick } from 'ramda';
import { DataTable, ResponsiveTable } from '@mjsz-vbr-elements/core/components';
import { useI18n, useColumns } from '@mjsz-vbr-elements/core/composables';
import { offsetName } from '@mjsz-vbr-elements/core/utils';
import { COLUMNS_GAMES } from '../../internal.js';

defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});

const tooltipContainer = ref(null);

const { t } = useI18n();
const { columns } = useColumns(
  pick(['gameDateDate', 'gameDateTime', 'gameResult', 'opponent', 'resultType', 'sog', 'sa', 'pp', 'pk'], COLUMNS_GAMES),
  null,
  computed(() => ({ offsetName: offsetName(new Date(), null, 'hu') }))
);
</script>

<template>
  <h2 class="is-heading-2">{{ t('teams.games') }}</h2>
  <ResponsiveTable>
    <DataTable :rows="data" :columns="columns" :append-to="tooltipContainer">
      <template v-slot:cell-resultType="{ row }">
        <span
          :class="[
            'is-badge',
            {
              'is-green': ['W', 'OTW', 'SOW'].includes(row.resultType),
              'is-red': ['L', 'OTL', 'SOL'].includes(row.resultType),
              'is-yellow': row.resultType === 'D',
            },
          ]"
        >
          {{ row.resultType }}
        </span>
      </template>
    </DataTable>
  </ResponsiveTable>
  <div ref="tooltipContainer"></div>
</template>
