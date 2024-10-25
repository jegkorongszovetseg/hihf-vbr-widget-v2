import { resolve } from 'node:path';
import { defineConfig, loadEnv } from 'vitepress';
import pkg from '../../package.json';

// https://vitepress.dev/reference/site-config
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    base: env.VITE_DOCS_BASE,
    title: 'VBR API Elements',
    description: 'Data visualization for MJSZ VBR',
    themeConfig: {
      socialLinks: [{ icon: 'github', link: 'https://github.com/jegkorongszovetseg/hihf-vbr-widget-v2' }],
      nav: [
        { text: 'Widget', link: '/widget/' },
        { text: 'Stílusok', link: '/styles/' },
        { text: 'VBR API', link: '/vbr-api/' },
        { text: 'IVR Azonosítók', link: '/vbr-api/identifiers' },
        { text: 'Stories', link: 'https://api.icehockey.hu/widgets/stories/v2' },
        { text: pkg.version, link: '/changelog' },
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
              { text: 'Játékos jégen töltött idő', link: '/widget/fieldplayers-toi' },
              { text: 'Kapus statisztikák', link: '/widget/goalies-leader' },
              { text: 'Csapat nézőszámok', link: '/widget/teams-attendance' },
              { text: 'Csapat büntetések', link: '/widget/teams-fairplay' },
              { text: 'Csapat emberhátrányok', link: '/widget/teams-penalty-killing' },
              { text: 'Csapat emberelőnyök', link: '/widget/teams-powerplay' },
              { text: 'Csapat hatékonyság', link: '/widget/teams-scoring-efficiency' },
              { text: 'Válogatott játékosok', link: '/widget/national-players' },
            ],
          },
          {
            text: 'Extended Elements',
            items: [
              { text: 'Bajnokságok', link: '/widget/extended-championship' },
              { text: 'Kupa Menetrend', link: '/widget/extended-cup-schedule' },
              { text: 'Versenynaptár', link: '/widget/extended-calendar' },
            ],
          },
          {
            text: 'Liga',
            items: [
              { text: 'Rájátszás', link: '/widget/liga-playoffs' },
              { text: 'Liga Menetrend', link: '/widget/liga-schedule' },
              { text: 'Liga Tabella', link: '/widget/liga-standings' },
              { text: 'Statisztikák', link: '/widget/liga-statistics' },
              { text: 'Csapatok', link: '/widget/liga-teams' },
              { text: 'Csapat', link: '/widget/liga-team' },
              { text: 'Játékosok', link: '/widget/liga-players' },
              { text: 'Játékos', link: '/widget/liga-player' },
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
  };
});
