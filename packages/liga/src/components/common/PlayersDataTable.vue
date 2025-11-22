<script setup>
import { DataTable, FloatingPanel, Image, ResponsiveTable } from '@mjsz-vbr-elements/core/components';
import { useColumns, useI18n } from '@mjsz-vbr-elements/core/composables';
import { DEFAULT_PORTRAIT_IMAGE_URL } from '@mjsz-vbr-elements/core/constants';
import { flagResolver } from '@mjsz-vbr-elements/core/utils';

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

  sort: {
    type: Object,
    default: () => ({}),
  },

  isLoading: {
    type: Boolean,
    default: false,
  },

  playerResolver: {
    type: Function,
    default: () => ({}),
  },

  teamResolver: {
    type: Function,
    default: () => ({}),
  },

  championshipId: {
    type: [String, Number],
    default: '',
  },
});

const emit = defineEmits(['sort']);

const { t } = useI18n();

const { columns } = useColumns(props.columns);

const onSort = payload => emit('sort', payload);
</script>

<template>
  <ResponsiveTable>
    <DataTable
      :columns="columns"
      :rows="rows"
      :is-loading="isLoading"
      :append-to="appendTo"
      :sort="sort"
      @sort="onSort"
    >
      <template #cell-playerPortrait="{ row }">
        <div class="avatar">
          <Image :key="row.player.playerId" :src="row.player.picture" :default-src="DEFAULT_PORTRAIT_IMAGE_URL" />
        </div>
      </template>

      <template #cell-name="{ row }">
        <a :href="playerResolver({ ...row, championshipId })" v-text="row.name" />
      </template>

      <template #cell-teamName="{ row }">
        <a :href="teamResolver({ ...row, championshipId })" v-text="row.teamName" />
      </template>

      <template #cell-nationality="{ row }">
        <template v-for="nationality in row.player.nationality" :key="nationality">
          <FloatingPanel
            v-slot="{ setRef, events }"
            placement="top"
            :content="t(`nationality.${nationality}`)"
            :append-to="appendTo"
          >
            <div
              :ref="setRef"
              class="avatar"
              v-bind="events"
            >
              <Image :src="flagResolver(nationality)" />
            </div>
          </FloatingPanel>
        </template>
      </template>

      <template #cell-position="{ row }">
        {{ row.position?.toUpperCase() }}
      </template>
    </DataTable>
  </ResponsiveTable>
</template>
