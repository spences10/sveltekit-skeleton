// Theme state management with Svelte 5 runes
export type Theme = 'light' | 'dark';

class ThemeState {
	current = $state<Theme>('light');

	constructor(initialTheme: Theme = 'light') {
		this.current = initialTheme;
	}

	toggle() {
		this.current = this.current === 'light' ? 'dark' : 'light';
	}

	set(theme: Theme) {
		this.current = theme;
	}
}

export const theme = new ThemeState();
