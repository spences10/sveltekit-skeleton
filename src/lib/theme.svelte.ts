import { writable } from 'svelte/store';

export type Theme = 'light' | 'dark';

function createThemeStore() {
	// Initialize with 'light' as default
	const { subscribe, set } = writable<Theme>('light');

	return {
		subscribe,
		set,
		toggle: () => {
			let current: Theme = 'light';
			const unsubscribe = subscribe((value) => {
				current = value;
			});

			const newTheme = current === 'light' ? 'dark' : 'light';
			set(newTheme);
			unsubscribe();

			// Update document element
			if (typeof document !== 'undefined') {
				document.documentElement.setAttribute('data-theme', newTheme);
			}

			return newTheme;
		},
		// Initialize theme from document or cookie
		init: (initialTheme: Theme) => {
			set(initialTheme);
			if (typeof document !== 'undefined') {
				document.documentElement.setAttribute('data-theme', initialTheme);
			}
		}
	};
}

export const themeStore = createThemeStore();
