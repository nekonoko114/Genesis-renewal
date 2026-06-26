# Genesis-NewDesign Pattern C (Clean & Elegant) デザイン仕様書

本書は、`pattern-c.html` で採用されている「クリーン＆エレガント」なデザインシステムのビジュアルコンセプト、カラーパレット、タイポグラフィ、コンポーネント設計、およびインタラクション仕様をまとめた設計書です。今後の機能開発や新しい画面の作成時に、この仕様に準拠することでデザインの一貫性を保ちます。

---

## 1. ビジュアルコンセプト
* **デザインテーマ**: Clean & Elegant (クリーン＆エレガント)
* **コア体験**: ライブ配信事業（圧倒的な表現力・動的トレンド）と総合人材ソリューションのシナジー。
* **基本アプローチ**: 不要なノイズ（枠線、原色、過度な装飾）を極限まで取り除き、広い余白（マージン）と滑らかなグラデーション、美しい影で高級感（プレミアム感）を演出する。

---

## 2. カラーシステム (Color Palette)

基本背景は非常に薄いオフホワイト（クリーミーホワイト）を採用し、テキストにはコントラストの効いたチャコールグレーを使用。アクセントにはトライアド（3色対照）＋アルファのパステル・ネオンカラーを使用しています。

### ベースカラー
| カラー名 | カラーコード | Tailwind クラス名 | 用途 |
| :--- | :--- | :--- | :--- |
| **Creamy BG** | `#fcfcfc` | `bg-creamy-bg` | メイン背景色 |
| **Dark Text** | `#111827` (gray-900) | `text-gray-900` | ヒーロー見出し、主要タイトル、強調テキスト |
| **Normal Text** | `#1f2937` (gray-800) | `text-gray-800` | 本文テキスト、標準テキスト |
| **Muted Text** | `#6b7280` (gray-500) | `text-gray-500` | サブタイトル、説明文、補足テキスト |
| **Border / Gray**| `#f3f4f6` (gray-100) / `#e5e7eb` (gray-200) | `border-gray-100` | カード枠線、仕切り線、スクロールバー |

### アクセント＆ブランドカラー
| カラー名 | カラーコード | Tailwind クラス名 | ニュアンス・用途 |
| :--- | :--- | :--- | :--- |
| **Triad Red** | `#FF1414` | `text-triad-red` / `bg-triad-red` | 主要なシンボル（ロゴのピリオドなど）、バッジ、各種サービス |
| **Triad Pink** | `#FF9494` | `text-triad-pink` / `bg-triad-pink` | 柔らかいアクセント、各種サービス、グラデーションの始点 |
| **Triad Purple** | `#C994FF` | `text-triad-purple` / `bg-triad-purple` | トレンド感の演出、スクロールバーホバー、各種サービス |
| **Triad Cyan** | `#94FFFF` | `text-triad-cyan` / `bg-triad-cyan` | クールなアクセント、各種サービス |
| **Triad Lime** | `#C9FF94` | `text-triad-lime` / `bg-triad-lime` | 新鮮さ・活性のアクセント、各種サービス |

---

## 3. タイポグラフィ (Typography)

* **主要フォント**: `Outfit` (Google Fonts)
  * インポート元: `https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;700;900&display=swap`
  * フォントファミリー定義: `'outfit': ['Outfit', 'sans-serif']`
* **見出しの文字詰め (Tracking)**: `tracking-tighter` または `tracking-tight` で非常に狭く設定し、力強さと洗練さを両立。
* **本文のスタイル**: `font-light`（細字）と大きめの行間（`leading-relaxed`）を多用し、読みやすさとスマートな印象を両立。
* **小見出し・ラベル**: 大文字化 (`uppercase`)、極小文字 (`text-xs`)、広い字間 (`tracking-widest` または `tracking-[0.2em]/[0.3em]`) を組み合わせて使用。

---

## 4. シャドウ＆グラデーション (Visual Effects)

### 特殊クラス (Utility)
```css
/* 滑らかで淡い高級感のある影 */
.elegant-shadow {
  box-shadow: 0 20px 40px -10px rgba(0,0,0,0.05);
}

/* メインの3色グラデーションテキスト */
.text-gradient-c {
  background: linear-gradient(to right, #FF9494, #C994FF, #94FFFF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### スクロールバー仕様
```css
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: #fcfcfc; }
::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 2px; }
::-webkit-scrollbar-thumb:hover { background: #C994FF; }
```

### テキスト選択 (Selection)
```html
selection:bg-triad-purple selection:text-white
```
テキスト選択時の背景色にパープル（`#C994FF`）を採用し、ディテールにこだわっています。

### アンビエント（背景ぼかし）ライト
背景の z-index 奥深くに、巨大で薄い（`opacity-10`）カラーサークルを配置し、`filter blur-[100px]` でぼかすことで、オーロラのようなアンビエント光を表現。
* **配置**:
  * 左上: `bg-triad-cyan` (直径96)
  * 右中: `bg-triad-purple` (直径96)
  * 左下: `bg-triad-pink` (直径96)

---

## 5. 主要コンポーネント設計

### ① ヘッダー (Navigation Header)
* **構造**: 画面上部に固定 (`fixed top-0`)。
* **背景**: `bg-creamy-bg/80` (80%不透明) ＋ `backdrop-blur-xl` による磨りガラス効果。
* **スクロール連動**:
  * スクロール量が 20px を超えると、JSによって `border-gray-200 shadow-sm bg-creamy-bg/95` クラスが追加され、薄い枠線とシャドウが表示される。
* **ロゴ**: 「Genesis」の後に赤いドット（ピリオド）を配置: `Genesis<span class="text-triad-red">.</span>NewDesign`
* **ナビリンク**: ホバー時にわずかに上に浮き上がるアニメーションを設定 (`hover:-translate-y-0.5 transform transition-all`)。

### ② カードコンポーネント (About Card)
* **余白と角丸**: 角丸を大きく設定 (`rounded-[40px]`) し、内側パディングも大きくとる (`p-12 md:p-24`)。
* **装飾要素**:
  * 見出しの下に短いグラデーションバー (`w-16 h-1 bg-gradient-to-r from-triad-red to-triad-pink`)。
  * 画像にはホバー時に拡大するアニメーション (`group-hover:scale-105 transition-transform duration-1000`)。
  * カード外側にアクセントドット (`absolute -bottom-6 -left-6 w-12 h-12 bg-triad-cyan rounded-full shadow-lg`)。

### ③ サービス・リスト (Service Row)
* 左右交互のレイアウト (`lg:flex-row` / `lg:flex-row-reverse`)。
* 各サービスのカテゴリ名には、サービス特有のアクセントカラーを割り当て、下線ボーダーを引く（例: `border-b-2 border-triad-red pb-2`）。


### ⑤ コンタクトエリア (Contact Banner)
* 他のセクションと対比させるため、ダーク背景（`bg-gray-900`）を採用。
* 中央から広がるグラデーションライトを背後に配置し、ボタンは白背景でホバー時に発光シャドウ (`shadow-[0_0_40px_rgba(255,255,255,0.2)]`) を適用。

---

## 6. インタラクション & モーション仕様

* **イージング・アニメーション**:
  * トランジションには `duration-500` や `duration-1000` を使い、ゆっくりと滑らかに変化させることでエレガントさを演出。
* **ホバースケール**:
  * ボタンや画像、カードのホバー時には `hover:scale-105` や `hover:-translate-y-4` などの微細なアニメーションを適用。
* **スクロール挙動**:
  * HTML全体に `scroll-smooth` を適用し、各セクションにはヘッダーの固定幅を考慮して `scroll-mt-24`（スクロールマージントップ）を設定。
