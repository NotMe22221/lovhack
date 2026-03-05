

## Plan: Move Mini Hackathons to Past Events Section

Move the two LovHack Mini hackathon cards ("Mini-Hack" and "LovHack Mini x Medo") from the upcoming events grid into the "Past Archive" section, keeping only "Season 2" as an upcoming event.

### Changes in `src/pages/Hackathons.tsx`

1. **Remove both Mini hackathons from `upcomingEvents` array** (lines 13-32) — only keep the Season 2 entry.

2. **Add both to the "Past Archive" section** (lines 88-104) as archive cards matching the existing Season 1 style:
   - "LovHack Mini x Medo" — Feb 28 — Mar 1 • link to `/medo-hack`
   - "Mini-Hack" — Feb 14-15, 2025 • link to `/mini-hack`
   - Each with a "View Recap" button, similar to the Season 1 card

