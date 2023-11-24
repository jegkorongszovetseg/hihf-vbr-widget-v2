# Kapus statisztikák
Egy bajnokság vagy bajnokság fázis kapus statisztikái.

## Használat

```html
<mjsz-vbr-goalies locale="hu" championship-id="3450" phase-id="45196" />
```

<!--@include: ./parts/phase.md-->

## Példa

<ClientOnly>
  <mjsz-vbr-goalies
    locale="hu"
    championship-id="3450"
    phase-id="45196"
  />
</ClientOnly>

## Változók

<!--@include: ./parts/props-base.md-->
<!--@include: ./parts/props-players.md-->
<!--@include: ./parts/props-team.md-->

### Elem specifikus változók:

| prop        | Default | Leírás                   | Megjegyzés |
| :---------- | :------ | :----------------------- | :--------- |
| above-limit | false   | 40% jégidő feletti lista |            |
| under-limit | false   | 40% jégidő alatti lista  |            |

::: info
Ha nincs **above-limit** vagy **under-limit** beállítva, akkor teljes listát kapjuk meg.
:::
