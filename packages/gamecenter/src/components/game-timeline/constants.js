export const EVENT_TYPE_GOAL = 'Gól';
export const EVENT_TYPE_PENALTY = 'Kiállítás';
export const EVENT_TYPE_GOALIE = 'Kapus';
export const EVENT_TYPE_TIMEOUT = 'Idő';
export const EVENT_TYPE_PENALTY_SHOT = 'Büntető';

export const TAB_EVENTS = 'events';
export const TAB_LINEUPS = 'lineups';
export const TAB_TEAM_STATS = 'team-stats';
export const TAB_PLAYER_STATS = 'player-stats';
export const TAB_OFFICIALS = 'officials';

export const PERIODS = ['wu', 'pre', 'p1', 'p1_int', 'p2', 'p2_int', 'p3', 'p3_int'];
export const PERIODS_OT = ['ot', 'ot_int'];
export const PERIODS_SO = ['so', 'so_int'];
export const PERIODS_END = ['end'];

export const EXTENDED_PERIOD_EVENTS = [
  {
    eventTime: '-40:00',
    eventTimeSec: -3600,
    labelKey: 'wu',
    type: 'period',
    eventId: 0,
  },
  {
    eventTime: '-15:00',
    eventTimeSec: -3500,
    labelKey: 'pre',
    type: 'period',
    eventId: 1,
  },
  {
    eventTime: '00:00',
    eventTimeSec: -1,
    labelKey: 'p1',
    type: 'period',
    eventId: 2,
  },
  {
    eventTime: '20:00',
    eventTimeSec: 1200,
    labelKey: 'p1_int',
    type: 'period',
    eventId: 3,
  },
  {
    eventTime: '20:00',
    eventTimeSec: 1200,
    labelKey: 'p2',
    type: 'period',
    eventId: 4,
  },
  {
    eventTime: '40:00',
    eventTimeSec: 2400,
    labelKey: 'p2_int',
    type: 'period',
    eventId: 5,
  },
  {
    eventTime: '40:00',
    eventTimeSec: 2400,
    labelKey: 'p3',
    type: 'period',
    eventId: 6,
  },
  {
    eventTime: '60:00',
    eventTimeSec: 3600,
    labelKey: 'p3_int',
    type: 'period',
    eventId: 7,
  },
];

export const EXTENDED_PERIOD_EVENTS_OT = [
  {
    eventTime: '60:00',
    eventTimeSec: 3600,
    labelKey: 'ot',
    type: 'period',
    eventId: 8,
  },
  {
    eventTime: '65:00',
    eventTimeSec: 3900,
    labelKey: 'ot_int',
    type: 'period',
    eventId: 8,
  },
];

export const EXTENDED_PERIOD_EVENTS_SO = [
  {
    eventTime: '65:00',
    eventTimeSec: 3900,
    labelKey: 'so',
    type: 'period',
    eventId: 8,
  },
  {
    eventTime: '65:00',
    eventTimeSec: 3901,
    labelKey: 'so_int',
    type: 'period',
    eventId: 8,
  },
];

export const EXTENDED_PERIOD_EVENTS_END = (ot, so) => {
  return [
    {
      eventTime: ot || so ? '65:00' : '60:00',
      eventTimeSec: ot || so ? 3901 : 3600,
      labelKey: 'end-event',
      type: 'period',
      eventId: 8,
    },
  ];
};
