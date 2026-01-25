<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import ThemeToggle from '$lib/ThemeToggle.svelte';
	import { initThemeContext } from '$lib/theme.svelte';

	interface LayoutProps {
		children: any;
		data: {
			theme: 'light' | 'dark';
		};
	}

	const { children, data }: LayoutProps = $props();

	// Initialize theme context with server-provided theme
	$effect.pre(() => {
		initThemeContext(data.theme);
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="flex min-h-screen flex-col">
	<nav class="flex items-center justify-between p-4">
		<h1 class="text-xl font-bold">App</h1>
		<ThemeToggle />
	</nav>
	<main class="flex-1">
		{@render children()}
	</main>
</div>
