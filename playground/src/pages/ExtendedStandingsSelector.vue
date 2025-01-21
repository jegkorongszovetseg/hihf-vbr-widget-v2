<script setup>
// import { StandingsSelector } from '@mjsz-vbr-elements/extended';

import { store } from '../store.js';
// import '../../../packages/shared/assets/css/common.scss';
// import '../../../packages/shared/assets/css/responsive-table.scss';
// import '../../../packages/shared/assets/css/table.scss';
// import '../../../packages/shared/assets/css/standings-selector.scss';
// import '../../../packages/shared/assets/css/dropdown.scss';
// import '../../../packages/shared/assets/css/typography.scss';

// const data = [
//   {
//     name: 'Erste Liga',
//     phase: 'Alapszakasz',
//     championshipId: 3783,
//     phaseId: 45658,
//     isPlayoffs: false,
//   },
//   {
//     name: 'Andersen Liga',
//     phase: 'Alapszakasz',
//     championshipId: 3770,
//     phaseId: 45661,
//     isPlayoffs: false,
//   },
//   {
//     name: 'Erste Liga 2013-2014',
//     phase: 'Alapszakasz',
//     championshipId: 3450,
//     phaseId: 45196,
//     isPlayoffs: false,
//   },
// ];
const data2 = '[{"name":"Erste Liga","phase":"Alapszakasz","championshipId":3783,"phaseId":45658,"isPlayoffs":false},{"name":"Andersen Liga","phase":"Alapszakasz","championshipId":3770,"phaseId":45661,"isPlayoffs":false},{"name":"Erste Liga 2013-2014","phase":"Alapszakasz","championshipId":3450,"phaseId":45196,"isPlayoffs":false}]';
</script>

<template>
  <div style="width: 50%; margin: 0 auto">
    <!-- <StandingsSelector :locale="store.locale" :data="data" /> -->
    <mjsz-vbr-standings-selector :locale="store.locale" :data="data2" />
  </div>
</template>

<style>
mjsz-vbr-standings-selector {
  --vbr-widget-standings-selector-title-size: 21px;
  --vbr-widget-standings-selector-title-color: var(--vbr-widget-primary-color-900);
  --vbr-widget-standings-selector-title-weight: 700;
  --vbr-widget-standings-selector-title-transform: uppercase;
  --vbr-widget-standings-selector-subtitle-size: 16px;

  --vbr-widget-table-default-bg-color: transparent;
  --vbr-widget-table-header-bg-color: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0) 98%,
    rgba(0, 0, 0, 0.2) 98%,
    rgba(0, 0, 0, 0.2) 100%
  );
  --vbr-widget-table-header-font-size: 11px;
  --vbr-widget-table-header-hover-bg-color: transparent;
  --vbr-widget-table-cell-light-color: var(--vbr-widget-primary-color-300);
}
</style>
