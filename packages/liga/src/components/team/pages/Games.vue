<script setup>
import { useColumns, useI18n } from '@mjsz-vbr-elements/core/composables';
import { offsetName, pick } from '@mjsz-vbr-elements/core/utils';
import { computed, ref } from 'vue';
import GamesDataTable from '../../common/GamesDataTable.vue';
import { COLUMNS_GAMES } from '../../internal.js';

defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },

  gameResolver: {
    type: [String, Function],
    default: '',
  },
});

const tooltipContainer = ref(null);

const { t } = useI18n();
const { columns } = useColumns(
  pick(
    [
      'gameDateDate',
      'gameDateTime',
      'gameResult',
      'gameResultType',
      'opponent',
      'resultType',
      'sog',
      'sa',
      'powerplay',
      'penaltyKilling',
    ],
    COLUMNS_GAMES,
  ),
  null,
  computed(() => ({ offsetName: offsetName(new Date(), null, 'hu') })),
);
</script>

<template>
  <h2>
    {{ t('teams.games') }}
  </h2>
  <GamesDataTable :rows="data" :columns="columns" :game-resolver="gameResolver" :append-to="tooltipContainer" />
  <div ref="tooltipContainer" />
</template>
