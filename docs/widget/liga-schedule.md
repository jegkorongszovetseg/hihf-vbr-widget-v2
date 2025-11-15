# Menetrend Liga honlapra

## Használat

```html
<mjsz-vbr-schedule-liga locale="hu" championship-name="Erste Liga" />
```

## Sticky header top offset beállítása

Előfordulhat, hogy az oldal tartalmaz különféle menüsávokat az oldal tetején. Hogy a választó ne csússzon a sáv alá lehetőség van a felső eltartások beállítására a különböző töréspontokon:

```css
mjsz-vbr-schedule-liga {
  --mvw-sticky-top-offset: 50px;

  @media all and (min-width: 768px) {
    --mvw-sticky-top-offset: 63px;
  }
}
```

## Változók

| prop                | Default  | Leírás                                | Megjegyzés       |
| :------------------ | :------- | :------------------------------------ | :--------------- |
| api-key             | null     | Api kulcs                             |
| locale              | hu       | Nyelv                                 | Elérhető nyelvek |
| championship-name   | kötelező | Bajnokság neve                        |                  |
| timezone-selector   | false    | Időzóna váltási lehetőség             |                  |
| auto-refresh        | false    | Eredmények automatikus frissítése     | 5 percenként     |
| scroll-to-game-date | true     | Ugrás a legközelebbi mérkőzés dátumra |                  |

<!--@include: ./parts/props-games.md-->

## Példa

<ClientOnly>
  <mjsz-vbr-schedule-liga
    locale="hu"
    championship-name="Erste Liga"
    :scroll-to-game-date="false"
  />
</ClientOnly>
