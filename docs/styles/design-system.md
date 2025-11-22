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
  --mvw-color-primary-0: #ffffff;
  --mvw-color-primary-50: #eceff1;
  --mvw-color-primary-100: #cfd8dc;
  --mvw-color-primary-200: #b0bec5;
  --mvw-color-primary-300: #90a4ae;
  --mvw-color-primary-400: #78909c;
  --mvw-color-primary-500: #607d8b;
  --mvw-color-primary-600: #546e7a;
  --mvw-color-primary-700: #455a64;
  --mvw-color-primary-800: #37474f;
  --mvw-color-primary-900: #263238;
  --mvw-color-primary-950: #182024;

  /* Secondary colors */
  --mvw-color-secondary-100: #dcedc8;
  --mvw-color-secondary-200: #badb94;
  --mvw-color-secondary-300: #aed581;
  --mvw-color-secondary-400: #9ccc65;
  --mvw-color-secondary-500: #8bc34a;
  --mvw-color-secondary-700: #689f38;
  --mvw-color-secondary-800: #558b2f;
  --mvw-color-secondary-900: #33691e;
  --mvw-color-secondary-950: #14290c;

  /* Special Colors */
  --mvw-color-live: #8bc34a;
  --mvw-color-error: #fb2c36;
  --mvw-color-warning: #ffc107;
  --mvw-color-info: #2870ed;
  --mvw-color-team: #ff6129;
}
```
