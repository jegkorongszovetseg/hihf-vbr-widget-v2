<script setup>
import { ref } from 'vue';
import Schedule from './@widgets/Schedule.ce.vue';
import Standings from './@widgets/Standings.ce.vue';
import FieldPlayersLeader from './@widgets/FieldPlayersLeader.ce.vue';
import FieldPlayersPenalties from './@widgets/FieldPlayersPenalties.ce.vue';
import GoaliesLeader from './@widgets/GoaliesLeader.ce.vue';
import TeamAttendance from './@widgets/TeamAttendance.ce.vue';
import TeamFairplay from './@widgets/TeamFairplay.ce.vue';
import TeamPenaltyKilling from './@widgets/TeamPenaltyKilling.ce.vue';
import TeamPowerplay from './@widgets/TeamPowerplay.ce.vue';
import TeamScoringEfficiency from './@widgets/TeamScoringEfficiency.ce.vue';
import Statistics from './@widgets-extended/statistics/Statistics.ce.vue';
import ScheduleLiga from './@widgets-extended/schedule/ScheduleLiga.ce.vue';
import Playoffs from './@widgets-extended/playoffs/Playoffs.ce.vue';

const locale = ref('hu');
const change = () => {
  locale.value = locale.value === 'hu' ? 'en' : 'hu';
};
</script>

<template>
  <div>
    <button type="button" @click="change">{{ locale }}</button>
    <Playoffs :locale="locale" championship-id="3314" />
    <!-- <ScheduleLiga :locale="locale" championship-name="Erste Liga" :auto-refresh="true" timezone-selector /> -->
    <!-- <Statistics :locale="locale" championship-name="Erste Liga" /> -->
    <!-- <TeamScoringEfficiency :locale="locale" championship-id="3314" division="Alapszakasz" /> -->
    <!-- <TeamPowerplay :locale="locale" championship-id="3314" division="Alapszakasz" /> -->
    <!-- <TeamPenaltyKilling :locale="locale" championship-id="3314" division="Alapszakasz" /> -->
    <!-- <TeamFairplay :locale="locale" championship-id="3314" division="Alapszakasz" /> -->
    <!-- <TeamAttendance :locale="locale" championship-id="3314" division="Alapszakasz" :is-team-linked="true" /> -->
    <!-- <GoaliesLeader :locale="locale" championship-id="3314" division="Alapszakasz" /> -->
    <!-- <FieldPlayersPenalties :locale="locale" championship-id="3314" division="Alapszakasz" :is-player-linked="false" :is-team-linked="true" /> -->
    <!-- <FieldPlayersLeader :locale="locale" championship-id="3314" division="Alapszakasz" :is-player-linked="true" :is-team-linked="true" /> -->
    <!-- <Standings :locale="locale" championship-id="3314" division="Alapszakasz" type="3" /> -->
    <!-- <Schedule
      :locale="locale"
      championship-id="3314"
      division="Alapszakasz"
      auto-initial-page
      auto-refresh
      timezone-selector
    /> -->
  </div>
</template>
