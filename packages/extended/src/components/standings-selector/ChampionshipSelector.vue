<script setup>
import { FloatingPanel } from '@mjsz-vbr-elements/core/components';
import IconMenu from '@mjsz-vbr-elements/shared/icons/IconMenu';

defineOptions({
  inheritAttrs: false,
});

defineProps({
  data: {
    type: Array,
    default: () => [],
  },

  selected: {
    type: [String, Number],
    default: '',
  },

  target: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(['change']);
</script>

<template>
  <FloatingPanel :offset="2" placement="bottom-end" theme="content" :append-to="target" :is-arrow-visible="false">
    <template #default="{ setRef, toggle }">
      <button :ref="setRef" type="button" @click="toggle">
        <IconMenu style="display: block; height: 20px;" />
      </button>
    </template>
    <template #content="{ close }">
      <ul class="list">
        <li
          v-for="item in data"
          :key="item.championshipId"
        >
          <button
            :class="{ 'is-selected': selected === item.phaseId }"
            :aria-selected="selected === item.phaseId"
            type="button"
            @click="emit('change', { item, close: close($event) })"
          >
            <div class="text">
              {{ item.name }} - {{ item.phase }}
            </div>
          </button>
        </li>
      </ul>
    </template>
  </FloatingPanel>
</template>
