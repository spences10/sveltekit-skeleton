<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import ThemeToggle from '$lib/ThemeToggle.svelte';
	import { themeStore } from '$lib/theme.svelte';

	interface PageData {
		theme?: 'light' | 'dark';
	}

	let { children, data }: { children: any; data: PageData } = $props();

	$effect(() => {
		// Initialize theme from server-side data
		if (data?.theme) {
			themeStore.init(data.theme);
		}
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="flex min-h-screen flex-col">
	<header class="border-b border-base-200 bg-base-100">
		<div class="navbar">
			<div class="flex-1">
				<a href="/" class="text-xl font-bold">App</a>
			</div>
			<div class="flex-none gap-2">
				<ThemeToggle />
			</div>
		</div>
	</header>
	<main class="flex-1">
		{@render children()}
	</main>
</div>
