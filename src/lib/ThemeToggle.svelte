<script lang="ts">
	import { themeStore, type Theme } from './theme.svelte';

	let isDark = $state(false);

	$effect(() => {
		themeStore.subscribe((theme) => {
			isDark = theme === 'dark';
		});
	});

	function handleToggle() {
		themeStore.toggle();
	}
</script>

<button
	class="inline-flex cursor-pointer select-none border-0 bg-transparent p-0"
	onclick={handleToggle}
	aria-label="Toggle theme"
	title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
>
	<!-- sun icon -->
	<svg
		class="h-6 w-6 fill-current transition-opacity duration-300"
		class:opacity-0={isDark}
		class:opacity-100={!isDark}
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		><circle cx="12" cy="12" r="5" /><path
			d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m2.98 2.98l4.24 4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m2.98-2.98l4.24-4.24M19.78 19.78l-4.24-4.24m-2.98-2.98l-4.24-4.24"
		/></svg
	>
	<!-- moon icon -->
	<svg
		class="h-6 w-6 fill-current transition-opacity duration-300"
		class:opacity-0={!isDark}
		class:opacity-100={isDark}
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg
	>
</button>
