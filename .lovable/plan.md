

## Update Season 1 Page

Two changes to the `/season-1` page:

---

### 1. Remove Dualite from sponsors

In `src/pages/Season1.tsx`, remove the Dualite entry from the `sponsors` array (line 34) and the `dualiteLogo` import (line 16). Update the sponsor grid from 7 columns to 6 (`lg:grid-cols-6`).

### 2. Add Floot Leaderboard embed after Runners Up

In `src/components/sections/WinnersSection.tsx`, add a new section between the Runners Up grid (ends line 261) and the CTA (line 263). This will include:

- A heading like "Full Leaderboard"
- An iframe embedding `https://lovhack.floot.app/` with responsive sizing
- A fallback link below the iframe so users can open it directly

---

### Technical Details

**File: `src/pages/Season1.tsx`**
- Remove line 16 (`dualiteLogo` import)
- Remove line 34 (Dualite sponsor entry)
- Change `lg:grid-cols-7` to `lg:grid-cols-6` on line 95

**File: `src/components/sections/WinnersSection.tsx`**
- Insert after line 261 (after runners up grid, before CTA): a new div with a heading and an iframe (`src="https://lovhack.floot.app/"`) styled with rounded corners, border, and responsive height (~500-600px)

