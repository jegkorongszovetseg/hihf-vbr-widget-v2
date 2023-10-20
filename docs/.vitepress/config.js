import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'VBR API Elements',
  description: 'Data visualization for MJSZ VBR',
  themeConfig: {
    socialLinks: [{ icon: 'github', link: 'https://github.com/jegkorongszovetseg/hihf-vbr-widget-v2' }],
    nav: [
      { text: 'Widget', link: '/widget/' },
      { text: 'Stílusok', link: '/styles/' },
      { text: 'VBR API', link: '/vbr-api/' },
      { text: 'VBR Azonosítók', link: '/vbr-api/identifiers' },
    ],
    sidebar: {
      '/widget/': [
        {
          text: 'Útmutató',
          items: [
            { text: 'Bemutatás', link: '/widget/' },
            { text: 'Widgetek használata', link: '/widget/using-widget' },
            { text: 'Widgetek beállítása', link: '/widget/widget-config' },
            { text: 'Elérhető nyelvek', link: '/widget/available-languages' },
            { text: 'Elérhető widgetek', link: '/widget/available-widgets' },
          ],
        },
        {
          text: 'Elements',
          items: [
            { text: 'Tabella', link: '/widget/standings' },
            { text: 'Menetrend', link: '/widget/schedule' },
            { text: 'Játékos statisztikák', link: '/widget/fieldplayers-leader' },
            { text: 'Játékos büntetések', link: '/widget/fieldplayers-penalties' },
            { text: 'Kapus statisztikák', link: '/widget/goalies-leader' },
            { text: 'Csapat nézőszámok', link: '/widget/teams-attendance' },
            { text: 'Csapat büntetések', link: '/widget/teams-fairplay' },
            { text: 'Csapat emberhátrányok', link: '/widget/teams-penalty-killing' },
            { text: 'Csapat emberelőnyök', link: '/widget/teams-powerplay' },
            { text: 'Csapat hatékonyság', link: '/widget/teams-scoring-efficiency' },
          ],
        },
        {
          text: 'Extended Elements',
          items: [
            { text: 'Bajnokságok', link: '/widget/statistics' },
            { text: 'Kupa Menetrend', link: '/widget/playoffs' },
          ],
        },
        {
          text: 'Liga',
          items: [
            { text: 'Rájátszás', link: '/widget/statistics' },
            { text: 'Liga Menetrend', link: '/widget/schedule-liga' },
            { text: 'Liga Tabella', link: '/widget/playoffs' },
            { text: 'Statisztikák', link: '/widget/statistics' },
            { text: 'Csapatok', link: '/widget/statistics' },
          ],
        },
        {
          text: 'Game Center',
          items: [
            { text: 'Game', link: '/widget/gamecenter' },
            { text: 'Game Timeline', link: '/widget/gamecenter-timeline' },
          ],
        },
      ],
      '/styles/': [
        {
          items: [
            { text: 'Használat', link: '/styles/' },
            { text: 'Változók listája', link: '/styles/css-variables' },
          ],
        },
      ],
    },
    docFooter: {
      prev: 'Előző',
      next: 'Következő',
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
});
