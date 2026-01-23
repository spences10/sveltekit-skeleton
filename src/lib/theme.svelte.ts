export type Theme = 'light' | 'dark';

let theme = $state<Theme>('light');

export const themeState = {
	get current(): Theme {
		return theme;
	},
	set(value: Theme) {
		theme = value;
		if (typeof document !== 'undefined') {
			document.documentElement.setAttribute('data-theme', value);
		}
	},
	toggle() {
		this.set(theme === 'light' ? 'dark' : 'light');
	}
};
