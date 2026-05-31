# FightFocus — Product Requirements Document
**Version:** 0.4 — Belt System, Monetization & SEO Finalized  
**Status:** Pre-Development / Ready for Claude Code  
**Last Updated:** Accurate BJJ belt/stripe system, monetization strategy with Founders tier, premium feature roadmap, full SEO/ASO analysis

---

## 1. Product Overview

**App Name (working title):** Focus Timer - MMA Fighter
**Platform:** Web app first (React PWA) → Native (Expo/React Native) in v2  
**Core Concept:** A focus timer app that reduces phone addiction through martial arts–themed gamification. Users earn progress by keeping their phone screen locked for the duration of a focus session. When they return to the app, their avatar reveals what they learned and unlocked while they were away — creating a discovery moment that rewards discipline rather than punishing distraction.

**Tagline (working):** *"Lock your phone. Train your fighter."*

---

## 2. Problem Statement

Smartphone addiction is widespread. Existing focus apps (Forest, Flora) provide passive deterrents but lack deep, sustained engagement loops. FightFocus turns phone abstinence into a fighter progression arc — combining the behavioral pull of RPG progression with a real martial arts education that compounds over time.

The product works because it reframes the locked phone not as a sacrifice but as training time. The user doesn't miss out while the screen is dark — their fighter is working. The payoff comes on return.

---

## 3. Target Audience

- Ages 14–35
- Gamers, martial arts fans, students, productivity-focused individuals
- People who have tried focus apps but lacked sustained motivation
- Casual martial arts fans with no real training experience (education is a hook, not a barrier)

---

## 4. Core Product Pillars

| Pillar | Description |
|---|---|
| **Focus Timer** | Pomodoro-style timer with session management |
| **Lock & Return Loop** | Core mechanic: lock phone → session runs passively → return to discover progress |
| **Avatar & Gym** | Pixel JRPG-style avatar in an animated gym environment |
| **Progression System** | Gear unlocks, belt ranks, gym decorations tied to session completions |
| **Martial Arts Education** | Real technique lessons delivered on session completion, saved to journal |
| **Monetization** | Freemium with cosmetic IAP and premium subscription |

---

## 5. The Core Loop (Most Important Section)

This is the heartbeat of the product. Every feature exists to support this loop.

```
User opens app
        ↓
Sets focus timer duration
        ↓
Starts session → app records timestamp → user locks phone / closes app
        ↓
[Phone is locked — app does nothing in background]
        ↓
User returns to app
        ↓
App compares return timestamp to session start + goal duration
        ↓
      [Did they make it?]
       ↙ ↘
   SUCCESS BROKEN
Avatar celebrates Avatar slumped
Lesson delivered Encouragement shown
Gear progress No XP awarded
XP awarded Try again prompt
        ↓
User sees what they unlocked / learned
        ↓
Motivated to run another session
```

**Why this works narratively:** The avatar trains while the screen is dark. The user doesn't watch it happen. They come back to discover what changed. This is intentional — it mirrors the way real training works. You put in the work, you come back, you're different.

---

## 6. Lock Detection — Technical Approach

This is the core mechanic and must be reliable. The implementation is deliberately simple.

**How it works:**
1. On session start, record `session_start_timestamp` and `session_goal_duration`
2. User locks phone / closes browser tab
3. App does zero background processing — nothing runs while locked
4. When user returns (app foregrounded / tab becomes visible):
   - Record `return_timestamp`
   - Calculate `elapsed = return_timestamp - session_start_timestamp`
   - If `elapsed >= session_goal_duration` → session SUCCESS
   - If `elapsed < session_goal_duration` → session BROKEN

**Cheat prevention:**
- If the app is foregrounded before the timer ends, session is immediately marked BROKEN
- The break is logged with a timestamp
- No grace period — returning early means the session failed

**Web implementation:**
- Page Visibility API (`visibilitychange` event) detects tab focus/blur
- `document.hidden` state checked on return
- Any tab-focus event before session end = broken session

**Native implementation (v2):**
- `AppState` API in React Native detects foreground/background transitions
- Same logic, more reliable signal than web
- Detects actual screen lock rather than just tab switching

**What we are NOT building:**
- No background audio during lock
- No continued animations during lock
- No live background process of any kind
- No ambient sound tied to lock state

Audio and animation run only when the user is actively in the app. When locked, the app is silent and idle. The magic happens in the reveal on return, not in the background.

---

## 7. Feature Specifications

---

### 7.1 Focus Timer

**Modes (MVP):**
- **Pomodoro Mode** — Alternating focus/rest cycles. Defaults: 25 min focus / 5 min rest / 4 cycles / 15 min long break. All durations configurable.
- **Custom Timer Mode** — User sets any single duration. One session, no cycles.

**Modes (v1.1+):**
- **Streak Mode** — Extended session (60–180 min) for advanced users

**Timer UI:**
- Large, clear countdown display — dominant element on screen
- Session type label (Focus / Rest)
- Cycle indicator (e.g., "Session 2 of 4")
- Start / Pause / End Session controls
- On session start: prompt to lock phone with brief copy explaining the mechanic
- Rest periods: user can stay in app freely; rest timer runs without lock requirement

**Session States:**
- `idle` — no session running
- `focus_running` — user should have phone locked
- `rest_running` — user can interact freely
- `session_complete` — reveal screen shown
- `session_broken` — break screen shown

**Settings:**
- Focus duration
- Rest duration
- Long break duration
- Cycles before long break
- Toggle: allow partial XP on broken sessions (off by default)

---

### 7.2 Session Reveal Screen

This screen is a key product moment. It should feel like opening a reward.

**On SUCCESS:**
- Avatar celebration animation plays
- XP earned displayed (animated counter)
- If new gear unlocked: gear reveal with animation
- If new belt stripe/rank: rank-up ceremony
- Lesson card delivered (see Section 7.6)
- Progress bar toward next unlock shown
- CTA: "Start another session" or "Go to journal"

**On BROKEN:**
- Avatar discouraged animation plays
- Brief message — encouraging, not punishing ("Your fighter is waiting. Try again.")
- How long they lasted shown (e.g., "You made it 14 of 25 minutes")
- CTA: "Try again" (pre-fills same timer duration)
- No XP awarded by default

**Design principle:** The broken screen should never feel mean. It should feel like a coach saying "shake it off." Retention depends on users trying again, not feeling bad.

---

### 7.3 Avatar Creation

**Entry Point:** First-launch onboarding

**Free Customization Options:**

| Category | Options |
|---|---|
| Gender expression | Masculine / Feminine / Neutral |
| Skin tone | 6 Fitzpatrick scale tones |
| Hair style | 8 base styles |
| Hair color | 10 base colors |
| Eye color | 6 options |
| Face shape | 4 options |

**Unlockable / IAP Cosmetics:**
- Jewelry (earrings, chains, nose rings)
- Tattoos and skin markings
- Additional hair styles and colors
- Eye style expansions

**Art Direction:**
- Pixel art sprite — **48×64 px base canvas**, rendered at **3× scale (displays at 144×192px)** with nearest-neighbor interpolation
- 8-layer sprite system (see Section 7.3a for full layer spec)
- Separate anime-style portrait illustration for profile screen and lesson delivery
- Avatar is always visible in the gym scene when app is open
- Size rationale: 48×64 chosen over 32×48 to preserve gear visibility. Belt stripes, gi collar shape, glove silhouettes, and gear detail all require the additional canvas space to read clearly. Gear progression is the emotional core of the product; the art must support it.

**Animation States:**
- Idle (subtle breathing, slight sway)
- Training (path-dependent — see Section 7.4)
- Celebration (fist pump, jump — plays on session success)
- Discouraged (head down, slumped — plays on session broken)
- Rank-up ceremony (special animation, plays on belt/rank advancement)

**Audio (in-app only):**
- Ambient gym sounds play while user is in the app
- Distinct SFX: session start, session complete, session broken, rank-up, lesson received
- All audio stops when app is backgrounded / phone locked

---

### 7.3a Sprite System Specification

This spec must be handed to both the pixel artist and Claude Code before any art or rendering code is produced. All assets and all renderer logic derive from this document. Do not deviate without updating this spec first.

**Canvas & Rendering**

| Property | Value |
|---|---|
| Base canvas size | 48×64 px |
| Render scale | 3× (nearest-neighbor interpolation — no anti-aliasing) |
| Display size | 144×192 px |
| Background | Transparent (PNG only) |
| Anchor point | Feet aligned to bottom-center of canvas |
| Color mode | Indexed palette (for palette swapping) |

**Layer Stack (render order — 1 is bottom, 8 is top)**

| Layer | Name | Contents | Notes |
|---|---|---|---|
| 1 | `body` | Skin base, body shape | Skin tone applied here via palette swap |
| 2 | `hair_back` | Back of hair, ponytails, long sections | Renders behind head/face |
| 3 | `clothing_base` | Default t-shirt and shorts | Replaced by gear as user progresses |
| 4 | `gear` | Gi, gloves, fight shorts, rash guard | Swapped on unlock; transparent where not applicable |
| 5 | `face` | Eyes, nose, mouth | Eye color via palette swap |
| 6 | `hair_front` | Bangs, front hair pieces | Renders over face |
| 7 | `accessories` | Jewelry, headbands | Transparent until unlocked |
| 8 | `belt` | Belt only — rendered as its own layer | Separate layer so stripe marks composite cleanly on top |

**Color / Palette Swapping**

- All assets drawn with a defined neutral palette (grayscale for body/clothing, placeholder tones for skin/hair)
- Renderer replaces specific pixel values at runtime with user-selected or unlocked colors
- Skin tone: 6 Fitzpatrick-scale swappable palettes (each palette = 4 shades: highlight, midtone, shadow, deep shadow)
- Hair color: 10 swappable palettes
- Eye color: 6 swappable palettes
- Gear colors (gi, gloves, shorts): unlocked palettes replace neutral gear tones
- Belt color: driven by rank (white → blue → purple → brown → black); not user-selectable

**Animation Frames Per State**

| State | Frames | Notes |
|---|---|---|
| Idle | 4 | Subtle breathing cycle, loops |
| Training — grappling | 6 | Drilling motion on dummy or partner |
| Training — striking | 6 | Bag work combo |
| Celebration | 8 | Fist pump or jump; plays once then returns to idle |
| Discouraged | 4 | Head down, slumped; loops until user dismisses |
| Rank-up ceremony | 10 | Special one-time animation on belt/rank change |

**File Naming Convention**

```
layer_{layer_name}_{variant}_{frame}.png

Examples:
layer_body_base_f01.png
layer_hair_back_style03_f01.png
layer_gear_gi_neutral_f01.png
layer_gear_gloves_neutral_f01.png
layer_belt_white_f01.png
layer_belt_blue_f01.png
layer_accessories_earring_gold_f01.png
```

**Art Production Pipeline (recommended)**

1. Use placeholder/AI-generated assets during Phase 1 and 2 of build to test the renderer
2. Lock renderer logic fully before commissioning final art
3. Commission pixel artist with this spec document — provide `layer_body_base` as the reference asset first; all other layers must align to that canvas
4. Deliver assets in a flat folder with the naming convention above; no subdirectories
5. Renderer imports assets by name — naming convention is load-bearing, not cosmetic

---

### 7.4 Martial Arts Paths

User selects one active path. Both paths exist from day one and can be switched freely at any time. Progress on each path is saved independently.

---

#### Path A: Grappling (BJJ / Wrestling / Judo)

**Progression model:** Accurate BJJ belt and stripe system

Each belt color has exactly 4 stripes. The user earns stripes incrementally through completed focus sessions before advancing to the next belt. Black belt has 10 stripes (degrees); earning all 10 stripes on black belt awards the Coral Belt — the sport's highest honor.

**Full Belt Progression Table**

| Stage | Rank | Total Unlocks |
|---|---|---|
| 1 | White Belt | Gi (white), white belt |
| 2 | White + 1 Stripe | First stripe on belt |
| 3 | White + 2 Stripes | Second stripe |
| 4 | White + 3 Stripes | Third stripe |
| 5 | White + 4 Stripes | Fourth stripe |
| 6 | Blue Belt | Blue gi, blue belt |
| 7 | Blue + 1 Stripe | Rash guard unlock |
| 8 | Blue + 2 Stripes | New gi cut style |
| 9 | Blue + 3 Stripes | Alternate blue gi color |
| 10 | Blue + 4 Stripes | Fourth stripe |
| 11 | Purple Belt | Purple gi, purple belt |
| 12 | Purple + 1 Stripe | New sleeve style |
| 13 | Purple + 2 Stripes | Spats/leggings unlock |
| 14 | Purple + 3 Stripes | Alternate purple gi |
| 15 | Purple + 4 Stripes | Fourth stripe |
| 16 | Brown Belt | Brown gi, brown belt |
| 17 | Brown + 1 Stripe | Premium gi texture |
| 18 | Brown + 2 Stripes | Gym trophy (wall decoration) |
| 19 | Brown + 3 Stripes | Embroidered gi option |
| 20 | Brown + 4 Stripes | Fourth stripe |
| 21 | Black Belt | Black gi option, black belt, special ceremony animation |
| 22 | Black + 1 Degree | Red bar on belt end |
| 23 | Black + 2 Degrees | New bar |
| 24 | Black + 3 Degrees | Championship poster in gym |
| 25 | Black + 4 Degrees | New bar |
| 26 | Black + 5 Degrees | Halfway ceremony — special animation |
| 27 | Black + 6 Degrees | New bar |
| 28 | Black + 7 Degrees | New bar |
| 29 | Black + 8 Degrees | New bar |
| 30 | Black + 9 Degrees | New bar |
| 31 | Black + 10 Degrees | New bar |
| 32 | **Coral Belt** | **Ultimate unlock — Coral Belt, full gym transformation, legendary ceremony animation** |

**Belt color reference (for palette swap system):**
White → Blue → Purple → Brown → Black → Coral (red/white split)

**Stripe rendering:** Each stripe is a white tape mark on the belt end. Stripes 1–4 rendered as individual pixel marks on the belt layer. Black belt degrees use a red bar system — rendered as a separate sub-layer composited onto the belt. Coral belt is a unique belt asset (not a palette swap — it is a split red/white design requiring its own art).

**Note on pacing:** The XP required per stripe/rank is a game design tuning decision. The system should be designed so that a user doing 1–2 sessions per day reaches Blue Belt in approximately 3–4 months of consistent use. Full progression to Coral Belt is a multi-year journey for dedicated users — it is the "prestige" endpoint, not an expected outcome. This long tail is intentional: it keeps the app relevant indefinitely for power users.

**Gym environment:** Mat room with grappling dummies, mirror wall, training partners (NPC)

**Training animations:** Guard passing drill, takedown entry, shrimping/hip escape, rolling with partner, drilling on dummy, collar tie work

---

#### Path B: Striking (Muay Thai / Boxing / Kickboxing)

**Progression model:** Experience-based visual rank (gym seniority model)

| Stage | Level | Gear Unlock |
|---|---|---|
| 1 | Novice | Basic gloves, plain shorts |
| 2 | Beginner | Hand wraps visible, slightly better gloves |
| 3 | Intermediate | Branded gloves, patterned shorts |
| 4 | Advanced | Headgear, premium glove styles, fight shorts |
| 5 | Veteran | Full fight kit, shin guards |
| 6 | Elite | Ring entrance gear, championship belt cosmetic |

**Gym environment:** Heavy bag station, speed bag, jump rope area, ring corner (unlocked later)

**Training animations:** Jab-cross-hook combo on bag, roundhouse kick, bob and weave, pad work with coach NPC, jump rope, shadowboxing

---

### 7.5 Gym Environment

- 2D side-scrolling pixel scene rendered as background behind avatar
- One scene per path (grappling gym / striking gym)
- Starts sparse: basic equipment, plain walls
- Gym decorations unlock as user advances: trophies, posters, new equipment, flags, additional NPCs
- Day/night cycle tied to real-world time of session (morning light vs. evening lighting)
- Gym scene is only animated when user is in the app — static/idle when backgrounded

**MVP gym:** One static background per path. Decoration system is v1.1.

---

### 7.6 Martial Arts Education Journal

**Trigger:** One lesson delivered per completed focus session  
**Delivery:** Lesson card shown on session success screen before returning to home

**Lesson Card Format:**
- Technique name and martial art origin
- 3–5 sentence plain-language description
- Key coaching points (2–3 bullet points)
- Pixel art illustration of the position or technique
- YouTube reference link (curated, not user-submitted) — v1.1

**Grappling Curriculum (30 lessons for MVP):**

*Fundamentals:* Stance and base, hip escape (shrimping), bridging, posture in guard  
*Guard:* Closed guard basics, open guard frames, guard retention principles  
*Sweeps:* Scissor sweep, flower sweep, pendulum sweep  
*Submissions:* Triangle choke setup, armbar from guard, rear naked choke  
*Takedowns:* Double-leg mechanics, single-leg entry, body lock trips  
*Passing:* Torreando pass, knee slide, leg drag concept  
*Positions:* Mount control, back control, side control frames  
*Concepts:* Connection and grips, invisible jiu-jitsu (pressure), when to tap  

**Striking Curriculum (30 lessons for MVP):**

*Fundamentals:* Stance, footwork, the four ranges of striking  
*Hands:* Jab mechanics, cross and hip rotation, lead hook, rear hook, uppercut  
*Kicks:* Teep (push kick), lead roundhouse, rear roundhouse, low kick targeting  
*Defense:* Parrying, slipping, rolling under hooks, covering  
*Clinch:* Clinch entry, collar tie, dirty boxing basics  
*Combinations:* Jab-cross, jab-cross-hook, jab-body-head  
*Concepts:* Ring cutting, timing vs. speed, reading telegraphs, breathing  

**Journal Features:**
- All received lessons saved chronologically
- Search by technique name or keyword
- Filter by path (grappling / striking)
- Filter by category (offense, defense, footwork, clinch, etc.)
- Favorite / bookmark lessons
- Locked lessons show title only (no spoilers)
- Lesson count shown: "12 of 30 techniques learned"

---

### 7.7 Progression & XP System

**XP Sources:**
- Completing a full focus session (primary — majority of XP)
- Daily first session bonus (+25% XP)
- Consecutive day streak bonus (v1.1)
- Weekly challenge completion (v1.1)

**XP triggers unlocks for:**
- Belt stripes and new belt ranks (grappling)
- New gear items (striking)
- New gym decorations (v1.1)
- Technique lessons (one per session, sequentially)

**Broken session:** No XP awarded. Streak unaffected if at least one full session completed that day.

**Partial credit (optional setting, default OFF):** If enabled, awards XP proportional to time completed before break (e.g., 14/25 min = 56% XP). Useful for beginners building the habit.

---

### 7.8 Onboarding Flow

1. Welcome screen — app identity, pixel art style preview
2. Avatar creation — gender, skin tone, hair, eyes
3. Path selection — Striking or Grappling (brief description of each, can change anytime)
4. Timer setup — pre-filled 25/5 Pomodoro defaults, user can adjust
5. Explanation of the lock mechanic — "Start your session, lock your phone. Your fighter trains while you're away. Come back when the time is up."
6. First session launched

Onboarding should take under 3 minutes. No account creation required to start (guest session with local storage, account creation prompted after first completed session).

---

## 8. Technical Stack

All decisions made with AI-assisted development in mind. Stack optimized for maximum 

---

## 9. Project Folder Structure



fightfocus/
│
├── public/ # Static files served as-is
│ ├── sprites/ # Pixel art assets
│ │ ├── body/
│ │ ├── hair_back/
│ │ ├── clothing_base/
│ │ ├── gear/
│ │ ├── face/
│ │ ├── hair_front/
│ │ ├── accessories/
│ │ └── belt/
│ ├── backgrounds/ # Gym scene backgrounds
│ │ ├── grappling/
│ │ └── striking/
│ ├── sfx/ # Sound effects
│ └── fonts/ # Pixel/display fonts
│
├── src/
│ ├── main.tsx # App entry point
│ ├── App.tsx # Root component, routing
│ │
│ ├── components/ # Reusable UI components
│ │ ├── timer/
│ │ │ ├── TimerDisplay.tsx
│ │ │ ├── TimerControls.tsx
│ │ │ └── SessionIndicator.tsx
│ │ ├── avatar/
│ │ │ ├── AvatarRenderer.tsx # The sprite compositor
│ │ │ ├── AvatarCreator.tsx # Creation/customization UI
│ │ │ └── AvatarPortrait.tsx # Larger profile portrait
│ │ ├── gym/
│ │ │ ├── GymScene.tsx # Background scene wrapper
│ │ │ └── GymBackground.tsx # Actual pixel background
│ │ ├── session/
│ │ │ ├── RevealScreen.tsx # Success reveal
│ │ │ ├── BrokenScreen.tsx # Failed session
│ │ │ └── LockPrompt.tsx # "Lock your phone" UI
│ │ ├── progression/
│ │ │ ├── XPBar.tsx
│ │ │ ├── BeltDisplay.tsx
│ │ │ ├── GearUnlock.tsx # Unlock reveal animation
│ │ │ └── RankUpCeremony.tsx
│ │ ├── journal/
│ │ │ ├── JournalList.tsx
│ │ │ ├── LessonCard.tsx
│ │ │ └── JournalSearch.tsx
│ │ ├── store/ # Gear store / IAP
│ │ │ ├── GearStore.tsx
│ │ │ └── StoreItem.tsx
│ │ └── ui/ # Generic reusable primitives
│ │ ├── Button.tsx
│ │ ├── Modal.tsx
│ │ ├── ProgressBar.tsx
│ │ └── PixelBorder.tsx # Reusable pixel-style border
│ │
│ ├── screens/ # Full page views (routed)
│ │ ├── Home.tsx # Main gym screen with timer
│ │ ├── Onboarding.tsx
│ │ ├── AvatarSetup.tsx
│ │ ├── PathSelect.tsx
│ │ ├── Journal.tsx
│ │ ├── Profile.tsx
│ │ ├── Store.tsx
│ │ └── Settings.tsx
│ │
│ ├── hooks/ # Custom React hooks
│ │ ├── useTimer.ts # All timer logic lives here
│ │ ├── useLockDetection.ts # Page Visibility API logic
│ │ ├── useSession.ts # Session start/end/state
│ │ ├── useProgression.ts # XP, rank, unlock logic
│ │ ├── useAvatar.ts # Avatar state and layers
│ │ └── useJournal.ts # Lesson fetching/saving
│ │
│ ├── lib/ # Third-party config and clients
│ │ ├── supabase.ts # Supabase client init
│ │ ├── stripe.ts # Stripe client init
│ │ └── posthog.ts # Analytics init
│ │
│ ├── store/ # Global state (Zustand)
│ │ ├── avatarStore.ts
│ │ ├── sessionStore.ts
│ │ ├── progressionStore.ts
│ │ └── userStore.ts
│ │
│ ├── types/ # TypeScript type definitions
│ │ ├── avatar.ts
│ │ ├── session.ts
│ │ ├── progression.ts
│ │ ├── lesson.ts
│ │ └── user.ts
│ │
│ ├── constants/ # Values that never change
│ │ ├── beltSystem.ts # Full belt/stripe progression data
│ │ ├── strikingProgression.ts # Striking gear unlock data
│ │ ├── colors.ts # Palette swap color definitions
│ │ ├── xpThresholds.ts # XP required per rank
│ │ └── spriteConfig.ts # Layer names, frame counts
│ │
│ ├── utils/ # Pure helper functions
│ │ ├── spriteCompositor.ts # Canvas layer stacking logic
│ │ ├── paletteSwap.ts # Color replacement logic
│ │ ├── sessionCalc.ts # Timestamp math, elapsed time
│ │ ├── xpCalc.ts # XP award calculations
│ │ └── formatTime.ts # Timer display formatting
│ │
│ └── styles/ # Global styles
│ ├── globals.css
│ ├── fonts.css
│ └── pixelTheme.css # Pixel-specific CSS (borders, rendering)
│
├── supabase/
│ ├── migrations/ # Database schema files
│ └── seed/ # Lesson data seed files
│ ├── grappling_lessons.sql
│ └── striking_lessons.sql
│
├── .env.local # Secrets (never commit this)
├── .env.example # Template for env vars (commit this)
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
