<script setup>
import { DataTable, ResponsiveTable } from '@mjsz-vbr-elements/core/components';
import { useI18n } from '@mjsz-vbr-elements/core/composables';

const props = defineProps({
  columns: {
    type: Object,
    default: () => ({}),
  },

  rows: {
    type: Array,
    default: () => [],
  },

  appendTo: {
    type: [Object, String],
    default: null,
  },

  // sort: {
  //   type: Object,
  //   default: () => ({}),
  // },

  isLoading: {
    type: Boolean,
    default: false,
  },

  gameResolver: {
    type: Function,
    default: () => undefined,
  },

  championshipId: {
    type: String,
    default: '',
  },
});

const { t } = useI18n();
</script>
<template>
  <ResponsiveTable>
    <DataTable :rows="rows" :columns="columns" :append-to="appendTo">
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

      <template v-slot:cell-teamName="{ row }">
        <span class="is-team-name-long">{{ row.team?.longName }}</span>
        <span class="is-team-name-short">{{ row.team?.shortName }}</span>
      </template>

      <template v-slot:cell-gameResult="{ row }">
        <span v-if="row.gameStatus === 0" class="is-text-dark">-:-</span>
        <a
          v-else
          :href="gameResolver(row)"
          :class="{ 'is-text-dark': row.gameStatus !== 1, 'is-text-accent': row.gameStatus === 1 }"
        >
          {{ row.gameResult }}
        </a>
      </template>

      <template v-slot:cell-gameResultType="{ row }">
        <span v-if="row.isOvertime" class="label">{{ t('common.overtimeShort') }}</span>
        <span v-if="row.isShootout" class="label">{{ t('common.shootoutShort') }}</span>
      </template>
    </DataTable>
  </ResponsiveTable>
</template>
