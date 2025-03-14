<script setup>
import IconBroadcast from '@mjsz-vbr-elements/shared/icons/IconBroadcast';
import IconMore from '@mjsz-vbr-elements/shared/icons/IconMore';
import IconSheet from '@mjsz-vbr-elements/shared/icons/IconSheet';
import IconYoutube from '@mjsz-vbr-elements/shared/icons/IconYoutube';
import { whenever } from '@vueuse/core';
import { computed, ref } from 'vue';
import { COLUMNS_SCHEDULE } from '../columns';
import { useColumns, useError, useI18n } from '../composables';
import { UndefinedColumn, WidgetError } from '../utils';
import DataTable from './DataTable.vue';
import FloatingPanel from './FloatingPanel.vue';
import Image from './Image.vue';
import LoadingIndicator from './LoadingIndicator.vue';
import ResponsiveTable from './ResponsiveTable.vue';

const props = defineProps({
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

  offsetName: {
    type: String,
    default: '',
  },

  externalGameResolver: {
    type: Function,
    required: true,
  },

  externalGameResolverTarget: {
    type: String,
    default: '_blank',
  },
});

const tooltipContainer = ref(null);

const { onError } = useError();

const { columns, error } = useColumns(
  COLUMNS_SCHEDULE,
  computed(() => props.hideColumns),
  computed(() => ({
    offsetName: props.offsetName,
  })),
);

whenever(
  error,
  () =>
    onError(
      new WidgetError(UndefinedColumn.message, {
        ...UndefinedColumn.options,
        cause: { column: error.value },
      }),
    ),
  {
    immediate: true,
  },
);
const { t } = useI18n();
</script>

<template>
  <ResponsiveTable v-slot="{ el: rootElement }">
    <DataTable
      :columns="columns"
      :rows="props.rows"
      :is-loading="isLoading"
      :append-to="tooltipContainer || rootElement"
    >
      <template #cell-homeTeamName="{ row }">
        <template v-if="row.homeTeam">
          <span class="is-team-name-long">{{ row.homeTeam.longName }}</span>
          <span class="is-team-name-short">{{ row.homeTeam.shortName }}</span>
        </template>
      </template>
      <template #cell-awayTeamName="{ row }">
        <template v-if="row.awayTeam">
          <span class="is-team-name-long">{{ row.awayTeam.longName }}</span>
          <span class="is-team-name-short">{{ row.awayTeam.shortName }}</span>
        </template>
      </template>
      <template #cell-homeTeamLogo="{ row }">
        <Image v-if="row.homeTeam" :key="row.homeTeam.id" class="is-logo-image is-right" :src="row.homeTeam.logo" />
      </template>
      <template #cell-awayTeamLogo="{ row }">
        <Image v-if="row.awayTeam" :key="row.awayTeam.id" class="is-logo-image is-right" :src="row.awayTeam.logo" />
      </template>
      <template #cell-gameResult="{ row }">
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
      <template #cell-gameResultType="{ row }">
        <span v-if="row.isOvertime" class="label">{{ t('common.overtimeShort') }}</span>
        <span v-if="row.isShootout" class="label">{{ t('common.shootoutShort') }}</span>
        <span v-if="row.seriesStandings" class="label">{{ row.seriesStandings }}</span>
      </template>
      <template #cell-broadcast="{ row }">
        <IconBroadcast v-if="row.broadcast" />
        <span v-else />
      </template>
      <template #cell-location="{ row }">
        {{ row.location?.locationName ?? '' }}
      </template>
      <template #cell-more="{ row }">
        <FloatingPanel :offset="2" placement="left" theme="content" :append-to="rootElement">
          <template #default="{ setRef, show, hide }">
            <button :ref="setRef" @click.stop="show" @focus="show" @blur="hide">
              <IconMore />
            </button>
          </template>
          <template #content>
            <ul class="is-dropdown-menu">
              <li>
                <a
                  :href="externalGameResolver(row.gameId)"
                  class="is-dropdown-item"
                  :target="externalGameResolverTarget"
                >
                  <IconSheet width="14" />
                  {{ t('common.report') }}
                </a>
              </li>
              <li v-if="row.video">
                <a :href="row.video" class="is-dropdown-item" target="_blank">
                  <IconYoutube width="14" />
                  {{ t('common.video') }}
                </a>
              </li>
            </ul>
          </template>
        </FloatingPanel>
      </template>

      <template #loading>
        <LoadingIndicator />
      </template>
    </DataTable>
  </ResponsiveTable>
  <div ref="tooltipContainer" />
</template>
