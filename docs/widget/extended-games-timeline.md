---
outline: false
---

# Mérkőzések megjenítése idővonal szerűen

Az idővonal mérkőzéseit 5 percenként kérdezzük le. Ha egy mérkőzés elkezdődik, akkor az a mérkőzés percenként frissül addig amíg véget nem ér.

## Használat

```html
<mjsz-vbr-games-timeline
  locale="hu"
  service-path="/v2/championship-calendar?championshipId=3898"
  external-game-resolver="/widget/gamecenter-timeline.html?gameid={gameId}"
  external-schedule-url="/widget/extended-calendar.html"
/>
```

## Példa

<ClientOnly>
  <mjsz-vbr-games-timeline locale="hu" service-path="/v2/championship-calendar?championshipId=3898" external-game-resolver="/widget/gamecenter-timeline.html?gameid={gameId}" external-schedule-url="/widget/extended-calendar.html" />
</ClientOnly>

## Változók

| prop                   | Default                          | Leírás                     | Megjegyzés       |
| :--------------------- | :------------------------------- | :------------------------- | :--------------- |
| api-key                | null                             | Api kulcs                  |                  |
| locale                 | hu                               | Nyelv                      | Elérhető nyelvek |
| service-path           | /v2/public-calendar?seasonId=217 | Service                    |                  |
| external-game-resolver | honlap                           | Mérkőzés külső hivatkozása |                  |
| external-schedule-url  |                                  | Versenynaptár url          |                  |
