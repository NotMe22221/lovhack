

# Improvements to Make LovHack Better

After reviewing the full homepage, navbar, footer, and all sections, here are the most impactful improvements:

## Issues Found

1. **Discord link mismatch** — The navbar Discord button links to `discord.gg/lovable-dev` (Lovable's Discord), but the rest of the site uses `t.co/qMNpoZoiQZ` (LovHack Discord). This needs to be consistent.

2. **No "Season 2" or "Projects" in navbar** — The most important pages for returning users (Season 2 page, Projects gallery) are missing from navigation. Users have to scroll the homepage to find Season 2.

3. **Footer is too minimal** — No links to Projects, Winners, Dashboard, or Season 2. Missing a "Become a Sponsor" CTA.

4. **Homepage section order could be stronger** — The StatsSection (live counts from DB) is buried after Winners. Moving it higher creates social proof earlier. The DiscordCTASection at the bottom repeats what the hero already says.

5. **No "Projects" link anywhere in main nav** — The projects gallery (a key feature you just built) is only accessible if someone knows the URL.

## Proposed Changes

### 1. Fix Discord Link + Add Key Pages to Navbar
**File**: `src/components/Navbar.tsx`
- Fix Discord URL from `discord.gg/lovable-dev` to `t.co/qMNpoZoiQZ` (both desktop and mobile)
- Add "Season 2" and "Projects" to `navLinks`:
```js
const navLinks = [
  { to: "/", label: "Home" },
  { to: "/season-2", label: "Season 2" },
  { to: "/projects", label: "Projects" },
  { to: "/hackathons", label: "Hackathons" },
  { to: "/sponsors", label: "Sponsors" },
];
```

### 2. Enhance Footer with More Links + Sections
**File**: `src/components/sections/Footer.tsx`
- Add a multi-column footer layout: **Platform** (Projects, Winners, Mentoring, Support), **Events** (Season 1, Season 2, Hackathons), **Community** (Discord, Twitter/X, Register)
- Add "Become a Sponsor" link
- Keep the tagline and copyright

### 3. Reorder Homepage Sections for Better Flow
**File**: `src/pages/Index.tsx`
- Move `StatsSection` up right after `WhatIsLovHackSection` (social proof earlier)
- Remove `DiscordCTASection` (redundant with hero + UpcomingEvents card)
- New order: Hero → WhatIsLovHack → **Stats** → WhoIsFor → Season1Preview → Winners → UpcomingEvents → SponsorsPreview → FAQ → Footer

### 4. Add a Subtle "Explore Projects" CTA to Hero
**File**: `src/components/sections/NewHeroSection.tsx`
- Add a small text link below the main CTAs: "or explore Season 1 projects →" linking to `/projects`

## Summary

| Change | File | Impact |
|--------|------|--------|
| Fix Discord URL | Navbar.tsx | Critical (wrong link) |
| Add Season 2 + Projects to nav | Navbar.tsx | High |
| Multi-column footer | Footer.tsx | Medium |
| Reorder homepage sections | Index.tsx | Medium |
| Add projects link to hero | NewHeroSection.tsx | Low |

