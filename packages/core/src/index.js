export * from './columns';
export * from './components';
export * from './composables';

export * from './constants';
export * from './props';
export * from './utils';

export function createConfig({ app = null, modules = [], apiKey, gameResolver, teamResolver, playerResolver }) {
  window.__MJSZ_VBR_WIDGET__ = { apiKey, gameResolver, teamResolver, playerResolver };

  if (modules.length === 0)
    throw new Error('At least one module must be set');
  modules.forEach((module) => {
    if (app)
      return app.use(module);
    if (module.register)
      return module.register();
    module?.install();
  });
}

export default {
  install: (app, options = {}) => createConfig({ app, ...options }),
};
