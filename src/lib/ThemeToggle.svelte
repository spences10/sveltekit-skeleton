<script lang="ts">
	import { getThemeContext } from './theme.svelte';

	const { theme, toggleTheme } = getThemeContext();

	async function handleToggle() {
		toggleTheme();
		// Persist to server
		await fetch('/?/toggleTheme', {
			method: 'POST'
		});
	}
</script>

<div class="flex items-center gap-2">
	<label class="swap swap-rotate">
		<input
			type="checkbox"
			checked={theme === 'dark'}
			onchange={handleToggle}
			class="theme-controller"
		/>
		<!-- sun icon -->
		<svg
			class="swap-off h-5 w-5 fill-current"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
		>
			<path
				d="M5.64,4.59e-07A3 3 0 0,1 8.64,3V5A5 5 0 0,0 3.64,10H1.64A3 3 0 0,1 5.64,4.59e-07M21 10H19A5 5 0 0,0 14 15V17A3 3 0 0,1 17 14V12A3 3 0 0,1 20 9A3 3 0 0,1 21 10M7 13A4 4 0 0,0 11 17A4 4 0 0,0 7 13Z"
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
	</label>
</div>

<style>
	:global(html[data-theme='dark']) :global(.swap-off) {
		display: none;
	}

	:global(html[data-theme='light']) :global(.swap-on) {
		display: none;
	}
</style>
