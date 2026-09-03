#!/usr/bin/env python3
"""Extract the images embedded in Hoja2 cells of the catalog workbook."""

from __future__ import annotations

import argparse
from pathlib import Path

from catalog_excel_images import extract_cell_images


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--workbook", required=True, type=Path)
    parser.add_argument(
        "--output-dir",
        type=Path,
        default=Path("/private/tmp/catalogo-con-precios-1"),
    )
    args = parser.parse_args()

    images = extract_cell_images(args.workbook, args.output_dir)
    print(f"Extracted {len(images)} images to {args.output_dir}")


if __name__ == "__main__":
    main()
