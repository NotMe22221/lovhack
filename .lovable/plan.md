

## Plan: Add Devswarm to community sponsors

### Changes in `src/pages/Season2.tsx`

**1. Copy uploaded logo**
- Copy `user-uploads://image-33.png` → `src/assets/devswarm-logo.png`
- Add import for the new logo

**2. Reorder community sponsors array**
- Row 1: Miro, n8n, Gen.xyz, Mobbin (unchanged)
- Row 2: Relay, **Devswarm** (new), Featherless, Ideavo
- Row 3: **Nodebase** (moved down), Momen, Momentum, CodeCrafters

**3. Simplify grid rendering**
With 12 sponsors total, we get a perfect 4×3 grid — no need for the separate centered row. Replace the `slice(0,8)` grid + `slice(8)` flex with a single 12-item grid.

