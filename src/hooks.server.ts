import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Get theme from cookie, default to 'light'
	const themeCookie = event.cookies.get('theme');
	const theme = themeCookie === 'dark' ? 'dark' : 'light';

	// Add theme to locals for use in load functions
	event.locals.theme = theme;

	const response = await resolve(event, {
		transformPageChunk({ html }) {
			// Inject theme into HTML for SSR-safe rendering
			return html.replace(
				'<html',
				`<html data-theme="${theme}"`
			);
		}
	});

	return response;
};
