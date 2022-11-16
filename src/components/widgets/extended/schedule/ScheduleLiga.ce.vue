<script setup>
import { ref } from 'vue';
import dayjs from 'dayjs';
import { format } from '@/utils/datetime';
import ErrorNotice from '@/components/ErrorNotice.vue';
import ErrorProvider from '@/components/ErrorProvider.vue';
import I18NProvider from '@/components/I18NProvider.vue';
import DataProvider from './DataProvider.vue';
import ScheduleSelector from './ScheduleSelector.vue';

const props = defineProps({
  locale: {
    type: String,
    default: 'hu',
  },

  apiKey: {
    type: String,
    default: '',
  },

  championshipName: {
    type: String,
    default: '',
  },

  championshipId: {
    type: Number,
    default: 0,
  },

  autoRefresh: {
    type: Boolean,
    default: false,
  },
});
const timezone = ref(dayjs.tz.guess());
</script>

<template>
  <div>
    <I18NProvider :locale="props.locale">
      <ErrorProvider v-slot:default="{ error, hasError }">
        <ErrorNotice v-if="hasError" :error="error" />

        <DataProvider
          :locale="locale"
          :timezone="timezone"
          :championship-name="championshipName"
          :auto-refresh="props.autoRefresh"
          v-slot="{
            seasons,
            championshipId,
            sections,
            teams,
            games,
            months,
            isLoading,
            selectedMonth,
            selectedTeam,
            selectedTeamGameType,
            changeSeason,
            changeMonth,
            changeSection,
            changeTeam,
            changeTeamType,
          }"
        >
          <ScheduleSelector
            :seasons="seasons"
            :championship-id="championshipId"
            :months="months"
            :selected-month="selectedMonth"
            :teams="teams"
            :selected-team="selectedTeam"
            :selected-team-game-type="selectedTeamGameType"
            @update:championship-id="changeSeason"
            @update:selected-month="changeMonth"
            @update:selected-team="changeTeam"
            @update:selected-team-game-type="changeTeamType"
          />
          <div class="g-row">
            <button v-for="section in sections" :key="section" @click="changeSection(section)">
              {{ section }}
            </button>
          </div>

          <div v-if="isLoading">Loading...</div>

          <template v-else>
            <div v-for="(gameDay, key) in games.rows" :key="key">
              {{ format(key, 'L dddd', timezone, locale) }}
              <div class="is-card">
                <div v-for="game in gameDay" :key="game.id" class="g-row">
                  <div class="g-col is-text-right is-text-bold">{{ game.homeTeamName }}</div>

                  <div class="g-col-3 is-text-center">
                    <template v-if="game.gameStatus > 0">
                      <div class="is-text-xl is-text-bold">{{ game.homeTeamScore }} - {{ game.awayTeamScore }}</div>
                      <div class="is-text-sm">{{ game.periodResults }}</div>
                    </template>
                    <span v-else>
                      {{ game.gameDateTime }}
                    </span>
                  </div>
                  <div class="g-col is-text-bold">{{ game.awayTeamName }}</div>
                  <div class="g-col-3">{{ game.name }}</div>
                </div>
              </div>
            </div>
          </template>
        </DataProvider>
      </ErrorProvider>
    </I18NProvider>
  </div>
</template>

<style src="@/assets/grid.css"></style>
