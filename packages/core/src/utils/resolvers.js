import {
  DEFAULT_EXTERNAL_BASE_URL,
  DEFAULT_EXTERNAL_PLAYER_URL,
  DEFAULT_EXTERNAL_TEAM_URL,
  FLAG_BASE_URL,
} from '../constants';
import { templateReplacer } from './string';

export const externalGameLinkResolver = (rawResolver, gameId) => {
  const resolver = getSettingVariable('gameResolver') || rawResolver;
  if (typeof resolver === 'function') return resolver(gameId);
  if (resolver) return resolver + gameId;
  return DEFAULT_EXTERNAL_BASE_URL + gameId;
};

export const externalTeamLinkResolver = (rawResolver, params = {}) => {
  const resolver = getSettingVariable('teamResolver') || rawResolver;
  if (typeof resolver === 'function') return resolver(params);
  if (resolver) return encodeURI(templateReplacer(resolver, params));
  return encodeURI(templateReplacer(DEFAULT_EXTERNAL_TEAM_URL, params));
};

export const externalPlayerLinkResolver = (rawResolver, params = {}) => {
  const resolver = getSettingVariable('playerResolver') || rawResolver;
  if (typeof resolver === 'function') return resolver(params);
  if (resolver) return encodeURI(templateReplacer(resolver, params));
  return encodeURI(templateReplacer(DEFAULT_EXTERNAL_PLAYER_URL, params));
};

export const flagResolver = (countryCode, type = '1x1') => `${FLAG_BASE_URL}/flag:${countryCode}-${type}.svg`;

const getSettingVariable = (key = '') => window?.__MJSZ_VBR_WIDGET__?.[key];
