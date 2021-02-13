# TypeORM サンプル

## TypeORM / TypeORM リポジトリ（Mysql 向け、一部コメントの日本語化、一部修正）

### sample/sample1-simple-entity

TypeORM のシンプルなコード。

### sample/sample2-one-to-one

一対一、`@OneToOne`の実装例。

- [sample/sample2-one-to-one/entity/Post.ts](sample/sample2-one-to-one/entity/Post.ts)
- [One\-to\-One](https://typeorm.io/#/one-to-one-relations)

### sample/sample3-many-to-one

多対一、`@ManyToOne`、`@OneToMany`の実装例。

- [sample/sample3-many-to-one/entity/Post.ts](sample/sample3-many-to-one/entity/Post.ts)
- [Many\-to\-One and One\-to\-Many](https://typeorm.io/#/many-to-one-one-to-many-relations)

### sample/sample4-many-to-many

多対多、`@ManyToMany`の実装例。

- [sample/sample4-many-to-many/entity/Post.ts](sample/sample4-many-to-many/entity/Post.ts)
- [Many\-to\-Many](https://typeorm.io/#/many-to-many-relations)

### sample/sample5-subscribers

イベント購読。`EntitySubscriberInterface`インターフェースの実装を`ConnectionOptions.subscribers`に割り当てる。  
`listenTo()`により対象の型を指定する。  
メソッドは afterLoad, beforeInsert, afterInsert, beforeUpdate, afterUpdate, beforeRemove, afterRemove およびトランザクションの開始・コミット・ロールバックそれぞれの前後。

- [sample/sample5-subscribers/subscriber/EverythingSubscriber.ts](sample/sample5-subscribers/subscriber/EverythingSubscriber.ts)
- [Listeners and Subscribers](https://typeorm.io/#listeners-and-subscribers/what-is-a-subscriber)

### sample/sample6-abstract-table

`abstract class`、`extended`を使用したエンティティ。

- [Concrete Table Inheritance](https://typeorm.io/#entity-inheritance/concrete-table-inheritance)

### sample/sample7-pagination

ページネーション。

- [Find Options](https://typeorm.io/#/find-options) - `skip`, `take`, `findAndCount`

### sample/sample8-self-referencing

自己参照

### sample/sample9-entity-listeners

エンティティリスナ。
デコレータ @AfterLoad, @BeforeInsert, @AfterInsert, @BeforeUpdate, @AfterUpdate, @BeforeRemove, @AfterRemove によるリスナ。

- [Entity Listeners](https://typeorm.io/#listeners-and-subscribers/what-is-an-entity-listener)

### sample/sample10-mixed

いろいろな join。

### sample/sample11-all-types-entity

エンティティの全てのタイプ（mysql 対応。simple_array はコメントアウト）

- [Column types](https://typeorm.io/#entities/column-types)

### sample/sample12-custom-naming-strategy

名前付き規約。
サンプルの場合、プロパティ`likesCount`を`typeorm/util/StringUtils`の`snakeCase`により DB フィールド`likes_count`に変換している。

- [sample/sample12-custom-naming-strategy/naming-strategy/CustomNamingStrategy.ts](sample/sample12-custom-naming-strategy/naming-strategy/CustomNamingStrategy.ts)

### sample/sample13-everywhere-abstraction

どこでも抽象化

### sample/sample14-errors-in-wrong-metdata

間違ったメタデータのエラー

### sample/sample16-indexes

インデックス（複数フィールドのインデックスもあり）

- [Indices](https://typeorm.io/#/indices)

### sample/sample17-versioning

バージョニング。`@VersionColumn`。

- [Special columns](https://typeorm.io/#entities/special-columns)

### sample/sample18-lazy-relations

怠惰な関係。  
`@ManyToOne`や`@ManyToMany`を`Promise`で遅延解決する。

- [Lazy relations](https://typeorm.io/#eager-and-lazy-relations/lazy-relations)

### sample/sample19-one-side-relations

片側関係。片方向にしかプロパティが参照していない。

### sample/sample20-join-without-relation

関係なしで join。エンティティではなく`QueryBuilder`の`leftJoin系`で取得数 r。

### sample/sample21-custom-join-table-column

カスタム結合テーブル列。

### sample/sample22-closure-table

クロージャテーブル。`@Tree("closure-table")`、`@TreeChildren`、`@TreeParent`を使用した樹形。

```sql
CREATE TABLE `sample22_category_closure`(
    `id_ancestor` int NOT NULL,
    `id_descendant` int NOT NULL,
    INDEX `IDX_90f937d0cc5e59e0b3577df79d`(`id_ancestor`),
    INDEX `IDX_42b7e4d79c50defd6740c20705`(`id_descendant`),
    PRIMARY KEY(`id_ancestor`, `id_descendant`)
)
```

- [Tree Entities / Closure table](https://typeorm.io/#tree-entities/closure-table)

### sample/sample23-nested-joins

ネストされた結合

### sample/sample24-schemas

スキーマを JSON ファイルで定義。

- [Separating Entity Definition](https://typeorm.io/#/separating-entity-definition)

### sample/sample25-insert-from-inverse-side

逆から挿入

### sample/sample26-embedded-tables

埋め込みテーブル

- [Embedded Entities](https://typeorm.io/#/embedded-entities)

### sample/sample27-composite-primary-keys

複合主キー

### sample/sample28-single-table-inheritance

単一テーブル継承  
単一テーブル継承は、独自のプロパティを持つ複数のクラスがあるが、データベースではそれらが同じテーブルに格納されている場合のパターンです。

- [Single Table Inheritance](https://typeorm.io/#/entity-inheritance/single-table-inheritance)

```sql
query : CREATE TABLE `sample28_person`(
    `id` int NOT NULL,
    `firstName` varchar(255) NOT NULL,
    `lastName` varchar(255) NOT NULL,
    `salary` int NULL,
    `numberOfKids` int NULL,
    `faculty` varchar(255) NULL,
    `type` varchar(255) NOT NULL,
    INDEX `IDX_3ed6cb85728b4f1038a958e895`(`type`),
    PRIMARY KEY(`id`)
)
```

### sample/sample30-default-order-by

デフォルトの並び順

`@Entity({orderBy: ...})`

### sample/sample31-table-prefix

テーブルのプリフィックス

`ConnectionOptions.entityPrefix`

### sample/sample32-migrations

マイグレーション

- [Migrations](https://typeorm.io/#/migrations)

### sample/sample33-custom-repository

カスタムリポジトリ

- [Custom Repository](https://typeorm.io/#/custom-repository)
