'use client';

import { ReactNode } from 'react';
import type { CmsBlock as CmsBlockShape } from '@propeller-commerce/propeller-v2-core-ui';

export type CmsBlockRenderer = (block: CmsBlockShape) => ReactNode;

/**
 * Two block shapes flow through here:
 *
 *  - Flat/adapter blocks — `{ type: string, data: ... }` (the generic
 *    `CmsBlock` contract; portable across Strapi / Sanity / Prepr).
 *  - Typed blocks — `{ _type: 'hero-banner', ...fields }` (the discriminated
 *    `CmsTypedBlock` union a `CmsProvider.getPage` returns on a `CmsRichPage`).
 *
 * We accept BOTH so a shop can register brand components keyed by either
 * discriminator. `_type` wins when present (the typed contract), else `type`.
 */
type AnyBlock = { type?: string; _type?: string; data?: unknown } & Record<string, unknown>;

/** Discriminator: prefer the typed `_type`, fall back to the flat `type`. */
function blockType(block: unknown): string {
  const b = block as AnyBlock;
  return b._type ?? b.type ?? '';
}

export interface CmsBlockProps {
  block: CmsBlockShape;
  /**
   * Map from block discriminator (`_type` or `type`) → renderer. The consumer
   * registers renderers for the block types its CMS emits; unknown types render
   * nothing in prod (`null`), or a debug box when `debug` is true.
   */
  renderers: Record<string, CmsBlockRenderer>;
  /**
   * When true, unknown block types render a visible debug box. Drive from
   * `process.env.NODE_ENV !== 'production'` at the call site.
   */
  debug?: boolean;
}

export default function CmsBlock({ block, renderers, debug = false }: CmsBlockProps) {
  const type = blockType(block);
  const renderer = renderers[type];
  if (renderer) return <>{renderer(block)}</>;

  if (debug) {
    return (
      <div
        style={{
          padding: '0.75rem',
          margin: '0.5rem 0',
          border: '1px dashed #c33',
          background: '#fdd',
          color: '#900',
          fontFamily: 'monospace',
          fontSize: '0.85rem',
        }}
      >
        Unknown CMS block: <strong>{type}</strong>
      </div>
    );
  }
  return null;
}
