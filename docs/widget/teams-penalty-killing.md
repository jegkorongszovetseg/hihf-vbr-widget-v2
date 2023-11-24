# Csapat emberhátrányok

## Használat

```html
<mjsz-vbr-team-penalty-killing locale="hu" championship-id="3450" phase-id="45196" />
```
<!--@include: ./parts/phase.md-->

## Példa

<ClientOnly>
  <mjsz-vbr-team-penalty-killing
    locale="hu"
    championship-id="3450"
    phase-id="45196"
  />
</ClientOnly>

## Változók
<!--@include: ./parts/props-base.md-->
<!--@include: ./parts/props-team.md-->

| prop             | Default  | Leírás                        | Megjegyzés                        |
| :--------------- | :------- | :---------------------------- | :-------------------------------- |
| api-key          | null     | Api kulcs                     |
| locale           | hu       | Nyelv                         | Elérhető nyelvek                  |
| championship-id  | kötelező | Bajnokság azonosító           |
| division         | kötelező | Bajnokság szakasz             |
| hide-columns     |          | Oszlopok elrejtése            | pl.: `hide-columns="teamLogo,gk"` |
| limit            | 20       | Sorok száma                   |                                   |
| teamFilterByName |          | Szűrés csapat névre           |                                   |
| externalTeamLink |          | Csapat külső hivatkozása      |                                   |
| isTeamLinked     | false    | Csapat külső hivatkozás aktív |                                   |
