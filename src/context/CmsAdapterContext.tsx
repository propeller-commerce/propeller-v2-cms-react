'use client';

import { createContext, useContext, ReactNode } from 'react';
import type { CmsAdapter } from '@propeller-commerce/propeller-v2-core-ui';

/**
 * Carries the CMS adapter through the React tree.
 *
 * Wire ONCE at the app root, alongside (or inside) `<PropellerDepsProvider>`:
 *
 *   <PropellerDepsProvider value={{ graphqlClient, services, currency, configuration }}>
 *     <CmsAdapterProvider adapter={strapiAdapter}>
 *       {children}
 *     </CmsAdapterProvider>
 *   </PropellerDepsProvider>
 *
 * Pass `null` for shops without a CMS — the catch-all CMS route returns 404
 * and the homepage renders its `<HomeFallback>`. The provider is a no-op
 * when null; nothing breaks downstream.
 */
const CmsAdapterContext = createContext<CmsAdapter | null>(null);

export interface CmsAdapterProviderProps {
  adapter: CmsAdapter | null;
  children: ReactNode;
}

export function CmsAdapterProvider({ adapter, children }: CmsAdapterProviderProps) {
  return (
    <CmsAdapterContext.Provider value={adapter}>
      {children}
    </CmsAdapterContext.Provider>
  );
}

/**
 * Return the installed CMS adapter, or `null` when the shop wasn't
 * configured with one (or the component is rendering outside the provider).
 *
 * Server-side data fetchers should NOT call this hook — they should receive
 * the adapter via prop drilling or construct it directly in their server
 * entry. This is for client islands that need to check "do we have a CMS at
 * all" before rendering optional UI (preview banners, edit-page links).
 */
export function useCms(): CmsAdapter | null {
  return useContext(CmsAdapterContext);
}
