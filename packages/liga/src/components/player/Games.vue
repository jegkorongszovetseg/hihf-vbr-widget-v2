<script setup>
import { computed } from 'vue';
import { useColumns, useI18n } from '@mjsz-vbr-elements/core/composables';
import { offsetName } from '@mjsz-vbr-elements/core/utils';
import GamesDataTable from '../common/GamesDataTable.vue';

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
  computed(() => props.columns),
  null,
  computed(() => ({ offsetName: offsetName(new Date(), null, 'hu') }))
);
</script>

<template>
  <GamesDataTable :rows="rows" :columns="columns" :append-to="appendTo" />
</template>
