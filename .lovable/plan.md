

# Plan: Transform LovHack into a Full Hackathon Platform

## Overview

This transforms the existing LovHack informational website into a full hackathon platform with authentication, project submissions, judging, dashboards, and more. The current light/pink glassmorphism theme is preserved. Implementation is split into 5 phases, each deliverable independently.

---

## Phase 1: Foundation (Auth + Database Schema + Profiles)

**Database migrations:**
- `profiles` table (id, user_id FK, name, email, bio, avatar_url, github, linkedin, role enum, created_at)
- `hackathons` table (id, name, season, start_date, end_date, status, created_at)
- `tracks` table (id, name, hackathon_id FK, description)
- `projects` table (id, title, tagline, description, problem, solution, demo_link, github_link, live_demo_link, demo_video_link, track_id FK, hackathon_id FK, team_id, status enum [pending/approved/rejected/winner], likes, views, thumbnail_url, tech_stack jsonb, screenshots jsonb, created_at, updated_at)
- `teams` table (id, name, project_id FK, created_at)
- `team_members` table (id, team_id FK, user_id FK, role text)
- `judges` table (id, user_id FK, hackathon_id FK)
- `scores` table (id, project_id FK, judge_id FK, idea_score int, execution_score int, presentation_score int, total_score int, feedback text, created_at)
- `support_tickets` table (id, user_id FK, subject, message, status enum, created_at)
- `mentor_profiles` table (id, user_id FK, expertise, company, photo_url, available bool)
- `sponsor_credits` table (id, sponsor_name, description, claim_code, instructions, logo_url, hackathon_id FK)
- Appropriate RLS policies on all tables
- Trigger to auto-create profile on signup
- DB function `calculate_project_score` that averages judge scores
- Enable auto-confirm for email signups (since this is a hackathon community, not a sensitive app) — or ask user preference

**Auth pages:**
- `/login` — email/password login
- `/signup` — email/password signup with name field
- Auth context/provider wrapping the app
- Protected route wrapper component

**Navigation update:**
- Update Navbar with new links: Home, Projects, Winners, Mentoring, Support, Submit Project, Dashboard
- Add user avatar/login button to navbar
- Keep existing mobile menu pattern

---

## Phase 2: Project Submission + Gallery

**Project submission page (`/submit`):**
- Multi-step form with validation (zod)
- Fields: name, tagline, description, problem, solution, track selector, demo video link, GitHub repo, live demo, screenshots (upload to storage), tools/tech stack (tag input), team members (add by email)
- Creates project + team records
- Status defaults to "pending"
- Auth-protected route

**Projects gallery (`/projects`):**
- Grid layout with project cards (thumbnail, title, team, track, tags, views, likes)
- Filter bar: Track, Season, Sort (Newest, Trending, Winners)
- Search functionality
- Pagination or infinite scroll

**Individual project page (`/projects/:id`):**
- Full project details: title, tagline, team members, track, demo video embed, description, problem, solution, screenshots gallery, tech stack badges, GitHub + live demo links
- Like button (increment likes)
- View counter
- Optional: judge feedback section (visible after judging)
- Award badges for winners

**Storage bucket:**
- Create `project-assets` bucket for screenshots and thumbnails

---

## Phase 3: User Dashboard

**Dashboard layout (`/dashboard`):**
- Sidebar navigation with tabs
- Uses existing Shadcn sidebar component

**Dashboard tabs:**
- **Profile** — edit name, bio, github, linkedin, avatar
- **My Projects** — list of user's submissions with status badges, edit/delete actions
- **My Contributions** — team memberships
- **Messages** — simple notification list (future: real messages)
- **API Credits** — sponsor credits cards with claim codes
- **Certificates** — download participation/winner certificates (leverages existing certificate system)

**Project edit page (`/dashboard/projects/:id/edit`):**
- Same form as submit, pre-filled
- Only accessible by project owner

---

## Phase 4: Judging System + Winners

**Judge Dashboard (`/judge`):**
- List of assigned projects
- Score submission form per project: idea (0-30), execution (0-50), presentation (0-20), feedback
- View project details inline
- Auth-protected, role-checked (judge role)

**Admin Panel (`/admin`):**
- Approve/reject submissions
- Assign judges to projects
- View all scores
- Override rankings
- Select winners manually
- Send announcements (store in DB, show on dashboard)
- Auth-protected, role-checked (admin role)

**Winners page (`/winners`):**
- Season selector dropdown
- Podium display (1st, 2nd, 3rd) — reuse existing WinnersSection pattern
- Top 5 finalists grid
- Each card links to project page
- Auto-populated from scores DB

**Score calculation:**
- DB function: `calculate_project_final_score(project_id)` — averages all judge total_scores
- DB view or function: `project_rankings` — ordered by final score per hackathon
- Trigger to update project status to "winner" when admin confirms

---

## Phase 5: Advanced Features

**Mentoring page (`/mentoring`):**
- Mentor cards: photo, name, expertise, company
- "Book Session" button (links to external booking or opens contact form)

**Support page (`/support`):**
- Create ticket form (subject, message)
- Ticket list with status tracking
- Simple admin view for responding

**Live Leaderboard:**
- Real-time leaderboard using Supabase Realtime
- Shows top projects by score, likes
- Updates as judges submit scores

**AI Project Summaries:**
- Edge function using Lovable AI (gemini-3-flash-preview)
- Auto-generates summary, key features, main use case from project description
- Displayed on project cards and detail pages

**Judge Analytics Dashboard:**
- Recharts-based charts: average score per project, score distribution, judge patterns, top tracks
- Admin-only access

---

## Homepage Redesign

Restructure homepage sections to reflect platform nature:
1. Hero — keep existing GSAP animation, update copy to "Submit. Build. Win."
2. Current Hackathon — highlight active hackathon with countdown
3. Tracks — show available tracks
4. Featured Projects — pull top-liked/recent approved projects from DB
5. Winners Spotlight — reuse existing winners component
6. Sponsors — keep existing
7. CTA — "Submit Your Project" button

---

## Technical Details

**New routes added to App.tsx:**
```
/login, /signup
/projects, /projects/:id
/submit
/dashboard, /dashboard/projects/:id/edit
/winners
/mentoring
/support
/judge
/admin
```

**Key architectural decisions:**
- Auth state managed via React context with `onAuthStateChange` listener
- Protected routes via wrapper component checking auth + role
- All DB operations through Supabase client with RLS enforcement
- Role-based access using existing `has_role` function and `user_roles` table
- File uploads to Supabase storage buckets
- Reusable GlassCard, form, and layout components throughout

**Database roles (using existing `app_role` enum — will extend):**
- participant (default on signup)
- judge
- admin

**Estimated scope per phase:**
- Phase 1: ~15 files (auth, schema, nav)
- Phase 2: ~8 files (submit, gallery, project page)
- Phase 3: ~10 files (dashboard tabs, edit)
- Phase 4: ~8 files (judging, admin, winners)
- Phase 5: ~8 files (mentoring, support, AI, analytics)

---

## Recommended Starting Phase

Phase 1 (Foundation) must come first — everything else depends on auth and the database schema. I recommend implementing Phase 1 immediately, then proceeding phase by phase.

