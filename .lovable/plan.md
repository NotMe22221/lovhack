

# Phase 3: Dashboard Enhancements

Most of Phase 3 was already built during Phase 2 (Profile, My Projects, Credits, Certificates tabs). The remaining work is:

## 1. Add "My Contributions" Tab
- New tab showing teams the user belongs to (via `team_members` joined with `teams` and `projects`)
- Each card shows project title, team name, user's role, and link to project

## 2. Add "Messages" Tab
- Simple notification/announcement list
- No new table needed — placeholder UI for now with a "No messages yet" state
- Can be wired to announcements table in Phase 4 if needed

## 3. Project Edit Page (`/dashboard/projects/:id/edit`)
- New route and page component
- Reuses the same form layout as `SubmitProject.tsx` but pre-fills from existing project data
- Fetches project by ID, verifies ownership (`user_id === auth.uid()`)
- Updates existing record instead of inserting
- Handles existing thumbnail/screenshots (show current, allow replace)
- Add "Edit" button to My Projects tab cards linking to this page

## Files to Create/Modify

| File | Action |
|------|--------|
| `src/pages/EditProject.tsx` | New — edit form pre-filled with project data |
| `src/pages/Dashboard.tsx` | Add Contributions + Messages tabs |
| `src/App.tsx` | Add `/dashboard/projects/:id/edit` route |

No database changes needed.

