<script setup>
import { reactive } from 'vue';

const state = reactive({
  locale: 'hu',
  championshipId: 3450,
  phaseId: '45196',
  limit: 10,
  filter: '',
  isPlayerLinked: false,
  hideColumns: '',
});
</script>

<template>
  <Story
    title="Elements/Field Players Penalties"
    :layout="{
      type: 'grid',
      width: '100%',
    }"
  >
    <Variant title="Playground">
      <mjsz-vbr-players-penalties
        :locale="state.locale"
        :championship-id="state.championshipId"
        :phase-id="state.phaseId"
        :limit="state.limit"
        :team-filter-by-name="state.filter"
        :hide-columns="state.hideColumns"
      />

      <template #controls>
        <HstSelect v-model="state.locale" title="Locale" :options="{ hu: 'HU', en: 'EN' }" />
        <HstText v-model="state.championshipId" title="championshipId" />
        <HstText v-model="state.phaseId" title="phaseId" />
        <HstText v-model="state.limit" title="limit" />
        <HstText v-model="state.filter" title="teamFilterByName" />
        <HstCheckboxList
          v-model="state.hideColumns"
          title="hideColumns"
          :options="[
            {
              label: 'GP',
              value: 'gp',
            },
            {
              label: 'S',
              value: 'shots',
            },
            {
              label: 'S%',
              value: 'shootPercent',
            },
          ]"
        />
      </template>
    </Variant>

    <Variant title="Linked">
      <mjsz-vbr-players-leader
        :locale="state.locale"
        :championship-id="state.championshipId"
        :phase-id="state.phaseId"
        is-player-linked
        is-team-linked
      />

      <template #controls>
        <HstSelect v-model="state.locale" title="Locale" :options="{ hu: 'HU', en: 'EN' }" />
      </template>
    </Variant>
  </Story>
</template>

<docs lang="md">
## Dokumentáció:

[VBR API Elements](https://api.icehockey.hu/widgets/docs/v2/widget/fieldplayers-penalties.html)
</docs>
