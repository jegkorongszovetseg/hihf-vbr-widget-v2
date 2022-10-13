<script setup>
import { useColumns } from '../../composables/useColumns.js';
import { useI18n } from '../../composables/useI18n';
import { COLUMNS_SCHEDULE } from './internal';
import { DEFAULT_EXTERNAL_BASE_URL } from '../../constants.js';
import ResponsiveTable from '../ResponsiveTable.vue';
import Image from '../Image.vue';
import DataTable from '../DataTable.vue';
import IconBroadcast from '../icons/IconBroadcast.vue';
import IconMore from '../icons/IconMore.vue';
import FloatingPanel from '../FloatingPanel.vue';
import IconSheet from '../icons/IconSheet.vue';
import IconYoutube from '../icons/IconYoutube.vue';

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
});
const { columns, error } = useColumns(COLUMNS_SCHEDULE, props.hideColumns, { offsetName: 'CET' });
const { t } = useI18n();
</script>

<template>
  <div v-if="error">{{ error }}</div>
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
          :href="externalBaseUrl + row.id"
          target="_blank"
          :class="{ 'is-text-dark': row.gameStatus !== 1, 'is-text-accent': row.gameStatus === 1 }"
        >
          {{ row.homeTeamScore }}:{{ row.awayTeamScore }}
        </a>
      </template>
      <template v-slot:cell-gameResultType="{ row }">
        <span v-if="row.isOvertime" class="label">{{ t('common.overtimeShort') }}</span>
        <span v-if="row.isShootout" class="label">{{ t('common.shootoutShort').value }}</span>
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
