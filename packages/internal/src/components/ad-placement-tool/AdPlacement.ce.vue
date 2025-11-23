<script setup>
import { isBetween } from '@mjsz-vbr-elements/core/utils';
import { computed } from 'vue';

const banners = [
  {
    id: 0,
    active: true,
    link: 'xxx',
    start: new Date(2025, 10, 23, 12, 0),
    end: new Date(2025, 10, 25, 12, 0),
  },
];

const activeAds = computed(() => {
  return banners.filter(banner => banner.active && isBetween(new Date(), banner.start, banner.end));
});

const currentAd = computed(() => {
  const random = Math.floor(Math.random() * activeAds.value.length);
  return activeAds[random];
});
</script>

<template>
  <div>
    <div class="desktop">
      <a href="#">Desktop: {{ currentAd }}</a>
    </div>
    <div class="mobile">
      <a href="#">Mobile</a>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
