<script setup>
import { Image } from '@mjsz-vbr-elements/core/components';
import { useI18n } from '@mjsz-vbr-elements/core/composables';
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
  <div class="card-item" :class="{ 'is-optional': game.optional }">
    <div class="text-muted text-sm text-center" style="grid-area: name">
      <a :href="gameLink(game)">{{ game.gameName }}</a>&nbsp;- {{ game.championshipName }} - {{ game.divisionName }} - {{ game.location.locationName }}
      <template v-if="game.broadcast">
        -&nbsp;<IconBroadcast height="16" />&nbsp;
      </template>
      <template v-if="game.video">
        -&nbsp;<a :href="game.video" target="_blank"><IconYoutube height="18" /></a>
      </template>
    </div>

    <div class="text-muted text-sm text-center" style="grid-area: date">
      {{ format(game.gameDate, 'L LT', null, locale) }} ({{ offsetName(game.gameDate, timezone, locale) }})
    </div>

    <div class="responsive-team-name" style="grid-area: home-team">
      <div class="text-end text-highlighted is-text-bold">
        <span class="team-name-short">{{ game.homeTeam.shortName }}</span>
        <span class="team-name-long">{{ game.homeTeam.longName }}</span>
      </div>
    </div>
    <div style="grid-area: home-team-logo">
      <Image :key="game.homeTeam.id" class="is-logo-image" :src="game.homeTeam.logo" />
    </div>

    <div class="text-center" :class="[{ 'is-live': game.gameStatus === 1 }]" style="grid-area: game-data">
      <!-- <div>
        <span v-if="game.isOvertime" class="badge is-invert">{{ t('common.overtimeShort') }}</span>
        <span v-if="game.isShootout" class="badge is-invert">{{ t('common.shootoutShort') }}</span>
        <span v-if="game.seriesStandings" class="is-badge">{{ game.seriesStandings }}</span>
      </div> -->
      <span v-if="game.gameStatus === 0" class="is-text-xl is-text-bold">
        - : -
      </span>
      <a :href="gameLink(game)" :target="target">

        <span v-if="game.gameStatus > 0 && game.gameStatus < 3" class="is-text-xl is-text-bold">
          {{ game.homeTeamScore }} : {{ game.awayTeamScore }}
        </span>

        <span v-if="game.gameStatus === 3" class="is-text-xl is-text-bold">
          {{ t('game.status.jury') }}
        </span>

        <span v-if="game.gameStatus === 4" class="is-text-xl is-text-bold">
          {{ t('game.status.delayed') }}
        </span>
      </a>
      <template v-if="game.gameStatus > 0">
        <div class="text-sm text-muted is-whitespace-nowrap">
          {{ game.periodResults }}
        </div>
      </template>
    </div>

    <div style="grid-area: away-team-logo">
      <Image :key="game.awayTeam.id" :src="game.awayTeam.logo" />
    </div>
    <div class="responsive-team-name" style="grid-area: away-team">
      <div class="text-highlighted is-text-bold">
        <span v-if="Array.isArray(game.awayTeam)">Torna</span>
        <span class="team-name-short">{{ game.awayTeam.shortName }}</span>
        <span class="team-name-long">{{ game.awayTeam.longName }}</span>
      </div>
    </div>
  </div>
</template>
