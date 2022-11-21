<script setup>
import { COLUMNS_SCHEDULE, DEFAULT_EXTERNAL_BASE_URL } from '@VbrWidget/core';
import { useColumns, useI18n, useError } from '@VbrWidget/composables';
import { WidgetError, UndefinedColumn } from '@VbrWidget/utils';
import { FloatingPanel, ResponsiveTable, Image, DataTable } from '@VbrWidget/components';
import IconBroadcast from '../@core/icons/IconBroadcast.vue';
import IconMore from '../@core/icons/IconMore.vue';
import IconSheet from '../@core/icons/IconSheet.vue';
import IconYoutube from '../@core/icons/IconYoutube.vue';

const props = defineProps({
  rows: {
    type: Array,
    default: () => [],
  },

  isLoading: {
    type: Boolean,
    deafult: false,
  },

  externalBaseUrl: {
    type: String,
    default: DEFAULT_EXTERNAL_BASE_URL,
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
});

const { onError } = useError();

const { columns, error } = useColumns(COLUMNS_SCHEDULE, props.hideColumns, { offsetName: props.offsetName });
if (error.value)
  onError(
    new WidgetError(UndefinedColumn.message, {
      ...UndefinedColumn.options,
      cause: { column: error.value },
    })
  );
const { t } = useI18n();
</script>

<template>
  <ResponsiveTable v-slot:default="{ el: rootElement }">
    <DataTable :columns="columns" :rows="props.rows" :is-loading="isLoading" :append-to="rootElement">
      <template v-slot:cell-homeTeamLogo="{ row }">
        <Image class="is-logo-image is-right" :key="row.id" :src="row.homeTeamLogo" />
      </template>
      <template v-slot:cell-awayTeamLogo="{ row }">
        <Image class="is-logo-image is-right" :key="row.id" :src="row.awayTeamLogo" />
      </template>
      <template v-slot:cell-gameResult="{ row }">
        <span v-if="row.gameStatus === 0" class="is-text-dark">-:-</span>
        <a
          v-else
          :href="externalGameResolver(row.id)"
          target="_blank"
          :class="{ 'is-text-dark': row.gameStatus !== 1, 'is-text-accent': row.gameStatus === 1 }"
        >
          {{ row.homeTeamScore }}:{{ row.awayTeamScore }}
        </a>
      </template>
      <template v-slot:cell-gameResultType="{ row }">
        <span v-if="row.isOvertime" class="label">{{ t('common.overtimeShort') }}</span>
        <span v-if="row.isShootout" class="label">{{ t('common.shootoutShort') }}</span>
        <span v-if="row.seriesStandings" class="label">{{ row.seriesStandings }}</span>
      </template>
      <template v-slot:cell-broadcast="{ row }">
        <IconBroadcast v-if="row.broadcast" />
        <span v-else></span>
      </template>
      <template v-slot:cell-more="{ row }">
        <FloatingPanel :offset="2" placement="left" theme="content" :append-to="rootElement">
          <template v-slot:default="{ setRef, show }">
            <button :ref="setRef" @click.stop="show">
              <IconMore />
            </button>
          </template>
          <template v-slot:content>
            <ul class="is-dropdown-menu">
              <li>
                <a :href="externalBaseUrl + row.id" class="is-dropdown-item" target="_blank">
                  <IconSheet width="14" />
                  Jegyzőkönyv
                </a>
              </li>
              <li v-if="row.video">
                <a :href="row.video" class="is-dropdown-item" target="_blank">
                  <IconYoutube width="14" />
                  Videó
                </a>
              </li>
            </ul>
          </template>
        </FloatingPanel>
      </template>
    </DataTable>
  </ResponsiveTable>
</template>
