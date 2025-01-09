---
outline: false
---

# Mérkőzések megjenítése idővonal szerűen

## Használat

```html
<mjsz-vbr-games-timeline locale="hu" service-path="/v2/championship-calendar?championshipId=3783" />
```

## Példa

<ClientOnly>
  <mjsz-vbr-games-timeline locale="hu" service-path="/v2/championship-calendar?championshipId=3783" />
</ClientOnly>

## Változók

| prop                   | Default                          | Leírás                     | Megjegyzés       |
| :--------------------- | :------------------------------- | :------------------------- | :--------------- |
| api-key                | null                             | Api kulcs                  |                  |
| locale                 | hu                               | Nyelv                      | Elérhető nyelvek |
| service-path           | /v2/public-calendar?seasonId=217 | Service                    |                  |
| external-game-resolver | honlap                           | Mérkőzés külső hivatkozása |                  |
| external-schedule-url  |                                  | Versenynaptár url          |                  |
