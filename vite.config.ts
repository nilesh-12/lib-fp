import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: './lib/main.ts',
      name: 'LibFP',
      fileName: format => `lib-fp.${format}.js`
    }
  }
});
