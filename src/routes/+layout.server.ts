import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const theme = cookies.get('theme') || 'light';

	return {
		theme: theme as 'light' | 'dark'
	};
};
