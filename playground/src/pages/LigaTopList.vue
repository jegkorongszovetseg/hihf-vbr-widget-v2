<script setup>
import { TopListLiga } from '@mjsz-vbr-elements/liga';
import { store } from '../store.js';

import '../../../packages/shared/assets/css/top-list.scss';
</script>

<template>
  <div>
    <TopListLiga :locale="store.locale" championship-id="3783" />
    <!-- <mjsz-vbr-top-list-liga :locale="store.locale" championship-id="3783" /> -->
  </div>
</template>
