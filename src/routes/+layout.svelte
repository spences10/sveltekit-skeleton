<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { themeStore } from '$lib/theme.svelte';
	import ThemeToggle from '$lib/ThemeToggle.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	const { data, children } = $props<{ data: PageData; children: any }>();

	// Initialize theme on mount
	onMount(() => {
		// Set the theme from server data
		themeStore.init(data.theme);

		// Sync theme changes with document
		const unsubscribe = themeStore.subscribe((theme) => {
			document.documentElement.setAttribute('data-theme', theme);
		});

		return () => unsubscribe();
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="min-h-screen">
	<header class="flex items-center justify-between border-b border-base-300 bg-base-100 p-4">
		<h1 class="text-2xl font-bold">My App</h1>
		<div class="flex items-center gap-4">
			<ThemeToggle />
		</div>
	</header>

	<main class="p-4">
		{@render children()}
	</main>
</div>
