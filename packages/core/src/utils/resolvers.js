import { DEFAULT_EXTERNAL_BASE_URL, DEFAULT_EXTERNAL_PLAYER_URL, DEFAULT_EXTERNAL_TEAM_URL } from '../constants';

export const externalGameLinkResolver = (rawResolver, gameId) => {
  const resolver = getSettingVariable('gameResolver') || rawResolver;
  if (typeof resolver === 'function') return resolver(gameId);
  if (resolver) return resolver + gameId;
  return DEFAULT_EXTERNAL_BASE_URL + gameId;
};

export const externalTeamLinkResolver = (rawResolver, teamName) => {
  const resolver = getSettingVariable('teamResolver') || rawResolver;
  if (typeof resolver === 'function') return resolver(teamName);
  if (resolver) return encodeURI(resolver + teamName);
  return encodeURI(DEFAULT_EXTERNAL_TEAM_URL + teamName);
};

export const externalPlayerLinkResolver = (rawResolver, playerId) => {
  const resolver = getSettingVariable('playerResolver') || rawResolver;
  if (typeof resolver === 'function') return resolver(playerId);
  if (resolver) return encodeURI(resolver + playerId);
  return encodeURI(DEFAULT_EXTERNAL_PLAYER_URL + playerId);
};

const getSettingVariable = (key = '') => window?.__MJSZ_VBR_WIDGET__?.[key];
