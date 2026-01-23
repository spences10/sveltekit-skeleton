# Theme Toggle Implementation

This document describes the theme toggle feature that has been implemented with cookie persistence.

## Overview

The theme toggle allows users to switch between light and dark modes using daisyUI themes. The selected theme is persisted in a cookie and survives page reloads.

## Files Created/Modified

### 1. **src/lib/theme.svelte.ts**
- Theme state management using Svelte 5 runes ($state)
- Exports a `ThemeState` class that manages the current theme
- Provides methods to toggle and set the theme

### 2. **src/lib/components/ThemeToggle.svelte**
- Theme toggle component using daisyUI's swap component
- Features animated sun/moon icons that rotate on toggle
- Updates the theme via API call to persist to cookies
- Immediately updates the HTML data-theme attribute for smooth transitions

### 3. **src/routes/api/theme/+server.ts**
- API endpoint to handle theme updates
- Sets the theme cookie with a 1-year expiration
- Validates theme values (only 'light' or 'dark' allowed)

### 4. **src/routes/+layout.server.ts**
- Server-side load function that reads theme from cookies
- Returns theme data to the client
- Defaults to 'light' if no cookie is set

### 5. **src/hooks.server.ts**
- Server hook that transforms HTML before sending to client
- Injects theme value into the HTML template's data-theme attribute
- Ensures SSR-safe theme initialization (no flash of wrong theme)

### 6. **src/app.html**
- Added `data-theme="%sveltekit.theme%"` to the HTML element
- This placeholder is replaced by hooks.server.ts with the actual theme

### 7. **src/routes/layout.css**
- Added `@plugin 'daisyui';` to enable daisyUI (Tailwind CSS v4 syntax)

### 8. **src/routes/+layout.svelte**
- Updated to include ThemeToggle component in the navbar
- Initializes theme state from server data using $effect
- Added a header with the theme toggle button

## How It Works

1. **Initial Load (SSR)**:
   - `hooks.server.ts` reads the theme cookie
   - Injects theme into the HTML template's data-theme attribute
   - No flash of unstyled content (FOUC)

2. **Client-Side**:
   - `+layout.server.ts` passes theme data to the client
   - Layout component initializes the theme state
   - ThemeToggle component displays current theme

3. **Theme Toggle**:
   - User clicks the toggle button
   - Component updates local state immediately
   - Updates HTML data-theme attribute for instant visual feedback
   - Sends POST request to `/api/theme` to persist to cookie
   - Cookie expires in 1 year

## Benefits

- ✅ SSR-safe (no flash of wrong theme)
- ✅ Persists across sessions via cookies
- ✅ Instant visual feedback (no waiting for server response)
- ✅ Uses Svelte 5 runes for reactive state management
- ✅ Uses daisyUI themes for consistent styling
- ✅ Clean separation of concerns

## Usage

The theme toggle appears in the top-right corner of the navbar. Simply click it to switch between light and dark modes.

## Available Themes

Currently supports:
- `light` (default)
- `dark`

You can extend this by modifying the theme types and adding more daisyUI theme options.
