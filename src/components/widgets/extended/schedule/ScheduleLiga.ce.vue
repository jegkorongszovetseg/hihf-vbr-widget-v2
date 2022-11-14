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
});
const timezone = ref(dayjs.tz.guess());
</script>

<template>
  <div>
    <I18NProvider :locale="props.locale">
      <ErrorProvider v-slot:default="{ message, hasError }">
        Provider: {{ message }} hasError: {{ hasError }}
        <ErrorNotice v-if="hasError" :error="error" />

        <DataProvider
          :locale="locale"
          :timezone="timezone"
          :championship-name="championshipName"
          v-slot="{
            seasons,
            championshipId,
            sections,
            teams,
            games,
            months,
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
          <!-- <div>
            <select :value="championshipId" @change="changeSeason">
              <option v-for="season in seasons" :key="season.championshipId" :value="season.championshipId">
                {{ season.seasonName }}
              </option>
            </select>

            <select :value="selectedMonth" @change="changeMonth">
              <option value="">Mind</option>
              <option v-for="month in months" :key="month.value" :value="month.value">{{ month.name }}</option>
            </select>

            <select @change="changeTeam">
              <option value="">Mind</option>
              <option v-for="team in teams" :key="team.teamId" :value="team.teamId">{{ team.teamName }}</option>
            </select>
            <select @change="changeTeamType">
              <option value="all">Mind</option>
              <option value="home">Home</option>
              <option value="away">Away</option>
            </select>
          </div> -->
          <!-- <pre>{{ sections }}</pre> -->
          <div style="display: flex">
            <button v-for="section in sections" :key="section" @click="changeSection(section)">
              {{ section }}
            </button>
          </div>

          <div v-for="(gameDay, key) in games.rows" :key="key">
            {{ format(key, 'L dddd', timezone, locale) }}
            <div v-for="game in gameDay" :key="game.id">
              <div>{{ game.homeTeamName }}-{{ game.awayTeamName }}</div>
              <div>{{ game.name }}-{{ game.gameDate }}</div>
            </div>
          </div>
        </DataProvider>
      </ErrorProvider>
    </I18NProvider>
  </div>
</template>
