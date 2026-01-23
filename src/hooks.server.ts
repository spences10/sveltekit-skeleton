import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Read theme from cookie
	const theme = event.cookies.get('theme') || 'light';

	// Store theme in locals so it's available to load functions
	event.locals.theme = theme as 'light' | 'dark';

	// Resolve the request with the theme set on the HTML element
	const response = await resolve(event, {
		transformPageChunk: ({ html }) => {
			return html.replace('%data-theme%', theme);
		}
	});

	return response;
};
