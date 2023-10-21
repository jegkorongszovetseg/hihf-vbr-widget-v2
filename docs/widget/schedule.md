# Menetrend

Csapatok mérkőzései a bajnokságban

## Használat

```html
<mjsz-vbr-schedule locale="hu" championship-id="3450" division="Alapszakasz" timezone-selector />
```

## Példa

<ClientOnly>
  <mjsz-vbr-schedule
    locale="hu"
    championship-id="3450"
    division="Alapszakasz"
    timezone-selector
    auto-initial-page
    auto-refresh
  />
</ClientOnly>

## Változók

| prop                | Default  | Leírás                            | Megjegyzés                       |
| :------------------ | :------- | :-------------------------------- | :------------------------------- |
| api-key             | null     | Api kulcs                         |
| locale              | hu       | Nyelv                             | Elérhető nyelvek                 |
| championship-id     | kötelező | Bajnokság azonosító               |
| division            | kötelező | Bajnokság szakasz                 |
| limit               | 20       | Mérkőzések oldalanként            |
| hide-columns        |          | Oszlopok elrejtése                | pl.: `hide-columns="tv"`         |
| team-filter-by-name |          | Csak egy csapat mérkőzései        | pl.: `team-filter-by-name="UTE"` |
| initial-page        | page > 0 | Kezdő oldal                       |                                  |
| auto-initial-page   | false    | Az utolsó mérkőzés oldala         |                                  |
| auto-refresh        | false    | Eredmények automatikus frissítése | 5 percenként                     |
| external-game-link  | vbr      | A mérkőzés hivatkozása            |                                  |

## Oszlop elnevezések

| Oszlop név     | Leírás |
| -------------- | ------ |
| name           |
| gameDateDate   |
| gameDateTime   |
| homeTeamName   |
| homeTeamLogo   |
| gameResult     |
| gameResultType |
| awayTeamLogo   |
| awayTeamName   |
| location       |
| broadcast      |
| more           |
