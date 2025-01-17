<script setup>
import { FloatingPanel } from '@mjsz-vbr-elements/core/components';
import IconMore from '@mjsz-vbr-elements/shared/icons/IconMore';

defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['change']);
</script>

<template>
  <div>
    <FloatingPanel :offset="2" placement="bottom-end" theme="content">
      <template #default="{ setRef, show, hide }">
        <button :ref="setRef" type="button" @click.stop="show" @focus="show" @blur="hide">
          <IconMore style="width: 20px" />
        </button>
      </template>
      <template #content>
        <ul>
          <li v-for="item in data" :key="item.championshipId" @click="emit('change', item)">
            {{ item.name }}
          </li>
        </ul>
      </template>
    </FloatingPanel>
  </div>
</template>
