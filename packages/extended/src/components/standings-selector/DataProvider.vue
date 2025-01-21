<script setup>
import { useServices } from '@mjsz-vbr-elements/core/composables';
import { convert } from '@mjsz-vbr-elements/core/utils';
import { head } from 'ramda';
import { computed, reactive } from 'vue';
import { transformStandings } from './internal';

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

const { state, isLoading, execute } = useServices({
  options: {
    path: '/v2/standings',
    apiKey: props.apiKey,
    params: computed(() => ({ championshipId: service.championshipId, phaseId: service.phaseId })),
  },
  transform: res => transformStandings(res),
  // onError,
});

execute();

const convertedRows = computed(() => {
  return convert(state.value).addContinuousIndex().value();
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
  <slot v-bind="{ convertedRows, isLoading, ...service, onChange }" />
</template>

<style lang="scss" scoped></style>
