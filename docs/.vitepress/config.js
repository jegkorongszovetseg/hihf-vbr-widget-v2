import { loadEnv } from 'vite';
import { defineConfig } from 'vitepress';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    base: env.VITE_DOCS_BASE,
    lang: 'hu-HU',
    title: 'MJSZ VBR Widgetek',
    description: 'Just playing around.',
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
              { text: 'Elérhető nyelvek', link: '/widget/available-languages' },
              { text: 'Elérhető widgetek', link: '/widget/available-widgets' },
            ],
          },
          {
            text: 'Widgetek',
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
            text: 'Kibővített Widgetek',
            items: [
              { text: 'Statisztikák', link: '/widget/statistics' },
              { text: 'Liga Menetrend', link: '/widget/schedule-liga' },
            ],
          },
        ],
      },
      docFooter: {
        prev: 'Előző',
        next: 'PKövetkező',
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
  };
});
