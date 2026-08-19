// @ts-check
import { defineConfig } from 'astro/config';
import { cp } from 'node:fs/promises';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

const isGitHubPages = process.env.GITHUB_PAGES === 'true';

export default defineConfig({
  site: isGitHubPages ? 'https://nekonoko114.github.io' : 'https://genesis-llc.co.jp',
  base: isGitHubPages ? '/Genesis-renewal/' : '/',
  adapter: isGitHubPages ? undefined : cloudflare(),
  integrations: [
    react(),
    sitemap(),
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

