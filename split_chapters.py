#!/usr/bin/env python3
"""Split heavy ep01 chapters into two files at natural story breaks."""

import json
import os
import re
import shutil

BASE = os.path.join(os.path.dirname(__file__), 'episodes', 'ep01')

# (chapter_id, split_after_N_sections, new_chapter_id)
# split_at=4 means sections[0:4] stay, sections[4:] move to new chapter
SPLITS = [
    ('ch02', 4, 'ch02b'),  # 第二章の１〜４ / 第二章の５〜９
    ('ch03', 3, 'ch03b'),  # 第三章の１〜３ / 第三章の４〜７
    ('ch04', 4, 'ch04b'),  # 第四章の１〜４ / 第四章の５〜８
    ('ch05', 3, 'ch05b'),  # 第五章の１〜３ / 第五章の４〜７
    ('ch06', 3, 'ch06b'),  # 第六章の１〜３ / 第六章の４〜６
]


def load_chapter(ch_id):
    path = os.path.join(BASE, ch_id, 'chapter.js')
    with open(path, encoding='utf-8') as f:
        src = f.read()
    # Extract the JSON object passed to registerChapter(...)
    m = re.search(r"registerChapter\('[^']+',\s*'[^']+',\s*\{", src)
    if not m:
        raise ValueError(f"Cannot parse {path}")
    brace_start = src.index('{', m.start())
    depth, end = 0, brace_start
    for i, c in enumerate(src[brace_start:]):
        if c == '{':
            depth += 1
        elif c == '}':
            depth -= 1
            if depth == 0:
                end = brace_start + i + 1
                break
    data = json.loads(src[brace_start:end])
    return data, src[:m.start()]  # data + the leading comment


def save_chapter(ch_id, data, header_comment):
    path = os.path.join(BASE, ch_id, 'chapter.js')
    body = json.dumps(data, ensure_ascii=False, indent=2)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(f"{header_comment}registerChapter('ep01', '{ch_id}', {body});\n")


def update_manifest(splits):
    manifest_path = os.path.join(os.path.dirname(__file__), 'episodes', 'manifest.js')
    with open(manifest_path, encoding='utf-8') as f:
        src = f.read()
    for old_ch, _, new_ch in splits:
        # Insert new chapter entry immediately after the old one
        src = re.sub(
            rf"(\{{ id: '{old_ch}', fx: true \}},)",
            lambda m: m.group(1) + f"\n      {{ id: '{new_ch}', fx: true }},",
            src,
        )
    with open(manifest_path, 'w', encoding='utf-8') as f:
        f.write(src)


def main():
    for ch_id, split_at, new_ch_id in SPLITS:
        data, header = load_chapter(ch_id)
        sections = data['sections']
        first  = sections[:split_at]
        second = sections[split_at:]

        nums_first  = [s['num'] for s in first]
        nums_second = [s['num'] for s in second]
        print(f"{ch_id}({len(sections)}sec) → {ch_id}[{nums_first[0]}〜{nums_first[-1]}]"
              f" + {new_ch_id}[{nums_second[0]}〜{nums_second[-1]}]")

        # Overwrite original with first half
        save_chapter(ch_id, {'sections': first}, header)

        # Create new directory for second half
        new_dir = os.path.join(BASE, new_ch_id)
        os.makedirs(new_dir, exist_ok=True)

        # Copy effect.js (registers all effects used by both halves)
        effect_src = os.path.join(BASE, ch_id, 'effect.js')
        if os.path.exists(effect_src):
            shutil.copy2(effect_src, os.path.join(new_dir, 'effect.js'))

        # Build appropriate header comment for the new file
        new_header = header  # same comment style
        save_chapter(new_ch_id, {'sections': second}, new_header)

    update_manifest(SPLITS)

    # Verify
    print("\n--- manifest ep01 chapters (verify) ---")
    manifest_path = os.path.join(os.path.dirname(__file__), 'episodes', 'manifest.js')
    with open(manifest_path, encoding='utf-8') as f:
        for line in f:
            if 'ep01' in line or ("id: 'ch" in line):
                print(line, end='')
            if 'ep02' in line:
                break


if __name__ == '__main__':
    main()
