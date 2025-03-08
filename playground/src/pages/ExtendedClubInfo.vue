<script setup>
import { ClubInfo } from '@mjsz-vbr-elements/extended';
import { store } from '../store.js';
import '../../../packages/shared/assets/css/common.scss';
import '../../../packages/shared/assets/css/forms.scss';
import '../../../packages/shared/assets/css/paginator.scss';
import '../../../packages/shared/assets/css/clubinfo.scss';
import '../../../packages/shared/assets/css/cards.scss';
</script>

<template>
  <div class="max-w-[70%] m-auto">
    <ClubInfo :locale="store.locale" />
    <!-- <mjsz-vbr-club-info :locale="store.locale" /> -->
  </div>
</template>
