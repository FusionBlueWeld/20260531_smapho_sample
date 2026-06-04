/* 収録エピソードと章の読み込みリスト。
 * 章を追加するときは、新しいフォルダを作ってここに id を1つ足すだけ。
 * fx:true を付けると、その章フォルダの effect.js も読み込みます。 */
window.EPISODE_MANIFEST = [
  {
    id: 'ep01',
    chapters: [
      { id: 'ch01', fx: true },
      'ch02',
      'ch03',
      'ch04',
      'ch05',
      'ch06',
    ],
  },
];
