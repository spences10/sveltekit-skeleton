import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
	try {
		const { theme } = await request.json();

		// Validate theme
		if (!['light', 'dark'].includes(theme)) {
			return json({ error: 'Invalid theme' }, { status: 400 });
		}

		// Set cookie with 1 year expiration
		cookies.set('theme', theme, {
			path: '/',
			maxAge: 60 * 60 * 24 * 365, // 1 year
			httpOnly: false, // Allow client-side access
			sameSite: 'lax'
		});

		return json({ success: true, theme });
	} catch (error) {
		console.error('Theme API error:', error);
		return json({ error: 'Failed to update theme' }, { status: 500 });
	}
};
