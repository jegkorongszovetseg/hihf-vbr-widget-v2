import DefaultTheme from 'vitepress/theme';
import Columns from '../components/BuildColumns.vue';

import MjszVbrElementsCore from '@mjsz-vbr-elements/core';
import MjszVbrElements from '@mjsz-vbr-elements/elements';
import MjszVbrElementsExtended from '@mjsz-vbr-elements/extended';
import MjszVbrElementsLiga from '@mjsz-vbr-elements/liga';
import MjszVbrElementsGamecenter from '@mjsz-vbr-elements/gamecenter';
import './index.css';

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    if (typeof window !== 'undefined') {
      // createConfig({
      //   modules: [MjszVbrElements, MjszVbrElementsExtended, MjszVbrElementsLiga, MjszVbrElementsGamecenter],
      //   apiKey: 'dd8adf5fdb738b3741fa579b5ede5ce69b681f62',
      // });
      app.use(MjszVbrElementsCore, {
        modules: [MjszVbrElements, MjszVbrElementsExtended, MjszVbrElementsLiga, MjszVbrElementsGamecenter],
        apiKey: import.meta.env.VITE_VBR_API_KEY,
        // apiKey: 'dd8adf5fdb738b3741fa579b5ede5ce69b681f62',
      });
    }

    app.component('Columns', Columns);
  },
};
