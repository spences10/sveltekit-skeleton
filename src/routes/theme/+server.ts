import { json, error } from '@sveltejs/kit';
import type { RequestHandler, RequestEvent } from '@sveltejs/kit';

export const POST: RequestHandler = async (event: RequestEvent) => {
	const { request, cookies } = event;
	const data = await request.json();
	const theme = data.theme as string;

	// Validate theme value
	if (theme !== 'light' && theme !== 'dark') {
		return error(400, 'Invalid theme');
	}

	// Set cookie with 1-year expiration
	cookies.set('theme', theme, {
		path: '/',
		maxAge: 60 * 60 * 24 * 365, // 1 year
		sameSite: 'lax',
	});

	return json({ theme });
};
