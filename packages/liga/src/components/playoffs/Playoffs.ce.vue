<script setup>
import { computed } from 'vue';
import { I18NProvider, Image, ResponsiveTable } from '@mjsz-vbr-elements/core/components';
import { useServices } from '@mjsz-vbr-elements/core/composables';
import { externalGameLinkResolver, format, getLocalTimezone } from '@mjsz-vbr-elements/core/utils';
import hu from '../../locales/hu.json';
import en from '../../locales/en.json';

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
});

const { state: playoffs, execute } = useServices({
  options: {
    path: '/v1/playoffsTree',
    apiKey: props.apiKey,
    params: computed(() => ({ championshipId: props.championshipId })),
  },
});

execute();

const timezone = getLocalTimezone();

const messages = { en, hu };

const externalGameResolver = (gameId) => externalGameLinkResolver(props.externalGameLink, { gameId });

const formatGameDate = (date) => format(date, 'L dddd', timezone, props.locale);
const formatGameTime = (date) => format(date, 'HH:mm', timezone, props.locale);
</script>

<template>
  <div class="mjsz-vbr-playoffs">
    <I18NProvider :locale="props.locale" :messages="messages" v-slot:default="{ t }">
      <div v-for="playoff in playoffs">
        <div class="mjsz-vbr-section-title">{{ t(`playoffs.${playoff.tertiaryName}`) }}</div>
        <div class="mjsz-vbr-section-details">
          <div class="is-team-name is-right">{{ playoff.homeTeamName }}</div>
          <div>
            <Image class="is-logo-image" :src="playoff.homeTeamLogo" />
          </div>
          <div class="is-result">{{ playoff.seriesStandings }}</div>
          <div>
            <Image class="is-logo-image" :src="playoff.awayTeamLogo" />
          </div>
          <div class="is-team-name">{{ playoff.awayTeamName }}</div>
        </div>

        <ResponsiveTable>
          <div v-for="game in playoff.games" :key="game.id" class="mjsz-vbr-table-grid">
            <div>{{ game.name }}</div>
            <div>{{ formatGameDate(game.gameDate) }}</div>
            <div>{{ formatGameTime(game.gameDate) }}</div>
            <div class="is-text-right is-text-bold">{{ game.homeTeamName }}</div>
            <div class="is-text-center">
              <span v-if="game.gameStatus === 0" class="is-text-dark">-:-</span>
              <a
                v-else
                :href="externalGameResolver(game.id)"
                target="_blank"
                :class="{ 'is-text-dark': game.gameStatus !== 1, 'is-text-accent': game.gameStatus === 1 }"
              >
                {{ game.homeTeamScore }}:{{ game.awayTeamScore }}
              </a>
            </div>
            <div>
              <span v-if="game.isOvertime" class="label">{{ t('common.overtimeShort') }}</span>
              <span v-if="game.isShootout" class="label">{{ t('common.shootoutShort') }}</span>
              <span v-if="game.seriesStandings" class="label">{{ game.seriesStandings }}</span>
            </div>
            <div class="is-text-bold">{{ game.awayTeamName }}</div>
            <div class="is-text-light is-truncate is-text-right">{{ game.location }}</div>
          </div>
        </ResponsiveTable>
      </div>
    </I18NProvider>
  </div>
</template>

<style src="@mjsz-vbr-elements/shared/css/common.css"></style>
<style src="@mjsz-vbr-elements/shared/css/responsive-table.css"></style>
<style src="@mjsz-vbr-elements/shared/css/table.css"></style>
<style src="@mjsz-vbr-elements/shared/css/playoffs.css"></style>
