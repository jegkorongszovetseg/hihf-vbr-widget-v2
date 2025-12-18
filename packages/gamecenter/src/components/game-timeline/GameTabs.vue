<script setup>
import { useI18n } from '@mjsz-vbr-elements/core/composables';
import { useUrlSearchParams } from '@vueuse/core';
import { TAB_EVENTS, TAB_LINEUPS, TAB_OFFICIALS, TAB_PLAYER_STATS, TAB_TEAM_STATS } from './constants';

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

  if (!props.useSearchParams)
    return;
  searchParams.tab = value;
}
</script>

<template>
  <nav class="tabs underlined">
    <div role="tablist" class="text-center gamecenter-timeline-tab-buttons">
      <button
        role="tab"
        type="button"
        :aria-selected="activeTab === TAB_EVENTS"
        class="tab-button" :class="{ 'is-active': activeTab === TAB_EVENTS }"
        @click="onTabChange(TAB_EVENTS)"
      >
        {{ t('menu.events') }}
      </button>
      <button
        role="tab"
        type="button"
        :aria-selected="activeTab === TAB_LINEUPS"
        class="tab-button" :class="{ 'is-active': activeTab === TAB_LINEUPS }"
        @click="onTabChange(TAB_LINEUPS)"
      >
        {{ t('menu.lineups') }}
      </button>
      <button
        role="tab"
        type="button"
        :aria-selected="activeTab === TAB_TEAM_STATS"
        class="tab-button" :class="{ 'is-active': activeTab === TAB_TEAM_STATS }"
        @click="onTabChange(TAB_TEAM_STATS)"
      >
        {{ t('menu.teamStats') }}
      </button>
      <button
        role="tab"
        type="button"
        :aria-selected="activeTab === TAB_PLAYER_STATS"
        class="tab-button" :class="{ 'is-active': activeTab === TAB_PLAYER_STATS }"
        @click="onTabChange(TAB_PLAYER_STATS)"
      >
        {{ t('menu.playerStats') }}
      </button>
      <button
        role="tab"
        type="button"
        :aria-selected="activeTab === TAB_OFFICIALS"
        class="tab-button" :class="{ 'is-active': activeTab === TAB_OFFICIALS }"
        @click="onTabChange(TAB_OFFICIALS)"
      >
        {{ t('menu.officials') }}
      </button>
    </div>
  </nav>
</template>
