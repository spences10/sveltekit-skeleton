import type { Actions } from './$types';
import type { Theme } from '$lib/theme.svelte';

export const actions = {
	setTheme: async ({ request, cookies }) => {
		const data = await request.formData();
		const theme = data.get('theme') as Theme;

		if (theme === 'light' || theme === 'dark') {
			cookies.set('theme', theme, {
				path: '/',
				maxAge: 60 * 60 * 24 * 365, // 1 year
				sameSite: 'lax',
				httpOnly: false
			});

			return { success: true };
		}

		return { success: false };
	}
} satisfies Actions;
