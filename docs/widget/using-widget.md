# Widgetek használata

## Használat

A widgetek Vue3-ban készültek, ezért szükséges a Vue könyvtár importálása is:

```html
<script src="https://unpkg.com/vue@3"></script>
```

A `head` részbe illesztve az alábbi kódot, az oldaladon elérhetővé válnak a widgetek.

```html {2,6}
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
  });
</script>
```

## Használat html fájlokban

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
  <mjsz-vbr-goalies-leader locale="hu" championship-id="2051" division="Alapszakasz"></mjsz-vbr-goalies-leader>
  <mjsz-vbr-field-players locale="hu" championship-id="2051" division="Alapszakasz"></mjsz-vbr-field-players>
</body>
```

## Összetevők használata

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

## Használat config beállítás nélkül

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
    championship-id="2051"
    division="Alapszakasz"
  ></mjsz-vbr-goalies-leader>
</body>
```
