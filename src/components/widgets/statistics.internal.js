export const commonProps = {
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

  apiKey: {
    type: String,
    default: '',
  },

  type: {
    type: String,
    default: '3',
    validator: (value) => ['2', '3'].includes(value),
  },

  limit: {
    type: Number,
    default: 20,
  },

  hideColumns: {
    type: String,
    default: '',
  },

  teamFilterByName: {
    type: String,
    default: '',
  },
};
