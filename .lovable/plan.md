

## Plan: Polish sponsor section

### Changes (all in `src/pages/Season2.tsx`)

**1. Rename title** from "Powered By" to "Our Sponsors"

**2. Add subtitle** below the heading: *"Supported by tools used by thousands of builders"* in muted text.

**3. Center the last row** — The grid is 4 columns with 10 items, so the last row has 2 cards left-aligned. Fix by rendering the first 8 sponsors in the 4-col grid, then the last 2 in a separate `flex justify-center` row with fixed-width cards matching the grid card size.

