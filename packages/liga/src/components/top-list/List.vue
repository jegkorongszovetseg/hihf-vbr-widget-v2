<script setup>
import { Image } from '@mjsz-vbr-elements/core/components';
import { DEFAULT_PORTRAIT_IMAGE_URL } from '@mjsz-vbr-elements/core/constants';
import IconRight from '@mjsz-vbr-elements/shared/icons/IconRight';
import { noop } from '@vueuse/core';

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

  playerResolver: {
    type: Function,
    default: () => ({}),
  },

  teamResolver: {
    type: Function,
    default: () => ({}),
  },

  statResolver: {
    type: Function,
    default: noop,
  },

  externalId: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <div class="top-list-container">
    <h2>
      {{ title }}
      <a :href="statResolver(externalId)"><IconRight /></a>
    </h2>
    <ul>
      <li v-for="(player, index) in list" :key="player.player.playerId" :class="{ 'is-large': index === 0 }">
        <div class="is-images">
          <Image class="is-player" :src="player.player.picture" :default-src="DEFAULT_PORTRAIT_IMAGE_URL" />
        </div>
        <a :href="playerResolver(player)" class="is-player">{{ player.name }}</a>
        <a :href="teamResolver(player)" class="is-team">{{ player.team.longName }}</a>
        <span v-text="player[dataKey]" />
      </li>
    </ul>
  </div>
</template>
