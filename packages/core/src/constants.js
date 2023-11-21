export const VBR_API_BASE_URL = import.meta.env.VITE_VBR_API_URL;

export const DEFAULT_EXTERNAL_GAME_URL = 'https://www.jegkorongszovetseg.hu/event/game/{gameId}';

export const DEFAULT_PORTRAIT_IMAGE_URL = 'https://jegkorongszovetseg.hu/assets/images/player_blank.png';

export const DEFAULT_EXTERNAL_PLAYER_URL =
  'https://www.ersteliga.hu/stats/player/?playerId={player.playerId}&championshipId={championshipId}';
export const DEFAULT_EXTERNAL_TEAM_URL =
  'https://www.ersteliga.hu/stats/team/?teamId={team.id}&championshipId={championshipId}';

export const FLAG_BASE_URL = 'https://api.icehockey.hu/static/api/flag';

export const SORT_STATE_ORIGINAL = 'original';
export const SORT_STATE_DESCEND = 'descend';
export const SORT_STATE_ASCEND = 'ascend';

export const LOCALE_FOR_LANG = new Map().set('hu', 'hu-hu').set('en', 'hu-gb');

export const AVAILABLE_TIMEZONES_BY_COUNTRY = new Map()
  .set('Europe/Budapest', { countryLabelKey: 'hungary', timezone: 'Europe/Budapest' })
  .set('Europe/Bucharest', { countryLabelKey: 'romania', timezone: 'Europe/Bucharest' });

export const REFRESH_DELAY = 1000 * 60 * 5;
export const LAZY_LOADING_STATE_DELAY = 1000;
