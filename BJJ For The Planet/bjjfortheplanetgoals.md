# BJJ For The Planet — Project Goals

## Summary
BJJ For The Planet is Ryan's charity + app combo: spread jiujitsu, do charity, and use the jiujitsu network/events to generate more charity. The two live properties are the website (bjjfortheplanet.com, currently WordPress) and the app CharitySpar (charityspar.com, currently on Replit). Claude's job in this workspace is to help migrate both off their current platforms onto stacks Ryan can maintain himself, and to act as a senior consultant on brand, events, and growth.

**Source material / original reference:**
- bjjfortheplanet.com — live website (current WordPress site)
- charityspar.com — live app (current Replit-hosted app)

## What it is
BJJ For The Planet is a charity Ryan founded in 2025 with three aims:
- Spread jiujitsu
- Do charity
- Use the jiujitsu network and events to generate more charity

**Primary supported charity:** [guardiangyms.org](https://guardiangyms.org)

**Web presence:** bjjfortheplanet.com (currently WordPress)

## What's been done so far
- Volunteered with Guardian Gyms in Máncora, Peru — taught BJJ and English to kids
- Built **CharitySpar** (charityspar.com), an app currently hosted on Replit
  - Concept: two jiujitsu athletes each nominate a charity, then spar. Only the loser pays — to the *winner's* chosen charity.

## Goals for this workspace (what Claude should help with)
1. **Grow the brand/app** — marketing, positioning, event ideas, partnerships
2. **Migrate the website** off WordPress to a site Ryan maintains himself
3. **Migrate CharitySpar** off Replit to a stack Ryan maintains himself, deployed on Vercel
4. **Act as a senior consultant** for growing a nonprofit + martial arts app — brand improvements, new event formats, app feature ideas

## Subfolder structure
- `Charity Spar/` — the CharitySpar app rebuild (Vercel-hosted)
- Website rebuild work will likely get its own subfolder once started

## Stack decisions made
- **Website rebuild:** plain static HTML/CSS (single self-contained `website/index.html`, no framework, no build step) — same pattern used across Ryan's other Local Website Build client sites, so he can maintain it himself. See `website/` in this folder and the 2026-07-25 entry in `journal.md`.

## Open questions / not yet decided
- Target stack for CharitySpar rebuild (framework, database, auth, payments)
- Hosting/domain transfer plan for bjjfortheplanet.com and charityspar.com — the new website exists locally but hasn't been deployed or pointed at the live domain yet
- Real photography and additional illustrations (Ryan is sourcing these)
