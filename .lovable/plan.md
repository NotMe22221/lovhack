
# LovHack Mini-Hack Page Implementation

## Overview
Create a dedicated info page for Mini-Hack (the upcoming hackathon with CREAO), update the Hackathons page to link to it, and add gen.xyz logo to the homepage sponsors section.

---

## Tasks

### 1. Add Logo Assets
Copy the uploaded logos to the project:
- **CREAO logo** → `src/assets/creao-logo.png` (already exists, will verify)
- **gen.xyz logo** → `src/assets/genxyz-logo.png` (new file from uploaded image)

### 2. Create Mini-Hack Info Page (`src/pages/MiniHack.tsx`)
A dedicated landing page for the Mini-Hack event with:

**Header Section:**
- Event name: "Mini-Hack"
- Tagline: "Your First Build Starts Here"
- Dates: **February 14th - 15th, 2025**
- Status badge: "Coming Soon"

**Event Details Section:**
- What is Mini-Hack? (beginner-friendly, lower pressure, 48-hour sprint)
- Format (online, team or solo)
- Who should join

**Sponsors Section:**
- CREAO as main partner (with logo)
- gen.xyz offering free domains for winners (with logo)

**Prizes Section:**
- Free .xyz domains for winners (from gen.xyz)
- CREAO perks/access

**CTA Section:**
- "Get Ticket" / "Join Discord" buttons
- Link back to /hackathons

### 3. Update Hackathons Page (`src/pages/Hackathons.tsx`)
Modify the Mini-Hack ticket card:
- Change date from "TBA - Join Discord" to **"Feb 14-15, 2025"**
- Make the card clickable → links to `/mini-hack`
- Update description if needed

### 4. Update App Routes (`src/App.tsx`)
Add route for the new Mini-Hack page:
```
/mini-hack → MiniHack component
```

### 5. Add gen.xyz to Homepage Sponsors (`src/components/sections/SponsorsPreviewSection.tsx`)
- Import gen.xyz logo
- Add to sponsors array alongside existing sponsors

---

## File Changes Summary

| File | Action |
|------|--------|
| `src/assets/genxyz-logo.png` | Copy from upload |
| `src/pages/MiniHack.tsx` | Create new page |
| `src/pages/Hackathons.tsx` | Update Mini-Hack card (dates, link) |
| `src/App.tsx` | Add /mini-hack route |
| `src/components/sections/SponsorsPreviewSection.tsx` | Add gen.xyz logo |

---

## Technical Details

### MiniHack.tsx Structure
```text
├── Helmet (SEO meta tags)
├── AnimatedBackground
├── Navbar
├── Main Content
│   ├── Hero Section (title, dates, status)
│   ├── About Section (what/who/format)
│   ├── Sponsors Section (CREAO + gen.xyz logos)
│   ├── Prizes Section (domains for winners)
│   └── CTA Section (Get Ticket button)
└── Footer
```

### Design Approach
- Apple Liquid Glass UI style (consistent with existing pages)
- Green accent color (matching Mini-Hack's current green gradient theme)
- Glass cards with backdrop blur
- Motion animations via Framer Motion

### TicketCard Update
The Mini-Hack card will gain:
- A `link` property pointing to `/mini-hack`
- Wrapped in a `Link` component for navigation
- "Learn More" action instead of just "Get Ticket"
