

# Phase 2: Project Submission + Gallery Enhancement

Phase 2 focuses on making the existing submission, gallery, project detail, and dashboard pages fully functional with real data interactions, file uploads, filtering, likes, and profile editing.

---

## 1. Enhanced Submit Project Page

**Current state**: Basic form exists but lacks file uploads and screenshot support.

**Changes to `src/pages/SubmitProject.tsx`**:
- Add thumbnail upload (single image → `project-assets` storage bucket)
- Add screenshots upload (multiple images → `project-assets` bucket)
- Add team members input (comma-separated emails or names)
- Create a team record + team_members on submission
- Add zod validation schema for all fields
- Show upload previews for images before submit

---

## 2. Enhanced Projects Gallery with Filters

**Current state**: Basic grid with search only, no filters.

**Changes to `src/pages/Projects.tsx`**:
- Add filter bar with: Track dropdown, Season dropdown, Sort (Newest/Trending/Winners)
- Fetch tracks and hackathons for filter options
- Update query to apply filters dynamically
- Add pagination (load more button or page numbers)
- Improve empty state with illustration

---

## 3. Enhanced Project Detail Page

**Current state**: Shows details but no like functionality or view increment DB function.

**Changes**:
- **Database migration**: Create `increment_views` RPC function (currently called but doesn't exist)
- **Database migration**: Create `toggle_like` RPC function to increment/decrement likes and track user likes
- **New table**: `project_likes` (project_id, user_id) to track who liked what, with RLS
- Add working like button (toggle, shows filled heart if liked)
- Embed YouTube/Loom videos inline instead of just linking
- Add team members section (fetch from team_members + profiles)

---

## 4. Functional Dashboard Tabs

**Current state**: Placeholder text in all tabs.

**Changes to `src/pages/Dashboard.tsx`**:
- **Profile tab**: Editable form (name, bio, github, linkedin, avatar upload) fetching/updating `profiles` table
- **My Projects tab**: Fetch user's projects, show cards with status badges, edit/delete buttons
- **API Credits tab**: Fetch from `sponsor_credits` table, show cards with claim codes
- **Certificates tab**: Fetch user's certificates from `certificates` table

---

## 5. Database Changes (Migration)

New table:
```sql
project_likes (id, project_id uuid, user_id uuid, created_at)
-- unique constraint on (project_id, user_id)
-- RLS: users can insert/delete own likes, anyone can view
```

New functions:
```sql
increment_views(p_project_id uuid) -- increments projects.views by 1
toggle_like(p_project_id uuid) -- inserts/deletes like, updates projects.likes count
```

---

## 6. Files to Create/Modify

| File | Action |
|------|--------|
| Migration SQL | Create `project_likes` table, `increment_views` + `toggle_like` RPCs |
| `src/pages/SubmitProject.tsx` | Add file uploads, zod validation, team creation |
| `src/pages/Projects.tsx` | Add filter bar, pagination, improved cards |
| `src/pages/ProjectDetail.tsx` | Working likes, video embed, team members |
| `src/pages/Dashboard.tsx` | Functional profile edit, projects list, credits, certificates |
| `src/components/VideoEmbed.tsx` | New — YouTube/Loom embed component |

Estimated: ~6 files modified/created, 1 migration.

