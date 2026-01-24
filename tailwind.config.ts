import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	plugins: [
		require('daisyui')
	],
	daisyui: {
		themes: [
			{
				light: {
					'primary': '#0284c7',
					'primary-focus': '#0369a1',
					'primary-content': '#ffffff',
					'secondary': '#f0ad4e',
					'secondary-focus': '#ec971f',
					'secondary-content': '#ffffff',
					'accent': '#37cdbe',
					'accent-focus': '#2aa79b',
					'accent-content': '#ffffff',
					'neutral': '#3d4451',
					'neutral-focus': '#2a2e37',
					'neutral-content': '#ffffff',
					'base-100': '#ffffff',
					'base-200': '#f9fafb',
					'base-300': '#f3f4f6',
					'base-content': '#1f2937',
					'info': '#3b82f6',
					'success': '#10b981',
					'warning': '#f59e0b',
					'error': '#ef4444'
				}
			},
			{
				dark: {
					'primary': '#38bdf8',
					'primary-focus': '#0ea5e9',
					'primary-content': '#000000',
					'secondary': '#fbbf24',
					'secondary-focus': '#f59e0b',
					'secondary-content': '#000000',
					'accent': '#14b8a6',
					'accent-focus': '#0d9488',
					'accent-content': '#000000',
					'neutral': '#2a2e37',
					'neutral-focus': '#16202a',
					'neutral-content': '#ffffff',
					'base-100': '#1f2937',
					'base-200': '#111827',
					'base-300': '#0f172a',
					'base-content': '#f3f4f6',
					'info': '#60a5fa',
					'success': '#34d399',
					'warning': '#fcd34d',
					'error': '#f87171'
				}
			}
		]
	}
} satisfies Config;
