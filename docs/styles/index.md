# Theme (Téma) kezelés

## Változók

Az egyes widget elemek kinézetét css változókon keresztül lehet állítani. A teljes listát [itt](/styles/css-variables) találod.

## Saját Téma beállítása

Ha szt szeretnéd, hogy a beállítások minden elemre érvényes legyen akkor azt így lehet beállítani:

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

::: tip
Az elérhető widgetek (pl.: mjsz-vbr-standings, mjsz-vbr-schedule ) [itt](/widget/available-widgets) találod.
:::

## Light/Dark téma kezelése

A MJSZ widgetek támogatják a light és dark témát. Alapértelmezés szerint a widget automatikusan igazodik a böngésző vagy operációs rendszer beállításaihoz. Manuálisan is beállíthatod a témát osztály hozzáadásával:

Ha például a `html` elemhez hozzáadod a `dark` osztályt, akkor a widgetek sötét témában jelennek meg:

```html
<html class="dark">
  <body>
    <mjsz-vbr-standings />
  </body>
</html>
```

A `light` téma az alapértelmezett, azt külön nem szökséges beállítani. Ha sötét témát szeretnél használni, add hozzá a `dark` osztályt a `html` elemhez.
Ha saját megoldásod például a body-hez adja hozzá a `dark` osztályt akkor is működni fog a váltás.

A saját témádban a `light-dark()` CSS function segítségével tudod egyszerűen kezelni a világos és sötét témához tartozó értékeket. Például:

```css
* {
  --mvw-link-color: light-dark(var(--mvw-color-secondary-700), var(--mvw-color-secondary-400));
  --mvw-link-hover-color: light-dark(var(--mvw-color-secondary-900), var(--mvw-color-secondary-200));
}
```

## Példa Theme

Az Erste Liga oldalon ezt a téma beállítást használjuk:

<<< ../../playground/src/icehockey-liga.css{css}
