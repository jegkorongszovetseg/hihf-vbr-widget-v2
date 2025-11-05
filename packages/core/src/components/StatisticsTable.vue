<script setup>
import { computed, toRefs } from 'vue';
import { useI18n } from '../composables';
import { useColumns } from '../composables/useColumns.js';
import { useError } from '../composables/useErrors';
import { DEFAULT_PORTRAIT_IMAGE_URL } from '../constants';
import * as Errors from '../utils/errors';
import DataTable from './DataTable.vue';
import Image from './Image.vue';
import LoadingIndicator from './LoadingIndicator.vue';
import ResponsiveTable from './ResponsiveTable.vue';

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

const { t } = useI18n();

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

      <template #cell-playerPortrait="{ row }">
        <div class="avatar">
          <Image :key="row.player.playerId" :src="row.player.picture" :default-src="DEFAULT_PORTRAIT_IMAGE_URL" />
        </div>
      </template>

      <template #cell-teamLogo="{ row }">
        <Image :key="row.team?.id ?? row.id" class="is-logo-image" :src="row.team?.logo" />
      </template>

      <template #cell-homeTeamLogo="{ row }">
        <Image :key="row.homeTeam?.id" class="is-logo-image is-right" :src="row.homeTeam?.logo" />
      </template>

      <template #cell-awayTeamLogo="{ row }">
        <Image :key="row.awayTeam?.id" class="is-logo-image is-right" :src="row.awayTeam?.logo" />
      </template>

      <template #cell-teamName="{ row }">
        <a v-if="isTeamLinked" :href="externalTeamResolver(row)" target="_blank">
          <span class="is-team-name-long">{{ row.team?.longName }}</span>
          <span class="is-team-name-short">{{ row.team?.shortName }}</span>
        </a>
        <template v-else>
          <span class="is-team-name-long">{{ row.team?.longName }} <span v-if="row.penaltyPoints"><sup>*</sup></span></span>
          <span class="is-team-name-short">{{ row.team?.shortName }} <span v-if="row.penaltyPoints"><sup>*</sup></span></span>
        </template>
      </template>

      <template #cell-homeTeamName="{ row }">
        <span class="is-team-name-long">{{ row.homeTeam?.longName }}</span>
        <span class="is-team-name-short">{{ row.homeTeam?.shortName }}</span>
      </template>

      <template #cell-awayTeamName="{ row }">
        <span class="is-team-name-long">{{ row.awayTeam?.longName }}</span>
        <span class="is-team-name-short">{{ row.awayTeam?.shortName }}</span>
      </template>

      <template v-if="isPlayerLinked" #cell-name="{ row }">
        <a :href="externalPlayerResolver(row)" target="_blank">{{ row.name }}</a>
      </template>

      <template #cell-location="{ row }">
        {{ row.location?.locationName ?? '' }}
      </template>

      <template #cell-gameResult="{ row }">
        <span v-if="row.gameStatus === 0" class="text-highlighted">-:-</span>
        <a
          v-else
          :href="externalGameResolver(row)"
          :target="externalGameResolverTarget"
          :class="{ 'text-highlighted': row.gameStatus !== 1, 'is-text-accent': row.gameStatus === 1 }"
        >
          {{ row.homeTeamScore }}:{{ row.awayTeamScore }}
        </a>
      </template>

      <template #cell-gameResultType="{ row }">
        <span v-if="row.isOvertime" class="label">{{ t('common.overtimeShort') }}</span>
        <span v-if="row.isShootout" class="label">{{ t('common.shootoutShort') }}</span>
        <span v-if="row.seriesStandings" class="label">{{ row.seriesStandings }}</span>
      </template>

      <template #loading>
        <LoadingIndicator />
      </template>

      <template v-if="$slots.caption" #caption>
        <slot name="caption" />
      </template>
    </DataTable>
  </ResponsiveTable>
</template>
