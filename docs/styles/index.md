# Theme (Téma) kezelés

## Változók

Az egyes widget elemek kinézetét css változókon keresztül lehet állítani. A teljes listát [itt](/styles/css-variables) találod.

## Saját Téma beállítása

GlobáliasaHa szt szeretnéd, hogy a beállítások minden elemre érvényes legyen akkor azt így lehet beállítani:

```css
* {
  --mvw-table-header-font-size: 11px;
}
```

Részletes leírást a [Design System](/styles/design-system) és a [CSS Változók](/styles/css-variables) menüpontban találasz.

Ha nem minden elemre, hanem csak meghatározott elemekre szeretnél saját beállításokat, akkor elemek stílusát így lehet változtatni:

```css
mjsz-vbr-standings,
mjsz-vbr-schedule {
  --mvw-table-header-font-size: 11px;
}
```

## Light/Dark téma kezelése

A MJSZ widgetek támogatják a light és dark témát. Alapértelmezés szerint a widget automatikusan igazodik a böngésző vagy operációs rendszer beállításaihoz. Manuálisan is beállíthatod a témát CSS változóval vagy osztály hozzáadásával:

Ha például a `html` elemhez hozzáadod a `dark` osztályt, akkor a widgetek sötét témában jelennek meg:

```html
<html class="dark">
  <body>
    <mjsz-vbr-standings />
  </body>
</html>
```

## Példa Theme

Az Erste Liga oldalon ezt a téma beállítást használjuk:

<<< ../../playground/src/icehockey-liga.css{css}
