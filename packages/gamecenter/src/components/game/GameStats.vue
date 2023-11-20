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

const homeTeamId = computed(() => props.gameData?.homeTeam?.id ?? '');
const awayTeamId = computed(() => props.gameData?.awayTeam?.id ?? '');

const sog = computed(() =>
  buildSOG(props.gameStats?.teamSOG ?? [], awayTeamId.value, homeTeamId.value, 'shots')
);
const saves = computed(() =>
  buildSaves(
    props.gameStats?.teamSOG ?? [],
    homeTeamId.value,
    awayTeamId.value,
    'saves'
  )
);
const pim = computed(() =>
  buildSOG(
    props.gameStats?.teamPenalties ?? [],
    homeTeamId.value,
    awayTeamId.value,
    'penaltyLength'
  )
);

const advTime = computed(() => buildAdv(props.gameStats?.teamPowerPlay ?? {}));
const advPercent = computed(() => buildAdvPercent(props.gameStats?.teamPowerPlay ?? {}));
const dvgPercent = computed(() => buildDvgPercent(props.gameStats?.teamPowerPlay ?? {}));
</script>

<template>
  <div :class="useMainClass('gamecenter-game-stats')">
    <div :class="useMainClass('gamecenter-game-stats-container-wrapper')">
      <GameStatsContainer :title="t('teamsStats.sog')" :data="sog" />
      <GameStatsContainer :title="t('teamsStats.saves')" :data="saves" />
      <GameStatsContainer :title="t('teamsStats.pim')" :data="pim" />
      <GameStatsContainer :title="t('teamsStats.advPercent')" :data="advPercent" />
      <GameStatsContainer :title="t('teamsStats.penaltyKilling')" :data="dvgPercent" />
      <GameStatsContainer :data="advTime.advTime">
        {{ t('teamsStats.advantageTime') }}
        <FloatingPanel :offset="2" placement="top" theme="content" append-to="#popover-container">
          <template v-slot:default="{ setRef, show, hide }">
            <button :ref="setRef" @click.stop="show" @focus="show" @blur="hide">
              <IconMore />
            </button>
          </template>
          <template v-slot:content>
            <div class="is-popover-content">
              <GameStatsContainer :title="t('teamsStats.advantageTimePP1')" :data="advTime.advTimePP1" />
              <GameStatsContainer :title="t('teamsStats.advantageTimePP2')" :data="advTime.advTimePP2" />
            </div>
          </template>
        </FloatingPanel>
      </GameStatsContainer>
    </div>
    <div id="popover-container"></div>
  </div>
</template>
