import { computed, unref } from 'vue';
import { descend, ascend, prop, sortWith, clone } from 'ramda';

export const TOGGLE_LIVE = 'live';
export const TOGGLE_DEFAULT = 'default';

export const FETCH_GAMES_INTERVAL = 1000 * 60 * 2;

export const COLUMNS_LIVE_STANDINGS_P_3 = {
  index: {
    label: 'table.blank',
    class: 'is-text-left',
  },
  teamLogo: {
    label: '',
    class: 'is-has-image',
  },
  teamName: {
    label: 'table.team.short',
    tooltip: 'table.team.tooltip',
    class: 'is-text-left is-w-auto is-text-bold is-horizontal-content',
  },
  score: {
    label: 'table.score.short',
    tooltip: 'table.score.tooltip',
  },
  gamesPlayed: {
    label: 'table.game.short',
    tooltip: 'table.game.tooltip',
  },
  w: {
    label: 'table.wins.short',
    tooltip: 'table.wins.tooltip',
  },
  otw: {
    label: 'table.otw.short',
    tooltip: 'table.otw.tooltip',
  },
  sow: {
    label: 'table.sow.short',
    tooltip: 'table.sow.tooltip',
  },
  sol: {
    label: 'table.sol.short',
    tooltip: 'table.sol.tooltip',
  },
  otl: {
    label: 'table.otl.short',
    tooltip: 'table.otl.tooltip',
  },
  l: {
    label: 'table.losses.short',
    tooltip: 'table.losses.tooltip',
  },
  gf: {
    label: 'table.goalFor.short',
    tooltip: 'table.goalFor.tooltip',
  },
  ga: {
    label: 'table.goalAgainst.short',
    tooltip: 'table.goalAgainst.tooltip',
  },
  gd: {
    label: 'table.goalDiff.short',
    tooltip: 'table.goalDiff.tooltip',
  },
  points: {
    label: 'table.points.short',
    tooltip: 'table.points.tooltip',
    class: 'is-text-bold',
  },
};

export function useGamesListForLiveStandings(standings = [], games = []) {
  const liveGames = computed(() => (unref(games) || []).filter((game) => game.gameStatus === 1) || []);

  const isLiveStandingsActive = computed(() => liveGames.value.length > 0);

  const standingsWithScores = computed(() => setLivedGames(unref(standings) || [], liveGames.value));

  const standingsWithDiff = computed(() => positionDifference(unref(standings) || [], standingsWithScores.value));

  return {
    isActive: isLiveStandingsActive,
    rows: standingsWithDiff,
  };
}

function setLivedGames(standings = [], games = []) {
  const convertedTable = clone(standings).map((team) => {
    const activeGame = games.find((game) => game.homeTeam.id === team.team.id || game.awayTeam.id === team.team.id);
    team.isActiveGame = Boolean(activeGame);

    if (activeGame) {
      const isHomeTeam = team.team.id === activeGame.homeTeam.id;
      const score = isHomeTeam
        ? [activeGame.homeTeamScore, activeGame.awayTeamScore]
        : [activeGame.awayTeamScore, activeGame.homeTeamScore];

      team.score = score.join(':');
      team.scoreType = setScoreType(score);
      team.points = team.points + additionalPoints(score, activeGame);
      team.gf = team.gf + score[0];
      team.ga = team.ga + score[1];
      team.gd = team.gf - team.ga;
      team.gamesPlayed = team.gamesPlayed + 1;
      team.rowClasses = 'is-highlighted';
    }
    return team;
  });
  return convertedTable;
}

function additionalPoints(score, game) {
  const hasExtraPeriod = game.isOvertime || game.isShootout;
  if (score[0] > score[1]) return hasExtraPeriod ? 2 : 3;
  if (score[0] < score[1]) return hasExtraPeriod ? 1 : 0;
  return 1;
}

function positionDifference(originalStandings, convertedTable) {
  const sortedTable = sortWith([
    descend(prop('points')),
    ascend(prop('gamesPlayed')),
    descend(prop('w')),
    descend(prop('gd')),
    descend(prop('gf')),
  ])(convertedTable);

  return sortedTable.map((team) => {
    const originalIndex = originalStandings.findIndex((row) => team.team.id === row.team.id);
    const newIndex = sortedTable.findIndex((row) => team.team.id === row.team.id);
    team.diff = originalIndex - newIndex;
    return team;
  });
}

function setScoreType(score) {
  if (score[0] > score[1]) return 'W';
  if (score[0] < score[1]) return 'L';
  return 'D';
}
