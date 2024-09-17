<script setup>
import { computed, ref } from 'vue';
import { reject, isEmpty } from 'ramda';
import { FloatingPanel } from '@mjsz-vbr-elements/core/components';
import IconHockeyPuck from '@mjsz-vbr-elements/shared/icons/IconHockeyPuck';
import GameEventLayout from '../GameEventLayout.vue';
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
  <GameEventLayout :timestamp="event.eventTime" :is-home-team="isHomeTeam">
    <template #default>
      <li class="is-score">{{ event.score }}</li>
      <li>
        <span v-if="event.advantage" class="is-badge is-large">
          {{ event.advantage }}
        </span>
        <span v-if="event.en" class="is-badge is-large"> EN </span>
      </li>
      <li>
        <span v-if="event.ps || event.gws || event.gwg" class="is-badge is-invert is-large">
          <template v-if="event.ps">PS</template>
          <template v-if="event.gws">GWS</template>
          <template v-if="event.gwg">GWG</template>
        </span>
      </li>
      <!-- <div>
        <dl>
          <dt class="is-evented-person">
            <span class="is-player-number">{{ event.jerseyNumber }}</span> {{ event.lastName }} {{ event.firstName }}
          </dt>
          <dt class="is-assists-list">
            <template v-for="assist in assists" :key="assist">
              <span
                ><i>{{ assist.jerseyNumber }}</i> {{ assist.lastName }} {{ assist.firstName }}</span
              >
            </template>
          </dt>
          <dd v-if="!isEmpty(homeOnIce) || !isEmpty(awayOnIce)" class="is-poi-data">
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
                  <li
                    :ref="setRef"
                    :tabindex="0"
                    :aria-label="`${player.jerseyNumber} ${player.lastName} ${player.firstName}`"
                    v-on="events"
                  >
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
                  <li
                    :ref="setRef"
                    :tabindex="0"
                    :aria-label="`${player.jerseyNumber} ${player.lastName} ${player.firstName}`"
                    v-on="events"
                  >
                    {{ player.jerseyNumber }}
                  </li>
                </FloatingPanel>
              </template>
            </ul>
          </dd>
        </dl>
      </div> -->
    </template>

    <template #team-logo>
      <TeamLogo :name="event.team.longName" :logo="event.team.logo" :key="event.team.id" :is-home-team="isHomeTeam" />
    </template>

    <template #event-type-icon>
      <IconHockeyPuck />
    </template>
  </GameEventLayout>
  <div ref="tooltipContainer" />
</template>
