<script setup>
import { FloatingPanel, Image } from '@mjsz-vbr-elements/core/components';
import { computed, ref } from 'vue';
import { DEAFULT_LOGO_TEAM_A, DEAFULT_LOGO_TEAM_B } from '../../../game/internal';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },

  logo: {
    type: String,
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
    v-slot="{ setRef, events }"
    :offset="2"
    placement="top"
    theme="tooltip"
    :content="name"
    :append-to="tooltipContainer"
  >
    <span :ref="setRef" :tabindex="0" :aria-label="name" v-bind="events">
      <Image :src="logo" :default-src="defaultSrc" />
    </span>
  </FloatingPanel>
  <div ref="tooltipContainer" />
</template>
