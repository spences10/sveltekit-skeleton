<div class="min-h-screen bg-base-100">
	<div class="navbar bg-primary text-primary-content">
		<div class="flex-1">
			<a class="btn btn-ghost text-xl">daisyUI</a>
		</div>
	</div>

	<div class="hero min-h-96 bg-base-200">
		<div class="hero-content text-center">
			<div class="max-w-md">
				<h1 class="text-5xl font-bold">Welcome to SvelteKit</h1>
				<p class="py-6">
					Visit <a href="https://svelte.dev/docs/kit" class="link link-primary">svelte.dev/docs/kit</a> to
					read the documentation
				</p>
				<button class="btn btn-primary">Get Started</button>
			</div>
		</div>
	</div>

	<div class="container mx-auto p-8">
		<h2 class="mb-6 text-3xl font-bold">daisyUI Components Demo</h2>

		<div class="grid gap-6 md:grid-cols-2">
			<!-- Button Examples -->
			<div class="card bg-base-100 shadow-lg">
				<div class="card-body">
					<h2 class="card-title">Buttons</h2>
					<div class="space-y-2">
						<button class="btn btn-primary w-full">Primary Button</button>
						<button class="btn btn-secondary w-full">Secondary Button</button>
						<button class="btn btn-accent w-full">Accent Button</button>
					</div>
				</div>
			</div>

			<!-- Badge Examples -->
			<div class="card bg-base-100 shadow-lg">
				<div class="card-body">
					<h2 class="card-title">Badges</h2>
					<div class="flex flex-wrap gap-2">
						<div class="badge badge-primary">Primary</div>
						<div class="badge badge-secondary">Secondary</div>
						<div class="badge badge-success">Success</div>
						<div class="badge badge-warning">Warning</div>
						<div class="badge badge-error">Error</div>
					</div>
				</div>
			</div>

			<!-- Alert Examples -->
			<div class="card bg-base-100 shadow-lg">
				<div class="card-body">
					<h2 class="card-title">Alerts</h2>
					<div class="alert alert-info">
						<span>Information message</span>
					</div>
					<div class="alert alert-success">
						<span>Success message</span>
					</div>
				</div>
			</div>

			<!-- Progress Examples -->
			<div class="card bg-base-100 shadow-lg">
				<div class="card-body">
					<h2 class="card-title">Progress</h2>
					<progress class="progress progress-primary w-full" value="70" max="100"></progress>
					<progress class="progress progress-success w-full" value="100" max="100"></progress>
				</div>
			</div>
		</div>
	</div>
</div>
