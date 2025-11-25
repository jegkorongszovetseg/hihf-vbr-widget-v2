<script setup>
import { Image } from '@mjsz-vbr-elements/core/components';
import { useI18n } from '@mjsz-vbr-elements/core/composables';
import { IconBroadcast, IconYoutube } from '@mjsz-vbr-elements/shared/icons';
import { noop } from '@vueuse/core';

defineProps({
  game: {
    type: Object,
    required: true,
  },

  offsetName: {
    type: String,
    default: '',
  },

  gameLink: {
    type: Function,
    default: noop,
  },

  target: {
    type: String,
    default: '_self',
  },
});
const { t } = useI18n();

const gridTemaplateAreas = `--_grid-template-areas: 'name name name name name' 'home-team home-team-logo game-data away-team-logo away-team';`;
</script>

<template>
  <div class="card-item" :style="gridTemaplateAreas" :class="{ 'is-optional': game.optional }">
    <div class="text-muted text-sm text-center" style="grid-area: name;">
      {{ game.gameName }} - {{ game.divisionName }} - {{ game.location.locationName }}
      <template v-if="game.broadcast">
        -&nbsp;<IconBroadcast height="16" />&nbsp;
      </template>
      <template v-if="game.video">
        -&nbsp;<a :href="game.video" target="_blank"><IconYoutube height="18" /></a>
      </template>
    </div>

    <div class="responsive-team-name" style="grid-area: home-team;">
      <div v-if="game.homeTeam" class="text-end text-highlighted font-bold">
        <span class="team-name-short">{{ game.homeTeam.shortName }}</span>
        <span class="team-name-long">{{ game.homeTeam.longName }}</span>
      </div>
    </div>
    <div style="grid-area: home-team-logo;">
      <Image :key="game.homeTeam.id" :src="game.homeTeam.logo" />
    </div>

    <div class="grid text-center" style="grid-area: game-data;">
      <div class="">
        <span v-if="game.isOvertime" class="badge">{{ t('common.overtimeShort') }}</span>
        <span v-if="game.isShootout" class="badge">{{ t('common.shootoutShort') }}</span>
        <span v-if="game.seriesStandings" class="badge inverted">{{ game.seriesStandings }}</span>
      </div>
      <a :href="gameLink(game)" :target="target" class="game-result" :class="[{ 'is-live': game.gameStatus === 1 }]">
        <span v-if="game.gameStatus > 0 && game.gameStatus < 3" class="text-xl font-bold">
          {{ game.homeTeamScore }} : {{ game.awayTeamScore }}
        </span>
        <span v-if="game.gameStatus === 3" class="text-xl font-bold">
          {{ t('game.status.jury') }}
        </span>
        <span v-if="game.gameStatus === 4" class="text-xl font-bold">
          {{ t('game.status.delayed') }}
        </span>
        <span v-if="game.gameStatus === 0">
          {{ game.gameDateTime }}
        </span>
      </a>
      <span v-if="game.gameStatus === 0" class="text-sm text-faded">({{ offsetName }})</span>
      <template v-if="game.gameStatus > 0">
        <div class="text-sm text-muted is-whitespace-nowrap">
          {{ game.periodResults }}
        </div>
        <div v-if="game.gameStatus !== 2" class="text-xs uppercase text-muted is-whitespace-nowrap">
          {{ t(`game.period.${game.period}`) }}
        </div>
      </template>
    </div>

    <div style="grid-area: away-team-logo;">
      <Image :key="game.awayTeam.id" class="is-logo-image" :src="game.awayTeam.logo" />
    </div>

    <div class="responsive-team-name" style="grid-area: away-team;">
      <div v-if="game.awayTeam" class="text-highlighted font-bold">
        <span class="team-name-short">{{ game.awayTeam.shortName }}</span>
        <span class="team-name-long">{{ game.awayTeam.longName }}</span>
      </div>
    </div>
  </div>
</template>
