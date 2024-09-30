<script setup>
import { computed } from 'vue';
import { useMainClass, useI18n } from '@mjsz-vbr-elements/core/composables';
import { Image } from '@mjsz-vbr-elements/core/components';
import { playerName } from '@mjsz-vbr-elements/core/utils';
import IconHockeyPuck from '@mjsz-vbr-elements/shared/icons/IconHockeyPuck';
import { pickCoaches, groupLinesByTeams } from './internal';

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
  <div :class="useMainClass('gamecenter-timeline-lineups')">
    <template v-for="(type, index) in teamsPlayers">
      <h2 class="is-heading-2">{{ t(`rows.row-${index}`) }}</h2>
      <div class="is-container">
        <div
          v-for="(row, key) in type"
          :class="[useMainClass('gamecenter-timeline-lineups-lines'), { 'is-away-team': key === 'away' }]"
        >
          <ul v-for="player in row" :key="player.position" :class="['is-player-wrapper', `is-${player.position}`]">
            <li><Image :src="player.player.picture" /></li>
            <li>{{ player.number }}</li>
            <li>
              {{ playerName(player)?.name ?? '' }}
              <ul>
                <li v-for="i in player.goal"><IconHockeyPuck /></li>
              </ul>
            </li>
            <li>{{ player.position }}</li>
          </ul>
        </div>
      </div>
    </template>

    <hr />

    <h2 class="is-heading-2">{{ t('title.coaches') }}</h2>
    <div class="is-container">
      <div :class="useMainClass('gamecenter-timeline-lineups-lines-simple')">
        <ul v-for="person in homeCoaches" :key="person.role" class="is-official-person-container is-home-team">
          <li>{{ person.name }}</li>
          <li>{{ t(`teamMembers.${person.role}`) }}</li>
        </ul>
      </div>
      <div :class="useMainClass('gamecenter-timeline-lineups-lines-simple')">
        <ul v-for="person in awayCoaches" :key="person.role" class="is-official-person-container is-away-team">
          <li>{{ person.name }}</li>
          <li>{{ t(`teamMembers.${person.role}`) }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
