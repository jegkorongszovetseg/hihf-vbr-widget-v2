# Tabella

Egy adott bajnokság állását mutatja meg.

## Használat

```html
<mjsz-vbr-standings locale="hu" championship-id="3450" phase-id="45196" />
```

<!--@include: ./parts/phase.md-->

## Példa

<ClientOnly>
  <mjsz-vbr-standings
    locale="hu"
    championship-id="3450"
    phase-id="45196"
  />
</ClientOnly>

## Változók

<!--@include: ./parts/props-base.md-->

<!--@include: ./parts/props-team.md-->

### Elem specifikus változó:

| prop | Default | Leírás                  | Megjegyzés        |
| :--- | :------ | :---------------------- | :---------------- |
| type | 3       | Pont számítási rendszer | Lehetséges: 3 / 2 |

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
