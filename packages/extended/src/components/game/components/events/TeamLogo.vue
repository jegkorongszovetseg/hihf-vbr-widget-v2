<script setup>
import { computed, ref } from 'vue';
import { Image, FloatingPanel } from '@mjsz-vbr-elements/core/components';
import { DEAFULT_LOGO_TEAM_A, DEAFULT_LOGO_TEAM_B } from '../../internal';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },

  logo: {
    type: String,
    required: true,
  },

  isHomeTeam: {
    type: Boolean,
    default: true,
  },
});

const tooltipContainer = ref(null);

const defaultSrc = computed(() => (props.isHomeTeam ? DEAFULT_LOGO_TEAM_A : DEAFULT_LOGO_TEAM_B));
</script>

<template>
  <FloatingPanel
    :offset="2"
    placement="top"
    theme="tooltip"
    :content="name"
    :append-to="tooltipContainer"
    v-slot:default="{ setRef, events }"
  >
    <span :ref="setRef" :tabindex="0" v-on="events">
      <Image :src="logo" :default-src="defaultSrc" />
    </span>
  </FloatingPanel>
  <div ref="tooltipContainer" />
</template>
