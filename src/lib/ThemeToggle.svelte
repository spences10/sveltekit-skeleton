<script lang="ts">
	import { theme, type Theme, setThemeCookie } from './theme.svelte';

	interface Props {
		currentTheme?: Theme;
	}

	let { currentTheme = 'light' }: Props = $props();

	let isTogglingTheme = $state(false);

	async function handleToggle() {
		if (isTogglingTheme) return;
		isTogglingTheme = true;

		try {
			const newTheme = currentTheme === 'light' ? 'dark' : 'light';
			currentTheme = newTheme;
			theme.setTheme(newTheme);

			// Update theme attribute on HTML element
			if (typeof document !== 'undefined') {
				document.documentElement.setAttribute('data-theme', newTheme);
			}

			// Set cookie via fetch
			await fetch('/api/theme', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ theme: newTheme }),
			});
		} finally {
			isTogglingTheme = false;
		}
	}
</script>

<label class="swap swap-rotate">
	<!-- this hidden checkbox controls the state -->
	<input
		type="checkbox"
		checked={currentTheme === 'dark'}
		onchange={handleToggle}
		disabled={isTogglingTheme}
	/>

	<!-- sun icon -->
	<svg
		class="swap-off h-10 w-10 fill-current"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
	>
		<path
			d="M5.64,4.59L6.3,3.93A8,8,0,0,1,21.07,18.7l-.66.66A9.92,9.92,0,0,0,5.64,4.59ZM5,12a7,7,0,0,0,10.7,5.84l-.66-.66A5.5,5.5,0,0,1,6.66,6.66l.66.66A7,7,0,0,0,5,12Z"
		/>
	</svg>

	<!-- moon icon -->
	<svg
		class="swap-on h-10 w-10 fill-current"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
	>
		<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
	</svg>
</label>

<style>
	:global(html) {
		transition: background-color 0.3s ease, color 0.3s ease;
	}

	label {
		display: inline-flex;
		align-items: center;
		cursor: pointer;
	}
</style>
