import { defineConfig } from 'vitepress';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  lang: 'hu-HU',
  title: 'MJSZ VBR Widgetek',
  description: 'Just playing around.',
  themeConfig: {
    nav: [
      { text: 'Widget', link: '/widget/' },
      { text: 'Stílusok', link: '/styles/' },
      { text: 'VBR API', link: '/vbr-api/' },
      { text: 'VBR Azonosítók', link: '/vbr-api/identifiers' },
      { text: 'GitHub', link: 'https://github.com/jegkorongszovetseg/hihf-vbr-widget-v2' },
    ],
    sidebar: {
      '/widget/': [
        {
          text: 'Útmutató',
          items: [
            { text: 'Bemutatás', link: '/widget/' },
            { text: 'Widgetek használata', link: '/widget/using-widget' },
            { text: 'Elérhető nyelvek', link: '/widget/available-languages' },
            { text: 'Elérhető widgetek', link: '/widget/available-widgets' },
          ],
        },
        {
          text: 'Widgetek',
          items: [
            { text: 'Tabella', link: '/widget/standings' },
            { text: 'Schedule', link: '/getting-started' },
            { text: 'FieldPlayers', link: '/getting-started' },
          ],
        },
      ],
    },
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => {
          return tag.includes('mjsz-vbr-');
        },
      },
    },
  },
  vite: {
    envDir: '../',
  },
});
