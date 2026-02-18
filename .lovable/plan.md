

## Update Landing Page Hero for Medo x LovHack Hackathon

Two small changes to `src/components/sections/NewHeroSection.tsx` to point visitors to the upcoming Medo hackathon.

---

### Change 1: Update the badge text

Change **"Season 2 Coming Soon"** (line 75) to **"Next Hackathon: Feb 28"** so visitors immediately see there's an upcoming event.

### Change 2: Replace "Watch Recap" with "Join Our Next Hackathon"

Replace the second CTA button (lines 117-127):
- **Old**: "Watch Recap" linking to `/season-1` with a `Play` icon
- **New**: "Join Our Next Hackathon" linking to `/medo-hack` with an `ArrowRight` icon
- Same outline styling preserved

---

### File Modified

`src/components/sections/NewHeroSection.tsx` only -- two small edits, no new files or dependencies.

