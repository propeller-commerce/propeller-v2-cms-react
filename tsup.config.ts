import { defineConfig } from 'tsup';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

/**
 * The bundled output gets a `"use client"` banner via a post-build step
 * because esbuild strips module-level `"use client"` directives during
 * bundling (https://github.com/evanw/esbuild/issues/2840). Tsup's `banner`
 * option suffers the same issue, so we prepend to the emitted files instead.
 */
function prependUseClient(filePath: string): void {
  if (!existsSync(filePath)) return;
  const original = readFileSync(filePath, 'utf8');
  const directive = '"use client";\n';
  if (original.startsWith(directive)) return;
  writeFileSync(filePath, directive + original, 'utf8');
}

export default defineConfig({
  entry: { index: 'src/index.ts' },
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
  external: ['react', 'react-dom', 'react/jsx-runtime', 'propeller-v2-core-ui'],
  async onSuccess() {
    const distDir = join(process.cwd(), 'dist');
    prependUseClient(join(distDir, 'index.js'));
    prependUseClient(join(distDir, 'index.cjs'));
  },
});
