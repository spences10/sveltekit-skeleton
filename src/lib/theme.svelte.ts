export type Theme = 'light' | 'dark';

let theme = $state<Theme>('light');

export function getTheme() {
	return theme;
}

export function setTheme(newTheme: Theme) {
	theme = newTheme;
	if (typeof document !== 'undefined') {
		document.documentElement.setAttribute('data-theme', newTheme);
	}
}

export function initializeTheme(initialTheme: Theme) {
	theme = initialTheme;
}
