import type { LayoutServerLoad } from './$types';
import type { Theme } from '$lib/theme.svelte';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const theme = (cookies.get('theme') as Theme) || 'light';
	return {
		theme
	};
};
