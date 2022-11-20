import {
  DEFAULT_EXTERNAL_BASE_URL,
  DEFAULT_EXTERNAL_PLAYER_URL,
  DEFAULT_EXTERNAL_TEAM_URL,
} from '../@shared/constants';

export const externalGameLinkResolver = (resolver, gameId) => {
  if (typeof resolver === 'function') return resolver(gameId);
  if (resolver) return resolver + gameId;
  if (window?.__MJSZ_VBR_WIDGET__?.gameUrl) return window.__MJSZ_VBR_WIDGET__.gameUrl + gameId;
  return DEFAULT_EXTERNAL_BASE_URL + gameId;
};

export const externalTeamLinkResolver = (resolver, teamName) => {
  if (typeof resolver === 'function') return resolver(teamName);
  if (resolver) return encodeURI(resolver + teamName);
  if (window?.__MJSZ_VBR_WIDGET__?.gameUrl) return encodeURI(window.__MJSZ_VBR_WIDGET__.teamUrl + teamName);
  return encodeURI(DEFAULT_EXTERNAL_TEAM_URL + teamName);
};

export const externalPlayerLinkResolver = (resolver, playerId) => {
  if (typeof resolver === 'function') return resolver(playerId);
  if (resolver) return encodeURI(resolver + playerId);
  if (window?.__MJSZ_VBR_WIDGET__?.gameUrl) return encodeURI(window.__MJSZ_VBR_WIDGET__.playerUrl + playerId);
  return encodeURI(DEFAULT_EXTERNAL_PLAYER_URL + playerId);
};
