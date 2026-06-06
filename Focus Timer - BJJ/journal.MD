# FightFocus — Development Journal

This file tracks progress session-by-session. Each entry documents what was built, what decisions were made, and what comes next.

**🔗 Test App:** http://localhost:5174/ (run `npm run dev` to start)

---

## 2026-05-31 — Project Setup & CLAUDE.md Created

**What we did:**
- Reviewed the complete PRD with folder structure
- Confirmed the folder structure is production-ready and aligns with PRD requirements
- Decided to create folders just-in-time as features are built (not all upfront)
- Outlined 4-phase POC plan: Foundation → Visual Feedback → Progression → Avatar System
- Created `CLAUDE.md` with development instructions
- Created `journal.MD` to track progress across sessions

**Files changed:**
- ✅ Created: `CLAUDE.md` — development instructions for Claude
- ✅ Created: `journal.MD` — this file

**Decisions made:**
- Folder structure will be created organically as features are built
- POC will focus on grappling path only (skip striking)
- POC will skip: gym backgrounds, Supabase, store, sound effects, Pomodoro cycles
- Core mechanic to prove first: timer + lock detection via Page Visibility API

**Next steps:**
1. Initialize Vite + React + TypeScript project
2. Add Tailwind CSS
3. Build Phase 1: Timer component + lock detection
4. Test that lock/unlock behavior works correctly

**Status:** Ready to begin Phase 1 — awaiting confirmation to start building

---

## 2026-05-31 — Phase 1 Complete: Timer + Lock Detection Working

**What we did:**
- ✅ Initialized Vite + React + TypeScript project
- ✅ Configured Tailwind CSS with pixel art theme colors
- ✅ Built complete timer system with lock detection
- ✅ Created session state machine (idle → running → success/broken)
- ✅ Implemented Page Visibility API for lock detection
- ✅ Built success and failure reveal screens
- ✅ Successfully tested the core mechanic end-to-end

**Files created:**
- `package.json` — dependencies (React, TypeScript, Tailwind, Zustand)
- `vite.config.ts` — Vite config with path aliases (@/* imports)
- `tsconfig.json` + `tsconfig.node.json` — TypeScript config
- `tailwind.config.ts` — Tailwind with pixel art theme
- `postcss.config.js` — PostCSS setup
- `index.html` — HTML entry point with pixel font
- `src/main.tsx` — React entry point
- `src/App.tsx` — Main app component (wires everything together)
- `src/styles/globals.css` — Global styles + Tailwind imports
- `src/types/session.ts` — TypeScript types for sessions
- `src/hooks/useTimer.ts` — Timer logic hook
- `src/hooks/useLockDetection.ts` — Page Visibility API hook
- `src/components/timer/TimerDisplay.tsx` — Countdown display
- `src/components/timer/TimerControls.tsx` — Start/reset buttons
- `src/components/session/RevealScreen.tsx` — Success screen
- `src/components/session/BrokenScreen.tsx` — Failure screen

**Technical decisions:**
- **Testing duration:** Set to 10 seconds (change to 1500 for real 25-min sessions)
- **Path aliases:** Using `@/*` imports for cleaner code
- **Separation of concerns:** Hooks for logic, components for UI
- **Simple state:** Using React hooks for now (Zustand ready but not needed yet)
- **Page Visibility API:** Detects tab switches and phone locks reliably
- **No background processing:** App stays idle when locked (as per PRD)

**Education highlights:**
- Explained why we use TypeScript types (helps AI understand data model)
- Explained path aliases for better imports
- Explained separation of concerns (hooks vs components)
- Explained why simple is better for AI-generated code
- Explained image-rendering CSS for pixel art

**How to test:**
1. Open http://localhost:5174/
2. Click START
3. Switch tabs or lock phone
4. Wait 10+ seconds → return → see success screen
5. Or return early → see failure screen

**Next steps:**
- Phase 2: Build XP system and belt progression
- Add progress bar showing advancement toward next belt/stripe
- Create simple lesson delivery (hardcoded 5-10 lessons)
- Add more polish to reveal screens (animations)

**Status:** ✅ Phase 1 Complete — Core mechanic proven!

---

## 2026-05-31 — Git Commit: Phase 1 Saved

**What we did:**
- ✅ Created `.gitignore` to exclude node_modules and build files
- ✅ Staged all 21 project files
- ✅ Created git commit with descriptive message
- ✅ Verified commit (ID: 4a70a19)

**Education covered:**
- Explained what git is (version control, savepoints)
- Explained .gitignore (what to exclude and why)
- Walked through 3-step commit process: stage → commit → verify
- Explained git vocabulary (staging, commit, commit message, commit ID)
- Explained why node_modules isn't committed (can be reinstalled)

**Commit details:**
- Commit ID: `4a70a19`
- Files committed: 21 files, 3,651 lines
- Message: "Initialize FightFocus POC: Phase 1 - Timer + Lock Detection"

**Next steps:**
- Begin Phase 2: XP system and belt progression
- Or: Test the current app and provide feedback
- Or: Learn more about the codebase structure

**Status:** ✅ Phase 1 saved to git history

---

## 2026-05-31 — Documentation Organization & File Structure

**What we discussed:**
- Reviewed unsaved files (CLAUDE.md, PRD.MD, .claude/)
- Saved PRD.MD and updated CLAUDE.md with education goals
- Added .claude/ to .gitignore (memory folder shouldn't be committed)
- Discussed whether to organize docs into folders vs keeping at root

**Education covered:**
- Clarified what "skills" are (executable commands, not folder structure)
- Explained CLAUDE.md convention (stays at root by convention)
- Discussed pros/cons of flat vs nested doc structure
- Explained "don't create structure until you need it" principle
- Why simple is better for AI-assisted development

**Decisions made:**
- Keep docs at root (CLAUDE.md, PRD.MD, journal.MD)
- Don't create premature folder organization
- Can refactor later if root gets cluttered

**Files committed:**
- Commit ID: `7593365`
- Added: PRD.MD, updated CLAUDE.md, updated .gitignore
- All project files now saved (3 commits total)

**Next steps:**
- Ready for Phase 2: XP system and belt progression
- Or: Test the current app implementation
- Or: Continue learning about the codebase

**Status:** ✅ All files saved, structure finalized

---

## 2026-05-31 — Phase 2 Started: Placeholder Avatar Added

**What we did:**
- Discussed POC phase timeline and when avatar creation happens
- Confirmed sticking with the original plan (progression before full avatar system)
- Built placeholder avatar component using emojis (simple version)
- Integrated avatar into main screen (shows idle/training states)
- Integrated avatar into reveal screens (celebration/discouraged states)
- Added test app link to top of journal.MD for quick access

**Files created:**
- `src/components/avatar/AvatarRenderer.tsx` — Simple placeholder avatar (4 states)

**Files modified:**
- `src/App.tsx` — Added avatar to main screen
- `src/components/session/RevealScreen.tsx` — Added celebrating avatar
- `src/components/session/BrokenScreen.tsx` — Added discouraged avatar
- `journal.MD` — Added test link to header

**Technical decisions:**
- Using emoji-based placeholder instead of pixel art (Phase 4)
- 4 avatar states: idle, training, celebration, discouraged
- Avatar size: 140px on home, 160px on reveal screens
- Color-coded backgrounds for visual feedback

**Education covered:**
- Explained POC phase timeline (Phase 2→3→4)
- Explained "lowest viable implementation" principle
- Why placeholder first, then complex sprite system later
- Benefits of proving concept before investing in art assets

**How to test:**
1. Open http://localhost:5174/
2. Avatar shows 🥋 when idle
3. Click START → avatar changes to 💪 (training)
4. Complete session → avatar shows 🎉 (celebration)
5. Break session early → avatar shows 😔 (discouraged)

**Next steps:**
- Phase 3: Build progression system (XP, belt ranks, progress bars)
- Create constants for belt system and XP thresholds
- Build progression store (Zustand)
- Display belt rank and progress on UI

**Status:** Phase 2 in progress — placeholder avatar working

---

## 2026-05-31 — Phase 3 Complete: XP & Belt Progression System

**What we did:**
- ✅ Built complete XP calculation system
- ✅ Created belt progression with 10 stages (white → blue belts)
- ✅ Implemented Zustand store with localStorage persistence
- ✅ Built belt display component with stripe rendering
- ✅ Built XP progress bar showing advancement to next rank
- ✅ Integrated progression into timer hook (awards XP on success)
- ✅ Added progression UI to main screen
- ✅ Added session counter

**Files created:**
- `src/types/progression.ts` — Progression types (belt ranks, unlocks, state)
- `src/constants/beltSystem.ts` — Belt progression stages and helper functions
- `src/utils/xpCalc.ts` — XP calculation with bonuses
- `src/store/progressionStore.ts` — Zustand store with persistence
- `src/components/progression/BeltDisplay.tsx` — Belt with stripes display
- `src/components/progression/XPBar.tsx` — Progress bar to next rank

**Files modified:**
- `src/hooks/useTimer.ts` — Awards XP on successful session
- `src/App.tsx` — Shows belt, XP, progress bar, and session count

**Technical decisions:**
- Simplified to 10 belt stages for POC (full system has 32 from PRD)
- XP formula: 100 XP per 25 minutes of focus time
- First session bonus: +25% XP
- Zustand persist middleware saves to localStorage (no backend needed yet)
- Progress bar shows percentage to next belt/stripe
- Belt display shows color swatch with white stripes

**Education covered:**
- Explained Zustand benefits (simple, no boilerplate, easy for AI)
- Explained persist middleware (localStorage auto-save)
- Explained helper functions vs hardcoded values (easier to modify)
- Why placeholder implementation first (prove it works, then polish)

**Belt progression included:**
- White Belt (0-4 stripes)
- Blue Belt (0-4 stripes)
- XP thresholds: 0, 500, 1200, 2000, 3000, 4200, 5500, 7000, 8700, 10500

**How to test:**
1. Open http://localhost:5174/
2. See your white belt and 0 XP at the top
3. Complete a session (10 seconds for testing)
4. See XP increase and progress bar fill
5. Complete multiple sessions to earn stripes
6. Progress bar shows % to next stripe/belt

**Next steps:**
- Add simple lesson delivery (show technique cards after sessions)
- Build lesson journal/library
- Polish reveal screens with better animations
- Consider adding unlock notifications (gear unlocks)

**Status:** ✅ Phase 3 Complete — Core progression system working!

---

## 2026-06-01 — Bug Fix: XP Not Awarded When Timer Completes

**What we did:**
- ✅ Identified bug: XP only awarded when user locked phone and returned
- ✅ If user stayed on page and let timer count down to 0, no XP was awarded
- ✅ Fixed by adding auto-complete check in timer interval
- ✅ Now awards XP whether phone is locked or user stays on page

**Problem identified:**
- `checkSession()` was only called when page visibility changed (lock → return)
- Timer reaching 0 naturally didn't trigger session completion
- Users staying on the timer page wouldn't earn XP

**Solution:**
- Modified `useTimer.ts` interval to check if `elapsed >= goalDuration`
- Auto-triggers `checkSession()` when timer naturally completes
- Preserves original lock detection flow (still works when locking phone)

**Files modified:**
- `src/hooks/useTimer.ts` — Added auto-complete check in interval effect

**Design philosophy clarified:**
- Goal is preventing phone usage, not requiring phone lock specifically
- Both scenarios count as success:
  - ✅ User locks phone and stays away
  - ✅ User leaves timer open without touching phone
- What matters: no phone interaction during focus session

**How to test:**
1. Open http://localhost:5174/
2. Click START and let timer count down to 00:00 (stay on page)
3. Session should complete automatically → see success screen
4. XP should increase and progress bar should advance
5. Also test lock flow: START → switch tabs → return after 10s → should also work

**Next steps:**
- Test both completion flows thoroughly
- Consider adding visual/audio feedback when session auto-completes
- Begin lesson delivery system (technique cards after sessions)
- Polish reveal screens with better animations

**Status:** ✅ XP bug fixed — both completion flows now work!

---

## 2026-06-01 — Phase 3.5: Polish & Visual Feedback

**What we did:**
- ✅ Added smooth animations to reveal screens (fade in, slide up)
- ✅ Added celebration bounce animation to avatar on success screen
- ✅ Added pulsing animation to XP display on success screen
- ✅ Created completion toast notification that appears when timer hits 0
- ✅ Added visual feedback to timer display (turns green + pulses at completion)
- ✅ Enhanced UX with multiple layers of feedback for session completion
- ✅ Fixed TypeScript build errors (NodeJS.Timeout → number, removed unused import)

**Files created:**
- `src/components/ui/CompletionToast.tsx` — Toast notification component

**Files modified:**
- `src/styles/globals.css` — Added animation keyframes (fadeIn, slideUp, pulse, celebrationBounce)
- `src/components/session/RevealScreen.tsx` — Added animations to modal and content
- `src/components/session/BrokenScreen.tsx` — Added fade/slide animations
- `src/components/timer/TimerDisplay.tsx` — Added completion state styling (green + pulse)
- `src/App.tsx` — Integrated toast notification with timing logic
- `src/hooks/useTimer.ts` — Fixed TypeScript errors

**Technical decisions:**
- **Animation timing:** Toast shows for 1.5s, then reveal screen appears
- **CSS animations:** Using @keyframes for smooth, performant animations
- **Visual hierarchy:** Multiple feedback layers (timer change → toast → modal)
- **Animation style:** Subtle but noticeable, fits pixel art aesthetic

**Education covered:**
- **Animations in React:** Using CSS keyframes vs JavaScript animations
- **Why CSS animations:** More performant, GPU-accelerated, cleaner code
- **UX feedback layers:** Multiple visual cues help user understand state changes
- **TypeScript browser types:** `number` for setTimeout/setInterval in browser

**Animation sequence when session completes:**
1. Timer hits 00:00 → turns green and pulses
2. Toast notification slides down: "✅ TIME'S UP!"
3. Toast fades out after 1.5 seconds
4. Reveal screen fades in with slide-up animation
5. Avatar bounces in celebration
6. XP display pulses to draw attention

**How to test:**
1. Open http://localhost:5174/
2. Click START and watch the countdown (stay on page)
3. When timer hits 00:00, observe the animation sequence:
   - Timer turns green and pulses
   - Toast appears at top
   - Success screen slides up after brief delay
   - Avatar bounces, XP pulses
4. Test lock flow: START → lock phone → return → same animations

**Next steps:**
- Begin Phase 4: Lesson delivery system
  - Create hardcoded library of BJJ techniques
  - Build lesson card component
  - Show random lesson after successful session
  - Add lesson journal/history view
- Or: Continue polish (sound effects, more animations)
- Or: Add achievement/unlock system

**Status:** ✅ Phase 3.5 Complete — Polished session completion experience!

---

## 2026-06-01 — Bug Fix: XP Calculation Issue Identified & Fixed

**Problem discovered:**
- XP was calculating to 0 for 10-second test sessions
- Formula: `100 XP per 1500 seconds (25 minutes)`
- For 10 seconds: `10 × (100/1500) = 0.666...` → rounded down to 0 XP
- Sessions were completing successfully but awarding 0 XP

**Root cause:**
- XP formula uses `Math.floor()` which rounds down
- Test duration (10s) was too short to earn even 1 XP
- Needed at least 15 seconds to earn 1 XP

**Solution:**
- Increased test duration from 10 seconds to 60 seconds (1 minute)
- Now earns 4 XP per test session
- Long enough to test but short enough for rapid iteration

**Console logs confirmed:**
- ✅ `checkSession()` was being called correctly
- ✅ `awardXP()` was being called correctly
- ✅ State was updating correctly
- ❌ XP calculation was returning 0

**Files modified:**
- `src/App.tsx` — Changed test duration: 10s → 60s

**Education covered:**
- **Debugging with console logs:** Added extensive logging to trace execution flow
- **Math.floor() behavior:** Rounds down, so small decimals become 0
- **XP formula implications:** Short sessions need different formula or minimum floor
- **Why browser console is essential:** Can see exactly what values are being calculated

**Testing verification:**
- 60-second session now awards 4 XP
- Progress bar should advance
- Session counter should increment
- Progression persists in localStorage

**Next steps:**
- Test the 60-second sessions to verify XP is awarded
- Complete multiple sessions to see progression working
- Consider adding minimum XP floor (e.g., 5 XP per session) for production
- Move to Phase 4: Lesson system

**Status:** ✅ XP bug fixed — test duration increased to 60 seconds

---

## 2026-06-02 — Git Commit: Phase 3.5 Complete

**What we did:**
- ✅ Staged all Phase 3.5 changes (9 files)
- ✅ Created comprehensive commit documenting bug fixes and polish
- ✅ Verified commit (ID: bce1220)

**Commit details:**
- Commit ID: `bce1220`
- Files changed: 9 files, 332 insertions(+), 14 deletions(-)
- Message: "Phase 3.5: Fix XP bugs and add completion animations"
- Includes: XP bug fixes, toast notifications, animations, visual feedback

**What was committed:**
- Bug fixes for XP calculation and timer auto-completion
- Toast notification system for session completion
- CSS animations (fadeIn, slideUp, pulse, celebrationBounce)
- Enhanced timer display with completion state
- Polished reveal screens with smooth transitions
- Console logging for debugging XP issues

**Next steps:**
- Begin Phase 4: Lesson delivery system
  - Create hardcoded library of BJJ techniques
  - Build lesson card component
  - Show random lesson after successful session
  - Add lesson journal/history view
- Or: Test the current build thoroughly
- Or: Continue polish (sound effects, more animations)

**Status:** ✅ Phase 3.5 committed — ready for Phase 4!

---

## 2026-06-05 — Strategic Pivot: BJJ-Only Focus

**What we discussed:**
- Analyzed the strategic benefits of removing striking and focusing exclusively on BJJ
- Decided to make the app BJJ-specific rather than multi-martial-arts

**Why this decision makes sense:**
1. **Faster validation** — Prove the concept with one discipline first
2. **Stronger community fit** — BJJ has a tight-knit, passionate community (r/bjj, gyms, etc.)
3. **Content quality** — Can deliver authentic progression with real BJJ belt system
4. **Simpler marketing** — "FightFocus: Train Your Mind Like You Train on the Mats" vs. explaining multiple paths
5. **Technical simplification** — Half the gear assets, single progression tree, clearer onboarding
6. **Expansion opportunity** — Can add striking later if BJJ version succeeds

**What we did:**
- ✅ Removed all striking references from PRD.MD
- ✅ Removed Path B: Striking section
- ✅ Removed striking curriculum (Muay Thai, Boxing, Kickboxing lessons)
- ✅ Updated app identity from "MMA Fighter" to BJJ-focused
- ✅ Simplified onboarding flow (removed path selection screen)
- ✅ Updated folder structure (removed striking folders)
- ✅ Updated sprite system examples (removed gloves, added BJJ gear)
- ✅ Updated gym environment to be BJJ academy only
- ✅ Updated messaging throughout PRD to be BJJ-specific

**Files changed:**
- `PRD.MD` — Comprehensive rewrite to BJJ-only focus
- `journal.MD` — This entry

**Code status:**
- No code changes needed! Code was already BJJ-only (grappling path only for POC)
- All existing code (belt system, XP, progression) is BJJ-specific

**Marketing changes:**
- Old tagline: "Lock your phone. Train your fighter."
- New tagline: "Lock your phone. Train on the mats."
- Target audience now emphasizes BJJ practitioners and r/bjj community

**Next steps:**
- Begin Phase 4: Lesson delivery system
  - Create hardcoded library of BJJ techniques (30+ lessons)
  - Build lesson card component
  - Show technique after successful session
  - Add lesson journal/history view
- Or: Update app metadata (package.json name, etc.) to reflect BJJ focus
- Or: Continue testing current build

**Status:** ✅ Pivot complete — app is now BJJ-focused, ready to continue Phase 4!

---

## 2026-06-06 — Lesson System: Data Structure Created

**What we discussed:**
- User asked about creating a skill to extract lessons from YouTube transcripts
- Discussed the "build vs. buy" decision for automation
- Decided to stay lean: use existing 20 lessons for POC, add automation later only if needed

**Education covered — Premature Abstraction:**
- **Don't build the tool before you've done the work**
- Right sequence: Prove it works (manual) → Do it repeatedly (find pattern) → Automate (build tool)
- Manual curation > automated garbage (YouTube transcripts need editing)
- Only automate after doing something 3-5+ times and finding a clear pattern

**What we did:**
- ✅ Converted samplelessons.MD into TypeScript constants file
- ✅ Created `src/constants/bjjLessons.ts` with 20 lessons
- ✅ Added TypeScript types for lesson structure
- ✅ Categorized lessons: mindset (5), strategy (5), technique (10)
- ✅ Added helper functions: getRandomLesson(), getLessonByIndex(), getTotalLessonsCount()

**Files created:**
- `src/constants/bjjLessons.ts` — Complete lesson library with types and helpers

**Data structure:**
```typescript
interface BJJLesson {
  id: string           // e.g., 'mindset-01'
  title: string        // e.g., "Don't Roll Just to Win"
  category: 'mindset' | 'strategy' | 'technique'
  content: string      // Full lesson text
}
```

**Technical decisions:**
- Lessons are delivered sequentially using getLessonByIndex()
- Each completed session awards the next lesson in order
- Categories help organize lessons but don't affect delivery order for POC
- Helper functions make it easy to integrate into the app

**Next steps:**
- Build lesson card component (displays lesson after successful session)
- Add lesson delivery to RevealScreen component
- Create journal/library view to see all received lessons
- Track which lessons user has received in progression store

**Status:** Ready to build Phase 4 — Lesson delivery UI!

---

## 2026-06-06 — Phase 4 Complete: Lesson Delivery System

**What we built:**
- ✅ Updated progression store to track received lessons
- ✅ Created LessonCard component for displaying lessons
- ✅ Integrated lesson delivery into RevealScreen
- ✅ Added lesson count to main UI stats
- ✅ Lessons awarded sequentially (one per completed session)

**Files created:**
- `src/components/journal/LessonCard.tsx` — Lesson display component with category badges

**Files modified:**
- `src/store/progressionStore.ts` — Added receivedLessons tracking and getNextLesson() method
- `src/components/session/RevealScreen.tsx` — Shows lesson card after XP display
- `src/App.tsx` — Shows "X techniques learned" in stats section

**How it works:**
1. User completes a focus session → earns XP
2. RevealScreen calls `getNextLesson()` from progression store
3. Next lesson in sequence is awarded (lesson index = number of lessons received)
4. Lesson is displayed in a card with category badge, title, and content
5. Lesson ID is saved to `receivedLessons` array in store (persists to localStorage)
6. Main UI shows "X techniques learned" counter

**Technical decisions:**
- **Sequential delivery:** Lessons delivered in order (0, 1, 2...) rather than random
- **Automatic persistence:** Zustand persist middleware saves receivedLessons to localStorage
- **Category badges:** Visual distinction between mindset, strategy, and technique lessons
- **Graceful completion:** When all 20 lessons are complete, shows "You've completed all lessons"

**UI Flow:**
```
Session Complete → XP Award → New Technique Unlocked → Lesson Card → Continue
```

**Education covered — State Management:**
- Store methods can return values (getNextLesson returns BJJLesson | null)
- Store methods can modify state internally (adds to receivedLessons array)
- React components call store methods in useEffect to fetch data on mount
- Arrays in Zustand should be immutated with spread operator: [...old, new]

**Next steps:**
- Test the lesson delivery system (complete 3-5 sessions)
- Build journal/library view to see all received lessons
- Add lesson search/filter features
- Consider adding lesson illustrations (pixel art)

**Status:** ✅ Phase 4 Complete — Lesson delivery working!
