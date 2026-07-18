"""
Crop, uniformly scale, and bottom-align a set of background-removed sprites
onto a shared canvas so a character stays visually consistent across poses.

Usage:
    python normalize.py <in_dir> <out_dir>

Expects <in_dir> to contain idle.png, training.png, celebration.png,
discouraged.png (already alpha-cut by liftsubject). Writes the same
filenames into <out_dir>, each cropped to its subject's bounding box, scaled
by one shared factor (so relative proportions between poses are preserved),
and bottom-aligned on a 512x640 canvas.
"""
import sys
from pathlib import Path

from PIL import Image

STATES = ["idle", "training", "celebration", "discouraged"]
CANVAS = (512, 640)
PAD_BOTTOM = 12


def main():
    if len(sys.argv) != 3:
        print(__doc__)
        return 1
    in_dir, out_dir = Path(sys.argv[1]), Path(sys.argv[2])
    out_dir.mkdir(parents=True, exist_ok=True)

    crops = {}
    for state in STATES:
        im = Image.open(in_dir / f"{state}.png").convert("RGBA")
        crops[state] = im.crop(im.getbbox())

    max_h = max(im.height for im in crops.values())
    scale = (CANVAS[1] - PAD_BOTTOM - 16) / max_h

    for state, im in crops.items():
        w, h = round(im.width * scale), round(im.height * scale)
        im = im.resize((w, h), Image.LANCZOS)
        canvas = Image.new("RGBA", CANVAS, (0, 0, 0, 0))
        canvas.alpha_composite(im, ((CANVAS[0] - w) // 2, CANVAS[1] - PAD_BOTTOM - h))
        path = out_dir / f"{state}.png"
        canvas.save(path, optimize=True)
        print(f"{path}  sprite={w}x{h}")

    return 0


if __name__ == "__main__":
    sys.exit(main())
