export const VBR_API_BASE_URL = 'http://localhost:3333/vbr';
// export const VBR_API_BASE_URL = 'https://api.icehockey.hu/vbr';
// export const VBR_API_BASE_URL = 'https://preprodapi.icehockey.hu/vbr';

export const DEFAULT_EXTERNAL_BASE_URL = 'https://www.jegkorongszovetseg.hu/event/game/';

export const DEFAULT_PORTRAIT_IMAGE_URL = 'https://jegkorongszovetseg.hu/assets/images/player_blank.png';

export const DEFAULT_EXTERNAL_PLAYER_URL = 'https://www.ersteliga.hu/stats/players#/player/';
export const DEFAULT_EXTERNAL_TEAM_URL = 'https://www.ersteliga.hu/stats/teams#/team/3314/21096?name=';

export const SORT_STATE_ORIGINAL = 'original';
export const SORT_STATE_DESCEND = 'descend';
export const SORT_STATE_ASCEND = 'ascend';

export const LOCALE_FOR_LANG = new Map().set('hu', 'hu-hu').set('en', 'hu-gb');

export const AVAILABLE_TIMEZONES_BY_COUNTRY = new Map()
  .set('Europe/Budapest', { countryLabelKey: 'hungary', timezone: 'Europe/Budapest' })
  .set('Europe/Bucharest', { countryLabelKey: 'romania', timezone: 'Europe/Bucharest' });

export const VBR_API_GOALIE_PATH = '/v1/playersGoaliePeriod';
export const VBR_API_GOALIE_UNDER_PATH = '/v1/playersGoalieUnderPeriod';

export const REFRESH_DELAY = 1000 * 60 * 5;
export const LAZY_LOADING_STATE_DELAY = 1000;
