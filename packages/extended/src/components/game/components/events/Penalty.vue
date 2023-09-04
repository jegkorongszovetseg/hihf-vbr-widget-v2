<script setup>
import { useI18n } from '@mjsz-vbr-elements/core/composables';
import { FloatingPanel } from '@mjsz-vbr-elements/core/components';
import IconWhistle from '@mjsz-vbr-elements/shared/icons/IconWhistle';
import TeamLogo from './TeamLogo.vue';

defineProps({
  event: {
    type: Object,
    required: true,
  },
});

const { t } = useI18n();
</script>

<template>
  <div class="is-time-cell">{{ event.eventTime }}</div>
  <div class="is-team-logo-cell"><TeamLogo :name="event.teamName" :logo="event.teamLogo" :key="event.teamId" /></div>
  <div class="is-icon-cell"><IconWhistle width="24" height="24" style="color: red" /></div>
  <div>
    <FloatingPanel
      :offset="2"
      placement="top"
      theme="tooltip"
      :content="event.penaltyCause"
      v-slot:default="{ setRef, show, hide }"
    >
      <span :ref="setRef" :tabindex="0" @mouseenter="show" @mouseleave="hide" @focus="show" @blur="hide">
        {{ event.penaltyCause }}
      </span>
    </FloatingPanel>
  </div>
  <div>
    <template v-if="event.penaltyLength !== 0">{{ t('events.penaltyLength', event.penaltyLength) }}</template>
    <template v-if="event.perc === 0">PS</template>
  </div>
  <div>{{ event.penaltyEnd }}</div>
  <div>
    <span v-if="event.jerseyNumber === null">{{ t('events.teamPenalty') }}</span>
    <template v-else>
      <span class="PlayerNr">{{ event.jerseyNumber }}</span> {{ event.lastName }} {{ event.firstName }}
    </template>
  </div>
</template>
