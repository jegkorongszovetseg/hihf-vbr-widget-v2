<script setup>
import { VBR_API_BASE_URL } from '@mjsz-vbr-elements/core/constants';
import { cookie } from '@mjsz-vbr-elements/core/utils';
import { useFetch } from '@vueuse/core';
import { computed, useTemplateRef } from 'vue';
import { usePopover } from './internal';
import Media from './Media.vue';

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

const { isFinished, data, error } = useFetch(`${VBR_API_BASE_URL}/internal/ad-placement?areaid=${props.areaId}`, { timeout: 1000 }).get().json();

const { hide } = usePopover(popoverRef, computed(() => data.value?.closeTimeout ?? 30000), {
  check: () => cookie.checkCookie(`mjsz-popover-${data.value?._id}`),
  set: () => cookie.setCookie(`mjsz-popover-${data.value?._id}`, 1, data.value?.expiration ?? 1),
});
</script>

<template>
  <div v-if="isFinished && !error" class="ad-placement-tool">
    <template v-if="data.type === 'popover'">
      <dialog ref="popover">
        <Media :current-ad="data" :mobile-breakpoint="mobileBreakpoint" />
        <button type="button" class="close" @click="hide" />
      </dialog>
    </template>
    <template v-else>
      <Media :current-ad="data" :mobile-breakpoint="mobileBreakpoint" />
    </template>
  </div>
</template>

<style lang="scss" scoped>
dialog:open {
  display: grid;
  grid-template-areas: 'stack';
  opacity: 1;
}

dialog {
  --popover-padding: var(--size-10);

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

  :where(a) {
    outline: none;
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
  dialog:open {
    opacity: 0;
  }
}

dialog::backdrop {
  background-color: transparent;
  transition:
    display 0.3s allow-discrete,
    overlay 0.3s allow-discrete,
    background-color 0.3s;
  backdrop-filter: blur(2px);
}

dialog:open::backdrop {
  background-color: rgb(0 0 0 / 75%);
}

@starting-style {
  dialog:open::backdrop {
    background-color: transparent;
  }
}

.ad-placement-tool {
  :where(img, video) {
    opacity: 1;
  }

  :where(a[target='_blank']):after {
    background: none;
  }

  .close {
    position: absolute;
    right: calc(var(--popover-padding) * -1);
    top: calc(var(--popover-padding) * -1);
    width: 24px;
    height: 24px;
    margin: 0;
    padding: 0;
    background: white;
    border: none;
    border-end-start-radius: 8px;
  }
  .close:before,
  .close:after {
    position: absolute;
    left: 43%;
    top: 5px;
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
