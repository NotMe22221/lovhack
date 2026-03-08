

# Add Desktop Sign-Out Button + Admin Role Assignment

## 1. Sign-Out Button on Desktop Navbar
The mobile menu already has a sign-out button (line 166), but the desktop view only shows Dashboard/Submit/Admin links with no way to sign out. 

**Fix**: Add a sign-out button (with `LogOut` icon) next to the Dashboard button in the desktop navbar section (around line 89-94). Style it as a ghost/outline button with the `LogOut` icon.

**File**: `src/components/Navbar.tsx` — add a button after the Dashboard link in the desktop `{user ? (...)` block.

## 2. Admin Role Assignment
Run a migration to insert an admin role for user `d7536002-10d2-48e5-96a6-4843c6b81ab3` (ukarthiksai@gmail.com) into `user_roles`.

```sql
INSERT INTO public.user_roles (user_id, role)
VALUES ('d7536002-10d2-48e5-96a6-4843c6b81ab3', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;
```

## Files
| File | Change |
|------|--------|
| `src/components/Navbar.tsx` | Add desktop sign-out button |
| Migration SQL | Insert admin role for the user |

