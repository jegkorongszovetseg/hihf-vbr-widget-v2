<script setup>
import { computed } from 'vue';
import { I18NProvider, Image, ResponsiveTable } from '@vbr-widget/components';
import { useServices } from '@vbr-widget/composables';
import { externalGameLinkResolver, format, getLocalTimezone } from '@vbr-widget/utils';

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

const externalGameResolver = (gameId) => externalGameLinkResolver(props.externalGameLink, gameId);

const formatGameDate = (date) => format(date, 'L dddd', timezone, props.locale);
const formatGameTime = (date) => format(date, 'HH:mm', timezone, props.locale);
</script>

<template>
  <div class="mjsz-vbr-playoffs">
    <I18NProvider :locale="props.locale" v-slot:default="{ t }">
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
          <table class="mjsz-vbr-table">
            <tbody>
              <tr v-for="game in playoff.games" :key="game.id">
                <td style="width: 5%">{{ game.name }}</td>
                <td style="width: 15%" class="is-text-left">{{ formatGameDate(game.gameDate) }}</td>
                <td style="width: 3%">{{ formatGameTime(game.gameDate) }}</td>
                <td class="is-text-right is-text-bold is-w-auto">{{ game.homeTeamName }}</td>
                <td style="width: 1%">
                  <span v-if="game.gameStatus === 0" class="is-text-dark">-:-</span>
                  <a
                    v-else
                    :href="externalGameResolver(game.id)"
                    target="_blank"
                    :class="{ 'is-text-dark': game.gameStatus !== 1, 'is-text-accent': game.gameStatus === 1 }"
                  >
                    {{ game.homeTeamScore }}:{{ game.awayTeamScore }}
                  </a>
                </td>
                <td style="width: 2%">
                  <span v-if="game.isOvertime" class="label">{{ t('common.overtimeShort') }}</span>
                  <span v-if="game.isShootout" class="label">{{ t('common.shootoutShort') }}</span>
                  <span v-if="game.seriesStandings" class="label">{{ game.seriesStandings }}</span>
                </td>
                <td class="is-text-left is-text-bold is-w-auto">{{ game.awayTeamName }}</td>
                <td class="is-text-left is-text-light is-w-auto">{{ game.location }}</td>
              </tr>
            </tbody>
          </table>
        </ResponsiveTable>
      </div>
    </I18NProvider>
  </div>
</template>

<style lang="postcss" src="@vbr-widget/assets/common.css"></style>
<style lang="postcss" src="@vbr-widget/assets/table.css"></style>
<style lang="postcss" src="@vbr-widget/assets/playoffs.css" scoped></style>
