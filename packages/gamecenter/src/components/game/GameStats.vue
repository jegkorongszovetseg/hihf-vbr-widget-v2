<script setup>
import { computed } from 'vue';
import { FloatingPanel } from '@mjsz-vbr-elements/core/components';
import { useI18n, useMainClass } from '@mjsz-vbr-elements/core/composables';
import IconMore from '@mjsz-vbr-elements/shared/icons/IconMore';
import GameStatsContainer from './components/GameStatsContainer.vue';
import { buildSOG, buildSaves, buildAdv, buildAdvPercent, buildDvgPercent } from './internal';

const props = defineProps({
  gameStats: {
    type: Object,
    required: true,
  },

  gameData: {
    type: Object,
    required: true,
  },
});

const { t } = useI18n();

const homeTeamId = computed(() => props.gameData?.homeTeamId ?? '');
const awayTeamId = computed(() => props.gameData?.awayTeamId ?? '');

const sog = computed(() =>
  buildSOG(props.gameStats?.teamSOG ?? [], props.gameData?.awayTeamId ?? '', props.gameData?.homeTeamId ?? '', 'shots')
);
const saves = computed(() =>
  buildSaves(
    props.gameStats?.teamSOG ?? [],
    props.gameData?.homeTeamId ?? '',
    props.gameData?.awayTeamId ?? '',
    'saves'
  )
);
const pim = computed(() =>
  buildSOG(
    props.gameStats?.teamPenalties ?? [],
    props.gameData?.homeTeamId ?? '',
    props.gameData?.awayTeamId ?? '',
    'penaltyLength'
  )
);

const dvgTime = computed(() =>
  buildAdv(props.gameStats?.teamPowerPlay ?? [], {
    home: homeTeamId.value,
    away: awayTeamId.value,
  })
);
const advPercent = computed(() =>
  buildAdvPercent(props.gameStats?.teamPowerPlay ?? [], {
    home: homeTeamId.value,
    away: awayTeamId.value,
  })
);

const dvgPercent = computed(() =>
  buildDvgPercent(props.gameStats?.teamPowerPlay ?? [], {
    home: homeTeamId.value,
    away: awayTeamId.value,
  })
);
</script>

<template>
  <div :class="useMainClass('gamecenter-game-stats')">
    <div :class="useMainClass('gamecenter-game-stats-container-wrapper')">
      <GameStatsContainer :title="t('teamsStats.sog')" :data="sog" />
      <GameStatsContainer :title="t('teamsStats.saves')" :data="saves" />
      <GameStatsContainer :title="t('teamsStats.pim')" :data="pim" />
      <GameStatsContainer :title="t('teamsStats.advPercent')" :data="advPercent" />
      <GameStatsContainer :data="dvgTime.dvgTime">
        {{ t('teamsStats.advantageTime') }}
        <FloatingPanel :offset="2" placement="top" theme="content" append-to="#popover-container">
          <template v-slot:default="{ setRef, show }">
            <button :ref="setRef" @click.stop="show">
              <IconMore />
            </button>
          </template>
          <template v-slot:content>
            <div class="is-popover-content">
              <GameStatsContainer :title="t('teamsStats.advantageTimePP1')" :data="dvgTime.dvgTimePP1" />
              <GameStatsContainer :title="t('teamsStats.advantageTimePP2')" :data="dvgTime.dvgTimePP2" />
            </div>
          </template>
        </FloatingPanel>
      </GameStatsContainer>
      <GameStatsContainer :title="t('teamsStats.penaltyKilling')" :data="dvgPercent" />
    </div>
    <div id="popover-container"></div>
  </div>
</template>