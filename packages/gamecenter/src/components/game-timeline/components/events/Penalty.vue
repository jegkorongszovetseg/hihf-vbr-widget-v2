<script setup>
import { ref, computed } from 'vue';
import { useI18n } from '@mjsz-vbr-elements/core/composables';
import IconWhistle from '@mjsz-vbr-elements/shared/icons/IconWhistle';
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

const tooltipContainer = ref(null);

const { t } = useI18n();

const convertedEvent = computed(() => convertPenaltyCause(props.event));
</script>

<template>
  <GameEventLayout :timestamp="event.eventTime" :is-home-team="isHomeTeam">
    <template #default>
      <li>
        <span v-if="event.jerseyNumber === null">{{ t('events.teamPenalty') }}</span>
        <template v-else>
          <span class="is-player-number">{{ event.jerseyNumber }}</span>
          {{ event.lastName }} {{ event.firstName }}
        </template>
      </li>
      <li>
        {{ convertedEvent.penaltyCause }}
      </li>
      <li>
        <template v-if="event.penaltyLength !== 0">
          {{ t('events.penaltyLength', [event.penaltyLength]) }}
          <template v-if="event.penaltyEnd">
            ({{ event.penaltyEnd }})
          </template>
        </template>
        <template v-if="event.perc === 0">PS</template>
      </li>
    </template>

    <template #team-logo>
      <TeamLogo :name="event.team.longName" :logo="event.team.logo" :key="event.team.id" :is-home-team="isHomeTeam" />
    </template>

    <template #event-type-icon>
      <IconWhistle />
    </template>
  </GameEventLayout>
</template>
