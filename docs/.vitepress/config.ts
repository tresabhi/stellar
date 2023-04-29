import { DefaultTheme, defineConfig } from 'vitepress';
import { getSidebar } from 'vitepress-plugin-auto-sidebar';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Stellar',
  description: '🚀 Professional blueprint editor for Spaceflight Simulator',
  base: '/stellar/',

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
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
