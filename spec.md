# 近隣店舗検索システム 仕様書  
（開発者向け・管理者向け・利用者向け）

---

# ===========================
# 1. 開発者向けドキュメント
# ===========================

---

## 1.1 対象とするシステムの決定 🤔

本システムは，近隣の以下 3 種類の店舗情報を扱う Web アプリケーションである．

- カラオケ店
- スーパーマーケット
- コンビニエンスストア

Express（Node.js）と EJS を使用し，  
**一覧表示・詳細表示・追加・編集・削除（CRUD）機能** を実装する．

---

## 1.2 データ構造の決定 🤔

### ● カラオケ店舗データ
```json
{
  "id": 1,
  "name": "カラオケ館 五香店",
  "address": "千葉県松戸市…",
  "openHours": "09:00-26:00",
  "rooms": 14,
  "price": 500
}
```

### ● スーパー店舗データ
```json
{
  "id": 1,
  "name": "スーパーベルクス 習志野店",
  "address": "千葉県習志野市…",
  "openHours": "9:00-21:00",
  "parking": true,
  "floorArea": 1200
}
```

### ● コンビニ店舗データ
```json
{
  "id": 1,
  "name": "セブンイレブン 五香駅東口店",
  "brand": "セブン",
  "address": "千葉県松戸市金ケ作…",
  "open24h": true,
  "atm": true
}
```

## 1.3 ページ構造の検討
| 店舗種別 | 一覧       | 詳細                  | 新規追加            | 編集                | 削除                  |
| ---- | -------- | ------------------- | --------------- | ----------------- | ------------------- |
| カラオケ | /karaoke | /karaoke/detail/:id | /karaoke/create | /karaoke/edit/:id | /karaoke/delete/:id |
| スーパー | /super   | /super/detail/:id   | /super/create   | /super/edit/:id   | /super/delete/:id   |
| コンビニ | /conveni | /conveni/detail/:id | /conveni/create | /conveni/edit/:id | /conveni/delete/:id |

## 1.4 ページ遷移の検討
一覧ページ
 ├── 詳細ページ
 │     ├── 編集ページ → 更新 → 一覧へ
 │     └── 削除 → 一覧へ
 └── 新規追加ページ → 登録 → 一覧へ

## 1.5 HTTPメソッドとリソース名
### ● カラオケ店舗データ
| メソッド | リソース                | 説明         |
| ---- | ------------------- | ---------- |
| GET  | /karaoke            | カラオケ店一覧を表示 |
| GET  | /karaoke/detail/:id | 指定IDの詳細表示  |
| GET  | /karaoke/create     | 新規登録フォーム表示 |
| POST | /karaoke/create     | 新規店舗データ登録  |
| GET  | /karaoke/edit/:id   | 編集フォーム表示   |
| POST | /karaoke/update/:id | 既存データ更新    |
| GET  | /karaoke/delete/:id | 指定データ削除    |

### ● スーパー店舗データ
| メソッド | リソース              | 説明       |
| ---- | ----------------- | -------- |
| GET  | /super            | スーパー一覧表示 |
| GET  | /super/detail/:id | 詳細表示     |
| GET  | /super/create     | 新規追加フォーム |
| POST | /super/create     | データ登録    |
| GET  | /super/edit/:id   | 編集フォーム   |
| POST | /super/update/:id | 更新処理     |
| GET  | /super/delete/:id | 削除処理     |

### ● コンビニ店舗データ
| メソッド | リソース                | 説明       |
| ---- | ------------------- | -------- |
| GET  | /conveni            | コンビニ一覧表示 |
| GET  | /conveni/detail/:id | 詳細表示     |
| GET  | /conveni/create     | 新規追加フォーム |
| POST | /conveni/create     | 登録処理     |
| GET  | /conveni/edit/:id   | 編集フォーム   |
| POST | /conveni/update/:id | 更新処理     |
| GET  | /conveni/delete/:id | 削除処理     |

## 1.6 ページ遷移図


## 1.7 ドキュメント構成の検討
・開発者向け：API とデータ構造

・管理者向け：インストール・起動方法

・利用者向け：画面説明と使い方

## 1.8 概要
本アプリはExpressによりルーティングを行い，EJSテンプレートでページ描画を行うサーバサイドWebアプリケーションである．
データはメモリ上に配列として管理され，REST風の統一されたAPIデザインを採用する．

## 1.9 データ構造
### カラオケ店舗データ