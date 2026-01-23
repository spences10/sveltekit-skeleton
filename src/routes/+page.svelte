<div class="container mx-auto p-8">
	<h1 class="text-4xl font-bold mb-4">Welcome to SvelteKit</h1>
	<p class="mb-6">Visit <a href="https://svelte.dev/docs/kit" class="link link-primary">svelte.dev/docs/kit</a> to read the documentation</p>

	<!-- daisyUI Test Components -->
	<div class="space-y-4">
		<h2 class="text-2xl font-semibold mb-2">daisyUI Components Test</h2>

		<!-- Button -->
		<div>
			<button class="btn btn-primary">Primary Button</button>
			<button class="btn btn-secondary">Secondary Button</button>
			<button class="btn btn-accent">Accent Button</button>
		</div>

		<!-- Card -->
		<div class="card w-96 bg-base-100 shadow-xl">
			<div class="card-body">
				<h2 class="card-title">Card Title</h2>
				<p>This is a daisyUI card component to test the configuration.</p>
				<div class="card-actions justify-end">
					<button class="btn btn-primary">Action</button>
				</div>
			</div>
		</div>

		<!-- Alert -->
		<div class="alert alert-info">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
			<span>daisyUI is configured correctly!</span>
		</div>
	</div>
</div>
