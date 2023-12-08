# Játékos oldal Liga honlapra

## Használat

```html
<mjsz-vbr-player-liga locale="hu" player-id="21152" championship-id="3450" />
```

## Példa

<ClientOnly>
  <mjsz-vbr-player-liga
    locale="hu"
    championship-name="Erste Liga"
    player-id="21152"
    championship-id="3450"
  />
</ClientOnly>

## Változók

| prop                   | Default     | Leírás                     | Megjegyzés       |
| :--------------------- | :---------- | :------------------------- | :--------------- |
| api-key                | null        | Api kulcs                  |                  |
| locale                 | hu          | Nyelv                      | Elérhető nyelvek |
| player-id              | kötelező    | Játékos azonosító          |                  |
| championship-id        | kötelező    | Bajnokság azonosító        |                  |
| external-game-resolver | honlap      | Mérkőzés külső hivatkozása |                  |
| external-team-resolver | liga honlap | A Csapat külső hivatkozása |                  |
