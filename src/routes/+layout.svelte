<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import { theme } from '$lib/theme.svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: any; data: LayoutData } = $props();

	// Initialize theme state from server data
	$effect(() => {
		theme.set(data.theme);
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="min-h-screen">
	<header class="navbar bg-base-100 shadow-lg">
		<div class="flex-1">
			<a href="/" class="btn btn-ghost text-xl">SvelteKit</a>
		</div>
		<div class="flex-none">
			<ThemeToggle />
		</div>
	</header>

	<main class="container mx-auto p-4">
		{@render children()}
	</main>
</div>
