import type { APIRoute } from 'astro';
import apps from '../data/apps.json';

export const prerender = true;

const siteUrl = 'https://vtech-app.com';
const staticPaths = [
	'/',
	'/apps/',
	'/downloads/',
	'/about/',
	'/contact/',
	'/donate/',
	'/privacy/',
];

const urls = [
	...staticPaths,
	...apps.map((app) => `/apps/${app.slug}/`),
];

const escapeXml = (value: string) => value
	.replaceAll('&', '&amp;')
	.replaceAll('<', '&lt;')
	.replaceAll('>', '&gt;')
	.replaceAll('"', '&quot;')
	.replaceAll("'", '&apos;');

export const GET: APIRoute = () => {
	const lastmod = new Date().toISOString().slice(0, 10);
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((path) => `	<url>
		<loc>${escapeXml(new URL(path, siteUrl).toString())}</loc>
		<lastmod>${lastmod}</lastmod>
	</url>`).join('\n')}
</urlset>
`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
		},
	});
};
