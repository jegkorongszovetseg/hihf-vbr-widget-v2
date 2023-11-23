export const baseProps = {
  locale: {
    type: String,
    default: 'hu',
  },

  championshipId: {
    type: String,
    default: '',
  },

  division: {
    type: String,
    default: '',
  },

  phaseId: {
    type: String,
    default: '',
  },

  apiKey: {
    type: String,
    default: '',
  },

  hideColumns: {
    type: String,
    default: '',
  },
};

export const teamStatsProps = {
  externalTeamLink: {
    type: [String, Function],
    default: '',
  },

  isTeamLinked: {
    type: Boolean,
    default: false,
  },
};

export const playerStatsProps = {
  limit: {
    type: Number,
    default: 20,
  },

  teamFilterByName: {
    type: String,
    default: '',
  },

  externalPlayerLink: {
    type: [String, Function],
    default: '',
  },

  isPlayerLinked: {
    type: Boolean,
    default: false,
  },

  ...teamStatsProps,
};
