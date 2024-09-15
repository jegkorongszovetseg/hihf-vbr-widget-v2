<script setup>
import { ref, computed } from 'vue';
import { useI18n } from '@mjsz-vbr-elements/core/composables';
import IconWhistle from '@mjsz-vbr-elements/shared/icons/IconWhistle';
import { convertPenaltyCause } from '../../../game/internal';
import TeamLogo from './TeamLogo.vue';
import GameEventContainer from '../GameEventContainer.vue';

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
  <GameEventContainer :timestamp="event.eventTime">
    Event
    <template #team-logo>
      <TeamLogo :name="event.team.longName" :logo="event.team.logo" :key="event.team.id" :is-home-team="isHomeTeam" />
    </template>
  </GameEventContainer>
</template>
