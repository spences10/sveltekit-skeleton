<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import { themeState } from '$lib/theme.svelte';
	import { onMount } from 'svelte';

	let { children, data } = $props();

	// Initialize theme from server data
	onMount(() => {
		themeState.set(data.theme);
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="min-h-screen">
	<header class="navbar bg-base-200 px-4">
		<div class="flex-1">
			<a href="/" class="btn btn-ghost text-xl">SvelteKit</a>
		</div>
		<div class="flex-none">
			<ThemeToggle />
		</div>
	</header>
	<main>
		{@render children()}
	</main>
</div>
