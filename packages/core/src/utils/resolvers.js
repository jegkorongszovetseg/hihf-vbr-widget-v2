import {
  DEFAULT_EXTERNAL_GAME_URL,
  DEFAULT_EXTERNAL_PLAYER_URL,
  DEFAULT_EXTERNAL_STATISTIC_URL,
  DEFAULT_EXTERNAL_TEAM_URL,
  FLAG_BASE_URL,
} from '../constants';
import { templateReplacer } from './string';

const getSettingVariable = (key = '') => window?.__MJSZ_VBR_WIDGET__?.[key];

export function externalGameLinkResolver(rawResolver, params = {}) {
  if (params.externalGameUrl)
    return params.externalGameUrl;
  const resolver = getSettingVariable('gameResolver') || rawResolver;
  if (typeof resolver === 'function')
    return resolver(params);

  if (resolver)
    return encodeURI(templateReplacer(resolver, params));

  return encodeURI(templateReplacer(DEFAULT_EXTERNAL_GAME_URL, params));
}

export function externalTeamLinkResolver(rawResolver, params = {}) {
  const resolver = getSettingVariable('teamResolver') || rawResolver;
  if (typeof resolver === 'function')
    return resolver(params);

  if (resolver)
    return encodeURI(templateReplacer(resolver, params));

  return encodeURI(templateReplacer(DEFAULT_EXTERNAL_TEAM_URL, params));
}

export function externalPlayerLinkResolver(rawResolver, params = {}) {
  const resolver = getSettingVariable('playerResolver') || rawResolver;
  if (typeof resolver === 'function')
    return resolver(params);

  if (resolver)
    return encodeURI(templateReplacer(resolver, params));

  return encodeURI(templateReplacer(DEFAULT_EXTERNAL_PLAYER_URL, params));
}

export function externalStatisticLinkResolver(resolver, params = {}) {
  if (typeof resolver === 'function')
    return resolver(params);

  if (resolver)
    return encodeURI(templateReplacer(resolver, params));

  return encodeURI(templateReplacer(DEFAULT_EXTERNAL_STATISTIC_URL, params));
}

export const flagResolver = (countryCode, type = '1x1') => `${FLAG_BASE_URL}/flag:${countryCode}-${type}.svg`;

export function resolveApiKey(apiKey) {
  if (apiKey)
    return apiKey;
  if (getSettingVariable('apiKey'))
    return getSettingVariable('apiKey');
  return '';
}
