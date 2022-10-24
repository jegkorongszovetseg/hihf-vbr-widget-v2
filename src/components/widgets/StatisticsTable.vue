<script setup>
import { computed } from 'vue';
import { useColumns } from '../../composables/useColumns.js';
import ResponsiveTable from '../ResponsiveTable.vue';
import Image from '../Image.vue';
import DataTable from '../DataTable.vue';
import ErrorNotice from '../ErrorNotice.vue';
import { DEFAULT_PORTRAIT_IMAGE_URL } from '../../constants';

const props = defineProps({
  columns: {
    type: Object,
    required: true,
  },

  rows: {
    type: Array,
    default: () => [],
  },

  isLoading: {
    type: Boolean,
    deafult: false,
  },

  hideColumns: {
    type: String,
    default: '',
  },

  sort: {
    type: Object,
    default: () => ({}),
  },

  externalTeamResolver: {
    type: Function,
    required: true,
  },

  externalPlayerResolver: {
    type: Function,
    required: true,
  },

  isTeamLinked: {
    type: Boolean,
    default: false,
  },

  isPlayerLinked: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['sort']);

const currentColumns = computed(() => props.columns);
const { columns, error } = useColumns(currentColumns, props.hideColumns);

const onSort = (payload) => emit('sort', payload);
</script>

<template>
  <ErrorNotice v-if="error">{{ error }}</ErrorNotice>
  <ResponsiveTable v-slot:default="{ el: rootElement }">
    <DataTable
      :columns="columns"
      :sort="props.sort"
      :rows="props.rows"
      :is-loading="isLoading"
      :append-to="rootElement"
      @sort="onSort"
    >
      <template v-slot:cell-index="{ row }">
        <span :class="row.indexClass">
          {{ row.index }}
        </span>
      </template>
      <template v-slot:cell-playerPortrait="{ row }">
        <div class="is-portrait-image">
          <Image :key="row.id || row.playerId" :src="row.playerPortrait" :default-src="DEFAULT_PORTRAIT_IMAGE_URL" />
        </div>
      </template>
      <template v-slot:cell-teamLogo="{ row }">
        <Image class="is-logo-image" :key="row.teamId" :src="row.teamLogo" />
      </template>
      <template v-if="isTeamLinked" v-slot:cell-teamName="{ row }">
        <a :href="externalTeamResolver(row.teamName)" target="_blank">{{ row.teamName }}</a>
      </template>
      <template v-if="isPlayerLinked" v-slot:cell-name="{ row }">
        <a :href="externalPlayerResolver(row.id)" target="_blank">{{ row.name }}</a>
      </template>
    </DataTable>
  </ResponsiveTable>
</template>
