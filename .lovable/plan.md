

## Plan: Restructure sponsor section with Creao as cash sponsor + update logos

### Changes (all in `src/pages/Season2.tsx`)

**1. Copy uploaded logos into the project**
- Copy `user-uploads://image-31.png` → `src/assets/ideavo-logo-v2.png` (new Ideavo logo)
- Copy `user-uploads://image-32.png` → `src/assets/momen-logo.png` (Momen logo)

**2. Update imports**
- Add `import creaoLogo from "@/assets/creao-logo.png"` (already exists in project)
- Add `import momenLogo from "@/assets/momen-logo.png"`
- Replace `ideavoLogo` import with the new v2 logo
- Remove unused `ExternalLink` import

**3. Restructure sponsors into two tiers**

Separate Creao as a "Cash Sponsor" with its own prominent section above the community sponsors:

- **Cash Sponsor**: Creao — displayed alone in a larger, highlighted card with a "Cash Sponsor" label
- **Community Sponsors**: Everyone else in the existing grid (now 11 sponsors with Momen added)

**4. Update the sponsor array**
- Remove Creao from the main sponsors array (it gets its own section)
- Replace Ideavo logo with the new uploaded one
- Add Momen (`{ name: "Momen", logo: momenLogo, url: "https://momen.app", invert: false }`)
- Rebalance rows: 11 community sponsors → 4-4-3 layout with last row centered

**5. Update the section markup**
```
"Our Sponsors" heading + subtitle (keep)

── Cash Sponsor ──
Label: "Cash Sponsor" in muted text
Single centered Creao card (larger, with subtle gold/accent border)

── Community Sponsors ──  
Label: "Community Sponsors" in muted text
Grid of remaining 11 sponsors (4-col, last 3 centered)
```

