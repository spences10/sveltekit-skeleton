import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { setThemeCookie } from '$lib/theme.svelte';

export const POST: RequestHandler = async ({ request }) => {
	const { theme } = await request.json();

	if (!['light', 'dark'].includes(theme)) {
		return json({ error: 'Invalid theme' }, { status: 400 });
	}

	const cookieHeader = setThemeCookie(theme);

	return json(
		{ success: true, theme },
		{
			headers: {
				'Set-Cookie': cookieHeader,
			},
		}
	);
};
