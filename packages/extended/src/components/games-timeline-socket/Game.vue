<script setup>
import { Image } from '@mjsz-vbr-elements/core/components';
import { useGameDataSocket, useI18n } from '@mjsz-vbr-elements/core/composables';
import { externalGameLinkResolver, getWebsocketURL } from '@mjsz-vbr-elements/core/utils';
import IconLaunch from '@mjsz-vbr-elements/shared/icons/IconLaunch';
import { computed, shallowRef, watch } from 'vue';
import { isPeriodTimeVisible } from '../games-timeline/internal';
import ScoreDisplay from '../games-timeline/ScoreDisplay.vue';

const props = defineProps({
  gameData: {
    type: Object,
    required: true,
  },

  externalGameResolver: {
    type: [String, Function],
    default: '',
  },

  gameId: {
    type: Number,
    required: true,
  },

  resolvedApiKey: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['navigateTo']);

const gameDataInt = shallowRef({});

const { t } = useI18n();

watch(() => props.gameData, payload => gameDataInt.value = payload, { immediate: true });

useGameDataSocket(getWebsocketURL(`/v2/game-data?gameid=${props.gameId}&apiKey=${props.resolvedApiKey}`), gameDataInt);

const statusText = computed(() => {
  const { gameStatus, championshipName, divisionName, period, periodTime } = gameDataInt.value;
  if (gameStatus !== 1)
    return `${championshipName} - ${divisionName}`;
  if (period && isPeriodTimeVisible(period))
    return `${t(`game.period.${period}`)} - ${periodTime}`;
  if (period && !isPeriodTimeVisible(period))
    return t(`game.period.${period}`);
  return '';
});

function navigateTo() {
  const { externalGameUrl, id } = props.gameData;
  if (externalGameUrl)
    return emit('navigateTo', { url: externalGameUrl, target: '_blank' });
  const url = externalGameLinkResolver(props.externalGameResolver, { gameId: id });
  emit('navigateTo', { url, target: '_self' });
}
</script>

<template>
  <div class="games-timeline-game" @click="navigateTo">
    <time>{{ gameData.gameDateTime }}
      <span v-if="gameData.isShootout" class="is-badge">{{ t('common.shootoutShort') }}</span>
      <span v-if="gameData.isOvertime" class="is-badge">{{ t('common.overtimeShort') }}</span>
      <IconLaunch v-if="gameData.externalGameUrl" width="14" height="14" />
    </time>
    <div class="is-home-team-logo">
      <Image :src="gameData.homeTeam.logo" class="is-team-logo" />
    </div>
    <div class="is-home-team-name">
      {{ gameData.homeTeam.longName }}
    </div>
    <div class="is-home-team-score">
      <ScoreDisplay
        v-if="gameData.homeTeamScore != null"
        class="is-badge is-extra-large" :class="[gameData.gameStatus === 1 ? 'is-green' : 'is-dark']"
        :score="gameData.homeTeamScore"
      >
        {{ gameData.homeTeamScore }}
      </ScoreDisplay>
    </div>
    <div class="is-away-team-logo">
      <Image :src="gameData.awayTeam.logo" class="is-team-logo" />
    </div>
    <div class="is-away-team-name">
      {{ gameData.awayTeam.longName }}
    </div>
    <div class="is-away-team-score">
      <ScoreDisplay
        v-if="gameData.awayTeamScore != null"
        :score="gameData.awayTeamScore"
        class="is-badge is-extra-large" :class="[gameData.gameStatus === 1 ? 'is-green' : 'is-dark']"
      >
        {{ gameData.awayTeamScore }}
      </ScoreDisplay>
    </div>
    <div class="is-status">
      {{ statusText }}
    </div>
  </div>
</template>
