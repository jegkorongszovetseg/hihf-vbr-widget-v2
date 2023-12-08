# Játékosok oldal Liga honlapra

## Használat

```html
<mjsz-vbr-players-liga locale="hu" championship-name="Erste Liga" />
```

## Példa

<ClientOnly>
  <mjsz-vbr-players-liga
    locale="hu"
    championship-name="Erste Liga"
  />
</ClientOnly>

## Változók

| prop                     | Default  | Leírás                      | Megjegyzés       |
| :----------------------- | :------- | :-------------------------- | :--------------- |
| api-key                  | null     | Api kulcs                   |                  |
| locale                   | hu       | Nyelv                       | Elérhető nyelvek |
| championship-name        | kötelező | Bajnokság neve              |                  |
| limit                    | 40       | Adatok oldalanként          |                  |
| external-team-resolver   |          | Csapat külső hivatkozása    |                  |
| external-player-resolver | vbr      | A játékos külső hivatkozása |                  |
