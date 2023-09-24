<script setup>
import { computed, ref } from 'vue';
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

const tooltipContainer = ref(null);

const assists = computed(() => reject((player) => isEmpty(player), [props.event.assists1, props.event.assists2]));
const homeOnIce = computed(() => props.event.homeOnIce);
const awayOnIce = computed(() => props.event.awayOnIce);
</script>

<template>
  <div class="is-time-cell">{{ event.eventTime }}</div>
  <div class="is-team-logo-cell">
    <TeamLogo :name="event.team.longName" :logo="event.team.logo" :key="event.team.id" :is-home-team="isHomeTeam" />
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
        <span class="is-player-number">{{ event.jerseyNumber }}</span> {{ event.lastName }} {{ event.firstName }}
      </dt>
      <dt class="is-assists-list">
        <template v-for="assist in assists" :key="assist">
          <span
            ><i>{{ assist.jerseyNumber }}</i> {{ assist.lastName }} {{ assist.firstName }}</span
          >
        </template>
      </dt>
      <dd class="is-poi-data">
        <ul>
          <template v-for="player in homeOnIce" :key="player.playerId">
            <FloatingPanel
              :offset="2"
              placement="top"
              theme="tooltip"
              :content="`${player.lastName} ${player.firstName}`"
              :append-to="tooltipContainer"
              v-slot:default="{ setRef, events }"
            >
              <li :ref="setRef" :tabindex="0" v-on="events">
                {{ player.jerseyNumber }}
              </li>
            </FloatingPanel>
          </template>
        </ul>

        <span> / </span>

        <ul>
          <template v-for="player in awayOnIce" :key="player.playerId">
            <FloatingPanel
              :offset="2"
              placement="top"
              theme="tooltip"
              :content="`${player.lastName} ${player.firstName}`"
              :append-to="tooltipContainer"
              v-slot:default="{ setRef, events }"
            >
              <li :ref="setRef" :tabindex="0" v-on="events">
                {{ player.jerseyNumber }}
              </li>
            </FloatingPanel>
          </template>
        </ul>
      </dd>
    </dl>
    <div ref="tooltipContainer" />
  </div>
</template>
