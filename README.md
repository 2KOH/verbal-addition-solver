# verbal-addition-solver

## 概要
覆面算の解を探索する JavaScript のプログラムです。ES2015 以降の文法を使っているので、古いブラウザでは動作しません。

## 使い方

### Node.js
```
const Solver = require('verbal-addition-solver');

console.log([...Solver.solve('SEND', 'MORE', 'MONEY')]);
```

### ブラウザ
```
// verbal-addition-solver.js を読み込んでおく。

console.log([...VerbalAdditionSolver.solve('SEND', 'MORE', 'MONEY')]);
```

## アルゴリズムのメモ
探索順は、深さ優先探索。

式変形せず、覆面算の数式のまま以下の探索を行う。

最下位の桁から順に未知数に数字を当てはめていく。
最下位の桁にすべての数字を当てはめ終わったら、その桁について等式が成立しているかをチェックする。
成立している場合、一つ上の桁で同様の手順を行う。
最上位の桁までチェックが終了したものを、解として出力する。

## ライセンス
MIT
