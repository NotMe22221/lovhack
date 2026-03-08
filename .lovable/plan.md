

# Modern Project Submission Modal

## Overview
Replace the current `/submit` page redirect with a modern modal overlay submission flow. The modal will have a dark builder interface with drag-and-drop uploads, video requirements, media gallery, and validation — inspired by Hack-Nation's UI.

## Database Changes

**New table: `project_media`**
- `id` (uuid, PK)
- `project_id` (uuid, FK → projects)
- `file_type` (text — image, video, pdf, zip)
- `file_url` (text)
- `file_name` (text)
- `media_role` (text — cover, demo_video, tech_video, gallery)
- `sort_order` (integer, default 0)
- `uploaded_at` (timestamptz, default now())
- RLS: owners can CRUD their media, anyone can view media for approved/winner projects

**Migration also adds** `demo_video_url` and `tech_video_url` columns to `projects` table for the required video uploads (stored directly on project, separate from gallery).

## New Component: `SubmitProjectModal`

**File: `src/components/SubmitProjectModal.tsx`** (~500 lines)

A full-featured modal submission flow replacing the page-based form:

### Structure
- Uses `Dialog` from Radix with full-screen-like overlay
- Dark-themed modal body with `ScrollArea` for internal scrolling
- Close button top-right

### Section 1: Project Cover Image
- Large drag-and-drop zone with dashed border, glow-on-drag effect
- Accepts PNG, JPG, WEBP (max 200MB)
- "Select File" button + "Add URL" button (input toggle)
- Shows preview after upload with remove option
- Helper text: "Recommended aspect ratio: 16:9"

### Section 2: Project Details
- Title, tagline, description, problem, solution (reuse existing fields)
- Hackathon/track selects, team name, tech stack
- GitHub, live demo links

### Section 3: Required Videos
- Two dedicated upload zones:
  - **Demo Video** (max 60s, MP4, 500MB) — "Focus on how the product works from the user's perspective"
  - **Tech Video** (max 60s, MP4, 500MB) — "Explain the architecture, stack, and implementation"
- Each shows upload progress bar, preview thumbnail after upload
- Or paste a URL (YouTube/Loom)

### Section 4: Media Gallery
- Multi-file drag-and-drop zone for additional images, videos, PDFs, ZIPs
- File limits: images/PDFs/ZIPs up to 50MB, videos up to 500MB
- Preview cards with type badges, remove buttons, reorder via drag
- Upload progress per file

### Validation
Before submit, checks:
- Cover image present
- Demo video present
- Tech video present  
- Title + description filled
- Shows inline validation messages with red highlights

### Submission
- Uploads all files to `project-assets` bucket
- Inserts project row (status: `pending`)
- Inserts `project_media` rows for gallery items
- Toast success, closes modal, refreshes project list

### UX/Animations
- Dashed border upload zones with `border-dashed border-2`
- Glow effect on drag-over (`ring-2 ring-primary/50 bg-primary/5`)
- Upload progress bars with `Progress` component
- File preview fade-in with `framer-motion`
- Dark card backgrounds matching existing glass-card style

## Modified Files

| File | Change |
|------|--------|
| `src/components/SubmitProjectModal.tsx` | New — full modal submission component |
| `src/pages/Dashboard.tsx` | Replace `<Link to="/submit">` with modal trigger button |
| `src/pages/Projects.tsx` | Add "Submit Project" button that opens modal |
| `src/pages/ProjectDetail.tsx` | Show media gallery, embed demo + tech videos |
| `src/pages/SubmitProject.tsx` | Keep as fallback but also import modal |
| `src/App.tsx` | No route changes needed (modal, not page) |
| Migration SQL | Create `project_media` table + add video columns to projects |

## Storage
Uses existing `project-assets` bucket. Media organized as `{user_id}/{timestamp}/{role}-{filename}`.

