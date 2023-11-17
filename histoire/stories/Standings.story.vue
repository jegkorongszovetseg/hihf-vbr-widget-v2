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
});
</script>

<template>
  <Story title="Elements/Standings">
    <Variant title="Playground">
      <mjsz-vbr-standings
        :locale="state.locale"
        :championship-id="state.championshipId"
        :division="state.division"
        :type="state.type"
        :hide-columns="state.hideColumns"
      />

      <template #controls>
        <HstSelect v-model="state.locale" title="Locale" :options="{ hu: 'HU', en: 'EN' }" />
        <HstText v-model="state.championshipId" title="championshipId" />
        <HstText v-model="state.division" title="division" />
        <HstSelect v-model="state.type" title="Type" :options="{ '2': '2 pontos', '3': '3 pontos' }" />
        <HstCheckboxList
          v-model="state.hideColumns"
          title="hideColumns"
          :options="[
            {
              label: 'GF',
              value: 'gf',
            },
            {
              label: 'GA',
              value: 'ga',
            },
            {
              label: 'GD',
              value: 'gd',
            },
          ]"
        />
      </template>
    </Variant>

    <Variant title="Linked">
      <mjsz-vbr-standings
        :locale="state.locale"
        :championship-id="state.championshipId"
        :division="state.division"
        is-team-linked
      />

      <template #controls>
        <HstSelect v-model="state.locale" title="Locale" :options="{ hu: 'HU', en: 'EN' }" />
      </template>
    </Variant>
  </Story>
</template>

<docs lang="md">
## Változók

| prop               | Leírás                         |
| :----------------- | :----------------------------- |
| api-key            | Api kulcs                      |
| locale             | Nyelv                          |
| championship-id    | Bajnokság azonosító            |
| division           | Bajnokság szakasz              |
| hide-columns       | Oszlopok elrejtése             |
| limit              | Sorok száma                    |
| teamFilterByName   | Szűrés csapat névre            |
| externalPlayerLink | Játékos külső hivatkozása      |
| isPlayerLinked     | Játékos külső hivatkozás aktív |
| externalTeamLink   | Csapat külső hivatkozása       |
| isTeamLinked       | Csapat külső hivatkozás aktív  |

[VBR API Elements](https://api.icehockey.hu/widgets/docs/v2/widget/fieldplayers-leader.html)
</docs>
