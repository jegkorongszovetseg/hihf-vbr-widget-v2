<script setup>
import { useFetch } from '@vueuse/core';
import { computed, useTemplateRef } from 'vue';
import { usePopover } from './internal';
import Media from './Media.vue';

defineProps({
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

// const banners = [
// {
//   id: '239',
//   type: 'responsive', // responsive | static | popover
//   link: '/',

//   params: {
//     media: 'https://picsum.photos/id/238/750/200',
//     mediaLarge: 'https://picsum.photos/id/239/1170/130',
//   },
// },
// {
//   id: '240',
//   type: 'static', // responsive | static | popover
//   link: '/',

//   params: {
//     media: 'https://picsum.photos/id/239/320/640',
//   },
// },
// {
//   id: '241',
//   type: 'popover', // responsive | static | popover
//   link: '/',

//   params: {
//     media: 'https://picsum.photos/id/239/640/440',
//     type: 'image/jpg',
//     width: 600,
//     height: 300,
//     closeTimeout: 100000,
//   },
// },
//   {
//     id: '242',
//     type: 'popover', // responsive | static | popover
//     link: '/',

//     params: {
//       media: 'https://jegkorongszovetseg.hu/_upload/editor/banner/video/MJSZ_15s_V02_1920x1080_1_web_1.mp4',
//       type: 'video/mp4',
//       width: 600,
//       height: 300,
//       closeTimeout: 100000,
//     },
//   },
// ];

const { isFinished, data } = useFetch('http://localhost:3007/internal/ad-placement').get().json();

const { hide } = usePopover(popoverRef, computed(() => data.value.params.closeTimeout || 30000));

const currentAd = computed(() => {
  return data.value;
});
</script>

<template>
  <div v-if="isFinished" class="ad-placement-tool">
    <template v-if="currentAd.type === 'popover'">
      <dialog id="mjsz-popover" ref="popover">
        <Media :current-ad="currentAd" :mobile-breakpoint="mobileBreakpoint" />
        <button type="button" class="close" @click="hide" />
      </dialog>
    </template>
    <template v-else>
      <Media :current-ad="currentAd" :mobile-breakpoint="mobileBreakpoint" />
    </template>
  </div>
</template>

<style lang="scss" scoped>
[popover]:popover-open {
  opacity: 1;
}

[popover] {
  --popover-padding: var(--size-10);

  display: grid;
  grid-template-areas: 'stack';
  padding: var(--popover-padding);
  border-radius: 8px;
  background-color: var(--mvw-color-white);
  opacity: 0;

  transition:
    opacity 0.3s,
    overlay 0.3s allow-discrete,
    display 0.3s allow-discrete;

  :is(button, a) {
    grid-area: stack;
  }

  :where(img, video) {
    display: block;
    object-fit: cover;
    // width: min(100vw, 640px);
    // height: min(100vh, 320px);
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
  :where(img) {
    opacity: 1;
  }

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

<style src="@mjsz-vbr-elements/shared/css/core.css" />
