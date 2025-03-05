<script setup>
import { gameProps } from '@mjsz-vbr-elements/core';
import { I18NProvider, Image, LoadingIndicator, ResponsiveTable } from '@mjsz-vbr-elements/core/components';
import { useServices } from '@mjsz-vbr-elements/core/composables';
import { externalGameLinkResolver, format, getLocalTimezone } from '@mjsz-vbr-elements/core/utils';
import { computed } from 'vue';
import en from '../../locales/en.json';
import hu from '../../locales/hu.json';

const props = defineProps({
  locale: {
    type: String,
    default: 'hu',
  },

  apiKey: {
    type: String,
    default: '',
  },

  championshipId: {
    type: Number,
    default: 0,
  },

  // externalGameResolver, isGameTargetExternal
  ...gameProps,
});

const DEFAULT_LIGA_GAME_RESOLVER = '/game/id/{gameId}';

const { state: playoffs, isLoading, execute } = useServices({
  options: {
    path: '/v2/playoffs-tree',
    apiKey: props.apiKey,
    params: computed(() => ({ championshipId: props.championshipId })),
  },
});

execute();

const timezone = getLocalTimezone();

const messages = { en, hu };

function externalGameResolver(game) {
  return externalGameLinkResolver(props.externalGameResolver || DEFAULT_LIGA_GAME_RESOLVER, game);
}

const externalGameTarget = computed(() => props.isGameTargetExternal ? '_blank' : '_self');

const formatGameDate = date => format(date, 'L dddd', timezone, props.locale);
const formatGameTime = date => format(date, 'HH:mm', timezone, props.locale);
</script>

<template>
  <div class="playoffs">
    <I18NProvider v-slot="{ t }" :locale="props.locale" :messages="messages">
      <LoadingIndicator v-if="isLoading" />
      <div v-for="playoff in playoffs" :key="`${playoff.divisionStage2Name}-${playoff.divisionStageNumber}`">
        <div class="section-title">
          {{ t(`playoffs.${playoff.divisionStage2Name}`) }}<span v-if="playoff.divisionStageNumber">-{{ playoff.divisionStageNumber }}</span>
        </div>
        <div class="section-details">
          <div class="is-team-name is-right">
            {{ playoff.homeTeam?.longName }}
          </div>
          <div>
            <Image class="is-logo-image" :src="playoff.homeTeam.logo" />
          </div>
          <div class="is-result">
            {{ playoff.seriesStandings }}
          </div>
          <div>
            <Image class="is-logo-image" :src="playoff.awayTeam.logo" />
          </div>
          <div class="is-team-name">
            {{ playoff.awayTeam?.longName }}
          </div>
        </div>

        <ResponsiveTable>
          <div
            v-for="game in playoff.games"
            :key="game.id"
            class="table-grid" :class="{ 'is-optional': game.optional }"
          >
            <div>{{ game.gameName }}</div>
            <div>{{ formatGameDate(game.gameDate) }}</div>
            <div>{{ formatGameTime(game.gameDate) }}</div>
            <div class="is-text-right is-text-bold">
              <span class="is-team-name-long">{{ game.homeTeam?.longName }}</span>
              <span class="is-team-name-short">{{ game.homeTeam?.shortName }}</span>
            </div>
            <div class="is-text-center">
              <span v-if="game.gameStatus === 0" class="is-text-dark">-:-</span>
              <a
                v-else
                :href="externalGameResolver(game)"
                :target="externalGameTarget"
                class="is-text-bold"
                :class="[{ 'is-text-dark': game.gameStatus !== 1, 'is-text-accent': game.gameStatus === 1 }]"
              >
                {{ game.homeTeamScore }}:{{ game.awayTeamScore }}
              </a>
            </div>
            <div>
              <span v-if="game.isOvertime" class="label">{{ t('common.overtimeShort') }}</span>
              <span v-if="game.isShootout" class="label">{{ t('common.shootoutShort') }}</span>
              <span v-if="game.seriesStandings" class="label">{{ game.seriesStandings }}</span>
            </div>
            <div class="is-text-bold">
              <span class="is-team-name-long">{{ game.awayTeam?.longName }}</span>
              <span class="is-team-name-short">{{ game.awayTeam?.shortName }}</span>
            </div>
            <div class="is-text-light is-truncate is-text-right">
              {{ game.location?.locationName ?? '' }}
            </div>
          </div>
        </ResponsiveTable>
      </div>
    </I18NProvider>
  </div>
</template>

<style src="@mjsz-vbr-elements/shared/css/common.scss" lang="scss"></style>

<style src="@mjsz-vbr-elements/shared/css/playoffs.scss" lang="scss"></style>

<style src="@mjsz-vbr-elements/shared/css/responsive-table.scss" lang="scss"></style>

<style src="@mjsz-vbr-elements/shared/css/table.scss" lang="scss"></style>
