# Fix Plan

Current state of features. Agent should pick ONE incomplete item.

## Features

### [x] feat-001: Add health check API endpoint

**Task:** Create a SvelteKit API endpoint at src/routes/api/health/+server.ts that returns JSON { status: 'ok', timestamp: Date.now() }. Use json() from @sveltejs/kit.

**Backpressure:** `cd /home/daytona/workspace && npm run build`

### [x] feat-002: Add robots.txt

**Task:** Create a static/robots.txt file that allows all crawlers with 'User-agent: *' and 'Allow: /'

**Backpressure:** `cd /home/daytona/workspace && test -f static/robots.txt && grep -q 'User-agent' static/robots.txt`

### [x] feat-003: Add sitemap endpoint

**Task:** Create a SvelteKit endpoint at src/routes/sitemap.xml/+server.ts that returns a basic XML sitemap with urlset. Use Response with Content-Type: application/xml.

**Backpressure:** `cd /home/daytona/workspace && npm run build`

---

## Instructions

1. Pick the first incomplete feature ([ ])
2. Implement it fully
3. Verify with the backpressure command
4. Commit your changes
