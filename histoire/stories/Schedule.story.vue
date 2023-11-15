<script setup>
import { reactive } from 'vue';

const state = reactive({
  locale: 'hu',
  championshipId: 3450,
  division: 'Alapszakasz',
  limit: 10,
  filter: '',
  type: '3',
  hideColumns: '',
  initialPage: 2,
  timezoneSelector: false,
});
</script>

<template>
  <Story title="Elements/Menetrend">
    <Variant title="Playground">
      <mjsz-vbr-schedule
        :locale="state.locale"
        :championship-id="state.championshipId"
        :division="state.division"
        :limit="state.limit"
        :hide-columns="state.hideColumns"
        :initial-page="state.initialusePage"
        v-bind="{ ...(state.timezoneSelector && { timezoneSelector: true}) } "
        />

      <template #controls>
        <HstSelect v-model="state.locale" title="Locale" :options="{ hu: 'HU', en: 'EN' }" />
        <HstText v-model="state.championshipId" title="championshipId" />
        <HstText v-model="state.division" title="division" />
        <HstText v-model="state.limit" title="limit" />
        <HstCheckbox v-model="state.timezoneSelector" title="timezoneSelector" />
        <HstText v-model="state.initialPage" title="initialPage" />
        <HstCheckboxList
          v-model="state.hideColumns"
          title="hideColumns"
          :options="[
            {
              label: 'TV',
              value: 'broadcast',
            },
            {
              label: 'More',
              value: 'more',
            },
          ]"
        />
      </template>
    </Variant>

    <!-- <Variant title="Linked">
      <mjsz-vbr-schedule :locale="state.locale" :championship-id="state.championshipId" :division="state.division" />

      <template #controls>
        <HstSelect v-model="state.locale" title="Locale" :options="{ hu: 'HU', en: 'EN' }" />
      </template>
    </Variant> -->
  </Story>
</template>

<docs lang="md">

[VBR API Elements](https://api.icehockey.hu/widgets/docs/v2/widget/fieldplayers-leader.html)
</docs>
