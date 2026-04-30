import { writeFileSync } from 'fs';

const config = {
	name: 'vtechapp',
	compatibility_date: '2026-04-15',
	main: 'dist/server/entry.mjs',
	no_bundle: true,
	rules: [{ type: 'ESModule', globs: ['**/*.js', '**/*.mjs'] }],
	assets: { binding: 'ASSETS', directory: 'dist/client' },
	observability: { enabled: true },
};

writeFileSync('wrangler.deploy.json', JSON.stringify(config, null, '\t'));
console.log('✓ wrangler.deploy.json written');
