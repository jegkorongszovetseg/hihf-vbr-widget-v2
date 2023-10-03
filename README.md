# MJSZ VBR Elements V2

A Magyar Jégkorong Szövetség versenybírósági rendszer adatainak megjelenítése / Data visualization for HIHF VBR system

## Részletes információ / Documentation:
[Dokumentáció](https://api.icehockey.hu/widgets/docs/v2/)

## Tervezett Csomag felosztás

1. Elements
  [x] Standings
  [x] Schedule
  [x] FieldPlayerLeader
  [x] FieldPlayerPenalties
  [x] GoaliesLeader
  [x] TeamAttendance
  [x] TeamFairplay
  [x] TeamPenaltyKilling
  [x] TeamPowerplay
  [x] TeamScoringEfficiency

2. Extended
  [ ] Season Calendar / Versenynaptár
  [ ] Public Calendar / Felső eredmények
  [ ] Championship / Teljes Bajnokság megjelenik
  [ ] Standings / Főoldali tabellák
  [ ] CupSchedule / Torna naptár

3. Liga
  [x] Statistics
  [x] LigaSchedule
  [x] Playoffs
  [ ] LigaTeams
  [ ] TeamGames
  [ ] TeamPlayersStats
  [ ] TeamPlayers
  [ ] LigaPlayers
  [ ] Player

4. GameCenter
  [x] Game

## Dev

```sh
pnpm run playground
```

## Build

```sh
pnpm run build
```

## Release

Verziószám növelése:

```sh
pnpm run release
```

NPM package publikálása:

```sh
pnpm run publish:release
```

Ha szükséges NPM login:

```sh
npm login
```
