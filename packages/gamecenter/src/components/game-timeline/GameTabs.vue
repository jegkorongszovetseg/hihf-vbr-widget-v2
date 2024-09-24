<script setup>
import { useUrlSearchParams } from '@vueuse/core';
import { useI18n, useMainClass } from '@mjsz-vbr-elements/core/composables';
import { TAB_EVENTS, TAB_LINEUPS, TAB_TEAM_STATS, TAB_PLAYER_STATS, TAB_OFFICIALS } from './constants';

const props = defineProps({
  activeTab: {
    type: String,
    required: true,
  },

  useSearchParams: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['update:activeTab']);

const searchParams = useUrlSearchParams('history');

const { t } = useI18n();

function onTabChange(value) {
  emit('update:activeTab', value);

  if (!props.useSearchParams) return;
  searchParams.tab = value;
}
</script>

<template>
  <div :class="useMainClass('gamecenter-timeline-tab-buttons')">
    <button
      :class="[useMainClass('tab-button'), { 'is-active': activeTab === TAB_EVENTS }]"
      @click="onTabChange(TAB_EVENTS)"
    >
      {{ t('menu.events') }}
    </button>
    <button
      :class="[useMainClass('tab-button'), { 'is-active': activeTab === TAB_LINEUPS }]"
      @click="onTabChange(TAB_LINEUPS)"
    >
      {{ t('menu.lineups') }}
    </button>
    <button
      :class="[useMainClass('tab-button'), { 'is-active': activeTab === TAB_TEAM_STATS }]"
      @click="onTabChange(TAB_TEAM_STATS)"
    >
      {{ t('menu.teamStats') }}
    </button>
    <button
      :class="[useMainClass('tab-button'), { 'is-active': activeTab === TAB_PLAYER_STATS }]"
      @click="onTabChange(TAB_PLAYER_STATS)"
    >
      {{ t('menu.playerStats') }}
    </button>
    <button
      :class="[useMainClass('tab-button'), { 'is-active': activeTab === TAB_OFFICIALS }]"
      @click="onTabChange(TAB_OFFICIALS)"
    >
      {{ t('menu.officials') }}
    </button>
  </div>
</template>
