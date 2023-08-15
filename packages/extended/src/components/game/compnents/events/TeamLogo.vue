<script setup>
import { Image } from '@mjsz-vbr-elements/core/components';

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
  <div>
    <Image :src="logo" />
  </div>
</template>
