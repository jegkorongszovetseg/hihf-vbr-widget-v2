<script setup>
import { reactive } from 'vue';

const state = reactive({
  locale: 'hu',
  championshipName: 'Mini Bajnokság',
});
</script>

<template>
  <Story
    title="Extended/ScheduleCup"
    :layout="{
      type: 'grid',
      width: '100%',
    }"
  >
    <Variant title="Playground">
      <mjsz-vbr-schedule-cup :locale="state.locale" :championship-name="state.championshipName" />

      <template #controls>
        <HstSelect v-model="state.locale" title="Locale" :options="{ hu: 'HU', en: 'EN' }" />
        <HstText v-model="state.championshipName" title="championshipName" />
      </template>
    </Variant>
  </Story>
</template>

<docs lang="md">
## Dokumentáció:

[VBR API Elements](https://api.icehockey.hu/widgets/docs/v2/widget/extended-cup-schedule.html)
</docs>
