<script setup>
import { ref } from 'vue';
import { useI18n } from '@mjsz-vbr-elements/core/composables';
import { FloatingPanel } from '@mjsz-vbr-elements/core/components';
import IconWhistle from '@mjsz-vbr-elements/shared/icons/IconWhistle';
import TeamLogo from './TeamLogo.vue';

defineProps({
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
</script>

<template>
  <div class="is-time-cell">{{ event.eventTime }}</div>
  <div class="is-team-logo-cell">
    <TeamLogo :name="event.team.longName" :logo="event.team.logo" :key="event.team.id" :is-home-team="isHomeTeam" />
  </div>
  <div class="is-icon-cell"><IconWhistle width="24" height="24" class="is-penalty-icon" /></div>
  <div class="is-penalty-cell">
    <FloatingPanel
      :offset="2"
      placement="top"
      theme="tooltip"
      :content="t(`penalties.${event.penaltyCause.toUpperCase()}`)"
      :append-to="tooltipContainer"
      v-slot:default="{ setRef, show, hide }"
    >
      <span :ref="setRef" :tabindex="0" @mouseenter="show" @mouseleave="hide" @focus="show" @blur="hide">
        {{ event.penaltyCause.toUpperCase() }}
      </span>
    </FloatingPanel>
    <div ref="tooltipContainer" />
  </div>
  <div class="is-light-cell">
    <template v-if="event.penaltyLength !== 0">{{ t('events.penaltyLength', [event.penaltyLength]) }}</template>
    <template v-if="event.perc === 0">PS</template>
  </div>
  <div class="is-light-cell">{{ event.penaltyEnd }}</div>
  <div>
    <span v-if="event.jerseyNumber === null">{{ t('events.teamPenalty') }}</span>
    <template v-else>
      <span class="is-player-number">{{ event.jerseyNumber }}</span>
      {{ event.lastName }} {{ event.firstName }}
    </template>
  </div>
</template>
