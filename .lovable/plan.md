

# Phase 4: Admin Panel + Judge Dashboard

## Overview
Create two new protected pages: an Admin Dashboard for managing hackathons, projects, judges, and support tickets, and a Judge Dashboard for scoring assigned projects.

## 1. Admin Dashboard (`src/pages/AdminDashboard.tsx`)

New page at `/admin` with tabbed interface. Only accessible to users with `admin` role (checked via `has_role` RPC).

**Tabs:**
- **Hackathons**: CRUD hackathons (name, season, dates, status). Create/edit tracks per hackathon.
- **Projects**: View all projects (any status), approve/reject/mark as winner via status dropdown. Search and filter by hackathon/status.
- **Judges**: Assign judges to hackathons. Search users by email, add them as judges. View current judge assignments.
- **Support Tickets**: View all support tickets, update status, add admin responses.
- **Users**: View all profiles, assign admin/judge roles via `user_roles` table.

**Access control**: Check `has_role(auth.uid(), 'admin')` on mount. Show "Access Denied" if not admin.

## 2. Judge Dashboard (`src/pages/JudgeDashboard.tsx`)

New page at `/judge` for users with `judge` role.

**Features:**
- Shows hackathons the judge is assigned to
- Lists projects for that hackathon (approved/winner status)
- Scoring form per project: idea_score, execution_score, presentation_score (1-10 each), feedback textarea
- Auto-calculates total_score = sum of three scores
- Shows existing scores if already scored (allows updates)
- Summary view of all scores given

## 3. Route + Navigation Changes

**`src/App.tsx`**: Add two new protected routes:
- `/admin` → `<ProtectedRoute><AdminDashboard /></ProtectedRoute>`
- `/judge` → `<ProtectedRoute><JudgeDashboard /></ProtectedRoute>`

**`src/components/Navbar.tsx`**: Add conditional "Admin" and "Judge" links visible only to users with those roles (check via RPC on mount).

## 4. No Database Changes Needed

All tables (`hackathons`, `tracks`, `projects`, `judges`, `scores`, `support_tickets`, `user_roles`) and RLS policies already exist. The `has_role` function is already available.

## Files to Create/Modify

| File | Action |
|------|--------|
| `src/pages/AdminDashboard.tsx` | New — full admin panel with 5 tabs |
| `src/pages/JudgeDashboard.tsx` | New — judge scoring interface |
| `src/App.tsx` | Add `/admin` and `/judge` routes |
| `src/components/Navbar.tsx` | Add conditional Admin/Judge nav links |

