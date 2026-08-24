# Changelog

All notable changes to `propeller-v2-cms-react` are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and the project aims to follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html)
once it reaches 1.0. Until then (the `0.x` line) the public API may change
between minor versions; breaking changes are called out in this file.

## [0.1.5] - 2026-08-05

### Changed

- **Widened the `propeller-v2-core-ui` peer range to `>=0.2.4`** (was
  `>=0.2.4 <0.4`). The upper bound forced npm to install a second, older
  core-ui at the tree root whenever another package required a newer one, and
  an app importing core-ui directly then resolved that older copy — reaching
  for an export that only exists in the newer version and failing the build.

  The bound was never protecting anything: this package imports **only types**
  from core-ui (`CmsAdapter`, `CmsBlock`, `CmsPage`, `CmsRichPage`,
  `CmsMenuItem`, `CmsGlobals`, `CmsFetchOptions`), all of which are unchanged
  across every 0.x release in the range. Dropping the ceiling lets one core-ui
  satisfy the whole tree. Removing it entirely, rather than raising it to the
  next minor, stops this recurring each time core-ui ships a feature.

## [0.1.4] - 2026-07-27

### Fixed

- **`<CmsPageRenderer>` / `<CmsBlock>` now render typed blocks.** The dispatcher
  keyed only on the flat `block.type` discriminator, so a `CmsRichPage` — the
  typed shape a `CmsProvider.getPage` returns, whose blocks carry `_type`
  (`{ _type: 'hero-banner', ...fields }`) rather than `{ type, data }` — matched
  no renderer and rendered nothing. Both components now resolve the discriminator
  as `_type ?? type`, so a shop can register renderers keyed by either. Fully
  backward-compatible: flat `{ type, data }` blocks still dispatch on `type`.
- **`<CmsPageRenderer page>` accepts `CmsPage | CmsRichPage`.** Previously typed
  `CmsPage` only, which rejected the richer page a `CmsProvider` returns.

### Changed

- **Widened the `@propeller-commerce/propeller-v2-core-ui` peer to
  `>=0.2.4 <0.4`** (was `^0.2.4`, i.e. 0.2.x only). This package imports core-ui
  **types only** (no runtime reference), so it is compatible across the 0.3.x
  line; the strict caret caused an `ERESOLVE` in consumers already on core-ui
  0.3.x (via react-ui 0.6.x). Mirrors the same fix shipped in
  `propeller-v2-cms-vue` 0.1.4.

## [0.1.3] - 2026-07-08

### Changed

- Bumped the `@propeller-commerce/propeller-sdk-v2` dev dependency to `^0.12.0`
  to build and test against the SDK's 0.12.0 release. No API change.

## [0.1.2] - 2026-06-24

### Documentation

- **Corrected the README's adapter story.** It told users to
  `import { createStrapiAdapter } from 'propeller-v2-cms-adapter-strapi'`, but
  no `propeller-v2-cms-adapter-*` package is published. This package is
  adapter-agnostic: the minimal usage now shows supplying your own `CmsAdapter`
  (getPage / getMenu / getGlobals), and points at the Propeller Next
  boilerplate's built-in `lib/cms` providers (Strapi + Prepr, selected by
  `CMS_PROVIDER`) as the ready-made option. Removed the dead
  `cms-adapter-strapi` link and updated the package description.
- Added a link to the canonical docs site
  (https://propeller-commerce.github.io/propeller-v2-cms-react/).

## [0.1.1] - 2026-06-02

### Added

- **Docusaurus documentation site** under `docs/`, deployed to
  https://propeller-commerce.github.io/propeller-v2-cms-react/ via a
  new `.github/workflows/docs.yml` GitHub Action (build + GitHub Pages
  deploy). Covers getting-started, the `<CmsAdapterProvider>` /
  `<CmsPageRenderer>` / `<CmsBlock>` / `useCms()` APIs, and patterns
  for homepage fallback, catch-all routing, preview mode, multi-locale,
  and per-block data fetching.
- **`release_to_github` stage in `.gitlab-ci.yml`** — automatic GitHub
  Release on every `Release X.Y.Z` push, mirroring the SDK pattern.

### Notes

No runtime / public-API changes — this is a tooling release that
backfills documentation + release automation for the existing 0.1.0
surface. Consumers do not need to update.

## [0.1.0] - 2026-06-01

Initial release. A small React layer over the framework-agnostic
`CmsAdapter` contract from `propeller-v2-core-ui`.

### Added

- **`<CmsAdapterProvider adapter={...}>`** — wires a `CmsAdapter` instance
  into the React tree. Wire once at the app root, alongside
  `<PropellerDepsProvider>`. Pass `null` for shops without a CMS — the
  catch-all CMS route returns 404 and the homepage renders its static
  fallback. Nothing breaks downstream.
- **`useCms()`** — read the installed adapter from context. Returns `null`
  when the shop wasn't configured with a CMS. Intended for client islands
  that need optional adapter access (preview banners, edit-this-page
  links). Server data fetchers should construct the adapter directly and
  pass results into pages, not call this hook.
- **`<CmsPageRenderer page={...} renderers={...}>`** — renders a
  `CmsPage`'s block list. Iterates `page.blocks`, dispatches each block
  through `<CmsBlock>`.
- **`<CmsBlock block={...} renderers={...} debug={...}>`** — single-block
  dispatcher. Takes a `renderers` map keyed by `block.type`. Unknown
  block types render `null` in prod, or a visible debug box when `debug`
  is true. Block components are the shop's responsibility — this package
  ships none, because brand styling, layout, and content shape vary too
  much to share.

### Requires

- `propeller-v2-core-ui` ≥ 0.2.0 (for the `CmsAdapter`, `CmsPage`,
  `CmsBlock` contract).
- `react` ≥ 18.
