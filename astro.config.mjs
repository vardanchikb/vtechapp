// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
	site: 'https://vtech-app.com',
	output: 'static',
	adapter: cloudflare({
		imageService: 'passthrough',
	}),
});
