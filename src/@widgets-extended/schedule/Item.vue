<script setup>
import { Image } from '@vbr-widget/components';
import { useI18n, useMainClass } from '@vbr-widget/composables';
import { IconYoutube, IconBroadcast } from '@vbr-widget/icons';

defineProps({
  game: {
    type: Object,
    required: true,
  },
});
const { t } = useI18n();
const mainClasses = useMainClass('card-item');
</script>

<template>
  <div :class="mainClasses">
    <div class="is-info is-text-sm">
      {{ game.name }} - {{ game.divisionName }} - {{ game.location }}
      <template v-if="game.broadcast">-&nbsp;<IconBroadcast height="16" />&nbsp;</template>
      <template v-if="game.video"
        >-&nbsp;<a href="#"><IconYoutube height="18" /></a
      ></template>
    </div>

    <div class="is-home-team">
      {{ game.homeTeamName }}
      <Image class="is-logo-image" :src="game.homeTeamLogo" />
    </div>

    <div class="is-game-data">
      <div class="g-row">
        <span v-if="game.isOvertime" class="is-badge is-invert">{{ t('common.overtimeShort') }}</span>
        <span v-if="game.isShootout" class="is-badge is-invert">{{ t('common.shootoutShort') }}</span>
        <span v-if="game.seriesStandings" class="is-badge">{{ game.seriesStandings }}</span>
      </div>
      <a href="#">
        <span v-if="game.gameStatus > 0 && game.gameStatus < 3" class="is-text-xl is-text-bold">
          {{ game.homeTeamScore }} - {{ game.awayTeamScore }}
        </span>
        <span v-if="game.gameStatus === 3" class="is-text-xl is-text-bold"> Versenybíróság </span>
        <span v-if="game.gameStatus === 4" class="is-text-xl is-text-bold"> Elhalasztva </span>
        <span v-if="game.gameStatus === 0">
          {{ game.gameDateTime }}
        </span>
      </a>
      <div v-if="game.gameStatus > 0" class="is-text-sm">{{ game.periodResults }}</div>
    </div>

    <div class="is-away-team">
      <Image class="is-logo-image" :src="game.awayTeamLogo" />
      {{ game.awayTeamName }}
    </div>
  </div>
</template>
