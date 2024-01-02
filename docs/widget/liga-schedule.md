# Menetrend Liga honlapra

## Használat

```html
<mjsz-vbr-schedule-liga locale="hu" championship-name="Erste Liga" />
```

## Sticky header top offset beállítása

Előfordulhat, hogy az oldal tartalmaz különféle menüsávokat az oldal tetején. Hogy a választó ne csússzon a sáv alá lehetőség van a felső eltartások beállítására a különböző töréspontokon:

```css
mjsz-vbr-schedule-liga {
  --vbr-widget-sticky-top-offset: 50px;

  @media all and (min-width: 768px) {
    --vbr-widget-sticky-top-offset: 63px;
  }
}
```

## Példa

<ClientOnly>
  <mjsz-vbr-schedule-liga
    locale="hu"
    championship-name="Erste Liga"
  />
</ClientOnly>
