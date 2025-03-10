# Top Lista Liga honlapra

Liga honlap főoldali top lista megjelenítése

## Használat

```html
<mjsz-vbr-top-list-liga locale="hu" :championship-id="3783" />
```

## Példa

<ClientOnly>
  <mjsz-vbr-top-list-liga
    locale="hu"
    championship-id="3783"
  />
</ClientOnly>

## Változók

| prop                        | Default  | Leírás                        | Megjegyzés       |
| :-------------------------- | :------- | :---------------------------- | :--------------- |
| api-key                     | null     | Api kulcs                     |                  |
| locale                      | hu       | Nyelv                         | Elérhető nyelvek |
| championship-id             | kötelező | Bajnokság neve                |                  |
| limit                       | 3        | Top lista hossza              |                  |
| external-team-resolver      | liga     | Csapat külső hivatkozása      |                  |
| external-player-resolver    | liga     | A játékos külső hivatkozása   |                  |
| external-statistic-resolver | liga     | A stisztika külső hivatkozása |                  |
