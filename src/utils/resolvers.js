import { DEFAULT_EXTERNAL_BASE_URL } from '../constants';

export const externalGameLinkResolver = (resolver, gameId) => {
  console.log({ resolver, gameId });
  if (typeof resolver === 'function') return resolver(gameId);
  if (resolver) return resolver + gameId;
  if (window?.__MJSZ_VBR_WIDGET__?.gameUrl) return window.__MJSZ_VBR_WIDGET__.gameUrl + gameId;
  return DEFAULT_EXTERNAL_BASE_URL + gameId;
};
