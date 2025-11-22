<script setup>
import { useError, useServices } from '@mjsz-vbr-elements/core/composables';
import { convert, head } from '@mjsz-vbr-elements/core/utils';
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
const { onError, reset } = useError();

const service = reactive({
  championshipId: head(props.data).championshipId,
  phaseId: head(props.data).phaseId,
  path: head(props.data)?.path ?? '',
  championshipName: head(props.data).name,
  phaseName: head(props.data)?.phase ?? null,
  isPlayoffs: head(props.data)?.isPlayoffs ?? false,
});

const { state, isLoading, execute } = useServices({
  options: {
    path: computed(() => service.isPlayoffs ? '/v2/playoffs-tree' : '/v2/standings'),
    apiKey: props.apiKey,
    params: computed(() => ({ championshipId: service.championshipId, ...(!service.isPlayoffs && { phaseId: service.phaseId }) })),
    resetOnExecute: true,
    immediate: true,
  },
  transform: res => transformStandings(res),
  onError,
});

const convertedRows = computed(() => convert(state.value).addContinuousIndex().value());

const componentProps = computed(() => ({
  tag: service.path ? 'a' : 'span',
  props: {
    ...(service.path && { href: service.path }),
  },
}));

function onChange({ item: { championshipId, phaseId, name, path, phase, isPlayoffs }, close }) {
  service.championshipId = championshipId;
  service.path = path || '';
  service.phaseId = phaseId;
  service.championshipName = name;
  service.phaseName = phase;
  service.isPlayoffs = isPlayoffs || false;

  reset();
  execute();
  close?.();
}
</script>

<template>
  <slot v-bind="{ convertedRows, isLoading, ...service, componentProps, onChange }" />
</template>
