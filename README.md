# MJSZ VBR Elements V2

A Magyar Jégkorong Szövetség versenybírósági rendszer adatainak megjelenítése / Data visualization for HIHF VBR system

## Részletes információ / Documentation:

[Dokumentáció](https://api.icehockey.hu/widgets/docs/v2/)

## Tervezett Csomag felosztás

### Elements

- [x] Standings
- [x] Schedule
- [x] FieldPlayerLeader
- [x] FieldPlayerPenalties
- [x] GoaliesLeader
- [x] TeamAttendance
- [x] TeamFairplay
- [x] TeamPenaltyKilling
- [x] TeamPowerplay
- [x] TeamScoringEfficiency

### Extended

- [ ] Season Calendar / Versenynaptár
- [ ] Public Calendar / Felső eredmények
- [x] Championship / Teljes Bajnokság megjelenik
- [ ] Standings / Főoldali tabellák
- [x] CupSchedule / Torna naptár

### Liga

- [x] Statistics
- [x] LigaSchedule
- [x] Playoffs
- [x] LigaTeams
- [x] LigaTeam
- [x] LigaPlayers
- [x] LigaPlayer

### GameCenter

- [x] Game

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
