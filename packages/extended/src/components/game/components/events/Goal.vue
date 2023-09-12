<script setup>
import { computed } from 'vue';
import { reject, isEmpty } from 'ramda';
import { FloatingPanel } from '@mjsz-vbr-elements/core/components';
import IconHockeyPuck from '@mjsz-vbr-elements/shared/icons/IconHockeyPuck';
import TeamLogo from './TeamLogo.vue';

const props = defineProps({
  event: {
    type: Object,
    required: true,
  },

  isHomeTeam: {
    type: Boolean,
    default: true,
  },
});

const assists = computed(() => reject((player) => isEmpty(player), [props.event.assists1, props.event.assists2]));
const homeOnIce = computed(() => props.event.homeOnIce);
const awayOnIce = computed(() => props.event.awayOnIce);
</script>

<template>
  <div class="is-time-cell">{{ event.eventTime }}</div>
  <div class="is-team-logo-cell">
    <TeamLogo :name="event.team.longName" :logo="event.teamLogo" :key="event.team.id" :is-home-team="isHomeTeam" />
  </div>
  <div class="is-icon-cell"><IconHockeyPuck class="is-goal-icon" /></div>
  <div class="is-score">{{ event.score }}</div>
  <div>
    <span class="is-badge">
      {{ event.advantage }}
    </span>
  </div>
  <div>
    <span v-if="event.gws" class="">GWG</span>
    <span v-if="event.ps" class="">PS</span>
  </div>
  <div>
    <dl>
      <dt>
        <i>{{ event.jerseyNumber }}</i> {{ event.lastName }} {{ event.firstName }}
      </dt>
      <dt class="is-assists-list">
        <template v-for="assist in assists" :key="assist">
          <span><i>{{ assist.shirt_number }}</i> {{ assist.surname }} {{ assist.firstname }}</span>
        </template>
      </dt>
      <dd class="is-poi-data">
        <ul>
          <template v-for="player in homeOnIce" :key="player.id">
            <FloatingPanel
              :offset="2"
              placement="top"
              theme="tooltip"
              :content="player.name"
              v-slot:default="{ setRef, show, hide }"
            >
              <li :ref="setRef" @mouseenter="show" @mouseleave="hide" @focus="show" @blur="hide" :tabindex="0">
                {{ player.jersey_number }}
              </li>
            </FloatingPanel>
          </template>
        </ul>

        <span> / </span>

        <ul>
          <template v-for="player in awayOnIce" :key="player.id">
            <FloatingPanel
              :offset="2"
              placement="top"
              theme="tooltip"
              :content="player.firstName"
              append-to="#event-tooltip-container"
              v-slot:default="{ setRef, show, hide }"
            >
              <li :ref="setRef" @mouseenter="show" @mouseleave="hide" @focus="show" @blur="hide" :tabindex="0">
                {{ player.jersey_number }}
              </li>
            </FloatingPanel>
          </template>
        </ul>
      </dd>
    </dl>
  </div>
</template>
