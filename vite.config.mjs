import { defineConfig } from 'vite';

export default defineConfig({
  esbuild: {
    jsxFactory: 'h',
    jsxInject: `import h from 'hyperscript'`,
  },
});
