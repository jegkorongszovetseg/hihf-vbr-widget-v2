<script setup>
import { DataTable, ResponsiveTable } from '@mjsz-vbr-elements/core/components';

defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<template>
  <div>
    <h2>Klub Információk</h2>
    <ResponsiveTable> INFO </ResponsiveTable>
  </div>
</template>
