<script setup>
import IconBroadcast from '@/components/icons/IconBroadcast.vue';
import IconYoutube from '@/components/icons/IconYoutube.vue';
import Image from '@/components/Image.vue';

defineProps({
  game: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <div class="mjsz-vbr-card-item">
    <div class="is-info is-text-sm">
      {{ game.name }} - {{ game.divisionName }} - {{ game.location }}
      <template v-if="game.broadcast">-&nbsp;<IconBroadcast height="16" />&nbsp;</template>
      <template v-if="game.video">-&nbsp;<a href="#"><IconYoutube height="18" /></a></template>
    </div>

    <div class="is-text-right is-text-bold">
      {{ game.homeTeamName }}
      <Image class="is-logo-image" :src="game.homeTeamLogo" />
    </div>

    <div class="is-text-center">
      <div>
        <span v-if="game.isOvertime">OT</span>
        <span v-if="game.isShootout">SU</span>
        <span v-if="game.seriesStandings">{{ game.seriesStandings }}</span>
      </div>
      <a href="#">
        <span v-if="game.gameStatus > 0" class="is-text-xl is-text-bold">
          {{ game.homeTeamScore }} - {{ game.awayTeamScore }}
        </span>
        <span v-else>
          {{ game.gameDateTime }}
        </span>
      </a>
      <div v-if="game.gameStatus > 0" class="is-text-sm">{{ game.periodResults }}</div>
    </div>

    <div class="is-text-bold">
      <Image class="is-logo-image" :src="game.awayTeamLogo" />
      {{ game.awayTeamName }}
    </div>
  </div>
</template>

<style>
.card-item {
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 2fr 1fr 2fr;
  padding: 2rem 0;
  border-bottom: 1px solid var(--vbr-widget-primary-color-100);

  svg {
    display: block;
  }

  .is-info {
    grid-column: 1/4;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--vbr-widget-primary-color-500);
  }

  .is-logo-image {
    width: 40px;
  }
}
</style>
