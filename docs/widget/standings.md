# Tabella

Egy adott bajnokság állását mutatja meg.

## Használat

```html
<mjsz-vbr-standings locale="hu" championship-id="2051" division="Alapszakasz" />
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

| prop            | Default  | Leírás                  | Megjegyzés                        |
| :-------------- | :------- | :---------------------- | :-------------------------------- |
| api-key         | null     | Api kulcs               |
| locale          | hu       | Nyelv                   | Elérhető nyelvek                  |
| championship-id | kötelező | Bajnokság azonosító     |
| division        | kötelező | Bajnokság szakasz       |
| type            | 3        | Pont számítási rendszer | Lehetséges: 3 / 2                 |
| hide-columns    |          | Oszlopok elrejtése      | pl.: `hide-columns="teamLogo,gk"` |

## Oszlop elnevezések

| Oszlop név | Leírás |
| ---------- | ------ |
| index      |
| teamLogo   |
| teamName   |
| m          |
| p3         |
| p2         |
| p1         |
| p0         |
| plus       |
| minus      |
| gk         |
| p
