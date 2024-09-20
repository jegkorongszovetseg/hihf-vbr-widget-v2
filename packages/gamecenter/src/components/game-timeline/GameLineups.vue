<script setup>
import { computed } from 'vue';
import { useMainClass, useI18n } from '@mjsz-vbr-elements/core/composables';
import { Image } from '@mjsz-vbr-elements/core/components';
import { playerName } from '@mjsz-vbr-elements/core/utils';
import IconHockeyPuck from '@mjsz-vbr-elements/shared/icons/IconHockeyPuck';
import { groupLines, pickCoaches, pickReferees } from './internal';

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

const homePlayers = computed(() => groupLines(props.data?.[props.homeTeamId] ?? []));
const awayPlayers = computed(() => groupLines(props.data?.[props.awayTeamId] ?? []));

const homeCoaches = computed(() => pickCoaches(props.gameOfficials?.gameTeamMembers?.home ?? []));
const awayCoaches = computed(() => pickCoaches(props.gameOfficials?.gameTeamMembers?.away ?? []));

const referees = computed(() => pickReferees(props.gameOfficials?.gameOfficials));
</script>
<template>
  <div :class="useMainClass('gamecenter-timeline-lineups')">
    <div class="is-container">
      <div>
        <template v-for="(row, index) in homePlayers">
          <h2 class="is-heading-2">{{ t(`rows.row-${index}`) }}</h2>
          <div :class="useMainClass('gamecenter-timeline-lineups-lines')">
            <ul v-for="player in row" :key="player.position" :class="['is-player-wrapper', `is-${player.position}`]">
              <li><Image :src="player.player.picture" /></li>
              <li>{{ player.number }}</li>
              <li>{{ playerName(player)?.name ?? '' }} <IconHockeyPuck v-for="i in player.goal" /></li>
              <li>{{ player.position }}</li>
            </ul>
          </div>
        </template>
      </div>

      <div>
        <template v-for="(row, index) in awayPlayers">
          <h2 class="is-heading-2">{{ t(`rows.row-${index}`) }}</h2>
          <div :class="[useMainClass('gamecenter-timeline-lineups-lines'), 'is-away-team']">
            <ul v-for="player in row" :key="player.position" :class="['is-player-wrapper', `is-${player.position}`]">
              <li><Image :src="player.player.picture" /></li>
              <li>{{ player.number }}</li>
              <li>{{ playerName(player)?.name ?? '' }} <IconHockeyPuck v-for="i in player.goal" /></li>
              <li>{{ player.position }}</li>
            </ul>
          </div>
        </template>
      </div>
    </div>

    <hr />

    <h2 class="is-heading-2">Edzők</h2>
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

    <hr />

    <h2 class="is-heading-2">Referees</h2>
    <div :class="useMainClass('gamecenter-timeline-lineups-lines-referees')">
      <ul v-for="person in referees" :key="person.role" class="is-official-person-container">
        <li>{{ person.lastName }} {{ person.firstName }}</li>
        <li>{{ t(`role.${person.role}`) }}</li>
      </ul>
    </div>
  </div>
</template>
