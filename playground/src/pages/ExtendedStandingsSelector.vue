<script setup>
import { store } from '../store.js';

import { StandingsSelector } from '@mjsz-vbr-elements/extended';
import '../../../packages/shared/dist/css/common.css';
import '../../../packages/shared/dist/css/responsive-table.css';
import '../../../packages/shared/dist/css/table.css';
import '../../../packages/shared/dist/css/standings-selector.css';
</script>

<template>
  <div style="width: 50%; margin: 0 auto">
    <StandingsSelector :locale="store.locale" :data="[{ id: 1 }, { id: 2 }]"></StandingsSelector>
    <!-- <mjsz-vbr-standings-selector :locale="store.locale" :data="[{ id: 1 }, { id: 2 }]" /> -->
  </div>
</template>
