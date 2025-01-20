<script setup>
import { StandingsSelector } from '@mjsz-vbr-elements/extended';

import { store } from '../store.js';
import '../../../packages/shared/assets/css/common.scss';
import '../../../packages/shared/assets/css/responsive-table.scss';
import '../../../packages/shared/assets/css/table.scss';
import '../../../packages/shared/assets/css/standings-selector.scss';
import '../../../packages/shared/assets/css/dropdown.scss';
import '../../../packages/shared/assets/css/typography.scss';
</script>

<template>
  <div style="width: 50%; margin: 0 auto">
    <StandingsSelector :locale="store.locale" :data="[{ id: 1 }, { id: 2 }]" />
    <!-- <mjsz-vbr-standings-selector :locale="store.locale" :data="[{ id: 1 }, { id: 2 }]" /> -->
  </div>
</template>
