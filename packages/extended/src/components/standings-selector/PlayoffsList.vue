<script setup>
import { Image, LoadingIndicator, ResponsiveTable } from '@mjsz-vbr-elements/core/components';
import { useI18n } from '@mjsz-vbr-elements/core/composables';

defineProps({
  playoffs: {
    type: Array,
    default: () => [],
  },

  isLoading: {
    type: Boolean,
    default: false,
  },
});

const { t } = useI18n();
</script>

<template>
  <ResponsiveTable>
    <div class="playoffs">
      <LoadingIndicator v-if="isLoading" />
      <div v-for="playoff in playoffs" :key="`${playoff.divisionStage2Name}-${playoff.divisionStageNumber}`" class="section">
        <div class="section-title">
          {{ t(`playoffs.${playoff.divisionStage2Name}${playoff.divisionStageNumber || ''}`) }}
        </div>
        <ul>
          <li class="responsive-team-name font-bold text-highlighted">
            <div>
              <span class="team-name-short">{{ playoff.homeTeam.shortName }}</span>
              <span class="team-name-long">{{ playoff.homeTeam.longName }}</span>
            </div>
          </li>
          <li><Image :src="playoff.homeTeam.logo" /></li>
          <li><span class="badge lg inverted">{{ playoff.seriesStandings }}</span></li>
          <li><Image :src="playoff.awayTeam.logo" /></li>
          <li class="responsive-team-name font-bold text-highlighted">
            <div>
              <span class="team-name-short">{{ playoff.awayTeam.shortName }}</span>
              <span class="team-name-long">{{ playoff.awayTeam.longName }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </ResponsiveTable>
</template>
