export class WidgetError extends Error {
  constructor(message, options = {}) {
    const { key, cause } = options;
    super(message);
    this.name = 'WidgetError';
    this.key = key;
    this.cause = cause;
  }
}

export const UndefinedColumn = {
  message: 'Undefined Column name Message',
  options: {
    key: 'undefined-column',
    cause: {},
  },
};

export const InvalidSeasonName = {
  message: 'Invalid season name',
  options: {
    key: 'invalid-season-name',
    cause: {},
  },
};
