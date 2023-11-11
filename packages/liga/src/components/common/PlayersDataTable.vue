<script setup>
import { Image, DataTable, ResponsiveTable, FloatingPanel } from '@mjsz-vbr-elements/core/components';
import { useColumns, useI18n } from '@mjsz-vbr-elements/core/composables';
import { flagResolver } from '@mjsz-vbr-elements/core/utils';
import { DEFAULT_PORTRAIT_IMAGE_URL } from '@mjsz-vbr-elements/core';

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
    type: String,
    default: '',
  },
});

const emit = defineEmits(['sort']);

const { t } = useI18n();

const { columns } = useColumns(props.columns);

const onSort = (payload) => emit('sort', payload);
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
      <template v-slot:cell-playerPortrait="{ row }">
        <div class="is-portrait-image">
          <Image :key="row.player.playerId" :src="row.player.picture" :default-src="DEFAULT_PORTRAIT_IMAGE_URL" />
        </div>
      </template>

      <template v-slot:cell-name="{ row }">
        <a :href="playerResolver(row.player?.playerId, championshipId)" v-text="row.name" />
      </template>

      <template v-slot:cell-teamName="{ row }">
        <a :href="teamResolver(row.team?.id, championshipId)" v-text="row.teamName" />
      </template>

      <template v-slot:cell-nationality="{ row }">
        <div class="g-row">
          <template v-for="nationality in row.nationalityCode" :key="nationality">
            <FloatingPanel
              placement="top"
              :content="t(`nationality.${nationality}`)"
              :append-to="appendTo"
              v-slot:default="{ setRef, show, hide }"
            >
              <div
                :ref="setRef"
                class="is-rounded is-w-5"
                @mouseenter="show"
                @mouseleave="hide"
                @focus="show"
                @blur="hide"
              >
                <Image :src="flagResolver(nationality)" />
              </div>
            </FloatingPanel>
          </template>
        </div>
      </template>

      <template v-slot:cell-position="{ row }"> {{ row.position?.toUpperCase() }} </template>
    </DataTable>
  </ResponsiveTable>
</template>
