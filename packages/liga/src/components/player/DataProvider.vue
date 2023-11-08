<script setup>
import { reactive, computed } from 'vue';
import { useUrlSearchParams } from '@vueuse/core';
import { useError, useServices } from '@mjsz-vbr-elements/core/composables';

const props = defineProps({
  playerId: {
    type: String,
    default: '',
  },

  championshipId: {
    type: String,
    default: '',
  },

  locale: {
    type: String,
    default: 'hu',
  },
});

const params = useUrlSearchParams('history');

const state = reactive({
  playerId: Number(params.playerId) || Number(props.playerId),
  championshipId: Number(params.championshipId) || Number(props.championshipId),
});

const { onError } = useError();

const { state: playerData } = useServices({
  options: {
    path: '/v2/player-data',
    apiKey: props.apiKey,
    params: computed(() => ({ championshipId: state.championshipId, playerId: state.playerId })),
    immediate: true,
  },
  // transform: (res) => transformTeamInfo(res),
  onError,
});
</script>
<template>
  <slot v-bind="{ playerData }"></slot>
</template>
