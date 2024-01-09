# Widgetek használata

## Használat CDN-ről

A widgetek Vue3-ban készültek, ezért szükséges a Vue könyvtár importálása is:

```html
<script src="https://unpkg.com/vue@3"></script>
```

### Használat createConfig-al

A `head` részbe illesztve az alábbi kódot, az oldaladon elérhetővé válnak a widgetek.

```html {9-13}
<script src="https://unpkg.com/vue@3"></script>
<script src="https://unpkg.com/@mjsz-vbr-elements/core"></script>
<script src="https://unpkg.com/@mjsz-vbr-elements/elements"></script>
<script src="https://unpkg.com/@mjsz-vbr-elements/extended"></script>
<script src="https://unpkg.com/@mjsz-vbr-elements/liga"></script>
<script src="https://unpkg.com/@mjsz-vbr-elements/gamecenter"></script>

<script>
  MjszVbrElementsCore.createConfig({
    modules: [MjszVbrElements, MjszVbrElementsExtended, MjszVbrElementsLiga, MjszVbrElementsGamecenter],
    apiKey: 'xxxxx',
    ...
  });
</script>
```

### Elemek használata html fájlokban

```html {11-12}
<meta charset="utf-8" />
<title>MJSZ VBR Official Widget Demo</title>
<script src="https://unpkg.com/vue@3"></script>
<script src="https://unpkg.com/@mjsz-vbr-elements/core"></script>
<script src="https://unpkg.com/@mjsz-vbr-elements/elements"></script>
<script>
  MjszVbrElementsCore.createConfig({ modules: [MjszVbrElements], apiKey: 'xxxxx' });
</script>

<body>
  <mjsz-vbr-goalies-leader locale="hu" championship-id="3450" phase-id="45196"></mjsz-vbr-goalies-leader>
  <mjsz-vbr-field-players locale="hu" championship-id="3450" phase-id="45196"></mjsz-vbr-field-players>
</body>
```

### Összetevők használata

Lehetőség van az összes widget használatára, de szét is lehet választani az összetevőket:

| Típus      | Link                                                                                               | Globális változó          |
| ---------- | -------------------------------------------------------------------------------------------------- | ------------------------- |
| Core       | [https://unpkg.com/@mjsz-vbr-elements/core](https://unpkg.com/@mjsz-vbr-elements/core)             | MjszVbrElementsCore       |
| Elements   | [https://unpkg.com/@mjsz-vbr-elements/elements](https://unpkg.com/@mjsz-vbr-elements/elements)     | MjszVbrElements           |
| Extended   | [https://unpkg.com/@mjsz-vbr-elements/extended](https://unpkg.com/@mjsz-vbr-elements/extended)     | MjszVbrElementsExtended   |
| Liga       | [https://unpkg.com/@mjsz-vbr-elements/liga](https://unpkg.com/@mjsz-vbr-elements/liga)             | MjszVbrElementsLiga       |
| GameCenter | [https://unpkg.com/@mjsz-vbr-elements/gamecenter](https://unpkg.com/@mjsz-vbr-elements/gamecenter) | MjszVbrElementsGamecenter |

::: info Global Build
A _global_ build nem UMD build hanem **_IIFE_** build. A globális változókon keresztül lehet elérni a fügvényeket.
:::

### Használat config beállítás nélkül

Ha csak egy widget használatára van szükségünk, nem szükséges globális konfig beállítása. Elég csak regisztrálni az elemeket:

```html
<script src="https://unpkg.com/vue@3"></script>
<script src="https://unpkg.com/@mjsz-vbr-elements/core"></script>
<script src="https://unpkg.com/@mjsz-vbr-elements/elements"></script>

<script>
  MjszVbrElements.register(); // [!code focus]
</script>
```

Ebben az esetben pl. az `API kulcs` a megfelelő prop beállításával adható meg:

```html {3}
<body>
  <mjsz-vbr-goalies-leader
    api-key="xxxxx"
    locale="hu"
    championship-id="3450"
    phase-id="45196"
  ></mjsz-vbr-goalies-leader>
</body>
```

## Használat Vue alkalmazásokban (Vue.js plugin)

Vue 3 alkalmázosákban szabványos pluginként is be lehet állítani az elemeket.

Telepítés:
::: code-group

```bash [npm]
npm install @mjsz-vbr-elements/core @mjsz-vbr-elements/elements
```

```bash [pnpm]
pnpm add @mjsz-vbr-elements/core @mjsz-vbr-elements/elements
```

:::

::: info
A további elérhető csomagokat [itt](#packages) találáod.
:::

```js
import { createApp } from 'vue';
import MjszVbrElementsCore from '@mjsz-vbr-elements/core';
import MjszVbrElements from '@mjsz-vbr-elements/elements';
import MjszVbrElementsExtended from '@mjsz-vbr-elements/extended';
import MjszVbrElementsLiga from '@mjsz-vbr-elements/liga';
import MjszVbrElementsGamecenter from '@mjsz-vbr-elements/gamecenter';
import App from './App.vue';
import './style.css';

const app = createApp(App);

app.use(MjszVbrElementsCore, {
  modules: [MjszVbrElements, MjszVbrElementsExtended, MjszVbrElementsLiga, MjszVbrElementsGamecenter],
  apiKey: import.meta.env.VITE_VBR_API_KEY,
});

app.mount('#app');
```

### Vite használata esetén

Ha **Vite build tool**-t használsz be kell állítani, hogy az elemek `customElement`-ként legyenek értelmezve.

```js
// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('mjsz-vbr-'),
        },
      },
    }),
  ],
});
```

## Használat Nuxt alkalmazásokban

A használathoz hozzá kell adni két alap csomagot (`@mjsz-vbr-elements/nuxt` `@mjsz-vbr-elements/core`) és a kivánt elemenket (`@mjsz-vbr-elements/elements`):

::: code-group

```bash [npm]
npm install @mjsz-vbr-elements/nuxt @mjsz-vbr-elements/core @mjsz-vbr-elements/elements
```

```bash [pnpm]
pnpm add @mjsz-vbr-elements/nuxt @mjsz-vbr-elements/core @mjsz-vbr-elements/elements
```

:::

::: info
A további elérhető csomagokat [itt](#packages) találod. Ha újabb csomagot szeretnél hozzáadni csak telepítened kell és máris elérhető lesz az alkalmazásban.
:::

```ts [nuxt.config.ts]
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@mjsz-vbr-elements/nuxt'],

  mjszVbrElements: {
    apiKey: process.env.NUXT_VBR_API_KEY,
  },
});
```

## Elérhető package-ek: {#packages}

| Típus      | Link                                                                                         |
| ---------- | -------------------------------------------------------------------------------------------- |
| Core       | [@mjsz-vbr-elements/core](https://www.npmjs.com/package/@mjsz-vbr-elements/core)             |
| Elements   | [@mjsz-vbr-elements/elements](https://www.npmjs.com/package/@mjsz-vbr-elements/elements)     |
| Extended   | [@mjsz-vbr-elements/extended](https://www.npmjs.com/package/@mjsz-vbr-elements/extended)     |
| Liga       | [@mjsz-vbr-elements/liga](https://www.npmjs.com/package/@mjsz-vbr-elements/liga)             |
| GameCenter | [@mjsz-vbr-elements/gamecenter](https://www.npmjs.com/package/@mjsz-vbr-elements/gamecenter) |
