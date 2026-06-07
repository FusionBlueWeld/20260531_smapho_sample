#!/usr/bin/env python3
"""
Fix excessive furigana and half-width numbers in story chapter files.

Rules:
1. High-density furigana (>25% of kanji annotated): remove ALL half-width furigana
2. Low/medium density: remove furigana only from elementary kanji (grades 1-4)
3. Full-width furigana on elementary kanji: always remove
4. Number furigana (e.g. 1(いち)): always remove
5. Half-width digits in story text: convert to full-width (縦書き対応)
"""

import re
import os
import glob

# ── Elementary school kanji (grades 1–4) ──────────────────────────────────────
# These kanji are so common they should never need furigana.
ELEMENTARY_KANJI = frozenset(
    # Grade 1 (80)
    "一右雨円王音下火花貝学気九休玉金空月犬見五口校左三山子四糸字耳七車手十出女小上森人水正生青夕石赤千川先早草足村大男竹中虫町天田土二日入年白八百文木本名目立力林六"
    # Grade 2 (160)
    "引羽雲遠何科夏家歌画回会海絵外角楽活間丸岩顔汽記帰弓牛魚京強教近兄形計元言原戸古午後語工公広交光考行高黄合国黒今才細作算止市矢姉思紙寺自時室社弱首秋週春書少場色食心新親図数西声星晴切雪船線前組走多太体台地池知茶昼長鳥朝直通弟店点電刀冬当東答頭同道読内南肉馬売買麦半番父風分聞米歩母方北毎妹万明鳴毛門夜野友用曜来里理話"
    # Grade 3 (200)
    "悪安暗医委意育員院飲運泳駅央横屋温化荷界開階寒感漢館岸起客宮急球去橋業局曲銀区苦具君係軽血決研県庫湖向幸港号根祭坂皿仕死使始指歯詩次事持式実写者主守取酒受州拾終習集住重宿所暑助昭消商章勝乗植申身神真深進世整昔全送想相息速族他打対待代第題炭短談着注柱丁帳調追定庭笛鉄転都度投豆島湯登等動童農波配倍箱畑発反板悲皮鼻美氷表秒品負部服福物平返勉放味命面問役薬由油有遊予羊洋葉陽様落流旅両緑礼列練路和"
    # Grade 4 (202)
    "愛案以衣位囲胃印英栄塩億加果貨課芽改械害街各覚完管関観願岐希季旗機議求泣救給挙漁共協鏡競極訓軍郡径型景芸欠結建健験固功好候航康告差菜最材昨刷察産散残氏司試児治滋辞鹿失借種周祝順初松笑唱焼象照賞信成省清静席積折節説戦選然争倉巣束側続卒孫帯隊達単置仲沖兆低底典伝徒努灯堂働特得毒熱念敗梅博飯費飛必票標不夫付府副粉兵別辺変便包法望牧末満未脈民無矛約勇要養浴利陸料良論"
)

# ── Regex patterns ─────────────────────────────────────────────────────────────
# Half-width furigana:  漢字(よみがな)
HW_FURI = re.compile(r'([一-鿿々]+)\(([ぁ-ん]{1,15})\)')
# Full-width furigana:  漢字（よみがな）  – but NOT internal thoughts (long phrases)
FW_FURI = re.compile(r'([一-鿿々]+)（([ぁ-ん]{1,15})）')
# Number furigana:  1(いち)  or  1+1(いちたすいち)
NUM_FURI = re.compile(r'([0-9]+(?:[+\-×÷][0-9]+)?)\(([ぁ-ん]{1,15})\)')
# Kanji counter
KANJI_RE = re.compile(r'[一-鿿々]')
# Japanese content detector
JP_RE = re.compile(r'[ぁ-んァ-ン一-鿿々]')

# ── Digit conversion ───────────────────────────────────────────────────────────
DIGIT_TABLE = str.maketrans('0123456789', '０１２３４５６７８９')


def count_hw_furigana(text: str) -> int:
    return len(HW_FURI.findall(text))


def count_kanji(text: str) -> int:
    return len(KANJI_RE.findall(text))


def remove_all_hw_furigana(text: str) -> str:
    """Remove ALL half-width furigana: 漢字(よみがな) → 漢字"""
    return HW_FURI.sub(r'\1', text)


def remove_elementary_hw_furigana(text: str) -> str:
    """Remove half-width furigana only from single elementary-school kanji."""
    def repl(m):
        kanji = m.group(1)
        if len(kanji) == 1 and kanji in ELEMENTARY_KANJI:
            return kanji
        return m.group(0)
    return HW_FURI.sub(repl, text)


def remove_elementary_fw_furigana(text: str) -> str:
    """Remove full-width furigana only from single elementary-school kanji."""
    def repl(m):
        kanji = m.group(1)
        if len(kanji) == 1 and kanji in ELEMENTARY_KANJI:
            return kanji
        return m.group(0)
    return FW_FURI.sub(repl, text)


def remove_number_furigana(text: str) -> str:
    """Remove furigana attached to numerals: 1(いち) → 1"""
    return NUM_FURI.sub(r'\1', text)


def convert_numbers_to_fullwidth(text: str) -> str:
    """Convert half-width digits to full-width, and + between digits to ＋."""
    # Step 1: convert digits
    result = text.translate(DIGIT_TABLE)
    # Step 2: convert + that is surrounded by (possibly full-width) digits
    result = re.sub(r'(?<=[０-９0-9])\+(?=[０-９0-9])', '＋', result)
    return result


def process_string_content(content: str, density: float) -> str:
    """
    Apply all fixes to a single double-quoted string value.

    density: fraction of kanji that already have half-width furigana in this file.
    """
    if not JP_RE.search(content):
        return content   # Not Japanese text; skip (effect names, img paths, …)

    # 1. Always remove furigana on numbers
    content = remove_number_furigana(content)

    # 2. Remove kanji furigana according to density
    if density > 0.25:
        # Overwhelmingly annotated → strip everything
        content = remove_all_hw_furigana(content)
    else:
        # Selective annotation → only remove from very common (grade 1–4) single kanji
        content = remove_elementary_hw_furigana(content)

    # 3. Always remove full-width furigana from single elementary kanji
    content = remove_elementary_fw_furigana(content)

    # 4. Convert half-width digits to full-width (縦書き対応)
    content = convert_numbers_to_fullwidth(content)

    return content


def process_chapter_file(filepath: str) -> tuple[bool, float]:
    """
    Read, fix, and write a chapter.js file.
    Returns (was_modified, density).
    """
    with open(filepath, encoding='utf-8') as f:
        original = f.read()

    # Calculate furigana density for the whole file
    total_furi = count_hw_furigana(original)
    total_kanji = count_kanji(original)
    density = total_furi / max(total_kanji, 1)

    # Process each double-quoted string in the file
    changed = False
    parts = []
    pos = 0

    for m in re.finditer(r'"([^"]*)"', original):
        parts.append(original[pos:m.start()])
        inner = m.group(1)
        fixed = process_string_content(inner, density)
        if fixed != inner:
            changed = True
            parts.append('"' + fixed + '"')
        else:
            parts.append(m.group(0))
        pos = m.end()

    parts.append(original[pos:])

    if changed:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(''.join(parts))

    return changed, density


def main() -> None:
    base_dir = os.path.join(os.path.dirname(__file__), 'episodes')
    pattern = os.path.join(base_dir, '**', 'chapter.js')

    modified = []
    for filepath in sorted(glob.glob(pattern, recursive=True)):
        was_changed, density = process_chapter_file(filepath)
        rel = os.path.relpath(filepath, base_dir)
        tag = 'MODIFIED' if was_changed else 'unchanged'
        if density > 0.01 or was_changed:
            print(f"[{tag}] density={density:.3f}  {rel}")
        if was_changed:
            modified.append(rel)

    print(f"\n{'─'*60}")
    print(f"Files modified: {len(modified)}")
    for p in modified:
        print(f"  {p}")


if __name__ == '__main__':
    main()
