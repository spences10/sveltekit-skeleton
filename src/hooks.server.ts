import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Get theme from cookies
	const theme = event.cookies.get('theme') || 'light';

	// Pass theme to the page via data attribute
	const response = await resolve(event, {
		transformPageChunk: ({ html }) => {
			// Inject the theme data attribute into the HTML element
			// This prevents flash of wrong theme
			return html.replace(
				'<html lang="en"',
				`<html lang="en" data-theme="${theme}"`
			);
		},
	});

	return response;
};
