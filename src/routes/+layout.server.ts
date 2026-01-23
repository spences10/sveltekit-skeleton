import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	// Get theme from cookies, default to 'light'
	const theme = (cookies.get('theme') as 'light' | 'dark') || 'light';

	return {
		theme
	};
};
