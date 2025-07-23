import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	resolve: {
		alias: {
			$src: path.resolve('src'),
			$lib: path.resolve('src/lib')
		}
	}
});
