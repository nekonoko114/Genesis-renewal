# お問い合わせフォーム（Resend連携）本番移行・運用マニュアル

このファイルは、Astroで構築したお問い合わせフォーム（Resend API連携）の本番環境（Cloudflare Pagesなど）へのデプロイ手順および今後の運用方法をまとめたリファレンスです。

---

## 1. 本番デプロイ時に必要な設定（最重要）

本番サーバー（Cloudflare Pages、Vercel、Netlifyなど）にデプロイする際、PCの `.env` ファイルはアップロードされません。
そのため、**デプロイ先の管理画面（環境変数 / Environment Variables 設定）** に以下の3つの環境変数を必ず登録してください。

| 環境変数名 | 設定値 | 説明 |
| :--- | :--- | :--- |
| `CONTACT_RESEND_API_KEY` | `re_jkLkaG3K_FiPUaMbeQVveBFM6roMYNZQq` | ResendのAPIキー |
| `FROM_EMAIL` | `murao@genesis-llc.co.jp` | 送信元メールアドレス（認証済みドメインのみ使用可） |
| `TO_EMAIL` | `murao@genesis-llc.co.jp` | お問い合わせ通知を受け取る宛先メールアドレス |

> [!IMPORTANT]
> 本番デプロイが完了した後は、上記環境変数が設定されることで自動的にお問い合わせメールが正常稼働します。

---

## 2. DNSレコード設定（設定済み・変更不要）

XSERVER側に登録したDNSレコードの一覧です。これは **`genesis-llc.co.jp` ドメインに対する恒久的な設定** であるため、本番環境移行時も変更・削除する必要はありません。

| タイプ | 名前（ホスト名） | コンテンツ（値） | 優先度 | 役割 |
| :--- | :--- | :--- | :--- | :--- |
| **TXT** | `resend._domainkey` | `p=MIGfMA...`（長い文字列） | - | DKIM（電子署名）認証用 |
| **MX** | `send` | `feedback-smtp.ap-northeast-1.amazonses.com` | `10` | メール到達率向上のための設定 |
| **TXT** | `send` | `v=spf1 include:amazonses.com ~all` | - | SPF（なりすまし防止）認証用 |
| **TXT** | `_dmarc` | `v=DMARC1; p=none;` | - | DMARC（なりすまし防止）認証用 |

---

## 3. 将来的な運用・設定変更について

### 送信先メールアドレスを変更したい場合
「お問い合わせメールを受け取る人」を変更したい場合は、以下のいずれかを対応してください。
*   **ローカル開発環境**: `.env` ファイルの `TO_EMAIL` の値を書き換える。
*   **本番環境**: デプロイ先（Cloudflare Pages等）の環境変数設定画面で、`TO_EMAIL` の値を書き換えて再デプロイする。

### メールテンプレートのデザインを変更したい場合
メールの本文デザイン（HTML）を変更したい場合は、以下のファイルを編集してください。
*   `src/emails/ContactTemplate.ts` （メール本文のテンプレートファイル）
