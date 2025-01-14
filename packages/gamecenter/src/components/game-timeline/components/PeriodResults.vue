<script setup>
import { useMainClass } from '@mjsz-vbr-elements/core/composables';

defineProps({
  results: {
    type: Object,
    default: () => ({}),
  },

  homeTeamName: {
    type: String,
    default: '',
  },

  awayTeamName: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <table :class="useMainClass('period-results')">
    <tbody>
      <tr>
        <td><span class="is-home-team" /></td>
        <td>{{ homeTeamName }}</td>
        <td v-for="(score, index) in results.home" :key="index">
          {{ score }}
        </td>
      </tr>

      <tr>
        <td><span class="is-away-team" /></td>
        <td>{{ awayTeamName }}</td>
        <td v-for="(score, index) in results.away" :key="index">
          {{ score }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
