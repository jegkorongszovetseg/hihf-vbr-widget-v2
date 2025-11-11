<script setup>
// import { StandingsSelector } from '@mjsz-vbr-elements/extended';

import { store } from '../store.js';
// import '../../../packages/shared/assets/css/common.scss';
// import '../../../packages/shared/assets/css/responsive-table.scss';
// import '../../../packages/shared/assets/css/table.scss';
// import '../../../packages/shared/assets/css/standings-selector.scss';
// import '../../../packages/shared/assets/css/dropdown.scss';
// import '../../../packages/shared/assets/css/typography.scss';
// import '../../../packages/shared/assets/css/playoffs.scss';

const data = [
  {
    name: 'OB1',
    phase: 'Rájátszás',
    path: '/',
    championshipId: 3824,
    isPlayoffs: true,
  },
  {
    name: 'Erste Liga 2013-2014',
    phase: 'Rájátszás',
    path: '/',
    championshipId: 3450,
    isPlayoffs: true,
  },
  {
    name: 'Erste Liga',
    phase: 'Alapszakasz',
    championshipId: 3783,
    phaseId: 45658,
  },
  {
    name: 'Andersen Liga',
    phase: 'Alapszakasz',
    championshipId: 3770,
    phaseId: 45661,
  },

];
// const data2 = '[{"name":"Erste Liga","phase":"Alapszakasz","championshipId":3783,"phaseId":45658,"isPlayoffs":false},{"name":"Andersen Liga","phase":"Alapszakasz","championshipId":3770,"phaseId":45661,"isPlayoffs":false},{"name":"Erste Liga 2013-2014","phase":"Alapszakasz","championshipId":3450,"phaseId":45196,"isPlayoffs":false}]';
</script>

<template>
  <div style="width: 50%; margin: 0 auto">
    <!-- <StandingsSelector :locale="store.locale" :data="data" /> -->
    <mjsz-vbr-standings-selector :locale="store.locale" :data="data" />
  </div>
</template>

<!-- <style>
mjsz-vbr-standings-selector {
  --mvw-standings-selector-title-size: 16px;
  --mvw-standings-selector-title-color: var(--mvw-primary-color-700);
  --mvw-standings-selector-title-bg-color: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0) 96%,
    rgba(0, 0, 0, 0.2) 96%,
    rgba(0, 0, 0, 0.2) 100%
  );

  --mvw-table-default-bg-color: transparent;
  --mvw-table-header-bg-color: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0) 96%,
    rgba(0, 0, 0, 0.2) 96%,
    rgba(0, 0, 0, 0.2) 100%
  );
  --mvw-table-header-font-size: 11px;
  --mvw-table-header-hover-bg-color: transparent;
  --mvw-table-cell-light-color: var(--mvw-primary-color-300);
  --mvw-table-stripped-bg-color: transparent;

  /* --mvw-standings-selector-section-title-bg: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.2) 0%,
    rgba(0, 0, 0, 0.2) 4%,
    rgba(255, 255, 255, 0) 4%,
    rgba(255, 255, 255, 0) 96%,
    rgba(0, 0, 0, 0.2) 96%,
    rgba(0, 0, 0, 0.2) 100%
  ); */
}
</style> -->
