<script setup>
import { ref, computed } from 'vue';
import { pick } from 'ramda';
import { useI18n, useColumns } from '@mjsz-vbr-elements/core/composables';
import { offsetName } from '@mjsz-vbr-elements/core/utils';
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
    ['gameDateDate', 'gameDateTime', 'gameResult', 'gameResultType', 'opponent', 'resultType', 'sog', 'sa'], // 'pp', 'pk'
    COLUMNS_GAMES
  ),
  null,
  computed(() => ({ offsetName: offsetName(new Date(), null, 'hu') }))
);
</script>

<template>
  <h2 class="is-heading-2">{{ t('teams.games') }}</h2>
  <GamesDataTable :rows="data" :columns="columns" :game-resolver="gameResolver" :append-to="tooltipContainer" />
  <div ref="tooltipContainer"></div>
</template>
