export * from './components/index.js';
export * from './composables/index.js';
export * from './utils/index.js';

export * from './columns';
export * from './constants';

export * from './icons/index';

export const createConfig = ({ apiKey, modules = [] }) => {
  window.__MJSZ_VBR_WIDGET__ = { apiKey };

  if (modules.length === 0) throw new Error('At least one module must be set');
  modules.forEach((item) => {
    item?.register();
  });
};
