

# Plan: Generate New Card Images for "Why LovHack" Section

## Overview
Generate 3 new AI-created images for the "Why LovHack" section cards, replacing the current stock-style images with custom artwork that better represents each concept.

## Images to Generate

### 1. Ship Real Projects
- **Concept**: A rocket launching from a laptop screen, symbolizing launching/shipping products
- **Style**: Modern, vibrant, tech-focused illustration with purple/pink accents (matching LovHack brand colors)

### 2. Learn by Doing
- **Concept**: Hands on keyboard with code/light effects, representing active learning and building
- **Style**: Dynamic, energetic illustration showing the act of creation and learning

### 3. All Skill Levels
- **Concept**: Diverse group of people/avatars collaborating, representing beginners to experts working together
- **Style**: Inclusive, welcoming illustration showing teamwork across experience levels

## Technical Implementation

1. **Create Edge Function**: Build an edge function that uses the Lovable AI image generation API (`google/gemini-2.5-flash-image`)

2. **Generate Images**: Call the edge function 3 times with appropriate prompts for each card

3. **Save Images**: 
   - Upload generated images to storage
   - Update the asset imports in `WhatIsLovHackSection.tsx`

4. **Update Component**: Replace the image sources with the new generated images

## Files to Create/Modify

| File | Action |
|------|--------|
| `supabase/functions/generate-card-image/index.ts` | Create - Edge function for AI image generation |
| `src/assets/card-ship-new.png` | Create - Generated image for "Ship Real Projects" |
| `src/assets/card-learn-new-v2.png` | Create - Generated image for "Learn by Doing" |
| `src/assets/card-skills-new.png` | Create - Generated image for "All Skill Levels" |
| `src/components/sections/WhatIsLovHackSection.tsx` | Modify - Update image imports |

## Technical Details

### Edge Function Structure
```text
supabase/functions/generate-card-image/
  - index.ts (main handler)
```

The edge function will:
- Accept a prompt parameter
- Call the Lovable AI gateway with image generation model
- Return the base64 image data

### Image Generation Prompts
Each prompt will specify:
- Modern, clean illustration style
- Purple/pink accent colors to match LovHack branding
- Dark background compatible design
- Appropriate subject matter for each card

