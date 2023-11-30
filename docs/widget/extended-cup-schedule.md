---
outline: false
---

# Kupa típusú menetrend

## Használat

```html
<mjsz-vbr-schedule-cup locale="hu" championship-name="Mini Bajnokság" />
```

## Példa

<ClientOnly>
  <mjsz-vbr-schedule-cup locale="hu" championship-name="Mini Bajnokság" />
</ClientOnly>

## Változók

| prop              | Default | Leírás         | Megjegyzés       |
| :---------------- | :------ | :------------- | :--------------- |
| api-key           | null    | Api kulcs      |                  |
| locale            | hu      | Nyelv          | Elérhető nyelvek |
| championship-name |         | Bajnokság Neve |                  |

## Oszlop elnevezések

<Columns name="COLUMNS_SCHEDULE" :remove="['more', 'awayTeamName', 'awayTeamLogo', 'homeTeamLogo', 'gameResult', 'broadcast']" />
