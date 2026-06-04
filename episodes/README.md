# エピソード / 章のファイル構成

1つの章（章）は **1つのフォルダの中で完結** します。本文・挿絵・演出が
すべて同じフォルダに収まっているので、ある章を直すときはそのフォルダ
だけを見れば済みます（LLM が読み込むトークンも最小限）。

```
episodes/
  manifest.js                  ← 収録する話と章の読み込みリスト（順序）
  ep01/                        ← 第1話
    episode.js                 ← 話のメタ情報（タイトル・著者など）
    ch01/                      ← 第一章（このフォルダで完結）
      chapter.js               ← 本文データ
      effect.js                ← この章の演出（背景＋粒子）※任意
      img/                     ← 挿絵画像
    ch02/ … ch06/
```

## 章を追加する

1. `episodes/ep01/chNN/` フォルダを作る
2. その中に `chapter.js`（必要なら `effect.js`、`img/`）を置く
3. `manifest.js` の `chapters` に `chNN` を 1 つ足す

演出を持つ章は manifest で `{ id: 'chNN', fx: true }` と書くと
`chNN/effect.js` も読み込まれます。演出なしの章は `'chNN'` だけでOK。

## chapter.js の書き方

```js
registerChapter('ep01', 'ch01', {
  sections: [
    {
      num: '第一章の１',
      ti:  '春の陽だまりの中で',
      effect: 'spring-sakura',     // effect.js で登録した演出名（任意）
      paras: [
        '　ふつうの段落はただの文字列。',
        '<span class="scene-brk">◇　◇　◇</span>',   // シーン区切りページ
        { img: 'aoi.png', cap: '葵' },               // 挿絵ページ（img/ から読込）
        '　続きの段落…'
      ]
    }
  ]
});
```

- **段落**: 文字列。冒頭の全角スペースで字下げ。
- **シーン区切り**: `scene-brk` を含む文字列 → 「◇ ◇ ◇」の区切りページ。
- **挿絵**: `{ img: 'ファイル名', cap: 'キャプション(任意)' }` を入れたい位置に
  置く → その章の `img/` から読み込んで専用の挿絵ページになります。

## effect.js の書き方

`registerEffect(name, { bg, step, draw })` でエンジンに演出を登録します。
`bg` は背景の CSS（`background` ショートハンド）、`step`/`draw` は粒子演出。
描画ループ・canvas 管理・ページのくり抜きは `index.html` の汎用エンジンが
担当するので、ここには「その章固有の見た目」だけを書きます。
