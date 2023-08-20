<script setup>
import { useI18n } from '@mjsz-vbr-elements/core/composables';
import { FloatingPanel } from '@mjsz-vbr-elements/core/components';
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
  <div>{{ event.eventTime }}</div>
  <div><TeamLogo :name="event.teamName" :logo="event.teamLogo" /></div>
  <div>{{ event.type }}</div>
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
