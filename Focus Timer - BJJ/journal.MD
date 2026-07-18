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

---

## 2026-06-17 — Phase 5 Complete: Interactive Journal/Training Manual

**What we built:**
- ✅ Created full journal screen with ancient scroll/parchment aesthetic
- ✅ Built search functionality (searches titles and content)
- ✅ Built category filters (all, mindset, strategy, technique)
- ✅ Implemented locked/unlocked lesson system with visual distinction
- ✅ Added page-turning animations for detail view transitions
- ✅ Integrated React Router for navigation between home and journal
- ✅ Created interactive lesson cards with hover effects

**Files created:**
- `src/screens/Journal.tsx` — Complete journal screen with search, filters, and detail view
- `src/screens/Home.tsx` — Moved home screen logic from App.tsx to enable routing

**Files modified:**
- `src/App.tsx` — Refactored to use React Router with routing setup
- `src/styles/globals.css` — Added parchment scroll styling and page-turn animations
- `package.json` — Added react-router-dom dependency

**Technical decisions:**
- **Ancient scroll aesthetic:** Parchment texture with brown borders mimics a training manual
- **Page-turning animation:** 3D perspective transform creates realistic page flip effect
- **Locked lessons show titles:** Teases content without spoiling (creates anticipation)
- **Inline detail view:** Clicking a lesson expands it in place with animation (no modal)
- **Pixel-style borders:** All buttons and cards use thick borders for retro aesthetic
- **Category color coding:** Purple (mindset), blue (strategy), green (technique)

**UI/UX Flow:**
1. User clicks "📖 View Training Manual" from home screen
2. Navigates to journal at `/journal` route
3. Sees list of all 20 lessons (locked ones grayed out)
4. Can search by text or filter by category
5. Click unlocked lesson → page flips to detail view with full content
6. Click "Back to List" → page flips back to list view
7. Click "Back to Training" → returns to home screen

**CSS Animations Added:**
- `pageTurnIn` — 3D perspective rotation from left (0.6s)
- `pageTurnOut` — 3D perspective rotation to right (0.5s)
- `.parchment-scroll` — Gradient background with texture overlay
- `.parchment-page` — Individual lesson page styling
- `.lesson-card` — Hover effect with shadow and transform

**Education covered — Routing in React:**
- Why we need React Router (multi-page navigation in a single-page app)
- BrowserRouter wraps the entire app
- Routes component contains all route definitions
- Route component maps paths to screen components
- Link component for navigation (better than <a> tags)
- How routing preserves state (Zustand store persists across routes)

**Design philosophy:**
- **Feels like an artifact:** The journal should feel like a ancient martial arts manual you're gradually unlocking
- **Tactile interactions:** Page turns, hover effects, thick borders create physicality
- **Progressive disclosure:** Locked lessons create curiosity without frustration
- **Search and filter are essential:** With 20 lessons, discoverability matters

**Next steps:**
- Test the journal with actual lesson data (complete sessions to unlock)
- Consider adding lesson illustrations (pixel art diagrams)
- Add "Mark as favorite" feature
- Add "Recently viewed" section
- Consider expanding to 30-50 lessons
- Polish animations further (add sound effects)

**Status:** ✅ Phase 5 Complete — Journal system fully interactive!

---

## 2026-06-18 — Phase 6 Complete: Custom Timer Duration System

**What we built:**
- ✅ Duration selector component with presets and custom input
- ✅ Persistent duration memory (remembers last choice)
- ✅ Compact/expanded UI states (clean interface)
- ✅ Test mode for development (60-second sessions, dev-only)
- ✅ Input validation with clamping (5-1440 min range)
- ✅ Enhanced journal styling (ancient manuscript aesthetic)

**Files created:**
- `src/components/timer/DurationSelector.tsx` — Smart duration picker with presets, custom input, and test mode
- `src/vite-env.d.ts` — Vite TypeScript environment type definitions (was missing)

**Files modified:**
- `src/store/progressionStore.ts` — Added `lastDuration` state with persistence (defaults to 25 min)
- `src/screens/Home.tsx` — Integrated duration selector with collapsed/expanded states
- `src/screens/Journal.tsx` — Enhanced ancient manuscript styling with calligraphy fonts
- `src/styles/globals.css` — Added comprehensive dojo manuscript styles (600+ lines of polish)

**Technical decisions:**
- **Preset buttons:** 15/25/45/60 min for quick selection
- **Custom input:** Accepts any value, clamps to 5-1440 min range (24 hours max)
- **Test mode visibility:** `import.meta.env.DEV` flag shows 60s test button only in development
- **Collapsed UI:** After selection, shows "Focus duration: X min [Change]" — clean but accessible
- **State persistence:** Zustand persist middleware saves lastDuration to localStorage
- **XP calculation:** Already handles variable durations (no changes needed)

**UI/UX Flow:**
1. User opens app → duration selector shows (expanded)
2. Choose preset (15/25/45/60 min) OR enter custom minutes
3. Selector collapses to compact view: "Focus duration: 25 min [Change]"
4. Click [Change] to expand again
5. Click START → timer runs with selected duration
6. Next session → last duration is remembered and pre-selected

**Education covered — Vibe Coding Lessons:**
- **State persistence pattern:** Using Zustand persist middleware for localStorage
- **Collapsed/expanded UI:** Show minimum viable info, make full control easily accessible
- **Development-only features:** Test shortcuts hidden in production via env flags
- **Input validation:** Silent correction (clamping) better than annoying error messages
- **Principle dev mindset:** Assessed complexity trade-offs (Pomodoro = moderate complexity, fitness timer = different product)

**Design philosophy discussion:**
- Kept focus on core loop (lock-and-discover)
- Deferred Pomodoro cycles to v1.1 (adds significant scope)
- Rejected fitness timer mode (fundamentally different product)
- Chose simple custom duration input over complex feature set
- Prioritized proving core mechanic over feature completeness

**Next steps:**
- Test the duration system thoroughly (try different durations)
- Consider adding sound effects (session start/complete)
- Build the sprite system (replace emoji avatar with pixel art)
- Add "lock your phone" prompt when session starts
- Polish animations further

**Status:** ✅ Phase 6 Complete — Custom duration system working!

---

## 2026-06-18 — Pixel Art System Exploration & GitHub Sync

**What we did:**
- ✅ Reviewed PRD sprite specifications (48×64px, 8-layer system, palette swapping)
- ✅ Created pixel-art-demo.html — Initial canvas-based sprite demonstration
- ✅ Created pixel-art-demo-v2.html — Enhanced version matching reference image quality
- ✅ Analyzed reference images from art examples/ folder (Gemini-generated BJJ sprites)
- ✅ Documented pixel art skill system in `.claude/skills/pixel-art/`
- ✅ Committed and pushed all work to GitHub
- ✅ Set up for MCP image generation work on personal machine

**Files created:**
- `pixel-art-demo.html` — Basic canvas renderer showing 48×64px sprite concept
- `pixel-art-demo-v2.html` — Advanced demo with proper BJJ poses, gi detail, belt stripes
- `art examples/Gemini_Generated_Image_r0oht8r0oht8r0oh.png` — Reference sprite system visualization
- `art examples/Gemini_Generated_Image_x15eypx15eypx15e.png` — Reference sprite examples with layers

**Technical approach:**
- Used HTML Canvas to simulate pixel art by drawing 3px rectangles
- Demonstrated 8-layer compositing (body, hair_back, clothing, gear, face, hair_front, accessories, belt)
- Showed 4 belt progressions: white, blue, purple, black
- Rendered different poses: idle stance, guard work, celebration, master stance
- Implemented proper gi collar detail, belt stripes, and BJJ-specific posture

**Education covered — AI Image Generation Strategy:**
- **Canvas demos are for validation:** Prove the 48×64px size works and layers composite correctly
- **Not production-ready:** Canvas-drawn sprites are placeholders, not final assets
- **Next step: MCP + AI tools:** Use Higgsfield or DALL-E on personal machine for actual sprite generation
- **Why work computer blocked it:** Corporate networks often block AI image generation APIs
- **Git workflow:** Commit → Push → Clone on personal machine → Add MCP access → Generate sprites

**What the demos prove:**
- ✅ 48×64px canvas provides enough space for belt stripes, gi detail, facial features
- ✅ 8-layer system works (can composite layers independently)
- ✅ Palette swapping concept valid (same structure, different colors per belt)
- ✅ BJJ poses are recognizable at this resolution (guard work, celebration, stance)
- ✅ Belt stripes are visible (white tape marks on belt ends)

**Reference images analyzed:**
- High-quality pixel art with proper anatomy and BJJ technique
- Shows all 8 layers separated (body, hair_back, clothing, gear, face, hair_front, accessories, belt)
- Demonstrates palette swapping for skin tones and hair colors
- Shows different belt states (white gi idle, blue gi guard work, purple gi celebration)
- Includes anime-style portrait for lesson delivery screens

**Git commit details:**
- Commit: `3be5248`
- Message: "Add pixel art system demonstrations and reference sprites"
- Files: 4 new files (2 HTML demos, 2 PNG references)
- Pushed to: https://github.com/RyanDeRo/learning-claude.git

**Next steps on personal machine:**
1. Clone repo from GitHub
2. Install MCP server with image generation (Higgsfield, DALL-E, or similar)
3. Use AI to generate production-quality sprites following PRD specs
4. Create all 8 layers as separate transparent PNGs
5. Export with correct naming convention (layer_body_base_f01.png, etc.)
6. Test sprite renderer with real assets
7. Animate frames for idle, training, celebration states

**Vibe coding lesson — Placeholder → Production:**
- Build the system with placeholders FIRST (emoji, canvas demos)
- Prove the mechanics work (timer, XP, progression)
- THEN invest in production assets (commissioned art, AI generation)
- This prevents wasting time/money on art for features that might change
- Validates canvas size and layer system before pixel artist gets brief

**Why this workflow matters:**
- Work machine = restrictive policies, can't access AI image tools
- Personal machine = full control, can add any MCP servers
- Git makes this seamless: commit on work → push → pull on personal → continue

**Status:** ✅ Pixel art specs validated, demos pushed to GitHub, ready for MCP generation!

---

## 2026-06-21 — Friend Beta Launch Prep: Deployment + Art Strategy

**What we discussed:**
- Full deployment strategy for getting the app to friends
- Art cost estimates and whether to simplify the sprite system
- Idle animation gap (nothing moves when timer runs)

**Key decisions made:**

**Sprite system simplified:**
- Dropped the 8-layer compositable wardrobe system entirely for now
- New approach: one complete pre-drawn sprite per belt color (no runtime layer compositing)
- Only need 4 poses: idle, training, celebration, discouraged
- Start with white belt only — users need 21 sessions to reach blue belt, plenty of time to commission more
- Unlock incentive stays: different belt sprites + animal base model variants as milestone rewards
- Art budget for v0.1: $80–150 for 4 static white-belt sprites on Fiverr/UpWork

**What we built:**
- ✅ `vercel.json` — catch-all rewrite so `/journal` doesn't 404 on Vercel
- ✅ `index.html` — added `theme-color`, meta description, Open Graph tags, manifest link, apple-touch-icon
- ✅ `public/manifest.json` — PWA install support ("Add to Home Screen" on iPhone)
- ✅ `src/styles/globals.css` — added `trainingBob` keyframe animation
- ✅ `src/components/avatar/AvatarRenderer.tsx` — emoji now bobs rhythmically during training state; removed debug state label that was visible to all users

**Files created:**
- `vercel.json`
- `public/manifest.json`

**Files modified:**
- `index.html`
- `src/styles/globals.css`
- `src/components/avatar/AvatarRenderer.tsx`

**Hosting decision:**
- Vercel (free tier, GitHub-connected, auto-deploys on push to main)
- Cost: $0 for hosting, ~$10-15/yr if we add a custom domain later

**Next steps:**
1. Create `public/icon-512.png` — 512×512 PNG (Canva: blank canvas, 🥋 emoji centered, export PNG) — **user doing this**
2. Deploy on Vercel: vercel.com → New Project → import GitHub repo → set Root Directory to `Focus Timer - BJJ`
3. Post pixel artist brief on Fiverr using `pixel-art-demo-v2.html` as style reference — 4 static white-belt sprites, 48×64px, transparent PNG, $80–150

**Verification checklist before sending link to friends:**
- [ ] Load on mobile — browser chrome matches dark background (#1a1a2e)
- [ ] Share URL in iMessage — should show title + description preview (not blank)
- [ ] iPhone "Add to Home Screen" — shows icon, not letter soup
- [ ] Navigate directly to `/journal` — loads correctly, no 404
- [ ] Start timer — emoji bobs rhythmically, not static
- [ ] Complete session — no debug "idle/training" text visible below avatar

**Status:** ✅ All code changes done — waiting on icon PNG before deploy

---

## 2026-06-21 — Git Commit: Sync to Work PC

**What we did:**
- Committed all pending changes to git so work can continue on another machine
- Staged: `.gitignore`, `index.html`, `journal.MD`, `AvatarRenderer.tsx`, `globals.css`, `vercel.json`, `public/`, `art examples/`, `.claude/`

**Next steps:**
- On work PC: `git pull` to get latest
- Create `public/icon-512.png` (512×512 PNG with emoji, via Canva)
- Deploy to Vercel once icon is ready

**Status:** ✅ Synced to GitHub

---

## 2026-07-18 — Art Assessment: AI-Generated Sprite Set Is POC-Viable

**What we did:**
- Reviewed the four AI-generated character images in `art examples/`: base idle, celebrate, discouraged, and double-leg shot
- Assessed them against the simplified sprite plan from the last session (4 flat poses, no layer compositing)
- Verdict: **yes, this set unblocks the app.** Character is consistent across all four poses (same face, hair, gi, proportions) — the hard part of AI sprite generation is already solved
- The double-leg pose can serve as the "training" pose, completing the 4-pose set we scoped
- This potentially replaces the planned $80–150 Fiverr commission for white-belt sprites

**Prep work needed before the images go in the app:**
1. Background removal — images have baked-in solid backgrounds (dark red / black) with soft shadows; need transparent PNGs
2. Normalize canvas — crop/scale all four to the same dimensions with the character aligned consistently (feet on same baseline)
3. Fix the filename ` basecharacterimage.png` (leading space) → `basecharacter-idle.png`; rename others to a consistent scheme

**Known gap (deferred, not blocking):**
- Belt progression on-sprite: gi and belt are both white, so recoloring just the belt on a flat image is fiddly. POC decision: show belt rank in the UI (colored belt bar under the avatar), regenerate belt-colored sprite variants later using the base image as the style anchor

**Decisions made:**
- Proceed with the AI-generated set as the white-belt POC art; skip the artist commission for now
- Belt color lives in UI chrome for POC, not on the sprite

**Next steps:**
1. Process the 4 images (background removal, crop, rename) and wire them into `AvatarRenderer.tsx`, replacing the emoji
2. Map poses to app states: idle → home, double-leg → timer running, celebrate → session complete, discouraged → session abandoned
3. Then resume the pre-deploy checklist from 2026-06-21 (icon exists now at `public/icon-512.png` — verify it, then Vercel deploy)

**Status:** ✅ Art unblocked — ready to integrate sprites into the app

---

## 2026-07-18 — Sprites Processed and Wired Into the App

**What we did:**
- Removed backgrounds from all 4 character images using macOS's built-in ML subject segmentation (Vision framework via a small Swift script) — color-based removal was impossible because the hair and background are both pure black
- Verified cutouts against a magenta test background: hair, outlines, edges all clean
- Normalized all 4 sprites: cropped, scaled with one shared factor (preserves relative proportions between poses), bottom-aligned on a 512×640 canvas
- Output to `public/sprites/`: `idle.png`, `training.png`, `celebration.png`, `discouraged.png` (named to match avatar states exactly)
- Rewrote `AvatarRenderer.tsx`: emoji replaced with sprite images; all 4 render stacked with opacity toggling (preloads them, so no flash on state change); 300ms cross-fade; training pose keeps the bob animation
- Renamed ` basecharacterimage.png` (leading space) → `basecharacter-idle.png`
- Build passes (tsc + vite); dev server running; sprite URLs confirmed serving (HTTP 200)
- Answered XP mechanics question: XP is linear at 4 XP/min (100 per 25-min session), +25% first-session-of-day bonus, all-or-nothing on goal completion (awarded on goal duration only if reached, `useTimer.ts:67`)

**Files changed:**
- `src/components/avatar/AvatarRenderer.tsx` (rewritten)
- `public/sprites/idle.png`, `training.png`, `celebration.png`, `discouraged.png` (new)
- `art examples/basecharacter-idle.png` (renamed)

**Decisions made:**
- Used Apple Vision subject-lift instead of color keying — semantic segmentation handles black-on-black; the Swift tool lives in session scratchpad (rebuildable in ~20 lines if needed again)
- Dropped the colored state box behind the avatar; sprites render on the app background directly
- XP scaling discussion: keeping linear + all-or-nothing for POC; revisit partial credit and length multipliers after real usage

**Next steps:**
1. User visually verifies all 4 states in browser (idle → training → celebration/discouraged)
2. Commit sprite integration
3. Resume pre-deploy checklist (icon-512.png exists; Vercel deploy)

**Status:** ✅ Sprites integrated — pending user visual check in browser

---

## 2026-07-18 — Avatar System: Skin Tone Recolor + Second Identity Scaffolding

**What we did:**
- Planned and built infrastructure for avatar variety, deliberately scoped smaller than the PRD's original 8-layer palette-swap system (that needs true indexed pixel art from a human artist — AI-generated flat sprites can't be reliably palette-swapped the way the PRD spec assumes)
- Decisions confirmed with user: skin tone = programmatic recolor (no new AI art), character variety = add one more identity via the existing pipeline (not the full layered system, not yet)
- Formalized this session's earlier scratchpad tooling into a real, reusable pipeline at `tools/sprite-pipeline/`: `liftsubject.swift` (Vision-framework background removal), `normalize.py` (crop/scale/bottom-align), new `recolor_skin.py` (auto-detects the skin-colored pixel cluster via HSV hue/saturation/value thresholds, shifts hue+saturation with a modest per-pixel-preserving value nudge to produce 6 Fitzpatrick-scale tone variants without touching hair/gi/belt)
- Generated 6 skin-tone variants of all 4 existing poses; verified via contact sheet — clear light-to-dark progression, gi/hair untouched
- Added `types/avatar.ts` (`AvatarConfig`), `store/avatarStore.ts` (Zustand + persist, same pattern as `progressionStore`)
- Rewrote `AvatarRenderer.tsx` to build sprite paths from the store (`presetId`/`skinTone`) instead of a hardcoded path map
- Built `AvatarPicker.tsx` — tap-the-avatar modal with character (Base/Woman) and skin-tone swatches, wired into `Home.tsx`
- Removed old flat `public/sprites/*.png` (superseded by `public/sprites/base/tone-3/*.png`, confirmed pixel-identical before deleting)
- Verified end-to-end with Playwright against the running dev server: picker opens, tone selection updates the sprite live, selection persists across reload, zero console errors

**Files changed:**
- New: `tools/sprite-pipeline/{liftsubject.swift,recolor_skin.py,normalize.py,README.md}`
- New: `src/types/avatar.ts`, `src/store/avatarStore.ts`, `src/components/avatar/AvatarPicker.tsx`
- New: `public/sprites/base/tone-{1..6}/{idle,training,celebration,discouraged}.png` (24 files)
- Modified: `src/components/avatar/AvatarRenderer.tsx`, `src/screens/Home.tsx`
- Removed: `public/sprites/{idle,training,celebration,discouraged}.png` (old flat files)

**Decisions made:**
- Static pre-generated tone variants (build-time script) over runtime canvas recoloring — simpler to maintain/debug, zero new client-side image processing code, matches existing static-asset pattern
- "Woman" preset scaffolded (types/store/renderer all support it) but not yet populated — user is generating 4 raw pose images now; once dropped in `art examples/`, run them through `tools/sprite-pipeline` to populate `public/sprites/woman/`
- Deferred: full PRD 8-layer palette-swap system (needs a commissioned pixel artist); onboarding/AvatarSetup integration (separate already-flagged milestone)

**Next steps:**
1. User finishes generating 4 raw "woman" pose images
2. Run them through `tools/sprite-pipeline` (liftsubject → normalize → recolor_skin) to populate `public/sprites/woman/tone-{1..6}/`
3. Verify the Woman preset renders correctly in `AvatarPicker`
4. Resume the onboarding milestone flagged earlier this session

**Status:** ✅ Skin tone system complete and verified; Woman preset scaffolded, pending user's raw art

---

## 2026-07-18 — Woman Preset Populated via Sprite Pipeline

**What we did:**
- User generated 4 raw pose images for a second character identity and organized them into `art examples/basecharacterfemale/`
- Reviewed and renamed the 4 images to match the existing `basecharactermale/` convention by identifying pose content: fist-pump/knee-raise → `basecharactercelebrate.png`, neutral standing → `basecharacter-idle.png`, head down/slumped → `basecharacterdiscouraged.png`, crouched hands-forward → `basecharacterdoubleleg.png`
- Ran the full `tools/sprite-pipeline` (background removal → normalize → 6-tone recolor) against the new set, populating `public/sprites/woman/tone-{1..6}/{idle,training,celebration,discouraged}.png`
- Verified via contact sheet (clean cutouts, consistent character, correct tone progression) and via Playwright against the running dev server: selected "Woman" in `AvatarPicker`, confirmed correct sprite renders on Home screen with a selected skin tone, zero console errors
- `npm run build` still passes

**Files changed:**
- Renamed: 4 files in `art examples/basecharacterfemale/`
- New: `public/sprites/woman/tone-{1..6}/{idle,training,celebration,discouraged}.png` (24 files)

**Decisions made:**
- None new — this executed the plan and tooling built in the previous session's entry

**Next steps:**
- Both presets (Base, Woman) are now fully playable with all 6 skin tones each
- Resume the onboarding milestone flagged earlier — still the main gap before this is shareable with someone outside the household
- If pursuing more identities later, the process is now: generate 4 raw poses → rename to convention → run `tools/sprite-pipeline` (documented in its README)

**Status:** ✅ Woman preset complete and verified — avatar system fully functional end-to-end

---

## 2026-07-18 — Onboarding Flow Built

**What we did:**
- Built the first-launch onboarding flow flagged as the last gap between the current POC and something shareable with a stranger (per PRD section 7.8, adapted: skipped the separate timer-setup step since Home already has a duration selector — 3 steps instead of the PRD's 5, keeping it under the "2 minutes" target)
- Extracted `AvatarConfigFields.tsx` (preset buttons + skin-tone swatches) out of `AvatarPicker.tsx` so the same selection UI is reusable without modal chrome — used by both the settings picker and the new onboarding avatar step, avoiding duplicated JSX
- Built `src/screens/Onboarding.tsx`: 3-step flow (Welcome → avatar creation → lock-mechanic explanation) with a step-dot progress indicator, styled to match existing pixel-panel/pixel-accent conventions
- Added `src/store/onboardingStore.ts` (Zustand + persist, same pattern as the other stores) tracking `hasCompletedOnboarding`
- Gated the `/` route in `App.tsx`: shows `Onboarding` until the flag is set, then `Home` — no separate route/redirect needed
- Verified the full flow end-to-end with Playwright against a fresh browser context (no localStorage): welcome → picked Woman + skin tone 2 → confirmed that choice rendered correctly in the next step's preview → lock mechanic step → landed on Home with the chosen character → reloaded and confirmed it skips onboarding on return visits. Zero console errors throughout.

**Files changed:**
- New: `src/screens/Onboarding.tsx`, `src/store/onboardingStore.ts`, `src/components/avatar/AvatarConfigFields.tsx`
- Modified: `src/components/avatar/AvatarPicker.tsx` (now just modal chrome around the shared fields), `src/App.tsx` (routing gate)

**Decisions made:**
- Reused Home's existing duration selector instead of building a separate onboarding timer-setup step — avoids two places that set the same value
- Onboarding is a full route swap on `/`, not a modal overlay — simpler to reason about, no z-index/layering concerns with the rest of the app

**Next steps:**
- Core loop, avatar system (2 presets × 6 tones), and onboarding are now all functional — this is arguably the first build worth handing to a friend
- Remaining PRD gaps if pursued: Pomodoro mode (cycles), gym background scene, more belt stages/lessons, monetization — none of these block a first real playtest
- Consider: dogfood this build for a few days before adding more scope

**Status:** ✅ Onboarding complete and verified — first-launch experience now explains the mechanic before the timer starts

---

## 2026-07-18 — Live on Vercel

**What we did:**
- User signed up for Vercel and connected the GitHub repo (`RyanDeRo/learning-claude`), setting Root Directory to `Focus Timer - BJJ` and confirming the Vite preset — deploys are now automatic on every push to `main`, free hobby tier, no custom domain yet
- Before pushing: found 365 pending-but-uncommitted deletions for the unused `art examples/FREE Mana Seed Character Base Demo 2.0/` reference pack (predated this session, not something this session removed) — confirmed with user it was intentional cleanup, then committed it alongside today's actual feature work (avatar system, onboarding, sprite pipeline) in one commit
- Added `tools/sprite-pipeline/.venv/` and the compiled `liftsubject` binary to `.gitignore` before committing — the venv alone was 62MB and the binary is meant to be rebuilt locally per the pipeline's README, not shipped
- Pushed to `origin/main`; Vercel's GitHub integration auto-deployed within ~10 seconds
- Verified the **live URL** (https://focus-timer-screen-lock-bjj.vercel.app/), not just localhost: confirmed old deploy was serving a stale pre-session commit at first (explains why onboarding didn't appear and the avatar looked like the old 🥋 emoji — nothing was actually broken, just not yet pushed), then re-verified after the push landed — onboarding triggers correctly on a fresh session, Woman preset + skin tone selection carries through the flow, lands on Home with the right character, and `/journal` loads directly with no 404 (confirming the catch-all rewrite in `vercel.json` works in production, not just in theory)
- Confirmed Open Graph/description meta tags are present for share previews (no `og:image` yet, so link previews will be text-only, no thumbnail — noted as a possible future polish item, not fixed now)

**Files changed:**
- `.gitignore` (added sprite-pipeline venv/binary excludes)
- Committed: all of this session's earlier work (avatar system, onboarding, sprite pipeline, Mana Seed cleanup) in one commit — see prior journal entries for details

**Decisions made:**
- No Vercel CLI/API access set up for Claude — GitHub-integration-based deploys need zero shared credentials; CLI access deferred until there's an actual need (log inspection, rollbacks) rather than set up preemptively

**Next steps:**
- App is live and shareable. Reasonable next real-world test: send the link to one or two people and see if the core loop (lock phone → return → reveal) actually lands for someone who didn't watch it get built
- Possible small polish: an `og:image` for richer link previews when sharing
- Bigger-ticket items still open from the PRD (Pomodoro mode, gym scene, more belts/lessons, monetization) — none urgent before real feedback comes in

**Status:** ✅ Live in production at https://focus-timer-screen-lock-bjj.vercel.app/ — verified end-to-end against the actual deployed site, not just localhost

---

## 2026-07-18 — Three Real-World Bugs from First Mobile Testing

**What we did:** First live feedback from actually testing on a phone (Samsung Galaxy S20) surfaced three issues, all fixed and verified:

1. **Custom timer minimum was 5 min, needed 1 min.** Changed the clamp in `DurationSelector.tsx` (`handleCustomSubmit`) from `Math.max(5, ...)` to `Math.max(1, ...)`, updated the `<input min="5">` and label text to match.

2. **"Change" duration link was hard to see/tap.** It was a bare `text-xs underline` link with no visible tap target. Restyled as a proper pill button (`bg-blue-600`, `px-4 py-2`, `rounded-full`) — same visual weight as other buttons in the app, ~40px tall touch target.

3. **Screen lock "interrupted progress" on Android — root-caused and fixed.** The actual lock-detection logic (Page Visibility API) was fine; the real bug was that the running session lived only in React's in-memory `useState`, never persisted. Samsung phones aggressively kill backgrounded browser tabs to save battery — locking the screen likely killed the tab outright, so when the user unlocked and reopened it, the page reloaded with zero memory of the session that had been running. Fixed by adding `src/store/sessionStore.ts` (Zustand + persist, same pattern as the other stores) so the active session survives a tab kill, plus a mount-time check in `useTimer.ts`: if a recovered session is `focus_running` and the page is already visible on load (meaning no `visibilitychange` event will fire to trigger the normal check), it checks immediately against real elapsed time. This also incidentally makes an accidental page refresh mid-session resolve correctly instead of just losing the session silently.

**Files changed:**
- `src/components/timer/DurationSelector.tsx` (1-min minimum, Change button styling)
- New: `src/store/sessionStore.ts`
- `src/hooks/useTimer.ts` (session now backed by the persisted store; added mount-recovery check)

**Decisions made:**
- Persisted session state via the same Zustand + persist pattern already used everywhere else in the app, rather than a one-off localStorage read/write — keeps the codebase consistent

**Verification:**
- Rebuilt (`npm run build`, passes)
- Verified all three fixes against the dev server with Playwright, including simulating the actual failure mode: started a session, rewrote its `startTimestamp` in localStorage to simulate real elapsed time (26 min for the success case, 5 min for the broken case), then hard-reloaded the page (simulating Android killing and recreating the tab) — confirmed the app correctly resolves to Session Complete (+125 XP) or Session Broken ("5 of 25 minutes") immediately on reload in both cases, rather than losing the session
- This is the first fix in the project driven by real device testing rather than desktop/Playwright-only verification — worth remembering that some classes of bugs (aggressive mobile battery management) only surface off a real phone

**Next steps:**
- Push and let Vercel redeploy, then user re-tests the actual lock-screen scenario on their Galaxy S20 to confirm in the real world (Playwright can simulate the tab-kill mechanism but can't fully replicate Samsung's OS-level battery behavior)

**Status:** ✅ All three fixes implemented and verified locally — pending push + real-device confirmation
