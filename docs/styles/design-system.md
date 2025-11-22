# Design System

Egyszerű téma állítási lehetőség a css változók segítségével

## Betűtípus

A `--mvw-font` témaváltozók segítségével testreszabhatod a betűtípus-családot a megjelenítésekben.

```css
* {
  --mvw-font: 'Roboto Condensed', Avenir, Helvetica, Arial, sans-serif;
}
```

## Színek

A színrendszer szemantikus elnevezéseket használ, például:

- `--mvw-color-primary-*`: elsődleges szín
- `--mvw-color-secondary-*`: másodlagos szín
- `--mvw-color-live`: siker visszajelzés színe
- `--mvw-color-warning`: figyelmeztetés színe
- `--mvw-color-error`: hiba visszajelzés színe
- `--mvw-color-info`: információ visszajelzés színe
- `--mvw-color-team`: egyedi csapat színe

Ezeket a CSS változókat a témákban különböző értékekkel lehet felülírni, így a felület színei könnyen módosíthatók anélkül, hogy a komponensek kódját át kellene írni.

Alapértelmezett színek:

```css
:host {
  --mvw-color-white: #fff;
  --mvw-color-black: #000;

  /* Primary colors */
  --mvw-primary-color-0: #ffffff;
  --mvw-primary-color-50: #eceff1;
  --mvw-primary-color-100: #cfd8dc;
  --mvw-primary-color-200: #b0bec5;
  --mvw-primary-color-300: #90a4ae;
  --mvw-primary-color-400: #78909c;
  --mvw-primary-color-500: #607d8b;
  --mvw-primary-color-600: #546e7a;
  --mvw-primary-color-700: #455a64;
  --mvw-primary-color-800: #37474f;
  --mvw-primary-color-900: #263238;
  --mvw-primary-color-950: #182024;

  /* Secondary colors */
  --mvw-secondary-color-100: #dcedc8;
  --mvw-secondary-color-200: #badb94;
  --mvw-secondary-color-300: #aed581;
  --mvw-secondary-color-400: #9ccc65;
  --mvw-secondary-color-500: #8bc34a;
  --mvw-secondary-color-700: #689f38;
  --mvw-secondary-color-800: #558b2f;
  --mvw-secondary-color-900: #33691e;
  --mvw-secondary-color-950: #14290c;

  /* Special Colors */
  --mvw-live: #8bc34a;
  --mvw-error: #fb2c36;
  --mvw-warning: #ffc107;
  --mvw-info: #2870ed;
  --mvw-team: #ff6129;
}
```
