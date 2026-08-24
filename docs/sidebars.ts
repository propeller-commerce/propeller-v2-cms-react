import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'index',
    'getting-started',
    {
      type: 'category',
      label: 'API',
      collapsed: false,
      items: ['provider', 'page-renderer', 'block', 'use-cms'],
    },
    'patterns',
    'changelog',
  ],
};

export default sidebars;
