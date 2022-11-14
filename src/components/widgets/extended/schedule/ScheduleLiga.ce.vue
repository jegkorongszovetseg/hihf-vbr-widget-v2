<script setup>
import ErrorNotice from '@/components/ErrorNotice.vue';
import ErrorProvider from '@/components/ErrorProvider.vue';
import I18NProvider from '@/components/I18NProvider.vue';
import DataProvider from './DataProvider.vue';

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
</script>

<template>
  <div>
    <I18NProvider :locale="props.locale">
      <ErrorProvider v-slot:default="{ message, hasError }">
        Provider: {{ message }} hasError: {{ hasError }}
        <ErrorNotice v-if="hasError" :error="error" />

        <DataProvider
          :locale="locale"
          :championship-name="championshipName"
          v-slot="{ seasons, championshipId, sections, teams, games, months, selectedMonth, changeSeason }"
        >
          <div>
            <select :value="championshipId" @change="changeSeason">
              <option v-for="season in seasons" :key="season.championshipId" :value="season.championshipId">{{ season.seasonName }}</option>
            </select>

            <select :value="selectedMonth">
              <option v-for="month in months" :key="month.value" :value="month.value">{{ month.name }}</option>
            </select>

            <select>
              <option value="">Mind</option>
              <option v-for="team in teams" :key="team.teamId" :value="team.teamId">{{ team.teamName }}</option>
            </select>
          </div>
          <div></div>
          <!-- <pre>{{ months }}</pre> -->
          <!-- <pre>{{ seasons }}</pre> -->
          <pre>{{ sections }}</pre>

          <div v-for="(gameDay, key) in games.rows" :key="key">
            {{ key }}
            <div v-for="game in gameDay" :key="game.id">{{ game.name }}-{{ game.gameDate }}</div>
          </div>
        </DataProvider>
      </ErrorProvider>
    </I18NProvider>
  </div>
</template>
