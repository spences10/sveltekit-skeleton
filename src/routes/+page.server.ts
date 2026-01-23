import type { Actions } from './$types';

export const actions: Actions = {
	setTheme: async ({ request, cookies }) => {
		const data = await request.formData();
		const theme = data.get('theme') as 'light' | 'dark';

		if (theme === 'light' || theme === 'dark') {
			cookies.set('theme', theme, {
				path: '/',
				maxAge: 60 * 60 * 24 * 365, // 1 year
				sameSite: 'lax',
				httpOnly: false,
				secure: process.env.NODE_ENV === 'production'
			});
		}

		return { success: true };
	}
};
