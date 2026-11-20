# FightFocus — Product Requirements Document
**Version:** 0.5 — Art simplified to LPC spritesheets  
**Status:** POC built (timer, lock detection, belts, journal, onboarding) — art overhaul next  
**Last Updated:** 2026-11-19 — Replaced the custom 8-layer sprite system with premade LPC fighters + a swappable belt layer. Gear unlocks removed; belts are the progression. Native path changed to Capacitor.

---

## 1. Product Overview

**App Name (working title):** FightFocus (or "Roll Timer" / "Mat Time")
**Platform:** Web app first (React PWA) → iOS/Android via Capacitor (wraps the same web app; no rewrite)
**Core Concept:** A focus timer app that reduces phone addiction through Brazilian Jiu-Jitsu gamification. Users earn belt progression by keeping their phone screen locked for the duration of a focus session. When they return to the app, they discover what technique they learned and how close they are to their next stripe — creating a discovery moment that rewards discipline rather than punishing distraction.

**Tagline (working):** *"Lock your phone. Train on the mats."*

---

## 2. Problem Statement

Smartphone addiction is widespread. Existing focus apps (Forest, Flora) provide passive deterrents but lack deep, sustained engagement loops. FightFocus turns phone abstinence into a BJJ progression journey — combining the behavioral pull of RPG progression with authentic Brazilian Jiu-Jitsu education that compounds over time.

The product works because it reframes the locked phone not as a sacrifice but as mat time. The user doesn't miss out while the screen is dark — they're training. The payoff comes on return.

---

## 3. Target Audience

- Ages 14–35
- BJJ practitioners (white to blue belt) looking for supplemental motivation
- Gamers and productivity enthusiasts with interest in BJJ
- Students and knowledge workers who need focus support
- People who have tried focus apps but lacked sustained motivation
- Aspiring BJJ students curious about the art (education is a hook, not a barrier)
- r/bjj community, gym culture, podcast listeners (Lex Fridman, Joe Rogan)

---

## 4. Core Product Pillars

| Pillar | Description |
|---|---|
| **Focus Timer** | Pomodoro-style timer with session management |
| **Lock & Return Loop** | Core mechanic: lock phone → session runs passively → return to discover progress |
| **Fighter & Gym** | Animated pixel-art fighter (LPC style) training in a BJJ academy |
| **Belt Progression** | Authentic BJJ belt and stripe system — the belt on your fighter changes as you rank up |
| **BJJ Education** | Real technique lessons delivered on session completion, saved to journal |
| **Monetization** | Freemium + premium subscription (see note in 7.3) |

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
       ↙            ↘
   SUCCESS          BROKEN
Fighter celebrates  Fighter slumped
Lesson delivered    Encouragement shown
XP awarded          No XP awarded
Stripe/belt check   Try again prompt
        ↓
User sees what they learned / earned
        ↓
Motivated to run another session
```

**Why this works narratively:** The fighter trains while the screen is dark. The user doesn't watch it happen. They come back to discover what changed. This is intentional — it mirrors the way real training works. You put in the work, you come back, you're different.

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

**Native implementation (Capacitor):**
- Capacitor `App` plugin `appStateChange` event detects foreground/background
- Same logic, more reliable signal than web

**What we are NOT building:**
- No background audio during lock
- No continued animations during lock
- No live background process of any kind

Audio and animation run only when the user is actively in the app. The magic happens in the reveal on return, not in the background.

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
- Fighter celebration animation plays
- XP earned displayed (animated counter)
- If new stripe: stripe added to the belt badge with a small animation
- If new belt: promotion moment — fighter's belt visibly swaps to the new color
- Lesson card delivered (see Section 7.6)
- Progress bar toward next stripe shown
- CTA: "Start another session" or "Go to journal"

**On BROKEN:**
- Fighter discouraged animation plays
- Brief message — encouraging, not punishing ("Back to the mats. Try again.")
- How long they lasted shown (e.g., "You made it 14 of 25 minutes")
- CTA: "Try again" (pre-fills same timer duration)
- No XP awarded by default

**Design principle:** The broken screen should never feel mean. It should feel like a coach saying "shake it off." Retention depends on users trying again, not feeling bad.

---

### 7.3 Fighter Selection

**Entry Point:** First-launch onboarding (changeable later in settings)

**The model:** Users pick one of a small set of **premade fighters**. There is no build-your-own character creator.

- **Launch roster:** 4–6 fighters covering a range of gender expression, skin tone, and hair
- Each fighter is built once by us in the LPC generator and exported as a spritesheet
- Adding a fighter later = export one more sheet + add one line of config. No code changes.
- Every fighter wears the same base outfit (gi or rash guard look); only the **belt** changes with rank

**Why premade instead of a creator:**
- A creator (skin × hair × hair color × eyes) multiplies into hundreds of combinations, each needing art for every animation. A roster of 4–6 is a fixed, testable set.
- The emotional payoff in this app is the **belt**, not the face. Spending design effort on the belt promotion is a better return than on customization.
- Onboarding gets faster: one tap instead of five screens of options.

**What we gave up:** Fine-grained self-representation, and cosmetic IAP built on gear/hair/jewelry. If user feedback asks for more representation, the fix is adding more premade fighters — not building a creator.

**Monetization note:** With no gear store, revenue comes from the premium subscription (e.g., extended stats, longer sessions, full lesson library) and optionally premium fighters. Revisit after the POC proves retention.

**Animation States:**

| App State | Plays when | Loops? |
|---|---|---|
| `idle` | On home screen, no session | Yes |
| `training` | Session just started / rest period | Yes |
| `celebration` | Session success | Once, then idle |
| `discouraged` | Session broken | Yes, until dismissed |

Each state maps to one LPC animation row (see 7.3a). Exact row numbers are read from the exported sheet, not assumed.

**Audio (in-app only):**
- Ambient gym sounds play while user is in the app
- Distinct SFX: session start, session complete, session broken, rank-up, lesson received
- All audio stops when app is backgrounded / phone locked

---

### 7.3a Sprite System Specification (LPC)

> **⚠️ Current decision (2026-11-20): LPC is ON HOLD.** LPC has no BJJ gi asset. We're staying with **AI-generated sprites** for now (current format: 512×640 transparent PNGs, one image per state, per character, per skin tone). Belt changes are done by generating sprites per belt color — see journal 2026-11-20. The premade-roster, belt-is-the-reward, and stripes-in-the-UI decisions in 7.3 and 7.4 still apply. The LPC spec below is kept for reference if we revisit it (e.g., commissioning a gi layer on the LPC template).

**Source:** [Universal LPC Spritesheet Character Generator](https://liberatedpixelcup.github.io/Universal-LPC-Spritesheet-Character-Generator/)

**Each fighter = two PNG sheets stacked on top of each other:**

| Layer | File | Contents |
|---|---|---|
| 1 (bottom) | `fighters/{fighterId}.png` | Full character **without a belt** |
| 2 (top) | `belts/{beltColor}.png` | Belt only, everything else transparent |

Because every LPC layer is drawn on the same grid, the belt sheet lines up with any fighter automatically. One set of belt sheets serves the whole roster (with a per-body-type set if male/female bodies place the belt differently).

**Belt sheets needed:** `white`, `blue`, `purple`, `brown`, `black`, `coral` (6 files, or 12 if two body types). If the generator doesn't offer a color, recolor the belt-only sheet once in an image editor — this is a one-time asset step, not runtime code.

**Stripes are not drawn on the sprite.** At 64×64 the belt is a few pixels tall; stripes would be unreadable. Stripes and black-belt degrees are shown on the **belt badge in the UI** (`BeltDisplay`).

**Canvas & Rendering**

| Property | Value |
|---|---|
| Frame size | 64×64 px (LPC standard) |
| Sheet layout | Rows = animations (each in 4 facing directions), columns = frames |
| Facing used | One direction only (facing the viewer / side — pick one and use it everywhere) |
| Render scale | 3× → 192×192 px, nearest-neighbor (`image-rendering: pixelated`) |
| Playback | CSS `background-position` stepping or `<canvas>`; both layers advance in sync |

**Config (the only place animation data lives):** `src/constants/spriteConfig.ts`

```ts
// Filled in after inspecting the real exported sheet
export const ANIMATIONS = {
  idle:        { row: ?, frames: ?, msPerFrame: 300, loop: true },
  training:    { row: ?, frames: ?, msPerFrame: 150, loop: true },
  celebration: { row: ?, frames: ?, msPerFrame: 100, loop: false },
  discouraged: { row: ?, frames: ?, msPerFrame: 200, loop: true },
}

export const FIGHTERS = [
  { id: 'fighter-1', name: '…', sheet: '/sprites/fighters/fighter-1.png', bodyType: 'male', generatorUrl: '…' },
  // one line per fighter
]
```

Store each fighter's full generator URL (everything after `#` encodes the character) so it can be re-exported or tweaked later.

**Licensing (required before App Store submission):**
- LPC assets are free but carry per-asset licenses (CC-BY-SA, GPL, OGA-BY, CC0). Most require crediting the artists.
- Download and keep the generator's credits/attribution file for every fighter and belt export in `public/sprites/CREDITS.txt`
- Prefer CC0 / OGA-BY / CC-BY parts where there's a choice
- App includes a Credits screen listing all LPC artists

---

### 7.4 BJJ Belt Progression System

**Progression model:** Accurate BJJ belt and stripe system. **The belt is the reward** — there are no gear unlocks.

Each colored belt has 4 stripes. Black belt has degrees; completing black belt awards the Coral Belt — the prestige endpoint.

| Belt | Stages | What the user sees |
|---|---|---|
| White | 0–4 stripes | Fighter wears white belt; badge shows stripes |
| Blue | 0–4 stripes | **Promotion:** fighter's belt swaps to blue |
| Purple | 0–4 stripes | Belt swaps to purple |
| Brown | 0–4 stripes | Belt swaps to brown |
| Black | 0–10 degrees | Belt swaps to black; badge shows red-bar degrees |
| Coral | Final | Belt swaps to coral; special celebration |

**Promotion moment:** On a new belt, the reveal screen plays the celebration animation, then swaps the belt layer to the new color with a brief flash. Same animation for every promotion — the new belt color is the payoff.

**Note on pacing:** XP per stripe is a tuning decision. Target: 1–2 sessions per day reaches Blue Belt in ~3–4 months. Coral is a multi-year journey for power users — intentional long tail.

---

### 7.5 BJJ Academy Environment

- Single pixel-art academy background behind the fighter (pre-rendered PNG, ideally LPC-compatible style from itch.io / OpenGameArt)
- Light ambient animation only (light flicker, dust motes) — already built
- Static when app is backgrounded

**Later (v1.1+, only if retention data justifies it):** gym decorations that unlock at belt promotions (belt display wall, trophies).

---

### 7.6 BJJ Technique Journal

**Trigger:** One lesson delivered per completed focus session  
**Delivery:** Lesson card shown on session success screen before returning to home

**Lesson Card Format:**
- Technique name and martial art origin
- 3–5 sentence plain-language description
- Key coaching points (2–3 bullet points)
- YouTube reference link (curated, not user-submitted) — v1.1

**BJJ Curriculum (30+ lessons for MVP):**

*Fundamentals:* Stance and base, hip escape (shrimping), bridging, posture in guard
*Guard:* Closed guard basics, open guard frames, guard retention principles
*Sweeps:* Scissor sweep, flower sweep, pendulum sweep
*Submissions:* Triangle choke setup, armbar from guard, rear naked choke
*Takedowns:* Double-leg mechanics, single-leg entry, body lock trips
*Passing:* Torreando pass, knee slide, leg drag concept
*Positions:* Mount control, back control, side control frames
*Concepts:* Connection and grips, invisible jiu-jitsu (pressure), when to tap

**Journal Features:**
- All received lessons saved chronologically
- Search by technique name or keyword
- Filter by category (submissions, sweeps, passes, takedowns, guard, etc.)
- Favorite / bookmark lessons
- Locked lessons show title only (no spoilers)
- Lesson count shown: "12 of 30+ techniques learned"

---

### 7.7 Progression & XP System

**XP Sources:**
- Completing a full focus session (primary — majority of XP)
- Daily first session bonus (+25% XP)
- Consecutive day streak bonus (v1.1)

**XP drives:**
- Belt stripes and belt promotions
- BJJ technique lessons (one per session, sequentially)

**Broken session:** No XP awarded. Streak unaffected if at least one full session completed that day.

**Partial credit (optional setting, default OFF):** If enabled, awards XP proportional to time completed before break (e.g., 14/25 min = 56% XP).

---

### 7.8 Onboarding Flow

1. Welcome screen — app identity, BJJ theme preview
2. Pick your fighter — tap one of the roster (starts in white belt)
3. Timer setup — pre-filled 25/5 Pomodoro defaults, user can adjust
4. Explanation of the lock mechanic — "Start your session, lock your phone. You train on the mats while you're away. Come back when the time is up."
5. First session launched

Onboarding should take under 1 minute. No account creation required (local storage; accounts post-POC).

---

## 8. Technical Stack

| Concern | Choice |
|---|---|
| Framework | React + TypeScript + Vite (PWA) |
| Styling | Tailwind CSS |
| State | Zustand (persisted to local storage for POC) |
| Hosting | Vercel |
| Native | Capacitor (iOS + Android wrapper) — after art overhaul |
| Backend (post-POC) | Supabase (accounts, sync) |

---

## 9. Project Folder Structure

Create folders just-in-time. Only the art-related parts change from the current repo:

```
public/
├── sprites/
│   ├── fighters/          # One LPC sheet per fighter (no belt)
│   │   ├── fighter-1.png
│   │   └── ...
│   ├── belts/             # Belt-only sheets, one per color
│   │   ├── white.png
│   │   ├── blue.png
│   │   ├── purple.png
│   │   ├── brown.png
│   │   ├── black.png
│   │   └── coral.png
│   └── CREDITS.txt        # LPC attribution (required)
└── gym-background.jpg     # Academy background

src/
├── components/avatar/
│   ├── AvatarRenderer.tsx # Stacks fighter + belt sheets, steps frames
│   └── AvatarPicker.tsx   # Roster picker
├── constants/
│   ├── spriteConfig.ts    # FIGHTERS roster + ANIMATIONS row/frame map
│   └── beltSystem.ts      # Belt/stripe progression + XP thresholds
└── ...                    # Timer, session, journal, progression — unchanged
```

**Removed from earlier versions:** the 8-layer compositor, palette swapping (`paletteSwap.ts`, `colors.ts`), gear store / IAP components, and the per-preset × per-skin-tone static PNG folders.
