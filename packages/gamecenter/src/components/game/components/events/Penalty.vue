<script setup>
import { FloatingPanel } from '@mjsz-vbr-elements/core/components';
import { useI18n } from '@mjsz-vbr-elements/core/composables';
import { IconWhistle } from '@mjsz-vbr-elements/shared/icons';
import { computed, ref } from 'vue';
import { convertPenaltyCause } from '../../internal';
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
  <div class="is-time-cell">
    {{ event.eventTime }}
  </div>
  <div class="is-team-logo-cell">
    <TeamLogo :key="event.team.id" :name="event.team.longName" :logo="event.team.logo" :is-home-team="isHomeTeam" />
  </div>
  <div class="is-icon-cell">
    <IconWhistle width="24" height="24" class="is-penalty-icon" />
  </div>
  <div class="is-penalty-cell">
    <FloatingPanel
      v-slot="{ setRef, events }"
      :offset="2"
      placement="top"
      theme="tooltip"
      :content="t(`penalties.${convertedEvent.penaltyCause}`)"
      :append-to="tooltipContainer"
    >
      <span :ref="setRef" :tabindex="0" :aria-label="t(`penalties.${convertedEvent.penaltyCause}`)" v-bind="events">
        {{ convertedEvent.penaltyCause }}
      </span>
    </FloatingPanel>
    <div ref="tooltipContainer" />
  </div>
  <div class="is-light-cell">
    <template v-if="Boolean(event.penaltyLength)">
      {{ t('events.penaltyLength', [event.penaltyLength]) }}
    </template>
    <template v-if="event.ps">
      <FloatingPanel
        v-slot="{ setRef, events }"
        :offset="2"
        placement="top"
        theme="tooltip"
        :content="t('penalties.PS')"
        :append-to="tooltipContainer"
      >
        <span :ref="setRef" :tabindex="0" :aria-label="t(`penalties.${convertedEvent.penaltyCause}`)" v-bind="events">
          PS
        </span>
      </FloatingPanel>
    </template>
  </div>
  <div class="is-light-cell">
    {{ event.penaltyEnd }}
  </div>
  <div class="is-evented-person">
    <span v-if="event.jerseyNumber === null">{{ t('events.teamPenalty') }}</span>
    <template v-else>
      <span class="is-player-number">{{ event.jerseyNumber }}</span>
      {{ event.lastName }} {{ event.firstName }}
    </template>
  </div>
</template>
