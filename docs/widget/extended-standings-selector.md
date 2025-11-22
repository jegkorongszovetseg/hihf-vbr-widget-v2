---
outline: false
---

# Tabella Választó

A Szövetség és a Liga főoldalán megjelenő Tabella és Rájátszás választó

## Használat

```js
const data = [
  {
    name: 'Erste Liga 2013-2014',
    phase: 'Rájátszás',
    path: '/',
    championshipId: 3450,
    isPlayoffs: true,
  }
];
```

```html
<mjsz-vbr-standings-selector locale="hu" :data="data" />
```

## Példa

<script setup>
const data = [
  {
    name: 'OB1',
    phase: 'Rájátszás',
    path: '/',
    championshipId: 3824,
    isPlayoffs: true,
  },
  {
    name: 'Erste Liga 2013-2014',
    phase: 'Rájátszás',
    path: '/',
    championshipId: 3450,
    isPlayoffs: true,
  },
  {
    name: 'Erste Liga',
    phase: 'Alapszakasz',
    championshipId: 3783,
    phaseId: 45658,
  },
  {
    name: 'Andersen Liga',
    phase: 'Alapszakasz',
    championshipId: 3770,
    phaseId: 45661,
  },
]
</script>

<ClientOnly>
  <mjsz-vbr-standings-selector locale="hu" :data="data" />
</ClientOnly>

## Adat struktúra

- `name`: A fejlécben megjelenő bajnokság neve
- `phase`: Az aktuális szakasz neve (pl. "Alapszakasz", "Rájátszás")
- `path`: (opcionális) Útvonal a bajnoksághoz
- `championshipId`: A bajnokság egyedi azonosítója
- `phaseId`: (opcionális) Az aktuális szakasz egyedi azonosítója
- `isPlayoffs`: (opcionális) Logikai érték, hogy rájátszásról van-e szó

```js
const data = [
  {
    name: 'Erste Liga 2013-2014',
    phase: 'Rájátszás',
    path: '/',
    championshipId: 3450,
    isPlayoffs: true,
  },
  {
    name: 'Erste Liga',
    phase: 'Alapszakasz',
    championshipId: 3783,
    phaseId: 45658,
  },
];
```
