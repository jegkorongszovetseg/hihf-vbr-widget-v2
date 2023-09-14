export * from './components';
export * from './composables';
export * from './utils';

export * from './props';
export * from './columns';
export * from './constants';

export const createConfig = ({ modules = [], apiKey, gameResolver, teamResolver, playerResolver }) => {
  window.__MJSZ_VBR_WIDGET__ = { apiKey, gameResolver, teamResolver, playerResolver };

  if (modules.length === 0) throw new Error('At least one module must be set');
  modules.forEach((module) => {
    module?.() ?? module?.register();
  });
};
