'use client';

import type { CmsPage, CmsRichPage } from '@propeller-commerce/propeller-v2-core-ui';
import CmsBlock, { type CmsBlockRenderer } from './CmsBlock';

export interface CmsPageRendererProps {
  /**
   * Accepts either page shape:
   *  - `CmsPage`     — flat blocks (`{ type, data }`), the adapter contract.
   *  - `CmsRichPage` — typed blocks (`{ _type, ...fields }`), what a
   *    `CmsProvider.getPage` returns.
   * <CmsBlock> resolves the discriminator (`_type ?? type`) for either.
   */
  page: CmsPage | CmsRichPage;
  /** Block-discriminator → renderer map. See <CmsBlock>. */
  renderers: Record<string, CmsBlockRenderer>;
  /** Show debug boxes for unknown block types. */
  debug?: boolean;
  /** Optional wrapper className. */
  className?: string;
}

/** Stable per-block key working for both flat (`type`) and typed (`_type`). */
function blockKey(block: unknown, i: number): string {
  const b = block as { type?: string; _type?: string };
  return `${b._type ?? b.type ?? 'block'}-${i}`;
}

export default function CmsPageRenderer({
  page,
  renderers,
  debug = false,
  className,
}: CmsPageRendererProps) {
  return (
    <div className={className} data-cms-page-id={String(page.id)}>
      {page.blocks.map((block, i) => (
        <CmsBlock
          key={blockKey(block, i)}
          block={block as CmsPage['blocks'][number]}
          renderers={renderers}
          debug={debug}
        />
      ))}
    </div>
  );
}
