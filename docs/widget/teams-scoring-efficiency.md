# Csapat hatékonyság

## Példa

<ClientOnly>
  <mjsz-vbr-team-scoring
    locale="hu"
    championship-id="3314"
    division="Alapszakasz" 
  />
</ClientOnly>

## Változók

| prop               | Default  | Leírás                         | Megjegyzés                        |
| :----------------- | :------- | :----------------------------- | :-------------------------------- |
| api-key            | null     | Api kulcs                      |
| locale             | hu       | Nyelv                          | Elérhető nyelvek                  |
| championship-id    | kötelező | Bajnokság azonosító            |
| division           | kötelező | Bajnokság szakasz              |
| hide-columns       |          | Oszlopok elrejtése             | pl.: `hide-columns="teamLogo,gk"` |
| limit              | 20       | Sorok száma                    |                                   |
| teamFilterByName   |          | Szűrés csapat névre            |                                   |
| externalTeamLink   |          | Csapat külső hivatkozása       |                                   |
| isTeamLinked       | false    | Csapat külső hivatkozás aktív  |                                   |
