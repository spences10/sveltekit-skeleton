/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			{
				light: {
					primary: '#3b82f6',
					secondary: '#8b5cf6',
					accent: '#ec4899',
					neutral: '#2b3544',
					'base-100': '#ffffff',
					'base-200': '#f2f2f2',
					'base-300': '#e5e5e5',
					info: '#0dcaf0',
					success: '#10b981',
					warning: '#f59e0b',
					error: '#ef4444'
				}
			},
			{
				dark: {
					primary: '#3b82f6',
					secondary: '#8b5cf6',
					accent: '#ec4899',
					neutral: '#fffbfe',
					'base-100': '#1f2937',
					'base-200': '#111827',
					'base-300': '#0f172a',
					info: '#0dcaf0',
					success: '#10b981',
					warning: '#f59e0b',
					error: '#ef4444'
				}
			}
		]
	}
};
