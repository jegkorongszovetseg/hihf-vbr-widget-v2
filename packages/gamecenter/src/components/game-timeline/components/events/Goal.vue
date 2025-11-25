<script setup>
import { FloatingPanel } from '@mjsz-vbr-elements/core/components';
import { useI18n } from '@mjsz-vbr-elements/core/composables';
import { isEmpty, reject } from '@mjsz-vbr-elements/core/utils';
import { IconHockeyPuck } from '@mjsz-vbr-elements/shared/icons';
import { computed, ref } from 'vue';
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

const { t } = useI18n();

const assists = computed(() => reject(player => isEmpty(player), [props.event.assists1, props.event.assists2]));
const homeOnIce = computed(() => props.event.homeOnIce);
const awayOnIce = computed(() => props.event.awayOnIce);
</script>

<template>
  <GameEventLayout :timestamp="event.eventTime" :is-home-team="isHomeTeam" :event-type="event.type" :event="event">
    <template #title>
      {{ t('eventType.Gól') }}
      <span v-if="event.advantage">
        {{ event.advantage }}
      </span>
      <span v-if="event.en"> EN </span>
      <span v-else-if="event.score">({{ event.score }})</span>
    </template>

    <template #details-list>
      <ul class="is-details-list">
        <li class="is-evented-person">
          <span class="is-player-number">{{ event.jerseyNumber }}</span> {{ event.lastName }} {{ event.firstName }}
        </li>
        <li class="is-assists-list">
          <template v-for="assist in assists" :key="assist">
            <span class="is-evented-person"><i class="is-player-number">{{ assist.jerseyNumber }}</i> {{ assist.lastName }}
              {{ assist.firstName }}</span>
          </template>
        </li>
        <li v-if="!isEmpty(homeOnIce) || !isEmpty(awayOnIce)" class="is-poi-data">
          <ul>
            <template v-for="player in homeOnIce" :key="player.playerId">
              <FloatingPanel
                v-slot="{ setRef, events }"
                :offset="2"
                placement="top"
                theme="tooltip"
                :content="`${player.lastName} ${player.firstName}`"
                :append-to="tooltipContainer"
              >
                <li
                  :ref="setRef"
                  :tabindex="0"
                  :aria-label="`${player.jerseyNumber} ${player.lastName} ${player.firstName}`"
                  v-bind="events"
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
                v-slot="{ setRef, events }"
                :offset="2"
                placement="top"
                theme="tooltip"
                :content="`${player.lastName} ${player.firstName}`"
                :append-to="tooltipContainer"
              >
                <li
                  :ref="setRef"
                  :tabindex="0"
                  :aria-label="`${player.jerseyNumber} ${player.lastName} ${player.firstName}`"
                  v-bind="events"
                >
                  {{ player.jerseyNumber }}
                </li>
              </FloatingPanel>
            </template>
          </ul>
        </li>
        <li>
          <span v-if="event.ps || event.gws || event.gwg" class="badge lg inverted">
            <template v-if="event.ps">PS</template>
            <template v-if="event.gws">GWS</template>
            <template v-if="event.gwg">GWG</template>
          </span>
        </li>
      </ul>
    </template>

    <template #team-logo>
      <TeamLogo :key="event.team.id" :name="event.team.longName" :logo="event.team.logo" :is-home-team="isHomeTeam" />
    </template>

    <template #event-type-icon>
      <IconHockeyPuck />
    </template>
  </GameEventLayout>
</template>
