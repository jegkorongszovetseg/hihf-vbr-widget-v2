import { convertMinToSec, playerName, useVisibilityChange } from '@mjsz-vbr-elements/core';
import { useTimeoutPoll } from '@vueuse/core';
import {
  allPass,
  compose,
  descend,
  filter,
  groupBy,
  map,
  pathEq,
  pick,
  prop,
  propEq,
  reduce,
  replace,
  reverse,
  sortBy,
  sortWith,
  split,
  trim,
  values,
} from 'ramda';
// import { useVisibilityChange } from '../../../../core/src/composables';
import { callFunctions } from '../game/internal';

const INTERVAL = 1000 * 30;
const LAZY_INTERVAL = 1000 * 60 * 5;

let i = 0;
function generateId() {
  return ++i;
}

export const transformEvents = events => compose(reverse, map(event => ({ ...event, eventId: event.eventId ? event.eventId : generateId() })))(events);

export function buildPeriodResultsByTeam(periodResults) {
  const defaultPeriodResultObject = {
    home: [],
    away: [],
  };

  if (!periodResults)
    return defaultPeriodResultObject;
  const convertedArray = compose(map(split(':')), map(trim), split(','), replace(/^\(|\)$/g, ''))(periodResults);
  return convertedArray.reduce((acc, item) => {
    acc.home.push(item[0]);
    acc.away.push(item[1]);
    return acc;
  }, defaultPeriodResultObject);
}

export const groupLines = data => groupBy(prop('row'), data);

export function groupLinesByTeams(data, homeTeamId, awayTeamId) {
  const homeTeam = groupLines(data?.[homeTeamId] ?? []);
  const awayTeam = groupLines(data?.[awayTeamId] ?? []);

  return ['1', '2', '3', '4', 'gk'].reduce(
    (acc, key) => {
      acc[key].home = homeTeam[key];
      acc[key].away = awayTeam[key];
      return acc;
    },
    {
      1: { home: [], away: [] },
      2: { home: [], away: [] },
      3: { home: [], away: [] },
      4: { home: [], away: [] },
      gk: { home: [], away: [] },
    },
  );
}

export function buildSOG(data, homeTeamId, awayTeamId, key) {
  let allValueStart = 0;
  let allValueEnd = 0;

  const converted = data.reduce((acc, item) => {
    const period = item[homeTeamId]?.period ?? 'p1';
    const valueStart = item[homeTeamId]?.[key] ?? 0;
    const valueEnd = item[awayTeamId]?.[key] ?? 0;
    const max = valueStart + valueEnd;
    allValueStart += valueStart;
    allValueEnd += valueEnd;
    acc[period] = {
      max,
      valueStart,
      valueEnd,
    };
    return acc;
  }, {});

  converted.all = {
    max: allValueStart + allValueEnd,
    valueStart: allValueStart,
    valueEnd: allValueEnd,
  };

  return converted;
}

export function buildAdv(data) {
  const homeAdvTime = data?.home?.advTime ?? 0;
  const awayAdvTime = data?.away?.advTime ?? 0;
  const homeAdvTimePP1 = data?.home?.advTimePP1 ?? 0;
  const awayAdvTimePP1 = data?.away?.advTimePP1 ?? 0;
  const homeAdvTimePP2 = data?.home?.advTimePP2 ?? 0;
  const awayAdvTimePP2 = data?.away?.advTimePP2 ?? 0;

  return {
    advTime: {
      max: homeAdvTime + awayAdvTime,
      valueStart: homeAdvTime,
      valueEnd: awayAdvTime,
    },
    advTimePP1: {
      max: homeAdvTimePP1 + awayAdvTimePP1,
      valueStart: homeAdvTimePP1,
      valueEnd: awayAdvTimePP1,
    },
    advTimePP2: {
      max: homeAdvTimePP2 + awayAdvTimePP2,
      valueStart: homeAdvTimePP2,
      valueEnd: awayAdvTimePP2,
    },
  };
}

export function buildAdvPercent(data) {
  const homeADV = data?.home?.adv ?? 0;
  const homePPGF = data?.home?.ppgf ?? 0;

  const awayADV = data?.away?.adv ?? 0;
  const awayPPGF = data?.away?.ppgf ?? 0;

  const homePPPercent = (data?.home?.ppPercent ?? 0).toFixed(2);
  const awayPPPercent = (data?.away?.ppPercent ?? 0).toFixed(2);
  return {
    powerPlays: {
      max: homeADV + awayADV,
      valueStart: homeADV,
      valueEnd: awayADV,
      suffix: '',
    },
    powerPlaysGoalFor: {
      max: homePPGF + awayPPGF,
      valueStart: homePPGF,
      valueEnd: awayPPGF,
      suffix: '',
    },
    powerPlayEfficiency: {
      max: 100,
      valueStart: homePPPercent,
      valueEnd: awayPPPercent,
      suffix: '%',
    },
  };
}

export function buildDvgPercent(data) {
  const homeDVG = data?.home?.dvg ?? 0;
  const homePK = data?.home?.pk ?? 0;

  const awayDVG = data?.away?.dvg ?? 0;
  const awayPK = data?.away?.pk ?? 0;

  const homePKPercent = (data?.home?.pkPercent ?? 0).toFixed(2);
  const awayPKPercent = (data?.away?.pkPercent ?? 0).toFixed(2);
  return {
    penaltyKill: {
      max: homeDVG + awayDVG,
      valueStart: homeDVG,
      valueEnd: awayDVG,
      suffix: '',
    },
    powerPlaysKilled: {
      max: homePK + awayPK,
      valueStart: homePK,
      valueEnd: awayPK,
      suffix: '',
    },
    penaltyKillEfficiency: {
      max: 100,
      valueStart: homePKPercent,
      valueEnd: awayPKPercent,
      suffix: '%',
    },
  };
}

export function convertGameOfficials(data, t) {
  const sortByType = (item) => {
    const index = ['first_referee', 'second_referee', 'first_line_judge', 'second_line_judge'].indexOf(item.role);
    return index > -1 ? index : 4;
  };

  const convertName = item => ({ ...playerName(item), role: t(`role.${item.role}`) });

  return groupBy(prop('type'), map(convertName, sortBy(sortByType, values(data))));
}

export const transformGoalieStats = sortWith([descend(prop('startingFive'))]);

export function pickCoaches(data) {
  return compose(map(playerName), pick(['headCoach', 'secondCoach']))(data);
}

export const pickReferees = pick(['first_referee', 'second_referee', 'first_line_judge', 'second_line_judge']);

export function filterGoalScorers(events, teamId) {
  const filtered = filter(allPass([pathEq(teamId, ['team', 'id']), propEq('Gól', 'type')]), reverse(events));
  const converted = map(event => ({ ...event, eventTimeSec: convertMinToSec(event.eventTime) }), filtered);

  const reduced = reduce(
    (players, player) => {
      if (players[player.playerId]) {
        players[player.playerId].eventTime += `, ${player.eventTime}`;
      }
      else {
        players[player.playerId] = {
          id: player.playerId,
          name: `${player.lastName} ${player.firstName}`,
          eventTime: player.eventTime,
          eventTimeSec: player.eventTimeSec,
        };
      }
      return players;
    },
    {},
    converted,
  );

  const sorted = sortBy(prop('eventTimeSec'), values(reduced));
  return sorted;
}

export function handleServices(options = {}) {
  const { data, services } = options;
  const { getGameData, getGameStats, getEvents, getGameOfficials } = services;

  const isRefreshable = ref(false);

  const { resume, pause, isActive } = useTimeoutPoll(
    () => callFunctions(getGameStats, getEvents),
    INTERVAL,
    { immediate: false, immediateCallback: false },
  );

  useTimeoutPoll(
    () => getGameData(),
    LAZY_INTERVAL,
    {
      immediate: true,
      immediateCallback: true,
    },
  );

  const { pause: pauseGameOfficials } = useTimeoutPoll(
    () => getGameOfficials(),
    LAZY_INTERVAL,
    {
      immediate: true,
      immediateCallback: true,
    },
  );

  useVisibilityChange(isRefreshable, () => {
    resume();
    getGameData();
  }, () => {
    pause();
  });

  watch(data, (data) => {
    if (data.gameStatus === 1 && !isActive.value) {
      isRefreshable.value = true;
      pauseGameOfficials();
      resume();
      getGameStats();
      getEvents();
    }
    if (data.gameStatus > 1) {
      isRefreshable.value = false;
      callFunctions(getGameStats, getEvents);
      pauseGameOfficials();
    }
  });
}
