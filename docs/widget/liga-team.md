---
outline: false
---

# Csapatok Liga honlapra

## Használat

```html
<mjsz-vbr-teams-liga locale="hu" team-id="21908" championship-id="3450" />
```

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
