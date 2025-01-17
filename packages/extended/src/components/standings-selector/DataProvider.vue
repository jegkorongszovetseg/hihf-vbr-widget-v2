<script setup>
import { useServices } from '@mjsz-vbr-elements/core/composables';
import { convert } from '@mjsz-vbr-elements/core/utils';
import { head } from 'ramda';
import { computed, reactive } from 'vue';

const props = defineProps({
  apiKey: {
    type: String,
    default: '',
  },

  data: {
    type: Array,
    default: () => [],
  },
});

const service = reactive({
  championshipId: head(props.data).championshipId,
  phaseId: head(props.data).phaseId,
  championshipName: head(props.data).name,
  phaseName: head(props.data).phase,
});

const { state: rows, execute } = useServices({
  options: {
    path: '/v2/standings',
    apiKey: props.apiKey,
    params: { championshipId: service.championshipId, phaseId: service.phaseId },
  },
  // transform: (res) => transformSeasons(res, state),
  // onError,
});

execute();

const convertedRows = computed(() => {
  return convert(rows.value).addContinuousIndex().value();
});

function onChange({ championshipId, phaseId, name, phase }) {
  service.championshipId = championshipId;
  service.phaseId = phaseId;
  service.championshipName = name;
  service.phaseName = phase;
  execute();
}
</script>

<template>
  <slot v-bind="{ state: convertedRows, ...service, onChange }" />
</template>

<style lang="scss" scoped></style>
