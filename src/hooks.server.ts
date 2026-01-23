import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Get theme from cookie, default to 'light'
	const theme = event.cookies.get('theme') || 'light';

	// Transform the HTML to include the theme in the data-theme attribute
	const response = await resolve(event, {
		transformPageChunk: ({ html }) => {
			return html.replace('%sveltekit.theme%', theme);
		}
	});

	return response;
};
