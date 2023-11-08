<script setup>
import { computed, ref } from 'vue';
import { curry, lensProp, map, over } from 'ramda';
import { DataTable, ResponsiveTable } from '@mjsz-vbr-elements/core/components';
import { useI18n, useColumns } from '@mjsz-vbr-elements/core/composables';
import { COLUMNS_TEAM_INFO, COLUMNS_TEAM_INFO_ICERINK } from '../team.internal.js';

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});

const tooltipContainer = ref(null);

const { t } = useI18n();
const { columns: columnsTeamInfo } = useColumns(COLUMNS_TEAM_INFO);
// const { columns: columnsIcerink } = useColumns(COLUMNS_TEAM_INFO_ICERINK);

const localizedData = computed(() => map((d) => ({ ...d, teamKeyIntl: t(`teams.info.${d.teamKey}`) }))(props.data));
</script>

<template>
  <div>
    <h2 class="is-heading-2">{{ t('teams.teamInfo') }}</h2>
    <ResponsiveTable>
      <DataTable :columns="columnsTeamInfo" :rows="localizedData" :append-to="tooltipContainer">
        <template v-slot:cell-teamValue="{ row }">
          <a v-if="row.teamKey === 'organizationEmail'" :href="`mailto:${row.teamValue}`">
            {{ row.teamValue }}
          </a>
          <a v-if="row.teamKey === 'organizationWebpage'" :href="`https://${row.teamValue}`" target="_blank">
            {{ row.teamValue }}
          </a>
        </template>
      </DataTable>
    </ResponsiveTable>
    <!-- <ResponsiveTable>
      <DataTable :columns="columnsIcerink" :append-to="tooltipContainer"></DataTable>
    </ResponsiveTable> -->
    <div ref="tooltipContainer"></div>
  </div>
</template>
