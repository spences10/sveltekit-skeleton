<script lang="ts">
	import { themeStore } from './theme.svelte';

	let theme = $state($themeStore);
	let loading = $state(false);

	const handleThemeToggle = async () => {
		loading = true;
		try {
			// Toggle the theme in the store
			const newTheme = themeStore.toggle();
			theme = newTheme;

			// Send the new theme to the server to update the cookie
			const response = await fetch('/api/theme', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ theme: newTheme })
			});

			if (!response.ok) {
				console.error('Failed to update theme preference');
				// Revert on error
				const revertTheme = theme === 'light' ? 'dark' : 'light';
				themeStore.set(revertTheme);
				theme = revertTheme;
			}
		} finally {
			loading = false;
		}
	};

	// Subscribe to store changes
	$effect(() => {
		theme = $themeStore;
	});
</script>

<div class="swap swap-rotate">
	<!-- this hidden checkbox controls the state -->
	<input
		type="checkbox"
		class="theme-controller"
		value={theme}
		checked={theme === 'dark'}
		onchange={handleThemeToggle}
		disabled={loading}
	/>

	<!-- sun icon -->
	<svg
		class="swap-off h-5 w-5 fill-current"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
	>
		<circle cx="12" cy="12" r="5" />
		<path
			d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m5.08 5.08l4.24 4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m5.08-5.08l4.24-4.24"
		/>
	</svg>

	<!-- moon icon -->
	<svg
		class="swap-on h-5 w-5 fill-current"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
	>
		<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
	</svg>
</div>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}

	.theme-controller:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
</style>
