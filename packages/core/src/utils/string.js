import { path, split } from 'ramda';

export function toKebabCase(str) {
  return (
    str
    && str
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+\d*|\b)|[A-Z]?[a-z]+\d*|[A-Z]|\d+/g)
      .map(x => x.toLowerCase())
      .join('-')
  );
}

// Example: 'https://www.example.com/api/{step}/{id}'
export const templateReplacer = function (tpl = '', data = {}) {
  return tpl.replace(/\{([^}]+)\}/g, (_, $2) => {
    return path(split('.', $2), data);
  });
};
