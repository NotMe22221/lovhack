

## Update Medo Hackathon Page with Latest Details

Small targeted updates to `src/pages/MedoHack.tsx` based on the new announcement info.

---

### Changes

**1. Fix Registration Link**
- Change the "Register Now" button URL from `https://t.co/qMNpoZoiQZ` to `https://luma.com/q44qpofa` (appears twice: hero CTA and final CTA)

**2. Update gen.xyz Prize Details**
- Top 3 teams get a free .xyz domain **for a year** (currently just says "free .xyz domains")
- Update the Prizes section and the gen.xyz sponsor card to reflect this

**3. Add Referral Program Mention**
- Add a note in the "What You Get" or "How It Works" section that the referral program is live and tracked via Discord

**4. Clarify Prize Timing**
- Update the "More prizes" note to say judging criteria and additional prize details will be shared closer to the hackathon start

---

### Technical Details

Only one file changes: `src/pages/MedoHack.tsx`

- Line 77: Update hero Register Now href to `https://luma.com/q44qpofa`
- Line 240: Update Top 5 prize text to mention top 3 getting free .xyz domain for a year
- Line 243: Update "more prizes" note about judging criteria coming soon
- Line ~355: Update final CTA Register Now href to `https://luma.com/q44qpofa`
- Add a small referral program callout (e.g., a new row in the "What You Get" section or a note in "How It Works")

No new files or dependencies needed.

