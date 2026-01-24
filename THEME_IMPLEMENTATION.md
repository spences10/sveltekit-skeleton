# Theme Toggle Implementation with Cookie Persistence

## Overview
A complete theme toggle system with light/dark mode support, cookie-based persistence, and SSR-safe rendering to prevent FOUC (Flash of Unstyled Content).

## Files Created/Modified

### 1. **src/lib/theme.svelte.ts**
- Svelte store for managing theme state
- `theme` store with subscribe/set methods
- `applyTheme()` function to update HTML element, localStorage, and store
- `getCurrentTheme()` function to read theme from DOM (SSR-safe)
- Type-safe with `Theme = 'light' | 'dark'`

### 2. **src/lib/ThemeToggle.svelte**
- Interactive toggle component with rotating sun/moon icons
- Uses `.swap` and `.swap-rotate` CSS classes for animation
- Immediately updates client-side state
- Syncs with server via fetch to `/theme` API endpoint
- Respects SSR by waiting for client hydration

### 3. **src/hooks.server.ts**
- SvelteKit Handle hook for server-side theme detection
- Reads theme from cookie and injects it into HTML element via `transformPageChunk`
- Prevents theme flash on page load by setting data-theme before rendering
- Cookie-based persistence across requests

### 4. **src/routes/+layout.server.ts**
- `load()` function to pass theme from cookie to layout
- Provides server-side theme data to layout component

### 5. **src/routes/+layout.svelte**
- Imports and displays ThemeToggle component in header
- Syncs server-provided theme with client on mount
- Maintains header styling for light/dark modes

### 6. **src/routes/theme/+server.ts**
- POST endpoint at `/theme` for setting theme cookie
- Validates theme value (must be 'light' or 'dark')
- Sets HTTP cookie with 1-year expiration
- Returns JSON response with theme value

### 7. **src/app.html**
- Added `data-theme="light"` attribute to `<html>` element
- Default theme to prevent errors on first load
- Dynamically replaced by hooks.server.ts with actual theme

## Key Features

✅ **SSR-Safe**: No flash of wrong theme - theme applied server-side before rendering
✅ **Persistent**: Cookie-based persistence across sessions (1-year expiration)
✅ **Responsive**: Instant client-side updates with smooth animations
✅ **Typed**: Full TypeScript support with Theme type
✅ **Accessible**: Proper ARIA labels for toggle checkbox
✅ **Styled**: Custom CSS for swap/rotate animation effects
✅ **API-Based**: Clean separation of concerns with dedicated theme endpoint

## How It Works

1. **Initial Page Load**:
   - Server reads theme from cookie (or defaults to 'light')
   - hooks.server.ts injects theme into HTML data-theme attribute
   - Page renders with correct theme immediately

2. **Client Hydration**:
   - ThemeToggle component reads current theme from HTML element
   - Subscribes to theme store for updates
   - Checkbox is disabled until hydration complete

3. **Theme Toggle**:
   - User clicks toggle
   - `applyTheme()` immediately updates:
     - HTML data-theme attribute
     - localStorage (client-side fallback)
     - Svelte store (reactive updates)
   - Component sends POST to `/theme` API endpoint
   - Server updates cookie for future sessions

## Usage

The ThemeToggle component is already imported and rendered in the layout header. Users can click the sun/moon icon to toggle between light and dark themes.

## Customization

- **Change default theme**: Edit `hooks.server.ts` line where it defaults to 'light'
- **Change theme names**: Update `Theme` type in `theme.svelte.ts` and update validation in `theme/+server.ts`
- **Change styling**: Modify `.swap` and `.swap-rotate` classes in ThemeToggle.svelte
- **Change cookie expiration**: Modify `maxAge` in `theme/+server.ts`
- **Add system preference detection**: Use `window.matchMedia('(prefers-color-scheme: dark)')` in ThemeToggle component

## Browser Support

Works in all modern browsers with:
- ES2020+ support
- Svelte 5.x
- SvelteKit 2.x
- Cookie support

