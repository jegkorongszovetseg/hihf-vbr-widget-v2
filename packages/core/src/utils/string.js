import { path, split } from 'ramda';

const ALLOWED_TH_CLASSES = ['text-start', 'text-center', 'text-end'];

export function toKebabCase(str) {
  return (
    str
    && str
      .match(/[A-Z]{2,}(?=[A-Z][a-z]|\b)|[A-Z]?[a-z]+\d*|[A-Z]|\d+/g)
      .map(x => x.toLowerCase())
      .join('-')
  );
}

// Example: 'https://www.example.com/api/{step}/{id}'
export function templateReplacer(tpl = '', data = {}) {
  return tpl.replace(/\{([^}]+)\}/g, (_, $2) => {
    return path(split('.', $2), data);
  });
}

export function filterAllowedClasses(str) {
  return (str || '')
    .split(' ')
    .filter(cls => ALLOWED_TH_CLASSES.includes(cls))
    .join(' ');
}
