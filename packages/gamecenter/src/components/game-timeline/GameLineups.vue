<script setup>
import { Image } from '@mjsz-vbr-elements/core/components';
import { useI18n } from '@mjsz-vbr-elements/core/composables';
import { pickCoaches, playerName } from '@mjsz-vbr-elements/core/utils';
import IconHockeyPuck from '@mjsz-vbr-elements/shared/icons/IconHockeyPuck';
import { computed } from 'vue';
import { groupLinesByTeams } from './internal';

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },

  gameOfficials: {
    type: Object,
    default: () => ({}),
  },

  homeTeamId: {
    type: Number,
  },

  homeTeamName: {
    type: String,
    default: '',
  },

  awayTeamId: {
    type: Number,
  },

  awayTeamName: {
    type: String,
    default: '',
  },
});

const { t } = useI18n();

const teamsPlayers = computed(() => groupLinesByTeams(props.data, props.homeTeamId, props.awayTeamId));

const homeCoaches = computed(() => pickCoaches(props.gameOfficials?.gameTeamMembers?.home ?? []));
const awayCoaches = computed(() => pickCoaches(props.gameOfficials?.gameTeamMembers?.away ?? []));

// const referees = computed(() => pickReferees(props.gameOfficials?.gameOfficials));
</script>

<template>
  <div class="gamecenter-timeline-lineups">
    <template v-for="(type, index) in teamsPlayers" :key="index">
      <h2 class="is-heading-2">
        {{ t(`rows.row-${index}`) }}
      </h2>
      <div class="is-container">
        <div
          v-for="(row, key) in type"
          :key="key"
          class="gamecenter-timeline-lineups-lines" :class="[{ 'is-away-team': key === 'away' }]"
        >
          <ul v-for="player in row" :key="player.position" class="is-player-wrapper" :class="[`is-${player.position}`]">
            <li><Image :src="player.player.picture" /></li>
            <li>{{ player.number }}</li>
            <li>
              {{ playerName(player)?.name ?? '' }}
              <ul>
                <li v-for="i in player.goal" :key="i">
                  <IconHockeyPuck />
                </li>
              </ul>
            </li>
            <li>{{ player.position }}</li>
          </ul>
        </div>
      </div>
    </template>

    <hr>

    <h2 class="is-heading-2">
      {{ t('title.coaches') }}
    </h2>
    <div class="is-container">
      <div class="gamecenter-timeline-lineups-lines-simple">
        <ul v-for="(person, key) in homeCoaches" :key="person.role" class="is-official-person-container is-home-team">
          <li><Image :src="person.picture" /></li>
          <li>{{ person.name }}</li>
          <li>{{ t(`teamMembers.${key}`) }}</li>
        </ul>
      </div>
      <div class="gamecenter-timeline-lineups-lines-simple">
        <ul v-for="(person, key) in awayCoaches" :key="person.role" class="is-official-person-container is-away-team">
          <li><Image :src="person.picture" /></li>
          <li>{{ person.name }}</li>
          <li>{{ t(`teamMembers.${key}`) }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
