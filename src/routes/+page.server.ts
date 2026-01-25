import { fail } from '@sveltejs/kit';

export const actions = {
	toggleTheme: async ({ cookies, locals }: { cookies: any; locals: App.Locals }) => {
		try {
			const currentTheme = locals.theme || 'light';
			const newTheme = currentTheme === 'light' ? 'dark' : 'light';

			// Set cookie to persist theme (1 year expiration)
			cookies.set('theme', newTheme, {
				path: '/',
				maxAge: 60 * 60 * 24 * 365
			});

			// Update locals for subsequent requests
			locals.theme = newTheme;

			return { theme: newTheme };
		} catch (error) {
			return fail(500, { message: 'Failed to toggle theme' });
		}
	}
};
