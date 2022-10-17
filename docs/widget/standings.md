# Tabella

## Használat

```html
<mjsz-vbr-standings
  locale="hu"
  championship-id="2051"
  division="Alapszakasz"
/>
```

## Példa

<ClientOnly>
  <mjsz-vbr-standings
    locale="hu"
    championship-id="2051"
    division="Alapszakasz" 
  />
</ClientOnly>

## Változók

| prop            | Default  | Leírás                  | Megjegyzés        |
| :-------------- | :------- | :---------------------- | :---------------- |
| api-key         | null     | Api kulcs               |
| lang            | hu       | Nyelv                   | Elérhető nyelvek  |
| championship-id | kötelező | Bajnokság azonosító     |
| division        | kötelező | Bajnokság szakasz       |
| type            | 3        | Pont számítási rendszer | Lehetséges: 3 / 2 |

## Oszlopok
