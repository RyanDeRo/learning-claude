# Sprite pipeline

Turns raw AI-generated character images into the transparent, normalized,
skin-tone-variant sprites the app expects under `public/sprites/`.

## One-time setup

```bash
python3 -m venv .venv
.venv/bin/pip install Pillow numpy
swiftc -O liftsubject.swift -o liftsubject
```

## Adding a new pose set (e.g. a new character preset)

1. Generate 4 raw images — idle, training, celebration, discouraged — with an
   AI image tool. For style consistency, reference an existing sprite (e.g.
   `art examples/basecharacter-idle.png`) in the prompt.

2. Remove backgrounds:
   ```bash
   mkdir -p cut
   ./liftsubject "raw/idle.png"        cut/idle.png
   ./liftsubject "raw/training.png"    cut/training.png
   ./liftsubject "raw/celebration.png" cut/celebration.png
   ./liftsubject "raw/discouraged.png" cut/discouraged.png
   ```

3. Normalize (crop, uniform scale, bottom-align on a shared canvas):
   ```bash
   .venv/bin/python normalize.py cut/ normalized/
   ```

4. Generate the 6 skin-tone variants (tone-3 = the source's own tone,
   untouched; tones 1/2 lighter, 4/5/6 darker):
   ```bash
   for state in idle training celebration discouraged; do
     .venv/bin/python recolor_skin.py "normalized/$state.png" "../../public/sprites/<preset-id>"
   done
   ```
   This produces `public/sprites/<preset-id>/tone-{1..6}/<state>.png`.

5. Spot-check: open a couple of tone variants and confirm hair/gi/belt are
   untouched and only the skin hue shifted. If the skin-cluster detection
   picked up the wrong pixels (e.g. a tan gi got recolored too), adjust
   `SKIN_HUE_RANGE` / `SKIN_MIN_SAT` / `SKIN_MIN_VAL` in `recolor_skin.py`.

## Notes

- `liftsubject.swift` uses Apple's Vision framework (`VNGenerateForegroundInstanceMaskRequest`)
  for ML-based subject/background segmentation — this matters because color-keying
  doesn't work when the character's hair and the background are both near-black.
- The binary isn't committed; rebuild with the `swiftc` command above (macOS only).
- `recolor_skin.py`'s tone shift is hue/saturation-led with a modest value
  nudge layered on top of each pixel's existing shading, so highlights and
  shadows are preserved rather than flattened per tone.
