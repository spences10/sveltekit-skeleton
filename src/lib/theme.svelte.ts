import { writable } from 'svelte/store';

export type Theme = 'light' | 'dark';

const THEME_COOKIE_NAME = 'theme';
const THEME_KEY = 'theme';

function createThemeStore() {
	const { subscribe, set } = writable<Theme>('light');

	return {
		subscribe,
		set,
		toggle: () => {
			let current: Theme = 'light';
			subscribe((value) => {
				current = value;
			})();
			const newTheme = current === 'light' ? 'dark' : 'light';
			set(newTheme);
			applyTheme(newTheme);
			setThemeCookie(newTheme);
		},
		init: (theme: Theme) => {
			set(theme);
			applyTheme(theme);
		}
	};
}

export const themeStore = createThemeStore();

export function applyTheme(theme: Theme) {
	if (typeof document !== 'undefined') {
		document.documentElement.setAttribute('data-theme', theme);
	}
}

export function setThemeCookie(theme: Theme) {
	if (typeof document !== 'undefined') {
		// Set cookie with 1 year expiration
		const expirationDate = new Date();
		expirationDate.setFullYear(expirationDate.getFullYear() + 1);
		document.cookie = `${THEME_COOKIE_NAME}=${theme}; expires=${expirationDate.toUTCString()}; path=/`;
	}
}

export function getThemeFromCookie(): Theme | null {
	if (typeof document === 'undefined') return null;

	const cookies = document.cookie.split(';');
	for (const cookie of cookies) {
		const [name, value] = cookie.trim().split('=');
		if (name === THEME_COOKIE_NAME) {
			return (value === 'dark' ? 'dark' : 'light') as Theme;
		}
	}
	return null;
}
