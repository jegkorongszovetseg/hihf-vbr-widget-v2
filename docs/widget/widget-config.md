# Widgetek beállítása

Bundle használat esetén:

```html
<script>
  MjszWidgetBundle.createConfig({
    apiKey: 'xxxxx',
    gameResolver: '/game/',
    teamResolver: '/team/',
    playerResolver: '/player/',
  });
</script>
```

Modul használat esetén:

```html
<script>
  MjszWidgetCore.createConfig({
    modules: [module],
    apiKey: 'xxxxx',
    gameResolver: '/game/',
    teamResolver: '/team/',
    playerResolver: '/player/',
  });
</script>
```

## modules

- Type: `array`

## apiKey

- Type: `string`

Kulcs a VBR API-hoz való hozzáféréshez.

## gameResolver

- Type: `string | function`
- Default: `https://www.jegkorongszovetseg.hu/event/game/`

Az olyan megjelenítéseknél ahol egy mérkőzés eredményére kattintva az adott mérkőzés adatlapjára jutunk, be tudunk állítani saját hivatkozást is. A mérkőzés azonosító mindig a karakterlánc végére kerül. Például, ha a link `/game/` akkor a végső link `/game/123456` lesz.

::: tip Tipp
Lehetőség van fügvény megadására is:

```js
{
  gameResolver: (id) => `/game/${id}`,
}
```

:::

## teamResolver

- Type: `string | function`
- Default: `https://www.jegkorongszovetseg.hu/event/game/`

## playerResolver

- Type: `string | function`
- Default: `https://www.jegkorongszovetseg.hu/event/game/`
