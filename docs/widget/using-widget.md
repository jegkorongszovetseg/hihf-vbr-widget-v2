# Widgetek használata

## Használat

A widgetek Vue3-ban készültek, ezért szükséges a Vue könyvtár importálása is:

```html
<script src="https://unpkg.com/vue@3"></script>
```

A `head` részbe illesztve az alábbi kódot, az oldaladon elérhetővé válnak a widgetek.

```html {2,5}
<script src="https://unpkg.com/vue@3"></script>
<script src="https://api.icehockey.hu/widgets/v2/mjsz-vbr-bundle.global.js"></script>

<script>
  MjszWidgetBundle.createConfig({ apiKey: 'xxxxx' });
</script>
```

## Használat html fájlokban

```html {10-11}
<meta charset="utf-8" />
<title>MJSZ VBR Official Widget Demo</title>
<script src="https://unpkg.com/vue@3"></script>
<script src="https://api.icehockey.hu/widgets/v2/mjsz-vbr-bundle.global.js"></script>
<script>
  MjszWidgetBundle.createConfig({ apiKey: 'xxxxx' });
</script>

<body>
  <mjsz-vbr-goalies-leader locale="hu" championship-id="2051" division="Alapszakasz"></mjsz-vbr-goalies-leader>
  <mjsz-vbr-field-players locale="hu" championship-id="2051" division="Alapszakasz"></mjsz-vbr-field-players>
</body>
```

## Összetevők használata

Lehetőség van az összes widget használatára, de szét is lehet választani az összetevőket:

| Típus    | Link                                                                                                                               | Globális változó           |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| Összes   | [https://api.icehockey.hu/widgets/v2/mjsz-vbr-bundle.global.js](https://api.icehockey.hu/widgets/v2/mjsz-vbr-bundle.global.js)     | MjszWidgetBundle           |
| Core     | [https://api.icehockey.hu/widgets/v2/mjsz-vbr-core.global.js](https://api.icehockey.hu/widgets/v2/mjsz-vbr-core.global.js)         | MjszWidgetCore             |
| Elements | [https://api.icehockey.hu/widgets/v2/mjsz-vbr-elements.global.js](https://api.icehockey.hu/widgets/v2/mjsz-vbr-elements.global.js) | MjszWidgetElements         |
| Extended | [https://api.icehockey.hu/widgets/v2/mjsz-vbr-extended.global.js](https://api.icehockey.hu/widgets/v2/mjsz-vbr-extended.global.js) | MjszWidgetExtendedElements |

::: info Global Build
A _global_ build nem UMD build hanem **_IIFE_** build. A globális változókon keresztül lehet elérni a fügvényeket.
:::

Ha nincs szükség az összes elemre (widget), lehetőség van csak a szükséges elemek használatára. Ebben az esetben több fájlt kell importálnuk:

```html {2-3}
<script src="https://unpkg.com/vue@3"></script>
<script src="https://api.icehockey.hu/widgets/v2/mjsz-vbr-core.global.js"></script>
<script src="https://api.icehockey.hu/widgets/v2/mjsz-vbr-elements.global.js"></script>

<script>
  MjszWidgetCore.createConfig({ modules: [MjszWidgetElements], apiKey: 'xxxxx' });
</script>
```

## Használat config beállítás nélkül

Ha csak egy widget használatára van szükségünk, nem szükséges globális konfig beállítása. Elég csak regisztrálni az elemeket:

```html
<script src="https://unpkg.com/vue@3"></script>
<script src="https://api.icehockey.hu/widgets/v2/mjsz-vbr-core.global.js"></script>
<script src="https://api.icehockey.hu/widgets/v2/mjsz-vbr-elements.global.js"></script>

<script>
  MjszWidgetElements.register(); // [!code focus]
</script>
```

Ebben az esetben pl. az `API kulcs` a megfelelő prop beállításával adható meg:

```html
<body>
  <mjsz-vbr-goalies-leader
    api-key="xxxxx"
    locale="hu"
    championship-id="2051"
    division="Alapszakasz"
  ></mjsz-vbr-goalies-leader>
</body>
```
