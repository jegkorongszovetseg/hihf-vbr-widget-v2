<script setup>
import { Image } from '@mjsz-vbr-elements/core/components';
import { useI18n, useMainClass } from '@mjsz-vbr-elements/core/composables';
import { format, offsetName } from '@mjsz-vbr-elements/core/utils';
import IconBroadcast from '@mjsz-vbr-elements/shared/icons/IconBroadcast';
import IconYoutube from '@mjsz-vbr-elements/shared/icons/IconYoutube';
import { noop } from '@vueuse/core';

defineProps({
  game: {
    type: Object,
    required: true,
  },

  locale: {
    type: String,
    default: 'hu',
  },

  timezone: {
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
  <div :class="[useMainClass('card-item'), { 'is-optional': game.optional }]">
    <div class="is-info is-text-sm">
      {{ game.gameName }} - {{ game.championshipName }} - {{ game.divisionName }} - {{ game.location.locationName }}
      <template v-if="game.broadcast">
        -&nbsp;<IconBroadcast height="16" />&nbsp;
      </template>
      <template v-if="game.video">
        -&nbsp;<a :href="game.video" target="_blank"><IconYoutube height="18" /></a>
      </template>
    </div>

    <div class="is-info is-text-sm">
      {{ format(game.gameDate, 'L LT', null, locale) }} ({{ offsetName(game.gameDate, timezone, locale) }})
    </div>

    <div class="is-home-team is-text-base">
      <span class="is-team-name-short">{{ game.homeTeam.shortName }}</span>
      <span class="is-team-name-long">{{ game.homeTeam.longName }}</span>
      <Image :key="game.homeTeam.id" class="is-logo-image" :src="game.homeTeam.logo" />
    </div>

    <div class="is-game-data" :class="[{ 'is-live': game.gameStatus === 1 }]">
      <!-- <div class="g-row">
        <span v-if="game.isOvertime" class="is-badge is-invert">{{ t('common.overtimeShort') }}</span>
        <span v-if="game.isShootout" class="is-badge is-invert">{{ t('common.shootoutShort') }}</span>
        <span v-if="game.seriesStandings" class="is-badge">{{ game.seriesStandings }}</span>
      </div> -->
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
      </a>
      <template v-if="game.gameStatus > 0">
        <div class="is-text-sm is-info is-whitespace-nowrap">
          {{ game.periodResults }}
        </div>
      </template>
    </div>

    <div class="is-away-team is-text-base">
      <span v-if="Array.isArray(game.awayTeam)">Torna</span>
      <Image :key="game.awayTeam.id" class="is-logo-image" :src="game.awayTeam.logo" />
      <span class="is-team-name-short">{{ game.awayTeam.shortName }}</span>
      <span class="is-team-name-long">{{ game.awayTeam.longName }}</span>
    </div>
  </div>
</template>
