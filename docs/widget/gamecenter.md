# Game Center

## Használat

```html
<mjsz-vbr-game locale="hu" game-id="73022" />
```

A mérkőzés azonosítót `game-id` meg lehet adni az URL-ben is paraméterként:

```http
https://www.example.com/game?gameId=73020
```

<!--@include: ./parts/url-search-params.md-->

## Példa

<ClientOnly>
  <mjsz-vbr-game
    locale="hu"
    game-id="73022"
  />
</ClientOnly>
