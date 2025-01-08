<script setup>
import { useMainClass } from '@mjsz-vbr-elements/core/composables';
import { Image } from '@mjsz-vbr-elements/core/components';
import { externalGameLinkResolver } from '@mjsz-vbr-elements/core/utils';

const props = defineProps({
  gameData: {
    type: Object,
    required: true,
  },

  externalGameResolver: {
    type: [String, Function],
    default: '',
  },
});

const emit = defineEmits(['navigate-to']);

function navigateTo() {
  const { externalUrl, id } = props.gameData;
  console.log({ externalUrl, id });
  if (externalUrl) return emit('navigate-to', { url: externalUrl, target: '_blank' });
  const url = externalGameLinkResolver(props.externalGameResolver, { gameId: id });
  emit('navigate-to', { url, target: '_self' });
}

function log(id) {
  // console.log(id);
}
</script>

<template>
  <div :class="useMainClass('games-timeline-game')" @click="navigateTo">
    <time
      >{{ gameData.gameDateTime }} {{ log(gameData.id) }}
      <span v-if="gameData.isShootout" class="is-badge">SO</span>
      <span v-if="gameData.isOvertime" class="is-badge">OT</span>
    </time>
    <div class="is-home-team-logo">
      <Image :src="gameData.homeTeam.logo" class="is-team-logo" />
    </div>
    <div class="is-home-team-name">{{ gameData.homeTeam.longName }}</div>
    <div class="is-home-team-score">
      <span
        v-if="gameData.homeTeamScore != null"
        :class="['is-badge is-extra-large', gameData.gameStatus === 1 ? 'is-green' : 'is-dark']"
        >{{ gameData.homeTeamScore }}</span
      >
    </div>
    <div class="is-away-team-logo">
      <Image :src="gameData.awayTeam.logo" class="is-team-logo" />
    </div>
    <div class="is-away-team-name">{{ gameData.awayTeam.longName }}</div>
    <div class="is-away-team-score">
      <span
        v-if="gameData.awayTeamScore != null"
        :class="['is-badge is-extra-large', gameData.gameStatus === 1 ? 'is-green' : 'is-dark']"
        >{{ gameData.awayTeamScore }}</span
      >
    </div>
    <div class="is-status">
      {{ gameData.gameStatus !== 1 ? `${gameData.championshipName} - ${gameData.divisionName}` : gameData.period }}
    </div>
  </div>
</template>
