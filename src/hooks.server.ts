import { getCookieTheme } from '$lib/theme.svelte';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const cookieString = event.request.headers.get('cookie') ?? undefined;
	const theme = getCookieTheme(cookieString);

	// Make theme available to load functions
	event.locals.theme = theme;

	const response = await resolve(event, {
		transformPageChunk: ({ html }) => {
			// Add data-theme attribute to html element for SSR-safe theme
			return html.replace('<html', `<html data-theme="${theme}"`);
		},
	});

	return response;
};
