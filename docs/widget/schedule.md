# Menetrend

Csapatok mérkőzései a bajnokságban

## Használat

```html
<mjsz-vbr-schedule locale="hu" championship-id="3450" phase-id="45196" timezone-selector />
```

<!--@include: ./parts/phase.md-->

## Példa

<ClientOnly>
  <mjsz-vbr-schedule
    locale="hu"
    championship-id="3450"
    phase-id="45196"
    timezone-selector
    auto-initial-page
    auto-refresh
  />
</ClientOnly>

## Változók

<!--@include: ./parts/props-base.md-->

<!--@include: ./parts/props-games.md-->

### Elem specifikus változók:

| prop                | Default  | Leírás                            | Megjegyzés                       |
| :------------------ | :------- | :-------------------------------- | :------------------------------- |
| limit               | 20       | Mérkőzések oldalanként            |
| team-filter-by-name |          | Csak egy csapat mérkőzései        | pl.: `team-filter-by-name="UTE"` |
| timezone-selector   | false    | Időzóna váltási lehetőség         |                                  |
| initial-page        | page > 0 | Kezdő oldal                       |                                  |
| auto-initial-page   | false    | Az utolsó mérkőzés oldala         |                                  |
| auto-refresh        | false    | Eredmények automatikus frissítése | 5 percenként                     |

## Oszlop elnevezések

<Columns name="COLUMNS_SCHEDULE" />
