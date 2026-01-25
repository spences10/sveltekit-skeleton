import { writable } from 'svelte/store';

export type Theme = 'light' | 'dark';

const THEME_COOKIE_NAME = 'theme';
const THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

function createThemeStore() {
	const { subscribe, set } = writable<Theme>('light');

	return {
		subscribe,
		setTheme: (theme: Theme) => {
			set(theme);
		},
		toggleTheme: (currentTheme: Theme) => {
			const newTheme = currentTheme === 'light' ? 'dark' : 'light';
			set(newTheme);
			return newTheme;
		},
	};
}

export const theme = createThemeStore();

export function getCookieTheme(cookieString: string | undefined): Theme {
	if (!cookieString) return 'light';

	const themeMatch = cookieString.match(new RegExp(`(^|;)\\s*${THEME_COOKIE_NAME}=([^;]+)`));
	const value = themeMatch?.[2];

	return (value === 'dark' || value === 'light') ? value : 'light';
}

export function setThemeCookie(theme: Theme, cookieHeader: string = ''): string {
	const cookieValue = `${THEME_COOKIE_NAME}=${theme}; Path=/; Max-Age=${THEME_COOKIE_MAX_AGE}; SameSite=Lax`;
	return cookieValue;
}
