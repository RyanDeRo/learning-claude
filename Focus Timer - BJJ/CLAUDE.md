# FightFocus — Claude Instructions

## Project Overview

FightFocus is a focus timer app with martial arts gamification. Users lock their phone during focus sessions, and their fighter avatar trains while they're away. When they return, they discover what they learned and unlocked.

**Source of Truth:** `PRD.MD` contains the complete product specification, technical architecture, and folder structure.

---

## Development Journal

**CRITICAL:** After every interaction with the user, you MUST update `journal.MD` with a summary of:
- What was discussed
- What code was written or modified
- What decisions were made
- What the next logical steps are
- Any blockers or questions that remain

**Format for each entry:**
```markdown
## [Date] — [Brief Title]

**What we did:**
- Bullet list of actions taken

**Files changed:**
- List of files created/modified

**Decisions made:**
- Any architectural or design choices

**Next steps:**
- What should happen in the next session

**Status:** [In Progress / Blocked / Complete]
```

**Purpose:** The human should be able to read `journal.MD` and immediately understand where the project stands without re-reading the entire conversation history.

**Location:** `/Users/rderobertis/Personal/learning-claude/Focus Timer - BJJ/journal.MD`

---

## Development Approach

- Build features incrementally following the POC phases outlined in PRD discussions
- Create folder structure as needed (just-in-time, not all at once)
- Test core mechanics (timer, lock detection) before building UI polish
- Use placeholder assets during early phases
- Prioritize proving the core loop works over feature completeness

---

## Key Technical Constraints

- Web-first (React PWA with Vite)
- No background processing during lock (app is idle)
- Lock detection via Page Visibility API
- Sprite system: 48×64px base canvas, 8-layer compositing, palette swapping
- State management: Zustand
- Styling: Tailwind CSS
- Local storage for POC (Supabase later)

---

## What NOT to Do

- Don't create documentation files unless explicitly requested
- Don't build features not in the PRD without confirming first
- Don't create all folders upfront (create as needed)
- Don't add authentication until post-POC
- Don't build the striking path until grappling path is proven

---

## Education Goals

- Educate the user on what technical decisions are made and why, especially as they pertain to AI topics like folder structure, context management, skill creation, etc. Explain in simple terms as though you were onboarding an employee to engineering that does not have an engineering background. My education goal for this project is for the operator to become an excellent vibe coder. 
---

## Quick Reference

- **PRD:** Full product spec and architecture
- **Journal:** Session-by-session progress log (update after EVERY interaction)
- **Current Phase:** Pre-Development (POC not yet started)
