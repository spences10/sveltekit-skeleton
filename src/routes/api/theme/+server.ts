import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const { theme } = await request.json();

	// Validate theme value
	if (theme !== 'light' && theme !== 'dark') {
		return json({ error: 'Invalid theme' }, { status: 400 });
	}

	// Set cookie with theme preference
	// Cookie expires in 1 year
	cookies.set('theme', theme, {
		path: '/',
		maxAge: 60 * 60 * 24 * 365,
		httpOnly: false,
		sameSite: 'lax'
	});

	return json({ success: true, theme });
};
