

# Restore Navbar Links to Match Original Design

The navbar links were changed during the recent updates. Comparing the reference image to the current code:

**Reference image shows**: Home, About, Hackathons, Sponsors, Season 1, + Discord button (purple, right side)

**Current code has**: Home, Projects, Winners, Mentoring, Support (no Discord button)

## Plan

**File: `src/components/Navbar.tsx`**

1. **Restore nav links** to match the original:
   ```js
   const navLinks = [
     { to: "/", label: "Home" },
     { to: "/about", label: "About" },
     { to: "/hackathons", label: "Hackathons" },
     { to: "/sponsors", label: "Sponsors" },
     { to: "/season-1", label: "Season 1" },
   ];
   ```

2. **Add Discord button** back on the right side (purple gradient, with MessageSquare icon) — the `MessageSquare` icon is already imported but unused. Link it to the LovHack Discord invite URL.

3. **Keep all auth-related buttons** (Sign In, Dashboard, Admin, Judge, Sign Out) — they'll show when logged in, but the Discord button stays visible for all users (logged in or not).

The logged-in state buttons (Submit Project, Dashboard, Admin, Judge, Sign Out) remain as-is but will appear alongside the Discord button.

