"""
Shift the skin-toned pixels in a sprite to a different Fitzpatrick-scale tone,
leaving hair, gi, and belt pixels untouched.

Usage:
    python recolor_skin.py <in.png> <out_dir> [--preset-tag base]

Reads a single RGBA sprite and writes 6 tone variants (tone-1..tone-6) into
<out_dir>/tone-N/<same filename>. Tone 3 is treated as the source image's own
tone (copied through unchanged); the others are generated relative to it.

How it works:
  1. Auto-detect the "skin" hue cluster in the image: opaque pixels with
     moderate-to-high saturation and value, in the red-orange-yellow hue
     range typical of stylized skin tones (this deliberately excludes black
     hair [low value], white/light-blue gi [low saturation], and belt).
  2. Convert to HSV (PIL's 0-255-per-channel convention).
  3. For masked pixels only, apply a per-tone (hue_delta, sat_mult, val_delta)
     — hue/saturation carry most of the tone shift; a modest value delta is
     layered on top of each pixel's *existing* value so shading (highlights/
     shadows) is preserved rather than flattened.
"""
import argparse
import sys
from pathlib import Path

import numpy as np
from PIL import Image

# Skin-cluster detection window (0-255 scale, matching PIL's "HSV" mode)
SKIN_HUE_RANGE = (0, 40)      # red -> orange -> yellow-orange
SKIN_MIN_SAT = 60
SKIN_MIN_VAL = 40

# Per-tone offsets relative to the auto-detected base cluster.
# (hue_delta_255, sat_mult, val_delta_255) — tone 3 is the source, untouched.
TONE_ADJUSTMENTS = {
    1: (+6, 0.55, +35),
    2: (+3, 0.75, +18),
    3: (0, 1.0, 0),
    4: (-3, 1.15, -18),
    5: (-6, 1.30, -34),
    6: (-9, 1.45, -48),
}


def detect_skin_mask(hsv: np.ndarray) -> np.ndarray:
    h, s, v = hsv[..., 0], hsv[..., 1], hsv[..., 2]
    return (
        (h >= SKIN_HUE_RANGE[0])
        & (h <= SKIN_HUE_RANGE[1])
        & (s >= SKIN_MIN_SAT)
        & (v >= SKIN_MIN_VAL)
    )


def recolor(im: Image.Image, hue_delta: int, sat_mult: float, val_delta: int) -> Image.Image:
    rgba = np.array(im.convert("RGBA"))
    alpha = rgba[..., 3]
    hsv = np.array(im.convert("RGB").convert("HSV")).astype(np.int16)

    mask = detect_skin_mask(hsv) & (alpha > 0)
    if not mask.any():
        raise RuntimeError("no skin-colored pixels detected — check the hue/sat/val thresholds")

    h, s, v = hsv[..., 0].copy(), hsv[..., 1].copy(), hsv[..., 2].copy()
    h[mask] = (h[mask].astype(int) + hue_delta) % 256
    s[mask] = np.clip(s[mask].astype(float) * sat_mult, 0, 255).astype(np.uint8)
    v[mask] = np.clip(v[mask].astype(int) + val_delta, 0, 255).astype(np.uint8)

    hsv_out = np.stack([h, s, v], axis=-1).astype(np.uint8)
    rgb_out = np.array(Image.fromarray(hsv_out, mode="HSV").convert("RGB"))

    out = rgba.copy()
    out[..., :3] = rgb_out
    return Image.fromarray(out, mode="RGBA")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("input", type=Path)
    parser.add_argument("out_dir", type=Path)
    args = parser.parse_args()

    im = Image.open(args.input).convert("RGBA")
    for tone, (hue_delta, sat_mult, val_delta) in TONE_ADJUSTMENTS.items():
        tone_dir = args.out_dir / f"tone-{tone}"
        tone_dir.mkdir(parents=True, exist_ok=True)
        out_path = tone_dir / args.input.name
        if tone == 3:
            im.save(out_path)
        else:
            recolor(im, hue_delta, sat_mult, val_delta).save(out_path)
        print(f"wrote {out_path}")


if __name__ == "__main__":
    sys.exit(main())
