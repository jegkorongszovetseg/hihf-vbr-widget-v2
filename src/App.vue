<script setup>
import { ref } from 'vue';
import Schedule from './components/widgets/Schedule.ce.vue';
import Standings from './components/widgets/Standings.ce.vue';
import FieldPlayersLeader from './components/widgets/FieldPlayersLeader.ce.vue';
import Statistics from './components/widgets/extended/Statistics.ce.vue';
import FieldPlayersPenalties from './components/widgets/FieldPlayersPenalties.ce.vue';
import GoaliesLeader from './components/widgets/GoaliesLeader.ce.vue';

const locale = ref('hu');
const change = () => {
  locale.value = locale.value === 'hu' ? 'en' : 'hu';
};
</script>

<template>
  <div>
    <button type="button" @click="change">{{ locale }}</button>
    <!-- <Statistics :locale="locale"  /> -->
    <GoaliesLeader :locale="locale" championship-id="3314" division="Alapszakasz" />
    <!-- <FieldPlayersPenalties :locale="locale" championship-id="3314" division="Alapszakasz" /> -->
    <!-- <FieldPlayersLeader :locale="locale" championship-id="3314" division="Alapszakasz" /> -->
    <!-- <Standings :locale="locale" championship-id="3314" division="Alapszakasz" type="3" /> -->
    <!-- <Schedule :locale="locale" championship-id="3314" division="Alapszakasz" auto-initial-page /> -->
  </div>
</template>
