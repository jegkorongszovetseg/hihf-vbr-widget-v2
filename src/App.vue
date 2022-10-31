<script setup>
import { ref } from 'vue';
import Schedule from './components/widgets/Schedule.ce.vue';
import Standings from './components/widgets/Standings.ce.vue';
import FieldPlayersLeader from './components/widgets/FieldPlayersLeader.ce.vue';
import Statistics from './components/widgets/extended/Statistics.ce.vue';
import FieldPlayersPenalties from './components/widgets/FieldPlayersPenalties.ce.vue';
import GoaliesLeader from './components/widgets/GoaliesLeader.ce.vue';
import TeamFairplay from './components/widgets/TeamFairplay.ce.vue';
import TeamAttendance from './components/widgets/TeamAttendance.ce.vue';
import TeamPenaltyKilling from './components/widgets/TeamPenaltyKilling.ce.vue';
import TeamPowerplay from './components/widgets/TeamPowerplay.ce.vue';
import TeamScoringEfficiency from './components/widgets/TeamScoringEfficiency.ce.vue';

const locale = ref('hu');
const change = () => {
  locale.value = locale.value === 'hu' ? 'en' : 'hu';
};
</script>

<template>
  <div>
    <button type="button" @click="change">{{ locale }}</button>
    <!-- <TeamScoringEfficiency :locale="locale" championship-id="3314" division="Alapszakasz" /> -->
    <!-- <TeamPowerplay :locale="locale" championship-id="3314" division="Alapszakasz" /> -->
    <!-- <TeamPenaltyKilling :locale="locale" championship-id="3314" division="Alapszakasz" /> -->
    <!-- <TeamFairplay :locale="locale" championship-id="3314" division="Alapszakasz" /> -->
    <!-- <TeamAttendance :locale="locale" championship-id="3314" division="Alapszakasz" :is-team-linked="true" /> -->
    <Statistics :locale="locale" championship-name="Erste Liga" />
    <!-- <Statistics :locale="locale" championship-name="Erste Liga"  /> -->
    <!-- <GoaliesLeader :locale="locale" championship-id="3314" division="Alapszakasz" :under-limit="false" /> -->
    <!-- <FieldPlayersPenalties :locale="locale" championship-id="3314" division="Alapszakasz" :is-player-linked="true" :is-team-linked="true" /> -->
    <!-- <FieldPlayersLeader :locale="locale" championship-id="3314" division="Alapszakasz" :is-player-linked="true" :is-team-linked="true" /> -->
    <!-- <Standings :locale="locale" championship-id="3314" division="Alapszakasz" type="3" /> -->
    <!-- <Schedule :locale="locale" championship-id="3314" division="Alapszakasz" auto-initial-page hide-columns="broadcast" /> -->
  </div>
</template>
