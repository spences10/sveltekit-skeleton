# Theme Toggle - Quick Start Guide

## What Was Implemented

A complete dark/light theme toggle system with persistent cookie storage for your SvelteKit + daisyUI application.

## Testing the Feature

### 1. Start Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 2. Using the Theme Toggle
- Look for the **sun/moon icon** in the top-right corner of the header
- Click it to toggle between light and dark themes
- The theme changes **instantly**
- The preference is **saved to a cookie** for 1 year

### 3. Verify Persistence
1. Toggle the theme to dark
2. Refresh the page → theme stays dark ✅
3. Close the tab/window
4. Reopen the site → theme is still dark ✅
5. Open DevTools (F12) → Application → Cookies → check `theme` cookie

### 4. Verify No Flash
1. Hard refresh (`Ctrl+Shift+R` or `Cmd+Shift+R`)
2. The correct theme loads **immediately** - no white flash ✅

## Key Files

| File | Purpose |
|------|---------|
| `src/lib/theme.svelte.ts` | Theme state management store |
| `src/lib/ThemeToggle.svelte` | Interactive toggle component |
| `src/routes/+layout.svelte` | Main layout with toggle in header |
| `src/routes/+layout.server.ts` | Read theme cookie on server |
| `src/routes/api/theme/+server.ts` | API endpoint to update cookie |
| `src/app.html` | Initial `data-theme` attribute |

## How to Use in Other Components

### Simple Usage
```svelte
<script lang="ts">
  import { themeStore } from '$lib/theme.svelte';

  // Get current theme
  $: currentTheme = $themeStore;

  // Toggle theme
  function switchTheme() {
    themeStore.toggle();
  }
</script>

<p>Current theme: {currentTheme}</p>
<button onclick={switchTheme}>Toggle Theme</button>
```

### Subscribe to Changes
```svelte
<script lang="ts">
  import { themeStore } from '$lib/theme.svelte';
  import { onMount } from 'svelte';

  onMount(() => {
    const unsubscribe = themeStore.subscribe((theme) => {
      console.log('Theme changed to:', theme);
    });

    return unsubscribe;
  });
</script>
```

### Conditional Styling
```svelte
<script lang="ts">
  import { themeStore } from '$lib/theme.svelte';
</script>

{#if $themeStore === 'dark'}
  <div class="dark-only">This shows only in dark mode</div>
{:else}
  <div class="light-only">This shows only in light mode</div>
{/if}
```

## Customize Theme Options

To add more themes (cupcake, bumblebee, etc.), update `tailwind.config.js`:

```javascript
export default {
  daisyui: {
    themes: ["light", "dark", "cupcake", "bumblebee"],
  },
}
```

Then modify `src/lib/theme.svelte.ts`:
```typescript
export type Theme = 'light' | 'dark' | 'cupcake' | 'bumblebee';
```

And update the API validation in `src/routes/api/theme/+server.ts`:
```typescript
if (!['light', 'dark', 'cupcake', 'bumblebee'].includes(theme)) {
  return json({ error: 'Invalid theme' }, { status: 400 });
}
```

## Styling the Toggle

The ThemeToggle component uses daisyUI's `swap` component. To customize:

```svelte
<!-- Change icon size -->
<svg class="swap-off h-6 w-6 fill-current"><!-- sun --></svg>

<!-- Change colors -->
<div class="swap swap-rotate text-primary">
  <!-- content -->
</div>

<!-- Add transition animation -->
<div class="swap swap-rotate transition-all duration-300">
  <!-- content -->
</div>
```

## Cookie Details

**Name:** `theme`
**Value:** `"light"` or `"dark"`
**Expires:** 365 days from last toggle
**Path:** `/` (entire domain)
**SameSite:** `lax` (CSRF protection)
**HttpOnly:** `false` (client can read/write)

## API Endpoint

### POST /api/theme
Updates the theme cookie on the server.

**Request:**
```json
{
  "theme": "light" | "dark"
}
```

**Response:**
```json
{
  "success": true,
  "theme": "light" | "dark"
}
```

**Error Response:**
```json
{
  "error": "Invalid theme"
}
```

## Building for Production

The theme system works seamlessly in production:

```bash
npm run build
```

All theme logic is built-in:
- ✅ Cookie reading on server (SSR)
- ✅ No flash of unstyled content
- ✅ Full TypeScript support
- ✅ Minimal JavaScript overhead

## Troubleshooting

### Theme doesn't persist after refresh
- **Check:** Browser settings allow cookies
- **Check:** Cookie name is `theme` in DevTools
- **Check:** Network tab shows successful POST to `/api/theme`

### Flash of wrong theme on page load
- **Verify:** `data-theme="light"` in `src/app.html`
- **Verify:** `+layout.server.ts` reads cookie correctly
- **Check:** Browser cache isn't serving old HTML

### Toggle button doesn't appear
- **Check:** `ThemeToggle` is imported in `+layout.svelte`
- **Check:** Component CSS is loaded
- **Check:** Browser console for JavaScript errors

### Icons don't show
- **Verify:** SVG paths are correct in `ThemeToggle.svelte`
- **Check:** daisyUI CSS is loaded
- **Check:** CSS class `swap-off` and `swap-on` exist

## Performance Notes

- **Zero JavaScript** needed for theme on initial load (SSR)
- **Minimal re-renders** thanks to Svelte stores
- **Instant feedback** - DOM updates before network request
- **Graceful degradation** - works without cookies (defaults to light)

## Next Steps

1. ✅ Test the toggle in development
2. ✅ Verify cookie persistence
3. ✅ Build for production (`npm run build`)
4. ✅ Deploy and test in production
5. Optional: Add to your app's settings page
6. Optional: Add system preference detection
7. Optional: Expand to more theme options

---

**Status:** ✅ Implementation Complete
**Build:** ✅ Successful
**Tests:** ✅ All checks pass
