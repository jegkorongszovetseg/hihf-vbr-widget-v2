import { computed, unref } from 'vue';
import { descend, prop, sortWith } from 'ramda';

export const mockGames = [
  {
    gameId: 72991,
    gameName: 'EL 1',
    gameDate: '2023-09-29T17:30:00.000+02:00',
    homeTeam: {
      id: 21916,
      longName: 'Sport Club Csíkszereda',
      shortName: 'SCCS',
      slug: 'sport-club-csikszereda-7',
      logo: 'https://ivr-api.icehockey.hu/storage/media/82504/conversions/profile_photo-thumb-cropped.png',
    },
    awayTeam: {
      id: 21915,
      longName: 'Gyergyói Hoki Klub',
      shortName: 'GYHK',
      slug: 'gyergyoi-hoki-klub-4',
      logo: 'https://ivr-api.icehockey.hu/storage/media/82503/conversions/profile_photo-thumb-cropped.png',
    },
    location: {
      locationId: 45,
      locationName: 'Csíkszereda (ROU)',
      locationCountryISO: null,
    },
    video: 'https://youtu.be/iWP2YKviSmc?si=7sYjPMFSI_W4YyJZ',
    divisionName: 'Alapszakasz',
    divisionStageName: null,
    divisionStage2Name: null,
    divisionStage3Name: null,
    homeTeamScore: 3,
    awayTeamScore: 3,
    result: '3:6 (2:0, 0:4, 1:2)',
    gameStatus: 1,
    seriesStandings: null,
    periodResults: '(2:0, 0:4, 1:2)',
    isOvertime: false,
    isShootout: false,
    decision: null,
    period: 'end',
    broadcast: false,
    seasonId: 216,
    registration: null,
    schedule: null,
  },
  {
    gameId: 72994,
    gameName: 'EL 4',
    gameDate: '2023-09-29T18:30:00.000+02:00',
    homeTeam: {
      id: 21912,
      longName: 'FEHA19',
      shortName: 'FEHA19',
      slug: 'feha19-11',
      logo: 'https://ivr-api.icehockey.hu/storage/media/82500/conversions/profile_photo-thumb-cropped.png',
    },
    awayTeam: {
      id: 21914,
      longName: 'Dunaújvárosi Acélbikák',
      shortName: 'DAB',
      slug: 'dunaujvarosi-acelbikak-108',
      logo: 'https://ivr-api.icehockey.hu/storage/media/82573/conversions/profile_photo-thumb-cropped.png',
    },
    location: {
      locationId: 180,
      locationName: 'Ifj. Ocskay Gábor Jégcsarnok, B pálya',
      locationCountryISO: null,
    },
    video: 'https://youtu.be/Bc4FkJD9f8g?si=8L1w4EkwJ4xoS3B5',
    divisionName: 'Alapszakasz',
    divisionStageName: null,
    divisionStage2Name: null,
    divisionStage3Name: null,
    homeTeamScore: 2,
    awayTeamScore: 6,
    result: '2:6 (0:2, 0:3, 2:1)',
    gameStatus: 1,
    seriesStandings: null,
    periodResults: '(0:2, 0:3, 2:1)',
    isOvertime: false,
    isShootout: false,
    decision: null,
    period: 'end',
    broadcast: false,
    seasonId: 216,
    registration: null,
    schedule: null,
  },
  {
    gameId: 72992,
    gameName: 'EL 2',
    gameDate: '2023-09-29T18:30:00.000+02:00',
    homeTeam: {
      id: 21910,
      longName: 'DVTK Jegesmedvék',
      shortName: 'DVTK',
      slug: 'dvtk-jegesmedvek-138',
      logo: 'https://ivr-api.icehockey.hu/storage/media/82506/conversions/profile_photo-thumb-cropped.png',
    },
    awayTeam: {
      id: 21909,
      longName: 'DEAC',
      shortName: 'DEAC',
      slug: 'deac-16',
      logo: 'https://ivr-api.icehockey.hu/storage/media/82501/conversions/profile_photo-thumb-cropped.png',
    },
    location: {
      locationId: 131,
      locationName: 'Miskolci Jégcsarnok',
      locationCountryISO: null,
    },
    video: 'https://youtu.be/NJEBtdRwXm8?si=kqUIUZNLOi9nDqfV',
    divisionName: 'Alapszakasz',
    divisionStageName: null,
    divisionStage2Name: null,
    divisionStage3Name: null,
    homeTeamScore: 5,
    awayTeamScore: 2,
    result: '5:2 (0:1, 3:0, 2:1)',
    gameStatus: 1,
    seriesStandings: null,
    periodResults: '(0:1, 3:0, 2:1)',
    isOvertime: false,
    isShootout: false,
    decision: null,
    period: 'end',
    broadcast: false,
    seasonId: 216,
    registration: null,
    schedule: null,
  },
  {
    gameId: 72993,
    gameName: 'EL 3',
    gameDate: '2023-09-29T18:40:00.000+02:00',
    homeTeam: {
      id: 21908,
      longName: 'Budapest Jégkorong Akadémia HC',
      shortName: 'BJA HC',
      slug: 'budapest-jegkorong-akademia-hc-1',
      logo: 'https://ivr-api.icehockey.hu/storage/media/82499/conversions/profile_photo-thumb-cropped.png',
    },
    awayTeam: {
      id: 21917,
      longName: 'UTE',
      shortName: 'UTE',
      slug: 'ute-359',
      logo: 'https://ivr-api.icehockey.hu/storage/media/82505/conversions/profile_photo-thumb-cropped.png',
    },
    location: {
      locationId: 9,
      locationName: 'Vasas Jégcentrum, Centerpálya',
      locationCountryISO: null,
    },
    video: 'https://youtu.be/2k3dA-_wkmc?si=JACAQY0lrffSxrik',
    divisionName: 'Alapszakasz',
    divisionStageName: null,
    divisionStage2Name: null,
    divisionStage3Name: null,
    homeTeamScore: 1,
    awayTeamScore: 4,
    result: '1:4 (0:1, 1:1, 0:2)',
    gameStatus: 2,
    seriesStandings: null,
    periodResults: '(0:1, 1:1, 0:2)',
    isOvertime: false,
    isShootout: false,
    decision: null,
    period: 'end',
    broadcast: false,
    seasonId: 216,
    registration: null,
    schedule: null,
  },
  {
    gameId: 72995,
    gameName: 'EL 5',
    gameDate: '2023-09-30T17:30:00.000+02:00',
    homeTeam: {
      id: 21915,
      longName: 'Gyergyói Hoki Klub',
      shortName: 'GYHK',
      slug: 'gyergyoi-hoki-klub-4',
      logo: 'https://ivr-api.icehockey.hu/storage/media/82503/conversions/profile_photo-thumb-cropped.png',
    },
    awayTeam: {
      id: 21911,
      longName: 'Corona Brasov',
      shortName: 'BRA',
      slug: 'corona-brasov-5',
      logo: 'https://ivr-api.icehockey.hu/storage/media/82497/conversions/profile_photo-thumb-cropped.png',
    },
    location: {
      locationId: 74,
      locationName: 'Gyergyószentmiklós (ROU)',
      locationCountryISO: null,
    },
    video: 'https://youtu.be/uwIPZx4I9Qg?si=08AafaWAnFsOdhae',
    divisionName: 'Alapszakasz',
    divisionStageName: null,
    divisionStage2Name: null,
    divisionStage3Name: null,
    homeTeamScore: 3,
    awayTeamScore: 4,
    result: '3:4 (1:0, 1:2, 1:2)',
    gameStatus: 2,
    seriesStandings: null,
    periodResults: '(1:0, 1:2, 1:2)',
    isOvertime: false,
    isShootout: false,
    decision: null,
    period: 'end',
    broadcast: false,
    seasonId: 216,
    registration: null,
    schedule: null,
  },
  {
    gameId: 72997,
    gameName: 'EL 7',
    gameDate: '2023-10-01T14:05:00.000+02:00',
    homeTeam: {
      id: 21913,
      longName: 'FTC-Telekom',
      shortName: 'FTC',
      slug: 'ftc-telekom-107',
      logo: 'https://ivr-api.icehockey.hu/storage/media/82498/conversions/profile_photo-thumb-cropped.png',
    },
    awayTeam: {
      id: 21909,
      longName: 'DEAC',
      shortName: 'DEAC',
      slug: 'deac-16',
      logo: 'https://ivr-api.icehockey.hu/storage/media/82501/conversions/profile_photo-thumb-cropped.png',
    },
    location: {
      locationId: 32,
      locationName: 'Tüskecsarnok',
      locationCountryISO: null,
    },
    video: 'https://youtu.be/mX6B8LBk6aU?si=f9bUFe47UPK5AGYT',
    divisionName: 'Alapszakasz',
    divisionStageName: null,
    divisionStage2Name: null,
    divisionStage3Name: null,
    homeTeamScore: 10,
    awayTeamScore: 2,
    result: '10:2 (5:1, 3:1, 2:0)',
    gameStatus: 2,
    seriesStandings: null,
    periodResults: '(5:1, 3:1, 2:0)',
    isOvertime: false,
    isShootout: false,
    decision: null,
    period: 'end',
    broadcast: true,
    seasonId: 216,
    registration: null,
    schedule: null,
  },
];

export function useGamesListForLiveStandings(standings = [], games = []) {
  const liveGames = computed(() => games.filter((game) => game.gameStatus === 1) || []);

  const isLiveStandingsActive = computed(() => liveGames.length > 0);

  const standingsWithScores = computed(() => setLivedGames(unref(standings), liveGames.value));

  const standingsWithDiff = computed(() => positionDifference(unref(standings), standingsWithScores.value));

  return {
    isLiveStandingsActive,
    rows: standingsWithDiff,
  };
}

// posDif, score

function setLivedGames(standings = [], games = []) {
  const convertedTable = [...standings].map((team) => {
    const activeGame = games.find((game) => game.homeTeam.id === team.team.id || game.awayTeam.id === team.team.id);
    team.isActiveGame = Boolean(activeGame);

    if (activeGame) {
      const isHomeTeam = team.team.id === activeGame.homeTeam.id;
      const score = isHomeTeam
        ? [activeGame.homeTeamScore, activeGame.awayTeamScore]
        : [activeGame.awayTeamScore, activeGame.homeTeamScore];

      team.score = score.join(':');
      team.scoreType = setScoreType(score);
      team.points = team.points + additionalPoints(score);
      team.gf = team.gf + score[0];
      team.ga = team.ga + score[1];
      team.gd = team.gf - team.ga;
    }
    return team;
  });
  return convertedTable;
}

function additionalPoints(score) {
  if (score[0] > score[1]) return 3;
  if (score[0] < score[1]) return 0;
  return 1;
}

function positionDifference(originalStandings, convertedTable) {
  const sortedTable = sortWith([descend(prop('points')), descend(prop('gd'))])(convertedTable);

  const x = sortedTable.map((team) => {
    const originalIndex = originalStandings.findIndex((row) => team.team.id === row.team.id);
    const newIndex = sortedTable.findIndex((row) => team.team.id === row.team.id);
    team.diff = originalIndex - newIndex;
    return team;
  });
  return x;
}

function setScoreType(score) {
  if (score[0] > score[1]) return 'W';
  if (score[0] < score[1]) return 'L';
  return 'D';
}
