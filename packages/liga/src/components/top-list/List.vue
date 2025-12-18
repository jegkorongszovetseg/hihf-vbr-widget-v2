<script setup>
import { Image } from '@mjsz-vbr-elements/core/components';
import { DEFAULT_PORTRAIT_IMAGE_URL } from '@mjsz-vbr-elements/core/constants';
import { IconRight } from '@mjsz-vbr-elements/shared/icons';
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
    <div role="list">
      <div v-for="(player, index) in list" :key="player.player.playerId" role="listitem" :class="{ 'is-large': index === 0 }">
        <div class="is-images avatar">
          <Image class="is-player truncate" :src="player.player.picture" :default-src="DEFAULT_PORTRAIT_IMAGE_URL" />
        </div>
        <a :href="playerResolver(player)" class="is-player truncate">{{ player.name }}</a>
        <a :href="teamResolver(player)" class="is-team truncate">{{ player.team.longName }}</a>
        <span v-text="player[dataKey]" />
      </div>
    </div>
  </div>
</template>
