/**
 * propeller-v2-cms-react — public surface.
 *
 * A small React layer over the framework-agnostic CMS contract from
 * `propeller-v2-core-ui`. Three pieces:
 *
 *   - <CmsAdapterProvider> + useCms()  — plumbing for the adapter
 *   - <CmsPageRenderer>                 — renders a CmsPage's block list
 *   - <CmsBlock>                        — single-block dispatcher
 *
 * The shop wires `<CmsAdapterProvider adapter={...}>` once at the root
 * (alongside `<PropellerDepsProvider>`). Server data fetchers construct the
 * adapter directly and pass results into pages; client components call
 * `useCms()` when they need optional adapter access (preview banners etc.).
 *
 * Block component registration is the consumer's job — pass a `renderers`
 * map keyed by `block.type` to <CmsPageRenderer>. The package ships no
 * opinionated block components yet; commerce shops typically register their
 * own brand-styled <HeroBlock>, <TextBlock>, <ProductCarouselBlock>, etc.
 */

// ── Re-export the contract from core for ergonomic single-import usage ──────
export type {
  CmsAdapter,
  CmsBlock as CmsBlockShape,
  CmsPage,
  CmsMenuItem,
  CmsGlobals,
  CmsFetchOptions,
} from '@propeller-commerce/propeller-v2-core-ui';

// ── Context + hook ──────────────────────────────────────────────────────────
export {
  CmsAdapterProvider,
  useCms,
  type CmsAdapterProviderProps,
} from './context/CmsAdapterContext';

// ── Components ──────────────────────────────────────────────────────────────
export {
  default as CmsBlock,
  type CmsBlockProps,
  type CmsBlockRenderer,
} from './components/CmsBlock';
export {
  default as CmsPageRenderer,
  type CmsPageRendererProps,
} from './components/CmsPageRenderer';
