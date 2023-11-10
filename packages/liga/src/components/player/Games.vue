<script setup>
import { computed } from 'vue';
import { useColumns, useI18n } from '@mjsz-vbr-elements/core/composables';
import { offsetName } from '@mjsz-vbr-elements/core/utils';
import GamesDataTable from '../common/GamesDataTable.vue';
import { COLUMNS_GAMES } from '../internal';

const props = defineProps({
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
    default: () => ({}),
  },

  championshipId: {
    type: String,
    default: '',
  },
});

const { t } = useI18n();

const { columns } = useColumns(
  COLUMNS_GAMES,
  null,
  computed(() => ({ offsetName: offsetName(new Date(), null, 'hu') }))
);
</script>

<template>
  <h2 class="is-heading-2">{{ t('player.games') }}</h2>
  <GamesDataTable :rows="rows" :columns="columns" :append-to="appendTo" />
</template>
