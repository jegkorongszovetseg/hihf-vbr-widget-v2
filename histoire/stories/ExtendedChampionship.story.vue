<script setup>
import { reactive } from 'vue';

const state = reactive({
  locale: 'hu',
  championshipName: 'Erste Liga',
  limit: 10,
});
</script>

<template>
  <Story title="Extended/Championship">
    <Variant title="Playground">
      <mjsz-vbr-championship
        :locale="state.locale"
        :championship-name="state.championshipName"
        :limit="state.limit"
      />

      <template #controls>
        <HstSelect v-model="state.locale" title="Locale" :options="{ hu: 'HU', en: 'EN' }" />
        <HstText v-model="state.championshipName" title="championshipName" />
        <HstText v-model="state.limit" title="limit" />
      </template>
    </Variant>
  </Story>
</template>

<docs lang="md">
## Dokumentáció:

[VBR API Elements](https://api.icehockey.hu/widgets/docs/v2/widget/extended-championship.html)
</docs>
