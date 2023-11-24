### Alap változók:

| prop            | Default  | Leírás                      | Megjegyzés                                                        |
| :-------------- | :------- | :-------------------------- | :---------------------------------------------------------------- |
| api-key         | null     | Api kulcs                   |
| locale          | hu       | Nyelv                       | Elérhető nyelvek                                                  |
| championship-id | kötelező | Bajnokság azonosító         |
| phase-id        |          | Bajnokság szakasz azonosító |
| division        |          | Bajnokság szakasz           | Nem ajánlott                                                      |
| hide-columns    |          | Oszlopok elrejtése          | pl.: `hide-columns="tv,gp"` [Elérhető oszlopok](#oszlop-elnevezesek) |

::: danger division
A **division** használata nem ajánlott! A következő verziók valamelyikében meg fog szűnni.
:::
