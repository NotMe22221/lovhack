

## Plan: Clean up Season 2 sponsor grid

### Changes (all in `src/pages/Season2.tsx`)

**1. Reorder sponsors array** to put strongest/most recognizable logos first:
```
Row 1: Miro, n8n, Gen.xyz, Mobbin
Row 2: Relay, Nodebase, Featherless, Ideavo
Row 3: Momentum, CodeCrafters
```

**2. Make entire card clickable** — wrap each `GlassCard` in an `<a>` tag with `target="_blank"` and add a hover effect (scale + subtle glow).

**3. Remove "Visit" link and sponsor name text** below the logo — only show the logo inside the card. The card itself handles the click.

