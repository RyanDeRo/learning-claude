---
name: pixel-art
description: Create or process FightFocus character sprites and gym art — writing AI image prompts for fighter poses, running raw AI images through tools/sprite-pipeline (background removal, normalize, skin-tone and belt recolor), and checking sprites against the app's format. Use when generating avatar sprites, belt-rank variants, character presets, or dojo/gym backgrounds.
paths: "**/*.{png,jpg,jpeg}"
when_to_use: Sprite generation, AI art prompts for fighters, belt variants, new character presets, skin tones, gym/dojo backgrounds, sprite pipeline
---

# FightFocus Sprite System (AI-generated art)

**Current direction (2026-11-20):** sprites are AI-generated, then processed by scripts.
There is no layered/compositing system and no hand-drawn pixel spec. LPC is on hold (PRD 7.3a note).
If this file and the PRD disagree, the PRD wins — then fix this file.

## The core idea: generate few, script the rest

The user generates **one raw image per pose per body**. Everything else is automated:

| Variation | How it's made | Count |
|---|---|---|
| Body (preset) | AI-generated | 2 (`base` = man, `woman`) |
| Pose / state | AI-generated | 4 (`idle`, `training`, `celebration`, `discouraged`) |
| Skin tone | `recolor_skin.py` | 6 (tone-3 = source) |
| Belt color | `recolor_belt.py` (planned) | 5 (white, blue, purple, brown, black) |

**8 AI images → 240 app sprites.** Never ask the user to generate per-tone or per-belt images —
AI can't keep a character identical across that many generations, and the script can.

## Output format (what the app loads)

| Property | Value |
|---|---|
| Canvas | 512×640 px, transparent PNG |
| Alignment | Feet bottom-aligned, uniform scale across all poses (`normalize.py` does this) |
| Path today | `public/sprites/{presetId}/tone-{1..6}/{state}.png` |
| Path with belts (planned) | `public/sprites/{presetId}/tone-{1..6}/{belt}/{state}.png` |
| Loaded by | `src/components/avatar/AvatarRenderer.tsx` — naming is load-bearing |

Stripes are **not** drawn on sprites — they're shown on the UI belt badge (`BeltDisplay`).

## The magenta belt rule (most important)

Raw images must have the belt in **flat pure magenta (#FF00FF)**.

**Why:** The gi is white, so a white belt can't be separated from it by color. Magenta appears
nowhere else on the character, so `recolor_belt.py` can find every belt pixel and repaint it in
each rank color. Same principle as a green screen. Magenta's hue (~212 on PIL's 0–255 scale) is far
outside the skin detector's 0–40 range, so skin recolor won't touch it.

**Order matters:** belt recolor runs **last**, after skin recolor. (A brown belt's hue overlaps skin;
recoloring skin after would corrupt it.)

## Preferred: edit the existing sprites (Gemini)

Upload an existing base sprite (`art examples/basecharacter{male,female}/`) to Gemini, one per fresh chat, with:

```
Generate an edited version of this pixel art sprite where the only change is the belt color:
make the belt solid flat magenta #FF00FF (no shading, no stripes, no gradients). Keep the
character, pose, gi, style, and background exactly the same. No magenta anywhere else.
```

Edits keep the approved characters identical; generating from scratch (template below) drifts. Gemini
downloads are JPEG on a white or black background; that's fine (liftsubject + hue-range matching).
Raw magenta images live in `art examples/magenta-raw/{male,female}/`. Pose name mapping: doubleleg → training,
celebrate → celebration. Preset ids: male = `base`, female = `woman`.

## AI prompt template (fallback: new characters only)

Generate the **idle** pose first and get it right; then attach it as a reference image for the other
three poses so the character stays consistent.

```
Pixel art sprite of a [man / woman] Brazilian Jiu-Jitsu practitioner,
full body, facing the viewer, [POSE].
Wearing a plain white BJJ gi (jacket with lapels, pants) and a SOLID FLAT
MAGENTA (#FF00FF) belt with no shading, no stripes, no texture.
Barefoot. JRPG / 16-bit style, clean dark outlines, limited palette.
Plain solid single-color background, no shadows on the ground, no props, no text.
Same character, proportions, and art style as the attached reference.
```

Poses:
- **idle** — standing relaxed, arms at sides, neutral confident expression
- **training** — drilling stance, knees bent, hands up in grappling posture
- **celebration** — fist raised in victory, big smile
- **discouraged** — head down, shoulders slumped, hands on knees or at sides

Checklist before accepting a raw image:
- Belt is visibly magenta and flat (if the AI shaded it pink/purple, regenerate)
- Full body in frame, feet visible, nothing cropped
- Same face, hair, and build as the idle reference
- No magenta anywhere except the belt

## Processing pipeline

Full commands live in `tools/sprite-pipeline/README.md`. Order:

1. `liftsubject` — ML background removal (macOS Vision). Color-keying fails because hair and backgrounds are both near-black.
2. `normalize.py` — crop, uniform scale, bottom-align to the 512×640 canvas
3. `recolor_skin.py` — 6 skin tones
4. `recolor_belt.py` — swaps the magenta belt for each rank color, outputs one folder per belt, and saves as a 256-color palette PNG (~5× smaller). Matches magenta by *amount* (`min(R,B) - G`), not exact color, because Gemini outputs JPEG and edges blend into outline/gi.
5. Spot-check a few outputs: skin shifted only on skin, belt fully recolored (no pink fringe at the edges), gi untouched

Rank colors (starting values, tune by eye on the dojo background): white `#F2F2F2`, blue `#1F4FD1`,
purple `#6A2DA8`, brown `#6B3E1E`, black `#1A1A1A`. Coral (black belt endgame) is a red/white split
and needs its own treatment later.

## Backgrounds

- The dojo is a single pre-rendered image: `public/dojo-background.jpg` (source in `art examples/dojo/`)
- Export backgrounds as **JPG ~80% quality**. Sprites stay PNG (they need transparency); backgrounds don't.
- If the background changes, re-tune `FEET_FROM_BOTTOM` / `FIGHTER_HEIGHT` in `src/components/gym/DojoScene.tsx`

## Don'ts

- Don't generate per-skin-tone or per-belt images with AI. Script them.
- Don't draw stripes on sprites.
- Don't change the 512×640 canvas or file paths without updating `AvatarRenderer.tsx` in the same change.
- Don't reintroduce the old 48×64 / 8-layer / palette-swap spec. It was retired in PRD v0.5.
