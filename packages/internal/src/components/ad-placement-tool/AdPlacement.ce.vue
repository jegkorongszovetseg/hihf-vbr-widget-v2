<script setup>
import { isBetween } from '@mjsz-vbr-elements/core/utils';
import { computed, useTemplateRef } from 'vue';
import { usePopover } from './internal';

const props = defineProps({
  areaId: {
    type: String,
    default: '',
  },

  mobileBreakpoint: {
    type: String,
    default: '768px',
  },
});

const popoverRef = useTemplateRef('popover');

const banners = [
  {
    id: '238',
    active: true,
    type: 'popover', // responsive | static | popover
    link: '/',
    start: new Date(2025, 10, 23, 12, 0),
    end: new Date(2025, 10, 26, 12, 0),
  },
];

const { hide } = usePopover(popoverRef);

const activeAds = computed(() => {
  return banners.filter(banner => banner.active && isBetween(new Date(), banner.start, banner.end));
});

const currentAd = computed(() => {
  const random = Math.floor(Math.random() * activeAds.value.length);
  return activeAds.value[random];
});

const media = computed(() => `(min-width: ${props.mobileBreakpoint})`);
</script>

<template>
  <div class="ad-placement-tool">
    <template v-if="currentAd.type === 'popover'">
      <div id="mjsz-popover" ref="popover" popover="auto">
        <a :href="currentAd.link || undefined">
          <img :src="`https://picsum.photos/id/${currentAd.id}/640/360`">
        </a>
        <button type="button" class="close" @click="hide" />
      </div>
    </template>
    <template v-else>
      <component :is="currentAd.link ? 'a' : 'div'" :href="currentAd.link || undefined">
        <picture>
          <source v-if="currentAd.type === 'responsive'" :srcset="`https://picsum.photos/id/${currentAd.id}/1170/130`" :media="media">
          <img :src="`https://picsum.photos/id/${currentAd.id}/750/160`">
        </picture>
      </component>
      <!-- <a v-if="currentAd.type === 'responsive'" :href="currentAd.link || undefined" class="mobile">
        <img :src="`https://picsum.photos/id/${currentAd.id}/750/160`">
      </a> -->
    </template>
  </div>
</template>

<style lang="scss" scoped>
[popover]:popover-open {
  opacity: 1;
}

[popover] {
  display: grid;
  grid-template-areas: 'stack';
  padding: 10px;
  border-radius: 8px;

  opacity: 0;

  transition:
    opacity 0.3s,
    overlay 0.3s allow-discrete,
    display 0.3s allow-discrete;

  :is(button, a) {
    grid-area: stack;
  }
  img {
    display: block;
    width: min(100%, 640px);
    height: auto;
  }
  button {
    align-self: start;
    justify-self: end;
  }
}

@starting-style {
  [popover]:popover-open {
    opacity: 0;
  }
}

[popover]::backdrop {
  background-color: transparent;
  transition:
    display 0.3s allow-discrete,
    overlay 0.3s allow-discrete,
    background-color 0.3s;
  backdrop-filter: blur(2px);
}

[popover]:popover-open::backdrop {
  background-color: rgb(0 0 0 / 75%);
}

@starting-style {
  [popover]:popover-open::backdrop {
    background-color: transparent;
  }
}

.ad-placement-tool {
  .close {
    position: absolute;
    right: 4px;
    top: 4px;
    width: 32px;
    height: 32px;
    margin: 0;
    padding: 0;
    opacity: 0.3;
    background: none;
    border: none;
  }
  .close:hover {
    opacity: 1;
  }
  .close:before,
  .close:after {
    position: absolute;
    left: 50%;
    top: 7px;
    content: ' ';
    height: 16px;
    width: 2px;
    background-color: #333;
  }
  .close:before {
    transform: rotate(45deg);
  }
  .close:after {
    transform: rotate(-45deg);
  }
}
</style>
