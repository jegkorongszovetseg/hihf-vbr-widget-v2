# Csapat oldal Liga honlapra

## Használat

```html
<mjsz-vbr-teams-liga locale="hu" team-id="21908" championship-id="3450" />
```

A `team-id` és a `championship-id` változókat megadhatjuk az url-ben is search paraméterként is.
url-search-params

```http
https://www.ersteliga.hu/stats/team?teamId=21908&championshipId=3450
```

<!--@include: ./parts/url-search-params.md-->

## Példa

<ClientOnly>
  <mjsz-vbr-team-liga
    locale="hu"
    team-id="21908"
    championship-id="3450"
  />
</ClientOnly>

## Változók

| prop                     | Default     | Leírás                      | Megjegyzés       |
| :----------------------- | :---------- | :-------------------------- | :--------------- |
| api-key                  | null        | Api kulcs                   |                  |
| locale                   | hu          | Nyelv                       | Elérhető nyelvek |
| team-id                  | kötelező    | Csapat azonosító            |                  |
| championship-id          | kötelező    | Bajnokság azonosító         |                  |
| external-game-resolver   | honlap      | Mérkőzés külső hivatkozása  |                  |
| external-player-resolver | liga honlap | A játékos külső hivatkozása |                  |
