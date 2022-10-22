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

const locale = ref('hu');
const change = () => {
  locale.value = locale.value === 'hu' ? 'en' : 'hu';
};
</script>

<template>
  <div>
    <button type="button" @click="change">{{ locale }}</button>
    <TeamPowerplay :locale="locale" championship-id="3314" division="Alapszakasz" />
    <TeamPenaltyKilling :locale="locale" championship-id="3314" division="Alapszakasz" />
    <!-- <TeamAttendance :locale="locale" championship-id="3314" division="Alapszakasz" /> -->
    <Statistics :locale="locale"  />
    <!-- <TeamFairplay :locale="locale" championship-id="3314" division="Alapszakasz" /> -->
    <!-- <GoaliesLeader :locale="locale" championship-id="3314" division="Alapszakasz" :under-limit="false" /> -->
    <!-- <FieldPlayersPenalties :locale="locale" championship-id="3314" division="Alapszakasz" /> -->
    <!-- <FieldPlayersLeader :locale="locale" championship-id="3314" division="Alapszakasz" /> -->
    <!-- <Standings :locale="locale" championship-id="3314" division="Alapszakasz" type="3" /> -->
    <!-- <Schedule :locale="locale" championship-id="3314" division="Alapszakasz" auto-initial-page /> -->
  </div>
</template>
