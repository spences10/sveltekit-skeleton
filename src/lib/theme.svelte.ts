import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export type Theme = 'light' | 'dark';

// Initialize store with default theme
function createThemeStore() {
	// Server-side: start with 'light' as default
	// Client-side: will be hydrated from SSR
	let initialTheme: Theme = 'light';

	// If we're in the browser and localStorage is available, use it as fallback
	// The actual theme comes from HTML data-theme attribute (set by server)
	if (browser && localStorage) {
		const stored = localStorage.getItem('theme') as Theme | null;
		if (stored === 'light' || stored === 'dark') {
			initialTheme = stored;
		}
	}

	const { subscribe, set } = writable<Theme>(initialTheme);

	return {
		subscribe,
		set,
		toggle: () => {
			let newTheme: Theme;
			subscribe((current) => {
				newTheme = current === 'light' ? 'dark' : 'light';
				return current;
			})();
			set(newTheme!);
		},
	};
}

export const theme = createThemeStore();

// Function to update the HTML element's data-theme
export function applyTheme(newTheme: Theme) {
	if (browser) {
		document.documentElement.setAttribute('data-theme', newTheme);
		localStorage.setItem('theme', newTheme);
		theme.set(newTheme);
	}
}

// Function to get current theme from HTML element (SSR-safe)
export function getCurrentTheme(): Theme {
	if (browser) {
		const dataTheme = document.documentElement.getAttribute('data-theme');
		if (dataTheme === 'light' || dataTheme === 'dark') {
			return dataTheme;
		}
	}
	return 'light';
}
