import { getCurrentInstance } from 'vue';
import { useState } from './composables/useState';

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
    if (module.register) return module.register();
    module?.();
  });
};

export default {
  install: (app, options = {}) => {
    const { modules = [], apiKey, gameResolver, teamResolver, playerResolver } = options;
    // Plugin code goes here
    console.log({ app, options });
    // app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith('mjsz-vbr-');

    app.provide('globalOptions', { apiKey, gameResolver, teamResolver, playerResolver });
    app.config.globalProperties.$mjszVbrElements = { apiKey, gameResolver, teamResolver, playerResolver };

    // const compSetup = app._component.setup;
    // compSetup() {

    // };
    const { set } = useState();
    set('abcd');

    if (modules.length === 0) throw new Error('At least one module must be set');
    modules.forEach((module) => {
      if (module.register) return module.register();
      module?.();
    });
  },
};
