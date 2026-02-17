

## Medo Hackathon Update Plan

This plan covers three main changes: creating a new Medo Hackathon page, adding Medo to the sponsors sections, and updating the Hackathons listing page.

---

### 1. Save the Medo Logo

- Copy the uploaded Medo logo image to `src/assets/medo-logo.png`

---

### 2. Create New Page: `/medo-hack`

Create `src/pages/MedoHack.tsx` following the same structure as the existing Mini-Hack page (`src/pages/MiniHack.tsx`), but with Medo-specific content and a **blue accent color** (to match the Medo brand) instead of green.

**Sections in order:**

1. **Back link** to `/hackathons`
2. **Hero Section**
   - Badge: "Free Event"
   - Headline: "End February by Building Something Real"
   - Subheadline: "LovHack Mini x Medo -- a free 48-hour online hackathon for builders of all levels"
   - Date pill: February 28 -- March 1
   - Location pill: Online
   - Two CTAs: "Register Now" (Discord link) + "Join the Discord"

3. **What the Hackathon Is** (GlassCard)
   - Explain the free online hackathon powered by Medo
   - Three feature cards: Solo or Team, Beginner Friendly, Fully Online

4. **What You Get as a Participant** (GlassCard)
   - 300 free Medo credits
   - Certificate of Completion for all participants
   - Additional prizes for top teams

5. **Tracks / Themes** (optional section with bullet points)
   - Productivity, Student Life, Creators, Agent Innovation (each with a one-sentence description)

6. **Prizes** (GlassCard with gradient)
   - All participants: Certificate + 300 Medo credits
   - Top 5 teams: One month of Medo free
   - Mention gen.xyz domain benefits and upcoming announcements

7. **How It Works** (4 steps)
   - Join Discord
   - Build for 48 hours
   - Submit your project
   - Get judged

8. **Sponsor Section**
   - Medo logo card + gen.xyz logo card (same layout as Mini-Hack sponsor section)

9. **Final CTA** (GlassCard)
   - "Ready to Build?" with Register Now + Join Discord buttons

10. **DiscordCTASection** + **Footer**

---

### 3. Add Medo to Sponsor Sections

Update three files to include the Medo logo:

- **`src/components/sections/SponsorsSection.tsx`** -- Add Medo as a new logo entry alongside existing sponsors
- **`src/components/sections/SponsorsPreviewSection.tsx`** -- Add Medo to the sponsors array
- **`src/pages/Sponsors.tsx`** -- Add Medo as a sponsor card with description: "Build with AI-powered tools. 300 free credits for all LovHack participants." and offer: "300 free credits"

---

### 4. Add Route + Navigation

- **`src/App.tsx`** -- Add route: `<Route path="/medo-hack" element={<MedoHack />} />`
- **`src/pages/Hackathons.tsx`** -- Add a new ticket card for the Medo hackathon in the `upcomingEvents` array with a blue color theme, linking to `/medo-hack`

---

### 5. Update SEO Files

- **`public/sitemap.xml`** -- Add `/medo-hack` entry with today's date
- **`public/llms.txt`** -- Add Medo Hack page reference

---

### Technical Details

- The new page follows the exact same component patterns as `MiniHack.tsx` (Helmet, AnimatedBackground, Navbar, GlassCard, motion animations, Footer)
- Blue accent color (e.g., `blue-500`) used throughout to match Medo branding, differentiating from Mini-Hack's green and main LovHack pink
- Medo logo imported as `import medoLogo from "@/assets/medo-logo.png"`
- No new dependencies required

