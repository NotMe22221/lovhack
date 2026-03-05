

## Create Season 2 Hackathon Page

Create a new page at `/season-2` modeled after the existing `MedoHack.tsx` pattern, with Season 2 specific content.

---

### 1. Create `src/pages/Season2.tsx`

Follow the same structure as `MedoHack.tsx` but with Season 2 branding (using `primary` color instead of `blue-500`):

- **Hero**: "LovHack Season 2" title, "Our Biggest Event Yet" subtitle, date March 21, Luma link `https://luma.com/95fwomd5`, Discord button
- **Badge**: "Registrations Open" 
- **What is it section**: Description emphasizing biggest event yet, 8 sponsors, global participation
- **What You Get**: Certificates, prizes (TBA), community
- **Suggested Tracks**: Keep similar tracks, emphasize the n8n/agents track with a note about learning n8n
- **Sponsors section**: Grid of all 8 sponsors using existing logo assets:
  - n8n (`n8n-logo.webp`)
  - Miro (`miro-logo.webp`)
  - Gen.xyz (`genxyz-logo.png`)
  - Nodebase (`nodebase-logo.webp`)
  - Ideavo, Relay, Mobbin, CodeShifters — no logos yet, show text-only cards
- **How It Works**: Same 4-step flow
- **Final CTA**: Register on Luma + Join Discord
- **Note**: "Agents built before March 21st won't be accepted"

### 2. Add route in `src/App.tsx`

Add `import Season2` and route `<Route path="/season-2" element={<Season2 />} />`.

### 3. Update `src/pages/Hackathons.tsx`

Update the Season 2 entry in `upcomingEvents`:
- Change `status` to `"Registrations Open"`
- Change `date` to `"March 21, 2026"`
- Set `link` to `"/season-2"`

### 4. Update hero CTA on landing page

In `src/components/sections/NewHeroSection.tsx`, update the "Join Our Next Hackathon" button to link to `/season-2` instead of `/medo-hack`.

---

### Files Modified
- `src/pages/Season2.tsx` (new)
- `src/App.tsx`
- `src/pages/Hackathons.tsx`
- `src/components/sections/NewHeroSection.tsx`

