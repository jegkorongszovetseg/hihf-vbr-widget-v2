<script setup>
import { Image } from '@mjsz-vbr-elements/core/components';

defineProps({
  title: {
    type: String,
    default: 'hu',
  },

  list: {
    type: Array,
    default: () => [],
  },

  dataKey: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="top-list-container">
    <h3>{{ title }}</h3>
    <ul>
      <li v-for="player in list" :key="player.player.playerId">
        <Image :src="player.player.picture" />
        {{ player.name }}
        <span v-text="player[dataKey]" />
      </li>
    </ul>
  </div>
</template>
