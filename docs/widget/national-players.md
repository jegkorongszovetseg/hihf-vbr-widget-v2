# Válogatott játékosok

Válogatott játékosok legfőbb statisztikái.

## Használat

```html
<mjsz-vbr-players-national locale="hu" gender="male" />
```

## Példa

<ClientOnly>
  <mjsz-vbr-players-national
    locale="hu"
    gender="male"
  />
</ClientOnly>

## Változók

| prop    | Default  | Leírás                         | Megjegyzés       |
| :------ | :------- | :----------------------------- | :--------------- |
| api-key | null     | Api kulcs                      |
| locale  | hu       | Nyelv                          | Elérhető nyelvek |
| gender  | kötelező | Férfi/női válogatott játékosok |
| limit   | 50       | Adatok oldalanként             |

## Oszlop elnevezések

<Columns name="COLUMNS_PLAYERS_NATIONAL" />
