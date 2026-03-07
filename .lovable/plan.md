

## Plan: Replace Devswarm logo with full branded version

### What
Replace the current icon-only Devswarm logo with the uploaded full logo (purple chevrons + "DevSwarm" text), and make the text appear black.

### How (in `src/pages/Season2.tsx`)

1. **Copy uploaded logo** → `src/assets/devswarm-logo.png` (overwrite existing)

2. **Set `invert: true`** for Devswarm in the sponsors array — this will turn the white text to black. The purple chevrons will shift color slightly due to the CSS invert filter, but this is the simplest approach to get black text from a white-text PNG.

3. If the color shift on the icon is unacceptable, an alternative is to provide a pre-edited logo with black text, which avoids any CSS filters.

