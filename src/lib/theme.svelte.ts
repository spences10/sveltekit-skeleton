import { getContext, setContext } from 'svelte';

export type Theme = 'light' | 'dark';

interface ThemeContext {
	theme: Theme;
	toggleTheme: () => void;
}

const THEME_KEY = Symbol('theme');

export function initThemeContext(initialTheme: Theme = 'light'): ThemeContext {
	let theme = $state(initialTheme);

	const context: ThemeContext = {
		get theme() {
			return theme;
		},
		toggleTheme() {
			theme = theme === 'light' ? 'dark' : 'light';
		}
	};

	setContext(THEME_KEY, context);
	return context;
}

export function getThemeContext(): ThemeContext {
	return getContext<ThemeContext>(THEME_KEY);
}
