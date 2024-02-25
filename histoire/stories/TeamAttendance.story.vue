<script setup>
import { reactive } from 'vue';

const state = reactive({
  locale: 'hu',
  championshipId: 3450,
  phaseId: '45196',
  filter: '',
  hideColumns: '',
});
</script>

<template>
  <Story
    title="Elements/Team Attendance"
    :layout="{
      type: 'grid',
      width: '100%',
    }"
  >
    <Variant title="Playground">
      <mjsz-vbr-team-attendance
        :locale="state.locale"
        :championship-id="state.championshipId"
        :phase-id="state.phaseId"
        :hide-columns="state.hideColumns"
      />

      <template #controls>
        <HstSelect v-model="state.locale" title="Locale" :options="{ hu: 'HU', en: 'EN' }" />
        <HstText v-model="state.championshipId" title="championshipId" />
        <HstText v-model="state.phaseId" title="phaseId" />
        <HstCheckboxList
          v-model="state.hideColumns"
          title="hideColumns"
          :options="[
            {
              label: 'Logo',
              value: 'teamLogo',
            },
            // {
            //   label: 'GA',
            //   value: 'ga',
            // },
            // {
            //   label: 'GD',
            //   value: 'gd',
            // },
          ]"
        />
      </template>
    </Variant>

    <Variant title="Linked">
      <mjsz-vbr-team-attendance
        :locale="state.locale"
        :championship-id="state.championshipId"
        :phase-id="state.phaseId"
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

[VBR API Elements](https://api.icehockey.hu/widgets/docs/v2/widget/teams-attendance.html)
</docs>
