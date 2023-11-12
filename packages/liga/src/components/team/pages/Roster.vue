<script setup>
import { ref } from 'vue';
import { omit } from 'ramda';
import { useI18n, useColumns } from '@mjsz-vbr-elements/core/composables';
import PlayersDataTable from '../../common/PlayersDataTable.vue';
import { COLUMNS_PLAYERS } from '../../internal';

defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },

  columns: {
    type: Object,
    default: () => ({}),
  },

  championshipId: {
    type: String,
    default: '',
  },

  externalPlayerResolver: {
    type: String,
    default: '',
  },
});

const tooltipContainer = ref(null);

const { t } = useI18n();
const { columns } = useColumns(omit(['teamName'], COLUMNS_PLAYERS));
</script>

<template>
  <template v-for="(players, key) in data" :key="key">
    <h2 class="is-heading-2">{{ t(`teams.${key}`) }}</h2>
    <PlayersDataTable
      :rows="players"
      :columns="columns"
      :championship-id="championshipId"
      :player-resolver="externalPlayerResolver"
      :append-to="tooltipContainer"
    />
  </template>

  <div ref="tooltipContainer"></div>
</template>
