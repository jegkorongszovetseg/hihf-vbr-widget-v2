<script setup>
import { computed, toRefs } from 'vue';
import { useColumns, useError } from '@mjsz-vbr-elements/core/composables';
import * as Errors from '@mjsz-vbr-elements/core';
import { ResponsiveTable, DataTable, Image, LoadingIndicator } from '@mjsz-vbr-elements/core/components';
import IconArrowDown from '@mjsz-vbr-elements/shared/icons/IconArrowDown';
import IconArrowUp from '@mjsz-vbr-elements/shared/icons/IconArrowUp';

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
    default: () => {},
  },

  externalGameResolver: {
    type: Function,
    default: () => {},
  },

  externalGameResolverTarget: {
    type: String,
    default: '_self',
  },

  isTeamLinked: {
    type: Boolean,
    default: false,
  },

  isPlayerLinked: {
    type: Boolean,
    default: false,
  },

  appendTo: {
    type: [Object, String],
    default: null,
  },

  offsetName: {
    type: String,
    default: '',
  },
});

const { columns: currentColumns, hideColumns } = toRefs(props);

const emit = defineEmits(['sort']);

const { onError } = useError();

const { columns, error } = useColumns(
  currentColumns,
  hideColumns,
  computed(() => ({
    offsetName: props.offsetName,
  }))
);
if (error.value)
  onError(
    new Errors.WidgetError(Errors.UndefinedColumn.message, {
      ...Errors.UndefinedColumn.options,
      cause: { column: error.value },
    })
  );

const onSort = (payload) => emit('sort', payload);
</script>

<template>
  <ResponsiveTable v-slot:default="{ el: rootElement }">
    <DataTable
      :columns="columns"
      :sort="props.sort"
      :rows="props.rows"
      :is-loading="isLoading"
      :append-to="appendTo || rootElement"
      @sort="onSort"
    >
      <template v-slot:cell-index="{ row }">
        <span :class="row.indexClass">
          {{ row.index }}
        </span>
      </template>
      <template v-slot:cell-teamLogo="{ row }">
        <Image class="is-logo-image" :key="row.team?.id ?? row.id" :src="row.team?.logo" />
      </template>
      <template v-slot:cell-teamName="{ row }">
        <span class="is-team-name-long"
          >{{ row.team?.longName }} <span v-if="row.penaltyPoints"><sup>*</sup></span></span
        >
        <span class="is-team-name-short"
          >{{ row.team?.shortName }} <span v-if="row.penaltyPoints"><sup>*</sup></span></span
        >

        <template v-if="row.isActiveGame && row.diff !== 0">
          <IconArrowUp v-if="row.diff > 0" width="12" height="12" class="is-text-positive" />
          <IconArrowDown v-if="row.diff < 0" width="12" height="12" class="is-text-negative" />
          <span :class="{ 'is-text-positive': row.diff > 0, 'is-text-negative': row.diff < 0 }">{{ row.diff }}</span>
        </template>
      </template>
      <template v-if="isTeamLinked" v-slot:cell-teamName="{ row }">
        <a :href="externalTeamResolver(row.team?.longName)" target="_blank">
          <span class="is-team-name-long">{{ row.team?.longName }}</span>
          <span class="is-team-name-short">{{ row.team?.shortName }}</span>

          <template v-if="row.isActiveGame && row.diff !== 0">
            <IconArrowUp v-if="row.diff > 0" width="12" height="12" class="is-text-positive" />
            <IconArrowDown v-if="row.diff < 0" width="12" height="12" class="is-text-negative" />
            <span :class="{ 'is-text-positive': row.diff > 0, 'is-text-negative': row.diff < 0 }">{{ row.diff }}</span>
          </template>
        </a>
      </template>
      <template v-slot:cell-score="{ row }">
        <span
          v-if="row.isActiveGame"
          :class="[
            'is-badge is-large',
            { 'is-green': row.scoreType === 'W', 'is-red': row.scoreType === 'L', 'is-yellow': row.scoreType === 'D' },
          ]"
          >{{ row.score }}
        </span>
      </template>

      <template v-slot:loading>
        <LoadingIndicator />
      </template>
    </DataTable>
  </ResponsiveTable>
</template>
