<script setup>
import { DataTable, ResponsiveTable } from '@mjsz-vbr-elements/core/components';
import { useI18n } from '@mjsz-vbr-elements/core/composables';

defineProps({
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
    <DataTable :rows="rows" :columns="columns" :is-loading="isLoading" :append-to="appendTo">
      <template #cell-resultType="{ row }">
        <span
          class="is-badge" :class="[
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

      <template #cell-teamName="{ row }">
        <span class="is-team-name-long">{{ row.team?.longName }}</span>
        <span class="is-team-name-short">{{ row.team?.shortName }}</span>
      </template>

      <template #cell-gameResult="{ row }">
        <span v-if="row.gameStatus === 0" class="text-highlighted">-:-</span>
        <a
          v-else
          :href="gameResolver(row)"
          :class="{ 'text-highlighted': row.gameStatus !== 1, 'is-text-accent': row.gameStatus === 1 }"
        >
          {{ row.gameResult }}
        </a>
      </template>

      <template #cell-gameResultType="{ row }">
        <span v-if="row.isOvertime" class="label">{{ t('common.overtimeShort') }}</span>
        <span v-if="row.isShootout" class="label">{{ t('common.shootoutShort') }}</span>
      </template>

      <template #cell-powerplay="{ row }">
        {{ row.adv }} / {{ row.ppgf }}
      </template>

      <template #cell-penaltyKilling="{ row }">
        {{ row.dvg }} / {{ row.pk }}
      </template>
    </DataTable>
  </ResponsiveTable>
</template>
