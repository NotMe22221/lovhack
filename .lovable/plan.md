

## Plan: Fix Sponsor Logo Backgrounds (Ideavo, Relay, CodeCrafters)

**Problem**: The Ideavo, Relay, and CodeCrafters logos have opaque backgrounds baked into their PNG files. On the light sponsor cards, `mix-blend-screen` doesn't work correctly — it's designed for dark backgrounds. The cards here are light/white, so the approach needs to change.

**Solution**: Switch from `mix-blend-screen` to `mix-blend-multiply` for these three logos. `mix-blend-multiply` removes white backgrounds on light cards, which is the correct blending mode for this context.

### Changes

**File: `src/pages/Season2.tsx`**
1. Rename `blendScreen` to `blendMultiply` (or just change the CSS class) for Ideavo, Relay, and CodeCrafters sponsor entries.
2. Update the `className` logic on line 264 to apply `mix-blend-multiply` instead of `mix-blend-screen`.

This single-line CSS change will make the white portions of the logo backgrounds disappear against the light cards, matching how the other logos look.

