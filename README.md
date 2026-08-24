# propeller-v2-cms-react

CMS page renderer + block dispatcher + adapter provider for Propeller Commerce React shops.

📖 **Docs:** https://propeller-commerce.github.io/propeller-v2-cms-react/

This package contains the **rendering + provider layer** only. It is adapter-agnostic: you supply a `CmsAdapter` implementation (the framework-agnostic contract from [propeller-v2-core-ui](https://gitlab.com/propellor-eu/cloud/frontend/ui/propeller-v2-core-ui)) and this package renders the pages it returns. There is no adapter to install from npm — write one for your CMS, or use the provider already built into the Propeller Next boilerplate's `lib/cms` (Strapi + Prepr, selected at runtime by `CMS_PROVIDER`).

## What's in the box

- **`<CmsAdapterProvider>`** — wires a `CmsAdapter` instance into the React tree.
- **`useCms()`** — reads the adapter from context (for client islands that need optional CMS access).
- **`<CmsPageRenderer>`** — renders a `CmsPage`'s block list.
- **`<CmsBlock>`** — single-block dispatcher; takes a `renderers` map keyed by `block.type`.

## Minimal usage

```tsx
import { CmsAdapterProvider, CmsPageRenderer } from 'propeller-v2-cms-react';
import type { CmsAdapter } from 'propeller-v2-core-ui';

// Supply your own adapter — anything implementing the CmsAdapter contract
// (getPage / getMenu / getGlobals). Wrap your CMS's SDK, or hand-roll fetch.
const adapter: CmsAdapter = {
  getPage: async (slug) => fetchPageFromYourCms(slug),
  getMenu: async (name) => fetchMenuFromYourCms(name),
  getGlobals: async () => fetchGlobalsFromYourCms(),
};

function App({ children }) {
  return (
    <CmsAdapterProvider adapter={adapter}>
      {children}
    </CmsAdapterProvider>
  );
}

// In a page:
function Page({ page }) {
  return (
    <CmsPageRenderer
      page={page}
      renderers={{
        hero: (block) => <HeroBlock data={block.data} />,
        text: (block) => <TextBlock data={block.data} />,
      }}
    />
  );
}
```

Block components are the shop's responsibility — this package ships no opinionated blocks because shop styling, layout, and content shape vary too much to share. Register whatever your CMS emits.

## Pair with

- [propeller-v2-core-ui](https://gitlab.com/propellor-eu/cloud/frontend/ui/propeller-v2-core-ui) — the framework-agnostic `CmsAdapter` contract this package builds on.
- [propeller-v2-react-ui](https://gitlab.com/propellor-eu/cloud/frontend/ui/propeller-v2-react-ui) — commerce components (cart, checkout, catalog).

> Looking for a ready-made adapter? The Propeller **Next boilerplate** ships
> Strapi and Prepr providers in its `lib/cms`, selected at runtime via the
> `CMS_PROVIDER` env var — no separate adapter package to install.
