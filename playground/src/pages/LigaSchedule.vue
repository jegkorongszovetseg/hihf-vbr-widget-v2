<script setup>
import { store } from '../store.js';
import { ScheduleLiga } from '@mjsz-vbr-elements/liga';
import '../../../packages/shared/dist/css/common.css';
import '../../../packages/shared/dist/css/typography.css';
import '../../../packages/shared/dist/css/cards.css';
import '../../../packages/shared/dist/css/grid.css';
import '../../../packages/shared/dist/css/forms.css';
</script>

<template>
  <div class="p-5">
    <!-- <ScheduleLiga :locale="store.locale" championship-name="Erste Liga"></ScheduleLiga> -->
    <mjsz-vbr-schedule-liga :locale="store.locale" championship-name="Erste Liga" timezone-selector />
  </div>
</template>
