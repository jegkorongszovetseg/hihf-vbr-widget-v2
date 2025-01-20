<script setup>
import { Image } from '@mjsz-vbr-elements/core/components';
import { useI18n } from '@mjsz-vbr-elements/core/composables';
import IconBroadcast from '@mjsz-vbr-elements/shared/icons/IconBroadcast';
import IconYoutube from '@mjsz-vbr-elements/shared/icons/IconYoutube';
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
</script>

<template>
  <div class="card-item" :class="{ 'is-optional': game.optional }">
    <div class="is-info is-text-base">
      {{ game.gameName }} - {{ game.divisionName }} - {{ game.location.locationName }}
      <template v-if="game.broadcast">
        -&nbsp;<IconBroadcast height="16" />&nbsp;
      </template>
      <template v-if="game.video">
        -&nbsp;<a :href="game.video" target="_blank"><IconYoutube height="18" /></a>
      </template>
    </div>

    <div class="is-home-team is-text-base">
      <span class="is-team-name-short">{{ game.homeTeam.shortName }}</span>
      <span class="is-team-name-long">{{ game.homeTeam.longName }}</span>
      <Image :key="game.homeTeam.id" class="is-logo-image" :src="game.homeTeam.logo" />
    </div>

    <div class="is-game-data" :class="[{ 'is-live': game.gameStatus === 1 }]">
      <div class="g-row">
        <span v-if="game.isOvertime" class="is-badge is-invert">{{ t('common.overtimeShort') }}</span>
        <span v-if="game.isShootout" class="is-badge is-invert">{{ t('common.shootoutShort') }}</span>
        <span v-if="game.seriesStandings" class="is-badge">{{ game.seriesStandings }}</span>
      </div>
      <a :href="gameLink(game)" :target="target">
        <span v-if="game.gameStatus > 0 && game.gameStatus < 3" class="is-text-xl is-text-bold">
          {{ game.homeTeamScore }} - {{ game.awayTeamScore }}
        </span>
        <span v-if="game.gameStatus === 3" class="is-text-xl is-text-bold">
          {{ t('game.status.jury') }}
        </span>
        <span v-if="game.gameStatus === 4" class="is-text-xl is-text-bold">
          {{ t('game.status.delayed') }}
        </span>
        <span v-if="game.gameStatus === 0">
          {{ game.gameDateTime }}
        </span>
      </a>
      <span v-if="game.gameStatus === 0" class="is-text-xs is-opacity-40">({{ offsetName }})</span>
      <template v-if="game.gameStatus > 0">
        <div class="is-text-sm is-whitespace-nowrap">
          {{ game.periodResults }}
        </div>
        <div v-if="game.gameStatus !== 2" class="is-text-xs is-uppercase is-whitespace-nowrap">
          {{ t(`game.period.${game.period}`) }}
        </div>
      </template>
    </div>

    <div class="is-away-team is-text-base">
      <Image :key="game.awayTeam.id" class="is-logo-image" :src="game.awayTeam.logo" />
      <span class="is-team-name-short">{{ game.awayTeam.shortName }}</span>
      <span class="is-team-name-long">{{ game.awayTeam.longName }}</span>
    </div>
  </div>
</template>
