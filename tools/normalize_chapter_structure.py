#!/usr/bin/env python3
"""Compact episode chapters so each chapter has at least three sections.

The script preserves section order, combines adjacent underfilled chapters,
normalizes section labels to "第N章のM", rewrites each episode to sequential
chNN folders, and rebuilds the manifest from actual files.
"""

from __future__ import annotations

import json
import re
import shutil
from dataclasses import dataclass, field
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
EPISODES = ROOT / "episodes"
MIN_SECTIONS = 3

NUM_RE = r"[\u3007\u96f6\u4e00\u58f1\u4e8c\u5f10\u4e09\u53c2\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341\u767e0-9\uff10-\uff19]+"
KANJI_DIGITS = {
    "\u3007": 0,
    "\u96f6": 0,
    "\u4e00": 1,
    "\u58f1": 1,
    "\u4e8c": 2,
    "\u5f10": 2,
    "\u4e09": 3,
    "\u53c2": 3,
    "\u56db": 4,
    "\u4e94": 5,
    "\u516d": 6,
    "\u4e03": 7,
    "\u516b": 8,
    "\u4e5d": 9,
}
FW_TO_ASCII = str.maketrans("\uff10\uff11\uff12\uff13\uff14\uff15\uff16\uff17\uff18\uff19", "0123456789")
ASCII_TO_FW = str.maketrans("0123456789", "\uff10\uff11\uff12\uff13\uff14\uff15\uff16\uff17\uff18\uff19")


@dataclass
class SourceGroup:
    sections: list[dict] = field(default_factory=list)
    effect_paths: list[Path] = field(default_factory=list)


def parse_number(text: str) -> int | None:
    text = text.strip()
    if text.isdigit():
        return int(text)
    if text and all("\uff10" <= char <= "\uff19" for char in text):
        return int(text.translate(FW_TO_ASCII))
    if text == "\u5341":
        return 10
    if "\u5341" in text:
        left, right = text.split("\u5341", 1)
        tens = KANJI_DIGITS.get(left, 1) if left else 1
        ones = KANJI_DIGITS.get(right, 0) if right else 0
        return tens * 10 + ones
    return KANJI_DIGITS.get(text)


def chapter_label(num: int) -> str:
    labels = {
        1: "\u7b2c\u4e00\u7ae0",
        2: "\u7b2c\u4e8c\u7ae0",
        3: "\u7b2c\u4e09\u7ae0",
        4: "\u7b2c\u56db\u7ae0",
        5: "\u7b2c\u4e94\u7ae0",
        6: "\u7b2c\u516d\u7ae0",
        7: "\u7b2c\u4e03\u7ae0",
        8: "\u7b2c\u516b\u7ae0",
        9: "\u7b2c\u4e5d\u7ae0",
        10: "\u7b2c\u5341\u7ae0",
        11: "\u7b2c\u5341\u4e00\u7ae0",
        12: "\u7b2c\u5341\u4e8c\u7ae0",
        13: "\u7b2c\u5341\u4e09\u7ae0",
        14: "\u7b2c\u5341\u56db\u7ae0",
        15: "\u7b2c\u5341\u4e94\u7ae0",
        16: "\u7b2c\u5341\u516d\u7ae0",
        17: "\u7b2c\u5341\u4e03\u7ae0",
        18: "\u7b2c\u5341\u516b\u7ae0",
        19: "\u7b2c\u5341\u4e5d\u7ae0",
        20: "\u7b2c\u4e8c\u5341\u7ae0",
    }
    return labels[num]


def section_label(chapter_num: int, section_num: int) -> str:
    return f"{chapter_label(chapter_num)}\u306e{str(section_num).translate(ASCII_TO_FW)}"


def folder_chapter_number(ch_id: str) -> int:
    match = re.match(r"ch(\d+)", ch_id)
    if not match:
        raise ValueError(f"Cannot infer chapter number from {ch_id}")
    return int(match.group(1))


def chapter_sort_key(path: Path) -> tuple[int, str]:
    match = re.match(r"ch(\d+)(.*)", path.name)
    if not match:
        return (999, path.name)
    return (int(match.group(1)), match.group(2))


def extract_object(src: str) -> dict:
    match = re.search(r"registerChapter\('[^']+',\s*'[^']+',\s*\{", src)
    if not match:
        raise ValueError("registerChapter call not found")
    start = src.index("{", match.start())
    depth = 0
    in_string = False
    escape = False
    for index, char in enumerate(src[start:], start):
        if in_string:
            if escape:
                escape = False
            elif char == "\\":
                escape = True
            elif char == '"':
                in_string = False
        else:
            if char == '"':
                in_string = True
            elif char == "{":
                depth += 1
            elif char == "}":
                depth -= 1
                if depth == 0:
                    return json.loads(src[start : index + 1])
    raise ValueError("chapter object not closed")


def load_chapter(path: Path) -> dict:
    return extract_object(path.read_text(encoding="utf-8"))


def infer_group_key(ch_dir: Path, sections: list[dict]) -> int:
    if sections:
        label = str(sections[0].get("num", ""))
        for pattern in (
            rf"^\u7b2c({NUM_RE})\u7ae0",
            rf"^\u7b2c({NUM_RE})\u8a71$",
            rf"^\u5176\u306e({NUM_RE})$",
        ):
            match = re.match(pattern, label)
            if match:
                parsed = parse_number(match.group(1))
                if parsed is not None:
                    return parsed
    return folder_chapter_number(ch_dir.name)


def add_effect_path(group: SourceGroup, effect_path: Path) -> None:
    if effect_path.exists() and effect_path not in group.effect_paths:
        group.effect_paths.append(effect_path)


def collect_groups(ep_dir: Path) -> list[SourceGroup]:
    chapter_dirs = sorted(
        [path for path in ep_dir.iterdir() if path.is_dir() and (path / "chapter.js").exists()],
        key=chapter_sort_key,
    )
    groups: list[tuple[int, SourceGroup]] = []
    for ch_dir in chapter_dirs:
        data = load_chapter(ch_dir / "chapter.js")
        sections = data.get("sections", [])
        key = infer_group_key(ch_dir, sections)
        if groups and groups[-1][0] == key:
            target = groups[-1][1]
        else:
            target = SourceGroup()
            groups.append((key, target))
        target.sections.extend(sections)
        add_effect_path(target, ch_dir / "effect.js")
    return [group for _key, group in groups]


def merge_groups(left: SourceGroup, right: SourceGroup) -> SourceGroup:
    merged = SourceGroup(sections=[*left.sections, *right.sections], effect_paths=[*left.effect_paths])
    for effect_path in right.effect_paths:
        if effect_path not in merged.effect_paths:
            merged.effect_paths.append(effect_path)
    return merged


def compact_groups(groups: list[SourceGroup]) -> list[SourceGroup]:
    result: list[SourceGroup] = []
    pending: SourceGroup | None = None
    for group in groups:
        if pending is not None:
            pending = merge_groups(pending, group)
            if len(pending.sections) >= MIN_SECTIONS:
                result.append(pending)
                pending = None
            continue
        if len(group.sections) < MIN_SECTIONS:
            pending = group
        else:
            result.append(group)
    if pending is not None:
        if result:
            result[-1] = merge_groups(result[-1], pending)
        else:
            result.append(pending)
    return result


def write_effect_file(dest: Path, effect_paths: list[Path]) -> None:
    parts: list[str] = []
    seen: set[Path] = set()
    for effect_path in effect_paths:
        resolved = effect_path.resolve()
        if resolved in seen:
            continue
        seen.add(resolved)
        parts.append(
            f"/* Source: {effect_path.relative_to(ROOT).as_posix()} */\n"
            + effect_path.read_text(encoding="utf-8").rstrip()
        )
    dest.write_text("\n\n".join(parts) + "\n", encoding="utf-8")


def write_chapter(ep_dir: Path, chapter_index: int, group: SourceGroup) -> str:
    ch_id = f"ch{chapter_index:02d}"
    ch_dir = ep_dir / ch_id
    ch_dir.mkdir(parents=True, exist_ok=True)
    for section_index, section in enumerate(group.sections, 1):
        section["num"] = section_label(chapter_index, section_index)
    body = json.dumps({"sections": group.sections}, ensure_ascii=False, indent=2)
    chapter_src = (
        f"/* {chapter_label(chapter_index)} - compacted chapter data. */\n"
        f"registerChapter('{ep_dir.name}', '{ch_id}', {body});\n"
    )
    (ch_dir / "chapter.js").write_text(chapter_src, encoding="utf-8")
    write_effect_file(ch_dir / "effect.js", group.effect_paths)
    return ch_id


def rewrite_episode(ep_dir: Path) -> list[str]:
    compacted = compact_groups(collect_groups(ep_dir))
    keep_ids = {f"ch{index:02d}" for index in range(1, len(compacted) + 1)}
    written: list[str] = []
    for index, group in enumerate(compacted, 1):
        written.append(write_chapter(ep_dir, index, group))
    for child in ep_dir.iterdir():
        if child.is_dir() and re.fullmatch(r"ch\d+[a-z]*", child.name) and child.name not in keep_ids:
            shutil.rmtree(child)
    return written


def rebuild_manifest(ep_chapters: dict[str, list[str]]) -> None:
    lines = [
        "/* Episode and chapter loading manifest.",
        " * Chapters are compacted so each listed chapter has at least three sections.",
        " * fx:true loads the chapter folder's effect.js. */",
        "window.EPISODE_MANIFEST = [",
    ]
    for ep_id in sorted(ep_chapters):
        lines.append("  {")
        lines.append(f"    id: '{ep_id}',")
        lines.append("    chapters: [")
        for ch_id in ep_chapters[ep_id]:
            lines.append(f"      {{ id: '{ch_id}', fx: true }},")
        lines.append("    ],")
        lines.append("  },")
    lines.append("];")
    (EPISODES / "manifest.js").write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> None:
    ep_chapters: dict[str, list[str]] = {}
    for ep_dir in sorted(path for path in EPISODES.iterdir() if path.is_dir() and re.fullmatch(r"ep\d+", path.name)):
        before = len([path for path in ep_dir.iterdir() if path.is_dir() and (path / "chapter.js").exists()])
        written = rewrite_episode(ep_dir)
        ep_chapters[ep_dir.name] = written
        print(f"{ep_dir.name}: {before} -> {len(written)} chapters")
    rebuild_manifest(ep_chapters)


if __name__ == "__main__":
    main()
