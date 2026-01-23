<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import { initializeTheme } from '$lib/theme.svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: any; data: LayoutData } = $props();

	// Initialize theme from server data
	$effect(() => {
		initializeTheme(data.theme);
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="flex min-h-screen flex-col">
	<header class="navbar bg-base-200 shadow-sm">
		<div class="flex-1">
			<a href="/" class="btn btn-ghost text-xl">My App</a>
		</div>
		<div class="flex-none">
			<ThemeToggle />
		</div>
	</header>
	<main class="flex-1">
		{@render children()}
	</main>
</div>
