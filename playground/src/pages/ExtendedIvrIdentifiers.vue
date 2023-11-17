<script setup>
import { store } from '../store.js';
// DEV:
import { IVRIdentifiers } from '@mjsz-vbr-elements/extended';
import '../../../packages/shared/dist/css/common.css';
import '../../../packages/shared/dist/css/typography.css';
import '../../../packages/shared/dist/css/forms.css';
</script>

<template>
  <div class="p-5">
    <!-- <IVRIdentifiers :locale="store.locale" /> -->
    <mjsz-vbr-ibr-identifiers :locale="store.locale" />
  </div>
</template>
