<script setup>
import Schedule from './components/widgets/Schedule.ce.vue';
import Standings from './components/widgets/Standings.ce.vue';
</script>

<template>
  <div>
    <Standings locale="hu" championship-id="3314" division="Alapszakasz" type="3" />
    <Schedule locale="hu" championship-id="3314" division="Alapszakasz" />
  </div>
</template>
