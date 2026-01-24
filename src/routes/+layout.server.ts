import type { RequestEvent } from '@sveltejs/kit';

export async function load({ cookies }: RequestEvent) {
	const theme = cookies.get('theme') || 'light';
	return { theme };
}
