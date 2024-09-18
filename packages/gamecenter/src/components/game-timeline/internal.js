import { replace, compose, split, map, trim, groupBy, prop } from 'ramda';

export const buildPeriodResultsByTeam = (periodResults) => {
  const defaultPeriodResultObject = {
    home: [],
    away: [],
  };

  if (!periodResults) return defaultPeriodResultObject;
  const convertedArray = compose(map(split(':')), map(trim), split(','), replace(/^\(|\)$/g, ''))(periodResults);
  return convertedArray.reduce((acc, item) => {
    acc.home.push(item[0]);
    acc.away.push(item[1]);
    return acc;
  }, defaultPeriodResultObject);
};

export const groupLines = (data) => groupBy(prop('row'), data);
