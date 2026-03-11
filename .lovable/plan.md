

# Add SEO for /season-2 and Update Sitemap

## Changes

### 1. Enhance Season 2 Helmet meta tags
**File**: `src/pages/Season2.tsx` (lines 107-116)
- Add `keywords` meta tag with terms like "LovHack Season 2, hackathon 2026, online hackathon, beginner hackathon, March 2026"
- Add `og:image` and `twitter:image` tags (reuse existing social image)
- Add `og:type` as `website`
- Add `twitter:card` as `summary_large_image`

### 2. Add /season-2 to sitemap
**File**: `public/sitemap.xml`
- Add a `<url>` entry for `https://lovhack.dev/season-2` with high priority (0.9), weekly changefreq

### 3. Add /season-2 to structured data
**File**: `index.html`
- Ensure the JSON-LD `Event` schema references Season 2 dates (March 21, 2026)

