<script setup>
import { computed, toRefs } from 'vue';
import { useColumns } from '../composables/useColumns.js';
import { useError } from '../composables/useErrors';
import * as Errors from '../utils/errors';
import { DEFAULT_PORTRAIT_IMAGE_URL } from '../constants';
import ResponsiveTable from './ResponsiveTable.vue';
import DataTable from './DataTable.vue';
import Image from './Image.vue';
import LoadingIndicator from './LoadingIndicator.vue';

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
    type: HTMLElement,
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
      <template v-slot:cell-playerPortrait="{ row }">
        <div class="is-portrait-image">
          <Image :key="row.player.playerId" :src="row.player.picture" :default-src="DEFAULT_PORTRAIT_IMAGE_URL" />
        </div>
      </template>
      <template v-slot:cell-teamLogo="{ row }">
        <Image class="is-logo-image" :key="row.team?.id ?? row.id" :src="row.team?.logo" />
      </template>
      <template v-slot:cell-homeTeamLogo="{ row }">
        <Image class="is-logo-image is-right" :key="row.homeTeam?.id" :src="row.homeTeam?.logo" />
      </template>
      <template v-slot:cell-awayTeamLogo="{ row }">
        <Image class="is-logo-image is-right" :key="row.awayTeam?.id" :src="row.awayTeam?.logo" />
      </template>
      <template v-slot:cell-teamName="{ row }">
        <span class="is-team-name-long">{{ row.team?.longName }}</span>
        <span class="is-team-name-short">{{ row.team?.shortName }}</span>
      </template>
      <template v-slot:cell-homeTeamName="{ row }">
        <span class="is-team-name-long">{{ row.homeTeam?.longName }}</span>
        <span class="is-team-name-short">{{ row.homeTeam?.shortName }}</span>
      </template>
      <template v-slot:cell-awayTeamName="{ row }">
        <span class="is-team-name-long">{{ row.awayTeam?.longName }}</span>
        <span class="is-team-name-short">{{ row.awayTeam?.shortName }}</span>
      </template>
      <template v-if="isTeamLinked" v-slot:cell-teamName="{ row }">
        <a :href="externalTeamResolver(row.team?.longName)" target="_blank">
          <span class="is-team-name-long">{{ row.team?.longName }}</span>
          <span class="is-team-name-short">{{ row.team?.shortName }}</span>
        </a>
      </template>
      <template v-if="isPlayerLinked" v-slot:cell-name="{ row }">
        <a :href="externalPlayerResolver(row.id)" target="_blank">{{ row.name }}</a>
      </template>
      <template v-slot:cell-location="{ row }">
        {{ row.location?.locationName ?? '' }}
      </template>
      <template v-slot:cell-gameResult="{ row }">
        <span v-if="row.gameStatus === 0" class="is-text-dark">-:-</span>
        <a
          v-else
          :href="externalGameResolver(row.gameId)"
          :target="externalGameResolverTarget"
          :class="{ 'is-text-dark': row.gameStatus !== 1, 'is-text-accent': row.gameStatus === 1 }"
        >
          {{ row.homeTeamScore }}:{{ row.awayTeamScore }}
        </a>
      </template>

      <template v-slot:loading>
        <LoadingIndicator />
      </template>
    </DataTable>
  </ResponsiveTable>
</template>
