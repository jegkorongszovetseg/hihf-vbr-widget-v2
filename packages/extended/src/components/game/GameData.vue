<script setup>
import { useMainClass } from '@mjsz-vbr-elements/core/composables';
import { format, offsetName } from '@mjsz-vbr-elements/core/utils';
import { Image } from '@mjsz-vbr-elements/core/components';

defineProps({
  gameData: {
    type: Object,
    required: true,
  },

  locale: {
    type: String,
    default: 'hu',
  },
});
</script>

<template>
  <div :class="useMainClass('gamecenter-game-data')">
    <div class="is-title">
      {{ gameData.championshipName }} - {{ gameData.divisionName }} - {{ gameData.gameName }} /
      {{ gameData.location }}
    </div>
    <div class="is-gamedate">
      {{ format(gameData.gameDate, 'L dddd - HH:mm z', null, locale) }} ({{ offsetName(new Date(), null, locale) }})
    </div>
    <div class="is-local-gamedate">local: {{ gameData.gameDate }}</div>
    <div class="is-teams-and-results">
      <div class="is-team-name">
        <Image :src="gameData.homeTeamLogo" />
        {{ gameData.homeTeamName }}
      </div>
      <div>
        <p>{{ gameData.gameStatus }}</p>
        <div :class="['is-game-result', { 'is-game-result-live': gameData.gameStatus === 1 }]">
          {{ gameData.homeTeamScore }}:{{ gameData.awayTeamScore }}
        </div>
        <p>{{ gameData.periodResults }}</p>
      </div>
      <div class="is-team-name">
        <Image :src="gameData.awayTeamLogo" />
        {{ gameData.awayTeamName }}
      </div>
    </div>
  </div>
</template>
