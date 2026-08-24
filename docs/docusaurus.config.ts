import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import {themes as prismThemes} from 'prism-react-renderer';

const config: Config = {
  title: 'Propeller CMS React',
  tagline: 'CMS page renderer + block dispatcher for Propeller React shops',
  favicon: 'img/favicon.png',

  url: 'https://propeller-commerce.github.io',
  baseUrl: '/propeller-v2-cms-react/',
  organizationName: 'propeller-commerce',
  projectName: 'propeller-v2-cms-react',
  trailingSlash: false,

  onBrokenLinks: 'warn',
  onBrokenAnchors: 'warn',
  markdown: {hooks: {onBrokenMarkdownLinks: 'warn'}},

  i18n: {defaultLocale: 'en', locales: ['en']},

  presets: [
    [
      'classic',
      {
        docs: {
          path: 'content',
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {customCss: './src/css/custom.css'},
        sitemap: {changefreq: 'weekly', priority: 0.5},
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.png',
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
      disableSwitch: false,
    },
    navbar: {
      title: 'Propeller CMS React',
      logo: {
        alt: 'Propeller',
        src: 'img/logo.png',
        srcDark: 'img/logo-dark.png',
        height: 30,
      },
      items: [
        {to: '/getting-started', label: 'Getting started', position: 'left'},
        {to: '/provider', label: 'Provider', position: 'left'},
        {to: '/page-renderer', label: 'PageRenderer', position: 'left'},
        {to: '/block', label: 'Block', position: 'left'},
        {to: '/changelog', label: 'Changelog', position: 'left'},
        {
          href: 'https://github.com/propeller-commerce/propeller-v2-cms-react',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {label: 'Getting started', to: '/getting-started'},
            {label: 'Provider', to: '/provider'},
            {label: 'Page renderer', to: '/page-renderer'},
            {label: 'Block dispatcher', to: '/block'},
          ],
        },
        {
          title: 'Related packages',
          items: [
            {
              label: 'Core UI (CmsAdapter contract)',
              href: 'https://propeller-commerce.github.io/propeller-v2-core-ui/',
            },
            {
              label: 'React UI',
              href: 'https://propeller-commerce.github.io/propeller-v2-react-ui/',
            },
            {
              label: 'CMS Vue (mirror)',
              href: 'https://propeller-commerce.github.io/propeller-v2-cms-vue/',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {label: 'Changelog', to: '/changelog'},
            {
              label: 'GitHub',
              href: 'https://github.com/propeller-commerce/propeller-v2-cms-react',
            },
            {
              label: 'Propeller Commerce',
              href: 'https://propeller-commerce.com',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Propeller Commerce.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json'],
    },
  } satisfies Preset.ThemeConfig,

  plugins: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        indexDocs: true,
        indexBlog: false,
        docsRouteBasePath: '/',
      },
    ],
  ],
};

export default config;
