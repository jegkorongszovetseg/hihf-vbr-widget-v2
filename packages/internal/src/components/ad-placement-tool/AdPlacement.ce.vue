<script setup>
import { VBR_API_BASE_URL } from '@mjsz-vbr-elements/core/constants';
import { cookie, isNotEmpty } from '@mjsz-vbr-elements/core/utils';
import { useFetch, useStorage } from '@vueuse/core';
import { computed, useTemplateRef } from 'vue';
import { useImpression, usePopover, validateEndDateTime } from './internal';
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
const mediaRef = useTemplateRef('media');

const userId = useStorage('mjsz-ad', crypto.randomUUID());

const { isFinished, data, error } = useFetch(`${VBR_API_BASE_URL}/internal/ad-placement?areaid=${props.areaId}`, { timeout: 1000 }).get().json();

const { hide } = usePopover(popoverRef, computed(() => data.value?.closeTimeout ?? 30000), {
  check: () => cookie.checkCookie(`mjsz-popover-${data.value?._id}`),
  set: () => {
    onSendImpression();
    cookie.setCookie(`mjsz-popover-${data.value?._id}`, 1, data.value?.expiration ?? 1);
  },
});

useImpression(mediaRef, {
  fetch: onSendImpression,
});

const clickURL = computed(() => data.value?.link ? `${VBR_API_BASE_URL}/internal/click?adId=${data.value?._id}&areaId=${props.areaId}&userId=${userId.value}&url=${data.value.link}` : undefined);

function onSendImpression() {
  if (validateEndDateTime(data.value.end))
    return;
  const payload = {
    type: 'impression',
    adId: data.value?._id,
    areaId: props.areaId,
    userId: userId.value,
  };
  const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
  navigator.sendBeacon(`${VBR_API_BASE_URL}/internal/track`, blob);
}

function onClick() {
  if (validateEndDateTime(data.value.end))
    return;
  const payload = {
    type: 'click',
    adId: data.value?._id,
    areaId: props.areaId,
    userId: userId.value,
  };
  const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
  navigator.sendBeacon(`${VBR_API_BASE_URL}/internal/track`, blob);
}
</script>

<template>
  <div v-if="isFinished && !error && isNotEmpty(data)" class="ad-placement-tool">
    <template v-if="data.type === 'popover'">
      <dialog ref="popover">
        <div class="popover-content">
          <Media :current-ad="data" :mobile-breakpoint="mobileBreakpoint" :click-url="clickURL" @click="onClick" />
        </div>
        <button type="button" class="close" @click="hide" />
      </dialog>
    </template>
    <template v-else>
      <Media ref="media" :current-ad="data" :mobile-breakpoint="mobileBreakpoint" :click-url="clickURL" @click="onClick" />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.ad-placement-tool {
  dialog {
    position: relative;
    padding: 0;
    border-radius: var(--size-8);
    background-color: var(--mvw-color-white);
    scrollbar-gutter: stable;
    overscroll-behavior: contain;

    transition:
      opacity 0.3s,
      overlay 0.3s allow-discrete,
      display 0.3s allow-discrete;

    :where(a) {
      display: block;
      outline: none;
    }

    :where(img, video) {
      display: block;
      object-fit: cover;
    }
  }

  dialog::backdrop {
    overflow: hidden;
    overscroll-behavior: contain;
    transition:
      background-color 0.3s,
      display 0.3s allow-discrete;
    backdrop-filter: blur(2px);
    background-color: rgb(0 0 0 / 75%);
  }

  @starting-style {
    dialog:open,
    dialog[open] {
      opacity: 0;
    }

    dialog:open::backdrop,
    dialog[open]::backdrop {
      background-color: rgb(0 0 0 / 0%);
    }
  }

  dialog:not([open]) {
    opacity: 0;

    &::backdrop {
      background-color: rgb(0 0 0 / 0%);
    }
  }

  .popover-content {
    padding: var(--size-10);
  }

  :where(img, video) {
    opacity: 1;
  }

  :where(a) {
    display: inline-block;
  }

  :where(a[target='_blank']):after {
    content: none;
  }

  .close {
    position: absolute;
    right: 0;
    top: 0;
    width: 24px;
    height: 24px;
    margin: 0;
    padding: 0;
    background: white;
    border: none;
    border-radius: var(--size-8);
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
