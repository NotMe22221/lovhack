

# Remaining Improvements

After reviewing the full codebase, here are the issues and improvements worth addressing:

## Issues Found

1. **Certificates RLS blocks participants from viewing their own certificates** — The `certificates` table only has admin-level SELECT policy. Participants querying `certificates` by `recipient_email` will get empty results. The Dashboard and JudgeDashboard both try to fetch certificates but users will never see them.

2. **Certificate deduplication missing** — The edge function generates certificates every time the admin clicks "Generate." If clicked twice, participants get duplicate certificates. No check for existing certificates.

3. **The `projects` join on `profiles` uses `!inner`** — The edge function query `profiles!inner(name, email)` joins on a foreign key that doesn't exist in the schema (there's no FK from `projects.user_id` to `profiles.user_id`). This will likely fail at runtime.

4. **No password reset flow** — Login page has no "Forgot password?" link. Users who forget their password are stuck.

5. **Signup success message says "You're now signed in"** — But email confirmation is likely required (auto-confirm is not enabled), so the user won't actually be signed in. The toast is misleading.

6. **Hero stats are hardcoded** — "20+ Countries", "40+ Projects Shipped", "100+ Builders" are static strings, while StatsSection fetches real counts from the DB. These should match or at least not contradict each other.

7. **FAQ says "48 hours"** — But Season 2 is described as "one week" elsewhere. Inconsistent duration messaging.

## Proposed Changes

### 1. Fix Certificates RLS (Critical)
**Database migration**: Add a SELECT policy so users can view their own certificates:
```sql
CREATE POLICY "Users can view own certificates"
ON public.certificates FOR SELECT
TO authenticated
USING (recipient_email = (
  SELECT email FROM auth.users WHERE id = auth.uid()
));
```

### 2. Add Certificate Deduplication
**File**: `supabase/functions/generate-certificates/index.ts`
- Before generating, check if a certificate already exists for this `recipient_email` + `hackathon_name` combo. Skip if found.

### 3. Fix Edge Function Join
**File**: `supabase/functions/generate-certificates/index.ts`
- Replace `profiles!inner(name, email)` with a two-step query: fetch projects, then fetch profiles by `user_id` separately. The service role key bypasses RLS so this will work.

### 4. Add "Forgot Password?" Link
**File**: `src/pages/Login.tsx`
- Add a "Forgot password?" link that triggers `supabase.auth.resetPasswordForEmail()`.
- Create a simple inline flow: click link, show email input, send reset email, show confirmation.

### 5. Fix Signup Success Message
**File**: `src/pages/Signup.tsx`
- Change toast to: "Check your email to verify your account before signing in."
- Don't navigate to `/dashboard` — show a verification prompt instead.

### 6. Fix Hero Stats Inconsistency
**File**: `src/components/sections/NewHeroSection.tsx`
- Update static stats to match current scale: "350+ Builders" (matches the subheadline), "20+ Countries", "50+ Projects Shipped".

### 7. Fix FAQ Duration
**File**: `src/components/sections/FAQSection.tsx`
- Change "48 hours" references to "one week" to match Season 2 format. Or say "during the hackathon" to be generic.

## Summary

| Change | Impact | Type |
|--------|--------|------|
| Fix certificates RLS | Critical — certs invisible to users | DB migration |
| Certificate dedup | High — prevents duplicates | Edge function |
| Fix edge function join | High — generation may fail | Edge function |
| Forgot password flow | Medium | UI feature |
| Fix signup toast | Medium — misleading UX | Text fix |
| Fix hero stats | Low — cosmetic consistency | Text fix |
| Fix FAQ duration | Low — content accuracy | Text fix |

