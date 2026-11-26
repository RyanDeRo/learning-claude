"""
Recolor a sprite's magenta "key" belt into each BJJ rank color.

Usage:
    python recolor_belt.py <in.png> <out_dir>

Writes <out_dir>/<belt>/<same filename> for every belt in BELTS.
Run this LAST in the pipeline (after recolor_skin.py): a brown belt's hue
overlaps the skin detector, so skin recolor must happen before belts exist.

How it works (why not just "replace #FF00FF"?):
  AI image tools deliver JPEG, and resizing blends edges, so most belt pixels
  are NOT pure magenta. Edge pixels are magenta mixed with the black outline
  (e.g. 105,30,108) or with the white gi (e.g. 255,223,255). Replacing only
  pure magenta would leave a pink halo.

  Instead we treat every pixel as a mix:  pixel = (1-t) * neutral + t * MAGENTA
    - t (0..1) = how much magenta is in the pixel, measured by
      min(R,B) - G  (magenta = high red AND blue, low green; the white/blue gi,
      black hair, and orange skin all score <= 0 on this).
    - neutral = the gray it was blended with (outline black or gi white).
  Then we swap the magenta share for the rank color:
      out = (1-t) * neutral + t * RANK_COLOR * shade
  where shade keeps the core belt's light/dark variation.
"""
import argparse
import sys
from pathlib import Path

import numpy as np
from PIL import Image

# Starting rank colors — tune by eye on the dojo background.
BELTS = {
    "white": (0xF2, 0xF2, 0xF2),
    "blue": (0x1F, 0x4F, 0xD1),
    "purple": (0x6A, 0x2D, 0xA8),
    "brown": (0x6B, 0x3E, 0x1E),
    "black": (0x1A, 0x1A, 0x1A),
}

MIN_SCORE = 12        # below this, a pixel has no meaningful magenta in it
CORE_SCORE = 140      # pixels this magenta are "solid belt" — used to measure the key color
MAX_RB_GAP = 60       # |R-B| above this isn't magenta (it's red/orange or blue)
CORE_T = 0.9          # treat t above this as fully belt


def belt_masks(rgba: np.ndarray):
    rgb = rgba[..., :3].astype(np.float32)
    r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    opaque = rgba[..., 3] > 0
    score = np.minimum(r, b) - g
    magentaish = opaque & (score >= MIN_SCORE) & (np.abs(r - b) <= MAX_RB_GAP)

    core = magentaish & (score >= CORE_SCORE)
    if core.sum() < 200:
        raise RuntimeError(f"only {core.sum()} solid-magenta pixels found — is the belt magenta?")

    # The actual key color as the AI rendered it (not the ideal #FF00FF)
    key = np.median(rgb[core], axis=0)
    key_score = min(key[0], key[2]) - key[1]
    key_bright = max(key[0], key[2])

    t = np.clip(score / key_score, 0, 1) * magentaish
    return rgb, t, key, key_bright


def recolor(rgba: np.ndarray, rgb, t, key, key_bright, color) -> np.ndarray:
    color = np.array(color, dtype=np.float32)
    out = rgb.copy()
    sel = t > 0

    tt = t[sel][:, None]
    px = rgb[sel]
    core = (t[sel] >= CORE_T)[:, None]

    # Shade: how bright this pixel's magenta is vs the typical belt pixel
    shade = np.clip(np.maximum(px[:, 0], px[:, 2]) / key_bright, 0.5, 1.15)[:, None]
    shaded = np.clip(color * shade, 0, 255)

    # Recover the neutral gray this pixel was blended with (green has the least magenta in it)
    safe = np.clip(1 - tt, 1e-3, 1)
    neutral = np.clip((px[:, 1:2] - tt * key[1]) / safe, 0, 255).repeat(3, axis=1)

    mixed = (1 - tt) * neutral + tt * color
    out[sel] = np.where(core, shaded, mixed)

    result = rgba.copy()
    result[..., :3] = np.clip(out, 0, 255).astype(np.uint8)
    return result


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("input", type=Path)
    parser.add_argument("out_dir", type=Path)
    args = parser.parse_args()

    rgba = np.array(Image.open(args.input).convert("RGBA"))
    rgb, t, key, key_bright = belt_masks(rgba)
    for belt, color in BELTS.items():
        d = args.out_dir / belt
        d.mkdir(parents=True, exist_ok=True)
        out_path = d / args.input.name
        im = Image.fromarray(recolor(rgba, rgb, t, key, key_bright, color), "RGBA")
        # 256-color palette PNG: visually identical for pixel art, ~5x smaller (matters for app size)
        im = im.quantize(colors=256, method=Image.Quantize.FASTOCTREE, dither=Image.Dither.NONE)
        im.save(out_path, optimize=True)
        print(f"wrote {out_path}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
