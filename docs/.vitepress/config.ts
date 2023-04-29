import { readdirSync } from 'fs';
import { DefaultTheme, defineConfig } from 'vitepress';
import { getSidebar } from 'vitepress-plugin-auto-sidebar';

export default defineConfig({
  title: 'Stellar',
  description: '🚀 Professional blueprint editor for Spaceflight Simulator',
  base: '/stellar/',

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/about/what-is-stellar' },
      {
        text: 'Changelogs',
        link: `/changelogs/${readdirSync('docs/changelogs').pop()}`,
      },
    ],

    sidebar: getSidebar({
      collapsed: false,
      contentDirs: ['changelogs', 'about'],
      contentRoot: '/docs/',
    }) as DefaultTheme.Sidebar,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/tresabhi/stellar' },
    ],
  },
});
