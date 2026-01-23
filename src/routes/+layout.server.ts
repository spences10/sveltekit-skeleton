import type { LayoutServerLoad } from './$types';
import type { Theme } from '$lib/theme.svelte';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const themeCookie = cookies.get('theme') || 'light';
	const theme: Theme = themeCookie === 'dark' ? 'dark' : 'light';

	return {
		theme
	};
};
