# Csapatok Liga honlapra

## Használat

```html
<mjsz-vbr-teams-liga locale="hu" championship-name="Erste Liga" />
```

## Példa

<ClientOnly>
  <mjsz-vbr-teams-liga
    locale="hu"
    championship-name="Erste Liga"
  />
</ClientOnly>

## Változók

| prop                   | Default  | Leírás                   | Megjegyzés       |
| :--------------------- | :------- | :----------------------- | :--------------- |
| api-key                | null     | Api kulcs                |                  |
| locale                 | hu       | Nyelv                    | Elérhető nyelvek |
| championship-name      | kötelező | Bajnokság neve           |                  |
| external-team-resolver |          | Csapat külső hivatkozása |                  |
