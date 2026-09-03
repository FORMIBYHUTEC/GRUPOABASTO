#!/usr/bin/env python3
"""Create compact WebP derivatives for the catalog card grid."""

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--source-dir",
        type=Path,
        default=Path("/private/tmp/catalogo-con-precios-1"),
    )
    parser.add_argument(
        "--output-dir",
        type=Path,
        default=Path("/private/tmp/catalogo-con-precios-1-webp"),
    )
    parser.add_argument("--max-dimension", type=int, default=768)
    parser.add_argument("--quality", type=int, default=76)
    args = parser.parse_args()

    source_files = sorted(args.source_dir.glob("*.png"))
    if len(source_files) != 91:
        raise ValueError(f"Expected 91 source PNGs; found {len(source_files)}")

    args.output_dir.mkdir(parents=True, exist_ok=True)
    total_bytes = 0
    for source_path in source_files:
        output_path = args.output_dir / f"{source_path.stem}.webp"
        with Image.open(source_path) as image:
            image.thumbnail((args.max_dimension, args.max_dimension), Image.Resampling.LANCZOS)
            if image.mode not in {"RGB", "RGBA"}:
                image = image.convert("RGBA" if "A" in image.getbands() else "RGB")
            image.save(output_path, "WEBP", quality=args.quality, method=6)
        total_bytes += output_path.stat().st_size

    print(
        f"Optimized {len(source_files)} images to {args.output_dir} "
        f"({total_bytes / 1024 / 1024:.1f} MB)"
    )


if __name__ == "__main__":
    main()
