<script setup>
import { DataTable, ResponsiveTable } from '@mjsz-vbr-elements/core/components';
import { useColumns, useI18n } from '@mjsz-vbr-elements/core/composables';
import { computed, ref } from 'vue';
import { COLUMNS_TEAM_INFO } from '../team.internal.js';

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

const localizedData = computed(() => props.data.map(d => ({ ...d, teamKeyIntl: t(`teams.info.${d.teamKey}`) })));
</script>

<template>
  <div>
    <h2>
      {{ t('teams.teamInfo') }}
    </h2>
    <ResponsiveTable>
      <DataTable :columns="columnsTeamInfo" :rows="localizedData" :append-to="tooltipContainer">
        <template #cell-teamValue="{ row }">
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
    <div ref="tooltipContainer" />
  </div>
</template>
