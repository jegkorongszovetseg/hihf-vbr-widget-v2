<script setup>
import { format, offsetName } from '@mjsz-vbr-elements/core/utils';

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
  <div>
    <div>
      {{ gameData.championshipName }} - {{ gameData.divisionName }} - {{ gameData.gameName }} /
      {{ gameData.location }}
    </div>
    <div>
      {{ format(gameData.gameDate, 'L dddd - HH:mm z', null, locale) }} ({{
        offsetName(new Date(), null, locale)
      }})
    </div>
    <div>local: {{ gameData.gameDate }}</div>
    <div>
      <div>
        {{ gameData.homeTeamName }}
      </div>
      <div>
        {{ gameData.gameStatus }}
        {{ gameData.homeTeamScore }}:{{ gameData.awayTeamScore }}
        {{ gameData.periodResults }}
      </div>
      <div>
        {{ gameData.awayTeamName }}
      </div>
    </div>
  </div>
</template>
