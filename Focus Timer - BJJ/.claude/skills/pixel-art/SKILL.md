---
name: pixel-art
description: Create pixel art sprites for FightFocus avatar system following exact technical specifications from PRD section 7.3a. Use when generating avatar sprites, martial arts character art, or gym environment assets.
paths: "**/*.{png,aseprite,psd}"
when_to_use: Pixel art creation, sprite generation, avatar assets, animation frames, martial arts character art
---

# FightFocus Pixel Art Sprite System

This skill enforces the exact sprite specification from PRD Section 7.3a. All pixel art assets for the FightFocus app MUST follow these rules.

## Canvas & Rendering Specifications

| Property | Value | Critical Rule |
|---|---|---|
| **Base canvas size** | 48×64 px | NON-NEGOTIABLE — all sprites must fit this exact canvas |
| **Render scale** | 3× nearest-neighbor | NO anti-aliasing, NO smoothing — sharp pixel edges only |
| **Display size** | 144×192 px | How it appears on screen after scaling |
| **Background** | Transparent PNG only | No JPG, no solid backgrounds |
| **Anchor point** | Feet aligned to bottom-center | Character feet must touch the bottom-center pixel |
| **Color mode** | Indexed palette | Required for runtime palette swapping |

### Why 48×64?
The canvas size is load-bearing. Belt stripes, gi collar details, glove silhouettes, and gear progression require this resolution to read clearly. Do NOT attempt to work at 32×48 or any other size — gear visibility is the emotional core of the product.

## 8-Layer Stack System

Render order (1 = bottom, 8 = top):

| Layer | Name | Contents | Technical Notes |
|---|---|---|---|
| 1 | `body` | Skin base, body shape | Skin tone via palette swap |
| 2 | `hair_back` | Ponytails, long hair sections | Renders BEHIND head |
| 3 | `clothing_base` | Default t-shirt and shorts | Replaced by gear on unlock |
| 4 | `gear` | Gi, gloves, fight shorts, rash guard | Swapped on progression; transparent where not used |
| 5 | `face` | Eyes, nose, mouth | Eye color via palette swap |
| 6 | `hair_front` | Bangs, front hair pieces | Renders OVER face |
| 7 | `accessories` | Jewelry, headbands, tattoos | Transparent until unlocked |
| 8 | `belt` | Belt only — separate layer | Must composite cleanly; stripes rendered on top |

**CRITICAL:** Each layer is a separate PNG file. All layers must align perfectly to the same 48×64 canvas. The renderer composites them at runtime.

## Color & Palette Swapping System

All assets are drawn with **neutral placeholder palettes** and swapped at runtime.

### Skin Tone Palettes (6 Fitzpatrick scale options)
Each palette = 4 shades:
- **Highlight** (lightest — forehead, cheekbones)
- **Midtone** (base skin color)
- **Shadow** (under chin, inner arm)
- **Deep shadow** (darkest — contour lines)

### Hair Color Palettes (10 options)
Similar 4-shade system per palette

### Eye Color Palettes (6 options)
3-shade system: white, iris color, pupil/outline

### Gear Colors
- Gi, gloves, shorts: unlocked palettes replace neutral tones
- **Belt color:** driven by rank (white → blue → purple → brown → black → coral)
- Belt is NOT user-selectable — it represents earned rank

### Belt Stripe Rendering
- Stripes 1–4: white tape marks on belt end (individual pixel marks)
- Black belt degrees: red bar system (separate sub-layer composited on belt)
- **Coral belt:** unique split red/white design (NOT a palette swap — requires custom art)

## Animation Frame Specifications

| State | Frames | Notes |
|---|---|---|
| **Idle** | 4 | Subtle breathing cycle, loops continuously |
| **Training (grappling)** | 6 | Drilling motion on dummy or partner |
| **Training (striking)** | 6 | Bag work combo |
| **Celebration** | 8 | Fist pump or jump; plays once then returns to idle |
| **Discouraged** | 4 | Head down, slumped; loops until dismissed |
| **Rank-up ceremony** | 10 | Special one-time animation on belt/rank change |

Each frame = a separate file for each layer that changes in that state.

## File Naming Convention

**MANDATORY — the renderer loads assets by name. Naming is load-bearing, not cosmetic.**

```
layer_{layer_name}_{variant}_{frame}.png
```

### Examples:
```
layer_body_base_f01.png
layer_body_base_f02.png
layer_body_base_f03.png
layer_body_base_f04.png

layer_hair_back_style03_f01.png
layer_hair_front_style03_f01.png

layer_gear_gi_neutral_f01.png
layer_gear_gloves_neutral_f01.png

layer_belt_white_f01.png
layer_belt_blue_f01.png
layer_belt_purple_f01.png
layer_belt_brown_f01.png
layer_belt_black_f01.png
layer_belt_coral_f01.png

layer_accessories_earring_gold_f01.png
layer_accessories_headband_black_f01.png
```

## Art Style Guidelines

### Aesthetic Direction
- **JRPG-style pixel art** — think Final Fantasy VI, Chrono Trigger character sprites
- Clean, readable silhouettes at 48×64
- 4-shade color ramps for depth (highlight, midtone, shadow, outline)
- Strong outlines (black or dark) for clarity
- Readable from across a phone screen
- Gear must be CLEARLY VISIBLE — progression depends on visual distinction

### What Makes Good FightFocus Pixel Art
✓ Clear silhouette even at base 48×64 scale
✓ Gear differences are obvious (gi vs. gloves vs. shorts)
✓ Belt is always visible and readable
✓ Stripes on belt are distinct white marks
✓ Face is expressive but not overly detailed
✓ Animation frames show clear motion between states
✓ Fits martial arts gym context (not fantasy, not sci-fi)

### What to AVOID
✗ Anti-aliasing or gradient smoothing (use nearest-neighbor only)
✗ Too much detail (loses clarity when scaled)
✗ Gear that blends together (gi and belt must be distinct)
✗ Invisible stripes (progression must be visible)
✗ Off-center alignment (feet must anchor to bottom-center)
✗ Non-transparent backgrounds
✗ Breaking the 48×64 canvas

## Art Production Pipeline

### Phase 1: Placeholder/AI Assets
Use AI-generated or rough pixel art to test renderer during early development.

### Phase 2: Lock Renderer Logic
Finalize all layer compositing, palette swapping, and animation playback code BEFORE commissioning final art.

### Phase 3: Commission Pixel Artist
- Provide this spec document as the contract
- Deliver `layer_body_base_f01.png` as reference first
- All other layers must align to that exact canvas
- Artist delivers flat folder of PNGs with naming convention followed exactly

### Phase 4: Integration
- No subdirectories — all PNGs in one flat folder
- Renderer imports by filename
- Palette swap system applied at runtime
- Test all animations and layer combinations

## When Claude Creates Pixel Art

If the user asks Claude to generate pixel art sprites for FightFocus:

1. **Start with the body layer** — establish the base character at 48×64
2. **Use nearest-neighbor scaling** — never smooth or anti-alias
3. **Follow the 8-layer system** — each layer as a separate transparent PNG
4. **Name files correctly** — use the exact naming convention above
5. **Create neutral palettes** — use grayscale or placeholder colors that will be swapped
6. **Test alignment** — all layers must composite perfectly on the same canvas
7. **Verify gear visibility** — belt, gi, gloves must be clearly distinct

## Reference Examples to Study

- **Final Fantasy VI** character sprites (SNES)
- **Chrono Trigger** character sprites (SNES)
- **Stardew Valley** character art (modern pixel RPG)
- **Celeste** character sprites (modern platformer pixel art)

## Technical Constraints

- **PNG only** — no JPG, GIF, or other formats
- **Transparency required** — except on body/face layers where skin is base
- **No animations in files** — each frame is a separate PNG
- **Indexed color mode** — for palette swapping (8-bit PNG recommended)
- **48×64 px canvas** — EXACT dimensions, no exceptions

## Deliverables for MVP

### Minimum Viable Sprite Set (Phase 1)
- Body base (4 frames idle)
- Hair back + front (1 style, 4 frames idle)
- Face (4 frames idle)
- Clothing base (t-shirt/shorts, 4 frames idle)
- Belt layer (white, blue, purple, brown, black, coral — 1 frame each)
- Celebration animation (8 frames)
- Discouraged animation (4 frames)

### Full Sprite Set (Phase 2+)
- 8 hair styles × 4 idle frames
- 6 training animation frames (grappling + striking)
- 10 rank-up ceremony frames
- Gear variants (gi, gloves, shorts, rash guard)
- Accessories (jewelry, headbands)
- All belt stripe variations

---

## Summary: The Non-Negotiables

1. **48×64 px base canvas** — period.
2. **3× nearest-neighbor scaling** — no smoothing.
3. **8-layer system** — each layer is a separate PNG.
4. **Exact file naming convention** — renderer depends on it.
5. **Neutral palettes** — swapped at runtime.
6. **Transparent backgrounds** — except where skin/gear is solid.
7. **Gear must be readable** — progression is visual.
8. **Belt is always visible** — it's the emotional core.

This specification is the contract between art and code. Do not deviate without updating the PRD first.
