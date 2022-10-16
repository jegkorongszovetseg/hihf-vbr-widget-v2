# Tabella

## Használat
``` html
<mjsz-vbr-standings
  api-key="dd8adf5fdb738b3741fa579b5ede5ce69b681f62"
  lang="hu" 
  championship-id="2051"
  division="Alapszakasz"
/>
```
## Példa

<Widget
  name="Standings"
  lang="hu"
  championship-id="2051"
  division="Alapszakasz" 
/>

## Változók

| prop            | Default          | Leírás              |
| --------------- | ---------------- | ------------------- |
| api-key         | kötelező         | Api kulcs           |
| lang            | hu               | `hu | en` Nyelv     |
| championship-id | kötelező         | Bajnokság azonosító |
| division        | kötelező         | Bajnokság szakasz   |
| type            | 3 `3 | 2`        | Pont számítási rendszer   |
