

# Fix Issues & Prepare Platform for Season 2

## Changes Required

### 1. Fix Season 1 Prize Text
**File**: `src/pages/Season1.tsx` (line 24)
- Change `"$5K+"` to `"$10K+"` to match the correct historical record.

### 2. Project-to-Season Attribution (Submission Locking)
**File**: `src/components/SubmitProjectModal.tsx`
- Currently fetches hackathons with `status = 'active'` and auto-selects the first one — this is correct for attribution.
- **Add guard**: If no active hackathons exist, show a message like "Submissions are currently closed. Check back when the next hackathon begins!" instead of the form. This locks submissions between seasons.
- Make the hackathon selector **read-only** (not a dropdown) when only one active hackathon exists, so users can see which season they're submitting to but can't accidentally change it.

**File**: `src/pages/Dashboard.tsx`
- Same guard on the "Submit New" button — disable it and show tooltip "Submissions closed" when no active hackathons.

### 3. Remove Messages Tab from Participant Dashboard
**File**: `src/pages/Dashboard.tsx`
- Remove the `{ id: "messages", label: "Messages", icon: MessageSquare }` entry from the `tabs` array.
- Remove the Messages tab content section (announcements rendering block).
- Remove unused `announcements` state and loading logic.

### 4. Enhance Judge Dashboard
**File**: `src/pages/JudgeDashboard.tsx`
- Add a **Certificates** tab so judges can view their own certificates (same logic as participant dashboard — query by `recipient_email`).
- Add project detail links (clicking project title opens `/projects/:id` in new tab) so judges can review the full project before scoring.
- Keep the interface strictly read-only for non-scoring actions — no edit/delete/admin capabilities.

### 5. Grant Admin Role to User
- Use the database insert tool to look up the `user_id` for `mazenaldamshity@gmail.com` in `profiles`, then insert an admin role row in `user_roles`.

### 6. No Devpost References Found
- Searched the entire codebase — no Devpost page or link exists. Nothing to remove here.

---

## Summary

| Change | File(s) | Type |
|--------|---------|------|
| Fix "$5K+" → "$10K+" | Season1.tsx | Text fix |
| Lock submissions between hackathons | SubmitProjectModal.tsx, Dashboard.tsx | Logic |
| Remove Messages tab | Dashboard.tsx | UI cleanup |
| Add certificates to Judge Dashboard | JudgeDashboard.tsx | Feature |
| Grant admin role | Database insert | Data |

