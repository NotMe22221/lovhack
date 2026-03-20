

# Final Polish Items

## 1. Restrict `sponsor_credits` Claim Codes (Security)
**Database migration**: Replace the overly permissive `"Authenticated can view credits"` SELECT policy. Regular users should see credits but NOT the `claim_code` column. Since RLS can't filter columns, create a **database view** that excludes `claim_code` and grant SELECT on that, or simply restrict the SELECT policy so only admins see claim codes.

Simplest approach: Create a view `public.sponsor_credits_public` that excludes `claim_code`, and have the Dashboard query that view instead. The admin dashboard already uses admin RLS so it can still see `claim_code`.

**Files changed**: 
- Database migration (create view + grant access)
- `src/pages/Dashboard.tsx` — query `sponsor_credits_public` view instead of `sponsor_credits`

## 2. Verify OG Image Exists
The Season 2 page references `https://lovhack.dev/og-season2.png`. Need to ensure this file exists at `public/og-season2.png`. If it doesn't, we should either add a placeholder or point to an existing image.

**File changed**: `src/pages/Season2.tsx` — update `og:image` URL if needed, or add image to `public/`

## 3. Mobile Nav + Form Polish
Quick check and fix of responsive issues — ensure the hamburger menu works, forms don't overflow on small screens, and the hero section looks right on 375px width.

