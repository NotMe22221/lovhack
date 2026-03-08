

# Phase 5: Winners & Leaderboard, Notifications, Analytics, and Polish

## 1. Winners & Leaderboard Enhancement

**File: `src/pages/Winners.tsx`**
- Group winners by hackathon/season with section headers
- Show rank badges (1st, 2nd, 3rd with gold/silver/bronze styling)
- Display average judge score per project (via `calculate_project_score` RPC)
- Add a leaderboard table view toggle (card view vs table with scores)
- Embed the existing Floot leaderboard iframe for Season 1

## 2. Notifications & Announcements

**Database migration:**
- Create `announcements` table: `id`, `title`, `message`, `hackathon_id` (nullable), `created_at`, `published` (boolean)
- RLS: admins can CRUD, authenticated users can read published announcements

**File: `src/pages/Dashboard.tsx`** (Messages tab)
- Replace placeholder with real data from `announcements` table
- Show unread indicator (compare `created_at` vs last visit stored in localStorage)
- Each announcement as a card with title, message, and timestamp

**File: `src/pages/AdminDashboard.tsx`**
- Add Announcements management to an existing tab or new sub-section
- Create/edit/delete announcements, toggle published status

## 3. Analytics & Public Stats

**New file: `src/components/sections/StatsSection.tsx`**
- Public stats banner (homepage or standalone): total projects, total participants, hackathon count, countries
- Fetch counts via Supabase queries (projects count, profiles count, hackathons count)
- Animated count-up numbers on scroll into view

**File: `src/pages/AdminDashboard.tsx`**
- Add a Stats/Analytics tab showing:
  - Projects by status (pending/approved/winner) as a bar chart (recharts)
  - Submissions over time (line chart)
  - Top projects by likes/views
  - Total users registered

**File: `src/pages/Index.tsx`**
- Add `StatsSection` component to the homepage

## 4. Polish & UX Improvements

**Loading skeletons** — Replace spinner-only loading states with skeleton cards in:
- `Projects.tsx` (grid of skeleton cards)
- `Winners.tsx`
- `Dashboard.tsx` tabs

**Error boundaries:**
- New `src/components/ErrorBoundary.tsx` — React error boundary with fallback UI and retry button

**Responsive fixes:**
- Audit and fix mobile layout in `AdminDashboard.tsx` and `JudgeDashboard.tsx` (tab overflow → horizontal scroll)
- Fix `Dashboard.tsx` sidebar tabs on mobile (switch to horizontal scrollable tabs)

**Empty states:**
- Add illustrations/icons to empty states across Projects, Winners, Dashboard tabs

**SEO:**
- Add `<Helmet>` meta tags to any pages missing them (`AdminDashboard`, `JudgeDashboard`, `EditProject`)

---

## Files to Create/Modify

| File | Action |
|------|--------|
| Migration SQL | Create `announcements` table with RLS |
| `src/pages/Winners.tsx` | Leaderboard with scores, grouping, rank badges |
| `src/pages/Dashboard.tsx` | Wire Messages tab to announcements |
| `src/pages/AdminDashboard.tsx` | Add announcements management + analytics tab |
| `src/components/sections/StatsSection.tsx` | New — animated public stats |
| `src/pages/Index.tsx` | Add StatsSection |
| `src/pages/Projects.tsx` | Skeleton loading cards |
| `src/components/ErrorBoundary.tsx` | New — error boundary component |
| `src/pages/EditProject.tsx` | Add Helmet meta |
| `src/pages/AdminDashboard.tsx` | Mobile responsive tabs |
| `src/pages/JudgeDashboard.tsx` | Mobile responsive + Helmet |

Estimated: ~8 files modified/created, 1 migration.

