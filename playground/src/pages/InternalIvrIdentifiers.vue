<script setup>
// DEV:
import { store } from '../store.js';
// import '../../../packages/shared/dist/css/common.css';
// import '../../../packages/shared/dist/css/typography.css';
// import '../../../packages/shared/dist/css/forms.css';
</script>

<template>
  <div class="p-5">
    <!-- <IVRIdentifiers :locale="store.locale" /> -->
    <mjsz-ivr-identifiers :locale="store.locale" />
  </div>
</template>
