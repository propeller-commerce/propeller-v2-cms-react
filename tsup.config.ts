import { defineConfig } from 'tsup';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Only the context module is client-only. It is built as its own `client`
 * entry and the main entry imports it instead of bundling it, so the page
 * renderer and block dispatcher stay usable from Server Components.
 *
 * esbuild strips module-level `"use client"` directives when bundling
 * (https://github.com/evanw/esbuild/issues/2840), so the directive is
 * prepended to the emitted `client` files after the build.
 */
function prependUseClient(filePath: string): void {
  if (!existsSync(filePath)) return;
  const original = readFileSync(filePath, 'utf8');
  const directive = '"use client";\n';
  if (original.startsWith(directive)) return;
  writeFileSync(filePath, directive + original, 'utf8');
}

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    client: 'src/context/CmsAdapterContext.tsx',
  },
  format: ['esm', 'cjs'],
  outExtension({ format }) {
    return { js: format === 'esm' ? '.js' : '.cjs' };
  },
  dts: true,
  sourcemap: true,
  clean: true,
  target: 'es2022',
  splitting: false,
  treeshake: true,
  esbuildOptions(options) {
    options.jsx = 'automatic';
  },
  esbuildPlugins: [
    {
      name: 'external-client-entry',
      setup(build) {
        const clientFile = `./client${build.initialOptions.outExtension?.['.js'] ?? '.js'}`;
        build.onResolve({ filter: /\/context\/CmsAdapterContext$/ }, (args) =>
          args.kind === 'entry-point' ? undefined : { path: clientFile, external: true },
        );
      },
    },
  ],
  external: ['react', 'react-dom', 'react/jsx-runtime', 'propeller-v2-core-ui'],
  async onSuccess() {
    const distDir = join(process.cwd(), 'dist');
    prependUseClient(join(distDir, 'client.js'));
    prependUseClient(join(distDir, 'client.cjs'));
  },
});
