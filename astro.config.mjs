// @ts-check
import { defineConfig } from 'astro/config';
import { cp } from 'node:fs/promises';

const isGitHubPages = process.env.GITHUB_PAGES === 'true';

export default defineConfig({
  site: 'https://nekonoko114.github.io',
  base: isGitHubPages ? '/Genesis-renewal/' : '/',
  integrations: [
    {
      name: 'copy-static-assets',
      hooks: {
        'astro:build:done': async ({ dir }) => {
          await cp(new URL('./assets/', import.meta.url), new URL('./assets/', dir), {
            recursive: true,
          });
        },
      },
    },
  ],
});
