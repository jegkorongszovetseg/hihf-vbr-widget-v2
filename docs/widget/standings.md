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

### 3 pontos

<Columns name="COLUMNS_STANDINGS_P_3" />

### 2 pontos

<Columns name="COLUMNS_STANDINGS_P_2" />
