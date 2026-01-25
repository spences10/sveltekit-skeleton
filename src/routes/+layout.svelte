<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import ThemeToggle from '$lib/ThemeToggle.svelte';

	interface LayoutData {
		theme: 'light' | 'dark';
	}

	let { children, data }: { children: any; data: LayoutData } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="min-h-screen" data-theme={data.theme}>
	<header class="flex items-center justify-between bg-base-200 p-4">
		<h1 class="text-2xl font-bold">My App</h1>
		<ThemeToggle currentTheme={data.theme} />
	</header>
	<main>
		{@render children()}
	</main>
</div>
