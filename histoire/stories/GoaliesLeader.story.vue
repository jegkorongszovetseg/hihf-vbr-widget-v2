<script setup>
import { reactive } from 'vue';

const state = reactive({
  locale: 'hu',
  championshipId: 3450,
  division: 'Alapszakasz',
  limit: 10,
  filter: '',
  isPlayerLinked: false,
  hideColumns: '',
});
</script>

<template>
  <Story title="Elements/Goalies Leader">
    <Variant title="Playground">
      <mjsz-vbr-goalies
        :locale="state.locale"
        :championship-id="state.championshipId"
        :division="state.division"
        :limit="state.limit"
        :team-filter-by-name="state.filter"
        :hide-columns="state.hideColumns"
      />

      <template #controls>
        <HstSelect v-model="state.locale" title="Locale" :options="{ hu: 'HU', en: 'EN' }" />
        <HstText v-model="state.championshipId" title="championshipId" />
        <HstText v-model="state.division" title="division" />
        <HstText v-model="state.limit" title="limit" />
        <HstText v-model="state.filter" title="teamFilterByName" />
        <HstCheckboxList
          v-model="state.hideColumns"
          title="hideColumns"
          :options="[
            {
              label: 'GP',
              value: 'gkd',
            },
            {
              label: 'S',
              value: 'shoots',
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
      <mjsz-vbr-goalies
        :locale="state.locale"
        :championship-id="state.championshipId"
        :division="state.division"
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
