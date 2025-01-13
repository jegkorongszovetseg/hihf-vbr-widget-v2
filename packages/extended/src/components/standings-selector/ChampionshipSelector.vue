<script setup>
import { FloatingPanel } from '@mjsz-vbr-elements/core/components';
import IconMore from '@mjsz-vbr-elements/shared/icons/IconMore';
</script>

<template>
  <div>
    <FloatingPanel :offset="2" placement="bottom-end" theme="content">
      <template v-slot:default="{ setRef, show, hide }">
        <button type="button" :ref="setRef" @click.stop="show" @focus="show" @blur="hide">
          <IconMore style="width: 20px" />
        </button>
      </template>
      <template v-slot:content>
        <div>list of championships</div>
      </template>
    </FloatingPanel>
  </div>
</template>
