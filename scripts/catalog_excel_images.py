"""Read and extract Excel cell images stored as rich values.

The supplied workbook uses Excel's in-cell image format, not drawing anchors.
Each image is stored as a rich value in column C of Hoja2.
"""

from __future__ import annotations

import shutil
from pathlib import Path
from xml.etree import ElementTree as ET
from zipfile import ZipFile


STORAGE_IMAGE_PREFIX = (
    "https://pjbmrocrfbzfvivasoxw.supabase.co/storage/v1/object/public/"
    "product-images/catalogo-con-precios-1/optimized"
)

SHEET_NS = "http://schemas.openxmlformats.org/spreadsheetml/2006/main"
REL_NS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
PACKAGE_REL_NS = "http://schemas.openxmlformats.org/package/2006/relationships"


def cell_image_media_by_row(workbook_path: Path) -> dict[int, str]:
    """Return Hoja2 row -> XLSX media filename for every in-cell image."""

    with ZipFile(workbook_path) as archive:
        sheet = ET.fromstring(archive.read("xl/worksheets/sheet2.xml"))
        rich_values = ET.fromstring(archive.read("xl/richData/rdrichvalue.xml"))
        rich_relations = ET.fromstring(archive.read("xl/richData/richValueRel.xml"))
        relation_targets = ET.fromstring(
            archive.read("xl/richData/_rels/richValueRel.xml.rels")
        )

    targets_by_id = {
        relation.attrib["Id"]: relation.attrib["Target"].rsplit("/", 1)[-1]
        for relation in relation_targets.findall(f"{{{PACKAGE_REL_NS}}}Relationship")
    }
    rich_relation_ids = [
        relation.attrib[f"{{{REL_NS}}}id"]
        for relation in rich_relations
    ]
    image_by_rich_value = []
    for rich_value in rich_values:
        relation_index = int(rich_value[0].text or "0")
        image_by_rich_value.append(targets_by_id[rich_relation_ids[relation_index]])

    images_by_row: dict[int, str] = {}
    for cell in sheet.findall(f".//{{{SHEET_NS}}}c"):
        cell_ref = cell.attrib.get("r", "")
        rich_metadata_id = cell.attrib.get("vm")
        if not rich_metadata_id or not cell_ref.startswith("C"):
            continue
        row_number = int(cell_ref[1:])
        images_by_row[row_number] = image_by_rich_value[int(rich_metadata_id) - 1]

    return images_by_row


def extract_cell_images(workbook_path: Path, output_dir: Path) -> list[Path]:
    """Copy the unique media files referenced by Hoja2 cells to output_dir."""

    output_dir.mkdir(parents=True, exist_ok=True)
    image_names = sorted(set(cell_image_media_by_row(workbook_path).values()))
    output_paths: list[Path] = []
    with ZipFile(workbook_path) as archive:
        for image_name in image_names:
            output_path = output_dir / image_name
            with archive.open(f"xl/media/{image_name}") as source, output_path.open("wb") as target:
                shutil.copyfileobj(source, target)
            output_paths.append(output_path)
    return output_paths
