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
    <template #default="{ setRef, show, hide }">
      <button :ref="setRef" type="button" @click.stop="show" @focus="show" @blur="hide">
        <IconMenu style="display: block; height: 20px;" />
      </button>
    </template>
    <template #content>
      <ul class="is-dropdown-menu">
        <li
          v-for="item in data"
          :key="item.championshipId"
          class="is-dropdown-item"
          :class="{ 'is-selected': selected === item.phaseId }"
          @click="emit('change', item)"
        >
          {{ item.name }} - {{ item.phase }}
        </li>
      </ul>
    </template>
  </FloatingPanel>
</template>
