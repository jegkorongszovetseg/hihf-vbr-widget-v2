<script setup>
import { Image, FloatingPanel } from '@mjsz-vbr-elements/core/components';

defineProps({
  name: {
    type: String,
    required: true,
  },

  logo: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <FloatingPanel :offset="2" placement="top" theme="tooltip" :content="name" v-slot:default="{ setRef, show, hide }">
    <span :ref="setRef" @mouseenter="show" @mouseleave="hide" @focus="show" @blur="hide">
      <Image :src="logo" />
    </span>
  </FloatingPanel>
</template>
