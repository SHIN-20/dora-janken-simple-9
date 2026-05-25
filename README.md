# ロボキャットじゃんけん - シンプル版

ブルー・ロボキャット1体と対戦する、シンプルなじゃんけんゲーム。

## 起動方法

1. このフォルダを VS Code で開く
2. `index.html` を右クリック → `Open with Live Server`

直接 `index.html` をブラウザで開いても動きます。

## フォルダ構成

```
dora-janken-simple/
├── index.html
├── README.md
├── css/
│   └── style.css
├── js/
│   ├── sound.js     ← 効果音 (Web Audio API で合成)
│   └── game.js      ← ゲームロジック
└── assets/
    ├── Dora_001.png
    └── Dora_001_cutout.png
```

## 機能

- グー / チョキ / パーの3択でじゃんけん
- 敵キャラのアイドル / 勝ち / 負け / あいこアニメ
- ランダム選択のセリフ集 (勝敗ごとに3パターン)
- 効果音とイントロ音楽 (Web Audio API、音声ファイル不要)
- 勝ち / 負け / あいこのスコア表示とリセット

## コードを直すときの目印

| やりたいこと | 場所 |
|---|---|
| セリフを追加 | `js/game.js` の `LINES` |
| 「考え中」の時間を変える | `js/game.js` の `await sleep(700)` |
| アニメの動きを調整 | `css/style.css` の `@keyframes` |
| 色味を変える | `css/style.css` の `:root` (CSS変数) |
| 効果音の調整 | `js/sound.js` の `return { ... }` 内の数値 |
