<script setup>
import { useI18n } from '@mjsz-vbr-elements/core/composables';
import IconWhistle from '@mjsz-vbr-elements/shared/icons/IconWhistle';
import { computed } from 'vue';
import { convertPenaltyCause } from '../../../game/internal';
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

const { t } = useI18n();

const convertedEvent = computed(() => convertPenaltyCause(props.event));
</script>

<template>
  <GameEventLayout :timestamp="event.eventTime" :is-home-team="isHomeTeam" :event-type="event.type">
    <template #title>
      <span v-if="!event.ps">{{ t('eventType.Kiállítás') }}&nbsp;</span>
      <template v-if="event.penaltyLength">
        {{ t('events.penaltyLength', [event.penaltyLength]) }}
        <template v-if="event.penaltyEnd">
          ({{ event.penaltyEnd }})
        </template>
      </template>
      <template v-if="event.ps">
        {{ t('penalties.PS') }}
      </template>
    </template>

    <template #details-list>
      <ul class="is-details-list">
        <li class="is-evented-person">
          <span v-if="event.jerseyNumber === null">{{ t('events.teamPenalty') }}</span>
          <template v-else>
            <span class="is-player-number">{{ event.jerseyNumber }}</span>
            {{ event.lastName }} {{ event.firstName }}
          </template>
        </li>
        <li class="is-details-sub-title">
          {{ t(`penalties.${convertedEvent.penaltyCause}`) }} <b>({{ convertedEvent.penaltyCause }})</b>
        </li>
      </ul>
    </template>

    <template #team-logo>
      <TeamLogo :key="event.team.id" :name="event.team.longName" :logo="event.team.logo" :is-home-team="isHomeTeam" />
    </template>

    <template #event-type-icon>
      <IconWhistle />
    </template>
  </GameEventLayout>
</template>
