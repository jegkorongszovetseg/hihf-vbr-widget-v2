<script setup>
import { Image } from '@mjsz-vbr-elements/core/components';
import { computed } from 'vue';

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});

const seriesStandings = computed(() => props.data?.match?.seriesStandings?.split(':'));
</script>

<template>
  <ul class="tree-node text-highlighted">
    <template v-if="data?.type === 'match'">
      <li>
        <Image v-if="data.match.homeTeam" :src="data.match.homeTeam.logo" />
        <div class="responsive-team-name team-name">
          <div>
            <span class="team-name-short">{{ data.match.homeTeam?.shortName }}</span>
            <span class="team-name-long">{{ data.match.homeTeam?.longName }}</span>
          </div>
        </div>
        <span class="score font-bold">{{ seriesStandings[0] }}</span>
      </li>
      <li class="separator" />
      <li>
        <Image v-if="data.match.awayTeam" :src="data.match.awayTeam.logo" />
        <div class="responsive-team-name team-name">
          <div>
            <span class="team-name-short">{{ data.match.awayTeam?.shortName }}</span>
            <span class="team-name-long">{{ data.match.awayTeam?.longName }}</span>
          </div>
        </div>
        <span class="score font-bold">{{ seriesStandings[1] }}</span>
      </li>
    </template>
    <template v-else>
      <li>&nbsp;</li>
      <li>&nbsp;</li>
    </template>
  </ul>
</template>
