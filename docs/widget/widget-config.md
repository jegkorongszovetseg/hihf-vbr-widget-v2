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

## apiKey

## gameResolver

## teamResolver

## playerResolver
