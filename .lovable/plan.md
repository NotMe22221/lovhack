

# Improving LovHack to Compete with Devpost and Hack Nation

After reviewing both platforms and your current codebase, here are the key gaps and a prioritized plan to close them.

## What Devpost/Hack Nation Have That LovHack Is Missing

1. **User profiles as public portfolio pages** — Devpost users have public profiles showing all their projects, hackathons participated in, and skills. LovHack profiles are dashboard-only.
2. **Project comments/discussions** — Devpost has a comments section on each project. LovHack has no community interaction on projects beyond likes.
3. **Team formation/discovery** — Devpost lets you find teammates. LovHack only lets you name a team at submission.
4. **Hackathon detail pages with tabs** — Devpost hackathon pages have Overview, Participants, Rules, Project Gallery, Updates, Discussions tabs. LovHack season pages are static marketing pages.
5. **"Built with" tech tags as filters** — Devpost lets you filter by technology. LovHack only filters by track/season.
6. **Staff Picks / Featured projects** — Devpost curates featured projects. LovHack shows all projects equally.
7. **Project comments count on cards** — Social proof indicators beyond likes/views.
8. **Team member avatars on project cards** — Devpost shows contributor avatars on the project gallery cards.

## Recommended Implementation Plan (Prioritized)

### Phase 1: Public User Profiles (High Impact)
**New route: `/profile/:userId`**
- Display name, avatar, bio, GitHub, LinkedIn links
- Grid of their submitted projects (approved/winner)
- Hackathons participated in, certificates earned
- Make team member names on project detail clickable links to profiles

**Files**: New `src/pages/PublicProfile.tsx`, update `App.tsx` route, update `ProjectDetail.tsx` team links

### Phase 2: Project Comments
**Database**: New `project_comments` table (`id`, `project_id`, `user_id`, `content`, `created_at`) with RLS
**UI**: Add comments section to `ProjectDetail.tsx` — comment input for logged-in users, threaded list with avatars/names
**Project cards**: Show comment count icon on project cards in `Projects.tsx`

**Files**: Migration SQL, update `ProjectDetail.tsx`, update `Projects.tsx` cards

### Phase 3: Enhanced Hackathon Detail Pages
**Upgrade Season pages** to have a tabbed layout like Devpost:
- **Overview**: Rules, prizes, schedule, eligibility
- **Participants**: List of registered users with avatars
- **Project Gallery**: Filtered to that hackathon's submissions
- **Updates/Announcements**: From the existing `announcements` table

**Files**: Refactor `src/pages/Season2.tsx` into a tabbed layout

### Phase 4: Team Member Avatars on Cards + Featured Projects
- Show up to 3 team member avatars on project cards (like Devpost)
- Add `featured` boolean to projects table; admin can mark projects as "Staff Pick"
- Show a "Featured" section at the top of the Projects page

**Files**: Update `Projects.tsx`, migration for `featured` column, update `AdminDashboard.tsx`

### Phase 5: Tech Stack Tag Filtering
- Make tech stack tags clickable filters on the projects page
- Add a "Built with" filter dropdown populated from all project tech stacks

**Files**: Update `Projects.tsx` filter logic

---

## Summary Table

| Feature | Impact | Effort | Phase |
|---------|--------|--------|-------|
| Public user profiles | High | Medium | 1 |
| Project comments | High | Medium | 2 |
| Tabbed hackathon pages | Medium | Medium | 3 |
| Avatars on cards + Featured | Medium | Low | 4 |
| Tech stack filtering | Low | Low | 5 |

Which phase would you like to start with, or should I implement all of them?

