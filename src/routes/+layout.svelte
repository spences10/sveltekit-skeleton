<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import ThemeToggle from '$lib/ThemeToggle.svelte';
	import { applyTheme } from '$lib/theme.svelte';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';

	let { children, data }: { children: any; data: PageData } = $props();

	// Sync server theme with client on mount
	onMount(() => {
		if (data?.theme) {
			applyTheme(data.theme as 'light' | 'dark');
		}
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<header class="flex items-center justify-between border-b border-base-300 bg-base-100 px-4 py-3">
	<h1 class="text-xl font-bold">App</h1>
	<ThemeToggle />
</header>

{@render children()}
