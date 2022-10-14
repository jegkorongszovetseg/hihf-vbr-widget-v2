<script setup>
import Schedule from './components/widgets/Schedule.ce.vue';
import Standings from './components/widgets/Standings.ce.vue';
import FieldPlayersLeader from './components/widgets/FieldPlayersLeader.ce.vue';
</script>

<template>
  <div>
    <FieldPlayersLeader locale="hu" championship-id="3314" division="Alapszakasz" team-filter-by-name="UTE" />
    <Standings locale="hu" championship-id="3314" division="Alapszakasz" type="3" />
    <Schedule locale="hu" championship-id="3314" division="Alapszakasz" auto-initial-page />
  </div>
</template>
