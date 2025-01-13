<script setup>
import { reactive } from 'vue';
import { head } from 'ramda';
import { useServices } from '@mjsz-vbr-elements/core/composables';

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
})

const { state, execute } = useServices({
  options: {
    path: '/v2/standings',
    apiKey: props.apiKey,
    params: { championshipId: service.championshipId, phaseId: service.phaseId },
  },
  // transform: (res) => transformSeasons(res, state),
  // onError,
});

execute();

</script>

<template>
  <slot v-bind="{ state }" />
</template>

<style lang="scss" scoped></style>
