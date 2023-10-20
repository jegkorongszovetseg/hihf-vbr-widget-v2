import DefaultTheme from 'vitepress/theme';
import { createConfig } from '@mjsz-vbr-elements/core';
import MjszVbrElements from '@mjsz-vbr-elements/elements';
import MjszVbrElementsExtended from '@mjsz-vbr-elements/extended';
import MjszVbrElementsLiga from '@mjsz-vbr-elements/liga';
import MjszVbrElementsGamecenter from '@mjsz-vbr-elements/gamecenter';

export default {
  ...DefaultTheme,
  enhanceApp() {
    if (typeof window !== 'undefined') {
      createConfig({
        modules: [MjszVbrElements, MjszVbrElementsExtended, MjszVbrElementsLiga, MjszVbrElementsGamecenter],
        apiKey: 'dd8adf5fdb738b3741fa579b5ede5ce69b681f62',
      });
    }
  },
};
