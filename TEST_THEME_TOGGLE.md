# Theme Toggle Testing Guide

## How to Test

1. **Start the development server:**
   ```bash
   pnpm dev
   ```

2. **Open the application in your browser:**
   - Navigate to `http://localhost:5173` (or the port shown in the terminal)

3. **Test the theme toggle:**
   - You should see a sun/moon icon in the top-right corner of the navbar
   - Click the icon to toggle between light and dark themes
   - The icon should rotate smoothly between sun (light mode) and moon (dark mode)

4. **Verify cookie persistence:**
   - Toggle the theme to dark mode
   - Refresh the page - the theme should remain dark
   - Open browser DevTools > Application > Cookies
   - You should see a `theme` cookie with value `dark`
   - Toggle back to light mode and verify the cookie updates to `light`

5. **Test SSR (Server-Side Rendering):**
   - Set the theme to dark mode
   - Open a new incognito/private window
   - Manually set the `theme` cookie to `dark` in DevTools
   - Navigate to the site - it should load in dark mode immediately (no flash)

## Expected Behavior

### Visual
- ✅ Sun icon shows in light mode
- ✅ Moon icon shows in dark mode
- ✅ Icon animates with a smooth rotation when toggling
- ✅ Background and text colors change according to daisyUI theme
- ✅ Navbar has proper styling with daisyUI classes

### Functionality
- ✅ Click toggles between light and dark modes
- ✅ Theme persists across page reloads
- ✅ Cookie expires in 1 year
- ✅ No flash of unstyled content (FOUC) on page load
- ✅ HTML element has correct `data-theme` attribute

### Technical
- ✅ Type checking passes with no errors
- ✅ No console errors in browser
- ✅ API endpoint `/api/theme` responds with success
- ✅ Server-side rendering works correctly

## Troubleshooting

### Theme doesn't persist
- Check browser DevTools > Application > Cookies
- Verify the `theme` cookie is being set
- Check the API response in Network tab

### Icon doesn't show
- Verify daisyUI is properly installed
- Check console for CSS loading errors
- Ensure `@plugin 'daisyui'` is in layout.css

### Type errors
- Run `pnpm run check` to verify
- Ensure all dependencies are installed with `pnpm install`

## File Structure

```
src/
├── app.html                          # HTML template with data-theme placeholder
├── hooks.server.ts                   # Server hook to inject theme into HTML
├── lib/
│   ├── components/
│   │   └── ThemeToggle.svelte       # Theme toggle component
│   ├── index.ts                     # Exports for $lib
│   └── theme.svelte.ts              # Theme state management (Svelte 5 runes)
└── routes/
    ├── +layout.server.ts            # Server load function for theme
    ├── +layout.svelte               # Main layout with ThemeToggle
    ├── layout.css                   # Tailwind + daisyUI config
    └── api/
        └── theme/
            └── +server.ts           # API endpoint for theme updates
```

## API Endpoint

### POST /api/theme

**Request:**
```json
{
  "theme": "dark"
}
```

**Response (Success):**
```json
{
  "success": true,
  "theme": "dark"
}
```

**Response (Error):**
```json
{
  "error": "Invalid theme"
}
```

## Available Themes

The implementation currently supports:
- `light` (default)
- `dark`

To add more themes, modify:
1. `src/lib/theme.svelte.ts` - Update the `Theme` type
2. `src/routes/api/theme/+server.ts` - Update validation logic
3. `src/lib/components/ThemeToggle.svelte` - Add more toggle options if needed
