import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.languagelayouts.com',
  integrations: [sitemap()],
});
