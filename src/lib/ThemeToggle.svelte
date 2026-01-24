<script lang="ts">
	import { theme, applyTheme, getCurrentTheme } from './theme.svelte';
	import { onMount } from 'svelte';

	let currentTheme = $state<'light' | 'dark'>('light');
	let isClient = $state(false);

	onMount(() => {
		isClient = true;
		// Set initial theme from HTML element
		currentTheme = getCurrentTheme();
		// Subscribe to theme changes
		const unsubscribe = theme.subscribe((t) => {
			currentTheme = t;
		});
		return unsubscribe;
	});

	function handleToggle() {
		const newTheme = currentTheme === 'light' ? 'dark' : 'light';
		applyTheme(newTheme);

		// Sync with server via API (fire and forget)
		fetch('/theme', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ theme: newTheme }),
		}).catch(() => {
			// Silently fail - theme is already updated on client
		});
	}
</script>

<!-- Swap component similar to daisyUI toggle but customizable -->
<label class="swap swap-rotate">
	<!-- This hidden checkbox controls the state -->
	<input
		type="checkbox"
		checked={currentTheme === 'dark'}
		onchange={handleToggle}
		disabled={!isClient}
		aria-label="Toggle dark mode"
	/>

	<!-- Sun icon (light mode) -->
	<svg
		class="swap-off h-5 w-5 fill-current"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
	>
		<path
			d="M5.64,4.59e-07C5.11,0.89 4.8,1.95 4.8,3.09C4.8,6.81 7.66,9.9 11.25,9.9C12.39,9.9 13.45,9.59 14.34,9.05L13.41,8.12C12.78,8.4 12.09,8.59 11.35,8.59C8.41,8.59 6.09,6.27 6.09,3.32C6.09,2.58 6.28,1.89 6.56,1.26L5.64,4.59e-07M19.78,4.45L18.29,2.96C17.68,3.62 17.26,4.41 17.08,5.28C16.41,5.08 15.69,4.97 14.95,4.97C12.8,4.97 10.95,6.02 9.91,7.57L8.5,6.16C9.66,4.88 11.25,4.04 13.05,3.71C13.29,2.93 13.77,2.25 14.4,1.75L12.92,0.26C11.97,1.16 11.25,2.37 11.01,3.74C9.5,3.87 8.15,4.65 7.35,5.84L5.94,4.43C7.35,2.92 9.3,2 11.5,2C12.3,2 13.08,2.1 13.84,2.27C14.17,1.33 14.84,0.55 15.7,0.05L17.19,1.54C16.83,1.87 16.54,2.27 16.36,2.73C17.42,2.95 18.36,3.54 19.04,4.31L19.78,4.45M11.5,7C10.12,7 9,8.12 9,9.5C9,10.88 10.12,12 11.5,12C12.88,12 14,10.88 14,9.5C14,8.12 12.88,7 11.5,7Z"
		/>
	</svg>

	<!-- Moon icon (dark mode) -->
	<svg
		class="swap-on h-5 w-5 fill-current"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
	>
		<path
			d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
		/>
	</svg>
</label>

<style>
	.swap {
		position: relative;
		display: inline-block;
		width: auto;
		height: auto;
	}

	.swap input {
		display: none;
	}

	.swap.swap-rotate input:checked ~ .swap-on,
	.swap.swap-rotate input:not(:checked) ~ .swap-off {
		display: block;
	}

	.swap.swap-rotate input:checked ~ .swap-off,
	.swap.swap-rotate input:not(:checked) ~ .swap-on {
		display: none;
	}

	.swap svg {
		transition: all 0.3s ease-in-out;
	}

	.swap.swap-rotate input:checked ~ svg {
		transform: rotate(180deg);
	}

	.swap input:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}

	.swap input:not(:disabled) {
		cursor: pointer;
	}
</style>
