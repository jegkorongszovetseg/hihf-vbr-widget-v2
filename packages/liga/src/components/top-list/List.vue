<script setup>
import { Image } from '@mjsz-vbr-elements/core/components';
import IconRight from '@mjsz-vbr-elements/shared/icons/IconRight';

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
    <h2>
      {{ title }}
      <a href="#"><IconRight /></a>
    </h2>
    <ul>
      <li v-for="(player, index) in list" :key="player.player.playerId" :class="{ 'is-large': index === 0 }">
        <div class="is-images">
          <Image class="is-player" :src="player.player.picture" />
        </div>
        <a href="#" class="is-player">{{ player.name }}</a>
        <a href="#" class="is-team">{{ player.team.longName }}</a>
        <span v-text="player[dataKey]" />
      </li>
    </ul>
  </div>
</template>
