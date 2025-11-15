<script setup>
import { DataTable, Image, LoadingIndicator, ResponsiveTable } from '@mjsz-vbr-elements/core/components';
import { useColumns, useError } from '@mjsz-vbr-elements/core/composables';
import * as Errors from '@mjsz-vbr-elements/core/constants';
import IconArrowDown from '@mjsz-vbr-elements/shared/icons/IconArrowDown';
import IconArrowUp from '@mjsz-vbr-elements/shared/icons/IconArrowUp';
import { computed, toRefs } from 'vue';

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

const emit = defineEmits(['sort']);

const { columns: currentColumns, hideColumns } = toRefs(props);

const { onError } = useError();

const { columns, error } = useColumns(
  currentColumns,
  hideColumns,
  computed(() => ({
    offsetName: props.offsetName,
  })),
);
if (error.value) {
  onError(
    new Errors.WidgetError(Errors.UndefinedColumn.message, {
      ...Errors.UndefinedColumn.options,
      cause: { column: error.value },
    }),
  );
}

const onSort = payload => emit('sort', payload);
</script>

<template>
  <ResponsiveTable v-slot="{ el: rootElement }">
    <DataTable
      :columns="columns"
      :sort="props.sort"
      :rows="props.rows"
      :is-loading="isLoading"
      :append-to="appendTo || rootElement"
      @sort="onSort"
    >
      <template #cell-index="{ row }">
        <span :class="row.indexClass">
          {{ row.index }}
        </span>
      </template>
      <template #cell-teamLogo="{ row }">
        <Image :key="row.team?.id ?? row.id" class="is-logo-image" :src="row.team?.logo" />
      </template>
      <template #cell-teamName="{ row }">
        <template v-if="isTeamLinked">
          <a :href="externalTeamResolver(row.team?.longName)" target="_blank">
            <span class="is-team-name-long">{{ row.team?.longName }}</span>
            <span class="is-team-name-short">{{ row.team?.shortName }}</span>

            <div v-if="row.isActiveGame && row.diff !== 0" class="badge mx-sm" :class="{ live: row.diff > 0, error: row.diff < 0 }">
              <IconArrowUp v-if="row.diff > 0" width="12" height="12" />
              <IconArrowDown v-if="row.diff < 0" width="12" height="12" />
              <span>{{ `${row.diff > 0 ? '+' : ''}${row.diff}` }}</span>
            </div>
          </a>
        </template>
        <template v-else>
          <span class="is-team-name-long">{{ row.team?.longName }} <span v-if="row.penaltyPoints"><sup>*</sup></span></span>
          <span class="is-team-name-short">{{ row.team?.shortName }} <span v-if="row.penaltyPoints"><sup>*</sup></span></span>

          <div v-if="row.isActiveGame && row.diff !== 0" class="badge mx-sm" :class="{ live: row.diff > 0, error: row.diff < 0 }">
            <IconArrowUp v-if="row.diff > 0" width="12" height="12" />
            <IconArrowDown v-if="row.diff < 0" width="12" height="12" />
            <span>{{ `${row.diff > 0 ? '+' : ''}${row.diff}` }}</span>
          </div>
        </template>
      </template>

      <template #cell-score="{ row }">
        <span
          v-if="row.isActiveGame"
          class="badge lg" :class="[
            { live: row.scoreType === 'W', error: row.scoreType === 'L', warning: row.scoreType === 'D' },
          ]"
        >{{ row.score }}
        </span>
      </template>

      <template #loading>
        <LoadingIndicator />
      </template>
    </DataTable>
  </ResponsiveTable>
</template>
